namespace Fachwerk2.Model
{
    internal class Rod
    {
        public int Index { get; }

        public Node NodeA { get; }
        public Node NodeB { get; }

        public double Force { get; set; } // Berechnet!

        public Rod(int index, Node nodeA, Node nodeB)
        {
            Index = index;

            NodeA = nodeA;
            NodeB = nodeB;
        }
    }
}
