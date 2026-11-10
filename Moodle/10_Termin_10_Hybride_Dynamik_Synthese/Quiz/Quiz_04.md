# Moodle-Quiz 4 (Zu Beginn von Termin 10): Kontinuierliche DGL-Solver, S-Functions & Diskrete Ereignissimulation

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (FH Oberösterreich, Campus Wels)  
**Prüfungszeitpunkt:** Zu Beginn von Termin 10 (erste 15 Minuten vor dem Theorie-Impuls zu Kapitel 10)  
**Bearbeitungszeit:** 15 Minuten  
**Säule:** Säule 1 (Theoretische & numerische Grundlagen, Gewicht: 7,5 % der Gesamtnote)  
**Prüfungsmodus:** Präsenz im EDV-Labor / Safe Exam Browser in Moodle  
**Zulässige Hilfsmittel:** Taschenrechner (nicht-programmierbar) oder Windows-Rechner; keine LLM-Nutzung / Closed-Book

---

## Didaktische Zielsetzung & Einbettung

Dieses vierte summative Quiz überprüft zu Beginn von Termin 10 nach dem Prinzip der strikten Rückwärts-Kausalität ausschließlich den Stoff der vorangegangenen Termine 08 und 09 (Kapitel 08 und 09): die Zustandsraumdarstellung und numerische Lösung kontinuierlicher Differentialgleichungen (Expliziter Euler, Heun/RK2, klassisches Runge-Kutta-4, Stabilitätsgebiete, S-Functions und Anti-Windup-Regelung) sowie die ereignisdiskrete Simulation (DES, Next-Event-Time-Advance, `PriorityQueue`, Kendall-Notation, zeitgewichtete Statistik, Little's Gesetz und stochastische Zufallszahlengenerierung).

### Stoffabgrenzung & Tabu-Grenzen (Rückwärts-Kausalität)
* **Geprüfte Inhalte (Termin 08 & 09):** Kapitel 08 (Zustandsraumdarstellung 1. Ordnung, Expliziter Euler vs. Heun/RK2 vs. RK4, Butcher-Tableau, lokale vs. globale Fehlerordnung, Stabilitätsgebiete bei ungedämpften Schwingern, Simulink-analoge S-Functions `ComputeDerivatives`/`ComputeOutputs`, Aktor-Sättigung & Anti-Windup Clamping), Kapitel 09 (Diskrete Ereignissimulation DES, Next-Event-Time-Advance, Future Event List via `PriorityQueue`, Kendall-Notation $M/M/1$ & $M/M/c/K$, zeitgewichtetes Flächenintegral `areaUnderL`, Little's Gesetz $\bar{L} = \lambda_{\text{eff}} \bar{W}$, Stochastik mit Inversionsmethode und Box-Muller).
* **Strikte Tabu-Grenzen (ab Termin 10+):**
  - ❌ **KEINE** hybride Zero-Crossing-Bisektion, Schaltfunktionen $z(\mathbf{x}) = 0$, Tunneling bei Stoßkontakten oder Zeno-Kollaps / Chattering (Kapitel 10 – wird erst nach dem Quiz gelehrt!)
  - ❌ **KEIN** FMI-Standard (Model Exchange vs. Co-Simulation) oder Virtuelle Inbetriebnahme VIBN (Kapitel 11)

---

## Fragenübersicht (8 Fragen / 10,0 Punkte)

| Nr. | Thema | Fragentyp | Bloom-Taxonomie | Punkte |
| :---: | :--- | :--- | :---: | :---: |
| **Q4.1** | Warteschlangentheorie ($M/M/1/K$) & Little's Gesetz mit Blockierung | Numerische Berechnung (Freitext `{#...}`) | Anwenden / Berechnen (L3) | 2,0 |
| **Q4.2** | Numerische Integration: Einzelschritt mit dem Heun-Verfahren (RK2) | Numerische Berechnung (Freitext `{#...}`) | Anwenden / Berechnen (L3) | 1,5 |
| **Q4.3** | Code-Tracing: Zeitgewichtetes Flächenintegral (`areaUnderL`) in DES | Code-Tracing (Freitext `{#...}`) | Analysieren / Berechnen (L4) | 1,5 |
| **Q4.4** | ODE-Solver bei Oszillatoren: Expliziter Euler vs. Runge-Kutta-4 (RK4) | Stabilitätsanalyse (Single-Choice, 4 Optionen) | Bewerten / Urteilen (L5) | 1,0 |
| **Q4.5** | S-Functions: Aktor-Sättigung & Anti-Windup (Conditional Integration) | Mechatronische Regelung (Single-Choice, 4 Optionen) | Verstehen / Analysieren (L3) | 1,0 |
| **Q4.6** | Stochastik in DES: Analytische Inversionsmethode für Exponentialverteilung | Stochastik & Code (Single-Choice, 4 Optionen) | Verstehen / Analysieren (L3) | 1,0 |
| **Q4.7** | Zustandsraumtransformation, Butcher-Tableau & Konsistenzordnung | Vernetztes Wissen (Multiple-Select, 4 Optionen) | Verstehen / Differenzieren (L3) | 1,0 |
| **Q4.8** | DES-Architektur (`PriorityQueue`, Next-Event-Time-Advance & Kendall) | Vernetztes Wissen (Multiple-Select, 4 Optionen) | Verstehen / Analysieren (L3) | 1,0 |
| **Gesamt** | **3× Numerisch (5,0 P.) + 3× Single-Choice (3,0 P.) + 2× Multiple-Select (2,0 P.)** | | | **10,0 Pkt.** |

---

## Detaillierte Fragen & Musterlösungen

### Frage 4.1: Warteschlangentheorie ($M/M/1/K$) & Little's Gesetz mit Blockierung (Numerisch – 2,0 Punkte)

#### Fragetext
Eine automatisierte optische Prüfstation in einer Fertigungslinie besitzt einen begrenzten Eingangspuffer und wird im stationären Zustand betrieben. Aus einer Langzeitsimulation sind folgende Betriebskennzahlen bekannt:
* Externe Ankunftsrate der Rohteile am Systemeingang: $\lambda = 30\,\frac{\text{Teile}}{\text{h}}$
* Anteil der wegen vollem Eingangspuffer abgewiesenen (blockierten) Teile: $P_{\text{Block}} = 20\,\% = 0{,}20$
* Mittlere Gesamtdurchlaufzeit eines angenommenen Werkstücks (Wartezeit im Puffer plus Prüfdauer in der Station): $\bar{W} = 10{,}0\,\text{Minuten}$

Berechnen Sie die **zeitlich gemittelte Anzahl an Werkstücken $\bar{L}$ im Gesamtsystem** (Warteschlange plus Prüfstation).  
*(Geben Sie die mittlere Teileanzahl als Dezimalzahl ohne Einheit ein, z. B. `5.5`)*

#### Antwortwert
* **Musterlösung:** `4.0` (akzeptierter Toleranzbereich: `3.9` bis `4.1`)

#### Mathematische Herleitung & Didaktik
1. **Effektive Ankunftsrate $\lambda_{\text{eff}}$ (Durchsatz der tatsächlich in das System aufgenommenen Teile):**
   $$\lambda_{\text{eff}} = \lambda \cdot (1 - P_{\text{Block}}) = 30\,\frac{\text{Teile}}{\text{h}} \cdot (1 - 0{,}20) = 24\,\frac{\text{Teile}}{\text{h}}$$
2. **Umrechnung der mittleren Verweildauer $\bar{W}$ in Stunden:**
   $$\bar{W} = 10{,}0\,\text{Minuten} = \frac{10}{60}\,\text{h} = \frac{1}{6}\,\text{h}$$
3. **Anwendung von Little's Gesetz für Systeme mit Verlusten:**
   $$\bar{L} = \lambda_{\text{eff}} \cdot \bar{W} = 24\,\frac{\text{Teile}}{\text{h}} \cdot \frac{1}{6}\,\text{h} = 4{,}0\,\text{Teile}$$

*Typische Fehlkonzepte:* Wer mit der nominalen Ankunftsrate $\lambda = 30\,\text{h}^{-1}$ statt $\lambda_{\text{eff}} = 24\,\text{h}^{-1}$ rechnet, erhält $5{,}0$. Wer Minuten nicht in Stunden umrechnet, erhält $240$.

---

### Frage 4.2: Numerische Integration: Einzelschritt mit dem Heun-Verfahren (RK2) (Numerisch – 1,5 Punkte)

#### Fragetext
Gegeben sei das skalare Anfangswertproblem erster Ordnung für den Zustand $x(t)$:
$$\dot{x}(t) = -2 \cdot x(t) + 4 \quad \text{mit dem Anfangswert } x(0) = 1{,}0$$

Berechnen Sie ausgehend von $t_0 = 0\,\text{s}$ mit einer konstanten Schrittweite von **$h = 0{,}5\,\text{s}$** den numerischen Näherungswert **$x_1 \approx x(0{,}5\,\text{s})$ nach exakt einem Zeitschritt mit dem zweistufigen Verfahren von Heun (Runge-Kutta 2. Ordnung, Prädiktor-Korrektor)**.  
*(Geben Sie den exakten Zahlenwert ohne Einheit ein, z. B. `1.85`)*

#### Antwortwert
* **Musterlösung:** `1.5` (akzeptierter Toleranzbereich: `1.48` bis `1.52`)

#### Mathematische Herleitung & Didaktik
1. **Anfangssteigung $k_1$ am Punkt $x_0 = 1{,}0$:**
   $$k_1 = f(x_0) = -2 \cdot 1{,}0 + 4 = 2{,}0$$
2. **Euler-Prädiktorschritt $\tilde{x}_1$ für $h = 0{,}5$:**
   $$\tilde{x}_1 = x_0 + h \cdot k_1 = 1{,}0 + 0{,}5 \cdot 2{,}0 = 2{,}0$$
3. **Endsteigung $k_2$ am Prädiktorpunkt $\tilde{x}_1 = 2{,}0$:**
   $$k_2 = f(\tilde{x}_1) = -2 \cdot 2{,}0 + 4 = 0{,}0$$
4. **Korrektorschritt (Trapezregel / Mittelwert beider Steigungen):**
   $$x_1 = x_0 + \frac{h}{2} \cdot (k_1 + k_2) = 1{,}0 + \frac{0{,}5}{2} \cdot (2{,}0 + 0{,}0) = 1{,}0 + 0{,}5 = 1{,}5$$

*(Hinweis: Ein reiner expliziter Euler-Schritt hätte $x_1 = 2{,}0$ geliefert).*

---

### Frage 4.3: Code-Tracing: Zeitgewichtetes Flächenintegral (`areaUnderL`) in DES (Numerisch – 1,5 Punkte)

#### Fragetext
In einer diskreten Ereignissimulation (DES) wird die mittlere Anzahl der Werkstücke im System (`meanL`) über das zeitgewichtete Flächenintegral `areaUnderL` bestimmt. Verfolgen Sie folgenden C#-Codeausschnitt über drei aufeinanderfolgende Ereignisse zum Zeitpunkt `eventTimes[i]`:

```csharp
double clock = 0.0;
double areaUnderL = 0.0;
int L = 0;

double[] eventTimes = { 2.0, 5.0, 10.0 };
int[] deltaL        = {  +2,  +1,   -2 };

for (int i = 0; i < eventTimes.Length; i++)
{
    double tNow = eventTimes[i];
    double dt = tNow - clock;
    areaUnderL += L * dt;
    L += deltaL[i];
    clock = tNow;
}

double meanL = areaUnderL / clock;
```

Welchen exakten numerischen Wert hat die Variable `meanL` nach dem vollständigen Durchlauf der Schleife?  
*(Geben Sie den Zahlenwert als Dezimalzahl ohne Einheit ein, z. B. `2.4`)*

#### Antwortwert
* **Musterlösung:** `2.1` (akzeptierter Toleranzbereich: `2.05` bis `2.15`)

#### Mathematische Herleitung & Didaktik
1. **Ereignis `i = 0` (`tNow = 2.0, deltaL = +2`):**
   * `dt = 2.0 - 0.0 = 2.0`
   * `areaUnderL += 0 * 2.0` $\to \text{areaUnderL} = 0{,}0$
   * `L = 0 + 2 = 2`, `clock = 2.0`
2. **Ereignis `i = 1` (`tNow = 5.0, deltaL = +1`):**
   * `dt = 5.0 - 2.0 = 3.0`
   * `areaUnderL += 2 * 3.0 = 6.0` $\to \text{areaUnderL} = 6{,}0$
   * `L = 2 + 1 = 3`, `clock = 5.0`
3. **Ereignis `i = 2` (`tNow = 10.0, deltaL = -2`):**
   * `dt = 10.0 - 5.0 = 5.0`
   * `areaUnderL += 3 * 5.0 = 15.0` $\to \text{areaUnderL} = 6{,}0 + 15{,}0 = 21{,}0$
   * `L = 3 - 2 = 1`, `clock = 10.0`
4. **Berechnung von `meanL`:**
   $$\text{meanL} = \frac{\text{areaUnderL}}{\text{clock}} = \frac{21{,}0}{10{,}0} = 2{,}1$$

---

### Frage 4.4: ODE-Solver bei Oszillatoren: Expliziter Euler vs. Runge-Kutta-4 (RK4) (Single-Choice – 1,0 Punkte)

#### Fragetext
Ein ungedämpfter harmonischer Einmassenschwinger ($m\ddot{x} + c x = 0$, Eigenkreisfrequenz $\omega_0 = \sqrt{c/m}$) besitzt in der Zustandsraumdarstellung erster Ordnung rein imaginäre Eigenwerte $\lambda_{1,2} = \pm\mathrm{i}\omega_0$.

Welches Verhalten zeigt die numerische Zeitintegration bei konstanter Schrittweite $h = 0{,}02\,\text{s}$ mit dem **expliziten Euler-Verfahren** im Vergleich zum klassischen **Runge-Kutta-Verfahren 4. Ordnung (RK4)**?

#### Antwortoptionen
* [x] A) Da das Stabilitätsgebiet des expliziten Euler-Verfahrens die imaginäre Achse nicht enthält ($|1 \pm \mathrm{i} h\omega_0| > 1$), führt es künstliche Energie zu und die Amplitude wächst exponentiell, während RK4 die imaginäre Achse bis $2\sqrt{2}$ stabil abdeckt.
* [ ] B) Das explizite Euler-Verfahren dämpft die Schwingungsamplitude aufgrund seiner numerischen Viskosität erster Ordnung innerhalb weniger Perioden auf Null ab, während RK4 für alle beliebig großen Schrittweiten $h \to \infty$ bedingungslos A-stabil bleibt.
* [ ] C) Beide Einschrittverfahren liefern für lineare Differentialgleichungen mit konstanten Koeffizienten bis auf die 16. Nachkommastelle exakt dieselbe Phasenraumtrajektorie, unterscheiden sich jedoch um den Faktor vier im Speicherbedarf des Zustandsvektors.
* [ ] D) Das klassische RK4-Verfahren erzeugt bei konservativen Schwingern einen systematischen Phasenversatz von $90^\circ$ pro Schritt, wohingegen das explizite Euler-Verfahren als symplektischer Integrator die mechanische Gesamtenergie exakt erhält.

#### Didaktische Begründung
* *Option A ist korrekt:* Für den expliziten Euler gilt der Verstärkungsfaktor $|g(\mathrm{i} h\omega_0)| = \sqrt{1 + (h\omega_0)^2} > 1$ für jedes $h > 0$. Die Phasenraumspirale dreht sich unphysikalisch nach außen. Das Stabilitätsgebiet von RK4 schneidet die imaginäre Achse im Intervall $[-2\sqrt{2}\mathrm{i}, +2\sqrt{2}\mathrm{i}] \approx [-2{,}83\mathrm{i}, +2{,}83\mathrm{i}]$.

---

### Frage 4.5: S-Functions: Aktor-Sättigung & Anti-Windup (Conditional Integration) (Single-Choice – 1,0 Punkte)

#### Fragetext
In der S-Function (`ComputeDerivatives`) eines geregelten mechatronischen Linearantriebs ist der Stellkraft-Ausgang des PID-Reglers durch die maximale Motorkraft $\pm F_{\max}$ begrenzt:

```csharp
double error  = setpoint - x[0];
double u_pid  = Kp * error + Ki * x[2] - Kd * x[1]; // x[2] ist der I-Zustand
double thrust = Math.Clamp(u_pid, -F_max, F_max);

if (thrust == u_pid || (thrust >= F_max && error < 0) || (thrust <= -F_max && error > 0))
    dxdt[2] = error;
else
    dxdt[2] = 0.0;
```

Welches dynamische Fehlverhalten des geschlossenen Regelkreises wird durch diese `if/else`-Verzweigung (**Anti-Windup Clamping**) gezielt verhindert?

#### Antwortoptionen
* [x] A) Ohne das Einfrieren der Ableitung auf `0.0` würde der Integratorzustand während einer Aktor-Sättigung ungebremst weiter anwachsen, sodass der Antrieb nach Erreichen des Sollwerts erst nach massivem Überschwingen wieder aus der Begrenzung kommt.
* [ ] B) Die Verzweigung verhindert, dass der differentielle D-Anteil bei einem plötzlichen Sollwertsprung von `setpoint` gegen Unendlich divergiert und in der nachfolgenden RK4-Stufe eine `DivideByZeroException` auslöst.
* [ ] C) Durch das Setzen der Ableitung auf `0.0` wird die Eigenfrequenz der mechanischen Regelstrecke künstlich verdoppelt, damit der Antrieb auch im gesättigten Zustand ohne Phasenverlust dem Sollwert folgt.
* [ ] D) Die Bedingung schaltet den numerischen ODE-Solver bei Erreichen der Stellgrößenbegrenzung automatisch von der vierten Ordnung (RK4) auf die erste Ordnung (Euler) zurück, um Rechenzeit auf der SPS einzusparen.

#### Didaktische Begründung
* *Option A ist korrekt:* Befindet sich das Stellglied am Anschlag (`thrust != u_pid`) und treibt der aktuelle Regelfehler `error` das Stellsignal noch tiefer in dieselbe Sättigungsgrenze, darf der I-Anteil nicht weiter aufintegriert werden (*Integrator Windup*). Sobald der Fehler das Vorzeichen wechselt und aus der Sättigung herausführt, gibt die Bedingung die Integration sofort wieder frei.

---

### Frage 4.6: Stochastik in DES: Analytische Inversionsmethode für Exponentialverteilung (Single-Choice – 1,0 Punkte)

#### Fragetext
Um in einer diskreten Ereignissimulation exponentiell verteilte Zwischenankunftszeiten $\Delta t \sim \text{Exp}(\lambda)$ aus einer gleichverteilten Zufallszahl $U \sim \mathcal{U}(0, 1)$ zu erzeugen, liefert die analytische Umkehrung der Verteilungsfunktion $F(t) = 1 - \mathrm{e}^{-\lambda t}$ zunächst den Ausdruck $t = -\frac{1}{\lambda}\ln(1 - U)$.

Warum wird in produktiven C#-Simulationskernen stattdessen fast immer die Anweisung `double dt = -Math.Log(1.0 - rng.NextDouble()) / lambda;` bzw. bei offenem Intervall direkt `-Math.Log(u) / lambda` verwendet, und welche Besonderheit gilt für `Random.NextDouble()` in .NET?

#### Antwortoptionen
* [x] A) Da `1.0 - U` auf $(0, 1)$ dieselbe Gleichverteilung wie `U` besitzt, sind beide Formeln stochastisch äquivalent; weil `rng.NextDouble()` jedoch das Intervall von `0.0` (inklusive) bis `1.0` (exklusive) liefert, schützt `1.0 - rng.NextDouble()` vor `Math.Log(0.0)`.
* [ ] B) Die Funktion `Math.Log(x)` berechnet in C# standardmäßig den dekadischen Logarithmus zur Basis $10$, weshalb die Differenz `1.0 - U` zwingend als Näherungsreihe für die Eulersche Zahl $\mathrm{e}$ zur Basisumrechnung eingesetzt werden muss.
* [ ] C) Durch die Verwendung des natürlichen Logarithmus wird aus einer einzelnen gleichverteilten Zufallszahl `U` ohne trigonometrische Funktionen direkt eine standardnormalverteilte Gauß-Glocke $\mathcal{N}(0, 1)$ nach Box-Muller erzeugt.
* [ ] D) Die Methode `rng.NextDouble()` erzeugt in .NET bereits intern exponentiell verteilte Zufallszahlen mit der normierten Rate eins, sodass der Aufruf von `Math.Log` lediglich der nachträglichen Skalierung auf die gewünschte Varianz dient.

#### Didaktische Begründung
* *Option A ist korrekt:* Zufallsvariable $U \sim \mathcal{U}(0,1)$ und $1 - U \sim \mathcal{U}(0,1)$ sind verteilungsgleich. In .NET liefert `Random.NextDouble()` Werte im halboffenen Intervall $[0{,}0, 1{,}0)$ (also $0{,}0 \le U < 1{,}0$). Damit liegt $1{,}0 - U$ im Intervall $(0{,}0, 1{,}0]$, wodurch das Argument des Logarithmus niemals $0{,}0$ werden kann!

---

### Frage 4.7: Zustandsraumtransformation, Butcher-Tableau & Konsistenzordnung (Multiple-Select – 1,0 Punkte)

#### Fragetext
Welche der folgenden Aussagen zur Überführung mechanischer Differentialgleichungen in den Zustandsraum sowie zu expliziten Runge-Kutta-Verfahren sind **mathematisch und numerisch zutreffend**?  
*(Wählen Sie alle richtigen Aussagen; 2 bis 3 Antworten sind korrekt)*

#### Antwortoptionen
* [x] A) Eine Bewegungsgleichung zweiter Ordnung ($m\ddot{x} + d\dot{x} + cx = F(t)$) wird über den Zustandsvektor $\mathbf{x} = (x_1, x_2)^\top = (x, \dot{x})^\top$ in ein System aus zwei gekoppelten Differentialgleichungen erster Ordnung überführt.
* [x] B) Das klassische Runge-Kutta-Verfahren 4. Ordnung (RK4) wertet die rechte Seite pro Zeitschritt viermal aus ($k_1, k_2, k_3, k_4$) und besitzt einen lokalen Fehler der Ordnung $\mathcal{O}(h^5)$ sowie einen globalen Fehler von $\mathcal{O}(h^4)$.
* [ ] C) Halbiert man beim expliziten Euler-Verfahren (Konvergenzordnung $p = 1$) die Zeitschrittweite $h \to h/2$, so sinkt der globale Integrationsfehler am Ende des Simulationsintervalls auf ein Sechzehntel ($\frac{1}{16}$) seines ursprünglichen Werts.
* [ ] D) In einer Simulink-analogen S-Function müssen die Zustandsvariablen bereits innerhalb der Methode `ComputeOutputs` mit der Zeitschrittweite `dt` überschrieben werden, damit `ComputeDerivatives` überhaupt keine Parameter mehr benötigt.

#### Didaktische Begründung
* *A und B sind korrekt (+50 % je Option).*
* *C ist falsch (-50 %):* Beim expliziten Euler-Verfahren ($p = 1$) skaliert der globale Fehler linear mit $\mathcal{O}(h^1)$: Eine Halbierung der Schrittweite halbiert den globalen Fehler lediglich auf $\frac{1}{2}$ (ein Sechzehntel $\frac{1}{2^4} = \frac{1}{16}$ gilt nur für ein Verfahren 4. Ordnung wie RK4!).
* *D ist falsch (-50 %):* Strikte Trennung in S-Functions: `ComputeOutputs` berechnet ausschließlich Ausgangsgrößen $\mathbf{y} = g(t, \mathbf{x}, \mathbf{u})$, `ComputeDerivatives` berechnet die Ableitungen $\dot{\mathbf{x}} = f(t, \mathbf{x}, \mathbf{u})$ ohne den Zustand `x` selbst zu verändern; das Fortschreiben von `x` übernimmt ausschließlich der externe ODE-Solver!

---

### Frage 4.8: DES-Architektur (`PriorityQueue`, Next-Event-Time-Advance & Kendall) (Multiple-Select – 1,0 Punkte)

#### Fragetext
Bei der Entwicklung einer ereignisdiskreten Simulations-Engine (DES) in C# für Produktions- und Logistiksysteme kommen das Next-Event-Time-Advance-Prinzip, eine Future Event List (FEL) und die Kendall-Notation zum Einsatz. Welche der folgenden Aussagen sind **fachlich zutreffend**?  
*(Wählen Sie alle richtigen Aussagen; 2 bis 3 Antworten sind korrekt)*

#### Antwortoptionen
* [x] A) In C# wird die Future Event List (FEL) als `PriorityQueue<SimEvent, double>` mit dem Ereigniszeitpunkt `tEvent` als Schlüssel implementiert, sodass `Dequeue()` in $\mathcal{O}(\log N)$ stets das chronologisch nächste Ereignis liefert.
* [x] B) Beim Next-Event-Time-Advance-Mechanismus springt die Simulationsuhr `clock` direkt von Ereigniszeitpunkt zu Ereigniszeitpunkt, ohne dazwischenliegende ereignisfreie Zeitintervalle mit festen $\Delta t$-Schritten abtasten zu müssen.
* [ ] C) Ein Warteschlangensystem mit der Kendall-Notation $M/M/2/10$ besitzt genau $10$ parallele Bearbeitungsstationen (Server) und eine unendlich große Warteschlangenkapazität für exponentialverteilte Zwischenankunftszeiten.
* [ ] D) Ein stationäres $M/M/1$-Warteschlangensystem mit unendlichem Puffer bleibt auch für einen Auslastungsgrad von $\rho = \frac{\lambda}{\mu} = 1{,}25 > 1$ dauerhaft stabil, sofern die Future Event List nach dem FIFO-Prinzip abgearbeitet wird.

#### Didaktische Begründung
* *A und B sind korrekt (+50 % je Option).*
* *C ist falsch (-50 %):* In der Kendall-Notation $A/S/c/K$ steht die dritte Stelle $c = 2$ für die Anzahl der parallelen Server und die vierte Stelle $K = 10$ für die maximale Systemkapazität (Pufferplätze plus Serverplätze).
* *D ist falsch (-50 %):* Ein $M/M/1$-System ohne Kapazitätsgrenze ist genau dann stationär stabil, wenn die Auslastung strikt kleiner als eins ist ($\rho = \lambda/\mu < 1$). Für $\rho \ge 1$ wächst die Warteschlangenlänge über alle Grenzen gegen Unendlich.
