using SharpGL;

namespace VorlageSzenengraph3D.Model
{
    public class Vertex
    {
        public Vector Vector { get; set; }

        public Vertex(float x, float y, float z) : this(new Vector(x, y, z))
        {

        }

        public Vertex(Vector vector)
        {
            Vector = vector;
        }

        public void Apply(OpenGL gl)
        {
            gl.Vertex(Vector.X, Vector.Y, Vector.Z);
        }
    }
}
