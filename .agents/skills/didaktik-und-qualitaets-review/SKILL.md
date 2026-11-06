---
name: didaktik-und-qualitaets-review
description: >-
  Ganzheitliches 6-Dimensionen-Prüfraster für das inhaltliche, fachdidaktische,
  curriculare, visuelle und prüfungsmethodische Review von Vorlesungsfolien,
  SVG-Diagrammen, Übungsblättern und Moodle-Quizzes. IMMER aktivieren bei
  Qualitäts-Audits, Kapitel-Reviews oder vor einem Release/Merge.
---

# Skill: Ganzheitliches Didaktik-, Curriculum- & Qualitäts-Review

Während die automatisierten Linter (`npm run lint:*`) formale und geometrische Kriterien prüfen, deckt dieser Review-Skill die **6 semantisch-didaktischen Qualitätsdimensionen** ab. Er dient insbesondere als Prüfleitfaden für unabhängige **Review-Subagenten (Vier-Augen-Prinzip)** vor dem Abschluss eines Kapitels oder Termins.

---

## Dimension 1: Curriculare Einbettung & Studierenden-Profil (5. Sem. AT, Campus Wels)

Die Studierenden befinden sich im **5. Fachsemester Bachelor Automatisierungstechnik** (Engineering Science) an der FH Oberösterreich, Campus Wels:
- **Vorhandenes Fundament (Semester 1–4) – gezielt anknüpfen, nicht unterfordern:**
  - *Mathematik I/II & Statistik:* Analysis, Differentialgleichungen, Matrizenrechnung, Wahrscheinlichkeitsrechnung.
  - *Mechanik I/II:* Technische Mechanik (Statik/Freischnitt, Elastostatik, Kinematik, Kinetik / Newton-Euler).
  - *Elektrotechnik, Elektrische Antriebe & Messtechnik:* Maschen-/Knotensätze, DC-/AC-Antriebe, Sensorik, Abtastung.
  - *Regelungstechnik 1 & Steuerungstechnik:* Lineare Übertragungsglieder, PID-Regler, Zustandsraum, Stabilität, SPS-Programmierung nach IEC 61131-3.
  - *Robotik & Modellbildung / Machine Vision:* Koordinatensysteme, Vorwärtskinematik, Bildraster-Grundlagen.
  - *Grundlagen Informatik / Softwareentwicklung:* Prozedurale und objektorientierte Grundlagen (C/C++/C#).
- **Typische Lücken – behutsam aufbauen (Scaffolding & „Blick unter die Haube“):**
  - Hardwarenahe Speicherverwaltung in .NET (`unsafe` Pointer, Stride-Padding, Cache-Lines, Garbage-Collector-Druck, Heap vs. Stack).
  - Moderne UI- & Grafik-Architektur (WPF Visual Tree vs. `DrawingVisual` vs. `WriteableBitmap`, OpenGL Matrix-Stack, MVVM-Entkopplung).
  - Parallele Programmierung (Task Parallel Library, Race Conditions, `Interlocked` vs. `lock`, False Sharing).
  - Numerische Fallstricke in der Umsetzung (Gleitkomma-Auslöschung, Von-Neumann-/CFL-Stabilitätsgrenzen, Butcher-Tableaus, Zero-Crossing-Bisektion).
- **Prüffragen:**
  1. Holt das Material die Studierenden bei ihrem mechatronischen/regelungstechnischen Vorwissen ab, statt ihnen bekannte Ingenieursgrundlagen als „neu“ zu verkaufen?
  2. Werden die informatischen/numerischen Neuerungen Schritt für Schritt hergeleitet, statt als Blackbox vom Himmel zu fallen?

---

## Dimension 2: Chronologische & Kausale Integrität (Makro-Dramaturgie T01–T10)

- **Ablauf eines 150-Minuten-Präsenztermins (Realistisches Zeitbudget & 40-40-20-Bewertungsmodell):**
  - Zu Beginn (ab T02): **Live-Showcase & Code-Defense (Säule 2b, 20 %)** der Hausübung der Vorwoche (1× Track A, 1× Track B am Beamer + Code-Erklärung & Parameter-Stresstest durch den Dozenten, ca. 20 min; keine separate Plenumsfragen-Note).
  - An T03, T05, T08, T10 zusätzlich zu Beginn: **Moodle-Quiz (Säule 1, 40 % = 4 × 10 %)** (15 min).
  - Hauptteil (110–125 min): **Interaktive Vorlesung anhand der Folien** (Konzept, Mathematik, Zahlenbeispiele, SVG-Diagramme und Besprechung der abgedruckten C#-Code-Snippets – **kein Live-Coding** und **keine Programmierphase im Hörsaal**).
  - **Hausübung (Säule 2a: 40 % C#-Code-Portfolio = 10 × 4 %, 5,0 h Selbststudium/Woche):** Sowohl **Stufe 1 (Basisaufgabe auf der C#-Vorlage, Teilaufgaben `1.1`–`1.4`)** als auch **Stufe 2 (Vertiefungsaufgabe im Wahlmodell: Track A `A.1`–`A.4` ODER Track B `B.1`–`B.4`)** sind verpflichtende Teile der Hausübung und werden vollständig zu Hause bearbeitet (Ziffern `1`/`2` = Nacheinander/UND; Buchstaben `A`/`B` = Auswahl/ODER).
- **Prüffragen:**
  1. **Strikte Rückwärts-Kausalität am Terminbeginn:** Prüfen Showcase und Moodle-Quiz zu Beginn von Termin $k$ ausschließlich den Stoff der vorangegangenen Termine $1 \dots k-1$ (Q1: Kap. 00–02, Q2: Kap. 03–04, Q3: Kap. 05–07, Q4: Kap. 08–09)?
  2. **Kapitel-Brücke & Einordnung ins große Ganze (`### Rückblick & Brücke: ...`):** Besitzt jedes Kapitel (`01` bis `10`) unmittelbar zu Beginn von Abschnitt `N.1` (nach Showcase und Abschnitts-Opener) eine dedizierte Einstiegsfolie `### Rückblick & Brücke: ...`, die (a) an die Erkenntnisse/Hausübung des Vor-Termins anknüpft, (b) den konkreten Engpass der bisherigen Werkzeuge aufzeigt und (c) das heutige Thema in die Gesamtarchitektur des Kurses (Visualisierung T02–T05 $\to$ Multithreading T06 $\to$ Modellierung T07–T10) einordnet?
  3. **Vorgreif-Sperre:** Werden in Folien, Übungen oder Quizzes Konzepte verwendet, die erst in einem späteren Kapitel eingeführt werden?
  4. **Schnittstellen-Kontinuität:** Passen aufeinander aufbauende Termine technisch nahtlos zusammen (z. B. T03 Geometrie-JSON $\to$ T07 Cholesky-FEM)?

---

## Dimension 3: Fachdidaktik & Storyline-Fluss (Mikro-Dramaturgie)

- **Prüffragen für jede Vorlesungssektion:**
  1. **Engpass-Motivation („Nichts fällt vom Himmel“):** Wird jedes neue Verfahren aus einem konkreten Problem oder dem Scheitern eines naiven Ansatzes motiviert (z. B. Ringpuffer verwirft Historie $\to$ wie trotzdem globales $\mu, \sigma$ berechnen? $\to$ Welford)?
  2. **3-Schritt-Rhythmus eingehalten:** Folgt die Sektion dem Dreiklang `1. Anwendungsbeispiel` $\to$ `2. Blick unter die Haube (Mathematik/Algorithmus)` $\to$ `3. Der C#-Code`?
  3. **Konkrete Zahlen statt nackter $\mathcal{O}(\dots)$-Symbole:** Wird jede Komplexitäts- oder Stabilitätsaussage mit einem konkreten Zahlenbeispiel belegt?
  4. **Variablen-Konsistenz:** Stimmen alle Symbole zwischen Fließtext, LaTeX-Formel, SVG-Grafik und C#-Code überein?

---

## Dimension 4: Visuelle & Gestalterische Evidenz (Folien & SVGs)

- **Prüffragen:**
  1. **Selbsterklärungskraft:** Zeigt jedes SVG-Diagramm den fachlichen Kontrast (z. B. Soll vs. Ist, stabil vs. instabil, $\mathcal{O}(N)$ vs. $\mathcal{O}(W)$) visuell und mit konkreten Zahlenwerten, statt nur leere Boxen zu stapeln?
  2. **Spaltengewichtung & Layout-Balance:** Sind die Flex-Gewichte (`one` bis `six`) passend zum Platzbedarf von Text/Code vs. Grafik gewählt?

---

## Dimension 5: Übungsdesign & Vibe-Coding-Resilienz

- **Prüffragen:**
  1. **Zweistufige Hausübung ohne Bruch (`Stufe 1` $\to$ `Stufe 2`):** Bauen in Stufe 2 beide Tracks (Track A und Track B) direkt auf dem Code von Stufe 1 (`Vorlage/...sln`) auf? Werden Stufen konsequent mit Ziffern (`Stufe 1`, `Stufe 2`) und Tracks mit Buchstaben (`Track A`, `Track B`) bezeichnet?
  2. **Symmetrie ohne Redundanz:** Haben Track A (Industrie) und Track B (Game) exakt gleich viele Arbeitspakete (4 APs, 10 Punkte), aber klar getrennte fachliche Schwerpunkte ohne 80-%-Überschneidung?
  3. **Schutz gegen KI-Scheinsimulation:** Prüfen die mitgelieferten Unit-Tests (`dotnet test`) echte physikalisch-numerische Invarianten und analytische Grenzfälle?

---

## Dimension 6: Prüfungs- & Quiz-Psychometrie (`Moodle/Quiz_01` bis `Quiz_04`)

- **Prüffragen:**
  1. **10-Varianten-Moodle-XML-Architektur (`Test_01_Vorbereitung`–`Test_03_Vorbereitung` + `Test_04_Pruefung`–`Test_10_Pruefung`):** Werden für jedes finalisierte Quiz über `Skripte/generate_moodle_xml_quiz_0X.js` exakt 10 Varianten (`XML_Tests/Test_01..10.xml`), die Master-XML und `Uebersicht_10_Moodle_Tests.md` ohne konkurrierende Einzel-Altdateien generiert? Variieren die Prüfungs-Varianten (`04`–`10`) gegenüber den Vorbereitungs-Varianten (`01`–`03`) auch die Fragerichtung / gesuchte Größe (statt bloßem Zahlen-Tausch)?
  2. **Zeitbudget, voller Moodle-Fragetypen-Mix (100 % Auto-Grading) & Feedback-Tiefe (15 Min. / 8 Fragen / 10 Pkt.):** Nutzt jede der 10 Varianten den vollen Mix aus nativen, vollautomatisch korrigierten Moodle-XML-Fragetypen (`numerical` mit 50-%-Teilpunkten für Einheiten-/Vorzeichenfallen, `cloze` für mehrstufige Rechnungen mit Zwischenschritt-Teilpunkten, `gapselect` für Inline-C#-Code-Lücken, `ddwtos` für Pipeline-Reihenfolgen, `matching` mit Überhang-Distraktoren sowie `multichoice` Single-Choice & Multiple-Select)? Besitzt jede Antwortoption ihr eigenes spezifisches `<feedback>` (Warum richtig / welcher konkrete Denkfehler bei falsch) sowie ein vollständiges `<generalfeedback>`?
  3. **Kein Längen- oder Absurditäts-Bias:** Sind alle 4 Antwortoptionen (A–D) gleich lang (max. $\pm 25\,\%$ Abweichung) und frei von Scherzantworten? Bilden alle Falschantworten reale Ingenieurs-/Programmierfehler ab?
  4. **Keine Formeln im Fragetext verraten:** Müssen die Studierenden die Grundformeln und Zwischenschritte selbst aufstellen, statt sie aus dem Fragetext abzulesen?
