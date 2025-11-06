using SFunctionContinuous.Model.Declarations;

namespace SFunctionContinuous.Model.Functions
{
    class AddFunction : Function
    {
        public AddFunction(string name = "Add") : base(name)
        {
            // Inputs
            Inputs.Add(new InputDeclaration("A", true));
            Inputs.Add(new InputDeclaration("B", true));

            // Outputs
            Outputs.Add(new OutputDeclaration("Sum"));
        }

        public override void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {
            y[0] = u[0] + u[1];
        }
    }
}
