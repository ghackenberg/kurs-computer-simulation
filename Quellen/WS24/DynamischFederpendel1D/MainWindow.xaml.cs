using OpenTK.Graphics.ES20;
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

            var dataPIN = new double[steps];
            var dataFIN = new double[steps];
            var dataAIN = new double[steps];
            var dataVIN = new double[steps];

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

                    // Startzustand - implizit + Newton

                    dataFIN[i] = f0;
                    dataAIN[i] = a0;
                    dataVIN[i] = v0;
                    dataPIN[i] = p0;
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

                    // Folgezustand - implizit + Newton

                    var count = 0;
                    var guess = 0.0;
                    var delta = 0.0;

                    do
                    {
                        dataVIN[i] = dataVIN[i - 1] + guess * dt;
                        dataPIN[i] = dataPIN[i - 1] + dataVIN[i] * dt;
                        dataFIN[i] = -k * dataPIN[i];
                        dataAIN[i] = dataFIN[i] / m;

                        delta = guess - dataAIN[i];

                        guess = dataAIN[i];

                        count++;
                    }
                    while (Math.Abs(delta) > 0.000001 && count < 1000);
                }
            }

            // Kraft visualisieren

            var f = VisualizationF.Plot.Add.Scatter(dataT, dataF);
            f.LegendText = "Analytisch";
            f.LineWidth = 3;
            f.MarkerShape = MarkerShape.None;

            var fe = VisualizationF.Plot.Add.Scatter(dataT, dataFE);
            fe.LegendText = "Explizit";
            fe.MarkerShape = MarkerShape.None;

            var fi = VisualizationF.Plot.Add.Scatter(dataT, dataFI);
            fi.LegendText = "Implizit";
            fi.MarkerShape = MarkerShape.None;

            var fin = VisualizationF.Plot.Add.Scatter(dataT, dataFIN);
            fin.LegendText = "Implizit + N";
            fin.MarkerShape = MarkerShape.None;

            // Beschleunigung visualisieren

            var a = VisualizationA.Plot.Add.Scatter(dataT, dataA);
            a.LegendText = "Analytisch";
            a.LineWidth = 3;
            a.MarkerShape = MarkerShape.None;

            var ae = VisualizationA.Plot.Add.Scatter(dataT, dataAE);
            ae.LegendText = "Explizit";
            ae.MarkerShape = MarkerShape.None;

            var ai = VisualizationA.Plot.Add.Scatter(dataT, dataAI);
            ai.LegendText = "Implizit";
            ai.MarkerShape = MarkerShape.None;

            var ain = VisualizationA.Plot.Add.Scatter(dataT, dataAIN);
            ain.LegendText = "Implizit + N";
            ain.MarkerShape = MarkerShape.None;

            // Geschwindigkeit visualisieren

            var v = VisualizationV.Plot.Add.Scatter(dataT, dataV);
            v.LegendText = "Analytisch";
            v.LineWidth = 3;
            v.MarkerShape = MarkerShape.None;

            var ve = VisualizationV.Plot.Add.Scatter(dataT, dataVE);
            ve.LegendText = "Explizit";
            ve.MarkerShape = MarkerShape.None;

            var vi = VisualizationV.Plot.Add.Scatter(dataT, dataVI);
            vi.LegendText = "Implizit";
            vi.MarkerShape = MarkerShape.None;

            var vin = VisualizationV.Plot.Add.Scatter(dataT, dataVIN);
            vin.LegendText = "Implizit + N";
            vin.MarkerShape = MarkerShape.None;

            // Position visualisieren

            var p = VisualizationP.Plot.Add.Scatter(dataT, dataP);
            p.LegendText = "Analytisch";
            p.LineWidth = 3;
            p.MarkerShape = MarkerShape.None;

            var pe = VisualizationP.Plot.Add.Scatter(dataT, dataPE);
            pe.LegendText = "Explizit";
            pe.MarkerShape = MarkerShape.None;

            var pi = VisualizationP.Plot.Add.Scatter(dataT, dataPI);
            pi.LegendText = "Implizit";
            pi.MarkerShape = MarkerShape.None;

            var pin = VisualizationP.Plot.Add.Scatter(dataT, dataPIN);
            pin.LegendText = "Implizit + N";
            pin.MarkerShape = MarkerShape.None;

            // Nulllinien visualisieren

            VisualizationF.Plot.Add.VerticalLine(0);
            VisualizationF.Plot.Add.HorizontalLine(0);

            VisualizationA.Plot.Add.VerticalLine(0);
            VisualizationA.Plot.Add.HorizontalLine(0);

            VisualizationV.Plot.Add.VerticalLine(0);
            VisualizationV.Plot.Add.HorizontalLine(0);

            VisualizationP.Plot.Add.VerticalLine(0);
            VisualizationP.Plot.Add.HorizontalLine(0);

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