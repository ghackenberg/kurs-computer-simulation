namespace SFunctionContinuous.Model
{
    class Connection
    {
        public Function Source { get; }
        public Function Target { get; }

        public int Output { get; }
        public int Input { get; }

        public Connection(Function source, int output, Function target, int input)
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
