namespace SFunctionContinuous.Model.Solutions
{
    class EulerExplicitSolution : Solution
    {
        public Dictionary<Function, bool[]> R = new Dictionary<Function, bool[]>();

        public Dictionary<Function, double[]> X = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> D = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> U = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> Y = new Dictionary<Function, double[]>();

        public override void Solve(Composition composition, double step, double tmax)
        {
            // Verzeichnisse initialisieren
            R.Clear();
            X.Clear();
            D.Clear();
            U.Clear();
            Y.Clear();

            // Vektoren initialisieren
            foreach (Function f in composition.Functions)
            {
                R[f] = new bool[f.DimU];

                X[f] = new double[f.DimX];
                D[f] = new double[f.DimX];
                U[f] = new double[f.DimU];
                Y[f] = new double[f.DimY];
            }

            // Zeit initialisieren
            double t = 0;

            // Zustände initialisieren
            foreach (Function f in composition.Functions)
            {
                f.InitializeConditions(X[f]);
            }

            // Simulationsschleife
            while (t <= tmax)
            {
                // Bereitschaft zurücksetzen
                foreach (Function f in composition.Functions)
                {
                    for (int i = 0; i < f.DimU; i++)
                    {
                        R[f][i] = false;
                    }
                }

                // Ausgaben berechnen und weiterleiten
                List<Function> open = new List<Function>(composition.Functions);

                while (open.Count > 0)
                {
                    // Funktionszahl vorher merken
                    int count = open.Count;

                    // Funktionen durchlaufen
                    for (int i = 0; i < open.Count; i++)
                    {
                        Function f = open[i];

                        // Bereitschaft prüfen
                        if (Ready(f))
                        {
                            // Ausgaben berechnen
                            f.CalculateOutputs(t, X[f], U[f], Y[f]);

                            // Ausgaben weiterleiten
                            foreach (Connection c in f.ConnectionsOut)
                            {
                                Function sf = c.Source;
                                int sfy = c.Output;

                                Function tf = c.Target;
                                int tfu = c.Input;

                                U[tf][tfu] = Y[sf][sfy];
                                R[tf][tfu] = true;
                            }

                            // Funktion entfernen
                            open.RemoveAt(i--);
                        }
                    }

                    // Funktionszahl prüfen
                    if (count == open.Count)
                    {
                        throw new Exception("Loop detected!");
                    }
                }

                // Ableitungen berechnen
                foreach (Function f in composition.Functions)
                {
                    f.CalculateDerivatives(t, X[f], U[f], D[f]);
                }

                // Zustände integrieren
                foreach (Function f in composition.Functions)
                {
                    for (int i = 0; i < f.DimX; i++)
                    {
                        X[f][i] += D[f][i];
                    }
                }

                // Zeit aktualisieren
                t += step;
            }
        }

        private bool Ready(Function f)
        {
            for (int i = 0; i < f.DimU; i++)
            {
                if (!R[f][i])
                {
                    return false;
                }
            }
            return true;
        }
    }
}
