using DynamischWarteschlange.Model;
using System.Windows;

namespace DynamischWarteschlange
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            var ran = new Random();

            var sim = new Simulation();

            sim.Add(new ArrivalEvent(ran.NextDouble() * 60 * 60));
            sim.Add(new ArrivalEvent(ran.NextDouble() * 60 * 60));
            sim.Add(new ArrivalEvent(ran.NextDouble() * 60 * 60));
            sim.Add(new ArrivalEvent(ran.NextDouble() * 60 * 60));

            sim.Run();
        }
    }
}