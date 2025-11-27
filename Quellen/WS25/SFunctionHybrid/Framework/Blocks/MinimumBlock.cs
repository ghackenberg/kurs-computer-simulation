using SFunctionHybrid.Framework;
using SFunctionHybrid.Framework.Declarations;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework.Blocks
{
    public class MinimumBlock : Block
    {
        public MinimumBlock(string name) : base(name, new InheritedSampleTime())
        {
            Inputs.Add(new InputDeclaration("U1", true));
            Inputs.Add(new InputDeclaration("U2", true));

            Outputs.Add(new OutputDeclaration("Y"));
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            outputs[0] = Math.Min(inputs[0], inputs[1]);
        }
    }
}
