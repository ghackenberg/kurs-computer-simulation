namespace PixelHeatFDM.Simulation;

/// <summary>
/// Randbedingungs-Modus für das 2D-Temperaturgitter.
/// </summary>
public enum BoundaryMode
{
    /// <summary>Feste Randtemperatur (Dirichlet-Randbedingung, z.B. 20 °C)</summary>
    DirichletFixed,
    /// <summary>Vollkommen isolierter Rand ohne Wärmestrom (Neumann-Randbedingung dT/dn = 0)</summary>
    NeumannAdiabatic
}

/// <summary>
/// 2D-Temperaturgitter mit FDM-Laplace-Stern (5-Punkt-Schablone) zur Lösung
/// der instationären Wärmeleitungsgleichung dT/dt = alpha * Laplace(T).
/// </summary>
public class HeatGrid
{
    public int Width { get; }
    public int Height { get; }

    /// <summary>Gitterabstand Delta x = Delta y in Metern [m].</summary>
    public float Dx { get; set; } = 0.001f;

    /// <summary>Temperaturleitfähigkeit alpha = lambda / (rho * c_p) in [m^2/s].</summary>
    public float Alpha { get; set; } = 1.0e-4f;

    /// <summary>Zeitschrittweite Delta t in Sekunden [s].</summary>
    public float Dt { get; set; } = 0.002f;

    /// <summary>Aktuelle Randbedingung an den Außenkanten.</summary>
    public BoundaryMode Boundary { get; set; } = BoundaryMode.DirichletFixed;

    /// <summary>Festgelegte Randtemperatur für Dirichlet-Randbedingungen [°C].</summary>
    public float AmbientTemperature { get; set; } = 20.0f;

    /// <summary>Zentraler Hotspot aktiv halten (Dauer-Wärmequelle).</summary>
    public bool MaintainHotspot { get; set; } = true;

    private float[,] _tCurrent;
    private float[,] _tNext;

    /// <summary>
    /// CFL-Diffusionszahl: s = alpha * dt / (dx^2).
    /// Für ein stabiles 2D-Verfahren MUSS s <= 0.25 (1/4) gelten!
    /// </summary>
    public float StabilityFactor => (Alpha * Dt) / (Dx * Dx);

    /// <summary>
    /// Prüft das Von-Neumann / CFL-Stabilitätskriterium.
    /// </summary>
    public bool IsStable => StabilityFactor <= 0.25f;

    /// <summary>
    /// Maximale theoretische Zeitschrittweite dt_krit = dx^2 / (4 * alpha).
    /// </summary>
    public float CriticalDt => (Dx * Dx) / (4.0f * Math.Max(Alpha, 1e-12f));

    public HeatGrid(int width = 128, int height = 128)
    {
        Width = width;
        Height = height;
        _tCurrent = new float[width, height];
        _tNext = new float[width, height];
        Reset();
    }

    /// <summary>
    /// Setzt das Gitter auf Umgebungstemperatur zurück und platziert den zentralen Hotspot.
    /// </summary>
    public void Reset()
    {
        for (int y = 0; y < Height; y++)
        {
            for (int x = 0; x < Width; x++)
            {
                _tCurrent[x, y] = AmbientTemperature;
                _tNext[x, y] = AmbientTemperature;
            }
        }

        if (MaintainHotspot)
        {
            ApplyHotspot(_tCurrent);
        }
    }

    /// <summary>
    /// Erzeugt eine Wärmequelle (z. B. 100 °C) in der Gittermitte.
    /// </summary>
    public void ApplyHotspot(float[,] grid, float temp = 100.0f)
    {
        int midX = Width / 2;
        int midY = Height / 2;
        int radius = Math.Max(2, Width / 16);

        for (int y = midY - radius; y <= midY + radius; y++)
        {
            for (int x = midX - radius; x <= midX + radius; x++)
            {
                if (x >= 0 && x < Width && y >= 0 && y < Height)
                {
                    grid[x, y] = temp;
                }
            }
        }
    }

    /// <summary>
    /// Führt einen FDM-Zeitschritt über den 5-Punkt-Differenzenstern aus.
    /// T^{k+1}_{x,y} = T^k_{x,y} + s * (T_{x+1,y} + T_{x-1,y} + T_{x,y+1} + T_{x,y-1} - 4*T_{x,y})
    /// </summary>
    public void Step()
    {
        float s = StabilityFactor;

        // FDM-Berechnung für innere Gitterpunkte (1 .. Width-2, 1 .. Height-2)
        for (int y = 1; y < Height - 1; y++)
        {
            for (int x = 1; x < Width - 1; x++)
            {
                float tCenter = _tCurrent[x, y];
                float tRight  = _tCurrent[x + 1, y];
                float tLeft   = _tCurrent[x - 1, y];
                float tUp     = _tCurrent[x, y + 1];
                float tDown   = _tCurrent[x, y - 1];

                // Laplace-Operator in 2D
                float laplace = (tRight + tLeft + tUp + tDown - 4.0f * tCenter);

                _tNext[x, y] = tCenter + s * laplace;
            }
        }

        // Randbedingungen anwenden
        ApplyBoundaryConditions(_tNext);

        if (MaintainHotspot)
        {
            ApplyHotspot(_tNext);
        }

        // Puffer tauschen (Pointer-Swap, 0 GC-Allokationen)
        (_tCurrent, _tNext) = (_tNext, _tCurrent);
    }

    private void ApplyBoundaryConditions(float[,] grid)
    {
        if (Boundary == BoundaryMode.DirichletFixed)
        {
            // Feste Temperatur an den Rändern
            for (int x = 0; x < Width; x++)
            {
                grid[x, 0] = AmbientTemperature;
                grid[x, Height - 1] = AmbientTemperature;
            }
            for (int y = 0; y < Height; y++)
            {
                grid[0, y] = AmbientTemperature;
                grid[Width - 1, y] = AmbientTemperature;
            }
        }
        else if (Boundary == BoundaryMode.NeumannAdiabatic)
        {
            // Isolierter Rand (dT/dn = 0): Randwerte übernehmen den Wert des inneren Nachbarn
            for (int x = 0; x < Width; x++)
            {
                grid[x, 0] = grid[x, 1];
                grid[x, Height - 1] = grid[x, Height - 2];
            }
            for (int y = 0; y < Height; y++)
            {
                grid[0, y] = grid[1, y];
                grid[Width - 1, y] = grid[Width - 2, y];
            }
        }
    }

    /// <summary>
    /// Berechnet die thermische Summe / Energiebilanz im Gitter (zu Test- und Validierungszwecken).
    /// </summary>
    public double CalculateTotalHeatSum()
    {
        double sum = 0.0;
        for (int y = 0; y < Height; y++)
        {
            for (int x = 0; x < Width; x++)
            {
                sum += _tCurrent[x, y];
            }
        }
        return sum;
    }

    public float GetTemperature(int x, int y) => _tCurrent[x, y];
    public void SetTemperature(int x, int y, float value) => _tCurrent[x, y] = value;

    public float[,] GetCurrentGrid() => _tCurrent;

    // =========================================================================
    // TODO: [Stufe A Sprint]
    // - Beobachten Sie die Diffusion bei veränderten Werten für Dt und Alpha.
    // - Erhöhen Sie Dt über CriticalDt (s > 0.25) und dokumentieren Sie die numerische Instabilität.
    // =========================================================================

    // =========================================================================
    // TODO: [Stufe B Track A: Industrie - CPU-Kühlkörper-Optimizer]
    // - Modellieren Sie ein ortsabhängiges Materialgitter mit Alpha(x, y):
    //     Silizium-Die, Wärmeleitpaste (TIM), Kupfer-Heatspreader, Aluminium-Finnen.
    // - Implementieren Sie den Verlustleistungs-Quellterm dot_q_v im CPU-Die.
    // - Implementieren Sie Robin-Randbedingungen: -lambda * (dT/dn) = h * (T - T_inf)
    //   für Lüfterbetrieb (h = 250 W/m^2K) vs. Lüfterausfall (h = 20 W/m^2K).
    // =========================================================================

    // =========================================================================
    // TODO: [Stufe B Track B: Simulation Game - Falling Sand / Doom Fire]
    // - Erweitern Sie das Gitter um zelluläre Automaten-Partikel oder Konvektionseffekte.
    // =========================================================================
}
