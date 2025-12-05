namespace SimscapeSharp.Framework.Components.Electrical
{
    public class ElectricalSource : ElectricalBranch
    {
        public Parameter V0 { get; } = new(1); // Voltage

        public Equation E2 { get; }
        
        public ElectricalSource(string name) : base(name)
        {
            E2 = (V == V0);
        }
    }
}
