using SFunctionContinuous.Framework.Declarations;
using SFunctionHybrid.Framework.SampleTimes;
using System.Security.RightsManagement;

namespace SFunctionContinuous.Framework.Blocks
{
    public class IntegrateWithResetBlock : Block
    {
        public double StartValue;

        public IntegrateWithResetBlock(string name, double startValue) : base(name, new ContinuousSampleTime())
        {
            // Parameters
            StartValue = startValue;

            // States
            ContinuousStates.Add(new StateDeclaration("X"));

            // Inputs
            Inputs.Add(new InputDeclaration("U1", false));
            Inputs.Add(new InputDeclaration("U2", false));
            Inputs.Add(new InputDeclaration("U3", false));

            // Outputs
            Outputs.Add(new OutputDeclaration("Y"));

            // ZeroCrossings
            ZeroCrossings.Add(new ZeroCrossingDeclaration("Z"));
        }

        public override void InitializeStates(double[] continuousStates, double[] discreteStates)
        {
            continuousStates[0] = StartValue;
        }

        public override void CalculateDerivatives(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] derivatives)
        {
            derivatives[0] = inputs[0];
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            outputs[0] = continuousStates[0];
        }

        public override void CalculateZeroCrossings(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] zeroCrossings)
        {
            zeroCrossings[0] = inputs[1] - 1;
        }

        public override void UpdateStates(double time, double[] continuousStates, double[] discreteStates, double[] inputs)
        {
            if (inputs[1] == 1)
            {
                continuousStates[0] = inputs[2];
            }
        }

        public override string ToString()
        {
            return $"{Name}\n(StartValue = {StartValue})";
        }
    }
}
