namespace Fachwerk3.Model
{
    internal class Rod
    {
        public Node NodeA { get; }
        public Node NodeB { get; }

        public double Elasticity { get; }

        public double Area { get; }

        public double Length { get; }

        public double Force { get; set; } // Berechnet!

        public Rod(Node nodeA, Node nodeB, double elasticity, double area)
        {
            NodeA = nodeA;
            NodeB = nodeB;

            Elasticity = elasticity;

            Area = area;

            var dx = nodeA.InitialX - nodeB.InitialX;
            var dy = nodeA.InitialY - nodeB.InitialY;

            Length = Math.Sqrt(dx * dx + dy * dy);
        }
    }
}
