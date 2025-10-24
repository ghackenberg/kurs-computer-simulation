using ElastischesFachwerk3D.Model;

namespace ElastischesFachwerk3D.Case
{
    class Case2
    {
        public static Truss Create()
        {
            Truss truss = new Truss();

            // - Knoten hinzufügen

            Node a = truss.AddNode("A", -10, 0, -5, true, true, true, 0, 0, 0);
            Node b = truss.AddNode("B", +10, 0, -5, false, true, false, 0, 0, 0);
            Node c = truss.AddNode("C", 0, 0, 10, false, true, true, 0, 0, 0);
            Node d = truss.AddNode("D", 0, 10, 0, false, false, false, -0.1, -0.1, -0.1);
            Node e = truss.AddNode("E", 0, 10, -10, false, false, false, 0, 0, 0);

            // - Stäbe hinzufügen

            truss.AddRod(a, b, 1, 1);
            truss.AddRod(b, c, 1, 1);
            truss.AddRod(c, a, 1, 1);

            truss.AddRod(a, d, 1, 1);
            truss.AddRod(b, d, 1, 1);
            truss.AddRod(c, d, 1, 1);

            truss.AddRod(a, e, 1, 1);
            truss.AddRod(b, e, 1, 1);
            truss.AddRod(d, e, 1, 1);

            return truss;
        }
    }
}
