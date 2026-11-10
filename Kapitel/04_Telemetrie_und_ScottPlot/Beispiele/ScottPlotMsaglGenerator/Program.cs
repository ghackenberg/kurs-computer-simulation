using System;
using System.IO;
using ScottPlot;

namespace GrafikGenerator
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

            Chapter04Graphics.Generate(root);
            GenerateSignalPlot(root);
        }

        static void GenerateSignalPlot(string root)
        {
            var targetDir = Path.Combine(root, "Kapitel", "04_Telemetrie_und_ScottPlot", "Folien", "Illustrationen");
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
            sig.LineWidth = 3.5f;

            plot.Title("Signal-Plot: 100.000 Punkte (60 FPS)");
            plot.XLabel("Zeit t [s]");
            plot.YLabel("Zustand x(t)");
            plot.Axes.AutoScale();
            plot.Axes.Title.Label.FontSize = 32;
            plot.Axes.Title.Label.Bold = true;
            plot.Axes.Bottom.Label.FontSize = 26;
            plot.Axes.Bottom.Label.Bold = true;
            plot.Axes.Left.Label.FontSize = 26;
            plot.Axes.Left.Label.Bold = true;
            plot.Axes.Bottom.TickLabelStyle.FontSize = 20;
            plot.Axes.Left.TickLabelStyle.FontSize = 20;
            plot.Axes.Margins(0.02, 0.05);

            var outFile = Path.Combine(targetDir, "ScottPlot_Signal_Example.png");
            plot.SavePng(outFile, 900, 675);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }
    }
}
