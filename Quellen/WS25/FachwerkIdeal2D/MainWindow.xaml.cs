using IdealesFachwerk2D.Model;
using System.Globalization;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace IdealesFachwerk2D
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private Truss truss;

        private double imageMinX;
        private double imageMaxX;

        private double imageMinY;
        private double imageMaxY;

        private double actualTop;
        private double actualLeft;

        private double scale;

        private double rodMinF;
        private double rodMaxF;

        public MainWindow()
        {
            InitializeComponent();

            truss = new Truss();

            Node nodeA = truss.AddNode("A", 100, 100, true, true, 0, 0);
            Node nodeB = truss.AddNode("B", 200, 200, false, false, 30, -10);
            Node nodeC = truss.AddNode("C", 300, 100, false, true, 0, 0);

            truss.AddRod(nodeA, nodeB);
            truss.AddRod(nodeA, nodeC);
            truss.AddRod(nodeB, nodeC);

            truss.Solve();
        }

        private void Window_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            MyCanvas.Children.Clear();

            // Schritt 0: Minimale und maximale Stabkräfte berechnen

            rodMinF = truss.Rods.Min(rod => rod.Force);
            rodMaxF = truss.Rods.Max(rod => rod.Force);

            // Schritt 1: Breite und Höhe des Bildes in Fachwerkkoordinaten berechnen

            imageMinX = truss.Nodes.Min(node => node.PositionX);
            imageMaxX = truss.Nodes.Max(node => node.PositionX);

            imageMinX = Math.Min(imageMinX, truss.Nodes.Min(node => node.FixX ? node.PositionX + node.ForceX : node.PositionX - node.ForceX));
            imageMaxX = Math.Max(imageMaxX, truss.Nodes.Max(node => node.FixX ? node.PositionX + node.ForceX : node.PositionX - node.ForceX));

            imageMinY = truss.Nodes.Min(node => node.PositionY);
            imageMaxY = truss.Nodes.Max(node => node.PositionY);

            imageMinY = Math.Min(imageMinY, truss.Nodes.Min(node => node.FixY ? node.PositionY + node.ForceY : node.PositionY - node.ForceY));
            imageMaxY = Math.Max(imageMaxY, truss.Nodes.Max(node => node.FixY ? node.PositionY + node.ForceY : node.PositionY - node.ForceY));

            double imageWidth = imageMaxX - imageMinX;
            double imageHeight = imageMaxY - imageMinY;

            // Schritt 2: Maximale Breite und Höhe des Bildes in Canvas-Koordinaten

            double canvasWidth = MyCanvas.ActualWidth * 0.8;
            double canvasHeight = MyCanvas.ActualHeight * 0.8;

            // Schritt 3: Tatsächliche Breite und Höhe des Bildes in Canvas-Koordinaten

            double scaleX = canvasWidth / imageWidth;
            double scaleY = canvasHeight / imageHeight;

            scale = Math.Min(scaleX, scaleY);

            double actualWidth = imageWidth * scale;
            double actualHeight = imageHeight * scale;

            actualTop = (MyCanvas.ActualHeight - actualHeight) / 2;
            actualLeft = (MyCanvas.ActualWidth - actualWidth) / 2;

            // Schritt 4: Stäbe zeichnen

            foreach (Rod rod in truss.Rods)
            {
                (double nodeATop, double nodeALeft) = ProjectNode(rod.NodeA);
                (double nodeBTop, double nodeBLeft) = ProjectNode(rod.NodeB);

                Line line = new Line();

                line.X1 = nodeALeft;
                line.Y1 = nodeATop;

                line.X2 = nodeBLeft;
                line.Y2 = nodeBTop;

                if (rod.Force < 0)
                {
                    // Druckkraft
                    double blue = rod.Force / rodMinF * 255;

                    Color color = Color.FromRgb(0, 0, (byte)blue);

                    line.Stroke = new SolidColorBrush(color);
                }
                else
                {
                    // Zugkraft
                    double red = rod.Force / rodMaxF * 255;

                    Color color = Color.FromRgb((byte)red, 0, 0);

                    line.Stroke = new SolidColorBrush(color);
                }
                line.StrokeThickness = 2;

                MyCanvas.Children.Add(line);
            }

            // Schritt 5: Last- und Lagerkräfte zeichen

            foreach (Node node in truss.Nodes)
            {
                if (node.FixX && node.FixY)
                {
                    // Ein Kraftvektor

                    (double nodeTop, double nodeLeft) = ProjectNode(node);

                    Line line = new Line();

                    line.X1 = nodeLeft;
                    line.Y1 = nodeTop;

                    line.X2 = nodeLeft + node.ForceX * scale;
                    line.Y2 = nodeTop - node.ForceY * scale;

                    line.Stroke = new SolidColorBrush(Colors.Green);
                    line.StrokeThickness = 1;

                    MyCanvas.Children.Add(line);

                    AddArrowHead(line, Colors.Green);
                }
                else if (node.FixX)
                {
                    // Zwei Kraftvektoren

                    (double nodeTop, double nodeLeft) = ProjectNode(node);

                    // Vektor 1

                    Line line1 = new Line();

                    line1.X1 = nodeLeft;
                    line1.Y1 = nodeTop;

                    line1.X2 = nodeLeft + node.ForceX * scale;
                    line1.Y2 = nodeTop;

                    line1.Stroke = new SolidColorBrush(Colors.Green);
                    line1.StrokeThickness = 1;

                    MyCanvas.Children.Add(line1);

                    AddArrowHead(line1, Colors.Green);

                    // Vektor 2

                    Line line2 = new Line();

                    line2.X1 = nodeLeft;
                    line2.Y1 = nodeTop + node.ForceY * scale;

                    line2.X2 = nodeLeft;
                    line2.Y2 = nodeTop;

                    line2.Stroke = new SolidColorBrush(Colors.Orange);
                    line2.StrokeThickness = 1;

                    MyCanvas.Children.Add(line2);

                    AddArrowHead(line2, Colors.Orange);
                }
                else if (node.FixY)
                {
                    // Zwei Kraftvektoren

                    (double nodeTop, double nodeLeft) = ProjectNode(node);

                    // Vektor 1

                    Line line1 = new Line();

                    line1.X1 = nodeLeft;
                    line1.Y1 = nodeTop;

                    line1.X2 = nodeLeft;
                    line1.Y2 = nodeTop - node.ForceY * scale;

                    line1.Stroke = new SolidColorBrush(Colors.Green);
                    line1.StrokeThickness = 1;

                    MyCanvas.Children.Add(line1);

                    AddArrowHead(line1, Colors.Green);

                    // Vektor 2

                    Line line2 = new Line();

                    line2.X1 = nodeLeft - node.ForceX * scale;
                    line2.Y1 = nodeTop;

                    line2.X2 = nodeLeft;
                    line2.Y2 = nodeTop;

                    line2.Stroke = new SolidColorBrush(Colors.Orange);
                    line2.StrokeThickness = 1;

                    MyCanvas.Children.Add(line2);

                    AddArrowHead(line2, Colors.Orange);
                }
                else
                {
                    // Ein Kraftvektor

                    (double nodeTop, double nodeLeft) = ProjectNode(node);

                    Line line = new Line();

                    line.X1 = nodeLeft - node.ForceX * scale;
                    line.Y1 = nodeTop + node.ForceY * scale;

                    line.X2 = nodeLeft;
                    line.Y2 = nodeTop;

                    line.Stroke = new SolidColorBrush(Colors.Orange);
                    line.StrokeThickness = 1;

                    MyCanvas.Children.Add(line);

                    AddArrowHead(line, Colors.Orange);
                }
            }

            // Schritt 6: Knoten zeichnen

            foreach (Node node in truss.Nodes)
            {
                (double nodeTop, double nodeLeft) = ProjectNode(node);

                Ellipse ellipse = new Ellipse();

                ellipse.Fill = new SolidColorBrush(Colors.Black);
                ellipse.Width = 20;
                ellipse.Height = 20;

                MyCanvas.Children.Add(ellipse);

                Canvas.SetTop(ellipse, nodeTop - ellipse.Height / 2);
                Canvas.SetLeft(ellipse, nodeLeft - ellipse.Width / 2);

                TextBlock text = new TextBlock();

                text.Text = node.Name;
                text.Foreground = new SolidColorBrush(Colors.White);

                (double textWidth, double textHeight) = Measure(text);

                MyCanvas.Children.Add(text);

                Canvas.SetTop(text, nodeTop - textHeight / 2);
                Canvas.SetLeft(text, nodeLeft - textWidth / 2);
            }
        }

        private (double top, double left) ProjectNode(Node node)
        {
            double nodeTop = actualTop + (imageMaxY - node.PositionY) * scale;
            double nodeLeft = actualLeft + (node.PositionX - imageMinX) * scale;

            return (nodeTop, nodeLeft);
        }

        private void AddArrowHead(Line line, Color color)
        {
            double deltaX = line.X2 - line.X1;
            double deltaY = line.Y2 - line.Y1;

            double normX = -deltaY;
            double normY = deltaX;

            Polygon polygon = new Polygon();

            polygon.Points.Add(new Point(line.X2, line.Y2));
            polygon.Points.Add(new Point(line.X2 - deltaX * 0.25 + normX * 0.125, line.Y2 - deltaY * 0.25 + normY * 0.125));
            polygon.Points.Add(new Point(line.X2 - deltaX * 0.25 - normX * 0.125, line.Y2 - deltaY * 0.25 - normY * 0.125));

            polygon.Fill = new SolidColorBrush(color);

            MyCanvas.Children.Add(polygon);
        }

        private (double width, double height) Measure(TextBlock block)
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

            return (formattedText.Width, formattedText.Height);
        }
    }
}