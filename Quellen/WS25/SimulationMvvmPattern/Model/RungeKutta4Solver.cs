using System;

namespace SimulationMvvmPattern.Model
{
    /// <summary>
    /// Klassisches Runge-Kutta-Verfahren 4. Ordnung (RK4).
    /// Allokationsfrei im Hot Path durch vorallokierte Scratch-Puffer.
    /// Reiner C#-Berechnungskern ohne jede UI-Abhängigkeit.
    /// </summary>
    public class RungeKutta4Solver : IContinuousSolver
    {
        private double[] _k1 = [];
        private double[] _k2 = [];
        private double[] _k3 = [];
        private double[] _k4 = [];
        private double[] _xTemp = [];

        public void Step(IContinuousModel model, double t, double[] x, double dt)
        {
            int n = model.StateCount;
            if (_k1.Length != n)
            {
                _k1 = new double[n];
                _k2 = new double[n];
                _k3 = new double[n];
                _k4 = new double[n];
                _xTemp = new double[n];
            }

            double[] k1 = _k1;
            double[] k2 = _k2;
            double[] k3 = _k3;
            double[] k4 = _k4;
            double[] xTemp = _xTemp;

            // k1 = f(t, x)
            model.GetDerivatives(t, x, k1);

            // k2 = f(t + dt/2, x + dt/2 * k1)
            double dtHalf = 0.5 * dt;
            for (int i = 0; i < n; i++)
            {
                xTemp[i] = x[i] + dtHalf * k1[i];
            }
            model.GetDerivatives(t + dtHalf, xTemp, k2);

            // k3 = f(t + dt/2, x + dt/2 * k2)
            for (int i = 0; i < n; i++)
            {
                xTemp[i] = x[i] + dtHalf * k2[i];
            }
            model.GetDerivatives(t + dtHalf, xTemp, k3);

            // k4 = f(t + dt, x + dt * k3)
            for (int i = 0; i < n; i++)
            {
                xTemp[i] = x[i] + dt * k3[i];
            }
            model.GetDerivatives(t + dt, xTemp, k4);

            // x(t+dt) = x + (dt/6) * (k1 + 2*k2 + 2*k3 + k4)
            double dtSixth = dt / 6.0;
            for (int i = 0; i < n; i++)
            {
                x[i] += dtSixth * (k1[i] + 2.0 * k2[i] + 2.0 * k3[i] + k4[i]);
            }
        }
    }
}
