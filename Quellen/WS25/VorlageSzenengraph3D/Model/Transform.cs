using SharpGL;

namespace VorlageSzenengraph3D.Model
{
    public abstract class Transform
    {
        abstract public void Apply(OpenGL gl);

        abstract public Transform Invert();
    }
}
