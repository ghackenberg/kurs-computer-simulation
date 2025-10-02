using MathNet.Numerics.LinearAlgebra;

namespace IdealesFachwerk2D.Model
{
    class Truss
    {

        public List<Node> Nodes { get; set; } = new List<Node>();
        public List<Rod> Rods { get; set; } = new List<Rod>();

        public Node AddNode(string name, double positionX, double positionY, bool fixX, bool fixY, double forceX, double forceY)
        {
            Node node = new Node(name, positionX, positionY, fixX, fixY, forceX, forceY);

            node.Number = Nodes.Count;

            Nodes.Add(node);

            return node;
        }

        public Rod AddRod(Node nodeA, Node nodeB)
        {
            Rod rod = new Rod(nodeA, nodeB);

            rod.Number = Rods.Count;

            Rods.Add(rod);

            return rod;
        }

        public void Solve()
        {
            // Anzahl der Zeilen der Matrix berechnen

            int rows = Nodes.Count * 2;

            // Anzahl der Spalten der Matrix berechnen

            int columns = Rods.Count;

            foreach (Node node in Nodes)
            {
                if (node.FixX)
                {
                    columns++;
                }
                if (node.FixY)
                {
                    columns++;
                }
            }

            // Bestimmtheit prüfen

            if (rows != columns)
            {
                throw new Exception("Matrix nicht quadratisch!");
            }

            // Matrix aufstellen

            Matrix<double> A = Matrix<double>.Build.Dense(rows, columns);

            // Stäbe in die Matrix eintragen

            foreach (Rod rod in Rods)
            {
                Node nodeA = rod.NodeA;
                Node nodeB = rod.NodeB;

                double directionX = nodeB.PositionX - nodeA.PositionX;
                double directionY = nodeB.PositionY - nodeA.PositionY;

                double length = Math.Sqrt(directionX * directionX + directionY * directionY);

                directionX /= length;
                directionY /= length;

                A[nodeA.Number * 2 + 0, rod.Number] = directionX;
                A[nodeA.Number * 2 + 1, rod.Number] = directionY;

                A[nodeB.Number * 2 + 0, rod.Number] = -directionX;
                A[nodeB.Number * 2 + 1, rod.Number] = -directionY;
            }

            // Lager in die Matrix eintragen

            int column = Rods.Count;

            foreach (Node node in Nodes)
            {
                if (node.FixX)
                {
                    A[node.Number * 2 + 0, column] = 1;

                    column++;
                }
                if (node.FixY)
                {
                    A[node.Number * 2 + 1, column] = 1;

                    column++;
                }
            }

            // Lastvektor erstellen

            Vector<double> b = Vector<double>.Build.Dense(rows);

            foreach (Node node in Nodes)
            {
                b[node.Number * 2 + 0] = node.ForceX;
                b[node.Number * 2 + 1] = node.ForceY;
            }

            // Gleichungssystem lösen

            Vector<double> x = A.Inverse().Multiply(b);

            // Stabkräfte auslesen

            foreach (Rod rod in Rods)
            {
                rod.Force = x[rod.Number];
            }

            // Lagerkräfte auslesen

            int row = Rods.Count;

            foreach (Node node in Nodes)
            {
                if (node.FixX)
                {
                    node.ForceX = x[row++];
                }
                if (node.FixY)
                {
                    node.ForceY = x[row++];
                }
            }
        }
    }
}
