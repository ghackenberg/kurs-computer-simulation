using System.Windows;
using System.Windows.Input;
using SceneGraph3D.Camera;
using SceneGraph3D.Scene;
using SharpGL;
using SharpGL.WPF;

namespace SceneGraph3D;

public partial class MainWindow : Window
{
    private readonly OrbitCamera _camera = new();
    private bool _isDragging = false;
    private Point _lastMousePos;

    // SCARA Geometrie-Konstanten
    private const float HBase = 0.5f;
    private const float L1 = 1.0f;
    private const float L2 = 0.8f;

    // Gelenkvariablen
    private float _theta1Deg = 30.0f;
    private float _theta2Deg = -45.0f;
    private float _d3 = 0.15f;

    // Szenengraph-Knoten
    private readonly SceneNode _rootNode = new("Root");
    private readonly SceneNode _baseNode = new("Base");
    private readonly SceneNode _arm1Node = new("UpperArm");
    private readonly SceneNode _arm2Node = new("ForeArm");
    private readonly SceneNode _pinoleNode = new("Pinole");

    public MainWindow()
    {
        InitializeComponent();
        BuildSceneGraph();
        UpdateTcpCalculations();
    }

    private void BuildSceneGraph()
    {
        // Hierarchie: Root -> Base -> Arm1 -> Arm2 -> Pinole
        _rootNode.AddChild(_baseNode);
        _baseNode.AddChild(_arm1Node);
        _arm1Node.AddChild(_arm2Node);
        _arm2Node.AddChild(_pinoleNode);

        UpdateJointTransforms();
    }

    private void UpdateJointTransforms()
    {
        // Basis: Steht auf dem Boden (0, 0, 0)
        _baseNode.Tx = 0.0f;
        _baseNode.Ty = 0.0f;
        _baseNode.Tz = 0.0f;

        // Arm 1: Sitzt oben auf der Basis, rotiert um Y (Schulter theta1)
        _arm1Node.Tx = 0.0f;
        _arm1Node.Ty = HBase;
        _arm1Node.Tz = 0.0f;
        _arm1Node.Ry = _theta1Deg;

        // Arm 2: Sitzt am Ende von Arm 1 (Abstand L1 in X-Richtung), rotiert um Y (Ellenbogen theta2)
        _arm2Node.Tx = L1;
        _arm2Node.Ty = 0.0f;
        _arm2Node.Tz = 0.0f;
        _arm2Node.Ry = _theta2Deg;

        // Pinole: Sitzt am Ende von Arm 2 (Abstand L2 in X-Richtung), verfährt vertikal nach unten (-d3)
        _pinoleNode.Tx = L2;
        _pinoleNode.Ty = -_d3;
        _pinoleNode.Tz = 0.0f;
    }

    private void OpenGlView_OpenGLInitialized(object sender, OpenGLRoutedEventArgs args)
    {
        OpenGL gl = args.OpenGL;

        // Tiefenprüfung aktivieren
        gl.Enable(OpenGL.GL_DEPTH_TEST);

        // Phong-Beleuchtungsmodell
        gl.Enable(OpenGL.GL_LIGHTING);
        gl.Enable(OpenGL.GL_LIGHT0);

        float[] lightPos = [10.0f, 20.0f, 15.0f, 1.0f];
        float[] lightAmbient = [0.25f, 0.25f, 0.25f, 1.0f];
        float[] lightDiffuse = [0.85f, 0.85f, 0.85f, 1.0f];
        float[] lightSpecular = [1.0f, 1.0f, 1.0f, 1.0f];

        gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_POSITION, lightPos);
        gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_AMBIENT, lightAmbient);
        gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_DIFFUSE, lightDiffuse);
        gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_SPECULAR, lightSpecular);

        gl.Enable(OpenGL.GL_COLOR_MATERIAL);
        gl.ColorMaterial(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_AMBIENT_AND_DIFFUSE);

        gl.ShadeModel(OpenGL.GL_SMOOTH);
        gl.ClearColor(0.08f, 0.08f, 0.08f, 1.0f);
    }

    private void OpenGlView_Resized(object sender, OpenGLRoutedEventArgs args)
    {
        OpenGL gl = args.OpenGL;
        gl.MatrixMode(OpenGL.GL_PROJECTION);
        gl.LoadIdentity();

        double aspect = OpenGlView.ActualWidth / Math.Max(OpenGlView.ActualHeight, 1.0);
        gl.Perspective(45.0, aspect, 0.1, 100.0);

        gl.MatrixMode(OpenGL.GL_MODELVIEW);
    }

    private void OpenGlView_OpenGLDraw(object sender, OpenGLRoutedEventArgs args)
    {
        OpenGL gl = args.OpenGL;

        gl.Clear(OpenGL.GL_COLOR_BUFFER_BIT | OpenGL.GL_DEPTH_BUFFER_BIT);
        gl.LoadIdentity();

        // 1. Orbit-Kamera anwenden
        _camera.Apply(gl);

        // 2. Koordinatensystem (Achsen: X=Rot, Y=Grün, Z=Blau)
        DrawAxes(gl, length: 2.0f);

        // 3. Hallenboden-Gitter
        DrawFloorGrid(gl, size: 4.0f, step: 0.5f);

        // 4. Roboter-Kinematik rendern
        RenderRobot(gl);

        // 5. Analytischen TCP als gelbe Kontrollkugel einblenden
        DrawTcpSphere(gl);
    }

    private void RenderRobot(OpenGL gl)
    {
        // Basis (Statischer Zylinder)
        gl.Color(0.4f, 0.45f, 0.5f);
        DrawCylinder(gl, 0.22f, HBase, 24);

        // Gelenk 1 & Arm 1
        gl.PushMatrix();
        gl.Translate(0.0f, HBase, 0.0f);
        gl.Rotate(_theta1Deg, 0.0f, 1.0f, 0.0f);

        // Schultergehäuse
        gl.Color(0.2f, 0.6f, 0.9f);
        DrawSphere(gl, 0.18f);

        // Arm 1 Segment
        gl.PushMatrix();
        gl.Translate(L1 / 2.0f, 0.0f, 0.0f);
        gl.Scale(L1, 0.14f, 0.18f);
        DrawCube(gl);
        gl.PopMatrix();

        // Ellenbogen & Arm 2
        gl.PushMatrix();
        gl.Translate(L1, 0.0f, 0.0f);
        gl.Rotate(_theta2Deg, 0.0f, 1.0f, 0.0f);

        gl.Color(0.2f, 0.8f, 0.4f);
        DrawSphere(gl, 0.15f);

        // Arm 2 Segment
        gl.PushMatrix();
        gl.Translate(L2 / 2.0f, 0.0f, 0.0f);
        gl.Scale(L2, 0.12f, 0.15f);
        DrawCube(gl);
        gl.PopMatrix();

        // Pinole / Vertikalhub (Translation -d3)
        gl.PushMatrix();
        gl.Translate(L2, -_d3, 0.0f);

        // Vertikaler Pinolenschaft
        gl.Color(0.85f, 0.85f, 0.85f);
        gl.PushMatrix();
        gl.Translate(0.0f, 0.15f, 0.0f);
        DrawCylinder(gl, 0.035f, 0.35f, 16);
        gl.PopMatrix();

        // Greiferkopf
        gl.Color(0.9f, 0.3f, 0.2f);
        DrawSphere(gl, 0.07f);

        gl.PopMatrix(); // Ende Pinole
        gl.PopMatrix(); // Ende Arm 2
        gl.PopMatrix(); // Ende Arm 1
    }

    private void DrawTcpSphere(OpenGL gl)
    {
        var (xAna, yAna, zAna) = CalculateAnalyticTcp();

        gl.Disable(OpenGL.GL_LIGHTING);
        gl.Color(1.0f, 1.0f, 0.0f); // Leuchtendes Gelb

        gl.PushMatrix();
        gl.Translate(xAna, yAna, zAna);
        DrawSphere(gl, 0.04f);
        gl.PopMatrix();

        gl.Enable(OpenGL.GL_LIGHTING);
    }

    private (float X, float Y, float Z) CalculateAnalyticTcp()
    {
        // Analytische Vorwärtskinematik für 2D-Planar-Drehachsen + vertikalem Hub:
        // theta1 und theta2 in Radiant
        float t1 = _theta1Deg * MathF.PI / 180.0f;
        float t12 = (_theta1Deg + _theta2Deg) * MathF.PI / 180.0f;

        float x = L1 * MathF.Cos(t1) + L2 * MathF.Cos(t12);
        float z = -(L1 * MathF.Sin(t1) + L2 * MathF.Sin(t12));
        float y = HBase - _d3;

        return (x, y, z);
    }

    private void UpdateTcpCalculations()
    {
        var (xAna, yAna, zAna) = CalculateAnalyticTcp();

        // Matrix-Berechnung über den Szenengraph
        UpdateJointTransforms();
        var pMatrix = _pinoleNode.GetWorldPosition();

        if (TxtTcpAnalytic != null)
            TxtTcpAnalytic.Text = $"X = {xAna:F3} m | Y = {yAna:F3} m | Z = {zAna:F3} m";

        if (TxtTcpMatrix != null)
            TxtTcpMatrix.Text = $"X = {pMatrix.X:F3} m | Y = {pMatrix.Y:F3} m | Z = {pMatrix.Z:F3} m";

        float diff = MathF.Sqrt(
            MathF.Pow(xAna - pMatrix.X, 2) +
            MathF.Pow(yAna - pMatrix.Y, 2) +
            MathF.Pow(zAna - pMatrix.Z, 2)) * 1000.0f; // mm

        if (TxtTcpDiff != null)
            TxtTcpDiff.Text = $"Deckungsfehler Delta = {diff:F3} mm";
    }

    // Geometrie-Primitive & Normalen
    private static void DrawAxes(OpenGL gl, float length)
    {
        gl.Disable(OpenGL.GL_LIGHTING);
        gl.LineWidth(2.5f);
        gl.Begin(OpenGL.GL_LINES);

        // X = Rot
        gl.Color(1.0f, 0.1f, 0.1f);
        gl.Vertex(0.0f, 0.0f, 0.0f);
        gl.Vertex(length, 0.0f, 0.0f);

        // Y = Grün
        gl.Color(0.1f, 1.0f, 0.1f);
        gl.Vertex(0.0f, 0.0f, 0.0f);
        gl.Vertex(0.0f, length, 0.0f);

        // Z = Blau
        gl.Color(0.1f, 0.4f, 1.0f);
        gl.Vertex(0.0f, 0.0f, 0.0f);
        gl.Vertex(0.0f, 0.0f, length);

        gl.End();
        gl.Enable(OpenGL.GL_LIGHTING);
    }

    private static void DrawFloorGrid(OpenGL gl, float size, float step)
    {
        gl.Disable(OpenGL.GL_LIGHTING);
        gl.LineWidth(1.0f);
        gl.Color(0.2f, 0.2f, 0.2f);
        gl.Begin(OpenGL.GL_LINES);

        for (float v = -size; v <= size; v += step)
        {
            gl.Vertex(-size, 0.0f, v);
            gl.Vertex(size, 0.0f, v);

            gl.Vertex(v, 0.0f, -size);
            gl.Vertex(v, 0.0f, size);
        }

        gl.End();
        gl.Enable(OpenGL.GL_LIGHTING);
    }

    private static void DrawCube(OpenGL gl)
    {
        float s = 0.5f;
        gl.Begin(OpenGL.GL_QUADS);

        // Vorne
        gl.Normal(0.0f, 0.0f, 1.0f);
        gl.Vertex(-s, -s, s); gl.Vertex(s, -s, s); gl.Vertex(s, s, s); gl.Vertex(-s, s, s);

        // Hinten
        gl.Normal(0.0f, 0.0f, -1.0f);
        gl.Vertex(-s, -s, -s); gl.Vertex(-s, s, -s); gl.Vertex(s, s, -s); gl.Vertex(s, -s, -s);

        // Oben
        gl.Normal(0.0f, 1.0f, 0.0f);
        gl.Vertex(-s, s, -s); gl.Vertex(-s, s, s); gl.Vertex(s, s, s); gl.Vertex(s, s, -s);

        // Unten
        gl.Normal(0.0f, -1.0f, 0.0f);
        gl.Vertex(-s, -s, -s); gl.Vertex(s, -s, -s); gl.Vertex(s, -s, s); gl.Vertex(-s, -s, s);

        // Rechts
        gl.Normal(1.0f, 0.0f, 0.0f);
        gl.Vertex(s, -s, -s); gl.Vertex(s, s, -s); gl.Vertex(s, s, s); gl.Vertex(s, -s, s);

        // Links
        gl.Normal(-1.0f, 0.0f, 0.0f);
        gl.Vertex(-s, -s, -s); gl.Vertex(-s, -s, s); gl.Vertex(-s, s, s); gl.Vertex(-s, s, -s);

        gl.End();
    }

    private static void DrawSphere(OpenGL gl, float radius, int slices = 16, int stacks = 16)
    {
        for (int i = 0; i < stacks; i++)
        {
            float phi1 = MathF.PI * (-0.5f + (float)i / stacks);
            float phi2 = MathF.PI * (-0.5f + (float)(i + 1) / stacks);

            gl.Begin(OpenGL.GL_QUAD_STRIP);
            for (int j = 0; j <= slices; j++)
            {
                float theta = 2.0f * MathF.PI * (float)j / slices;

                float x1 = MathF.Cos(phi1) * MathF.Cos(theta);
                float y1 = MathF.Sin(phi1);
                float z1 = MathF.Cos(phi1) * MathF.Sin(theta);

                float x2 = MathF.Cos(phi2) * MathF.Cos(theta);
                float y2 = MathF.Sin(phi2);
                float z2 = MathF.Cos(phi2) * MathF.Sin(theta);

                gl.Normal(x1, y1, z1);
                gl.Vertex(radius * x1, radius * y1, radius * z1);

                gl.Normal(x2, y2, z2);
                gl.Vertex(radius * x2, radius * y2, radius * z2);
            }
            gl.End();
        }
    }

    private static void DrawCylinder(OpenGL gl, float radius, float height, int slices = 16)
    {
        gl.Begin(OpenGL.GL_QUAD_STRIP);
        for (int i = 0; i <= slices; i++)
        {
            float theta = 2.0f * MathF.PI * i / slices;
            float nx = MathF.Cos(theta);
            float nz = MathF.Sin(theta);

            gl.Normal(nx, 0.0f, nz);
            gl.Vertex(radius * nx, 0.0f, radius * nz);
            gl.Vertex(radius * nx, height, radius * nz);
        }
        gl.End();
    }

    // Kamera-Maus-Events
    private void OpenGlView_MouseDown(object sender, MouseButtonEventArgs e)
    {
        if (e.LeftButton == MouseButtonState.Pressed)
        {
            _isDragging = true;
            _lastMousePos = e.GetPosition(OpenGlView);
            OpenGlView.CaptureMouse();
        }
    }

    private void OpenGlView_MouseMove(object sender, MouseEventArgs e)
    {
        if (!_isDragging) return;

        Point currentPos = e.GetPosition(OpenGlView);
        double dx = currentPos.X - _lastMousePos.X;
        double dy = currentPos.Y - _lastMousePos.Y;

        // Orbit-Drehung anpassen (Maus-Empfindlichkeit 0.4 Grad/Pixel)
        _camera.Rotate(dx * 0.4, -dy * 0.4);
        _lastMousePos = currentPos;
    }

    private void OpenGlView_MouseUp(object sender, MouseButtonEventArgs e)
    {
        if (_isDragging)
        {
            _isDragging = false;
            OpenGlView.ReleaseMouseCapture();
        }
    }

    private void OpenGlView_MouseWheel(object sender, MouseWheelEventArgs e)
    {
        // Zoom über Mausrad
        double deltaZoom = e.Delta > 0 ? -0.5 : 0.5;
        _camera.Zoom(deltaZoom);
    }

    private void SliderJoint_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
    {
        if (SliderTheta1 == null || SliderTheta2 == null || SliderD3 == null) return;

        _theta1Deg = (float)SliderTheta1.Value;
        _theta2Deg = (float)SliderTheta2.Value;
        _d3 = (float)SliderD3.Value;

        TxtTheta1.Text = $"{_theta1Deg:F0}°";
        TxtTheta2.Text = $"{_theta2Deg:F0}°";
        TxtD3.Text = $"{_d3:F2} m";

        UpdateTcpCalculations();
    }

    private void BtnResetView_Click(object sender, RoutedEventArgs e)
    {
        _camera.AzimuthDeg = 45.0;
        _camera.ElevationDeg = 30.0;
        _camera.Distance = 8.0;
        _camera.LookAtX = 0.0;
        _camera.LookAtY = 0.5;
        _camera.LookAtZ = 0.0;
    }

    private void BtnResetJoints_Click(object sender, RoutedEventArgs e)
    {
        SliderTheta1.Value = 0.0;
        SliderTheta2.Value = 0.0;
        SliderD3.Value = 0.0;
    }
}
