# Final-Audit Review: Folienlayout, Typografie, Whitespace & Beamer-Ergonomie

**Vorlesung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (5./6. Semester)  
**Institution:** Fachhochschule Oberösterreich, Campus Wels  
**Dozent:** Dr. Georg Hackenberg  
**Gegenstand:** Vollständiger technischer und ergonomischer Deep Audit aller 12 Foliensätze (`Folien/00_Prolog` bis `Folien/11_Epilog`, 532 aktive Folien, 227 eingebettete Grafiken)  
**Audit-Fokus:** Vertikaler Überlauf (Clipping), Whitespace-Balance, Spaltenarchitektur, Theme- & Logo-Integration, Beamer-Tauglichkeit (16:9 Full HD 1080p)  
**Datum:** Oktober 2026  
**Status:** Abgeschlossen – Finaler Prüfbericht

---

## 1. Executive Summary & Gesamteinschätzung

Im Rahmen dieses Abschluss-Audits wurden alle 532 Folien des 12-teiligen Vorlesungswerks einer systematischen typografischen und layouttechnischen Analyse unterzogen. Gegenüber dem Status Quo Ante und den ersten Überarbeitungsstufen zeigen sich signifikante Reifeschritte:
- **Codeblock-Krise vollständig überwunden:** Es existiert im gesamten Kurs kein einziger überlanger Codeblock (>16 Zeilen) und keine einzige horizontale Zeilenüberbreite (>80 Zeichen).
- **Asset-Integrität zu 100% hergestellt:** Alle 227 Bildreferenzen sind lokal vorhanden (0 defekte Pfade / 404-Fehler, 0 externes Hotlinking).
- **Geisterfolien eliminiert:** Die in Kapitel 07 früher vorhandenen 4 Leerfolien wurden restlos beseitigt.
- **ASCII-Art vollständig bereinigt:** Alle historischen Box-Drawing-Diagramme in den Kapiteln 02, 03 und 05 wurden erfolgreich in native SVGs oder typografisch saubere Notationen transformiert.

Trotz dieser massiven Fortschritte offenbart der rigorose Beamer- und Rendering-Audit **zwei systemische Architektur- und Layout-Probleme**, die auf echten 16:9 Full-HD-Projektoren zu spürbaren Darstellungsfehlern führen:

1. **Die „SVG-Seitenverhältnis-Falle“ (Aspect Ratio Trap):**  
   Weil 49 der 82 Diagramm-SVGs hochformatig aufgebaut sind (Verhältnis Höhe zu Breite zwischen $1{,}2$ und $3{,}7$), führt die Verwendung von festen Breitenangaben (z.B. `![w:540]` oder `![w:1000]`) bzw. unbeschränkten Einbindungen in Spalten dazu, dass die Grafiken vertikal bis zu 1.800 Pixel hoch skaliert werden. Bei einer Netto-Folienhöhe von ca. 540 Pixeln wird der untere Teil dieser Diagramme durch `section { overflow: hidden; }` **vollständig abgeschnitten (Clipping)**.
2. **Der „Heading-inside-Column“-Bruch (83 Folien):**  
   Während in den Kapiteln 00–04, 06 und 11 Folienüberschriften (`###`) vorbildlich **vor** `<div class="columns">` platziert sind, deklarieren 83 Folien in den Kapiteln 05, 07, 08, 09 und 10 die Überschrift **innerhalb** der ersten Spalte. Dies führt zu einer asymmetrischen Baseline (Spalte 2 beginnt auf Höhe der H3-Überschrift) und quetscht lange Folientitel in schmale Spalten, wo sie unschön 2- bis 3-zeilig umbrechen.
3. **Persistierende FH-Logo-Überdeckung auf Titelfolien:**  
   Da MARP bei Split-Hintergründen (`![bg right]`) drei `<section>`-Tags generiert, greift der CSS-Selektor `section:first-of-type::before` im Theme nicht auf den Inhalts-Layer. Da auf den 12 Deckblättern `<!-- _class: title -->` fehlt, wird das blaue FH-Logo-Quadrat ($4{,}5\,\text{rem}$) nach wie vor über die rechte obere Ecke jedes Titelbildes gerendert.

### Gesamtbewertung des Layout-Reifegrads

| Audit-Dimension | Bewertung (1–10) | Status | Kernherausforderung |
|:---|:---:|:---:|:---|
| **Typografie & Lesbarkeit** | **9.2 / 10** | Sehr gut | Schriftgrößen (24px Fließtext, 17px Code) optimal; 70 überlange Bullets straffen |
| **Frontmatter & Metadaten** | **9.5 / 10** | Exzellent | Einheitliche Header/Footer, mathematische Engine (MathJax) konsistent |
| **Asset- & Pfadsicherheit** | **10.0 / 10** | Perfekt | 227 von 227 Assets lokal auflösbar; verlustfreie Vektorisierung |
| **Vertikale Begrenzung (Clipping)** | **6.5 / 10** | Verbesserungsbedarf | 12 kritische Folien mit vertikalem Diagramm-Clipping durch Breiten- statt Höhenbeschränkung |
| **Spaltenharmonie & Whitespace** | **7.5 / 10** | Gut | 83 Folien mit Überschriften in Spalte 1 harmonisieren; 41 Textfolien auflockern |
| **Theme- & CI-Integration** | **8.0 / 10** | Gut | Logo-Selektor für MARP-Advanced-Background im Theme härten |
| **GESAMT-LAYOUT-REIFEGRAD** | **8.4 / 10** | **Stabil / Vorreif** | **Mit gezielten Korrekturen (Phase 5) auf 9.8 / 10 anhebbar** |

---

## 2. Dimension 1: Vertical Overflow & Clipping (Tiefenanalyse)

### 2.1 Das geometrische Berechnungsmodell (Full HD 1080p)
MARP rendert Präsentationen im Standardformat $1280 \times 720\,\text{px}$ (16:9). Nach Abzug der im Theme `fhooe.css` definierten Parameter:
- Padding: `padding: 40px 60px;` $\implies 720 - 80 = 640\,\text{px}$
- Header-Höhe inkl. Margin: ca. $45\,\text{px}$
- Footer-Höhe inkl. Margin & Paginierung: ca. $45\,\text{px}$

Verbleibt eine **maximale vertikale Netto-Nutzhöhe von ca. $540\,\text{px}$**.  
Da `Themen/fhooe.css` das Standard-MARP-Verhalten `section { overflow: hidden; }` erbt, führt jeder Inhalt, der $540\,\text{px}$ überschreitet, nicht zu Scrollbalken, sondern wird **am unteren Folienrand unsichtbar abgeschnitten**.

### 2.2 Die „SVG-Seitenverhältnis-Falle“ (Aspect Ratio Trap)
Die quantitative Analyse aller 82 Kurs-SVGs ergab, dass **49 Vektorgrafiken ein Höhen-zu-Breiten-Verhältnis $> 1{,}2$** aufweisen (teilweise bis $3{,}7$).  
Wenn ein solches Diagramm in MARP mit einer festen Breite eingebunden wird (`![w:540]`, `![width:1000px]`) oder in einer Flexbox-Spalte ohne `max-height` liegt, errechnet der Browser die gerenderte Höhe gemäß:
$$\text{Höhe}_{\text{gerendert}} = \text{Breite}_{\text{effektiv}} \cdot \frac{\text{Höhe}_{\text{viewBox}}}{\text{Breite}_{\text{viewBox}}}$$

#### Konkrete Clipping-Befunde (P0 – Kritisch):

| Kapitel | Folie | Diagrammdatei | ViewBox ($B \times H$) | Verhältnis ($H/B$) | Einbindung | Gerenderte Höhe | Verfügbar | Überhang (Clipping) |
|:---|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Kap. 11** | **Slide 4** | `Modellierungsmatrix.svg` | $976 \times 1334$ | $1{,}37$ | `![w:1000]` in Spalte (750px) | **$1.027\,\text{px}$** | $460\,\text{px}$ | **$-567\,\text{px}$ (Untere Hälfte fehlt!)** |
| **Kap. 11** | **Slide 23** | `VIBN_Systemarchitektur.svg` | $276 \times 886$ | **$3{,}21$** | `![w:540]` | **$1.733\,\text{px}$** | $440\,\text{px}$ | **$-1.293\,\text{px}$ (>60% abgeschnitten!)** |
| **Kap. 11** | **Slide 30** | `Simulationsprozess_Synthese.svg` | $276 \times 1022$ | **$3{,}70$** | `![w:540]` | **$1.998\,\text{px}$** | $440\,\text{px}$ | **$-1.558\,\text{px}$ (Fast 75% abgeschnitten!)** |
| **Kap. 05** | **Slide 57** | `Szenengraph_Roboterarm.svg` | $242 \times 862$ | **$3{,}56$** | `![w:520]` | **$1.851\,\text{px}$** | $460\,\text{px}$ | **$-1.391\,\text{px}$ (Roboterbasis abgeschnitten)** |
| **Kap. 07** | **Slide 49** | `Model.svg` | $252 \times 722$ | **$2{,}87$** | `![]` in Spalte (~500px) | **$1.435\,\text{px}$** | $460\,\text{px}$ | **$-975\,\text{px}$ (Klassendiagramm halbiert)** |
| **Kap. 08** | **Slide 45** | `Simulationsschleife_Explizit.svg` | $382 \times 629$ | $1{,}65$ | `![]` in Spalte (~400px) | **$660\,\text{px}$** | $460\,\text{px}$ | **$-200\,\text{px}$ (Schleifenende ragt in Footer)** |
| **Kap. 08** | **Slide 54** | `Algebraische_Schleife_Praxis.svg` | $359 \times 685$ | $1{,}91$ | `![width:1000px]` in Spalte | **$780\,\text{px}$** | $460\,\text{px}$ | **$-320\,\text{px}$ (Schaltplan abgeschnitten)** |
| **Kap. 08** | **Slide 60** | `Simulationsschleife_Implizit.svg` | $523 \times 1010$ | **$1{,}93$** | `![]` in Spalte (~400px) | **$772\,\text{px}$** | $460\,\text{px}$ | **$-312\,\text{px}$ (Konvergenzschleife beschnitten)** |
| **Kap. 09** | **Slide 5** | `Produktionssystem.svg` | $233 \times 661$ | **$2{,}84$** | `![]` in Spalte (~450px) | **$1.278\,\text{px}$** | $460\,\text{px}$ | **$-818\,\text{px}$ (Puffer/Stationen fehlen)** |
| **Kap. 09** | **Slide 6** | `Computernetzwerk.svg` | $369 \times 636$ | $1{,}73$ | `![]` in Spalte (~450px) | **$778\,\text{px}$** | $460\,\text{px}$ | **$-318\,\text{px}$ (Router/Server abgeschnitten)** |
| **Kap. 10** | **Slide 45** | `Nulldurchgang.svg` | $4026 \times 8026$ | **$1{,}99$** | `![w:1000]` | **$1.990\,\text{px}$** | $460\,\text{px}$ | **$-1.530\,\text{px}$ (Diagramm kollabiert)** |
| **Kap. 10** | **Slide 47** | `Solver_Logik.svg` | $354 \times 606$ | $1{,}71$ | `![]` in Spalte (~450px) | **$769\,\text{px}$** | $460\,\text{px}$ | **$-309\,\text{px}$ (Bisektionsablauf beschnitten)** |

> [!CAUTION]
> **Didaktische Konsequenz:** Bei all diesen Folien sehen Studierende im Hörsaal nur den oberen Kopf des Diagramms; wesentliche Prozessschritte, Verzweigungen und Fußknoten verschwinden hinter der Unterkante der Leinwand.

### 2.3 Vertikales Diagramm-Stacking ohne Spalten
Auf einigen Inhaltsfolien wurde eine ausführliche Aufzählung (4–7 Zeilen) **vertikal über ein vollbreites SVG gestapelt**, anstatt ein 2-Spalten-Layout zu nutzen:

1. **Kapitel 09, Slide 16 (`Simulationsalgorithmus`):**
   - Inhalt: H3-Überschrift (50px) + 7 nummerierte Prozessschritte (250px) + SVG `Next-Event-Time-Advance.svg` (212px hoch) + Margins (60px).
   - Gesamthöhe: ca. $570\,\text{px}$ (stößt direkt an die Fußzeile).
   - *Lösung:* Umstellung auf 2 Spalten (Text links, SVG rechts).
2. **Kapitel 09, Slide 12 & 14 (`Formalisierung der Ereignisroutinen`):**
   - Inhalt: 2 lange mathematische Definitionsblöcke + `ArrivalEvent.svg` bzw. `DepartureEvent.svg`.
   - Gesamthöhe: ca. $550\,\text{px}$.
3. **Kapitel 03, Slide 27 (`Die Lösung: DrawingVisual`):**
   - Inhalt: 5 Bullet-Points über `WPF_Visual_Hierarchie.svg`. Da das SVG extrem flach ist ($2229 \times 188\,\text{px}$, Höhe ca. 60px), passt es knapp, wirkt aber vertikal gedrängt.

### 2.4 Große mathematische Formelblöcke & Tabellen
- **Kapitel 07, Slide 12 (`Gesamtes Gleichungssystem`):**
  Die $5 \times 7$-Blockmatrix der Fachwerkstatik belegt vertikal ca. $240\,\text{px}$. Inklusive H3, Einleitungssatz und 2 Erläuterungs-Bullets summiert sich die Folie auf ca. $480\,\text{px}$. **Ergebnis:** Passt noch sauber in den Rahmen, benötigt jedoch den gesamten verfügbaren Weißraum.
- **Kapitel 08, Slide 65 & 66 (`Butcher-Tableau` und `Klassisches RK4`):**
  Auf Slide 66 stehen 4 DGL-Stufen $\mathbf{k}_1 \dots \mathbf{k}_4$, das $5 \times 5$-Butcher-Tableau und die Fehlerordnung vertikal untereinander. Höhe ca. $510\,\text{px}$. Die Folie schließt bündig wenige Pixel oberhalb des Footers ab.
- **Kapitel 11, Slide 5 (`Vergleichende Taxonomie der Modellarten`):**
  Eine 5-zeilige, 6-spaltige Tabelle. Dank MARP-Tabellenskalierung (Schriftgröße ca. 0.85em) bleibt die Höhe bei unkritischen $360\,\text{px}$.

---

## 3. Dimension 2: Ausgewogenheit der Inhaltsverteilung & Whitespace

### 3.1 Prüfung auf "Thin Slides" (Zu leere Folien)
Ein zentraler Prüfpunkt war, ob durch das in Phase 4 durchgeführte Code-Splitting magere Restfolien entstanden sind.
- **Ergebnis:** Es gibt **keine einzige didaktisch verarmte Folie** im Kurs!
- Kein Codeblock steht isoliert mit weniger als 4 Zeilen da.
- Jede Folie weist entweder substanziellen erklärenden Text, Formeln, ein aussagekräftiges Diagramm oder eine strukturierte Tabelle auf.
- Alle 4 früheren "Geisterfolien" in Kapitel 07 (durch versehentliche Doppel-Trennstriche `--- \n ---`) sind restlos bereinigt.

### 3.2 Prüfung auf "Wall of Text" (Überladene Textfolien)
Trotz des Erfolgs beim Code-Splitting existieren im Kurs **41 Textfolien ohne visuelle Unterbrechung** (keine Spaltenteilung, kein Diagramm, kein Codeblock), auf denen mehr als 100 Wörter Fließtext stehen:
- **Kapitel 01, Slide 35 (`Ausblick`):** 18 ununterbrochene Textzeilen mit 7 Haupt- und 4 Unterpunkten (Gesamthöhe ca. $700\,\text{px}$!). Dies führt zu akutem Text-Clipping in die Fußzeile.
- **Kapitel 07 (Statik):** 10 Textfolien zu mathematischen Herleitungen (z.B. Folien 10, 14, 16, 17, 27, 28, 44, 45) enthalten dichte Textblöcke ohne Hervorhebung oder grafische Skizze.
- **Kapitel 10, Slide 24 & 25:** Jeweils 12 Aufzählungspunkte in kompakter Folge.

### 3.3 Spaltenarchitektur & der "Heading-inside-Column"-Bruch
Die Untersuchung der 230 Spaltenfolien (`<div class="columns">`) legte eine signifikante architektonische Inkonsistenz im Markdown-Code offen:

```
┌────────────────────────────────────────────────────────────────────────┐
│ Gesamtzahl Spaltenfolien im Kurs: 230 Folien                           │
├──────────────────────────────────────┬─────────────────────────────────┤
│ Heading VOR Columns (Sauber):        │ Heading IN Column 1 (Bruch):    │
│ 147 Folien (64%)                     │ 83 Folien (36%)                 │
│ Kap. 00, 01, 02, 03, 04, 06, 11      │ Kap. 05 (4), 07 (18), 08 (24), │
│                                      │ Kap. 09 (17), 10 (20)           │
└──────────────────────────────────────┴─────────────────────────────────┘
```

#### Die ergonomischen Konsequenzen dieses Strukturbruchs:
1. **Asymmetrische Oberkanten-Ausrichtung:**  
   In `Themen/fhooe.css` gilt `section div.columns { align-items: flex-start; }`. Befindet sich `### Titel` in Spalte 1, beginnt Spalte 2 (die meist ein Bild oder einen Codeblock enthält) ganz oben am Folienrand auf gleicher Höhe wie die H3-Überschrift. Die Überschrift dominiert nicht mehr die gesamte Folie, sondern wirkt wie eine lokale Spaltenüberschrift.
2. **Horizontaler Stau & hässliche Zeilenumbrüche:**  
   Wird eine lange Überschrift wie z.B. `### Formalisierung der Ereignisroutine für Ankunft e_A zum Zeitpunkt t` (65 Zeichen) in eine 50%-Spalte gezwungen, bricht sie in **drei Zeilen** um und stiehlt der ersten Spalte wertvolle $120\,\text{px}$ vertikale Nettohöhe!

#### Spaltengewichtung:
- **Klassenlose Spalten (`<div>` ohne Klasse):** Auf 38 Folien wurde `<div class="...">` mit einfachem `<div>` gemischt. Da ungetaggte Divs laut CSS `flex-grow: 1` erhalten, führt die Kombination aus `<div class="three">` und `<div>` zu einem asymmetrischen 3:1-Verhältnis (75% zu 25%), wodurch die rechte Spalte extrem schmal gerendert wird.

---

## 4. Dimension 3: Theme-, Header-, Footer- & Paginierungskonsistenz

### 4.1 Frontmatter-Konsistenz
Das Frontmatter ist über alle 12 Kapitel vollständig standardisiert:
- `marp: true`
- `theme: fhooe`
- `paginate: true`
- `math: mathjax`
- `footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'`

**Header-Konsistenz:**
- Kapitel 01 bis 11 deklarieren konsistent: `header: 'Kapitel N: [Titel]'`.
- Kapitel 00 deklariert: `header: 'Prolog'` (bewusste didaktische Ausnahme für das Einstiegsmodul).

### 4.2 Die persistierende FH-Logo-Überdeckung auf Titelfolien

#### Ursachenanalyse im MARP-DOM:
In `Themen/fhooe.css` ist definiert:
```css
section:not(.title):not(.lead):not(:first-of-type)::before {
    content: "";
    position: absolute;
    top: 0; right: 0;
    width: 4.5rem; height: 4.5rem;
    background-color: var(--fhooe-blue);
    /* ... FH-Signet ... */
}
```
Möchte MARP eine Folie mit geteiltem Hintergrund rendern (`![bg right](./Titelbild.jpg)`), generiert die Marpit-Engine intern **drei aufeinanderfolgende `<section>`-Tags** im SVG-Container:
```html
<section data-marpit-advanced-background="background" ...>
<section id="1" data-marpit-advanced-background="content" ...>
<section data-marpit-advanced-background="pseudo" ...>
```
Da `<section id="1">` das **zweite** Section-Element im DOM ist, greift `:first-of-type` **nicht** auf den Inhalts-Layer!  
Da auf keinem der 12 Deckblätter die Direktive `<!-- _class: title -->` gesetzt ist, wird das blaue $4{,}5\,\text{rem} \times 4{,}5\,\text{rem}$ große FH-Logo-Quadrat **auf allen 12 Titelfolien** in die obere rechte Ecke gezeichnet und überdeckt dort unschön das Hintergrundbild!

Ebenso verhält es sich bei den **18 Abschnittstrenner-Folien** (`## N.M`) in den Kapiteln 08, 09 und 10, die ebenfalls ein `![bg right]` besitzen, aber keine `_class: lead`-Deklaration tragen.

### 4.3 Typografie in Folientiteln & Bullet-Points
- **Syntax & Zeichen:** Alle 532 Folientitel sind frei von Tippfehlern, Syntaxfehlern, doppelten Leerzeichen oder ungeschlossenen Markdown-Tags. Kein Titel endet mit einem Punkt.
- **70 überlange Bullet-Points (>160 Zeichen):** Auf 70 Folien werden Bullet-Points als vollständige, mehrzeilige Fließtextabsätze missbraucht (z.B. in Kapitel 02, Slide 5 & Slide 31; Kapitel 03, Slide 32; Kapitel 04, Slide 10). Auf dem Beamer beeinträchtigt dies die visuelle Erfassbarkeit erheblich.

---

## 5. Schweregrade & Priorisierte Handlungsoptionen

### 5.1 Befundmatrix nach Schweregraden

```
┌────────────────────────────────────────────────────────────────────────┐
│ KRITISCH (P0) – Vorlesungs-Showstopper / Sofortmaßnahme erforderlich   │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Vertikales Clipping bei 12 hochformatigen Diagramm-SVGs:            │
│    - Kap. 11 (Slide 4, 23, 30)                                         │
│    - Kap. 05 (Slide 57)                                                │
│    - Kap. 07 (Slide 49)                                                │
│    - Kap. 08 (Slide 45, 54, 60)                                        │
│    - Kap. 09 (Slide 5, 6)                                              │
│    - Kap. 10 (Slide 45, 47)                                            │
│    -> Bis zu 1.500px Bildinhalt unterhalb der Folie abgeschnitten!     │
│ 2. FH-Logo-Kollision auf allen 12 Deckblättern & 18 Abschnittsfolien:  │
│    - Blaues Quadrat überlagert die obere rechte Ecke der Titelbilder   │
├────────────────────────────────────────────────────────────────────────┤
│ MITTEL (P1) – Ergonomie & Visuelle Harmonisierung                      │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Der "Heading-inside-Column"-Strukturbruch auf 83 Folien:            │
│    - Kap. 05 (4 Folien), Kap. 07 (18 Folien), Kap. 08 (24 Folien),    │
│      Kap. 09 (17 Folien), Kap. 10 (20 Folien)                          │
│    -> Überschrift aus Spalte 1 herausziehen und vor die Spalten setzen │
│ 4. Vertikales Diagramm-Stacking ohne Spalten:                          │
│    - Kap. 09 Slide 12, 14, 16                                          │
│    -> In 2-Spalten-Layout (Text links, SVG rechts) überführen          │
│ 5. Text-Überlauf auf "Ausblick"-Folien:                                │
│    - Kap. 01 Slide 35 (18 Zeilen dichte Textaufzählung)                │
│    - Kap. 10 Slide 73 (verschachtelte Liste mit falschem ![bg inside]) │
├────────────────────────────────────────────────────────────────────────┤
│ GERING / POLISHING (P2) – Typografischer Feinschliff                   │
├────────────────────────────────────────────────────────────────────────┤
│ 6. 70 überlange Bullet-Points (> 160 Zeichen):                         │
│    - Straffen zu prägnanten Stichpunkten mit fettgedruckten Signalwörtern│
│ 7. Klassenlose `<div>`-Spalten harmonisieren:                          │
│    - Explizite Klassen (`one`, `two`, `three`) für ausgewogene Breiten │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Quantitative Bewertung des Layout-Reifegrads (Kapitel 00–11)

| Kapitel | Folien | Code-Qualität | Layout & Spalten | Vertikale Ergonomie | Theme & Logo | Reifegrad (1–10) | Primäre Handlungsbedarfe |
|:---|---:|:---:|:---:|:---:|:---:|:---:|:---|
| **00 Prolog** | 13 | 10.0 | 9.5 | 9.5 | 8.5 | **9.4 / 10** | Deckblatt `_class: title` ergänzen |
| **01 Einführung** | 35 | 10.0 | 9.0 | 8.0 | 8.5 | **8.8 / 10** | Slide 35 (Ausblick) entschlacken; Logo auf Deckblatt |
| **02 2D-Pixel** | 31 | 9.5 | 9.0 | 9.0 | 8.5 | **9.0 / 10** | Slide 31 (Zusammenfassung) Bullets straffen |
| **03 2D-Vektor** | 32 | 9.5 | 9.0 | 9.0 | 8.5 | **9.0 / 10** | Slide 27 (DrawingVisual) Spaltenlayout prüfen |
| **04 2D-Diagramme** | 28 | 9.5 | 9.0 | 9.0 | 8.5 | **9.0 / 10** | Slide 10 (Signal) Text kürzen |
| **05 3D-OpenGL** | 69 | 9.5 | 8.0 | 7.0 | 8.0 | **7.8 / 10** | Slide 57 (Szenengraph) SVG-Clipping; 4 H3 in Spalte 1 |
| **06 Multithreading**| 24 | 10.0 | 9.5 | 9.0 | 8.5 | **9.3 / 10** | Vorbildliches Spaltenlayout; kaum Korrekturen nötig |
| **07 Statische Mod.**| 54 | 9.5 | 7.5 | 7.5 | 8.0 | **7.9 / 10** | Slide 49 (Model.svg) Clipping; 18 H3 in Spalte 1 |
| **08 Dynamik Kont.** | 78 | 9.0 | 7.5 | 7.0 | 7.5 | **7.6 / 10** | Slide 45, 54, 60 SVG-Clipping; 24 H3 in Spalte 1 |
| **09 Dynamik Disk.** | 64 | 9.5 | 7.5 | 7.0 | 7.5 | **7.7 / 10** | Slide 5, 6 SVG-Clipping; Slide 12, 14, 16 Stacking |
| **10 Dynamik Hybr.** | 73 | 9.5 | 7.5 | 6.5 | 7.5 | **7.5 / 10** | Slide 45, 47 SVG-Clipping; Slide 73 Überlauf; 20 H3 |
| **11 Epilog** | 31 | 10.0 | 8.5 | 6.5 | 8.5 | **8.2 / 10** | Slide 4, 23, 30 massives SVG-Clipping (h:450px fixieren) |
| **GESAMTKURS** | **532** | **9.6** | **8.3** | **7.7** | **8.1** | **8.4 / 10** | **Vorreif – Fokus auf Phase 5 Feinschliff** |

---

## 7. Konkrete Reparaturempfehlungen für den Feinschliff (Phase 5)

### Empfehlung 1: Das CSS-Schutzschild in `Themen/fhooe.css` (Sofortmaßnahme)
Um mit minimalem Aufwand alle 12 Deckblätter, alle Abschnittsfolien und alle zukünftigen hochformatigen SVGs kursweit abzusichern, sollten folgende CSS-Regeln in `Themen/fhooe.css` implementiert werden:

```css
/* 1. Globaler Schutz gegen SVG- und Bild-Überlauf */
section img {
    max-height: 480px;
    object-fit: contain;
}

/* 2. Robuster Schutz vor Logo-Überdeckung bei MARP-Advanced-Backgrounds */
section[data-marpit-advanced-background]::before,
section[data-marpit-advanced-background-split]::before,
section#\31::before,
section[id="1"]::before {
    display: none !important;
}
```

### Empfehlung 2: Gezielte Höhenbeschränkung bei den 12 betroffenen SVGs
In den Folien-Markdowns sollten Breitenbeschränkungen durch Höhenbeschränkungen ersetzt werden:
- `Folien/11_Epilog/Folien.md` (Slide 4):  
  `![w:1000](./Diagramme/Modellierungsmatrix.svg)` $\implies$ `![h:460px](./Diagramme/Modellierungsmatrix.svg)`
- `Folien/11_Epilog/Folien.md` (Slide 23):  
  `![w:540](./Diagramme/VIBN_Systemarchitektur.svg)` $\implies$ `![h:380px](./Diagramme/VIBN_Systemarchitektur.svg)`
- `Folien/11_Epilog/Folien.md` (Slide 30):  
  `![w:540](./Diagramme/Simulationsprozess_Synthese.svg)` $\implies$ `![h:380px](./Diagramme/Simulationsprozess_Synthese.svg)`
- `Folien/05_Visualisierung_3D_OpenGL/Folien.md` (Slide 57):  
  `![w:520](./Diagramme/Szenengraph_Roboterarm.svg)` $\implies$ `![h:440px](./Diagramme/Szenengraph_Roboterarm.svg)`
- `Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md` (Slide 45, 54, 60):  
  `![h:450px]` explizit ergänzen.
- `Folien/10_Dynamische_Modelle_Hybrid/Folien.md` (Slide 45):  
  `![w:1000](./Diagramme/Nulldurchgang.svg)` $\implies$ `![h:450px](./Diagramme/Nulldurchgang.svg)`

### Empfehlung 3: Vereinheitlichung der 83 Spaltenfolien (Heading vor Columns)
Automatisierte oder manuelle Verschiebung von `### Überschrift`:
```markdown
<!-- VORHER (Inkonsistent / Asymmetrisch): -->
<div class="columns">
<div class="two">

### Folientitel
Inhalt links...
</div>
<div class="two">
Inhalt rechts...
</div>
</div>

<!-- NACHHER (Konsistent / Perfekte Baseline): -->
### Folientitel

<div class="columns">
<div class="two">

Inhalt links...
</div>
<div class="two">

Inhalt rechts...
</div>
</div>
```

---
*Bericht erstellt im Rahmen des Qualitätssicherungs-Audits für die Lehrveranstaltung Systemsimulation / Digitaler Zwilling an der FH Oberösterreich.*
