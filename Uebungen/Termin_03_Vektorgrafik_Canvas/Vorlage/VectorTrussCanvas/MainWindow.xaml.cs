using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Shapes;
using VectorTrussCanvas.Geometry;
using VectorTrussCanvas.Models;

namespace VectorTrussCanvas;

public partial class MainWindow : Window
{
    private TrussGeometry _truss;
    private readonly Transform2D _transform = new();
    private TrussNode? _draggedNode = null;

    public MainWindow()
    {
        InitializeComponent();
        _truss = TrussGeometry.CreateSprintTriangle();
    }

    private void Redraw()
    {
        if (TrussCanvas == null || TrussCanvas.ActualWidth < 10 || TrussCanvas.ActualHeight < 10)
            return;

        TrussCanvas.Children.Clear();

        // 1. Transformationsmatrix aus Bounding Box und Canvas-Größe aktualisieren
        var (xMin, xMax, yMin, yMax) = _truss.GetBounds();
        _transform.MarginX = 70.0;
        _transform.MarginY = 70.0;
        _transform.Update(xMin, xMax, yMin, yMax, TrussCanvas.ActualWidth, TrussCanvas.ActualHeight);

        // 2. Stäbe zeichnen (Lines)
        foreach (var bar in _truss.Bars)
        {
            var nodeA = _truss.Nodes.FirstOrDefault(n => n.Id == bar.NodeAId);
            var nodeB = _truss.Nodes.FirstOrDefault(n => n.Id == bar.NodeBId);
            if (nodeA == null || nodeB == null) continue;

            Point pA = _transform.WorldToScreen(nodeA.X, nodeA.Y);
            Point pB = _transform.WorldToScreen(nodeB.X, nodeB.Y);

            var line = new Line
            {
                X1 = pA.X, Y1 = pA.Y,
                X2 = pB.X, Y2 = pB.Y,
                Stroke = new SolidColorBrush(Color.FromRgb(220, 220, 220)),
                StrokeThickness = 3.0
            };
            TrussCanvas.Children.Add(line);
        }

        // 3. Auflager zeichnen
        foreach (var node in _truss.Nodes)
        {
            Point pos = _transform.WorldToScreen(node.X, node.Y);

            if (node.IsFixedSupport)
            {
                // Festlager: Dreieckssymbol unter dem Knoten
                DrawSupportSymbol(pos, isFixed: true);
            }
            else if (node.IsRollerSupport)
            {
                // Loselager: Dreieckssymbol mit Rollenlinie
                DrawSupportSymbol(pos, isFixed: false);
            }
        }

        // 4. Knoten zeichnen (Kreise & Text-Labels)
        foreach (var node in _truss.Nodes)
        {
            Point pos = _transform.WorldToScreen(node.X, node.Y);
            double radius = 7.0;

            var ellipse = new Ellipse
            {
                Width = radius * 2,
                Height = radius * 2,
                Fill = new SolidColorBrush(Color.FromRgb(0, 210, 255)),
                Stroke = Brushes.White,
                StrokeThickness = 1.5,
                Tag = node // Für Hit-Testing merken
            };
            Canvas.SetLeft(ellipse, pos.X - radius);
            Canvas.SetTop(ellipse, pos.Y - radius);
            TrussCanvas.Children.Add(ellipse);

            // Knotenlabel
            var label = new TextBlock
            {
                Text = $"{node.Name} ({node.X:F1}; {node.Y:F1})",
                Foreground = Brushes.LightGreen,
                FontSize = 10,
                FontWeight = FontWeights.SemiBold
            };
            Canvas.SetLeft(label, pos.X + 10);
            Canvas.SetTop(label, pos.Y - 14);
            TrussCanvas.Children.Add(label);
        }

        // 5. Externe Lastpfeile zeichnen
        foreach (var load in _truss.Loads)
        {
            var node = _truss.Nodes.FirstOrDefault(n => n.Id == load.NodeId);
            if (node == null) continue;

            Point pos = _transform.WorldToScreen(node.X, node.Y);
            VectorArrow.AddForceArrow(TrussCanvas, pos, load.Fx, load.Fy, lengthPx: 60.0);
        }

        // 6. DIN 406 Bemaßungskette für die Gesamtlänge
        var leftNode = _truss.Nodes.OrderBy(n => n.X).First();
        var rightNode = _truss.Nodes.OrderByDescending(n => n.X).First();
        Point pLeft = _transform.WorldToScreen(leftNode.X, 0.0);
        Point pRight = _transform.WorldToScreen(rightNode.X, 0.0);
        double dimY = Math.Max(pLeft.Y, pRight.Y) + 35.0;
        double totalLength = rightNode.X - leftNode.X;

        VectorArrow.AddHorizontalDimensionLine(
            TrussCanvas, pLeft, pRight, dimY, 
            $"{totalLength:F2} m");

        // =====================================================================
        // TODO: [Stufe A Sprint]
        // - Untersuchen Sie die Erhaltung des Seitenverhältnisses bei Fenster-Resizing.
        // - Verifizieren Sie die Dreieckskoordinaten K1=(0,0), K2=(4,0), K3=(2,2).
        // =====================================================================

        // =====================================================================
        // TODO: [Stufe B Track A: 2D-CAD Fachwerkträger-Viewer]
        // - Ergänzen Sie Teilbemaßungen zwischen allen benachbarten Untergurtknoten.
        // - Fügen Sie eine vertikale DIN-Bemaßungskette für die Trägerhöhe links ein.
        // - Kopplung vorbereiten für FEM-Statik in Termin 07.
        // =====================================================================
    }

    private void DrawSupportSymbol(Point pos, bool isFixed)
    {
        double h = 18.0;
        double w = 14.0;

        // Dreieck
        var triangle = new Polygon
        {
            Points = new PointCollection
            {
                pos,
                new Point(pos.X - w / 2, pos.Y + h),
                new Point(pos.X + w / 2, pos.Y + h)
            },
            Stroke = Brushes.Orange,
            Fill = new SolidColorBrush(Color.FromArgb(80, 255, 165, 0)),
            StrokeThickness = 1.5
        };
        TrussCanvas.Children.Add(triangle);

        if (!isFixed)
        {
            // Loselager: Rollenlinie
            var rollerLine = new Line
            {
                X1 = pos.X - w / 2 - 2, Y1 = pos.Y + h + 3,
                X2 = pos.X + w / 2 + 2, Y2 = pos.Y + h + 3,
                Stroke = Brushes.Orange,
                StrokeThickness = 1.5
            };
            TrussCanvas.Children.Add(rollerLine);
        }
    }

    private void TrussCanvas_SizeChanged(object sender, SizeChangedEventArgs e)
    {
        Redraw();
    }

    private void TrussCanvas_MouseDown(object sender, MouseButtonEventArgs e)
    {
        if (e.LeftButton != MouseButtonState.Pressed) return;

        Point mousePos = e.GetPosition(TrussCanvas);

        // Nächsten Knoten im Umkreis von 20 Pixeln finden
        _draggedNode = _truss.Nodes.FirstOrDefault(n =>
        {
            Point pScreen = _transform.WorldToScreen(n.X, n.Y);
            double dist = (mousePos - pScreen).Length;
            return dist <= 20.0;
        });

        if (_draggedNode != null)
        {
            TrussCanvas.CaptureMouse();
            TxtInfo.Text = $"Ziehe Knoten {_draggedNode.Name}...";
        }
    }

    private void TrussCanvas_MouseMove(object sender, MouseEventArgs e)
    {
        if (_draggedNode == null) return;

        Point mousePos = e.GetPosition(TrussCanvas);
        var (worldX, worldY) = _transform.ScreenToWorld(mousePos.X, mousePos.Y);

        _draggedNode.X = Math.Round(worldX, 2);
        _draggedNode.Y = Math.Round(worldY, 2);

        TxtInfo.Text = $"Knoten {_draggedNode.Name}: X = {_draggedNode.X:F2} m | Y = {_draggedNode.Y:F2} m";
        Redraw();
    }

    private void TrussCanvas_MouseUp(object sender, MouseButtonEventArgs e)
    {
        if (_draggedNode != null)
        {
            _draggedNode = null;
            TrussCanvas.ReleaseMouseCapture();
            TxtInfo.Text = "Knoten platziert. Auto-Fit aktiv.";
            Redraw();
        }
    }

    private void CmbModelSelection_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (CmbModelSelection == null) return;

        _truss = CmbModelSelection.SelectedIndex == 1 
            ? TrussGeometry.CreateIndustrialPrattTruss() 
            : TrussGeometry.CreateSprintTriangle();

        Redraw();
    }

    private void BtnReset_Click(object sender, RoutedEventArgs e)
    {
        _truss = CmbModelSelection.SelectedIndex == 1 
            ? TrussGeometry.CreateIndustrialPrattTruss() 
            : TrussGeometry.CreateSprintTriangle();

        TxtInfo.Text = "Modell zurückgesetzt.";
        Redraw();
    }
}
