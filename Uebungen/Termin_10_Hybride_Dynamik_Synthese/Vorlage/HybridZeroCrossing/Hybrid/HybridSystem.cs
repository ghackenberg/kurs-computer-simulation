using System;

namespace HybridZeroCrossing.Hybrid
{
    public enum ContactState
    {
        FreeFlight,
        RestingOnGround
    }

    /// <summary>
    /// Schnittstelle bzw. Basismodell für hybride dynamische Systeme mit kontinuierlichen Flussphasen
    /// und ereignisgesteuerten diskreten Resets bei Nullstellendurchgängen von z(x) = 0.
    /// </summary>
    public interface IHybridSystem
    {
        int Dimension { get; }

        /// <summary>
        /// Aktueller diskreter Systemzustand (z. B. Freier Flug vs. Liegen auf Boden).
        /// </summary>
        ContactState State { get; set; }

        /// <summary>
        /// Berechnet die Zeitableitungen dx/dt der kontinuierlichen Phase.
        /// </summary>
        double[] ComputeDerivatives(double t, double[] x);

        /// <summary>
        /// Zero-Crossing Indikatorfunktion z(x).
        /// Ein Vorzeichenwechsel z(x_k) * z(x_k+1) <= 0 signalisiert einen diskreten Zustandssprung.
        /// </summary>
        double ZeroCrossingIndicator(double[] x);

        /// <summary>
        /// Diskreter Reset-Operator x^+ = g(x^-) am exakten Schaltzeitpunkt t*.
        /// Liefert true, wenn das System in den Ruhe-/Haftzustand übergeht (Zeno-Schutz).
        /// </summary>
        bool ApplyDiscreteReset(ref double[] x);
    }
}
