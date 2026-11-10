namespace SFunctionContinuous.Framework.Solvers
{
    public class RungeKutta4Solver : Solver
    {
        private readonly Dictionary<Block, double[]> _k1 = new();
        private readonly Dictionary<Block, double[]> _k2 = new();
        private readonly Dictionary<Block, double[]> _k3 = new();
        private readonly Dictionary<Block, double[]> _k4 = new();
        private readonly Dictionary<Block, double[]> _statesBackup = new();

        public RungeKutta4Solver(Model composition) : base(composition)
        {
            foreach (var b in Blocks)
            {
                int count = b.ContinuousStates.Count;
                _k1[b] = new double[count];
                _k2[b] = new double[count];
                _k3[b] = new double[count];
                _k4[b] = new double[count];
                _statesBackup[b] = new double[count];
            }
        }

        public override void Solve(double timeStep, double timeMax)
        {
            double time = 0.0;
            InitializeStates();

            while (time <= timeMax)
            {
                // Ausgangszustände sichern
                BackupStates();

                // Stufe 1: Auswertung bei t
                CalculateOutputs(time);
                CalculateDerivatives(time);
                CopyDerivativesTo(_k1);

                // Stufe 2: Auswertung bei t + dt/2 mit k1
                ApplyIntermediateStates(0.5 * timeStep, _k1);
                CalculateOutputs(time + 0.5 * timeStep);
                CalculateDerivatives(time + 0.5 * timeStep);
                CopyDerivativesTo(_k2);

                // Stufe 3: Auswertung bei t + dt/2 mit k2
                ApplyIntermediateStates(0.5 * timeStep, _k2);
                CalculateOutputs(time + 0.5 * timeStep);
                CalculateDerivatives(time + 0.5 * timeStep);
                CopyDerivativesTo(_k3);

                // Stufe 4: Auswertung bei t + dt mit k3
                ApplyIntermediateStates(timeStep, _k3);
                CalculateOutputs(time + timeStep);
                CalculateDerivatives(time + timeStep);
                CopyDerivativesTo(_k4);

                // Endgültige Zusammensetzung: Simpson-Regel
                FinalizeStates(timeStep);

                time += timeStep;
            }
        }

        private void BackupStates()
        {
            foreach (var b in Blocks)
                Array.Copy(ContinuousStates[b], _statesBackup[b], b.ContinuousStates.Count);
        }

        private void ApplyIntermediateStates(double factor, Dictionary<Block, double[]> k)
        {
            foreach (var b in Blocks)
            {
                for (int i = 0; i < b.ContinuousStates.Count; i++)
                    ContinuousStates[b][i] = _statesBackup[b][i] + factor * k[b][i];
            }
        }

        private void CopyDerivativesTo(Dictionary<Block, double[]> target)
        {
            foreach (var b in Blocks)
                Array.Copy(Derivatives[b], target[b], b.ContinuousStates.Count);
        }

        private void FinalizeStates(double dt)
        {
            foreach (var b in Blocks)
            {
                for (int i = 0; i < b.ContinuousStates.Count; i++)
                {
                    ContinuousStates[b][i] = _statesBackup[b][i] + (dt / 6.0) * (
                        _k1[b][i] + 2.0 * _k2[b][i] + 2.0 * _k3[b][i] + _k4[b][i]
                    );
                }
            }
        }

        protected override void CalculateOutputs(double time)
        {
            ResetFlags();
            List<Block> open = [.. Blocks];
            while (open.Count > 0)
            {
                int count = open.Count;
                for (int i = 0; i < open.Count; i++)
                {
                    Block f = open[i];
                    if (AreAllInputsReady(f))
                    {
                        f.CalculateOutputs(time, ContinuousStates[f], Inputs[f], Outputs[f]);
                        ForwardOutputs(f);
                        open.RemoveAt(i--);
                    }
                }
                if (count == open.Count)
                {
                    throw new Exception("Algebraische Schleife erkannt!");
                }
            }
        }
    }
}
