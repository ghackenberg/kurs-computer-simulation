---
name: vorlesungsfolien-didaktik
description: >-
  Didaktische, strukturelle und technische Regeln für das Erstellen, Überarbeiten und Prüfen
  von MARP-Vorlesungsfolien (Folien/**/Folien.md) im Kurs Systemsimulation / Digitaler Zwilling.
  IMMER aktivieren, wenn Folien.md gelesen, geplant, erstellt oder editiert wird.
---

# Skill: Vorlesungsfolien & Didaktik (`Folien/**/Folien.md`)

Dieser Skill definiert die verbindlichen didaktischen und technischen Standards für alle MARP-Foliensätze im Kurs *Systemsimulation / Digitaler Zwilling* (B.Sc. Automatisierungstechnik, 5. Semester, FH OÖ Campus Wels).

---

## 1. Didaktische Grundprinzipien & Storyline

### 1.1 Der verbindliche 3-Schritt-Rhythmus (Visual First!)
Wenn ein neuer Diagrammtyp, ein Algorithmus oder ein Architekturbaustein eingeführt wird, gilt strikt diese Reihenfolge über aufeinanderfolgende Folien (niemals alles auf eine einzige Folie quetschen!):
1. **Schritt 1 – `Anwendungsbeispiel ...` (Was sieht der Ingenieur?):**
   - Zeigt zuerst das **fertige visuelle Ergebnis** (echter Plot-Screenshot / MSAGL-Grafik rechts in `<div class="three">`) und erklärt links (`<div class="two">`) den konkreten Anwendungsfall und Ingenieur-Nutzen (z. B. Motorkennfeld, Kamm'scher Kreis, Ausreißer-Erkennung).
2. **Schritt 2 – `Blick unter die Haube: ...` (Wie funktioniert es intern?):**
   - Erklärt die interne Datenstruktur, Zeichenlogik oder mathematische Reduktion mit einer klaren, maßgeschneiderten SVG-Schemazeichnung (`./Diagramme/..._Illu.svg` rechts in `<div class="two">`).
3. **Schritt 3 – `Der C#-Code zu ...` (Wie programmiert man es?):**
   - Eine dedizierte, luftige Code-Folie (entweder ganzseitig oder zweispaltig mit kurzer Erklärung), die exakt zeigt, wie das Beispiel in C# (`.NET` / `WPF` / `ScottPlot 5` / `MSAGL` / `Math.NET`) umgesetzt wird.

### 1.2 Verbindlicher Kapitel-Einstieg: Rückblick, Engpass-Brücke & Einordnung ins große Ganze
Jedes Kapitel ab Kapitel `01` (und insbesondere ab Kapitel `02` unmittelbar nach Folie 2 `Live-Showcase & Code-Defense: Termin XX` und der Abschnittsfolie `## N.1: ...`) **MUSS** zu Beginn von Abschnitt `N.1` die Studierenden dort abholen, wo der letzte Termin aufgehört hat, und das neue Kapitel in das große Ganze des Semesters einordnen:
1. **Die Pflicht-Folie `### Rückblick & Brücke: ...` (1. Inhaltsfolie in Abschnitt `N.1`):**
   - **Rückblick auf die bisherigen Termine:** Was haben wir im vorigen Termin (bzw. in den bisherigen Terminen) gelernt und in der Hausübung gebaut?
   - **Der konkrete Engpass / die Grenze des bisherigen Werkzeugs:** An welcher konkreten Ingenieurfrage scheitert das Werkzeug aus dem letzten Termin heute? (z. B. T02 `WriteableBitmap` kennt keine klickbaren Stäbe/Geometrien $\implies$ T03 `WPF Canvas`; T03 `Canvas` hat keine fertigen Achsen/Ticks/Auto-Scaling $\implies$ T04 `ScottPlot`; T07 Statik $\sum\vec{F}=\mathbf{0}$ kennt keine Massenträgheit/Bewegung $\implies$ T08 ODEs $\dot{\mathbf{x}}=\mathbf{f}$; T08 kontinuierlicher $\Delta t$-Solver rechnet Millionen Leerschritte bei Logistik-Warteschlangen $\implies$ T09 Ereignisdiskrete Simulation DES; T08 + T09 einzeln scheitern bei Systemen mit harten Anschlägen/Abtastung $\implies$ T10 Hybride Systeme).
   - **Einordnung ins große Ganze (Semester-Architektur):** Wo steht das heutige Kapitel im Gesamtbaukasten des Digitalen Zwillings (Visualisierungs-Säulen T02–T05 $\to$ Multithreading-Scharnier T06 $\to$ 4 Modellierungs-Paradigmen T07–T10) und wie greift es auf Vorwissen zurück?
2. **Automatische Linter-Prüfung (`npm run lint:sections`):**
   - `Skripte/lint_section_slides.js` prüft für alle Kapitel `01` bis `10`, dass in Abschnitt `N.1` eine Einstiegsfolie mit dem Titel `### Rückblick & Brücke:` (bzw. `### Einordnung & Rückblick:`) vorhanden ist und im Abschnitts-Opener `## N.1:` als erster Punkt angekündigt wird.

### 1.3 Nahtlose Storyline-Übergänge innerhalb des Kapitels (Nichts darf „vom Himmel fallen“!)
- **Verbot unmotivierter Theorie-Blöcke:** Kein mathematischer Algorithmus (wie Welford, Binärsuche, Cholesky oder Bisektion) darf isoliert ohne direkten Bezug zur unmittelbar vorherigen Folie starten.
- **Die Problem-Lösungs-Brücke:** Starte immer beim Stand der vorherigen Folie und stelle die natürliche nächste Frage des Entwicklers:
  - *Positivbeispiel (Kapitel 04 – Welford):* Auf Folie 49 rollt die nackte `DataStreamer`-Kurve $\to$ Folie 50: *„Woran erkennt der Bediener einen Alarm? Wir brauchen optische Leitplanken (`HorizontalLine`). Fall 1: Starre Grenze aus Datenblatt. Fall 2: Prozessabhängige Grenze (`Mean ± 3·StdDev`) live lernen.“* $\to$ Folie 51: *„Dilemma bei Fall 2: Unser `DataStreamer`-Ringpuffer vergisst alles nach 500 Punkten! Wie berechnen wir `Mean` und `StdDev` über Millionen Punkte ohne RAM-Explosion? $\implies$ Zwei-Gedächtnis-Architektur mit Welford!“*

### 1.4 Zielgruppen-Anpassung (Automatisierungstechnik statt Theoretischer Informatik)
- **Keine nackte $\mathcal{O}(\dots)$-Notation ohne konkrete Zahlen:** Studierende der Automatisierungstechnik kennen die Landau-Notation nicht aus dem Effeff. Jede Komplexitätsangabe muss durch ein **konkretes Zahlenbeispiel** greifbar gemacht werden:
  - Statt nur $\mathcal{O}(1)$ beim `Signal`-Clipping: *„Dreisatz-Division `i = (5.000 - t_0) / 0.001 = 5000`: Nur 2 Divisionen und 11 gelesene Array-Werte statt 10 Millionen `if`-Vergleiche!“*
  - Statt nur $\mathcal{O}(\log_2 N)$ bei `SignalXY`: *„Halbierungssuche findet den Startindex unter 10 Mio. Punkten in maximal 24 Vergleichen.“*
- **API-Verankerung:** Abstrakte Begriffe wie „Vektor-Pfad“ oder „Raw-Pixel-Backend“ immer zuerst an den konkreten Klassen der verwendeten Bibliothek festmachen (z. B. `SKPath`, `SKBitmap`, `SKCanvas` bei SkiaSharp unter `ScottPlot 5`).
- **Frühe Einordnung von Varianten:** Wenn eine Bibliothek mehrere Betriebsmodi hat (z. B. `MSAGL`: hierarchisches `SugiyamaLayoutSettings` vs. organisches `MdsLayoutSettings`), vor den Einzelbeispielen eine klare Gegenüberstellungs-Folie zeigen.

### 1.5 Explizite Konventions- & Schnittstellen-Brücken („Keine stillschweigenden Vorzeichen-, Index- oder Konventionswechsel“)
In jeder Simulation treffen mathematisch-physikalische Lehrbuchformeln auf konkrete Software- und Hardware-Konventionen. Wann immer sich zwischen zwei Folien, Bibliotheken oder Terminen eine Konvention ändert, darf ein Vorzeichenwechsel, eine Indexverschiebung oder eine umgekehrte Reihenfolge **niemals kommentarlos** dastehen, sondern muss durch eine **anschauliche 1-Satz-Eselsbrücke** erklärt werden:
- **Geometrie & Koordinatensysteme (T02/T03/T05):** Linkshändiges Pixel-/Canvas-System ($+Y$ nach unten) vs. rechtshändiges 3D-OpenGL-System ($+Y$ nach oben, $+Z$ zum Betrachter $\implies$ *Rechte-Hand-Regel* erklärt das Minuszeichen bei $z = -L\sin\theta$); Spaltenvektoren (OpenGL) vs. Zeilenvektoren (`.NET System.Numerics`); Nullwinkel-Referenzachse ($0^\circ$ auf $+X$ beim Roboter vs. $+Z$ bei der Orbit-Kamera $\implies$ erklärt $\sin\theta \leftrightarrow \cos\theta$); *„Greife-die-Welt“-Prinzip* (wie Google Maps) beim Kamera-Panning.
- **Speicher & Hardware (T02/T06):** 2D-Gitterkoordinate $(x,y)$ vs. 1D-Byte-Offset `y * stride + x * 4` (`Bgra32` in Little-Endian); logischer Thread-Index vs. physische 64-Byte-CPU-Cache-Line (*False Sharing* in T06).
- **Matrizen & Solver (T07/T08/T09):** Physikalische Knotennummer vs. globaler Freiheitsgrad-Index $(2i, 2i+1)$ und reduzierte Matrix $\mathbf{K}_{ff}$ nach Streichen gesperrter Lager (T07); kontinuierliches Zeitintegral $\frac{1}{T}\int L(t)\,\mathrm{d}t$ vs. diskretes Ereignis-Rechteckintegral `areaUnderL += L * dt` (T09).

### 1.6 „Was-passiert-wenn-nicht?“-Erklärung (Counterfactual Scaffolding statt Blackbox-Regeln)
Um Konzepte im Hörsaal einfach und ohne Vorwissen erklärbar zu machen, wird jede Schutzmaßnahme, API-Einstellung oder numerische Erweiterung über den **konkreten Fehlerfall beim Weglassen** motiviert (*„Ohne X passiert Fehler Y $\implies$ deshalb brauchen wir X!“*):
- *Beispiele über alle Termine:* Ohne CFL-Begrenzung ($s \le 0{,}25$) schaukelt sich das Vorzeichen auf `NaN` auf (T02); ohne vorallokierten Ringpuffer friert der GC die UI ein (T04); ohne `GL_DEPTH_TEST` übermalt der Hintergrund den Vordergrund, ohne `GL_COLOR_MATERIAL` bleibt bei aktivem Licht alles grau, ohne $\phi$-Clamping wird $\vec{f}\times\vec{e}_{\text{up}}=\vec{0}$ (T05); ohne Thread-lokale Reduktion entstehen *Lost Updates*, mit `lock` *in* der Schleife *Lock Contention* (T06); ohne Lager-Streichen ist $\mathbf{K}$ singulär (T07); ohne *Anti-Windup* läuft der I-Regler bei Sättigung voll (T08); ohne *Zero-Crossing-Bisektion* dringt der Ball je nach $\Delta t$ unterschiedlich tief in den Boden ein (T10).

### 1.7 Netto-Zeitbudget (100 / 115 Min.) & Visuelle Mentale Modelle statt Textwüsten
- **Realistischer Folienkorridor (40–48 Folien):** Nach Abzug von Live-Showcase (20 Min.), Pause (15 Min.) und ggf. Moodle-Quiz (15 Min. an T03, T05, T08, T10) verbleiben **100 bis 115 Minuten Netto-Vorlesungszeit**. Vermeide separate Kleinst-Folien für triviale 1-Zeilen-API-Aufrufe.
- **Kein räumlicher oder algorithmischer Mechanismus ohne Kontrast-SVG:** Folien, die eine Transformationsreihenfolge ($\mathbf{T}\cdot\mathbf{R} \neq \mathbf{R}\cdot\mathbf{T}$), eine Vektorzerlegung, ein Speicherlayout oder ein Solver-Prinzip erklären, dürfen keine reinen Text-/Formelwüsten sein, sondern nutzen ein maßgeschneidertes SVG (bevorzugt als Direktvergleich *Naiv/Falsch vs. Richtig*).

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
  - Zwei gleich breite Spalten (50 % / 50 %): `<div class="one">...</div>` + `<div class="one">...</div>` (oder zweimal `class="two"`).
  - Asymmetrischer Split 40 % Text links / 60 % großer Plot rechts: `<div class="two">...</div>` + `<div class="three">...</div>` (Verhältnis $2 : 3$).
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
- **Hinweis bei Windows Dateisperren:** Falls `edit_file` auf `Folien.md` kurzzeitig `user-mapped section open` meldet (durch VS Code / Marp Preview), den Edit-Aufruf einfach einmal wiederholen.
- **Keine `%20` URL-Kodierung in SVG-Bildpfaden:** Verwende in `Folien.md` niemals URL-kodierte Leerzeichen wie `![](./Diagramme/Mein%20Bild.svg)`, da `fs.existsSync` in `lint_variable_consistency.js` sonst die Datei auf der Festplatte nicht findet. Nutze stattdessen immer Unterstrich-Dateinamen (`![](./Diagramme/Mein_Bild.svg)`).
- **Ein-Befehl-pro-Zeile in C#-Codeblöcken & `*(Deep Dive)*`-Kennzeichnung:** Packe für maximale Hörsaal-Lesbarkeit keine mehreren C#-Statements mit Semikolon `;` in dieselbe Zeile. Wenn C#-Code auf einer Folie gezeigt wird, der in der Vorlage bereits fertig implementiert ist und eine abweichende Bibliotheks-Konvention nutzt (wie Zeilenvektoren in `System.Numerics.Matrix4x4`), kennzeichne den Folientitel explizit mit `*(Deep Dive – fertig in der Vorlage)*`.
