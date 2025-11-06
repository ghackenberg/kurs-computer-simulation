namespace SFunctionContinuous.Model.Solutions
{
    class EulerExplicitLoopSolution : Solution
    {

        public EulerExplicitLoopSolution(Composition composition) : base(composition)
        {

        }

        public override void Solve(double smax, double tmax)
        {
            // Zeit initialisieren
            double t = 0;

            // Simulationsschleife
            while (t <= tmax)
            {
                double step = smax;

                if (t == 0)
                {
                    // Zustände initialisieren
                    InitializeConditions();
                }
                else
                {
                    // Zustände integrieren
                    IntegrateContinuousStates(step);
                }

                // Bereitschaft zurücksetzen
                ResetFlags();

                // Ausgaben berechnen und weiterleiten
                List<Function> open = new List<Function>(Functions);
                List<Function> done = new List<Function>();

                List<Function> guessMaster = new List<Function>();
                List<Function> guessSlave = new List<Function>();

                int guessIteration = 0;

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
                            f.CalculateOutputs(t, X[f], U[f], Y[f]);

                            // Ausgaben weiterleiten
                            ForwardOutputs(f);

                            // Funktion als erledigt markieren
                            open.RemoveAt(i--);

                            // Funktion als abhängig geschätzt markieren
                            if (guessMaster.Count > 0 && guessIteration == 0)
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

                                    U[f][i] = GuessValue[f][i];
                                }
                            }

                            // Ausgänge berechnen
                            f.CalculateOutputs(t, X[f], U[f], Y[f]);

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
                            if (ComputeError() < 0.01)
                            {
                                guessMaster.Clear();
                            }
                            // Simulation abbrechen, wenn maximale Anzahl Durchläufe erreicht ist
                            else if (guessIteration == 100000)
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
                                            GuessValue[f][i] = GuessValue[f][i] + (U[f][i] - GuessValue[f][i]) * 0.001;

                                            U[f][i] = GuessValue[f][i];
                                        }
                                        else if (GuessSlaveFlag[f][i])
                                        {
                                            ReadyFlag[f][i] = false;
                                        }
                                    }
                                    if (IsReady(f))
                                    {
                                        // Ausgänge berechnen
                                        f.CalculateOutputs(t, X[f], U[f], Y[f]);

                                        // Ausgänge weiterleiten
                                        ForwardOutputs(f);
                                    }
                                    else
                                    {
                                        // Funktion als offen markieren
                                        open.Add(f);
                                    }
                                }

                                guessIteration++;
                            }
                        }
                    }
                }

                // Ableitungen berechnen
                CalculateDerivatives(t);

                // Nulldurchgänge berechnen
                if (CalculateZeroCrossings(t))
                {
                    // Repeat with different time step!
                }

                // Zustände aktualisieren
                UpdateStates(t);

                // Zeit aktualisieren
                t += step;
            }
        }
    }
}
