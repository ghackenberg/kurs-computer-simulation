using SharpGL;

namespace VorlageVisualisierung3D.Vorlagen
{
    public class TriangleVorlage : BasisVorlage
    {
        public TriangleVorlage() : base("Triangles")
        {

        }

        protected override void DrawModel(OpenGL gl)
        {
            // Dreieckzeichnen beginnen

            gl.Begin(OpenGL.GL_TRIANGLES);

            // Farben und Koordinaten für Dreieck 1 festlegen

            Vertex(gl, -1, -1, 0, 1, 0, 0);
            Vertex(gl, +1, -1, 0, 0, 1, 0);
            Vertex(gl, +1, +1, 0, 0, 0, 1);

            // Farben und Koordinaten für Dreieck 2 festlegen

            Vertex(gl, -0.9f, +1, 0, 1, 0, 1);
            Vertex(gl, +0.9f, +1, 0, 0, 1, 1);
            Vertex(gl, -1, -0.9f, 0, 1, 1, 1);

            // Linienzeichnen beenden

            gl.End();
        }
    }
}
