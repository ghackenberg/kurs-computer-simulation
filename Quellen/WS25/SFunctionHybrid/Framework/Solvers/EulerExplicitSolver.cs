using System;
using System.Collections.Generic;
using System.Linq;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework.Solvers
{
    public class EulerExplicitSolver : Solver
    {
        private Block[] _sortedExecutionOrder = [];
        private readonly HashSet<Block> _stuckBlocks = new();

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
            double time = 0;
            _stuckBlocks.Clear();

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
                // 1. Maximale Schrittweite ermitteln
                double timeStep = timeStepMax;
                foreach (Block b in Blocks)
                {
                    if (b.SampleTime is DiscreteSampleTime || b.SampleTime is VariableSampleTime)
                    {
                        timeStep = Math.Min(timeStep, NextVariableHitTimes[b] - time);
                    }
                }

                // 2. Anfangszustand dieses Schritts sichern
                RememberInternalVariables();

                // 3. Probesprung mit vollem timeStep
                IntegrateContinuousStates(timeStep);
                CalculateOutputs(time + timeStep);
                double zProbe = CalculateZeroCrossings(time + timeStep);

                // Wenn kein Vorzeichenwechsel stattfand, vollen Schritt akzeptieren
                if (zProbe < 0)
                {
                    UpdateStates(time + timeStep);
                    CalculateOutputs(time + timeStep);
                    CalculateDerivatives(time + timeStep);
                    time += timeStep;
                    continue;
                }

                // 4. Echte Intervall-Bisektion auf [tLeft, tRight] (Folie 10.49)
                double tLeft = time;
                double tRight = time + timeStep;
                double zRight = zProbe;
                int iteration = 0;

                while ((tRight - tLeft) > TimeTolerance && zRight > ZeroCrossingValueThreshold && iteration++ < ZeroCrossingIterationCountLimit)
                {
                    double tMid = 0.5 * (tLeft + tRight);

                    // Vom Schrittstart (time) nach tMid integrieren
                    RestoreInternalVariables();
                    IntegrateContinuousStates(tMid - time);
                    CalculateOutputs(tMid);
                    double zMid = CalculateZeroCrossings(tMid);

                    if (zMid >= 0)
                    {
                        // Nullstelle liegt im linken Teilintervall [tLeft, tMid]
                        tRight = tMid;
                        zRight = zMid;
                    }
                    else
                    {
                        // Nullstelle liegt im rechten Teilintervall [tMid, tRight]
                        tLeft = tMid;
                    }
                }

                // 5. Zustand exakt am detektierten Ereigniszeitpunkt fixieren
                RestoreInternalVariables();
                IntegrateContinuousStates(tRight - time);
                CalculateOutputs(tRight);
                CalculateZeroCrossings(tRight);

                // 6. Diskretes Ereignis behandeln (mit Zeno-Haftbedingung)
                ApplyZenoStickingOrUpdate(tRight);

                // 7. Restschritt-Integration fertigstellen (Folie 10.50)
                double dtRemaining = (time + timeStep) - tRight;
                if (dtRemaining > TimeTolerance)
                {
                    CalculateDerivatives(tRight);
                    IntegrateContinuousStates(dtRemaining);
                    CalculateOutputs(time + timeStep);
                    CalculateDerivatives(time + timeStep);
                    CalculateZeroCrossings(time + timeStep);
                }

                time += timeStep;
            }
        }

        private void ApplyZenoStickingOrUpdate(double eventTime)
        {
            // Prüfe auf Zeno-Schwelle: Wenn Geschwindigkeit nahe Null, verhindere unendliches Prellen
            bool stuck = false;

            // Fall 1: Mehrdimensionale Zustandsblöcke (State[0] = Position, State[1] = Geschwindigkeit)
            foreach (Block b in Model.Blocks)
            {
                if (b.ContinuousStates.Count >= 2)
                {
                    double pos = ContinuousStates[b][0];
                    double vel = ContinuousStates[b][1];

                    if (Math.Abs(vel) < StickingVelocityThreshold && Math.Abs(pos) < Math.Max(ZeroCrossingValueThreshold * 10, 1e-4))
                    {
                        ContinuousStates[b][0] = 0.0;
                        ContinuousStates[b][1] = 0.0;
                        Derivatives[b][0] = 0.0;
                        Derivatives[b][1] = 0.0;
                        _stuckBlocks.Add(b);
                        stuck = true;
                    }
                }
            }

            // Fall 2: Modulare 1D-Blöcke (z.B. BouncingBall: getrennte Blöcke für Velocity und Position)
            foreach (Block b in Model.Blocks)
            {
                if (b.ContinuousStates.Count == 1 && (b.Name.Contains("Velocity", StringComparison.OrdinalIgnoreCase) || b.GetType().Name.Contains("Reset")))
                {
                    double vel = ContinuousStates[b][0];
                    if (Math.Abs(vel) < StickingVelocityThreshold)
                    {
                        ContinuousStates[b][0] = 0.0;
                        Derivatives[b][0] = 0.0;
                        _stuckBlocks.Add(b);

                        foreach (Block pb in Model.Blocks)
                        {
                            if (pb.ContinuousStates.Count == 1 && (pb.Name.Contains("Position", StringComparison.OrdinalIgnoreCase) || pb.GetType().Name.Contains("Limit")))
                            {
                                ContinuousStates[pb][0] = 0.0;
                                Derivatives[pb][0] = 0.0;
                                _stuckBlocks.Add(pb);
                            }
                        }
                        stuck = true;
                    }
                }
            }

            if (stuck)
            {
                CalculateOutputs(eventTime);
            }
            else
            {
                // Reguläres diskretes Update für alle Blöcke ausführen
                UpdateStates(eventTime);
            }
        }

        protected override void IntegrateContinuousStates(double step)
        {
            foreach (Block f in Model.Blocks)
            {
                if (_stuckBlocks.Contains(f))
                {
                    for (int i = 0; i < f.ContinuousStates.Count; i++)
                    {
                        ContinuousStates[f][i] = 0.0;
                        Derivatives[f][i] = 0.0;
                    }
                    continue;
                }

                for (int i = 0; i < f.ContinuousStates.Count; i++)
                {
                    ContinuousStates[f][i] += Derivatives[f][i] * step;
                }
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

