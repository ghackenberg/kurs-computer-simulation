using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using SFunctionSimulation.Models;
using SFunctionSimulation.Solvers;
using ScottPlot;

namespace SFunctionSimulation
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Loaded += (s, e) => RunSimulation();
        }

        private void StartSimulation_Click(object sender, RoutedEventArgs e)
        {
            RunSimulation();
        }

        private void RunSimulation()
        {
            if (!double.TryParse(TargetAngleBox.Text, out double wTarget)) wTarget = 10.0;
            if (!double.TryParse(LoadTorqueBox.Text, out double mDisturbance)) mDisturbance = 2.5;
            bool antiWindup = AntiWindupCheck.IsChecked ?? true;

            var motor = new DCMotorWithAntiWindup
            {
                AntiWindupEnabled = antiWindup
            };

            // Simulationsparameter
            double dt = 0.0005; // 0.5 ms
            double tEnd = 4.0;  // 4 s
            int steps = (int)(tEnd / dt);

            var timeList = new List<double>(steps);
            var wList = new List<double>(steps);
            var thetaList = new List<double>(steps);
            var uAList = new List<double>(steps);
            var uRawList = new List<double>(steps);
            var xiList = new List<double>(steps);

            // Anfangszustand [iA, omega, theta, xi]
            double[] x = new double[4];
            double[] u = new double[2];

            for (int k = 0; k < steps; k++)
            {
                double t = k * dt;

                // Sollwert
                u[0] = wTarget;

                // Störlastmoment zwischen 1.5s und 2.3s
                if (t >= 1.5 && t <= 2.3)
                {
                    u[1] = mDisturbance;
                }
                else
                {
                    u[1] = 0.0;
                }

                var y = motor.ComputeOutputs(t, x, u);

                timeList.Add(t);
                wList.Add(wTarget);
                thetaList.Add(y[0]);
                uAList.Add(y[3]);
                uRawList.Add(y[4]);
                xiList.Add(y[5]);

                // RK4 Integrationsschritt
                x = RungeKutta4Solver.Step(motor, t, x, u, dt);
            }

            // Auswertung nach Lastwegfall (t >= 2.3s)
            double maxThetaAfterLoad = 0.0;
            for (int i = 0; i < timeList.Count; i++)
            {
                if (timeList[i] >= 2.3 && thetaList[i] > maxThetaAfterLoad)
                {
                    maxThetaAfterLoad = thetaList[i];
                }
            }

            double overshoot = Math.Max(0.0, (maxThetaAfterLoad - wTarget) / wTarget * 100.0);
            double maxXi = xiList.Select(Math.Abs).Max();

            OvershootText.Text = $"Überschwingen (nach Last): {overshoot:F1} %";
            MaxXiText.Text = $"Max. |x_i|: {maxXi:F2}";
            StatusNote.Text = antiWindup ? "Anti-Windup aktiv (Clamping)" : "Ohne Anti-Windup (Windup aktiv!)";
            StatusNote.Foreground = antiWindup ? System.Windows.Media.Brushes.ForestGreen : System.Windows.Media.Brushes.Crimson;

            // ScottPlot 5 Visualisierung
            UpdatePlots(timeList.ToArray(), wList.ToArray(), thetaList.ToArray(), uAList.ToArray(), uRawList.ToArray(), xiList.ToArray());
        }

        private void UpdatePlots(double[] t, double[] w, double[] theta, double[] uA, double[] uRaw, double[] xi)
        {
            // Plot 1: Position
            PlotPosition.Plot.Clear();
            PlotPosition.Plot.Title("Drehwinkel theta(t) vs. Sollwert w(t)");
            PlotPosition.Plot.Axes.Left.Label.Text = "Winkel [rad]";
            PlotPosition.Plot.Axes.Bottom.Label.Text = "Zeit [s]";

            var spW = PlotPosition.Plot.Add.Scatter(t, w);
            spW.LegendText = "Sollwert w(t)";
            spW.LineColor = ScottPlot.Colors.Gray;
            spW.LinePattern = ScottPlot.LinePattern.Dashed;
            spW.LineWidth = 2;
            spW.MarkerSize = 0;

            var spTheta = PlotPosition.Plot.Add.Scatter(t, theta);
            spTheta.LegendText = "Istwert theta(t)";
            spTheta.LineColor = ScottPlot.Colors.Blue;
            spTheta.LineWidth = 2.5f;
            spTheta.MarkerSize = 0;

            PlotPosition.Plot.ShowLegend();
            PlotPosition.Plot.Axes.AutoScale();
            PlotPosition.Refresh();

            // Plot 2: Aktorsignale & Integrator
            PlotActuator.Plot.Clear();
            PlotActuator.Plot.Title("Stellgröße u_A(t), Rohstellgröße u_raw(t) & Integrator x_i(t)");
            PlotActuator.Plot.Axes.Left.Label.Text = "Spannung [V] / Integrator";
            PlotActuator.Plot.Axes.Bottom.Label.Text = "Zeit [s]";

            var spUa = PlotActuator.Plot.Add.Scatter(t, uA);
            spUa.LegendText = "Motorspannung u_A (gesättigt)";
            spUa.LineColor = ScottPlot.Colors.Red;
            spUa.LineWidth = 2;
            spUa.MarkerSize = 0;

            var spUraw = PlotActuator.Plot.Add.Scatter(t, uRaw);
            spUraw.LegendText = "Rohsignal u_raw (ungesättigt)";
            spUraw.LineColor = ScottPlot.Colors.Orange;
            spUraw.LineWidth = 1.5f;
            spUraw.MarkerSize = 0;

            var spXi = PlotActuator.Plot.Add.Scatter(t, xi);
            spXi.LegendText = "Integrator x_i";
            spXi.LineColor = ScottPlot.Colors.DarkCyan;
            spXi.LineWidth = 1.5f;
            spXi.MarkerSize = 0;

            PlotActuator.Plot.ShowLegend();
            PlotActuator.Plot.Axes.AutoScale();
            PlotActuator.Refresh();
        }
    }
}
