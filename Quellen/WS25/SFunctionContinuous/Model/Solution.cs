namespace SFunctionContinuous.Model
{
    abstract class Solution
    {
        public Composition Composition { get; }

        public List<Function> Functions { get; }
        public List<Connection> Connections { get; }

        public Dictionary<Function, bool[]> ReadyFlag { get; } = new Dictionary<Function, bool[]>();

        public Dictionary<Function, bool[]> GuessMasterFlag { get; } = new Dictionary<Function, bool[]>();
        public Dictionary<Function, bool[]> GuessSlaveFlag { get; } = new Dictionary<Function, bool[]>();
        public Dictionary<Function, double[]> GuessValue { get; } = new Dictionary<Function, double[]>();

        public Dictionary<Function, double[]> X { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> D { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> U { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> Y { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> Z { get; } = new Dictionary<Function, double[]>();

        public Solution(Composition composition)
        {
            Composition = composition;

            Functions = Composition.Functions;
            Connections = Composition.Connections;

            foreach (Function f in Functions)
            {
                ReadyFlag[f] = new bool[f.Inputs.Count];

                GuessMasterFlag[f] = new bool[f.Inputs.Count];
                GuessSlaveFlag[f] = new bool[f.Inputs.Count];
                GuessValue[f] = new double[f.Inputs.Count];

                X[f] = new double[f.ContinuousStates.Count];
                D[f] = new double[f.ContinuousStates.Count];
                U[f] = new double[f.Inputs.Count];
                Y[f] = new double[f.Outputs.Count];
                Z[f] = new double[f.ZeroCrossings.Count];
            }
        }

        public void InitializeConditions()
        {
            foreach (Function f in Functions)
            {
                f.InitializeConditions(X[f]);
            }
        }

        public void ResetFlags()
        {
            foreach (Function f in Functions)
            {
                for (int i = 0; i < f.Inputs.Count; i++)
                {
                    ReadyFlag[f][i] = !f.Inputs[i].DirectFeedThrough;

                    GuessMasterFlag[f][i] = false;
                    GuessSlaveFlag[f][i] = false;
                }
            }
        }

        public void ForwardOutputs(Function f)
        {
            foreach (Connection c in f.ConnectionsOut)
            {
                Function sf = c.Source;
                Function tf = c.Target;

                int sfy = c.Output;
                int tfu = c.Input;

                U[tf][tfu] = Y[sf][sfy];

                ReadyFlag[tf][tfu] = true;

                GuessSlaveFlag[tf][tfu] = HasGuess(f);
            }
        }

        public double ComputeError()
        {
            double error = 0;

            foreach (Function f in Functions)
            {
                for (int i = 0; i < f.Inputs.Count; i++)
                {
                    if (GuessMasterFlag[f][i])
                    {
                        error += Math.Abs(GuessValue[f][i] - U[f][i]);
                    }
                }
            }

            return error;
        }

        public bool IsReady(Function f)
        {
            for (int i = 0; i < f.Inputs.Count; i++)
            {
                if (!ReadyFlag[f][i])
                {
                    return false;
                }
            }
            return true;
        }

        public bool HasGuess(Function f)
        {
            for (int i = 0; i < f.Inputs.Count; i++)
            {
                if (!GuessMasterFlag[f][i] && !GuessSlaveFlag[f][i])
                {
                    return true;
                }
            }
            return false;
        }

        public void CalculateDerivatives(double t)
        {
            foreach (Function f in Composition.Functions)
            {
                f.CalculateDerivatives(t, X[f], U[f], D[f]);
            }
        }

        public void IntegrateContinuousStates(double step)
        {
            foreach (Function f in Composition.Functions)
            {
                for (int i = 0; i < f.ContinuousStates.Count; i++)
                {
                    X[f][i] += D[f][i] * step;
                }
            }
        }

        public bool CalculateZeroCrossings(double t)
        {
            // Berechne die ZeroCrossing-Signale für alle Funktionen und prüfe auf ZeroCrossings
            Dictionary<Function, double[]> cache = new Dictionary<Function, double[]>();

            foreach (Function f in Composition.Functions)
            {
                // Berechne die neuen Werte der ZeroCrossing-Signale
                double[] z = new double[f.ZeroCrossings.Count];

                f.CalculateZeroCrossings(t, X[f], U[f], z);

                // Prüfe, ob bereits zuvor ein ZeroCrossing-Signal berechnet wurde
                if (t > 0)
                {
                    // Wenn ja, prüfe, ob eines der Signale das Vorzeichen gewechselt hat
                    for (int i = 0; i < f.ZeroCrossings.Count; i++)
                    {
                        if (z[i] > 0 && Z[f][i] < 0)
                        {
                            return true;
                        }
                        else if (z[i] < 0 && Z[f][i] > 0)
                        {
                            return true;
                        }
                    }
                }

                // Speichere die neu berechneten Werte der ZeroCrossing-Signale
                cache[f] = z;
            }

            // Merke die Werte der ZeroCrossing-Signale für den nächsten Durchlauf
            foreach (Function f in Composition.Functions)
            {
                Z[f] = cache[f];
            }

            // Es wurde kein ZeroCrossing erkannt
            return false;
        }

        public void UpdateStates(double t)
        {
            foreach (Function f in Composition.Functions)
            {
                f.UpdateStates(t, X[f], U[f]);
            }
        }

        public abstract void Solve(double smax, double tmax);
    }
}
