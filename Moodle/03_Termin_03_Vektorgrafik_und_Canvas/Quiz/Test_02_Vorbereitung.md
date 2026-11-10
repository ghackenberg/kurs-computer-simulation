# Test 02 (Vorbereitung) – Grundlagen, Euler & 2D-Wärmeraster (Variante B)

**Test-ID:** `Test_02_Vorbereitung`  
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_02_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben zum Üben)

---

## Frage 1 [T02_Q1]: 2D-Wärmeleitung: Stabilitätszahl & 5-Punkt-Stern-Temperaturupdate *(cloze, 2.0 Pkt.)*

Auf einem quadratischen 2D-Gitter mit der Gitterweite $\Delta x = \Delta y = 5{,}0\,\text{mm}$ wird ein Wärmeleitungsprozess ($\alpha = 50\,\text{mm}^2/\text{s}$) mit einer Zeitschrittweite von $\Delta t = 0{,}10\,\text{s}$ simuliert. Zum Zeitpunkt $n$ besitzt der Zentralknoten $(i,j)$ die Temperatur $T_{i,j}^n = 20{,}0\,^\circ\text{C}$, während seine vier direkten Nachbarknoten die Temperaturen $100{,}0\,^\circ\text{C}$ (links), $20{,}0\,^\circ\text{C}$ (rechts), $20{,}0\,^\circ\text{C}$ (oben) und $20{,}0\,^\circ\text{C}$ (unten) aufweisen.

a) Berechnen Sie die dimensionslose numerische Fourier-/Stabilitätszahl $s$ für diese Parametrierung:  
Antwort: {1:NUMERICAL:=0.2:0.005#Richtig! s = (alpha * dt) / dx^2 = (50 * 0,10) / 25 = 5 / 25 = 0,20 (stabil, da <= 0,25).~%50%1.0:0.01#Teilpunkte (50 %): Sie haben im Nenner dx = 5 statt dx^2 = 25 geteilt.} (dimensionslos)

b) Welche neue Temperatur $T_{i,j}^{n+1}$ (in **°C**) nimmt der Zentralknoten nach genau einem expliziten Zeitschritt an?  
Antwort: {1:NUMERICAL:=36.0:0.1#Richtig! T_neu = 20 + 0,20 * (100 + 20 + 20 + 20 - 4 * 20) = 20 + 0,20 * 80 = 36,0 °C.~%50%52.0:0.1#Teilpunkte (50 %): Sie haben im 5-Punkt-Stern -2*T_ij statt -4*T_ij gerechnet (20 + 0,2 * 160 = 52 °C).} °C


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (5-Punkt-Stern-Update):**

1. Dimensionslose Stabilitätszahl $s$:  
$s = \frac{\alpha \cdot \Delta t}{\Delta x^2} = \frac{50\,\text{mm}^2/\text{s} \cdot 0{,}10\,\text{s}}{(5{,}0\,\text{mm})^2} = \frac{5}{25} = 0{,}20$. Da $s = 0{,}20 \le 0{,}25$, ist das Verfahren numerisch stabil.

2. Diskreter 5-Punkt-Stern:  
$T_{i,j}^{n+1} = T_{i,j}^n + s \cdot \left(T_{i-1,j}^n + T_{i+1,j}^n + T_{i,j-1}^n + T_{i,j+1}^n - 4 \cdot T_{i,j}^n\right)$  
$T_{i,j}^{n+1} = 20{,}0 + 0{,}20 \cdot (100{,}0 + 20{,}0 + 20{,}0 + 20{,}0 - 4 \cdot 20{,}0) = 20{,}0 + 0{,}20 \cdot 80{,}0 = 36{,}0\,^\circ\text{C}$.

---

## Frage 2 [T02_Q2]: Ereigniserkennung: Lineare Interpolation des Boden-Auftreffzeitpunkts *(numerical, 1.5 Pkt.)*

Bei der Simulation eines fallenden Balls wird die Bodenebene bei $y = 0{,}0\,\text{m}$ zwischen zwei diskreten Zeitschritten durchschlagen: Zum Zeitpunkt $t_n = 1{,}00\,\text{s}$ befindet sich der Ball noch oberhalb des Bodens bei $y_n = +0{,}60\,\text{m}$, zum nächsten Zeitpunkt $t_{n+1} = 1{,}10\,\text{s}$ liefert der Zeitschritt bereits eine Eindringtiefe von $y_{n+1} = -0{,}20\,\text{m}$.

Berechnen Sie mittels **linearer Sub-Step-Interpolation** den präzisen Auftreffzeitpunkt $t_{\text{impact}}$ (in **Sekunden**), an dem $y(t_{\text{impact}}) = 0$ galt.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `1.075` (± `0.002`) → 100%:** Exakt! tau = 0,60 / (0,60 - (-0,20)) = 0,60 / 0,80 = 0,75 -> t_impact = 1,00 + 0,75 * 0,10 = 1,075 s.
* **Wert `0.75` (± `0.005`) → 50%:** Teilpunkte (50 %): Sie haben den relativen Teilfaktor tau = 0,75 berechnet, aber noch nicht in den Zeitpunkt t_impact = t_n + tau * dt umgerechnet.
* **Wert `1.025` (± `0.002`) → 50%:** Teilpunkte (50 %): Sie haben den komplementären Faktor (1 - tau) = 0,25 statt tau = 0,75 zu t_n addiert.

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (Lineare Nullstellen-Interpolation):**

Der relative Zeitschrittanteil $\tau \in [0, 1]$ bis zum Nulldurchgang beträgt:

$\tau = \frac{y_n}{y_n - y_{n+1}} = \frac{0{,}60\,\text{m}}{0{,}60\,\text{m} - (-0{,}20\,\text{m})} = \frac{0{,}60}{0{,}80} = 0{,}75$.

Mit $\Delta t = t_{n+1} - t_n = 0{,}10\,\text{s}$ folgt für den interpolierten Auftreffzeitpunkt:  
$t_{\text{impact}} = t_n + \tau \cdot \Delta t = 1{,}00\,\text{s} + 0{,}75 \cdot 0{,}10\,\text{s} = 1{,}075\,\text{s}$.

---

## Frage 3 [T02_Q3]: C#-Code-Tracing: Bit-Shifting für Little-Endian Bgra32-Farbwerte *(numerical, 1.5 Pkt.)*

Auf einer Little-Endian-Architektur (x86/x64) wird ein ganzes Pixel eines `WriteableBitmap` (Format `Bgra32`) als einzelner 32-Bit-Wert `uint color = 0xFF804020;` im Speicher abgelegt (Byte 0 = Blau, Byte 1 = Grün, Byte 2 = Rot, Byte 3 = Alpha). Gegeben sei folgender C#-Ausdruck:

```csharp
uint color = 0xFF804020;
byte channelValue = (byte)((color >> 8) & 0xFF);
```
Welchen **dezimalen** Zahlenwert (Basis 10) besitzt die Variable `channelValue` (Grün-Kanal) nach der Ausführung?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `64` (± `0`) → 100%:** Richtig! Durch >> 8 rückt das zweite Byte von rechts (0x40) an die unterste Position; 0x40 hex entspricht 4 * 16 = 64 dezimal.
* **Wert `40` (± `0`) → 50%:** Teilpunkte (50 %): Sie haben das richtige Byte 0x40 isoliert, aber den Hexadezimalwert 40 nicht ins Dezimalsystem (4 * 16 = 64) umgerechnet.
* **Wert `128` (± `0`) → 50%:** Teilpunkte (50 %): 128 (0x80) ist der Rot-Kanal bei Bit-Shift >> 16, nicht bei >> 8.

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (Little-Endian uint-Layout bei Bgra32):**

Ein 32-Bit-Wert `0xAARRGGBB` enthält in den Bits `0..7` Blau (`0x20 = 32`), in den Bits `8..15` Grün (`0x40 = 64`), in den Bits `16..23` Rot (`0x80 = 128`) und in den Bits `24..31` Alpha (`0xFF = 255`).

Die Operation `color >> 8` schiebt den Wert um 8 Bits nach rechts zu `0x00FF8040`. Die anschließende Bitmaske `& 0xFF` isoliert das niederwertigste Byte `0x40`, was im Dezimalsystem $4 \cdot 16^1 + 0 \cdot 16^0 = 64$ ergibt.

---

## Frage 4 [T02_Q4]: C#-Lückentext: Unsafe-Pointer-Schreibzugriff in WriteableBitmap *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie den folgenden C#-Codeausschnitt, der innerhalb eines `unsafe`-Blocks ein Pixel an den Koordinaten `(x, y)` im Speicher eines bereits gesperrten `WriteableBitmap bmp` einfärbt:

```csharp
unsafe
{
    byte* pBuffer = (byte*)bmp.[[1]];
    int stride = bmp.[[2]];
    int offset = y * stride + x * [[3]];
    pBuffer[offset + 0] = blue;
    pBuffer[offset + 1] = green;
    pBuffer[offset + 2] = red;
    pBuffer[offset + 3] = 255;
}
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `BackBuffer`
* `[[2]]` (Gruppe 2): `BackBufferStride`
* `[[3]]` (Gruppe 3): `4`
* `[[4]]` (Gruppe 1): `PixelWidth`
* `[[5]]` (Gruppe 1): `SourceRect`
* `[[6]]` (Gruppe 2): `PixelHeight`
* `[[7]]` (Gruppe 2): `DpiX`
* `[[8]]` (Gruppe 3): `3`
* `[[9]]` (Gruppe 3): `8`

**Musterherleitung & Gesamt-Feedback:**

**Erklärung der WriteableBitmap-Eigenschaften:**

* `[[1]] = BackBuffer` liefert den `IntPtr` auf die Basisadresse des unverwalteten Bildspeichers.
* `[[2]] = BackBufferStride` gibt die exakte Zeilenbreite in Bytes (inklusive eventuellem Alignment-Padding) an.
* `[[3]] = 4` entspricht den 4 Bytes pro Pixel im Format `Bgra32` (Blau, Grün, Rot, Alpha).

---

## Frage 5 [T02_Q5]: Pipeline-Reihenfolge: WriteableBitmap Render-Zyklus in WPF *(ddwtos, 1.0 Pkt.)*

Bringen Sie die vier erforderlichen Methodenschritte zur Aktualisierung eines `WriteableBitmap`-Puffers in WPF in die zwingend einzuhaltende zeitliche Ausführungsreihenfolge:

Schritt 1 (Puffer für den UI-Thread sperren): [[1]]  
Schritt 2 (Farbwerte im unverwalteten Speicher berechnen): [[2]]  
Schritt 3 (Geänderten Bildbereich für die GPU-Übertragung vormerken): [[3]]  
Schritt 4 (Sperre aufheben und Austausch mit dem FrontBuffer freigeben): [[4]]

**Drag-and-Drop-Bausteine (`ddwtos`):**
* `[[1]]` (Gruppe 1): `bmp.Lock()`
* `[[2]]` (Gruppe 1): `Schreiben über BackBuffer-Pointer`
* `[[3]]` (Gruppe 1): `bmp.AddDirtyRect(new Int32Rect(0, 0, w, h))`
* `[[4]]` (Gruppe 1): `bmp.Unlock()`
* `[[5]]` (Gruppe 1): `bmp.Freeze()`
* `[[6]]` (Gruppe 1): `bmp.Clone()`

**Musterherleitung & Gesamt-Feedback:**

**Erklärung der WriteableBitmap-Pipeline:**

Vor jedem Direktzugriff auf den `BackBuffer` muss dieser mit `bmp.Lock()` gesperrt werden. Nach dem Beschreiben der Bytes via Pointer muss zwingend *vor* dem Aufruf von `bmp.Unlock()` mittels `bmp.AddDirtyRect(...)` definiert werden, welches Rechteck auf die GPU kopiert werden soll.

---

## Frage 6 [T02_Q6]: System-Taxonomie: Klassifikation des 2D-FDM-Wärmeleitungsmodells *(multichoice, 1.0 Pkt.)*

Wie lässt sich die explizite 2D-Finite-Differenzen-Simulation der Wärmeleitungsgleichung auf einem Pixelgitter in der systemtheoretischen Modell-Taxonomie präzise einordnen?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Es ist ein deterministisches, in der numerischen Berechnung zeitdiskretes Modell mit verteilten Parametern.
  * *Feedback:* Richtig! Es gibt keinen Zufall (deterministisch), Zeitschritte dt (zeitdiskret) und eine Ortsabhängigkeit T(x,y,t) aus einer PDE (verteilte Parameter).
* [ ] (0%) Es ist ein stochastisches, rein statisches Modell mit konzentrierten Parametern ohne jede Ortsabhängigkeit.
  * *Feedback:* Falsch. Das Temperaturfeld hängt sowohl von der Zeit t (dynamisch) als auch von den Raumkoordinaten (x,y) ab und enthält keine Zufallsgrößen.
* [ ] (0%) Es ist ein ereignisdiskretes Warteschlangenmodell, bei dem Zeitschritte nur bei Kundenankünften stattfinden.
  * *Feedback:* Falsch. Das FDM-Wärmeraster rechnet mit äquidistanten Zeitschritten dt (Time-Stepping), nicht ereignisgetrieben (Event-Advance).
* [ ] (0%) Es ist ein rein analytisches geschlossenes Modell, das völlig ohne räumliche oder zeitliche Diskretisierung auskommt.
  * *Feedback:* Falsch. Die Finite-Differenzen-Methode beruht gerade auf der räumlichen (dx, dy) und zeitlichen (dt) Gitter-Diskretisierung.

**Musterherleitung & Gesamt-Feedback:**

**Einordnung in die System-Taxonomie:**

* **Deterministisch vs. stochastisch:** Gleiche Anfangs- und Randbedingungen liefern exakt dasselbe Temperaturfeld (deterministisch).
* **Verteilte vs. konzentrierte Parameter:** Da die Zustandsgröße $T(x,y,t)$ vom Ort abhängt (partielle Differentialgleichung, PDE), liegt ein System mit verteilten Parametern vor.
* **Zeitdiskret:** Durch die Euler-Diskretisierung wird der Zustand zu diskreten Zeitpunkten $t_n = n \cdot \Delta t$ berechnet.

---

## Frage 7 [T02_Q7]: C#-Bug-Diagnose: Fehlende Kanal-Multiplikation beim Bgra32-Pointer *(multichoice, 1.0 Pkt.)*

Ein Entwickler möchte in einem `WriteableBitmap` (Format `Bgra32`, 4 Bytes pro Pixel) das Pixel an der Spalte `x` und Zeile `y` über einen `byte*`-Pointer weiß färben und schreibt:

```csharp
byte* p = (byte*)bmp.BackBuffer;
int idx = y * bmp.BackBufferStride + x;
p[idx] = 255; p[idx + 1] = 255; p[idx + 2] = 255; p[idx + 3] = 255;
```
Welches visuelle Fehlverhalten entsteht durch diesen Code auf dem Bildschirm?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Da x nicht mit 4 multipliziert wird, verschieben sich die Kanäle pro Spalte um ein Byte und das Bild wird gestaucht.
  * *Feedback:* Richtig! Bei einem byte*-Pointer adressiert +x nur das x-te Byte statt des x-ten Pixels (x * 4), wodurch Farbkanäle benachbarter Pixel überschrieben werden.
* [ ] (0%) Der Code funktioniert fehlerfrei, weil der C#-Compiler den Offset x bei Bgra32 automatisch mit vier multipliziert.
  * *Feedback:* Falsch. Ein Zeiger vom Typ byte* hat die Elementgröße 1 Byte; eine automatische Skalierung um 4 erfolgt nur bei einem uint*- oder int*-Pointer.
* [ ] (0%) Die Eigenschaft BackBufferStride muss in dieser Formel noch zusätzlich mit vier multipliziert werden.
  * *Feedback:* Falsch. BackBufferStride ist bereits in Bytes angegeben (ca. Width * 4) und darf nicht erneut mit 4 multipliziert werden.
* [ ] (0%) Durch den Wert 255 im vierten Byte p[idx + 3] wird das Pixel auf dem Bildschirm vollständig transparent.
  * *Feedback:* Falsch. Ein Alpha-Wert von 255 (0xFF) bedeutet 100 % Deckkraft (opak), während 0 vollständig transparent wäre.

**Musterherleitung & Gesamt-Feedback:**

**Fehleranalyse (Byte-Offset vs. Pixel-Offset):**

Da `p` als `byte*` deklariert ist, bewegt sich der Zeiger in 1-Byte-Schritten. Jedes Pixel im Format `Bgra32` belegt jedoch 4 Bytes. Ohne die Multiplikation `x * 4` landet Spalte `x = 1` im Grün-Kanal von Pixel 0, was zu falschen Farben und einer horizontalen Stauchung auf ein Viertel der Bildbreite führt.

---

## Frage 8 [T02_Q8]: Numerische Stabilität: Verhalten bei Überschreitung der CFL-Grenze *(multichoice, 1.0 Pkt.)*

Was passiert in einer expliziten 2D-Wärmeleitungssimulation (5-Punkt-Stern), wenn die dimensionslose Stabilitätszahl $s = \frac{\alpha \cdot \Delta t}{\Delta x^2}$ durch eine zu große Zeitschrittweite oder eine Gitterverfeinerung den kritischen Grenzwert von $0{,}25$ überschreitet? (Mehrere Antworten möglich)

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Das Gewicht des Zentralknotens (1 - 4s) wird negativ und erzeugt unphysikalische Schachbrett-Oszillationen.
  * *Feedback:* Richtig! Für s > 0,25 wird der Faktor (1 - 4s) < 0, sodass ein heißer Knoten im nächsten Schritt kälter als seine kalten Nachbarn werden kann.
* [x] **(50%)** Bei einer Halbierung der Gitterweite dx muss die Zeitschrittweite dt mindestens geviertelt werden, um stabil zu bleiben.
  * *Feedback:* Richtig! Da dx im Nenner quadratisch eingeht (s = alpha * dt / dx^2), vervierfacht eine Halbierung von dx den Wert von s bei konstantem dt.
* [ ] (-50%) Die Simulation bleibt für beliebig große Zeitschritte stabil, verliert aber geringfügig an Genauigkeit.
  * *Feedback:* Falsch! Unbedingte Stabilität gilt nur für implizite Verfahren; das explizite Verfahren divergiert für s > 0,25 exponentiell.
* [ ] (-50%) Eine Erhöhung der Temperaturleitfähigkeit alpha vergrößert den zulässigen stabilen Zeitschritt dt_max.
  * *Feedback:* Falsch! Wegen dt_max = dx^2 / (4 * alpha) steht alpha im Nenner: Schnellere Wärmeleitung erfordert kleinere Zeitschritte.

**Musterherleitung & Gesamt-Feedback:**

**Zusammenfassung (2D-Stabilitätsgrenze):**

Schreibt man den 5-Punkt-Stern als Konvexkombination $T_{i,j}^{n+1} = (1 - 4s) T_{i,j}^n + s (T_{i-1,j}^n + T_{i+1,j}^n + T_{i,j-1}^n + T_{i,j+1}^n)$, erkennt man sofort: Sobald $s > 0{,}25$ wird, ist $1 - 4s < 0$. Rundungsfehler wachsen dann mit jedem Schritt im Vorzeichen alternierend an, bis `Double.PositiveInfinity` bzw. `NaN` erreicht wird.

---
