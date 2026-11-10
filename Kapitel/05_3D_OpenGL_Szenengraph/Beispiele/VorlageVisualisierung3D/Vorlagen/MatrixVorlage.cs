using SharpGL;

namespace VorlageVisualisierung3D.Vorlagen
{
    public class MatrixVorlage : BasisVorlage
    {
        public MatrixVorlage() : base("Matrix")
        {

        }

        protected override void DrawModel(OpenGL gl)
        {
            gl.PushMatrix();
            {
                gl.Translate(0, 1, 0);

                gl.PushMatrix();
                {
                    gl.Translate(-1, 0, 0);

                    DrawTriangle(gl);
                }
                gl.PopMatrix();

                gl.PushMatrix();
                {
                    gl.Translate(2, 0, 0);

                    DrawTriangle(gl);
                }
                gl.PopMatrix();
            }
            gl.PopMatrix();

            gl.PushMatrix();
            {
                gl.Translate(0, -1, 0);

                gl.PushMatrix();
                {
                    gl.Translate(-1, 0, 0);

                    DrawTriangle(gl);
                }
                gl.PopMatrix();

                gl.PushMatrix();
                {
                    gl.Translate(2, 0, 0);

                    DrawTriangle(gl);
                }
                gl.PopMatrix();
            }
            gl.PopMatrix();
        }

        private void DrawTriangle(OpenGL gl)
        {
            // Dreieckzeichnen beginnen
            gl.Begin(OpenGL.GL_TRIANGLES);

            // Farben und Koordinaten für Dreieck 1 festlegen

            Vertex(gl, -1, -1, 0, 1, 0, 0);
            Vertex(gl, +1, -1, 0, 0, 1, 0);
            Vertex(gl, +1, +1, 0, 0, 0, 1);

            // Linienzeichnen beenden

            gl.End();
        }
    }
}
