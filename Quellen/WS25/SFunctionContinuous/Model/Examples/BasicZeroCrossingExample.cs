using SFunctionContinuous.Model.Blocks;

namespace SFunctionContinuous.Model.Examples
{
    public class BasicZeroCrossingExample : Example
    {
        public BasicZeroCrossingExample()
        {
            Block d = new ConstantBlock("Derivative", -0.3);
            Block x = new ConstantBlock("State", +1);
            Block i = new IntegrateWithLowerLimitBlock("IntegrateWithLowerLimit", 1, 0);
            Block r = new RecordBlock("Record");

            Model.AddBlock(x);
            Model.AddBlock(d);
            Model.AddBlock(i);
            Model.AddBlock(r);

            Model.AddConnection(d, 0, i, 0);
            Model.AddConnection(x, 0, i, 1);
            Model.AddConnection(i, 0, r, 0);
        }
    }
}
