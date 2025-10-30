namespace VorlageSzenengraph3D.Model.Nodes
{
    public abstract class Shape : Node
    {
        public Material Material { get; set; }

        public Shape(string name, Material material) : base(name)
        {
            Material = material;
        }
    }
}
