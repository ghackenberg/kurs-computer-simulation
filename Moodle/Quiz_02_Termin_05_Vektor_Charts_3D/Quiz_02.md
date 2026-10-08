# Moodle-Quiz 2 (Termin 5): 2D-Vektorgrafik, Telemetrie & 3D-Szenengraph

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (FH Oberösterreich, Campus Wels)  
**Prüfungszeitpunkt:** Beginn Termin 5  
**Bearbeitungszeit:** 15 Minuten  
**Säule:** Säule 1 (Theoretische & numerische Grundlagen, Gewicht: 7,5 % der Gesamtnote)  
**Prüfungsmodus:** Präsenz im EDV-Labor / Safe Exam Browser in Moodle  
**Zulässige Hilfsmittel:** Taschenrechner (nicht-programmierbar) oder Windows-Rechner; keine LLM-Nutzung / Closed-Book

---

## Didaktische Zielsetzung & Einbettung

Dieses Quiz überprüft die mathematischen und softwarearchitektonischen Kompetenzen zur geometrischen 2D- und 3D-Visualisierung mechatronischer Systeme sowie die performante Handhabung hochfrequenter Telemetriedaten.

### Stoffabgrenzung & Tabu-Grenzen
* **Inhalte:** Kapitel 03 (2D-Vektorgrafik auf dem WPF Canvas, affine Koordinatentransformation Welt $\leftrightarrow$ Screen, isotrope Viewport-Skalierung, Y-Achsen-Inversion, geometrische Bemaßung und Pfeilgeometrie im Screen Space), Kapitel 04 (ScottPlot 5, Datenstreaming, `DataStreamer`, `CircularBuffer<double>`, Entkopplung von Messdatenerfassung und UI-Rendering), Kapitel 05 (3D-Computergrafik mit SharpGL/OpenGL, homogene $4 \times 4$-Matrizen, hierarchischer Szenengraph, Nicht-Kommutativität von Translation und Rotation, Orbitkamera mit Kugelkoordinaten).
* **Strikte Tabu-Grenzen:**
  - ❌ **KEINE** Steifigkeitsmatrizen $\mathbf{K}$ oder Finite-Elemente-Gleichungssysteme $\mathbf{K}\mathbf{u}=\mathbf{f}$ (Kapitel 07)
  - ❌ **KEINE** Cholesky-Zerlegung oder LGS-Löser (Kapitel 07)
  - ❌ **KEIN** Multithreading / TPL / `Parallel.For` (Kapitel 06)
  - ❌ **KEINE** kontinuierlichen DGL-Solver wie RK4 oder Heun (Kapitel 08)
  - ❌ **KEINE** diskreten Ereignissysteme (DES) oder Warteschlangen (Kapitel 09)

---

## Fragenübersicht

| Nr. | Thema | Fragentyp | Bloom-Taxonomie | Punkte |
| :---: | :--- | :--- | :--- | :---: |
| **Q2.1** | Koordinatentransformation (Welt $\to$ Screen) & Y-Inversion | Numerische Berechnung | Anwenden / Berechnen (L3) | 2,0 |
| **Q2.2** | ScottPlot 5 Datenstreaming & UI-Entkopplung | Code-Mutation & Architektur (Single-Choice) | Analysieren / Bewerten (L4) | 1,5 |
| **Q2.3** | Homogene $4 \times 4$-Matrizen & 3D-Szenengraph | Mathematisches Konzept (Multiple-Select) | Verstehen / Analysieren (L3) | 1,5 |
| **Q2.4** | Geometrische Bemaßung & Pfeilkonstruktion im Canvas | Mechatronische Visualisierung (Single-Choice) | Verstehen / Beurteilen (L2) | 1,5 |
| **Q2.5** | Orbitkamera, Kugelkoordinaten & Pol-Singularität | 3D-Kinematik & Kameraführung (Single-Choice) | Analysieren (L4) | 1,5 |
| **Gesamt** | | | | **8,0 Pkt.** |

---

## Detaillierte Fragen & Musterlösungen

### Frage 2.1: Koordinatentransformation (Welt $\to$ Screen) & Y-Inversion (Berechnung)

#### Fragetext
Ein mechatronischer Versuchsstand soll aus dem physikalischen Weltkoordinatensystem (Meter $[\text{m}]$, $Y$-Achse zeigt nach oben) verzerrungsfrei auf ein WPF-Canvas-Fenster (Bildschirmkoordinaten $[\text{px}]$, $Y$-Achse zeigt nach unten) abgebildet werden.

Gegeben sind:
* Abmessungen des WPF-Canvas: $W_{\text{canvas}} = 800\,\text{px}$, $H_{\text{canvas}} = 600\,\text{px}$
* Bounding-Box der Welt: $x_{\min} = 0{,}0\,\text{m}$, $x_{\max} = 10{,}0\,\text{m}$, $y_{\min} = 0{,}0\,\text{m}$, $y_{\max} = 4{,}0\,\text{m}$

Zur Vermeidung optischer Verzerrungen wird ein **isotroper Skalierungsfaktor** (Uniform Aspect Ratio) mit zentrierter Ausrichtung verwendet:
```csharp
double scaleX = canvasWidth / (xMax - xMin);
double scaleY = canvasHeight / (yMax - yMin);
double s = Math.Min(scaleX, scaleY);

double offsetX = (canvasWidth - (xMax - xMin) * s) / 2.0;
double offsetY = (canvasHeight - (yMax - yMin) * s) / 2.0;

// Y-Inversion für Bildschirm-Pixel:
double ys = canvasHeight - (offsetY + (yw - yMin) * s);
```

Berechnen Sie die resultierende **Screen-Koordinate $y_s$ in Pixeln $[\text{px}]$** für einen Sensorpunkt in der Welt mit der vertikalen Koordinate **$y_w = 2{,}5\,\text{m}$**.  
*(Geben Sie die Zahl als reinen Pixelwert ohne Einheit an, z. B. `350.0`)*

#### Antwortwert
* **Musterlösung:** `260.0` (akzeptierter Toleranzbereich: `259.0` bis `261.0`)

#### Mathematische Herleitung & Didaktik
1. Skalierungsfaktoren je Achse:
   $$s_x = \frac{800\,\text{px}}{10{,}0\,\text{m} - 0{,}0\,\text{m}} = 80{,}0\,\frac{\text{px}}{\text{m}}, \quad s_y = \frac{600\,\text{px}}{4{,}0\,\text{m} - 0{,}0\,\text{m}} = 150{,}0\,\frac{\text{px}}{\text{m}}$$
2. Isotropie-Bedingung ($\text{Aspect Ratio}$ beibehalten):
   $$s = \min(s_x, s_y) = \min(80{,}0, 150{,}0) = 80{,}0\,\frac{\text{px}}{\text{m}}$$
3. Zentrierungs-Offsets im Canvas:
   $$\text{offsetX} = \frac{800 - 10 \cdot 80}{2} = 0{,}0\,\text{px}$$
   $$\text{offsetY} = \frac{600 - 4 \cdot 80}{2} = \frac{600 - 320}{2} = 140{,}0\,\text{px}$$
4. Berechnung der Screen-Y-Koordinate (Y-Inversion):
   $$y_s = H_{\text{canvas}} - (\text{offsetY} + (y_w - y_{\min}) \cdot s)$$
   $$y_s = 600 - (140{,}0 + (2{,}5 - 0) \cdot 80{,}0) = 600 - (140{,}0 + 200{,}0) = 600 - 340{,}0 = 260{,}0\,\text{px}$$

*Typischer Fehler:* Wer die Y-Inversion vergisst, berechnet $y_s = \text{offsetY} + 2{,}5 \cdot 80 = 340{,}0\,\text{px}$ (Punkt steht auf dem Kopf). Wer nicht den kleineren Skalierungsfaktor wählt, skaliert anisotrop ($150\,\text{px/m}$) und verzerrt die Physik.

---

### Frage 2.2: ScottPlot 5 Datenstreaming & UI-Entkopplung (Code-Mutation)

#### Fragetext
Ein Studierendenteam bindet `ScottPlot 5` zur Echtzeit-Anzeige eines Drehmomentsensors ($1000\,\text{Hz}$ Abtastrate) in ein WPF-Dashboard ein. Der erste Entwurf sieht wie folgt aus:

```csharp
private readonly List<double> _timestamps = new List<double>();
private readonly List<double> _values = new List<double>();

public void OnSensorSampleReceived(double time, double torque)
{
    _timestamps.Add(time);
    _values.Add(torque);

    Application.Current.Dispatcher.Invoke(() =>
    {
        WpfPlot1.Plot.Clear();
        WpfPlot1.Plot.Add.Scatter(_timestamps.ToArray(), _values.ToArray());
        WpfPlot1.Plot.Axes.AutoScale();
        WpfPlot1.Refresh();
    });
}
```

Bereits nach wenigen Minuten friert die Anwendung periodisch ein, die CPU-Last des Render-Threads erreicht $100\,\%$ und die Benutzeroberfläche reagiert nicht mehr auf Benutzereingaben.  
Welche Architekturmaßnahme löst dieses Problem **nachhaltig und professionell**?

#### Antwortoptionen
* [ ] A) Man erhöht die Priorität des Dispatchers mit `DispatcherPriority.Send`, damit der UI-Thread die Punkte schneller zeichnen kann.
* [x] B) Man entkoppelt Messung und Visualisierung: Messwerte werden hochfrequent in einen thread-sicheren, vorallokierten Ringpuffer fester Größe (`CircularBuffer<double>`) oder direkt in ScottPlots `DataStreamer` geschrieben. Das Neuzeichnen (`Refresh()`) wird über einen separaten UI-Timer auf maximal $30\,\text{Hz}$ bis $60\,\text{Hz}$ gedrosselt, und wiederholte `ToArray()`-Array-Allokationen werden vollständig eliminiert.
* [ ] C) Man ruft `GC.Collect()` nach jedem zehnten Messwert manuell auf, um den Speicher des Garbage Collectors sofort freizugeben.
* [ ] D) Man ersetzt ScottPlot durch ein Standard WPF `Canvas` und zeichnet jeden Datenpunkt als separates `System.Windows.Shapes.Path`-Objekt.

#### Didaktische Begründung
* *Option B ist die einzig korrekte Architektur nach der Goldenen Regel:* `Dispatcher.Invoke` bei $1000\,\text{Hz}$ überlastet die WPF-Nachrichten-Queue vollkommen. `_timestamps.ToArray()` erzeugt jede Millisekunde neue Heap-Objekte wachsender Größe ($\mathcal{O}(N)$), was zu heftigen GC-Pausen führt. Ein Ringpuffer mit fester Kapazität und getaktetem UI-Timer ($30\,\text{Hz}$) eliminiert jegliche Allokation im Render-Pfad.
* *Distraktoren A, C, D verschlimmern die Situation dramatisch:* `GC.Collect()` stoppt alle Threads; `Canvas` mit zehntausenden UI-Elementen bringt WPF zum Totalstillstand.

---

### Frage 2.3: Homogene $4 \times 4$-Matrizen & 3D-Szenengraph (Multiple-Select)

#### Fragetext
In einer 3D-Simulation eines Zwei-Achs-Industrieroboters (SharpGL / OpenGL) soll der Greifer am Ende des zweiten Armsegments positioniert werden. Die Transformationen im Szenengraph sind hierarchisch gegliedert.  
Gegeben sind die homogenen $4 \times 4$-Matrizen:
* $\mathbf{T}_1$: Verschiebung vom Ursprung zu Gelenk 1
* $\mathbf{R}_1$: Drehung um Gelenkachse 1
* $\mathbf{T}_2$: Verschiebung entlang Arm 1 zu Gelenk 2
* $\mathbf{R}_2$: Drehung um Gelenkachse 2
* $\mathbf{T}_G$: Verschiebung entlang Arm 2 zum Greifpunkt (TCP)

Welche Aussagen zur Verknüpfung und Funktionsweise der Transformationen sind **mathematisch und technisch zutreffend**?  
*(Wählen Sie alle richtigen Aussagen)*

#### Antwortoptionen
* [x] A) Bei spaltenweiser Vektorkonvention ($\mathbf{v}' = \mathbf{M} \cdot \mathbf{v}$) lautet die Gesamttransformation des Greifers bezüglich des Weltkoordinatensystems $\mathbf{M}_{\text{Welt}} = \mathbf{T}_1 \cdot \mathbf{R}_1 \cdot \mathbf{T}_2 \cdot \mathbf{R}_2 \cdot \mathbf{T}_G$.
* [x] B) Die Multiplikation von Transformationsmatrizen ist im Allgemeinen nicht kommutativ ($\mathbf{T} \cdot \mathbf{R} \neq \mathbf{R} \cdot \mathbf{T}$). Eine Vertauschung der Reihenfolge führt dazu, dass die Translation im rotierten statt im ursprünglichen Koordinatensystem ausgeführt wird.
* [x] C) Durch Nutzung eines Matrix-Stacks (`glPushMatrix` / `glPopMatrix` bzw. Traversierung eines Szenengraph-Baumes) erben alle Kindknoten automatisch die Position und Orientierung ihrer Elternsegmente.
* [x] D) Homogene $4 \times 4$-Matrizen ermöglichen es, affine Transformationen (Translation, Rotation, Skalierung) sowie perspektivische Projektionen in einer einheitlichen Matrix-Vektor-Multiplikation auszudrücken.
* [ ] E) Im dreidimensionalen Raum können aufeinanderfolgende Rotationen um unterschiedliche Raumachsen ohne Informationsverlust durch einfache Addition der skalaren Drehwinkel ($\theta_{\text{ges}} = \theta_1 + \theta_2$) berechnet werden.

#### Didaktische Begründung
* *A, B, C, D sind mathematische und computertheoretische Grundprinzipien homogener Koordinaten im 3D-Szenengraph.*
* *E ist falsch:* Rotationen im $\mathbb{R}^3$ sind nicht kommutativ und können nicht skalar addiert werden; sie erfordern Matrix- oder Quaternionen-Multiplikationen (Gimbal-Lock-Gefahr bei Euler-Winkeln).

---

### Frage 2.4: Geometrische Bemaßung & Pfeilkonstruktion im Canvas

#### Fragetext
In einer technischen 2D-Visualisierung auf dem WPF `Canvas` soll die lichte Weite eines Kragarms mit Maßlinie, Maßhilfslinien und Pfeilspitzen dargestellt werden.  
Warum müssen die **Pfeilspitzen** (z. B. Flügelschenkel fester Länge $12\,\text{px}$ unter einem Öffnungswinkel von $30^\circ$) im **Screen Space (Pixelkoordinaten)** und **nicht als reale Geometrie im World Space (Meter)** konstruiert werden?

#### Antwortoptionen
* [x] A) Werden Pfeile im World Space definiert, skaliert ihre geometrische Größe mit dem Viewport-Zoom mit: Bei starkem Zoom-In würden die Pfeile riesig werden und das Modell verdecken; bei weitem Zoom-Out schrumpfen sie zu unsichtbaren Subpixeln. Durch Konstruktion im Screen Space bleiben Pfeile, Maßlinienüberstände und Schriftgrößen typografisch konstant und normgerecht lesbar.
* [ ] B) Im World Space können ausschließlich geschlossene Polygone gezeichnet werden; offene Linien mit Spitzen werden vom Grafikkartentreiber verworfen.
* [ ] C) WPF unterstützt trigonometrische Funktionen wie `Math.Sin` und `Math.Cos` nur im Screen Space.
* [ ] D) Die Berechnung im Screen Space verhindert, dass die Pfeile durch die Y-Inversion auf den Kopf gestellt werden; im World Space zeigen Pfeile immer in negative Z-Richtung.

#### Didaktische Begründung
* *A ist das zentrale Prinzip der technischen Zeichnungserstellung in CAD- und Simulationssystemen:* Annotationsgeometrien (Pfeile, Maßketten, Schriften) gehören in den View- bzw. Screen-Space, damit sie unabhängig von Zoomstufe und Pan-Verschiebung dieselbe ergonomische Pixellänge behalten.

---

### Frage 2.5: Orbitkamera, Kugelkoordinaten & Pol-Singularität

#### Fragetext
In einer 3D-Simulation (SharpGL) wird eine Orbitkamera implementiert, die sich auf einer Kugelfläche um den Ursprung $(0,0,0)$ bewegt. Die Kameraposition $\mathbf{C} = (x, y, z)$ wird aus Azimutwinkel $\theta$, Elevationswinkel $\phi$ und Kameraabstand $R$ berechnet:
$$x = R \cos(\phi) \sin(\theta), \quad y = R \sin(\phi), \quad z = R \cos(\phi) \cos(\theta)$$
Der Up-Vektor der Kamera ist als $\mathbf{u} = (0, 1, 0)$ fest definiert.

Warum muss der Elevationswinkel $\phi$ im Programmcode zwingend auf einen Wertebereich wie $[-89^\circ, +89^\circ]$ begrenzt (geclampt) werden?

#### Antwortoptionen
* [x] A) Bei $\phi = \pm 90^\circ$ steht die Kamera exakt senkrecht über bzw. unter dem Ursprung. Der Sichtvektor der Kamera wird kollinear zum Up-Vektor $\mathbf{u} = (0, 1, 0)$. Das Kreuzprodukt aus Sichtvektor und Up-Vektor wird der Nullvektor, wodurch das lokale Koordinatensystem der Kamera kollabiert (Singularität / Gimbal Lock) und die Anzeige unkontrolliert kippt.
* [ ] B) Bei $|\phi| > 89^\circ$ verbraucht der Kosinus im Prozessor zu viele Gleitkomma-Register, was einen Stack-Overflow auslöst.
* [ ] C) OpenGL kann Koordinaten mit negativen Vorzeichen in der Y-Achse nicht schattieren.
* [ ] D) Der Abstand $R$ würde bei $\phi = 90^\circ$ mathematisch gegen Unendlich streben.

#### Didaktische Begründung
* *A beschreibt die fundamentale Pol-Singularität der Kugelkoordinaten-Kamera:* Die Konstruktion der View-Matrix (`gluLookAt`) erfordert den rechten Vektor $\mathbf{r} = \mathbf{f} \times \mathbf{u}$. Sind Sichtvektor $\mathbf{f}$ und Up-Vektor $\mathbf{u}$ parallel (an den Polen), ist $\mathbf{f} \times \mathbf{u} = \mathbf{0}$, und die Normalisierung schlägt fehl (`NaN`). Clamping auf $\pm 89^\circ$ verhindert diese Singularität zuverlässig.
