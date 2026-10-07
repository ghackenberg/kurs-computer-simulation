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
            GenerateSignalPlot(root);

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
    }
}
