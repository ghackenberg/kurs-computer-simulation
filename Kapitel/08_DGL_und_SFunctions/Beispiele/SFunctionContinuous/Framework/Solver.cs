namespace SFunctionContinuous.Framework
{
    public abstract class Solver
    {
        public Model Composition { get; }

        public List<Block> Blocks { get; }
        public List<Connection> Connections { get; }

        public Dictionary<Block, bool[]> InputReadyFlags { get; } = new Dictionary<Block, bool[]>();

        public Dictionary<Block, double[]> ContinuousStates { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> Derivatives { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> Inputs { get; } = new Dictionary<Block, double[]>();
        public Dictionary<Block, double[]> Outputs { get; } = new Dictionary<Block, double[]>();

        public Solver(Model composition)
        {
            Composition = composition;

            Blocks = Composition.Blocks;
            Connections = Composition.Connections;

            foreach (Block b in Blocks)
            {
                InputReadyFlags[b] = new bool[b.Inputs.Count];

                ContinuousStates[b] = new double[b.ContinuousStates.Count];
                Derivatives[b] = new double[b.ContinuousStates.Count];
                Inputs[b] = new double[b.Inputs.Count];
                Outputs[b] = new double[b.Outputs.Count];
            }
        }

        public abstract void Solve(double smax, double tmax);

        protected void InitializeStates()
        {
            foreach (Block f in Blocks)
            {
                f.InitializeStates(ContinuousStates[f]);
            }
        }

        protected abstract void CalculateOutputs(double t);

        protected virtual void ResetFlags()
        {
            foreach (Block f in Blocks)
            {
                for (int i = 0; i < f.Inputs.Count; i++)
                {
                    InputReadyFlags[f][i] = !f.Inputs[i].DirectFeedThrough;
                }
            }
        }

        protected bool AreAllInputsReady(Block f)
        {
            for (int i = 0; i < f.Inputs.Count; i++)
            {
                if (!InputReadyFlags[f][i])
                {
                    return false;
                }
            }
            return true;
        }

        protected virtual void ForwardOutputs(Block f)
        {
            foreach (Connection c in f.ConnectionsOut)
            {
                Block sf = c.Source;
                Block tf = c.Target;

                int sfy = c.Output;
                int tfu = c.Input;

                Inputs[tf][tfu] = Outputs[sf][sfy];

                InputReadyFlags[tf][tfu] = true;
            }
        }

        protected void CalculateDerivatives(double t)
        {
            foreach (Block f in Composition.Blocks)
            {
                f.CalculateDerivatives(t, ContinuousStates[f], Inputs[f], Derivatives[f]);
            }
        }

        protected void IntegrateContinuousStates(double step)
        {
            foreach (Block f in Composition.Blocks)
            {
                for (int i = 0; i < f.ContinuousStates.Count; i++)
                {
                    ContinuousStates[f][i] += Derivatives[f][i] * step;
                }
            }
        }
    }
}
