using SharpGL;
using SharpGL.WPF;
using System.Windows.Controls;

namespace BeispielZylinder3D
{
    /// <summary>
    /// Interaktionslogik für BasisVorlage.xaml
    /// </summary>
    public partial class Zylinder : UserControl
    {
        private float _rotation1 = 0;
        private float _rotation2 = 0;

        private float _radius1;
        private float _radius2;
        private float _height;
        private int _stacks;
        private int _slices;

        private bool _flat;
        private bool _solid;
        private bool _wire;

        public float Radius1 { get => _radius1; set { _radius1 = value; UpdateLabel(); } }
        public float Radius2 { get => _radius2; set { _radius2 = value; UpdateLabel(); } }
        public float Length { get => _height; set { _height = value; UpdateLabel(); } }
        public int Stacks { get => _stacks; set { _stacks = value; UpdateLabel(); } }
        public int Slices { get => _slices; set { _slices = value; UpdateLabel(); } }

        public bool Flat { get => _flat; set { _flat = value; UpdateLabel(); } }
        public bool Solid { get => _solid; set { _solid = value; UpdateLabel(); } }
        public bool Wire { get => _wire; set { _wire = value; UpdateLabel(); } }

        public Zylinder()
        {
            InitializeComponent();
        }

        private void UpdateLabel()
        {
            Label.Content = $"Radius 1 = {Radius1}, Radius 2 = {Radius2}, Height = {Height}, Stacks = {Stacks}, Slices = {Slices}, Flat = {Flat}, Solid = {Solid}, Wire = {Wire}";
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

            gl.Translate(0, -Length / 2, 0);

            if (Solid)
            {
                CylinderSolid(gl, Radius1, Radius2, Length, Stacks, Slices);
            }
            if (Wire)
            {
                if (Solid)
                {
                    gl.Translate(0, -0.0005f, 0);
                }
                CylinderWire(gl, Radius1 + (Solid ? 0.001f : 0.000f), Radius2 + (Solid ? 0.001f : 0.000f), Length + (Solid ? 0.001f : 0.000f), Stacks, Slices);
            }

            gl.Flush();

            // Animation

            _rotation1 += 3;
            _rotation2 += 1;
        }

        private void CylinderSolid(OpenGL gl, float radius1, float radius2, float length, int stacks, int slices)
        {
            // Nordpol

            gl.Begin(OpenGL.GL_TRIANGLE_FAN);

            Material(gl, 0.5f, 0.5f, 0.5f, 0.5f, 0.5f, 0.5f, 0, 0, 0, 100);
            gl.Normal(0, -1, 0);
            gl.Vertex(0, 0, 0);

            for (int j = 0; j <= slices; j++)
            {
                CylinderVertexMaterial(gl, radius1, radius2, length, stacks, slices, 0, j);
                CylinderVertex(gl, radius1, radius2, length, stacks, slices, 0, j);
            }

            gl.End();

            // Bauchbänder

            for (int i = 0; i < stacks; i++)
            {
                gl.Begin(OpenGL.GL_QUAD_STRIP);
                for (int j = 0; j <= slices; j++)
                {
                    CylinderVertexSolid(gl, radius1, radius2, length, stacks, slices, i + 0, j);
                    CylinderVertexSolid(gl, radius1, radius2, length, stacks, slices, i + 1, j);
                }
                gl.End();
            }

            // Südpol

            gl.Begin(OpenGL.GL_TRIANGLE_FAN);

            Material(gl, 0.5f, 0.5f, 0.5f, 0.5f, 0.5f, 0.5f, 0, 0, 0, 100);
            gl.Normal(0, 1, 0);
            gl.Vertex(0, length, 0);

            for (int j = 0; j <= slices; j++)
            {
                CylinderVertexMaterial(gl, radius1, radius2, length, stacks, slices, stacks, j);
                CylinderVertex(gl, radius1, radius2, length, stacks, slices, stacks, j);
            }

            gl.End();
        }

        private void CylinderWire(OpenGL gl, float radius1, float radius2, float length, int stacks, int slices)
        {
            float x, y, z, nx, ny, nz;

            // Top

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

            gl.Vertex(0, 0, 0);
            gl.Vertex(0, length, 0);

            for (int i = 0; i <= stacks; i++)
            {
                for (int j = 0; j < slices; j++)
                {
                    CylinderVertex(gl, radius1, radius2, length, stacks, slices, i, j);
                }
            }

            gl.End();

            // Bottom and Top

            gl.Begin(OpenGL.GL_LINES);

            for (int j = 0; j < slices; j++)
            {
                // Bottom
                gl.Vertex(0, 0, 0);
                CylinderVertex(gl, radius1, radius2, length, stacks, slices, 0, j);

                // Top
                gl.Vertex(0, length, 0);
                CylinderVertex(gl, radius1, radius2, length, stacks, slices, stacks, j);
            }

            gl.End();

            // Stacks

            for (int i = 0; i <= stacks; i++)
            {
                gl.Begin(OpenGL.GL_LINE_LOOP);
                for (int j = 0; j < slices; j++)
                {
                    CylinderVertex(gl, radius1, radius2, length, stacks, slices, i, j);
                }
                gl.End();
            }

            // Slices

            for (int j = 0; j < slices; j++)
            {
                gl.Begin(OpenGL.GL_LINE_STRIP);
                for (int i = 0; i <= stacks; i++)
                {
                    CylinderVertex(gl, radius1, radius2, length, stacks, slices, i, j);
                }
                gl.End();
            }

            // Normals

            Material(gl, 10, 0, 0, 0, 0, 0, 0, 0, 0, 100);

            gl.Begin(OpenGL.GL_LINES);

            gl.Vertex(0, 0, 0);
            gl.Vertex(0, -0.1f, 0);

            gl.Vertex(0, length, 0);
            gl.Vertex(0, length + 0.1f, 0);

            for (int j = 0; j < slices; j++)
            {
                (x, y, z) = ComputeCoordinate(radius1, radius2, length, stacks, slices, 0, j);

                CylinderVertex(gl, radius1, radius2, length, stacks, slices, 0, j);
                gl.Vertex(x, y - 0.1f, z);

                (x, y, z) = ComputeCoordinate(radius1, radius2, length, stacks, slices, stacks, j);

                CylinderVertex(gl, radius1, radius2, length, stacks, slices, stacks, j);
                gl.Vertex(x, y + 0.1f, z);
            }

            for (int i = 0; i <= stacks; i++)
            {
                for (int j = 0; j < slices; j++)
                {
                    (x, y, z) = ComputeCoordinate(radius1, radius2, length, stacks, slices, i, j);

                    (nx, ny, nz) = ComputeNormal(radius1, radius2, length, stacks, slices, i, j);

                    gl.Vertex(x, y, z);
                    gl.Vertex(x + 0.1f * nx, y + 0.1f * ny, z + 0.1f * nz);
                }
            }
            gl.End();
        }

        private void CylinderVertexSolid(OpenGL gl, float radius1, float radius2, float length, int stacks, int slices, int i, int j)
        {
            CylinderVertexMaterial(gl, radius1, radius2, length, stacks, slices, i, j);
            CylinderVertexNormal(gl, radius1, radius2, length, stacks, slices, i, j);
            CylinderVertex(gl, radius1, radius2, length, stacks, slices, i, j);
        }

        private void CylinderVertexMaterial(OpenGL gl, float radius1, float radius2, float length, int stacks, int slices, int i, int j)
        {
            Material(gl, (float)i / stacks, (float)j / slices, 0.5f, (float)i / stacks, (float)j / slices, 0.5f, 1, 1, 1, 100);
        }

        private void CylinderVertexNormal(OpenGL gl, float radius1, float radius2, float length, int stacks, int slices, int i, int j)
        {
            float theta = (float)Math.PI * 2 / slices * j;

            (float nx, float ny, float nz) = ComputeNormal(radius1, radius2, length, stacks, slices, i, j);

            gl.Normal(nx, ny, nz);
        }

        private void CylinderVertex(OpenGL gl, float radius1, float radius2, float length, int stacks, int slices, int i, int j)
        {
            (float x, float y, float z) = ComputeCoordinate(radius1, radius2, length, stacks, slices, i, j);

            gl.Vertex(x, y, z);
        }

        private (float x, float y, float z) ComputeCoordinate(float radius1, float radius2, float length, int stacks, int slices, int i, int j)
        {
            float phi = i / (float)stacks;
            float theta = (float)Math.PI * 2 / slices * j;

            return ComputeCoordinate(radius1, radius2, length, phi, theta);
        }

        private (float x, float y, float z) ComputeCoordinate(float radius1, float radius2, float length, float phi, float theta)
        {
            float radius = radius1 + phi * (radius2 - radius1);

            float x = radius * (float)Math.Cos(theta);
            float y = length * phi;
            float z = radius * (float)Math.Sin(theta);

            return (x, y, z);
        }

        private (float nx, float ny, float nz) ComputeNormal(float radius1, float radius2, float length, int stacks, int slices, int i, int j)
        {
            float theta = (float)Math.PI * 2 / slices * j;

            float nx = length * (float)Math.Cos(theta);
            float ny = radius1 - radius2;
            float nz = length * (float)Math.Sin(theta);

            float norm = (float)Math.Sqrt(nx * nx + ny * ny + nz * nz);

            return (nx / norm, ny / norm, nz / norm);
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
