namespace SFunctionContinuous.Model.Solutions
{
    class EulerExplicitSolution : Solution
    {
        public Dictionary<Function, bool[]> ReadyFlag = new Dictionary<Function, bool[]>();
        public Dictionary<Function, bool[]> GuessFlag = new Dictionary<Function, bool[]>();
        public Dictionary<Function, double[]> GuessValue = new Dictionary<Function, double[]>();

        public Dictionary<Function, double[]> X = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> D = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> U = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> Y = new Dictionary<Function, double[]>();

        public override void Solve(Composition composition, double step, double tmax)
        {
            // Verzeichnisse initialisieren
            ReadyFlag.Clear();
            GuessFlag.Clear();
            GuessValue.Clear();

            X.Clear();
            D.Clear();
            U.Clear();
            Y.Clear();

            // Vektoren initialisieren
            foreach (Function f in composition.Functions)
            {
                ReadyFlag[f] = new bool[f.DimU];
                GuessFlag[f] = new bool[f.DimU];
                GuessValue[f] = new double[f.DimU];

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
                        ReadyFlag[f][i] = false;
                        GuessFlag[f][i] = false;
                    }
                }

                // Ausgaben berechnen und weiterleiten
                List<Function> open = new List<Function>(composition.Functions);

                int guessIteration = 0;

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

                                ReadyFlag[tf][tfu] = true;
                            }

                            if (!HasGuess(f))
                            {
                                // Funktion entfernen
                                open.RemoveAt(i--);
                            }
                        }
                    }

                    // Funktionszahl prüfen
                    if (count == open.Count)
                    {
                        if (guessIteration == 1000)
                        {
                            throw new Exception("Could not solve algebraic loop!");
                        }

                        if (guessIteration > 0)
                        {
                            double error = 0;

                            foreach (Function f in open)
                            {
                                for (int i = 0; i < f.DimU; i++)
                                {
                                    if (GuessFlag[f][i])
                                    {
                                        error += Math.Abs(GuessValue[f][i] - U[f][i]);
                                    }
                                }
                            }

                            if (error < 0.01)
                            {
                                open.Clear();
                            }
                        }

                        // Schätzung machen
                        foreach (Function f in open)
                        {
                            for (int i = 0; i < f.DimU; i++)
                            {
                                if (!ReadyFlag[f][i])
                                {
                                    ReadyFlag[f][i] = true;
                                    GuessFlag[f][i] = true;
                                    GuessValue[f][i] = 0;

                                    U[f][i] = GuessValue[f][i];
                                }
                                else if (GuessFlag[f][i])
                                {
                                    GuessValue[f][i] = GuessValue[f][i] + (U[f][i] - GuessValue[f][i]) * 0.1;

                                    U[f][i] = GuessValue[f][i];
                                }
                            }
                        }

                        guessIteration++;
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
                if (!ReadyFlag[f][i])
                {
                    return false;
                }
            }
            return true;
        }

        private bool HasGuess(Function f)
        {
            for (int i = 0; i < f.DimU; i++)
            {
                if (!GuessFlag[f][i])
                {
                    return true;
                }
            }
            return false;
        }
    }
}
