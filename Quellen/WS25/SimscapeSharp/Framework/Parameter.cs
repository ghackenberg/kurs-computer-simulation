namespace SimscapeSharp.Framework
{
    public class Parameter : Expression
    {
        public double Value { get; }

        public Parameter(double value)
        {
            Value = value;
        }
    }
}
