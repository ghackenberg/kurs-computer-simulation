# Aufgabenblatt Termin 08: Dynamische Modelle Kontinuierlich, S-Function-Architektur & RK4-Solver
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
### FH Oberösterreich – Campus Wels | Studiengang Automatisierungstechnik

---

| Metadaten | Details |
| :--- | :--- |
| **Lehrveranstaltungseinheit:** | Termin 08 (begleitend zu Kapitel 08: Dynamische Modelle Kontinuierlich) |
| **Themenschwerpunkt:** | Kontinuierliche DGL-Systeme, S-Function-Architektur, Runge-Kutta 4 (RK4) & PID Anti-Windup Clamping |
| **Technologie-Stack:** | C# 12 / .NET 8/10, S-Function-Klassenstruktur, ScottPlot 5 / WPF |
| **Vorgreif-Sperre:** | **Erlaubt:** RK4-Integrator, S-Functions (`Derivatives`, `Outputs`), PID-Clamping, ScottPlot 5.<br>**Strengstens verboten:** *KEINE* Diskrete Ereignissimulation (DES, `PriorityQueue`), *KEINE* Zero-Crossing Wurzelsuche! |
| **Zeitbudget:** | **In-Class Sprint:** 60 Minuten (Laborpräsenz)<br>**Homework Extension:** 2–3 Stunden (2er-Team, 1 Woche) |
| **Abgabeform:** | Git-Repository: Sourcecode, Unit-Tests und Markdown-Bericht (`README.md`) |

---

## 1. Lernziele (Intended Learning Outcomes - ILOs)

Nach erfolgreicher Bearbeitung dieser Übungseinheit sind Sie in der Lage:
1. **S-Function-Architektur anwenden:** Dynamische mechatronische Systeme nach dem Vorbild von MATLAB/Simulink modular in C#-Klassen mit wohldefinierten Schnittstellen (`Derivatives`, `Outputs`, `Update`) zu kapseln.
2. **Klassisches Runge-Kutta 4 (RK4) implementieren:** Den 4-stufigen RK4-Integrationsalgorithmus im Zustandsraum $\dot{\mathbf{x}} = \mathbf{f}(t, \mathbf{x}, \mathbf{u})$ ohne Seiteneffekte programmtechnisch umzusetzen.
3. **Aktorsättigung & Anti-Windup Clamping beherrschen:** Das gefürchtete Integral-Windup bei physikalisch begrenzten Stellgrößen durch Conditional Integration (Clamping-Kriterium $e \cdot u_{\text{raw}} > 0$) mathematisch sauber zu eliminieren.
4. **Regelkreisdynamik analysieren:** Das Einschwingverhalten geregelter mechatronischer Systeme unter massiven Laststörungen quantitativ zu vermessen und die numerische Stabilität gegenüber Euler-Verfahren nachzuweisen.

---

## 2. Mathematisch-Theoretische Grundlagen

### 2.1 S-Function Block-Architektur

In Anlehnung an MATLAB/Simulink S-Functions trennt die Architektur strikt zwischen kontinuierlichen Zuständen $\mathbf{x}$, Ableitungen $\dot{\mathbf{x}} = \mathbf{f}(t, \mathbf{x}, \mathbf{u})$ und Ausgängen $\mathbf{y} = \mathbf{g}(t, \mathbf{x}, \mathbf{u})$:

```
┌────────────────────────────────────────────────────────────────────────┐
│ S-FUNCTION BLOCK-SCHNITTSTELLE                                         │
│                                                                        │
│                  ┌───────────────────────────────────┐                 │
│                  │ ContinuousBlock                   │                 │
│   Eingänge u ───>│                                   ├───> Ausgänge y  │
│                  │  Outputs(t, x, u)                 │                 │
│                  │  Derivatives(t, x, u) -> x_dot    │                 │
│                  └───────────────────────────────────┘                 │
│                                    ▲                                   │
│                                    │  x_k+1                            │
│                  ┌─────────────────┴─────────────────┐                 │
│                  │ RK4-Solver: x_k+1 = x_k + h/6(...) │                 │
│                  └───────────────────────────────────┘                 │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Klassischer Runge-Kutta-Solver 4. Ordnung (RK4)

Für ein Anfangswertproblem $\dot{\mathbf{x}} = \mathbf{f}(t, \mathbf{x}, \mathbf{u})$ berechnet RK4 pro Zeitschritt $h = \Delta t$ vier Zwischensteigungen:

$$\begin{aligned}
\mathbf{k}_1 &= \mathbf{f}\left(t_k, \; \mathbf{x}_k, \; \mathbf{u}(t_k)\right) \\
\mathbf{k}_2 &= \mathbf{f}\left(t_k + \frac{h}{2}, \; \mathbf{x}_k + \frac{h}{2}\mathbf{k}_1, \; \mathbf{u}\left(t_k + \frac{h}{2}\right)\right) \\
\mathbf{k}_3 &= \mathbf{f}\left(t_k + \frac{h}{2}, \; \mathbf{x}_k + \frac{h}{2}\mathbf{k}_2, \; \mathbf{u}\left(t_k + \frac{h}{2}\right)\right) \\
\mathbf{k}_4 &= \mathbf{f}\left(t_k + h, \; \mathbf{x}_k + h\mathbf{k}_3, \; \mathbf{u}(t_k + h)\right)
\end{aligned}$$

Zustandsaktualisierung mit lokaler Fehlerordnung $\mathcal{O}(h^5)$ und globaler Ordnung $\mathcal{O}(h^4)$:

$$\mathbf{x}_{k+1} = \mathbf{x}_k + \frac{h}{6} \left(\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4\right)$$

### 2.3 Aktorsättigung & Anti-Windup Clamping (Conditional Integration)

Reale Stellglieder (Motoren, Ventile, Triebwerke) besitzen harte physikalische Grenzen: $u(t) \in [u_{\min}, u_{\max}]$.  
Ein Standard-PID-Regler berechnet die ungesättigte Rohstellgröße:

$$u_{\text{raw}}(t) = K_{\text{p}} e(t) + K_{\text{i}} x_{\text{i}}(t) + K_{\text{d}} \dot{e}(t), \quad \text{wobei } e(t) = w(t) - y(t)$$

Die reale Stellgröße am Aktor wird gesättigt:

$$u(t) = \text{clamp}(u_{\text{raw}}(t), u_{\min}, u_{\max})$$

Läuft das Stellglied in die Sättigung ($u_{\text{raw}} \neq u$), wächst der I-Anteil $x_{\text{i}}$ bei naivem Integrieren unbegrenzt weiter (**Windup**). Beim **Clamping** wird die Integration des I-Anteils angehalten, wenn zwei Bedingungen gleichzeitig erfüllt sind:
1. Der Ausgang ist gesättigt: $u_{\text{raw}} > u_{\max}$ ODER $u_{\text{raw}} < u_{\min}$.
2. Regelfehler und Stellgröße treiben das System noch tiefer in die Sättigung: $\text{sign}(e) == \text{sign}(u_{\text{raw}})$ bzw. $e \cdot u_{\text{raw}} > 0$.

$$\frac{\mathrm{d}x_{\text{i}}}{\mathrm{d}t} = \begin{cases} 0 & \text{wenn gesättigt UND } e \cdot u_{\text{raw}} > 0 \\ e(t) & \text{sonst} \end{cases}$$

---

## 3. Stufe A: In-Class Sprint (60 min)

### Thema: „DC-Servomotor als S-Function mit RK4“

Implementieren Sie eine C#-Konsolenapplikation (`DcMotorRk4Sprint`), die einen fremderregten Gleichstrom-Servomotor mit elektromechanischer Kopplung als 3-Zustands-S-Function modelliert und die Sprungantwort via RK4 berechnet.

```
┌────────────────────────────────────────────────────────────────────────┐
│ STUFE A: GLEICHSTROM-SERVOMOTOR                                        │
│                                                                        │
│   U_A ──[ R_A ]──[ L_A ]──(+)───>  i_A (Ankerstrom)                    │
│                            │ -                                         │
│                           ( U_ind = k_e * omega )                      │
│                                                                        │
│   Drehmoment: M_mot = k_m * i_A                                        │
│   Mechanik:   J * d(omega)/dt = M_mot - d * omega - M_Last             │
│   Winkel:     d(theta)/dt = omega                                      │
└────────────────────────────────────────────────────────────────────────┘
```

#### Motorparameter:
- Ankerwiderstand: $R_{\text{A}} = 2{,}0\,\Omega$
- Ankerinduktivität: $L_{\text{A}} = 0{,}05\,\text{H}$
- Drehmomentkonstante: $k_{\text{m}} = 0{,}1\,\text{N}\cdot\text{m/A}$
- Induktionskonstante: $k_{\text{e}} = 0{,}1\,\text{V}\cdot\text{s/rad}$
- Massenträgheitsmoment: $J = 0{,}005\,\text{kg}\cdot\text{m}^2$
- Viskose Dämpfung: $d = 0{,}001\,\text{N}\cdot\text{m}\cdot\text{s/rad}$

#### Aufgabenstellung (Schritt für Schritt):

1. **Zustandsvektor definieren:**
   Kapseln Sie den Zustand in ein `double[] x = new double[3]`:
   - $x[0] = i_{\text{A}}$ (Ankerstrom in A)
   - $x[1] = \omega$ (Winkelgeschwindigkeit in rad/s)
   - $x[2] = \theta$ (Drehwinkel in rad)
2. **Ableitungsfunktion implementieren:**
   ```csharp
   public static double[] Derivatives(double t, double[] x, double uA, double mLoad)
   {
       double iA = x[0], w = x[1];
       double diA_dt = (uA - RA * iA - ke * w) / LA;
       double dw_dt  = (km * iA - d * w - mLoad) / J;
       double dth_dt = w;
       return new double[] { diA_dt, dw_dt, dth_dt };
   }
   ```
3. **RK4-Schrittfunktion implementieren:**
   Implementieren Sie die 4-stufige RK4-Integration für eine Schrittweite $h = 0{,}001\,\text{s}$ ($1\,\text{ms}$).
4. **Sprungantwort simulieren:**
   - Anfangszustand: $\mathbf{x}(0) = \begin{bmatrix} 0 & 0 & 0 \end{bmatrix}^\top$.
   - Bei $t = 0$: Spannungssprung $u_{\text{A}} = 24{,}0\,\text{V}$, Leerlauf ($M_{\text{Last}} = 0$).
   - Simulieren Sie von $t = 0$ bis $t = 0{,}5\,\text{s}$.
5. **Stationären Endwert verifizieren:**
   Berechnen Sie den analytischen stationären Endwert für $\omega_{\infty}$ im Leerlauf:
   $$\omega_{\infty} = \frac{k_{\text{m}} \cdot u_{\text{A}}}{R_{\text{A}} \cdot d + k_{\text{m}} \cdot k_{\text{e}}} = \frac{0{,}1 \cdot 24}{2 \cdot 0{,}001 + 0{,}1 \cdot 0{,}1} = \frac{2{,}4}{0{,}002 + 0{,}010} = \frac{2{,}4}{0{,}012} = 200{,}0\,\text{rad/s}$$
   Geben Sie den numerischen Wert $\omega(0{,}5\,\text{s})$ auf der Konsole aus und vergleichen Sie den relativen Fehler.

**Erwartetes Ergebnis nach 50 Minuten:**  
$\omega(0{,}5\,\text{s}) \approx 199{,}99\,\text{rad/s}$ mit relativem Fehler $< 0{,}01\,\%$.

---

## 4. Stufe B: Homework Extension (Wahlmodell – GENAU EINE Aufgabe!)

> [!IMPORTANT]
> **Pick your Track (Wahlmodell – KEINE Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **GENAU EINEN** der beiden Tracks:
> - **Track A (Industrie):** Industrie-Servomotor mit PID-Lageregelung, Lastsprung & Anti-Windup Clamping
> - **Track B (Simulation Game):** SpaceX Falcon Hop & Booster Landing mit kaskadiertem PID & Schubvektor
> 
> Beide Aufgaben basieren auf der RK4-Integration und dem Anti-Windup Clamping-Algorithmus. Bearbeiten Sie **NUR EINEN** Track!

---

### Track A (Industrie): Industrieller DC-Servomotor mit Lastsprung & Anti-Windup Clamping

#### Industrieller Kontext:
In CNC-Werkzeugmaschinen und Roboterachsen müssen Servomotoren Zielpositionen exakt anfahren. Taucht die Frässpindel plötzlich ins Werkstück ein, bricht ein massives Störlastmoment über das System herein. Ohne Anti-Windup läuft der I-Anteil in die Sättigung, was zu unzulässigen Werkstückbeschädigungen und Nachschwingern führt.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK A: REGELKREIS MIT AKTOR-SÄTTIGUNG & CLAMPING                     │
│                                                                        │
│   w(t) ──(+)──> e(t) ──> [ PID-Regler ] ──> u_raw ──> [ Sättigung ] ──> u_A ──> [ DC-Motor ] ──> theta(t)
│           ▲ -                 │                         [-24V, +24V]           │
│           │                   ▼                                                │
│           │            Clamping-Logik:                                         │
│           │            Stop d(xi)/dt if saturated && e*u_raw > 0               │
│           └────────────────────────────────────────────────────────────────────┘
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track A:

1. **Systemerweiterung mit PID-Lageregler:**
   - Erweitern Sie das Motormodell aus Stufe A zu einem geschlossenen Regelkreis für den Drehwinkel $\theta(t)$.
   - Sollwert: Positionssprung $w(t) = \theta_{\text{soll}} = 10{,}0\,\text{rad}$ bei $t = 0$.
   - Stellgrößenbegrenzung: Motorspannung $u_{\text{A}} \in [-24\,\text{V}, +24\,\text{V}]$.
2. **Implementierung der Anti-Windup Clamping-Klasse:**
   - Kapseln Sie den PID-Regler in einer sauberen Klasse `PidController`:
     - Parameter: $K_{\text{p}} = 15{,}0$, $K_{\text{i}} = 25{,}0$, $K_{\text{d}} = 1{,}2$.
     - Ausgangsbegrenzung: $u_{\min} = -24{,}0\,\text{V}$, $u_{\max} = +24{,}0\,\text{V}$.
     - Clamping: Schalten Sie `d(xi)/dt = 0`, sobald $u_{\text{raw}}$ saturiert ist und $e \cdot u_{\text{raw}} > 0$.
3. **Störfall-Experiment (Werkzeugeintauch-Stoß):**
   - Bei $t = 1{,}5\,\text{s}$ (nach Erreichen der Sollposition) wirkt schlagartig ein Störlastmoment $M_{\text{Last}} = 2{,}5\,\text{N}\cdot\text{m}$ (Überlast) für eine Dauer von $0{,}8\,\text{s}$ ($t \in [1{,}5\,\text{s}, 2{,}3\,\text{s}]$).
   - Bei $t = 2{,}3\,\text{s}$ fällt das Lastmoment wieder auf $0$ ab.
4. **Vergleichende Simulationsanalyse:**
   - Führen Sie zwei Simulationsläufe durch ($h = 0{,}5\,\text{ms}$, Gesamtdauer $4{,}0\,\text{s}$):
     - **Lauf 1:** Mit Anti-Windup Clamping aktiviert.
     - **Lauf 2:** Ohne Anti-Windup (Standard-Integration trotz Sättigung).
   - Stellen Sie folgende Signale in synchronisierten ScottPlot-Panels dar:
     - Drehwinkel $\theta(t)$ vs. Sollwert $w(t)$
     - Motorspannung $u_{\text{A}}(t)$ und Rohsignal $u_{\text{raw}}(t)$
     - Integrator-Zustand $x_{\text{i}}(t)$ über der Zeit
   - Quantifizieren Sie das Überschwingen nach Wegfall der Last in Prozent und die Ausregelzeit.

---

### Track B (Simulation Game): SpaceX Falcon Hop & Booster Landing

#### Game-Kontext:
Die spektakulären Landungen der SpaceX Falcon 9 Erststufen erfordern eine hochpräzise Schubvektorsteuerung (Gimbal). Das Triebwerk kann jedoch weder unendlich schnell schwenken noch unter $40\,\%$ gedrosselt werden. Tritt in Bodennähe eine Windböe auf, führt ein Windup des Lagereglers zum unweigerlichen Überschlagen und Zerschellen auf dem Landepad.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK B: FALCON BOOSTER DYNAMIK & GIMBAL                               │
│                                                                        │
│                      ( Raketenspitze )                                 │
│                             │                                          │
│                             │ \theta (Neigungswinkel)                  │
│                             │                                          │
│                           [CoM] (Masse m(t) nimmt ab!)                 │
│                             │                                          │
│                             ▼                                          │
│                           \ | /                                        │
│                            \|/ Gimbal-Winkel delta [-15°, +15°]        │
│                             F_Thrust [F_min, F_max]                    │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track B:

1. **Nichtlineare Flugdynamik (DGL 6. Ordnung):**
   - Zustandsvektor $\mathbf{x} = \begin{bmatrix} x & y & \theta & v_x & v_y & \omega \end{bmatrix}^\top$.
   - Bewegungsgleichungen unter Gravitation, Schubkraft $F$ und Gimbal-Winkel $\delta$:
     $$\dot{x} = v_x, \quad \dot{y} = v_y, \quad \dot{\theta} = \omega$$
     $$\dot{v}_x = \frac{F}{m(t)} \sin(\theta + \delta), \quad \dot{v}_y = \frac{F}{m(t)} \cos(\theta + \delta) - g$$
     $$\dot{\omega} = \frac{F \cdot L_{\text{cg}} \cdot \sin(\delta)}{J}$$
   - Treibstoffverbrauch: $\dot{m} = -\frac{F}{I_{\text{sp}} g_0}$ mit $I_{\text{sp}} = 300\,\text{s}$, $g_0 = 9{,}81\,\text{m/s}^2$.
   - Geometrie: Raketenhöhe $L = 20\,\text{m}$, Masse leer $m_{\text{dry}} = 5000\,\text{kg}$, Treibstoff $m_{\text{fuel}} = 2000\,\text{kg}$, $L_{\text{cg}} = 8{,}0\,\text{m}$, Trägheitsmoment $J = \frac{1}{12} m(t) L^2$.
2. **Triebwerksgrenzen & Aktorsättigung:**
   - Schubkraft-Modulation: $F \in [30\,\text{kN}, 80\,\text{kN}]$ (kann nicht komplett auf 0 gedrosselt werden!).
   - Gimbal-Sättigung: $\delta \in [-15^\circ, +15^\circ]$.
3. **Kaskadierte PID-Lageregelung mit Anti-Windup:**
   - Äußerer Regler: Vertikalgeschwindigkeit $v_{y,\text{soll}}$ für sanftes Touchdown ($v_y \approx -0{,}5\,\text{m/s}$ bei $y=0$).
   - Innerer Regler: Aufrichtungswinkel $\theta_{\text{soll}} = 0^\circ$ über Gimbal $\delta$.
   - Anti-Windup Clamping auf beide Stellgrößen ($F$ und $\delta$).
4. **Störungs-Challenge (Windböe vor dem Aufsetzen):**
   - Anfangsbedingungen bei $t = 0$: Höhe $y_0 = 100\,\text{m}$, $v_{y0} = -15\,\text{m/s}$, $\theta_0 = +5^\circ$.
   - Bei $t = 3{,}0\,\text{s}$ trifft eine seitliche Windböe ($F_{\text{wind}} = 12\,\text{kN}$) für $0{,}5\,\text{s}$ auf den Booster.
   - Simulieren Sie MIT vs. OHNE Anti-Windup:
     - Zeigen Sie im ScottPlot-Diagramm, dass der Booster mit Anti-Windup stabil aufsetzt ($|v_y| \le 1\,\text{m/s}, |\theta| \le 2^\circ$), während er ohne Anti-Windup durch übersteuernden Gimbal umkippt und abstürzt.

---

## 5. Akzeptanzkriterien & Definition of Done

Für die volle Punktzahl (10 Punkte) müssen folgende Kriterien erfüllt sein:

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **S-Function & RK4-Solver** | **3 P.** | Mathematisch korrekte Kapselung der DGLn; saubere 4-Stufen-RK4-Implementierung ohne Seiteneffekte oder globale State-Modifikationen im Integrator. |
| **PID & Anti-Windup Clamping** | **3 P.** | Vollständige Implementierung von Conditional Integration ($e \cdot u_{\text{raw}} > 0$); einwandfreie Kapselung in der `PidController`-Klasse. |
| **Störgrößen-Vergleichsstudie** | **2 P.** | Reproduzierbarer Nachweis des Verhaltens MIT vs. OHNE Anti-Windup bei Lastsprung/Windböe; aussagekräftige Diagramme (ScottPlot 5). |
| **Numerische Validierung & Bericht** | **2 P.** | Abgleich gegen den analytischen Grenzfall im ungestörten Zustand; sauberer Markdown-Bericht mit Diagrammen und ingenieurmäßiger Diskussion. |

---

## 6. Online-Recherche-Box

Nutzen Sie zur Vorbereitung und Vertiefung folgende Quellen:

- **Offizielle Dokumentation:**
  - [Wikipedia: Runge–Kutta methods (RK4)](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods)
  - [Wikipedia: Integral windup & Anti-Windup Strategies](https://en.wikipedia.org/wiki/Integral_windup)
  - [MathWorks: Anti-Windup Control in PID Controllers](https://de.mathworks.com/help/simulink/slref/pidcontroller.html)
- **Gezielte englische Suchbegriffe:**
  - `Runge Kutta 4 implementation C# state vector ODE`
  - `PID conditional integration clamping anti-windup algorithm`
  - `DC servo motor transfer function state space differential equations`
  - `thrust vector control booster rocket dynamics simulation`

---

## 7. Vibe-Coding Prompting-Tipps

Falls Sie KI-Assistenten verwenden, beachten Sie folgende Vorgaben zur Vermeidung typischer KI-Fehler:

> [!TIP]
> **Prompt-Vorlage 1: Thread-sicherer und seiteneffektfreier RK4-Integrator**  
> *„Schreibe mir eine generische RK4-Solver-Methode in C#: `double[] StepRK4(Func<double, double[], double[]> derivatives, double t, double[] x, double h)`. Die Methode darf das übergebene Array `x` NICHT direkt mutieren, sondern muss ein neues Array zurückgeben oder in einen vorallokierten Zielpuffer schreiben, um Seiteneffekte zwischen den Teilstufen $k_1, k_2, k_3, k_4$ zu verhindern.“*

> [!WARNING]
> **Prompt-Vorlage 2: Exakte Anti-Windup Clamping-Bedingung**  
> *„Implementiere die Update-Methode eines diskretisierten PID-Reglers mit Clamping in C#. Achtung: Der I-Zustand darf NUR DANN eingefroren werden, wenn die Stellgröße saturiert ist UND der Regelfehler $e$ das gleiche Vorzeichen wie die Rohstellgröße $u_{\text{raw}}$ hat ($e \cdot u_{\text{raw}} > 0$). Wenn der Fehler das System aus der Sättigung herausführen möchte, MUSS der I-Anteil normal integriert werden!“*

---

## 8. 🔍 Peer-Review-Leitfragen für das Auditorium

Beim wöchentlichen „Showcase & Peer-Challenge“ prüft das Auditorium die vorgeführten Lösungen anhand folgender Fragen:

1. **Windup-Verhalten im Diagramm:** Schießt der I-Anteil während der Störung (Werkzeugeintritt oder Windböe) in astronomische Höhen, oder friert der Wert bei Sättigung sofort auf einer horizontalen Linie ein?
2. **Reversibilität des Clamping:** Reagiert der Regler sofort ohne Verzögerung, sobald die Störung wegfällt und der Fehler das Vorzeichen wechselt, oder bleibt der Integrator blockiert?
3. **Echtes RK4 vs. verstecktes Euler-Verfahren:** Werden im Solver wirklich 4 Zwischenstufen berechnet? *(Auditorium-Test: Schrittweite von $h = 0{,}5\,\text{ms}$ auf $h = 10\,\text{ms}$ vergrößern – bleibt das System mit RK4 stabil, während Euler längst explodiert?)*
4. **Physikalische Konsistenz des Modells:** Werden Momenten- und Spannungsgleichungen konsistent aufgelöst? Stimmen die Einheiten von $k_{\text{m}}$ und $k_{\text{e}}$ überein?
