# Termin-Steckbrief T01: Einführung, Modellbegriff & Digitaler Zwilling

**Dokument-ID:** `Kapitel/01_Kinematik_und_Euler/Konzept.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](../../Konzept/01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](../../Konzept/02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](../../Konzept/03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte, Vorgreif-Sperre & Kapitel-Schnittstellen
- **Foliensätze:** [`00_Prolog/Folien/Folien.md`](../00_Prolog/Folien/Folien.md) & [`Folien/Folien.md`](./Folien/Folien.md)
- **Übungsblatt & Vorlage:** [`Aufgabenblatt.md`](./Uebung/Aufgabenblatt.md) | **Moodle-Text:** [`Text.md`](./Moodle/Text.md) | [`KinematikEuler.sln`](./Uebung/Vorlage/KinematikEuler.sln)
- **Vorgreif-Sperre (Technologie-Stand T01):** Reine C#-Konsolenapplikation + MSTest. *Strikte Tabus:* Kein WPF, kein `ScottPlot`, kein Multithreading, kein RK4.
- **Kapitel-Brücken & Quiz-Zuordnung:**
  - **Vorwärts ($\to$):** [`T08`](../08_DGL_und_SFunctions/Konzept.md) (Expliziter Euler und sein Energiedrift motivieren Heun/RK2 & RK4); [`T10`](../10_Hybride_Dynamik_Synthese/Konzept.md) (Wurfparabel kehrt als *Bouncing Ball* mit Bodenkontakt-Bisektion zurück).
  - **Geprüft in:** **Quiz 01** (zu Beginn von [`T03`](../03_Vektorgrafik_und_Canvas/Konzept.md), prüft Kap. 00–02).

## 2. Lernziele der Vorlesung (Bloom-Kaskade)
1. **Verstehen:** Modell-Taxonomie (statisch/dynamisch, kontinuierlich/diskret, deterministisch/stochastisch) und Grieves-Zwillingskonzept (*Digital Model / Shadow / Twin*) einordnen.
2. **Anwenden:** Explizites Euler-Verfahren ($x_{k+1} = x_k + \Delta t \cdot v_k$) und Prädiktor-Korrektor nach Heun (RK2) mit linearer Auftreff-Interpolation in C# implementieren.
3. **Evaluieren:** Numerischen Diskretisierungsfehler und künstlichen Energiedrift gegenüber der geschlossenen analytischen Lösung im Unit-Test quantifizieren.

## 3. Zweistufige Hausübung (`Einheit 01`) & Showcase-Fokus
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Expliziten Euler-Schritt (`EulerIntegrator.StepEuler`) für `KinematicState` prüfen und vervollständigen.
  - `1.2`: Lineare Bodenkontakt-Interpolation $\tau = \frac{0 - y_k}{y_{k+1} - y_k}$ (`EulerIntegrator.InterpolateGroundImpact`) am Nulldurchgang $y = 0$ umsetzen.
  - `1.3`: Zweistufiges Prädiktor-Korrektor-Verfahren nach Heun (`EulerIntegrator.StepHeun`, RK2) und Konvergenzvergleich im Vakuum ($v_0 = 150\,\text{m/s}, \alpha = 45^\circ$) durchführen.
  - `1.4`: Konvergenz- und Vakuum-Referenztests (`2293,58 m` analytisch vs. `+10,598 m` Euler-Drift bei $\Delta t = 0{,}10\,\text{s}$ bzw. `+1,061 m` bei $\Delta t = 0{,}01\,\text{s}$) im Testprojekt `KinematikEuler.Tests` via `dotnet test` verifizieren.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – Hydraulikzylinder-Endlagendämpfung):** Hydraulisch angetriebener Kolben ($m = 80\,\text{kg}, F_{\text{vor}} = 60\,\text{kN}$) mit viskosem Schmierfilm, quadratischer Blendenreibung ab $x_{\text{d}} = 0{,}65\,\text{m}$ ($c_{\text{blend}} v|v|$), hartem Kontaktanschlag bei $x_{\text{anschlag}} = 0{,}80\,\text{m}$ und Stabilitätsstudie ($\Delta t \in \{10\,\mu\text{s} \dots 2\,\text{ms}\}$).
  - **Track B (`B.1`–`B.4` – Retro Artillery Duel):** 2D-Ballistik mit quadratischem Newton-Luftwiderstand, Relativwind $\vec{v}_{\text{rel}} = \vec{v} - \vec{w}$, Geländeschnittpunkt-Interpolation an $y_{\text{terrain}}(x)$, automatischem Schusswinkel-Finder ($\pm 1{,}5\,\text{m}$) und ASCII-Plot ($80 \times 25$).
- **Showcase- & Code-Defense-Fokus (zu Beginn von T02):** Warum überschätzt der explizite Euler die Scheitelhöhe um $\frac{1}{2}v_{y0}\Delta t$ und landet um $\Delta t$ zu spät? Wirkt $c_{\text{blend}} v|v|$ in beide Richtungen bremsend?
