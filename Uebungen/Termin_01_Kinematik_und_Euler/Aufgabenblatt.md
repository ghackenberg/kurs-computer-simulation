# Aufgabenblatt 01: Kinematik, Zustandsraum & Expliziter Euler

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** B.Sc. Automatisierungstechnik, 5. Semester  
**Institution:** Fachhochschule Oberösterreich – Campus Wels  
**Bearbeitungsform:** 
- **Stufe A (In-Class Sprint):** Einzelarbeit oder 2er-Tandem (Labor, 60 min)
- **Stufe B (Homework Extension):** Festes 2er-Team (1 Woche, ca. 2–3 h pro Person)
**Technologie-Vorgabe:** C# 12 / .NET 8 oder .NET 10 Konsolenapplikation (`System.Numerics.Vector2`).  
> [!CAUTION]
> **Vorgreif-Sperre für Termin 01:**  
> In diesem Übungsblatt sind **ausschließlich reine Konsolenprogramme** zulässig. **KEIN** WPF, **KEIN** ScottPlot, **KEIN** Multithreading (`Parallel.For`), **KEIN** SharpGL! Visualisierung erfolgt über formatierte Konsolentabellen, ASCII-Art oder CSV-Export.

---

## 1. Lernziele (Intended Learning Outcomes - ILOs)

Nach erfolgreicher Bearbeitung dieses Aufgabenblattes können Sie:
1. **Zustandsraum-Transformation:** Eine mechanische Bewegungsgleichung 2. Ordnung ($\ddot{x} = f(t, x, \dot{x})$) in ein System gekoppelter Differentialgleichungen 1. Ordnung im Vektor-Zustandsraum $\dot{\mathbf{x}} = \mathbf{f}(t, \mathbf{x})$ überführen.
2. **Numerische Zeitdiskretisierung:** Das explizite Euler-Verfahren und das Prädiktor-Korrektor-Verfahren nach Heun (Runge-Kutta 2. Ordnung) mathematisch und in C# sauber implementieren.
3. **Schrittweiten- und Fehleranalyse:** Den globalen Diskretisierungsfehler $\mathcal{O}(\Delta t)$ vs. $\mathcal{O}(\Delta t^2)$ experimentell durch Halbierung der Schrittweite nachweisen und mit der analytischen Grenzfalllösung vergleichen.
4. **Physikalische Ereignis-Interpolation:** Das Auftreffen auf eine Begrenzungsfläche (Bodenkontakt, Anschlag) durch lineare Schnittpunkt-Interpolation ermitteln, ohne dass es zu unrealistischer Durchdringung (Tunneling) kommt.
5. **Ingenieurmäßige Entkopplung:** Die Simulationsrechnung (Zustand, Ableitung, Integrationsschritt) strikt von der Textausgabe trennen.

---

## 2. Mathematische Grundlagen

### 2.1 Zustandsraum und Systemableitung
Ein mechatronisches System zweiter Ordnung mit Ortskoordinate $x$ (bzw. Vektor $\vec{r} = [x, y]^\top$) und Geschwindigkeit $v = \dot{x}$ wird über den Zustandsvektor $\mathbf{x}$ beschrieben:
$$\mathbf{x}(t) = \begin{bmatrix} x(t) \\ v(t) \end{bmatrix} \in \mathbb{R}^2 \quad \implies \quad \dot{\mathbf{x}}(t) = \begin{bmatrix} \dot{x}(t) \\ \dot{v}(t) \end{bmatrix} = \begin{bmatrix} v(t) \\ a(t, x, v) \end{bmatrix} = \mathbf{f}(t, \mathbf{x})$$

### 2.2 Expliziter Euler-Integrator
Beim expliziten Euler-Verfahren erfolgt die Extrapolation entlang der Tangente am aktuellen Zeitschritt $t_k$:
$$\mathbf{x}_{k+1} = \mathbf{x}_k + \Delta t \cdot \mathbf{f}(t_k, \mathbf{x}_k)$$
- **Lokaler Trunkierungsfehler:** $\mathcal{O}(\Delta t^2)$
- **Globaler Fehler:** $\mathcal{O}(\Delta t)$ (Verfahren 1. Ordnung)

### 2.3 Heun-Verfahren (Prädiktor-Korrektor / RK2)
Das Heun-Verfahren mittelt die Steigung am Intervallanfang und Intervallende:
$$\text{Prädiktor (Euler-Hilfsschritt):} \quad \tilde{\mathbf{x}}_{k+1} = \mathbf{x}_k + \Delta t \cdot \mathbf{f}(t_k, \mathbf{x}_k)$$
$$\text{Korrektor (Mittelwert-Update):} \quad \mathbf{x}_{k+1} = \mathbf{x}_k + \frac{\Delta t}{2} \left[ \mathbf{f}(t_k, \mathbf{x}_k) + \mathbf{f}(t_k + \Delta t, \, \tilde{\mathbf{x}}_{k+1}) \right]$$
- **Globaler Fehler:** $\mathcal{O}(\Delta t^2)$ (Verfahren 2. Ordnung)

### 2.4 Exakte Schnittpunkt-Interpolation bei Grenzüberschreitung
Erreicht der Zustand im Zeitschritt $k+1$ eine unzulässige Penetration (z. B. $y_{k+1} < 0$ bei Bodenkontakt oder $x_{k+1} > s_{\max}$ beim Zylinderanschlag), darf nicht einfach der Zustand $k+1$ verworfen oder beibehalten werden. Die reale Auftreffzeit $t^* \in [t_k, t_{k+1}]$ wird über lineare Interpolation ermittelt:
$$\tau = \frac{0 - y_k}{y_{k+1} - y_k} \in [0, 1] \implies t^* = t_k + \tau \cdot \Delta t, \quad x^* = x_k + \tau \cdot (x_{k+1} - x_k)$$

---

## 3. Stufe A: In-Class Sprint (60 Minuten)

**Thema:** Schiefer Wurf im Vakuum mit explizitem Euler  
**Ziel:** Schreiben Sie ein minimales, sauberes Konsolenprogramm in C#, das die Flugbahn eines schiefen Wurfs im Vakuum berechnet und den Diskretisierungsfehler quantifiziert.

### Aufgabenstellung:
1. Erstellen Sie eine C#-Konsolenanwendung `Sprint_EulerVakuum`.
2. Definieren Sie einen unveränderlichen Zustand:
   ```csharp
   public readonly record struct ProjectileState(double X, double Y, double Vx, double Vy);
   ```
3. Modellieren Sie die DGL 2. Ordnung für den schiefen Wurf im Schwerefeld der Erde ($g = 9{,}81\,\text{m/s}^2$):
   $$\dot{x} = v_x, \quad \dot{y} = v_y, \quad \dot{v}_x = 0, \quad \dot{v}_y = -g$$
4. Integrieren Sie mit dem expliziten Euler-Verfahren ausgehend von:
   - Startposition: $x_0 = 0\,\text{m}, \; y_0 = 0\,\text{m}$
   - Abgangsgeschwindigkeit: $v_0 = 150\,\text{m/s}$
   - Abschusswinkel: $\alpha = 45^\circ$ ($\implies v_{x,0} = v_0 \cos \alpha, \; v_{y,0} = v_0 \sin \alpha$)
5. Führen Sie die Simulation für zwei Schrittweiten durch:
   - Lauf 1: $\Delta t = 0{,}1\,\text{s}$
   - Lauf 2: $\Delta t = 0{,}01\,\text{s}$
6. Brechen Sie die Schleife ab, sobald $y_{k+1} \le 0$ ist, und berechnen Sie $x_{\text{impact}}$ mittels linearer Nullstellen-Interpolation.
7. Vergleichen Sie Wurfweite $x_{\text{num}}$ und Flugzeit $t_{\text{num}}$ mit den geschlossenen analytischen Vakuumlösungen:
   $$t_{\text{ana}} = \frac{2 v_0 \sin \alpha}{g} \approx 21{,}623\,\text{s}, \quad x_{\text{ana}} = \frac{v_0^2 \sin(2\alpha)}{g} \approx 2293{,}58\,\text{m}$$
8. Geben Sie die Ergebnisse tabellarisch auf der Konsole aus:
   ```text
   === SPRINT-ERGEBNISSE: SCHIEFER WURF IM VAKUUM ===
   Analytisch:  t = 21.623 s | x_impact = 2293.58 m
   Euler dt=0.10s: t = 21.623 s | x_impact = 2293.58 m | Diff = 0.000 m
   Euler dt=0.01s: t = 21.623 s | x_impact = 2293.58 m | Diff = 0.000 m
   ```
   *(Erkenntnisfrage für das Plenum: Warum trifft der explizite Euler beim schiefen Wurf im Vakuum in $x$ die exakte Reichweite, während die Kurvenhöhe einen systematischen Fehler aufweist?)*

---

## 4. Stufe B: Homework Extension (Wahlmodell)

> [!IMPORTANT]
> **Wahlmodell – GENAU EINE Aufgabe (keine Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **entweder Track A (Industrie)** ODER **Track B (Simulation Game)**.  
> Beide Tracks basieren auf denselben mathematischen Integrationsprinzipien (Euler vs. Heun, nichtlineare Dämpfung/Widerstand, Ereignisprüfung) und werden nach denselben Qualitätskriterien mit maximal 10 Punkten bewertet.

```
                    ┌──────────────────────────────────────────────┐
                    │ WÄHLEN SIE GENAU EINEN DER BEIDEN TRACKS:    │
                    └──────────────────────┬───────────────────────┘
                                           │
                 ┌─────────────────────────┴─────────────────────────┐
                 ▼                                                   ▼
┌─────────────────────────────────┐                 ┌─────────────────────────────────┐
│  Track A: Industrie & Mechatronik│                 │   Track B: Simulation Game      │
│  Hydraulikzylinder-Dämpfung mit │                 │   Artillery Strike / Retro Tank │
│  viskoser & Blenden-Reibung     │                 │   mit Newton-Drag & Windböen    │
└─────────────────────────────────┘                 └─────────────────────────────────┘
```

---

### Track A (Industrie): Hydraulikzylinder-Endlagendämpfung & Parameterstudie

#### Mechatronisches Szenario:
In einer hydraulischen Spritzguss- oder Pressenanlage wird ein Kolben mit Masse $m = 80\,\text{kg}$ durch einen konstanten Systemdruck $p = 120\,\text{bar} = 12 \times 10^6\,\text{N/m}^2$ auf einer Kolbenfläche $A_{\text{k}} = 0{,}005\,\text{m}^2$ angetrieben ($F_{\text{hyd}} = p \cdot A_{\text{k}} = 60\,000\,\text{N}$).  
Vor Erreichen des mechanischen Festanschlags bei $x_{\text{anschlag}} = 0{,}80\,\text{m}$ taucht der Dämpfungszapfen bei $x_{\text{d}} = 0{,}65\,\text{m}$ in die Endlagendämpfungsbuchse ein.

#### Physikalisches Modell:
Zustandsvektor: $\mathbf{x} = \begin{bmatrix} x & v \end{bmatrix}^\top$.  
Bewegungsgleichung:
$$m \ddot{x} = F_{\text{vor}} - F_{\text{dämpf}}(x, v) - F_{\text{anschlag}}(x)$$

1. **Antriebskraft:**
   $$F_{\text{vor}} = 60\,000\,\text{N} \quad (\text{für } 0 \le x < 0{,}80\,\text{m})$$
2. **Dämpfungscharakteristik:**
   - Im Freilaufbereich ($x < 0{,}65\,\text{m}$): Reines viskoses Schmierfilm-Gleiten:
     $$F_{\text{dämpf}} = d_{\text{lin}} \cdot v, \quad d_{\text{lin}} = 250\,\text{N}\cdot\text{s/m}$$
   - Im Dämpfungsbereich ($x \ge 0{,}65\,\text{m}$): Zusätzliche quadratische Blendenströmung durch den Drosselspalt:
     $$F_{\text{dämpf}} = d_{\text{lin}} \cdot v + c_{\text{blend}} \cdot v \cdot |v|, \quad c_{\text{blend}} = 15\,000\,\text{N}\cdot\text{s}^2/\text{m}^2$$
3. **Endanschlagfeder (Kontaktkraft bei $x \ge 0{,}80\,\text{m}$):**
   $$F_{\text{anschlag}} = c_{\text{kontakt}} \cdot (x - 0{,}80\,\text{m}) + d_{\text{kontakt}} \cdot v \quad (\text{falls } x > 0{,}80\,\text{m})$$
   mit $c_{\text{kontakt}} = 5 \times 10^7\,\text{N/m}$ und $d_{\text{kontakt}} = 40\,000\,\text{N}\cdot\text{s/m}$.

#### Aufgabenstellung Track A:
1. Implementieren Sie die Zustandsableitung $\dot{\mathbf{x}} = \mathbf{f}(t, \mathbf{x})$ in einer separaten Klasse `HydraulicCylinderModel`.
2. Implementieren Sie zwei Solver-Algorithmen:
   - `EulerSolver` (expliziter Euler)
   - `HeunSolver` (Heun RK2)
3. **Parameterstudie zur Schrittweitenstabilität:**
   - Simulieren Sie den Vorgang bis zum Stillstand ($t_{\text{end}} = 0{,}10\,\text{s}$) mit Schrittweiten $\Delta t \in \{10\,\mu\text{s}, 100\,\mu\text{s}, 500\,\mu\text{s}, 2\,\text{ms}\}$.
   - Zeigen Sie, ab welcher Schrittweite der explizite Euler am Kontaktanschlag instabil wird (Oszillation/Explosion), während Heun noch stabiles Einschwingen zeigt.
4. **Ausgabe & Auswertung:**
   - Schreiben Sie die Trajektoriedaten ($t, x, v, a, F_{\text{dämpf}}$) in eine `.csv`-Datei (`simulation_cylinder.csv`).
   - Geben Sie eine ASCII-Übersichtstabelle der Spitzenverzögerung $a_{\min}$ und des maximalen Anschlagwegs $x_{\max}$ auf der Konsole aus.

---

### Track B (Simulation Game): Retro Artillery Duel mit Newton-Luftwiderstand & Windböen

#### Gaming-Szenario:
Im rundenbasierten Klassiker *Retro Tank Duel* feuern zwei Panzer Artilleriegeschosse über unebenes Terrain ab. Die Ballistik soll im Gegensatz zu einfachen Arcade-Titeln auf echter Newtonscher Aerodynamik mit stochastischem Wind basieren.

#### Physikalisches Modell:
Zustandsvektor: $\mathbf{x} = \begin{bmatrix} x & y & v_x & v_y \end{bmatrix}^\top$.  
Windvektor: $\vec{w} = [w_x, 0]^\top$.  
Relativgeschwindigkeit zum Medium Luft:
$$\vec{v}_{\text{rel}} = \begin{bmatrix} v_x - w_x \\ v_y \end{bmatrix}, \quad v_{\text{rel}} = \|\vec{v}_{\text{rel}}\| = \sqrt{(v_x - w_x)^2 + v_y^2}$$
DGL-System unter quadratischem Luftwiderstand:
$$\dot{x} = v_x, \quad \dot{y} = v_y$$
$$\dot{v}_x = -\frac{\rho \, c_{\text{w}} A}{2m} \, v_{\text{rel}} \, (v_x - w_x)$$
$$\dot{v}_y = -g - \frac{\rho \, c_{\text{w}} A}{2m} \, v_{\text{rel}} \, v_y$$
Physikalische Parameter:
- Gravitation: $g = 9{,}81\,\text{m/s}^2$, Luftdichte: $\rho = 1{,}225\,\text{kg/m}^3$
- Granatenmasse: $m = 10{,}0\,\text{kg}$, Kaliberradius $r = 0{,}06\,\text{m}$ ($A = \pi r^2 \approx 0{,}01131\,\text{m}^2$)
- Widerstandsbeiwert: $c_{\text{w}} = 0{,}25$
- Abgangsgeschwindigkeit: $v_0 = 160\,\text{m/s}$
- Höhenprofil des Geländes:
  $$y_{\text{terrain}}(x) = 50 \cdot \sin(0{,}002 \cdot x) + 20 \cdot \cos(0{,}005 \cdot x)$$
- Zielkoordinate: Feindlicher Bunker bei $x_{\text{ziel}} = 1400\,\text{m}, \; y_{\text{ziel}} = y_{\text{terrain}}(1400) \approx 28{,}77\,\text{m}$.

#### Aufgabenstellung Track B:
1. Implementieren Sie die Modellklasse `BallisticEngine` mit gekapselter Vektorrechnung.
2. Implementieren Sie `EulerSolver` und `HeunSolver` (RK2).
3. **Kollisionserkennung & Geländeschnittpunkt:**
   - Die Kollision findet statt, sobald $y_k \le y_{\text{terrain}}(x_k)$.
   - Berechnen Sie den Einschlagspunkt $x_{\text{impact}}$ über lineare Interpolation zwischen Schritt $k$ und $k+1$.
4. **Automatischer Schusswinkel-Finder (KI-Zielrechner):**
   - Implementieren Sie einen Zielsuch-Algorithmus (Bisektion oder Winkelsweep in Intervallen $[10^\circ, 80^\circ]$ mit Schrittweite $0{,}1^\circ$), der bei gegebener Windgeschwindigkeit $w_x$ den Schusswinkel $\alpha$ ermittelt, bei dem das Projektil das Ziel auf $\pm 1{,}5\,\text{m}$ trifft.
5. **Stochastische Runden-Simulation:**
   - Simulieren Sie 5 Schussfolgen mit stochastischem Wind $w_x \sim \mathcal{U}(-15, +15)\,\text{m/s}$.
   - Geben Sie pro Schuss den berechneten Zielwinkel $\alpha$, die Flugdauer und eine einfache ASCII-Plot-Darstellung der Flugbahn (Matrix $80 \times 25$ Zeichen) oder einen CSV-Export aus.

---

## 5. Akzeptanzkriterien & Bewertungsrubrik (10 Punkte)

Die Abnahme erfolgt anhand des lauffähigen Codes und eines kurzen technischen Berichts (`README.md` im Projektordner):

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **Saubere Architektur & Entkopplung** | 2 P. | Physikmodell (`Model`), Integrator (`Solver`) und I/O (`Console`/CSV) sind strikt in Klassen getrennt. Keine globalen Zustände. |
| **Korrektheit der DGL & Relativbewegung** | 3 P. | Mathematisch exakte Implementierung von Euler und Heun. In Track A korrekte Dämpfungszonen; in Track B korrekte Relativwind-Transformation. |
| **Ereignis- & Schnittpunktbehandlung** | 2 P. | Exakte Nullstellen-/Kollisions-Interpolation (kein unbemerktes Durchdringen von Boden bzw. Anschlag). |
| **Stabilitätsanalyse & Parameterstudie** | 2 P. | Track A: Dokumentierter Nachweis der Stabilitätsgrenze $\Delta t_{\text{krit}}$. Track B: Konvergierender Bisektions-Winkelsucher unter Gegen- und Rückenwind. |
| **Dokumentation & Code-Qualität** | 1 P. | Übersichtliche Konsolenausgabe/CSV, nachvollziehbare Dokumentation mit Vergleichstabelle (Euler vs. Heun). |
| **Gesamt** | **10 P.** | **100 % der Übungseinheit** |

---

## 6. Online-Recherche-Box

Nutzen Sie für Ihre Recherche folgende offizielle Quellen und präzise Fachbegriffe:
- **Offizielle Dokumentation:**
  - [Microsoft Learn: System.Numerics.Vector2](https://learn.microsoft.com/de-de/dotnet/api/system.numerics.vector2) – Vektor-Arithmetik in modernem .NET.
  - [Wikipedia: Heun's Method](https://en.wikipedia.org/wiki/Heun%27s_method) – Mathematische Formulierung des Prädiktor-Korrektor-Prinzips.
  - [Wikipedia: Quadratic Drag](https://en.wikipedia.org/wiki/Drag_(physics)#Quadratic_drag) – Physikalische Herleitung der Luftwiderstandskraft.
- **Gezielte englische Suchbegriffe:**
  - `Heun predictor corrector method C# implementation`
  - `explicit Euler numerical instability step size stiffness`
  - `projectile trajectory linear interpolation impact ground detection`

---

## 7. Vibe-Coding Prompting-Tipps

Falls Sie zur Unterstützung ein LLM (GitHub Copilot, Claude, ChatGPT) nutzen, beachten Sie folgende Hinweise:
> [!WARNING]
> **Typischer KI-Fehler bei Termin 01:**
> - KIs neigen dazu, vorzeitige GUI-Frameworks (WPF, Windows Forms) oder NuGets (wie Math.NET oder OxyPlot) einzubinden, obwohl nur eine Konsole verlangt ist.
> - KIs berechnen den Luftwiderstand oft vereinfacht als $c_{\text{w}} v_x^2$ und $c_{\text{w}} v_y^2$, was mathematisch falsch ist! Der Betrag der Kraft muss immer über die Relativgeschwindigkeit $\|\vec{v}_{\text{rel}}\|$ berechnet und in Vektorrichtung projiziert werden.

### Empfohlener System-Prompt für LLMs:
```text
Du bist Experte für numerische Simulation in C#.
Schreibe eine konsolenbasierte C#-Konsolenklasse ohne externe Abhängigkeiten (nur .NET 8 Standardbibliotheken, System.Numerics).
Erstelle das explizite Euler- und das Heun-Verfahren (RK2) für ein DGL-System 1. Ordnung.
Kapsele den Zustand in ein readonly record struct.
Achte bei der Luftreibung penibel darauf, die Relativgeschwindigkeit v_rel = sqrt((vx - wx)^2 + vy^2) als Skalar zu berechnen und die Reibungskraft vektoriell entgegengesetzt zur Relativgeschwindigkeit wirken zu lassen.
Verwende KEIN WPF, KEIN ScottPlot und KEIN Multithreading.
```

---

## 8. 🔍 Peer-Review-Leitfragen für das Plenum (Showcase & Peer-Challenge)

Beim wöchentlichen Showcase-Starttermin werden zwei Teams an das Beamer-Pult gerufen. Das Auditorium prüft die Lösung anhand folgender Kernfragen:

1. **Vektorkonsistenz des Widerstands:**  
   *„Wird die Reibungskraft in jedem Zeitschritt echt vektoriell aus dem Betrag der Relativgeschwindigkeit $\|\vec{v} - \vec{w}\|$ skaliert, oder wurden $x$- und $y$-Komponente unzulässig unabhängig voneinander quadriert?“*
2. **Schrittweiten-Stresstest live am Beamer:**  
   *„Was passiert, wenn die Schrittweite $\Delta t$ live um den Faktor 5 erhöht wird? Explodiert der explizite Euler im Anschlag/Gelände, während Heun noch dämpft?“*
3. **Kollisions-Tunneling:**  
   *„Taucht das Projektil oder der Kolben bei größerer Schrittweite tief in die Barriere ein, oder sorgt die lineare Interpolation für einen exakten Grenzwert?“*
4. **Vorzeichenprüfung bei Winddrift:**  
   *„Bremst ein Gegenwind ($w_x < 0$) das Geschoss korrekt ab und steilt die Bahnkurve ab, oder führt ein Vorzeichenfehler zu unrealistischem Vorwärtsschub?“*
