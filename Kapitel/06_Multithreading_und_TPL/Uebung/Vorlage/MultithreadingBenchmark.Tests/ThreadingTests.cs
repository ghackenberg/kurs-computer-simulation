using Microsoft.VisualStudio.TestTools.UnitTesting;
using MultithreadingBenchmark.Benchmarks;
using MultithreadingBenchmark.Simulation;
using System;

namespace MultithreadingBenchmark.Tests
{
    [TestClass]
    public class ThreadingTests
    {
        [TestMethod]
        public void TestSequentialVsParallelEquivalence()
        {
            // Verifiziert, dass Parallel.For exakt die gleichen physikalischen Zustände erzeugt wie die serielle Schleife.
            const int count = 2000;
            const int steps = 10;
            const double dt = 0.001;

            var fieldSeq = new ParticleField(count, seed: 12345);
            var fieldPar = fieldSeq.Clone();

            for (int s = 0; s < steps; s++)
            {
                fieldSeq.StepSequential(dt);
                fieldPar.StepParallel(dt, maxDegreeOfParallelism: 4);
            }

            Assert.AreEqual(fieldSeq.Count, fieldPar.Count);

            for (int i = 0; i < count; i++)
            {
                Assert.AreEqual(fieldSeq.Particles[i].X, fieldPar.Particles[i].X, 1e-12, $"Particle[{i}].X differs!");
                Assert.AreEqual(fieldSeq.Particles[i].Y, fieldPar.Particles[i].Y, 1e-12, $"Particle[{i}].Y differs!");
                Assert.AreEqual(fieldSeq.Particles[i].Vx, fieldPar.Particles[i].Vx, 1e-12, $"Particle[{i}].Vx differs!");
                Assert.AreEqual(fieldSeq.Particles[i].Vy, fieldPar.Particles[i].Vy, 1e-12, $"Particle[{i}].Vy differs!");
            }
        }

        [TestMethod]
        public void TestAmdahlSpeedupCalculation()
        {
            // Amdahl-Formel: S(p) = 1 / (s + (1 - s)/p)
            // Bei rein parallelem Code (s = 0): S(p) = p
            Assert.AreEqual(4.0, ParallelRunner.AmdahlSpeedup(4, 0.0), 1e-6);

            // Bei rein seriellem Code (s = 1): S(p) = 1
            Assert.AreEqual(1.0, ParallelRunner.AmdahlSpeedup(8, 1.0), 1e-6);

            // Bei s = 0.1 (10% seriell), p = 4:
            // S(4) = 1 / (0.1 + 0.9/4) = 1 / (0.1 + 0.225) = 1 / 0.325 = 3.076923
            double expected = 1.0 / (0.1 + 0.9 / 4.0);
            Assert.AreEqual(expected, ParallelRunner.AmdahlSpeedup(4, 0.1), 1e-5);
        }

        [TestMethod]
        public void TestSerialFractionEstimation()
        {
            double sTheoretical = 0.08;
            int p = 8;
            double speedup = ParallelRunner.AmdahlSpeedup(p, sTheoretical);

            double estimatedS = ParallelRunner.EstimateSerialFraction(speedup, p);
            Assert.AreEqual(sTheoretical, estimatedS, 1e-5);
        }

        [TestMethod]
        public void TestWarmupRunsSuccessfully()
        {
            // Stellt sicher, dass Warmup ohne Exception durchläuft
            ParallelRunner.Warmup(particleCount: 500, steps: 1);
        }
    }
}
