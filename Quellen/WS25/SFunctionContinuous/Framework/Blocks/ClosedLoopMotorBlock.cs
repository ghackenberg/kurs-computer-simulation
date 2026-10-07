using System;
using SFunctionContinuous.Framework.Declarations;

namespace SFunctionContinuous.Framework.Blocks
{
    /// <summary>
    /// Repräsentiert ein mechatronisches Closed-Loop-Modell eines permanenterregten DC-Servomotors
    /// mit kontinuierlichem PID-Positionsregler, Stellgrößenbegrenzung (Sättigung) und dynamischem
    /// Anti-Windup (Clamping).
    /// Zustandsvektor: x = [theta, omega, x_I]^T
    ///  - theta: Rotorposition [rad]
    ///  - omega: Winkelgeschwindigkeit / Drehzahl [rad/s]
    ///  - x_I:   Integratorzustand des PID-Reglers [V]
    /// </summary>
    public class ClosedLoopMotorBlock : Block
    {
        private double _tm = 0.05;
        private double _km = 2.5;
        private double _j = 0.01;
        private double _kp = 15.0;
        private double _ki = 40.0;
        private double _kd = 0.5;
        private double _uMax = 10.0;

        /// <summary>
        /// Motorkonstante / Übertragungsbeiwert Km [rad/(s*V)].
        /// </summary>
        public double Km
        {
            get => _km;
            set => _km = value;
        }

        /// <summary>
        /// Mechanische Antriebszeitkonstante Tm [s].
        /// </summary>
        public double Tm
        {
            get => _tm;
            set
            {
                if (value <= 0.0)
                    throw new ArgumentOutOfRangeException(nameof(value), "Tm muss positiv sein.");
                _tm = value;
            }
        }

        /// <summary>
        /// Massenträgheitsmoment des Rotors und der angekoppelten Last J [kg*m^2].
        /// </summary>
        public double J
        {
            get => _j;
            set
            {
                if (value <= 0.0)
                    throw new ArgumentOutOfRangeException(nameof(value), "J muss positiv sein.");
                _j = value;
            }
        }

        /// <summary>
        /// Proportionalbeiwert Kp des Reglers.
        /// </summary>
        public double Kp
        {
            get => _kp;
            set => _kp = value;
        }

        /// <summary>
        /// Integralbeiwert Ki = Kp / Ti des Reglers [1/s].
        /// </summary>
        public double Ki
        {
            get => _ki;
            set => _ki = value;
        }

        /// <summary>
        /// Differenzialbeiwert Kd = Kp * Td des Reglers [s].
        /// </summary>
        public double Kd
        {
            get => _kd;
            set => _kd = value;
        }

        /// <summary>
        /// Nachstellzeit Ti [s] (integrale Zeitkonstante des PID-Reglers).
        /// Ti = Kp / Ki.
        /// </summary>
        public double Ti
        {
            get => _ki > 0.0 ? _kp / _ki : double.PositiveInfinity;
            set
            {
                if (value <= 0.0)
                    throw new ArgumentOutOfRangeException(nameof(value), "Ti muss positiv sein.");
                _ki = _kp / value;
            }
        }

        /// <summary>
        /// Vorhaltezeit Td [s] (differenzierende Zeitkonstante des PID-Reglers).
        /// Td = Kd / Kp.
        /// </summary>
        public double Td
        {
            get => _kp > 0.0 ? _kd / _kp : 0.0;
            set
            {
                if (value < 0.0)
                    throw new ArgumentOutOfRangeException(nameof(value), "Td darf nicht negativ sein.");
                _kd = _kp * value;
            }
        }

        /// <summary>
        /// Maximale Motorspannung / Stellgrößenbegrenzung Umax [V] (z.B. +/- 10 V).
        /// </summary>
        public double UMax
        {
            get => _uMax;
            set
            {
                if (value <= 0.0)
                    throw new ArgumentOutOfRangeException(nameof(value), "UMax muss positiv sein.");
                _uMax = value;
            }
        }

        /// <summary>
        /// Statischer Sollwert der Position [rad], falls kein externer Block am Eingang anliegt.
        /// </summary>
        public double TargetPosition { get; set; } = 1.0;

        /// <summary>
        /// Aktiviert oder deaktiviert das dynamische Anti-Windup Clamping.
        /// </summary>
        public bool EnableAntiWindup { get; set; } = true;

        /// <summary>
        /// Anfangswert für die Position [rad].
        /// </summary>
        public double InitialPosition { get; set; } = 0.0;

        /// <summary>
        /// Anfangswert für die Drehzahl [rad/s].
        /// </summary>
        public double InitialSpeed { get; set; } = 0.0;

        /// <summary>
        /// Anfangswert für den Integrator-Zustand [V].
        /// </summary>
        public double InitialXi { get; set; } = 0.0;

        /// <summary>
        /// Erstellt eine neue Instanz des geschlossenen DC-Motor-Regelkreisblocks.
        /// </summary>
        /// <param name="name">Name des Funktionsblocks.</param>
        public ClosedLoopMotorBlock(string name = "ClosedLoopMotor") : base(name)
        {
            // Zustände: theta (0), omega (1), x_I (2)
            ContinuousStates.Add(new StateDeclaration("Theta"));
            ContinuousStates.Add(new StateDeclaration("Omega"));
            ContinuousStates.Add(new StateDeclaration("Xi"));

            // Optionaler Eingang: Externe Sollwert-Vorgabe (w)
            Inputs.Add(new InputDeclaration("TargetPosition", false));

            // Ausgänge:
            // 0: Ist-Position theta [rad]
            // 1: Ist-Drehzahl omega [rad/s]
            // 2: Motorspannung u_sat [V]
            // 3: Regelfehler e [rad]
            // 4: Integratorzustand x_I [V]
            Outputs.Add(new OutputDeclaration("Theta"));
            Outputs.Add(new OutputDeclaration("Omega"));
            Outputs.Add(new OutputDeclaration("U"));
            Outputs.Add(new OutputDeclaration("Error"));
            Outputs.Add(new OutputDeclaration("Xi"));
        }

        public override void InitializeStates(double[] continuousStates)
        {
            continuousStates[0] = InitialPosition;
            continuousStates[1] = InitialSpeed;
            continuousStates[2] = InitialXi;
        }

        public override void CalculateDerivatives(double time, double[] continuousStates, double[] inputs, double[] derivatives)
        {
            double theta = continuousStates[0];
            double omega = continuousStates[1];
            double xI = continuousStates[2];

            double target = ConnectionsIn.Count > 0 ? inputs[0] : TargetPosition;
            double error = target - theta;

            // PID-Stellgröße mit Ableitung auf den Istwert (- Kd * omega) zur Vermeidung von D-Spitzen (Derivative Kick)
            double uRaw = _kp * error + xI - _kd * omega;
            double uSat = Math.Clamp(uRaw, -_uMax, _uMax);

            // Dynamisches Anti-Windup (Clamping):
            // Friere Integrator-Ableitung ein, wenn Stellgröße gesättigt ist und der Fehler die Übersteuerung vergrößern würde.
            double dXi;
            if (EnableAntiWindup)
            {
                bool isSaturated = Math.Abs(uRaw) >= _uMax;
                bool sameSign = (error * uRaw) > 0.0;
                dXi = (isSaturated && sameSign) ? 0.0 : _ki * error;
            }
            else
            {
                dXi = _ki * error;
            }

            // DGLs:
            // theta' = omega
            // omega' = -1/Tm * omega + Km/Tm * u_sat
            // x_I'   = dXi
            derivatives[0] = omega;
            derivatives[1] = (-1.0 / _tm) * omega + (_km / _tm) * uSat;
            derivatives[2] = dXi;
        }

        public override void CalculateOutputs(double time, double[] continuousStates, double[] inputs, double[] outputs)
        {
            double theta = continuousStates[0];
            double omega = continuousStates[1];
            double xI = continuousStates[2];

            double target = ConnectionsIn.Count > 0 ? inputs[0] : TargetPosition;
            double error = target - theta;
            double uRaw = _kp * error + xI - _kd * omega;
            double uSat = Math.Clamp(uRaw, -_uMax, _uMax);

            outputs[0] = theta;
            outputs[1] = omega;
            outputs[2] = uSat;
            outputs[3] = error;
            if (outputs.Length > 4) outputs[4] = xI;
        }

        public override string ToString()
        {
            return $"{Name}\n(Kp={_kp}, Ki={_ki}, Kd={_kd}, Tm={_tm}, Km={_km})";
        }
    }
}
