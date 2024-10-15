namespace Fachwerk.Entities
{
    public class Rod
    {
        public Truss Model { get; }

        public int Index { get; }

        public Node NodeA { get; }
        public Node NodeB { get; }

        public double Force { get; set; } // To be computed!

        public Rod(Truss model, int index, Node nodeA, Node nodeB)
        {
            Model = model;

            Index = index;

            NodeA = nodeA;
            NodeB = nodeB;
        }
    }
}
