# Studentischer Detail-Review: Übungsaufgaben & Starter-Vorlagen (Termin 01 bis 10)

**Perspektive:** Studierender im 5. Semester Bachelor *Automatisierungstechnik (AT)*, FH OÖ Campus Wels  
**Geprüfte Dateien:** Alle 10 Aufgabenblätter (`Uebungen/Termin_01_*/Aufgabenblatt.md` bis `Uebungen/Termin_10_*/Aufgabenblatt.md`) sowie sämtliche C#-Starterprojekte und MSTest-Suites in `Uebungen/Termin_XX_*/Vorlage/`

---

## 1. Übergreifende Bewertung des Übungskonzepts & der Starter-Vorlagen (`Vorlage/`)

Aus studentischer Sicht ist die Struktur der 10 Übungsblätter **außergewöhnlich durchdacht und motivierend**:
- **Zwei-Stufen-Modell (Stufe A Sprint + Stufe B Homework):** Dass wir in der 45–60-minütigen Präsenzübung nicht vor einem leeren Visual-Studio-Fenster sitzen und Zeit mit XAML-Boilerplate verlieren, sondern in `Vorlage/` ein kompilierbares C#-Starterprojekt mit vorbereiteten Unit-Tests (`dotnet test`) vorfinden, nimmt die typische „Leeres-Blatt-Blockade“ komplett weg.
- **Fairness des Wahlmodells (Track A Industrie vs. Track B Game):** Die klare Ansage *„Wählen Sie als 2er-Team GENAU EINEN der beiden Tracks – keine Doppelbelastung!“* wird in jedem Aufgabenblatt vorbildlich kommuniziert und über identische 10-Punkte-Rubriken fair bewertet.
- **Vorgreif-Sperren & KI-Prompting-Boxen:** Die expliziten Vorgreif-Sperren (z. B. kein GUI/ScottPlot in T01, kein FEM-Löser in T03, kein Timer-Loop in T09) verhindern effektiv, dass KI-Tools am Lernziel vorbeigenerieren. Die *Peer-Review-Leitfragen* am Ende jedes Blattes bereiten uns optimal auf das wöchentliche *Showcase & Peer-Challenge* vor.

Dennoch zeigt der detaillierte Code-Audit zwischen `Aufgabenblatt.md` und `Vorlage/*.sln` an einigen Terminen **wichtige Diskrepanzen, ein bereits zu 100 % vorab gelöstes Sprint-Projekt (Termin 01) sowie einen physikalischen Modellierungsfehler beim Isolator-Zeichnen (Termin 02)**, die nachfolgend Termin für Termin dokumentiert sind.

---

## 2. Übersichtstabelle: Bewertung aller 10 Übungseinheiten

| Termin | Ordnername in `Uebungen/` | Starter-Solution (`Vorlage/`) | Klarheit & DoD | Passung `Aufgabenblatt` $\leftrightarrow$ `Vorlage` | Machbarkeit (Sprint / HW) | Kritischer Hauptbefund |
| :---: | :--- | :--- | :---: | :---: | :---: | :--- |
| **T01** | `Termin_01_Kinematik_und_Euler` | `KinematikEuler.sln` | ⭐⭐⭐⭐☆ | ⭐⭐☆☆☆ | Zu leicht (Sprint) / Gut (HW) | `Aufgabenblatt.md` erwähnt `Vorlage/` gar nicht; in `Vorlage/` ist der **gesamte Sprint bereits fertig gelöst**! |
| **T02** | `Termin_02_Pixelgrafik_und_FDM` | `PixelHeatFDM.sln` | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐☆ | Sehr gut / Anspruchsvoll | **Physik-Bug in Sprint A3:** Isolator-Wand ($\alpha=0, T=20\,^\circ\text{C}$) wirkt im 5-Punkt-Stern als Kühlrippe statt als Isolator! Zudem `[x,y]`-Cache-Reihenfolge. |
| **T03** | `Termin_03_Vektorgrafik_Canvas` | `VectorTrussCanvas.sln` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Sehr gut / Gut | Perfekt auf `Vorlage/` abgestimmt (Stablängen, vertikale DIN-406-Maßkette, Drag-Jitter-Fix). |
| **T04** | `Termin_04_Telemetrie_und_ScottPlot` | `ScottPlotTelemetry.sln` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | Sehr gut / Hoch (MSAGL) | Sprint (GC-Brush-Leak, `CircularBuffer.CopyTo`, 2. Streamer) super! Aber für HW fehlt das MSAGL-NuGet-Paket in `csproj`. |
| **T05** | `Termin_05_3D_OpenGL_Szenengraph` | `SceneGraph3D.sln` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Sehr gut / Gut | Exzellenter Sprint (`RenderCustomGeometry`, `OrbitCamera.Pan`, 3D-Werkstück). Vorbildliches Starter-Kit! |
| **T06** | `Termin_06_Multithreading_und_TPL` | `MultithreadingBenchmark.sln` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Sehr gut / Gut | Didaktisch genial: Der synchrone UI-Freeze ist in `BtnStart_Click` live spürbar und wird mit `Task.Run` + `IProgress` gelöst. |
| **T07** | `Termin_07_Statik_FEM_Cholesky` | `TrussFemSolver.sln` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | Sehr gut / Anspruchsvoll | Sehr starkes FEM-Grundgerüst. „Verheiratung mit T03“ erfordert manuelles Zusammenführen zweier Solutions (`VectorTrussCanvas` + `TrussFemSolver`). |
| **T08** | `Termin_08_DGL_und_SFunctions` | `SFunctionSimulation.sln` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Sehr gut / Gut | Sehr sauberes `ISFunction`-Interface; Sprint-Aufgaben (Euler-Stabilitätsgrenze, `PidController`-Extraktion, Overlay) passen 100 %. |
| **T09** | `Termin_09_Diskrete_Systeme_DES` | `DiscreteEventSimulation.sln` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Sehr gut / Gut | Vorbildliche `// TODO [Aufgabe A1/A2/A3]`-Markierungen im Code (Pufferkapazität $K$, Box-Muller Log-Normal, `Parallel.For` Monte-Carlo). |
| **T10** | `Termin_10_Hybride_Dynamik_Synthese` | `HybridZeroCrossing.sln` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Sehr gut / Anspruchsvoll | Großartiger Abschluss: Naiver Festschritt vs. Bisektion, Zeno-Kick-Wakeup (`RestingOnGround` $\to$ `FreeFlight`) und Energie-Stufenplot. |

---

## 3. Detaillierte Einzelanalyse (Termin 01 bis Termin 10)

---

### Termin 01: Kinematik, Zustandsraum & Expliziter Euler
- **Aufgabenblatt:** [Uebungen/Termin_01_Kinematik_und_Euler/Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_01_Kinematik_und_Euler/Aufgabenblatt.md)
- **Starter-Vorlage:** `Uebungen/Termin_01_Kinematik_und_Euler/Vorlage/KinematikEuler.sln` ([Program.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_01_Kinematik_und_Euler/Vorlage/KinematikEuler/Program.cs), [KinematicState.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_01_Kinematik_und_Euler/Vorlage/KinematikEuler/Models/KinematicState.cs), [EulerIntegrator.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_01_Kinematik_und_Euler/Vorlage/KinematikEuler/Solvers/EulerIntegrator.cs), [KinematikEulerTests.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_01_Kinematik_und_Euler/Vorlage/Tests/KinematikEulerTests.cs))

#### Befunde & Kritikpunkte:
1. **Diskrepanz zwischen `Aufgabenblatt.md` (Abschnitt 3) und `Vorlage/KinematikEuler.sln`:**
   - Im Gegensatz zu den Terminen 02 bis 10 erwähnt [Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_01_Kinematik_und_Euler/Aufgabenblatt.md#L56-L81) (Zeilen 56–81) die vorhandene Projektvorlage `Vorlage/KinematikEuler.sln` **mit keinem Wort**! Stattdessen fordert es: *„1. Erstellen Sie eine C#-Konsolenanwendung `Sprint_EulerVakuum`. 2. Definieren Sie einen unveränderlichen Zustand `public readonly record struct ProjectileState(double X, double Y, double Vx, double Vy);`“*.
   - Öffnet man hingegen `Vorlage/KinematikEuler.sln`, heißt das Struct `KinematicState(double Time, double X, double Y, double Vx, double Vy)` (mit 5 statt 4 Parametern), und **die komplette Sprint-Aufgabe (Zeilen 56–80 des Aufgabenblatts) ist in `Program.RunSprint_BallisticTrajectory()` und `EulerIntegrator.cs` bereits zu 100 % fertig implementiert**! Selbst alle 3 Unit-Tests in `KinematikEulerTests.cs` laufen sofort ohne jede Codeänderung grün durch!
2. **Erkenntnisfrage auf Zeile 81 vs. Code-Ausgabe in `Program.cs`:**
   - Auf Zeile 78–79 des Aufgabenblatts steht in der Beispielausgabe für `dt=0.10s` und `dt=0.01s` jeweils `t = 21.623 s | x_impact = 2293.58 m | Diff = 0.000 m`.
   - **Mathematischer Hinweis:** Beim expliziten Euler ist zwar $\dot{x} = v_x = \text{const}$, aber für die $y$-Koordinate gilt $y_k = y_{\text{ana}}(t_k) + \frac{1}{2} g \Delta t \cdot t_k$ (der explizite Euler überschätzt die Flughöhe systematisch um $+\frac{1}{2} g \Delta t \cdot t$, weil er zu Beginn jedes Intervalls die noch höhere Geschwindigkeit $v_{y,k}$ statt des Intervallmittels nutzt!). Dadurch landet das Projektil beim expliziten Euler um exakt **einen halben Zeitschritt $\frac{\Delta t}{2}$ zu spät** ($t_{\text{num}} \approx t_{\text{ana}} + \frac{\Delta t}{2}$), weshalb auch $x_{\text{impact}} = v_{x0} \cdot t_{\text{num}}$ bei $\Delta t = 0{,}1\,\text{s}$ um ca. $+5{,}3\,\text{m}$ zu weit liegt! Der Kommentar in `Program.cs` Zeile 92 (*„In X ist der Fehler numerisch exakt 0“*) stimmt nur zu einem fest vorgegebenen Zeitpunkt $t$, **nicht** aber für die Wurfweite $x_{\text{impact}}$ bis zum Bodenkontakt $y=0$!
3. **Konkreter Verbesserungsvorschlag für Termin 01:**
   - Abschnitt 3 in `Aufgabenblatt.md` wie bei T02–T10 direkt auf `Vorlage/KinematikEuler.sln` beziehen.
   - In `EulerIntegrator.cs` für den Sprint z. B. `InterpolateGroundImpact` als `// TODO [Aufgabe A1]` offenlassen und in `Aufgabe A2` bereits im Sprint `StepHeun` für den Vakuumwurf ergänzen lassen (dann zeigt Heun tatsächlich $x_{\text{impact}} - x_{\text{ana}} = 0{,}000\,\text{m}$, weil Heun für quadratische Parabeln exakt ist, während Euler um $+\frac{1}{2} v_{x0} \Delta t$ überschießt!).

---

### Termin 02: Pixelgrafik, `WriteableBitmap` & Finite Differenzen (FDM)
- **Aufgabenblatt:** [Uebungen/Termin_02_Pixelgrafik_und_FDM/Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_02_Pixelgrafik_und_FDM/Aufgabenblatt.md)
- **Starter-Vorlage:** `Uebungen/Termin_02_Pixelgrafik_und_FDM/Vorlage/PixelHeatFDM.sln` ([HeatGrid.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_02_Pixelgrafik_und_FDM/Vorlage/PixelHeatFDM/Simulation/HeatGrid.cs), [BitmapHeatRenderer.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_02_Pixelgrafik_und_FDM/Vorlage/PixelHeatFDM/Rendering/BitmapHeatRenderer.cs), [MainWindow.xaml.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_02_Pixelgrafik_und_FDM/Vorlage/PixelHeatFDM/MainWindow.xaml.cs), [HeatGridTests.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_02_Pixelgrafik_und_FDM/Vorlage/Tests/HeatGridTests.cs))

#### Befunde & Kritikpunkte:
1. **Physikalischer Modellierungsfehler in Sprint-Aufgabe 3 ([Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_02_Pixelgrafik_und_FDM/Aufgabenblatt.md#L76-L81), Zeilen 76–81):**
   - Die Aufgabenstellung lautet:
     *„Erweitern Sie `HeatGrid` um ein 2D-Array `private readonly float[,] _alphaMap;`, sodass in `Step()` lokal mit $s_{x,y} = \frac{\alpha_{x,y} \cdot \Delta t}{\Delta x^2}$ gerechnet wird (Zellen mit $\alpha_{x,y} = 0$ wirken als perfekte thermische Isolatoren / Steinwände!). Rechte Maustaste gedrückt: Zeichnen Sie thermische Isolator-Wände ($\alpha_{x,y} = 0$, Temperatur fest auf $20\,^\circ\text{C}$) ins Gitter.“*
   - **Warum das physikalisch nicht als Isolator funktioniert:**
     Betrachten wir eine normale Zelle $(x,y)$ mit $\alpha_{x,y} = 10^{-4} > 0$ und $T_{x,y} = 80\,^\circ\text{C}$ direkt links neben einer solchen „Isolator-Wandzelle“ $(x+1, y)$ mit $\alpha_{x+1,y} = 0$ und $T_{x+1,y} = 20\,^\circ\text{C}$.
     In `HeatGrid.Step()` ([HeatGrid.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_02_Pixelgrafik_und_FDM/Vorlage/PixelHeatFDM/Simulation/HeatGrid.cs#L123-L132)) rechnet die Zelle $(x,y)$ mit **ihrem eigenen** $s_{x,y} > 0$:
     `laplace = (tRight + tLeft + tUp + tDown - 4 * tCenter)`. Da `tRight = 20°C` ist, fließt pro Zeitschritt ein starker Wärmestrom $s_{x,y} \cdot (20 - 80)$ aus der Zelle $(x,y)$ in die Wandzelle ab, während die Wandzelle wegen $s_{x+1,y} = 0$ stur auf $20\,^\circ\text{C}$ bleibt!
     **Folge:** Die gezeichnete Wand wirkt im Programm **nicht als adiabater Isolator**, sondern als **perfekte $20\,^\circ\text{C}$-Dirichlet-Kühlrippe (Wärmesenke)**, die die Wärmewolke abkühlt, statt sie adiabat umzuleiten!
   - **Einfacher Fix für `Aufgabenblatt.md` (Zeile 77) & `HeatGrid.cs`:**
     Wenn eine Nachbarzelle ein Isolator ($\alpha_{\text{Nachbar}} == 0$) ist, muss der Wärmefluss über diese Zellgrenze $0$ sein (Neumann-Spiegelung am Hindernis: `float tRight = _alphaMap[x + 1, y] == 0f ? tCenter : _tCurrent[x + 1, y];` analog für Left/Up/Down). Mit dieser einen Zeile umströmt die Wärmewolke das gezeichnete Labyrinth tatsächlich perfekt adiabat!
2. **Row-Major-Speicherlayout in `HeatGrid.cs` und `BitmapHeatRenderer.cs`:**
   - Wie bereits im Folien-Review zu Kapitel 02 beschrieben, ist `_tCurrent` als `float[width, height]` deklariert und wird in der inneren `x`-Schleife als `_tCurrent[x, y]` adressiert ([HeatGrid.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_02_Pixelgrafik_und_FDM/Vorlage/PixelHeatFDM/Simulation/HeatGrid.cs#L119-L134)). In C# liegt bei `float[dim0, dim1]` der Index `dim1` (`y`) hintereinander im Speicher. Für echte Row-Major-Cache-Lokalität sollte `float[height, width]` mit `_tCurrent[y, x]` (oder `float[width * height]` mit `[y * width + x]`) genutzt werden.
3. **Kleiner GC-Fix in `MainWindow.xaml.cs` (Zeilen 70–79):**
   - In `UpdateUiFromParameters()` werden bei jeder Slider-Bewegung neue `new SolidColorBrush(...)`-Objekte erzeugt. Auch wenn das nur bei Slider-Events passiert, wäre die Verwendung statischer Brushes konsistent mit der „0 GC Allocation“-Botschaft des Termins.

---

### Termin 03: Vektorgrafik, `WPF Canvas` & Koordinatentransformation
- **Aufgabenblatt:** [Uebungen/Termin_03_Vektorgrafik_Canvas/Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_03_Vektorgrafik_Canvas/Aufgabenblatt.md)
- **Starter-Vorlage:** `Uebungen/Termin_03_Vektorgrafik_Canvas/Vorlage/VectorTrussCanvas.sln` ([Transform2D.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_03_Vektorgrafik_Canvas/Vorlage/VectorTrussCanvas/Geometry/Transform2D.cs), [VectorArrow.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_03_Vektorgrafik_Canvas/Vorlage/VectorTrussCanvas/Geometry/VectorArrow.cs), [MainWindow.xaml.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_03_Vektorgrafik_Canvas/Vorlage/VectorTrussCanvas/MainWindow.xaml.cs))

#### Befunde & Kritikpunkte:
1. **Hervorragende Abstimmung zwischen Aufgabenblatt und Vorlage:**
   - Anders als auf Folie 259 von Kapitel 03 ist `Transform2D.cs` in der Übungsvorlage **völlig fehlerfrei** implementiert (`Update(double xMin, double xMax, double yMin, double yMax, ...)`).
   - Die Sprint-Aufgabe 4 (*„Fix des Bounding-Box-Jitterings beim Maus-Dragging“*, [Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_03_Vektorgrafik_Canvas/Aufgabenblatt.md#L80-L83)) ist ein echtes didaktisches Highlight: Man zieht Knoten $K_3$ in der Vorlage, merkt sofort, wie das Koordinatensystem unter der Maus wegrutscht, versteht die Ursache in `Redraw()` (`_transform.Update` während `_draggedNode != null`) und behebt sie in 2 Minuten!
2. **Kleiner Hinweis zu Peer-Review-Frage 4 ([Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_03_Vektorgrafik_Canvas/Aufgabenblatt.md#L213-L214)) vs. `Vorlage/MainWindow.xaml.cs`:**
   - Peer-Review-Frage 4 fragt kritisch: *„Werden bei jedem Maus-Move neue WPF-Shapes erzeugt und auf den Canvas geklatscht (Memory Leak), oder werden die bestehenden Koordinaten der Shapes dynamisch aktualisiert?“*
   - In `Vorlage/VectorTrussCanvas/MainWindow.xaml.cs` (Zeile 28 & 220) ruft jedoch `TrussCanvas_MouseMove` bei jedem Maus-Event `Redraw()` und darin `TrussCanvas.Children.Clear()` + `new Line` + `new Ellipse` + `new SolidColorBrush` auf!
   - **Empfehlung:** Entweder in Aufgabe 4 von Track A explizit erwähnen, dass `MainWindow.xaml.cs` in der Vorlage noch `Children.Clear()` nutzt und für hohe Knotenzahlen auf eingefrorene statische Brushes bzw. Shape-Wiederverwendung optimiert werden kann, oder die Peer-Review-Frage 4 auf das Einfrieren der Brushes (`Freeze()`) und das Vermeiden von ungelöschten Shapes beziehen.

---

### Termin 04: Telemetrie, `ScottPlot 5` & Welford-Statistik
- **Aufgabenblatt:** [Uebungen/Termin_04_Telemetrie_und_ScottPlot/Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_04_Telemetrie_und_ScottPlot/Aufgabenblatt.md)
- **Starter-Vorlage:** `Uebungen/Termin_04_Telemetrie_und_ScottPlot/Vorlage/ScottPlotTelemetry.sln` ([CircularBuffer.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_04_Telemetrie_und_ScottPlot/Vorlage/ScottPlotTelemetry/Data/CircularBuffer.cs), [WelfordStatistics.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_04_Telemetrie_und_ScottPlot/Vorlage/ScottPlotTelemetry/Statistics/WelfordStatistics.cs), [MainWindow.xaml.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_04_Telemetrie_und_ScottPlot/Vorlage/ScottPlotTelemetry/MainWindow.xaml.cs))

#### Befunde & Kritikpunkte:
1. **Starker In-Class Sprint (`Aufgabenblatt.md` Abschnitt 3):**
   - Die „GC-Leak-Jagd“ in `OnTelemetryTick` (Zeilen 115–123 von `MainWindow.xaml.cs`), die gleitende 10-Sekunden-Fensterauswertung über `_buffer.CopyTo(_windowCopy)` und der zweite `DataStreamer` sind in 45–60 Minuten ideal machbar und vermitteln genau die richtigen Ingenieur-Skills.
2. **Reibungspunkt für Stufe B (Homework): MSAGL (`Microsoft.Msagl.WpfGraphControl`) in .NET 8 WPF:**
   - Sowohl Track A (Punkt 4: Anlagentopologie) als auch Track B (Punkt 4: Streckentopologie) verlangen zwingend die Einbindung von **`Microsoft.Msagl.WpfGraphControl`** (1 Punkt in der Rubrik).
   - **Technischer Stolperstein für Studierende:**
     1. In `ScottPlotTelemetry.csproj` ist aktuell nur `ScottPlot.WPF` (Version `5.0.55`) referenziert, **nicht** aber `Microsoft.Msagl.WpfGraphControl`.
     2. Das offizielle NuGet-Paket `Microsoft.Msagl.WpfGraphControl` (v1.1.6) wurde ursprünglich für `.NET Framework` gebaut; unter `.NET 8.0-windows` erzeugt es beim Einbinden eine `NU1701`-Kompatibilitätswarnung und benötigt eine ganz bestimmte Initialisierungsreihenfolge (`GraphViewer.BindToPanel(panel)` nach dem `Loaded`-Event des Panels), die auf den Vorlesungsfolien von Kapitel 04 nicht gezeigt wird!
   - **Empfehlung:** `Microsoft.Msagl.WpfGraphControl` (oder ein kurzes 10-zeiliges `GraphViewer`-Initialisierungs-Snippet als Kommentar) direkt in `ScottPlotTelemetry.csproj` / `MainWindow.xaml.cs` vorinstallieren, damit die Studierenden zu Hause nicht an NuGet-/XAML-Binding-Problemen von MSAGL hängenbleiben.

---

### Termin 05: 3D-Visualisierung, `SharpGL` & Hierarchischer Szenengraph
- **Aufgabenblatt:** [Uebungen/Termin_05_3D_OpenGL_Szenengraph/Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_05_3D_OpenGL_Szenengraph/Aufgabenblatt.md)
- **Starter-Vorlage:** `Uebungen/Termin_05_3D_OpenGL_Szenengraph/Vorlage/SceneGraph3D.sln` ([OrbitCamera.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_05_3D_OpenGL_Szenengraph/Vorlage/SceneGraph3D/Camera/OrbitCamera.cs), [SceneNode.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_05_3D_OpenGL_Szenengraph/Vorlage/SceneGraph3D/Scene/SceneNode.cs), [MainWindow.xaml.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_05_3D_OpenGL_Szenengraph/Vorlage/SceneGraph3D/MainWindow.xaml.cs))

#### Befunde & Kritikpunkte:
1. **Eines der besten Starter-Projekte im gesamten Kurs:**
   - Die Vorlage `SceneGraph3D` löst das Problem, dass OpenGL 2.1 in Kapitel 05 sehr viel Boilerplate hat, auf brillante Weise: Kamera, Licht, Bodenraster, Quader/Zylinder/Kugel-Primitive mit korrekten Normalenvektoren und der Vergleich zwischen analytischem TCP (`CalculateAnalyticTcp`) und Szenengraph-Matrix (`_pinoleNode.GetWorldPosition()`) sind bereits lauffähig vorhanden!
   - Die 3 Sprint-Aufgaben (A1: `RenderRobot` über `RenderCustomGeometry` und `_rootNode.Render(gl)` vereinheitlichen; A2: `OrbitCamera.Pan` mit rechter Maustaste; A3: `_workpieceNode` + 3D-Distanzprüfung) sind glasklar spezifiziert und bereiten direkt auf Track A (4-Achs-SCARA mit Parallelgreifer & Teach-In) und Track B (3D Claw Crane) vor.
2. **Kleiner subtiler Hinweis zu Aufgabe A1 (`gl.Scale` auf Elternknoten vs. Kindknoten):**
   - Wenn Studierende in Aufgabe A1 die Zeichenlogik aus `RenderRobot(gl)` ([MainWindow.xaml.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_05_3D_OpenGL_Szenengraph/Vorlage/SceneGraph3D/MainWindow.xaml.cs#L174-L178)) in `_arm1Node.RenderCustomGeometry` verschieben, müssen sie darauf achten, das `gl.PushMatrix(); gl.Translate(L1 / 2.0f, 0, 0); gl.Scale(L1, 0.14f, 0.18f); DrawCube(gl); gl.PopMatrix();` **innerhalb** von `RenderCustomGeometry` beizubehalten (und **nicht** `_arm1Node.Sx = L1` zu setzen!), weil `_arm1Node.Sx = L1` sonst auch alle Kindknoten (`_arm2Node`, `_pinoleNode`) anisotrop verzerren würde! Ein kurzer Tipp dazu in Aufgabe A1 spart 15 Minuten Fehlersuche im Hörsaal.

---

### Termin 06: Multithreading, TPL & Reaktive WPF-Entkopplung
- **Aufgabenblatt:** [Uebungen/Termin_06_Multithreading_und_TPL/Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_06_Multithreading_und_TPL/Aufgabenblatt.md)
- **Starter-Vorlage:** `Uebungen/Termin_06_Multithreading_und_TPL/Vorlage/MultithreadingBenchmark.sln` ([ParticleField.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_06_Multithreading_und_TPL/Vorlage/MultithreadingBenchmark/Simulation/ParticleField.cs), [ParallelRunner.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_06_Multithreading_und_TPL/Vorlage/MultithreadingBenchmark/Benchmarks/ParallelRunner.cs), [MainWindow.xaml.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_06_Multithreading_und_TPL/Vorlage/MultithreadingBenchmark/MainWindow.xaml.cs))

#### Befunde & Kritikpunkte:
1. **Didaktisch perfekt inszenierter „Aha-Effekt“ im Sprint:**
   - Wenn man `MultithreadingBenchmark` startet und auf „Simulation starten“ klickt, friert das Fenster absichtlich ein, weil die Schleife noch synchron auf dem UI-Thread läuft ([MainWindow.xaml.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_06_Multithreading_und_TPL/Vorlage/MultithreadingBenchmark/MainWindow.xaml.cs#L112-L159)). Das Umbauen auf `async/await`, `Task.Run`, `IProgress<SimulationProgress>` und `CancellationTokenSource` (Aufgaben A1–A3) macht das abstrakte Thema UI-Entkopplung sofort greifbar.
2. **Kleiner Inkonsistenz-Check in Track A ([Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_06_Multithreading_und_TPL/Aufgabenblatt.md#L112-L129)):**
   - Im ASCII-Diagramm von Track A (Zeile 113) steht über Bauteil 3 `Scheibe L_3 [Log-Normal]`, im Fließtext darunter (Zeile 127) ist Bauteil 3 jedoch als Normalverteilung $L_3 \sim \mathcal{N}(\mu=1{,}50\,\text{mm}, \sigma=0{,}010\,\text{mm})$ angegeben. Da die Log-Normalverteilung erst in Kapitel 09 hergeleitet wird, ist die Normalverteilung im Text (Zeile 127) genau richtig – im ASCII-Kasten (Zeile 113) sollte `[Log-Normal]` einfach in `[Normal / Gauss]` geändert werden.

---

### Termin 07: Statische Modelle, FEM-Fachwerke & Cholesky-Löser
- **Aufgabenblatt:** [Uebungen/Termin_07_Statik_FEM_Cholesky/Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_07_Statik_FEM_Cholesky/Aufgabenblatt.md)
- **Starter-Vorlage:** `Uebungen/Termin_07_Statik_FEM_Cholesky/Vorlage/TrussFemSolver.sln` ([TrussElement.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_07_Statik_FEM_Cholesky/Vorlage/TrussFemSolver/Fem/TrussElement.cs), [GlobalStiffnessMatrix.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_07_Statik_FEM_Cholesky/Vorlage/TrussFemSolver/Fem/GlobalStiffnessMatrix.cs), [CholeskySolver.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_07_Statik_FEM_Cholesky/Vorlage/TrussFemSolver/Fem/CholeskySolver.cs), [MainWindow.xaml.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_07_Statik_FEM_Cholesky/Vorlage/TrussFemSolver/MainWindow.xaml.cs))

#### Befunde & Kritikpunkte:
1. **Sehr saubere FEM-Implementierung in `Vorlage/TrussFemSolver`:**
   - Die Klassen `TrussElement`, `GlobalStiffnessMatrix` (insbesondere `Partition()` auf Zeilen 93–125) und `CholeskySolver` sind vorbildlich strukturiert und zeigen genau das, was in Kapitel 07 auf den Folien etwas zu kurz kam.
2. **Hinweis zur „Verheiratung mit Termin 03“ (`VectorTrussCanvas` $\leftrightarrow$ `TrussFemSolver`):**
   - Im Aufgabenblatt wird betont, den Canvas aus Termin 03 mit dem FEM-Solver aus Termin 07 zu „verheiraten“.
   - Tatsächlich bringt `Vorlage/TrussFemSolver` bereits ein eigenes `MainWindow.xaml.cs` mit einer eigenen `RenderCanvas()`-Methode mit, in der allerdings die Klasse `VectorArrow` und `DrawSupportSymbol` aus Termin 03 (`Vorlage/VectorTrussCanvas`) fehlen.
   - **Tipp für `Aufgabenblatt.md` (Aufgabe A1, Zeile 105):** Explizit erwähnen, dass die Studierenden `VectorArrow.cs` und `DrawSupportSymbol(...)` direkt aus ihrem `Termin_03`-Projekt in `TrussFemSolver` herüberkopieren dürfen und sollen! Das unterstreicht den Portfolio-Gedanken perfekt.
3. **Exception-Typ in Track B ([Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_07_Statik_FEM_Cholesky/Aufgabenblatt.md#L215-L221)):**
   - Auf Zeile 219 des Aufgabenblatts steht `catch (NonPositiveDefiniteException)` für `K_ff.Cholesky().Solve(f_f)`.
   - **Technischer Fakt in `MathNet.Numerics` (v5.0.0):** `DenseMatrix.Cholesky()` wirft bei einer nicht positiv definiten Matrix in Math.NET Numerics eine **`System.ArgumentException`** (*"Matrix must be positive definite"*), die in `CholeskySolver.Solve()` ([CholeskySolver.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_07_Statik_FEM_Cholesky/Vorlage/TrussFemSolver/Fem/CholeskySolver.cs#L40-L44)) bereits in eine `InvalidOperationException` gewrappt wird (es gibt in `MathNet.Numerics` keine Klasse namens `NonPositiveDefiniteException`!).
   - **Korrektur in `Aufgabenblatt.md` (Zeile 215 & 219 & 278):** `NonPositiveDefiniteException` durch `ArgumentException` bzw. `InvalidOperationException` (aus `CholeskySolver.Solve`) ersetzen!

---

### Termin 08: Dynamische Modelle Kontinuierlich, S-Function-Architektur & RK4
- **Aufgabenblatt:** [Uebungen/Termin_08_DGL_und_SFunctions/Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_08_DGL_und_SFunctions/Aufgabenblatt.md)
- **Starter-Vorlage:** `Uebungen/Termin_08_DGL_und_SFunctions/Vorlage/SFunctionSimulation.sln` ([ISFunction.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_08_DGL_und_SFunctions/Vorlage/SFunctionSimulation/Core/ISFunction.cs), [DCMotorWithAntiWindup.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_08_DGL_und_SFunctions/Vorlage/SFunctionSimulation/Models/DCMotorWithAntiWindup.cs), [RungeKutta4Solver.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_08_DGL_und_SFunctions/Vorlage/SFunctionSimulation/Solvers/RungeKutta4Solver.cs), [MainWindow.xaml.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_08_DGL_und_SFunctions/Vorlage/SFunctionSimulation/MainWindow.xaml.cs))

#### Befunde & Kritikpunkte:
1. **Exzellentes Aufgabenblatt & Starter-Kit:**
   - Die elektromechanischen Zeitkonstanten ($T_{\text{el}} = 25\,\text{ms}$, $T_{\text{m}} \approx 0{,}833\,\text{s}$) und die analytische Leerlaufdrehzahl ($\omega_\infty = 200\,\text{rad/s}$ nach $t \approx 8\,\text{s}$) sind im Aufgabenblatt (Zeilen 106–112) und im Unit-Test `SFunctionTests.cs` vorbildlich aufeinander abgestimmt.
   - Auch die 3 Sprint-Aufgaben (A1: Expliziter Euler & Stabilitätsgrenze testen; A2: `PidController` extrahieren; A3: Direktvergleich MIT vs. OHNE Anti-Windup im selben Plot) und die beiden Homework-Tracks (Track A: 5. Zustand Wicklungstemperatur $T_{\text{Cu}}$ mit Derating; Track B: SpaceX Falcon 9 Booster-Landung mit Gimbal-Sättigung) gehören zu den besten Aufgaben des gesamten Kurses!
2. **Einziger Hinweis:** Wie im Folien-Review zu Kapitel 08 angemerkt, sollten die Code-Folien in Abschnitt 8.7 der Vorlesung an die saubere Signatur von `ISFunction` (`DCMotorWithAntiWindup.cs`) angeglichen werden.

---

### Termin 09: Dynamische Modelle Diskret, DES & Warteschlangen
- **Aufgabenblatt:** [Uebungen/Termin_09_Diskrete_Systeme_DES/Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_09_Diskrete_Systeme_DES/Aufgabenblatt.md)
- **Starter-Vorlage:** `Uebungen/Termin_09_Diskrete_Systeme_DES/Vorlage/DiscreteEventSimulation.sln` ([QueueSystem.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_09_Diskrete_Systeme_DES/Vorlage/DiscreteEventSimulation/Models/QueueSystem.cs), [LogNormalDistribution.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_09_Diskrete_Systeme_DES/Vorlage/DiscreteEventSimulation/Random/LogNormalDistribution.cs), [MainWindow.xaml.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_09_Diskrete_Systeme_DES/Vorlage/DiscreteEventSimulation/MainWindow.xaml.cs))

#### Befunde & Kritikpunkte:
1. **Musterbeispiel für Constructive Alignment im Sprint:**
   - Die drei Sprint-Aufgaben (A1: `waitingQueue.Count >= Capacity` vs. `totalInSystem >= Capacity` und Little's Gesetz mit $\lambda_{\text{eff}}$; A2: Box-Muller in `LogNormalDistribution.Sample()` und Beobachtung des Pollaczek-Khinchine-Heavy-Tail-Effekts; A3: Parallelisierung der 100 Monte-Carlo-Läufe via `Parallel.For` mit Prime-Stride-Seed `42 + r * 104729`) sind im Code mit millimetergenauen `// TODO [Aufgabe A1/A2/A3]`-Kommentaren markiert.
   - Zudem ist `QueueSystem.cs` bereits für `int Servers` ($c \ge 1$) vorbereitet, sodass die Studierenden in Stufe B (Track A Lackierstraße $M/M/3/25$ bzw. Track B Achterbahn $M/M/3/25$) sich voll auf die **Prioritäts-Warteschlange (Express/VIP überholt Standard)** und die getrennte statistische Auswertung ($\bar{W}_{\text{VIP}}$ vs. $\bar{W}_{\text{Standard}}$) konzentrieren können.

---

### Termin 10: Hybride Dynamik, Zero-Crossing Wurzelsuche & Zeno-Vermeidung
- **Aufgabenblatt:** [Uebungen/Termin_10_Hybride_Dynamik_Synthese/Aufgabenblatt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_10_Hybride_Dynamik_Synthese/Aufgabenblatt.md)
- **Starter-Vorlage:** `Uebungen/Termin_10_Hybride_Dynamik_Synthese/Vorlage/HybridZeroCrossing.sln` ([BouncingContactModel.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_10_Hybride_Dynamik_Synthese/Vorlage/HybridZeroCrossing/Models/BouncingContactModel.cs), [BisectionRootFinder.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_10_Hybride_Dynamik_Synthese/Vorlage/HybridZeroCrossing/ZeroCrossing/BisectionRootFinder.cs), [MainWindow.xaml.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_10_Hybride_Dynamik_Synthese/Vorlage/HybridZeroCrossing/MainWindow.xaml.cs))

#### Befunde & Kritikpunkte:
1. **Perfekter Semesterabschluss:**
   - Die Vorlage `HybridZeroCrossing` kombiniert `WPF Canvas` (links) und `ScottPlot 5` (rechts) und lässt uns im Sprint unmittelbar erleben, warum ein naiver Festschritt ($h = 0{,}048\,\text{s}$) über $30\,\text{mm}$ in den Boden eindringt und die Energiebilanz verfälscht, während `BisectionRootFinder.FindRoot` auf $< 1\,\mu\text{m}$ genau trifft und $\frac{E^+}{E^-} = e^2 = 0{,}6400$ exakt einhält.
   - Auch Aufgabe A2 (Rückkehr aus dem Zeno-Ruhezustand `RestingOnGround` in `FreeFlight` beim Klick auf den „⚡ Kick“-Button) bereitet direkt auf das Losbrechen aus der Haftreibung beim Pneumatikzylinder (Track A) bzw. den Flipperfinger-Stoß (Track B) vor.
2. **Kleiner mathematischer Hinweis zu `BouncingContactModel.StepNaive` ([BouncingContactModel.cs](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_10_Hybride_Dynamik_Synthese/Vorlage/HybridZeroCrossing/Models/BouncingContactModel.cs#L176-L198)):**
   - In `ComputeTotalEnergy(double[] x)` (Zeile 108) steht `double hEff = Math.Max(0.0, x[0] - Radius);`.
   - Wenn der Ball im naiven Modus bei `xNext[0] < Radius` (unterhalb der Bodenlinie!) reflektiert wird (`xNext[1] = -Restitution * xNext[1]`), ist `hEff == 0.0` sowohl unmittelbar vor als auch nach der Geschwindigkeitsumkehr. Damit ergibt `eAfter / eBefore` an dieser Stelle trotzdem scheinbar exakt `Restitution * Restitution = 0.6400`, **obwohl** der Ball im nächsten Zeitschritt noch unter dem Boden steckt oder durch die zusätzliche Falltiefe $\Delta y_{\text{penetration}} = R - x_{\text{next}}[0]$ eine zu hohe Aufprallgeschwindigkeit $|v^-|$ hatte!
   - **Tipp für Aufgabe A1 (`BouncingContactModel.cs` Zeile 186):** Wenn man in `ComputeTotalEnergy` `double hEff = x[0] - Radius;` (ohne `Math.Max(0.0, ...)`) rechnet oder die Gesamtenergie nach dem Stoß mit der theoretischen Soll-Energie $e^2 \cdot E_{\text{vor dem Schritt}}$ vergleicht, sieht man auch im Zahlenwert `LastEnergyRatio` sofort den unphysikalischen Energiefehler des naiven Verfahrens!
