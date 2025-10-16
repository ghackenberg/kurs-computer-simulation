using SharpGL;

namespace VorlageVisualisierung3D.Vorlagen
{
    public class LineLoopVorlage : BasisVorlage
    {
        public LineLoopVorlage() : base("LineLoop")
        {

        }

        protected override void DrawModel(OpenGL gl)
        {
            // Linendicke festlegen

            gl.LineWidth(2);

            // Linienzeichnen beginnen

            gl.Begin(OpenGL.GL_LINE_LOOP);

            // - Farben und Koordinaten für Linien festlegen

            Color(gl, 1, 0, 0);
            gl.Vertex(-1, -1, 0);

            Color(gl, 0, 1, 0);
            gl.Vertex(+1, -1, 0);

            Color(gl, 0, 0, 1);
            gl.Vertex(-1, +1, 0);

            Color(gl, 1, 1, 0);
            gl.Vertex(+1, +1, 0);

            // Linienzeichnen beenden

            gl.End();
        }
    }
}
