namespace SFunctionContinuous.Model.Solutions
{
    class EulerImplicitSolution : Solution
    {
        public EulerImplicitSolution(Composition composition) : base(composition)
        {

        }

        public sealed override void Solve(double step, double tmax)
        {
            throw new NotImplementedException();
        }

        protected override void CalculateOutputs(double t)
        {
            throw new NotImplementedException();
        }
    }
}
