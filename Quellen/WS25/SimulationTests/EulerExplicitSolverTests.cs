using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SFunctionHybrid.Framework;
using SFunctionHybrid.Framework.Examples;
using SFunctionHybrid.Framework.Solvers;

namespace SimulationTests
{
    [TestClass]
    public class EulerExplicitSolverTests
    {
        [TestMethod]
        public void Test_BouncingBallExample_CompletesWithoutZenoException()
        {
            var example = new BouncingBallExample();
            var solver = new EulerExplicitSolver(example.Model);

            // BouncingBallExample crashed previously with ZeroCrossingIterationCountLimit exception.
            // With bisection and Zeno sticking threshold, it should run to completion.
            solver.Solve(example.TimeStepMax, example.TimeMax);

            // Verify final states are non-NaN and bounded
            foreach (var b in example.Model.Blocks)
            {
                for (int i = 0; i < b.ContinuousStates.Count; i++)
                {
                    Assert.IsFalse(double.IsNaN(solver.ContinuousStates[b][i]), $"State {i} in block {b.Name} is NaN.");
                    Assert.IsFalse(double.IsInfinity(solver.ContinuousStates[b][i]), $"State {i} in block {b.Name} is Infinity.");
                }
            }
        }

        [TestMethod]
        public void Test_BouncingBallExtendedExample_CompletesSuccessfully()
        {
            var example = new BouncingBallExtendedExample();
            var solver = new EulerExplicitSolver(example.Model);

            solver.Solve(example.TimeStepMax, example.TimeMax);

            foreach (var b in example.Model.Blocks)
            {
                for (int i = 0; i < b.ContinuousStates.Count; i++)
                {
                    Assert.IsFalse(double.IsNaN(solver.ContinuousStates[b][i]), $"State {i} in block {b.Name} is NaN.");
                    Assert.IsFalse(double.IsInfinity(solver.ContinuousStates[b][i]), $"State {i} in block {b.Name} is Infinity.");
                }
            }
        }
    }
}
