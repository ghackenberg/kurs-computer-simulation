# Quiz 02 - Test 10 (Prüfungstest): Knotenabstand aus Screen-Koordinaten, Welford-Rückrechnung & DPI

**Test-ID:** `Test_10_Pruefung`  
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_10_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [Q02_T10_Q1]: Affine 2D-Transformation: Wahre Bauteil-Spannweite aus Bildschirm-Koordinaten bestimmen *(cloze, 2.0 Pkt.)*

Ein Prüfstandsrahmen mit der physikalischen Breite $\Delta X = 8{,}0\,\text{m}$ und Höhe $\Delta Y = 5{,}0\,\text{m}$ ist verzerrungsfrei (Uniform Scaling) in ein nutzbares Canvas-Fenster von $W_{\text{eff}} = 640\,\text{px}$ Breite und $H_{\text{eff}} = 500\,\text{px}$ Höhe eingepasst. Auf dem Bildschirm messen Sie zwischen zwei Lagermittelpunkten einen horizontalen Pixelabstand von $\Delta X_{\text{screen}} = 240\,\text{px}$ und einen vertikalen Pixelabstand von $\Delta Y_{\text{screen}} = 320\,\text{px}$ (d. h. eine schräge Bildschirmdistanz von $L_{\text{screen}} = \sqrt{240^2 + 320^2} = 400\,\text{px}$).

**a)** Berechnen Sie den verwendeten uniformen Skalierungsfaktor $s$ in $\text{px/m}$: {1:NUMERICAL:=80:0.1#Exakt! s = min(640 / 8.0, 500 / 5.0) = min(80, 100) = 80 px/m.~%50%100:0.1#Teilpunkte: Sie haben sy = 500 / 5.0 = 100 px/m statt min(80, 100) = 80 px/m gewählt.}

**b)** Berechnen Sie den wahren physikalischen Euklidischen Abstand $L_{\text{world}}$ (in $\text{m}$) zwischen den beiden Lagern im World Space: {1:NUMERICAL:=5.0:0.05#Richtig! L_world = L_screen / s = 400 px / 80 (px/m) = 5.0 m (bzw. sqrt(3.0^2 + 4.0^2) = 5.0 m).~%50%4.0:0.05#Teilpunkte: Folgefehler aus Teil a (400 / 100 = 4.0 m) oder nur die vertikale Komponente 320 / 80 = 4.0 m betrachtet.}


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

  * **Uniform Scaling:** $s = \min\left(\frac{640}{8{,}0}, \frac{500}{5{,}0}\right) = \min(80, 100) = 80\,\text{px/m}$.

  * **Wahre Distanz im World Space:** $\Delta X_{\text{world}} = \frac{240}{80} = 3{,}0\,\text{m}$, $\Delta Y_{\text{world}} = \frac{320}{80} = 4{,}0\,\text{m}$, also $L_{\text{world}} = \sqrt{3{,}0^2 + 4{,}0^2} = \frac{400\,\text{px}}{80\,\text{px/m}} = 5{,}0\,\text{m}$.

---

## Frage 2 [Q02_T10_Q2]: Welford-Online-Algorithmus: Erforderliche Quadratsumme M2 für gegebene Standardabweichung *(numerical, 1.5 Pkt.)*

In einem automatisierten Unit-Test für Ihre `WelfordStatistics`-Klasse wurden $k = 11$ Temperaturmesswerte verarbeitet. Die empirische Stichprobenstandardabweichung wird von der Klasse als $s = 3{,}0\,\text{K}$ ausgewiesen.

Welchen numerischen Wert (in $\text{K}^2$) muss das interne Akkumulatorfeld $M_2$ zu diesem Zeitpunkt exakt besitzen?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `90` (± `0.1`) → 100%:** Exakt! Da s = 3.0 K => Stichprobenvarianz s^2 = 9.0 K^2. Aus s^2 = M2 / (k - 1) folgt M2 = s^2 * (11 - 1) = 9.0 * 10 = 90.0 K^2.
* **Wert `99` (± `0.1`) → 50%:** Teilpunkte: Sie haben mit k = 11 statt mit (k - 1) = 10 multipliziert (9.0 * 11 = 99.0).
* **Wert `30` (± `0.1`) → 50%:** Teilpunkte: Sie haben s * (k - 1) = 3.0 * 10 = 30.0 gerechnet (Quadrieren der Standardabweichung zu s^2 = 9.0 vergessen!).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:** Aus $s = \sqrt{\frac{M_2}{k - 1}} = 3{,}0\,\text{K}$ folgt durch Quadrieren $s^2 = \frac{M_2}{k - 1} = 9{,}0\,\text{K}^2$. Multiplikation mit $k - 1 = 11 - 1 = 10$ ergibt $M_2 = 9{,}0 \cdot 10 = 90{,}0\,\text{K}^2$.

---

## Frage 3 [Q02_T10_Q3]: C#-Code-Tracing: Einheitsnormalenvektor eines schrägen Stabs (3-4-5-Dreieck) *(numerical, 1.5 Pkt.)*

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

## Frage 4 [Q02_T10_Q4]: C#-Code-Lückentext: Box-Whisker-Plot-Element in ScottPlot 5 konfigurieren *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [Q02_T10_Q5]: Konzept-Zuordnung: WPF-Vektorgrafik-Elemente und Eigenschaften (Kapitel 03) *(matching, 1.0 Pkt.)*

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

## Frage 6 [Q02_T10_Q6]: WPF-Koordinaten: Geräteunabhängige Pixel (DIP) und High-DPI-Skalierung *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [Q02_T10_Q7]: C#-Bug-Diagnose: Dezentrierte Knotenkreise durch fehlenden Radius-Abzug bei Canvas.SetLeft/Top *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [Q02_T10_Q8]: Systemanalyse: Entkopplung von Datenmodell, Layout-Mathematik und UI-Rendering *(multichoice, 1.0 Pkt.)*

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
