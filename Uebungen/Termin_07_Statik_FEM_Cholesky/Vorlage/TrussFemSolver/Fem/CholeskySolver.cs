using System;
using System.Collections.Generic;
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Double;

namespace TrussFemSolver.Fem
{
    public class FemSolution
    {
        public Vector<double> Displacements { get; init; } = new DenseVector(0);
        public Dictionary<int, double> ReactionForces { get; } = new();
        public Dictionary<int, double> ElementForces { get; } = new();
        public Dictionary<int, double> ElementStresses { get; } = new();

        public double SumFx { get; set; }
        public double SumFy { get; set; }
        public bool IsEquilibriumSatisfied => Math.Abs(SumFx) < 1e-8 && Math.Abs(SumFy) < 1e-8;
    }

    /// <summary>
    /// FEM-Löser unter Verwendung der Cholesky-Zerlegung (L * L^T) für symmetrisch positiv definite Steifigkeitsmatrizen K_ff.
    /// </summary>
    public class CholeskySolver
    {
        /// <summary>
        /// Löst das statische FEM-Gleichungssystem exakt via Cholesky-Zerlegung.
        /// </summary>
        public static FemSolution Solve(GlobalStiffnessMatrix model)
        {
            var (freeDofs, prescribedDofs, kff, kpf, ff) = model.Partition();

            // 1. Cholesky-Faktorisierung: K_ff = L * L^T
            // Math.NET Cholesky().Solve(ff) führt Vorwärts- und Rückwärtssubstitution durch
            Vector<double> uf;
            try
            {
                var cholesky = kff.Cholesky();
                uf = cholesky.Solve(ff);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(
                    "Cholesky-Zerlegung fehlgeschlagen! Mögliche Ursachen: Unterbestimmte Lagerung (Starrkörper-Modus) oder singuläre K_ff.", ex);
            }

            // 2. Globalen Verschiebungsvektor u rekonstruieren (u_p = 0)
            var uGlobal = new DenseVector(model.TotalDofs);
            for (int i = 0; i < freeDofs.Length; i++)
            {
                uGlobal[freeDofs[i]] = uf[i];
            }

            // 3. Auflagerreaktionen berechnen: f_p = K_pf * u_f
            Vector<double> fp = kpf.Multiply(uf);

            var solution = new FemSolution
            {
                Displacements = uGlobal
            };

            for (int i = 0; i < prescribedDofs.Length; i++)
            {
                solution.ReactionForces[prescribedDofs[i]] = fp[i];
            }

            // 4. Elementkräfte und Spannungen berechnen
            foreach (var elem in model.Elements)
            {
                double n = elem.ComputeNormalForce(uGlobal);
                double sigma = elem.ComputeStress(uGlobal);
                solution.ElementForces[elem.Id] = n;
                solution.ElementStresses[elem.Id] = sigma;
            }

            // 5. Globales Vektorgleichgewicht als Invariante prüfen: sum(F_ext) + sum(F_reac) = 0
            double sumX = 0.0;
            double sumY = 0.0;

            for (int dof = 0; dof < model.TotalDofs; dof++)
            {
                double f = model.ExternalForces[dof];
                if (solution.ReactionForces.TryGetValue(dof, out double reac))
                {
                    f += reac; // Gleichgewicht: sum(F_ext + F_reac) = 0
                }

                if (dof % 2 == 0) sumX += f;
                else sumY += f;
            }

            solution.SumFx = sumX;
            solution.SumFy = sumY;

            return solution;
        }

        /// <summary>
        /// Erstellt das standardisierte 3-Knoten-Dreieckstragwerk (Stufe A In-Class Sprint).
        /// Knoten 1: (0,0) fest [0, 1]
        /// Knoten 2: (4,0) loselager Y fest [3], X frei [2]
        /// Knoten 3: (2,2) frei [4, 5], vertikale Last Fy = -10 kN
        /// E = 210 GPa, A = 1 cm^2 = 1e-4 m^2
        /// </summary>
        public static GlobalStiffnessMatrix CreateSprintModel(double loadFy = -10_000.0)
        {
            var model = new GlobalStiffnessMatrix();

            var n1 = new Node(0, 0.0, 0.0);
            var n2 = new Node(1, 4.0, 0.0);
            var n3 = new Node(2, 2.0, 2.0);

            model.AddNode(n1);
            model.AddNode(n2);
            model.AddNode(n3);

            double E = 210e9; // 210 GPa
            double A = 1e-4;   // 1 cm^2

            model.AddElement(new TrussElement(1, n1, n3, E, A)); // Stab 1: 1 -> 3
            model.AddElement(new TrussElement(2, n2, n3, E, A)); // Stab 2: 2 -> 3
            model.AddElement(new TrussElement(3, n1, n2, E, A)); // Stab 3: 1 -> 2

            // Randbedingungen:
            model.FixDof(n1.DofX); // 0 fest
            model.FixDof(n1.DofY); // 1 fest
            model.FixDof(n2.DofY); // 3 fest (Loselager y=0, x beweglich)

            // Äußere Last an Spitze (Knoten 3, DofY = 5)
            model.SetExternalForce(n3.DofY, loadFy);

            return model;
        }
    }
}
