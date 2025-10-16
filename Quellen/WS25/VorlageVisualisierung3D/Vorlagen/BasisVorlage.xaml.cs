using SharpGL;
using SharpGL.WPF;
using System.Windows.Controls;

namespace VorlageVisualisierung3D.Vorlagen
{
    /// <summary>
    /// Interaktionslogik für BasisVorlage.xaml
    /// </summary>
    abstract public partial class BasisVorlage : UserControl
    {
        private float rotation = 0;

        public BasisVorlage(string label)
        {
            InitializeComponent();

            Label.Content = label;
        }

        private void OpenGLControl_OpenGLDraw(object sender, OpenGLRoutedEventArgs arguments)
        {
            OpenGL gl = arguments.OpenGL;

            // Farbbild und Tiefenbild zurücksetzen

            gl.Clear(OpenGL.GL_COLOR_BUFFER_BIT | OpenGL.GL_DEPTH_BUFFER_BIT);

            // Modell-Transformation zurücksetzen

            gl.LoadIdentity();

            // Modell entlang der Z-Achse verschieben

            gl.Translate(0.0f, 0.0f, -5.0f);

            // Modell um die Y-Achse rotieren

            gl.Rotate(rotation, 0.0f, 1.0f, 0.0f);

            // Modell zeichnen

            DrawModel(gl);

            // Rotationswinkel mit jedem Frame aktualisieren

            rotation += 3.0f;
        }

        private void OpenGLControl_OpenGLInitialized(object sender, OpenGLRoutedEventArgs arguments)
        {
            OpenGL gl = arguments.OpenGL;

            // Tiefenbild aktivieren

            gl.Enable(OpenGL.GL_DEPTH_TEST);

            // Hintergrundfarbe festlegen

            gl.ClearColor(1, 1, 1, 1);

            // Ambientes Licht konfigurieren

            float[] global_ambient = { 0.25f, 0.25f, 0.25f, 1 };

            gl.LightModel(OpenGL.GL_LIGHT_MODEL_AMBIENT, global_ambient);

            // Punktförmige Lichtquelle konfigurieren

            float[] light0position = { 0, 0, 0, 1 };
            float[] light0ambient = { 0.25f, 0.25f, 0.25f, 1 };
            float[] light0diffuse = { 0.5f, 0.5f, 0.5f, 1 };
            float[] light0specular = { 0, 0, 0, 1 };

            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_POSITION, light0position);
            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_AMBIENT, light0ambient);
            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_DIFFUSE, light0diffuse);
            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_SPECULAR, light0specular);

            // Licht aktivieren

            gl.Enable(OpenGL.GL_LIGHTING);
            gl.Enable(OpenGL.GL_LIGHT0);

            // Schattierungsmodus aktivieren

            gl.ShadeModel(OpenGL.GL_SMOOTH);
        }

        protected void Color(OpenGL gl, float red, float green, float blue)
        {
            float[] color = { red, green, blue, 1 };

            gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_AMBIENT_AND_DIFFUSE, color);
        }

        abstract protected void DrawModel(OpenGL gl);
    }
}
