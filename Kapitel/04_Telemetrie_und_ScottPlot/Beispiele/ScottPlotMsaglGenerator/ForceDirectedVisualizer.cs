using System;
using System.IO;
using System.Text;
using System.Globalization;
using System.Collections.Generic;

namespace GrafikGenerator
{
    public static class ForceDirectedVisualizer
    {
        public class Node
        {
            public double X { get; set; }
            public double Y { get; set; }
            public double Fx { get; set; }
            public double Fy { get; set; }
        }

        public class Snapshot
        {
            public int Iteration { get; set; }
            public double Temp { get; set; }
            public double MaxForce { get; set; }
            public double ForceSum { get; set; }
            public string Title { get; set; } = "";
            public string Subtitle { get; set; } = "";
            public string Badge { get; set; } = "";
            public List<(double X, double Y, double Fx, double Fy)> Nodes { get; set; } = new();
        }

        public static void GenerateAll(string root)
        {
            var diagramDir = Path.Combine(root, "Kapitel", "04_Telemetrie_und_ScottPlot", "Folien", "Diagramme");
            Directory.CreateDirectory(diagramDir);

            // 5 Nodes: 4 perimeter nodes + 1 center hub (Wheel Graph W4)
            var nodes = new List<Node>
            {
                new Node { X = 55.0,  Y = 50.0 },  // 0: top-left
                new Node { X = 195.0, Y = 55.0 },  // 1: top-right
                new Node { X = 185.0, Y = 135.0 }, // 2: bottom-right
                new Node { X = 65.0,  Y = 140.0 }, // 3: bottom-left
                new Node { X = 135.0, Y = 110.0 }  // 4: center hub
            };

            var edges = new List<(int, int)>
            {
                (0, 1), (1, 2), (2, 3), (3, 0), // Perimeter ring
                (4, 0), (4, 1), (4, 2), (4, 3)  // Spokes to center hub
            };

            double l0 = 70.0;     // Rest length of springs
            double ks = 0.045;    // Spring constant
            double kr = 4800.0;   // Coulomb repulsion constant
            double temp = 14.0;   // Simulated annealing temperature
            double cooling = 0.92;

            var snapshots = new List<Snapshot>();
            var matrixMilestones = new HashSet<int> { 0, 2, 5, 10, 20, 50 };

            for (int iter = 0; iter <= 50; iter++)
            {
                // Reset forces
                foreach (var n in nodes)
                {
                    n.Fx = 0;
                    n.Fy = 0;
                }

                // 1. Pairwise Coulomb repulsion between all node pairs (N*(N-1)/2 = 10 pairs)
                for (int i = 0; i < nodes.Count; i++)
                {
                    for (int j = i + 1; j < nodes.Count; j++)
                    {
                        double dx = nodes[i].X - nodes[j].X;
                        double dy = nodes[i].Y - nodes[j].Y;
                        double dist = Math.Max(10.0, Math.Sqrt(dx * dx + dy * dy));
                        double f = kr / (dist * dist);
                        double fx = (dx / dist) * f;
                        double fy = (dy / dist) * f;

                        nodes[i].Fx += fx;
                        nodes[i].Fy += fy;
                        nodes[j].Fx -= fx;
                        nodes[j].Fy -= fy;
                    }
                }

                // 2. Hooke spring forces along all 8 edges
                foreach (var (u, v) in edges)
                {
                    double dx = nodes[v].X - nodes[u].X;
                    double dy = nodes[v].Y - nodes[u].Y;
                    double dist = Math.Max(1.0, Math.Sqrt(dx * dx + dy * dy));
                    double f = ks * (dist - l0);
                    double fx = (dx / dist) * f;
                    double fy = (dy / dist) * f;

                    nodes[u].Fx += fx;
                    nodes[u].Fy += fy;
                    nodes[v].Fx -= fx;
                    nodes[v].Fy -= fy;
                }

                // Collect snapshot if milestone
                if (matrixMilestones.Contains(iter))
                {
                    double maxF = 0;
                    double forceSum = 0;
                    var snapNodes = new List<(double X, double Y, double Fx, double Fy)>();
                    foreach (var n in nodes)
                    {
                        double fLen = Math.Sqrt(n.Fx * n.Fx + n.Fy * n.Fy);
                        maxF = Math.Max(maxF, fLen);
                        forceSum += fLen;
                        snapNodes.Add((n.X, n.Y, n.Fx, n.Fy));
                    }

                    var snap = new Snapshot
                    {
                        Iteration = iter,
                        Temp = temp,
                        MaxForce = maxF,
                        ForceSum = forceSum,
                        Nodes = snapNodes
                    };

                    if (iter == 0)
                    {
                        snap.Title = "Iteration 0: Startzustand";
                        snap.Subtitle = "Chaotische Lage, kreuzende Kanten";
                        snap.Badge = $"Max. Kraft ||F_net|| = {maxF.ToString("F1", CultureInfo.InvariantCulture)} N | Schrittweite: {temp.ToString("F1", CultureInfo.InvariantCulture)}";
                    }
                    else if (iter == 2)
                    {
                        snap.Title = "Iteration 2: Coulomb-Expansion";
                        snap.Subtitle = "Starke Abstoßung sprengt Knotenklumpen";
                        snap.Badge = $"Max. Kraft ||F_net|| = {maxF.ToString("F1", CultureInfo.InvariantCulture)} N | Schrittweite: {temp.ToString("F1", CultureInfo.InvariantCulture)}";
                    }
                    else if (iter == 5)
                    {
                        snap.Title = "Iteration 5: Entflechtung";
                        snap.Subtitle = "Kanten kreuzungsfrei, Federn wirken";
                        snap.Badge = $"Max. Kraft ||F_net|| = {maxF.ToString("F1", CultureInfo.InvariantCulture)} N | Schrittweite: {temp.ToString("F1", CultureInfo.InvariantCulture)}";
                    }
                    else if (iter == 10)
                    {
                        snap.Title = "Iteration 10: Dämpfungseinsatz";
                        snap.Subtitle = "Dämpfung reduziert die Schrittweite";
                        snap.Badge = $"Dämpfung greift: Schrittweite = {temp.ToString("F1", CultureInfo.InvariantCulture)} | ||F_net|| = {maxF.ToString("F1", CultureInfo.InvariantCulture)} N";
                    }
                    else if (iter == 20)
                    {
                        snap.Title = "Iteration 20: Feinjustierung";
                        snap.Subtitle = "Kanten nähern sich der Soll-Federlänge";
                        snap.Badge = $"Feinjustierung: Schrittweite = {temp.ToString("F1", CultureInfo.InvariantCulture)} | ||F_net|| = {maxF.ToString("F1", CultureInfo.InvariantCulture)} N";
                    }
                    else // 50
                    {
                        snap.Title = "Iteration 50: Kräftegleichgewicht";
                        snap.Subtitle = "Stationärer Stillstand: Summe F_net &#8776; 0";
                        snap.Badge = "Gleichgewicht erreicht: ||F_net|| &lt; 0.01 N (Stillstand)";
                    }

                    snapshots.Add(snap);
                }

                // 3. Damped Euler step
                foreach (var n in nodes)
                {
                    double fLen = Math.Sqrt(n.Fx * n.Fx + n.Fy * n.Fy);
                    if (fLen > 0.01)
                    {
                        double step = Math.Min(temp, fLen * 0.4);
                        n.X += (n.Fx / fLen) * step;
                        n.Y += (n.Fy / fLen) * step;
                        n.X = Math.Clamp(n.X, 30.0, 220.0);
                        n.Y = Math.Clamp(n.Y, 25.0, 160.0);
                    }
                }

                temp *= cooling;
            }

            // Generate 3x2 Matrix SVG (single active slide diagram)
            GenerateMatrixSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Matrix.svg"), snapshots, edges);

            Console.WriteLine("Mini_ForceDirected_Matrix.svg erfolgreich erzeugt!");
        }

        private static void GenerateMatrixSvg(string filePath, List<Snapshot> snapshots, List<(int, int)> edges)
        {
            var inv = CultureInfo.InvariantCulture;
            var sb = new StringBuilder();
            sb.AppendLine("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1110 470\" width=\"1110\" height=\"470\">");
            sb.AppendLine("  <defs>");
            sb.AppendLine("    <style>");
            sb.AppendLine("      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; }");
            sb.AppendLine("      .fsum { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; font-weight: 600; }");
            sb.AppendLine("    </style>");
            sb.AppendLine("    <marker id=\"arr-net\" viewBox=\"0 0 10 10\" refX=\"7\" refY=\"5\" markerWidth=\"6.5\" markerHeight=\"6.5\" orient=\"auto-start-reverse\">");
            sb.AppendLine("      <path d=\"M 0 1.5 L 9 5 L 0 8.5 z\" fill=\"#16a34a\" />");
            sb.AppendLine("    </marker>");
            sb.AppendLine("  </defs>");
            sb.AppendLine();

            for (int idx = 0; idx < snapshots.Count && idx < 6; idx++)
            {
                var s = snapshots[idx];
                int col = idx % 3;
                int row = idx / 3;
                double colX = 10.0 + col * 370.0;
                double rowY = 10.0 + row * 230.0;
                bool isEq = (s.Iteration == 50);

                string cardFill = isEq ? "#f0fdf4" : "#f8fafc";
                string cardStroke = isEq ? "#86efac" : "#cbd5e1";
                double strokeW = isEq ? 1.8 : 1.5;
                string titleFill = isEq ? "#15803d" : "#004B96";
                string fsumFill = isEq ? "#15803d" : "#475569";
                string fsumVal = s.ForceSum < 0.05 ? "&lt; 0.01 N" : $"{s.ForceSum.ToString("F1", inv)} N";

                // Card background
                sb.AppendLine($"  <!-- Tile {idx}: Iteration {s.Iteration} -->");
                sb.AppendLine($"  <rect x=\"{colX.ToString("F1", inv)}\" y=\"{rowY.ToString("F1", inv)}\" width=\"350\" height=\"220\" rx=\"8\" fill=\"{cardFill}\" stroke=\"{cardStroke}\" stroke-width=\"{strokeW.ToString("F1", inv)}\" />");

                // Header - "Iteration N" (left) and Kräftesumme (right)
                sb.AppendLine($"  <text x=\"{(colX + 16.0).ToString("F1", inv)}\" y=\"{(rowY + 26.0).ToString("F1", inv)}\" class=\"hdr\" text-anchor=\"start\" fill=\"{titleFill}\">Iteration {s.Iteration}</text>");
                sb.AppendLine($"  <text x=\"{(colX + 334.0).ToString("F1", inv)}\" y=\"{(rowY + 26.0).ToString("F1", inv)}\" class=\"fsum\" text-anchor=\"end\" fill=\"{fsumFill}\">&#931; ||F_net|| = {fsumVal}</text>");

                // Inner Canvas - maximized from y = 38 to 210 (height 172px, width 330px)
                string innerBorder = isEq ? "#bbf7d0" : "#cbd5e1";
                sb.AppendLine($"  <rect x=\"{(colX + 10.0).ToString("F1", inv)}\" y=\"{(rowY + 38.0).ToString("F1", inv)}\" width=\"330\" height=\"172\" rx=\"6\" fill=\"#ffffff\" stroke=\"{innerBorder}\" stroke-width=\"1\" />");

                // Mapping nodes to inner canvas center (colX + 175, rowY + 124)
                double cx = colX + 175.0;
                double cy = rowY + 124.0;

                var mapped = new List<(double X, double Y, double Fx, double Fy)>();
                foreach (var n in s.Nodes)
                {
                    double px = cx + (n.X - 125.0) * 1.9;
                    double py = cy + (n.Y - 95.0) * 1.4;
                    mapped.Add((px, py, n.Fx, n.Fy));
                }

                // Edges
                string edgeColor = isEq ? "#6ee7b7" : "#94a3b8";
                foreach (var (u, v) in edges)
                {
                    var p1 = mapped[u];
                    var p2 = mapped[v];
                    sb.AppendLine($"  <line x1=\"{p1.X.ToString("F1", inv)}\" y1=\"{p1.Y.ToString("F1", inv)}\" x2=\"{p2.X.ToString("F1", inv)}\" y2=\"{p2.Y.ToString("F1", inv)}\" stroke=\"{edgeColor}\" stroke-width=\"2.4\" />");
                }

                // Force arrows (for non-equilibrium, drawn before nodes so node circles mask line starts cleanly)
                if (!isEq)
                {
                    double arrowScale = 10.0;
                    foreach (var p in mapped)
                    {
                        double fx = p.Fx * arrowScale;
                        double fy = p.Fy * arrowScale;
                        double len = Math.Sqrt(fx * fx + fy * fy);
                        if (len > 38.0)
                        {
                            fx = (fx / len) * 38.0;
                            fy = (fy / len) * 38.0;
                            len = 38.0;
                        }
                        if (len > 3.0)
                        {
                            sb.AppendLine($"  <line x1=\"{p.X.ToString("F1", inv)}\" y1=\"{p.Y.ToString("F1", inv)}\" x2=\"{(p.X + fx).ToString("F1", inv)}\" y2=\"{(p.Y + fy).ToString("F1", inv)}\" stroke=\"#16a34a\" stroke-width=\"2.8\" marker-end=\"url(#arr-net)\" />");
                        }
                    }
                }

                // Nodes (drawn on top)
                string nodeFill = isEq ? "#16a34a" : "#2563eb";
                foreach (var p in mapped)
                {
                    sb.AppendLine($"  <circle cx=\"{p.X.ToString("F1", inv)}\" cy=\"{p.Y.ToString("F1", inv)}\" r=\"6.5\" fill=\"{nodeFill}\" stroke=\"#ffffff\" stroke-width=\"2\" />");
                }

                sb.AppendLine();
            }

            sb.AppendLine("</svg>");
            File.WriteAllText(filePath, sb.ToString(), Encoding.UTF8);
        }
    }
}
