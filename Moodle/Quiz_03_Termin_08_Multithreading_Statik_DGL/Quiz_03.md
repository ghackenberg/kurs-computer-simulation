# Moodle-Quiz 3 (Termin 8): Multithreading, Statische Fachwerke, ODEs & S-Functions

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (FH Oberösterreich, Campus Wels)  
**Prüfungszeitpunkt:** Beginn Termin 8  
**Bearbeitungszeit:** 15–20 Minuten  
**Säule:** Säule 1 (Theoretische & numerische Grundlagen, Gewicht: 7,5 % der Gesamtnote)  
**Prüfungsmodus:** Präsenz im EDV-Labor / Safe Exam Browser in Moodle  
**Zulässige Hilfsmittel:** Taschenrechner (nicht-programmierbar) oder Windows-Rechner; keine LLM-Nutzung / Closed-Book

---

## Didaktische Zielsetzung & Einbettung

Dieses Quiz überprüft die parallele Hochleistungsverarbeitung in C#/.NET (TPL), das Aufstellen und Lösen linearer Gleichungssysteme elastischer Fachwerke mit `Math.NET Numerics` (Cholesky-Faktorisierung) sowie die numerische Lösung kontinuierlicher Differentialgleichungen (ODEs) mittels S-Functions und Anti-Windup-Regelungsstrategien.

### Stoffabgrenzung & Tabu-Grenzen
* **Inhalte:** Kapitel 06 (Multithreading mit TPL, `Parallel.For`, Amdahlsches Gesetz, Speedup, Race Conditions, False Sharing, thread-lokale Akkumulation), Kapitel 07 (Statische FE-Fachwerke, globale Steifigkeitsmatrix $\mathbf{K}$, Lagerungsbedingungen, reduzierte Matrix der freien Freiheitsgrade $\mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f$, Cholesky-Zerlegung $\mathbf{L}\mathbf{L}^\top$, Singularität & Mechanismen), Kapitel 08 (Kontinuierliche Modelle, S-Functions, expliziter Euler vs. Runge-Kutta-4 (RK4), Butcher-Tableau, Stabilitätsgebiete bei Oszillatoren, Aktor-Sättigung und Anti-Windup Clamping).
* **Strikte Tabu-Grenzen:**
  - ❌ **KEINE** diskreten Ereignissysteme (DES) oder Warteschlangen (Kapitel 09)
  - ❌ **KEIN** Little's Gesetz oder M/M/1-Warteschlangen (Kapitel 09)
  - ❌ **KEINE** Zero-Crossing-Bisektion oder hybriden Kontaktmodelle (Kapitel 10)
  - ❌ **KEINE** VIBN / FMI / Co-Simulation (Kapitel 11)

---

## Fragenübersicht

| Nr. | Thema | Fragentyp | Bloom-Taxonomie | Punkte |
| :---: | :--- | :--- | :--- | :---: |
| **Q3.1** | Amdahlsches Gesetz & Speedup-Berechnung | Numerische Berechnung | Anwenden / Berechnen (L3) | 2,0 |
| **Q3.2** | TPL `Parallel.For` & Race Conditions | Code-Mutation (Single-Choice) | Analysieren / Debuggen (L4) | 1,5 |
| **Q3.3** | Statik FEM: LGS $\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$ & Cholesky-Bedingungen | FE-Mechanik & Numerik (Multiple-Select) | Verstehen / Differenzieren (L3) | 1,5 |
| **Q3.4** | ODE-Solver: Runge-Kutta-4 vs. Expliziter Euler bei Schwingern | Stabilitätsanalyse (Single-Choice) | Bewerten / Urteilen (L5) | 1,5 |
| **Q3.5** | S-Functions: Aktor-Sättigung & Anti-Windup Clamping | Mechatronische Regelung (Single-Choice) | Verstehen / Analysieren (L3) | 1,5 |
| **Gesamt** | | | | **8,0 Pkt.** |

---

## Detaillierte Fragen & Musterlösungen

### Frage 3.1: Amdahlsches Gesetz & Speedup-Berechnung (Berechnung)

#### Fragetext
Ein simulationsgestützter Finite-Elemente-Algorithmus verbringt $20\,\%$ seiner gesamten Rechenzeit in sequentiellen Vorbereitungs-, Dateizugriffs- und UI-Synchronisationsroutinen ($s = 0{,}20$). Der verbleibende Anteil von $80\,\%$ ($p = 0{,}80$) kann perfekt auf parallele CPU-Threads aufgeteilt werden.

Berechnen Sie den **theoretisch maximal erreichbaren Speedup $S(N)$** bei Ausführung des Algorithmus auf einer Workstation mit **$N = 4$ physikalischen Prozessorkernen** nach Amdahls Gesetz:
$$S(N) = \frac{1}{s + \frac{1 - s}{N}}$$

*(Geben Sie den Beschleunigungsfaktor als Dezimalzahl ohne Einheit an, z. B. `3.75`)*

#### Antwortwert
* **Musterlösung:** `2.50` (akzeptierter Toleranzbereich: `2.45` bis `2.55`)

#### Mathematische Herleitung & Didaktik
Gegeben:
* Serieller Anteil: $s = 0{,}20$
* Paralleler Anteil: $p = 1 - s = 0{,}80$
* Anzahl Prozessorkerne: $N = 4$

Einsetzen in Amdahls Gesetz:
$$S(4) = \frac{1}{0{,}20 + \frac{0{,}80}{4}} = \frac{1}{0{,}20 + 0{,}20} = \frac{1}{0{,}40} = 2{,}50$$

*Didaktischer Zusatzhinweis:* Selbst bei unendlich vielen Prozessorkernen ($N \to \infty$) ist der theoretische Speedup asymptotisch durch $\frac{1}{s} = \frac{1}{0{,}20} = 5{,}0$ gedeckelt. Ein 4-Kern-System erreicht somit bereits die Hälfte des absoluten theoretischen Maximums.

---

### Frage 3.2: TPL `Parallel.For` & Race Conditions (Code-Mutation)

#### Fragetext
Ein Entwickler möchte die gesamte kinetische Energie eines Teilchensystems ($N = 1\,000\,000$ Partikel) parallel mit der .NET Task Parallel Library (TPL) berechnen:

```csharp
double totalKineticEnergy = 0.0;

Parallel.For(0, particles.Length, i =>
{
    double e = 0.5 * particles[i].Mass * particles[i].VelocitySquared;
    totalKineticEnergy += e; // Summation über alle Partikel
});

Console.WriteLine($"Gesamtenergie: {totalKineticEnergy} J");
```

Bei jedem Testlauf gibt das Programm einen völlig anderen, deutlich zu geringen Energiewert aus. Was ist die **exakte Ursache** und wie lautet die professionelle C#/.NET-Lösung?

#### Antwortoptionen
* [ ] A) `Parallel.For` bricht bei großen Arrays automatisch nach dem ersten Core ab; man muss stattdessen eine `while`-Schleife mit `Thread.Sleep(1)` verwenden.
* [x] B) Auf die Variable `totalKineticEnergy` greifen mehrere Threads gleichzeitig unkoordiniert schreibend zu (Race Condition / Data Race). Die Anweisung `+=` ist nicht atomar (Laden, Inkrementieren, Speichern). Die professionelle Lösung nutzt die Thread-lokale Überladung von `Parallel.For<double>` mit Initialisierer, lokalem Akkumulator und synchronisiertem `Interlocked.Add` / `lock` in `localFinally`, oder PLINQs `.AsParallel().Sum(...)`.
* [ ] C) Fließkommazahlen (`double`) dürfen in C# nicht im Arbeitsspeicher addiert werden; Berechnungen müssen im Grafikspeicher als Vektoren deklariert werden.
* [ ] D) Das Array `particles` muss vor der Schleife mit `Array.Reverse` invertiert werden, um Cache-Konflikte zu vermeiden.

#### Didaktische Begründung
* *Option B beschreibt exakt die fundamentale Multithreading-Falle:* Ohne Thread-lokale Reduktion überschreiben sich parallele CPU-Cores gegenseitig die Zwischenergebnisse im Cache (Lost Updates).
* *Distraktor A, C, D sind technisch haltlos.*

---

### Frage 3.3: Statik FEM: LGS $\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$ & Cholesky-Bedingungen (Multiple-Select)

#### Fragetext
Bei der statischen FE-Berechnung eines 2D-Fachwerks mit der Knoten-Freiwertmethode wird das Gleichungssystem für die ungebundenen (freien) Freiheitsgrade aufgestellt:
$$\mathbf{K}_{ff} \cdot \mathbf{u}_f = \mathbf{f}_f$$
Zur Lösung soll die performante **Cholesky-Zerlegung** ($\mathbf{K}_{ff} = \mathbf{L} \cdot \mathbf{L}^\top$) mit `Math.NET Numerics` verwendet werden.

Welche Bedingungen müssen **zwingend erfüllt sein**, damit die Cholesky-Zerlegung mathematisch existiert und numerisch stabil durchläuft?  
*(Wählen Sie alle richtigen Aussagen)*

#### Antwortoptionen
* [x] A) Die reduzierte Steifigkeitsmatrix $\mathbf{K}_{ff}$ muss **symmetrisch und positiv definit** (SPD) sein, d. h. $\mathbf{x}^\top \mathbf{K}_{ff} \mathbf{x} > 0$ für alle Vektoren $\mathbf{x} \neq \mathbf{0}$.
* [x] B) Alle Starrkörperbewegungen in der Ebene (zwei Translationen $u_x, u_y$ und eine Rotation $\varphi$) müssen durch mindestens 3 linear unabhängige Lagerbedingungen vollständig gesperrt sein.
* [x] C) Die Fachwerkstruktur darf keine kinematischen Mechanismen enthalten (z. B. gelenkige Vierecksfelder ohne Aussteifungsdiagonale), da sonst mindestens ein Eigenwert Null wird ($\det(\mathbf{K}_{ff}) = 0$) und die Cholesky-Zerlegung mit einer Division durch Null bzw. Wurzel aus einer negativen Zahl abbricht.
* [ ] D) Die Diagonalelemente der Matrix müssen alle identisch groß sein, da Cholesky sonst eine Matrix-Transformation ins Frequenzgebiet verlangt.
* [ ] E) Der Lastvektor $\mathbf{f}_f$ darf an keinem Knoten Null sein, da die Cholesky-Zerlegung sonst auf singuläre Lasten stößt.

#### Didaktische Begründung
* *A, B, C sind die zentralen Voraussetzungen:* Symmetrie folgt aus dem Satz von Betti/Maxwell, positive Definitheit erfordert die Beseitigung aller Starrkörperbewegungen und inneren Mechanismen (Eigenwerte alle strikt positiv: $\lambda_i > 0$).
* *D und E sind sachlich falsch:* Diagonalelemente variieren mit Stabsteifigkeit; der Lastvektor $\mathbf{f}_f$ beeinflusst die Matrixzerlegung $\mathbf{K} = \mathbf{L} \mathbf{L}^\top$ überhaupt nicht.

---

### Frage 3.4: ODE-Solver: Runge-Kutta-4 vs. Expliziter Euler bei Schwingern (Stabilität)

#### Fragetext
Ein ungedämpfter harmonischer Feder-Masse-Schwinger ($m \ddot{x} + c x = 0$) wird als Zustandsraummodell erster Ordnung formuliert:
$$\begin{pmatrix} \dot{x}_1 \\ \dot{x}_2 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -\omega_0^2 & 0 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}, \quad \text{mit } x_1 = x, \, x_2 = v, \, \omega_0 = \sqrt{\frac{c}{m}}$$
Die Eigenwerte der Systemmatrix liegen exakt auf der imaginären Achse der komplexen Zahlenebene: $\lambda_{1,2} = \pm i \omega_0$.

Was geschieht bei der numerischen Integration dieses Systems mit dem **expliziten Euler-Verfahren** im Vergleich zum klassischen **Runge-Kutta-Verfahren 4. Ordnung (RK4)** bei fester Schrittweite $h = 0{,}02\,\text{s}$?

#### Antwortoptionen
* [x] A) **Der explizite Euler destabilisiert das System künstlich:** Da das Stabilitätsgebiet des expliziten Eulers ($|1 + h\lambda| \le 1$) die imaginäre Achse außer im Ursprung nirgends berührt, gilt stets $|1 \pm i \omega_0 h| = \sqrt{1 + \omega_0^2 h^2} > 1$. Der Integrator führt dem System unphysikalische Energie zu; die Amplitude wächst exponentiell an (Phasenraumtrajektorie spiralt nach außen). **RK4** hingegen schließt Teile der imaginären Achse stabil ein (bis $|h\omega_0| \le 2\sqrt{2} \approx 2{,}83$) und integriert die Schwingung mit einem lokalen Fehler von $\mathcal{O}(h^5)$ hochpräzise und phasenstabil.
* [ ] B) Der explizite Euler ist absolut exakt, während RK4 die Schwingung sofort bis zum Stillstand dämpft, da Zwischensteigungen $k_1 \dots k_4$ Reibungskräfte erzeugen.
* [ ] C) Beide Solver erzeugen exakt dieselbe Trajektorie; RK4 benötigt lediglich viermal mehr Speicher auf der Festplatte.
* [ ] D) Der explizite Euler friert die Simulation ein, weil rein imaginäre Eigenwerte von C# nicht als `double` dargestellt werden können.

#### Didaktische Begründung
* *Option A ist das klassische Lehrbuchbeispiel für numerische Stabilität dynamischer Systeme:* Expliziter Euler ist für konservative, ungedämpfte Oszillatoren unbrauchbar, da er das System kontinuierlich energetisch anbläst. RK4 besitzt ein Stabilitätsgebiet, das bis $2{,}83$ auf der imaginären Achse reicht.

---

### Frage 3.5: S-Functions: Aktor-Sättigung & Anti-Windup Clamping (Regelung)

#### Fragetext
In der kontinuierlichen Simulation eines geregelten mechatronischen Antriebs ($m \ddot{x} = F_{\text{Aktor}} - d \dot{x}$) wird ein PID-Positionsregler eingesetzt. Der Aktor verfügt über eine physikalische Begrenzung der Maximalkraft:
$$F_{\text{Aktor}} = \text{clamp}(u_{\text{PID}}, -F_{\max}, +F_{\max})$$

Im Ableitungs-Schritt der S-Function (`CalculateDerivatives`) ist folgende Logik implementiert:
```csharp
// x[2] ist der Integrator-Zustand des I-Anteils (xi)
double error = setpoint - x[0];
double u_pid = Kp * error + Ki * x[2] - Kd * x[1];
double thrust = Math.Clamp(u_pid, -F_max, F_max);

// Anti-Windup: Conditional Integration (Clamping)
if (thrust == u_pid || (thrust >= F_max && error < 0) || (thrust <= -F_max && error > 0))
{
    dxdt[2] = error; // Normal integrieren
}
else
{
    dxdt[2] = 0.0;   // Integrator einfrieren!
}
```

Welches mechatronische Fehlverhalten wird durch dieses **Clamping** verhindert?

#### Antwortoptionen
* [x] A) Es verhindert den **Integrator-Windup**: Wenn der Aktor in der Begrenzung ist, würde der I-Anteil ohne Clamping den Regelfehler ungebremst weiter aufintegrieren. Erreicht das System schließlich die Zielposition, bleibt der Regler aufgrund des riesigen gespeicherten I-Werts noch lange in der Sättigung hängen, was zu massivem Überschwingen und Instabilität führt. Clamping friert den Integrator ein, sobald der Aktor gesättigt ist und der Fehler den Aktor noch weiter übersteuern würde.
* [ ] B) Es verhindert, dass die Masse des Objekts durch Rundungsfehler negativ wird.
* [ ] C) Es schützt den Prozessor vor einer Division durch Null bei der Berechnung von `Kd * x[1]`.
* [ ] D) Es sorgt dafür, dass die Schrittweite $h$ automatisch auf Null gesetzt wird, sobald der Motor warm läuft.

#### Didaktische Begründung
* *Option A ist die exakte Definition und mechatronische Begründung von Anti-Windup via Clamping:* Der Integrator darf nur weiterintegrieren, wenn der Fehler dazu beiträgt, den Aktor wieder *aus* der Sättigung herauszubringen.
