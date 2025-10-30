using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes.Volumes
{
    public class Cone : Shape
    {
        public float Radius1 { get; set; }
        public float Radius2 { get; set; }
        public float Height { get; set; }

        public Cone(string name, float radius1, float radius2, float height, Material material) : base(name, material)
        {
            Radius1 = radius1;
            Radius2 = radius2;
            Height = height;
        }

        protected override void DrawLocal(OpenGL gl)
        {
            throw new NotImplementedException();
        }
    }
}
