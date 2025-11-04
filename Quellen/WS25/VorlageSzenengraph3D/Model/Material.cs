using SharpGL;

namespace VorlageSzenengraph3D.Model
{
    public class Material
    {
        public static readonly Material BLACK = new Material(Color.BLACK);
        public static readonly Material DARKGRAY = new Material(Color.DARKGRAY);
        public static readonly Material GRAY = new Material(Color.GRAY);
        public static readonly Material LIGHTGRAY = new Material(Color.LIGHTGRAY);
        public static readonly Material WHITE = new Material(Color.WHITE);

        public static readonly Material RED = new Material(Color.RED);
        public static readonly Material GREEN = new Material(Color.GREEN);
        public static readonly Material BLUE = new Material(Color.BLUE);

        public uint Face { get; set; } = OpenGL.GL_FRONT;

        public Color Ambient { get; set; }
        public Color Diffuse { get; set; }
        public Color Specular { get; set; }
        public float Shininess { get; set; }

        public Material(float red, float green, float blue, float shininess = 100) : this(red, green, blue, 1, shininess)
        {

        }

        public Material(float red, float green, float blue, float alpha, float shininess = 100) : this(new Color(red, green, blue, alpha), shininess)
        {

        }

        public Material(Color color, float shininess = 100) : this(color, color, new Color(1, 1, 1), shininess)
        {

        }

        public Material(Color ambient, Color diffuse, Color specular, float shininess = 100)
        {
            Ambient = ambient;
            Diffuse = diffuse;
            Specular = specular;
            Shininess = shininess;
        }

        public void Apply(OpenGL gl)
        {
            gl.Material(Face, OpenGL.GL_AMBIENT, Ambient.Array());
            gl.Material(Face, OpenGL.GL_DIFFUSE, Diffuse.Array());
            gl.Material(Face, OpenGL.GL_SPECULAR, Specular.Array());
            gl.Material(Face, OpenGL.GL_SHININESS, Shininess);
        }

        public Material Clone()
        {
            return new Material(Ambient.Clone(), Diffuse.Clone(), Specular.Clone());
        }
    }
}
