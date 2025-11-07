namespace SFunctionContinuous.Framework.Solvers
{
    public class EulerImplicitSolver : Solver
    {
        public EulerImplicitSolver(Model composition) : base(composition)
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
