namespace SFunctionContinuous.Framework
{
    public abstract class Solver
    {
        public double AlgebraicLoopErrorThreshold { get; set; } = 0.0001;
        public double ZeroCrossingValueThreshold { get; set; } = 0.0001;

        public int AlgebraicLoopIterationCountLimit { get; set; } = 100000;
        public int ZeroCrossingIterationCountLimit { get; set; } = 100000;

        public Model Composition { get; }

        public List<Block> Functions { get; }
        public List<Connection> Connections { get; }

        public Dictionary<Block, bool[]> ReadyFlag { get; } = new Dictionary<Block, bool[]>();

        public Dictionary<Block, bool[]> GuessMasterFlag { get; } = new Dictionary<Block, bool[]>();
        public Dictionary<Block, bool[]> GuessSlaveFlag { get; } = new Dictionary<Block, bool[]>();
        public Dictionary<Block, double[]> GuessValue { get; } = new Dictionary<Block, double[]>();

        public Dictionary<Block, double[]> ContinuousStatesPrevious { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> ContinuousStates { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> DiscreteStatesPrevious { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> DiscreteStates { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> Derivatives { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> Inputs { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> Outputs { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> ZeroCrossingsPrevious { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> ZeroCrossings { get; } = new Dictionary<Block, double[]>();

        public Solver(Model composition)
        {
            Composition = composition;

            Functions = Composition.Blocks;
            Connections = Composition.Connections;

            foreach (Block f in Functions)
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

        protected void InitializeStates()
        {
            foreach (Block f in Functions)
            {
                f.InitializeStates(ContinuousStates[f], DiscreteStates[f]);
            }
        }

        protected abstract void CalculateOutputs(double t);

        protected void ResetFlags()
        {
            foreach (Block f in Functions)
            {
                for (int i = 0; i < f.Inputs.Count; i++)
                {
                    ReadyFlag[f][i] = !f.Inputs[i].DirectFeedThrough;

                    GuessMasterFlag[f][i] = false;
                    GuessSlaveFlag[f][i] = false;
                }
            }
        }

        protected bool IsReady(Block f)
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

        protected bool HasGuess(Block f)
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

        protected void ForwardOutputs(Block f)
        {
            foreach (Connection c in f.ConnectionsOut)
            {
                Block sf = c.Source;
                Block tf = c.Target;

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

            foreach (Block f in Functions)
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
            foreach (Block f in Composition.Blocks)
            {
                f.CalculateDerivatives(t, ContinuousStates[f], DiscreteStates[f], Inputs[f], Derivatives[f]);
            }
        }

        protected void UpdateStates(double t)
        {
            foreach (Block f in Composition.Blocks)
            {
                f.UpdateStates(t, ContinuousStates[f], DiscreteStates[f], Inputs[f]);
            }
        }

        protected double CalculateZeroCrossings(double t)
        {
            // Rückgabewert initialisieren
            double value = -1;

            // Berechne die ZeroCrossing-Signale für alle Funktionen und prüfe auf ZeroCrossings
            Dictionary<Block, double[]> cache = new Dictionary<Block, double[]>();

            foreach (Block f in Composition.Blocks)
            {
                // Initialisiere den Speicher für die neuen Werte
                double[] z = new double[f.ZeroCrossings.Count];

                // Berechne die neuen Werte der ZeroCrossing-Signale
                f.CalculateZeroCrossings(t, ContinuousStates[f], DiscreteStates[f], Inputs[f], z);

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
            foreach (Block f in Composition.Blocks)
            {
                ZeroCrossings[f] = cache[f];
            }

            // Rückgabewerte zurückgeben
            return value;
        }

        protected void IntegrateContinuousStates(double step)
        {
            foreach (Block f in Composition.Blocks)
            {
                for (int i = 0; i < f.ContinuousStates.Count; i++)
                {
                    ContinuousStates[f][i] += Derivatives[f][i] * step;
                }
            }
        }

        protected void RememberInternalVariables()
        {
            foreach (Block f in Composition.Blocks)
            {
                Array.Copy(ContinuousStates[f], ContinuousStatesPrevious[f], f.ContinuousStates.Count);
                Array.Copy(DiscreteStates[f], DiscreteStatesPrevious[f], f.DiscreteStates.Count);
                Array.Copy(ZeroCrossings[f], ZeroCrossingsPrevious[f], f.ZeroCrossings.Count);
            }
        }

        protected void RestoreInternalVariables()
        {
            foreach (Block f in Composition.Blocks)
            {
                Array.Copy(ContinuousStatesPrevious[f], ContinuousStates[f], f.ContinuousStates.Count);
                Array.Copy(DiscreteStatesPrevious[f], DiscreteStates[f], f.DiscreteStates.Count);
                Array.Copy(ZeroCrossingsPrevious[f], ZeroCrossings[f], f.ZeroCrossings.Count);
            }
        }
    }
}
