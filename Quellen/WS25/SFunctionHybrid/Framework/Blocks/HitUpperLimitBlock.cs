using SFunctionContinuous.Framework.Declarations;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionContinuous.Framework.Blocks
{
    public class HitUpperLimitBlock : Block
    {
        public double UpperLimit;

        public HitUpperLimitBlock(string name, double upperLimit) : base(name, new InheritedSampleTime())
        {
            // Parameters
            UpperLimit = upperLimit;

            // Inputs
            Inputs.Add(new InputDeclaration("U", true));

            // Outputs
            Outputs.Add(new OutputDeclaration("Y"));

            // ZeroCrossings
            ZeroCrossings.Add(new ZeroCrossingDeclaration("Z"));
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            if (inputs[0] - UpperLimit >= 0)
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
            zeroCrossings[0] = inputs[0] - UpperLimit;
        }

        public override string ToString()
        {
            return $"{Name}\n(UpperLimit = {UpperLimit})";
        }
    }
}
