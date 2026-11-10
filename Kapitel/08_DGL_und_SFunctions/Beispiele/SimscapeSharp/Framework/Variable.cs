using SimscapeSharp.Framework.Expressions;

namespace SimscapeSharp.Framework
{
    public class Variable : Expression
    {
        public double Value { get; }

        public Variable(double value)
        {
            Value = value;
        }

        public static Equation operator ==(Variable left, Expression right)
        {
            return new Equation(left, right);
        }
        public static Equation operator !=(Variable left, Expression right)
        {
            throw new NotImplementedException();
        }

        public static Equation operator ==(Variable left, double right)
        {
            return new Equation(left, new Constant(right));
        }
        public static Equation operator !=(Variable left, double right)
        {
            throw new NotImplementedException();
        }

        public override bool Equals(object? obj)
        {
            throw new NotImplementedException();
        }

        public override int GetHashCode()
        {
            throw new NotImplementedException();
        }
    }
}
