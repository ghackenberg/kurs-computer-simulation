using System;
using SharpGL;

namespace VorlageSzenengraph3D.Model
{
    /// <summary>
    /// Kugelkoordinaten-basierte Orbit-Kamera zur interaktiven 3D-Navigation (Folien 5.65-76).
    /// Steuert Azimut (Gieren), Elevation (Nicken) und Distanz (Radius) um einen Zielpunkt.
    /// </summary>
    public class OrbitCamera
    {
        /// <summary>X-Koordinate des Zielpunkts im Raum.</summary>
        public double TargetX { get; set; } = 0.0;

        /// <summary>Y-Koordinate des Zielpunkts im Raum.</summary>
        public double TargetY { get; set; } = 0.0;

        /// <summary>Z-Koordinate des Zielpunkts im Raum.</summary>
        public double TargetZ { get; set; } = 0.0;

        /// <summary>Vektor des Zielpunkts im Raum.</summary>
        public Vector Target
        {
            get => new((float)TargetX, (float)TargetY, (float)TargetZ);
            set
            {
                TargetX = value.X;
                TargetY = value.Y;
                TargetZ = value.Z;
            }
        }

        /// <summary>Horizontaler Drehwinkel um die Y-Achse in Grad [0, 360].</summary>
        public double Azimuth { get; set; } = 45.0;

        /// <summary>Vertikaler Neigungswinkel in Grad [-89, +89], um Gimbal Lock zu verhindern.</summary>
        public double Elevation { get; set; } = 30.0;

        /// <summary>Radius / Abstand zum Fokuspunkt [1, 500].</summary>
        public double Distance { get; set; } = 15.0;

        /// <summary>Minimal zulässige Distanz zum Zielpunkt.</summary>
        public double MinDistance { get; set; } = 1.0;

        /// <summary>Maximal zulässige Distanz zum Zielpunkt.</summary>
        public double MaxDistance { get; set; } = 500.0;

        /// <summary>
        /// Rotiert die Kamera inkrementell basierend auf Mausverschiebungen.
        /// </summary>
        /// <param name="dAzimuth">Änderung des Azimuts in Grad.</param>
        /// <param name="dElevation">Änderung der Elevation in Grad.</param>
        public void Rotate(double dAzimuth, double dElevation)
        {
            Azimuth = (Azimuth + dAzimuth) % 360.0;
            Elevation = Math.Clamp(Elevation + dElevation, -89.0, 89.0);
        }

        /// <summary>
        /// Ändert die Distanz (Zoom) mit Schutzklemmung gegen Invertierung.
        /// </summary>
        /// <param name="delta">Änderung der Distanz (positiv = heranzoomen).</param>
        public void Zoom(double delta)
        {
            Distance = Math.Clamp(Distance - delta, MinDistance, MaxDistance);
        }

        /// <summary>
        /// Transformiert die Kugelkoordinaten in kartesische Koordinaten und setzt die OpenGL LookAt-Matrix.
        /// </summary>
        /// <param name="gl">OpenGL-Kontext.</param>
        public void Apply(OpenGL gl)
        {
            // 1. Kugelkoordinaten in Bogenmaß (Radians)
            double radAz = Azimuth * Math.PI / 180.0;
            double radEl = Elevation * Math.PI / 180.0;

            // 2. Kameraposition (Eye) im kartesischen Raum
            double eyeX = TargetX + Distance * Math.Cos(radEl) * Math.Sin(radAz);
            double eyeY = TargetY + Distance * Math.Sin(radEl);
            double eyeZ = TargetZ + Distance * Math.Cos(radEl) * Math.Cos(radAz);

            // 3. View-Matrix in OpenGL setzen (Up-Vektor stets (0, 1, 0))
            gl.LookAt(eyeX, eyeY, eyeZ, TargetX, TargetY, TargetZ, 0.0, 1.0, 0.0);
        }
    }
}
