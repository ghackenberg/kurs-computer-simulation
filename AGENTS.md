# Systeminstruktionen (`kurs-computer-simulation`)

## 1. Kontext & Übergeordnete Lernziele

- **Dozent:** Prof. Dr. Georg Hackenberg (*Professor für Informatik und Industriesysteme*, FH Oberösterreich, Campus Wels).
- **Studiengang & Kurs:** Bachelor *Automatisierungstechnik* (5. Semester), Lehrveranstaltung *Systemsimulation / Digitaler Zwilling* (ILV, 3 ECTS = 75 h, 10 Termine à 150 Min.).
- **Übergeordnete Kurs-Lernziele (ILOs):**
  1. Für technische Problemstellungen passende mathematische Modelle (statisch/dynamisch, kontinuierlich/diskret/hybrid) ableiten sowie sauber entkoppelte C#-Programme für Berechnung und Visualisierung entwickeln.
  2. Numerische Lösungsalgorithmen (z. B. Schrittweite, Stabilität, Konditionierung, Erhaltungssätze) gezielt parametrieren und validieren.
  3. Performante, allokationsfreie 2D- und 3D-Visualisierungen sowie Multi-Core-Simulationen entwickeln (`WPF WriteableBitmap`, `WPF Canvas` / `DrawingVisual`, `ScottPlot 5`, `MSAGL`, `SharpGL`, `Math.NET Numerics`, `Parallel.For`).

---

## 2. Repository-Struktur & Single Source of Truth

- `./Konzept/` – Redundanzfreie Single-Source-of-Truth-Konzeptdokumente:
  1. [`01_Lehrkonzept_und_Syllabus.md`](Konzept/01_Lehrkonzept_und_Syllabus.md) – Zielgruppenprofil, Lernziele (Bloom-Kaskade), Motivation (*Pick your Track*), Anspruchsniveau (*Low Floor, High Ceiling*), 150-Min.-Taktung, **Semester-Übersichtsmatrix**, **Kapitel-Abhängigkeits- & Fern-Schnittstellen-Matrix** sowie Vorlesungs-Steckbriefe `T01`–`T10`.
  2. [`02_Uebungskatalog.md`](Konzept/02_Uebungskatalog.md) – Detailkatalog der 10 wöchentlichen zweistufigen Hausübungen (`Stufe 1: 1.1–1.4` + `Stufe 2: Track A | Track B`, kein separates Abschlussprojekt), Goldene Architektur-Regel & Showcase-Leitfragen.
  3. [`03_Beurteilung_und_Lernfortschritt.md`](Konzept/03_Beurteilung_und_Lernfortschritt.md) – 5-stufige Lernfortschrittskontrolle, 2-Säulen-Benotungsmodell (40 % Quiz / 40 % wöchentliche Hausübungen / 20 % Showcase), Notenschlüssel, 4-Stufen-Stresstest & AI Honor Code.
- `./Folien/[XX_Kapitel_Bezeichnung]/` – MARP-Vorlesungsfolien (`Folien.md`, `Folien_Anhang_*.md`), `Titelbild.jpg`, `./Diagramme/*.svg`, `./Illustrationen/`, `./Screenshots/`.
- `./Uebungen/[Termin_XX_Bezeichnung]/` – Aufgabenblätter (`Aufgabenblatt.md`, `Aufgabenblatt.pdf`) und C#-Projektvorlagen (`./Vorlage/`).
- `./Moodle/` – Formelfreie Moodle-Termintexte (`Moodle_Kursstruktur_und_Termintexte.md`) und 10-Varianten-Moodle-XML-Quizzes (`Quiz_01_*` bis `Quiz_04_*`).
- `./Export/` – Druckreife Moodle-PDFs (`./Export/Folien/` und `./Export/Uebungen/`).
- `./Skripte/` – Plattformunabhängige Node.js-Prüf-, Generierungs- und Exportskripte.
- `./Quellen/` & `./Werkzeuge/` – C#-Referenzimplementierungen und Grafikgeneratoren.

---

## 3. Die 6 Spezialisierten Workspace-Skills (`.agents/skills/`)

Alle vorlesungsübergreifenden Regeln sind modular in **6 fokussierten Workspace-Skills** (Single Responsibility) hinterlegt. **Du MUSST den jeweiligen Skill vor Beginn der Arbeit mit `read_file` aktivieren:**

### Ebene 1: Makro-Konzeption, Curriculum & Didaktik
1. **[`lehrkonzept-und-didaktik`](.agents/skills/lehrkonzept-und-didaktik/SKILL.md):**
   - **Aktivieren bei:** Arbeit an `Konzept/*.md`, `Moodle/Moodle_Kursstruktur_und_Termintexte.md`, Curriculum-Planung, Kapitel-Querbezügen, Lernzielen oder der 6-Punkte-Synchronisation.
   - **Kerninhalte:** Bloom-Lernziel-Kaskade, 5-stufige Lernfortschrittskontrolle, Studierenden-Motivation (*Pick your Track*, Domänenwechsel), *Low Floor, High Ceiling*, Kapitel-Abhängigkeitsmatrix, 5 Grundregeln verständlicher Erklär-Didaktik, 6-Punkte-Synchronisation (inkl. LaTeX-/Backtick-Verbot in `Moodle_Kursstruktur_und_Termintexte.md`).

### Ebene 2: Die 4 Artefakt-Skills
2. **[`vorlesungsfolien`](.agents/skills/vorlesungsfolien/SKILL.md):**
   - **Aktivieren bei:** Lesen, Planen, Erstellen oder Überarbeiten von `Folien/**/Folien.md` und `Folien_Anhang_*.md`.
   - **Kerninhalte:** Netto-Folienkorridor (40–48 Folien), Pflicht-Einstiegsfolie `### Rückblick & Brücke:`, 3-Schritt-Rhythmus, Konventions-Brücken, MARP-Layout (`fhooe.css` Spaltengewichte `one`–`six`, reine Bildsyntax), Variablen-Konsistenz (`lint:variables` Regeln 1–4).
3. **[`svg-diagramme`](.agents/skills/svg-diagramme/SKILL.md):**
   - **Aktivieren bei:** Erstellen oder Ändern von SVG-Grafiken (`Folien/**/Diagramme/*.svg`, `Skripte/generate_*_svgs.js`).
   - **Kerninhalte:** Kontrast-SVGs (*Naiv/Falsch vs. Richtig*), echte Zahlenwerte im Diagramm, Standard-Maße (`viewBox="-45 0 570 380"` vs. `1080x450`), Mindestschriftgröße ($\ge 11{,}5\,\text{px}$ nach CTM), Farbsemantik, Vermeidung von `SHIELD_TEXT_OVERFLOW`.
4. **[`uebungsaufgaben`](.agents/skills/uebungsaufgaben/SKILL.md):**
   - **Aktivieren bei:** Erstellen oder Ändern von `Uebungen/Termin_XX_*/Aufgabenblatt.md` und `Vorlage/**`.
   - **Kerninhalte:** Zweistufige Hausübung (`Stufe 1: 1.1–1.4` $\to$ `Stufe 2: Track A | Track B`), Symmetrie ohne Redundanz, forensischer Code-Walkthrough gegen `Vorlage/`, *Golden Reference Numbers* (5-Sekunden-Selbsttest), aktive Unit-Tests in `Aufgabe 1.4` (`dotnet test`).
5. **[`moodle-quizzes`](.agents/skills/moodle-quizzes/SKILL.md):**
   - **Aktivieren bei:** Erstellen oder Ändern von `Moodle/Quiz_0X_*/**` und `Skripte/generate_moodle_xml_quiz_0X.js`.
   - **Kerninhalte:** Strikte Rückwärts-Kausalität, 10-Varianten-Moodle-XML-Architektur (`Test_01..03` Vorbereitung + `Test_04..10` Prüfung via `moodle_xml_builder.js` in 3 Chunks), voller Auto-Grading-Fragetypen-Mix (8 Fragen = 10 Pkt.), Inversion der Fragerichtung, Längen-Symmetrie ($\le 25\,\%$), keine Formeln im Fragetext.

### Ebene 3: Unabhängige Qualitätssicherung
6. **[`qualitaets-review`](.agents/skills/qualitaets-review/SKILL.md):**
   - **Aktivieren bei:** Inhaltlichen Reviews, Qualitäts-Audits oder vor dem Release/Merge eines Kapitels bzw. Termins (insbesondere durch unabhängige Review-Subagenten nach dem Vier-Augen-Prinzip).
   - **Kerninhalte:** Schritt-0-Kontext-Ingestion (`AGENTS.md` + `Konzept/01..03_*.md` + Nachbar-/Fern-Kapitel) und das 6-Dimensionen-Prüfraster gegen die Skills 1–5.

---

## 4. Automatisierte Qualitätsgates & Schnellbefehle (`package.json`)

Vor jedem Commit nach Folien-, SVG- oder Übungsänderungen müssen die zugehörigen Prüfskripte mit **0 Fehlern** durchlaufen:
- **Gezielte Kapitelprüfung (`XX` = `00` bis `11`):**
  - `npm run lint:slides:XX` – DOM-Layoutprüfung in Headless Chrome (`1280x720`, Überlauf, $\ge 12\,\text{px}$ Randabstand, $\ge 11{,}5\,\text{px}$ effektive Schriftgröße).
  - `npm run lint:sections:XX` – Kapitel-/Abschnittsschema (3:4-Hintergrundbilder, Standard-Einleitungssätze, `Rückblick & Brücke`-Folie, reine Bildsyntax).
  - `npm run lint:svg:XX` – SVG-Qualitäts- & Clipping-Audit.
  - `npm run lint:variables:XX` – Didaktische Variablen-Konsistenz zwischen Text, Formeln, SVGs und Code.
- **PDF-Export (`Export/`):** `npm run export:pdf:XX` (Vorlesung `XX`) bzw. `npm run export:pdf:uebung:XX` (Übungsblatt `01`–`10`).
- **Gesamtlauf:** `npm run lint` bzw. `npm run export:pdf`.

---

## 5. Kontinuierliche Verbesserung (Self-Improving Instructions & Skills)

1. **Sofort-Erkennung bei Nutzer-Korrekturen:**
   - Wann immer der Nutzer eine didaktische, gestalterische oder strukturelle Korrektur anmerkt, prüfe sofort nach der Behebung: **Ist dies eine allgemeine Regel für künftige Kapitel/Termine?** Wenn ja, ergänze sie im zuständigen Skill unter `.agents/skills/`.
2. **Pflicht-Retrospektive & Mehrperspektivische Review-Edit-Schleife vor jedem Release / Merge:**
   - Vor dem Abschluss eines Kapitels/Termins wird eine **selbständige Review-Edit-Schleife mit frischen Subagenten-Kontexten** nach dem Skill [`qualitaets-review`](.agents/skills/qualitaets-review/SKILL.md) durchlaufen, bis **0 Befunde** erreicht sind.
   - Führe abschließend einen **Learnings-Check** durch: *Sind alle neuen Erkenntnisse aus dieser Sitzung bereits in `.agents/skills/` oder `Konzept/` verewigt?*
