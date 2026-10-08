namespace KinematikEuler.Models;

/// <summary>
/// Unveränderlicher Zustandsvektor eines mechatronischen Punktmassen-Systems.
/// x = [x, y, vx, vy]^T zum Zeitpunkt t.
/// </summary>
public readonly record struct KinematicState(
    double Time,
    double X,
    double Y,
    double Vx,
    double Vy)
{
    /// <summary>
    /// Berechnet den Betrag der aktuellen Bahngeschwindigkeit |v| = sqrt(vx^2 + vy^2).
    /// </summary>
    public double Speed => Math.Sqrt(Vx * Vx + Vy * Vy);

    /// <summary>
    /// Gibt den aktuellen Zustand formatiert für die Konsolenausgabe zurück.
    /// </summary>
    public override string ToString() =>
        $"t={Time:F3}s | Pos=({X:F2}, {Y:F2})m | Vel=({Vx:F2}, {Vy:F2})m/s | |v|={Speed:F2}m/s";
}
