using SFunctionHybrid.Framework.Blocks;

namespace SFunctionHybrid.Framework.Examples
{
    /// <summary>
    /// This example demonstrates sampling a continuous signal using a VariableZeroOrderHoldBlock,
    /// where the sampling rate (delta T) itself changes over time.
    /// </summary>
    public class VariableZeroOrderHoldExample : Example
    {
        public VariableZeroOrderHoldExample() : base(0.01, 10.0) // Smaller timestep for continuous integrator, simulate for longer
        {
            // --- SIGNAL GENERATION ---
            // Continuous ramp signal: R = integrate(1) -> R(t) = t
            var constOne = new ConstantBlock("ConstantOne", 1.0);
            var rampIntegrator = new IntegrateBlock("RampIntegrator", 0.0); // Starts at 0, goes up to 10

            // --- VARIABLE SAMPLE TIME GENERATION ---
            // Delta T: linearly increasing from 0.1 to something larger
            var constSlopeForDeltaT = new ConstantBlock("SlopeForDeltaT", 0.05); // DeltaT increases by 0.05s per second
            var deltaTIntegrator = new IntegrateBlock("DeltaTIntegrator", 0.1); // Initial deltaT is 0.1s

            // --- VARIABLE ZERO-ORDER HOLD BLOCK ---
            var variableZOH = new VariableZeroOrderHoldBlock("VariableZOH", 0.0, 0.1); // Samples Ramp, initial output 0, first hit at t=0.1

            // --- RECORDERS ---
            var rampRecorder = new RecordBlock("RampSignal");
            var sampledRecorder = new RecordBlock("SampledSignal");
            var deltaTRecorder = new RecordBlock("DeltaTValue");

            // --- MODEL ---
            Model.AddBlock(constOne);
            Model.AddBlock(rampIntegrator);
            Model.AddBlock(constSlopeForDeltaT);
            Model.AddBlock(deltaTIntegrator);
            Model.AddBlock(variableZOH);
            Model.AddBlock(rampRecorder);
            Model.AddBlock(sampledRecorder);
            Model.AddBlock(deltaTRecorder);

            // --- CONNECTIONS ---

            // Generate the ramp signal (continuous input to ZOH)
            Model.AddConnection(constOne, 0, rampIntegrator, 0);
            Model.AddConnection(rampIntegrator, 0, variableZOH, 0); // Connect ramp to ZOH input U

            // Generate the variable delta T signal (second input to ZOH)
            Model.AddConnection(constSlopeForDeltaT, 0, deltaTIntegrator, 0);
            Model.AddConnection(deltaTIntegrator, 0, variableZOH, 1); // Connect deltaT to ZOH input NextDeltaT

            // Record signals for visualization
            Model.AddConnection(rampIntegrator, 0, rampRecorder, 0);
            Model.AddConnection(variableZOH, 0, sampledRecorder, 0);
            Model.AddConnection(deltaTIntegrator, 0, deltaTRecorder, 0);
        }
    }
}
