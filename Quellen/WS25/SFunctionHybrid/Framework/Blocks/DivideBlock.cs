using SFunctionContinuous.Framework.Declarations;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionContinuous.Framework.Blocks
{
    public class DivideBlock : Block
    {
        public DivideBlock(string name = "Divide") : base(name, new InheritedSampleTime())
        {
            // Inputs
            Inputs.Add(new InputDeclaration("A", true));
            Inputs.Add(new InputDeclaration("B", true));

            // Outputs
            Outputs.Add(new OutputDeclaration("Quotiet"));
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            outputs[0] = inputs[0] / inputs[1];
        }
    }
}
