using SFunctionContinuous.Framework.Blocks;
using SFunctionHybrid.Framework.Blocks;

namespace SFunctionContinuous.Framework.Examples
{
    public class BouncingBallExtendedExample : Example
    {
        public BouncingBallExtendedExample() : base(0.01, 20)
        {
            Block g = new ConstantBlock("Gravity", -9.81);
            Block v = new IntegrateWithResetBlock("Velocity", 10);
            Block p = new IntegrateWithResetBlock("Position", 10);
            Block d = new GainBlock("Damping", -0.8);
            Block z = new ConstantBlock("Zero", 0);
            Block mp = new MaximumBlock("Maximum Position");
            Block mv = new MaximumBlock("Maximum Velocity");
            Block h = new HitLowerLimitBlock("HitLowerLimit", 0);
            Block ite = new IfThenElseBlock("IfThenElse");
            Block rv = new RecordBlock("RecordVelocity");
            Block rp = new RecordBlock("RecordPosition");

            Model.AddBlock(g);
            Model.AddBlock(v);
            Model.AddBlock(d);
            Model.AddBlock(p);
            Model.AddBlock(z);
            Model.AddBlock(mp);
            Model.AddBlock(mv);
            Model.AddBlock(h);
            Model.AddBlock(ite);
            Model.AddBlock(rv);
            Model.AddBlock(rp);

            Model.AddConnection(g, 0, v, 0);
            Model.AddConnection(h, 0, v, 1);
            Model.AddConnection(d, 0, v, 2);

            Model.AddConnection(v, 0, p, 0);
            Model.AddConnection(v, 0, d, 0);

            Model.AddConnection(p, 0, mp, 0);
            Model.AddConnection(z, 0, mp, 1);

            Model.AddConnection(v, 0, mv, 0);
            Model.AddConnection(z, 0, mv, 1);

            Model.AddConnection(mp, 0, h, 0);

            Model.AddConnection(h, 0, ite, 0);
            Model.AddConnection(mv, 0, ite, 1);
            Model.AddConnection(v, 0, ite, 2);

            Model.AddConnection(ite, 0, rv, 0);
            Model.AddConnection(mp, 0, rp, 0);
        }
    }
}
