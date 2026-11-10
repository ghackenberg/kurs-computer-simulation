# Quiz 02 - Test 03 (Vorbereitungstest): Inverse Transformation, 3-Sigma-Grenzen & ScottPlot-Refresh

**Test-ID:** `Test_03_Vorbereitung`  
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_03_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben zum Üben)

---

## Frage 1 [Q02_T03_Q1]: Inverse 2D-Transformation (ScreenToWorld): Mausklick in Weltkoordinaten umrechnen *(cloze, 2.0 Pkt.)*

Auf einem WPF-Canvas der Gesamthöhe $H_{\text{canvas}} = 500\,\text{px}$ wird ein Maschinenfundament mit $x_{\min} = -5{,}0\,\text{m}$ und $y_{\min} = 0{,}0\,\text{m}$ dargestellt. Die aktuelle Transformation nutzt den uniformen Skalierungsfaktor $s = 40\,\text{px/m}$, den horizontalen Offset $\text{offset}_X = 60\,\text{px}$ und den vertikalen Offset vom unteren Rand $\text{offset}_Y = 50\,\text{px}$. Ein Ingenieur klickt mit der Maus exakt auf die Bildschirmkoordinate $(X_{\text{screen}}, Y_{\text{screen}}) = (300\,\text{px}, 170\,\text{px})$.

**a)** Berechnen Sie die zugehörige physikalische Weltkoordinate $X_{\text{world}}$ in $\text{m}$: {1:NUMERICAL:=1.0:0.05#Exakt! X_world = x_min + (300 - 60) / 40 = -5.0 + 240 / 40 = -5.0 + 6.0 = 1.0 m.~%50%6.0:0.05#Teilpunkte: 6.0 m ist der relative Abstand (300 - 60)/40 ohne Addition des Ursprungswerts x_min = -5.0 m.}

**b)** Berechnen Sie die zugehörige physikalische Weltkoordinate $Y_{\text{world}}$ in $\text{m}$ unter Berücksichtigung der Y-Inversion: {1:NUMERICAL:=7.0:0.05#Richtig! y_bottom = 500 - 170 = 330 px; Y_world = 0.0 + (330 - 50) / 40 = 280 / 40 = 7.0 m.~%50%3.0:0.05#Teilpunkte: Sie haben die Y-Inversion vergessen und direkt (170 - 50) / 40 = 3.0 m gerechnet!}


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (ScreenToWorld):**

  * **X-Rücktransformation:** $X_{\text{world}} = x_{\min} + \frac{X_{\text{screen}} - \text{offset}_X}{s} = -5{,}0 + \frac{300 - 60}{40} = -5{,}0 + 6{,}0 = 1{,}0\,\text{m}$.

  * **Y-Rücktransformation (inkl. Y-Inversion):** Abstand vom unteren Rand $y_{\text{bottom}} = H_{\text{canvas}} - Y_{\text{screen}} = 500 - 170 = 330\,\text{px}$. Damit gilt $Y_{\text{world}} = y_{\min} + \frac{330 - \text{offset}_Y}{s} = 0{,}0 + \frac{330 - 50}{40} = \frac{280}{40} = 7{,}0\,\text{m}$.

---

## Frage 2 [Q02_T03_Q2]: Statistische Prozesskontrolle (SPC): Obere 3-Sigma-Warngrenze aus Welford-Daten *(numerical, 1.5 Pkt.)*

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

## Frage 3 [Q02_T03_Q3]: C#-Code-Tracing: Gruppiertes Balkendiagramm (Bar Plot Offset) in ScottPlot 5 *(numerical, 1.5 Pkt.)*

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

## Frage 4 [Q02_T03_Q4]: C#-Code-Lückentext: Welford-Online-Update in C# implementieren *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [Q02_T03_Q5]: Konzept-Zuordnung: Geometrie- und Layout-Komponenten in Kapitel 03 & 04 *(matching, 1.0 Pkt.)*

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

## Frage 6 [Q02_T03_Q6]: ScottPlot 5 Performance: Warum Signal-Plots bei großen Zeitreihen schneller sind als Scatter-Plots *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [Q02_T03_Q7]: C#-Bug-Diagnose: Hohe CPU-Last durch verfrühtes WpfPlot.Refresh() in Schleifen *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [Q02_T03_Q8]: Systemanalyse: DIN-406-Bemaßungsgeometrie & Vektornormalen im 2D-Raum *(multichoice, 1.0 Pkt.)*

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
