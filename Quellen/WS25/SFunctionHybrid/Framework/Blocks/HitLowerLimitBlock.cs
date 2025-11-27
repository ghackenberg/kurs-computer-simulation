using SFunctionHybrid.Framework.Declarations;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework.Blocks
{
    public class HitLowerLimitBlock : Block
    {
        public double LowerLimit;

        public HitLowerLimitBlock(string name, double lowerLimit) : base(name, new InheritedSampleTime())
        {
            // Parameters
            LowerLimit = lowerLimit;

            // Inputs
            Inputs.Add(new InputDeclaration("U", true));

            // Outputs
            Outputs.Add(new OutputDeclaration("Y"));

            // ZeroCrossings
            ZeroCrossings.Add(new ZeroCrossingDeclaration("Z"));
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            if (inputs[0] - LowerLimit <= 0)
            {
                outputs[0] = 1;
            }
            else
            {
                outputs[0] = 0;
            }
        }

        public override void CalculateZeroCrossings(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] zeroCrossings)
        {
            zeroCrossings[0] = inputs[0] - LowerLimit;
        }

        public override string ToString()
        {
            return $"{Name}\n(LowerLimit = {LowerLimit})";
        }
    }
}
