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
            Console.WriteLine("=== GrafikGenerator gestartet ===");
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

            Console.WriteLine("=== Alle Grafiken erfolgreich erzeugt ===");
        }

        static void GenerateQueuePlots(string root)
        {
            var targetDir = Path.Combine(root, "Folien", "09_Dynamische_Modelle_Diskret", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            // 1. Warteschlangenlänge über Zeit
            var plot1 = new Plot();
            double[] t = { 0, 1.2, 1.2, 2.5, 2.5, 3.8, 4.1, 4.1, 5.0, 6.2, 6.2, 7.5, 8.0, 9.1, 9.1, 10.0 };
            double[] q = { 0, 0,   1,   1,   2,   2,   2,   1,   1,   1,   0,   0,   1,   1,   0,   0 };

            var line = plot1.Add.ScatterLine(t, q);
            line.Color = Colors.SteelBlue;
            line.LineWidth = 3f;
            plot1.Title("Verlauf der Warteschlangenlänge L(t)");
            plot1.XLabel("Simulationszeit t [min]");
            plot1.YLabel("Kunden in der Warteschlange");
            plot1.Axes.SetLimits(0, 10, -0.2, 3.5);
            var file1 = Path.Combine(targetDir, "Queue_Laenge_Verlauf.png");
            plot1.SavePng(file1, 800, 450);
            Console.WriteLine($"Erzeugt: {file1}");

            // 2. Wartezeiten-Histogramm
            var plot2 = new Plot();
            var rand = new Random(42);
            var waitTimes = new double[500];
            for (int i = 0; i < waitTimes.Length; i++)
            {
                // Exponentialverteilte Wartezeiten
                waitTimes[i] = -2.5 * Math.Log(1.0 - rand.NextDouble());
            }

            var hist = ScottPlot.Statistics.Histogram.WithBinCount(15, 0, 15);
            hist.AddRange(waitTimes);

            var bars = new List<ScottPlot.Bar>();
            for (int i = 0; i < hist.Counts.Length; i++)
            {
                bars.Add(new ScottPlot.Bar
                {
                    Position = hist.Bins[i],
                    Value = hist.Counts[i],
                    Size = hist.FirstBinSize * 0.85,
                    FillColor = Colors.SeaGreen.WithAlpha(0.7f),
                    LineColor = Colors.SeaGreen,
                    LineWidth = 1.2f
                });
            }
            plot2.Add.Bars(bars);

            plot2.Title("Verteilung der Wartezeiten W (Histogramm)");
            plot2.XLabel("Wartezeit [min]");
            plot2.YLabel("Absolute Häufigkeit");
            plot2.Axes.AutoScale();
            var file2 = Path.Combine(targetDir, "Queue_Wartezeit_Histogramm.png");
            plot2.SavePng(file2, 800, 450);
            Console.WriteLine($"Erzeugt: {file2}");
        }

        static void GenerateHeatmapPlot(string root)
        {
            var targetDir = Path.Combine(root, "Folien", "02_Visualisierung_2D_Pixel", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            int width = 400;
            int height = 300;
            using var bitmap = new SKBitmap(width, height, SKColorType.Bgra8888, SKAlphaType.Premul);

            // Simulation eines 2D-Temperaturfeldes mit 2 Wärmequellen und 1 Wärmesenke
            for (int y = 0; y < height; y++)
            {
                for (int x = 0; x < width; x++)
                {
                    double dx1 = (x - 120) / 40.0;
                    double dy1 = (y - 100) / 40.0;
                    double t1 = Math.Exp(-(dx1 * dx1 + dy1 * dy1));

                    double dx2 = (x - 280) / 60.0;
                    double dy2 = (y - 180) / 60.0;
                    double t2 = 0.8 * Math.Exp(-(dx2 * dx2 + dy2 * dy2));

                    double temp = Math.Clamp(t1 + t2, 0.0, 1.0);

                    // Colormap Cool-Warm: Blau (kalt) -> Cyan -> Gelb -> Rot (heiß)
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
            Console.WriteLine($"Erzeugt: {outFile}");
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
            sig.LineWidth = 1.5f;

            plot.Title("High-Performance Signal-Plot (100.000 Messpunkte bei 60 FPS)");
            plot.XLabel("Zeit [s]");
            plot.YLabel("Zustand x(t)");
            plot.Axes.AutoScale();

            var outFile = Path.Combine(targetDir, "ScottPlot_Signal_Example.png");
            plot.SavePng(outFile, 800, 450);
            Console.WriteLine($"Erzeugt: {outFile}");
        }

        static void GenerateConvergencePlot(string root)
        {
            var targetDir = Path.Combine(root, "Folien", "08_Dynamische_Modelle_Kontinuierlich", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            // Testmodell: Gedämpftes Federpendel d²x/dt² + 2*zeta*w0*dx/dt + w0²*x = 0
            // mit w0 = 2*PI, zeta = 0.05
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
            sEuler.LineWidth = 2.5f;
            sEuler.MarkerSize = 8f;

            var sHeun = plot.Add.Scatter(logH, logErrHeun);
            sHeun.LegendText = "Heun / RK2 (Steigung 2 ~ O(h²))";
            sHeun.Color = Colors.RoyalBlue;
            sHeun.LineWidth = 2.5f;
            sHeun.MarkerSize = 8f;

            var sRk4 = plot.Add.Scatter(logH, logErrRk4);
            sRk4.LegendText = "Runge-Kutta 4 (Steigung 4 ~ O(h⁴))";
            sRk4.Color = Colors.SeaGreen;
            sRk4.LineWidth = 2.5f;
            sRk4.MarkerSize = 8f;

            plot.Title("Konvergenzordnung numerischer Solver (Log-Log-Plot)");
            plot.XLabel("log₁₀(Schrittweite h [s])");
            plot.YLabel("log₁₀(Globaler Fehler ||x(T) - x_analytisch(T)||)");
            plot.ShowLegend(Alignment.LowerRight);

            var outFile = Path.Combine(targetDir, "Solver_Konvergenzordnung.png");
            plot.SavePng(outFile, 850, 480);
            Console.WriteLine($"Erzeugt: {outFile}");
        }

        static void GenerateBoundaryConditionsPlot(string root)
        {
            var targetDir = Path.Combine(root, "Folien", "02_Visualisierung_2D_Pixel", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            int w = 180, h = 180;
            float[,] dirichlet = new float[w, h];
            float[,] neumann = new float[w, h];

            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    double dx = x - 50;
                    double dy = y - 50;
                    float val = (float)Math.Exp(-(dx * dx + dy * dy) / 350.0);
                    dirichlet[x, y] = val;
                    neumann[x, y] = val;
                }
            }

            float alpha = 0.2f;
            int steps = 120;

            float[,] nextD = new float[w, h];
            float[,] nextN = new float[w, h];

            for (int step = 0; step < steps; step++)
            {
                for (int y = 1; y < h - 1; y++)
                {
                    for (int x = 1; x < w - 1; x++)
                    {
                        float laplace = dirichlet[x + 1, y] + dirichlet[x - 1, y] +
                                        dirichlet[x, y + 1] + dirichlet[x, y - 1] - 4.0f * dirichlet[x, y];
                        nextD[x, y] = dirichlet[x, y] + alpha * laplace;
                    }
                }
                Array.Copy(nextD, dirichlet, dirichlet.Length);

                for (int y = 0; y < h; y++)
                {
                    neumann[0, y] = neumann[1, y];
                    neumann[w - 1, y] = neumann[w - 2, y];
                }
                for (int x = 0; x < w; x++)
                {
                    neumann[x, 0] = neumann[x, 1];
                    neumann[x, h - 1] = neumann[x, h - 2];
                }
                for (int y = 1; y < h - 1; y++)
                {
                    for (int x = 1; x < w - 1; x++)
                    {
                        float laplace = neumann[x + 1, y] + neumann[x - 1, y] +
                                        neumann[x, y + 1] + neumann[x, y - 1] - 4.0f * neumann[x, y];
                        nextN[x, y] = neumann[x, y] + alpha * laplace;
                    }
                }
                Array.Copy(nextN, neumann, neumann.Length);
            }

            int totalW = 420;
            int totalH = 460;
            using var bmp = new SKBitmap(totalW, totalH, SKColorType.Bgra8888, SKAlphaType.Premul);
            using var canvas = new SKCanvas(bmp);
            canvas.Clear(SKColors.White);

            using var paintText = new SKPaint
            {
                Color = new SKColor(20, 20, 20),
                TextSize = 15,
                IsAntialias = true,
                FakeBoldText = true
            };
            using var paintSub = new SKPaint
            {
                Color = new SKColor(80, 80, 80),
                TextSize = 12,
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

            canvas.DrawText("Dirichlet-Rand: Wärme entweicht", 20, 22, paintText);
            canvas.DrawText("T = 0 °C an Systemgrenzen", 20, 38, paintSub);
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    bmp.SetPixel(20 + x, 45 + y, ColorMap(dirichlet[x, y]));
                }
            }

            canvas.DrawText("Neumann-Rand: Adiabatisch isoliert", 20, 245, paintText);
            canvas.DrawText("dT/dn = 0 (Ghost Cells, Wärmereflexion)", 20, 261, paintSub);
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    bmp.SetPixel(20 + x, 268 + y, ColorMap(neumann[x, y]));
                }
            }

            using var image = SKImage.FromBitmap(bmp);
            using var data = image.Encode(SKEncodedImageFormat.Png, 100);
            var outFile = Path.Combine(targetDir, "Randbedingungen_Vergleich.png");
            using var stream = File.OpenWrite(outFile);
            data.SaveTo(stream);
            Console.WriteLine($"Erzeugt: {outFile}");
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
    }
}
