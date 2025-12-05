using Microsoft.Msagl.Drawing;
using SimscapeSharp.Framework;
using SimscapeSharp.Framework.Examples;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace SimscapeSharp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            Component c = new SimpleElectricalCircuit();

            Graph graph = new Graph();

            foreach (var child in c.GetComponents())
            {
                graph.AddNode($"{child.GetHashCode()}").LabelText = child.Name;

                foreach (var node in child.GetNodes())
                {
                    graph.AddNode($"{node.GetHashCode()}").LabelText = node.Name;
                    graph.AddEdge($"{child.GetHashCode()}", $"{node.GetHashCode()}");
                }
            }

            foreach (var connection in c.Connections)
            {
                graph.AddEdge($"{connection.A.GetHashCode()}", $"{connection.B.GetHashCode()}");
            }

            Graph.Graph = graph;
        }
    }
}