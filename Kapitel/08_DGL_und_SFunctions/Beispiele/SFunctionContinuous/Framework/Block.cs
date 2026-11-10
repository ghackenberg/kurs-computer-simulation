using SFunctionContinuous.Framework.Declarations;

namespace SFunctionContinuous.Framework
{
    public abstract class Block
    {
        public List<Block> BlocksBefore { get; } = new List<Block>();
        public List<Block> BlocksAfter { get; } = new List<Block>();

        public List<Connection> ConnectionsIn { get; } = new List<Connection>();
        public List<Connection> ConnectionsOut { get; } = new List<Connection>();

        public string Name { get; }

        public List<StateDeclaration> ContinuousStates { get; } = new List<StateDeclaration>();
        public List<InputDeclaration> Inputs { get; } = new List<InputDeclaration>();
        public List<OutputDeclaration> Outputs { get; } = new List<OutputDeclaration>();

        public Block(string name)
        {
            Name = name;
        }

        virtual public void InitializeStates(double[] continuousStates)
        {

        }

        virtual public void CalculateDerivatives(double time, double[] continuousStates, double[] inputs, double[] derivatives)
        {

        }

        virtual public void CalculateOutputs(double time, double[] continuousStates, double[] inputs, double[] outputs)
        {

        }

        public override string ToString()
        {
            return Name;
        }
    }
}
