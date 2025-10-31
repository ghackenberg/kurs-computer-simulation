namespace SFunctionContinuous.Model.Functions
{
    class AddFunction : Function
    {
        public AddFunction(string name = "Add") : base(name, 0, 2, 1, 0)
        {

        }

        public override void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {
            y[0] = u[0] + u[1];
        }
    }
}
