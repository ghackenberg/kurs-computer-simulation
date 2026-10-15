using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using DiscreteEventSimulation.Models;
using ScottPlot;

namespace DiscreteEventSimulation
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Loaded += (_, _) =>
            {
                RunSingleSimulation();
                RunMonteCarloSimulation();
            };
        }

        private void BtnRunSingle_Click(object sender, RoutedEventArgs e)
        {
            RunSingleSimulation();
        }

        private void BtnRunMonteCarlo_Click(object sender, RoutedEventArgs e)
        {
            RunMonteCarloSimulation();
        }

        private (double lambda, double mu, int servers, int capacity, double tMax, double? logNormalStd) ReadParameters()
        {
            double lambda = ParseDouble(TxtLambda.Text, 4.0);
            double mu = ParseDouble(TxtMu.Text, 5.0);
            int servers = Math.Max(1, (int)ParseDouble(TxtServers.Text, 1));
            int rawCap = (int)ParseDouble(TxtCapacity.Text, 0);
            int capacity = rawCap <= 0 ? int.MaxValue : rawCap;
            double tMax = Math.Max(100.0, ParseDouble(TxtTMax.Text, 20000.0));

            double? logNormalStd = null;
            if (ChkUseLogNormal.IsChecked == true)
            {
                logNormalStd = Math.Max(1e-4, ParseDouble(TxtLogNormalStd.Text, 0.40));
            }

            return (lambda, mu, servers, capacity, tMax, logNormalStd);
        }

        private void RunSingleSimulation()
        {
            var (lambda, mu, servers, capacity, tMax, logNormalStd) = ReadParameters();

            var qs = new QueueSystem(lambda, mu, servers, capacity, logNormalStd);
            var res = qs.Simulate(tMax, seed: 42);

            double pBlock = res.TotalArrivals > 0 ? (double)res.BlockedCustomers / res.TotalArrivals : 0.0;

            // Vergleich: Little's Gesetz mit lambda_eff vs. naivem Brutto-lambda (Aufgabe A1)
            double naivePredictedL = lambda * res.MeanSystemTimeW;
            double naiveErrorL = res.MeanSystemCustomersL > 0
                ? Math.Abs(res.MeanSystemCustomersL - naivePredictedL) / res.MeanSystemCustomersL
                : 0.0;

            string anaText = "n/a (c > 1 oder K < ∞ oder M/G/1)";
            if (servers == 1 && capacity == int.MaxValue && !logNormalStd.HasValue && lambda < mu)
            {
                var (_, anaLq, anaL, anaWq, anaW) = QueueSystem.ComputeAnalyticalMM1(lambda, mu);
                anaText = $"L_q={anaLq:F2}, L={anaL:F2}, W_q={anaWq:F2}m, W={anaW:F2}m";
            }

            TxtKpiSummary.Text =
                $"Ankünfte gesamt:   {res.TotalArrivals,10:N0}\n" +
                $"Bediente Einheiten:{res.TotalDepartures,10:N0}\n" +
                $"Abgewiesen (Block):{res.BlockedCustomers,10:N0} ({pBlock * 100.0:F2} %)\n" +
                $"Auslastung ρ:      {res.UtilizationRho * 100.0,9:F1} %\n" +
                $"--------------------------------------\n" +
                $"Analytisch (M/M/1): {anaText}\n" +
                $"Mittlere Queue L_q:{res.MeanQueueLengthLq,10:F3}\n" +
                $"Mittlerer Best. L: {res.MeanSystemCustomersL,10:F3}\n" +
                $"Wartezeit W_q:     {res.MeanWaitTimeWq,10:F3} min\n" +
                $"Verweilzeit W:     {res.MeanSystemTimeW,10:F3} min\n" +
                $"λ_eff (Netto):     {res.EffectiveArrivalRate,10:F3} /min\n" +
                $"--------------------------------------\n" +
                $"Little's Gesetz (mit λ_eff):\n" +
                $"  L_sim = {res.MeanSystemCustomersL:F3} vs. λ_eff·W = {res.EffectiveArrivalRate * res.MeanSystemTimeW:F3}\n" +
                $"  Rel. Fehler (λ_eff): {res.LittlesLawRelErrorSystem * 100.0:F3} %\n" +
                $"  Rel. Fehler (naiv λ):{naiveErrorL * 100.0:F3} %";

            RenderSystemTimeHistogram(res);
        }

        private void RenderSystemTimeHistogram(QueueSimulationResult res)
        {
            PlotHistogram.Plot.Clear();

            var times = res.SystemTimes;
            if (times != null && times.Count > 10)
            {
                int binCount = 40;
                double maxVal = Math.Max(0.1, times.Max() * 0.98);
                double binWidth = maxVal / binCount;

                double[] xs = new double[binCount];
                double[] counts = new double[binCount];

                foreach (double v in times)
                {
                    int bin = (int)(v / binWidth);
                    if (bin >= 0 && bin < binCount)
                    {
                        counts[bin]++;
                    }
                }

                for (int i = 0; i < binCount; i++)
                {
                    xs[i] = (i + 0.5) * binWidth;
                }

                var bars = PlotHistogram.Plot.Add.Bars(xs, counts);
                foreach (var bar in bars.Bars)
                {
                    bar.Size = binWidth * 0.85;
                    bar.FillColor = Colors.CornflowerBlue;
                }

                var vLine = PlotHistogram.Plot.Add.VerticalLine(res.MeanSystemTimeW);
                vLine.Color = Colors.OrangeRed;
                vLine.LineWidth = 2;
                vLine.LegendText = $"Mittelwert W = {res.MeanSystemTimeW:F3} min";
            }

            PlotHistogram.Plot.Title("Histogramm der Durchlaufzeiten W = t_out - t_in (Einzellauf)");
            PlotHistogram.Plot.XLabel("Verweilzeit im System W [min]");
            PlotHistogram.Plot.YLabel("Häufigkeit (Kunden)");
            PlotHistogram.Plot.ShowLegend();
            PlotHistogram.Plot.Axes.AutoScale();
            PlotHistogram.Refresh();
        }

        private void RunMonteCarloSimulation()
        {
            var (lambda, mu, servers, capacity, _, logNormalStd) = ReadParameters();
            double tMaxReplication = 10_000.0;

            // TODO [Aufgabe A3]:
            // Erhöhen Sie die Anzahl der Replikationen auf R = 100 und parallelisieren Sie
            // die Schleife mittels `Parallel.For(0, replications, r => ...)`!
            // Nutzen Sie den deterministischen Seed `42 + r * 104729` (vgl. Kapitel 09, Abschnitt 9.7).
            int replications = 5;
            double[] meanWPerRun = new double[replications];
            double[] meanLqPerRun = new double[replications];

            for (int r = 0; r < replications; r++)
            {
                int seed = 42 + r * 104729;
                var qs = new QueueSystem(lambda, mu, servers, capacity, logNormalStd);
                var runRes = qs.Simulate(tMaxReplication, seed);
                meanWPerRun[r] = runRes.MeanSystemTimeW;
                meanLqPerRun[r] = runRes.MeanQueueLengthLq;
            }

            // Mittelwert, Stichprobenstandardabweichung s_W und 95%-Konfidenzintervall berechnen
            double sampleMeanW = meanWPerRun.Average();
            double sampleMeanLq = meanLqPerRun.Average();

            double sumSqDiff = 0.0;
            for (int r = 0; r < replications; r++)
            {
                double diff = meanWPerRun[r] - sampleMeanW;
                sumSqDiff += diff * diff;
            }

            double stdDevW = replications > 1 ? Math.Sqrt(sumSqDiff / (replications - 1)) : 0.0;
            double standardErrorW = replications > 0 ? stdDevW / Math.Sqrt(replications) : 0.0;
            double ciHalfWidth = 1.96 * standardErrorW;

            TxtMonteCarloSummary.Text =
                $"Replikationen R:   {replications,10}\n" +
                $"Dauer je Lauf:     {tMaxReplication,10:N0} min\n" +
                $"Mittelwert L_q:    {sampleMeanLq,10:F4}\n" +
                $"Mittelwert W:      {sampleMeanW,10:F4} min\n" +
                $"Std.-Abweichung s: {stdDevW,10:F4} min\n" +
                $"Standardfehler SE: {standardErrorW,10:F4} min\n" +
                $"95%-CI für E[W]:   [{sampleMeanW - ciHalfWidth:F4}, {sampleMeanW + ciHalfWidth:F4}] min\n" +
                $"                   (± {ciHalfWidth:F4} min)";

            PlotMonteCarlo.Plot.Clear();
            double[] runIndices = Enumerable.Range(1, replications).Select(i => (double)i).ToArray();

            var scatter = PlotMonteCarlo.Plot.Add.Scatter(runIndices, meanWPerRun);
            scatter.Color = Colors.MediumSeaGreen;
            scatter.LegendText = "Replikations-Mittelwert W_r";

            var meanLine = PlotMonteCarlo.Plot.Add.HorizontalLine(sampleMeanW);
            meanLine.Color = Colors.Gold;
            meanLine.LineWidth = 2;
            meanLine.LegendText = $"Gesamtmittel W = {sampleMeanW:F4} min";

            var ciUpper = PlotMonteCarlo.Plot.Add.HorizontalLine(sampleMeanW + ciHalfWidth);
            ciUpper.Color = Colors.OrangeRed;
            ciUpper.LinePattern = LinePattern.Dashed;
            ciUpper.LegendText = "95%-Konfidenzintervall (±1.96·SE)";

            var ciLower = PlotMonteCarlo.Plot.Add.HorizontalLine(sampleMeanW - ciHalfWidth);
            ciLower.Color = Colors.OrangeRed;
            ciLower.LinePattern = LinePattern.Dashed;

            PlotMonteCarlo.Plot.Title($"Monte-Carlo Replikationen (R = {replications}) & 95%-Konfidenzintervall");
            PlotMonteCarlo.Plot.XLabel("Replikation Nr. r");
            PlotMonteCarlo.Plot.YLabel("Mittlere Verweilzeit W_r [min]");
            PlotMonteCarlo.Plot.ShowLegend();
            PlotMonteCarlo.Plot.Axes.AutoScale();
            PlotMonteCarlo.Refresh();
        }

        private static double ParseDouble(string text, double fallback)
        {
            if (double.TryParse(text.Replace(',', '.'), NumberStyles.Float, CultureInfo.InvariantCulture, out double val))
            {
                return val;
            }
            return fallback;
        }
    }
}
