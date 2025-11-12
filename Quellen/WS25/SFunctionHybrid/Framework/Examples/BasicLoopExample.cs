using SFunctionContinuous.Framework.Blocks;

namespace SFunctionContinuous.Framework.Examples
{
    public class BasicLoopExample : Example
    {
        public BasicLoopExample()
        {
            Block i = new IntegrateBlock("Intergate", 1);
            Block r = new RecordBlock("Record");

            Model.AddBlock(i);
            Model.AddBlock(r);

            Model.AddConnection(i, 0, i, 0);
            Model.AddConnection(i, 0, r, 0);
        }
    }
}
