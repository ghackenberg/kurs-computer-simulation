using System;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;
using TrussFemSolver.Fem;

namespace TrussFemSolver
{
    public partial class MainWindow : Window
    {
        private GlobalStiffnessMatrix? _currentModel;
        private FemSolution? _currentSolution;

        public MainWindow()
        {
            InitializeComponent();
            Loaded += (s, e) => RunSimulation();
        }

        private void RunSimulation()
        {
            double loadKn = LoadSlider.Value;
            double loadN = loadKn * 1000.0;

            int selectedIndex = ModelSelector?.SelectedIndex ?? 0;
            if (selectedIndex == 0)
            {
                // Stufe A: Standard 3-Knoten-Dreiecksträger
                _currentModel = CholeskySolver.CreateSprintModel(loadFy: loadN);
            }
            else if (selectedIndex == 1)
            {
                // TODO [Track A - Industrie]: Portalkran mit Wanderlast
                // Implementieren Sie hier die Fachwerktopologie des Krans
                _currentModel = CholeskySolver.CreateSprintModel(loadFy: loadN);
            }
            else
            {
                // TODO [Track B - Simulation Game]: Bridge Constructor Fachwerk
                // Implementieren Sie hier eine Brückengeometrie mit mehreren Feldern
                _currentModel = CholeskySolver.CreateSprintModel(loadFy: loadN);
            }

            try
            {
                _currentSolution = CholeskySolver.Solve(_currentModel);
                UpdateTelemetry();
                RenderCanvas();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Fehler bei der FEM-Berechnung: {ex.Message}", "FEM Fehler", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void UpdateTelemetry()
        {
            if (_currentSolution == null || _currentModel == null) return;

            // Maximale Verschiebung
            double maxDisp = _currentSolution.Displacements.Select(Math.Abs).Max();
            DispStatus.Text = $"Max. Verschiebung: {maxDisp * 1000.0:F3} mm";

            // Auflagerkräfte
            var reacY = _currentSolution.ReactionForces.Where(kv => kv.Key % 2 == 1).Select(kv => kv.Value).ToList();
            if (reacY.Count >= 2)
            {
                ReactionStatus.Text = $"F_y1: {reacY[0] / 1000.0:F2} kN | F_y2: {reacY[1] / 1000.0:F2} kN";
            }
            else
            {
                ReactionStatus.Text = $"Auflager: {reacY.Count} Vertikalkräfte";
            }

            // Max. Spannung
            if (_currentSolution.ElementStresses.Count > 0)
            {
                double maxStress = _currentSolution.ElementStresses.Values.Select(Math.Abs).Max();
                StressStatus.Text = $"Max. |sigma|: {maxStress / 1e6:F2} MPa";
            }

            // Gleichgewicht
            if (_currentSolution.IsEquilibriumSatisfied)
            {
                EquilibriumStatus.Text = $"Gleichgewicht OK (Err < 1e-8 N)";
                EquilibriumStatus.Foreground = Brushes.ForestGreen;
            }
            else
            {
                EquilibriumStatus.Text = $"Ungleichgewicht: dFx={_currentSolution.SumFx:E2}, dFy={_currentSolution.SumFy:E2}";
                EquilibriumStatus.Foreground = Brushes.Red;
            }
        }

        private void RenderCanvas()
        {
            if (_currentModel == null || _currentSolution == null) return;
            TrussCanvas.Children.Clear();

            double width = TrussCanvas.ActualWidth;
            double height = TrussCanvas.ActualHeight;
            if (width < 10 || height < 10) return;

            // Bounding Box der Geometrie ermitteln
            double minX = _currentModel.Nodes.Min(n => n.X);
            double maxX = _currentModel.Nodes.Max(n => n.X);
            double minY = _currentModel.Nodes.Min(n => n.Y);
            double maxY = _currentModel.Nodes.Max(n => n.Y);

            double spanX = Math.Max(maxX - minX, 1.0);
            double spanY = Math.Max(maxY - minY, 1.0);

            double padding = 80.0;
            double scaleX = (width - 2 * padding) / spanX;
            double scaleY = (height - 2 * padding) / spanY;
            double scale = Math.Min(scaleX, scaleY);

            // Koordinatentransformation: Physik (x, y) -> Canvas (ScreenX, ScreenY)
            Point ToScreen(double px, double py)
            {
                double sx = padding + (px - minX) * scale + (width - 2 * padding - spanX * scale) / 2.0;
                double sy = height - (padding + (py - minY) * scale + (height - 2 * padding - spanY * scale) / 2.0);
                return new Point(sx, sy);
            }

            double deformScale = DeformScaleSlider.Value;

            // 1. Unverformtes System (grau gestrichelt)
            foreach (var elem in _currentModel.Elements)
            {
                var p1 = ToScreen(elem.Node1.X, elem.Node1.Y);
                var p2 = ToScreen(elem.Node2.X, elem.Node2.Y);

                var undeformedLine = new Line
                {
                    X1 = p1.X, Y1 = p1.Y,
                    X2 = p2.X, Y2 = p2.Y,
                    Stroke = Brushes.LightGray,
                    StrokeThickness = 2,
                    StrokeDashArray = new DoubleCollection { 4, 3 }
                };
                TrussCanvas.Children.Add(undeformedLine);
            }

            // 2. Verformtes System (farbige Stäbe: Blau = Zug, Rot = Druck)
            foreach (var elem in _currentModel.Elements)
            {
                double ux1 = _currentSolution.Displacements[elem.Node1.DofX] * deformScale;
                double uy1 = _currentSolution.Displacements[elem.Node1.DofY] * deformScale;
                double ux2 = _currentSolution.Displacements[elem.Node2.DofX] * deformScale;
                double uy2 = _currentSolution.Displacements[elem.Node2.DofY] * deformScale;

                var p1 = ToScreen(elem.Node1.X + ux1, elem.Node1.Y + uy1);
                var p2 = ToScreen(elem.Node2.X + ux2, elem.Node2.Y + uy2);

                double force = _currentSolution.ElementForces.GetValueOrDefault(elem.Id, 0.0);
                Brush color = force >= 0.0 ? Brushes.SteelBlue : Brushes.Crimson;

                var deformedLine = new Line
                {
                    X1 = p1.X, Y1 = p1.Y,
                    X2 = p2.X, Y2 = p2.Y,
                    Stroke = color,
                    StrokeThickness = 4
                };
                TrussCanvas.Children.Add(deformedLine);

                // Kraftbeschriftung in Stabmitte
                var mid = new Point((p1.X + p2.X) / 2.0, (p1.Y + p2.Y) / 2.0);
                var text = new TextBlock
                {
                    Text = $"S{elem.Id}: {force / 1000.0:F1} kN",
                    FontSize = 11,
                    FontWeight = FontWeights.Bold,
                    Foreground = color,
                    Background = new SolidColorBrush(Color.FromArgb(180, 255, 255, 255))
                };
                Canvas.SetLeft(text, mid.X - 25);
                Canvas.SetTop(text, mid.Y - 15);
                TrussCanvas.Children.Add(text);
            }

            // 3. Knoten einzeichnen
            foreach (var node in _currentModel.Nodes)
            {
                double ux = _currentSolution.Displacements[node.DofX] * deformScale;
                double uy = _currentSolution.Displacements[node.DofY] * deformScale;
                var p = ToScreen(node.X + ux, node.Y + uy);

                var circle = new Ellipse
                {
                    Width = 12,
                    Height = 12,
                    Fill = Brushes.DarkSlateGray,
                    Stroke = Brushes.White,
                    StrokeThickness = 2
                };
                Canvas.SetLeft(circle, p.X - 6);
                Canvas.SetTop(circle, p.Y - 6);
                TrussCanvas.Children.Add(circle);

                var nodeLabel = new TextBlock
                {
                    Text = $"K{node.Id + 1}",
                    FontSize = 10,
                    FontWeight = FontWeights.SemiBold,
                    Foreground = Brushes.Black
                };
                Canvas.SetLeft(nodeLabel, p.X + 8);
                Canvas.SetTop(nodeLabel, p.Y - 15);
                TrussCanvas.Children.Add(nodeLabel);
            }
        }

        private void LoadSlider_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            if (LoadText != null)
            {
                LoadText.Text = $"{LoadSlider.Value:F1} kN";
            }
            if (IsLoaded) RunSimulation();
        }

        private void DeformScaleSlider_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            if (ScaleText != null)
            {
                ScaleText.Text = $"{(int)DeformScaleSlider.Value}x";
            }
            if (IsLoaded) RenderCanvas();
        }

        private void ModelSelector_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (IsLoaded) RunSimulation();
        }

        private void Recalculate_Click(object sender, RoutedEventArgs e)
        {
            RunSimulation();
        }

        private void TrussCanvas_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            RenderCanvas();
        }
    }
}
