using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using MultithreadingBenchmark.Benchmarks;
using MultithreadingBenchmark.Simulation;

namespace MultithreadingBenchmark
{
    /// <summary>
    /// Datenpaket für die thread-sichere Rückmeldung des Simulationsfortschritts an den WPF-UI-Thread via IProgress&lt;T&gt;.
    /// </summary>
    public record SimulationProgress(
        int CurrentStep,
        int TotalSteps,
        double StepDurationMs,
        bool UsedParallel,
        int ThreadCount);

    public partial class MainWindow : Window
    {
        private const int BitmapWidth = 600;
        private const int BitmapHeight = 600;
        private const int ParticleCount = 100_000;
        private const double Dt = 0.002;

        private readonly ParticleField _field;
        private readonly WriteableBitmap _bitmap;
        private readonly uint[] _pixelBuffer;
        private double _baselineSequentialStepMs = 0.0;

        // TODO [Stufe A - Aufgabe A2]: CancellationTokenSource für den kooperativen Not-Aus verwalten
        private CancellationTokenSource? _cts;

        public MainWindow()
        {
            InitializeComponent();

            int maxCores = Environment.ProcessorCount;
            SliderThreads.Maximum = Math.Max(2, maxCores * 2);
            SliderThreads.Value = maxCores;
            TxtThreads.Text = maxCores.ToString();
            TxtSubHeader.Text = $"Host-System: {maxCores} logische Prozessorkerne | N = {ParticleCount:N0} Partikel";

            _field = new ParticleField(ParticleCount, seed: 42)
            {
                AttractorX = 500.0,
                AttractorY = 500.0,
                Mu = 120_000.0,
                Epsilon = 5.0
            };

            _bitmap = new WriteableBitmap(BitmapWidth, BitmapHeight, 96, 96, PixelFormats.Bgra32, null);
            _pixelBuffer = new uint[BitmapWidth * BitmapHeight];
            ParticleImage.Source = _bitmap;

            // Einmalige sequentielle Baseline-Messung (Warmup + Referenzzeit T_1)
            ParallelRunner.Warmup(5000, 1);
            var sw = Stopwatch.StartNew();
            _field.StepSequential(Dt);
            sw.Stop();
            _baselineSequentialStepMs = Math.Max(0.1, sw.Elapsed.TotalMilliseconds);

            RenderParticlesToBitmap();
        }

        private void RenderParticlesToBitmap()
        {
            _field.RenderToPixelBuffer(_pixelBuffer, BitmapWidth, BitmapHeight);
            _bitmap.WritePixels(
                new Int32Rect(0, 0, BitmapWidth, BitmapHeight),
                _pixelBuffer,
                BitmapWidth * sizeof(uint),
                0);
        }

        private void SliderThreads_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            if (TxtThreads != null)
            {
                TxtThreads.Text = ((int)SliderThreads.Value).ToString();
            }
        }

        private void ParticleImage_MouseDown(object sender, MouseButtonEventArgs e)
        {
            Point pos = e.GetPosition(ParticleImage);
            if (ParticleImage.ActualWidth > 0 && ParticleImage.ActualHeight > 0)
            {
                _field.AttractorX = (pos.X / ParticleImage.ActualWidth) * 1000.0;
                _field.AttractorY = (pos.Y / ParticleImage.ActualHeight) * 1000.0;
                TxtStatus.Text = $"Gravitations-Attraktor verschoben nach ({_field.AttractorX:F0}, {_field.AttractorY:F0}) m.";
                RenderParticlesToBitmap();
            }
        }

        private void BtnResetParticles_Click(object sender, RoutedEventArgs e)
        {
            _field.Initialize(seed: 42);
            _field.AttractorX = 500.0;
            _field.AttractorY = 500.0;
            SimProgressBar.Value = 0;
            RenderParticlesToBitmap();
            TxtStatus.Text = "Partikelfeld auf Ausgangszustand (Seed 42) zurückgesetzt.";
        }

        private void BtnStart_Click(object sender, RoutedEventArgs e)
        {
            const int totalSteps = 200;
            bool useParallel = ChkUseParallel.IsChecked == true;
            int threads = (int)SliderThreads.Value;

            // =========================================================================
            // TODO [Stufe A - Aufgabe A1 & A2]: UI-Freeze beheben!
            // Aktuell läuft die Simulationsschleife SYNCHRON im WPF-UI-Thread.
            // Dadurch friert das gesamte Fenster (inklusive ProgressBar und Not-Aus-Button)
            // während der 200 Zeitschritte komplett ein!
            //
            // Ihr Arbeitsauftrag:
            // 1. Machen Sie die Ereignismethode asynchron: private async void BtnStart_Click(...)
            // 2. Erzeugen Sie _cts = new CancellationTokenSource() und aktivieren Sie BtnCancel.IsEnabled = true.
            // 3. Erstellen Sie eine Instanz von Progress<SimulationProgress>(p => UpdateUiProgress(p)).
            // 4. Lagern Sie die for-Schleife in await Task.Run(() => { ... }, _cts.Token) aus!
            // 5. Übergeben Sie _cts.Token an StepParallel / StepSequential und rufen Sie alle 5 Schritte
            //    progress.Report(...) auf (nicht in jedem Schritt, um den UI-Thread nicht zu fluten!).
            // 6. Fangen Sie OperationCanceledException sauber im try/catch-Block ab.
            // =========================================================================

            BtnStart.IsEnabled = false;
            TxtStatus.Text = "Berechnung läuft (Achtung: noch synchron auf dem UI-Thread!)...";

            var sw = new Stopwatch();
            for (int step = 1; step <= totalSteps; step++)
            {
                sw.Restart();
                if (useParallel)
                {
                    _field.StepParallel(Dt, threads);
                }
                else
                {
                    _field.StepSequential(Dt);
                }
                sw.Stop();

                if (step % 5 == 0 || step == totalSteps)
                {
                    UpdateUiProgress(new SimulationProgress(step, totalSteps, sw.Elapsed.TotalMilliseconds, useParallel, threads));
                }
            }

            BtnStart.IsEnabled = true;
            TxtStatus.Text = $"Simulation abgeschlossen ({totalSteps} Schritte).";
        }

        private void UpdateUiProgress(SimulationProgress p)
        {
            SimProgressBar.Value = (double)p.CurrentStep / p.TotalSteps * 100.0;
            RenderParticlesToBitmap();

            double fps = 1000.0 / Math.Max(0.01, p.StepDurationMs);
            double speedup = _baselineSequentialStepMs / Math.Max(0.01, p.StepDurationMs);
            double estS = p.UsedParallel ? ParallelRunner.EstimateSerialFraction(speedup, p.ThreadCount) : 1.0;

            TxtStepTime.Text = $"Mittlere Schrittzeit:  {p.StepDurationMs,7:F2} ms/step";
            TxtFps.Text = $"Simulations-Durchsatz: {fps,7:F1} Steps/s (FPS)";
            TxtSpeedup.Text = $"Gemessener Speedup:    {speedup,7:F2} x (vs. 1 Kern)";
            TxtAmdahlS.Text = $"Serieller Anteil s:    {estS * 100.0,7:F2} %";
        }

        private void BtnCancel_Click(object sender, RoutedEventArgs e)
        {
            // TODO [Stufe A - Aufgabe A2]:
            // Lösen Sie hier den kooperativen Abbruch über _cts?.Cancel() aus!
            _cts?.Cancel();
        }

        private void BtnRunScaling_Click(object sender, RoutedEventArgs e)
        {
            // =========================================================================
            // TODO [Stufe A - Aufgabe A3]:
            // Führen Sie die Amdahl-Skalierungsreihe (ParallelRunner.RunScalingSeries)
            // asynchron über await Task.Run(...) aus, damit das UI während der Messreihe
            // über 1 .. P Kerne reaktionsfähig bleibt!
            // =========================================================================
            int maxCores = Environment.ProcessorCount;
            var threadCounts = new List<int>();
            for (int p = 1; p <= maxCores; p *= 2)
            {
                threadCounts.Add(p);
            }
            if (!threadCounts.Contains(maxCores))
            {
                threadCounts.Add(maxCores);
            }

            TxtStatus.Text = "Berechne Amdahl-Skalierungsreihe...";
            var results = ParallelRunner.RunScalingSeries(ParticleCount, steps: 15, dt: Dt, threadCounts.ToArray());
            ScalingGrid.ItemsSource = results;
            TxtStatus.Text = $"Skalierungsreihe für {results.Count} Thread-Stufen abgeschlossen.";
        }
    }
}
