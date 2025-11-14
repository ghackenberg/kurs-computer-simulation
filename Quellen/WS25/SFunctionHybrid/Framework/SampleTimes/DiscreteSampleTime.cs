namespace SFunctionHybrid.Framework.SampleTimes
{
    public class DiscreteSampleTime : SampleTime
    {
        public double Offset { get; }
        public double Period { get; }

        public DiscreteSampleTime(double offset, double period)
        {
            Offset = offset;
            Period = period; 
        }
    }
}
