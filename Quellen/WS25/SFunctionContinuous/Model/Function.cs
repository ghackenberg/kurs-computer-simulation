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

        public Function(string name, int dimX, int dimU, int dimY)
        {
            Name = name;

            DimX = dimX;
            DimU = dimU;
            DimY = dimY;
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

        public override string ToString()
        {
            return Name;
        }
    }
}
