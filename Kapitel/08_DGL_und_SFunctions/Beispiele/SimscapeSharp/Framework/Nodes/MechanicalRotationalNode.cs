using SimscapeSharp.Framework.Attributes;

namespace SimscapeSharp.Framework.Nodes
{
    public class MechanicalRotationalNode : Node
    {
        public Variable W { get; } = new(0); // Rotational velocity

        [Balancing]
        public Variable T { get; } = new(0); // Torque

        public MechanicalRotationalNode(string name) : base(name)
        {

        }
    }
}
