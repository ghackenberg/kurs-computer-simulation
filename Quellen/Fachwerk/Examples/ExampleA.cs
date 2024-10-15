using Fachwerk.Entities;

namespace Fachwerk.Examples
{
    internal class ExampleA
    {
        public static Truss Make()
        {
            var model = new Truss("Example");

            // Nodes

            var a = model.AddNode("a", 0, 0);
            var b = model.AddNode("b", 20, 0);
            var c = model.AddNode("c", 40, 0);
            var d = model.AddNode("d", 60, 0);

            var e = model.AddNode("e", 10, 20);
            var f = model.AddNode("f", 30, 20);
            var g = model.AddNode("g", 50, 20);

            // Rods

            model.AddRod(a, b);
            model.AddRod(b, c);
            model.AddRod(c, d);

            model.AddRod(e, f);
            model.AddRod(f, g);

            model.AddRod(a, e);
            model.AddRod(b, e);
            model.AddRod(b, f);
            model.AddRod(c, f);
            model.AddRod(c, g);
            model.AddRod(d, g);

            // Bearings

            model.AddBearing(a, true, true);
            model.AddBearing(d, false, true);

            // Forces

            model.AddExternalForce(f, 0, 10);
            model.AddExternalForce(g, 10, 0);

            return model;
        }
    }
}
