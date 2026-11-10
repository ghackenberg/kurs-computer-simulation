# Test 03 (Vorbereitung) – Grundlagen, Euler & 2D-Wärmeraster (Variante C)

**Test-ID:** `Test_03_Vorbereitung`  
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_03_Vorbereitung`  
**Status:** 🟢 Vorbereitungstest (Freigegeben zum Üben)

---

## Frage 1 [T03_Q1]: WriteableBitmap Speicherlayout: BackBufferStride & Pufferspeicher *(cloze, 2.0 Pkt.)*

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

## Frage 2 [T03_Q2]: Thermisches RC-Glied: Expliziter Euler vs. Heun-Verfahren (RK2) *(numerical, 1.5 Pkt.)*

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

## Frage 3 [T03_Q3]: C#-Code-Tracing: Lineare Farbinterpolation (Lerp) für Heatmap *(numerical, 1.5 Pkt.)*

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

## Frage 4 [T03_Q4]: C#-Lückentext: Sub-Step-Bodenreflexion mit Restitutionskoeffizient *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [T03_Q5]: Konzept-Zuordnung: Physikalische Randbedingungen der Wärmeleitung *(matching, 1.0 Pkt.)*

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

## Frage 6 [T03_Q6]: Modelltheorie & Echtzeit: Zusammensetzung eines Digitalen Zwillings *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [T03_Q7]: C#-Bug-Diagnose: Integer-Division bei der Farbskalen-Normierung *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [T03_Q8]: Energiediskussion: Symplektischer Euler vs. Expliziter Standard-Euler *(multichoice, 1.0 Pkt.)*

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
