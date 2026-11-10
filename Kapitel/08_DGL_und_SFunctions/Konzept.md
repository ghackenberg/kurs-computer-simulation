# Termin-Steckbrief T08: Kontinuierliche Dynamische Systeme: ODE-Solver, S-Functions & Anti-Windup

**Dokument-ID:** `Kapitel/08_DGL_und_SFunctions/Konzept.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](../../Konzept/01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](../../Konzept/02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](../../Konzept/03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte, Vorgreif-Sperre & Kapitel-Schnittstellen
- **Foliensatz:** [`Folien/Folien.md`](./Folien/Folien.md)
- **Übungsblatt & Vorlage:** [`Aufgabenblatt.md`](./Uebung/Aufgabenblatt.md) | **Moodle-Text:** [`Text.md`](./Moodle/Text.md) | [`SFunctionSimulation.sln`](./Uebung/Vorlage/SFunctionSimulation.sln)
- **Assessment zu Terminbeginn:** **Moodle-Test 3** ([`Quiz/Quiz_03.md`](./Quiz/Quiz_03.md), 15 Min., prüft ausschließlich Kap. 05–07).
- **Vorgreif-Sperre (Technologie-Stand T08):** `ISFunction`, Butcher-Tableaus (Euler, Heun, RK4), Steifigkeit, algebraische Schleifen, PID mit Anti-Windup. *Strikte Tabus:* Noch keine DES-Warteschlangen (T09) oder Zero-Crossing-Bisektion (T10).
- **Kapitel-Brücken & Quiz-Zuordnung:**
  - **Rückwärts ($\leftarrow$):** [`T01`](../01_Kinematik_und_Euler/Konzept.md) (Expliziter Euler & Heun), [`T02`](../02_Pixelgrafik_und_FDM/Konzept.md) (Stabilitätsgrenze expliziter Zeitintegration) und [`T04`](../04_Telemetrie_und_ScottPlot/Konzept.md) (`ScottPlot 5` für Zeit- und Phasenplots).
  - **Vorwärts ($\to$):** [`T10`](../10_Hybride_Dynamik_Synthese/Konzept.md) (Kontinuierliche ODE-Integration $\dot{\mathbf{x}} = \mathbf{f}$ bildet die stetige Bewegungsphase zwischen diskreten Zero-Crossing-Ereignissen).
  - **Geprüft in:** **Quiz 04** (zu Beginn von [`T10`](../10_Hybride_Dynamik_Synthese/Konzept.md), prüft Kap. 08–09).

## 2. Lernziele der Vorlesung (Bloom-Kaskade)
1. **Verstehen:** Zustandsraumdarstellung $\dot{\mathbf{x}} = \mathbf{f}(t, \mathbf{x}, \mathbf{u})$, Konsistenz-/Konvergenzordnung $\mathcal{O}(\Delta t^4)$ von RK4, Stabilitätsgebiete bei steifen Systemen und Ursache von Integrator-Windup bei Aktor-Sättigung.
2. **Anwenden:** Allokationsfreien `Rk4Solver`, modulare S-Function-Blöcke und bedingte Integration (*Anti-Windup Clamping*) implementieren.
3. **Erschaffen & Evaluieren:** Einen geregelten DC-Servomotor unter Lastsprung bzw. eine landende Raketenstufe (Falcon Hop) simulieren und RK4 vs. Euler sowie Mit vs. Ohne Anti-Windup quantitativ vergleichen.

## 3. Zweistufige Hausübung (`Einheit 08`) & Showcase-Fokus
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Expliziten Euler-Solver (`EulerExplicitSolver.Step`) implementieren und mit dem vorallokierten 4-stufigen `Rk4Solver` vergleichen.
  - `1.2`: Klasse `PidController` mit Stellgrößenbegrenzung $\operatorname{clamp}(u, u_{\min}, u_{\max})$ extrahieren.
  - `1.3`: Bedingte Integration (*Anti-Windup Clamping*: $\dot{x}_I = 0$ bei Sättigung in Fehlerrichtung) in `DcServoControlBlock` umsetzen.
  - `1.4`: Energieerhaltung am ungedämpften Oszillator (RK4 $< 0{,}01\,\%$ Fehler über 100 Perioden vs. Euler-Aufschaukeln) und Überschwingreduktion via `dotnet test` prüfen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – DC-Servomotor-Regelung mit Thermomodell):** Elektro-mechanisch-thermisches 5-Zustands-Modell ($i_A, \omega, \theta, x_I, T_{\text{Wicklung}}$) unter $\pm 24\,\text{V}$-Sättigung, Lastmomentsprung und thermischem Derating; Vergleich Mit vs. Ohne Anti-Windup.
  - **Track B (`B.1`–`B.4` – SpaceX Falcon Hop / Booster Landing):** Vertikallandung einer Raketenstufe mit variabler Treibstoffmasse $\dot{m} = -\alpha_{\text{fuel}}F_{\text{thrust}}$, Schubbegrenzung $[0, F_{\max}]$ und Anti-Windup Clamping für sanften Touchdown ($|v_{\text{touchdown}}| < 1{,}0\,\text{m/s}$).
- **Showcase- & Code-Defense-Fokus (zu Beginn von T09):** Live-Deaktivierung von Anti-Windup unter Lastsprung; warum muss der Integrator sofort wieder freigegeben werden, sobald der Fehler $e$ sein Vorzeichen wechselt?
