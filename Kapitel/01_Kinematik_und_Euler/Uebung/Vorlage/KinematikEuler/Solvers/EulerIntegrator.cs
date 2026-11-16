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

        // [Stufe 1 - Aufgabe 1.1] Referenz-Implementierung (Explizites Euler-Update 1. Ordnung):
        // x_{k+1} = x_k + dt * vx_k,   y_{k+1} = y_k + dt * vy_k
        // vx_{k+1} = vx_k + dt * ax,   vy_{k+1} = vy_k + dt * ay
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

        // [Stufe 1 - Aufgabe 1.2] Referenz-Implementierung (Lineare Nullstellen-Interpolation bei y = 0):
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
        // TODO [Stufe 1 - Aufgabe 1.3]: Prädiktor-Korrektor-Schritt (Heun / RK2) implementieren
        // 1. Steigung k1 am Intervallanfang t_k berechnen: var (ax1, ay1) = accelerationFunc(current);
        // 2. Prädiktor-Zustand (Euler-Hilfsschritt) predictor = StepEuler(current, dt, accelerationFunc) bilden.
        // 3. Steigung k2 am Intervallende t_{k+1} berechnen: var (ax2, ay2) = accelerationFunc(predictor);
        // 4. Mittelwert aus Anfangs- und Endsteigung (0.5 * dt * (...)) für X, Y, Vx, Vy anwenden.
        return StepEuler(current, dt, accelerationFunc);
    }

    // =========================================================================
    // TODO: [Stufe 2 Track A: Industrie - Hydraulikzylinder-Endlagendämpfung]
    // - Nutzen Sie StepEuler und StepHeun für den Konvergenzvergleich am Zylinder (t_end = 0.15 s).
    // - Implementieren Sie F_vor = 60 kN (durchgehend für x >= 0 m) und die nichtlineare Blendenreibung:
    //     F_daempf = d_lin * v + c_blend * v * |v|
    // - Untersuchen Sie die Stabilitätsgrenze am Kontaktanschlag (c_kontakt, d_kontakt, x_eq = 0.8012 m).
    // =========================================================================

    // =========================================================================
    // TODO: [Stufe 2 Track B: Simulation Game - Artillery Duel mit Newton-Drag]
    // - Erweitern Sie die Beschleunigungsfunktion um den quadratischen Luftwiderstand:
    //     F_d = 0.5 * rho * Cw * A * |v_rel|^2
    // - Berücksichtigen Sie den Relativwind v_rel = (vx - w_x, vy) sowie die Geländehöhe
    //     h_k = y_k - y_terrain(x_k) ab Startpunkt (0 m, 20.0 m).
    // =========================================================================
}
