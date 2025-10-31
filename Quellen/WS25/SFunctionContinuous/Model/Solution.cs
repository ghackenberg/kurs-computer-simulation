namespace SFunctionContinuous.Model
{
    abstract class Solution
    {
        public Composition Composition;

        public List<Function> Functions;
        public List<Connection> Connections;

        public Dictionary<Function, bool[]> ReadyFlag = new Dictionary<Function, bool[]>();

        public Dictionary<Function, bool[]> GuessMasterFlag = new Dictionary<Function, bool[]>();
        public Dictionary<Function, bool[]> GuessSlaveFlag = new Dictionary<Function, bool[]>();
        public Dictionary<Function, double[]> GuessValue = new Dictionary<Function, double[]>();

        public Dictionary<Function, double[]> X = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> D = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> U = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> Y = new Dictionary<Function, double[]>();
        public Dictionary<Function, double[]> Z = new Dictionary<Function, double[]>();

        public Solution(Composition composition)
        {
            Composition = composition;

            Functions = Composition.Functions;
            Connections = Composition.Connections;

            foreach (Function f in Functions)
            {
                ReadyFlag[f] = new bool[f.DimU];

                GuessMasterFlag[f] = new bool[f.DimU];
                GuessSlaveFlag[f] = new bool[f.DimU];
                GuessValue[f] = new double[f.DimU];

                X[f] = new double[f.DimX];
                D[f] = new double[f.DimX];
                U[f] = new double[f.DimU];
                Y[f] = new double[f.DimY];
                Z[f] = new double[f.DimZ];
            }
        }

        public void InitializeConditions()
        {
            foreach (Function f in Functions)
            {
                f.InitializeConditions(X[f]);
            }
        }

        public void ResetFlags()
        {
            foreach (Function f in Functions)
            {
                for (int i = 0; i < f.DimU; i++)
                {
                    ReadyFlag[f][i] = false;

                    GuessMasterFlag[f][i] = false;
                    GuessSlaveFlag[f][i] = false;
                }
            }
        }

        public void ForwardOutputs(Function f)
        {
            foreach (Connection c in f.ConnectionsOut)
            {
                Function sf = c.Source;
                Function tf = c.Target;

                int sfy = c.Output;
                int tfu = c.Input;

                U[tf][tfu] = Y[sf][sfy];

                ReadyFlag[tf][tfu] = true;

                GuessSlaveFlag[tf][tfu] = HasGuess(f);
            }
        }

        public double ComputeError()
        {
            double error = 0;

            foreach (Function f in Functions)
            {
                for (int i = 0; i < f.DimU; i++)
                {
                    if (GuessMasterFlag[f][i])
                    {
                        error += Math.Abs(GuessValue[f][i] - U[f][i]);
                    }
                }
            }

            return error;
        }

        public bool IsReady(Function f)
        {
            for (int i = 0; i < f.DimU; i++)
            {
                if (!ReadyFlag[f][i])
                {
                    return false;
                }
            }
            return true;
        }

        public bool HasGuess(Function f)
        {
            for (int i = 0; i < f.DimU; i++)
            {
                if (!GuessMasterFlag[f][i] && !GuessSlaveFlag[f][i])
                {
                    return true;
                }
            }
            return false;
        }

        public void CalculateDerivatives(double t)
        {
            foreach (Function f in Composition.Functions)
            {
                f.CalculateDerivatives(t, X[f], U[f], D[f]);
            }
        }

        public void IntegrateContinuousStates()
        {
            foreach (Function f in Composition.Functions)
            {
                for (int i = 0; i < f.DimX; i++)
                {
                    X[f][i] += D[f][i];
                }
            }
        }

        public bool CalculateZeroCrossings(double t)
        {
            Dictionary<Function, double[]> cache = new Dictionary<Function, double[]>();

            foreach (Function f in Composition.Functions)
            {
                double[] z = new double[f.DimZ];

                f.CalculateZeros(t, X[f], U[f], z);

                for (int i = 0; i < f.DimZ; i++)
                {
                    if (z[i] > 0 && Z[f][i] < 0)
                    {
                        return true;
                    }
                    else if (z[i] < 0 && Z[f][i] > 0)
                    {
                        return true;
                    }
                }

                cache[f] = z;
            }

            foreach (Function f in Composition.Functions)
            {
                Z[f] = cache[f];
            }

            return false;
        }

        public abstract void Solve(double step, double tmax);
    }
}
