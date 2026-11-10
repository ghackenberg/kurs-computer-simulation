using SharpGL;

namespace VorlageVisualisierung3D.Vorlagen
{
    public class TriangleStripVorlage : BasisVorlage
    {
        public TriangleStripVorlage() : base("TriangleStrip")
        {

        }

        protected override void DrawModel(OpenGL gl)
        {
            // Dreieckzeichnen beginnen

            gl.Begin(OpenGL.GL_TRIANGLE_STRIP);

            // Farben und Koordinaten für Dreiecke festlegen

            Vertex(gl, -1, -1, 0, 1, 0, 0);
            Vertex(gl, +1, -1, 0, 0, 1, 0);
            Vertex(gl, +1, +1, 0, 0, 0, 1);
            Vertex(gl, -1, +1, 0, 1, 1, 0);

            // Linienzeichnen beenden

            gl.End();
        }
    }
}
