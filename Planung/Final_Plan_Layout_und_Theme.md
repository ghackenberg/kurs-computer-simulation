# Operativer Fachplan Stream A: Folienlayout, CSS-Theme & Spaltenharmonisierung
## Finaler Umsetzungsplan zur Beseitigung aller typografischen und layouttechnischen Mängel (Phase 5)

**Dokument-ID:** `Planung/Final_Plan_Layout_und_Theme.md`  
**Autor:** Spezialist für Präsentationstechnik, MARP-Layout & CSS-Theme-Architektur (Stream A)  
**Basis-Audits:** `Reviews/FinalAudit_01_Layout_und_Typografie.md` & `Reviews/FinalAudit_02_Grafiken_und_Medien.md`  
**Geltungsbereich:** Kurs „Systemsimulation / Digitaler Zwilling“ (Kapitel 00 bis 11, 532 Folien)  
**Status:** Freigegebener, direkt operationalisierbarer Ausführungsplan  
**Datum:** Oktober 2026  

---

## Inhaltsverzeichnis
1. [Executive Summary & Ausgangslage](#1-executive-summary--ausgangslage)
2. [AP-A1: Härtung des Theme-Schutzschilds (`Themen/fhooe.css`)](#2-ap-a1-härtung-des-theme-schutzschilds-themenfhooecss)
   - 2.1 CSS-Überlaufbegrenzung für Grafiken (`section img`)
   - 2.2 Flexbox-Spaltenabsicherung (`min-width: 0`)
   - 2.3 Robuste FH-Logo-Ausblendung bei Marpit Advanced Backgrounds
   - 2.4 Vollständiger CSS-Patch & Diff
3. [AP-A2: Behebung der SVG-Aspektfalle (12 Einzelfolien)](#3-ap-a2-behebung-der-svg-aspektfalle-12-einzelfolien)
   - 3.1 Die mathematische Ursache des Höhenüberlaufs
   - 3.2 Katalog der 12 betroffenen Folien & exakte Anpassungen
   - 3.3 Text-Diffs & Einbindungssyntax
4. [AP-A3: Heading-inside-Column Bereinigung (83 Folien)](#4-ap-a3-heading-inside-column-bereinigung-83-folien)
   - 4.1 Problemanalyse: Asymmetrische Baseline & Zeilensalat
   - 4.2 Kapitelweise Verteilung (Kap. 05, 07, 08, 09, 10)
   - 4.3 Standardisiertes Transformationsmuster
   - 4.4 Automatisierungs- & Verifikationsstrategie
5. [AP-A4: Systemweite Spaltenbreitenharmonisierung (44 Folien)](#5-ap-a4-systemweite-spaltenbreitenharmonisierung-44-folien)
   - 5.1 Ursache: Flexbox-Verdrängung durch `w:1000` und `width:2000px`
   - 5.2 Klassifizierung & Zielbreiten (`w:500` Standard)
   - 5.3 Bereinigungsliste je Kapitel
6. [AP-A5: Parallelitäts-, Reihenfolge- & Schnittstellenanalyse (Stream A vs. B)](#6-ap-a5-parallelitäts--reihenfolge---schnittstellenanalyse-stream-a-vs-b)
   - 6.1 Sofort parallel ausführbare Arbeitspakete
   - 6.2 Schnittstellen zu Stream B (Mermaid-SVG-Neukompilierung)
   - 6.3 Phasen- und Abhängigkeitsgraph
7. [AP-A6: Qualitätssicherungs-Matrix & Validierungsskripte](#7-ap-a6-qualitätssicherungs-matrix--validierungsskripte)
   - 7.1 Automatisierte PowerShell-Prüfskripte
   - 7.2 Visuelle Checkliste für Beamer-Prüfung (1080p Full HD)
   - 7.3 Definition of Done (DoD)

---

## 1. Executive Summary & Ausgangslage

Auf Basis des finalen Qualitätsaudits (`Reviews/FinalAudit_01_Layout_und_Typografie.md` und `Reviews/FinalAudit_02_Grafiken_und_Medien.md`) weist die Vorlesungsreihe „Systemsimulation / Digitaler Zwilling“ (532 Folien in 12 Kapiteln) einen herausragenden inhaltlichen und typografischen Reifegrad auf:
- Alle 227 Bildreferenzen sind lokal vorhanden (0 defekte Pfade).
- Sämtliche Codeblöcke halten das Limit von maximal 16 Zeilen und 80 Zeichen strikt ein.
- Geisterfolien und historische ASCII-Art-Kästen sind vollständig eliminiert.

Allerdings gefährden **drei layouttechnische Kernprobleme** die Lesbarkeit im Hörsaal auf 16:9-Full-HD-Projektoren ($1280 \times 720\,\text{px}$, Netto-Nutzhöhe $540\,\text{px}$):
1. **SVG-Aspektfalle:** 12 hochformatige Diagramme werden durch Breitenangaben (`w:540`, `w:1000`) oder unbegrenzte Spalten vertikal auf bis zu $1.998\,\text{px}$ gestreckt, wodurch bis zu 75% des Diagramminhalts hinter der Folienunterkante abgeschnitten werden.
2. **Heading-inside-Column Strukturbruch (83 Folien):** In den Kapiteln 05, 07, 08, 09 und 10 stehen Überschriften innerhalb von Spalte 1, was zu versetzten Spaltenbaselines und unschönen 3-zeiligen Zeilenumbrüchen führt.
3. **Flexbox-Spaltenüberlastung (44 Folien):** `width:1000px` bzw. `width:2000px` in Spaltenlayouts quetschen begleitende Textspalten auf unter 130 Pixel zusammen.
4. **FH-Logo-Überdeckung auf Deckblättern:** Das MARP-DOM-Verhalten bei Split-Hintergründen führt dazu, dass das blaue FH-Logo auf allen 12 Deckblättern über das Titelbild gezeichnet wird.

Dieser operative Fachplan definiert die präzisen technischen Maßnahmen zur restlosen Beseitigung dieser Mängel.

---

## 2. AP-A1: Härtung des Theme-Schutzschilds (`Themen/fhooe.css`)

### 2.1 CSS-Überlaufbegrenzung für Grafiken (`section img`)
**Problem:** MARP-Folien besitzen eine Netto-Nutzhöhe von ca. $540\,\text{px}$ (720px Folienhöhe abzüglich Padding 40px oben/unten sowie Header/Footer). Standardmäßig begrenzt CSS Bilder nicht in der Höhe, wenn nur eine Breitenbeschränkung deklariert ist.  
**Lösung:** Globale Begrenzung aller Raster- und Vektorbilder im Theme auf maximal $480\,\text{px}$ mit beibehaltener Aspekt-Proportion:
```css
section img {
    max-height: 480px;
    object-fit: contain;
}
```
Damit ist garantiert, dass selbst bei versehentlich zu großen Breitenangaben kein Bild mehr vertikal in den Footer hineinragt oder abgeschnitten wird.

### 2.2 Flexbox-Spaltenabsicherung (`min-width: 0`)
**Problem:** In Flexbox-Layouts (`display: flex`) haben Kind-Elemente standardmäßig `min-width: auto`. Enthält eine Spalte ein Bild mit `width: 1000px`, erzwingt der Browser eine Mindestbreite von 1000px, wodurch die Nachbarspalte kollabiert.  
**Lösung:** Härtung der Spalten-Kindelemente mit `min-width: 0` und Begrenzung von Bildern innerhalb von Spalten auf maximal 100% Spaltenbreite:
```css
section div.columns > div {
    flex-basis: 1rem;
    flex-grow: 1;
    min-width: 0;           /* Verhindert Flexbox-Overflow */
}

section div.columns img,
section div.columns svg {
    max-width: 100%;        /* Verhindert horizontales Ausbrechen aus der Spalte */
    height: auto;
    object-fit: contain;
}
```

### 2.3 Robuste FH-Logo-Ausblendung bei Marpit Advanced Backgrounds
**Problem:** MARP erzeugt bei Split-Hintergründen (`![bg right ...]`) intern drei `<section>`-Tags:
```html
<section data-marpit-advanced-background="background" ...>
<section id="1" data-marpit-advanced-background="content" ...>
<section data-marpit-advanced-background="pseudo" ...>
```
Da `<section id="1">` das zweite Section-Element im SVG-Wrapper ist, greift `:first-of-type` **nicht**. Folglich wird das blaue FH-Logo (`::before`) mit hoher Priorität über das Deckblatt-Bild gerendert.  
**Lösung:** Erweiterung der Ausblendregeln um Marpit-spezifische Selektoren:
```css
/* Deckblätter, Advanced Backgrounds und Lead-Folien strikt vom FH-Logo befreien */
section:first-of-type::before,
section[data-marpit-advanced-background]::before,
section[data-marpit-advanced-background-split]::before,
section[id="1"]::before,
section#\31::before,
section.title::before,
section.lead::before {
    display: none !important;
}
```

### 2.4 Vollständiger CSS-Patch & Diff für `Themen/fhooe.css`

```diff
--- a/Themen/fhooe.css
+++ b/Themen/fhooe.css
@@ -14,6 +14,12 @@
     padding: 40px 60px;
 }
 
+/* 1. Globaler Schutz gegen Bild- und Diagrammüberlauf */
+section img {
+    max-height: 480px;
+    object-fit: contain;
+}
+
 /* FH-Logo: Nur auf Inhaltsfolien anzeigen, Deckblätter (Title & Lead & Folie 1) schützen */
 section:not(.title):not(.lead):not(:first-of-type)::before {
     content: "";
@@ -40,7 +46,12 @@
 }
 
 /* Deckblätter und Folien mit Title-/Lead-Klasse strikt vom FH-Logo befreien */
+/* Inklusive Marpit Advanced Background Wrapper für Folie 1 und bg-Splits */
 section:first-of-type::before,
+section[data-marpit-advanced-background]::before,
+section[data-marpit-advanced-background-split]::before,
+section[id="1"]::before,
+section#\31::before,
 section.title::before,
 section.lead::before {
     display: none !important;
@@ -64,6 +75,14 @@
 section div.columns > div {
     flex-basis: 1rem;
     flex-grow: 1;
+    min-width: 0;
+}
+
+/* Bildbegrenzung innerhalb von Flex-Spalten */
+section div.columns img,
+section div.columns svg {
+    max-width: 100%;
+    height: auto;
+    object-fit: contain;
 }
 section div.columns > div.two {
```

---

## 3. AP-A2: Behebung der SVG-Aspektfalle (12 Einzelfolien)

### 3.1 Die mathematische Ursache des Höhenüberlaufs
Wird ein Vektordiagramm mit der MARP-Breitendirektive `![w:X]` oder unbeschränkt `![]` eingebunden, berechnet sich die vertikale Höhe nach:
$$\text{Höhe}_{\text{gerendert}} = \text{Breite}_{\text{Spalte/Angabe}} \cdot \frac{H_{\text{viewBox}}}{B_{\text{viewBox}}}$$
Bei einem Aspektverhältnis von $H/B > 1{,}5$ führt eine Spaltenbreite von $450\,\text{px}$ bis $540\,\text{px}$ zwangsläufig zu Höhen zwischen $675\,\text{px}$ und $1.998\,\text{px}$. Bei einer Netto-Folienhöhe von $540\,\text{px}$ wird der untere Teil abgeschnitten.  
**Die Lösung:** Ersetzung der Breitenangabe durch eine explizite Höhenbegrenzung `![h:440px]` bzw. `![h:380px]` (wenn Begleittext oder Zitate darunter liegen).

### 3.2 Katalog der 12 betroffenen Folien & exakte Anpassungen

| Nr | Kapitel & Datei | Folie & Zeile | Diagrammdatei | ViewBox ($B \times H$) | Aspekt ($H/B$) | Status Quo | Ziel-Direktive | Begründung |
|:---:|:---|:---:|:---|:---:|:---:|:---|:---:|:---|
| **1** | `11_Epilog/Folien.md` | F. 4 (Z. 96) | `Modellierungsmatrix.svg` | $976 \times 1334$ | $1{,}37$ | `![w:1000]` in Spalte `two` | `![h:440px]` | Verhindert Überlauf in den Footer; Matrix bleibt voll lesbar. |
| **2** | `11_Epilog/Folien.md` | F. 23 (Z. 605) | `VIBN_Systemarchitektur.svg` | $276 \times 886$ | **$3{,}21$** | `![w:540]` | `![h:380px]` | Unter dem Bild steht ein Zitat-Callout; 380px garantiert perfekten Weißraum. |
| **3** | `11_Epilog/Folien.md` | F. 30 (Z. 778) | `Simulationsprozess_Synthese.svg` | $276 \times 1022$ | **$3{,}70$** | `![w:540]` | `![h:380px]` | Extrem hochformatige Synthesekette; `h:380px` zentriert das Diagramm sauber. |
| **4** | `05_Visualisierung_3D_OpenGL/Folien.md` | F. 57 (Z. 1221) | `Szenengraph_Roboterarm.svg` | $242 \times 862$ | **$3{,}56$** | `![w:520]` | `![h:440px]` | Beseitigt das $1.851\,\text{px}$ Abscheeren; Roboterbasis wird sichtbar. |
| **5** | `07_Statische_Modelle/Folien.md` | F. 49 (Z. 866) | `Model.svg` | $252 \times 722$ | **$2{,}87$** | `![](./Diagramme/Model.svg)` | `![h:440px]` | Unbeschränkte UML-Klassenhierarchie; `h:440px` verhindert Halbierung. |
| **6** | `08_Dynamische_Modelle_Kontinuierlich/Folien.md` | F. 45 (Z. 1086) | `Simulationsschleife_Explizit.svg` | $382 \times 629$ | $1{,}65$ | `![](./Diagramme/Simulationsschleife_Explizit.svg)` | `![h:440px]` | Schleifenende rückt oberhalb der Fußzeile ins Blickfeld. |
| **7** | `08_Dynamische_Modelle_Kontinuierlich/Folien.md` | F. 54 (Z. 1248) | `Algebraische_Schleife_Praxis.svg` | $359 \times 685$ | $1{,}91$ | `![width:1000px]` | `![h:440px]` | Ersetzt fatales `width:1000px` durch vertikale Passform. |
| **8** | `08_Dynamische_Modelle_Kontinuierlich/Folien.md` | F. 60 (Z. 1378) | `Simulationsschleife_Implizit.svg` | $523 \times 1010$ | **$1{,}93$** | `![](./Diagramme/Simulationsschleife_Implizit.svg)` | `![h:440px]` | Konvergenzschleife und Abbruchkriterien vollständig sichtbar. |
| **9** | `09_Dynamische_Modelle_Diskret/Folien.md` | F. 5 (Z. 106) | `Produktionssystem.svg` | $233 \times 661$ | **$2{,}84$** | `![](./Diagramme/Produktionssystem.svg)` | `![h:440px]` | Pufferlager und Maschinenstationen werden nicht mehr abgeschnitten. |
| **10** | `09_Dynamische_Modelle_Diskret/Folien.md` | F. 6 (Z. 129) | `Computernetzwerk.svg` | $369 \times 636$ | $1{,}73$ | `![](./Diagramme/Computernetzwerk.svg)` | `![h:440px]` | Vollständige Topologie (Router, Server, Clients) sichtbar. |
| **11** | `10_Dynamische_Modelle_Hybrid/Folien.md` | F. 45 (Z. 989) | `Nulldurchgang.svg` | $4026 \times 8026$ | **$1{,}99$** | `![w:1000]` | `![h:440px]` | Verhindert Überlauf und Kollaps der Textspalte. |
| **12** | `10_Dynamische_Modelle_Hybrid/Folien.md` | F. 47 (Z. 1033) | `Solver_Logik.svg` | $354 \times 606$ | $1{,}71$ | `![](./Diagramme/Solver_Logik.svg)` | `![h:440px]` | Bisektions-Entscheidungsbaum passt bündig in die Spalte. |

### 3.3 Text-Diffs der 12 Einzelfolien

#### Fall 1–3: Kapitel 11 (`Folien/11_Epilog/Folien.md`)
```diff
@@ -95,3 +95,3 @@
 <div class="two">
 
-![w:1000](./Diagramme/Modellierungsmatrix.svg)
+![h:440px](./Diagramme/Modellierungsmatrix.svg)
 
 </div>
@@ -604,3 +604,3 @@
 <div>
 
-![w:540](./Diagramme/VIBN_Systemarchitektur.svg)
+![h:380px](./Diagramme/VIBN_Systemarchitektur.svg)
 
 > **Nutzen:** Test von Not-Aus-Szenarien und Fehlsituationen ohne Beschädigungsgefahr für reale Maschinen!
@@ -777,3 +777,3 @@
 <div>
 
-![w:540](./Diagramme/Simulationsprozess_Synthese.svg)
+![h:380px](./Diagramme/Simulationsprozess_Synthese.svg)
 
 </div>
```

#### Fall 4: Kapitel 05 (`Folien/05_Visualisierung_3D_OpenGL/Folien.md`)
```diff
@@ -1220,3 +1220,3 @@
 <div>
 
-![w:520](./Diagramme/Szenengraph_Roboterarm.svg)
+![h:440px](./Diagramme/Szenengraph_Roboterarm.svg)
 
 </div>
```

#### Fall 5: Kapitel 07 (`Folien/07_Statische_Modelle/Folien.md`)
```diff
@@ -865,3 +865,3 @@
 <div>
 
-![](./Diagramme/Model.svg)
+![h:440px](./Diagramme/Model.svg)
 
 </div>
```

#### Fall 6–8: Kapitel 08 (`Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md`)
```diff
@@ -1085,3 +1085,3 @@
 <div>
 
-![](./Diagramme/Simulationsschleife_Explizit.svg)
+![h:440px](./Diagramme/Simulationsschleife_Explizit.svg)
 
 </div>
@@ -1247,3 +1247,3 @@
 <div>
 
-![width:1000px](./Diagramme/Algebraische_Schleife_Praxis.svg)
+![h:440px](./Diagramme/Algebraische_Schleife_Praxis.svg)
 
 </div>
@@ -1377,3 +1377,3 @@
 <div>
 
-![](./Diagramme/Simulationsschleife_Implizit.svg)
+![h:440px](./Diagramme/Simulationsschleife_Implizit.svg)
 
 </div>
```

#### Fall 9–10: Kapitel 09 (`Folien/09_Dynamische_Modelle_Diskret/Folien.md`)
```diff
@@ -105,3 +105,3 @@
 <div>
 
-![](./Diagramme/Produktionssystem.svg)
+![h:440px](./Diagramme/Produktionssystem.svg)
 
 </div>
@@ -128,3 +128,3 @@
 <div>
 
-![](./Diagramme/Computernetzwerk.svg)
+![h:440px](./Diagramme/Computernetzwerk.svg)
 
 </div>
```

#### Fall 11–12: Kapitel 10 (`Folien/10_Dynamische_Modelle_Hybrid/Folien.md`)
```diff
@@ -988,3 +988,3 @@
 <div>
 
-![w:1000](./Diagramme/Nulldurchgang.svg)
+![h:440px](./Diagramme/Nulldurchgang.svg)
 
 </div>
@@ -1032,3 +1032,3 @@
 <div>
 
-![](./Diagramme/Solver_Logik.svg)
+![h:440px](./Diagramme/Solver_Logik.svg)
 
 </div>
```

---

## 4. AP-A3: Heading-inside-Column Bereinigung (83 Folien)

### 4.1 Problemanalyse: Asymmetrische Baseline & Zeilensalat
Die Deklaration von `### Überschrift` innerhalb der ersten Flexbox-Spalte (`<div class="two">### Titel...`) erzeugt zwei gravierende Nachteile:
1. **Verzerrte Baseline:** Die rechte Spalte (z.B. ein Diagramm oder Codeblock) beginnt ganz oben bündig mit der H3-Überschrift. Die visuelle Hierarchie geht verloren, da die Überschrift optisch nur zu Spalte 1 gehört.
2. **Horizontaler Stau:** Eine 60 Zeichen lange Überschrift bricht in einer 50%-Spalte auf 2 bis 3 Zeilen um und stiehlt der linken Spalte bis zu $120\,\text{px}$ vertikale Netto-Höhe.

### 4.2 Kapitelweise Verteilung (83 Folien)

| Kapitel | Dateipfad | Betroffene Folien (Anzahl) | Exemplarische Fundstellen | Status Quo |
|:---|:---|:---:|:---|:---:|
| **Kapitel 05** | `Folien/05_Visualisierung_3D_OpenGL/Folien.md` | **4 Folien** | Folien 22, 23, 27, 28 | Inkonsistent zu restlichen 65 Folien |
| **Kapitel 07** | `Folien/07_Statische_Modelle/Folien.md` | **18 Folien** | Folien 4, 6, 7, 18, 19, 21, 22, 36, 38, ... | Hohe Dichte bei Fachwerk-Herleitungen |
| **Kapitel 08** | `Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md` | **24 Folien** | Folien 7, 8, 14, 15, 23, 30, 31, 48, 50, ... | Größte Häufung im gesamten Vorlesungswerk |
| **Kapitel 09** | `Folien/09_Dynamische_Modelle_Diskret/Folien.md` | **17 Folien** | Folien 6, 8, 10, 11, 20, 22, 25, 27, ... | Ereignisroutinen und Warteschlangen |
| **Kapitel 10** | `Folien/10_Dynamische_Modelle_Hybrid/Folien.md` | **20 Folien** | Folien 4, 5, 8, 9, 15, 17, 26, 28, 47, ... | Bouncing Ball & Digitaler Sensor |
| **SUMME** | **Alle 5 betroffenen Kapitel** | **83 Folien** | - | **Systemweit zu bereinigen** |

*(Hinweis: In den Kapiteln 00, 01, 02, 03, 04, 06 und 11 sind alle Spaltenüberschriften bereits vorbildlich vor `<div class="columns">` platziert.)*

### 4.3 Standardisiertes Transformationsmuster

```markdown
<!-- VORHER: Asymmetrische Ausrichtung, H3 in Spalte 1 gequetscht -->
---

<div class="columns">
<div class="two">

### Formalisierung der Ereignisroutine e_A
Hier steht der erläuternde Text...
</div>
<div class="two">

![h:440px](./Diagramme/ArrivalEvent.svg)
</div>
</div>

<!-- NACHHER: Perfekte Baseline, volle Folienbreite für Titel -->
---

### Formalisierung der Ereignisroutine e_A

<div class="columns">
<div class="two">

Hier steht der erläuternde Text...
</div>
<div class="two">

![h:440px](./Diagramme/ArrivalEvent.svg)
</div>
</div>
```

### 4.4 Automatisierungs- & Verifikationsstrategie
Das Refactoring erfolgt über ein deterministisches PowerShell-Skript mit regulären Ausdrücken:
- Suchmuster: `(?s)(---\r?\n\r?\n)<div class="columns"[^>]*>\r?\n<div[^>]*>\r?\n\r?\n(###[^\r\n]+)\r?\n`
- Ersetzung: `$1$2\r\n\r\n<div class="columns">\r\n<div class="two">\r\n`
- Anschließend manuelle und automatisierte Sichtprüfung auf verbliebene Klassenattribute (`class="three"` o.ä.).

---

## 5. AP-A4: Systemweite Spaltenbreitenharmonisierung (44 Folien)

### 5.1 Ursache: Flexbox-Verdrängung durch `w:1000` und `width:2000px`
In 44 Folien wurden Bilder in zweispaltigen Layouts mit Breitenattributen von $700\,\text{px}$ bis $2000\,\text{px}$ versehen. Dies führt dazu, dass die begleitende Textspalte auf unter 20% der Folienbreite zusammengestaucht wird oder Formeln über den Bildschirmrand ragen.

### 5.2 Klassifizierung & Zielbreiten (`w:500` Standard)
- **Standard für 2-Spalten-Bilder (50/50):** `![w:500]` (bzw. `![h:440px]` bei vertikalem Diagrammformat).
- **Standard für 60/40-Spalten (`three` + `two`):** `![w:460]`.
- **Bereinigung historischer CAD-SVGs:** `Euler - Explizit.svg` und `Euler - Implizit.svg` haben im SVG-Header `width="100mm" height="100mm"`. Dies wird in Stream B auf relative Größen bereinigt; in den Folien wird die absurde Deklaration `width:2000px` sofort auf `w:500` standardisiert.

### 5.3 Bereinigungsliste je Kapitel (44 Vorkommnisse)

| Kapitel | Anzahl | Betroffene Zeilen / Assets | Maßnahme |
|:---|:---:|:---|:---|
| **05 OpenGL** | **19** | Z. 127, 155, 236, 260, 282, 304, 329, 355, 375, 395, 487, 515, 546, 572, 597, 1061, 1094, 1129 (`width:1000px`) | Ersetzung durch `![w:500]` |
| **07 Statik** | **8** | Z. 58, 368, 396, 425 (`width:700px`), Z. 634, 693, 723, 752 (`width:800px`) | Ersetzung durch `![w:500]` (Z. 634 auf `![w:450]` wegen Quadratformat) |
| **08 Dynamik Kont.** | **3** | Z. 220 (`width:2000px`), Z. 244 (`width:1000px`), Z. 1248 (`width:1000px`) | Z. 220 & 244 auf `![w:500]`; Z. 1248 auf `![h:440px]` |
| **09 Dynamik Disk.** | **1** | Z. 852 (`width:1000` bei Inversionsmethode) | Ersetzung durch `![w:500]` |
| **10 Dynamik Hybr.** | **13** | Z. 56, 82, 104, 127, 154, 176, 319, 368, 393, 433, 456, 989 (`w:1000`) | Ersetzung der 12 TikZ-Grafiken durch `![w:500]`; Z. 989 durch `![h:440px]` |

---

## 6. AP-A5: Parallelitäts-, Reihenfolge- & Schnittstellenanalyse (Stream A vs. B)

### 6.1 Sofort parallel ausführbare Arbeitspakete
Die folgenden Aufgabenblöcke weisen **keinerlei externe Abhängigkeiten** auf und können sofort ausgeführt werden:
1. **AP-A1 (Theme-Schutzschild):** Änderung an `Themen/fhooe.css` greift sofort global auf alle 12 Foliensätze.
2. **AP-A3 (Heading-inside-Column Bereinigung):** Betrifft rein die Folienstruktur der Kapitel 05, 07, 08, 09, 10. Kann isoliert und kapitelweise parallel transformiert werden.
3. **AP-A4 (Spaltenbreitenharmonisierung):** Ersetzung von `w:1000` durch `w:500` bei allen bestehenden TikZ- und Rastergrafiken.

### 6.2 Schnittstellen zu Stream B (Mermaid-SVG-Neukompilierung)
Stream B überarbeitet die Mermaid-Quelldateien dreier kritischer Diagramme:
- `Blockschaltbild_DCServo.mmd` (Umstellung auf 2-stufiges Layout)
- `WPF_Visual_Hierarchie.mmd` (Vertikales Subgraphen-Stacking)
- `Szenengraph_Roboterarm.mmd` (Horizontales Layout `flowchart LR`)

**Interaktionsmatrix zwischen Stream A und Stream B:**

```
  Stream A: Theme & Layout                    Stream B: Grafiken & Medien
┌───────────────────────────────┐           ┌───────────────────────────────┐
│ AP-A1: CSS-Härtung            │           │ AP-B1: ScottPlot Neu-Export   │
│ - max-height: 480px           │           │ - 20-24pt Schriftgrößen       │
│ - min-width: 0                │           └──────────────┬────────────────┘
│ - Logo-Fix (Marpit bg)        │                          │
└──────────────┬────────────────┘                          ▼
               │                            ┌───────────────────────────────┐
               ▼                            │ AP-B2: Mermaid-Refactoring    │
┌───────────────────────────────┐           │ - DCServo: 2-stufig           │
│ AP-A2: 12 SVGs absichern      │           │ - Szenengraph: flowchart LR   │
│ - h:440px / h:380px           │◄── SCHUTZ ┤ - WPF: Subgraph-Stacking      │
│   (Temporärer Schutzschild    │   VOR B   └──────────────┬────────────────┘
│    verhindert Clipping sofort)│                          │
└──────────────┬────────────────┘                          ▼
               │                            ┌───────────────────────────────┐
               ▼                            │ AP-B3: mmdc Neukompilierung   │
┌───────────────────────────────┐           │ - Erzeugung neuer SVGs        │
│ AP-A3: Heading-inside-Column  │           └──────────────┬────────────────┘
│ - 83 Folien bereinigen        │                          │
│                               │                          ▼
│ AP-A4: Spaltenbreiten         │           ┌───────────────────────────────┐
│ - 44 Folien auf w:500         │           │ AP-B4: Finales Asset-Ready    │
└──────────────┬────────────────┘           └──────────────┬────────────────┘
               │                                           │
               └─────────────────────┬─────────────────────┘
                                     ▼
                      ┌───────────────────────────────┐
                      │ FINALISIERUNG & KOPPLUNG      │
                      │ - Stream A prüft neue SVGs    │
                      │ - Feinabstimmung w:500/h:440  │
                      │ - Beamer-Validierung 1080p    │
                      └───────────────────────────────┘
```

**Erkenntnis:** Durch das Setzen von `h:440px` in AP-A2 wird der Vorlesungsbetrieb sofort gegen Clipping abgesichert, selbst wenn Stream B für die Neuzeichnung der Mermaid-Diagramme Zeit benötigt. Sobald Stream B die neuen SVGs mit flacherem Seitenverhältnis bereitstellt, profitieren diese automatisch von der stabilen Spaltenarchitektur aus Stream A.

---

## 7. AP-A6: Qualitätssicherungs-Matrix & Validierungsskripte

### 7.1 Automatisierte PowerShell-Prüfskripte

Zur Absicherung der fehlerfreien Umsetzung werden folgende Verifikationsskripte ausgeführt:

#### Test 1: Prüfung auf verbliebene `Heading-inside-Column`-Inkonsistenzen
```powershell
$chapters = Get-ChildItem -Path "Folien" -Directory
$failed = 0
foreach ($c in $chapters) {
    $file = Join-Path $c.FullName "Folien.md"
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file)
        $matches = [regex]::Matches($content, '(?s)<div class="columns"[^>]*>\s*<div[^>]*>\s*###')
        if ($matches.Count -gt 0) {
            Write-Host "FAIL: $($c.Name) hat noch $($matches.Count) Headings in Spalte 1!" -ForegroundColor Red
            $failed += $matches.Count
        }
    }
}
if ($failed -eq 0) { Write-Host "PASS: 0 Headings in Spalten gefunden. Alle 83 Folien harmonisiert!" -ForegroundColor Green }
```

#### Test 2: Prüfung auf überbreite Spaltenbilder (`w:1000` / `width:1000px` / `width:2000px`)
```powershell
$badWidths = Select-String -Path "Folien\*\Folien.md" -Pattern "w:1000|width:1000|width:2000|width:800|width:700"
if ($badWidths.Count -eq 0) {
    Write-Host "PASS: Keine überbreiten Spaltenbilder (>540px) mehr vorhanden!" -ForegroundColor Green
} else {
    Write-Host "FAIL: Es verbleiben $($badWidths.Count) überbreite Bildreferenzen!" -ForegroundColor Red
}
```

#### Test 3: Verifikation der 12 geschützten SVG-Höhen
```powershell
$criticalSVGs = @(
    "Modellierungsmatrix.svg", "VIBN_Systemarchitektur.svg", "Simulationsprozess_Synthese.svg",
    "Szenengraph_Roboterarm.svg", "Model.svg", "Simulationsschleife_Explizit.svg",
    "Algebraische_Schleife_Praxis.svg", "Simulationsschleife_Implizit.svg",
    "Produktionssystem.svg", "Computernetzwerk.svg", "Nulldurchgang.svg", "Solver_Logik.svg"
)
foreach ($svg in $criticalSVGs) {
    $hits = Select-String -Path "Folien\*\Folien.md" -Pattern "!\[h:(380|440)px\].*$svg"
    if ($hits.Count -gt 0) {
        Write-Host "PASS: $svg ist mit fester Höhe geschützt." -ForegroundColor Green
    } else {
        Write-Host "WARN/FAIL: $svg besitzt keine explizite h:380px/h:440px Angabe!" -ForegroundColor Yellow
    }
}
```

### 7.2 Definition of Done (DoD)
Das Arbeitspaket Stream A gilt als erfolgreich abgeschlossen, wenn:
1. `Themen/fhooe.css` den Schutzschild (`max-height: 480px`, `min-width: 0`, Logo-Hide für Marpit bg) enthält und syntaktisch fehlerfrei kompiliert.
2. Auf allen 12 Titelfolien und allen Zwischenfolien kein FH-Logo über Grafiken liegt.
3. Keine der 12 identifizierten hochformatigen SVGs mehr über den Folienrand (720px) oder in den Footer hineinragt.
4. Alle 83 Überschriften in den Kapiteln 05, 07, 08, 09 und 10 vor die `<div class="columns">` verschoben sind und eine saubere, einheitliche Baseline bilden.
5. Alle 44 Spaltenbilder harmonisiert sind und keine Spaltenverdrängung mehr auftritt.
6. Alle automatisierten Verifikationstests (PowerShell) mit Status `PASS` durchlaufen.
