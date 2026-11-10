using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using ScottPlot;

namespace DesWarteschlangenPlotGenerator
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

            var targetDir = Path.Combine(root, "Kapitel", "09_Diskrete_Systeme_DES", "Folien", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            var plot1 = new Plot();
            double[] t = { 0, 1.2, 1.2, 2.5, 2.5, 3.8, 4.1, 4.1, 5.0, 6.2, 6.2, 7.5, 8.0, 9.1, 9.1, 10.0 };
            double[] q = { 0, 0,   1,   1,   2,   2,   2,   1,   1,   1,   0,   0,   1,   1,   0,   0 };
            var line = plot1.Add.ScatterLine(t, q);
            line.Color = Colors.SteelBlue; line.LineWidth = 4f;
            plot1.Title("Verlauf der Warteschlangenlänge L(t)");
            plot1.XLabel("Simulationszeit t [min]"); plot1.YLabel("Kunden in der Warteschlange");
            plot1.Axes.SetLimits(0, 10, -0.2, 3.5);
            plot1.SavePng(Path.Combine(targetDir, "Queue_Laenge_Verlauf.png"), 1600, 900);

            var plot2 = new Plot();
            var rand = new Random(42);
            var waitTimes = Enumerable.Range(0, 500).Select(_ => -2.5 * Math.Log(1.0 - rand.NextDouble())).ToArray();
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
            plot2.XLabel("Wartezeit W [min]"); plot2.YLabel("Absolute Häufigkeit");
            plot2.Axes.SetLimits(0, 15, 0, hist.Counts.Max() * 1.15);
            plot2.SavePng(Path.Combine(targetDir, "Queue_Wartezeit_Histogramm.png"), 1600, 900);
        }
    }
}
