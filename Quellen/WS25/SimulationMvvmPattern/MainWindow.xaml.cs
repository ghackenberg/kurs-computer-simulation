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
    /// Garantiert Zero-Allocation im 60-FPS-Timer durch persistente Pufferbindung.
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly MainViewModel _vm;
        private readonly DispatcherTimer _renderTimer = new();
        private readonly double[] _renderX = new double[2000];
        private readonly double[] _renderY = new double[2000];
        private readonly Scatter _scatterPlot;

        public MainWindow()
        {
            InitializeComponent();
            _vm = (MainViewModel)DataContext;

            // Plot-Layout konfigurieren (ScottPlot 5)
            TrajectoryPlot.Plot.Title("Masse-Feder-Dämpfer Trajektorie x(t)");
            TrajectoryPlot.Plot.XLabel("Zeit t [s]");
            TrajectoryPlot.Plot.YLabel("Auslenkung x [m]");

            // Feste Bindung der vorallokierten Puffer (Zero-Allocation-Rendering)
            _scatterPlot = TrajectoryPlot.Plot.Add.Scatter(_renderX, _renderY);
            _scatterPlot.LineWidth = 2;
            _scatterPlot.Color = new ScottPlot.Color(0, 90, 156); // FH OÖ Blau
            _scatterPlot.MarkerSize = 0;                          // Reine Kurvendarstellung
            _scatterPlot.IsVisible = false;

            // 60-FPS UI-Render-Timer (ca. 16 ms) zur entkoppelten Visualisierung
            _renderTimer.Interval = TimeSpan.FromMilliseconds(16);
            _renderTimer.Tick += OnTelemetryTick;
            _renderTimer.Start();
        }

        private void OnTelemetryTick(object? sender, EventArgs e)
        {
            // Atomarer Snapshot in vorallokierte Arrays ohne Heap-Allokation
            int count = _vm.Buffer.CopySnapshot(_renderX, _renderY);

            if (count == 0)
            {
                if (_scatterPlot.IsVisible)
                {
                    _scatterPlot.IsVisible = false;
                    TrajectoryPlot.Refresh();
                }
            }
            else
            {
                // Begrenze das Rendering strikt auf die tatsächlich gefüllten Punkte
                _scatterPlot.Data.MinRenderIndex = 0;
                _scatterPlot.Data.MaxRenderIndex = count - 1;
                _scatterPlot.IsVisible = true;

                TrajectoryPlot.Plot.Axes.AutoScale();
                TrajectoryPlot.Refresh();
            }
        }
    }
}

