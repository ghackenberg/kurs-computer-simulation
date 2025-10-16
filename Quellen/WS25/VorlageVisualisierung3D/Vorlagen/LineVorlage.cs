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
            // Linienfarbe festlegen

            float[] color = { 1, 0, 0, 1 };

            gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_AMBIENT_AND_DIFFUSE, color);

            // Linendicke festlegen

            gl.LineWidth(2);

            // Linienzeichnen beginnen

            gl.Begin(OpenGL.GL_LINES);

            // - Farben und Koordinaten für Linie 1 festlegen

            Color(gl, 1, 0, 0);
            gl.Vertex(-1, -1, 0);

            Color(gl, 0, 1, 0);
            gl.Vertex(+1, -1, 0);

            // - Farben und Koordinaten für Linie 2 festlegen

            Color(gl, 0, 0, 1);
            gl.Vertex(-1, +1, 0);

            Color(gl, 1, 1, 0);
            gl.Vertex(+1, +1, 0);

            // Linienzeichnen beenden

            gl.End();
        }
    }
}
