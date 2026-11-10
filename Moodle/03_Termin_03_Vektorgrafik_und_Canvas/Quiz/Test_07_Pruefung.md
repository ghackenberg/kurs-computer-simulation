# Test 07 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante G)

**Test-ID:** `Test_07_Pruefung`  
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_07_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [T07_Q1]: 2D-Wärmeleitung: Rückrechnung der Temperaturleitfähigkeit & Grenzschrittweite *(cloze, 2.0 Pkt.)*

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

## Frage 2 [T07_Q2]: Expliziter Euler: Relaxation eines geregelten Antriebs 1. Ordnung *(numerical, 1.5 Pkt.)*

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

## Frage 3 [T07_Q3]: C#-Code-Tracing: Neumann-Randbedingung + 5-Punkt-Stern am Randnachbarn *(numerical, 1.5 Pkt.)*

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

## Frage 4 [T07_Q4]: C#-Lückentext: Vollständiger WriteableBitmap-Update-Rahmen *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [T07_Q5]: Konzept-Zuordnung: Numerische Verfahren & Stabilitätsbegriffe *(matching, 1.0 Pkt.)*

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

## Frage 6 [T07_Q6]: Physikalische Modellierung: Bedeutung eines Neumann-Randes an einer Symmetrieachse *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [T07_Q7]: C#-Bug-Diagnose: Referenz-Aliasing statt echtem Double-Buffering *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [T07_Q8]: Speicher- & Farbarchitektur: Eigenschaften von PixelFormats.Bgra32 *(multichoice, 1.0 Pkt.)*

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
