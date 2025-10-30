using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Volumes
{
    public class Sphere : Shape
    {
        public float Radius { get; set; }
        public int Slices { get; set; }
        public int Stacks { get; set; }

        public Sphere(string name, float radius, int slices, int stacks, Material material) : base(name, material)
        {
            Radius = radius;
            Slices = slices;
            Stacks = stacks;
        }

        protected override void DrawLocal(OpenGL gl)
        {
            throw new NotImplementedException();
        }
    }
}
