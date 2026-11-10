using SFunctionHybrid.Framework.Declarations;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework.Blocks
{
    public class SubtractBlock : Block
    {
        public SubtractBlock(string name = "Subtract") : base(name, new InheritedSampleTime())
        {
            // Inputs
            Inputs.Add(new InputDeclaration("A", true));
            Inputs.Add(new InputDeclaration("B", true));

            // Outputs
            Outputs.Add(new OutputDeclaration("Difference"));
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            outputs[0] = inputs[0] - inputs[1];
        }
    }
}
