namespace SimscapeSharp.Framework.Expressions
{
    public abstract class Binary : Expression
    {
        public Expression Left { get; }
        public Expression Right { get; }

        public Binary(Expression left, Expression right)
        {
            Left = left;
            Right = right;
        }
    }
}
