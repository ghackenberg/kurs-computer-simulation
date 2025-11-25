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

Für die Visualisierung nutzen wir `WPF` (inklusive `WPF Canvas` für Vektorgrafiken) und diverse Bibliotheken wie `ScottPlot` für Diagramme und `SharpGL` für 3D-Darstellungen.

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

Die Bilder selbst können mit Tikz, Asymptote, oder Mermaid.js erstellt werden. Die Quelldateien werden in Visual Studio Code mittels *RunOnSave* automatisch in SVG-Dateien kompiliert.

## Ordnerstruktur

Dieses Repository ist nach folgendem Schema aufgebaut:

- Der Ordner `./Folien` enthält die Foliensätze
- Der Ordner `./Folien/[XX_Kapitel_Bezeichnung]` enthält den Foliensatz für Kapitel `XX`
- Die Datei `./Folien/[XX_Kapitel_Bezeichnung]/README.md` enthält den MARP-Markdown für den Foliensatz des Kapitels
- Der Ordner `./Folien/[XX_Kapitel_Bezeichnung]/Diagramme` enthält die Tikz- und Mermaid-Diagramme
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Diagramme/[Diagrammname].tikz.tex` enthält den Quelltext einer Tikz-Grafik
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Diagramme/[Diagrammname].tikz.svg` enthält die kompilierte SVG-Datei für eine Tikz-Grafik
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Diagramme/[Diagrammname].mmd` enthält den Quelltext einer Mermaid.js-Grafik
- Der Datei `./Folien/[XX_Kapitel_Bezeichnung]/Diagramme/[Diagrammname].svg` enthält die kompilierte SVG-Datei für eine Mermaid.js-Grafik
- Der Ordner `./Quellen` enthält die zugehörigen C#-Implementierungen nach Semester und Thema geordnet
- Der Ordner `./Quellen/[WSXX]` enthält die C#-Implementierung aus dem Wintersemester `XX`
- Der Ordner `./Quellen/[SSXX]` enthält die C#-Implementierung aus dem Sommersemester `XX`
- Der Ordner `./Quellen/[WS|SSXX]/[Projektname]` enthält die C#-Implementierung aus einem speziellen Semester und zu einem spezifischen Thema
- Der Ordner `./Vorlagen` enthält Vorlagen für Tikz- und Mermaid.js-Grafiken

