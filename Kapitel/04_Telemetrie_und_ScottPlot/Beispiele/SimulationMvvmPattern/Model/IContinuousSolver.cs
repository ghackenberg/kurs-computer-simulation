namespace SimulationMvvmPattern.Model
{
    /// <summary>
    /// Schnittstelle für numerische Integrationsverfahren von ODE-Anfangswertproblemen.
    /// </summary>
    public interface IContinuousSolver
    {
        /// <summary>
        /// Führt einen numerischen Integrationsschritt der Schrittweite dt durch und aktualisiert x in-place.
        /// </summary>
        /// <param name="model">Das physikalische kontinuierliche Systemmodell.</param>
        /// <param name="t">Aktuelle Zeit t vor dem Schritt.</param>
        /// <param name="x">Zustandsvektor x (wird in-place auf x(t+dt) aktualisiert).</param>
        /// <param name="dt">Schrittweite dt in Sekunden.</param>
        void Step(IContinuousModel model, double t, double[] x, double dt);
    }
}
