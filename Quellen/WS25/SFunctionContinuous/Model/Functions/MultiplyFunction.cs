namespace SFunctionContinuous.Model.Functions
{
    class MultiplyFunction : Function
    {
        public double Factor;

        public MultiplyFunction(string name, double factor) : base(name, 0, 1, 1, 0)
        {
            Factor = factor;
        }

        public override void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {
            y[0] = Factor * u[0];
        }

        public override string ToString()
        {
            return $"{Name}\n(Factor = {Factor})";
        }
    }
}
