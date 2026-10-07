using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SFunctionContinuous.Framework;
using SFunctionContinuous.Framework.Blocks;
using SFunctionContinuous.Framework.Solvers;

namespace SimulationTests
{
    [TestClass]
    public class ClosedLoopMotorTests
    {
        [TestMethod]
        public void Test_ClosedLoopMotor_ParameterConsistency()
        {
            var motor = new ClosedLoopMotorBlock();

            // Default-Werte prüfen
            Assert.AreEqual(2.5, motor.Km, 1e-9, "Default Km should be 2.5");
            Assert.AreEqual(0.05, motor.Tm, 1e-9, "Default Tm should be 0.05 s");
            Assert.AreEqual(0.01, motor.J, 1e-9, "Default J should be 0.01 kg*m^2");
            Assert.AreEqual(15.0, motor.Kp, 1e-9, "Default Kp should be 15.0");
            Assert.AreEqual(40.0, motor.Ki, 1e-9, "Default Ki should be 40.0");
            Assert.AreEqual(0.5, motor.Kd, 1e-9, "Default Kd should be 0.5");
            Assert.AreEqual(10.0, motor.UMax, 1e-9, "Default UMax should be 10.0 V");
            Assert.AreEqual(1.0, motor.TargetPosition, 1e-9, "Default TargetPosition should be 1.0 rad");
            Assert.IsTrue(motor.EnableAntiWindup, "Anti-Windup should be enabled by default");

            // Überprüfung der Zeitkonstanten Ti = Kp / Ki und Td = Kd / Kp
            Assert.AreEqual(15.0 / 40.0, motor.Ti, 1e-9, "Ti = Kp / Ki");
            Assert.AreEqual(0.5 / 15.0, motor.Td, 1e-9, "Td = Kd / Kp");

            // Modifikation über Ti
            motor.Ti = 0.5;
            Assert.AreEqual(15.0 / 0.5, motor.Ki, 1e-9, "Ki should update when Ti changes");

            // Modifikation über Td
            motor.Td = 0.1;
            Assert.AreEqual(15.0 * 0.1, motor.Kd, 1e-9, "Kd should update when Td changes");

            // Validierungsfehler bei unphysikalischen Werten
            Assert.ThrowsException<ArgumentOutOfRangeException>(() => motor.Tm = -0.01);
            Assert.ThrowsException<ArgumentOutOfRangeException>(() => motor.Tm = 0.0);
            Assert.ThrowsException<ArgumentOutOfRangeException>(() => motor.J = 0.0);
            Assert.ThrowsException<ArgumentOutOfRangeException>(() => motor.Ti = 0.0);
            Assert.ThrowsException<ArgumentOutOfRangeException>(() => motor.Td = -1.0);
            Assert.ThrowsException<ArgumentOutOfRangeException>(() => motor.UMax = -5.0);
        }

        [TestMethod]
        public void Test_ClosedLoopMotor_Sollwertfolge_SteadyStateConvergence()
        {
            var model = new Model();
            var motor = new ClosedLoopMotorBlock
            {
                TargetPosition = 1.5, // Sollwertsprung auf 1.5 rad
                EnableAntiWindup = true
            };
            model.AddBlock(motor);

            var solver = new RungeKutta4Solver(model);
            double dt = 0.001; // 1 ms
            double tMax = 2.0;  // 2.0 Sekunden

            solver.Solve(dt, tMax);

            double finalTheta = solver.ContinuousStates[motor][0];
            double finalOmega = solver.ContinuousStates[motor][1];
            double finalXi = solver.ContinuousStates[motor][2];

            // 1. Endlage muss exakt dem Sollwert entsprechen (I-Anteil eliminiert stationären Regelfehler)
            Assert.AreEqual(1.5, finalTheta, 0.005, "Position theta must converge to target position 1.5 rad");

            // 2. Drehzahl muss im Stillstand sein
            Assert.AreEqual(0.0, finalOmega, 0.01, "Speed omega must converge to 0 rad/s");

            // 3. Integrator-Zustand muss endlich und nicht-NaN sein
            Assert.IsFalse(double.IsNaN(finalXi), "Integrator state must not be NaN");
            Assert.IsFalse(double.IsInfinity(finalXi), "Integrator state must not be Infinity");
        }

        [TestMethod]
        public void Test_ClosedLoopMotor_AntiWindup_ReducesOvershootAndClampsIntegrator()
        {
            // Bei einem großen Sollwertsprung (z.B. w = 3.0 rad) geht der Regler massiv in die Stellgrößensättigung (10 V).
            // Mit Anti-Windup (Clamping) darf die Integratorladung während der Sättigung nicht unkontrolliert wachsen,
            // wodurch das Überschwingen drastisch reduziert wird.

            double target = 3.0;
            double dt = 0.001;
            double tMax = 2.0;

            // --- Fall A: MIT Anti-Windup ---
            var modelWithAW = new Model();
            var motorWithAW = new ClosedLoopMotorBlock
            {
                TargetPosition = target,
                EnableAntiWindup = true
            };
            modelWithAW.AddBlock(motorWithAW);

            double maxThetaWithAW = 0.0;
            double maxXiWithAW = 0.0;

            // Schrittweise Simulation für Trajektorienauswertung
            SimulateAndTrack(modelWithAW, motorWithAW, dt, tMax, out maxThetaWithAW, out maxXiWithAW, out double finalThetaWithAW);

            // --- Fall B: OHNE Anti-Windup ---
            var modelNoAW = new Model();
            var motorNoAW = new ClosedLoopMotorBlock
            {
                TargetPosition = target,
                EnableAntiWindup = false
            };
            modelNoAW.AddBlock(motorNoAW);

            SimulateAndTrack(modelNoAW, motorNoAW, dt, tMax, out double maxThetaNoAW, out double maxXiNoAW, out double finalThetaNoAW);

            // 1. Beide Varianten konvergieren stationär auf das Ziel
            Assert.AreEqual(target, finalThetaWithAW, 0.01, "Mit Anti-Windup wird das Ziel erreicht");
            Assert.AreEqual(target, finalThetaNoAW, 0.01, "Ohne Anti-Windup wird das Ziel erreicht");

            // 2. Anti-Windup verhindert das Überladen des Integrators:
            // Ohne Clamping akkumuliert der Integrator viel mehr Ladung.
            Assert.IsTrue(maxXiWithAW < maxXiNoAW,
                $"Max Xi mit Anti-Windup ({maxXiWithAW:F3}) muss kleiner sein als ohne Anti-Windup ({maxXiNoAW:F3})");

            // 3. Überschwingen:
            double overshootWithAW = Math.Max(0.0, maxThetaWithAW - target);
            double overshootNoAW = Math.Max(0.0, maxThetaNoAW - target);

            Assert.IsTrue(overshootWithAW < overshootNoAW,
                $"Überschwingen mit Anti-Windup ({overshootWithAW:F3} rad) muss geringer sein als ohne ({overshootNoAW:F3} rad)");
        }

        [TestMethod]
        public void Test_ClosedLoopMotor_EulerExplicitSolver_Convergence()
        {
            var model = new Model();
            var motor = new ClosedLoopMotorBlock
            {
                TargetPosition = 1.0,
                EnableAntiWindup = true
            };
            model.AddBlock(motor);

            var solver = new EulerExplicitSolver(model);
            double dt = 0.0005; // 0.5 ms Zeitschritt für Euler
            double tMax = 1.5;

            solver.Solve(dt, tMax);

            double theta = solver.ContinuousStates[motor][0];
            double omega = solver.ContinuousStates[motor][1];

            Assert.AreEqual(1.0, theta, 0.01, "EulerExplicitSolver must converge to target position");
            Assert.AreEqual(0.0, omega, 0.01, "EulerExplicitSolver must settle speed to zero");
        }

        [TestMethod]
        public void Test_ClosedLoopMotor_ExternalInputAndRecordOutput()
        {
            var model = new Model();
            var setpoint = new ConstantBlock("Setpoint", 2.0);
            var motor = new ClosedLoopMotorBlock("Motor");
            var recordTheta = new RecordBlock("RecordTheta");
            var recordU = new RecordBlock("RecordU");

            model.AddBlock(setpoint);
            model.AddBlock(motor);
            model.AddBlock(recordTheta);
            model.AddBlock(recordU);

            // Setpoint -> Motor.TargetPosition
            model.AddConnection(setpoint, 0, motor, 0);
            // Motor.Theta -> RecordTheta
            model.AddConnection(motor, 0, recordTheta, 0);
            // Motor.U -> RecordU
            model.AddConnection(motor, 2, recordU, 0);

            var solver = new RungeKutta4Solver(model);
            solver.Solve(0.001, 1.5);

            Assert.IsTrue(recordTheta.Data.Count > 100, "RecordBlock should collect time steps");
            double lastRecordedTheta = recordTheta.Data[^1].Item2;
            Assert.AreEqual(2.0, lastRecordedTheta, 0.01, "Recorded theta must track external setpoint 2.0");

            // Motorspannung muss in [-UMax, +UMax] bleiben
            foreach (var (_, u) in recordU.Data)
            {
                Assert.IsTrue(u >= -motor.UMax - 1e-6 && u <= motor.UMax + 1e-6,
                    $"Voltage {u} must respect saturation limit +/- {motor.UMax}");
            }
        }

        private static void SimulateAndTrack(
            Model model,
            ClosedLoopMotorBlock motor,
            double dt,
            double tMax,
            out double maxTheta,
            out double maxXi,
            out double finalTheta)
        {
            var recTheta = new RecordBlock("RecTheta");
            var recXi = new RecordBlock("RecXi");
            model.AddBlock(recTheta);
            model.AddBlock(recXi);

            model.AddConnection(motor, 0, recTheta, 0);
            model.AddConnection(motor, 4, recXi, 0);

            var solver = new RungeKutta4Solver(model);
            maxTheta = double.MinValue;
            maxXi = double.MinValue;

            solver.Solve(dt, tMax);

            finalTheta = solver.ContinuousStates[motor][0];

            foreach (var (_, val) in recTheta.Data)
            {
                if (val > maxTheta) maxTheta = val;
            }

            foreach (var (_, val) in recXi.Data)
            {
                if (val > maxXi) maxXi = val;
            }
        }
    }
}
