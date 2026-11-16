using Microsoft.VisualStudio.TestTools.UnitTesting;
using ScottPlotTelemetry.Data;
using ScottPlotTelemetry.Statistics;

namespace TelemetryTests;

[TestClass]
public class TelemetryTests
{
    [TestMethod]
    public void Test_Welford_MatchesStandardSampleVariance()
    {
        // Bekannter Datensatz: [2, 4, 4, 4, 5, 5, 7, 9]
        // N = 8
        // Summe = 40 => Mittelwert = 5.0
        // Abweichungen: [-3, -1, -1, -1, 0, 0, 2, 4]
        // Quadratsumme M2 = 9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32
        // Stichprobenvarianz s^2 = 32 / (8 - 1) = 32 / 7 ≈ 4.57142857...
        double[] data = [2, 4, 4, 4, 5, 5, 7, 9];

        var welford = new WelfordStatistics();
        foreach (var x in data)
        {
            welford.Add(x);
        }

        Assert.AreEqual(8, welford.Count);
        Assert.AreEqual(5.0, welford.Mean, 1e-9, "Mittelwert muss exakt 5.0 sein.");
        Assert.AreEqual(32.0, welford.M2, 1e-9, "Quadratsumme M2 muss exakt 32.0 sein.");
        Assert.AreEqual(32.0 / 7.0, welford.Variance, 1e-9, "Stichprobenvarianz muss 32/7 sein.");
        Assert.AreEqual(Math.Sqrt(32.0 / 7.0), welford.StdDev, 1e-9);
    }

    [TestMethod]
    public void Test_Welford_CatastrophicCancellation_Resistance()
    {
        // Bei extrem großen Offsets (z.B. 10^9) versagt die Lehrbuchformel
        // s^2 = 1/(N-1) * (sum(x^2) - (sum x)^2 / N) durch katastrophale Subtraktionsauslöschung!
        double offset = 1e9;
        double[] rawValues = [1.0, 2.0, 3.0, 4.0, 5.0];
        // Für 1..5 ist der Mittelwert 3.0 und die Stichprobenvarianz 2.5

        var welford = new WelfordStatistics();
        foreach (var v in rawValues)
        {
            welford.Add(offset + v);
        }

        // Welford berechnet die Varianz trotz riesigem Offset stabil auf 2.5:
        Assert.AreEqual(offset + 3.0, welford.Mean, 1e-6);
        Assert.AreEqual(2.5, welford.Variance, 1e-6, "Welford muss auch bei großem DC-Offset numerisch stabil bleiben!");
    }

    [TestMethod]
    public void Test_CircularBuffer_OverwriteBehavior()
    {
        var buffer = new CircularBuffer<int>(3);

        buffer.Add(10);
        buffer.Add(20);
        buffer.Add(30);

        Assert.IsTrue(buffer.IsFull);
        Assert.AreEqual(3, buffer.Count);
        Assert.AreEqual(10, buffer[0]);
        Assert.AreEqual(20, buffer[1]);
        Assert.AreEqual(30, buffer[2]);

        // Element 40 überschreibt das älteste Element 10:
        buffer.Add(40);
        Assert.AreEqual(3, buffer.Count);
        Assert.AreEqual(20, buffer[0], "Ältestes Element muss jetzt 20 sein.");
        Assert.AreEqual(30, buffer[1]);
        Assert.AreEqual(40, buffer[2], "Neuestes Element muss 40 sein.");

        // CopyTo Test
        int[] dest = new int[3];
        buffer.CopyTo(dest);
        CollectionAssert.AreEqual(new int[] { 20, 30, 40 }, dest);
    }

    [TestMethod]
    public void Test_Welford_3Sigma_AnomalyDetection()
    {
        var welford = new WelfordStatistics();
        // 100 Messwerte um 50.0 mit kleiner Streuung (+/- 0.5)
        for (int i = 0; i < 100; i++)
        {
            welford.Add(50.0 + (i % 2 == 0 ? 0.5 : -0.5));
        }

        // Ein normaler Wert im Toleranzband
        Assert.IsFalse(welford.IsAnomaly(50.2));

        // Ein extremer Ausreißer
        Assert.IsTrue(welford.IsAnomaly(75.0));
    }

    [TestMethod]
    public void Test_TwoMemoryArchitecture_WelfordVsCircularBufferWindow()
    {
        // Zwei-Gedächtnis-Architektur: Langzeit-Welford (k = 6) vs. Kurzzeit-Ringpuffer (Kapazität 4)
        // Messreihe: [10, 20, 30, 40, 50, 90]
        // 1. Langzeit-Welford über alle 6 Werte:
        //    Summe = 240 => Mean = 40.0, M2 = 900 + 400 + 100 + 0 + 100 + 2500 = 4000.0, Variance = 4000 / 5 = 800.0
        // 2. Ringpuffer der Kapazität 4 überschreibt 10 und 20 => Fenster enthält [30, 40, 50, 90]:
        //    Summe = 210 => Fenster-Mean = 52.5, Min = 30.0, Max = 90.0
        double[] samples = [10.0, 20.0, 30.0, 40.0, 50.0, 90.0];
        var welford = new WelfordStatistics();
        var buffer = new CircularBuffer<double>(4);

        foreach (double x in samples)
        {
            welford.Add(x);
            buffer.Add(x);
        }

        Assert.AreEqual(6, welford.Count);
        Assert.AreEqual(40.0, welford.Mean, 1e-9, "Langzeit-Welford-Mittelwert über alle 6 Werte muss 40.0 sein.");
        Assert.AreEqual(4000.0, welford.M2, 1e-9, "Quadratsumme M2 muss exakt 4000.0 sein.");
        Assert.AreEqual(800.0, welford.Variance, 1e-9, "Stichprobenvarianz s^2 muss exakt 800.0 sein.");

        double[] scratch = new double[4];
        buffer.CopyTo(scratch);
        CollectionAssert.AreEqual(new double[] { 30.0, 40.0, 50.0, 90.0 }, scratch);

        // TODO [Stufe 1 - Aufgabe 1.4]:
        // Kommentieren Sie nach Implementierung von WelfordStatistics.ComputeWindowStats(...) (Aufgabe 1.2)
        // die folgenden Assertions ein, um Ihre gleitende Fenster-Statistik mit dotnet test zu prüfen:
        /*
        var (winMean, winMin, winMax) = WelfordStatistics.ComputeWindowStats(buffer, scratch);
        Assert.AreEqual(52.5, winMean, 1e-9, "Gleitender Fenster-Mittelwert über [30, 40, 50, 90] muss exakt 52.5 sein.");
        Assert.AreEqual(30.0, winMin, 1e-9, "Fenster-Minimum muss exakt 30.0 sein.");
        Assert.AreEqual(90.0, winMax, 1e-9, "Fenster-Maximum muss exakt 90.0 sein.");
        */
    }
}
