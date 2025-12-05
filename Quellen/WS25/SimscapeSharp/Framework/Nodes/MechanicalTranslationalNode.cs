using SimscapeSharp.Framework.Attributes;

namespace SimscapeSharp.Framework.Nodes
{
    public class MechanicalTranslationalNode : Node
    {
        public Variable V { get; } = new(0); // Velocity

        [Balancing]
        public Variable F { get; } = new(0); // Force

        public MechanicalTranslationalNode(string name) : base(name)
        {

        }
    }
}
