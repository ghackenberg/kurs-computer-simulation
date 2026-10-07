namespace SFunctionContinuous.Framework.Solvers
{
    public class HeunSolver : Solver
    {
        private readonly Dictionary<Block, double[]> _k1 = new();
        private readonly Dictionary<Block, double[]> _k2 = new();
        private readonly Dictionary<Block, double[]> _statesBackup = new();

        public HeunSolver(Model composition) : base(composition)
        {
            foreach (var b in Blocks)
            {
                int count = b.ContinuousStates.Count;
                _k1[b] = new double[count];
                _k2[b] = new double[count];
                _statesBackup[b] = new double[count];
            }
        }

        public override void Solve(double timeStep, double timeMax)
        {
            double time = 0.0;
            InitializeStates();

            while (time <= timeMax)
            {
                BackupStates();

                // Stufe 1: Steigung am Intervallanfang
                CalculateOutputs(time);
                CalculateDerivatives(time);
                CopyDerivativesTo(_k1);

                // Stufe 2: Prädiktorschritt zum Intervallende
                ApplyIntermediateStates(timeStep, _k1);
                CalculateOutputs(time + timeStep);
                CalculateDerivatives(time + timeStep);
                CopyDerivativesTo(_k2);

                // Korrektur: Mittelung beider Steigungen (Trapez-Regel)
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
                    ContinuousStates[b][i] = _statesBackup[b][i] + 0.5 * dt * (_k1[b][i] + _k2[b][i]);
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
