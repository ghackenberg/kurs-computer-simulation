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

            var a0 = -9.81; // in m/s²
            var v0 = 10; // in m/s
            var p0 = 1.5; // in m

            var dt = 0.2; // in s

            var t0 = 0; // in s
            var tmax = 2.5; // in s

            var steps = (int) ((tmax - t0) / dt) + 1;

            // Arrays initialisieren

            var dataT = new double[steps];

            var dataA = new double[steps];
            var dataV = new double[steps];
            var dataP = new double[steps];

            var dataVE = new double[steps];
            var dataPE = new double[steps];

            var dataVI = new double[steps];
            var dataPI = new double[steps];

            // Berechnung durchführen

            for (int i = 0; i < steps; i++)
            {
                var t = t0 + i * dt;

                dataT[i] = t;

                dataA[i] = a0;
                dataV[i] = v0 + a0 * t;
                dataP[i] = p0 + v0 * t + a0 * t * t / 2;

                if (i == 0)
                {
                    dataVE[i] = v0;
                    dataPE[i] = p0;

                    dataVI[i] = v0;
                    dataPI[i] = p0;
                }
                else
                {
                    dataVE[i] = dataVE[i - 1] + dataA[i - 1] * dt;
                    dataPE[i] = dataPE[i - 1] + dataVE[i - 1] * dt;

                    dataVI[i] = dataVI[i - 1] + dataA[i] * dt;
                    dataPI[i] = dataPI[i - 1] + dataVI[i] * dt;
                }
            }

            // Daten visualisieren

            var start = Visualization.Plot.Add.VerticalLine(0);
            start.LegendText = "Startzeitpunkt";

            var ground = Visualization.Plot.Add.HorizontalLine(0);
            ground.LegendText = "Boden";

            var a = Visualization.Plot.Add.Scatter(dataT, dataA);
            a.LegendText = "Beschleunigung (in m/s²)";
            a.LineColor = Color.FromHSL(0.25f, 1, 0.33f);
            a.MarkerColor = Color.FromHSL(0.25f, 1, 0.33f);

            var v = Visualization.Plot.Add.Scatter(dataT, dataV);
            v.LegendText = "Geschwindigkeit Analytisch (in m/s)";
            v.LineWidth = 5;
            v.LineColor = Color.FromHSL(0, 1, 0.25f);
            v.MarkerSize = 14;
            v.MarkerColor = Color.FromHSL(0, 1, 0.25f);

            var ve = Visualization.Plot.Add.Scatter(dataT, dataVE);
            ve.LegendText = "Geschwindigkeit Numerisch Euler Explizit (in m/s)";
            ve.LineWidth = 3;
            ve.LineColor = Color.FromHSL(0, 1, 0.5f);
            ve.MarkerSize = 10;
            ve.MarkerColor = Color.FromHSL(0, 1, 0.5f);

            var vi = Visualization.Plot.Add.Scatter(dataT, dataVI);
            vi.LegendText = "Geschwindigkeit Numerisch Euler Implizit (in m/s)";
            vi.LineWidth = 1;
            vi.LineColor = Color.FromHSL(0, 1, 0.75f);
            vi.MarkerSize = 5;
            vi.MarkerColor = Color.FromHSL(0, 1, 0.75f);

            var p = Visualization.Plot.Add.Scatter(dataT, dataP);
            p.LegendText = "Position Analytisch (in m)";
            p.LineColor = Color.FromHSL(0.75f, 1, 0.25f);
            p.MarkerColor = Color.FromHSL(0.75f, 1, 0.25f);

            var pe = Visualization.Plot.Add.Scatter(dataT, dataPE);
            pe.LegendText = "Position Numerisch Euler Explizit (in m)";
            pe.LineColor = Color.FromHSL(0.75f, 1, 0.5f);
            pe.MarkerColor = Color.FromHSL(0.75f, 1, 0.5f);

            var pi = Visualization.Plot.Add.Scatter(dataT, dataPI);
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