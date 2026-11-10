using SharpGL;

namespace VorlageSzenengraph3D.Model
{
    public class Normal
    {
        public Vector Vector { get; set; }

        public Normal(float x, float y, float z) : this(new Vector(x, y, z))
        {

        }

        public Normal(Vector vector)
        {
            Vector = vector;
        }

        public void Apply(OpenGL gl)
        {
            gl.Normal(Vector.X, Vector.Y, Vector.Z);
        }
    }
}
