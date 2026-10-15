using System;
using HybridZeroCrossing.Hybrid;
using HybridZeroCrossing.ZeroCrossing;

namespace HybridZeroCrossing.Models
{
    /// <summary>
    /// Bouncing-Ball-Modell mit elastisch-plastischem Bodenkontakt und Zeno-Schutz.
    /// Zustandsvektor: x[0] = y (Höhe des Ballmittelpunkts in m), x[1] = v (Vertikalgeschwindigkeit in m/s).
    /// </summary>
    public class BouncingContactModel : IHybridSystem
    {
        public double Mass { get; set; } = 1.0;                  // [kg]
        public double Gravity { get; set; } = 9.81;              // [m/s^2]
        public double Radius { get; set; } = 0.1;                // [m]
        public double Restitution { get; set; } = 0.8;           // Stoßzahl e in [0, 1]
        public double VStick { get; set; } = 0.05;               // Haft-/Sticking-Schwellwert [m/s] gegen Zeno-Kollaps

        public int Dimension => 2;
        public ContactState State { get; set; } = ContactState.FreeFlight;

        public int BounceCount { get; private set; } = 0;
        public double MaxPenetration { get; private set; } = 0.0;      // [m] für Aufgabe A1
        public double LastEnergyRatio { get; private set; } = 0.0;     // E_nach / E_vor beim letzten Stoß

        public void Reset(double initialHeight = 5.0, double initialVelocity = 0.0)
        {
            State = ContactState.FreeFlight;
            BounceCount = 0;
            MaxPenetration = 0.0;
            LastEnergyRatio = 0.0;
        }

        /// <summary>
        /// Übt einen vertikalen Stoßimpuls (z. B. Flipperfinger / Pneumatik-Losbrechen) auf den Ball aus.
        /// </summary>
        public void ApplyVerticalImpulse(ref double[] x, double deltaV)
        {
            // TODO [Aufgabe A2]:
            // 1. Addieren Sie `deltaV` auf die Vertikalgeschwindigkeit `x[1]`.
            // 2. Falls sich das System bereits im Zeno-Ruhezustand (`State == ContactState.RestingOnGround`)
            //    befindet und `x[1] > VStick` gilt, schalten Sie den Automaten wieder in `ContactState.FreeFlight`!
            x[1] += deltaV;
        }

        public double[] ComputeDerivatives(double t, double[] x)
        {
            if (State == ContactState.RestingOnGround)
            {
                // Liegt stabil am Boden: dy/dt = 0, dv/dt = 0
                return new double[] { 0.0, 0.0 };
            }

            double v = x[1];
            double dy_dt = v;
            double dv_dt = -Gravity;

            return new double[] { dy_dt, dv_dt };
        }

        /// <summary>
        /// Zero-Crossing Indikatorfunktion z(y) = y - R.
        /// z > 0: Freier Flug
        /// z = 0: Exakte Kontaktoberfläche
        /// z &lt; 0: Unphysikalische Wandpenetration
        /// </summary>
        public double ZeroCrossingIndicator(double[] x)
        {
            return x[0] - Radius;
        }

        /// <summary>
        /// Diskreter Reset am Schaltpunkt t*:
        /// v^+ = -e * v^-
        /// Verhindert Zeno-Kollaps bei |v| &lt; v_stick.
        /// </summary>
        public bool ApplyDiscreteReset(ref double[] x)
        {
            BounceCount++;
            double penetration = Math.Max(0.0, Radius - x[0]);
            if (penetration > MaxPenetration) MaxPenetration = penetration;

            double eBefore = ComputeTotalEnergy(x);
            x[0] = Radius; // Exakt auf Kontaktfläche positionieren

            double vBefore = x[1];
            if (Math.Abs(vBefore) < VStick)
            {
                // Zeno-Schutz: Umschalten auf Ruhezustand am Boden
                x[1] = 0.0;
                State = ContactState.RestingOnGround;
                LastEnergyRatio = 0.0;
                return true;
            }

            // Elastischer Rückstoß: v^+ = -e * v^-
            x[1] = -Restitution * vBefore;
            double eAfter = ComputeTotalEnergy(x);
            LastEnergyRatio = eBefore > 1e-9 ? eAfter / eBefore : 0.0;
            return false;
        }

        /// <summary>
        /// Berechnet die mechanische Gesamtenergie: E_tot = m*g*(y - R) + 0.5*m*v^2.
        /// </summary>
        public double ComputeTotalEnergy(double[] x)
        {
            double hEff = Math.Max(0.0, x[0] - Radius);
            double ePot = Mass * Gravity * hEff;
            double eKin = 0.5 * Mass * x[1] * x[1];
            return ePot + eKin;
        }

        /// <summary>
        /// Führt einen vollen hybriden Simulationsschritt mit Bisektions-Zero-Crossing durch.
        /// </summary>
        public double[] StepWithBisection(double t, double[] x, double h, out bool bounced)
        {
            bounced = false;
            if (State == ContactState.RestingOnGround)
            {
                return new double[] { Radius, 0.0 };
            }

            // 1. Probeschnitt ausführen
            double[] xNextCandidate = BisectionRootFinder.IntegrateSubstep(this, t, x, h);
            double zStart = ZeroCrossingIndicator(x);
            double zNext = ZeroCrossingIndicator(xNextCandidate);

            // 2. Prüfen auf Kontakt / Zero-Crossing bei Abwärtsbewegung
            if (zNext <= 0.0 && x[1] <= 0.0)
            {
                if (zStart <= 1e-7)
                {
                    // Liegt bereits auf/unter Kontaktschwelle
                    ApplyDiscreteReset(ref x);
                    bounced = true;
                    if (State == ContactState.RestingOnGround) return x;
                    return BisectionRootFinder.IntegrateSubstep(this, t, x, h);
                }

                // Zero-Crossing im Intervall detektiert -> Bisektion aufrufen
                var root = BisectionRootFinder.FindRoot(this, t, x, h);
                bounced = true;

                if (State == ContactState.RestingOnGround)
                {
                    return root.StateAfterReset;
                }

                // 3. Restzeitschritt nach dem Stoß fortsetzen
                if (root.RemainingStep > 1e-9)
                {
                    return BisectionRootFinder.IntegrateSubstep(this, root.ImpactTime, root.StateAfterReset, root.RemainingStep);
                }

                return root.StateAfterReset;
            }

            return xNextCandidate;
        }

        /// <summary>
        /// Führt einen naiven Festschritt ohne Wurzelsuche durch (Vergleichsverfahren).
        /// </summary>
        public double[] StepNaive(double t, double[] x, double h, out double penetration, out bool bounced)
        {
            penetration = 0.0;
            bounced = false;

            if (State == ContactState.RestingOnGround)
            {
                return new double[] { Radius, 0.0 };
            }

            double[] xNext = BisectionRootFinder.IntegrateSubstep(this, t, x, h);

            if (xNext[0] <= Radius)
            {
                penetration = Radius - xNext[0];
                bounced = true;

                // TODO [Aufgabe A1]:
                // 1. Zählen Sie `BounceCount++` auch im naiven Modus hoch!
                // 2. Speichern Sie die maximale Bodenpenetration: `if (penetration > MaxPenetration) MaxPenetration = penetration;`
                // 3. Berechnen Sie vor dem Schritt `double eBefore = ComputeTotalEnergy(x);` und nach der Geschwindigkeitsumkehr
                //    `double eAfter = ComputeTotalEnergy(xNext);` und aktualisieren Sie `LastEnergyRatio = eAfter / eBefore;`
                //    (damit der unphysikalische Energiefehler durch die zusätzliche Falltiefe unter dem Boden sichtbar wird)!

                if (Math.Abs(xNext[1]) < VStick)
                {
                    xNext[0] = Radius;
                    xNext[1] = 0.0;
                    State = ContactState.RestingOnGround;
                }
                else
                {
                    xNext[1] = -Restitution * xNext[1]; // Stoß auf penetriertem Niveau!
                }
            }

            return xNext;
        }

        /// <summary>
        /// Berechnet die theoretische Zeno-Grenzzeit t_inf bis zum vollständigen Stillstand:
        /// t_0 = sqrt(2 * (h_0 - R) / g)
        /// t_inf = t_0 * (1 + e) / (1 - e)
        /// </summary>
        public static double TheoreticalZenoLimitTime(double h0, double r, double g, double e)
        {
            double deltaH = h0 - r;
            if (deltaH <= 0) return 0.0;
            double t0 = Math.Sqrt(2.0 * deltaH / g);
            return t0 * (1.0 + e) / (1.0 - e);
        }
    }
}
