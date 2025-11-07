using SFunctionContinuous.Model.Blocks;

namespace SFunctionContinuous.Model.Examples
{
    public class BasicLoopExample : Example
    {
        public BasicLoopExample()
        {
            Block a = new ConstantBlock("Constant", 1);
            Block b = new AddBlock("Add");
            Block c = new IntegrateBlock("Intergate", 0);
            Block d = new RecordBlock("Record");

            Model.AddBlock(a);
            Model.AddBlock(b);
            Model.AddBlock(c);
            Model.AddBlock(d);

            Model.AddConnection(a, 0, b, 0);
            Model.AddConnection(b, 0, c, 0);
            Model.AddConnection(c, 0, d, 0);
            Model.AddConnection(c, 0, b, 1);
        }
    }
}
