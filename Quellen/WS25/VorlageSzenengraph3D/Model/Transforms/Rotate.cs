using SharpGL;

namespace VorlageSzenengraph3D.Model.Transforms
{
    public class Rotate : Transform
    {
        public Vector Axis { get; set; }
        public float Angle { get; set; }

        public Rotate(float axisX, float axisY, float axisZ, float angle) : this(new Vector(axisX, axisY, axisZ), angle)
        {

        }

        public Rotate(Vector axis, float angle)
        {
            Axis = axis;
            Angle = angle;
        }

        public override void Apply(OpenGL gl)
        {
            gl.Rotate(Angle, Axis.X, Axis.Y, Axis.Z);
        }

        public override Transform Invert()
        {
            return new Rotate(Axis.Clone(), -Angle);
        }
    }
}
