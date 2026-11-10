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

1. **Realistisches Netto-Zeitbudget:**
   - Netto-Vorlesungszeit = Gesamtzeit minus Showcase/Code-Defense, Pause und ggf. Quiz (z. B. 100–115 Min. netto $\implies$ **40–48 Folien**).
   - Keine separaten Kleinst-Folien für triviale 1-Zeilen-API-Aufrufe.
2. **Folie 2 (ab Kapitel `02`): `### Live-Showcase & Code-Defense: Termin [XX-1]`:**
   - Fasst zweispaltig (`Track A` links, `Track B` rechts) die Vorwochen-Hausübung und den Live-Parameter-Stresstest zusammen.
3. **1. Inhaltsfolie in Abschnitt `N.1`: `### Rückblick & Brücke: ...`:**
   - Pflicht in jedem Kapitel ab `01` direkt nach dem Abschnitts-Opener `## N.1:` (geprüft durch `npm run lint:sections`).
   - Verbindet (a) den Rückblick auf Vor-Termine (Nachbar- & Fern-Brücken laut `Konzept/01_*.md`), (b) den konkreten Engpass des bisherigen Werkzeugs und (c) die Einordnung in die Semester-Architektur (*Foreshadowing*).
4. **Letzte Folie des Kapitels: `### Hausübung Termin XX: ...`:**
   - Zeigt oben **Stufe 1: Basisaufgabe (`1.1`–`1.4`)** für alle Teams und darunter zweispaltig **Stufe 2: Vertiefungsaufgabe (`Track A` links | `Track B` rechts)**.

---

## 2. Umsetzung der Mikro-Didaktik auf Folienebene

1. **3-Schritt-Rhythmus über aufeinanderfolgende Folien (niemals alles auf eine Folie quetschen):**
   - **Folie A (`Anwendungsbeispiel ...`):** Fertiges visuelles Ergebnis (Screenshot/Plot rechts) + Praxis-Nutzen links.
   - **Folie B (`Blick unter die Haube: ...`):** Mathematische/algorithmische Herleitung links + maßgeschneidertes Kontrast-SVG (`./Diagramme/...svg`) rechts.
   - **Folie C (`Der Code zu ...`):** Dedizierte, luftige Code-Folie (max. 1 Befehl pro Zeile, keine `;`-Ketten).
2. **Explizite Konventions-Brücken & `*(Deep Dive)*`-Kennzeichnung:**
   - Jeder Wechsel von Koordinatensystemen, Achsenrichtungen, Indizes oder Matrix-Reihenfolgen wird direkt auf der Folie mit einer 1-Satz-Eselsbrücke erklärt.
   - Komplexe Vorlagen-Hilfsmethoden mit abweichender Bibliotheks-Konvention tragen im Folientitel den Zusatz `*(Deep Dive – fertig in der Vorlage)*`.
3. **„Was-passiert-wenn-nicht?“-Motivation:**
   - Jede Schutzmaßnahme, Initialisierung oder numerische Korrektur nennt den konkreten Fehlerfall beim Weglassen (*„Ohne X passiert Fehler Y $\implies$ deshalb brauchen wir X!“*).

---

## 3. MARP-Layout & Technische Regeln (`Themen/fhooe.css`)

| Element | Verbindliche Vorgabe |
| :--- | :--- |
| **Kapitel-Opener (`# Kapitel N: ...`)** | `![bg right](./Titelbild.jpg)` ($896 \times 1200\,\text{px}$, 3:4) + Satz: `Dieses Kapitel umfasst die folgenden Abschnitte:` |
| **Abschnitts-Opener (`## N.M: ...`)** | `![bg right](./Illustrationen/Abschnitt_M.jpg)` ($896 \times 1200\,\text{px}$, 3:4, textfrei) + Satz: `Dieser Abschnitt umfasst die folgenden Inhalte:` |
| **Mehrspaltiges Layout (`<div class="columns">`)** | Klassen `one` bis `six` sind **relative `flex-grow`-Breitengewichte** (keine Spaltennummern!):<br>• 50 % / 50 %: `two` + `two`<br>• 40 % / 60 %: `two` + `three`<br>• 33 % / 67 %: `one` + `two` |
| **Bildsyntax** | Immer reine Markdown-Syntax `![](./Diagramme/Name_Mit_Unterstrich.svg)` ohne `w:`, `h:`, `center` und ohne `%20`-Leerzeichen. |

---

## 4. Variablen-Konsistenz (`npm run lint:variables`)

1. **Regel 1 (SVG $\to$ Text):** Alle Symbole/Variablen eines SVGs müssen im Folientext (bzw. Abschnitt) eingeführt werden.
2. **Regel 2 (Halbseitiger Code $\to$ Text):** Alle Bezeichner in zweispaltigen Code-Blöcken müssen im Text derselben Folie genannt werden.
3. **Regel 3 (Ganzseitiger Code):** Bezeichner in ganzseitigen Code-Listings müssen auf derselben Folie oder den vorangehenden Folien des Abschnitts eingeführt sein.
4. **Regel 4 (Textformel $\to$ SVG/Code):** Mathematische Variablen im Text einer Diagramm-/Code-Folie müssen auch im begleitenden SVG oder Code vorkommen.

---

## 5. Pflicht-Prüfworkflow nach jeder Änderung

```powershell
npm run lint:sections:XX
npm run lint:variables:XX
npm run lint:svg:XX
npm run lint:slides:XX
npm run export:pdf:XX
```
- Optionale Anhang-Folien (`Folien_Anhang_*.md`) zusätzlich mit `node Skripte/lint_slides_dom.js <Pfad> --skip-schema` prüfen.
- Bei kurzzeitiger Windows-Dateisperre (`user-mapped section open` durch Marp Preview) den `edit_file`-Aufruf einmal wiederholen.
