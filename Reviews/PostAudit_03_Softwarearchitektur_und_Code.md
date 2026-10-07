# Post-Audit 03: Softwarearchitektur, C# & Moderne Entwurfsmuster
## Rigoroser Deep-Audit der Foliensätze (Kapitel 00–11) im Abgleich mit `Quellen/` und `SimulationMvvmPattern`

**Autor:** Spezialisierter Review-Agent für Software Engineering, C# und Systemsimulation  
**Datum:** 7. Oktober 2026  
**Ziel-Repository:** `kurs-computer-simulation` (FH Oberösterreich, Campus Wels)  
**Status nach Phase 1–4:** Signifikante Verbesserungen implementiert (Numerik-Refactoring, Zero-Alloc Solver in Hybrid, MVVM-Referenzprojekt `SimulationMvvmPattern`, Folien-Splitting); verbleibende Lücken und GC-Smells identifiziert.

---

## 1. Executive Summary & Audit-Scope

Im Rahmen dieses Post-Audits wurden sämtliche 12 Vorlesungskapitel (`Folien/00_Prolog` bis `Folien/11_Epilog`) einem systematischen, code-genauen Abgleich mit allen real existierenden Quellcode-Projekten in `Quellen/` (sowohl `WS24` als auch `WS25` inklusive des neu geschaffenen Referenzprojekts `Quellen/WS25/SimulationMvvmPattern`) unterzogen.

### Gesamtbewertung des Entwicklungsstands
Die Vorlesungsreihe hat durch die jüngsten Refactorings (Phasen 1 bis 4) einen **erheblichen qualitativen Reifungssprung** vollzogen:
1. **Referenzarchitektur etabliert:** Mit `Quellen/WS25/SimulationMvvmPattern` wurde die zentrale Lücke der Vorlesung geschlossen. Es existiert nun ein vollständiges, kompilierbares und lauffähiges MVVM-Musterprojekt unter .NET 10, das die in Kapitel 11 postulierte Entkopplung (`IContinuousModel`, `IContinuousSolver`, `MainViewModel`, `SimulationRingBuffer`, WPF-View) mustergültig vorlebt.
2. **Numerische Best Practices harmonisiert:** Die fatale Matrixinversion (`A.Inverse().Multiply(b)`) wurde in allen Projekten (`FachwerkIdeal2D`, `FachwerkIdeal3D`, `FachwerkElastisch3D`, `StatischFachwerkElastisch2D`) durch direkte Dreieckszerlegungen (`A.Solve(b)` via LU bzw. `Cholesky().Solve(rhs)`) ersetzt. Dies ist 1:1 synchron mit Folie 7.51 und 7.57.
3. **Erste Zero-Allocation-Erfolge:** In `Quellen/WS25/SFunctionHybrid` wurden der Zero-Crossing-Puffer (`ZeroCrossingsScratch`) vorallokiert und die topologische Blockausführungsreihenfolge im `EulerExplicitSolver` vorab statisch kompiliert, wodurch Tausende kurzlebiger Allokationen pro Sekunde entfallen.
4. **Build-Hygiene:** Alle Projekte der Solution `Quellen/Quellen.sln` kompilieren fehler- und warnungsfrei (0 Fehler, 0 Warnungen; die NuGet-Warnung NU1701 wurde behoben). Verwaiste Zwischendateiverzeichnisse wurden bereinigt.

### Verbleibende Kernprobleme & Dissonanzen
Trotz dieser Erfolge deckt der Deep Audit gravierende verbliebene Diskrepanzen und architektonische Schwachstellen auf:
- **Didaktische Implementierungslücken (Folien ohne Quellcode-Pendant):**
  - **Kapitel 02 (Pixel):** Kein einziges Projekt in `Quellen/` demonstriert `WriteableBitmap`, `unsafe uint*` oder Ping-Pong-Puffer.
  - **Kapitel 03 (Vektor):** Die auf den Folien gezeigte Klasse `CoordinateTransformer` und das High-Performance-Control `VisualHost` existieren nicht im Quellcode; stattdessen nutzt `FachwerkIdeal2D` eine ad-hoc Projektion im Code-Behind.
  - **Kapitel 05 (3D):** Die auf Folie 5.58 gelehrte `GeometryFactory` sowie die interaktive `OrbitCamera` (Folien 5.65–76) fehlen in `VorlageSzenengraph3D` vollständig.
- **Konzeptioneller Widerspruch im Hybrid-Solver (Kapitel 10):** Während die Folien 10.47–50 die naive Schrittweitenhalbierung als instabil kritisieren und echte Intervall-Bisektion sowie Zeno-Schwellen präsentieren, nutzt der reale Solver in `SFunctionHybrid/EulerExplicitSolver.cs` weiterhin die naive Schrittweitenhalbierung (`timeStep /= 2`), die bei abklingenden Hüpfbewegungen abstürzt.
- **Versteckter GC-Druck im 60-FPS-Rendering (`SimulationMvvmPattern`):** In `MainWindow.xaml.cs` des MVVM-Projekts wird im Timer-Tick (16 ms) jedes Mal `_renderX.AsSpan(0, count).ToArray()` ausgeführt und der Scatter-Plot komplett abgerissen und neu erzeugt (`Plot.Clear()` + `Plot.Add.Scatter`). Bei 60 FPS erzeugt dies 120 Heap-Allokationen pro Sekunde – im direkten Widerspruch zu Folie 4.27 (`Signal`-Plot mit In-Place-Puffer).
- **Inkonsistentes Refactoring im S-Function-Framework:** Während `SFunctionHybrid` von der statischen Ausführungsreihenfolge profitiert, besitzen alle 6 Solver in `SFunctionContinuous` sowie der `EulerImplicitSolver` in `SFunctionHybrid` weiterhin die rechenintensive, allozierende topologische Suchschleife (`List<Block> open = [.. Blocks]` mit linearem `open.RemoveAt(i--)`) bei jedem einzelnen Zeitschritt.
- **Verwaiste Datei & Namespace-Inkonsistenzen:** `ParallelWelfordAccumulator.cs` liegt lose und unkompiliert im Ordner `Quellen/WS25/`. Die Projekte `FachwerkIdeal2D`, `FachwerkIdeal3D` und `FachwerkElastisch3D` deklarieren veraltete Namespaces (`IdealesFachwerk2D.Model` etc.).

---

## 2. Detaillierter Synchronizitäts-Abgleich: Folien vs. Quellcode

Die folgende Matrix dokumentiert den Synchronizitätsgrad aller 12 Kapitel mit den Klassen, Signaturen und Typen des realen Codes:

| Kapitel | Titel | Code auf Folien? | Reales Projekt in `Quellen/` | Synchronizitäts-Grad | Konkrete Diskrepanzen / Befund |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **00** | Prolog | Nein | - | **N/A** | Reine Organisations- und Einführungsinhalte. |
| **01** | Einführung | Nein | - | **N/A** | Begriffsdefinitionen, Formalismen, Klassifikation. |
| **02** | Visualisierung 2D Pixel | Ja | *Kein Projekt vorhanden* | ⚠️ **40% (Ghost Code)** | Folien zeigen vollständigen Code (`SimulationsApp.MainWindow`, `UpdatePixelFast`, `ColorMaps` LUT, `RenderToBitmap`). In `Quellen/` existiert **kein** Projekt mit `WriteableBitmap` oder Pixel-Puffern. Studierende können den Code nicht ausführen. |
| **03** | Visualisierung 2D Vektor | Ja | `WS25/FachwerkIdeal2D`<br>`WS24/VorlageVisualisierung2D` | ⚠️ **50% (Divergenz)** | Folien lehren `CoordinateTransformer` und `GetArrowhead(tip, dir, len, w)`. `FachwerkIdeal2D` nutzt stattdessen eine ad-hoc Methode `ProjectNode` und `AddArrowHead(line, color)` fest im Code-Behind. `VisualHost` fehlt im Code. |
| **04** | Visualisierung 2D Diagramme | Ja | `WS25/SimulationMvvmPattern`<br>`WS25/SimscapeSharp` | 🟢 **90% (Hoch)** | ScottPlot 5 Syntax (`Plot.Add.Signal`, `Plot.Axes.AutoScale`) und MSAGL Graph-Aufbau stimmen überein. Folie 26 zeigt simples `Array.Copy` für Ringpuffer; `SimulationRingBuffer.cs` ist deutlich mächtiger (echtes Unwrapping via `CopySnapshot`). |
| **05** | Visualisierung 3D OpenGL | Ja | `WS25/VorlageSzenengraph3D`<br>`WS25/VorlageVisualisierung3D` | ⚠️ **65% (Lücken)** | Basis-Setup (Folien 6–21) und Primitive (Folien 23–27) stimmen 1:1 mit `VorlageVisualisierung3D` überein. **Aber:** Folie 58 zeigt `SimulationEngine.Graphics3D.GeometryFactory` und Folien 65–76 zeigen `OrbitCamera` mit WPF Mouse-Drag; beides existiert in `Quellen/` nicht. |
| **06** | Multithreading | Ja | `WS25/SimulationMvvmPattern` | 🟢 **95% (Exzellent)** | Konzepte (`Task.Run`, `IProgress<T>`, `CancellationTokenSource`, `lock`) stimmen exakt mit `MainViewModel.cs` überein. Folien nutzen didaktisch vereinfachten Code-Behind-Stil (`Start_Click`), Quellcode nutzt modernes MVVM (`[RelayCommand]`). |
| **07** | Statische Modelle | Ja | `WS25/FachwerkIdeal2D / 3D`<br>`WS25/FachwerkElastisch3D` | 🟢 **90% (Sehr gut)** | LGS-Löser (`A.Solve(b)` und `Cholesky().Solve(rhs)`) sind 1:1 synchron. Datenstrukturen (`Node`, `Rod`, `Truss`) stimmen überein; Folie 56 lässt bei `AddNode` lediglich den `name`-Parameter weg. Namespace-Fehlstellung im Code (`IdealesFachwerk2D`). |
| **08** | Dyn. Mod. Kontinuierlich | Ja | `WS25/SFunctionContinuous`<br>`WS25/SimulationMvvmPattern` | 🟢 **95% (Exzellent)** | Block-Hierarchie (`Block`, `Model`, `Connection`, `ConstantBlock`, `IntegrateBlock`) stimmt 1:1 mit `SFunctionContinuous` überein. `RungeKutta4Solver` auf Folien 75–76 ist blockbasiert; `SimulationMvvmPattern` bietet ergänzend ein zustandsbasiertes RK4. |
| **09** | Dyn. Mod. Diskret | Ja | `WS24/DynamischWarteschlange`<br>`WS25/ParallelWelfordAccumulator` | 🟢 **85% (Gut)** | `State`, `Event`, `ArrivalEvent`, `DepartureEvent`, `Simulation` stimmen 1:1 mit WS24 überein. `ParallelWelfordAccumulator` stimmt exakt mit der losen Datei überein (liegt aber verwaist ohne Projektbindung in `WS25/`). |
| **10** | Dyn. Mod. Hybrid | Ja | `WS25/SFunctionHybrid` | ⚠️ **70% (Konflikt)** | Block- und SampleTime-Hierarchie stimmt 1:1 überein. **Kritische Diskrepanz:** Folien 49–50 zeigen Bisektion und Zeno-Handling; der Quellcode in `EulerExplicitSolver.cs` verwendet weiterhin die alte naive Schrittweitenhalbierung (`timeStep /= 2`). |
| **11** | Epilog | Ja | `WS25/SimulationMvvmPattern` | 🟡 **80% (Signatur-Delta)** | Folie 23 zeigt `IContinuousModel` mit `int StateDimension` und `double[] x, double[] u, double[] dxdt`. `SimulationMvvmPattern` nutzt modernstes C# mit `int StateCount` und `ReadOnlySpan<double> x, Span<double> dxdt` (Zero-Alloc). |

---

## 3. Architektur- & Designmuster-Analyse

### 3.1 Das MVVM-Paradigma & UI-Entkopplung

#### Referenzimplementierung `SimulationMvvmPattern`
Das in Phase 3 hinzugefügte Projekt `Quellen/WS25/SimulationMvvmPattern` setzt die "Goldene Regel der Simulationsarchitektur" (Folie 11.23) auf Hochschul- und Industrieniveau um:
- **Model:** [`IContinuousModel.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SimulationMvvmPattern/Model/IContinuousModel.cs) definiert ein zustandsbasiertes DGL-System ohne jede UI- oder Solver-Bindung. [`MassSpringDamperModel.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SimulationMvvmPattern/Model/MassSpringDamperModel.cs) berechnet die Ableitungen allokationsfrei über `ReadOnlySpan<double>` und `Span<double>`.
- **Solver:** [`RungeKutta4Solver.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SimulationMvvmPattern/Model/RungeKutta4Solver.cs) implementiert [`IContinuousSolver.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SimulationMvvmPattern/Model/IContinuousSolver.cs) mit vorallokierten Stufenpuffern ($k_1 \dots k_4$, $x_{temp}$).
- **ViewModel:** [`MainViewModel.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SimulationMvvmPattern/ViewModel/MainViewModel.cs) nutzt das `CommunityToolkit.Mvvm` (`ObservableObject`, `[ObservableProperty]`, `[RelayCommand]`), besitzt keinerlei Referenzen auf `System.Windows` oder ScottPlot und steuert den Hintergrund-Worker via `Task.Run`, `CancellationTokenSource` und `Progress<SimulationTelemetry>`.
- **View:** [`MainWindow.xaml`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SimulationMvvmPattern/MainWindow.xaml) bindet Steuerelemente via `{Binding ...}` an; die Code-Behind-Datei [`MainWindow.xaml.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SimulationMvvmPattern/MainWindow.xaml.cs) beschränkt sich rein auf die View-Projektion.

#### Status der Bestands-Projekte
- **`Quellen/WS24/`:** `DynamischBallwurf1D`, `DynamischFederpendel1D` und `VorlageVisualisierung2D` sind reine "Smart-UI"-Monolithen. Sämtliche Mathematik, Zeitschleifen und UI-Aufrufe liegen unstrukturiert im Konstruktor von `MainWindow.xaml.cs`.
- **`Quellen/WS25/Fachwerk*`:** Die Domänenmodelle (`Truss`, `Node`, `Rod`) sind mathematisch gekapselt, jedoch übernimmt `MainWindow.xaml.cs` die Koordinatentransformation, Farbcodierung und XAML-Elementgenerierung in monolithischen Methoden von bis zu 250 Zeilen.

---

### 3.2 Thread-Sicherheit, Asynchronität & Live-Streaming

#### Vorbildliche Synchronisation im ViewModel
In `MainViewModel.cs` wird die asynchrone Entkopplung mustergültig demonstriert:
```csharp
[RelayCommand(CanExecute = nameof(CanStart))]
private async Task StartAsync()
{
    ...
    var progress = new Progress<SimulationTelemetry>(telemetry =>
    {
        CurrentTime = telemetry.CurrentTime;
        CurrentPosition = telemetry.Position;
        CurrentVelocity = telemetry.Velocity;
        StepCount = telemetry.StepCount;
    });

    await Task.Run(() => RunWorkerLoop(_cts.Token, progress, dt, t0, x0, v0, initialSteps));
}
```
Die UI bleibt jederzeit reaktiv; Abbruchsignale werden atomar über `_cts.Cancel()` übertragen.

#### Datenstrom-Pufferung mit `SimulationRingBuffer`
[`SimulationRingBuffer.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SimulationMvvmPattern/Model/SimulationRingBuffer.cs) schützt seine internen Arrays (`_times`, `_values`) konsequent über `lock (_lock)`. Die Methode `CopySnapshot(Span<double> targetTimes, Span<double> targetValues)` realisiert eine atomare, chronologisch entrollte Kopie des zirkulären Speichers:
```csharp
int start = (_head - _count + Capacity) % Capacity;
for (int i = 0; i < copyCount; i++)
{
    int idx = (start + i) % Capacity;
    targetTimes[i] = _times[idx];
    targetValues[i] = _values[idx];
}
```
Dadurch entfallen Locks auf dem UI-Thread während des eigentlichen Renderings.

#### ⚠️ Schwerer GC-Smell im UI-Render-Timer von `SimulationMvvmPattern`
Obwohl der Kern allokationsfrei ist, zerstört die View-Implementierung in [`MainWindow.xaml.cs` (Zeilen 47–56)](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SimulationMvvmPattern/MainWindow.xaml.cs#L47-L56) das Zero-Allocation-Versprechen:
```csharp
private void OnRenderTick(object? sender, EventArgs e)
{
    ...
    int count = _vm.Buffer.CopySnapshot(_renderX, _renderY);
    if (count > 1)
    {
        // FATAL: Zwei neue Heap-Arrays bei JEDEM Tick (16 ms -> 60 FPS = 120 Allokationen/s!)
        double[] xs = _renderX.AsSpan(0, count).ToArray();
        double[] ys = _renderY.AsSpan(0, count).ToArray();

        // FATAL: Abriss und Neuaufbau des Plottables pro Frame!
        TrajectoryPlot.Plot.Clear();
        _scatterPlot = TrajectoryPlot.Plot.Add.Scatter(xs, ys);
        _scatterPlot.LineWidth = 2;
        _scatterPlot.Color = new ScottPlot.Color(0, 90, 156);
        TrajectoryPlot.Plot.Axes.AutoScale();
        TrajectoryPlot.Refresh();
    }
}
```
**Bewertung:**
1. `.ToArray()` allokiert bei 60 FPS jede Sekunde 120 Managed Arrays im Gen-0-Heap.
2. `Plot.Clear()` und `Plot.Add.Scatter` allokieren interne ScottPlot-Strukturen und zwingen ScottPlot zur Neukompilierung der Render-Pipeline.
3. **Didaktischer Widerspruch:** Auf Folie 4.27 wird gezeigt, wie man ein `Signal`-Objekt einmalig anlegt (`WpfPlot1.Plot.Add.Signal(_renderCopy)`) und beim Tick lediglich den Speicher aktualisiert und `Refresh()` aufruft.

---

### 3.3 Zero-Allocation & GC-Vermeidung in Simulationskernen

Die Vermeidung von Garbage-Collection-Latenzen ist eine Kernkompetenz im Software-Engineering digitaler Zwillinge. Die Analyse zeigt Licht und Schatten:

```
Stand der Zero-Allocation-Optimierung
├── 🟢 Gelöst: SFunctionHybrid Zero-Crossing-Puffer (ZeroCrossingsScratch)
├── 🟢 Gelöst: SFunctionHybrid EulerExplicitSolver (Vorkompilierte Block-Reihenfolge)
├── 🟢 Gelöst: SimulationMvvmPattern (RK4-Stufen und Model-Spans)
├── ❌ Offen: SFunctionContinuous (Alle 6 Solver mit [.. Blocks] und RemoveAt im Zeitschritt)
├── ❌ Offen: SFunctionHybrid EulerImplicitSolver (Noch immer [.. Blocks])
├── ❌ Offen: SharpGL 3D (Primitive.cs allokiert 3 float[] pro Vertex pro Frame)
└── ❌ Offen: SimulationMvvmPattern View (ToArray() im 16-ms-Timer)
```

#### A. Verbliebener Mangel in `Quellen/WS25/SFunctionContinuous`
In allen sechs Solvern ([`EulerExplicitSolver.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SFunctionContinuous/Framework/Solvers/EulerExplicitSolver.cs#L48-L86), `EulerImplicitSolver.cs`, `EulerExplicitLoopSolver.cs`, `EulerImplicitLoopSolver.cs`, `HeunSolver.cs`, `RungeKutta4Solver.cs`) wird in `CalculateOutputs(double time)` bei jedem Zeitschritt folgendes Konstrukt ausgeführt:
```csharp
List<Block> open = [.. Blocks]; // Heap-Allokation bei JEDEM Zeitschritt!
while (open.Count > 0)
{
    ...
    open.RemoveAt(i--); // O(N) Array-Shift bei JEDEM Block!
}
```
Bei einer kontinuierlichen Simulation mit $dt = 1\,\text{ms}$ und $t_{max} = 10\,\text{s}$ (10.000 Schritte) erzeugt dies mindestens 10.000 unnötige `List<Block>`-Instanzen sowie zehntausende interne Array-Verschiebungen.

#### B. Massiver GC-Druck im 3D-Rendering (`VorlageSzenengraph3D`)
In [`Quellen/WS25/VorlageSzenengraph3D/Model/Nodes/Primitive.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/VorlageSzenengraph3D/Model/Nodes/Primitive.cs#L48-L53):
```csharp
gl.Begin(_beginMode);
for (int i = 0; i < _vertices.Count; i++)
{
    _materials[i].Apply(gl);
    _normals[i].Apply(gl);
    _vertices[i].Apply(gl);
}
gl.End();
```
`_materials[i].Apply(gl)` ruft [`Color.Array()`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/VorlageSzenengraph3D/Model/Color.cs#L37) auf:
```csharp
public float[] Array() => new float[] { Red, Green, Blue, Alpha };
```
Bei 1.000 Dreiecken (3.000 Vertices) entstehen bei 60 FPS:
$$3.000 \times 3 \times 60 = 540.000\text{ Heap-Allokationen pro Sekunde!}$$
Zusätzlich ist der Wechsel von Beleuchtungs- und Materialparametern pro Vertex innerhalb von `glBegin/glEnd` ein massiver GPU-Pipeline-Stall.

---

## 4. Bibliotheksverwendung: Aktualität & Konformität

### 4.1 ScottPlot 5
- **Status:** Vorbildlich migriert. Sämtliche Altlasten von ScottPlot 4 wurden entfernt. Die Folien in Kapitel 4 sowie `SimulationMvvmPattern` und `DynamischWarteschlange` nutzen konsequent ScottPlot 5.
- **Optimierungspotenzial:** Zur Live-Visualisierung dynamischer Ströme sollte in WPF bevorzugt `Plot.Add.Signal` oder `Plot.Add.SignalXY` mit fest angebundenem Puffer anstelle von dynamischem `Plot.Add.Scatter` genutzt werden.

### 4.2 Math.NET Numerics
- **Status:** Vollständig saniert. In allen Fachwerk-Projekten (`StatischFachwerkIdeal2D`, `StatischFachwerkElastisch2D`, `FachwerkIdeal2D`, `FachwerkIdeal3D`, `FachwerkElastisch3D`) wurden die veralteten `Inverse()`-Methoden eliminiert.
- **Numerische Eleganz:** 
  - Ideales Fachwerk: `Vector<double> x = A.Solve(b);` (LU-Zerlegung mit $O(\frac{2}{3} n^3)$).
  - Elastisches Fachwerk: Cholesky-Zerlegung $LL^T$ (`kBB.Cholesky().Solve(rhs)`) mit robustem Fallback auf LU (`kBB.LU().Solve(rhs)`). Entspricht exakt Folie 7.51 und 7.57.

### 4.3 MSAGL (Microsoft Automatic Graph Layout)
- **Status:** Sauber eingebunden. In `Quellen/WS25/SimscapeSharp/MainWindow.xaml.cs` wird MSAGL genutzt, um Komponenten- und Knotengraphen von elektrischen Schaltkreisen hierarchisch darzustellen.
- **Didaktik:** Kapitel 4 (Folien 4.30–34) exemplifiziert die Erkennung und rote Markierung von Rückkopplungen (algebraischen Schleifen), was die Brücke von der Graphentheorie zur DGL-Numerik perfekt schlägt.

### 4.4 SharpGL & OpenGL-Pipeline
- **Status:** Funktional, aber technologisch veraltet. SharpGL basiert auf OpenGL 1.1 / Fixed-Function (Immediate Mode mit `glBegin`/`glEnd`, Matrix-Stack).
- **Zukunftsperspektive:** Für die Vermittlung moderner Grafik-Pipelines (.NET 8/10) sollte mittelfristig eine Migration auf moderne Shader-Pipelines via **Silk.NET** vorbereitet werden.

---

## 5. Detaillierte Mängel- & Code-Smell-Analyse

### 5.1 Didaktische Divergenz: Naive Schrittweitenhalbierung vs. Bisektion
In [Kapitel 10 (Folien 47–50)](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Folien/10_Dynamische_Modelle_Hybrid/Folien.md#L47-L50) wird ausführlich begründet, warum die naive Schrittweitenhalbierung versagt (Zeno-Phänomen, unendliche Halbierungen beim Stoß) und stattdessen eine Intervall-Bisektion mit Zeno-Schwelle gelehrt:
```csharp
// Folie 10.49: Robuste Intervall-Bisektion
double tLeft = time, tRight = time + timeStep, tMid = tRight;
while ((tRight - tLeft) > TimeTol && Math.Abs(zMid) > ZeroTol) {
    tMid = 0.5 * (tLeft + tRight);
    ...
}
```
In [`Quellen/WS25/SFunctionHybrid/Framework/Solvers/EulerExplicitSolver.cs` (Zeilen 122–148)](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SFunctionHybrid/Framework/Solvers/EulerExplicitSolver.cs#L122-L148) ist jedoch noch die alte Logik aktiv:
```csharp
while (zeroCrossingValue > ZeroCrossingValueThreshold && zeroCrossingIterationCount++ < ZeroCrossingIterationCountLimit)
{
    timeStep /= 2; // Naive Halbierung
    RestoreInternalVariables();
    IntegrateContinuousStates(timeStep);
    CalculateOutputs(time + timeStep);
    zeroCrossingValue = CalculateZeroCrossings(time + timeStep);
}
```
Sobald der Zähler das Limit erreicht, bricht das Programm mit `throw new Exception("Nulldurchgang nicht gefunden")` ab. Das reale System bricht somit bei Bouncing-Ball-Szenarien reproduzierbar ab.

### 5.2 Fehlende Referenzprojekte für Kapitel 02 & 03
Studierende finden im Ordner `Quellen/` keinen Code zu:
1. `WriteableBitmap`, `unsafe uint*`, Stride-Rechnung und Parallel-Pixel-Rendering (Kapitel 02).
2. `CoordinateTransformer` und WPF-Vektorgrafik-Host (`DrawingVisual` / `VisualHost`) (Kapitel 03).

### 5.3 Fehlende Klassen in `Quellen/WS25/VorlageSzenengraph3D`
1. **`OrbitCamera` (Folien 5.65–76):** Auf 12 Folien wird die mathematische Herleitung und C#-Implementierung einer interaktiven Kugelkoordinaten-Kamera erklärt. In `Quellen/WS25/VorlageSzenengraph3D/` existiert keine Kameraklasse; dort dreht sich die Szene fest um einen hardcodierten Winkel (`_rotate.Angle += 3`).
2. **`GeometryFactory` (Folie 5.58):** Die Klasse mit parametrischen Generatoren für Zylinder, Kegel und Zahnräder ist auf der Folie abgedruckt, fehlt aber im Repository.

### 5.4 Verwaiste Artefakte & Namespace-Inkonsistenzen
1. **`Quellen/WS25/ParallelWelfordAccumulator.cs`:** Die Datei liegt lose auf oberster Ebene von `WS25/`, gehört zu keinem `.csproj` und wird beim Build ignoriert. Sie sollte in ein gemeinsames Utilities-Projekt oder nach `WS24/DynamischWarteschlange/Model/` verschoben werden.
2. **Namespace-Fehlstellungen in WS25:**
   - In `Quellen/WS25/FachwerkIdeal2D/Model/Truss.cs`: `namespace IdealesFachwerk2D.Model`
   - In `Quellen/WS25/FachwerkIdeal3D/Model/Truss.cs`: `namespace IdealesFachwerk3D.Model`
   - In `Quellen/WS25/FachwerkElastisch3D/Model/Truss.cs`: `namespace ElastischesFachwerk3D.Model`
   Die Ordner- und Projektnamen heißen jedoch `FachwerkIdeal2D`, `FachwerkIdeal3D`, `FachwerkElastisch3D`.
3. **Kuriose Usings & Kommentare in `WS24/DynamischFederpendel1D`:**
   - Zeile 1: `using OpenTK.Graphics.ES20;` (in einem 2D-ScottPlot-Projekt!)
   - Zeile 3: `using System.CodeDom;`
   - Zeile 89 & 112: `// Startzustand - implizit + Newton` – Hier wird fälschlicherweise eine Banach-Fixpunktiteration (`guess = dataAIN[i]`) als Newton-Verfahren bezeichnet.

---

## 6. Schweregrade & Handlungsoptionen

Die identifizierten Befunde werden nach Schweregrad klassifiziert und mit konkreten Lösungsansätzen sowie Aufwand-Nutzen-Bewertungen versehen.

```
Klassifikationsmatrix
├── [KRITISCH] P1.1: 60-FPS GC-Allokation in SimulationMvvmPattern MainWindow.xaml.cs
├── [KRITISCH] P1.2: Divergenz bei Nulldurchgangssuche (Naive Halbierung vs. Bisektion)
├── [MITTEL]   P2.1: Fehlende Code-Projekte für Kapitel 02 (Pixel) und 03 (Vektor)
├── [MITTEL]   P2.2: Fehlende OrbitCamera und GeometryFactory in VorlageSzenengraph3D
├── [MITTEL]   P2.3: Ausstehendes Zero-Allocation-Refactoring in SFunctionContinuous
├── [MITTEL]   P2.4: Material-Array-Allokationen in VorlageSzenengraph3D (Primitive.cs)
├── [GERING]   P3.1: Signatur-Angleichung in Folie 11.23 (Span vs. Array)
├── [GERING]   P3.2: Bereinigung der losen Datei ParallelWelfordAccumulator.cs
├── [GERING]   P3.3: Korrektur der Namespaces in Fachwerk-Projekten (WS25)
└── [GERING]   P3.4: Bereinigung der Usings und Newton-Kommentare in DynamischFederpendel1D
```

### Priorität 1: Kritisch (Unmittelbarer Handlungsbedarf)

#### P1.1: Beseitigung der 60-FPS-Allokationen in `SimulationMvvmPattern`
- **Problem:** `_renderX.AsSpan(0, count).ToArray()` und `Plot.Clear()` + `Plot.Add.Scatter` im Timer-Tick.
- **Lösung:** Einmalige Initialisierung eines festen Plots und Aktualisierung über `Data.Period` oder In-Place-Span-Kopie ohne `ToArray()`.
- **Aufwand:** 30 Minuten | **Nutzen:** Hoch (Stellt Zero-Allocation im Vorzeige-Projekt sicher).
- **Code-Korrektur:**
  ```csharp
  // In MainWindow.xaml.cs
  // 1. Initialisierung einmalig im Konstruktor:
  _scatterPlot = TrajectoryPlot.Plot.Add.Scatter(_renderX, _renderY);
  
  // 2. Im Timer-Tick: Keine Allokationen, kein Plot.Clear()!
  private void OnRenderTick(object? sender, EventArgs e)
  {
      int count = _vm.Buffer.CopySnapshot(_renderX, _renderY);
      if (count > 1)
      {
          // ScottPlot-Pufferlänge anpassen oder SignalXY nutzen
          TrajectoryPlot.Plot.Axes.AutoScale();
          TrajectoryPlot.Refresh();
      }
  }
  ```

#### P1.2: Harmonisierung des Hybrid-Solvers auf echte Bisektion & Zeno-Schutz
- **Problem:** `SFunctionHybrid/EulerExplicitSolver.cs` verwendet naive Schrittweitenhalbierung und stürzt bei Zeno-Effekten ab, obwohl Folien 10.49–50 die Bisektion fordern.
- **Lösung:** Implementierung des Bisektions-Algorithmus aus Folie 10.49 in `EulerExplicitSolver.cs`.
- **Aufwand:** 2 Stunden | **Nutzen:** Sehr hoch (Verhindert Simulationsabbrüche bei Kontaktmechanik).

---

### Priorität 2: Mittel (Mittelfristige Qualitätsverbesserung)

#### P2.1: Erstellung von zwei kompakten Übungsprojekten für Kapitel 02 & 03
- **Problem:** Folien 02 und 03 besitzen keine realen Pendants in `Quellen/`.
- **Lösung:**
  - Hinzufügen von `Quellen/WS25/BeispielPixelHeatmap` (`WriteableBitmap`, `unsafe uint*`, Viridis-LUT).
  - Hinzufügen von `Quellen/WS25/BeispielVektorCanvas` (`CoordinateTransformer`, `VisualHost`, Pan & Zoom).
- **Aufwand:** 3 Stunden | **Nutzen:** Hoch (Lückenlose Vorlesungsbegleitung).

#### P2.2: Ergänzung der `OrbitCamera` in `VorlageSzenengraph3D`
- **Problem:** Folien 5.65–76 präsentieren `OrbitCamera` detailliert, im Quellcode dreht sich die Szene jedoch starr.
- **Lösung:** Hinzufügen der Datei `OrbitCamera.cs` zu `VorlageSzenengraph3D` und Anbindung an die WPF-Mausereignisse in `MainWindow.xaml.cs`.
- **Aufwand:** 1 Stunde | **Nutzen:** Hoch (Interaktivität der 3D-Lehre).

#### P2.3: Übertragung der vorkompilierten Ausführungsreihenfolge auf `SFunctionContinuous`
- **Problem:** Alle Solver in `SFunctionContinuous` sortieren die Topologie in jedem Zeitschritt via `open.RemoveAt(i--)` neu.
- **Lösung:** Die Methode `CompileExecutionOrder()` aus `SFunctionHybrid/EulerExplicitSolver.cs` in die Basisklasse `SFunctionContinuous.Framework.Solver` heben und `CalculateOutputs` dort einheitlich und allokationsfrei implementieren.
- **Aufwand:** 1.5 Stunden | **Nutzen:** Sehr hoch (Eliminiert Code-Duplikation über 6 Solver und vervielfacht die Rechengeschwindigkeit).

#### P2.4: Zero-Allocation Material-Pipeline in `VorlageSzenengraph3D`
- **Problem:** `Color.Array()` allokiert `new float[4]` pro Vertex bei jedem Frame.
- **Lösung:** Vorallokation eines wiederverwendbaren `float[4]`-Feldes in `Color` oder `Material` bzw. Übergabe via `Span<float>`.
- **Aufwand:** 45 Minuten | **Nutzen:** Hoch (Beseitigt >500.000 Allokationen/s im 3D-Renderloop).

---

### Priorität 3: Gering / Kosmetisch (Repository-Hygiene & Feinschliff)

#### P3.1: Folien-Aktualisierung in Kapitel 11 (Folie 23)
- **Problem:** Folie 11.23 zeigt `IContinuousModel` mit `double[] x, double[] u, double[] dxdt`, während `SimulationMvvmPattern` das überlegene `ReadOnlySpan<double> x, Span<double> dxdt` nutzt.
- **Lösung:** Folientext an das moderne Span-Design anpassen, um den Studierenden modernes Zero-Allocation-C# vorzuleben.
- **Aufwand:** 15 Minuten | **Nutzen:** Mittel.

#### P3.2: Einbindung von `ParallelWelfordAccumulator.cs`
- **Problem:** Datei liegt ungenutzt im Ordner `WS25/`.
- **Lösung:** Datei in `Quellen/WS24/DynamischWarteschlange/Model/` integrieren und dort im Monte-Carlo-Lauf aufrufen.
- **Aufwand:** 20 Minuten | **Nutzen:** Mittel.

#### P3.3: Namensraum-Bereinigung in `Quellen/WS25/Fachwerk*`
- **Problem:** Veraltete Namespaces `IdealesFachwerk2D`, `IdealesFachwerk3D`, `ElastischesFachwerk3D`.
- **Lösung:** Globales Umbenennen auf `FachwerkIdeal2D`, `FachwerkIdeal3D`, `FachwerkElastisch3D`.
- **Aufwand:** 15 Minuten | **Nutzen:** Gering.

#### P3.4: Bereinigung in `WS24/DynamischFederpendel1D`
- **Problem:** Unnötige Usings (`OpenTK`, `CodeDom`) und irreführende Kommentare ("Newton").
- **Lösung:** Entfernen der Usings; Umbenennen des Kommentars zu `// Startzustand - implizit + Banach-Fixpunktiteration`.
- **Aufwand:** 10 Minuten | **Nutzen:** Gering.

---

## 7. Fazit & Gesamtfahrplan

Das Vorlesungsmaterial „Systemsimulation / Digitaler Zwilling“ bewegt sich inhaltlich und konzeptionell auf **Spitzenniveau**. Die in den vorangegangenen Phasen umgesetzten Verbesserungen (insbesondere das moderne MVVM-Musterprojekt `SimulationMvvmPattern`, die vollständige Umstellung auf `A.Solve(b)` und die Vorkompilierung der Block-Topologie in `SFunctionHybrid`) haben die größten architektonischen Schwachstellen der Erstbegutachtung bereits beseitigt.

Mit der Umsetzung der in diesem Post-Audit priorisierten Maßnahmen – allen voran die Beseitigung der verbliebenen 60-FPS-Timer-Allokationen in der View, die Vereinheitlichung der Bisektion im Hybrid-Solver und die Ergänzung der praktischen Übungsprojekte für Kapitel 02, 03 und 05 – wird der Vorlesungskorpus einen **vollständig konsistenten, industriereifen State-of-the-Art-Standard** über alle 12 Kapitel und Begleitprojekte hinweg erreichen.
