namespace Fachwerk3.Model
{
    internal class Bearing
    {
        public Node Node { get; }

        public bool FixX { get; }
        public bool FixY { get; }

        public int Degree { get; }

        public double ForceX { get; set; } // Berechnet!
        public double ForceY { get; set; } // Berechnet!

        public Bearing(Node node, bool fixX, bool fixY)
        {
            Node = node;

            FixX = fixX;
            FixY = fixY;

            Degree = (fixX ? 1 : 0) + (fixY ? 1 : 0);
        }
    }
}
