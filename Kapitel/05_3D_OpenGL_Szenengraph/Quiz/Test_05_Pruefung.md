# Quiz 02 - Test 05 (Prüfungstest): Stablänge im Screen Space, ScottPlot-Abtastrate & MSAGL

**Test-ID:** `Test_05_Pruefung`  
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_05_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [Q02_T05_Q1]: Affine 2D-Transformation: Uniform Scaling und resultierende Stablänge im Screen Space *(cloze, 2.0 Pkt.)*

Ein ebenes Kragarm-Fachwerk besitzt eine Gesamtbreite von $\Delta X = 12\,\text{m}$ und eine Gesamthöhe von $\Delta Y = 8\,\text{m}$. Es wird verzerrungsfrei (Uniform Scaling) in ein nutzbares WPF-Canvas-Rechteck von $W_{\text{eff}} = 600\,\text{px}$ Breite und $H_{\text{eff}} = 320\,\text{px}$ Höhe eingepasst. Im Fachwerk befindet sich ein schräger Diagonalstab, der den Knoten $A(0\,\text{m}, 0\,\text{m})$ mit dem Knoten $B(3{,}0\,\text{m}, 4{,}0\,\text{m})$ verbindet.

**a)** Berechnen Sie den verzerrungsfreien uniformen Skalierungsfaktor $s$ in $\text{px/m}$: {1:NUMERICAL:=40:0.1#Exakt! s = min(600/12, 320/8) = min(50, 40) = 40 px/m.~%50%50:0.1#Teilpunkte: Sie haben sx = 600/12 = 50 px/m statt min(50, 40) = 40 px/m gewählt.}

**b)** Berechnen Sie die euklidische Länge $L_{\text{screen}}$ (in $\text{px}$) dieses Diagonalstabs $\overline{AB}$ auf dem Bildschirm nach der Transformation: {1:NUMERICAL:=200:0.5#Richtig! Physikalische Länge L = sqrt(3^2 + 4^2) = 5.0 m; L_screen = 5.0 m * 40 px/m = 200 px.~%50%250:0.5#Teilpunkte: Folgefehler aus Teil a (5.0 m * 50 px/m = 250 px) oder Manhattan-Distanz (3+4)*40 = 280 px.}


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

  * **Uniform Scaling:** $s_x = \frac{600}{12} = 50\,\text{px/m}$, $s_y = \frac{320}{8} = 40\,\text{px/m} \implies s = \min(50, 40) = 40\,\text{px/m}$.

  * **Stablänge im World Space:** $L_{\text{world}} = \sqrt{(3{,}0 - 0)^2 + (4{,}0 - 0)^2} = \sqrt{9 + 16} = 5{,}0\,\text{m}$.

  * **Stablänge im Screen Space:** Da die Skalierung uniform ist, gilt $L_{\text{screen}} = s \cdot L_{\text{world}} = 40\,\text{px/m} \cdot 5{,}0\,\text{m} = 200\,\text{px}$.

---

## Frage 2 [Q02_T05_Q2]: ScottPlot 5 Signal-Konfiguration: Zeitdauer eines Ringpuffer-Fensters berechnen *(numerical, 1.5 Pkt.)*

Ein Schwingungssensor an einem Getriebeprüfstand tastet die Beschleunigung mit einer festen Abtastfrequenz von $f_s = 250\,\text{Hz}$ (d. h. Abtastperiode $\Delta t = 0{,}004\,\text{s}$) ab. In ScottPlot 5 wird ein `DataStreamer` mit einer festen Pufferkapazität von $N = 1500$ Datenpunkten initialisiert.

Welche physikalische Zeitspanne $T_{\text{window}}$ (in **Sekunden**) ist im Diagrammfenster gleichzeitig sichtbar, sobald der Puffer vollständig gefüllt ist?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `6` (± `0.05`) → 100%:** Exakt! T_window = N / f_s = 1500 / 250 Hz = 6.0 s (bzw. 1500 * 0.004 s = 6.0 s).
* **Wert `6000` (± `10`) → 50%:** Teilpunkte: 6000 ms ist die Dauer in Millisekunden, gefragt war der Wert in Sekunden (6.0 s).
* **Wert `0.1667` (± `0.01`) → 50%:** Teilpunkte: Kehrwertfehler! Sie haben f_s / N = 250 / 1500 = 0.1667 statt N / f_s = 6.0 s gerechnet.

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:** Bei $N = 1500$ Abtastpunkten und $\Delta t = \frac{1}{f_s} = \frac{1}{250\,\text{Hz}} = 0{,}004\,\text{s}$ umfasst das sichtbare Zeitfenster $T_{\text{window}} = N \cdot \Delta t = \frac{1500}{250} = 6{,}0\,\text{s}$.

---

## Frage 3 [Q02_T05_Q3]: C#-Code-Tracing: Einheitsrichtungsvektor und Maßlinien-Versatz (DIN 406) *(numerical, 1.5 Pkt.)*

Für einen horizontal im Screen Space verlaufenden Stab von `p1 = (100, 250)` nach `p2 = (300, 250)` berechnet folgender C#-Code den Y-Wert `dimY1` des verschobenen Maßlinien-Startpunkts (Abstand `dimOffset = 25.0` Pixel):

```csharp
double dx = 300.0 - 100.0;
double dy = 250.0 - 250.0;
double len = Math.Sqrt(dx * dx + dy * dy);
double ux = dx / len, uy = dy / len;
double nx = -uy, ny = ux;
double dimY1 = 250.0 - ny * 25.0;
```

Welchen numerischen Wert (in $\text{px}$) erhält `dimY1`?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `225` (± `0.1`) → 100%:** Richtig! dx = 200, dy = 0 => ux = 1.0, uy = 0.0 => ny = ux = 1.0 => dimY1 = 250.0 - 1.0 * 25.0 = 225.0 px.
* **Wert `275` (± `0.1`) → 50%:** Teilpunkte: Vorzeichenfehler bei der Subtraktion (250 + 25 = 275 statt 250 - 25 = 225).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:** Da $dx = 200$ und $dy = 0$, ist $u_x = 1{,}0$ und $u_y = 0{,}0$. Damit wird $n_y = u_x = 1{,}0$, und $\text{dimY1} = 250{,}0 - 1{,}0 \cdot 25{,}0 = 225{,}0\,\text{px}$ (die Maßlinie liegt 25 Pixel oberhalb des Stabs).

---

## Frage 4 [Q02_T05_Q4]: C#-Code-Lückentext: MSAGL-Graphen erstellen und Sugiyama-Layout berechnen *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie den C#-Code, um in **MSAGL** einen gerichteten Graphen mit einer Kante von Knoten `"Pumpe"` nach `"Ventil"` anzulegen und das hierarchische Sugiyama-Layout zu berechnen:

```csharp
var graph = new GeometryGraph();
// ... Knoten "Pumpe" und "Ventil" wurden angelegt ...
graph.Edges.Add(new Edge(nodePumpe, [[1]]));
var settings = new [[2]]();
LayoutHelpers.CalculateLayout(graph, [[3]], null);
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `nodeVentil`
* `[[2]]` (Gruppe 2): `SugiyamaLayoutSettings`
* `[[3]]` (Gruppe 3): `settings`
* `[[4]]` (Gruppe 1): `graph`
* `[[5]]` (Gruppe 1): `"Pumpe"`
* `[[6]]` (Gruppe 2): `WriteableBitmap`
* `[[7]]` (Gruppe 2): `WelfordStatistics`
* `[[8]]` (Gruppe 3): `nodePumpe`
* `[[9]]` (Gruppe 3): `new Canvas()`

**Musterherleitung & Gesamt-Feedback:**

**Erklärung:** Eine gerichtete Kante `new Edge(source, target)` verbindet `nodePumpe` mit `nodeVentil`. Für das Schichtenlayout instanziiert man `SugiyamaLayoutSettings` und übergibt `settings` an `LayoutHelpers.CalculateLayout`.

---

## Frage 5 [Q02_T05_Q5]: Konzept-Zuordnung: Aufgaben der 2D-Transformations- und Bemaßungsparameter (Kap. 03) *(matching, 1.0 Pkt.)*

Ordnen Sie den vier mathematischen Ausdrücken aus Kapitel 03 jeweils ihre exakte geometrische Bedeutung in der 2D-Visualisierungspipeline zu (beachten Sie die zwei Überhang-Distraktoren).

**Zuordnungspaare & Überhang-Distraktoren (`matching`):**
* s = Math.Min(effectiveWidth / worldWidth, effectiveHeight / worldHeight) $\to$ **Uniformer Skalierungsfaktor in px/m zur winkeltreuen Darstellung ohne Verzerrung**
* yScreen = canvasHeight - (offsetY + (yWorld - yMin) * s) $\to$ **Transformation der vertikalen Weltkoordinate inklusive Invertierung der WPF-Y-Achse**
* nx = -uy; ny = ux; (mit Einheitsrichtungsvektor ux, uy) $\to$ **Um 90 Grad gedrehter Einheitsnormalenvektor für Maßlinien-Abstand und Pfeilflügelbreite**
* distSq = (mouseX - nodeScreenX)^2 + (mouseY - nodeScreenY)^2 <= R^2 $\to$ **Wurzelfreier euklidischer Fangbereichstest (Hit-Testing) im Screen Space**
* *(Überhang-Distraktor)* $\to$ Perspektivische Tiefendivision (x / z) für 3D-Kameraprojektionen
* *(Überhang-Distraktor)* $\to$ Gleitender exponentieller Tiefpassfilter für verrauschte Sensordaten

**Musterherleitung & Gesamt-Feedback:**

**Lösung:** Alle vier Grundformeln bilden das Fundament eines interaktiven 2D-CAD/FEM-Viewers: Uniform Scaling, Y-Inversion, 2D-Normalenvektor und wurzelfreies Hit-Testing.

---

## Frage 6 [Q02_T05_Q6]: ScottPlot 5 Downsampling: Warum Min/Max-Spalten-Aggregation Spitzenwerte schützt *(multichoice, 1.0 Pkt.)*

Bei der Darstellung von $100.000$ Druckmesswerten auf einem $1000\,\text{px}$ breiten Monitor entfallen $100$ Messwerte auf jede einzelne Pixelspalte. Warum bestimmt ein hochwertiger `Signal`-Plot pro Pixelspalte das **Minimum und Maximum** der $100$ Werte, anstatt einfach nur jeden $100$-sten Messwert (`data[i * 100]`) zu zeichnen?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Weil kurzes, gefährliches Druckspitzen-Überschwingen zwischen den Hunderterschritten beim naiven Auslassen unsichtbar verschluckt würde (Aliasing).
  * *Feedback:* Richtig! Durch die vertikale Verbindungslinie vom Spalten-Minimum zum Spalten-Maximum bleibt jeder einzelne Peak (z. B. Druckstoß bei Index 147) garantiert auf dem Bildschirm sichtbar.
* [ ] (0%) Weil der Modulo-Operator i * 100 in C# nur für vorzeichenlose Byte-Arrays zulässig ist und bei double-Arrays eine Ausnahme auslöst.
  * *Feedback:* Falsch. Array-Indizierung mit i * 100 ist für jeden Array-Typ in C# problemlos möglich, aber fachlich wegen des Informationsverlusts gefährlich.
* [ ] (0%) Weil das Zeichnen von jedem hundertsten Punkt die Anzahl der Bildschirm-Pixel vergrößert und das Monitorfenster über den Desktop-Rand schiebt.
  * *Feedback:* Falsch. Die Fenstergröße des Monitors wird durch die Downsampling-Strategie selbstverständlich nicht verändert.
* [ ] (0%) Weil die Berechnung von Minimum und Maximum die Anzahl der Messwerte im Hauptspeicher dauerhaft auf zwei Zahlen komprimiert und das Array löscht.
  * *Feedback:* Falsch. Das Original-Array bleibt im RAM vollständig erhalten, sodass man jederzeit verlustfrei in die Einzelwerte hineinzoomen kann.

**Musterherleitung & Gesamt-Feedback:**

**Wichtig für Prüfstände:** In der Automatisierungstechnik sind kurze Transienten (Spannungsspitzen, Druckschläge) oft das kritischste Diagnosemerkmal. Min/Max-Einhüllenden-Rendering garantiert, dass kein Peak visuell verloren geht.

---

## Frage 7 [Q02_T05_Q7]: C#-Bug-Diagnose: Falsche Winkelberechnung für schräge Maßtexte durch Math.Atan(dy / dx) *(multichoice, 1.0 Pkt.)*

Ein Programmierer berechnet den Neigungswinkel eines Fachwerkstabs von $P_1$ nach $P_2$ mit `double angle = Math.Atan((y2 - y1) / (x2 - x1));` statt mit `Math.Atan2(y2 - y1, x2 - x1)`. Welcher Fehler tritt dadurch in der Zeichnung auf?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Math.Atan kann den zweiten und dritten Quadranten nicht vom ersten und vierten unterscheiden und liefert bei vertikalen Stäben (x2 == x1) Division durch Null.
  * *Feedback:* Exakt! Durch die Division dy/dx kürzen sich zwei Minuszeichen weg ((-dy)/(-dx) == dy/dx), sodass Atan nur (-pi/2, +pi/2) kennt; Math.Atan2 wertet beide Vorzeichen separat auf (-pi, +pi] aus.
* [ ] (0%) Math.Atan gibt den Winkel in Neugrad (Gon) zurück, während WPF RotateTransform ausschließlich Winkel im Bogenmaß (Radiant) akzeptiert.
  * *Feedback:* Falsch. Sowohl Math.Atan als auch Math.Atan2 liefern Radiant, und WPF RotateTransform.Angle erwartet Grad (weshalb man mit 180.0 / Math.PI umrechnet).
* [ ] (0%) Math.Atan rundet das Ergebnis intern auf ganzzahlige Vielfache von 45 Grad, sodass beliebig geneigte Diagonalstäbe nicht dargestellt werden können.
  * *Feedback:* Falsch. Math.Atan rechnet mit voller double-Gleitkommapräzision und rundet nicht auf 45°-Schritte.
* [ ] (0%) Der Aufruf von Math.Atan sperrt den UI-Thread für 100 Millisekunden, weil die Funktion intern auf einen externen Mathematik-Webservice wartet.
  * *Feedback:* Falsch. Math.Atan ist eine schnelle CPU-Instruktion im Nanosekundenbereich ohne Netzwerkzugriff.

**Musterherleitung & Gesamt-Feedback:**

**Merksatz für 2D-Geometrie:** Verwenden Sie für Richtungs- und Orientierungswinkel im 2D-Raum **immer** `Math.Atan2(dy, dx)` (in genau dieser Argumentreihenfolge: zuerst $\Delta y$, dann $\Delta x$!).

---

## Frage 8 [Q02_T05_Q8]: Systemanalyse: Hit-Testing und interaktive Objektauswahl im 2D-Canvas *(multichoice, 1.0 Pkt.)*

Welche **zwei** Entwurfsregeln gelten für ein ergonomisches und performantes **Hit-Testing** (Auswählen von Knoten per Mausklick) in einem 2D-Simulations-Viewer?

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Der Fangradius (z. B. 10 Pixel) wird im Screen Space festgelegt, damit ein Knoten unabhängig vom aktuellen Zoomfaktor immer gleich leicht anklickbar bleibt.
  * *Feedback:* Richtig! Würde man den Fangradius in Metern im World Space festlegen, müsste man beim Herauszoomen millimetergenau zielen.
* [x] **(50%)** Bei der Suche nach dem nächstgelegenen Knoten vergleicht man die quadratischen Abstände dx*dx + dy*dy mit R*R, um unnötige Wurzelberechnungen zu sparen.
  * *Feedback:* Richtig! Da die Quadratwurzel auf positiven Zahlen streng monoton wachsend ist, liefert der Vergleich der Abstandsquadrate exakt dasselbe Ergebnis ohne Math.Sqrt.
* [ ] (-50%) Ein Knoten gilt nur dann als getroffen, wenn die Gleitkomma-Koordinaten der Maus bis auf die fünfzehnte Nachkommastelle exakt mit dem Knoten übereinstimmen.
  * *Feedback:* Falsch. Ein exakter Gleichheitstest (==) auf double-Koordinaten wäre mit der Maus praktisch unmöglich zu treffen; man benötigt zwingend einen Toleranz-/Fangradius.
* [ ] (-50%) Für jedes Hit-Testing muss das gesamte Canvas zunächst als JPEG-Datei auf die Festplatte gespeichert und anschließend die Pixelfarbe an der Mausposition gelesen werden.
  * *Feedback:* Falsch. Ein Festplatten-Export bei Mausbewegung würde die Anwendung komplett lahmlegen; man rechnet direkt mit den Knoten-Koordinaten im Speicher.

**Musterherleitung & Gesamt-Feedback:**

**Zusammenfassung:** Gutes CAD-Hit-Testing arbeitet mit einem Screen-Space-Toleranzradius (z. B. $R = 8\text{–}12\,\text{px}$) und vergleicht effizient $\Delta x^2 + \Delta y^2 \le R^2$.

---
