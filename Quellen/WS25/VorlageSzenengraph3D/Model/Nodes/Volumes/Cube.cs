using SharpGL;
using VorlageSzenengraph3D.Model.Nodes.Primitives;
using VorlageSzenengraph3D.Model.Transforms;

namespace VorlageSzenengraph3D.Model.Nodes.Volumes
{
    public class Cube : Shape
    {
        public Vector Size { get; set; }

        private Scale _scale;

        private Material _material;

        private Quads _quads;

        public Cube(string name, float sizeX, float sizeY, float sizeZ, Material material) : this(name, new Vector(sizeX, sizeY, sizeZ), material)
        {

        }

        public Cube(string name, Vector size, Material material) : base(name, material)
        {
            Size = size;

            _scale = new Scale(size.X / 2, size.Y / 2, size.Z / 2);

            _material = material.Clone();

            _quads = new Quads("");
            _quads.Transforms.Add(_scale);

            // Rückseite

            _quads.Add(new Vertex(-1, -1, -1), _material);
            _quads.Add(new Vertex(+1, -1, -1), _material);
            _quads.Add(new Vertex(+1, +1, -1), _material);
            _quads.Add(new Vertex(-1, +1, -1), _material);

            // Vorderseite

            _quads.Add(new Vertex(-1, -1, +1), _material);
            _quads.Add(new Vertex(+1, -1, +1), _material);
            _quads.Add(new Vertex(+1, +1, +1), _material);
            _quads.Add(new Vertex(-1, +1, +1), _material);

            // Linke Seite

            _quads.Add(new Vertex(-1, -1, -1), _material);
            _quads.Add(new Vertex(-1, -1, +1), _material);
            _quads.Add(new Vertex(-1, +1, +1), _material);
            _quads.Add(new Vertex(-1, +1, -1), _material);

            // Rechte Seite

            _quads.Add(new Vertex(+1, -1, -1), _material);
            _quads.Add(new Vertex(+1, -1, +1), _material);
            _quads.Add(new Vertex(+1, +1, +1), _material);
            _quads.Add(new Vertex(+1, +1, -1), _material);

            // Unterseite

            _quads.Add(new Vertex(-1, -1, -1), _material);
            _quads.Add(new Vertex(-1, -1, +1), _material);
            _quads.Add(new Vertex(+1, -1, +1), _material);
            _quads.Add(new Vertex(+1, -1, -1), _material);

            // Oberseite

            _quads.Add(new Vertex(-1, +1, -1), _material);
            _quads.Add(new Vertex(-1, +1, +1), _material);
            _quads.Add(new Vertex(+1, +1, +1), _material);
            _quads.Add(new Vertex(+1, +1, -1), _material);
        }

        protected override void DrawLocal(OpenGL gl)
        {
            _scale.Factor.X = Size.X / 2;
            _scale.Factor.Y = Size.Y / 2;
            _scale.Factor.Z = Size.Z / 2;

            _material.Ambient = Material.Ambient;
            _material.Diffuse = Material.Diffuse;
            _material.Specular = Material.Specular;

            _quads.Draw(gl);
        }
    }
}
