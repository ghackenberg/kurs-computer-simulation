# Test 06 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante F)

**Test-ID:** `Test_06_Pruefung`  
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_06_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [T06_Q1]: 2D-Wärmeleitung: Stationäres Gleichgewicht & Schritt-Konvergenz *(cloze, 2.0 Pkt.)*

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

## Frage 2 [T06_Q2]: Bodenkollision: Rücksprunggeschwindigkeit nach teilelastischem Stoß *(numerical, 1.5 Pkt.)*

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

## Frage 3 [T06_Q3]: C#-Code-Tracing: Rückrechnung der Gitterspalte aus einem 1D-Byte-Offset *(numerical, 1.5 Pkt.)*

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

## Frage 4 [T06_Q4]: C#-Lückentext: Packen von ARGB-Kanälen in einen 32-Bit-uint *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [T06_Q5]: Pipeline-Reihenfolge: Simulationsschleife des 2D-Wärmerasters *(ddwtos, 1.0 Pkt.)*

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

## Frage 6 [T06_Q6]: Partielle Differentialgleichungen: Bedeutung der Temperaturleitfähigkeit *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [T06_Q7]: C#-Bug-Diagnose: Array-Grenzüberschreitung am Plattenrand *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [T06_Q8]: Digital-Twin-Reifegrade: Unterscheidung nach Kritzinger et al. *(multichoice, 1.0 Pkt.)*

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
