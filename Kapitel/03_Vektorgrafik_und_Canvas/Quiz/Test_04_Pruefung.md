# Test 04 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante D)

**Test-ID:** `Test_04_Pruefung`  
**Kategorie:** `$course$/Quiz_01_Termin_03/Test_04_Pruefung`  
**Status:** 🔴 Prüfungstest (Klausurpool)

---

## Frage 1 [T04_Q1]: 2D-Gitterentwurf: Minimale Maschenweite & Gesamt-Knotenanzahl *(cloze, 2.0 Pkt.)*

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

## Frage 2 [T04_Q2]: Expliziter Euler: Zweischritt-Integration der vertikalen Höhe *(numerical, 1.5 Pkt.)*

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

## Frage 3 [T04_Q3]: C#-Code-Tracing: 5-Punkt-Stern Array-Update an einem Gitterknoten *(numerical, 1.5 Pkt.)*

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

## Frage 4 [T04_Q4]: C#-Lückentext: Heun-Verfahren (Prädiktor-Korrektor) im Code *(gapselect, 1.0 Pkt.)*

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

## Frage 5 [T04_Q5]: Pipeline-Reihenfolge: Ablauf des zweistufigen Heun-Integrationsschritts *(ddwtos, 1.0 Pkt.)*

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

## Frage 6 [T04_Q6]: System-Taxonomie: Einordnung des gedämpften Einmassenschwingers *(multichoice, 1.0 Pkt.)*

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

## Frage 7 [T04_Q7]: C#-Bug-Diagnose: Fehlender AddDirtyRect-Aufruf bei WriteableBitmap *(multichoice, 1.0 Pkt.)*

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

## Frage 8 [T04_Q8]: Numerik-Vergleich: Expliziter Euler vs. Heun-Verfahren (RK2) *(multichoice, 1.0 Pkt.)*

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
