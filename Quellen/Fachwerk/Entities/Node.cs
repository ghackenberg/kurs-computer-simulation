namespace Fachwerk.Entities
{
    public class Node
    {
        public Truss Model { get; }

        public string Name { get; }

        public int Index { get; }

        public double X { get; }
        public double Y { get; }

        public Node(Truss model, int index, string name, double x, double y)
        {
            Model = model;

            Index = index;

            Name = name;

            X = x;
            Y = y;
        }

        public override string ToString()
        {
            return Name;
        }
    }
}
