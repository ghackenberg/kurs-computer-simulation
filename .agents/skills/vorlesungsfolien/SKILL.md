---
name: vorlesungsfolien
description: >-
  Vorlesungsübergreifende strukturelle, gestalterische und technische Regeln für das Erstellen,
  Überarbeiten und Prüfen von MARP-Vorlesungsfolien (Kapitel/*/Folien/Folien.md und Folien_Anhang_*.md).
  IMMER aktivieren, wenn Folien.md gelesen, geplant, erstellt oder editiert wird.
---

# Skill: MARP-Vorlesungsfolien (`Kapitel/*/Folien/Folien.md`)

Verbindliche Regeln für den Aufbau, das Layout und die Prüfung von MARP-Vorlesungsfolien. Übergreifende didaktische Grundsätze und Kapitel-Querbezüge sind im Skill [`lehrkonzept-und-didaktik`](../lehrkonzept-und-didaktik/SKILL.md) sowie in `Konzept/01_*.md` definiert.

---

## 1. Folien-Dramaturgie & Kapitel-Rahmen

1. **Gewichtetes Netto-Zeitbudget (statt pauschaler Folienzahl):**
   - Von den **150 Min.** Gesamtzeit gehen feste Blöcke ab: **15 Min. Pause**, **15 Min. Showcase & Code-Defense** *(ab T02)*, **5 Min. Hausübungs-Briefing** *(T01–T10)* sowie **15 Min. Moodle-Quiz** *(nur T03, T05, T08, T10)*.
   - $\implies$ **Netto-Vorlesungszeit:** **115 Min.** ohne Quiz (*T01: 130 Min.*) bzw. **100 Min.** an Quiz-Terminen (*T03, T05, T08, T10*).
   - Kalkuliere die Folien nach **Folientyp-Gewichten** (geprüft durch `npm run lint:sections:XX`):
     - `Showcase` / `Hausübung`: **0 Min.** *(eigener Block)*
     - `Kapitel-Opener` / `Abschnitts-Opener` / `Zusammenfassung`: **0,5 Min.**
     - `Rückblick & Brücke`: **2,0 Min.**
     - `Standard-Inhaltsfolie` *(Beispiel, Code, Überblick)*: **3,5 Min.**
     - `Schwere Erklär-Folie` *(„Blick unter die Haube“, Herleitung, komplexes Kontrast-SVG)*: **4,5 Min.**
   - Richtwert in der Praxis: ca. **28–32 Folien** an Quiz-Terminen bzw. **32–36 Folien** ohne Quiz. Keine separaten Kleinst-Folien für triviale 1-Zeilen-API-Aufrufe.
5. **Visueller Rhythmus & Layout-Shift (`lint:sections`):**
   - Reine Textfolien (ohne Grafik/SVG und ohne Code) dürfen niemals direkt aufeinanderfolgen (`CONSECUTIVE_TEXT_SLIDES`) – spätestens jede zweite Inhaltsfolie bringt eine Grafik oder ein Code-Element.
   - Zwei aufeinanderfolgende Inhaltsfolien müssen einen signifikanten **visuellen Shift** aufweisen (unterschiedliche Spaltenbreiten `one`–`six`, Wechsel zwischen Text-/Bild-/Code-/Mischspalten oder ein-/mehrzeiligen Layouts; ab Kap. `06` als harter Linter-Fehler).
   - **Visuelle Verankerung (`SECTION_MISSING_VISUAL`, `CONSECUTIVE_NON_VISUAL_SLIDES`):** Jeder Abschnitt (`## N.M:`) enthält mindestens **1 Inhalts-Grafik/SVG**, und es folgen maximal **3 Inhaltsfolien in Folge** ohne Grafik/SVG aufeinander (ab Kap. `06` als Fehler, `00`–`05` als Warnung).
6. **Ausgewogene Abschnittsgrößen (`lint:sections`):**
   - Jeder Abschnitt (`## N.M:`) umfasst mindestens **2 Inhaltsfolien** (`SECTION_TOO_SMALL`); ein-Folien-Abschnitte sind durch Zusammenlegen oder Ausbau zu vermeiden.
   - Die Inhaltsfolien sind möglichst gleichmäßig auf die Abschnitte verteilt (Max/Min-Verhältnis $\le 2:1$ bei Differenz $> 2$, `UNBALANCED_SECTIONS`).
2. **Folie 2 (ab Kapitel `02`): `### Live-Showcase & Code-Defense: Termin [XX-1]`:**
   - Fasst zweispaltig (`Track A` links, `Track B` rechts) die Vorwochen-Hausübung und den Live-Parameter-Stresstest zusammen.
3. **Einstiegsfolie vor Abschnitt `N.1`: `### Rückblick & Brücke: ...`:**
   - Pflicht in jedem Kapitel ab `01` **vor** dem ersten Abschnitts-Opener `## N.1:` und **nach** dem Kapitel-Opener bzw. den optionalen Quiz-/Showcase-Folien (geprüft durch `npm run lint:sections`).
   - Zweispaltiges Pflichtlayout (`three` Text links | `two` 3-Stufen-Brücken-SVG `./Diagramme/...svg` rechts): verbindet (a) den Rückblick auf Vor-Termine (Nachbar- & Fern-Brücken laut `Konzept/01_*.md`), (b) den konkreten Engpass des bisherigen Werkzeugs und (c) die Einordnung in die Semester-Architektur (*Foreshadowing*). Fehlt das SVG, meldet `lint:sections` einen Fehler (`MISSING_BRIDGE_VISUAL`).
4. **Ausblicksfolie vor der Hausübung: `### Ausblick: ...`:**
   - Pflicht in jedem Kapitel (`01`–`10`) direkt **nach** der Zusammenfassung und **vor** der Hausübung (mit `<!-- _class: bridge -->`, geprüft durch `npm run lint:sections`). Schlägt den Bogen zum nächsten Termin und den gekoppelten Folgekapiteln.
5. **Letzte Folie des Kapitels: `### Hausübung Termin XX: ...`:**
   - Zeigt oben **Stufe 1: Basisaufgabe (`1.1`–`1.4`)** für alle Teams und darunter zweispaltig **Stufe 2: Vertiefungsaufgabe (`Track A` links | `Track B` rechts)**.

---

## 2. Umsetzung der Mikro-Didaktik auf Folienebene

1. **Gezielter 3-Schritt-Rhythmus & Tiefgang-Steuerung (niemals alles auf eine Folie quetschen):**
   - **Folie A (`Anwendungsbeispiel ...`):** Fertiges visuelles Ergebnis (Screenshot/Plot rechts) + Praxis-Nutzen links.
   - **Folie B (`Blick unter die Haube: ...`):** Mathematische/algorithmische Herleitung links + maßgeschneidertes Kontrast-SVG (`./Diagramme/...svg`) rechts.
   - **Folie C (`Der Code zu ...`):** Dedizierte, luftige Code-Folie (max. 1 Befehl pro Zeile, keine `;`-Ketten).
   - **3-Zonen-Regel für Tiefgang vs. Auslagerung (Zielgruppe 5. Sem. Automatisierungstechnik):**
     - *Tief im Hörsaal (voller 3-Schritt-Rhythmus):* Neue mentale Modelle und klassische Fehlerquellen, die in Hausübung/Quiz zuschlagen (z. B. Race Conditions, False Sharing, Stabilitätsgrenzen).
     - *Knapp anschließen:* Bekanntes Fundament (Lineare Algebra, Mechanik, einfache C#-Syntax) nicht als „neu“ herleiten, sondern nur über eine Konventions-Brücke anbinden.
     - *Oberflächlich / Anhang (`Folien_Anhang_*.md`):* Reine API-Varianten, Boilerplate-Details oder vertiefende Randthemen im Hauptdeck nur kurz einordnen und bei Bedarf in `Folien_Anhang_*.md` auslagern, um das Netto-Zeitbudget einzuhalten.
2. **Explizite, problemmotivierte Konventions-Brücken & `*(Deep Dive)*`-Kennzeichnung:**
   - **Motivation vor Konvention:** Eröffne einen Anwendungsabschnitt niemals mit einem unmotivierten Text-Hinweisblock zu Koordinatensystemen, Händigkeit oder Vorzeichen. Führe zuerst das technische System visuell ein, motiviere die Fragestellung (z. B. warum wir eine analytische Kontrollformel brauchen) und erkläre Achsenrichtungen/Vorzeichen erst genau dort – begleitet von einem passenden Ansichts-/Kontrast-SVG (z. B. Draufsicht mit Fehler-Phantom).
   - Jeder Wechsel von Koordinatensystemen, Achsenrichtungen, Indizes oder Matrix-Reihenfolgen wird direkt auf der Folie mit einer 1-Satz-Eselsbrücke erklärt.
   - Komplexe Vorlagen-Hilfsmethoden mit abweichender Bibliotheks-Konvention tragen im Folientitel den Zusatz `*(Deep Dive – fertig in der Vorlage)*`.
3. **„Was-passiert-wenn-nicht?“-Motivation:**
   - Jede Schutzmaßnahme, Initialisierung oder numerische Korrektur nennt den konkreten Fehlerfall beim Weglassen (*„Ohne X passiert Fehler Y $\implies$ deshalb brauchen wir X!“*).
4. **1:1-Deckung zwischen Theorie-Formel & API-Code:**
   - Wird eine Größe mathematisch als globale Konstante eingeführt (z. B. globales Raumlicht $I_a$), muss auch der gezeigte C#/API-Code (und die `Vorlage/`) exakt diese globale API nutzen – bzw. abweichende Instanz-Parameter explizit einordnen.
5. **Visuelle Pflicht-Illustration für Speicherpuffer, Transformationen, Winkel & Singularitäten:**
   - Zentrale Puffer-Strukturen (z. B. Color vs. Depth Buffer), Koordinatenräume/Matrizen (inkl. Vorher-Nachher-Bildwirkung), räumliche Winkeldefinitionen (z. B. Euler-Winkel) sowie **geometrische Singularitäten / Vektor-Entartungen** (z. B. kollabierendes Kreuzprodukt am Pol: *Normalfall vs. Grenzfall*) dürfen niemals nur im Fließtext oder neben Code stehen, sondern erhalten jeweils ein eigenes Kontrast-SVG.

---

## 3. MARP-Layout & Technische Regeln (`Themen/fhooe.css`)

| Element | Verbindliche Vorgabe |
| :--- | :--- |
| **Kapitel-Opener (`# Kapitel N: ...`)** | `![bg right](./Titelbild.jpg)` ($896 \times 1200\,\text{px}$, 3:4) + Satz: `Dieses Kapitel umfasst die folgenden Abschnitte:` |
| **Abschnitts-Opener (`## N.M: ...`)** | `![bg right](./Illustrationen/Abschnitt_M.jpg)` ($896 \times 1200\,\text{px}$, 3:4, textfrei) + Satz: `Dieser Abschnitt umfasst die folgenden Inhalte:` |
| **Rahmenfolien-Klassen (`<!-- _class: ... -->`)** | `showcase` (Live-Showcase/Quiz), `bridge` (`Rückblick & Brücke` sowie `Ausblick`), `summary` (`Zusammenfassung`), `homework` (`Hausübung Termin XX`) – geprüft durch `lint:sections` |
| **Mehrspaltiges Layout (`<div class="columns">`)** | Klassen `one` bis `six` sind **relative `flex-grow`-Breitengewichte** (keine Spaltennummern!):<br>• 50 % / 50 %: `two` + `two`<br>• 40 % / 60 %: `two` + `three`<br>• 33 % / 67 %: `one` + `two` |
| **Bildsyntax** | Immer reine Markdown-Syntax `![](./Diagramme/Name_Mit_Unterstrich.svg)` ohne `w:`, `h:`, `center` und ohne `%20`-Leerzeichen. |

---

## 4. Variablen-Konsistenz (`npm run lint:variables`)

1. **Regel 1 (SVG $\to$ Text):** Alle Symbole/Variablen eines SVGs müssen im Folientext (bzw. Abschnitt) eingeführt werden.
2. **Regel 2 (Halbseitiger Code $\to$ Text):** Alle Bezeichner in zweispaltigen Code-Blöcken müssen im Text derselben Folie genannt werden.
3. **Regel 3 (Ganzseitiger Code):** Bezeichner in ganzseitigen Code-Listings müssen auf derselben Folie oder den vorangehenden Folien des Abschnitts eingeführt sein.
4. **Regel 4 (Textformel $\to$ SVG/Code):** Mathematische Variablen im Text einer Diagramm-/Code-Folie müssen auch im begleitenden SVG oder Code vorkommen.
5. **Regel 5 (Abkürzungs-Einführung):** Jede fachliche Abkürzung (`[A-ZÄÖÜ]{2,6}`) muss bei ihrer ersten Verwendung im Kapitel (oder in einem früheren Kapitel) explizit als `Langform (ABK)` bzw. `ABK (Langform)` eingeführt werden – niemals *vor* ihrer Definition.

---

## 5. Pflicht-Prüfworkflow nach jeder Änderung

```powershell
npm run lint:sections:XX
npm run lint:variables:XX
npm run lint:svg:XX
npm run lint:slides:XX
npm run export:pdf:XX
```
- Optionale Anhang-Folien (`Folien_Anhang_*.md`) werden durch `npm run export:pdf:XX` automatisch als `Moodle/*_Folien_Anhang_*.pdf` mitexportiert und zusätzlich mit `node Skripte/lint_slides_dom.js <Pfad> --skip-schema` geprüft.
- Bei kurzzeitiger Windows-Dateisperre (`user-mapped section open` durch Marp Preview) den `edit_file`-Aufruf einmal wiederholen.
