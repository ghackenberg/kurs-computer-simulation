using System;

namespace SimulationMvvmPattern.Model
{
    /// <summary>
    /// Masse-Feder-Dämpfer-Schwinger 2. Ordnung:
    /// m * x'' + d * x' + c * x = 0
    /// Zustandsvektor: x[0] = Position [m], x[1] = Geschwindigkeit v [m/s]
    /// Ableitungen:   xDot[0] = v,         xDot[1] = (-d * v - c * x) / m
    /// Reines C#-Domain-Model ohne UI-Abhängigkeiten.
    /// </summary>
    public class MassSpringDamperModel : IContinuousModel
    {
        /// <summary>
        /// Masse m in kg (> 0).
        /// </summary>
        public double Mass { get; set; } = 1.0;

        /// <summary>
        /// Federkonstante c in N/m (>= 0).
        /// </summary>
        public double SpringConstant { get; set; } = 20.0;

        /// <summary>
        /// Dämpfungskonstante d in Ns/m (>= 0).
        /// </summary>
        public double Damping { get; set; } = 0.5;

        public int StateCount => 2;

        public void GetDerivatives(double t, ReadOnlySpan<double> x, Span<double> dxdt)
        {
            double pos = x[0];
            double vel = x[1];

            // dx/dt = v
            dxdt[0] = vel;

            // dv/dt = (-d * v - c * pos) / m
            double m = Mass > 1e-9 ? Mass : 1e-9;
            dxdt[1] = (-Damping * vel - SpringConstant * pos) / m;
        }
    }
}
