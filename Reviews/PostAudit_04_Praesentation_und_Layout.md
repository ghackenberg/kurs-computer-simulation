# Post-Audit Review: Präsentationstechnik, MARP-Layout & Visuelle Ergonomie

**Vorlesung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (5./6. Semester)  
**Institution:** FH Oberösterreich, Campus Wels  
**Dozent:** Dr. Georg Hackenberg  
**Gegenstand:** Vollständiger Re-Audit aller 12 Foliensätze (`Folien/00_Prolog` bis `Folien/11_Epilog`, 523 Folien inkl. 4 Leerfolien) nach Umsetzung der Phasen 1 bis 4  
**Audit-Datum:** Oktober 2026  
**Status:** Post-Refactoring Audit (Vergleich mit Initial-Review `04_Praesentation_und_Layout.md`)

---

## 1. Executive Summary & Fortschrittsbilanz

Im Rahmen des vorangegangenen Initial-Audits (`Reviews/04_Praesentation_und_Layout.md`) wurden gravierende typografische und layout-technische Mängel festgestellt: 16 überlange Codeblöcke (>20 Zeilen), 27 Codezeilen mit horizontalem Überlauf (>80 Zeichen), 14 externe Web-Grafiken mit akutem Offline-Ausfallrisiko (Hotlinking), 3 defekte Bildpfade (404-Fehler), fehlerhafte UTF-8 BOMs sowie inkonsistente Header- und Datumsangaben.

Durch die nachfolgend durchgeführten Optimierungsphasen (Phase 1: Sofortmaßnahmen & Medien-Lokalisierung; Phase 4: Folien-Code-Splitting und Quellcode-Harmonisierung) wurde der Foliensatz einer tiefgreifenden technischen und didaktischen Härtung unterzogen.

### Zentrale Resultate des Post-Audits:
1. **Vollständige Eliminierung der "Code-Block-Krise":**
   - **Codeblöcke > 20 Zeilen:** Von **16 auf 0** gesenkt (-100%). Kein einziger Codeblock im gesamten Kurs überschreitet mehr das vertikale Limit von 16 Zeilen.
   - **Codezeilen > 80 Zeichen:** Von **27 auf 0** gesenkt (-100%). Kein horizontaler Code-Umbruch mehr im 2-Spalten-Layout.
2. **Robuste Offline- und Pfad-Sicherheit:**
   - **Broken Images (404):** Von **3 auf 0** behoben (-100%). Alle lokalen Pfade existieren und sind erreichbar.
   - **Externes Hotlinking:** Von **14 auf 0** eliminiert (-100%). Alle Grafiken wurden lokalisiert und als native SVGs oder hochauflösende Rasterbilder im Repository abgelegt.
3. **Encoding & Frontmatter-Standardisierung:**
   - **UTF-8 BOM:** Von **3 auf 0** behoben. Alle 12 Kapitel nutzen striktes UTF-8 ohne BOM.
   - **Header & Footer:** 100% harmonisiert; veraltete Datumsangaben (`2025-12-05`) wurden restlos entfernt; alle Header sind konsistent als `'Kapitel N: ...'` deklariert.
4. **Verbleibende Schwachstellen im Fokus dieses Post-Audits:**
   - **4 Geisterfolien in Kapitel 07:** Durch doppelte MARP-Trennstriche (`--- \n ---`) werden in Kapitel 07 vier komplett weiße, leere Folien gerendert.
   - **Theme-Logo-Überdeckung auf Titelfolien:** In `Themen/fhooe.css` schließt die Selektor-Regel zwar `.title` und `.lead` aus (`section:not(.title):not(.lead)::before`), da die Titelfolien jedoch keine Scoped Directive `<!-- _class: title -->` besitzen, wird das blaue FH-Logo-Quadrat (4.5rem) auf Folie 1 jedes Kapitels über das rechte Eck des Titelbildes gezeichnet.
   - **4 verbliebene ASCII-Art-Diagramme:** In den Kapiteln 02, 03 und 05 existieren noch 4 ungetaggte Code-Kästen mit ASCII-Zeichnungen, die durch Vektorgrafiken ersetzt werden sollten.
   - **27 Low-Res-Grafiken (< 800 $\times$ 600):** Historische Screenshots und Tafelbilder sind auf 4K-Beamern leicht unscharf.

---

## 2. Quantitative Vergleichsmatrix (Vorher vs. Nachher)

| Metrik / Qualitätskriterium | Initial-Audit (Status Quo Ante) | Post-Audit (Aktueller Stand) | Delta / Trend |
|:---|---:|---:|:---:|
| **Gesamtzahl Folien** | 509 | 523 (519 aktiv + 4 Geisterfolien) | +14 Folien (Code-Splitting) |
| **Codeblöcke > 20 Zeilen** | 16 | **0** | **-100% (Gelöst)** |
| **Codeblöcke 16–20 Zeilen** | 26 | 35 (alle exakt 16 Zeilen) | Kontrolliertes Splitting |
| **Codezeilen > 80 Zeichen** | 27 | **0** | **-100% (Gelöst)** |
| **Spaltenfolien (`div.columns`)** | 221 | 225 | +4 ergonomische Spalten |
| **Externe Web-Grafiken (Hotlinks)** | 14 | **0** | **-100% (Gelöst)** |
| **Defekte Bildpfade (404)** | 3 | **0** | **-100% (Gelöst)** |
| **Low-Res Bilder (< 800x600)** | 27 | 27 | Unverändert (Legacy-Assets) |
| **UTF-8 Byte Order Mark (BOM)** | 3 von 12 | **0 von 12** | **-100% (Gelöst)** |
| **Inkonsistente Header / Datumsreste** | 2 von 12 | **0 von 12** | **-100% (Gelöst)** |
| **Titelfolien ohne Scoped Directives** | 12 von 12 | **0 von 12** | **-100% (Gelöst)** |

### Kapitelbezogene Detail-Aufschlüsselung im Post-Audit

| Kapitel | Folien (aktiv/leer) | Code >20 Z. | Code 16 Z. | Zeilen >80 Z. | Spaltenfolien | Ext. Links | Broken Img | Low-Res (<800x600) | Notizen (Zeilen / TODOs) |
|:---|---:|---:|---:|---:|---:|---:|---:|---:|:---|
| **00 Prolog** | 13 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 Z. / 0 TODOs |
| **01 Einführung** | 35 / 0 | 0 | 0 | 0 | 19 | 0 | 0 | 7 | 0 Z. / 0 TODOs |
| **02 2D-Pixel** | 29 / 0 | 0 | 4 | 0 | 7 | 0 | 0 | 1 | 15 Z. / 7 TODOs |
| **03 2D-Vektor** | 32 / 0 | 0 | 4 | 0 | 9 | 0 | 0 | 0 | 7 Z. / 5 TODOs |
| **04 2D-Diagramme** | 28 / 0 | 0 | 3 | 0 | 9 | 0 | 0 | 1 | 5 Z. / 5 TODOs |
| **05 3D-OpenGL** | 69 / 0 | 0 | 7 | 0 | 36 | 0 | 0 | 8 | 13 Z. / 11 TODOs |
| **06 Multithreading** | 23 / 0 | 0 | 0 | 0 | 12 | 0 | 0 | 0 | 3 Z. / 3 TODOs |
| **07 Statische Modelle** | 58 / **4 leer** | 0 | 1 | 0 | 20 | 0 | 0 | 2 | 2 Z. / 0 TODOs |
| **08 Dynamik Kontinuierlich** | 72 / 0 | 0 | 7 | 0 | 34 | 0 | 0 | 5 | 22 Z. / 0 TODOs |
| **09 Dynamik Diskret** | 62 / 0 | 0 | 4 | 0 | 26 | 0 | 0 | 3 | 8 Z. / 6 TODOs |
| **10 Dynamik Hybrid** | 71 / 0 | 0 | 4 | 0 | 31 | 0 | 0 | 0 | 7 Z. / 5 TODOs |
| **11 Epilog** | 31 / 0 | 0 | 1 | 0 | 22 | 0 | 0 | 0 | 9 Z. / 7 TODOs |
| **Gesamtkurs** | **523 / 4** | **0** | **35** | **0** | **225** | **0** | **0** | **27** | **91 Z. / 49 TODOs** |

---

## 3. Visuelle Balance & Foliendichte

### 3.1 Prüfung auf "Thin Slides" nach dem Code-Splitting
Eine Kernbefürchtung beim Code-Splitting bestand darin, dass durch die Aufteilung zu magere Folien ("Thin Slides") entstehen könnten, auf denen lediglich 1–2 Codezeilen oder isolierte Satzfragmente verloren auf der Leinwand stehen.

**Befund:**  
- **Keine didaktisch verarmten Thin Slides:** Die systematische Zählung von Wortdichte und Codezeilen zeigt, dass die Aufteilung stets semantisch motiviert vorgenommen wurde (z.B. Folie A: Schnittstellendeklaration/Properties, Folie B: Berechnungs- und Lifecycle-Methoden).
- Es gibt **keine einzige Folie** mit weniger als 4 Zeilen Code ohne begleitenden Kontext.
- **Die einzigen "Thin Slides" sind 4 unbeabsichtigte Geisterfolien in Kapitel 07:**
  - Folie 8 (Zeile 108–109): Leere Folie zwischen "Fragestellungen an das Modell" und Abschnitt 7.2.
  - Folie 20 (Zeile 307–308): Leere Folie zwischen "Iterative Löser" und Abschnitt 7.3.
  - Folie 35 (Zeile 527–528): Leere Folie vor Abschnitt 7.4.
  - Folie 57 (Zeile 991–992): Leere Folie vor "Zusammenfassung Kapitel 7".
  *Ursache:* Verdopplung des Markdown-Trenners (`--- \n ---`).

### 3.2 Prüfung auf vertikalen Überlauf ("Dense / Overflow Slides")
Bei einer MARP-Basisschriftgröße von `1.5rem` (24px), einem `padding: 40px 60px` und standardmäßigem Header/Footer verbleiben vertikal ca. **900 Pixel Nettohöhe** für den Folieninhalt.
Folgende Folientypen wurden auf Überlaufrisiken hin auditiert:

1. **Große mathematische Matrizen (Kapitel 07, Folie 13):**
   - **Titel:** `Gesamtes Gleichungssystem`
   - **Inhalt:** 5-zeilige Blockmatrix $\begin{pmatrix} e_{x,11} & \dots \\ \dots \end{pmatrix} \cdot \vec{S} = -\vec{F}$ plus einleitender Text und 2 Erläuterungs-Aufzählungspunkte.
   - *Prüfung:* Die gerenderte MathJax-Gleichung belegt ca. 240px. Inklusive Überschrift (60px) und Text (150px) summiert sich der Inhalt auf ca. 450px. **Ergebnis:** Kein vertikaler Überlauf, hervorragend zentriert.
2. **Große Tabellen (Kapitel 11, Folie 5):**
   - **Titel:** `Vergleichende Taxonomie der Modellarten`
   - **Inhalt:** 5-zeilige, 6-spaltige Markdown-Tabelle (Modellart, Zeitbasis, Zustandsraum, Gleichungstyp, Primärer Solver, Typische Anwendung).
   - *Prüfung:* Tabellen-Schriftgröße skaliert standardmäßig auf ca. 0.9em; Zeilenabstand ist kompakt. Passt sauber in den Folienbereich.
3. **Kombination aus Text und 16-Zeilen-Code:**
   - Auf 225 Folien wird das Layout konsequent über `<div class="columns">` in zwei Spalten getrennt (Text links, Code rechts). Dadurch addieren sich Text und Code nicht vertikal, sondern teilen sich die horizontale Breite von 1920px auf.
   - Auf keiner Folie stehen mehr als 6 Zeilen Fließtext direkt über einem 16-Zeilen-Codeblock.

---

## 4. Beamer-Tauglichkeit & Lesbarkeit (16:9 / Full HD 1080p)

### 4.1 Typografie, Kontraste & Spalten-Abstände

```css
/* Auszug aus Themen/fhooe.css */
section {
    position: relative;
    font-size: 1.5rem;      /* 24px: Exzellente Lesbarkeit aus 10-15m Entfernung */
    padding: 40px 60px;
}

section pre {
    font-size: 0.72em;     /* 17.3px: Monospace-Skalierung für Codeblöcke */
    line-height: 1.35;     /* 23.3px Zeilenabstand */
    max-height: 500px;
    overflow-x: auto;
    border-radius: 4px;
}

section div.columns {
    display: flex;
    flex-direction: row;
    align-items: flex-start; /* Saubere Bündigkeit an der Oberkante */
    gap: 30px;               /* 30px Abstand zwischen Spalten */
}
```

- **Kontraste:** Schwarzer/Dunkelgrauer Text (`#333333`) auf weißem Hintergrund (`#ffffff`) gewährleistet nach WCAG AAA ein Kontrastverhältnis von > 12:1. Selbst bei schwachem Beamerlicht im nicht vollständig abgedunkelten Hörsaal bleibt der Text kontraststark.
- **Code-Lesbarkeit:**
  - Mit `0.72em` (17.3px) und Monospace-Schriftart (`Consolas`, `Cascadia Code`) benötigt ein Zeichen ca. 10.4px Breite.
  - Eine maximale Zeilenbreite von 78 Zeichen im 2-Spalten-Layout (Breite einer Spalte ca. 870px) benötigt ca. 811px. **Ergebnis:** Kein Codezeilen-Umbruch, kein horizontales Scrollen.
- **Spaltenbündigkeit (`align-items: flex-start`):** Die frühere Schwachstelle (vertikale Zentrierung kurzer Texte neben hohen Bildern) wurde durch `align-items: flex-start;` vollständig gelöst. Beide Spalten beginnen bündig an der Unterkante des Headers.

### 4.2 Lesbarkeit von Diagrammen (SVG, Mermaid, PNG)

- **Vektorgrafiken (SVG):** 
  - Nahezu alle Architektur- und Ablaufdiagramme (z.B. in Kapitel 08, 09, 10 und dem neu strukturierten Kapitel 11) liegen als native SVGs vor.
  - Diese skalieren verlustfrei auf beliebige Auflösungen (Full HD 1080p bis 4K UHD 2160p).
  - Schriftgrößen in TikZ- und Mermaid-Grafiken liegen typischerweise bei 12–14pt, was bei 1080p-Projektion einer Buchstabenhöhe von mindestens 20–25px entspricht und somit aus den hinteren Hörsaalreihen gut lesbar ist.
- **Ultra-Wide Screenshots in Kapitel 05 (Folien 49, 51, 53):**
  - Die Screenshots der 3D-Geometriebeispiele (`BeispielWürfel3D`, `BeispielKugel3D`, `BeispielZylinder3D`) stammen von einem 21:9 Ultra-Wide-Monitor (**3440 $\times$ 1368 Pixel**).
  - Da sie auf einer Einzelfolie ohne Breitenbegrenzung (`w:...`) eingebunden sind, füllen sie die Folienbreite zu 100% aus. Bei 16:9-Projektion führt dies zu einer Bildhöhe von ca. 715px, was die Folie fast bis zum Footer ausfüllt.
  - *Empfehlung:* Einbettung mit `![w:1200px]` oder im 2-Spalten-Layout mit beschreibendem Merksatz links.
- **Low-Res-Grafiken (27 Fundstellen):**
  - **7 Bilder in Kapitel 01:** Illustrationen aus der Kurshistorie mit $650 \times 650$ bzw. $700 \times 1024$ Pixeln.
  - **9 Bilder in Kapitel 05 (Folien 22–26):** Screenshots der OpenGL-Primitive (`Points`, `Lines`, `Triangles`, etc.) mit nur $510 \times 435$ Pixeln. Auf großen Hörsaalleinwänden wirken die Punkt- und Linienraster leicht verwaschen.
  - **1 Bild in Kapitel 02 (Folie 27):** `Heatmap_Temperaturfeld.png` mit $400 \times 300$ Pixeln.

### 4.3 Header, Footer, Paginierung & Folientitel

- **Paginierung:** Alle 12 Deckblätter deklarieren nun vorbildlich Scoped Directives:
  ```markdown
  <!-- _paginate: false -->
  <!-- _header: "" -->
  <!-- _footer: "" -->
  ```
  Dadurch ist das Deckblatt frei von redundanten Kopfzeilen und trägt nicht mehr die störende Foliennummer "1".
- **Header-Konsistenz:** Alle 12 Kapitel nutzen einheitliche Kapitelkopfzeilen ohne veraltete Vorlesungsdaten.
- **Folientitel:**
  - Jede Inhaltsfolie (abgesehen von den 4 Geisterfolien in Kapitel 07) besitzt eine eindeutige `###`-Überschrift.
  - Die im Initial-Audit vermisste Überschrift auf Folie 32/33 in Kapitel 10 (`### Softwarearchitektur: Die Basisklasse Block`) ist sauber implementiert.

---

## 5. Konsistenz des FH-Oberösterreich Themes

### 5.1 Farbwerte & Corporate Identity
Das offizielle Corporate Design der Fachhochschule Oberösterreich wird über die CSS-Variable `--fhooe-blue: #004B96;` repräsentiert.
- **Primärfarbe:** `#004B96` (FH-Blau) wird für das Signet-Quadrat, ausgewählte Diagrammelemente und Akzente genutzt.
- **Kontrastfarbe / Akzente:** Weiß (`#ffffff`) für Signet und Icons, Dunkelgrau (`#333333`) für Fließtext, helles Grau/Blau (`#ECECFF`) für Diagrammhintergründe in Mermaid.
- Es wurden keine störenden, abweichenden CI-Farben in den Folien-Markdowns gefunden.

### 5.2 Theme-Architektur: Die Logo-Kollision auf Titelfolien

In `Themen/fhooe.css` wurde das FH-Logo wie folgt definiert:

```css
/* FH-Logo: Nur auf Inhaltsfolien anzeigen, Deckblätter (Title & Lead) schützen */
section:not(.title):not(.lead)::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    width: 4.5rem;
    height: 4.5rem;
    background-color: var(--fhooe-blue);    
    /* Portables SVG-Signet via Data-URI */
    background-image: url("data:image/svg+xml;utf8,...");
    background-repeat: no-repeat;
    background-size: 65%;
    background-position: center;
}
```

#### Das verbleibende Problem:
Obwohl die CSS-Regel `:not(.title):not(.lead)` vorsieht, dass Deckblätter geschützt werden, vergibt MARP die CSS-Klasse `.title` **nicht automatisch** an die erste Folie!  
Da auf den Deckblättern (`Folien/*/Folien.md`, Folie 1) lediglich `<!-- _paginate: false -->`, `<!-- _header: "" -->` und `<!-- _footer: "" -->` gesetzt wurden, fehlt die Richtlinie:
```markdown
<!-- _class: title -->
```
**Die visuelle Folge:**  
Auf **jedem der 12 Deckblätter** wird das $4.5\,\text{rem} \times 4.5\,\text{rem}$ große blaue FH-Logo-Quadrat oben rechts gerendert. Da das Deckblatt rechtsbündig ein ganzflächiges Hintergrundbild (`![bg right](./Titelbild.jpg)`) besitzt, wird das Titelbild in der oberen rechten Ecke unschön überdeckt!  
Ebenso verhält es sich bei Abschnittstrennern (`##`), die ein `![bg right]` besitzen (wie in Kapitel 01, 09, 10).

#### Die saubere Lösung:
Entweder wird auf allen 12 Titelfolien die Direktive `<!-- _class: title -->` ergänzt, oder `Themen/fhooe.css` wird um einen robusten strukturellen Selektor erweitert:
```css
/* Deckblätter und Folien mit Hintergrundbild rechts vom Logo befreien */
section:first-of-type::before,
section.title::before,
section.lead::before {
    display: none !important;
}
```

---

## 6. Verbleibende Mängel & visuelle Schwachstellen

### 6.1 Die 4 Geisterfolien in Kapitel 07 (Statische Modelle)
- **Folie 8** (nach Zeile 108): Leerfolie vor `## 7.2`.
- **Folie 20** (nach Zeile 307): Leerfolie vor `## 7.3`.
- **Folie 35** (nach Zeile 527): Leerfolie vor `## 7.4`.
- **Folie 57** (nach Zeile 991): Leerfolie vor `# Zusammenfassung Kapitel 7`.
*Ursache:* Im Markdown stehen unmittelbar aufeinanderfolgende Trennlinien:
```markdown
---
---
## 7.2: Das ideale Fachwerk in 2D
```
*Lösung:* Jeweils die redundante `---`-Zeile löschen.

### 6.2 Die 4 verbliebenen ASCII-Art-Blöcke (Kapitel 02, 03, 05)
Während in Kapitel 11 alle früheren ASCII-Kästen erfolgreich in Vektorgrafiken überführt wurden, sind in drei früheren Kapiteln noch ungetaggte ASCII-Diagramme vorhanden:

1. **Kapitel 02, Folie 19 (Zeile 389–399):**
   ```text
   Normierter Wert u ∈ [0, 1]
            │
            ▼
     Index = (int)(u * 255)
            │
            ▼
    ┌───────────────┐
    │ LUT[Index]    │ ➔ 0xAARRGGBB
    └───────────────┘
   ```
2. **Kapitel 02, Folie 24 (Zeile 496–502):**
   ```text
             T(i, j+1)
                 │
   T(i-1, j) ── T(i, j) ── T(i+1, j)
                 │
             T(i, j-1)
   ```
3. **Kapitel 03, Folie 26 (Zeile 550–556):**
   ```text
   UIElement-Hierarchie (Schwergewicht):
   [Shape] ---> [FrameworkElement] ---> [UIElement] ---> [Visual]

   Leichtgewicht-Hierarchie:
   [DrawingVisual] ------------------------------------> [Visual]
   ```
4. **Kapitel 05, Folie 57 (Zeile 1221–1229):**
   ```text
   BaseNode (Säule)
    └── Rotate (Achse 1: Yaw um Y)
         └── Arm1Node (Zylinder L1)
              └── Translate (Armlänge L1)
                   └── Rotate (Achse 2: Pitch um Z)
                        └── Arm2Node (Zylinder L2)
                             └── ToolCenterPoint (Greifer)
   ```
*Bewertung:* Diese Blöcke besitzen keinen Sprachbezeichner (wirken grau hinterlegt) und fallen optisch gegenüber den ansonsten brillanten SVG-Diagrammen ab. Sie sollten als Mermaid-Diagramme (`flowchart TD` / `flowchart LR`) formuliert werden.

### 6.3 Inkonsistente Bildausstattung bei Abschnittstrennfolien (`##`)
- In den Kapiteln **01, 09 und 10** besitzt jede Abschnittstrennfolie ein maßgeschneidertes KI-generiertes Bild (`![bg right](./Illustrationen/Abschnitt_X.jpg)`).
- In den Kapiteln **02, 03, 04, 05, 06, 07 und 11** sind die Abschnittsfolien rein textuell gehalten (`Bg: []`).
*Empfehlung:* Für eine einheitliche Dramaturgie sollten auch für die übrigen Kapitel Abschnittsbilder generiert werden, oder die Abschnittsfolien werden bewusst als zentrierte `lead`-Folien formatiert.

### 6.4 Typografische und grammatikalische Kleinigkeiten
- **Kapitel 05, Folie 49:** Folientitel lautet `### Darstellung eines **Würfel** mit unterschiedlichen Eigenschaften` $\rightarrow$ Korrektur: `### Darstellung eines **Würfels** mit unterschiedlichen Eigenschaften`.
- **Kapitel 07, Zeile 309:** Nach `## 7.3: Das elastische Fachwerk in 2D` fehlen die Abschnitts-Spiegelstriche ("Dieser Abschnitt umfasst die folgenden Inhalte: ..."). Die Folie springt direkt zur Inhaltsfolie `### Grenzen des idealen Fachwerks`.

---

## 7. Schweregrade & Handlungsoptionen

Die identifizierten Restpunkte werden nach ihrer Auswirkung auf die Vorlesungsdurchführung priorisiert:

### Schweregrad 1: Kritisch (Sofort beheben)
| Nr. | Problem / Mangel | Betroffene Stelle | Konkrete Behebung | Aufwand / Nutzen |
|:---:|:---|:---|:---|:---:|
| **K1** | **4 Geisterfolien (leere Folien)** | `Folien/07_Statische_Modelle/Folien.md` (Z. 108, 307, 527, 991) | Doppelte `---` entfernen. | 2 Min / **Sehr hoch** (Verhindert peinliche Weißfolien im Vortrag) |
| **K2** | **Logo überdeckt Titelbild** | Alle 12 Kapitel (Folie 1) | In `Themen/fhooe.css` `section:first-of-type::before { display: none; }` ergänzen oder `<!-- _class: title -->` auf Folie 1 setzen. | 5 Min / **Sehr hoch** (Makelloses Deckblatt) |

### Schweregrad 2: Mittel (Vor Vorlesungsbeginn optimieren)
| Nr. | Problem / Mangel | Betroffene Stelle | Konkrete Behebung | Aufwand / Nutzen |
|:---:|:---|:---|:---|:---:|
| **M1** | **4 verbliebene ASCII-Art-Blöcke** | Kap. 02 (F. 19, 24), Kap. 03 (F. 26), Kap. 05 (F. 57) | In Mermaid (`flowchart LR`/`TD`) oder SVG überführen. | 30 Min / **Mittel–Hoch** (Professioneller Gesamteindruck) |
| **M2** | **Ultra-Wide Screenshots (3440px)** | Kap. 05 (Folien 49, 51, 53) | Mit `![w:1200px]` begrenzen und zentrieren oder 2-Spalten-Layout nutzen. | 10 Min / **Mittel** (Bessere vertikale Proportionen) |
| **M3** | **Unvollständige Abschnittsfolie 7.3** | Kap. 07 (nach Z. 309) | Agenda-Stichpunkte für Abschnitt 7.3 ergänzen. | 5 Min / **Mittel** (Didaktische Konsistenz) |

### Schweregrad 3: Gering / Kosmetisch (Langfristige Pflege)
| Nr. | Problem / Mangel | Betroffene Stelle | Konkrete Behebung | Aufwand / Nutzen |
|:---:|:---|:---|:---|:---:|
| **G1** | **Leere `Notizen.md`-Dateien** | Kap. 00 und 01 | Didaktische Leitlinien analog zu Kap. 02, 08, 09 ergänzen. | 20 Min / **Gering** (Dozenten-Dokumentation) |
| **G2** | **Low-Res-Grafiken (27 Stück)** | Kap. 01 (7), Kap. 05 (9), Kap. 07 (2), Kap. 08 (5), Kap. 09 (3) | Sukzessiver Re-Export mit höherer Auflösung oder Vektorisierung. | 2 Std / **Gering** (Nur auf 4K relevant) |
| **G3** | **Grammatikfehler im Titel** | Kap. 05, Folie 49 | "Würfel" $\rightarrow$ "Würfels". | 1 Min / **Kosmetisch** |

---

## 8. Fazit & Gesamtnote

Das Vorlesungsmaterial hat durch das vorangegangene Refactoring einen **bemerkenswerten Reifegrad** erreicht:
- Die visuelle Ergonomie auf 16:9 Beamern ist dank der strikten 16-Zeilen-Grenze und der 80-Zeichen-Spaltenbreite exzellent.
- Das Ausfallrisiko durch Hotlinks oder defekte Pfade wurde auf **Null** reduziert.
- Die noch verbleibenden Restarbeiten (Entfernung der 4 Geisterfolien in Kapitel 07 und die Logo-Ausblendung auf den Deckblättern im Theme) erfordern einen Arbeitsaufwand von **weniger als 10 Minuten**, heben die Vorlesung jedoch unmittelbar auf das Niveau einer publizierbaren Hochschul-Referenzreihe.

**Gesamtbewertung Präsentationstechnik:**  
Vor dem Refactoring: **3,2 (Befriedigend / Mangelhaft in Beamer-Ergonomie)**  
Aktueller Stand (Post-Audit): **1,4 (Sehr gut mit minimalen formalen Restpunkten)**
