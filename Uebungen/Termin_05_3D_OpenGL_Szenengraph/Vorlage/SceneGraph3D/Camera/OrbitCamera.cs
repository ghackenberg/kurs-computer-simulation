using SharpGL;

namespace SceneGraph3D.Camera;

/// <summary>
/// Kugelkoordinaten-Orbit-Kamera für interaktive 3D-Szenen.
/// Rechnet Azimut, Elevation und Distanz in kartesische Weltkoordinaten um.
/// Verhindert Gimbal Lock durch striktes Clamping der Elevation auf [-85°, +85°].
/// </summary>
public class OrbitCamera
{
    private double _azimuthDeg = 45.0;
    private double _elevationDeg = 30.0;
    private double _distance = 8.0;

    /// <summary>Azimutwinkel theta um die vertikale Y-Achse in Grad [°].</summary>
    public double AzimuthDeg
    {
        get => _azimuthDeg;
        set => _azimuthDeg = (value % 360.0 + 360.0) % 360.0;
    }

    /// <summary>
    /// Elevationswinkel phi über dem Horizont in Grad [°].
    /// Zur Vermeidung von Singularitäten (Gimbal Lock) auf [-85°, +85°] begrenzt!
    /// </summary>
    public double ElevationDeg
    {
        get => _elevationDeg;
        set => _elevationDeg = Math.Clamp(value, -85.0, 85.0);
    }

    /// <summary>Abstand der Kamera zum Zielpunkt (LookAt).</summary>
    public double Distance
    {
        get => _distance;
        set => _distance = Math.Clamp(value, 1.0, 100.0);
    }

    public double LookAtX { get; set; } = 0.0;
    public double LookAtY { get; set; } = 0.5;
    public double LookAtZ { get; set; } = 0.0;

    /// <summary>
    /// Berechnet die kartesischen Koordinaten des Augenpunktes (Eye-Position)
    /// aus den aktuellen Kugelkoordinaten (r, theta, phi).
    /// </summary>
    public (double EyeX, double EyeY, double EyeZ) GetEyePosition()
    {
        double thetaRad = _azimuthDeg * Math.PI / 180.0;
        double phiRad = _elevationDeg * Math.PI / 180.0;

        double eyeX = LookAtX + _distance * Math.Cos(phiRad) * Math.Sin(thetaRad);
        double eyeY = LookAtY + _distance * Math.Sin(phiRad);
        double eyeZ = LookAtZ + _distance * Math.Cos(phiRad) * Math.Cos(thetaRad);

        return (eyeX, eyeY, eyeZ);
    }

    /// <summary>
    /// Wendet die Sichtmatrix auf den aktuellen OpenGL-Matrix-Stack an.
    /// </summary>
    public void Apply(OpenGL gl)
    {
        var (eyeX, eyeY, eyeZ) = GetEyePosition();
        gl.LookAt(eyeX, eyeY, eyeZ, LookAtX, LookAtY, LookAtZ, 0.0, 1.0, 0.0);
    }

    /// <summary>
    /// Dreht die Kamera relativ zur aktuellen Ausrichtung.
    /// </summary>
    public void Rotate(double deltaAzimuthDeg, double deltaElevationDeg)
    {
        AzimuthDeg += deltaAzimuthDeg;
        ElevationDeg += deltaElevationDeg;
    }

    /// <summary>
    /// Ändert die Distanz der Kamera (Zoom).
    /// </summary>
    public void Zoom(double deltaDistance)
    {
        Distance += deltaDistance;
    }
}
