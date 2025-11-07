using SFunctionContinuous.Model.Blocks;

namespace SFunctionContinuous.Model.Examples
{
    public class BasicAlgebraicLoopExample : Example
    {
        public BasicAlgebraicLoopExample()
        {
            Block a = new ConstantBlock("Constant", 1);
            Block b = new SubtractBlock("Subtract");
            Block c = new RecordBlock("Record");

            Model.AddBlock(a);
            Model.AddBlock(b);
            Model.AddBlock(c);

            Model.AddConnection(a, 0, b, 0);
            Model.AddConnection(b, 0, c, 0);
            Model.AddConnection(b, 0, b, 1);
        }
    }
}
