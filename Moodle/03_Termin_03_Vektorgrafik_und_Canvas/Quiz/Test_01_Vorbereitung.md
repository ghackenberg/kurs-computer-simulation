# Test 01 (Vorbereitung) – Grundlagen, Euler & 2D-Wärmeraster (Variante A)

**Test-ID:** `Test_01_Vorbereitung`  
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_01_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben zum Üben)

---

## Frage 1 [T01_Q1]: 2D-Wärmeleitung: Stabilitätsgrenze & Integrationsschritte *(cloze, 2.0 Pkt.)*

Eine quadratische Kupferplatte wird für eine thermische Echtzeitsimulation mit einem äquidistanten 2D-Finite-Differenzen-Gitter der Maschenweite $\Delta x = \Delta y = 2{,}0\,\text{mm}$ diskretisiert. Die Temperaturleitfähigkeit des Materials beträgt $\alpha = 100\,\text{mm}^2/\text{s}$. Das Temperaturfeld soll mit dem expliziten Euler-Verfahren (5-Punkt-Stern) über eine physikalische Gesamtdauer von $t_{\text{end}} = 1{,}0\,\text{s}$ an der exakten Stabilitätsgrenze simuliert werden.

a) Wie groß ist die maximal zulässige Zeitschrittweite $\Delta t_{\max}$ in **Millisekunden (ms)**?  
Antwort: {1:NUMERICAL:=10:0.1#Richtig! Aus s <= 0,25 folgt dt_max = dx^2 / (4 * alpha) = 4 / 400 = 0,01 s = 10 ms.~%50%20:0.1#Teilpunkte (50 %): Sie haben den 1D-Faktor 2 statt des 2D-Faktors 4 im Nenner verwendet (20 ms statt 10 ms).~%50%0.01:0.001#Teilpunkte (50 %): Zahlenwert in Sekunden statt in Millisekunden (ms) angegeben.} ms

b) Wie viele diskrete Zeitschritte $N_{\text{steps}}$ sind für die Gesamtdauer von $t_{\text{end}} = 1{,}0\,\text{s}$ bei $\Delta t = \Delta t_{\max}$ exakt erforderlich?  
Antwort: {1:NUMERICAL:=100:0#Richtig! N = 1,0 s / 0,01 s = 100 Zeitschritte.~%50%50:0#Teilpunkte (50 %): Folgefehler aus der 1D-Stabilitätsgrenze (dt = 20 ms -> 50 Schritte).} Schritte


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (2D-CFL-Stabilitätskriterium):**

Für die explizite 2D-Wärmeleitungsgleichung auf einem quadratischen Gitter gilt die Von-Neumann-Stabilitätsbedingung $s = \frac{\alpha \cdot \Delta t}{\Delta x^2} \le \frac{1}{4} = 0{,}25$.

1. Auflösung nach $\Delta t_{\max}$:  
$\Delta t_{\max} = \frac{\Delta x^2}{4 \cdot \alpha} = \frac{(2{,}0\,\text{mm})^2}{4 \cdot 100\,\text{mm}^2/\text{s}} = \frac{4}{400}\,\text{s} = 0{,}01\,\text{s} = 10\,\text{ms}$.

2. Anzahl der Zeitschritte für $t_{\text{end}} = 1{,}0\,\text{s}$:  
$N_{\text{steps}} = \frac{t_{\text{end}}}{\Delta t_{\max}} = \frac{1{,}0\,\text{s}}{0{,}01\,\text{s}} = 100\,\text{Schritte}$.

---

## Frage 2 [T01_Q2]: Expliziter Euler: Vertikaler Fallschritt eines Prüfkörpers *(numerical, 1.5 Pkt.)*

Ein Sensor-Prüfkörper startet zum Zeitpunkt $t_0 = 0\,\text{s}$ in einer Höhe von $y_0 = 10{,}0\,\text{m}$ mit einer vertikalen Anfangsgeschwindigkeit von $v_0 = -2{,}0\,\text{m/s}$ (nach unten gerichtet). Die Erdbeschleunigung beträgt konstant $g = 9{,}81\,\text{m/s}^2$ (nach unten wirkend, ohne Luftwiderstand).

Berechnen Sie die neue Höhe $y_1$ (in **Metern**) nach exakt einem Zeitschritt der Länge $\Delta t = 0{,}5\,\text{s}$ mit dem **expliziten Euler-Verfahren** (Standard-Euler, bei dem der Orts-Update die Geschwindigkeit des alten Zeitschritts verwendet).

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `9` (± `0.01`) → 100%:** Exakt! Beim expliziten Euler gilt y_1 = y_0 + dt * v_0 = 10,0 + 0,5 * (-2,0) = 9,0 m.
* **Wert `6.5475` (± `0.05`) → 50%:** Teilpunkte (50 %): Sie haben die neue Geschwindigkeit v_1 = -6,905 m/s (semi-impliziter Euler) statt v_0 für den Orts-Update verwendet.
* **Wert `11` (± `0.01`) → 50%:** Teilpunkte (50 %): Vorzeichenfehler bei der Anfangsgeschwindigkeit v_0 (+2,0 statt -2,0 m/s).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (Expliziter Euler-Schritt):**

Das Zustandsraummodell lautet $\dot{y} = v$ und $\dot{v} = -g$. Beim expliziten Euler-Verfahren werden alle Ableitungen zum alten Zeitpunkt $t_0$ ausgewertet:

$y_1 = y_0 + \Delta t \cdot v_0 = 10{,}0\,\text{m} + 0{,}5\,\text{s} \cdot (-2{,}0\,\text{m/s}) = 9{,}0\,\text{m}$.

$v_1 = v_0 + \Delta t \cdot (-g) = -2{,}0\,\text{m/s} - 0{,}5\,\text{s} \cdot 9{,}81\,\text{m/s}^2 = -6{,}905\,\text{m/s}$ (wirkt beim expliziten Euler erst im zweiten Schritt auf $y_2$).

---

## Frage 3 [T01_Q3]: C#-Code-Tracing: Bgra32 Byte-Offset im BackBuffer *(numerical, 1.5 Pkt.)*

Gegeben sei folgender C#-Codeausschnitt zur direkten Adressierung eines Pixels in einem `WriteableBitmap` mit dem Pixelformat `PixelFormats.Bgra32` (4 Bytes pro Pixel in der Reihenfolge Blau, Grün, Rot, Alpha):

```csharp
int stride = 80; // BackBufferStride in Bytes
int x = 5;
int y = 3;
int redByteIndex = y * stride + x * 4 + 2;
```
Welchen exakten ganzzahligen Wert hat die Variable `redByteIndex` (Byte-Offset des Rot-Kanals relativ zum Pufferanfang) nach der Ausführung?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `262` (± `0`) → 100%:** Richtig! 3 * 80 + 5 * 4 + 2 = 240 + 20 + 2 = 262.
* **Wert `260` (± `0`) → 50%:** Teilpunkte (50 %): Sie haben den Kanal-Offset +2 für Rot vergessen (260 ist der Index des Blau-Kanals).
* **Wert `414` (± `0`) → 50%:** Teilpunkte (50 %): Sie haben x und y vertauscht (5 * 80 + 3 * 4 + 2 = 414).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (Lineare 1D-Speicheradressierung bei Bgra32):**

1. Zeilen-Offset für Zeile $y = 3$: $3 \cdot 80\,\text{Bytes} = 240\,\text{Bytes}$.

2. Spalten-Offset für Spalte $x = 5$: $5 \cdot 4\,\text{Bytes} = 20\,\text{Bytes}$ (Startadresse des Pixels bei Byte 260 = Blau-Kanal).

3. Im Format `Bgra32` liegt Blau auf Offset `+0`, Grün auf `+1`, Rot auf `+2` und Alpha auf `+3`. Damit ergibt sich `redByteIndex = 240 + 20 + 2 = 262`.

---

## Frage 4 [T01_Q4]: C#-Lückentext: Double-Buffering beim 5-Punkt-Stern *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie den folgenden C#-Code für einen expliziten 2D-Wärmeleitungsschritt auf den flachen 1D-Arrays `T` (aktueller Zustand) und `T_next` (neuer Zustand) einer Gitterbreite `nx`:

```csharp
int idx = y * nx + x;
double laplace = T[idx - 1] + T[idx + 1] + T[idx - nx] + T[idx + nx] - [[1]] * T[idx];
[[2]][idx] = T[idx] + s * laplace;
// Nach Abschluss beider Raumschleifen (x, y):
[[3]](T_next, T, T.Length);
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `4.0`
* `[[2]]` (Gruppe 2): `T_next`
* `[[3]]` (Gruppe 3): `Array.Copy`
* `[[4]]` (Gruppe 1): `2.0`
* `[[5]]` (Gruppe 1): `8.0`
* `[[6]]` (Gruppe 2): `T`
* `[[7]]` (Gruppe 2): `T_old`
* `[[8]]` (Gruppe 3): `Array.Clear`
* `[[9]]` (Gruppe 3): `Buffer.Equals`

**Musterherleitung & Gesamt-Feedback:**

**Erklärung des 2D-FDM-Codes:**

* `[[1]] = 4.0`: Im 2D-5-Punkt-Stern stehen den 4 Nachbarknoten (links, rechts, oben, unten) das $-4$-fache des Zentralknotens gegenüber.
* `[[2]] = T_next`: Um In-Place-Überschreibfehler (Gauß-Seidel-Verfälschung während der laufenden Iteration) zu verhindern, muss zwingend in das separate Ziel-Array `T_next` geschrieben werden.
* `[[3]] = Array.Copy`: Nach Abschluss des gesamten Zeitschritts wird der neue Zustand für den nächsten Schritt in `T` übernommen.

---

## Frage 5 [T01_Q5]: Konzept-Zuordnung: Modelltheorie (Stachowiak) & Digitaler Zwilling (Kritzinger) *(matching, 1.0 Pkt.)*

Ordnen Sie die folgenden Beschreibungen den korrekten Begriffen der Allgemeinen Modelltheorie (nach Stachowiak) bzw. den Integrationsstufen nach Kritzinger et al. zu. Beachten Sie die zwei Überhang-Distraktoren.

**Zuordnungspaare & Überhang-Distraktoren (`matching`):**
* Ein Modell erfasst niemals alle Eigenschaften des Originals, sondern lässt irrelevante Details gezielt weg. $\to$ **Verkürzungsmerkmal (Präterition)**
* Ein Modell gilt nicht absolut, sondern immer nur für bestimmte Subjekte, eine Zeitspanne und einen klaren Zweck. $\to$ **Pragmatisches Merkmal**
* Reiner Simulationsentwurf ohne jeglichen automatischen Datenaustausch mit dem realen physischen Objekt. $\to$ **Digital Model (Digitales Modell)**
* Vollautomatischer, bidirektionaler Datenfluss: Sensordaten aktualisieren das Modell, das Modell steuert Aktoren. $\to$ **Digital Twin (Digitaler Zwilling)**
* *(Überhang-Distraktor)* $\to$ Digital Shadow (Digitaler Schatten)
* *(Überhang-Distraktor)* $\to$ Abundant-Merkmal (Redundanz)

**Musterherleitung & Gesamt-Feedback:**

**Erklärung (Modelltheorie & Kritzinger-Klassifikation):**

* **Verkürzungsmerkmal:** Gezielte Abstraktion durch Weglassen irrelevanter Attribute.
* **Pragmatisches Merkmal:** Zweck-, Nutzer- und Zeitgebundenheit jedes Modells (Für wen? Wann? Wozu?).
* **Digital Model:** Rein manueller Datenfluss in beide Richtungen.
* **Digital Shadow:** Automatischer Datenfluss vom physischen zum digitalen Objekt, aber manueller Rückfluss.
* **Digital Twin:** Vollautomatischer Datenfluss in beide Richtungen (Closed-Loop).

---

## Frage 6 [T01_Q6]: Numerische Analyse:Lokaler und globaler Fehler beim expliziten Euler *(multichoice, 1.0 Pkt.)*

Bei der Simulation einer Wurfparabel mit dem expliziten Euler-Verfahren wird die konstante Zeitschrittweite $\Delta t$ für einen zweiten Simulationslauf exakt **halbiert** ($\Delta t_{\text{neu}} = 0{,}5 \cdot \Delta t_{\text{alt}}$). Wie verändern sich dadurch der lokale Abbruchfehler pro Einzelschritt und der globale Gesamtfehler zur festen Endzeit $T$?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Der lokale Fehler pro Schritt sinkt auf ein Viertel, während sich der globale Fehler am Ende halbiert.
  * *Feedback:* Richtig! Der lokale Fehler ist O(dt^2) -> Faktor 1/4; durch die doppelte Schrittanzahl akkumuliert sich der globale Fehler auf O(dt) -> Faktor 1/2.
* [ ] (0%) Sowohl der lokale Fehler pro Schritt als auch der globale Fehler am Ende halbieren sich exakt linear.
  * *Feedback:* Falsch. Der lokale Taylor-Abbruchfehler pro Einzelschritt skaliert quadratisch mit dt^2, nicht linear.
* [ ] (0%) Der lokale Fehler pro Schritt sinkt auf ein Achtel, während der globale Fehler auf ein Viertel sinkt.
  * *Feedback:* Falsch. Diese Fehlerordnung (lokal O(dt^3), global O(dt^2)) gilt für das Heun-Verfahren (RK2), nicht für den expliziten Euler.
* [ ] (0%) Der lokale Fehler pro Schritt halbiert sich, während der globale Fehler durch die Schrittanzahl gleich bleibt.
  * *Feedback:* Falsch. Wäre der lokale Fehler nur O(dt), wäre das Verfahren nicht einmal konsistent und würde nicht konvergieren.

**Musterherleitung & Gesamt-Feedback:**

**Herleitung (Fehlerordnung des expliziten Euler-Verfahrens):**

Aus der Taylor-Entwicklung $y(t + \Delta t) = y(t) + \Delta t \cdot \dot{y}(t) + \frac{\Delta t^2}{2}\ddot{y}(\xi)$ folgt für den lokalen Fehler eines Einzelschritts $e_{\text{lokal}} \in \mathcal{O}(\Delta t^2)$. Bei Halbierung von $\Delta t$ sinkt er auf $(1/2)^2 = 1/4$.

Da für das feste Zeitintervall $[0, T]$ nun doppelt so viele Schritte ($N = T / \Delta t$) ausgeführt werden, summiert sich der globale Fehler zu $E_{\text{global}} \approx N \cdot e_{\text{lokal}} \propto \frac{1}{\Delta t} \cdot \Delta t^2 = \mathcal{O}(\Delta t^1)$. Der globale Fehler halbiert sich somit.

---

## Frage 7 [T01_Q7]: C#-Bug-Diagnose: In-Place-Überschreibung im 2D-Wärmeraster *(multichoice, 1.0 Pkt.)*

Ein Studierender implementiert den expliziten 2D-Wärmeleitungsschritt (5-Punkt-Stern) mit folgender Doppelschleife auf einem einzigen Array `double[,] T`:

```csharp
for (int y = 1; y < ny - 1; y++)
    for (int x = 1; x < nx - 1; x++)
        T[x, y] = T[x, y] + s * (T[x-1, y] + T[x+1, y] + T[x, y-1] + T[x, y+1] - 4.0 * T[x, y]);
```
Welcher fundamentale numerische Fehler tritt bei dieser Implementierung auf?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Die Knoten x-1 und y-1 wurden im selben Schritt bereits überschrieben und verfälschen die Symmetrie.
  * *Feedback:* Richtig! Durch das Fehlen eines zweiten Puffers (Double-Buffering) greift T[x-1, y] und T[x, y-1] bereits auf Werte des neuen Zeitschritts n+1 statt n zu.
* [ ] (0%) Der Vorfaktor 4.0 vor dem Zentralknoten T[x, y] muss bei einem 2D-Gitter zwingend 2.0 lauten.
  * *Feedback:* Falsch. In 2D setzt sich der Laplace-Operator aus d^2T/dx^2 und d^2T/dy^2 zusammen, sodass -2 - 2 = -4 völlig korrekt ist.
* [ ] (0%) Die Schleifengrenzen 1 bis nx-1 erzeugen bei den Zugriffen x-1 und x+1 eine IndexOutOfRangeException.
  * *Feedback:* Falsch. Genau weil die Schleife bei 1 startet und bei nx-2 endet, liegen x-1 (>= 0) und x+1 (<= nx-1) sicher innerhalb der Array-Grenzen.
* [ ] (0%) In C# müssen mehrdimensionale Arrays immer spaltenweise mit x als äußerer Schleife durchlaufen werden.
  * *Feedback:* Falsch. Die Schleifenreihenfolge ändert bei In-Place-Updates nur die Richtung der asymmetrischen Drift, behebt aber nicht das fehlende Double-Buffering.

**Musterherleitung & Gesamt-Feedback:**

**Fehleranalyse (Fehlendes Double-Buffering):**

Das explizite Euler-Verfahren verlangt zwingend, dass alle Nachbarwerte auf der rechten Seite der Gleichung aus dem alten Zeitschritt $n$ stammen. Schreibt man direkt in `T[x, y]` zurück, enthalten `T[x-1, y]` und `T[x, y-1]` beim Weiterwandern der Schleife bereits die neuen Temperaturen $T^{n+1}$, was zu einer gerichteten numerischen Verzerrung führt.

---

## Frage 8 [T01_Q8]: Systemanalyse: WriteableBitmap & Physikalische Randbedingungen *(multichoice, 1.0 Pkt.)*

Welche der folgenden Aussagen zur hochperformanten 2D-Visualisierung mit `WriteableBitmap` und zur numerischen Behandlung von Randbedingungen im Wärmeraster sind **korrekt**? (Mehrere Antworten möglich)

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Ohne den Aufruf von AddDirtyRect zwischen Lock und Unlock überträgt WPF keine geänderten Pixel zur GPU.
  * *Feedback:* Richtig! AddDirtyRect markiert den geänderten Speicherbereich für den Render-Thread; ohne diesen Aufruf bleibt das Bild trotz Pointer-Schreibzugriff unverändert.
* [x] **(50%)** Ein thermisch perfekt isolierter Plattenrand wird durch Gleichsetzen des Randknotens mit dem Nachbarn modelliert.
  * *Feedback:* Richtig! Eine homogene Neumann-Randbedingung (dT/dn = 0, kein Wärmefluss) bedeutet T_Rand = T_innen.
* [ ] (-50%) Die Eigenschaft BackBufferStride gibt die Bildbreite immer in der Einheit Anzahl der Pixel pro Zeile zurück.
  * *Feedback:* Falsch! BackBufferStride liefert die Zeilenlänge in Bytes (inklusive eventuellem GPU-Alignment-Padding), nicht in Pixeln.
* [ ] (-50%) Für jedes einzelne Pixel auf dem Bildschirm sollte zur Laufzeit ein eigenes WPF-Rectangle-Objekt erzeugt werden.
  * *Feedback:* Falsch! Bei z. B. 500x500 = 250.000 Pixeln überlastet ein solcher Retained-Mode-Visual-Tree den Layout- und Garbage-Collection-Prozess massiv.

**Musterherleitung & Gesamt-Feedback:**

**Zusammenfassung:**

* In der `WriteableBitmap`-Pipeline (`Lock()` → `BackBuffer` beschreiben → `AddDirtyRect()` → `Unlock()`) teilt erst `AddDirtyRect` dem WPF-Kompositor mit, welcher Bereich neu auf die Grafikkarte geladen werden muss.
* Ein adiabater (isolierter) Rand entspricht einer homogenen Neumann-Bedingung $\frac{\partial T}{\partial n} = 0$, diskretisiert als $T_0 = T_1$.
* `BackBufferStride` ist in **Bytes** angegeben (oft $\ge \text{Width} \cdot 4$), und `WriteableBitmap` vermeidet genau den Overhead tausender einzelner WPF-UI-Objekte.

---
