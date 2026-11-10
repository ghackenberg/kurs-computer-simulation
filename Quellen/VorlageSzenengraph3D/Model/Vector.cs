namespace VorlageSzenengraph3D.Model
{
    public class Vector
    {
        public static readonly Vector ZERO = new Vector(0, 0, 0);
        public static readonly Vector UNIT_X = new Vector(1, 0, 0);
        public static readonly Vector UNIT_Y = new Vector(0, 1, 0);
        public static readonly Vector UNIT_Z = new Vector(0, 0, 1);

        public float X { get; set; }
        public float Y { get; set; }
        public float Z { get; set; }

        public Vector(float x, float y, float z)
        {
            X = x;
            Y = y;
            Z = z;
        }

        public float[] Array()
        {
            return new float[] { X, Y, Z, 1 };
        }

        public Vector Clone()
        {
            return new Vector(X, Y, Z);
        }
    }
}
