namespace SFunctionContinuous.Model
{
    class Connection
    {
        public Function Source;
        public int Output;

        public Function Target;
        public int Input;

        public Connection(Function source, int output, Function target, int input)
        {
            Source = source;
            Output = output;
            Target = target;
            Input = input;
        }

        public override string ToString()
        {
            return $"y[{Output}] -> u[{Input}]";
        }
    }
}
