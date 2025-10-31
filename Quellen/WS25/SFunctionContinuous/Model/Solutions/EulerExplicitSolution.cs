namespace SFunctionContinuous.Model.Solutions
{
    class EulerExplicitSolution : Solution
    {

        public EulerExplicitSolution(Composition composition) : base(composition)
        {

        }

        public override void Solve(double step, double tmax)
        {
            // Zeit initialisieren
            double t = 0;

            // Zustände initialisieren
            InitializeConditions();

            // Simulationsschleife
            while (t <= tmax)
            {
                // Bereitschaft zurücksetzen
                ResetFlags();

                // Ausgaben berechnen und weiterleiten
                List<Function> open = new List<Function>(Functions);

                while (open.Count > 0)
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
                        }
                    }

                    // Prüfen, ob die Anzahl offener Funktionen gleich geblieben ist
                    if (count == open.Count)
                    {
                        throw new Exception("Algebraische Schleife erkannt!");
                    }
                }

                // Nulldurchgänge berechnen
                if (CalculateZeroCrossings(t))
                {
                    // Repeat with different time step!
                }

                // Ableitungen berechnen
                CalculateDerivatives(t);

                // Zustände integrieren
                IntegrateContinuousStates();

                // Zeit aktualisieren
                t += step;
            }
        }
    }
}
