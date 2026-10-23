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

            // Generate dedicated theory diagrams for annealing and oscillations
            GenerateOscillationSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Oszillation.svg"));
            GenerateConvergenceSvg(Path.Combine(diagramDir, "Mini_ForceDirected_Konvergenz.svg"));

            Console.WriteLine("Force-Directed Simulations-SVGs erfolgreich erzeugt!");
        }

        private static void GenerateOscillationSvg(string filePath)
        {
            var sb = new StringBuilder();
            sb.AppendLine("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 420\" width=\"280\" height=\"420\">");
            sb.AppendLine("  <defs>");
            sb.AppendLine("    <style>");
            sb.AppendLine("      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }");
            sb.AppendLine("      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11.5px; fill: #475569; text-anchor: middle; }");
            sb.AppendLine("      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; font-weight: bold; text-anchor: middle; }");
            sb.AppendLine("      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11.5px; fill: #334155; text-anchor: middle; }");
            sb.AppendLine("    </style>");
            sb.AppendLine("    <marker id=\"arr-red-osc\" viewBox=\"0 0 10 10\" refX=\"7\" refY=\"5\" markerWidth=\"5\" markerHeight=\"5\" orient=\"auto-start-reverse\">");
            sb.AppendLine("      <path d=\"M 0 1.5 L 9 5 L 0 8.5 z\" fill=\"#dc2626\" />");
            sb.AppendLine("    </marker>");
            sb.AppendLine("    <marker id=\"arr-grn-osc\" viewBox=\"0 0 10 10\" refX=\"7\" refY=\"5\" markerWidth=\"5\" markerHeight=\"5\" orient=\"auto-start-reverse\">");
            sb.AppendLine("      <path d=\"M 0 1.5 L 9 5 L 0 8.5 z\" fill=\"#16a34a\" />");
            sb.AppendLine("    </marker>");
            sb.AppendLine("  </defs>");
            sb.AppendLine();
            sb.AppendLine("  <rect width=\"280\" height=\"420\" rx=\"10\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1.5\" />");
            sb.AppendLine("  <text x=\"140\" y=\"24\" class=\"hdr\">Das Oszillations-Dilemma</text>");
            sb.AppendLine("  <text x=\"140\" y=\"42\" class=\"sub\">Ungedämpft vs. Simulated Annealing</text>");
            sb.AppendLine();
            sb.AppendLine("  <!-- Graphic canvas -->");
            sb.AppendLine("  <g transform=\"translate(15, 54)\">");
            sb.AppendLine("    <rect width=\"250\" height=\"184\" rx=\"6\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\" />");
            sb.AppendLine();
            sb.AppendLine("    <!-- Left Compartment: Ungedämpft -->");
            sb.AppendLine("    <text x=\"62\" y=\"18\" class=\"lbl\" style=\"fill: #dc2626; text-anchor: middle;\">Ungedämpft</text>");
            sb.AppendLine("    <text x=\"62\" y=\"32\" class=\"desc\" style=\"fill: #7f1d1d; font-size: 11.5px; text-anchor: middle;\">T = const</text>");
            sb.AppendLine("    <circle cx=\"62\" cy=\"95\" r=\"9\" fill=\"#fee2e2\" stroke=\"#ef4444\" stroke-width=\"1.5\" stroke-dasharray=\"2,2\" />");
            sb.AppendLine();
            sb.AppendLine("    <!-- Limit Cycle Trajectory (Overshooting) -->");
            sb.AppendLine("    <path d=\"M 26 55 L 98 135 L 32 130 L 92 60 Z\" fill=\"none\" stroke=\"#dc2626\" stroke-width=\"2\" stroke-dasharray=\"4,2\" />");
            sb.AppendLine("    <line x1=\"26\" y1=\"55\" x2=\"64\" y2=\"97\" stroke=\"#dc2626\" stroke-width=\"2\" marker-end=\"url(#arr-red-osc)\" />");
            sb.AppendLine("    <line x1=\"98\" y1=\"135\" x2=\"60\" y2=\"132\" stroke=\"#dc2626\" stroke-width=\"2\" marker-end=\"url(#arr-red-osc)\" />");
            sb.AppendLine("    <line x1=\"32\" y1=\"130\" x2=\"66\" y2=\"89\" stroke=\"#dc2626\" stroke-width=\"2\" marker-end=\"url(#arr-red-osc)\" />");
            sb.AppendLine("    <circle cx=\"26\" cy=\"55\" r=\"5\" fill=\"#ef4444\" stroke=\"#ffffff\" stroke-width=\"1.5\" />");
            sb.AppendLine("    <circle cx=\"98\" cy=\"135\" r=\"5\" fill=\"#ef4444\" stroke=\"#ffffff\" stroke-width=\"1.5\" />");
            sb.AppendLine("    <circle cx=\"32\" cy=\"130\" r=\"5\" fill=\"#ef4444\" stroke=\"#ffffff\" stroke-width=\"1.5\" />");
            sb.AppendLine("    <text x=\"62\" y=\"166\" class=\"desc\" style=\"font-weight: bold; fill: #b91c1c; text-anchor: middle;\">Grenzzyklus</text>");
            sb.AppendLine();
            sb.AppendLine("    <!-- Divider -->");
            sb.AppendLine("    <line x1=\"125\" y1=\"10\" x2=\"125\" y2=\"174\" stroke=\"#e2e8f0\" stroke-width=\"1.5\" stroke-dasharray=\"3,3\" />");
            sb.AppendLine();
            sb.AppendLine("    <!-- Right Compartment: Mit Annealing -->");
            sb.AppendLine("    <text x=\"188\" y=\"18\" class=\"lbl\" style=\"fill: #15803d; text-anchor: middle;\">Mit Annealing</text>");
            sb.AppendLine("    <text x=\"188\" y=\"32\" class=\"desc\" style=\"fill: #14532d; font-size: 11.5px; text-anchor: middle;\">T_{k+1} = &#947; &#183; T_k</text>");
            sb.AppendLine("    <circle cx=\"188\" cy=\"95\" r=\"9\" fill=\"#dcfce7\" stroke=\"#22c55e\" stroke-width=\"1.5\" />");
            sb.AppendLine();
            sb.AppendLine("    <!-- Converging Damped Spiral Trajectory -->");
            sb.AppendLine("    <line x1=\"148\" y1=\"55\" x2=\"218\" y2=\"122\" stroke=\"#16a34a\" stroke-width=\"2.2\" marker-end=\"url(#arr-grn-osc)\" />");
            sb.AppendLine("    <line x1=\"218\" y1=\"122\" x2=\"172\" y2=\"106\" stroke=\"#16a34a\" stroke-width=\"1.8\" marker-end=\"url(#arr-grn-osc)\" />");
            sb.AppendLine("    <line x1=\"172\" y1=\"106\" x2=\"188\" y2=\"95\" stroke=\"#16a34a\" stroke-width=\"1.5\" marker-end=\"url(#arr-grn-osc)\" />");
            sb.AppendLine("    <circle cx=\"148\" cy=\"55\" r=\"5\" fill=\"#22c55e\" stroke=\"#ffffff\" stroke-width=\"1.5\" />");
            sb.AppendLine("    <circle cx=\"218\" cy=\"122\" r=\"4.5\" fill=\"#22c55e\" stroke=\"#ffffff\" stroke-width=\"1.5\" />");
            sb.AppendLine("    <circle cx=\"188\" cy=\"95\" r=\"6\" fill=\"#2563eb\" stroke=\"#ffffff\" stroke-width=\"1.8\" />");
            sb.AppendLine("    <text x=\"188\" y=\"166\" class=\"desc\" style=\"font-weight: bold; fill: #15803d; text-anchor: middle;\">Stabile Ruhelage</text>");
            sb.AppendLine("  </g>");
            sb.AppendLine();
            sb.AppendLine("  <!-- Explanation Card -->");
            sb.AppendLine("  <g transform=\"translate(15, 248)\">");
            sb.AppendLine("    <rect width=\"250\" height=\"84\" rx=\"6\" fill=\"#fff7ed\" stroke=\"#fdba74\" stroke-width=\"1.5\" />");
            sb.AppendLine("    <text x=\"125\" y=\"20\" class=\"lbl\" style=\"fill: #c2410c;\">Ursache des Oszillierens</text>");
            sb.AppendLine("    <text x=\"125\" y=\"38\" class=\"desc\" style=\"fill: #9a3412;\">Coulomb-Kräfte steigen quadratisch (1/d²)</text>");
            sb.AppendLine("    <text x=\"125\" y=\"54\" class=\"desc\" style=\"fill: #9a3412;\">Knoten schießen über das Minimum hinaus</text>");
            sb.AppendLine("    <text x=\"125\" y=\"72\" class=\"desc\" style=\"font-weight: bold; fill: #ea580c;\">Ohne Dämpfung entsteht ein Limit Cycle!</text>");
            sb.AppendLine("  </g>");
            sb.AppendLine();
            sb.AppendLine("  <!-- Summary Footer -->");
            sb.AppendLine("  <rect x=\"15\" y=\"342\" width=\"250\" height=\"66\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1.5\" />");
            sb.AppendLine("  <text x=\"140\" y=\"364\" class=\"lbl\" style=\"fill: #004B96;\">Dämpfung durch Annealing</text>");
            sb.AppendLine("  <text x=\"140\" y=\"382\" class=\"desc\" style=\"font-weight: bold; fill: #334155;\">Schrittweite schrumpft mit T_k</text>");
            sb.AppendLine("  <text x=\"140\" y=\"398\" class=\"desc\" style=\"fill: #64748b;\">Dämpft kinetische Energie des Systems</text>");
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
            sb.AppendLine("    <marker id=\"arr-net\" viewBox=\"0 0 10 10\" refX=\"7\" refY=\"5\" markerWidth=\"5.5\" markerHeight=\"5.5\" orient=\"auto-start-reverse\">");
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
    }
}
