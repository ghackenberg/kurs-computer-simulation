namespace Fachwerk3.Model
{
    internal class Rod
    {
        public Node NodeA { get; }
        public Node NodeB { get; }

        public double Force { get; set; } // Berechnet!

        public Rod(Node nodeA, Node nodeB)
        {
            NodeA = nodeA;
            NodeB = nodeB;
        }
    }
}
