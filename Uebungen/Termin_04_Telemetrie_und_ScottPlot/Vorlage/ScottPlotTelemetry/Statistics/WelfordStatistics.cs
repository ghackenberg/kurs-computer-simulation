namespace ScottPlotTelemetry.Statistics;

/// <summary>
/// Numerisch stabiler Online-Algorithmus nach B. P. Welford (1962).
/// Berechnet laufenden Mittelwert und Stichprobenvarianz in O(1)-Zeit und O(1)-Speicher
/// ohne Speicherung historischer Messwerte und resistent gegen katastrophale Subtraktionsauslöschung.
/// </summary>
public class WelfordStatistics
{
    public long Count { get; private set; }
    public double Mean { get; private set; }
    public double M2 { get; private set; }
    public double Min { get; private set; } = double.PositiveInfinity;
    public double Max { get; private set; } = double.NegativeInfinity;

    /// <summary>
    /// Unverzerrte Stichprobenvarianz s^2 = M2 / (n - 1) für n >= 2.
    /// </summary>
    public double Variance => Count > 1 ? M2 / (Count - 1) : 0.0;

    /// <summary>
    /// Empirische Standardabweichung sigma = sqrt(s^2).
    /// </summary>
    public double StdDev => Math.Sqrt(Variance);

    /// <summary>
    /// Führt einen neuen Messwert x_k in die Online-Statistik ein.
    /// </summary>
    public void Add(double x)
    {
        Count++;

        if (x < Min) Min = x;
        if (x > Max) Max = x;

        // Welford-Rekursionsformel:
        // delta  = x_k - mean_{k-1}
        // mean_k = mean_{k-1} + delta / k
        // delta2 = x_k - mean_k
        // M2_k   = M2_{k-1} + delta * delta2
        double delta = x - Mean;
        Mean += delta / Count;
        double delta2 = x - Mean;
        M2 += delta * delta2;
    }

    /// <summary>
    /// Berechnet das dynamische Toleranzband [Mean - k*sigma, Mean + k*sigma].
    /// Standardmäßig k = 3 (Drei-Sigma-Regel: 99.73% aller Messwerte bei Normalverteilung).
    /// </summary>
    public (double Lower, double Upper) GetToleranceBand(double sigmaMultiplier = 3.0)
    {
        double band = sigmaMultiplier * StdDev;
        return (Mean - band, Mean + band);
    }

    /// <summary>
    /// Prüft, ob ein gegebener Messwert außerhalb des 3-Sigma-Toleranzbandes liegt (Anomalie).
    /// </summary>
    public bool IsAnomaly(double x, double sigmaMultiplier = 3.0)
    {
        if (Count < 10) return false; // Einschwingphase
        var (lower, upper) = GetToleranceBand(sigmaMultiplier);
        return x < lower || x > upper;
    }

    /// <summary>
    /// Setzt alle statistischen Zähler zurück.
    /// </summary>
    public void Reset()
    {
        Count = 0;
        Mean = 0.0;
        M2 = 0.0;
        Min = double.PositiveInfinity;
        Max = double.NegativeInfinity;
    }

    // =========================================================================
    // TODO: [Stufe A Sprint]
    // - Binden Sie WelfordStatistics an den 50 Hz Streaming-Loop an.
    // - Zeichnen Sie die horizontale Mittelwertlinie und das +/- 3-Sigma-Band in ScottPlot 5.
    // =========================================================================

    // =========================================================================
    // TODO: [Stufe B Track A: Industrie - Antriebsprüfstand]
    // - Mehrkanal-Tracking: Instanziieren Sie Tracker für Drehzahl n(t), Moment M(t), Schwingung a(t).
    // - Alarmierung: Detektieren Sie Kavitation/Schlupf bei > 3 konsekutiven Grenzwertverletzungen.
    // - ScottPlot 5 Phasenraum-Betriebskennfeld (M vs n) und Histogramm für Schwingungen.
    // =========================================================================

    // =========================================================================
    // TODO: [Stufe B Track B: Simulation Game - Retro Racing HUD]
    // - Telemetrie für Geschwindigkeit v(t), Querbeschleunigung a_y(t) und Motordrehzahl RPM.
    // =========================================================================
}
