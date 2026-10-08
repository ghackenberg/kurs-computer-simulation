using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Threading;
using HybridZeroCrossing.Hybrid;
using HybridZeroCrossing.Models;

namespace HybridZeroCrossing
{
    public partial class MainWindow : Window
    {
        private readonly BouncingContactModel _model = new();
        private readonly DispatcherTimer _timer = new();

        private double[] _state = new double[2]; // [y, v]
        private double _simTime = 0.0;
        private bool _isRunning = false;

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

            UpdateVisuals();
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

        private void Reset_Click(object sender, RoutedEventArgs e)
        {
            ResetSimulation();
        }

        private void Timer_Tick(object? sender, EventArgs e)
        {
            // Fester Zeitschritt h
            double h = 0.016; // 16 ms

            bool isBisection = MethodSelector.SelectedIndex == 0;

            if (isBisection)
            {
                _state = _model.StepWithBisection(_simTime, _state, h, out _);
            }
            else
            {
                _state = _model.StepNaive(_simTime, _state, h, out _, out _);
            }

            _simTime += h;
            UpdateVisuals();
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

            double energy = _model.ComputeTotalEnergy(_state);
            EnergyText.Text = $"E_tot: {energy:F2} J";
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
