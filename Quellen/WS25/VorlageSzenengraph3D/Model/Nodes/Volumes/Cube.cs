using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Volumes
{
    public class Cube : Shape
    {
        public Vector Size { get; set; }

        public Cube(string name, float sizeX, float sizeY, float sizeZ, Material material) : this(name, new Vector(sizeX, sizeY, sizeZ), material)
        {

        }

        public Cube(string name, Vector size, Material material) : base(name, material)
        {
            Size = size;
        }

        protected override void DrawLocal(OpenGL gl)
        {
            Material.Apply(gl);

            gl.Begin(OpenGL.GL_QUADS);

            // Bottom

            gl.Normal(0, -1, 0);

            gl.Vertex(-Size.X / 2, -Size.Y / 2, -Size.Z / 2);
            gl.Vertex(+Size.X / 2, -Size.Y / 2, -Size.Z / 2);
            gl.Vertex(+Size.X / 2, -Size.Y / 2, +Size.Z / 2);
            gl.Vertex(-Size.X / 2, -Size.Y / 2, +Size.Z / 2);

            // Top

            gl.Normal(0, +1, 0);

            gl.Vertex(-Size.X / 2, +Size.Y / 2, -Size.Z / 2);
            gl.Vertex(+Size.X / 2, +Size.Y / 2, -Size.Z / 2);
            gl.Vertex(+Size.X / 2, +Size.Y / 2, +Size.Z / 2);
            gl.Vertex(-Size.X / 2, +Size.Y / 2, +Size.Z / 2);

            // Back

            gl.Normal(0, 0, -1);

            gl.Vertex(-Size.X / 2, -Size.Y / 2, -Size.Z / 2);
            gl.Vertex(+Size.X / 2, -Size.Y / 2, -Size.Z / 2);
            gl.Vertex(+Size.X / 2, +Size.Y / 2, -Size.Z / 2);
            gl.Vertex(-Size.X / 2, +Size.Y / 2, -Size.Z / 2);

            // Front

            gl.Normal(0, 0, +1);

            gl.Vertex(-Size.X / 2, -Size.Y / 2, +Size.Z / 2);
            gl.Vertex(+Size.X / 2, -Size.Y / 2, +Size.Z / 2);
            gl.Vertex(+Size.X / 2, +Size.Y / 2, +Size.Z / 2);
            gl.Vertex(-Size.X / 2, +Size.Y / 2, +Size.Z / 2);

            // Left

            gl.Normal(-1, 0, 0);

            gl.Vertex(-Size.X / 2, -Size.Y / 2, -Size.Z / 2);
            gl.Vertex(-Size.X / 2, +Size.Y / 2, -Size.Z / 2);
            gl.Vertex(-Size.X / 2, +Size.Y / 2, +Size.Z / 2);
            gl.Vertex(-Size.X / 2, -Size.Y / 2, +Size.Z / 2);

            // Right

            gl.Normal(+1, 0, 0);

            gl.Vertex(+Size.X / 2, -Size.Y / 2, -Size.Z / 2);
            gl.Vertex(+Size.X / 2, +Size.Y / 2, -Size.Z / 2);
            gl.Vertex(+Size.X / 2, +Size.Y / 2, +Size.Z / 2);
            gl.Vertex(+Size.X / 2, -Size.Y / 2, +Size.Z / 2);

            gl.End();
        }
    }
}
