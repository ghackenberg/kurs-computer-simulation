![Social Preview](./Kapitel/00_Prolog/Folien/Illustrationen/Social_Preview.png)

# Systemsimulation / Digitaler Zwilling mit C#

Dies ist das Repository für die Lehrveranstaltung **Systemsimulation / Digitaler Zwilling** (Bachelor *Automatisierungstechnik*, 5. Semester, 3 ECTS = 75 h, 10 Termine à 150 Min.) an der **Fachhochschule Oberösterreich** (Campus Wels), geleitet von **Prof. Dr. Georg Hackenberg**.

Der Kurs vermittelt die mathematische Modellierung, numerische Simulation und Echtzeit-Visualisierung technischer Systeme in **C# / .NET / WPF**:
1. **Block 1 – Echtzeit-Visualisierung (Kapitel 01–05):** Hardwarenahe 2D-Rastergrafik (`WriteableBitmap`), 2D-Vektorgrafik (`WPF Canvas` & `DrawingVisual`), Echtzeit-Telemetrie (`ScottPlot 5`) & topologische Graphen (`MSAGL`) sowie 3D-Echtzeitrendering mit `SharpGL` (Szenengraphen & Kugelkoordinaten-Orbitkamera).
2. **Scharnier – Parallelisierung (Kapitel 06):** Multi-Core-Parallelisierung mit der Task Parallel Library (`Parallel.For`), Thread-Entkopplung und allokationsfreie Speicherstrategien.
3. **Block 2 – Physikalische Simulationsmodelle & Synthese (Kapitel 07–11):** Statische Systeme (2D/3D-Fachwerke via `Math.NET Numerics` & Cholesky-Zerlegung), kontinuierliche dynamische Systeme (ODE-Solver, S-Functions, Anti-Windup), ereignisdiskrete Systeme (DES, Monte-Carlo, Welford-Akkumulator) sowie hybride Systeme (Nullstellensuche via Bisektion, Zeno-Schutz, FMI/FMU & Virtuelle Inbetriebnahme).

---

## Repository-Struktur

- **[`./Konzept/`](./Konzept/)** – Die 3 vorlesungsübergreifenden Rahmenkonzept-Dokumente:
  1. [`01_Didaktik_und_Lernziele.md`](./Konzept/01_Didaktik_und_Lernziele.md) – Zielgruppenprofil, Lernziele (Bloom-Kaskade), Motivation (*Pick your Track*), *Low Floor, High Ceiling* und 150-Min.-Taktung.
  2. [`02_Semestermatrix_und_Abhaengigkeiten.md`](./Konzept/02_Semestermatrix_und_Abhaengigkeiten.md) – Semester-Übersichtsmatrix, Kapitel-Abhängigkeitsmatrix, 2-Stufen-Hausübungsmodell & Goldene Architektur-Regel.
  3. [`03_Beurteilung_und_Pruefungen.md`](./Konzept/03_Beurteilung_und_Pruefungen.md) – 5-stufige Lernfortschrittskontrolle, Benotungsmodell (40 % Quiz / 40 % Hausübungen / 20 % Showcase) und AI Honor Code.
- **[`./Kapitel/`](./Kapitel/)** – Die 12 kapitelzentrierten Modulordner (`00_Prolog` bis `11_Epilog`), in denen jeweils alle Artefakte eines Kapitels gebündelt sind:
  - `README.md` & `Konzept.md` – Kompakte Übersicht und autarker didaktischer Kapitel-Steckbrief.
  - `Folien/` – MARP-Vorlesungsfolien (`Folien.md`), `Diagramme/*.svg`, `Illustrationen/`, `Screenshots/` und `Tafelbilder/`.
  - `Uebung/` *(Kap. 01–10)* – Zweistufiges `Aufgabenblatt.md` und kompilierbare C#-Projektvorlage (`./Vorlage/` inkl. Unit-Tests).
  - `Moodle/` *(Kap. 00–10)* – Formelfreier Moodle-Abschnittstext (`Text.md`) und `Banner.jpg`.
  - `Quiz/` *(Kap. 03, 05, 08, 10)* – Die 10 modularen Test-Markdown-Dateien (`Test_01_Vorbereitung.md` bis `Test_10_Pruefung.md`).
- **[`./Export/`](./Export/)** – Druckreife PDFs der Vorlesungsfolien (`./Export/Folien/`) und Übungsblätter (`./Export/Uebungen/`) sowie die importfertigen Moodle-Master-XML-Quizzes (`./Export/Moodle/`).
- **[`./Skripte/`](./Skripte/)** – Node.js-Skripte für Build Management (`export_to_pdf.js`, `moodle_xml_builder.js`) und Quality Control (`lint_slides_dom.js`, `lint_section_slides.js`, `lint_variable_consistency.js`, `audit_svg_and_charts.js`).
- **[`./Quellen/`](./Quellen/) & [`./Werkzeuge/`](./Werkzeuge/)** – Reiner C#-Referenzcode (`Quellen.sln`, dessen Architektur- und Modellklassen auf den Vorlesungsfolien erklärt werden) sowie der HiDPI-Plotgenerator (`Werkzeuge/GrafikGenerator/`).

---

## Kapitel & Termine im Überblick

| Kapitel | Kapitel-Ordner & Vorlesungsfolien | Übungsmodul (`Uebung/`) |
| :--- | :--- | :--- |
| <img src="./Kapitel/00_Prolog/Folien/Titelbild.png" width="200"> | **[Kapitel 00: Prolog](./Kapitel/00_Prolog/)**<br>Organisatorisches, Lernziele, *Pick your Track* und Überblick über die Semesterstruktur ([`Folien.md`](./Kapitel/00_Prolog/Folien/Folien.md)). | – *(Teil von Termin 01)* |
| <img src="./Kapitel/01_Kinematik_und_Euler/Folien/Titelbild.jpg" width="200"> | **[Kapitel 01: Kinematik & Euler](./Kapitel/01_Kinematik_und_Euler/)**<br>Modelltaxonomie, analytische vs. numerische Lösung, Euler-/Heun-Integration und Digitaler Zwilling ([`Folien.md`](./Kapitel/01_Kinematik_und_Euler/Folien/Folien.md)). | **[Aufgabenblatt 01](./Kapitel/01_Kinematik_und_Euler/Uebung/Aufgabenblatt.md)** |
| <img src="./Kapitel/02_Pixelgrafik_und_FDM/Folien/Titelbild.jpg" width="200"> | **[Kapitel 02: 2D-Pixelgrafik & FDM](./Kapitel/02_Pixelgrafik_und_FDM/)**<br>Direkte Rastergrafik mit `WriteableBitmap`, Stride-Speicherlayout, Farbtabellen (LUTs) und 2D-FDM-Wärmeleitung ([`Folien.md`](./Kapitel/02_Pixelgrafik_und_FDM/Folien/Folien.md)). | **[Aufgabenblatt 02](./Kapitel/02_Pixelgrafik_und_FDM/Uebung/Aufgabenblatt.md)** |
| <img src="./Kapitel/03_Vektorgrafik_und_Canvas/Folien/Titelbild.jpg" width="200"> | **[Kapitel 03: 2D-Vektorgrafik & Canvas](./Kapitel/03_Vektorgrafik_und_Canvas/)**<br>Geometrische Vektorgrafik mit `WPF Canvas`, Welt-zu-Bildschirm-Transformationen und `DrawingVisual`-Pipeline ([`Folien.md`](./Kapitel/03_Vektorgrafik_und_Canvas/Folien/Folien.md)). | **[Aufgabenblatt 03](./Kapitel/03_Vektorgrafik_und_Canvas/Uebung/Aufgabenblatt.md)** |
| <img src="./Kapitel/04_Telemetrie_und_ScottPlot/Folien/Titelbild.jpg" width="200"> | **[Kapitel 04: Telemetrie & ScottPlot](./Kapitel/04_Telemetrie_und_ScottPlot/)**<br>Echtzeit-Telemetrie mit `ScottPlot 5` (Ringpuffer), MVVM-Entkopplung und topologische Graphen mit `MSAGL` ([`Folien.md`](./Kapitel/04_Telemetrie_und_ScottPlot/Folien/Folien.md)). | **[Aufgabenblatt 04](./Kapitel/04_Telemetrie_und_ScottPlot/Uebung/Aufgabenblatt.md)** |
| <img src="./Kapitel/05_3D_OpenGL_Szenengraph/Folien/Titelbild.jpg" width="200"> | **[Kapitel 05: 3D-OpenGL & Szenengraph](./Kapitel/05_3D_OpenGL_Szenengraph/)**<br>3D-Rendering mit `SharpGL`, hierarchische Szenengraphen, parametrische Körper und Orbit-Kamera ([`Folien.md`](./Kapitel/05_3D_OpenGL_Szenengraph/Folien/Folien.md)). | **[Aufgabenblatt 05](./Kapitel/05_3D_OpenGL_Szenengraph/Uebung/Aufgabenblatt.md)** |
| <img src="./Kapitel/06_Multithreading_und_TPL/Folien/Titelbild.jpg" width="200"> | **[Kapitel 06: Multithreading & TPL](./Kapitel/06_Multithreading_und_TPL/)**<br>Multi-Core-Parallelisierung mit `Parallel.For`, Race-Condition-Schutz, Double-Buffering und Thread-Entkopplung ([`Folien.md`](./Kapitel/06_Multithreading_und_TPL/Folien/Folien.md)). | **[Aufgabenblatt 06](./Kapitel/06_Multithreading_und_TPL/Uebung/Aufgabenblatt.md)** |
| <img src="./Kapitel/07_Statik_FEM_Cholesky/Folien/Titelbild.jpg" width="200"> | **[Kapitel 07: Statik, FEM & Cholesky](./Kapitel/07_Statik_FEM_Cholesky/)**<br>Ideale und elastische 2D/3D-Fachwerke, Steifigkeitsmatrizen $\mathbf{K}\vec{u}=\vec{f}$ und Cholesky-Zerlegung (`Math.NET`) ([`Folien.md`](./Kapitel/07_Statik_FEM_Cholesky/Folien/Folien.md)). | **[Aufgabenblatt 07](./Kapitel/07_Statik_FEM_Cholesky/Uebung/Aufgabenblatt.md)** |
| <img src="./Kapitel/08_DGL_und_SFunctions/Folien/Titelbild.jpg" width="200"> | **[Kapitel 08: DGL & S-Functions](./Kapitel/08_DGL_und_SFunctions/)**<br>Zustandsraum & DGLs, Euler/Heun/RK4, Steifheit, algebraische Schleifen, S-Functions und Anti-Windup-Regelung ([`Folien.md`](./Kapitel/08_DGL_und_SFunctions/Folien/Folien.md)). | **[Aufgabenblatt 08](./Kapitel/08_DGL_und_SFunctions/Uebung/Aufgabenblatt.md)** |
| <img src="./Kapitel/09_Diskrete_Systeme_DES/Folien/Titelbild.jpg" width="200"> | **[Kapitel 09: Diskrete Systeme & DES](./Kapitel/09_Diskrete_Systeme_DES/)**<br>Ereignisdiskrete Simulation (DES, `PriorityQueue`), Stochastik, paralleles Monte-Carlo und Welford-Akkumulator ([`Folien.md`](./Kapitel/09_Diskrete_Systeme_DES/Folien/Folien.md)). | **[Aufgabenblatt 09](./Kapitel/09_Diskrete_Systeme_DES/Uebung/Aufgabenblatt.md)** |
| <img src="./Kapitel/10_Hybride_Dynamik_Synthese/Folien/Titelbild.jpg" width="200"> | **[Kapitel 10: Hybride Dynamik & Synthese](./Kapitel/10_Hybride_Dynamik_Synthese/)**<br>Kopplung kontinuierlicher DGLs mit State Events, Vorzeichenwechsel-Bisektion, Zeno-Effekt und hybride S-Functions ([`Folien.md`](./Kapitel/10_Hybride_Dynamik_Synthese/Folien/Folien.md)). | **[Aufgabenblatt 10](./Kapitel/10_Hybride_Dynamik_Synthese/Uebung/Aufgabenblatt.md)** |
| <img src="./Kapitel/11_Epilog/Folien/Titelbild.jpg" width="200"> | **[Kapitel 11: Epilog & Synthese](./Kapitel/11_Epilog/)**<br>Vergleichende Modell-Taxonomie, Multi-Fidelity-Simulation, Co-Simulation (FMI/FMU) und Virtuelle Inbetriebnahme (VIBN) ([`Folien.md`](./Kapitel/11_Epilog/Folien/Folien.md)). | – *(Teil von Termin 10)* |

---

## Qualitätssicherung, Build & PDF-Export

```powershell
# 1. Vollständige Validierung aller Foliensätze (DOM-Layout, Abschnittsschema, SVGs, Variablen-Konsistenz)
npm run lint

# 2. Gezielte Prüfung eines einzelnen Kapitels (z.B. Kapitel 05)
npm run lint:slides:05
npm run lint:sections:05
npm run lint:svg:05
npm run lint:variables:05

# 3. Druckreife PDFs erzeugen (Vorlesungsfolien & Übungsblätter -> Export/)
npm run export:pdf

# 4. HiDPI-Plots für die Vorlesungsfolien neu generieren
npm run generate:plots

# 5. Referenz-Solution in Quellen/ kompilieren und testen
dotnet test Quellen/Quellen.sln -c Release
```
