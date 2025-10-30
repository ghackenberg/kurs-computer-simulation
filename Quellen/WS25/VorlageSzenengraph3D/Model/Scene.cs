using SharpGL;

namespace VorlageSzenengraph3D.Model
{
    public class Scene
    {
        public Color Clear { get; set; }

        public Color Ambient { get; set; }

        public List<Light> Lights = new List<Light>();

        public Node Root { get; set; }

        public Scene(Node root) : this(new Color(0.25f, 0.25f, 0.25f), root)
        {

        }

        public Scene(Color ambient, Node root) : this(new Color(1, 1, 1), ambient, root)
        {

        }

        public Scene(Color clear, Color ambient, Node root)
        {
            Clear = clear;
            Ambient = ambient;
            Root = root;
        }

        public void Initialize(OpenGL gl)
        {
            // Hintergrundfarbe festlegen

            gl.ClearColor(Clear.Red, Clear.Green, Clear.Blue, Clear.Alpha);

            // Licht aktivieren

            gl.Enable(OpenGL.GL_LIGHTING);

            // Ambientes Licht konfigurieren

            gl.LightModel(OpenGL.GL_LIGHT_MODEL_AMBIENT, Ambient.Array());

            // Punktförmige Lichtquelle konfigurieren

            uint light = OpenGL.GL_LIGHT0;

            foreach (Light l in Lights)
            {
                l.Apply(gl, light++);
            }

            // Schattierungsmodus aktivieren

            gl.ShadeModel(OpenGL.GL_SMOOTH);

            // Tiefenbild aktivieren

            gl.Enable(OpenGL.GL_DEPTH_TEST);
        }

        public void Draw(OpenGL gl)
        {
            // Farbbild und Tiefenbild zurücksetzen

            gl.Clear(OpenGL.GL_COLOR_BUFFER_BIT | OpenGL.GL_DEPTH_BUFFER_BIT);

            // Modell-Transformation zurücksetzen

            gl.LoadIdentity();

            // Wurzelknoten zeichnen

            Root.Draw(gl);
        }
    }
}
