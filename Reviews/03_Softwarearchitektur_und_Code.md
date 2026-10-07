# Softwarearchitektur-, Code- und Best-Practice-Review
## Vorlesungsreihe „Systemsimulation / Digitaler Zwilling“ (Kapitel 00–11)

**Autor:** Spezialisierter Review-Agent für Software Engineering, C# und Systemsimulation  
**Datum:** 7. Oktober 2026  
**Ziel-Repository:** `kurs-computer-simulation` (FH Oberösterreich, Campus Wels)  
**Zielgruppe:** Dozenten, Modulverantwortliche und Entwickler des Vorlesungsmaterials  

---

## 1. Executive Summary

Der vorliegende Bericht analysiert die didaktischen Vorlesungsmaterialien in `Folien/` (Kapitel 00 bis 11), die Beispielimplementierungen in `Quellen/` (Wintersemester 2024 und 2025) sowie die Hilfsskripte in `Skripte/GrafikGenerator` aus der Perspektive moderner Softwarearchitektur, C#-Best-Practices, Multithreading und Performance-Engineering.

### Gesamteindruck
Die Vorlesungsreihe weist ein **außergewöhnlich hohes didaktisches Niveau** und eine durchdachte didaktische Progression auf:
1. **Didaktische Konzeption:** Die Abfolge von 2D-Pixel- über Vektorgrafik, Diagramme und 3D-OpenGL bis hin zu Multithreading und den vier mathematischen Modellierungsarten (statisch, kontinuierlich, diskret, hybrid) ist hervorragend aufeinander abgestimmt.
2. **Theoretische Fundierung:** Kapitel 6 (Multithreading), Kapitel 2 (High-Performance Pixel-Rendering mit `unsafe uint*`) und Kapitel 11 (Synthese und Entwurfsmuster in Abschnitt 11.3) vermitteln modernste Prinzipien des High-Performance-Computing auf Hochschulniveau.
3. **Evolution im Code:** Zwischen den Implementierungen aus WS24 (sehr einfache, monolithische Prototypen) und WS25 (Entwicklung eines blockbasierten Simulink-S-Function-Frameworks sowie der DAE-Netzwerkmodellierung in *SimscapeSharp*) ist ein enormer qualitativer und architektonischer Reifungsprozess sichtbar.

### Zentrale Diskrepanzen & Handlungsfelder
Trotz der theoretischen Exzellenz der Folien besteht an mehreren kritischen Stellen eine **spürbare Kluft zwischen Anspruch (Folienlehre) und Wirklichkeit (Quellcode)**:
- **Smart-UI-Antipattern:** In den WS24-Projekten sowie Teilen von WS25 sind Modellberechnung, numerische Integratoren und Visualisierung fest im Code-Behind von Fenstern (`MainWindow.xaml.cs`) verdrahtet. Das auf Folie 11.3 gepredigte Muster (`IContinuousModel`, `IContinuousSolver`, strikte Trennung von UI und Engine) wird im praktischen Code kaum exemplifiziert.
- **GC-Druck in Simulationsschleifen:** Während in der Vorlesung vor Garbage-Collection-Latenzen gewarnt wird, erzeugen die hybriden Solver in `Quellen/WS25/SFunctionHybrid` bei *jedem einzelnen Zeitschritt und Bisektionsschritt* neue Heap-Allokationen (`new Dictionary<Block, double[]>()`, temporäre Listen und Arrays).
- **Numerisches Antipattern bei Gleichungslösern:** Die Fachwerk-Solver in `FachwerkIdeal2D`, `FachwerkIdeal3D` und `FachwerkElastisch3D` invertieren Matrizen explizit (`A.Inverse().Multiply(b)`), anstatt faktororientierte Gleichungslöser (`A.Solve(b)`) einzusetzen – im Widerspruch zum Foliencode in Kapitel 7.
- **Fehlende Multithreading-Praxis in `Quellen/`:** Die in Kapitel 6 und 4 vorgestellten Muster (`Task.Run`, `IProgress<T>`, `CancellationTokenSource`, vorallokierter Ringpuffer) besitzen im praktischen Quellcode-Bestand kein einziges lauffähiges Referenzbeispiel; alle Beispielsimulatoren laufen synchron auf dem UI-Thread.
- **Repository-Hygiene:** Im Verzeichnis `Quellen/WS25/` verbleiben vier verwaiste Projektverzeichnisse mit über 2.500 ungenutzten Build-Artefakten und falschen Namensräumen.

---

## 2. Architekturmuster: Modell, Solver, Datenstrukturen & UI

### 2.1 Das didaktische Ideal vs. Quellcode-Realität
In [Kapitel 11.3 (Folie 356 ff.)](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Folien/11_Epilog/Folien.md#L356-L410) wird die **„Goldene Regel der Simulationsarchitektur“** gelehrt:
```
[Reines Modell]  <---ruft auf---  [Unabhängiger Solver]
(IContinuousModel)                (IContinuousSolver)
       |                                  |
       +------------> [UI / View] <-------+
                      (Entkoppelt, nur lesend)
```
Die Realität in den Übungsprojekten stellt sich wie folgt dar:

| Projekt | Architektur-Status | Trennung von Modell & Solver | UI-Entkopplung (MVVM) | Testbarkeit |
| :--- | :--- | :--- | :--- | :--- |
| **`WS24/DynamischBallwurf1D`** | ❌ Smart-UI | Keinerlei Klassen; Gleichungen, Euler und ScottPlot in `MainWindow()` | ❌ Keine (reiner Code-Behind) | ❌ Nicht testbar |
| **`WS24/DynamischFederpendel1D`** | ❌ Smart-UI | 3 Solver + Physik hart im Konstruktor von `MainWindow` kodiert | ❌ Keine | ❌ Nicht testbar |
| **`WS24/DynamischWarteschlange`** | ⚠️ Teiltrennung | `Simulation`, `Event`, `State` vorhanden; hält aber Visualisierungsdaten | ❌ Keine | ⚠️ Bedingt |
| **`WS24/StatischFachwerkIdeal2D`** | ⚠️ Teiltrennung | `Truss`, `Node`, `Rod` existieren; `Truss.Solve()` löst selbst | ❌ Keine | ⚠️ Gut im Model |
| **`WS25/FachwerkIdeal2D / 3D`** | ⚠️ Teiltrennung | Modellstrukturen sauber, Berechnung jedoch monolithisch in `Truss.Solve()` | ❌ Keine | ⚠️ Gut im Model |
| **`WS25/SFunctionContinuous`** | 🟢 Komponentenarchitektur | `Block`, `Model`, `Solver` vollständig modular entkoppelt | ❌ Keine (Code-Behind instanziiert) | 🟢 Sehr gut |
| **`WS25/SFunctionHybrid`** | 🟢 Komponentenarchitektur | Block-Paradigma, Ereignisse, Zero-Crossing, Solver-Klassen | ❌ Keine | 🟢 Sehr gut |
| **`WS25/SimscapeSharp`** | 🟢 Domänenmodell | Acausale Modellierung, AST-Expressions, KCL/KVL-Netzwerk | ❌ Keine | 🟢 Exzellent |
| **`WS25/VorlageSzenengraph3D`** | 🟢 Szenengraph-Muster | `Scene`, `Node`, `Group`, `Transform`, `Primitive`, `Volume` | ❌ Keine | 🟢 Sehr gut |

### 2.2 MVVM & WPF-Integration
Obwohl MVVM in Kapitel 4 und Kapitel 11 genannt wird:
- **Kein einziges Projekt** nutzt echte WPF-Bindings mit einem `ViewModel`, `INotifyPropertyChanged` oder dem `CommunityToolkit.Mvvm`.
- Überall dominiert der direkte Zugriff auf XAML-Namen (`WpfPlot1`, `VisualizationF`, `SimulationImage`) im Konstruktor der Fenster.
- **Didaktische Konsequenz:** Studierende lernen im theoretischen Teil, wie professionelle Architektur entkoppelt sein soll, sehen in den Code-Beispielen jedoch den Programmierstil von Einsteigern (alles im Code-Behind). Für eine Bachelor-Ausbildung im Bereich Automatisierungstechnik/Digitaler Zwilling sollte mindestens *ein* vollständiges Referenzprojekt sauberes MVVM mit ViewModel-Datenbindung vorleben.

---

## 3. Modernes C# & Performance-Engineering

### 3.1 C#-Sprachversionen und moderne Konstrukte
Die Projekte demonstrieren an vielen Stellen den erfolgreichen Einsatz moderner Sprachfeatures (.NET 8):
- **C# 10/11/12 Features:** File-scoped Namespaces, Target-typed `new()`, Top-Level Pattern Matching (`is ArrivalEvent`, `is DiscreteSampleTime`), Tuple-Dekonstruktion (`(Vertex vertex, Normal normal, Material material)`).
- **.NET Data Structures:** Hervorragende Nutzung der in .NET 6 eingeführten `PriorityQueue<TElement, TPriority>` in `DynamischWarteschlange/Model/Simulation.cs` für das Next-Event-Scheduling.
- **Skripte:** Der `GrafikGenerator` nutzt bereits modernstes .NET 10 und zeigt prägnanten, sauberen Code für Offline-Rendering.

### 3.2 Fatale GC-Allokationen in den Simulationsschleifen
Eines der zentralen Lernziele in Echtzeitsimulation und digitalen Zwillingen ist die **Vermeidung von GC-Pauses**. In den innersten Schleifen von `SFunctionHybrid` werden diese Prinzipien jedoch massiv verletzt:

#### Fall A: Allokationsexplosion in `Solver.CalculateZeroCrossings`
In [Quellen/WS25/SFunctionHybrid/Framework/Solver.cs](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SFunctionHybrid/Framework/Solver.cs#L163-L208):
```csharp
protected double CalculateZeroCrossings(double t)
{
    double value = -1;
    // FATAL: Neues Dictionary bei JEDEM einzelnen Aufruf
    Dictionary<Block, double[]> cache = new Dictionary<Block, double[]>();

    foreach (Block f in Model.Blocks)
    {
        // FATAL: Neues double-Array bei JEDEM Aufruf
        double[] z = new double[f.ZeroCrossings.Count];
        f.CalculateZeroCrossings(t, ContinuousStates[f], DiscreteStates[f], Inputs[f], z);
        ...
        cache[f] = z;
    }
    foreach (Block f in Model.Blocks)
    {
        ZeroCrossings[f] = cache[f];
    }
    return value;
}
```
**Kritik:** Im Konstruktor von `Solver` wurden `ZeroCrossings` und `ZeroCrossingsPrevious` bereits vorallokiert! In der Schleife wird dieser Speicher jedoch ignoriert, und es werden stattdessen pro Iteration ein neues `Dictionary` und Arrays angelegt. Bei 10.000 Schritten und Bisektions-Suchläufen entstehen hier zigtausende kurzlebige Objekte auf dem GC-Heap (Gen 0/1).

#### Fall B: Dynamische Allokation & $O(N^2)$-Listenoperationen in `EulerExplicitSolver.CalculateOutputs`
In [Quellen/WS25/SFunctionHybrid/Framework/Solvers/EulerExplicitSolver.cs](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/SFunctionHybrid/Framework/Solvers/EulerExplicitSolver.cs#L97-L138):
```csharp
protected override void CalculateOutputs(double time)
{
    ResetFlags();
    List<Block> open = [.. Blocks]; // ALLOKATION: List<Block> bei jedem Zeitschritt!

    while (open.Count > 0)
    {
        int count = open.Count;
        for (int i = 0; i < open.Count; i++)
        {
            Block f = open[i];
            if (AreAllInputsReady(f))
            {
                f.CalculateOutputs(time, ...);
                ForwardOutputs(f);
                open.RemoveAt(i--); // $O(N)$ Verschiebung im Array!
            }
        }
        if (count == open.Count)
            throw new Exception("Algebraische Schleife erkannt!");
    }
}
```
**Kritik:**
1. Da sich die Topologie des Blockdiagramms zur Laufzeit nicht ändert, kann die topologische Berechnungsreihenfolge (Topological Sort / Directed Acyclic Graph Order) **einmalig vor Simulationsbeginn** berechnet werden.
2. Stattdessen berechnet der Solver die topologische Reihenfolge dynamisch in jedem Zeitschritt neu – unter ständigen Allokationen (`[.. Blocks]`) und linearen Elementverschiebungen (`open.RemoveAt`).

#### Fall C: Exzessive Dictionary-Lookups mit Objektschlüsseln
Im Solver greift jede Methode auf `Dictionary<Block, double[]>` zu (`ContinuousStates[f]`, `Derivatives[f]`, `Inputs[f]`, `Outputs[f]`).
- Jeder Zugriff berechnet `f.GetHashCode()`, durchsucht Buckets und dereferenziert Zeiger.
- **Best Practice in Simulationskernen:** Jedem Block wird eine fortlaufende Ganzzahl-ID (`block.Id = 0..N-1`) zugewiesen; alle Zustände liegen in einem einzigen zusammenhängenden Block-Array `double[][]` oder flachen Vektor `Span<double>`.

### 3.3 Numerische Ineffizienz: Matrix-Inversion vs. Gleichungslösung
In [Quellen/WS25/FachwerkIdeal2D/Model/Truss.cs](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/FachwerkIdeal2D/Model/Truss.cs#L120):
```csharp
Vector<double> x = A.Inverse().Multiply(b);
```
In [Quellen/WS25/FachwerkIdeal3D/Model/Truss.cs](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/FachwerkIdeal3D/Model/Truss.cs#L135-L137):
```csharp
Matrix<double> Ai = A.Inverse();
Vector<double> x = Ai.Multiply(b);
```
In [Quellen/WS25/FachwerkElastisch3D/Model/Truss.cs](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/FachwerkElastisch3D/Model/Truss.cs#L245):
```csharp
uUnknown = kBB.Inverse() * (fKnown - kBA * uKnown);
```
**Software-Engineering & Numerik-Bewertung:**
- Das explizite Berechnen der Inversen $A^{-1}$ ist ein **klassisches numerisches Antipattern**. Es hat eine signifikant schlechtere Konditionszahl, erfordert den dreifachen Rechenaufwand gegenüber einer direkten Dreieckszerlegung (LU bzw. Cholesky) und zerstört jegliche Dünnbesetztheit (Sparsity).
- **Widerspruch zu den Folien:** Im Skriptum [Kapitel 7, Folie 967](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Folien/07_Statische_Modelle/Folien.md#L967) wird korrekt gezeigt:
  ```csharp
  var x = A.Solve(b);
  ```
  Im Quellcode wird jedoch überall `Inverse()` verwendet.

### 3.4 High-Performance Pixel-Rendering mit `WriteableBitmap`
In [Kapitel 2](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Folien/02_Visualisierung_2D_Pixel/Folien.md#L283-L330) werden C#-Zeigerarithmetik (`unsafe uint*`), Stride-Berechnungen und `Parallel.For` auf exzellentem Niveau erklärt:
- Das Schreiben von 32-Bit Ganzwörtern `0xAARRGGBB` vervierfacht die Speicherbandbreite gegenüber einzelnen Byte-Schreiboperationen.
- Die Entkopplung über `Lock()`, `AddDirtyRect()` und `Unlock()` entspricht den offiziellen Microsoft WPF-Performance-Richtlinien.
- **Verbesserungspotenzial:** Auf Folie 503 und 531 ff. wird ein 2D-Array `float[,] field` mit `field[x, y]` indiziert. In C# ist `array[row, col]` Standard (Row-Major). Ein Durchlauf mit $x$ in der inneren Schleife über die erste Dimension verursacht massive Cache-Misses. Empfehlung: 1D-Arrays `float[]` mit linearem Index `y * width + x` verwenden oder als `field[y, x]` deklarieren.

---

## 4. Multithreading, Thread-Sicherheit & Streaming

### 4.1 Didaktische Qualität von Kapitel 6
Der Foliensatz [06_Multithreading](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Folien/06_Multithreading/Folien.md) ist didaktisch herausragend strukturiert:
- Saubere Differenzierung von Prozess vs. Thread sowie Concurrency vs. Parallelism.
- Klare Warnung vor nicht-atomaren Operationen (`counter++`) und Demonstration von `lock`.
- Fundierte Behandlung von `System.Random`: Erklärung, warum dieselbe Instanz nicht über Threads geteilt werden darf, inklusive Seed-Management.
- UI-Architektur: STA-Regeln in WPF, Vermeidung von `Dispatcher.Invoke` zugunsten von `Progress<T>` und `IProgress<T>`, kooperativer Abbruch mit `CancellationTokenSource`.

### 4.2 Die Umsetzungs-Lücke im Code
- **Keine Multithreading-Implementierung in `Quellen/`:** Weder `Task.Run` noch `Parallel.For` noch `IProgress<T>` finden sich in den Simulationsprojekten von `Quellen/`. Sämtliche mathematischen Berechnungen laufen synchron im UI-Thread.
- **Ringpuffer-Implementierung:** In [Kapitel 4, Folie 326](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Folien/04_Visualisierung_2D_Diagramme/Folien.md#L326) wird die Klasse `SimulationRingBuffer` mit `lock (_syncLock)` für Live-Streaming dargestellt. Diese Klasse existiert jedoch nur als Folien-Snippet und ist in keinem Übungsprojekt als lauffähiges Beispiel hinterlegt.

---

## 5. Bibliotheksnutzung: ScottPlot 5, SharpGL, MSAGL & Math.NET

### 5.1 ScottPlot 5
- **Folien (Kapitel 4) & `GrafikGenerator`:** Modernste Verwendung von ScottPlot 5. Die Differenzierung zwischen `Plot.Add.Scatter` (ungeordnet), `Plot.Add.Signal` (äquidistant, Min/Max-Decimation für $10^6$ Punkte) und `Plot.Add.SignalXY` ist didaktisch ein Vorzeigebeispiel.
- **Bestandscode (WS24):** In `DynamischFederpendel1D`, `DynamischBallwurf1D` und `VorlageVisualisierung2D` wird ausschließlich `Plot.Add.Scatter` auf äquidistanten Arrays verwendet. In `DynamischWarteschlange` wird ein Wartezeit-Histogramm als Linien-/Scatter-Plot visualisiert, anstelle des ScottPlot-5-Balkenplots (`Plot.Add.Bars`).

### 5.2 SharpGL & 3D-Pipeline
- **Technologischer Status:** SharpGL kapselt die veraltete OpenGL 1.1 Fixed-Function-Pipeline (`gl.Begin()`, `gl.End()`, `gl.LightModel()`, `gl.PushMatrix()`).
- **Performance-Antipattern in `Primitive.cs`:**
  In [Quellen/WS25/VorlageSzenengraph3D/Model/Nodes/Primitive.cs](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/VorlageSzenengraph3D/Model/Nodes/Primitive.cs#L48-L53):
  ```csharp
  gl.Begin(_beginMode);
  for (int i = 0; i < _vertices.Count; i++)
  {
      _materials[i].Apply(gl); // Führt gl.Material(...) PRO VERTEX aus!
      _normals[i].Apply(gl);
      _vertices[i].Apply(gl);
  }
  gl.End();
  ```
  Das Setzen von Beleuchtungs- und Materialzuständen innerhalb von `glBegin/glEnd` für jeden einzelnen Eckpunkt erzeugt gravierende Treiber-Overheads. Materialzustände dürfen nur einmal pro Primitive-Batch gewechselt werden.
- **Zukunftssicherheit:** SharpGL ist seit vielen Jahren unmaintained. Für moderne .NET 8/10-Lehre sollte mittelfristig eine Migration zu modernem OpenGL (VBO/VAO/Shader) via **Silk.NET** oder **OpenTK 4** evaluiert werden.

### 5.3 MSAGL (Microsoft Automatic Graph Layout)
- **Bewertung:** In Kapitel 4 hervorragend didaktisch genutzt, um die Erkennung und Visualisierung von *algebraischen Schleifen* in Blockdiagrammen darzustellen.
- **Algorithmen:** Der Vergleich zwischen Sugiyama-Layout (hierarchisch geordnet für Signalflüsse) und Force-Directed-Layout (kräftebasiert für mechanische/elektrische Netze) ist präzise und für die Systemsimulation ideal gewählt.

### 5.4 SkiaSharp NuGet-Warnung (NU1701)
Beim Kompilieren von `Quellen/WS25/SFunctionContinuous` und `SFunctionHybrid` tritt folgende Build-Warnung auf:
```
warning NU1701: Das Paket "SkiaSharp.Views.WPF 3.119.0" wurde nicht mit dem Projektzielframework "net8.0-windows7.0", sondern mit ".NETFramework,Version=v4.6.1..." wiederhergestellt.
```
**Ursache:** Falsche oder veraltete Package-Referenz für WPF unter .NET 8. In modernen Projekten sollte das offizielle Paket `SkiaSharp.Views.WPF` in passender Version bzw. direkt die von `ScottPlot.WPF` bereitgestellte Abhängigkeit verwendet werden.

---

## 6. Code-Qualität, Antipatterns & Repository-Hygiene

### 6.1 Mathematisch irreführende Benennung in `DynamischFederpendel1D`
In [Quellen/WS24/DynamischFederpendel1D/MainWindow.xaml.cs](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS24/DynamischFederpendel1D/MainWindow.xaml.cs#L114-L132) wird ein Algorithmus als `fin` bzw. **„Implizit + Newton“** ausgewiesen:
```csharp
do
{
    dataVIN[i] = dataVIN[i - 1] + guess * dt;
    dataPIN[i] = dataPIN[i - 1] + dataVIN[i] * dt;
    dataFIN[i] = -k * dataPIN[i];
    dataAIN[i] = dataFIN[i] / m;
    delta = guess - dataAIN[i];
    guess = dataAIN[i];
    count++;
}
while (Math.Abs(delta) > 0.000001 && count < 1000);
```
**Kritik:** Dies ist **kein** Newton-Raphson-Verfahren (welches die Auswertung der Jacobi-Matrix bzw. der Funktionsableitung $f'(x)$ und eine Division/Inversion erfordert: $x_{k+1} = x_k - f(x_k)/f'(x_k)$). Es handelt sich um eine simple **Fixpunkt- bzw. Banach-Iteration**. Studierende werden hier bezüglich des Begriffs „Newton-Verfahren“ fehlgeleitet.

### 6.2 Code-Duplikation bei der Matrix-Assemblierung
In [Quellen/WS25/FachwerkElastisch3D/Model/Truss.cs](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/FachwerkElastisch3D/Model/Truss.cs#L121-L201) erstreckt sich die Zuweisung der 36 Matrixelemente der Steifigkeitsmatrix über 80 Zeilen manuellen, repetitiven Code (`Select(a.FixX, a.FixX)[...] += +s * ex * ex;` usw.).
- **Wartungsrisiko:** Extrem hohe Anfälligkeit für Tippfehler bei Vorzeichen oder Achsenindizes.
- **Refactoring:** Die 6x6 Stabsteifigkeitsmatrix $k_{Stab}$ (auf Folie 7.784 hergeleitet) sollte als lokales Array berechnet und über eine Schleife in die globale Matrix assembliert werden (*Direct Stiffness Assembly*).

### 6.3 Repository-Hygiene & verwaiste Projektverzeichnisse
Im Ordner `Quellen/WS25/` befinden sich vier Verzeichnisse, die keine `.csproj`-Dateien enthalten, jedoch tausende generierte Zwischendateien beherbergen:
1. `Quellen/WS25/ElastischesFachwerk3D/` (nur `bin/`, `obj/`, `.user`)
2. `Quellen/WS25/IdealesFachwerk2D/` (nur `bin/`, `obj/`, `.user`)
3. `Quellen/WS25/IdealesFachwerk3D/` (nur `bin/`, `obj/`, `.user`)
4. `Quellen/WS25/KugelÜbung/` (enthält 2.553 generierte `.cs`- und EditorConfig-Dateien in `obj/`)

Zusätzlich hat [FachwerkIdeal2D/Model/Truss.cs](file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/Quellen/WS25/FachwerkIdeal2D/Model/Truss.cs#L3) immer noch den falschen Namespace:
```csharp
namespace IdealesFachwerk2D.Model // Falscher Name des umbenannten Projekts
```
**Empfehlung:** Vollständiges Löschen dieser vier Altverzeichnisse und Bereinigung der `.gitignore`.

---

## 7. Strukturierte Refactoring-Roadmap

```
Priorität 1 (Quick Wins - Unmittelbar)
├── 1. Löschen der verwaisten Verzeichnisse (ElastischesFachwerk3D, IdealesFachwerk2D, IdealesFachwerk3D, KugelÜbung)
├── 2. Korrektur der Matrix-Löser: Ersetzen von A.Inverse().Multiply(b) durch A.Solve(b)
└── 3. Beseitigung der SkiaSharp NU1701 Build-Warnungen

Priorität 2 (Architektur & Performance - Mittelfristig)
├── 4. Zero-Allocation Solver: Vorallokation der Zero-Crossing-Puffer in Solver.cs
├── 5. Topologische Sortierung: Einmalige Bestimmung der Block-Reihenfolge in EulerExplicitSolver
├── 6. Material-State-Fix in Primitive.cs: gl.Material vor gl.Begin verschieben
└── 7. Umbenennung der Fixpunktiteration in DynamischFederpendel1D (Klarstellung vs. Newton)

Priorität 3 (Vorlesungsreife Referenzbeispiele - Langfristig)
├── 8. Erstellung eines durchgängigen MVVM-Referenzbeispiels mit ViewModel und Data-Binding
├── 9. Bereitstellung eines interaktiven Multithreading-Simulators (Task.Run + RingBuffer + IProgress)
└── 10. Evaluation moderner 3D-Alternativen zu SharpGL (Silk.NET / modern OpenGL)
```

---

## 8. Fazit

Die Vorlesungsunterlagen präsentieren eine fachlich fundierte und didaktisch ansprechende Einführung in die Systemsimulation. Durch die gezielte Behebung der identifizierten Software-Engineering-Schwachstellen – insbesondere die Beseitigung der Heap-Allokationen in den Solvern, der Wechsel von Matrixinversion zu Dreieckszerlegungen und die Angleichung der Quellprojekte an das in Kapitel 11 gelehrte Entkopplungsmuster – kann die Vorlesungsreihe ihr volles Potenzial als moderne, industrienahe Software-Engineering-Ausbildung entfalten.
