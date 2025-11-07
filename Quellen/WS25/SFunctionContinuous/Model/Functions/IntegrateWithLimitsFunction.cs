using SFunctionContinuous.Model.Declarations;

namespace SFunctionContinuous.Model.Functions
{
    class IntegrateWithLimitsFunction : Function
    {
        public double StartValue;
        public double UpperLimit;
        public double LowerLimit;

        public IntegrateWithLimitsFunction(string name, double startValue, double upperLimit, double lowerLimit) : base(name)
        {
            // Parameters
            StartValue = startValue;
            UpperLimit = upperLimit;
            LowerLimit = lowerLimit;

            // States
            ContinuousStates.Add(new StateDeclaration("X"));

            // Inputs
            Inputs.Add(new InputDeclaration("U", false));

            // Outputs
            Outputs.Add(new OutputDeclaration("Y"));

            // ZeroCrossings
            ZeroCrossings.Add(new ZeroCrossingDeclaration("LowerLimit"));
            ZeroCrossings.Add(new ZeroCrossingDeclaration("UpperLimit"));
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

        public override void CalculateZeroCrossings(double t, double[] x, double[] u, double[] z)
        {
            z[0] = x[0] - LowerLimit;
            z[1] = x[0] - UpperLimit;
        }

        public override void UpdateStates(double t, double[] x, double[] u)
        {
            if (x[0] <= LowerLimit || x[0] >= UpperLimit)
            {
                x[0] = u[1];
            }
        }
    }
}
