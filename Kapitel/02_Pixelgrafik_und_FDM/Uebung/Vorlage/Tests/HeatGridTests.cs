using Microsoft.VisualStudio.TestTools.UnitTesting;
using PixelHeatFDM.Simulation;

namespace HeatGridTests;

[TestClass]
public class HeatGridTests
{
    [TestMethod]
    public void Test_CflStabilityCriterion_DetectsStableAndUnstableLimits()
    {
        var grid = new HeatGrid(32, 32)
        {
            Dx = 0.001f,
            Alpha = 1.0e-4f
        };

        // dx = 1e-3 => dx^2 = 1e-6
        // dt_krit = dx^2 / (4 * alpha) = 1e-6 / 4e-4 = 0.0025 s

        // Fall 1: dt = 0.0020 s => s = 1e-4 * 0.002 / 1e-6 = 0.20 <= 0.25 => STABIL
        grid.Dt = 0.0020f;
        Assert.IsTrue(grid.IsStable, "s = 0.20 muss als stabil gewertet werden.");
        Assert.IsTrue(grid.StabilityFactor <= 0.25f);

        // Fall 2: dt = 0.0025 s => s = 0.2500 => GRENZFALL STABIL
        grid.Dt = 0.0025f;
        Assert.IsTrue(grid.IsStable, "s = 0.25 muss als stabil gewertet werden.");

        // Fall 3: dt = 0.0030 s => s = 0.3000 > 0.25 => INSTABIL
        grid.Dt = 0.0030f;
        Assert.IsFalse(grid.IsStable, "s = 0.30 muss als instabil gewertet werden.");
    }

    [TestMethod]
    public void Test_EnergyConservation_AdiabaticSystem()
    {
        // In einem isolierten (adiabaten) Gitter ohne externe Wärmequellen
        // muss die Summe aller thermischen Energiewerte bei FDM-Diffusion streng konstant bleiben.
        int n = 32;
        var grid = new HeatGrid(n, n)
        {
            Dx = 0.001f,
            Alpha = 1.0e-4f,
            Dt = 0.001f, // s = 0.10 (sehr stabil)
            Boundary = BoundaryMode.NeumannAdiabatic,
            MaintainHotspot = false // Keine andauernde Energieinjektion
        };

        // Alle Zellen auf 20 °C initialisieren
        for (int y = 0; y < n; y++)
            for (int x = 0; x < n; x++)
                grid.SetTemperature(x, y, 20.0f);

        // Ein einzelner Hotspot im inneren Kern
        grid.SetTemperature(n / 2, n / 2, 100.0f);

        double initialEnergy = grid.CalculateTotalHeatSum();

        // 50 Simulationsschritte rechnen
        for (int step = 0; step < 50; step++)
        {
            grid.Step();
        }

        double finalEnergy = grid.CalculateTotalHeatSum();

        // Energieerhaltung prüfen (Erlaubte relative Abweichung < 0.1%)
        double relativeError = Math.Abs(finalEnergy - initialEnergy) / initialEnergy;
        Assert.IsTrue(relativeError < 1e-3, 
            $"Energieerhaltung verletzt! Initial: {initialEnergy}, Final: {finalEnergy}, Fehler: {relativeError:P4}");
    }

    [TestMethod]
    public void Test_LaplaceDiffusion_SpreadsHeatToNeighbors()
    {
        int n = 16;
        var grid = new HeatGrid(n, n)
        {
            Dx = 0.001f,
            Alpha = 1.0e-4f,
            Dt = 0.002f,
            Boundary = BoundaryMode.DirichletFixed,
            MaintainHotspot = false
        };

        for (int y = 0; y < n; y++)
            for (int x = 0; x < n; x++)
                grid.SetTemperature(x, y, 0.0f);

        int midX = 8, midY = 8;
        grid.SetTemperature(midX, midY, 100.0f);

        // Vor dem Schritt: Nachbarn sind 0
        Assert.AreEqual(0.0f, grid.GetTemperature(midX + 1, midY), 1e-5f);

        grid.Step();

        // Nach einem Schritt: Wärme muss auf Nachbarn diffundiert sein
        float neighborTemp = grid.GetTemperature(midX + 1, midY);
        Assert.IsTrue(neighborTemp > 0.0f, "Nachbarzelle muss nach Diffusion erwärmt worden sein.");
        Assert.IsTrue(grid.GetTemperature(midX, midY) < 100.0f, "Zentrum muss Wärme abgegeben haben.");
    }
}
