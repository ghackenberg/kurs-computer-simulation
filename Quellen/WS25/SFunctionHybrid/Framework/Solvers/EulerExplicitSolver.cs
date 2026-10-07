using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework.Solvers
{
    public class EulerExplicitSolver : Solver
    {
        private Block[] _sortedExecutionOrder = [];

        public EulerExplicitSolver(Model composition) : base(composition)
        {
            CompileExecutionOrder();
        }

        private void CompileExecutionOrder()
        {
            // 1. Berechnung des In-Degrees bezüglich direkter Durchgriffe
            Dictionary<Block, int> inDegrees = new();
            Dictionary<Block, List<Block>> directSuccessors = new();

            foreach (var b in Blocks)
            {
                inDegrees[b] = 0;
                directSuccessors[b] = new List<Block>();
            }

            foreach (var c in Connections)
            {
                Block source = c.Source;
                Block target = c.Target;
                int targetInputIdx = c.Input;

                // Hat der Zielblock an diesem Eingang direkten Durchgriff?
                if (target.Inputs[targetInputIdx].DirectFeedThrough)
                {
                    directSuccessors[source].Add(target);
                    inDegrees[target]++;
                }
            }

            // 2. Initialisiere Queue mit Blöcken ohne Abhängigkeiten
            Queue<Block> readyQueue = new();
            foreach (var b in Blocks)
            {
                if (inDegrees[b] == 0)
                {
                    readyQueue.Enqueue(b);
                }
            }

            // 3. Kahn's Algorithmus
            List<Block> order = new(Blocks.Count);
            while (readyQueue.Count > 0)
            {
                Block u = readyQueue.Dequeue();
                order.Add(u);

                foreach (Block v in directSuccessors[u])
                {
                    inDegrees[v]--;
                    if (inDegrees[v] == 0)
                    {
                        readyQueue.Enqueue(v);
                    }
                }
            }

            // 4. Prüfung auf algebraische Schleifen
            if (order.Count != Blocks.Count)
            {
                var cyclicBlocks = Blocks.Where(b => inDegrees[b] > 0).Select(b => b.GetType().Name);
                throw new InvalidOperationException(
                    $"Algebraische Schleife im Blockdiagramm erkannt! Zyklen involvieren: {string.Join(", ", cyclicBlocks)}");
            }

            _sortedExecutionOrder = order.ToArray();
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

                    // Nulldurchgänge berechnen
                    zeroCrossingValue = CalculateZeroCrossings(time + timeStep);
                }

                // Nulldurchgang existiert, aber nicht gefunden?
                if (zeroCrossingValue > ZeroCrossingValueThreshold)
                {
                    // Fehler ausgeben
                    throw new Exception($"Nulldurchgang nicht gefunden ({time + timeStep}, {zeroCrossingValue})!");
                }

                // Zustände aktualisieren
                UpdateStates(time + timeStep);

                // Ausgaben berechnen
                CalculateOutputs(time + timeStep);

                // Ableitungen berechnen
                CalculateDerivatives(time + timeStep);

                // Nulldurchgänge berechnen
                CalculateZeroCrossings(time + timeStep);

                // Zeit aktualisieren
                time += timeStep;
            }
        }

        protected override void CalculateOutputs(double time)
        {
            // Linearer, vorberechneter O(N) Durchlauf ohne Allokationen und ohne Listenänderungen
            for (int i = 0; i < _sortedExecutionOrder.Length; i++)
            {
                Block f = _sortedExecutionOrder[i];
                f.CalculateOutputs(time, ContinuousStates[f], DiscreteStates[f], Inputs[f], Outputs[f]);
                ForwardOutputs(f);
            }
        }
    }
}
