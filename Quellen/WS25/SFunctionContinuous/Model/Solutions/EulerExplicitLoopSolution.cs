namespace SFunctionContinuous.Model.Solutions
{
    class EulerExplicitLoopSolution : EulerExplicitSolution
    {
        public EulerExplicitLoopSolution(Composition composition) : base(composition)
        {

        }

        protected override void CalculateOutputs(double time)
        {
            // Bereitschaft zurücksetzen
            ResetFlags();

            // Ausgaben berechnen und weiterleiten
            List<Function> open = [.. Functions];
            List<Function> done = new List<Function>();

            List<Function> guessMaster = new List<Function>();
            List<Function> guessSlave = new List<Function>();

            int algebraicLoopIterationCount = 0;

            while (open.Count > 0 || guessMaster.Count > 0)
            {
                // Funktionszahl vorher merken
                int count = open.Count;

                // Funktionen durchlaufen
                for (int i = 0; i < open.Count; i++)
                {
                    Function f = open[i];

                    // Bereitschaft prüfen
                    if (IsReady(f))
                    {
                        // Ausgaben berechnen
                        f.CalculateOutputs(time, ContinuousStates[f], Inputs[f], Outputs[f]);

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
                        Function f = open[0];

                        // Eingänge setzten
                        for (int i = 0; i < f.Inputs.Count; i++)
                        {
                            if (!ReadyFlag[f][i])
                            {
                                ReadyFlag[f][i] = true;
                                GuessMasterFlag[f][i] = true;

                                // Schätzung initialisieren
                                GuessValue[f][i] = 0;

                                Inputs[f][i] = GuessValue[f][i];
                            }
                        }

                        // Ausgänge berechnen
                        f.CalculateOutputs(time, ContinuousStates[f], Inputs[f], Outputs[f]);

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
                        if (ComputeAlgebraicLoopError() <= AlgebraicLoopErrorThreshold)
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
                            foreach (Function f in guessSlave)
                            {
                                for (int i = 0; i < f.Inputs.Count; i++)
                                {
                                    if (GuessSlaveFlag[f][i])
                                    {
                                        ReadyFlag[f][i] = false;
                                    }
                                }
                                open.Add(f);
                            }

                            foreach (Function f in guessMaster)
                            {
                                for (int i = 0; i < f.Inputs.Count; i++)
                                {
                                    if (GuessMasterFlag[f][i])
                                    {
                                        GuessValue[f][i] = GuessValue[f][i] + (Inputs[f][i] - GuessValue[f][i]) * 0.001;

                                        Inputs[f][i] = GuessValue[f][i];
                                    }
                                    else if (GuessSlaveFlag[f][i])
                                    {
                                        ReadyFlag[f][i] = false;
                                    }
                                }
                                if (IsReady(f))
                                {
                                    // Ausgänge berechnen
                                    f.CalculateOutputs(time, ContinuousStates[f], Inputs[f], Outputs[f]);

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
