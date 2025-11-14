namespace SFunctionContinuous.Framework.Solvers
{
    public class EulerImplicitSolver : Solver
    {
        public double ImplicitErrorThreshold { get; set; } = 1e-4;
        public int ImplicitIterationCountLimit { get; set; } = 100000;
        public double ImplicitLearningRate { get; set; } = 0.1;

        public EulerImplicitSolver(Model composition) : base(composition)
        {

        }

        public sealed override void Solve(double timeStepMax, double timeMax)
        {
            // Zeit initialisieren
            double time = 0;

            // Zustände initialisieren
            InitializeStates();

            // Ausgaben berechnen und weiterleiten
            CalculateOutputs(time);

            // Ableitungen berechnen
            CalculateDerivatives(time);

            // Nulldurchgänge berechnen
            CalculateZeroCrossings(time);

            // Simulationsschleife
            while (time <= timeMax)
            {
                // Interne Variablen merken
                RememberInternalVariables();

                // Zeitschritt initialieren
                double timeStep = timeStepMax * 2;

                // Nulldurchgängswert initialisieren
                double zeroCrossingValue = 1;

                // Schleifenzähler initialisieren
                int zeroCrossingIterationCount = 0;

                // Mindestens einmal iterieren und wenn Nulldurchgang existiert, iterieren und die Nullstelle lokalisieren
                while (zeroCrossingValue > ZeroCrossingValueThreshold && zeroCrossingIterationCount++ < ZeroCrossingIterationCountLimit)
                {
                    // Zeitschritt aktualisieren
                    timeStep /= 2;

                    // Fehler der impliziten Integration initialisieren
                    double implicitError = 1;

                    // Implizite Iterationzähler initialisieren
                    int implicitIterationCount = 0;

                    // Solange iterieren, bis der Fehler klein genug ist oder die maximale Iterationsanzahl erreicht ist
                    while (implicitError > ImplicitErrorThreshold && implicitIterationCount++ < ImplicitIterationCountLimit)
                    {
                        // Interne Variablen zurücksetzen
                        RestoreInternalVariables();

                        // Ableitungen merken
                        Dictionary<Block, double[]> derivativesPrevious = new Dictionary<Block, double[]>();

                        foreach (Block f in Blocks)
                        {
                            derivativesPrevious[f] = new double[f.ContinuousStates.Count];

                            Array.Copy(Derivatives[f], derivativesPrevious[f], f.ContinuousStates.Count);
                        }

                        // Kontnuierliche Zustände integrieren
                        IntegrateContinuousStates(timeStep);

                        // Ausgaben berechnen
                        CalculateOutputs(time + timeStep);

                        // Ableitungen berechnen
                        CalculateDerivatives(time + timeStep);

                        // Fehler berechnen
                        implicitError = 0;

                        foreach (Block f in Blocks)
                        {
                            for (int i = 0; i < f.ContinuousStates.Count; i++)
                            {
                                implicitError = Math.Max(implicitError, Math.Abs(Derivatives[f][i] - derivativesPrevious[f][i]));
                            }
                        }

                        // Prüfen, ob der Fehler noch zu groß ist
                        if (implicitError > ImplicitErrorThreshold)
                        {
                            // Ableitungen anpassen
                            foreach (Block f in Blocks)
                            {
                                for (int i = 0; i < f.ContinuousStates.Count; i++)
                                {
                                    Derivatives[f][i] = derivativesPrevious[f][i] + (Derivatives[f][i] - derivativesPrevious[f][i]) * ImplicitLearningRate;
                                }
                            }
                        }
                    }

                    // Implizite Integration konnte nicht konvergieren?
                    if (implicitError > ImplicitErrorThreshold)
                    {
                        throw new Exception("Implizite Integration konnte nicht konvergieren!");
                    }

                    // Nulldurchgänge berechnen
                    zeroCrossingValue = CalculateZeroCrossings(time + timeStep);
                }

                // Nulldurchgang existiert, aber nicht gefunden?
                if (zeroCrossingValue > ZeroCrossingValueThreshold)
                {
                    // Fehler ausgeben
                    throw new Exception($"Nulldurchgang nicht gefunden ({time + timeStep}, {zeroCrossingValue})!");
                }

                // Nulldurchgang existiert und gefunden?
                if (zeroCrossingValue > 0)
                {
                    // Zustände aktualisieren
                    UpdateStates(time + timeStep);

                    // Ausgaben noch einmal neu berechnen
                    CalculateOutputs(time + timeStep);

                    // Ableitungen noch einmal neu berechnen
                    CalculateDerivatives(time + timeStep);

                    // Nulldurchgänge noch einmal neu berechnen
                    CalculateZeroCrossings(time + timeStep);
                }

                // Zeit aktualisieren
                time += timeStep;
            }
        }

        protected override void CalculateOutputs(double time)
        {
            // Bereitschaft zurücksetzen
            ResetFlags();

            // Alle Funktion als "zu berechnen" markieren
            List<Block> open = [.. Blocks];

            // Solange arbeiten, bis alle Funktionen berechnet sind
            while (open.Count > 0)
            {
                // Zahl der zu berechnenden Funktionen merken
                int count = open.Count;

                // Zu berechnende Funktionen durchlaufen
                for (int i = 0; i < open.Count; i++)
                {
                    // Nächste zu berechnende Funktion auswählen
                    Block f = open[i];

                    // Bereitschaft der Funktion prüfen
                    if (AreAllInputsReady(f))
                    {
                        // Ausgaben der Funktion berechnen
                        f.CalculateOutputs(time, ContinuousStates[f], DiscreteStates[f], Inputs[f], Outputs[f]);

                        // Ausgaben der Funktion weiterleiten
                        ForwardOutputs(f);

                        // Funktion als erledigt markieren
                        open.RemoveAt(i--);
                    }
                }

                // Prüfen, ob die Anzahl der offenen Funktionen gleich geblieben ist
                if (count == open.Count)
                {
                    // Fehlermeldung ausgeben
                    throw new Exception("Algebraische Schleife erkannt!");
                }
            }
        }
    }
}
