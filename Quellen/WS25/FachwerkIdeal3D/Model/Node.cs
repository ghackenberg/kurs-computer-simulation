using MathNet.Numerics.LinearAlgebra;

namespace IdealesFachwerk3D.Model
{
    class Node
    {

        public int Number { get; set; }

        public string Name { get; set; }

        public double PositionX { get; set; }
        public double PositionY { get; set; }
        public double PositionZ { get; set; }

        public bool FixX { get; set; }
        public bool FixY { get; set; }
        public bool FixZ { get; set; }

        public double ForceX { get; set; }
        public double ForceY { get; set; }
        public double ForceZ { get; set; }

        public Node(string name, double positionX, double positionY, double positionZ, bool fixX, bool fixY, bool fixZ, double forceX, double forceY, double forceZ)
        {
            Name = name;

            PositionX = positionX;
            PositionY = positionY;
            PositionZ = positionZ;

            FixX = fixX;
            FixY = fixY;
            FixZ = fixZ;

            ForceX = forceX;
            ForceY = forceY;
            ForceZ = forceZ;
        }

        public Vector<double> PositionVector()
        {
            Vector<double> result = Vector<double>.Build.Dense(3);

            result[0] = PositionX;
            result[1] = PositionY;
            result[2] = PositionZ;

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

    }
}
