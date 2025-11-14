using MathNet.Numerics.LinearAlgebra;

namespace ElastischesFachwerk3D.Model
{
    public class Truss
    {
        public List<Node> Nodes { get; } = new List<Node>();

        public List<Rod> Rods { get; } = new List<Rod>();

        public Node AddNode(string name, double x, double y, double z, bool fixX, bool fixY, bool fixZ, double forceX, double forceY, double forceZ)
        {
            var node = new Node(name, x, y, z, fixX, fixY, fixZ, forceX, forceY, forceZ);

            Nodes.Add(node);

            return node;
        }
        public Rod AddRod(Node nodeA, Node nodeB, double elasticity, double area)
        {
            var rod = new Rod(nodeA, nodeB, elasticity, area);

            Rods.Add(rod);

            return rod;
        }

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

        public void Solve()
        {
            // Schritt 1: Anzahl der bekannten Knotenverschiebungen berechnen

            uUnknownCount = 0;

            foreach (var node in Nodes)
            {
                uUnknownCount += node.DegreesOfFreedom;
            }

            // Schritt 2: Anzahl der unbekannten Knotenverschiebungen berechnen

            uKnownCount = Nodes.Count * 3 - uUnknownCount;

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
                node.IndexZ = node.FixZ ? i++ : j++;
            }

            if (i != uKnownCount)
            {
                throw new Exception("Problem!");
            }
            if (j != fKnownCount)
            {
                throw new Exception("Problem!");
            }

            // Schritt 5: Steifigkeitsmatrix erstellen (Superposition der Stäbe)

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
                var dz = b.InitialZ - a.InitialZ;

                // Stabeinheitsvektor berechnen

                var l = Math.Sqrt(dx * dx + dy * dy + dz * dz);

                var ex = dx / l;
                var ey = dy / l;
                var ez = dz / l;

                // Steifigkeitsfaktor berechnen

                var s = rod.Elasticity * rod.Area / l;

                // Knoten A

                Select(a.FixX, a.FixX)[a.IndexX, a.IndexX] += +s * ex * ex;
                Select(a.FixY, a.FixY)[a.IndexY, a.IndexY] += +s * ey * ey;
                Select(a.FixZ, a.FixZ)[a.IndexZ, a.IndexZ] += +s * ez * ez;

                // Knoten A - XY

                Select(a.FixX, a.FixY)[a.IndexX, a.IndexY] += +s * ex * ey;
                Select(a.FixY, a.FixX)[a.IndexY, a.IndexX] += +s * ex * ey;

                // Knoten A - XZ

                Select(a.FixX, a.FixZ)[a.IndexX, a.IndexZ] += +s * ex * ez;
                Select(a.FixZ, a.FixX)[a.IndexZ, a.IndexX] += +s * ex * ez;

                // Knoten A - YZ

                Select(a.FixY, a.FixZ)[a.IndexY, a.IndexZ] += +s * ey * ez;
                Select(a.FixZ, a.FixY)[a.IndexZ, a.IndexY] += +s * ey * ez;

                // Knoten B

                Select(b.FixX, b.FixX)[b.IndexX, b.IndexX] += +s * ex * ex;
                Select(b.FixY, b.FixY)[b.IndexY, b.IndexY] += +s * ey * ey;
                Select(b.FixZ, b.FixZ)[b.IndexZ, b.IndexZ] += +s * ez * ez;

                // Knoten B - XY

                Select(b.FixX, b.FixY)[b.IndexX, b.IndexY] += +s * ex * ey;
                Select(b.FixY, b.FixX)[b.IndexY, b.IndexX] += +s * ex * ey;

                // Knoten B - XZ

                Select(b.FixX, b.FixZ)[b.IndexX, b.IndexZ] += +s * ex * ez;
                Select(b.FixZ, b.FixX)[b.IndexZ, b.IndexX] += +s * ex * ez;

                // Knoten B - YZ

                Select(b.FixY, b.FixZ)[b.IndexY, b.IndexZ] += +s * ey * ez;
                Select(b.FixZ, b.FixY)[b.IndexZ, b.IndexY] += +s * ey * ez;

                // Knoten AB

                // Knoten AB - X

                Select(a.FixX, b.FixX)[a.IndexX, b.IndexX] += -s * ex * ex;
                Select(b.FixX, a.FixX)[b.IndexX, a.IndexX] += -s * ex * ex;

                // Knoten AB - Y

                Select(a.FixY, b.FixY)[a.IndexY, b.IndexY] += -s * ey * ey;
                Select(b.FixY, a.FixY)[b.IndexY, a.IndexY] += -s * ey * ey;

                // Knoten AB - Z

                Select(a.FixZ, b.FixZ)[a.IndexZ, b.IndexZ] += -s * ez * ez;
                Select(b.FixZ, a.FixZ)[b.IndexZ, a.IndexZ] += -s * ez * ez;

                // Knoten AB - XY

                Select(a.FixX, b.FixY)[a.IndexX, b.IndexY] += -s * ex * ey;
                Select(b.FixX, a.FixY)[b.IndexX, a.IndexY] += -s * ex * ey;

                Select(a.FixY, b.FixX)[a.IndexY, b.IndexX] += -s * ex * ey;
                Select(b.FixY, a.FixX)[b.IndexY, a.IndexX] += -s * ex * ey;

                // Knoten AB - XZ

                Select(a.FixX, b.FixZ)[a.IndexX, b.IndexZ] += -s * ex * ez;
                Select(b.FixX, a.FixZ)[b.IndexX, a.IndexZ] += -s * ex * ez;

                Select(a.FixZ, b.FixX)[a.IndexZ, b.IndexX] += -s * ex * ez;
                Select(b.FixZ, a.FixX)[b.IndexZ, a.IndexX] += -s * ex * ez;

                // Knoten AB - YZ

                Select(a.FixY, b.FixZ)[a.IndexY, b.IndexZ] += -s * ey * ez;
                Select(b.FixY, a.FixZ)[b.IndexY, a.IndexZ] += -s * ey * ez;

                Select(a.FixZ, b.FixY)[a.IndexZ, b.IndexY] += -s * ey * ez;
                Select(b.FixZ, a.FixY)[b.IndexZ, a.IndexY] += -s * ey * ez;
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
                if (node.FixZ)
                {
                    uKnown[node.IndexZ] = node.DisplacementZ;
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
                if (!node.FixZ)
                {
                    fKnown[node.IndexZ] = node.ForceZ;
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
                if (!node.FixZ)
                {
                    node.DisplacementZ = uUnknown[node.IndexZ];
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
                if (node.FixZ)
                {
                    node.ForceZ = fUnknown[node.IndexZ];
                }
            }

            // Schritt 12: Finale Knotenkoordinaten berechnen

            foreach (var node in Nodes)
            {
                node.FinalX = node.InitialX + node.DisplacementX;
                node.FinalY = node.InitialY + node.DisplacementY;
                node.FinalZ = node.InitialZ + node.DisplacementZ;
            }

            // Schritt 13: Stabkräfte aus Stablängenänderung berechnen

            foreach (var rod in Rods)
            {
                var a = rod.NodeA;
                var b = rod.NodeB;

                var dx = b.FinalX - a.FinalX;
                var dy = b.FinalY - a.FinalY;
                var dz = b.FinalZ - a.FinalZ;

                var l = Math.Sqrt(dx * dx + dy * dy + dz * dz);

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
