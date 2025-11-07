using SFunctionContinuous.Framework.Declarations;

namespace SFunctionContinuous.Framework.Blocks
{
    public class ConstantBlock : Block
    {
        public double Value;

        public ConstantBlock(string name, double value) : base(name)
        {
            // Parameters
            Value = value;

            // Outputs
            Outputs.Add(new OutputDeclaration("Value"));
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            outputs[0] = Value;
        }

        public override string ToString()
        {
            return $"{Name}\n(Value = {Value})";
        }
    }
}
