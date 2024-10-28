using System.Windows;

namespace Ballwurf
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Konstanten festlegen

            var ay0 = -9.81; // in m/s²
            var vy0 = 10; // in m/s
            var py0 = 1.5; // in m

            var dt = 0.2; // in s

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

            Visualization.Plot.Add.Scatter(dataX, dataAY);
            Visualization.Plot.Add.Scatter(dataX, dataVY);
            Visualization.Plot.Add.Scatter(dataX, dataPY);
            
            Visualization.Plot.Add.Scatter(dataX, dataVYE);
            Visualization.Plot.Add.Scatter(dataX, dataPYE);

            Visualization.Plot.Add.Scatter(dataX, dataVYI);
            Visualization.Plot.Add.Scatter(dataX, dataPYI);

            Visualization.Refresh();
        }
    }
}