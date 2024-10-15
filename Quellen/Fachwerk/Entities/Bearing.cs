namespace Fachwerk.Entities
{
    public class Bearing
    {
        public Truss Model { get; }

        public int Index { get; }

        public Node Node { get; }

        public bool FixX { get; }
        public bool FixY { get; }

        public double ForceX { get; set; } // To be computed!
        public double ForceY { get; set; } // To be computed!

        public Bearing(Truss model, int index, Node node, bool fixX, bool fixY)
        {
            Model = model;

            Index = index;

            Node = node;

            FixX = fixX;
            FixY = fixY;
        }
    }
}
