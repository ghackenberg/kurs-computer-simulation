using System;

namespace DiscreteEventSimulation.Random
{
    /// <summary>
    /// Stochastischer Zufallsgenerator für exponentialverteilte Zufallsvariablen via Inversionsmethode:
    /// F(t) = 1 - exp(-lambda * t) = U  ==>  t = - (1 / lambda) * ln(1 - U)
    /// </summary>
    public class ExponentialDistribution
    {
        private readonly System.Random _random;

        public double Rate { get; } // lambda > 0

        public ExponentialDistribution(double rate, int? seed = null)
        {
            if (rate <= 0.0) throw new ArgumentOutOfRangeException(nameof(rate), "Rate lambda muss strikt positiv sein!");
            Rate = rate;
            _random = seed.HasValue ? new System.Random(seed.Value) : new System.Random();
        }

        /// <summary>
        /// Zieht eine exponentialverteilte Zufallszeit t >= 0.
        /// </summary>
        public double Sample()
        {
            // u in (0, 1] um ln(0) zu vermeiden
            double u = 1.0 - _random.NextDouble();
            if (u <= 0.0) u = 1e-12;

            return -Math.Log(u) / Rate;
        }

        /// <summary>
        /// Statische Hilfsmethode mit externer Random-Instanz (z. B. für Parallel.For).
        /// </summary>
        public static double Sample(System.Random rnd, double rate)
        {
            if (rate <= 0.0) throw new ArgumentOutOfRangeException(nameof(rate));
            double u = 1.0 - rnd.NextDouble();
            if (u <= 0.0) u = 1e-12;
            return -Math.Log(u) / rate;
        }

        /// <summary>
        /// Analytischer Erwartungswert E[T] = 1 / lambda.
        /// </summary>
        public double Mean => 1.0 / Rate;

        /// <summary>
        /// Analytische Varianz Var[T] = 1 / (lambda^2).
        /// </summary>
        public double Variance => 1.0 / (Rate * Rate);
    }
}
