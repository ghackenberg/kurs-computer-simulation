namespace SFunctionContinuous.Framework
{
    public abstract class Example
    {
        public Model Model { get; } = new Model();

        public double TimeStepMax { get; }
        public double TimeMax { get; }

        public Example(double timeStepMax = 0.1, double timeMax = 10)
        {
            TimeStepMax = timeStepMax;
            TimeMax = timeMax;
        }
    }
}
