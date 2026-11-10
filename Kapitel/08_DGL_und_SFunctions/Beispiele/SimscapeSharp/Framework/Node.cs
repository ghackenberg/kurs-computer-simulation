using SimscapeSharp.Framework.Attributes;

namespace SimscapeSharp.Framework
{
    public abstract class Node
    {
        public string Name { get; }

        public Node(string name)
        {
            Name = name;
        }

        public List<Variable> GetVariables()
        {
            return Helper.GetProperties<Variable>(this);
        }

        public List<Variable> GetBalancingVariables()
        {
            return Helper.GetProperties<Variable, BalancingAttribute>(this);
        }
    }
}
