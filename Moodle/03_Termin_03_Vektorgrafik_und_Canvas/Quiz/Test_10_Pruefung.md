# Test 10 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante J)

**Test-ID:** `Test_10_Pruefung`  
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_10_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [T10_Q1]: Echtzeit-Performance: 5-Punkt-Stern-Rechenaufwand & Echtzeitfaktor *(cloze, 2.0 Pkt.)*

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

## Frage 2 [T10_Q2]: Heun-Verfahren (RK2): Vertikaler Fallschritt mit zeitabhängiger Geschwindigkeit *(numerical, 1.5 Pkt.)*

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

## Frage 3 [T10_Q3]: C#-Code-Tracing: Extraktion des Rot-Kanals aus einem Bgra32-uint *(numerical, 1.5 Pkt.)*

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

## Frage 4 [T10_Q4]: C#-Lückentext: Symplektischer (semi-impliziter) Euler-Schritt *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [T10_Q5]: Pipeline-Reihenfolge: Vom realen Prozess zum ausführbaren Simulationsprogramm *(ddwtos, 1.0 Pkt.)*

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

## Frage 6 [T10_Q6]: Randbedingungen: Vergleich zwischen Dirichlet- und Neumann-Rand im stationären Fall *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [T10_Q7]: C#-Bug-Diagnose: Fehlender Lock/Unlock-Schutz beim WriteableBitmap-Zugriff *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [T10_Q8]: Synthese: Zusammenwirken von Modellierung, Numerik und Visualisierung *(multichoice, 1.0 Pkt.)*

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
