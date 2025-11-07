using SFunctionContinuous.Model.Functions;

namespace SFunctionContinuous.Model.Demonstations
{
    class BasicZeroCrossingDemonstration : Demonstration
    {
        public BasicZeroCrossingDemonstration()
        {
            Function d = new ConstantFunction("Derivative", -0.3);
            Function x = new ConstantFunction("State", +1);
            Function i = new IntegrateWithLowerLimitFunction("IntegrateWithLowerLimit", 1, 0);
            Function r = new RecordFunction("Record");

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
