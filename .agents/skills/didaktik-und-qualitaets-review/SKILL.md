---
name: didaktik-und-qualitaets-review
description: >-
  Vorlesungsübergreifendes 6-Dimensionen-Prüfraster für das inhaltliche, fachdidaktische,
  curriculare, visuelle und prüfungsmethodische Review von Vorlesungsfolien,
  SVG-Diagrammen, Übungsblättern, Programmier-Vorlagen und Moodle-Quizzes.
  IMMER aktivieren bei Qualitäts-Audits, Kapitel-Reviews oder vor einem Release/Merge.
---

# Skill: Ganzheitliches Didaktik-, Curriculum- & Qualitäts-Review

Während die automatisierten Linter (`npm run lint:*`) formale und geometrische Kriterien prüfen, deckt dieser vorlesungsübergreifende Review-Skill die **6 semantisch-didaktischen Qualitätsdimensionen** ab. Er dient insbesondere als Prüfleitfaden für unabhängige **Review-Subagenten (Vier-Augen-Prinzip)** in einer mehrstufigen Review-Edit-Schleife bis zum Erreichen von **0 Befunden**.

---

## Vorab-Pflichtschritt: Kurs-Kontext & Abhängigkeitsmatrix laden

Lies vor Beginn jedes Reviews im zentralen System- und Konzeptdokument der jeweiligen Lehrveranstaltung (`AGENTS.md` sowie `Konzept/01_*.md` und `Konzept/02_*.md`):
1. **Übergeordnete Kurs-Lernziele & Zielgruppen-Vorwissen** (Studiengang, Fachsemester, bereits gehörte Grundlagenmodule vs. typische Informatik-/Mathematik-Lücken).
2. **Kapitel-Abhängigkeits- & Fern-Schnittstellen-Matrix (Cross-Chapter Dependency Map):** Welche direkten Nachbarkapitel ($k-1$, $k+1$) **und** welche nicht-angrenzenden früheren oder späteren Kapitel ($m \neq k \pm 1$) sind fachlich, über Notationen oder über Code-/Datenformate mit der geprüften Einheit $k$ gekoppelt?
3. **Prüfungs- & Quiz-Cluster:** Welche Einheiten werden in welchem summativen Test gemeinsam geprüft?

---

## Dimension 1: Curriculare Einbettung & Zielgruppen-Passung

- **Prüffragen:**
  1. **Anknüpfung an das Studierenden-Profil:** Holt das Material die Studierenden bei ihrem laut Kurskonzept vorhandenen fachlichen Fundament ab, statt bekannte Grundlagen als „neu“ zu verkaufen oder umgekehrt unbekannte Konzepte unmotiviert vorauszusetzen?
  2. **Behutsames Scaffolding bei Neuerungen („Blick unter die Haube“):** Werden neue algorithmische, mathematische oder softwaretechnische Konzepte Schritt für Schritt aus dem Anwendungsproblem hergeleitet, statt als Blackbox vom Himmel zu fallen?
  3. **Beitrag zu den übergeordneten Kurs-Lernzielen:** Zahlt jeder Abschnitt erkennbar auf die übergeordneten Lernziele der Lehrveranstaltung ein?

---

## Dimension 2: Chronologische, Kausale & Horizontale Integrität (Makro-Dramaturgie)

- **Prüffragen:**
  1. **Realistisches Netto-Zeitbudget der Präsenzveranstaltung:**
     - Ziehe von der Gesamt-Präsenzzeit (z. B. 150 Min.) die festen Blöcke für Hausübungs-Showcase/Code-Defense (ca. 20 Min.), Pause (15 Min.) und ggf. Kurztest/Quiz zu Terminbeginn (ca. 15 Min.) ab.
     - Passt der Folienumfang realistisch in die verbleibende **Netto-Vorlesungszeit** (z. B. **40–48 Folien** für 100–115 Min. netto ohne Live-Coding im Hörsaal)?
  2. **Strikte Rückwärts-Kausalität am Terminbeginn:** Prüfen Showcase und Quiz zu Beginn von Termin $k$ ausschließlich den Stoff der vorangegangenen Termine $1 \dots k-1$ (niemals den Stoff von Termin $k$, der erst im Anschluss gelehrt wird)?
  3. **Kapitel-Brücke (`### Rückblick & Brücke: ...`):** Besitzt das Kapitel unmittelbar zu Beginn des ersten Abschnitts eine dedizierte Einstiegsfolie, die (a) an die Erkenntnisse/Hausübung der Vor-Termine anknüpft, (b) den konkreten Engpass der bisherigen Werkzeuge aufzeigt und (c) das heutige Thema in die Gesamtarchitektur des Semesters einordnet?
  4. **Vorgreif-Sperre:** Werden in Folien, Übungen oder Quizzes Konzepte, Bibliotheken oder Verfahren verwendet, die laut Syllabus erst in einem späteren Kapitel eingeführt werden?
  5. **Horizontale Nachbar- UND Fern-Schnittstellen-Prüfung (Cross-Chapter Consistency):**
     - **Lese-Pflicht:** Lies beim Review von Einheit $k$ nicht nur die Einheit selbst, sondern auch die Schnittstellen-Folien und Aufgabenblätter der **direkten Nachbarn ($k-1$, $k+1$)** sowie aller laut Kurs-Abhängigkeitsmatrix (`Konzept/01_*.md`) verknüpften **nicht-angrenzenden Kapitel ($m \ll k$ und $m \gg k$)** quer!
     - Stimmen mathematische Symbole, Variablennamen, Koordinatenkonventionen und Austausch-Datenformate (z. B. JSON-Schemata, Klassen-Interfaces) zwischen früheren Grundlagen-Kapiteln und späteren Vertiefungs-/Anwendungskapiteln zu 100 % überein?
     - Wird bei Rückgriffen auf frühere Termine ein expliziter **Callback** (*„Wie in Termin X hergeleitet...“*) und bei Grundlagen für spätere Termine ein gezieltes **Foreshadowing** (*„Dieses Modell lösen wir in Termin Y numerisch mit...“*) gesetzt?

---

## Dimension 3: Fachdidaktik, Storyline-Fluss & Einfache Erklärbarkeit (Mikro-Dramaturgie)

- **Prüffragen für jede Vorlesungssektion:**
  1. **Engpass-Motivation („Nichts fällt vom Himmel“):** Wird jedes neue Verfahren aus einem konkreten Problem oder dem Scheitern eines naiven Ansatzes motiviert?
  2. **3-Schritt-Rhythmus eingehalten:** Folgt die Sektion dem Dreiklang `1. Anwendungsbeispiel` $\to$ `2. Blick unter die Haube (Mathematik/Algorithmus)` $\to$ `3. Der Code`?
  3. **Konkrete Zahlen statt nackter $\mathcal{O}(\dots)$-Symbole:** Wird jede Komplexitäts-, Stabilitäts- oder Genauigkeitsaussage mit einem konkreten Zahlenbeispiel belegt?
  4. **Variablen-Konsistenz:** Stimmen alle Symbole zwischen Fließtext, LaTeX-Formel, SVG-Grafik und Code überein?
  5. **Explizite Konventions- & Schnittstellen-Brücken (Keine Vorwissen-Fallen):** Wird jeder Wechsel von Koordinatensystemen, Indizes, Winkel-Referenzachsen oder Bibliotheks-Konventionen (z. B. Links- vs. Rechtshändig, Spalten- vs. Zeilenvektoren, 2D-Index vs. 1D-Speicher-Offset, Vollmatrix vs. reduzierte Teilmatrix) direkt auf der Folie mit einer anschaulichen 1-Satz-Eselsbrücke erklärt?
  6. **„Was-passiert-wenn-nicht?“-Motivation (Counterfactual Scaffolding):** Wird jede Schutzmaßnahme, Initialisierung oder numerische Korrektur über den konkreten Fehlerfall beim Weglassen (*„Ohne X passiert konkreter Fehler Y $\implies$ deshalb brauchen wir X!“*) erklärt?
  7. **Kognitive Entlastung bei Vorlagen-Interna:** Steht in Codeblöcken maximal ein Befehl pro Zeile (keine Semikolon-Ketten), und sind komplexe Hilfsmethoden, die in der Vorlage bereits fertig mitgeliefert werden, im Folientitel klar als `*(Deep Dive – fertig in der Vorlage)*` gekennzeichnet?

---

## Dimension 4: Visuelle & Gestalterische Evidenz (Folien & SVGs)

- **Prüffragen:**
  1. **Kein räumlicher oder algorithmischer Mechanismus ohne visuelles mentales Modell (Kontrast-SVG):** Werden räumliche Transformationen, Vektorzerlegungen, Speicherlayouts oder Algorithmusschritte durch maßgeschneiderte SVGs illustriert (bevorzugt als **visueller Direktvergleich: Naiv/Falsch vs. Richtig** mit konkreten Zahlenwerten), statt als reine Text-/Formelwüste dazustehen?
  2. **Spaltengewichtung, Layout-Balance & Anhang-Folien:** Sind die Flex-Gewichte (`one` bis `six`) passend zum Platzbedarf von Text/Code vs. Grafik gewählt? Bestehen neben `Folien.md` auch optionale Anhang-Foliensätze (`Folien_Anhang_*.md`) die DOM-Layoutprüfung (`node Skripte/lint_slides_dom.js <Pfad> --skip-schema`) mit 0 Fehlern und ohne verwaiste oder leerzeichenbehaftete SVGs im Ordner `Diagramme/`?

---

## Dimension 5: Übungsdesign, Forensischer Code-Walkthrough & Vibe-Coding-Resilienz

- **Prüffragen:**
  1. **Zweistufige Hausübung ohne Bruch (`Stufe 1` $\to$ `Stufe 2`):** Bauen in Stufe 2 beide Wahl-Tracks (**Track A: Industrie** und **Track B: Simulation Game**) direkt auf dem Code von **Stufe 1** (`Vorlage/...`) auf? Werden Stufen konsequent mit Ziffern (`Stufe 1`, `Stufe 2` = Nacheinander/UND) und Tracks mit Buchstaben (`Track A`, `Track B` = Auswahl/ODER) bezeichnet?
  2. **Symmetrie ohne Redundanz:** Sind die Teilaufgaben in Stufe 1 synchron als `1. Aufgabe 1.1` bis `4. Aufgabe 1.4` nummeriert (mit unnummeriertem Vorbereitungs-Hinweis davor), und haben Track A (`A.1`–`A.4`) sowie Track B (`B.1`–`B.4`) exakt gleich viele Arbeitspakete und Punkte (10 Pkt.) bei klar getrennten fachlichen Schwerpunkten?
  3. **Forensischer „End-to-End Student Implementation Walkthrough“:** Wurde jede Teilaufgabe (`1.1`–`1.4`, `A.1`–`A.4`, `B.1`–`B.4`) Zeile für Zeile gegen den echten Starter-Code in `Vorlage/` durchgespielt (Methoden-Signaturen, `TODO`-Blöcke für Stufe 1, Track A und Track B, lokale Ursprünge/Skalierungen von Hilfsmethoden, Zustandsbereinigung bei Strukturänderungen sowie UI-Event-Fallstricke wie Fokus-Diebstahl durch Steuerelemente)?
  4. **„Golden Reference Numbers“ (5-Sekunden-Selbsttest) & aktive Unit-Tests (`Aufgabe 1.4`):** Nennen alle Berechnungsaufgaben in Stufe 1 konkrete Test-Eingabewerte und das exakt erwartete numerische Ergebnis direkt im Aufgabenblatt, und enthält das Testprojekt (`Vorlage/Tests/`) einen vorbereiteten Unit-Test, mit dem die Studierenden in `Aufgabe 1.4` ihre eigene Stufe-1-Implementierung auf Grün bringen?
  5. **Vollständige 6-Punkte-Synchronisation:** Stimmen Aufgabenblatt (+ PDF), Programmier-Vorlage, Hausübungs-Folie am Ende von Kapitel $k$, Showcase-Folie am Anfang von Kapitel $k+1$, Konzeptdokumente (`Konzept/01_*.md`, `02_*.md`) und Moodle-Termintexte (`Moodle/Moodle_Kursstruktur_und_Termintexte.md` – ohne LaTeX `$...$` und ohne Backticks) zu 100 % überein?

---

## Dimension 6: Prüfungs- & Quiz-Psychometrie (`Moodle/Quiz_*`)

- **Prüffragen:**
  1. **Strikte Rückwärts-Kausalität & 10-Varianten-Moodle-XML-Architektur (`Test_01_Vorbereitung`–`Test_03_Vorbereitung` + `Test_04_Pruefung`–`Test_10_Pruefung`):** Prüft das Quiz ausschließlich die laut Kurskonzept abgeschlossenen Vor-Kapitel? Werden über das Generator-Skript exakt 10 Varianten (`XML_Tests/Test_01..10.xml`), die Master-XML und `Uebersicht_10_Moodle_Tests.md` ohne konkurrierende Einzel-Altdateien generiert? Variieren die Prüfungs-Varianten (`04`–`10`) gegenüber den Vorbereitungs-Varianten (`01`–`03`) auch die Fragerichtung / gesuchte Größe (statt bloßem Zahlen-Tausch)?
  2. **Zeitbudget, voller Moodle-Fragetypen-Mix (100 % Auto-Grading) & Feedback-Tiefe (15 Min. / 8 Fragen / 10 Pkt.):** Nutzt jede Variante den vollen Mix aus nativen, vollautomatisch korrigierten Moodle-XML-Fragetypen (`numerical` mit 50-%-Teilpunkten für Einheiten-/Vorzeichenfallen, `cloze` für mehrstufige Rechnungen mit Zwischenschritt-Teilpunkten, `gapselect` für Inline-Code-Lücken, `ddwtos` für Pipeline-Reihenfolgen, `matching` mit Überhang-Distraktoren sowie `multichoice` Single-Choice & Multiple-Select)? Besitzt jede Antwortoption ihr eigenes spezifisches `<feedback>` sowie ein vollständiges `<generalfeedback>`?
  3. **Kein Längen- oder Absurditäts-Bias:** Sind alle 4 Antwortoptionen (A–D) gleich lang (max. $\pm 25\,\%$ Abweichung) und frei von Scherzantworten? Bilden alle Falschantworten reale Ingenieurs-/Programmierfehler ab?
  4. **Keine Formeln im Fragetext verraten:** Müssen die Studierenden die Grundformeln und Zwischenschritte selbst aufstellen, statt sie aus dem Fragetext abzulesen?
