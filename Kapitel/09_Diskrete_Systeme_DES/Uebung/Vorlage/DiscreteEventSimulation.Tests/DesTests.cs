using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DiscreteEventSimulation.Engine;
using DiscreteEventSimulation.Models;
using DiscreteEventSimulation.Random;

namespace DiscreteEventSimulation.Tests
{
    [TestClass]
    public class DesTests
    {
        [TestMethod]
        public void TestEventQueueStrictChronologicalOrder()
        {
            var queue = new EventQueue();

            queue.Enqueue(new SimEvent(SimEventType.Arrival, 15.4));
            queue.Enqueue(new SimEvent(SimEventType.Departure, 2.1));
            queue.Enqueue(new SimEvent(SimEventType.Arrival, 8.7));
            queue.Enqueue(new SimEvent(SimEventType.Departure, 3.5));
            queue.Enqueue(new SimEvent(SimEventType.Arrival, 0.4));

            double previousTime = -1.0;
            while (!queue.IsEmpty)
            {
                var ev = queue.Dequeue();
                Assert.IsTrue(ev.Time >= previousTime, $"Chronologie verletzt: {ev.Time} < {previousTime}");
                previousTime = ev.Time;
            }
        }

        [TestMethod]
        public void TestExponentialDistributionInversionMean()
        {
            double rate = 4.0;
            var exp = new ExponentialDistribution(rate, seed: 12345);

            int n = 100_000;
            double sum = 0.0;
            for (int i = 0; i < n; i++)
            {
                sum += exp.Sample();
            }

            double sampleMean = sum / n;
            double expectedMean = 1.0 / rate; // 0.25
            double relError = Math.Abs(sampleMean - expectedMean) / expectedMean;

            Assert.IsTrue(relError < 0.015, $"Exponentialverteilungs-Mittelwert weicht ab: {sampleMean} vs {expectedMean}");
        }

        [TestMethod]
        public void TestLittlesLawConvergence()
        {
            // Führt M/M/1-Simulation durch und prüft Little's Gesetz: L = lambda * W
            double lambda = 4.0;
            double mu = 5.0;
            double tMax = 15_000.0;

            var qs = new QueueSystem(lambda, mu, servers: 1);
            var result = qs.Simulate(tMax, seed: 777);

            // Little's Gesetz muss auf < 3% relativen Fehler konvergieren
            Assert.IsTrue(result.LittlesLawRelErrorSystem < 0.03, 
                $"Little's Gesetz (System) nicht erfüllt! Rel. Fehler = {result.LittlesLawRelErrorSystem:P3}");
            Assert.IsTrue(result.LittlesLawRelErrorQueue < 0.03, 
                $"Little's Gesetz (Queue) nicht erfüllt! Rel. Fehler = {result.LittlesLawRelErrorQueue:P3}");

            // Mittlere Schlängelänge sollte nahe am analytischen Wert (3.20) liegen (+/- 15% stochastische Schwankung)
            Assert.AreEqual(3.20, result.MeanQueueLengthLq, 0.5);
        }

        [TestMethod]
        public void TestAnalyticalMM1Formula()
        {
            var (rho, lq, l, wq, w) = QueueSystem.ComputeAnalyticalMM1(4.0, 5.0);

            Assert.AreEqual(0.80, rho, 1e-6);
            Assert.AreEqual(3.20, lq, 1e-6);
            Assert.AreEqual(4.00, l, 1e-6);
            Assert.AreEqual(0.80, wq, 1e-6);
            Assert.AreEqual(1.00, w, 1e-6);
        }
    }
}
