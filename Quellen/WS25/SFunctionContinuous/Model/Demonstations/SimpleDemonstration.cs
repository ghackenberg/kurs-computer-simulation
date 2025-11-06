using SFunctionContinuous.Model.Functions;

namespace SFunctionContinuous.Model.Demonstations
{
    class SimpleDemonstration : Demonstration
    {
        public SimpleDemonstration()
        {
            Function a = new ConstantFunction("Constant1", 1);
            Function b = new ConstantFunction("Constant2", 2);
            Function c = new GainFunction("Multiply", 2);
            Function d = new AddFunction("Add");
            Function e = new IntegrateFunction("Intergate1", 0);
            Function f = new RecordFunction("Record1");
            Function g = new IntegrateFunction("Integrate2", 0);
            Function h = new RecordFunction("Record2");

            Composition.AddFunction(a);
            Composition.AddFunction(b);
            Composition.AddFunction(c);
            Composition.AddFunction(d);
            Composition.AddFunction(e);
            Composition.AddFunction(f);
            Composition.AddFunction(g);
            Composition.AddFunction(h);

            Composition.AddConnection(a, 0, c, 0);
            Composition.AddConnection(c, 0, d, 0);
            Composition.AddConnection(b, 0, d, 1);
            Composition.AddConnection(d, 0, e, 0);
            Composition.AddConnection(e, 0, f, 0);
            Composition.AddConnection(e, 0, g, 0);
            Composition.AddConnection(g, 0, h, 0);
        }
    }
}
