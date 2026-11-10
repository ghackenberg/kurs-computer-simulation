using VorlageSzenengraph3D.Model.Nodes;
using VorlageSzenengraph3D.Model.Nodes.Volumes;

namespace VorlageSzenengraph3D.Model
{
    /// <summary>
    /// Parametrische Fabrik zur Erzeugung von 3D-Standardkörpern für Szenengraphen.
    /// Entspricht der im Skriptum gelehrten GeometryFactory (Folie 5.58).
    /// </summary>
    public static class GeometryFactory
    {
        /// <summary>
        /// Erzeugt einen parametrischen Zylinder mit Normalen- und Vertex-Berechnung für OpenGL.
        /// </summary>
        public static Cylinder CreateCylinder(
            float radius,
            float height,
            int slices = 32,
            int stacks = 1,
            Material? material = null)
        {
            return new Cylinder("Cylinder", radius, radius, height, stacks, slices, material ?? Material.BLUE);
        }

        /// <summary>
        /// Erzeugt einen parametrischen Zylinder mit unterschiedlichen Radien (Kegelstumpf).
        /// </summary>
        public static Cylinder CreateCylinder(
            float radius1,
            float radius2,
            float height,
            int slices = 32,
            int stacks = 1,
            Material? material = null)
        {
            return new Cylinder("Cylinder", radius1, radius2, height, stacks, slices, material ?? Material.BLUE);
        }

        /// <summary>
        /// Erzeugt einen parametrischen Kegel.
        /// </summary>
        public static Cylinder CreateCone(
            float baseRadius,
            float height,
            int slices = 32,
            int stacks = 1,
            Material? material = null)
        {
            return new Cylinder("Cone", baseRadius, 0.0f, height, stacks, slices, material ?? Material.GREEN);
        }

        /// <summary>
        /// Erzeugt eine parametrische Kugel mit Normalen- und Vertex-Berechnung für OpenGL.
        /// </summary>
        public static Sphere CreateSphere(
            float radius,
            int slices = 32,
            int stacks = 16,
            Material? material = null)
        {
            return new Sphere("Sphere", radius, stacks, slices, material ?? Material.RED);
        }

        /// <summary>
        /// Erzeugt einen Quader (Box) mit Breite (X), Höhe (Y) und Tiefe (Z).
        /// </summary>
        public static Cube CreateBox(
            float sizeX,
            float sizeY,
            float sizeZ,
            Material? material = null)
        {
            return new Cube("Box", sizeX, sizeY, sizeZ, material ?? Material.GRAY);
        }

        /// <summary>
        /// Erzeugt einen gleichseitigen Würfel (Cube).
        /// </summary>
        public static Cube CreateCube(
            float size,
            Material? material = null)
        {
            return new Cube("Cube", size, size, size, material ?? Material.GRAY);
        }

        /// <summary>
        /// Erzeugt einen Quader mit expliziter Angabe von Breite, Höhe und Tiefe.
        /// </summary>
        public static Cube CreateCube(
            float width,
            float height,
            float depth,
            Material? material = null)
        {
            return new Cube("Cube", width, height, depth, material ?? Material.GRAY);
        }
    }
}
