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
        var sprint = TrussGeometry.CreateSprintTriangle();
        var (xMin, xMax, yMin, yMax) = sprint.GetBounds();

        // Dreieck: (0,0), (4,0), (2,2)
        Assert.AreEqual(0.0, xMin, 1e-6);
        Assert.AreEqual(4.0, xMax, 1e-6);
        Assert.AreEqual(0.0, yMin, 1e-6);
        Assert.AreEqual(2.0, yMax, 1e-6);
    }
}
