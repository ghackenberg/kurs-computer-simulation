using SFunctionContinuous.Model.Declarations;

namespace SFunctionContinuous.Model.Functions
{
    class ConstantFunction : Function
    {
        public double Value;

        public ConstantFunction(string name, double value) : base(name)
        {
            // Parameters
            Value = value;

            // Outputs
            Outputs.Add(new OutputDeclaration("Value"));
        }

        public override void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {
            y[0] = Value;
        }

        public override string ToString()
        {
            return $"{Name}\n(Value = {Value})";
        }
    }
}
