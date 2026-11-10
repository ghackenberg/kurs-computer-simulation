using System;
using System.IO;
using SkiaSharp;

namespace FdmHeatmapGenerator
{
    class Program
    {
        static void Main()
        {
            
            var dir = new DirectoryInfo(AppContext.BaseDirectory);
            while (dir != null && !Directory.Exists(Path.Combine(dir.FullName, "Kapitel")))
            {
                dir = dir.Parent;
            }
            var root = dir!.FullName;

            GenerateHeatmapPlot(root);
            GenerateBoundaryConditionsPlot(root);
        }

        static void GenerateHeatmapPlot(string root)
        {
            var targetDir = Path.Combine(root, "Kapitel", "02_Pixelgrafik_und_FDM", "Folien", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            int width = 800, height = 600;
            using var bitmap = new SKBitmap(width, height, SKColorType.Bgra8888, SKAlphaType.Premul);

            for (int y = 0; y < height; y++)
            {
                for (int x = 0; x < width; x++)
                {
                    double dx1 = (x - 240) / 80.0, dy1 = (y - 200) / 80.0;
                    double t1 = Math.Exp(-(dx1 * dx1 + dy1 * dy1));
                    double dx2 = (x - 560) / 120.0, dy2 = (y - 360) / 120.0;
                    double t2 = 0.8 * Math.Exp(-(dx2 * dx2 + dy2 * dy2));
                    double temp = Math.Clamp(t1 + t2, 0.0, 1.0);

                    byte r = (byte)(255 * Math.Clamp(2 * temp - 0.5, 0.0, 1.0));
                    byte g = (byte)(255 * (1.0 - Math.Abs(2 * temp - 1.0)));
                    byte b = (byte)(255 * Math.Clamp(1.5 - 2 * temp, 0.0, 1.0));
                    bitmap.SetPixel(x, y, new SKColor(r, g, b, 255));
                }
            }

            using var image = SKImage.FromBitmap(bitmap);
            using var data = image.Encode(SKEncodedImageFormat.Png, 100);
            var outFile = Path.Combine(targetDir, "Heatmap_Temperaturfeld.png");
            using var stream = File.OpenWrite(outFile);
            data.SaveTo(stream);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }

        static void GenerateBoundaryConditionsPlot(string root)
        {
            var targetDir = Path.Combine(root, "Kapitel", "02_Pixelgrafik_und_FDM", "Folien", "Illustrationen");
            Directory.CreateDirectory(targetDir);

            int simW = 180, simH = 180;
            float[,] dirichlet = new float[simW, simH];
            float[,] neumann = new float[simW, simH];

            for (int y = 0; y < simH; y++)
            {
                for (int x = 0; x < simW; x++)
                {
                    double dx = x - 15, dy = y - 90;
                    float val = (float)Math.Exp(-(dx * dx + dy * dy) / 450.0);
                    dirichlet[x, y] = val;
                    neumann[x, y] = val;
                }
            }

            float alpha = 0.22f;
            float[,] nextD = new float[simW, simH];
            float[,] nextN = new float[simW, simH];

            for (int step = 0; step < 400; step++)
            {
                for (int y = 1; y < simH - 1; y++)
                    for (int x = 1; x < simW - 1; x++)
                        nextD[x, y] = dirichlet[x, y] + alpha * (dirichlet[x + 1, y] + dirichlet[x - 1, y] + dirichlet[x, y + 1] + dirichlet[x, y - 1] - 4.0f * dirichlet[x, y]);
                Array.Copy(nextD, dirichlet, dirichlet.Length);

                for (int y = 0; y < simH; y++) { neumann[0, y] = neumann[1, y]; neumann[simW - 1, y] = neumann[simW - 2, y]; }
                for (int x = 0; x < simW; x++) { neumann[x, 0] = neumann[x, 1]; neumann[x, simH - 1] = neumann[x, simH - 2]; }
                for (int y = 1; y < simH - 1; y++)
                    for (int x = 1; x < simW - 1; x++)
                        nextN[x, y] = neumann[x, y] + alpha * (neumann[x + 1, y] + neumann[x - 1, y] + neumann[x, y + 1] + neumann[x, y - 1] - 4.0f * neumann[x, y]);
                Array.Copy(nextN, neumann, neumann.Length);
            }

            using var bmp = new SKBitmap(840, 920, SKColorType.Bgra8888, SKAlphaType.Premul);
            using var canvas = new SKCanvas(bmp);
            canvas.Clear(SKColors.White);
            using var paintText = new SKPaint { Color = new SKColor(20, 20, 20), TextSize = 28, IsAntialias = true, FakeBoldText = true };
            using var paintSub = new SKPaint { Color = new SKColor(80, 80, 80), TextSize = 22, IsAntialias = true };

            SKColor ColorMap(float temp)
            {
                temp = Math.Clamp(temp, 0f, 1f);
                return new SKColor(
                    (byte)(255 * Math.Clamp(2 * temp - 0.5f, 0f, 1f)),
                    (byte)(255 * (1.0f - Math.Abs(2 * temp - 1.0f))),
                    (byte)(255 * Math.Clamp(1.5f - 2 * temp, 0f, 1f)));
            }

            canvas.DrawText("Dirichlet-Rand: Wärme entweicht", 40, 44, paintText);
            canvas.DrawText("T = 0 °C an Systemgrenzen (Homogen)", 40, 76, paintSub);
            canvas.DrawText("Neumann-Rand: Adiabatisch isoliert", 40, 490, paintText);
            canvas.DrawText("dT/dn = 0 (Ghost Cells, Wärmereflexion)", 40, 522, paintSub);

            for (int y = 0; y < simH; y++)
            {
                for (int x = 0; x < simW; x++)
                {
                    var cD = ColorMap(dirichlet[x, y]);
                    var cN = ColorMap(neumann[x, y]);
                    int px = 40 + x * 2, pyD = 90 + y * 2, pyN = 536 + y * 2;
                    bmp.SetPixel(px, pyD, cD); bmp.SetPixel(px + 1, pyD, cD); bmp.SetPixel(px, pyD + 1, cD); bmp.SetPixel(px + 1, pyD + 1, cD);
                    bmp.SetPixel(px, pyN, cN); bmp.SetPixel(px + 1, pyN, cN); bmp.SetPixel(px, pyN + 1, cN); bmp.SetPixel(px + 1, pyN + 1, cN);
                }
            }

            using var image = SKImage.FromBitmap(bmp);
            using var data = image.Encode(SKEncodedImageFormat.Png, 100);
            var outFile = Path.Combine(targetDir, "Randbedingungen_Vergleich.png");
            using var stream = File.OpenWrite(outFile);
            data.SaveTo(stream);
            Console.WriteLine($"Erzeugt (HiDPI): {outFile}");
        }
    }
}
