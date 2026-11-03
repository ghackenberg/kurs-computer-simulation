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
            public List<(double Fx, double Fy)> Springs { get; } = new();
            public List<(double Fx, double Fy)> Coulombs { get; } = new();
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
            var diagramDir = Path.Combine(root, "Folien", "04_Visualisierung_2D_Diagramme", "Diagramme");
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
                    n.Springs.Clear();
                    n.Coulombs.Clear();
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

                        nodes[i].Coulombs.Add((fx, fy));
                        nodes[j].Coulombs.Add((-fx, -fy));
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

                    nodes[u].Springs.Add((fx, fy));
                    nodes[v].Springs.Add((-fx, -fy));
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

                // Render key milestones
                if (iter == 0)
                {
                    SaveSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Iter0.svg"), nodes, edges, iter, Mode.DetailedForces);
                }
                else if (iter == 2)
                {
                    SaveSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Iter2.svg"), nodes, edges, iter, Mode.NetForcesOnly);
                }
                else if (iter == 15)
                {
                    SaveSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Iter15.svg"), nodes, edges, iter, Mode.NetForcesOnly);
                }
                else if (iter == 50)
                {
                    SaveSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Iter50.svg"), nodes, edges, iter, Mode.Equilibrium);
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

            // Generate 3x2 Matrix SVG
            GenerateMatrixSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Matrix.svg"), snapshots, edges);

            // Generate dedicated theory diagrams for annealing and oscillations
            GenerateUncooledSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Iter50_Ungedaempft.svg"), edges, l0, ks, kr);
            GenerateConvergenceSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Konvergenz.svg"));

            Console.WriteLine("Force-Directed Simulations-SVGs erfolgreich erzeugt!");
        }

        private static void GenerateUncooledSvg(string filePath, List<(int, int)> edges, double l0, double ks, double kr)
        {
            var inv = CultureInfo.InvariantCulture;
            var nodes = new List<Node>
            {
                new Node { X = 55.0,  Y = 50.0 },
                new Node { X = 195.0, Y = 55.0 },
                new Node { X = 185.0, Y = 135.0 },
                new Node { X = 65.0,  Y = 140.0 },
                new Node { X = 135.0, Y = 110.0 }
            };

            // Store history of node 4 (hub) to show the limit cycle oscillation track
            var hubHistory = new List<(double X, double Y)>();
            double dt = 12.0; // uncooled Euler step causing limit cycle oscillation

            for (int iter = 0; iter <= 50; iter++)
            {
                foreach (var n in nodes) { n.Fx = 0; n.Fy = 0; }

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
                        nodes[i].Fx += fx; nodes[i].Fy += fy;
                        nodes[j].Fx -= fx; nodes[j].Fy -= fy;
                    }
                }

                foreach (var (u, v) in edges)
                {
                    double dx = nodes[v].X - nodes[u].X;
                    double dy = nodes[v].Y - nodes[u].Y;
                    double dist = Math.Max(1.0, Math.Sqrt(dx * dx + dy * dy));
                    double f = ks * (dist - l0);
                    double fx = (dx / dist) * f;
                    double fy = (dy / dist) * f;
                    nodes[u].Fx += fx; nodes[u].Fy += fy;
                    nodes[v].Fx -= fx; nodes[v].Fy -= fy;
                }

                if (iter >= 45)
                {
                    hubHistory.Add((nodes[4].X, nodes[4].Y));
                }

                if (iter < 50)
                {
                    foreach (var n in nodes)
                    {
                        n.X += n.Fx * dt;
                        n.Y += n.Fy * dt;
                        n.X = Math.Clamp(n.X, 30.0, 220.0);
                        n.Y = Math.Clamp(n.Y, 25.0, 160.0);
                    }
                }
            }

            var sb = new StringBuilder();
            sb.AppendLine("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 420\" width=\"280\" height=\"420\">");
            sb.AppendLine("  <defs>");
            sb.AppendLine("    <style>");
            sb.AppendLine("      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }");
            sb.AppendLine("      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11.5px; fill: #475569; text-anchor: middle; }");
            sb.AppendLine("      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; font-weight: bold; text-anchor: middle; }");
            sb.AppendLine("      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11.5px; fill: #334155; text-anchor: middle; }");
            sb.AppendLine("    </style>");
            sb.AppendLine("    <marker id=\"arr-red-limit\" viewBox=\"0 0 10 10\" refX=\"7\" refY=\"5\" markerWidth=\"5.5\" markerHeight=\"5.5\" orient=\"auto-start-reverse\">");
            sb.AppendLine("      <path d=\"M 0 1.5 L 9 5 L 0 8.5 z\" fill=\"#dc2626\" />");
            sb.AppendLine("    </marker>");
            sb.AppendLine("  </defs>");
            sb.AppendLine();
            sb.AppendLine("  <rect width=\"280\" height=\"420\" rx=\"10\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1.5\" />");
            sb.AppendLine("  <text x=\"140\" y=\"24\" class=\"hdr\">Force-Directed: Naiv Iteration 50</text>");
            sb.AppendLine("  <text x=\"140\" y=\"42\" class=\"sub\">Ungedämpft: Endloser Grenzzyklus</text>");
            sb.AppendLine();
            sb.AppendLine("  <!-- Graphic canvas -->");
            sb.AppendLine("  <g transform=\"translate(15, 54)\">");
            sb.AppendLine("    <rect width=\"250\" height=\"184\" rx=\"6\" fill=\"#fff5f5\" stroke=\"#fca5a5\" stroke-width=\"1\" />");
            sb.AppendLine();
            sb.AppendLine("    <!-- 1. Limit cycle oscillation path for Hub node -->");
            sb.AppendLine("    <rect x=\"55\" y=\"9\" width=\"140\" height=\"20\" rx=\"4\" fill=\"#ffffff\" opacity=\"0.95\" stroke=\"#fca5a5\" stroke-width=\"1\" />");
            sb.AppendLine("    <text x=\"125\" y=\"23\" class=\"desc\" style=\"fill: #b91c1c; font-size: 11.5px; font-weight: bold; text-anchor: middle;\">Oszillations-Spur</text>");
            sb.Append("    <path d=\"");
            for (int i = 0; i < hubHistory.Count; i++)
            {
                var cmd = (i == 0) ? "M" : "L";
                sb.Append($"{cmd} {hubHistory[i].X.ToString("F1", inv)} {hubHistory[i].Y.ToString("F1", inv)} ");
            }
            sb.AppendLine("Z\" fill=\"#fee2e2\" stroke=\"#ef4444\" stroke-width=\"1.5\" stroke-dasharray=\"3,2\" opacity=\"0.7\" />");
            sb.AppendLine();
            sb.AppendLine("    <!-- 2. Draw Edges -->");
            foreach (var (u, v) in edges)
            {
                var n1 = nodes[u];
                var n2 = nodes[v];
                sb.AppendLine($"    <line x1=\"{n1.X.ToString("F1", inv)}\" y1=\"{n1.Y.ToString("F1", inv)}\" x2=\"{n2.X.ToString("F1", inv)}\" y2=\"{n2.Y.ToString("F1", inv)}\" stroke=\"#f87171\" stroke-width=\"2\" />");
            }
            sb.AppendLine();
            sb.AppendLine("    <!-- 3. Draw Nodes as circles -->");
            foreach (var n in nodes)
            {
                sb.AppendLine($"    <circle cx=\"{n.X.ToString("F1", inv)}\" cy=\"{n.Y.ToString("F1", inv)}\" r=\"5.5\" fill=\"#dc2626\" stroke=\"#ffffff\" stroke-width=\"1.8\" />");
            }
            sb.AppendLine();
            sb.AppendLine("    <!-- 4. Draw violent remaining force vectors in bold red -->");
            double scale = 8.0;
            foreach (var n in nodes)
            {
                double fLen = Math.Sqrt(n.Fx * n.Fx + n.Fy * n.Fy);
                if (fLen > 0.1)
                {
                    double ex = n.X + n.Fx * scale;
                    double ey = n.Y + n.Fy * scale;
                    sb.AppendLine($"    <line x1=\"{n.X.ToString("F1", inv)}\" y1=\"{n.Y.ToString("F1", inv)}\" x2=\"{ex.ToString("F1", inv)}\" y2=\"{ey.ToString("F1", inv)}\" stroke=\"#dc2626\" stroke-width=\"2.6\" marker-end=\"url(#arr-red-limit)\" />");
                }
            }
            sb.AppendLine("  </g>");
            sb.AppendLine();
            sb.AppendLine("  <!-- Explanation Card -->");
            sb.AppendLine("  <g transform=\"translate(15, 248)\">");
            sb.AppendLine("    <rect width=\"250\" height=\"84\" rx=\"6\" fill=\"#fff1f2\" stroke=\"#fecdd3\" stroke-width=\"1.5\" />");
            sb.AppendLine("    <text x=\"125\" y=\"20\" class=\"lbl\" style=\"fill: #be123c;\">Kein Stillstand (Limit Cycle)</text>");
            sb.AppendLine("    <text x=\"125\" y=\"38\" class=\"desc\" style=\"fill: #9f1239;\">Knoten springen permanent hin und her</text>");
            sb.AppendLine("    <text x=\"125\" y=\"54\" class=\"desc\" style=\"fill: #9f1239;\">Hohe Restkräfte ||F_net|| treiben Schwingung</text>");
            sb.AppendLine("    <text x=\"125\" y=\"72\" class=\"desc\" style=\"font-weight: bold; fill: #e11d48;\">System findet niemals Ruhe!</text>");
            sb.AppendLine("  </g>");
            sb.AppendLine();
            sb.AppendLine("  <!-- Summary Footer -->");
            sb.AppendLine("  <rect x=\"15\" y=\"342\" width=\"250\" height=\"66\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1.5\" />");
            sb.AppendLine("  <text x=\"140\" y=\"364\" class=\"lbl\" style=\"fill: #004B96;\">Das Oszillations-Dilemma</text>");
            sb.AppendLine("  <text x=\"140\" y=\"382\" class=\"desc\" style=\"font-weight: bold; fill: #334155;\">Overshooting durch Coulomb-Kräfte (1/d²)</text>");
            sb.AppendLine("  <text x=\"140\" y=\"398\" class=\"desc\" style=\"fill: #64748b;\">Erfordert zwingend Energiedämpfung!</text>");
            sb.AppendLine("</svg>");
            File.WriteAllText(filePath, sb.ToString(), Encoding.UTF8);
        }

        private static void GenerateConvergenceSvg(string filePath)
        {
            var sb = new StringBuilder();
            sb.AppendLine("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 420\" width=\"280\" height=\"420\">");
            sb.AppendLine("  <defs>");
            sb.AppendLine("    <style>");
            sb.AppendLine("      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }");
            sb.AppendLine("      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11.5px; fill: #475569; text-anchor: middle; }");
            sb.AppendLine("      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; font-weight: bold; text-anchor: middle; }");
            sb.AppendLine("      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11.5px; fill: #334155; text-anchor: middle; }");
            sb.AppendLine("      .axis-lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11.5px; fill: #475569; }");
            sb.AppendLine("    </style>");
            sb.AppendLine("  </defs>");
            sb.AppendLine();
            sb.AppendLine("  <rect width=\"280\" height=\"420\" rx=\"10\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1.5\" />");
            sb.AppendLine("  <text x=\"140\" y=\"24\" class=\"hdr\">Simulated Annealing: Konvergenz</text>");
            sb.AppendLine("  <text x=\"140\" y=\"42\" class=\"sub\">Restkraft ||F_net|| über Iterationen k</text>");
            sb.AppendLine();
            sb.AppendLine("  <!-- Graphic canvas with Plot -->");
            sb.AppendLine("  <g transform=\"translate(15, 54)\">");
            sb.AppendLine("    <rect width=\"250\" height=\"184\" rx=\"6\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\" />");
            sb.AppendLine();
            sb.AppendLine("    <!-- Grid lines -->");
            sb.AppendLine("    <line x1=\"42\" y1=\"145\" x2=\"235\" y2=\"145\" stroke=\"#cbd5e1\" stroke-width=\"1.2\" />");
            sb.AppendLine("    <line x1=\"42\" y1=\"105\" x2=\"235\" y2=\"105\" stroke=\"#f1f5f9\" stroke-width=\"1\" />");
            sb.AppendLine("    <line x1=\"42\" y1=\"65\" x2=\"235\" y2=\"65\" stroke=\"#f1f5f9\" stroke-width=\"1\" />");
            sb.AppendLine("    <line x1=\"42\" y1=\"25\" x2=\"235\" y2=\"25\" stroke=\"#f1f5f9\" stroke-width=\"1\" />");
            sb.AppendLine("    <line x1=\"42\" y1=\"25\" x2=\"42\" y2=\"145\" stroke=\"#cbd5e1\" stroke-width=\"1.2\" />");
            sb.AppendLine();
            sb.AppendLine("    <!-- Axis ticks & labels -->");
            sb.AppendLine("    <text x=\"34\" y=\"149\" class=\"axis-lbl\" style=\"text-anchor: end;\">0</text>");
            sb.AppendLine("    <text x=\"34\" y=\"109\" class=\"axis-lbl\" style=\"text-anchor: end;\">1</text>");
            sb.AppendLine("    <text x=\"34\" y=\"69\" class=\"axis-lbl\" style=\"text-anchor: end;\">2</text>");
            sb.AppendLine("    <text x=\"34\" y=\"29\" class=\"axis-lbl\" style=\"text-anchor: end;\">3</text>");
            sb.AppendLine("    <text x=\"42\" y=\"162\" class=\"axis-lbl\" style=\"text-anchor: middle;\">0</text>");
            sb.AppendLine("    <text x=\"80\" y=\"162\" class=\"axis-lbl\" style=\"text-anchor: middle;\">10</text>");
            sb.AppendLine("    <text x=\"119\" y=\"162\" class=\"axis-lbl\" style=\"text-anchor: middle;\">20</text>");
            sb.AppendLine("    <text x=\"158\" y=\"162\" class=\"axis-lbl\" style=\"text-anchor: middle;\">30</text>");
            sb.AppendLine("    <text x=\"196\" y=\"162\" class=\"axis-lbl\" style=\"text-anchor: middle;\">40</text>");
            sb.AppendLine("    <text x=\"235\" y=\"162\" class=\"axis-lbl\" style=\"text-anchor: middle;\">50</text>");
            sb.AppendLine("    <text x=\"138\" y=\"177\" class=\"axis-lbl\" style=\"text-anchor: middle; font-weight: bold;\">Iteration k</text>");
            sb.AppendLine();
            sb.AppendLine("    <!-- Curve 1: Ohne Annealing (Limit cycle oscillations in Red) -->");
            sb.AppendLine("    <path d=\"M 42 45 L 61 75 L 80 50 L 99 85 L 119 55 L 138 80 L 158 52 L 177 82 L 196 58 L 216 78 L 235 62\" fill=\"none\" stroke=\"#dc2626\" stroke-width=\"1.8\" stroke-dasharray=\"3,2\" />");
            sb.AppendLine();
            sb.AppendLine("    <!-- Curve 2: Mit Simulated Annealing (Smooth geometric decay in Green) -->");
            sb.AppendLine("    <path d=\"M 42 45 Q 70 85 100 120 T 160 141 T 235 144\" fill=\"none\" stroke=\"#16a34a\" stroke-width=\"2.6\" />");
            sb.AppendLine("    <circle cx=\"235\" cy=\"144\" r=\"4\" fill=\"#16a34a\" stroke=\"#ffffff\" stroke-width=\"1\" />");
            sb.AppendLine();
            sb.AppendLine("    <!-- Legend inside plot -->");
            sb.AppendLine("    <rect x=\"115\" y=\"12\" width=\"124\" height=\"44\" rx=\"4\" fill=\"#ffffff\" opacity=\"0.9\" stroke=\"#e2e8f0\" stroke-width=\"1\" />");
            sb.AppendLine("    <line x1=\"122\" y1=\"25\" x2=\"140\" y2=\"25\" stroke=\"#dc2626\" stroke-width=\"1.8\" stroke-dasharray=\"3,2\" />");
            sb.AppendLine("    <text x=\"145\" y=\"29\" class=\"axis-lbl\" style=\"fill: #dc2626; font-size: 11.5px;\">Ungedämpft</text>");
            sb.AppendLine("    <line x1=\"122\" y1=\"43\" x2=\"140\" y2=\"43\" stroke=\"#16a34a\" stroke-width=\"2.4\" />");
            sb.AppendLine("    <text x=\"145\" y=\"47\" class=\"axis-lbl\" style=\"fill: #16a34a; font-size: 11.5px; font-weight: bold;\">Mit Annealing</text>");
            sb.AppendLine("  </g>");
            sb.AppendLine();
            sb.AppendLine("  <!-- Explanation Card -->");
            sb.AppendLine("  <g transform=\"translate(15, 248)\">");
            sb.AppendLine("    <rect width=\"250\" height=\"84\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#86efac\" stroke-width=\"1.5\" />");
            sb.AppendLine("    <text x=\"125\" y=\"20\" class=\"lbl\" style=\"fill: #15803d;\">Abkühlungsschema</text>");
            sb.AppendLine("    <text x=\"125\" y=\"38\" class=\"desc\" style=\"fill: #166534;\">T_{k+1} = &#947; &#183; T_k (Abkühlrate &#947; &#8776; 0,92)</text>");
            sb.AppendLine("    <text x=\"125\" y=\"54\" class=\"desc\" style=\"fill: #166534;\">Schrittweite: &#916;p = (F / ||F||) &#183; min(T_k, ||F||)</text>");
            sb.AppendLine("    <text x=\"125\" y=\"72\" class=\"desc\" style=\"font-weight: bold; fill: #15803d;\">Monotone Konvergenz gegen ||F_net|| &#8776; 0</text>");
            sb.AppendLine("  </g>");
            sb.AppendLine();
            sb.AppendLine("  <!-- Summary Footer -->");
            sb.AppendLine("  <rect x=\"15\" y=\"342\" width=\"250\" height=\"66\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#93c5fd\" stroke-width=\"1.5\" />");
            sb.AppendLine("  <text x=\"140\" y=\"364\" class=\"lbl\" style=\"fill: #1d4ed8;\">Numerische Stabilität</text>");
            sb.AppendLine("  <text x=\"140\" y=\"382\" class=\"desc\" style=\"font-weight: bold; fill: #1e40af;\">Verhindert Oszillieren um das Minimum</text>");
            sb.AppendLine("  <text x=\"140\" y=\"398\" class=\"desc\" style=\"fill: #2563eb;\">Garantiert Stillstand im Gleichgewicht</text>");
            sb.AppendLine("</svg>");
            File.WriteAllText(filePath, sb.ToString(), Encoding.UTF8);
        }

        private enum Mode { DetailedForces, NetForcesOnly, Equilibrium }

        private static void SaveSvg(string filePath, List<Node> nodes, List<(int, int)> edges, int iter, Mode mode)
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
            sb.AppendLine("    </style>");
            sb.AppendLine("    <marker id=\"arr-net\" viewBox=\"0 0 10 10\" refX=\"7\" refY=\"5\" markerWidth=\"6.5\" markerHeight=\"6.5\" orient=\"auto-start-reverse\">");
            sb.AppendLine("      <path d=\"M 0 1.5 L 9 5 L 0 8.5 z\" fill=\"#16a34a\" />");
            sb.AppendLine("    </marker>");
            sb.AppendLine("    <marker id=\"arr-blue\" viewBox=\"0 0 10 10\" refX=\"7\" refY=\"5\" markerWidth=\"4.5\" markerHeight=\"4.5\" orient=\"auto-start-reverse\">");
            sb.AppendLine("      <path d=\"M 0 1.5 L 9 5 L 0 8.5 z\" fill=\"#2563eb\" />");
            sb.AppendLine("    </marker>");
            sb.AppendLine("    <marker id=\"arr-red\" viewBox=\"0 0 10 10\" refX=\"7\" refY=\"5\" markerWidth=\"4.5\" markerHeight=\"4.5\" orient=\"auto-start-reverse\">");
            sb.AppendLine("      <path d=\"M 0 1.5 L 9 5 L 0 8.5 z\" fill=\"#dc2626\" />");
            sb.AppendLine("    </marker>");
            sb.AppendLine("  </defs>");
            sb.AppendLine();
            sb.AppendLine("  <rect width=\"280\" height=\"420\" rx=\"10\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1.5\" />");

            // Header titles
            if (mode == Mode.DetailedForces)
            {
                sb.AppendLine("  <text x=\"140\" y=\"24\" class=\"hdr\">Force-Directed: Iteration 0 (Start)</text>");
                sb.AppendLine("  <text x=\"140\" y=\"42\" class=\"sub\">Paarweise Coulomb F_r + Hooke F_s</text>");
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

            // 1. Draw Edges
            foreach (var (u, v) in edges)
            {
                var n1 = nodes[u];
                var n2 = nodes[v];
                sb.AppendLine($"    <line x1=\"{n1.X.ToString("F1", inv)}\" y1=\"{n1.Y.ToString("F1", inv)}\" x2=\"{n2.X.ToString("F1", inv)}\" y2=\"{n2.Y.ToString("F1", inv)}\" stroke=\"#94a3b8\" stroke-width=\"2\" />");
            }

            // 2. Draw Nodes as small clean circles (radius 5.5) without text labels
            foreach (var n in nodes)
            {
                sb.AppendLine($"    <circle cx=\"{n.X.ToString("F1", inv)}\" cy=\"{n.Y.ToString("F1", inv)}\" r=\"5.5\" fill=\"#2563eb\" stroke=\"#ffffff\" stroke-width=\"1.8\" />");
            }

            // 3. Draw Forces ON TOP of nodes with a consistent scale factor
            double scale = (mode == Mode.DetailedForces) ? 14.0 : ((iter == 2) ? 14.0 : 8.0);

            if (mode == Mode.DetailedForces)
            {
                // In Iteration 0: Show all pairwise Coulomb forces (dashed red) and all edge spring forces (solid blue)
                foreach (var n in nodes)
                {
                    // Pairwise Coulomb repulsion forces (dashed red)
                    foreach (var c in n.Coulombs)
                    {
                        double ex = n.X + c.Fx * scale;
                        double ey = n.Y + c.Fy * scale;
                        sb.AppendLine($"    <line x1=\"{n.X.ToString("F1", inv)}\" y1=\"{n.Y.ToString("F1", inv)}\" x2=\"{ex.ToString("F1", inv)}\" y2=\"{ey.ToString("F1", inv)}\" stroke=\"#dc2626\" stroke-width=\"1.5\" opacity=\"0.85\" stroke-dasharray=\"3,1.5\" marker-end=\"url(#arr-red)\" />");
                    }

                    // Hooke spring forces along connected edges (solid blue)
                    foreach (var s in n.Springs)
                    {
                        double ex = n.X + s.Fx * scale;
                        double ey = n.Y + s.Fy * scale;
                        sb.AppendLine($"    <line x1=\"{n.X.ToString("F1", inv)}\" y1=\"{n.Y.ToString("F1", inv)}\" x2=\"{ex.ToString("F1", inv)}\" y2=\"{ey.ToString("F1", inv)}\" stroke=\"#2563eb\" stroke-width=\"1.8\" marker-end=\"url(#arr-blue)\" />");
                    }

                    // Net resultant force (bold green) - EXACT vector sum!
                    double nex = n.X + n.Fx * scale;
                    double ney = n.Y + n.Fy * scale;
                    sb.AppendLine($"    <line x1=\"{n.X.ToString("F1", inv)}\" y1=\"{n.Y.ToString("F1", inv)}\" x2=\"{nex.ToString("F1", inv)}\" y2=\"{ney.ToString("F1", inv)}\" stroke=\"#16a34a\" stroke-width=\"2.8\" marker-end=\"url(#arr-net)\" />");
                }
            }
            else if (mode == Mode.NetForcesOnly)
            {
                // In Iteration 2 and 15: Draw ONLY the bold green resultant force F_net
                foreach (var n in nodes)
                {
                    double fLen = Math.Sqrt(n.Fx * n.Fx + n.Fy * n.Fy);
                    if (fLen > 0.1)
                    {
                        double ex = n.X + n.Fx * scale;
                        double ey = n.Y + n.Fy * scale;
                        sb.AppendLine($"    <line x1=\"{n.X.ToString("F1", inv)}\" y1=\"{n.Y.ToString("F1", inv)}\" x2=\"{ex.ToString("F1", inv)}\" y2=\"{ey.ToString("F1", inv)}\" stroke=\"#16a34a\" stroke-width=\"2.6\" marker-end=\"url(#arr-net)\" />");
                    }
                }
            }
            // In Equilibrium: No force arrows (net force ≈ 0)

            sb.AppendLine("  </g>");
            sb.AppendLine();

            // Cards & Descriptions
            if (mode == Mode.DetailedForces)
            {
                sb.AppendLine("  <!-- Explanation Card -->");
                sb.AppendLine("  <g transform=\"translate(15, 248)\">");
                sb.AppendLine("    <rect width=\"250\" height=\"84\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#93c5fd\" stroke-width=\"1.5\" />");
                sb.AppendLine("    <text x=\"125\" y=\"20\" class=\"lbl\" style=\"fill: #1d4ed8;\">Kräfte-Vektoren (Start)</text>");
                sb.AppendLine("    <text x=\"125\" y=\"38\" class=\"desc\" style=\"fill: #2563eb;\">Blau: Hookesche Federn F_s (Kanten)</text>");
                sb.AppendLine("    <text x=\"125\" y=\"54\" class=\"desc\" style=\"fill: #dc2626;\">Rot: Coulomb-Abstoßung F_r (alle 10 Paare)</text>");
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
                sb.AppendLine("    <text x=\"125\" y=\"38\" class=\"desc\" style=\"fill: #166534;\">Summe F_net &#8776; 0 an allen Knoten</text>");
                sb.AppendLine("    <text x=\"125\" y=\"54\" class=\"desc\" style=\"font-weight: bold; fill: #15803d;\">Keine Restbewegungen mehr</text>");
                sb.AppendLine("    <text x=\"125\" y=\"72\" class=\"desc\" style=\"fill: #16a34a;\">Symmetrisch, organisch, kreuzungsfrei</text>");
                sb.AppendLine("  </g>");
                sb.AppendLine();
                sb.AppendLine("  <!-- Summary Footer -->");
                sb.AppendLine("  <rect x=\"15\" y=\"342\" width=\"250\" height=\"66\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#93c5fd\" stroke-width=\"1.5\" />");
                sb.AppendLine("  <text x=\"140\" y=\"364\" class=\"lbl\" style=\"fill: #1d4ed8;\">Finales Layout</text>");
                sb.AppendLine("  <text x=\"140\" y=\"382\" class=\"desc\" style=\"font-weight: bold; fill: #1e40af;\">Kantenlängen gleichmäßig d &#8776; l_0</text>");
                sb.AppendLine("  <text x=\"140\" y=\"398\" class=\"desc\" style=\"fill: #2563eb;\">Optimales Ergebnis der Partikelsimulation</text>");
            }

            sb.AppendLine("</svg>");
            File.WriteAllText(filePath, sb.ToString(), Encoding.UTF8);
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
