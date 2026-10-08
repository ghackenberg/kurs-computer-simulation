using System.Windows;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using PixelHeatFDM.Simulation;

namespace PixelHeatFDM.Rendering;

/// <summary>
/// Performanter Bitmap-Renderer für 2D-Temperaturfelder auf Basis von WriteableBitmap.
/// Konvertiert Fließkomma-Temperaturwerte via Farbtabelle direkt in den nativen BackBuffer (Bgra32).
/// </summary>
public class BitmapHeatRenderer
{
    private readonly WriteableBitmap _bitmap;
    private readonly int _width;
    private readonly int _height;
    private readonly uint[] _pixelBuffer;

    public WriteableBitmap Bitmap => _bitmap;

    public BitmapHeatRenderer(int width, int height)
    {
        _width = width;
        _height = height;
        _bitmap = new WriteableBitmap(width, height, 96, 96, PixelFormats.Bgra32, null);
        _pixelBuffer = new uint[width * height];
    }

    /// <summary>
    /// Überträgt das 2D-Temperaturgitter in den Bitmap-BackBuffer.
    /// </summary>
    public unsafe void Render(HeatGrid grid, float minTemp = 20.0f, float maxTemp = 100.0f)
    {
        float[,] tData = grid.GetCurrentGrid();
        float range = Math.Max(maxTemp - minTemp, 1e-4f);

        // Farbkonvertierung in Zwischenpuffer (0 GC Allocations)
        int index = 0;
        for (int y = 0; y < _height; y++)
        {
            for (int x = 0; x < _width; x++)
            {
                float t = tData[x, y];
                _pixelBuffer[index++] = MapTemperatureToColor(t, minTemp, range);
            }
        }

        // Kopieren in den unmanaged BackBuffer der WriteableBitmap
        _bitmap.Lock();
        try
        {
            uint* backBuffer = (uint*)_bitmap.BackBuffer;
            int stride = _bitmap.BackBufferStride / 4;

            for (int y = 0; y < _height; y++)
            {
                for (int x = 0; x < _width; x++)
                {
                    backBuffer[y * stride + x] = _pixelBuffer[y * _width + x];
                }
            }

            _bitmap.AddDirtyRect(new Int32Rect(0, 0, _width, _height));
        }
        finally
        {
            _bitmap.Unlock();
        }
    }

    /// <summary>
    /// Ermittelt die ARGB/BGRA32-Farbe für einen Temperaturwert über eine 4-Stufen-Heatmap.
    /// 20 °C: Blau (0xFF0000FF)
    /// 50 °C: Cyan / Grün (0xFF00FF00)
    /// 80 °C: Gelb (0xFFFFFF00)
    /// >= 100 °C: Rot (0xFFFF0000)
    /// </summary>
    public static uint MapTemperatureToColor(float temp, float minTemp, float range)
    {
        // Numerische Instabilitäten (NaN oder Unendlich) abfangen und auffällig färben (z. B. Magenta)
        if (float.IsNaN(temp) || float.IsInfinity(temp))
            return 0xFFFF00FF; // Magenta = Instabilitätsalarm!

        float norm = Math.Clamp((temp - minTemp) / range, 0.0f, 1.0f);

        byte r, g, b;

        if (norm < 0.25f)
        {
            // Blau -> Cyan
            float f = norm / 0.25f;
            r = 0;
            g = (byte)(f * 255);
            b = 255;
        }
        else if (norm < 0.5f)
        {
            // Cyan -> Grün
            float f = (norm - 0.25f) / 0.25f;
            r = 0;
            g = 255;
            b = (byte)((1.0f - f) * 255);
        }
        else if (norm < 0.75f)
        {
            // Grün -> Gelb
            float f = (norm - 0.5f) / 0.25f;
            r = (byte)(f * 255);
            g = 255;
            b = 0;
        }
        else
        {
            // Gelb -> Rot
            float f = (norm - 0.75f) / 0.25f;
            r = 255;
            g = (byte)((1.0f - f) * 255);
            b = 0;
        }

        // Bgra32 Pack: (A << 24) | (R << 16) | (G << 8) | B
        return 0xFF000000u | ((uint)r << 16) | ((uint)g << 8) | (uint)b;
    }
}
