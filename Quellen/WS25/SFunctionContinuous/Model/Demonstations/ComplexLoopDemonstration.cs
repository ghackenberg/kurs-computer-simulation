using SFunctionContinuous.Model.Functions;

namespace SFunctionContinuous.Model.Demonstations
{
    class ComplexLoopDemonstration : Demonstration
    {
        public ComplexLoopDemonstration()
        {
            Function a = new ConstantFunction("Constant", 1);
            Function b = new AddFunction("Add");
            Function c = new IntegrateFunction("Intergate", 0);
            Function d = new RecordFunction("Record");

            Composition.AddFunction(a);
            Composition.AddFunction(b);
            Composition.AddFunction(c);
            Composition.AddFunction(d);

            Composition.AddConnection(a, 0, b, 0);
            Composition.AddConnection(b, 0, c, 0);
            Composition.AddConnection(c, 0, d, 0);
            Composition.AddConnection(c, 0, b, 1);
        }
    }
}
