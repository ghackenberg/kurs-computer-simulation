namespace SFunctionContinuous.Model.Functions
{
    class IntegrateFunction : Function
    {
        public double StartValue;

        public IntegrateFunction(string name, double startValue) : base(name, 1, 1, 1, 0)
        {
            StartValue = startValue;
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
    }
}
