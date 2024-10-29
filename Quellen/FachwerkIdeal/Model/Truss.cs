using MathNet.Numerics.LinearAlgebra;

namespace FachwerkIdeal.Model
{
    internal class Truss
    {
        public List<Node> Nodes { get; } = new List<Node>();
        public List<Rod> Rods { get; } = new List<Rod>();

        public Node AddNode(string name, double x, double y, bool fixX = false, bool fixY = false, double forceX = 0, double forceY = 0)
        {
            var node = new Node(Nodes.Count, name, x, y, fixX, fixY, forceX, forceY);

            Nodes.Add(node);

            return node;
        }
        public Rod AddRod(Node nodeA, Node nodeB)
        {
            var rod = new Rod(Rods.Count, nodeA, nodeB);

            Rods.Add(rod);

            return rod;
        }

        public void Solve()
        {
            // Anzahl Reihen berechnen

            var rows = Nodes.Count * 2;

            // Anzahl Spalten berechnen

            var cols = Rods.Count;

            foreach (var node in Nodes)
            {
                if (node.FixX)
                {
                    cols++;
                }
                if (node.FixY)
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

            foreach (var node in Nodes)
            {
                if (node.FixX)
                {
                    A[node.Index * 2 + 0, Rods.Count + col] = 1;
                    col++;
                }
                if (node.FixY)
                {
                    A[node.Index * 2 + 1, Rods.Count + col] = 1;
                    col++;
                }
            }

            // Lastvektor erstellen

            var b = Vector<double>.Build.Dense(rows);

            foreach (var node in Nodes)
            {
                b[node.Index * 2 + 0] = node.ForceX;
                b[node.Index * 2 + 1] = node.ForceY;
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

            foreach (var node in Nodes)
            {
                if (node.FixX)
                {
                    node.ForceX = x[Rods.Count + col];
                    col++;
                }
                if (node.FixY)
                {
                    node.ForceY = x[Rods.Count + col];
                    col++;
                }
            }
        }

    }
}
