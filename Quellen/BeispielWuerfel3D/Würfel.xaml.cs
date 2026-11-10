using SharpGL;
using SharpGL.WPF;
using System.Windows.Controls;

namespace BeispielWürfel3D
{
    /// <summary>
    /// Interaktionslogik für BasisVorlage.xaml
    /// </summary>
    public partial class Würfel : UserControl
    {
        private float _rotation1 = 0;
        private float _rotation2 = 0;

        private float _width;
        private float _height;
        private float _depth;

        private bool _flat;
        private bool _solid;
        private bool _wire;

        public float SizeX { get => _width; set { _width = value; UpdateLabel(); } }
        public float SizeY { get => _height; set { _height = value; UpdateLabel(); } }
        public float SizeZ { get => _depth; set { _depth = value; UpdateLabel(); } }

        public bool Flat { get => _flat; set { _flat = value; UpdateLabel(); } }
        public bool Solid { get => _solid; set { _solid = value; UpdateLabel(); } }
        public bool Wire { get => _wire; set { _wire = value; UpdateLabel(); } }

        public Würfel()
        {
            InitializeComponent();
        }

        private void UpdateLabel()
        {
            Label.Content = $"SizeX = {SizeX}, SizeY = {SizeY}, SizeZ = {SizeZ}, Flat = {Flat}, Solid = {Solid}, Wire = {Wire}";
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
            gl.ShadeModel(Flat ? OpenGL.GL_FLAT : OpenGL.GL_SMOOTH);

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

            if (Solid)
            {
                CubeSolid(gl, SizeX, SizeY, SizeZ);
            }
            if (Wire)
            {
                CubeWire(gl, SizeX + (Solid ? 0.001f : 0.000f), SizeY + (Solid ? 0.001f : 0.000f), SizeZ + (Solid ? 0.001f : 0.000f));
            }

            gl.Flush();

            // Animation

            _rotation1 += 3;
            _rotation2 += 1;
        }

        private void CubeSolid(OpenGL gl, float sizeX, float sizeY, float sizeZ)
        {
            gl.Begin(OpenGL.GL_QUADS);

            // Bottom

            Material(gl, 2, 0, 0, 10, 0, 0, 1, 1, 1, 100);

            gl.Normal(0, -1, 0);

            gl.Vertex(-sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, -sizeY / 2, +sizeZ / 2);

            // Top

            Material(gl, 0, 2, 0, 0, 10, 0, 1, 1, 1, 100);

            gl.Normal(0, +1, 0);

            gl.Vertex(-sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2, +sizeZ / 2);

            // Back

            Material(gl, 0, 0, 2, 0, 0, 10, 1, 1, 1, 100);

            gl.Normal(0, 0, -1);

            gl.Vertex(-sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2, -sizeZ / 2);

            // Front

            Material(gl, 2, 2, 0, 10, 10, 0, 1, 1, 1, 100);

            gl.Normal(0, 0, +1);

            gl.Vertex(-sizeX / 2, -sizeY / 2, +sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, +sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2, +sizeZ / 2);

            // Left

            Material(gl, 2, 0, 2, 10, 0, 10, 1, 1, 1, 100);

            gl.Normal(-1, 0, 0);

            gl.Vertex(-sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, -sizeY / 2, +sizeZ / 2);

            // Right

            Material(gl, 0, 2, 2, 0, 10, 10, 1, 1, 1, 100);

            gl.Normal(+1, 0, 0);

            gl.Vertex(+sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, +sizeZ / 2);

            gl.End();
        }

        private void CubeWire(OpenGL gl, float sizeX, float sizeY, float sizeZ)
        {
            if (Solid)
            {
                Material(gl, 10, 10, 10, 0, 0, 0, 0, 0, 0, 100);
            }
            else
            {
                Material(gl, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100);
            }

            // Points

            gl.PointSize(5);

            gl.Begin(OpenGL.GL_POINTS);

            // Bottom

            gl.Vertex(-sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, -sizeY / 2, +sizeZ / 2);

            // Top

            gl.Vertex(-sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2, +sizeZ / 2);

            gl.End();

            // Lines

            gl.Begin(OpenGL.GL_LINE_LOOP);

            // Bottom

            gl.Vertex(-sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, -sizeY / 2, +sizeZ / 2);

            gl.End();

            gl.Begin(OpenGL.GL_LINE_LOOP);

            // Top

            gl.Vertex(-sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2, +sizeZ / 2);

            gl.End();


            gl.Begin(OpenGL.GL_LINES);

            // Left

            gl.Vertex(-sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, -sizeY / 2, +sizeZ / 2);

            // Right

            gl.Vertex(+sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, +sizeZ / 2);

            gl.End();

            // Normals

            Material(gl, 10, 0, 0, 0, 0, 0, 0, 0, 0, 100);

            gl.Begin(OpenGL.GL_LINES);

            // -/-/-

            gl.Vertex(-sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(-sizeX / 2 - 0.1f, -sizeY / 2, -sizeZ / 2);

            gl.Vertex(-sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(-sizeX / 2, -sizeY / 2 - 0.1f, -sizeZ / 2);

            gl.Vertex(-sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(-sizeX / 2, -sizeY / 2, -sizeZ / 2 - 0.1f);

            // +/-/-

            gl.Vertex(+sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2 + 0.1f, -sizeY / 2, -sizeZ / 2);

            gl.Vertex(+sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2 - 0.1f, -sizeZ / 2);

            gl.Vertex(+sizeX / 2, -sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, -sizeZ / 2 - 0.1f);

            // -/+/-

            gl.Vertex(-sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(-sizeX / 2 - 0.1f, +sizeY / 2, -sizeZ / 2);

            gl.Vertex(-sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2 + 0.1f, -sizeZ / 2);

            gl.Vertex(-sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2, -sizeZ / 2 - 0.1f);

            // +/+/-

            gl.Vertex(+sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2 + 0.1f, +sizeY / 2, -sizeZ / 2);

            gl.Vertex(+sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2 + 0.1f, -sizeZ / 2);

            gl.Vertex(+sizeX / 2, +sizeY / 2, -sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, -sizeZ / 2 - 0.1f);

            // -/-/+

            gl.Vertex(-sizeX / 2, -sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2 - 0.1f, -sizeY / 2, +sizeZ / 2);

            gl.Vertex(-sizeX / 2, -sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, -sizeY / 2 - 0.1f, +sizeZ / 2);

            gl.Vertex(-sizeX / 2, -sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, -sizeY / 2, +sizeZ / 2 + 0.1f);

            // +/-/+

            gl.Vertex(+sizeX / 2, -sizeY / 2, +sizeZ / 2);
            gl.Vertex(+sizeX / 2 + 0.1f, -sizeY / 2, +sizeZ / 2);

            gl.Vertex(+sizeX / 2, -sizeY / 2, +sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2 - 0.1f, +sizeZ / 2);

            gl.Vertex(+sizeX / 2, -sizeY / 2, +sizeZ / 2);
            gl.Vertex(+sizeX / 2, -sizeY / 2, +sizeZ / 2 + 0.1f);

            // -/+/+

            gl.Vertex(-sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2 - 0.1f, +sizeY / 2, +sizeZ / 2);

            gl.Vertex(-sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2 + 0.1f, +sizeZ / 2);

            gl.Vertex(-sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(-sizeX / 2, +sizeY / 2, +sizeZ / 2 + 0.1f);

            // +/+/+

            gl.Vertex(+sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(+sizeX / 2 + 0.1f, +sizeY / 2, +sizeZ / 2);

            gl.Vertex(+sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2 + 0.1f, +sizeZ / 2);

            gl.Vertex(+sizeX / 2, +sizeY / 2, +sizeZ / 2);
            gl.Vertex(+sizeX / 2, +sizeY / 2, +sizeZ / 2 + 0.1f);

            gl.End();
        }

        private void Material(OpenGL gl, float ar, float ag, float ab, float dr, float dg, float db, float sr, float sg, float sb, float s)
        {
            float[] ambient = { ar, ag, ab, 1 };
            float[] diffuse = { dr, dg, db, 1 };
            float[] specular = { sr, sg, sb, 1 };

            float shininess = s;

            gl.Material(OpenGL.GL_FRONT, OpenGL.GL_AMBIENT, ambient);
            gl.Material(OpenGL.GL_FRONT, OpenGL.GL_DIFFUSE, diffuse);
            gl.Material(OpenGL.GL_FRONT, OpenGL.GL_SPECULAR, specular);
            gl.Material(OpenGL.GL_FRONT, OpenGL.GL_SHININESS, shininess);
        }
    }
}
