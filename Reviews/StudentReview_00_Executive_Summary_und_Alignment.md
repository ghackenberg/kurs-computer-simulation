# Studentischer Gesamt-Review (Full Review Cycle): Executive Summary & Constructive Alignment

**Perspektive:** Engagierter, kritisch-konstruktiver Studierender im 5. Semester Bachelor *Automatisierungstechnik (AT)* an der FH Oberösterreich (Campus Wels)  
**Lehrveranstaltung:** *Systemsimulation / Digitaler Zwilling* (2 SWS VO + 1 SWS UE, 10 Termine)  
**Geprüfter Stand:** Gesamtes Repository (`GEMINI.md`, `Konzept/`, `Moodle/Moodle_Kursstruktur_und_Termintexte.md`, `Export/`, `Folien/00_Prolog` bis `11_Epilog`, `Uebungen/Termin_01` bis `Termin_10` inkl. `Vorlage/` sowie `Quellen/WS25/`, exklusive `Moodle/Quiz_*`)

---

## 1. Gesamteindruck aus Sicht eines AT-Studierenden (Executive Summary)

Als AT-Studierender im 5. Semester (mit Vorwissen aus *Regelungstechnik*, *Technische Mechanik*, *Elektrotechnik*, *Mathematik 1–3* und *Softwareentwicklung C#*) gehört diese Lehrveranstaltung konzeptionell zu den **ambitioniertesten, modernsten und praxisrelevantesten Kursen im gesamten Curriculum**:

1. **Herausragende Stärken:**
   - **Keine „Black-Box-Klickerei“:** Statt in Simulink nur Blöcke zusammenzuklicken, ohne zu verstehen, warum ein Solver divergiert oder ein Zeno-Chattering die CPU lahmlegt, bauen wir hier die gesamte Kette (Mathematisches Modell $\to$ Numerischer Algorithmus $\to$ High-Performance C# Architektur $\to$ Echtzeit-Visualisierung) selbst auf.
   - **Geniales Zwei-Stufen- & Dual-Track-Übungsmodell:** Die Aufteilung in **Stufe A (In-Class Sprint auf Basis einer lauffähigen `Vorlage/*.sln`)** und **Stufe B (Wahlmodell: Track A Industrie vs. Track B Simulation Game)** motiviert enorm. Dass ein Team frei zwischen einem *hydraulischen/pneumatischen Industriemodell* und einem *Artillery-/Pinball-/Falcon-9-Game* wählen kann, ohne doppelt belastet zu werden, holt sowohl klassische Anlagenbauer als auch Software-Enthusiasten ab.
   - **Offener, realistischer Umgang mit KI („Vibe Coding“):** Statt KI-Tools realitätsfremd zu verbieten, lehrt der Kurs genau das, was wir im Ingenieurberuf brauchen: KI-Halluzinationen (z. B. veraltete ScottPlot-4-Syntax, `SetPixel`-Flaschenhälse, vergessenes Double-Buffering, unphysikalischer Komponenten-Luftwiderstand) mittels **Erhaltungssätzen, CFL-/Dahlquist-Grenzen und Profiler-Metriken** zu entlarven.
   - **Die „Goldene Regel der Simulationsarchitektur“:** Die konsequente Trennung von Modellzustand, numerischem Integrator und WPF-UI-Thread zieht sich als starker roter Faden durch Vorlesung und Labor.

2. **Die zentralen Schmerzpunkte für Studierende (Kurzüberblick):**
   - **Tote Links & Veraltete Altlasten im Repository:** In **8 von 10 Vorlesungsfoliensätzen** (`Kapitel 02` bis `Kapitel 09`) führt der Link zum Aufgabenblatt am Ende des Kapitels ins Leere (`404 File Not Found`), weil die Ordner in `Uebungen/` umbenannt wurden. Zudem liegen in `Folien/` noch 3 verwaiste Kapitelordner und 7 alte PDF-Dateien aus einer früheren 6-Kapitel-Struktur, während der Ordner `Export/` entgegen seiner eigenen `Export/README.md` komplett leer ist (keine einzige PDF enthalten).
   - **Widersprüchliche Prüfungs- und Terminpläne in den Konzeptdokumenten:** Während Folien, Moodle-Text und `Konzept/03` das reine **10-Übungen-Portfolio + 4 Quizzes (an T03, T05, T08, T10)** kommunizieren, enthält `Konzept/01_Lehrveranstaltungsstruktur_und_Syllabus.md` noch dutzende Verweise auf ein abgeschafftes *„Semesterprojekt mit Exposé (T06), Meilenstein M1 (T08), M2 (T09) und Video-Präsentation“* sowie abweichende Quiz-Termine (Q1 an T04, Q2 gleichzeitig an T05 und T07).
   - **Thematische und mathematische Lücken (Skill Gaps) zwischen Vorlesung und Übung:** An mehreren Terminen verlangt das Aufgabenblatt Konzepte, die auf den Vorlesungsfolien des jeweiligen Kapitels **entweder gar nicht oder erst viele Wochen später** erklärt werden (z. B. *Heun RK2* und *Bisektion* bereits in Übung 01, *Robin-Randbedingungen* in Übung 02, *Euler-Knicklast* und *Submatrix-Index-Partitionierung* in Übung 07, *$M/M/c/K$-Mehrkanalsysteme mit Prioritäten* in Übung 09).
   - **Konkrete Code-Bugs und API-Brüche in den Vorlesungsfolien:** Mehrere Codebeispiele auf den Folien kompilieren nicht oder enthalten subtile Bugs (z. B. `System.Windows.Rect.Top/Bottom`-Vorzeichenfalle in Kap. 03, veraltete `ScottPlot 4`-Histogramm-Syntax mitten in Kap. 04, massiver API-Bruch der `Block`-Klasse innerhalb von Kap. 08 zwischen Abschnitt 8.4 und 8.7).

---

## 2. Constructive Alignment Audit (ILOs $\leftrightarrow$ Konzept $\leftrightarrow$ Folien $\leftrightarrow$ Übungen)

### 2.1 Abgleich der übergeordneten Lernziele (`GEMINI.md` & Syllabus)

| Übergeordnetes Lernziel (`GEMINI.md`) | Abdeckung in `Folien/` (Kapitel 00–11) | Abdeckung in `Uebungen/` (Termin 01–10) | Bewertung des Constructive Alignment |
| :--- | :--- | :--- | :--- |
| **1. Mathematische Modellableitung** (statisch, dynamisch-kontinuierlich, diskret, hybrid) | Sehr stark in Kap. 01, 02, 07, 08, 09, 10 (Freischnitt, Knotenbilanz, Zustandsraum, Ereignisgraphen, Zero-Crossing). | Exzellent verankert in allen 10 Übungen mit klaren physikalischen Formeln und Einheiten. | **Sehr gut (9/10)** – Lediglich einzelne Übungsformeln (Robin-Rand in T02, Euler-Knickung in T07, $M/M/c/K$ in T09) fehlen auf den Vorlesungsfolien. |
| **2. Geeignete Parametrierung numerischer Algorithmen** (Schrittweite, Stabilität, Konditionierung) | Hervorragend: CFL/Von-Neumann ($s \le 0{,}25$) in Kap. 02, SPD/Cholesky in Kap. 07, Dahlquist & Butcher in Kap. 08, Zeno-Schutz $\epsilon_v$ in Kap. 10. | In jeder Übung wird ein aktiver Stresstest gefordert (Euler-Explosion in T01/T08, Gitterexplosion in T02, Singularitätstest in T07, Zeno-Test in T10). | **Exzellent (10/10)** – Das ist das didaktische Herzstück des Kurses und funktioniert hervorragend. |
| **3. Eigene 2D- & 3D-Visualisierungen jenseits einfacher Diagramme** (`WriteableBitmap`, `Canvas`, `ScottPlot`, `MSAGL`, `SharpGL`) | Eigener 4-wöchiger Visualisierungsblock (Kap. 02 bis 05) vor den komplexen Modellkapiteln. | Jede Visualisierungstechnik hat ein eigenes Starter-Kit (`PixelHeatFDM`, `VectorTrussCanvas`, `ScottPlotTelemetry`, `SceneGraph3D`). | **Gut bis Sehr gut (8.5/10)** – Sehr kluge Reihenfolge („Visualisierung zuerst“), aber MSAGL (T04) fehlt im Starter-Kit und wird auf den Folien nur oberflächlich angerissen. |
| **4. Etablierte Softwarearchitekturen & Multithreading** (S-Functions, `Math.NET`, `Parallel.For`, `async/await`) | Kap. 06 (TPL + `IProgress`), Kap. 07 (`Math.NET`), Kap. 08 (S-Functions), Kap. 10 (Hybride S-Function). | Alle Vorlagen (`Vorlage/`) zeigen vorbildliche Trennung von Modell, Solver und UI; MSTest-Projekte sichern die Invarianten ab. | **Gut (8/10)** – Abzug wegen der unterschiedlichen S-Function-Schnittstellen zwischen Vorlesung (`Block` in Kap. 08) und Übung (`ISFunction` in T08 / `IHybridSystem` in T10). |

---

### 2.2 Matrix der Synchronisations- und Konsistenzbrüche zwischen den Dokumenten

Beim Quervergleich von [01_Lehrveranstaltungsstruktur_und_Syllabus.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Konzept/01_Lehrveranstaltungsstruktur_und_Syllabus.md), [02_Uebungskatalog_und_Abschlussprojekt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Konzept/02_Uebungskatalog_und_Abschlussprojekt.md), [03_Benotung_Moodle_Tests_und_Vibe_Coding_Assessment.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Konzept/03_Benotung_Moodle_Tests_und_Vibe_Coding_Assessment.md), [Moodle_Kursstruktur_und_Termintexte.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Moodle/Moodle_Kursstruktur_und_Termintexte.md), den Vorlesungsfolien (`Folien/*/Folien.md`) und den tatsächlichen Aufgabenblättern (`Uebungen/Termin_*/Aufgabenblatt.md`) fallen massive Abweichungen auf:

#### A. Widersprüchliche Quiz-Termine und „Geister-Abschlussprojekt“ in `Konzept/01`
* **Das abgeschaffte Abschlussprojekt spukt noch durch `Konzept/01`:**
  - In [01_Lehrveranstaltungsstruktur_und_Syllabus.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Konzept/01_Lehrveranstaltungsstruktur_und_Syllabus.md#L750-L751) (Abschnitt 6.1, Zeile 750) steht ausdrücklich: *„Anstelle eines künstlich aufgesetzten Einzel-Abschlussprojekts bildet das kontinuierlich aufgebaute C#-Simulations-Portfolio aus den 10 Übungen den zentralen praktischen Leistungsnachweis.“*
  - Dennoch stehen im selben Dokument in den früheren Abschnitten noch überall die alten Projekt-Meilensteine: Zeile 42 (*„Semesterprojekt mit Video-Präsentation“*), Zeile 69 (*„Abschlussprojekt (eigenständiger Digitaler Zwilling)“*), Zeile 99 (*„Projekt-Meilensteine in Termin 06, 08 und 10“*), Zeile 198 & 421 (*„Offizieller Kickoff Semesterprojekt (2er-Teams): Abgabe Kurz-Exposé (1 Seite) bis Termin 07“*), Zeile 200 & 508 (*„Projekt-Meilenstein M1: Abgabe/Check des mathematischen Modells“*), Zeile 201 & 548 (*„Projekt-Meilenstein M2: Funktionsfähiger numerischer Kernel“*) und Zeile 202 (*„Großes Projekt-Kolloquium“*).
* **Drei verschiedene Zeitpläne für die 4 Moodle-Quizzes innerhalb desselben Konzepts:**
  - **Aktueller Standard** (in `00_Prolog/Folien.md` Zeile 208, `11_Epilog/Folien.md` Zeile 966, `Moodle_Kursstruktur_und_Termintexte.md` Zeile 40, `Konzept/03` Zeile 99 sowie `Konzept/01` Abschnitt 6.1 Zeile 756): **Q1 in T03, Q2 in T05, Q3 in T08, Q4 in T10**.
  - **Widerspruch in `Konzept/01` (Master-Tabelle Zeilen 196–202):** Hier steht `Moodle-Test 1` in **T04**, `Moodle-Test 2` in **T05**, `Moodle-Test 3` in **T08**, `Moodle-Test 4` in **T10**.
  - **Widerspruch in `Konzept/01` (Detailtext Zeilen 351 & 461):** In Zeile 351 ist `Moodle-Test 1` in **T04** eingetragen, in Zeile 461 ist `Moodle-Test 2` plötzlich in **T07** (!) eingetragen (*„Moodle-Test 2 (15 Min.): Fokus auf 3D-Transformationen, Szenengraphen, TPL-Parallelisierung“*).

#### B. Thematische Abweichungen der Übungsthemen (Track A / Track B) zwischen Konzept, Folien und Aufgabenblättern
Während `Folien/*/Folien.md`, `Moodle_Kursstruktur_und_Termintexte.md` und `Uebungen/Termin_*/Aufgabenblatt.md` inhaltlich gut aufeinander abgestimmt sind, beschreiben `Konzept/01` und `Konzept/02` an mehreren Terminen **völlig andere Übungsaufgaben**:

| Termin | Tatsächliches `Aufgabenblatt.md` (& `Folien.md` / `Moodle`) | Abweichung in `Konzept/01_Syllabus.md` | Abweichung in `Konzept/02_Uebungskatalog.md` |
| :--- | :--- | :--- | :--- |
| **T01** | **Sprint:** Schiefer Wurf Vakuum<br>**Track A:** Hydraulikzylinder-Endlagendämpfung<br>**Track B:** Retro Artillery Duel (Newton-Drag & Wind) | **Track A (Z. 244):** Thermisches Aufheizverhalten Pt100-Temperatursensor ODER Zylinderdämpfung | **Track A (Z. 166):** Trajektorien-Rechner für Industrie-Löschmonitor / Schüttgut-Injektor (Wurfbahn mit Luftwiderstand) |
| **T03** | **Sprint:** 2D-Fachwerk im Canvas (Transform2D, Pfeile, DIN 406)<br>**Track A:** 2D-CAD Fachwerkträger-Editor<br>**Track B:** Space Radar ODER Bridge Blueprint Sketcher | **Track B (Z. 333):** 2D-Tower-Defense / Vektor-Radar (ohne Bridge Sketcher) | **Track B (Z. 377):** *„2D Vector Lander & Orbital Radar“* (Mondlandefähre über Bezier-/Polygon-Kraterlandschaft) |
| **T04** | **Sprint:** 1-Kanal 50-Hz Telemetrie + Welford + Ringpuffer<br>**Track A:** Antriebsprüfstand (3 Plots + MSAGL)<br>**Track B:** Retro Arcade Racing HUD (Kamm'scher Kreis + MSAGL) | **Track A (Z. 375):** Virtuelles 4-Kanal-Leitstand-Oszilloskop | **Track B (Z. 488):** *„Sim-Racing & Flight-Sim Live-Telemetry Dashboard“* |
| **T06** | **Sprint:** Reaktives WPF-Partikelfeld (`Task.Run`, `IProgress`, `CancellationToken`)<br>**Track A:** Parallele Monte-Carlo-Toleranzanalyse ($10^7$ Passungen)<br>**Track B:** 2D-Schwarm- & Zombie-Horden-Simulation | **Sprint (Z. 446):** Monte-Carlo-$\pi$ mit `Parallel.For` | **Sprint (Z. 673):** $4096 \times 4096$ Matrix-Laplace Row-Major vs. Column-Major<br>**Track A (Z. 683):** *„Paralleler Schüttgut- & Partikelsturm-Benchmark“* (inkl. False Sharing) |
| **T07** | **Sprint:** 3-Knoten-Dreiecksträger + 5-Knoten-Auslegerkran<br>**Track A:** Portalkran unter Wanderlast + Euler-Knickung<br>**Track B:** Bridge Constructor mit LKW & Stabbruch | **Sprint (Z. 489):** Elektrisches Gleichstrom-Widerstandsnetzwerk (Knotenpotentialverfahren) | Konsistent mit `Aufgabenblatt.md` |
| **T08** | **Sprint:** DC-Servomotor Euler vs. RK4, `PidController`, Anti-Windup-Overlay<br>**Track A:** Elektro-thermisches 5-Zustands-Servomotormodell ($T_{\text{Cu}}$) & Solver-Vergleich<br>**Track B:** SpaceX Falcon Hop & Booster Landing | **Sprint (Z. 532):** Einmassenschwinger Euler vs. RK4 | **Sprint (Z. 831):** Gedämpftes Feder-Masse-Schwingsystem (Energie-Explosion)<br>**Track A (Z. 841):** *„Zweirad-Selbstbalancierer (Segway / Inverses Pendel auf Wagen)“* |
| **T09** | **Sprint:** $M/M/1/K$, Log-Normal ($M/G/1$) & Monte-Carlo in `QueueSystem`<br>**Track A:** Automobil-Lackierstraße ($M/M/3/25$ mit Priorität)<br>**Track B:** Theme Park Rush Achterbahn ($M/M/3/25$ mit VIP-FastPass) | Konsistent mit `Aufgabenblatt.md` | **Track B (Z. 935):** *„Tower-Defense Wave-Spawner & Dungeon-Loot-Simulator“* |

---

## 3. Repository-Hygiene, Struktur-Audit & Tote Links

Aus Sicht eines Studierenden, der das Git-Repository klont, um damit im Semester zu arbeiten, fallen sofort mehrere gravierende strukturelle Mängel auf:

### 3.1 Acht kaputte Übungs-Links (`404`) am Ende der Vorlesungsfolien (`Kapitel 02` bis `09`)
Auf der jeweils letzten Folie der Kapitel `02` bis `09` verweist der Hyperlink `[Aufgabenblatt Termin XX](../../Uebungen/...)` auf alte, nicht existierende Ordnernamen:

| Foliendatei & Zeile | Verlinkter Pfad (aktuell **BROKEN / 404**) | Tatsächlicher Pfad im Repository (Korrektur) |
| :--- | :--- | :--- |
| [02_Visualisierung_2D_Pixel/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/02_Visualisierung_2D_Pixel/Folien.md#L746) (Z. 746) | `../../Uebungen/Termin_02_Pixel_2D_Waermeleitung/Aufgabenblatt.md` | `../../Uebungen/Termin_02_Pixelgrafik_und_FDM/Aufgabenblatt.md` |
| [03_Visualisierung_2D_Vektor/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/03_Visualisierung_2D_Vektor/Folien.md#L757) (Z. 757) | `../../Uebungen/Termin_03_Vektor_2D_Fachwerk/Aufgabenblatt.md` | `../../Uebungen/Termin_03_Vektorgrafik_Canvas/Aufgabenblatt.md` |
| [04_Visualisierung_2D_Diagramme/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/04_Visualisierung_2D_Diagramme/Folien.md#L776) (Z. 776) | `../../Uebungen/Termin_04_Diagramme_2D_Telemetrie/Aufgabenblatt.md` | `../../Uebungen/Termin_04_Telemetrie_und_ScottPlot/Aufgabenblatt.md` |
| [05_Visualisierung_3D_OpenGL/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/05_Visualisierung_3D_OpenGL/Folien.md#L1571) (Z. 1571) | `../../Uebungen/Termin_05_OpenGL_3D_Roboter/Aufgabenblatt.md` | `../../Uebungen/Termin_05_3D_OpenGL_Szenengraph/Aufgabenblatt.md` |
| [06_Multithreading/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/06_Multithreading/Folien.md#L669) (Z. 669) | `../../Uebungen/Termin_06_Multithreading_Speedup/Aufgabenblatt.md` | `../../Uebungen/Termin_06_Multithreading_und_TPL/Aufgabenblatt.md` |
| [07_Statische_Modelle/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/07_Statische_Modelle/Folien.md#L1180) (Z. 1180) | `../../Uebungen/Termin_07_Statik_FEM_Fachwerk/Aufgabenblatt.md` | `../../Uebungen/Termin_07_Statik_FEM_Cholesky/Aufgabenblatt.md` |
| [08_Dynamische_Modelle_Kontinuierlich/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md#L1842) (Z. 1842) | `../../Uebungen/Termin_08_Dynamik_Kontinuierlich_Antrieb/Aufgabenblatt.md` | `../../Uebungen/Termin_08_DGL_und_SFunctions/Aufgabenblatt.md` |
| [09_Dynamische_Modelle_Diskret/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/09_Dynamische_Modelle_Diskret/Folien.md#L1453) (Z. 1453) | `../../Uebungen/Termin_09_Dynamik_Diskret_Fertigung/Aufgabenblatt.md` | `../../Uebungen/Termin_09_Diskrete_Systeme_DES/Aufgabenblatt.md` |

*(Nur `Kapitel 01` und `Kapitel 10` verlinken auf die korrekten Ordnernamen!)*

### 3.2 Verwaiste Alt-Ordner und Alt-PDFs im Ordner `Folien/`
Im Verzeichnis `Folien/` liegen neben den 12 aktuellen Kapiteln (`00_Prolog` bis `11_Epilog`) noch **drei verwaiste Kapitelordner** sowie **sieben veraltete PDF-Dateien** aus einer früheren Kursstruktur (als Statik noch Kapitel 02/03 und Dynamik Kapitel 04–06 war):
- **Verwaiste Ordner (enthalten nur alte `Diagramme/`):**
  - `Folien/03_Statische_Modelle_3D/`
  - `Folien/05_Dynamische_Modelle_Diskret/`
  - `Folien/06_Dynamische_Modelle_Hybrid/`
- **Veraltete PDFs direkt in `Folien/`:**
  - `Folien/00_Prolog.pdf`, `Folien/01_Einführung.pdf`, `Folien/02_Statische_Modelle_2D.pdf`, `Folien/03_Statische_Modelle_3D.pdf`, `Folien/04_Dynamische_Modelle_Kontinuierlich.pdf`, `Folien/05_Dynamische_Modelle_Diskret.pdf`, `Folien/06_Dynamische_Modelle_Hybrid.pdf`.
- **Risiko für Studierende:** Wer als Studierender im Ordner `Folien/` zuerst die PDFs öffnet, lernt eine völlig veraltete Kapitelnummerierung ohne die Kapitel 02–06 (Visualisierung & Multithreading)!

### 3.3 Leerer `Export/`-Ordner trotz detaillierter `Export/README.md`
In [Export/README.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Export/README.md#L1-L68) werden 13 Vorlesungs-PDFs (`Export/Folien/00_Prolog_Folien.pdf` bis `11_Epilog_Folien.pdf`) und 10 Übungs-PDFs (`Export/Uebungen/Termin_01_..._Aufgabenblatt.pdf` bis `Termin_10`) aufgelistet und verlinkt; außerdem wird behauptet, dass in jedem Kapitelordner `Folien.pdf` und in jedem Übungsordner `Aufgabenblatt.pdf` liege.  
**Tatsächlicher Zustand:** Im Ordner `Export/` befindet sich **ausschließlich `README.md`** – weder die Unterordner `Export/Folien/` und `Export/Uebungen/` noch irgendeine der 23 verlinkten PDF-Dateien existieren!

### 3.4 Hardcodierte lokale Benutzerpfade (`C:/Users/P28500/...`) in `Konzept/`
In [01_Lehrveranstaltungsstruktur_und_Syllabus.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Konzept/01_Lehrveranstaltungsstruktur_und_Syllabus.md) (ab Zeile 182) und [02_Uebungskatalog_und_Abschlussprojekt.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Konzept/02_Uebungskatalog_und_Abschlussprojekt.md) (ab Zeile 9) zeigen sämtliche Markdown-Links auf einen absoluten lokalen Pfad `file:///c:/Users/P28500/Desktop/Repositories/kurs-computer-simulation/...`. Auf jedem anderen Rechner (oder im Browser auf GitHub/GitLab) funktionieren diese Links nicht; hier sollten relative Repository-Pfade (`../Folien/...`, `../Uebungen/...`) verwendet werden.

### 3.5 Kompilierte `bin/`- und `obj/`-Artefakte in `Uebungen/Termin_*/Vorlage/`
In fast allen `Vorlage/`-Ordnern der Übungen (`Termin_01` bis `Termin_10`) liegen tausende kompilierte Binärdateien (`bin/Debug/net8.0-windows/...`, `obj/...`, inkl. lokalisierter `.resources.dll` in 14 Sprachen). Das bläht das Repository unnötig auf und führt bei Studierenden zu Git-Merge-Konflikten.

---

## 4. Priorisierter Maßnahmenplan (Action Plan zur Perfektionierung)

### Priorität 1: Kritische Korrekturen (Quick Wins & Blocker – vor Semesterstart beheben)
1. **Acht tote Links in `Folien/02` bis `Folien/09` reparieren:** Die Links auf der jeweils letzten Folie auf die tatsächlichen Ordnernamen in `Uebungen/` (`Termin_02_Pixelgrafik_und_FDM` usw.) aktualisieren.
2. **Code-Bugs auf den Vorlesungsfolien korrigieren:**
   - **Kapitel 03 (Z. 256–260):** `System.Windows.Rect.Top/Bottom`-Bug in `CoordinateTransformer` beheben (`w.Bottom` ist in WPF $Y_{\max}$, `w.Top` ist $Y_{\min}$!) sowie Variablennamen `_lastPos` vs. `_lastMousePos` (Z. 458/488) vereinheitlichen.
   - **Kapitel 04 (Z. 285–290):** Veralteten ScottPlot-4-Histogramm-Code durch die gültige ScottPlot-5-API (`ScottPlot.Statistics.Histogram.WithBinCount(...)` und `Plot.Add.Bars(...)` wie in Kap. 09 Z. 682) ersetzen.
   - **Kapitel 08 (Abschnitt 8.4 vs. 8.7):** Den harten API-Bruch der Klasse `Block` (`CalculateDerivatives` mit 4 Parametern in Z. 718 vs. 1 Parameter in Z. 1662) auflösen und eine Brückenfolie zum schlanken `ISFunction`-Interface der Übungsvorlage T08 ergänzen.
   - **Kapitel 02 (Z. 629–703) & Vorlage T02 (`HeatGrid.cs`):** Array-Layout `float[Height, Width]` (`grid[y, x]`) vs. `float[Width, Height]` (`grid[x, y]`) klarstellen, damit die innere `x`-Schleife wirklich contiguously (Row-Major) durch den Cache läuft, und in Aufgabe A3 von Termin 02 die Isolator-Wand-Bedingung ($\alpha = 0$) als echte Neumann-Reflexion statt als $20\,^\circ\text{C}$-Dirichlet-Wärmesenke formulieren.
3. **Verwaiste Ordner und Alt-PDFs bereinigen:** `Folien/03_Statische_Modelle_3D`, `05_Dynamische_Modelle_Diskret`, `06_Dynamische_Modelle_Hybrid` sowie die 7 alten PDFs im Wurzelverzeichnis `Folien/*.pdf` löschen und die PDFs via Export-Skript sauber nach `Export/` generieren.

### Priorität 2: Wichtige didaktische Harmonisierungen (Vorlesung $\leftrightarrow$ Übung)
1. **Termin 01 (`Aufgabenblatt.md` vs. `Vorlage/KinematikEuler.sln`):** Im Aufgabenblatt 01 explizit auf `Vorlage/KinematikEuler.sln` (`KinematicState` statt `ProjectileState`) verweisen und für den 60-Minuten-Sprint eine echte kleine Programmieraufgabe offenlassen (aktuell ist der gesamte Sprint in `Vorlage/KinematikEuler` bereits fertig ausprogrammiert!). Zudem die **Heun-Methode (RK2)** auf 1–2 Folien am Ende von Kapitel 01 kurz einführen, da sie in Hausübung 01 gefordert wird.
2. **Fehlende Kurz-Herleitungen auf den Folien ergänzen:**
   - **Kapitel 02:** 1 Folie zur diskreten **Robin-Randbedingung** (konvektive Kühlung für Track A in T02).
   - **Kapitel 06:** 1 Folie zu `Interlocked.Add` / `ThreadLocal<Random>` / `Random.Shared` (für Track A in T06).
   - **Kapitel 07:** 1 Folie mit dem konkreten C#-Snippet zur **Index-Partitionierung (`freeDofs`, `prescribedDofs`)** in `Math.NET` sowie der Formel für die **Euler-Knicklast** $N_{\text{knick}} = \frac{\pi^2 E I}{L^2}$.
   - **Kapitel 09:** 1 Folie zur Erweiterung von $M/M/1$ auf **$M/M/c/K$ mit Blockierung** ($\lambda_{\text{eff}} = \lambda(1 - P_{\text{Block}})$) und Prioritäts-Kunden.

### Priorität 3: Dokumentations-Feinschliff (`Konzept/` & `.gitignore`)
1. **`Konzept/01` und `Konzept/02` mit dem aktuellen Stand synchronisieren:** Alle Restverweise auf das abgeschaffte Semesterprojekt in `Konzept/01` entfernen, Quiz-Termine einheitlich auf **T03, T05, T08, T10** ziehen und die Track-Beschreibungen in `Konzept/01` und `Konzept/02` an die finalen Aufgabenblätter anpassen.
2. **Lokale Pfade & Build-Artefakte:** `file:///c:/Users/P28500/...` durch relative Links ersetzen und `bin/` sowie `obj/` aus `Uebungen/` bereinigen.

---

## 5. Verweis auf die Detail-Reviews

Die vollständigen, zeilengenauen Einzelanalysen befinden sich in den beiden nachfolgenden Review-Dokumenten:
- **[StudentReview_01_Vorlesungsfolien_Kapitel_00_bis_11.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Reviews/StudentReview_01_Vorlesungsfolien_Kapitel_00_bis_11.md):** Detaillierter Review aller 12 Vorlesungskapitel (`00_Prolog` bis `11_Epilog` + `Anhang 3D-Normalen`) hinsichtlich Didaktik, rotem Faden, Mathematik, C#-Code-Korrektheit und Layout.
- **[StudentReview_02_Uebungsaufgaben_Termin_01_bis_10.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Reviews/StudentReview_02_Uebungsaufgaben_Termin_01_bis_10.md):** Detaillierter Review aller 10 Übungseinheiten (`Termin_01` bis `Termin_10`) inklusive Abgleich zwischen `Aufgabenblatt.md`, `Vorlage/*.sln` und den MSTest-Suites.
