using System;

namespace DynamischWarteschlange.Model
{
    /// <summary>
    /// Numerisch stabiler 1-Pass-Akkumulator für Mittelwert und Varianz
    /// nach Welford (1962) mit paralleler Fusionsformel nach Chan, Golub & LeVeque (1979).
    /// Verhindert katastrophale Auslöschung bei großen Zahlenwerten mit geringer Varianz.
    /// </summary>
    public class ParallelWelfordAccumulator
    {
        /// <summary>Anzahl der bisher erfassten Stichproben.</summary>
        public long Count { get; private set; }

        /// <summary>Laufender arithmetischer Mittelwert.</summary>
        public double Mean { get; private set; }

        /// <summary>Summe der quadrierten Abweichungen M2 = Sum((x - Mean)^2).</summary>
        public double M2 { get; private set; }

        /// <summary>
        /// Fügt einen neuen Stichprobenwert in O(1) Zeit und O(1) Speicher hinzu.
        /// </summary>
        /// <param name="x">Messwert / Simulationsergebnis.</param>
        public void Add(double x)
        {
            Count++;
            double delta = x - Mean;
            Mean += delta / Count;
            double delta2 = x - Mean;
            M2 += delta * delta2;
        }

        /// <summary>
        /// Führt einen weiteren Teilakkumulator verlustfrei nach der Chan-Formel zusammen.
        /// Ermöglicht exakte parallele Reduktion in Parallel.For / PLINQ ohne Locks im Hot-Loop.
        /// </summary>
        /// <param name="other">Akkumulator eines parallelen Worker-Threads.</param>
        public void Merge(ParallelWelfordAccumulator? other)
        {
            if (other == null || other.Count == 0) return;

            if (this.Count == 0)
            {
                this.Count = other.Count;
                this.Mean = other.Mean;
                this.M2 = other.M2;
                return;
            }

            long newCount = this.Count + other.Count;
            double delta = other.Mean - this.Mean;

            this.Mean += delta * other.Count / newCount;
            this.M2 += other.M2 + delta * delta * ((double)this.Count * other.Count / newCount);
            this.Count = newCount;
        }

        /// <summary>Stichprobenvarianz s^2 (erwartungstreu korrigiert mit N - 1).</summary>
        public double Variance => Count > 1 ? M2 / (Count - 1) : 0.0;

        /// <summary>Empirische Standardabweichung s.</summary>
        public double StandardDeviation => Math.Sqrt(Variance);

        /// <summary>Standardfehler des Mittelwerts SE = s / sqrt(N).</summary>
        public double StandardError => Count > 0 ? Math.Sqrt(Variance / Count) : 0.0;

        /// <summary>
        /// Berechnet den halben Konfidenzintervall-Radius für das gegebene Signifikanzniveau (z.B. Z = 1.96 für 95%).
        /// </summary>
        public double GetConfidenceMargin(double zValue = 1.959964) => zValue * StandardError;
    }
}
