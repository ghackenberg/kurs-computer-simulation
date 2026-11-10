using SFunctionHybrid.Framework.Declarations;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework.Blocks
{
    /// <summary>
    /// This block demonstrates a variable sample time. It triggers a sample hit
    /// at times determined by an external input signal.
    /// The output of the block is the time of the last sample hit.
    /// </summary>
    public class VariableSampleTimeBlock : Block
    {
        public VariableSampleTimeBlock(string name, double initialHitTime) : base(name, new VariableSampleTime(initialHitTime))
        {
            // Input to define the time delta for the next sample hit
            Inputs.Add(new InputDeclaration("NextDeltaT", false));

            // Output the time of the last sample hit
            Outputs.Add(new OutputDeclaration("LastHitTime"));

            // Discrete state to store the last hit time
            DiscreteStates.Add(new StateDeclaration("T_hit"));
        }

        public override void InitializeStates(double[] continuousStates, double[] discreteStates)
        {
            // Initially, the output is 0. It will be updated at the first hit.
            discreteStates[0] = 0.0;
        }

        public override void UpdateStates(double time, double[] continuousStates, double[] discreteStates, double[] inputs)
        {
            // When a sample hit occurs, update the discrete state with the current time.
            discreteStates[0] = time;
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            // The output is the time of the last sample hit.
            outputs[0] = discreteStates[0];
        }

        public override double GetNextVariableHitTime(double time, double[] continuousStates, double[] discreteStates, double[] inputs)
        {
            // The next hit occurs after the delta T specified by the input.
            double deltaT = inputs[0];

            if (deltaT > 0)
            {
                return time + deltaT;
            }

            // If deltaT is not positive, effectively disable future hits.
            return double.MaxValue;
        }

        public override string ToString()
        {
            return $"{Name}\n(InitialHit = {((VariableSampleTime)SampleTime).Offset})";
        }
    }
}