using SFunctionContinuous.Framework.Declarations;

namespace SFunctionContinuous.Framework.Blocks
{
    public class AddBlock : Block
    {
        public AddBlock(string name = "Add") : base(name, -1, 0)
        {
            // Inputs
            Inputs.Add(new InputDeclaration("A", true));
            Inputs.Add(new InputDeclaration("B", true));

            // Outputs
            Outputs.Add(new OutputDeclaration("Sum"));
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            outputs[0] = inputs[0] + inputs[1];
        }
    }
}
