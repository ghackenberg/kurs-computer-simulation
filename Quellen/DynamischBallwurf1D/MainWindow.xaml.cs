using ScottPlot;
using System.Windows;

namespace Ballwurf
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Konstanten festlegen

            var ay0 = -9.81; // in m/s²
            var vy0 = 10; // in m/s
            var py0 = 1.5; // in m

            var dt = 0.2; // in s

            var t0 = 0; // in s
            var tmax = 2.5; // in s

            var steps = (int) ((tmax - t0) / dt) + 1;

            // Arrays initialisieren

            var dataX = new double[steps];

            var dataAY = new double[steps];
            var dataVY = new double[steps];
            var dataPY = new double[steps];

            var dataVYE = new double[steps];
            var dataPYE = new double[steps];

            var dataVYI = new double[steps];
            var dataPYI = new double[steps];

            // Berechnung durchführen

            for (int i = 0; i < steps; i++)
            {
                var t = t0 + i * dt;

                dataX[i] = t;

                dataAY[i] = ay0;
                dataVY[i] = vy0 + ay0 * t;
                dataPY[i] = py0 + vy0 * t + ay0 * t * t / 2;

                if (i == 0)
                {
                    dataVYE[i] = vy0;
                    dataPYE[i] = py0;

                    dataVYI[i] = vy0;
                    dataPYI[i] = py0;
                }
                else
                {
                    dataVYE[i] = dataVYE[i - 1] + dataAY[i - 1] * dt;
                    dataPYE[i] = dataPYE[i - 1] + dataVYE[i - 1] * dt;

                    dataVYI[i] = dataVYI[i - 1] + dataAY[i] * dt;
                    dataPYI[i] = dataPYI[i - 1] + dataVYI[i] * dt;
                }
            }

            // Daten visualisieren

            var start = Visualization.Plot.Add.VerticalLine(0);
            start.LegendText = "Startzeitpunkt";

            var ground = Visualization.Plot.Add.HorizontalLine(0);
            ground.LegendText = "Boden";

            var a = Visualization.Plot.Add.Scatter(dataX, dataAY);
            a.LegendText = "Beschleunigung (in m/s²)";
            a.LineColor = Color.FromHSL(0.25f, 1, 0.33f);
            a.MarkerColor = Color.FromHSL(0.25f, 1, 0.33f);

            var v = Visualization.Plot.Add.Scatter(dataX, dataVY);
            v.LegendText = "Geschwindigkeit Analytisch (in m/s)";
            v.LineWidth = 5;
            v.LineColor = Color.FromHSL(0, 1, 0.25f);
            v.MarkerSize = 14;
            v.MarkerColor = Color.FromHSL(0, 1, 0.25f);

            var ve = Visualization.Plot.Add.Scatter(dataX, dataVYE);
            ve.LegendText = "Geschwindigkeit Numerisch Euler Explizit (in m/s)";
            ve.LineWidth = 3;
            ve.LineColor = Color.FromHSL(0, 1, 0.5f);
            ve.MarkerSize = 10;
            ve.MarkerColor = Color.FromHSL(0, 1, 0.5f);

            var vi = Visualization.Plot.Add.Scatter(dataX, dataVYI);
            vi.LegendText = "Geschwindigkeit Numerisch Euler Implizit (in m/s)";
            vi.LineWidth = 1;
            vi.LineColor = Color.FromHSL(0, 1, 0.75f);
            vi.MarkerSize = 5;
            vi.MarkerColor = Color.FromHSL(0, 1, 0.75f);

            var p = Visualization.Plot.Add.Scatter(dataX, dataPY);
            p.LegendText = "Position Analytisch (in m)";
            p.LineColor = Color.FromHSL(0.75f, 1, 0.25f);
            p.MarkerColor = Color.FromHSL(0.75f, 1, 0.25f);

            var pe = Visualization.Plot.Add.Scatter(dataX, dataPYE);
            pe.LegendText = "Position Numerisch Euler Explizit (in m)";
            pe.LineColor = Color.FromHSL(0.75f, 1, 0.5f);
            pe.MarkerColor = Color.FromHSL(0.75f, 1, 0.5f);

            var pi = Visualization.Plot.Add.Scatter(dataX, dataPYI);
            pi.LegendText = "Position Numerisch Euler Implizit (in m)";
            pi.LineColor = Color.FromHSL(0.75f, 1, 0.75f);
            pi.MarkerColor = Color.FromHSL(0.75f, 1, 0.75f);

            Visualization.Plot.XLabel("Zeit (in s)");

            Visualization.Plot.ShowLegend(Edge.Right);
            Visualization.Plot.Legend.Alignment = Alignment.LowerLeft;

            Visualization.Refresh();
        }
    }
}