using DynamischWarteschlange.Model;
using System.Windows;

namespace DynamischWarteschlange
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Zufallszahlengenerator erzeugen
            var ran = new Random();

            // Simulationsobjekt erzeugen
            var sim = new Simulation(ran);

            // Ereignisse hinzufügen
            for (var i = 0; i < 30; i++)
            {
                sim.Add(new ArrivalEvent(ran.NextDouble() * 60 * 60));
            }

            // Simulationslauf durchführen
            sim.Run();

            // Wartezeithistogramm berechnen
            var wBin = 20;

            var wMin = sim.WaitTime.Min();
            var wMax = sim.WaitTime.Max();

            var wX = new double[wBin];
            var wY = new double[wBin];

            for (var bin = 0; bin < wBin; bin++)
            {
                wX[bin] = wMin + (bin + 0.5) * (wMax - wMin);
                wY[bin] = 0;
            }

            foreach (var w in sim.WaitTime)
            {
                var bin = (int)Math.Min(Math.Floor((w - wMin) / (wMax - wMin) * wBin), wBin - 1);

                wY[bin]++;
            }

            // Bearbeitungszeithistogramm berechnen
            var sBin = 20;

            var sMin = sim.ServiceTime.Min();
            var sMax = sim.ServiceTime.Max();

            var sX = new double[sBin];
            var sY = new double[sBin];

            for (var bin = 0; bin < sBin; bin++)
            {
                sX[bin] = sMin + (bin + 0.5) * (sMax - sMin);
                sY[bin] = 0;
            }

            foreach (var s in sim.ServiceTime)
            {
                var bin = (int)Math.Min(Math.Floor((s - sMin) / (sMax - sMin) * sBin), sBin - 1);

                sY[bin]++;
            }

            // Beschäftigungsverlauf visualisieren
            DiagramBusy.Plot.XLabel("Simulationszeit (in Sekunden)");
            DiagramBusy.Plot.YLabel("Beschäftigung");

            var b = DiagramBusy.Plot.Add.Scatter(sim.ChartTime, sim.ChartBusy);
            b.MarkerShape = ScottPlot.MarkerShape.None;

            // Warteschlangenverlauf visualisieren
            DiagramLength.Plot.XLabel("Simulationszeit (in Sekunden)");
            DiagramLength.Plot.YLabel("Warteschlange");

            var l = DiagramLength.Plot.Add.Scatter(sim.ChartTime, sim.ChartLength);
            l.MarkerShape = ScottPlot.MarkerShape.None;

            // Wartezeiten visualisieren
            DiagramWait.Plot.XLabel("Wartezeit (in Sekunden)");
            DiagramWait.Plot.YLabel("Häufigkeit");
            DiagramWait.Plot.Add.Scatter(wX, wY);

            // Servicezeiten visualisieren
            DiagramService.Plot.XLabel("Bearbeitungszeit (in Sekunden)");
            DiagramService.Plot.YLabel("Häufigkeit");
            DiagramService.Plot.Add.Scatter(sX, sY);
        }
    }
}