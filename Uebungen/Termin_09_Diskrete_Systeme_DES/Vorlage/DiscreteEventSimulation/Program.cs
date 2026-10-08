using System;
using System.Collections.Generic;
using DiscreteEventSimulation.Models;

namespace DiscreteEventSimulation
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("================================================================================");
            Console.WriteLine(" Termin 09: Diskrete Ereignissimulation (DES) & Little's Gesetz");
            Console.WriteLine(" Future Event List (FEL) mit C# PriorityQueue");
            Console.WriteLine("================================================================================\n");

            // 1. Parameter aus Stufe A (In-Class Sprint)
            double lambda = 4.0; // Ankünfte / Minute
            double mu = 5.0;     // Bedienungen / Minute
            double tMax = 20_000.0; // 20.000 Minuten

            var (anaRho, anaLq, anaL, anaWq, anaW) = QueueSystem.ComputeAnalyticalMM1(lambda, mu);

            Console.WriteLine($"[1] STUFE A: In-Class Sprint M/M/1-System");
            Console.WriteLine($"    Ankunftsrate lambda = {lambda:F1} /min  (E[T_arr] = {1.0/lambda*60:F1} s)");
            Console.WriteLine($"    Bedienrate   mu     = {mu:F1} /min  (E[T_ser] = {1.0/mu*60:F1} s)");
            Console.WriteLine($"    Auslastung   rho    = {anaRho:P1}");
            Console.WriteLine($"    Analytische Werte:  L_q = {anaLq:F2},  L = {anaL:F2},  W_q = {anaWq:F2} min,  W = {anaW:F2} min\n");

            Console.WriteLine($"Simuliere {tMax:N0} Minuten Betriebsdauer...");
            var queueSystem = new QueueSystem(lambda, mu, servers: 1);
            var result = queueSystem.Simulate(tMax, seed: 42);

            Console.WriteLine("\n--- Simulationsergebnisse (Einzellauf) ---");
            Console.WriteLine($"  Simulierte Kunden (Departures):   {result.TotalDepartures:N0}");
            Console.WriteLine($"  Mittlere Schlängelänge L_q:       {result.MeanQueueLengthLq,8:F3}  (Soll: {anaLq:F2}, Abweichung: {Math.Abs(result.MeanQueueLengthLq - anaLq)/anaLq*100:F2} %)");
            Console.WriteLine($"  Mittlere Systemanzahl  L:         {result.MeanSystemCustomersL,8:F3}  (Soll: {anaL:F2}, Abweichung: {Math.Abs(result.MeanSystemCustomersL - anaL)/anaL*100:F2} %)");
            Console.WriteLine($"  Mittlere Wartezeit     W_q:       {result.MeanWaitTimeWq,8:F3} min (Soll: {anaWq:F2} min)");
            Console.WriteLine($"  Mittlere Verweilzeit   W:         {result.MeanSystemTimeW,8:F3} min (Soll: {anaW:F2} min)");
            Console.WriteLine($"  Effektive Ankunftsrate lambda_eff: {result.EffectiveArrivalRate,8:F3} /min");
            Console.WriteLine("------------------------------------------");
            Console.WriteLine($"  Little's Gesetz (System): L = lambda * W  ==> Fehler: {result.LittlesLawRelErrorSystem * 100.0:F4} %");
            Console.WriteLine($"  Little's Gesetz (Queue):  L_q = lambda*W_q ==> Fehler: {result.LittlesLawRelErrorQueue * 100.0:F4} %\n");

            // 2. Monte-Carlo Replikationen
            Console.WriteLine("[2] MONTE-CARLO REPLIKATIONEN (5 unabhängige Läufe à 10.000 min)");
            Console.WriteLine(" Lauf |   Departures |      L_q |        L |   W_q [min] |    W [min] | Little Err");
            Console.WriteLine("------+--------------+----------+----------+-------------+------------+-----------");

            for (int r = 1; r <= 5; r++)
            {
                var runRes = queueSystem.Simulate(10_000.0, seed: r * 100 + 7);
                Console.WriteLine($"{r,5} | {runRes.TotalDepartures,12:N0} | {runRes.MeanQueueLengthLq,8:F3} | {runRes.MeanSystemCustomersL,8:F3} | {runRes.MeanWaitTimeWq,11:F3} | {runRes.MeanSystemTimeW,10:F3} | {runRes.LittlesLawRelErrorSystem * 100.0,8:F3}%");
            }

            Console.WriteLine("\n================================================================================");
            Console.WriteLine(" STUFE B: Hausübung (Wahlmodell)");
            Console.WriteLine("  Track A: M/M/c/K-Fertigungslinie mit begrenzten Puffern und Blockierwahrscheinlichkeit");
            Console.WriteLine("  Track B: Spieler-Matchmaking-System mit 2 Prioritätsklassen (VIP vs. Standard)");
            Console.WriteLine("================================================================================");
        }
    }
}
