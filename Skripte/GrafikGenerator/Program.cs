using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using ScottPlot;
using SkiaSharp;

namespace GrafikGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== HiDPI-GrafikGenerator (Stream B) gestartet ===");
            var dir = new DirectoryInfo(AppContext.BaseDirectory);
            while (dir != null && !Directory.Exists(Path.Combine(dir.FullName, "Folien")))
            {
                dir = dir.Parent;
            }
            var root = dir?.FullName ?? Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "../../../../../"));
            Console.WriteLine($"Repository Root: {root}");

            GenerateQueuePlots(root);
            GenerateHeatmapPlot(root);
            GenerateBoundaryConditionsPlot(root);
            GenerateSignalPlot(root);
            GenerateConvergencePlot(root);
            GenerateAusblickImages(root);
            GenerateMotorPlots(root);

            Console.WriteLine("=== Alle HiDPI-Grafiken erfolgreich erzeugt ===");
        }

        // Hilfsmethode zur einheitlichen HiDPI-Typografie
        static void ApplyHiDpiTypography(Plot plot, int titleSize = 22, int labelSize = 18, int tickSize = 14, int legendSize = 16)
        {
            plot.Axes.Title.Label.FontSize = titleSize;
            plot.Axes.Title.Label.Bold = true;
            plot.Axes.Bottom.Label.FontSize = labelSize;
            plot.Axes.Left.Label.FontSize = labelSize;
            plot.Axes.Bottom.TickLabelStyle.FontSize = tickSize;
            plot.Axes.Left.TickLabelStyle.FontSize = tickSize;
            plot.Legend.FontSize = legendSize;
        }

        static void GenerateQueuePlots(string root)
        {
            var targetDir = Path.Combine(root, "Folien", "09_Dynamische_Modelle_Diskret", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            // 1. Warteschlangenlänge über Zeit (HiDPI: 1600x900)
            var plot1 = new Plot();
            double[] t = { 0, 1.2, 1.2, 2.5, 2.5, 3.8, 4.1, 4.1, 5.0, 6.2, 6.2, 7.5, 8.0, 9.1, 9.1, 10.0 };
            double[] q = { 0, 0,   1,   1,   2,   2,   2,   1,   1,   1,   0,   0,   1,   1,   0,   0 };

            var line = plot1.Add.ScatterLine(t, q);
            line.Color = Colors.SteelBlue;
            line.LineWidth = 4f;
            plot1.Title("Verlauf der Warteschlangenlänge L(t)");
            plot1.XLabel("Simulationszeit t [min]");
            plot1.YLabel("Kunden in der Warteschlange");
            plot1.Axes.SetLimits(0, 10, -0.2, 3.5);
            ApplyHiDpiTypography(plot1);

            var file1 = Path.Combine(targetDir, "Queue_Laenge_Verlauf.png");
            plot1.SavePng(file1, 1600, 900);
            Console.WriteLine($"Erzeugt (HiDPI): {file1}");

            // 2. Wartezeiten-Histogramm (HiDPI: 1600x900)
            var plot2 = new Plot();
            var rand = new Random(42);
            var waitTimes = new double[500];
            for (int i = 0; i < waitTimes.Length; i++)
            {
                waitTimes[i] = -2.5 * Math.Log(1.0 - rand.NextDouble());
            }

            var hist = ScottPlot.Statistics.Histogram.WithBinCount(15, 0, 15);
            hist.AddRange(waitTimes);

            var bars = new List<ScottPlot.Bar>();
            for (int i = 0; i < hist.Counts.Length; i++)
            {
                bars.Add(new ScottPlot.Bar
                {
                    Position = hist.Bins[i] + hist.FirstBinSize * 0.5,
                    Value = hist.Counts[i],
                    Size = hist.FirstBinSize * 0.85,
                    FillColor = Colors.SeaGreen.WithAlpha(0.7f),
                    LineColor = Colors.SeaGreen,
                    LineWidth = 2.0f
                });
            }
            plot2.Add.Bars(bars);

            plot2.Title("Verteilung der Wartezeiten W (Histogramm)");
            plot2.XLabel("Wartezeit W [min]");
            plot2.YLabel("Absolute Häufigkeit");
            plot2.Axes.SetLimits(0, 15, 0, hist.Counts.Max() * 1.15);
            ApplyHiDpiTypography(plot2);

            var file2 = Path.Combine(targetDir, "Queue_Wartezeit_Histogramm.png");
            plot2.SavePng(file2, 1600, 900);
            Console.WriteLine($"Erzeugt (HiDPI): {file2}");
        }

        static void GenerateHeatmapPlot(string root)
        {
            var targetDir = Path.Combine(root, "Folien", "02_Visualisierung_2D_Pixel", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            // Verdopplung auf 800x600 für Retina-Qualität
            int width = 800;
            int height = 600;
            using var bitmap = new SKBitmap(width, height, SKColorType.Bgra8888, SKAlphaType.Premul);

            for (int y = 0; y < height; y++)
            {
                for (int x = 0; x < width; x++)
                {
                    double dx1 = (x - 240) / 80.0;
                    double dy1 = (y - 200) / 80.0;
                    double t1 = Math.Exp(-(dx1 * dx1 + dy1 * dy1));

                    double dx2 = (x - 560) / 120.0;
                    double dy2 = (y - 360) / 120.0;
                    double t2 = 0.8 * Math.Exp(-(dx2 * dx2 + dy2 * dy2));

                    double temp = Math.Clamp(t1 + t2, 0.0, 1.0);

                    byte r = (byte)(255 * Math.Clamp(2 * temp - 0.5, 0.0, 1.0));
                    byte g = (byte)(255 * (1.0 - Math.Abs(2 * temp - 1.0)));
                    byte b = (byte)(255 * Math.Clamp(1.5 - 2 * temp, 0.0, 1.0));

                    bitmap.SetPixel(x, y, new SKColor(r, g, b, 255));
                }
            }

            using var image = SKImage.FromBitmap(bitmap);
            using var data = image.Encode(SKEncodedImageFormat.Png, 100);
            var outFile = Path.Combine(targetDir, "Heatmap_Temperaturfeld.png");
            using var stream = File.OpenWrite(outFile);
            data.SaveTo(stream);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        static void GenerateSignalPlot(string root)
        {
            var targetDir = Path.Combine(root, "Folien", "04_Visualisierung_2D_Diagramme", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            var plot = new Plot();
            int pointCount = 100_000;
            double[] data = new double[pointCount];
            var rand = new Random(123);
            double current = 0;
            for (int i = 0; i < pointCount; i++)
            {
                current += (rand.NextDouble() - 0.495);
                data[i] = current;
            }

            var sig = plot.Add.Signal(data, 0.001);
            sig.Color = Colors.DarkOrange;
            sig.LineWidth = 3.0f;

            plot.Title("High-Performance Signal-Plot (100.000 Messpunkte bei 60 FPS)");
            plot.XLabel("Zeit [s]");
            plot.YLabel("Zustand x(t)");
            plot.Axes.AutoScale();
            ApplyHiDpiTypography(plot);

            var outFile = Path.Combine(targetDir, "ScottPlot_Signal_Example.png");
            plot.SavePng(outFile, 1600, 900);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        static void GenerateConvergencePlot(string root)
        {
            var targetDir = Path.Combine(root, "Folien", "08_Dynamische_Modelle_Kontinuierlich", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            double w0 = 2.0 * Math.PI;
            double zeta = 0.05;
            double wd = w0 * Math.Sqrt(1.0 - zeta * zeta);
            double tEnd = 1.0;

            double ExactX(double t)
            {
                return Math.Exp(-zeta * w0 * t) * (Math.Cos(wd * t) + (zeta * w0 / wd) * Math.Sin(wd * t));
            }

            void Derivatives(double t, double[] x, double[] dxdt)
            {
                dxdt[0] = x[1];
                dxdt[1] = -w0 * w0 * x[0] - 2.0 * zeta * w0 * x[1];
            }

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

                // 1. Expliziter Euler
                double[] xE = [1.0, 0.0];
                double[] dE = new double[2];
                double t = 0;
                for (int s = 0; s < steps; s++)
                {
                    Derivatives(t, xE, dE);
                    xE[0] += h * dE[0];
                    xE[1] += h * dE[1];
                    t += h;
                }
                logErrEuler[i] = Math.Log10(Math.Max(1e-16, Math.Abs(xE[0] - exactEnd)));

                // 2. Heun (RK2)
                double[] xH = [1.0, 0.0];
                double[] k1 = new double[2];
                double[] k2 = new double[2];
                double[] xTemp = new double[2];
                t = 0;
                for (int s = 0; s < steps; s++)
                {
                    Derivatives(t, xH, k1);
                    xTemp[0] = xH[0] + h * k1[0];
                    xTemp[1] = xH[1] + h * k1[1];
                    Derivatives(t + h, xTemp, k2);
                    xH[0] += 0.5 * h * (k1[0] + k2[0]);
                    xH[1] += 0.5 * h * (k1[1] + k2[1]);
                    t += h;
                }
                logErrHeun[i] = Math.Log10(Math.Max(1e-16, Math.Abs(xH[0] - exactEnd)));

                // 3. RK4
                double[] xR = [1.0, 0.0];
                double[] rk1 = new double[2];
                double[] rk2 = new double[2];
                double[] rk3 = new double[2];
                double[] rk4 = new double[2];
                t = 0;
                for (int s = 0; s < steps; s++)
                {
                    Derivatives(t, xR, rk1);

                    xTemp[0] = xR[0] + 0.5 * h * rk1[0];
                    xTemp[1] = xR[1] + 0.5 * h * rk1[1];
                    Derivatives(t + 0.5 * h, xTemp, rk2);

                    xTemp[0] = xR[0] + 0.5 * h * rk2[0];
                    xTemp[1] = xR[1] + 0.5 * h * rk2[1];
                    Derivatives(t + 0.5 * h, xTemp, rk3);

                    xTemp[0] = xR[0] + h * rk3[0];
                    xTemp[1] = xR[1] + h * rk3[1];
                    Derivatives(t + h, xTemp, rk4);

                    xR[0] += (h / 6.0) * (rk1[0] + 2.0 * rk2[0] + 2.0 * rk3[0] + rk4[0]);
                    xR[1] += (h / 6.0) * (rk1[1] + 2.0 * rk2[1] + 2.0 * rk3[1] + rk4[1]);
                    t += h;
                }
                logErrRk4[i] = Math.Log10(Math.Max(1e-16, Math.Abs(xR[0] - exactEnd)));
            }

            var plot = new Plot();
            var sEuler = plot.Add.Scatter(logH, logErrEuler);
            sEuler.LegendText = "Expliziter Euler (Steigung 1 ~ O(h¹))";
            sEuler.Color = Colors.Crimson;
            sEuler.LineWidth = 3.5f;
            sEuler.MarkerSize = 12f;

            var sHeun = plot.Add.Scatter(logH, logErrHeun);
            sHeun.LegendText = "Heun / RK2 (Steigung 2 ~ O(h²))";
            sHeun.Color = Colors.RoyalBlue;
            sHeun.LineWidth = 3.5f;
            sHeun.MarkerSize = 12f;

            var sRk4 = plot.Add.Scatter(logH, logErrRk4);
            sRk4.LegendText = "Runge-Kutta 4 (Steigung 4 ~ O(h⁴))";
            sRk4.Color = Colors.SeaGreen;
            sRk4.LineWidth = 3.5f;
            sRk4.MarkerSize = 12f;

            plot.Title("Konvergenzordnung numerischer Solver (Log-Log-Plot)");
            plot.XLabel("log₁₀(Schrittweite h [s])");
            plot.YLabel("log₁₀(Globaler Fehler ||x(T) - x_analytisch(T)||)");
            plot.ShowLegend(Alignment.LowerRight);
            ApplyHiDpiTypography(plot, titleSize: 24, labelSize: 20, tickSize: 16, legendSize: 18);

            var outFile = Path.Combine(targetDir, "Solver_Konvergenzordnung.png");
            plot.SavePng(outFile, 1700, 960);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        static void GenerateBoundaryConditionsPlot(string root)
        {
            var targetDir = Path.Combine(root, "Folien", "02_Visualisierung_2D_Pixel", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            // Simulationsgitter
            int simW = 180, simH = 180;
            float[,] dirichlet = new float[simW, simH];
            float[,] neumann = new float[simW, simH];

            // Wärmequelle direkt an der linken Begrenzungswand platziert (x0 = 15, y0 = 90),
            // damit der fundamentale Unterschied zwischen Dirichlet (Wärme entweicht ins Eisbad)
            // und Neumann (Wärme wird an der isolierten Wand reflektiert) deutlich sichtbar wird.
            for (int y = 0; y < simH; y++)
            {
                for (int x = 0; x < simW; x++)
                {
                    double dx = x - 15;
                    double dy = y - 90;
                    float val = (float)Math.Exp(-(dx * dx + dy * dy) / 450.0);
                    dirichlet[x, y] = val;
                    neumann[x, y] = val;
                }
            }

            float alpha = 0.22f;
            int steps = 400;

            float[,] nextD = new float[simW, simH];
            float[,] nextN = new float[simW, simH];

            for (int step = 0; step < steps; step++)
            {
                // 1. Dirichlet: Feste Randbedingung T = 0 (Rand wird nie aktualisiert)
                for (int y = 1; y < simH - 1; y++)
                {
                    for (int x = 1; x < simW - 1; x++)
                    {
                        float laplace = dirichlet[x + 1, y] + dirichlet[x - 1, y] +
                                        dirichlet[x, y + 1] + dirichlet[x, y - 1] - 4.0f * dirichlet[x, y];
                        nextD[x, y] = dirichlet[x, y] + alpha * laplace;
                    }
                }
                Array.Copy(nextD, dirichlet, dirichlet.Length);

                // 2. Neumann: Adiabatisch (dT/dn = 0 via Ghost-Cells)
                for (int y = 0; y < simH; y++)
                {
                    neumann[0, y] = neumann[1, y];
                    neumann[simW - 1, y] = neumann[simW - 2, y];
                }
                for (int x = 0; x < simW; x++)
                {
                    neumann[x, 0] = neumann[x, 1];
                    neumann[x, simH - 1] = neumann[x, simH - 2];
                }
                for (int y = 1; y < simH - 1; y++)
                {
                    for (int x = 1; x < simW - 1; x++)
                    {
                        float laplace = neumann[x + 1, y] + neumann[x - 1, y] +
                                        neumann[x, y + 1] + neumann[x, y - 1] - 4.0f * neumann[x, y];
                        nextN[x, y] = neumann[x, y] + alpha * laplace;
                    }
                }
                Array.Copy(nextN, neumann, neumann.Length);
                for (int y = 0; y < simH; y++)
                {
                    neumann[0, y] = neumann[1, y];
                    neumann[simW - 1, y] = neumann[simW - 2, y];
                }
                for (int x = 0; x < simW; x++)
                {
                    neumann[x, 0] = neumann[x, 1];
                    neumann[x, simH - 1] = neumann[x, simH - 2];
                }
            }

            // HiDPI Bitmap: 840 x 920 px (2x Retina)
            int totalW = 840;
            int totalH = 920;
            using var bmp = new SKBitmap(totalW, totalH, SKColorType.Bgra8888, SKAlphaType.Premul);
            using var canvas = new SKCanvas(bmp);
            canvas.Clear(SKColors.White);

            using var paintText = new SKPaint
            {
                Color = new SKColor(20, 20, 20),
                TextSize = 28,
                IsAntialias = true,
                FakeBoldText = true
            };
            using var paintSub = new SKPaint
            {
                Color = new SKColor(80, 80, 80),
                TextSize = 22,
                IsAntialias = true
            };

            SKColor ColorMap(float temp)
            {
                temp = Math.Clamp(temp, 0f, 1f);
                byte r = (byte)(255 * Math.Clamp(2 * temp - 0.5f, 0f, 1f));
                byte g = (byte)(255 * (1.0f - Math.Abs(2 * temp - 1.0f)));
                byte b = (byte)(255 * Math.Clamp(1.5f - 2 * temp, 0f, 1f));
                return new SKColor(r, g, b);
            }

            // Zeichnen von Block 1 (Dirichlet)
            canvas.DrawText("Dirichlet-Rand: Wärme entweicht", 40, 44, paintText);
            canvas.DrawText("T = 0 °C an Systemgrenzen (Homogen)", 40, 76, paintSub);

            // 2x Skalierung beim Rendern der Pixel
            for (int y = 0; y < simH; y++)
            {
                for (int x = 0; x < simW; x++)
                {
                    var color = ColorMap(dirichlet[x, y]);
                    int px = 40 + x * 2;
                    int py = 90 + y * 2;
                    bmp.SetPixel(px, py, color);
                    bmp.SetPixel(px + 1, py, color);
                    bmp.SetPixel(px, py + 1, color);
                    bmp.SetPixel(px + 1, py + 1, color);
                }
            }

            // Zeichnen von Block 2 (Neumann)
            canvas.DrawText("Neumann-Rand: Adiabatisch isoliert", 40, 490, paintText);
            canvas.DrawText("dT/dn = 0 (Ghost Cells, Wärmereflexion)", 40, 522, paintSub);

            for (int y = 0; y < simH; y++)
            {
                for (int x = 0; x < simW; x++)
                {
                    var color = ColorMap(neumann[x, y]);
                    int px = 40 + x * 2;
                    int py = 536 + y * 2;
                    bmp.SetPixel(px, py, color);
                    bmp.SetPixel(px + 1, py, color);
                    bmp.SetPixel(px, py + 1, color);
                    bmp.SetPixel(px + 1, py + 1, color);
                }
            }

            using var image = SKImage.FromBitmap(bmp);
            using var data = image.Encode(SKEncodedImageFormat.Png, 100);
            var outFile = Path.Combine(targetDir, "Randbedingungen_Vergleich.png");
            using var stream = File.OpenWrite(outFile);
            data.SaveTo(stream);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        static void GenerateAusblickImages(string root)
        {
            var hybridSrc = Path.Combine(root, "Folien", "10_Dynamische_Modelle_Hybrid", "Illustrationen", "HybrideModelle.jpg");
            var hybridDst = Path.Combine(root, "Folien", "09_Dynamische_Modelle_Diskret", "Illustrationen", "Ausblick_Hybrid.png");
            if (File.Exists(hybridSrc))
            {
                using var bmp = SKBitmap.Decode(hybridSrc);
                using var img = SKImage.FromBitmap(bmp);
                using var data = img.Encode(SKEncodedImageFormat.Png, 100);
                using var stream = File.OpenWrite(hybridDst);
                data.SaveTo(stream);
                Console.WriteLine($"Erzeugt: {hybridDst}");
            }

            var epilogSrc = Path.Combine(root, "Folien", "11_Epilog", "Titelbild.jpg");
            var epilogDst = Path.Combine(root, "Folien", "10_Dynamische_Modelle_Hybrid", "Illustrationen", "Ausblick_Epilog.png");
            if (File.Exists(epilogSrc))
            {
                using var bmp = SKBitmap.Decode(epilogSrc);
                using var img = SKImage.FromBitmap(bmp);
                using var data = img.Encode(SKEncodedImageFormat.Png, 100);
                using var stream = File.OpenWrite(epilogDst);
                data.SaveTo(stream);
                Console.WriteLine($"Erzeugt: {epilogDst}");
            }
        }

        static void GenerateMotorPlots(string root)
        {
            var illustrDir = Path.Combine(root, "Folien", "08_Dynamische_Modelle_Kontinuierlich", "Illustrationen");
            var screensDir = Path.Combine(root, "Folien", "08_Dynamische_Modelle_Kontinuierlich", "Screenshots");
            Directory.CreateDirectory(illustrDir);
            Directory.CreateDirectory(screensDir);

            double dt = 0.0005;
            int n = 1600; // 0.8 Sekunden
            double[] time = new double[n];
            double[] thetaNoAW = new double[n];
            double[] thetaWithAW = new double[n];
            double[] uWithAW = new double[n];

            void Simulate(bool antiWindup, double[] outTheta, double[]? outU)
            {
                double theta = 0.0, omega = 0.0, xI = 0.0;
                double Kp = 10.0, Ki = 48.0, Kd = 0.4;
                double Tm = 0.08, Km = 2.0, UMax = 3.0;
                double target = 1.0;

                (double dTheta, double dOmega, double dxI, double uSat) Calc(double th, double om, double xi)
                {
                    double e = target - th;
                    double uRaw = Kp * e + xi - Kd * om;
                    double uSat = Math.Clamp(uRaw, -UMax, UMax);
                    bool isSat = Math.Abs(uRaw) >= UMax;
                    bool sameSign = (e * uRaw) > 0.0;
                    double dxi = (antiWindup && isSat && sameSign) ? 0.0 : Ki * e;
                    double dth = om;
                    double dom = (-1.0 / Tm) * om + (Km / Tm) * uSat;
                    return (dth, dom, dxi, uSat);
                }

                for (int i = 0; i < n; i++)
                {
                    time[i] = i * dt;
                    outTheta[i] = theta;

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

            // 1. AntiWindup_Vergleich.png (HiDPI: 1600x960)
            var plot1 = new Plot();
            var targetLine = plot1.Add.HorizontalLine(1.0);
            targetLine.Color = Colors.Gray;
            targetLine.LinePattern = LinePattern.Dashed;
            targetLine.LineWidth = 2.0f;

            var lineNoAW = plot1.Add.ScatterLine(time, thetaNoAW);
            lineNoAW.Color = Colors.Crimson;
            lineNoAW.LineWidth = 3.5f;
            lineNoAW.LegendText = "Ohne Anti-Windup (Überschwingen 60%)";

            var lineAW = plot1.Add.ScatterLine(time, thetaWithAW);
            lineAW.Color = Colors.ForestGreen;
            lineAW.LineWidth = 4.0f;
            lineAW.LegendText = "Mit Anti-Windup Clamping (aperiodisch stabil)";

            plot1.Title("DC-Servomotor Sprungantwort: Anti-Windup Clamping");
            plot1.XLabel("Zeit t [s]");
            plot1.YLabel("Wellenposition θ(t) [rad]");
            plot1.ShowLegend();
            plot1.Axes.SetLimits(0, 0.8, -0.05, 1.75);
            ApplyHiDpiTypography(plot1, titleSize: 24, labelSize: 20, tickSize: 16, legendSize: 18);

            var file1 = Path.Combine(illustrDir, "AntiWindup_Vergleich.png");
            plot1.SavePng(file1, 1600, 960);
            Console.WriteLine($"Erzeugt (HiDPI): {file1}");

            // 2. ClosedLoop_RK4_StepResponse.png (HiDPI: 1600x960)
            var plot2 = new Plot();
            var lineTarget2 = plot2.Add.HorizontalLine(1.0);
            lineTarget2.Color = Colors.Gray;
            lineTarget2.LinePattern = LinePattern.Dashed;
            lineTarget2.LineWidth = 2.0f;

            var lineTheta = plot2.Add.ScatterLine(time, thetaWithAW);
            lineTheta.Color = Colors.SteelBlue;
            lineTheta.LineWidth = 4.0f;
            lineTheta.LegendText = "Position θ(t) [rad]";

            double[] uNorm = uWithAW.Select(u => u / 3.0).ToArray();
            var lineU = plot2.Add.ScatterLine(time, uNorm);
            lineU.Color = Colors.OrangeRed;
            lineU.LineWidth = 3.0f;
            lineU.LegendText = "Stellspannung u(t) / U_max [normiert]";

            plot2.Title("Geschlossener Regelkreis: RK4-Simulation (dt = 0.5 ms)");
            plot2.XLabel("Zeit t [s]");
            plot2.YLabel("Amplitude (Position [rad] / normierte Spannung)");
            plot2.ShowLegend();
            plot2.Axes.SetLimits(0, 0.8, -0.2, 1.25);
            ApplyHiDpiTypography(plot2, titleSize: 24, labelSize: 20, tickSize: 16, legendSize: 18);

            var file2 = Path.Combine(screensDir, "ClosedLoop_RK4_StepResponse.png");
            plot2.SavePng(file2, 1600, 960);
            Console.WriteLine($"Erzeugt (HiDPI): {file2}");
        }
    }
}
