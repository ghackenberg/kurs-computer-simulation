# Final Audit: Grafiken, Diagramme & Visuelle Medien

**Vorlesung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (5./6. Semester)  
**Institution:** FH Oberösterreich, Campus Wels  
**Dozent:** Dr. Georg Hackenberg  
**Gegenstand:** Vollständiger technischer und ergonomischer Re-Audit aller Medien-Assets des Repositories (`Folien/00_Prolog` bis `Folien/11_Epilog`, `Quellen/`, `Grafiken/`, `Skripte/GrafikGenerator/`)  
**Audit-Datum:** Oktober 2026  
**Auditor:** Spezialisierter visueller Audit-Agent (Grafikqualität, Diagramme & Illustrationen)  

---

## 1. Executive Summary & Quantitative Gesamtbewertung

Im Rahmen dieses Deep Audits wurden sämtliche visuellen Assets des Vorlesungsmaterials auf **technische Renderqualität, typografische Lesbarkeit bei 1080p-Beamerprojektion, responsive Einpassung in das MARP-Layout sowie stilistische Kohärenz** untersucht.

Der Gesamtbestand umfasst:
- **127 SVG-Vektorgrafiken** (79 in `Folien/`, 39 in `Quellen/`, 9 in `Grafiken/`)
- **75 PNG-Rastergrafiken** (inkl. 5 ScottPlot-Generierungen und 26 Illustrationen)
- **89 JPG/JPEG-Bilder** (inkl. 11 Titelbilder und 52 Abschnittsillustrationen)
- **227 Bildreferenzen** in den 12 Vorlesungskapiteln (`Folien.md`)

```
================================================================================
                    GESAMTBEWERTUNG MEDIENQUALITÄT: 7.2 / 10
================================================================================
  [8.5/10] Vektorgrafik-Präzision (TikZ-Pfad-Glyphen, scharfe Geometrien)
  [5.5/10] Diagramm-Layout & Aspektverhältnisse (Extrem breite/hohe Mermaid-SVGs)
  [6.0/10] Folienintegration & Flexbox-Stabilität (44 überdimensionierte Spaltenbilder)
  [7.5/10] C#-Grafikgenerierung (ScottPlot 5, SkiaSharp-Pipelines)
  [8.5/10] Illustrationen & Titelbild-Kohärenz (Nano Banana KI-Stil)
================================================================================
```

### Die drei zentralen Kernbefunde:
1. **Das "Banner- und Turm-Problem" neuer Mermaid-SVGs:** Drei der neu generierten Diagramme weisen extreme Aspektverhältnisse auf:
   - `WPF_Visual_Hierarchie.svg` (Aspekt 11.9:1, $2229 \times 188\,\text{px}$) und `Blockschaltbild_DCServo.svg` (Aspekt 11.7:1, $1666 \times 142\,\text{px}$) werden durch horizontale Skalierung (`w:700` bzw. `w:480`) auf winzige effektive Schriftgrößen von **4.6 bis 5.0 Pixel** komprimiert – völlig unleserlich auf Hörsaal-Beamern!
   - `Szenengraph_Roboterarm.svg` (Aspekt 0.28:1, $242 \times 862\,\text{px}$) bildet eine vertikale Kette, deren Höhe bei `w:520` rechnerisch auf **1851 Pixel** explodiert und die 720px-Folienhöhe massiv sprengt.
2. **Die Flexbox-Spaltenüberlastung (44 Folien):** In zweispaltigen Layouts (`<div class="columns">`) werden Grafiken systematisch mit `w:1000`, `width:1000px`, `width:800px` und sogar einmal `width:2000px` (`Euler - Explizit.svg`) eingebunden. Da MARP-Spalten per CSS mit `flex-grow: 1` ohne `min-width: 0` definiert sind, drückt die überbreite Grafik die begleitende Textspalte auf Bruchteile ihrer Sollbreite zusammen oder überragt den rechten Folienrand.
3. **Exzellente Vektorschärfe bei TikZ & Nano-Banana-Titelbildern:** Alle 16 TikZ-Grafiken sind als reine Pfad-Glyphen kompiliert (100% unabhängig von installierten Systemschriften, unendlich scharf). Die 11 Titelbilder und thematischen Abschnittsillustrationen im Nano-Banana-Stil verleihen dem Kurs ein herausragendes, modernes und einheitliches Erscheinungsbild.

---

## 2. Deep Audit: Vektorgrafiken (SVG, Mermaid, TikZ)

### 2.1 TikZ-SVGs (Mathematik & Mechanik)
Im Kurs kommen 16 mit LaTeX/TikZ erzeugte SVG-Dateien zum Einsatz (insbesondere in Kapitel 07, 09 und 10):
- `Folien/07_Statische_Modelle/Diagramme/`: `Kraeftegleichgewicht_2D.tikz.svg`, `Stablaengenaenderung.tikz.svg`, `Stablaengenaenderung_Approximation.tikz.svg`
- `Folien/09_Dynamische_Modelle_Diskret/Diagramme/`: `Inversionsmethode_Prinzip.tikz.svg`
- `Folien/10_Dynamische_Modelle_Hybrid/Diagramme/`: 6 Bouncing-Ball-Phasendiagramme, 6 Digital-Sensor-Abtastdiagramme

**Prüfungsergebnis:**
- **Glyphen-Rendering:** Alle TikZ-SVGs wurden über `dvisvgm`/`pdf2svg` konvertiert. Textelemente liegen nicht als `<text>`-Tags vor, sondern als vektorisierte Zeichenumrisse (`<defs><path id="glyph..."/></defs><use xlink:href="#glyph..."/>`).
- **Beamer-Tauglichkeit (1080p):** **Exzellent.** Die Pfade rendern mathematisch perfekt, ohne Kantenglättungsverluste oder Schriftartensubstitutionen.
- **Kritischer Skalierungsfehler in Kapitel 07:**
  - `Kraeftegleichgewicht_2D.tikz.svg` hat eine quadratische ViewBox ($100.6 \times 100.6$). Auf Folie 39 wird es mit `![width:800px]` in eine rechte Spalte eingebunden. Da die Folienhöhe nur 720px beträgt und die Spaltenbreite bei ca. 550px liegt, bricht die Grafik sowohl vertikal als auch horizontal aus dem Spaltencontainer aus.
  - Hinzu kommt ein didaktischer Lapsus: Die Folie behandelt das **3D-Kräftegleichgewicht** ($\sum F_z = 0$), zeigt aber das 2D-Kräftedreieck.

---

### 2.2 Neu generierte Mermaid-SVGs

Die fünf neu generierten Mermaid-SVGs wurden im Hinblick auf ViewBox, Seitenverhältnis, Typografie und Folienwirkung im Detail vermessen:

| SVG-Datei | Kapitel & Folie | ViewBox ($B \times H$) | Aspekt ($B/H$) | MARP-Direktive | Effektive Textgröße auf 1080p | Visuelle Bewertung |
|:---|:---|:---:|:---:|:---|:---:|:---|
| **`LUT_Farbskala_Prinzip.svg`** | 02, F. 19 (Z. 389) | $276 \times 580$ | 0.48:1 | `![w:380]` | ca. 22.0 px | **Mittel:** Text gut lesbar, aber Höhe skaliert auf $798\,\text{px}$ (Folienüberlauf bei $720\,\text{px}$ Basis!). |
| **`FDM_5_Punkt_Stern.svg`** | 02, F. 24 (Z. 486) | $389.9 \times 398$ | 0.98:1 | `![w:340]` | ca. 14.0 px | **Hervorragend:** Fast quadratisch, perfekte Spaltenbalance, saubere Beschriftung $(i, j\pm 1)$. |
| **`WPF_Visual_Hierarchie.svg`** | 03, F. 27 (Z. 550) | $2229.4 \times 188$ | **11.86:1** | `![w:700]` | **ca. 5.0 px** | **Kritisch unleserlich:** Zwei Subgraphen nebeneinander erzeugen extremes Bannerformat. 70% Skalierungsverlust! |
| **`Szenengraph_Roboterarm.svg`** | 05, F. 54 (Z. 1221) | $242.2 \times 862$ | **0.28:1** | `![w:520]` | N/A (Skalierungsfehler) | **Kritischer Überlauf:** Lineare Kette explodiert bei $w:520$ auf $1851\,\text{px}$ Höhe (Faktor 2.57 über Folienhöhe!). |
| **`Blockschaltbild_DCServo.svg`** | 08, F. 66 (Z. 1650) | $1666.3 \times 142$ | **11.73:1** | `![w:480]` | **ca. 4.6 px** | **Kritisch unleserlich:** Vollständiger Regelkreis mit 7 Blöcken in Halbspalte gequetscht; Texthöhe < 5 px. |

#### Detailanalyse der Problemfälle:

1. **`Blockschaltbild_DCServo.svg`:**
   ```
   [Sollwert] -> ( + ) -> [PID-Regler] -> [Sättigung] -> [DC-Motor] -> [Wegintegrator] -> [Istwert]
                   ^---|----------------------------------------------------------------------|
                       |--- Anti-Windup Freeze <---|
   ```
   *Befund:* Dieses Diagramm enthält hochrelevante mechatronische Details (Sättigung $\pm 10\,\text{V}$, Gleichungen $T_m \dot{\omega} + \omega = K_m u$, Anti-Windup-Freeze-Pfad). Auf $w:480$ geschrumpft, ist kein einziges Formelzeichen im Hörsaal identifizierbar.
   *Lösung:* Aufteilung auf Folienbreite ($w:1100$, 1-Spalten-Folie) ODER 2-zeiliger Umbruch im Mermaid-Graph (`PID` und `Sättigung` in Zeile 1, `Motor` und `Integrator` in Zeile 2).

2. **`WPF_Visual_Hierarchie.svg`:**
   *Befund:* Stellt `DrawingVisual -> Visual` der Kette `Shape -> FrameworkElement -> UIElement -> Visual` gegenüber. Weil beide Ketten horizontal nebeneinander liegen (`flowchart LR`), entsteht eine 2229 Pixel breite Schlange.
   *Lösung:* Vertikales Stacking der beiden Subgraphen (`subgraph A` über `subgraph B`), sodass das Diagramm ca. $1000 \times 400\,\text{px}$ misst (Aspekt 2.5:1). Auf $w:700$ gerendert verbleiben dann gestochen scharfe $11.2\,\text{px}$ Textgröße.

3. **`Szenengraph_Roboterarm.svg`:**
   *Befund:* `BaseNode -> Rotate1 -> Arm1Node -> Translate1 -> Rotate2 -> Arm2Node -> ToolCenterPoint`. Eine rein vertikale Kette (`flowchart TD`) mit 7 Knoten à 78px Höhe plus Abständen.
   *Lösung:* Umstellung auf horizontales Layout (`flowchart LR`) oder 2-stufigen Baum (`Base` verzweigt horizontal in `Joint1 -> Link1 -> Joint2 -> Link2 -> TCP`).

---

### 2.3 Ältere Vektorgrafiken & CAD-Exporte
- In `Folien/08_Dynamische_Modelle_Kontinuierlich/Diagramme/` liegen `Euler - Explizit.svg` und `Euler - Implizit.svg`.
- Beide Dateien enthalten ein hart kodiertes Wurzelelement:
  `<svg version="1.2" width="100mm" height="100mm" viewBox="0 0 10000 10000">`
- Da der Renderer mm-Einheiten als absolute CSS-Einheiten interpretiert, führte dies im Markdown zu Notlösungen wie `![width:2000px](./Diagramme/Euler%20-%20Explizit.svg)`.
- *Empfehlung:* Bereinigung der Wurzelelemente auf `width="100%" height="100%" viewBox="0 0 10000 10000"` und konsistente Skalierung in den Folien auf `w:500`.

---

## 3. Deep Audit: Screenshots & Bitmap-Grafiken

### 3.1 Die "Spalten-Überlastungskrise" (44 Vorkommnisse)
Das CSS-Layout von `Themen/fhooe.css` definiert zweispaltige Folien wie folgt:
```css
section div.columns { display: flex; flex-direction: row; gap: 30px; }
section div.columns > div { flex-basis: 1rem; flex-grow: 1; }
```
Ein Flex-Container ohne `min-width: 0` auf den Kind-Elementen erlaubt es Kindern, sich entsprechend ihrer minimalen Inhaltsbreite auszudehnen. Wenn eine Bildreferenz `width: 1000px` verlangt, nimmt die Bildspalte 1000px ein. Bei einer Gesamtbreite von 1280px und 120px Randabstand verbleiben für die Textspalte lediglich **130 Pixel**!

**Verteilung der 44 überdimensionierten Spaltenbilder:**
- **Kapitel 05 (OpenGL):** 19 Folien mit `width:1000px` (z.B. Primitive-Screenshots `OpenGL_Primitives_*.png`, Normalenvektoren, Shading-Diagramme).
- **Kapitel 10 (Hybride Modelle):** 13 Folien mit `w:1000` (alle Bouncing-Ball- und Digital-Sensor-TikZ-Diagramme).
- **Kapitel 07 (Statik):** 8 Folien mit `width:700px` oder `width:800px` (Fachwerkbeispiele und Stabkraft-Herleitungen).
- **Kapitel 08 (Kontinuierlich):** 3 Folien (`Euler - Explizit.svg` mit `width:2000px`, `Euler - Implizit.svg` mit `width:1000px`, `Algebraische_Schleife_Praxis.svg` mit `width:1000px`).
- **Kapitel 09 (Diskret):** 1 Folie (`Inversionsmethode_Prinzip.tikz.svg` mit `width:1000`).

> [!WARNING]
> **Layout-Impact:** Bei allen diesen 44 Folien wird das proportionale 50/50- oder 60/40-Layout zerstört. Entweder bricht der Fließtext in unleserliche 1-2-Wort-Kolumnen um, Formeln ragen über den Spaltenrand, oder das Bild wird rechts abgeschnitten.

---

### 3.2 ScottPlot-Grafiken & C#-Generator (`Skripte/GrafikGenerator`)
Die mit ScottPlot 5 und SkiaSharp generierten Plots in `Program.cs` stellen eine didaktisch herausragende Aufwertung des Kurses dar. Die Codegrundlage ist stabil und sauber parametrisiert.

**Detailprüfung der fünf generierten Plots:**
1. **`Solver_Konvergenzordnung.png` ($850 \times 480\,\text{px}$):**
   - Eingebunden auf Kapitel 08, Folie 71 mit `![bg right:55% width:650px]`.
   - *Befund:* Log-Log-Konvergenzgeraden (Euler O($h^1$), Heun O($h^2$), RK4 O($h^4$)) sind optisch sehr gut unterscheidbar (Crimson, RoyalBlue, SeaGreen).
   - *Kritik:* Standard-Schriftgröße der Achsenbeschriftung `log10(Globaler Fehler...)` ist bei 650px Bildbreite mit ca. 10pt relativ zierlich.
2. **`AntiWindup_Vergleich.png` ($800 \times 480\,\text{px}$):**
   - Eingebunden auf Kapitel 08, Folie 76 mit `![w:480]`.
   - *Befund:* Vergleich von 60% Überschwingen vs. aperiodischer Dämpfung mit Clamping ist didaktisch brillant.
   - *Kritik:* Bei `w:480` wird das 800px-Bild auf 60% herunterskaliert. Ticks und Legendentext schrumpfen auf ca. 8pt.
3. **`ClosedLoop_RK4_StepResponse.png` ($800 \times 480\,\text{px}$):**
   - Eingebunden auf Kapitel 08, Folie 79 mit `![w:460]`.
   - *Befund:* Duale Darstellung von Stellgröße $u(t)$ und Wellenposition $\theta(t)$.
   - *Kritik:* Selber Skalierungseffekt wie bei Anti-Windup (Faktor 0.57x).
4. **`ScottPlot_Signal_Example.png` ($800 \times 450\,\text{px}$):**
   - Eingebunden auf Kapitel 04, Folie 11 mit `![width:560px]`.
   - *Befund:* Zeigt 100.000 Punkte bei 60 FPS. Gut lesbar, Orange-Akzent harmoniert mit Dark-Mode-Themes.
5. **`Randbedingungen_Vergleich.png` ($420 \times 460\,\text{px}$):**
   - Eingebunden auf Kapitel 02, Folie 30 mit `![w:420]`.
   - *Befund:* Natives SkiaSharp-Rendering (180x180 Raster mit Dirichlet vs. Neumann). Mit $420 \times 460\,\text{px}$ niedrigste Auflösung aller Plots; auf 4K-Monitoren sichtbar verwaschen.

---

### 3.3 Low-Res Bitmaps & extremes Upscaling

| Datei | Originalgröße | Verwendet in | Deklarierte Breite | Skalierungsfaktor | Problem |
|:---|:---:|:---|:---:|:---:|:---|
| `OpenGL_Normalen.png` | $400 \times 200\,\text{px}$ | 05, F. 18 | `width:1000px` | **2.50x** | Starke Pixelierung von Text und Vektorpfeilen |
| `Sphere_Slices_Stacks.png` | $361 \times 362\,\text{px}$ | 05, F. 52 | `width:1000px` | **2.77x** | Unscharfe Rastergitterlinien |
| `Heatmap_Temperaturfeld.png` | $400 \times 300\,\text{px}$ | 02, F. 31 | `w:380` | 0.95x | Scharf (nahe 1:1), aber geringe Schirmabdeckung |
| `Pendelsimulation.png` | $576 \times 302\,\text{px}$ | 08, F. 29 | default | 1.0x | Historischer Screenshot, geringer Kontrast |
| `Fachwerk_Elemente.png` | $550 \times 269\,\text{px}$ | 07, F. 11 | default | 1.0x | Leicht unscharfe Knotenindizes |

---

## 4. Deep Audit: Illustrationen (Nano Banana) & Titelbilder

### 4.1 Stilistische Kohärenz der Nano-Banana-Assets
Die im Ordner `Illustrationen/` hinterlegten Bilder folgen einem hochqualitativen, modernen Design-Paradigma:
- **Farbpalette:** Dominierendes FH-Blau (`#004B96`), technische Cyan- und Akzent-Orange-Töne, neutraler dunkler/hellgrauer Hintergrund.
- **Motivik:** Isometrische Fabrikmodule, Roboterkinematiken, mathematische Gitternetze, Digital-Twin-Dashboards und Server-Racks.
- **Atmosphäre:** Technisch fundiert, akademisch seriös, keine verspielten Comic-Klischees.

### 4.2 Format-Inkonsistenz der Titelbilder
Alle 12 Kapitel nutzen auf Folie 1 die Direktive `![bg right](./Titelbild.jpg)` (bzw. `.png` in Kapitel 00). Die Bilddateien weisen jedoch zwei unterschiedliche Seitenverhältnisse auf:

```
Kapitel 00, 01, 05, 07, 08, 09, 10:  1024 x 1024 px  (1:1 Quadrat)
Kapitel 02, 03, 04, 06, 11:          896 x 1200 px   (3:4 Hochformat)
```

**Ergonomische Auswirkung:**
- Da MARP das CSS-Verhalten `background-size: cover` auf Background-Splits anwendet, füllt ein 3:4-Hochformatbild die rechte Bildschirmhälfte (Verhältnis 8:9 bei 16:9-Splits) fast ideal aus.
- Quadratische Bilder ($1024 \times 1024$) werden vertikal um ca. 12% an den oberen und unteren Bildrändern beschnitten. Bei den aktuellen Motiven ist dies unkritisch, da die relevanten Bildinhalte zentriert sind. Dennoch sollte für künftige Generationen ein einheitliches Seitenverhältnis (vorzugsweise 3:4 oder 9:16) angestrebt werden.

### 4.3 Didaktische Rhythmisierung durch Zwischenillustrationen
- **Vorbildlich (Kapitel 01, 09, 10):** Jeder Hauptabschnitt wird durch eine Vollbild-Split-Folie (`![bg right](./Illustrationen/Abschnitt_X.jpg)`) eröffnet. Dies schafft visuelle Ruhe und gliedert mehrstündige Vorlesungseinheiten perfekt.
- **Defizitär (Kapitel 02, 03, 04, 06):** In Kapitel 03 (2D-Vektor) und Kapitel 06 (Multithreading) existiert **keine einzige Illustration** im Ordner `Illustrationen/`. Hier besteht eine visuelle Monotonie aus reinem C#-Code und Bulletpoints.

---

## 5. Schweregrad-Klassifizierung & Detail-Befunde

### Kategorie A: Kritische Mängel (Sofortiger Handlungsbedarf)

| ID | Komponente / Folie | Asset-Pfad | Befund / Ursache | Behebung |
|:---:|:---|:---|:---|:---|
| **A-1** | 08 Continuos, F. 66 | `Diagramme/Blockschaltbild_DCServo.svg` | Aspekt 11.7:1 auf `w:480` gequetscht. Textgröße 4.6 px ist auf Beamer unlesbar. | Entweder Vollbreite (`w:1100`) auf eigener Folie ODER Mermaid-Graph zweizeilig umbrechen. |
| **A-2** | 03 Vektor, F. 27 | `Diagramme/WPF_Visual_Hierarchie.svg` | Aspekt 11.9:1 auf `w:700` gequetscht. Textgröße 5.0 px unleserlich. | Subgraphen vertikal stacken (Höhe vergrößern, Breite auf ca. 1000px reduzieren). |
| **A-3** | 05 3D-OpenGL, F. 54 | `Diagramme/Szenengraph_Roboterarm.svg` | Aspekt 0.28:1 mit 862px Höhe sprengt bei `w:520` (1851px Höhe) die Folie. | Umstellung auf horizontales Layout (`flowchart LR`) oder 2-Spalten-Baum. |
| **A-4** | 08 Continuos, F. 10 | `Diagramme/Euler - Explizit.svg` | Eingebunden mit `width:2000px` in Spalte. Zerstört Layout komplett. | SVG-Header bereinigen (100% statt 100mm), Skalierung auf `w:480` korrigieren. |
| **A-5** | 05, 07, 08, 10 (44 Folien) | Diverse SVGs & PNGs | `w:1000`, `width:1000px`, `width:800px` innerhalb `<div class="columns">`. Textspalten werden erdrückt. | Batch-Harmonisierung aller Spaltenbilder auf maximal `w:500` bis `w:540`. |
| **A-6** | 07 Statik, F. 39 | `Diagramme/Kraeftegleichgewicht_2D.tikz.svg` | Quadratische Grafik mit `width:800px` in Spalte (Höhe 800px > 720px Folie). Zudem 2D-Grafik auf 3D-Folie. | Skalierung auf `w:450` reduzieren; thematisch passendes 3D-Kräftebild einsetzen. |

---

### Kategorie B: Mittlere Mängel (Optimierung empfohlen)

| ID | Komponente / Folie | Asset-Pfad | Befund / Ursache | Behebung |
|:---:|:---|:---|:---|:---|
| **B-1** | 08 Continuos, F. 76, 79 | `AntiWindup_Vergleich.png`, `ClosedLoop_RK4_StepResponse.png` | ScottPlot-Standardfonts (12–14pt) werden bei `w:480` auf ~8pt herunterskaliert. | In `Program.cs` Schriftgrößen für Achsen, Titel und Legende explizit auf 20–24pt anheben. |
| **B-2** | 05 3D-OpenGL, F. 18, 52 | `OpenGL_Normalen.png`, `Sphere_Slices_Stacks.png` | Niedrige Originalauflösung (~360–400px) wird auf `1000px` hochskaliert (matschig/pixelig). | Vektorisierung als SVG oder Neuaufnahme in nativer 1080p-Auflösung. |
| **B-3** | 02 Pixel, F. 30 | `Randbedingungen_Vergleich.png` | SkiaSharp-Canvas nur $420 \times 460\,\text{px}$. Schrift 12/15pt wirkt leicht unscharf. | In `Program.cs` Auflösung verdoppeln ($840 \times 920\,\text{px}$) und mit `w:420` einbinden (2x HiDPI). |
| **B-4** | 02, 03, 04, 06 | Fehlende Illustrationen | Keine Abschnitts-Divider-Illustrationen vorhanden. Stilbruch zu Kapitel 01, 09, 10. | Ergänzung von 3–4 thematischen Nano-Banana-Illustrationen je Kapitel. |

---

### Kategorie C: Geringe Mängel / Polishing

| ID | Komponente / Folie | Asset-Pfad | Befund / Ursache | Behebung |
|:---:|:---|:---|:---|:---|
| **C-1** | 01, 05, 07, 08, 09, 10 | `Titelbild.jpg` | Quadratisches Seitenverhältnis ($1024 \times 1024$) weicht von 3:4 ($896 \times 1200$) ab. | Bei Gelegenheit auf 3:4-Format standardisieren. |
| **C-2** | Alle Kapitel | Diverse Bildreferenzen | Syntax-Inkonsistenz: Mix aus `![w:500]`, `![width:500px]` und `![width:500]`. | Vereinheitlichung auf die schlanke MARP-Syntax `![w:500]`. |
| **C-3** | 08 Continuos, F. 69 | `Illustrationen/Solver_Konvergenzordnung.png` | Syntaktische Dopplung: `![bg right:55% width:650px]`. | Bereinigen auf reines `![bg right:55%]`. |

---

## 6. Konkreter Aktionsplan & Empfehlungen für den visuellen Feinschliff

### Phase 1: CSS-Schutzhärtung im Theme (`Themen/fhooe.css`)
Damit überdimensionierte Bildangaben im Markdown das Spaltenlayout künftig nicht mehr zerstören können, sollte die Spaltenregel in `fhooe.css` um robuste Begrenzungen erweitert werden:

```css
/* Robuste Begrenzung für Medien in Spalten */
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

### Phase 2: Refactoring der drei kritischen Mermaid-Diagramme

1. **`Blockschaltbild_DCServo.svg`:**
   Umstellung von linearer Kette auf 2-stufiges Layout mit vergrößerten Fonts:
   ```mermaid
   flowchart TD
     subgraph Vorwaertspfad [Regelkreis-Vorwärtspfad]
       W["Sollwert w(t)"] --> Sum1((+))
       Sum1 -->|"e(t)"| PID["PID-Regler"]
       PID -->|"u_raw"| Sat["Sättigung ±10V"]
       Sat -->|"u(t)"| Motor["DC-Motor PT1"]
       Motor -->|"ω(t)"| Int["Integrator"]
       Int --> Y["Istwert θ(t)"]
     end
     Y -.->|Rückführung -| Sum1
     Sat -.->|Anti-Windup Freeze| PID
   ```

2. **`WPF_Visual_Hierarchie.svg`:**
   Übereinander anordnen statt nebeneinander:
   ```mermaid
   flowchart TD
     subgraph Pipeline ["1. Hochperformante Vektor-Pipeline (Retained Mode)"]
       DV["DrawingVisual (Reiner Befehlsstream)"] -->|"erbt direkt"| V1["Visual"]
     end
     subgraph Standard ["2. Schwergewichtige Standard-Hierarchie"]
       S["Shape"] --> FE["FrameworkElement"] --> UI["UIElement"] --> V2["Visual"]
     end
   ```

3. **`Szenengraph_Roboterarm.svg`:**
   Von `flowchart TD` auf horizontales `flowchart LR` umstellen, damit die Grafik perfekt in ein 16:9-Folienverhältnis passt.

### Phase 3: Optimierung des C#-Grafikgenerators (`Skripte/GrafikGenerator/Program.cs`)
- **HiDPI-Renderings:** Exportauflösung aller ScottPlot-Grafiken von $800 \times 480$ auf $1600 \times 960$ verdoppeln (2x Retina).
- **Typografie-Vergrößerung:**
  ```csharp
  plot.Axes.Title.Label.FontSize = 22;
  plot.Axes.Bottom.Label.FontSize = 18;
  plot.Axes.Left.Label.FontSize = 18;
  plot.Axes.Bottom.TickLabelStyle.FontSize = 14;
  plot.Axes.Left.TickLabelStyle.FontSize = 14;
  plot.Legend.FontSize = 16;
  ```
- **`Randbedingungen_Vergleich.png`:** Bitmap-Dimensionen von $420 \times 460$ auf $840 \times 920$ anheben, Schriftgröße im SkiaSharp-Paint auf `TextSize = 24` skalieren.

### Phase 4: Batch-Harmonisierung der 44 Spalten-Bildreferenzen
In allen betroffenen Kapiteln (insb. 05, 07, 08, 10) die Bildbreiten innerhalb von `<div class="columns">` von `w:1000` / `width:1000px` auf `w:500` vereinheitlichen:
```markdown
<!-- Vorher (Fehlerhaft) -->
<div class="columns">
<div> ... Text ... </div>
<div>
![width:1000px](./Diagramme/Phong%20-%20Diffuse.svg)
</div>
</div>

<!-- Nachher (Ergonomisch) -->
<div class="columns">
<div> ... Text ... </div>
<div>
![w:500](./Diagramme/Phong%20-%20Diffuse.svg)
</div>
</div>
```

---

## 7. Fazit & Reifegrad

Der visuelle Gesamtzustand des Kurses befindet sich auf einem **hohen didaktischen und ästhetischen Niveau (Note: 7.2 / 10)**. Die Einführung des Nano-Banana-Artwork-Stils und moderner Vektorgrafiken hebt den Kurs deutlich über den typischen Hochschulstandard hinaus.

Die identifizierten Mängel resultieren fast ausnahmslos aus **Skalierungs- und Aspektverhältnis-Kollisionen** an den Schnittstellen zwischen SVG-Generierung und MARP-Flexbox-Layout. Durch die Umsetzung der vier im Aktionsplan definierten Phasen kann der visuelle Reifegrad ohne großen Aufwand auf **9.5 / 10 (Gold-Standard)** gehoben werden.
