---
marp: true
theme: fhooe
header: 'Kapitel 4: 2D-Visualisierung (Diagramme & Graphen)'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

<!-- _paginate: false -->
<!-- _header: "" -->
<!-- _footer: "" -->

![bg right](./Titelbild.jpg)

# Kapitel 4: 2D-Visualisierung (Diagramme & Graphen)

Dieses Kapitel umfasst die folgenden Abschnitte:

- 4.1: Einführung in 2D-Diagramme und Datenstrukturen
- 4.2: Zeitreihen- und Streudiagramme mit ScottPlot
- 4.3: Statistische Auswertung & Histogramme mit ScottPlot
- 4.4: Live-Streaming & Telemetrie
- 4.5: Topologie- und Netzwerkgraphen mit MSAGL

---

### Showcase & Peer-Challenge: Termin 03

Präsentation der Ergebnisse aus Termin 03 ([Aufgabenblatt 03](../../Uebungen/Termin_03_Vektorgrafik_Canvas/Aufgabenblatt.md)):

<div class="columns">
<div class="two">

#### Track A: Industrie (2D-CAD Fachwerkträger)
- **Geometrie:** Normgerechte Bemaßungsketten (DIN 406), Auto-Fit BoundingBox mit Randabstand.
- **Interaktion:** Drag-and-Drop der Knoten, mitgeführte Stäbe & Lastpfeile.
- **Stresstest:** Extremes Fensterformat (21:9) & Knoten-Verschiebung im Live-Test.

</div>
<div class="two">

#### Track B: Game (Radar / Blueprint)
- **Vektorgrafik:** Space-Radar mit Distanzringen & $\vec{v}/\vec{a}$-Pfeilen ODER Blueprint Sketcher.
- **Interaktion:** Stufenloser Pan & Zoom mit Maus-Zentrierung (`MatrixTransform`).
- **Stresstest:** Maximaler Zoom-In/Out & viele Stäbe/Vektoren live einzeichnen.

</div>
</div>

> **Peer-Challenge (Säule 2b):** Prüfung auf exakte Koordinatentransformation (Welt $\leftrightarrow$ Screen), Isotropie und Kausalität (reine Geometrie, keine Statik!).

---

<!-- Platzhalter für Abschnittsbildbeschreibung -->

![bg right](./Illustrationen/Abschnitt_1.jpg)

## 4.1: Einführung in 2D-Diagramme und Datenstrukturen

Dieser Abschnitt umfasst die folgenden Inhalte:

- Die Rolle von Diagrammen und Graphen in der Simulationstechnik
- Das Display-Bottleneck und die Grenzen nativer UI-Elemente
- Retained Mode vs. Immediate Mode beim Plotting
- Daten-Dezimation: Aliasing-Falle vs. Min/Max-Säulen-Decimation
- Rendering-Pipeline moderner Chart-Engines (ScottPlot 5)

---

### Warum spezialisierte Diagramm-Bibliotheken?

- Eigene Canvas- oder Pixel-Zeichnungen bieten maximale Freiheit, erfordern aber hohen Entwicklungsaufwand für Achsen, Gitter, Legenden, Zooming und automatisches Layout.
- In industriellen Simulationsanwendungen und Digitalen Zwillingen dominieren zwei Visualisierungsaufgaben:
  1. **Datenverläufe & Zeitreihen (Plots/Charts):** Verfolgung kontinuierlicher Signale $x(t)$, Systemtrajektorien und statistischer Verteilungen.
  2. **Strukturen & Topologien (Graphen):** Darstellung von Signalflüssen, Blockschaltbildern, Komponentennetzwerken und Kausalitäten.
- In diesem Kapitel nutzen wir zwei etablierte Open-Source-Bibliotheken:
  - **`ScottPlot 5`** für hochperformante wissenschaftliche Zeitreihen- und Statistikdiagramme.
  - **`MSAGL`** (Microsoft Automatic Graph Layout) für gerichtete Netzwerktopologien und Blockdiagramme.

---

### Das Display-Bottleneck: $10^7$ Punkte vs. Bildschirm

<div class="columns">
<div class="two">

In der Automatisierungstechnik fallen bei hochfrequenter Messwerterfassung (z.B. DAQ mit $1\,\text{kHz}$) rasch enorme Datenmengen an:

- Nach 3 Stunden Messung umfasst der Puffer $N = 10^7$ Samples.
- Ein Standard-Monitor (Full HD bis 4K) besitzt jedoch nur $1.920$ bis $3.840$ horizontale Bildschirmpixel!
- **Das Dilemma:** Auf eine einzige Pixelspalte treffen rechnerisch bis zu $5.000$ Messwerte.
- **Kollaps nativer Controls:** Ein WPF-`Canvas` mit $10^7$ `Line`- oder `Polyline`-Objekten belegt Gigabytes an Speicher im Visual Tree und friert das System ein.
- **Lösung:** Dezimierung der Daten auf Bildschirmauflösung in $O(\text{Pixel})$ statt $O(N)$!

</div>
<div class="one">

![](./Diagramme/Mini_Display_Bottleneck.svg)

</div>
</div>

---

### Daten-Dezimation: Die Aliasing-Falle

<div class="columns">
<div class="two">

Wie reduziert man $10^7$ Messwerte auf wenige tausend Bildschirmkoordinaten?

- **Naives Subsampling (Jeder $k$-te Wert):**
  - Man überspringt Punkte und zeichnet nur jeden $k$-ten Wert.
  - **Gefahr:** Transiente Spitzen (EMV-Pulse, Druckstöße) fallen in Lücken und werden **übersehen**!
- **Min/Max-Säulen-Decimation (ScottPlot):**
  - Für jede Pixelspalte wird das Indexintervall $[i_{\min}, i_{\max}]$ gebildet.
  - Es wird nur das **Minimum** und **Maximum** als vertikale Linie gerendert.
  - **Vorteil:** Die physikalische Hüllkurve bleibt garantiert erhalten!

</div>
<div class="one">

![](./Diagramme/Mini_Decimation_Aliasing.svg)

</div>
</div>

---

### ScottPlot 5 Rendering-Pipeline

<div class="columns">
<div class="two">

ScottPlot 5 umgeht das WPF-Retained-Mode-Problem durch eine direkte Hardware-Rendering-Pipeline:

1. **Datenarray im RAM:** Flaches `double[] ys` mit fester Abtastperiode `dt` ohne UI-Objekt-Overhead.
2. **Min/Max-Decimation:** Schnelle $O(1)$-Indexsuche berechnet pro Pixelspalte nur das vertikale Liniensegment.
3. **SkiaSharp-Engine:** Direktes 2D-Zeichnen auf eine gerenderte Offscreen-Bitmap (Direct2D/OpenGL-beschleunigt).
4. **WPF-Einbindung:** `WpfPlot` präsentiert das fertige Bild als Bitmap-Quelle (`ImageSource`) – **0 FrameworkElements** für Datenpunkte!
5. **Ergebnis:** Butterweiche 60 FPS selbst bei Millionen von Messwerten im Dauerlauf.

</div>
<div class="one">

![](./Diagramme/Mini_Rendering_Pipeline.svg)

</div>
</div>

---

<!-- Platzhalter für Abschnittsbildbeschreibung -->

![bg right](./Illustrationen/Abschnitt_2.jpg)

## 4.2: Zeitreihen- und Streudiagramme mit ScottPlot

Dieser Abschnitt umfasst die folgenden Inhalte:

- Eigenschaften und API-Architektur von ScottPlot 5
- Streu- vs. Signalgraphen (`Scatter`, `Signal`, `SignalXY`)
- Äquidistante Abtastung und $O(1)$-Indexsuche
- Phasenraum-Trajektorien in Mechatronik und Fahrphysik
- Dual-Achsen und Leitstand-Styling

---

### Visualisierung mit ScottPlot 5

<div class="columns">
<div class="two">

`ScottPlot` ist eine freie und quelloffene Bibliothek für .NET zur Erstellung interaktiver Diagramme.

- **Einfache API:** Schnelle Diagrammerstellung mit wenigen, ausdrucksstarken C#-Methoden.
- **Hohe Performance:** Hardware-beschleunigtes Rendering (SkiaSharp), optimiert für Millionen von Datenpunkten.
- **Vielseitig:** Unterstützt Linien-, Signal-, Streu-, Balkendiagramme und Histogramme.
- **Interaktiv:** Diagramme in WPF sind standardmäßig voll interaktiv (Zoomen mit Mausrad, Verschieben per Drag & Drop).
- **Modern:** Konsequente Trennung von Plot-Logik (`ScottPlot.Plot`) und WPF-Host (`WpfPlot`).

</div>
<div class="one">

![](./Illustrationen/ScottPlot_Logo.svg)

</div>
</div>

---

### ScottPlot 5 API: **Grundlagen**

<div class="columns">
<div class="two">

Die zentrale Klasse in ScottPlot ist `ScottPlot.Plot`. Eine Instanz davon repräsentiert ein vollständiges Diagramm.

**Typischer Workflow:**
1. **Plot-Objekt erhalten:** Über das `WpfPlot`-Control in XAML (`WpfPlot1.Plot`).
2. **Daten hinzufügen:** Mit Methoden wie `Plot.Add.Scatter()`, `Plot.Add.Signal()`, `Plot.Add.Bars()`.
3. **Achsen konfigurieren:** Beschriftungen mit `Plot.XLabel()`, `Plot.YLabel()` und Titel mit `Plot.Title()`.
4. **Legende aktivieren:** Über `Plot.Legend.IsVisible = true`.
5. **Aktualisieren:** Bei dynamischen Daten über `WpfPlot1.Refresh()`.

</div>
<div class="one">

```xaml
<!-- XAML-Einbindung in WPF -->
<Window ...
  xmlns:sp="clr-namespace:
    ScottPlot.WPF;
    assembly=ScottPlot.WPF">
  <Grid>
    <sp:WpfPlot 
      x:Name="WpfPlot1" />
  </Grid>
</Window>
```

</div>
</div>

---

### ScottPlot API: **Linien- und Streudiagramme**

```csharp
double[] xs = { 0.0, 0.1, 0.2, 0.3, 0.4, 0.5 };
double[] ys1 = { 0.0, 0.8, 1.2, 1.1, 0.9, 1.0 };
double[] ys2 = { 0.0, 0.5, 0.9, 1.3, 1.5, 1.4 };

var s1 = WpfPlot1.Plot.Add.Scatter(xs, ys1);
s1.Label = "Zustand x1(t)";
s1.Color = ScottPlot.Colors.Blue;
s1.MarkerSize = 5;

var s2 = WpfPlot1.Plot.Add.Scatter(xs, ys2);
s2.Label = "Zustand x2(t)";
s2.Color = ScottPlot.Colors.Red;
s2.LineStyle = ScottPlot.LineStyle.Dash;

WpfPlot1.Plot.Legend.IsVisible = true;
WpfPlot1.Plot.Axes.AutoScale();
WpfPlot1.Refresh();
```

- Konfiguration von zwei Kurven `s1` und `s2` mit `xs`, `ys1` und `ys2` für diskrete Zustandsverläufe.

---

### High-Performance Zeitreihen mit `Plot.Add.Signal`

<div class="columns">
<div class="two">

Messdaten liegen in der Simulation meist mit **konstanter Schrittweite** vor ($t_i = t_0 + i \cdot \Delta t$):

- **Kein Zeitstempel-Array:** Das Array `xs` muss überhaupt nicht gespeichert werden.
- **Skalare Abtastperiode:** Übergabe via `sig.Data.Period = dt`.
- **Echtzeit-Performance:** Flüssige Interaktion bei über **10 Millionen Datenpunkten** bei stabilen 60 FPS!

</div>
<div class="three">

![](./Illustrationen/ScottPlot_Signal_Example.png)

</div>
</div>

---

### Speicherbedarf im Vergleich: `Scatter` vs. `Signal`

<div class="columns">
<div class="two">

Der Verzicht auf ein explizites Zeitstempel-Array halbiert den RAM-Bedarf im Speicherlayout:

- **`Scatter(xs, ys)`:**
  - Benötigt zwei Arrays: `xs` (8 Byte) und `ys` (8 Byte).
  - Für $10^6$ Punkte: $2 \times 8\,\text{MB} = 16\,\text{MB}$ Heap-Speicher.
  - Suchaufwand beim Rendern: $O(N)$.
- **`Signal(ys)`:**
  - Benötigt nur `ys` (8 Byte) und skalare Abtastparameter `dt` sowie `t_0`.
  - Für $10^6$ Punkte: Nur **$8\,\text{MB}$ Heap-Speicher (-50 %)**.
  - Direkte Indexberechnung: $i(t) = \lfloor (t - t_0)/dt \rfloor$ in **$O(1)$**.

</div>
<div class="one">

![](./Diagramme/Mini_Signal_RAM_Vorteil.svg)

</div>
</div>

---

### Nicht-äquidistante Signale mit `SignalXY`

<div class="columns">
<div class="two">

Viele DGL-Solver (z.B. Runge-Kutta RK45) steuern Zeitschritte `dt` adaptiv:

- In transienten Phasen sinkt `dt` ab, im Gleichgewicht wächst `dt`.
- Array `xs` ist nicht-äquidistant, aber **streng monoton steigend**.
- **Grenze von `Signal`:** Direkte Indexsuche $i = \lfloor t/dt \rfloor$ für Index $i$ unmöglich.
- **Lösung `Plot.Add.SignalXY(xs, ys)`:**
  - **Binärsuche** in $O(\log N)$ ermittelt Indizes für $[xMin, xMax]$.
  - Min/Max-Dezimation rendert flüssig bei $> 10^6$ Punkten!

</div>
<div class="one">

![](./Diagramme/Mini_SignalXY_Binaersuche.svg)

</div>
</div>

---

### Anwendungsbeispiel: `SignalXY` mit adaptiver Schrittweite

<div class="columns">
<div class="two">

Konkrete Sprungantwort eines adaptiven DGL-Solvers (RK45) in ScottPlot 5:

- **Adaptive Schrittweite:** Kleines $\mathrm{d}t = 0{,}006\,\text{s}$ bei steilem Anstieg ($t < 0{,}6\,\text{s}$), großes $\mathrm{d}t = 0{,}04\,\text{s}$ im Gleichgewicht.
- Stützpunkte im Zeitarray `xs` und Zustandsarray `ys` sind variabel beabstandet.
- Referenzwert $w = 1{,}0$ zeigt das aperiodische Einschwingen.

</div>
<div class="three">

![](./Illustrationen/ScottPlot_SignalXY_Example.png)

</div>
</div>

---

### Phasenraum: Motorprüfstand

<div class="columns">
<div class="two">

In der Mechatronik (Übung 4, Track A) interessiert der Zusammenhang zweier Zustände:

- **Zustandsraum statt Zeitachse:** Zeit $t$ wird als explizite Achse eliminiert.
- **Zustandskurve:** Die gekoppelten Messwerte von Drehmoment $M(t)$ und Drehzahl $n(t)$ spannen die Trajektorie $(n, M)$ auf.
- **Kennfeld-Hyperbeln:** Linien konstanter Grenzleistung $P_{\max} = 2\pi \cdot n \cdot M$ bilden Hyperbeln im Zustandsraum.
- In ScottPlot wird dies über `Plot.Add.Scatter(nArr, mArr)` visualisiert.

</div>
<div class="one">

![](./Diagramme/Mini_Phasenraum_Motor.svg)

</div>
</div>

---

### Thermische Leistungsgrenze: Dauer- vs. Peak-Betrieb

<div class="columns">
<div class="two">

Warum darf die Leistungsgrenze im Kennfeld kurzzeitig überschritten werden?

- **Dauerbetrieb (S1):** Thermische Grenze $P_{\max} = 1{,}2\,\text{kW}$ darf im Dauerbetrieb nicht überschritten werden:
  $$M(n) \le \frac{P_{\max}}{2\pi \cdot n}$$
- **Thermische Zeitkonstante $\tau_{\text{th}}$:** Wicklungen erwärmen sich sehr träge (Minuten) gegenüber schnellen Beschleunigungsvorgängen.
- **Kurzzeit-Überlast (S2-Peak):** Beim Anfahren darf die Trajektorie kurzzeitig $P > P_{\max}$ abrufen.
- **Auslegungskriterium:** Der stationäre Arbeitspunkt muss zwingend im S1-Bereich liegen.

</div>
<div class="one">

![](./Diagramme/Mini_Motor_S1_vs_Peak.svg)

</div>
</div>

---

### ScottPlot API: `Scatter` im Motorkennfeld

<div class="columns">
<div class="two">

C#-Architektur zur Kennfeld-Visualisierung in ScottPlot 5:

- **Hyperbel:** Arrays `nHyp` und `mHyp` gemäß Grenze $P_{\max}$; Kurve `hyp` mit gestricheltem Stil (`LinePattern.Dashed`).
- **Phasen-Trajektorie:** Arrays `n1` und `m1` für Hochlauf und Lastaufschaltung als Trajektorie `t1`.
- **Marker:** `Plot.Add.Marker(...)` hebt den stationären S1-Arbeitspunkt hervor.

</div>
<div class="two">

```csharp
// 1. Hyperbel: Dauerleistung P_max = 1.2 kW
double[] nHyp = new double[80], mHyp = new double[80];
for (int i = 0; i < 80; i++) {
  nHyp[i] = 955.0 + i * (2045.0 / 79);
  mHyp[i] = 1200.0 / (2.0 * Math.PI * (nHyp[i] / 60.0));
}
var hyp = plot.Add.ScatterLine(nHyp, mHyp);
hyp.Color = ScottPlot.Colors.Crimson;
hyp.LinePattern = LinePattern.Dashed;

// 2. Trajektorien (Hochlauf & Last)
double[] n1 = { 0, 200, 600, 1200, 1600, 1900 };
double[] m1 = { 0, 9.2, 9.0,  8.5,  8.0,  7.0 };
var t1 = plot.Add.ScatterLine(n1, m1);
t1.Color = ScottPlot.Colors.SteelBlue;

// 3. Stationärer Arbeitspunkt & Achsen
plot.Add.Marker(2350, 4.0, MarkerShape.FilledSquare, 10);
plot.Axes.SetLimits(0, 3200, 0, 12);
```

</div>
</div>

---

### Anwendungsbeispiel: `Scatter` im Motorkennfeld

<div class="columns">
<div class="two">

Trajektorie $(n, M)$ in 3 farbkodierten Phasen:

- **1. Hochlauf (Blau):** Maximalmoment ($9{,}2\,\text{Nm}$) beschleunigt Trägheit; Peak ($1{,}4\,\text{kW}$) übersteigt $P_{\max} = 1{,}2\,\text{kW}$ kurzzeitig.
- **2. Solldrehzahl (Türkis):** Bei $2.450\,\text{U/min}$ fällt Beschleunigungsmoment ab ($M \to 2{,}8\,\text{Nm}$).
- **3. Lastaufschaltung (Orange):** Lastmoment ($4{,}0\,\text{Nm}$) greift an; stationärer S1-Punkt ($2.350\,\text{U/min}$).

</div>
<div class="three">

![](./Illustrationen/ScottPlot_Scatter_Example.png)

</div>
</div>

---

### Phasenraum: Kamm'scher Kreis (Fahrzeugtelemetrie)

<div class="columns">
<div class="two">

Gekoppelte Beschleunigungen im Racing-Leitstand (Übung 4, Track B):

- **Zustandsraum $(a_y, a_x)$:**
  - Längsachse $a_x$: Antreiben ($+a_x$) oder Bremsen ($-a_x$).
  - Querachse $a_y$: Kurvenkräfte (Zentripetalbeschleunigung).
- **Haftungsgrenze (Kamm'scher Kreis):**
  $$a_{\text{res}} = \sqrt{a_x^2 + a_y^2} \le \mu_{\max} \cdot g$$
  - Reifenhaftung begrenzt die Vektorsumme aus Längs- und Querkraft.
  - Vollbremsung ($|a_x| = \mu_{\max} g$) erzwingt $a_y = 0$ (Lenkverlust).
- **Peak-Reibwert:** $\mu_{\max}$ definiert das Haftungslimit ($g = 9{,}81\,\text{m/s}^2$).

</div>
<div class="one">

![](./Diagramme/Mini_Kammscher_Kreis.svg)

</div>
</div>

---

### Fahrdynamik: Grip-Zonen im G-G-Diagramm

<div class="columns">
<div class="two">

Klassifikation der Beschleunigungszustände im Leitstand:

- **Grip-Zonen nach Ausnutzung von $\mu_{\max} \cdot g$:**
  - **Grün ($a_{\text{res}} \le 0{,}8\,\mu_{\max} g$):** Sicherer linearer Bereich (hohe Haftungsreserve).
  - **Orange ($0{,}8 \dots 1{,}0\,\mu_{\max} g$):** Grenzbereich am Haftungslimit (kontrollierter Drift).
  - **Rot ($a_{\text{res}} > \mu_{\max} g$):** Traktionsabriss (Übergang in Gleitreibung, Spin-Gefahr).
- **Simulation & Telemetrie:**
  - Zeitschritte erzeugen Datenpunkte $(a_y, a_x)$ zur Fahrstilanalyse.

</div>
<div class="one">

![](./Diagramme/Mini_Kammscher_Zonen.svg)

</div>
</div>

---

### ScottPlot API: Kamm'scher Kreis & G-G-Diagramm

<div class="columns">
<div class="two">

C#-Architektur zur G-G-Visualisierung in ScottPlot 5:

- **Hüllkreise:** Arrays `xCirc` und `yCirc` mit Winkel `phi` via `Math.Cos` und `Math.Sin` für Radius $1{,}0\,g$.
- **`ScatterLine`:** Zeichnet Grenzlinie `limit` mit roter Signalfarbe (`Colors.Crimson`).
- **Streupunkte:** `s.LineWidth = 0` und `s.MarkerSize = 10` stellen Telemetriepunkte ohne Verbindungslinie dar.
- **1:1-Aspekt:** `Plot.Axes.SquareUnits()` erzwingt kreisrunde Geometrie auf dem Bildschirm.

</div>
<div class="two">

```csharp
// 1. Parametrischer Hüllkreis (1.0 g)
double[] xCirc = new double[121], yCirc = new double[121];
for (int i = 0; i <= 120; i++) {
  double phi = i * 2.0 * Math.PI / 120;
  xCirc[i] = 1.0 * Math.Cos(phi);
  yCirc[i] = 1.0 * Math.Sin(phi);
}
var limit = plot.Add.ScatterLine(xCirc, yCirc);
limit.Color = ScottPlot.Colors.Crimson;

// 2. Telemetriedaten als reine Punkte
var s = plot.Add.Scatter(ayData, axData);
s.LineWidth = 0;
s.MarkerSize = 10;
s.Color = ScottPlot.Colors.ForestGreen;

// 3. Quadratisches 1:1 Aspektverhältnis
plot.Axes.SquareUnits();
plot.Axes.SetLimits(-1.35, 1.35, -1.35, 1.35);
```

</div>
</div>

---

### Anwendungsbeispiel: G-G-Telemetrie mit ScottPlot

<div class="columns">
<div class="two">

Reifen-Grip-Telemetrie für das Gaming-HUD (Übung 4, Track B):

- **Grenz-Hüllkurven:** Parametrische Kreise für $1{,}0\,\mu g$ (Haftgrenze) und $0{,}8\,\mu g$ (Grip-Grenze).
- **Farbkodierte Telemetrie:** Scatter-Punkte für Längsbeschleunigung $a_x$ und Querbeschleunigung $a_y$.
- **Fahrzustände:** Vollbremsung, Trail-Braking in Kurve, Apex und Drift-Peak.
- **Aspektverhältnis:** `Plot.Axes.SquareUnits()` für 1:1-Geometrie.

</div>
<div class="three">

![](./Illustrationen/ScottPlot_KammscherKreis_Example.png)

</div>
</div>

---

### Stoßdämpfer: Modellierung in der Phasenebene

<div class="columns">
<div class="two">

Dynamik eines gedämpften Fahrwerks-Federbeins ($m, d, c$):

- **Kräftebilanz am Rad nach einer Bodenwelle:**
  $$m \ddot{x} + d \dot{x} + c x = 0 \iff \ddot{x} = -\frac{c}{m} x - \frac{d}{m} \dot{x}$$
  - Federkraft $F_c = -c \cdot x$ zieht zur Ruhelage zurück.
  - Dämpferkraft $F_d = -d \cdot \dot{x}$ bremst die Bewegung hydraulisch.
- **Zustandsraum $(x_1, x_2)$:**
  - $x_1 = x$: Federweg / Auslenkung der Radmasse.
  - $x_2 = \dot{x}$: Einfeder- bzw. Ausfedergeschwindigkeit.
- **Gekoppeltes System 1. Ordnung:**
  - Tangentenvektor: $\dot{\vec{x}} = [x_2, -\frac{c}{m} x_1 - \frac{d}{m} x_2]^T = f(\vec{x})$.

</div>
<div class="one">

![](./Diagramme/Mini_DGL_Phasenebene.svg)

</div>
</div>

---

### Richtungsfeld: Strömungskarte des Feder-Dämpfers

<div class="columns">
<div class="two">

Schwingungsanalyse der Systemdynamik $\mathrm{d}\vec{x}/\mathrm{d}t = f(\vec{x})$:

- **Vektorfeld vor der Simulation:**
  - An jedem Gitterpunkt $(x_1, x_2)$ zeigt der Pfeil, wohin Feder- und Dämpferkräfte das Rad im nächsten Augenblick treiben.
- **Physikalische Kräfteorientierung:**
  - Bei $x_2 > 0$ (Ausfedern) zeigt der Pfeil nach rechts ($\dot{x}_1 > 0$).
  - Bei $x_1 > 0$ (gestauchte Feder) zieht die Feder nach unten ($\dot{x}_2 < 0$).
- **Dissipative Strudelsenke:**
  - Dämpfer entzieht kontinuierlich Energie $\to$ Pfeile drehen spiralig ein.
  - Trajektorie $x(t)$ läuft in die stabile Ruhelage $(0, 0)$ ein.

</div>
<div class="one">

![](./Diagramme/Mini_VectorField_Phasenraum.svg)

</div>
</div>

---

### ScottPlot 5 API: Richtungsfeld mit `VectorField`

<div class="columns">
<div class="two">

C#-Architektur zur Erzeugung des Stoßdämpfer-Richtungsfeldes:

- **Gitterpunkte:** Schleifen über `x1` (Weg) und `x2` (Geschwindigkeit) spannen die Phasenebene auf.
- **Ableitungsvektoren:** `dx1 = x2` und `dx2 = -x1 - 0.3 * x2` mit Vektorlänge `len`.
- **Y-Invertierung:** SkiaSharp nutzt ein Bildschirmkoordinatensystem ($+y$ nach unten); Vektor `dir` wird daher mit `-dx2` übergeben.
- **Überlagerung:** `Plot.Add.VectorField(vectors)` visualisiert das Gitter im Diagrammhintergrund.

</div>
<div class="two">

```csharp
var vectors = new List<RootedCoordinateVector>();
for (double x1 = -3; x1 <= 3; x1 += 0.4) {
  for (double x2 = -3; x2 <= 3; x2 += 0.4) {
    double dx1 = x2;
    double dx2 = -x1 - 0.3 * x2;
    double len = Math.Sqrt(dx1*dx1 + dx2*dx2);
    var dir = new Vector2(
      (float)(dx1 / len * 0.22),
      (float)(-dx2 / len * 0.22));
    vectors.Add(new RootedCoordinateVector(
      new Coordinates(x1, x2), dir));
  }
}
plot.Add.VectorField(vectors);
```

</div>
</div>

---

### Anwendungsbeispiel: Stoßdämpfer-Ausschwingen

<div class="columns">
<div class="two">

Ausschwingen der Radmasse nach einer Bodenwelle mit ScottPlot 5:

- **Richtungsvektoren:** Reguläres Gitter von Vektoren für Zustände $x_1$ (Auslenkung) und $x_2$ (Geschwindigkeit).
- **Trajektorie:** Start bei Auslenkung $x_1 = 2{,}5\,\text{m}$ ($x_2 = 0\,\text{m/s}$); Einlaufen in den Ruhezustand $(0, 0)$.
- **Energiedissipation:** Dämpfer ($d = 0{,}3$) verringert die Schwingungsamplitude mit jedem Umlauf.

</div>
<div class="three">

![](./Illustrationen/ScottPlot_VectorField_Example.png)

</div>
</div>

---

### Methodenvergleich der Plot-Typen

| Merkmal | `Scatter(xs, ys)` | `Signal(ys)` | `SignalXY(xs, ys)` |
|---|---|---|---|
| **Abtastung** | Beliebig (ungeordnet) | **Streng äquidistant** ($\Delta t = \text{const}$) | Monoton steigend |
| **Speicher** | $2 \times N$ ($xs$ und $ys$) | **$1 \times N$** ($ys$ genügt) | $2 \times N$ ($xs$ und $ys$) |
| **Suchaufwand** | $O(N)$ (jeder Punkt) | **$O(1)$** (direkter Index) | $O(\log N)$ (Binärsuche) |
| **Max. Punkte** | $\approx 10^4$ flüssig | **$> 10^7$ flüssig (60 FPS)** | $\approx 10^6$ flüssig |
| **Typischer Einsatz** | Phasenraum, Kennfelder | Feste Schritte (Euler, Heun) | Adaptive Solver (RK45) |

```csharp
var sig = WpfPlot1.Plot.Add.Signal(ys);
sig.Data.Period = 0.001; // dt = 1 ms (1 kHz Abtastrate)
sig.Data.XOffset = 0.0;   // Startzeit t0 = 0 s
```

---

<!-- Platzhalter für Abschnittsbildbeschreibung -->

![bg right](./Illustrationen/Abschnitt_3.jpg)

## 4.3: Statistische Auswertung & Histogramme mit ScottPlot

Dieser Abschnitt umfasst die folgenden Inhalte:

- Stochastische Signale und Rauschprozesse in Simulationssystemen
- Das Binning-Dilemma: Wahl der optimalen Klassenbreite
- Häufigkeitsverteilung vs. normierte Wahrscheinlichkeitsdichte (PDF)
- Überlagerung theoretischer Normalverteilungen
- Robuste Kennwerte und Box-Plot-Analyse

---

### Statistische Analysen in Simulationssystemen

- Wann werden Histogramme und statistische Diagramme benötigt?
  - **Monte-Carlo-Simulationen:** Analyse von Fertigungstoleranzen, Bauteilstreuungen oder Risikoszenarien über tausende Durchläufe.
  - **Diskrete Ereignissimulationen:** Verteilung von Wartezeiten in Warteschlangen, Durchlaufzeiten und Pufferfüllständen.
  - **Sensormodelle:** Rauschverteilungen (Gaußsches weißes Rauschen, Messunsicherheiten) und Signal-Rausch-Verhältnisse.
- **Ziele der Visualisierung:**
  - Identifikation von Verteilungsformen (Normalverteilung, Exponentialverteilung, Schiefe, Bimodalität).
  - Statistische Validierung numerischer Modelle gegen empirische Messdaten.
  - Erkennung von Fertigungsausreißern und Kavitationserscheinungen.

---

### Das Binning-Dilemma: Wahl der Klassenbreite $h$

<div class="columns">
<div class="two">

Beim Erstellen eines Histogramms teilt man den Wertebereich $[x_{\min}, x_{\max}]$ in $k$ Intervalle (Bins) der Breite $h$ ein:

- **Zu breite Bins ($k$ zu klein):**
  - Starke Überglättung – Verteilungsasymmetrie und Peaks werden unsichtbar.
- **Zu schmale Bins ($k$ zu groß):**
  - Starke Unterglättung – Histogramm zerfällt in unruhiges statistisches Rauschen.
- **Freedman-Diaconis-Kriterium:**
  - Optimale Klassenbreite balanciert Auflösung und statistisches Rauschen über $h = 2 \cdot \text{IQR} / \sqrt[3]{N}$ bei $N$ Messpunkten.

</div>
<div class="one">

![](./Diagramme/Mini_Binning_Vergleich.svg)

</div>
</div>

---

### Freedman-Diaconis-Regel & Interquartilsabstand (IQR)

<div class="columns">
<div class="two">

Robuste Berechnung der Klassenbreite $h$ für Simulationsdaten:

- **Freedman-Diaconis-Formel:**
  - $h = 2 \cdot \text{IQR} / \sqrt[3]{N}$ mit $k = \lceil (x_{\max} - x_{\min}) / h \rceil$.
- **Interquartilsabstand ($\text{IQR}$):**
  - Aufteilung der sortierten Daten in Quartile: $Q_1$ (25 %) und $Q_3$ (75 %).
  - $\text{IQR} = Q_3 - Q_1$: Spannweite der zentralen 50 % aller Messwerte.
- **Vorteil gegenüber Standardabweichung $\sigma$:**
  - Scott's Rule ($h \sim \sigma$) wird durch seltene Ausreißer stark verzerrt.
  - $\text{IQR}$ besitzt hohen Bruchpunkt: Rand-Ausreißer ändern $\text{IQR}$ nicht.

</div>
<div class="one">

![](./Diagramme/Mini_IQR_Verteilung.svg)

</div>
</div>

---

### ScottPlot 5 API: **Histogramme und Bins**

```csharp
// 1. Rohdaten & Histogramm berechnen (20 Bins in [0..10 s])
double[] durations = Simulation.RunMonteCarloRuns(10000);
var hist = ScottPlot.Statistics.Histogram.WithBinCount(20, 0, 10);
hist.AddRange(durations);

// 2. Balkendiagramm (ScottPlot 5 Bars) aus Klassen erzeugen
var bars = hist.Bins.Zip(hist.Counts, (pos, cnt) => new ScottPlot.Bar {
    Position = pos, Value = cnt, Size = hist.FirstBinSize * 0.85,
    FillColor = ScottPlot.Colors.SteelBlue.WithAlpha(0.7f),
    LineColor = ScottPlot.Colors.SteelBlue, LineWidth = 1.2f
}).ToList();
WpfPlot1.Plot.Add.Bars(bars);

// 3. Achsen und Layout konfigurieren
WpfPlot1.Plot.XLabel("Verweildauer [s]");
WpfPlot1.Plot.YLabel("Absolute Häufigkeit");
WpfPlot1.Plot.Axes.AutoScale();
WpfPlot1.Refresh();
```

- Berechnung des Histogramms `hist` über `durations` und Darstellung als Balkenliste `bars`.

---

### Flächennormierung zur Wahrscheinlichkeitsdichte (PDF)

<div class="columns">
<div class="two">

Ein Histogramm liefert absolute Klassenhäufigkeiten $H_k \in \mathbb{N}_0$.

- **Warum ist Flächennormierung nötig?**
  - Absolute Werte $H_k$ hängen vom Stichprobenumfang $N$ ab.
  - Eine theoretische Dichte $f(x)$ hat stets Fläche $\int_{-\infty}^\infty f(x)\,\mathrm{d}x = 1$.
- **Empirische Dichte $f_k$:**
  $$f_k = \frac{H_k}{N \cdot h} \quad \implies \quad \sum_{k=1}^m f_k \cdot h = 1$$
- **Analytische Gauß-Kurve $\mathcal{N}(\mu, \sigma^2)$:**
  $$f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left(-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2\right)$$

</div>
<div class="one">

![](./Diagramme/Mini_PDF_Flaechennormierung.svg)

</div>
</div>

---

### Anwendungsbeispiel: Histogramm & Normalverteilung

<div class="columns">
<div class="two">

Konkrete Monte-Carlo-Toleranzanalyse über $N = 10.000$ Simulationsdurchläufe:

- **Klasseneinteilung:** Absolute Häufigkeiten $H_k$ der Bauteillänge über 24 Bins der Breite $h$.
- **Analytische Kurve:** Überlagerte Gauß-Dichtefunktion $\mathcal{N}(\mu, \sigma^2)$ mit Mittelwert $\mu = 100\,\text{mm}$ und Standardabweichung $\sigma = 4{,}5\,\text{mm}$.
- Bestätigt die korrekte stochastische Modellierung des Fertigungsprozesses.

</div>
<div class="three">

![](./Illustrationen/ScottPlot_Histogram_Example.png)

</div>
</div>

---

### Nicht-parametrische Kennwerte & Box-Plot-Anatomie

<div class="columns">
<div class="two">

Wenn Messdaten nicht gaußverteilt sind oder starke Ausreißer enthalten, sind Mittelwert und Varianz irreführend.

- **Fünf-Punkte-Zusammenfassung:**
  - **Median ($Q_2$):** Robuster Lageparameter (50 % der Daten kleiner/größer).
  - **Unteres Quartil ($Q_1$):** 25. Perzentil.
  - **Oberes Quartil ($Q_3$):** 75. Perzentil.
  - **Interquartilsabstand ($\text{IQR}$):** $\text{IQR} = Q_3 - Q_1$ (mittlere 50 %).
- **Whisker-Definition nach John Tukey:**
  - Reichen bis zum extremsten Messwert innerhalb von maximal $1{,}5 \times \text{IQR}$ ab Box-Rand.
  - Werte außerhalb gelten als statistische Ausreißer!

</div>
<div class="one">

![](./Diagramme/Mini_Boxplot_Anatomie.svg)

</div>
</div>

---

### Verteilungsvergleiche mit Box-Plots in ScottPlot 5

```csharp
// Definition zweier Boxen (box1 und box2) mit Q_1, Q_2, Q_3
var box1 = new ScottPlot.Box {
    Position = 1,
    BoxMiddle = 2.4, // Median Q_2
    BoxMin = 1.8,    // Unteres Quartil Q_1
    BoxMax = 3.1,    // Oberes Quartil Q_3
    WhiskerMin = 1.2,
    WhiskerMax = 3.8
};
var box2 = new ScottPlot.Box {
    Position = 2,
    BoxMiddle = 3.8, // Median Q_2
    BoxMin = 2.9,    // Unteres Quartil Q_1
    BoxMax = 4.6,    // Oberes Quartil Q_3
    WhiskerMin = 2.1,
    WhiskerMax = 5.2
};
WpfPlot1.Plot.Add.Box(new[] { box1, box2 });
```

- Die Objekte `box1` und `box2` visualisieren Quartile `BoxMin` ($Q_1$), `BoxMax` ($Q_3$) und den Median `BoxMiddle` ($Q_2$).

---

### Anwendungsbeispiel: Gütevergleich mit Box-Plots

<div class="columns">
<div class="two">

Konkreter Vergleich dreier Regelungsstrategien (P-, PI- und PID-Regler):

- Statistische Verteilung der Einschwingzeit $t_s$ unter zufälligen Laststörungen.
- **Median ($Q_2$):** PID-Regler schwingt viermal schneller ein als der reine P-Regler.
- **Quartile & Whisker:** Quartile $Q_1$, $Q_3$ und Whisker belegen die drastisch reduzierte Streubreite des PID-Ansatzes.

</div>
<div class="three">

![](./Illustrationen/ScottPlot_BoxPlot_Example.png)

</div>
</div>

---

### Parameterstudien mit gruppierten Balken

<div class="columns">
<div class="two">

Bei Simulationsvergleichen werden Kennzahlen verschiedener Modellvarianten gegenübergestellt:

- **Szenarienvergleich:** `Modell A` (Baseline) vs. `Modell B` (Optimiert).
- **Positions-Arithmetik in ScottPlot 5:**
  - Jeder Balken besitzt `Position`, `Value` und eine `Breite`.
  - Bei mehreren Balken pro Gruppe wird die Position um einen `Offset` verschoben: $\text{Offset} = \text{Position} + k \cdot \text{Breite}$.
  - Zwischen den Gruppen sorgt ein `Gruppenabstand` für klare visuelle Trennung.
  - Ideal für Monte-Carlo-Vergleiche, Taktzeiten und Energiebedarf.

</div>
<div class="one">

![](./Diagramme/Mini_Gruppierte_Bars.svg)

</div>
</div>

---

### Anwendungsbeispiel: Gruppierte Balken in ScottPlot 5

<div class="columns">
<div class="two">

Konkreter Variantenvergleich zweier Modellkonfigurationen über vier Laststufen:

- Gegenüberstellung von `Modell A` (Baseline) und `Modell B` (Optimiert, -23 %).
- Die Gruppen gliedern sich in *Leerlauf*, *Teillast*, *Nennlast* und *Überlast*.
- Jeder Balken nutzt `Position` und einen `Offset` mit definierter `Breite`.
- Direkter visueller Nachweis von Energieeinsparungen für Simulationsberichte.

</div>
<div class="three">

![](./Illustrationen/ScottPlot_Bars_Example.png)

</div>
</div>

---

### Ortsdiskrete 2D-Zustände mit `Heatmap` & `ColorBar`

<div class="columns">
<div class="two">

Ortsdiskrete Modelle (wie das FDM-Temperaturfeld aus Termin 02) erzeugen 2D-Matrizen $T[i,j]$ vom Typ `double[,]`:

- **Keine $N \times M$ UI-Rechtecke:** Ein WPF-`Canvas` bricht bei $250.000$ Elementen zusammen.
- **ScottPlot-Pipeline mit `Plot.Add.Heatmap(matrix)`:**
  - Normierung der Matrixwerte zwischen $T_{\min}$, $T_{\text{mid}}$ und $T_{\max}$.
  - Lookup in einer `Colormap` liefert den `ARGB`-Farbwert.
  - Upload als SkiaSharp-Bitmap-Textur; GPU-Skalierung in $O(1)$!
  - `Plot.Add.ColorBar(heatmap)` bindet die Skala als Legende an.

</div>
<div class="one">

![](./Diagramme/Mini_Heatmap_Colorbar.svg)

</div>
</div>

---

### Anwendungsbeispiel: 2D-Temperaturfeld mit `Heatmap`

<div class="columns">
<div class="two">

Konkrete Darstellung des 2D-Temperaturfelds $T[i,j]$ (FDM aus Termin 02):

- **Matrix:** $50 \times 50$ Gitterpunkte mit Hotspot und Randkühlung.
- **`Turbo`-Colormap:** Farbübergang von Blau über Gelb nach Rot.
- **`ColorBar`:** Bindet die Temperaturskala in $[^\circ\text{C}]$ als Legende an.
- Schnelles GPU-Rendering in SkiaSharp garantiert flüssigen Betrieb.

</div>
<div class="three">

![](./Illustrationen/ScottPlot_Heatmap_Example.png)

</div>
</div>

---

<!-- Platzhalter für Abschnittsbildbeschreibung -->

![bg right](./Illustrationen/Abschnitt_4.jpg)

## 4.4: Live-Streaming & Telemetrie

Dieser Abschnitt umfasst die folgenden Inhalte:

- Herausforderungen bei kontinuierlichen Simulationsdatenströmen
- .NET CLR Garbage Collection und die 0-Byte-Allokationsregel
- Der Ringpuffer (Circular Buffer) mit Modulo-Arithmetik
- Multi-Rate-Entkopplung: 1 kHz Simulation vs. 50 Hz UI-Refresh
- Subtraktionsauslöschung und der Welford-Algorithmus (1962)
- Dynamische $\pm 3\sigma$-Toleranzbänder in ScottPlot 5

---

### Herausforderungen im Live-Streaming

Ein Digitaler Zwilling oder eine Hardware-in-the-Loop-Simulation liefert kontinuierliche Messwerte (z.B. mit $1.000\,\text{Hz}$).

- **Typische Fallstricke naiver Implementierungen:**
  - `List<double>.Add()` wächst unbegrenzt $\rightarrow$ Speicherüberlauf (Out-of-Memory) nach längerer Laufzeit.
  - Dynamisches Resizing von Listen erzeugt kontinuierlich Heap-Allokationen und führt zu spürbarem Ruckeln (GC-Pauses).
  - Ein direkter Aufruf von `WpfPlot.Refresh()` in jedem Simulationsschritt überlastet den UI-Thread und blockiert die Simulation.
- **Architektonische Lösung:**
  1. **Ringpuffer mit fester Kapazität:** Konstante Speichernutzung, null Allokationen während der Simulation.
  2. **Taktentkopplung:** Schneller Simulations-Thread (z.B. 1 kHz) schreibt in den Puffer; UI-Thread aktualisiert das Display mit schonenden 30–60 FPS.

---

### CLR Garbage Collection & Zero-Allocation

<div class="columns">
<div class="two">

Die .NET Common Language Runtime (CLR) teilt den Managed Heap in Generationen ein:

- **Generation 0:** Kurzlebige Objekte (`new`). Läuft schnell voll $\implies$ löst häufige Kollektionen aus.
- **Stop-the-World Pausen:** Während der GC angehalten wird, stockt der UI-Thread $\implies$ sichtbare Mikroruckler (GC-Jitter).
- **Die Zero-Allocation-Regel:**
  - Im 50-Hz-Render-Loop gilt strikt: **0 Byte Allokation pro Frame**!
  - Keine `new SolidColorBrush()`, keine temporären Listen!
  - Einmalige Allokation beim Start und Aufruf von `brush.Freeze()`.

</div>
<div class="one">

![](./Diagramme/Mini_GC_Generationen.svg)

</div>
</div>

---

### Das Ringpuffer-Muster (Circular Buffer)

<div class="columns">
<div class="two">

Ein Ringpuffer speichert die jüngsten $N$ Messwerte in einem vorallokierten Array fester Kapazität `cap`:

- **Schreibzeiger `head`:** Zeigt auf den nächsten freien Index.
- **Modulo-Wrap-Around:**
  $$\text{head} = (\text{head} + 1) \bmod \text{cap}$$
  - Älteste Werte werden automatisch überschrieben.
  - $O(1)$ Zeitaufwand, **0 Byte GC-Allokation** beim Einfügen von `val`!
- **Snapshot für Rendering:**
  - Via `Array.Copy(_data, dest, cap)` werden Daten blitzschnell in den Zielpuffer `dest` kopiert.

</div>
<div class="one">

![](./Diagramme/Mini_Ringpuffer_Modulo.svg)

</div>
</div>

---

### Ringpuffer: C#-Implementierung

```csharp
public class SimulationRingBuffer(int cap)
{
    private readonly double[] _data = new double[cap];
    private int _head;
    private readonly object _lock = new();

    public void Enqueue(double val)
    {
        lock (_lock) { _data[_head] = val; _head = (_head + 1) % _data.Length; }
    }

    public void CopyTo(double[] dest)
    {
        lock (_lock) { Array.Copy(_data, dest, _data.Length); }
    }
}
```

- Der Puffer mit Kapazität `cap` speichert den Messwert `val` und kopiert in `dest`.

---

### Taktentkopplung (Multi-Rate-Architektur)

<div class="columns">
<div class="two">

Warum darf die Simulation das UI nicht direkt im eigenen Takt aktualisieren?

- **Mess-/Simulationstakt (1.000 Hz):**
  - Schneller Solver oder DAQ-Kanal (Schrittweite `dt = 1 ms`).
  - Schreibt Messwerte in den thread-sicheren Ringpuffer.
- **UI-Display-Takt (50 Hz / 20 ms):**
  - Das menschliche Auge kann mehr als 60 FPS kaum auflösen.
  - Ein `DispatcherTimer` holt mit 50 Hz einen Snapshot aus dem Puffer und ruft `WpfPlot.Refresh()` auf.
  - **Vorteil:** UI-Message-Queue bleibt frei und reaktionsschnell!

</div>
<div class="one">

![](./Diagramme/Mini_MultiRate_Entkopplung.svg)

</div>
</div>

---

### UI-Refresh mit `DispatcherTimer` & `DataStreamer`

```csharp
private DataStreamer _streamer;
private HorizontalLine _meanLine, _upperLine;

private void InitPlot()
{
    _streamer = WpfPlot1.Plot.Add.DataStreamer(500);
    _streamer.ViewScrollLeft(); // Oszilloskop-Band
    _meanLine = WpfPlot1.Plot.Add.HorizontalLine(100);
    _upperLine = WpfPlot1.Plot.Add.HorizontalLine(115);
}

private void OnTelemetryTick(object? s, EventArgs e)
{
    double y = ReadNextSensorSample();
    _streamer.Add(y);           // 0 B Allokation
    _welford.Add(y);            // O(1) Online-Statistik
    _meanLine.Y = _welford.Mean; _upperLine.Y = _welford.Mean + 3 * _welford.StdDev;
    WpfPlot1.Refresh();
}
```

- Handler-Parameter `s` und `e` für den Timer; Linien `_meanLine` und `_upperLine` führen Toleranzen nach.

---

### Das Problem der naiven Varianzberechnung

<div class="columns">
<div class="two">

Die klassische Lehrbuchformel für die Stichprobenvarianz lautet:

$$s^2 = \frac{1}{k-1} \left( \sum_{i=1}^k x_i^2 - \frac{1}{k} \left(\sum_{i=1}^k x_i\right)^2 \right)$$

- **Katastrophale Subtraktionsauslöschung:**
  - Bei Telemetriedaten mit großem Offset (z.B. $x_i \approx 10^7$) und kleinem Rauschen subtrahiert man zwei fast identische Riesenzahlen.
  - IEEE 754 Gleitkommazahlen verlieren dabei alle signifikanten Mantissenbits!
  - Durch Rundungsfehler wird die Differenz oft negativ $\implies s^2 < 0 \implies \sqrt{s^2} = \text{NaN}$!

</div>
<div class="one">

![](./Diagramme/Mini_Ausloeschung_IEEE754.svg)

</div>
</div>

---

### Welford-Algorithmus: Rekursiver Mittelwert

<div class="columns">
<div class="two">

Numerisch stabile Online-Mittelwertbildung nach B. P. Welford (1962):

- **Problem klassischer Summation:**
  - Speicherung aller Daten nötig oder Überlauf bei $k \to \infty$.
- **Welford-Mittelwert-Rekursion:**
  - Abweichung vor dem Update: $\delta_k = x_k - \bar{x}_{k-1}$.
  - Neuer Mittelwert: $\bar{x}_k = \bar{x}_{k-1} + \frac{\delta_k}{k}$.
- **Intuition:**
  - Neuer Mittelwert $\bar{x}_k$ korrigiert alten Mittelwert $\bar{x}_{k-1}$ um $\frac{1}{k}$ der Abweichung $\delta_k$.
- **Effizienz:** Exakt eine Division pro Zeitschritt ($O(1)$ Zeit & Speicher).

</div>
<div class="one">

![](./Diagramme/Mini_Welford_Schritt.svg)

</div>
</div>

---

### Welford-Algorithmus: Rekursive Varianzberechnung

<div class="columns">
<div class="two">

Numerisch auslöschungsfreie Online-Berechnung der Streuung:

- **Rekursionsschritt für Quadratsumme $M_{2,k}$:**
  - Abweichung vor dem Update: $\delta_k = x_k - \bar{x}_{k-1}$.
  - Abweichung nach dem Update: $\delta_k^* = x_k - \bar{x}_k$.
  - Rekursionsformel: $M_{2,k} = M_{2,k-1} + \delta_k \cdot \delta_k^*$.
- **Stichprobenvarianz $s_k^2$ & Standardabweichung $\sigma_k$:**
  - $s_k^2 = M_{2,k} / (k - 1)$ und $\sigma_k = \sqrt{s_k^2}$.
- **Garantierte numerische Stabilität:**
  - Da $\delta_k^* = \frac{k-1}{k}\delta_k$, ist das Produkt stets $\delta_k \cdot \delta_k^* \ge 0$.
  - Kein Vorzeichenwechsel $\implies s_k^2 \ge 0$, absolut kein $\text{NaN}$!

</div>
<div class="one">

![](./Diagramme/Mini_Welford_M2.svg)

</div>
</div>

---

### Welford-Statistik: C#-Implementierung

```csharp
public class WelfordStatistics
{
    public long Count { get; private set; }
    public double Mean { get; private set; }
    public double M2 { get; private set; }
    public double Variance => Count > 1 ? M2 / (Count - 1) : 0.0;
    public double StdDev => Math.Sqrt(Variance);

    public void Add(double x)
    {
        Count++;
        double delta = x - Mean;
        Mean += delta / Count;
        double deltaStar = x - Mean;
        M2 += delta * deltaStar;
    }
}
```

- Die Eigenschaften `Mean`, `M2`, `Variance` und `StdDev` werden über die Differenzen `delta` und `deltaStar` fortlaufend aktualisiert.

---

### Dynamische 3-Sigma-Toleranzbänder

<div class="columns">
<div class="two">

Kontinuierliche Toleranzbänder für stationäre Arbeitsprozesse:

- **Stationärer Arbeitspunkt:**
  - Für Messungen um ein Sollniveau (z.B. Solldruck $100\,\text{bar}$).
  - `_meanLine.Y = _welford.Mean`: Horizontaler Mittelwert $\bar{x}$ und Schranke `_upperLine.Y` ($\bar{x} + 3\sigma$) schwingen online ein und folgen Lastsprüngen adaptiv.
- **Drei-Sigma-Regel (Gauß-Verteilung):**
  - $\bar{x} \pm 1\sigma$: Enthält 68,27 % aller Messwerte.
  - $\bar{x} \pm 2\sigma$: Enthält 95,45 % aller Messwerte.
  - $\bar{x} \pm 3\sigma$: Enthält **99,73 %** aller regulären Messwerte.
- **Anomalie-Erkennung:**
  - Verlässt ein Messwert das Band ($y(t) > \bar{x} + 3\sigma$), liegt ein Fehler vor (z.B. Kavitation, Druckstoß oder Lagerschaden).

</div>
<div class="one">

![](./Diagramme/Mini_Drei_Sigma_Band.svg)

</div>
</div>

---

### Schattierte Toleranzkorridore mit `FillY`

<div class="columns">
<div class="two">

Toleranzbänder für zeitabhängige Führungsgrößen $\mu(t)$ (z.B. Zylinderhub):

- **Soll-Trajektorie & feste Toleranz:**
  - $\mu(t)$: Vorgegebener Nennverlauf; Gutbereich $y_{\text{upper}}(t)$ / $y_{\text{lower}}(t)$ über $\mu(t) \pm 3\sigma$.
  - Feste horizontale Linien versagen hier, da das Band mitwandern muss.
- **Polygon-Rendering mit `Plot.Add.FillY`:**
  - Erzeugt geschlossenen `SKPath`: Vorwärts entlang $y_{\text{upper}}$, rückwärts entlang $y_{\text{lower}}$.
  - Halbtransparentes Alpha-Blending hebt Abweichungen hervor, ohne $\mu(t)$ zu verdecken.

</div>
<div class="one">

![](./Diagramme/Mini_FillY_Toleranzkorridor.svg)

</div>
</div>

---

### Anwendungsbeispiel: `FillY` im Live-Monitoring

<div class="columns">
<div class="two">

Konkrete Telemetrie-Visualisierung eines Drucksignals mit ScottPlot 5:

- **Führungsgröße:** Vorgegebene Sollkurve $\mu(t)$ aus dem Prozessmodell.
- **Feste Toleranzgrenzen:** Gutbereich zwischen $y_{\text{lower}}$ und $y_{\text{upper}}$ ($\mu(t) \pm 3\sigma$).
- **Anomalie-Erkennung:** Druckstoß bei $t \approx 1{,}38\,\text{s}$ durchbricht $y_{\text{upper}}$ (Alarm).
- Dank Alpha-Blending bleibt der Verlauf von $\mu(t)$ stets erkennbar.

</div>
<div class="three">

![](./Illustrationen/ScottPlot_FillY_Example.png)

</div>
</div>

---

<!-- Platzhalter für Abschnittsbildbeschreibung -->

![bg right](./Illustrationen/Abschnitt_5.jpg)

## 4.5: Topologie- und Netzwerkgraphen mit MSAGL

Dieser Abschnitt umfasst die folgenden Inhalte:

- Mathematisches Graphenmodell für Simulationssysteme
- Das Microsoft Automatic Graph Layout (`MSAGL`)
- Hierarchisches Sugiyama-Layout für kausale Signalflüsse
- Organisches Force-Directed Layout (Partikelsimulation)
- MSAGL API: Graphaufbau, Styling & WPF-Integration

---

### Mathematische Modellierung von Modelltopologien

In modernen Blockdiagramm- und Multi-Domain-Simulatoren (Simulink, Modelica, Simscape) wird das Gesamtsystem als gerichteter Graph abgebildet:

$$G = (V, E)$$

- **Knotenmenge $V = \{v_1, \dots, v_n\}$:** Funktionsblöcke (z.B. Integratoren, Kennfelder) oder physikalische Komponenten (Ventil, Zylinder).
  - Eingangsgrad $\deg^-(v_i)$: Anzahl eingehender Signale / Kopplungen
  - Ausgangsgrad $\deg^+(v_i)$: Anzahl erzeugter Ausgangssignale
- **Kantenmenge $E \subseteq V \times V$:** Signal- und Leistungsflüsse $e = (v_i, v_j)$
- **Adjazenzmatrix $\mathbf{A} \in \{0, 1\}^{n \times n}$:**
  $$a_{ij} = \begin{cases} 1, & \text{falls } (v_i, v_j) \in E \text{ (Signal von } v_i \text{ zu } v_j \text{)} \\ 0, & \text{sonst} \end{cases}$$
- **Topologische Ordnung:** Eine Reihenfolge der Knoten, bei der alle gerichteten Kanten von links nach rechts zeigen (nur bei DAGs möglich).

---

### Netzwerktopologien & Automatisches Layout mit MSAGL

- **Herausforderung:** Bei komplexen Systemen mit hunderten Blöcken ist manuelle Platzierung unmöglich und blockiert Modellrefactorings.
- **Lösung:** Microsoft Automatic Graph Layout (`MSAGL`):
  - Berechnet ästhetische, kreuzungsminimierte Layouts vollautomatisch.
  - Unterstützt hierarchische Layering-Verfahren (Sugiyama-Algorithmus) für kausale Signalflüsse (von links nach rechts).
  - Unterstützt Force-Directed-Layouts für physikalische Netzwerkgraphen (ungestrickte Feder-Masse-Modelle).
  - Erlaubt interaktives Zoomen, Panning und Hervorheben kritischer Signalpfade (algebraische Zyklen rot markieren).

---

### MSAGL: Einbindung in WPF

<div class="columns">
<div class="one">

**XAML-Deklaration:**
```xaml
<Window ...
  xmlns:msagl="clr-namespace:
    Microsoft.Msagl.WpfGraphControl;
    assembly=
    Microsoft.Msagl.WpfGraphControl">
  <Grid>
    <msagl:AutomaticGraphLayoutControl 
      x:Name="GraphControl" />
  </Grid>
</Window>
```

</div>
<div class="two">

**C#-Code-Behind:**
```csharp
// 1. Graph-Objekt erstellen
var graph = new Microsoft.Msagl.Drawing.Graph("Sim");

// 2. Knoten hinzufügen
graph.AddNode("Integrator").LabelText = "Integrator";
graph.AddNode("Gain").LabelText = "Gain [k=2.5]";
graph.AddNode("Sum").LabelText = "Sum [+ -]";

// 3. Gerichtete Kanten definieren
graph.AddEdge("Sum", "e(t)", "Integrator");
graph.AddEdge("Integrator", "x(t)", "Gain");
graph.AddEdge("Gain", "Feedback", "Sum");

// 4. Dem Control übergeben
GraphControl.Graph = graph;
```

</div>
</div>

- Die Instanz `graph` modelliert Knoten und Kanten für das WPF-Control `GraphControl`.

---

### Der Sugiyama-Algorithmus (Hierarchisches Layout)

<div class="columns">
<div class="two">

Schichtungs-Layout für kausale Signalflüsse (K. Sugiyama, 1981):

- **Kausale Signalflüsse (von links nach rechts):**
  - Ideal für Blockschaltbilder, Steuerungsabläufe und Regelkreise.
- **Die 4 Phasen der Pipeline:**
  - **1. Cycle Removal:** Feedback-Kanten temporär drehen $\implies$ DAG.
  - **2. Layering:** Knoten Schichten $L_1, L_2, \dots$ zuweisen; Dummy-Knoten einfügen.
  - **3. Crossing Minimization:** Vertauschen minimiert Kantenkreuzungen.
  - **4. Routing:** Pfade begradigen & Splines kollisionsfrei verlegen.

</div>
<div class="one">

![](./Diagramme/Mini_Sugiyama_4Phasen.svg)

</div>
</div>

---

### MSAGL in der Praxis: Hierarchisches Sugiyama-Layout

<div class="columns">
<div class="two">

Vollautomatisch von MSAGL berechneter Regelkreis:

- **Vorwärtspfad:** Von `Sollwert w(t)` über `Summierer`, `PID-Regler`, `Leistungsaktor` zur `Regelstrecke`.
- **Rückführpfad:** Signal `Istwert y(t)` über den `Sensor` zum `Summierer`.
- **Störgröße:** Externe Kopplung von `Störgröße z(t)`.
- Sugiyama minimiert Kantenkreuzungen vollautomatisch.

</div>
<div class="three">

![](./Illustrationen/MSAGL_Sugiyama_Layout.png)

</div>
</div>

---

### Force-Directed Layout (Spring-Embedder)

<div class="columns">
<div class="two">

Für ungerichtete Komponenten-Netzwerke eignet sich das Kräfte-Verfahren:

- **Physikalisches Analogon:**
  - **Hookesche Zugfedern:** $F_s = k \cdot (\|\Delta\vec{p}\| - d_0)$ zwischen Knoten $v_1$ und $v_2$.
  - **Coulomb-Ladungen:** $F_r = \frac{C}{\|\Delta\vec{p}\|^2}$ stoßen alle Knotenpaare ab.
- **Numerische Lösung mit Schrittweitendämpfung:**
  - Knoten wandern iterativ entlang der wirkenden Gesamtkraft.
  - Schrittweitendämpfung verhindert Oszillationen bis $\sum \vec{F}_i \approx \vec{0}$.

</div>
<div class="one">

![](./Diagramme/Mini_ForceDirected_Kraefte.svg)

</div>
</div>

---

### Force-Directed: Iteration 0 (Start & Kräftezerlegung)

<div class="columns">
<div class="two">

- **Zufällige Startverteilung:**
  - Knoten starten ungeordnet; Kanten und Abstände sind stark verzerrt.
- **Kräftezerlegung an jedem Knoten:**
  - **Hookesche Zugfedern $F_s$ (blau):** Ziehen verbundene Nachbarknoten entlang der Kantenlinie an.
  - **Paarweise Coulomb-Abstoßung $F_r$ (rot gestrichelt):** Jedes Knotenpaar stößt sich elektrostatisch ab (bei $N=5$ Knoten existieren $\binom{5}{2} = 10$ Paare bzw. 4 Abstoßungsvektoren pro Knoten).
- **Resultierender Kraftvektor:**
  - Die Vektorsumme $\vec{F}_{\text{net}} = \sum \vec{F}_s + \sum \vec{F}_r$ (grün) bestimmt die anfängliche Bewegungsrichtung jedes Knotens.

</div>
<div class="one">

![](./Diagramme/Mini_ForceDirected_Iter0.svg)

</div>
</div>

---

### Force-Directed: Iteration 2 (Dynamische Entwirrung)

<div class="columns">
<div class="two">

- **Numerischer Zeitschritt (Euler-Verfahren):**
  - Jeder Knoten wandert ein Wegstück entlang seiner wirkenden Gesamtkraft.
- **Reduktion auf Summenvektoren:**
  - Zur Wahrung der Übersicht werden Einzelkräfte ausgeblendet: Nur die **grünen Summenvektoren $\vec{F}_{\text{net}}$** bleiben sichtbar.
- **Erste Entflechtung:**
  - Die Knoten streben entlang des Energiegradienten auseinander; Kanten und Abstände beginnen sich harmonisch auszurichten.

</div>
<div class="one">

![](./Diagramme/Mini_ForceDirected_Iter2.svg)

</div>
</div>

---

### Force-Directed: Iteration 15 (Einschwingen & Dämpfung)

<div class="columns">
<div class="two">

- **Schrittweitendämpfung im Einsatz:**
  - Der Dämpfungsfaktor $T_k$ begrenzt Sprungweiten und dämpft Oszillationen wirksam ab.
- **Gezielte Feinjustierung:**
  - Die Topologie der Knoten ist bereits kreuzungsfrei und weitgehend symmetrisch.
  - Kürzere Summenvektoren $\vec{F}_{\text{net}}$ gleichen Kantenlängen sanft an die Ruhelänge $l_0$ an.
- **Vorbereitung des Gleichgewichts:**
  - Minimale Restkräfte führen das System direkt in das Minimum.

</div>
<div class="one">

![](./Diagramme/Mini_ForceDirected_Iter15.svg)

</div>
</div>

---

### Force-Directed: Iteration 50 (Stationäres Gleichgewicht)

<div class="columns">
<div class="two">

- **Kräftegleichgewicht erreicht:**
  - An allen Knoten heben sich Zug- und Abstoßungskräfte auf:
    $$\vec{F}_{\text{net}} = \sum \vec{F}_s + \sum \vec{F}_r \approx \vec{0}$$
- **Optimales Simulationsergebnis:**
  - Das System ruht im lokalen Minimum der potentiellen Energie.
  - Symmetrisches, harmonisches Layout mit gleichmäßigen Kantenlängen $l_0$ ganz ohne manuelle Platzierung.

</div>
<div class="one">

![](./Diagramme/Mini_ForceDirected_Iter50.svg)

</div>
</div>

---

### MSAGL in der Praxis: Organisches Force-Directed Layout

<div class="columns">
<div class="two">

Netzwerktopologie einer Industrie-4.0-Fertigungszelle:

- **Cluster 1 (CNC-Zelle):** `Gateway-A` bündelt `SPS-CNC`, `Spindel-Sensor`, `Kühlmitteldruck` und `Werkzeug-Kamera`.
- **Cluster 2 (Roboter):** `Gateway-B` bündelt `Roboter-SPS`, `Greifer-Sensorik`, `Gelenk-Drehgeber` und `Sicherheitsradar`.
- **Backbone & Cloud:** `Gateway-A` $\leftrightarrow$ `Gateway-B` und Anbindung an die `Edge-Cloud`.

</div>
<div class="three">

![](./Illustrationen/MSAGL_ForceDirected_Layout.png)

</div>
</div>

---

### MSAGL API: Topologieaufbau & Styling

```csharp
var graph = new Microsoft.Msagl.Drawing.Graph("Fertigungszelle");
// 1. Organisches Layout aktivieren (MDS / Force-Directed)
graph.LayoutAlgorithmSettings = new Microsoft.Msagl.Layout.MDS.MdsLayoutSettings();

// 2. Kanten definieren (Signal- und Sensornetzwerk)
graph.AddEdge("Gateway-A", "SPS-CNC");
graph.AddEdge("Gateway-A", "Spindel-Sensor");
graph.AddEdge("Gateway-A", "Gateway-B");

// 3. Visuelles Styling von Knoten und Kanten
var spsNode = graph.FindNode("SPS-CNC");
spsNode.Attr.FillColor = Microsoft.Msagl.Drawing.Color.LightSkyBlue;
spsNode.Attr.Shape = Microsoft.Msagl.Drawing.Shape.Box;
var linkEdge = graph.AddEdge("Gateway-A", "Edge-Cloud");
linkEdge.Attr.Color = Microsoft.Msagl.Drawing.Color.Purple;

// 4. Im WPF-GraphControl visualisieren
GraphControl.Graph = graph;
```

- Das Objekt `graph` definiert die Netzwerktopologie und weist `spsNode` sowie `linkEdge` visuelle Attribute zu.

---

### Ausblick: Interaktive Node-Editoren

<div class="columns">
<div class="two">

- **MSAGL:**
  - Automatische Generierung, Inspektion und Debugging von Topologien.
  - Berechnet Graphen-Layout statisch oder semi-interaktiv.
- **Moderne Node-Editoren (z.B. Nodify):**
  - Für interaktive Werkzeuge (wie Simulink oder Blueprint-Editoren).
  - Erlauben freies Drag & Drop von Pins, Verbindungen und Blöcken.
- **Kombination:** MSAGL liefert das Initial-Layout, der Editor speichert manuelle Justierungen.

</div>
<div class="two">

| Kriterium | MSAGL | Nodify / Node-Editor |
|---|---|---|
| **Fokus** | Layout & Visualisierung | Interaktive Modellierung |
| **Kantenführung** | Automatisch (Splines) | Bezier-Kurven / Pins |
| **Layout-Berechnung** | Vollautomatisch (Sugiyama/Forces) | Manuell / Interaktiv |
| **Interaktion** | Zoom, Pan, Drag | Wire-Connecting, Edit |

</div>
</div>

---

### Zusammenfassung Kapitel 4

<div class="columns">
<div class="one">

- **Display-Bottleneck & Decimation:**
  - $10^7$ Punkte überfordern UI-Controls; Min/Max-Säulen-Decimation schützt vor Aliasing und garantiert 60 FPS.
- **ScottPlot 5 (`Signal` & `Scatter`):**
  - Äquidistante Abtastung spart 50 % RAM ($O(1)$-Index).
  - Phasenraum-Trajektorien visualisieren Leistungsgrenzen ($P_{\max}$-Hyperbel, Kamm'scher Kreis).
- **Statistische Verteilungen:**
  - Freedman-Diaconis-Binning und Flächennormierung ($f_k = \frac{H_k}{N \cdot h}$) ermöglichen präzisen Gauß-Fit.

</div>
<div class="one">

- **Live-Streaming & Zero-Allocation:**
  - Ringpuffer (`CircularBuffer`) und `Freeze()` verhindern GC-Jitter im 50-Hz-Loop.
  - Welford-Algorithmus verhindert katastrophale Subtraktionsauslöschung und führt $\pm 3\sigma$-Toleranzbänder online nach.
- **MSAGL:**
  - Sugiyama- und Force-Directed-Layouts ordnen komplexe Signalnetze vollautomatisch.
  - Ermöglicht automatische Visualisierung, Styling und Inspektion von Topologien.

</div>
</div>

---

### Laborübung Termin 04: Telemetrie & ScottPlot

Vertiefende Hausübung (Stufe B, 10 Pkt.) – Details siehe [Aufgabenblatt 04](../../Uebungen/Termin_04_Telemetrie_und_ScottPlot/Aufgabenblatt.md):

<div class="columns">
<div class="two">

#### Track A: Industrie & Mechatronik
**Antriebsprüfstand & Schwingungsüberwachung**
- Live-Streamer für Drehzahl $n(t)$ und Moment $M(t)$
- Welford-Algorithmus: $\bar{M} \pm 3\sigma_M$ Toleranzbänder
- Phasenraum-Kennfeld ($M$ vs. $n$) mit $P_{\max}$-Grenze
- Schwingungs-Histogramm mit Gauß-Kurve
- MSAGL-Antriebsstrang mit Sensor-Alarmanzeige

</div>
<div class="two">

#### Track B: Simulation Game
**Retro Arcade Racing HUD & G-Force Telemetrie**
- Live Speed- & RPM-Streamer mit Shift-Flash
- Welford-Statistik für optimale Ausdreh-Drehzahl
- Kamm'scher Kreis (Phasenplot $a_x$ vs. $a_y$ mit Haftungslimit $\mu_{\max} \cdot g$)
- Rundenzeit-Histogramm & Strecken-Topologie (MSAGL)

</div>
</div>

> Performance-Dashboard mit ScottPlot 5 & MSAGL (0 B GC-Druck) – Wahlmodell: Track A oder B.
