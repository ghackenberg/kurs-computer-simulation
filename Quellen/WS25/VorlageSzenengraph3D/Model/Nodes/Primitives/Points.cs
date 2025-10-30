using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Primitives
{
    public class Points : Primitive
    {
        public float Size { get; set; }

        public Points(string name, float size = 1) : base(name, OpenGL.GL_POINTS)
        {
            Size = size;
        }

        public Points(string name, Vertex vertex, Material material, float size = 1) : base(name, OpenGL.GL_POINTS)
        {
            Add(vertex, material);
        }

        protected override void DrawLocal(OpenGL gl)
        {
            gl.PointSize(Size);

            base.DrawLocal(gl);
        }
    }
}
