namespace Fachwerk.Entities
{
    public class ExternalForce
    {
        public Truss Model { get; }

        public int Index { get; }

        public Node Node { get; }

        public double X { get; }
        public double Y { get; }

        public ExternalForce(Truss model, int index, Node node, double x, double y)
        {
            Model = model;

            Index = index;

            Node = node;

            X = x;
            Y = y;
        }
    }
}
