using Microsoft.Msagl.Drawing;
using ScottPlot.Plottables;
using SFunctionContinuous.Model;
using SFunctionContinuous.Model.Demonstations;
using SFunctionContinuous.Model.Functions;
using SFunctionContinuous.Model.Solutions;
using System.Windows;

namespace SFunctionContinuous
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Modell erstellen und lösen

            Demonstration demonstration = new SimpleLoopDemonstration();

            try
            {
                Solution solution = new EulerExplicitLoopSolution(demonstration.Composition);

                solution.Solve(1, 10);
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }

            // Graph-Visualisierung erstellen

            Graph graph = new Graph();

            foreach (Function f in demonstration.Composition.Functions)
            {
                graph.AddNode($"{f.GetHashCode()}").LabelText = f.ToString();
            }
            foreach (Connection c in demonstration.Composition.Connections)
            {
                graph.AddEdge($"{c.Source.GetHashCode()}", c.ToString(), $"{c.Target.GetHashCode()}");
            }

            Graph.Graph = graph;

            // Chart-Visualisierung erstellen

            foreach (Function f in demonstration.Composition.Functions)
            {
                if (f is RecordFunction)
                {
                    RecordFunction r = (RecordFunction)f;

                    double[] t = new double[r.Data.Count];
                    double[] u = new double[r.Data.Count];

                    for (int i = 0; i < r.Data.Count; i++)
                    {
                        (double ti, double tu) = r.Data[i];

                        t[i] = ti;
                        u[i] = tu;
                    }

                    Scatter scatter = Chart.Plot.Add.Scatter(t, u);

                    scatter.LegendText = f.Name;
                }
            }
        }
    }
}