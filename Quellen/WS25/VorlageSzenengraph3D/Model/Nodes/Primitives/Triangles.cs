using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Primitives
{
    public class Triangles : Primitive
    {
        public Triangles(string name) : base(name, OpenGL.GL_TRIANGLES)
        {

        }

        public Triangles(string name, Vertex vertex1, Vertex vertex2, Vertex vertex3, Material material) : this(name, vertex1, vertex2, vertex3, material, material, material)
        {

        }

        public Triangles(string name, Vertex vertex1, Vertex vertex2, Vertex vertex3, Material material1, Material material2, Material material3) : base(name, OpenGL.GL_TRIANGLES)
        {
            Add(vertex1, material1);
            Add(vertex2, material2);
            Add(vertex3, material3);
        }
    }
}
