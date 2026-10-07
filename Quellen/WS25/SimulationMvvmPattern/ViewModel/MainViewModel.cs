using System;
using System.Threading;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using SimulationMvvmPattern.Model;

namespace SimulationMvvmPattern.ViewModel
{
    /// <summary>
    /// ViewModel für die kontinuierliche Oszillatorsimulation nach dem MVVM-Muster.
    /// Kapselt Berechnungsmodelle, asynchrone Threading-Steuerung und reaktive UI-Zustände.
    /// Vollständig unabhängig von konkreten UI-Frameworks (0 Referenzen auf System.Windows oder ScottPlot).
    /// </summary>
    public partial class MainViewModel : ObservableObject
    {
        private readonly MassSpringDamperModel _model = new();
        private readonly IContinuousSolver _solver = new RungeKutta4Solver();
        private CancellationTokenSource? _cts;

        /// <summary>
        /// Vorallokierter Ringpuffer für die Signal-Visualisierung (2000 Datenpunkte).
        /// </summary>
        public SimulationRingBuffer Buffer { get; } = new(capacity: 2000);

        [ObservableProperty]
        private double _mass = 1.0;

        [ObservableProperty]
        private double _springConstant = 20.0;

        [ObservableProperty]
        private double _damping = 0.5;

        [ObservableProperty]
        private double _timeStep = 0.005;

        [ObservableProperty]
        private double _initialPosition = 1.0;

        [ObservableProperty]
        private double _initialVelocity = 0.0;

        [ObservableProperty]
        private double _currentTime = 0.0;

        [ObservableProperty]
        private double _currentPosition = 1.0;

        [ObservableProperty]
        private double _currentVelocity = 0.0;

        [ObservableProperty]
        private long _stepCount = 0;

        [ObservableProperty]
        [NotifyCanExecuteChangedFor(nameof(StartCommand))]
        [NotifyCanExecuteChangedFor(nameof(StopCommand))]
        private bool _isRunning = false;

        [ObservableProperty]
        private string _statusMessage = "Bereit";

        public bool CanStart => !IsRunning;
        public bool CanStop => IsRunning;

        [RelayCommand(CanExecute = nameof(CanStart))]
        private async Task StartAsync()
        {
            IsRunning = true;
            StatusMessage = "Simulation läuft...";
            _cts = new CancellationTokenSource();

            // Modellparameter aus ViewModel übernehmen
            _model.Mass = Mass;
            _model.SpringConstant = SpringConstant;
            _model.Damping = Damping;

            double dt = TimeStep;
            double t0 = CurrentTime;
            double x0 = CurrentPosition;
            double v0 = CurrentVelocity;
            long initialSteps = StepCount;

            var progress = new Progress<SimulationTelemetry>(telemetry =>
            {
                CurrentTime = telemetry.CurrentTime;
                CurrentPosition = telemetry.Position;
                CurrentVelocity = telemetry.Velocity;
                StepCount = telemetry.StepCount;
            });

            try
            {
                await Task.Run(() => RunWorkerLoop(_cts.Token, progress, dt, t0, x0, v0, initialSteps));
                StatusMessage = "Simulation beendet.";
            }
            catch (OperationCanceledException)
            {
                StatusMessage = "Simulation angehalten.";
            }
            catch (Exception ex)
            {
                StatusMessage = $"Fehler: {ex.Message}";
            }
            finally
            {
                IsRunning = false;
            }
        }

        [RelayCommand(CanExecute = nameof(CanStop))]
        private void Stop()
        {
            _cts?.Cancel();
        }

        [RelayCommand]
        private void Reset()
        {
            if (IsRunning)
            {
                _cts?.Cancel();
            }

            Buffer.Clear();
            CurrentTime = 0.0;
            CurrentPosition = InitialPosition;
            CurrentVelocity = InitialVelocity;
            StepCount = 0;
            StatusMessage = "Zurückgesetzt.";
        }

        private void RunWorkerLoop(
            CancellationToken token,
            IProgress<SimulationTelemetry> progress,
            double dt,
            double startTime,
            double startPos,
            double startVel,
            long startSteps)
        {
            double[] x = [startPos, startVel];
            double t = startTime;
            long steps = startSteps;
            int reportCounter = 0;

            // Initialen Punkt einreihen, falls Puffer leer ist
            if (Buffer.Count == 0)
            {
                Buffer.Enqueue(t, x[0]);
            }

            while (!token.IsCancellationRequested)
            {
                // Numerischer Integrationsschritt (RK4)
                _solver.Step(_model, t, x, dt);
                t += dt;
                steps++;

                // Trajektorie thread-sicher streamen
                Buffer.Enqueue(t, x[0]);

                // Periodisches Telemetrie-Update für den UI-Thread
                if (++reportCounter % 20 == 0)
                {
                    progress.Report(new SimulationTelemetry(t, x[0], x[1], steps));
                }

                // Taktung zur Echtzeitsimulation (ca. 1 kHz Simulationsrate)
                Thread.Sleep(1);
            }

            // Letzten Stand synchronisieren
            progress.Report(new SimulationTelemetry(t, x[0], x[1], steps));
        }
    }
}
