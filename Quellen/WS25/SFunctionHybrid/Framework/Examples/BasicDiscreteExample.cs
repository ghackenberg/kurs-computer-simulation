using SFunctionContinuous.Framework;
using SFunctionContinuous.Framework.Blocks;
using SFunctionHybrid.Framework.Blocks;

namespace SFunctionHybrid.Framework.Examples
{
    public class BasicDiscreteExample : Example
    {
        public BasicDiscreteExample()
        {
            Block c = new ConstantBlock("Constant", 1);
            Block i1 = new IntegrateBlock("Integrate 1", 0);
            Block i2 = new IntegrateBlock("Integrate 2", 0);
            Block z = new ZeroOrderHoldBlock("Zero Order Hold", 0, 0, 1);
            Block r1 = new RecordBlock("Record 1");
            Block r2 = new RecordBlock("Record 2");
            Block r3 = new RecordBlock("Record 3");

            Model.AddBlock(c);
            Model.AddBlock(i1);
            Model.AddBlock(i2);
            Model.AddBlock(z);
            Model.AddBlock(r1);
            Model.AddBlock(r2);
            Model.AddBlock(r3);

            Model.AddConnection(c, 0, i1, 0);
            Model.AddConnection(i1, 0, i2, 0);
            Model.AddConnection(i2, 0, z, 0);
            Model.AddConnection(i1, 0, r1, 0);
            Model.AddConnection(i2, 0, r2, 0);
            Model.AddConnection(z, 0, r3, 0);
        }
    }
}
