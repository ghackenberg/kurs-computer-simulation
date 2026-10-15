using KinematikEuler.Models;

namespace KinematikEuler.Solvers;

/// <summary>
/// Numerischer Integrator für kinematische Systeme und Bewegungsgleichungen 2. Ordnung.
/// </summary>
public static class EulerIntegrator
{
    /// <summary>
    /// Führt einen expliziten Euler-Integrationsschritt erster Ordnung aus:
    /// x_{k+1} = x_k + dt * v_k
    /// v_{k+1} = v_k + dt * a(t_k, x_k, v_k)
    /// t_{k+1} = t_k + dt
    /// </summary>
    /// <param name="current">Aktueller Systemzustand zum Zeitpunkt t_k</param>
    /// <param name="dt">Schrittweite Delta t in Sekunden</param>
    /// <param name="accelerationFunc">Berechnung der Beschleunigung a = f(t, x, v)</param>
    /// <returns>Neuer Zustand zum Zeitpunkt t_{k+1}</returns>
    public static KinematicState StepEuler(
        KinematicState current, 
        double dt, 
        Func<KinematicState, (double ax, double ay)> accelerationFunc)
    {
        // Systemableitungen an der Stelle t_k auswerten
        var (ax, ay) = accelerationFunc(current);

        // Explizites Euler-Update:
        // x_{k+1} = x_k + dt * v_k
        // y_{k+1} = y_k + dt * v_k
        // vx_{k+1} = vx_k + dt * ax
        // vy_{k+1} = vy_k + dt * ay
        double nextTime = current.Time + dt;
        double nextX = current.X + dt * current.Vx;
        double nextY = current.Y + dt * current.Vy;
        double nextVx = current.Vx + dt * ax;
        double nextVy = current.Vy + dt * ay;

        return new KinematicState(nextTime, nextX, nextY, nextVx, nextVy);
    }

    /// <summary>
    /// Berechnet den exakten Auftreffzeitpunkt und -ort auf der Nulllinie (y = 0)
    /// mittels linearer Schnittpunkt-Interpolation zwischen Zustand k und k+1.
    /// Vermeidet Tunneling-Effekte und Überpenetration.
    /// </summary>
    /// <param name="previous">Letzter Zustand VOR Durchdringung (y_k >= 0)</param>
    /// <param name="current">Erster Zustand NACH Durchdringung (y_{k+1} < 0)</param>
    /// <returns>Interpolierter Zustand exakt bei y = 0</returns>
    public static KinematicState InterpolateGroundImpact(KinematicState previous, KinematicState current)
    {
        if (Math.Abs(current.Y - previous.Y) < 1e-12)
            return current;

        // tau in [0, 1]: Anteil des Zeitschritts bis y = 0
        double tau = (0.0 - previous.Y) / (current.Y - previous.Y);
        tau = Math.Clamp(tau, 0.0, 1.0);

        double tImpact = previous.Time + tau * (current.Time - previous.Time);
        double xImpact = previous.X + tau * (current.X - previous.X);
        double vxImpact = previous.Vx + tau * (current.Vx - previous.Vx);
        double vyImpact = previous.Vy + tau * (current.Vy - previous.Vy);

        return new KinematicState(tImpact, xImpact, 0.0, vxImpact, vyImpact);
    }

    /// <summary>
    /// Führt einen Prädiktor-Korrektor-Integrationsschritt nach Heun (Runge-Kutta 2. Ordnung) aus:
    /// 1. Prädiktor (Euler-Hilfsschritt): x_tilde = x_k + dt * f(t_k, x_k)
    /// 2. Korrektor (Trapez-Mittelung):   x_{k+1} = x_k + (dt / 2) * [ f(t_k, x_k) + f(t_k + dt, x_tilde) ]
    /// </summary>
    public static KinematicState StepHeun(
        KinematicState current,
        double dt,
        Func<KinematicState, (double ax, double ay)> accelerationFunc)
    {
        // TODO [Stufe A Aufgabe A2 & Stufe B]:
        // 1. Steigung k1 am Intervallanfang t_k berechnen: var (ax1, ay1) = accelerationFunc(current);
        // 2. Prädiktor-Zustand (Euler-Schritt) tildeState = StepEuler(current, dt, accelerationFunc) bilden.
        // 3. Steigung k2 am Intervallende t_{k+1} berechnen: var (ax2, ay2) = accelerationFunc(tildeState);
        // 4. Mittelwert aus Anfangs- und Endsteigung für X, Y, Vx, Vy anwenden:
        var (ax1, ay1) = accelerationFunc(current);
        KinematicState predictor = StepEuler(current, dt, accelerationFunc);
        var (ax2, ay2) = accelerationFunc(predictor);

        double nextTime = current.Time + dt;
        double nextX = current.X + 0.5 * dt * (current.Vx + predictor.Vx);
        double nextY = current.Y + 0.5 * dt * (current.Vy + predictor.Vy);
        double nextVx = current.Vx + 0.5 * dt * (ax1 + ax2);
        double nextVy = current.Vy + 0.5 * dt * (ay1 + ay2);

        return new KinematicState(nextTime, nextX, nextY, nextVx, nextVy);
    }

    // =========================================================================
    // TODO: [Stufe B Track A: Industrie - Hydraulikzylinder-Endlagendämpfung]
    // - Nutzen Sie StepEuler und StepHeun für den Konvergenzvergleich am Zylinder.
    // - Implementieren Sie die nichtlineare Zylinderkraft mit Blendenreibung:
    //     F_daempf = d_lin * v + c_blend * v * |v|
    // - Untersuchen Sie die Stabilitätsgrenze am Kontaktanschlag (c_kontakt, d_kontakt).
    // =========================================================================

    // =========================================================================
    // TODO: [Stufe B Track B: Simulation Game - Artillery Duel mit Newton-Drag]
    // - Erweitern Sie die Beschleunigungsfunktion um den quadratischen Luftwiderstand:
    //     F_d = 0.5 * rho * Cw * A * |v_rel|^2
    // - Berücksichtigen Sie relative Windvektoren v_rel = v - v_wind(t).
    // =========================================================================
}
