using SharpGL;

namespace VorlageSzenengraph3D.Model.Transforms
{
    public class Translate : Transform
    {
        public Vector Delta { get; set; }

        public Translate(float x, float y, float z) : this(new Vector(x, y, z))
        {

        }

        public Translate(Vector delta)
        {
            Delta = delta;
        }

        public override void Apply(OpenGL gl)
        {
            gl.Translate(Delta.X, Delta.Y, Delta.Z);
        }

        public override Transform Invert()
        {
            return new Translate(new Vector(-Delta.X, -Delta.Y, -Delta.Z));
        }
    }
}
