# Termin-Steckbrief T01: Einführung, Modellbegriff & Digitaler Zwilling

**Dokument-ID:** `Konzept/04_Termin_01_Kinematik_und_Euler.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](./01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](./02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](./03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte, Vorgreif-Sperre & Kapitel-Schnittstellen
- **Foliensätze:** [`00_Prolog/Folien.md`](../Folien/00_Prolog/Folien.md) & [`01_Einführung/Folien.md`](../Folien/01_Einführung/Folien.md)
- **Übungsblatt & Vorlage:** [`Aufgabenblatt.md`](../Uebungen/Termin_01_Kinematik_und_Euler/Aufgabenblatt.md) | **Moodle-Text:** [$moodleFile](../Moodle/Termintexte/01_Termin_01_Kinematik_und_Euler.md) | [`KinematikEuler.sln`](../Uebungen/Termin_01_Kinematik_und_Euler/Vorlage/KinematikEuler.sln)
- **Vorgreif-Sperre (Technologie-Stand T01):** Reine C#-Konsolenapplikation + MSTest. *Strikte Tabus:* Kein WPF, kein `ScottPlot`, kein Multithreading, kein RK4.
- **Kapitel-Brücken & Quiz-Zuordnung:**
  - **Vorwärts ($\to$):** [`T08`](./11_Termin_08_DGL_und_SFunctions.md) (Expliziter Euler und sein Energiedrift motivieren Heun/RK2 & RK4); [`T10`](./13_Termin_10_Hybride_Dynamik_Synthese.md) (Wurfparabel kehrt als *Bouncing Ball* mit Bodenkontakt-Bisektion zurück).
  - **Geprüft in:** **Quiz 01** (zu Beginn von [`T03`](./06_Termin_03_Vektorgrafik_und_Canvas.md), prüft Kap. 00–02).

## 2. Lernziele der Vorlesung (Bloom-Kaskade)
1. **Verstehen:** Modell-Taxonomie (statisch/dynamisch, kontinuierlich/diskret, deterministisch/stochastisch) und Grieves-Zwillingskonzept (*Digital Model / Shadow / Twin*) einordnen.
2. **Anwenden:** Explizites Euler-Verfahren ($x_{k+1} = x_k + \Delta t \cdot v_k$) und Prädiktor-Korrektor nach Heun (RK2) mit linearer Auftreff-Interpolation in C# implementieren.
3. **Evaluieren:** Numerischen Diskretisierungsfehler und künstlichen Energiedrift gegenüber der geschlossenen analytischen Lösung im Unit-Test quantifizieren.

## 3. Zweistufige Hausübung (`Einheit 01`) & Showcase-Fokus
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Expliziten Euler-Schritt (`EulerIntegrator.Step`) für `KinematicState` vervollständigen.
  - `1.2`: Zweistufiges Prädiktor-Korrektor-Verfahren nach Heun (`EulerIntegrator.StepHeun`, RK2) implementieren.
  - `1.3`: Lineare Auftreff-Interpolation $\alpha = \frac{y_k}{y_k - y_{k+1}}$ am Nulldurchgang $y = 0$ umsetzen.
  - `1.4`: Konvergenz- und Vakuum-Referenztests (`1019,368 m` analytisch vs. $+5{,}310\,\text{m}$ Euler-Drift bei $\Delta t = 0{,}01\,\text{s}$) via `dotnet test` verifizieren.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – Hydraulikzylinder-Dämpfung):** Not-Stopp einer Schwerlastachse ($m = 250\,\text{kg}, v_0 = 4{,}0\,\text{m/s}$) mit linearer Feder, viskoser Dämpfung und quadratischer Blendenreibung ($-d_{\text{quad}}v|v|$), Umkehrpunkt-Interpolation ($v = 0$) und Auslegung für $x_{\max} \le 0{,}18\,\text{m}$.
  - **Track B (`B.1`–`B.4` – Artillery Strike / Retro Tanks):** 2D-Ballistik mit quadratischem Newton-Luftwiderstand, Relativwind $\mathbf{v}_{\text{rel}} = \mathbf{v} - \mathbf{w}$, Heun-Integration, Bodenkollisions-Interpolation und ASCII-Trajektorienplot ($80 \times 25$).
- **Showcase- & Code-Defense-Fokus (zu Beginn von T02):** Warum überschätzt der explizite Euler die Wurfhöhe und landet um $\Delta t / 2$ zu spät? Wirkt $-d_{\text{quad}}v|v|$ in beide Richtungen bremsend?
