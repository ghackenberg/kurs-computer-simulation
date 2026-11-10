namespace SFunctionContinuous.Framework.Solvers
{
    public class EulerImplicitSolver : Solver
    {
        public Dictionary<Block, double[]> ContinuousStatesPrevious { get; } = new Dictionary<Block, double[]>();

        public double ImplicitErrorThreshold { get; set; } = 0.0001;
        public int ImplicitIterationCountLimit { get; set; } = 100000;
        public double ImplicitLearningRate { get; set; } = 0.1;

        public EulerImplicitSolver(Model composition) : base(composition)
        {
            foreach (Block b in Blocks)
            {
                ContinuousStatesPrevious[b] = new double[b.ContinuousStates.Count];
            }
        }

        public sealed override void Solve(double timeStep, double timeMax)
        {
            // Zeit initialisieren
            double time = 0;

            // Zustände initialisieren
            InitializeStates();

            // Ausgaben berechnen und weiterleiten
            CalculateOutputs(time);

            // Ableitungen berechnen
            CalculateDerivatives(time);

            // Simulationsschleife
            while (time <= timeMax)
            {
                // Interne Variablen merken
                RememberInternalVariables();

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

                // Zeit aktualisieren
                time += timeStep;
            }
        }

        protected void RememberInternalVariables()
        {
            foreach (Block f in Composition.Blocks)
            {
                Array.Copy(ContinuousStates[f], ContinuousStatesPrevious[f], f.ContinuousStates.Count);
            }
        }

        protected void RestoreInternalVariables()
        {
            foreach (Block f in Composition.Blocks)
            {
                Array.Copy(ContinuousStatesPrevious[f], ContinuousStates[f], f.ContinuousStates.Count);
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
                        f.CalculateOutputs(time, ContinuousStates[f], Inputs[f], Outputs[f]);

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
