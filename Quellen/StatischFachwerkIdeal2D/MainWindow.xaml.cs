using FachwerkIdeal.Model;
using System.Globalization;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace FachwerkIdeal
{
    public partial class MainWindow : Window
    {
        private Truss truss;

        private double minX;
        private double maxX;

        private double minY;
        private double maxY;

        private double diffX;
        private double diffY;

        private double scale;

        private double width;
        private double height;

        private double maxForce;

        public MainWindow()
        {
            InitializeComponent();

            // Modell erstellen

            truss = new Truss();

            var a = truss.AddNode("a", 0, 0, true, true);
            var b = truss.AddNode("b", 2, 0);
            var c = truss.AddNode("c", 4, 0, false, true);
            var d = truss.AddNode("d", 1, 1);
            var e = truss.AddNode("e", 3, 1, false, false, -0.25, -0.5);

            truss.AddRod(a, b);
            truss.AddRod(b, c);
            truss.AddRod(d, e);
            truss.AddRod(a, d);
            truss.AddRod(b, d);
            truss.AddRod(b, e);
            truss.AddRod(c, e);

            // Modell lösen

            truss.Solve();

            // Bereich der Knotenkoordinaten bestimmen

            minX = truss.Nodes.Min(node => node.X);
            minX = Math.Min(minX, truss.Nodes.Min(node => node.X + node.ForceX));

            minY = truss.Nodes.Min(node => node.Y);
            minY = Math.Min(minY, truss.Nodes.Min(node => node.Y + node.ForceY));

            maxX = truss.Nodes.Max(node => node.X);
            maxX = Math.Max(maxX, truss.Nodes.Max(node => node.X + node.ForceX));

            maxY = truss.Nodes.Max(node => node.Y);
            maxY = Math.Max(maxY, truss.Nodes.Max(node => node.Y + node.ForceY));

            // Differenzen bestimmen

            diffX = maxX - minX;
            diffY = maxY - minY;

            // Maximale Kraft bestimmen
            
            maxForce = truss.Rods.Max(rod => Math.Abs(rod.Force));

            // Daten visualisieren

            NodeDataGrid.ItemsSource = truss.Nodes;
            RodDataGrid.ItemsSource = truss.Rods;
        }

        public void Repaint()
        {
            // Canvas-Inhalt leeren

            Visualization.Children.Clear();

            // Canvas-Größe auslesen

            width = Visualization.ActualWidth;
            height = Visualization.ActualHeight;

            // Längenverhältnisse bestimmen

            var scaleX = (width * 0.8) / diffX;
            var scaleY = (height * 0.8) / diffY;

            scale = Math.Min(scaleX, scaleY);

            // Stäbe zeichnen

            foreach (var rod in truss.Rods)
            {
                // Stablinie zeichnen

                var r = rod.Force < 0 ? 255 : 0;
                var g = 0;
                var b = rod.Force < 0 ? 0 : 255;
                var a = Math.Abs(rod.Force) / maxForce * 128;
                
                var color = Color.FromArgb((byte)a, (byte)r, (byte)g, (byte)b);

                PaintLine(rod.NodeA.X, rod.NodeA.Y, rod.NodeB.X, rod.NodeB.Y, 0.5, color);

                // Stabtext zeichnen

                var mx = (rod.NodeA.X + rod.NodeB.X) / 2;
                var my = (rod.NodeA.Y + rod.NodeB.Y) / 2;

                var text = string.Format("{0:N2}", rod.Force);

                PaintText(mx, my, 1, Colors.Black, text);
            }

            // Knoten zeichnen

            foreach (var node in truss.Nodes)
            {
                // Knotenkräfte zeichnen

                if (node.FixX == node.FixY)
                {
                    PaintForce(node.X, node.Y, node.ForceX, node.ForceY, node.FixX ? Colors.Orange : Colors.Green);
                }
                else
                {
                    PaintForce(node.X, node.Y, node.ForceX, 0, node.FixX ? Colors.Orange : Colors.Green);
                    PaintForce(node.X, node.Y, 0, node.ForceY, node.FixY ? Colors.Orange : Colors.Green);
                }

                // Knotenkreis zeichnen

                PaintCircle(node.X, node.Y, 1, Colors.Black);

                // Knotentext zeichnen

                PaintText(node.X, node.Y, 1, Colors.White, node.Name);
            }
        }

        private void PaintCircle(double trussX, double trussY, double trussR, Color color)
        {
            var canvasX = ProjectX(trussX);
            var canvasY = ProjectY(trussY);
            var canvasR = ProjectW(trussR);

            var ellipse = new Ellipse();
            
            ellipse.Fill = new SolidColorBrush(color);
            ellipse.Width = canvasR * 2;
            ellipse.Height = canvasR * 2;

            Canvas.SetTop(ellipse, canvasY - canvasR);
            Canvas.SetLeft(ellipse, canvasX - canvasR);

            Visualization.Children.Add(ellipse);
        }

        private void PaintLine(double trussX1, double trussY1, double trussX2, double trussY2, double trussW, Color color)
        {
            var canvasX1 = ProjectX(trussX1);
            var canvasY1 = ProjectY(trussY1);

            var canvasX2 = ProjectX(trussX2);
            var canvasY2 = ProjectY(trussY2);

            var canvasW = ProjectW(trussW);

            var line = new Line();

            line.Stroke = new SolidColorBrush(color);
            line.StrokeThickness = canvasW;
            line.X1 = canvasX1;
            line.Y1 = canvasY1;
            line.X2 = canvasX2;
            line.Y2 = canvasY2;

            Visualization.Children.Add(line);
        }

        private void PaintTriangle(double x1, double y1, double x2, double y2, double x3, double y3, Color color)
        {
            var p1 = new Point(ProjectX(x1), ProjectY(y1));
            var p2 = new Point(ProjectX(x2), ProjectY(y2));
            var p3 = new Point(ProjectX(x3), ProjectY(y3));

            var polygon = new Polygon();
            polygon.Fill = new SolidColorBrush(color);
            polygon.Points.Add(p1);
            polygon.Points.Add(p2);
            polygon.Points.Add(p3);

            Visualization.Children.Add(polygon);
        }

        private void PaintForce(double x, double y, double fx, double fy, Color color)
        {
            PaintLine(x, y, x + fx * 0.91, y + fy * 0.91, 0.5, color);

            double l = Math.Sqrt(fx * fx + fy * fy);

            double x1 = x + fx * 0.9 + fy / l * 0.05;
            double y1 = y + fy * 0.9 - fx / l * 0.05;

            double x2 = x + fx;
            double y2 = y + fy;

            double x3 = x + fx * 0.9 - fy / l * 0.05;
            double y3 = y + fy * 0.9 + fx / l * 0.05;

            PaintTriangle(x1, y1, x2, y2, x3, y3, color);
        }

        private void PaintText(double trussX, double trussY, double trussF, Color color, string text)
        {
            var canvasX = ProjectX(trussX);
            var canvasY = ProjectY(trussY);
            var canvasF = ProjectW(trussF);

            var block = new TextBlock();
            block.Text = text;
            block.FontSize = canvasF;
            block.Foreground = new SolidColorBrush(color);

            var size = Measure(block);
            Canvas.SetTop(block, canvasY - size.Height / 2);
            Canvas.SetLeft(block, canvasX - size.Width / 2);

            Visualization.Children.Add(block);
        }

        private double ProjectX(double trussX)
        {
            return width / 2 - diffX / 2 * scale + (trussX - minX) * scale;
        }

        private double ProjectY(double trussY)
        {
            return height / 2 + diffY / 2 * scale - (trussY - minY) * scale;
        }

        private double ProjectW(double trussW)
        {
            return trussW * scale * 0.1;
        }

        static Size Measure(TextBlock block)
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

            return new Size(formattedText.Width, formattedText.Height);
        }

        private void Window_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            Repaint();
        }
    }
}