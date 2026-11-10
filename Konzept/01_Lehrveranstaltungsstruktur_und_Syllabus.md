# Didaktisches Gesamtkonzept & Semester-Syllabus
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling

**Dokument-ID:** `Konzept/01_Lehrveranstaltungsstruktur_und_Syllabus.md`  
**Studiengang:** Bachelor Automatisierungstechnik (5. Fachsemester)  
**Institution:** Fachhochschule Oberösterreich, Campus Wels  
**Verantwortlicher:** Prof. Dr. Georg Hackenberg (*Professor für Informatik und Industriesysteme*)  
**Format & Umfang:** Integrierte Lehrveranstaltung (ILV), 2 SWS / 3 ECTS (75 h Workload: 25 h Präsenz, 50 h Selbststudium/Hausübung), 10 Präsenztermine à 150 Minuten  
**Begleitdokumente (Single Source of Truth):**
- [`Konzept/02_Uebungskatalog_und_Abschlussprojekt.md`](./02_Uebungskatalog_und_Abschlussprojekt.md) – Detailkatalog der 10 zweistufigen Hausübungen (`Stufe 1` + `Stufe 2: Track A | Track B`) & Software-Architektur
- [`Konzept/03_Benotung_Moodle_Tests_und_Vibe_Coding_Assessment.md`](./03_Benotung_Moodle_Tests_und_Vibe_Coding_Assessment.md) – 5-stufige Lernfortschrittskontrolle, 2-Säulen-Benotung (40–40–20), Rubriken & AI Honor Code

---

## 1. Zielgruppe, Übergeordnete Lernziele & Workload

### 1.1 Zielgruppenprofil (5. Semester Automatisierungstechnik, Campus Wels)
- **Starkes Fundament (anknüpfen, nicht als „neu“ erklären):** Höhere Mathematik (Lineare Algebra, DGLn), Technische Mechanik (Statik, Kinematik, Kinetik), Regelungstechnik (Zustandsraum, PID, Frequenzgang) und SPS-Programmierung (IEC 61131-3).
- **Typische Lücken (behutsam mit Konventions-Brücken & mentalen Modellen herleiten):** Hardwarenahe Speicherverwaltung (`unsafe`, Stride, Cache-Lines), moderne UI-/Grafik-Pipelines (WPF, MVVM, 2D-Canvas, 3D-OpenGL), Nebenläufigkeit (TPL, Race Conditions, False Sharing) und numerische Implementierungsdetails (Schrittweitenstabilität, Matrix-Partitionierung, Zero-Crossing-Bisektion).

### 1.2 Übergeordnete Lernziele (Intended Learning Outcomes – ILOs)
1. **Modellbildung & Systemarchitektur:** Für technische Problemstellungen passende mathematische Modelle (statisch/dynamisch, kontinuierlich/diskret/hybrid) ableiten und in sauber entkoppelten C#-Programmen (.NET 8/10) ohne Blackbox-Simulatoren umsetzen.
2. **Numerische Urteilskraft & Parametrierung:** Numerische Lösungsalgorithmen (Expliziter Euler, Heun/RK2, RK4, FDM-5-Punkt-Stern, Cholesky-LGS, Ereignis-Warteschlangen, Zero-Crossing-Bisektion) hinsichtlich Schrittweite, Stabilität, Konditionierung und Erhaltungssätzen gezielt parametrieren und validieren.
3. **Echtzeit-Visualisierung & Parallelisierung:** Performante, allokationsfreie 2D- und 3D-Visualisierungen sowie Multi-Core-Simulationen entwickeln (`WPF WriteableBitmap`, `WPF Canvas`/`DrawingVisual`, `ScottPlot 5`, `MSAGL`, `SharpGL`, `Math.NET Numerics`, `Parallel.For`).

### 1.3 ECTS-Workload-Kalkulation (3 ECTS = 75 Echtstunden)

| Kategorie | Aktivität | Aufwand | Anteil |
| :--- | :--- | :---: | :---: |
| **Präsenzlehre (ILV)** | 10 Termine à 150 Min. (Live-Showcase & Code-Defense, 4 Moodle-Quizzes, interaktive Folien-Vorlesung) | **25,0 h** | 33,3 % |
| **Wöchentliche Hausübungen** | 10 zweistufige Übungen im 2er-Team zu Hause (Stufe 1 Basisaufgabe ~1,0 h + Stufe 2 Track-Ausbau ~2,6 h) | **36,0 h** | 48,0 % |
| **Moodle-Assessments** | Vorbereitung mit den 3 Übungstests (`Test_01..03`) & Nachbereitung der 4 Moodle-Prüfungen | **8,0 h** | 10,7 % |
| **Vor- & Nachbereitung** | Studium der Vorlesungsfolien, Code-Snippets und Primärdokumentationen | **6,0 h** | 8,0 % |
| **Gesamtsumme** | **3 ECTS × 25 Echtstunden** | **75,0 h** | **100,0 %** |

---

## 2. Didaktische Leitphilosophie, Motivation & Anspruchsniveau

### 2.1 Constructive Alignment & Bloom-Lernziel-Kaskade
Jeder Termin verzahnt drei steigende Kompetenzstufen nach Bloom direkt mit den Lehr- und Prüfungsformaten:
1. **Verstehen & Analysieren** *(Modell, Geometrie, Stabilitätsgrenze)* $\longleftrightarrow$ **Interaktive Vorlesung (3-Schritt-Rhythmus) & Moodle-Quiz / Code-Defense-Leitfragen**.
2. **Anwenden** *(Grundalgorithmus & API am lauffähigen System)* $\longleftrightarrow$ **Hausübung Stufe 1 (Basisaufgabe `1.1`–`1.4` auf der C#-Vorlage + Unit-Tests)**.
3. **Erschaffen & Evaluieren** *(Reale Nichtlinearitäten, Grenzfälle, Systemintegration)* $\longleftrightarrow$ **Hausübung Stufe 2 (`Track A` oder `Track B`) + Live-Parameter-Stresstest am Beamer**.

### 2.2 Studierenden-Motivation: Abwechslungsreich, Interessant & Lehrreich
1. **Autonomie durch das Wahlmodell („Pick your Track: Industrie vs. Simulation Game“):**
   - In **Stufe 2** wählt jedes 2er-Team frei zwischen **Track A (Industrieller Digitaler Zwilling)** und **Track B (Interaktives Simulationsspiel / Arcade-Physik)**. Beide Tracks bauen auf Stufe 1 auf, nutzen exakt dieselbe Mathematik und zählen 10 Punkte.
   - Im **Cross-Track-Showcase** zu Beginn des Folgetermins präsentiert je ein Team aus Track A und Track B seine Lösung am Beamer – so erlebt das gesamte Plenum beide Perspektiven.
2. **Wöchentlicher Domänenwechsel statt Monotonie:**
   - Jeder der 10 Termine erschließt eine neue physikalisch-technische Erlebniswelt: Ballistik/Hydraulik (T01) $\to$ Chip-Thermik/Lava-Physik (T02) $\to$ Tragwerks-CAD/Poly-Bridge (T03) $\to$ 1-kHz-Prüfstand/Racing-Telemetrie (T04) $\to$ 3D-SCARA-Roboter/Claw-Crane (T05) $\to$ Toleranz-Monte-Carlo/100.000-Boids-Schwarm (T06) $\to$ Portalkran-FEM/Brückeneinsturz (T07) $\to$ DC-Servo/SpaceX-Raketenlandung (T08) $\to$ Lackierstraße/Freizeitpark-Logistik (T09) $\to$ Pneumatik-VIBN/Pinball-Physik (T10).
3. **Unmittelbares visuelles Feedback & „Kontrollierter Crash“:**
   - Algorithmen werden nie trocken auf Papier abgehandelt, sondern visuell zum Leben erweckt – inklusive des bewussten *„Was-passiert-wenn-nicht?“*-Effekts (sichtbare Gitterexplosion bei $s > 0{,}25$, Gimbal-Flip ohne Clamping, Raketen-Überschwingen ohne Anti-Windup).

### 2.3 Anspruchsniveau: „Low Floor, High Ceiling“ (Fordernd ohne Frustration)
- **Low Floor (Frustfreier Einstieg):** Bereitgestellte C#-Projektvorlagen (`Vorlage/*.sln`) nehmen reines UI-Boilerplate ab; Folien liefern explizite Konventions-Brücken; **Stufe 1 (`1.1`–`1.4`)** führt mit *Golden Reference Numbers* (5-Sekunden-Selbsttest) und vorbereiteten Unit-Tests (`dotnet test`) in ~60 Minuten sicher zum ersten Erfolgserlebnis.
- **High Ceiling (Echter Ingenieur-Anspruch):** Keine Blackbox-Solver oder gefakten UI-Animationen; **Stufe 2** fordert reale Nichtlinearitäten, Allokationsfreiheit (0 Byte GC-Druck in der Schleife), Thread-Sicherheit und numerische Validierung; **Moodle-Prüfungen** und **Live-Parameter-Stresstests** prüfen echten Transfer statt Auswendiglernen.

### 2.4 Ablaufstruktur eines 150-Minuten-Präsenztermins (Ohne Live-Coding im Hörsaal)
In der Präsenzveranstaltung findet **kein Live-Coding** und **kein In-Class-Programmiersprint** statt; die Programmierarbeit erfolgt als zweistufige Hausübung zu Hause:

| Phase | Zeitfenster | Dauer | Aktivitäten & Didaktische Funktion |
| :---: | :---: | :---: | :--- |
| **Moodle-Quiz** *(nur T03, T05, T08, T10)* | 00:00 – 00:15 | **15 Min.** | **Summativer Kurztest (Rückwärts-Kausalität):** 8 Fragen / 10 Pkt. (100 % Auto-Grading) ausschließlich über die abgeschlossenen Vor-Termine. |
| **Phase 1: Showcase & Defense** *(ab T02)* | 00:00 – 00:25 *(bzw. 00:15 – 00:35)* | **20–25 Min.** | **Live-Showcase & Code-Defense (Säule 2b, 20 %):** 1× Team Track A + 1× Team Track B zeigen die Hausübung der Vorwoche live am Beamer, beantworten Code-Fragen (*„Warum genau diese Zeile?“*) und bestehen den Live-Parameter-Stresstest. |
| **Phase 2: Interaktive Vorlesung** | 00:25 – 02:25 *(inkl. 15 Min. Pause)* | **100–115 Min. netto** | **Interaktive Folien-Vorlesung (40–48 Folien):** Einstieg über `### Rückblick & Brücke:`, danach **3-Schritt-Rhythmus** pro Sektion (*1. Anwendungsbeispiel* $\to$ *2. Blick unter die Haube mit Kontrast-SVG & Zahlenbeispiel* $\to$ *3. Besprechung des C#-Codes*). |
| **Phase 3: Hausübungs-Briefing** | 02:25 – 02:30 | **5 Min.** | **Ausblick (`### Hausübung Termin XX`):** Vorstellung von Stufe 1 (`1.1`–`1.4`) und Stufe 2 (`Track A` vs. `Track B`). |

---

## 3. Semester-Architektur, Kausalität & Kapitel-Abhängigkeitsmatrix

### 3.1 Semester-Übersichtsmatrix (`T01` bis `T10`)

| Termin | Thema & Fokus | Kapitel im Repo | Eingeführte Werkzeuge & Pakete | Track A: Industrie-Zwilling *(Stufe 2: A ODER B)* | Track B: Simulation Game *(Stufe 2: A ODER B)* | Assessments & Meilensteine |
| :---: | :--- | :---: | :--- | :--- | :--- | :--- |
| **T01** | **Einführung & Modellbegriff** | `00_Prolog`<br>`01_Einführung` | .NET 8/10 Console, MSTest, Git, Euler & Heun (RK2) | Hydraulikzylinder-Dämpfung (Not-Stopp mit Blendenreibung) | **Artillery Strike / Retro Tanks:** 2D-Ballistik mit Luftwiderstand & Wind | Setup-Check, Teambildung |
| **T02** | **2D-Pixelgrafik & FDM-Feld** | `02_Visualisierung_2D_Pixel` | WPF `Image`, `WriteableBitmap`, `unsafe` Pointer, Stride, LUT | CPU-/PCB-Kühlkörper-Hotspot (Mehrzonen-FDM & Robin-Rand) | **Falling Sand & Doom Fire:** Interaktive Lava-/Sand-Pixelwelt | **MS 1 Ausgabe** (T02/T03) |
| **T03** | **2D-Vektorgrafik & Transformation** *(Rein geometrisch)* | `03_Visualisierung_2D_Vektor` | WPF `Canvas`, `DrawingVisual`, Uniform Scaling, DIN 406 | **2D-CAD Tragwerks-Inspektor:** DIN-406-Bemaßung, Lastpfeil-Dragging & JSON *(keine Statik!)* | **Poly Bridge Blueprint-Baumeister:** $0{,}5\,\text{m}$-Grid, $L_{\max}$-Check, Budget & JSON *(Statik in T07!)* | **Moodle-Test 1** (Kap. 00–02) |
| **T04** | **Echtzeit-Telemetrie & Graphen** | `04_Visualisierung_2D_Diagramme` | **ScottPlot 5**, `CircularBuffer`, MVVM, Welford, **MSAGL** | Industrie-4.0-Leitstand: 1-kHz-Vibrationsmonitoring & $3\sigma$-Band | **Retro Arcade Racing Telemetry:** Live-G-Kräfte, RPM-Plot & MSAGL-Streckengraph | **MS 1 Abgabe** (T02/T03) |
| **T05** | **3D-OpenGL & Szenengraphen** | `05_Visualisierung_3D_OpenGL` | **SharpGL.WPF**, `OrbitCamera`, `SceneNode`, Phong-Licht | 4-Achs-SCARA-Roboterarm (Szenengraph, Teach-In & Pick-and-Place) | **3D Arcade Claw Crane:** Jahrmarkt-Greifautomat mit Kollisions-Snap | **Moodle-Test 2** (Kap. 03–04)<br>**MS 2 Ausgabe** |
| **T06** | **Multithreading & TPL** | `06_Multithreading` | **TPL**, `Parallel.For`, `Interlocked`, `IProgress<T>`, Amdahl | Parallele Monte-Carlo-Toleranzanalyse ($10^7$ Baugruppen & Amdahl-Fit) | **100.000 Boids / Zombie-Horde:** Hochparalleler Schwarm-Benchmark | Halbzeit-Check Portfolio |
| **T07** | **Statische Systeme & Cholesky** *(Erweckt T03 zum Leben)* | `07_Statische_Modelle` | **Math.NET Numerics**, FEM-Steifigkeitsmatrix $\mathbf{K}$, Cholesky, Newton | Portalkran-Verformung unter Wanderlast (Spannungs-Farbcode & Knickung) | **Bridge Constructor Physics Engine:** LKW-Überfahrt, Stabbruch & Einsturz | **MS 2 Abgabe** (T04/T05)<br>**MS 3 Ausgabe** |
| **T08** | **Kontinuierliche Dynamik & ODEs** | `08_Dynamische_Modelle_Kontinuierlich` | **S-Functions (`ISFunction`)**, **RK4**, PID Anti-Windup Clamping | DC-Servomotor-Regelung (5-Zustands-Thermomodell & Anti-Windup) | **SpaceX Falcon Hop / Booster Landing:** Raketen-Vertikallandung mit Schubbegrenzung | **Moodle-Test 3** (Kap. 05–07) |
| **T09** | **Diskrete Systeme & Stochastik** | `09_Dynamische_Modelle_Diskret` | `PriorityQueue`, Inversionsmethode, Box-Muller, **Little's Gesetz** | Automobil-Lackierstraße ($M/M/c/K$-Warteschlange & Pufferoptimierung) | **Theme Park Rush / Rollercoaster Queue:** Freizeitpark mit VIP-Fastpass-Prioritäten | **MS 3 Abgabe** (T06/T07)<br>**MS 4 Ausgabe** |
| **T10** | **Hybride Dynamik, VIBN & Synthese** | `10_Dynamische_Modelle_Hybrid`<br>`11_Epilog` | **Zero-Crossing Bisektion**, Sticking-Schwelle, FMI/FMU, VIBN | VIBN eines Pneumatikzylinders mit Endanschlägen & SPS-Schrittkette | **Arcade Pinball Wizard:** 2D-Flipper-Physik mit Bumper-Bisektion ohne Tunneling | **Moodle-Test 4** (Kap. 08–09)<br>**MS 4 & Portfolio-Abschluss** |

### 3.2 Kapitel-Abhängigkeits- & Fern-Schnittstellen-Matrix (Cross-Chapter Dependency Map)

Da die Lehrveranstaltung als vernetztes Baukastensystem konzipiert ist, greifen spätere Einheiten gezielt auf Modelle, Koordinatenkonventionen, Datenstrukturen und Visualisierungswerkzeuge früherer (auch nicht-angrenzender) Einheiten zurück. Bei Erstellung, Änderung oder Review eines Termins $T_k$ müssen neben den direkten Nachbarn ($T_{k-1}, T_{k+1}$) zwingend auch alle hier verknüpften **Fern-Schnittstellen** auf konsistente Symbolik, Einheiten und Datenformate geprüft werden:

| Termin | Nicht-angrenzende Rückwärts-Brücken ($\leftarrow$ worauf baut der Termin auf?) | Nicht-angrenzende Vorwärts-Brücken ($\to$ wo wird das Modell später wieder aufgegriffen?) | Zugeordnetes Quiz-Cluster (Strikte Rückwärts-Kausalität!) |
| :---: | :--- | :--- | :--- |
| **T01** | — | **$\to$ T08 (ODE-Solver):** Expliziter Euler ($x_{k+1} = x_k + \Delta t \cdot f$) und sein Energiedrift motivieren in T08 direkt Heun (RK2) & RK4.<br>**$\to$ T10 (Hybrid):** Ballistik/Wurfparabel kehrt als *Bouncing Ball* mit Bodenkontakt zurück. | **Quiz 01** (zu Beginn von T03: prüft Kap. 00–02; *Tabu:* Kap. 03+) |
| **T02** | — | **$\to$ T06 (Multithreading):** 1D-Speicherlayout (`y * stride + x * 4`) und 2D-Gitterschleifen sind das Referenzbeispiel für `Parallel.For` und 64-Byte-Cache-Lines (*False Sharing*).<br>**$\to$ T08 (Stabilität):** CFL-Stabilitätsgrenze ($s \le 0{,}25$) bereitet die Stabilitätsgebiete expliziter ODE-Solver vor. | **Quiz 01** (zu Beginn von T03: prüft Kap. 00–02; *Tabu:* Kap. 03+) |
| **T03** | — | **$\to$ T05 (3D-OpenGL):** Verallgemeinerung von 2D-Transformationen ($3\times 3$, linkshändiges Canvas mit $+Y$ unten) auf 3D ($4\times 4$, rechtshändiges OpenGL mit $+Y$ oben, $+Z$ zum Betrachter) und isotropem Seitenverhältnis `aspect`.<br>**$\to$ T07 (FEM-Statik):** Das in T03 rein geometrisch gezeichnete 2D-Fachwerk (Knoten, Stäbe, Lager, Lasten, JSON-Format) bekommt in T07 seinen Cholesky-Statiklöser ($\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$)! | **Quiz 02** (zu Beginn von T05: prüft Kap. 03–04; *Tabu:* Kap. 05+) |
| **T04** | — | **$\to$ T06, T08, T09, T10 (`ScottPlot 5`):** Standard-Plotter für Speedup-Kurven (T06), ODE-Zeit-/Phasenplots (T08), Warteschlangen $L(t)$ (T09) und Hybrid-Trajektorien (T10).<br>**$\to$ T09 (Stochastik):** Welford-Online-Varianz ($\mu, \sigma$) für Monte-Carlo-/DES-Konfidenz.<br>**$\to$ T05, T09 & T10 (`MSAGL`):** Baum-/Graphen-Layout als mentales Modell für Szenengraphen (T05), Warteschlangennetze (T09) und hybride Statecharts (T10). | **Quiz 02** (zu Beginn von T05: prüft Kap. 03–04; *Tabu:* Kap. 05+) |
| **T05** | **$\leftarrow$ T03 (2D-Canvas):** Kontrast linkshändiges 2D-Canvas vs. rechtshändiges 3D-OpenGL; `aspect`-Skalierung.<br>**$\leftarrow$ T04 (`MSAGL`):** Hierarchische Graphenstruktur als Vorläufer des 3D-Szenengraphen (`SceneNode`). | **$\to$ T07 (Nichtlineare LGS / Newton-Raphson):** Die in T05 aufgestellte *Vorwärtskinematik* $(\theta_1, \theta_2) \mapsto (x, z)$ mit Armlängen $L_1, L_2$ wird in T07 als *Inverse Kinematik* $(x, z) \mapsto (\theta_1, \theta_2)$ über die Jacobi-Matrix $\mathbf{J}$ numerisch invertiert!<br>**$\to$ T10 (VIBN):** 3D-Anlagenmodell als Frontend der Virtuellen Inbetriebnahme. | **Quiz 03** (zu Beginn von T08: prüft Kap. 05–07; *Tabu:* Kap. 08+) |
| **T06** | **$\leftarrow$ T02 (Pixel/FDM) & T04 (Telemetrie):** Speicherlayout im RAM (64-Byte-Cache-Lines) und `Stopwatch`-/ScottPlot-Benchmarking. | **$\to$ T07–T10:** Parallele Matrix-/Parameterstudien und Monte-Carlo-Simulationsläufe (`Parallel.For` in T09). | **Quiz 03** (zu Beginn von T08: prüft Kap. 05–07; *Tabu:* Kap. 08+) |
| **T07** | **$\leftarrow$ T03 (2D-Fachwerk-Geometrie & JSON)** für lineare FEM ($\mathbf{K}\mathbf{u}=\mathbf{f}$).<br>**$\leftarrow$ T05 (SCARA-Vorwärtskinematik $L_1, L_2, \theta_1, \theta_2$)** für nichtlineares Newton-Raphson-Verfahren. | **$\to$ T08 (Dynamik):** Übergang vom statischen Kräftegleichgewicht ($\sum \vec{F} = \mathbf{0}$) zur Bewegungsgleichung mit Massenträgheit ($m\ddot{\mathbf{x}} + d\dot{\mathbf{x}} + k\mathbf{x} = \mathbf{f}(t)$). | **Quiz 03** (zu Beginn von T08: prüft Kap. 05–07; *Tabu:* Kap. 08+) |
| **T08** | **$\leftarrow$ T01 (Expliziter Euler)** & **T02 (Stabilitätsgrenze)**.<br>**$\leftarrow$ T04 (`ScottPlot 5`)** für Zeit- und Phasenplots. | **$\to$ T10 (Hybride Systeme):** Kontinuierliche ODE-Integration ($\dot{\mathbf{x}} = \mathbf{f}$) bildet die stetige Flug-/Bewegungsphase zwischen diskreten Schaltereignissen (Zero-Crossing). | **Quiz 04** (zu Beginn von T10: prüft Kap. 08–09; *Tabu:* Kap. 10+) |
| **T09** | **$\leftarrow$ T04 (Welford-Statistik & `MSAGL`/`ScottPlot`)** sowie **T06 (`Parallel.For`)** für parallele Monte-Carlo-Replikationen. | **$\to$ T10 (Hybride Systeme):** Diskrete Zustandsübergänge / Events verschmelzen mit den kontinuierlichen ODEs aus T08. | **Quiz 04** (zu Beginn von T10: prüft Kap. 08–09; *Tabu:* Kap. 10+) |
| **T10** | **$\leftarrow$ T01/T08 (ODE-Solver)** + **T09 (Diskrete Events)** + **T04 (`MSAGL` Statecharts)** + **T05 (3D-Zwilling)**. | **Synthese des Gesamtkurses:** Führt alle 3 Kurs-Lernziele (Modellklassen, numerische Parametrierung/Bisektion, Echtzeit-Visualisierung) im Digitalen Zwilling zusammen. | *(Synthese-Termin)* |

---

## 4. Kompakte Vorlesungs-Steckbriefe (`T01` bis `T10`)

*(Detailbeschreibungen der Hausübungen Stufe 1 & Stufe 2, Bewertungsrubriken und Showcase-Leitfragen siehe [`Konzept/02_Uebungskatalog_und_Abschlussprojekt.md`](./02_Uebungskatalog_und_Abschlussprojekt.md))*

### T01: Einführung, Modellbegriff & Digitaler Zwilling
- **Foliensätze:** [00_Prolog](../Folien/00_Prolog/Folien.md) & [01_Einführung](../Folien/01_Einführung/Folien.md) | **Vorlage:** [`KinematikEuler.sln`](../Uebungen/Termin_01_Kinematik_und_Euler/Vorlage/KinematikEuler.sln)
- **Vorgreif-Sperre:** Reine C#-Konsolenapplikation + MSTest. *Tabu:* Kein WPF, kein ScottPlot, kein Multithreading, kein RK4.
- **Lernziele (Bloom):**
  1. *Verstehen:* Modell-Taxonomie (statisch/dynamisch, kontinuierlich/diskret, deterministisch/stochastisch) und Grieves-Zwillingskonzept (*Digital Model / Shadow / Twin*).
  2. *Anwenden:* Explizites Euler-Verfahren ($x_{k+1} = x_k + \Delta t \cdot v_k$) und Prädiktor-Korrektor nach Heun (RK2) mit linearer Auftreff-Interpolation in C# implementieren.
  3. *Evaluieren:* Numerischen Diskretisierungsfehler und künstlichen Energiedrift gegenüber der geschlossenen analytischen Lösung im Unit-Test quantifizieren.

### T02: 2D-Pixelgrafik & Feldsimulation (Finite Differenzen)
- **Foliensatz:** [02_Visualisierung_2D_Pixel](../Folien/02_Visualisierung_2D_Pixel/Folien.md) | **Vorlage:** [`PixelHeatFDM.sln`](../Uebungen/Termin_02_Pixelgrafik_und_FDM/Vorlage/PixelHeatFDM.sln)
- **Vorgreif-Sperre:** WPF `WriteableBitmap`, `unsafe`-Pointer, 2D-FDM. *Tabu:* Kein WPF Canvas, kein ScottPlot, kein `Parallel.For` (erst T06).
- **Lernziele (Bloom):**
  1. *Verstehen:* Speicherlinearisierung (`index = y * stride + x * 4`), `Bgra32`-Farbkanäle und den 5-Punkt-Laplace-Differenzenstern inkl. Von-Neumann-Stabilitätsgrenze ($s = \frac{\alpha \Delta t}{\Delta x^2} \le 0{,}25$).
  2. *Anwenden:* Allokationsfreies Direct-Pixel-Writing via `WriteableBitmap.Lock()`, `BackBuffer`, 256-Stufen-LUT und Double-Buffering (`_tCurrent` $\leftrightarrow$ `_tNext`) umsetzen.
  3. *Erschaffen & Evaluieren:* Ortsabhängige Mehrzonen-Wärmeleitung mit Dirichlet-, Neumann- und konvektiven Robin-Randbedingungen bzw. zellulärer Partikelphysik simulieren und die Schachbrett-Instabilität bei $s > 0{,}25$ nachweisen.

### T03: 2D-Vektorgrafik & Koordinatentransformation (Rein geometrisch & visuell)
- **Foliensatz:** [03_Visualisierung_2D_Vektor](../Folien/03_Visualisierung_2D_Vektor/Folien.md) | **Vorlage:** [`VectorTrussCanvas.sln`](../Uebungen/Termin_03_Vektorgrafik_Canvas/Vorlage/VectorTrussCanvas.sln)
- **Assessment zu Beginn:** **Moodle-Test 1** (15 Min., prüft Kap. 00–02).
- **Vorgreif-Sperre:** Rein geometrisch auf WPF `Canvas` / `DrawingVisual`. *Strikte Tabus:* **Keine Fachwerk-Statik, keine Steifigkeitsmatrix $\mathbf{K}$, kein Math.NET Cholesky (erst in T07!)** – alle Kräfte sind fest vorgegebene Vektoren.
- **Lernziele (Bloom):**
  1. *Verstehen:* Zusammenhang zwischen kartesischen Weltkoordinaten ($+Y$ oben, Meter) und linkshändigen Bildschirmkoordinaten ($+Y$ unten, Pixel) bei isotroper Skalierung $s = \min(s_x, s_y)$ und Bounding-Box-Zentrierung.
  2. *Anwenden:* Affine 2D-Transformation (`WorldToScreen` / `ScreenToWorld`), gedrehte Pfeilspitzen im Screen Space, DIN-406-Maßketten und interaktives Maus-Dragging ohne Bounding-Box-Jittering implementieren.
  3. *Erschaffen:* Einen interaktiven 2D-CAD-Tragwerks-Inspektor bzw. Poly-Bridge-Blueprint-Editor mit JSON-Persistenz als geometrisches Frontend für T07 entwickeln.

### T04: Echtzeit-Telemetrie, Ringpuffer & Signalflussgraphen
- **Foliensatz:** [04_Visualisierung_2D_Diagramme](../Folien/04_Visualisierung_2D_Diagramme/Folien.md) | **Vorlage:** [`ScottPlotTelemetry.sln`](../Uebungen/Termin_04_Telemetrie_und_ScottPlot/Vorlage/ScottPlotTelemetry.sln)
- **Vorgreif-Sperre:** `ScottPlot 5`, `CircularBuffer<T>`, Welford-Statistik, `MSAGL`, MVVM. *Tabu:* Kein SharpGL 3D, kein Multithreading, kein RK4.
- **Lernziele (Bloom):**
  1. *Verstehen:* Warum Heap-Allokationen im Render-Timer zu GC-Rucklern führen, wie ein Ringpuffer (`Head`/`Tail` modulo Kapazität) in $\mathcal{O}(1)$ arbeitet und warum der Welford-Algorithmus numerische Auslöschung vermeidet.
  2. *Anwenden:* Allokationsfreies 50-Hz-Streaming in `ScottPlot 5` (`Plot.Add.Signal`), `CircularBuffer.CopyTo` sowie gleitende Mittelwert-/$\pm 3\sigma$-Toleranzbänder implementieren.
  3. *Erschaffen:* Ein mehrkanaliges Industrie-4.0- bzw. Racing-Telemetrie-Dashboard inklusive gekoppeltem `MSAGL`-Topologiegraphen entwerfen.

### T05: 3D-Visualisierung, OpenGL-Pipeline & Kinematische Szenengraphen
- **Foliensatz:** [05_Visualisierung_3D_OpenGL](../Folien/05_Visualisierung_3D_OpenGL/Folien.md) (+ [Anhang Normalen](../Folien/05_Visualisierung_3D_OpenGL/Folien_Anhang_3D_Normalen.md)) | **Vorlage:** [`SceneGraph3D.sln`](../Uebungen/Termin_05_3D_OpenGL_Szenengraph/Vorlage/SceneGraph3D.sln)
- **Assessment zu Beginn:** **Moodle-Test 2** (15 Min., prüft Kap. 03–04).
- **Vorgreif-Sperre:** `SharpGL.WPF`, homogene $4\times 4$-Matrizen, `OrbitCamera`, `SceneNode`, Vorwärtskinematik. *Tabu:* Kein Multithreading, keine inversen Jacobi-LGS (erst T07).
- **Lernziele (Bloom):**
  1. *Verstehen:* Rechtshändiges 3D-OpenGL-System ($+Y$ oben, $+Z$ zum Betrachter), MVP-Pipeline, Nicht-Kommutativität ($\mathbf{T}\cdot\mathbf{R} \neq \mathbf{R}\cdot\mathbf{T}$), Kugelkoordinaten $(r, \theta, \phi)$ mit Gimbal-Lock-Clamping und Phong-Beleuchtung.
  2. *Anwenden:* Rekursive Szenengraph-Traversierung (`gl.PushMatrix` / `gl.PopMatrix`), lokale Kamera-Verschiebung (`OrbitCamera.Pan`) und 3D-Abstandsprüfung implementieren.
  3. *Erschaffen:* Einen 4-Achs-SCARA-Roboterzwilling mit Teach-In & Pick-and-Place bzw. einen 3D-Greifautomaten (Claw Crane) mit dynamischem Re-Parenting realisieren.

### T06: Multithreading, Task Parallel Library & Hardware-Effizienz
- **Foliensatz:** [06_Multithreading](../Folien/06_Multithreading/Folien.md) | **Vorlage:** [`MultithreadingBenchmark.sln`](../Uebungen/Termin_06_Multithreading_und_TPL/Vorlage/MultithreadingBenchmark.sln)
- **Vorgreif-Sperre:** TPL (`Parallel.For`, `Task.Run`), `Interlocked`, `lock`, `IProgress<T>`, `CancellationToken`, Amdahl. *Tabu:* Kein Math.NET Cholesky (erst T07).
- **Lernziele (Bloom):**
  1. *Analysieren:* UI-Thread-Blockaden, Race Conditions (*Lost Updates*), Lock Contention und *False Sharing* auf 64-Byte-CPU-Cache-Lines diagnostizieren.
  2. *Anwenden:* Asynchrone Worker-Auslagerung (`Task.Run`, `IProgress<T>`, kooperativer Abbruch) sowie deterministische Datenparallelität (`Parallel.For` mit Double-Buffering bzw. Thread-lokaler Reduktion) umsetzen.
  3. *Evaluieren:* Multi-Core-Speedup $S(p)$ mit JIT-Warmup vermessen und über das Amdahlsche Gesetz den seriellen Programmanteil $1 - f_{\text{par}}$ bestimmen.

### T07: Statische Systeme: FEM-Fachwerke, Cholesky & Newton-Raphson
- **Foliensatz:** [07_Statische_Modelle](../Folien/07_Statische_Modelle/Folien.md) | **Vorlage:** [`TrussFemSolver.sln`](../Uebungen/Termin_07_Statik_FEM_Cholesky/Vorlage/TrussFemSolver.sln)
- **Vorgreif-Sperre:** `MathNet.Numerics`, Steifigkeitsmatrix $\mathbf{K}$, Cholesky ($\mathbf{L}\mathbf{L}^\top$), Newton-Raphson ($\mathbf{J}$). *Tabu:* Noch keine dynamischen ODE-Solver höherer Ordnung (RK4 erst T08).
- **Lernziele (Bloom):**
  1. *Verstehen:* Herleitung der $4\times 4$-Elementsteifigkeitsmatrix $\mathbf{K}_e = \frac{EA}{L}[\dots]$, Assemblierung im globalen System, Blockpartitionierung ($\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$) und Bedingung für Symmetrie/positive Definitheit (statische Bestimmtheit vs. kinematischer Mechanismus).
  2. *Anwenden:* Lösung des reduzierten LGS via Cholesky-Zerlegung, Berechnung von Auflagerreaktionen $\mathbf{f}_p = \mathbf{K}_{pf}\mathbf{u}_f - \mathbf{f}_{p,\text{ext}}$, Stab-Normalkräften $N_e$ und Euler-Knicklasten implementieren.
  3. *Erschaffen:* Das geometrische Tragwerk aus T03 unter Wanderlast mit überhöhter elastischer Verformung bzw. Stabbruch-Kaskade zum Leben erwecken.

### T08: Kontinuierliche Dynamische Systeme: ODE-Solver, S-Functions & Anti-Windup
- **Foliensatz:** [08_Dynamische_Modelle_Kontinuierlich](../Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md) | **Vorlage:** [`SFunctionSimulation.sln`](../Uebungen/Termin_08_DGL_und_SFunctions/Vorlage/SFunctionSimulation.sln)
- **Assessment zu Beginn:** **Moodle-Test 3** (15 Min., prüft Kap. 05–07).
- **Vorgreif-Sperre:** `ISFunction`, Butcher-Tableaus (Euler, Heun, RK4), Steifigkeit, algebraische Schleifen, PID mit Anti-Windup. *Tabu:* Noch keine DES-Warteschlangen (T09) oder Zero-Crossing-Bisektion (T10).
- **Lernziele (Bloom):**
  1. *Verstehen:* Zustandsraumdarstellung $\dot{\mathbf{x}} = \mathbf{f}(t, \mathbf{x}, \mathbf{u})$, Konsistenz-/Konvergenzordnung $\mathcal{O}(\Delta t^4)$ von RK4, Stabilitätsgebiete bei steifen Systemen und Ursache von Integrator-Windup bei Aktor-Sättigung.
  2. *Anwenden:* Allokationsfreien `Rk4Solver`, modulare S-Function-Blöcke und bedingte Integration (*Anti-Windup Clamping*) implementieren.
  3. *Erschaffen & Evaluieren:* Einen geregelten DC-Servomotor unter Lastsprung bzw. eine landende Raketenstufe (Falcon Hop) simulieren und RK4 vs. Euler sowie Mit vs. Ohne Anti-Windup quantitativ vergleichen.

### T09: Diskrete Dynamische Systeme: Ereignissimulation (DES) & Monte-Carlo
- **Foliensatz:** [09_Dynamische_Modelle_Diskret](../Folien/09_Dynamische_Modelle_Diskret/Folien.md) | **Vorlage:** [`DiscreteEventSimulation.sln`](../Uebungen/Termin_09_Diskrete_Systeme_DES/Vorlage/DiscreteEventSimulation.sln)
- **Vorgreif-Sperre:** `PriorityQueue<TEvent, double>`, Next-Event-Time-Advance, Inversionsmethode, Box-Muller, Little's Gesetz. *Tabu:* Noch keine hybride Zero-Crossing-Bisektion (erst T10).
- **Lernziele (Bloom):**
  1. *Verstehen:* Ereignisgesteuerter Zeitsprung ($t \leftarrow t_{\text{next}}$) statt Festschritt-Polling, Kendall-Notation ($M/M/c/K$), zeitgewichtetes Flächenintegral $\frac{1}{T}\int_0^T N(t)\,\mathrm{d}t$ und Little's Gesetz ($\bar{L} = \lambda_{\text{eff}}\bar{W}$ mit $\lambda_{\text{eff}} = \lambda(1 - P_{\text{Block}})$).
  2. *Anwenden:* Zufallszahlenerzeugung via Inversionsmethode ($-\frac{1}{\lambda}\ln(1-U)$) und Box-Muller sowie parallele Monte-Carlo-Replikationen mit Welford-Konfidenzintervallen implementieren.
  3. *Erschaffen & Evaluieren:* Eine industrielle Lackierstraße ($M/M/c/K$) bzw. einen Freizeitpark mit VIP-Fastpass-Prioritäten zur Engpass- und Pufferdimensionierung simulieren.

### T10: Hybride Dynamische Systeme, Virtuelle Inbetriebnahme (VIBN) & Synthese
- **Foliensätze:** [10_Dynamische_Modelle_Hybrid](../Folien/10_Dynamische_Modelle_Hybrid/Folien.md) & [11_Epilog](../Folien/11_Epilog/Folien.md) | **Vorlage:** [`HybridZeroCrossing.sln`](../Uebungen/Termin_10_Hybride_Dynamik_Synthese/Vorlage/HybridZeroCrossing.sln)
- **Assessment zu Beginn:** **Moodle-Test 4** (15 Min., prüft Kap. 08–09).
- **Technologie-Status:** Vollständiger Kurs-Stack (Kap. 01–11).
- **Lernziele (Bloom):**
  1. *Verstehen:* Warum feste Zeitschritte bei Stößen/Schwellen zu Eindringfehlern (*Tunneling*) und künstlichem Energieverlust führen, wie die Vorzeichenwechsel-Bisektion auf $g(\mathbf{x}) = 0$ den exakten Schaltzeitpunkt $t^* = t_k + \alpha^*\Delta t$ lokalisiert und wie der *Sticking-Threshold* ($|v^+| < v_{\text{stick}}$) den Zeno-Kollaps verhindert.
  2. *Anwenden:* Hybride Zeitschritt-Teilung ($\Delta t_1 = \alpha^*\Delta t \to \text{Event} \to \Delta t_2 = (1-\alpha^*)\Delta t$) und Ruhe-Aufwecklogik (`IsSticking`) implementieren.
  3. *Synthetisieren:* Co-Simulation nach dem FMI/FMU-Standard, SPS-Kopplung für die Virtuelle Inbetriebnahme (VIBN) und die Goldene Architektur-Regel im abgeschlossenen 10-teiligen C#-Simulations-Portfolio zusammenführen.
