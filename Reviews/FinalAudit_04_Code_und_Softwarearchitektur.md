# Final Audit 04: C# Software-Engineering, Code-Snippets & Architektur-Synchronizität

**Auditor:** Spezialisierter Review-Agent für C#, Softwarearchitektur & Systemsimulation  
**Datum:** 7. Oktober 2026  
**Ziel-Repository:** `kurs-computer-simulation` (FH Oberösterreich, Campus Wels)  
**Status:** Abgeschlossen – Rigoroser Deep Audit aller 13 Foliensätze und aller Quellcode-Projekte in `Quellen/` (WS24 & WS25)

---

## 1. Executive Summary & Audit-Ergebnis

Dieser Final Audit bewertet die Vorlesungsreihe aus der Perspektive des modernen **C# Software-Engineerings (.NET 8 / .NET 10)**, der **Architektur- und Didaktik-Synchronizität** zwischen den Vorlesungsfolien und dem realen Quellcode in `Quellen/`, sowie der Einhaltung aller formalen **Folien-Code-Restriktionen**.

### Gesamtergebnis & Quantitative Bewertung: **9.0 / 10 (Exzellent)**
Die Software- und Code-Basis hat durch die jüngsten Refactorings ein industrietaugliches Hochschulniveau erreicht. 
- Sämtliche Projekte in `Quellen/Quellen.sln` kompilieren fehler- und warnungsfrei (**0 Fehler, 0 Warnungen**).
- Alle 14 Unit- und Integrationstests in `Quellen/WS25/SimulationTests` laufen erfolgreich durch (**14/14 Bestanden**).
- Die formalen Folien-Restriktionen bezüglich Zeilenanzahl und Zeilenlänge werden **ausnahmslos zu 100 % eingehalten**.
- Zentrale architektonische Meilensteine wurden erfolgreich umgesetzt:
  1. **Zero-Allocation im UI-Rendering:** `SimulationMvvmPattern` nutzt nun In-Place Scatter-Plotting via `MinRenderIndex`/`MaxRenderIndex` ohne Allokationen im 60-FPS-Timer.
  2. **Strikte Trennung im MVVM-Paradigma:** Reine mathematische Physikmodelle ohne UI-Kopplung (`IContinuousModel`, `IContinuousSolver`), ViewModel mit `CommunityToolkit.Mvvm` (`[RelayCommand]`, `[ObservableProperty]`) und lock-freier bzw. gekapselter Pufferübertrag (`SimulationRingBuffer`).
  3. **Numerische Robustheit:** Vollständige Beseitigung aller Matrixinversionen zugunsten von $A\cdot x = b$ Zerlegungen (`A.Solve(b)` und Cholesky $LL^T$ `kBB.Cholesky().Solve()`).
  4. **Stabile Hybrid-Simulation:** Echte Intervall-Bisektion bei Nulldurchgängen sowie energetische Haftschwellen (`StickingVelocityThreshold`) im `EulerExplicitSolver` zur Beherrschung des Zeno-Effekts.
  5. **Numerisch stabiler Welford-Akkumulator:** 1-Pass-Varianz und parallele Chan-Merge-Formel in `DynamischWarteschlange`.

---

## 2. Prüfung der Folien-Restriktionen (Code-Metriken)

Alle 13 Vorlesungskapitel (`Folien/00_Prolog` bis `Folien/11_Epilog` inklusive Anhang) wurden automatisiert auf die Einhaltung der Layout- und Code-Vorgaben analysiert:

| Metrik | Vorgabe | Ist-Zustand | Status | Bemerkung |
| :--- | :---: | :---: | :---: | :--- |
| **Max. Zeilen pro Codeblock** | $\le 16$ | **Max. 16 Zeilen** | 🟢 **100% Konform** | 150 von 150 Codeblöcken eingehalten. |
| **Max. Zeilenbreite** | $\le 80$ Zeichen | **Max. 80 Zeichen** | 🟢 **100% Konform** | Kein Zeilenumbruch-Overflow. |
| **Sprachbezeichner gesetzt** | Ja | **100% gesetzt** | 🟢 **Konform** | 145× `csharp`, 2× `xaml`, 3× `mermaid`. |
| **Ungetypte Codeblöcke** | 0 | **0** | 🟢 **100% Konform** | Keine leeren ` ``` ` Fences vorhanden. |

> [!NOTE]
> Die beiden XAML-Snippets in `Folien/04_Visualisierung_2D_Diagramme/Folien.md` (Zeilen 128 und 446) nutzen den Sprachbezeichner `xaml`. Dieser ist syntaktisch valide.

---

## 3. 1:1 Synchronizitäts-Prüfung: Folien vs. Quellcode in `Quellen/`

Die nachfolgende Analyse prüft die sechs vom Lead-Agenten priorisierten Kernkomponenten im Detail auf Übereinstimmung von Klassennamen, Signaturen, Datentypen und numerischer Logik.

```
Synchronizitäts-Matrix
├── 🟢 SimulationMvvmPattern (WPF, MVVM, Zero-Alloc ScottPlot In-Place Scatter)
├── 🟡 ClosedLoopMotorBlock (DC-Motor, Anti-Windup) [Didaktische Reduktion auf Folie]
├── 🟢 OrbitCamera und GeometryFactory in VorlageSzenengraph3D
├── 🟢 EulerExplicitSolver (Bisektion, Sticking Threshold in SFunctionHybrid)
├── 🟢 ParallelWelfordAccumulator in DynamischWarteschlange
└── 🟢 Fachwerk-Löser (A.Solve(b) und kBB.Cholesky().Solve())
```

---

### 3.1 `SimulationMvvmPattern` (WPF, MVVM & Zero-Alloc ScottPlot)

- **Reale Implementierung:** [`Quellen/WS25/SimulationMvvmPattern`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SimulationMvvmPattern) (.NET 10.0-windows).
- **Audit-Befund zur View-Performance:**
  - Im vorherigen Audit erzeugte `MainWindow.xaml.cs` bei jedem 16-ms-Tick zwei neue Managed Heap-Arrays (`.ToArray()`) und rief `Plot.Clear()` auf.
  - **Status jetzt (vollständig behoben):** `MainWindow.xaml.cs` nutzt zwei feste Puffer `_renderX = new double[2000]` und `_renderY = new double[2000]`.
  - Der Scatter-Plot wird einmalig im Konstruktor angebunden: `_scatterPlot = TrajectoryPlot.Plot.Add.Scatter(_renderX, _renderY);`.
  - Im Timer-Tick (16 ms) wird die Sichtbarkeit und der Zeichenbereich allokationsfrei über den ScottPlot-5-Indexbereich gesteuert:
    ```csharp
    _scatterPlot.Data.MinRenderIndex = 0;
    _scatterPlot.Data.MaxRenderIndex = count - 1;
    _scatterPlot.IsVisible = true;
    TrajectoryPlot.Plot.Axes.AutoScale();
    TrajectoryPlot.Refresh();
    ```
  - **Bewertung:** Exzellente Umsetzung des Zero-Allocation-Prinzips für 60-FPS-Live-Streaming.
- **Folien-Synchronizität (Kapitel 11):**
  - Auf Folie 11.370 ist das Interface wie folgt dargestellt:
    ```csharp
    public interface IContinuousModel {
        int StateDimension { get; }
        void ComputeDerivatives(double t, double[] x, double[] u, double[] dxdt);
    }
    ```
  - In `Quellen/WS25/SimulationMvvmPattern/Model/IContinuousModel.cs`:
    ```csharp
    public interface IContinuousModel {
        int StateCount { get; }
        void GetDerivatives(double t, ReadOnlySpan<double> x, Span<double> dxdt);
    }
    ```
  - **Didaktisches Urteil:** Die Folie wählt eine vereinfachte Darstellung mit klassischen Arrays (`double[]`), während das reale Projekt modernes, allokationsfreies C# (`ReadOnlySpan<double>`, `Span<double>`) vorlebt. Dies ist didaktisch nachvollziehbar, sollte jedoch im Notizenteil explizit erwähnt werden.

---

### 3.2 `ClosedLoopMotorBlock` (DC-Motor mit Anti-Windup Clamping)

- **Reale Implementierung:** [`Quellen/WS25/SFunctionContinuous/Framework/Blocks/ClosedLoopMotorBlock.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SFunctionContinuous/Framework/Blocks/ClosedLoopMotorBlock.cs).
- **Testabdeckung:** [`Quellen/WS25/SimulationTests/ClosedLoopMotorTests.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SimulationTests/ClosedLoopMotorTests.cs) prüft Parameterkonsistenz, Sollwertfolge, Anti-Windup Clamping und RK4-Integration.
- **Folien-Synchronizität (Kapitel 08, Folien 1687–1723):**
  - **Didaktische Vereinfachung auf Folie 8.1696:**
    ```csharp
    // Folie:
    ContinuousStates.AddRange(new[] { 0.0, 0.0, 0.0 });
    // Realer Code:
    ContinuousStates.Add(new StateDeclaration("Theta"));
    ContinuousStates.Add(new StateDeclaration("Omega"));
    ContinuousStates.Add(new StateDeclaration("Xi"));
    ```
  - **Didaktische Vereinfachung der Ableitungsmethode (Folie 8.1709):**
    ```csharp
    // Folie:
    public override void CalculateDerivatives(double time) {
        ...
        Derivatives[0] = omega;
    }
    // Realer Code (Block.cs Basisklasse):
    public override void CalculateDerivatives(double time, double[] continuousStates, 
                                             double[] inputs, double[] derivatives)
    ```
  - **Physikalisch-mathematische Logik:** Die Regler- und DGL-Gleichungen stimmen **1:1 exakt** überein:
    - $e = w - \theta$
    - $u_{\text{raw}} = K_p \cdot e + x_I - K_d \cdot \omega$ (D-Anteil auf Istwert gegen Derivative Kick)
    - $u_{\text{sat}} = \text{clamp}(u_{\text{raw}}, -U_{\text{max}}, U_{\text{max}})$
    - Clamping: $\text{if } (|u_{\text{raw}}| \ge U_{\text{max}} \land e \cdot u_{\text{raw}} > 0) \implies \dot{x}_I = 0 \text{ else } K_i \cdot e$
    - $\dot{\theta} = \omega$, $\dot{\omega} = -\frac{1}{T_m} \omega + \frac{K_m}{T_m} u_{\text{sat}}$, $\dot{x}_I = \text{dXi}$.

---

### 3.3 `OrbitCamera` & `GeometryFactory` in `VorlageSzenengraph3D`

- **Reale Implementierung:**
  - [`Quellen/WS25/VorlageSzenengraph3D/Model/OrbitCamera.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/VorlageSzenengraph3D/Model/OrbitCamera.cs)
  - [`Quellen/WS25/VorlageSzenengraph3D/Model/GeometryFactory.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/VorlageSzenengraph3D/Model/GeometryFactory.cs)
- **Testabdeckung:** `SimulationTests/OrbitCameraAndGeometryFactoryTests.cs` verifiziert Kugelkoordinatentransformation, Azimut/Elevation-Clamping, Zoom und Geometrieerzeugung.
- **Folien-Synchronizität (Kapitel 05):**
  - **`OrbitCamera` (Folien 5.1423–1460):** 1:1 identisch mit `OrbitCamera.cs` (Kugelkoordinaten $\text{radAz} = \text{Azimuth} \cdot \frac{\pi}{180}$, $\text{radEl} = \text{Elevation} \cdot \frac{\pi}{180}$, kartesische Projektion, `gl.LookAt(...)`).
  - **`GeometryFactory` (Folie 5.1152):**
    - Folie zeigt: `namespace SimulationEngine.Graphics3D` (im realen Projekt: `VorlageSzenengraph3D.Model`).
    - Folie zeigt: `new Cylinder("Cylinder", r, r, h, slices)` (realer Konstruktor verlangt zusätzlich `stacks` und `Material`). Die Methoden der Factory kapseln diese Parameter jedoch sauber als Default-Werte.

---

### 3.4 `EulerExplicitSolver` (Bisektion & Sticking Threshold)

- **Reale Implementierung:** [`Quellen/WS25/SFunctionHybrid/Framework/Solvers/EulerExplicitSolver.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SFunctionHybrid/Framework/Solvers/EulerExplicitSolver.cs).
- **Testabdeckung:** `SimulationTests/EulerExplicitSolverTests.cs` testet Nullstelleneinkreisung via Bisektion, Restschrittintegration und Zeno-Sticking.
- **Folien-Synchronizität (Kapitel 10, Folien 1040–1085):**
  - Der Quellcode setzt exakt die auf den Folien vorgestellte 7-Phasen-Architektur um:
    1. Maximale Schrittweite ermitteln
    2. Zustand sichern (`RememberInternalVariables`)
    3. Probesprung $t + \Delta t$
    4. Echte Vorzeichenwechsel-Bisektion auf $[t_{\text{left}}, t_{\text{right}}]$ mit `TimeTolerance` und `ZeroCrossingValueThreshold`
    5. Zustand am Nulldurchgang fixieren (`RestoreInternalVariables` + Restschritt)
    6. Diskretes Ereignis mit Haftkontroll-Prüfung (`ApplyZenoStickingOrUpdate`)
    7. Restschritt-Integration für $dt_{\text{remaining}} = (t + \Delta t) - t_{\text{event}}$
  - **Befund zu `EulerImplicitSolver.cs`:** Während der explizite Solver nun vollständig saniert ist, verwendet der implizite Solver in `SFunctionHybrid` weiterhin die alte naive Schrittweitenhalbierung (`timeStep /= 2; throw new Exception(...)`).

---

### 3.5 `ParallelWelfordAccumulator` in `DynamischWarteschlange`

- **Reale Implementierung:** [`Quellen/WS24/DynamischWarteschlange/Model/ParallelWelfordAccumulator.cs`](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS24/DynamischWarteschlange/Model/ParallelWelfordAccumulator.cs).
- **Testabdeckung:** `SimulationTests/ParallelWelfordAccumulatorTests.cs` prüft mathematische Äquivalenz zur 2-Pass-Varianz, Chan-Merge-Invarianz, Auslöschungstoleranz ($10^9 + \mathcal{N}(0, 1)$) und Konfidenzintervall.
- **Folien-Synchronizität (Kapitel 09, Folien 1265–1305):**
  - Zu 100 % deckungsgleich. Sämtliche Variablennamen (`Count`, `Mean`, `M2`, `delta`, `delta2`, `newCount`), Formeln und Operatoren stimmen überein.
  - Die lose, unkompilierte Datei im WS25-Stammverzeichnis wurde bereinigt.

---

### 3.6 Fachwerk-Löser (`A.Solve(b)` und `kBB.Cholesky().Solve()`)

- **Reale Implementierung:**
  - `WS25/FachwerkIdeal2D/Model/Truss.cs`
  - `WS25/FachwerkIdeal3D/Model/Truss.cs`
  - `WS25/FachwerkElastisch3D/Model/Truss.cs`
  - `WS24/StatischFachwerkIdeal2D/Model/Truss.cs`
  - `WS24/StatischFachwerkElastisch2D/Model/Truss.cs`
- **Folien-Synchronizität (Kapitel 07, Folien 833–840 & 985–993):**
  - **Ideales Fachwerk:** `Vector<double> x = A.Solve(b);` (LU-Zerlegung) ist in allen Projekten aktiv. Keine Matrixinversion mehr vorhanden.
  - **Elastisches Fachwerk:** `uUnknown = kBB.Cholesky().Solve(rhs);` mit sicherem Fallback auf `kBB.LU().Solve(rhs)`.
  - Zu 100 % synchron mit Folie 7.985–993.

---

## 4. Didaktische Code-Qualität & Zielgruppenpassung

### 4.1 Eignung für Automatisierungstechnik-Studierende (5./6. Semester)
- **Didaktisch motivierte Abstraktionen:** Studierende der Automatisierungstechnik verfügen über fundierte Kenntnisse in Regelungstechnik, Vektorrechnung und systemdynamischen Differentialgleichungen. Der Code spiegelt diese Vorkenntnisse wider:
  - Mechatronische Zustandsmodelle ($\theta, \omega, x_I$) sind unmittelbar verständlich.
  - Das Anti-Windup Clamping schlägt die perfekte Brücke von der Theorie (Begrenzung des I-Anteils) zur Software-Implementierung in C#.
  - Das diskrete Ereignismodell (`EventQueue`, `ArrivalEvent`, `DepartureEvent`) nutzt polymorphe Muster und intuitive Warteschlangenstrukturen (`Queue<double>`).
- **Moderne C#-Patterns ohne esoterischen Overhead:**
  - Auf unnötig komplexe Metaprogrammierung, Reflection oder unleserliche LINQ-Monolithen wurde verzichtet.
  - Saubere Verwendung von .NET-Idiomen: `Math.Clamp`, `Span<T>`, Pattern-Matching (`if (next is ArrivalEvent)`), generische Schnittstellen (`IProgress<T>`), kooperative Task-Steuerung (`CancellationTokenSource`).
  - Im ViewModel wird das offizielle `CommunityToolkit.Mvvm` eingesetzt, was dem aktuellen Industriestandard für WPF- und .NET-Desktop-Entwicklung entspricht.

---

## 5. Detaillierter Katalog der Befunde & Handlungsoptionen

Die folgenden Befunde wurden während des Audits erhoben und nach Schweregrad eingestuft:

### 🔴 Kritische Befunde (Severity: High)
*Keine verbleibenden kritischen Befunde.* Sämtliche früheren Blocker (Matrixinversion, fehlende MVVM-Referenzarchitektur, GC-Druck im 60-FPS-Timer, Zeno-Abstürze) wurden erfolgreich behoben.

---

### 🟡 Mittlere Befunde (Severity: Medium)

1. **Didaktisches Signatur-Delta bei `ClosedLoopMotorBlock` (Kapitel 08):**
   - *Befund:* Folie 8.1696 und 8.1709 zeigen eine vereinfachte Parameterliste (`CalculateDerivatives(double time)`), während die reale Basisklasse `Block.cs` vier Parameter (`time, cStates, inputs, derivatives`) deklariert.
   - *Empfehlung:* In den Vortragsnotizen (`Notizen.md`) klarstellen, dass der Folienausschnitt aus Platzgründen didaktisch komprimiert ist und der reale Code in `Quellen/WS25/SFunctionContinuous` die gemeinsame Block-Schnittstelle implementiert.
2. **Didaktisches Signatur-Delta bei `IContinuousModel` (Kapitel 11):**
   - *Befund:* Folie 11.370 zeigt `int StateDimension` und `ComputeDerivatives(double t, double[] x, double[] u, double[] dxdt)`. Das Referenzprojekt nutzt `int StateCount` und `GetDerivatives(double t, ReadOnlySpan<double> x, Span<double> dxdt)`.
   - *Empfehlung:* Folie 11.370 entweder auf die moderne Span-Signatur aktualisieren oder in den Foliennotizen als "Konzeptioneller Entwurf vs. High-Performance-Realisierung via Span<T>" hervorheben.
3. **Inkonsistentes Refactoring der Solver-Topologie:**
   - *Befund:* `EulerExplicitSolver` in `SFunctionHybrid` arbeitet zero-allocation mit vorab kompilierter Blockreihenfolge (`_sortedExecutionOrder`). Die sechs Solver in `SFunctionContinuous` sowie `EulerImplicitSolver` in `SFunctionHybrid` allozieren weiterhin bei jedem Zeitschritt `List<Block> open = [.. Blocks]`.
   - *Empfehlung:* Langfristig die vorberechnete Ausführungsreihenfolge auch auf die kontinuierlichen Solver übertragen.
4. **Fehlende Standalone-Projekte für Pixel- und Vektorgrafik (Kapitel 02 & 03):**
   - *Befund:* Der auf den Folien gezeigte High-Performance-Code (`WriteableBitmap` mit `unsafe uint*` in Kap. 2; `VisualHost` in Kap. 3) besitzt kein isoliertes Übungsprojekt in `Quellen/`.
   - *Empfehlung:* Bereitstellung zweier kompakter Vorlage-Projekte `WS25/VorlageVisualisierungPixel` und `WS25/VorlageVisualisierungVektorHost` für zukünftige Semester.
5. **Namespace-Inkonsistenzen in `WS25/Fachwerk*`:**
   - *Befund:* Die Projekte heißen `FachwerkIdeal2D`, deklarieren aber im Code `namespace IdealesFachwerk2D.Model`.
   - *Empfehlung:* Namespaces an die Projekt- und Ordnernamen anpassen.

---

### 🟢 Geringfügige Befunde / Polishing (Severity: Low)

1. **Namespace-Angabe bei `GeometryFactory` (Kapitel 05):**
   - *Befund:* Folie 5.1152 nennt `namespace SimulationEngine.Graphics3D`. Der reale Quellcode liegt in `VorlageSzenengraph3D.Model`.
   - *Empfehlung:* Auf Folie anpassen oder als generischen Beispiel-Namespace kennzeichnen.
2. **Array-Allokation im 3D-Renderer (`Color.Array()`):**
   - *Befund:* In `Quellen/WS25/VorlageSzenengraph3D/Model/Color.cs` allokiert `Array()` bei jedem Aufruf ein neues 4-Element-Array `new float[] { Red, Green, Blue, Alpha }`.
   - *Empfehlung:* Rückgabe als statisch gepuffertes oder vorab erzeugtes `float[]` zur weiteren Schonung des Gen-0-Heaps.
3. **XAML Sprachbezeichner in Kapitel 04:**
   - *Befund:* Fences nutzen ````xaml```.
   - *Empfehlung:* Beibehalten oder bei Bedarf auf ````xml``` harmonisieren.

---

## 6. Fazit & Freigabeempfehlung

Das Software-Engineering und die didaktische Aufbereitung der Codebeispiele in `kurs-computer-simulation` befinden sich in einem **hervorragenden, lehr- und prüfungsreifen Zustand**:

- **Restriktionen:** 100 % konform zu allen Folien- und Layoutvorgaben ($\le 16$ Zeilen, $\le 80$ Zeichen).
- **Code-Qualität:** 0 Buildfehler, 0 Compilerwarnungen, 100 % bestandene Unittests.
- **Architektur:** Mustervorbildliche Umsetzung von MVVM, Multithreading, Zero-Allocation und moderner DGL-Numerik.

Der Foliensatz und die zugehörigen C#-Quellcodes werden hiermit für die Vorlesung **vollumfänglich freigegeben**.
