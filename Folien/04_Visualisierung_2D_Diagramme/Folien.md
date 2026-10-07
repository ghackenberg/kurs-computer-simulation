---
marp: true
theme: fhooe
header: 'Kapitel 4: 2D-Visualisierung (Diagramme & Graphen)'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

# Kapitel 4: 2D-Visualisierung (Diagramme & Graphen)

Dieses Kapitel umfasst die folgenden Abschnitte:

- 4.1: Einführung in 2D-Diagramme und Datenstrukturen
- 4.2: Zeitreihen- und Streudiagramme mit ScottPlot
- 4.3: Statistische Auswertung & Histogramme mit ScottPlot
- 4.4: Topologie- und Netzwerkgraphen mit MSAGL

---

## 4.1: Einführung in 2D-Diagramme und Datenstrukturen

Dieser Abschnitt umfasst die folgenden Inhalte:

- Die Rolle von Diagrammen und Graphen in der Simulationstechnik
- Überblick über WPF-Frameworks: High-Level-Komponenten vs. Low-Level-Zeichnen
- Architektur: Datenquelle, View-Model und Chart-/Graph-Controls

---

### Warum spezialisierte Bibliotheken?

- Eigene Canvas- oder Pixel-Zeichnungen bieten maximale Freiheit, erfordern aber hohen Entwicklungsaufwand für Achsen, Gitter, Legenden, Zooming und automatisches Layout.
- In industriellen Simulationsanwendungen und Digitalen Zwillingen dominieren zwei Visualisierungsaufgaben:
  1. **Datenverläufe & Zeitreihen (Plots/Charts):** Verfolgung kontinuierlicher Signale $x(t)$ und statistischer Verteilungen.
  2. **Strukturen & Topologien (Graphen):** Darstellung von Signalflüssen, Blockschaltbildern, Komponentennetzwerken und Zustandsübergängen.
- In diesem Kapitel nutzen wir zwei etablierte Bibliotheken:
  - **`ScottPlot`** für hochperformante wissenschaftliche Diagramme.
  - **`MSAGL`** (Microsoft Automatic Graph Layout) für gerichtete Netzwerkgraphen.

---

## 4.2: Zeitreihen- und Streudiagramme mit ScottPlot

Dieser Abschnitt umfasst die folgenden Inhalte:

- Eigenschaften und Architektur von ScottPlot
- Einbindung des `WpfPlot`-Controls
- Erstellung von Streu- und Liniendiagrammen (`Plot.Add.Scatter`)
- Interaktivität (Zoom, Pan, AutoScale)

---

<div class="columns">
<div class="two">

### Visualisierung mit ScottPlot

`ScottPlot` ist eine freie und quelloffene Bibliothek für .NET zur Erstellung interaktiver Diagramme.

- **Einfache API:** Schnelle Diagrammerstellung mit wenigen Codezeilen.
- **Hohe Performance:** Hardware-beschleunigtes Rendering (SkiaSharp), optimiert für Millionen von Datenpunkten.
- **Vielseitig:** Unterstützt Linien-, Signal-, Streu-, Balkendiagramme und Histogramme.
- **Interaktiv:** Diagramme in WPF sind standardmäßig interaktiv (zoomen mit Mausrad, verschieben per Drag & Drop).

</div>
<div>

![](https://scottplot.net/images/brand/favicon.svg)

</div>
</div>

---

<div class="columns">
<div class="three">

### ScottPlot API: **Grundlagen**

Die zentrale Klasse in ScottPlot ist `ScottPlot.Plot`. Eine Instanz davon repräsentiert ein Diagramm.

**Typischer Workflow:**
1. **Plot-Objekt erhalten:** Über das `WpfPlot`-Control in XAML (`WpfPlot1.Plot`).
2. **Daten hinzufügen:** Mit Methoden wie `Plot.Add.Scatter()`, `Plot.Add.Signal()`, `Plot.Add.Bar()`.
3. **Diagramm konfigurieren:** Achsenbeschriftungen (`Plot.XLabel()`, `Plot.YLabel()`), Titel (`Plot.Title()`), Legende (`Plot.Legend.IsVisible = true`).
4. **Aktualisieren:** Bei dynamischen Daten über `WpfPlot1.Refresh()`.

</div>
<div>

```xaml
<!-- XAML-Einbindung -->
<Window ...
  xmlns:sp="clr-namespace:ScottPlot.WPF;assembly=ScottPlot.WPF">
  <Grid>
    <sp:WpfPlot x:Name="WpfPlot1" />
  </Grid>
</Window>
```

</div>
</div>

---

### ScottPlot API: **Linien- und Streudiagramme**

```csharp
// Daten für Zeitachse (t) und Signalwert (y)
double[] xs = { 0.0, 0.1, 0.2, 0.3, 0.4, 0.5 };
double[] ys1 = { 0.0, 0.8, 1.2, 1.1, 0.9, 1.0 };
double[] ys2 = { 0.0, 0.5, 0.9, 1.3, 1.5, 1.4 };

// Streudiagramme zum Plot hinzufügen
var scatter1 = WpfPlot1.Plot.Add.Scatter(xs, ys1);
scatter1.Label = "Zustand x1(t)";
scatter1.Color = ScottPlot.Colors.Blue;
scatter1.MarkerSize = 5;

var scatter2 = WpfPlot1.Plot.Add.Scatter(xs, ys2);
scatter2.Label = "Zustand x2(t)";
scatter2.Color = ScottPlot.Colors.Red;
scatter2.LineStyle = ScottPlot.LineStyle.Dash;

WpfPlot1.Plot.Legend.IsVisible = true;
WpfPlot1.Plot.Axes.AutoScale();
WpfPlot1.Refresh();
```

---

## 4.3: Statistische Auswertung & Histogramme mit ScottPlot

Dieser Abschnitt umfasst die folgenden Inhalte:

- Darstellung von Verteilungen und Messdaten
- Berechnung von Häufigkeitsverteilungen (`Histogram`)
- Visualisierung mittels Balkendiagrammen (`BarPlot`)

---

### ScottPlot API: **Histogramme**

```csharp
// Rohdaten aus einer Simulation (z.B. Wartezeiten, Dauern)
double[] waitTimes = { 1.2, 2.5, 1.8, 3.1, 2.0, 1.5, 2.8, 3.5, 2.2, 1.9 };

// 1. Histogramm-Klassen berechnen (10 Bins im Bereich 0..5)
var hist = new ScottPlot.Statistics.Histogram(waitTimes, min: 0, max: 5, binCount: 10);

// 2. Balken zum Plot hinzufügen
var bar = WpfPlot1.Plot.Add.Bar(hist.Counts, hist.BinCenters);
bar.Label = "Häufigkeitsverteilung";
bar.FillColor = ScottPlot.Colors.SteelBlue.WithAlpha(0.7);

// 3. Beschriftungen
WpfPlot1.Plot.XLabel("Intervall [min]");
WpfPlot1.Plot.YLabel("Häufigkeit");
WpfPlot1.Plot.Axes.AutoScale();
WpfPlot1.Refresh();
```

---

## 4.4: Topologie- und Netzwerkgraphen mit MSAGL

Dieser Abschnitt umfasst die folgenden Inhalte:

- Mathematisches Graphenmodell: Knoten ($V$) und gerichtete Kanten ($E$)
- Das Microsoft Automatic Graph Layout (`AutomaticGraphLayout.WpfGraphControl`)
- Aufbau von Block- und Signalflussdiagrammen aus Simulationsmodellen
- Automatische Layout-Algorithmen und Kanten-Routing

---

### Netzwerktopologien & Blockdiagramme

- In Simulationssystemen (wie MATLAB Simulink oder Simscape) werden Modelle als **Graphen** dargestellt:
  - **Knoten:** Funktionsblöcke (z.B. Summierer, Integrator, Verstärker) oder physische Bauteile (Masse, Feder).
  - **Kanten:** Signalflüsse, Variablenkopplungen oder mechanische/elektrische Verbindungen.
- **Problem:** Die manuelle Positionierung von Knoten ist aufwändig.
- **Lösung:** MSAGL platziert Knoten und routet Verbindungslinien vollautomatisch!

---

### MSAGL: Einbindung in WPF

```xaml
<Window ...
  xmlns:msagl="clr-namespace:Microsoft.Msagl.WpfGraphControl;assembly=Microsoft.Msagl.WpfGraphControl">
  <Grid>
    <msagl:AutomaticGraphLayoutControl x:Name="GraphControl" />
  </Grid>
</Window>
```

```csharp
using Microsoft.Msagl.Drawing;

// 1. Graph-Objekt erstellen
var graph = new Graph("Simulationsmodell");

// 2. Knoten hinzufügen
graph.AddNode("Integrator").LabelText = "Integrator [1/s]";
graph.AddNode("Gain").LabelText = "Gain [k=2.5]";
graph.AddNode("Sum").LabelText = "Sum [+ -]";

// 3. Gerichtete Kanten (Verbindungen) definieren
graph.AddEdge("Sum", "e(t)", "Integrator");
graph.AddEdge("Integrator", "x(t)", "Gain");
graph.AddEdge("Gain", "Feedback", "Sum");

// 4. Dem Control übergeben (Layout wird automatisch berechnet!)
GraphControl.Graph = graph;
```

---

### Automatische Layout-Algorithmen

MSAGL bietet mehrere spezialisierte Layout-Engines:

- **Sugiyama-Algorithmus (Hierarchisches Layout):**
  - Ordnet Knoten in Schichten/Ebenen an.
  - Minimiert Kantenkreuzungen.
  - Ideal für gerichtete Signalflüsse und Ursache-Wirkungsketten.
- **Force-Directed (Kräftebasiertes Layout):**
  - Physikalische Analogie: Kanten sind Federn, Knoten stoßen sich ab.
  - Ideal für ungerichtete Netzwerke, Schaltungen und Komponentenstrukturen.
- **MDS (Multi-Dimensional Scaling):**
  - Erhält globale Distanzen im Graphen.

---

# Zusammenfassung Kapitel 4

- Für standardisierte Visualisierungsaufgaben bieten spezialisierte Frameworks enorme Zeit- und Performancevorteile.
- **`ScottPlot`** ermöglicht die flüssige, interaktive Darstellung umfangreicher Zeitreihen und statistischer Verteilungen (Scatter-Plots, Histogramme).
- **`MSAGL`** löst das Problem der Strukturdarstellung: Es modelliert Simulationsarchitekturen als mathematische Graphen und berechnet Knotenplatzierungen und Kantenführungen automatisch.
- Zusammen bilden Diagramme und Topologiegraphen das Rückgrat für das Monitoring und Debugging moderner Simulationsläufe.
