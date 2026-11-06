---
marp: true
theme: fhooe
header: 'Prolog'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

<!-- _paginate: false -->
<!-- _header: "" -->
<!-- _footer: "" -->

![bg right](./Titelbild.png)

# Prolog

Dieser erste Foliensatz umfasst die folgenden Inhalte:

1. Voraussetzungen
1. Lernziele
1. Kursinhalte
1. Kursstruktur & Notenmodell
1. Lektorenprofil

---

## Voraussetzungen

Für diesen Kurs in Computer-Simulation sollten Sie ausreichende Kenntnisse in den folgenden Themenbereichen mitbringen:

- **Mathematik** (Logik, Mengenlehre, Algebra, Analysis, Geometrie, Numerik, Stochastik)
- **Informatik** (Zahlensysteme, Zeichenkodierungen, Rechnerarchitekturen, Programmierparadigmen, Entwicklungsmethoden)

---

![bg right](./Illustrationen/Logik.png)

### Logik

Formalisierung der Prinzipien mathematischer Beweisführung:

- **Wahrheitswerte:** $\mathrm{true}$ ($t$, wahr, $1$) und $\mathrm{false}$ ($f$, falsch, $0$)
- **Negation (unär):** $\neg A$ (Nicht-Operator)
- **Junktoren (binär):** Konjunktion $A \wedge B$ (Und), Disjunktion $A \vee B$ (Oder)
- **Konditional (Implikation):** $A \Rightarrow B$ (Wenn $A$, dann $B$; hinreichende Bedingung)
- **Bikonditional (Äquivalenz):** $A \Leftrightarrow B$ (Genau dann, wenn; logische Gleichheit)

---

![bg contain right:35%](./Illustrationen/Mengenlehre.png)

### Mengenlehre

Untersuchung von Mengen als Sammlungen von Objekten:

- **Grundmengen:** Leere Menge $\emptyset$, Potenzmenge $\mathcal{P}(M) = \{U \mid U \subseteq M\}$
- **Elementrelation:** $x \in M$ (Element von), $x \notin M$ (kein Element von)
- **Prädikatenquantoren:** $\forall$ (Allquantor: „für alle“), $\exists$ (Existenzquantor: „es existiert“), $\nexists$ („existiert nicht“)
- **Mengenoperationen:** Vereinigung $A \cup B$, Schnitt $A \cap B$, Differenz $A \setminus B$, kartesisches Produkt $A \times B$
- **Mengenrelationen:** Teilmenge $A \subseteq B$, echte Teilmenge $A \subset B$
- **Geordnetes Tupel:** $(a, b) \in A \times B$

---

![bg right](./Illustrationen/Zahlensysteme.png)

### Zahlensysteme

Darstellung von Zahlen abhängig zu einer definierten Basis (z.B. 2 und 10 sowie 16):

- Binärzahlen (z.B. $0$ und $1$ sowie $1010$ und $1011$)
- Dezimalzahlen (z.B. $0$ und $1$ sowie $10$ und $11$)
- Hexadezimalzahlen (z.B. $0$ und $1$ sowie $A$ und $B$)

---

![bg right](./Illustrationen/Zeichenkodierungen.png)

### Zeichenkodierungen

Darstellung von Zeichen und anderer Symbole aus der Schriftsprache verschiedener Kulturen:

- American Standard Code for Information Interchange (ASCII)
- American National Standards Institute Code (ANSI-Code)
- Universal Coded Character Set Transformation Format (UTF)

---

![bg right](./Illustrationen/Rechnerarchitektur.png)

### Rechnerarchitekturen

Anordnung, Verknüpfung und Funktionsweise der Komponenten eines digitalen Rechners:

- **Von-Neumann-Architektur** (CPU, Bussystem, Speicherwerk, Ein-/Ausgabewerk)
- **Harvard-Architektur** (strikte Trennung von Daten- und Befehlsspeicher)

---

![bg right](./Illustrationen/Flynn.png)

### Rechnerarchitekturen (cont'd)

Klassifizierung der unterschiedlichen Rechnerarchitekturen nach Michael J. Flynn (1966):

- **Single Instruction, Single Data** (SISD; klassische Einkernrechner)
- **Single Instruction, Multiple Data** (SIMD; Vektorrechner)
- **Multiple Instruction, Single / Multiple Data** (Großrechner)

---

![bg right](./Illustrationen/Programmierparadigmen.png)

### Programmierparadigmen

- **Strukturierte Programmierung** (Verzweigungen, Schleifen, cache-freundliche Array-Iteration)
- **Funktionale Programmierung** (Zustandsfreie Ableitungsfunktionen $\dot{\mathbf{x}} = \mathbf{f}(t, \mathbf{x})$ ohne Seiteneffekte)
- **Objektorientierte Programmierung** (Schnittstellen `ISFunction`, Klassen, Vererbung, Polymorphismus)

---

## Lernziele

Die Teilnehmer*innen sollten nach erfolgreichem Absolvieren dieses Kurses die folgenden Fähigkeiten entwickelt haben:

- Auswahl einer geeigneten Modellart und Bildung eines geeigneten Modells für einen gegebenen Anwendungsfall
- Auswahl einer geeigneten Lösungsmethode und Anwendung der Methode auf ein definiertes Modell
- Umsetzung des Modells und der Lösungsmethode in einem Computer-Programm mit grafischer Benutzerschnittstelle
- Visualisierung der Daten des Computer-Programms mittels Charts und 2D- bzw. 3D-Ansichten

---

![bg right](./Illustrationen/Kursinhalte.png)

## Kursinhalte (1/2)

Dieser Kurs umfasst die folgenden Themenblöcke:

1. [Einführung](../01_Einführung/)
2. Technische & methodische Grundlagen:
   - [2D-Visualisierung (Pixel)](../02_Visualisierung_2D_Pixel/)
   - [2D-Visualisierung (Vektor)](../03_Visualisierung_2D_Vektor/)
   - [2D-Visualisierung (Diagramme & Graphen)](../04_Visualisierung_2D_Diagramme/)
   - [3D-Visualisierung (OpenGL)](../05_Visualisierung_3D_OpenGL/)
   - [Multithreading](../06_Multithreading/)

---

![bg right](./Illustrationen/Kursinhalte.png)

## Kursinhalte (2/2)

3. Simulationsmodelle:
   - [Statische Modelle](../07_Statische_Modelle/)
   - [Dynamische Modelle (Kontinuierlich)](../08_Dynamische_Modelle_Kontinuierlich/)
   - [Dynamische Modelle (Diskret)](../09_Dynamische_Modelle_Diskret/)
   - [Dynamische Modelle (Hybrid)](../10_Dynamische_Modelle_Hybrid/)
4. [Epilog & Synthese](../11_Epilog/)

---

## Kursstruktur & Arbeitsweise

Die Lehrveranstaltung ist eine **Integrierte Lehrveranstaltung (ILV)** mit 3 ECTS (75 h Workload):

- **Interaktive Vorlesung (110–125 min):** Vermittlung der mathematischen Grundlagen, Algorithmen und C#-Implementierungen.
- **Hausübung Stufe 1 – Basisaufgabe (~60 min):** Gemeinsames Fundament auf der C#-Projektvorlage mit automatisierten Unit-Tests (`1.1`–`1.4`).
- **Hausübung Stufe 2 – Vertiefungsaufgabe (1 Woche):** Autonome Erweiterung im 2er-Team im gewählten Track (`Track A` Industrie vs. `Track B` Game).
- **Live-Showcase & Code-Defense (20 min):** Rotierende Beamer-Präsentationen, Code-Erklärung und Live-Parameter-Stresstest.

---

### Freie Track-Wahl: Industrie vs. Simulation Game

Für die vertiefenden Laboraufgaben (Stufe 2) wählen Sie im 2er-Team frei zwischen zwei gleichwertigen Pfaden:

<div class="columns">
<div class="two">

#### Track A: Industrie & Mechatronik
- Reale Sondermaschinen, Prüfstände und Digitale Zwillinge.
- *Themen:* Hydraulikzylinder, CPU-Kühler, CAD-Fachwerke, Prüfstände, SCARA-Roboter.

</div>
<div class="two">

#### Track B: Simulation Game
- Interaktive Physik-Spiele, Arcade-Klassiker und visuelle Effekte.
- *Themen:* Retro Artillery Duel, Doom Fire & Lava, Space Radar, Racing HUD, Claw Crane.

</div>
</div>

> Beide Tracks basieren auf identischen mathematisch-numerischen Prinzipien (je 10 Punkte).

---

## Das 2-Säulen-Notenmodell (40 – 40 – 20)

Transparente Beurteilung von Theorie, praktischer Implementierung und Live-Verteidigung:

<div class="columns">
<div class="two">

**Säule 1: Moodle-Quizzes (40 %)**
- 4 Moodle-Präsenztests (je 10 %)
- Q1 (T03), Q2 (T05), Q3 (T08), Q4 (T10)
- Fehlerdiagnose & Stabilitätsgrenzen (CFL)
- Formelverständnis & Code-Mutationen

**Bestehenskriterium:**
- Gesamtnote $\ge 50\,\%$
- Mind. $50\,\%$ in Säule 1 (Theorie)
- Mind. $50\,\%$ in Säule 2 (Praxis)

</div>
<div class="two">

**Säule 2: Übungen & Showcase (60 %)**
- **40 % C#-Code-Portfolio:** 10 wöchentliche Hausübungen à 4 % (Stufe 1 + Stufe 2: Track A oder B)
- **20 % Live-Showcase & Code-Defense:** Rotierende Live-Vorführung, Code-Erklärung & Stresstest am Beamer
- **Keine separate Plenumsnote:** Voller Fokus auf eigenen Code & eigene Live-Verteidigung

</div>
</div>

---

### Live-Showcase & Code-Defense (Säule 2b)

Zu Beginn jedes Folgetermins demonstrieren zwei zufällig ausgewählte Teams ihre Lösung live am Beamer:

<div class="columns">
<div class="two">

#### Live-Demonstration & Stresstest
- **Live-Demonstration:** Flüssig laufende Simulation ($\ge 30\,\text{FPS}$) im Hörsaal.
- **Code-Inspection:** Exakte Begründung jeder Codezeile (kein blindes „Vibe Coding“!).
- **Live-Parameter-Stresstest:** Ad-hoc-Modifikation (z. B. Schrittweite verzehnfachen).

</div>
<div class="two">

#### Code-Defense („Warum genau diese Zeile?“)
- **Gezielte Code-Inspection:** Jedes Teammitglied erklärt den eingereichten Code im Detail.
- **Enttarnung von Schein-Animationen:** Echte Physik-DGL statt reiner UI-Animation!
- **Schutz gegen blindes „Vibe Coding“:** KI-Tools sind erlaubt, aber unverstandener Code kostet Punkte.

</div>
</div>

---

![bg right](./Fotografien/Lektorenprofil.jpg)

## Lektorenprofil

**Dr. Georg Hackenberg**, *Professor für Informatik und Industriesysteme*

Fakultät für Technik und angewandte Naturwissenschaften, Fachhochschule Oberösterreich, Campus Wels

Büro: A | O2 - 030
E-Mail: georg.hackenberg@fh-wels.at