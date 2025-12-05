namespace SimscapeSharp.Framework
{
    public class Connection
    {
        public Node A { get; }
        public Node B { get; }

        public Connection(Node a, Node b)
        {
            A = a;
            B = b;
        }
    }
}
