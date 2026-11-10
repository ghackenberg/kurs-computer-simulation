# Quiz 02 - Test 07 (Prüfungstest): Negative Weltkoordinaten, Pfeilflügel & GC-Allokationsfallen

**Test-ID:** `Test_07_Pruefung`  
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_07_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [Q02_T07_Q1]: Affine 2D-Transformation: Ursprungsverschiebung bei negativen Weltkoordinaten (x_min < 0) *(cloze, 2.0 Pkt.)*

Ein symmetrisches Roboter-Arbeitsfeld erstreckt sich in X-Richtung von $x_{\min} = -4{,}0\,\text{m}$ bis $x_{\max} = +6{,}0\,\text{m}$ und in Y-Richtung von $y_{\min} = -2{,}0\,\text{m}$ bis $y_{\max} = +3{,}0\,\text{m}$. Es wird verzerrungsfrei auf eine nutzbare Canvas-Fläche von $W_{\text{eff}} = 500\,\text{px}$ mal $H_{\text{eff}} = 300\,\text{px}$ abgebildet; der linke Offset beträgt $\text{offset}_X = 50\,\text{px}$.

**a)** Berechnen Sie den verzerrungsfreien Skalierungsfaktor $s$ in $\text{px/m}$: {1:NUMERICAL:=50:0.1#Exakt! Delta_X = 6 - (-4) = 10 m, Delta_Y = 3 - (-2) = 5 m; s = min(500/10, 300/5) = min(50, 60) = 50 px/m.~%50%60:0.1#Teilpunkte: Sie haben sy = 300/5 = 60 px/m statt min(50, 60) = 50 px/m gewählt.}

**b)** Berechnen Sie die horizontale Bildschirmkoordinate $X_{\text{screen}}$ (in $\text{px}$) des Koordinatenursprungs $x = 0{,}0\,\text{m}$: {1:NUMERICAL:=250:0.5#Richtig! X_screen = offset_X + (0.0 - (-4.0)) * 50 = 50 + 4.0 * 50 = 250 px.~%50%50:0.5#Teilpunkte: Sie haben (x - x_min) vergessen und nur offset_X + 0 * 50 = 50 px gerechnet (50 px liegt aber bei x_min = -4.0 m!).}


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

  * **Spannweiten:** $\Delta X = 6{,}0 - (-4{,}0) = 10{,}0\,\text{m}$, $\Delta Y = 3{,}0 - (-2{,}0) = 5{,}0\,\text{m}$.

  * **Uniform Scaling:** $s = \min(500/10, 300/5) = \min(50, 60) = 50\,\text{px/m}$.

  * **Screen-Position für $x = 0$:** Wichtig ist die Subtraktion von $x_{\min}$: $X_{\text{screen}} = \text{offset}_X + (x - x_{\min}) \cdot s = 50 + (0 - (-4{,}0)) \cdot 50 = 50 + 200 = 250\,\text{px}$.

---

## Frage 2 [Q02_T07_Q2]: Pfeilspitzen-Geometrie im Screen Space: Flügelpunkt-Koordinate berechnen *(numerical, 1.5 Pkt.)*

Ein vertikaler Kraftpfeil zeigt auf dem WPF-Canvas exakt senkrecht nach unten (Einheitsrichtungsvektor im Screen Space $u_x = 0{,}0$, $u_y = +1{,}0$; Normalenvektor $n_x = -u_y = -1{,}0$, $n_y = u_x = 0{,}0$). Die Pfeilspitze liegt am Bildschirm-Punkt $\text{tip} = (200\,\text{px}, 300\,\text{px})$. Die Pfeilspitzenlänge beträgt $L_{\text{arrow}} = 14\,\text{px}$ und die halbe Pfeilbreite $W_{\text{arrow}} = 6\,\text{px}$.

Berechnen Sie die vertikale Bildschirmkoordinate $Y_{\text{wing}}$ (in $\text{px}$) der beiden hinteren Pfeilflügel-Eckpunkte.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `286` (± `0.1`) → 100%:** Exakt! Y_wing = tip.Y - uy * L_arrow + ny * W_arrow = 300 - 1.0 * 14 + 0 * 6 = 286.0 px.
* **Wert `314` (± `0.1`) → 50%:** Teilpunkte: Vorzeichenfehler! Sie haben + uy * L_arrow (300 + 14 = 314) gerechnet, die Flügel liegen aber entgegen der Pfeilrichtung hinter der Spitze.
* **Wert `194` (± `0.1`) → 50%:** Teilpunkte: 194 px (200 - 6) ist die X-Koordinate des linken Flügels, gefragt war aber die Y-Koordinate (286 px).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:** Für die Flügeleckpunkte gilt $\vec{P}_{\text{wing}} = \vec{P}_{\text{tip}} - L_{\text{arrow}} \cdot \vec{u} \pm W_{\text{arrow}} \cdot \vec{n}$. Für die Y-Komponente folgt $Y_{\text{wing}} = 300 - 14 \cdot 1{,}0 \pm 6 \cdot 0{,}0 = 286\,\text{px}$.

---

## Frage 3 [Q02_T07_Q3]: C#-Code-Tracing: Welford-Varianz nach drei konkreten Messwerten *(numerical, 1.5 Pkt.)*

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

## Frage 4 [Q02_T07_Q4]: C#-Code-Lückentext: Statische WPF-Pinsel mit Freeze() für High-FPS optimieren *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [Q02_T07_Q5]: Konzept-Zuordnung: Fehlerbilder in der 2D-Vektorgrafik und ihre technischen Ursachen *(matching, 1.0 Pkt.)*

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

## Frage 6 [Q02_T07_Q6]: MSAGL-Architektur: Wahl zwischen Sugiyama-Schichtenlayout und Force-Directed Layout (MDS) *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [Q02_T07_Q7]: C#-Bug-Diagnose: Garbage-Collection-Stottern durch Array-Neuallokation im 60-Hz-Timer *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [Q02_T07_Q8]: Systemanalyse: Koordinatensysteme in WPF, ScottPlot 5 und MSAGL *(multichoice, 1.0 Pkt.)*

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
