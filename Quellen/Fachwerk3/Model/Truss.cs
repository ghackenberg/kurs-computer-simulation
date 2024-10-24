using MathNet.Numerics.LinearAlgebra;

namespace Fachwerk3.Model
{
    internal class Truss
    {
        public List<Node> Nodes { get; } = new List<Node>();
        public List<Rod> Rods { get; } = new List<Rod>();
        public List<Bearing> Bearings { get; } = new List<Bearing>();
        public List<Load> Loads { get; } = new List<Load>();

        public Node AddNode(string name, double x, double y)
        {
            var node = new Node(Nodes.Count, name, x, y);

            Nodes.Add(node);

            return node;
        }
        public Rod AddRod(Node nodeA, Node nodeB)
        {
            var rod = new Rod(Rods.Count, nodeA, nodeB);

            Rods.Add(rod);

            return rod;
        }
        public Bearing AddBearing(Node node, bool fixX, bool fixY)
        {
            var bearing = new Bearing(Bearings.Count, node, fixX, fixY);

            Bearings.Add(bearing);

            return bearing;
        }
        public Load AddLoad(Node node, double forceX, double forceY)
        {
            var load = new Load(Loads.Count, node, forceX, forceY);

            Loads.Add(load);

            return load;
        }

        public void Solve()
        {
            // Anzahl der bekannten Knoten-Verschiebungen berechnen

            var uKnownCount = 0;

            foreach (var bearing in Bearings)
            {
                if (bearing.FixX)
                {
                    uKnownCount++;
                }
                if (bearing.FixY)
                {
                    uKnownCount++;
                }
            }

            // Anzahl der unbekannten Knoten-Verschiebungen berechnen

            var uUnknownCount = Nodes.Count * 2 - uKnownCount;

            // Anzahl der bekannten Knoten-Kräfte berechnen

            var fKnownCount = Loads.Count * 2;

            // Anzahl der unbekannten Knoten-Kräfte berechnen

            var fUnknownCount = Nodes.Count * 2 - fKnownCount;

            // Matrizen erstellen

            var kAA = Matrix<double>.Build.Dense(fUnknownCount, uKnownCount);
            var kAB = Matrix<double>.Build.Dense(fUnknownCount, uUnknownCount);
            var kBA = Matrix<double>.Build.Dense(fKnownCount, uKnownCount);
            var kBB = Matrix<double>.Build.Dense(fKnownCount, uUnknownCount);

            // TODO -> Matrizen befüllen

            // Vektoren erstellen

            var uKnown = Vector<double>.Build.Dense(uKnownCount);
            var fKnown = Vector<double>.Build.Dense(fKnownCount);

            // TODO -> Vektoren befüllen

            // Vektoren berechnen

            var uUnknown = kBB.Inverse() * fKnown;
            var fUnknown = kAA * uKnown + kAB * uUnknown;

            // TODO -> Ergebnisse extrahieren
        }

    }
}
