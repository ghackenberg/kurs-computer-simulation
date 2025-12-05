namespace SimscapeSharp.Framework.Expressions
{
    public class Constant : Expression
    {
        public static Constant PI { get; } = new Constant(Math.PI);
        public static Constant E { get; } = new Constant(Math.E);

        public double Value { get; }

        public Constant(double value)
        {
            Value = value;
        }
    }
}
