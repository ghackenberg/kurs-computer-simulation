using System;
using System.Collections.Generic;
using DiscreteEventSimulation.Engine;
using DiscreteEventSimulation.Random;

namespace DiscreteEventSimulation.Models
{
    public record Customer(int Id, double ArrivalTime)
    {
        public double ServiceStartTime { get; set; }
        public double DepartureTime { get; set; }
        public double WaitTime => ServiceStartTime - ArrivalTime;
        public double TotalTimeInSystem => DepartureTime - ArrivalTime;
    }

    public record QueueSimulationResult(
        double SimulationTime,
        int TotalArrivals,
        int TotalDepartures,
        int BlockedCustomers,
        double MeanQueueLengthLq,
        double MeanSystemCustomersL,
        double MeanWaitTimeWq,
        double MeanSystemTimeW,
        double EffectiveArrivalRate,
        double UtilizationRho,
        double LittlesLawRelErrorSystem,
        double LittlesLawRelErrorQueue);

    /// <summary>
    /// Simuliert ein M/M/c bzw. M/M/1-Warteschlangensystem über diskrete Ereignissimulation mit FEL.
    /// Unterstützt optionale Pufferbegrenzung K (M/M/c/K).
    /// </summary>
    public class QueueSystem
    {
        public double ArrivalRate { get; }  // lambda
        public double ServiceRate { get; }  // mu
        public int Servers { get; }         // c
        public int Capacity { get; }        // K (int.MaxValue für unbegrenzt)

        public QueueSystem(double arrivalRate, double serviceRate, int servers = 1, int capacity = int.MaxValue)
        {
            if (arrivalRate <= 0) throw new ArgumentOutOfRangeException(nameof(arrivalRate));
            if (serviceRate <= 0) throw new ArgumentOutOfRangeException(nameof(serviceRate));
            if (servers <= 0) throw new ArgumentOutOfRangeException(nameof(servers));

            ArrivalRate = arrivalRate;
            ServiceRate = serviceRate;
            Servers = servers;
            Capacity = capacity;
        }

        /// <summary>
        /// Führt einen Simulationslauf bis zur Maximalzeit tMax durch.
        /// </summary>
        public QueueSimulationResult Simulate(double tMax, int? seed = null)
        {
            var fel = new EventQueue();
            var expArrival = new ExponentialDistribution(ArrivalRate, seed);
            var expService = new ExponentialDistribution(ServiceRate, seed.HasValue ? seed + 1000 : null);

            var waitingQueue = new Queue<Customer>();
            var completedCustomers = new List<Customer>();

            int busyServers = 0;
            int totalArrivals = 0;
            int blockedCustomers = 0;

            double currentTime = 0.0;
            double lastEventTime = 0.0;

            // Zeitintegrale für Little's Gesetz:
            double areaQueueLength = 0.0;  // Integral L_q(t) dt
            double areaSystemCount = 0.0;  // Integral L(t) dt

            // Erstes Arrival-Event einplanen
            double firstArrival = expArrival.Sample();
            fel.Enqueue(new SimEvent(SimEventType.Arrival, firstArrival, EntityId: ++totalArrivals));

            while (!fel.IsEmpty)
            {
                var ev = fel.Dequeue();
                if (ev.Time > tMax)
                {
                    // Letztes Zeitintervall bis tMax aufakkumulieren
                    double dtFinal = tMax - lastEventTime;
                    if (dtFinal > 0)
                    {
                        areaQueueLength += waitingQueue.Count * dtFinal;
                        areaSystemCount += (waitingQueue.Count + busyServers) * dtFinal;
                    }
                    currentTime = tMax;
                    break;
                }

                // Zeitintegral über vergangenes Intervall [lastEventTime, ev.Time]
                double dt = ev.Time - lastEventTime;
                areaQueueLength += waitingQueue.Count * dt;
                areaSystemCount += (waitingQueue.Count + busyServers) * dt;

                currentTime = ev.Time;
                lastEventTime = currentTime;

                if (ev.Type == SimEventType.Arrival)
                {
                    // Nächste Ankunft direkt vorab einplanen
                    double nextArrival = currentTime + expArrival.Sample();
                    fel.Enqueue(new SimEvent(SimEventType.Arrival, nextArrival, EntityId: ++totalArrivals));

                    int totalInSystem = waitingQueue.Count + busyServers;
                    if (totalInSystem >= Capacity)
                    {
                        // System voll -> Kunde geht verloren (Blocking / Reject)
                        blockedCustomers++;
                    }
                    else
                    {
                        var customer = new Customer(ev.EntityId, currentTime);

                        if (busyServers < Servers)
                        {
                            // Sofortige Bedienung
                            busyServers++;
                            customer.ServiceStartTime = currentTime;
                            double serviceDuration = expService.Sample();
                            double departureTime = currentTime + serviceDuration;

                            fel.Enqueue(new SimEvent(
                                SimEventType.Departure, 
                                departureTime, 
                                EntityId: customer.Id, 
                                Action: () =>
                                {
                                    customer.DepartureTime = departureTime;
                                    completedCustomers.Add(customer);
                                }));
                        }
                        else
                        {
                            // In Warteschlange einreihen
                            waitingQueue.Enqueue(customer);
                        }
                    }
                }
                else if (ev.Type == SimEventType.Departure)
                {
                    // Callback des abfliegenden Kunden ausführen
                    ev.Action?.Invoke();

                    if (waitingQueue.Count > 0)
                    {
                        // Nächsten Kunden aus der Schlange bedienen
                        var nextCustomer = waitingQueue.Dequeue();
                        nextCustomer.ServiceStartTime = currentTime;
                        double serviceDuration = expService.Sample();
                        double departureTime = currentTime + serviceDuration;

                        fel.Enqueue(new SimEvent(
                            SimEventType.Departure, 
                            departureTime, 
                            EntityId: nextCustomer.Id, 
                            Action: () =>
                            {
                                nextCustomer.DepartureTime = departureTime;
                                completedCustomers.Add(nextCustomer);
                            }));
                    }
                    else
                    {
                        busyServers--;
                    }
                }
            }

            // Kennzahlen berechnen
            double simTime = currentTime > 0 ? currentTime : tMax;
            double meanLq = areaQueueLength / simTime;
            double meanL = areaSystemCount / simTime;

            double meanWq = 0.0;
            double meanW = 0.0;
            if (completedCustomers.Count > 0)
            {
                double sumWq = 0.0;
                double sumW = 0.0;
                foreach (var c in completedCustomers)
                {
                    sumWq += c.WaitTime;
                    sumW += c.TotalTimeInSystem;
                }
                meanWq = sumWq / completedCustomers.Count;
                meanW = sumW / completedCustomers.Count;
            }

            double effectiveLambda = completedCustomers.Count / simTime;
            double rho = ArrivalRate / (Servers * ServiceRate);

            // Prüfung von Little's Gesetz: L = lambda * W
            double littlesPredictedL = effectiveLambda * meanW;
            double errSystem = meanL > 0 ? Math.Abs(meanL - littlesPredictedL) / meanL : 0.0;

            // Little's Gesetz für Warteschlange: L_q = lambda * W_q
            double littlesPredictedLq = effectiveLambda * meanWq;
            double errQueue = meanLq > 0 ? Math.Abs(meanLq - littlesPredictedLq) / meanLq : 0.0;

            return new QueueSimulationResult(
                SimulationTime: simTime,
                TotalArrivals: totalArrivals,
                TotalDepartures: completedCustomers.Count,
                BlockedCustomers: blockedCustomers,
                MeanQueueLengthLq: meanLq,
                MeanSystemCustomersL: meanL,
                MeanWaitTimeWq: meanWq,
                MeanSystemTimeW: meanW,
                EffectiveArrivalRate: effectiveLambda,
                UtilizationRho: rho,
                LittlesLawRelErrorSystem: errSystem,
                LittlesLawRelErrorQueue: errQueue
            );
        }

        /// <summary>
        /// Berechnet analytische M/M/1-Werte nach Erlang-Theorie.
        /// </summary>
        public static (double Rho, double Lq, double L, double Wq, double W) ComputeAnalyticalMM1(double lambda, double mu)
        {
            if (lambda >= mu) throw new InvalidOperationException("System ist instabil (lambda >= mu)!");
            double rho = lambda / mu;
            double lq = (rho * rho) / (1.0 - rho);
            double l = rho / (1.0 - rho);
            double wq = rho / (mu - lambda);
            double w = 1.0 / (mu - lambda);
            return (rho, lq, l, wq, w);
        }

        // ====================================================================
        // STUFE B: Erweiterungspfade (Wahlmodell Track A oder Track B)
        // ====================================================================

        // TODO [Track A - Industrie]:
        // Mehrstufiges M/M/c/K-System mit begrenzten Puffern zwischen Fertigungsstationen.
        // Implementieren Sie die Blockierwahrscheinlichkeit P_block und analysieren Sie den Durchsatzverlust.

        // TODO [Track B - Simulation Game]:
        // Matchmaking-Queue mit 2 Prioritätsklassen (z. B. VIP / Premium vs. Free-to-Play).
        // Nicht-präemptive Prioritätsverwaltung in der EventQueue.
    }
}
