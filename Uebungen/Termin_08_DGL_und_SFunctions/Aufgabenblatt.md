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

## 3. Stufe A: In-Class Sprint (ca. 30–40 min)

### Thema: „Expliziter Euler vs. RK4 Stabilitätsgrenze, `PidController`-Kapselung & Anti-Windup-Overlay“

Öffnen Sie das vorbereitete WPF-Starter-Projekt `Vorlage/SFunctionSimulation.sln`. Es enthält bereits das S-Function-Interface (`Core/ISFunction.cs`), den klassischen RK4-Integrator (`Solvers/RungeKutta4Solver.cs`), das 4-Zustands-Servomotormodell (`Models/DCMotorWithAntiWindup.cs`) sowie die `ScottPlot`-Visualisierung in `MainWindow.xaml.cs`.

```
┌────────────────────────────────────────────────────────────────────────┐
│ STUFE A: GLEICHSTROM-SERVOMOTOR & ELEKTROMECHANISCHE ZEITKONSTANTEN    │
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

#### Motorparameter & analytische Referenzwerte:
- Ankerwiderstand $R_{\text{A}} = 2{,}0\,\Omega$, Ankerinduktivität $L_{\text{A}} = 0{,}05\,\text{H}$ $\implies$ elektrische Zeitkonstante **$T_{\text{el}} = \frac{L_{\text{A}}}{R_{\text{A}}} = 25\,\text{ms}$** ($\lambda_{\text{el}} \approx -40\,\text{s}^{-1}$).
- Drehmoment-/Induktionskonstante $k_{\text{m}} = k_{\text{e}} = 0{,}1\,\text{N}\cdot\text{m/A}$, Trägheitsmoment $J = 0{,}005\,\text{kg}\cdot\text{m}^2$, Dämpfung $d = 0{,}001\,\text{N}\cdot\text{m}\cdot\text{s/rad}$ $\implies$ elektromechanische Zeitkonstante **$T_{\text{m}} = \frac{R_{\text{A}} J}{R_{\text{A}} d + k_{\text{m}} k_{\text{e}}} \approx 0{,}833\,\text{s}$**.
- **Stationäre Leerlaufdrehzahl** bei konstantem Spannungssprung $u_{\text{A}} = 24{,}0\,\text{V}$ ($M_{\text{Last}} = 0$):
  $$\omega_{\infty} = \frac{k_{\text{m}} \cdot u_{\text{A}}}{R_{\text{A}} \cdot d + k_{\text{m}} \cdot k_{\text{e}}} = \frac{2{,}4}{0{,}012} = 200{,}0\,\text{rad/s}$$
  *(Hinweis: Aufgrund von $T_{\text{m}} \approx 0{,}833\,\text{s}$ beträgt die Drehzahl bei $t = 0{,}5\,\text{s}$ erst $\approx 88{,}3\,\text{rad/s}$; der stationäre Endwert $\omega \approx 199{,}99\,\text{rad/s}$ wird nach ca. $10\,T_{\text{m}}$, also bei **$t = 8{,}0\,\text{s}$**, erreicht – siehe Unit-Test `TestIdleSpeedSteadyStateConvergence` in `SFunctionTests.cs`!)*

#### Aufgabenstellung (Schritt für Schritt auf Basis von `Vorlage/SFunctionSimulation.sln`):

1. **Aufgabe A1 – Expliziter Euler (`EulerExplicitSolver.Step`) & Stabilitätsgrenze testen:**
   - Erstellen Sie im Ordner `Solvers/` (oder in `RungeKutta4Solver.cs`) eine statische Methode `EulerExplicitSolver.Step(ISFunction system, double t, double[] x, double[] u, double h)`:
     $$\mathbf{x}_{k+1} = \mathbf{x}_k + h \cdot \mathbf{f}(t_k, \mathbf{x}_k, \mathbf{u}_k)$$
   - Testen Sie in `MainWindow.xaml.cs` (`RunSimulation`) für größere Schrittweiten (z. B. $h = 0{,}025\,\text{s}$ bzw. $h = 0{,}055\,\text{s}$), ab welcher Schrittweite der explizite Euler wegen des schnellen elektrischen Eigenwerts ($\lambda_{\text{el}} \approx -40\,\text{s}^{-1}$, Dahlquist-Grenze $|1 + h\lambda| \le 1 \implies h_{\max,\text{Euler}} \approx 50\,\text{ms}$) numerisch oszilliert/explodiert, während `RungeKutta4Solver` ($|R(h\lambda)| \le 1$ bis $|h\lambda| \approx 2{,}785$) stabil bleibt!
2. **Aufgabe A2 – Eigenständige Klasse `PidController` extrahieren:**
   - Aktuell ist das PID-Regelgesetz und die Clamping-Bedingung direkt in `DCMotorWithAntiWindup.ComputeDerivatives` einkodiert.
   - Erstellen Sie im Ordner `Models/` eine sauber gekapselte Klasse `PidController` (`Kp, Ki, Kd, UMin, UMax, AntiWindupEnabled`) mit den Methoden `ComputeControl(double e, double eDot, double xi, out double uSat, out double uRaw)` und `ComputeIntegratorDerivative(double e, double uRaw)`, und rufen Sie diese in `DCMotorWithAntiWindup` auf.
3. **Aufgabe A3 – Direktvergleich MIT vs. OHNE Anti-Windup im selben Diagramm:**
   - Erweitern Sie `RunSimulation()` in `MainWindow.xaml.cs` so, dass bei jedem Klick auf „Simulation starten“ **beide** Konfigurationen (`AntiWindupEnabled = true` und `AntiWindupEnabled = false`) berechnet und im oberen Plot (`PlotPosition`) direkt übereinander gezeichnet werden (Blau durchgezogen = mit Clamping, Rot gestrichelt = ohne Anti-Windup).

---

## 4. Stufe B: Homework Extension (Wahlmodell – GENAU EINE Aufgabe!)

> [!IMPORTANT]
> **Pick your Track (Wahlmodell – KEINE Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **GENAU EINEN** der beiden Tracks:
> - **Track A (Industrie):** Ausbau des DC-Servomotors: Verfahrensvergleich (Euler/Heun/RK4) & Elektro-Thermisches Wicklungsmodell ($T_{\text{Cu}}$) mit Derating
> - **Track B (Simulation Game):** SpaceX Falcon Hop & Booster Landing mit kaskadiertem PID & Schubvektor
> 
> Beide Aufgaben basieren auf der S-Function-Architektur, Mehrstufen-Integratoren und Anti-Windup Clamping. Bearbeiten Sie **NUR EINEN** Track!

---

### Track A (Industrie): Verfahrensvergleich (Euler/Heun/RK4) & Elektro-Thermisches Servomotormodell

#### Industrieller Kontext:
Da der 4-Zustands-Basisregelkreis bereits im Starter-Kit enthalten ist, erweitern Sie den Digitalen Zwilling der CNC-Vorschubachse um zwei entscheidende reale Domänen: (1) den quantitativen **Solver-Vergleich (Euler RK1 vs. Heun RK2 vs. Klassisches RK4)** und (2) die **elektro-thermische Kopplung der Kupferwicklung ($T_{\text{Cu}}(t)$)** inklusive temperaturabhängigem Ankerwiderstand und aktivem Übertemperaturschutz (Derating).

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ TRACK A: ELEKTRO-MECHANISCH-THERMISCHER SERVOMOTOR (5 ZUSTÄNDE)                  │
│                                                                                  │
│   w(t) ─► [PidController + Clamping] ─► u_A ─► [ Elektrisch: i_A ] ─► [ Mechanik ]│
│                                                       │                   │      │
│                     R_A(T_Cu) = R_20*(1 + alpha*dT) ◄─┴─► P_V = R_A*i_A^2 │      │
│                                                                 │         ▼      │
│                                                 [ Thermische DGL: T_Cu ] theta(t)│
└──────────────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track A:

1. **Verfahrensvergleich: Euler (RK1) vs. Heun (RK2) vs. Klassisches RK4 (`HeunSolver.cs`):**
   - Implementieren Sie im Ordner `Solvers/` zusätzlich das 2-stufige **Verfahren von Heun (RK2)** (`HeunSolver.Step`):
     $$\mathbf{k}_1 = \mathbf{f}(t_k, \mathbf{x}_k, \mathbf{u}_k), \quad \mathbf{k}_2 = \mathbf{f}(t_k + h, \mathbf{x}_k + h\mathbf{k}_1, \mathbf{u}_k), \quad \mathbf{x}_{k+1} = \mathbf{x}_k + \frac{h}{2}(\mathbf{k}_1 + \mathbf{k}_2)$$
   - Ergänzen Sie im WPF-UI eine Auswahl für den Integrator (`Euler RK1`, `Heun RK2`, `Runge-Kutta RK4`) sowie die Schrittweite $h$ (z. B. $0{,}5\,\text{ms} \dots 50\,\text{ms}$) und bestimmen Sie den maximalen globalen Winkelfehler $\|\theta_h - \theta_{\text{ref}}\|_{\infty}$ gegenüber einer hochauflösenden RK4-Referenz ($h_{\text{ref}} = 0{,}05\,\text{ms}$).
2. **Elektro-Thermisches Kopplungsmodell (5. Zustand $x[4] = T_{\text{Cu}}$):**
   - Erweitern Sie den Zustandsvektor des Servomotors auf **5 kontinuierliche Zustände**: $\mathbf{x} = \begin{bmatrix} i_{\text{A}} & \omega & \theta & x_{\text{i}} & T_{\text{Cu}} \end{bmatrix}^\top$ mit Anfangstemperatur $T_{\text{Cu}}(0) = T_{\text{Amb}} = 20{,}0\,^\circ\text{C}$.
   - **Temperaturabhängiger Kupferwiderstand:**
     $$R_{\text{A}}(T_{\text{Cu}}) = R_{\text{A},20} \cdot \left(1 + \alpha_{\text{Cu}} \cdot (T_{\text{Cu}} - 20{,}0)\right) \quad \text{mit } R_{\text{A},20} = 2{,}0\,\Omega, \; \alpha_{\text{Cu}} = 0{,}00393\,\text{K}^{-1}$$
   - **Thermische Differentialgleichung der Ankerwicklung:**
     $$\frac{\mathrm{d}T_{\text{Cu}}}{\mathrm{d}t} = \frac{1}{C_{\text{th}}} \left( \underbrace{R_{\text{A}}(T_{\text{Cu}}) \cdot i_{\text{A}}^2}_{\text{Kupferverluste } P_{\text{V}}} - \underbrace{\frac{T_{\text{Cu}} - T_{\text{Amb}}}{R_{\text{th}}}}_{\text{Kühlleistung}} \right)$$
     *(Wählen Sie für eine im $4\,\text{s}$-Fenster gut beobachtbare Erwärmung eine kompakte thermische Kapazität $C_{\text{th}} = 1{,}5\,\text{J/K}$ und $R_{\text{th}} = 2{,}0\,\text{K/W}$.)*
3. **Thermisches Derating & Mehrstufen-Lastprofil:**
   - Überschreitet die Wicklungstemperatur den Schwellenwert $T_{\text{warn}} = 80\,^\circ\text{C}$, reduziert das Steuergerät automatisch die maximal zulässige Stellspannung linear ($u_{\max}(T_{\text{Cu}})$ sinkt von $24\,\text{V}$ auf $12\,\text{V}$ bei $T_{\text{crit}} = 120\,^\circ\text{C}$), wobei das Anti-Windup Clamping sofort auf die reduzierte Sättigungsgrenze reagiert!
   - Visualisieren Sie im ScottPlot-Dashboard Drehwinkel $\theta(t)$, Stellspannung $u_{\text{A}}(t)$, Ankerstrom $i_{\text{A}}(t)$ und Wicklungstemperatur $T_{\text{Cu}}(t)$ und diskutieren Sie die Ergebnisse im `README.md`-Bericht.

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

1. **Nichtlineare Flugdynamik (DGL 6. Ordnung als `ISFunction`):**
   - Zustandsvektor $\mathbf{x} = \begin{bmatrix} x & y & \theta & v_x & v_y & \omega \end{bmatrix}^\top$ (optional 7. Zustand Masse $m(t)$).
   - Bewegungsgleichungen unter Gravitation, Schubkraft $F$ und Gimbal-Winkel $\delta$:
     $$\dot{x} = v_x, \quad \dot{y} = v_y, \quad \dot{\theta} = \omega$$
     $$\dot{v}_x = \frac{F}{m(t)} \sin(\theta + \delta), \quad \dot{v}_y = \frac{F}{m(t)} \cos(\theta + \delta) - g$$
     $$\dot{\omega} = \frac{F \cdot L_{\text{cg}} \cdot \sin(\delta)}{J}$$
   - Treibstoffverbrauch: $\dot{m} = -\frac{F}{I_{\text{sp}} g_0}$ mit $I_{\text{sp}} = 300\,\text{s}$, $g_0 = 9{,}81\,\text{m/s}^2$.
   - Geometrie: Raketenhöhe $L = 20\,\text{m}$, Masse leer $m_{\text{dry}} = 5000\,\text{kg}$, Treibstoff $m_{\text{fuel}} = 2000\,\text{kg}$, $L_{\text{cg}} = 8{,}0\,\text{m}$, Trägheitsmoment $J = \frac{1}{12} m(t) L^2$.
2. **Triebwerksgrenzen & Aktorsättigung:**
   - Schubkraft-Modulation: $F \in [30\,\text{kN}, 80\,\text{kN}]$ (kann nicht komplett auf 0 gedrosselt werden!).
   - Gimbal-Sättigung: $\delta \in [-15^\circ, +15^\circ]$.
3. **Kaskadierte PID-Lageregelung (`PidController`) mit Anti-Windup:**
   - Äußerer Regler: Vertikalgeschwindigkeit $v_{y,\text{soll}}$ für sanftes Touchdown ($v_y \approx -0{,}5\,\text{m/s}$ bei $y=0$).
   - Innerer Regler: Aufrichtungswinkel $\theta_{\text{soll}} = 0^\circ$ über Gimbal $\delta$.
   - Anti-Windup Clamping auf beide Stellgrößen ($F$ und $\delta$).
4. **Störungs-Challenge (Windböe vor dem Aufsetzen):**
   - Anfangsbedingungen bei $t = 0$: Höhe $y_0 = 100\,\text{m}$, $v_{y0} = -15\,\text{m/s}$, $\theta_0 = +5^\circ$.
   - Bei $t = 3{,}0\,\text{s}$ trifft eine seitliche Windböe ($F_{\text{wind}} = 12\,\text{kN}$) für $0{,}5\,\text{s}$ auf den Booster.
   - Simulieren Sie MIT vs. OHNE Anti-Windup und zeigen Sie im ScottPlot-Diagramm, dass der Booster mit Anti-Windup stabil aufsetzt ($|v_y| \le 1\,\text{m/s}, |\theta| \le 2^\circ$), während er ohne Anti-Windup durch übersteuernden Gimbal umkippt.

---

## 5. Akzeptanzkriterien & Definition of Done

Für die volle Punktzahl (10 Punkte) müssen folgende Kriterien erfüllt sein:

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **S-Function & Mehrstufen-Solver** | **3 P.** | Mathematisch korrekte Kapselung der DGLn in `ISFunction`; saubere Implementierung von Euler (RK1), Heun (RK2) und RK4 ohne Seiteneffekte. |
| **PID-Kapselung & Anti-Windup Clamping** | **3 P.** | Vollständige Implementierung von Conditional Integration ($e \cdot u_{\text{raw}} > 0$) in einer eigenständigen `PidController`-Klasse. |
| **Erweiterte Domänenmodellierung & Plots** | **2 P.** | **Track A:** Elektro-thermisches 5-Zustands-Modell ($T_{\text{Cu}}$) mit Derating & Solver-Vergleich.<br>**Track B:** Nichtlineare 6-DOF-Booster-Landung bei Windböe MIT vs. OHNE Anti-Windup in ScottPlot 5. |
| **Numerische Validierung & Bericht** | **2 P.** | Abgleich gegen den analytischen Grenzfall ($\omega_{\infty} = 200\,\text{rad/s}$ für $t \to 8\,\text{s}$) sowie Schrittweiten-/Stabilitätsdiskussion in `README.md`. |

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
