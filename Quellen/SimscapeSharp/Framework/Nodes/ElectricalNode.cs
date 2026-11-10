using SimscapeSharp.Framework.Attributes;

namespace SimscapeSharp.Framework.Nodes
{
    public class ElectricalNode : Node
    {
        public Variable V { get; } = new(0); // Voltage

        [Balancing]
        public Variable I { get; } = new(0); // Current

        public ElectricalNode(string name) : base(name)
        {

        }
    }
}
