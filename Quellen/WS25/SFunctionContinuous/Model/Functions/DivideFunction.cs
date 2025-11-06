using SFunctionContinuous.Model.Declarations;

namespace SFunctionContinuous.Model.Functions
{
    class DivideFunction : Function
    {
        public DivideFunction(string name = "Divide") : base(name)
        {
            // Inputs
            Inputs.Add(new InputDeclaration("A", true));
            Inputs.Add(new InputDeclaration("B", true));

            // Outputs
            Outputs.Add(new OutputDeclaration("Quotiet"));
        }

        public override void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {
            y[0] = u[0] / u[1];
        }
    }
}
