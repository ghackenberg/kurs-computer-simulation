# Quiz 02 - Test 08 (Prüfungstest): Maus-Dragging-Delta, ScottPlot-Downsampling & Hit-Testing

**Test-ID:** `Test_08_Pruefung`  
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_08_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [Q02_T08_Q1]: Inverse 2D-Transformation beim Maus-Dragging: Verschiebungsvektor in Weltkoordinaten *(cloze, 2.0 Pkt.)*

In einem interaktiven 2D-Kinematik-Editor mit dem eingefrorenen uniformen Skalierungsfaktor $s = 25\,\text{px/m}$ zieht eine Ingenieurin einen Gelenkknoten mit gedrückter Maustaste von der Start-Bildschirmkoordinate $P_{\text{start}} = (150\,\text{px}, 300\,\text{px})$ zur neuen Bildschirmkoordinate $P_{\text{end}} = (225\,\text{px}, 200\,\text{px})$ (beachten Sie: der Bildschirmwert $Y_{\text{screen}}$ ist von $300\,\text{px}$ auf $200\,\text{px}$ gesunken, die Maus wurde also auf dem Monitor nach **oben** bewegt).

**a)** Berechnen Sie die resultierende horizontale Verschiebung $\Delta X_{\text{world}} = X_{\text{world,end}} - X_{\text{world,start}}$ des Knotens in Metern ($\text{m}$): {1:NUMERICAL:=3.0:0.05#Exakt! Delta_X_screen = 225 - 150 = +75 px; Delta_X_world = +75 / 25 = +3.0 m.~%50%-3.0:0.05#Teilpunkte: Vorzeichenfehler! Eine Bewegung nach rechts (von 150 auf 225 px) vergrößert X_world um +3.0 m.}

**b)** Berechnen Sie die resultierende vertikale Verschiebung $\Delta Y_{\text{world}} = Y_{\text{world,end}} - Y_{\text{world,start}}$ des Knotens in Metern ($\text{m}$) unter Beachtung der WPF-Y-Achsen-Inversion: {1:NUMERICAL:=4.0:0.05#Richtig! Da Y_screen um 100 px nach oben (von 300 auf 200) wandert, steigt die physikalische Höhe um Delta_Y_world = -(200 - 300) / 25 = +4.0 m.~%50%-4.0:0.05#Teilpunkte: Sie haben die Y-Inversion vergessen und (200 - 300) / 25 = -4.0 m gerechnet (Bewegung nach oben bedeutet positives Delta_Y_world!).}


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (Differenz-Transformation):**

  * **Horizontale Änderung:** $\Delta X_{\text{world}} = \frac{X_{\text{screen,end}} - X_{\text{screen,start}}}{s} = \frac{225 - 150}{25} = +3{,}0\,\text{m}$.

  * **Vertikale Änderung (mit Y-Inversion):** Da $Y_{\text{screen}}$ nach unten wächst, gilt für Differenzen $\Delta Y_{\text{world}} = -\frac{Y_{\text{screen,end}} - Y_{\text{screen,start}}}{s} = -\frac{200 - 300}{25} = +4{,}0\,\text{m}$.

---

## Frage 2 [Q02_T08_Q2]: ScottPlot 5 Signal-Downsampling: Kompressionsrate pro Pixelspalte berechnen *(numerical, 1.5 Pkt.)*

Ein Prüfstands-Datensatz mit $N = 400.000$ äquidistanten Druckmesswerten wird in einem **ScottPlot 5** `Signal`-Plot vollständig dargestellt. Die Zeichenfläche (Data Area) des Diagramms auf dem Monitor hat eine Breite von exakt $W_{\text{plot}} = 800\,\text{Pixelspalten}$.

Wie viele Roh-Messwerte $M$ fasst der interne Min/Max-Downsampling-Algorithmus von `Signal` im Durchschnitt in **jeder einzelnen Pixelspalte** zusammen?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `500` (± `1`) → 100%:** Exakt! M = N / W_plot = 400.000 / 800 = 500 Messwerte pro Pixelspalte.
* **Wert `250` (± `1`) → 50%:** Teilpunkte: Sie haben zusätzlich durch 2 geteilt (weil Min und Max gezeichnet werden); pro Spalte werden aber 500 Rohpunkte aggregiert.
* **Wert `0.002` (± `0.0005`) → 50%:** Teilpunkte: Kehrwertfehler (800 / 400.000 = 0.002 statt 400.000 / 800 = 500).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:** Auf $W_{\text{plot}} = 800$ horizontale Pixelspalten verteilen sich $N = 400.000$ Samples. Damit entfallen $M = \frac{400.000}{800} = 500$ Samples auf jede Pixelspalte, aus denen jeweils das Minimum und Maximum bestimmt wird.

---

## Frage 3 [Q02_T08_Q3]: C#-Code-Tracing: Lesbarkeitskorrektur des Bemaßungswinkels nach DIN 406 *(numerical, 1.5 Pkt.)*

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

## Frage 4 [Q02_T08_Q4]: C#-Code-Lückentext: Wurzelfreies Hit-Testing für Knotenauswahl im Screen Space *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [Q02_T08_Q5]: Pipeline-Reihenfolge: Entkoppeltes Echtzeit-Datenstreaming mit Ringpuffer und UI-Timer *(ddwtos, 1.0 Pkt.)*

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

## Frage 6 [Q02_T08_Q6]: Farbsemantik & Vektordarstellung: Kodierung von Stabkräften im 2D-Fachwerk-Viewer *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [Q02_T08_Q7]: C#-Bug-Diagnose: Falsche Stichprobenvarianz durch Integer-Division in C# *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [Q02_T08_Q8]: Systemanalyse: Gruppierte Balkendiagramme und Box-Whisker-Plots in ScottPlot 5 *(multichoice, 1.0 Pkt.)*

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
