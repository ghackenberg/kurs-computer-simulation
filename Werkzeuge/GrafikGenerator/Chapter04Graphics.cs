using System;
using System.IO;
using System.Collections.Generic;
using ScottPlot;
using SkiaSharp;
using Microsoft.Msagl.Drawing;
using Microsoft.Msagl.Core.Layout;
using Microsoft.Msagl.Core.Geometry.Curves;
using Microsoft.Msagl.Miscellaneous;
using Microsoft.Msagl.Layout.Layered;
using Microsoft.Msagl.Layout.Incremental;

namespace GrafikGenerator
{
    public static class Chapter04Graphics
    {
        public static void Generate(string root)
        {
            var targetDir = Path.Combine(root, "Folien", "04_Visualisierung_2D_Diagramme", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            GenerateScottPlotScatter(targetDir);
            GenerateScottPlotKammscherKreis(targetDir);
            GenerateScottPlotSignalXY(targetDir);
            GenerateScottPlotVectorField(targetDir);
            GenerateScottPlotBars(targetDir);
            GenerateScottPlotHistogram(targetDir);
            GenerateScottPlotBoxPlot(targetDir);
            GenerateScottPlotHeatmap(targetDir);
            GenerateScottPlotFillY(targetDir);
            GenerateMsaglSugiyama(targetDir);
            GenerateMsaglForceDirected(targetDir);
            ForceDirectedVisualizer.GenerateAll(root);
        }

        private static void ApplyChapter04Typography(Plot plot, string title, string xLabel, string yLabel)
        {
            plot.Title(title);
            plot.XLabel(xLabel);
            plot.YLabel(yLabel);
            plot.Axes.Title.Label.FontSize = 28;
            plot.Axes.Title.Label.Bold = true;
            plot.Axes.Bottom.Label.FontSize = 22;
            plot.Axes.Bottom.Label.Bold = true;
            plot.Axes.Left.Label.FontSize = 22;
            plot.Axes.Left.Label.Bold = true;
            plot.Axes.Bottom.TickLabelStyle.FontSize = 18;
            plot.Axes.Left.TickLabelStyle.FontSize = 18;
            plot.Legend.FontSize = 18;
            plot.Axes.Margins(0.04, 0.06);
        }

        // 1. Scatter: Phasenraum DC-Motor Kennfeld (S1 Dauer vs. Peak Überlast)
        public static void GenerateScottPlotScatter(string targetDir)
        {
            var plot = new Plot();
            
            // Hyperbel thermische Leistungsgrenze Pmax = 1200 W -> M = Pmax / (2*pi*n/60)
            // Ab n = 955 U/min liegt die Hyperbel im darstellbaren Bereich M <= 12 Nm
            int nPoints = 80;
            double[] nHyp = new double[nPoints];
            double[] mHyp = new double[nPoints];
            for (int i = 0; i < nPoints; i++)
            {
                nHyp[i] = 955.0 + i * (2045.0 / (nPoints - 1)); // 955 bis 3000 U/min
                mHyp[i] = 1200.0 / (2.0 * Math.PI * (nHyp[i] / 60.0));
            }
            var hyp = plot.Add.ScatterLine(nHyp, mHyp);
            hyp.Color = ScottPlot.Colors.Crimson;
            hyp.LineWidth = 3.5f;
            hyp.LinePattern = LinePattern.Dashed;
            hyp.LegendText = "Dauerleistung P_max = 1.2 kW (S1)";

            // Trajektorie in 3 farbkodierten Betriebsphasen:
            // Phase 1: Hochlauf & kurzzeitiger Peak (S2 Überlast)
            double[] nPhase1 = { 0, 200, 600, 1200, 1600, 1900 };
            double[] mPhase1 = { 0, 9.2, 9.0,  8.5,  8.0,  7.0 };
            var traj1 = plot.Add.ScatterLine(nPhase1, mPhase1);
            traj1.Color = ScottPlot.Colors.SteelBlue;
            traj1.LineWidth = 4.5f;
            traj1.LegendText = "1. Hochlauf & Peak (S2)";

            // Phase 2: Annäherung an Solldrehzahl (Moment fällt ab)
            double[] nPhase2 = { 1900, 2200, 2450 };
            double[] mPhase2 = { 7.0,  5.2,  2.8 };
            var traj2 = plot.Add.ScatterLine(nPhase2, mPhase2);
            traj2.Color = ScottPlot.Colors.DarkCyan;
            traj2.LineWidth = 4.5f;
            traj2.LegendText = "2. Solldrehzahl (n-Limit)";

            // Phase 3: Lastaufschaltung & Einlaufen in stationären S1-Arbeitspunkt
            double[] nPhase3 = { 2450, 2400, 2350 };
            double[] mPhase3 = { 2.8,  3.6,  4.0 };
            var traj3 = plot.Add.ScatterLine(nPhase3, mPhase3);
            traj3.Color = ScottPlot.Colors.DarkOrange;
            traj3.LineWidth = 4.5f;
            traj3.LegendText = "3. Lastaufschaltung";

            var startMarker = plot.Add.Marker(0, 0, MarkerShape.FilledCircle, 12, ScottPlot.Colors.ForestGreen);
            startMarker.LegendText = "Startpunkt (0, 0)";
            var endMarker = plot.Add.Marker(2350, 4.0, MarkerShape.FilledSquare, 12, ScottPlot.Colors.DarkOrange);
            endMarker.LegendText = "Stationärer Arbeitspunkt";

            plot.ShowLegend(Alignment.UpperRight);
            ApplyChapter04Typography(plot, "Scatter: DC-Motor Phasenraum-Kennfeld", "Drehzahl n [U/min]", "Drehmoment M [Nm]");
            plot.Axes.SetLimits(0, 3200, 0, 12);

            var outFile = Path.Combine(targetDir, "ScottPlot_Scatter_Example.png");
            plot.SavePng(outFile, 900, 675);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        // 2. Scatter: Kamm'scher Kreis (Fahrphysik & G-G-Diagramm)
        public static void GenerateScottPlotKammscherKreis(string targetDir)
        {
            var plot = new Plot();

            // Achsenkreuz bei 0
            plot.Add.HorizontalLine(0, 1.5f, ScottPlot.Colors.Gray.WithAlpha(0.4f));
            plot.Add.VerticalLine(0, 1.5f, ScottPlot.Colors.Gray.WithAlpha(0.4f));

            // Haftgrenze mu * g = 1.0 g (Äußerer Kreis) und Grip-Grenze 0.8 g (Innerer Kreis)
            int circlePts = 120;
            double[] xOuter = new double[circlePts + 1];
            double[] yOuter = new double[circlePts + 1];
            double[] xInner = new double[circlePts + 1];
            double[] yInner = new double[circlePts + 1];
            for (int i = 0; i <= circlePts; i++)
            {
                double phi = i * 2.0 * Math.PI / circlePts;
                xOuter[i] = 1.0 * Math.Cos(phi);
                yOuter[i] = 1.0 * Math.Sin(phi);
                xInner[i] = 0.8 * Math.Cos(phi);
                yInner[i] = 0.8 * Math.Sin(phi);
            }

            var outerCircle = plot.Add.ScatterLine(xOuter, yOuter);
            outerCircle.Color = ScottPlot.Colors.Crimson;
            outerCircle.LineWidth = 3.5f;
            outerCircle.LegendText = "Haftgrenze μ·g = 1.0 g";

            var innerCircle = plot.Add.ScatterLine(xInner, yInner);
            innerCircle.Color = ScottPlot.Colors.DarkOrange;
            innerCircle.LineWidth = 2.2f;
            innerCircle.LinePattern = LinePattern.Dashed;
            innerCircle.LegendText = "Grip-Grenze 0.8·μ·g";

            // Synthetische Telemetriepunkte: Vollbremsung, Trail-Braking, Apex, Beschleunigen
            var ptsGreenX = new List<double>();
            var ptsGreenY = new List<double>();
            var ptsOrangeX = new List<double>();
            var ptsOrangeY = new List<double>();
            var ptsRedX = new List<double>();
            var ptsRedY = new List<double>();

            var rng = new Random(42);

            void AddPt(double ax, double ay)
            {
                double ares = Math.Sqrt(ax * ax + ay * ay);
                if (ares <= 0.8)
                {
                    ptsGreenX.Add(ay); // X: Querbeschleunigung
                    ptsGreenY.Add(ax); // Y: Längsbeschleunigung
                }
                else if (ares <= 1.0)
                {
                    ptsOrangeX.Add(ay);
                    ptsOrangeY.Add(ax);
                }
                else
                {
                    ptsRedX.Add(ay);
                    ptsRedY.Add(ax);
                }
            }

            // Vollbremsung
            for (double ax = 0; ax >= -0.92; ax -= 0.06)
            {
                AddPt(ax, (rng.NextDouble() - 0.5) * 0.08);
            }
            // Trail-Braking Linkskurve
            for (int step = 0; step < 14; step++)
            {
                double t = step / 13.0;
                double ax = -0.88 * (1.0 - t) - 0.08 * t + (rng.NextDouble() - 0.5) * 0.04;
                double ay = 0.1 * (1.0 - t) + 0.90 * t + (rng.NextDouble() - 0.5) * 0.04;
                AddPt(ax, ay);
            }
            // Apex / Scheitelpunkt am Haftungslimit
            for (int step = 0; step < 8; step++)
            {
                double ax = (rng.NextDouble() - 0.5) * 0.10;
                double ay = 0.90 + rng.NextDouble() * 0.16; // einige Peaks > 1.0g
                AddPt(ax, ay);
            }
            // Beschleunigen Kurvenausgang
            for (int step = 0; step < 12; step++)
            {
                double t = step / 11.0;
                double ax = 0.05 * (1.0 - t) + 0.65 * t + (rng.NextDouble() - 0.5) * 0.04;
                double ay = 0.85 * (1.0 - t) + 0.05 * t + (rng.NextDouble() - 0.5) * 0.04;
                AddPt(ax, ay);
            }

            if (ptsGreenX.Count > 0)
            {
                var sGreen = plot.Add.Scatter(ptsGreenX.ToArray(), ptsGreenY.ToArray());
                sGreen.Color = ScottPlot.Colors.ForestGreen;
                sGreen.MarkerSize = 10;
                sGreen.LineWidth = 0;
                sGreen.LegendText = "Linearer Grip (< 0.8 g)";
            }
            if (ptsOrangeX.Count > 0)
            {
                var sOrange = plot.Add.Scatter(ptsOrangeX.ToArray(), ptsOrangeY.ToArray());
                sOrange.Color = ScottPlot.Colors.DarkOrange;
                sOrange.MarkerSize = 10;
                sOrange.LineWidth = 0;
                sOrange.LegendText = "Grenzbereich (0.8 - 1.0 g)";
            }
            if (ptsRedX.Count > 0)
            {
                var sRed = plot.Add.Scatter(ptsRedX.ToArray(), ptsRedY.ToArray());
                sRed.Color = ScottPlot.Colors.Crimson;
                sRed.MarkerSize = 12;
                sRed.MarkerShape = MarkerShape.Cross;
                sRed.LineWidth = 0;
                sRed.LegendText = "Traktionsabriss (> 1.0 g)";
            }

            plot.ShowLegend(Alignment.UpperRight);
            ApplyChapter04Typography(plot, "Kamm'scher Kreis: G-G Telemetrie", "Querbeschleunigung a_y [g]", "Längsbeschleunigung a_x [g]");
            plot.Axes.SquareUnits();
            plot.Axes.SetLimits(-1.35, 1.35, -1.35, 1.35);

            var outFile = Path.Combine(targetDir, "ScottPlot_KammscherKreis_Example.png");
            plot.SavePng(outFile, 900, 675);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        // 2. SignalXY: Adaptive Zeitschritte (RK45)
        public static void GenerateScottPlotSignalXY(string targetDir)
        {
            var plot = new Plot();

            var xList = new List<double>();
            var yList = new List<double>();
            double t = 0.0;
            while (t <= 2.0)
            {
                xList.Add(t);
                double y = 1.0 - Math.Exp(-3.0 * t) * (Math.Cos(14.0 * t) + 0.25 * Math.Sin(14.0 * t));
                yList.Add(y);

                // Schrittweitensteuerung: Klein bei t < 0.6, groß bei t >= 0.6
                double dt = (t < 0.6) ? 0.006 : 0.04;
                t += dt;
            }

            var sig = plot.Add.SignalXY(xList.ToArray(), yList.ToArray());
            sig.Color = ScottPlot.Colors.RoyalBlue;
            sig.LineWidth = 3f;
            sig.MarkerSize = 7f; // Deutlich sichtbare Marker
            sig.LegendText = "SignalXY (Variable Schritte dt)";

            var target = plot.Add.HorizontalLine(1.0);
            target.Color = ScottPlot.Colors.Gray;
            target.LinePattern = LinePattern.Dashed;
            target.LineWidth = 2f;
            target.LegendText = "Sollwert w = 1.0";

            plot.ShowLegend();
            plot.Axes.SetLimits(0, 2.0, -0.1, 1.45);
            ApplyChapter04Typography(plot, "SignalXY: Adaptive Schrittweiten (RK45)", "Simulationszeit t [s]", "Zustand x(t)");

            var outFile = Path.Combine(targetDir, "ScottPlot_SignalXY_Example.png");
            plot.SavePng(outFile, 900, 675);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        // 3. VectorField: Phasenraum-Richtungsfeld
        public static void GenerateScottPlotVectorField(string targetDir)
        {
            var plot = new Plot();

            var vectors = new List<RootedCoordinateVector>();
            int gridN = 15;
            double min = -2.8, max = 2.8;
            double step = (max - min) / (gridN - 1);

            for (int i = 0; i < gridN; i++)
            {
                double x1 = min + i * step;
                for (int j = 0; j < gridN; j++)
                {
                    double x2 = min + j * step;
                    double dx1 = x2;
                    double dx2 = -x1 - 0.3 * x2;
                    double len = Math.Sqrt(dx1 * dx1 + dx2 * dx2);
                    if (len > 1e-6)
                    {
                        double scale = 0.22 / len;
                        var coord = new Coordinates(x1, x2);
                        // Beachte: In ScottPlot 5 verläuft die Y-Komponente von Vector2 im Bildschirmkoordinatensystem (nach unten positiv),
                        // daher muss dx2 für die mathematische Y-Achse invertiert werden (-dx2).
                        var dir = new System.Numerics.Vector2((float)(dx1 * scale), (float)(-dx2 * scale));
                        vectors.Add(new RootedCoordinateVector(coord, dir));
                    }
                }
            }

            plot.Add.VectorField(vectors, ScottPlot.Colors.SteelBlue.WithAlpha(0.65f));

            // Überlagerte Spiraltrajektorie
            int nTraj = 120;
            double[] trX = new double[nTraj];
            double[] trY = new double[nTraj];
            double simX = 2.5, simV = 0.0, dt = 0.05;
            for (int k = 0; k < nTraj; k++)
            {
                trX[k] = simX;
                trY[k] = simV;
                double ax = -simX - 0.3 * simV;
                simV += dt * ax;
                simX += dt * simV;
            }
            var traj = plot.Add.ScatterLine(trX, trY);
            traj.Color = ScottPlot.Colors.DarkOrange;
            traj.LineWidth = 4.0f;
            traj.LegendText = "Trajektorie x(t) [Spirale]";

            plot.ShowLegend();
            plot.Axes.SetLimits(-3.2, 3.2, -3.2, 3.2);
            ApplyChapter04Typography(plot, "VectorField: Phasenraum-Richtungsfeld", "Zustand x_1 (Auslenkung)", "Zustand x_2 (Geschwindigkeit)");

            var outFile = Path.Combine(targetDir, "ScottPlot_VectorField_Example.png");
            plot.SavePng(outFile, 900, 675);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        // 4. Bars: Gruppierte Balken für Variantenvergleich
        public static void GenerateScottPlotBars(string targetDir)
        {
            var plot = new Plot();

            double[] positions = { 1.0, 2.0, 3.0, 4.0 };
            double[] valuesA = { 15.2, 48.6, 92.4, 138.0 };
            double[] valuesB = { 11.4, 35.8, 71.2, 106.5 };
            double width = 0.32;

            var barsA = new List<Bar>();
            var barsB = new List<Bar>();
            for (int i = 0; i < positions.Length; i++)
            {
                barsA.Add(new Bar
                {
                    Position = positions[i] - width / 2.0,
                    Value = valuesA[i],
                    Size = width,
                    FillColor = ScottPlot.Colors.SteelBlue,
                    LineColor = ScottPlot.Colors.DarkBlue,
                    LineWidth = 1.5f
                });
                barsB.Add(new Bar
                {
                    Position = positions[i] + width / 2.0,
                    Value = valuesB[i],
                    Size = width,
                    FillColor = ScottPlot.Colors.DarkOrange,
                    LineColor = ScottPlot.Colors.SaddleBrown,
                    LineWidth = 1.5f
                });
            }

            plot.Add.Bars(barsA);
            plot.Add.Bars(barsB);

            var legA = plot.Add.Scatter(new double[] { 0 }, new double[] { 0 });
            legA.Color = ScottPlot.Colors.SteelBlue;
            legA.LineWidth = 8;
            legA.MarkerSize = 0;
            legA.LegendText = "Modell A (Baseline)";

            var legB = plot.Add.Scatter(new double[] { 0 }, new double[] { 0 });
            legB.Color = ScottPlot.Colors.DarkOrange;
            legB.LineWidth = 8;
            legB.MarkerSize = 0;
            legB.LegendText = "Modell B (Optimiert, -23%)";

            Tick[] ticks = {
                new(1.0, "Leerlauf"),
                new(2.0, "Teillast"),
                new(3.0, "Nennlast"),
                new(4.0, "Überlast")
            };
            plot.Axes.Bottom.TickGenerator = new ScottPlot.TickGenerators.NumericManual(ticks);

            plot.ShowLegend();
            plot.Axes.SetLimits(0.3, 4.7, 0, 160);
            ApplyChapter04Typography(plot, "Gruppierte Balken: Modellvergleich", "Betriebspunkt / Lastszenario", "Leistungsaufnahme [kW]");

            var outFile = Path.Combine(targetDir, "ScottPlot_Bars_Example.png");
            plot.SavePng(outFile, 900, 675);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        // 5. Histogram: Monte-Carlo Toleranzverteilung
        public static void GenerateScottPlotHistogram(string targetDir)
        {
            var plot = new Plot();

            var rand = new Random(42);
            int n = 10000;
            double mu = 100.0, sigma = 4.5;
            double[] samples = new double[n];
            for (int i = 0; i < n; i++)
            {
                double u1 = Math.Max(1e-10, rand.NextDouble());
                double u2 = rand.NextDouble();
                double z = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Cos(2.0 * Math.PI * u2);
                samples[i] = mu + sigma * z;
            }

            var hist = ScottPlot.Statistics.Histogram.WithBinCount(24, 84, 116);
            hist.AddRange(samples);

            var bars = new List<Bar>();
            for (int i = 0; i < hist.Counts.Length; i++)
            {
                bars.Add(new Bar
                {
                    Position = hist.Bins[i] + hist.FirstBinSize * 0.5,
                    Value = hist.Counts[i],
                    Size = hist.FirstBinSize * 0.88,
                    FillColor = ScottPlot.Colors.SteelBlue.WithAlpha(0.7f),
                    LineColor = ScottPlot.Colors.SteelBlue,
                    LineWidth = 1.5f
                });
            }
            plot.Add.Bars(bars);

            int nCurve = 100;
            double[] cx = new double[nCurve];
            double[] cy = new double[nCurve];
            double binWidth = hist.FirstBinSize;
            for (int i = 0; i < nCurve; i++)
            {
                cx[i] = 84.0 + i * (32.0 / (nCurve - 1));
                double pdf = (1.0 / (sigma * Math.Sqrt(2.0 * Math.PI))) * Math.Exp(-0.5 * Math.Pow((cx[i] - mu) / sigma, 2));
                cy[i] = pdf * n * binWidth;
            }
            var curve = plot.Add.ScatterLine(cx, cy);
            curve.Color = ScottPlot.Colors.Crimson;
            curve.LineWidth = 3.5f;
            curve.LegendText = "Dichte N(100, 4.5²)";

            var meanLine = plot.Add.VerticalLine(100.0);
            meanLine.Color = ScottPlot.Colors.ForestGreen;
            meanLine.LineWidth = 2.5f;
            meanLine.LinePattern = LinePattern.Dashed;
            meanLine.LegendText = "Mittelwert μ = 100 mm";

            plot.ShowLegend();
            plot.Axes.SetLimits(82, 118, 0, hist.Counts.Max() * 1.15);
            ApplyChapter04Typography(plot, "Histogramm: Monte-Carlo Toleranzanalyse", "Bauteillänge [mm]", "Absolute Häufigkeit");

            var outFile = Path.Combine(targetDir, "ScottPlot_Histogram_Example.png");
            plot.SavePng(outFile, 900, 675);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        // 6. BoxPlot: Vergleich 3er Regelungsstrategien
        public static void GenerateScottPlotBoxPlot(string targetDir)
        {
            var plot = new Plot();

            var b1 = new Box
            {
                Position = 1,
                BoxMin = 8.2,
                BoxMiddle = 12.5,
                BoxMax = 17.0,
                WhiskerMin = 4.0,
                WhiskerMax = 23.5,
                FillColor = ScottPlot.Colors.SteelBlue.WithAlpha(0.6f),
                LineColor = ScottPlot.Colors.SteelBlue,
                LineWidth = 2.0f
            };

            var b2 = new Box
            {
                Position = 2,
                BoxMin = 3.8,
                BoxMiddle = 6.2,
                BoxMax = 9.5,
                WhiskerMin = 1.5,
                WhiskerMax = 14.0,
                FillColor = ScottPlot.Colors.ForestGreen.WithAlpha(0.6f),
                LineColor = ScottPlot.Colors.ForestGreen,
                LineWidth = 2.0f
            };

            var b3 = new Box
            {
                Position = 3,
                BoxMin = 1.2,
                BoxMiddle = 2.8,
                BoxMax = 4.2,
                WhiskerMin = 0.4,
                WhiskerMax = 6.5,
                FillColor = ScottPlot.Colors.DarkOrange.WithAlpha(0.6f),
                LineColor = ScottPlot.Colors.DarkOrange,
                LineWidth = 2.0f
            };

            plot.Add.Boxes(new[] { b1, b2, b3 });

            Tick[] ticks = {
                new(1.0, "P-Regler"),
                new(2.0, "PI-Regler"),
                new(3.0, "PID-Regler")
            };
            plot.Axes.Bottom.TickGenerator = new ScottPlot.TickGenerators.NumericManual(ticks);

            plot.Axes.SetLimits(0.3, 3.7, 0, 26);
            ApplyChapter04Typography(plot, "Box-Plot: Gütevergleich Regelungsstrategien", "Reglertyp", "Einschwingzeit t_s [s]");

            var outFile = Path.Combine(targetDir, "ScottPlot_BoxPlot_Example.png");
            plot.SavePng(outFile, 900, 675);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        // 7. Heatmap: 2D-Temperaturfeld mit ColorBar
        public static void GenerateScottPlotHeatmap(string targetDir)
        {
            var plot = new Plot();

            int size = 50;
            double[,] intensities = new double[size, size];
            for (int i = 0; i < size; i++)
            {
                double x = (i - size / 2.0) / (size / 2.0);
                for (int j = 0; j < size; j++)
                {
                    double y = (j - size / 2.0) / (size / 2.0);
                    double r2 = x * x + y * y;
                    intensities[i, j] = 20.0 + 80.0 * Math.Exp(-2.5 * r2) + 15.0 * Math.Sin(3.0 * x) * Math.Cos(3.0 * y);
                }
            }

            var hm = plot.Add.Heatmap(intensities);
            hm.Colormap = new ScottPlot.Colormaps.Turbo();
            
            var cb = plot.Add.ColorBar(hm);
            cb.Label = "Temperatur T [°C]";
            cb.LabelStyle.FontSize = 20;

            plot.Axes.SetLimits(0, size, 0, size);
            ApplyChapter04Typography(plot, "Heatmap & ColorBar: 2D-Temperaturfeld (FDM)", "Knotenkoordinate x", "Knotenkoordinate y");

            var outFile = Path.Combine(targetDir, "ScottPlot_Heatmap_Example.png");
            plot.SavePng(outFile, 900, 675);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        // 8. FillY: Live-Telemetrie Toleranzband
        public static void GenerateScottPlotFillY(string targetDir)
        {
            var plot = new Plot();

            int n = 200;
            double[] xs = new double[n];
            double[] mu = new double[n];
            double[] yUpper = new double[n];
            double[] yLower = new double[n];
            double[] sensor = new double[n];

            var rand = new Random(42);
            for (int i = 0; i < n; i++)
            {
                xs[i] = i * 0.01;
                mu[i] = 50.0 + 15.0 * Math.Sin(2.0 * Math.PI * 1.0 * xs[i]);
                yUpper[i] = mu[i] + 6.0;
                yLower[i] = mu[i] - 6.0;

                double noise = (rand.NextDouble() - 0.5) * 3.5;
                if (xs[i] >= 1.30 && xs[i] <= 1.45)
                {
                    noise += 12.0 * Math.Sin(Math.PI * (xs[i] - 1.30) / 0.15);
                }
                sensor[i] = mu[i] + noise;
            }

            var fill = plot.Add.FillY(xs, yLower, yUpper);
            fill.FillColor = ScottPlot.Colors.CornflowerBlue.WithAlpha(0.35f);
            fill.LineColor = ScottPlot.Colors.CornflowerBlue.WithAlpha(0.8f);
            fill.LineWidth = 1.5f;

            var meanLine = plot.Add.ScatterLine(xs, mu);
            meanLine.Color = ScottPlot.Colors.MidnightBlue;
            meanLine.LineWidth = 3.0f;
            meanLine.LegendText = "Nennsignal μ(t)";

            var sensLine = plot.Add.ScatterLine(xs, sensor);
            sensLine.Color = ScottPlot.Colors.Crimson;
            sensLine.LineWidth = 2.5f;
            sensLine.LegendText = "Sensor y(t) mit Anomalie";

            var dummyBand = plot.Add.Scatter(new double[] { 0 }, new double[] { 0 });
            dummyBand.Color = ScottPlot.Colors.CornflowerBlue;
            dummyBand.LineWidth = 8;
            dummyBand.MarkerSize = 0;
            dummyBand.LegendText = "Toleranzkorridor μ ± 3σ";

            plot.ShowLegend();
            plot.Axes.SetLimits(0, 2.0, 25, 80);
            ApplyChapter04Typography(plot, "FillY: Dynamischer Toleranzkorridor", "Simulationszeit t [s]", "Messwert [bar]");

            var outFile = Path.Combine(targetDir, "ScottPlot_FillY_Example.png");
            plot.SavePng(outFile, 900, 675);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        // 9. MSAGL: Sugiyama Hierarchisches Regelkreis-Layout
        public static void GenerateMsaglSugiyama(string targetDir)
        {
            var graph = new Microsoft.Msagl.Drawing.Graph("Regelkreis");
            graph.Attr.BackgroundColor = Microsoft.Msagl.Drawing.Color.White;

            graph.AddEdge("Sollwert w(t)", "Summierer");
            graph.AddEdge("Summierer", "PID-Regler");
            graph.AddEdge("PID-Regler", "Leistungsaktor");
            graph.AddEdge("Leistungsaktor", "Regelstrecke");
            graph.AddEdge("Störgröße z(t)", "Regelstrecke");
            graph.AddEdge("Regelstrecke", "Istwert y(t)");
            graph.AddEdge("Regelstrecke", "Sensor");
            graph.AddEdge("Sensor", "Summierer");

            foreach (var node in graph.Nodes)
            {
                node.LabelText = node.Id;
                node.Attr.FillColor = Microsoft.Msagl.Drawing.Color.AliceBlue;
                node.Attr.Color = Microsoft.Msagl.Drawing.Color.SteelBlue;
                node.Attr.LineWidth = 2;
                node.Attr.Shape = Microsoft.Msagl.Drawing.Shape.Box;
                node.Attr.Padding = 6;
            }
            graph.FindNode("PID-Regler").Attr.FillColor = Microsoft.Msagl.Drawing.Color.LightSteelBlue;
            graph.FindNode("Regelstrecke").Attr.FillColor = Microsoft.Msagl.Drawing.Color.Moccasin;

            var geomGraph = new Microsoft.Msagl.Core.Layout.GeometryGraph();
            foreach (var n in graph.Nodes)
            {
                double w = Math.Max(120, n.Id.Length * 11.0);
                var geomNode = new Microsoft.Msagl.Core.Layout.Node(
                    CurveFactory.CreateRectangle(w, 48, new Microsoft.Msagl.Core.Geometry.Point(0, 0)),
                    n
                );
                n.GeometryNode = geomNode;
                geomGraph.Nodes.Add(geomNode);
            }
            foreach (var e in graph.Edges)
            {
                var geomEdge = new Microsoft.Msagl.Core.Layout.Edge(e.SourceNode.GeometryNode, e.TargetNode.GeometryNode);
                e.GeometryEdge = geomEdge;
                geomGraph.Edges.Add(geomEdge);
            }
            graph.GeometryGraph = geomGraph;

            var settings = new SugiyamaLayoutSettings
            {
                Transformation = PlaneTransformation.Rotation(0)
            };
            LayoutHelpers.CalculateLayout(geomGraph, settings, null);

            var pngFile = Path.Combine(targetDir, "MSAGL_Sugiyama_Layout.png");
            ExportMsaglGraph(graph, geomGraph, pngFile, "Sugiyama-Layout: Mechatronischer Regelkreis (MSAGL)");
            Console.WriteLine($"Erzeugt (MSAGL PNG): {pngFile}");
        }

        // 10. MSAGL: Force-Directed Organisches Netzwerk-Layout
        public static void GenerateMsaglForceDirected(string targetDir)
        {
            var graph = new Microsoft.Msagl.Drawing.Graph("Netzwerk");
            graph.Attr.BackgroundColor = Microsoft.Msagl.Drawing.Color.White;

            // Cluster 1: CNC-Bearbeitungsstation
            graph.AddEdge("Gateway-A", "SPS-CNC");
            graph.AddEdge("Gateway-A", "Spindel-Sensor");
            graph.AddEdge("Gateway-A", "Kühlmitteldruck");
            graph.AddEdge("Gateway-A", "Werkzeug-Kamera");
            graph.AddEdge("SPS-CNC", "Spindel-Sensor");
            graph.AddEdge("SPS-CNC", "Kühlmitteldruck");

            // Cluster 2: Roboter-Handling
            graph.AddEdge("Gateway-B", "Roboter-SPS");
            graph.AddEdge("Gateway-B", "Greifer-Sensorik");
            graph.AddEdge("Gateway-B", "Gelenk-Drehgeber");
            graph.AddEdge("Gateway-B", "Sicherheitsradar");
            graph.AddEdge("Roboter-SPS", "Greifer-Sensorik");
            graph.AddEdge("Roboter-SPS", "Gelenk-Drehgeber");

            // Cluster-Kopplung & Cloud
            graph.AddEdge("Gateway-A", "Gateway-B");
            graph.AddEdge("SPS-CNC", "Roboter-SPS");
            graph.AddEdge("Gateway-A", "Edge-Cloud");
            graph.AddEdge("Gateway-B", "Edge-Cloud");

            foreach (var node in graph.Nodes)
            {
                node.LabelText = node.Id;
                node.Attr.FillColor = Microsoft.Msagl.Drawing.Color.WhiteSmoke;
                node.Attr.Color = Microsoft.Msagl.Drawing.Color.DarkSlateGray;
                node.Attr.LineWidth = 2;
                node.Attr.Shape = Microsoft.Msagl.Drawing.Shape.Ellipse;
                node.Attr.Padding = 8;
            }

            // Cluster 1 Farbgebung: Soft Blue
            string[] cluster1 = { "SPS-CNC", "Spindel-Sensor", "Kühlmitteldruck", "Werkzeug-Kamera" };
            foreach (var id in cluster1)
            {
                var n = graph.FindNode(id);
                if (n != null) { n.Attr.FillColor = new Microsoft.Msagl.Drawing.Color(224, 242, 254); n.Attr.Color = Microsoft.Msagl.Drawing.Color.SteelBlue; }
            }

            // Cluster 2 Farbgebung: Soft Amber
            string[] cluster2 = { "Roboter-SPS", "Greifer-Sensorik", "Gelenk-Drehgeber", "Sicherheitsradar" };
            foreach (var id in cluster2)
            {
                var n = graph.FindNode(id);
                if (n != null) { n.Attr.FillColor = new Microsoft.Msagl.Drawing.Color(254, 237, 213); n.Attr.Color = Microsoft.Msagl.Drawing.Color.DarkOrange; }
            }

            // Gateways: Soft Emerald
            var nGwA = graph.FindNode("Gateway-A");
            if (nGwA != null) { nGwA.Attr.FillColor = new Microsoft.Msagl.Drawing.Color(220, 252, 231); nGwA.Attr.Color = Microsoft.Msagl.Drawing.Color.SeaGreen; }
            var nGwB = graph.FindNode("Gateway-B");
            if (nGwB != null) { nGwB.Attr.FillColor = new Microsoft.Msagl.Drawing.Color(220, 252, 231); nGwB.Attr.Color = Microsoft.Msagl.Drawing.Color.SeaGreen; }

            // Cloud: Soft Purple
            var nCloud = graph.FindNode("Edge-Cloud");
            if (nCloud != null) { nCloud.Attr.FillColor = new Microsoft.Msagl.Drawing.Color(243, 232, 255); nCloud.Attr.Color = Microsoft.Msagl.Drawing.Color.Purple; }

            var geomGraph = new Microsoft.Msagl.Core.Layout.GeometryGraph();
            foreach (var n in graph.Nodes)
            {
                double w = Math.Max(120, n.Id.Length * 9.5);
                var geomNode = new Microsoft.Msagl.Core.Layout.Node(
                    CurveFactory.CreateRectangle(w, 42, new Microsoft.Msagl.Core.Geometry.Point(0, 0)),
                    n
                );
                n.GeometryNode = geomNode;
                geomGraph.Nodes.Add(geomNode);
            }
            foreach (var e in graph.Edges)
            {
                var geomEdge = new Microsoft.Msagl.Core.Layout.Edge(e.SourceNode.GeometryNode, e.TargetNode.GeometryNode);
                e.GeometryEdge = geomEdge;
                geomGraph.Edges.Add(geomEdge);
            }
            graph.GeometryGraph = geomGraph;

            var settings = new Microsoft.Msagl.Layout.MDS.MdsLayoutSettings();
            LayoutHelpers.CalculateLayout(geomGraph, settings, null);

            var pngFile = Path.Combine(targetDir, "MSAGL_ForceDirected_Layout.png");
            ExportMsaglGraph(graph, geomGraph, pngFile, "Force-Directed Layout: IoT-Sensornetzwerk (MSAGL)");
            Console.WriteLine($"Erzeugt (MSAGL PNG): {pngFile}");
        }

        private static void ExportMsaglGraph(
            Microsoft.Msagl.Drawing.Graph graph,
            Microsoft.Msagl.Core.Layout.GeometryGraph geomGraph,
            string pngPath,
            string title)
        {
            var bbox = geomGraph.BoundingBox;
            double pad = 40.0;
            double topHeader = 60.0;
            double w = bbox.Width + 2 * pad;
            double h = bbox.Height + 2 * pad + topHeader;

            // Render HiDPI PNG using SkiaSharp (1200x900 target format)
            int imgW = 1200;
            int imgH = 900;
            using var bitmap = new SKBitmap(imgW, imgH);
            using var canvas = new SKCanvas(bitmap);
            canvas.Clear(SKColors.White);

            float scale = Math.Min((float)imgW / (float)w, (float)imgH / (float)h) * 0.95f;
            float offsetX = ((imgW - (float)w * scale) / 2.0f);
            float offsetY = ((imgH - (float)h * scale) / 2.0f);

            canvas.Translate(offsetX, offsetY);
            canvas.Scale(scale);

            // Background card
            using var bgPaint = new SKPaint { Color = SKColor.Parse("#f8fafc"), IsAntialias = true };
            using var bgStroke = new SKPaint { Color = SKColor.Parse("#cbd5e1"), IsAntialias = true, Style = SKPaintStyle.Stroke, StrokeWidth = 2f };
            canvas.DrawRoundRect(new SKRoundRect(new SKRect(0, 0, (float)w, (float)h), 12, 12), bgPaint);
            canvas.DrawRoundRect(new SKRoundRect(new SKRect(0, 0, (float)w, (float)h), 12, 12), bgStroke);

            // Title
            using var titlePaint = new SKPaint { Color = SKColor.Parse("#004B96"), TextSize = 22f, IsAntialias = true, TextAlign = SKTextAlign.Center, Typeface = SKTypeface.FromFamilyName("Segoe UI", SKFontStyleWeight.Bold, SKFontStyleWidth.Normal, SKFontStyleSlant.Upright) };
            canvas.DrawText(title, (float)w / 2f, 38f, titlePaint);

            // Edges Paint
            using var edgePaint = new SKPaint { Color = SKColor.Parse("#475569"), StrokeWidth = 2.5f, IsAntialias = true, Style = SKPaintStyle.Stroke };
            using var arrowPaint = new SKPaint { Color = SKColor.Parse("#334155"), Style = SKPaintStyle.Fill, IsAntialias = true };

            foreach (var edge in graph.Edges)
            {
                var ge = edge.GeometryEdge;
                if (ge?.Curve != null)
                {
                    var curve = ge.Curve;
                    float sx = (float)(curve.Start.X - bbox.Left + pad);
                    float sy = (float)(bbox.Top - curve.Start.Y + pad + topHeader);
                    float ex = (float)(curve.End.X - bbox.Left + pad);
                    float ey = (float)(bbox.Top - curve.End.Y + pad + topHeader);

                    using var skPath = new SKPath();
                    skPath.MoveTo(sx, sy);
                    if (curve is Curve c)
                    {
                        foreach (var seg in c.Segments)
                        {
                            if (seg is CubicBezierSegment cb)
                            {
                                float p1x = (float)(cb.B(1).X - bbox.Left + pad);
                                float p1y = (float)(bbox.Top - cb.B(1).Y + pad + topHeader);
                                float p2x = (float)(cb.B(2).X - bbox.Left + pad);
                                float p2y = (float)(bbox.Top - cb.B(2).Y + pad + topHeader);
                                float p3x = (float)(cb.B(3).X - bbox.Left + pad);
                                float p3y = (float)(bbox.Top - cb.B(3).Y + pad + topHeader);
                                skPath.CubicTo(p1x, p1y, p2x, p2y, p3x, p3y);
                            }
                            else if (seg is LineSegment ls)
                            {
                                float lx = (float)(ls.End.X - bbox.Left + pad);
                                float ly = (float)(bbox.Top - ls.End.Y + pad + topHeader);
                                skPath.LineTo(lx, ly);
                            }
                        }
                    }
                    else
                    {
                        skPath.LineTo(ex, ey);
                    }
                    canvas.DrawPath(skPath, edgePaint);

                    // Draw Arrowhead at End
                    float angle = (float)Math.Atan2(ey - sy, ex - sx);
                    float arrowLen = 10f;
                    using var arrPath = new SKPath();
                    arrPath.MoveTo(ex, ey);
                    arrPath.LineTo(ex - arrowLen * (float)Math.Cos(angle - 0.4), ey - arrowLen * (float)Math.Sin(angle - 0.4));
                    arrPath.LineTo(ex - arrowLen * (float)Math.Cos(angle + 0.4), ey - arrowLen * (float)Math.Sin(angle + 0.4));
                    arrPath.Close();
                    canvas.DrawPath(arrPath, arrowPaint);
                }
            }

            // Nodes Paint
            using var textPaint = new SKPaint { Color = SKColor.Parse("#0f172a"), TextSize = 14f, IsAntialias = true, TextAlign = SKTextAlign.Center, Typeface = SKTypeface.FromFamilyName("Segoe UI", SKFontStyleWeight.Bold, SKFontStyleWidth.Normal, SKFontStyleSlant.Upright) };
            foreach (var node in graph.Nodes)
            {
                var gn = node.GeometryNode;
                if (gn != null)
                {
                    float nx = (float)(gn.Center.X - bbox.Left + pad - gn.BoundingBox.Width / 2.0);
                    float ny = (float)(bbox.Top - gn.Center.Y + pad + topHeader - gn.BoundingBox.Height / 2.0);
                    float nw = (float)gn.BoundingBox.Width;
                    float nh = (float)gn.BoundingBox.Height;

                    using var nodeFill = new SKPaint { Color = new SKColor(node.Attr.FillColor.R, node.Attr.FillColor.G, node.Attr.FillColor.B), Style = SKPaintStyle.Fill, IsAntialias = true };
                    using var nodeStroke = new SKPaint { Color = new SKColor(node.Attr.Color.R, node.Attr.Color.G, node.Attr.Color.B), Style = SKPaintStyle.Stroke, StrokeWidth = 2.5f, IsAntialias = true };

                    canvas.DrawRoundRect(new SKRoundRect(new SKRect(nx, ny, nx + nw, ny + nh), 8, 8), nodeFill);
                    canvas.DrawRoundRect(new SKRoundRect(new SKRect(nx, ny, nx + nw, ny + nh), 8, 8), nodeStroke);
                    canvas.DrawText(node.Id, nx + nw / 2f, ny + nh / 2f + 5f, textPaint);
                }
            }

            using var image = SKImage.FromBitmap(bitmap);
            using var data = image.Encode(SKEncodedImageFormat.Png, 100);
            using var fs = File.Create(pngPath);
            data.SaveTo(fs);
        }
    }
}
