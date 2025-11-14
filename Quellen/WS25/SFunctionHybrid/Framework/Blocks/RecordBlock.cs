using SFunctionContinuous.Framework.Declarations;

namespace SFunctionContinuous.Framework.Blocks
{
    public class RecordBlock : Block
    {
        public List<(double, double)> Data { get; } = new List<(double, double)>();

        public RecordBlock(string name) : base(name, -1, 0)
        {
            // Inputs
            Inputs.Add(new InputDeclaration("U", true));
        }

        public override void InitializeStates(double[] continuousStates, double[] discreteStates)
        {
            Data.Clear();
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] discreteStates, double[] inputs, double[] outputs)
        {
            if (Data.Count > 0 && Data[Data.Count - 1].Item1 >= time)
            {
                Data.RemoveAt(Data.Count - 1);
            }
            Data.Add((time, inputs[0]));
        }
    }
}
