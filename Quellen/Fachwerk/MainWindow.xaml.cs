using System.Windows;
using System.Windows.Controls;

namespace Fachwerk
{
    public class Model
    {
        public string Name { get; }

        public List<Node> Nodes { get; } = new List<Node>();
        public List<Rod> Rods { get; } = new List<Rod>();
        public List<Bearing> Bearings { get; } = new List<Bearing>();
        public List<ExternalForce> ExternalForces { get; } = new List<ExternalForce>();

        public Model(string name)
        {
            Name = name;
        }

        public Node AddNode(string name, double x, double y)
        {
            var node = new Node(this, name, x, y);

            Nodes.Add(node);

            return node;
        }

        public Rod AddRod(Node nodeA, Node nodeB)
        {
            var rod = new Rod(this, nodeA, nodeB);

            Rods.Add(rod);

            return rod;
        }

        public Bearing AddBearing(Node node, bool fixX, bool fixY)
        {
            var bearing = new Bearing(this, node, fixX, fixY);

            Bearings.Add(bearing);

            return bearing;
        }

        public ExternalForce AddExternalForce(Node node, double x, double y)
        {
            var force = new ExternalForce(this, node, x, y);

            ExternalForces.Add(force);

            return force;
        }

        public void Solve()
        {
            // TODO!
        }

        public override string ToString()
        {
            return Name;
        }
    }

    public class Node
    {
        public Model Model { get; }

        public string Name { get; }

        public double X { get; }
        public double Y { get; }

        public Node(Model model, string name, double x, double y)
        {
            Model = model;

            Name = name;

            X = x;
            Y = y;
        }

        public override string ToString()
        {
            return Name;
        }
    }

    public class Rod
    {
        public Model Model { get; }

        public Node NodeA { get; }
        public Node NodeB { get; }

        public double Force { get; set; } // To be computed!

        public Rod(Model model, Node nodeA, Node nodeB)
        {
            Model = model;

            NodeA = nodeA;
            NodeB = nodeB;
        }
    }

    public class Bearing
    {
        public Model Model { get; }

        public Node Node { get; }

        public bool FixX { get; }
        public bool FixY { get; }

        public double ForceX { get; set; } // To be computed!
        public double ForceY { get; set; } // To be computed!

        public Bearing(Model model, Node node, bool fixX, bool fixY)
        {
            Model = model;

            Node = node;

            FixX = fixX;
            FixY = fixY;
        }
    }

    public class ExternalForce
    {
        public Model Model { get; }

        public Node Node { get; }

        public double X { get; }
        public double Y { get; }

        public ExternalForce(Model model, Node node, double x, double y)
        {
            Model = model;

            Node = node;

            X = x;
            Y = y;
        }
    }

    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            var model = new Model("Example");

            // Nodes

            var a = model.AddNode("a", 0, 0);
            var b = model.AddNode("b", 2, 0);
            var c = model.AddNode("c", 4, 0);
            var d = model.AddNode("d", 6, 0);

            var e = model.AddNode("e", 1, 2);
            var f = model.AddNode("f", 3, 2);
            var g = model.AddNode("g", 5, 2);

            // Rods

            model.AddRod(a, b);
            model.AddRod(b, c);
            model.AddRod(c, d);

            model.AddRod(e, f);
            model.AddRod(f, g);

            model.AddRod(a, e);
            model.AddRod(b, e);
            model.AddRod(b, f);
            model.AddRod(c, f);
            model.AddRod(c, g);
            model.AddRod(d, g);

            // Bearings

            model.AddBearing(a, true, true);
            model.AddBearing(d, false, true);

            // Forces

            model.AddExternalForce(f, 0, 2);
            model.AddExternalForce(g, 1, 0);

            // Calculate rod and bearing forces

            model.Solve();

            // DataGrid

            NodeDataGrid.ItemsSource = model.Nodes;
            RodDataGrid.ItemsSource = model.Rods;
            BearingDataGrid.ItemsSource = model.Bearings;
            ExternalForceDataGrid.ItemsSource = model.ExternalForces;

            // WpfPlot

            double[] dataX = { 1, 2, 3, 4, 5 };
            double[] dataY = { 1, 4, 9, 16, 25 };

            WpfPlot1.Plot.Add.Scatter(dataX, dataY);
            WpfPlot1.Refresh();
        }
    }
}