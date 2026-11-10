# Übungskatalog & C#-Simulations-Portfolio (`T01` bis `T10`)
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling

**Dokument-ID:** `Konzept/02_Uebungskatalog_und_Abschlussprojekt.md`  
**Geltungsbereich:** Wöchentliche zweistufige Hausübungen (`Uebungen/Termin_01_*` bis `Termin_10_*`) und das 10-teilige C#-Simulations-Portfolio  
**Begleitdokumente (Single Source of Truth):**
- [`Konzept/01_Lehrveranstaltungsstruktur_und_Syllabus.md`](./01_Lehrveranstaltungsstruktur_und_Syllabus.md) – Lehrkonzept, Syllabus, Kausalitäts- & Kapitel-Abhängigkeitsmatrix
- [`Konzept/03_Benotung_Moodle_Tests_und_Vibe_Coding_Assessment.md`](./03_Benotung_Moodle_Tests_und_Vibe_Coding_Assessment.md) – Lernfortschrittskontrolle, 2-Säulen-Benotung (40–40–20), Rubriken & AI Honor Code

---

## 1. Struktur der zweistufigen Hausübungen & Goldene Architektur-Regel

### 1.1 Das 2-Stufen-Hausübungsmodell (Heimarbeit im 2er-Team)
Alle 10 Übungseinheiten folgen derselben zweistufigen Struktur (**Ziffern = nacheinander Pflicht**, **Buchstaben = Auswahl**):

1. **Stufe 1: Basisaufgabe (Gemeinsames Fundament auf der C#-Vorlage, ca. 60 Min.):**
   - Alle Teams starten in der bereitgestellten Solution (`Uebungen/Termin_XX_*/Vorlage/*.sln`).
   - Sie bearbeiten **4 präzise geführte Teilaufgaben (`1. Aufgabe 1.1` bis `4. Aufgabe 1.4`)**, prüfen ihre Berechnungen sofort anhand der im Aufgabenblatt angegebenen **Golden Reference Numbers** (5-Sekunden-Selbsttest) und bringen in `Aufgabe 1.4` alle automatisierten MSTest-Unit-Tests (`dotnet test`) auf Grün.
   - **Nahtloser Unterbau:** Das Ergebnis von Stufe 1 ist das **direkte technische Fundament für beide Wahl-Tracks in Stufe 2** (kein Verwerfen oder Neustart auf der grünen Wiese).
2. **Stufe 2: Vertiefungsaufgabe im Wahlmodell (`Track A` ODER `Track B`, ca. 3–4 h):**
   - Jedes 2er-Team wählt pro Termin **genau einen** Ausbau-Track (**keine Doppelbelastung!**):
     - **Track A (Industrie & Mechatronik, Arbeitspakete `A.1`–`A.4`):** Industrielle Anlagen, Prüfstände, Tragwerksstatik, Regelkreise und Virtuelle Inbetriebnahme.
     - **Track B (Simulation Game & Arcade-Physik, Arbeitspakete `B.1`–`B.4`):** Interaktive Physik-Spiele, Partikel-/Schwarmsimulationen, Brückenbau-Physik und Gameloops.
   - Beide Tracks umfassen exakt **4 symmetrische Arbeitspakete (`A.1`–`A.4` bzw. `B.1`–`B.4`)** mit identischem Aufwand und identischer 10-Punkte-Bewertungsrubrik.

### 1.2 Die Goldene Regel der Simulationsarchitektur
Alle 10 Portfolio-Module müssen drei verbindliche Architektur-Prinzipien einhalten:
1. **Strikte Entkopplung von Physik und UI:** Simulations- und Numerik-Klassen enthalten keinerlei Abhängigkeit zu `System.Windows` oder Grafik-Controls; die View konsumiert Daten über DTOs, vorallokierte Puffer oder MVVM-Bindings.
2. **Allokationsfreie Zeitschritt- & Render-Schleifen:** Im laufenden Zeitschritt (`Step()`) und im Render-Timer dürfen keine Heap-Allokationen (`new` von Arrays/Listen/LINQ) stattfinden (0 Byte GC-Druck im stationären Betrieb).
3. **Deterministische Testbarkeit (`dotnet test`):** Jedes Modul sichert seine Numerik über MSTest-Unit-Tests gegen analytische Grenzfälle, Erhaltungssätze oder Referenzwerte ab.

---

## 2. Kapitelweiser Übungskatalog (`Einheit 01` bis `Einheit 10`)

### Einheit 01: Kinematik, Expliziter Euler & Heun-Verfahren (RK2)
- **Artefakte:** [`Aufgabenblatt.md`](../Uebungen/Termin_01_Kinematik_und_Euler/Aufgabenblatt.md) | [`Vorlage/KinematikEuler.sln`](../Uebungen/Termin_01_Kinematik_und_Euler/Vorlage/KinematikEuler.sln) | **Foliensatz:** [Kapitel 01](../Folien/01_Einführung/Folien.md)
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Expliziten Euler-Schritt (`EulerIntegrator.Step`) für `KinematicState` vervollständigen.
  - `1.2`: Zweistufiges Prädiktor-Korrektor-Verfahren nach Heun (`EulerIntegrator.StepHeun`, RK2) implementieren.
  - `1.3`: Lineare Auftreff-Interpolation $\alpha = \frac{y_k}{y_k - y_{k+1}}$ am Nulldurchgang $y = 0$ umsetzen.
  - `1.4`: Konvergenz- und Vakuum-Referenztests (`1019,368 m` analytisch vs. $+5{,}310\,\text{m}$ Euler-Drift bei $\Delta t = 0{,}01\,\text{s}$) via `dotnet test` verifizieren.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – Hydraulikzylinder-Dämpfung):** Not-Stopp einer Schwerlastachse ($m = 250\,\text{kg}, v_0 = 4{,}0\,\text{m/s}$) mit linearer Feder, viskoser Dämpfung und quadratischer Blendenreibung ($-d_{\text{quad}}v|v|$), Umkehrpunkt-Interpolation ($v = 0$) und Auslegung für $x_{\max} \le 0{,}18\,\text{m}$.
  - **Track B (`B.1`–`B.4` – Artillery Strike / Retro Tanks):** 2D-Ballistik mit quadratischem Newton-Luftwiderstand, Relativwind $\mathbf{v}_{\text{rel}} = \mathbf{v} - \mathbf{w}$, Heun-Integration, Bodenkollisions-Interpolation und ASCII-Trajektorienplot ($80 \times 25$).
- **Showcase- & Code-Defense-Fokus:** Warum überschätzt der explizite Euler die Wurfhöhe und landet um $\Delta t / 2$ zu spät? Wirkt $-d_{\text{quad}}v|v|$ in beide Richtungen bremsend?

---

### Einheit 02: 2D-Pixelgrafik (`WriteableBitmap`) & FDM-Wärmeleitung
- **Artefakte:** [`Aufgabenblatt.md`](../Uebungen/Termin_02_Pixelgrafik_und_FDM/Aufgabenblatt.md) | [`Vorlage/PixelHeatFDM.sln`](../Uebungen/Termin_02_Pixelgrafik_und_FDM/Vorlage/PixelHeatFDM.sln) | **Foliensatz:** [Kapitel 02](../Folien/02_Visualisierung_2D_Pixel/Folien.md)
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Vorberechnete 256-Stufen-Farbtabelle (`ThermalColorMap`, Blau $\to$ Cyan $\to$ Grün $\to$ Gelb $\to$ Rot) für $\mathcal{O}(1)$-Lookup aufbauen.
  - `1.2`: Ortsabhängiges Temperaturleitfähigkeits-Gitter (`AlphaMap`) mit adiabaten Neumann-Spiegelungen an Isolator-Hindernissen ($\alpha = 0$) im 5-Punkt-Stern umsetzen.
  - `1.3`: Interaktives Maus-Zeichnen von Wärmequellen und Isolatorwänden über `WriteableBitmap.Lock()` und `BackBuffer` anbinden.
  - `1.4`: Stationäre Wärmebilanz und LUT-Zuordnung mit `dotnet test` prüfen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – CPU-Kühlkörper-Optimierung):** Mehrzonen-Gitter (Silizium-Chip, Kupfer-Heatspreader, Alu-Finne), konvektive Robin-Randbedingung am oberen Rand (Lüfter Aus vs. Ein) und experimenteller Nachweis der Schachbrett-Explosion bei $s > 0{,}25$.
  - **Track B (`B.1`–`B.4` – Falling Sand & Doom Fire / Lava):** Zelluläre Partikel-Physik (Sand-Böschung, Wasser-Verdampfung bei $100\,^\circ\text{C}$, Lava-Wärmequellen) gekoppelt mit aufsteigender Konvektionsglut im FDM-Temperaturfeld.
- **Showcase- & Code-Defense-Fokus:** Live-Stresstest mit $s = 0{,}28 > 0{,}25$ (echte Schachbrett-Oszillation vs. künstliches `Math.Clamp`), Stride-Berechnung (`width * 4`) und Double-Buffering (`_tCurrent` $\leftrightarrow$ `_tNext`).

---

### Einheit 03: 2D-Vektorgrafik (`WPF Canvas`) & Transformationen *(Rein geometrisch)*
- **Artefakte:** [`Aufgabenblatt.md`](../Uebungen/Termin_03_Vektorgrafik_Canvas/Aufgabenblatt.md) | [`Vorlage/VectorTrussCanvas.sln`](../Uebungen/Termin_03_Vektorgrafik_Canvas/Vorlage/VectorTrussCanvas.sln) | **Foliensatz:** [Kapitel 03](../Folien/03_Visualisierung_2D_Vektor/Folien.md)
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Euklidische Stablängenberechnung $L = \sqrt{\Delta x^2 + \Delta y^2}$ in Weltkoordinaten ergänzen.
  - `1.2`: Vertikale DIN-406-Gesamthöhenbemaßung mit im Screen Space gedrehten Maßpfeilen implementieren.
  - `1.3`: Bounding-Box-Jittering beim interaktiven Knoten-Dragging durch Einfrieren der Referenz-BoundingBox während `MouseMove` beheben.
  - `1.4`: Hin- und Rücktransformation (`WorldToScreen` $\leftrightarrow$ `ScreenToWorld`) und Pfeilgeometrie mit `dotnet test` verifizieren.
- **Stufe 2 – Wahlmodell (10 Pkt. – *Vorgreif-Sperre: Keine FEM-Statik vor T07!*):**
  - **Track A (`A.1`–`A.4` – 2D-CAD Tragwerks-Inspektor):** Zweistufige DIN-406-Bemaßungsketten (Einzelfelder + Gesamtspannweite), interaktives Ziehen/Drehen von Kraftpfeilspitzen $(F_x, F_y)$, Mausrad-Zoom/Pan und JSON-Import/Export.
  - **Track B (`B.1`–`B.4` – Poly Bridge Blueprint-Baumeister):** Interaktives Brückenbau-Zeichenbrett über einer Schlucht mit $0{,}5\,\text{m}$-Grid-Snapping, gestrichelter Stab-Vorschau ($L_{\max} = 4{,}0\,\text{m}$), Knoten-/Stab-Löschung (`Entf`), Live-Baubudget ($1\,000\,\text{EUR/m}$) und JSON-Level-Export.
- **Showcase- & Code-Defense-Fokus:** Seitenverhältnis-Stresstest (32:9-Fenster $\implies$ bleibt Geometrie verzerrungsfrei?), Y-Achsen-Inversion ($+Y$ oben vs. unten) und Skalierungsinvarianz der Screen-Space-Pfeilspitzen.

---

### Einheit 04: Echtzeit-Telemetrie (`ScottPlot 5`), Ringpuffer & `MSAGL`
- **Artefakte:** [`Aufgabenblatt.md`](../Uebungen/Termin_04_Telemetrie_und_ScottPlot/Aufgabenblatt.md) | [`Vorlage/ScottPlotTelemetry.sln`](../Uebungen/Termin_04_Telemetrie_und_ScottPlot/Vorlage/ScottPlotTelemetry.sln) | **Foliensatz:** [Kapitel 04](../Folien/04_Visualisierung_2D_Diagramme/Folien.md)
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Allokationsfreies `CircularBuffer<T>.CopyTo(T[] destination)` in chronologischer Reihenfolge implementieren.
  - `1.2`: Numerisch stabile Online-Varianz nach B. P. Welford (`WelfordStatistics.Add`) vervollständigen.
  - `1.3`: GC-Memory-Leak im 50-Hz-Render-Timer beheben (einmaliges `Plot.Add.Signal` im Konstruktor statt `Plot.Clear()` + Neuallokation pro Frame).
  - `1.4`: Dynamische $\pm 3\sigma$-Toleranzlinien im Plot nachführen und Ringpuffer-/Welford-Tests (`dotnet test`) bestehen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – 1-kHz-Vibrationsmonitoring & Industrie-4.0-Leitstand):** Synchronisierte Mehrkanal-Telemetrie (Schwingung, Temperatur, Strom), entprellte $+3\sigma$-Anomalie-Erkennung mit Alarm-Log und `MSAGL`-Anlagentopologie mit roter Knoten-Hervorhebung im Fehlerfall.
  - **Track B (`B.1`–`B.4` – Retro Arcade Racing Telemetry):** Live-Geschwindigkeits-/RPM-Signalplot, 2D-G-Force-Phasenplot (Kamm'scher Traktionskreis $1{,}2\,g$), Welford-Rundenzeitstatistik und `MSAGL`-Rennstreckengraph mit Sektor-Tracking.
- **Showcase- & Code-Defense-Fokus:** 0-Byte-Allokationsprüfung im Render-Timer, numerische Auslöschung bei naiver Varianzformel vs. Welford, ScottPlot-5-API vs. veraltete v4-Syntax.

---

### Einheit 05: 3D-Visualisierung (`SharpGL`) & Kinematische Szenengraphen
- **Artefakte:** [`Aufgabenblatt.md`](../Uebungen/Termin_05_3D_OpenGL_Szenengraph/Aufgabenblatt.md) | [`Vorlage/SceneGraph3D.sln`](../Uebungen/Termin_05_3D_OpenGL_Szenengraph/Vorlage/SceneGraph3D.sln) | **Foliensatz:** [Kapitel 05](../Folien/05_Visualisierung_3D_OpenGL/Folien.md)
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Szenengraph-Traversierung vereinen (`RenderCustomGeometry` an `_baseNode`, `_arm1Node`, `_arm2Node`, `_pinoleNode` zuweisen und `_rootNode.Render(gl)` nutzen; $\Delta = 0{,}000\,\text{mm}$ TCP-Deckung).
  - `1.2`: Zielpunkt-Panning (`OrbitCamera.Pan(deltaRight, deltaUp)`) entlang des lokalen Kamera-Rechtsvektors in der XZ-Ebene und der Welt-Y-Achse implementieren.
  - `1.3`: 3D-Werkstück-Knoten (`_workpieceNode`) unter `_rootNode` einhängen und euklidischen Greifabstand $d = \|\vec{p}_{\text{TCP}} - \vec{p}_{\text{Workpiece}}\|_2 < 0{,}12\,\text{m}$ prüfen.
  - `1.4`: Vorbereitete Assertions für `OrbitCamera.Pan` in `SceneGraphTests.cs` aktivieren und alle 5 Unit-Tests (`dotnet test`) auf Grün bringen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – 4-Achs-SCARA-Roboterarm):** Ausbau um Achse 4 (`_wristNode`, $\theta_4$) und 2-Backen-Parallelgreifer ($g_{\text{width}}$), 60-Hz-Teach-In-Bahnsteuerung zwischen Posen, Pick-and-Place-Werkstücktransport via Re-Parenting und Spotlight (`GL_LIGHT1`).
  - **Track B (`B.1`–`B.4` – 3D Arcade Claw Crane):** Hierarchischer Greifautomat (Portalbrücke $\to$ Laufkatze $\to$ Seilwinde $\to$ 3-Finger-Klaue), Tastatursteuerung (`PreviewKeyDown`) mit automatischem Absenk-/Greif-/Rückführzyklus, Kollisions-Snap von Preiskisten und Decken-Spotlight (`GL_LIGHT1`).
- **Showcase- & Code-Defense-Fokus:** Nicht-Kommutativität $\mathbf{T}\cdot\mathbf{R} \neq \mathbf{R}\cdot\mathbf{T}$, warum Skalierung (`Sx = L1`) nicht auf Gelenkknoten liegen darf, `gl.PushMatrix`/`gl.PopMatrix`-Isolation und Gimbal-Lock-Schutz ($\phi \in [-85^\circ, +85^\circ]$).

---

### Einheit 06: Multithreading (`TPL Parallel.For`), Synchronisation & Amdahl
- **Artefakte:** [`Aufgabenblatt.md`](../Uebungen/Termin_06_Multithreading_und_TPL/Aufgabenblatt.md) | [`Vorlage/MultithreadingBenchmark.sln`](../Uebungen/Termin_06_Multithreading_und_TPL/Vorlage/MultithreadingBenchmark.sln) | **Foliensatz:** [Kapitel 06](../Folien/06_Multithreading/Folien.md)
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Datenparallelen Partikelschritt (`StepParallel`) mit `Parallel.For` und `MaxDegreeOfParallelism` implementieren.
  - `1.2`: UI-Freeze durch Auslagerung in `Task.Run` mit gedrosseltem `IProgress<T>` und kooperativem `CancellationTokenSource` beheben.
  - `1.3`: Automatisierte Kernskalierungsreihe ($p = 1 \dots P_{\max}$) mit JIT-Warmup und Amdahl-Berechnung aufbauen.
  - `1.4`: Bitweise/numerische Übereinstimmung zwischen `StepSerial` und `StepParallel` via `dotnet test` nachweisen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – Parallele Monte-Carlo-Toleranzanalyse):** Maßkettenrechnung für $10^7$ Getriebewellen-Baugruppen (Box-Muller), Thread-lokale Reduktion vs. `Interlocked` vs. `lock` und Amdahl-Parameterfit für den seriellen Anteil $1 - f_{\text{par}}$.
  - **Track B (`B.1`–`B.4` – 100.000 Boids / Zombie-Horde):** Hochparalleler 2D-Schwarm-Benchmark mit strikter Read/Write-Puffertrennung (`stateRead` $\to$ `stateWrite`), Kernskalierung und experimentellem Nachweis von *False Sharing* (`long[p]` vs. `long[p * 16]`).
- **Showcase- & Code-Defense-Fokus:** Warum ist `new Random()` in parallelen Schleifen nicht thread-sicher? Warum bremst `lock` in der inneren Schleife auf $S < 1$ aus? Wie entsteht 64-Byte Cache-Line Ping-Pong (*False Sharing*)?

---

### Einheit 07: Statische Systeme: FEM-Fachwerke, Cholesky & Newton-Raphson
- **Artefakte:** [`Aufgabenblatt.md`](../Uebungen/Termin_07_Statik_FEM_Cholesky/Aufgabenblatt.md) | [`Vorlage/TrussFemSolver.sln`](../Uebungen/Termin_07_Statik_FEM_Cholesky/Vorlage/TrussFemSolver.sln) | **Foliensatz:** [Kapitel 07](../Folien/07_Statische_Modelle/Folien.md)
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: $4\times 4$-Elementsteifigkeitsmatrix $\mathbf{K}_e$ in die globale Matrix $\mathbf{K}$ assemblieren.
  - `1.2`: Blockpartitionierung nach freien ($f$) und gesperrten ($p$) Freiheitsgraden ($\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$) via `kff.Cholesky().Solve(ff)` sowie Auflagerreaktionen $\mathbf{f}_p$ und Stabkräfte $N_e$ berechnen.
  - `1.3`: Auflager-Symbole, Reaktionspfeile und 5-Knoten-Auslegerkran im Canvas-Frontend ergänzen.
  - `1.4`: Analytische Kragträger-Referenz ($N_0 = +20\,\text{kN}, N_1 = -20\sqrt{2}\,\text{kN}$), globales Gleichgewicht ($\|\sum \vec{F}\| < 10^{-9}\,\text{N}$) und Singularitäts-Erkennung via `dotnet test` verifizieren.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – Portalkran-Verformung unter Wanderlast):** Verfahrbare Laufkatzen-Last über das Tragwerk aus T03, überhöhte elastische Verformungsdarstellung ($\mathbf{p}_i + \alpha_{\text{scale}}\mathbf{u}_i$), Zug-/Druck-Farbcodierung und Euler-Knicknachweis ($N_{\text{knick}} = \frac{\pi^2 E I}{L^2}$).
  - **Track B (`B.1`–`B.4` – Bridge Constructor Physics Engine):** Kontinuierliche Cholesky-Lösung bei LKW-Überfahrt, Stabbruch bei $|N_e| > N_{\max}$ (`IsBroken = true`), Re-Assemblierung und Einsturz-Detektion bei singulärer Matrix $\mathbf{K}_{ff}$.
- **Showcase- & Code-Defense-Fokus:** Live-Entfernen eines Stabs $\implies$ entsteht ein kinematischer Mechanismus ($\det \mathbf{K}_{ff} = 0$) und wird die Cholesky-Exception sauber abgefangen? Stimmt $\sum \vec{F}_{\text{ext}} + \sum \vec{F}_{\text{Lager}} = \mathbf{0}$?

---

### Einheit 08: Kontinuierliche Dynamische Systeme: ODEs, S-Functions & Anti-Windup
- **Artefakte:** [`Aufgabenblatt.md`](../Uebungen/Termin_08_DGL_und_SFunctions/Aufgabenblatt.md) | [`Vorlage/SFunctionSimulation.sln`](../Uebungen/Termin_08_DGL_und_SFunctions/Vorlage/SFunctionSimulation.sln) | **Foliensatz:** [Kapitel 08](../Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md)
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Expliziten Euler-Solver (`EulerExplicitSolver.Step`) implementieren und mit dem vorallokierten 4-stufigen `Rk4Solver` vergleichen.
  - `1.2`: Klasse `PidController` mit Stellgrößenbegrenzung $\operatorname{ clamp }(u, u_{\min}, u_{\max})$ extrahieren.
  - `1.3`: Bedingte Integration (*Anti-Windup Clamping*: $\dot{x}_I = 0$ bei Sättigung in Fehlerrichtung) in `DcServoControlBlock` umsetzen.
  - `1.4`: Energieerhaltung am ungedämpften Oszillator (RK4 $< 0{,}01\,\%$ Fehler über 100 Perioden vs. Euler-Aufschaukeln) und Überschwingreduktion via `dotnet test` prüfen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – DC-Servomotor-Regelung mit Thermomodell):** Elektro-mechanisch-thermisches 5-Zustands-Modell ($i_A, \omega, \theta, x_I, T_{\text{Wicklung}}$) unter $\pm 24\,\text{V}$-Sättigung, Lastmomentsprung und thermischem Derating; Vergleich Mit vs. Ohne Anti-Windup.
  - **Track B (`B.1`–`B.4` – SpaceX Falcon Hop / Booster Landing):** Vertikallandung einer Raketenstufe mit variabler Treibstoffmasse $\dot{m} = -\alpha_{\text{fuel}}F_{\text{thrust}}$, Schubbegrenzung $[0, F_{\max}]$ und Anti-Windup Clamping für sanften Touchdown ($|v_{\text{touchdown}}| < 1{,}0\,\text{m/s}$).
- **Showcase- & Code-Defense-Fokus:** Live-Deaktivierung von Anti-Windup unter Lastsprung; warum muss der Integrator sofort wieder freigegeben werden, sobald der Fehler $e$ sein Vorzeichen wechselt?

---

### Einheit 09: Diskrete Dynamische Systeme: Ereignissimulation (DES) & Monte-Carlo
- **Artefakte:** [`Aufgabenblatt.md`](../Uebungen/Termin_09_Diskrete_Systeme_DES/Aufgabenblatt.md) | [`Vorlage/DiscreteEventSimulation.sln`](../Uebungen/Termin_09_Diskrete_Systeme_DES/Vorlage/DiscreteEventSimulation.sln) | **Foliensatz:** [Kapitel 09](../Folien/09_Dynamische_Modelle_Diskret/Folien.md)
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Endliche Pufferkapazität $K$, Abweisungsrate $P_{\text{Block}}$ und effektiven Durchsatz $\lambda_{\text{eff}} = \lambda(1 - P_{\text{Block}})$ in der Future-Event-List-Simulation (`PriorityQueue`) ergänzen.
  - `1.2`: Zeitgewichtetes Flächenintegral `areaUnderL += numberInSystem * (ev.Timestamp - lastEventTime)` für $\bar{L}$ nachführen.
  - `1.3`: Log-Normal-Bedienzeiten via Box-Muller-Transformation und parallele Monte-Carlo-Replikationen (`Parallel.For`) einbinden.
  - `1.4`: Little's Gesetz ($\bar{L} = \lambda_{\text{eff}}\bar{W}$ auf $< 10^{-9}$) und $M/M/1$-Grenzfall ($\bar{L} = \frac{\rho}{1-\rho}$) via `dotnet test` verifizieren.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – Automobil-Lackierstraße $M/M/c/K$):** Mehrkanal-Abfertigung ($c$ Kabinen, Puffer $K$), Auslegungsstudie für $P_{\text{Block}} < 1\,\%$ und $\bar{W}_q < 6\,\text{min}$ inklusive Nachweis von Little's Gesetz.
  - **Track B (`B.1`–`B.4` – Theme Park Rush / Rollercoaster Queue):** Freizeitpark-Station mit Non-Preemptive Priority Queuing (VIP-Fastpass vs. Normal-Ticket), getrennter Wartezeitstatistik und Monte-Carlo-Sensitivitätsstudie über den VIP-Anteil.
- **Showcase- & Code-Defense-Fokus:** Warum liefert das ungewichtete Mittel über die Event-Zeitpunkte ein falsches $\bar{L}$? Was passiert im Live-Stresstest, wenn $\lambda \to c\mu$ ($\rho \to 1$) gesetzt wird?

---

### Einheit 10: Hybride Dynamik (`Zero-Crossing`), VIBN & Synthese
- **Artefakte:** [`Aufgabenblatt.md`](../Uebungen/Termin_10_Hybride_Dynamik_Synthese/Aufgabenblatt.md) | [`Vorlage/HybridZeroCrossing.sln`](../Uebungen/Termin_10_Hybride_Dynamik_Synthese/Vorlage/HybridZeroCrossing.sln) | **Foliensätze:** [Kapitel 10](../Folien/10_Dynamische_Modelle_Hybrid/Folien.md) & [Kapitel 11](../Folien/11_Epilog/Folien.md)
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Intervallhalbierung (`BisectionRootFinder.FindRoot`) bei Vorzeichenwechsel $g(\mathbf{x}_k)\cdot g(\mathbf{x}_{k+1}) \le 0$ zur Bestimmung von $\alpha^* \in [0, 1]$ implementieren.
  - `1.2`: Hybride Zeitschritt-Teilung ($\Delta t_1 = \alpha^*\Delta t \to \text{HandleZeroCrossing} \to \Delta t_2 = (1-\alpha^*)\Delta t$) und Sticking-Ruhemodus ($|v^+| < v_{\text{stick}}$) mit Aufweck-Impuls (`ApplyVerticalImpulse`) umsetzen.
  - `1.3`: Maximale Bodenpenetration und Energieverhältnis $E_{\text{tot}}(t)/E_0$ zwischen naivem Festschritt und Bisektion quantitativ vergleichen.
  - `1.4`: Bisektions-Präzision ($< 10^{-10}$), exakte Energieerhaltung bei $e = 1{,}0$ und Zeno-Schutz via `dotnet test` bestätigen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – VIBN Pneumatikzylinder mit SPS-Kopplung):** Doppeltwirkender Zylinder mit 2 Anschlag-Indikatorfunktionen ($g_{\text{back}} = x$, $g_{\text{front}} = L_{\text{stroke}} - x$), Endlagensensoren (`BG_Back`, `BG_Front`) und gekoppeltem SPS-Schrittketten-Automaten (`IDLE` $\to$ `EXTENDING` $\to$ `HOLD_FRONT` $\to$ `RETRACTING`).
  - **Track B (`B.1`–`B.4` – Arcade Pinball Wizard):** 2D-Kugeldynamik auf geneigtem Flippertisch ($\alpha_{\text{tilt}} = 6{,}5^\circ$) mit Wänden und mindestens 3 kreisförmigen aktiven Bumpern ($e_{\text{Bumper}} = 1{,}15$), vektorieller Normalenreflexion nach Bisektions-Trefferortung ohne Tunneling.
- **Showcase- & Code-Defense-Fokus:** Warum vernichtet das naive Hochsetzen `if (y < 0) y = 0` beim Festschritt potenzielle Energie $mg|y_{k+1}|$? Warum ist die Rest-Integration $\Delta t_2 = (1-\alpha^*)\Delta t$ nach dem Stoß unverzichtbar?
