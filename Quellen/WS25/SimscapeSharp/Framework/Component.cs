namespace SimscapeSharp.Framework
{
    public class Component
    {
        public string Name { get; }

        public List<Connection> Connections { get; } = new();

        public Component(string name)
        {
            Name = name;
        }

        public void Connect(Node a, Node b)
        {
            Connections.Add(new Connection(a, b));
        }

        public List<Node> GetNodes()
        {
            return Helper.GetProperties<Node>(this);
        }
        public List<Parameter> GetParameters()
        {
            return Helper.GetProperties<Parameter>(this);
        }
        public List<Variable> GetVariables()
        {
            return Helper.GetProperties<Variable>(this);
        }
        public List<Branch> GetBranches()
        {
            return Helper.GetProperties<Branch>(this);
        }
        public List<Equation> GetEquations()
        {
            return Helper.GetProperties<Equation>(this);
        }
        public List<Component> GetComponents()
        {
            return Helper.GetProperties<Component>(this);
        }
    }
}
