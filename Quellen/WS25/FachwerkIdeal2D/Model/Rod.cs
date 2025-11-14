namespace IdealesFachwerk2D.Model
{
    class Rod
    {

        public int Number { get; set; }

        public Node NodeA { get; set; }
        public Node NodeB { get; set; }

        public double Force { get; set; }

        public Rod(Node nodeA, Node nodeB)
        {
            NodeA = nodeA;
            NodeB = nodeB;
        }

    }
}
