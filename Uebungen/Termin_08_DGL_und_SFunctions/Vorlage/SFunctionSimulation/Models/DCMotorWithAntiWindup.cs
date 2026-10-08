using System;
using SFunctionSimulation.Core;

namespace SFunctionSimulation.Models
{
    /// <summary>
    /// Modell eines fremderregten DC-Servomotors mit elektromechanischer Kopplung und PID-Lageregelung
    /// inklusive umschaltbarem Anti-Windup Clamping (Conditional Integration).
    /// 
    /// Zustandsvektor x (Dimension 4):
    ///   x[0] = i_A   (Ankerstrom in A)
    ///   x[1] = omega (Winkelgeschwindigkeit in rad/s)
    ///   x[2] = theta (Drehwinkel in rad)
    ///   x[3] = x_i   (I-Anteil des PID-Reglers)
    /// 
    /// Eingangsvektor u (Dimension 2):
    ///   u[0] = w     (Soll-Drehwinkel in rad)
    ///   u[1] = M_load(Störlastmoment in N*m)
    /// </summary>
    public class DCMotorWithAntiWindup : ISFunction
    {
        // Physikalische Motorparameter
        public double RA { get; set; } = 2.0;       // Ankerwiderstand [Ohm]
        public double LA { get; set; } = 0.05;      // Ankerinduktivitaet [H]
        public double Km { get; set; } = 0.1;       // Drehmomentkonstante [N*m/A]
        public double Ke { get; set; } = 0.1;       // Induktionskonstante [V*s/rad]
        public double J { get; set; } = 0.005;      // Massentraegheitsmoment [kg*m^2]
        public double D { get; set; } = 0.001;      // Viskose Reibung [N*m*s/rad]

        // PID-Reglerparameter
        public double Kp { get; set; } = 15.0;
        public double Ki { get; set; } = 25.0;
        public double Kd { get; set; } = 1.2;

        // Spannungsbegrenzung des Stellglieds
        public double UMin { get; set; } = -24.0;   // [V]
        public double UMax { get; set; } = +24.0;   // [V]

        // Flag zur Aktivierung von Anti-Windup Clamping
        public bool AntiWindupEnabled { get; set; } = true;

        public int StateDimension => 4;
        public int InputDimension => 2;
        public int OutputDimension => 6;

        /// <summary>
        /// Berechnet die Zeitableitungen dx/dt für den RK4-Integrator.
        /// </summary>
        public double[] ComputeDerivatives(double t, double[] x, double[] u)
        {
            double iA = x[0];
            double wMotor = x[1];
            double theta = x[2];
            double xi = x[3];

            double wTarget = u[0];
            double mLoad = u[1];

            // 1. Regelfehler und Ableitung (D-Anteil auf Regelfehler)
            double e = wTarget - theta;
            double eDot = -wMotor; // Da d(wTarget)/dt = 0 für stückweise konstanten Sollwert

            // 2. Ungesättigte Rohstellgröße
            double uRaw = Kp * e + Ki * xi + Kd * eDot;

            // 3. Sättigung (Aktorbegrenzung)
            double uA = Math.Clamp(uRaw, UMin, UMax);

            // 4. Anti-Windup Clamping Kriterium:
            // Sättigung aktiv: uRaw > UMax oder uRaw < UMin
            // Antrieb noch tiefer in die Sättigung: e * uRaw > 0
            bool isSaturated = (uRaw > UMax) || (uRaw < UMin);
            bool sameSign = (e * uRaw) > 0.0;

            double dxi_dt;
            if (AntiWindupEnabled && isSaturated && sameSign)
            {
                // Clamping: Integration des I-Anteils anhalten
                dxi_dt = 0.0;
            }
            else
            {
                // Standard-Integration
                dxi_dt = e;
            }

            // 5. Physikalische DGLs
            // Elektrisch: LA * d(iA)/dt = uA - RA * iA - Ke * omega
            double diA_dt = (uA - RA * iA - Ke * wMotor) / LA;

            // Mechanisch: J * d(omega)/dt = Km * iA - D * omega - M_load
            double dw_dt = (Km * iA - D * wMotor - mLoad) / J;

            // Kinematik: d(theta)/dt = omega
            double dtheta_dt = wMotor;

            return new double[] { diA_dt, dw_dt, dtheta_dt, dxi_dt };
        }

        /// <summary>
        /// Berechnet die Systemausgänge für Telemetrie und Visualisierung:
        /// y[0] = theta (rad)
        /// y[1] = omega (rad/s)
        /// y[2] = iA (A)
        /// y[3] = uA (V, gesättigt)
        /// y[4] = uRaw (V, ungesättigt)
        /// y[5] = xi (Integrator)
        /// </summary>
        public double[] ComputeOutputs(double t, double[] x, double[] u)
        {
            double iA = x[0];
            double wMotor = x[1];
            double theta = x[2];
            double xi = x[3];

            double wTarget = u[0];
            double e = wTarget - theta;
            double eDot = -wMotor;
            double uRaw = Kp * e + Ki * xi + Kd * eDot;
            double uA = Math.Clamp(uRaw, UMin, UMax);

            return new double[] { theta, wMotor, iA, uA, uRaw, xi };
        }

        /// <summary>
        /// Stationärer Endwert der Leerlaufdrehzahl bei konstantem Motorspannungssprung (ohne Regler):
        /// omega_inf = (Km * uA) / (RA * D + Km * Ke)
        /// </summary>
        public static double TheoreticalIdleSpeed(double uA, double RA, double LA, double Km, double Ke, double D)
        {
            return (Km * uA) / (RA * D + Km * Ke);
        }
    }
}
