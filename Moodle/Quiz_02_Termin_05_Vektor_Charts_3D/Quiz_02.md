# Moodle-Quiz 2 (Zu Beginn von Termin 5): 2D-Vektorgrafik, Telemetrie & Graphenlayout

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (FH Oberösterreich, Campus Wels)  
**Prüfungszeitpunkt:** Zu Beginn von Termin 5 (erste 15 Minuten vor dem Theorie-Impuls zu Kapitel 05)  
**Bearbeitungszeit:** 15 Minuten  
**Säule:** Säule 1 (Theoretische & numerische Grundlagen, Gewicht: 7,5 % der Gesamtnote)  
**Prüfungsmodus:** Präsenz im EDV-Labor / Safe Exam Browser in Moodle  
**Zulässige Hilfsmittel:** Taschenrechner (nicht-programmierbar) oder Windows-Rechner; keine LLM-Nutzung / Closed-Book

---

## Didaktische Zielsetzung & Einbettung

Dieses Quiz überprüft zu Beginn von Termin 05 nach dem Prinzip der strikten Rückwärts-Kausalität ausschließlich den Stoff der vorangegangenen Termine 03 und 04 (Kapitel 03 und 04): die mathematischen und softwaretechnischen Grundlagen der 2D-Vektorgrafik und Koordinatentransformation auf dem WPF `Canvas` sowie das hochfrequente Echtzeit-Datenstreaming mit `ScottPlot 5`, Ringpuffern, Online-Statistik und automatischem Graphenlayout (`MSAGL`).

### Stoffabgrenzung & Tabu-Grenzen (Rückwärts-Kausalität)
* **Geprüfte Inhalte (Termin 03 & 04):** Kapitel 03 (2D-Vektorgrafik auf dem WPF `Canvas` vs. `DrawingVisual`, affine Koordinatentransformation Welt $\leftrightarrow$ Screen, isotrope Viewport-Skalierung $s = \min(s_x, s_y)$, Letterboxing-Offsets, Y-Achsen-Inversion, Hit-Testing, normgerechte DIN-406-Bemaßung und gedrehte Pfeilspitzen im Screen Space), Kapitel 04 (`ScottPlot 5` mit `Signal` vs. `Scatter` und `DataStreamer`, allokationsfreie Ringpuffer `CircularBuffer<double>`, Entkopplung von Messdatenerfassung und UI-Rendering, Welford-Online-Algorithmus für Mittelwert und Varianz $\mu \pm 3\sigma$, `MSAGL` mit `SugiyamaLayoutSettings` vs. `MdsLayoutSettings` / Force-Directed Layout).
* **Strikte Tabu-Grenzen (ab Termin 05+):**
  - ❌ **KEINE** 3D-Computergrafik, OpenGL / SharpGL, homogene $4 \times 4$-Matrizen oder Kugelkoordinaten-Orbitkamera (Kapitel 05 – wird erst nach dem Quiz gelehrt!)
  - ❌ **KEIN** Multithreading / TPL / `Parallel.For` (Kapitel 06)
  - ❌ **KEINE** Steifigkeitsmatrizen $\mathbf{K}$, FEM-Statik oder Cholesky-Zerlegung (Kapitel 07)
  - ❌ **KEINE** kontinuierlichen ODE-Solver wie RK4 oder Heun (Kapitel 08)

---

## Fragenübersicht (8 Fragen / 10,0 Punkte)

| Nr. | Thema | Fragentyp | Bloom-Taxonomie | Punkte |
| :---: | :--- | :--- | :---: | :---: |
| **Q2.1** | Affine 2D-Koordinatentransformation (Welt $\to$ Screen) & Letterboxing | Numerische Berechnung (Freitext `{#...}`) | Anwenden / Berechnen (L3) | 2,0 |
| **Q2.2** | Inverse Transformation (Screen $\to$ Welt) beim Maus-Hit-Testing | Numerische Berechnung (Freitext `{#...}`) | Anwenden / Berechnen (L3) | 1,5 |
| **Q2.3** | Code-Tracing: Allokationsfreier Ringpuffer & Modulo-Wrap-Around | Code-Tracing (Freitext `{#...}`) | Analysieren / Berechnen (L4) | 1,5 |
| **Q2.4** | `ScottPlot 5`: Echtzeit-Streaming, GC-Druck & UI-Entkopplung | Architektur-Diagnose (Single-Choice, 4 Optionen) | Analysieren / Bewerten (L4) | 1,0 |
| **Q2.5** | Normgerechte DIN-406-Bemaßung & Pfeilgeometrie im Screen Space | Mechatronische Visualisierung (Single-Choice, 4 Optionen) | Verstehen / Beurteilen (L3) | 1,0 |
| **Q2.6** | Online-Statistik im Datenstrom: Welford-Algorithmus vs. Naive Varianz | Numerische Analyse (Single-Choice, 4 Optionen) | Analysieren (L4) | 1,0 |
| **Q2.7** | WPF Retaining-Mode (`Canvas`) vs. `DrawingVisual` & Hit-Testing | Vernetztes Wissen (Multiple-Select, 4 Optionen) | Verstehen / Differenzieren (L3) | 1,0 |
| **Q2.8** | `ScottPlot 5` (`Signal` vs. `Scatter`) & `MSAGL` Graphen-Layouts | Vernetztes Wissen (Multiple-Select, 4 Optionen) | Verstehen / Analysieren (L3) | 1,0 |
| **Gesamt** | **3× Numerisch (5,0 P.) + 3× Single-Choice (3,0 P.) + 2× Multiple-Select (2,0 P.)** | | | **10,0 Pkt.** |

---

## Detaillierte Fragen & Musterlösungen

### Frage 2.1: Affine 2D-Koordinatentransformation (Welt $\to$ Screen) & Letterboxing (Numerisch – 2,0 Punkte)

#### Fragetext
Ein ebener Fachwerkträger soll aus dem physikalischen Weltkoordinatensystem (Einheit Meter $[\text{m}]$, $Y$-Achse zeigt nach oben) verzerrungsfrei (isotrop) und mittig zentriert auf ein WPF-Canvas-Element (Bildschirmkoordinaten in Pixeln $[\text{px}]$, $Y$-Achse zeigt nach unten) abgebildet werden.

Gegeben sind folgende Abmessungen:
* Zeichenfläche des WPF-Canvas: Breite $W_{\text{canvas}} = 800\,\text{px}$, Höhe $H_{\text{canvas}} = 600\,\text{px}$
* Physikalische Bounding-Box der Welt: $x_{\min} = 0{,}0\,\text{m}$, $x_{\max} = 10{,}0\,\text{m}$ sowie $y_{\min} = 0{,}0\,\text{m}$, $y_{\max} = 4{,}0\,\text{m}$

Berechnen Sie unter Berücksichtigung der isotropen Skalierung (Uniform Scaling), der vertikalen Zentrierung (Letterboxing) und der Y-Achsen-Invertierung die resultierende **vertikale Bildschirmkoordinate $y_s$ in Pixeln $[\text{px}]$** für einen Knotenpunkt bei der Weltkoordinate **$y_w = 2{,}5\,\text{m}$**.  
*(Geben Sie den Pixelwert als Zahl ohne Einheit ein, z. B. `350.0`)*

#### Antwortwert
* **Musterlösung:** `260.0` (akzeptierter Toleranzbereich: `259.0` bis `261.0`)

#### Mathematische Herleitung & Didaktik
1. Achsenspezifische Skalierungsfaktoren:
   $$s_x = \frac{800\,\text{px}}{10{,}0\,\text{m} - 0{,}0\,\text{m}} = 80{,}0\,\frac{\text{px}}{\text{m}}, \quad s_y = \frac{600\,\text{px}}{4{,}0\,\text{m} - 0{,}0\,\text{m}} = 150{,}0\,\frac{\text{px}}{\text{m}}$$
2. Isotroper Skalierungsfaktor zur Wahrung des Seitenverhältnisses:
   $$s = \min(s_x, s_y) = \min(80{,}0, 150{,}0) = 80{,}0\,\frac{\text{px}}{\text{m}}$$
3. Vertikaler Letterboxing-Offset zur Mittigzentrierung:
   $$\text{offsetY} = \frac{600\,\text{px} - (4{,}0\,\text{m} - 0{,}0\,\text{m}) \cdot 80{,}0\,\frac{\text{px}}{\text{m}}}{2} = \frac{600 - 320}{2} = 140{,}0\,\text{px}$$
4. Bildschirmkoordinate $y_s$ mit Y-Invertierung:
   $$y_s = H_{\text{canvas}} - \left(\text{offsetY} + (y_w - y_{\min}) \cdot s\right) = 600 - (140{,}0 + 2{,}5 \cdot 80{,}0) = 600 - 340{,}0 = 260{,}0\,\text{px}$$

---

### Frage 2.2: Inverse Transformation (Screen $\to$ Welt) beim Maus-Hit-Testing (Numerisch – 1,5 Punkte)

#### Fragetext
In einem interaktiven 2D-CAD-Editor klickt eine Ingenieurin mit der Maus auf ein WPF `Canvas`, um einen neuen Tragwerksknoten zu platzieren. Zu diesem Zeitpunkt gelten folgende Parameter der aktiven Viewport-Transformation:
* Aktueller isotroper Skalierungsfaktor: $s = 50{,}0\,\frac{\text{px}}{\text{m}}$
* Horizontaler Letterboxing-Randabstand links: $\text{offsetX} = 100{,}0\,\text{px}$
* Untere linke Ecke des Weltkoordinatensystems: $x_{\min} = -2{,}0\,\text{m}$

Das Mausklick-Ereignis (`MouseDown`) liefert die horizontale Bildschirmkoordinate **$x_s = 325{,}0\,\text{px}$**.  
Berechnen Sie die zugehörige **physikalische Weltkoordinate $x_w$ in Metern $[\text{m}]$**.  
*(Geben Sie den Zahlenwert in Metern ohne Einheit ein, z. B. `4.2`)*

#### Antwortwert
* **Musterlösung:** `2.5` (akzeptierter Toleranzbereich: `2.45` bis `2.55`)

#### Mathematische Herleitung & Didaktik
Aus der Vorwärtstransformation $x_s = \text{offsetX} + (x_w - x_{\min}) \cdot s$ folgt durch algebraische Umkehrung die Rücktransformation vom Screen Space in den World Space:
$$x_w = x_{\min} + \frac{x_s - \text{offsetX}}{s} = -2{,}0\,\text{m} + \frac{325{,}0\,\text{px} - 100{,}0\,\text{px}}{50{,}0\,\frac{\text{px}}{\text{m}}} = -2{,}0\,\text{m} + \frac{225{,}0}{50{,}0}\,\text{m} = -2{,}0\,\text{m} + 4{,}5\,\text{m} = 2{,}5\,\text{m}$$

---

### Frage 2.3: Code-Tracing: Allokationsfreier Ringpuffer & Modulo-Wrap-Around (Numerisch – 1,5 Punkte)

#### Fragetext
Gegeben sei folgender C#-Codeausschnitt eines allokationsfreien Ringpuffers (`CircularBuffer`) der festen Kapazität `capacity = 4`, in den nacheinander sechs Temperatursensorwerte geschrieben werden:

```csharp
int capacity = 4;
double[] buffer = new double[capacity];
int writeIndex = 0;
double[] incomingSamples = { 10.0, 20.0, 30.0, 40.0, 50.0, 60.0 };

for (int i = 0; i < incomingSamples.Length; i++)
{
    buffer[writeIndex] = incomingSamples[i];
    writeIndex = (writeIndex + 1) % capacity;
}

double result = buffer[1] + buffer[writeIndex];
```

Welchen exakten numerischen Wert hat die Variable `result` nach dem vollständigen Durchlauf der `for`-Schleife?  
*(Geben Sie den Zahlenwert ohne Einheit ein, z. B. `80.0`)*

#### Antwortwert
* **Musterlösung:** `90.0` (akzeptierter Toleranzbereich: `89.9` bis `90.1`)

#### Mathematische Herleitung & Didaktik
Verfolgung der Schreibzugriffe (`capacity = 4`):
* `i = 0` (`10.0`): `buffer[0] = 10.0`, `writeIndex = 1`
* `i = 1` (`20.0`): `buffer[1] = 20.0`, `writeIndex = 2`
* `i = 2` (`30.0`): `buffer[2] = 30.0`, `writeIndex = 3`
* `i = 3` (`40.0`): `buffer[3] = 40.0`, `writeIndex = (3 + 1) % 4 = 0` (Wrap-Around!)
* `i = 4` (`50.0`): `buffer[0] = 50.0`, `writeIndex = 1`
* `i = 5` (`60.0`): `buffer[1] = 60.0`, `writeIndex = 2`

Nach Schleifenende gilt:
* Das Array enthält `buffer = { 50.0, 60.0, 30.0, 40.0 }` und `writeIndex = 2` (zeigt auf das älteste verbliebene Element `30.0`).
* Damit ist `result = buffer[1] + buffer[2] = 60.0 + 30.0 = 90.0`.

---

### Frage 2.4: `ScottPlot 5`: Echtzeit-Streaming, GC-Druck & UI-Entkopplung (Single-Choice – 1,0 Punkte)

#### Fragetext
Ein Entwicklerteam zeichnet die hochfrequente Kraftmessung eines Prüfstands ($1000\,\text{Hz}$ Abtastrate) in `ScottPlot 5` auf:

```csharp
private readonly List<double> _times = new();
private readonly List<double> _forces = new();

public void OnSensorSample(double t, double f)
{
    _times.Add(t);
    _forces.Add(f);
    Application.Current.Dispatcher.Invoke(() =>
    {
        WpfPlot1.Plot.Clear();
        WpfPlot1.Plot.Add.Scatter(_times.ToArray(), _forces.ToArray());
        WpfPlot1.Refresh();
    });
}
```

Bereits nach kurzer Laufzeit ruckelt die Benutzeroberfläche massiv und die CPU-Last steigt auf $100\,\%$. Welche Software-Architektur behebt dieses Problem nachhaltig?

#### Antwortoptionen
* [ ] A) Der synchrone Aufruf `Dispatcher.Invoke` wird auf `DispatcherPriority.Send` hochgestuft und direkt vor `WpfPlot1.Refresh()` wird `GC.Collect()` aufgerufen, damit ungenutzte Array-Kopien sofort aus dem Managed Heap entfernt werden.
* [x] B) Die Datenerfassung schreibt allokationsfrei in einen vorallokierten Ringpuffer fester Größe (bzw. `DataStreamer`), während ein entkoppelter UI-Timer das Neuzeichnen (`Refresh()`) auf eine ergonomische Bildrate von ca. $30\,\text{Hz}$ begrenzt.
* [ ] C) Die beiden `List<double>`-Instanzen werden durch eine `ObservableCollection<double>` ersetzt, da WPF bei Datenbindung an `Scatter`-Plots automatisch ein inkrementelles GPU-Delta-Rendering ohne Neuzeichnen des Gesamtdiagramms aktiviert.
* [ ] D) Das Diagramm wird statt in `ScottPlot 5` direkt auf einem nativen WPF `Canvas` mittels einzelner `Line`-Elemente gezeichnet, weil der Retained-Mode-Szenengraph von WPF bei tausenden Messpunkten pro Sekunde keinen Layout-Overhead erzeugt.

#### Didaktische Begründung
* *Option B ist korrekt:* Bei $1000\,\text{Hz}$ flutet `Dispatcher.Invoke` die WPF-Message-Queue, und `_times.ToArray()` kopiert tausendmal pro Sekunde wachsende Arrays auf dem Heap ($\mathcal{O}(N^2)$ Gesamtallokation). Die Trennung von Erfassung (Ringpuffer) und UI-Refresh ($30\,\text{Hz}$ Timer) eliminiert Heap-Allokationen und UI-Blockaden.

---

### Frage 2.5: Normgerechte DIN-406-Bemaßung & Pfeilgeometrie im Screen Space (Single-Choice – 1,0 Punkte)

#### Fragetext
In einer technischen 2D-CAD-Ansicht auf dem WPF `Canvas` soll die Stablänge eines Fachwerks mit Maßlinie, Maßhilfslinien und Maßpfeilen (Schenkellänge $12\,\text{px}$, Öffnungswinkel $30^\circ$) nach DIN 406 dargestellt werden.

Warum müssen die Eckpunkte der Pfeilspitzen und der Maßlinien-Abstand erst **nach** der Transformation in den **Screen Space (Pixelkoordinaten)** berechnet werden und nicht im physikalischen **World Space (Meter)**?

#### Antwortoptionen
* [x] A) Würden Pfeilspitzen und Schriftabstände in Metern im World Space definiert, skalierten sie bei jedem Mausrad-Zoom proportional mit, sodass sie beim Hineinzoomen das Bauteil riesig überdecken und beim Herauszoomen zu unlesbaren Punkten schrumpfen.
* [ ] B) Im physikalischen World Space führt die bei Bildschirmkoordinaten erforderliche Y-Achsen-Invertierung dazu, dass sich das Vorzeichen des Kreuzprodukts umkehrt und sämtliche Pfeilspitzen nach außen statt zu den Maßhilfslinien zeigen.
* [ ] C) Bei einer anisotropen Skalierung des Viewports würden im Screen Space konstruierte Maßpfeile ihre Winkelhalbierende verlieren, wohingegen eine Konstruktion im World Space die Orthogonalität der Maßhilfslinien auf dem Monitor garantiert.
* [ ] D) Die Grafik-Pipeline von WPF akzeptiert für `Polygon`- und `Polyline`-Elemente ausschließlich ganzzahlige Bildschirm-Pixelkoordinaten, während Fließkomma-Weltkoordinaten im Meter-Maßstab vom Layout-System abgewiesen werden.

#### Didaktische Begründung
* *Option A ist korrekt:* Annotationen (Maßpfeile, Maßhilfslinien-Überstände, Maßzahlen, Gelenksymbole) müssen unabhängig vom aktuellen Zoomfaktor des Bauteils stets eine konstante, ergonomisch lesbare Größe auf dem Bildschirm (z. B. $12\,\text{px}$ Pfeillänge, $25\,\text{px}$ Kettenabstand) aufweisen.

---

### Frage 2.6: Online-Statistik im Datenstrom: Welford-Algorithmus vs. Naive Varianz (Single-Choice – 1,0 Punkte)

#### Fragetext
Zur Echtzeit-Überwachung eines Sensorstroms (Toleranzband $\mu \pm 3\sigma$) sollen der gleitende Mittelwert $\mu_n$ und die Varianz $\sigma_n^2$ fortlaufend in $\mathcal{O}(1)$ pro Messwert aktualisiert werden. Warum wird hierfür in der Systemsimulation der **inkrementelle Algorithmus von Welford** anstelle der algebraischen Ein-Pass-Formel $\sigma^2 = \frac{1}{n}\sum x_i^2 - \left(\frac{1}{n}\sum x_i\right)^2$ eingesetzt?

#### Antwortoptionen
* [ ] A) Die Ein-Pass-Formel über die Quadrate der Messwerte erfordert nach jedem Zeitschritt eine vollständige Sortierung des gesamten historischen Datenpuffers in $\mathcal{O}(n \log n)$, was die Echtzeitfähigkeit bei hohen Abtastraten verletzt.
* [x] B) Wenn die Varianz klein gegenüber einem großen Signal-Offset (Mittelwert) ist, subtrahiert die naive Formel zwei fast identisch große Gleitkommazahlen voneinander, was durch **Auslöschung (Catastrophic Cancellation)** bis hin zu negativen Varianzwerten führt.
* [ ] C) Der Welford-Algorithmus verzichtet vollständig auf Multiplikationen und Divisionen und nutzt ausschließlich bitweise Verschiebeoperationen, wodurch er direkt auf den ganzzahligen Rohdaten eines 16-Bit-A/D-Wandlers arbeitet.
* [ ] D) Die naive Ein-Pass-Formel konvergiert mathematisch nur für streng normalverteilte Zufallsprozesse, während der Welford-Algorithmus durch eine interne Median-Filterung auch bei starken Ausreißern verzerrungsfrei bleibt.

#### Didaktische Begründung
* *Option B ist korrekt:* Hat ein Drucksensor z. B. einen Mittelwert von $10^5\,\text{Pa}$ bei einem Rauschen von $\sigma = 0{,}1\,\text{Pa}$, liegen $\frac{1}{n}\sum x_i^2$ und $\bar{x}^2$ bei ca. $10^{10}$ und stimmen in den ersten 12 signifikanten Dezimalstellen überein. Bei der Subtraktion löschen sich die führenden Stellen aus. Welford summiert hingegen ausschließlich die zentrierten Abweichungen $(x_n - \mu_{n-1}) \cdot (x_n - \mu_n)$ auf und ist numerisch unempfindlich gegen große Offsets.

---

### Frage 2.7: WPF Retaining-Mode (`Canvas`) vs. `DrawingVisual` & Hit-Testing (Multiple-Select – 1,0 Punkte)

#### Fragetext
Beim Entwurf interaktiver 2D-Simulationswerkzeuge in WPF müssen Entwickler zwischen hochstufigen `UIElement`/`Shape`-Objekten auf einem `Canvas` und leichtgewichtigen `DrawingVisual`-Renderings sowie passenden Hit-Testing-Verfahren abwägen. Welche der folgenden Aussagen sind **technisch zutreffend**?  
*(Wählen Sie alle richtigen Aussagen; 2 bis 3 Antworten sind korrekt)*

#### Antwortoptionen
* [x] A) Jedes `Shape`-Objekt (wie `Line` oder `Ellipse`) auf einem WPF `Canvas` ist ein vollwertiges `UIElement` im visuellen Baum mit eigenem Dependency-Property-, Layout- und Event-Overhead, was ab einigen tausend dynamischen Objekten zu starken Frame-Drops führt.
* [x] B) Beim geometrischen Hit-Testing eines Fachwerkstabs im Welt- oder Screen-Raum bestimmt man über die orthogonale Projektion des Mauspunkts auf das Liniensegment (Parameter $t \in [0, 1]$) den kürzesten Normalabstand zum Stabsegment.
* [ ] C) Die Klasse `DrawingVisual` stellt für jedes gezeichnete Geometrie-Primitiv automatisch eigene `MouseEnter`- und `MouseMove`-Routed-Events bereit, benötigt dafür aber doppelt so viel Hauptspeicher wie ein `System.Windows.Shapes.Path`.
* [ ] D) Um beim Anpassen der Fenstergröße ein Verzerrungs-Stretching des Modells zu verhindern, muss der gemeinsame Skalierungsfaktor über `s = Math.Max(scaleX, scaleY)` aus den beiden Achsenmaßstäben gebildet werden.

#### Didaktische Begründung
* *A und B sind korrekt (+50 % je Option).*
* *C ist falsch (-50 %):* `DrawingVisual` ist ein leichtgewichtiges Grafikobjekt ohne eigenen Input-/Layout-Baum und besitzt gerade *keine* eigenen Routed-Events pro Primitiv (Trefferprüfung erfolgt über `VisualTreeHelper.HitTest` oder analytisch).
* *D ist falsch (-50 %):* Bei `Math.Max(scaleX, scaleY)` würde das Modell entlang der kleineren Fensterachse über den Rand hinausragen (Clipping). Für vollständige Sichtbarkeit (Letterboxing) muss zwingend `Math.Min(scaleX, scaleY)` gewählt werden.

---

### Frage 2.8: `ScottPlot 5` (`Signal` vs. `Scatter`) & `MSAGL` Graphen-Layouts (Multiple-Select – 1,0 Punkte)

#### Fragetext
In einem Diagnose-Dashboard werden zeitliche Sensorsignale mit `ScottPlot 5` und Systemtopologien als Knoten-Kanten-Graphen mit `MSAGL` (Microsoft Automatic Graph Layout) visualisiert. Welche der folgenden Aussagen sind **fachlich zutreffend**?  
*(Wählen Sie alle richtigen Aussagen; 2 bis 3 Antworten sind korrekt)*

#### Antwortoptionen
* [x] A) Ein `Signal`-Plot in `ScottPlot 5` setzt konstante Abtastintervalle voraus und kommt ohne eigenes X-Koordinaten-Array aus, was beim Rendern von Millionen Messpunkten schnelles Min/Max-Downsampling pro Pixelspalte ermöglicht.
* [x] B) Der Sugiyama-Algorithmus (`SugiyamaLayoutSettings` in MSAGL) ordnet gerichtete Graphen (z. B. Prozessabläufe oder Zustandsautomaten) in hierarchischen Schichten an und minimiert dabei systematisch die Anzahl der Kantenkreuzungen.
* [ ] C) Für unregelmäßige Ereigniszeitpunkte mit variabler Schrittweite ($\Delta t_k \neq \text{const}$) darf in `ScottPlot 5` ausschließlich der `Signal`-Plot verwendet werden, da der `Scatter`-Plot keine monoton steigenden Zeitachsen darstellen kann.
* [ ] D) Kräftebasierte Layout-Algorithmen (Force-Directed / MDS) modellieren Kanten als abstoßende elektrische Ladungen und unverbundene Knoten als zusammenziehende Zugfedern, damit alle Knoten kompakt im Koordinatenursprung liegen.

#### Didaktische Begründung
* *A und B sind korrekt (+50 % je Option).*
* *C ist falsch (-50 %):* Für nicht-äquidistante Zeitstempel $(t_k, y_k)$ ist `Scatter` (bzw. `DataLogger`) erforderlich, da `Signal` eine feste Abtastperiode `Period` annimmt.
* *D ist falsch (-50 %):* Beim Feder-Einbettungsmodell (Fruchterman-Reingold / Kamada-Kawai) ist die physikalische Analogie genau umgekehrt: Alle Knoten stoßen sich gegenseitig wie gleichnamige elektrische Ladungen ab ($F_{\text{rep}} \propto 1/d^2$), während verbundene Kanten wie elastische Zugfedern wirken, die Nachbarknoten auf eine Ideallänge zusammenziehen.
