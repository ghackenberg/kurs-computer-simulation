using IdealesFachwerk2D.Model;
using System.Windows;

namespace IdealesFachwerk2D
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            Truss truss = new Truss();

            Node nodeA = truss.AddNode("A", 100, 100, true, true, 0, 0);
            Node nodeB = truss.AddNode("B", 200, 200, false, false, -50, -100);
            Node nodeC = truss.AddNode("C", 300, 100, false, true, 0, 0);

            truss.AddRod(nodeA, nodeB);
            truss.AddRod(nodeA, nodeC);
            truss.AddRod(nodeB, nodeC);

            truss.Solve();

            Console.WriteLine("Test");

            // TODO: Ergebnisse der Berechnung visualisieren!
        }
    }
}