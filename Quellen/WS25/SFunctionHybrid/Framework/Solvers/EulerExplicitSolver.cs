using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionContinuous.Framework.Solvers
{
    public class EulerExplicitSolver : Solver
    {
        public EulerExplicitSolver(Model composition) : base(composition)
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
                double timeStep = timeStepMax;

                foreach (Block b in Blocks)
                {
                    if (b.SampleTime is DiscreteSampleTime || b.SampleTime is VariableSampleTime)
                    {
                        timeStep = Math.Min(timeStep, NextVariableHitTimes[b] - time);
                    }
                }

                timeStep *= 2;

                // Nulldurchgängswert initialisieren
                double zeroCrossingValue = 1;

                // Schleifenzähler initialisieren
                int zeroCrossingIterationCount = 0;

                // Mindestens einmal iterieren und wenn Nulldurchgang existiert, iterieren und die Nullstelle lokalisieren
                while (zeroCrossingValue > ZeroCrossingValueThreshold && zeroCrossingIterationCount++ < ZeroCrossingIterationCountLimit)
                {
                    // Zeitschritt aktualisieren
                    timeStep /= 2;

                    // Interne Variablen zurücksetzen
                    RestoreInternalVariables();

                    // Kontnuierliche Zustände integrieren
                    IntegrateContinuousStates(timeStep);

                    // Ausgaben berechnen
                    CalculateOutputs(time + timeStep);

                    // Ableitungen berechnen
                    CalculateDerivatives(time + timeStep);

                    // Nulldurchgänge berechnen
                    zeroCrossingValue = CalculateZeroCrossings(time + timeStep);
                }

                // Nulldurchgang existiert, aber nicht gefunden?
                if (zeroCrossingValue > ZeroCrossingValueThreshold)
                {
                    // Fehler ausgeben
                    throw new Exception($"Nulldurchgang nicht gefunden ({time + timeStep}, {zeroCrossingValue})!");
                }

                // Diskreter Zustandsübergang (wegen Nulldurchgang oder diskreter/variabler Abtastzeit)?
                if (UpdateStates(time + timeStep))
                {
                    // Ausgaben berechnen
                    CalculateOutputs(time + timeStep);

                    // Ableitungen berechnen
                    CalculateDerivatives(time + timeStep);

                    // Nulldurchgänge berechnen
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
