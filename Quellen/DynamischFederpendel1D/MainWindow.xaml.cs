using ScottPlot;
using System.CodeDom;
using System.Windows;

namespace DynamischFederpendel1D
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Konstanten festlegen

            var k = 1;
            var m = 1;
            var w = Math.Sqrt(k / m);

            var p0 = 1; // in m
            var f0 = -k * p0; // in N
            var a0 = f0 / m; // in m/s²
            var v0 = 0; // in m/s

            var dt = 0.05; // in s

            var t0 = 0; // in s
            var tmax = 60; // in s

            var steps = (int)((tmax - t0) / dt) + 1;

            // Arrays initialisieren

            var dataT = new double[steps];

            var dataP = new double[steps];
            var dataF = new double[steps];
            var dataA = new double[steps];
            var dataV = new double[steps];

            var dataPE = new double[steps];
            var dataFE = new double[steps];
            var dataAE = new double[steps];
            var dataVE = new double[steps];

            var dataPI = new double[steps];
            var dataFI = new double[steps];
            var dataAI = new double[steps];
            var dataVI = new double[steps];

            // Berechnung durchführen

            for (int i = 0; i < steps; i++)
            {
                var t = t0 + i * dt;

                dataT[i] = t;

                // Analytisch lösen

                dataP[i] = Math.Cos(w * t);
                dataF[i] = -k * dataP[i];
                dataA[i] = dataF[i] / m;
                dataV[i] = -Math.Sin(w * t);

                // Numerisch lösen

                if (i == 0)
                {
                    // Startzustand - explizit

                    dataFE[i] = f0;
                    dataAE[i] = a0;
                    dataVE[i] = v0;
                    dataPE[i] = p0;

                    // Startzustand - implizit

                    dataFI[i] = f0;
                    dataAI[i] = a0;
                    dataVI[i] = v0;
                    dataPI[i] = p0;
                }
                else
                {
                    // Folgezustand - explizit

                    dataPE[i] = dataPE[i - 1] + dataVE[i - 1] * dt;
                    dataFE[i] = -k * dataPE[i];
                    dataAE[i] = dataFE[i] / m;
                    dataVE[i] = dataVE[i - 1] + dataAE[i - 1] * dt;

                    // Folgezustand - implizit

                    dataVI[i] = (dataVI[i - 1] - k * dt / m * dataPI[i - 1]) / (1 + k * dt * dt / m);
                    dataPI[i] = dataPI[i - 1] + dataVI[i] * dt;
                    dataFI[i] = -k * dataPI[i];
                    dataAI[i] = dataFI[i] / m;
                }
            }

            // Daten visualisieren

            VisualizationF.Plot.Add.VerticalLine(0);
            VisualizationF.Plot.Add.HorizontalLine(0);

            VisualizationA.Plot.Add.VerticalLine(0);
            VisualizationA.Plot.Add.HorizontalLine(0);

            VisualizationV.Plot.Add.VerticalLine(0);
            VisualizationV.Plot.Add.HorizontalLine(0);

            VisualizationP.Plot.Add.VerticalLine(0);
            VisualizationP.Plot.Add.HorizontalLine(0);

            // Kraft visualisieren

            var f = VisualizationF.Plot.Add.Scatter(dataT, dataF);
            f.LegendText = "Analytisch";
            f.LineWidth = 2;
            f.MarkerShape = MarkerShape.None;

            var fe = VisualizationF.Plot.Add.Scatter(dataT, dataFE);
            fe.LegendText = "Euler Explizit";
            fe.MarkerShape = MarkerShape.None;

            var fi = VisualizationF.Plot.Add.Scatter(dataT, dataFI);
            fi.LegendText = "Euler Implizit";
            fi.MarkerShape = MarkerShape.None;

            // Beschleunigung visualisieren

            var a = VisualizationA.Plot.Add.Scatter(dataT, dataA);
            a.LegendText = "Analytisch";
            a.LineWidth = 2;
            a.MarkerShape = MarkerShape.None;

            var ae = VisualizationA.Plot.Add.Scatter(dataT, dataAE);
            ae.LegendText = "Euler Explizit";
            ae.MarkerShape = MarkerShape.None;

            var ai = VisualizationA.Plot.Add.Scatter(dataT, dataAI);
            ai.LegendText = "Euler Implizit";
            ai.MarkerShape = MarkerShape.None;

            // Geschwindigkeit visualisieren

            var v = VisualizationV.Plot.Add.Scatter(dataT, dataV);
            v.LegendText = "Analytisch";
            v.LineWidth = 2;
            v.MarkerShape = MarkerShape.None;

            var ve = VisualizationV.Plot.Add.Scatter(dataT, dataVE);
            ve.LegendText = "Euler Explizit";
            ve.MarkerShape = MarkerShape.None;

            var vi = VisualizationV.Plot.Add.Scatter(dataT, dataVI);
            vi.LegendText = "Euler Implizit";
            vi.MarkerShape = MarkerShape.None;

            // Position visualisieren

            var p = VisualizationP.Plot.Add.Scatter(dataT, dataP);
            p.LegendText = "Analytisch";
            p.LineWidth = 2;
            p.MarkerShape = MarkerShape.None;

            var pe = VisualizationP.Plot.Add.Scatter(dataT, dataPE);
            pe.LegendText = "Euler Explizit";
            pe.MarkerShape = MarkerShape.None;

            var pi = VisualizationP.Plot.Add.Scatter(dataT, dataPI);
            pi.LegendText = "Euler Implizit";
            pi.MarkerShape = MarkerShape.None;

            // Visualisierung konfigurieren

            VisualizationF.Plot.YLabel("Federkraft (in N)");
            VisualizationF.Plot.XLabel("Zeit (in s)");
            VisualizationF.Plot.ShowLegend(Alignment.LowerCenter, Orientation.Horizontal);
            VisualizationF.Refresh();

            VisualizationA.Plot.YLabel("Beschleunigung (in m/s²)");
            VisualizationA.Plot.XLabel("Zeit (in s)");
            VisualizationA.Plot.ShowLegend(Alignment.LowerCenter, Orientation.Horizontal);
            VisualizationA.Refresh();

            VisualizationV.Plot.YLabel("Geschwindigkeit (in m/s)");
            VisualizationV.Plot.XLabel("Zeit (in s)");
            VisualizationV.Plot.ShowLegend(Alignment.LowerCenter, Orientation.Horizontal);
            VisualizationV.Refresh();

            VisualizationP.Plot.YLabel("Position (in m)");
            VisualizationP.Plot.XLabel("Zeit (in s)");
            VisualizationP.Plot.ShowLegend(Alignment.LowerCenter, Orientation.Horizontal);
            VisualizationP.Refresh();
        }
    }
}