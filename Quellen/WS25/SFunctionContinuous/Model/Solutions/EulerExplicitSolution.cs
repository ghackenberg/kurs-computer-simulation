using System.Windows;

namespace SFunctionContinuous.Model.Solutions
{
    class EulerExplicitSolution : Solution
    {
        public EulerExplicitSolution(Composition composition) : base(composition)
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
                // Zustände merken
                RememberInternalVariables();

                // Zeitschritt initialieren
                double timeStep = timeStepMax * 2;

                // Nulldurchgängswert initialisieren
                double zeroCrossingValue = 1;

                // Schleifenzähler initialisieren
                int zeroCrossingIterationCount = 0;

                // Nulldurchgangswert prüfen
                while (zeroCrossingValue > ZeroCrossingValueThreshold && zeroCrossingIterationCount++ < ZeroCrossingIterationCountLimit)
                {
                    // Zeitschritt aktualisieren
                    timeStep /= 2;

                    // Zustände zurücksetzen
                    RestoreInternalVariables();

                    // Kontnuierliche Zustände integrieren
                    IntegrateContinuousStates(timeStep);

                    // Ausgaben berechnen und weiterleiten
                    CalculateOutputs(time + timeStep);

                    // Ableitungen berechnen
                    CalculateDerivatives(time + timeStep);

                    // Nulldurchgängswert berechnen
                    zeroCrossingValue = CalculateZeroCrossings(time + timeStep);

                    // Zustände aktualisieren
                    UpdateStates(time + timeStep);
                }

                // Nulldurchgang prüfen und Fehler ausgeben
                if (zeroCrossingValue > ZeroCrossingValueThreshold)
                {
                    throw new Exception($"Nulldurchgang nicht gefunden ({time + timeStep}, {zeroCrossingValue})!");
                }
                else if (zeroCrossingIterationCount > 1)
                {
                    MessageBox.Show($"Nulldurchgang zum Zeitpunkt {time + timeStep} mit Wert {zeroCrossingValue} in {zeroCrossingIterationCount} Iterationen gefunden!");
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
            List<Function> open = [.. Functions];

            // Solange arbeiten, bis alle Funktionen berechnet sind
            while (open.Count > 0)
            {
                // Zahl der zu berechnenden Funktionen merken
                int count = open.Count;

                // Zu berechnende Funktionen durchlaufen
                for (int i = 0; i < open.Count; i++)
                {
                    // Nächste zu berechnende Funktion auswählen
                    Function f = open[i];

                    // Bereitschaft der Funktion prüfen
                    if (IsReady(f))
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
