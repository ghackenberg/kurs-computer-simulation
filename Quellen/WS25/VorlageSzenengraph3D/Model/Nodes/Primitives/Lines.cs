using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Primitives
{
    public class Lines : Primitive
    {
        public float Width { get; set; }

        public Lines(string name) : base(name, OpenGL.GL_LINES)
        {

        }

        public Lines(string name, Vertex vertex1, Vertex vertex2, Material material, float width = 1) : this(name, vertex1, vertex2, material, material, width)
        {

        }

        public Lines(string name, Vertex vertex1, Vertex vertex2, Material material1, Material material2, float width = 1) : base(name, OpenGL.GL_LINES)
        {
            Width = width;

            Add(vertex1, material1);
            Add(vertex2, material2);
        }

        protected override void DrawLocal(OpenGL gl)
        {
            gl.LineWidth(Width);

            base.DrawLocal(gl);
        }
    }
}
