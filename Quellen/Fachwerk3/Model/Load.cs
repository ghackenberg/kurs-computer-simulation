namespace Fachwerk3.Model
{
    internal class Load
    {
        public Node Node { get; }

        public double ForceX { get; }
        public double ForceY { get; }

        public Load(Node node, double forceX, double forceY)
        {
            Node = node;

            ForceX = forceX;
            ForceY = forceY;
        }
    }
}
