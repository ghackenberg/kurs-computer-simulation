using SimscapeSharp.Framework.Nodes;

namespace SimscapeSharp.Framework.Components.Electrical
{
    public class ElectricalBranch : Component
    {
        public ElectricalNode P { get; } = new("P");
        public ElectricalNode N { get; } = new("N");

        public Variable V { get; } = new(0); // Voltage
        public Variable I { get; } = new(0); // Current

        public Branch B1 { get; }
        public Equation E1 { get; }

        public ElectricalBranch(string name) : base(name)
        {
            B1 = new(I, P.I, N.I);

            E1 = (V == P.V - N.V);
        }
    }
}
