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
            for (var i = 0; i < 20; i++)
            {
                sim.Add(new ArrivalEvent(ran.NextDouble() * 60 * 60));
            }

            // Simulationslauf durchführen
            sim.Run();

            DiagramBusy.Plot.XLabel("Zeit (in Sekunden)");
            DiagramBusy.Plot.YLabel("Beschäftigung");

            var b = DiagramBusy.Plot.Add.Scatter(sim.ChartTime, sim.ChartBusy);
            b.MarkerShape = ScottPlot.MarkerShape.None;

            DiagramLength.Plot.XLabel("Zeit (in Sekunden)");
            DiagramLength.Plot.YLabel("Länge der Warteschlange");

            var l = DiagramLength.Plot.Add.Scatter(sim.ChartTime, sim.ChartLength);
            l.MarkerShape = ScottPlot.MarkerShape.None;
        }
    }
}