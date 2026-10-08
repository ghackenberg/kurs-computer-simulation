using System;
using System.Collections.Generic;
using MultithreadingBenchmark.Benchmarks;
using MultithreadingBenchmark.Simulation;

namespace MultithreadingBenchmark
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("================================================================================");
            Console.WriteLine(" Termin 06: Multithreading & TPL Benchmark (Systemsimulation)");
            Console.WriteLine($" Host-System: {Environment.ProcessorCount} logische Prozessorkerne");
            Console.WriteLine("================================================================================\n");

            const int particleCount = 100_000;
            const int steps = 20;
            const double dt = 0.001;

            Console.WriteLine($"[1] STUFE A: In-Class Sprint (N = {particleCount:N0} Partikel, {steps} Zeitschritte)");
            Console.WriteLine("Führe JIT-Warmup durch...");
            ParallelRunner.Warmup();

            // 1. Sequentiell
            Console.Write("Starte sequentiellen Durchlauf (1 Kern)... ");
            var seqField = new ParticleField(particleCount, seed: 42);
            double tSeq = ParallelRunner.MeasureSequential(seqField, steps, dt);
            Console.WriteLine($"Fertig in {tSeq:F2} ms");

            // 2. Parallel mit allen Kernen
            int maxCores = Environment.ProcessorCount;
            Console.Write($"Starte parallelen TPL-Durchlauf ({maxCores} Kerne)... ");
            var parField = new ParticleField(particleCount, seed: 42);
            double tPar = ParallelRunner.MeasureParallel(parField, steps, dt, maxCores);
            Console.WriteLine($"Fertig in {tPar:F2} ms");

            double sprintSpeedup = tSeq / tPar;
            double sprintEfficiency = sprintSpeedup / maxCores;
            double estSerial = ParallelRunner.EstimateSerialFraction(sprintSpeedup, maxCores);

            Console.WriteLine("\n--- Sprint-Ergebnis ---");
            Console.WriteLine($"  T_seq:              {tSeq,10:F2} ms");
            Console.WriteLine($"  T_par ({maxCores} Kerne):    {tPar,10:F2} ms");
            Console.WriteLine($"  Speedup S(p):       {sprintSpeedup,10:F2}x");
            Console.WriteLine($"  Effizienz E(p):     {sprintEfficiency * 100.0,9:F1} %");
            Console.WriteLine($"  Geschätztes s:      {estSerial * 100.0,9:F2} % (serieller Anteil nach Amdahl)");
            Console.WriteLine("-----------------------\n");

            // 3. Skalierungsanalyse 1..N Threads
            Console.WriteLine("[2] SKALIERUNGSANALYSE (1 .. N Threads)");
            var threadCounts = new List<int>();
            for (int p = 1; p <= maxCores; p *= 2)
            {
                threadCounts.Add(p);
            }
            if (!threadCounts.Contains(maxCores))
            {
                threadCounts.Add(maxCores);
            }

            Console.WriteLine("Threads |  Dauer [ms] |   Speedup | Effizienz | Amdahl-Fit (s={0:P1})", estSerial);
            Console.WriteLine("--------+-------------+-----------+-----------+--------------------");

            var results = ParallelRunner.RunScalingSeries(particleCount, steps, dt, threadCounts.ToArray());
            foreach (var res in results)
            {
                double amdahlExpected = ParallelRunner.AmdahlSpeedup(res.Threads, estSerial);
                Console.WriteLine($"{res.Threads,7} | {res.ElapsedMilliseconds,11:F2} | {res.Speedup,8:F2}x | {res.Efficiency * 100.0,8:F1}% | {amdahlExpected,15:F2}x");
            }

            Console.WriteLine("\n================================================================================");
            Console.WriteLine(" STUFE B: Hausübung (Wahlmodell)");
            Console.WriteLine("  Track A: Parallele Monte-Carlo-Toleranzanalyse (10 Mio. Maßketten-Iterationen)");
            Console.WriteLine("  Track B: Boids & Flocking / Zombie-Horde mit Spatial Hash Grid");
            Console.WriteLine("================================================================================");
        }
    }
}
