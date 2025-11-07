using SFunctionContinuous.Framework.Blocks;

namespace SFunctionContinuous.Framework.Examples
{
    public class BouncingBallExample : Example
    {
        public BouncingBallExample() : base(0.1, 20)
        {
            Block g = new ConstantBlock("Gravity", -9.81);
            Block v = new IntegrateWithResetBlock("Velocity", 10);
            Block p = new IntegrateBlock("Position", 10);
            Block h = new HitLowerLimitBlock("HitLowerLimit", 0);
            Block d = new GainBlock("Damping", -0.8);
            //Block rg = new RecordBlock("RecordGravity");
            Block rv = new RecordBlock("RecordVelocity");
            Block rp = new RecordBlock("RecordPosition");
            //Block rh = new RecordBlock("RecordHit");
            //Block rd = new RecordBlock("RecordDamp");

            Model.AddBlock(g);
            Model.AddBlock(v);
            Model.AddBlock(p);
            Model.AddBlock(h);
            Model.AddBlock(d);
            //Model.AddBlock(rg);
            Model.AddBlock(rv);
            Model.AddBlock(rp);
            //Model.AddBlock(rd);
            //Model.AddBlock(rh);

            Model.AddConnection(g, 0, v, 0);
            Model.AddConnection(v, 0, p, 0);
            Model.AddConnection(v, 0, d, 0);
            Model.AddConnection(p, 0, h, 0);
            Model.AddConnection(h, 0, v, 1);
            Model.AddConnection(d, 0, v, 2);
            //Model.AddConnection(g, 0, rg, 0);
            Model.AddConnection(v, 0, rv, 0);
            Model.AddConnection(p, 0, rp, 0);
            //Model.AddConnection(h, 0, rh, 0);
            //Model.AddConnection(d, 0, rd, 0);
        }
    }
}
