# Quiz 02 - Test 06 (Prüfungstest): DIN-406-Maßhilfslinien, 3-Sigma-Spannweite & Ringpuffer-Wrap

**Test-ID:** `Test_06_Pruefung`  
**Kategorie:** `$course$/Quiz_02_Termin_05/Test_06_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [Q02_T06_Q1]: DIN-406-Bemaßungsgeometrie: Gesamtlänge der Maßhilfslinie und Endpunkt-Koordinate *(cloze, 2.0 Pkt.)*

Ein horizontaler Träger verläuft auf dem WPF-Canvas exakt entlang der Bildschirm-Horizontalen bei $Y_{\text{stab}} = 300\,\text{px}$ (von $X_1 = 100\,\text{px}$ bis $X_2 = 500\,\text{px}$). Nach DIN 406 soll oberhalb des Trägers (also in Richtung kleinerer WPF-Y-Werte, Normalenvektor $n_x = 0, n_y = -1$) eine Maßlinie im Abstand $d_{\text{dim}} = 28\,\text{px}$ gezeichnet werden. Die beiden vertikalen Maßhilfslinien beginnen mit einem kleinen Spalt von $g = 4\,\text{px}$ vom Träger entfernt und ragen um den normgerechten Überstand $e = 8\,\text{px}$ über die Maßlinie hinaus.

**a)** Berechnen Sie die gezeichnete sichtbare Strichlänge $L_{\text{ext}}$ (in $\text{px}$) einer solchen Maßhilfslinie (vom Spaltende bis zum Ende des Überstands): {1:NUMERICAL:=32:0.1#Exakt! Die Maßhilfslinie reicht von Abstand g = 4 px bis (d_dim + e) = 28 + 8 = 36 px; ihre Länge ist 36 - 4 = 32 px.~%50%36:0.1#Teilpunkte: 36 px ist der Gesamtabstand vom Bauteil (28 + 8) ohne Abzug des 4-px-Spalts g am Bauteilrand.}

**b)** Berechnen Sie die vertikale Bildschirmkoordinate $Y_{\text{end}}$ (in $\text{px}$) des äußeren oberen Endpunkts der Maßhilfslinie (inklusive Überstand $e$): {1:NUMERICAL:=264:0.5#Richtig! Y_end = Y_stab - (d_dim + e) = 300 - (28 + 8) = 300 - 36 = 264 px.~%50%272:0.5#Teilpunkte: 272 px (300 - 28) ist die Koordinate der Maßlinie selbst ohne den 8-px-Überstand e der Maßhilfslinie!}


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (DIN-406-Maßhilfslinie):**

  * **Start- und Endabstand vom Stab:** Die Maßhilfslinie startet bei $d_{\text{start}} = g = 4\,\text{px}$ und endet bei $d_{\text{end}} = d_{\text{dim}} + e = 28 + 8 = 36\,\text{px}$.

  * **Gezeichnete Strichlänge:** $L_{\text{ext}} = d_{\text{end}} - d_{\text{start}} = 36 - 4 = 32\,\text{px}$.

  * **Oberer Endpunkt im Screen Space:** Da „oben“ im WPF-Canvas kleineren Y-Werten entspricht, gilt $Y_{\text{end}} = Y_{\text{stab}} - d_{\text{end}} = 300 - 36 = 264\,\text{px}$.

---

## Frage 2 [Q02_T06_Q2]: Statistische Prozesskontrolle: Breite des gesamten ±3-Sigma-Toleranzbands *(numerical, 1.5 Pkt.)*

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

## Frage 3 [Q02_T06_Q3]: C#-Code-Tracing: Ringpuffer-Zustand nach Überlauf (Wrap-Around) *(numerical, 1.5 Pkt.)*

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

## Frage 4 [Q02_T06_Q4]: C#-Code-Lückentext: ScottPlot 5 DataStreamer im Wipe-Modus konfigurieren *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [Q02_T06_Q5]: Pipeline-Reihenfolge: 2D-Transformationskette vom Bauteilmodell zum WPF-Canvas *(ddwtos, 1.0 Pkt.)*

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

## Frage 6 [Q02_T06_Q6]: Visualisierungs-Didaktik: Wann Box-Whisker-Plots einem Liniendiagramm überlegen sind *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [Q02_T06_Q7]: C#-Bug-Diagnose: Auf dem Kopf stehende Maßzahlen bei Stäben von rechts nach links *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [Q02_T06_Q8]: Systemanalyse: Numerische Eigenschaften des Welford-Online-Algorithmus *(multichoice, 1.0 Pkt.)*

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
