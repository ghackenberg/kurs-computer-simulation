namespace SimscapeSharp.Framework.Components.Electrical
{
    public class ElectricalResistor : ElectricalBranch
    {
        public Parameter R { get; } = new(0); // Ohm

        public Equation E2 { get; }

        public ElectricalResistor(string name) : base(name)
        {
            E2 = (V == R * I);
        }
    }
}
