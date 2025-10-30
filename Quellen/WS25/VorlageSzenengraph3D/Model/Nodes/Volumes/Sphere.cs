using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Volumes
{
    public class Sphere : Shape
    {
        public float Radius { get; set; }

        public Sphere(string name, float radius, Material material) : base(name, material)
        {
            Radius = radius;
        }

        protected override void DrawLocal(OpenGL gl)
        {
            throw new NotImplementedException();
        }
    }
}
