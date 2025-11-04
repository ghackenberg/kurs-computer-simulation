using SharpGL;
using SharpGL.WPF;
using System.Windows.Controls;

namespace VorlageKugel3D
{
    /// <summary>
    /// Interaktionslogik für BasisVorlage.xaml
    /// </summary>
    public partial class Kugel : UserControl
    {
        private float _rotation1 = 0;
        private float _rotation2 = 0;

        private float _radius;
        private int _stacks;
        private int _slices;

        private bool _flat;
        private bool _solid;
        private bool _wire;

        public float Radius { get => _radius; set { _radius = value; UpdateLabel(); } }
        public int Stacks { get => _stacks; set { _stacks = value; UpdateLabel(); } }
        public int Slices { get => _slices; set { _slices = value; UpdateLabel(); } }

        public bool Flat { get => _flat; set { _flat = value; UpdateLabel(); } }
        public bool Solid { get => _solid; set { _solid = value; UpdateLabel(); } }
        public bool Wire { get => _wire; set { _wire = value; UpdateLabel(); } }

        public Kugel()
        {
            InitializeComponent();
        }

        private void UpdateLabel()
        {
            Label.Content = $"Radius = {Radius}, Stacks = {Stacks}, Slices = {Slices}, Flat = {Flat}, Solid = {Solid}, Wire = {Wire}";
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
                SphereSolid(gl, Radius + 0.000f, Stacks, Slices);
            }
            if (Wire)
            {
                SphereWire(gl, Radius + (Solid ? 0.001f : 0.000f), Stacks, Slices);
            }

            gl.Flush();

            // Animation

            _rotation1 += 3;
            _rotation2 += 1;
        }

        private void SphereSolid(OpenGL gl, float radius, int stacks, int slices)
        {
            // Nordpol

            gl.Begin(OpenGL.GL_TRIANGLE_FAN);
            SphereVertexSolid(gl, radius, stacks, slices, 0, 0);
            for (int j = 0; j <= slices; j++)
            {
                SphereVertexSolid(gl, radius, stacks, slices, 1, j);
            }
            gl.End();

            // Bauchbänder

            for (int i = 1; i < stacks; i++)
            {
                gl.Begin(OpenGL.GL_QUAD_STRIP);
                for (int j = 0; j <= slices; j++)
                {
                    SphereVertexSolid(gl, radius, stacks, slices, i + 0, j);
                    SphereVertexSolid(gl, radius, stacks, slices, i + 1, j);
                }
                gl.End();
            }

            // Südpol

            gl.Begin(OpenGL.GL_TRIANGLE_FAN);
            SphereVertexSolid(gl, radius, stacks, slices, stacks, 0);
            for (int j = 0; j <= slices; j++)
            {
                SphereVertexSolid(gl, radius, stacks, slices, stacks - 1, j);
            }
            gl.End();
        }

        private void SphereWire(OpenGL gl, float radius, int stacks, int slices)
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
            for (int i = 0; i <= stacks; i++)
            {
                for (int j = 0; j < slices; j++)
                {
                    SphereVertex(gl, radius, stacks, slices, i, j);
                }
            }
            gl.End();

            // Stacks

            for (int i = 1; i < stacks; i++)
            {
                gl.Begin(OpenGL.GL_LINE_LOOP);
                for (int j = 0; j < slices; j++)
                {
                    SphereVertex(gl, radius, stacks, slices, i, j);
                }
                gl.End();
            }

            // Slices

            for (int j = 0; j < slices; j++)
            {
                gl.Begin(OpenGL.GL_LINE_STRIP);
                for (int i = 0; i <= stacks; i++)
                {
                    SphereVertex(gl, radius, stacks, slices, i, j);
                }
                gl.End();
            }

            // Normals

            Material(gl, 10, 0, 0, 0, 0, 0, 0, 0, 0, 100);

            gl.Begin(OpenGL.GL_LINES);
            for (int i = 0; i <= stacks; i++)
            {
                for (int j = 0; j < slices; j++)
                {
                    SphereVertex(gl, radius * 1.0f, stacks, slices, i, j);
                    SphereVertex(gl, radius * 1.1f, stacks, slices, i, j);
                }
            }
            gl.End();
        }

        private void SphereVertexSolid(OpenGL gl, float radius, int stacks, int slices, int i, int j)
        {
            SphereVertexMaterial(gl, radius, stacks, slices, i, j);
            SphereVertexNormal(gl, radius, stacks, slices, i, j);
            SphereVertex(gl, radius, stacks, slices, i, j);
        }

        private void SphereVertexMaterial(OpenGL gl, float radius, int stacks, int slices, int i, int j)
        {
            Material(gl, (float)i / stacks, (float)j / slices, 0.5f, (float)i / stacks, (float)j / slices, 0.5f, 1, 1, 1, 100);
        }

        private void SphereVertexNormal(OpenGL gl, float radius, int stacks, int slices, int i, int j)
        {
            (float x, float y, float z) = ComputeCoordinate(radius, stacks, slices, i, j);

            (float nx, float ny, float nz) = ComputeCoordinate(radius + 1, stacks, slices, i, j);

            gl.Normal(nx - x, ny - y, nz - z);
        }

        private void SphereVertex(OpenGL gl, float radius, int stacks, int slices, int i, int j)
        {
            (float x, float y, float z) = ComputeCoordinate(radius, stacks, slices, i, j);

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
