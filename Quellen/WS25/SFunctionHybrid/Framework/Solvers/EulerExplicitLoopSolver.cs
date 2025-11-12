namespace SFunctionContinuous.Framework.Solvers
{
    public class EulerExplicitLoopSolver : EulerExplicitSolver
    {
        public Dictionary<Block, bool[]> InputGuessMasterFlags { get; } = new Dictionary<Block, bool[]>();
        public Dictionary<Block, bool[]> InputGuessSlaveFlags { get; } = new Dictionary<Block, bool[]>();
        public Dictionary<Block, double[]> InputGuessValues { get; } = new Dictionary<Block, double[]>();

        public double AlgebraicLoopErrorThreshold { get; set; } = 0.0001;
        public int AlgebraicLoopIterationCountLimit { get; set; } = 100000;
        public double AlgebraicLoopLearningRate { get; set; } = 0.1;

        public EulerExplicitLoopSolver(Model composition) : base(composition)
        {
            foreach (Block f in Blocks)
            {
                InputGuessMasterFlags[f] = new bool[f.Inputs.Count];
                InputGuessSlaveFlags[f] = new bool[f.Inputs.Count];
                InputGuessValues[f] = new double[f.Inputs.Count];
            }
        }

        protected override void ResetFlags()
        {
            base.ResetFlags();

            foreach (Block f in Blocks)
            {
                for (int i = 0; i < f.Inputs.Count; i++)
                {
                    InputGuessMasterFlags[f][i] = false;
                    InputGuessSlaveFlags[f][i] = false;
                }
            }
        }

        protected bool HasInputGuess(Block f)
        {
            for (int i = 0; i < f.Inputs.Count; i++)
            {
                if (!InputGuessMasterFlags[f][i] && !InputGuessSlaveFlags[f][i])
                {
                    return true;
                }
            }
            return false;
        }

        protected override void ForwardOutputs(Block f)
        {
            base.ForwardOutputs(f);

            foreach (Connection c in f.ConnectionsOut)
            {
                Block sf = c.Source;
                Block tf = c.Target;

                int sfy = c.Output;
                int tfu = c.Input;

                InputGuessSlaveFlags[tf][tfu] = HasInputGuess(f);
            }
        }

        protected double ComputeInputGuessMasterError()
        {
            double error = 0;

            foreach (Block f in Blocks)
            {
                for (int i = 0; i < f.Inputs.Count; i++)
                {
                    if (InputGuessMasterFlags[f][i])
                    {
                        error += Math.Abs(InputGuessValues[f][i] - Inputs[f][i]);
                    }
                }
            }

            return error;
        }

        protected override void CalculateOutputs(double time)
        {
            // Bereitschaft zurücksetzen
            ResetFlags();

            // Ausgaben berechnen und weiterleiten
            List<Block> open = [.. Blocks];
            List<Block> done = new List<Block>();

            List<Block> guessMaster = new List<Block>();
            List<Block> guessSlave = new List<Block>();

            int algebraicLoopIterationCount = 0;

            while (open.Count > 0 || guessMaster.Count > 0)
            {
                // Funktionszahl vorher merken
                int count = open.Count;

                // Funktionen durchlaufen
                for (int i = 0; i < open.Count; i++)
                {
                    Block f = open[i];

                    // Bereitschaft prüfen
                    if (AreAllInputsReady(f))
                    {
                        // Ausgaben berechnen
                        f.CalculateOutputs(time, ContinuousStates[f], DiscreteStates[f], Inputs[f], Outputs[f]);

                        // Ausgaben weiterleiten
                        ForwardOutputs(f);

                        // Funktion als erledigt markieren
                        open.RemoveAt(i--);

                        // Funktion als abhängig geschätzt markieren
                        if (guessMaster.Count > 0 && algebraicLoopIterationCount == 0)
                        {
                            guessSlave.Add(f);
                        }
                        else
                        {
                            done.Add(f);
                        }
                    }
                }

                // Prüfen, ob die Anzahl offener Funktionen gleich geblieben ist
                if (count == open.Count)
                {
                    // Schätzung initialisieren
                    if (open.Count > 0)
                    {
                        Block f = open[0];

                        // Eingänge setzten
                        for (int i = 0; i < f.Inputs.Count; i++)
                        {
                            if (!InputReadyFlags[f][i])
                            {
                                InputReadyFlags[f][i] = true;
                                InputGuessMasterFlags[f][i] = true;

                                // Schätzung initialisieren
                                InputGuessValues[f][i] = 0;

                                Inputs[f][i] = InputGuessValues[f][i];
                            }
                        }

                        // Ausgänge berechnen
                        f.CalculateOutputs(time, ContinuousStates[f], DiscreteStates[f], Inputs[f], Outputs[f]);

                        // Ausgänge weiterleiten
                        ForwardOutputs(f);

                        // Funktion als erledigt markieren
                        open.RemoveAt(0);

                        // Funktion als unabhängig geschätzt markieren
                        guessMaster.Add(f);
                    }
                    else
                    {
                        // Schleife beenden, wenn Schätzfehler klein genug
                        if (ComputeInputGuessMasterError() <= AlgebraicLoopErrorThreshold)
                        {
                            guessMaster.Clear();
                        }
                        // Simulation abbrechen, wenn maximale Anzahl Durchläufe erreicht ist
                        else if (algebraicLoopIterationCount == AlgebraicLoopIterationCountLimit)
                        {
                            throw new Exception("Could not solve algebraic loop!");
                        }
                        // Schätzung anpassen und nächste Iteration starten
                        else
                        {
                            foreach (Block f in guessSlave)
                            {
                                for (int i = 0; i < f.Inputs.Count; i++)
                                {
                                    if (InputGuessSlaveFlags[f][i])
                                    {
                                        InputReadyFlags[f][i] = false;
                                    }
                                }
                                open.Add(f);
                            }

                            foreach (Block f in guessMaster)
                            {
                                for (int i = 0; i < f.Inputs.Count; i++)
                                {
                                    if (InputGuessMasterFlags[f][i])
                                    {
                                        InputGuessValues[f][i] = InputGuessValues[f][i] + (Inputs[f][i] - InputGuessValues[f][i]) * AlgebraicLoopLearningRate;

                                        Inputs[f][i] = InputGuessValues[f][i];
                                    }
                                    else if (InputGuessSlaveFlags[f][i])
                                    {
                                        InputReadyFlags[f][i] = false;
                                    }
                                }
                                if (AreAllInputsReady(f))
                                {
                                    // Ausgänge berechnen
                                    f.CalculateOutputs(time, ContinuousStates[f], DiscreteStates[f], Inputs[f], Outputs[f]);

                                    // Ausgänge weiterleiten
                                    ForwardOutputs(f);
                                }
                                else
                                {
                                    // Funktion als offen markieren
                                    open.Add(f);
                                }
                            }

                            algebraicLoopIterationCount++;
                        }
                    }
                }
            }
        }
    }
}
