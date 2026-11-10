using System;
using System.IO;
using System.Linq;
using ScottPlot;

namespace OdeKonvergenzPlotGenerator
{
    class Program
    {
        static void Main()
        {
            
            var dir = new DirectoryInfo(AppContext.BaseDirectory);
            while (dir != null && !Directory.Exists(Path.Combine(dir.FullName, "Kapitel")))
            {
                dir = dir.Parent;
            }
            var root = dir!.FullName;

            GenerateConvergencePlot(root);
            GenerateMotorPlots(root);
        }

        static void ApplyHiDpiTypography(Plot plot, int titleSize = 24, int labelSize = 20, int tickSize = 16, int legendSize = 18)
        {
            plot.Axes.Title.Label.FontSize = titleSize;
            plot.Axes.Title.Label.Bold = true;
            plot.Axes.Bottom.Label.FontSize = labelSize;
            plot.Axes.Left.Label.FontSize = labelSize;
            plot.Axes.Bottom.TickLabelStyle.FontSize = tickSize;
            plot.Axes.Left.TickLabelStyle.FontSize = tickSize;
            plot.Legend.FontSize = legendSize;
        }

        static void GenerateConvergencePlot(string root)
        {
            var targetDir = Path.Combine(root, "Kapitel", "08_DGL_und_SFunctions", "Folien", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            double w0 = 2.0 * Math.PI, zeta = 0.05;
            double wd = w0 * Math.Sqrt(1.0 - zeta * zeta), tEnd = 1.0;
            double ExactX(double t) => Math.Exp(-zeta * w0 * t) * (Math.Cos(wd * t) + (zeta * w0 / wd) * Math.Sin(wd * t));
            void Derivatives(double t, double[] x, double[] dxdt) { dxdt[0] = x[1]; dxdt[1] = -w0 * w0 * x[0] - 2.0 * zeta * w0 * x[1]; }

            double[] hValues = [0.05, 0.025, 0.0125, 0.00625, 0.003125, 0.0015625];
            double[] logH = new double[hValues.Length];
            double[] logErrEuler = new double[hValues.Length];
            double[] logErrHeun = new double[hValues.Length];
            double[] logErrRk4 = new double[hValues.Length];
            double exactEnd = ExactX(tEnd);

            for (int i = 0; i < hValues.Length; i++)
            {
                double h = hValues[i];
                logH[i] = Math.Log10(h);
                int steps = (int)Math.Round(tEnd / h);

                double[] xE = [1.0, 0.0], dE = new double[2];
                for (int s = 0; s < steps; s++) { Derivatives(s * h, xE, dE); xE[0] += h * dE[0]; xE[1] += h * dE[1]; }
                logErrEuler[i] = Math.Log10(Math.Max(1e-16, Math.Abs(xE[0] - exactEnd)));

                double[] xH = [1.0, 0.0], k1 = new double[2], k2 = new double[2], xTemp = new double[2];
                for (int s = 0; s < steps; s++)
                {
                    double t = s * h;
                    Derivatives(t, xH, k1);
                    xTemp[0] = xH[0] + h * k1[0]; xTemp[1] = xH[1] + h * k1[1];
                    Derivatives(t + h, xTemp, k2);
                    xH[0] += 0.5 * h * (k1[0] + k2[0]); xH[1] += 0.5 * h * (k1[1] + k2[1]);
                }
                logErrHeun[i] = Math.Log10(Math.Max(1e-16, Math.Abs(xH[0] - exactEnd)));

                double[] xR = [1.0, 0.0], rk1 = new double[2], rk2 = new double[2], rk3 = new double[2], rk4 = new double[2];
                for (int s = 0; s < steps; s++)
                {
                    double t = s * h;
                    Derivatives(t, xR, rk1);
                    xTemp[0] = xR[0] + 0.5 * h * rk1[0]; xTemp[1] = xR[1] + 0.5 * h * rk1[1];
                    Derivatives(t + 0.5 * h, xTemp, rk2);
                    xTemp[0] = xR[0] + 0.5 * h * rk2[0]; xTemp[1] = xR[1] + 0.5 * h * rk2[1];
                    Derivatives(t + 0.5 * h, xTemp, rk3);
                    xTemp[0] = xR[0] + h * rk3[0]; xTemp[1] = xR[1] + h * rk3[1];
                    Derivatives(t + h, xTemp, rk4);
                    xR[0] += (h / 6.0) * (rk1[0] + 2 * rk2[0] + 2 * rk3[0] + rk4[0]);
                    xR[1] += (h / 6.0) * (rk1[1] + 2 * rk2[1] + 2 * rk3[1] + rk4[1]);
                }
                logErrRk4[i] = Math.Log10(Math.Max(1e-16, Math.Abs(xR[0] - exactEnd)));
            }

            var plot = new Plot();
            var sEuler = plot.Add.Scatter(logH, logErrEuler); sEuler.LegendText = "Expliziter Euler (Steigung 1 ~ O(h¹))"; sEuler.Color = Colors.Crimson; sEuler.LineWidth = 3.5f; sEuler.MarkerSize = 12f;
            var sHeun = plot.Add.Scatter(logH, logErrHeun); sHeun.LegendText = "Heun / RK2 (Steigung 2 ~ O(h²))"; sHeun.Color = Colors.RoyalBlue; sHeun.LineWidth = 3.5f; sHeun.MarkerSize = 12f;
            var sRk4 = plot.Add.Scatter(logH, logErrRk4); sRk4.LegendText = "Runge-Kutta 4 (Steigung 4 ~ O(h⁴))"; sRk4.Color = Colors.SeaGreen; sRk4.LineWidth = 3.5f; sRk4.MarkerSize = 12f;

            plot.Title("Konvergenzordnung numerischer Solver (Log-Log-Plot)");
            plot.XLabel("log₁₀(Schrittweite h [s])");
            plot.YLabel("log₁₀(Globaler Fehler ||x(T) - x_analytisch(T)||)");
            plot.ShowLegend(Alignment.LowerRight);
            ApplyHiDpiTypography(plot);
            plot.SavePng(Path.Combine(targetDir, "Solver_Konvergenzordnung.png"), 1700, 960);
        }

        static void GenerateMotorPlots(string root)
        {
            var illustrDir = Path.Combine(root, "Kapitel", "08_DGL_und_SFunctions", "Folien", "Illustrationen");
            var screensDir = Path.Combine(root, "Kapitel", "08_DGL_und_SFunctions", "Folien", "Screenshots");
            Directory.CreateDirectory(illustrDir);
            Directory.CreateDirectory(screensDir);

            double dt = 0.0005;
            int n = 1600;
            double[] time = new double[n], thetaNoAW = new double[n], thetaWithAW = new double[n], uWithAW = new double[n];

            void Simulate(bool antiWindup, double[] outTheta, double[]? outU)
            {
                double theta = 0.0, omega = 0.0, xI = 0.0, Kp = 10.0, Ki = 48.0, Kd = 0.4, Tm = 0.08, Km = 2.0, UMax = 3.0, target = 1.0;
                (double dTheta, double dOmega, double dxI, double uSat) Calc(double th, double om, double xi)
                {
                    double e = target - th, uRaw = Kp * e + xi - Kd * om, uSat = Math.Clamp(uRaw, -UMax, UMax);
                    double dxi = (antiWindup && Math.Abs(uRaw) >= UMax && (e * uRaw) > 0.0) ? 0.0 : Ki * e;
                    return (om, (-1.0 / Tm) * om + (Km / Tm) * uSat, dxi, uSat);
                }
                for (int i = 0; i < n; i++)
                {
                    time[i] = i * dt; outTheta[i] = theta;
                    var k1 = Calc(theta, omega, xI);
                    if (outU != null) outU[i] = k1.uSat;
                    var k2 = Calc(theta + 0.5 * dt * k1.dTheta, omega + 0.5 * dt * k1.dOmega, xI + 0.5 * dt * k1.dxI);
                    var k3 = Calc(theta + 0.5 * dt * k2.dTheta, omega + 0.5 * dt * k2.dOmega, xI + 0.5 * dt * k2.dxI);
                    var k4 = Calc(theta + dt * k3.dTheta, omega + dt * k3.dOmega, xI + dt * k3.dxI);
                    theta += (dt / 6.0) * (k1.dTheta + 2 * k2.dTheta + 2 * k3.dTheta + k4.dTheta);
                    omega += (dt / 6.0) * (k1.dOmega + 2 * k2.dOmega + 2 * k3.dOmega + k4.dOmega);
                    xI += (dt / 6.0) * (k1.dxI + 2 * k2.dxI + 2 * k3.dxI + k4.dxI);
                }
            }

            Simulate(false, thetaNoAW, null);
            Simulate(true, thetaWithAW, uWithAW);

            var plot1 = new Plot();
            var lNoAW = plot1.Add.ScatterLine(time, thetaNoAW); lNoAW.Color = Colors.Crimson; lNoAW.LineWidth = 3.5f; lNoAW.LegendText = "Ohne Anti-Windup (Überschwingen 60%)";
            var lAW = plot1.Add.ScatterLine(time, thetaWithAW); lAW.Color = Colors.ForestGreen; lAW.LineWidth = 4.0f; lAW.LegendText = "Mit Anti-Windup Clamping (aperiodisch stabil)";
            plot1.Title("DC-Servomotor Sprungantwort: Anti-Windup Clamping"); plot1.XLabel("Zeit t [s]"); plot1.YLabel("Wellenposition θ(t) [rad]"); plot1.ShowLegend();
            plot1.Axes.SetLimits(0, 0.8, -0.05, 1.75); ApplyHiDpiTypography(plot1);
            plot1.SavePng(Path.Combine(illustrDir, "AntiWindup_Vergleich.png"), 1600, 960);

            var plot2 = new Plot();
            var lTh = plot2.Add.ScatterLine(time, thetaWithAW); lTh.Color = Colors.SteelBlue; lTh.LineWidth = 4.0f; lTh.LegendText = "Position θ(t) [rad]";
            var lU = plot2.Add.ScatterLine(time, uWithAW.Select(u => u / 3.0).ToArray()); lU.Color = Colors.OrangeRed; lU.LineWidth = 3.0f; lU.LegendText = "Stellspannung u(t) / U_max [normiert]";
            plot2.Title("Geschlossener Regelkreis: RK4-Simulation (dt = 0.5 ms)"); plot2.XLabel("Zeit t [s]"); plot2.YLabel("Amplitude (Position [rad] / normierte Spannung)"); plot2.ShowLegend();
            plot2.Axes.SetLimits(0, 0.8, -0.2, 1.25); ApplyHiDpiTypography(plot2);
            plot2.SavePng(Path.Combine(screensDir, "ClosedLoop_RK4_StepResponse.png"), 1600, 960);
        }
    }
}
