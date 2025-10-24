namespace SFunctionContinuous.Model
{
    abstract class Solution
    {
        public abstract void Solve(Composition composition, double step, double tmax);
    }
}
