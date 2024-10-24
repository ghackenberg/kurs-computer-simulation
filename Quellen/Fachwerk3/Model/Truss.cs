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
            var node = new Node(name, x, y);

            Nodes.Add(node);

            return node;
        }
        public Rod AddRod(Node nodeA, Node nodeB)
        {
            var rod = new Rod(nodeA, nodeB);

            Rods.Add(rod);

            return rod;
        }
        public Bearing AddBearing(Node node, bool fixX, bool fixY)
        {
            if (node.Bearing != null)
            {
                throw new Exception("Maximum one bearing!");
            }

            var bearing = new Bearing(node, fixX, fixY);

            node.Bearing = bearing;

            Bearings.Add(bearing);

            return bearing;
        }
        public Load AddLoad(Node node, double forceX, double forceY)
        {
            if (node.Load != null)
            {
                throw new Exception("Maximum one load!");
            }

            var load = new Load(node, forceX, forceY);

            node.Load = load;

            Loads.Add(load);

            return load;
        }

        public void Solve()
        {
            int i;

            // Schritt 1: Anzahl der bekannten Knotenverschiebungen berechnen

            var uKnownCount = 0;

            foreach (var bearing in Bearings)
            {
                uKnownCount += bearing.Degree;
            }

            // Schritt 2: Anzahl der unbekannten Knotenverschiebungen berechnen

            var uUnknownCount = Nodes.Count * 2 - uKnownCount;

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
                if (node.Bearing != null)
                {
                    // Bekannte Kraftvektorkomponente für *nicht* fixierte Richtung

                    if (!node.Bearing.FixX)
                    {
                        fKnown[i++] = node.Load != null ? node.Load.ForceX : 0;
                    }
                    if (!node.Bearing.FixY)
                    {
                        fKnown[i++] = node.Load != null ? node.Load.ForceY : 0;
                    }
                }
                else
                {
                    // Bekannte Kraftvektorkomponenten für beide Richtungen

                    fKnown[i++] = node.Load != null ? node.Load.ForceX : 0;
                    fKnown[i++] = node.Load != null ? node.Load.ForceY : 0;
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
                if (node.Bearing != null)
                {
                    if (!node.Bearing.FixX)
                    {
                        node.DisplacementX = uUnknown[i++];
                    }
                    if (!node.Bearing.FixY)
                    {
                        node.DisplacementY = uUnknown[i++];
                    }
                }
                else
                {
                    node.DisplacementX = uUnknown[i++];
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
                if (node.Bearing != null)
                {
                    if (node.Bearing.FixX)
                    {
                        node.Bearing.ForceX = fUnknown[i++];
                    }
                    if (node.Bearing.FixY)
                    {
                        node.Bearing.ForceY = fUnknown[i++];
                    }
                }
            }

            if (i != fUnknownCount)
            {
                throw new Exception("Incorrect f-vector read!");
            }
        }

    }
}
