using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace VectorTrussCanvas.Geometry;

/// <summary>
/// Vektorielle Geometrie-Hilfsklasse zur Erzeugung von Kraftpfeilen und DIN-Bemaßungsketten auf dem Canvas.
/// Berechnet analytisch geschlossene Pfeilspitzen mit konstantem Spreizwinkel.
/// </summary>
public static class VectorArrow
{
    /// <summary>
    /// Erzeugt einen Kraftpfeil mit Schaft (Line) und geschlossener Pfeilspitze (Polygon) auf dem Canvas.
    /// </summary>
    /// <param name="canvas">Zielfläche</param>
    /// <param name="startPos">Startpunkt des Pfeils am Knoten (Screen-Koordinaten)</param>
    /// <param name="fx">Kraftkomponente Fx in Weltkoordinaten [kN]</param>
    /// <param name="fy">Kraftkomponente Fy in Weltkoordinaten [kN]</param>
    /// <param name="lengthPx">Feste Länge des dargestellten Pfeils in Pixeln</param>
    /// <param name="arrowColor">Farbe des Pfeils</param>
    public static void AddForceArrow(
        Canvas canvas,
        Point startPos,
        double fx,
        double fy,
        double lengthPx = 65.0,
        Brush? arrowColor = null)
    {
        arrowColor ??= Brushes.Red;

        double norm = Math.Sqrt(fx * fx + fy * fy);
        if (norm < 1e-6)
            return;

        // Kraftrichtung auf dem Bildschirm:
        // Achtung: Invertierte Y-Achse auf dem Screen (Fy nach oben entspricht -y auf Canvas)
        double ux = fx / norm;
        double uy = -fy / norm;

        Point tipPos = new Point(startPos.X + ux * lengthPx, startPos.Y + uy * lengthPx);

        // Schaftlinie
        var shaft = new Line
        {
            X1 = startPos.X,
            Y1 = startPos.Y,
            X2 = tipPos.X,
            Y2 = tipPos.Y,
            Stroke = arrowColor,
            StrokeThickness = 2.5
        };
        canvas.Children.Add(shaft);

        // Pfeilspitze berechnen (Länge 14 px, Spreizwinkel 15° = ~0.26 rad)
        double lTip = 14.0;
        double beta = 15.0 * Math.PI / 180.0;
        double phi = Math.Atan2(uy, ux);

        Point pLeft = new Point(
            tipPos.X - lTip * Math.Cos(phi - beta),
            tipPos.Y - lTip * Math.Sin(phi - beta));

        Point pRight = new Point(
            tipPos.X - lTip * Math.Cos(phi + beta),
            tipPos.Y - lTip * Math.Sin(phi + beta));

        var head = new Polygon
        {
            Points = new PointCollection { tipPos, pLeft, pRight },
            Fill = arrowColor,
            Stroke = arrowColor,
            StrokeThickness = 1.0
        };
        canvas.Children.Add(head);

        // Kraftbeschriftung am Pfeilende
        var label = new TextBlock
        {
            Text = $"{norm:F1} kN",
            Foreground = arrowColor,
            FontSize = 11,
            FontWeight = FontWeights.SemiBold
        };
        Canvas.SetLeft(label, tipPos.X + ux * 8 - 15);
        Canvas.SetTop(label, tipPos.Y + uy * 8 - 8);
        canvas.Children.Add(label);
    }

    /// <summary>
    /// Zeichnet eine normgerechte Bemaßungskette nach DIN 406 (Maßhilfslinien, Maßlinie mit Pfeilen, Maßtext).
    /// </summary>
    public static void AddHorizontalDimensionLine(
        Canvas canvas,
        Point p1,
        Point p2,
        double yScreen,
        string dimensionText,
        Brush? strokeColor = null)
    {
        strokeColor ??= Brushes.LightGray;

        // 1. Maßhilfslinien (senkrecht von den Knoten zur Maßlinie)
        canvas.Children.Add(new Line
        {
            X1 = p1.X, Y1 = p1.Y + 4,
            X2 = p1.X, Y2 = yScreen + 6,
            Stroke = strokeColor,
            StrokeThickness = 1.0,
            StrokeDashArray = new DoubleCollection { 2, 2 }
        });

        canvas.Children.Add(new Line
        {
            X1 = p2.X, Y1 = p2.Y + 4,
            X2 = p2.X, Y2 = yScreen + 6,
            Stroke = strokeColor,
            StrokeThickness = 1.0,
            StrokeDashArray = new DoubleCollection { 2, 2 }
        });

        // 2. Horizontale Maßlinie
        canvas.Children.Add(new Line
        {
            X1 = p1.X, Y1 = yScreen,
            X2 = p2.X, Y2 = yScreen,
            Stroke = strokeColor,
            StrokeThickness = 1.2
        });

        // 3. Schlanke Maßpfeile links und rechts
        double arrowLen = 10.0;
        double arrowH = 3.0;

        // Pfeil links (zeigt nach links zu p1)
        var leftArrow = new Polygon
        {
            Points = new PointCollection
            {
                new Point(p1.X, yScreen),
                new Point(p1.X + arrowLen, yScreen - arrowH),
                new Point(p1.X + arrowLen, yScreen + arrowH)
            },
            Fill = strokeColor
        };
        canvas.Children.Add(leftArrow);

        // Pfeil rechts (zeigt nach rechts zu p2)
        var rightArrow = new Polygon
        {
            Points = new PointCollection
            {
                new Point(p2.X, yScreen),
                new Point(p2.X - arrowLen, yScreen - arrowH),
                new Point(p2.X - arrowLen, yScreen + arrowH)
            },
            Fill = strokeColor
        };
        canvas.Children.Add(rightArrow);

        // 4. Zentrierte Maßbeschriftung
        var textBlock = new TextBlock
        {
            Text = dimensionText,
            Foreground = strokeColor,
            FontSize = 11,
            FontWeight = FontWeights.Normal
        };
        textBlock.Measure(new Size(double.PositiveInfinity, double.PositiveInfinity));
        double textW = textBlock.DesiredSize.Width;

        Canvas.SetLeft(textBlock, (p1.X + p2.X) / 2.0 - textW / 2.0);
        Canvas.SetTop(textBlock, yScreen - 16.0);
        canvas.Children.Add(textBlock);
    }
}
