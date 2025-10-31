namespace SFunctionContinuous.Model
{
    abstract class Function
    {
        public List<Function> FunctionsBefore = new List<Function>();
        public List<Function> FunctionsAfter = new List<Function>();

        public List<Connection> ConnectionsIn = new List<Connection>();
        public List<Connection> ConnectionsOut = new List<Connection>();

        public readonly string Name;

        public readonly int DimX;
        public readonly int DimU;
        public readonly int DimY;
        public readonly int DimZ;

        public Function(string name, int dimX, int dimU, int dimY, int dimZ)
        {
            Name = name;

            DimX = dimX;
            DimU = dimU;
            DimY = dimY;
            DimZ = dimZ;
        }

        virtual public void InitializeConditions(double[] x)
        {

        }

        virtual public void CalculateDerivatives(double t, double[] x, double[] u, double[] d)
        {

        }

        virtual public void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {

        }

        virtual public void CalculateZeroCrossings(double t, double[] x, double[] u, double[] z)
        {

        }

        virtual public void UpdateStates(double t, double[] x, double[] u)
        {

        }

        public override string ToString()
        {
            return Name;
        }
    }
}
