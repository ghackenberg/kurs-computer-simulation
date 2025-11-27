using SFunctionHybrid.Framework.Blocks;

namespace SFunctionHybrid.Framework.Examples
{
    public class BasicExample : Example
    {
        public BasicExample()
        {
            Block c = new ConstantBlock("Constant1", 1);
            Block i1 = new IntegrateBlock("Intergate1", 0);
            Block i2 = new IntegrateBlock("Integrate2", 0);
            Block r1 = new RecordBlock("Record1");
            Block r2 = new RecordBlock("Record2");

            Model.AddBlock(c);
            Model.AddBlock(i1);
            Model.AddBlock(i2);
            Model.AddBlock(r1);
            Model.AddBlock(r2);

            Model.AddConnection(c, 0, i1, 0);
            Model.AddConnection(i1, 0, i2, 0);
            Model.AddConnection(i1, 0, r1, 0);
            Model.AddConnection(i2, 0, r2, 0);
        }
    }
}
