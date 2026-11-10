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

            // Farben und Koordinaten für Linien festlegen

            Vertex(gl, -1, -1, 0, 1, 0, 0);
            Vertex(gl, +1, -1, 0, 0, 1, 0);
            Vertex(gl, -1, +1, 0, 0, 0, 1);
            Vertex(gl, +1, +1, 0, 1, 1, 0);

            // Linienzeichnen beenden

            gl.End();
        }
    }
}
