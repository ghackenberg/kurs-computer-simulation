using System.Windows;

namespace VectorTrussCanvas.Geometry;

/// <summary>
/// Mathematisch exakte, affine Koordinatentransformation zwischen kontinuierlichen Weltkoordinaten [m]
/// (Y positiv nach oben) und diskreten Canvas-Bildschirmkoordinaten [Pixel] (Y positiv nach unten).
/// Garantiert isotrope Skalierung (keine Verzerrung des Seitenverhältnisses) und zentriert das Modell mit Randabstand.
/// </summary>
public class Transform2D
{
    public double XMin { get; private set; }
    public double XMax { get; private set; }
    public double YMin { get; private set; }
    public double YMax { get; private set; }

    public double CanvasWidth { get; private set; }
    public double CanvasHeight { get; private set; }
    public double MarginX { get; set; } = 50.0;
    public double MarginY { get; set; } = 50.0;

    public double Scale { get; private set; } = 1.0;
    public double OffsetX { get; private set; } = 0.0;
    public double OffsetY { get; private set; } = 0.0;

    /// <summary>
    /// Aktualisiert die Transformationsmatrix anhand der aktuellen Bounding-Box und Canvas-Größe.
    /// </summary>
    public void Update(double xMin, double xMax, double yMin, double yMax, double canvasWidth, double canvasHeight)
    {
        XMin = xMin;
        XMax = xMax;
        YMin = yMin;
        YMax = yMax;
        CanvasWidth = Math.Max(canvasWidth, 100.0);
        CanvasHeight = Math.Max(canvasHeight, 100.0);

        double worldW = Math.Max(XMax - XMin, 1e-4);
        double worldH = Math.Max(YMax - YMin, 1e-4);

        double availW = Math.Max(CanvasWidth - 2.0 * MarginX, 10.0);
        double availH = Math.Max(CanvasHeight - 2.0 * MarginY, 10.0);

        // Isotropes Skalieren: Seitenverhältnis bleibt 1:1 erhalten
        double sx = availW / worldW;
        double sy = availH / worldH;
        Scale = Math.Min(sx, sy);

        double drawnW = worldW * Scale;
        double drawnH = worldH * Scale;

        // Zentrierung im Canvas
        OffsetX = (CanvasWidth - drawnW) / 2.0;
        OffsetY = (CanvasHeight - drawnH) / 2.0;
    }

    /// <summary>
    /// Wandelt einen Weltpunkt (X_w, Y_w) [m] in einen Bildschirm-Canvas-Punkt (x_s, y_s) [px] um.
    /// Invertiert die vertikale Achse, sodass Y_w nach oben wächst.
    /// </summary>
    public Point WorldToScreen(double xW, double yW)
    {
        double xs = OffsetX + (xW - XMin) * Scale;
        double ys = OffsetY + (YMax - yW) * Scale;
        return new Point(xs, ys);
    }

    /// <summary>
    /// Wandelt einen Bildschirm-Canvas-Punkt (x_s, y_s) [px] zurück in Weltkoordinaten (X_w, Y_w) [m].
    /// </summary>
    public (double Xw, double Yw) ScreenToWorld(double xS, double yS)
    {
        if (Math.Abs(Scale) < 1e-12)
            return (0.0, 0.0);

        double xw = XMin + (xS - OffsetX) / Scale;
        double yw = YMax - (yS - OffsetY) / Scale;
        return (xw, yw);
    }
}
