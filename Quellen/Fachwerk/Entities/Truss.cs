using MathNet.Numerics.LinearAlgebra;

namespace Fachwerk.Entities
{
    public class Truss
    {
        public string Name { get; }

        public List<Node> Nodes { get; } = new List<Node>();
        public List<Rod> Rods { get; } = new List<Rod>();
        public List<Bearing> Bearings { get; } = new List<Bearing>();
        public List<ExternalForce> ExternalForces { get; } = new List<ExternalForce>();

        public Truss(string name)
        {
            Name = name;
        }

        public Node AddNode(string name, double x, double y)
        {
            var node = new Node(this, Nodes.Count, name, x, y);

            Nodes.Add(node);

            return node;
        }

        public Rod AddRod(Node nodeA, Node nodeB)
        {
            var rod = new Rod(this, Rods.Count, nodeA, nodeB);

            Rods.Add(rod);

            return rod;
        }

        public Bearing AddBearing(Node node, bool fixX, bool fixY)
        {
            var bearing = new Bearing(this, Bearings.Count, node, fixX, fixY);

            Bearings.Add(bearing);

            return bearing;
        }

        public ExternalForce AddExternalForce(Node node, double x, double y)
        {
            var force = new ExternalForce(this, ExternalForces.Count, node, x, y);

            ExternalForces.Add(force);

            return force;
        }

        public void Solve()
        {
            // Build matrix
            var A = Matrix<double>.Build.Dense(Nodes.Count * 2, Rods.Count + Bearings.Count * 2);
            foreach (var rod in Rods)
            {
                double dx = rod.NodeB.X - rod.NodeA.X;
                double dy = rod.NodeB.Y - rod.NodeA.Y;

                double l = Math.Sqrt(dx * dx + dy * dy);

                A[rod.NodeA.Index * 2 + 0, rod.Index] = dx / l;
                A[rod.NodeA.Index * 2 + 1, rod.Index] = dy / l;

                A[rod.NodeB.Index * 2 + 0, rod.Index] = -dx / l;
                A[rod.NodeB.Index * 2 + 1, rod.Index] = -dy / l;
            }
            foreach (var bearing in Bearings)
            {
                A[bearing.Node.Index * 2 + 0, Rods.Count + bearing.Index * 2 + 0] = bearing.FixX ? 1 : 0;
                A[bearing.Node.Index * 2 + 1, Rods.Count + bearing.Index * 2 + 1] = bearing.FixY ? 1 : 0;
            }

            // Build node forces vector
            var b = Vector<double>.Build.Dense(Nodes.Count * 2);
            foreach (var externalForce in ExternalForces)
            {
                b[externalForce.Node.Index * 2 + 0] = externalForce.X;
                b[externalForce.Node.Index * 2 + 1] = externalForce.Y;
            }

            // Calculate rod and bearing forces
            var x = A.Svd().Solve(b);
            foreach (var rod in Rods)
            {
                rod.Force = x[rod.Index];
            }
            foreach (var bearing in Bearings)
            {
                bearing.ForceX = x[Rods.Count + bearing.Index * 2 + 0];
                bearing.ForceY = x[Rods.Count + bearing.Index * 2 + 1];
            }

            // Check solution for correctness
            var diff = (A.Multiply(x) - b).L2Norm();
            if (diff > 0.0001)
            {
                throw new Exception("Solution does not seem to be correct!");
            }
        }

        public double GetMinX()
        {
            return Nodes.Min(node => node.X);
        }

        public double GetMaxX()
        {
            return Nodes.Max(node => node.X);
        }

        public double GetMinY()
        {
            return Nodes.Min(node => node.Y);
        }

        public double GetMaxY()
        {
            return Nodes.Max(node => node.Y);
        }

        public double GetMinForce()
        {
            return Rods.Min(rod => rod.Force);
        }

        public double GetMaxForce()
        {
            return Rods.Max(rod => rod.Force);
        }

        public override string ToString()
        {
            return Name;
        }
    }
}
