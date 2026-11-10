---
name: uebungsaufgaben-und-moodle
description: >-
  Vorlesungsübergreifende Regeln für den Aufbau, die Symmetrie, den Code-Walkthrough
  und die Synchronisation von Übungsblättern (Uebungen/Termin_XX_*/Aufgabenblatt.md),
  Programmier-Vorlagen (Vorlage/**), Konzeptdokumenten (Konzept/*.md), Moodle-Termintexten
  (Moodle/Moodle_Kursstruktur_und_Termintexte.md) sowie Moodle-Quizzes (Moodle/Quiz_0X_*/**).
  IMMER aktivieren, wenn Übungsaufgaben, Vorlagen, Moodle-Texte oder Moodle-Quizzes bearbeitet werden.
---

# Skill: Übungsaufgaben, Programmier-Vorlagen, Moodle-Synchronisation & Quizzes

Dieser vorlesungsübergreifende Skill regelt den didaktischen und strukturellen Aufbau der Übungseinheiten (`Uebungen/Termin_XX_...`), der zugehörigen Programmier-Vorlagen (`Vorlage/`), der summativen Moodle-Quizzes (`Moodle/Quiz_0X_...`) sowie deren Synchronisation mit den Vorlesungsfolien, Konzeptdokumenten (`Konzept/01_*.md`, `02_*.md`) und Moodle-Termintexten. Kursspezifische Themen, Kapitel-Abhängigkeiten und Quiz-Zeitpunkte sind im jeweiligen Kurskonzept (`Konzept/01_*.md`) definiert.

---

## 1. Struktur & Symmetrie der Übungsblätter (`Aufgabenblatt.md`)

Die gesamte Programmierarbeit (**Stufe 1 + Stufe 2**) findet **als zweistufige Hausübung zu Hause im 2er-Team** statt (in der Präsenzveranstaltung gibt es **kein Live-Coding** und **keinen In-Class-Programmiersprint**, da die Präsenzzeit durch Showcase/Code-Defense, Moodle-Quiz und die interaktive Vorlesung vollständig ausgefüllt ist).

> **WICHTIGE BEZEICHNUNGS-REGEL (Ziffern für Stufen, Buchstaben für Tracks!):**
> Um jede Verwechslung zwischen der zeitlichen Reihenfolge (beide Stufen verpflichtend!) und der Track-Wahl (nur ein Track zu wählen!) auszuschließen, werden **Stufen immer mit Ziffern (`Stufe 1`, `Stufe 2`)** und **Tracks immer mit Buchstaben (`Track A`, `Track B`)** bezeichnet:
> - **Ziffern (`Stufe 1` $\to$ `Stufe 2`) = Nacheinander (Stufe 1 UND Stufe 2 sind Pflicht!)**
> - **Buchstaben (`Track A` | `Track B`) = Auswahl innerhalb von Stufe 2 (Track A ODER Track B!)**

### 1.1 Stufe 1: Basisaufgabe (Gemeinsames Fundament mit Unit-Tests, Teilaufgaben `1.1` bis `1.4`)
- Alle Studierenden starten zu Hause auf Basis der bereitgestellten Projektvorlage (`Uebungen/Termin_XX_.../Vorlage/...`) inklusive automatisierter Unit-Tests (`dotnet test`).
- **Stufe 1** umfasst 4 präzise geführte Teilaufgaben (**`Aufgabe 1.1` bis `Aufgabe 1.4`**, ca. 60 Minuten Bearbeitungszeit zu Hause), die die Kernmechanik der aktuellen Vorlesung am lauffähigen Code verankern.
- **Wichtig:** Das Ergebnis von **Stufe 1** ist das **direkte technische Fundament für BEIDE Ausbau-Tracks in Stufe 2**!
- **Pflicht zum „End-to-End Student Implementation Walkthrough“ & 5-Sekunden-Selbsttest:**
  1. **Synchrone 4er-Nummerierung (`1. Aufgabe 1.1` bis `4. Aufgabe 1.4`):** Ein allgemeiner Punkt *„Vorbereitung – Starter-Kit untersuchen“* steht als unnummerierter Absatz vor der Liste, damit Listen-Ziffer und Aufgabennummer (`1. Aufgabe 1.1` ... `4. Aufgabe 1.4`) exakt synchron zu den 4 Arbeitspaketen in Stufe 2 (`A.1`–`A.4` / `B.1`–`B.4`) laufen.
  2. **Forensischer Code-Walkthrough gegen `Vorlage/`:** Jede Teilaufgabe in Stufe 1 und Stufe 2 muss Zeile für Zeile gegen den echten Starter-Code in `Vorlage/` durchgespielt werden: Sind alle benötigten Methoden-Stubs vorhanden? Gibt es versteckte Geometrie-/Einheiten-Konventionen von Hilfsmethoden (z. B. Einheitskörper ohne Größenparameter, Zurücksetzen lokaler Offsets beim Umhängen von Knoten) oder UI-Event-Fallstricke (z. B. Steuerelemente wie `Slider`/`Button`, die Pfeil-/Leertasten abfangen $\implies$ Hinweis auf `PreviewKeyDown` mit `e.Handled = true` bzw. sauberes `else if` bei Maustasten)?
  3. **„Golden Reference Numbers“ (5-Sekunden-Selbsttest im Aufgabenblatt):** Jede Teilaufgabe mit einer Formel-, Abstands-, Matrix- oder Solver-Berechnung muss im Aufgabenblatt **konkrete Test-Eingabewerte und das exakt erwartete numerische Ergebnis** nennen (z. B. *„Selbsttest-Tipp: Bei Eingabe $X$ ergibt sich exakt $Y = \dots$“*), damit Studierende ihre Lösung sofort ohne Rückwärtsrechnen selbst verifizieren können.
  4. **Aktive Unit-Test-Prüfung in `Aufgabe 1.4`:** Das Testprojekt (`Vorlage/Tests/`) darf nicht ausschließlich fertigen Vorlagen-Code prüfen, sondern muss einen vorbereiteten Unit-Test enthalten, mit dem die Studierenden in `Aufgabe 1.4` ihre eigene Stufe-1-Implementierung via `dotnet test` verifizieren.

### 1.2 Stufe 2: Vertiefungsaufgabe (Wahlmodell: Track A ODER Track B)
Für das Wahlmodell in **Stufe 2** gelten vier eiserne Regeln:
1. **Genau 1 Track A (Industrie & Technik, Arbeitspakete `A.1`–`A.4`) und genau 1 Track B (Simulation Game, Arbeitspakete `B.1`–`B.4`):**
   - Niemals Unter-Optionen wie `Option B.1 ODER Option B.2` aufmachen! Jeder Track ist eine einzige, klar spezifizierte Aufgabe.
2. **Beide Tracks müssen direkt auf Stufe 1 (`Vorlage/...`) aufbauen:**
   - Weder Track A noch Track B darf verlangen, dass die Studierenden den Code aus Stufe 1 verwerfen und auf der grünen Wiese neu beginnen.
   - In der Code-Vorlage (`MainWindow.xaml.cs` bzw. `Program.cs`) müssen für Stufe 1 (`// TODO [Stufe 1 - Aufgabe 1.X]: ...`) sowie für **beide** Tracks in Stufe 2 (`// TODO [Stufe 2 - Track A]: ...` und `// TODO [Stufe 2 - Track B]: ...`) klare Kommentarblöcke vorhanden sein.
   - **UI-Kontext & Methodennamen in den Vorlagen:** Wenn in einer Oberfläche oder einem Menü zwischen der Basisaufgabe und den Vertiefungstracks umgeschaltet wird, müssen Track A und Track B **immer explizit in den Kontext von Stufe 2** gesetzt werden (z. B. `Stufe 1: ...` vs. `Stufe 2 (Track A): ...` / `Stufe 2 (Track B): ...`). Methoden- und Klassennamen für Stufe 1 verwenden `Stage1` oder `Base` (niemals das veraltete `Sprint`).
3. **Exakt gleicher Umfang (4 symmetrische Arbeitspakete), aber null Redundanz:**
   - Beide Tracks werden in **4** symmetrische Arbeitspakete (`A.1`–`A.4` bzw. `B.1`–`B.4`) mit identischem Programmieraufwand und identischer Punkteverteilung in der Bewertungsrubrik (10 Punkte) gegliedert, setzen aber klar unterschiedliche fachliche Schwerpunkte (keine 80-%-Doppelung!).
4. **Kausalitäts-Sperre & Schnittstellen-Kontinuität über Termine hinweg (laut `Konzept/01_*.md`):**
   - Strikte Einhaltung der Vorgreif-Sperre (keine Konzepte/Bibliotheken aus späteren Kapiteln).
   - Wenn laut **Kapitel-Abhängigkeitsmatrix** in `Konzept/01_*.md` ein späterer Termin auf den Ergebnissen eines früheren Termins aufbaut, müssen **beide** Tracks (A und B) kompatible Datenstrukturen bzw. Austauschformate (z. B. JSON-Export) verwenden!

---

## 2. Verbindliche 6-Punkte-Synchronisations-Checkliste

Wenn sich der Inhalt oder Zuschnitt einer Übungsaufgabe für Termin `XX` ändert, müssen **alle 6 folgenden Orte** synchron aktualisiert werden:

1. **Das Aufgabenblatt selbst:**
   - `Uebungen/Termin_XX_.../Aufgabenblatt.md` (inkl. ASCII-Auswahlbaum, Arbeitspakete, 10-Punkte-Rubrik, LLM-Prompt und Leitfragen für den Live-Showcase & Code-Defense).
   - Prüfen: **Kein `€`-Symbol innerhalb von `$ ... $` Mathe-Umgebungen** verwenden (immer `\text{EUR}` schreiben, da KaTeX beim PDF-Export sonst eine Unicode-Warnung wirft!).
   - PDF neu generieren: `npm run export:pdf:uebung:XX`.
2. **Die Programmier-Vorlage:**
   - `TODO`-Kommentare und Unit-Tests in `Uebungen/Termin_XX_.../Vorlage/...` für **Stufe 1 (`1.1`–`1.4`)**, **Stufe 2 – Track A (`A.1`–`A.4`)** und **Stufe 2 – Track B (`B.1`–`B.4`)** synchron halten.
3. **Die Hausübungs-Folie am Ende von Vorlesungskapitel `XX`:**
   - Letzte Folie (`### Hausübung Termin XX: ...`) in `Folien/XX_.../Folien.md` anpassen (nennt oben **Stufe 1: Basisaufgabe `1.1`–`1.4`** für alle Teams und darunter zweispaltig **Stufe 2: Vertiefungsaufgabe** mit **Track A** links und **Track B** rechts) + `npm run lint:slides:XX` & `npm run export:pdf:XX`.
4. **Die Showcase-Folie am Anfang des Folgekapitels `XX+1`:**
   - Folie 2 (`### Live-Showcase & Code-Defense: Termin XX`) in `Folien/[XX+1]_.../Folien.md` anpassen + `npm run lint:slides:[XX+1]` & `npm run export:pdf:[XX+1]`.
5. **Die Konzept-Dokumente:**
   - `Konzept/01_Lehrveranstaltungsstruktur_und_Syllabus.md` (Übersichtstabelle, Abhängigkeitsmatrix & Termin-Steckbrief)
   - `Konzept/02_Uebungskatalog_und_Abschlussprojekt.md`
6. **Die Moodle-Kursstruktur (`Moodle/Moodle_Kursstruktur_und_Termintexte.md`):**
   - **WICHTIGE FORMATIERUNGSREGEL FÜR MOODLE:** Der Text aus `Moodle/Moodle_Kursstruktur_und_Termintexte.md` wird als HTML nach Moodle kopiert. Verwende in dieser Datei **KEINE LaTeX-Formeln (`$...$`)** und **KEINE Inline-Code-Backticks (`` `...` ``)**, da diese in Moodle unschönes Text-Layout verursachen! Schreibe Zahlen und Einheiten dort immer als reinen Fließtext (z. B. `0,5-m-Grid-Snapping`, `bis 4,0 m`).
   - **Vorsicht beim Editieren:** Prüfe nach dem Editieren mit `git diff Moodle/Moodle_Kursstruktur_und_Termintexte.md`, dass die Änderung unter dem richtigen Termin (`### Termin XX:`) gelandet ist.

---

## 3. Moodle-Quiz-Design, Kausalität & Anti-Bias-Regeln (`Moodle/Quiz_*`)

Für alle summativen Moodle-Quizzes gelten verbindliche Qualitäts-, Kausalitäts- und Psychometrieregelungen:

### 3.1 Strikte Rückwärts-Kausalität (Quiz findet immer ZU BEGINN des Prüfungstermins statt!)
- Da jedes Quiz in den ersten 15 Minuten **vor** dem Theorie-Impuls des jeweiligen Termins geschrieben wird, darf es **ausschließlich den Stoff der vorangegangenen Termine** abfragen (niemals das Kapitel des aktuellen Termins, an dem das Quiz stattfindet!).
- Welche konkreten Kapitel zu welchem Quiz-Cluster gehören und welche späteren Themen streng tabu sind, ist in der **Kapitel-Abhängigkeits- & Quiz-Matrix** in `Konzept/01_Lehrveranstaltungsstruktur_und_Syllabus.md` festgelegt.

### 3.2 Datenverwaltung & 10-Varianten-Architektur in Moodle XML (`XML_Tests/Test_01..10.xml`)
Für jedes finalisierte Moodle-Quiz gilt folgende verbindliche **10-Varianten-Taktik und Dateistruktur**:
- **Single Source of Truth (Generator-Skript `Skripte/generate_moodle_xml_quiz_0X.js` + Shared Builder `Skripte/moodle_xml_builder.js`):**
  - Jedes finalisierte Quiz wird über ein dediziertes Node.js-Skript `Skripte/generate_moodle_xml_quiz_0X.js` generiert, das zwingend das zentrale Builder- und Validierungsmodul [`Skripte/moodle_xml_builder.js`](../../Skripte/moodle_xml_builder.js) (`exportMoodleQuiz({...})`) nutzt.
  - **Architektur- & Chunking-Pflicht gegen Stream-Timeouts (KRITISCH für Agenten & Subagenten!):**
    1. **Kein Boilerplate-Duplikat:** XML-Serialisierung, CDATA-Wrapping, Markdown-Katalog-Formatierung und Psychometrie-Checks (8 Fragen = 10,0 Pkt., $\le 25\,\%$ Längen-Symmetrie bei `multichoice`, Pflicht-Feedbacks) liegen zentral in `Skripte/moodle_xml_builder.js`. Die Skripte `Skripte/generate_moodle_xml_quiz_0X.js` enthalten ausschließlich das Daten-Array `tests` und den Aufruf `exportMoodleQuiz(...)`.
    2. **Inkrementelles Schreiben in 3 Chunks:** Da 10 Tests × 8 Fragen mit ausführlichem Feedback ca. 1.000–1.500 Zeilen umfassen, darf ein Agent `generate_moodle_xml_quiz_0X.js` **niemals in einem einzigen monolithischen `write_file`-Aufruf** schreiben (Gefahr von Stream-Timeouts!). Stattdessen ist die Datei zwingend in **3 kleinen Teilschritten** aufzubauen:
       - *Schritt 1 (`write_file`):* Grundgerüst mit `Tests 01–03` (Vorbereitung) anlegen.
       - *Schritt 2 (`edit_file`):* `Tests 04–07` (Prüfung Teil 1) einfügen.
       - *Schritt 3 (`edit_file`):* `Tests 08–10` (Prüfung Teil 2) einfügen und sofort `node Skripte/generate_moodle_xml_quiz_0X.js` ausführen.
    3. **Kontext-Disziplin:** Beim Erstellen der Quiz-Skripte nicht alle kompletten `Folien.md`-Dateien gleichzeitig in denselben Agenten-Kontext laden, sondern gezielt die Kernformeln und Code-Snippets der geprüften Kapitel heranziehen.
  - Es dürfen **keine konkurrierenden Einzel-Dateien (`Quiz_0X.md` / `.gift.txt`)** parallel zu den generierten 10 XML-Tests im Ordner liegen (Einzel-Entwürfe dienen nur als vorläufiger Blueprint für spätere Termine, deren Folien noch nicht final sind).
  - Das Skript generiert im jeweiligen Quiz-Ordner:
    1. `XML_Tests/Test_01_Vorbereitung.xml` bis `Test_03_Vorbereitung.xml` (**3 Vorbereitungstests** zum unbegrenzten Üben mit vollem Lösungsfeedback).
    2. `XML_Tests/Test_04_Pruefung.xml` bis `Test_10_Pruefung.xml` (**7 Prüfungstests**, aus denen zu Beginn der Präsenzveranstaltung zufällig genau 1 Test für die 15-minütige Prüfung gezogen wird).
    3. `Quiz_0X_Termin_YY_Alle_10_Tests_Master.xml` (Master-Importdatei mit allen 10 Kategorien).
    4. `Uebersicht_10_Moodle_Tests.md` (vollständiger, menschenlesbarer Katalog aller 10 Tests).

### 3.3 Zielumfang, voller Moodle-Fragetypen-Mix (100 % Auto-Grading) & Feedback-Pflicht
Jeder der 10 Tests (`Test_01` bis `Test_10`) besteht aus **exakt 8 Fragen (Summe: 10,0 Punkte)** für 15 Minuten Prüfungszeit und wird von Moodle **zu 100 % vollautomatisch korrigiert** (keine offenen Freitext-Aufsatzfragen `essay`!):
1. **Rechen- & Code-Tracing-Fragen (2–3 Fragen, zusammen ca. 4,0–5,0 Punkte):**
   - **`<question type="numerical">` (Numerisch):** Zahleneingabe mit exaktem Zielwert und `<tolerance>`. Hinterlege neben der `100 %`-Hauptantwort (`fraction="100"`) auch **automatische `50 %`-Teilpunkte-Antworten (`fraction="50"`)** für typische Einheiten-/Zehnerpotenz- oder Vorzeichenfehler inklusive spezifischem `<feedback>`!
   - **`<question type="cloze">` (Eingebettete Antworten / Lückentext für mehrstufige Rechnungen):** Separate Eingabefelder für Zwischenschritte und Endergebnis, sodass Folgefehler nicht zum Punktverlust für richtige Zwischenschritte führen.
2. **Interaktive Code- & Pipeline-Fragen (1–2 Fragen, je 1,0 Punkt):**
   - **`<question type="gapselect">` (Lückentext-Auswahl / „Fill in the Code“):** Code-Block mit 2–4 Lücken `[[1]]`, `[[2]]`, `[[3]]` per Inline-Dropdown.
   - **`<question type="ddwtos">` (Drag-and-Drop in Text / Pipeline- & Ausführungsreihenfolge):** Ziehen von 3–4 Pipeline-Schritten oder Operatoren in die richtige Reihenfolge.
3. **Konzept- & Architektur-Zuordnung (1 Frage, 1,0 Punkt):**
   - **`<question type="matching">` (Zuordnungsfrage mit Überhang-Distraktoren):** 4 Stamm-Einträge plus **1–2 zusätzliche leere `<subquestion><text></text><answer>...</answer></subquestion>` als Überhang-Distraktoren** gegen das Ausschlussprinzip.
4. **Klassische Diagnose- & Systemverständnis-Fragen (2–3 Fragen, je 1,0 Punkt):**
   - **`<question type="multichoice">` mit `<single>true</single>` (Single-Choice)** und **`<single>false</single>` (Multiple-Select):** 4 längensymmetrische Optionen A–D zu subtilen Code-Bugs oder mathematisch-physikalischen Phänomenen.

#### Verbindliche Moodle-Feedback-Architektur für ALLE Fragen:
- **Spezifisches Options-/Antwort-Feedback (`<feedback format="html">` bzw. `#Feedback` in Cloze):** Jede einzelne Antwortoption (richtig, falsch und Teilpunkte-Antwort) besitzt ein eigenes, fachlich präzises `<feedback>`, das erklärt, *warum* diese Option richtig ist bzw. *welcher konkrete Denkfehler* zu dieser Falschantwort geführt hat.
- **Kombiniertes Status-Feedback (`<correctfeedback>`, `<partiallycorrectfeedback>`, `<incorrectfeedback>`)** sowie **Ausführliches Gesamt-Feedback (`<generalfeedback format="html">`)** mit der vollständigen Schritt-für-Schritt-Musterherleitung.

### 3.4 Strikte Anti-Bias- & Anti-Schablonen-Regeln
1. **Variation der Fragerichtung zwischen Vorbereitung (`Test_01`–`03`) und Prüfung (`Test_04`–`10`):**
   - `Test_04` bis `Test_10` dürfen **nicht bloß dieselben Fragetexte mit ausgetauschten Zahlen** sein, sondern variieren systematisch die **gesuchte Zielgröße / Rechenrichtung** sowie die konkreten Code-Bugs und Diagnose-Szenarien.
2. **Längen-Symmetrie (Kein Length Bias!):**
   - Alle 4 Antwortoptionen (A, B, C, D) einer Single-Choice- oder Multiple-Select-Frage müssen gleich lang und gleich detailliert formuliert sein (maximale Abweichung $\le 25\,\%$).
3. **Technisch plausible Fehlkonzepte statt Scherzantworten:**
   - Jede falsche Option muss einen **echten, häufigen Denkfehler von Studierenden oder LLMs** repräsentieren (keine absurden Scherzantworten).
4. **Keine Formeln oder Zwischenschritte im Fragetext verraten:**
   - Der Fragetext nennt ausschließlich das Szenario und die gegebenen Rohgrößen (mit Einheiten); Grundformeln und Zwischenschritte müssen selbst aufgestellt werden.
