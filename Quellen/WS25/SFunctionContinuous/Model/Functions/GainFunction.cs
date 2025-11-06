using SFunctionContinuous.Model.Declarations;

namespace SFunctionContinuous.Model.Functions
{
    class GainFunction : Function
    {
        public double Factor;

        public GainFunction(string name, double factor) : base(name)
        {
            // Parameters
            Factor = factor;

            // Inputs
            Inputs.Add(new InputDeclaration("U", true));

            // Outputs
            Outputs.Add(new OutputDeclaration("Y"));
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
