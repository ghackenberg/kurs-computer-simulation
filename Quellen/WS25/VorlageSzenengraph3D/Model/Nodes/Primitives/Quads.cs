using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Primitives
{
    public class Quads : Primitive
    {
        public Quads(string name) : base(name, OpenGL.GL_QUADS)
        {

        }

        public Quads(string name, Vertex vertex1, Vertex vertex2, Vertex vertex3, Vertex vertex4, Material material) : this(name, vertex1, vertex2, vertex3, vertex4, material, material, material, material)
        {

        }

        public Quads(string name, Vertex vertex1, Vertex vertex2, Vertex vertex3, Vertex vertex4, Material material1, Material material2, Material material3, Material material4) : base(name, OpenGL.GL_QUADS)
        {
            Add(vertex1, material1);
            Add(vertex2, material2);
            Add(vertex3, material3);
            Add(vertex4, material4);
        }
    }
}
