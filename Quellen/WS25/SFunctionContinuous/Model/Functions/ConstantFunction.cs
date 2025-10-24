namespace SFunctionContinuous.Model.Functions
{
    class ConstantFunction : Function
    {
        public double Value;

        public ConstantFunction(string name, double value) : base(name, 0, 0, 1)
        {
            Value = value;
        }

        public override void CalculateOutputs(double t, double[] x, double[] u, double[] y)
        {
            y[0] = Value;
        }

        public override string ToString()
        {
            return $"{Name}\n(Value = {Value})";
        }
    }
}
