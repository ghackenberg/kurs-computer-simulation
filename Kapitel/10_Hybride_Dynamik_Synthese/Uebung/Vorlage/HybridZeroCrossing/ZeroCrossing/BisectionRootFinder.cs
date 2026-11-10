using System;
using HybridZeroCrossing.Hybrid;

namespace HybridZeroCrossing.ZeroCrossing
{
    public record RootFinderResult(
        double ImpactTime, 
        double[] StateBeforeReset, 
        double[] StateAfterReset, 
        double RemainingStep, 
        int Iterations, 
        double IndicatorResidual);

    /// <summary>
    /// Bisektions-Wurzelsucher zur Lokalisierung von Zero-Crossing-Ereignissen z(x) = 0.
    /// Halbiert das Zeitschritt-Intervall [t_k, t_{k+1}], bis |z(x)| &lt; epsilon_z erreicht ist.
    /// </summary>
    public static class BisectionRootFinder
    {
        /// <summary>
        /// Sucht den exakten Schaltzeitpunkt t* im Intervall [t_start, t_start + h].
        /// </summary>
        /// <param name="system">Das hybride System.</param>
        /// <param name="tStart">Startzeit des Zeitschritts.</param>
        /// <param name="xStart">Zustand bei tStart.</param>
        /// <param name="h">Gesamtschrittweite des Intervalls.</param>
        /// <param name="epsilonZ">Toleranz für |z(x)| (z. B. 1e-6 m).</param>
        /// <param name="maxIterations">Maximale Anzahl Bisektionsschritte.</param>
        public static RootFinderResult FindRoot(
            IHybridSystem system, 
            double tStart, 
            double[] xStart, 
            double h, 
            double epsilonZ = 1e-6, 
            int maxIterations = 35)
        {
            double tLeft = 0.0;
            double tRight = h;

            double[] xMid = (double[])xStart.Clone();
            double zMid = system.ZeroCrossingIndicator(xStart);
            int iter = 0;

            while (iter < maxIterations)
            {
                iter++;
                double dtMid = 0.5 * (tLeft + tRight);

                // Integriere von xStart mit Zeitschritt dtMid
                xMid = IntegrateSubstep(system, tStart, xStart, dtMid);
                zMid = system.ZeroCrossingIndicator(xMid);

                if (Math.Abs(zMid) < epsilonZ)
                {
                    // Konvergenzkriterium erfüllt
                    break;
                }

                // Vorzeichenprüfung (Bisektionsentscheidung)
                if (zMid > 0.0)
                {
                    // Kontakt noch nicht erreicht -> Vorrücken nach rechts
                    tLeft = dtMid;
                }
                else
                {
                    // Penetration -> Zurückweichen nach links
                    tRight = dtMid;
                }
            }

            double dtImpact = 0.5 * (tLeft + tRight);
            double exactImpactTime = tStart + dtImpact;
            double remainingStep = h - dtImpact;

            double[] stateBefore = (double[])xMid.Clone();
            double[] stateAfter = (double[])xMid.Clone();

            // Diskreten Reset ausführen
            system.ApplyDiscreteReset(ref stateAfter);

            return new RootFinderResult(
                ImpactTime: exactImpactTime,
                StateBeforeReset: stateBefore,
                StateAfterReset: stateAfter,
                RemainingStep: remainingStep,
                Iterations: iter,
                IndicatorResidual: zMid
            );
        }

        /// <summary>
        /// Führt einen kontinuierlichen Zwischenintegrationsschritt (Heun / RK2) aus.
        /// Exakt 2. Ordnung - für freie Wurfdynamik unter konstanter Gravitation analytisch exakt!
        /// </summary>
        public static double[] IntegrateSubstep(IHybridSystem system, double t, double[] x, double dt)
        {
            int n = x.Length;
            double[] k1 = system.ComputeDerivatives(t, x);

            double[] xTemp = new double[n];
            for (int i = 0; i < n; i++)
            {
                xTemp[i] = x[i] + dt * k1[i];
            }

            double[] k2 = system.ComputeDerivatives(t + dt, xTemp);

            double[] next = new double[n];
            for (int i = 0; i < n; i++)
            {
                next[i] = x[i] + 0.5 * dt * (k1[i] + k2[i]);
            }

            return next;
        }
    }
}
