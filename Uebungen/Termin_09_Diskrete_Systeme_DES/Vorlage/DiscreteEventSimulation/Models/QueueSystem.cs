using System;
using System.Collections.Generic;
using DiscreteEventSimulation.Engine;
using DiscreteEventSimulation.Random;

namespace DiscreteEventSimulation.Models
{
    public record Customer(int Id, double ArrivalTime, int Priority = 1)
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
        double LittlesLawRelErrorQueue,
        IReadOnlyList<double>? WaitTimes = null,
        IReadOnlyList<double>? SystemTimes = null);

    /// <summary>
    /// Simuliert ein M/M/c bzw. M/G/c-Warteschlangensystem über diskrete Ereignissimulation mit FEL.
    /// Unterstützt optionale Pufferbegrenzung K (M/M/c/K) sowie Log-Normalverteilte Bedienzeiten (Aufgabe A2).
    /// </summary>
    public class QueueSystem
    {
        public double ArrivalRate { get; }             // lambda
        public double ServiceRate { get; }             // mu
        public int Servers { get; }                    // c
        public int Capacity { get; }                   // K (int.MaxValue für unbegrenzt)
        public double? LogNormalServiceStdDev { get; } // Optional für Aufgabe A2 (M/G/1)

        public QueueSystem(
            double arrivalRate,
            double serviceRate,
            int servers = 1,
            int capacity = int.MaxValue,
            double? logNormalServiceStdDev = null)
        {
            if (arrivalRate <= 0) throw new ArgumentOutOfRangeException(nameof(arrivalRate));
            if (serviceRate <= 0) throw new ArgumentOutOfRangeException(nameof(serviceRate));
            if (servers <= 0) throw new ArgumentOutOfRangeException(nameof(servers));

            ArrivalRate = arrivalRate;
            ServiceRate = serviceRate;
            Servers = servers;
            Capacity = capacity;
            LogNormalServiceStdDev = logNormalServiceStdDev;
        }

        /// <summary>
        /// Führt einen Simulationslauf bis zur Maximalzeit tMax durch.
        /// </summary>
        public QueueSimulationResult Simulate(double tMax, int? seed = null)
        {
            var fel = new EventQueue();
            var expArrival = new ExponentialDistribution(ArrivalRate, seed);
            var expService = new ExponentialDistribution(ServiceRate, seed.HasValue ? seed + 1000 : null);
            var logNormalService = LogNormalServiceStdDev.HasValue
                ? new LogNormalDistribution(1.0 / ServiceRate, LogNormalServiceStdDev.Value, seed.HasValue ? seed + 2000 : null)
                : null;

            Func<double> sampleServiceTime = logNormalService != null
                ? () => logNormalService.Sample()
                : () => expService.Sample();

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

                    // TODO [Aufgabe A1]:
                    // Aktuell prüft der Code `totalInSystem >= Capacity` (Gesamtsystem-Kapazität inkl. Server).
                    // Laut Aufgabenblatt bezeichnet K jedoch die reine Wartepuffer-Kapazität (`waitingQueue.Count >= Capacity`).
                    // Ändern Sie die Bedingung auf `waitingQueue.Count >= Capacity` und testen Sie K = 10!
                    int totalInSystem = waitingQueue.Count + busyServers;
                    if (totalInSystem >= Capacity)
                    {
                        // Puffer voll -> Einheit geht verloren (Blocking / Reject)
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
                            double serviceDuration = sampleServiceTime();
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
                        double serviceDuration = sampleServiceTime();
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
            var waitTimes = new List<double>(completedCustomers.Count);
            var systemTimes = new List<double>(completedCustomers.Count);

            if (completedCustomers.Count > 0)
            {
                double sumWq = 0.0;
                double sumW = 0.0;
                foreach (var c in completedCustomers)
                {
                    sumWq += c.WaitTime;
                    sumW += c.TotalTimeInSystem;
                    waitTimes.Add(c.WaitTime);
                    systemTimes.Add(c.TotalTimeInSystem);
                }
                meanWq = sumWq / completedCustomers.Count;
                meanW = sumW / completedCustomers.Count;
            }

            double effectiveLambda = completedCustomers.Count / simTime;
            double rho = ArrivalRate / (Servers * ServiceRate);

            // Prüfung von Little's Gesetz: L = lambda_eff * W
            double littlesPredictedL = effectiveLambda * meanW;
            double errSystem = meanL > 0 ? Math.Abs(meanL - littlesPredictedL) / meanL : 0.0;

            // Little's Gesetz für Warteschlange: L_q = lambda_eff * W_q
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
                LittlesLawRelErrorQueue: errQueue,
                WaitTimes: waitTimes,
                SystemTimes: systemTimes
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

        // TODO [Track A - Industrie (Automobil-Lackierstraße M/M/3/25 mit Priorität)]:
        // - c = 3 parallele Lackierkabinen (mu = 1.5 /h), lambda = 4.0 /h, Puffergrenze K = 25.
        // - Non-preemptive Priority Queuing: 20 % Express-Karosserien (Prio 0) überholen
        //   80 % Standard-Karosserien (Prio 1) im Wartepuffer.
        // - Getrennte Wartezeitauswertung W_q,Express vs. W_q,Standard und Nachweis von Little's Gesetz.

        // TODO [Track B - Simulation Game (Freizeitpark Achterbahn-Drehkreuze M/M/3/25 mit FastPass)]:
        // - c = 3 Drehkreuze (mu = 1.5 /min), lambda = 4.0 /min, Wartebereich K = 25 (Lost Visitors).
        // - 20 % VIP-FastPass-Gäste (Prio 0) vs. 80 % reguläre Parkbesucher (Prio 1).
        // - 100 Monte-Carlo-Replikationen über einen 12-Stunden-Tag (720 min) & ScottPlot-Histogramm.
    }
}
