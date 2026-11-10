# Test 09 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante I)

**Test-ID:** `Test_09_Pruefung`  
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_09_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [T09_Q1]: 2D-Wärmeleitung: Adiabate Neumann-Ecke & 5-Punkt-Stern-Update *(cloze, 2.0 Pkt.)*

Auf einem 2D-Wärmeraster mit der Stabilitätszahl $s = 0{,}20$ besitzt der innere Knoten $(1,1)$ aktuell die Temperatur $T_{1,1}^n = 40{,}0\,^\circ\text{C}$. Seine inneren Nachbarn haben die Werte $T_{2,1}^n = 60{,}0\,^\circ\text{C}$ (rechts) und $T_{1,2}^n = 80{,}0\,^\circ\text{C}$ (oben). Sowohl der linke Rand ($i=0$) als auch der untere Rand ($j=0$) sind **perfekt wärmegedämmt (homogene Neumann-Randbedingung)**.

a) Welche Temperatur $T_{0,1}^n$ (in **°C**) wird dem linken Randknoten $(0,1)$ durch die homogene Neumann-Bedingung zugewiesen?  
Antwort: {1:NUMERICAL:=40.0:0.1#Richtig! Am isolierten Rand gilt dT/dn = 0, also T[0,1] = T[1,1] = 40,0 °C.~%50%0.0:0.1#Teilpunkte (50 %): 0 °C wäre eine feste Eiskühlung (homogene Dirichlet-Bedingung), keine Wärmeisolation!} °C

b) Welche neue Temperatur $T_{1,1}^{n+1}$ (in **°C**) erhält der Knoten $(1,1)$ nach einem expliziten Zeitschritt mit dem 5-Punkt-Stern (wenn auch unten $T_{1,0}^n = T_{1,1}^n$ gilt)?  
Antwort: {1:NUMERICAL:=52.0:0.1#Richtig! T_neu = 40 + 0,20 * (40 + 60 + 40 + 80 - 4 * 40) = 40 + 0,20 * 60 = 52,0 °C.~%50%36.0:0.1#Teilpunkte (50 %): Folgefehler aus T[0,1] = 0 und T[1,0] = 0 (40 + 0,20 * (140 - 160) = 36,0 °C).} °C


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (5-Punkt-Stern an einer isolierten Ecke):**

1. Durch die beiden isolierten Ränder (Neumann $\partial T / \partial n = 0$) nehmen die Randknoten die Temperatur ihres jeweiligen Innennachbarn an: $T_{0,1}^n = T_{1,1}^n = 40{,}0\,^\circ\text{C}$ und $T_{1,0}^n = T_{1,1}^n = 40{,}0\,^\circ\text{C}$.

2. Einsetzen in den 5-Punkt-Stern:  
$T_{1,1}^{n+1} = 40{,}0 + 0{,}20 \cdot (40{,}0 + 60{,}0 + 40{,}0 + 80{,}0 - 4 \cdot 40{,}0) = 40{,}0 + 0{,}20 \cdot (220{,}0 - 160{,}0) = 40{,}0 + 12{,}0 = 52{,}0\,^\circ\text{C}$.

---

## Frage 2 [T09_Q2]: Bodenkollision: Berechnung des relativen Teilzeitschritts tau *(numerical, 1.5 Pkt.)*

In einer Fallsimulation befindet sich die Unterkante eines Prüfkörpers zu Beginn des Zeitschritts bei $y_n = +0{,}45\,\text{m}$ oberhalb der Bodenplatte ($y = 0$). Am Ende des Zeitschritts liefert das Integrationsverfahren die vorläufige Position $y_{n+1} = -0{,}15\,\text{m}$ unterhalb der Bodenplatte.

Berechnen Sie den dimensionslosen relativen Zeitschrittanteil $\tau \in [0, 1]$, der angibt, welcher Bruchteil des Zeitschritts $\Delta t$ bis zum exakten Aufprall ($y = 0$) vergangen ist.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `0.75` (± `0.005`) → 100%:** Exakt! tau = y_n / (y_n - y_{n+1}) = 0,45 / (0,45 - (-0,15)) = 0,45 / 0,60 = 0,75.
* **Wert `0.25` (± `0.005`) → 50%:** Teilpunkte (50 %): 0,25 ist der verbleibende Restanteil (1 - tau) nach dem Aufprall bzw. |y_{n+1}| / (y_n - y_{n+1}).
* **Wert `1.5` (± `0.01`) → 50%:** Teilpunkte (50 %): Vorzeichenfehler im Nenner: Sie haben 0,45 / (0,45 - 0,15) = 0,45 / 0,30 = 1,5 gerechnet (tau muss immer zwischen 0 und 1 liegen!).

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

Innerhalb des Zeitschritts legt der Körper vertikal die Gesamtstrecke $\Delta s = y_n - y_{n+1} = 0{,}45\,\text{m} - (-0{,}15\,\text{m}) = 0{,}60\,\text{m}$ nach unten zurück. Bis zum Boden bei $y = 0$ sind es davon $0{,}45\,\text{m}$. Der relative Zeitanteil beträgt folglich:  
$\tau = \frac{y_n}{y_n - y_{n+1}} = \frac{0{,}45}{0{,}60} = 0{,}75$.

---

## Frage 3 [T09_Q3]: C#-Code-Tracing: 1D-Array-Indexierung eines 2D-Gitters (Row-Major) *(numerical, 1.5 Pkt.)*

Ein zweidimensionales Temperaturgitter mit `nx = 20` Spalten und `ny = 15` Zeilen wird für maximale Cache-Lokalität in einem flachen 1D-Array `double[] T = new double[nx * ny]` zeilenweise (Row-Major) gespeichert. Gegeben sei folgender C#-Code:

```csharp
int nx = 20;
int x = 6, y = 4;
int idx = y * nx + x;
int southNeighborIdx = idx + nx;
```
Welchen exakten ganzzahligen Wert hat die Variable `southNeighborIdx` (der Index des Nachbarknotens in Zeile `y + 1`, Spalte `x`)?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `106` (± `0`) → 100%:** Richtig! idx = 4 * 20 + 6 = 86; southNeighborIdx = 86 + 20 = 106 (entspricht (4 + 1) * 20 + 6).
* **Wert `86` (± `0`) → 50%:** Teilpunkte (50 %): 86 ist der Index idx des Zentralknotens (4, 6) selbst, es fehlt noch + nx (= +20) für die nächste Zeile.
* **Wert `87` (± `0`) → 50%:** Teilpunkte (50 %): 87 (= idx + 1) ist der rechte Nachbar (x + 1), nicht der untere Nachbar in Zeile y + 1.

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (Row-Major 1D-Addressing):**

In einem flachen 1D-Array der Zeilenbreite `nx = 20` liegt der Knoten `(x = 6, y = 4)` am Index `idx = 4 * 20 + 6 = 86`. Um eine Zeile tiefer (`y + 1 = 5`) bei gleicher Spalte `x = 6` zu gelangen, muss exakt eine Zeilenbreite `nx = 20` addiert werden: `86 + 20 = 106`.

---

## Frage 4 [T09_Q4]: C#-Lückentext: Berechnung der maximal stabilen Zeitschrittweite *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie den folgenden C#-Code, der für eine gegebene Maschenweite `dx` und Temperaturleitfähigkeit `alpha` zuerst die theoretische 2D-Stabilitätsgrenze `dtMax` berechnet und anschließend mit 80 % Sicherheitsfaktor die Stabilitätszahl `s` bestimmt:

```csharp
double dtMax = (dx * [[1]]) / ([[2]] * alpha);
double dt = 0.8 * dtMax;
double s = (alpha * [[3]]) / (dx * dx);
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `dx`
* `[[2]]` (Gruppe 2): `4.0`
* `[[3]]` (Gruppe 3): `dt`
* `[[4]]` (Gruppe 1): `alpha`
* `[[5]]` (Gruppe 1): `4.0`
* `[[6]]` (Gruppe 2): `2.0`
* `[[7]]` (Gruppe 2): `0.25`
* `[[8]]` (Gruppe 3): `dx`
* `[[9]]` (Gruppe 3): `dtMax`

**Musterherleitung & Gesamt-Feedback:**

**Erklärung:**

* `[[1]] = dx` und `[[2]] = 4.0` setzen die 2D-Grenzformel $\Delta t_{\max} = \frac{\Delta x^2}{4\alpha}$ um.
* `[[3]] = dt` berechnet die tatsächliche Fourier-Zahl $s = \frac{\alpha \cdot \Delta t}{\Delta x^2}$ (die durch den Faktor `0.8` sicher bei $0{,}8 \cdot 0{,}25 = 0{,}20$ liegt).

---

## Frage 5 [T09_Q5]: Konzept-Zuordnung: WPF-Speicherbegriffe rund um WriteableBitmap *(matching, 1.0 Pkt.)*

Ordnen Sie die folgenden Eigenschaften und Methoden der Klasse `WriteableBitmap` ihrer exakten technischen Funktion zu. Beachten Sie die zwei Überhang-Distraktoren.

**Zuordnungspaare & Überhang-Distraktoren (`matching`):**
* Liefert als IntPtr die Speicheradresse des ersten Bytes im unverwalteten Bildpuffer. $\to$ **BackBuffer**
* Gibt die Speicherbreite einer einzelnen Bildzeile in Bytes inklusive Zeilen-Padding an. $\to$ **BackBufferStride**
* Gibt die horizontale Auflösung des Bildes als Anzahl der sichtbaren Pixel pro Zeile an. $\to$ **PixelWidth**
* Markiert ein geändertes Rechteck im Puffer, damit WPF diesen Bereich an die GPU überträgt. $\to$ **AddDirtyRect(Int32Rect)**
* *(Überhang-Distraktor)* $\to$ SolveLaplaceEquation()
* *(Überhang-Distraktor)* $\to$ AutoCalculateTimeStep()

**Musterherleitung & Gesamt-Feedback:**

**Übersicht der WriteableBitmap-Member:**

* `BackBuffer`: Basiszeiger (`IntPtr`) auf das Pixel-Array im unverwalteten Speicher.
* `BackBufferStride`: Zeilenlänge in **Bytes** (mindestens `PixelWidth * BytesPerPixel`).
* `PixelWidth` / `PixelHeight`: Bildabmessungen in **Pixeln**.
* `AddDirtyRect`: Invalidiert den geänderten Teilbereich für das Hardware-Rendering.

---

## Frage 6 [T09_Q6]: Anfangswertprobleme: Stationärer Endzustand vs. Anfangsverteilung *(multichoice, 1.0 Pkt.)*

Eine quadratische Platte ohne innere Wärmequellen wird an allen vier Außenrändern durch Dirichlet-Randbedingungen dauerhaft auf festen Temperaturen gehalten. Welchen Einfluss hat die Wahl der **Anfangstemperaturverteilung** $T(x, y, t=0)$ im Inneren der Platte auf den stationären Endzustand für $t \to \infty$?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Der stationäre Endzustand hängt nur von den Dirichlet-Rändern ab und ist unabhängig vom Startfeld.
  * *Feedback:* Richtig! Für t -> unendlich klingt der Einfluss der Anfangsbedingung exponentiell ab; die eindeutige Lösung der Laplace-Gleichung wird allein durch die Ränder bestimmt.
* [ ] (0%) Verdoppelt man die Anfangstemperatur im Inneren, verdoppelt sich auch die stationäre Endtemperatur.
  * *Feedback:* Falsch. Überschüssige Anfangswärme fließt vollständig über die auf fester Temperatur gehaltenen Dirichlet-Ränder ab.
* [ ] (0%) Die Anfangstemperatur legt dauerhaft fest, an welchen Rändern später Wärme ein- oder ausströmt.
  * *Feedback:* Falsch. Die Anfangsverteilung beeinflusst nur den transienten Einschwingvorgang, nicht aber das langfristige stationäre Gleichgewicht.
* [ ] (0%) Ein stationärer Zustand wird nur erreicht, wenn die Anfangstemperatur überall exakt 0 °C beträgt.
  * *Feedback:* Falsch. Solange die Simulation numerisch stabil ist (s <= 0,25), konvergiert jedes beliebige Anfangsfeld gegen dieselbe stationäre Lösung.

**Musterherleitung & Gesamt-Feedback:**

**Physikalisch-mathematischer Hintergrund:**

Im stationären Grenzfall ($\frac{\partial T}{\partial t} = 0$) geht die Wärmeleitungsgleichung in die elliptische Laplace-Gleichung $\nabla^2 T = 0$ über. Bei reinen Dirichlet-Randbedingungen besitzt diese Gleichung eine **eindeutige Lösung**, die ausschließlich von den Randwerten abhängt – das System „vergisst“ seine Anfangsbedingung über die Zeit vollständig.

---

## Frage 7 [T09_Q7]: C#-Bug-Diagnose: Falsche Zeilenadressierung bei GPU-Stride-Padding *(multichoice, 1.0 Pkt.)*

Auf einem Notebook mit dedizierter GPU hat ein `WriteableBitmap` der Breite `width = 101` Pixel einen durch 64 teilbaren `BackBufferStride = 448` Bytes (statt $101 \cdot 4 = 404$ Bytes). Der Entwickler berechnet den Byte-Index jedoch über:

```csharp
int byteIndex = (y * width + x) * 4;
```
Welcher charakteristische Darstellungsfehler ist dadurch im angezeigten Wärmebild zu beobachten?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Ab der zweiten Zeile verschiebt sich das Bild pro Zeile seitlich, sodass ein schräges Streifenmuster entsteht.
  * *Feedback:* Richtig! Da jede geschriebene Zeile 44 Bytes zu früh beginnt (404 statt 448), wandert das Bild von Zeile zu Zeile um 11 Pixel schräg nach links (Scherungs-Artefakt).
* [ ] (0%) Das Bild wird geometrisch völlig korrekt angezeigt, aber die Farben Rot und Blau sind miteinander vertauscht.
  * *Feedback:* Falsch. Ein um ein Vielfaches von 4 Bytes falscher Zeilen-Stride verschiebt die Pixelpositionen horizontal, vertauscht aber nicht R und B.
* [ ] (0%) WPF wirft beim Aufruf von Unlock sofort eine InvalidStrideException und beendet die gesamte Anwendung.
  * *Feedback:* Falsch. Da (y * width + x) * 4 kleiner ist als y * BackBufferStride + x * 4, bleibt der Zugriff innerhalb des gültigen Puffers und löst keine Exception aus.
* [ ] (0%) Die erste Zeile y = 0 wird komplett schwarz gezeichnet, während alle weiteren Zeilen normal aussehen.
  * *Feedback:* Falsch. Gerade für die erste Zeile (y = 0) ist y * width * 4 = 0 identisch mit y * BackBufferStride = 0; der Versatz wächst erst mit steigendem y!

**Musterherleitung & Gesamt-Feedback:**

**Fehleranalyse (Scherungs-Artefakt bei Stride-Ignorierung):**

Wenn der Grafiktreiber am Ende jeder Zeile Padding-Bytes einfügt (hier $448 - 404 = 44\,\text{Bytes} = 11\,\text{Pixel}$), beginnt Zeile $y = 1$ im Speicher erst bei Byte `448`. Schreibt der Code Zeile 1 jedoch schon ab Byte `404`, landen die ersten 11 Pixel von Zeile 1 im unsichtbaren Padding-Bereich von Zeile 0, und jede folgende Zeile verschiebt sich um weitere 11 Pixel schräg nach links.

---

## Frage 8 [T09_Q8]: unsafe C# & Speichersicherheit: Direkter Pointer-Zugriff in .NET *(multichoice, 1.0 Pkt.)*

Welche der folgenden Aussagen zur Verwendung von `unsafe`-Codeblöcken und Zeigern (`byte*` / `uint*`) bei der `WriteableBitmap`-Programmierung in C# sind **korrekt**? (Mehrere Antworten möglich)

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Für die Übersetzung von unsafe-Blöcken muss in der Projektdatei AllowUnsafeBlocks aktiviert werden.
  * *Feedback:* Richtig! Ohne `<AllowUnsafeBlocks>true</AllowUnsafeBlocks>` in der .csproj-Datei lehnt der C#-Compiler jeden unsafe-Block ab.
* [x] **(50%)** Bei Zeigerzugriffen findet keine automatische Array-Grenzenprüfung durch die .NET-Laufzeit statt.
  * *Feedback:* Richtig! Genau dieser Wegfall der Bounds-Checks macht Pointer so schnell, erfordert aber höchste Sorgfalt bei der Indexberechnung.
* [ ] (-50%) Der BackBuffer eines WriteableBitmap liegt im verwalteten GC-Heap und erfordert ein fixed-Statement.
  * *Feedback:* Falsch! Der BackBuffer von WriteableBitmap liegt bereits im unverwalteten Speicher (IntPtr) und wird durch bmp.Lock() statt durch fixed fixiert.
* [ ] (-50%) Ein unsafe-Block schaltet automatisch die 2D-Wärmeleitung auf alle Kerne der Grafikkarte frei.
  * *Feedback:* Falsch! unsafe erlaubt lediglich CPU-seitige Zeigerarithmetik; der Code läuft weiterhin ganz normal auf der CPU.

**Musterherleitung & Gesamt-Feedback:**

**Zusammenfassung:**

Das Schlüsselwort `unsafe` (mit `<AllowUnsafeBlocks>true</AllowUnsafeBlocks>`) gestattet direkte C-ähnliche Zeigerarithmetik ohne den Overhead von Bounds-Checks oder Array-Kopien. Da `bmp.BackBuffer` bereits ein unverwalteter Speicherbereich ist, genügt der Cast `(byte*)bmp.BackBuffer` zwischen `Lock()` und `Unlock()`.

---
