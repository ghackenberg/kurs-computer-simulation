---
name: vorlesungsfolien-didaktik
description: >-
  Vorlesungsübergreifende didaktische, strukturelle und technische Regeln für das Erstellen,
  Überarbeiten und Prüfen von MARP-Vorlesungsfolien (Folien/**/Folien.md).
  IMMER aktivieren, wenn Folien.md gelesen, geplant, erstellt oder editiert wird.
---

# Skill: Vorlesungsfolien & Didaktik (`Folien/**/Folien.md`)

Dieser vorlesungsübergreifende Skill definiert die verbindlichen didaktischen, strukturellen und technischen Standards für MARP-Vorlesungsfolien in ingenieurwissenschaftlichen und informatischen Lehrveranstaltungen. Kursspezifische Rahmenparameter (Studiengang, Lernziele, Syllabus und Kapitel-Abhängigkeitsmatrix) werden stets aus `AGENTS.md` und `Konzept/01_*.md` geladen.

---

## 1. Didaktische Grundprinzipien & Storyline

### 1.1 Der verbindliche 3-Schritt-Rhythmus (Visual First!)
Wenn ein neuer Diagrammtyp, ein Algorithmus oder ein Architekturbaustein eingeführt wird, gilt strikt diese Reihenfolge über aufeinanderfolgende Folien (niemals alles auf eine einzige Folie quetschen!):
1. **Schritt 1 – `Anwendungsbeispiel ...` (Was sieht der Ingenieur / Anwender?):**
   - Zeigt zuerst das **fertige visuelle Ergebnis** (echter Screenshot / Plot / Grafik rechts in `<div class="three">` oder `<div class="two">`) und erklärt links den konkreten Anwendungsfall und Praxis-Nutzen.
2. **Schritt 2 – `Blick unter die Haube: ...` (Wie funktioniert es intern?):**
   - Erklärt die interne Datenstruktur, Geometrie oder mathematische Herleitung mit einer klaren, maßgeschneiderten SVG-Schemazeichnung (`./Diagramme/...svg` rechts in `<div class="two">`).
3. **Schritt 3 – `Der Code zu ...` (Wie programmiert man es?):**
   - Eine dedizierte, luftige Code-Folie (entweder ganzseitig oder zweispaltig mit kurzer Erklärung), die exakt zeigt, wie das Beispiel im Code der Laborvorlage umgesetzt wird.

### 1.2 Verbindlicher Kapitel-Einstieg & Vernetzung über das Semester (Direct & Long-Range Bridges)
Jedes Kapitel ab Kapitel `01` (unmittelbar nach Folie 2 `Live-Showcase & Code-Defense` und der Abschnittsfolie `## N.1: ...`) **MUSS** zu Beginn von Abschnitt `N.1` die Studierenden abholen und das neue Kapitel in das große Ganze der Lehrveranstaltung einordnen:
1. **Die Pflicht-Folie `### Rückblick & Brücke: ...` (1. Inhaltsfolie in Abschnitt `N.1`):**
   - **Rückblick auf Vor-Termine (Nachbar- & Fern-Brücken laut `Konzept/01_*.md`):** Was haben wir im vorigen Termin (bzw. in früheren, fachlich gekoppelten Terminen laut Kapitel-Abhängigkeitsmatrix) gelernt und in der Hausübung gebaut?
   - **Der konkrete Engpass / die Grenze des bisherigen Werkzeugs:** An welcher konkreten Ingenieurfrage scheitert das bisherige Werkzeug heute?
   - **Einordnung ins große Ganze (Semester-Architektur & Kurs-Lernziele):** Wo steht das heutige Kapitel im Gesamtbaukasten der Vorlesung und welche späteren Kapitel bauen direkt darauf auf (*Foreshadowing*)?
2. **Durchgängige Notations-Konsistenz über Kapitelgrenzen hinweg:**
   - Prüfe anhand der **Kapitel-Abhängigkeitsmatrix** in `Konzept/01_*.md`, welche früheren oder späteren Kapitel dasselbe physikalisch-mathematische Modell aufgreifen, und verwende exakt dieselben Variablennamen, Indizes und Koordinatenkonventionen.
3. **Automatische Linter-Prüfung (`npm run lint:sections`):**
   - `Skripte/lint_section_slides.js` prüft, dass in Abschnitt `N.1` eine Einstiegsfolie mit dem Titel `### Rückblick & Brücke:` (bzw. `### Einordnung & Rückblick:`) vorhanden ist und im Abschnitts-Opener `## N.1:` als erster Punkt angekündigt wird.

### 1.3 Nahtlose Storyline-Übergänge innerhalb des Kapitels (Nichts darf „vom Himmel fallen“!)
- **Verbot unmotivierter Theorie-Blöcke:** Kein mathematischer Algorithmus oder API-Baustein darf isoliert ohne direkten Bezug zur unmittelbar vorherigen Folie starten.
- **Die Problem-Lösungs-Brücke:** Starte immer beim Stand der vorherigen Folie und stelle die natürliche nächste Frage des Entwicklers (*„Welches konkrete Problem tritt auf, wenn wir den bisherigen Stand auf Szenario X anwenden? $\implies$ Lösung Y!“*).

### 1.4 Zielgruppen-Anpassung (Ingenieur-Praxis statt abstrakter Theorie)
- **Keine nackte $\mathcal{O}(\dots)$-Notation ohne konkrete Zahlen:** Jede Komplexitäts-, Speicher- oder Laufzeitaussage muss durch ein **konkretes Zahlenbeispiel** greifbar gemacht werden (z. B. *„Nur 2 Divisionen und 11 gelesene Array-Werte statt 10 Millionen `if`-Vergleiche“* oder *„Halbierungssuche findet den Index unter 10 Mio. Punkten in maximal 24 Vergleichen“*).
- **API-Verankerung:** Abstrakte Begriffe immer zuerst an den konkreten Klassen und Methoden der verwendeten Bibliothek und Projektvorlage festmachen.
- **Frühe Einordnung von Varianten:** Wenn eine Bibliothek oder Methode mehrere Betriebsmodi besitzt, vor den Einzelbeispielen eine klare Gegenüberstellungs-Folie zeigen.

### 1.5 Explizite Konventions- & Schnittstellen-Brücken („Keine stillschweigenden Vorzeichen-, Index- oder Konventionswechsel“)
In technischen Simulationen und Softwaresystemen treffen mathematisch-physikalische Lehrbuchformeln auf konkrete Software- und Hardware-Konventionen. Wann immer sich zwischen zwei Folien, Bibliotheken oder Kapiteln eine Konvention ändert, darf ein Vorzeichenwechsel, eine Indexverschiebung oder eine umgekehrte Reihenfolge **niemals kommentarlos** dastehen, sondern muss durch eine **anschauliche 1-Satz-Eselsbrücke** erklärt werden:
- **Geometrie & Koordinatensysteme:** Linkshändiges Bildschirm-/Canvas-System ($+Y$ nach unten) vs. rechtshändiges 3D-System ($+Y$ nach oben, $+Z$ zum Betrachter $\implies$ *Rechte-Hand-Regel* erklärt Vorzeichenwechsel); Spaltenvektoren vs. Zeilenvektoren; Nullwinkel-Referenzachse ($0^\circ$ auf $+X$ vs. $+Z$ $\implies$ erklärt $\sin \leftrightarrow \cos$); *„Greife-die-Welt“-Prinzip* (wie Google Maps) beim Kamera-Panning.
- **Speicher & Hardware:** Mehrdimensionale Gitterkoordinate $(x,y)$ vs. linearer 1D-Byte-Offset (`y * stride + x * bytesPerPixel`); logischer Thread-Index vs. physische CPU-Cache-Line (64 Byte, *False Sharing*).
- **Matrizen, Gleichungslöser & Diskretisierung:** Physikalische Knotennummer vs. globaler Freiheitsgrad-Index und reduzierte Systemmatrix nach Streichen gesperrter Randbedingungen; kontinuierliches Zeitintegral vs. diskretes Rechteck-/Trapezintegral.

### 1.6 „Was-passiert-wenn-nicht?“-Erklärung (Counterfactual Scaffolding statt Blackbox-Regeln)
Um Konzepte im Hörsaal einfach und ohne implizites Vorwissen erklärbar zu machen, wird jede Schutzmaßnahme, API-Einstellung oder numerische Erweiterung über den **konkreten Fehlerfall beim Weglassen** motiviert (*„Ohne X passiert konkreter Fehler Y $\implies$ deshalb brauchen wir X!“*):
- *Beispiele:* Ohne Schrittweiten-/CFL-Begrenzung schaukelt sich der Fehler alternierend auf `NaN`/`Infinity` auf; ohne vorallokierten Puffer friert der Garbage Collector die Echtzeit-Anzeige ein; ohne Tiefenpuffer (`GL_DEPTH_TEST`) übermalt der Hintergrund den Vordergrund; ohne Winkel-Clamping entartet das Kreuzprodukt zum Nullvektor (`NaN`); ohne Thread-lokale Reduktion entstehen *Lost Updates*, mit `lock` in der inneren Schleife *Lock Contention*; ohne *Anti-Windup* läuft der Integrator bei Aktor-Sättigung voll; ohne *Zero-Crossing-Bisektion* dringt ein Körper je nach Zeitschritt $\Delta t$ unterschiedlich tief in Hindernisse ein.

### 1.7 Netto-Zeitbudget & Visuelle Mentale Modelle statt Textwüsten
- **Realistischer Folienkorridor (z. B. 40–48 Folien für 100–115 Min. Netto-Vorlesungszeit):** Berechne die Netto-Vorlesungszeit nach Abzug von Showcase, Pause und ggf. Kurztest/Quiz. Vermeide separate Kleinst-Folien für triviale 1-Zeilen-API-Aufrufe.
- **Kein räumlicher oder algorithmischer Mechanismus ohne Kontrast-SVG:** Folien, die eine Transformationsreihenfolge, eine Vektorzerlegung, ein Speicherlayout oder ein numerisches Verfahren erklären, dürfen keine reinen Text-/Formelwüsten sein, sondern nutzen ein maßgeschneidertes SVG (bevorzugt als visueller Direktvergleich *Naiv/Falsch vs. Richtig*).

---

## 2. MARP-Aufbau & Layout-Regeln (`Themen/fhooe.css`)

### 2.1 Kapitel- und Abschnitts-Opener
- **Kapitel-Folie (`# Kapitel N: ...`):**
  - Besitzt `![bg right](./Titelbild.jpg)` ($896 \times 1200\,\text{px}$, 3:4) und exakt den Einleitungssatz: `Dieses Kapitel umfasst die folgenden Abschnitte:`
- **Abschnitts-Folie (`## N.M: ...`):**
  - Besitzt `![bg right](./Illustrationen/Abschnitt_M.jpg)` ($896 \times 1200\,\text{px}$, 3:4, minimalistisch, textfrei) und exakt den Einleitungssatz: `Dieser Abschnitt umfasst die folgenden Inhalte:`

### 2.2 Mehrspaltiges Layout (`flex-grow`-Gewichte!) & reine Bildsyntax
- Spalten werden über `<div class="columns">` und die CSS-Klassen `one`, `two`, `three`, `four`, `five`, `six` definiert.
- **Wichtig (`fhooe.css`):** Die Klassennamen `one` bis `six` sind **KEINE Spaltennummern**, sondern **relative `flex-grow`-Breitengewichte** (`flex-grow: 1` bis `6` bei `flex-basis: 1rem`)!
  - Zwei gleich breite Spalten (50 % / 50 %): `<div class="two">...</div>` + `<div class="two">...</div>`.
  - Asymmetrischer Split 40 % Text links / 60 % Grafik rechts: `<div class="two">...</div>` + `<div class="three">...</div>` (Verhältnis $2 : 3$).
  - Asymmetrischer Split 33 % schmale Spalte / 67 % breite Spalte: `<div class="one">...</div>` + `<div class="two">...</div>` (Verhältnis $1 : 2$).
- **Reine Markdown-Bildsyntax:** Niemals `w:`, `h:`, `width:`, `height:` oder `center` im Markdown-Alt-Text verwenden! Immer `![](./Diagramme/Name.svg)` schreiben – das CSS-Theme skaliert Bilder automatisch auf 100 % Spaltenbreite.

---

## 3. Variablen-Konsistenz & Didaktische Abdeckung (`lint:variables`)

Jede Folie muss die 4 Regeln des Variablen-Linters (`Skripte/lint_variable_consistency.js`) erfüllen:
1. **Regel 1 (SVG $\to$ Text):** Alle mathematischen Symbole/Variablen in einem SVG-Diagramm müssen im Folientext (bzw. Abschnitt) benannt und eingeführt werden.
2. **Regel 2 (Halbseitiger Code $\to$ Text):** Alle Variablen-, Parameter- und Methodennamen in zweispaltigen Code-Blöcken müssen im erklärenden Text derselben Folie genannt werden.
3. **Regel 3 (Ganzseitiger Code):** Variablen in ganzseitigen Code-Listings müssen auf derselben Folie (z. B. in einer kurzen Bullet-Zeile unter dem Code-Block) oder auf den vorangehenden Folien des Abschnitts eingeführt sein.
4. **Regel 4 (Textformel $\to$ SVG/Code):** Mathematische Variablen im Text einer Diagramm-/Code-Folie müssen auch im begleitenden SVG oder Code vorkommen.

---

## 4. Verbindlicher Prüf-Workflow nach jeder Folien-Änderung

Nach jeder Bearbeitung einer `Folien.md` für Kapitel `XX` müssen folgende Skripte fehlerfrei (Exit-Code 0) durchlaufen:
```powershell
npm run lint:sections:XX
npm run lint:variables:XX
npm run lint:svg:XX
npm run lint:slides:XX
npm run export:pdf:XX
```
- **Optionale Anhang-Foliensätze (`Folien_Anhang_*.md`):** Ebenfalls mit `node Skripte/lint_slides_dom.js <Pfad> --skip-schema` auf 0 Layout-Fehler prüfen.
- **Hinweis bei Windows Dateisperren:** Falls `edit_file` auf `Folien.md` kurzzeitig `user-mapped section open` meldet (durch VS Code / Marp Preview), den Edit-Aufruf einfach einmal wiederholen.
- **Keine `%20` URL-Kodierung in SVG-Bildpfaden:** Verwende in `Folien.md` niemals URL-kodierte Leerzeichen wie `![](./Diagramme/Mein%20Bild.svg)`, sondern immer Unterstrich-Dateinamen (`![](./Diagramme/Mein_Bild.svg)`).
- **Ein-Befehl-pro-Zeile in Codeblöcken & `*(Deep Dive)*`-Kennzeichnung:** Packe für maximale Hörsaal-Lesbarkeit keine mehreren Statements mit Semikolon `;` in dieselbe Zeile. Wenn Code auf einer Folie gezeigt wird, der in der Vorlage bereits fertig implementiert ist und eine abweichende Bibliotheks-Konvention nutzt, kennzeichne den Folientitel explizit mit `*(Deep Dive – fertig in der Vorlage)*`.
