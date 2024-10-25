using MathNet.Numerics.LinearAlgebra;
using System.Windows.Media;

namespace Fachwerk3.Model
{
    internal class Truss
    {
        public List<Node> Nodes { get; } = new List<Node>();

        public List<Rod> Rods { get; } = new List<Rod>();

        private int uKnownCount;
        private int fKnownCount;

        private int uUnknownCount;
        private int fUnknownCount;

        private Matrix<double> kAA = Matrix<double>.Build.Dense(0, 0);
        private Matrix<double> kAB = Matrix<double>.Build.Dense(0, 0);
        private Matrix<double> kBA = Matrix<double>.Build.Dense(0, 0);
        private Matrix<double> kBB = Matrix<double>.Build.Dense(0, 0);

        private Vector<double> uKnown = Vector<double>.Build.Dense(0);
        private Vector<double> fKnown = Vector<double>.Build.Dense(0);

        private Vector<double> uUnknown = Vector<double>.Build.Dense(0);
        private Vector<double> fUnknown = Vector<double>.Build.Dense(0);

        public Node AddNode(string name, double x, double y, bool fixX = false, bool fixY = false, double forceX = 0, double forceY = 0)
        {
            var node = new Node(name, x, y, fixX, fixY, forceX, forceY);

            Nodes.Add(node);

            return node;
        }
        public Rod AddRod(Node nodeA, Node nodeB, double elasticity = 1, double area = 1)
        {
            var rod = new Rod(nodeA, nodeB, elasticity, area);

            Rods.Add(rod);

            return rod;
        }

        public void Solve()
        {
            // Schritt 1: Anzahl der bekannten Knotenverschiebungen berechnen

            uUnknownCount = 0;

            foreach (var node in Nodes)
            {
                uUnknownCount += node.DegreesOfFreedom;
            }

            // Schritt 2: Anzahl der unbekannten Knotenverschiebungen berechnen

            uKnownCount = Nodes.Count * 2 - uUnknownCount;

            // Anzahl der bekannten Knotenkräfte berechnen

            fKnownCount = uUnknownCount;

            // Schritt 3: Anzahl der unbekannten Knotenkräfte (= Lagerkräfte) berechnen

            fUnknownCount = uKnownCount;

            // Schritt 4: Zeilenindices berechnen

            var i = 0;
            var j = 0;

            foreach (var node in Nodes)
            {
                node.IndexX = node.FixX ? i++ : j++;
                node.IndexY = node.FixY ? i++ : j++;
            }

            if (i != uKnownCount)
            {
                throw new Exception("Problem!");
            }
            if (j != fKnownCount)
            {
                throw new Exception("Problem!");
            }

            // Schritt 5: Steifigkeitsmatrix erstellen

            kAA = Matrix<double>.Build.Dense(fUnknownCount, uKnownCount);
            kAB = Matrix<double>.Build.Dense(fUnknownCount, uUnknownCount);
            kBA = Matrix<double>.Build.Dense(fKnownCount, uKnownCount);
            kBB = Matrix<double>.Build.Dense(fKnownCount, uUnknownCount);

            foreach (var rod in Rods)
            {
                var a = rod.NodeA;
                var b = rod.NodeB;

                // Stabrichtungsvektor berechnen

                var dx = b.InitialX - a.InitialX;
                var dy = b.InitialY - a.InitialY;

                // Stabeinheitsvektor berechnen

                var l = Math.Sqrt(dx * dx + dy * dy);

                var ex = dx / l;
                var ey = dy / l;

                // Steifigkeitsfaktor berechnen

                var s = rod.Elasticity * rod.Area / l;

                // Diagonale

                Select(a.FixX, a.FixX)[a.IndexX, a.IndexX] += +s * ex * ex;
                Select(a.FixY, a.FixY)[a.IndexY, a.IndexY] += +s * ey * ey;

                Select(b.FixX, b.FixX)[b.IndexX, b.IndexX] += +s * ex * ex;
                Select(b.FixY, b.FixY)[b.IndexY, b.IndexY] += +s * ey * ey;

                // Knoten A - XY

                Select(a.FixX, a.FixY)[a.IndexX, a.IndexY] += +s * ex * ey;
                Select(a.FixY, a.FixX)[a.IndexY, a.IndexX] += +s * ex * ey;

                // Knoten B - XY

                Select(b.FixX, b.FixY)[b.IndexX, b.IndexY] += +s * ex * ey;
                Select(b.FixY, b.FixX)[b.IndexY, b.IndexX] += +s * ex * ey;

                // Knoten AB - X

                Select(a.FixX, b.FixX)[a.IndexX, b.IndexX] += -s * ex * ex;
                Select(b.FixX, a.FixX)[b.IndexX, a.IndexX] += -s * ex * ex;

                // Knoten AB - Y

                Select(a.FixY, b.FixY)[a.IndexY, b.IndexY] += -s * ey * ey;
                Select(b.FixY, a.FixY)[b.IndexY, a.IndexY] += -s * ey * ey;

                // Diagonale 2

                Select(a.FixX, b.FixY)[a.IndexX, b.IndexY] += -s * ex * ey;
                Select(b.FixX, a.FixY)[b.IndexX, a.IndexY] += -s * ex * ey;

                Select(a.FixY, b.FixX)[a.IndexY, b.IndexX] += -s * ex * ey;
                Select(b.FixY, a.FixX)[b.IndexY, a.IndexX] += -s * ex * ey;
            }
            
            // Schritt 6: Bekannten Verschiebevektor erstellen

            uKnown = Vector<double>.Build.Dense(uKnownCount);

            foreach (var node in Nodes)
            {
                if (node.FixX)
                {
                    uKnown[node.IndexX] = node.DisplacementX;
                }
                if (node.FixY)
                {
                    uKnown[node.IndexY] = node.DisplacementY;
                }
            }

            // Schritt 7: Bekannten Kraftvektor erstellen

            fKnown = Vector<double>.Build.Dense(fKnownCount);

            foreach (var node in Nodes)
            {
                if (!node.FixX)
                {
                    fKnown[node.IndexX] = node.ForceX;
                }
                if (!node.FixY)
                {
                    fKnown[node.IndexY] = node.ForceY;
                }
            }

            // Schritt 8: Knotenverschiebungen berechnen

            uUnknown = kBB.Inverse() * (fKnown - kBA * uKnown);

            if (uUnknown.Count != uUnknownCount)
            {
                throw new Exception("Incorrect vector size!");
            }

            // Schritt 9: Lagerkräfte berechnen

            fUnknown = kAA * uKnown + kAB * uUnknown;

            if (fUnknown.Count != fUnknownCount)
            {
                throw new Exception("Incorrect vector size!");
            }

            // Schritt 10: Knotenverschiebungen übertragen

            foreach (var node in Nodes)
            {
                if (!node.FixX)
                {
                    node.DisplacementX = uUnknown[node.IndexX];
                }
                if (!node.FixY)
                {
                    node.DisplacementY = uUnknown[node.IndexY];
                }
            }

            // Schritt 11: Lagerkräfte übertragen

            foreach (var node in Nodes)
            {
                if (node.FixX)
                {
                    node.ForceX = fUnknown[node.IndexX];
                }
                if (node.FixY)
                {
                    node.ForceY = fUnknown[node.IndexY];
                }
            }

            // Schritt 12: Finale Knotenkoordinaten berechnen

            foreach (var node in Nodes)
            {
                node.FinalX = node.InitialX + node.DisplacementX;
                node.FinalY = node.InitialY + node.DisplacementY;
            }

            // Schritt 13: Stabkräfte berechnen

            foreach (var rod in Rods)
            {
                var a = rod.NodeA;
                var b = rod.NodeB;

                var dx = b.FinalX - a.FinalX;
                var dy = b.FinalY - a.FinalY;

                var l = Math.Sqrt(dx * dx + dy * dy);

                var delta = l - rod.Length;

                rod.Force = delta / rod.Length * rod.Elasticity * rod.Area;
            }
        }

        private Matrix<double> Select(bool fixA, bool fixB)
        {
            if (fixA)
            {
                return fixB ? kAA : kAB;
            }
            else
            {
                return fixB ? kBA : kBB;
            }
        }

    }
}
