using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using HybridZeroCrossing.Hybrid;
using HybridZeroCrossing.Models;
using HybridZeroCrossing.ZeroCrossing;

namespace HybridZeroCrossing.Tests
{
    [TestClass]
    public class HybridTests
    {
        [TestMethod]
        public void TestTheoreticalZenoLimitTimeFormula()
        {
            // Analytische Formel: t_inf = sqrt(2 * (h0 - R) / g) * (1 + e) / (1 - e)
            double h0 = 5.0;
            double r = 0.0;
            double g = 9.81;
            double e = 0.8;

            double t0 = Math.Sqrt(2.0 * h0 / g); // ca. 1.009638 s
            double expectedTInf = t0 * (1.0 + e) / (1.0 - e); // 9 * t0 ca. 9.0867 s

            double computedTInf = BouncingContactModel.TheoreticalZenoLimitTime(h0, r, g, e);
            Assert.AreEqual(expectedTInf, computedTInf, 1e-9);
        }

        [TestMethod]
        public void TestBisectionImpactPrecision()
        {
            // Verifiziert, dass die Bisektion das Zero-Crossing z(y) = y - R auf < 1e-6 m genau trifft
            var model = new BouncingContactModel { Radius = 0.1, Restitution = 0.8 };
            double[] x = new double[] { 2.0, 0.0 }; // Start bei 2m, Fallgeschwindigkeit 0

            double dt = 0.05; // Relativ großer Zeitschritt 50 ms
            double t = 0.0;
            bool hitDetected = false;

            for (int step = 0; step < 100; step++)
            {
                double[] xNext = BisectionRootFinder.IntegrateSubstep(model, t, x, dt);
                double zStart = model.ZeroCrossingIndicator(x);
                double zNext = model.ZeroCrossingIndicator(xNext);

                if (zStart > 0 && zNext <= 0)
                {
                    // Zero-Crossing gefunden!
                    var root = BisectionRootFinder.FindRoot(model, t, x, dt, epsilonZ: 1e-6);
                    hitDetected = true;

                    // Residuum muss kleiner als 1e-6 sein
                    Assert.IsTrue(Math.Abs(root.IndicatorResidual) < 1e-6, 
                        $"Bisektionsgenauigkeit unzureichend: Residuum = {root.IndicatorResidual:E3}");

                    // Kontaktposition y vor dem Reset muss exakt bei R liegen (+/- 1e-6 m)
                    Assert.AreEqual(model.Radius, root.StateBeforeReset[0], 1e-6, "Kontaktposition y vor Reset ungenau!");

                    // Restzeitschritt muss positiv und kleiner als dt sein
                    Assert.IsTrue(root.RemainingStep >= 0.0 && root.RemainingStep <= dt);
                    break;
                }

                x = xNext;
                t += dt;
            }

            Assert.IsTrue(hitDetected, "Es wurde kein Bodenaufprall detektiert!");
        }

        [TestMethod]
        public void TestEnergyRestitutionRatio()
        {
            // Beim Stoß muss der kinetische Energieverlust exakt dem Faktor e^2 entsprechen:
            // E_nach / E_vor = (0.5 * m * (v^+)^2) / (0.5 * m * (v^-)^2) = e^2
            var model = new BouncingContactModel { Radius = 0.1, Restitution = 0.8 };
            double[] x = new double[] { 3.0, 0.0 };
            double dt = 0.02;
            double t = 0.0;

            for (int step = 0; step < 100; step++)
            {
                double[] xNext = BisectionRootFinder.IntegrateSubstep(model, t, x, dt);
                if (model.ZeroCrossingIndicator(x) > 0 && model.ZeroCrossingIndicator(xNext) <= 0)
                {
                    var root = BisectionRootFinder.FindRoot(model, t, x, dt);

                    double vBefore = root.StateBeforeReset[1];
                    double vAfter = root.StateAfterReset[1];

                    double eKinBefore = 0.5 * model.Mass * vBefore * vBefore;
                    double eKinAfter = 0.5 * model.Mass * vAfter * vAfter;

                    double ratio = eKinAfter / eKinBefore;
                    double expectedRatio = model.Restitution * model.Restitution; // 0.8^2 = 0.64

                    Assert.AreEqual(expectedRatio, ratio, 1e-5, 
                        $"Kinetisches Energieverhältnis {ratio} weicht von e^2 = {expectedRatio} ab!");
                    return;
                }
                x = xNext;
                t += dt;
            }

            Assert.Fail("Aufprall wurde nicht erreicht.");
        }

        [TestMethod]
        public void TestZenoProtectionSwitchesToResting()
        {
            // Verifiziert, dass das System durch den Zeno-Schutz nach abklingenden Hüpfbewegungen
            // stabil in ContactState.RestingOnGround übergeht und nicht blockiert.
            var model = new BouncingContactModel
            {
                Radius = 0.1,
                Restitution = 0.6,    // Schnelleres Abklingen
                VStick = 0.2          // Großzügige Schwellgeschwindigkeit für den Test
            };

            double[] x = new double[] { 1.0, 0.0 }; // Start bei 1m
            double dt = 0.01;
            double t = 0.0;

            for (int i = 0; i < 500; i++)
            {
                x = model.StepWithBisection(t, x, dt, out _);
                t += dt;

                if (model.State == ContactState.RestingOnGround)
                {
                    // Erfolgreich zur Ruhe gekommen!
                    Assert.AreEqual(model.Radius, x[0], 1e-6, "Ball muss auf Bodenhöhe R ruhen!");
                    Assert.AreEqual(0.0, x[1], 1e-9, "Ruhende Geschwindigkeit muss exakt 0 sein!");
                    return;
                }
            }

            Assert.Fail("System ist nicht in den Ruhezustand (Zeno-Schutz) übergegangen!");
        }
    }
}
