using SFunctionContinuous.Model.Declarations;

namespace SFunctionContinuous.Model.Functions
{
    class SubtractFunction : Function
    {
        public SubtractFunction(string name = "Subtract") : base(name)
        {
            // Inputs
            Inputs.Add(new InputDeclaration("A", true));
            Inputs.Add(new InputDeclaration("B", true));

            // Outputs
            Outputs.Add(new OutputDeclaration("Difference"));
        }

        public override void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {
            y[0] = u[0] - u[1];
        }
    }
}
