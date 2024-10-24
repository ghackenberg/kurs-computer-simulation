namespace Fachwerk3.Model
{
    internal class Node
    {
        public string Name { get; }

        public double X { get; }
        public double Y { get; }

        public double DisplacementX { get; set; }
        public double DisplacementY { get; set; }

        public Bearing? Bearing { get; set; }
        public Load? Load { get; set; }

        public Node(string name, double x, double y)
        {
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
