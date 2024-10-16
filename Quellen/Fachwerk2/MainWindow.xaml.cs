using Fachwerk2.Model;
using System.Windows;

namespace Fachwerk2
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Modell erstellen

            var truss = new Truss();

            var a = truss.AddNode("a", 0, 0);
            var b = truss.AddNode("b", 2, 0);
            var c = truss.AddNode("c", 4, 0);
            var d = truss.AddNode("d", 1, 1);
            var e = truss.AddNode("e", 3, 1);

            truss.AddRod(a, b);
            truss.AddRod(b, c);
            truss.AddRod(d, e);
            truss.AddRod(a, d);
            truss.AddRod(b, d);
            truss.AddRod(b, e);
            truss.AddRod(c, e);

            truss.AddBearing(a, true, true);
            truss.AddBearing(c, false, true);

            truss.AddLoad(c, -1, 1);
            truss.AddLoad(e, -1, -1);

            // Modell lösen

            truss.Solve();

            // Daten visualisieren

            NodeDataGrid.ItemsSource = truss.Nodes;
            RodDataGrid.ItemsSource = truss.Rods;
            BearingDataGrid.ItemsSource = truss.Bearings;
            LoadDataGrid.ItemsSource = truss.Loads;

            // TODO: 2D-Visualisierung
        }
    }
}