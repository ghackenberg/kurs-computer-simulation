---
name: moodle-quizzes
description: >-
  Vorlesungsübergreifende Regeln für den Entwurf, die Kausalität, die Psychometrie und die
  10-Varianten-Moodle-XML-Generierung von summativen Moodle-Quizzes
  (Kapitel/*/Quiz/Test_*.md, Skripte/moodle_xml_builder.js, Export/Moodle/*.xml).
  IMMER aktivieren, wenn Moodle-Quizzes erstellt, geprüft oder überarbeitet werden.
---

# Skill: Moodle-Quizzes & Prüfungs-Psychometrie (`Kapitel/*/Quiz/`)

Verbindliche Regeln für die Erstellung, Validierung und den Moodle-XML-Export summativer Kurztests. Welche Kapitel zu welchem Quiz gehören, ist in `Konzept/02_*.md` und `Konzept/03_*.md` festgelegt.

---

## 1. Strikte Rückwärts-Kausalität

- Jedes Quiz findet in den ersten 15 Minuten **vor** dem Theorie-Impuls des Prüfungstermins statt und darf **ausschließlich den Stoff der vorangegangenen Termine** abfragen (niemals den Stoff des aktuellen Termins, an dem das Quiz geschrieben wird!).
- Prüfe vor dem Entwurf jeder Frage die **Kapitel-Abhängigkeits- & Quiz-Matrix** in `Konzept/02_*.md` und `03_*.md` auf explizit ausgeschlossene spätere Konzepte.

---

## 2. Redundanzfreie 10-Varianten-Markdown-Architektur (`Kapitel/*/Quiz/` $\to$ `Export/Moodle/`)

1. **Modulare Markdown-Dateien als Single Source of Truth (`Kapitel/XX_*/Quiz/`):**
   - Jedes finalisierte Quiz liegt ausschließlich als menschenlesbare Markdown-Dateien im Unterordner `Quiz/` des jeweiligen Prüfungskapitels (`03`, `05`, `08`, `10`):
     - `README.md` – Quiz-Metadaten (`Quiz-ID`, `Export-XML`, `Stoffabgrenzung`, `Kausalitäts-Sperre`) und Übersichtstabelle aller 10 Varianten.
     - `Test_01_Vorbereitung.md` bis `Test_03_Vorbereitung.md` (**3 Vorbereitungstests** zum unbegrenzten Üben).
     - `Test_04_Pruefung.md` bis `Test_10_Pruefung.md` (**7 Prüfungstests** für die Präsenzprüfung).
   - Keine redundanten Einzel-XMLs (`XML_Tests/`) im `Quiz/`-Ordner und keine quiz-spezifischen Generator-Skripte in `Skripte/`!
2. **Validierung & Export einer einzigen Master-XML (`Skripte/moodle_xml_builder.js`):**
   - `npm run lint:moodle` (`node Skripte/moodle_xml_builder.js --check`) parst alle `Kapitel/*/Quiz/Test_*.md` und prüft automatisch: 10 Tests pro Quiz, 8 Fragen = 10,0 Pkt. pro Test, $\le 25\,\%$ Längen-Symmetrie bei allen `multichoice`-Fragen, spezifisches Feedback für jede Option sowie Freiheit von XML-Steuerzeichen.
   - `npm run export:moodle` (`node Skripte/moodle_xml_builder.js`) erzeugt pro Quiz **genau eine einzige importfertige Master-XML** unter `Export/Moodle/Quiz_0X_Termin_YY.xml` (die beim Import in Moodle automatisch alle 10 Unterkategorien `Test_01_Vorbereitung`..`Test_10_Pruefung` anlegt).

---

## 3. Fragetypen-Mix (8 Fragen = 10,0 Pkt. / 15 Min., 100 % Auto-Grading)

Jeder der 10 Tests besteht aus **exakt 8 Fragen (Summe: 10,0 Punkte)** und wird von Moodle zu 100 % automatisch ausgewertet (keine Freitext-Fragen `essay`):
1. **Rechen- & Code-Tracing-Fragen (2–3 Fragen, zusammen ca. 4–5 Pkt.):**
   - `numerical`: Zahleneingabe mit Toleranz sowie **automatischen `50 %`-Teilpunkte-Antworten (`fraction="50"`)** für typische Einheiten-, Zehnerpotenz- oder Vorzeichenfehler inkl. spezifischem Feedback.
   - `cloze`: Eingebettete Teilfragen (`{:NUMERICAL:...}` / `{:MULTICHOICE:...}`) für mehrstufige Rechnungen, damit Zwischenschritte unabhängig bepunktet werden.
2. **Interaktive Code- & Pipeline-Fragen (1–2 Fragen, je 1,0 Pkt.):**
   - `gapselect`: Code-Block mit 2–4 Lücken `[[1]]`, `[[2]]` per Inline-Dropdown.
   - `ddwtos`: Drag-and-Drop für Pipeline- und Ausführungsreihenfolgen.
3. **Konzept- & Architektur-Zuordnung (1 Frage, 1,0 Pkt.):**
   - `matching`: 4 Stamm-Paare plus **1–2 leere `<subquestion><text></text><answer>...</answer></subquestion>` als Überhang-Distraktoren** gegen das Ausschlussprinzip.
4. **Diagnose & Systemverständnis (2–3 Fragen, je 1,0 Pkt.):**
   - `multichoice` (`single=true` & `single=false`) mit 4 Optionen A–D zu subtilen Code-Bugs oder physikalisch-numerischen Phänomenen.

---

## 4. Feedback-Pflicht & Anti-Bias-Regeln

1. **Vollständiges Moodle-Feedback für jede Frage:**
   - Spezifisches `<feedback>` für **jede einzelne Option** (richtig, falsch und 50-%-Teilpunkte-Antwort), das erklärt, *warum* die Option stimmt bzw. *welcher konkrete Denkfehler* vorliegt.
   - Ausführliches `<generalfeedback>` mit vollständiger Schritt-für-Schritt-Herleitung.
2. **Inversion der Fragerichtung (`Test_01..03` vs. `Test_04..10`):**
   - Die Prüfungs-Varianten (`04`–`10`) variieren gegenüber den Vorbereitungs-Varianten (`01`–`03`) systematisch die **gesuchte Zielgröße / Rechenrichtung** sowie die konkreten Code-Bugs (kein bloßes Austauschen der Zahlenwerte!).
3. **Längen-Symmetrie ($\le 25\,\%$ Abweichung):**
   - Alle 4 Antwortoptionen A–D einer `multichoice`-Frage müssen gleich lang und gleich detailliert formuliert sein (wird von `moodle_xml_builder.js` automatisch geprüft).
4. **Echte Fehlkonzepte statt Scherzantworten & keine Formeln im Fragetext:**
   - Jede Falschantwort repräsentiert einen realen Studierenden- oder LLM-Denkfehler. Der Fragetext nennt nur das Szenario und gegebene Rohgrößen; Grundformeln dürfen im Fragetext niemals verraten werden.
