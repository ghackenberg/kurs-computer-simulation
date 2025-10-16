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
            // Dreieckfarbe festlegen

            float[] color = { 1, 0, 0, 1 };

            gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_AMBIENT_AND_DIFFUSE, color);

            // Dreieckzeichnen beginnen

            gl.Begin(OpenGL.GL_TRIANGLES);

            // - Farben und Koordinaten festlegen

            Color(gl, 1, 0, 0);
            gl.Vertex(-1, -1, 0);

            Color(gl, 0, 1, 0);
            gl.Vertex(+1, -1, 0);

            Color(gl, 0, 0, 1);
            gl.Vertex(+1, +1, 0);

            // - Farben und Koordinaten für Dreieck 2 festlegen

            Color(gl, 1, 0, 1);
            gl.Vertex(-0.9, +1, 0);

            Color(gl, 0, 1, 1);
            gl.Vertex(+0.9, +1, 0);

            Color(gl, 1, 1, 1);
            gl.Vertex(-1, -0.9, 0);

            // Linienzeichnen beenden

            gl.End();
        }
    }
}
