using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Threading;
using HybridZeroCrossing.Hybrid;
using HybridZeroCrossing.Models;
using ScottPlot;

namespace HybridZeroCrossing
{
    public partial class MainWindow : Window
    {
        private readonly BouncingContactModel _model = new();
        private readonly DispatcherTimer _timer = new();

        private double[] _state = new double[2]; // [y, v]
        private double _simTime = 0.0;
        private bool _isRunning = false;

        // Telemetrie-Puffer für ScottPlot (Aufgabe A3)
        private readonly List<double> _timeLog = new();
        private readonly List<double> _energyLog = new();
        private readonly List<double> _heightLog = new();

        public MainWindow()
        {
            InitializeComponent();
            _timer.Interval = TimeSpan.FromMilliseconds(16); // ~60 FPS
            _timer.Tick += Timer_Tick;

            Loaded += (s, e) => ResetSimulation();
        }

        private void ResetSimulation()
        {
            _timer.Stop();
            _isRunning = false;
            StartPauseBtn.Content = "Start";

            double h0 = HeightSlider?.Value ?? 5.0;
            double e = RestitutionSlider?.Value ?? 0.8;

            _model.Restitution = e;
            _model.Reset();

            _state[0] = h0;
            _state[1] = 0.0;
            _simTime = 0.0;

            _timeLog.Clear();
            _energyLog.Clear();
            _heightLog.Clear();

            _timeLog.Add(_simTime);
            _energyLog.Add(_model.ComputeTotalEnergy(_state));
            _heightLog.Add(_state[0]);

            UpdateVisuals();
            UpdatePlot();
        }

        private void StartPause_Click(object sender, RoutedEventArgs e)
        {
            if (_isRunning)
            {
                _timer.Stop();
                _isRunning = false;
                StartPauseBtn.Content = "Start";
            }
            else
            {
                _timer.Start();
                _isRunning = true;
                StartPauseBtn.Content = "Pause";
            }
        }

        private void Kick_Click(object sender, RoutedEventArgs e)
        {
            // Vertikaler Impuls nach oben (Aufgabe A2)
            _model.ApplyVerticalImpulse(ref _state, deltaV: 6.0);
            UpdateVisuals();
        }

        private void Reset_Click(object sender, RoutedEventArgs e)
        {
            ResetSimulation();
        }

        private void Timer_Tick(object? sender, EventArgs e)
        {
            bool isBisection = MethodSelector.SelectedIndex == 0;

            // Im naiven Modus größere Schrittweite h = 0.048 s testen, damit die Bodenpenetration deutlich sichtbar wird
            double h = isBisection ? 0.016 : 0.048;

            if (isBisection)
            {
                _state = _model.StepWithBisection(_simTime, _state, h, out _);
            }
            else
            {
                _state = _model.StepNaive(_simTime, _state, h, out _, out _);
            }

            _simTime += h;

            _timeLog.Add(_simTime);
            _energyLog.Add(_model.ComputeTotalEnergy(_state));
            _heightLog.Add(_state[0]);

            UpdateVisuals();
            UpdatePlot();
        }

        private void UpdatePlot()
        {
            if (EnergyPlot == null || _timeLog.Count < 2) return;

            EnergyPlot.Plot.Clear();
            double[] ts = _timeLog.ToArray();
            double[] es = _energyLog.ToArray();

            var sigE = EnergyPlot.Plot.Add.Scatter(ts, es);
            sigE.Color = Colors.Crimson;
            sigE.LineWidth = 2;
            sigE.MarkerSize = 0;
            sigE.LegendText = "Gesamtenergie E_tot(t) [J]";

            // TODO [Aufgabe A3]:
            // Plotten Sie zusätzlich die Ballhöhe `_heightLog.ToArray()` (skaliert mit `* 10.0`, damit beide
            // Kurven im selben Wertebereich liegen) als zweite Kurve in `EnergyPlot.Plot.Add.Scatter(...)`!

            EnergyPlot.Plot.Title("Hybride Energie-Stufenfunktion E_tot(t) & Trajektorie");
            EnergyPlot.Plot.XLabel("Simulationszeit t [s]");
            EnergyPlot.Plot.YLabel("Energie E_tot [J]");
            EnergyPlot.Plot.ShowLegend();
            EnergyPlot.Plot.Axes.AutoScale();
            EnergyPlot.Refresh();
        }

        private void UpdateVisuals()
        {
            double canvasW = SimCanvas.ActualWidth;
            double canvasH = SimCanvas.ActualHeight;
            if (canvasW < 20 || canvasH < 20) return;

            double groundMargin = 60.0;
            double groundY = canvasH - groundMargin;

            // Boden zeichnen
            GroundLine.X1 = 20;
            GroundLine.Y1 = groundY;
            GroundLine.X2 = canvasW - 20;
            GroundLine.Y2 = groundY;

            // Skalierung: 8 Meter entsprechen (groundY - 60)
            double maxMeters = 8.0;
            double meterToPixel = (groundY - 60.0) / maxMeters;

            double ballRadiusPixels = _model.Radius * meterToPixel * 3.0; // Vergrößert für Sichtbarkeit
            if (ballRadiusPixels < 12) ballRadiusPixels = 12;

            BallVisual.Width = 2 * ballRadiusPixels;
            BallVisual.Height = 2 * ballRadiusPixels;

            double ballCenterYPixels = groundY - (_state[0] * meterToPixel);
            double ballCenterXPixels = canvasW / 2.0;

            Canvas.SetLeft(BallVisual, ballCenterXPixels - ballRadiusPixels);
            Canvas.SetTop(BallVisual, ballCenterYPixels - ballRadiusPixels);

            // Bumper in der rechten Canvas-Hälfte
            Canvas.SetLeft(BumperVisual, canvasW * 0.7);
            Canvas.SetTop(BumperVisual, groundY - (2.5 * meterToPixel));

            // Telemetrie
            TimeText.Text = $"Zeit t: {_simTime:F2} s";
            PosText.Text = $"Höhe y: {_state[0]:F3} m";
            VelText.Text = $"Geschw. v: {_state[1]:F2} m/s";
            BouncesText.Text = $"Stöße: {_model.BounceCount} ({_model.State})";
            PenetrationText.Text = $"Max. Penetr.: {_model.MaxPenetration * 1000.0:F2} mm";

            double energy = _model.ComputeTotalEnergy(_state);
            string ratioStr = _model.LastEnergyRatio > 0
                ? $"{_model.LastEnergyRatio:F4} (Soll e²={_model.Restitution * _model.Restitution:F2})"
                : "--";
            EnergyText.Text = $"E_tot: {energy:F2} J (E+/E-: {ratioStr})";
        }

        private void RestitutionSlider_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            if (RestitutionText != null)
            {
                RestitutionText.Text = $"{RestitutionSlider.Value:F2}";
                _model.Restitution = RestitutionSlider.Value;
            }
        }

        private void HeightSlider_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            if (HeightText != null)
            {
                HeightText.Text = $"{HeightSlider.Value:F1} m";
            }
            if (!_isRunning) ResetSimulation();
        }

        private void SimCanvas_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            UpdateVisuals();
        }
    }
}
