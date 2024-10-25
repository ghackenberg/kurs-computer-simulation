namespace Fachwerk3.Model
{
    internal class Node
    {
        public string Name { get; }

        public double InitialX { get; }
        public double InitialY { get; }

        public bool FixX { get; }
        public bool FixY { get; }

        public int DegreesOfFreedom { get; }

        public double ForceX { get; set; }
        public double ForceY { get; set; }

        public double DisplacementX { get; set; }
        public double DisplacementY { get; set; }

        public double FinalX { get; set; }
        public double FinalY { get; set; }

        public Node(string name, double initialX, double initialY, bool fixX, bool fixY, double forceX, double forceY)
        {
            Name = name;

            InitialX = initialX;
            InitialY = initialY;

            FixX = fixX;
            FixY = fixY;

            DegreesOfFreedom = (fixX ? 0 : 1) + (fixY ? 0 : 1);

            ForceX = forceX;
            ForceY = forceY;
        }

        public override string ToString()
        {
            return Name;
        }
    }
}
