using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Volumes
{
    public class Cylinder : Shape
    {
        public float Radius1 { get; set; }
        public float Radius2 { get; set; }
        public float Height { get; set; }

        public int Slices { get; set; }
        public int Stacks { get; set; }

        public Cylinder(string name, float radius1, float radius2, float height, int stacks, int slices, Material material) : base(name, material)
        {
            Radius1 = radius1;
            Radius2 = radius2;
            Height = height;

            Stacks = stacks;
            Slices = slices;
        }

        protected override void DrawLocal(OpenGL gl)
        {
            Material.Apply(gl);

            // Bottom

            gl.Begin(OpenGL.GL_TRIANGLE_FAN);
            gl.Vertex(0, 0, 0);
            for (int j = 0; j < Slices; j++)
            {
                CylinderVertex(gl, 0, j);
            }
            gl.End();

            // Middle
            for (int i = 0; i < Stacks; i++)
            {
                gl.Begin(OpenGL.GL_QUAD_STRIP);
                for (int j = 0; j <= Slices; j++)
                {
                    CylinderVertex(gl, i + 0, j);
                    CylinderVertex(gl, i + 1, j);
                }
                gl.End();
            }

            // Top

            gl.Begin(OpenGL.GL_TRIANGLE_FAN);
            gl.Vertex(0, Height, 0);
            for (int j = 0; j < Slices; j++)
            {
                CylinderVertex(gl, Stacks, j);
            }
            gl.End();
        }

        private void CylinderVertex(OpenGL gl, int i, int j)
        {
            (float vx, float vy, float vz) = ComputeVertex(i, j);
            (float nx, float ny, float nz) = ComputeNormal(i, j);

            gl.Normal(nx, ny, nz);
            gl.Vertex(vx, vy, vz);
        }

        private (float x, float y, float z) ComputeVertex(int i, int j)
        {
            float phi = i / (float)Stacks;
            float theta = (float)Math.PI * 2 / Slices * j;

            float radius = Radius1 + phi * (Radius2 - Radius1);

            float x = radius * (float)Math.Cos(theta);
            float y = Height * phi;
            float z = radius * (float)Math.Sin(theta);

            return (x, y, z);
        }

        private (float nx, float ny, float nz) ComputeNormal(int i, int j)
        {
            float theta = (float)Math.PI * 2 / Slices * j;

            float nx = Height * (float)Math.Cos(theta);
            float ny = Radius1 - Radius2;
            float nz = Height * (float)Math.Sin(theta);

            float norm = (float)Math.Sqrt(nx * nx + ny * ny + nz * nz);

            return (nx / norm, ny / norm, nz / norm);
        }
    }
}
