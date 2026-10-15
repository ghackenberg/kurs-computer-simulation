using System;
using System.Threading;
using System.Threading.Tasks;

namespace MultithreadingBenchmark.Simulation
{
    /// <summary>
    /// Repräsentiert ein 2D-Partikel mit Position und Geschwindigkeit.
    /// Als kompakter Werttyp (Struct) optimiert für Cache-Lokalität.
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
    /// Physikalisches Modell: Zentralfeld-Attraktor bei (AttractorX, AttractorY) mit Euler-Cromer-Integration.
    /// </summary>
    public class ParticleField
    {
        public Particle[] Particles { get; private set; }
        public int Count => Particles.Length;

        // Attraktor-Parameter (Standard im Ursprung (0,0) für deterministische Benchmarks; im UI verschiebbar)
        public double AttractorX { get; set; } = 0.0;
        public double AttractorY { get; set; } = 0.0;
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
                AttractorX = this.AttractorX,
                AttractorY = this.AttractorY,
                Mu = this.Mu,
                Epsilon = this.Epsilon
            };
            Array.Copy(this.Particles, copy.Particles, Count);
            return copy;
        }

        /// <summary>
        /// Sequentieller Integrationsschritt (Single-Threaded).
        /// Euler-Cromer:
        /// r_i = sqrt(dx^2 + dy^2 + eps^2)
        /// a_x = -mu * dx / r^3, a_y = -mu * dy / r^3
        /// v_new = v + dt * a,   x_new = x + dt * v_new
        /// </summary>
        public void StepSequential(double dt, CancellationToken cancellationToken = default)
        {
            double epsSquared = Epsilon * Epsilon;
            double attX = AttractorX;
            double attY = AttractorY;

            for (int i = 0; i < Particles.Length; i++)
            {
                if ((i & 4095) == 0)
                {
                    cancellationToken.ThrowIfCancellationRequested();
                }

                double dx = Particles[i].X - attX;
                double dy = Particles[i].Y - attY;

                double rSquared = dx * dx + dy * dy + epsSquared;
                double r = Math.Sqrt(rSquared);
                double rCubed = rSquared * r;

                double ax = -Mu * dx / rCubed;
                double ay = -Mu * dy / rCubed;

                // Euler-Cromer
                double nvx = Particles[i].Vx + dt * ax;
                double nvy = Particles[i].Vy + dt * ay;
                double npx = Particles[i].X + dt * nvx;
                double npy = Particles[i].Y + dt * nvy;

                Particles[i].Vx = nvx;
                Particles[i].Vy = nvy;
                Particles[i].X = npx;
                Particles[i].Y = npy;
            }
        }

        /// <summary>
        /// Paralleler Integrationsschritt mittels Task Parallel Library (Parallel.For).
        /// Jeder Thread bearbeitet disjunkte Indizes - keine Race Conditions auf Particles[i].
        /// </summary>
        public void StepParallel(double dt, int maxDegreeOfParallelism = -1, CancellationToken cancellationToken = default)
        {
            var options = new ParallelOptions
            {
                CancellationToken = cancellationToken
            };
            if (maxDegreeOfParallelism > 0)
            {
                options.MaxDegreeOfParallelism = maxDegreeOfParallelism;
            }

            double epsSquared = Epsilon * Epsilon;
            double attX = AttractorX;
            double attY = AttractorY;

            Parallel.For(0, Particles.Length, options, i =>
            {
                double dx = Particles[i].X - attX;
                double dy = Particles[i].Y - attY;

                double rSquared = dx * dx + dy * dy + epsSquared;
                double r = Math.Sqrt(rSquared);
                double rCubed = rSquared * r;

                double ax = -Mu * dx / rCubed;
                double ay = -Mu * dy / rCubed;

                double nvx = Particles[i].Vx + dt * ax;
                double nvy = Particles[i].Vy + dt * ay;
                double npx = Particles[i].X + dt * nvx;
                double npy = Particles[i].Y + dt * nvy;

                Particles[i].Vx = nvx;
                Particles[i].Vy = nvy;
                Particles[i].X = npx;
                Particles[i].Y = npy;
            });
        }

        /// <summary>
        /// Zeichnet das aktuelle Partikelfeld als 2D-Dichte-/Geschwindigkeits-Rasterbild in einen BGRA32-Pixelpuffer.
        /// </summary>
        public void RenderToPixelBuffer(uint[] pixelBuffer, int width, int height)
        {
            Array.Fill(pixelBuffer, 0xFF0E1117u); // Dunkler Hintergrund

            double scaleX = (width - 1) / 1000.0;
            double scaleY = (height - 1) / 1000.0;

            // Partikel einzeichnen (Farbe abhängig von Geschwindigkeit)
            for (int i = 0; i < Particles.Length; i++)
            {
                int px = (int)(Particles[i].X * scaleX);
                int py = (int)(Particles[i].Y * scaleY);

                if ((uint)px < (uint)width && (uint)py < (uint)height)
                {
                    double speed = Math.Sqrt(Particles[i].Vx * Particles[i].Vx + Particles[i].Vy * Particles[i].Vy);
                    uint color = speed > 15.0 ? 0xFFFFB74Du : (speed > 8.0 ? 0xFF4FC3F7u : 0xFF29B6F6u);
                    pixelBuffer[py * width + px] = color;
                }
            }

            // Attraktor-Zentrum als rotes Fadenkreuz markieren
            int ax = (int)Math.Clamp(AttractorX * scaleX, 3, width - 4);
            int ay = (int)Math.Clamp(AttractorY * scaleY, 3, height - 4);
            for (int d = -3; d <= 3; d++)
            {
                pixelBuffer[ay * width + (ax + d)] = 0xFFFF5252u;
                pixelBuffer[(ay + d) * width + ax] = 0xFFFF5252u;
            }
        }

        // ====================================================================
        // STUFE B: Erweiterungspfade (Wahlmodell Track A oder Track B)
        // ====================================================================

        // TODO [Track A - Industrie: Parallele Monte-Carlo-Toleranzanalyse in WPF]:
        // - Simulieren Sie N = 10.000.000 Bauteil-Kombinationen S = L1 - (L2 + L3 + L4).
        // - Nutzen Sie Random.Shared oder ThreadLocal<Random> (NIEMALS gemeinsames Random ohne Lock!).
        // - Nutzen Sie thread-lokale Zähler und Interlocked.Add für die Ausschussquote und Histogramm-Bins.
        // - Melden Sie den Fortschritt via IProgress<T> an die WPF-ProgressBar und unterstützen Sie CancellationToken!

        // TODO [Track B - Simulation Game: Boids & Zombie-Horde in WPF]:
        // - Simulieren Sie 50.000 - 100.000 autonome Agenten mit Nachbarschafts-Abstoßung und Zielverfolgung.
        // - Verwenden Sie striktes Double-Buffering (StateCurrent[] -> StateNext[]), um Race Conditions zu verhindern.
        // - Vergleichen Sie im reaktiven WPF-Dashboard live die Framerate (FPS) zwischen Single-Thread und Parallel.For!
    }
}
