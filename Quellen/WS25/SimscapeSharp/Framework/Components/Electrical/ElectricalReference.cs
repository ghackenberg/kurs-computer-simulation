using SimscapeSharp.Framework.Nodes;

namespace SimscapeSharp.Framework.Components.Electrical
{
    public class ElectricalReference : Component
    {
        public ElectricalNode V { get; } = new();

        public Equation E1 { get; }

        public ElectricalReference(string name) : base(name)
        {
            E1 = (V.V == 0);
        }
    }
}
