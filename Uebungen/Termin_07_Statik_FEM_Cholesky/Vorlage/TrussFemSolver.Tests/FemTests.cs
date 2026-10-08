using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TrussFemSolver.Fem;

namespace TrussFemSolver.Tests
{
    [TestClass]
    public class FemTests
    {
        [TestMethod]
        public void TestElementMatrixSymmetry()
        {
            var n1 = new Node(0, 0, 0);
            var n2 = new Node(1, 3, 4);
            var elem = new TrussElement(1, n1, n2, youngsModulus: 210e9, area: 1e-4);

            var ke = elem.ComputeElementStiffnessMatrix();

            Assert.AreEqual(4, ke.RowCount);
            Assert.AreEqual(4, ke.ColumnCount);

            for (int r = 0; r < 4; r++)
            {
                for (int c = 0; c < 4; c++)
                {
                    Assert.AreEqual(ke[r, c], ke[c, r], 1e-6, $"Ke is not symmetric at [{r},{c}]");
                }
            }
        }

        [TestMethod]
        public void TestSprintModelCholeskySolutionAndEquilibrium()
        {
            // Erstellt das 3-Knoten-Dreieckstragwerk mit Fy = -10 kN am Spitzenknoten
            var model = CholeskySolver.CreateSprintModel(loadFy: -10_000.0);
            var solution = CholeskySolver.Solve(model);

            // 1. Vektorgleichgewicht als Invariante prüfen
            Assert.IsTrue(solution.IsEquilibriumSatisfied, 
                $"Gleichgewicht verletzt: sumFx={solution.SumFx}, sumFy={solution.SumFy}");
            Assert.AreEqual(0.0, solution.SumFx, 1e-8, "Summe Fx != 0");
            Assert.AreEqual(0.0, solution.SumFy, 1e-8, "Summe Fy != 0");

            // 2. Auflagerkräfte prüfen:
            // Festlager N1 (DofX=0, DofY=1), Loselager N2 (DofY=3)
            // Symmetrischer Träger => Fy1 = +5000 N, Fy2 = +5000 N
            double fy1 = solution.ReactionForces[1];
            double fy2 = solution.ReactionForces[3];

            Assert.AreEqual(5000.0, fy1, 1e-4, "Auflagerkraft Fy1 stimmt nicht mit analytischem Wert 5000 N überein!");
            Assert.AreEqual(5000.0, fy2, 1e-4, "Auflagerkraft Fy2 stimmt nicht mit analytischem Wert 5000 N überein!");

            // 3. Spitzenverschiebung prüfen:
            // N3 DofY = 5: u_y3 analytisch (Arbeitssatz mit Loselager) = -1.823 mm
            double uy3 = solution.Displacements[5];
            Assert.IsTrue(uy3 < 0.0, "Spitzenknoten muss sich unter Last nach unten verschieben!");
            Assert.AreEqual(-0.001823, uy3, 0.00001, "Verschiebung u_y3 weicht vom exakten analytischen Wert ab!");

            // 4. Stabsymmetrie prüfen:
            // Stab 1 (1->3) und Stab 2 (2->3) müssen exakt identische Druckkräfte aufweisen
            double n1 = solution.ElementForces[1];
            double n2 = solution.ElementForces[2];
            Assert.AreEqual(n1, n2, 1e-6, "Stäbe 1 und 2 müssen aus Symmetriegründen gleiche Kraft haben!");
            Assert.IsTrue(n1 < 0.0, "Stab 1 muss Druckstab sein!");

            // Unterer Stab 3 (1->2) muss Zugstab sein
            double n3 = solution.ElementForces[3];
            Assert.IsTrue(n3 > 0.0, "Unterer Stab 3 muss Zugstab sein!");
        }

        [TestMethod]
        public void TestSingleBarTension()
        {
            // Reiner 1D-Zugversuch: Stab der Länge 2 m, E=200 GPa, A=1e-4 m^2
            // F = 20 kN => Delta L = F * L / (E * A) = 20000 * 2 / (200e9 * 1e-4) = 40000 / 20e6 = 0.002 m = 2 mm
            var model = new GlobalStiffnessMatrix();
            var n1 = new Node(0, 0, 0);
            var n2 = new Node(1, 2, 0);
            model.AddNode(n1);
            model.AddNode(n2);

            model.AddElement(new TrussElement(1, n1, n2, youngsModulus: 200e9, area: 1e-4));
            model.FixDof(n1.DofX);
            model.FixDof(n1.DofY);
            model.FixDof(n2.DofY);

            model.SetExternalForce(n2.DofX, 20_000.0);

            var sol = CholeskySolver.Solve(model);
            double ux2 = sol.Displacements[n2.DofX];

            Assert.AreEqual(0.002, ux2, 1e-9, "Stabdehnung weicht von analytischer Formel Delta L = F*L/(EA) ab!");
            Assert.AreEqual(20_000.0, sol.ElementForces[1], 1e-6);
        }
    }
}
