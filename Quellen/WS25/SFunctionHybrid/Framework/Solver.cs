using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework
{
    public abstract class Solver
    {
        public double ZeroCrossingValueThreshold { get; set; } = 1e-6;
        public int ZeroCrossingIterationCountLimit { get; set; } = 100000;

        public Model Model { get; }

        public List<Block> Blocks { get; }
        public List<Connection> Connections { get; }

        public Dictionary<Block, bool[]> InputReadyFlags { get; } = new Dictionary<Block, bool[]>();
        public Dictionary<Block, bool> ZeroCrossingFlags { get; } = new Dictionary<Block, bool>();
        public Dictionary<Block, double> NextVariableHitTimes { get; } = new Dictionary<Block, double>();

        public Dictionary<Block, double[]> ContinuousStatesPrevious { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> ContinuousStates { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> DiscreteStatesPrevious { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> DiscreteStates { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> Derivatives { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> Inputs { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> Outputs { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> ZeroCrossingsPrevious { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> ZeroCrossings { get; } = new Dictionary<Block, double[]>();

        public Solver(Model model)
        {
            Model = model;

            Blocks = Model.Blocks;
            Connections = Model.Connections;

            foreach (Block f in Blocks)
            {
                InputReadyFlags[f] = new bool[f.Inputs.Count];

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
            foreach (Block f in Blocks)
            {
                f.InitializeStates(ContinuousStates[f], DiscreteStates[f]);

                if (f.SampleTime is DiscreteSampleTime)
                {
                    NextVariableHitTimes[f] = ((DiscreteSampleTime)f.SampleTime).Offset;
                }
                else if (f.SampleTime is VariableSampleTime)
                {
                    NextVariableHitTimes[f] = ((VariableSampleTime)f.SampleTime).Offset;
                }
            }
        }

        protected abstract void CalculateOutputs(double t);

        protected virtual void ResetFlags()
        {
            foreach (Block f in Blocks)
            {
                for (int i = 0; i < f.Inputs.Count; i++)
                {
                    InputReadyFlags[f][i] = !f.Inputs[i].DirectFeedThrough;
                }
            }
        }

        protected bool AreAllInputsReady(Block f)
        {
            for (int i = 0; i < f.Inputs.Count; i++)
            {
                if (!InputReadyFlags[f][i])
                {
                    return false;
                }
            }
            return true;
        }

        protected virtual void ForwardOutputs(Block f)
        {
            foreach (Connection c in f.ConnectionsOut)
            {
                Block sf = c.Source;
                Block tf = c.Target;

                int sfy = c.Output;
                int tfu = c.Input;

                Inputs[tf][tfu] = Outputs[sf][sfy];

                InputReadyFlags[tf][tfu] = true;
            }
        }

        protected void CalculateDerivatives(double t)
        {
            foreach (Block f in Model.Blocks)
            {
                f.CalculateDerivatives(t, ContinuousStates[f], DiscreteStates[f], Inputs[f], Derivatives[f]);
            }
        }

        protected bool UpdateStates(double t)
        {
            bool updated = false;

            foreach (Block f in Model.Blocks)
            {
                // Zustandsaktualisierung bei Nulldurchgang
                if (f.SampleTime is ContinuousSampleTime || f.SampleTime is InheritedSampleTime)
                {
                    f.UpdateStates(t, ContinuousStates[f], DiscreteStates[f], Inputs[f]);

                    updated = true;
                }
                // Zustandsaktualisierung bei diskreter Abtastzeit
                else if (f.SampleTime is DiscreteSampleTime)
                {
                    if (Math.Abs(t - NextVariableHitTimes[f]) < 1e-9)
                    {
                        f.UpdateStates(t, ContinuousStates[f], DiscreteStates[f], Inputs[f]);

                        // Bestimmung der nächsten Abtastzeit
                        NextVariableHitTimes[f] += ((DiscreteSampleTime)f.SampleTime).Period;

                        updated = true;
                    }
                }
                // Zustandsaktualisierung bei variabler Abtastzeit
                else if (f.SampleTime is VariableSampleTime)
                {
                    if (Math.Abs(t - NextVariableHitTimes[f]) < 1e-9)
                    {
                        f.UpdateStates(t, ContinuousStates[f], DiscreteStates[f], Inputs[f]);

                        // Bestimmung der nächsten Abtastzeit
                        NextVariableHitTimes[f] = f.GetNextVariableHitTime(t, ContinuousStates[f], DiscreteStates[f], Inputs[f]);

                        updated = true;
                    }
                }
            }

            return updated;
        }

        protected double CalculateZeroCrossings(double t)
        {
            // ZeroCrossing-Flags zurücksetzen
            foreach (Block f in Model.Blocks)
            {
                ZeroCrossingFlags[f] = false;
            }

            // Rückgabewert initialisieren
            double value = -1;

            // Berechne die ZeroCrossing-Signale für alle Funktionen und prüfe auf ZeroCrossings
            Dictionary<Block, double[]> cache = new Dictionary<Block, double[]>();

            foreach (Block f in Model.Blocks)
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
                        if (z[i] >= 0 && ZeroCrossings[f][i] < 0)
                        {
                            value = Math.Max(value, +z[i]);
                            // Nulldurchgang merken (wichtig für UpdateStates)
                            ZeroCrossingFlags[f] = true;
                        }
                        else if (z[i] <= 0 && ZeroCrossings[f][i] > 0)
                        {
                            value = Math.Max(value, -z[i]);
                            // Nulldurchgang merken (wichtig für UpdateStates)
                            ZeroCrossingFlags[f] = true;
                        }
                    }
                }

                // Speichere die neu berechneten Werte der ZeroCrossing-Signale
                cache[f] = z;
            }

            // Merke die Werte der ZeroCrossing-Signale für den nächsten Durchlauf
            foreach (Block f in Model.Blocks)
            {
                ZeroCrossings[f] = cache[f];
            }

            // Rückgabewerte zurückgeben
            return value;
        }

        protected void IntegrateContinuousStates(double step)
        {
            foreach (Block f in Model.Blocks)
            {
                for (int i = 0; i < f.ContinuousStates.Count; i++)
                {
                    ContinuousStates[f][i] += Derivatives[f][i] * step;
                }
            }
        }

        protected void RememberInternalVariables()
        {
            foreach (Block f in Model.Blocks)
            {
                Array.Copy(ContinuousStates[f], ContinuousStatesPrevious[f], f.ContinuousStates.Count);
                Array.Copy(DiscreteStates[f], DiscreteStatesPrevious[f], f.DiscreteStates.Count);
                Array.Copy(ZeroCrossings[f], ZeroCrossingsPrevious[f], f.ZeroCrossings.Count);
            }
        }

        protected void RestoreInternalVariables()
        {
            foreach (Block f in Model.Blocks)
            {
                Array.Copy(ContinuousStatesPrevious[f], ContinuousStates[f], f.ContinuousStates.Count);
                Array.Copy(DiscreteStatesPrevious[f], DiscreteStates[f], f.DiscreteStates.Count);
                Array.Copy(ZeroCrossingsPrevious[f], ZeroCrossings[f], f.ZeroCrossings.Count);
            }
        }
    }
}
