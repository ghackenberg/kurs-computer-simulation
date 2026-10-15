using System;
using SFunctionSimulation.Core;

namespace SFunctionSimulation.Solvers
{
    /// <summary>
    /// Klassischer Runge-Kutta Integrator 4. Ordnung (RK4) für Systeme gewöhnlicher Differentialgleichungen (ODEs).
    /// Konvergenzordnung: Lokal O(h^5), Global O(h^4).
    /// </summary>
    public static class RungeKutta4Solver
    {
        /// <summary>
        /// Führt einen einzelnen RK4-Zeitschritt von t nach t + h aus.
        /// </summary>
        /// <param name="system">Das zu integrierende S-Function-System.</param>
        /// <param name="t">Aktuelle Simulationszeit.</param>
        /// <param name="x">Aktueller Zustandsvektor x_k.</param>
        /// <param name="u">Eingangsvektor u(t).</param>
        /// <param name="h">Feste Zeitschrittweite h = dt in Sekunden.</param>
        /// <returns>Neuer Zustandsvektor x_{k+1}.</returns>
        public static double[] Step(ISFunction system, double t, double[] x, double[] u, double h)
        {
            int n = system.StateDimension;
            double hHalf = h * 0.5;

            // k1 = f(t, x, u)
            double[] k1 = system.ComputeDerivatives(t, x, u);

            // x_temp = x + (h/2) * k1
            double[] xTemp = new double[n];
            for (int i = 0; i < n; i++)
            {
                xTemp[i] = x[i] + hHalf * k1[i];
            }

            // k2 = f(t + h/2, xTemp, u)
            double[] k2 = system.ComputeDerivatives(t + hHalf, xTemp, u);

            // x_temp = x + (h/2) * k2
            for (int i = 0; i < n; i++)
            {
                xTemp[i] = x[i] + hHalf * k2[i];
            }

            // k3 = f(t + h/2, xTemp, u)
            double[] k3 = system.ComputeDerivatives(t + hHalf, xTemp, u);

            // x_temp = x + h * k3
            for (int i = 0; i < n; i++)
            {
                xTemp[i] = x[i] + h * k3[i];
            }

            // k4 = f(t + h, xTemp, u)
            double[] k4 = system.ComputeDerivatives(t + h, xTemp, u);

            // x_{k+1} = x + (h/6) * (k1 + 2*k2 + 2*k3 + k4)
            double[] xNext = new double[n];
            double hSixth = h / 6.0;
            for (int i = 0; i < n; i++)
            {
                xNext[i] = x[i] + hSixth * (k1[i] + 2.0 * k2[i] + 2.0 * k3[i] + k4[i]);
            }

            return xNext;
        }

        // TODO [Stufe A - Aufgabe A1]:
        // Implementieren Sie einen expliziten Euler-Schritt:
        //   public static double[] StepEuler(ISFunction system, double t, double[] x, double[] u, double h)
        // und testen Sie die numerische Stabilitätsgrenze bei h >= 0.025 s (T_el = L_A / R_A = 25 ms)!

        // TODO [Stufe B - Track A]:
        // Implementieren Sie das 2-stufige Verfahren von Heun (RK2):
        //   public static double[] StepHeun(ISFunction system, double t, double[] x, double[] u, double h)
    }
}
