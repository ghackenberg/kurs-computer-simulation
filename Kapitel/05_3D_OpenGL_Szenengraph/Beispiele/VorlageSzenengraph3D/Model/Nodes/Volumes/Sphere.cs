using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Volumes
{
    public class Sphere : Shape
    {
        public float Radius { get; set; }

        public int Stacks { get; set; }
        public int Slices { get; set; }

        public Sphere(string name, float radius, int stacks, int slices, Material material) : base(name, material)
        {
            Radius = radius;

            Stacks = stacks;
            Slices = slices;
        }

        protected override void DrawLocal(OpenGL gl)
        {
            Material.Apply(gl);

            // Nordpol

            gl.Begin(OpenGL.GL_TRIANGLE_FAN);
            SphereVertex(gl, 0, 0);
            for (int j = 0; j <= Slices; j++)
            {
                SphereVertex(gl, 1, j);
            }
            gl.End();

            // Bauchbänder

            for (int i = 1; i < Stacks; i++)
            {
                gl.Begin(OpenGL.GL_QUAD_STRIP);
                for (int j = 0; j <= Slices; j++)
                {
                    SphereVertex(gl, i + 0, j);
                    SphereVertex(gl, i + 1, j);
                }
                gl.End();
            }

            // Südpol

            gl.Begin(OpenGL.GL_TRIANGLE_FAN);
            SphereVertex(gl, Stacks, 0);
            for (int j = 0; j <= Slices; j++)
            {
                SphereVertex(gl, Stacks - 1, j);
            }
            gl.End();
        }

        private void SphereVertex(OpenGL gl, int i, int j)
        {
            (float vx, float vy, float vz) = ComputeVertex(Radius + 0, i, j);
            (float nx, float ny, float nz) = ComputeVertex(Radius + 1, i, j);

            gl.Normal(nx - vx, ny - vy, nz - vz);
            gl.Vertex(vx, vy, vz);
        }

        private (float x, float y, float z) ComputeVertex(float radius, int i, int j)
        {
            float phi = (float)Math.PI / Stacks * i;
            float theta = (float)Math.PI * 2 / Slices * j;

            float x = radius * (float)Math.Sin(phi) * (float)Math.Cos(theta);
            float y = radius * (float)Math.Cos(phi);
            float z = radius * (float)Math.Sin(phi) * (float)Math.Sin(theta);

            return (x, y, z);
        }
    }
}
