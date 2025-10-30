using SharpGL;

namespace VorlageSzenengraph3D.Model.Nodes
{
    public class Group : Node
    {
        private Dictionary<string, Node> _children = new Dictionary<string, Node>();

        public Group(string name) : base(name)
        {

        }

        public void Add(Node node)
        {
            if (_children.ContainsKey(node.Name))
            {
                throw new Exception("Child name already exists!");
            }
            _children[node.Name] = node;
        }

        public Node Get(string name)
        {
            return _children[name];
        }

        public bool Remove(string name)
        {
            return _children.Remove(name);
        }

        protected override void DrawLocal(OpenGL gl)
        {
            foreach (Node c in _children.Values)
            {
                c.Draw(gl);
            }
        }
    }
}
