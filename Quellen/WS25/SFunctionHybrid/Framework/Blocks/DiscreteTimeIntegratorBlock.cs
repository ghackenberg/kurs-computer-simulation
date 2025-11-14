using SFunctionContinuous.Framework;
using SFunctionContinuous.Framework.Declarations;

namespace SFunctionHybrid.Framework.Blocks
{
    public class DiscreteTimeIntegratorBlock : Block
    {
        public double StartValue { get; }

        public DiscreteTimeIntegratorBlock(string name, double startValue, double sampleTimeOffset, double sampleTimePeriod) : base(name, sampleTimeOffset, sampleTimePeriod)
        {
            DiscreteStates.Add(new StateDeclaration("X"));

            Inputs.Add(new InputDeclaration("U", false));

            Outputs.Add(new OutputDeclaration("Y"));
        }

        public override void InitializeStates(double[] continuousStates, double[] discreteStates)
        {
            discreteStates[0] = StartValue;
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            outputs[0] = discreteStates[0];
        }

        public override void UpdateStates(double time, double[] continuousStates, double[] discreteStates, double[] inputs)
        {
            discreteStates[0] = inputs[0] * SampleTimePeriod;
        }
    }
}
