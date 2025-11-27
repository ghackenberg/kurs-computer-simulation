using SFunctionHybrid.Framework;
using SFunctionHybrid.Framework.Declarations;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework.Blocks
{
    public class IfThenElseBlock : Block
    {
        public IfThenElseBlock(string name) : base(name, new InheritedSampleTime())
        {
            Inputs.Add(new InputDeclaration("U1", true));
            Inputs.Add(new InputDeclaration("U2", true));
            Inputs.Add(new InputDeclaration("U3", true));

            Outputs.Add(new OutputDeclaration("Y"));
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            if (inputs[0] == 0)
            {
                outputs[0] = inputs[2];
            }
            else
            {
                outputs[0] = inputs[1];
            }
        }
    }
}
