using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes
{
    public abstract class Primitive : Node
    {
        private uint _beginMode;

        private List<Vertex> _vertices = new List<Vertex>();
        private List<Material> _materials = new List<Material>();

        public Primitive(string name, uint beginMode) : base(name)
        {
            _beginMode = beginMode;
        }

        public void Add(Vertex vertex, Material material)
        {
            _vertices.Add(vertex);
            _materials.Add(material);
        }

        public (Vertex vertex, Material material) Get(int index)
        {
            return (_vertices[index], _materials[index]);
        }

        public void Set(int index, Vertex vertex, Material material)
        {
            _vertices[index] = vertex;
            _materials[index] = material;
        }

        public void Remove(int index)
        {
            _vertices.RemoveAt(index);
            _materials.RemoveAt(index);
        }

        protected override void DrawLocal(OpenGL gl)
        {
            gl.Begin(_beginMode);

            for (int i = 0; i < _vertices.Count; i++)
            {
                _materials[i].Apply(gl);
                _vertices[i].Apply(gl);
            }

            gl.End();
        }
    }
}