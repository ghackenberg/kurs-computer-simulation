namespace SFunctionContinuous.Model.Functions
{
    class RecordFunction : Function
    {
        public List<(double, double)> Data = new List<(double, double)>();

        public RecordFunction(string name) : base(name, 0, 1, 0)
        {

        }

        public override void InitializeConditions(double[] x)
        {
            Data.Clear();
        }

        public override void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {
            Data.Add((t, u[0]));
        }
    }
}
