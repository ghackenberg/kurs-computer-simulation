using SFunctionContinuous.Model.Declarations;

namespace SFunctionContinuous.Model.Functions
{
    class IntegrateFunction : Function
    {
        public double StartValue;

        public IntegrateFunction(string name, double startValue) : base(name)
        {
            // Parameters
            StartValue = startValue;

            // States
            ContinuousStates.Add(new StateDeclaration("X"));

            // Inputs
            Inputs.Add(new InputDeclaration("U", false));

            // Outputs
            Outputs.Add(new OutputDeclaration("Y"));
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
    }
}
