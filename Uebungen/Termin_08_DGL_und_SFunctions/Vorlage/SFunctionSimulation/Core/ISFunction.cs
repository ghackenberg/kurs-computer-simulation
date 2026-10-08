using System;

namespace SFunctionSimulation.Core
{
    /// <summary>
    /// Simulink-analoge S-Function-Schnittstelle für kontinuierliche dynamische Systeme.
    /// Trennt strikt zwischen Zustand x, Ableitung x_dot = f(t, x, u) und Ausgang y = g(t, x, u).
    /// </summary>
    public interface ISFunction
    {
        /// <summary>
        /// Anzahl kontinuierlicher Zustände dim(x).
        /// </summary>
        int StateDimension { get; }

        /// <summary>
        /// Anzahl Steuereingänge dim(u).
        /// </summary>
        int InputDimension { get; }

        /// <summary>
        /// Anzahl Messausgänge dim(y).
        /// </summary>
        int OutputDimension { get; }

        /// <summary>
        /// Berechnet die Zeitableitung des Zustandsvektors: dx/dt = f(t, x, u).
        /// Reines, seiteneffektfreies Berechnungsverfahren für den ODE-Solver (z.B. RK4).
        /// </summary>
        /// <param name="t">Aktuelle Simulationszeit in Sekunden.</param>
        /// <param name="x">Zustandsvektor der Dimension StateDimension.</param>
        /// <param name="u">Eingangsvektor der Dimension InputDimension.</param>
        /// <returns>Ableitungsvektor dx/dt der Dimension StateDimension.</returns>
        double[] ComputeDerivatives(double t, double[] x, double[] u);

        /// <summary>
        /// Berechnet die Systemausgänge: y = g(t, x, u).
        /// </summary>
        /// <param name="t">Aktuelle Simulationszeit in Sekunden.</param>
        /// <param name="x">Zustandsvektor.</param>
        /// <param name="u">Eingangsvektor.</param>
        /// <returns>Ausgangsvektor y der Dimension OutputDimension.</returns>
        double[] ComputeOutputs(double t, double[] x, double[] u);
    }
}
