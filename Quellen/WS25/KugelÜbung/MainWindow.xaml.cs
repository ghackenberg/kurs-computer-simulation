using SharpGL;
using SharpGL.WPF;
using System.Windows;

namespace KugelÜbung
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private float _rotation1 = 0;
        private float _rotation2 = 0;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void OnInitialized(object sender, OpenGLRoutedEventArgs args)
        {
            OpenGL gl = args.OpenGL;

            // Hintergrundfarbe
            gl.ClearColor(1, 1, 1, 1);

            // Lichtsystem
            gl.Enable(OpenGL.GL_LIGHTING);

            // Umgebungslicht
            float[] ambient = { 0.25f, 0.25f, 0.25f, 1 };

            gl.LightModel(OpenGL.GL_LIGHT_MODEL_AMBIENT, ambient);

            // Punktlicht
            gl.Enable(OpenGL.GL_LIGHT0);

            float[] position = { 10, 10, 10, 1 };
            float[] diffuse = { 1, 1, 1, 1 };
            float[] specular = { 1, 1, 1, 1 };

            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_POSITION, position);
            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_DIFFUSE, diffuse);
            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_SPECULAR, specular);

            // Schattierungsmodell
            gl.ShadeModel(OpenGL.GL_SMOOTH);

            // Tiefentest
            gl.Enable(OpenGL.GL_DEPTH_TEST);
        }

        private void OnDraw(object sender, OpenGLRoutedEventArgs args)
        {
            OpenGL gl = args.OpenGL;

            gl.Clear(OpenGL.GL_COLOR_BUFFER_BIT | OpenGL.GL_DEPTH_BUFFER_BIT);

            gl.LoadIdentity();

            gl.Translate(0, 0, -5);

            gl.Rotate(_rotation2, 1, 0, 0);
            gl.Rotate(_rotation1, 0, 1, 0);

            Sphere(gl, 1, 100, 100);

            // Animation

            _rotation1 += 3;
            _rotation2 += 1;
        }

        private void Sphere(OpenGL gl, float radius, int stacks, int slices)
        {
            // Nordpol

            gl.Begin(OpenGL.GL_TRIANGLE_FAN);
            SphereVertex(gl, radius, stacks, slices, 0, 0);
            for (int j = 0; j <= slices; j++)
            {
                SphereVertex(gl, radius, stacks, slices, 1, j);
            }
            gl.End();

            // Bauchbänder

            for (int i = 1; i < stacks; i++)
            {
                gl.Begin(OpenGL.GL_QUAD_STRIP);
                for (int j = 0; j <= slices; j++)
                {
                    SphereVertex(gl, radius, stacks, slices, i + 0, j);
                    SphereVertex(gl, radius, stacks, slices, i + 1, j);
                }
                gl.End();
            }

            // Südpol

            gl.Begin(OpenGL.GL_TRIANGLE_FAN);
            SphereVertex(gl, radius, stacks, slices, stacks, 0);
            for (int j = 0; j <= slices; j++)
            {
                SphereVertex(gl, radius, stacks, slices, stacks - 1, j);
            }
            gl.End();
        }

        private void SphereVertex(OpenGL gl, float radius, int stacks, int slices, int i, int j)
        {
            (float x, float y, float z) = ComputeCoordinate(radius, stacks, slices, i, j);

            (float nx, float ny, float nz) = ComputeCoordinate(radius + 1, stacks, slices, i, j);

            float[] ambient = { (float)i / stacks, (float)j / slices, 0.5f, 1 };
            float[] diffuse = { (float)i / stacks, (float)j / slices, 0.5f, 1 };
            float[] specular = { 1, 1, 1, 1 };

            float shininess = 100;

            gl.Material(OpenGL.GL_FRONT, OpenGL.GL_AMBIENT, ambient);
            gl.Material(OpenGL.GL_FRONT, OpenGL.GL_DIFFUSE, diffuse);
            gl.Material(OpenGL.GL_FRONT, OpenGL.GL_SPECULAR, specular);
            gl.Material(OpenGL.GL_FRONT, OpenGL.GL_SHININESS, shininess);

            gl.Normal(nx - x, ny - y, nz - z);

            gl.Vertex(x, y, z);
        }

        private (float x, float y, float z) ComputeCoordinate(float radius, int stacks, int slices, int i, int j)
        {
            float phi = (float)Math.PI / stacks * i;
            float theta = (float)Math.PI * 2 / slices * j;

            return ComputeCoordinate(radius, phi, theta);
        }

        private (float x, float y, float z) ComputeCoordinate(float radius, float phi, float theta)
        {
            float x = radius * (float)Math.Sin(phi) * (float)Math.Cos(theta);
            float y = radius * (float)Math.Cos(phi);
            float z = radius * (float)Math.Sin(phi) * (float)Math.Sin(theta);

            return (x, y, z);
        }
    }
}