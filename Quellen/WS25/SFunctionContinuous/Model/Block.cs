using SFunctionContinuous.Model.Declarations;

namespace SFunctionContinuous.Model
{
    public abstract class Block
    {
        public List<Block> BlocksBefore { get; } = new List<Block>();
        public List<Block> BlocksAfter { get; } = new List<Block>();

        public List<Connection> ConnectionsIn { get; } = new List<Connection>();
        public List<Connection> ConnectionsOut { get; } = new List<Connection>();

        public string Name { get; }

        public List<StateDeclaration> ContinuousStates { get; } = new List<StateDeclaration>();
        public List<StateDeclaration> DiscreteStates { get; } = new List<StateDeclaration>();
        public List<InputDeclaration> Inputs { get; } = new List<InputDeclaration>();
        public List<OutputDeclaration> Outputs { get; } = new List<OutputDeclaration>();
        public List<ZeroCrossingDeclaration> ZeroCrossings { get; } = new List<ZeroCrossingDeclaration>();

        public Block(string name)
        {
            Name = name;
        }

        virtual public void InitializeStates(double[] continuousStates, double[] discreteStates)
        {

        }

        virtual public void CalculateDerivatives(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] derivatives)
        {

        }

        virtual public void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {

        }

        virtual public void CalculateZeroCrossings(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] zeroCrossings)
        {

        }

        virtual public void UpdateStates(double time, double[] continuousStates, double[] discreteStates, double[] inputs)
        {

        }

        public override string ToString()
        {
            return Name;
        }
    }
}
