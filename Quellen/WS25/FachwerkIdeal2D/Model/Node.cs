namespace IdealesFachwerk2D.Model
{
    class Node
    {

        public int Number { get; set; }
        public string Name { get; set; }

        public double PositionX { get; set; }
        public double PositionY { get; set; }

        public bool FixX { get; set; }
        public bool FixY { get; set; }

        public double ForceX { get; set; }
        public double ForceY { get; set; }

        public Node(string name, double positionX, double positionY, bool fixX, bool fixY, double forceX, double forceY)
        {
            Name = name;

            PositionX = positionX;
            PositionY = positionY;

            FixX = fixX;
            FixY = fixY;

            ForceX = forceX;
            ForceY = forceY;
        }

    }
}
