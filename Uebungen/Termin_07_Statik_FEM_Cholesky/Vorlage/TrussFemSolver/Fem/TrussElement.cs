using System;
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Double;

namespace TrussFemSolver.Fem
{
    /// <summary>
    /// Repräsentiert einen Knoten im 2D-Fachwerk mit geometrischen Koordinaten und Freiheitsgraden.
    /// Jeder Knoten besitzt zwei DOFs: [2*Id] für X, [2*Id + 1] für Y.
    /// </summary>
    public class Node
    {
        public int Id { get; }
        public double X { get; set; }
        public double Y { get; set; }

        public Node(int id, double x, double y)
        {
            Id = id;
            X = x;
            Y = y;
        }

        public int DofX => 2 * Id;
        public int DofY => 2 * Id + 1;
    }

    /// <summary>
    /// Repräsentiert ein elastisches 2D-Stabelement zwischen zwei Knoten.
    /// </summary>
    public class TrussElement
    {
        public int Id { get; }
        public Node Node1 { get; }
        public Node Node2 { get; }
        public double YoungsModulus { get; set; } // E in Pa (N/m^2)
        public double Area { get; set; }          // A in m^2

        public TrussElement(int id, Node node1, Node node2, double youngsModulus, double area)
        {
            Id = id;
            Node1 = node1;
            Node2 = node2;
            YoungsModulus = youngsModulus;
            Area = area;
        }

        /// <summary>
        /// Ausgangslänge L des Stabelements.
        /// </summary>
        public double Length
        {
            get
            {
                double dx = Node2.X - Node1.X;
                double dy = Node2.Y - Node1.Y;
                return Math.Sqrt(dx * dx + dy * dy);
            }
        }

        /// <summary>
        /// Einheitsrichtungsvektor n = [cos(alpha), sin(alpha)]^T.
        /// </summary>
        public (double Cos, double Sin) Direction
        {
            get
            {
                double l = Length;
                if (l < 1e-12) throw new InvalidOperationException($"Stab {Id} hat degenerierte Länge 0!");
                return ((Node2.X - Node1.X) / l, (Node2.Y - Node1.Y) / l);
            }
        }

        /// <summary>
        /// Berechnet die 4x4 Elementsteifigkeitsmatrix K_e bezogen auf die DOFs [u_x1, u_y1, u_x2, u_y2].
        /// K_e = (E*A/L) * [ n*n^T, -n*n^T ; -n*n^T, n*n^T ]
        /// </summary>
        public Matrix<double> ComputeElementStiffnessMatrix()
        {
            double l = Length;
            var (c, s) = Direction;
            double k = (YoungsModulus * Area) / l;

            var ke = DenseMatrix.OfArray(new double[,]
            {
                {  c * c * k,  c * s * k, -c * c * k, -c * s * k },
                {  c * s * k,  s * s * k, -c * s * k, -s * s * k },
                { -c * c * k, -c * s * k,  c * c * k,  c * s * k },
                { -c * s * k, -s * s * k,  c * s * k,  s * s * k }
            });

            return ke;
        }

        /// <summary>
        /// Berechnet die Stabnormalkraft N (Zug positiv, Druck negativ).
        /// N = E * A / L * [ -c, -s, c, s ] * u_e
        /// </summary>
        public double ComputeNormalForce(Vector<double> globalDisplacements)
        {
            var (c, s) = Direction;
            double ux1 = globalDisplacements[Node1.DofX];
            double uy1 = globalDisplacements[Node1.DofY];
            double ux2 = globalDisplacements[Node2.DofX];
            double uy2 = globalDisplacements[Node2.DofY];

            // Längenänderung Delta L = n^T * (u2 - u1)
            double deltaL = c * (ux2 - ux1) + s * (uy2 - uy1);
            double strain = deltaL / Length;
            return YoungsModulus * Area * strain;
        }

        /// <summary>
        /// Berechnet die Normalspannung sigma in N/m^2 (Pa).
        /// </summary>
        public double ComputeStress(Vector<double> globalDisplacements)
        {
            return ComputeNormalForce(globalDisplacements) / Area;
        }
    }
}
