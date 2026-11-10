---
name: lehrkonzept-und-didaktik
description: >-
  Vorlesungsübergreifende Methodik für Curriculum-Design, Lernziele (Constructive Alignment),
  Studierenden-Motivation, Anspruchsniveau (Low Floor, High Ceiling), Lernfortschrittskontrolle,
  Kapitel-Abhängigkeitsmatrix und Pflege der Konzept- und Moodle-Kursdokumente
  (Konzept/*.md, Moodle/Moodle_Kursstruktur_und_Termintexte.md).
  IMMER aktivieren, wenn Konzeptdokumente, Kursstruktur, Kapitel-Querbezüge oder didaktische Grundsätze geplant oder geändert werden.
---

# Skill: Lehrkonzept, Curriculum-Architektur & Fachdidaktik

Dieser vorlesungsübergreifende Grundlagen-Skill regelt die Makro-Konzeption einer Lehrveranstaltung, die Pflege der Single-Source-of-Truth-Konzeptdokumente (`Konzept/01_*.md`, `02_*.md`, `03_*.md`) sowie der Moodle-Kursübersicht (`Moodle/Moodle_Kursstruktur_und_Termintexte.md`).

---

## 1. Rollenverteilung der Konzept-Dokumente (Single Source of Truth)

Um Redundanz und Widersprüche auszuschließen, besitzt jedes der drei Konzeptdokumente unter `Konzept/` eine klar abgegrenzte Aufgabe:
1. **`Konzept/01_Lehrkonzept_und_Syllabus.md`:**
   - Zielgruppenprofil (Vorwissen vs. Lücken), übergeordnete Kurs-Lernziele (ILOs), ECTS-Workload, Präsenz-Taktung (ohne Live-Coding im Hörsaal), **Semester-Übersichtsmatrix**, **Kapitel-Abhängigkeits- & Fern-Schnittstellen-Matrix** sowie kompakte Vorlesungs-Steckbriefe mit Bloom-Lernzielen.
2. **`Konzept/02_Uebungskatalog.md`:**
   - Detailkatalog der wöchentlichen zweistufigen Hausübungen (`Stufe 1: 1.1–1.4` + `Stufe 2: Track A | Track B`, ohne separates Abschlussprojekt), Goldene Architektur-Regel und Leitfragen für den Live-Showcase.
3. **`Konzept/03_Beurteilung_und_Lernfortschritt.md`:**
   - 5-stufige Lernfortschrittskontrolle, 2-Säulen-Benotungsmodell (40 % Quiz / 40 % wöchentliche Hausübungen / 20 % Showcase), einheitlicher Notenschlüssel, 4-Stufen-Stresstest gegen Schein-Simulationen und AI Honor Code.

---

## 2. Lernziele & Überwachung des Lernfortschritts (*Constructive Alignment*)

### 2.1 Dreistufige Bloom-Lernziel-Kaskade pro Einheit
Jede Einheit definiert explizite Lernziele auf drei steigenden Stufen, die direkt mit den Lehr- und Prüfungsformaten gekoppelt sind:
1. **Verstehen & Analysieren** *(Konzept, Geometrie, Stabilitätsgrenze)* $\longleftrightarrow$ **Vorlesungsfolien & Moodle-Quiz / Code-Defense-Leitfragen**.
2. **Anwenden** *(Grundalgorithmus & API am Kernsystem)* $\longleftrightarrow$ **Hausübung Stufe 1 (Basisaufgabe `1.1`–`1.4` auf der Vorlage + Unit-Tests)**.
3. **Erschaffen & Evaluieren** *(Reale Nichtlinearitäten, Grenzfälle, Systemintegration)* $\longleftrightarrow$ **Hausübung Stufe 2 (`Track A` / `Track B`) + Live-Parameter-Stresstest am Beamer**.

### 2.2 Die 5-stufige Kaskade zur Lernfortschrittskontrolle (Formativ $\to$ Summativ)
1. **Stufe 1 – 5-Sekunden-Selbstkontrolle beim Programmieren (Formativ):** *Golden Reference Numbers* im Aufgabenblatt liefern zu jeder Formel sofort das erwartete numerische Kontrollergebnis.
2. **Stufe 2 – Automatisierte Unit-Test-Verifikation zu Hause (Formativ):** `dotnet test` in `Vorlage/Tests/` (inkl. des eigenen Unit-Tests in `Aufgabe 1.4`) sichert die Lösung vor Abgabe ab.
3. **Stufe 3 – Unbegrenzte Moodle-Vorbereitungstests (Formativ):** 3 Übungsvarianten (`Test_01`–`Test_03`) mit Schritt-für-Schritt-Musterlösung im Feedback vor jedem Prüfungs-Quiz.
4. **Stufe 4 – Live-Showcase, Code-Defense & Ad-hoc-Parameter-Stresstest am Beamer (Summativ, 20 %):** Rotierende Vorführung (je 1× Track A, 1× Track B), Code-Befragung (*„Warum genau diese Zeile?“*) und spontane Parameter-Modifikation live im Quellcode (entlarvt unverstandenen KI-Code und Schein-Animationen sofort).
5. **Stufe 5 – Summative Moodle-Prüfungstests (40 %) & Code-Portfolio (40 %):** 4 Auto-Grading-Quizzes (`Test_04`–`Test_10`) mit invertierter Fragerichtung + 10 wöchentliche Portfolio-Abgaben.

---

## 3. Studierenden-Motivation, Abwechslung & Anspruchsniveau

### 3.1 Motivation & Faszination („Interessant, abwechslungsreich & lehrreich“)
1. **Autonomie durch das Wahlmodell („Pick your Track: Industrie vs. Simulation Game“):**
   - In Stufe 2 wählt jedes Team frei zwischen einer **realen Industrieanlage (Track A)** und einem **interaktiven Simulationsspiel (Track B)** bei identischem mathematischem Kern.
   - Im **Cross-Track-Showcase** zu Beginn des Folgetermins sieht das Plenum beide Welten und erlebt, dass hinter Industrie-Zwilling und Game-Engine exakt dieselbe Mathematik arbeitet.
2. **Wöchentlicher Domänenwechsel:**
   - Jede Einheit eröffnet eine eigenständige physikalisch-technische Erlebniswelt (keine monoton wiederholten Beispielszenarien).
3. **Unmittelbares visuelles Feedback & „Kontrollierter Crash“:**
   - Jeder Algorithmus erzeugt ein direkt sichtbares Verhalten – inklusive des bewussten *„Was-passiert-wenn-nicht?“*-Effekts (sichtbare Instabilität, Verzerrung oder Übersteuerung beim Weglassen einer Schutzmaßnahme).

### 3.2 Anspruchsniveau: „Low Floor, High Ceiling“ (Fordernd ohne Frustration)
- **Low Floor (Frustfreier Einstieg):** Die Projektvorlage (`Vorlage/`) nimmt reines UI-Boilerplate ab; Folien erklären Konventionswechsel explizit; **Stufe 1 (`1.1`–`1.4`)** führt in ~60 Minuten verlässlich zu einem lauffähigen Grundsystem mit grünen Unit-Tests.
- **High Ceiling (Echter Ingenieur-Anspruch):**
  - **Verbot von Blackbox-/Schein-Simulationen:** Kerngleichungen, Transformationen und Solver müssen selbst implementiert werden (K.O.-Kriterium in `Konzept/03_*.md`).
  - **Reale Ingenieur-Kriterien in Stufe 2:** Physikalische Randeffekte, Allokationsfreiheit (0 Byte GC-Druck in der Schleife), Thread-Sicherheit und numerische Stabilität.

---

## 4. Semester-Vernetzungsmatrix & Übergreifende Mikro-Didaktik

### 4.1 Kapitel-Abhängigkeits- & Fern-Schnittstellen-Matrix (`Konzept/01_*.md`)
- Jede Einheit ist in `Konzept/01_*.md` über **direkte Nachbar-Brücken ($k-1, k+1$)** und **nicht-angrenzende Fern-Brücken ($m \neq k \pm 1$)** vernetzt.
- **Strikte Vorgreif-Sperre:** Keine Einheit darf Konzepte oder Bibliotheken aus späteren Kapiteln ($> k$) voraussetzen.
- **Notations- & Schnittstellen-Kontinuität:** Gekoppelte Kapitel verwenden exakt dieselben mathematischen Symbole, Koordinatenkonventionen und Austauschformate (z. B. JSON-Schemata), verbunden durch explizite *Callbacks* und *Foreshadowings*.

### 4.2 Die 5 Grundregeln verständlicher Erklär-Didaktik
1. **3-Schritt-Rhythmus (Visual First):** `1. Anwendungsbeispiel (Fertiges Bild & Nutzen)` $\to$ `2. Blick unter die Haube (Herleitung & Kontrast-SVG)` $\to$ `3. Der Code`.
2. **Problem-Lösungs-Brücke („Nichts fällt vom Himmel“):** Jedes neue Konzept startet beim konkreten Engpass der vorherigen Folie bzw. des vorigen Termins.
3. **Konkrete Zahlen statt nackter $\mathcal{O}(\dots)$-Symbole:** Jede Komplexitäts-, Speicher- oder Genauigkeitsaussage wird an einem konkreten Zahlenbeispiel vorgerechnet.
4. **Explizite Konventions-Brücken:** Jeder Wechsel von Koordinatensystemen, Achsenrichtungen, Indizes oder Matrix-Reihenfolgen zwischen Lehrbuch, Bibliothek und Hardware wird mit einer anschaulichen 1-Satz-Eselsbrücke erklärt.
5. **„Was-passiert-wenn-nicht?“-Motivation:** Jede Schutzmaßnahme wird über den konkreten Fehlerfall beim Weglassen motiviert.

---

## 5. Verbindliche 6-Punkte-Synchronisation & Moodle-Termintext-Regeln

Bei jeder inhaltlichen Änderung an einer Einheit `XX` müssen **alle 6 Orte** synchron gehalten werden:
1. `Uebungen/Termin_XX_*/Aufgabenblatt.md` (+ `npm run export:pdf:uebung:XX`)
2. `Uebungen/Termin_XX_*/Vorlage/` (`TODO`-Blöcke & Unit-Tests `dotnet test`)
3. `Folien/XX_*/Folien.md` (Letzte Folie `### Hausübung Termin XX` + `lint:slides:XX` & `export:pdf:XX`)
4. `Folien/[XX+1]_*/Folien.md` (Folie 2 `### Live-Showcase & Code-Defense: Termin XX` + `lint:slides:[XX+1]` & `export:pdf:[XX+1]`)
5. `Konzept/01_*.md` & `Konzept/02_*.md` (Übersichtstabelle, Abhängigkeitsmatrix, Steckbrief & Übungskatalog)
6. `Moodle/Moodle_Kursstruktur_und_Termintexte.md`:
   - **STRIKTES FORMATIERUNGSVERBOT:** In `Moodle/Moodle_Kursstruktur_und_Termintexte.md` dürfen **KEINE LaTeX-Formeln (`$...$`)** und **KEINE Inline-Code-Backticks (`` `...` ``)** verwendet werden (nur reiner Fließtext, da der Text als HTML nach Moodle kopiert wird). Nach dem Editieren mit `git diff` prüfen, dass der richtige Termin getroffen wurde.
