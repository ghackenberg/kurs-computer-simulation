# Quiz 02 - Test 04 (Prüfungstest): Vertikales Letterboxing, Welford-Varianz & Box-Plot-IQR

**Test-ID:** `Test_04_Pruefung`  
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_04_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [Q02_T04_Q1]: Affine 2D-Transformation: Vertikaler Letterboxing-Offset und Y-Screen-Position *(cloze, 2.0 Pkt.)*

Ein Portalkran mit der Breite $\Delta X = 25\,\text{m}$ ($x_{\min}=0\,\text{m}$, $x_{\max}=25\,\text{m}$) und der Höhe $\Delta Y = 5\,\text{m}$ ($y_{\min}=0\,\text{m}$, $y_{\max}=5\,\text{m}$) wird auf einem WPF-Canvas der Gesamthöhe $H_{\text{canvas}} = 460\,\text{px}$ mit umlaufendem Rand $\text{margin} = 30\,\text{px}$ dargestellt. Die nutzbare Zeichenfläche beträgt $W_{\text{eff}} = 500\,\text{px}$ mal $H_{\text{eff}} = 400\,\text{px}$. Der uniforme Skalierungsfaktor wurde bereits zu $s = 20\,\text{px/m}$ bestimmt.

**a)** Berechnen Sie den gesamten vertikalen Randabstand $\text{offset}_Y$ (in $\text{px}$) vom unteren Canvas-Rand bis zur Bauteilunterkante $y_{\min}=0\,\text{m}$ (inklusive `margin` und vertikaler Letterboxing-Zentrierung): {1:NUMERICAL:=180:0.5#Exakt! Belegte Höhe = 5 * 20 = 100 px; Freiraum = 400 - 100 = 300 px; offset_Y = 30 + 300/2 = 180 px.~%50%150:0.5#Teilpunkte: 150 px ist nur der halbe Freiraum (400-100)/2 ohne den unteren Rand margin = 30 px.}

**b)** Berechnen Sie die vertikale Bildschirmkoordinate $Y_{\text{screen}}$ (in $\text{px}$) für die Laufkatze auf Höhe $y = 4{,}0\,\text{m}$ unter Beachtung der WPF-Y-Inversion: {1:NUMERICAL:=200:0.5#Richtig! Y_screen = 460 - (180 + 4.0 * 20) = 460 - 260 = 200 px.~%50%260:0.5#Teilpunkte: 260 px ist der Abstand vom unteren Rand ohne Y-Inversion (460 - 260 = 200 px).}


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

  * **Belegte Höhe:** $H_{\text{used}} = \Delta Y \cdot s = 5\,\text{m} \cdot 20\,\text{px/m} = 100\,\text{px}$.

  * **Vertikaler Offset:** $\text{offset}_Y = \text{margin} + \frac{H_{\text{eff}} - H_{\text{used}}}{2} = 30 + \frac{400 - 100}{2} = 180\,\text{px}$.

  * **Y-Screen mit Inversion:** $Y_{\text{screen}} = H_{\text{canvas}} - (\text{offset}_Y + y \cdot s) = 460 - (180 + 80) = 200\,\text{px}$.

---

## Frage 2 [Q02_T04_Q2]: Welford-Online-Algorithmus: Empirische Stichprobenvarianz aus M2 berechnen *(numerical, 1.5 Pkt.)*

Nach $k = 9$ Kraftmessungen an einer Hydraulikpresse enthält das Welford-Statistikobjekt den laufenden Mittelwert $\mu_9 = 45{,}0\,\text{kN}$ sowie die kumulierte Abweichungsquadratsumme $M_{2,9} = 72{,}0\,\text{kN}^2$.

Berechnen Sie die erwartungstreue empirische Stichprobenvarianz $s^2$ (in $\text{kN}^2$) dieser Messreihe.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `9` (± `0.05`) → 100%:** Exakt! Mit Bessel-Korrektur gilt s^2 = M2 / (k - 1) = 72.0 / (9 - 1) = 72.0 / 8 = 9.0 kN^2.
* **Wert `8` (± `0.05`) → 50%:** Teilpunkte: Sie haben durch k = 9 (Populationsvarianz) statt durch k - 1 = 8 (erwartungstreue Stichprobenvarianz) geteilt.
* **Wert `3` (± `0.05`) → 50%:** Teilpunkte: 3.0 kN ist die Standardabweichung s = sqrt(9), gefragt war aber die Varianz s^2 = 9.0 kN^2.

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:** Für die erwartungstreue Stichprobenvarianz gilt $s^2 = \frac{M_{2,k}}{k - 1} = \frac{72{,}0}{9 - 1} = 9{,}0\,\text{kN}^2$.

---

## Frage 3 [Q02_T04_Q3]: C#-Code-Tracing: Box-Whisker-Plot Interquartilsabstand (IQR) und oberes Whisker-Limit *(numerical, 1.5 Pkt.)*

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

## Frage 4 [Q02_T04_Q4]: C#-Code-Lückentext: Allokationsfreier Ringpuffer (Circular Buffer) – Einfügen & Überschreiben *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [Q02_T04_Q5]: Pipeline-Reihenfolge: Numerisch stabiler Einzelschritt im Welford-Online-Algorithmus *(ddwtos, 1.0 Pkt.)*

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

## Frage 6 [Q02_T04_Q6]: Koordinatentransformation: Warum anisotrope Skalierung (sx != sy) in CAD-Zeichnungen verboten ist *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [Q02_T04_Q7]: C#-Bug-Diagnose: Speicherleck durch Canvas.Children.Add ohne Clear im Render-Loop *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [Q02_T04_Q8]: Systemanalyse: ScottPlot 5 DataStreamer-Darstellungsmodi (Wipe vs. Scroll) *(multichoice, 1.0 Pkt.)*

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
