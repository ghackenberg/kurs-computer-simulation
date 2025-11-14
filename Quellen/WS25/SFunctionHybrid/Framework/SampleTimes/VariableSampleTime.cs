namespace SFunctionHybrid.Framework.SampleTimes
{
    public class VariableSampleTime : SampleTime
    {
        public double Offset { get; }

        public VariableSampleTime(double offset)
        {
            Offset = offset; 
        }
    }
}
