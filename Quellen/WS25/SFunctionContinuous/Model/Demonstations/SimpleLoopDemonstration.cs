using SFunctionContinuous.Model.Functions;

namespace SFunctionContinuous.Model.Demonstations
{
    class SimpleLoopDemonstration : Demonstration
    {
        public SimpleLoopDemonstration()
        {
            Function a = new ConstantFunction("Constant", 1);
            Function b = new SubtractFunction("Subtract");
            Function c = new RecordFunction("Record");

            Composition.AddFunction(a);
            Composition.AddFunction(b);
            Composition.AddFunction(c);

            Composition.AddConnection(a, 0, b, 0);
            Composition.AddConnection(b, 0, c, 0);
            Composition.AddConnection(b, 0, b, 1);
        }
    }
}
