using SimscapeSharp.Framework.Expressions;
using SimscapeSharp.Framework.Expressions.Binaries;
using System.CodeDom;
using System.Security.RightsManagement;

namespace SimscapeSharp.Framework
{
    public class Expression
    {
        public static Expression operator +(Expression left, Expression right)
        {
            return new Sum(left, right);
        }
        public static Expression operator -(Expression left, Expression right)
        {
            return new Difference(left, right);
        }
        public static Expression operator *(Expression left, Expression right)
        {
            return new Product(left, right);
        }
        public static Expression operator /(Expression left, Expression right)
        {
            return new Quotient(left, right);
        }

        public static Expression operator +(Expression left, double right)
        {
            return new Sum(left, new Constant(right));
        }
        public static Expression operator -(Expression left, double right)
        {
            return new Difference(left, new Constant(right));
        }
        public static Expression operator *(Expression left, double right)
        {
            return new Product(left, new Constant(right));
        }
        public static Expression operator /(Expression left, double right)
        {
            return new Quotient(left, new Constant(right));
        }
    }
}
