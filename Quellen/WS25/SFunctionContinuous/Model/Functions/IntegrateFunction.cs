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

        public override void InitializeConditions(double[] x)
        {
            x[0] = StartValue;
        }

        public override void CalculateDerivatives(double t, double[] x, double[] u, double[] d)
        {
            d[0] = u[0];
        }

        public override void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {
            y[0] = x[0];
        }
    }
}
