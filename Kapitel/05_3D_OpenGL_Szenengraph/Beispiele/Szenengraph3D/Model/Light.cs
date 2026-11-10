using SharpGL;

namespace VorlageSzenengraph3D.Model
{
    public class Light
    {
        public Vector Position { get; set; }
        public Color Ambient { get; set; }
        public Color Diffuse { get; set; }
        public Color Specular { get; set; }

        public Light(Vector position, Color ambient, Color diffuse, Color specular)
        {
            Position = position;
            Ambient = ambient;
            Diffuse = diffuse;
            Specular = specular;
        }

        public void Apply(OpenGL gl, uint light)
        {
            gl.Enable(light);

            gl.Light(light, OpenGL.GL_POSITION, Position.Array());
            gl.Light(light, OpenGL.GL_AMBIENT, Ambient.Array());
            gl.Light(light, OpenGL.GL_DIFFUSE, Diffuse.Array());
            gl.Light(light, OpenGL.GL_SPECULAR, Specular.Array());
        }
    }
}
