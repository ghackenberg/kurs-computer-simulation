using System;
using System.Threading.Tasks;

namespace MultithreadingBenchmark.Simulation
{
    /// <summary>
    /// Repräsentiert ein 2D-Partikel mit Position und Geschwindigkeit.
    /// Als kompakter Werttyp (Struct) optimiert für Cache-Lokalität (64-Byte Cache Lines).
    /// </summary>
    public struct Particle
    {
        public double X;
        public double Y;
        public double Vx;
        public double Vy;

        public Particle(double x, double y, double vx, double vy)
        {
            X = x;
            Y = y;
            Vx = vx;
            Vy = vy;
        }
    }

    /// <summary>
    /// Verwaltet ein Feld von N Partikeln und führt sequentielle sowie parallele Kinetik-Updates durch.
    /// Physikalisches Modell: Zentralfeld-Attraktor im Ursprung (0,0) mit Euler-Cromer-Integration.
    /// </summary>
    public class ParticleField
    {
        public Particle[] Particles { get; private set; }
        public int Count => Particles.Length;

        // Attraktor-Parameter
        public double Mu { get; set; } = 50000.0;       // Gravitationsparameter
        public double Epsilon { get; set; } = 1.0;       // Glättungsparameter gegen Division durch Null

        public ParticleField(int count, int seed = 42)
        {
            Particles = new Particle[count];
            Initialize(seed);
        }

        /// <summary>
        /// Initialisiert die Partikel mit deterministischem Seed für reproduzierbare Benchmarks.
        /// </summary>
        public void Initialize(int seed = 42)
        {
            var rnd = new Random(seed);
            for (int i = 0; i < Particles.Length; i++)
            {
                // Position [0, 1000] x [0, 1000], Geschwindigkeit [-10, 10] m/s
                Particles[i] = new Particle(
                    x: rnd.NextDouble() * 1000.0,
                    y: rnd.NextDouble() * 1000.0,
                    vx: (rnd.NextDouble() * 20.0) - 10.0,
                    vy: (rnd.NextDouble() * 20.0) - 10.0
                );
            }
        }

        /// <summary>
        /// Klont das aktuelle Partikelfeld (tiefe Kopie des Werte-Arrays).
        /// </summary>
        public ParticleField Clone()
        {
            var copy = new ParticleField(Count)
            {
                Mu = this.Mu,
                Epsilon = this.Epsilon
            };
            Array.Copy(this.Particles, copy.Particles, Count);
            return copy;
        }

        /// <summary>
        /// STUFE A (In-Class Sprint): Sequentieller Integrationsschritt (Single-Threaded).
        /// Euler-Cromer:
        /// r_i = sqrt(x^2 + y^2 + eps^2)
        /// a_x = -mu * x / r^3
        /// a_y = -mu * y / r^3
        /// v_new = v + dt * a
        /// x_new = x + dt * v_new
        /// </summary>
        public void StepSequential(double dt)
        {
            double epsSquared = Epsilon * Epsilon;

            for (int i = 0; i < Particles.Length; i++)
            {
                double px = Particles[i].X;
                double py = Particles[i].Y;

                double rSquared = px * px + py * py + epsSquared;
                double r = Math.Sqrt(rSquared);
                double rCubed = rSquared * r;

                double ax = -Mu * px / rCubed;
                double ay = -Mu * py / rCubed;

                // Euler-Cromer
                double nvx = Particles[i].Vx + dt * ax;
                double nvy = Particles[i].Vy + dt * ay;
                double npx = px + dt * nvx;
                double npy = py + dt * nvy;

                Particles[i].Vx = nvx;
                Particles[i].Vy = nvy;
                Particles[i].X = npx;
                Particles[i].Y = npy;
            }
        }

        /// <summary>
        /// STUFE A (In-Class Sprint): Paralleler Integrationsschritt mittels Task Parallel Library (Parallel.For).
        /// Jeder Thread bearbeitet disjunkte Indizes - keine Race Conditions auf Particles[i].
        /// </summary>
        public void StepParallel(double dt, int maxDegreeOfParallelism = -1)
        {
            var options = new ParallelOptions();
            if (maxDegreeOfParallelism > 0)
            {
                options.MaxDegreeOfParallelism = maxDegreeOfParallelism;
            }

            double epsSquared = Epsilon * Epsilon;

            // TODO [Stufe A]: Analysieren Sie das Speicherzugriffsmuster:
            // Da Particles[i] nacheinander im Array liegen, profitieren benachbarte Threads 
            // von zusammenhängenden Chunks (Chunk Partitioning der TPL).
            Parallel.For(0, Particles.Length, options, i =>
            {
                double px = Particles[i].X;
                double py = Particles[i].Y;

                double rSquared = px * px + py * py + epsSquared;
                double r = Math.Sqrt(rSquared);
                double rCubed = rSquared * r;

                double ax = -Mu * px / rCubed;
                double ay = -Mu * py / rCubed;

                double nvx = Particles[i].Vx + dt * ax;
                double nvy = Particles[i].Vy + dt * ay;
                double npx = px + dt * nvx;
                double npy = py + dt * nvy;

                Particles[i].Vx = nvx;
                Particles[i].Vy = nvy;
                Particles[i].X = npx;
                Particles[i].Y = npy;
            });
        }

        // ====================================================================
        // STUFE B: Erweiterungspfade (Wahlmodell Track A oder Track B)
        // ====================================================================

        // TODO [Track A - Industrie]:
        // Parallele Monte-Carlo-Toleranzanalyse:
        // Simulieren Sie 10.000.000 Bauteilpaarungen mit Normal- und Gleichverteilung.
        // Verwenden Sie ThreadLocal<Random> oder Random.Shared, um Locking bei NextDouble() zu verhindern!
        // Nutzen Sie Interlocked.Increment zur Zählung der Schlechtteile (Ausschuss).

        // TODO [Track B - Simulation Game]:
        // Boids Flocking / Zombie-Horde:
        // Fügen Sie Interaktionskräfte zwischen benachbarten Partikeln hinzu (Flocking: Separation, Alignment, Cohesion).
        // Nutzen Sie räumliche Gitterzerlegung (Spatial Hash Grid), um O(N^2) auf O(N) zu reduzieren.
    }
}
