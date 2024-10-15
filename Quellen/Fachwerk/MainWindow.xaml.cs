using MathNet.Numerics.LinearAlgebra;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Media;
using System.Windows.Shapes;

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
            var node = new Node(this, Nodes.Count, name, x, y);

            Nodes.Add(node);

            return node;
        }

        public Rod AddRod(Node nodeA, Node nodeB)
        {
            var rod = new Rod(this, Rods.Count, nodeA, nodeB);

            Rods.Add(rod);

            return rod;
        }

        public Bearing AddBearing(Node node, bool fixX, bool fixY)
        {
            var bearing = new Bearing(this, Bearings.Count, node, fixX, fixY);

            Bearings.Add(bearing);

            return bearing;
        }

        public ExternalForce AddExternalForce(Node node, double x, double y)
        {
            var force = new ExternalForce(this, ExternalForces.Count, node, x, y);

            ExternalForces.Add(force);

            return force;
        }

        public void Solve()
        {
            // Build matrix
            var A = Matrix<double>.Build.Dense(Nodes.Count * 2, Rods.Count + Bearings.Count * 2);
            foreach (var rod in Rods)
            {
                double dx = rod.NodeB.X - rod.NodeA.X;
                double dy = rod.NodeB.Y - rod.NodeA.Y;

                double l = Math.Sqrt(dx * dx + dy * dy);

                A[rod.NodeA.Index * 2 + 0, rod.Index] = dx / l;
                A[rod.NodeA.Index * 2 + 1, rod.Index] = dy / l;

                A[rod.NodeB.Index * 2 + 0, rod.Index] = -dx / l;
                A[rod.NodeB.Index * 2 + 1, rod.Index] = -dy / l;
            }
            foreach (var bearing in Bearings)
            {
                A[bearing.Node.Index * 2 + 0, Rods.Count + bearing.Index * 2 + 0] = bearing.FixX ? 1 : 0;
                A[bearing.Node.Index * 2 + 1, Rods.Count + bearing.Index * 2 + 1] = bearing.FixY ? 1 : 0;
            }

            // Build node forces vector
            var b = Vector<double>.Build.Dense(Nodes.Count * 2);
            foreach (var externalForce in ExternalForces)
            {
                b[externalForce.Node.Index * 2 + 0] = externalForce.X;
                b[externalForce.Node.Index * 2 + 1] = externalForce.Y;
            }

            // Calculate rod and bearing forces
            var x = A.Svd().Solve(b);
            foreach (var rod in Rods)
            {
                rod.Force = x[rod.Index];
            }
            foreach (var bearing in Bearings)
            {
                bearing.ForceX = x[Rods.Count + bearing.Index * 2 + 0];
                bearing.ForceY = x[Rods.Count + bearing.Index * 2 + 1];
            }

            // Check solution for correctness
            var diff = (A.Multiply(x) - b).L2Norm();
            if (diff > 0.0001)
            {
                throw new Exception("Solution does not seem to be correct!");
            }
        }

        public double GetMinX()
        {
            return Nodes.Min(node => node.X);
        }

        public double GetMaxX()
        {
            return Nodes.Max(node => node.X);
        }

        public double GetMinY()
        {
            return Nodes.Min(node => node.Y);
        }

        public double GetMaxY()
        {
            return Nodes.Max(node => node.Y);
        }

        public double GetMinForce()
        {
            return Rods.Min(rod => rod.Force);
        }

        public double GetMaxForce()
        {
            return Rods.Max(rod => rod.Force);
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

        public int Index { get; }

        public double X { get; }
        public double Y { get; }

        public Node(Model model, int index, string name, double x, double y)
        {
            Model = model;

            Index = index;

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

        public int Index { get; }

        public Node NodeA { get; }
        public Node NodeB { get; }

        public double Force { get; set; } // To be computed!

        public Rod(Model model, int index, Node nodeA, Node nodeB)
        {
            Model = model;

            Index = index;

            NodeA = nodeA;
            NodeB = nodeB;
        }
    }

    public class Bearing
    {
        public Model Model { get; }

        public int Index { get; }

        public Node Node { get; }

        public bool FixX { get; }
        public bool FixY { get; }

        public double ForceX { get; set; } // To be computed!
        public double ForceY { get; set; } // To be computed!

        public Bearing(Model model, int index, Node node, bool fixX, bool fixY)
        {
            Model = model;

            Index = index;

            Node = node;

            FixX = fixX;
            FixY = fixY;
        }
    }

    public class ExternalForce
    {
        public Model Model { get; }

        public int Index { get; }

        public Node Node { get; }

        public double X { get; }
        public double Y { get; }

        public ExternalForce(Model model, int index, Node node, double x, double y)
        {
            Model = model;

            Index = index;

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

            var a = model.AddNode("a",  0,  0);
            var b = model.AddNode("b", 20,  0);
            var c = model.AddNode("c", 40,  0);
            var d = model.AddNode("d", 60,  0);

            var e = model.AddNode("e", 10, 20);
            var f = model.AddNode("f", 30, 20);
            var g = model.AddNode("g", 50, 20);

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

            model.AddExternalForce(f, 0, 10);
            model.AddExternalForce(g, 10, 0);

            // Calculate rod and bearing forces

            model.Solve();

            // DataGrid

            NodeDataGrid.ItemsSource = model.Nodes;
            RodDataGrid.ItemsSource = model.Rods;
            BearingDataGrid.ItemsSource = model.Bearings;
            ExternalForceDataGrid.ItemsSource = model.ExternalForces;

            // Canvas

            var minX = model.GetMinX();
            var minY = model.GetMinY();

            var maxX = model.GetMaxX();
            var maxY = model.GetMaxY();

            var innerWidth = maxX - minX;
            var innerHeight = maxY - minY;

            var pad = Math.Min(innerWidth, innerHeight) * 0.2;

            var width = innerWidth + pad * 2;
            var height = innerHeight + pad * 2;

            var minForce = model.GetMinForce();
            var maxForce = model.GetMaxForce();

            var forceRange = maxForce - minForce;

            DrawCanvas.Width = width;
            DrawCanvas.Height = height;

            foreach (var rod in model.Rods)
            {
                var p = (rod.Force - minForce) / forceRange;

                var red = (1 - p) * 128 + 127;
                var green = rod.Force < 0 ? (1 - rod.Force / minForce) * 128 + 127 : (1 - rod.Force / maxForce) * 128 + 127;
                var blue = p * 128 + 127;

                var color = System.Windows.Media.Color.FromRgb((byte) red, (byte) green, (byte) blue);
                var brush = new SolidColorBrush(color);

                var cx = (rod.NodeA.X + rod.NodeB.X) / 2;
                var cy = (rod.NodeA.Y + rod.NodeB.Y) / 2;

                var line = new Line();

                line.Stroke = brush;
                line.StrokeThickness = 2;
                
                line.X1 = pad + rod.NodeA.X;
                line.Y1 = height - pad - rod.NodeA.Y;

                line.X2 = pad + rod.NodeB.X;
                line.Y2 = height - pad - rod.NodeB.Y;

                DrawCanvas.Children.Add(line);

                var text = new TextBlock();

                text.Text = String.Format("{0:0.00}", rod.Force);
                text.FontSize = 2;

                var size = MeasureString(text);

                text.SetValue(Canvas.LeftProperty, pad + cx - size.Width / 2);
                text.SetValue(Canvas.TopProperty, height - pad - cy - size.Height / 2);

                DrawCanvas.Children.Add(text);
            }

            foreach (var node in model.Nodes)
            {
                var circle = new Ellipse();

                circle.Fill = Brushes.Black;

                circle.Width = 4;
                circle.Height = 4;

                circle.SetValue(Canvas.LeftProperty, pad + node.X - 2);
                circle.SetValue(Canvas.TopProperty, height - pad - node.Y - 2);

                DrawCanvas.Children.Add(circle);

                var text = new TextBlock();

                text.Text = node.Name;
                text.Foreground = Brushes.White;
                text.FontSize = 2;

                var size = MeasureString(text);

                text.SetValue(Canvas.LeftProperty, pad + node.X - size.Width / 2);
                text.SetValue(Canvas.TopProperty, height - pad - node.Y - size.Height / 2);

                DrawCanvas.Children.Add(text);
            }
        }

        static System.Windows.Size MeasureString(TextBlock block)
        {
            var textToFormat = block.Text;
            var culture = CultureInfo.CurrentCulture;
            var flowDirection = FlowDirection.LeftToRight;
            var typeface = new Typeface(block.FontFamily, block.FontStyle, block.FontWeight, block.FontStretch);
            var fontSize = block.FontSize;
            var foreground = Brushes.Black;
            var numberSubstitution = new NumberSubstitution();
            var pixelPerDip = VisualTreeHelper.GetDpi(block).PixelsPerDip;

            var formattedText = new FormattedText(textToFormat, culture, flowDirection, typeface, fontSize, foreground, numberSubstitution, pixelPerDip);

            return new System.Windows.Size(formattedText.Width, formattedText.Height);
        }
    }
}