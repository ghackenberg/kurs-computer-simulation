using System;

namespace DiscreteEventSimulation.Random
{
    /// <summary>
    /// Stochastischer Zufallsgenerator für Log-Normalverteilte Zufallszeiten (Aufgabe A2).
    /// Garantiert strikt positive Bedienzeiten X > 0 (stochastische Kausalität) bei frei
    /// wählbarem Soll-Mittelwert m = E[X] und Soll-Standardabweichung s = sqrt(Var[X]).
    /// </summary>
    public class LogNormalDistribution
    {
        private readonly System.Random _random;

        public double Mean { get; }
        public double StdDev { get; }
        public double MuLog { get; }
        public double SigmaLog { get; }

        public LogNormalDistribution(double mean, double stdDev, int? seed = null)
        {
            if (mean <= 0.0) throw new ArgumentOutOfRangeException(nameof(mean), "Mittelwert muss strikt positiv sein!");
            if (stdDev <= 0.0) throw new ArgumentOutOfRangeException(nameof(stdDev), "Standardabweichung muss strikt positiv sein!");

            Mean = mean;
            StdDev = stdDev;

            // Parameterumrechnung in den logarithmischen Raum (vgl. Kapitel 09, Abschnitt 9.6):
            // sigma^2 = ln(1 + s^2 / m^2),  mu = ln(m) - 0.5 * sigma^2
            double sigma2 = Math.Log(1.0 + (stdDev * stdDev) / (mean * mean));
            SigmaLog = Math.Sqrt(sigma2);
            MuLog = Math.Log(mean) - 0.5 * sigma2;

            _random = seed.HasValue ? new System.Random(seed.Value) : new System.Random();
        }

        /// <summary>
        /// Zieht eine log-normalverteilte Zufallszeit X = exp(MuLog + SigmaLog * Z) > 0
        /// mittels Box-Muller-Transformation für Z ~ N(0, 1).
        /// </summary>
        public double Sample()
        {
            // TODO [Aufgabe A2]:
            // Implementieren Sie hier die Box-Muller-Transformation für Z ~ N(0, 1)
            // und geben Sie X = Math.Exp(MuLog + SigmaLog * z) zurück:
            //   double u1 = 1.0 - _random.NextDouble();
            //   double u2 = 1.0 - _random.NextDouble();
            //   double z = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Cos(2.0 * Math.PI * u2);
            //   return Math.Exp(MuLog + SigmaLog * z);
            return Mean; // Platzhalter (deterministische Bedienzeit M/D/1 bis Aufgabe A2 gelöst ist)
        }
    }
}
