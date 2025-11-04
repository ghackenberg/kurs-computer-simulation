using System.Windows;
using VorlageSzenengraph3D.Model;
using VorlageSzenengraph3D.Model.Nodes;
using VorlageSzenengraph3D.Model.Nodes.Primitives;
using VorlageSzenengraph3D.Model.Nodes.Volumes;
using VorlageSzenengraph3D.Model.Transforms;

namespace VorlageSzenengraph3D
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public Rotate _rotate;

        private Scene _scene;

        public MainWindow()
        {
            InitializeComponent();

            _rotate = new Rotate(0, 1, 0, 0);

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

            Cube cube = new Cube("Cube", 2, 2, 2, Material.RED);
            cube.Transforms.Add(new Translate(0, 0, -2));

            Sphere sphere = new Sphere("Sphere", 1, 50, 50, Material.GREEN);
            sphere.Transforms.Add(new Translate(0, 0, +2));

            Cylinder cylinder = new Cylinder("Cylinder", 1, 0.5f, 2, 1, 50, Material.BLUE);
            cylinder.Transforms.Add(new Translate(-2, 0, 0));

            Group root = new Group("Root");

            root.Transforms.Add(new Translate(0, 0, -10));
            root.Transforms.Add(new Rotate(1, 0, 0, 30));
            root.Transforms.Add(_rotate);

            root.Add(lines);
            root.Add(triangles);
            root.Add(quads);
            root.Add(cube);
            root.Add(sphere);
            root.Add(cylinder);

            _scene = new Scene(Color.WHITE, Color.DARKGRAY, root);
            _scene.Lights.Add(new Light(new Model.Vector(10, 10, 10), Color.DARKGRAY, Color.GRAY, Color.BLACK));
        }

        private void OpenGLControl_OpenGLInitialized(object sender, SharpGL.WPF.OpenGLRoutedEventArgs args)
        {
            _scene.Initialize(args.OpenGL);
        }

        private void OpenGLControl_OpenGLDraw(object sender, SharpGL.WPF.OpenGLRoutedEventArgs args)
        {
            _scene.Draw(args.OpenGL);

            _rotate.Angle += 3;
        }
    }
}