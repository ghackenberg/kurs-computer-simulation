---
name: qualitaets-review
description: >-
  Vorlesungsübergreifendes 6-Dimensionen-Prüfraster für das inhaltliche, fachdidaktische,
  curriculare, visuelle und prüfungsmethodische Review von Konzeptdokumenten, Vorlesungsfolien,
  SVG-Diagrammen, Übungsblättern, Programmier-Vorlagen und Moodle-Quizzes.
  IMMER aktivieren bei Qualitäts-Audits, Kapitel-Reviews oder vor einem Release/Merge.
---

# Skill: Ganzheitliches Qualitäts-Review (Vier-Augen-Prinzip)

Dieser Review-Skill definiert das Prüfprotokoll für unabhängige **Review-Subagenten** in einer mehrstufigen Review-Edit-Schleife bis zum Erreichen von **0 Befunden**. Für die Detailregeln der jeweiligen Domäne gelten die fünf Fach-Skills als Single Source of Truth:
- [`lehrkonzept-und-didaktik`](../lehrkonzept-und-didaktik/SKILL.md) (Curriculum, Lernziele, Motivation, Synchronisation)
- [`vorlesungsfolien`](../vorlesungsfolien/SKILL.md) (MARP-Folien & Anhänge)
- [`svg-diagramme`](../svg-diagramme/SKILL.md) (SVG-Grafiken & Generatoren)
- [`uebungsaufgaben`](../uebungsaufgaben/SKILL.md) (Übungsblätter & C#-Vorlagen)
- [`moodle-quizzes`](../moodle-quizzes/SKILL.md) (Moodle-XML-Quizzes & Psychometrie)

---

## Schritt 0: Kontext-Ingestion (Vorab-Pflichtschritt – Gezieltes Context-Loading)

Lies vor Beginn jedes Reviews einer Einheit $k$:
1. **Gezielter Kurs- & Termin-Kontext (`AGENTS.md` + `Konzept/01..03_*.md` + Termin-Steckbrief `Konzept/[k+3]_Termin_0k_*.md`):**
   - Übergeordnete Kurs-Lernziele, Studierenden-Vorwissen & Bloom-Lernziel-Kaskade (`Konzept/01_Didaktik_und_Lernziele.md`).
   - **Kapitel-Abhängigkeits- & Fern-Schnittstellen-Matrix (`Konzept/02_Semestermatrix_und_Abhaengigkeiten.md`) + Termin-Steckbrief (`Konzept/[k+3]_Termin_0k_*.md`):** Welche direkten Nachbarn ($k-1$, $k+1$) und welche **nicht-angrenzenden Einheiten ($m \neq k \pm 1$)** sind fachlich, über Notationen oder über Code-/Datenformate mit Einheit $k$ gekoppelt?
   - **Quiz-Cluster (`Konzept/03_Beurteilung_und_Pruefungen.md`):** Welche Einheiten werden in welchem summativen Test gemeinsam geprüft?
2. **Horizontales Querlesen der Schnittstellen-Artefakte:**
   - Lies die Hausübungs-/Brückenfolien und Aufgabenblätter von $k-1$ und $k+1$ sowie die relevanten Abschnitte aller laut Matrix gekoppelten Fern-Einheiten $m$.

---

## Das 6-Dimensionen-Prüfraster

### Dimension 1: Curriculare Einbettung, Motivation & Anspruchsniveau
*(Detailregeln siehe [`lehrkonzept-und-didaktik`](../lehrkonzept-und-didaktik/SKILL.md))*
- [ ] **Vorwissen-Brücke & Bloom-Alignment:** Holt das Material die Studierenden bei ihrem laut `Konzept/01_*.md` vorhandenen Fundament ab und deckt die drei Bloom-Stufen (*Verstehen $\leftrightarrow$ Vorlesung/Quiz*, *Anwenden $\leftrightarrow$ Stufe 1*, *Erschaffen/Evaluieren $\leftrightarrow$ Stufe 2 & Showcase*) sauber ab?
- [ ] **Motivation & Abwechslung:** Ist das Thema über das duale Wahlmodell (*Track A Industrie vs. Track B Game*), anschauliche Praxis-Beispiele und unmittelbares visuelles Feedback spannend und abwechslungsreich inszeniert?
- [ ] **„Low Floor, High Ceiling“:** Gelingt der Einstieg über `Vorlage/` und Stufe 1 frustfrei (~60 Min.), während Stufe 2, Code-Defense und Quiz echtes Ingenieur-Niveau (keine Schein-Animationen!) fordern?

### Dimension 2: Chronologische, Kausale & Horizontale Integrität (Makro-Dramaturgie)
*(Detailregeln siehe [`lehrkonzept-und-didaktik`](../lehrkonzept-und-didaktik/SKILL.md) & [`vorlesungsfolien`](../vorlesungsfolien/SKILL.md))*
- [ ] **Netto-Zeitbudget:** Passt der Folienumfang in die Netto-Vorlesungszeit nach Abzug von Showcase, Pause und ggf. Quiz (z. B. **40–48 Folien** für 100–115 Min. netto)?
- [ ] **Rückwärts-Kausalität & Vorgreif-Sperre:** Prüfen Showcase und Quiz zu Beginn von Termin $k$ ausschließlich die Vor-Termine $1 \dots k-1$, und werden nirgendwo Konzepte/Bibliotheken aus späteren Kapiteln ($> k$) vorweggenommen?
- [ ] **Pflicht-Folie `### Rückblick & Brücke: ...`:** Besitzt Abschnitt `N.1` direkt zu Beginn die Brückenfolie mit Rückblick, Engpass-Motivation und Semester-Einordnung?
- [ ] **Nachbar- & Fern-Schnittstellen-Konsistenz:** Stimmen mathematische Symbole, Koordinatenkonventionen und Datenformate zu 100 % mit allen laut Matrix (`Konzept/02_*.md` & Termin-Steckbrief) gekoppelten Einheiten ($k \pm 1$ sowie $m \neq k \pm 1$) überein, inkl. expliziter Callbacks/Foreshadowings?

### Dimension 3: Fachdidaktik & Einfache Erklärbarkeit im Hörsaal (Mikro-Dramaturgie)
*(Detailregeln siehe [`vorlesungsfolien`](../vorlesungsfolien/SKILL.md))*
- [ ] **3-Schritt-Rhythmus & nahtlose Übergänge:** Folgt jeder Baustein dem Dreiklang `Anwendungsbeispiel` $\to$ `Blick unter die Haube` $\to$ `Der Code`, ohne dass Theorie unmotiviert vom Himmel fällt?
- [ ] **Konkrete Zahlen statt nackter $\mathcal{O}(\dots)$-Notation:** Ist jede Komplexitäts-, Speicher- oder Genauigkeitsaussage mit einem konkreten Zahlenbeispiel belegt?
- [ ] **Explizite Konventions-Brücken:** Wird jeder Vorzeichen-, Index-, Achsen- oder Reihenfolgewechsel zwischen Lehrbuch, Bibliothek und Hardware direkt auf der Folie mit einer anschaulichen 1-Satz-Eselsbrücke erklärt?
- [ ] **„Was-passiert-wenn-nicht?“-Motivation:** Wird jede Schutzmaßnahme oder numerische Korrektur über den konkreten Fehlerfall beim Weglassen motiviert?
- [ ] **Code-Lesbarkeit & Deep-Dive-Kennzeichnung:** Maximal 1 Befehl pro Zeile (keine `;`-Ketten); komplexe Vorlagen-Interna im Folientitel als `*(Deep Dive – fertig in der Vorlage)*` markiert?

### Dimension 4: Visuelle Evidenz & Technische Linter (Folien & SVGs)
*(Detailregeln siehe [`svg-diagramme`](../svg-diagramme/SKILL.md))*
- [ ] **Mentale Kontrast-Modelle statt Textwüsten:** Werden räumliche/algorithmische Mechanismen durch maßgeschneiderte SVGs mit echten Zahlenwerten (bevorzugt *Naiv/Falsch vs. Richtig*) veranschaulicht?
- [ ] **0 Linter-Fehler (inkl. Anhang-Folien):** Laufen `lint:sections:XX`, `lint:variables:XX`, `lint:svg:XX`, `lint:slides:XX` sowie `node Skripte/lint_slides_dom.js <Anhang> --skip-schema` mit **0 Fehlern** durch, ohne verwaiste oder leerzeichenbehaftete SVGs in `Diagramme/`?

### Dimension 5: Forensischer Code-Walkthrough, Lernfortschritt & 6-Punkte-Synchronisation
*(Detailregeln siehe [`uebungsaufgaben`](../uebungsaufgaben/SKILL.md) & [`lehrkonzept-und-didaktik`](../lehrkonzept-und-didaktik/SKILL.md))*
- [ ] **Aufbau & Symmetrie (`Stufe 1` $\to$ `Stufe 2: Track A | Track B`):** Synchrone Nummerierung `1.1`–`1.4` (mit unnummerierter Vorbereitung davor) sowie symmetrische Arbeitspakete `A.1`–`A.4` und `B.1`–`B.4` (gleicher Aufwand, 10 Pkt., keine Redundanz), die direkt auf Stufe 1 aufbauen?
- [ ] **End-to-End Walkthrough & Lernfortschrittskontrolle in `Vorlage/`:** Sind alle `TODO`-Blöcke vorhanden, alle impliziten Konventionen von Hilfsmethoden und UI-Events (`PreviewKeyDown` etc.) dokumentiert, alle Berechnungen mit **Golden Reference Numbers** (5-Sekunden-Selbsttest) versehen und eigene Unit-Tests in `Aufgabe 1.4` (`dotnet test`) aktiv?
- [ ] **6-Punkte-Synchronisation:** Stimmen Aufgabenblatt (+ PDF), `Vorlage/`, Hausübungs-Folie ($k$), Showcase-Folie ($k+1$), `Konzept/02_*.md` + Termin-Steckbrief `Konzept/[k+3]_Termin_0k_*.md` und `Moodle/0k_Termin_0k_*/Text.md` (formel- und backtickfrei!) zu 100 % überein?

### Dimension 6: Prüfungs- & Quiz-Psychometrie (`Moodle/*/Quiz_*`)
*(Detailregeln siehe [`moodle-quizzes`](../moodle-quizzes/SKILL.md))*
- [ ] **Kausalität, 10-Varianten-XML, Fragetypen-Mix & Anti-Bias:** Prüft das Quiz ausschließlich die laut `Konzept/02_*.md` / `03_*.md` zugeordneten Vor-Kapitel, nutzt es die 10-Varianten-Architektur (`Test_01..03` Vorbereitung + `Test_04..10` Prüfung mit invertierter Fragerichtung), den vollen Auto-Grading-Fragetypen-Mix (8 Fragen = 10 Pkt.), spezifisches Feedback, Längen-Symmetrie ($\le 25\,\%$) und keine verratenen Formeln im Fragetext?
