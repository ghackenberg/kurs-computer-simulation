---
name: moodle-quizzes
description: >-
  Vorlesungsübergreifende Regeln für den Entwurf, die Kausalität, die Psychometrie und die
  10-Varianten-Moodle-XML-Generierung von summativen Moodle-Quizzes
  (Moodle/*/Quiz_0X_*/**, Skripte/generate_moodle_xml_quiz_0X.js, Skripte/moodle_xml_builder.js).
  IMMER aktivieren, wenn Moodle-Quizzes oder Quiz-Generatoren erstellt, geprüft oder überarbeitet werden.
---

# Skill: Moodle-Quizzes & Prüfungs-Psychometrie (`Moodle/*/Quiz_*`)

Verbindliche Regeln für die Erstellung, Validierung und Moodle-XML-Generierung summativer Kurztests. Welche Kapitel zu welchem Quiz gehören, ist in `Konzept/01_*.md` und `Konzept/03_*.md` festgelegt.

---

## 1. Strikte Rückwärts-Kausalität

- Jedes Quiz findet in den ersten 15 Minuten **vor** dem Theorie-Impuls des Prüfungstermins statt und darf **ausschließlich den Stoff der vorangegangenen Termine** abfragen (niemals den Stoff des aktuellen Termins, an dem das Quiz geschrieben wird!).
- Prüfe vor dem Entwurf jeder Frage die **Kapitel-Abhängigkeits- & Quiz-Matrix** in `Konzept/01_*.md` und `03_*.md` auf explizit ausgeschlossene spätere Konzepte.

---

## 2. 10-Varianten-Architektur (`Skripte/generate_moodle_xml_quiz_0X.js`)

1. **Single Source of Truth (`Skripte/moodle_xml_builder.js`):**
   - Jedes finalisierte Quiz wird über ein dediziertes Node.js-Skript `Skripte/generate_moodle_xml_quiz_0X.js` generiert, das zwingend das zentrale Builder- und Validierungsmodul [`Skripte/moodle_xml_builder.js`](../../Skripte/moodle_xml_builder.js) (`exportMoodleQuiz({...})`) nutzt.
   - Keine losen Einzel-Altdateien (`Quiz_0X.md` / `.gift.txt`) parallel zu finalisierten XML-Tests im Ordner belassen.
2. **Inkrementelles Schreiben in 3 Chunks (gegen Stream-Timeouts):**
   - Da 10 Tests × 8 Fragen mit ausführlichem Feedback ca. 1.000–1.500 Zeilen umfassen, darf `generate_moodle_xml_quiz_0X.js` **niemals in einem einzigen monolithischen `write_file`-Aufruf** geschrieben werden, sondern zwingend in **3 Teilschritten**:
     1. `write_file`: Grundgerüst mit `Tests 01–03` (Vorbereitung).
     2. `edit_file`: `Tests 04–07` (Prüfung Teil 1).
     3. `edit_file`: `Tests 08–10` (Prüfung Teil 2) + Ausführung `node Skripte/generate_moodle_xml_quiz_0X.js`.
3. **Generierte Artefakte im jeweiligen Quiz-Ordner:**
   - `XML_Tests/Test_01_Vorbereitung.xml`–`Test_03_Vorbereitung.xml` (**3 Vorbereitungstests** zum unbegrenzten Üben)
   - `XML_Tests/Test_04_Pruefung.xml`–`Test_10_Pruefung.xml` (**7 Prüfungstests** für die Präsenzprüfung)
   - `Quiz_0X_Termin_YY_Alle_10_Tests_Master.xml` (Master-Importdatei) + `Uebersicht_10_Moodle_Tests.md` (menschenlesbarer Gesamtkatalog).

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
