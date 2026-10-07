using System;

namespace SimulationEngine.Statistics
{
    /// <summary>
    /// Numerisch stabiler 1-Pass-Akkumulator für Mittelwert und Varianz
    /// nach Welford (1962) mit paralleler Fusionsformel nach Chan, Golub & LeVeque (1979).
    /// </summary>
    public class ParallelWelfordAccumulator
    {
        public long Count { get; private set; }
        public double Mean { get; private set; }
        public double M2 { get; private set; }

        public void Add(double x)
        {
            Count++;
            double delta = x - Mean;
            Mean += delta / Count;
            double delta2 = x - Mean;
            M2 += delta * delta2;
        }

        public void Merge(ParallelWelfordAccumulator other)
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

        public double Variance => Count > 1 ? M2 / (Count - 1) : 0.0;
        public double StandardDeviation => Math.Sqrt(Variance);
        public double StandardError => Count > 0 ? Math.Sqrt(Variance / Count) : 0.0;
    }
}
