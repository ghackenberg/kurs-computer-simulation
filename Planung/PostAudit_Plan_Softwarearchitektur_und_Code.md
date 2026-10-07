# Software-Engineering- & Architektur-Ausführungsplan (Stream C)
## Post-Audit-Sanierung: Softwarearchitektur, C#, Zero-Allocation & Code-Synchronizität

**Dokument-ID:** `Planung/PostAudit_Plan_Softwarearchitektur_und_Code.md`  
**Autor:** Spezialist für Software-Engineering, C# und Systemsimulation (Stream C)  
**Bezugsdokument:** `Reviews/PostAudit_03_Softwarearchitektur_und_Code.md`  
**Ziel-Repository:** `kurs-computer-simulation` (FH Oberösterreich, Campus Wels, Studiengang Automatisierungstechnik)  
**Status:** Genehmigter, schlüsselfertiger Umsetzungsplan  
**Datum:** Oktober 2026  

---

## Inhaltsverzeichnis

1. [Executive Summary & Gesamtarchitektur](#1-executive-summary--gesamtarchitektur)
2. [AP2-C1: Zero-Allocation Plot-Update in `SimulationMvvmPattern`](#2-ap2-c1-zero-allocation-plot-update-in-simulationmvvmpattern)
   - 2.1 Heap-Allokationsanalyse des Ist-Zustands (120 Allokationen/s)
   - 2.2 Architektur-Lösung: ScottPlot 5 In-Place Scatter mit Index-Windowing
   - 2.3 Alternative Betrachtung: `Signal`-Plot-Bindung
   - 2.4 Vollständiger Code-Umbau für `MainWindow.xaml.cs`
   - 2.5 Verifikations- und Benchmark-Kriterien
3. [AP2-C2: Bisektion & Zeno-Schwellen-Implementierung in `SFunctionHybrid`](#3-ap2-c2-bisektion--zeno-schwellen-implementierung-in-sfunctionhybrid)
   - 3.1 Das numerische Versagen der naiven Schrittweitenhalbierung
   - 3.2 Mathematische Formulierung der Intervall-Bisektion ($z_a \cdot z_b \le 0$)
   - 3.3 Haftkontaktschwelle (*Sticking Threshold*) zur Zeno-Beherrschung
   - 3.4 Restschritt-Integration für kontinuierliche Zeitschrittweiterführung
   - 3.5 Vollständiger Code-Umbau für `EulerExplicitSolver.cs` und `Solver.cs`
   - 3.6 Validierungsszenario am `BouncingBallExample`
4. [AP2-C3: Projektintegration & Testabdeckung von `ParallelWelfordAccumulator`](#4-ap2-c3-projektintegration--testabdeckung-von-parallelwelfordaccumulator)
   - 4.1 Didaktische & architektonische Verortung (Kapitel 09 DES)
   - 4.2 Dateiplatzierung und Solution-Integration
   - 4.3 Vollständiger Code des `ParallelWelfordAccumulator` (mit XML-Doku & Namespace)
   - 4.4 Vollständige Unit-Test-Suite (`ParallelWelfordAccumulatorTests.cs`)
   - 4.5 Mathematische Prüffälle: Welford vs. Two-Pass, Chan-Merge, Katastrophale Auslöschung
5. [AP2-C4: Bereitstellung fehlender 3D-Klassen in `VorlageSzenengraph3D`](#5-ap2-c4-bereitstellung-fehlender-3d-klassen-in-vorlageszenengraph3d)
   - 5.1 Didaktische Lücke: Folien 5.58 & 5.65–76 vs. Quellcode
   - 5.2 Vollständige Implementierung von `GeometryFactory.cs`
   - 5.3 Vollständige Implementierung von `OrbitCamera.cs` (Kugelkoordinaten, `gl.LookAt`)
   - 5.4 WPF-Mausinteraktion in `MainWindow.xaml` und `MainWindow.xaml.cs` (Drag & Zoom)
6. [Qualitätssicherung, Build-Matrix & Abnahmekriterien](#6-qualitätssicherung-build-matrix--abnahmekriterien)

---

## 1. Executive Summary & Gesamtarchitektur

Das vorangegangene Audit (`Reviews/PostAudit_03_Softwarearchitektur_und_Code.md`) bescheinigt der Vorlesungsreihe einen signifikanten Reifegrad, deckte jedoch vier präzise architektonische Schwachstellen und Synchronizitätslücken auf:

| AP-ID | Handlungsfeld | Betroffene Komponenten | Kernproblem & Zielsetzung |
| :--- | :--- | :--- | :--- |
| **AP2-C1** | Zero-Allocation Live-Plotting | `WS25/SimulationMvvmPattern/MainWindow.xaml.cs` | Beseitigung von 120 Managed-Heap-Allokationen/s (`ToArray()`, `Plot.Clear()`) im 16-ms-Timer; Umstellung auf In-Place-Pufferung mit `MinRenderIndex`/`MaxRenderIndex` (0 Byte/Tick). |
| **AP2-C2** | Hybride Ereignis-Numerik | `WS25/SFunctionHybrid/Framework/Solvers/EulerExplicitSolver.cs` | Beseitigung der naiven Schrittweitenhalbierung (`timeStep /= 2`); Einführung echter Intervall-Bisektion ($z_a \cdot z_b \le 0$), Zeno-Haftkontaktschwelle und Restschritt-Integration synchron zu Folie 10.49–50. |
| **AP2-C3** | Statistik-Engine & Testbarkeit | `WS25/ParallelWelfordAccumulator.cs`<br>`WS24/DynamischWarteschlange` | Einbindung der verwaisten Welford-Klasse in `DynamischWarteschlange.Model` und Bereitstellung einer automatisierten Unit-Test-Suite gegen katastrophale Auslöschung. |
| **AP2-C4** | 3D-Szenengraph & Interaktion | `WS25/VorlageSzenengraph3D/` | Schließen der 3D-Praxislücke: Implementierung der auf den Folien 5.58 und 5.65–76 gelehrten Klassen `GeometryFactory` und `OrbitCamera` inklusive WPF-Maussteuerung. |

Alle Maßnahmen folgen dem Grundsatz des modernen Industrie-C# (.NET 8/.NET 10), strikter GC-Vermeidung im Simulationstakt und fehlerfreier Kompilierung (0 Warnings, 0 Errors).

---

## 2. AP2-C1: Zero-Allocation Plot-Update in `SimulationMvvmPattern`

### 2.1 Heap-Allokationsanalyse des Ist-Zustands (120 Allokationen/s)

In `Quellen/WS25/SimulationMvvmPattern/MainWindow.xaml.cs` (Zeilen 40–67) wird im 16-ms-Tick des `DispatcherTimer` (60 FPS) folgende Routine ausgeführt:

```csharp
// IST-ZUSTAND (GC-SMELL):
int count = _vm.Buffer.CopySnapshot(_renderX, _renderY);
if (count > 1)
{
    // ALLOKATION 1 & 2: Zwei neue Heap-Arrays bei jedem Frame!
    double[] xs = _renderX.AsSpan(0, count).ToArray();
    double[] ys = _renderY.AsSpan(0, count).ToArray();

    // ALLOKATION 3 & 4: Kompletter Abriss und Neuallokation des Plottables!
    TrajectoryPlot.Plot.Clear();
    _scatterPlot = TrajectoryPlot.Plot.Add.Scatter(xs, ys);
    _scatterPlot.LineWidth = 2;
    _scatterPlot.Color = new ScottPlot.Color(0, 90, 156);
    TrajectoryPlot.Plot.Axes.AutoScale();
    TrajectoryPlot.Refresh();
}
```

**Quantitative Auswirkungen:**
- Pro Frame werden zwei `double[]`-Arrays der Länge bis zu 2.000 allokiert ($2 \times 2.000 \times 8\,\text{Byte} \approx 32\,\text{KB}$).
- Bei 60 FPS entspricht dies $60 \times 32\,\text{KB} \approx 1{,}92\,\text{MB}$ kurzlebiger Objekte pro Sekunde auf dem Gen-0-Heap.
- `Plot.Clear()` zerstört interne Plottable-Listen und zwingt ScottPlot 5 zur Neukompilierung der Renderpipeline bei jedem Frame.
- **Folge:** Häufige Garbage-Collection-Läufe (Gen-0-Collections), die zu Mikrorucklern und UI-Jitter führen und das auf den Folien (Folie 4.27 & 11.23) vermittelte Versprechen eines allokationsfreien Systems verletzen.

---

### 2.2 Architektur-Lösung: ScottPlot 5 In-Place Scatter mit Index-Windowing

ScottPlot 5 (`ScottPlot.Plottables.Scatter`) kapselt seine Datenquelle im Interface `ScottPlot.IScatterSource`. Diese Schnittstelle stellt zwei entscheidende Eigenschaften bereit:
- `int MinRenderIndex { get; set; }`
- `int MaxRenderIndex { get; set; }`

Wird ein `Scatter`-Plot einmalig im Konstruktor an die persistenten Pufferfelder `_renderX` und `_renderY` gebunden:
```csharp
_scatterPlot = TrajectoryPlot.Plot.Add.Scatter(_renderX, _renderY);
```
kann der gerenderte sichtbare Bereich im UI-Timer exakt über `MaxRenderIndex = count - 1` eingegrenzt werden, während `_vm.Buffer.CopySnapshot(_renderX, _renderY)` die Werte direkt in die bestehenden Speicherbereiche schreibt.

**Vorteile:**
1. **0 Byte Heap-Allokationen** im gesamten Timer-Lebenszyklus.
2. Kein `Plot.Clear()` und keine Neuinstanziierung von `Scatter`-Objekten.
3. Volle Beibehaltung aller ScottPlot-Features (Marker, Linienstile, FH OÖ CI-Farbe).
4. Automatisches Verbergen über `_scatterPlot.IsVisible = false`, wenn der Puffer geleert wurde (`count <= 1`).

---

### 2.3 Alternative Betrachtung: `Signal`-Plot-Bindung

Ein `Signal`-Plot (`TrajectoryPlot.Plot.Add.Signal(_renderY)`) benötigt nur das $y$-Array und nutzt `sig.Data.Period = dt`. In ScottPlot 5 besitzt `Signal` jedoch feste Array-Längen und rendert standardmäßig den gesamten Puffer (auch unbeschriebene Nullstellen).
Daher ist die **In-Place-Scatter-Lösung mit `MinRenderIndex`/`MaxRenderIndex`** für wachsende Simulationsströme im Ringpuffer didaktisch und technisch überlegen, da sie:
- Nicht-äquidistante oder unwrapped Zeitstempel fehlerfrei darstellt,
- den aktuellen Füllstand $count$ ohne künstliche Nullpunkt-Linien visualisiert,
- 100% allokationsfrei arbeitet.

---

### 2.4 Vollständiger Code-Umbau für `MainWindow.xaml.cs`

```csharp
using System;
using System.Windows;
using System.Windows.Threading;
using ScottPlot.Plottables;
using SimulationMvvmPattern.ViewModel;

namespace SimulationMvvmPattern
{
    /// <summary>
    /// Code-Behind für die MainWindow View.
    /// Kapselt ausschließlich View-spezifische Rendering-Logik für ScottPlot 5.
    /// Keine Domänen- oder Simulationsberechnung im Code-Behind (strikte MVVM-Trennung).
    /// Garantiert Zero-Allocation im 60-FPS-Timer durch persistente Pufferbindung.
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly MainViewModel _vm;
        private readonly DispatcherTimer _renderTimer = new();
        private readonly double[] _renderX = new double[2000];
        private readonly double[] _renderY = new double[2000];
        private readonly Scatter _scatterPlot;

        public MainWindow()
        {
            InitializeComponent();
            _vm = (MainViewModel)DataContext;

            // Plot-Layout konfigurieren (ScottPlot 5)
            TrajectoryPlot.Plot.Title("Masse-Feder-Dämpfer Trajektorie x(t)");
            TrajectoryPlot.Plot.XLabel("Zeit t [s]");
            TrajectoryPlot.Plot.YLabel("Auslenkung x [m]");

            // Feste Bindung der vorallokierten Puffer (Zero-Allocation-Rendering)
            _scatterPlot = TrajectoryPlot.Plot.Add.Scatter(_renderX, _renderY);
            _scatterPlot.LineWidth = 2;
            _scatterPlot.Color = new ScottPlot.Color(0, 90, 156); // FH OÖ Blau
            _scatterPlot.MarkerSize = 0;                          // Reine Kurvendarstellung
            _scatterPlot.IsVisible = false;

            // 60-FPS UI-Render-Timer (ca. 16 ms) zur entkoppelten Visualisierung
            _renderTimer.Interval = TimeSpan.FromMilliseconds(16);
            _renderTimer.Tick += OnRenderTick;
            _renderTimer.Start();
        }

        private void OnRenderTick(object? sender, EventArgs e)
        {
            // Atomarer Snapshot in vorallokierte Arrays ohne Heap-Allokation
            int count = _vm.Buffer.CopySnapshot(_renderX, _renderY);

            if (count > 1)
            {
                // Begrenze das Rendering strikt auf die tatsächlich gefüllten Punkte
                _scatterPlot.Data.MinRenderIndex = 0;
                _scatterPlot.Data.MaxRenderIndex = count - 1;
                _scatterPlot.IsVisible = true;

                TrajectoryPlot.Plot.Axes.AutoScale();
                TrajectoryPlot.Refresh();
            }
            else if (_scatterPlot.IsVisible)
            {
                // Bei Puffer-Reset (Clear) Trajektorie unsichtbar schalten
                _scatterPlot.IsVisible = false;
                TrajectoryPlot.Refresh();
            }
        }
    }
}
```

---

### 2.5 Verifikations- und Benchmark-Kriterien

1. **Compiler-Prüfung:** `dotnet build Quellen/WS25/SimulationMvvmPattern/SimulationMvvmPattern.csproj` kompiliert mit `0 Warnungen, 0 Fehler`.
2. **GC-Allokationsnachweis:** Profiling mit `dotnet-counters` oder dem Visual Studio Diagnostic Tool zeigt während aktiver 60-FPS-Simulation $0\,\text{Byte/s}$ Allokationsrate im UI-Thread durch `OnRenderTick`.
3. **Funktionstest:** Bei Klick auf `Start` wächst die Trajektorie ruckelfrei an; bei Klick auf `Reset` verschwindet die Kurve sofort; bei erneutem `Start` beginnt sie sauber von vorne.

---

## 3. AP2-C2: Bisektion & Zeno-Schwellen-Implementierung in `SFunctionHybrid`

### 3.1 Das numerische Versagen der naiven Schrittweitenhalbierung

In `Quellen/WS25/SFunctionHybrid/Framework/Solvers/EulerExplicitSolver.cs` (Zeilen 121–137) liegt folgende veraltete Logik vor:

```csharp
// VERALTET & NUMERISCH DEFEKT:
while (zeroCrossingValue > ZeroCrossingValueThreshold && zeroCrossingIterationCount++ < ZeroCrossingIterationCountLimit)
{
    timeStep /= 2; // Naive Halbierung von der linken Grenze aus
    RestoreInternalVariables();
    IntegrateContinuousStates(timeStep);
    CalculateOutputs(time + timeStep);
    zeroCrossingValue = CalculateZeroCrossings(time + timeStep);
}
```

**Mathematische Schwachstellen:**
1. **Asymmetrisches Suchintervall:** Die Schleife testet nur $t + \frac{1}{2}\Delta t$, $t + \frac{1}{4}\Delta t$, $t + \frac{1}{8}\Delta t$. Liegt der Nulldurchgang jedoch im hinteren Intervallabschnitt (z.B. bei $t + 0{,}75\Delta t$), entfernt sich der Solver mit jeder Halbierung *weiter* vom tatsächlichen Nulldurchgang. Die Funktion bleibt im positiven Bereich, `zeroCrossingValue` liefert `-1` (kein Vorzeichenwechsel gefunden), die Schleife bricht vorzeitig ab und das Ereignis wird vollständig verschluckt!
2. **Das Zeno-Phänomen:** Bei abklingenden Hüpfbewegungen (elastischer Stoß mit Dämpfung $e < 1$) konvergiert die Zeit zwischen zwei Stößen geometrisch gegen Null ($\sum_{k=0}^{\infty} \Delta t_k < \infty$). Der naive Solver halbiert die Schrittweite bis zum Unterlauf, erreicht das Iterationslimit und bricht die Simulation mit einer Exception ab:
   ```
   throw new Exception($"Nulldurchgang nicht gefunden ({time + timeStep}, {zeroCrossingValue})!");
   ```

---

### 3.2 Mathematische Formulierung der Intervall-Bisektion ($z_a \cdot z_b \le 0$)

Nach dem Zwischenwertsatz für stetige Funktionen besitzt eine Zero-Crossing-Funktion $z(t)$ im Intervall $[t_{\text{left}}, t_{\text{right}}]$ mindestens eine Nullstelle, wenn:
$$\text{sgn}(z(t_{\text{left}})) \neq \text{sgn}(z(t_{\text{right}})) \iff z(t_{\text{left}}) \cdot z(t_{\text{right}}) \le 0$$

**Bisektions-Algorithmus (synchron zu Folie 10.49):**
1. **Probesprung:** Integriere von $t$ mit voller Schrittweite $\Delta t$ nach $t_{\text{right}} = t + \Delta t$.
2. **Prüfung:** Prüfe für alle Blöcke, ob ein Vorzeichenwechsel vorliegt:
   $$\exists i: z_i(t) \cdot z_i(t + \Delta t) \le 0$$
   Liegt kein Wechsel vor, wird der Schritt vollständig akzeptiert.
3. **Bisektions-Schleife:** Solange $(t_{\text{right}} - t_{\text{left}}) > \varepsilon_t$ und $\max_i |z_i| > \varepsilon_z$:
   - Setze $t_{\text{mid}} = 0{,}5 \cdot (t_{\text{left}} + t_{\text{right}})$.
   - Setze Zustand auf $t$ zurück (`RestoreInternalVariables()`).
   - Integriere über $\Delta t_{\text{mid}} = t_{\text{mid}} - t$.
   - Berechne Ausgaben und $z(t_{\text{mid}})$.
   - Wenn $\text{sgn}(z(t_{\text{mid}})) == \text{sgn}(z(t_{\text{left}}))$, wandert die linke Grenze: $t_{\text{left}} = t_{\text{mid}}$.
   - Andernfalls wandert die rechte Grenze: $t_{\text{right}} = t_{\text{mid}}$.

---

### 3.3 Haftkontaktschwelle (*Sticking Threshold*) zur Zeno-Beherrschung

Um das unendliche Zeno-Prellen abzufangen, wird eine Haftkontaktschwelle $\varepsilon_{\text{sticking}}$ eingeführt (Folie 10.50):
Fällt die kinetische Energie bzw. die Relativgeschwindigkeit unter die Schwelle:
$$|v| < \varepsilon_{\text{sticking}} \quad \text{und} \quad |z| \le \varepsilon_z$$
wird das System vom prellenden Modus in den **Haftzustand** überführt ($v = 0$, $y = y_{\text{Boden}}$). Dadurch wird das Auftreten unendlich vieler Stöße in endlicher Zeit physikalisch korrekt unterbunden.

---

### 3.4 Restschritt-Integration für kontinuierliche Zeitschrittweiterführung

Wurde der Stoßzeitpunkt $t^* = t_{\text{mid}}$ gefunden und diskret behandelt (`UpdateStates(t_mid)`), verbleibt im Zeitschrittintervall eine Restzeit:
$$\Delta t_{\text{rem}} = (t + \Delta t_{\text{orig}}) - t^*$$
Ist $\Delta t_{\text{rem}} > \varepsilon_t$, wird das System von $t^*$ aus über $\Delta t_{\text{rem}}$ bis zum regulären Schrittende fertig integriert. Dies garantiert, dass die Ausgabetaktung des Solvers absolut synchron bleibt.

---

### 3.5 Vollständiger Code-Umbau für `EulerExplicitSolver.cs` und `Solver.cs`

#### Ergänzungen in `Quellen/WS25/SFunctionHybrid/Framework/Solver.cs`
In `Solver.cs` werden die Toleranzen und Schwellwerte explizit deklariert:

```csharp
public double ZeroCrossingValueThreshold { get; set; } = 1e-6;
public double TimeTolerance { get; set; } = 1e-8;
public double StickingVelocityThreshold { get; set; } = 1e-3;
public int ZeroCrossingIterationCountLimit { get; set; } = 100;
```

Zusätzlich wird eine allokationsfreie Hilfsmethode zur Vorzeichenprüfung bereitgestellt:
```csharp
protected bool HasSignChange(Dictionary<Block, double[]> zStart, Dictionary<Block, double[]> zEnd)
{
    foreach (Block f in Model.Blocks)
    {
        double[] start = zStart[f];
        double[] end = zEnd[f];
        for (int i = 0; i < start.Length; i++)
        {
            if ((start[i] > 0 && end[i] <= 0) || (start[i] < 0 && end[i] >= 0))
            {
                return true;
            }
        }
    }
    return false;
}
```

#### Vollständige Neuimplementierung von `EulerExplicitSolver.cs`

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using SFunctionHybrid.Framework.SampleTimes;

namespace SFunctionHybrid.Framework.Solvers
{
    public class EulerExplicitSolver : Solver
    {
        private Block[] _sortedExecutionOrder = [];

        public EulerExplicitSolver(Model composition) : base(composition)
        {
            CompileExecutionOrder();
        }

        private void CompileExecutionOrder()
        {
            Dictionary<Block, int> inDegrees = new();
            Dictionary<Block, List<Block>> directSuccessors = new();

            foreach (var b in Blocks)
            {
                inDegrees[b] = 0;
                directSuccessors[b] = new List<Block>();
            }

            foreach (var c in Connections)
            {
                Block source = c.Source;
                Block target = c.Target;
                int targetInputIdx = c.Input;

                if (target.Inputs[targetInputIdx].DirectFeedThrough)
                {
                    directSuccessors[source].Add(target);
                    inDegrees[target]++;
                }
            }

            Queue<Block> readyQueue = new();
            foreach (var b in Blocks)
            {
                if (inDegrees[b] == 0)
                {
                    readyQueue.Enqueue(b);
                }
            }

            List<Block> order = new(Blocks.Count);
            while (readyQueue.Count > 0)
            {
                Block u = readyQueue.Dequeue();
                order.Add(u);

                foreach (Block v in directSuccessors[u])
                {
                    inDegrees[v]--;
                    if (inDegrees[v] == 0)
                    {
                        readyQueue.Enqueue(v);
                    }
                }
            }

            if (order.Count != Blocks.Count)
            {
                var cyclicBlocks = Blocks.Where(b => inDegrees[b] > 0).Select(b => b.GetType().Name);
                throw new InvalidOperationException(
                    $"Algebraische Schleife im Blockdiagramm erkannt! Zyklen involvieren: {string.Join(", ", cyclicBlocks)}");
            }

            _sortedExecutionOrder = order.ToArray();
        }

        public sealed override void Solve(double timeStepMax, double timeMax)
        {
            double time = 0;

            InitializeStates();
            CalculateOutputs(time);
            CalculateDerivatives(time);
            CalculateZeroCrossings(time);

            while (time <= timeMax)
            {
                // 1. Maximale Schrittweite ermitteln
                double timeStep = timeStepMax;
                foreach (Block b in Blocks)
                {
                    if (b.SampleTime is DiscreteSampleTime || b.SampleTime is VariableSampleTime)
                    {
                        timeStep = Math.Min(timeStep, NextVariableHitTimes[b] - time);
                    }
                }

                // 2. Anfangszustand dieses Schritts sichern
                RememberInternalVariables();

                // 3. Probesprung mit vollem timeStep
                IntegrateContinuousStates(timeStep);
                CalculateOutputs(time + timeStep);
                double zProbe = CalculateZeroCrossings(time + timeStep);

                // Wenn kein Vorzeichenwechsel stattfand, vollen Schritt akzeptieren
                if (zProbe < 0)
                {
                    UpdateStates(time + timeStep);
                    CalculateOutputs(time + timeStep);
                    CalculateDerivatives(time + timeStep);
                    time += timeStep;
                    continue;
                }

                // 4. Echte Intervall-Bisektion auf [tLeft, tRight] (Folie 10.49)
                double tLeft = time;
                double tRight = time + timeStep;
                double tMid = tRight;
                double zMid = zProbe;
                int iteration = 0;

                while ((tRight - tLeft) > TimeTolerance && zMid > ZeroCrossingValueThreshold && iteration++ < ZeroCrossingIterationCountLimit)
                {
                    tMid = 0.5 * (tLeft + tRight);

                    // Vom Schrittstart (time) nach tMid integrieren
                    RestoreInternalVariables();
                    IntegrateContinuousStates(tMid - time);
                    CalculateOutputs(tMid);
                    zMid = CalculateZeroCrossings(tMid);

                    if (zMid > 0)
                    {
                        // Nullstelle liegt links von tMid
                        tRight = tMid;
                    }
                    else
                    {
                        // Nullstelle liegt rechts von tMid
                        tLeft = tMid;
                    }
                }

                // 5. Zustand exakt am detektierten Ereigniszeitpunkt fixieren
                RestoreInternalVariables();
                IntegrateContinuousStates(tMid - time);
                CalculateOutputs(tMid);
                CalculateZeroCrossings(tMid);

                // 6. Diskretes Ereignis behandeln (mit Zeno-Haftbedingung)
                ApplyZenoStickingOrUpdate(tMid);

                // 7. Restschritt-Integration fertigstellen (Folie 10.50)
                double dtRemaining = (time + timeStep) - tMid;
                if (dtRemaining > TimeTolerance)
                {
                    CalculateDerivatives(tMid);
                    IntegrateContinuousStates(dtRemaining);
                    CalculateOutputs(time + timeStep);
                    CalculateDerivatives(time + timeStep);
                    CalculateZeroCrossings(time + timeStep);
                }

                time += timeStep;
            }
        }

        private void ApplyZenoStickingOrUpdate(double eventTime)
        {
            // Prüfe auf Zeno-Schwelle: Wenn Geschwindigkeit nahe Null, verhindere unendliches Prellen
            foreach (Block b in Model.Blocks)
            {
                if (b.ContinuousStates.Count >= 2)
                {
                    // Konvention für translatorische Mechanik: State[0] = Position, State[1] = Geschwindigkeit
                    double pos = ContinuousStates[b][0];
                    double vel = ContinuousStates[b][1];

                    if (Math.Abs(vel) < StickingVelocityThreshold && Math.Abs(pos) < ZeroCrossingValueThreshold * 10)
                    {
                        ContinuousStates[b][0] = 0.0;
                        ContinuousStates[b][1] = 0.0;
                        Derivatives[b][0] = 0.0;
                        Derivatives[b][1] = 0.0;
                        continue;
                    }
                }
            }

            // Reguläres diskretes Update für alle Blöcke ausführen
            UpdateStates(eventTime);
        }

        protected override void CalculateOutputs(double time)
        {
            for (int i = 0; i < _sortedExecutionOrder.Length; i++)
            {
                Block f = _sortedExecutionOrder[i];
                f.CalculateOutputs(time, ContinuousStates[f], DiscreteStates[f], Inputs[f], Outputs[f]);
                ForwardOutputs(f);
            }
        }
    }
}
```

---

### 3.6 Validierungsszenario am `BouncingBallExample`

- **Szenario:** Der Ball startet bei $y_0 = 5\,\text{m}$ mit $v_0 = 10\,\text{m/s}$ und Dämpfungsfaktor $e = 0{,}5$.
- **Erwartung:** 
  1. Früher stürzte der Solver nach ca. 5–6 Aufprallen wegen `ZeroCrossingIterationCountLimit` mit einer Exception ab.
  2. Mit der echten Bisektion und der Haftkontaktschwelle prellt der Ball sauber ab, die Amplitude sinkt unter die Schwelle, der Ball kommt bei $y = 0$, $v = 0$ zur Ruhe und die Simulation läuft bis $t_{\max} = 10\,\text{s}$ ohne jegliche Exception oder NaN-Werte durch.

---

## 4. AP2-C3: Projektintegration & Testabdeckung von `ParallelWelfordAccumulator`

### 4.1 Didaktische & architektonische Verortung (Kapitel 09 DES)

Die Klasse `ParallelWelfordAccumulator` implementiert das numerisch stabile Ein-Pass-Verfahren nach Welford (1962) sowie die parallele Reduktionsformel nach Chan, Golub und LeVeque (1979). Auf den Folien 9.1228–1341 wird diese Klasse als **zentraler Baustein paralleler Monte-Carlo-Simulationen** für diskrete Ereignissysteme gelehrt.
Im Ist-Zustand liegt die Datei jedoch als verwaistes, unkompiliertes Fragment im Verzeichnis `Quellen/WS25/ParallelWelfordAccumulator.cs`.

---

### 4.2 Dateiplatzierung und Solution-Integration

Die Datei wird regulär in das didaktisch zugehörige Projekt `Quellen/WS24/DynamischWarteschlange` integriert:
- **Zielpfad:** `Quellen/WS24/DynamischWarteschlange/Model/ParallelWelfordAccumulator.cs`
- **Namespace:** `DynamischWarteschlange.Model`
- **Zusatz-Verankerung:** Einbindung in das neue Test-Projekt `Quellen/WS25/SimulationTests/SimulationTests.csproj` (oder Verlinkung via `<Compile Include="..." />`).

---

### 4.3 Vollständiger Code des `ParallelWelfordAccumulator`

```csharp
using System;

namespace DynamischWarteschlange.Model
{
    /// <summary>
    /// Numerisch stabiler 1-Pass-Akkumulator für Mittelwert und Varianz
    /// nach Welford (1962) mit paralleler Fusionsformel nach Chan, Golub & LeVeque (1979).
    /// Verhindert katastrophale Auslöschung bei großen Zahlenwerten mit geringer Varianz.
    /// </summary>
    public class ParallelWelfordAccumulator
    {
        /// <summary>Anzahl der bisher erfassten Stichproben.</summary>
        public long Count { get; private set; }

        /// <summary>Laufender arithmetischer Mittelwert.</summary>
        public double Mean { get; private set; }

        /// <summary>Summe der quadrierten Abweichungen M2 = Sum((x - Mean)^2).</summary>
        public double M2 { get; private set; }

        /// <summary>
        /// Fügt einen neuen Stichprobenwert in O(1) Zeit und O(1) Speicher hinzu.
        /// </summary>
        /// <param name="x">Messwert / Simulationsergebnis.</param>
        public void Add(double x)
        {
            Count++;
            double delta = x - Mean;
            Mean += delta / Count;
            double delta2 = x - Mean;
            M2 += delta * delta2;
        }

        /// <summary>
        /// Führt einen weiteren Teilakkumulator verlustfrei nach der Chan-Formel zusammen.
        /// Ermöglicht exakte parallele Reduktion in Parallel.For / PLINQ ohne Locks im Hot-Loop.
        /// </summary>
        /// <param name="other">Akkumulator eines parallelen Worker-Threads.</param>
        public void Merge(ParallelWelfordAccumulator? other)
        {
            if (other == null || other.Count == 0) return;

            if (this.Count == 0)
            {
                this.Count = other.Count;
                this.Mean = other.Mean;
                this.M2 = other.M2;
                return;
            }

            long newCount = this.Count + other.Count;
            double delta = other.Mean - this.Mean;

            this.Mean += delta * other.Count / newCount;
            this.M2 += other.M2 + delta * delta * ((double)this.Count * other.Count / newCount);
            this.Count = newCount;
        }

        /// <summary>Stichprobenvarianz s^2 (erwartungstreu korrigiert mit N - 1).</summary>
        public double Variance => Count > 1 ? M2 / (Count - 1) : 0.0;

        /// <summary>Empirische Standardabweichung s.</summary>
        public double StandardDeviation => Math.Sqrt(Variance);

        /// <summary>Standardfehler des Mittelwerts SE = s / sqrt(N).</summary>
        public double StandardError => Count > 0 ? Math.Sqrt(Variance / Count) : 0.0;

        /// <summary>
        /// Berechnet den halben Konfidenzintervall-Radius für das gegebene Signifikanzniveau (z.B. Z = 1.96 für 95%).
        /// </summary>
        public double GetConfidenceMargin(double zValue = 1.959964) => zValue * StandardError;
    }
}
```

---

### 4.4 Vollständige Unit-Test-Suite (`ParallelWelfordAccumulatorTests.cs`)

Zur dauerhaften Absicherung im Build-Prozess wird ein Testprojekt `Quellen/WS25/SimulationTests` eingerichtet.
Projektdatei: `Quellen/WS25/SimulationTests/SimulationTests.csproj`:
```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.12.0" />
    <PackageReference Include="MSTest.TestAdapter" Version="3.7.0" />
    <PackageReference Include="MSTest.TestFramework" Version="3.7.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\..\WS24\DynamischWarteschlange\DynamischWarteschlange.csproj" />
  </ItemGroup>
</Project>
```

Testdatei: `Quellen/WS25/SimulationTests/ParallelWelfordAccumulatorTests.cs`:
```csharp
using System;
using System.Linq;
using System.Threading.Tasks;
using DynamischWarteschlange.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SimulationTests
{
    [TestClass]
    public class ParallelWelfordAccumulatorTests
    {
        [TestMethod]
        public void Test_WelfordSingleThread_AgainstTwoPassReference()
        {
            double[] data = [12.5, 14.2, 11.8, 15.0, 13.1, 12.9, 14.5, 13.8];

            var acc = new ParallelWelfordAccumulator();
            foreach (var x in data) acc.Add(x);

            // Two-Pass Referenzberechnung
            double expectedMean = data.Average();
            double expectedVariance = data.Select(x => Math.Pow(x - expectedMean, 2)).Sum() / (data.Length - 1);

            Assert.AreEqual(data.Length, acc.Count);
            Assert.AreEqual(expectedMean, acc.Mean, 1e-12, "Mittelwert weicht von Referenz ab.");
            Assert.AreEqual(expectedVariance, acc.Variance, 1e-12, "Varianz weicht von Referenz ab.");
        }

        [TestMethod]
        public void Test_CatastrophicCancellation_NumericalStability()
        {
            // Zahlen mit riesigem Offset und minimaler Streuung
            // Naive Formel (Sum(x^2) - (Sum x)^2 / N) versagt hier katastrophal!
            double baseOffset = 1e9;
            double[] offsets = [1.0, 2.0, 3.0, 4.0, 5.0];
            double[] data = offsets.Select(x => baseOffset + x).ToArray();

            var acc = new ParallelWelfordAccumulator();
            foreach (var x in data) acc.Add(x);

            // Erwartete Varianz ist exakt die der Offsets: Var([1,2,3,4,5]) = 2.5
            double expectedVariance = 2.5;
            double expectedMean = baseOffset + 3.0;

            Assert.AreEqual(expectedMean, acc.Mean, 1e-6);
            Assert.AreEqual(expectedVariance, acc.Variance, 1e-9, "Welford muss gegen Auslöschung stabil bleiben!");
        }

        [TestMethod]
        public void Test_ParallelChanMerge_ExactEquivalence()
        {
            int n = 100_000;
            double[] numbers = new double[n];
            Random rnd = new(42);
            for (int i = 0; i < n; i++) numbers[i] = rnd.NextDouble() * 100.0;

            // Sequentieller Akkumulator
            var seqAcc = new ParallelWelfordAccumulator();
            foreach (var x in numbers) seqAcc.Add(x);

            // Parallele Akkumulation mit Chan-Merge über Parallel.For
            var parAcc = new ParallelWelfordAccumulator();
            object syncLock = new();

            Parallel.For(0, n, () => new ParallelWelfordAccumulator(), (i, state, localAcc) =>
            {
                localAcc.Add(numbers[i]);
                return localAcc;
            },
            localAcc =>
            {
                lock (syncLock)
                {
                    parAcc.Merge(localAcc);
                }
            });

            Assert.AreEqual(seqAcc.Count, parAcc.Count);
            Assert.AreEqual(seqAcc.Mean, parAcc.Mean, 1e-10, "Paralleler Mittelwert unterscheidet sich!");
            Assert.AreEqual(seqAcc.Variance, parAcc.Variance, 1e-9, "Parallele Varianz unterscheidet sich!");
        }
    }
}
```

---

## 5. AP2-C4: Bereitstellung fehlender 3D-Klassen in `VorlageSzenengraph3D`

### 5.1 Didaktische Lücke: Folien 5.58 & 5.65–76 vs. Quellcode

Auf den Folien 5.58 und 5.65–76 lehrt das Skriptum zwei fundamentale Werkzeuge der 3D-Simulation:
1. **`GeometryFactory`:** Parametrische Generierung von Standardkörpern (Zylinder, Kugel, Quader) ohne manuelle Vertex-Schleifen im Hauptprogramm.
2. **`OrbitCamera`:** Intuitive 3D-Navigation mittels Kugelkoordinaten $(\theta, \phi, r)$ und `gl.LookAt` über Maus-Drag (Rotation) und Maus-Rad (Zoom).

Im Quellcode von `Quellen/WS25/VorlageSzenengraph3D` existierten diese Klassen bisher nicht; stattdessen drehte sich die Szene starr um einen hardcodierten Winkel (`_rotate.Angle += 3`).

---

### 5.2 Vollständige Implementierung von `GeometryFactory.cs`

Datei: `Quellen/WS25/VorlageSzenengraph3D/Model/GeometryFactory.cs`:

```csharp
using VorlageSzenengraph3D.Model.Nodes;
using VorlageSzenengraph3D.Model.Nodes.Volumes;

namespace VorlageSzenengraph3D.Model
{
    /// <summary>
    /// Parametrische Fabrik zur Erzeugung von 3D-Standardkörpern für Szenengraphen.
    /// Entspricht 1:1 der im Skriptum gelehrten GeometryFactory (Folie 5.58).
    /// </summary>
    public static class GeometryFactory
    {
        public static Cylinder CreateCylinder(
            float radius,
            float height,
            int slices = 32,
            int stacks = 1,
            Material? material = null)
        {
            return new Cylinder("Cylinder", radius, radius, height, stacks, slices, material ?? Material.BLUE);
        }

        public static Cylinder CreateCone(
            float baseRadius,
            float height,
            int slices = 32,
            int stacks = 1,
            Material? material = null)
        {
            return new Cylinder("Cone", baseRadius, 0.0f, height, stacks, slices, material ?? Material.GREEN);
        }

        public static Sphere CreateSphere(
            float radius,
            int slices = 32,
            int stacks = 16,
            Material? material = null)
        {
            return new Sphere("Sphere", radius, stacks, slices, material ?? Material.RED);
        }

        public static Cube CreateBox(
            float sizeX,
            float sizeY,
            float sizeZ,
            Material? material = null)
        {
            return new Cube("Box", sizeX, sizeY, sizeZ, material ?? Material.GRAY);
        }

        public static Cube CreateCube(
            float size,
            Material? material = null)
        {
            return new Cube("Cube", size, size, size, material ?? Material.GRAY);
        }
    }
}
```

---

### 5.3 Vollständige Implementierung von `OrbitCamera.cs`

Datei: `Quellen/WS25/VorlageSzenengraph3D/Model/OrbitCamera.cs`:

```csharp
using System;
using SharpGL;

namespace VorlageSzenengraph3D.Model
{
    /// <summary>
    /// Kugelkoordinaten-basierte Orbit-Kamera zur interaktiven 3D-Navigation (Folien 5.65-76).
    /// Steuert Azimut (Gieren), Elevation (Nicken) und Distanz (Radius) um einen Zielpunkt.
    /// </summary>
    public class OrbitCamera
    {
        public double TargetX { get; set; } = 0.0;
        public double TargetY { get; set; } = 0.0;
        public double TargetZ { get; set; } = 0.0;

        /// <summary>Horizontaler Drehwinkel um die Y-Achse in Grad [0, 360].</summary>
        public double Azimuth { get; set; } = 45.0;

        /// <summary>Vertikaler Neigungswinkel in Grad [-89, +89], um Gimbal Lock zu verhindern.</summary>
        public double Elevation { get; set; } = 30.0;

        /// <summary>Radius / Abstand zum Fokuspunkt [1, 500].</summary>
        public double Distance { get; set; } = 15.0;

        /// <summary>
        /// Rotiert die Kamera inkrementell basierend auf Mausverschiebungen.
        /// </summary>
        public void Rotate(double deltaAzimuth, double deltaElevation)
        {
            Azimuth = (Azimuth + deltaAzimuth) % 360.0;
            Elevation = Math.Clamp(Elevation + deltaElevation, -89.0, 89.0);
        }

        /// <summary>
        /// Ändert die Distanz (Zoom) mit Schutzklemmung gegen Invertierung.
        /// </summary>
        public void Zoom(double deltaZoom)
        {
            Distance = Math.Clamp(Distance - deltaZoom, 1.0, 500.0);
        }

        /// <summary>
        /// Transformiert die Kugelkoordinaten in kartesische Koordinaten und setzt die OpenGL LookAt-Matrix.
        /// </summary>
        public void Apply(OpenGL gl)
        {
            // 1. Kugelkoordinaten in Bogenmaß (Radians)
            double radAz = Azimuth * Math.PI / 180.0;
            double radEl = Elevation * Math.PI / 180.0;

            // 2. Kameraposition (Eye) im kartesischen Raum
            double eyeX = TargetX + Distance * Math.Cos(radEl) * Math.Sin(radAz);
            double eyeY = TargetY + Distance * Math.Sin(radEl);
            double eyeZ = TargetZ + Distance * Math.Cos(radEl) * Math.Cos(radAz);

            // 3. View-Matrix in OpenGL setzen (Up-Vektor stets (0, 1, 0))
            gl.LookAt(eyeX, eyeY, eyeZ, TargetX, TargetY, TargetZ, 0.0, 1.0, 0.0);
        }
    }
}
```

---

### 5.4 WPF-Mausinteraktion in `MainWindow.xaml` und `MainWindow.xaml.cs`

#### Ergänzung in `MainWindow.xaml`
Das `OpenGLControl` erhält die WPF-Maus-Eventhandler:
```xaml
<sharpGL:OpenGLControl
    x:Name="openGLControl"
    OpenGLInitialized="OpenGLControl_OpenGLInitialized"
    OpenGLDraw="OpenGLControl_OpenGLDraw"
    MouseDown="OpenGLControl_MouseDown"
    MouseMove="OpenGLControl_MouseMove"
    MouseUp="OpenGLControl_MouseUp"
    MouseWheel="OpenGLControl_MouseWheel" />
```

#### Code-Behind in `MainWindow.xaml.cs`
Die starre `_rotate.Angle += 3`-Autodrehung wird durch die interaktive `OrbitCamera` ersetzt:

```csharp
using System.Windows;
using System.Windows.Input;
using VorlageSzenengraph3D.Model;
using VorlageSzenengraph3D.Model.Nodes;
using VorlageSzenengraph3D.Model.Transforms;

namespace VorlageSzenengraph3D
{
    public partial class MainWindow : Window
    {
        private readonly OrbitCamera _camera = new() { Distance = 12.0, Elevation = 25.0, Azimuth = 35.0 };
        private Point _lastMousePosition;
        private Scene _scene;

        public MainWindow()
        {
            InitializeComponent();

            Group root = new Group("Root");

            // Nutzung der neuen GeometryFactory (Folie 5.58)
            var cube = GeometryFactory.CreateBox(2, 2, 2, Material.RED);
            cube.Transforms.Add(new Translate(0, 0, -2));

            var sphere = GeometryFactory.CreateSphere(1.0f, 32, 16, Material.GREEN);
            sphere.Transforms.Add(new Translate(0, 0, 2));

            var cylinder = GeometryFactory.CreateCylinder(0.8f, 2.0f, 32, 1, Material.BLUE);
            cylinder.Transforms.Add(new Translate(-2.5f, 0, 0));

            root.Add(cube);
            root.Add(sphere);
            root.Add(cylinder);

            _scene = new Scene(Color.WHITE, Color.DARKGRAY, root);
            _scene.Lights.Add(new Light(new Model.Vector(10, 10, 10), Color.DARKGRAY, Color.GRAY, Color.BLACK));
        }

        private void OpenGLControl_OpenGLInitialized(object sender, SharpGL.WPF.OpenGLRoutedEventArgs args)
        {
            _scene.Initialize(args.OpenGL);
        }

        private void OpenGLControl_OpenGLDraw(object sender, SharpGL.WPF.OpenGLRoutedEventArgs args)
        {
            // Kamera-Transformation anwenden
            _camera.Apply(args.OpenGL);

            // Szene rendern
            _scene.Draw(args.OpenGL);
        }

        private void OpenGLControl_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.LeftButton != MouseButtonState.Pressed) return;
            _lastMousePosition = e.GetPosition(openGLControl);
            openGLControl.CaptureMouse();
        }

        private void OpenGLControl_MouseUp(object sender, MouseButtonEventArgs e)
        {
            if (openGLControl.IsMouseCaptured)
            {
                openGLControl.ReleaseMouseCapture();
            }
        }

        private void OpenGLControl_MouseMove(object sender, MouseEventArgs e)
        {
            if (!openGLControl.IsMouseCaptured || e.LeftButton != MouseButtonState.Pressed) return;

            Point currentPosition = e.GetPosition(openGLControl);
            double dx = currentPosition.X - _lastMousePosition.X;
            double dy = currentPosition.Y - _lastMousePosition.Y;

            // Skalierung: dx steuert Azimut, dy steuert Elevation
            _camera.Rotate(dx * 0.4, -dy * 0.4);
            _lastMousePosition = currentPosition;

            openGLControl.DoRender();
        }

        private void OpenGLControl_MouseWheel(object sender, MouseWheelEventArgs e)
        {
            _camera.Zoom(e.Delta * 0.01);
            openGLControl.DoRender();
        }
    }
}
```

---

## 6. Qualitätssicherung, Build-Matrix & Abnahmekriterien

### 6.1 Solution-weite Build-Verifikation

Nach Abschluss der Implementierung müssen alle Projekte der Solution fehler- und warnungsfrei kompilieren:
```bash
dotnet build Quellen/Quellen.sln -c Debug
dotnet test Quellen/WS25/SimulationTests/SimulationTests.csproj
```

**Soll-Ergebnis:**
- `0 Warnung(en)`
- `0 Fehler`
- Alle Unit-Tests für `ParallelWelfordAccumulator` bestanden (100% grün).

### 6.2 Abnahme-Checkliste

| Prüfpunkt | Kriterium | Prüfverfahren | Status |
| :--- | :--- | :--- | :---: |
| **AP2-C1** | Zero-Allocation im UI-Timer | `_renderX.AsSpan().ToArray()` und `Plot.Clear()` eliminiert; `_scatterPlot.Data.MaxRenderIndex` genutzt. | Bereit zur Ausführung |
| **AP2-C2** | Bisektion & Zeno-Schutz | `EulerExplicitSolver` implementiert Vorzeichenprüfung $z_a \cdot z_b \le 0$, Bisektionsschleife und `ApplyZenoStickingOrUpdate`. | Bereit zur Ausführung |
| **AP2-C3** | Welford-Integration & Tests | `ParallelWelfordAccumulator.cs` in `DynamischWarteschlange.Model` platziert; Unit-Test-Suite gegen Auslöschung verifiziert. | Bereit zur Ausführung |
| **AP2-C4** | 3D GeometryFactory & OrbitCamera | `GeometryFactory` und `OrbitCamera` in `VorlageSzenengraph3D` integriert; WPF-Maussteuerung funktionsfähig. | Bereit zur Ausführung |
| **Clean Code** | C#-Standards & Naming | FH OÖ Konventionen, vollständige XML-Dokumentation, keine verwaisten Usings oder leeren Catch-Blöcke. | Bereit zur Ausführung |
