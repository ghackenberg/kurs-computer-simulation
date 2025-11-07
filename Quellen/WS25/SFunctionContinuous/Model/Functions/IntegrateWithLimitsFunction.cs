using SFunctionContinuous.Model.Declarations;

namespace SFunctionContinuous.Model.Functions
{
    class IntegrateWithLimitsFunction : Function
    {
        public double StartValue;
        public double LowerLimit;
        public double UpperLimit;

        public IntegrateWithLimitsFunction(string name, double startValue, double lowerLimit, double upperLimit) : base(name)
        {
            // Parameters
            StartValue = startValue;
            LowerLimit = lowerLimit;
            UpperLimit = upperLimit;

            // States
            ContinuousStates.Add(new StateDeclaration("X"));

            // Inputs
            Inputs.Add(new InputDeclaration("U1", false));
            Inputs.Add(new InputDeclaration("U2", false));

            // Outputs
            Outputs.Add(new OutputDeclaration("Y"));

            // ZeroCrossings
            ZeroCrossings.Add(new ZeroCrossingDeclaration("LowerLimit"));
            ZeroCrossings.Add(new ZeroCrossingDeclaration("UpperLimit"));
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
            zeroCrossings[0] = continuousStates[0] - LowerLimit;
            zeroCrossings[1] = continuousStates[0] - UpperLimit;
        }

        public override void UpdateStates(double time, double[] continuousStates, double[] discreteStates, double[] inputs)
        {
            if (continuousStates[0] < LowerLimit || continuousStates[0] > UpperLimit)
            {
                continuousStates[0] = inputs[1];
            }
        }

        public override string ToString()
        {
            return $"{Name}\n(StartValue = {StartValue}, LowerLimit = {LowerLimit}, UpperLimit = {UpperLimit})";
        }
    }
}
