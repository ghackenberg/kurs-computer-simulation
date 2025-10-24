using SharpGL;

namespace VorlageVisualisierung3D.Vorlagen
{
    public class QuadVorlage : BasisVorlage
    {
        public QuadVorlage() : base("Quads")
        {

        }

        protected override void DrawModel(OpenGL gl)
        {
            // Dreieckzeichnen beginnen

            gl.Begin(OpenGL.GL_QUADS);

            // Farben und Koordinaten für Viereck 1 festlegen

            Vertex(gl, -1, -1, 0, 1, 0, 0);
            Vertex(gl, +1, -1, 0, 0, 1, 0);
            Vertex(gl, +1, -0.1f, 0, 0, 0, 1);
            Vertex(gl, -1, -0.1f, 0, 1, 1, 0);

            // Farben und Koordinaten für Viereck 2 festlegen

            Vertex(gl, -1, +1, 0, 1, 0, 1);
            Vertex(gl, +1, +1, 0, 0, 1, 1);
            Vertex(gl, +1, +0.1f, 0, 1, 1, 1);
            Vertex(gl, -1, +0.1f, 0, 0, 0, 0);

            // Linienzeichnen beenden

            gl.End();
        }
    }
}
