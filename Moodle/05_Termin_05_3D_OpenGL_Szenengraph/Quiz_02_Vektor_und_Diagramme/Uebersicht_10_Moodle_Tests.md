# Moodle-Testkatalog: Quiz 02: 2D-Vektorgrafik, WPF Canvas, ScottPlot 5, Welford & MSAGL
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
**Studiengang:** B.Sc. Automatisierungstechnik, Campus Wels, FH Oberösterreich  
**Dozent:** Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme  
**Prüfungszeitpunkt:** Zu Beginn von Termin 05 (vor dem Theorie-Impuls zu Kapitel 05) (erste 15 Minuten vor dem Theorie-Impuls)  
**Stoffabgrenzung (Rückwärts-Kausalität):** Kapitel 03 (2D-Vektorgrafik & WPF Canvas) und Kapitel 04 (2D-Diagramme, ScottPlot 5, Welford & MSAGL)  
**Kausalitäts-Sperre:** KEIN 3D / OpenGL / SharpGL (Kapitel 05), keine 4x4-Matrizen, kein Gimbal Lock, kein Multithreading (Kapitel 06), keine FEM-Statik / Cholesky (Kapitel 07)!  

---

## 1. Didaktisches Einsatz-, Fragetypen- & Feedbackkonzept (100 % Auto-Grading)

Dieser Katalog umfasst **10 eigenständige, äquivalente Test-Varianten** mit jeweils **8 Fragen und 10,0 Punkten** (insgesamt 80 kalibrierte Fragen für 15 Minuten Bearbeitungszeit):
* **3 Vorbereitungstests (`Test_01` bis `Test_03`):** Werden den Studierenden vorab im Moodle-Kursraum zum unbegrenzten Üben mit sofortigem, detailliertem Antwort- und Lösungsfeedback freigeschaltet.
* **7 Prüfungstests (`Test_04` bis `Test_10`):** Bilden den geschützten Klausurpool. Zu Beginn des Prüfungstermins wird **zufällig genau 1 Test** für die 15-minütige Präsenzprüfung gezogen. Um bloßes Auswendiglernen der Vorbereitungstests auszuschließen, variieren die Prüfungstests nicht nur Zahlenwerte, sondern systematisch auch die **gesuchte Zielgröße / Rechenrichtung** sowie die Code- und Diagnose-Szenarien.

### Voller Moodle-Fragetypen-Mix (100 % automatische Auswertung, 0 Min. Korrekturaufwand):
1. **Frage 1 (2,0 Pkt. – `cloze`):** Mehrstufige Ingenieursberechnung mit 2 eingebetteten numerischen Teilfeldern (Zwischenschritt + Endergebnis) für faire automatische Teilpunkte bei Folgefehlern.
2. **Frage 2 (1,5 Pkt. – `numerical`):** Physikalisch-numerische Berechnung mit Toleranzintervall sowie automatischen `50 %`-Teilpunkten für typische Einheiten-/Vorzeichenfallen.
3. **Frage 3 (1,5 Pkt. – `numerical`):** C#-Code-Tracing (Bestimmung des exakten numerischen Variablen-/Pufferzustands nach Codeausführung inkl. `50 %`-Teilpunkte-Falle).
4. **Frage 4 (1,0 Pkt. – `gapselect`):** Inline-C#-Code-Lückentext (*„Fill in the C# Code“*) mit 3 gruppierten Dropdown-Lücken `[[1]]`, `[[2]]`, `[[3]]` direkt im Programmcode.
5. **Frage 5 (1,0 Pkt. – `matching` / `ddwtos`):** Konzept-/Architektur-Zuordnung mit Überhang-Distraktoren (`matching`) bzw. Pipeline-Reihenfolge per Drag-and-Drop (`ddwtos`).
6. **Frage 6 (1,0 Pkt. – `multichoice`, Single-Choice):** Konzept- und Phänomen-Diagnose (4 längensymmetrische Optionen A–D, max. 25 % Längendifferenz).
7. **Frage 7 (1,0 Pkt. – `multichoice`, Single-Choice):** Subtile C#-Code-Bug-Diagnose (*„Find the Bug“*, 4 längensymmetrische Optionen A–D).
8. **Frage 8 (1,0 Pkt. – `multichoice`, Multiple-Select):** Vernetzte Systemanalyse (4 längensymmetrische Optionen A–D, 2 richtig mit `+50 %`, 2 falsch mit `-50 %`).

---

## 2. Übersichtstabelle aller 10 Tests

| Test-ID | Status | Q1 (`cloze`, 2,0 P.) | Q2 (`numerical`, 1,5 P.) | Q3 (`numerical` Code, 1,5 P.) | Q4 (`gapselect` C#, 1,0 P.) | Q5 (`matching`/`ddwtos`, 1,0 P.) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Test_01_Vorbereitung** | 🟢 Vorbereitung | Uniform Scaling $s$ & $Y_{\text{screen}}$ | Welford neuer Mittelwert $\mu_5$ | Ringpuffer physischer Array-Index | C# Pfeilspitzen-Geometrie im Screen Space | ScottPlot 5 Plottables zuordnen |
| **Test_02_Vorbereitung** | 🟢 Vorbereitung | Horizontaler Letterboxing-Offset & $X_{\text{screen}}$ | Welford $M_{2,k}$-Update berechnen | C#-Tracing: Hit-Testing Distanzquadrat | C# ScreenToWorld Transformation | 4 Phasen des Sugiyama-Algorithmus |
| **Test_03_Vorbereitung** | 🟢 Vorbereitung | Inverse Transformation $X_{\text{world}}$ & $Y_{\text{world}}$ | Obere $3\sigma$-Warngrenze aus $M_2$ | C#-Tracing: Gruppierte Balkenposition | C# Welford-Methode AddSample | Kap. 03/04 Klassen & Konzepte zuordnen |
| **Test_04_Pruefung** | 🔴 **Prüfung** | Vertikaler Letterboxing-Offset & $Y_{\text{screen}}$ | Empirische Stichprobenvarianz $s^2$ | C#-Tracing: BoxPlot IQR & Whisker-Grenze | C# Ringpuffer Push-Methode | Welford-Pipeline Reihenfolge |
| **Test_05_Pruefung** | 🔴 **Prüfung** | Skalierungsfaktor $s$ & Stablänge $L_{\text{screen}}$ | Zeitfenster-Dauer im DataStreamer | C#-Tracing: Maßlinien-Normalenversatz | C# MSAGL Layout berechnen | Transformations- & DIN-406-Größen zuordnen |
| **Test_06_Pruefung** | 🔴 **Prüfung** | DIN-406-Maßhilfslinie & Endpunkt $Y_{\text{ext}}$ | Volle Bandbreite $6\sigma$ des Toleranzbands | C#-Tracing: Ringpuffer nach Wrap-Around | C# ScottPlot 5 DataStreamer Setup | 4 Schritte der WorldToScreen-Pipeline |
| **Test_07_Pruefung** | 🔴 **Prüfung** | Transformation mit $x_{\min} < 0$ & $X_{\text{screen}}$ | Pfeilspitzen-Flügelkoordinate berechnen | C#-Tracing: Welford $M_2$ nach 3 Werten | C# SolidColorBrush Freeze() & Caching | Visuelle 2D-Bugs den Ursachen zuordnen |
| **Test_08_Pruefung** | 🔴 **Prüfung** | Maus-Dragging $\Delta X_{\text{world}}$ & $\Delta Y_{\text{world}}$ | Min/Max-Downsampling Datenpunkte pro Pixel | C#-Tracing: DIN-406-Winkelkorrektur | C# Hit-Testing FindNodeAtScreenPos | 4 Schritte der Echtzeit-Plot-Pipeline |
| **Test_09_Pruefung** | 🔴 **Prüfung** | Nutzbare Breite $W_{\text{eff}}$ & Maßstab $s$ | Untere $3\sigma$-Grenze (LCL) aus $M_2$ | C#-Tracing: Pfeilflügel X-Koordinate | C# ScottPlot HorizontalLine & Span | Statistische Kennzahlen (Kap. 04) zuordnen |
| **Test_10_Pruefung** | 🔴 **Prüfung** | Maßstab $s$ & wahre Länge $L_{\text{world}}$ | Welford $M_2$ aus Standardabweichung $s$ | C#-Tracing: Normalenvektor-Komponente | C# ScottPlot 5 Box-Objekt befüllen | WPF-Vektorgrafik-Eigenschaften zuordnen |

---

## 3. Detaillierter Fragen- & Lösungskatalog (Alle 10 Tests)

### Quiz 02 - Test 01 (Vorbereitungstest): 2D-Vektorgrafik, Transformationen & Echtzeit-Diagramme
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_01_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben in Moodle)  

#### Frage 1.1: Affine 2D-Transformation: Uniform Scaling und Y-Inversion (WorldToScreen) *(cloze, 2.0 Pkt.)*

Ein ebenes Brückenfachwerk besitzt die physikalische Ausdehnung $\Delta X = 40\,\text{m}$ (von $x_{\min}=0\,\text{m}$ bis $x_{\max}=40\,\text{m}$) und $\Delta Y = 10\,\text{m}$ (von $y_{\min}=0\,\text{m}$ bis $y_{\max}=10\,\text{m}$). Es soll verzerrungsfrei (Uniform Scaling) auf einem WPF-Canvas mit einer nutzbaren Zeichenfläche (nach Randabzug) von $W_{\text{eff}} = 800\,\text{px}$ Breite und $H_{\text{eff}} = 300\,\text{px}$ Höhe dargestellt werden. Die Gesamthöhe des Canvas beträgt $H_{\text{canvas}} = 360\,\text{px}$, und das Bauteil wird vertikal mit einem unteren Randabstand (Offset) von $\text{offset}_Y = 80\,\text{px}$ vom unteren Bildschirmrand zentriert.

**a)** Berechnen Sie den verzerrungsfreien Skalierungsfaktor $s$ in $\text{px/m}$: {1:NUMERICAL:=20:0.1#Exakt! s = min(800/40, 300/10) = min(20, 30) = 20 px/m.~%50%30:0.1#Teilpunkte: Sie haben max(sx, sy) = 30 px/m statt min(sx, sy) gewählt (Bauteil ragt horizontal aus dem Canvas!).}

**b)** Berechnen Sie die vertikale Bildschirmkoordinate $Y_{\text{screen}}$ (in $\text{px}$) für einen Oberkanten-Knoten bei $y = 7{,}0\,\text{m}$ unter Berücksichtigung der WPF-Y-Achsen-Inversion: {1:NUMERICAL:=140:0.5#Richtig! Y_screen = 360 - (80 + 7.0 * 20) = 360 - 220 = 140 px.~%50%220:0.5#Teilpunkte: 220 px ist der Abstand vom unteren Rand ohne Y-Inversion (360 - 220 = 140 px).}


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

  * **Horizontaler und vertikaler Skalierungsfaktor:** $s_x = \frac{800\,\text{px}}{40\,\text{m}} = 20\,\text{px/m}$, $s_y = \frac{300\,\text{px}}{10\,\text{m}} = 30\,\text{px/m}$.

  * **Uniform Scaling (Verzerrungsfreiheit):** $s = \min(s_x, s_y) = \min(20, 30) = 20\,\text{px/m}$.

  * **Y-Transformation mit Achseninversion:** Da die WPF-Y-Achse nach unten zeigt, gilt $Y_{\text{screen}} = H_{\text{canvas}} - (\text{offset}_Y + (y - y_{\min}) \cdot s) = 360 - (80 + 7{,}0 \cdot 20) = 360 - 220 = 140\,\text{px}$.

---

#### Frage 1.2: Welford-Online-Algorithmus: Laufende Mittelwert-Aktualisierung *(numerical, 1.5 Pkt.)*

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

#### Frage 1.3: C#-Code-Tracing: Allokationsfreier Ringpuffer (Modulo-Arithmetik) *(numerical, 1.5 Pkt.)*

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

#### Frage 1.4: C#-Code-Lückentext: Gedrehte Pfeilspitze im Screen Space konstruieren *(gapselect, 1.0 Pkt.)*

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

#### Frage 1.5: Konzept-Zuordnung: ScottPlot-5-Plottable-Typen für Ingenieursdaten *(matching, 1.0 Pkt.)*

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

#### Frage 1.6: DIN-406-Bemaßung: Warum Pfeilspitzen im Screen Space berechnet werden *(multichoice, 1.0 Pkt.)*

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

#### Frage 1.7: C#-Bug-Diagnose: Bounding-Box-Jitter beim interaktiven Knoten-Dragging *(multichoice, 1.0 Pkt.)*

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

#### Frage 1.8: Systemanalyse: MSAGL-Graphenlayout (Sugiyama vs. Force-Directed) *(multichoice, 1.0 Pkt.)*

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

### Quiz 02 - Test 02 (Vorbereitungstest): Letterboxing-Offsets, Welford-M2 & ScottPlot-Streaming
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_02_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben in Moodle)  

#### Frage 2.1: Affine 2D-Transformation: Letterboxing-Zentrierung und X-Screen-Koordinate *(cloze, 2.0 Pkt.)*

Ein hydraulischer Steuerblock mit den Abmessungen $\Delta X = 2{,}0\,\text{m}$ ($x_{\min}=0\,\text{m}$, $x_{\max}=2{,}0\,\text{m}$) und $\Delta Y = 2{,}0\,\text{m}$ soll mit einem umlaufenden Rand von $\text{margin} = 40\,\text{px}$ verzerrungsfrei auf einem WPF-Canvas der Gesamtgröße $W_{\text{canvas}} = 680\,\text{px}$ mal $H_{\text{canvas}} = 480\,\text{px}$ zentriert werden (nutzbare Fläche $W_{\text{eff}} = 600\,\text{px}$, $H_{\text{eff}} = 400\,\text{px}$). Der uniforme Skalierungsfaktor beträgt $s = 200\,\text{px/m}$.

**a)** Berechnen Sie den gesamten horizontalen Randabstand $\text{offset}_X$ (in $\text{px}$) vom linken Canvas-Rand bis zum Beginn des Bauteils bei $x_{\min}=0\,\text{m}$ (inklusive `margin` und Letterboxing-Zentrierung): {1:NUMERICAL:=140:0.5#Exakt! Gebrauchte Breite = 2.0 * 200 = 400 px; Freiraum = 600 - 400 = 200 px; offset_X = 40 + 200/2 = 140 px.~%50%100:0.5#Teilpunkte: 100 px ist nur der halbe Letterboxing-Freiraum (600-400)/2 ohne den linken Rand margin = 40 px.}

**b)** Berechnen Sie die horizontale Bildschirmkoordinate $X_{\text{screen}}$ (in $\text{px}$) für eine Ventilbohrung bei $x = 1{,}25\,\text{m}$: {1:NUMERICAL:=390:0.5#Richtig! X_screen = 140 + 1.25 * 200 = 140 + 250 = 390 px.~%50%290:0.5#Teilpunkte: Folgefehler aus Teil a (40 px margin vergessen: 40 + 250 = 290 px) oder unzentriert gerechnet.}


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

  * **Belegte Breite in Pixeln:** $W_{\text{used}} = \Delta X \cdot s = 2{,}0\,\text{m} \cdot 200\,\text{px/m} = 400\,\text{px}$.

  * **Horizontaler Letterboxing-Offset:** $\text{offset}_X = \text{margin} + \frac{W_{\text{eff}} - W_{\text{used}}}{2} = 40 + \frac{600 - 400}{2} = 40 + 100 = 140\,\text{px}$.

  * **Bildschirmkoordinate:** $X_{\text{screen}} = \text{offset}_X + (x - x_{\min}) \cdot s = 140 + 1{,}25 \cdot 200 = 390\,\text{px}$.

---

#### Frage 2.2: Welford-Online-Algorithmus: Aktualisierung der Abweichungsquadratsumme M2 *(numerical, 1.5 Pkt.)*

In einer Welford-Statistik-Instanz liegen nach $k-1 = 3$ Messungen der Mittelwert $\mu_3 = 10{,}0\,\text{bar}$ und die Quadratsumme $M_{2,3} = 14{,}0\,\text{bar}^2$ vor. Der $k = 4$-te Messwert beträgt $x_4 = 18{,}0\,\text{bar}$, woraus sich $\Delta_1 = 8{,}0\,\text{bar}$ und der neue Mittelwert $\mu_4 = 12{,}0\,\text{bar}$ ergeben.

Berechnen Sie den neuen Wert der Quadratsumme $M_{2,4}$ (in $\text{bar}^2$) nach dem vierten Messwert.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `62` (± `0.1`) → 100%:** Exakt! Delta_2 = x_4 - mu_4 = 18.0 - 12.0 = 6.0; M2_4 = 14.0 + 8.0 * 6.0 = 14.0 + 48.0 = 62.0 bar^2.
* **Wert `78` (± `0.1`) → 50%:** Teilpunkte: Sie haben M2 + Delta_1^2 = 14 + 64 = 78 gerechnet statt Delta_1 * Delta_2 (mit dem neuen Mittelwert mu_4) zu verwenden!

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

Im Welford-Algorithmus wird $M_2$ mit dem Produkt aus der Abweichung vom *alten* Mittelwert ($\Delta_1 = x_k - \mu_{k-1} = 8{,}0$) und der Abweichung vom *neuen* Mittelwert ($\Delta_2 = x_k - \mu_k = 18{,}0 - 12{,}0 = 6{,}0$) aktualisiert:  

$M_{2,4} = M_{2,3} + \Delta_1 \cdot \Delta_2 = 14{,}0 + 8{,}0 \cdot 6{,}0 = 62{,}0\,\text{bar}^2$.

---

#### Frage 2.3: C#-Code-Tracing: Hit-Testing-Abstandsquadrat im Screen Space *(numerical, 1.5 Pkt.)*

Beim Maus-Klick auf ein WPF-Canvas prüft folgende Methode, ob ein Fachwerkknoten bei `nodeScreen = (120, 200)` innerhalb des Fangradius `snapRadius = 10.0` getroffen wurde:

```csharp
double mouseX = 126.0, mouseY = 192.0;
double dx = mouseX - 120.0;
double dy = mouseY - 200.0;
double distSquared = dx * dx + dy * dy;
```

Welchen numerischen Wert hat `distSquared` (in $\text{px}^2$)?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `100` (± `0.1`) → 100%:** Richtig! dx = 6, dy = -8; distSquared = 6^2 + (-8)^2 = 36 + 64 = 100 px^2.
* **Wert `10` (± `0.1`) → 50%:** Teilpunkte: 10 px ist die gezogene Wurzel ( euklidische Distanz), gefragt war aber distSquared = 100 px^2.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:** $\Delta x = 126 - 120 = 6\,\text{px}$, $\Delta y = 192 - 200 = -8\,\text{px}$. Damit ist $\text{distSquared} = 6^2 + (-8)^2 = 36 + 64 = 100\,\text{px}^2$. Da man im Hit-Testing `distSquared <= snapRadius * snapRadius` prüft, spart man sich den teuren `Math.Sqrt`-Aufruf.

---

#### Frage 2.4: C#-Code-Lückentext: Rücktransformation ScreenToWorld für Maus-Interaktion *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie die Methode `ScreenToWorld` in der Klasse `Transform2D`, die einen Mausklick `(xScreen, yScreen)` zurück in physikalische Weltkoordinaten `(xWorld, yWorld)` umrechnet:

```csharp
public (double xWorld, double yWorld) ScreenToWorld(double xScreen, double yScreen)
{
    double xWorld = XMin + (xScreen - OffsetX) / [[1]];
    double yFromBottom = [[2]] - yScreen;
    double yWorld = YMin + (yFromBottom - [[3]]) / Scale;
    return (xWorld, yWorld);
}
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `Scale`
* `[[2]]` (Gruppe 2): `CanvasHeight`
* `[[3]]` (Gruppe 3): `OffsetY`
* `[[4]]` (Gruppe 1): `CanvasWidth`
* `[[5]]` (Gruppe 1): `OffsetX`
* `[[6]]` (Gruppe 2): `yScreen`
* `[[7]]` (Gruppe 2): `YMax`
* `[[8]]` (Gruppe 3): `XMin`
* `[[9]]` (Gruppe 3): `Scale`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung:** Zur Umkehrung von $X_{\text{screen}} = \text{OffsetX} + (x - X_{\min}) \cdot \text{Scale}$ subtrahiert man `OffsetX` und teilt durch `Scale`. Für Y macht man zuerst die Y-Inversion über `CanvasHeight - yScreen` rückgängig, zieht `OffsetY` ab und teilt durch `Scale`.

---

#### Frage 2.5: Pipeline-Reihenfolge: Die 4 Phasen des Sugiyama-Schichtenlayouts in MSAGL *(ddwtos, 1.0 Pkt.)*

Bringen Sie die **vier klassischen Algorithmus-Phasen des Sugiyama-Schichtenlayouts** (Layered Graph Drawing in MSAGL) in die korrekte Ausführungspipeline:

**Schritt 1:** [[1]] (temporäres Umkehren von Rückwärtskanten, um einen azyklischen Graphen DAG zu erzeugen)  

**Schritt 2:** [[2]] (Einteilung aller Knoten in diskrete horizontale bzw. vertikale Hierarchie-Ebenen)  

**Schritt 3:** [[3]] (Permutieren der Knotenreihenfolge innerhalb der Schichten zur Minimierung von Kantenüberschneidungen)  

**Schritt 4:** [[4]] (Bestimmung der exakten metrischen X/Y-Koordinaten und Spline-Kontrollpunkte)

**Drag-and-Drop-Bausteine (`ddwtos`):**
* `[[1]]` (Gruppe 1): `Cycle Removal (Zyklenbeseitigung)`
* `[[2]]` (Gruppe 1): `Layer Assignment (Schichtenzuweisung)`
* `[[3]]` (Gruppe 1): `Crossing Reduction (Kreuzungsminimierung)`
* `[[4]]` (Gruppe 1): `Coordinate Assignment (Koordinatenberechnung)`
* `[[5]]` (Gruppe 1): `Delaunay Triangulation (Vernetzung)`
* `[[6]]` (Gruppe 1): `Z-Buffer Rasterization (Tiefentest)`

**Musterherleitung & Gesamt-Feedback:**
**Sugiyama-Pipeline:** 1. Cycle Removal $\to$ 2. Layer Assignment $\to$ 3. Crossing Reduction $\to$ 4. Coordinate Assignment & Edge Routing.

---

#### Frage 2.6: WPF-Architektur: Retained Mode (Canvas) vs. Immediate-Mode-nahes DrawingVisual *(multichoice, 1.0 Pkt.)*

In Kapitel 03 wird das klassische `Canvas` mit `Shape`-Elementen (`Line`, `Ellipse`) dem leichtgewichtigen `DrawingVisual` / `DrawingContext` gegenübergestellt. Wann stößt das `Canvas` mit einzelnen `Shape`-Objekten an seine Performance-Grenze?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Wenn tausende Geometrie-Elemente mit 60 Hz neu erzeugt werden, weil jedes Shape ein schweres UIElement mit Layout- und DependencyProperty-Overhead ist.
  * *Feedback:* Richtig! Jedes Shape im Visual Tree durchläuft Measure/Arrange und verwaltet Dutzende DependencyProperties; ab einigen tausend Objekten bricht die Framerate ein.
* [ ] (0%) Sobald mehr als 16 verschiedene Farben im selben Canvas verwendet werden, weil die WPF-Farbpalette pro Panel auf einen 4-Bit-Index beschränkt ist.
  * *Feedback:* Falsch. WPF unterstützt volle 32-Bit-ARGB-Farben für beliebig viele Brushes ohne Palettenlimit.
* [ ] (0%) Wenn das Canvas-Element innerhalb eines Grid-Containers platziert wird, da das Grid alle Kind-Koordinaten automatisch auf den Ursprung zurücksetzt.
  * *Feedback:* Falsch. Ein Canvas innerhalb einer Grid-Zelle behält seine eigene absolute Koordinatenlogik (Canvas.Left/Top) vollständig bei.
* [ ] (0%) Sobald negative Weltkoordinaten im Simulationsmodell auftreten, weil die Klasse Line in WPF nur positive Bildschirm-Koordinatenwerte akzeptiert.
  * *Feedback:* Falsch. Erstens transformiert man Weltkoordinaten ohnehin in positive Screen-Koordinaten, und zweitens akzeptiert Line auch negative double-Werte.

**Musterherleitung & Gesamt-Feedback:**
**Architektur-Vergleich:** Für moderate Objektzahlen (z. B. Fachwerk mit 50–500 Stäben und direktem Hit-Testing/Tooltips) ist `Canvas` ideal. Für Partikelschwärme mit 20.000 Elementen nutzt man `DrawingVisual` oder `WriteableBitmap`.

---

#### Frage 2.7: C#-Bug-Diagnose: Katastrophale Auslöschung bei der naiven Ein-Pass-Varianzformel *(multichoice, 1.0 Pkt.)*

Ein Ingenieur misst einen hochstabilen Systemdruck um $10^8\,\text{Pa}$ mit minimalem Rauschen von $\pm 1\,\text{Pa}$ und berechnet die Varianz in C# mit folgender „Lehrbuch-Verschiebungsformel“:

```csharp
double mean = sumX / n;
double variance = (sumXSquared / n) - (mean * mean);
```

Bei der Ausführung liefert `variance` plötzlich `0.0` oder sogar einen **negativen** Wert! Warum?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Durch die Subtraktion zweier fast identischer Riesenzahlen um 10^16 geht die kleine Varianz in den hinteren Mantissenbits von double durch Auslöschung komplett verloren.
  * *Feedback:* Exakt! IEEE-754 double hat ca. 15–17 signifikante Dezimalstellen. Bei (10^8)^2 = 10^16 liegen die Schwankungen von +-1 Pa genau an der Rundungsgrenze (Catastrophic Cancellation).
* [ ] (0%) In C# wird der Ausdruck mean * mean standardmäßig in 32-Bit-Ganzzahlarithmetik (int) ausgewertet, sodass es ab 46341 zu einem Integer-Overflow kommt.
  * *Feedback:* Falsch. Da mean vom Typ double ist, erfolgt die Multiplikation in 64-Bit-Gleitkommaarithmetik (bis ca. 1.8 * 10^308).
* [ ] (0%) Die Division durch n rundet in C# automatisch auf die nächste ganze Zahl ab, solange der Divisor n als ganzzahliger Typ int deklariert wurde.
  * *Feedback:* Falsch. Sobald der Dividend sumXSquared ein double ist, führt C# eine exakte Gleitkommadivision durch.
* [ ] (0%) Der JIT-Compiler von .NET optimiert aufeinanderfolgende Multiplikationen derselben Variable weg und ersetzt mean * mean fehlerhaft durch 2 * mean.
  * *Feedback:* Falsch. Der JIT-Compiler verändert niemals die mathematische Bedeutung von x * x zu 2 * x.

**Musterherleitung & Gesamt-Feedback:**
**Lösung:** Genau wegen dieser katastrophalen Auslöschung (Catastrophic Cancellation) bei großem Offset und kleiner Streuung verwendet man in der Messtechnik den **Welford-Online-Algorithmus**, der nur Differenzen $x_k - \mu$ quadriert.

---

#### Frage 2.8: Systemanalyse: WPF-Ressourcen-Management & Pen/Brush-Freezing *(multichoice, 1.0 Pkt.)*

Welche **zwei** Maßnahmen steigern die Rendering-Performance und Speichereffizienz beim Zeichnen dynamischer 2D-Vektorgrafiken in WPF signifikant?

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Das Aufrufen von Freeze() auf statischen SolidColorBrush- und Pen-Instanzen macht diese unveränderlich und entfernt den teuren Änderungsbenachrichtigungs-Overhead.
  * *Feedback:* Richtig! Eingefrorene Freezable-Objekte benötigen keine Event-Handler für PropertyChanged mehr und sind zudem thread-safe.
* [x] **(50%)** Häufig benötigte Pinsel und Stifte werden einmalig als statische oder Klassen-Felder angelegt, statt in jedem Render-Frame tausende neue Brush-Objekte zu allokieren.
  * *Feedback:* Richtig! Das gecachte Wiederverwenden von Brushes vermeidet massiven Garbage-Collection-Druck im 60-Hz-Renderloop.
* [ ] (-50%) Jede einzelne Linie auf dem Canvas sollte in ein eigenes verschachteltes Unter-Canvas verpackt werden, um die Tiefensortierung auf der CPU zu beschleunigen.
  * *Feedback:* Falsch. Zusätzliche Container-Elemente blähen den Visual Tree massiv auf und verschlechtern die Layout-Performance.
* [ ] (-50%) Vor jedem Zeichenschritt muss GC.Collect() manuell im UI-Thread aufgerufen werden, damit die Grafikkarte den Videospeicher für neue Linien freigibt.
  * *Feedback:* Falsch. Manuelles GC.Collect() im Renderloop erzwingt teure Stop-the-World-Pausen und verursacht starkes Mikroruckeln.

**Musterherleitung & Gesamt-Feedback:**
**Merksatz:** In WPF gilt für zeitkritische 2D-Grafik: `Brush`/`Pen`-Instanzen einmalig erzeugen, mit `.Freeze()` einfrieren und über alle Frames hinweg wiederverwenden.

---

### Quiz 02 - Test 03 (Vorbereitungstest): Inverse Transformation, 3-Sigma-Grenzen & ScottPlot-Refresh
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_03_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben in Moodle)  

#### Frage 3.1: Inverse 2D-Transformation (ScreenToWorld): Mausklick in Weltkoordinaten umrechnen *(cloze, 2.0 Pkt.)*

Auf einem WPF-Canvas der Gesamthöhe $H_{\text{canvas}} = 500\,\text{px}$ wird ein Maschinenfundament mit $x_{\min} = -5{,}0\,\text{m}$ und $y_{\min} = 0{,}0\,\text{m}$ dargestellt. Die aktuelle Transformation nutzt den uniformen Skalierungsfaktor $s = 40\,\text{px/m}$, den horizontalen Offset $\text{offset}_X = 60\,\text{px}$ und den vertikalen Offset vom unteren Rand $\text{offset}_Y = 50\,\text{px}$. Ein Ingenieur klickt mit der Maus exakt auf die Bildschirmkoordinate $(X_{\text{screen}}, Y_{\text{screen}}) = (300\,\text{px}, 170\,\text{px})$.

**a)** Berechnen Sie die zugehörige physikalische Weltkoordinate $X_{\text{world}}$ in $\text{m}$: {1:NUMERICAL:=1.0:0.05#Exakt! X_world = x_min + (300 - 60) / 40 = -5.0 + 240 / 40 = -5.0 + 6.0 = 1.0 m.~%50%6.0:0.05#Teilpunkte: 6.0 m ist der relative Abstand (300 - 60)/40 ohne Addition des Ursprungswerts x_min = -5.0 m.}

**b)** Berechnen Sie die zugehörige physikalische Weltkoordinate $Y_{\text{world}}$ in $\text{m}$ unter Berücksichtigung der Y-Inversion: {1:NUMERICAL:=7.0:0.05#Richtig! y_bottom = 500 - 170 = 330 px; Y_world = 0.0 + (330 - 50) / 40 = 280 / 40 = 7.0 m.~%50%3.0:0.05#Teilpunkte: Sie haben die Y-Inversion vergessen und direkt (170 - 50) / 40 = 3.0 m gerechnet!}


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung (ScreenToWorld):**

  * **X-Rücktransformation:** $X_{\text{world}} = x_{\min} + \frac{X_{\text{screen}} - \text{offset}_X}{s} = -5{,}0 + \frac{300 - 60}{40} = -5{,}0 + 6{,}0 = 1{,}0\,\text{m}$.

  * **Y-Rücktransformation (inkl. Y-Inversion):** Abstand vom unteren Rand $y_{\text{bottom}} = H_{\text{canvas}} - Y_{\text{screen}} = 500 - 170 = 330\,\text{px}$. Damit gilt $Y_{\text{world}} = y_{\min} + \frac{330 - \text{offset}_Y}{s} = 0{,}0 + \frac{330 - 50}{40} = \frac{280}{40} = 7{,}0\,\text{m}$.

---

#### Frage 3.2: Statistische Prozesskontrolle (SPC): Obere 3-Sigma-Warngrenze aus Welford-Daten *(numerical, 1.5 Pkt.)*

Ein Welford-Online-Tracker hat für die Spindeldrehzahl einer CNC-Fräse nach $k = 26$ Messwerten den Mittelwert $\mu = 100{,}0\,\text{U/s}$ und die Abweichungsquadratsumme $M_2 = 400{,}0\,(\text{U/s})^2$ ermittelt. Im Live-Diagramm soll die obere statistische Prozesskontrollgrenze (Upper Control Limit) bei $\text{UCL} = \mu + 3 \cdot s$ (mit der empirischen Stichprobenstandardabweichung $s$) als horizontale Warnlinie eingezeichnet werden.

Berechnen Sie den numerischen Wert dieser oberen $3\sigma$-Grenze $\text{UCL}$ in $\text{U/s}$.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `112` (± `0.1`) → 100%:** Exakt! Stichprobenvarianz s^2 = M2 / (k - 1) = 400 / 25 = 16; Standardabweichung s = 4.0 U/s; UCL = 100 + 3 * 4.0 = 112.0 U/s.
* **Wert `148` (± `0.5`) → 50%:** Teilpunkte: Sie haben mu + 3 * s^2 = 100 + 3 * 16 = 148 gerechnet (Wurzelziehen für die Standardabweichung s vergessen!).
* **Wert `111.77` (± `0.1`) → 50%:** Teilpunkte: Sie haben durch k = 26 statt durch k - 1 = 25 (Bessel-Korrektur für Stichprobenvarianz) geteilt.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

  * **Empirische Stichprobenvarianz (mit Bessel-Korrektur):** $s^2 = \frac{M_2}{k - 1} = \frac{400{,}0}{26 - 1} = \frac{400{,}0}{25} = 16{,}0\,(\text{U/s})^2$.

  * **Standardabweichung:** $s = \sqrt{16{,}0} = 4{,}0\,\text{U/s}$.

  * **Obere $3\sigma$-Grenze:** $\text{UCL} = \mu + 3s = 100{,}0 + 3 \cdot 4{,}0 = 112{,}0\,\text{U/s}$.

---

#### Frage 3.3: C#-Code-Tracing: Gruppiertes Balkendiagramm (Bar Plot Offset) in ScottPlot 5 *(numerical, 1.5 Pkt.)*

Um in ScottPlot 5 für jede Kategorie `i` zwei Balken (Soll vs. Ist) nebeneinander ohne Überlappung zu zeichnen, wird folgender C#-Code ausgeführt:

```csharp
int categoryIndex = 3;
double groupWidth = 0.6;
double singleBarWidth = groupWidth / 2.0;
double rightBarCenter = categoryIndex + singleBarWidth / 2.0;
```

Welchen numerischen X-Positionswert besitzt `rightBarCenter`?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `3.15` (± `0.01`) → 100%:** Richtig! singleBarWidth = 0.3; rightBarCenter = 3 + 0.3 / 2.0 = 3.15.
* **Wert `3.3` (± `0.01`) → 50%:** Teilpunkte: Sie haben um die volle Balkenbreite singleBarWidth = 0.3 statt um die halbe Balkenbreite 0.15 verschoben (Lücke zwischen den Balken!).

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:** Jeder der zwei Einzelbalken hat die Breite $w = \frac{0{,}6}{2} = 0{,}3$. Da die Balken bei der Kategorienmitte $x = 3$ aneinanderstoßen sollen, liegt die Mitte des linken Balkens bei $3 - \frac{0{,}3}{2} = 2{,}85$ und die Mitte des rechten Balkens bei $3 + \frac{0{,}3}{2} = 3{,}15$.

---

#### Frage 3.4: C#-Code-Lückentext: Welford-Online-Update in C# implementieren *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie die C#-Methode `AddSample(double x)` für die numerisch stabile Online-Berechnung von Mittelwert und Varianz nach Welford:

```csharp
public void AddSample(double x)
{
    Count++;
    double delta1 = x - [[1]];
    Mean += delta1 / [[2]];
    double delta2 = x - [[3]];
    M2 += delta1 * delta2;
}
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `Mean`
* `[[2]]` (Gruppe 2): `Count`
* `[[3]]` (Gruppe 3): `Mean`
* `[[4]]` (Gruppe 1): `M2`
* `[[5]]` (Gruppe 1): `Count`
* `[[6]]` (Gruppe 2): `Count - 1`
* `[[7]]` (Gruppe 2): `M2`
* `[[8]]` (Gruppe 3): `delta1`
* `[[9]]` (Gruppe 3): `M2`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung:** Zuerst wird `delta1 = x - Mean` (mit dem *alten* Mittelwert) berechnet, danach `Mean += delta1 / Count` aktualisiert, und schließlich `delta2 = x - Mean` (mit dem bereits *aktualisierten* Mittelwert) bestimmt, bevor `M2 += delta1 * delta2` ausgeführt wird.

---

#### Frage 3.5: Konzept-Zuordnung: Geometrie- und Layout-Komponenten in Kapitel 03 & 04 *(matching, 1.0 Pkt.)*

Ordnen Sie den vier technischen Anforderungen aus Kapitel 03 und 04 jeweils die passende Klasse bzw. Methode zu (beachten Sie die zwei Überhang-Distraktoren).

**Zuordnungspaare & Überhang-Distraktoren (`matching`):**
* Hierarchisches Schichtenlayout für gerichtete Signalflussgraphen mit automatischer Kreuzungsminimierung $\to$ **SugiyamaLayoutSettings (MSAGL Layered Layout)**
* Kräftebasiertes Layout für ungerichtete Kommunikations- oder Rohrknotennetze anhand idealer Kantenlängen $\to$ **MdsLayoutSettings / FastIncrementalLayoutSettings (MSAGL)**
* Leichtgewichtige WPF-Zeichenschicht für zehntausende Primitiven ohne einzelnen UIElement-Layout-Overhead $\to$ **DrawingVisual mit DrawingContext.DrawLine()**
* Verzerrungsfreie Einpassung eines Bauteils in das Canvas unter Beibehaltung des Seitenverhältnisses $\to$ **Math.Min(scaleX, scaleY) mit Letterboxing-Zentrierung**
* *(Überhang-Distraktor)* $\to$ Math.Max(scaleX, scaleY) mit anisotroper Streckung
* *(Überhang-Distraktor)* $\to$ WriteableBitmap.AddDirtyRect() mit 3D-Tiefenpuffer

**Musterherleitung & Gesamt-Feedback:**
**Lösung:** `SugiyamaLayoutSettings` erzeugt hierarchische Ebenen, `MdsLayoutSettings` nutzt Distanz-/Kräfteminimierung, `DrawingVisual` umgeht den UIElement-Overhead und `Math.Min(scaleX, scaleY)` sichert die Winkeltreue.

---

#### Frage 3.6: ScottPlot 5 Performance: Warum Signal-Plots bei großen Zeitreihen schneller sind als Scatter-Plots *(multichoice, 1.0 Pkt.)*

Warum kann ein `Signal`-Plot in **ScottPlot 5** eine Zeitreihe mit $10\,\text{Millionen}$ Messpunkten flüssig mit $60\,\text{FPS}$ zoomen und schwenken, während ein `Scatter`-Plot bei derselben Punktanzahl merklich einbricht?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Weil Signal ein festes Abtastintervall voraussetzt und dadurch sichtbare Indexbereiche in O(1) berechnet sowie pro Pixelspalte nur Min/Max-Extrema zeichnet.
  * *Feedback:* Richtig! Durch die Äquidistanz entfällt das X-Array komplett; der sichtbare Array-Ausschnitt steht sofort fest und wird spaltenweise auf Min/Max-Linien reduziert.
* [ ] (0%) Weil Signal alle Gleitkommawerte beim Laden automatisch auf 8-Bit-Ganzzahlen rundet und damit 87,5 Prozent des Arbeitsspeichers verwirft.
  * *Feedback:* Falsch. Signal arbeitet unverändert mit der vollen double- oder float-Präzision des übergebenen Arrays.
* [ ] (0%) Weil Scatter-Plots in ScottPlot 5 grundsätzlich keine Hardwarebeschleunigung unterstützen und jeden Punkt einzeln über die Windows-Registry protokollieren.
  * *Feedback:* Falsch. Beide Plottables nutzen SkiaSharp zum Rendern; der Unterschied liegt im Speicherlayout und im Index-Zugriff.
* [ ] (0%) Weil Signal-Plots intern nur jeden tausendsten Messwert im Speicher behalten und alle hochfrequenten Spitzenwerte beim Import dauerhaft löschen.
  * *Feedback:* Falsch. Durch das Min/Max-Spalten-Downsampling bleiben gerade alle Spitzen (Peaks/Ausreißer) visuell exakt erhalten, und beim Hineinzoomen erscheinen alle Einzelpunkte.

**Musterherleitung & Gesamt-Feedback:**
**Technischer Hintergrund:** Bei äquidistanten Zeitreihen ist $i = \lfloor (t - t_0) / \Delta t \rfloor$ in $\mathcal{O}(1)$ berechenbar. Für jede Bildschirmspalte (z. B. 1000 Pixel breit) bestimmt `Signal` das Minimum und Maximum des zugehörigen Index-Slices und zeichnet nur einen vertikalen Strich pro Pixelspalte.

---

#### Frage 3.7: C#-Bug-Diagnose: Hohe CPU-Last durch verfrühtes WpfPlot.Refresh() in Schleifen *(multichoice, 1.0 Pkt.)*

In einer Mehrkanal-Überwachung werden 50 Temperatursensoren mit jeweils $100\,\text{Hz}$ ausgelesen. Der folgende Code führt sofort zu $100\,\%$ CPU-Auslastung und einer eingefrorenen WPF-Oberfläche:

```csharp
void OnSensorPacketReceived(double[] channelValues) {
    for (int ch = 0; ch < 50; ch++) {
        _streamers[ch].Add(channelValues[ch]);
        MainPlot.Refresh();
    }
}
```

Worin liegt der gravierende Architekturfehler in dieser Methode?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** MainPlot.Refresh() wird innerhalb der Kanal-Schleife 50-mal pro Paket aufgerufen und erzwingt damit 5000 komplette SkiaSharp-Renderdurchläufe pro Sekunde.
  * *Feedback:* Exakt! Datenaufnahme (.Add) und Bildschirmdarstellung (.Refresh) müssen entkoppelt werden: Refresh() gehört aus der Schleife heraus in einen 30/60-Hz-UI-Timer.
* [ ] (0%) Die Methode DataStreamer.Add() kopiert bei jedem Aufruf die gesamte Festplatte auf die Grafikkarte, weshalb maximal ein Kanal pro Anwendung erlaubt ist.
  * *Feedback:* Falsch. DataStreamer.Add() schreibt nur einen einzelnen double-Wert in einen extrem schnellen RAM-Ringpuffer (wenige Nanosekunden).
* [ ] (0%) In C# dürfen Arrays vom Typ double[] nicht als Methodenparameter übergeben werden, ohne zuvor mit dem Schlüsselwort fixed im Speicher gepinnt zu werden.
  * *Feedback:* Falsch. Normale verwaltete Array-Referenzen werden in C# ohne fixed-Block völlig problemlos als Referenz übergeben.
* [ ] (0%) Die Laufvariable ch der for-Schleife muss als double deklariert werden, da ganzzahlige Indizes in ScottPlot 5 eine teure Typkonvertierung auslösen.
  * *Feedback:* Falsch. Array- und Listenindizes in C# sind nativ vom Typ int.

**Musterherleitung & Gesamt-Feedback:**
**Best Practice (Kapitel 04):** Sensordaten werden im Hintergrund oder im Paket-Handler ausschließlich in den Ringpuffer geschrieben (`_streamers[ch].Add(...)`). Ein separater `DispatcherTimer` mit $30\text{–}60\,\text{Hz}$ ruft genau einmal pro Frame `MainPlot.Refresh()` auf.

---

#### Frage 3.8: Systemanalyse: DIN-406-Bemaßungsgeometrie & Vektornormalen im 2D-Raum *(multichoice, 1.0 Pkt.)*

Welche **zwei** geometrischen Aussagen treffen auf die programmgesteuerte Konstruktion einer normgerechten **DIN-406-Bemaßung** für einen schräg im 2D-Raum liegenden Fachwerkstab zu?

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Die Maßlinie verläuft exakt parallel zum Stab in einem festen Normalenabstand, während die beiden Maßhilfslinien senkrecht vom Stab über die Maßlinie hinausragen.
  * *Feedback:* Richtig! Der Normalenvektor (-uy, ux) verschiebt die Maßlinie parallel zum Stab; die Maßhilfslinien besitzen zudem einen normierten Überstand von ca. 2–3 mm (bzw. 6–8 px).
* [x] **(50%)** Der Drehwinkel der Maßzahl wird mit Math.Atan2(dy, dx) bestimmt und bei Kopfüber-Winkeln um 180 Grad korrigiert, damit der Text von unten oder rechts lesbar bleibt.
  * *Feedback:* Richtig! Nach DIN 406 dürfen Maßzahlen niemals auf dem Kopf stehen; liegt der Winkel zwischen +90° und +180° bzw. -90° und -180°, wird die Textorientierung gedreht.
* [ ] (-50%) Maßlinien dürfen in technischen Zeichnungen grundsätzlich nur streng horizontal oder streng vertikal am Bildschirmrand ausgerichtet werden, niemals parallel zu schrägen Stäben.
  * *Feedback:* Falsch. Gerade für die wahre Stablänge schräger Bauteile wird die Maßlinie parallel zur Bauteilkante orientiert.
* [ ] (-50%) Der senkrechte 2D-Normalenvektor zu einem Einheitsrichtungsvektor (ux, uy) ergibt sich durch Quadrieren beider Komponenten zu (ux * ux, uy * uy).
  * *Feedback:* Falsch. Ein 90°-gedrehter Normalenvektor entsteht durch Vertauschen und Vorzeichenwechsel einer Komponente: (-uy, ux) oder (uy, -ux).

**Musterherleitung & Gesamt-Feedback:**
**Zusammenfassung:** Eine saubere CAD-Bemaßung nutzt den Einheitsrichtungsvektor $\vec{u} = (u_x, u_y)$ entlang des Stabs und den Einheitsnormalenvektor $\vec{n} = (-u_y, u_x)$ senkrecht dazu, kombiniert mit einer Lesbarkeitskorrektur des Textwinkels.

---

### Quiz 02 - Test 04 (Prüfungstest): Vertikales Letterboxing, Welford-Varianz & Box-Plot-IQR
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_04_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 4.1: Affine 2D-Transformation: Vertikaler Letterboxing-Offset und Y-Screen-Position *(cloze, 2.0 Pkt.)*

Ein Portalkran mit der Breite $\Delta X = 25\,\text{m}$ ($x_{\min}=0\,\text{m}$, $x_{\max}=25\,\text{m}$) und der Höhe $\Delta Y = 5\,\text{m}$ ($y_{\min}=0\,\text{m}$, $y_{\max}=5\,\text{m}$) wird auf einem WPF-Canvas der Gesamthöhe $H_{\text{canvas}} = 460\,\text{px}$ mit umlaufendem Rand $\text{margin} = 30\,\text{px}$ dargestellt. Die nutzbare Zeichenfläche beträgt $W_{\text{eff}} = 500\,\text{px}$ mal $H_{\text{eff}} = 400\,\text{px}$. Der uniforme Skalierungsfaktor wurde bereits zu $s = 20\,\text{px/m}$ bestimmt.

**a)** Berechnen Sie den gesamten vertikalen Randabstand $\text{offset}_Y$ (in $\text{px}$) vom unteren Canvas-Rand bis zur Bauteilunterkante $y_{\min}=0\,\text{m}$ (inklusive `margin` und vertikaler Letterboxing-Zentrierung): {1:NUMERICAL:=180:0.5#Exakt! Belegte Höhe = 5 * 20 = 100 px; Freiraum = 400 - 100 = 300 px; offset_Y = 30 + 300/2 = 180 px.~%50%150:0.5#Teilpunkte: 150 px ist nur der halbe Freiraum (400-100)/2 ohne den unteren Rand margin = 30 px.}

**b)** Berechnen Sie die vertikale Bildschirmkoordinate $Y_{\text{screen}}$ (in $\text{px}$) für die Laufkatze auf Höhe $y = 4{,}0\,\text{m}$ unter Beachtung der WPF-Y-Inversion: {1:NUMERICAL:=200:0.5#Richtig! Y_screen = 460 - (180 + 4.0 * 20) = 460 - 260 = 200 px.~%50%260:0.5#Teilpunkte: 260 px ist der Abstand vom unteren Rand ohne Y-Inversion (460 - 260 = 200 px).}


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

  * **Belegte Höhe:** $H_{\text{used}} = \Delta Y \cdot s = 5\,\text{m} \cdot 20\,\text{px/m} = 100\,\text{px}$.

  * **Vertikaler Offset:** $\text{offset}_Y = \text{margin} + \frac{H_{\text{eff}} - H_{\text{used}}}{2} = 30 + \frac{400 - 100}{2} = 180\,\text{px}$.

  * **Y-Screen mit Inversion:** $Y_{\text{screen}} = H_{\text{canvas}} - (\text{offset}_Y + y \cdot s) = 460 - (180 + 80) = 200\,\text{px}$.

---

#### Frage 4.2: Welford-Online-Algorithmus: Empirische Stichprobenvarianz aus M2 berechnen *(numerical, 1.5 Pkt.)*

Nach $k = 9$ Kraftmessungen an einer Hydraulikpresse enthält das Welford-Statistikobjekt den laufenden Mittelwert $\mu_9 = 45{,}0\,\text{kN}$ sowie die kumulierte Abweichungsquadratsumme $M_{2,9} = 72{,}0\,\text{kN}^2$.

Berechnen Sie die erwartungstreue empirische Stichprobenvarianz $s^2$ (in $\text{kN}^2$) dieser Messreihe.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `9` (± `0.05`) → 100%:** Exakt! Mit Bessel-Korrektur gilt s^2 = M2 / (k - 1) = 72.0 / (9 - 1) = 72.0 / 8 = 9.0 kN^2.
* **Wert `8` (± `0.05`) → 50%:** Teilpunkte: Sie haben durch k = 9 (Populationsvarianz) statt durch k - 1 = 8 (erwartungstreue Stichprobenvarianz) geteilt.
* **Wert `3` (± `0.05`) → 50%:** Teilpunkte: 3.0 kN ist die Standardabweichung s = sqrt(9), gefragt war aber die Varianz s^2 = 9.0 kN^2.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:** Für die erwartungstreue Stichprobenvarianz gilt $s^2 = \frac{M_{2,k}}{k - 1} = \frac{72{,}0}{9 - 1} = 9{,}0\,\text{kN}^2$.

---

#### Frage 4.3: C#-Code-Tracing: Box-Whisker-Plot Interquartilsabstand (IQR) und oberes Whisker-Limit *(numerical, 1.5 Pkt.)*

Für einen Box-Whisker-Plot nach Tukey in ScottPlot 5 werden aus einem sortierten Array von Drehmoment-Messwerten (in $\text{Nm}$) das erste Quartil `q1` und das dritte Quartil `q3` bestimmt:

```csharp
double q1 = 20.0;
double median = 24.0;
double q3 = 30.0;
double iqr = q3 - q1;
double upperWhiskerLimit = q3 + 1.5 * iqr;
```

Welchen numerischen Wert (in $\text{Nm}$) erhält `upperWhiskerLimit`?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `45` (± `0.1`) → 100%:** Richtig! iqr = 30.0 - 20.0 = 10.0 Nm; upperWhiskerLimit = 30.0 + 1.5 * 10.0 = 45.0 Nm.
* **Wert `39` (± `0.1`) → 50%:** Teilpunkte: Sie haben 1.5 * iqr auf den Median (24 + 15 = 39) statt auf das obere Quartil q3 = 30 addiert.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:** Der Interquartilsabstand beträgt $\text{IQR} = Q_3 - Q_1 = 30{,}0 - 20{,}0 = 10{,}0\,\text{Nm}$. Die obere Antennengrenze (Tukey-Fence) liegt bei $Q_3 + 1{,}5 \cdot \text{IQR} = 30{,}0 + 15{,}0 = 45{,}0\,\text{Nm}$.

---

#### Frage 4.4: C#-Code-Lückentext: Allokationsfreier Ringpuffer (Circular Buffer) – Einfügen & Überschreiben *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie die Methode `Push(double val)` eines allokationsfreien Ringpuffers fester Kapazität `Capacity`, der bei vollem Puffer das älteste Element am Index `_head` überschreibt:

```csharp
public void Push(double val)
{
    int writeIdx = (_head + _count) % [[1]];
    _buffer[writeIdx] = val;
    if (_count < Capacity)
        [[2]]++;
    else
        _head = (_head + 1) % [[3]];
}
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `Capacity`
* `[[2]]` (Gruppe 2): `_count`
* `[[3]]` (Gruppe 3): `Capacity`
* `[[4]]` (Gruppe 1): `_count`
* `[[5]]` (Gruppe 1): `_head`
* `[[6]]` (Gruppe 2): `_head`
* `[[7]]` (Gruppe 2): `writeIdx`
* `[[8]]` (Gruppe 3): `_count`
* `[[9]]` (Gruppe 3): `writeIdx`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung:** Der Schreibindex wickelt sich mittels Modulo `Capacity` um das Array-Ende. Solange der Puffer noch nicht voll ist, wächst `_count`; sobald `_count == Capacity` erreicht ist, wandert der Lesezeiger `_head` mit Modulo `Capacity` um eins weiter.

---

#### Frage 4.5: Pipeline-Reihenfolge: Numerisch stabiler Einzelschritt im Welford-Online-Algorithmus *(ddwtos, 1.0 Pkt.)*

Bringen Sie die **vier Rechenschritte des Welford-Online-Algorithmus** beim Eintreffen eines neuen Messwerts $x_k$ in die zwingend erforderliche Ausführungsreihenfolge:

**Schritt 1:** [[1]] (Stichprobenumfang erhöhen und Differenz zum bisherigen Mittelwert bilden)  

**Schritt 2:** [[2]] (Laufenden Mittelwert anteilig mit dem neuen Stichprobenumfang korrigieren)  

**Schritt 3:** [[3]] (Differenz des Messwerts zum bereits aktualisierten neuen Mittelwert bestimmen)  

**Schritt 4:** [[4]] (Produkt aus alter und neuer Differenz zur Quadratsumme addieren)

**Drag-and-Drop-Bausteine (`ddwtos`):**
* `[[1]]` (Gruppe 1): `k = k + 1 und Delta_1 = x_k - mu_{k-1}`
* `[[2]]` (Gruppe 1): `mu_k = mu_{k-1} + Delta_1 / k`
* `[[3]]` (Gruppe 1): `Delta_2 = x_k - mu_k`
* `[[4]]` (Gruppe 1): `M2_k = M2_{k-1} + Delta_1 * Delta_2`
* `[[5]]` (Gruppe 1): `M2_k = M2_{k-1} + x_k * x_k - mu_k * mu_k`
* `[[6]]` (Gruppe 1): `mu_k = (mu_{k-1} + x_k) / 2.0`

**Musterherleitung & Gesamt-Feedback:**
**Welford-Reihenfolge:** Entscheidend ist, dass $\Delta_1$ vor dem Mittelwert-Update und $\Delta_2$ *nach* dem Mittelwert-Update berechnet wird, damit $\Delta_1 \cdot \Delta_2$ exakt die neue Quadratsumme liefert.

---

#### Frage 4.6: Koordinatentransformation: Warum anisotrope Skalierung (sx != sy) in CAD-Zeichnungen verboten ist *(multichoice, 1.0 Pkt.)*

Was passiert geometrisch mit einer technischen 2D-Konstruktionszeichnung, wenn man beim Anpassen an ein breitformatiges WPF-Canvas die horizontale Skalierung $s_x = W_{\text{eff}} / \Delta X$ und die vertikale Skalierung $s_y = H_{\text{eff}} / \Delta Y$ getrennt ohne Minimumbildung anwendet ($s_x \neq s_y$)?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Kreise entarten zu Ellipsen, rechte Winkel zwischen Stäben und Maßhilfslinien gehen verloren und schräge Stablängen werden richtungsabhängig verzerrt.
  * *Feedback:* Richtig! Nur eine uniforme Skalierung (s_x = s_y = min) ist winkeltreu (konform) und erhält das Verhältnis aller Längen unabhängig von der Orientierung.
* [ ] (0%) Die Bauteilgeometrie bleibt vollkommen winkeltreu, aber alle negativen Koordinatenwerte werden automatisch an der X-Achse gespiegelt.
  * *Feedback:* Falsch. Solange sx und sy positiv sind, findet durch unterschiedliche Beträge keine Spiegelung, wohl aber eine massive Winkelverzerrung statt.
* [ ] (0%) Das WPF-Layoutsystem wirft zur Laufzeit eine InvalidOperationException, sobald eine Line unterschiedliche X- und Y-Maßstäbe verwendet.
  * *Feedback:* Falsch. WPF kennt die Bedeutung Ihrer Modellkoordinaten nicht und zeichnet die verzerrten Pixelkoordinaten ohne Fehlermeldung.
* [ ] (0%) Alle horizontalen Stäbe werden auf die Länge Null verkürzt, während vertikale Stäbe über den oberen Bildschirmrand hinaus verschoben werden.
  * *Feedback:* Falsch. Horizontale Stäbe füllen bei sx = Weff/dX exakt die nutzbare Breite aus, werden also nicht auf Null verkürzt.

**Musterherleitung & Gesamt-Feedback:**
**Geometrisches Prinzip:** Technische Zeichnungen erfordern Winkeltreue. Wenn $s_x \neq s_y$ ist, steht ein im World Space konstruierter Normalenvektor im Screen Space nicht mehr senkrecht auf dem Stab!

---

#### Frage 4.7: C#-Bug-Diagnose: Speicherleck durch Canvas.Children.Add ohne Clear im Render-Loop *(multichoice, 1.0 Pkt.)*

In einer dynamischen Kinematik-Simulation wird die Methode `DrawMechanism()` 60-mal pro Sekunde vom `CompositionTarget.Rendering`-Event aufgerufen. Nach zwei Minuten wird das Programm extrem träge und belegt mehrere Gigabyte RAM:

```csharp
void DrawMechanism() {
    foreach (var bar in _bars) {
        var line = new Line { X1 = bar.X1, Y1 = bar.Y1, X2 = bar.X2, Y2 = bar.Y2, Stroke = _pen };
        SimCanvas.Children.Add(line);
    }
}
```

Was ist die Ursache für diesen Speicher- und Performance-Einbruch?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Es fehlt SimCanvas.Children.Clear() vor der Schleife, sodass in jedem Frame neue Line-Objekte über die alten gestapelt werden und der Visual Tree endlos wächst.
  * *Feedback:* Exakt! Im Retained Mode von WPF bleiben alle hinzugefügten Kinder dauerhaft im Speicher und werden in jedem Frame mitgerendert, bis man sie entfernt oder wiederverwendet.
* [ ] (0%) Die foreach-Schleife kopiert das gesamte Array _bars bei jedem Durchlauf auf die Festplatte, weshalb zwingend eine rückwärts laufende for-Schleife nötig ist.
  * *Feedback:* Falsch. Eine foreach-Schleife über ein Array oder eine Liste erzeugt keinerlei Festplattenzugriffe.
* [ ] (0%) Die Klasse Line besitzt in WPF einen internen Hardware-Timer, der pro Instanz einen eigenen Hintergrund-Thread im Betriebssystem startet.
  * *Feedback:* Falsch. Line ist ein UIElement auf dem UI-Thread und startet keine eigenen Threads.
* [ ] (0%) Die Koordinaten X1 bis Y2 müssen nach dem Hinzufügen zum Canvas auf NaN gesetzt werden, damit der Garbage Collector die Linie freigeben kann.
  * *Feedback:* Falsch. Solange die Line-Referenz in SimCanvas.Children gehalten wird, darf der Garbage Collector sie ohnehin nicht freigeben.

**Musterherleitung & Gesamt-Feedback:**
**Lösung:** Entweder ruft man zu Beginn von `DrawMechanism()` `SimCanvas.Children.Clear()` auf, oder – noch besser – man legt die `Line`-Instanzen einmalig an und aktualisiert im Renderloop nur deren Koordinaten `X1, Y1, X2, Y2`.

---

#### Frage 4.8: Systemanalyse: ScottPlot 5 DataStreamer-Darstellungsmodi (Wipe vs. Scroll) *(multichoice, 1.0 Pkt.)*

Welche **zwei** Aussagen beschreiben die Funktionsweise des `DataStreamer` in **ScottPlot 5** bei der Echtzeit-Visualisierung kontinuierlicher Sensorsignale korrekt?

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Im Wipe-Modus (EKG-Ansicht) wandert ein Schreibzeiger von links nach rechts durch das feste Array und überschreibt zyklisch die ältesten Messwerte vor einer kleinen Lücke.
  * *Feedback:* Richtig! Wie bei einem medizinischen Patientenmonitor bleibt die Kurve an Ort und Stelle stehen, während der Cursor die ältesten Daten überschreibt.
* [x] **(50%)** Da der DataStreamer intern ein vorallokiertes Array fester Länge wiederverwendet, löst das Hinzufügen neuer Messwerte via Add() keine Heap-Allokationen aus.
  * *Feedback:* Richtig! Durch die feste Puffergröße arbeitet DataStreamer.Add() in O(1) ohne Garbage-Collector-Belastung.
* [ ] (-50%) Der DataStreamer vergrößert sein internes Array bei jedem Aufruf von Add() automatisch auf das Doppelte, um sämtliche historischen Daten seit Programmstart zu sichern.
  * *Feedback:* Falsch. Das beschreibt den wachsenden DataLogger, nicht den auf eine feste Fensterbreite begrenzten DataStreamer.
* [ ] (-50%) Für jeden neuen Messwert im DataStreamer muss ein vollständiger Zeitstempel vom Typ DateTime übergeben werden, da äquidistante Abtastung nicht unterstützt wird.
  * *Feedback:* Falsch. DataStreamer arbeitet gerade mit äquidistanter Abtastung (Period) und nimmt über Add(double value) reine Y-Werte entgegen.

**Musterherleitung & Gesamt-Feedback:**
**Zusammenfassung:** `DataStreamer` nutzt einen festen Ringpuffer für die letzten $N$ Samples und bietet die Ansichten `ViewWipeRight()` (stehende Kurve mit Überschreib-Cursor) sowie `ViewScrollLeft()` (durchlaufendes Band).

---

### Quiz 02 - Test 05 (Prüfungstest): Stablänge im Screen Space, ScottPlot-Abtastrate & MSAGL
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_05_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 5.1: Affine 2D-Transformation: Uniform Scaling und resultierende Stablänge im Screen Space *(cloze, 2.0 Pkt.)*

Ein ebenes Kragarm-Fachwerk besitzt eine Gesamtbreite von $\Delta X = 12\,\text{m}$ und eine Gesamthöhe von $\Delta Y = 8\,\text{m}$. Es wird verzerrungsfrei (Uniform Scaling) in ein nutzbares WPF-Canvas-Rechteck von $W_{\text{eff}} = 600\,\text{px}$ Breite und $H_{\text{eff}} = 320\,\text{px}$ Höhe eingepasst. Im Fachwerk befindet sich ein schräger Diagonalstab, der den Knoten $A(0\,\text{m}, 0\,\text{m})$ mit dem Knoten $B(3{,}0\,\text{m}, 4{,}0\,\text{m})$ verbindet.

**a)** Berechnen Sie den verzerrungsfreien uniformen Skalierungsfaktor $s$ in $\text{px/m}$: {1:NUMERICAL:=40:0.1#Exakt! s = min(600/12, 320/8) = min(50, 40) = 40 px/m.~%50%50:0.1#Teilpunkte: Sie haben sx = 600/12 = 50 px/m statt min(50, 40) = 40 px/m gewählt.}

**b)** Berechnen Sie die euklidische Länge $L_{\text{screen}}$ (in $\text{px}$) dieses Diagonalstabs $\overline{AB}$ auf dem Bildschirm nach der Transformation: {1:NUMERICAL:=200:0.5#Richtig! Physikalische Länge L = sqrt(3^2 + 4^2) = 5.0 m; L_screen = 5.0 m * 40 px/m = 200 px.~%50%250:0.5#Teilpunkte: Folgefehler aus Teil a (5.0 m * 50 px/m = 250 px) oder Manhattan-Distanz (3+4)*40 = 280 px.}


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

  * **Uniform Scaling:** $s_x = \frac{600}{12} = 50\,\text{px/m}$, $s_y = \frac{320}{8} = 40\,\text{px/m} \implies s = \min(50, 40) = 40\,\text{px/m}$.

  * **Stablänge im World Space:** $L_{\text{world}} = \sqrt{(3{,}0 - 0)^2 + (4{,}0 - 0)^2} = \sqrt{9 + 16} = 5{,}0\,\text{m}$.

  * **Stablänge im Screen Space:** Da die Skalierung uniform ist, gilt $L_{\text{screen}} = s \cdot L_{\text{world}} = 40\,\text{px/m} \cdot 5{,}0\,\text{m} = 200\,\text{px}$.

---

#### Frage 5.2: ScottPlot 5 Signal-Konfiguration: Zeitdauer eines Ringpuffer-Fensters berechnen *(numerical, 1.5 Pkt.)*

Ein Schwingungssensor an einem Getriebeprüfstand tastet die Beschleunigung mit einer festen Abtastfrequenz von $f_s = 250\,\text{Hz}$ (d. h. Abtastperiode $\Delta t = 0{,}004\,\text{s}$) ab. In ScottPlot 5 wird ein `DataStreamer` mit einer festen Pufferkapazität von $N = 1500$ Datenpunkten initialisiert.

Welche physikalische Zeitspanne $T_{\text{window}}$ (in **Sekunden**) ist im Diagrammfenster gleichzeitig sichtbar, sobald der Puffer vollständig gefüllt ist?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `6` (± `0.05`) → 100%:** Exakt! T_window = N / f_s = 1500 / 250 Hz = 6.0 s (bzw. 1500 * 0.004 s = 6.0 s).
* **Wert `6000` (± `10`) → 50%:** Teilpunkte: 6000 ms ist die Dauer in Millisekunden, gefragt war der Wert in Sekunden (6.0 s).
* **Wert `0.1667` (± `0.01`) → 50%:** Teilpunkte: Kehrwertfehler! Sie haben f_s / N = 250 / 1500 = 0.1667 statt N / f_s = 6.0 s gerechnet.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:** Bei $N = 1500$ Abtastpunkten und $\Delta t = \frac{1}{f_s} = \frac{1}{250\,\text{Hz}} = 0{,}004\,\text{s}$ umfasst das sichtbare Zeitfenster $T_{\text{window}} = N \cdot \Delta t = \frac{1500}{250} = 6{,}0\,\text{s}$.

---

#### Frage 5.3: C#-Code-Tracing: Einheitsrichtungsvektor und Maßlinien-Versatz (DIN 406) *(numerical, 1.5 Pkt.)*

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

#### Frage 5.4: C#-Code-Lückentext: MSAGL-Graphen erstellen und Sugiyama-Layout berechnen *(gapselect, 1.0 Pkt.)*

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

#### Frage 5.5: Konzept-Zuordnung: Aufgaben der 2D-Transformations- und Bemaßungsparameter (Kap. 03) *(matching, 1.0 Pkt.)*

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

#### Frage 5.6: ScottPlot 5 Downsampling: Warum Min/Max-Spalten-Aggregation Spitzenwerte schützt *(multichoice, 1.0 Pkt.)*

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

#### Frage 5.7: C#-Bug-Diagnose: Falsche Winkelberechnung für schräge Maßtexte durch Math.Atan(dy / dx) *(multichoice, 1.0 Pkt.)*

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

#### Frage 5.8: Systemanalyse: Hit-Testing und interaktive Objektauswahl im 2D-Canvas *(multichoice, 1.0 Pkt.)*

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

### Quiz 02 - Test 06 (Prüfungstest): DIN-406-Maßhilfslinien, 3-Sigma-Spannweite & Ringpuffer-Wrap
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_06_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 6.1: DIN-406-Bemaßungsgeometrie: Gesamtlänge der Maßhilfslinie und Endpunkt-Koordinate *(cloze, 2.0 Pkt.)*

Ein horizontaler Träger verläuft auf dem WPF-Canvas exakt entlang der Bildschirm-Horizontalen bei $Y_{\text{stab}} = 300\,\text{px}$ (von $X_1 = 100\,\text{px}$ bis $X_2 = 500\,\text{px}$). Nach DIN 406 soll oberhalb des Trägers (also in Richtung kleinerer WPF-Y-Werte, Normalenvektor $n_x = 0, n_y = -1$) eine Maßlinie im Abstand $d_{\text{dim}} = 28\,\text{px}$ gezeichnet werden. Die beiden vertikalen Maßhilfslinien beginnen mit einem kleinen Spalt von $g = 4\,\text{px}$ vom Träger entfernt und ragen um den normgerechten Überstand $e = 8\,\text{px}$ über die Maßlinie hinaus.

**a)** Berechnen Sie die gezeichnete sichtbare Strichlänge $L_{\text{ext}}$ (in $\text{px}$) einer solchen Maßhilfslinie (vom Spaltende bis zum Ende des Überstands): {1:NUMERICAL:=32:0.1#Exakt! Die Maßhilfslinie reicht von Abstand g = 4 px bis (d_dim + e) = 28 + 8 = 36 px; ihre Länge ist 36 - 4 = 32 px.~%50%36:0.1#Teilpunkte: 36 px ist der Gesamtabstand vom Bauteil (28 + 8) ohne Abzug des 4-px-Spalts g am Bauteilrand.}

**b)** Berechnen Sie die vertikale Bildschirmkoordinate $Y_{\text{end}}$ (in $\text{px}$) des äußeren oberen Endpunkts der Maßhilfslinie (inklusive Überstand $e$): {1:NUMERICAL:=264:0.5#Richtig! Y_end = Y_stab - (d_dim + e) = 300 - (28 + 8) = 300 - 36 = 264 px.~%50%272:0.5#Teilpunkte: 272 px (300 - 28) ist die Koordinate der Maßlinie selbst ohne den 8-px-Überstand e der Maßhilfslinie!}


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung (DIN-406-Maßhilfslinie):**

  * **Start- und Endabstand vom Stab:** Die Maßhilfslinie startet bei $d_{\text{start}} = g = 4\,\text{px}$ und endet bei $d_{\text{end}} = d_{\text{dim}} + e = 28 + 8 = 36\,\text{px}$.

  * **Gezeichnete Strichlänge:** $L_{\text{ext}} = d_{\text{end}} - d_{\text{start}} = 36 - 4 = 32\,\text{px}$.

  * **Oberer Endpunkt im Screen Space:** Da „oben“ im WPF-Canvas kleineren Y-Werten entspricht, gilt $Y_{\text{end}} = Y_{\text{stab}} - d_{\text{end}} = 300 - 36 = 264\,\text{px}$.

---

#### Frage 6.2: Statistische Prozesskontrolle: Breite des gesamten ±3-Sigma-Toleranzbands *(numerical, 1.5 Pkt.)*

In einem ScottPlot-5-Echtzeitdiagramm wird das symmetrische $\mu \pm 3s$-Prozessband (von der unteren Eingriffsgrenze $\text{LCL} = \mu - 3s$ bis zur oberen Eingriffsgrenze $\text{UCL} = \mu + 3s$) als farbig hinterlegtes HorizontalSpan eingezeichnet. Aus dem Welford-Tracker liegen nach $k = 17$ Messungen der Mittelwert $\mu = 80{,}0\,\text{mm}$ und die Quadratsumme $M_2 = 36{,}0\,\text{mm}^2$ vor.

Berechnen Sie die gesamte vertikale Breite $\Delta B = \text{UCL} - \text{LCL}$ (in $\text{mm}$) dieses $\pm 3s$-Toleranzbands.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `9` (± `0.05`) → 100%:** Exakt! s^2 = M2 / (17 - 1) = 36 / 16 = 2.25 mm^2 => s = 1.5 mm. Bandbreite von -3s bis +3s ist 6 * s = 6 * 1.5 = 9.0 mm.
* **Wert `4.5` (± `0.05`) → 50%:** Teilpunkte: 4.5 mm ist nur die halbe Bandbreite (3 * s = 3 * 1.5), gefragt war die volle Spanne UCL - LCL = 6 * s = 9.0 mm.
* **Wert `13.5` (± `0.05`) → 50%:** Teilpunkte: Sie haben 6 * s^2 = 6 * 2.25 = 13.5 gerechnet (Quadratwurzel für s vergessen!).

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

  * **Stichprobenvarianz & Standardabweichung:** $s^2 = \frac{M_2}{k - 1} = \frac{36{,}0}{16} = 2{,}25\,\text{mm}^2 \implies s = \sqrt{2{,}25} = 1{,}5\,\text{mm}$.

  * **Gesamtbreite des $\pm 3s$-Bands:** $\Delta B = (\mu + 3s) - (\mu - 3s) = 6s = 6 \cdot 1{,}5\,\text{mm} = 9{,}0\,\text{mm}$.

---

#### Frage 6.3: C#-Code-Tracing: Ringpuffer-Zustand nach Überlauf (Wrap-Around) *(numerical, 1.5 Pkt.)*

Ein kleiner Ringpuffer der Kapazität `cap = 4` wird nacheinander mit 6 Werten (`10, 20, 30, 40, 50, 60`) befüllt:

```csharp
double[] buf = new double[4];
for (int step = 0; step < 6; step++) {
    buf[step % 4] = (step + 1) * 10.0;
}
double result = buf[0] + buf[2];
```

Welchen numerischen Wert besitzt `result` nach Abschluss der Schleife?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `80` (± `0.1`) → 100%:** Richtig! Nach 6 Schritten gilt: buf[0]=50 (step=4), buf[1]=60 (step=5), buf[2]=30 (step=2), buf[3]=40 (step=3). Also buf[0] + buf[2] = 50 + 30 = 80.
* **Wert `40` (± `0.1`) → 50%:** Teilpunkte: 10 + 30 = 40 wäre der Wert vor dem Überschreiben von buf[0] im 5. Schleifendurchlauf (step=4).

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

  * `step = 0..3` schreibt `[10, 20, 30, 40]` an die Indizes `0..3`.

  * `step = 4` (`4 % 4 == 0`) überschreibt `buf[0] = 50`.

  * `step = 5` (`5 % 4 == 1`) überschreibt `buf[1] = 60`.

Damit lautet das Array `[50, 60, 30, 40]`, und `buf[0] + buf[2] = 50 + 30 = 80`.

---

#### Frage 6.4: C#-Code-Lückentext: ScottPlot 5 DataStreamer im Wipe-Modus konfigurieren *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie den C#-Code zur Initialisierung eines **ScottPlot 5** `DataStreamer` für 2000 Messpunkte mit einer Abtastperiode von `0.01` Sekunden im Oszilloskop-Wipe-Modus:

```csharp
var streamer = MainPlot.Plot.Add.[[1]](2000);
streamer.[[2]] = 0.01;
streamer.[[3]]();
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `DataStreamer`
* `[[2]]` (Gruppe 2): `Period`
* `[[3]]` (Gruppe 3): `ViewWipeRight`
* `[[4]]` (Gruppe 1): `Pie`
* `[[5]]` (Gruppe 1): `Boxes`
* `[[6]]` (Gruppe 2): `Capacity`
* `[[7]]` (Gruppe 2): `Color`
* `[[8]]` (Gruppe 3): `ClearAll`
* `[[9]]` (Gruppe 3): `Dispose`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung:** Mit `Plot.Add.DataStreamer(2000)` wird der Ringpuffer-Plottable erzeugt, über die Eigenschaft `Period = 0.01` der horizontale Punktabstand in Sekunden gesetzt und mit `ViewWipeRight()` die überschreibende Oszilloskop-Ansicht aktiviert.

---

#### Frage 6.5: Pipeline-Reihenfolge: 2D-Transformationskette vom Bauteilmodell zum WPF-Canvas *(ddwtos, 1.0 Pkt.)*

Bringen Sie die **vier Berechnungsphasen der 2D-Visualisierungspipeline (WorldToScreen)** beim Zeichnen eines Bauteils auf ein WPF-Canvas in die logisch korrekte Reihenfolge:

**Schritt 1:** [[1]] (Extremwerte $x_{\min}, x_{\max}, y_{\min}, y_{\max}$ aller Knoten im Weltkoordinatensystem ermitteln)  

**Schritt 2:** [[2]] (Verzerrungsfreien Maßstab $s = \min(s_x, s_y)$ und zentrierte Letterboxing-Offsets bestimmen)  

**Schritt 3:** [[3]] (Weltkoordinaten skalieren, verschieben und die vertikale Achse an $H_{\text{canvas}}$ invertieren)  

**Schritt 4:** [[4]] (Linien, Pfeilspitzen konstanter Pixellänge und gedrehte Maßtexte im Screen Space rendern)

**Drag-and-Drop-Bausteine (`ddwtos`):**
* `[[1]]` (Gruppe 1): `Bounding-Box-Analyse im World Space`
* `[[2]]` (Gruppe 1): `Uniform-Scaling- & Letterboxing-Berechnung`
* `[[3]]` (Gruppe 1): `Affine Koordinatentransformation & Y-Inversion`
* `[[4]]` (Gruppe 1): `Screen-Space-Annotation & WPF-Rendering`
* `[[5]]` (Gruppe 1): `Cholesky-Matrixinversion der Pixelwerte`
* `[[6]]` (Gruppe 1): `3D-Z-Buffer-Tiefensortierung der Dreiecke`

**Musterherleitung & Gesamt-Feedback:**
**Pipeline:** 1. Bounding-Box im World Space $\to$ 2. Maßstab & Letterboxing $\to$ 3. WorldToScreen inkl. Y-Inversion $\to$ 4. Zeichnen inkl. Screen-Space-Pfeilspitzen/Bemaßung.

---

#### Frage 6.6: Visualisierungs-Didaktik: Wann Box-Whisker-Plots einem Liniendiagramm überlegen sind *(multichoice, 1.0 Pkt.)*

In welchem ingenieurwissenschaftlichen Analyseszenario ist ein **Box-Whisker-Plot** (`Add.Boxes()`) einem klassischen Zeitreihen-Liniendiagramm (`Add.Signal()`) methodisch klar überlegen?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Wenn man die robuste Lage (Median), Streuung (IQR), Schiefe und Ausreißer der Taktzeiten von fünf verschiedenen Fertigungszellen direkt miteinander vergleichen will.
  * *Feedback:* Richtig! Box-Plots komprimieren ganze Stichprobenverteilungen auf 5 robuste Kennwerte und machen Gruppenvergleiche sowie Asymmetrien auf einen Blick sichtbar.
* [ ] (0%) Wenn man die exakte Phasenverschiebung und Frequenz einer hochfrequenten harmonischen Sinusschwingung im Millisekundenbereich ablesen möchte.
  * *Feedback:* Falsch. Ein Box-Plot aggregiert über die Zeit; Frequenz- und Phaseninformationen gehen dabei vollständig verloren.
* [ ] (0%) Wenn für jeden einzelnen Messpunkt nur ein einziger Skalarwert vorliegt und überhaupt keine wiederholten Messungen oder Stichprobengruppen existieren.
  * *Feedback:* Falsch. Für einen einzelnen Skalarwert pro Kategorie sind Quartile (Q1, Median, Q3) sinnlos; hier nutzt man ein Balkendiagramm.
* [ ] (0%) Wenn die gerichtete Topologie und Hierarchieebenen eines komplexen Rohrleitungsnetzwerks mit möglichst wenigen Kantenkreuzungen dargestellt werden sollen.
  * *Feedback:* Falsch. Für Netzwerktopologien nutzt man MSAGL-Graphenlayouts, keine Box-Whisker-Plots.

**Musterherleitung & Gesamt-Feedback:**
**Merksatz:** Zeitreihen-Plots zeigen den *zeitlichen Verlauf*, während Box-Whisker-Plots die *statistische Verteilung* (Median, 50-%-Kernbereich IQR, Whisker-Grenzen und Ausreißer) mehrerer Gruppen vergleichen.

---

#### Frage 6.7: C#-Bug-Diagnose: Auf dem Kopf stehende Maßzahlen bei Stäben von rechts nach links *(multichoice, 1.0 Pkt.)*

Ein Studierender richtet den Bemaßungstext eines Fachwerkstabs mit dem Winkel `double angleDeg = Math.Atan2(dyScreen, dxScreen) * 180.0 / Math.PI;` aus. Bei Stäben, die von links nach rechts verlaufen ($x_2 > x_1$), ist die Maßzahl perfekt lesbar. Bei Stäben, die von rechts nach links definiert wurden ($x_2 < x_1$), steht die Zahl jedoch **auf dem Kopf**. Welche Korrektur behebt diesen DIN-406-Verstoß?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Wenn der Winkel größer als +90 Grad oder kleiner als -90 Grad ist, muss man 180 Grad addieren bzw. subtrahieren, um die Textorientierung umzudrehen.
  * *Feedback:* Exakt! Nach DIN 406 müssen Maßzahlen immer von unten oder von rechts lesbar sein; Winkel in der linken Halbebene (|angle| > 90°) werden daher um 180° gedreht.
* [ ] (0%) Man muss den berechneten Winkel vor der Übergabe an RotateTransform immer mit Math.Abs() in einen positiven Betrag umwandeln.
  * *Feedback:* Falsch. Math.Abs(-150°) liefert +150° (weiterhin kopfüber!) und zerstört zudem die korrekte Neigungsrichtung bei Stäben mit -30°.
* [ ] (0%) Man muss die Schriftgröße FontSize des TextBlocks negativ setzen, damit WPF die Buchstaben automatisch an der Grundlinie spiegelt.
  * *Feedback:* Falsch. Eine negative FontSize ist in WPF unzulässig und wirft sofort eine ArgumentException.
* [ ] (0%) Man darf in Math.Atan2 niemals Bildschirmkoordinaten übergeben, sondern muss die Textdrehung zwingend vor der Skalierung im 1D-Array berechnen.
  * *Feedback:* Falsch. Auch im World Space hat ein Vektor von rechts nach links einen Winkel von 180°; die Lesbarkeitskorrektur um 180° ist in jedem Fall nötig.

**Musterherleitung & Gesamt-Feedback:**
**Standard-Code für DIN-406-Textrotation:**  

`if (angleDeg > 90.0) angleDeg -= 180.0; else if (angleDeg < -90.0) angleDeg += 180.0;`

---

#### Frage 6.8: Systemanalyse: Numerische Eigenschaften des Welford-Online-Algorithmus *(multichoice, 1.0 Pkt.)*

Welche **zwei** Eigenschaften machen den **Welford-Online-Algorithmus** zum Industriestandard für die laufende Varianzberechnung in Echtzeit-Simulations- und Messsystemen?

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Er benötigt nur konstanten Speicherplatz O(1) für Count, Mean und M2, ohne die gesamte Historie vergangener Messwerte im RAM vorhalten zu müssen.
  * *Feedback:* Richtig! Als Streaming-/Online-Algorithmus verarbeitet Welford jeden neuen Messwert in O(1) Zeit und O(1) Speicher.
* [x] **(50%)** Durch die Multiplikation der zentrierten Differenzen zum alten und neuen Mittelwert ist er numerisch immun gegen katastrophale Auslöschung bei großen Offsets.
  * *Feedback:* Richtig! Da vor dem Quadrieren bereits der Mittelwert subtrahiert wird, bleiben die Differenzen klein und präzise darstellbar.
* [ ] (-50%) Er sortiert nach jedem neuen Messwert das gesamte bisherige Datenarray neu, um gleichzeitig den exakten Median in O(n log n) zu aktualisieren.
  * *Feedback:* Falsch. Welford speichert gar kein Array und berechnet weder Sortierungen noch Mediane.
* [ ] (-50%) Er kommt komplett ohne Gleitkommadivisionen aus, weil der laufende Mittelwert ausschließlich durch Bit-Shifting von Ganzzahlen angenähert wird.
  * *Feedback:* Falsch. Der Schritt Mean += delta1 / Count enthält eine reguläre Gleitkommadivision durch die Stichprobengröße.

**Musterherleitung & Gesamt-Feedback:**
**Zusammenfassung:** Welford kombiniert $\mathcal{O}(1)$-Streaming-Effizienz (One-Pass) mit der hohen numerischen Stabilität der klassischen Zwei-Pass-Varianzformel.

---

### Quiz 02 - Test 07 (Prüfungstest): Negative Weltkoordinaten, Pfeilflügel & GC-Allokationsfallen
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_07_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 7.1: Affine 2D-Transformation: Ursprungsverschiebung bei negativen Weltkoordinaten (x_min < 0) *(cloze, 2.0 Pkt.)*

Ein symmetrisches Roboter-Arbeitsfeld erstreckt sich in X-Richtung von $x_{\min} = -4{,}0\,\text{m}$ bis $x_{\max} = +6{,}0\,\text{m}$ und in Y-Richtung von $y_{\min} = -2{,}0\,\text{m}$ bis $y_{\max} = +3{,}0\,\text{m}$. Es wird verzerrungsfrei auf eine nutzbare Canvas-Fläche von $W_{\text{eff}} = 500\,\text{px}$ mal $H_{\text{eff}} = 300\,\text{px}$ abgebildet; der linke Offset beträgt $\text{offset}_X = 50\,\text{px}$.

**a)** Berechnen Sie den verzerrungsfreien Skalierungsfaktor $s$ in $\text{px/m}$: {1:NUMERICAL:=50:0.1#Exakt! Delta_X = 6 - (-4) = 10 m, Delta_Y = 3 - (-2) = 5 m; s = min(500/10, 300/5) = min(50, 60) = 50 px/m.~%50%60:0.1#Teilpunkte: Sie haben sy = 300/5 = 60 px/m statt min(50, 60) = 50 px/m gewählt.}

**b)** Berechnen Sie die horizontale Bildschirmkoordinate $X_{\text{screen}}$ (in $\text{px}$) des Koordinatenursprungs $x = 0{,}0\,\text{m}$: {1:NUMERICAL:=250:0.5#Richtig! X_screen = offset_X + (0.0 - (-4.0)) * 50 = 50 + 4.0 * 50 = 250 px.~%50%50:0.5#Teilpunkte: Sie haben (x - x_min) vergessen und nur offset_X + 0 * 50 = 50 px gerechnet (50 px liegt aber bei x_min = -4.0 m!).}


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

  * **Spannweiten:** $\Delta X = 6{,}0 - (-4{,}0) = 10{,}0\,\text{m}$, $\Delta Y = 3{,}0 - (-2{,}0) = 5{,}0\,\text{m}$.

  * **Uniform Scaling:** $s = \min(500/10, 300/5) = \min(50, 60) = 50\,\text{px/m}$.

  * **Screen-Position für $x = 0$:** Wichtig ist die Subtraktion von $x_{\min}$: $X_{\text{screen}} = \text{offset}_X + (x - x_{\min}) \cdot s = 50 + (0 - (-4{,}0)) \cdot 50 = 50 + 200 = 250\,\text{px}$.

---

#### Frage 7.2: Pfeilspitzen-Geometrie im Screen Space: Flügelpunkt-Koordinate berechnen *(numerical, 1.5 Pkt.)*

Ein vertikaler Kraftpfeil zeigt auf dem WPF-Canvas exakt senkrecht nach unten (Einheitsrichtungsvektor im Screen Space $u_x = 0{,}0$, $u_y = +1{,}0$; Normalenvektor $n_x = -u_y = -1{,}0$, $n_y = u_x = 0{,}0$). Die Pfeilspitze liegt am Bildschirm-Punkt $\text{tip} = (200\,\text{px}, 300\,\text{px})$. Die Pfeilspitzenlänge beträgt $L_{\text{arrow}} = 14\,\text{px}$ und die halbe Pfeilbreite $W_{\text{arrow}} = 6\,\text{px}$.

Berechnen Sie die vertikale Bildschirmkoordinate $Y_{\text{wing}}$ (in $\text{px}$) der beiden hinteren Pfeilflügel-Eckpunkte.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `286` (± `0.1`) → 100%:** Exakt! Y_wing = tip.Y - uy * L_arrow + ny * W_arrow = 300 - 1.0 * 14 + 0 * 6 = 286.0 px.
* **Wert `314` (± `0.1`) → 50%:** Teilpunkte: Vorzeichenfehler! Sie haben + uy * L_arrow (300 + 14 = 314) gerechnet, die Flügel liegen aber entgegen der Pfeilrichtung hinter der Spitze.
* **Wert `194` (± `0.1`) → 50%:** Teilpunkte: 194 px (200 - 6) ist die X-Koordinate des linken Flügels, gefragt war aber die Y-Koordinate (286 px).

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:** Für die Flügeleckpunkte gilt $\vec{P}_{\text{wing}} = \vec{P}_{\text{tip}} - L_{\text{arrow}} \cdot \vec{u} \pm W_{\text{arrow}} \cdot \vec{n}$. Für die Y-Komponente folgt $Y_{\text{wing}} = 300 - 14 \cdot 1{,}0 \pm 6 \cdot 0{,}0 = 286\,\text{px}$.

---

#### Frage 7.3: C#-Code-Tracing: Welford-Varianz nach drei konkreten Messwerten *(numerical, 1.5 Pkt.)*

Verfolgen Sie die Ausführung des Welford-Algorithmus für die drei Messwerte `x = { 10.0, 20.0, 30.0 }`:

```csharp
double mean = 0.0, m2 = 0.0;
int count = 0;
foreach (double x in new[] { 10.0, 20.0, 30.0 }) {
    count++;
    double d1 = x - mean;
    mean += d1 / count;
    double d2 = x - mean;
    m2 += d1 * d2;
}
```

Welchen numerischen Wert hat die Variable `m2` nach Abschluss der Schleife?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `200` (± `0.1`) → 100%:** Richtig! Schritt 1: mean=10, m2=0; Schritt 2: d1=10, mean=15, d2=5, m2=50; Schritt 3: d1=15, mean=20, d2=10, m2=50+150=200.0.
* **Wert `100` (± `0.1`) → 50%:** Teilpunkte: 100.0 ist bereits die durch (count - 1) = 2 geteilte Stichprobenvarianz s^2, gefragt war aber die ungeteilte Summe m2 = 200.0.

**Musterherleitung & Gesamt-Feedback:**
**Schritt-für-Schritt-Tracing:**

  * `x = 10`: `count = 1`, `d1 = 10`, `mean = 10`, `d2 = 0`, `m2 = 0`.

  * `x = 20`: `count = 2`, `d1 = 10`, `mean = 15`, `d2 = 5`, `m2 = 0 + 10 * 5 = 50`.

  * `x = 30`: `count = 3`, `d1 = 15`, `mean = 20`, `d2 = 10`, `m2 = 50 + 15 * 10 = 200`.

---

#### Frage 7.4: C#-Code-Lückentext: Statische WPF-Pinsel mit Freeze() für High-FPS optimieren *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie die statische Initialisierung eines wiederverwendbaren, thread-sicheren und maximal performanten WPF-Pinsels für Zugstäbe:

```csharp
private static readonly [[1]] TensionBrush = CreateFrozenBrush(Colors.RoyalBlue);

private static SolidColorBrush CreateFrozenBrush(Color color)
{
    var brush = new [[2]](color);
    if (brush.CanFreeze)
        brush.[[3]]();
    return brush;
}
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `SolidColorBrush`
* `[[2]]` (Gruppe 2): `SolidColorBrush`
* `[[3]]` (Gruppe 3): `Freeze`
* `[[4]]` (Gruppe 1): `WriteableBitmap`
* `[[5]]` (Gruppe 1): `DoubleCollection`
* `[[6]]` (Gruppe 2): `LineGeometry`
* `[[7]]` (Gruppe 2): `TransformGroup`
* `[[8]]` (Gruppe 3): `Clear`
* `[[9]]` (Gruppe 3): `Clone`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung:** Ein `SolidColorBrush` erbt von `Freezable`. Durch den Aufruf von `brush.Freeze()` wird das Objekt schreibgeschützt, gibt seine internen Change-Tracking-Strukturen frei und kann ohne Performance-Verlust tausendfach wiederverwendet werden.

---

#### Frage 7.5: Konzept-Zuordnung: Fehlerbilder in der 2D-Vektorgrafik und ihre technischen Ursachen *(matching, 1.0 Pkt.)*

Ordnen Sie den vier typischen visuellen Fehlerbildern beim Programmieren eines 2D-Viewers (Kapitel 03/04) jeweils die exakte mathematische bzw. programmiertechnische Ursache zu (beachten Sie die zwei Überhang-Distraktoren).

**Zuordnungspaare & Überhang-Distraktoren (`matching`):**
* Das gesamte Fachwerk steht auf dem Bildschirm spiegelverkehrt auf dem Kopf (Stützlager hängen oben an der Decke) $\to$ **Fehlende Y-Achsen-Inversion (offsetY + y*s statt canvasHeight - (offsetY + y*s))**
* Das Bauteil füllt zwar die Höhe perfekt aus, ragt aber rechts weit über den sichtbaren Canvas-Rand hinaus $\to$ **Verwendung von Math.Max(sx, sy) statt Math.Min(sx, sy) beim Uniform Scaling**
* Kreisförmige Gelenkknoten erscheinen als flachgedrückte Ellipsen und rechte Winkel sind schief $\to$ **Getrennte anisotrope Skalierung mit sx != sy ohne einheitlichen Skalierungsfaktor**
* Beim Ziehen eines äußeren Knotens zuckt und skaliert das gesamte Bauteil unkontrolliert hin und her $\to$ **Neuberechnung der Auto-Fit-Bounding-Box in jedem MouseMove-Event während des Draggings**
* *(Überhang-Distraktor)* $\to$ Verwendung von 64-Bit-double statt 32-Bit-float für die Knoten-Koordinaten
* *(Überhang-Distraktor)* $\to$ Aktivierung von ClearType-Kantenglättung für die Maßzahlen-Textblöcke

**Musterherleitung & Gesamt-Feedback:**
**Lösung:** Diese vier klassischen Bugs (fehlende Y-Inversion, `Math.Max` statt `Math.Min`, anisotrope Skalierung und Live-Bounding-Box-Neuberechnung beim Dragging) sind die wichtigsten Diagnosefälle aus Kapitel 03.

---

#### Frage 7.6: MSAGL-Architektur: Wahl zwischen Sugiyama-Schichtenlayout und Force-Directed Layout (MDS) *(multichoice, 1.0 Pkt.)*

Für welche Art von technischem Systemmodell ist ein **kräftebasiertes bzw. distanzbasiertes Layout** (`MdsLayoutSettings` / `FastIncrementalLayoutSettings`) in MSAGL besser geeignet als das hierarchische Sugiyama-Layout?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Für ungerichtete vermaschte Versorgungs-, Sensor- oder Kommunikationsnetze ohne eindeutige Start-Ende-Hierarchie, bei denen symmetrische Cluster gesucht sind.
  * *Feedback:* Richtig! In vermaschten ungerichteten Netzen (z. B. Funk-Mesh, Wassernetz) gibt es kein „Oben nach Unten“; Kräfte-/MDS-Layouts decken Nachbarschaftscluster natürlich auf.
* [ ] (0%) Für streng sequenzielle SPS-Ablaufketten (GRAFCET / Schrittketten), bei denen Schritt 1 zwingend ganz oben und der Endschritt ganz unten stehen muss.
  * *Feedback:* Falsch. Für streng gerichtete Ablaufketten von oben nach unten ist das hierarchische Sugiyama-Schichtenlayout ideal.
* [ ] (0%) Für äquidistante 1D-Zeitreihen aus einem Temperatursensor, die mit 1000 Hz in einem Oszilloskop-Fenster über der Zeitachse aufgetragen werden.
  * *Feedback:* Falsch. Zeitreihen sind überhaupt kein Fall für MSAGL-Graphenlayout, sondern für ScottPlot Signal/DataStreamer.
* [ ] (0%) Für maßstabsgetreue 2D-CAD-Bauteilzeichnungen, bei denen jeder Knoten bereits feste metrische Konstruktionskoordinaten (x, y) in Metern besitzt.
  * *Feedback:* Falsch. Wenn ein Bauteil feste physikalische Geometrie-Koordinaten besitzt, darf kein automatisches Graphenlayout die Knotenpositionen verschieben!

**Musterherleitung & Gesamt-Feedback:**
**Entscheidungsregel:** Feste Geometrie $\to$ direkte affine Transformation (`Transform2D`); gerichtete Hierarchie/Kausalität $\to$ MSAGL Sugiyama; ungerichtete Topologie/Mesh $\to$ MSAGL MDS / Force-Directed.

---

#### Frage 7.7: C#-Bug-Diagnose: Garbage-Collection-Stottern durch Array-Neuallokation im 60-Hz-Timer *(multichoice, 1.0 Pkt.)*

Ein Entwickler möchte ein Live-Signal mit $500.000$ Punkten in ScottPlot 5 aktualisieren und schreibt im $60\,\text{Hz}$-Timer folgenden Code. Alle paar Sekunden friert das Bild kurz ein (GC-Pausen):

```csharp
void OnTimerTick(object? sender, EventArgs e) {
    double[] copy = _ringBuffer.ToArray(); // erzeugt neues double[500000]
    MainPlot.Plot.Clear();
    MainPlot.Plot.Add.Signal(copy);
    MainPlot.Refresh();
}
```

Warum belastet dieser Code den .NET Garbage Collector (insbesondere den Large Object Heap) massiv?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Jeder Tick allokiert ein 4 MB großes double-Array auf dem Large Object Heap und verwirft alle Plot-Objekte, statt einen vorallokierten Puffer zu nutzen.
  * *Feedback:* Exakt! 500.000 * 8 Bytes = 4 MB (> 85 KB LOH-Schwelle). Bei 60 Hz werden 240 MB/s auf dem Large Object Heap allokiert, was teure Gen-2/LOH-Collections erzwingt.
* [ ] (0%) Die Methode MainPlot.Plot.Clear() löscht bei jedem Aufruf die Lizenzdatei von ScottPlot auf der Festplatte und lädt sie aus dem Internet nach.
  * *Feedback:* Falsch. ScottPlot ist Open Source (MIT) ohne Lizenzdatei oder Netzwerkzugriffe.
* [ ] (0%) Der Parameter object? sender im Event-Handler zwingt C# dazu, bei jedem Tick den gesamten Maschinencode des Programms neu zu kompilieren.
  * *Feedback:* Falsch. Nullable-Referenzannotationen (object?) sind reine Compiler-Metadaten ohne Laufzeitkosten.
* [ ] (0%) Arrays mit mehr als 65.536 Elementen werden in .NET grundsätzlich in die Windows-Auslagerungsdatei auf der SSD ausgelagert.
  * *Feedback:* Falsch. Solange genügend physischer RAM vorhanden ist, liegen auch große Arrays im schnellen Hauptspeicher (auf dem LOH).

**Musterherleitung & Gesamt-Feedback:**
**Lösung:** In .NET wandern Objekte ab $85.000\,\text{Bytes}$ direkt auf den **Large Object Heap (LOH)**. In einem 60-Hz-Renderloop darf niemals mit `.ToArray()` und `Plot.Clear()` gearbeitet werden; stattdessen nutzt man einen festen Puffer oder `DataStreamer`.

---

#### Frage 7.8: Systemanalyse: Koordinatensysteme in WPF, ScottPlot 5 und MSAGL *(multichoice, 1.0 Pkt.)*

Welche **zwei** Aussagen über den Umgang mit 2D-Koordinatensystemen in **WPF Canvas**, **ScottPlot 5** und **MSAGL** sind zutreffend?

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Auf einem nativen WPF-Canvas liegt der Ursprung (0,0) links oben mit nach unten wachsender Y-Achse, weshalb physikalische Höhenwerte invertiert werden müssen.
  * *Feedback:* Richtig! Ohne Y-Inversion (canvasHeight - y) würden Kräfte und Geometrien vertikal gespiegelt dargestellt.
* [x] **(50%)** ScottPlot 5 besitzt ein eigenes kartesisches Achsensystem mit nach oben wachsender Y-Achse, sodass Messwerte direkt ohne manuelle Y-Inversion übergeben werden.
  * *Feedback:* Richtig! ScottPlot übernimmt die Transformation von Datenkoordinaten in Pixelkoordinaten (inkl. Y-Inversion) intern automatisch.
* [ ] (-50%) WPF Canvas verwendet standardmäßig Polarkoordinaten (Radius und Winkel in Grad), sodass kartesische Punkte vor dem Zeichnen umgerechnet werden müssen.
  * *Feedback:* Falsch. WPF Canvas arbeitet mit kartesischen Bildschirmkoordinaten (X nach rechts, Y nach unten).
* [ ] (-50%) ScottPlot 5 akzeptiert auf der Y-Achse ausschließlich normierte Werte zwischen 0.0 und 1.0 und schneidet alle größeren physikalischen Messwerte ab.
  * *Feedback:* Falsch. ScottPlot verarbeitet beliebige double-Wertebereiche und skaliert die Achsen über Axes.AutoScale() automatisch.

**Musterherleitung & Gesamt-Feedback:**
**Zusammenfassung:** Beim eigenen Zeichnen auf dem `Canvas` (Kap. 03) verantworten wir Skalierung und Y-Inversion selbst (`Transform2D`); in `ScottPlot 5` (Kap. 04) übergeben wir direkt die physikalischen Größen, da das Chart-Control die Achsentransformation kapselt.

---

### Quiz 02 - Test 08 (Prüfungstest): Maus-Dragging-Delta, ScottPlot-Downsampling & Hit-Testing
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_08_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 8.1: Inverse 2D-Transformation beim Maus-Dragging: Verschiebungsvektor in Weltkoordinaten *(cloze, 2.0 Pkt.)*

In einem interaktiven 2D-Kinematik-Editor mit dem eingefrorenen uniformen Skalierungsfaktor $s = 25\,\text{px/m}$ zieht eine Ingenieurin einen Gelenkknoten mit gedrückter Maustaste von der Start-Bildschirmkoordinate $P_{\text{start}} = (150\,\text{px}, 300\,\text{px})$ zur neuen Bildschirmkoordinate $P_{\text{end}} = (225\,\text{px}, 200\,\text{px})$ (beachten Sie: der Bildschirmwert $Y_{\text{screen}}$ ist von $300\,\text{px}$ auf $200\,\text{px}$ gesunken, die Maus wurde also auf dem Monitor nach **oben** bewegt).

**a)** Berechnen Sie die resultierende horizontale Verschiebung $\Delta X_{\text{world}} = X_{\text{world,end}} - X_{\text{world,start}}$ des Knotens in Metern ($\text{m}$): {1:NUMERICAL:=3.0:0.05#Exakt! Delta_X_screen = 225 - 150 = +75 px; Delta_X_world = +75 / 25 = +3.0 m.~%50%-3.0:0.05#Teilpunkte: Vorzeichenfehler! Eine Bewegung nach rechts (von 150 auf 225 px) vergrößert X_world um +3.0 m.}

**b)** Berechnen Sie die resultierende vertikale Verschiebung $\Delta Y_{\text{world}} = Y_{\text{world,end}} - Y_{\text{world,start}}$ des Knotens in Metern ($\text{m}$) unter Beachtung der WPF-Y-Achsen-Inversion: {1:NUMERICAL:=4.0:0.05#Richtig! Da Y_screen um 100 px nach oben (von 300 auf 200) wandert, steigt die physikalische Höhe um Delta_Y_world = -(200 - 300) / 25 = +4.0 m.~%50%-4.0:0.05#Teilpunkte: Sie haben die Y-Inversion vergessen und (200 - 300) / 25 = -4.0 m gerechnet (Bewegung nach oben bedeutet positives Delta_Y_world!).}


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung (Differenz-Transformation):**

  * **Horizontale Änderung:** $\Delta X_{\text{world}} = \frac{X_{\text{screen,end}} - X_{\text{screen,start}}}{s} = \frac{225 - 150}{25} = +3{,}0\,\text{m}$.

  * **Vertikale Änderung (mit Y-Inversion):** Da $Y_{\text{screen}}$ nach unten wächst, gilt für Differenzen $\Delta Y_{\text{world}} = -\frac{Y_{\text{screen,end}} - Y_{\text{screen,start}}}{s} = -\frac{200 - 300}{25} = +4{,}0\,\text{m}$.

---

#### Frage 8.2: ScottPlot 5 Signal-Downsampling: Kompressionsrate pro Pixelspalte berechnen *(numerical, 1.5 Pkt.)*

Ein Prüfstands-Datensatz mit $N = 400.000$ äquidistanten Druckmesswerten wird in einem **ScottPlot 5** `Signal`-Plot vollständig dargestellt. Die Zeichenfläche (Data Area) des Diagramms auf dem Monitor hat eine Breite von exakt $W_{\text{plot}} = 800\,\text{Pixelspalten}$.

Wie viele Roh-Messwerte $M$ fasst der interne Min/Max-Downsampling-Algorithmus von `Signal` im Durchschnitt in **jeder einzelnen Pixelspalte** zusammen?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `500` (± `1`) → 100%:** Exakt! M = N / W_plot = 400.000 / 800 = 500 Messwerte pro Pixelspalte.
* **Wert `250` (± `1`) → 50%:** Teilpunkte: Sie haben zusätzlich durch 2 geteilt (weil Min und Max gezeichnet werden); pro Spalte werden aber 500 Rohpunkte aggregiert.
* **Wert `0.002` (± `0.0005`) → 50%:** Teilpunkte: Kehrwertfehler (800 / 400.000 = 0.002 statt 400.000 / 800 = 500).

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:** Auf $W_{\text{plot}} = 800$ horizontale Pixelspalten verteilen sich $N = 400.000$ Samples. Damit entfallen $M = \frac{400.000}{800} = 500$ Samples auf jede Pixelspalte, aus denen jeweils das Minimum und Maximum bestimmt wird.

---

#### Frage 8.3: C#-Code-Tracing: Lesbarkeitskorrektur des Bemaßungswinkels nach DIN 406 *(numerical, 1.5 Pkt.)*

Ein schräger Stab verläuft auf dem Bildschirm nach links oben und besitzt vor der Korrektur den Orientierungswinkel `angleDeg = -135.0` Grad. Welchen Wert hat `angleDeg` nach Ausführung der DIN-406-Lesbarkeitskorrektur?

```csharp
double angleDeg = -135.0;
if (angleDeg > 90.0)
    angleDeg -= 180.0;
else if (angleDeg < -90.0)
    angleDeg += 180.0;
```

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `45` (± `0.1`) → 100%:** Richtig! Da -135.0 < -90.0 ist, greift der else-if-Zweig: -135.0 + 180.0 = +45.0 Grad.
* **Wert `-45` (± `0.1`) → 50%:** Teilpunkte: Vorzeichenfehler bei der Addition -135.0 + 180.0 = +45.0 Grad.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:** Da $-135^\circ < -90^\circ$ in der linken Halbebene liegt (Text stünde auf dem Kopf), wird $180^\circ$ addiert: $-135^\circ + 180^\circ = +45^\circ$. Die Maßzahl verläuft weiterhin exakt parallel zum Stab, ist nun aber von unten rechts lesbar.

---

#### Frage 8.4: C#-Code-Lückentext: Wurzelfreies Hit-Testing für Knotenauswahl im Screen Space *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie die C#-Methode zur Suche des nächstgelegenen Fachwerkknotens innerhalb eines Fangradius `snapRadiusPx = 10.0` um die Mausposition `(mouseX, mouseY)`:

```csharp
double bestDistSq = [[1]];
Node? hitNode = null;
foreach (var node in _nodes) {
    var (sx, sy) = _transform.[[2]](node.X, node.Y);
    double dSq = (mouseX - sx) * (mouseX - sx) + (mouseY - sy) * (mouseY - sy);
    if (dSq <= [[3]]) { bestDistSq = dSq; hitNode = node; }
}
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `snapRadiusPx * snapRadiusPx`
* `[[2]]` (Gruppe 2): `WorldToScreen`
* `[[3]]` (Gruppe 3): `bestDistSq`
* `[[4]]` (Gruppe 1): `0.0`
* `[[5]]` (Gruppe 1): `Math.Sqrt(snapRadiusPx)`
* `[[6]]` (Gruppe 2): `ScreenToWorld`
* `[[7]]` (Gruppe 2): `Freeze`
* `[[8]]` (Gruppe 3): `0.0`
* `[[9]]` (Gruppe 3): `node.X`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung:** Die Schwelle `bestDistSq` wird mit dem Quadrat des Fangradius `snapRadiusPx * snapRadiusPx` initialisiert. Jeder Knoten wird via `WorldToScreen` in Pixel umgerechnet; ist sein Abstandsquadrat `dSq <= bestDistSq`, wird er als neuer bester Treffer gespeichert.

---

#### Frage 8.5: Pipeline-Reihenfolge: Entkoppeltes Echtzeit-Datenstreaming mit Ringpuffer und UI-Timer *(ddwtos, 1.0 Pkt.)*

Bringen Sie die **vier Schritte einer entkoppelten Echtzeit-Visualisierungspipeline** (Kapitel 04) vom Eintreffen eines Messwerts bis zum Bildschirm-Frame in die korrekte Reihenfolge:

**Schritt 1:** [[1]] (Neuen Rohmesswert in O(1) an der aktuellen Schreibposition in den vorallokierten Puffer eintragen)  

**Schritt 2:** [[2]] (Laufenden Mittelwert und Abweichungsquadratsumme M2 inkrementell nach Welford aktualisieren)  

**Schritt 3:** [[3]] (Abwarten des nächsten 30/60-Hz-Takts des UI-Timers ohne Blockade des Messkanals)  

**Schritt 4:** [[4]] (Position der 3-Sigma-Linien anpassen und einmalig pro Frame WpfPlot.Refresh() auslösen)

**Drag-and-Drop-Bausteine (`ddwtos`):**
* `[[1]]` (Gruppe 1): `Ringpuffer-Eintrag (DataStreamer.Add)`
* `[[2]]` (Gruppe 1): `Inkrementelles Welford-Statistik-Update`
* `[[3]]` (Gruppe 1): `Taktung durch 60-Hz-DispatcherTimer`
* `[[4]]` (Gruppe 1): `Gebündeltes Chart-Rendering (WpfPlot.Refresh)`
* `[[5]]` (Gruppe 1): `Vollständige Array-Sortierung (Array.Sort)`
* `[[6]]` (Gruppe 1): `Neuanlage des WpfPlot-Controls (new WpfPlot)`

**Musterherleitung & Gesamt-Feedback:**
**Echtzeit-Architektur:** Schnelle Datenaufnahme (Ringpuffer + Welford in $\mathcal{O}(1)$) wird zeitlich über einen `DispatcherTimer` vom aufwendigen Grafik-Rendering (`WpfPlot.Refresh()`) getrennt.

---

#### Frage 8.6: Farbsemantik & Vektordarstellung: Kodierung von Stabkräften im 2D-Fachwerk-Viewer *(multichoice, 1.0 Pkt.)*

Wie werden innere Stabkräfte (Zug vs. Druck vs. Nullstab) in einem professionellen 2D-Fachwerk-Viewer (Kapitel 03) typischerweise visuell auf dem WPF-Canvas kodiert, damit Ingenieure den Kraftfluss sofort erfassen?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Durch eine semantische Farbskala (z. B. Rot/Blau für Druck/Zug, Grau für Nullstäbe) kombiniert mit einer vom Kraftbetrag abhängigen Strichstärke im Screen Space.
  * *Feedback:* Richtig! Die Kombination aus divergierender Farbpalette (Vorzeichen) und moderat skalierter Strichstärke StrokeThickness (Betrag) erlaubt eine sofortige visuelle Diagnose.
* [ ] (0%) Indem man die geometrische Länge der gezogenen Stäbe auf dem Bildschirm verdoppelt und sämtliche Druckstäbe komplett aus dem Canvas ausblendet.
  * *Feedback:* Falsch. Das Ändern der Stablängen um 100 % würde die Netztopologie zerreißen, und das Ausblenden von Druckstäben macht die Knickanalyse unmöglich.
* [ ] (0%) Indem man für jedes Kilonewton Stabkraft eine zusätzliche parallele Linie zeichnet, sodass ein Stab mit 500 kN aus 500 einzelnen UIElementen besteht.
  * *Feedback:* Falsch. Hunderte überlappende Line-Objekte pro Stab würden den Visual Tree überlasten und visuell nur einen undefinierten Balken ergeben.
* [ ] (0%) Durch Änderung der Hintergrundfarbe des gesamten Anwendungsfensters im 60-Hz-Wechsel zwischen den Farben aller vorhandenen Stäbe.
  * *Feedback:* Falsch. Ein blinkender Fensterhintergrund zeigt nicht an, welcher konkrete Stab im Fachwerk wie stark belastet ist.

**Musterherleitung & Gesamt-Feedback:**
**Didaktisches Prinzip:** In technischen Visualisierungen kodiert die **Farbe (Hue)** die Wirkungsrichtung (Zug vs. Druck) und die **Strichstärke / Sättigung** die Intensität $|F|$ relativ zu $F_{\max}$.

---

#### Frage 8.7: C#-Bug-Diagnose: Falsche Stichprobenvarianz durch Integer-Division in C# *(multichoice, 1.0 Pkt.)*

Ein Studierender möchte einen Skalierungsfaktor für ein Diagramm berechnen und schreibt: `double factor = (count - 1) / count * m2;`, wobei `int count = 10;` als Ganzzahl deklariert ist. Überraschenderweise ist `factor` immer exakt `0.0`! Warum?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Weil (count - 1) und count beide vom Typ int sind, wird 9 / 10 als Ganzzahldivision zu 0 abgerundet, bevor mit m2 multipliziert wird.
  * *Feedback:* Exakt! Der Links-nach-rechts-Operator / sieht bei (count - 1) / count zwei int-Operanden und liefert 0; erst 0 * m2 wird zu 0.0.
* [ ] (0%) Weil in C# das Minuszeichen eine niedrigere Operatorpriorität als die Multiplikation besitzt und Klammern in double-Ausdrücken ignoriert werden.
  * *Feedback:* Falsch. Klammern haben in C# immer die höchste Priorität und werden selbstverständlich zuerst ausgewertet.
* [ ] (0%) Weil eine Variable mit dem Namen count in C# ein reserviertes Schlüsselwort von LINQ ist und beim Lesen automatisch auf Null gesetzt wird.
  * *Feedback:* Falsch. count ist als lokaler Variablenname in C# vollkommen gültig und wird nicht zurückgesetzt.
* [ ] (0%) Weil der Datentyp double in .NET keine Zahlen kleiner als 1.0 speichern kann und jeden echten Bruch bei der Zuweisung auf 0.0 abrundet.
  * *Feedback:* Falsch. double speichert Brüche bis ca. 10^-308; das Problem entsteht vor der Zuweisung bei der int-Division.

**Musterherleitung & Gesamt-Feedback:**
**Lösung:** Mindestens einer der Operanden der Division muss ein Gleitkommawert sein, z. B. `(count - 1.0) / count * m2` oder `(double)(count - 1) / count * m2`.

---

#### Frage 8.8: Systemanalyse: Gruppierte Balkendiagramme und Box-Whisker-Plots in ScottPlot 5 *(multichoice, 1.0 Pkt.)*

Welche **zwei** Aussagen zur Konstruktion von **gruppierten Balkendiagrammen** und **Box-Whisker-Plots** in ScottPlot 5 (Kapitel 04) sind fachlich korrekt?

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Bei zwei gruppierten Balken der Einzelbreite w pro Kategorie i werden die Balkenzentren um -w/2 und +w/2 gegenüber i verschoben, damit sie bündig nebeneinander stehen.
  * *Feedback:* Richtig! Durch i - w/2 und i + w/2 berühren sich beide Balken exakt auf der Kategorienlinie i ohne sich zu überdecken.
* [x] **(50%)** Die Box eines Box-Whisker-Plots erstreckt sich vom 25-%-Quartil (Q1) bis zum 75-%-Quartil (Q3) und schließt damit exakt die mittleren 50 Prozent der Daten ein.
  * *Feedback:* Richtig! Die Höhe der Box entspricht dem Interquartilsabstand IQR = Q3 - Q1 (mittlere 50 % der sortierten Stichprobe).
* [ ] (-50%) Um zwei Balken nebeneinander zu gruppieren, müssen beide Balken exakt dieselbe Position X = i erhalten, da ScottPlot sie automatisch horizontal auffächert.
  * *Feedback:* Falsch. Haben zwei Bar-Objekte exakt dieselbe Position, werden sie verdeckend übereinander gezeichnet.
* [ ] (-50%) Die Antennen (Whiskers) eines Box-Plots markieren in der Statistik immer den absoluten Stichprobenumfang N sowie die Abtastfrequenz in Hertz.
  * *Feedback:* Falsch. Die Whiskers markieren die Streuungsgrenzen der Daten (z. B. Min/Max oder 1.5 * IQR), niemals die Stichprobengröße N oder Frequenzen.

**Musterherleitung & Gesamt-Feedback:**
**Zusammenfassung:** Gruppierte Balken benötigen manuelle Positions-Offsets $i \mp w/2$, und Box-Plots visualisieren $Q_1$, Median, $Q_3$ (IQR = 50 % der Daten) sowie die Whisker-Grenzen.

---

### Quiz 02 - Test 09 (Prüfungstest): Canvas-Größenberechnung, Untere 3-Sigma-Grenze & MSAGL-BBox
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_09_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 9.1: Affine 2D-Transformation: Nutzbare Zeichenfläche nach Randabzug und Uniform Scaling *(cloze, 2.0 Pkt.)*

Ein WPF-Canvas besitzt die Gesamtgröße $W_{\text{canvas}} = 700\,\text{px}$ Breite und $H_{\text{canvas}} = 500\,\text{px}$ Höhe. Damit Knotensymbole und DIN-406-Maßzahlen am Rand nicht abgeschnitten werden, wird auf **allen vier Seiten** (links, rechts, oben, unten) jeweils ein Sicherheitsrand von $\text{margin} = 50\,\text{px}$ freigehalten. Auf der verbleibenden nutzbaren Fläche soll eine Fertigungsstraße der Länge $\Delta X = 30\,\text{m}$ und Breite $\Delta Y = 10\,\text{m}$ verzerrungsfrei dargestellt werden.

**a)** Berechnen Sie die effektiv nutzbare Zeichenbreite $W_{\text{eff}}$ in $\text{px}$ nach Abzug des linken und rechten Sicherheitsrands: {1:NUMERICAL:=600:0.5#Exakt! W_eff = W_canvas - 2 * margin = 700 - 2 * 50 = 600 px.~%50%650:0.5#Teilpunkte: Sie haben margin = 50 px nur einmal statt zweimal (links UND rechts) abgezogen!}

**b)** Berechnen Sie den resultierenden verzerrungsfreien uniformen Skalierungsfaktor $s$ in $\text{px/m}$: {1:NUMERICAL:=20:0.1#Richtig! H_eff = 500 - 2*50 = 400 px; s = min(600/30, 400/10) = min(20, 40) = 20 px/m.~%50%40:0.1#Teilpunkte: Sie haben max(sx, sy) = 40 px/m statt min(sx, sy) = 20 px/m gewählt.}


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

  * **Nutzbare Dimensionen (beidseitiger Randabzug!):** $W_{\text{eff}} = W_{\text{canvas}} - 2 \cdot \text{margin} = 700 - 100 = 600\,\text{px}$ und $H_{\text{eff}} = H_{\text{canvas}} - 2 \cdot \text{margin} = 500 - 100 = 400\,\text{px}$.

  * **Uniform Scaling:** $s = \min\left(\frac{600}{30}, \frac{400}{10}\right) = \min(20, 40) = 20\,\text{px/m}$.

---

#### Frage 9.2: Statistische Prozesskontrolle (SPC): Untere 3-Sigma-Warngrenze (LCL) bestimmen *(numerical, 1.5 Pkt.)*

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

#### Frage 9.3: C#-Code-Tracing: Horizontale Pfeilspitzen-Rückverschiebung im Screen Space *(numerical, 1.5 Pkt.)*

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

#### Frage 9.4: C#-Code-Lückentext: Horizontale Warnlinie und Toleranzband in ScottPlot 5 einzeichnen *(gapselect, 1.0 Pkt.)*

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

#### Frage 9.5: Konzept-Zuordnung: Mathematische Kennzahlen der Echtzeit-Statistik (Kapitel 04) *(matching, 1.0 Pkt.)*

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

#### Frage 9.6: MSAGL-Rendering auf WPF Canvas: Warum die Bounding-Box des Graphen transformiert werden muss *(multichoice, 1.0 Pkt.)*

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

#### Frage 9.7: C#-Bug-Diagnose: Division durch Null beim Welford-Start (SampleVariance bei Count < 2) *(multichoice, 1.0 Pkt.)*

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

#### Frage 9.8: Systemanalyse: Vergleich der 2D-Grafiktechnologien im Kurs (Kapitel 02, 03 und 04) *(multichoice, 1.0 Pkt.)*

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

### Quiz 02 - Test 10 (Prüfungstest): Knotenabstand aus Screen-Koordinaten, Welford-Rückrechnung & DPI
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_10_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 10.1: Affine 2D-Transformation: Wahre Bauteil-Spannweite aus Bildschirm-Koordinaten bestimmen *(cloze, 2.0 Pkt.)*

Ein Prüfstandsrahmen mit der physikalischen Breite $\Delta X = 8{,}0\,\text{m}$ und Höhe $\Delta Y = 5{,}0\,\text{m}$ ist verzerrungsfrei (Uniform Scaling) in ein nutzbares Canvas-Fenster von $W_{\text{eff}} = 640\,\text{px}$ Breite und $H_{\text{eff}} = 500\,\text{px}$ Höhe eingepasst. Auf dem Bildschirm messen Sie zwischen zwei Lagermittelpunkten einen horizontalen Pixelabstand von $\Delta X_{\text{screen}} = 240\,\text{px}$ und einen vertikalen Pixelabstand von $\Delta Y_{\text{screen}} = 320\,\text{px}$ (d. h. eine schräge Bildschirmdistanz von $L_{\text{screen}} = \sqrt{240^2 + 320^2} = 400\,\text{px}$).

**a)** Berechnen Sie den verwendeten uniformen Skalierungsfaktor $s$ in $\text{px/m}$: {1:NUMERICAL:=80:0.1#Exakt! s = min(640 / 8.0, 500 / 5.0) = min(80, 100) = 80 px/m.~%50%100:0.1#Teilpunkte: Sie haben sy = 500 / 5.0 = 100 px/m statt min(80, 100) = 80 px/m gewählt.}

**b)** Berechnen Sie den wahren physikalischen Euklidischen Abstand $L_{\text{world}}$ (in $\text{m}$) zwischen den beiden Lagern im World Space: {1:NUMERICAL:=5.0:0.05#Richtig! L_world = L_screen / s = 400 px / 80 (px/m) = 5.0 m (bzw. sqrt(3.0^2 + 4.0^2) = 5.0 m).~%50%4.0:0.05#Teilpunkte: Folgefehler aus Teil a (400 / 100 = 4.0 m) oder nur die vertikale Komponente 320 / 80 = 4.0 m betrachtet.}


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

  * **Uniform Scaling:** $s = \min\left(\frac{640}{8{,}0}, \frac{500}{5{,}0}\right) = \min(80, 100) = 80\,\text{px/m}$.

  * **Wahre Distanz im World Space:** $\Delta X_{\text{world}} = \frac{240}{80} = 3{,}0\,\text{m}$, $\Delta Y_{\text{world}} = \frac{320}{80} = 4{,}0\,\text{m}$, also $L_{\text{world}} = \sqrt{3{,}0^2 + 4{,}0^2} = \frac{400\,\text{px}}{80\,\text{px/m}} = 5{,}0\,\text{m}$.

---

#### Frage 10.2: Welford-Online-Algorithmus: Erforderliche Quadratsumme M2 für gegebene Standardabweichung *(numerical, 1.5 Pkt.)*

In einem automatisierten Unit-Test für Ihre `WelfordStatistics`-Klasse wurden $k = 11$ Temperaturmesswerte verarbeitet. Die empirische Stichprobenstandardabweichung wird von der Klasse als $s = 3{,}0\,\text{K}$ ausgewiesen.

Welchen numerischen Wert (in $\text{K}^2$) muss das interne Akkumulatorfeld $M_2$ zu diesem Zeitpunkt exakt besitzen?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `90` (± `0.1`) → 100%:** Exakt! Da s = 3.0 K => Stichprobenvarianz s^2 = 9.0 K^2. Aus s^2 = M2 / (k - 1) folgt M2 = s^2 * (11 - 1) = 9.0 * 10 = 90.0 K^2.
* **Wert `99` (± `0.1`) → 50%:** Teilpunkte: Sie haben mit k = 11 statt mit (k - 1) = 10 multipliziert (9.0 * 11 = 99.0).
* **Wert `30` (± `0.1`) → 50%:** Teilpunkte: Sie haben s * (k - 1) = 3.0 * 10 = 30.0 gerechnet (Quadrieren der Standardabweichung zu s^2 = 9.0 vergessen!).

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:** Aus $s = \sqrt{\frac{M_2}{k - 1}} = 3{,}0\,\text{K}$ folgt durch Quadrieren $s^2 = \frac{M_2}{k - 1} = 9{,}0\,\text{K}^2$. Multiplikation mit $k - 1 = 11 - 1 = 10$ ergibt $M_2 = 9{,}0 \cdot 10 = 90{,}0\,\text{K}^2$.

---

#### Frage 10.3: C#-Code-Tracing: Einheitsnormalenvektor eines schrägen Stabs (3-4-5-Dreieck) *(numerical, 1.5 Pkt.)*

Für einen schrägen Fachwerkstab von `(100, 100)` nach `(160, 180)` im Screen Space wird der Einheitsnormalenvektor `(nx, ny)` berechnet:

```csharp
double dx = 160.0 - 100.0; // 60.0
double dy = 180.0 - 100.0; // 80.0
double len = Math.Sqrt(dx * dx + dy * dy);
double ux = dx / len;
double uy = dy / len;
double nx = -uy;
```

Welchen numerischen Wert (als Dezimalzahl) erhält `nx`?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `-0.8` (± `0.01`) → 100%:** Richtig! len = sqrt(60^2 + 80^2) = sqrt(3600 + 6400) = 100.0; uy = 80.0 / 100.0 = 0.8; nx = -uy = -0.8.
* **Wert `0.8` (± `0.01`) → 50%:** Teilpunkte: Vorzeichenfehler! nx ist als -uy = -0.8 definiert.
* **Wert `0.6` (± `0.01`) → 50%:** Teilpunkte: 0.6 ist die Komponente ux = dx / len = 60 / 100 (bzw. ny), gefragt war aber nx = -uy = -0.8.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:** Mit $dx = 60$ und $dy = 80$ beträgt die Länge $\text{len} = \sqrt{60^2 + 80^2} = 100$. Damit ist $u_x = 0{,}6$, $u_y = 0{,}8$ und die X-Komponente des Normalenvektors $n_x = -u_y = -0{,}8$.

---

#### Frage 10.4: C#-Code-Lückentext: Box-Whisker-Plot-Element in ScottPlot 5 konfigurieren *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie den C#-Code zum Anlegen einer einzelnen Box (Median `50`, Quartile `40` und `60`, Antennen `25` bis `85`) für einen **ScottPlot 5** Box-Whisker-Plot:

```csharp
var box = new ScottPlot.Box {
    Position = 1,
    BoxMin = [[1]],
    BoxMax = [[2]],
    BoxMiddle = 50,
    WhiskerMin = 25,
    WhiskerMax = 85
};
MainPlot.Plot.Add.[[3]](new[] { box });
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `40`
* `[[2]]` (Gruppe 2): `60`
* `[[3]]` (Gruppe 3): `Boxes`
* `[[4]]` (Gruppe 1): `25`
* `[[5]]` (Gruppe 1): `85`
* `[[6]]` (Gruppe 2): `40`
* `[[7]]` (Gruppe 2): `25`
* `[[8]]` (Gruppe 3): `DataStreamer`
* `[[9]]` (Gruppe 3): `Signal`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung:** In `ScottPlot.Box` definieren `BoxMin` und `BoxMax` das 25-%-Quartil ($Q_1 = 40$) und das 75-%-Quartil ($Q_3 = 60$), `BoxMiddle` den Median (`50`) und `WhiskerMin/Max` die Antennenenden. Hinzugefügt wird die Liste über `Plot.Add.Boxes(...)`.

---

#### Frage 10.5: Konzept-Zuordnung: WPF-Vektorgrafik-Elemente und Eigenschaften (Kapitel 03) *(matching, 1.0 Pkt.)*

Ordnen Sie den vier WPF-Eigenschaften bzw. Klassen aus Kapitel 03 jeweils ihre technische Funktion beim Zeichnen von 2D-Vektorgrafiken zu (beachten Sie die zwei Überhang-Distraktoren).

**Zuordnungspaare & Überhang-Distraktoren (`matching`):**
* StrokeDashArray = new DoubleCollection { 4, 2 } $\to$ **Erzeugt ein gestricheltes Linienmuster (4 Einheiten Strich, 2 Einheiten Lücke) für Hilfslinien oder Symmetrieachsen**
* Panel.SetZIndex(uiElement, 10) $\to$ **Steuert die Zeichenreihenfolge (Tiefenebene) im Canvas, damit Knoten und Bemaßungen vor den Stäben liegen**
* Canvas.SetLeft(element, x - radius) und Canvas.SetTop(element, y - radius) $\to$ **Positioniert ein kreisförmiges Knoten-Ellipse-Element zentriert auf dem berechneten Screen-Punkt (x, y)**
* RenderTransform = new RotateTransform(angleDeg, centerX, centerY) $\to$ **Dreht einen Bemaßungs-TextBlock im Screen Space exakt parallel zur Neigung des zugehörigen Stabs**
* *(Überhang-Distraktor)* $\to$ Aktiviert den 3D-Tiefenpuffer (GL_DEPTH_TEST) der Grafikkarte für Dreiecksnetze
* *(Überhang-Distraktor)* $\to$ Berechnet die numerische Cholesky-Zerlegung der globalen Steifigkeitsmatrix

**Musterherleitung & Gesamt-Feedback:**
**Lösung:** `StrokeDashArray` steuert Strichelungen, `Panel.ZIndex` die Überdeckungsreihenfolge (z. B. Stäbe hinten, Knoten/Texte vorne), `SetLeft/Top` mit `-radius` zentriert Kreise und `RotateTransform` richtet Maßzahlen aus.

---

#### Frage 10.6: WPF-Koordinaten: Geräteunabhängige Pixel (DIP) und High-DPI-Skalierung *(multichoice, 1.0 Pkt.)*

Warum bleiben eine im WPF-Canvas gezeichnete Vektorlinie mit `StrokeThickness = 2.0` und eine Schriftgröße von `12.0` auch auf einem hochauflösenden 4K-Monitor mit $200\,\%$ Windows-Skalierung ($192\,\text{DPI}$) exakt gleich groß und gestochen scharf?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Weil WPF in geräteunabhängigen Einheiten (1/96 Zoll) rechnet und Vektorgeometrien vor der Rasterisierung automatisch mit dem Monitor-DPI-Faktor multipliziert.
  * *Feedback:* Richtig! Eine WPF-Einheit entspricht 1/96 Zoll. Bei 192 DPI (200 % Skalierung) rendert die Vektor-Engine eine Linie der Dicke 2.0 DIP automatisch mit 4 physischen Monitorpixeln.
* [ ] (0%) Weil WPF auf 4K-Monitoren die Bildschirmauflösung der Grafikkarte beim Programmstart zwangsweise auf Full-HD (1920 x 1080) herunterstellt.
  * *Feedback:* Falsch. WPF ändert niemals die native Bildschirmauflösung des Betriebssystems.
* [ ] (0%) Weil Canvas-Elemente intern als komprimierte JPEG-Bitmaps gespeichert werden, die ein neuronales Netz im Grafiktreiber nachschärft.
  * *Feedback:* Falsch. WPF Canvas speichert echte mathematische Vektorbeschreibungen, keine JPEG-Bitmaps.
* [ ] (0%) Weil die Eigenschaft ActualWidth eines Canvas die physische Monitorbreite in Zentimetern über die Webcam des Laptops optisch vermisst.
  * *Feedback:* Falsch. Die Umrechnung basiert rein auf dem im Betriebssystem hinterlegten DPI-Skalierungsfaktor (96 DPI Basis).

**Musterherleitung & Gesamt-Feedback:**
**Vorteil von Vektorgrafik (Kap. 03):** Durch die Kombination aus mathematischer Vektorbeschreibung und geräteunabhängigen Einheiten (DIP = $1/96\,\text{Zoll}$) sind WPF-Canvas-Zeichnungen vollständig auflösungsunabhängig.

---

#### Frage 10.7: C#-Bug-Diagnose: Dezentrierte Knotenkreise durch fehlenden Radius-Abzug bei Canvas.SetLeft/Top *(multichoice, 1.0 Pkt.)*

Ein Studierender zeichnet die Stäbe eines Fachwerks exakt zwischen den Screen-Koordinaten `(sx, sy)` der Knoten. Anschließend zeichnet er jeden Gelenkknoten als Kreis (`Ellipse` mit `Width = 12, Height = 12`) über `Canvas.SetLeft(ellipse, sx); Canvas.SetTop(ellipse, sy);`. Auf dem Bildschirm hängen alle Knotenkreise schräg rechts unterhalb der Stab-Endpunkte! Warum?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Canvas.SetLeft und SetTop positionieren die linke obere Ecke der Bounding-Box der Ellipse, weshalb der halbe Durchmesser (Radius 6 px) abgezogen werden muss.
  * *Feedback:* Exakt! Damit der Kreismittelpunkt auf (sx, sy) liegt, muss die linke obere Ecke der 12x12-Ellipse auf (sx - 6, sy - 6) gesetzt werden.
* [ ] (0%) Die Klasse Ellipse besitzt in WPF einen Konstruktionsfehler und zeichnet Kreise grundsätzlich um 45 Grad phasenverschoben zum Koordinatenursprung.
  * *Feedback:* Falsch. Ellipse arbeitet absolut präzise; Bezugspunkt aller UIElemente im Canvas ist immer deren linke obere Ecke.
* [ ] (0%) Für Kreise müssen Width und Height in WPF negativ angegeben werden, damit der Mittelpunkt automatisch in das Zentrum der Linie wandert.
  * *Feedback:* Falsch. Negative Breiten oder Höhen werfen in WPF sofort eine Laufzeit-Exception.
* [ ] (0%) Die Methoden Canvas.SetLeft und SetTop erwarten die Koordinaten in Millimetern statt in Pixeln, während Line.X1 und Y1 in Pixeln arbeiten.
  * *Feedback:* Falsch. Sowohl Line.X1/Y1 als auch Canvas.SetLeft/SetTop verwenden exakt dieselben geräteunabhängigen Einheiten (DIP).

**Musterherleitung & Gesamt-Feedback:**
**Merksatz für WPF Canvas:** Während `Line.X1/Y1` direkt Punktkoordinaten sind, positionieren `Canvas.SetLeft(el, x)` und `Canvas.SetTop(el, y)` stets die **linke obere Ecke** des Elements. Für einen zentrierten Kreis vom Radius $r$ gilt daher: `SetLeft(el, sx - r)` und `SetTop(el, sy - r)`.

---

#### Frage 10.8: Systemanalyse: Entkopplung von Datenmodell, Layout-Mathematik und UI-Rendering *(multichoice, 1.0 Pkt.)*

Welche **zwei** Software-Architekturprinzipien aus Kapitel 03 und 04 sorgen für wartbare, testbare und ruckelfreie Simulationsanwendungen?

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Das physikalische Domänenmodell speichert alle Größen ausschließlich in SI-Einheiten (Meter, Newton, Kelvin) und kennt keinerlei Pixel- oder Canvas-Klassen.
  * *Feedback:* Richtig! Durch die strikte Trennung von World Space (Domänenmodell) und Screen Space (View/Transform2D) bleibt die Physik unabhängig von der Fenstergröße.
* [x] **(50%)** Bei Fenstergrößenänderungen (SizeChanged) wird nur die Transformationsvorschrift (Transform2D) aktualisiert und neu gezeichnet, ohne die Simulation neu zu rechnen.
  * *Feedback:* Richtig! Ein Resize des Anwendungsfensters ändert nur die Projektion auf den Bildschirm (View), nicht aber den physikalischen Zustand des Digitalen Zwillings.
* [ ] (-50%) Die Knoten-Koordinaten im physikalischen Berechnungsmodell müssen bei jedem Zoomen direkt mit dem aktuellen Pixelmaßstab überschrieben werden.
  * *Feedback:* Falsch! Würde man die Modellkoordinaten beim Zoomen mit Pixelwerten überschreiben, würden sich alle Stablängen und Steifigkeiten im Physik-Löser verfälschen.
* [ ] (-50%) Statistische Kennwerte wie der Welford-Mittelwert dürfen nur durch Auslesen der Bildschirm-Pixelfarben aus der fertigen Grafik-Bitmap ermittelt werden.
  * *Feedback:* Falsch! Statistik wird präzise auf den numerischen double-Rohdaten im Datenmodell berechnet, niemals aus gerasterten Bildschirm-Pixeln.

**Musterherleitung & Gesamt-Feedback:**
**Zusammenfassung:** Saubere Simulationsarchitektur trennt das **physikalische Modell** (World Space, SI-Einheiten, Welford-Statistik) strikt von der **Darstellungsschicht** (`Transform2D`, `Canvas`, `ScottPlot 5`).

---

