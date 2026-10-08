# Aufgabenblatt Termin 06: Multithreading & Parallele Simulation (TPL)
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
### FH Oberösterreich – Campus Wels | Studiengang Automatisierungstechnik

---

| Metadaten | Details |
| :--- | :--- |
| **Lehrveranstaltungseinheit:** | Termin 06 (begleitend zu Kapitel 06: Multithreading & Parallele Simulation) |
| **Themenschwerpunkt:** | Task Parallel Library (TPL), `Parallel.For`, Cache-Lokalität & Speedup nach Amdahl |
| **Technologie-Stack:** | C# 12 / .NET 8/10, TPL, `System.Diagnostics.Stopwatch`, `System.Threading` |
| **Vorgreif-Sperre:** | **Erlaubt:** TPL, `Parallel.For`, `ParallelOptions`, `Interlocked`, `ConcurrentBag<T>`, `Stopwatch`.<br>**Strengstens verboten:** *KEIN* Math.NET Cholesky, *KEINE* kontinuierlichen S-Functions, *KEINE* Event-Queues! |
| **Zeitbudget:** | **In-Class Sprint:** 60 Minuten (Laborpräsenz)<br>**Homework Extension:** 2–3 Stunden (2er-Team, 1 Woche) |
| **Abgabeform:** | Git-Repository: Sourcecode, Unit-Tests und Markdown-Bericht (`README.md`) |

---

## 1. Lernziele (Intended Learning Outcomes - ILOs)

Nach erfolgreicher Bearbeitung dieser Übungseinheit sind Sie in der Lage:
1. **Parallelisierungsmuster anwenden:** Rechenintensive Schleifen mittels Task Parallel Library (`Parallel.For`, `ParallelOptions.MaxDegreeOfParallelism`) thread-sicher zu parallelisieren.
2. **Synchronisationsfehler vermeiden:** Race Conditions und Datenkorruption ohne blockierende globale Locks über thread-lokale Akkumulatoren, Double-Buffering und atomare Operationen (`Interlocked`) zu verhindern.
3. **Skalierung quantitativ analysieren:** Den parallelen Speedup $S(p)$ und die Effizienz $E(p)$ über variierende Thread-Zahlen $p$ experimentell mit `Stopwatch` zu messen und den seriellen Codeanteil $s = 1 - f_{\text{par}}$ über das Amdahlsche Gesetz mathematisch zu fitten.
4. **Hardwarenahe Cache-Effekte nachweisen:** Den drastischen Performanceeinfluss räumlicher Cache-Lokalität (Spatial Locality, Cache Lines à 64 Byte, Row-Major vs. Column-Major) experimentell zu quantifizieren und False Sharing zu unterbinden.

---

## 2. Mathematisch-Theoretische Grundlagen

### 2.1 Amdahlsches Gesetz & Parallele Effizienz

Ist ein Programm zu einem Anteil $f_{\text{par}} \in [0, 1]$ ideal parallelisierbar und zu einem Anteil $s = 1 - f_{\text{par}}$ strikt seriell, so lautet der theoretische Speedup $S(p)$ bei Ausführung auf $p$ Prozessorkernen:

$$S(p) = \frac{T_1}{T_p} = \frac{1}{(1 - f_{\text{par}}) + \frac{f_{\text{par}}}{p}} = \frac{1}{s + \frac{1 - s}{p}}$$

Der maximal erzielbare Grenz-Speedup bei unendlich vielen Prozessorkernen ($p \to \infty$) ist nach oben beschränkt:

$$S_{\max} = \lim_{p \to \infty} S(p) = \frac{1}{s} = \frac{1}{1 - f_{\text{par}}}$$

Die **parallele Effizienz** $E(p)$ beschreibt den Auslastungsgrad der eingesetzten Hardware:

$$E(p) = \frac{S(p)}{p} = \frac{1}{p \cdot s + (1 - s)} \le 1{,}0 \quad (100\,\%)$$

### 2.2 Cache-Architektur & False Sharing

Moderne CPUs transferieren Speicher nicht byteweise, sondern in **Cache-Lines** (typisch 64 Byte). 
- **Spatial Locality (Row-Major):** Durchläuft eine Schleife ein lineares 1D-Array `data[row * cols + col]`, lädt ein Cache-Miss direkt die nächsten 8 `double`-Werte (64 Byte) in den L1-Cache.
- **Cache-Miss-Kaskade (Column-Major):** Wird stattdessen spaltenweise zugegriffen (`data[row * cols + col]` mit äußerer Schleife über `col`), erzeugt fast jede Speicherlesung einen Cache-Miss.
- **False Sharing:** Schreiben zwei Threads auf unterschiedliche Variablen, die zufällig in derselben 64-Byte-Cache-Zeile liegen, invalidieren die CPU-Kerne gegenseitig ihre L1-Caches (Cache Coherence Ping-Pong).

---

## 3. Stufe A: In-Class Sprint (60 min)

### Thema: „Partikel-Kinetik-Benchmark mit TPL Parallel.For“

Implementieren Sie in einer C#-Konsolenapplikation (`ParallelBenchmarkSprint`) ein minimales, rechenintensives 2D-Partikelsystem mit $N = 100\,000$ Partikeln.

```
┌────────────────────────────────────────────────────────────────────────┐
│ STUFE A: IN-CLASS SPRINT ARCHITEKTUR                                   │
│                                                                        │
│   Partikel-Array [N = 100.000]                                         │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │ [0] (x, y, vx, vy) | [1] (x, y, vx, vy) | ... | [N-1]        │     │
│   └──────────────────────────────────────────────────────────────┘     │
│             │                                                          │
│             ├──> Sequentieller Durchlauf:  for (int i = 0; i < N; i++) │
│             │    => T_seq mit Stopwatch messen                         │
│             │                                                          │
│             └──> Paralleler Durchlauf:    Parallel.For(0, N, i => ...) │
│                  => T_par mit Stopwatch messen                         │
│                  => Speedup S = T_seq / T_par                          │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung (Schritt für Schritt):

1. **Datenstrukturen definieren:**
   Erstellen Sie zwei flache Arrays für Positionen und Geschwindigkeiten (Structure of Arrays oder kompaktes Struct):
   ```csharp
   public struct Particle
   {
       public double X, Y;
       public double Vx, Vy;
   }
   ```
2. **Initialisierung:**
   Initialisieren Sie $N = 100\,000$ Partikel mit Zufallskoordinaten im Bereich $[0, 1000] \times [0, 1000]$ und Geschwindigkeiten im Bereich $[-10, +10]\,\text{m/s}$.
3. **Rechenintensive Kinetik-Aktualisierung (Zentralfeld-Attraktor):**
   Jeder Partikel wird von einem Gravitationszentrum im Koordinatenursprung $(0, 0)$ angezogen:
   $$r_i = \sqrt{x_i^2 + y_i^2 + \epsilon^2}, \quad a_{x, i} = -\frac{\mu \cdot x_i}{r_i^3}, \quad a_{y, i} = -\frac{\mu \cdot y_i}{r_i^3}$$
   mit $\mu = 50\,000$ und Glättungsparameter $\epsilon = 1{,}0$ (gegen Division durch Null).  
   Euler-Cromer-Schritt:
   $$\mathbf{v}_i^{k+1} = \mathbf{v}_i^k + \Delta t \cdot \mathbf{a}_i, \quad \mathbf{x}_i^{k+1} = \mathbf{x}_i^k + \Delta t \cdot \mathbf{v}_i^{k+1}$$
4. **Sequentieller Benchmark:**
   Führen Sie 20 Zeitschritte sequentiell aus. Nutzen Sie `System.Diagnostics.Stopwatch`.
   > [!IMPORTANT]
   > Führen Sie vor der eigentlichen Zeitmessung einen Warmup-Durchlauf über 2 Zeitschritte durch, um den JIT-Compiler zu erwärmen!
5. **Paralleler Benchmark:**
   Parallelisieren Sie die äußere Schleife über alle Partikel mit `Parallel.For(0, N, i => { ... })`.
   Messen Sie erneut die Ausführungszeit für 20 Zeitschritte.
6. **Auswertung auf der Konsole:**
   Berechnen und drucken Sie:
   - $T_{\text{seq}}$ in Millisekunden,
   - $T_{\text{par}}$ in Millisekunden,
   - Speedup $S = \frac{T_{\text{seq}}}{T_{\text{par}}}$,
   - Parallele Effizienz $E = \frac{S}{p_{\text{logical}}}$ mit $p = \text{Environment.ProcessorCount}$.

**Erwartetes Ergebnis nach 50 Minuten:**  
Ein reproduzierbarer Speedup von $4\times$ bis $10\times$ (je nach Host-CPU) auf der Konsole.

---

## 4. Stufe B: Homework Extension (Wahlmodell – GENAU EINE Aufgabe!)

> [!IMPORTANT]
> **Pick your Track (Wahlmodell – KEINE Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **GENAU EINEN** der beiden Tracks:
> - **Track A (Industrie):** Parallele Monte-Carlo-Toleranzanalyse & Passungsprüfung
> - **Track B (Simulation Game):** 100.000 Boids & Zombie-Horden-KI-Benchmark
> 
> Beide Aufgaben basieren auf derselben TPL-Multithreading-Methodik, erfordern denselben Arbeitsaufwand und führen zur maximalen Punktzahl (10 Punkte). Bearbeiten Sie **NUR EINEN** Track!

---

### Track A (Industrie): Parallele Monte-Carlo-Toleranzanalyse für Baugruppen-Passungen

#### Industrieller Kontext:
In der automatisierten Serienfertigung (z. B. Getriebe- oder Spindellagerung) addieren sich die Fertigungstoleranzen einzelner Bauteile zu einer nichtlinearen Maßkette. Um Ausschussraten vor der Fertigung exakt zu prognostizieren, werden $N = 10\,000\,000$ statistische Bauteil-Kombinationen parallel simuliert (Monte-Carlo-Toleranzanalyse).

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK A: STATISTISCHE MASSEKETTE                                       │
│                                                                        │
│   Gehäusebohrung D_G       Lager außen D_A       Welle d_W             │
│   [Normal / Gauss]         [Rechteck / ISO]      [Log-Normal]          │
│   ───────────────>         ───────────────>      ───────────>          │
│                                                                        │
│   Schließmaß / Passungsspiel: S = D_G - (D_A + d_W)                    │
│   Ausschusskriterium: S < S_min (Klemmer) ODER S > S_max (Spiel)       │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track A:

1. **Mathematisches Maßketten-Modell:**
   Ein Präzisions-Spindellager besteht aus 4 aufeinander gestapelten Bauteilen mit statistisch schwankenden Abmessungen:
   - Bauteil 1 (Gehäuse): $L_1 \sim \mathcal{N}(\mu=50{,}00\,\text{mm}, \sigma=0{,}02\,\text{mm})$ (Normalverteilung).
   - Bauteil 2 (Innenring): $L_2 \sim \mathcal{U}(19{,}95\,\text{mm}, 20{,}05\,\text{mm})$ (Gleichverteilung).
   - Bauteil 3 (Distanzscheibe): $L_3 \sim \text{LogNormal}(\mu=1{,}5\,\text{mm}, \sigma=0{,}01\,\text{mm})$.
   - Bauteil 4 (Wellenabsatz): $L_4 \sim \mathcal{N}(\mu=28{,}40\,\text{mm}, \sigma=0{,}015\,\text{mm})$.
   
   Das resultierende axiale Funktionsspiel beträgt:
   $$S = L_1 - (L_2 + L_3 + L_4)$$
   Zulässiges Toleranzband: $S \in [0{,}050\,\text{mm}, 0{,}150\,\text{mm}]$. Liegt $S$ außerhalb, gilt das Aggregat als Ausschuss.

2. **Thread-sichere Monte-Carlo-Parallelisierung:**
   - Simulieren Sie $N = 10\,000\,000$ Stichproben.
   - **Thread-lokaler Zufall:** Nutzen Sie `ThreadLocal<Random>` oder `Random.Shared` (in .NET 8), niemals eine gemeinsame `Random`-Instanz ohne Lock (Race Condition führt zu Nullen!).
   - **Vermeidung von False Sharing:** Jeder Thread zählt seine Ausschussfälle lokal in einer Variablen; die Aggregation in die globale Ausschusszahl erfolgt atomar via `Interlocked.Add` oder über die Überladung `Parallel.For<TLocal>`.

3. **Systematische Skalierungsreihe & Amdahl-Fit:**
   - Führen Sie die Simulation mit $p \in \{1, 2, 4, 6, 8, 12, 16, 24, 32\}$ Threads aus (Steuerung über `ParallelOptions.MaxDegreeOfParallelism = p`).
   - Führen Sie pro $p$ genau 5 Messläufe durch (erster Lauf = Warmup; Mittelwert & Standardabweichung der restlichen 4 Läufe protokollieren).
   - Fitten Sie die Messwerte $(p, S(p))$ an Amdahls Gesetz mittels Nichtlinearer Ausgleichsrechnung (Least-Squares):
     $$S(p) = \frac{1}{s + \frac{1-s}{p}}$$
   - Bestimmen Sie den seriellen Anteil $s$ und das theoretische Limit $S_{\max} = 1/s$.

4. **Hardware-Cache-Experiment (Row-Major vs. Column-Major):**
   - Allokieren Sie eine 2D-Matrix der Größe $4096 \times 4096$ als flaches 1D-Array `double[4096 * 4096]`.
   - Implementieren Sie zwei Benchmark-Funktionen für eine Glättungsoperation:
     - **Test 1 (Row-Major, Cache-freundlich):** Äußere Schleife Zeilen $r$, innere Schleife Spalten $c$.
     - **Test 2 (Column-Major, Cache-feindlich):** Äußere Schleife Spalten $c$, innere Schleife Zeilen $r$.
   - Messen Sie die Laufzeit beider Varianten und erklären Sie den Unterschied anhand von Cache Lines (64 Byte) und CPU-Prefetching im Markdown-Bericht.

---

### Track B (Simulation Game): 100.000 Boids & Zombie-Horden-KI-Benchmark

#### Game-Kontext:
In modernen Crowd-Simulationen und Zombie-Survival-Games müssen zehntausende autonome Agenten zeitgleich Pfadfindung, Flucht- und Rudelverhalten (Reynolds Boids) in Echtzeit berechnen. Ohne massive Multicore-Parallelisierung bricht die Framerate sofort ein.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK B: SWARM-VEKTORFELD & SEPARATION                                 │
│                                                                        │
│   Agent i scannt Nachbarn j im Radius R:                               │
│                                                                        │
│            (Agent j)                                                   │
│               ^                                                        │
│               │  \vec{d}_ij                                            │
│               │                                                        │
│           (Agent i) ───> Fluchtvektor \vec{F}_sep = -\sum \vec{d}_ij / |d|^2
│                                                                        │
│   Aktualisierung: Double-Buffering (Array Read[] -> Array Write[])     │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track B:

1. **Agentenmodell & Schwarmdynamik:**
   Simulieren Sie $N = 50\,000$ Boids/Zombies auf einer 2D-Fläche ($2000 \times 2000\,\text{m}$) über 50 Simulationsschritte.
   Jeder Agent besitzt Zustand $\mathbf{x}_i = (x, y)$ und $\mathbf{v}_i = (v_x, v_y)$.
   Pro Schritt berechnet Agent $i$:
   - **Zielverfolgung (Attraktion):** Bewegung zum Zentrum der menschlichen Überlebenden $\mathbf{P}_{\text{Target}} = (1000, 1000)$.
   - **Lokale Separation:** Abstoßung von den nächsten Nachbarn innerhalb des Wahrnehmungsradius $R_{\text{sens}} = 10\,\text{m}$:
     $$\mathbf{F}_{\text{sep}, i} = \sum_{j \in \text{Nachbarn}, j \neq i} \frac{\mathbf{x}_i - \mathbf{x}_j}{\|\mathbf{x}_i - \mathbf{x}_j\|^2 + \epsilon}$$
   - **Geschwindigkeitsdämpfung & Maximalbegrenzung:** $\|\mathbf{v}_i\| \le v_{\max} = 5\,\text{m/s}$.

2. **Thread-Sicherheit durch Double-Buffering:**
   - Verhindern Sie Lese-Schreib-Konflikte (Race Conditions) durch striktes **Double-Buffering**:
     - Thread liest Positionen ausschließlich aus `StateCurrent[i]`.
     - Thread schreibt neue Positionen ausschließlich in `StateNext[i]`.
     - Am Ende des Zeitschritts werden die Referenzen zeigerbasiert getauscht (`Swap(ref StateCurrent, ref StateNext)`).

3. **Systematische Skalierungsreihe & Amdahl-Fit:**
   - Messen Sie die Rechenzeit für 50 Schritte bei $p \in \{1, 2, 4, 6, 8, 12, 16, 24, 32\}$ Threads.
   - 5 Durchläufe pro Messpunkt (Warmup verwerfen, Mittelwert und Fehlerbalken erfassen).
   - Berechnen Sie Speedup $S(p)$ und fitten Sie das Amdahlsche Gesetz zur Ermittlung des seriellen Anteils $s$.

4. **Hardware-Cache-Experiment (Row-Major vs. Column-Major):**
   - Identischer 2D-Laplace/Glättungs-Benchmark auf der $4096 \times 4096$ Matrix wie in Track A:
     - Vergleich von zeilenweisem Durchlauf (Schrittweite 1 Element) vs. spaltenweisem Durchlauf (Schrittweite 4096 Elemente).
     - Dokumentation des Verhältnisses $T_{\text{col}} / T_{\text{row}}$ im Bericht.

---

## 5. Akzeptanzkriterien & Definition of Done

Für die volle Punktzahl (10 Punkte) müssen folgende Kriterien erfüllt sein:

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **Korrekte TPL-Implementierung** | **3 P.** | Thread-sichere Schleifenparallelisierung via `Parallel.For`; keine Race Conditions, kein naiver globaler Lock im Schleifeninneren. |
| **Skalierungs-Messreihe & Amdahl** | **3 P.** | Vollständige Messreihe über $p \in \{1, \dots, 32\}$; korrekter JIT-Warmup; mathematischer Fit des Parameters $s$ nach Amdahls Gesetz mit Diagramm. |
| **Cache-Lokalitäts-Experiment** | **2 P.** | Nachweis des Leistungsunterschieds zwischen Row-Major und Column-Major auf $4096 \times 4096$ Matrix mit fundierter hardwarenaher Begründung (Cache-Lines, L1/L2). |
| **Codequalität & Dokumentation** | **2 P.** | Sauberes Projekt, kompilierbar mit `dotnet build -c Release`, strukturierte `README.md` mit Tabellen, Speedup-Plots und Diskussion. |

---

## 6. Online-Recherche-Box

Nutzen Sie zur Vorbereitung und Vertiefung folgende Quellen:

- **Offizielle Dokumentation:**
  - [Microsoft Learn: Datenparallelität (Task Parallel Library)](https://learn.microsoft.com/de-de/dotnet/standard/parallel-programming/data-parallelism-task-parallel-library)
  - [Microsoft Learn: ParallelOptions Class](https://learn.microsoft.com/de-de/dotnet/api/system.threading.tasks.paralleloptions)
  - [Microsoft Learn: Interlocked Class (Atomare Operationen)](https://learn.microsoft.com/de-de/dotnet/api/system.threading.interlocked)
- **Gezielte englische Suchbegriffe:**
  - `C# Parallel.For thread local state aggregation`
  - `avoid false sharing cache line padding C#`
  - `Amdahl's law curve fitting non-linear least squares C#`
  - `spatial locality row major vs column major CPU cache miss`

---

## 7. Vibe-Coding Prompting-Tipps

Falls Sie KI-Assistenten (GitHub Copilot, Claude, ChatGPT) verwenden, nutzen Sie präzise Prompts mit Vorgaben zur Vermeidung typischer KI-Fehler:

> [!TIP]
> **Prompt-Vorlage 1: Thread-lokale Akkumulation (Vermeidung von globalen Locks)**  
> *„Schreibe mir eine parallele Monte-Carlo-Schleife in C# mit `Parallel.For`. Ich habe $10\,000\,000$ Iterationen. Verwende NICHT ein einfaches `lock` um eine globale Zählvariable, da das die Threads serialisiert. Nutze stattdessen die `Parallel.For`-Überladung mit `localInit`, `body` und `localFinally` sowie `Interlocked.Add`, um Teilergebnisse thread-sicher zusammenzuführen.“*

> [!WARNING]
> **Prompt-Vorlage 2: Vermeidung von veralteter oder un-threadsicherer Random-Nutzung**  
> *„Ich benötige Zufallszahlen in parallelen Schleifen unter .NET 8. Generiere mir KEINE statische `new Random()` Instanz, da `Random.NextDouble()` nicht threadsicher ist und Nullen liefert. Nutze `Random.Shared` oder `ThreadLocal<Random>` mit kryptografischem Seed pro Thread.“*

---

## 8. 🔍 Peer-Review-Leitfragen für das Auditorium

Zu Beginn des nächsten Termins werden zwei Teams zufällig für den **Live-Showcase am Beamer** ausgewählt. Das Auditorium prüft die vorgestellten Lösungen anhand folgender Fragen:

1. **Race-Condition-Prüfung:** Wurden geteilte Zähler ohne `lock` oder `Interlocked` inkrementiert? *(Challenge: Mehrmaliges Ausführen des Programms mit $p = 16$ – weicht die Summe der Ereignisse ab oder bleibt sie exakt deterministisch?)*
2. **False Sharing auf Cache-Lines:** Liegen thread-spezifische Zähler in einem einfachen Array `int counts[p]` direkt nebeneinander? Verursacht dies bei $p \ge 8$ einen spürbaren Performanceknick durch Cache-Invalidierung?
3. **JIT-Warmup & Messmethodik:** Wurde die Zeitmessung erst gestartet, nachdem der Code mindestens einmal durchlaufen wurde (Kompilierung des Zwischencodes), oder enthält der $p=1$-Lauf fälschlicherweise den JIT-Kompilierungs-Overhead?
4. **Physikalische Interpretation des Amdahl-Fits:** Liegt der gefittete serielle Anteil $s$ in einem realistischen Bereich ($0{,}5\,\% \dots 5\,\%$)? Welcher maximale Speedup $S_{\max} = 1/s$ wäre auf einem Supercomputer mit $p = 1024$ Kernen für diesen Algorithmus erreichbar?
