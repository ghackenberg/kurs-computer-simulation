using Microsoft.Msagl.Drawing;
using ScottPlot.Plottables;
using SFunctionHybrid.Framework;
using SFunctionHybrid.Framework.Blocks;
using SFunctionHybrid.Framework.Examples;
using SFunctionHybrid.Framework.Solvers;
using System.Windows;

namespace SFunctionHybrid
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

            Example example = new VariableZeroOrderHoldExample();

            try
            {
                Solver solution = new EulerImplicitSolver(example.Model);

                Title += $" - {example.GetType().Name} / {solution.GetType().Name}";

                solution.Solve(example.TimeStepMax, example.TimeMax);
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }

            // Graph-Visualisierung erstellen

            Graph graph = new Graph();

            foreach (Block f in example.Model.Blocks)
            {
                graph.AddNode($"{f.GetHashCode()}").LabelText = f.ToString();
            }
            foreach (Connection c in example.Model.Connections)
            {
                graph.AddEdge($"{c.Source.GetHashCode()}", c.ToString(), $"{c.Target.GetHashCode()}");
            }

            Graph.Graph = graph;

            // Chart-Visualisierung erstellen

            foreach (Block f in example.Model.Blocks)
            {
                if (f is RecordBlock)
                {
                    RecordBlock r = (RecordBlock)f;

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