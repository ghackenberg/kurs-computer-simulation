using System;
using System.Collections.Generic;
using System.Linq;
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Double;

namespace TrussFemSolver.Fem
{
    /// <summary>
    /// Assemblierung und Blockpartitionierung der globalen FEM-Steifigkeitsmatrix.
    /// K * u = f
    /// [ K_ff  K_fp ] [ u_f ] = [ f_f ]
    /// [ K_pf  K_pp ] [ u_p ]   [ f_p ]
    /// </summary>
    public class GlobalStiffnessMatrix
    {
        public List<Node> Nodes { get; } = new();
        public List<TrussElement> Elements { get; } = new();
        public HashSet<int> FixedDofs { get; } = new();
        public Vector<double> ExternalForces { get; private set; }

        public int TotalDofs => Nodes.Count * 2;

        public GlobalStiffnessMatrix()
        {
            ExternalForces = new DenseVector(0);
        }

        public void AddNode(Node node)
        {
            Nodes.Add(node);
            ResizeForceVector();
        }

        public void AddElement(TrussElement element)
        {
            Elements.Add(element);
        }

        public void FixDof(int dof)
        {
            FixedDofs.Add(dof);
        }

        public void SetExternalForce(int dof, double force)
        {
            ResizeForceVector();
            ExternalForces[dof] = force;
        }

        private void ResizeForceVector()
        {
            if (ExternalForces.Count < TotalDofs)
            {
                var newForces = new DenseVector(TotalDofs);
                for (int i = 0; i < ExternalForces.Count; i++)
                {
                    newForces[i] = ExternalForces[i];
                }
                ExternalForces = newForces;
            }
        }

        /// <summary>
        /// Assembliert die globale Steifigkeitsmatrix K über alle Stabelemente.
        /// </summary>
        public Matrix<double> AssembleGlobalMatrix()
        {
            var kGlobal = new DenseMatrix(TotalDofs, TotalDofs);

            foreach (var elem in Elements)
            {
                var ke = elem.ComputeElementStiffnessMatrix();
                int[] dofs = { elem.Node1.DofX, elem.Node1.DofY, elem.Node2.DofX, elem.Node2.DofY };

                for (int r = 0; r < 4; r++)
                {
                    int row = dofs[r];
                    for (int c = 0; c < 4; c++)
                    {
                        int col = dofs[c];
                        kGlobal[row, col] += ke[r, c];
                    }
                }
            }

            return kGlobal;
        }

        /// <summary>
        /// Zerlegt das Gesamtsystem in freie (f) und vorgeschriebene (p) Indizes.
        /// </summary>
        public (int[] FreeDofs, int[] PrescribedDofs, Matrix<double> Kff, Matrix<double> Kpf, Vector<double> Ff) Partition()
        {
            var prescribed = FixedDofs.OrderBy(d => d).ToArray();
            var free = Enumerable.Range(0, TotalDofs).Except(FixedDofs).OrderBy(d => d).ToArray();

            var kGlobal = AssembleGlobalMatrix();

            var kff = new DenseMatrix(free.Length, free.Length);
            for (int i = 0; i < free.Length; i++)
            {
                for (int j = 0; j < free.Length; j++)
                {
                    kff[i, j] = kGlobal[free[i], free[j]];
                }
            }

            var kpf = new DenseMatrix(prescribed.Length, free.Length);
            for (int i = 0; i < prescribed.Length; i++)
            {
                for (int j = 0; j < free.Length; j++)
                {
                    kpf[i, j] = kGlobal[prescribed[i], free[j]];
                }
            }

            var ff = new DenseVector(free.Length);
            for (int i = 0; i < free.Length; i++)
            {
                ff[i] = ExternalForces[free[i]];
            }

            return (free, prescribed, kff, kpf, ff);
        }
    }
}
