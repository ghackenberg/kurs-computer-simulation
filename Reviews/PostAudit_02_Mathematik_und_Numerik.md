# Post-Audit: Mathematische Exaktheit, physikalische Plausibilität und numerische Robustheit

**Dokument-ID:** `Reviews/PostAudit_02_Mathematik_und_Numerik.md`  
**Gegenstand:** Umfassendes Re-Audit der 12 MARP-Foliensätze (`Folien/00_Prolog` bis `Folien/11_Epilog`) nach Durchführung der Refactoring-Phasen 1 bis 4  
**Referenzdokument:** `Reviews/02_Mathematik_und_Numerik.md` (Initialgutachten)  
**Zielgruppe:** Studiengangsleitung, Lehrende und Modulverantwortliche im Studiengang *Automatisierungstechnik / Mechatronik* (FH Oberösterreich, Campus Wels)  
**Datum:** 7. Oktober 2026  
**Status:** Abgeschlossener Prüfbericht mit Revisionsvergleich, Mängelkatalog und Handlungsempfehlungen  

---

## 1. Executive Summary & Audit-Gesamturteil

Im Rahmen dieses Post-Audits wurden sämtliche 12 Vorlesungskapitel der Lehrveranstaltung *Systemsimulation / Digitaler Zwilling* einer detaillierten mathematischen, physikalischen und numerischen Re-Evaluation unterzogen. Gegenstand der Prüfung war der aktuelle Bearbeitungsstand nach Umsetzung der Qualitätsinitiativen (Phasen 1–4, Commits `62dfc58` bis `4599c72`).

### 1.1 Wesentliche Fortschritte gegenüber dem Initialgutachten
Gegenüber dem Ausgangsbefund (`Reviews/02_Mathematik_und_Numerik.md`) konnte eine **substanzielle Hebung des mathematisch-numerischen Niveaus** festgestellt werden. Nahezu alle gravierenden Kritikpunkte wurden gezielt adressiert:
- **Kapitel 08 (Kontinuierliche Dynamik):** Das gravierendste Manko – das vollständige Fehlen höherer Runge-Kutta-Verfahren – wurde durch die Neuschaffung von Abschnitt 8.6 vollständig geheilt. Das Heun-Verfahren (RK2) und das klassische RK4 wurden inklusive Butcher-Tableaux, Simpson-Quadratur und C#-Solver vorbildlich integriert. Zudem wurde die Dahlquist-Stabilitätsanalyse für gedämpfte Systeme sowie für ungedämpfte Oszillatoren auf der Imaginärachse ($\lambda = \pm i\omega_0$) mit exakter Stabilitätsschranke $h \le 2\sqrt{2}/\omega_0 \approx 2{,}828/\omega_0$ mathematisch rigoros hergeleitet.
- **Kapitel 08 (Euler-Cromer):** Der semi-implizite Euler beim vertikalen Wurf wurde von der irreführenden Bezeichnung „impliziter Euler“ befreit, als symplektisches Verfahren ausgewiesen und dessen Phasengleichheit/Volumenerhaltung ($\det(\mathbf{J}) \equiv 1$) theoretisch untermauert.
- **Kapitel 02 (Wärmeleitung / PDE):** Der dimensionsanalytische Formelfehler in der Zeitdiskretisierung ($s \cdot L_{i,j}$) wurde behoben. Die Stabilitätsgrenze $s \le 0{,}25$ wurde sauber als Von-Neumann-Kriterium bzw. diskretes Maximumprinzip herausgearbeitet und von der hyperbolischen CFL-Bedingung abgegrenzt.
- **Kapitel 09 (Diskrete Dynamik):** Der stochastische Kausalitätsbruch ($T < 0$) der Normalverteilung für Zeitdauern in der `PriorityQueue` wird nun explizit als Antipattern demonstriert. Als physikalisch kausale Lösung wurde die Log-Normalverteilung mit exakter Momenten-Umrechnung ($\sigma^2 = \ln(1 + s^2/m^2)$) und Box-Muller-Erzeugung implementiert. Der Welford-Algorithmus (1-Pass) inklusive parallelem Chan-Merge (`ParallelWelfordAccumulator`) sowie `HashCode.Combine` beim PRNG-Seeding wurden vorbildlich integriert.
- **Kapitel 10 (Hybride Systeme):** Die Nulldurchgangsdetektion wurde von der naiven Zeitschritthalbierung auf eine mathematisch echte Intervall-Bisektion mit Vorzeichenwechsel-Kriterium ($\text{sgn}(z_a) \neq \text{sgn}(z_b)$) umgestellt. Die Zeno-Problematik wird explizit behandelt und durch eine Haftschwelle (`nearZero`-Bedingung mit Moduswechsel) numerisch beherrscht.

### 1.2 Verbleibende Defizite und Handlungsfelder
Trotz dieser signifikanten Fortschritte existieren noch mehrere methodische Lücken, notationelle Uneinheitlichkeiten und didaktische Anschlussfehler:
1. **Notationsdualismus:** Das Curriculum wechselt kapitelweise zwischen Pfeilschreibweise ($\vec{x}$, Kap. 03, 05, 07), reiner Fettschrift ($\mathbf{x}$, Kap. 08 tlw., Kap. 11) und ununterscheidbaren kursiven Skalarbuchstaben ($x, u$, Kap. 08, 09, 10).
2. **Physikalische Einheiten (DIN 1304 / ISO 80000):** An zahlreichen Stellen stehen Einheiten noch kursiv im Mathematikmodus (z.B. `$[m]$`, `$[px]$` in Kap. 03; `$100\,m$`, `$-0.981\,m/s$` in Kap. 08).
3. **Koordinatentransformation (Kap. 07):** Die Stabsteifigkeitsmatrix wird ausschließlich über das dyadische Vektorprodukt hergeleitet. Die in der FEM und Robotik fundamentale Formulierung über die Element-Transformationsmatrix $\mathbf{T}$ ($\mathbf{k}_e^{glob} = \mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}$) fehlt weiterhin.
4. **Randbedingungen bei PDEs (Kap. 02):** Die Wärmeleitungssimulation führt Dirichlet- und Neumann-Randbedingungen theoretisch überhaupt nicht ein; die C#-Schleife spart lediglich die Ränder aus, was ein unkommentiertes homogenes Dirichlet-Verhalten erzeugt.
5. **Code-Diskrepanz im Fachwerk (Kap. 07):** Abschnitt 7.5 zeigt im Folientext die Klassen des *idealen* Fachwerks (ohne $E, A, u$), obwohl zuvor 30 Folien lang das *elastische* Fachwerk hergeleitet wurde.
6. **A-Stabilität vs. Picard-Iteration (Kap. 08):** Der „implizite Euler“ nutzt eine gedämpfte Picard-Fixpunktiteration. Es fehlt der explizite Hinweis, dass dadurch bei steifen Systemen die unbedingte A-Stabilität verloren geht und wieder eine Schrittweitenbeschränkung ($h < 1/L$) greift.

---

## 2. Formelkonsistenz & Notationsstandards

### 2.1 Quervergleich der Notationskonventionen (Kapitel 00 bis 11)

Die nachfolgende Tabelle dokumentiert den Status quo der mathematischen Typografie über das gesamte Curriculum:

| Kapitel | Skalare | Vektoren | Matrizen | Differentiale / Ableitungen | Konformität ISO 80000-2 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **00 (Prolog)** | $a, b, x$ (kursiv) | - | - | - | Sehr gut |
| **01 (Einführung)** | $m, g, t, v_0$ (kursiv) | $\vec{v}$ (nur vereinzelt) | - | $y'(t), \dot{y}(t)$ | Gut |
| **02 (Pixel/PDE)** | $x, y, t, \alpha, h, s$ | - | - | $\frac{\partial T}{\partial t}, \Delta T, \nabla^2 T$ | Exzellent |
| **03 (Vektor 2D)** | $L, W, F_x, F_y$ | $\vec{P}, \vec{F}, \vec{u}, \vec{u}^\perp$ | - | - | Gut (Pfeilschreibweise) |
| **04 (Diagramme)** | $t, x, \mu, \sigma$ | - | - | $\dot{x}(t)$ | Gut |
| **05 (OpenGL 3D)** | $r, h, \theta, \phi$ | $\vec{v}, \vec{n}, \vec{p}, \vec{eye}$ | $M_{\text{model}}$ (kursiv) vs. $\mathbf{T}, \mathbf{R}$ (fett) | - | Heterogen bei Matrizen |
| **07 (Statik)** | $L, E, A, S$ | $\vec{p}, \vec{u}, \vec{f}, \vec{e}, \Delta\vec{u}$ | $k_{Stab}, K, k_{BB}$ (kursiv) | - | Uneinheitlich (Vektor Pfeil, Matrix kursiv) |
| **08 (Dynamik Kont.)** | $m, d, k, t, h$ | $x, u$ (kursiv) vs. $\mathbf{x}, \mathbf{u}, \mathbf{k}_i$ (fett) | $A, B$ (kursiv) vs. $\mathbf{A}, \mathbf{J}$ (fett) | $\dot{x}, \ddot{y}, \frac{dx}{dt}, \dot{\mathbf{x}}$ | **Starker Bruch** zwischen Abschn. 8.1–8.5 und 8.6 |
| **09 (Dynamik Disk.)** | $\lambda, \mu, \sigma, t$ | - | - | - | Exzellent |
| **10 (Dynamik Hybrid)**| $t, h, \Delta t$ | $x_c, x_d, u, y, z$ (kursiv) | - | $\dot{x}_c, \ddot{y}, \dot{v}$ | Problematisch (Vektoren kursiv skalar) |
| **11 (Epilog)** | $t, k, \omega$ | $\mathbf{x}, \mathbf{u}, \mathbf{f}$ (fett) | $A, K$ (kursiv) | $\dot{\mathbf{x}}, \dot{x}$ (gemischt) | Teilweise harmonisiert |

### 2.2 Analyse der Brüche & Didaktische Risiken

1. **Vektornotation in dynamischen Systemen (Kapitel 08 & 10):**
   - In Abschnitt 8.1 wird das Feder-Dämpfer-System eingeführt:
     $$\dot{x} = Ax + Bu$$
     Hier sind $x \in \mathbb{R}^2$ der Zustandsvektor, $u \in \mathbb{R}^1$ die Stellgröße, $A \in \mathbb{R}^{2 \times 2}$ die Systemmatrix und $B \in \mathbb{R}^{2 \times 1}$ der Eingangsvektor. Da alle Variablen in normalem Kursivsatz stehen, können Studierende Vektoren, Matrizen und Skalare optisch nicht differenzieren.
   - Im neu ergänzten Abschnitt 8.6 wird dagegen standardmäßig die moderne ISO-Norm verwendet:
     $$\mathbf{k}_i = \mathbf{f}(t_k + c_i h, \mathbf{x}_k + h \sum a_{ij} \mathbf{k}_j), \quad \mathbf{x}_{k+1} = \mathbf{x}_k + h \sum b_i \mathbf{k}_i$$
   - In Kapitel 10 (S-Function) wird wieder zu reinem Kursivsatz ($x_c, x_d, u, y, z$) zurückgekehrt, obwohl es sich bei $x_c$ und $x_d$ um Arrays/Vektoren handelt.

2. **Heterogene Matrixdarstellung in Kapitel 05 & 07:**
   - In Kapitel 05 steht auf Folie 651: $\vec{v}_{\text{world}} = M_{\text{model}} \cdot \vec{v}_{\text{obj}}$ (Vektor mit Pfeil, Matrix als kursiver Großbuchstabe mit Index). Auf Folie 1266 steht für denselben mathematischen Sachverhalt: $\mathbf{T}_{\text{TCP}} = \mathbf{T}_{\text{Base}} \cdot \mathbf{R}_1(\theta_1) \dots$ (fette Großbuchstaben ohne Pfeile).
   - In Kapitel 07 steht $K \cdot \vec{u} = \vec{f}$ bzw. $k_{BB} \cdot \vec{u}_B = \vec{f}_B - k_{BA} \cdot \vec{u}_A$. Hier werden Vektoren mit Pfeil versehen, die Steifigkeitsmatrizen aber als kursive Skalarbuchstaben ($K, k_{BB}$) notiert.

### 2.3 Physikalische Einheiten nach DIN 1304 / ISO 80000

Nach internationaler Normung (ISO 80000-1, DIN 1304) müssen physikalische Einheitensymbole grundsätzlich **aufrecht (roman)** gesetzt werden, um Verwechslungen mit Variablen (z.B. $m$ für Masse vs. $\mathrm{m}$ für Meter) auszuschließen. Zwischen Maßzahl und Einheit gehört ein schmales, geschütztes Leerzeichen (`\,`).

#### Konkrete Befunde fehlerhafter Einheiten:
1. **Kapitel 03 (Folien 118, 128):**
   - *Ist:* `Meter $[m]$`, `Pixel $[px]$`.
   - *Kritik:* Das Dollar-Zeichen setzt die Klammern und Buchstaben in den Mathematikmodus. Das sieht typografisch aus wie die Multiplikation zweier Variablen $[p \cdot x]$ bzw. die Variable Masse $[m]$.
   - *Korrektur:* Fließtext `Meter [m]` bzw. `Meter ($\mathrm{m}$)` und `Pixel [px]`.
2. **Kapitel 08 (Folien 399–409):**
   - *Ist:* `$y_0 = 100\,m$`, `$v_0 = 0\,m/s$`, `$g \approx 9.81\,m/s^2$`, `$v_1 = -0.981\,m/s$`.
   - *Kritik:* Die Einheiten $m$, $s$ stehen kursiv. Im selben Kapitel wird auf Folie 500 bereits `$v(0.1) = -0{,}981\,\text{m/s}$` korrekt gesetzt.
   - *Korrektur:* Konsequent `$y_0 = 100\,\mathrm{m}$`, `$v_0 = 0\,\mathrm{m/s}$`, `$g = 9{,}81\,\mathrm{m/s^2}$`.
3. **Kapitel 02 (Folie 470):**
   - *Ist:* `Temperaturleitfähigkeit [$\text{m}^2/\text{s}$]`.
   - *Kritik:* Die eckigen Klammern stehen außerhalb, das Innere ist im Mathemodus gesetzt; im deutschen Schriftsatz ist `\mathrm{m^2/s}` vorzuziehen.

---

## 3. Mathematische Exaktheit der Modellierung (Schwerpunktprüfung)

### 3.1 Kapitel 02: 2D-Wärmeleitungsgleichung & Randbedingungen

#### 3.1.1 Status der PDE-Diskretisierung
Die Formulierung der 2D-Wärmeleitungsgleichung und deren zeitliche Diskretisierung auf den Folien 467–491 ist nun dimensionsanalytisch und numerisch absolut exakt:
$$\frac{\partial T}{\partial t} = \alpha \cdot \Delta T + Q(x, y, t)$$
$$\nabla^2 T_{i,j} \approx \frac{T_{i+1,j} + T_{i-1,j} + T_{i,j+1} + T_{i,j-1} - 4 T_{i,j}}{h^2}$$
$$T_{i,j}^{n+1} = T_{i,j}^n + s \cdot L_{i,j} + \Delta t \cdot Q_{i,j} \quad \text{mit} \quad s = \frac{\alpha \Delta t}{h^2}$$
mit dem diskreten Laplace-Stern $L_{i,j} = T_{i+1,j} + T_{i-1,j} + T_{i,j+1} + T_{i,j-1} - 4 T_{i,j}$. Der im Initialgutachten monierte doppelte Faktor $1/h^2$ wurde restlos getilgt.

#### 3.1.2 Von-Neumann-Stabilität & Diskretes Maximumprinzip
Die Ausweisung der Grenze $s \le 0{,}25$ auf Folie 516–524 als Von-Neumann-Kriterium bzw. diskretes Maximumprinzip ist fachlich präzise:
$$T_{i,j}^{n+1} = (1 - 4s) T_{i,j}^n + s \left( T_{i+1,j}^n + T_{i-1,j}^n + T_{i,j+1}^n + T_{i,j-1}^n \right)$$
Die Erläuterung, warum $1 - 4s \ge 0$ gelten muss (konvexe Linearkombination, Verhinderung unphysikalischer Oszillationen und negativer Gewichte), bietet einen exzellenten didaktischen Mehrwert. Die begleitende Hinweis-Box stellt die begriffliche Trennung zur advektiven/hyperbolischen CFL-Bedingung ($c \Delta t / h \le 1$) mustergültig klar.

#### 3.1.3 Gravierende Lücke: Randbedingungen (Dirichlet & Neumann)
Ein zentraler mathematischer Bestandteil jeder PDE-Simulation fehlt im Foliensatz vollständig: **die Definition und Behandlung von Randbedingungen (Boundary Conditions, BC)**.
- **Befund im C#-Code (Folie 535–545):**
  ```csharp
  Parallel.For(1, Height - 1, y => {
      for (int x = 1; x < Width - 1; x++) { ... }
  });
  ```
- **Mathematische Konsequenz:** Die Schleife iteriert ausschließlich über die inneren Gitterpunkte `[1..Width-2]`. Die Randpixel $x=0, x=\text{Width}-1, y=0, y=\text{Height}-1$ werden niemals aktualisiert. Sie verharren permanent auf ihrem Initialwert (z.B. $0{,}0^\circ\text{C}$).
- **Kritik:**
  1. Das entspricht einer statischen **homogenen bzw. inhomogenen Dirichlet-Randbedingung** ($T_{\text{Rand}} = \text{const}$), wird den Studierenden jedoch an keiner Stelle als solche erklärt.
  2. In der industriellen Praxis der thermischen Simulation sind jedoch isolierte bzw. adiabatische Wände (**homogene Neumann-Randbedingungen**, $\frac{\partial T}{\partial n} = 0$) der absolute Regelfall.
  3. Den Studierenden wird vorenthalten, wie Neumann-Ränder diskretisiert werden (über einseitige Differenzen oder Ghost Cells: $T_{-1, j} = T_{1, j} \implies L_{0,j} = 2 T_{1,j} + T_{0,j+1} + T_{0,j-1} - 4 T_{0,j}$).

---

### 3.2 Kapitel 07: Statische Modelle, Steifigkeitsmatrizen & LGS

#### 3.2.1 Herleitung der Stabsteifigkeitsmatrix ($k_{Stab}$)
Die Herleitung in Abschnitt 7.3 (2D) und 7.4 (3D) basiert auf der geometrischen Linearisierung der Stablängenänderung:
$$\Delta L \approx \vec{e} \cdot (\vec{u}_j - \vec{u}_i)$$
und der nachfolgenden Kraftprojektion über das dyadische Produkt:
$$\vec{f}_{Stab} = \frac{EA}{L} (\vec{d} \cdot \vec{u}) \vec{d} = \frac{EA}{L} (\vec{d}\vec{d}^T) \vec{u}$$
mit $\vec{d} = (-e_x, -e_y, e_x, e_y)^T$. Die resultierende symmetrische $4 \times 4$- bzw. $6 \times 6$-Matrix ist mathematisch fehlerfrei dargestellt.

#### 3.2.2 Fehlende FEM-Koordinatentransformation ($\mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}$)
Obwohl die dyadische Herleitung mathematisch elegant ist, stellt das Fehlen der klassischen Koordinatentransformation eine didaktische Lücke dar:
- In der Finite-Elemente-Methode und Mehrkörperdynamik wird ein Stab originär in seinem lokalen Hauptachsensystem $(\xi)$ mit 1 Freiheitsgrad pro Knoten betrachtet:
  $$\mathbf{k}_e^{loc} = \frac{EA}{L} \begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}$$
- Die Projektion in das globale kartesische Koordinatensystem erfolgt über die Richtungs-Kosinus-Matrix $\mathbf{T}$:
  $$\mathbf{T} = \begin{pmatrix} e_x & e_y & 0 & 0 \\ 0 & 0 & e_x & e_y \end{pmatrix}, \quad \mathbf{k}_e^{glob} = \mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}$$
- *Bewertung:* Da die Studierenden parallel Lehrveranstaltungen in Robotik und Mechatronik belegen, wo homogene Koordinatentransformationen Kernbestandteil sind, sollte dieser Zusammenhang als didaktische Brücke auf einer Zusatzfolie gezeigt werden.

#### 3.2.3 Randbedingungen & LGS-Lösungsverfahren
- **Inhomogene Randbedingungen:** Auf Folie 823 wird das Gleichungssystem für vorgeschriebene Lagerverschiebungen $\vec{u}_A$ nun korrekt block-partitioniert dargestellt:
  $$k_{BB} \cdot \vec{u}_B = \vec{f}_B - k_{BA} \cdot \vec{u}_A$$
  Damit ist der Einbau elastischer Setzungen mathematisch exakt beschrieben.
- **LU- vs. Cholesky-Zerlegung:** Folie 825–833 stellt die Verfahrenswahl exzellent gegenüber:
  - Ideales Fachwerk ($A \cdot x = b$): Unsymmetrisch $\implies$ LU-Zerlegung mit partieller Pivotisierung.
  - Elastisches Fachwerk ($k_{BB} \cdot u_B = f_B'$): Symmetrisch positiv definit (SPD) $\implies$ Cholesky-Zerlegung ($L L^T$).
  - Der Laufzeitvorteil (Cholesky ist $2\times$ schneller und benötigt halb so viel Speicher) sowie die Warnung vor expliziter Matrixinversion (`A.Inverse()`) entsprechen modernsten numerischen Standards.

#### 3.2.4 Diskrepanz in der C#-Architektur (Abschnitt 7.5)
In Abschnitt 7.5 (Folien 882–925) besteht weiterhin eine Diskrepanz zwischen Theorie und Code:
- Die gezeigte `Node`-Klasse enthält nur `PositionX, PositionY, FixX, FixY, ForceX, ForceY`. Es fehlen die Berechnungsfelder für Verschiebungen `DisplacementX, DisplacementY`.
- Die gezeigte `Rod`-Klasse enthält nur `NodeA, NodeB, Force`. Es fehlen der Elastizitätsmodul `Elasticity` ($E$) und die Querschnittsfläche `Area` ($A$).
- *Befund im Projekt-Repository:* Im Quellcode existieren zwei getrennte Projekte: `FachwerkIdeal2D` und `FachwerkElastisch3D`. In `FachwerkElastisch3D/Model/Rod.cs` und `Node.cs` sind alle Felder ($E, A, u_x, u_y, u_z$) vollständig implementiert. Auf den Folien wird jedoch kommentarlos der Code des idealen 2D-Fachwerks abgebildet. Dies erzeugt bei Studierenden Verwirrung, da sie den Code für das zuvor hergeleitete elastische Fachwerk auf den Folien vergeblich suchen.

---

### 3.3 Kapitel 08: Kontinuierliche Dynamik, Higher-Order Solver & Stabilität

#### 3.3.1 Solverspektrum: Heun (RK2) und RK4 (Abschnitt 8.6)
Die neu eingefügte Section 8.6 schließt die ehemals größte Lücke des gesamten Kurses bravourös:
- **Heun (RK2):** Auf Folie 1431 sauber als Prädiktor-Korrektor-Verfahren (Euler-Schritt gefolgt von Trapezmittelung) hergeleitet. Konvergenzordnung lokal $\mathcal{O}(h^3)$, global $\mathcal{O}(h^2)$.
- **Butcher-Tableaux:** Auf Folie 1449–1512 wird das universelle Butcher-Schema $\begin{array}{c|c}\mathbf{c} & \mathbf{A} \\ \hline & \mathbf{b}^T \end{array}$ eingeführt und für Heun sowie RK4 exakt parametriert.
- **Klassisches RK4:** Das 4-stufige Standard-Arbeitspferd wird formelmäßig über Simpson-Quadratur aufgestellt:
  $$\mathbf{x}_{k+1} = \mathbf{x}_k + \frac{h}{6} (\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4)$$
  Butcher-Gewichte $\mathbf{b} = (1/6, 1/3, 1/3, 1/6)$ stimmen exakt mit den Stufenvorfaktoren überein.

#### 3.3.2 Dahlquist-Testgleichung & Imaginärachsen-Stabilität
Die Stabilitätsanalyse auf Folie 1519–1550 setzt Maßstäbe in mathematischer Präzision:
- Testgleichung $\dot{x} = \lambda x$ mit Stabilitätsfunktion $x_{k+1} = R(z) x_k$, $z = \lambda h \in \mathbb{C}$.
- Reelle Stabilitätsintervalle für Euler ($[-2, 0]$), Heun ($[-2, 0]$) und RK4 ($[-2{,}785, 0]$) sind exakt.
- **Verhalten auf der Imaginärachse ($\lambda = \pm i\omega_0$):**
  - Expliziter Euler: $|R(i\beta)| = \sqrt{1 + \beta^2} > 1 \quad \forall \beta > 0 \implies$ ausnahmslos instabil.
  - Heun (RK2): $|R(i\beta)| = \sqrt{1 + \beta^4/4} > 1 \quad \forall \beta > 0 \implies$ ebenfalls ausnahmslos instabil.
  - Klassisches RK4: $|R(i\beta)|^2 = 1 - \frac{\beta^6}{72} + \frac{\beta^8}{576} \le 1 \quad \text{für} \quad \beta \le 2\sqrt{2} \approx 2{,}828$.
  Damit wird den Studierenden exakt bewiesen, warum erst ab Verfahren 4. Ordnung ungedämpfte Schwingungssysteme mit expliziten Lösern stabil simuliert werden können!

#### 3.3.3 Euler-Cromer vs. Impliziter Euler
Die Klarstellung auf Folie 434–450 ist mustergültig:
- Beim vertikalen Wurf und harmonischen Oszillator wird das Verfahren:
  $$v_{k+1} = v_k + h \cdot f(t_k, y_k, v_k), \quad y_{k+1} = y_k + h \cdot v_{k+1}$$
  präzise als **semi-impliziter Euler (Euler-Cromer)** benannt.
- Der symplektische Charakter (Phasenraumvolumenerhaltung durch $\det(\mathbf{J}) \equiv 1$) wird bewiesen.

#### 3.3.4 Numerischer Randfall im C#-Code von RK4
Auf Folie 1570–1587 wird die C#-Implementierung des `RungeKutta4Solver` gezeigt:
```csharp
// Stufe 1: Steigung bei t
CalculateOutputs(time);
CalculateDerivatives(time);
CopyDerivativesTo(_k1);

// Stufe 2: Vorschritt mit k1 auf t + dt/2
ApplyIntermediateStates(0.5 * timeStep, _k1);
...
```
Auf Folie 1606 wird dann zur Endwertberechnung aufgerufen:
```csharp
ContinuousStates[b][i] = _statesBackup[b][i] + (timeStep / 6.0) * (...);
```
- **Kritik:** Auf den Folien fehlt vor der Stufe 1 der Aufruf `BackupStates()`. Ohne diese Zeile ist dem Studierenden unklar, woher `_statesBackup` seine Werte bezieht. Im Repository-Code (`Quellen/WS25/SFunctionContinuous/.../RungeKutta4Solver.cs`, Zeile 32) ist `BackupStates()` korrekt vorhanden.

#### 3.3.5 Impliziter Euler & Banach-Fixpunktiteration
In Abschnitt 8.5 (Folie 1339) wird der `EulerImplicitSolver` über eine gedämpfte Picard-Iteration mit Relaxationsfaktor $\alpha = 0{,}1$ implementiert:
$$\dot{\mathbf{x}}^{(m+1)} = \dot{\mathbf{x}}^{(m)} + \alpha \left( \mathbf{f}(t_{k+1}, \mathbf{x}^{(m)}) - \dot{\mathbf{x}}^{(m)} \right)$$
- **Numerische Einschränkung:**
  Picard-Fixpunktiteration konvergiert nur bei einer Kontraktion ($L \cdot h < 1$).
  *Konsequenz:* Bei steifen Systemen mit großer Lipschitz-Konstante $L \gg 1$ erfordert die Fixpunktiteration eine drastische Verkleinerung der Schrittweite $h < 1/L$. Dadurch geht der entscheidende theoretische Vorteil des impliziten Eulers – die unbedingte A-Stabilität – vollständig verloren!
  Um A-Stabilität bei steifen DGLs praktisch nutzen zu können, muss das nichtlineare Gleichungssystem zwingend mit dem **Newton-Raphson-Verfahren** (unter Berechnung oder Approximation der Jacobi-Matrix $\mathbf{I} - h \mathbf{J}$) gelöst werden. Dieser Umstand sollte auf Folie 1341 didaktisch explizit klargestellt werden.

---

### 3.4 Kapitel 09: Diskrete Dynamik, Stochastik & Monte-Carlo

#### 3.4.1 Kausalitätsprinzip bei Bedienzeiten
Die Überarbeitung in Abschnitt 9.6 (Folien 980–990) ist ein didaktisches Glanzstück:
- Das fatale Antipattern, für Zeitdauern eine Normalverteilung $\mathcal{N}(\mu, \sigma^2)$ heranzuziehen, wird fundiert zerlegt: Wegen des Trägers $(-\infty, +\infty)$ gilt stets $P(T < 0) > 0$.
- Es wird exakt aufgezeigt, dass negative Zeiten die zeitliche Monotonie der `PriorityQueue` zerstören ($t_{\text{departure}} < \text{Clock}$), was in Ereignissimulatoren zu Zeitreisen in die Vergangenheit, korrumpierten Ereignisketten oder Deadlocks führt.

#### 3.4.2 Log-Normal-Verteilung & Parameterumrechnung
Als Lösung wird die Log-Normal-Verteilung eingeführt, deren Träger $(0, \infty)$ strikte Kausalität garantiert. Die Momenten-Umrechnung von den Ingenieur-Sollwerten (Mittelwert $m$, Varianz $v = s^2$) auf die Verteilungsparameter $(\mu, \sigma)$ ist mathematisch exakt:
$$\sigma^2 = \ln\left(1 + \frac{s^2}{m^2}\right), \quad \sigma = \sqrt{\sigma^2}, \quad \mu = \ln(m) - \frac{1}{2}\sigma^2$$
$$X = \exp(\mu + \sigma Z) \quad \text{mit} \quad Z \sim \mathcal{N}(0, 1)$$
Die Implementierung in C# (`NextLogNormal`) auf Folie 1030 nutzt die Box-Muller-Transformation fehlerfrei.

#### 3.4.3 Inversionsmethode & Box-Muller-Herleitung
- **Inversionsmethode:** Auf den Folien 841–870 wird das Verfahren $U = F_X(X) \sim \text{Uniform}(0, 1) \implies X = F_X^{-1}(U)$ abstrakt hergeleitet und am Beispiel der Exponentialverteilung mit $F_X(x) = 1 - e^{-\lambda x}$ durchgerechnet:
  $$X = -\frac{1}{\lambda} \ln(1 - U) \equiv -\frac{1}{\lambda} \ln(U)$$
- **Box-Muller-Transformation:** Die Transformation zweier unabhängiger Standardnormalverteilter Variablen $Z_1, Z_2$ in Polarkoordinaten ($R^2 = Z_1^2 + Z_2^2 \sim \text{Exp}(1/2)$ und $\Theta \sim \text{Uniform}(0, 2\pi)$) ist lückenlos und mathematisch elegant bewiesen.

#### 3.4.4 PRNG-Seeding im Multithreading
- **Didaktische Gegenüberstellung:** Auf Folie 1131 wird zunächst das naive additive Seeding `new Random(seed: baseSeed + i)` gezeigt.
- **Best Practice:** Im finalen parallelen Monte-Carlo-Lauf auf Folie 1323 wird korrekterweise `HashCode.Combine(baseSeed, i)` verwendet, wodurch Korrelationen zwischen aufeinanderfolgenden Seed-Werten wirksam pseudozufällig zerstreut werden.

#### 3.4.5 Welford-Algorithmus & Chan-Merge
Auf den Folien 1228–1330 wird der Online-Algorithmus von B. P. Welford (1962) vorgestellt:
$$M_k = M_{k-1} + \frac{x_k - M_{k-1}}{k}, \quad S_k = S_{k-1} + (x_k - M_{k-1})(x_k - M_k)$$
- **Parallelisierung:** Durch den Merge-Algorithmus nach Chan (1979) zur exakten Vereinigung zweier Teilakkumulatoren $A$ und $B$:
  $$\delta = M_B - M_A, \quad M_{AB} = M_A + \delta \frac{N_B}{N_A + N_B}$$
  $$S_{AB} = S_A + S_B + \delta^2 \frac{N_A N_B}{N_A + N_B}$$
  wird die Varianzberechnung in `Parallel.For` allokationsfrei, speichereffizient ($O(1)$ Speicher) und numerisch gegen Auslöschung geschützt durchgeführt.
- **Konfidenzintervalle:** Die Auswertung auf Folie 1339 mit $z_{0{,}975} \approx 1{,}960$ für das 95%-Konfidenzintervall ($\bar{X} \pm 1{,}960 \cdot \frac{s}{\sqrt{N}}$) ist absolut exakt.

---

### 3.5 Kapitel 10: Hybride Systeme, Bisektion & Zeno-Kontaktschwellen

#### 3.5.1 Hybride Systembeschreibung (S-Function-Formalismus)
Die mathematische Struktur mit kontinuierlichen Zuständen $x_c$, diskreten Zuständen $x_d$, Eingängen $u$, kontinuierlichen Ausgängen $y$, Zustandsübergangsfunktionen $f$ und $h$ sowie Zero-Crossing-Funktionen $z(t, x_c, x_d, u) = 0$ bildet den internationalen Standard (MATLAB/Simulink S-Function / FMI 2.0/3.0) exzellent ab.

#### 3.5.2 Vorzeichenwechsel-Bisektion
Die auf Folie 1017–1060 eingeführte Intervall-Bisektion behebt die methodischen Schwächen der Vorgängerversion vollständig:
- Kriterium: $\text{sgn}(z(t_{\text{left}})) \neq \text{sgn}(z(t_{\text{right}})) \iff z(t_{\text{left}}) \cdot z(t_{\text{right}}) \le 0$.
- Der Algorithmus halbiert das echte Intervall $[t_{\text{left}}, t_{\text{right}}]$ und schachtelt die Wurzel bis auf Zeittoleranz `TimeTol` und Werttoleranz `ZeroTol` ein.
- **Restschrittintegration:** Nach Auslösen des Ereignisses bei $t_{\text{mid}}$ integriert der Solver auf Folie 1078 die verbleibende Restzeit $dt_{\text{remaining}} = (t + \Delta t) - t_{\text{mid}}$ zu Ende, sodass das globale Zeitraster synchron bleibt.

#### 3.5.3 Zeno-Phänomen & Haftkontakt
Auf Folie 1070–1076 wird das klassische Zeno-Verhalten beim prellenden Ball (geometrische Reihe der Sprungintervalle konvergiert gegen $t_\infty < \infty$) algorithmisch abgefangen:
```csharp
bool nearZero = Math.Abs(velocity) < StickingTol && Math.Abs(pos) < ZeroTol;
if (nearZero)
    EnterContactMode(); // Moduswechsel: v = 0, y = 0, a = 0
else
    UpdateStates(tMid); // Diskretes Stoßereignis (v = -e * v)
```
Dies verhindert das berüchtigte Einfrieren der Schrittweitensteuerung ($dt \to 0$) zuverlässig.

#### 3.5.4 Verbleibender numerischer Randfall
- **Gerade Anzahl von Nullstellendurchgängen:** Wenn eine Trajektorie innerhalb eines einzigen großen Zeitschritts $\Delta t$ die Schaltfläche durchdringt und vor Schrittende wieder zurückkehrt (z.B. schnelles Schwingen oder kurzes Eintauchen in eine dünne Wand), gilt $\text{sgn}(z(t)) == \text{sgn}(z(t+\Delta t))$.
- Der Vorzeichenwechsel-Test an den Intervallrändern schlägt in diesem Fall nicht an; das Ereignis wird komplett übersehen.
- *Empfehlung:* Ein kurzer didaktischer Hinweis auf der Folie (dass $\Delta t$ kleiner als die minimale Verweildauer im geschalteten Zustand gewählt werden muss) sensibilisiert die Studierenden für diesen Randfall.

---

## 4. Detaillierte Befunde in den Begleitkapiteln (00, 01, 03, 04, 05, 06, 11)

### 4.1 Kapitel 01 (Einführung)
- **Folie 437 (Luftwiderstand beim schiefen Wurf):**
  - *Text:* „Luftwiderstand $F_R \propto v^2$ macht die DGL nichtlinear.“
  - *Didaktisches Problem:* Studierende neigen dazu, dies fälschlicherweise als $F_{Rx} = -c v_x^2$ und $F_{Ry} = -c v_y^2$ zu implementieren. Das zerstört die Richtungstreue des Widerstandsvektors.
  - *Korrektur:* Es sollte explizit die Vektorform angegeben werden:
    $$\vec{F}_R = -\frac{1}{2} c_w \rho A |\vec{v}| \vec{v} \implies F_{Rx} = -c \sqrt{v_x^2 + v_y^2} \cdot v_x$$

### 4.2 Kapitel 03 (2D Vektorgrafik)
- **Folie 303–313 (Pfeilspitzengeometrie):**
  - Die analytische Geometrie über Richtungsvektor $\vec{u} = \vec{F}/\|\vec{F}\|$ und Orthogonalvektor $\vec{u}^\perp = (-u_y, u_x)^T$ ist exakt.
  - Da im WPF-Bildschirmkoordinatensystem die Y-Achse nach unten weist, dreht $\vec{u}^\perp = (-u_y, u_x)^T$ den Vektor im Uhrzeigersinn; durch die symmetrische Konstruktion $P_{1,2} = P_{\text{base}} \pm \frac{W}{2} \vec{u}^\perp$ ist das Dreieck stets korrekt orientiert.

### 4.3 Kapitel 04 (2D Diagramme)
- **Folie 193–195 ($O(1)$-Decimation im Signalplot):**
  - Mathematisch brillante Begründung: Durch äquidistante Zeitschritte $t_i = t_0 + i \cdot \Delta t$ wird die Pixelspalte über die Bodenfunktion $i(t) = \lfloor (t - t_0)/\Delta t \rfloor$ direkt indiziert.
  - Die Kompression auf Minimum/Maximum pro Pixelspalte reduziert $10^6$ Punkte auf $2 \times \text{Pixelbreite}$, was 60 FPS bei Hardware-Rendering sichert.

### 4.4 Kapitel 05 (3D OpenGL)
- **Winkel-Konflikt bei Kugelkoordinaten ($\phi$):**
  - Auf Folie 1089 (Sphere) ist $\phi \in [0, \pi]$ der **Polarwinkel (Colatitude / Zenitwinkel)** gemessen von der positiven Y-Achse (Nordpol $\phi=0 \implies \cos\phi = 1, \sin\phi = 0$).
  - Auf Folie 1378–1382 (Orbit-Kamera) ist $\phi \in [-89^\circ, +89^\circ]$ der **Elevationswinkel (Latitude / geographische Breite)** gemessen von der XZ-Horizontalebene ($y_e = y_c + r \sin\phi$).
  - *Kritik:* Beide Male wird dasselbe Symbol $\phi$ verwendet, es bezeichnet jedoch zwei zueinander komplementäre Winkel ($\phi_{\text{Sphere}} = 90^\circ - \phi_{\text{Camera}}$). Studierende, die Kugelformeln und Kameraformeln vergleichen, geraten hier unweigerlich in Verwirrung.

### 4.5 Kapitel 11 (Epilog)
- **Folie 417 (Singularitäts-Regularisierung):**
  - Hervorragender ingenieurpraktischer Hinweis: Verhinderung von Divisionen durch Null bei Coulomb- oder Gravitationskräften $F \propto 1/r^2$ durch Weichzeichnungs-Potentiale (**Plummer-Splitting / Softening parameter**):
    $$r_{\text{reg}} = \sqrt{r^2 + \epsilon^2}$$
- **Folie 432 (Stabilitätsschranke expliziter Verfahren):**
  - Faustformel $\Delta t < \frac{2}{\omega_{\max}}$ deckt sich exakt mit dem reellen Stabilitätsintervall des expliziten Eulers $[-2, 0]$ für rein gedämpfte Moden.

---

## 5. Detaillierter Mängelkatalog mit Schweregraden & Handlungsoptionen

Die Einstufung erfolgt in drei Schweregrade:
- **Kritisch (Severity 1):** Mathematische Inkorrektheit, Verletzung physikalischer Erhaltungssätze oder Fehler im Code, die zu Fehlinterpretationen führen.
- **Mittel (Severity 2):** Didaktische Auslassung von Standardtheorien, Bruch von Notationsstandards zwischen Kapiteln oder Unstimmigkeiten zwischen Foliencode und Quellprojekt.
- **Gering / Kosmetisch (Severity 3):** Typografische Normverletzungen nach DIN/ISO, uneinheitliche Einheitenstile oder fehlende Randfall-Hinweise.

| ID | Kap. | Fundstelle | Problem / Befund | Schweregrad | Konkreter Lösungsvorschlag | Aufwand / Nutzen |
| :--- | :--- | :--- | :--- | :---: | :--- | :---: |
| **P1** | **02** | Folie 467–550 | **Randbedingungen für PDEs fehlen:** Homogene/inhomogene Dirichlet- und Neumann-Randbedingungen werden weder formuliert noch im Code erklärt. | **Mittel** | Einschub einer Folie zu Dirichlet ($T=T_0$) vs. Neumann/adiabatisch ($\frac{\partial T}{\partial n}=0$) und Rand-Handling. | Gering / Hoch |
| **P2** | **07** | Folie 446–471 | **Koordinatentransformation $T$ fehlt:** $k_{Stab}$ wird nur dyadisch hergeleitet; Standard-FEM-Beziehung $k_e^{glob} = T^T k_e^{loc} T$ fehlt. | **Mittel** | Ergänzungsfolie zur lokalen Stabmatrix und Drehmatrix $\mathbf{T}$ als Querverbindung zur Robotik einfügen. | Gering / Hoch |
| **P3** | **07** | Folie 882–928 | **Code-Diskrepanz:** Folien zeigen `Node`/`Rod` des idealen 2D-Fachwerks ohne $E, A, u$; elastisches 3D-Modell aus WS25 fehlt. | **Mittel** | Folienüberschrift präzisieren („Klassenmodell ideales 2D-Fachwerk“) und Folie mit elastischer Erweiterung ($E, A, u$) ergänzen. | Gering / Sehr hoch |
| **P4** | **08** | Folie 1570 | **Fehlender State-Backup in RK4-Code:** Aufruf `BackupStates()` fehlt vor Stufe 1, wodurch `_statesBackup` auf Folie 1606 scheinbar aus dem Nichts kommt. | **Gering** | Zeile `BackupStates();` vor Stufe 1 im C#-Listing auf Folie 1570 nachtragen. | Minimal / Hoch |
| **P5** | **08** | Folie 1341 | **A-Stabilität bei Picard-Iteration:** Hinweis fehlt, dass Banach-Fixpunktiteration bei steifen DGLs die A-Stabilität auf $h < 1/L$ verliert. | **Mittel** | Didaktische Notiz: Echte A-Stabilität für steife Systeme erfordert Newton-Raphson mit Jacobi-Matrix $(\mathbf{I} - h\mathbf{J})$. | Minimal / Mittel |
| **P6** | **05** | Folie 1089, 1378 | **Symbolkollision bei $\phi$:** In Kugel ist $\phi$ der Polarwinkel (Colatitude $[0, \pi]$), in Orbit-Kamera die Elevation ($[-89^\circ, 89^\circ]$). | **Gering** | In Kamera $\phi$ durch $\theta_{\text{elev}}$ ersetzen oder auf komplementäre Definition explizit hinweisen. | Gering / Mittel |
| **P7** | **01** | Folie 437 | **Luftwiderstandsskalar:** $F_R \propto v^2$ verleitet zur falschen komponentenweisen Quadratur. | **Gering** | Vektorformel $\vec{F}_R = -c \|\vec{v}\| \vec{v}$ angeben. | Minimal / Mittel |
| **P8** | **10** | Folie 1049 | **Übersehen gerader Nulldurchgänge:** Bei zwei Nullstellen im Intervall $[t, t+\Delta t]$ schlägt Bisektion nicht an. | **Gering** | Hinweisbox: Zeitschritt $\Delta t$ muss kleiner sein als die kürzeste Schaltzeit des Systems. | Minimal / Mittel |
| **P9** | **Global**| Kap. 03, 05, 08 | **Kursive physikalische Einheiten:** `$[m]$`, `$[px]$`, `$100\,m$`, `$-0.981\,m/s$` verstoßen gegen DIN 1304 / ISO 80000. | **Gering** | Globale Bereinigung auf roman Font: `\mathrm{m}`, `\mathrm{s}`, `\mathrm{m/s}`. | Gering / Hoch |
| **P10**| **Global**| Kap. 07, 08, 10 | **Vektor-/Matrix-Notationsbruch:** Wechsel zwischen Pfeilen ($\vec{u}$), Fettung ($\mathbf{x}$) und Kursivskalaren ($x, A$). | **Mittel** | Im Vorlesungsprolog (Kap. 00) ein kurzes Notationsglossar definieren oder Vektoren in 08/10 einheitlich fetten. | Mittel / Hoch |

---

## 6. Zusammenfassende Handlungsempfehlungen für das Dozententeam

1. **Vorlesungsbetrieb (Kurzfristig vor Semesterstart WS26):**
   - Den fehlenden Methodenaufruf `BackupStates()` in Folie 1570 (Kapitel 08) nachtragen.
   - In Kapitel 07 (Folie 880) die Überschrift schärfen auf: *„Programmtechnische Umsetzung: Ideales 2D-Fachwerk“* und eine Überleitungsfolie einfügen, die auf das elastische Modell mit $E, A$ und $u_x, u_y$ verweist.
   - Den Einheiten-Schriftsatz (`\mathrm{...}`) in den Kapiteln 03 und 08 korrigieren.

2. **Didaktische Vertiefung (Mittelfristig):**
   - In Kapitel 02 eine Slide zu Neumann- vs. Dirichlet-Randbedingungen ergänzen, um die Brücke zwischen kontinuierlicher PDE und den Randwerten des diskreten Arrays zu schlagen.
   - In Kapitel 07 die Formulierung $\mathbf{k}_e^{glob} = \mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}$ als methodische Alternative zur dyadischen Herleitung präsentieren.
   - In Kapitel 08 die Grenze der Picard-Iteration gegenüber dem vollwertigen Newton-Raphson-Verfahren bei steifen DGLs thematisieren.

3. **Fazit:**
   Die Vorlesungsunterlagen haben durch die vorangegangenen Überarbeitungen ein **außerordentlich hohes didaktisches und mathematisches Niveau** erreicht. Die theoretischen Herleitungen von Runge-Kutta 4, Dahlquist-Stabilität, Welford-Akkumulation und hybrider Bisektion genügen höchsten Hochschulstandards. Mit der Abarbeitung der verbleibenden Punkte des Katalogs P1–P10 erreicht das Lehrwerk volle Perfektion.
