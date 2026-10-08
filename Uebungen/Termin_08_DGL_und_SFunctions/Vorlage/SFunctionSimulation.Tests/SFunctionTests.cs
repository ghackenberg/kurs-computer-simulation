using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SFunctionSimulation.Core;
using SFunctionSimulation.Models;
using SFunctionSimulation.Solvers;

namespace SFunctionSimulation.Tests
{
    /// <summary>
    /// Testmodell eines ungedämpften Feder-Masse-Schwingers zur Verifikation der Energieerhaltung mit RK4.
    /// m * x'' + c * x = 0
    /// x_1 = x (Auslenkung), x_2 = v (Geschwindigkeit)
    /// </summary>
    public class UndampedHarmonicOscillator : ISFunction
    {
        public double Mass { get; set; } = 2.0;       // [kg]
        public double Stiffness { get; set; } = 50.0;  // [N/m]

        public int StateDimension => 2;
        public int InputDimension => 0;
        public int OutputDimension => 2;

        public double[] ComputeDerivatives(double t, double[] x, double[] u)
        {
            double pos = x[0];
            double vel = x[1];

            double dpos_dt = vel;
            double dvel_dt = -(Stiffness / Mass) * pos;

            return new double[] { dpos_dt, dvel_dt };
        }

        public double[] ComputeOutputs(double t, double[] x, double[] u)
        {
            return (double[])x.Clone();
        }

        public double TotalEnergy(double[] x)
        {
            double pos = x[0];
            double vel = x[1];
            double eKin = 0.5 * Mass * vel * vel;
            double ePot = 0.5 * Stiffness * pos * pos;
            return eKin + ePot;
        }
    }

    [TestClass]
    public class SFunctionTests
    {
        [TestMethod]
        public void TestHarmonicOscillatorEnergyConservationRK4()
        {
            // Verifiziert, dass RK4 über 1000 Zeitschritte die Gesamtenergie eines Hamiltonschen Systems
            // (ungedämpfter Schwinger) mit extrem hoher Genauigkeit (< 1e-4 relativer Fehler) erhält.
            var oscillator = new UndampedHarmonicOscillator { Mass = 1.0, Stiffness = 100.0 };
            double[] x = new double[] { 1.5, 0.0 }; // Start: 1.5 m ausgelenkt, v = 0 m/s
            double[] u = Array.Empty<double>();

            double initialEnergy = oscillator.TotalEnergy(x);
            Assert.IsTrue(initialEnergy > 0.0);

            double dt = 0.01; // 10 ms
            int steps = 1000;  // 10 Sekunden Simulation

            for (int i = 0; i < steps; i++)
            {
                x = RungeKutta4Solver.Step(oscillator, i * dt, x, u, dt);
            }

            double finalEnergy = oscillator.TotalEnergy(x);
            double relError = Math.Abs(finalEnergy - initialEnergy) / initialEnergy;

            Assert.IsTrue(relError < 1e-4, 
                $"RK4 verletzt Energieerhaltung unzulässig stark: Rel. Fehler = {relError:E3}");
        }

        [TestMethod]
        public void TestDCMotorIdleSpeedSprintVerification()
        {
            // Stufe A In-Class Sprint:
            // U_A = 24 V, R_A = 2 Ohm, L_A = 0.05 H, Km = 0.1, Ke = 0.1, J = 0.005, d = 0.001
            // Analytisch: omega_inf = 200.0 rad/s
            var motor = new DCMotorWithAntiWindup
            {
                // Regler ausschalten für reinen Leerlaufsprung:
                Kp = 0, Ki = 0, Kd = 0,
                AntiWindupEnabled = false
            };

            // Eigene einfache S-Function für den reinen Motor aus Stufe A:
            double RA = motor.RA, LA = motor.LA, Km = motor.Km, Ke = motor.Ke, J = motor.J, D = motor.D;
            double uA = 24.0;
            double mLoad = 0.0;

            double expectedOmegaInf = DCMotorWithAntiWindup.TheoreticalIdleSpeed(uA, RA, LA, Km, Ke, D);
            Assert.AreEqual(200.0, expectedOmegaInf, 1e-9);

            // Simuliere mit RK4 bis stationärer Zustand erreicht ist (t = 8.0 s, ca. 10 * Tm)
            double dt = 0.001;
            int steps = 8000;
            double[] x = new double[3] { 0.0, 0.0, 0.0 }; // [iA, omega, theta]

            var sprintModel = new MotorSprintModel(RA, LA, Km, Ke, J, D);
            double[] u = new double[] { uA, mLoad };

            for (int i = 0; i < steps; i++)
            {
                x = RungeKutta4Solver.Step(sprintModel, i * dt, x, u, dt);
            }

            double simulatedOmega = x[1];
            double relDiff = Math.Abs(simulatedOmega - expectedOmegaInf) / expectedOmegaInf;

            // Stationäre Drehzahl weicht um weniger als 0.02% ab
            Assert.AreEqual(200.0, simulatedOmega, 0.1, "Stationäre Drehzahl weicht ab!");
            Assert.IsTrue(relDiff < 0.0002, $"Relativer Fehler {relDiff:P4} überschreitet Toleranz!");
        }

        [TestMethod]
        public void TestAntiWindupClampingHaltsIntegrator()
        {
            // Verifiziert, dass Anti-Windup Clamping bei blockiertem Motor (Sättigung uA = UMax)
            // das Anwachsen des I-Anteils stoppt.
            var motorClamped = new DCMotorWithAntiWindup { AntiWindupEnabled = true };
            var motorUnclamped = new DCMotorWithAntiWindup { AntiWindupEnabled = false };

            double[] xClamped = new double[4];
            double[] xUnclamped = new double[4];
            double[] u = new double[2] { 100.0, 100.0 }; // Unerreichbarer Sollwert + extremes Lastmoment => harte Dauersättigung

            double dt = 0.001;
            for (int i = 0; i < 2000; i++)
            {
                xClamped = RungeKutta4Solver.Step(motorClamped, i * dt, xClamped, u, dt);
                xUnclamped = RungeKutta4Solver.Step(motorUnclamped, i * dt, xUnclamped, u, dt);
            }

            // Mit Clamping darf xi nicht unbegrenzt explodieren
            double xiClamped = Math.Abs(xClamped[3]);
            double xiUnclamped = Math.Abs(xUnclamped[3]);

            Assert.IsTrue(xiUnclamped > xiClamped * 5.0, 
                $"Ohne Anti-Windup muss xi drastisch höher liegen: Unclamped={xiUnclamped}, Clamped={xiClamped}");
        }

        private class MotorSprintModel : ISFunction
        {
            private readonly double _ra, _la, _km, _ke, _j, _d;
            public MotorSprintModel(double ra, double la, double km, double ke, double j, double d)
            {
                _ra = ra; _la = la; _km = km; _ke = ke; _j = j; _d = d;
            }

            public int StateDimension => 3;
            public int InputDimension => 2;
            public int OutputDimension => 3;

            public double[] ComputeDerivatives(double t, double[] x, double[] u)
            {
                double iA = x[0], w = x[1];
                double uA = u[0], mLoad = u[1];

                double diA_dt = (uA - _ra * iA - _ke * w) / _la;
                double dw_dt = (_km * iA - _d * w - mLoad) / _j;
                double dtheta_dt = w;

                return new double[] { diA_dt, dw_dt, dtheta_dt };
            }

            public double[] ComputeOutputs(double t, double[] x, double[] u) => (double[])x.Clone();
        }
    }
}
