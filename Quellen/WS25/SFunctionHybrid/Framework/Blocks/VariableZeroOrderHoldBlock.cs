using SFunctionHybrid.Framework.Declarations;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework.Blocks
{
    /// <summary>
    /// This block acts as a Zero-Order Hold with a variable sample time.
    /// It samples its input 'U' at times determined by 'NextDeltaT' and holds the value until the next sample.
    /// </summary>
    public class VariableZeroOrderHoldBlock : Block
    {
        public double StartValue { get; }

        public VariableZeroOrderHoldBlock(string name, double startValue, double initialHitTime) : base(name, new VariableSampleTime(initialHitTime))
        {
            StartValue = startValue;

            // Input: Signal to be sampled
            Inputs.Add(new InputDeclaration("U", false));
            // Input: Delta time for the next sample hit
            Inputs.Add(new InputDeclaration("NextDeltaT", false));

            // Output: The held sampled value
            Outputs.Add(new OutputDeclaration("Y"));

            // Discrete state to hold the sampled value
            DiscreteStates.Add(new StateDeclaration("HeldValue"));
        }

        public override void InitializeStates(double[] continuousStates, double[] discreteStates)
        {
            discreteStates[0] = StartValue;
        }

        public override void UpdateStates(double time, double[] continuousStates, double[] discreteStates, double[] inputs)
        {
            // When a sample hit occurs, update the discrete state with the current input value.
            discreteStates[0] = inputs[0];
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            // The output is the held value from the discrete state.
            outputs[0] = discreteStates[0];
        }

        public override double GetNextVariableHitTime(double time, double[] continuousStates, double[] discreteStates, double[] inputs)
        {
            // The next hit occurs after the delta T specified by the second input.
            double deltaT = inputs[1];

            if (deltaT > 0)
            {
                return time + deltaT;
            }

            // If deltaT is not positive, effectively disable future hits.
            return double.MaxValue;
        }

        public override string ToString()
        {
            return $"{Name}\n(StartValue = {StartValue}, InitialHit = {((VariableSampleTime)SampleTime).Offset})";
        }
    }
}