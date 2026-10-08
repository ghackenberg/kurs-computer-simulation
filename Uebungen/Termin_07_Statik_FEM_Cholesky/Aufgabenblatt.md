# Aufgabenblatt Termin 07: Statische Modelle, FEM-Fachwerke & Cholesky-Löser
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
### FH Oberösterreich – Campus Wels | Studiengang Automatisierungstechnik

---

| Metadaten | Details |
| :--- | :--- |
| **Lehrveranstaltungseinheit:** | Termin 07 (begleitend zu Kapitel 07: Statische Modelle) |
| **Themenschwerpunkt:** | Finite-Elemente-Methode (FEM) für 2D-Fachwerke, `MathNet.Numerics`, Cholesky-Zerlegung & Blockpartitionierung |
| **Technologie-Stack:** | C# 12 / .NET 8/10, `MathNet.Numerics`, WPF Canvas (Frontend aus Termin 03) |
| **Vorgreif-Sperre:** | **Erlaubt:** `MathNet.Numerics` (DenseMatrix, Vector, Cholesky), WPF Canvas Vektorgrafik.<br>**Strengstens verboten:** *KEINE* dynamischen DGL-Integratoren (RK4), *KEINE* S-Functions, *KEINE* Event-Queues! |
| **Zeitbudget:** | **In-Class Sprint:** 60 Minuten (Laborpräsenz)<br>**Homework Extension:** 2–3 Stunden (2er-Team, 1 Woche) |
| **Abgabeform:** | Git-Repository: Sourcecode, Unit-Tests und Markdown-Bericht (`README.md`) |

---

## 1. Lernziele (Intended Learning Outcomes - ILOs)

Nach erfolgreicher Bearbeitung dieser Übungseinheit sind Sie in der Lage:
1. **Elementmatrizen aufstellen:** Die Elementsteifigkeitsmatrix $\mathbf{K}_e \in \mathbb{R}^{4 \times 4}$ eines 2D-Stabelements aus Elastizitätsmodul $E$, Querschnittsfläche $A$, Stablänge $L$ und Einheitsrichtungsvektor $\vec{n}$ mathematisch herzuleiten und programmtechnisch zu kapseln.
2. **Globale Gleichungssysteme assemblieren:** Die globale Steifigkeitsmatrix $\mathbf{K} \in \mathbb{R}^{2N \times 2N}$ durch Topologie-Mapping (Freiheitsgrad-Zuordnung) korrekt aufzuakkumulieren.
3. **Randbedingungen exakt partitionieren:** Das Gesamtsystem ohne numerische Hilfskonstrukte (wie Penalty-Verfahren) mathematisch exakt in freie ($f$) und vorgeschriebene ($p$) Freiheitsgrade zu partitionieren:
   $$\mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f - \mathbf{K}_{fp} \mathbf{u}_p, \quad \mathbf{f}_p = \mathbf{K}_{pf} \mathbf{u}_f + \mathbf{K}_{pp} \mathbf{u}_p$$
4. **Cholesky-Zerlegung anwenden:** Die symmetrische, positiv definite Submatrix $\mathbf{K}_{ff}$ mittels Cholesky-Faktorisierung ($\mathbf{L}\mathbf{L}^\top$) über `MathNet.Numerics` hocheffizient zu invertieren bzw. zu lösen.
5. **Kräfte, Spannungen & Invarianten prüfen:** Stabnormalkräfte $N_i$, Normalspannungen $\sigma_i$ und Euler-Knicklasten $N_{\text{knick}}$ zu berechnen sowie das globale Vektorgleichgewicht ($\sum \vec{F} = \vec{0}$) als Invariante auf Maschinengenauigkeit nachzuweisen.
6. **Verheiratung mit Termin 03:** Den in Termin 03 entwickelten interaktiven WPF Canvas mit der FEM-Rechenengine zu verbinden, sodass Zug- und Druckstäbe farbkodiert und Lagerkräfte als dynamische Vektorpfeile dargestellt werden.

---

## 2. Mathematisch-Theoretische Grundlagen

### 2.1 Elementsteifigkeitsmatrix des 2D-Stabes

Ein Stabelement zwischen Knoten $i = (x_i, y_i)$ und Knoten $j = (x_j, y_j)$ besitzt die Ausgangslänge $L = \sqrt{(x_j - x_i)^2 + (y_j - y_i)^2}$ und den Einheitsrichtungsvektor:

$$\vec{n} = \frac{1}{L} \begin{bmatrix} x_j - x_i \\ y_j - y_i \end{bmatrix} = \begin{bmatrix} \cos \alpha \\ \sin \alpha \end{bmatrix}$$

Die Elementsteifigkeitsmatrix $\mathbf{K}_e \in \mathbb{R}^{4 \times 4}$ bezogen auf den Verschiebungsvektor $\mathbf{u}_e = \begin{bmatrix} u_{xi} & u_{yi} & u_{xj} & u_{yj} \end{bmatrix}^\top$ lautet:

$$\mathbf{K}_e = \frac{E \cdot A}{L} \begin{bmatrix} \vec{n}\vec{n}^\top & -\vec{n}\vec{n}^\top \\ -\vec{n}\vec{n}^\top & \vec{n}\vec{n}^\top \end{bmatrix} = \frac{E \cdot A}{L} \begin{bmatrix} 
\cos^2\alpha & \cos\alpha\sin\alpha & -\cos^2\alpha & -\cos\alpha\sin\alpha \\
\cos\alpha\sin\alpha & \sin^2\alpha & -\cos\alpha\sin\alpha & -\sin^2\alpha \\
-\cos^2\alpha & -\cos\alpha\sin\alpha & \cos^2\alpha & \cos\alpha\sin\alpha \\
-\cos\alpha\sin\alpha & -\sin^2\alpha & \cos\alpha\sin\alpha & \sin^2\alpha
\end{bmatrix}$$

### 2.2 Exakte Blockpartitionierung & Cholesky-Verfahren

Die Knotenfreiheitsgrade werden in freie Indizes $f$ (Verschiebungen unbekannt, äußere Lasten bekannt) und vorgeschriebene Indizes $p$ (Lager: Verschiebungen $\mathbf{u}_p = \mathbf{0}$, Reaktionskräfte unbekannt) aufgeteilt:

$$\begin{bmatrix} \mathbf{K}_{ff} & \mathbf{K}_{fp} \\ \mathbf{K}_{pf} & \mathbf{K}_{pp} \end{bmatrix} \begin{bmatrix} \mathbf{u}_f \\ \mathbf{u}_p \end{bmatrix} = \begin{bmatrix} \mathbf{f}_f \\ \mathbf{f}_p \end{bmatrix}$$

1. **Verschiebungen der freien Knoten:**
   $$\mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f - \mathbf{K}_{fp} \mathbf{u}_p \quad \xrightarrow{\mathbf{u}_p = \mathbf{0}} \quad \mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f$$
   Da das Tragwerk statisch bestimmt oder überbestimmt gelagert ist, ist $\mathbf{K}_{ff}$ symmetrisch positiv definit (SPD). Die Lösung erfolgt per Cholesky:
   $$\mathbf{K}_{ff} = \mathbf{L} \mathbf{L}^\top \quad \implies \quad \mathbf{u}_f = (\mathbf{L} \mathbf{L}^\top)^{-1} \mathbf{f}_f$$
2. **Reaktionskräfte an den Auflagern:**
   $$\mathbf{f}_p = \mathbf{K}_{pf} \mathbf{u}_f + \mathbf{K}_{pp} \mathbf{u}_p \quad \xrightarrow{\mathbf{u}_p = \mathbf{0}} \quad \mathbf{f}_p = \mathbf{K}_{pf} \mathbf{u}_f$$
3. **Stabnormalkraft & Spannung:**
   Die Längenänderung $\Delta L = \vec{n}^\top (\mathbf{u}_j - \mathbf{u}_i)$ liefert Dehnung $\epsilon = \frac{\Delta L}{L}$, Normalkraft $N = E \cdot A \cdot \epsilon$ und Spannung $\sigma = E \cdot \epsilon$.
   - $N > 0$: Zugstab (im Canvas blau)
   - $N < 0$: Druckstab (im Canvas rot)

---

## 3. Stufe A: In-Class Sprint (60 min)

### Thema: „Dreiecksträger-Assemblierung & Cholesky-Löser mit MathNet“

Erstellen Sie eine C#-Konsolenapplikation (`TrussCholeskySprint`), die ein elementares Dreieckstragwerk (3 Knoten, 3 Stäbe, 6 Freiheitsgrade) aufstellt, partitioniert, mittels Cholesky löst und die Gleichgewichtsbedingungen nachweist.

```
┌────────────────────────────────────────────────────────────────────────┐
│ STUFE A: 3-KNOTEN-FACHWERK (DREIECKSTRÄGER)                            │
│                                                                        │
│                      Knoten 3 (x=2m, y=2m)                             │
│                           ▲                                            │
│                          /|\                                           │
│                         / | \                                          │
│                  Stab 1/  |  \ Stab 2   Last F_y = -10 kN              │
│                       /   |   \                                        │
│                      /    |    \                                       │
│                     ▼     |     ▼                                      │
│  Festlager (x=0,y=0) ─────┴───── Loselager (x=4m, y=0)                │
│  Knoten 1             Stab 3     Knoten 2 (nur x beweglich)            │
│  DOFs: [0, 1] fest               DOFs: [2 frei, 3 fest]                │
└────────────────────────────────────────────────────────────────────────┘
```

#### Geometrie & Parameter:
- Knoten 1: $(0{,}0, 0{,}0)\,\text{m}$ – Festlager ($u_{x1} = 0, u_{y1} = 0$, Indizes $0, 1 \in p$)
- Knoten 2: $(4{,}0, 0{,}0)\,\text{m}$ – Loselager ($u_{y2} = 0$, Index $3 \in p$; $u_{x2}$ ist frei, Index $2 \in f$)
- Knoten 3: $(2{,}0, 2{,}0)\,\text{m}$ – Spitzenknoten ($u_{x3}, u_{y3}$ frei, Indizes $4, 5 \in f$)
- Stäbe: Stab 1 (1–3), Stab 2 (2–3), Stab 3 (1–2).
- Material: Stahl, $E = 210 \times 10^9\,\text{Pa}$, Querschnitt $A = 1 \times 10^{-4}\,\text{m}^2$ ($1\,\text{cm}^2$).
- Belastung: Am Knoten 3 wirkt eine vertikale Punktlast $F_y = -10\,000\,\text{N}$ (Index 5).

#### Aufgabenstellung (Schritt für Schritt):

1. **NuGet-Paket einbinden:**
   Installieren Sie `MathNet.Numerics` via NuGet.
2. **Elementmatrix-Methode implementieren:**
   Erstellen Sie eine Methode `DenseMatrix BuildElementMatrix(double E, double A, double x1, double y1, double x2, double y2)`.
3. **Globale Steifigkeitsmatrix assemblieren:**
   Erzeugen Sie $\mathbf{K} \in \mathbb{R}^{6 \times 6}$ und addieren Sie die 3 Elementmatrizen an den entsprechenden Freiheitsgrad-Indizes:
   - Stab 1: Indizes $[0, 1, 4, 5]$
   - Stab 2: Indizes $[2, 3, 4, 5]$
   - Stab 3: Indizes $[0, 1, 2, 3]$
4. **Blockpartitionierung:**
   - Freie Indizes: $f = \{2, 4, 5\}$ (Dimension 3)
   - Gelagerte Indizes: $p = \{0, 1, 3\}$ (Dimension 3)
   - Extrahieren Sie $\mathbf{K}_{ff} \in \mathbb{R}^{3 \times 3}$ und $\mathbf{K}_{pf} \in \mathbb{R}^{3 \times 3}$.
5. **Cholesky-Lösung:**
   Lösen Sie $\mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f$ mit:
   ```csharp
   Vector<double> uf = K_ff.Cholesky().Solve(f_f);
   ```
6. **Lagerreaktionen & Kraftgleichgewicht:**
   Berechnen Sie $\mathbf{f}_p = \mathbf{K}_{pf} \mathbf{u}_f$.
   Prüfen Sie das globale Vektorgleichgewicht auf der Konsole:
   $$\sum F_x = f_{p, 0} + f_{p, 2} + f_{f, 4} \stackrel{?}{=} 0, \quad \sum F_y = f_{p, 1} + f_{p, 3} + f_{f, 5} \stackrel{?}{=} 0$$

**Erwartetes Ergebnis nach 50 Minuten:**  
- Verschiebung Knoten 3 vertikal: $u_{y3} \approx -0{,}00045\,\text{m}$ (ca. $-0{,}45\,\text{mm}$).
- Auflagerkräfte vertikal: $F_{y1} = +5000\,\text{N}$, $F_{y2} = +5000\,\text{N}$.
- Gleichgewichtsfehler: $|\sum F_x| < 10^{-12}\,\text{N}$, $|\sum F_y| < 10^{-12}\,\text{N}$.

---

## 4. Stufe B: Homework Extension (Wahlmodell – GENAU EINE Aufgabe!)

> [!IMPORTANT]
> **Pick your Track (Wahlmodell – KEINE Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **GENAU EINEN** der beiden Tracks:
> - **Track A (Industrie):** Portalkran-FEM-Verformung unter Wanderlast (Verheiratet mit T03-Canvas)
> - **Track B (Simulation Game):** Bridge Constructor Physics Engine (LKW-Überfahrt & Einsturzmechanik)
> 
> Beide Aufgaben basieren auf der FEM-Cholesky-Berechnung und verheiraten die Statik-Engine nahtlos mit der WPF-Vektorvisualisierung aus Termin 03. Bearbeiten Sie **NUR EINEN** Track!

---

### Track A (Industrie): Portalkran-FEM-Verformung unter Wanderlast

#### Industrieller Kontext:
In Industriehallen fahren Portalkräne mit schweren Lasten über Fachwerkträger. Die Dimensionierung erfordert die Berechnung der Durchbiegung und der maximalen Stabspannungen bei wandernder Kranlaufkatze sowie den rechnerischen Knicknachweis nach Leonhard Euler.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK A: INDUSTRIE-PORTALKRAN-TRAGWERK                                 │
│                                                                        │
│                Laufkatze F_Last = 50 kN (wandert kontinuierlich)       │
│                           ▼                                            │
│   O───O───O───O───O───O───O───O───O───O (Obergurt)                    │
│   │ \ │ / │ \ │ / │ \ │ / │ \ │ / │ \ │                                │
│   │  \│/  │  \│/  │  \│/  │  \│/  │  \│                                │
│   O───O───O───O───O───O───O───O───O───O (Untergurt)                    │
│   ▲                                   ▲                                │
│   Festlager                           Loselager                        │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track A:

1. **Tragwerkstopologie & Verheiratung mit T03:**
   - Modellieren Sie einen Fachwerkträger mit mindestens 16 Knoten und 30–40 Stäben (z. B. Spannweite $24\,\text{m}$, Höhe $3\,\text{m}$).
   - Binden Sie die Vektorvisualisierung aus Termin 03 (WPF Canvas) als Frontend ein:
     - Welt-zu-Bildschirm-Transformation mit Y-Achse nach oben.
     - Darstellung von Knoten (Punkte/Kreise), Stäben (`Line`) und Auflagern (Dreieckssymbole).
2. **Dynamische Wanderlast:**
   - Auf den oberen Knoten verfährt eine Wanderlast $F_{\text{Last}} = 50\,\text{kN}$ (Laufkatze) schrittweise von links nach rechts ($x = 0 \to 24\,\text{m}$).
   - In jedem Inkrement wird die Last auf die benachbarten Knoten interpoliert, $\mathbf{f}_f$ aktualisiert und das LGS via Cholesky gelöst.
3. **Echtzeit-Farbcodierung & Verformung:**
   - **Spannungs-Farbcodierung:**
     - Zugstäbe ($N > 0$): Blau, Linienstärke $w = 2 + 3 \cdot \frac{|N|}{N_{\max}}$.
     - Druckstäbe ($N < 0$): Rot, Linienstärke $w = 2 + 3 \cdot \frac{|N|}{N_{\max}}$.
   - **Skalierte Verformungsanzeige:** Knotenpositionen werden für die Visualisierung mit einem Überhöhungsfaktor (z. B. $100\times$) animiert dargestellt (`Line.X1, Y1, X2, Y2` angepasst).
   - **Lagerkraft-Pfeile:** An den Auflagern werden die berechneten Reaktionskräfte $\mathbf{f}_p$ als Pfeile mit Pfeilspitzen eingeblendet.
4. **Euler-Knicknachweis:**
   - Für jeden Druckstab ($N < 0$) wird die kritische Euler-Knicklast berechnet:
     $$N_{\text{knick}} = \frac{\pi^2 E I}{L^2}$$
     wobei das Flächenträgheitsmoment für ein Kreisrohr ($D = 80\,\text{mm}, t = 5\,\text{mm}$) $I = \frac{\pi}{64}(D^4 - (D - 2t)^4)$ beträgt.
   - Überschreitet die Druckkraft die Knicklast ($|N| \ge N_{\text{knick}}$), blinkt der entsprechende Stab im Canvas gelb/orange als Warnanzeige.
5. **Gleichgewichtskontrolle & Dokumentation:**
   - Überprüfen Sie in jedem Simulationsschritt automatisiert $\sum \vec{F}_{\text{Lager}} + \sum \vec{F}_{\text{Last}} = \vec{0}$.
   - Dokumentieren Sie die Biegelinie und die maximalen Stabkräfte im Markdown-Bericht.

---

### Track B (Simulation Game): Bridge Constructor Physics Engine

#### Game-Kontext:
Im Simulationsspiel-Klassiker *Bridge Constructor* entwerfen Spieler Brücken über Schluchten. Fährt ein schwerer LKW über das Bauwerk, steigen die Stabspannungen. Wird die Streckgrenze überschritten, reißen Stäbe mit lautem Knall – wird das Resttragwerk kinematisch instabil, stürzt die gesamte Brücke in die Tiefe.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK B: BRIDGE CONSTRUCTOR - LKW-ÜBERFAHRT & BRUCH                    │
│                                                                        │
│             Schwerer LKW (F_1 = 15 kN, F_2 = 25 kN)                    │
│                [ O====O ] ───> rollt nach rechts                       │
│   ═════════════╤════════╤══════════════════════════════════════════   │
│              / │ \    / │ \                                            │
│             /  │  \  /  │  \   <── Stabbruch bei |N| > N_zul!          │
│            /   │   \/   │   \                                          │
│           O────O────O───O────O                                         │
│          Felswand A         Felswand B                                 │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track B:

1. **Verheiratung mit dem T03 Blueprint Sketcher:**
   - Laden Sie eine Brückentopologie (z. B. Pratt- oder Warren-Fachwerk mit $L = 20\,\text{m}$, zwei feste Felswand-Auflager links und rechts).
   - Visualisierung auf dem WPF Canvas: Fahrbahn, Diagonalen, Pfosten und Knoten.
2. **Kontinuierliche LKW-Überfahrt:**
   - Ein zweiachsiger LKW (Vorderachse $15\,\text{kN}$, Hinterachse $25\,\text{kN}$, Achsabstand $3\,\text{m}$) fährt mit konstanter Geschwindigkeit über die Brückenfahrbahn.
   - Die Achslasten werden proportional zur Position auf die Fahrbahnknoten eingeleitet.
   - In jedem Zeitschritt ($50\,\text{ms}$) wird das statische Gleichgewicht via Math.NET Cholesky berechnet.
3. **Echtzeit-Spannungsanzeige:**
   - Stäbe ändern flüssig ihre Farbe: Grün ($< 50\,\%$ Belastung) $\to$ Gelb ($50\text{--}80\,\%$) $\to$ Rot ($80\text{--}99\,\%$).
4. **Stabbruch & Kollaps-Dynamik:**
   - Jeder Stab besitzt eine maximale Zug-/Druckfestigkeit $N_{\text{zul}} = 30\,\text{kN}$.
   - Übersteigt $|N_i| > N_{\text{zul}}$, **bricht der Stab**:
     - Der Stab wird aus der Topologie und der Steifigkeitsmatrix gelöscht.
     - Es wird versucht, das verbleibende System neu zu lösen.
     - **Abfangen von Instabilitäten:** Wird das Resttragwerk kinematisch instabil (Mechanismus), ist $\mathbf{K}_{ff}$ nicht mehr positiv definit! Fangen Sie `NonPositiveDefiniteException` ab:
       ```csharp
       try {
           uf = K_ff.Cholesky().Solve(f_f);
       } catch (NonPositiveDefiniteException) {
           TriggerBridgeCollapse();
       }
       ```
     - Bei Kollaps: Animieren Sie den Einsturz (Knoten fallen unter Gravitation nach unten).
5. **Validierung vor dem Einsturz:**
   - Bis zum Bruch muss das Vektorgleichgewicht in jedem Zeitschritt exakt $\sum \vec{F} = \vec{0}$ erfüllen.

---

## 5. Akzeptanzkriterien & Definition of Done

Für die volle Punktzahl (10 Punkte) müssen folgende Kriterien erfüllt sein:

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **FEM-Modell & Cholesky-Solver** | **3 P.** | Korrekte Elementmatrizen, fehlerfreie Assemblierung und exakte Blockpartitionierung; robuster Cholesky-Solve über `MathNet.Numerics`. |
| **Verheiratung mit T03-Canvas** | **3 P.** | Nahtlose grafische Darstellung im Canvas; Verformungsüberhöhung, Farbcodierung der Zug-/Druckkräfte und dynamische Lastdarstellung. |
| **Erweiterte Tragwerksmechanik** | **2 P.** | **Track A:** Euler-Knicknachweis mit Querschnittswerten.<br>**Track B:** Physikalischer Stabbruch bei $N_{\text{zul}}$, sicheres Abfangen nicht-SPD-Matrizen und Einsturzanimation. |
| **Gleichgewichtsnachweis & Bericht** | **2 P.** | Automatisierter Invarianten-Check ($\sum F_x = 0, \sum F_y = 0$ auf Maschinengenauigkeit); sauberer Markdown-Bericht mit Diagrammen und Verformungsbildern. |

---

## 6. Online-Recherche-Box

Nutzen Sie zur Vorbereitung und Vertiefung folgende Quellen:

- **Offizielle Dokumentation:**
  - [Math.NET Numerics: Linear Algebra & Matrix Decomposition](https://numerics.mathdotnet.com/LinearEquations)
  - [Math.NET Numerics: Cholesky Decomposition API](https://numerics.mathdotnet.com/api/MathNet.Numerics.LinearAlgebra.Factorization/Cholesky%601.htm)
  - [Microsoft Learn: WPF Shapes overview](https://learn.microsoft.com/de-de/dotnet/desktop/wpf/graphics-multimedia/shapes-and-basic-drawing-in-wpf-overview)
- **Gezielte englische Suchbegriffe:**
  - `Math.NET Numerics Cholesky Solve SPD matrix C#`
  - `Direct stiffness method 2D truss block partitioning free prescribed DOFs`
  - `Euler critical buckling load pin-ended column formula`
  - `truss reaction forces global equilibrium verification`

---

## 7. Vibe-Coding Prompting-Tipps

Falls Sie KI-Assistenten verwenden, beachten Sie folgende Vorgaben zur Vermeidung typischer KI-Fehler:

> [!TIP]
> **Prompt-Vorlage 1: Saubere Blockpartitionierung ohne Penalty-Pfusch**  
> *„Erstelle mir in C# unter Nutzung von `MathNet.Numerics.LinearAlgebra.Double.DenseMatrix` eine Methode zur Blockpartitionierung eines LGS $K \cdot u = f$. Gegeben sind die Listen `List<int> freeDofs` und `List<int> fixedDofs`. Verwende KEINE Penalty-Methode (keine riesigen Zahlen auf der Diagonale), sondern extrahiere echte Submatrizen $K_{ff}$ und $K_{fp}$ und löse $u_f = K_{ff}.\text{Cholesky}().\text{Solve}(f_f - K_{fp} u_p)$.“*

> [!WARNING]
> **Prompt-Vorlage 2: Stabkräfteberechnung mit Vorzeichenkonsistenz**  
> *„Zeige mir die C#-Formel zur Berechnung der Stabnormalkraft $N$ aus den Knotenverschiebungen $\mathbf{u}_i$ und $\mathbf{u}_j$. Achte strikt auf das Vorzeichen: Verlängerung $\Delta L > 0$ muss Zugkraft ($N > 0$) ergeben, Verkürzung $\Delta L < 0$ Druckkraft ($N < 0$). Berechne auch die Euler-Knicklast $N_{\text{crit}} = \pi^2 E I / L^2$ und prüfe auf Versagen.“*

---

## 8. 🔍 Peer-Review-Leitfragen für das Auditorium

Beim wöchentlichen „Showcase & Peer-Challenge“ prüft das Auditorium die vorgeführten Lösungen anhand folgender Fragen:

1. **Globales Gleichgewicht & Invarianten-Check:** Ergibt die Vektorsumme aller Auflagerkräfte $\mathbf{f}_p$ plus der aktuellen Wanderlast exakt $\vec{0}$? *(Auditorium-Test: Live-Abfrage von $\sum F_y$ am Beamer – weicht der Wert um mehr als $10^{-9}\,\text{N}$ ab?)*
2. **Mathematische Partitionierung vs. Diagonale-Tricks:** Wurde das LGS sauber über Submatrizen partitioniert, oder wurden Lagerbedingungen durch Überschreiben von Zeilen mit $1{,}0$ und $0$ erzwungen (was die Cholesky-Symmetrie zerstören kann)?
3. **Verhalten bei Mechanismen / Stabbruch:** Was geschieht in Track B, wenn ein zentraler Stab entfernt wird? Fängt der Code die singuläre Matrix sauber über einen Try-Catch-Block für `NonPositiveDefiniteException` ab, oder stürzt die WPF-Anwendung mit einem unbehandelten Fehler ab?
4. **Physikalische Plausibilität der Verformung:** Verformen sich die Stäbe stetig unter der wandernden Last, oder springen Knoten sprunghaft hin und her (was auf falsche Indizierung in der Assemblierungsschleife hinweist)?
