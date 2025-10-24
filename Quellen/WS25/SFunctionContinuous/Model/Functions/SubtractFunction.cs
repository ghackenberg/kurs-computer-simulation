namespace SFunctionContinuous.Model.Functions
{
    class SubtractFunction : Function
    {
        public SubtractFunction(string name = "Subtract") : base(name, 0, 2, 1)
        {

        }

        public override void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {
            y[0] = u[0] - u[1];
        }
    }
}
