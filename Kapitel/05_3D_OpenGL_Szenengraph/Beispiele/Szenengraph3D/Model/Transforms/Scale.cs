using SharpGL;

namespace VorlageSzenengraph3D.Model.Transforms
{
    public class Scale : Transform
    {
        public Vector Factor { get; set; }

        public Scale(float factor) : this(factor, factor, factor)
        {

        }

        public Scale(float factorX, float factorY, float factorZ) : this(new Vector(factorX, factorY, factorZ))
        {

        }

        public Scale(Vector factor)
        {
            Factor = factor;
        }

        public override void Apply(OpenGL gl)
        {
            gl.Scale(Factor.X, Factor.Y, Factor.Z);
        }

        public override Transform Invert()
        {
            return new Scale(new Vector(1 / Factor.X, 1 / Factor.Y, 1 / Factor.Z));
        }
    }
}
