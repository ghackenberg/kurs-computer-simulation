namespace SFunctionContinuous.Model
{
    abstract class Solution
    {
        public double AlgebraicLoopErrorThreshold { get; set; } = 0.0001;
        public double ZeroCrossingValueThreshold { get; set; } = 0.0001;

        public int AlgebraicLoopIterationCountLimit { get; set; } = 100000;
        public int ZeroCrossingIterationCountLimit { get; set; } = 100000;

        public Composition Composition { get; }

        public List<Function> Functions { get; }
        public List<Connection> Connections { get; }

        public Dictionary<Function, bool[]> ReadyFlag { get; } = new Dictionary<Function, bool[]>();

        public Dictionary<Function, bool[]> GuessMasterFlag { get; } = new Dictionary<Function, bool[]>();
        public Dictionary<Function, bool[]> GuessSlaveFlag { get; } = new Dictionary<Function, bool[]>();
        public Dictionary<Function, double[]> GuessValue { get; } = new Dictionary<Function, double[]>();

        public Dictionary<Function, double[]> ContinuousStatesPrevious { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> ContinuousStates { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> DiscreteStatesPrevious { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> DiscreteStates { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> Derivatives { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> Inputs { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> Outputs { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> ZeroCrossingsPrevious { get; } = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> ZeroCrossings { get; } = new Dictionary<Function, double[]>();

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

                ContinuousStatesPrevious[f] = new double[f.ContinuousStates.Count];
                ContinuousStates[f] = new double[f.ContinuousStates.Count];
                Derivatives[f] = new double[f.ContinuousStates.Count];
                DiscreteStatesPrevious[f] = new double[f.DiscreteStates.Count];
                DiscreteStates[f] = new double[f.DiscreteStates.Count];
                Inputs[f] = new double[f.Inputs.Count];
                Outputs[f] = new double[f.Outputs.Count];
                ZeroCrossingsPrevious[f] = new double[f.ZeroCrossings.Count];
                ZeroCrossings[f] = new double[f.ZeroCrossings.Count];
            }
        }

        public abstract void Solve(double smax, double tmax);

        protected void InitializeConditions()
        {
            foreach (Function f in Functions)
            {
                f.InitializeConditions(ContinuousStates[f]);
            }
        }

        protected abstract void CalculateOutputs(double t);

        protected void ResetFlags()
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

        protected bool IsReady(Function f)
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

        protected bool HasGuess(Function f)
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

        protected void ForwardOutputs(Function f)
        {
            foreach (Connection c in f.ConnectionsOut)
            {
                Function sf = c.Source;
                Function tf = c.Target;

                int sfy = c.Output;
                int tfu = c.Input;

                Inputs[tf][tfu] = Outputs[sf][sfy];

                ReadyFlag[tf][tfu] = true;

                GuessSlaveFlag[tf][tfu] = HasGuess(f);
            }
        }

        protected double ComputeAlgebraicLoopError()
        {
            double error = 0;

            foreach (Function f in Functions)
            {
                for (int i = 0; i < f.Inputs.Count; i++)
                {
                    if (GuessMasterFlag[f][i])
                    {
                        error += Math.Abs(GuessValue[f][i] - Inputs[f][i]);
                    }
                }
            }

            return error;
        }

        protected void CalculateDerivatives(double t)
        {
            foreach (Function f in Composition.Functions)
            {
                f.CalculateDerivatives(t, ContinuousStates[f], Inputs[f], Derivatives[f]);
            }
        }

        protected void UpdateStates(double t)
        {
            foreach (Function f in Composition.Functions)
            {
                f.UpdateStates(t, ContinuousStates[f], Inputs[f]);
            }
        }

        protected double CalculateZeroCrossings(double t)
        {
            double value = -1;

            // Berechne die ZeroCrossing-Signale für alle Funktionen und prüfe auf ZeroCrossings
            Dictionary<Function, double[]> cache = new Dictionary<Function, double[]>();

            foreach (Function f in Composition.Functions)
            {
                // Initialisiere den Speicher für die neuen Werte
                double[] z = new double[f.ZeroCrossings.Count];

                // Berechne die neuen Werte der ZeroCrossing-Signale
                f.CalculateZeroCrossings(t, ContinuousStates[f], Inputs[f], z);

                // Prüfe, ob bereits zuvor ein ZeroCrossing-Signal berechnet wurde
                if (t > 0)
                {
                    // Wenn ja, prüfe, ob eines der Signale das Vorzeichen gewechselt hat
                    for (int i = 0; i < f.ZeroCrossings.Count; i++)
                    {
                        if (z[i] > 0 && ZeroCrossings[f][i] < 0)
                        {
                            value = Math.Max(value, +z[i]);
                        }
                        else if (z[i] < 0 && ZeroCrossings[f][i] > 0)
                        {
                            value = Math.Max(value, -z[i]);
                        }
                    }
                }

                // Speichere die neu berechneten Werte der ZeroCrossing-Signale
                cache[f] = z;
            }

            // Merke die Werte der ZeroCrossing-Signale für den nächsten Durchlauf
            foreach (Function f in Composition.Functions)
            {
                ZeroCrossings[f] = cache[f];
            }

            // Es wurde kein ZeroCrossing erkannt
            return value;
        }

        protected void IntegrateContinuousStates(double step)
        {
            foreach (Function f in Composition.Functions)
            {
                for (int i = 0; i < f.ContinuousStates.Count; i++)
                {
                    ContinuousStates[f][i] += Derivatives[f][i] * step;
                }
            }
        }

        protected void RememberInternalVariables()
        {
            foreach (Function f in Composition.Functions)
            {
                Array.Copy(ContinuousStates[f], ContinuousStatesPrevious[f], f.ContinuousStates.Count);
                Array.Copy(DiscreteStates[f], DiscreteStatesPrevious[f], f.DiscreteStates.Count);
                Array.Copy(ZeroCrossings[f], ZeroCrossingsPrevious[f], f.ZeroCrossings.Count);
            }
        }

        protected void RestoreInternalVariables()
        {
            foreach (Function f in Composition.Functions)
            {
                Array.Copy(ContinuousStatesPrevious[f], ContinuousStates[f], f.ContinuousStates.Count);
                Array.Copy(DiscreteStatesPrevious[f], DiscreteStates[f], f.DiscreteStates.Count);
                Array.Copy(ZeroCrossingsPrevious[f], ZeroCrossings[f], f.ZeroCrossings.Count);
            }
        }
    }
}
