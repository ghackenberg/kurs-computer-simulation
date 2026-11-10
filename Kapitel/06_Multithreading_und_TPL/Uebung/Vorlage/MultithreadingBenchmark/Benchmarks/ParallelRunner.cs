using System;
using System.Collections.Generic;
using System.Diagnostics;
using MultithreadingBenchmark.Simulation;

namespace MultithreadingBenchmark.Benchmarks
{
    public record BenchmarkResult(int Threads, double ElapsedMilliseconds, double Speedup, double Efficiency);

    public class ParallelRunner
    {
        /// <summary>
        /// Führt einen Warmup-Durchlauf durch, damit JIT-Kompilierung und Thread-Pool-Allokation
        /// die eigentliche Benchmark-Messung nicht verfälschen.
        /// </summary>
        public static void Warmup(int particleCount = 10000, int steps = 2)
        {
            var warmupField = new ParticleField(particleCount, seed: 1);
            warmupField.StepSequential(0.001);
            warmupField.StepParallel(0.001, 2);
        }

        /// <summary>
        /// Misst die sequentielle Laufzeit (1 Thread).
        /// </summary>
        public static double MeasureSequential(ParticleField field, int steps, double dt)
        {
            var sw = Stopwatch.StartNew();
            for (int s = 0; s < steps; s++)
            {
                field.StepSequential(dt);
            }
            sw.Stop();
            return sw.Elapsed.TotalMilliseconds;
        }

        /// <summary>
        /// Misst die parallele Laufzeit mit gegebener Thread-Anzahl.
        /// </summary>
        public static double MeasureParallel(ParticleField field, int steps, double dt, int threads)
        {
            var sw = Stopwatch.StartNew();
            for (int s = 0; s < steps; s++)
            {
                field.StepParallel(dt, threads);
            }
            sw.Stop();
            return sw.Elapsed.TotalMilliseconds;
        }

        /// <summary>
        /// Führt eine vollständige Skalierungsreihe über verschiedene Thread-Zahlen durch.
        /// </summary>
        public static List<BenchmarkResult> RunScalingSeries(
            int particleCount, 
            int steps, 
            double dt, 
            int[] threadCounts)
        {
            Warmup();

            // 1. Sequenzielle Baseline T_1 messen
            var baselineField = new ParticleField(particleCount, seed: 42);
            double t1 = MeasureSequential(baselineField, steps, dt);

            var results = new List<BenchmarkResult>
            {
                new BenchmarkResult(Threads: 1, ElapsedMilliseconds: t1, Speedup: 1.0, Efficiency: 1.0)
            };

            // 2. Parallele Durchläufe für alle gewünschten Thread-Zahlen
            foreach (int p in threadCounts)
            {
                if (p == 1) continue;

                var field = new ParticleField(particleCount, seed: 42);
                double tp = MeasureParallel(field, steps, dt, p);

                double speedup = t1 / tp;
                double efficiency = speedup / p;

                results.Add(new BenchmarkResult(p, tp, speedup, efficiency));
            }

            return results;
        }

        /// <summary>
        /// Berechnet den theoretischen Speedup nach Amdahls Gesetz:
        /// S(p) = 1 / (s + (1 - s) / p)
        /// </summary>
        /// <param name="p">Anzahl Prozessorkerne / Threads.</param>
        /// <param name="s">Serieller Codeanteil s in [0, 1].</param>
        public static double AmdahlSpeedup(int p, double s)
        {
            if (p <= 0) throw new ArgumentOutOfRangeException(nameof(p));
            if (s < 0.0 || s > 1.0) throw new ArgumentOutOfRangeException(nameof(s));

            return 1.0 / (s + (1.0 - s) / p);
        }

        /// <summary>
        /// Schätzt den seriellen Codeanteil s aus gemessenem Speedup S auf p Kernen:
        /// s = (1/S - 1/p) / (1 - 1/p)
        /// </summary>
        public static double EstimateSerialFraction(double measuredSpeedup, int p)
        {
            if (p <= 1) return 1.0;
            double s = (1.0 / measuredSpeedup - 1.0 / p) / (1.0 - 1.0 / p);
            return Math.Clamp(s, 0.0, 1.0);
        }
    }
}
