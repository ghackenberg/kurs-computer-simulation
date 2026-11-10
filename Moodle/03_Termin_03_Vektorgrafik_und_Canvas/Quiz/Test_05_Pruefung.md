# Test 05 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante E)

**Test-ID:** `Test_05_Pruefung`  
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_05_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [T05_Q1]: WriteableBitmap GPU-Alignment: Zeilen-Padding & Puffergröße *(cloze, 2.0 Pkt.)*

Ein `WriteableBitmap` wird mit einer ungeraden Bildbreite von $W = 101\,\text{Pixeln}$ und einer Höhe von $H = 50\,\text{Zeilen}$ im Format `PixelFormats.Bgra32` (4 Bytes pro Pixel) erzeugt. Für optimale DMA-Transfers rundet der Grafiktreiber die Zeilenlänge (`BackBufferStride`) auf das nächste ganzzahlige Vielfache von **32 Bytes** auf.

a) Wie viele reine Nutzdaten-Bytes belegen die $101\,\text{Pixel}$ einer einzelnen Zeile *ohne* Padding?  
Antwort: {1:NUMERICAL:=404:0#Richtig! 101 Pixel * 4 Bytes/Pixel = 404 Nutzdaten-Bytes pro Zeile.~%50%101:0#Teilpunkte (50 %): Sie haben die Pixelanzahl (101) statt der Byte-Anzahl (101 * 4 = 404) angegeben.} Bytes

b) Welchen exakten Wert hat `BackBufferStride` (in **Bytes**) nach dem Aufrunden auf das nächste Vielfache von 32 Bytes?  
Antwort: {1:NUMERICAL:=416:0#Richtig! 13 * 32 = 416 Bytes (12 Bytes Padding am Zeilenende, da 12 * 32 = 384 < 404).~%50%408:0#Teilpunkte (50 %): 408 ist ein Vielfaches von 8, aber nicht durch 32 teilbar (408 / 32 = 12,75).~%50%404:0#Teilpunkte (50 %): Sie haben das Aufrunden auf ein Vielfaches von 32 Bytes weggelassen.} Bytes


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (Stride vs. Width * 4):**

1. Nutzdaten pro Zeile: $101\,\text{Pixel} \cdot 4\,\text{Bytes/Pixel} = 404\,\text{Bytes}$.

2. Aufrunden auf ein Vielfaches von 32 Bytes:  
$\lceil 404 / 32 \rceil \cdot 32 = \lceil 12{,}625 \rceil \cdot 32 = 13 \cdot 32 = 416\,\text{Bytes}$.  
Am Ende jeder Bildzeile liegen somit $416 - 404 = 12$ ungenutzte Padding-Bytes. Genau deshalb muss im Code zwingend `y * bmp.BackBufferStride` statt `y * width * 4` gerechnet werden!

---

## Frage 2 [T05_Q2]: Fehleranalyse: Globaler Diskretisierungsfehler des Euler-Verfahrens *(numerical, 1.5 Pkt.)*

Ein Bauteil fällt aus der Ruhe ($y_0 = 50{,}0\,\text{m}$, $v_0 = 0{,}0\,\text{m/s}$) im Schwerefeld mit $g = 10{,}0\,\text{m/s}^2$ nach unten. Die analytisch exakte Höhe lautet $y_{\text{exakt}}(t) = y_0 - \frac{1}{2} g t^2$.

Berechnen Sie den **Betrag des globalen Höhenfehlers** $|y_{\text{Euler}}(t_1) - y_{\text{exakt}}(t_1)|$ (in **Metern**) nach einem einzigen großen expliziten Euler-Zeitschritt der Schrittweite $\Delta t = 0{,}40\,\text{s}$ (also bei $t_1 = 0{,}40\,\text{s}$).

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `0.8` (± `0.01`) → 100%:** Exakt! y_Euler(0,4) = 50,0 m; y_exakt(0,4) = 50 - 0,5 * 10 * 0,16 = 49,2 m; Differenz = |50,0 - 49,2| = 0,8 m.
* **Wert `49.2` (± `0.05`) → 50%:** Teilpunkte (50 %): 49,2 m ist die exakte Höhe y_exakt(0,4), gefragt war aber die Differenz |y_Euler - y_exakt| = 0,8 m.
* **Wert `1.6` (± `0.02`) → 50%:** Teilpunkte (50 %): Sie haben in der exakten Parabelformel den Faktor 0,5 vor g * t^2 vergessen (10 * 0,16 = 1,6 m statt 0,8 m).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

1. **Expliziter Euler nach 1 Schritt ($\Delta t = 0{,}40\,\text{s}$):**  
Da $v_0 = 0$ ist, gilt $y_{\text{Euler}}(0{,}40) = y_0 + \Delta t \cdot v_0 = 50{,}0\,\text{m}$.

2. **Analytisch exakte Lösung:**  
$y_{\text{exakt}}(0{,}40) = 50{,}0 - \frac{1}{2} \cdot 10{,}0 \cdot (0{,}40)^2 = 50{,}0 - 5{,}0 \cdot 0{,}16 = 49{,}2\,\text{m}$.

3. **Betrag des Fehlers:**  
$|50{,}0\,\text{m} - 49{,}2\,\text{m}| = 0{,}80\,\text{m}$ (entspricht exakt dem Taylor-Restglied $\frac{1}{2} g \Delta t^2$).

---

## Frage 3 [T05_Q3]: C#-Code-Tracing: Explizite Euler-Integrationsschleife *(numerical, 1.5 Pkt.)*

Welchen exakten Zahlenwert besitzt die Variable `x` nach der vollständigen Ausführung der folgenden C#-Schleife?

```csharp
double x = 2.0;
double v = 3.0;
double dt = 0.5;
for (int step = 0; step < 3; step++)
{
    x = x + dt * v;
    v = v + dt * 4.0;
}
```

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `9.5` (± `0.01`) → 100%:** Richtig! step 0: x=3,5, v=5,0; step 1: x=6,0, v=7,0; step 2: x=9,5, v=9,0.
* **Wert `6` (± `0.01`) → 50%:** Teilpunkte (50 %): 6,0 ist der Wert nach 2 Schleifendurchläufen (step 0 und step 1), die Schleife läuft aber 3-mal (step = 0, 1, 2).
* **Wert `12.5` (± `0.01`) → 50%:** Teilpunkte (50 %): 12,5 entsteht, wenn v zuerst aktualisiert und sofort für x verwendet wird (semi-impliziter Ablauf).

**Musterherleitung & Gesamt-Feedback:**

**Schritt-für-Schritt-Tracing:**

* **Start:** `x = 2.0`, `v = 3.0`
* **Iteration `step = 0`:** `x = 2.0 + 0.5 * 3.0 = 3.5`; danach `v = 3.0 + 0.5 * 4.0 = 5.0`
* **Iteration `step = 1`:** `x = 3.5 + 0.5 * 5.0 = 6.0`; danach `v = 5.0 + 0.5 * 4.0 = 7.0`
* **Iteration `step = 2`:** `x = 6.0 + 0.5 * 7.0 = 9.5`; danach `v = 7.0 + 0.5 * 4.0 = 9.0`

---

## Frage 4 [T05_Q4]: C#-Lückentext: Neumann- und Dirichlet-Randbedingungen setzen *(gapselect, 1.0 Pkt.)*

Auf einem 2D-Temperaturgitter `double[,] T` der Größe `nx` mal `ny` soll der linke Rand (`x = 0`) als feste 100-°C-Heizwand (Dirichlet) und der rechte Rand (`x = nx - 1`) als perfekt wärmegedämmte Wand (homogene Neumann-Bedingung) programmiert werden. Vervollständigen Sie den Code:

```csharp
for (int y = 0; y < ny; y++)
{
    T[[[1]], y] = 100.0;          // Linker Rand: Dirichlet (100 °C)
    T[nx - 1, y] = T[[[2]], [[3]]]; // Rechter Rand: Neumann (isoliert)
}
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `0`
* `[[2]]` (Gruppe 2): `nx - 2`
* `[[3]]` (Gruppe 3): `y`
* `[[4]]` (Gruppe 1): `1`
* `[[5]]` (Gruppe 1): `nx - 1`
* `[[6]]` (Gruppe 2): `0`
* `[[7]]` (Gruppe 2): `nx`
* `[[8]]` (Gruppe 3): `0`
* `[[9]]` (Gruppe 3): `ny - 1`

**Musterherleitung & Gesamt-Feedback:**

**Erklärung:**

* `[[1]] = 0` adressiert den linken Rand `x = 0` und weist ihm fest `100.0` °C zu.
* `[[2]] = nx - 2` und `[[3]] = y` kopieren die Temperatur des unmittelbar links daneben liegenden inneren Knotens `T[nx - 2, y]` auf den Randknoten `T[nx - 1, y]`, sodass die diskrete Normalenableitung $\frac{T_{nx-1, y} - T_{nx-2, y}}{\Delta x} = 0$ wird.

---

## Frage 5 [T05_Q5]: Konzept-Zuordnung: System-Taxonomie anhand technischer Beispiele *(matching, 1.0 Pkt.)*

Ordnen Sie die folgenden technischen Simulationsaufgaben der jeweils treffendsten Klasse der System-Taxonomie zu. Beachten Sie die zwei Überhang-Distraktoren.

**Zuordnungspaare & Überhang-Distraktoren (`matching`):**
* Berechnung der stationären Temperaturverteilung einer Platte nach unendlich langer Zeit (dT/dt = 0). $\to$ **Statisches System mit verteilten Parametern**
* Freier Fall eines starren Körpers unter konstanter Schwerkraft mit gewöhnlicher Differentialgleichung. $\to$ **Dynamisches, zeitkontinuierliches System mit konzentrierten Parametern**
* Simulation einer Fertigungsstraße mit zufälligen Bearbeitungsdauern und Maschinenausfällen. $\to$ **Stochastisches, ereignisdiskretes System**
* Springender Ball mit kontinuierlicher Flugphase und schlagartiger Geschwindigkeitsumkehr am Boden. $\to$ **Hybrides System (kombiniert kontinuierlich und ereignisdiskret)**
* *(Überhang-Distraktor)* $\to$ Rein qualitatives Verbalmodell ohne mathematische Zustandsgrößen
* *(Überhang-Distraktor)* $\to$ Zeitloses System ohne Eingangs- oder Ausgangsgrößen

**Musterherleitung & Gesamt-Feedback:**

**Erklärung:**

* Für $\partial T / \partial t = 0$ entfällt die Zeitabhängigkeit (statisch), die Ortsableitungen $\partial^2 T / \partial x^2 + \partial^2 T / \partial y^2 = 0$ bleiben jedoch bestehen (verteilte Parameter).
* Der freie Fall einer Punktmasse hängt nur von $t$ ab (konzentrierte Parameter, zeitkontinuierlich).
* Ein springender Ball vereint kontinuierliche DGL-Dynamik in der Luft mit einem diskreten Zustands-Sprung beim Bodenkontakt (hybrides System).

---

## Frage 6 [T05_Q6]: Visualisierungs-Architektur: WriteableBitmap vs. WPF-Shape-Objekte *(multichoice, 1.0 Pkt.)*

Warum wird für die Echtzeit-Darstellung eines $500 \times 500$-Temperaturfeldes ($250\,000$ Gitterzellen) bei 60 FPS in WPF ein `WriteableBitmap` anstelle von $250\,000$ einzelnen `Rectangle`-Elementen im `Canvas` verwendet?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Ein WriteableBitmap aktualisiert ein flaches Byte-Array ohne Layout- und Objekt-Overhead pro Zelle.
  * *Feedback:* Richtig! Statt 250.000 DependencyObjects im Retained-Mode-Szenengraphen zu verwalten, werden beim WriteableBitmap nur 1 MB Rohdaten im RAM geändert.
* [ ] (0%) Ein WPF-Canvas unterstützt technisch maximal 256 Kind-Elemente und wirft darüber eine Exception.
  * *Feedback:* Falsch. Es gibt kein hartes Limit von 256 Elementen im Canvas; das Problem bei 250.000 Objekten ist der massive Speicher- und Render-Thread-Overhead.
* [ ] (0%) Die Klasse WriteableBitmap löst die partielle Wärmeleitungsgleichung automatisch im Grafiktreiber.
  * *Feedback:* Falsch. WriteableBitmap stellt lediglich einen schnellen Pixelpuffer bereit; die numerische FDM-Berechnung erfolgt weiterhin im C#-Code.
* [ ] (0%) Einzelne Rectangle-Elemente können in WPF grundsätzlich nur in Graustufen statt in Farbe dargestellt werden.
  * *Feedback:* Falsch. Jedes Rectangle unterstützt beliebige SolidColorBrushes, ist aber als einzelnes UIElement für hunderttausende Pixel viel zu schwergewichtig.

**Musterherleitung & Gesamt-Feedback:**

**Architekturvergleich (Retained Mode vs. Direct Pixel Buffer):**

Jedes `Rectangle` in WPF ist ein vollwertiges `UIElement` im Visual Tree (Retained Mode) mit hundert Bytes Speicherbedarf, Layout-Pass (Measure/Arrange) und Event-Routing. Bei $250\,000$ Pixeln bricht die Bildrate auf unter 1 FPS ein. `WriteableBitmap` umgeht den Visual Tree und erlaubt das direkte Beschreiben eines zusammenhängenden Speicherblocks in wenigen Millisekunden.

---

## Frage 7 [T05_Q7]: C#-Bug-Diagnose: Falsche Reihenfolge der Euler-Zustandsaktualisierung *(multichoice, 1.0 Pkt.)*

Für einen harmonischen Oszillator mit den Zustandsgleichungen $\dot{x} = v$ und $\dot{v} = -\omega^2 x$ möchte ein Student den **reinen expliziten Standard-Euler** implementieren und schreibt:

```csharp
x = x + dt * v;
v = v - dt * omegaSq * x;
```
Warum implementiert dieser zweizeilige Code **nicht** das mathematische explizite Standard-Euler-Verfahren?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Die zweite Zeile nutzt bereits das überschriebene x des neuen Schritts statt des alten Zustands x_n.
  * *Feedback:* Richtig! Da x in Zeile 1 in-place überschrieben wurde, berechnet Zeile 2 die Beschleunigung mit x_{n+1} statt x_n (das entspricht dem symplektischen Euler).
* [ ] (0%) Die Zeitschrittweite dt muss beim expliziten Euler-Verfahren in beiden Zeilen quadriert werden.
  * *Feedback:* Falsch. Beim Euler-Verfahren 1. Ordnung geht die Schrittweite dt linear ein: y_{n+1} = y_n + dt * f(y_n).
* [ ] (0%) In C# wird die zweite Zeile vor der ersten ausgeführt, weil Multiplikationen höhere Priorität haben.
  * *Feedback:* Falsch. Anweisungen (Statements), die durch Semikolon getrennt sind, werden in C# strikt sequenziell von oben nach unten ausgeführt.
* [ ] (0%) Das Minuszeichen in der zweiten Zeile muss für eine rücktreibende Federkraft zwingend ein Plus sein.
  * *Feedback:* Falsch. Eine rücktreibende Federkraft wirkt immer entgegen der Auslenkung x (F = -c*x), das Minuszeichen ist physikalisch völlig korrekt.

**Musterherleitung & Gesamt-Feedback:**

**Fehleranalyse:**

Beim expliziten Standard-Euler lautet die Vorschrift $\mathbf{z}_{n+1} = \mathbf{z}_n + \Delta t \cdot \mathbf{f}(\mathbf{z}_n)$. Alle Komponenten der rechten Seite müssen den Zustand $\mathbf{z}_n$ vom Beginn des Zeitschritts verwenden. Überschreibt man `x` direkt in Zeile 1 ohne Zwischenvariable `double xOld = x;`, verwendet Zeile 2 bereits $x_{n+1}$ (was zufällig das symplektische Euler-Verfahren ergibt, aber nicht den geforderten Standard-Euler).

---

## Frage 8 [T05_Q8]: Gitter-Diskretisierung: Konsequenzen einer räumlichen Gitterverfeinerung *(multichoice, 1.0 Pkt.)*

In einer expliziten 2D-Wärmeleitungssimulation wird die räumliche Maschenweite in beide Raumrichtungen exakt **halbiert** ($\Delta x_{\text{neu}} = 0{,}5 \cdot \Delta x_{\text{alt}}$, $\Delta y_{\text{neu}} = 0{,}5 \cdot \Delta y_{\text{alt}}$). Welche Konsequenzen ergeben sich daraus für die Simulation derselben physikalischen Zeitspanne? (Mehrere Antworten möglich)

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Die Anzahl der zu berechnenden Gitterzellen im zweidimensionalen Gebiet vervierfacht sich.
  * *Feedback:* Richtig! Da sowohl nx als auch ny verdoppelt werden, steigt die Knotenanzahl im 2D-Gebiet um den Faktor 2 * 2 = 4.
* [x] **(50%)** Wegen der viermal kleineren maximalen Zeitschrittweite vervielfacht sich der Gesamtrechenaufwand um Faktor 16.
  * *Feedback:* Richtig! 4-mal so viele Gitterknoten kombiniert mit 4-mal so vielen Zeitschritten (dt_max ~ dx^2) ergibt den Faktor 4 * 4 = 16 an Rechenoperationen.
* [ ] (-50%) Die maximal zulässige Zeitschrittweite dt_max darf bei feinerem Gitter doppelt so groß gewählt werden.
  * *Feedback:* Falsch! Aus dt_max = dx^2 / (4 * alpha) folgt, dass sich dt_max bei halbiertem dx auf ein Viertel reduziert.
* [ ] (-50%) Der räumliche Diskretisierungsfehler des zentralen Differenzenquotienten wächst um das Vierfache an.
  * *Feedback:* Falsch! Der zentrale Differenzenquotient hat die Konsistenzordnung O(dx^2); bei Halbierung von dx sinkt der räumliche Fehler auf ein Viertel.

**Musterherleitung & Gesamt-Feedback:**

**Der „Fluch der Dimensionen“ bei expliziten 2D-PDE-Lösern:**

Halbiert man $\Delta x$ und $\Delta y$, vervierfacht sich die Anzahl der Pixel ($2 \times 2 = 4$). Gleichzeitig zwingt die quadratische Stabilitätsbedingung $\Delta t_{\max} = \frac{\Delta x^2}{4\alpha}$ zu einer Viertelung der Zeitschrittweite (also 4-mal so vielen Schritten pro Sekunde). Der gesamte Rechenaufwand steigt somit um den Faktor $4 \cdot 4 = 16$!

---
