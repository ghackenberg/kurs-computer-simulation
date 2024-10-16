using MathNet.Numerics.LinearAlgebra;

namespace Fachwerk2.Model
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
            // Anzahl Reihen berechnen

            var rows = Nodes.Count * 2;

            // Anzahl Spalten berechnen

            var cols = Rods.Count;

            foreach (var bearing in Bearings)
            {
                if (bearing.FixX)
                {
                    cols++;
                }
                if (bearing.FixY)
                {
                    cols++;
                }
            }

            // Bestimmtheit prüfen

            if (rows != cols)
            {
                throw new Exception("Unstable truss!");
            }

            // Verbindungs- und Lagerungsmatrix erstellen

            var A = Matrix<double>.Build.Dense(rows, cols);

            foreach (var rod in Rods)
            {
                var dx = rod.NodeB.X - rod.NodeA.X;
                var dy = rod.NodeB.Y - rod.NodeA.Y;

                var l = Math.Sqrt(dx * dx + dy * dy);

                A[rod.NodeA.Index * 2 + 0, rod.Index] = dx / l;
                A[rod.NodeA.Index * 2 + 1, rod.Index] = dy / l;

                A[rod.NodeB.Index * 2 + 0, rod.Index] = -dx / l;
                A[rod.NodeB.Index * 2 + 1, rod.Index] = -dy / l;
            }

            var col = 0;

            foreach (var bearing in Bearings)
            {
                if (bearing.FixX)
                {
                    A[bearing.Node.Index * 2 + 0, Rods.Count + col] = 1;
                    col++;
                }
                if (bearing.FixY)
                {
                    A[bearing.Node.Index * 2 + 1, Rods.Count + col] = 1;
                    col++;
                }
            }

            // Lastvektor erstellen

            var b = Vector<double>.Build.Dense(rows);

            foreach (var load in Loads)
            {
                b[load.Node.Index * 2 + 0] = load.ForceX;
                b[load.Node.Index * 2 + 1] = load.ForceY;
            }

            // Stab- und Lagerkräfte berechnen

            var x = A.Inverse().Multiply(b);

            // Stabkräfte übertragen

            foreach (var rod in Rods)
            {
                rod.Force = x[rod.Index];
            }

            // Lagerkräfte übertragen

            col = 0;

            foreach (var bearing in Bearings)
            {
                if (bearing.FixX)
                {
                    bearing.ForceX = x[Rods.Count + col];
                    col++;
                }
                if (bearing.FixY)
                {
                    bearing.ForceY = x[Rods.Count + col];
                    col++;
                }
            }
        }

    }
}
