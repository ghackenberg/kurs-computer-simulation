using SFunctionContinuous.Model.Blocks;

namespace SFunctionContinuous.Model.Examples
{
    public class BasicExample : Example
    {
        public BasicExample()
        {
            Block a = new ConstantBlock("Constant1", 1);
            Block b = new ConstantBlock("Constant2", 2);
            Block c = new GainBlock("Multiply", 2);
            Block d = new AddBlock("Add");
            Block e = new IntegrateBlock("Intergate1", 0);
            Block f = new RecordBlock("Record1");
            Block g = new IntegrateBlock("Integrate2", 0);
            Block h = new RecordBlock("Record2");

            Model.AddBlock(a);
            Model.AddBlock(b);
            Model.AddBlock(c);
            Model.AddBlock(d);
            Model.AddBlock(e);
            Model.AddBlock(f);
            Model.AddBlock(g);
            Model.AddBlock(h);

            Model.AddConnection(a, 0, c, 0);
            Model.AddConnection(c, 0, d, 0);
            Model.AddConnection(b, 0, d, 1);
            Model.AddConnection(d, 0, e, 0);
            Model.AddConnection(e, 0, f, 0);
            Model.AddConnection(e, 0, g, 0);
            Model.AddConnection(g, 0, h, 0);
        }
    }
}
