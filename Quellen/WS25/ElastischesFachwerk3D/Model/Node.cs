using MathNet.Numerics.LinearAlgebra;

namespace ElastischesFachwerk3D.Model
{
    public class Node
    {
        public string Name { get; }

        public double InitialX { get; }
        public double InitialY { get; }
        public double InitialZ { get; }

        public bool FixX { get; }
        public bool FixY { get; }
        public bool FixZ { get; }

        public int DegreesOfFreedom { get; } // Berechnet!

        public int IndexX { get; set; } // Berechnet!
        public int IndexY { get; set; } // Berechnet!
        public int IndexZ { get; set; } // Berechnet!

        public double ForceX { get; set; } // Berechnet, wenn fixiert!
        public double ForceY { get; set; } // Berechnet, wenn fixiert!
        public double ForceZ { get; set; } // Berechnet, wenn fixiert!

        public double DisplacementX { get; set; } // Berechnet, wenn nicht fixiert!
        public double DisplacementY { get; set; } // Berechnet, wenn nicht fixiert!
        public double DisplacementZ { get; set; } // Berechnet, wenn nicht fixiert!

        public double FinalX { get; set; } // Berechnet!
        public double FinalY { get; set; } // Berechnet!
        public double FinalZ { get; set; } // Berechnet!

        public Node(string name, double initialX, double initialY, double initialZ, bool fixX, bool fixY, bool fixZ, double forceX, double forceY, double forceZ)
        {
            Name = name;

            InitialX = initialX;
            InitialY = initialY;
            InitialZ = initialZ;

            FixX = fixX;
            FixY = fixY;
            FixZ = fixZ;

            DegreesOfFreedom = (fixX ? 0 : 1) + (fixY ? 0 : 1) + (fixZ ? 0 : 1);

            ForceX = forceX;
            ForceY = forceY;
            ForceZ = forceZ;
        }

        public override string ToString()
        {
            return Name;
        }

        public Vector<double> InitialVector()
        {
            Vector<double> result = Vector<double>.Build.Dense(3);

            result[0] = InitialX;
            result[1] = InitialY;
            result[2] = InitialZ;

            return result;
        }

        public Vector<double> FinalVector()
        {
            Vector<double> result = Vector<double>.Build.Dense(3);

            result[0] = FinalX;
            result[1] = FinalY;
            result[2] = FinalZ;

            return result;
        }

        public Vector<double> InputForceVector()
        {
            Vector<double> result = Vector<double>.Build.Dense(3);

            result[0] = FixX ? 0 : ForceX;
            result[1] = FixY ? 0 : ForceY;
            result[2] = FixZ ? 0 : ForceZ;

            return result;
        }

        public Vector<double> OutputForceVector()
        {
            Vector<double> result = Vector<double>.Build.Dense(3);

            result[0] = FixX ? ForceX : 0;
            result[1] = FixY ? ForceY : 0;
            result[2] = FixZ ? ForceZ : 0;

            return result;
        }

        public Vector<double> DisplacementVector()
        {
            Vector<double> result = Vector<double>.Build.Dense(3);

            result[0] = DisplacementX;
            result[1] = DisplacementY;
            result[2] = DisplacementZ;

            return result;
        }
    }
}
