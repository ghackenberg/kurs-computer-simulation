# Moodle-Testkatalog: Quiz 01 (Termin 03) – Grundlagen, Digitaler Zwilling & 2D-Pixelgrafik
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
**Studiengang:** B.Sc. Automatisierungstechnik, Campus Wels, FH Oberösterreich  
**Dozent:** Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme  
**Prüfungszeitpunkt:** Termin 03 (erste 15 Minuten vor dem Theorie-Impuls)  
**Stoffabgrenzung (Rückwärts-Kausalität):** Kapitel 00 (Prolog), Kapitel 01 (Einführung, Digitaler Zwilling & Expliziter Euler), Kapitel 02 (2D-Pixelgrafik & FDM-Wärmeraster)  
**Kausalitäts-Sperre:** Kein WPF Canvas / Vektorgrafik (Kap. 03), kein ScottPlot (Kap. 04), kein 3D / SharpGL (Kap. 05), kein TPL (Kap. 06), kein Cholesky (Kap. 07), kein RK4 (Kap. 08)!  

---

## 1. Didaktisches Einsatz-, Fragetypen- & Feedbackkonzept (100 % Auto-Grading)

Dieser Katalog umfasst **10 eigenständige, äquivalente Test-Varianten** mit jeweils **8 Fragen und 10,0 Punkten** (insgesamt 80 kalibrierte Fragen für 15 Minuten Bearbeitungszeit):
* **3 Vorbereitungstests (`Test_01` bis `Test_03`):** Werden den Studierenden vorab im Moodle-Kursraum zum unbegrenzten Üben mit sofortigem, detailliertem Antwort- und Lösungsfeedback freigeschaltet.
* **7 Prüfungstests (`Test_04` bis `Test_10`):** Bilden den geschützten Klausurpool. Zu Beginn des Prüfungstermins wird **zufällig genau 1 Test** für die 15-minütige Präsenzprüfung gezogen. Um bloßes Auswendiglernen der Vorbereitungstests auszuschließen, variieren die Prüfungstests nicht nur Zahlenwerte, sondern systematisch auch die **gesuchte Zielgröße / Rechenrichtung** sowie die Code- und Diagnose-Szenarien.

### Voller Moodle-Fragetypen-Mix (100 % automatische Auswertung, 0 Min. Korrekturaufwand):
1. **Frage 1 (2,0 Pkt. – `cloze`):** Mehrstufige Ingenieursberechnung mit 2 eingebetteten numerischen Teilfeldern (Zwischenschritt + Endergebnis) für faire automatische Teilpunkte bei Folgefehlern.
2. **Frage 2 (1,5 Pkt. – `numerical`):** Physikalisch-numerische Berechnung mit Toleranzintervall sowie automatischen `50 %`-Teilpunkten für typische Einheiten-/Vorzeichenfallen.
3. **Frage 3 (1,5 Pkt. – `numerical`):** C#-Code-Tracing (Bestimmung des exakten numerischen Variablen-/Pufferzustands nach Codeausführung inkl. `50 %`-Teilpunkte-Falle).
4. **Frage 4 (1,0 Pkt. – `gapselect`):** Inline-C#-Code-Lückentext (*„Fill in the C# Code“*) mit 3 gruppierten Dropdown-Lücken `[[1]]`, `[[2]]`, `[[3]]` direkt im Programmcode.
5. **Frage 5 (1,0 Pkt. – `matching` / `ddwtos`):** Konzept-/Architektur-Zuordnung mit Überhang-Distraktoren (`matching`) bzw. Pipeline-Reihenfolge per Drag-and-Drop (`ddwtos`).
6. **Frage 6 (1,0 Pkt. – `multichoice`, Single-Choice):** Konzept- und Phänomen-Diagnose (4 längensymmetrische Optionen A–D, max. 25 % Längendifferenz).
7. **Frage 7 (1,0 Pkt. – `multichoice`, Single-Choice):** Subtile C#-Code-Bug-Diagnose (*„Find the Bug“*, 4 längensymmetrische Optionen A–D).
8. **Frage 8 (1,0 Pkt. – `multichoice`, Multiple-Select):** Vernetzte Systemanalyse (4 längensymmetrische Optionen A–D, 2 richtig mit `+50 %`, 2 falsch mit `-50 %`).

---

## 2. Übersichtstabelle aller 10 Tests

| Test-ID | Status | Q1 (`cloze`, 2,0 P.) | Q2 (`numerical`, 1,5 P.) | Q3 (`numerical` Code, 1,5 P.) | Q4 (`gapselect` C#, 1,0 P.) | Q5 (`matching`/`ddwtos`, 1,0 P.) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Test_01_Vorbereitung** | 🟢 Vorbereitung | CFL $\Delta t_{\max}$ & Schritte ($\Delta x=2$ mm) | Euler-Höhe $y_1$ nach 1 Schritt | `Bgra32` Byte-Index (`x=5, y=3`) | 5-Punkt-Stern mit `Array.Copy` | Stachowiak-Merkmale & Kritzinger |
| **Test_02_Vorbereitung** | 🟢 Vorbereitung | Fourier-Zahl $s$ & neue Temperatur $T_{i,j}^{n+1}$ | Interpolierter Auftreffzeitpunkt $t_{\text{impact}}$ | `uint` Bit-Shift Farbkanal-Extraktion | `unsafe` Pointer-Zugriff auf `BackBuffer` | `WriteableBitmap` Update-Pipeline (`Lock`..`Unlock`) |
| **Test_03_Vorbereitung** | 🟢 Vorbereitung | `BackBufferStride` & Speicherbedarf in KiB | Heun-Korrektorschritt (RK2) bei Abkühlung | Farbkanal-Interpolation `Lerp` bei $T=45^\circ\text{C}$ | Boden-Reflexion mit Interpolation $\tau$ | Randbedingungen (Dirichlet, Neumann, Robin) |
| **Test_04_Pruefung** | 🔴 **Prüfung** | Minimales $\Delta x_{\min}$ & Gitterknoten $N_{\text{total}}$ | Euler-Höhe $y_2$ nach 2 Zeitschritten | Code-Tracing 5-Punkt-Stern (`T_next[1, 1]`) | Heun-Verfahren (RK2) in C# | Ablaufkette Heun-Prädiktor-Korrektor |
| **Test_05_Pruefung** | 🔴 **Prüfung** | `BackBufferStride` mit 64-Byte-Padding & Puffergröße | Betrag des globalen Fehlers $|y_{\text{Euler}} - y_{\text{exakt}}|$ | Code-Tracing Euler-Schleife (`3` Iterationen) | Randbedingungen im 2D-Array setzen | Zuordnung System-Taxonomie (Beispiele) |
| **Test_06_Pruefung** | 🔴 **Prüfung** | 5-Punkt-Stern bei $s=0{,}25$ & Gleichgewicht | Rücksprunggeschwindigkeit $v_{\text{after}} = -e \cdot v_{\text{impact}}$ | Rückrechnung Spalte `x` aus Byte-Offset `idx` | Bit-Shifting `uint` Packen (`Bgra32`) | Ablaufkette 2D-FDM-Simulationsschritt |
| **Test_07_Pruefung** | 🔴 **Prüfung** | Rückrechnung $\alpha$ aus $s$ & $\Delta t_{\max}$ | Euler-Zustand $v_2$ eines PT1-Glieds nach 2 Schritten | Code-Tracing Neumann-Rand + 5-Punkt-Stern | `WriteableBitmap` Methodenrahmen (`Lock`, `AddDirtyRect`, `Unlock`) | Zuordnung Numerik-Begriffe (Euler, Heun, CFL, Symplektisch) |
| **Test_08_Pruefung** | 🔴 **Prüfung** | Halbierung von $\Delta x$ $\to$ neues $\Delta t_{\max}$ & Schritte | Steigflug-Höhe $y_2$ nach 2 Euler-Schritten | `uint*` Index-Berechnung aus `BackBufferStride` | Falschfarben-Mapping mit `Math.Clamp` | Ablaufkette Sub-Step-Bodenreflexion |
| **Test_09_Pruefung** | 🔴 **Prüfung** | Neumann-Rand + 5-Punkt-Stern-Temperatur $T_{1,1}^{n+1}$ | Relativer Kollisionsfaktor $\tau = y_n / (y_n - y_{n+1})$ | 1D-Index des unteren Nachbarn `(y + 1) * nx + x` | Berechnung von `dtMax` und `s` in C# | Zuordnung `WriteableBitmap`-API (`BackBuffer`, `Stride`, `DirtyRect`) |
| **Test_10_Pruefung** | 🔴 **Prüfung** | Anzahl Knoten-Updates pro Sekunde & Echtzeitbudget | Heun-Ortsupdate $y_1$ beim freien Fall aus Ruhe | `uint` Bit-Shifting `>> 16` für Rot-Kanal | Semi-impliziter Euler in C# | Modellierungs- & Simulations-Workflow |

---

## 3. Detaillierter Fragen- & Lösungskatalog (Alle 10 Tests)

### Test 01 (Vorbereitung) – Grundlagen, Euler & 2D-Wärmeraster (Variante A)
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_01_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben in Moodle)  

#### Frage 1.1: 2D-Wärmeleitung: Stabilitätsgrenze & Integrationsschritte *(cloze, 2.0 Pkt.)*

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

#### Frage 1.2: Expliziter Euler: Vertikaler Fallschritt eines Prüfkörpers *(numerical, 1.5 Pkt.)*

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

#### Frage 1.3: C#-Code-Tracing: Bgra32 Byte-Offset im BackBuffer *(numerical, 1.5 Pkt.)*

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

#### Frage 1.4: C#-Lückentext: Double-Buffering beim 5-Punkt-Stern *(gapselect, 1.0 Pkt.)*

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

#### Frage 1.5: Konzept-Zuordnung: Modelltheorie (Stachowiak) & Digitaler Zwilling (Kritzinger) *(matching, 1.0 Pkt.)*

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

#### Frage 1.6: Numerische Analyse:Lokaler und globaler Fehler beim expliziten Euler *(multichoice, 1.0 Pkt.)*

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

#### Frage 1.7: C#-Bug-Diagnose: In-Place-Überschreibung im 2D-Wärmeraster *(multichoice, 1.0 Pkt.)*

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

#### Frage 1.8: Systemanalyse: WriteableBitmap & Physikalische Randbedingungen *(multichoice, 1.0 Pkt.)*

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

### Test 02 (Vorbereitung) – Grundlagen, Euler & 2D-Wärmeraster (Variante B)
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_02_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben in Moodle)  

#### Frage 2.1: 2D-Wärmeleitung: Stabilitätszahl & 5-Punkt-Stern-Temperaturupdate *(cloze, 2.0 Pkt.)*

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

#### Frage 2.2: Ereigniserkennung: Lineare Interpolation des Boden-Auftreffzeitpunkts *(numerical, 1.5 Pkt.)*

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

#### Frage 2.3: C#-Code-Tracing: Bit-Shifting für Little-Endian Bgra32-Farbwerte *(numerical, 1.5 Pkt.)*

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

#### Frage 2.4: C#-Lückentext: Unsafe-Pointer-Schreibzugriff in WriteableBitmap *(gapselect, 1.0 Pkt.)*

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

#### Frage 2.5: Pipeline-Reihenfolge: WriteableBitmap Render-Zyklus in WPF *(ddwtos, 1.0 Pkt.)*

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

#### Frage 2.6: System-Taxonomie: Klassifikation des 2D-FDM-Wärmeleitungsmodells *(multichoice, 1.0 Pkt.)*

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

#### Frage 2.7: C#-Bug-Diagnose: Fehlende Kanal-Multiplikation beim Bgra32-Pointer *(multichoice, 1.0 Pkt.)*

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

#### Frage 2.8: Numerische Stabilität: Verhalten bei Überschreitung der CFL-Grenze *(multichoice, 1.0 Pkt.)*

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

### Test 03 (Vorbereitung) – Grundlagen, Euler & 2D-Wärmeraster (Variante C)
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_03_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben in Moodle)  

#### Frage 3.1: WriteableBitmap Speicherlayout: BackBufferStride & Pufferspeicher *(cloze, 2.0 Pkt.)*

Für eine hochauflösende 2D-Temperaturfeld-Visualisierung wird ein `WriteableBitmap` mit einer Breite von $W = 256\,\text{Pixeln}$ und einer Höhe von $H = 128\,\text{Pixeln}$ im Format `PixelFormats.Bgra32` (32 Bit pro Pixel, ohne zusätzliches Zeilen-Padding) angelegt.

a) Welchen exakten Wert liefert die Eigenschaft `BackBufferStride` (Länge einer Bildzeile) in **Bytes**?  
Antwort: {1:NUMERICAL:=1024:0#Richtig! 256 Pixel * 4 Bytes/Pixel = 1024 Bytes pro Zeile.~%50%256:0#Teilpunkte (50 %): Sie haben die Pixelanzahl (256) statt der Byte-Anzahl (256 * 4 = 1024) angegeben.~%50%8192:0#Teilpunkte (50 %): Sie haben mit 32 (Bits) statt mit 4 (Bytes) multipliziert.} Bytes

b) Wie groß ist das gesamte Speichervolumen des `BackBuffer` in **Kibibyte (KiB)** (wobei $1\,\text{KiB} = 1024\,\text{Bytes}$ gilt)?  
Antwort: {1:NUMERICAL:=128:0.1#Richtig! (1024 Bytes/Zeile * 128 Zeilen) / 1024 Bytes/KiB = 128 KiB.~%50%131.072:0.1#Teilpunkte (50 %): Sie haben durch 1000 (kB) statt durch 1024 (KiB) geteilt.~%50%32:0.1#Teilpunkte (50 %): Folgefehler aus 1 Byte pro Pixel statt 4 Bytes pro Pixel.} KiB


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung (Bgra32-Speicherberechnung):**

1. Im Format `Bgra32` belegt jedes Pixel $32\,\text{Bit} = 4\,\text{Bytes}$. Bei $W = 256$ Pixeln beträgt die Zeilenlänge:  
$\text{Stride} = 256 \cdot 4\,\text{Bytes} = 1024\,\text{Bytes}$.

2. Bei $H = 128$ Zeilen umfasst der Gesamtpuffer $1024\,\text{Bytes} \cdot 128 = 131\,072\,\text{Bytes}$. Umgerechnet in Kibibyte ($1\,\text{KiB} = 1024\,\text{Bytes}$) sind das exakt $\frac{131\,072}{1024} = 128\,\text{KiB}$.

---

#### Frage 3.2: Thermisches RC-Glied: Expliziter Euler vs. Heun-Verfahren (RK2) *(numerical, 1.5 Pkt.)*

Die Abkühlung eines Bauteils auf Umgebungstemperatur ($0\,^\circ\text{C}$) wird durch die Differentialgleichung $\dot{T}(t) = -2{,}0\,\text{s}^{-1} \cdot T(t)$ beschrieben. Zum Zeitpunkt $t_0 = 0\,\text{s}$ beträgt die Starttemperatur $T_0 = 100{,}0\,^\circ\text{C}$. Es wird ein Zeitschritt von $\Delta t = 0{,}20\,\text{s}$ betrachtet.

Berechnen Sie die neue Temperatur $T_1$ (in **°C**) zum Zeitpunkt $t_1 = 0{,}20\,\text{s}$ mit dem **Heun-Verfahren (2-stufiges Prädiktor-Korrektor-Verfahren, RK2)**.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `68` (± `0.1`) → 100%:** Exakt! Prädiktor T_pred = 60 °C (k1 = -200, k2 = -120); Korrektor T_1 = 100 + 0,20 * 0,5 * (-200 + (-120)) = 68,0 °C.
* **Wert `60` (± `0.1`) → 50%:** Teilpunkte (50 %): 60,0 °C ist nur der Prädiktor-Zwischenwert (expliziter Euler-Schritt), der Korrektor-Mittelwertschritt fehlt noch.
* **Wert `76` (± `0.1`) → 50%:** Teilpunkte (50 %): Sie haben im Korrektorschritt versehentlich nur die Steigung k2 = -120 statt des Mittelwerts 0,5 * (k1 + k2) = -160 verwendet.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung (Heun-Verfahren / RK2):**

1. **Steigung am Zeilenanfang ($k_1$):**  
$k_1 = f(T_0) = -2{,}0 \cdot 100{,}0 = -200{,}0\,\text{K/s}$.

2. **Euler-Prädiktorschritt ($\tilde{T}_1$):**  
$\tilde{T}_1 = T_0 + \Delta t \cdot k_1 = 100{,}0 + 0{,}20 \cdot (-200{,}0) = 60{,}0\,^\circ\text{C}$.

3. **Steigung am Intervallende ($k_2$):**  
$k_2 = f(\tilde{T}_1) = -2{,}0 \cdot 60{,}0 = -120{,}0\,\text{K/s}$.

4. **Heun-Korrektorschritt (Trapezregel):**  
$T_1 = T_0 + \frac{\Delta t}{2} \cdot (k_1 + k_2) = 100{,}0 + 0{,}10 \cdot (-200{,}0 - 120{,}0) = 100{,}0 - 32{,}0 = 68{,}0\,^\circ\text{C}$ (deutlich näher an der exakten Lösung $100 \cdot e^{-0{,}4} \approx 67{,}03\,^\circ\text{C}$ als der reine Euler-Wert $60{,}0\,^\circ\text{C}$).

---

#### Frage 3.3: C#-Code-Tracing: Lineare Farbinterpolation (Lerp) für Heatmap *(numerical, 1.5 Pkt.)*

Um eine Temperatur `T` zwischen `Tmin = 20.0` und `Tmax = 120.0` in einen Rot-Farbkanal (zwischen `rCold = 50` und `rHot = 250`) umzurechnen, wird folgender C#-Code ausgeführt:

```csharp
double T = 45.0;
double u = Math.Clamp((T - 20.0) / (120.0 - 20.0), 0.0, 1.0);
byte red = (byte)(50 + u * (250 - 50));
```
Welchen exakten Wert besitzt die Variable `red` nach der Ausführung?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `100` (± `0`) → 100%:** Richtig! u = (45 - 20) / 100 = 0,25; red = 50 + 0,25 * 200 = 50 + 50 = 100.
* **Wert `50` (± `0`) → 50%:** Teilpunkte (50 %): 50 ist nur der Zuwachs u * (250 - 50), Sie haben den Basiswert rCold = 50 am Anfang vergessen zu addieren.
* **Wert `62` (± `1`) → 50%:** Teilpunkte (50 %): Sie haben mit (250 + 50) = 300 oder ohne Subtraktion von rCold (0,25 * 250 = 62,5) gerechnet.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung (Lineare Farbskalen-Interpolation):**

1. Normierter Parameter $u \in [0, 1]$:  
$u = \frac{T - T_{\min}}{T_{\max} - T_{\min}} = \frac{45{,}0 - 20{,}0}{120{,}0 - 20{,}0} = \frac{25{,}0}{100{,}0} = 0{,}25$.

2. Lineare Interpolation des Rot-Kanals:  
$\text{red} = 50 + 0{,}25 \cdot (250 - 50) = 50 + 0{,}25 \cdot 200 = 50 + 50 = 100$.

---

#### Frage 3.4: C#-Lückentext: Sub-Step-Bodenreflexion mit Restitutionskoeffizient *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie den C#-Code zur physikalisch korrekten Behandlung einer Bodenkollision (Boden bei `y = 0`, Restitutionskoeffizient `e`), sobald der Zeitschritt von `yOld > 0` nach `yNew < 0` unter den Boden geführt hat:

```csharp
if (yNew < 0.0)
{
    double tau = yOld / (yOld - [[1]]);
    double vImpact = vOld - g * ([[2]] * dt);
    vNew = [[3]] * vImpact;
    yNew = 0.0;
}
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `yNew`
* `[[2]]` (Gruppe 2): `tau`
* `[[3]]` (Gruppe 3): `-e`
* `[[4]]` (Gruppe 1): `vNew`
* `[[5]]` (Gruppe 1): `0.0`
* `[[6]]` (Gruppe 2): `1.0`
* `[[7]]` (Gruppe 2): `e`
* `[[8]]` (Gruppe 3): `+e`
* `[[9]]` (Gruppe 3): `1.0 / e`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung der Kollisions-Interpolation:**

* `[[1]] = yNew`: Da `yNew` negativ ist, entspricht `yOld - yNew` der gesamten zurückgelegten vertikalen Strecke im Schritt.
* `[[2]] = tau`: Die Fallgeschwindigkeit bis zum Aufprall wächst nur über den Teilzeitschritt $\tau \cdot \Delta t$ an.
* `[[3]] = -e`: Beim Aufprall kehrt sich das Vorzeichen der Geschwindigkeit um und ihr Betrag wird mit dem Stoßfaktor $e \in [0, 1]$ gedämpft.

---

#### Frage 3.5: Konzept-Zuordnung: Physikalische Randbedingungen der Wärmeleitung *(matching, 1.0 Pkt.)*

Ordnen Sie die folgenden physikalisch-technischen Randszenarien eines 2D-Wärmeleitungsproblems dem jeweiligen mathematischen Randbedingungstyp bzw. der Diskretisierung zu. Beachten Sie die zwei Überhang-Distraktoren.

**Zuordnungspaare & Überhang-Distraktoren (`matching`):**
* Eine Plattenseite wird durch ein geregeltes Wasserbad dauerhaft auf exakt 80 °C gehalten. $\to$ **Dirichlet-Randbedingung (1. Art: Fester Funktionswert)**
* Eine Plattenseite ist perfekt wärmegedämmt (adiabat), sodass kein Wärmestrom über den Rand fließt. $\to$ **Homogene Neumann-Randbedingung (2. Art: Ableitung Null)**
* Eine Plattenseite gibt Wärme proportional zur Temperaturdifferenz an die vorbeiströmende Luft ab. $\to$ **Robin-Randbedingung (3. Art: Konvektiver Wärmeübergang)**
* Diskrete Umsetzung am linken Rand (Index 0) durch die Zuweisung T[0, y] = T[1, y] nach jedem Schritt. $\to$ **Numerische Implementierung eines isolierten Neumann-Randes**
* *(Überhang-Distraktor)* $\to$ Courant-Friedrichs-Lewy-Randbedingung (4. Art)
* *(Überhang-Distraktor)* $\to$ Stachowiak-Abstraktions-Randbedingung (0. Art)

**Musterherleitung & Gesamt-Feedback:**
**Übersicht der drei klassischen Randbedingungen für PDEs:**

* **1. Art (Dirichlet):** Vorgabe des Zustands selbst, z. B. $T = T_{\text{Wand}}$.
* **2. Art (Neumann):** Vorgabe der Normalenableitung (Wärmestromdichte $\dot{q} = -\lambda \frac{\partial T}{\partial n}$). Bei perfekter Isolation gilt $\frac{\partial T}{\partial n} = 0 \implies T_{\text{Rand}} = T_{\text{Nachbar}}$.
* **3. Art (Robin / Cauchy):** Linearkombination aus Randtemperatur und Normalenableitung (Newtonsches Abkühlungsgesetz an Fluidgrenzen).

---

#### Frage 3.6: Modelltheorie & Echtzeit: Zusammensetzung eines Digitalen Zwillings *(multichoice, 1.0 Pkt.)*

Welche Aussage beschreibt die Grundstruktur eines Digitalen Zwillings nach Michael Grieves sowie die Echtzeitanforderungen an eine gekoppelte Simulation in der Automatisierungstechnik korrekt?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Ein Digitaler Zwilling umfasst das reale Objekt, das virtuelle Modell und deren bidirektionale Datenverbindung.
  * *Feedback:* Richtig! Grieves definiert den Digital Twin über genau diese drei Kernkomponenten (Physical Space, Virtual Space, Data/Information Tie).
* [ ] (0%) Ein Digitaler Zwilling erfordert zwingend ein 3D-CAD-Modell, kommt aber ohne reale Sensordaten-Kopplung aus.
  * *Feedback:* Falsch. Ohne automatische Sensordaten- und Aktorkopplung handelt es sich nach Kritzinger lediglich um ein Digital Model, nicht um einen Digital Twin.
* [ ] (0%) Echtzeitfähigkeit bedeutet in der Simulation immer, dass ein Zeitschritt weniger als eine Mikrosekunde dauert.
  * *Feedback:* Falsch. Echtzeit bedeutet, dass die Rechendauer dt_wall kleiner oder gleich der physikalischen Zeitschrittweite dt_sim ist (bei thermischen Prozessen oft Sekunden).
* [ ] (0%) Nach dem Verkürzungsmerkmal von Stachowiak muss ein Simulationsmodell stets alle Atome des Originals abbilden.
  * *Feedback:* Falsch. Das Verkürzungsmerkmal besagt genau das Gegenteil: Irrelevante Mikroeigenschaften werden für den jeweiligen Zweck bewusst weggelassen.

**Musterherleitung & Gesamt-Feedback:**
**Erklärung:**

Nach Michael Grieves besteht jedes Digital-Twin-System aus der Dreiheit *Physisches Produkt im Realraum*, *Virtuelles Produkt im Digitalraum* und der *bidirektionalen Daten- und Informationsverbindung*. Echtzeitfähigkeit bedeutet dabei nicht „unendlich schnell“, sondern $\Delta t_{\text{Berechnung}} \le \Delta t_{\text{Physik}}$ innerhalb einer garantierten Zeitschranke.

---

#### Frage 3.7: C#-Bug-Diagnose: Integer-Division bei der Farbskalen-Normierung *(multichoice, 1.0 Pkt.)*

Ein Entwickler speichert Temperaturen als ganzzahlige Werte (`int`) und möchte daraus einen kontinuierlichen Farbverlauf zwischen Blau (bei `Tmin = 0`) und Rot (bei `Tmax = 100`) berechnen:

```csharp
int T = 65, Tmin = 0, Tmax = 100;
double u = (T - Tmin) / (Tmax - Tmin);
byte red = (byte)(255 * u);
```
Warum bleibt der Rot-Kanal `red` für alle Temperaturen zwischen `0` und `99` dauerhaft auf dem Wert `0`?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Weil beide Operanden vom Typ int sind, schneidet die Ganzzahldivision den Nachkommateil vor der Zuweisung ab.
  * *Feedback:* Richtig! In C# wird 65 / 100 als reine int-Division zu 0 ausgewertet und erst danach als 0.0 in die double-Variable u geschrieben.
* [ ] (0%) Weil der Datentyp byte in C# nur Werte von -128 bis +127 speichern kann und bei 255 sofort auf 0 überläuft.
  * *Feedback:* Falsch. Der Typ byte ist in C# vorzeichenlos (unsigned 8-Bit) und umfasst exakt den Wertebereich 0 bis 255 (sbyte wäre -128 bis +127).
* [ ] (0%) Weil die Klammern um (T - Tmin) in C# dazu führen, dass der Ausdruck als bitweises XOR ausgewertet wird.
  * *Feedback:* Falsch. Runde Klammern steuern lediglich die Auswertungsreihenfolge; der bitweise XOR-Operator in C# wäre das Zeichen ^.
* [ ] (0%) Weil eine implizite Konvertierung von int nach double in C# grundsätzlich den Wert 0.0 zur Folge hat.
  * *Feedback:* Falsch. Die implizite Konvertierung eines int nach double ist verlustfrei; der Verlust passiert bereits vorher bei der int/int-Division.

**Musterherleitung & Gesamt-Feedback:**
**Fehleranalyse (Ganzzahldivision in C#):**

Da sowohl `(T - Tmin)` als auch `(Tmax - Tmin)` vom Typ `int` sind, führt C# eine Ganzzahldivision durch: `65 / 100` ergibt `0`. Erst dieses Ergebnis wird anschließend implizit in `double u = 0.0` umgewandelt. Abhilfe schafft ein expliziter Cast wie `(double)(T - Tmin) / (Tmax - Tmin)` oder das Teilen durch `100.0`.

---

#### Frage 3.8: Energiediskussion: Symplektischer Euler vs. Expliziter Standard-Euler *(multichoice, 1.0 Pkt.)*

Welche der folgenden Aussagen zum Zeitintegrationsverhalten mechanischer Systeme (z. B. springender Ball oder ungedämpftes Pendel) mit Euler-Verfahren sind **zutreffend**? (Mehrere Antworten möglich)

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Der explizite Standard-Euler führt bei ungedämpften Schwingungen zu einer künstlichen Energiezunahme pro Schritt.
  * *Feedback:* Richtig! Da der Standard-Euler tangential aus den gekrümmten Phasenraum-Trajektorien herausspringt, wächst die Gesamtenergie systematisch an.
* [x] **(50%)** Ohne zeitliche Sub-Step-Interpolation am Boden hängt die Rücksprunghöhe unphysikalisch von der Schrittweite ab.
  * *Feedback:* Richtig! Wird einfach bei y < 0 hart auf y = 0 gesetzt, geht die in der Eindringtiefe steckende Lageenergie je nach zufälliger Phasenlage verloren.
* [ ] (-50%) Das explizite Standard-Euler-Verfahren ist für alle Schrittweiten exakt energieerhaltend und symplektisch.
  * *Feedback:* Falsch! Der Standard-Euler ist nicht symplektisch (erst der semi-implizite Euler v_n+1 -> y_n+1 ist symplektisch).
* [ ] (-50%) Ein Restitutionskoeffizient von e = 0.8 bedeutet, dass nach jedem Bodenaufprall 80 % der Geschwindigkeit verloren gehen.
  * *Feedback:* Falsch! Wegen v_neu = -e * v_alt bleiben bei e = 0,8 genau 80 % der Geschwindigkeit erhalten (nur 20 % gehen verloren).

**Musterherleitung & Gesamt-Feedback:**
**Zusammenfassung (Energieverhalten & Stoßmechanik):**

* Beim expliziten Standard-Euler wächst der Phasenraum-Radius pro Schritt um den Faktor $\sqrt{1 + (\omega \Delta t)^2} > 1$ an (künstliches Aufschaukeln).
* Ohne die lineare Aufprall-Interpolation $\tau = \frac{y_n}{y_n - y_{n+1}}$ führt die zufällige Eindringtiefe $y_{n+1} < 0$ zu sichtbarem Höhen-Jitter beim Springen.

---

### Test 04 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante D)
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_04_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 4.1: 2D-Gitterentwurf: Minimale Maschenweite & Gesamt-Knotenanzahl *(cloze, 2.0 Pkt.)*

Eine quadratische Aluminium-Kühlplatte der Kantenlänge $L_x = L_y = 120\,\text{mm}$ (Temperaturleitfähigkeit $\alpha = 80\,\text{mm}^2/\text{s}$) soll mit einer fest durch den SPS-Zyklus vorgegebenen Zeitschrittweite von $\Delta t = 0{,}05\,\text{s}$ mittels explizitem 2D-Euler-Verfahren (5-Punkt-Stern) numerisch stabil simuliert werden.

a) Wie groß muss die räumliche Maschenweite $\Delta x_{\min}$ (in **mm**) mindestens gewählt werden, damit die 2D-Stabilitätsbedingung gerade noch eingehalten wird?  
Antwort: {1:NUMERICAL:=4.0:0.05#Richtig! Aus s = alpha * dt / dx^2 <= 0,25 folgt dx_min = sqrt(4 * 80 * 0,05) = sqrt(16) = 4,0 mm.~%50%2.828:0.05#Teilpunkte (50 %): Sie haben mit dem 1D-Faktor 2 statt 4 gerechnet (sqrt(8) = 2,83 mm).~%50%16.0:0.1#Teilpunkte (50 %): Sie haben dx^2 = 16 mm^2 berechnet, aber vergessen, am Ende die Quadratwurzel zu ziehen.} mm

b) In wie viele Teilintervalle $N_{\text{seg}} = L_x / \Delta x_{\min}$ wird eine Plattenkante dabei unterteilt?  
Antwort: {1:NUMERICAL:=30:0#Richtig! 120 mm / 4,0 mm = 30 Segmente pro Kante (entspricht 31 * 31 = 961 Gitterknoten inkl. Rändern).~%50%900:0#Teilpunkte (50 %): Sie haben die Fläche 30 * 30 = 900 statt der Kanten-Segmente angegeben.} Segmente


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung (Inverser Gitterentwurf bei festem $\Delta t$):**

1. Umstellen der 2D-Stabilitätsbedingung $s = \frac{\alpha \cdot \Delta t}{\Delta x^2} \le 0{,}25$ nach $\Delta x$:  
$\Delta x \ge \sqrt{4 \cdot \alpha \cdot \Delta t} = \sqrt{4 \cdot 80\,\text{mm}^2/\text{s} \cdot 0{,}05\,\text{s}} = \sqrt{16\,\text{mm}^2} = 4{,}0\,\text{mm}$.

2. Anzahl der Kanten-Segmente:  
$N_{\text{seg}} = \frac{L_x}{\Delta x_{\min}} = \frac{120\,\text{mm}}{4{,}0\,\text{mm}} = 30\,\text{Segmente}$.

---

#### Frage 4.2: Expliziter Euler: Zweischritt-Integration der vertikalen Höhe *(numerical, 1.5 Pkt.)*

Ein Körper wird zum Zeitpunkt $t_0 = 0\,\text{s}$ aus der Ruhe ($v_0 = 0{,}0\,\text{m/s}$) in einer Starthöhe von $y_0 = 20{,}0\,\text{m}$ losgelassen. Er fällt unter dem Einfluss einer konstanten Schwerebeschleunigung von $g = 10{,}0\,\text{m/s}^2$ nach unten (ohne Luftwiderstand).

Berechnen Sie die Höhe $y_2$ (in **Metern**) zum Zeitpunkt $t_2 = 0{,}40\,\text{s}$ nach exakt **zwei Zeitschritten** der Schrittweite $\Delta t = 0{,}20\,\text{s}$ mit dem **expliziten Standard-Euler-Verfahren**.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `19.6` (± `0.01`) → 100%:** Exakt! Schritt 1: y_1 = 20 + 0,2*0 = 20,0 m, v_1 = -2,0 m/s. Schritt 2: y_2 = 20,0 + 0,2*(-2,0) = 19,6 m.
* **Wert `19.2` (± `0.01`) → 50%:** Teilpunkte (50 %): 19,2 m ist die analytische Lösung y(0,4) = 20 - 0,5*10*0,16 = 19,2 m (bzw. Heun), nicht das Ergebnis des expliziten Euler!
* **Wert `18.8` (± `0.01`) → 50%:** Teilpunkte (50 %): 18,8 m entsteht beim semi-impliziten Euler (Schritt 1: 19,6 m, Schritt 2: 18,8 m).

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung (2 Schritte Expliziter Standard-Euler):**

**Schritt 1 ($t_0 = 0 \to t_1 = 0{,}20\,\text{s}$):**  
$y_1 = y_0 + \Delta t \cdot v_0 = 20{,}0 + 0{,}20 \cdot 0{,}0 = 20{,}0\,\text{m}$  
$v_1 = v_0 - \Delta t \cdot g = 0{,}0 - 0{,}20 \cdot 10{,}0 = -2{,}0\,\text{m/s}$.

**Schritt 2 ($t_1 = 0{,}20 \to t_2 = 0{,}40\,\text{s}$):**  
$y_2 = y_1 + \Delta t \cdot v_1 = 20{,}0 + 0{,}20 \cdot (-2{,}0) = 19{,}6\,\text{m}$.  
(Man erkennt hier anschaulich den globalen Diskretisierungsfehler von $0{,}4\,\text{m}$ gegenüber dem exakten Wert $19{,}2\,\text{m}$.)

---

#### Frage 4.3: C#-Code-Tracing: 5-Punkt-Stern Array-Update an einem Gitterknoten *(numerical, 1.5 Pkt.)*

Gegeben sei folgender C#-Codeausschnitt für einen Zeitschritt auf einem $3 \times 3$-Temperaturgitter:

```csharp
double[,] T = {
    { 10.0, 20.0, 10.0 },
    { 40.0, 10.0, 20.0 },
    { 10.0, 30.0, 10.0 }
};
double s = 0.25;
double T_next_1_1 = T[1, 1] + s * (T[0, 1] + T[2, 1] + T[1, 0] + T[1, 2] - 4.0 * T[1, 1]);
```
Welchen exakten Zahlenwert hat die Variable `T_next_1_1` nach der Ausführung?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `27.5` (± `0.01`) → 100%:** Richtig! Bei s = 0,25 kürzt sich T[1,1] heraus: T_next = 0,25 * (20 + 30 + 40 + 20) = 0,25 * 110 = 27,5.
* **Wert `37.5` (± `0.01`) → 50%:** Teilpunkte (50 %): Sie haben vergessen, im Klammerausdruck -4.0 * T[1,1] (= -40) abzuziehen (10 + 0,25 * 110 = 37,5).
* **Wert `17.5` (± `0.01`) → 50%:** Teilpunkte (50 %): Sie haben die Eckknoten (10+10+10+10 = 40) oder einen falschen Nachbarn statt der 4 Kanten-Nachbarn summiert.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

Der Zentralknoten ist `T[1, 1] = 10.0`. Seine vier direkten Nachbarn sind `T[0, 1] = 20.0`, `T[2, 1] = 30.0`, `T[1, 0] = 40.0` und `T[1, 2] = 20.0` (Summe der Nachbarn $= 110{,}0$).

Einsetzen in die Formel liefert:  
`T_next_1_1 = 10.0 + 0.25 * (110.0 - 4.0 * 10.0) = 10.0 + 0.25 * 70.0 = 10.0 + 17.5 = 27.5`.  
*Hinweis:* Im Grenzfall $s = 0{,}25$ ist $T_{i,j}^{n+1}$ stets exakt der arithmetische Mittelwert der vier Nachbarknoten ($110 / 4 = 27{,}5$).

---

#### Frage 4.4: C#-Lückentext: Heun-Verfahren (Prädiktor-Korrektor) im Code *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie die folgende C#-Methode, die eine allgemeine Differentialgleichung $\dot{y} = f(t, y)$ um einen Zeitschritt `dt` mit dem **Heun-Verfahren (RK2)** integriert:

```csharp
double k1 = f(t, y);
double yPred = y + [[1]] * k1;
double k2 = f(t + dt, [[2]]);
double yNext = y + [[3]] * (k1 + k2);
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `dt`
* `[[2]]` (Gruppe 2): `yPred`
* `[[3]]` (Gruppe 3): `0.5 * dt`
* `[[4]]` (Gruppe 1): `0.5 * dt`
* `[[5]]` (Gruppe 1): `dt * dt`
* `[[6]]` (Gruppe 2): `y`
* `[[7]]` (Gruppe 2): `k1`
* `[[8]]` (Gruppe 3): `dt`
* `[[9]]` (Gruppe 3): `2.0 * dt`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung (Heun-Verfahren / Trapezregel):**

* `[[1]] = dt`: Der Prädiktorschritt schätzt den Endwert über einen vollen expliziten Euler-Schritt `y + dt * k1`.
* `[[2]] = yPred`: Die zweite Steigung `k2` wird am Ende des Intervalls mit dem geschätzten Zustand `yPred` ausgewertet.
* `[[3]] = 0.5 * dt`: Der Korrektorschritt mittelt beide Steigungen `0.5 * (k1 + k2)` und multipliziert mit `dt`.

---

#### Frage 4.5: Pipeline-Reihenfolge: Ablauf des zweistufigen Heun-Integrationsschritts *(ddwtos, 1.0 Pkt.)*

Bringen Sie die vier Berechnungsschritte eines einzelnen Zeitschritts beim **Heun-Verfahren (RK2)** in die korrekte mathematisch-algorithmische Ausführungsreihenfolge:

Schritt 1: [[1]]  
Schritt 2: [[2]]  
Schritt 3: [[3]]  
Schritt 4: [[4]]

**Drag-and-Drop-Bausteine (`ddwtos`):**
* `[[1]]` (Gruppe 1): `Anfangssteigung k1 = f(t_n, y_n) am aktuellen Zustand berechnen`
* `[[2]]` (Gruppe 1): `Prädiktor-Zustand y_tilde = y_n + dt * k1 vorhersagen`
* `[[3]]` (Gruppe 1): `Endsteigung k2 = f(t_n + dt, y_tilde) am Prädiktorpunkt auswerten`
* `[[4]]` (Gruppe 1): `Korrektor-Update y_n+1 = y_n + 0.5 * dt * (k1 + k2) durchführen`
* `[[5]]` (Gruppe 1): `Schrittweite dt mit dem Faktor 4 multiplizieren`
* `[[6]]` (Gruppe 1): `Zustandsvektor y_n auf 0 zurücksetzen`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung:**

Das Heun-Verfahren bestimmt zuerst die Tangentensteigung $k_1$ am Startpunkt, führt damit einen provisorischen Euler-Schritt auf $\tilde{y}$ aus (Prädiktor), ermittelt dort die Endsteigung $k_2$ und korrigiert schließlich den Schritt mit dem arithmetischen Mittelwert beider Steigungen.

---

#### Frage 4.6: System-Taxonomie: Einordnung des gedämpften Einmassenschwingers *(multichoice, 1.0 Pkt.)*

Wie wird die klassische Bewegungsgleichung $m\ddot{x}(t) + d\dot{x}(t) + cx(t) = F(t)$ eines Feder-Masse-Dämpfer-Systems in der Systemtheorie klassifiziert?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Es ist ein deterministisches, zeitkontinuierliches Modell mit konzentrierten Parametern (ODE).
  * *Feedback:* Richtig! Die Masse ist in einem Punkt konzentriert (nur Zeitabhängigkeit t -> gewöhnliche DGL / ODE), und der Verlauf ist deterministisch.
* [ ] (0%) Es ist ein zeitdiskretes Modell mit verteilten Parametern auf einem zweidimensionalen Raumgitter.
  * *Feedback:* Falsch. Es gibt hier keine partiellen Ortsableitungen nach x oder y (keine PDE), sondern nur Zeitableitungen.
* [ ] (0%) Es ist ein rein statisches, algebraisches Modell ohne jedes Zeitgedächtnis oder Zustandsgrößen.
  * *Feedback:* Falsch. Durch die erste und zweite Zeitableitung besitzt das System zwei Energiespeicher (Zustände x und v) und ist somit dynamisch.
* [ ] (0%) Es ist ein stochastisches Warteschlangenmodell zur Beschreibung zufälliger Fertigungsprozesse.
  * *Feedback:* Falsch. Alle Koeffizienten m, d, c und F(t) sind deterministisch vorgegeben.

**Musterherleitung & Gesamt-Feedback:**
**Erklärung:**

Systeme, deren Bauteile (Masse $m$, Dämpfer $d$, Feder $c$) räumlich punktförmig zusammengefasst werden, heißen Systeme mit **konzentrierten Parametern** (*lumped-parameter systems*) und führen auf gewöhnliche Differentialgleichungen (ODEs). Systeme mit Ortsableitungen (wie das 2D-Temperaturfeld) heißen dagegen Systeme mit **verteilten Parametern** (PDEs).

---

#### Frage 4.7: C#-Bug-Diagnose: Fehlender AddDirtyRect-Aufruf bei WriteableBitmap *(multichoice, 1.0 Pkt.)*

Eine Entwicklerin aktualisiert in jedem Simulationsschritt den `BackBuffer` eines `WriteableBitmap bmp` mit folgendem C#-Code, sieht aber auf dem Bildschirm dauerhaft nur ein leeres Bild:

```csharp
bmp.Lock();
unsafe {
    uint* p = (uint*)bmp.BackBuffer;
    for (int i = 0; i < width * height; i++) p[i] = 0xFFFF0000;
}
bmp.Unlock();
```
Was ist die Ursache dafür, dass die rote Fläche niemals im WPF-Fenster erscheint?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Zwischen Lock und Unlock fehlt der Aufruf von AddDirtyRect, sodass WPF kein GPU-Update auslöst.
  * *Feedback:* Richtig! Ohne bmp.AddDirtyRect(new Int32Rect(0, 0, width, height)) weiß das WPF-Render-Subsystem nicht, dass sich der BackBuffer geändert hat.
* [ ] (0%) Der Farbwert 0xFFFF0000 besitzt im oberen Byte den Alpha-Wert 0 und ist daher komplett durchsichtig.
  * *Feedback:* Falsch. In 0xFFFF0000 steht das höchste Byte (Alpha) auf 0xFF = 255 (vollständig deckend) und das zweithöchste Byte (Rot) ebenfalls auf 0xFF.
* [ ] (0%) Die Methode Unlock löscht aus Sicherheitsgründen automatisch den gesamten Inhalt des BackBuffers.
  * *Feedback:* Falsch. Unlock hebt lediglich die Sperre auf und übergibt die per AddDirtyRect markierten Regionen an den Render-Thread.
* [ ] (0%) Ein uint*-Pointer darf in C# grundsätzlich nicht innerhalb einer normalen for-Schleife indiziert werden.
  * *Feedback:* Falsch. In einem unsafe-Block unterstützt C# die Zeiger-Indizierung p[i] analog zu Arrays vollkommen regulär.

**Musterherleitung & Gesamt-Feedback:**
**Fehleranalyse:**

Weil der Schreibzugriff über einen unverwalteten Pointer (`uint* p`) direkt im RAM stattfindet, bekommt die WPF-Laufzeitumgebung davon nichts mit. Erst `bmp.AddDirtyRect(new Int32Rect(0, 0, width, height))` markiert den Bereich als geändert („dirty“) und stößt beim anschließenden `bmp.Unlock()` den Kopiervorgang in den FrontBuffer der Grafikkarte an.

---

#### Frage 4.8: Numerik-Vergleich: Expliziter Euler vs. Heun-Verfahren (RK2) *(multichoice, 1.0 Pkt.)*

Welche der folgenden Aussagen zum Vergleich zwischen dem **expliziten Euler-Verfahren** und dem **Heun-Verfahren (RK2)** bei gleicher Zeitschrittweite $\Delta t$ sind **korrekt**? (Mehrere Antworten möglich)

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Das Heun-Verfahren wertet die rechte Seite der Differentialgleichung genau zweimal pro Zeitschritt aus.
  * *Feedback:* Richtig! Einmal für k1 = f(t_n, y_n) und ein zweites Mal für k2 = f(t_n + dt, y_pred).
* [x] **(50%)** Bei einer Zehntelung der Schrittweite sinkt der globale Fehler beim Heun-Verfahren etwa auf ein Hundertstel.
  * *Feedback:* Richtig! Da Heun die globale Konvergenzordnung p = 2 besitzt, skaliert der globale Fehler mit (1/10)^2 = 1/100.
* [ ] (-50%) Das Heun-Verfahren benötigt pro Zeitschritt das Lösen eines nichtlinearen Gleichungssystems mit Newton.
  * *Feedback:* Falsch! Das zweistufige Heun-Verfahren mit explizitem Euler-Prädiktor ist ein rein explizites Runge-Kutta-Verfahren (RK2).
* [ ] (-50%) Das explizite Euler-Verfahren besitzt die globale Fehlerordnung 2, während Heun die globale Ordnung 4 hat.
  * *Feedback:* Falsch! Expliziter Euler hat die globale Ordnung 1 (lokal 2), Heun hat die globale Ordnung 2 (lokal 3).

**Musterherleitung & Gesamt-Feedback:**
**Zusammenfassung:**

Das Heun-Verfahren investiert zwei Funktionsauswertungen pro Zeitschritt und erreicht durch die Trapez-Mittelung der Steigungen $\frac{1}{2}(k_1 + k_2)$ die globale Konvergenzordnung $\mathcal{O}(\Delta t^2)$ statt $\mathcal{O}(\Delta t^1)$ beim einfachen Euler-Verfahren.

---

### Test 05 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante E)
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_05_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 5.1: WriteableBitmap GPU-Alignment: Zeilen-Padding & Puffergröße *(cloze, 2.0 Pkt.)*

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

#### Frage 5.2: Fehleranalyse: Globaler Diskretisierungsfehler des Euler-Verfahrens *(numerical, 1.5 Pkt.)*

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

#### Frage 5.3: C#-Code-Tracing: Explizite Euler-Integrationsschleife *(numerical, 1.5 Pkt.)*

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

#### Frage 5.4: C#-Lückentext: Neumann- und Dirichlet-Randbedingungen setzen *(gapselect, 1.0 Pkt.)*

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

#### Frage 5.5: Konzept-Zuordnung: System-Taxonomie anhand technischer Beispiele *(matching, 1.0 Pkt.)*

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

#### Frage 5.6: Visualisierungs-Architektur: WriteableBitmap vs. WPF-Shape-Objekte *(multichoice, 1.0 Pkt.)*

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

#### Frage 5.7: C#-Bug-Diagnose: Falsche Reihenfolge der Euler-Zustandsaktualisierung *(multichoice, 1.0 Pkt.)*

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

#### Frage 5.8: Gitter-Diskretisierung: Konsequenzen einer räumlichen Gitterverfeinerung *(multichoice, 1.0 Pkt.)*

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

### Test 06 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante F)
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_06_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 6.1: 2D-Wärmeleitung: Stationäres Gleichgewicht & Schritt-Konvergenz *(cloze, 2.0 Pkt.)*

In einem quadratischen 2D-Wärmeraster ($\Delta x = \Delta y$) hat der innere Knoten $(i,j)$ zum Zeitpunkt $n$ die Temperatur $T_{i,j}^n = 50{,}0\,^\circ\text{C}$. Seine vier direkten Nachbarknoten werden konstant auf den Temperaturen $T_{\text{links}} = 80{,}0\,^\circ\text{C}$, $T_{\text{rechts}} = 40{,}0\,^\circ\text{C}$, $T_{\text{oben}} = 60{,}0\,^\circ\text{C}$ und $T_{\text{unten}} = 20{,}0\,^\circ\text{C}$ gehalten.

a) Welchen Wert hat der diskrete 2D-Laplace-Zähler $L = T_{i-1,j}^n + T_{i+1,j}^n + T_{i,j-1}^n + T_{i,j+1}^n - 4 T_{i,j}^n$ (in **°C** bzw. **K**) für diesen Zustand?  
Antwort: {1:NUMERICAL:=0.0:0.01#Richtig! Summe der 4 Nachbarn = 80 + 40 + 60 + 20 = 200 °C; abzüglich 4 * 50 = 200 °C ergibt exakt 0,0 K.~%50%200.0:0.1#Teilpunkte (50 %): 200 °C ist nur die Summe der vier Nachbarn, es fehlt noch die Subtraktion von 4 * T_ij (= 200 °C).~%50%100.0:0.1#Teilpunkte (50 %): Sie haben nur 2 * T_ij statt 4 * T_ij abgezogen.} K

b) Welche Temperatur $T_{i,j}^{n+1}$ (in **°C**) besitzt der Zentralknoten im nächsten Zeitschritt bei einer Stabilitätszahl von $s = 0{,}20$?  
Antwort: {1:NUMERICAL:=50.0:0.05#Richtig! Da der Laplace-Term 0 ist, befindet sich der Knoten exakt im lokalen thermischen Gleichgewicht (harmonische Eigenschaft: Mittelwert der Nachbarn = 200/4 = 50 °C).} °C


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung (Stationäres Gleichgewicht der Laplace-Gleichung):**

1. Summe der vier Nachbarn: $80 + 40 + 60 + 20 = 200\,^\circ\text{C}$.  
Abzüglich $4 \cdot T_{i,j}^n = 4 \cdot 50 = 200\,^\circ\text{C}$ ergibt sich $L = 200 - 200 = 0{,}0\,\text{K}$.

2. Damit folgt unabhängig von $s$: $T_{i,j}^{n+1} = 50{,}0 + 0{,}20 \cdot 0{,}0 = 50{,}0\,^\circ\text{C}$. Im stationären Zustand ($\partial T / \partial t = 0$) ist die Temperatur jedes Knotens exakt der arithmetische Mittelwert seiner vier Nachbarknoten!

---

#### Frage 6.2: Bodenkollision: Rücksprunggeschwindigkeit nach teilelastischem Stoß *(numerical, 1.5 Pkt.)*

Ein fallender Körper hat zu Beginn eines Zeitschritts ($t_n = 0{,}50\,\text{s}$) die Geschwindigkeit $v_n = -8{,}0\,\text{m/s}$ (nach unten). Die lineare Höhen-Interpolation ergibt, dass der Körper nach dem relativen Zeitschrittanteil $\tau = 0{,}50$ eines Zeitschritts der Länge $\Delta t = 0{,}20\,\text{s}$ auf dem Boden aufschlägt (Erdbeschleunigung $g = 10{,}0\,\text{m/s}^2$). Der Boden besitzt den Restitutionskoeffizienten $e = 0{,}80$.

Berechnen Sie die neue vertikale Geschwindigkeit $v_{\text{after}}$ (in **m/s**, positiv nach oben) unmittelbar **nach** der teilelastischen Reflexion am Boden.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `7.2` (± `0.02`) → 100%:** Exakt! v_impact = -8,0 - 10,0 * (0,50 * 0,20) = -9,0 m/s; v_after = -0,80 * (-9,0) = +7,2 m/s.
* **Wert `-7.2` (± `0.02`) → 50%:** Teilpunkte (50 %): Betrag 7,2 m/s ist richtig, aber nach der Reflexion am Boden zeigt die Geschwindigkeit nach oben (+7,2 m/s).
* **Wert `6.4` (± `0.02`) → 50%:** Teilpunkte (50 %): Sie haben mit v_n = -8,0 m/s statt mit der bis zum Aufprall beschleunigten Geschwindigkeit v_impact = -9,0 m/s gerechnet.
* **Wert `8` (± `0.02`) → 50%:** Teilpunkte (50 %): Sie haben über den vollen Zeitschritt dt = 0,20 s (v = -10 m/s -> 8,0 m/s) statt über tau * dt = 0,10 s beschleunigt.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung (Sub-Step-Stoßgesetz):**

1. Bis zum Aufprall vergeht die Teilzeit $\Delta t_{\text{impact}} = \tau \cdot \Delta t = 0{,}50 \cdot 0{,}20\,\text{s} = 0{,}10\,\text{s}$.

2. Aufprallgeschwindigkeit unmittelbar vor dem Bodenkontakt:  
$v_{\text{impact}} = v_n - g \cdot \Delta t_{\text{impact}} = -8{,}0\,\text{m/s} - 10{,}0\,\text{m/s}^2 \cdot 0{,}10\,\text{s} = -9{,}0\,\text{m/s}$.

3. Geschwindigkeit unmittelbar nach dem teilelastischen Stoß:  
$v_{\text{after}} = -e \cdot v_{\text{impact}} = -0{,}80 \cdot (-9{,}0\,\text{m/s}) = +7{,}2\,\text{m/s}$.

---

#### Frage 6.3: C#-Code-Tracing: Rückrechnung der Gitterspalte aus einem 1D-Byte-Offset *(numerical, 1.5 Pkt.)*

Aus einem gegebenen 1D-Byte-Index `byteOffset` in einem `WriteableBitmap` (Format `Bgra32`, 4 Bytes pro Pixel) werden Zeile `y` und Spalte `x` mit folgendem C#-Code zurückgerechnet:

```csharp
int stride = 400; // Bytes pro Zeile
int byteOffset = 830;
int y = byteOffset / stride;
int x = (byteOffset % stride) / 4;
```
Welchen exakten ganzzahligen Wert hat die Spaltenkoordinate `x` nach der Ausführung?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `7` (± `0`) → 100%:** Richtig! 830 % 400 = 30 (Byte-Offset in Zeile 2); 30 / 4 = 7 (Ganzzahldivision in C#, Byte 2 ist der Rot-Kanal von Pixel x = 7).
* **Wert `7.5` (± `0.01`) → 50%:** Teilpunkte (50 %): Sie haben 30 / 4 = 7,5 als Gleitkommazahl berechnet; da beide Operanden int sind, schneidet C# den Nachkommateil zu 7 ab.
* **Wert `30` (± `0`) → 50%:** Teilpunkte (50 %): 30 ist der Byte-Offset innerhalb der Zeile (830 % 400), es fehlt noch die Division durch 4 Bytes pro Pixel.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

1. Zeilenindex: `y = 830 / 400 = 2` (Ganzzahldivision).

2. Byte-Rest innerhalb der Zeile 2: `830 % 400 = 30`.

3. Spaltenindex: `x = 30 / 4 = 7` (Ganzzahldivision; die Bytes 28, 29, 30, 31 gehören alle zu Pixel `x = 7`).

---

#### Frage 6.4: C#-Lückentext: Packen von ARGB-Kanälen in einen 32-Bit-uint *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie die folgende C#-Anweisung, die vier `byte`-Variablen (`alpha`, `red`, `green`, `blue`) auf einem Little-Endian-System zu einem einzigen `uint`-Farbwert für `PixelFormats.Bgra32` zusammenpackt:

```csharp
uint pixel = ((uint)alpha << [[1]])
           | ((uint)red   << [[2]])
           | ((uint)green << [[3]])
           |  (uint)blue;
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `24`
* `[[2]]` (Gruppe 2): `16`
* `[[3]]` (Gruppe 3): `8`
* `[[4]]` (Gruppe 1): `32`
* `[[5]]` (Gruppe 1): `0`
* `[[6]]` (Gruppe 2): `12`
* `[[7]]` (Gruppe 2): `4`
* `[[8]]` (Gruppe 3): `2`
* `[[9]]` (Gruppe 3): `1`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung (Little-Endian Bgra32 uint-Packing):**

Auf Little-Endian-CPUs liegt das niederwertigste Byte (Bits 0..7) an der kleinsten Speicheradresse (Offset +0 = `blue`). `green` (Offset +1) muss um `8` Bits, `red` (Offset +2) um `16` Bits und `alpha` (Offset +3) um `24` Bits nach links verschoben werden.

---

#### Frage 6.5: Pipeline-Reihenfolge: Simulationsschleife des 2D-Wärmerasters *(ddwtos, 1.0 Pkt.)*

Bringen Sie die vier Teilschritte innerhalb eines einzelnen Frames der gekoppelten 2D-Wärmeleitungs- und Visualisierungsschleife in die logisch korrekte Ausführungsreihenfolge:

Schritt 1: [[1]]  
Schritt 2: [[2]]  
Schritt 3: [[3]]  
Schritt 4: [[4]]

**Drag-and-Drop-Bausteine (`ddwtos`):**
* `[[1]]` (Gruppe 1): `Innere Knoten mit 5-Punkt-Stern aus T in T_next berechnen`
* `[[2]]` (Gruppe 1): `Randbedingungen (Dirichlet / Neumann) auf T_next anwenden`
* `[[3]]` (Gruppe 1): `Zustandspuffer tauschen bzw. T_next nach T kopieren`
* `[[4]]` (Gruppe 1): `Temperaturen T in Bgra32-Farben umrechnen und in BackBuffer schreiben`
* `[[5]]` (Gruppe 1): `Gitterweite dx durch Null teilen`
* `[[6]]` (Gruppe 1): `UI-Thread mit Thread.Sleep(5000) blockieren`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung des Simulationszyklus:**

Zuerst werden alle inneren Gitterpunkte aus dem alten Zustand `T` nach `T_next` integriert, anschließend werden die Ränder von `T_next` gemäß Randbedingungen aktualisiert. Nach dem Puffer-Tausch (`T_next → T`) ist der neue Zeitschritt vollständig und wird als Falschfarbenbild in den `BackBuffer` gerendert.

---

#### Frage 6.6: Partielle Differentialgleichungen: Bedeutung der Temperaturleitfähigkeit *(multichoice, 1.0 Pkt.)*

In der 2D-Wärmeleitungsgleichung $\frac{\partial T}{\partial t} = \alpha \left(\frac{\partial^2 T}{\partial x^2} + \frac{\partial^2 T}{\partial y^2}\right)$ tritt der Materialparameter $\alpha = \frac{\lambda}{\rho \cdot c_p}$ auf. Welche physikalische Aussage über $\alpha$ ist korrekt?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Ein großes alpha bewirkt einen schnellen Temperaturausgleich bei gleichzeitig kleinerer Stabilitätsgrenze dt_max.
  * *Feedback:* Richtig! Hohe Wärmeleitfähigkeit lambda und geringe Wärmekapazität rho*c_p beschleunigen die Diffusion, verkleinern aber dt_max = dx^2 / (4*alpha).
* [ ] (0%) Die Größe alpha besitzt die SI-Einheit Watt pro Kelvin und hängt nur von der Bauteilmasse ab.
  * *Feedback:* Falsch. Die Temperaturleitfähigkeit alpha hat die Einheit m^2/s (bzw. mm^2/s) und ist eine reine Materialkonstante.
* [ ] (0%) Ein großes alpha bedeutet, dass das Material Wärme extrem schlecht leitet und perfekt isoliert.
  * *Feedback:* Falsch. Da die Wärmeleitfähigkeit lambda im Zähler steht, haben gute Wärmeleiter (wie Kupfer oder Silber) ein besonders großes alpha.
* [ ] (0%) Der Parameter alpha verändert nur die stationäre Endtemperatur, nicht aber die Geschwindigkeit des Ausgleichs.
  * *Feedback:* Falsch. Im stationären Zustand (dT/dt = 0) kürzt sich alpha aus der Laplace-Gleichung heraus; alpha bestimmt ausschließlich die Ausgleichsgeschwindigkeit!

**Musterherleitung & Gesamt-Feedback:**
**Physikalische Interpretation:**

Die Temperaturleitfähigkeit $\alpha = \frac{\lambda}{\rho c_p}$ (Einheit $\text{m}^2/\text{s}$) setzt das Wärmeleitvermögen $\lambda$ ins Verhältnis zur volumetrischen Wärmespeicherfähigkeit $\rho c_p$. Je größer $\alpha$ ist, desto rascher breiten sich Temperaturfronten aus und desto kleiner muss $\Delta t_{\max} = \frac{\Delta x^2}{4\alpha}$ gewählt werden.

---

#### Frage 6.7: C#-Bug-Diagnose: Array-Grenzüberschreitung am Plattenrand *(multichoice, 1.0 Pkt.)*

Ein Student programmiert die räumliche Schleife für den 5-Punkt-Stern auf einem 2D-Array `double[,] T = new double[nx, ny]` wie folgt:

```csharp
for (int y = 0; y < ny; y++)
    for (int x = 0; x < nx; x++)
        T_next[x, y] = T[x, y] + s * (T[x-1, y] + T[x+1, y] + T[x, y-1] + T[x, y+1] - 4 * T[x, y]);
```
Welcher Laufzeitfehler tritt beim Start dieser Methode sofort im ersten Schleifendurchlauf (`x = 0, y = 0`) auf?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Der Zugriff auf T[x-1, y] versucht den negativen Index -1 zu lesen und wirft eine IndexOutOfRangeException.
  * *Feedback:* Richtig! Für x = 0 ist x - 1 = -1 (und am oberen Ende für x = nx - 1 ist x + 1 = nx); die Innenschleife darf nur von 1 bis nx - 2 laufen.
* [ ] (0%) C# interpretiert den Index -1 automatisch als periodische Randbedingung und liest den rechten Rand nx - 1.
  * *Feedback:* Falsch. Anders als Python unterstützt die reguläre Array-Indizierung in C# keine negativen Wrap-Around-Indizes, sondern prüft streng auf >= 0.
* [ ] (0%) Das zweidimensionale Array T_next wird durch die Schleife automatisch um zwei Zeilen und Spalten vergrößert.
  * *Feedback:* Falsch. Arrays haben in C# eine feste Größe; ein Schreib- oder Lesezugriff außerhalb von 0..Length-1 führt sofort zu einer Exception.
* [ ] (0%) Der Compiler verweigert die Übersetzung, weil die Schleifenvariablen x und y nicht vom Typ double sind.
  * *Feedback:* Falsch. Array-Indizes müssen in C# ganzzahlig (z. B. int) sein; double-Indizes wären gar nicht kompilierbar.

**Musterherleitung & Gesamt-Feedback:**
**Fehleranalyse (Innere Knoten vs. Randknoten):**

Da der 5-Punkt-Stern auf `x - 1`, `x + 1`, `y - 1` und `y + 1` zugreift, darf er ausschließlich auf den **inneren Gitterknoten** (`x = 1 ... nx - 2` und `y = 1 ... ny - 2`) ausgeführt werden. Die Randknoten bei `0` und `nx - 1` bzw. `ny - 1` werden separat über die Randbedingungen gesetzt.

---

#### Frage 6.8: Digital-Twin-Reifegrade: Unterscheidung nach Kritzinger et al. *(multichoice, 1.0 Pkt.)*

Welche der folgenden Aussagen zur Klassifikation von *Digital Model*, *Digital Shadow* und *Digital Twin* nach Kritzinger et al. sind **korrekt**? (Mehrere Antworten möglich)

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Beim Digital Shadow fließen Sensordaten automatisch in das Modell, aber es gibt keinen automatischen Rückeingriff.
  * *Feedback:* Richtig! Ein Digital Shadow spiegelt den Zustand der realen Anlage in Echtzeit wider (One-Way-Automatisierung), steuert sie aber nicht selbsttätig.
* [x] **(50%)** Erst beim Digital Twin existiert ein vollautomatischer Datenfluss in beide Richtungen zwischen Realität und Modell.
  * *Feedback:* Richtig! Der Digital Twin schließt den Regelkreis: Sensordaten aktualisieren das Modell, und das Modell greift automatisch auf die reale Anlage zurück.
* [ ] (-50%) Ein reines Offline-Simulationsmodell ohne Live-Anbindung wird bei Kritzinger bereits als Digital Twin bezeichnet.
  * *Feedback:* Falsch! Ein Modell mit rein manuellem Datenaustausch ist nach Kritzinger lediglich ein Digital Model, noch kein Digital Twin.
* [ ] (-50%) Der Unterschied zwischen Digital Shadow und Digital Twin liegt ausschließlich in der Auflösung des Monitors.
  * *Feedback:* Falsch! Das Unterscheidungskriterium bei Kritzinger et al. ist ausschließlich der Automatisierungsgrad des bidirektionalen Datenflusses.

**Musterherleitung & Gesamt-Feedback:**
**Zusammenfassung (Kritzinger-Reifegrade):**

Kritzinger et al. (2018) unterscheiden strikt nach dem Grad der Datenintegration: 1. **Digital Model** (beide Richtungen manuell), 2. **Digital Shadow** (Physisch → Digital automatisch, Rückweg manuell), 3. **Digital Twin** (beide Richtungen vollautomatisch gekoppelt).

---

### Test 07 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante G)
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_07_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 7.1: 2D-Wärmeleitung: Rückrechnung der Temperaturleitfähigkeit & Grenzschrittweite *(cloze, 2.0 Pkt.)*

In einer 2D-Wärmeleitungssimulation mit der Maschenweite $\Delta x = \Delta y = 3{,}0\,\text{mm}$ und der eingestellten Zeitschrittweite $\Delta t = 0{,}05\,\text{s}$ beträgt die dimensionslose Stabilitätszahl aktuell exakt $s = 0{,}20$.

a) Wie groß ist die im Modell hinterlegte Temperaturleitfähigkeit $\alpha$ des Materials in **$\text{mm}^2/\text{s}$**?  
Antwort: {1:NUMERICAL:=36.0:0.1#Richtig! Aus s = alpha * dt / dx^2 folgt alpha = s * dx^2 / dt = 0,20 * 9,0 / 0,05 = 1,8 / 0,05 = 36,0 mm^2/s.~%50%12.0:0.1#Teilpunkte (50 %): Sie haben mit dx = 3 statt mit dx^2 = 9 gerechnet (0,20 * 3 / 0,05 = 12).} $\text{mm}^2/\text{s}$

b) Auf welchen Maximalwert $\Delta t_{\max}$ (in **Millisekunden (ms)**) dürfte die Zeitschrittweite bei diesem Gitter und Material höchstens erhöht werden, bevor Instabilität ($s > 0{,}25$) eintritt?  
Antwort: {1:NUMERICAL:=62.5:0.2#Richtig! dt_max = dx^2 / (4 * alpha) = 9,0 / (4 * 36,0) = 9 / 144 = 0,0625 s = 62,5 ms (bzw. 0,05 s * (0,25 / 0,20) = 62,5 ms).~%50%0.0625:0.001#Teilpunkte (50 %): Zahlenwert in Sekunden statt in Millisekunden (ms) angegeben.~%50%125.0:0.5#Teilpunkte (50 %): Sie haben die 1D-Stabilitätsgrenze s = 0,50 statt der 2D-Grenze s = 0,25 angesetzt.} ms


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

1. Auflösen von $s = \frac{\alpha \cdot \Delta t}{\Delta x^2}$ nach $\alpha$:  
$\alpha = \frac{s \cdot \Delta x^2}{\Delta t} = \frac{0{,}20 \cdot (3{,}0\,\text{mm})^2}{0{,}05\,\text{s}} = \frac{1{,}8}{0{,}05}\,\text{mm}^2/\text{s} = 36{,}0\,\text{mm}^2/\text{s}$.

2. Da $s$ proportional zu $\Delta t$ ist, erreicht $s$ den Grenzwert $0{,}25$ bei:  
$\Delta t_{\max} = \Delta t \cdot \frac{0{,}25}{0{,}20} = 50\,\text{ms} \cdot 1{,}25 = 62{,}5\,\text{ms}$.

---

#### Frage 7.2: Expliziter Euler: Relaxation eines geregelten Antriebs 1. Ordnung *(numerical, 1.5 Pkt.)*

Die Drehzahlregelung eines Antriebs wird durch die Differentialgleichung 1. Ordnung $\dot{v}(t) = 5{,}0\,\text{s}^{-1} \cdot (v_{\text{soll}} - v(t))$ mit dem Sollwert $v_{\text{soll}} = 10{,}0\,\text{m/s}$ und dem Startwert $v_0 = 0{,}0\,\text{m/s}$ beschrieben.

Berechnen Sie die Geschwindigkeit $v_2$ (in **m/s**) nach exakt **zwei Zeitschritten** der Schrittweite $\Delta t = 0{,}10\,\text{s}$ (also bei $t_2 = 0{,}20\,\text{s}$) mit dem **expliziten Euler-Verfahren**.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `7.5` (± `0.01`) → 100%:** Exakt! Schritt 1: v_1 = 0 + 0,1 * 5 * (10 - 0) = 5,0 m/s. Schritt 2: v_2 = 5,0 + 0,1 * 5 * (10 - 5,0) = 5,0 + 2,5 = 7,5 m/s.
* **Wert `5` (± `0.01`) → 50%:** Teilpunkte (50 %): 5,0 m/s ist der Zwischenwert v_1 nach nur einem Zeitschritt (t_1 = 0,10 s), gefragt war aber v_2 nach zwei Schritten.
* **Wert `10` (± `0.01`) → 50%:** Teilpunkte (50 %): Sie haben im zweiten Schritt erneut mit der Anfangssteigung 50 m/s^2 statt mit der reduzierten Steigung 5 * (10 - 5) = 25 m/s^2 gerechnet.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

**Schritt 1 ($t_0 = 0 \to t_1 = 0{,}10\,\text{s}$):**  
$\dot{v}_0 = 5{,}0 \cdot (10{,}0 - 0{,}0) = 50{,}0\,\text{m/s}^2$  
$v_1 = v_0 + \Delta t \cdot \dot{v}_0 = 0{,}0 + 0{,}10 \cdot 50{,}0 = 5{,}0\,\text{m/s}$.

**Schritt 2 ($t_1 = 0{,}10 \to t_2 = 0{,}20\,\text{s}$):**  
$\dot{v}_1 = 5{,}0 \cdot (10{,}0 - 5{,}0) = 25{,}0\,\text{m/s}^2$  
$v_2 = v_1 + \Delta t \cdot \dot{v}_1 = 5{,}0 + 0{,}10 \cdot 25{,}0 = 7{,}5\,\text{m/s}$.

---

#### Frage 7.3: C#-Code-Tracing: Neumann-Randbedingung + 5-Punkt-Stern am Randnachbarn *(numerical, 1.5 Pkt.)*

In einer 1D-Scheibe eines Wärmegitters wird zuerst der linke Rand `T[0]` isoliert (homogene Neumann-Randbedingung) und unmittelbar danach der Knoten `T[1]` aktualisiert:

```csharp
double[] T = { 0.0, 20.0, 60.0 };
double s = 0.25;
T[0] = T[1]; // Isolierter Neumann-Rand links
double T1_next = T[1] + s * (T[0] + T[2] - 2.0 * T[1]);
```
Welchen exakten Zahlenwert hat die Variable `T1_next` nach der Ausführung?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `30` (± `0.01`) → 100%:** Richtig! Durch T[0] = T[1] = 20.0 wird T1_next = 20 + 0,25 * (20 + 60 - 40) = 20 + 0,25 * 40 = 30,0.
* **Wert `25` (± `0.01`) → 50%:** Teilpunkte (50 %): Sie haben für T[0] noch den alten Startwert 0.0 statt des kopierten Neumann-Wertes T[0] = 20.0 eingesetzt (20 + 0,25 * 20 = 25).
* **Wert `40` (± `0.01`) → 50%:** Teilpunkte (50 %): Sie haben s = 0,50 statt s = 0,25 gerechnet.

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

1. Die Zuweisung `T[0] = T[1];` setzt `T[0]` von `0.0` auf `20.0` (kein Temperaturgradient zwischen Index 0 und Index 1).

2. Damit lautet die Klammer: `T[0] + T[2] - 2.0 * T[1] = 20.0 + 60.0 - 2.0 * 20.0 = 40.0`.

3. Multipliziert mit `s = 0.25` ergibt sich `T1_next = 20.0 + 0.25 * 40.0 = 30.0`.

---

#### Frage 7.4: C#-Lückentext: Vollständiger WriteableBitmap-Update-Rahmen *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie den Methodenrahmen zur sicheren Aktualisierung eines `WriteableBitmap bmp` der Breite `w` und Höhe `h`:

```csharp
bmp.[[1]]();
try
{
    WriteHeatmapPixels(bmp.BackBuffer, bmp.BackBufferStride, w, h);
    bmp.[[2]](new Int32Rect(0, 0, w, h));
}
finally
{
    bmp.[[3]]();
}
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `Lock`
* `[[2]]` (Gruppe 2): `AddDirtyRect`
* `[[3]]` (Gruppe 3): `Unlock`
* `[[4]]` (Gruppe 1): `BeginInit`
* `[[5]]` (Gruppe 1): `Freeze`
* `[[6]]` (Gruppe 2): `WritePixels`
* `[[7]]` (Gruppe 2): `ClearRect`
* `[[8]]` (Gruppe 3): `EndInit`
* `[[9]]` (Gruppe 3): `Dispose`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung:**

Das Muster `bmp.Lock()` → `try { ... bmp.AddDirtyRect(...); }` → `finally { bmp.Unlock(); }` stellt sicher, dass der unverwaltete Speicherpuffer auch im Falle einer Exception zuverlässig wieder entsperrt wird.

---

#### Frage 7.5: Konzept-Zuordnung: Numerische Verfahren & Stabilitätsbegriffe *(matching, 1.0 Pkt.)*

Ordnen Sie die folgenden Charakteristika dem jeweils passenden numerischen Konzept aus Kapitel 01 und 02 zu. Beachten Sie die zwei Überhang-Distraktoren.

**Zuordnungspaare & Überhang-Distraktoren (`matching`):**
* Einstufiges Verfahren 1. Ordnung, das nur die Tangente am aktuellen Zeitpunkt t_n auswertet. $\to$ **Explizites Standard-Euler-Verfahren**
* Zweistufiges Verfahren 2. Ordnung, das den Mittelwert aus Start- und Prädiktor-Steigung bildet. $\to$ **Heun-Verfahren (Runge-Kutta 2. Ordnung)**
* Modifiziertes Euler-Verfahren, das zuerst v_n+1 berechnet und damit y_n+1 energieerhaltend fortschreibt. $\to$ **Semi-implizites (symplektisches) Euler-Verfahren**
* Bedingung s <= 0,25, die verhindert, dass sich Fehler im expliziten 2D-Wärmegitter aufschaukeln. $\to$ **2D-Von-Neumann- / CFL-Stabilitätsbedingung**
* *(Überhang-Distraktor)* $\to$ Cholesky-Matrixfaktorisierung für statische Fachwerke
* *(Überhang-Distraktor)* $\to$ Ereignisdiskrete Warteschlangen-Simulation (Kendall)

**Musterherleitung & Gesamt-Feedback:**
**Zusammenfassung:**

* **Standard-Euler:** $y_{n+1} = y_n + \Delta t f(t_n, y_n)$, Ordnung 1.
* **Heun (RK2):** Prädiktor-Korrektor-Verfahren, Ordnung 2.
* **Symplektischer Euler:** Nutzt $v_{n+1}$ für das Orts-Update $y_{n+1}$ und erhält das Phasenraumvolumen bei Hamilton-Systemen.
* **2D-Stabilitätsgrenze:** $s = \frac{\alpha \Delta t}{\Delta x^2} \le 0{,}25$.

---

#### Frage 7.6: Physikalische Modellierung: Bedeutung eines Neumann-Randes an einer Symmetrieachse *(multichoice, 1.0 Pkt.)*

Eine rechteckige Platte ist geometrisch und thermisch exakt spiegelsymmetrisch zu ihrer vertikalen Mittellinie. Um Rechenzeit zu sparen, soll nur die linke Plattenhälfte simuliert werden. Welche Randbedingung muss dafür entlang der vertikalen Symmetrielinie angesetzt werden?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Eine homogene Neumann-Randbedingung (dT/dx = 0), da aus Symmetriegründen kein Wärmestrom die Mitte kreuzt.
  * *Feedback:* Richtig! Wegen T(-x) = T(+x) verschwindet an der Symmetrieachse die horizontale Ableitung dT/dx = 0, was exakt einer adiabaten Neumann-Wand entspricht.
* [ ] (0%) Eine Dirichlet-Randbedingung mit T = 0 °C, weil sich die Wärmeströme in der Plattenmitte zu Null addieren.
  * *Feedback:* Falsch. An der Symmetrieachse ist der Wärmestrom (die Ableitung dT/dx) gleich Null, nicht aber die Temperatur T selbst!
* [ ] (0%) Eine zufällig schwankende Temperaturvorgabe, um die fehlende rechte Plattenhälfte statistisch zu ersetzen.
  * *Feedback:* Falsch. Das Wärmeleitungsproblem ist rein deterministisch; Zufallswerte würden die physikalische Lösung verfälschen.
* [ ] (0%) Gar keine Randbedingung, sodass der 5-Punkt-Stern am rechten Rand einfach auf nicht existente Indizes zugreift.
  * *Feedback:* Falsch. Jeder Rand eines diskreten Rechengebiets benötigt eine wohldefinierte Randbedingung, sonst entsteht eine IndexOutOfRangeException.

**Musterherleitung & Gesamt-Feedback:**
**Symmetrie-Ausnutzung in der Simulation:**

An einer Spiegelsymmetrieebene ist das Temperaturprofil links und rechts identisch, sodass kein Netto-Wärmestrom über die Symmetrielinie fließt ($\dot{q}_x = -\lambda \frac{\partial T}{\partial x} = 0$). Eine Symmetrieebene wird daher numerisch exakt wie eine perfekt wärmegedämmte Wand über eine homogene Neumann-Randbedingung ($T_{\text{Rand}} = T_{\text{Nachbar}}$) abgebildet.

---

#### Frage 7.7: C#-Bug-Diagnose: Referenz-Aliasing statt echtem Double-Buffering *(multichoice, 1.0 Pkt.)*

Um sich nach dem 2D-Wärmeleitungsschritt den Aufruf von `Array.Copy(T_next, T, T.Length)` zu sparen, schreibt ein Student am Ende der Zeitschritt-Methode einfach:

```csharp
// Am Ende von Step():
T = T_next;
```
Welcher schwerwiegende Fehler entsteht dadurch ab dem **zweiten** Zeitschritt?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Beide Variablen zeigen danach auf dasselbe Array-Objekt im Heap, sodass ab Schritt 2 in-place überschrieben wird.
  * *Feedback:* Richtig! T = T_next kopiert nur die Speicherreferenz; ab dem nächsten Schritt zeigen T und T_next auf denselben Speicherblock (für einen echten Swap bräuchte man (T, T_next) = (T_next, T)).
* [ ] (0%) In C# ist die Zuweisung einer Array-Variablen an eine andere syntaktisch verboten und kompiliert nicht.
  * *Feedback:* Falsch. Arrays sind in C# Referenztypen; die Zuweisung T = T_next ist syntaktisch völlig legal, erzeugt aber das gefährliche Referenz-Aliasing.
* [ ] (0%) Der Garbage Collector löscht durch diese Zeile sofort beide Arrays noch während des laufenden Schritts.
  * *Feedback:* Falsch. Solange eine aktive Variable (T und T_next) auf das zweite Array verweist, wird dieses Array niemals vom Garbage Collector freigegeben.
* [ ] (0%) Die Zuweisung T = T_next setzt alle gespeicherten Temperaturwerte im Array automatisch auf 0.0 zurück.
  * *Feedback:* Falsch. Eine Referenz-Zuweisung verändert keine Array-Inhalte, sondern biegt lediglich den Zeiger T auf das Objekt von T_next um.

**Musterherleitung & Gesamt-Feedback:**
**Fehleranalyse (Referenz-Aliasing vs. Pointer-Swap):**

Da Arrays in C# Referenztypen sind, bewirkt `T = T_next;`, dass beide Variablen auf **exakt dasselbe Array im Heap** verweisen (das ursprüngliche `T`-Array geht verloren). Im nächsten Zeitschritt liest und schreibt der Code somit im selben Array! Möchte man `Array.Copy` durch einen schnellen Referenztausch ersetzen, muss man beide Referenzen dreieckstauschen: `(T, T_next) = (T_next, T);`.

---

#### Frage 7.8: Speicher- & Farbarchitektur: Eigenschaften von PixelFormats.Bgra32 *(multichoice, 1.0 Pkt.)*

Welche der folgenden Aussagen zum Pixelformat `PixelFormats.Bgra32` in WPF und dessen Adressierung auf x86/x64-Prozessoren (Little-Endian) sind **korrekt**? (Mehrere Antworten möglich)

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Beim Zugriff über einen byte*-Pointer liegt der Blau-Kanal am Offset +0 und der Alpha-Kanal am Offset +3.
  * *Feedback:* Richtig! Der Name Bgra32 gibt exakt die Byte-Reihenfolge im Speicher an: Byte 0 = B, Byte 1 = G, Byte 2 = R, Byte 3 = A.
* [x] **(50%)** Beim Schreiben als 32-Bit-uint repräsentiert das Hex-Literal 0xFFFF0000 ein voll deckendes rotes Pixel.
  * *Feedback:* Richtig! Wegen Little-Endian landet das höchste Byte 0xFF an Offset +3 (Alpha = 255) und das zweithöchste Byte 0xFF an Offset +2 (Rot = 255).
* [ ] (-50%) Jeder einzelne Farbkanal (B, G, R, A) wird in Bgra32 als 32-Bit-Gleitkommazahl (float) gespeichert.
  * *Feedback:* Falsch! Die 32 im Namen Bgra32 steht für 32 Bit pro gesamtem Pixel (also 4 Kanäle zu je 8 Bit = 1 Byte), nicht für 32 Bit pro Kanal.
* [ ] (-50%) Ein Alpha-Kanalwert von 0 bewirkt in WPF, dass das Pixel mit maximaler Leuchtkraft dargestellt wird.
  * *Feedback:* Falsch! Alpha = 0 bedeutet 0 % Deckkraft (vollständig transparent), während Alpha = 255 für volle Sichtbarkeit steht.

**Musterherleitung & Gesamt-Feedback:**
**Zusammenfassung:**

In `Bgra32` belegt jedes Pixel $4\,\text{Bytes} = 32\,\text{Bit}$. Im Speicher folgen aufeinander: `[B, G, R, A]`. Liest oder schreibt man diese 4 Bytes auf einer Little-Endian-CPU als einzelnen `uint`, kehrt sich die Wertigkeitsreihenfolge zu `0xAARRGGBB` um.

---

### Test 08 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante H)
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_08_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 8.1: 2D-Wärmeleitung: Gitterverfeinerung & Rechenzeitfaktor *(cloze, 2.0 Pkt.)*

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

#### Frage 8.2: Kinematik: Zweischritt-Euler eines vertikal nach oben geworfenen Körpers *(numerical, 1.5 Pkt.)*

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

#### Frage 8.3: C#-Code-Tracing: Zeiger-Arithmetik mit uint* vs. byte* *(numerical, 1.5 Pkt.)*

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

#### Frage 8.4: C#-Lückentext: Lineare Farbinterpolation (Lerp) mit Math.Clamp *(gapselect, 1.0 Pkt.)*

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

#### Frage 8.5: Pipeline-Reihenfolge: Ereignisbehandlung beim Bodenaufprall (Hybrid-Step) *(ddwtos, 1.0 Pkt.)*

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

#### Frage 8.6: Räumliche Diskretisierung: Fehlerordnung des zentralen Differenzenquotienten *(multichoice, 1.0 Pkt.)*

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

#### Frage 8.7: C#-Bug-Diagnose: Byte-Überlauf ohne Begrenzung (Clamping) bei Heatmap *(multichoice, 1.0 Pkt.)*

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

#### Frage 8.8: Modelltheorie: Die drei Hauptmerkmale des allgemeinen Modellbegriffs nach Stachowiak *(multichoice, 1.0 Pkt.)*

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

### Test 09 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante I)
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_09_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 9.1: 2D-Wärmeleitung: Adiabate Neumann-Ecke & 5-Punkt-Stern-Update *(cloze, 2.0 Pkt.)*

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

#### Frage 9.2: Bodenkollision: Berechnung des relativen Teilzeitschritts tau *(numerical, 1.5 Pkt.)*

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

#### Frage 9.3: C#-Code-Tracing: 1D-Array-Indexierung eines 2D-Gitters (Row-Major) *(numerical, 1.5 Pkt.)*

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

#### Frage 9.4: C#-Lückentext: Berechnung der maximal stabilen Zeitschrittweite *(gapselect, 1.0 Pkt.)*

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

#### Frage 9.5: Konzept-Zuordnung: WPF-Speicherbegriffe rund um WriteableBitmap *(matching, 1.0 Pkt.)*

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

#### Frage 9.6: Anfangswertprobleme: Stationärer Endzustand vs. Anfangsverteilung *(multichoice, 1.0 Pkt.)*

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

#### Frage 9.7: C#-Bug-Diagnose: Falsche Zeilenadressierung bei GPU-Stride-Padding *(multichoice, 1.0 Pkt.)*

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

#### Frage 9.8: unsafe C# & Speichersicherheit: Direkter Pointer-Zugriff in .NET *(multichoice, 1.0 Pkt.)*

Welche der folgenden Aussagen zur Verwendung von `unsafe`-Codeblöcken und Zeigern (`byte*` / `uint*`) bei der `WriteableBitmap`-Programmierung in C# sind **korrekt**? (Mehrere Antworten möglich)

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Für die Übersetzung von unsafe-Blöcken muss in der Projektdatei AllowUnsafeBlocks aktiviert werden.
  * *Feedback:* Richtig! Ohne <AllowUnsafeBlocks>true</AllowUnsafeBlocks> in der .csproj-Datei lehnt der C#-Compiler jeden unsafe-Block ab.
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

### Test 10 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante J)
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_10_Pruefung`  
**Status:** 🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)  

#### Frage 10.1: Echtzeit-Performance: 5-Punkt-Stern-Rechenaufwand & Echtzeitfaktor *(cloze, 2.0 Pkt.)*

Ein quadratisches 2D-Temperaturgitter besteht aus insgesamt $102 \times 102$ Gitterpunkten (davon bildet jeweils 1 Reihe an jedem der vier Ränder den Rand, sodass im Inneren ein Block von $100 \times 100$ inneren Knoten mit dem 5-Punkt-Stern berechnet wird). Pro Sekunde Echtzeit werden genau $50$ explizite Simulationsschritte ausgeführt.

a) Wie viele einzelne innere Knoten-Auswertungen des 5-Punkt-Sterns finden in **einem einzigen Zeitschritt** statt?  
Antwort: {1:NUMERICAL:=10000:0#Richtig! 100 * 100 = 10.000 innere Gitterknoten pro Zeitschritt.~%50%10404:0#Teilpunkte (50 %): Sie haben die Randknoten mitgezählt (102 * 102 = 10.404 statt 100 * 100 = 10.000).} Knoten-Updates

b) Wie viele Millisekunden (**ms**) Wanduhrzeit (Wall-Clock-Time) darf die Berechnung und Visualisierung eines einzelnen Zeitschritts im Mittel **höchstens** dauern, damit die Simulation mit $50\,\text{Schritten/s}$ in Echtzeit Schritt hält?  
Antwort: {1:NUMERICAL:=20.0:0.1#Richtig! 1000 ms / 50 Schritte = 20,0 ms maximales Zeitbudget pro Schritt.~%50%0.02:0.001#Teilpunkte (50 %): Zahlenwert in Sekunden (0,02 s) statt in Millisekunden (20 ms) angegeben.} ms


**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

1. Bei $102 \times 102$ Gesamtknoten entfallen je 2 Knoten pro Raumrichtung auf die Ränder (Index `0` und Index `101`). Es verbleiben $100 \times 100 = 10\,000$ innere Knoten pro Schritt (und $500\,000$ Updates pro Sekunde).

2. Für 50 Schritte pro Sekunde Echtzeit steht pro Schritt ein Zeitbudget von $\Delta t_{\text{wall,max}} = \frac{1000\,\text{ms}}{50} = 20{,}0\,\text{ms}$ zur Verfügung.

---

#### Frage 10.2: Heun-Verfahren (RK2): Vertikaler Fallschritt mit zeitabhängiger Geschwindigkeit *(numerical, 1.5 Pkt.)*

Ein Körper fällt ab $t_0 = 0\,\text{s}$ aus der Ruhe ($v_0 = 0{,}0\,\text{m/s}$) von einer Starthöhe $y_0 = 30{,}0\,\text{m}$ unter konstanter Erdbeschleunigung $g = 10{,}0\,\text{m/s}^2$ nach unten.

Berechnen Sie die neue Höhe $y_1$ (in **Metern**) nach einem Zeitschritt von $\Delta t = 0{,}40\,\text{s}$ mit dem **zweistufigen Heun-Verfahren (RK2)**.

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `29.2` (± `0.02`) → 100%:** Exakt! k1_y = v_0 = 0 m/s; Prädiktor v_pred = -4,0 m/s (= k2_y); Korrektor y_1 = 30,0 + 0,5 * 0,40 * (0 + (-4,0)) = 29,2 m (trifft bei konstanter Beschleunigung exakt die analytische Parabel!).
* **Wert `30` (± `0.02`) → 50%:** Teilpunkte (50 %): 30,0 m ist der Prädiktorwert (expliziter Euler y_pred = 30 + 0,4*0), es fehlt noch der Heun-Korrektorschritt.
* **Wert `28.4` (± `0.02`) → 50%:** Teilpunkte (50 %): Sie haben im Korrektorschritt vergessen, die Summe der Steigungen durch 2 zu teilen (30 - 0,4 * 4,0 = 28,4 m).

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung (Heun-Verfahren beim freien Fall):**

1. **Startsteigungen bei $t_0$:** $k_{1,y} = v_0 = 0{,}0\,\text{m/s}$, $k_{1,v} = -g = -10{,}0\,\text{m/s}^2$.

2. **Prädiktor bei $t_1 = 0{,}40\,\text{s}$:**  
$\tilde{y}_1 = 30{,}0 + 0{,}40 \cdot 0{,}0 = 30{,}0\,\text{m}$, $\tilde{v}_1 = 0{,}0 + 0{,}40 \cdot (-10{,}0) = -4{,}0\,\text{m/s}$.

3. **Endsteigungen am Prädiktorpunkt:** $k_{2,y} = \tilde{v}_1 = -4{,}0\,\text{m/s}$, $k_{2,v} = -10{,}0\,\text{m/s}^2$.

4. **Heun-Korrektor für die Höhe:**  
$y_1 = y_0 + \frac{\Delta t}{2} (k_{1,y} + k_{2,y}) = 30{,}0 + 0{,}20 \cdot (0{,}0 - 4{,}0) = 29{,}2\,\text{m}$.  
*Bemerkung:* Da das Heun-Verfahren die Ordnung 2 besitzt, integriert es quadratische Parabeln ohne jeden Diskretisierungsfehler exakt!

---

#### Frage 10.3: C#-Code-Tracing: Extraktion des Rot-Kanals aus einem Bgra32-uint *(numerical, 1.5 Pkt.)*

Gegeben sei ein gepackter 32-Bit-Farbwert im Format `Bgra32` (Little-Endian `0xAARRGGBB`) sowie folgende Bit-Manipulationszeile in C#:

```csharp
uint packedColor = 0xFFC86432;
byte channel = (byte)((packedColor >> 16) & 0xFF);
```
Welchen **dezimalen** Zahlenwert (Basis 10) hat die Variable `channel` nach der Ausführung?

**Automatische Bewertung & Teilpunkte (`numerical`):**
* **Wert `200` (± `0`) → 100%:** Richtig! >> 16 schiebt das Rot-Byte 0xC8 an die niedrigste Stelle; 0xC8 = 12 * 16 + 8 = 192 + 8 = 200.
* **Wert `100` (± `0`) → 50%:** Teilpunkte (50 %): 100 (0x64) ist der Grün-Kanal bei >> 8, hier wurde aber um 16 Bits nach rechts geschoben (0xC8 = 200).
* **Wert `50` (± `0`) → 50%:** Teilpunkte (50 %): 50 (0x32) ist der Blau-Kanal ohne Bit-Shift (>> 0).

**Musterherleitung & Gesamt-Feedback:**
**Musterherleitung:**

Im Hexadezimalwert `0xFFC86432` stehen die Bytes für: Alpha = `0xFF` (255), Rot = `0xC8` (200), Grün = `0x64` (100), Blau = `0x32` (50). Durch den Rechts-Shift `>> 16` gelangt das Rot-Byte `0xC8` in die untersten 8 Bits. Umrechnung ins Dezimalsystem: $\text{C}_{16} = 12$, also $12 \cdot 16 + 8 = 192 + 8 = 200$.

---

#### Frage 10.4: C#-Lückentext: Symplektischer (semi-impliziter) Euler-Schritt *(gapselect, 1.0 Pkt.)*

Vervollständigen Sie den folgenden C#-Code für einen **semi-impliziten (symplektischen) Euler-Schritt** eines Feder-Masse-Schwingers (Masse `m`, Federsteifigkeit `c`), bei dem zuerst die neue Geschwindigkeit berechnet und unmittelbar danach für das Orts-Update genutzt wird:

```csharp
double a = -(c / m) * [[1]];
v = v + [[2]] * a;
x = x + dt * [[3]];
```

**Dropdown-Optionen (`gapselect`):**
* `[[1]]` (Gruppe 1): `x`
* `[[2]]` (Gruppe 2): `dt`
* `[[3]]` (Gruppe 3): `v`
* `[[4]]` (Gruppe 1): `v`
* `[[5]]` (Gruppe 1): `dt`
* `[[6]]` (Gruppe 2): `x`
* `[[7]]` (Gruppe 2): `0.5`
* `[[8]]` (Gruppe 3): `a`
* `[[9]]` (Gruppe 3): `x`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung (Symplektischer Euler):**

* `[[1]] = x`: Die Rückstellbeschleunigung $a_n = -\frac{c}{m} x_n$ hängt von der aktuellen Auslenkung `x` ab.
* `[[2]] = dt`: Die Geschwindigkeit wird auf $v_{n+1} = v_n + \Delta t \cdot a_n$ aktualisiert.
* `[[3]] = v`: Das Orts-Update $x_{n+1} = x_n + \Delta t \cdot v_{n+1}$ nutzt bereits die neue Geschwindigkeit `v`, wodurch das Verfahren energieerhaltend (symplektisch) wird.

---

#### Frage 10.5: Pipeline-Reihenfolge: Vom realen Prozess zum ausführbaren Simulationsprogramm *(ddwtos, 1.0 Pkt.)*

Bringen Sie die vier typischen Entwicklungsphasen bei der Erstellung einer technischen Computersimulation in die logisch richtige Reihenfolge (vom realen System bis zur Laufzeit-Visualisierung):

Phase 1: [[1]]  
Phase 2: [[2]]  
Phase 3: [[3]]  
Phase 4: [[4]]

**Drag-and-Drop-Bausteine (`ddwtos`):**
* `[[1]]` (Gruppe 1): `Physikalische Systemabgrenzung und Abstraktion (Verkürzung nach Stachowiak)`
* `[[2]]` (Gruppe 1): `Aufstellen der kontinuierlichen Differentialgleichungen (ODE / PDE) und Randbedingungen`
* `[[3]]` (Gruppe 1): `Zeitliche und räumliche Diskretisierung (z. B. Euler-Verfahren, 5-Punkt-Stern, CFL-Prüfung)`
* `[[4]]` (Gruppe 1): `Implementierung in C# mit Double-Buffering und WriteableBitmap-Echtzeit-Rendering`
* `[[5]]` (Gruppe 1): `Löschen aller Randbedingungen zur Vermeidung von Rechenaufwand`
* `[[6]]` (Gruppe 1): `Zufälliges Würfeln der Zeitschrittweite ohne Stabilitätsprüfung`

**Musterherleitung & Gesamt-Feedback:**
**Erklärung des Workflows:**

Jede fundierte Ingenieursimulation beginnt mit der zweckgebundenen Systemabgrenzung (Abstraktion), führt über das mathematisch-physikalische Modell (DGLs + Randbedingungen) zur numerischen Diskretisierung (inklusive Stabilitätsanalyse) und mündet schließlich in die performante Software-Implementierung.

---

#### Frage 10.6: Randbedingungen: Vergleich zwischen Dirichlet- und Neumann-Rand im stationären Fall *(multichoice, 1.0 Pkt.)*

Eine quadratische Metallplatte ohne innere Wärmequellen ist an **allen vier Außenkanten** perfekt thermisch isoliert (rundum homogene Neumann-Randbedingung $\frac{\partial T}{\partial n} = 0$). Zu Beginn hat die linke Plattenhälfte $80\,^\circ\text{C}$ und die rechte Plattenhälfte $20\,^\circ\text{C}$. Welcher Zustand stellt sich nach langer Zeit ($t \to \infty$) ein?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** Die gesamte Platte nähert sich einer räumlich konstanten Mischtemperatur von exakt 50 °C an.
  * *Feedback:* Richtig! Da über die isolierten Ränder keine Wärme entweichen kann, bleibt die mittlere thermische Energie erhalten: (80 + 20) / 2 = 50 °C überall.
* [ ] (0%) Die Temperatur sinkt in der gesamten Platte auf 0 °C ab, weil alle Randableitungen Null sind.
  * *Feedback:* Falsch. Eine Ableitung von Null bedeutet Wärmedämmung (Energieerhaltung), nicht Abkühlung auf 0 °C!
* [ ] (0%) Die linke Hälfte bleibt dauerhaft auf 80 °C und die rechte Hälfte dauerhaft auf 20 °C stehen.
  * *Feedback:* Falsch. Im Inneren der Platte findet weiterhin Wärmeleitung vom heißen zum kalten Bereich statt, bis alle Gradienten ausgeglichen sind.
* [ ] (0%) Die Temperatur wächst in der Plattenmitte unbegrenzt an, weil die Wärme am Rand reflektiert wird.
  * *Feedback:* Falsch. Nach dem 2. Hauptsatz der Thermodynamik (und dem Maximumprinzip der Wärmeleitungsgleichung) kann ohne Quellen kein neuer Maximalwert > 80 °C entstehen.

**Musterherleitung & Gesamt-Feedback:**
**Physikalische Erhaltungseigenschaft bei reinen Neumann-Rändern:**

Ist ein Gebiet rundum adiabat abgeschlossen ($\frac{\partial T}{\partial n} = 0$ auf dem gesamten Rand), kann keine thermische Energie das Gebiet verlassen. Die Wärmeleitung gleicht lediglich die internen Temperaturunterschiede aus, sodass für $t \to \infty$ überall der räumliche Mittelwert der Anfangstemperatur $\bar{T} = \frac{1}{2}(80 + 20) = 50\,^\circ\text{C}$ erreicht wird.

---

#### Frage 10.7: C#-Bug-Diagnose: Fehlender Lock/Unlock-Schutz beim WriteableBitmap-Zugriff *(multichoice, 1.0 Pkt.)*

Ein Entwickler schreibt eine Methode zur Aktualisierung eines `WriteableBitmap bmp`, verzichtet aber vermeintlich zur Optimierung auf die Aufrufe von `bmp.Lock()` und `bmp.Unlock()`:

```csharp
unsafe {
    uint* p = (uint*)bmp.BackBuffer;
    p[0] = 0xFFFFFFFF;
}
bmp.AddDirtyRect(new Int32Rect(0, 0, 1, 1));
```
Wie reagiert WPF zur Laufzeit auf den Aufruf von `bmp.AddDirtyRect(...)` ohne vorheriges `bmp.Lock()`?

**Antwortoptionen (Single-Choice):**
* [x] **(100%)** AddDirtyRect wirft eine InvalidOperationException, weil der BackBuffer zuvor nicht gesperrt wurde.
  * *Feedback:* Richtig! WPF prüft in AddDirtyRect zwingend, ob sich das WriteableBitmap im gesperrten Zustand (Lock) befindet, und wirft andernfalls sofort eine InvalidOperationException.
* [ ] (0%) AddDirtyRect ruft intern automatisch Lock und Unlock auf, sodass der Code problemlos funktioniert.
  * *Feedback:* Falsch. AddDirtyRect führt kein automatisches Locking durch, sondern setzt einen bestehenden Lock-Kontext zwingend voraus.
* [ ] (0%) Der C#-Compiler verweigert bereits zur Übersetzungszeit den Zugriff auf die Eigenschaft BackBuffer.
  * *Feedback:* Falsch. Ob Lock() zuvor aufgerufen wurde, ist eine reine Laufzeiteigenschaft und kann vom C#-Compiler nicht statisch geprüft werden.
* [ ] (0%) Das Pixel wird statt im WriteableBitmap automatisch in der Titelleiste des Windows-Fensters gezeichnet.
  * *Feedback:* Falsch. Es findet kein Zeichnen in fremde Fensterelemente statt, sondern die Laufzeit bricht den Aufruf mit einer InvalidOperationException ab.

**Musterherleitung & Gesamt-Feedback:**
**Fehleranalyse (Lock/Unlock-Vertrag von WriteableBitmap):**

Die Methode `AddDirtyRect` darf laut WPF-Spezifikation ausschließlich zwischen einem `Lock()`- und einem `Unlock()`-Aufruf ausgeführt werden. Wird `AddDirtyRect` auf einem ungesperrten Bitmap aufgerufen, wirft die Methode sofort eine `System.InvalidOperationException` (und ohne Synchronisation mit dem Render-Thread drohen zudem Race-Conditions und Tearing).

---

#### Frage 10.8: Synthese: Zusammenwirken von Modellierung, Numerik und Visualisierung *(multichoice, 1.0 Pkt.)*

Welche der folgenden übergreifenden Aussagen zu den Kernthemen aus Kapitel 00, 01 und 02 (Modellbildung, Zeitintegration und 2D-Pixelvisualisierung) sind **korrekt**? (Mehrere Antworten möglich)

**Antwortoptionen (Multiple-Select):**
* [x] **(50%)** Eine Verkleinerung der Zeitschrittweite dt senkt den Diskretisierungsfehler, erhöht aber die Rechenlast.
  * *Feedback:* Richtig! Kleinere Schritte dt verringern den Abbruchfehler der Taylor-Reihe, erfordern aber mehr Schritte pro Sekunde Simulationszeit.
* [x] **(50%)** Im Grenzfall s = 0,25 wird die neue Temperatur im 5-Punkt-Stern exakt zum Mittelwert der vier Nachbarn.
  * *Feedback:* Richtig! Für s = 0,25 verschwindet der Vorfaktor (1 - 4s) = 0 vor T_ij^n, sodass T_ij^{n+1} = 0,25 * (T_links + T_rechts + T_oben + T_unten) gilt.
* [ ] (-50%) Explizite Zeitintegrationsverfahren sind für jede beliebig große Schrittweite dt garantiert stabil.
  * *Feedback:* Falsch! Explizite Verfahren besitzen ein beschränktes Stabilitätsgebiet (z. B. s <= 0,25 beim 2D-Wärmeraster) und divergieren bei zu großem dt.
* [ ] (-50%) Die Methode Array.Copy tauscht bei zweidimensionalen Arrays in konstanter Zeit O(1) nur die Zeiger.
  * *Feedback:* Falsch! Array.Copy kopiert elementweise den gesamten Speicherblock in O(N); ein Zeigertausch in O(1) erfolgt über Tupel-Zuweisung (T, T_next) = (T_next, T).

**Musterherleitung & Gesamt-Feedback:**
**Gesamtzusammenfassung (Quiz 01):**

* In der Numerik besteht stets der Grundkonflikt zwischen **Genauigkeit / Stabilität** (kleines $\Delta t$, kleines $\Delta x$) und **Echtzeit-Rechenaufwand**.
* Bei $s = 0{,}25$ gilt $1 - 4s = 0$, wodurch der neue Knotenwert genau das arithmetische Mittel seiner vier Nachbarn bildet.
* Für höchste Performance kombiniert man einen echten Pointer-/Referenz-Swap `(T, T_next) = (T_next, T)` in $\mathcal{O}(1)$ mit direktem `unsafe`-Schreibzugriff auf den `BackBuffer` eines `WriteableBitmap`.

---

