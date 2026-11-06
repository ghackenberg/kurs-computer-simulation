# Systeminstruktionen (`kurs-computer-simulation`)

## 1. Kontext & Lernziele

- **Dozent:** Prof. Dr. Georg Hackenberg (*Professor für Informatik und Industriesysteme*, FH Oberösterreich, Campus Wels).
- **Studiengang & Kurs:** Bachelor *Automatisierungstechnik* (5. Semester), Lehrveranstaltung *Systemsimulation / Digitaler Zwilling*.
- **Lernziele:**
  1. Für technische Problemstellungen passende mathematische Modelle (statisch/dynamisch, kontinuierlich/diskret/hybrid) ableiten sowie C#-Programme für Berechnung und Visualisierung entwickeln.
  2. Numerische Lösungsalgorithmen (z. B. Schrittweite, Stabilität, Konditionierung) gezielt parametrieren.
  3. Performante 2D- und 3D-Visualisierungen entwickeln (`WPF WriteableBitmap`, `WPF Canvas` / `DrawingVisual`, `ScottPlot 5`, `MSAGL`, `SharpGL`, `Math.NET Numerics`, Multithreading mit `Parallel.For`).

---

## 2. Repository-Struktur

- `./Folien/[XX_Kapitel_Bezeichnung]/` – MARP-Vorlesungsfolien (`Folien.md`), `Titelbild.jpg`, `./Diagramme/` (`*.svg`, `*.tikz.tex`, `*.mmd`), `./Illustrationen/`, `./Screenshots/`.
- `./Uebungen/[Termin_XX_Bezeichnung]/` – Aufgabenblätter (`Aufgabenblatt.md`, `Aufgabenblatt.pdf`) und C#-Projektvorlagen (`./Vorlage/`).
- `./Moodle/` – Formelfreie Moodle-Termintexte (`Moodle_Kursstruktur_und_Termintexte.md`) und Moodle-Quizzes.
- `./Konzept/` – Syllabus, Übungskatalog und Beurteilungskonzept.
- `./Export/` – Druckreife Moodle-PDFs (`./Export/Folien/` und `./Export/Uebungen/`).
- `./Skripte/` – Plattformunabhängige Node.js-Prüf-, Generierungs- und Exportskripte.
- `./Quellen/` & `./Werkzeuge/` – C#-Referenzimplementierungen und Grafikgeneratoren.

---

## 3. Spezialisierte Workspace-Skills (`.agents/skills/`)

Detailregeln für Folien, SVGs und Übungsblätter sind modular in **Workspace-Skills** ausgelagert. **Du MUSST den jeweiligen Skill vor Beginn der Arbeit mit `read_file` aktivieren:**

1. **[`vorlesungsfolien-didaktik`](.agents/skills/vorlesungsfolien-didaktik/SKILL.md):**
   - **Aktivieren bei:** Lesen, Planen, Erstellen oder Überarbeiten von `Folien/**/Folien.md`.
   - **Kerninhalte:** MARP-Syntax, 3-Schritt-Rhythmus (*Anwendungsbeispiel $\to$ Blick unter die Haube $\to$ C#-Code*), nahtlose Storyline-Übergänge, konkrete Zahlenbeispiele statt nackter $\mathcal{O}(\dots)$-Notation, Variablen-Konsistenzregeln (Regel 1–4), reine Bildsyntax ohne `w:`/`h:`.
2. **[`svg-diagramm-design`](.agents/skills/svg-diagramm-design/SKILL.md):**
   - **Aktivieren bei:** Erstellen oder Ändern von SVG-Grafiken (`Folien/**/Diagramme/*.svg`, `Skripte/generate_*_svgs.js`).
   - **Kerninhalte:** Standard-Maße (`viewBox="-45 0 570 380"` für `<div class="two">`), Mindestschriftgröße ($\ge 11{,}5\,\text{px}$ nach CTM), konkrete Zahlenwerte in Algorithmen-Grafiken, FH-OÖ-Farbsemantik, UTF-8-Sicherheit.
3. **[`uebungsaufgaben-und-moodle`](.agents/skills/uebungsaufgaben-und-moodle/SKILL.md):**
   - **Aktivieren bei:** Erstellen oder Ändern von `Uebungen/**`, `Moodle/**` oder `Konzept/**`.
   - **Kerninhalte:** Zweistufige Hausübung zu Hause (**Stufe 1: Basisaufgabe** mit Ziffern `1.1`–`1.4` auf der Vorlage $\to$ **Stufe 2: Vertiefungsaufgabe** mit Buchstaben **Track A** `A.1`–`A.4` ODER **Track B** `B.1`–`B.4`; **kein Live-Coding / kein In-Class-Sprint im Hörsaal**), 6-Punkte-Synchronisations-Checkliste, Moodle-Quiz-Design (strikte Rückwärts-Kausalität, 8 Fragen / 10 Pkt., kein Längen-Bias, keine Formeln im Fragetext verraten), **striktes Verbot von LaTeX-Formeln (`$...$`) und Backticks in `Moodle_Kursstruktur_und_Termintexte.md`**.
4. **[`didaktik-und-qualitaets-review`](.agents/skills/didaktik-und-qualitaets-review/SKILL.md):**
   - **Aktivieren bei:** Inhaltlichen Reviews, Qualitäts-Audits oder vor dem Release/Merge eines Kapitels bzw. Termins (insbesondere durch einen unabhängigen Review-Subagenten nach dem Vier-Augen-Prinzip).
   - **Kerninhalte:** 6-Dimensionen-Prüfraster (Curriculare Einbettung 5. Sem. AT Wels, Kausalität & 150-Min.-Taktung ohne Live-Coding, Storyline & Engpass-Motivation, Visuelle Evidenz, Übungs-Symmetrie, Quiz-Psychometrie).

---

## 4. Automatisierte Qualitätsgates & Schnellbefehle (`package.json`)

Vor jedem Commit nach Folien-, SVG- oder Übungsänderungen müssen die zugehörigen Prüfskripte mit **0 Fehlern** durchlaufen:

- **Gezielte Kapitelprüfung (`XX` = `00` bis `11`):**
  - `npm run lint:slides:XX` – DOM-Layoutprüfung in Headless Chrome (`1280x720`, Überlauf, $\ge 12\,\text{px}$ Randabstand, $\ge 11{,}5\,\text{px}$ effektive Schriftgröße).
  - `npm run lint:sections:XX` – Kapitel-/Abschnittsschema (3:4-Hintergrundbilder, Standard-Einleitungssätze, reine Bildsyntax).
  - `npm run lint:svg:XX` – SVG-Qualitäts- & Clipping-Audit.
  - `npm run lint:variables:XX` – Didaktische Variablen-Konsistenz zwischen Text, Formeln, SVGs und Code.
- **PDF-Export (`Export/`):**
  - `npm run export:pdf:XX` – Exportiert das Moodle-PDF für Vorlesungskapitel `XX`.
  - `npm run export:pdf:uebung:XX` – Exportiert das PDF für Übungsblatt `XX` (`01` bis `10`).
- **Gesamtlauf:** `npm run lint` bzw. `npm run export:pdf`.

---

## 5. Kontinuierliche Verbesserung (Self-Improving Instructions & Skills)

Um zu verhindern, dass behobene Fehler in künftigen Kapiteln oder Terminen erneut auftreten, gilt folgender **automatischer Lern-Zyklus**:

1. **Sofort-Erkennung bei Nutzer-Korrekturen:**
   - Wann immer der Nutzer eine didaktische, gestalterische oder strukturelle Korrektur anmerkt (z. B. *„fällt vom Himmel“*, *„SVG noch nicht aussagekräftig genug“*, *„Überschneidung zwischen Tracks“*, *„Formatierungsproblem in Moodle“*), prüfe nach der Behebung sofort: **Ist dies eine allgemeine Regel für künftige Kapitel/Termine?**
   - Wenn ja, schlage aktiv vor (oder aktualisiere direkt beim Sichern des Zwischenstands), diese Erkenntnis im entsprechenden Skill unter `.agents/skills/` zu ergänzen.
2. **Pflicht-Retrospektive vor jedem Release / Merge:**
   - Vor jedem Abschluss eines Kapitels oder Merge nach `main` (z. B. auf die Frage *„Sind wir bereit für den Release?“*) führst du neben den technischen Lintern automatisch einen **Learnings-Check** durch: *Sind alle neuen Erkenntnisse aus dieser Sitzung bereits in `.agents/skills/` oder `AGENTS.md` verewigt?*
