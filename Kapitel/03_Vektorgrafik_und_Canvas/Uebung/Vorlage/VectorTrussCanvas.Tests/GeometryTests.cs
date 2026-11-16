using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Windows;
using VectorTrussCanvas.Geometry;
using VectorTrussCanvas.Models;

namespace GeometryTests;

[TestClass]
public class GeometryTests
{
    [TestMethod]
    public void Test_CoordinateTransformation_RoundTrip_WorldToScreenToWorld()
    {
        var transform = new Transform2D();
        transform.MarginX = 50.0;
        transform.MarginY = 50.0;

        // Bounding Box: [0, 10] x [0, 5], Canvas: 800 x 600
        transform.Update(0.0, 10.0, 0.0, 5.0, 800.0, 600.0);

        double[] testX = [0.0, 2.5, 5.0, 7.33, 10.0];
        double[] testY = [0.0, 1.25, 2.5, 4.88, 5.0];

        foreach (double xw in testX)
        {
            foreach (double yw in testY)
            {
                Point screenPt = transform.WorldToScreen(xw, yw);
                var (backX, backY) = transform.ScreenToWorld(screenPt.X, screenPt.Y);

                Assert.AreEqual(xw, backX, 1e-5, $"Rundreise-Fehler in X für ({xw}, {yw})");
                Assert.AreEqual(yw, backY, 1e-5, $"Rundreise-Fehler in Y für ({xw}, {yw})");
            }
        }
    }

    [TestMethod]
    public void Test_IsotropicScaling_PreservesSquareAspectRatio()
    {
        var transform = new Transform2D();
        transform.MarginX = 50.0;
        transform.MarginY = 50.0;
        // Asymmetrisches Fenster: 1000 x 400
        transform.Update(0.0, 4.0, 0.0, 4.0, 1000.0, 400.0);

        Point pOrigin = transform.WorldToScreen(0.0, 0.0);
        Point pRight = transform.WorldToScreen(1.0, 0.0);
        Point pUp = transform.WorldToScreen(0.0, 1.0);

        double deltaScreenX = Math.Abs(pRight.X - pOrigin.X);
        double deltaScreenY = Math.Abs(pUp.Y - pOrigin.Y);

        // Bei isotroper Skalierung MÜSSEN 1 Meter in X und 1 Meter in Y exakt gleich vielen Pixeln entsprechen!
        Assert.AreEqual(deltaScreenX, deltaScreenY, 1e-4, 
            $"Isotropie verletzt: 1m in X = {deltaScreenX:F2}px, 1m in Y = {deltaScreenY:F2}px");
    }

    [TestMethod]
    public void Test_YInversion_WorldUpIsScreenDown()
    {
        var transform = new Transform2D();
        transform.Update(0.0, 10.0, 0.0, 10.0, 500.0, 500.0);

        Point pBottom = transform.WorldToScreen(5.0, 0.0);
        Point pTop = transform.WorldToScreen(5.0, 10.0);

        // Welt Y=10 muss auf dem Canvas einen KLEINEREN Y-Wert haben als Welt Y=0 (Y wächst nach unten!)
        Assert.IsTrue(pTop.Y < pBottom.Y, 
            $"Y-Inversion fehlerhaft: pTop.Y ({pTop.Y}) muss kleiner sein als pBottom.Y ({pBottom.Y})");
    }

    [TestMethod]
    public void Test_TrussGeometry_BoundsCalculation()
    {
        var stage1 = TrussGeometry.CreateStage1Triangle();
        var (xMin, xMax, yMin, yMax) = stage1.GetBounds();

        // Dreieck: (0,0), (4,0), (2,2)
        Assert.AreEqual(0.0, xMin, 1e-6);
        Assert.AreEqual(4.0, xMax, 1e-6);
        Assert.AreEqual(0.0, yMin, 1e-6);
        Assert.AreEqual(2.0, yMax, 1e-6);
    }

    [TestMethod]
    public void Test_Stage1_GoldenReference_And_BarLengths()
    {
        // 1. Golden-Reference-Prüfung der Viewport-Transformation (Aufgabe 1.1 & 1.4):
        // Dreieck [0, 4] m x [0, 2] m auf 800 x 500 px Canvas mit Margin = 70 px
        var stage1 = TrussGeometry.CreateStage1Triangle();
        var (xMin, xMax, yMin, yMax) = stage1.GetBounds();

        var transform = new Transform2D { MarginX = 70.0, MarginY = 70.0 };
        transform.Update(xMin, xMax, yMin, yMax, 800.0, 500.0);

        Assert.AreEqual(165.0, transform.Scale, 1e-6, "Isotroper Maßstab s muss exakt 165.0 px/m betragen.");
        Assert.AreEqual(70.0, transform.OffsetX, 1e-6, "OffsetX muss exakt 70.0 px betragen.");
        Assert.AreEqual(85.0, transform.OffsetY, 1e-6, "OffsetY muss exakt 85.0 px betragen.");

        Point k1Screen = transform.WorldToScreen(0.0, 0.0);
        Point k2Screen = transform.WorldToScreen(4.0, 0.0);
        Point k3Screen = transform.WorldToScreen(2.0, 2.0);

        Assert.AreEqual(70.0, k1Screen.X, 1e-6);
        Assert.AreEqual(415.0, k1Screen.Y, 1e-6);
        Assert.AreEqual(730.0, k2Screen.X, 1e-6);
        Assert.AreEqual(415.0, k2Screen.Y, 1e-6);
        Assert.AreEqual(400.0, k3Screen.X, 1e-6);
        Assert.AreEqual(85.0, k3Screen.Y, 1e-6);

        // Jittering-Schutz (Freeze-Doktrin): Während _draggedNode != null wird transform.Update()
        // NICHT neu aufgerufen -> K1 bleibt trotz verschobenem Knoten K3 exakt bei (70, 415) px!
        stage1.Nodes[2].Y = 3.254;
        Point k1WhileDragging = transform.WorldToScreen(stage1.Nodes[0].X, stage1.Nodes[0].Y);
        Assert.AreEqual(70.0, k1WhileDragging.X, 1e-6);
        Assert.AreEqual(415.0, k1WhileDragging.Y, 1e-6);

        // 2. TODO [Stufe 1 - Aufgabe 1.4]:
        // Kommentieren Sie nach Implementierung von TrussGeometry.GetBarLength(TrussBar bar)
        // (Aufgabe 1.2) den folgenden Testblock ein und prüfen Sie Ihre Lösung mit 'dotnet test':
        /*
        var refTriangle = TrussGeometry.CreateStage1Triangle();
        Assert.AreEqual(4.0, refTriangle.GetBarLength(refTriangle.Bars[0]), 1e-6,
            "Untergurt K1-K2 muss exakt 4.00 m lang sein.");
        Assert.AreEqual(Math.Sqrt(8.0), refTriangle.GetBarLength(refTriangle.Bars[1]), 1e-6,
            "Strebe K2-K3 muss exakt sqrt(8) ≈ 2.8284 m lang sein.");
        Assert.AreEqual(Math.Sqrt(8.0), refTriangle.GetBarLength(refTriangle.Bars[2]), 1e-6,
            "Strebe K3-K1 muss exakt sqrt(8) ≈ 2.8284 m lang sein.");

        var pratt = TrussGeometry.CreateIndustrialPrattTruss();
        Assert.AreEqual(2.5, pratt.GetBarLength(pratt.Bars[6]), 1e-6,
            "Vertikalpfosten U1-O1 im Pratt-Träger muss exakt 2.50 m lang sein.");
        Assert.AreEqual(Math.Sqrt(22.25), pratt.GetBarLength(pratt.Bars[10]), 1e-6,
            "Diagonale U1-O2 im Pratt-Träger muss exakt sqrt(4^2 + 2.5^2) ≈ 4.7170 m lang sein.");
        */
    }
}
