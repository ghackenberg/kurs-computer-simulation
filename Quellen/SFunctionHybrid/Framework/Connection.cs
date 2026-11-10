namespace SFunctionHybrid.Framework
{
    public class Connection
    {
        public Block Source { get; }
        public Block Target { get; }

        public int Output { get; }
        public int Input { get; }

        public Connection(Block source, int output, Block target, int input)
        {
            Source = source;
            Target = target;

            Output = output;
            Input = input;
        }

        public override string ToString()
        {
            return $"{Source.Outputs[Output].Name} -> {Target.Inputs[Input].Name}";
        }
    }
}
