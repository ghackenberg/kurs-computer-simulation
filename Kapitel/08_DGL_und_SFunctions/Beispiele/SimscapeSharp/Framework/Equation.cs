namespace SimscapeSharp.Framework
{
    public class Equation
    {
        public Variable Variable{ get; }
        public Expression Expression { get; }

        public Equation(Variable variable, Expression expression)
        {
            Variable = variable;
            Expression = expression;
        }
    }
}
