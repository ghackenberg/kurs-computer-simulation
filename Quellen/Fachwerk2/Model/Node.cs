namespace Fachwerk2.Model
{
    internal class Node
    {
        public int Index { get; }

        public string Name { get; }

        public double X { get; }
        public double Y { get; }

        public Node(int index, string name, double x, double y)
        {
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
