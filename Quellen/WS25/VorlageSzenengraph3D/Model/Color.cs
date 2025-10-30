namespace VorlageSzenengraph3D.Model
{
    public class Color
    {
        public static readonly Color BLACK = new Color(0, 0, 0, 1);
        public static readonly Color DARKGRAY = new Color(0.25f, 0.25f, 0.25f, 1);
        public static readonly Color GRAY = new Color(0.5f, 0.5f, 0.5f, 1);
        public static readonly Color LIGHTGRAY = new Color(0.75f, 0.75f, 0.75f, 1);
        public static readonly Color WHITE = new Color(1, 1, 1, 1);

        public static readonly Color RED = new Color(1, 0, 0, 1);
        public static readonly Color GREEN = new Color(0, 1, 0, 1);
        public static readonly Color BLUE = new Color(0, 0, 1, 1);

        public float Red { get; set; }
        public float Green { get; set; }
        public float Blue { get; set; }
        public float Alpha { get; set; }

        public Color(float red, float green, float blue) : this(red, green, blue, 1)
        {

        }

        public Color(float red, float green, float blue, float alpha)
        {
            Red = red;
            Green = green;
            Blue = blue;
            Alpha = alpha;
        }

        public float[] Array()
        {
            return new float[] { Red, Green, Blue, Alpha };
        }

        public Color Clone()
        {
            return new Color(Red, Green, Blue, Alpha);
        }
    }
}