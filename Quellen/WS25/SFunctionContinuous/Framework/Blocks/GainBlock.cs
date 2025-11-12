using SFunctionContinuous.Framework.Declarations;

namespace SFunctionContinuous.Framework.Blocks
{
    public class GainBlock : Block
    {
        public double Factor;

        public GainBlock(string name, double factor) : base(name)
        {
            // Parameters
            Factor = factor;

            // Inputs
            Inputs.Add(new InputDeclaration("U", true));

            // Outputs
            Outputs.Add(new OutputDeclaration("Y"));
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] inputs, double[] outputs)
        {
            outputs[0] = Factor * inputs[0];
        }

        public override string ToString()
        {
            return $"{Name}\n(Factor = {Factor})";
        }
    }
}
