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

namespace SchieferWurf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Konstanten festlegen

            var ay0 = -9.81; // in m/s²
            var vy0 = 10; // in m/s
            var py0 = 1.5; // in m

            var dt = 0.01; // in s

            var t0 = 0; // in s
            var tmax = 2.3; // in s

            var steps = (int) ((tmax - t0) / dt) + 1;

            // Arrays initialisieren

            var dataX = new double[steps];

            var dataAY = new double[steps];
            var dataVY = new double[steps];
            var dataPY = new double[steps];

            var dataVYE = new double[steps];
            var dataPYE = new double[steps];

            var dataVYI = new double[steps];
            var dataPYI = new double[steps];

            // Berechnung durchführen

            for (int i = 0; i < steps; i++)
            {
                var t = t0 + i * dt;

                dataX[i] = t;

                dataAY[i] = ay0;
                dataVY[i] = vy0 + ay0 * t;
                dataPY[i] = py0 + vy0 * t + ay0 * t * t / 2;

                if (i == 0)
                {
                    dataVYE[i] = vy0;
                    dataPYE[i] = py0;

                    dataVYI[i] = vy0;
                    dataPYI[i] = py0;
                }
                else
                {
                    dataVYE[i] = dataVYE[i - 1] + dataAY[i - 1] * dt;
                    dataPYE[i] = dataPYE[i - 1] + dataVYE[i - 1] * dt;

                    dataVYI[i] = dataVYI[i - 1] + dataAY[i] * dt;
                    dataPYI[i] = dataPYI[i - 1] + dataVYI[i] * dt;
                }
            }

            // Daten visualisieren

            WpfPlot1.Plot.Add.Scatter(dataX, dataAY);
            WpfPlot1.Plot.Add.Scatter(dataX, dataVY);
            WpfPlot1.Plot.Add.Scatter(dataX, dataPY);
            
            WpfPlot1.Plot.Add.Scatter(dataX, dataVYE);
            WpfPlot1.Plot.Add.Scatter(dataX, dataPYE);

            WpfPlot1.Plot.Add.Scatter(dataX, dataVYI);
            WpfPlot1.Plot.Add.Scatter(dataX, dataPYI);

            WpfPlot1.Refresh();
        }
    }
}