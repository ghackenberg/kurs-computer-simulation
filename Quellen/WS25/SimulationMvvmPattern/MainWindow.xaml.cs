using System;
using System.Windows;
using System.Windows.Threading;
using ScottPlot.Plottables;
using SimulationMvvmPattern.ViewModel;

namespace SimulationMvvmPattern
{
    /// <summary>
    /// Code-Behind für die MainWindow View.
    /// Kapselt ausschließlich View-spezifische Rendering-Logik für ScottPlot 5.
    /// Keine Domänen- oder Simulationsberechnung im Code-Behind (strikte MVVM-Trennung).
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly MainViewModel _vm;
        private readonly DispatcherTimer _renderTimer = new();
        private readonly double[] _renderX = new double[2000];
        private readonly double[] _renderY = new double[2000];
        private Scatter? _scatterPlot;

        public MainWindow()
        {
            InitializeComponent();
            _vm = (MainViewModel)DataContext;

            // Plot-Layout konfigurieren (ScottPlot 5)
            TrajectoryPlot.Plot.Title("Masse-Feder-Dämpfer Trajektorie x(t)");
            TrajectoryPlot.Plot.XLabel("Zeit t [s]");
            TrajectoryPlot.Plot.YLabel("Auslenkung x [m]");

            // 60-FPS UI-Render-Timer (ca. 16 ms) zur entkoppelten Visualisierung
            _renderTimer.Interval = TimeSpan.FromMilliseconds(16);
            _renderTimer.Tick += OnRenderTick;
            _renderTimer.Start();
        }

        private void OnRenderTick(object? sender, EventArgs e)
        {
            if (_vm.Buffer.Count == 0)
            {
                if (_scatterPlot != null)
                {
                    TrajectoryPlot.Plot.Clear();
                    _scatterPlot = null;
                    TrajectoryPlot.Plot.Title("Masse-Feder-Dämpfer Trajektorie x(t)");
                    TrajectoryPlot.Plot.XLabel("Zeit t [s]");
                    TrajectoryPlot.Plot.YLabel("Auslenkung x [m]");
                    TrajectoryPlot.Refresh();
                }
                return;
            }

            int count = _vm.Buffer.CopySnapshot(_renderX, _renderY);
            if (count > 1)
            {
                double[] xs = _renderX.AsSpan(0, count).ToArray();
                double[] ys = _renderY.AsSpan(0, count).ToArray();

                TrajectoryPlot.Plot.Clear();
                _scatterPlot = TrajectoryPlot.Plot.Add.Scatter(xs, ys);
                _scatterPlot.LineWidth = 2;
                _scatterPlot.Color = new ScottPlot.Color(0, 90, 156); // FH OÖ Blau
                TrajectoryPlot.Plot.Axes.AutoScale();
                TrajectoryPlot.Refresh();
            }
        }
    }
}
