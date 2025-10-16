using ElastischesFachwerk3D.Case;
using ElastischesFachwerk3D.Model;
using MathNet.Numerics.LinearAlgebra;
using SharpGL;
using System.Windows;

namespace ElastischesFachwerk3D
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly Truss truss;

        private readonly double forceRodMin;
        private readonly double forceRodMax;

        private readonly Vector<double> unitX = Vector<double>.Build.Dense(new double[] { 1, 0, 0 });
        private readonly Vector<double> unitY = Vector<double>.Build.Dense(new double[] { 0, 1, 0 });
        private readonly Vector<double> unitZ = Vector<double>.Build.Dense(new double[] { 0, 0, 1 });

        private readonly bool drawInitial = true;
        private readonly bool drawFinal = true;

        private float rotation = 0;

        public MainWindow()
        {
            InitializeComponent();

            // Fachwerk definieren

            truss = Case1.Create();
            truss.Solve();

            forceRodMin = truss.Rods.Min(rod => rod.Force);
            forceRodMax = truss.Rods.Max(rod => rod.Force);
        }

        private void OpenGLControl_OpenGLInitialized(object sender, SharpGL.WPF.OpenGLRoutedEventArgs args)
        {
            OpenGL gl = args.OpenGL;

            // Tiefentest aktivieren

            gl.Enable(OpenGL.GL_DEPTH_TEST);

            // Hintergrundfarbe festlegen

            gl.ClearColor(1, 1, 1, 1);

            // Schattierungsmodell festlegen

            gl.ShadeModel(OpenGL.GL_SMOOTH);

            // Licht aktivieren

            gl.Enable(OpenGL.GL_LIGHTING);
            gl.Enable(OpenGL.GL_LIGHT0);

            // - Umgebungslicht konfigurieren

            float[] ambient = { 0.33f, 0.33f, 0.33f, 1 };

            gl.LightModel(OpenGL.GL_LIGHT_MODEL_AMBIENT, ambient);

            // - Punktlicht konfigurieren

            float[] lightPosition = { 0, -10, 0, 1 };
            float[] lightAmbient = { 0.33f, 0.33f, 0.33f, 1 };
            float[] lightDiffuse = { 0.33f, 0.33f, 0.33f, 1 };

            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_POSITION, lightPosition);
            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_AMBIENT, lightAmbient);
            gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_DIFFUSE, lightDiffuse);
        }

        private void OpenGLControl_OpenGLDraw(object sender, SharpGL.WPF.OpenGLRoutedEventArgs args)
        {
            OpenGL gl = args.OpenGL;

            // Farb- und Tiefenpuffer leeren

            gl.Clear(OpenGL.GL_COLOR_BUFFER_BIT | OpenGL.GL_DEPTH_BUFFER_BIT);

            // Modelltransformation setzen

            gl.LoadIdentity();

            gl.Translate(0, 0, -40);

            gl.Rotate(45, 1, 0, 0);

            gl.Rotate(rotation, 0, 1, 0);

            // Achsen zeichnen

            gl.LineWidth(2);

            gl.Begin(OpenGL.GL_LINES);

            // - X-Achse

            ColoredVertex(gl, -100, 0, 0, 0.5, 0.5, 0.5);
            ColoredVertex(gl, +100, 0, 0, 0.5, 0.5, 0.5);

            // - Y-Achse

            ColoredVertex(gl, 0, -100, 0, 0.5, 0.5, 0.5);
            ColoredVertex(gl, 0, +100, 0, 0.5, 0.5, 0.5);

            // - Z-Achse

            ColoredVertex(gl, 0, 0, -100, 0.5, 0.5, 0.5);
            ColoredVertex(gl, 0, 0, +100, 0.5, 0.5, 0.5);

            gl.End();

            // Gitter zeichnen

            gl.LineWidth(1);

            gl.Begin(OpenGL.GL_LINES);

            for (int i = -10; i <= 10; i++)
            {
                if (i != 0)
                {
                    // - X-Achse
                    ColoredVertex(gl, -10, 0, i, 0.75, 0.75, 0.75);
                    ColoredVertex(gl, +10, 0, i, 0.75, 0.75, 0.75);

                    // - Z-Achse
                    ColoredVertex(gl, i, 0, -10, 0.75, 0.75, 0.75);
                    ColoredVertex(gl, i, 0, +10, 0.75, 0.75, 0.75);
                }
            }

            gl.End();

            // Knoten zeichnen

            gl.Begin(OpenGL.GL_QUADS);

            foreach (Node node in truss.Nodes)
            {
                if (drawInitial)
                {
                    ColoredCubeVertices(gl, node.InitialX, node.InitialY, node.InitialZ, 0.25f, 0.8f, 0.8f, 0.8f);
                }
                if (drawFinal)
                {
                    ColoredCubeVertices(gl, node.FinalX, node.FinalY, node.FinalZ, 0.25f, 0.5f, 0.5f, 0.5f);
                }
            }

            gl.End();

            // Lager zeichnen

            gl.LineWidth(4);

            gl.Begin(OpenGL.GL_LINES);

            foreach (Node node in truss.Nodes)
            {
                Vector<double> initial = node.InitialVector();
                Vector<double> final = node.FinalVector();

                if (node.FixX)
                {
                    if (drawFinal)
                    {
                        ColoredLineVertices(gl, final - unitX, final + unitX, 0, 0, 0);
                    }
                    else if (drawInitial)
                    {
                        ColoredLineVertices(gl, initial - unitX, initial + unitX, 0, 0, 0);
                    }
                }
                if (node.FixY)
                {
                    if (drawFinal)
                    {
                        ColoredLineVertices(gl, final - unitY, final + unitY, 0, 0, 0);
                    }
                    else if (drawInitial)
                    {
                        ColoredLineVertices(gl, initial - unitY, initial + unitY, 0, 0, 0);
                    }
                }
                if (node.FixZ)
                {
                    if (drawFinal)
                    {
                        ColoredLineVertices(gl, final - unitZ, final + unitZ, 0, 0, 0);
                    }
                    else if (drawInitial)
                    {
                        ColoredLineVertices(gl, initial - unitZ, initial + unitZ, 0, 0, 0);
                    }
                }
            }

            gl.End();

            // Kräfte zeichnen

            gl.LineWidth(5);

            gl.Begin(OpenGL.GL_LINES);

            foreach (Node node in truss.Nodes)
            {
                Vector<double> inputForce = node.InputForceVector();
                Vector<double> outputForce = node.OutputForceVector();

                if (drawFinal)
                {
                    Vector<double> position = node.FinalVector();

                    ColoredLineVertices(gl, position - inputForce * 20, position, 0, 1, 0);
                    ColoredLineVertices(gl, position, position + outputForce * 20, 1, 1, 0);
                }
                else if (drawInitial)
                {
                    Vector<double> position = node.InitialVector();

                    ColoredLineVertices(gl, position - inputForce * 20, position, 0, 1, 0);
                    ColoredLineVertices(gl, position, position + outputForce * 20, 1, 1, 0);
                }
            }

            gl.End();

            // Stäbe zeichnen

            gl.LineWidth(3);

            gl.Begin(OpenGL.GL_LINES);

            foreach (Rod rod in truss.Rods)
            {
                Node u = rod.NodeA;
                Node v = rod.NodeB;

                // - Initiale Lage

                if (drawInitial)
                {
                    ColoredVertex(gl, u.InitialX, u.InitialY, u.InitialZ, 0.9, 0.9, 0.9);
                    ColoredVertex(gl, v.InitialX, v.InitialY, v.InitialZ, 0.9, 0.9, 0.9);
                }

                // - Finale Lage

                if (drawFinal)
                {
                    double r = rod.Force > 0 ? 0.5 + 0.5 * (rod.Force / forceRodMax) : 0;
                    double g = 0;
                    double b = rod.Force < 0 ? 0.5 + 0.5 * (rod.Force / forceRodMin) : 0;

                    ColoredVertex(gl, u.FinalX, u.FinalY, u.FinalZ, r, g, b);
                    ColoredVertex(gl, v.FinalX, v.FinalY, v.FinalZ, r, g, b);
                }
            }

            gl.End();

            // Rotation aktualisieren

            rotation += 1;
        }

        private void ColoredLineVertices(OpenGL gl, Vector<double> start, Vector<double> end, double r, double g, double b)
        {
            ColoredVertex(gl, start[0], start[1], start[2], r, g, b);
            ColoredVertex(gl, end[0], end[1], end[2], r, g, b);
        }

        private void ColoredCubeVertices(OpenGL gl, double cx, double cy, double cz, double s, double r, double g, double b)
        {
            ColorMaterial(gl, r, g, b);

            CubeVertices(gl, cx, cy, cz, s);
        }

        private void CubeVertices(OpenGL gl, double cx, double cy, double cz, double s)
        {
            // Unterseite

            gl.Vertex(cx - s / 2, cy - s / 2, cz - s / 2);
            gl.Vertex(cx - s / 2, cy - s / 2, cz + s / 2);
            gl.Vertex(cx + s / 2, cy - s / 2, cz + s / 2);
            gl.Vertex(cx + s / 2, cy - s / 2, cz - s / 2);

            // Oberseite

            gl.Vertex(cx - s / 2, cy + s / 2, cz - s / 2);
            gl.Vertex(cx - s / 2, cy + s / 2, cz + s / 2);
            gl.Vertex(cx + s / 2, cy + s / 2, cz + s / 2);
            gl.Vertex(cx + s / 2, cy + s / 2, cz - s / 2);

            // Rückseite

            gl.Vertex(cx - s / 2, cy - s / 2, cz - s / 2);
            gl.Vertex(cx - s / 2, cy + s / 2, cz - s / 2);
            gl.Vertex(cx + s / 2, cy + s / 2, cz - s / 2);
            gl.Vertex(cx + s / 2, cy - s / 2, cz - s / 2);

            // Vorderseite

            gl.Vertex(cx - s / 2, cy - s / 2, cz + s / 2);
            gl.Vertex(cx - s / 2, cy + s / 2, cz + s / 2);
            gl.Vertex(cx + s / 2, cy + s / 2, cz + s / 2);
            gl.Vertex(cx + s / 2, cy - s / 2, cz + s / 2);

            // Linke Seite

            gl.Vertex(cx - s / 2, cy - s / 2, cz - s / 2);
            gl.Vertex(cx - s / 2, cy + s / 2, cz - s / 2);
            gl.Vertex(cx - s / 2, cy + s / 2, cz + s / 2);
            gl.Vertex(cx - s / 2, cy - s / 2, cz + s / 2);

            // Recht Seite

            gl.Vertex(cx + s / 2, cy - s / 2, cz - s / 2);
            gl.Vertex(cx + s / 2, cy + s / 2, cz - s / 2);
            gl.Vertex(cx + s / 2, cy + s / 2, cz + s / 2);
            gl.Vertex(cx + s / 2, cy - s / 2, cz + s / 2);
        }

        private void ColoredVertex(OpenGL gl, double x, double y, double z, double r, double g, double b)
        {
            ColorMaterial(gl, r, g, b);

            gl.Vertex(x, y, z);
        }

        private void ColorMaterial(OpenGL gl, double r, double g, double b)
        {
            float[] color = { (float)r, (float)g, (float)b, 1 };

            gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_AMBIENT_AND_DIFFUSE, color);
        }
    }
}