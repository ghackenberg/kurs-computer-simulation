using System.Numerics;
using SharpGL;

namespace SceneGraph3D.Scene;

/// <summary>
/// Knoten eines hierarchischen 3D-Szenengraphen.
/// Kaskadiert Transformationen über den OpenGL-Matrix-Stack (glPushMatrix / glPopMatrix)
/// und berechnet analytische 4x4-Transformationsmatrizen für die Vorwärtskinematik.
/// </summary>
public class SceneNode
{
    public string Name { get; set; }
    public SceneNode? Parent { get; private set; }
    public List<SceneNode> Children { get; } = new();

    // Lokale Translation [m]
    public float Tx { get; set; } = 0.0f;
    public float Ty { get; set; } = 0.0f;
    public float Tz { get; set; } = 0.0f;

    // Lokale Euler-Rotationen in Grad [°]
    public float Rx { get; set; } = 0.0f;
    public float Ry { get; set; } = 0.0f;
    public float Rz { get; set; } = 0.0f;

    // Lokale Skalierung
    public float Sx { get; set; } = 1.0f;
    public float Sy { get; set; } = 1.0f;
    public float Sz { get; set; } = 1.0f;

    /// <summary>
    /// Optionale benutzerdefinierte Render-Aktion für diesen Knoten (z. B. Zeichnen von Geometrie).
    /// </summary>
    public Action<OpenGL>? RenderCustomGeometry { get; set; }

    public SceneNode(string name)
    {
        Name = name;
    }

    /// <summary>
    /// Fügt einen Kindknoten hinzu und setzt dessen Eltern-Referenz.
    /// </summary>
    public void AddChild(SceneNode child)
    {
        ArgumentNullException.ThrowIfNull(child);
        child.Parent = this;
        Children.Add(child);
    }

    /// <summary>
    /// Rendert den Szenengraphen rekursiv über den OpenGL-Matrix-Stack.
    /// </summary>
    public virtual void Render(OpenGL gl)
    {
        gl.PushMatrix();

        // Lokale Transformation anwenden: Translation -> Rotation (Y, X, Z) -> Skalierung
        gl.Translate(Tx, Ty, Tz);
        if (MathF.Abs(Ry) > 1e-4f) gl.Rotate(Ry, 0.0f, 1.0f, 0.0f);
        if (MathF.Abs(Rx) > 1e-4f) gl.Rotate(Rx, 1.0f, 0.0f, 0.0f);
        if (MathF.Abs(Rz) > 1e-4f) gl.Rotate(Rz, 0.0f, 0.0f, 1.0f);
        if (MathF.Abs(Sx - 1.0f) > 1e-4f || MathF.Abs(Sy - 1.0f) > 1e-4f || MathF.Abs(Sz - 1.0f) > 1e-4f)
        {
            gl.Scale(Sx, Sy, Sz);
        }

        // Eigene Geometrie rendern
        RenderCustomGeometry?.Invoke(gl);

        // Rekursiv alle Kinder rendern
        foreach (var child in Children)
        {
            child.Render(gl);
        }

        gl.PopMatrix();
    }

    /// <summary>
    /// Berechnet die lokale 4x4-Transformationsmatrix dieses Knotens.
    /// M_local = T * Ry * Rx * Rz * S
    /// </summary>
    public Matrix4x4 GetLocalMatrix()
    {
        var t = Matrix4x4.CreateTranslation(Tx, Ty, Tz);
        var rx = Matrix4x4.CreateRotationX(Rx * MathF.PI / 180.0f);
        var ry = Matrix4x4.CreateRotationY(Ry * MathF.PI / 180.0f);
        var rz = Matrix4x4.CreateRotationZ(Rz * MathF.PI / 180.0f);
        var s = Matrix4x4.CreateScale(Sx, Sy, Sz);

        // Reihenfolge der Transformationen: Scale -> Rotation -> Translation
        return s * (rz * rx * ry) * t;
    }

    /// <summary>
    /// Berechnet die globale Weltmatrix durch kaskadierte Multiplikation aller Elternknoten:
    /// M_world = M_local * M_parent_world
    /// </summary>
    public Matrix4x4 GetWorldMatrix()
    {
        if (Parent == null)
            return GetLocalMatrix();

        return GetLocalMatrix() * Parent.GetWorldMatrix();
    }

    /// <summary>
    /// Ermittelt den Weltursprung dieses Knotens (z. B. TCP-Position).
    /// </summary>
    public Vector3 GetWorldPosition()
    {
        var worldMat = GetWorldMatrix();
        return Vector3.Transform(Vector3.Zero, worldMat);
    }

    // =========================================================================
    // TODO [Stufe A - Aufgabe A1 & A3]:
    // - Nutzen Sie in MainWindow.BuildSceneGraph() die Eigenschaft RenderCustomGeometry,
    //   um jedem Knoten (_baseNode, _arm1Node, _arm2Node, _pinoleNode) seine lokale
    //   Zeichenlogik zuzuweisen, und rufen Sie in RenderRobot(gl) nur noch _rootNode.Render(gl) auf!
    // - Ergänzen Sie einen Knoten _workpieceNode für das 3D-Werkstück auf dem Hallenboden.
    // =========================================================================

    // =========================================================================
    // TODO [Stufe B Track A: Industrie - 4-Achs-SCARA mit Parallelgreifer & Teach-In]:
    // - Erweitern Sie den Szenengraphen unter _pinoleNode um:
    //     1. _wristNode (Achse 4: Rotation Ry = theta4 in [-180°, +180°])
    //     2. _leftFingerNode & _rightFingerNode (symmetrischer 2-Backen-Parallelgreifer, g_width in [0.02, 0.16] m)
    // - Implementieren Sie eine animierte Teach-In-Bahnsteuerung (DispatcherTimer) zwischen Pose A, Pose B & Home.
    // - Implementieren Sie das Greifen & Ablegen (Pick-and-Place) des Werkstücks bei d < r_grab.
    // =========================================================================

    // =========================================================================
    // TODO [Stufe B Track B: Simulation Game - 3D Arcade Claw Crane]:
    // - 3D-Greifarm mit X/Z-Laufkatze, Seilzug (Y-Achse), 3-Finger-Greifer (120°)
    //   sowie automatischem Greifzyklus (Leertaste) und Spotlight (GL_LIGHT1).
    // =========================================================================
}
