using System;
using System.Linq;
using System.Threading.Tasks;
using DynamischWarteschlange.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SimulationTests
{
    [TestClass]
    public class ParallelWelfordAccumulatorTests
    {
        [TestMethod]
        public void Test_WelfordSingleThread_AgainstTwoPassReference()
        {
            double[] data = [12.5, 14.2, 11.8, 15.0, 13.1, 12.9, 14.5, 13.8];

            var acc = new ParallelWelfordAccumulator();
            foreach (var x in data) acc.Add(x);

            // Two-Pass Referenzberechnung
            double expectedMean = data.Average();
            double expectedVariance = data.Select(x => Math.Pow(x - expectedMean, 2)).Sum() / (data.Length - 1);

            Assert.AreEqual(data.Length, acc.Count);
            Assert.AreEqual(expectedMean, acc.Mean, 1e-12, "Mittelwert weicht von Referenz ab.");
            Assert.AreEqual(expectedVariance, acc.Variance, 1e-12, "Varianz weicht von Referenz ab.");
        }

        [TestMethod]
        public void Test_CatastrophicCancellation_NumericalStability()
        {
            // Zahlen mit riesigem Offset und minimaler Streuung
            // Naive Formel (Sum(x^2) - (Sum x)^2 / N) versagt hier katastrophal!
            double baseOffset = 1e9;
            double[] offsets = [1.0, 2.0, 3.0, 4.0, 5.0];
            double[] data = offsets.Select(x => baseOffset + x).ToArray();

            var acc = new ParallelWelfordAccumulator();
            foreach (var x in data) acc.Add(x);

            // Erwartete Varianz ist exakt die der Offsets: Var([1,2,3,4,5]) = 2.5
            double expectedVariance = 2.5;
            double expectedMean = baseOffset + 3.0;

            Assert.AreEqual(expectedMean, acc.Mean, 1e-6);
            Assert.AreEqual(expectedVariance, acc.Variance, 1e-9, "Welford muss gegen Auslöschung stabil bleiben!");
        }

        [TestMethod]
        public void Test_ParallelChanMerge_ExactEquivalence()
        {
            int n = 100_000;
            double[] numbers = new double[n];
            Random rnd = new(42);
            for (int i = 0; i < n; i++) numbers[i] = rnd.NextDouble() * 100.0;

            // Sequentieller Akkumulator
            var seqAcc = new ParallelWelfordAccumulator();
            foreach (var x in numbers) seqAcc.Add(x);

            // Parallele Akkumulation mit Chan-Merge über Parallel.For
            var parAcc = new ParallelWelfordAccumulator();
            object syncLock = new();

            Parallel.For(0, n, () => new ParallelWelfordAccumulator(), (i, state, localAcc) =>
            {
                localAcc.Add(numbers[i]);
                return localAcc;
            },
            localAcc =>
            {
                lock (syncLock)
                {
                    parAcc.Merge(localAcc);
                }
            });

            Assert.AreEqual(seqAcc.Count, parAcc.Count);
            Assert.AreEqual(seqAcc.Mean, parAcc.Mean, 1e-10, "Paralleler Mittelwert unterscheidet sich!");
            Assert.AreEqual(seqAcc.Variance, parAcc.Variance, 1e-9, "Parallele Varianz unterscheidet sich!");
        }
    }
}
