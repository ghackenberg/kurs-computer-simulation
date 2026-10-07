# Post-Audit: Fachdidaktik, Automatisierungstechnik-Praxis & Prüfungsvorbereitung

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (5. / 6. Semester)  
**Institution:** FH Oberösterreich, Campus Wels  
**Dozent:** Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme  
**Prüfgegenstand:** Gesamter Foliensatz (`Folien/00_Prolog` bis `Folien/11_Epilog`, 12 Kapitel, ca. 10.500 Zeilen MARP-Markdown)  
**Datum:** Oktober 2026  
**Status:** Post-Audit nach Abschluss der Phasen 1 bis 4  

---

## Executive Summary

Dieses Gutachten bewertet die 12 Foliensätze des Kurses *Systemsimulation / Digitaler Zwilling* nach dem tiefgreifenden Ausbau (Phasen 1–4) aus der spezifischen Perspektive der **Fachdidaktik**, des **Industrie- und Automatisierungsbezugs (FH OÖ Campus Wels)** sowie der **Prüfungsvorbereitung**.

Die Überarbeitung hat die Qualität der Vorlesungsunterlagen signifikant gesteigert:
- Die mathematische Fundierung (symplektischer Euler, Runge-Kutta 4, Von-Neumann-Kriterium, Welford/Chan-Akkumulator) ist auf Spitzenniveau.
- Die Code-Beispiele sind einheitlich in modernem C# (.NET 8) gehalten und spiegeln saubere Architekturmuster (S-Functions, Zero-Allocation-Solver, TPL) wider.
- Mit der Robotik-Kinematik in Kapitel 5, den nichtlinearen Diode/Fluid-Schleifen in Kapitel 8 und den Sensor-Abtastmodellen in Kapitel 10 wurden wesentliche mechatronische Brücken geschlagen.

Dennoch legt dieser rigorose Post-Audit **strukturelle Brüche**, **didaktische Asymmetrien** und **automatisierungstechnische Lücken** offen, die vor dem regulären Semesterbetrieb adressiert werden sollten:

1. **Roter Faden & Transitionsbrüche:**
   - **Abrupte Enden:** Kapitel 09 (Diskret) und Kapitel 10 (Hybrid) enden ohne `# Zusammenfassung`-Folie unvermittelt nach dem letzten Codebeispiel.
   - **Fehlender Scharnier-Ausblick:** Nach Kapitel 06 (Multithreading) fehlt der didaktische Übergang von den *methodischen Werkzeugen (02–06)* zu den *physikalischen Modellklassen (07–10)*.
   - **Veraltete Querverweise:** In Kapitel 10 (Folie 943) verweist der Text noch auf die „ursprüngliche Solver-Implementierung (siehe Kapitel 4)“ – der kontinuierliche Solver liegt im aktuellen Curriculum jedoch in **Kapitel 8**.
   - **Inkonsistentes Inhaltsverzeichnis:** Im Prolog (`Folien/00_Prolog`) fehlt **Kapitel 11 (Epilog)** vollständig in der Kursübersicht.
2. **Industrie- & Automatisierungsbezug:**
   - **Überwiegend Open-Loop:** In Kapitel 08 werden fast ausschließlich ungesteuerte Systeme (freier Fall, ungedämpftes Federpendel) simuliert. Der Kern des Automatisierungsingenieurs – der **geschlossene Regelkreis (Closed-Loop)** mit PID-Regler, Stellgrößenbegrenzung und Sensorrauschen – fehlt als zusammenhängendes Hauptbeispiel.
   - **Kontextferne Domänenbeispiele:** Das Fachwerk in Kapitel 07 orientiert sich rein am Bauingenieurwesen (Brückenbau, Pioniere wie Cremona/Culmann) statt an mechatronischen Maschinengestellen oder Portalrobotern. Kapitel 09 nutzt primär Bankkunden-/Schalter-Warteschlangen statt Materialfluss, Stau-Rollenbahnen oder SPS-Zyklustaktung.
3. **Didaktische Progression:**
   - Die didaktische Inversion (PDE-Wärmeleitung mit 5-Punkt-Stern und Von-Neumann-Stabilität in Woche 2; ODEs und einfacher Euler erst in Woche 8) wurde zwar mathematisch gehärtet, stellt für Studierende aber nach wie vor eine steile Einstiegshürde dar.
4. **Prüfungsvorbereitung:**
   - Kapitel 11 bietet einen hervorragenden Prüfungsüberblick, doch in den Einzelkapiteln (02 bis 10) fehlen strukturierte **„Prüfungs-Checkpoints“**, Quick-Checks und typische Rechen-/Architekturaufgaben zur Selbstkontrolle vor Klausuren.

---

## 1. Roter Faden & Transitionsanalyse

Die Makrostruktur des Curriculums teilt sich in drei Phasen:
- **Phase I (Kapitel 00–01):** Grundlagen, Modellbegriff, Taxonomie, Digitaler Zwilling.
- **Phase II (Kapitel 02–06):** Technische & methodische Werkzeuge (2D-Pixel, 2D-Vektor, Diagramme/Graphen, 3D-OpenGL, Multithreading).
- **Phase III (Kapitel 07–10):** Die vier Simulationsmodelle (Statisch, Kontinuierlich, Diskret, Hybrid).
- **Phase IV (Kapitel 11):** Synthese, Architekturen, VIBN, Prüfungsleitfaden.

```mermaid
flowchart LR
    subgraph Phase I: Orientierung
        K00[00 Prolog] --> K01[01 Einführung]
    end

    subgraph Phase II: Werkzeuge
        K01 --> K02[02 Pixel & PDE]
        K02 --> K03[03 Vektor & Canvas]
        K03 --> K04[04 ScottPlot & MSAGL]
        K04 --> K05[05 OpenGL & Kinematik]
        K05 --> K06[06 Multithreading TPL]
    end

    subgraph Phase III: Physik & Simulation
        K06 -.->|Fehlende Scharnierfolie!| K07[07 Statik: LGS]
        K07 --> K08[08 Kontinuierlich: ODE]
        K08 --> K09[09 Diskret: DES]
        K09 --> K10[10 Hybrid: Solver]
    end

    subgraph Phase IV: Synthese
        K10 -.->|Fehlende Zusammenfassung!| K11[11 Epilog & VIBN]
    end
```

### 1.1 Detaillierte Übergangsanalyse zwischen den Kapiteln

| Übergang | Didaktische Verbindung | Befund / Bruchstelle | Schweregrad |
| :--- | :--- | :--- | :---: |
| **00 $\to$ 01** | Formalien $\to$ Motivation & Modellbegriff | Nahtlos. Gute Überleitung von den mathematischen Symbolen zu Box' Diktum. **Problem:** Kapitel 11 fehlt in Folie 137 von Kapitel 00. | Mittel |
| **01 $\to$ 02** | Taxonomie $\to$ Rastergrafik | Der Ausblick in 01 kündigt die Werkzeuge an. Der Sprung zu Zeigerarithmetik (`uint*`) und speicherabgebildeten Puffern in 02 ist jedoch didaktisch sehr hart. | Mittel |
| **02 $\to$ 03** | Raster $\to$ Vektor | Sehr gut motiviert: Diskrete Skalarfelder verlangen Pixel, geometrische Tragwerke verlangen Vektoren. | Gering |
| **03 $\to$ 04** | Vektor $\to$ Diagramme / Graphen | Logisch schlüssig: Neben Geometrie braucht die Simulation Zeitreihen und Signalflusstopologien. | Gering |
| **04 $\to$ 05** | 2D-Diagramme $\to$ 3D-OpenGL | Saubere Steigerung der Raumdimensionen ($1D \to 2D \to 3D$). Schnittstelle via `GeometryFactory` und Kinematik-Abschnitt 5.3 gelungen. | Gering |
| **05 $\to$ 06** | 3D-Szenengraph $\to$ Multithreading | Motiviert durch Rechenaufwand. Verbindung zu 02 (Parallel.For beim Rendern) wird im Code aufgegriffen. | Gering |
| **06 $\to$ 07** | **Werkzeuge $\to$ Statische Modelle** | **Kritischer Bruch:** Kapitel 06 schließt mit WPF-`IProgress` und `CancellationToken`. Es gibt **keine Scharnierfolie**, die den Abschluss des Werkzeugblocks markiert und den Einstieg in die physikalischen Modellierungsparadigmen (Kapitel 07–10) ankündigt. | **Kritisch** |
| **07 $\to$ 08** | **Statik $\to$ Dynamik (Kontinuierlich)** | Folie 992/993 in Kap. 07 enthält doppelten Trenner (`--- \n ---`). Es fehlt ein Ausblick: Wie wird aus $\sum \vec{F} = 0$ (Gleichgewicht) die Bewegungsgleichung $\sum \vec{F} = m \cdot \ddot{\mathbf{x}}$ (Newton II)? | Mittel |
| **08 $\to$ 09** | **Kontinuierlich $\to$ Diskret** | Nach RK4 endet Kapitel 08 direkt mit der Zusammenfassung. Es fehlt die Brücke: Warum reichen ODEs für getaktete/ereignisdiskrete Prozesse nicht aus? | Mittel |
| **09 $\to$ 10** | **Diskret $\to$ Hybrid** | **Kritischer Bruch:** Kapitel 09 bricht nach Codezeile 1349 (Konfidenzintervall) unvermittelt ab. Es gibt **keine Zusammenfassung** und **keinen Ausblick** auf hybride Systeme, die kontinuierliche Flugphasen und diskrete Kollisionen vereinen. | **Kritisch** |
| **10 $\to$ 11** | **Hybrid $\to$ Epilog** | **Kritischer Bruch:** Kapitel 10 endet nach dem Screenshot `VariableSampleTime_Explizit.png`. **Keine Zusammenfassung**, kein Epilog-Vorgriff. Zudem enthält Folie 943 eine falsche Referenz auf Kapitel 4 statt Kapitel 8. | **Kritisch** |

---

## 2. Industrie- & Automatisierungsbezug (AT-Praxis Wels)

Studierende der Vertiefungsrichtung Automatisierungstechnik (5./6. Semester) stehen unmittelbar vor der Bachelorarbeit und dem Berufseinstieg. Sie benötigen Systemsimulation vor allem für:
1. **Regelkreisauslegung & -optimierung** (Streckenidentifikation, Störgrößenkompensation).
2. **Virtuelle Inbetriebnahme (VIBN)** von Sondermaschinen und Handhabungssystemen.
3. **Signalverarbeitung & Sensorik** (Quantisierung, Abtastjitter, Filterung).
4. **Maschinendynamik** (Antriebsdimensionierung, Resonanzen, Dämpfung).

### 2.1 Stärken des bestehenden Praxisbezugs

- **Kapitel 04 (ScottPlot & MSAGL):** Der `CircularBuffer<T>` zur Vermeidung von Speicherallokationen bei 1-kHz-Telemetriedaten und die automatische Erkennung algebraischer Schleifen via MSAGL entsprechen exakt den Anforderungen industrieller Condition-Monitoring-Dashboards.
- **Kapitel 05 (Robotik & Kinematik):** Abschnitt 5.3 bildet serielle Kinematiken (Roboterbasis, Achsen 1–3, TCP) über homogene Transformationsmatrizen und den Matrix-Stack ab. Der direkte Verweis auf **Denavit-Hartenberg**, **TwinCAT Kinematics** und **ROS URDF** liefert genau den gesuchten Industriebezug.
- **Kapitel 08 (Kontinuierliche Nichtlinearitäten & Symplektik):**
  - Die Einführung nichtlinearer elektrischer Netzwerke (Diode mit Shockley-Gleichung) und hydrodynamischer Trägheiten (Added Mass) verankert die S-Funktionsarchitektur in realer Physik.
  - Der Nachweis, dass der symplektische Euler Schwingungsenergien im Mittel erhält, während der Standard-Euler ungedämpfte Oszillatoren instabil anbläst, ist mechatronisches Kernwissen.
- **Kapitel 10 (Digitaler Sensor mit Abtastzeiten):**
  - Abschnitt 10.2 und 10.6/10.7 modellieren getaktete Sensoren (`DiscreteTimeIntegrator`, `VariableSampleTimeBlock`). Dies spiegelt exakt den ADC-Wandlerzyklus und die SPS-Tasktaktung wider.
- **Kapitel 11 (VIBN, FMI/FMU, HiL/SiL/MiL):**
  - Exzellente begriffliche Einordnung der Co-Simulation und Steuerungskopplung.

### 2.2 Reibungszonen: Wo der Stoff noch zu abstrakt wirkt

```mermaid
quadrantChart
    title Praxis-Relevanz vs. Abstraktionsgrad
    x-axis Hohe Abstraktion (Theorie) --> Starker Praxisbezug (Industrie)
    y-axis Niedrige Relevanz für AT --> Hohe Relevanz für AT
    quadrant-1 Unmittelbare Kernkompetenz
    quadrant-2 Didaktische Pflicht
    quadrant-3 Kognitiver Ballast
    quadrant-4 Praxis ohne Systemtheorie
    "08: Federpendel (Open-Loop)": [0.25, 0.40]
    "08: Symplektik & RK4": [0.45, 0.85]
    "07: Fachwerk (Bauwesen)": [0.20, 0.30]
    "05: Kugel/Zylinder-Normalen": [0.15, 0.20]
    "05: Roboterkinematik & TCP": [0.85, 0.90]
    "09: Bank-Warteschlangen": [0.30, 0.45]
    "10: Digitale Abtastung & Sensor": [0.80, 0.88]
    "10: Bouncing Ball & Zeno": [0.55, 0.65]
    "04: Ringpuffer & MSAGL Schleifen": [0.75, 0.82]
    "11: VIBN, HiL, FMI/FMU": [0.90, 0.95]
```

#### Defizit A: Fehlender Closed-Loop-Regelkreis in Kapitel 08
- **Ist-Zustand:** Kapitel 08 simuliert ausschließlich offene Systeme (Freier Fall, ungedämpftes Federpendel, Diode).
- **Automatisierungs-Realität:** In der Industrie existiert kaum ein dynamisches System ohne Regelung. Ein Federpendel ohne Dämpfung oder Motor ist ein nettes Physik-Beispiel, aber kein Automatisierungssystem.
- **Didaktische Lösung:** Ergänzung eines **Gleichstrom-Servomotors mit PID-Positionsregler und Drehmomentbegrenzung (Sättigung)**. Hier zeigen sich alle Phänomene der Praxis: P-Verstärkung erzeugt Schwingung, D-Anteil dämpft, I-Anteil beseitigt bleibende Regelabweichung, Sättigung führt zu Anti-Windup-Bedarf.

#### Defizit B: Bauingenieur-Statik statt Maschinenbau-Gestelle in Kapitel 07
- **Ist-Zustand:** Kapitel 07 illustriert Fachwerke anhand von Brücken (Cremona, Culmann, Maxwell, Fachwerkbrücken).
- **Automatisierungs-Realität:** Automatisierungsingenieure bauen keine Brücken, sondern **Schweißgestelle für Bearbeitungszentren**, **Portalroboter-Ausleger**, **Kragträger für Werkzeugwechsler** und **Delta-Roboter-Gestänge**.
- **Didaktische Lösung:** Kontextualisierung der Aufgabenstellung auf das mechatronische Grundgestell eines Portalroboters oder Kragträgers.

#### Defizit C: Bankkunden statt diskreter Fertigungsstraße in Kapitel 09
- **Ist-Zustand:** Kapitel 09 modelliert eine Schalter-Warteschlange mit Kundenankünften (`Customer`, `QueueSimulation`).
- **Automatisierungs-Realität:** Die diskrete Simulation wird in Wels für **Materialflusssysteme, fahrerlose Transportsysteme (FTS/AGV), Taktstraßen mit Stau-Rollenförderern und Pufferstationen** benötigt.
- **Didaktische Lösung:** Umbenennung/Zweitbeispiel: Statt „Kunde an Kasse“ $\to$ „Werkstückträger (WT) an Bearbeitungsstation mit Staustrecke und Sensorabfrage“.

---

## 3. Erfüllung der Kernlernziele gemäß GEMINI.md

| GEMINI.md Lernziel | Erfüllungsgrad | Didaktische Umsetzung in den Folien | Handlungsbedarf |
| :--- | :---: | :--- | :--- |
| **1. Modellbildung:** Passende Modelle ableiten (statisch, kontinuierlich, diskret, hybrid). | **100%** | Exzellent. Alle 4 Paradigmen werden mathematisch hergeleitet und in Kap. 11 in der Modellierungsmatrix gegenübergestellt. | Keine inhaltliche Lücke. |
| **2. Numerische Parametrierung:** Solver-Schrittweiten, Stabilität und Konvergenz. | **95%** | Spitzenklasse: Von-Neumann-Grenze ($s \le 0.25$), Dahlquist-Testgleichung, Stabilitätsgebiet von RK4 ($h\omega \le 2\sqrt{2}$), symplektische Phasenerhaltung, Zeno-Abbruchschwelle. | Konkrete Faustformel-Tabelle zur Parametrierung in Kap. 08 fehlt noch. |
| **3. Eigene 2D/3D-Visualisierung:** Jenseits trivialer Standard-Plots. | **100%** | Umfassend: Pixel-Pointer (`WriteableBitmap`), Vektor-Canvas (Koordinatentransformation, Pan/Zoom, DrawingVisual), 3D-Szenengraph (`SharpGL`), MSAGL. | Vollständig erreicht. |
| **4. Softwarearchitektur nach Simulink-Vorbild:** S-Functions, Blöcke, Solver-Entkopplung. | **95%** | Vollständiges Klassendesign mit `Block`, `Model`, `Connection`, `ContinuousStates`, `DiscreteStates`, entkoppelten Solvern (`EulerExplicit`, `LoopSolver`, `RK4`). | In Kapitel 10 Querverweis auf Kapitel 8 korrigieren. |
| **5. Didaktische Vollständigkeit & Prüfbarkeit:** | **75%** | Stoff ist vorhanden, aber die Überprüfung des Verständnisses (Self-Assessment, Klausurbeispiele) ist lückenhaft verteilt. | Prüfungsfragen/Checkpoints an Kapitelenden ergänzen. |

---

## 4. Didaktische Hürden & Kognitive Belastungszonen

Bei der Durchführung von Lehrveranstaltungen an Fachhochschulen treten bei bestimmten Themen erfahrungsgemäß typische Barrieren auf:

```
Kognitiver Belastungsverlauf über das Semester:
[00]──[01]──/\──[02 Pixel: Pointer!]────[03]──[04]──/\──[05 OpenGL: Matrizen!]──[06]──[07: K-Matrix]──/\──[08: RK4/Loop]──[09: Chan-Merge]──[10: Zeno]──[11]
```

### 4.1 Die 5 größten Stolperfallen für Studierende

1. **Kapitel 02: Pointers & Bit-Manipulationen in Woche 2:**
   - *Hürde:* Viele Studierende beherrschen C# auf Anwendungsebene, haben aber noch nie mit `unsafe`, `byte*`, `uint*`, Bit-Shifts (`<< 24`) und Stride-Offsets gerechnet.
   - *Didaktische Abhilfe:* Eine Folie „Memory-Cheat-Sheet“ vorschalten, die `int` vs. `byte*` und Little-Endian visualisiert.

2. **Kapitel 02: Partielle Differentialgleichung (PDE) vor gewöhnlicher DGL (ODE):**
   - *Hürde:* Die 2D-Wärmeleitung mit dem Laplace-5-Punkt-Stern erfordert räumliche und zeitliche Diskretisierung gleichzeitig. Das überfordert mathematisch vor Kapitel 08.
   - *Didaktische Abhilfe:* Den Fokus in Kapitel 02 strikt auf das *Schreiben in das Pixelarray* legen und betonen: „Die Physik dient hier nur als Datenlieferant; die systematische Theorie der Zeitschrittverfahren lernen wir in Kapitel 8.“

3. **Kapitel 07: Assemblierung der globalen Steifigkeitsmatrix $K_{global}$:**
   - *Hürde:* Der Sprung von der $4 \times 4$-Elementsteifigkeitsmatrix eines Stabes zur $2n \times 2n$-Gesamtsteifigkeitsmatrix ist für Studierende abstrakt („Welcher Eintrag addiert sich wohin?“).
   - *Didaktische Abhilfe:* Ein visuelles Schema mit einem minimalen 2-Stab-System (3 Knoten) einfügen, das die Indexabbildung (Knoten-Freiheitsgrade $2i-1, 2i \to$ Matrixzeilen) farblich animiert darstellt.

4. **Kapitel 08: Algebraische Schleifen und Banach-Fixpunktiteration:**
   - *Hürde:* Wann konvergiert die Schleifeniteration und wann divergiert sie?
   - *Didaktische Abhilfe:* Den Begriff der Kontraktion ($|f'(x)| < 1$) anhand des Gain-Blocks grafisch veranschaulichen (Rückkopplung mit Verstärkung $k < 1$ konvergiert, $k \ge 1$ schaukelt sich auf).

5. **Kapitel 09: Box-Muller & Chan-Merge-Formel:**
   - *Hürde:* Die mathematische Herleitung der Box-Muller-Transformation über Polarkoordinaten und Funktionaldeterminanten sowie die 1-Pass-Varianzverschmelzung von Chan (1979) sind extrem dicht gedrängt.
   - *Didaktische Abhilfe:* Die Beweisführung als Exkurs deklarieren und die programmtechnische Anwendung (`ParallelWelfordAccumulator`) in den Vordergrund rücken.

---

## 5. Systematische Mängelliste & Schweregrad-Einteilung

### Schweregrad: Kritisch (Rot)
*Mängel, die zu Verwirrung bei Studierenden, formalen Fehlern oder strukturellen Abbrüchen führen.*

| ID | Kapitel | Folie / Bereich | Befund | Didaktische Auswirkung |
| :---: | :---: | :---: | :--- | :--- |
| **K1** | **Kap. 10** | Zeile 943 | Querverweis: *„Die ursprüngliche Solver-Implementierung (siehe Kapitel 4)...“* | **Falsche Kapitelnummer.** Studierende suchen in Kap. 04 (ScottPlot) vergeblich nach dem Solver. Muss **Kapitel 8** lauten! |
| **K2** | **Kap. 09** | Zeile 1349 | **Fehlende Kapitelzusammenfassung & Ausblick:** Kapitel endet unvermittelt nach Codebeispiel `Statistische Auswertung & Konfidenzintervall`. | Struktureller Abriss. Studierende wissen nicht, was prüfungsrelevant ist und wie es zu Kap. 10 weitergeht. |
| **K3** | **Kap. 10** | Zeile 1479 | **Fehlende Kapitelzusammenfassung & Ausblick:** Kapitel endet unvermittelt nach Screenshot `VariableSampleTime_Explizit.png`. | Fehlende Synthese von Zeno, Nulldurchgängen und hybrider S-Funktionsarchitektur vor dem Epilog. |
| **K4** | **Kap. 06** | Zeile 534–542 | **Fehlende Scharnierfolie zwischen Werkzeugen und Modellen:** Nach der Zusammenfassung von Kap. 06 bricht die Progression ab. | Der Wechsel vom „Tooling“-Block (02–06) zum physikalischen Modellbildungsblock (07–10) wird didaktisch nicht moderiert. |

---

### Schweregrad: Mittel (Gelb)
*Didaktische Reibungen, die den Lernerfolg bremsen oder den Anwendungsbezug schwächen.*

| ID | Kapitel | Folie / Bereich | Befund | Didaktische Auswirkung |
| :---: | :---: | :---: | :--- | :--- |
| **M1** | **Kap. 00** | Zeile 137–152 | In der Kursinhaltsliste fehlt **Kapitel 11 (Epilog)** komplett. | Unvollständige Semester-Roadmap am ersten Vorlesungstag. |
| **M2** | **Kap. 07** | Zeile 992–993 | Doppelter Folientrenner (`--- \n ---`) vor der Zusammenfassung. Kein Ausblick auf Kap. 08. | Formatierungsfehler und fehlende Überleitung vom statischen Gleichgewicht ($\sum F=0$) zur kontinuierlichen Dynamik ($m\ddot{x} = \sum F$). |
| **M3** | **Kap. 08** | Gesamtes Kap. | Reines Open-Loop-Verhalten (freier Fall, ungedämpftes Pendel). | Studierende der Automatisierungstechnik vermissen den **geschlossenen Regelkreis (Strecke + PID-Regler + Sättigung)**. |
| **M4** | **Kap. 07** | Gesamtes Kap. | Reine Bauwerks-Fachwerke (Brücken). | Fehlender Bezug zu mechatronischen Maschinengestellen, Portalrobotern oder Gelenkarmen. |
| **M5** | **Kap. 09** | Abschn. 9.1–9.4 | Reines Schalter-Warteschlangenbeispiel (Bankkunden). | Automatisierungsbezug (Materialfluss, Werkstückträger, Förderband, Taktzeit) bleibt ungenutzt. |
| **M6** | **Kap. 02** | Zeile 322–345 | `Parallel.For` wird genutzt, bevor Kapitel 06 (Multithreading) gelehrt wurde. | Keine Querverweis-Notiz, dass Nebenläufigkeit erst in Kap. 06 systematisch eingeführt wird. |

---

### Schweregrad: Gering / Kosmetisch (Grün)
*Optimierungen zur Steigerung der didaktischen Eleganz und Prüfungsvorbereitung.*

| ID | Kapitel | Folie / Bereich | Befund | Verbesserungsvorschlag |
| :---: | :---: | :---: | :--- | :--- |
| **G1** | **Kap. 02–10** | Kapitelenden | Es fehlen prägnante **„Prüfungs-Checkpoints“** (3–4 Kernfragen zur Selbstkontrolle vor Klausuren). | Am Ende jedes Kapitels nach der Zusammenfassung eine Folie *„Prüfungs-Check: Können Sie folgende Fragen beantworten?“* einfügen. |
| **G2** | **Kap. 03** | Zeile 300–335 | Pfeilberechnung für Fachwerkkräfte wird ohne direkten Verweis auf Kap. 07 eingeführt. | Note ergänzen: *„Dieser Kraftpfeil-Algorithmus wird in Kapitel 7 zur Visualisierung der Stabkräfte eingesetzt.“* |
| **G3** | **Kap. 04** | Zeile 530–555 | MSAGL zyklische Schleifenerkennung verweist nur abstrakt auf Solver. | Explizite Verknüpfung mit dem `EulerExplicitLoopSolver` aus Kapitel 08 herstellen. |
| **G4** | **Kap. 05** | Zeile 1240–1255 | Code-Beispiel Roboter-Kinematik ist sehr dicht formatiert. | Durch Einrückung und Kommentare für Beamer-Präsentation lesbarer gliedern. |

---

## 6. Konkrete Handlungsempfehlungen mit Aufwand-Nutzen-Bewertung

### Maßnahmenpaket 1: Strukturelle Härtung (Sofortmaßnahmen, Aufwand: Gering, Nutzen: Sehr Hoch)
1. **Behebung des Querverweises in Kapitel 10:**
   - Zeile 943 in `Folien/10_Dynamische_Modelle_Hybrid/Folien.md` ändern von `(siehe Kapitel 4)` auf `(siehe Kapitel 8)`.
2. **Ergänzung von Zusammenfassung & Ausblick in Kapitel 09:**
   - Nach Folie 1349 eine `# Zusammenfassung Kapitel 9` (Warteschlangen, Next-Event, Inversionsmethode, Box-Muller, Welford/Chan, Konfidenzintervall) und eine Folie `## Ausblick: Hybride Systeme` einfügen.
3. **Ergänzung von Zusammenfassung & Ausblick in Kapitel 10:**
   - Nach Folie 1479 eine `# Zusammenfassung Kapitel 10` (Bouncing Ball, Zero-Crossing, Zeno-Problem, Sticking Mode, SampleTime-Architektur) und eine Folie `## Ausblick: Epilog & Synthese` einfügen.
4. **Scharnierfolie am Ende von Kapitel 06 einbauen:**
   - Nach der Zusammenfassung von Kap. 06 eine Übergangsfolie einfügen: *„Meilenstein erreicht: Der methodische Werkzeugkasten steht. Nun wenden wir uns der Modellbildung zu: Statik (Kap. 7) $\to$ Kontinuierlich (Kap. 8) $\to$ Diskret (Kap. 9) $\to$ Hybrid (Kap. 10).“*
5. **Korrektur von Kapitel 00:**
   - Zeile 151 in `Folien/00_Prolog/Folien.md` um `4. [Epilog & Synthese](../11_Epilog/)` ergänzen.
6. **Korrektur von Kapitel 07:**
   - Doppelten Folientrenner auf Zeile 992 entfernen und Ausblick auf Kap. 08 (Übergang von $\sum F=0$ zu $m\ddot{x} = \sum F$) ergänzen.

### Maßnahmenpaket 2: Automatisierungstechnik-Schärfung (Aufwand: Mittel, Nutzen: Hoch)
1. **Regelkreis-Beispiel in Kapitel 08 ergänzen:**
   - Eine didaktische Sequenz (3–4 Folien) einfügen: *Geschlossener Regelkreis mit Gleichstrom-Servomotor (PT1) + PID-Regler + Stellgrößenbegrenzung*.
   - Zeigt die S-Funktions-Vorteile: Rückkopplung erzeugt algebraische Schleife oder Integrator-Kopplung; Anti-Windup schützt vor Regler-Übersteuern.
2. **Terminologie-Brücke in Kapitel 07 (Maschinengestelle):**
   - Im Einleitungsteil von Kap. 07 klar hervorheben, dass Fachwerke die Grundlage für **Portalroboter-Ausleger, Leichtbau-Greifarme und Maschinengrundrahmen** bilden.
3. **Produktions- und Materialfluss-Kontext in Kapitel 09 schärfen:**
   - In Abschnitt 9.1 und 9.2 neben dem Bankkunden explizit das Äquivalent der **automatisierten Fertigungszelle** (Werkstückträger $\to$ Bearbeitungsstation $\to$ Taktzeit) gegenüberstellen.

### Maßnahmenpaket 3: Prüfungsvorbereitung (Aufwand: Gering, Nutzen: Hoch)
- In jedes Kapitel (02 bis 10) eine finale Folie **„Prüfungs-Checkpoint“** mit 3 bis 4 prägnanten Fragen einbinden.
  - *Beispiel Kap. 02:* „Warum erfordert WriteableBitmap zeilenweises Schreiben? Wie lautet das Stabilitätskriterium für die explizite Wärmeleitung?“
  - *Beispiel Kap. 06:* „Was unterscheidet Race Conditions von Deadlocks? Warum darf Random nicht zwischen Threads geteilt werden?“
  - *Beispiel Kap. 08:* „Warum divergiert das explizite Euler-Verfahren beim ungedämpften Schwinger? Was zeichnet symplektische Integratoren aus?“
  - *Beispiel Kap. 10:* „Was ist das Zeno-Phänomen und wie wird es numerisch gelöst?“

---

## 7. Fazit & Gesamtbewertung

Der Foliensatz repräsentiert ein **inhaltlich und technisch herausragendes Lehrwerk**, das die Prinzipien der modernen Systemsimulation auf industriellem Software-Niveau vermittelt.

Durch die Beseitigung der verbleibenden **Übergangsbrüche (Kapitel 06 $\to$ 07, 09 $\to$ 10 $\to$ 11)**, die Bereinigung der **veralteten Referenz in Kapitel 10** und die gezielte **automatisierungstechnische Schärfung (geschlossener Regelkreis, mechatronische Kontexte, Prüfungs-Checkpoints)** wird der Kurs für die Welser Bachelor-Studierenden im 5./6. Semester zu einem didaktisch perfekten, praxisnahen und prüfungssicheren Vorzeige-Curriculum.

| Kriterium | Note (1-5) | Begründung |
| :--- | :---: | :--- |
| **Fachliche Tiefe & Exaktheit** | **1,0 (Sehr gut)** | Mathematisch und numerisch auf absolutem Hochschul-Spitzenniveau. |
| **Code-Architektur & C# .NET 8** | **1,0 (Sehr gut)** | S-Functions, TPL, Zero-Allocation-Konzepte vorbildlich umgesetzt. |
| **Didaktische Visualisierung** | **1,2 (Sehr gut)** | Alle 4 Grafiktechnologien lückenlos abgedeckt und didaktisch aufbereitet. |
| **Roter Faden & Transitions** | **2,3 (Befriedigend)** | Brüche an den Kapitelenden 06, 07, 09, 10 und fehlender Ausblick. |
| **Industriebezug Automatisierung** | **2,0 (Gut)** | Starke Ansätze (Robotik, Sensoren, VIBN), aber zu wenig Closed-Loop-Regelung. |
| **Prüfungsvorbereitung** | **1,8 (Gut)** | Epilog bietet tollen Rahmen; Einzelkapitel benötigen noch Checkpoints. |
| **GESAMTNOTE** | **1,5 (Sehr gut)** | Ein exzellentes Lehrwerk mit klarem Optimierungspfad zur Perfektion. |
