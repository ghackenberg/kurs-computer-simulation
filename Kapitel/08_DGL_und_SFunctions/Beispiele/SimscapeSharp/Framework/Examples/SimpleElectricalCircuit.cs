using SimscapeSharp.Framework.Components.Electrical;

namespace SimscapeSharp.Framework.Examples
{
    public class SimpleElectricalCircuit : Component
    {
        public ElectricalSource Source { get; } = new("Electrical source");
        public ElectricalResistor Resistor { get; } = new("Electrical resistor");
        public ElectricalReference Reference { get; } = new("Electrical reference");

        public SimpleElectricalCircuit() : base("Simple electrical circuit")
        {
            Connect(Source.P, Resistor.N);
            Connect(Resistor.P, Source.N);
            Connect(Source.P, Reference.V);
        }
    }
}
