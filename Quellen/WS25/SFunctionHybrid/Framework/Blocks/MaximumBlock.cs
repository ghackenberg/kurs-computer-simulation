using SFunctionContinuous.Framework;
using SFunctionContinuous.Framework.Declarations;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework.Blocks
{
    public class MaximumBlock : Block
    {
        public MaximumBlock(string name) : base(name, new InheritedSampleTime())
        {
            Inputs.Add(new InputDeclaration("U1", true));
            Inputs.Add(new InputDeclaration("U2", true));

            Outputs.Add(new OutputDeclaration("Y"));
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            outputs[0] = Math.Max(inputs[0], inputs[1]);
        }
    }
}
