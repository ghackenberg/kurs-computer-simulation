namespace SFunctionContinuous.Model.Solvers
{
    public class EulerImplicitLoopSolver : EulerImplicitSolver
    {
        public EulerImplicitLoopSolver(Model composition) : base(composition)
        {

        }

        protected override void CalculateOutputs(double t)
        {
            throw new NotImplementedException();
        }
    }
}
