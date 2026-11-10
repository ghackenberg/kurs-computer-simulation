namespace SimulationMvvmPattern.Model
{
    /// <summary>
    /// Unveränderliche Telemetriedaten eines Simulationsschritts zur entkoppelten UI-Synchronisation über IProgress.
    /// </summary>
    public readonly record struct SimulationTelemetry(
        double CurrentTime,
        double Position,
        double Velocity,
        long StepCount
    );
}
