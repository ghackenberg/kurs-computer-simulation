using SharpGL;
using SharpGL.SceneGraph.Primitives;
using SharpGL.WPF;
using System.Windows;

namespace VorlageVisualisierung3D
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private float rotation = 0;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void OpenGLControl_OpenGLDraw(object sender, OpenGLRoutedEventArgs arguments)
        {
            OpenGL gl = arguments.OpenGL;

            gl.Clear(OpenGL.GL_COLOR_BUFFER_BIT | OpenGL.GL_DEPTH_BUFFER_BIT);

            gl.LoadIdentity();

            gl.Translate(0.0f, 0.0f, -6.0f);

            gl.Rotate(rotation, 0.0f, 1.0f, 0.0f);

            Teapot tp = new Teapot();

            tp.Draw(gl, 14, 1, OpenGL.GL_FILL);

            rotation += 3.0f;
        }

        private void OpenGLControl_OpenGLInitialized(object sender, OpenGLRoutedEventArgs arguments)
        {
            OpenGL gl = arguments.OpenGL;

            float[] lmodel_ambient = { 0.2f, 0.2f, 0.2f, 1.0f };
            float[] global_ambient = { 0.5f, 0.5f, 0.5f, 1.0f };

            gl.LightModel(OpenGL.GL_LIGHT_MODEL_AMBIENT, lmodel_ambient);
            gl.LightModel(OpenGL.GL_LIGHT_MODEL_AMBIENT, global_ambient);

            float[] light0position = { 0.0f, 5.0f, 10.0f, 1.0f };
            float[] light0ambient = { 0.2f, 0.2f, 0.2f, 1.0f };
            float[] light0diffuse = { 0.3f, 0.3f, 0.3f, 1.0f };
            float[] light0specular = { 0.8f, 0.8f, 0.8f, 1.0f };

            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_POSITION, light0position);
            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_AMBIENT, light0ambient);
            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_DIFFUSE, light0diffuse);
            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_SPECULAR, light0specular);

            gl.Enable(OpenGL.GL_LIGHTING);
            gl.Enable(OpenGL.GL_LIGHT0);

            gl.Enable(OpenGL.GL_DEPTH_TEST);

            gl.ShadeModel(OpenGL.GL_SMOOTH);
        }
    }
}