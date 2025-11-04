using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Primitives
{
    public class Lines : Primitive
    {
        public float Width { get; set; } = 1;

        public Lines(string name) : base(name, OpenGL.GL_LINES)
        {

        }

        protected override void DrawLocal(OpenGL gl)
        {
            gl.LineWidth(Width);

            base.DrawLocal(gl);
        }
    }
}
