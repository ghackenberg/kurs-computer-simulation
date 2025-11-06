using SFunctionContinuous.Model.Declarations;

namespace SFunctionContinuous.Model
{
    abstract class Function
    {
        public List<Function> FunctionsBefore { get; } = new List<Function>();
        public List<Function> FunctionsAfter { get; } = new List<Function>();

        public List<Connection> ConnectionsIn { get; } = new List<Connection>();
        public List<Connection> ConnectionsOut { get; } = new List<Connection>();

        public string Name { get; }

        public List<StateDeclaration> ContinuousStates { get; } = new List<StateDeclaration>();
        public List<StateDeclaration> DiscreteStates { get; } = new List<StateDeclaration>();
        public List<InputDeclaration> Inputs { get; } = new List<InputDeclaration>();
        public List<OutputDeclaration> Outputs { get; } = new List<OutputDeclaration>();
        public List<ZeroCrossingDeclaration> ZeroCrossings { get; } = new List<ZeroCrossingDeclaration>();

        public Function(string name)
        {
            Name = name;
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
