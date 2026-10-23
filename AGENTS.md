# Systeminstruktionen

## Kontext

Ich bin *Professor für Informatik und Industriesysteme* an der *Fakultät für Technik und angewandte Naturwissenschaften* der *Fachhochschule Oberösterreich* am *Campus Wels*.

Ich unterrichte im Bachelor-Studiengang *Automatisierungstechnik*, in dem wir die Studierenden zu Entwicklern von automatisierten Maschinen und Anlagen in unterschiedlichen Anwendungsbereichen ausbilden.

Dieses Repostitory enthält meine Unterlagen für den Kurs *Systemsimulation / Digitaler Zwilling*, in dem die Studierenden die Grundlagen der Modellierungs- und Simulationstechnik erlernen.

## Lernziele

Die Studierenden sollen in der Lage sein, für gegebene Problemstellungen passende Modelle abzuleiten sowie Programme für die Berechnung und Visualisierung zu entwickeln.

Die Studierenden sollen in der Lage sein, die Algorithmen für die Berechnung (z.B. Schrittweite eines numerischen Integrators) geeignet zu parametrieren.

Die Studierenden sollen in der Lage sein, eigene 2D- und 3D-Visualisierungen für Simulationsdaten zu entwickeln, welche über einfache Diagramme hinausgehen.

## Kursinhalte

Im Kurs betrachten wir sowohl statische als auch dynamische Modelle. Bei den dynamischen Modellen betrachten wir außerdem sowohl kontinuierliche als auch diskrete Modelle.

Für jede Art von Modell betrachten wir konkrete Beispiele und diskutieren die mathematische Modellierung, die analytische Lösung, die numerische Lösung, und die programmtechnische Umsetzung.

Bei der programmtechnischen Umetzung gehen wir auf geeignete Softwarearchitekturen für die Abbildung der Modelle, der Berechnungen, und der Visualisierungen ein.

Bei den Softwarearchitekturen lehnen wir uns an etablierte Strukturen (wie z.B. MATLAB Simulink S-Funktionen für dynamische Modelle mit kontinuierlichen und diskreten Zuständen) an.

Für die Berechnungen nutzen wir, wenn möglich, bestehende Bibliotheken (wie z.B. `Math.NET Numerics` für die Lösung von linearen Gleichungssystemen).

Für die Visualisierung nutzen wir `WPF` (inklusive `WriteableBitmap` für Rastergrafiken und `WPF Canvas` für Vektorgrafiken) und diverse Bibliotheken wie `ScottPlot` für Diagramme, `MSAGL` für Netzwerkgraphen und `SharpGL` für 3D-Darstellungen. Für rechenintensive Berechnungen setzen wir auf Multithreading mit der Task Parallel Library (`Parallel.For`).

## Präsentationstechnik

Für die Präsentationsfolien (bzw. das Vorlesungsskriptum) verwende ich das Markdown Presentation Ecosystem (MARP) mit einem eigenen Theme für die Fachhochschule Oberösterreich.

Der Grundlegende Aufbau der MARP-Dateien für die Präsentationsfolien umfasst Kapitel- und Abschnittsüberschriften sowie Inhaltsfolien wie im folgenden Beispiel dargestellt.

```md
---
marp: true
theme: fhooe
header: Kapitelüberschrift
footer: Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme
paginate: true
math: mathjax
---

<!-- Platzhalter für Kapitelbildbeschreibung -->

![bg right](./Kapitelbilddateipfad)

# Kapitel N: Kapitelüberschrift

Dieses Kapitel umfasst die folgenden Abschnitte:

- N.1: Abschnittsüberschrift 1
- N.2: Abschnittsüberschrift 2
- ...

---

<!-- Platzhalter für Abschnittsbildbeschreibung -->

![bg right](./Abschnittsbilddateipfad)

## N.M: Abschnittsüberschrift

Dieser Abschnitt umfasst die folgenden Inhalte:

- Inhalt 1
- Inhalt 2
- ...

---

### Inhaltsfolienüberschrift

Inhaltsfolientext
...
```

Das eigene Theme unterstützt die Erstellung mehrspaltiger Folienlayouts mittels einem übergeordenten `<div class="columns">` sowie zwei oder mehreren untergeordneten `<div class="relative weight">`.

```md
<div class="columns">
<div class="one|two|three|four|five|six">

Inhalt der ersten Spalte

</div>
<div class="one|two|three|four|five|six">

Inhalt der zweiten Spalte

</div>
...
</div>
```

Der Inhalt einer Folie oder Folienspalte kann ein Text (inklusive Listen und Formeln), eine Tabelle, ein Programmcode, oder eine Referenz auf eine Bilddatei mit Beschreibung der Bildinhalte sein.

````md
<div class="columns">
<div class="one|two|three|four|five|six">

Folientext (inklusive Listen und Formeln)

</div>
<div class="one|two|three|four|five|six">

| Spalte A | Spalte B | ... |
|-|-|-|
| Inhalt 1 | Inhalt 2 | ... |
| ... | ... | ... |

</div>
<div class="one|two|three|four|five|six">

```Programmiersprache
Quelltext
```

</div>
<div class="one|two|three|four|five|six">

![Platzhalter für Bildbeschreibung](./Bilddateipfad)

</div>
</div>
````

Die Bilder selbst können als Fotografie und Screenshot oder mit Nano Banana, Tikz, und Mermaid.js erstellt werden. Die Quelldateien von Tikz- und Mermaid.js Diagrammen werden in Visual Studio Code mittels *RunOnSave* automatisch in SVG-Dateien kompiliert.

## Ordnerstruktur

Dieses Repository ist nach folgendem Schema aufgebaut:

- Der Ordner `./Folien` enthält die Foliensätze
- Der Ordner `./Folien/[XX_Kapitel_Bezeichnung]` enthält den Foliensatz für Kapitel `XX`
- Die Datei `./Folien/[XX_Kapitel_Bezeichnung]/Titelbild.jpg` ist das Titelbild zum Kapitel (mit Nano Banana generiert)
- Die Datei `./Folien/[XX_Kapitel_Bezeichnung]/Folien.md` enthält den MARP-Markdown für den Foliensatz des Kapitels
- Die Datei `./Folien/[XX_Kapitel_Bezeichnung]/Notizen.md` enthält Notizen zum Foliensatz (z.B. größere TODOs)
- Der Ordner `./Folien/[XX_Kapitel_Bezeichnung]/Diagramme` enthält die Tikz- und Mermaid-Diagramme
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Diagramme/[Diagrammname].tikz.tex` enthält den Quelltext einer Tikz-Grafik
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Diagramme/[Diagrammname].tikz.svg` enthält die kompilierte SVG-Datei für eine Tikz-Grafik
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Diagramme/[Diagrammname].mmd` enthält den Quelltext einer Mermaid.js-Grafik
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Diagramme/[Diagrammname].svg` enthält die kompilierte SVG-Datei für eine Mermaid.js-Grafik
- Der Ordner `./Folien/[XX_Kapitel_Bezeichnung]/Illustrationen` enthält mit Nano Banana generierte Illustrationen
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Illustrationen/[Illustrationsname].jpg` ist eine spezielle Illustration
- Der Ordner `./Folien/[XX_Kapitel_Bezeichnung]/Screenshots` enthält Screenshots von selbst entwickelten Simulationsprogrammen
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Screenshots/[Screenshotname].jpg` ist ein spezieller Screenshot
- Der Ordner `./Folien/[XX_Kapitel_Bezeichnung]/Tafelbilder` enthält Fotografien von Tafelbildern, die während dem Unterricht entstanden sind
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Tafelbilder/[Tafelbildname].jpg` ist ein spezielles Tafelbild
- Der Ordner `./Folien/[XX_Kapitel_Bezeichnung]/Fotografien` enthält alle sonstigen Fotografien von Personen, Gegenständen, und Situationen
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Fotografien/[Fotografiename].jpg` ist eine spezielles Fotografie
- Der Ordner `./Quellen` enthält die zugehörigen C#-Implementierungen nach Semester und Thema geordnet
- Der Ordner `./Quellen/[WSXX]` enthält die C#-Implementierung aus dem Wintersemester `XX`
- Der Ordner `./Quellen/[SSXX]` enthält die C#-Implementierung aus dem Sommersemester `XX`
- Der Ordner `./Quellen/[WS|SSXX]/[Projektname]` enthält die C#-Implementierung aus einem speziellen Semester und zu einem spezifischen Thema
- Der Ordner `./Uebungen` enthält die Aufgaben- und Übungsblätter nach Terminen geordnet (`[XX_Uebung_Bezeichnung]`)
- Der Ordner `./Export` enthält alle druckreifen, exportierten Moodle-PDFs (Foliensätze und Übungsblätter)
- Der Ordner `./Skripte` enthält plattformunabhängige Node.js-basierte Prüf- und Buildskripte (Linter für DOM, Abschnitte, SVGs sowie PDF-Export)
- Der Ordner `./Vorlagen` enthält Vorlagen für Tikz- und Mermaid.js-Grafiken
- Der Ordner `./Werkzeuge` enthält interne Entwickler- und Generierungswerkzeuge (z.B. den C#-Grafikgenerator in `./Werkzeuge/GrafikGenerator`)



## Qualitätsprüfung & Linter (Automatisierte Prüfskripte)

Zur Sicherstellung der didaktischen und visuellen Qualität existieren automatisierte Prüfskripte, die vor jedem Commit und nach jeder Folienänderung ausgeführt werden sollen:

### 1. Schnellausführung via npm

Alle Linter und Build-Skripte sind in der zentralen `package.json` hinterlegt (frühere PowerShell-Skripte wurden zugunsten plattformunabhängiger npm-Befehle vollständig abgelöst):

- **Gesamter Prüflauf:**
  - `npm run lint` – Führt die vollständige Validierung aus (DOM-Layout, Abschnittsschema, SVG-Audits, Variablen-Konsistenz).
- **Variablen-Konsistenz & Didaktische Abdeckung (Diagramme & Code):**
  - `npm run lint:variables` – Prüft die didaktische Variablen-Konsistenz für alle Kapitel.
  - `npm run lint:variables:[XX]` – Prüft gezielt Kapitel `XX` (`00` bis `11`, z.B. `npm run lint:variables:03`).
- **DOM- & Layoutprüfung (Überlauf, Sicherheitsabstände, effektive Schriftgrößen via CTM):**
  - `npm run lint:slides` – Prüft alle Foliensätze.
  - `npm run lint:slides:[XX]` – Prüft gezielt Kapitel `XX` (`00` bis `11`, z.B. `npm run lint:slides:03`).
- **Abschnitts- & Bildschema (3:4-Hintergrundbilder, Intro-Formulierungen, Agenda-Abgleich):**
  - `npm run lint:sections` – Prüft alle Kapitel.
  - `npm run lint:sections:[XX]` – Prüft gezielt Kapitel `XX` (`00` bis `11`, z.B. `npm run lint:sections:03`).
- **SVG-Audit & Typografie-Reparatur:**
  - `npm run lint:svg` – Standalone SVG-Audit für alle Diagramme in `Folien/`.
  - `npm run lint:svg:[XX]` – SVG-Audit gezielt für Kapitel `XX` (`00` bis `11`, z.B. `npm run lint:svg:03`).
  - `npm run fix:svg-fonts` – Automatische Reparatur zu kleiner Schriftgrößen in SVGs.
- **Druckreifer PDF-Export (Moodle):**
  - `npm run export:pdf` – Exportiert alle druckreifen PDFs für Moodle (`Folien/` und `Uebungen/`).
  - `npm run export:pdf:slides` – Exportiert nur alle Foliensätze.
  - `npm run export:pdf:exercises` – Exportiert nur alle Übungsblätter.
  - `npm run export:pdf:[XX]` – Kompiliert das Moodle-PDF gezielt für Kapitel `XX` (`00` bis `11`, z.B. `npm run export:pdf:03`).
  - `npm run export:pdf:uebung:[XX]` – Kompiliert das Moodle-PDF gezielt für Übungsblatt `XX` (`01` bis `10`, z.B. `npm run export:pdf:uebung:03`).

### 2. Regeln der automatisierten Qualitätsgates

1. **Vertikale und horizontale Begrenzung:**
   - Kein Element darf über die Folie ragen (`scrollHeight <= clientHeight`, `scrollWidth <= clientWidth`).
   - Mindestabstand zu Kopf- und Fußzeile: Mindestens **12 px** Sicherheitsabstand (`minHeaderMargin`, `minFooterMargin`).
2. **SVG- und Diagramm-Lesbarkeit:**
   - Effektive Schriftgröße aller Textelemente im final gerenderten DOM: Mindestens **11.5 px** (`minFontSize`).
   - Die Messung erfolgt über die echte Browser-Transformationsmatrix (`getScreenCTM()`).
3. **Abschnitts- und Kapitelschema:**
   - Jedes Kapitel besitzt eine Übersicht mit `![bg right](./Titelbild.jpg)` (im 3:4-Hochformat, $896 \times 1200\,\text{px}$) und der Standard-Einleitung `Dieses Kapitel umfasst die folgenden Abschnitte:`.
   - Jeder Abschnitt `## N.M:` besitzt eine Übersicht mit `![bg right](./Illustrationen/Abschnitt_M.jpg)` (im 3:4-Hochformat) und der Standard-Einleitung `Dieser Abschnitt umfasst die folgenden Inhalte:`.
   - Die Bildinhalte müssen **minimalistisch**, **textfrei** und **auf eine einzige, klare Metapher fokussiert** sein.
4. **Variablen-Konsistenz & Didaktische Abdeckung:**
   - **Regel 1 (SVG-Diagramme):** Variablen und mathematische Symbole, die in SVG-Diagrammen dargestellt werden, müssen im zugehörigen Folientext (bzw. bei Vollformat-Diagrammen im Abschnitt) genannt und eingeführt werden.
   - **Regel 2 (Halbseitiger Code):** Variablen, Parameter und Knotennamen in zweispaltigen Code-Fragmenten müssen in der Texterklärung derselben Folie erläutert werden.
   - **Regel 3 (Ganzseitiger Code):** Variablen in ganzseitigen Code-Listings müssen auf den vorherigen Folien des aktuellen Abschnitts didaktisch eingeführt worden sein.
   - **Regel 4 (Didaktische Verankerung von Textvariablen):** Mathematische Formelvariablen im Folientext auf Folien mit Diagramm oder Code müssen im begleitenden Diagramm und/oder im Code-Snippet visualisiert oder verwendet werden (Gegenprüfung Text $\to$ SVG/Code).
