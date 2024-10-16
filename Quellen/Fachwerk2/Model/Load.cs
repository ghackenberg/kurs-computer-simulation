namespace Fachwerk2.Model
{
    internal class Load
    {
        public int Index { get; }

        public Node Node { get; }

        public double ForceX { get; }
        public double ForceY { get; }

        public Load(int index, Node node, double forceX, double forceY)
        {
            Index = index;

            Node = node;

            ForceX = forceX;
            ForceY = forceY;
        }
    }
}
