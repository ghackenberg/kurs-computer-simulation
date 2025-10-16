using SharpGL;

namespace VorlageVisualisierung3D.Vorlagen
{
    public class PointVorlage : BasisVorlage
    {
        public PointVorlage() : base("Points")
        {

        }

        protected override void DrawModel(OpenGL gl)
        {
            // Punktgröße festlegen

            gl.PointSize(2);

            // Punktzeichnen beginnen

            gl.Begin(OpenGL.GL_POINTS);

            // Farben und Koordinaten für Punkte festlegen

            Vertex(gl, -1, -1, 0, 1, 0, 0);
            Vertex(gl, +1, -1, 0, 0, 1, 0);
            Vertex(gl, -1, +1, 0, 0, 0, 1);
            Vertex(gl, +1, +1, 0, 1, 1, 0);

            // Punktzeichnen beenden

            gl.End();
        }
    }
}
