using MathNet.Numerics.LinearAlgebra;

namespace IdealesFachwerk3D.Model
{
    class Truss
    {

        public List<Node> Nodes { get; set; } = new List<Node>();
        public List<Rod> Rods { get; set; } = new List<Rod>();

        public Node AddNode(string name, double positionX, double positionY, double positionZ, bool fixX, bool fixY, bool fixZ, double forceX, double forceY, double forceZ)
        {
            Node node = new Node(name, positionX, positionY, positionZ, fixX, fixY, fixZ, forceX, forceY, forceZ);

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

            int rows = Nodes.Count * 3;

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
                if (node.FixZ)
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
                double directionZ = nodeB.PositionZ - nodeA.PositionZ;

                double length = Math.Sqrt(directionX * directionX + directionY * directionY + directionZ * directionZ);

                directionX /= length;
                directionY /= length;
                directionZ /= length;

                A[nodeA.Number * 3 + 0, rod.Number] = directionX;
                A[nodeA.Number * 3 + 1, rod.Number] = directionY;
                A[nodeA.Number * 3 + 2, rod.Number] = directionZ;

                A[nodeB.Number * 3 + 0, rod.Number] = -directionX;
                A[nodeB.Number * 3 + 1, rod.Number] = -directionY;
                A[nodeB.Number * 3 + 2, rod.Number] = -directionZ;
            }

            // Lager in die Matrix eintragen

            int column = Rods.Count;

            foreach (Node node in Nodes)
            {
                if (node.FixX)
                {
                    A[node.Number * 3 + 0, column] = 1;

                    column++;
                }
                if (node.FixY)
                {
                    A[node.Number * 3 + 1, column] = 1;

                    column++;
                }
                if (node.FixZ)
                {
                    A[node.Number * 3 + 2, column] = 1;

                    column++;
                }
            }

            // Lastvektor erstellen

            Vector<double> b = Vector<double>.Build.Dense(rows);

            foreach (Node node in Nodes)
            {
                b[node.Number * 3 + 0] = -node.ForceX;
                b[node.Number * 3 + 1] = -node.ForceY;
                b[node.Number * 3 + 2] = -node.ForceZ;
            }

            // Gleichungssystem lösen

            Matrix<double> Ai = A.Inverse();

            Vector<double> x = Ai.Multiply(b);

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
                if (node.FixZ)
                {
                    node.ForceZ = x[row++];
                }
            }
        }
    }
}
