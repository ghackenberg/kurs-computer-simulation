using System;

namespace SimulationMvvmPattern.Model
{
    /// <summary>
    /// Schnittstelle für kontinuierliche zeitinvariante und zeitvariante dynamische Systeme.
    /// Vollständig frei von UI- oder Framework-Abhängigkeiten (Pure C# Domain Model).
    /// </summary>
    public interface IContinuousModel
    {
        /// <summary>
        /// Anzahl der kontinuierlichen Zustandsgrößen (Ordnung des DGL-Systems).
        /// </summary>
        int StateCount { get; }

        /// <summary>
        /// Berechnet die Zeitableitung dxdt = f(t, x) für den aktuellen Zustand x.
        /// Zero-Allocation über ReadOnlySpan und Span.
        /// </summary>
        /// <param name="t">Aktuelle Simulationszeit in Sekunden.</param>
        /// <param name="x">Aktueller Zustandsvektor der Länge StateCount.</param>
        /// <param name="dxdt">Puffer zur Aufnahme der berechneten Zustandsableitungen.</param>
        void GetDerivatives(double t, ReadOnlySpan<double> x, Span<double> dxdt);
    }
}
