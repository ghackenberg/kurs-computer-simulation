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
using System.Windows.Threading;

namespace VorlageVisualisierung2D
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Zufallszahlengenerator anlegen
            var random = new Random();

            // Anzahl Datenpunkte definieren
            var count = 10;

            // Daten initialisieren
            var dataX = new double[count];
            var dataY = new double[count];

            for (var i = 0; i < count; i++)
            {
                dataX[i] = random.NextDouble();
                dataY[i] = random.NextDouble();
            }

            // Prozess für die Datenaktualisierung definieren und starten
            var dispatcher = new DispatcherTimer();
            dispatcher.Tick += (o, e) =>
            {
                for (var i = 0; i < count; i++)
                {
                    dataX[i] = random.NextDouble();
                    dataY[i] = random.NextDouble();
                }
                WpfPlot1.Refresh();
            };
            dispatcher.Interval = TimeSpan.FromSeconds(1);
            dispatcher.Start();

            // Chart initialisieren
            WpfPlot1.Plot.Add.Scatter(dataX, dataY);
            WpfPlot1.Refresh();
        }
    }
}