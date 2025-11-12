namespace SFunctionContinuous.Framework.Solvers
{
    public class EulerExplicitSolver : Solver
    {
        public EulerExplicitSolver(Model composition) : base(composition)
        {

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
                // Kontnuierliche Zustände integrieren
                IntegrateContinuousStates(timeStep);

                // Ausgaben berechnen
                CalculateOutputs(time + timeStep);

                // Ableitungen berechnen
                CalculateDerivatives(time + timeStep);

                // Zeit aktualisieren
                time += timeStep;
            }
        }

        protected override void CalculateOutputs(double time)
        {
            // Bereitschaft zurücksetzen
            ResetInputReadyFlags();

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
