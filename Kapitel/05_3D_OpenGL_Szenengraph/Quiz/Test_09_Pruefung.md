# Quiz 02 - Test 09 (Prüfungstest): Canvas-Größenberechnung, Untere 3-Sigma-Grenze & MSAGL-BBox

**Test-ID:** `Test_09_Pruefung`  
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_09_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [Q02_T09_Q1]: Affine 2D-Transformation: Nutzbare Zeichenfläche nach Randabzug und Uniform Scaling *(cloze, 2.0 Pkt.)*

Ein WPF-Canvas besitzt die Gesamtgröße $W_{\text{canvas}} = 700\,\text{px}$ Breite und $H_{\text{canvas}} = 500\,\text{px}$ Höhe. Damit Knotensymbole und DIN-406-Maßzahlen am Rand nicht abgeschnitten werden, wird auf **allen vier Seiten** (links, rechts, oben, unten) jeweils ein Sicherheitsrand von $\text{margin} = 50\,\text{px}$ freigehalten. Auf der verbleibenden nutzbaren Fläche soll eine Fertigungsstraße der Länge $\Delta X = 30\,\text{m}$ und Breite $\Delta Y = 10\,\text{m}$ verzerrungsfrei dargestellt werden.

**a)** Berechnen Sie die effektiv nutzbare Zeichenbreite $W_{\text{eff}}$ in $\text{px}$ nach Abzug des linken und rechten Sicherheitsrands: {1:NUMERICAL:=600:0.5#Exakt! W_eff = W_canvas - 2 * margin = 700 - 2 * 50 = 600 px.~%50%650:0.5#Teilpunkte: Sie haben margin = 50 px nur einmal statt zweimal (links UND rechts) abgezogen!}

**b)** Berechnen Sie den resultierenden verzerrungsfreien uniformen Skalierungsfaktor $s$ in $\text{px/m}$: {1:NUMERICAL:=20:0.1#Richtig! H_eff = 500 - 2*50 = 400 px; s = min(600/30, 400/10) = min(20, 40) = 20 px/m.~%50%40:0.1#Teilpunkte: Sie haben max(sx, sy) = 40 px/m statt min(sx, sy) = 20 px/m gewählt.}


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

  * **Nutzbare Dimensionen (beidseitiger Randabzug!):** $W_{\text{eff}} = W_{\text{canvas}} - 2 \cdot \text{margin} = 700 - 100 = 600\,\text{px}$ und $H_{\text{eff}} = H_{\text{canvas}} - 2 \cdot \text{margin} = 500 - 100 = 400\,\text{px}$.

  * **Uniform Scaling:** $s = \min\left(\frac{600}{30}, \frac{400}{10}\right) = \min(20, 40) = 20\,\text{px/m}$.

---

## Frage 2 [Q02_T09_Q2]: Statistische Prozesskontrolle (SPC): Untere 3-Sigma-Warngrenze (LCL) bestimmen *(numerical, 1.5 Pkt.)*

Ein Welford-Statistikmodul überwacht den Förderstrom einer Dosierpumpe. Nach $k = 10$ Messwerten beträgt der laufende Mittelwert $\mu = 50{,}0\,\text{l/min}$ und die Quadratsumme der Abweichungen $M_2 = 36{,}0\,(\text{l/min})^2$. Für die Live-Überwachung in ScottPlot 5 wird die untere $3\sigma$-Kontrollgrenze $\text{LCL} = \mu - 3 \cdot s$ (mit der empirischen Stichprobenstandardabweichung $s$) berechnet.

Berechnen Sie den numerischen Wert von $\text{LCL}$ in $\text{l/min}$.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `44` (± `0.1`) → 100%:** Exakt! s^2 = M2 / (10 - 1) = 36.0 / 9 = 4.0 => s = 2.0 l/min; LCL = 50.0 - 3 * 2.0 = 44.0 l/min.
* **Wert `56` (± `0.1`) → 50%:** Teilpunkte: 56.0 l/min (50 + 6) ist die obere Kontrollgrenze UCL, gefragt war aber die untere Grenze LCL = 50 - 6 = 44.0 l/min.
* **Wert `38` (± `0.1`) → 50%:** Teilpunkte: Sie haben 50 - 3 * s^2 = 50 - 12 = 38 gerechnet (Quadratwurzel für s vergessen!).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

  * **Stichprobenvarianz:** $s^2 = \frac{M_2}{k - 1} = \frac{36{,}0}{9} = 4{,}0\,(\text{l/min})^2 \implies s = \sqrt{4{,}0} = 2{,}0\,\text{l/min}$.

  * **Untere $3\sigma$-Grenze:** $\text{LCL} = \mu - 3s = 50{,}0 - 3 \cdot 2{,}0 = 44{,}0\,\text{l/min}$.

---

## Frage 3 [Q02_T09_Q3]: C#-Code-Tracing: Horizontale Pfeilspitzen-Rückverschiebung im Screen Space *(numerical, 1.5 Pkt.)*

Ein horizontaler Kraftpfeil zeigt nach rechts von `start = (100, 200)` zur Spitze `tip = (250, 200)`. Der folgende C#-Code berechnet die X-Koordinate `wingX` der Pfeilflügel:

```csharp
double ux = 1.0, uy = 0.0;
double nx = -uy, ny = ux;
double arrowLength = 15.0, arrowHalfWidth = 6.0;
double wingX = 250.0 - ux * arrowLength + nx * arrowHalfWidth;
```

Welchen numerischen Wert (in $\text{px}$) besitzt `wingX`?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `235` (± `0.1`) → 100%:** Richtig! Da nx = -uy = 0.0 ist, gilt wingX = 250.0 - 1.0 * 15.0 + 0.0 * 6.0 = 235.0 px.
* **Wert `229` (± `0.1`) → 50%:** Teilpunkte: Sie haben arrowHalfWidth = 6.0 ebenfalls von X abgezogen; bei einem horizontalen Pfeil wirkt die Breite aber rein vertikal in Y-Richtung (nx = 0).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:** Da der Pfeil horizontal nach rechts zeigt ($u_x = 1, u_y = 0$), steht der Normalenvektor vertikal ($n_x = 0, n_y = 1$). In X-Richtung gehen die Flügel daher einfach um `arrowLength = 15.0` hinter die Spitze bei $250\,\text{px}$ zurück: $250{,}0 - 15{,}0 = 235{,}0\,\text{px}$.

---

## Frage 4 [Q02_T09_Q4]: C#-Code-Lückentext: Horizontale Warnlinie und Toleranzband in ScottPlot 5 einzeichnen *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie den C#-Code, um in **ScottPlot 5** den Mittelwert `mean` als horizontale Linie und den $\pm 3\sigma$-Bereich von `lcl` bis `ucl` als farbiges Toleranzband einzuzeichnen:

```csharp
var meanLine = MainPlot.Plot.Add.[[1]](mean);
var band = MainPlot.Plot.Add.[[2]](lcl, ucl);
MainPlot.[[3]]();
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `HorizontalLine`
* `[[2]]` (Gruppe 2): `HorizontalSpan`
* `[[3]]` (Gruppe 3): `Refresh`
* `[[4]]` (Gruppe 1): `VerticalLine`
* `[[5]]` (Gruppe 1): `Pie`
* `[[6]]` (Gruppe 2): `DataStreamer`
* `[[7]]` (Gruppe 2): `Scatter`
* `[[8]]` (Gruppe 3): `Freeze`
* `[[9]]` (Gruppe 3): `Dispose`

**Musterherleitung & Gesamt-Feedback:**

**Erklärung:** Eine durchgehende waagerechte Referenzlinie bei einem Y-Wert erzeugt man mit `Plot.Add.HorizontalLine(y)`, ein waagerechtes Band zwischen $y_1$ und $y_2$ mit `Plot.Add.HorizontalSpan(y1, y2)`. Abschließend aktualisiert `MainPlot.Refresh()` die Anzeige.

---

## Frage 5 [Q02_T09_Q5]: Konzept-Zuordnung: Mathematische Kennzahlen der Echtzeit-Statistik (Kapitel 04) *(matching, 1.0 Pkt.)*

Ordnen Sie den vier statistischen Größen aus Kapitel 04 jeweils ihre korrekte mathematische Definition und Bedeutung im Monitoring-Dashboard zu (beachten Sie die zwei Überhang-Distraktoren).

**Zuordnungspaare & Überhang-Distraktoren (`matching`):**
* Inkrementelles Mittelwert-Update im Welford-Algorithmus beim k-ten Messwert $\to$ **mu_k = mu_{k-1} + (x_k - mu_{k-1}) / k**
* Erwartungstreue empirische Stichprobenvarianz aus der Welford-Quadratsumme M2 $\to$ **s^2 = M2 / (k - 1) mit Bessel-Korrektur für k >= 2**
* Interquartilsabstand (IQR) zur Beschreibung der Box-Höhe im Box-Whisker-Plot $\to$ **Q3 - Q1 (Spannweite der mittleren 50 Prozent der sortierten Messwerte)**
* Obere und untere Eingriffsgrenze (Control Limits) im statistischen Prozessband $\to$ **mu + 3*s und mu - 3*s (umfasst bei Normalverteilung ca. 99,73 Prozent der Werte)**
* *(Überhang-Distraktor)* $\to$ s^2 = (sumX / k)^2 (Quadrat des arithmetischen Mittelwerts)
* *(Überhang-Distraktor)* $\to$ Q3 + Q1 (Summe aus erstem und drittem Quartil)

**Musterherleitung & Gesamt-Feedback:**

**Lösung:** Diese vier Beziehungen (Welford-Mittelwert, Bessel-korrigierte Stichprobenvarianz $M_2/(k-1)$, Interquartilsabstand $Q_3 - Q_1$ und $\mu \pm 3s$-Prozessgrenzen) bilden das mathematische Rückgrat von Kapitel 04.

---

## Frage 6 [Q02_T09_Q6]: MSAGL-Rendering auf WPF Canvas: Warum die Bounding-Box des Graphen transformiert werden muss *(multichoice, 1.0 Pkt.)*

Nachdem `LayoutHelpers.CalculateLayout(graph, settings, null)` die Knoten- und Kantenpositionen eines MSAGL-Graphen berechnet hat, sollen diese auf einem WPF-Canvas gezeichnet werden. Warum reicht es nicht, die berechneten MSAGL-Koordinaten `node.Center.X` und `node.Center.Y` unverändert als Pixelkoordinaten zu übernehmen?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Weil MSAGL ein eigenes Koordinatensystem mit beliebiger BoundingBox und nach oben zeigender Y-Achse nutzt, das erst in das Canvas eingepasst werden muss.
  * *Feedback:* Richtig! Genau wie bei einem CAD-Bauteil liest man graph.BoundingBox (Left, Right, Bottom, Top) aus und bildet sie per Uniform Scaling und Y-Inversion auf das Canvas ab.
* [ ] (0%) Weil MSAGL sämtliche Koordinaten ausschließlich als verschlüsselte Hexadezimal-Strings speichert, die erst über einen Dienst entschlüsselt werden müssen.
  * *Feedback:* Falsch. node.Center.X und Y sind normale, direkt lesbare double-Gleitkommazahlen.
* [ ] (0%) Weil MSAGL die Knotenpositionen grundsätzlich in geographischen Kugelkoordinaten (Längengrad, Breitengrad und Erdradius) für Weltkarten berechnet.
  * *Feedback:* Falsch. MSAGL arbeitet in einem ebenen kartesischen 2D-Koordinatensystem.
* [ ] (0%) Weil das WPF-Canvas keine Ellipsen oder Rechtecke darstellen kann, solange deren Mittelpunkte nicht ganzzahlig durch 100 ohne Rest teilbar sind.
  * *Feedback:* Falsch. WPF zeichnet Shapes an beliebigen Gleitkomma-Positionen.

**Musterherleitung & Gesamt-Feedback:**

**wichtige Brücke zwischen Kap. 03 und Kap. 04:** Die Klasse `Transform2D` aus Kapitel 03 lässt sich 1:1 wiederverwenden, um die `graph.BoundingBox` eines MSAGL-Graphen verzerrungsfrei und zentriert auf das WPF-Canvas abzubilden!

---

## Frage 7 [Q02_T09_Q7]: C#-Bug-Diagnose: Division durch Null beim Welford-Start (SampleVariance bei Count < 2) *(multichoice, 1.0 Pkt.)*

In einer `WelfordStatistics`-Klasse ist die Eigenschaft für die Stichprobenvarianz wie folgt implementiert: `public double SampleVariance => M2 / (Count - 1);`. Unmittelbar nach dem allerersten Messwert (`Count == 1`) zeigt das angebundene ScottPlot-Diagramm plötzlich `NaN`-Fehler an. Warum?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Für Count == 1 sind sowohl M2 == 0.0 als auch (Count - 1) == 0, sodass die Gleitkommadivision 0.0 / 0.0 nach IEEE 754 den Wert double.NaN liefert.
  * *Feedback:* Exakt! Nach nur einem Messwert ist M2 exakt 0.0 und der Nenner (1 - 1) ebenfalls 0; in IEEE-754 ergibt 0.0 / 0.0 den Wert NaN, der alle Folgeplots infiziert.
* [ ] (0%) In C# löst jede Division eines double-Werts durch Null sofort einen blauen Bildschirmabsturz (Blue Screen of Death) des Windows-Kernels aus.
  * *Feedback:* Falsch. Gleitkommadivision durch 0.0 wirft in C# nicht einmal eine Exception, sondern liefert +Infinity, -Infinity oder (bei 0.0/0.0) NaN.
* [ ] (0%) Die Variable Count startet bei einem neuen C#-Objekt standardmäßig beim Wert -2147483648, sofern man keinen Konstruktor mit Parameter aufruft.
  * *Feedback:* Falsch. Felder vom Typ int werden in C# automatisch mit 0 initialisiert.
* [ ] (0%) Der Ausdruck (Count - 1) dekrementiert das Feld Count dauerhaft im Speicher, sodass der Zähler niemals über den Wert 0 hinauswachsen kann.
  * *Feedback:* Falsch. Count - 1 berechnet nur eine temporäre Differenz ohne Seiteneffekt (im Gegensatz zu --Count).

**Musterherleitung & Gesamt-Feedback:**

**Robuste Implementierung:** In `WelfordStatistics` schützt man die Varianz-Eigenschaft stets mit einer Fallunterscheidung: `public double SampleVariance => Count > 1 ? M2 / (Count - 1) : 0.0;`.

---

## Frage 8 [Q02_T09_Q8]: Systemanalyse: Vergleich der 2D-Grafiktechnologien im Kurs (Kapitel 02, 03 und 04) *(multichoice, 1.0 Pkt.)*

Welche **zwei** Architektur-Entscheidungen wählen für das jeweilige Simulationsproblem die technisch optimale 2D-Visualisierungstechnologie aus den bisherigen Kapiteln?

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Für ein interaktives 2D-Fachwerk mit 50 Stäben, Knoten-Hit-Testing, Tooltips und scharfer DIN-406-Bemaßung nutzt man Vektorgrafik auf dem WPF Canvas.
  * *Feedback:* Richtig! Vektorgrafik auf dem Canvas skaliert gestochen scharf und unterstützt direktes Maus-Interaktionsverhalten an einzelnen Knoten und Stäben.
* [x] **(50%)** Für das Echtzeit-Monitoring mehrerer 1-kHz-Sensorkanäle inklusive Achsenskalierung und Toleranzbändern nutzt man ScottPlot 5 mit DataStreamer.
  * *Feedback:* Richtig! ScottPlot 5 liefert fertige wissenschaftliche Achsen, Legenden, Downsampling und Ringpuffer-Streaming out-of-the-box.
* [ ] (-50%) Für ein kontinuierliches 2D-Temperaturfeld mit 500 x 500 = 250.000 Gitterzellen erzeugt man 250.000 einzelne Rectangle-UIElemente im WPF Canvas.
  * *Feedback:* Falsch! 250.000 UIElemente im Canvas legen WPF komplett lahm; für dichte 2D-Skalarfelder nutzt man ein WriteableBitmap (Kap. 02) oder eine Heatmap.
* [ ] (-50%) Für einen gerichteten System-Signalflussgraphen mit 30 Knoten berechnet man das Layout über einen 2D-Wärmeleitungs-Löser auf einem Pixel-Array.
  * *Feedback:* Falsch! Für gerichtete Graphen nutzt man MSAGL (Sugiyama-Layout) in Kombination mit Vektorgrafik.

**Musterherleitung & Gesamt-Feedback:**

**Architektur-Kompass:** Dichte 2D-Rasterfelder $\to$ `WriteableBitmap` (Kap. 02); interaktive Konstruktions-/CAD-Geometrie $\to$ `WPF Canvas / DrawingVisual` (Kap. 03); Zeitreihen, Statistik & Graphentopologie $\to$ `ScottPlot 5 & MSAGL` (Kap. 04).

---
