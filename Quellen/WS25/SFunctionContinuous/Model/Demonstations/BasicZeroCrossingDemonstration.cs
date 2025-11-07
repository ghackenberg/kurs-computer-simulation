using SFunctionContinuous.Model.Functions;

namespace SFunctionContinuous.Model.Demonstations
{
    class BasicZeroCrossingDemonstration : Demonstration
    {
        public BasicZeroCrossingDemonstration()
        {
            Function d = new ConstantFunction("D", -0.3);
            Function x = new ConstantFunction("X", +1);
            Function i = new IntegrateWithLimitsFunction("I", 1, Double.MaxValue, 0);
            Function r = new RecordFunction("R");

            Composition.AddFunction(x);
            Composition.AddFunction(d);
            Composition.AddFunction(i);
            Composition.AddFunction(r);

            Composition.AddConnection(d, 0, i, 0);
            Composition.AddConnection(x, 0, i, 1);
            Composition.AddConnection(i, 0, r, 0);
        }
    }
}
