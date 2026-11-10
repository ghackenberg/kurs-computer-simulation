# Termin-Steckbrief T10: Hybride Dynamische Systeme, Virtuelle Inbetriebnahme (VIBN) & Synthese

**Dokument-ID:** `Konzept/13_Termin_10_Hybride_Dynamik_Synthese.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](./01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](./02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](./03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte, Technologie-Status & Kapitel-Schnittstellen
- **Foliensätze:** [`10_Dynamische_Modelle_Hybrid/Folien.md`](../Folien/10_Dynamische_Modelle_Hybrid/Folien.md) & [`11_Epilog/Folien.md`](../Folien/11_Epilog/Folien.md)
- **Übungsblatt & Vorlage:** [`Aufgabenblatt.md`](../Uebungen/Termin_10_Hybride_Dynamik_Synthese/Aufgabenblatt.md) | **Moodle-Text:** [`Text.md`](../Moodle/10_Termin_10_Hybride_Dynamik_Synthese/Text.md) | [`HybridZeroCrossing.sln`](../Uebungen/Termin_10_Hybride_Dynamik_Synthese/Vorlage/HybridZeroCrossing.sln)
- **Assessment zu Terminbeginn:** **Moodle-Test 4** ([`Quiz/Quiz_04.md`](../Moodle/10_Termin_10_Hybride_Dynamik_Synthese/Quiz/Quiz_04.md), 15 Min., prüft ausschließlich Kap. 08–09).
- **Technologie-Status T10:** Vollständiger Kurs-Stack (Kap. 01–11).
- **Kapitel-Brücken (Synthese des Gesamtkurses):**
  - **Rückwärts ($\leftarrow$):** [`T01`](./04_Termin_01_Kinematik_und_Euler.md) & [`T08`](./11_Termin_08_DGL_und_SFunctions.md) (Kontinuierliche ODE-Solver), [`T09`](./12_Termin_09_Diskrete_Systeme_DES.md) (Diskrete Events), [`T04`](./07_Termin_04_Telemetrie_und_ScottPlot.md) (`MSAGL`-Statecharts & `ScottPlot`) und [`T05`](./08_Termin_05_3D_OpenGL_Szenengraph.md) (3D-Anlagenvisualisierung).

## 2. Lernziele der Vorlesung (Bloom-Kaskade)
1. **Verstehen:** Warum feste Zeitschritte bei Stößen/Schwellen zu Eindringfehlern (*Tunneling*) und künstlichem Energieverlust führen, wie die Vorzeichenwechsel-Bisektion auf $g(\mathbf{x}) = 0$ den exakten Schaltzeitpunkt $t^* = t_k + \alpha^*\Delta t$ lokalisiert und wie der *Sticking-Threshold* ($|v^+| < v_{\text{stick}}$) den Zeno-Kollaps verhindert.
2. **Anwenden:** Hybride Zeitschritt-Teilung ($\Delta t_1 = \alpha^*\Delta t \to \text{Event} \to \Delta t_2 = (1-\alpha^*)\Delta t$) und Ruhe-Aufwecklogik (`IsSticking`) implementieren.
3. **Synthetisieren:** Co-Simulation nach dem FMI/FMU-Standard, SPS-Kopplung für die Virtuelle Inbetriebnahme (VIBN) und die Goldene Architektur-Regel in der 10. und finalen Hausübung zusammenführen.

## 3. Zweistufige Hausübung (`Einheit 10` – Finale Hausübung) & Showcase-Fokus
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Intervallhalbierung (`BisectionRootFinder.FindRoot`) bei Vorzeichenwechsel $g(\mathbf{x}_k)\cdot g(\mathbf{x}_{k+1}) \le 0$ zur Bestimmung von $\alpha^* \in [0, 1]$ implementieren.
  - `1.2`: Hybride Zeitschritt-Teilung ($\Delta t_1 = \alpha^*\Delta t \to \text{HandleZeroCrossing} \to \Delta t_2 = (1-\alpha^*)\Delta t$) und Sticking-Ruhemodus ($|v^+| < v_{\text{stick}}$) mit Aufweck-Impuls (`ApplyVerticalImpulse`) umsetzen.
  - `1.3`: Maximale Bodenpenetration und Energieverhältnis $E_{\text{tot}}(t)/E_0$ zwischen naivem Festschritt und Bisektion quantitativ vergleichen.
  - `1.4`: Bisektions-Präzision ($< 10^{-10}$), exakte Energieerhaltung bei $e = 1{,}0$ und Zeno-Schutz via `dotnet test` bestätigen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – VIBN Pneumatikzylinder mit SPS-Kopplung):** Doppeltwirkender Zylinder mit 2 Anschlag-Indikatorfunktionen ($g_{\text{back}} = x$, $g_{\text{front}} = L_{\text{stroke}} - x$), Endlagensensoren (`BG_Back`, `BG_Front`) und gekoppeltem SPS-Schrittketten-Automaten (`IDLE` $\to$ `EXTENDING` $\to$ `HOLD_FRONT` $\to$ `RETRACTING`).
  - **Track B (`B.1`–`B.4` – Arcade Pinball Wizard):** 2D-Kugeldynamik auf geneigtem Flippertisch ($\alpha_{\text{tilt}} = 6{,}5^\circ$) mit Wänden und mindestens 3 kreisförmigen aktiven Bumpern ($e_{\text{Bumper}} = 1{,}15$), vektorieller Normalenreflexion nach Bisektions-Trefferortung ohne Tunneling.
- **Showcase- & Code-Defense-Fokus:** Warum vernichtet das naive Hochsetzen `if (y < 0) y = 0` beim Festschritt potenzielle Energie $mg|y_{k+1}|$? Warum ist die Rest-Integration $\Delta t_2 = (1-\alpha^*)\Delta t$ nach dem Stoß unverzichtbar?
