using SFunctionHybrid.Framework.Blocks;

namespace SFunctionHybrid.Framework.Examples
{
    /// <summary>
    /// This example demonstrates the use of a block with a variable sample time.
    /// A VariableSampleTimeBlock is used, and its sample time delta is
    /// controlled by the output of an integrator, resulting in sample hits
    /// that are spaced further and further apart.
    /// </summary>
    public class VariableSampleTimeExample : Example
    {
        public VariableSampleTimeExample() : base(0.01, 5.0) // Smaller timestep for integrator accuracy
        {
            // --- BLOCKS ---

            // This block will provide the variable delta T for the sample time.
            // We use an integrator to create a linearly increasing signal.
            var integrator = new IntegrateBlock("Integrator", 0.2); // Start with a delta of 0.2s
            var constSlope = new ConstantBlock("Slope", 0.1); // The deltaT will increase by 0.1s per second

            // The block that has a variable sample time.
            var variableSampler = new VariableSampleTimeBlock("VariableSampler", 0.2); // First hit at t=0.2

            // --- RECORDERS ---
            var hitTimeRecorder = new RecordBlock("HitTimes");
            var deltaTimeRecorder = new RecordBlock("DeltaTimes");

            // --- MODEL ---
            Model.AddBlock(constSlope);
            Model.AddBlock(integrator);
            Model.AddBlock(variableSampler);
            Model.AddBlock(hitTimeRecorder);
            Model.AddBlock(deltaTimeRecorder);

            // --- CONNECTIONS ---

            // The output of the integrator determines the next sample time delta.
            Model.AddConnection(constSlope, 0, integrator, 0);
            Model.AddConnection(integrator, 0, variableSampler, 0);

            // Record the results for plotting.
            Model.AddConnection(integrator, 0, deltaTimeRecorder, 0); // Record the delta T signal
            Model.AddConnection(variableSampler, 0, hitTimeRecorder, 0); // Record the output, which is the sequence of hit times.
        }
    }
}
