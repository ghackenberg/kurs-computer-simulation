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
            public string Id { get; set; } = "";
            public double X { get; set; }
            public double Y { get; set; }
            public double Fx { get; set; }
            public double Fy { get; set; }
            public List<(string TargetId, double Fx, double Fy)> Springs { get; } = new();
            public List<(string TargetId, double Fx, double Fy)> Coulombs { get; } = new();
        }

        public static void GenerateAll(string root)
        {
            var diagramDir = Path.Combine(root, "Folien", "04_Visualisierung_2D_Diagramme", "Diagramme");
            Directory.CreateDirectory(diagramDir);

            // 5 Nodes in initial tangled configuration inside 250x184 box
            var nodes = new List<Node>
            {
                new Node { Id = "v_1", X = 50,  Y = 45 },
                new Node { Id = "v_2", X = 200, Y = 145 },
                new Node { Id = "v_3", X = 50,  Y = 145 },
                new Node { Id = "v_4", X = 200, Y = 45 },
                new Node { Id = "v_5", X = 125, Y = 95 }
            };

            var edges = new List<(int, int)>
            {
                (0, 1), // v1 - v2
                (1, 2), // v2 - v3
                (2, 3), // v3 - v4
                (3, 4), // v4 - v5
                (4, 0), // v5 - v1
                (1, 4)  // v2 - v5 (cross-brace)
            };

            double l0 = 85.0;     // Ideal spring rest length
            double ks = 0.04;     // Spring stiffness
            double kr = 10000.0;  // Coulomb repulsion constant
            double temp = 18.0;   // Initial annealing temperature
            double cooling = 0.94;

            for (int iter = 0; iter <= 50; iter++)
            {
                // Reset forces
                foreach (var n in nodes)
                {
                    n.Fx = 0;
                    n.Fy = 0;
                    n.Springs.Clear();
                    n.Coulombs.Clear();
                }

                // 1. Coulomb repulsion between all node pairs
                for (int i = 0; i < nodes.Count; i++)
                {
                    for (int j = i + 1; j < nodes.Count; j++)
                    {
                        double dx = nodes[i].X - nodes[j].X;
                        double dy = nodes[i].Y - nodes[j].Y;
                        double dist = Math.Max(1.0, Math.Sqrt(dx * dx + dy * dy));
                        double f = kr / (dist * dist);
                        double fx = (dx / dist) * f;
                        double fy = (dy / dist) * f;

                        nodes[i].Fx += fx;
                        nodes[i].Fy += fy;
                        nodes[j].Fx -= fx;
                        nodes[j].Fy -= fy;

                        nodes[i].Coulombs.Add((nodes[j].Id, fx, fy));
                        nodes[j].Coulombs.Add((nodes[i].Id, -fx, -fy));
                    }
                }

                // 2. Hooke spring attraction along edges
                foreach (var (u, v) in edges)
                {
                    double dx = nodes[v].X - nodes[u].X;
                    double dy = nodes[v].Y - nodes[u].Y;
                    double dist = Math.Max(1.0, Math.Sqrt(dx * dx + dy * dy));
                    double f = ks * (dist - l0); // positive = pulls together
                    double fx = (dx / dist) * f;
                    double fy = (dy / dist) * f;

                    nodes[u].Fx += fx;
                    nodes[u].Fy += fy;
                    nodes[v].Fx -= fx;
                    nodes[v].Fy -= fy;

                    nodes[u].Springs.Add((nodes[v].Id, fx, fy));
                    nodes[v].Springs.Add((nodes[u].Id, -fx, -fy));
                }

                // Render specific snapshot iterations
                if (iter == 0)
                {
                    SaveSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Iter0.svg"), nodes, edges, iter, temp, Mode.DetailedForces);
                }
                else if (iter == 2)
                {
                    SaveSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Iter2.svg"), nodes, edges, iter, temp, Mode.NetForcesOnly);
                }
                else if (iter == 12)
                {
                    SaveSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Iter15.svg"), nodes, edges, 15, temp, Mode.NetForcesOnly);
                }
                else if (iter == 50)
                {
                    SaveSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Iter50.svg"), nodes, edges, 50, temp, Mode.Equilibrium);
                }

                // 3. Update positions with damped Euler step
                foreach (var n in nodes)
                {
                    double fLen = Math.Sqrt(n.Fx * n.Fx + n.Fy * n.Fy);
                    if (fLen > 0.001)
                    {
                        double step = Math.Min(temp, fLen * 0.4);
                        n.X += (n.Fx / fLen) * step;
                        n.Y += (n.Fy / fLen) * step;
                        // Keep within canvas bounds
                        n.X = Math.Clamp(n.X, 28, 222);
                        n.Y = Math.Clamp(n.Y, 26, 158);
                    }
                }

                temp *= cooling;
            }

            Console.WriteLine("Force-Directed Simulations-SVGs erfolgreich erzeugt!");
        }

        private enum Mode { DetailedForces, NetForcesOnly, Equilibrium }

        private static void SaveSvg(string filePath, List<Node> nodes, List<(int, int)> edges, int iter, double temp, Mode mode)
        {
            var inv = CultureInfo.InvariantCulture;
            var sb = new StringBuilder();
            sb.AppendLine("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 420\" width=\"280\" height=\"420\">");
            sb.AppendLine("  <defs>");
            sb.AppendLine("    <style>");
            sb.AppendLine("      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }");
            sb.AppendLine("      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11.5px; fill: #475569; text-anchor: middle; }");
            sb.AppendLine("      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; font-weight: bold; text-anchor: middle; }");
            sb.AppendLine("      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11.5px; fill: #334155; text-anchor: middle; }");
            sb.AppendLine("      .node-txt { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11.5px; font-weight: bold; fill: #1e293b; text-anchor: middle; dominant-baseline: central; }");
            sb.AppendLine("    </style>");
            sb.AppendLine("    <marker id=\"arr-net\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"5\" markerHeight=\"5\" orient=\"auto-start-reverse\">");
            sb.AppendLine("      <path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"#16a34a\" />");
            sb.AppendLine("    </marker>");
            sb.AppendLine("    <marker id=\"arr-blue\" viewBox=\"0 0 10 10\" refX=\"7\" refY=\"5\" markerWidth=\"4.5\" markerHeight=\"4.5\" orient=\"auto-start-reverse\">");
            sb.AppendLine("      <path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"#2563eb\" />");
            sb.AppendLine("    </marker>");
            sb.AppendLine("    <marker id=\"arr-red\" viewBox=\"0 0 10 10\" refX=\"7\" refY=\"5\" markerWidth=\"4.5\" markerHeight=\"4.5\" orient=\"auto-start-reverse\">");
            sb.AppendLine("      <path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"#dc2626\" />");
            sb.AppendLine("    </marker>");
            sb.AppendLine("  </defs>");
            sb.AppendLine();
            sb.AppendLine("  <rect width=\"280\" height=\"420\" rx=\"10\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1.5\" />");

            // Titles
            if (mode == Mode.DetailedForces)
            {
                sb.AppendLine("  <text x=\"140\" y=\"24\" class=\"hdr\">Force-Directed: Iteration 0 (Start)</text>");
                sb.AppendLine("  <text x=\"140\" y=\"42\" class=\"sub\">Kräftezerlegung: Hooke F_s + Coulomb F_r</text>");
            }
            else if (iter == 2)
            {
                sb.AppendLine("  <text x=\"140\" y=\"24\" class=\"hdr\">Force-Directed: Iteration 2</text>");
                sb.AppendLine("  <text x=\"140\" y=\"42\" class=\"sub\">Dynamische Entwirrung (Summenvektor)</text>");
            }
            else if (iter == 15)
            {
                sb.AppendLine("  <text x=\"140\" y=\"24\" class=\"hdr\">Force-Directed: Iteration 15</text>");
                sb.AppendLine("  <text x=\"140\" y=\"42\" class=\"sub\">Einschwingen &amp; Simulated Annealing</text>");
            }
            else
            {
                sb.AppendLine("  <text x=\"140\" y=\"24\" class=\"hdr\">Force-Directed: Iteration 50</text>");
                sb.AppendLine("  <text x=\"140\" y=\"42\" class=\"sub\">Stationäres Kräftegleichgewicht</text>");
            }

            // Graphic canvas
            sb.AppendLine("  <g transform=\"translate(15, 54)\">");
            sb.AppendLine("    <rect width=\"250\" height=\"184\" rx=\"6\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\" />");

            // Draw Edges
            foreach (var (u, v) in edges)
            {
                var n1 = nodes[u];
                var n2 = nodes[v];
                sb.AppendLine($"    <line x1=\"{n1.X.ToString("F1", inv)}\" y1=\"{n1.Y.ToString("F1", inv)}\" x2=\"{n2.X.ToString("F1", inv)}\" y2=\"{n2.Y.ToString("F1", inv)}\" stroke=\"#94a3b8\" stroke-width=\"2\" />");
            }

            // Draw Vector Arrows
            if (mode == Mode.DetailedForces)
            {
                // In Iter 0: Draw Hooke (blue), Coulomb (red) and Net (green) on nodes
                foreach (var n in nodes)
                {
                    double springFx = 0, springFy = 0;
                    foreach (var s in n.Springs) { springFx += s.Fx; springFy += s.Fy; }
                    double sLen = Math.Sqrt(springFx * springFx + springFy * springFy);
                    if (sLen > 0.1)
                    {
                        double scale = 24.0 / Math.Max(sLen, 12.0);
                        double ex = n.X + springFx * scale;
                        double ey = n.Y + springFy * scale;
                        sb.AppendLine($"    <line x1=\"{n.X.ToString("F1", inv)}\" y1=\"{n.Y.ToString("F1", inv)}\" x2=\"{ex.ToString("F1", inv)}\" y2=\"{ey.ToString("F1", inv)}\" stroke=\"#2563eb\" stroke-width=\"1.8\" marker-end=\"url(#arr-blue)\" />");
                    }

                    double coulFx = 0, coulFy = 0;
                    foreach (var c in n.Coulombs) { coulFx += c.Fx; coulFy += c.Fy; }
                    double cLen = Math.Sqrt(coulFx * coulFx + coulFy * coulFy);
                    if (cLen > 0.1)
                    {
                        double scale = 24.0 / Math.Max(cLen, 12.0);
                        double ex = n.X + coulFx * scale;
                        double ey = n.Y + coulFy * scale;
                        sb.AppendLine($"    <line x1=\"{n.X.ToString("F1", inv)}\" y1=\"{n.Y.ToString("F1", inv)}\" x2=\"{ex.ToString("F1", inv)}\" y2=\"{ey.ToString("F1", inv)}\" stroke=\"#dc2626\" stroke-width=\"1.8\" marker-end=\"url(#arr-red)\" />");
                    }

                    double fLen = Math.Sqrt(n.Fx * n.Fx + n.Fy * n.Fy);
                    if (fLen > 0.1)
                    {
                        double scale = 30.0 / Math.Max(fLen, 12.0);
                        double ex = n.X + n.Fx * scale;
                        double ey = n.Y + n.Fy * scale;
                        sb.AppendLine($"    <line x1=\"{n.X.ToString("F1", inv)}\" y1=\"{n.Y.ToString("F1", inv)}\" x2=\"{ex.ToString("F1", inv)}\" y2=\"{ey.ToString("F1", inv)}\" stroke=\"#16a34a\" stroke-width=\"2.6\" marker-end=\"url(#arr-net)\" />");
                    }
                }
            }
            else if (mode == Mode.NetForcesOnly)
            {
                foreach (var n in nodes)
                {
                    double fLen = Math.Sqrt(n.Fx * n.Fx + n.Fy * n.Fy);
                    if (fLen > 0.1)
                    {
                        double maxLen = (iter == 2) ? 28.0 : 15.0;
                        double scale = maxLen / Math.Max(fLen, 6.0);
                        double ex = n.X + n.Fx * scale;
                        double ey = n.Y + n.Fy * scale;
                        sb.AppendLine($"    <line x1=\"{n.X.ToString("F1", inv)}\" y1=\"{n.Y.ToString("F1", inv)}\" x2=\"{ex.ToString("F1", inv)}\" y2=\"{ey.ToString("F1", inv)}\" stroke=\"#16a34a\" stroke-width=\"2.5\" marker-end=\"url(#arr-net)\" />");
                    }
                }
            }

            // Draw Nodes as rounded rectangles (completely shields text from collision issues)
            foreach (var n in nodes)
            {
                double rx = n.X - 18;
                double ry = n.Y - 13;
                sb.AppendLine($"    <rect x=\"{rx.ToString("F1", inv)}\" y=\"{ry.ToString("F1", inv)}\" width=\"36\" height=\"26\" rx=\"5\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"1.8\" />");
                sb.AppendLine($"    <text x=\"{n.X.ToString("F1", inv)}\" y=\"{n.Y.ToString("F1", inv)}\" class=\"node-txt\">{n.Id}</text>");
            }

            sb.AppendLine("  </g>");
            sb.AppendLine();

            // Cards & Descriptions
            if (mode == Mode.DetailedForces)
            {
                sb.AppendLine("  <!-- Explanation Card -->");
                sb.AppendLine("  <g transform=\"translate(15, 248)\">");
                sb.AppendLine("    <rect width=\"250\" height=\"84\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#93c5fd\" stroke-width=\"1.5\" />");
                sb.AppendLine("    <text x=\"125\" y=\"20\" class=\"lbl\" style=\"fill: #1d4ed8;\">Kräfte-Vektoren (Start)</text>");
                sb.AppendLine("    <text x=\"125\" y=\"38\" class=\"desc\" style=\"fill: #2563eb;\">Blau: Hookesche Federn F_s (Zug)</text>");
                sb.AppendLine("    <text x=\"125\" y=\"54\" class=\"desc\" style=\"fill: #dc2626;\">Rot: Coulomb-Abstoßung F_r (Ladung)</text>");
                sb.AppendLine("    <text x=\"125\" y=\"72\" class=\"desc\" style=\"font-weight: bold; fill: #16a34a;\">Grün: Resultierende Summe F_net</text>");
                sb.AppendLine("  </g>");
                sb.AppendLine();
                sb.AppendLine("  <!-- Summary Footer -->");
                sb.AppendLine("  <rect x=\"15\" y=\"342\" width=\"250\" height=\"66\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1.5\" />");
                sb.AppendLine("  <text x=\"140\" y=\"364\" class=\"lbl\" style=\"fill: #004B96;\">Zufällige Startverteilung</text>");
                sb.AppendLine("  <text x=\"140\" y=\"382\" class=\"desc\" style=\"font-weight: bold; fill: #334155;\">Kanten überschneiden sich chaotisch</text>");
                sb.AppendLine("  <text x=\"140\" y=\"398\" class=\"desc\" style=\"fill: #64748b;\">Euler-Schritt verschiebt Knoten entlang F_net</text>");
            }
            else if (iter == 2)
            {
                sb.AppendLine("  <!-- Explanation Card -->");
                sb.AppendLine("  <g transform=\"translate(15, 248)\">");
                sb.AppendLine("    <rect width=\"250\" height=\"84\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#86efac\" stroke-width=\"1.5\" />");
                sb.AppendLine("    <text x=\"125\" y=\"20\" class=\"lbl\" style=\"fill: #15803d;\">Dynamische Entwirrung</text>");
                sb.AppendLine("    <text x=\"125\" y=\"38\" class=\"desc\" style=\"fill: #166534;\">Nur noch Summenvektor F_net aktiv</text>");
                sb.AppendLine("    <text x=\"125\" y=\"54\" class=\"desc\" style=\"font-weight: bold; fill: #15803d;\">Knoten wandern entlang Gradient</text>");
                sb.AppendLine("    <text x=\"125\" y=\"72\" class=\"desc\" style=\"fill: #16a34a;\">Kanten beginnen sich zu entflechten</text>");
                sb.AppendLine("  </g>");
                sb.AppendLine();
                sb.AppendLine("  <!-- Summary Footer -->");
                sb.AppendLine("  <rect x=\"15\" y=\"342\" width=\"250\" height=\"66\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#93c5fd\" stroke-width=\"1.5\" />");
                sb.AppendLine("  <text x=\"140\" y=\"364\" class=\"lbl\" style=\"fill: #1d4ed8;\">Partikelsimulation</text>");
                sb.AppendLine("  <text x=\"140\" y=\"382\" class=\"desc\" style=\"font-weight: bold; fill: #1e40af;\">Kräfte treiben das System</text>");
                sb.AppendLine("  <text x=\"140\" y=\"398\" class=\"desc\" style=\"fill: #2563eb;\">Richtung minimaler Verformungsenergie</text>");
            }
            else if (iter == 15)
            {
                sb.AppendLine("  <!-- Explanation Card -->");
                sb.AppendLine("  <g transform=\"translate(15, 248)\">");
                sb.AppendLine("    <rect width=\"250\" height=\"84\" rx=\"6\" fill=\"#fff7ed\" stroke=\"#fdba74\" stroke-width=\"1.5\" />");
                sb.AppendLine("    <text x=\"125\" y=\"20\" class=\"lbl\" style=\"fill: #c2410c;\">Simulated Annealing</text>");
                sb.AppendLine("    <text x=\"125\" y=\"38\" class=\"desc\" style=\"fill: #9a3412;\">Temperatur T_k klingt schrittweise ab</text>");
                sb.AppendLine("    <text x=\"125\" y=\"54\" class=\"desc\" style=\"font-weight: bold; fill: #ea580c;\">Schrittweiten schrumpfen (Dämpfung)</text>");
                sb.AppendLine("    <text x=\"125\" y=\"72\" class=\"desc\" style=\"fill: #c2410c;\">Verhindert Oszillieren um Minimum</text>");
                sb.AppendLine("  </g>");
                sb.AppendLine();
                sb.AppendLine("  <!-- Summary Footer -->");
                sb.AppendLine("  <rect x=\"15\" y=\"342\" width=\"250\" height=\"66\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1.5\" />");
                sb.AppendLine("  <text x=\"140\" y=\"364\" class=\"lbl\" style=\"fill: #004B96;\">Einschwingphase</text>");
                sb.AppendLine("  <text x=\"140\" y=\"382\" class=\"desc\" style=\"font-weight: bold; fill: #334155;\">Topologie bereits kreuzungsfrei</text>");
                sb.AppendLine("  <text x=\"140\" y=\"398\" class=\"desc\" style=\"fill: #64748b;\">Feinjustierung der Kantenlängen l_0</text>");
            }
            else
            {
                sb.AppendLine("  <!-- Explanation Card -->");
                sb.AppendLine("  <g transform=\"translate(15, 248)\">");
                sb.AppendLine("    <rect width=\"250\" height=\"84\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#86efac\" stroke-width=\"1.5\" />");
                sb.AppendLine("    <text x=\"125\" y=\"20\" class=\"lbl\" style=\"fill: #15803d;\">Kräftegleichgewicht erreicht</text>");
                sb.AppendLine("    <text x=\"125\" y=\"38\" class=\"desc\" style=\"fill: #166534;\">Summe F_net &approx; 0 an allen Knoten</text>");
                sb.AppendLine("    <text x=\"125\" y=\"54\" class=\"desc\" style=\"font-weight: bold; fill: #15803d;\">Keine Restbewegungen mehr</text>");
                sb.AppendLine("    <text x=\"125\" y=\"72\" class=\"desc\" style=\"fill: #16a34a;\">Symmetrisch, organisch, kreuzungsfrei</text>");
                sb.AppendLine("  </g>");
                sb.AppendLine();
                sb.AppendLine("  <!-- Summary Footer -->");
                sb.AppendLine("  <rect x=\"15\" y=\"342\" width=\"250\" height=\"66\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#93c5fd\" stroke-width=\"1.5\" />");
                sb.AppendLine("  <text x=\"140\" y=\"364\" class=\"lbl\" style=\"fill: #1d4ed8;\">Finales Layout</text>");
                sb.AppendLine("  <text x=\"140\" y=\"382\" class=\"desc\" style=\"font-weight: bold; fill: #1e40af;\">Kantenlängen gleichmäßig d &approx; l_0</text>");
                sb.AppendLine("  <text x=\"140\" y=\"398\" class=\"desc\" style=\"fill: #2563eb;\">Optimales Ergebnis der Partikelsimulation</text>");
            }

            sb.AppendLine("</svg>");
            File.WriteAllText(filePath, sb.ToString(), Encoding.UTF8);
        }
    }
}
