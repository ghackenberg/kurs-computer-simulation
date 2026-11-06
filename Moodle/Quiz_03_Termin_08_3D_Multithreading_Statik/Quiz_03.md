# Moodle-Quiz 3 (Zu Beginn von Termin 8): 3D-Visualisierung, Multithreading & Statische Fachwerke

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (FH Oberösterreich, Campus Wels)  
**Prüfungszeitpunkt:** Zu Beginn von Termin 8 (erste 15 Minuten vor dem Theorie-Impuls zu Kapitel 08)  
**Bearbeitungszeit:** 15 Minuten  
**Säule:** Säule 1 (Theoretische & numerische Grundlagen, Gewicht: 7,5 % der Gesamtnote)  
**Prüfungsmodus:** Präsenz im EDV-Labor / Safe Exam Browser in Moodle  
**Zulässige Hilfsmittel:** Taschenrechner (nicht-programmierbar) oder Windows-Rechner; keine LLM-Nutzung / Closed-Book

---

## Didaktische Zielsetzung & Einbettung

Dieses Quiz überprüft zu Beginn von Termin 08 nach dem Prinzip der strikten Rückwärts-Kausalität ausschließlich den Stoff der vorangegangenen Termine 05, 06 und 07 (Kapitel 05, 06 und 07): die mathematische 3D-Visualisierung mit `SharpGL`/OpenGL (Szenengraph, homogene Matrizen, Kugelkoordinaten-Orbitkamera), die parallele Hochleistungsverarbeitung in C#/.NET (TPL, Amdahlsches Gesetz, Race Conditions, False Sharing) sowie das Aufstellen und Lösen linearer Gleichungssysteme elastischer 2D-Fachwerke mit `Math.NET Numerics` (Steifigkeitsmatrix, Lagerung, Cholesky-Zerlegung).

### Stoffabgrenzung & Tabu-Grenzen (Rückwärts-Kausalität)
* **Geprüfte Inhalte (Termin 05, 06 & 07):** Kapitel 05 (SharpGL 3D-Pipeline, Kugelkoordinaten-Orbit-Kamera & Gimbal-Lock-Schutz, homogene $4 \times 4$-Matrizen, Szenengraph `glPushMatrix`/`glPopMatrix`, Vorwärtskinematik, Phong-Beleuchtung), Kapitel 06 (TPL `Parallel.For`, Partitionierung, Race Conditions, `Interlocked` vs. `lock`, False Sharing auf CPU-Cache-Lines, Amdahlsches Gesetz & Speedup), Kapitel 07 (Statische 2D-FEM-Fachwerke, Federsteifigkeit $k = EA/L$, globale Steifigkeitsmatrix $\mathbf{K}$, Blockpartitionierung $\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$, Starrkörpermoden & Lagerungen, Cholesky-Zerlegung $\mathbf{K}_{ff} = \mathbf{L}\mathbf{L}^\top$).
* **Strikte Tabu-Grenzen (ab Termin 08+):**
  - ❌ **KEINE** kontinuierlichen ODE-Solver höherer Ordnung wie Heun (RK2) oder Runge-Kutta-4 (RK4), Butcher-Tableaus, S-Functions oder Anti-Windup Clamping (Kapitel 08 – wird erst nach dem Quiz gelehrt!)
  - ❌ **KEINE** diskreten Ereignissysteme (DES), `PriorityQueue` oder Warteschlangen nach Little's Gesetz (Kapitel 09)
  - ❌ **KEINE** hybride Zero-Crossing-Bisektion oder Zeno-Effekte (Kapitel 10)

---

## Fragenübersicht (8 Fragen / 10,0 Punkte)

| Nr. | Thema | Fragentyp | Bloom-Taxonomie | Punkte |
| :---: | :--- | :--- | :---: | :---: |
| **Q3.1** | Amdahlsches Gesetz & Paralleler Speedup auf Multicore-CPUs | Numerische Berechnung (Freitext `{#...}`) | Anwenden / Berechnen (L3) | 2,0 |
| **Q3.2** | Statische 1D/2D-FEM: Axiale Stabsteifigkeit & Knotenverschiebung | Numerische Berechnung (Freitext `{#...}`) | Anwenden / Berechnen (L3) | 1,5 |
| **Q3.3** | Code-Tracing: Assemblierung der globalen Steifigkeitsmatrix $\mathbf{K}$ | Code-Tracing (Freitext `{#...}`) | Analysieren / Berechnen (L4) | 1,5 |
| **Q3.4** | TPL `Parallel.For`: Race Conditions & Thread-lokale Reduktion | Code-Diagnose (Single-Choice, 4 Optionen) | Analysieren / Debuggen (L4) | 1,0 |
| **Q3.5** | 3D-Orbitkamera: Kugelkoordinaten & Pol-Singularität (Gimbal Lock) | 3D-Kinematik (Single-Choice, 4 Optionen) | Analysieren (L4) | 1,0 |
| **Q3.6** | Multicore-Speicherarchitektur: False Sharing auf CPU-Cache-Lines | Performance-Analyse (Single-Choice, 4 Optionen) | Analysieren / Bewerten (L4) | 1,0 |
| **Q3.7** | Homogene $4 \times 4$-Matrizen, Szenengraph & Phong-Beleuchtung | Vernetztes Wissen (Multiple-Select, 4 Optionen) | Verstehen / Analysieren (L3) | 1,0 |
| **Q3.8** | Statik-FEM: Reduziertes System $\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$ & Cholesky-Zerlegung | Vernetztes Wissen (Multiple-Select, 4 Optionen) | Verstehen / Differenzieren (L3) | 1,0 |
| **Gesamt** | **3× Numerisch (5,0 P.) + 3× Single-Choice (3,0 P.) + 2× Multiple-Select (2,0 P.)** | | | **10,0 Pkt.** |

---

## Detaillierte Fragen & Musterlösungen

### Frage 3.1: Amdahlsches Gesetz & Paralleler Speedup auf Multicore-CPUs (Numerisch – 2,0 Punkte)

#### Fragetext
Ein simulationsgestützter Berechnungsalgorithmus benötigt für einen Zeitschritt auf einem einzelnen Prozessorkern genau $100\,\text{ms}$. Eine Profiling-Analyse ergibt, dass $20\,\%$ dieser Laufzeit auf zwingend sequentielle Vorbereitungs-, Dateizugriffs- und UI-Synchronisationsroutinen entfallen ($s = 0{,}20$). Der verbleibende Anteil von $80\,\%$ ($p = 0{,}80$) lässt sich ohne Kommunikationsverlust parallelisieren.

Berechnen Sie den **theoretisch maximal erreichbaren Gesamt-Speedup $S$** bei Ausführung des Algorithmus auf einer Workstation mit **$N = 4$ identischen Prozessorkernen**.  
*(Geben Sie den Beschleunigungsfaktor als Dezimalzahl ohne Einheit ein, z. B. `3.25`)*

#### Antwortwert
* **Musterlösung:** `2.5` (akzeptierter Toleranzbereich: `2.45` bis `2.55`)

#### Mathematische Herleitung & Didaktik
Nach dem Amdahlschen Gesetz setzt sich die normierte Gesamtlaufzeit auf $N$ Kernen aus dem unveränderlichen seriellen Anteil $s$ und dem durch $N$ geteilten parallelen Anteil $(1 - s) / N$ zusammen:
$$S(N) = \frac{1}{s + \frac{1 - s}{N}} = \frac{1}{0{,}20 + \frac{0{,}80}{4}} = \frac{1}{0{,}20 + 0{,}20} = \frac{1}{0{,}40} = 2{,}50$$

*(Alternativ über die Laufzeit: $T(4) = 20\,\text{ms} + \frac{80\,\text{ms}}{4} = 40\,\text{ms} \implies S = \frac{100\,\text{ms}}{40\,\text{ms}} = 2{,}50$).*

---

### Frage 3.2: Statische 1D/2D-FEM: Axiale Stabsteifigkeit & Knotenverschiebung (Numerisch – 1,5 Punkte)

#### Fragetext
Ein horizontaler Zugstab eines ebenen Fachwerks ist am linken Knoten $0$ fest eingespannt ($u_{0x} = 0$, $u_{0y} = 0$) und wird am rechten Knoten $1$ in positiver X-Richtung mit einer statischen Horizontalkraft von **$F_x = 42\,\text{kN}$** belastet.

Gegeben sind die Material- und Geometriekennwerte des Stabs:
* Elastizitätsmodul (Stahl): $E = 210\,\text{GPa} = 2{,}1 \cdot 10^{11}\,\frac{\text{N}}{\text{m}^2}$
* Querschnittsfläche des Stabs: $A = 1{,}0\,\text{cm}^2 = 1{,}0 \cdot 10^{-4}\,\text{m}^2$
* Unverformte Stablänge: $L = 2{,}0\,\text{m}$

Berechnen Sie die resultierende **horizontale Knotenverschiebung $u_{1x}$ in Millimetern $[\text{mm}]$**.  
*(Geben Sie den Zahlenwert in Millimetern ohne Einheit ein, z. B. `1.5`)*

#### Antwortwert
* **Musterlösung:** `4.0` (akzeptierter Toleranzbereich: `3.9` bis `4.1`)

#### Mathematische Herleitung & Didaktik
1. Axiale Federsteifigkeit $k$ des Fachwerkstabs:
   $$k = \frac{E \cdot A}{L} = \frac{2{,}1 \cdot 10^{11}\,\frac{\text{N}}{\text{m}^2} \cdot 1{,}0 \cdot 10^{-4}\,\text{m}^2}{2{,}0\,\text{m}} = \frac{2{,}1 \cdot 10^7\,\text{N}}{2{,}0\,\text{m}} = 1{,}05 \cdot 10^7\,\frac{\text{N}}{\text{m}}$$
2. Gleichgewicht am freien Freiheitsgrad $u_{1x}$ ($k \cdot u_{1x} = F_x$ mit $F_x = 42\,\text{kN} = 4{,}2 \cdot 10^4\,\text{N}$):
   $$u_{1x} = \frac{F_x}{k} = \frac{4{,}2 \cdot 10^4\,\text{N}}{1{,}05 \cdot 10^7\,\frac{\text{N}}{\text{m}}} = 4{,}0 \cdot 10^{-3}\,\text{m} = 4{,}0\,\text{mm}$$

---

### Frage 3.3: Code-Tracing: Assemblierung der globalen Steifigkeitsmatrix $\mathbf{K}$ (Numerisch – 1,5 Punkte)

#### Fragetext
Zwei kollineare 1D-Federelemente (Element $A$ zwischen Knoten $0$ und $1$ mit Steifigkeit `kA = 150.0`, Element $B$ zwischen Knoten $1$ und $2$ mit Steifigkeit `kB = 250.0`) werden im folgenden C#-Code in die globale $3 \times 3$-Steifigkeitsmatrix `K` assembliert:

```csharp
double[,] K = new double[3, 3];
double[] kElem = { 150.0, 250.0 };
int[,] nodes   = { { 0, 1 }, { 1, 2 } };

for (int e = 0; e < 2; e++)
{
    int i = nodes[e, 0];
    int j = nodes[e, 1];
    double ke = kElem[e];

    K[i, i] += ke;
    K[i, j] -= ke;
    K[j, i] -= ke;
    K[j, j] += ke;
}

double traceCenter = K[1, 1] + K[0, 1];
```

Welchen exakten numerischen Wert hat die Variable `traceCenter` nach Abschluss der Assemblierungsschleife?  
*(Geben Sie den Zahlenwert ohne Einheit ein, z. B. `100.0`)*

#### Antwortwert
* **Musterlösung:** `250.0` (akzeptierter Toleranzbereich: `249.9` bis `250.1`)

#### Mathematische Herleitung & Didaktik
1. **Element `e = 0` (`i = 0, j = 1, ke = 150.0`):**
   * `K[0, 0] += 150.0` $\to 150.0$
   * `K[0, 1] -= 150.0` $\to -150.0$
   * `K[1, 0] -= 150.0` $\to -150.0$
   * `K[1, 1] += 150.0` $\to 150.0$
2. **Element `e = 1` (`i = 1, j = 2, ke = 250.0`):**
   * `K[1, 1] += 250.0` $\to 150.0 + 250.0 = 400.0$ (Überlappung am Mittelknoten 1!)
   * `K[1, 2] -= 250.0` $\to -250.0$
   * `K[2, 1] -= 250.0` $\to -250.0$
   * `K[2, 2] += 250.0` $\to 250.0$
3. **Auswertung von `traceCenter`:**
   $$\text{traceCenter} = K[1, 1] + K[0, 1] = 400{,}0 + (-150{,}0) = 250{,}0$$

---

### Frage 3.4: TPL `Parallel.For`: Race Conditions & Thread-lokale Reduktion (Single-Choice – 1,0 Punkte)

#### Fragetext
Ein Entwickler möchte die gesamte kinetische Energie eines Partikelsystems ($N = 1\,000\,000$ Partikel) parallel mit der .NET Task Parallel Library (TPL) aufsummieren:

```csharp
double totalEnergy = 0.0;
Parallel.For(0, particles.Length, i =>
{
    double e = 0.5 * particles[i].Mass * particles[i].VelocitySquared;
    totalEnergy += e;
});
```

Bei jedem Programmlauf liefert `totalEnergy` ein anderes, deutlich zu kleines Ergebnis. Was ist die exakte Ursache und wie lautet das performante Standardmuster zur Behebung in C#?

#### Antwortoptionen
* [ ] A) Der Thread-Pool bricht `Parallel.For`-Schleifen ab einer Million Iterationen vorzeitig ab, weshalb die Schleife zwingend durch manuell instanziierte `new Thread()`-Objekte mit `ThreadPriority.Highest` ersetzt werden muss.
* [x] B) Die Operation `totalEnergy += e` ist eine nicht-atomare Read-Modify-Write-Sequenz mit **Lost Updates (Race Condition)**; gelöst wird dies durch `Parallel.For<double>` mit Thread-lokalen Teilakkumulatoren und abschließendem `lock` im `localFinally`-Block.
* [ ] C) Da `double`-Variablen auf 64-Bit-Architekturen nicht im CPU-Cache gehalten werden können, genügt das Voranstellen des Schlüsselworts `volatile` vor `totalEnergy`, um alle parallelen Additionen verlustfrei zu serialisieren.
* [ ] D) Die Methode `Parallel.For` durchläuft das Array rückwärts, wodurch bei der Gleitkomma-Addition Rundungsfehler kumulieren; ein vorgeschaltetes `Array.Sort(particles)` stellt die deterministische Summengenauigkeit wieder her.

#### Didaktische Begründung
* *Option B ist korrekt:* Mehrere Threads lesen gleichzeitig denselben alten Wert von `totalEnergy` in ihre Register, addieren ihr `e` und überschreiben sich beim Zurückschreiben gegenseitig. Ein `lock` in *jedem* einzelnen Schleifendurchlauf würde die Parallelisierung durch Lock-Contention zerstören; daher akkumuliert jeder Worker-Thread zunächst lock-frei in einer Thread-lokalen Variable (`localInit` / `body`) und führt nur einmal am Ende seiner Partition im `localFinally` ein synchronisiertes Update durch.

---

### Frage 3.5: 3D-Orbitkamera: Kugelkoordinaten & Pol-Singularität (Gimbal Lock) (Single-Choice – 1,0 Punkte)

#### Fragetext
In einer 3D-Anwendung (`SharpGL` / OpenGL) bewegt sich eine Orbitkamera auf einer Kugeloberfläche mit Radius $R$ um den Zielpunkt $(0, 0, 0)$. Ihre kartesische Position wird aus dem Azimutwinkel $\theta$ und dem Elevationswinkel $\phi$ bestimmt, während der globale Up-Vektor der Kamera in `gluLookAt` fest auf $\mathbf{u} = (0, 1, 0)^\top$ gesetzt ist.

Warum muss der Elevationswinkel $\phi$ in der Maussteuerung zwingend auf ein Intervall wie $[-89^\circ, +89^\circ]$ begrenzt (geclampt) werden?

#### Antwortoptionen
* [x] A) Bei $\phi = \pm 90^\circ$ liegt die Blickrichtung exakt parallel zum festen Up-Vektor $(0, 1, 0)^\top$, sodass deren Kreuzprodukt zur Berechnung des Kamera-Rechtsvektors zum Nullvektor entartet und die View-Matrix kollabiert.
* [ ] B) Oberhalb von $\phi = 89^\circ$ schneidet die Near-Clipping-Plane der perspektivischen Projektionsmatrix zwangsläufig den Koordinatenursprung, wodurch sämtliche Dreiecks-Primitive durch den Z-Buffer-Test verworfen werden.
* [ ] C) Die trigonometrischen Funktionen `Math.Sin` und `Math.Cos` sind in der IEEE-754-Gleitkommaarithmetik nur im offenen Intervall $(-\pi/2, +\pi/2)$ definiert und werfen exakt bei $\pm 90^\circ$ eine `ArithmeticException`.
* [ ] D) Ab einem Elevationswinkel von $90^\circ$ kehrt sich in OpenGL der Umlaufsinn (Winding Order) aller Polygon-Eckpunkte von gegen den Uhrzeigersinn (CCW) auf im Uhrzeigersinn (CW) um, sodass das Backface-Culling das Modell ausblendet.

#### Didaktische Begründung
* *Option A ist korrekt:* `gluLookAt` konstruiert ein orthonormales Kamerakoordinatensystem über das Kreuzprodukt $\mathbf{s} = \mathbf{f} \times \mathbf{u}$ aus Blickrichtungsvektor $\mathbf{f}$ und Up-Vektor $\mathbf{u}$. Steht die Kamera exakt im Zenit oder Nadir ($\phi = \pm 90^\circ$), ist $\mathbf{f} \parallel \mathbf{u}$, somit $\mathbf{f} \times \mathbf{u} = \mathbf{0}$, und die Normierung $\mathbf{s} / \|\mathbf{s}\|$ dividiert durch Null (`NaN`).

---

### Frage 3.6: Multicore-Speicherarchitektur: False Sharing auf CPU-Cache-Lines (Single-Choice – 1,0 Punkte)

#### Fragetext
Um in einer `Parallel.For`-Schleife über $4$ Threads jegliche Race Condition ohne `lock` zu vermeiden, legt ein Entwickler ein gemeinsames Array `double[] partialSums = new double[4]` an, in dem Thread `t` bei jeder Iteration direkt auf sein eigenes Element `partialSums[t] += val` schreibt.

Obwohl das Ergebnis mathematisch exakt stimmt, ist die parallele Version deutlich langsamer als ein einzelner Thread. Welcher Hardware-Effekt verursacht diesen massiven Performance-Einbruch?

#### Antwortoptionen
* [ ] A) Der Garbage Collector von .NET verschiebt Arrays mit weniger als $8$ Elementen bei jedem Schreibzugriff zwischen Generation 0 und dem Large Object Heap (LOH), was permanente Speicher-Kopieroperationen auslöst.
* [x] B) Da die vier benachbarten `double`-Werte ($32\,\text{Bytes}$) in derselben $64\,\text{Byte}$ großen **CPU-Cache-Line** liegen, invalidieren die Kerne über das Cache-Kohärenzprotokoll bei jedem Schreibzugriff gegenseitig ihre L1-Caches (**False Sharing**).
* [ ] C) Der JIT-Compiler deaktiviert bei Zugriffen auf eindimensionale `double`-Arrays innerhalb von Lambda-Ausdrücken die Hardware-Gleitkommaeinheit (FPU) und emuliert die Addition langsam in Software auf dem Stack.
* [ ] D) Durch die feste Array-Größe von $4$ Elementen kommt es in der Arbeitsspeicher-Bank zu einem Adress-Aliasing, bei dem der Speicherkontroller alle vier Kerne über einen gemeinsamen Betriebssystem-Mutex blockiert.

#### Didaktische Begründung
* *Option B ist korrekt:* Moderne CPUs verwalten ihren Cache nicht byte- oder variablenweise, sondern in Blöcken von $64\,\text{Bytes}$ (*Cache Lines*). Liegen `partialSums[0]` bis `partialSums[3]` direkt hintereinander im Speicher, teilen sie sich dieselbe Cache-Line. Schreibt Kern 0 auf `partialSums[0]`, wird die gesamte Cache-Line für Kern 1, 2 und 3 als ungültig (*Invalid*) markiert und muss über den Bus neu geladen werden (*Cache-Line Ping-Pong*).

---

### Frage 3.7: Homogene $4 \times 4$-Matrizen, Szenengraph & Phong-Beleuchtung (Multiple-Select – 1,0 Punkte)

#### Fragetext
In einer 3D-Simulation eines Mehrachs-Industrieroboters (`SharpGL`) werden die Armsegmente über einen hierarchischen Szenengraphen mit homogenen $4 \times 4$-Transformationsmatrizen positioniert und mit dem Phong-Beleuchtungsmodell schattiert. Welche der folgenden Aussagen sind **mathematisch und technisch zutreffend**?  
*(Wählen Sie alle richtigen Aussagen; 2 bis 3 Antworten sind korrekt)*

#### Antwortoptionen
* [x] A) Da die Matrixmultiplikation nicht kommutativ ist ($\mathbf{T} \cdot \mathbf{R} \neq \mathbf{R} \cdot \mathbf{T}$), bestimmt die Reihenfolge von Translation und Rotation, ob ein Bauteil um seinen lokalen Ursprung gedreht oder um den Weltursprung geschwenkt wird.
* [x] B) Durch das Sichern und Wiederherstellen der aktuellen ModelView-Matrix mittels `glPushMatrix()` und `glPopMatrix()` im Szenengraphen wirken Transformationen eines Elternknotens auf alle Kindknoten, ohne Geschwisterknoten zu verändern.
* [ ] C) Im Phong-Beleuchtungsmodell hängt die Intensität des diffusen Reflexionsanteils (Lambert-Strahlung) ausschließlich vom Winkel zwischen dem Kamerablickvektor und dem Ausfallswinkel ab und ist unabhängig vom Normalenvektor $\mathbf{n}$.
* [ ] D) Homogene $4 \times 4$-Matrizen werden in der 3D-Grafik nur für reine Drehungen benötigt, da eine dreidimensionale Translation $\mathbf{v}' = \mathbf{v} + \mathbf{t}$ bereits durch eine reguläre lineare $3 \times 3$-Matrixmultiplikation exakt darstellbar ist.

#### Didaktische Begründung
* *A und B sind korrekt (+50 % je Option).*
* *C ist falsch (-50 %):* Der diffuse Anteil nach Lambert ist proportional zum Skalarprodukt $\max(0, \mathbf{n} \cdot \mathbf{l})$ aus Oberflächennormale $\mathbf{n}$ und Lichtrichtungsvektor $\mathbf{l}$ (unabhängig vom Kameravektor $\mathbf{v}$, aber direkt abhängig von $\mathbf{n}$). Der Blickvektor $\mathbf{v}$ bestimmt den *spekularen* Glanzpunkt.
* *D ist falsch (-50 %):* Eine $3 \times 3$-Matrix bildet den Nullvektor $\mathbf{0}$ immer auf $\mathbf{0}$ ab ($\mathbf{A}\cdot\mathbf{0} = \mathbf{0}$) und kann daher *keine* Translation darstellen. Erst der Übergang zu homogenen Koordinaten $(x, y, z, 1)^\top$ macht die Translation zu einer linearen Matrixmultiplikation in $\mathbb{R}^4$.

---

### Frage 3.8: Statik-FEM: Reduziertes System $\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$ & Cholesky-Zerlegung (Multiple-Select – 1,0 Punkte)

#### Fragetext
Bei der statischen FE-Berechnung eines ebenen 2D-Fachwerks wird nach dem Einbau der Randbedingungen (Lagerungen) das reduzierte lineare Gleichungssystem $\mathbf{K}_{ff} \cdot \mathbf{u}_f = \mathbf{f}_f$ für die freien Freiheitsgrade mittels **Cholesky-Zerlegung** ($\mathbf{K}_{ff} = \mathbf{L} \cdot \mathbf{L}^\top$) in `Math.NET Numerics` gelöst. Welche Bedingungen und Eigenschaften sind **zwingend zutreffend**?  
*(Wählen Sie alle richtigen Aussagen; 2 bis 3 Antworten sind korrekt)*

#### Antwortoptionen
* [x] A) Damit die reduzierte Steifigkeitsmatrix $\mathbf{K}_{ff}$ symmetrisch positiv definit (SPD) ist, müssen in der 2D-Ebene alle drei Starrkörpermoden (zwei Translationen, eine Rotation) durch Lagerungen sowie innere Mechanismen verhindert sein.
* [x] B) Die Cholesky-Zerlegung nutzt die Symmetrie und positive Definitheit von $\mathbf{K}_{ff}$ gezielt aus, benötigt im Vergleich zur allgemeinen LU-Zerlegung nur etwa halb so viele Gleitkommaoperationen und kommt ohne Zeilenpivotisierung aus.
* [ ] C) Die ungefilterte Gesamtsteifigkeitsmatrix $\mathbf{K}$ (vor dem Streichen der gelagerten Freiheitsgrade) besitzt ausschließlich strikt positive Eigenwerte und kann daher immer direkt ohne Randbedingungen per Cholesky faktorisiert werden.
* [ ] D) Wenn an einem unbelasteten freien Knoten des Fachwerks der äußere Lastvektor-Eintrag gleich Null ist ($f_i = 0$), wird die zugehörige Hauptdiagonale in $\mathbf{K}_{ff}$ automatisch zu Null und die Cholesky-Zerlegung bricht mit einer Division durch Null ab.

#### Didaktische Begründung
* *A und B sind korrekt (+50 % je Option).*
* *C ist falsch (-50 %):* Vor dem Einbau der Lagerungen kann sich das gesamte Tragwerk frei im Raum verschieben und drehen (Starrkörperbewegung ohne Formänderungsenergie $\mathbf{u}^\top \mathbf{K} \mathbf{u} = 0$). Die ungelagerte Gesamtmatrix $\mathbf{K}$ ist daher nur positiv *semidefinit* ($\det(\mathbf{K}) = 0$, mindestens 3 Eigenwerte sind Null) und singulär!
* *D ist falsch (-50 %):* Die Steifigkeitsmatrix $\mathbf{K}_{ff}$ hängt ausschließlich von der Geometrie und den Stabsteifigkeiten $EA/L$ ab, niemals vom äußeren Lastvektor $\mathbf{f}_f$. Auch unbelastete Knoten besitzen durch die angeschlossenen Stäbe strikt positive Diagonaleinträge.
