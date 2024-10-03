using SharpGL.SceneGraph.Primitives;
using SharpGL.WPF;
using SharpGL;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using SharpGL.SceneGraph.Effects;
using SharpGL.SceneGraph;
using SharpGL.SceneGraph.Lighting;
using SharpGL.SceneGraph.Helpers;
using System.Windows.Threading;

namespace VorlageVisualisierung3D
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private Scene scene = new Scene();

        public MainWindow()
        {
            InitializeComponent();

            // Wenn die Größe des Steuerelements geändert wurde, neu zeichnen!
            OpenGLControl.Resized += (o, e) =>
            {
                scene.Resize((int)OpenGLControl.ActualWidth, (int)OpenGLControl.ActualHeight);

                OpenGLControl.DoRender();
            };
            // Wenn neu gezeichnert wird, auch die Scene neu zeichnen!
            OpenGLControl.OpenGLDraw += (o, e) =>
            {
                scene.Draw();
            };
            // Nach der Initialisierung den OpenGL Context an die Szene übergeben
            OpenGLControl.OpenGLInitialized += (o, e) =>
            {
                scene.CreateInContext(e.OpenGL);
            };
            // Wir legen die Render-Zeitpunkte selbst fest
            OpenGLControl.RenderTrigger = RenderTrigger.Manual;

            // Lichter, Raster und Achsen initialisieren
            SceneHelper.InitialiseModelingScene(scene);

            // Zufallszahlengenerator erzeugen
            var random = new Random();

            // Würfelobjekte erzeugen und der Szene hinzufügen
            var cubes = new Cube[10];
            for (var  i = 0; i < cubes.Length; i++)
            {
                cubes[i] = new Cube();
                cubes[i].Transformation.TranslateX = (random.NextSingle() - 0.5f) * 20;
                cubes[i].Transformation.TranslateY = (random.NextSingle() - 0.5f) * 20;

                scene.SceneContainer.AddChild(cubes[i]);
            }

            // Würfel zufällig bewegen und neu rendern
            var dispatcher = new DispatcherTimer();
            dispatcher.Tick += (o, e) =>
            {
                for (var i = 0; i < cubes.Length; i++)
                {
                    cubes[i].Transformation.TranslateX += (random.NextSingle() - 0.5f);
                    cubes[i].Transformation.TranslateY += (random.NextSingle() - 0.5f);
                }
                OpenGLControl.DoRender();
            };
            dispatcher.Interval = TimeSpan.FromSeconds(1);
            dispatcher.Start();
        }
    }
}