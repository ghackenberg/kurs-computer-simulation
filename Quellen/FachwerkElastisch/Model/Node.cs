namespace FachwerkElastisch.Model
{
    public class Node
    {
        public string Name { get; }

        public double InitialX { get; }
        public double InitialY { get; }

        public bool FixX { get; }
        public bool FixY { get; }

        public int DegreesOfFreedom { get; } // Berechnet!

        public int IndexX { get; set; } // Berechnet!
        public int IndexY { get; set; } // Berechnet!

        public double ForceX { get; set; } // Berechnet, wenn fixiert!
        public double ForceY { get; set; } // Berechnet, wenn fixiert!

        public double DisplacementX { get; set; } // Berechnet, wenn nicht fixiert!
        public double DisplacementY { get; set; } // Berechnet, wenn nicht fixiert!

        public double FinalX { get; set; } // Berechnet!
        public double FinalY { get; set; } // Berechnet!

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
