# Test 08 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante H)

**Test-ID:** `Test_08_Pruefung`  
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_08_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [T08_Q1]: 2D-Wärmeleitung: Gitterverfeinerung & Rechenzeitfaktor *(cloze, 2.0 Pkt.)*

Eine explizite 2D-Wärmeleitungssimulation ($\alpha = 25\,\text{mm}^2/\text{s}$) läuft auf einem Ausgangsgitter mit $\Delta x_{\text{alt}} = 4{,}0\,\text{mm}$ zunächst mit der maximal stabilen Schrittweite $\Delta t_{\max,\text{alt}} = 0{,}16\,\text{s}$. Für eine höhere Detailauflösung wird die Gitterweite in beide Raumrichtungen auf $\Delta x_{\text{neu}} = 2{,}0\,\text{mm}$ halbiert.

a) Wie groß ist die neue maximal zulässige Zeitschrittweite $\Delta t_{\max,\text{neu}}$ in **Millisekunden (ms)** auf dem feineren Gitter?  
Antwort: {1:NUMERICAL:=40:0.1#Richtig! dt_max,neu = dx_neu^2 / (4 * alpha) = 4,0 / 100 = 0,04 s = 40 ms (ein Viertel von 160 ms).~%50%80:0.1#Teilpunkte (50 %): Sie haben dt_max nur halbiert (80 ms) statt geviertelt, oder mit dem 1D-Faktor 2 gerechnet.~%50%0.04:0.001#Teilpunkte (50 %): Zahlenwert in Sekunden statt in Millisekunden (ms) angegeben.} ms

b) Wie viele explizite Zeitschritte $N_{\text{steps}}$ sind auf dem feinen Gitter nötig, um eine physikalische Dauer von $t_{\text{end}} = 2{,}0\,\text{s}$ bei $\Delta t = \Delta t_{\max,\text{neu}}$ zu simulieren?  
Antwort: {1:NUMERICAL:=50:0#Richtig! N = 2,0 s / 0,04 s = 50 Zeitschritte.~%50%25:0#Teilpunkte (50 %): Folgefehler aus dt = 80 ms (2,0 s / 0,08 s = 25 Schritte).} Schritte


**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung:**

1. Aus $\Delta t_{\max} = \frac{\Delta x^2}{4\alpha}$ folgt für $\Delta x_{\text{neu}} = 2{,}0\,\text{mm}$:  
$\Delta t_{\max,\text{neu}} = \frac{(2{,}0\,\text{mm})^2}{4 \cdot 25\,\text{mm}^2/\text{s}} = \frac{4}{100}\,\text{s} = 0{,}04\,\text{s} = 40\,\text{ms}$.

2. Für $t_{\text{end}} = 2{,}0\,\text{s}$ werden damit $N_{\text{steps}} = \frac{2{,}0\,\text{s}}{0{,}04\,\text{s}} = 50\,\text{Schritte}$ benötigt.

---

## Frage 2 [T08_Q2]: Kinematik: Zweischritt-Euler eines vertikal nach oben geworfenen Körpers *(numerical, 1.5 Pkt.)*

Ein Körper wird zum Zeitpunkt $t_0 = 0\,\text{s}$ vom Boden aus ($y_0 = 0{,}0\,\text{m}$) mit einer Anfangsgeschwindigkeit von $v_0 = +15{,}0\,\text{m/s}$ senkrecht nach oben abgeworfen (Erdbeschleunigung $g = 10{,}0\,\text{m/s}^2$ nach unten).

Berechnen Sie die Höhe $y_2$ (in **Metern**) zum Zeitpunkt $t_2 = 1{,}0\,\text{s}$ nach exakt **zwei Zeitschritten** der Länge $\Delta t = 0{,}50\,\text{s}$ mit dem **expliziten Standard-Euler-Verfahren**.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `12.5` (± `0.02`) → 100%:** Exakt! Schritt 1: y_1 = 0 + 0,5 * 15 = 7,5 m, v_1 = 15 - 0,5 * 10 = 10,0 m/s. Schritt 2: y_2 = 7,5 + 0,5 * 10,0 = 12,5 m.
* **Wert `10` (± `0.02`) → 50%:** Teilpunkte (50 %): 10,0 m ist die analytische Höhe y(1,0) = 15*1 - 0,5*10*1 = 10,0 m (bzw. Heun), nicht der explizite Euler!
* **Wert `7.5` (± `0.02`) → 50%:** Teilpunkte (50 %): 7,5 m ist die Höhe y_1 nach nur einem Schritt (bei t_1 = 0,5 s), bzw. das Ergebnis des semi-impliziten Euler.

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (2 Schritte Expliziter Standard-Euler):**

**Schritt 1 ($t_0 = 0 \to t_1 = 0{,}50\,\text{s}$):**  
$y_1 = y_0 + \Delta t \cdot v_0 = 0{,}0 + 0{,}50 \cdot 15{,}0 = 7{,}5\,\text{m}$  
$v_1 = v_0 - \Delta t \cdot g = 15{,}0 - 0{,}50 \cdot 10{,}0 = 10{,}0\,\text{m/s}$.

**Schritt 2 ($t_1 = 0{,}50 \to t_2 = 1{,}00\,\text{s}$):**  
$y_2 = y_1 + \Delta t \cdot v_1 = 7{,}5 + 0{,}50 \cdot 10{,}0 = 12{,}5\,\text{m}$.

---

## Frage 3 [T08_Q3]: C#-Code-Tracing: Zeiger-Arithmetik mit uint* vs. byte* *(numerical, 1.5 Pkt.)*

Anstelle eines `byte*`-Pointers wird in folgendem C#-Code ein `uint*`-Pointer (4 Bytes pro Element) verwendet, um ganze Pixel auf einmal zu schreiben:

```csharp
int strideBytes = 128; // BackBufferStride in Bytes
int pixelsPerRow = strideBytes / 4;
int x = 10, y = 4;
int uintIndex = y * pixelsPerRow + x;
```
Welchen exakten ganzzahligen Wert hat die Variable `uintIndex` nach der Ausführung?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `138` (± `0`) → 100%:** Richtig! pixelsPerRow = 128 / 4 = 32; uintIndex = 4 * 32 + 10 = 128 + 10 = 138.
* **Wert `552` (± `0`) → 50%:** Teilpunkte (50 %): 552 (= 138 * 4) ist der Byte-Index für einen byte*-Pointer; für uint* wurde strideBytes bereits durch 4 geteilt.
* **Wert `522` (± `0`) → 50%:** Teilpunkte (50 %): Sie haben 4 * 128 + 10 = 522 gerechnet und die Division durch 4 bei pixelsPerRow übersehen.

**Musterherleitung & Gesamt-Feedback:**

**Musterherleitung (uint*-Pointer-Adressierung):**

Da ein `uint*`-Zeiger bei jeder Erhöhung um 1 automatisch um `sizeof(uint) = 4` Bytes im Speicher weiterwandert, umfasst eine Zeile von `128 Bytes` genau `pixelsPerRow = 128 / 4 = 32` `uint`-Elemente. Für Zeile `y = 4` und Spalte `x = 10` ergibt sich somit der Element-Index `4 * 32 + 10 = 138`.

---

## Frage 4 [T08_Q4]: C#-Lückentext: Lineare Farbinterpolation (Lerp) mit Math.Clamp *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie die C#-Hilfsmethode, die eine Temperatur `T` sicher auf das Intervall `[0.0, 1.0]` normiert und anschließend den Blau-Kanal von `255` (bei `u = 0`) linear auf `0` (bei `u = 1`) absenkt:

```csharp
double rawU = (T - Tmin) / ([[1]] - Tmin);
double u = Math.[[2]](rawU, 0.0, 1.0);
byte blue = (byte)(255.0 * ([[3]] - u));
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `Tmax`
* `[[2]]` (Gruppe 2): `Clamp`
* `[[3]]` (Gruppe 3): `1.0`
* `[[4]]` (Gruppe 1): `T`
* `[[5]]` (Gruppe 1): `0.0`
* `[[6]]` (Gruppe 2): `Round`
* `[[7]]` (Gruppe 2): `Abs`
* `[[8]]` (Gruppe 3): `255.0`
* `[[9]]` (Gruppe 3): `0.0`

**Musterherleitung & Gesamt-Feedback:**

**Erklärung:**

* `[[1]] = Tmax` bildet die Spannweite `Tmax - Tmin` im Nenner.
* `[[2]] = Clamp` begrenzt Ausreißer sicher auf das Intervall `[0.0, 1.0]`, damit der anschließende Cast nach `byte` nicht überläuft.
* `[[3]] = 1.0` sorgt dafür, dass Blau bei `u = 0.0` den Maximalwert `255` und bei `u = 1.0` den Wert `0` erhält.

---

## Frage 5 [T08_Q5]: Pipeline-Reihenfolge: Ereignisbehandlung beim Bodenaufprall (Hybrid-Step) *(ddwtos, 1.0 Pkt.)*

Bringen Sie die vier Teilschritte zur präzisen Behandlung einer Bodenkollision (sobald der reguläre Zeitschritt eine negative Höhe `yNew < 0` geliefert hat) in die richtige algorithmische Reihenfolge:

Schritt 1: [[1]]  
Schritt 2: [[2]]  
Schritt 3: [[3]]  
Schritt 4: [[4]]

**Drag-and-Drop-Bausteine (`ddwtos`):**
* `[[1]]` (Gruppe 1): `Nulldurchgangs-Bedingung yOld > 0 und yNew < 0 detektieren`
* `[[2]]` (Gruppe 1): `Relativen Teilzeitschritt tau = yOld / (yOld - yNew) interpolieren`
* `[[3]]` (Gruppe 1): `Aufprallgeschwindigkeit vImpact = vOld - g * (tau * dt) berechnen`
* `[[4]]` (Gruppe 1): `Geschwindigkeit mit vNew = -e * vImpact reflektieren`
* `[[5]]` (Gruppe 1): `Erdbeschleunigung g dauerhaft auf 0 setzen`
* `[[6]]` (Gruppe 1): `Zeitschrittweite dt mit -1 multiplizieren`

**Musterherleitung & Gesamt-Feedback:**

**Erklärung:**

Zuerst wird der Vorzeichenwechsel der Höhe erkannt (Zero-Crossing Detection). Danach liefert die Sekantenformel den Teilfaktor $\tau$, mit dem die exakte Geschwindigkeit $v_{\text{impact}}$ im Moment des Aufpralls bestimmt und schließlich über das Stoßgesetz $-e \cdot v_{\text{impact}}$ umgekehrt wird.

---

## Frage 6 [T08_Q6]: Räumliche Diskretisierung: Fehlerordnung des zentralen Differenzenquotienten *(multichoice, 1.0 Pkt.)*

Warum verwendet der 5-Punkt-Stern für die zweite Ortsableitung $\frac{\partial^2 T}{\partial x^2}$ den symmetrischen Ausdruck $\frac{T_{i-1} - 2T_i + T_{i+1}}{\Delta x^2}$ und welche räumliche Konsistenzordnung wird damit erreicht?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** In der Taylor-Summe kürzen sich alle ungeraden Ableitungen weg, was Fehlerordnung zwei in dx liefert.
  * *Feedback:* Richtig! Die Terme erster und dritter Ordnung (+dT/dx und -dT/dx sowie +d^3T/dx^3 und -d^3T/dx^3) heben sich exakt auf; es bleibt O(dx^2).
* [ ] (0%) Der Ausdruck vermeidet jede Division und erreicht dadurch eine räumliche Fehlerordnung von vier.
  * *Feedback:* Falsch. Es wird durch dx^2 dividiert, und die vierte Ableitung kürzt sich nicht weg, sodass die Fehlerordnung 2 (nicht 4) beträgt.
* [ ] (0%) Die Formel berücksichtigt nur den linken Nachbarn und hat deshalb die räumliche Fehlerordnung eins.
  * *Feedback:* Falsch. Sowohl der linke (i-1) als auch der rechte Nachbar (i+1) gehen symmetrisch ein, was die Ordnung auf 2 erhöht.
* [ ] (0%) Durch diese symmetrische Formel wird das explizite Zeitverfahren für beliebig große dt stabil.
  * *Feedback:* Falsch. Auch mit dem symmetrischen zentralen Differenzenquotienten unterliegt das explizite Euler-Verfahren der Grenze s <= 0,25.

**Musterherleitung & Gesamt-Feedback:**

**Taylor-Herleitung des zentralen Differenzenquotienten 2. Ordnung:**

Addiert man $T(x+\Delta x) = T + \Delta x T' + \frac{\Delta x^2}{2} T'' + \frac{\Delta x^3}{6} T''' + \frac{\Delta x^4}{24} T^{(4)}$ und $T(x-\Delta x) = T - \Delta x T' + \frac{\Delta x^2}{2} T'' - \frac{\Delta x^3}{6} T''' + \frac{\Delta x^4}{24} T^{(4)}$, so fallen die ungeraden Terme $T'$ und $T'''$ exakt heraus. Nach Division durch $\Delta x^2$ verbleibt ein führender Abbruchfehler von $\frac{\Delta x^2}{12} T^{(4)} \in \mathcal{O}(\Delta x^2)$.

---

## Frage 7 [T08_Q7]: C#-Bug-Diagnose: Byte-Überlauf ohne Begrenzung (Clamping) bei Heatmap *(multichoice, 1.0 Pkt.)*

Eine Farbskala ist auf den Bereich `0 °C` bis `100 °C` ausgelegt. Durch eine lokale Wärmequelle steigt die Temperatur eines Knotens jedoch auf `T = 120.0` °C an. Der Farbwert wird ohne `Math.Clamp` wie folgt berechnet:

```csharp
double u = T / 100.0; // u = 1.2
byte red = (byte)(255.0 * u);
```
Welcher Effekt tritt in einem standardmäßigen C#-Projekt (`unchecked`-Kontext) bei dieser Konvertierung auf?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Der Wert 306 läuft modulo 256 auf 50 über, sodass die heißeste Stelle plötzlich dunkel erscheint.
  * *Feedback:* Richtig! Im Standard-Kontext (unchecked) schneidet (byte)306 die oberen Bits ab (306 - 256 = 50), was zu einem dunklen Farbsprung mitten im Hotspot führt.
* [ ] (0%) Der C#-Cast nach byte begrenzt alle Zahlen über 255 automatisch und sicher auf das Maximum 255.
  * *Feedback:* Falsch. Ein einfacher (byte)-Cast führt in C# kein Sättigungs-Clamping durch, sondern ein Abschneiden der höherwertigen Bits (Modulo 256).
* [ ] (0%) Die Variable red nimmt automatisch den speziellen Gleitkommawert Byte.NaN für ungültige Farben an.
  * *Feedback:* Falsch. Ganzzahltypen wie byte besitzen keinen NaN-Wert; NaN existiert nur bei IEEE-754-Gleitkommatypen (float, double).
* [ ] (0%) Das WriteableBitmap skaliert alle übergroßen Farbwerte beim Unlock automatisch auf den Bereich 0..255.
  * *Feedback:* Falsch. Der Überlauf passiert bereits vor dem Speichern in die 8-Bit-Variable red; das WriteableBitmap sieht danach nur noch den Wert 50.

**Musterherleitung & Gesamt-Feedback:**

**Fehleranalyse (Unchecked Byte Overflow):**

Für `T = 120.0` ergibt `255.0 * 1.2` den Wert `306.0`. Da ein `byte` nur 8 Bits (0..255) fasst, geht beim ungeschützten Cast `(byte)306` das 9. Bit (Wertigkeit 256) verloren: $306 \bmod 256 = 50$. Heißere Regionen springen dadurch optisch plötzlich wieder auf dunkle/kalte Farbtöne zurück. Deshalb ist `Math.Clamp(u, 0.0, 1.0)` zwingend erforderlich.

---

## Frage 8 [T08_Q8]: Modelltheorie: Die drei Hauptmerkmale des allgemeinen Modellbegriffs nach Stachowiak *(multichoice, 1.0 Pkt.)*

Welche der folgenden Aussagen zu den drei klassischen Hauptmerkmalen eines Modells nach Herbert Stachowiak (1973) sind **zutreffend**? (Mehrere Antworten möglich)

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Gemäß Abbildungsmerkmal ist jedes Modell stets die Repräsentation eines natürlichen oder künstlichen Originals.
  * *Feedback:* Richtig! Ein Modell steht immer in einer Zuordnungsbeziehung zu einem Original (das selbst wiederum ein Modell sein kann).
* [x] **(50%)** Das pragmatische Merkmal fordert die Angabe, für wen, wann und zu welchem Zweck das Modell eingesetzt wird.
  * *Feedback:* Richtig! Modelle sind nicht nur Abbilder von etwas, sondern erfüllen ihre Ersetzungsfunktion für bestimmte Subjekte, Zeiten und Zwecke.
* [ ] (-50%) Das Verkürzungsmerkmal verlangt, dass der Programmcode eines Modells höchstens 100 Zeilen umfassen darf.
  * *Feedback:* Falsch! Verkürzung (Präterition) bezieht sich auf das Weglassen irrelevanter Original-Eigenschaften bei der Abstraktion, nicht auf die C#-Codezeilen.
* [ ] (-50%) Nach Stachowiak ist ein Modell nur dann gültig, wenn es sämtliche Eigenschaften des Originals 1:1 kopiert.
  * *Feedback:* Falsch! Eine vollständige 1:1-Kopie aller Attribute widerspricht direkt dem Verkürzungsmerkmal und wäre das Original selbst.

**Musterherleitung & Gesamt-Feedback:**

**Zusammenfassung (Allgemeine Modelltheorie nach Stachowiak):**

Jedes Modell ist durch drei fundamentale Merkmale gekennzeichnet: 1. **Abbildungsmerkmal** (Repräsentation eines Originals), 2. **Verkürzungsmerkmal** (Abstraktion durch Beschränkung auf relevante Attribute) und 3. **Pragmatisches Merkmal** (Ausrichtung auf Subjekt, Zeitintervall und Untersuchungszweck).

---
