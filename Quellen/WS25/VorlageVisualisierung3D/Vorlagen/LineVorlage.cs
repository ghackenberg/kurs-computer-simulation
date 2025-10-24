using SharpGL;

namespace VorlageVisualisierung3D.Vorlagen
{
    public class LineVorlage : BasisVorlage
    {
        public LineVorlage() : base("Lines")
        {

        }

        protected override void DrawModel(OpenGL gl)
        {
            // Linendicke festlegen

            gl.LineWidth(2);

            // Linienzeichnen beginnen

            gl.Begin(OpenGL.GL_LINES);

            // Farben und Koordinaten für Linie 1 festlegen

            Vertex(gl, -1, -1, 0, 1, 0, 0);
            Vertex(gl, +1, -1, 0, 0, 1, 0);

            // Farben und Koordinaten für Linie 2 festlegen

            Vertex(gl, -1, +1, 0, 0, 0, 1);
            Vertex(gl, +1, +1, 0, 1, 1, 0);

            // Linienzeichnen beenden

            gl.End();
        }
    }
}
