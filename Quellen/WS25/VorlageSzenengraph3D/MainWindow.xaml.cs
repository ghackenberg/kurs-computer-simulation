using System.Windows;
using System.Windows.Input;
using VorlageSzenengraph3D.Model;
using VorlageSzenengraph3D.Model.Nodes;
using VorlageSzenengraph3D.Model.Nodes.Primitives;
using VorlageSzenengraph3D.Model.Transforms;

namespace VorlageSzenengraph3D
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly OrbitCamera _camera = new() { Distance = 12.0, Elevation = 25.0, Azimuth = 35.0 };
        private Point _lastMousePosition;
        private Scene _scene;

        public MainWindow()
        {
            InitializeComponent();

            Group root = new Group("Root");

            // Nutzung der GeometryFactory (Folien 5.58 & 5.65-76)
            var cube = GeometryFactory.CreateBox(2, 2, 2, Material.RED);
            cube.Transforms.Add(new Translate(0, 0, -2));

            var sphere = GeometryFactory.CreateSphere(1.0f, 32, 16, Material.GREEN);
            sphere.Transforms.Add(new Translate(0, 0, 2));

            var cylinder = GeometryFactory.CreateCylinder(0.8f, 2.0f, 32, 1, Material.BLUE);
            cylinder.Transforms.Add(new Translate(-2.5f, 0, 0));

            // Primitive Geometrien (Punkte, Linien, Dreiecke, Vierecke)
            Lines lines = new Lines("Lines");
            lines.Add(new Vertex(0, 0, 0), new Normal(0, 1, 0), Material.BLACK);
            lines.Add(new Vertex(1, 0, 0), new Normal(0, 1, 0), Material.BLACK);

            Triangles triangles = new Triangles("Triangles");
            triangles.Add(new Vertex(0, 0, 0), new Normal(0, 0, 1), Material.LIGHTGRAY);
            triangles.Add(new Vertex(1, 0, 0), new Normal(0, 0, 1), Material.GRAY);
            triangles.Add(new Vertex(1, 1, 0), new Normal(0, 0, 1), Material.DARKGRAY);
            triangles.Transforms.Add(new Translate(1, 0, 0));

            Quads quads = new Quads("Quads");
            quads.Add(new Vertex(0, 0, 0), new Normal(0, 0, 1), Material.RED);
            quads.Add(new Vertex(1, 0, 0), new Normal(0, 0, 1), Material.GREEN);
            quads.Add(new Vertex(1, 1, 0), new Normal(0, 0, 1), Material.BLUE);
            quads.Add(new Vertex(0, 1, 0), new Normal(0, 0, 1), Material.GRAY);
            quads.Transforms.Add(new Translate(2, 0, 0));

            root.Add(lines);
            root.Add(triangles);
            root.Add(quads);
            root.Add(cube);
            root.Add(sphere);
            root.Add(cylinder);

            _scene = new Scene(Color.WHITE, Color.DARKGRAY, root)
            {
                Camera = _camera
            };
            _scene.Lights.Add(new Light(new Model.Vector(10, 10, 10), Color.DARKGRAY, Color.GRAY, Color.BLACK));
        }

        private void OpenGLControl_OpenGLInitialized(object sender, SharpGL.WPF.OpenGLRoutedEventArgs args)
        {
            _scene.Initialize(args.OpenGL);
        }

        private void OpenGLControl_OpenGLDraw(object sender, SharpGL.WPF.OpenGLRoutedEventArgs args)
        {
            // Kamera-Transformation anwenden
            _camera.Apply(args.OpenGL);

            // Szene rendern
            _scene.Draw(args.OpenGL);
        }

        private void OpenGLControl_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.LeftButton != MouseButtonState.Pressed) return;
            _lastMousePosition = e.GetPosition(openGLControl);
            openGLControl.CaptureMouse();
        }

        private void OpenGLControl_MouseUp(object sender, MouseButtonEventArgs e)
        {
            if (openGLControl.IsMouseCaptured)
            {
                openGLControl.ReleaseMouseCapture();
            }
        }

        private void OpenGLControl_MouseMove(object sender, MouseEventArgs e)
        {
            if (!openGLControl.IsMouseCaptured || e.LeftButton != MouseButtonState.Pressed) return;

            Point currentPosition = e.GetPosition(openGLControl);
            double dx = currentPosition.X - _lastMousePosition.X;
            double dy = currentPosition.Y - _lastMousePosition.Y;

            // Skalierung: dx steuert Azimut, dy steuert Elevation
            _camera.Rotate(dx * 0.4, -dy * 0.4);
            _lastMousePosition = currentPosition;

            openGLControl.DoRender();
        }

        private void OpenGLControl_MouseWheel(object sender, MouseWheelEventArgs e)
        {
            _camera.Zoom(e.Delta * 0.01);
            openGLControl.DoRender();
        }
    }
}