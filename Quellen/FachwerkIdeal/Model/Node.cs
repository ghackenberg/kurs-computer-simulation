namespace FachwerkIdeal.Model
{
    internal class Node
    {
        public int Index { get; }

        public string Name { get; }

        public double X { get; }
        public double Y { get; }

        public bool FixX { get; }
        public bool FixY { get; }

        public double ForceX { get; set; } // Berechnet!
        public double ForceY { get; set; } // Berechnet!

        public Node(int index, string name, double x, double y, bool fixX, bool fixY, double forceX, double forceY)
        {
            Index = index;

            Name = name;

            X = x;
            Y = y;

            FixX = fixX;
            FixY = fixY;

            ForceX = forceX;
            ForceY = forceY;
        }

        public override string ToString()
        {
            return Name;
        }
    }
}
