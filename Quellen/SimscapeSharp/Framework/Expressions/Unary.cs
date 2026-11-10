namespace SimscapeSharp.Framework.Expressions
{
    public abstract class Unary : Expression
    {
        public Expression Argument { get; }

        public Unary(Expression argument)
        {
            Argument = argument;
        }
    }
}
