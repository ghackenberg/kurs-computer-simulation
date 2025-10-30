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

            Lines lines = new Lines("Lines", new Vertex(0, 0, 0), new Vertex(1, 1, 0), Material.RED);

            Triangles triangles = new Triangles("Triangles", new Vertex(0, 0, 0), new Vertex(1, 0, 0), new Vertex(1, -1, 0), Material.GREEN);

            Quads quads = new Quads("Quads", new Vertex(0, 0, 0), new Vertex(-1, 0, 0), new Vertex(-1, -1, 0), new Vertex(0, -1, 0), Material.BLUE);

            Cube cube1 = new Cube("Cube1", 1, 1, 1, Material.RED);
            cube1.Transforms.Add(new Translate(0, 0, -2));

            Cube cube2 = new Cube("Cube2", 2, 1, 1, Material.GREEN);
            cube2.Transforms.Add(new Translate(0, 0, +2));

            Cube cube3 = new Cube("Cube3", 1, 2, 1, Material.BLUE);
            cube3.Transforms.Add(new Translate(-2, 0, 0));

            Group root = new Group("Root");

            root.Transforms.Add(new Translate(0, 0, -5));
            root.Transforms.Add(new Rotate(1, 0, 0, 30));
            root.Transforms.Add(_rotate);

            root.Add(lines);
            root.Add(triangles);
            root.Add(quads);
            root.Add(cube1);
            root.Add(cube2);
            root.Add(cube3);

            _scene = new Scene(Color.WHITE, Color.DARKGRAY, root);
            _scene.Lights.Add(new Light(Model.Vector.ZERO, Color.DARKGRAY, Color.GRAY, Color.BLACK));
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