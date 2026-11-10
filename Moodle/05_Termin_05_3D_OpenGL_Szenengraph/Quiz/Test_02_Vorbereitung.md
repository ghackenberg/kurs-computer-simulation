# Quiz 02 - Test 02 (Vorbereitungstest): Letterboxing-Offsets, Welford-M2 & ScottPlot-Streaming

**Test-ID:** `Test_02_Vorbereitung`  
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_02_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben zum Üben)

---

## Frage 1 [Q02_T02_Q1]: Affine 2D-Transformation: Letterboxing-Zentrierung und X-Screen-Koordinate *(cloze, 2.0 Pkt.)*

Ein hydraulischer Steuerblock mit den Abmessungen $\Delta X = 2{,}0\,\text{m}$ ($x_{\min}=0\,\text{m}$, $x_{\max}=2{,}0\,\text{m}$) und $\Delta Y = 2{,}0\,\text{m}$ soll mit einem umlaufenden Rand von $\text{margin} = 40\,\text{px}$ verzerrungsfrei auf einem WPF-Canvas der Gesamtgröße $W_{\text{canvas}} = 680\,\text{px}$ mal $H_{\text{canvas}} = 480\,\text{px}$ zentriert werden (nutzbare Fläche $W_{\text{eff}} = 600\,\text{px}$, $H_{\text{eff}} = 400\,\text{px}$). Der uniforme Skalierungsfaktor beträgt $s = 200\,\text{px/m}$.

**a)** Berechnen Sie den gesamten horizontalen Randabstand $\text{offset}_X$ (in $\text{px}$) vom linken Canvas-Rand bis zum Beginn des Bauteils bei $x_{\min}=0\,\text{m}$ (inklusive `margin` und Letterboxing-Zentrierung): {1:NUMERICAL:=140:0.5#Exakt! Gebrauchte Breite = 2.0 * 200 = 400 px; Freiraum = 600 - 400 = 200 px; offset_X = 40 + 200/2 = 140 px.~%50%100:0.5#Teilpunkte: 100 px ist nur der halbe Letterboxing-Freiraum (600-400)/2 ohne den linken Rand margin = 40 px.}

**b)** Berechnen Sie die horizontale Bildschirmkoordinate $X_{\text{screen}}$ (in $\text{px}$) für eine Ventilbohrung bei $x = 1{,}25\,\text{m}$: {1:NUMERICAL:=390:0.5#Richtig! X_screen = 140 + 1.25 * 200 = 140 + 250 = 390 px.~%50%290:0.5#Teilpunkte: Folgefehler aus Teil a (40 px margin vergessen: 40 + 250 = 290 px) oder unzentriert gerechnet.}


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

  * **Belegte Breite in Pixeln:** $W_{\text{used}} = \Delta X \cdot s = 2{,}0\,\text{m} \cdot 200\,\text{px/m} = 400\,\text{px}$.

  * **Horizontaler Letterboxing-Offset:** $\text{offset}_X = \text{margin} + \frac{W_{\text{eff}} - W_{\text{used}}}{2} = 40 + \frac{600 - 400}{2} = 40 + 100 = 140\,\text{px}$.

  * **Bildschirmkoordinate:** $X_{\text{screen}} = \text{offset}_X + (x - x_{\min}) \cdot s = 140 + 1{,}25 \cdot 200 = 390\,\text{px}$.

---

## Frage 2 [Q02_T02_Q2]: Welford-Online-Algorithmus: Aktualisierung der Abweichungsquadratsumme M2 *(numerical, 1.5 Pkt.)*

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

## Frage 3 [Q02_T02_Q3]: C#-Code-Tracing: Hit-Testing-Abstandsquadrat im Screen Space *(numerical, 1.5 Pkt.)*

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

## Frage 4 [Q02_T02_Q4]: C#-Code-Lückentext: Rücktransformation ScreenToWorld für Maus-Interaktion *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [Q02_T02_Q5]: Pipeline-Reihenfolge: Die 4 Phasen des Sugiyama-Schichtenlayouts in MSAGL *(ddwtos, 1.0 Pkt.)*

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

## Frage 6 [Q02_T02_Q6]: WPF-Architektur: Retained Mode (Canvas) vs. Immediate-Mode-nahes DrawingVisual *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [Q02_T02_Q7]: C#-Bug-Diagnose: Katastrophale Auslöschung bei der naiven Ein-Pass-Varianzformel *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [Q02_T02_Q8]: Systemanalyse: WPF-Ressourcen-Management & Pen/Brush-Freezing *(multichoice, 1.0 Pkt.)*

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
