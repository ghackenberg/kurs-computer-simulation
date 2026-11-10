# Termin-Steckbrief T07: Statische Systeme: FEM-Fachwerke, Cholesky & Newton-Raphson

**Dokument-ID:** `Konzept/10_Termin_07_Statik_FEM_Cholesky.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](./01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](./02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](./03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte, Vorgreif-Sperre & Kapitel-Schnittstellen
- **Foliensatz:** [`07_Statische_Modelle/Folien.md`](../Folien/07_Statische_Modelle/Folien.md)
- **Übungsblatt & Vorlage:** [`Aufgabenblatt.md`](../Uebungen/Termin_07_Statik_FEM_Cholesky/Aufgabenblatt.md) | [`TrussFemSolver.sln`](../Uebungen/Termin_07_Statik_FEM_Cholesky/Vorlage/TrussFemSolver.sln)
- **Vorgreif-Sperre (Technologie-Stand T07):** `MathNet.Numerics`, Steifigkeitsmatrix $\mathbf{K}$, Cholesky ($\mathbf{L}\mathbf{L}^\top$), Newton-Raphson ($\mathbf{J}$). *Strikte Tabus:* Noch keine dynamischen ODE-Solver höherer Ordnung (RK4 erst T08).
- **Kapitel-Brücken & Quiz-Zuordnung:**
  - **Rückwärts ($\leftarrow$):** [`T03`](./06_Termin_03_Vektorgrafik_und_Canvas.md) (Das in T03 rein geometrisch gezeichnete 2D-Fachwerk samt JSON-Format erhält nun seine FEM-Physik $\mathbf{K}\mathbf{u}=\mathbf{f}$); [`T05`](./08_Termin_05_3D_OpenGL_Szenengraph.md) (Die SCARA-Vorwärtskinematik $L_1, L_2, \theta_1, \theta_2$ wird via Jacobi-Matrix $\mathbf{J}$ und Newton-Raphson invertiert).
  - **Vorwärts ($\to$):** [`T08`](./11_Termin_08_DGL_und_SFunctions.md) (Übergang vom statischen Kräftegleichgewicht $\sum \vec{F} = \mathbf{0}$ zur dynamischen Bewegungsgleichung $m\ddot{\mathbf{x}} + d\dot{\mathbf{x}} + k\mathbf{x} = \mathbf{f}(t)$).
  - **Geprüft in:** **Quiz 03** (zu Beginn von [`T08`](./11_Termin_08_DGL_und_SFunctions.md), prüft Kap. 05–07).

## 2. Lernziele der Vorlesung (Bloom-Kaskade)
1. **Verstehen:** Herleitung der $4\times 4$-Elementsteifigkeitsmatrix $\mathbf{K}_e = \frac{EA}{L}[\dots]$, Assemblierung im globalen System, Blockpartitionierung ($\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$) und Bedingung für Symmetrie/positive Definitheit (statische Bestimmtheit vs. kinematischer Mechanismus).
2. **Anwenden:** Lösung des reduzierten LGS via Cholesky-Zerlegung, Berechnung von Auflagerreaktionen $\mathbf{f}_p = \mathbf{K}_{pf}\mathbf{u}_f - \mathbf{f}_{p,\text{ext}}$, Stab-Normalkräften $N_e$ und Euler-Knicklasten implementieren.
3. **Erschaffen:** Das geometrische Tragwerk aus T03 unter Wanderlast mit überhöhter elastischer Verformung bzw. Stabbruch-Kaskade zum Leben erwecken.

## 3. Zweistufige Hausübung (`Einheit 07`) & Showcase-Fokus
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: $4\times 4$-Elementsteifigkeitsmatrix $\mathbf{K}_e$ in die globale Matrix $\mathbf{K}$ assemblieren.
  - `1.2`: Blockpartitionierung nach freien ($f$) und gesperrten ($p$) Freiheitsgraden ($\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$) via `kff.Cholesky().Solve(ff)` sowie Auflagerreaktionen $\mathbf{f}_p$ und Stabkräfte $N_e$ berechnen.
  - `1.3`: Auflager-Symbole, Reaktionspfeile und 5-Knoten-Auslegerkran im Canvas-Frontend ergänzen.
  - `1.4`: Analytische Kragträger-Referenz ($N_0 = +20\,\text{kN}, N_1 = -20\sqrt{2}\,\text{kN}$), globales Gleichgewicht ($\|\sum \vec{F}\| < 10^{-9}\,\text{N}$) und Singularitäts-Erkennung via `dotnet test` verifizieren.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – Portalkran-Verformung unter Wanderlast):** Verfahrbare Laufkatzen-Last über das Tragwerk aus T03, überhöhte elastische Verformungsdarstellung ($\mathbf{p}_i + \alpha_{\text{scale}}\mathbf{u}_i$), Zug-/Druck-Farbcodierung und Euler-Knicknachweis ($N_{\text{knick}} = \frac{\pi^2 E I}{L^2}$).
  - **Track B (`B.1`–`B.4` – Bridge Constructor Physics Engine):** Kontinuierliche Cholesky-Lösung bei LKW-Überfahrt, Stabbruch bei $|N_e| > N_{\max}$ (`IsBroken = true`), Re-Assemblierung und Einsturz-Detektion bei singulärer Matrix $\mathbf{K}_{ff}$.
- **Showcase- & Code-Defense-Fokus (zu Beginn von T08):** Live-Entfernen eines Stabs $\implies$ entsteht ein kinematischer Mechanismus ($\det \mathbf{K}_{ff} = 0$) und wird die Cholesky-Exception sauber abgefangen? Stimmt $\sum \vec{F}_{\text{ext}} + \sum \vec{F}_{\text{Lager}} = \mathbf{0}$?
