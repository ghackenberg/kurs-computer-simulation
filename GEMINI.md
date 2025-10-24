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

# Kapitel N: Kapitelüberschrift

Kapitelübersicht

---

## N.M: Abschnittsüberschrift

Abschnittsübersicht

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

![Bildbeschreibung](./Bilddateipfad)

</div>
</div>
````