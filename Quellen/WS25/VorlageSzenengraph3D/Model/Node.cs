using SharpGL;

namespace VorlageSzenengraph3D.Model
{
    public abstract class Node
    {
        public string Name { get; set; }

        public List<Transform> Transforms = new List<Transform>();

        public Node(string name)
        {
            Name = name;
        }

        public void Draw(OpenGL gl)
        {
            gl.PushMatrix();

            foreach (Transform t in Transforms)
            {
                t.Apply(gl);
            }

            DrawLocal(gl);

            gl.PopMatrix();
        }

        abstract protected void DrawLocal(OpenGL gl);
    }
}
