# Fachgutachten: Mathematische Exaktheit, physikalische Plausibilität und numerische Robustheit

**Dokument-ID:** `Reviews/02_Mathematik_und_Numerik.md`  
**Gegenstand:** Vorlesungsunterlagen *Systemsimulation / Digitaler Zwilling* (Kapitel 00 bis 11)  
**Zielgruppe:** Studiengangsleitung, Dozierende und Autoren des Vorlesungsmaterials (FH Oberösterreich, Campus Wels)  
**Status:** Detaillierter Prüfbericht mit mathematischen Korrekturen und didaktischen Empfehlungen  

---

## 1. Executive Summary

Die didaktische Aufbereitung der Lehrveranstaltung *Systemsimulation / Digitaler Zwilling* an der FH Oberösterreich zeichnet sich durch einen modernen, durchgängigen didaktischen Bogen aus, der mathematische Grundlagen, algorithmische Lösungsverfahren und C#-Implementierungen miteinander verknüpft.

Die vertiefte mathematische, physikalische und numerische Begutachtung der Foliensätze (Kapitel 00 bis 11) offenbart jedoch wesentliche Diskrepanzen, formale Inkonsistenzen und numerische Risiken, die behoben werden müssen:

1. **Formel- und Notationsinkonsistenz:** Vektoren und Matrizen werden uneinheitlich dargestellt (Pfeilschreibweise $\vec{x}$ in Kap. 03, 05, 07, 09; kursive Skalarschreibweise $x, A$ in Kap. 08, 10; fette Vektorschreibweise $\mathbf{x}$ in Kap. 11). Physikalische Einheiten stehen vielfach kursiv im Mathematikmodus (z.B. $[m]$ statt $\mathrm{m}$ nach DIN 1304 / ISO 80000).
2. **PDE/Wärmeleitung (Kap. 02):** Die explizite Euler-Vorschrift enthält einen eklatanten Dimensions-/Doppelungsfehler ($\frac{\alpha}{h^2} \Delta T_{i,j}$ anstelle von $\alpha \Delta T_{i,j}$ bei vorab dividiertem Differenzenstern). Zudem wird die Von-Neumann-Diffusionsstabilität fälschlicherweise als „CFL-Bedingung“ bezeichnet.
3. **Statik & FEM (Kap. 07):** Die 2D- und 3D-Stabsteifigkeitsmatrizen werden direkt über dyadische Vektorprodukte hergeleitet, die klassische FEM-Koordinatentransformationsmatrix $T$ ($k_e = T^T k_{loc} T$) wird jedoch nicht formal eingeführt. Bei den Randbedingungen fehlen die Modifikationsregeln für inhomogene Dirichlet-Verschiebungen. Der Beispielcode in 7.5 implementiert nur das ideale, nicht aber das elastische Fachwerk.
4. **Kontinuierliche Dynamik (Kap. 08):** **Heun und Runge-Kutta 4 (RK4) fehlen im Kapitel 08 vollständig**, obwohl sie im Epilog (Kap. 11) und im Modulplan als Kernlöser angeführt werden. Quantitative Stabilitätsanalysen (Dahlquist-Testgleichung, Stabilitätsgebiete in $\mathbb{C}$) fehlen; das als „impliziter Euler“ gezeigte C#-Verfahren für den Ballwurf ist in Wahrheit der semi-implizite Euler-Cromer.
5. **Diskrete Dynamik & Stochastik (Kap. 09):** Die Verwendung einer Gauß-/Normalverteilung für Bedienzeiten verletzt die physikalische Kausalität (nicht-verschwindende Wahrscheinlichkeit für negative Dauern $T < 0$). Die PRNG-Initialisierung mit fortlaufenden linearen Seeds (`baseSeed + i`) birgt Korrelationsrisiken bei parallelen Replikationen.
6. **Hybride Dynamik (Kap. 10):** Der Nulldurchgangs-Algorithmus halbiert naiv die Schrittweite vom Startpunkt aus, anstatt eine echte Intervallschachtelung (Bisektion auf $[a, b]$) durchzuführen. Das Zeno-Phänomen (unendliche Kollisionen in endlicher Zeit) wird weder mathematisch analysiert noch durch eine Haftbedingung abgefangen.

---

## 2. Formelkonsistenz, MathJax/KaTeX-Syntax & Einheitenkonventionen

### 2.1 MathJax- und KaTeX-Kompatibilität

In allen Frontmattern der Foliensätze ist `math: mathjax` konfiguriert. Die Syntaxüberprüfung ergab:
- **Keine offenen Delimiter:** Alle Inline-Formeln `$ ... $` und Display-Blöcke `$$ ... $$` schließen syntaktisch korrekt ab.
- **Matrix-Umgebungen:** Die `pmatrix`- und `cases`-Umgebungen in Kapitel 07, 08 und 10 sind valide.
- **Kritischer Punkt:** KaTeX und manche Web-Renderer brechen bei führenden oder nachgestellten Leerzeichen innerhalb von `$ ... $` ab. In mehreren Folien finden sich Konstrukte wie `$ u $` oder `$\Delta t $`. Dies sollte bereinigt werden.

### 2.2 Inkonsistente Vektor- und Matrixnotation

Im Curriculum werden drei konkurrierende Notationsstile ohne Erklärung nebeneinander verwendet:

| Kapitel | Vektoren | Matrizen | Differentiale |
| :--- | :--- | :--- | :--- |
| **03 (2D Vektor)** | $\vec{P}, \vec{F}, \vec{u}$ | Matrix (Klassenname) | - |
| **05 (3D OpenGL)** | $N, L, V, R$ (kursiv) / $\vec{v}$ | ModelView (OpenGL API) | - |
| **07 (Statik)** | $\vec{p}_i, \vec{u}, \vec{f}, \vec{e}$ | $K, A, k_{Stab}$ (kursiv) | $\Delta L$ |
| **08 (Dynamik Kont.)** | $x, u, y$ (kursiv, ununterscheidbar von Skalaren) | $A, B$ (kursiv) | $\dot{x}(t), \frac{dx}{dt}, \ddot{y}(t)$ |
| **09 (Dynamik Disk.)** | $\vec{z}(t)$ | - | - |
| **10 (Dynamik Hybrid)** | $x_c, x_d, u, y$ (kursiv) | - | $\dot{y}, \ddot{y}, \dot{v}$ |
| **11 (Epilog)** | $\mathbf{x}, \mathbf{u}, \mathbf{f}$ (bold upright) | $A, K$ | $\mathbf{f}(\mathbf{x}, \mathbf{u}, t)$ |

**Didaktisches Problem:** Für Studierende im Bachelor Automatisierungstechnik ist die Unterscheidung zwischen Skalar-, Vektor- und Matrixgrößen essenziell. Wenn in Kapitel 08 die DGL als $\dot{x} = Ax + Bu$ notiert wird, ohne $x$ und $u$ als Vektoren und $A, B$ als Matrizen typografisch abzugrenzen, wird die Übertragbarkeit auf Systeme höherer Ordnung erschwert.

**Empfehlung (Normierung nach ISO 80000-2):**
- Vektoren: Kleingeschrieben, fett, aufrecht: $\mathbf{x}, \mathbf{u}, \mathbf{f}$ (alternativ konsequent Pfeil $\vec{x}$).
- Matrizen: Großgeschrieben, fett, aufrecht: $\mathbf{K}, \mathbf{A}, \mathbf{B}$.
- Skalare: Kursiv: $m, k, d, t, T$.

### 2.3 Physikalische Einheiten nach DIN 1304 / ISO 80000

Ein wiederkehrender Mangel ist das Setzen von Einheitenzeichen im kursiven Formelsatz:
- Negativbeispiele aus den Folien:
  - Kapitel 03: `Meter $[m]$`, `Pixel $[px]$` $\implies$ sieht aus wie Variablen $m$ und $p \cdot x$.
  - Kapitel 08 (Folie 394): `y_0 = 100\,m`, `v_0 = 0\,m/s`, `g \approx 9.81\,m/s^2`.
  - Kapitel 07 (Folie 332): Stahlsteifigkeit `210 GPa` im Fließtext ohne Umbruchschutz.
- **Korrektur:** Physikalische Einheiten müssen **stets aufrecht (roman)** gesetzt werden, getrennt von der Maßzahl durch ein schmales geschütztes Leerzeichen (`\,`):
  $$y_0 = 100\,\mathrm{m}, \quad v_0 = 0\,\mathrm{m/s}, \quad g = 9{,}81\,\mathrm{m/s^2}, \quad E = 210\,\mathrm{GPa}$$
  Im LaTeX-Quelltext: `$100\,\mathrm{m}$` oder `\text{m}`.

---

## 3. Statik (Kapitel 07): Steifigkeitsmatrix, Koordinatentransformation & LGS

### 3.1 Herleitung der Stabsteifigkeitsmatrix ($k_{Stab}$)

In Abschnitt 7.3 (2D) und 7.4 (3D) wird die Element-Steifigkeitsmatrix elegant über das dyadische Produkt (äußeres Produkt) des Richtungsvektors $\vec{e}$ hergeleitet:
$$\vec{f}_{Stab} = \frac{EA}{L} (\vec{d} \cdot \vec{u}) \vec{d} = \frac{EA}{L} (\vec{d}\vec{d}^T) \vec{u}$$
mit $\vec{d} = (-e_x, -e_y, e_x, e_y)^T$.

**Kritik & Lücke bezüglich Koordinatentransformation:**
In der klassischen Finiten-Elemente-Methode (FEM) und technischen Mechanik wird dieses Ergebnis über eine **Koordinatentransformation** gewonnen:
1. Im lokalen Stabkoordinatensystem $(\xi)$ mit nur 2 axialen Freiheitsgraden gilt:
   $$\mathbf{k}_e^{loc} = \frac{EA}{L} \begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}$$
2. Die Transformation vom globalen Verschiebungsvektor $\mathbf{u}_e = (u_{ix}, u_{iy}, u_{jx}, u_{jy})^T$ auf die lokalen Dehnungen erfolgt über die Transformationsmatrix $\mathbf{T}$:
   $$\mathbf{u}_e^{loc} = \mathbf{T} \mathbf{u}_e, \quad \mathbf{T} = \begin{pmatrix} \cos\alpha & \sin\alpha & 0 & 0 \\ 0 & 0 & \cos\alpha & \sin\alpha \end{pmatrix}$$
3. Die globale Elementsteifigkeitsmatrix ergibt sich aus dem energetischen Prinzip (virtuelle Arbeit):
   $$\mathbf{k}_e^{glob} = \mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}$$

*Didaktische Empfehlung:* Das Curriculum bildet angehende Automatisierungstechniker aus. Die Formulierung über Transformationsmatrizen $\mathbf{T}$ schlägt die Brücke zur Mehrkörperdynamik und Robotik (Rotationsmatrizen, Denavit-Hartenberg). Dieser Zusammenhang sollte zumindest als alternative Herleitung auf einer Vertiefungsfolie dargestellt werden.

### 3.2 Randbedingungen und Lösbarkeit des globalen LGS ($\mathbf{K} \cdot \mathbf{u} = \mathbf{f}$)

Auf Folie 496–503 wird erläutert, dass das ungelagerte System singulär ist (kinematische Starrkörperbewegungen: 3 in 2D, 6 in 3D). Zur Lösung werden zwei Wege erwähnt:
1. Streichen von Zeilen und Spalten (Reduktionsverfahren)
2. Große Diagonalelemente (Penalty-Verfahren)

**Mathematische Ungenauigkeiten:**
- **Inhomogene Randbedingungen:** Die Folien beschreiben nur $u_{1x} = 0$. Was passiert, wenn ein Auflager eine feste Absenkung $\bar{u}$ erfährt (z.B. Fundamentsenkung)?
  Beim Streichen der $i$-ten Zeile und Spalte muss der Lastvektor um die Spaltenbeiträge korrigiert werden:
  $$f_j \leftarrow f_j - K_{ji} \bar{u}_i \quad \forall j \neq i$$
  Wird dies nicht vermittelt, berechnen Studierende Verschiebungen mit falschen Reaktionskräften.
- **Konditionsverschlechterung beim Penalty-Verfahren:** Wird das Diagonalelement $K_{ii}$ auf $10^{15} \cdot K_{\max}$ gesetzt, vergrößert sich die Konditionszahl $\kappa(\mathbf{K}) = \frac{\lambda_{\max}}{\lambda_{\min}}$ dramatisch. Dies führt bei direkten Lösungsverfahren (Gauß) zu massivem Genauigkeitsverlust durch Auslöschung und lässt iterative Löser (Jacobi, CG) scheitern.

### 3.3 Diskrepanz in der C#-Architektur (Abschnitt 7.5)

In Abschnitt 7.5 werden die C#-Klassen `Truss`, `Node` und `Rod` vorgestellt:
```csharp
public class Node {
    public double PositionX, PositionY;
    public bool FixX, FixY;
    public double ForceX, ForceY;
}
public class Rod {
    public Node NodeA, NodeB;
    public double Force; // Nur Stabkraft!
}
```
**Gravierender Bruch:** Diese Klassen spiegeln **ausschließlich das ideale Fachwerk (Gleichgewicht an starren Knoten)** wider!
- Es fehlen der Elastizitätsmodul $E$ und die Querschnittsfläche $A$ im `Rod`.
- Es fehlen die berechneten Verschiebungen $u_x, u_y$ im `Node`.
- Die zuvor über 25 Folien ausführlich hergeleitete elastische Steifigkeitsmatrix $K \cdot u = f$ existiert im Modellcode überhaupt nicht. Studierende erhalten keinen lauffähigen Code für das elastische Fachwerk.

---

## 4. Dynamik Kontinuierlich (Kapitel 08): Solverspektrum & Stabilität

### 4.1 Fehlende Kernalgorithmen: Heun und Runge-Kutta 4 (RK4)

Im Widerspruch zu den Lernzielen und den Zusammenfassungen in Kapitel 11 (wo Euler, Heun und RK4 explizit als Basisrepertoire aufgeführt sind) behandelt Kapitel 08 **ausschließlich**:
- Den expliziten Euler
- Den impliziten Euler (bzw. eine vereinfachte Iteration)
- Den Umgang mit algebraischen Schleifen

**Weder das Verfahren von Heun (Runge-Kutta 2. Ordnung) noch das klassische Runge-Kutta-Verfahren 4. Ordnung (RK4) werden in Kapitel 08 formuliert, hergeleitet oder implementiert!**

#### Notwendige Ergänzung für Kapitel 08:

1. **Verfahren von Heun (RK2 / Prädiktor-Korrektor):**
   $$\begin{aligned}
   k_1 &= f(t_k, x_k) \\
   k_2 &= f(t_k + h, x_k + h \cdot k_1) \\
   x_{k+1} &= x_k + \frac{h}{2} (k_1 + k_2)
   \end{aligned}$$
   Konsistenzordnung: Lokal $\mathcal{O}(h^3)$, global $\mathcal{O}(h^2)$.

2. **Klassisches Runge-Kutta-Verfahren (RK4):**
   $$\begin{aligned}
   k_1 &= f(t_k, x_k) \\
   k_2 &= f(t_k + \frac{h}{2}, x_k + \frac{h}{2} k_1) \\
   k_3 &= f(t_k + \frac{h}{2}, x_k + \frac{h}{2} k_2) \\
   k_4 &= f(t_k + h, x_k + h k_3) \\
   x_{k+1} &= x_k + \frac{h}{6} (k_1 + 2k_2 + 2k_3 + k_4)
   \end{aligned}$$
   Konsistenzordnung: Lokal $\mathcal{O}(h^5)$, global $\mathcal{O}(h^4)$.

### 4.2 Mathematische Stabilitätsanalyse & Dahlquist-Testgleichung

Auf Folie 588 wird qualitativ gezeigt, dass der explizite Euler beim ungedämpften Federpendel Energie erzeugt und instabil wird. Es fehlt jedoch die exakte mathematische Begründung über die **Dahlquist-Testgleichung**:
$$\dot{x} = \lambda x, \quad \lambda \in \mathbb{C}, \quad \text{Re}(\lambda) \le 0$$

- **Expliziter Euler:**
  $$x_{k+1} = (1 + h\lambda) x_k \implies R(z) = 1 + z \quad (z = h\lambda)$$
  Stabilitätsgebiet: $|1 + z| \le 1$ (Kreis um $-1$ mit Radius 1 in der komplexen Ebene).
  Für das ungedämpfte Federpendel liegen die Eigenwerte rein auf der imaginären Achse: $\lambda = \pm i\omega_0$.
  Daher ist $|1 \pm i h \omega_0| = \sqrt{1 + h^2 \omega_0^2} > 1$ für **jedes** $h > 0$.
  *Erkenntnis:* Der explizite Euler ist für ungedämpfte Schwingungssysteme **ausnahmslos instabil**, unabhängig davon, wie klein $h$ gewählt wird!

- **Impliziter Euler:**
  $$x_{k+1} = \frac{1}{1 - z} x_k \implies R(z) = \frac{1}{1 - z}$$
  Stabilitätsgebiet: Außenbereich des Kreises um $+1$ mit Radius 1. Die gesamte linke Halbebene inklusive der imaginären Achse ist stabil (A-stabil).
  Für $\lambda = \pm i\omega_0$ gilt $|R(i h \omega_0)| = \frac{1}{\sqrt{1 + h^2 \omega_0^2}} < 1$.
  *Erkenntnis:* Der implizite Euler dämpft ungedämpfte physikalische Oszillationen künstlich weg (hohe numerische Diffusivität).

### 4.3 Falsch etikettierter Algorithmus: Euler-Cromer vs. Impliziter Euler

Auf den Folien 421–471 (Vertikaler Wurf) und im C#-Code wird als „impliziter Euler“ Folgendes präsentiert:
```csharp
var v_kp1 = v_k - h * g;
var y_kp1 = y_k + h * v_kp1;
```
**Mathematische Richtigstellung:**
Dies ist **nicht** der implizite Euler, sondern der **semi-implizite Euler** (auch **Euler-Cromer** oder **symplektischer Euler** genannt)!
Beim echten impliziten Euler für das gekoppelte System $\dot{y} = v, \dot{v} = f(y, v)$ müssen beide Gleichungen simultan am Punkt $k+1$ gelöst werden:
$$y_{k+1} = y_k + h \cdot v_{k+1}, \quad v_{k+1} = v_k + h \cdot f(y_{k+1}, v_{k+1})$$
Dass beim vertikalen Wurf die Beschleunigung $a = -g$ unabhängig von $y$ ist, verschleiert hier die Tatsache, dass für allgemeine Systeme $f(y, v)$ (wie beim Federpendel $f = -\frac{k}{m}y$) ein simultanes LGS $2 \times 2$ gelöst werden muss:
$$\begin{pmatrix} 1 & -h \\ h \frac{k}{m} & 1 \end{pmatrix} \begin{pmatrix} y_{k+1} \\ v_{k+1} \end{pmatrix} = \begin{pmatrix} y_k \\ v_k \end{pmatrix}$$
Dieser fundamentale Unterschied muss didaktisch klar benannt werden.

---

## 5. Dynamik Diskret & Stochastik (Kapitel 09): Verteilungen & Monte-Carlo

### 5.1 Physikalische Unplausibilität der Normalverteilung für Zeitdauern

In Abschnitt 9.6 (Folie 736–740) wird die Bedienzeit an einer Servicestation wie folgt modelliert:
$$\text{Bedienzeit} \sim \mathcal{N}(\mu, \sigma^2) \quad \text{mit} \quad \mu = 180\,\mathrm{s}, \quad \sigma = 30\,\mathrm{s}$$
Code:
```csharp
var serviceTime = NextNormal(mean: 3 * 60, stdDev: 0.5 * 60);
Add(new DepartureEvent(Clock + serviceTime));
```

**Kritischer physikalischer und numerischer Mangel:**
1. Der Träger (Support) der Gaußschen Normalverteilung ist der gesamte reelle Raum: $x \in (-\infty, +\infty)$.
2. Die Wahrscheinlichkeit $P(\text{Bedienzeit} < 0) = \Phi(-\mu/\sigma)$ ist zwar bei $\mu/\sigma = 6$ winzig ($\approx 10^{-9}$), wird jedoch bei größerem $\sigma$ oder Parametervariationen substanziell (z.B. bei $\mu=10, \sigma=4 \implies P(X < 0) \approx 0{,}62\,\%$).
3. **Numerische Katastrophe in diskreten Event-Simulatoren:**
   Liefert `NextNormal` einen negativen Wert, so gilt $t_{\text{departure}} = \text{Clock} + \text{serviceTime} < \text{Clock}$.
   Das Ereignis wird **in der Vergangenheit** geplant! Die sortierte Ereignisliste verliert ihre Monotonie-Invariante ($t_1 \le t_2 \le \dots$), oder die Simulationsuhr springt rückwärts.
4. **Empfehlung:**
   - Für Zeitdauern in Warteschlangensystemen dürfen ausschließlich **strikt positive Verteilungen** verwendet werden:
     - **Log-Normalverteilung:** $X = e^{\mu + \sigma Z}$
     - **Weibull- oder Gamma-Verteilung**
   - Falls die Normalverteilung aus didaktischen Gründen beibehalten wird, muss sie zwingend trunkiert werden:
     ```csharp
     double serviceTime = Math.Max(minServiceTime, NextNormal(rnd, mean, stdDev));
     ```

### 5.2 Pseudo-Zufall und Seed-Management bei Multithreading

Auf Folie 1030 und 1127 wird folgende Parallelisierung empfohlen:
```csharp
Parallel.For(0, N, i => {
    var rnd = new Random(seed: baseSeed + i);
    var sim = new QueueSimulation(rnd);
    sim.Run();
    results.Add(sim.AverageWaitTime);
});
```

**Numerisches Risiko:**
Klassische Kongruenzgeneratoren (LCG) und der ältere .NET-Framework-Subtraktionsgenerator weisen bei aufeinanderfolgenden linearen Seeds ($s_0, s_0+1, s_0+2, \dots$) im Phasenraum starke Korrelationen in den Anfangszahlen auf (Hyperplane-Effekt, Satz von Marsaglia).
- In modernem .NET (.NET 6+) nutzt `System.Random` zwar Xoshiro128+, dennoch ist das Ableiten paralleler PRNGs über additive Seeds nicht dem Standard stochastischer Simulationen angemessen.
- *Best Practice:* Verwendung von kryptografisch gestreuten Seeds (Hashing: `Hash(baseSeed ^ i)`) oder Generatoren mit garantierter Stromtrennung (SplitMix64, PCG64).

### 5.3 Konfidenzintervalle & Welford-Algorithmus

Die mathematische Formulierung des zentralen Grenzwertsatzes, der Konvergenzrate $\mathcal{O}(1/\sqrt{N})$ und der $95\%$-Konfidenzintervalle ist exzellent und fehlerfrei.
Einziger numerischer Kritikpunkt im Code (Folie 1135):
```csharp
double mean = results.Average();
double variance = results.Sum(x => Math.Pow(x - mean, 2)) / (results.Count - 1);
```
- Dies erfordert zwei vollständige Durchläufe über alle $N = 10\,000$ (oder $10^7$) im Speicher gepufferten Elemente in `results` (`ConcurrentBag<double>`).
- Bei großen Monte-Carlo-Studien führt das zu erheblichem Speicher- und GC-Druck.
- *Numerische Verbesserung:* Der **Welford-Algorithmus** (1962) berechnet Mittelwert und Varianz numerisch stabil in einem einzigen Durchlauf (Single-Pass Online-Algorithmus) ohne Speicherung der Einzelwerte:
  $$M_k = M_{k-1} + \frac{x_k - M_{k-1}}{k}, \quad S_k = S_{k-1} + (x_k - M_{k-1})(x_k - M_k)$$
  wobei $s^2 = \frac{S_N}{N-1}$.

---

## 6. Partielle Differentialgleichungen & Diffusion (Kapitel 02): 5-Punkt-Stern & Stabilität

### 6.1 Gravierender Dimensions- und Formelfehler in der Zeitdiskretisierung

Auf Folie 455 wird der 5-Punkt-Differenzenstern für den Laplace-Operator definiert:
$$\Delta T_{i,j} \approx \frac{T_{i+1,j} + T_{i-1,j} + T_{i,j+1} + T_{i,j-1} - 4 T_{i,j}}{h^2}$$
Direkt darunter steht auf Folie 458:
$$T_{i,j}^{n+1} = T_{i,j}^n + \Delta t \cdot \left[ \frac{\alpha}{h^2} \Delta T_{i,j} + Q_{i,j} \right]$$

**Mathematische Begründung des Fehlers:**
Wenn in der ersten Formel $\Delta T_{i,j}$ bereits durch $h^2$ geteilt wurde, so teilt die zweite Formel **erneut** durch $h^2$. Das entspräche einer Division durch $h^4$ und ist dimensionsanalytisch vollkommen falsch!
- Physikalische Dimension: $[\frac{\alpha}{h^2} \Delta T] = \frac{\mathrm{m^2/s}}{\mathrm{m^2}} \cdot \frac{\mathrm{K}}{\mathrm{m^2}} = \frac{\mathrm{K}}{\mathrm{m^2 \cdot s}} \neq \frac{\mathrm{K}}{\mathrm{s}}$.

**Korrekturmöglichkeiten:**
- *Variante A (konsistente Differentialoperatoren):*
  $$\nabla^2 T_{i,j} \approx \frac{T_{i+1,j} + T_{i-1,j} + T_{i,j+1} + T_{i,j-1} - 4 T_{i,j}}{h^2}$$
  $$T_{i,j}^{n+1} = T_{i,j}^n + \Delta t \cdot \left[ \alpha \cdot \nabla^2 T_{i,j} + Q_{i,j} \right]$$
- *Variante B (diskreter Differenzenstern $L_{i,j}$):*
  $$L_{i,j} = T_{i+1,j} + T_{i-1,j} + T_{i,j+1} + T_{i,j-1} - 4 T_{i,j}$$
  $$T_{i,j}^{n+1} = T_{i,j}^n + \frac{\alpha \Delta t}{h^2} L_{i,j} + \Delta t \cdot Q_{i,j}$$

Der im C#-Code (Folie 503–507) programmierte Algorithmus verwendet erfreulicherweise Variante B (`DiffCoeff * laplace`), wodurch der Code funktioniert, die Folienformel darüber jedoch im Widerspruch zum Code steht.

### 6.2 Fachliche Präzisierung: „CFL-Bedingung“ vs. Von-Neumann-Stabilitätsgrenze

Auf Folie 479 wird die Stabilitätsgrenze als **„Numerische Stabilitätsbedingung (CFL)“** betitelt:
$$s = \frac{\alpha \cdot \Delta t}{h^2} \le \frac{1}{4} = 0{,}25$$

**Numerische und begriffliche Präzisierung:**
- Die **CFL-Bedingung** (Courant-Friedrichs-Lewy, 1928) gilt streng genommen für **hyperbolische** partielle Differentialgleichungen (Wellengleichung, Advektion):
  $$C = \frac{c \cdot \Delta t}{\Delta x} \le 1$$
  Sie besagt, dass der numerische Abhängigkeitsbereich den physikalischen Abhängigkeitsbereich überdecken muss.
- Bei der Wärmeleitungsgleichung handelt es sich jedoch um eine **parabolische** PDE mit unendlicher Ausbreitungsgeschwindigkeit.
- Die Grenze $s \le 0{,}25$ (in 2D) bzw. $s \le 0{,}5$ (in 1D) resultiert aus der **Von-Neumann-Stabilitätsanalyse** (Fourier-Moden) oder dem **diskreten Maximumprinzip** (Verhinderung negativer Gewichte für den zentralen Gitterpunkt):
  $$T_{i,j}^{n+1} = (1 - 4s) T_{i,j}^n + s (T_{i+1,j}^n + T_{i-1,j}^n + T_{i,j+1}^n + T_{i,j-1}^n)$$
  Damit $T_{i,j}^{n+1}$ eine konvexe Linearkombination der Nachbarwerte bleibt (kein Wärmeabfluss gegen das Temperaturgefälle), muss $1 - 4s \ge 0 \implies s \le \frac{1}{4}$ gelten.
- *Empfehlung:* Diesen Zusammenhang explizit benennen: *„Von-Neumann-Stabilitätskriterium (im Ingenieurbereich oft verallgemeinernd als CFL-Bedingung bezeichnet)“*.

---

## 7. Hybride Dynamik & Nulldurchgang (Kapitel 10): Bisektion & Zeno-Effekt

### 7.1 Mängel in der Nulldurchgangs-Logik (Section 10.5)

Auf Folie 913–925 wird folgender Solver-Code für die Nulldurchgangsdetektion gezeigt:
```csharp
timeStep = timeStepMax * 2; RememberStates();

while (zeroCrossingValue > Threshold && iteration++ < Limit)
{
    timeStep /= 2; ResetStates();
    IntegrateContinuousStates(timeStep);
    CalculateOutputs(time + timeStep);
    zeroCrossingValue = CalculateZeroCrossings(time + timeStep);
}
```

**Mathematische Schwachstellen:**
1. **Keine echte Bisektion:** Echtes Bisektions-Root-Finding benötigt ein signiertes Intervall $[a, b]$ mit $f(a) \cdot f(b) < 0$. Das ständige Halbieren von `timeStep` vom linken Intervallrand ausgehend kann Nulldurchgänge nicht lokalisieren, die z.B. bei $t + 0{,}75 \Delta t$ liegen! Es nähert sich lediglich dem Zeitpunkt $t$ an.
2. **Vorzeichen-Asymmetrie:** Die Abbruchbedingung `zeroCrossingValue > Threshold` funktioniert nur, wenn die Überwachungsfunktion von oben gegen Null konvergiert. Wenn $z(t)$ von negativen Werten kommt (z.B. Annäherung von unten), terminiert die Schleife sofort fehlerhaft.
3. **Korrekter Algorithmus:** Brent-Dekker-Verfahren oder klassische Bisektion über Vorzeichenwechsel:
   ```csharp
   double t_left = t, t_right = t + dt;
   while ((t_right - t_left) > tol) {
       double t_mid = 0.5 * (t_left + t_right);
       IntegrateTo(t_mid);
       if (Math.Sign(z(t_mid)) == Math.Sign(z(t_left)))
           t_left = t_mid;
       else
           t_right = t_mid;
   }
   ```

### 7.2 Das ungelöste Zeno-Phänomen beim Bouncing Ball

Der Restitutionskoeffizient $e \in [0, 1)$ führt beim Bouncing Ball zu einer geometrischen Reihe der Sprungdauern:
$$\Delta t_k = 2 \frac{v_0}{g} e^k \implies t_{\infty} = t_0 + \frac{2 v_0}{g (1 - e)} < \infty$$
In endlicher Zeit $t_{\infty}$ treten **unendlich viele Kollisionen** auf (Zeno-Verhalten).
- Ohne Schwellenwert-Umschaltung in einen **Haftzustand (Sticking / Contact Mode)** friert die Zeitschrittweitensteuerung des Solvers bei $t \to t_{\infty}$ ein, da $\Delta t \to 0$ erzwungen wird.
- Dieser klassische Stolperstein hybrider Systeme sollte in Kapitel 10 unbedingt theoretisch und algorithmisch erörtert werden.

---

## 8. Detaillierter Mängelkatalog mit Handlungsempfehlungen

| Nr. | Kapitel | Fundstelle | Problem / Befund | Korrekturvorschlag |
| :--- | :--- | :--- | :--- | :--- |
| **M1** | **Kap. 02** | Folie 458 | Doppelter Faktor $\frac{1}{h^2}$ in Wärmeleitungs-Update. | Ersetzen durch $T_{i,j}^{n+1} = T_{i,j}^n + \Delta t \left[ \alpha \nabla^2 T_{i,j} + Q_{i,j} \right]$. |
| **M2** | **Kap. 02** | Folie 479 | Begriffsverwechslung CFL vs. Von-Neumann-Diffusionslimit. | Klären: CFL = advektiv/hyperbolisch; $s \le 0{,}25$ = Von-Neumann / Maximumprinzip. |
| **M3** | **Kap. 07** | Folie 442–468 | Lokale Transformationsmatrix $T$ fehlt bei Herleitung von $k_{Stab}$. | Einschub: $k_{glob} = T^T k_{loc} T$ als Brücke zu Robotik & Koordinatentransformationen. |
| **M4** | **Kap. 07** | Folie 496–503 | Inhomogene Dirichlet-RB und Penalty-Konditionszahl unvollständig. | Formel für Lastvektoranpassung $f_j - K_{ji}\bar{u}_i$ und Warnung vor $\kappa(K)$-Explosion ergänzen. |
| **M5** | **Kap. 07** | Folie 858–905 | C#-Code implementiert nur ideales, nicht elastisches Fachwerk. | `Rod`-Klasse um $E, A$ und `Node`-Klasse um Verschiebungsergebnisse $u_x, u_y$ erweitern. |
| **M6** | **Kap. 08** | Folie 1–1397 | **Heun und Runge-Kutta 4 fehlen komplett im Kapitel!** | Dedizierten Abschnitt 8.6 einfügen mit Herleitung, Butcher-Tableau und C#-Solver für RK4. |
| **M7** | **Kap. 08** | Folie 421–471 | Euler-Cromer wird als „impliziter Euler“ deklariert. | Umbenennen in Symplektischer Euler / Euler-Cromer; echten impliziten Euler mit Systemmatrix zeigen. |
| **M8** | **Kap. 08** | Folie 588–604 | Dahlquist-Stabilitätsanalyse fehlt (warum Euler explizit divergiert). | Eigenwertbetrachtung $R(z) = 1+z$ auf imaginärer Achse ($|1+ih\omega| > 1$) ergänzen. |
| **M9** | **Kap. 09** | Folie 736–740 | Normalverteilung für Zeitdauern erlaubt negative Zeiten ($t < 0$). | Auf Log-Normal oder getrinkte Normalverteilung umstellen; Kausalitätsverletzung ansprechen. |
| **M10** | **Kap. 09** | Folie 1030, 1127 | `new Random(baseSeed + i)` birgt Korrelationsrisiken. | Auf moderne PRNGs hinweisen oder Hash-basierte Seeds nutzen. |
| **M11** | **Kap. 10** | Folie 913–925 | Solver-Code ist keine Bisektion, sondern sukzessive Intervallhalbierung. | Echten Bisektionsalgorithmus über Vorzeichenwechsel $z(a)\cdot z(b) < 0$ abbilden. |
| **M12** | **Kap. 10** | Folie 180–198 | Zeno-Effekt beim Bouncing Ball nicht abgefangen. | Schwellenwert für Geschwindigkeitsabbruch ($v < v_{tol} \implies \text{Haftreibung}$) einbauen. |
| **M13** | **Global** | Alle Decks | Uneinheitliche Vektor-/Matrixschreibweise und kursive Einheitensymbole. | Vereinheitlichung: Vektoren $\mathbf{x}$ oder $\vec{x}$, Matrizen $\mathbf{A}$, Einheiten $\mathrm{m}, \mathrm{s}, \mathrm{kg}$. |

---

## 9. Fazit

Die Vorlesungsunterlagen besitzen ein hervorragendes didaktisches Fundament und eine vorbildliche Verzahnung von Theorie und C#-Praxis. Um das Material auf universitäres / forschungsnahes Fachhochschul-Niveau zu heben, sollten vor allem die **Auslassung von Heun/RK4 in Kapitel 08**, der **Doppelungsfehler in der PDE-Gleichung (Kapitel 02)** sowie die **stochastische Kausalität (Kapitel 09)** zeitnah nachgebessert werden. Der vorliegende Bericht liefert hierfür die vollständige mathematische Grundlage.
