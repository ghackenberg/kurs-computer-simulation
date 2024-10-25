using MathNet.Numerics.LinearAlgebra;

namespace Fachwerk3.Model
{
    internal class Truss
    {
        public List<Node> Nodes { get; } = new List<Node>();

        public List<Rod> Rods { get; } = new List<Rod>();

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
            int i;

            // Schritt 1: Anzahl der bekannten Knotenverschiebungen berechnen

            var uUnknownCount = 0;

            foreach (var node in Nodes)
            {
                uUnknownCount += node.DegreesOfFreedom;
            }

            // Schritt 2: Anzahl der unbekannten Knotenverschiebungen berechnen

            var uKnownCount = Nodes.Count * 2 - uUnknownCount;

            // Anzahl der bekannten Knotenkräfte berechnen

            var fKnownCount = uUnknownCount;

            // Schritt 3: Anzahl der unbekannten Knotenkräfte (= Lagerkräfte) berechnen

            var fUnknownCount = uKnownCount;

            // Schritt 4: Steifigkeitsmatrix erstellen

            var kAA = Matrix<double>.Build.Dense(fUnknownCount, uKnownCount);
            var kAB = Matrix<double>.Build.Dense(fUnknownCount, uUnknownCount);
            var kBA = Matrix<double>.Build.Dense(fKnownCount, uKnownCount);
            var kBB = Matrix<double>.Build.Dense(fKnownCount, uUnknownCount);

            ///////////////////////////////
            // TODO -> Matrizen befüllen //
            ///////////////////////////////
            
            // Schritt 5: Bekannten Verschiebevektor erstellen (sortiert nach Knoten!)

            var uKnown = Vector<double>.Build.Dense(uKnownCount);

            // Schritt 6: Bekannten Kraftvektor erstellen (sortiert nach Knoten!)

            var fKnown = Vector<double>.Build.Dense(fKnownCount);

            i = 0;

            foreach (var node in Nodes)
            {
                if (!node.FixX)
                {
                    fKnown[i++] = node.ForceX;
                }
                if (!node.FixY)
                {
                    fKnown[i++] = node.ForceY;
                }
            }

            if (i != fKnownCount)
            {
                throw new Exception("Incorrect f-vector write!");
            }

            // Schritt 7: Knotenverschiebungen berechnen

            var uUnknown = kBB.Inverse() * (fKnown - kBA * uKnown); // MAGIC!!!

            if (uUnknown.Count != uUnknownCount)
            {
                throw new Exception("Incorrect vector size!");
            }

            // Schritt 8: Lagerkräfte berechnen

            var fUnknown = kAA * uKnown + kAB * uUnknown; // MAGIC!!!

            if (fUnknown.Count != fUnknownCount)
            {
                throw new Exception("Incorrect vector size!");
            }

            // Schritt 9: Knotenverschiebungen übertragen

            i = 0;

            foreach (var node in Nodes)
            {
                if (!node.FixX)
                {
                    node.DisplacementX = uUnknown[i++];
                }
                if (!node.FixY)
                {
                    node.DisplacementY = uUnknown[i++];
                }
            }

            if (i != uUnknownCount)
            {
                throw new Exception("Incorrect u-vector read!");
            }

            // Schritt 10: Lagerkräfte übertragen

            i = 0;

            foreach (var node in Nodes)
            {
                if (node.FixX)
                {
                    node.ForceX = fUnknown[i++];
                }
                if (node.FixY)
                {
                    node.ForceY = fUnknown[i++];
                }
            }

            if (i != fUnknownCount)
            {
                throw new Exception("Incorrect f-vector read!");
            }

            // Schritt 11: Finale Knotenkoordinaten berechnen

            foreach (var node in Nodes)
            {
                node.FinalX = node.InitialX + node.DisplacementX;
                node.FinalY = node.InitialY + node.DisplacementY;
            }
        }

    }
}
