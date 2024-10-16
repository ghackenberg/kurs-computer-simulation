namespace Fachwerk2.Model
{
    internal class Bearing
    {
        public int Index { get; }

        public Node Node { get; }

        public bool FixX { get; }
        public bool FixY { get; }

        public double ForceX { get; set; } // Berechnet!
        public double ForceY { get; set; } // Berechnet!

        public Bearing(int index, Node node, bool fixX, bool fixY)
        {
            Index = index;

            Node = node;

            FixX = fixX;
            FixY = fixY;
        }
    }
}
