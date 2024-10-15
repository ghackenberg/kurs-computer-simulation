using Fachwerk.Examples;
using System.Globalization;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace Fachwerk
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Modell erzeugen

            //var model = ExampleA.Make();
            var model = ExampleB.Make();

            // Stab- und Lagerkräfte berechnen

            model.Solve();

            // Tabellen mit Daten befüllen

            NodeDataGrid.ItemsSource = model.Nodes;
            RodDataGrid.ItemsSource = model.Rods;
            BearingDataGrid.ItemsSource = model.Bearings;
            ExternalForceDataGrid.ItemsSource = model.ExternalForces;

            // 2D-Visualisierung des Modells generieren

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

            // Stäbe zeichnen

            foreach (var rod in model.Rods)
            {
                var p = (rod.Force - minForce) / forceRange;

                var red = (1 - p) * 128 + 127;
                var green = rod.Force < 0 ? (1 - rod.Force / minForce) * 128 + 127 : (1 - rod.Force / maxForce) * 128 + 127;
                var blue = p * 128 + 127;

                var color = Color.FromRgb((byte) red, (byte) green, (byte) blue);
                var brush = new SolidColorBrush(color);

                var cx = (rod.NodeA.X + rod.NodeB.X) / 2;
                var cy = (rod.NodeA.Y + rod.NodeB.Y) / 2;

                // Linie (farbig)

                var line = new Line();

                line.Stroke = brush;
                line.StrokeThickness = 2;
                
                line.X1 = pad + rod.NodeA.X;
                line.Y1 = height - pad - rod.NodeA.Y;

                line.X2 = pad + rod.NodeB.X;
                line.Y2 = height - pad - rod.NodeB.Y;

                DrawCanvas.Children.Add(line);

                // Beschriftung (schwarz)

                var text = new TextBlock();

                text.Text = String.Format("{0:0.00}", rod.Force);
                text.FontSize = 2;

                var size = MeasureString(text);

                text.SetValue(Canvas.LeftProperty, pad + cx - size.Width / 2);
                text.SetValue(Canvas.TopProperty, height - pad - cy - size.Height / 2);

                DrawCanvas.Children.Add(text);
            }

            // Knoten zeichnen

            foreach (var node in model.Nodes)
            {
                // Kreis (schwarz)

                var circle = new Ellipse();

                circle.Fill = Brushes.Black;

                circle.Width = 4;
                circle.Height = 4;

                circle.SetValue(Canvas.LeftProperty, pad + node.X - 2);
                circle.SetValue(Canvas.TopProperty, height - pad - node.Y - 2);

                DrawCanvas.Children.Add(circle);

                // Beschriftung (weiß)

                var text = new TextBlock();

                text.Text = node.Name;
                text.Foreground = Brushes.White;
                text.FontSize = 2;

                var size = MeasureString(text);

                text.SetValue(Canvas.LeftProperty, pad + node.X - size.Width / 2);
                text.SetValue(Canvas.TopProperty, height - pad - node.Y - size.Height / 2);

                DrawCanvas.Children.Add(text);
            }

            // TODO Lager zeichnen

            // TODO Externe Kräfte zeichnen
        }

        static Size MeasureString(TextBlock block)
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
    }
}