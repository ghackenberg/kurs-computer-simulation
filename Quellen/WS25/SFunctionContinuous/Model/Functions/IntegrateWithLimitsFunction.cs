namespace SFunctionContinuous.Model.Functions
{
    class IntegrateWithLimitsFunction : Function
    {
        public double StartValue;
        public double UpperLimit;
        public double LowerLimit;

        public IntegrateWithLimitsFunction(string name, double startValue, double upperLimit, double lowerLimit) : base(name, 1, 2, 1, 2)
        {
            StartValue = startValue;
            UpperLimit = upperLimit;
            LowerLimit = lowerLimit;
        }

        public override void InitializeConditions(double[] x)
        {
            x[0] = StartValue;
        }

        public override void CalculateDerivatives(double t, double[] x, double[] u, double[] d)
        {
            d[0] = u[0];
        }

        public override void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {
            y[0] = x[0];
        }

        public override void CalculateZeroCrossings(double t, double[] x, double[] u, double[] z)
        {
            z[0] = x[0] - UpperLimit;
            z[1] = x[0] - LowerLimit;
        }

        public override void UpdateStates(double t, double[] x, double[] u)
        {
            if (EqualsNumeric(x[0], UpperLimit) || EqualsNumeric(x[0], LowerLimit))
            {
                x[0] = u[1];
            }
        }

        private bool EqualsNumeric(double a, double b)
        {
            return Math.Abs(a - b) < 0.00001;
        }
    }
}
