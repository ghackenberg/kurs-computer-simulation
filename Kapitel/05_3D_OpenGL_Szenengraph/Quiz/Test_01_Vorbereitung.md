# Quiz 02 - Test 01 (Vorbereitungstest): 2D-Vektorgrafik, Transformationen & Echtzeit-Diagramme

**Test-ID:** `Test_01_Vorbereitung`  
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_01_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben zum Üben)

---

## Frage 1 [Q02_T01_Q1]: Affine 2D-Transformation: Uniform Scaling und Y-Inversion (WorldToScreen) *(cloze, 2.0 Pkt.)*

Ein ebenes Brückenfachwerk besitzt die physikalische Ausdehnung $\Delta X = 40\,\text{m}$ (von $x_{\min}=0\,\text{m}$ bis $x_{\max}=40\,\text{m}$) und $\Delta Y = 10\,\text{m}$ (von $y_{\min}=0\,\text{m}$ bis $y_{\max}=10\,\text{m}$). Es soll verzerrungsfrei (Uniform Scaling) auf einem WPF-Canvas mit einer nutzbaren Zeichenfläche (nach Randabzug) von $W_{\text{eff}} = 800\,\text{px}$ Breite und $H_{\text{eff}} = 300\,\text{px}$ Höhe dargestellt werden. Die Gesamthöhe des Canvas beträgt $H_{\text{canvas}} = 360\,\text{px}$, und das Bauteil wird vertikal mit einem unteren Randabstand (Offset) von $\text{offset}_Y = 80\,\text{px}$ vom unteren Bildschirmrand zentriert.

**a)** Berechnen Sie den verzerrungsfreien Skalierungsfaktor $s$ in $\text{px/m}$: {1:NUMERICAL:=20:0.1#Exakt! s = min(800/40, 300/10) = min(20, 30) = 20 px/m.~%50%30:0.1#Teilpunkte: Sie haben max(sx, sy) = 30 px/m statt min(sx, sy) gewählt (Bauteil ragt horizontal aus dem Canvas!).}

**b)** Berechnen Sie die vertikale Bildschirmkoordinate $Y_{\text{screen}}$ (in $\text{px}$) für einen Oberkanten-Knoten bei $y = 7{,}0\,\text{m}$ unter Berücksichtigung der WPF-Y-Achsen-Inversion: {1:NUMERICAL:=140:0.5#Richtig! Y_screen = 360 - (80 + 7.0 * 20) = 360 - 220 = 140 px.~%50%220:0.5#Teilpunkte: 220 px ist der Abstand vom unteren Rand ohne Y-Inversion (360 - 220 = 140 px).}


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

  * **Horizontaler und vertikaler Skalierungsfaktor:** $s_x = \frac{800\,\text{px}}{40\,\text{m}} = 20\,\text{px/m}$, $s_y = \frac{300\,\text{px}}{10\,\text{m}} = 30\,\text{px/m}$.

  * **Uniform Scaling (Verzerrungsfreiheit):** $s = \min(s_x, s_y) = \min(20, 30) = 20\,\text{px/m}$.

  * **Y-Transformation mit Achseninversion:** Da die WPF-Y-Achse nach unten zeigt, gilt $Y_{\text{screen}} = H_{\text{canvas}} - (\text{offset}_Y + (y - y_{\min}) \cdot s) = 360 - (80 + 7{,}0 \cdot 20) = 360 - 220 = 140\,\text{px}$.

---

## Frage 2 [Q02_T01_Q2]: Welford-Online-Algorithmus: Laufende Mittelwert-Aktualisierung *(numerical, 1.5 Pkt.)*

Ein Prüfstand überwacht die Lagertemperatur fortlaufend mittels des numerisch stabilen Welford-Online-Algorithmus. Nach $k-1 = 4$ Messwerten beträgt der laufende Mittelwert $\mu_4 = 50{,}0\,^\circ\text{C}$. Nun trifft als $k = 5$-ter Messwert $x_5 = 60{,}0\,^\circ\text{C}$ ein.

Berechnen Sie den neuen laufenden Mittelwert $\mu_5$ (in $^\circ\text{C}$) unmittelbar nach Verarbeitung des fünften Messwerts.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `52` (± `0.05`) → 100%:** Exakt! Delta_1 = 60 - 50 = 10 °C; mu_5 = 50 + 10 / 5 = 52.0 °C.
* **Wert `52.5` (± `0.05`) → 50%:** Teilpunkte: Sie haben durch k-1 = 4 statt durch die neue Stichprobengröße k = 5 geteilt (50 + 10/4 = 52.5).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (Welford-Schritt für $k=5$):**

Abweichung vom bisherigen Mittelwert: $\Delta_1 = x_5 - \mu_4 = 60{,}0 - 50{,}0 = 10{,}0\,^\circ\text{C}$.  

Aktualisierter Mittelwert: $\mu_5 = \mu_4 + \frac{\Delta_1}{k} = 50{,}0 + \frac{10{,}0}{5} = 52{,}0\,^\circ\text{C}$.

---

## Frage 3 [Q02_T01_Q3]: C#-Code-Tracing: Allokationsfreier Ringpuffer (Modulo-Arithmetik) *(numerical, 1.5 Pkt.)*

Gegeben sei folgender Ausschnitt eines allokationsfreien Ringpuffers für Echtzeit-Sensordaten:

```csharp
int capacity = 10;
int head = 7;     // Index des ältesten Elements
int logicalIndex = 5; // 0-basierter logischer Index (5 = sechstes Element)
int physicalIndex = (head + logicalIndex) % capacity;
```

Welchen numerischen Wert besitzt `physicalIndex` nach der Ausführung?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `2` (± `0`) → 100%:** Richtig! (7 + 5) % 10 = 12 % 10 = 2 (Wrap-Around am Array-Ende).
* **Wert `3` (± `0`) → 50%:** Teilpunkte: Off-by-One-Fehler (1-basierte statt 0-basierte Zählung beim Wrap-Around).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

Der Ringpuffer bildet den logischen Index über Modulo-Arithmetik auf das interne Array ab: $(7 + 5) \bmod 10 = 12 \bmod 10 = 2$.

---

## Frage 4 [Q02_T01_Q4]: C#-Code-Lückentext: Gedrehte Pfeilspitze im Screen Space konstruieren *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie den C#-Code zur Berechnung des linken Flügelpunkts `leftWing` einer Kraftpfeilspitze mit konstanter Pixellänge `arrowLen = 12.0` und halber Pfeilbreite `arrowWidth = 5.0` an der Pfeilspitze `tip` (Einheitsrichtungsvektor `(ux, uy)` im Screen Space):

```csharp
double nx = [[1]]; // Normalenvektor X-Komponente (90 Grad gedreht)
double ny = [[2]]; // Normalenvektor Y-Komponente
Point leftWing = new Point(
    tip.X - [[3]] * arrowLen + nx * arrowWidth,
    tip.Y - uy * arrowLen + ny * arrowWidth);
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `-uy`
* `[[2]]` (Gruppe 2): `ux`
* `[[3]]` (Gruppe 3): `ux`
* `[[4]]` (Gruppe 1): `uy`
* `[[5]]` (Gruppe 1): `-ux`
* `[[6]]` (Gruppe 2): `-uy`
* `[[7]]` (Gruppe 2): `1.0 / ux`
* `[[8]]` (Gruppe 3): `ny`
* `[[9]]` (Gruppe 3): `tip.X`

**Musterherleitung & Gesamt-Feedback:**

**Erklärung:** Der zum Richtungsvektor $(u_x, u_y)$ senkrechte 2D-Einheitsnormalenvektor lautet $(n_x, n_y) = (-u_y, u_x)$. Vom Spitzenpunkt `tip` geht man um `arrowLen` entgegen der Pfeilrichtung $(-u_x, -u_y)$ zurück und um `arrowWidth` entlang der Normalen $(n_x, n_y)$ nach außen.

---

## Frage 5 [Q02_T01_Q5]: Konzept-Zuordnung: ScottPlot-5-Plottable-Typen für Ingenieursdaten *(matching, 1.0 Pkt.)*

Ordnen Sie den vier Visualisierungsaufgaben in **ScottPlot 5** jeweils den architektonisch optimalen Plottable-Typ zu (beachten Sie die zwei Überhang-Distraktoren).

**Zuordnungspaare & Überhang-Distraktoren (`matching`):**
* Statisches Zeitreihen-Signal mit 1 Million äquidistant abgetasteten Messpunkten (konstantes dt) $\to$ **Add.Signal() – nutzt festes X-Intervall für schnelles Min/Max-Downsampling ohne X-Array**
* Phasenraum-Trajektorie (x über v) mit unregelmäßigen Abständen und Schleifenbildung $\to$ **Add.Scatter() – speichert explizite (X, Y)-Koordinatenpaare für beliebige Kurvenverläufe**
* Kontinuierlich einlaufendes Live-Sensorsignal in einem Oszilloskop-Fenster fester Breite $\to$ **Add.DataStreamer() – überschreibt Daten in einem Ringpuffer fester Größe (Wipe- oder Scroll-Modus)**
* Statistische Verteilung mehrerer Versuchsreihen mit Median, Interquartilsabstand (IQR) und Whiskers $\to$ **Add.Boxes() – stellt 5-Punkte-Zusammenfassungen (Q1, Median, Q3, Antennen) dar**
* *(Überhang-Distraktor)* $\to$ Add.Pie() – erzeugt Kreissektoren für prozentuale Anteile ohne Zeitbezug
* *(Überhang-Distraktor)* $\to$ Add.Heatmap() – rendert 2D-Skalarfelder als farbcodierte Pixelmatrix

**Musterherleitung & Gesamt-Feedback:**

**Lösung:** `Signal` ist auf äquidistante Daten optimiert, `Scatter` benötigt explizite X/Y-Paare, `DataStreamer` verwaltet Echtzeit-Ringpuffer und `Boxes` zeichnet Box-Whisker-Plots.

---

## Frage 6 [Q02_T01_Q6]: DIN-406-Bemaßung: Warum Pfeilspitzen im Screen Space berechnet werden *(multichoice, 1.0 Pkt.)*

Warum werden bei einer technischen CAD-/FEM-Zeichnung nach DIN 406 (Maßpfeile, Maßhilfslinien-Überstände und Maßzahlen) die Pfeilspitzen und Schriftgrößen erst **nach** der Transformation im **Screen Space (Pixelkoordinaten)** konstruiert und nicht im World Space (Meter)?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Weil Pfeile und Texte sonst beim Zoomen oder bei stark unterschiedlichen Bauteilabmessungen entweder unleserlich winzig oder riesig skaliert würden.
  * *Feedback:* Richtig! Im Screen Space bleiben eine Pfeillänge von 10 px und eine Schriftgröße von 12 pt unabhängig vom Zoomfaktor exakt normgerecht lesbar.
* [ ] (0%) Weil die WPF-Klasse Canvas geometrische Linien und Polygone grundsätzlich nur mit ganzzahligen Pixelkoordinaten ohne Nachkommastellen rendern kann.
  * *Feedback:* Falsch. WPF arbeitet intern komplett mit Gleitkommazahlen (double) in geräteunabhängigen Einheiten (DIP).
* [ ] (0%) Weil trigonometrische Funktionen wie Math.Atan2 und Math.Sqrt in C# nur für positive Bildschirmkoordinaten im ersten Quadranten definiert sind.
  * *Feedback:* Falsch. Math.Atan2(dy, dx) ist auf dem gesamten Wertebereich (-pi bis +pi) für alle vier Quadranten definiert.
* [ ] (0%) Weil eine Skalierung im World Space die Richtung der Stabnormalen invertieren und sämtliche Maßlinien auf die falsche Bauteilseite spiegeln würde.
  * *Feedback:* Falsch. Eine uniforme Skalierung ändert keine Winkel; erst die Y-Inversion kehrt den Umlaufsinn um, was aber kein Grund gegen World-Space-Längen ist.

**Musterherleitung & Gesamt-Feedback:**

**Begründung:** Technische Annotationen (Pfeilspitzen, Strichstärken, Textgrößen) sind wahrnehmungsgebundene Größen. Würde man einen Pfeil mit $0{,}2\,\text{m}$ im World Space definieren, wäre er beim Herauszoomen unsichtbar klein und beim Hineinzoomen bildschirmfüllend.

---

## Frage 7 [Q02_T01_Q7]: C#-Bug-Diagnose: Bounding-Box-Jitter beim interaktiven Knoten-Dragging *(multichoice, 1.0 Pkt.)*

Ein Studierender implementiert das Verschieben eines Randknotens per Maus (`MouseMove`) auf dem WPF-Canvas. Sobald er den äußersten rechten Knoten zieht, zittert und springt das gesamte Fachwerk heftig hin und her:

```csharp
void OnCanvasMouseMove(object sender, MouseEventArgs e) {
    if (_draggedNode == null) return;
    var transform = ComputeAutoFitTransform(_truss.GetBoundingBox());
    _draggedNode.Position = transform.ScreenToWorld(e.GetPosition(MainCanvas));
    RedrawTruss(transform);
}
```

Was ist die exakte mathematisch-architektonische Ursache dieses Jitter-Bugs?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Die Bounding-Box und Skalierung werden in jedem MouseMove-Event neu berechnet, sodass sich das Koordinatensystem während des Ziehens rückgekoppelt selbst verschiebt.
  * *Feedback:* Exakt! Wenn der Randknoten verschoben wird, ändert sich sofort die BoundingBox und damit die Transformation für das nächste MouseMove-Event (Rückkopplungsschleife).
* [ ] (0%) Die Methode e.GetPosition(MainCanvas) liefert Koordinaten relativ zum gesamten Computermonitor statt relativ zur linken oberen Ecke des WPF-Canvas-Elements.
  * *Feedback:* Falsch. GetPosition(MainCanvas) liefert bereits exakt die lokalen Koordinaten relativ zum übergebenen UIElement MainCanvas.
* [ ] (0%) Das Neuzeichnen in OnCanvasMouseMove blockiert den Garbage Collector, wodurch ältere Maus-Events in zufälliger Reihenfolge aus der Windows-Queue gelesen werden.
  * *Feedback:* Falsch. Die Windows-Message-Queue ist streng FIFO-geordnet; das Springen entsteht rein mathematisch durch den wechselnden Maßstab.
* [ ] (0%) In WPF darf die Position eines Datenmodell-Objekts niemals innerhalb eines UI-Event-Handlers geändert werden, da dies einen Thread-Deadlock auslöst.
  * *Feedback:* Falsch. MouseMove läuft bereits auf dem UI-Thread; das Ändern einer Modelleigenschaft verursacht dort keinen Deadlock.

**Musterherleitung & Gesamt-Feedback:**

**Lösung:** Während einer laufenden Drag-Operation muss die zu Beginn (in `MouseDown`) gültige `Transform2D` eingefroren (gecacht) bleiben, bis die Maustaste in `MouseUp` wieder losgelassen wird.

---

## Frage 8 [Q02_T01_Q8]: Systemanalyse: MSAGL-Graphenlayout (Sugiyama vs. Force-Directed) *(multichoice, 1.0 Pkt.)*

Welche **zwei** Aussagen charakterisieren die Layout-Algorithmen in **Microsoft Automatic Graph Layout (MSAGL)** und deren Integration in WPF zutreffend?

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Das Sugiyama-Schichtenlayout eignet sich ideal für gerichtete Ursache-Wirkungs-Ketten und ordnet Knoten in hierarchischen Ebenen mit minimalen Kantenkreuzungen an.
  * *Feedback:* Richtig! Sugiyama (Layered Layout) ist der Standard für gerichtete Graphen (DAGs), Ablaufpläne und Signalflussgraphen.
* [x] **(50%)** MSAGL berechnet als reine Geometrie-Engine ausschließlich Knoten- und Kantenkoordinaten im Speicher und überlässt das Zeichnen der UI-Schicht (z. B. WPF Canvas).
  * *Feedback:* Richtig! Durch die Nutzung von Microsoft.Msagl (Core) bleibt die Layoutberechnung sauber vom WPF-Rendering entkoppelt.
* [ ] (-50%) Das Sugiyama-Layout platziert alle Knoten ausschließlich durch elektrostatische Abstoßung und Federkräfte auf konzentrischen Kreisen ohne Hierarchierichtung.
  * *Feedback:* Falsch. Das beschreibt Kräfte-/Feder-Layouts (Force-Directed / MDS), nicht den hierarchischen Sugiyama-Algorithmus.
* [ ] (-50%) MSAGL erfordert zwingend eine aktive OpenGL-3D-Grafikkartenbeschleunigung, da die Knotenpositionen über einen Pixel-Shader auf der GPU gelöst werden.
  * *Feedback:* Falsch. MSAGL arbeitet rein CPU-basiert auf mathematischen Graphenstrukturen und benötigt keinerlei GPU-Shader.

**Musterherleitung & Gesamt-Feedback:**

**Zusammenfassung:** MSAGL trennt Layout-Mathematik (Sugiyama für hierarchische DAGs, MDS/FastIncremental für ungerichtete Netzwerke) strikt vom Rendering auf dem WPF-Canvas.

---
