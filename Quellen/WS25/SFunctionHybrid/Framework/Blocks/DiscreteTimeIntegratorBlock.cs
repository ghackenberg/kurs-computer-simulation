using SFunctionContinuous.Framework;
using SFunctionContinuous.Framework.Declarations;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework.Blocks
{
    public class DiscreteTimeIntegratorBlock : Block
    {
        public double StartValue { get; }

        public DiscreteTimeIntegratorBlock(string name, double startValue, double sampleTimeOffset, double sampleTimePeriod) : base(name, new DiscreteSampleTime(sampleTimeOffset, sampleTimePeriod))
        {
            // Parameters
            StartValue = startValue;

            // Discrete states
            DiscreteStates.Add(new StateDeclaration("X"));

            // Inputs
            Inputs.Add(new InputDeclaration("U", false));

            // Outputs
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
            discreteStates[0] += inputs[0] * ((DiscreteSampleTime) SampleTime).Period;
        }

        public override string ToString()
        {
            return $"{Name}\n(StartValue = {StartValue}, Offset = {((DiscreteSampleTime)SampleTime).Offset}, Period = {((DiscreteSampleTime)SampleTime).Period})";
        }
    }
}
