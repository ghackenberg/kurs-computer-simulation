using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Primitives
{
    public class Points : Primitive
    {
        public float Size { get; set; } = 1;

        public Points(string name, float size = 1) : base(name, OpenGL.GL_POINTS)
        {
            Size = size;
        }

        protected override void DrawLocal(OpenGL gl)
        {
            gl.PointSize(Size);

            base.DrawLocal(gl);
        }
    }
}
