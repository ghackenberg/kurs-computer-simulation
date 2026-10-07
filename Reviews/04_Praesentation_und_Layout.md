# Analyse & Review: Präsentationstechnik, MARP-Layout und visuelle Gestaltung

**Vorlesung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (5./6. Semester)  
**Institution:** FH Oberösterreich, Campus Wels  
**Dozent:** Dr. Georg Hackenberg  
**Gegenstand der Analyse:** Vollständiger Foliensatz (`Folien/00_Prolog` bis `Folien/11_Epilog`, 509 Folien) inklusive Themes, Notizen und Bildressourcen  
**Datum:** Oktober 2026  

---

## 1. Executive Summary & Gesamteindruck

Die Vorlesungsreihe **"Systemsimulation / Digitaler Zwilling"** nutzt ein modernes, auf Markdown basierendes Präsentations-Ökosystem (**MARP**) mit einem eigens angefertigten Corporate-Design-Theme für die Fachhochschule Oberösterreich (`Themen/fhooe.css`). Die Gesamtreihe umfasst **12 Kapitel mit 509 Folien**, die durch ein hohes Maß an fachlicher Substanz, didaktisch durchdachte Code-Architekturen und eine reiche visuelle Untermalung (Vektorgrafiken via TikZ und Mermaid.js, Software-Screenshots, fotorealistische Visualisierungen) bestechen.

Trotz dieser hervorragenden inhaltlichen Basis zeigt die systematische Begutachtung aus der Perspektive von **Präsentationstechnik, MARP-Layout, Typografie und Beamer-Tauglichkeit** gravierende Inkonsistenzen und visuelle Mängel, welche die Lesbarkeit im Hörsaal beeinträchtigen und technische Ausfallrisiken bergen:

1. **Defekte Bildpfade & 404-Fehler:** In Kapitel 07 (*Statische Modelle*) verweisen drei zentrale Folien auf einen nicht existierenden Ordner (`../03_Statische_Modelle_3D/`), wodurch während der Vorlesung broken images erscheinen.
2. **Kritische Abhängigkeit von externem Hotlinking:** Über 15 Grafiken (insbesondere in Kapitel 05 *OpenGL* und Kapitel 09 *Diskrete Modelle*) sind als externe HTTP/HTTPS-Links (Wikipedia, Drittanbieter-Websites) eingebunden. Ohne stabile Internetverbindung im Hörsaal oder bei URL-Änderungen der Drittseiten schlagen diese Bildaufrufe fehl.
3. **Verwaiste Assets & vergessene Folien-Upgrades:** Für die Kapitel 03, 04 und 06 wurden bereits hochwertige Titelbilder (`Titelbild.jpg`) generiert, diese wurden jedoch nie auf Folie 1 verlinkt. In `Notizen.md` stehen sie fälschlich weiterhin als offene TODOs. Ebenso existieren in Kapitel 05 hochwertige, lokale SVG-Vektorgrafiken zum Phong-Modell, während auf der Folie stattdessen ein externes Rasterbild verlinkt ist.
4. **Typografische Überladung & die "Code-Block-Krise":** Auf mindestens 16 Folien überschreiten Quellcode-Blöcke die kritische Grenze von 20 Zeilen (Spitzenreiter: 28 Zeilen mit bis zu 101 Zeichen Zeilenbreite). Im 1.5rem-Großschrift-Layout von MARP führt dies bei Projektion unweigerlich zu vertikalem Abschneiden über den Folienfuß hinaus oder horizontalem Textumbruch.
5. **Theme-Architektur & Logo-Kollision:** Das Eck-Logo der FH OÖ wird über ein Pseudo-Element (`section::before`) mit relativer URL (`../../Themen/fhooe.svg`) fest auf jeder Folie verankert. Dies kollidiert mit langen Folientiteln, breiten Diagrammen und überdeckt Teile von Titelfolien. Zudem fehlen auf sämtlichen Titelfolien Scoped Directives (`<!-- _paginate: false -->`, `<!-- _header: "" -->`), wodurch Titelfolien unprofessionell die Foliennummer "1" und redundante Kopfzeilen tragen.
6. **Inkonsistentes Encoding (UTF-8 BOM):** Drei Kapitel (07, 08, 10) wurden mit Byte Order Mark (`\xef\xbb\xbf`) abgespeichert, was in diversen CI/CD-Pipelines und MARP-Parsern zu Frontmatter-Fehlern führt.
7. **Vernachlässigte Begleitnotizen:** Vier Kapitel (00, 01, 09, 10) besitzen völlig leere `Notizen.md`-Dateien (0 Zeilen), während Kapitel 02 und 11 mustergültig ausgearbeitet sind.

---

## 2. Quantitative Bestandsaufnahme des Gesamtkurses

Die nachfolgende Matrix fasst die Kennzahlen aller 12 Vorlesungskapitel zusammen:

| Kapitel | Folien | Code >20 Z. | Code 16–20 Z. | Zeilen >80 Z. | Spaltenfolien | Ext. Links | Broken Images | Low-Res (<800x600) | Notizen (Zeilen / TODOs) | UTF-8 BOM |
|:---|---:|---:|---:|---:|---:|---:|---:|---:|:---|:---:|
| **00 Prolog** | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 Z. / 0 offen | Nein |
| **01 Einführung** | 36 | 0 | 0 | 0 | 19 | 0 | 0 | 7 | 0 Z. / 0 offen | Nein |
| **02 2D-Pixel** | 29 | 3 | 4 | 4 | 5 | 0 | 0 | 1 | 15 Z. / 0 offen | Nein |
| **03 2D-Vektor** | 32 | 3 | 3 | 4 | 8 | 0 | 0 | 0 | 7 Z. / 1 offen | Nein |
| **04 2D-Diagramme** | 28 | 2 | 4 | 4 | 7 | 1 | 0 | 1 | 5 Z. / 1 offen | Nein |
| **05 3D-OpenGL** | 78 | 3 | 5 | 5 | 43 | 9 | 0 | 9 | 10 Z. / 5 offen | Nein |
| **06 Multithreading** | 24 | 1 | 0 | 0 | 12 | 0 | 0 | 0 | 3 Z. / 2 offen | Nein |
| **07 Statik** | 54 | 1 | 1 | 0 | 20 | 0 | **3** | 2 | 2 Z. / 0 offen | **Ja** |
| **08 Dynamik Kont.** | 62 | 0 | 5 | 0 | 33 | 0 | 0 | 4 | 2 Z. / 0 offen | **Ja** |
| **09 Dynamik Diskret** | 53 | 2 | 1 | 2 | 24 | 4 | 0 | 3 | 0 Z. / 0 offen | Nein |
| **10 Dynamik Hybrid** | 67 | 1 | 2 | 7 | 28 | 0 | 0 | 0 | 0 Z. / 0 offen | **Ja** |
| **11 Epilog** | 32 | 0 | 1 | 1 | 22 | 0 | 0 | 0 | 9 Z. / 0 offen | Nein |
| **Gesamt** | **509** | **16** | **26** | **27** | **221** | **14** | **3** | **27** | **53 Z. / 9 offen** | **3 von 12** |

---

## 3. MARP-Syntax, Theme `fhooe` & Corporate Identity

### 3.1 Analyse des Themes `Themen/fhooe.css`
Das zentrale Stylesheet der Vorlesung erweitert das MARP-Basistheme `default`:

```css
/* @theme fhooe */
@import 'default';

section {
    position: relative;
    font-size: 1.5rem;
}

section::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    width: 5rem;
    height: 5rem;
    background-color: #004B96;    
    background-image: url(../../Themen/fhooe.svg);
    background-repeat: no-repeat;
    background-size: 66%;
    background-position: center;
}
```

#### Identifizierte Schwachstellen und Risiken:
1. **Fragile Pfadauflösung beim FH-Logo (`url(../../Themen/fhooe.svg)`):**
   Die CSS-Eigenschaft referenziert die Vektorgrafik mit zwei relativen Ebenen nach oben (`../../Themen/fhooe.svg`). Dies funktioniert ausschließlich dann, wenn MARP-CLI oder die VS-Code-Preview direkt aus einer Datei im Verzeichnis `Folien/XX_Kapitel/` aufgerufen wird. Wird das Stylesheet für ein Skript im Hauptverzeichnis oder in einem abweichenden Export-Pfad (`build/`, `dist/`, `Reviews/`) aufgerufen, bricht der Pfad ab und das Logo wird nicht gerendert.
   *Empfehlung:* Einbettung des FH-OÖ-Signets direkt als Inline-Vektordaten oder Base64-Data-URI (`background-image: url("data:image/svg+xml;utf8,...")`). Dadurch wird das Theme vollkommen portabel und unabhängig von Verzeichnishierarchien.

2. **Fehlende Ausnahme für Titelfolien und Lead-Folien:**
   `section::before` greift undifferenziert auf **jede** Folie zu. Auf der Titelfolie überlagert das 5rem $\times$ 5rem große blaue Quadrat die rechte obere Ecke des Titelbildes (`![bg right]`) oder ragt unschön in breite Überschriften hinein.
   *Empfehlung:* Ausschluss per CSS-Pseudoklasse: `section:not(.title):not(.lead)::before`.

3. **Kollision mit MARP-Header:**
   Da `section::before` mit `top: 0; right: 0; width: 5rem; height: 5rem; z-index: 100;` absolut positioniert ist, verdeckt es den rechten Rand des Folienheaders (`header`). Ist der Titel eines Kapitels oder Abschnitts etwas länger (z.B. in Kapitel 06: *"Kapitel 6: Multithreading & Parallele Simulation"*), läuft der Header-Text direkt unter oder in das blaue Quadrat hinein.

4. **Fehlende Typografie-Regeln für Code-Blöcke:**
   In `Themen/fhooe.css` existieren keinerlei explizite Formatierungsregeln für `<pre>` und `<code>`. Bei einer Basisschriftgröße von `1.5rem` (24px) führt die standardmäßige Skalierung von `pre` dazu, dass Code-Blöcke ab ca. 14 Zeilen den sichtbaren Bereich nach unten verlassen und ab ca. 60–65 Zeichen horizontal über die Folie ragen.

### 3.2 Header-, Footer- und Datums-Konsistenz
Die Frontmatter-Definitionen weisen über die Kapitel hinweg Unstimmigkeiten auf:

1. **Veraltetes / Hardcodiertes Datum in den Kapiteln 00 und 01:**
   - `00_Prolog/Folien.md`: `header: Prolog (2025-12-05)`
   - `01_Einführung/Folien.md`: `header: 'Kapitel 1: Einführung (2025-12-05)'`
   - Alle anderen Kapitel (02 bis 11): Enthalten **kein Datum** im Header (z.B. `header: 'Kapitel 2: 2D-Visualisierung (WPF/Pixel)'`).
   *Auswirkung:* Studierende sehen in den ersten beiden Vorlesungen ein festes Datum aus dem Wintersemester 2025, das in nachfolgenden Wochen plötzlich verschwindet.
2. **Inkonsistente YAML-Syntax:**
   In Kapitel 00 ist der Header ohne Anführungszeichen deklariert (`header: Prolog (2025-12-05)`), ab Kapitel 01 mit einfachen Anführungszeichen (`'...'`). YAML-Parser interpretieren Sonderzeichen wie Doppelpunkte ohne Quotes oft als Syntaxfehler.
3. **Fehlende Scoped Directives auf Titelfolien:**
   Gemäß MARP-Standard werden `header`, `footer` und `paginate` global vererbt. Auf der ersten Folie (Deckblatt) jedes Kapitels führt dies zu unschönen Effekten:
   - Die Kopfzeile wiederholt redundant die Kapitelüberschrift.
   - Der Footer ("Dr. Georg Hackenberg...") erscheint am Fuß des Deckblatts.
   - Unten rechts prangt die Seitenzahl **1**.
   Auf keinem einzigen der 12 Deckblätter werden MARP-Scoped-Directives verwendet:
   ```md
   <!-- _paginate: false -->
   <!-- _header: "" -->
   <!-- _footer: "" -->
   ```

### 3.3 UTF-8 Byte Order Mark (BOM)
Die Dateien `Folien.md` in den Kapiteln **07, 08 und 10** beginnen mit der Byte-Sequenz `\xef\xbb\xbf` (UTF-8 BOM).
*Auswirkung:* Einige Markdown-Parser, Static-Site-Generatoren und Skripte erkennen das Frontmatter nicht als Zeile 1, wodurch die YAML-Metadaten als Fließtext auf der ersten Folie dargestellt werden oder das gesamte Theme nicht geladen wird. Alle Dateien sollten einheitlich als UTF-8 ohne BOM (UTF-8 strict) gespeichert werden.

---

## 4. Foliendichte, Typografie & Lesbarkeit

### 4.1 Die "Code-Block-Krise" (> 20 Zeilen)
Auf Beamer-Präsentationen mit einer Auflösung von 1920 $\times$ 1080 (16:9) oder 1024 $\times$ 768 (4:3) beträgt die maximale empfohlene Zeilenzahl für Quellcode **12 bis maximal 15 Zeilen**.
Im vorliegenden Material finden sich **16 Code-Blöcke mit mehr als 20 Zeilen** sowie **26 weitere Blöcke mit 16–20 Zeilen**:

#### Kritische Fundstellen (> 20 Zeilen):
1. **Kapitel 05 (3D-OpenGL), Folie 77 (Zeile 1746):**
   - **28 Zeilen Code**, maximale Zeilenbreite **101 Zeichen** (`OrbitCamera` Einbindung in Render-Loop und WPF-Events).
   - *Befund:* Extrem schwerwiegender Fall. Der Code läuft bei Beamer-Projektion unweigerlich über den unteren Folienrand hinaus, verdeckt den Footer und bricht seitlich um.
2. **Kapitel 09 (Diskrete Dynamik), Folie 24 (Zeile 0411):**
   - **24 Zeilen Code** (`Simulation`-Klasse), platziert innerhalb einer Spalte (`<div class="two">`).
   - *Befund:* In einer Mehrspaltenansicht wird der Codeblock durch die reduzierte Spaltenbreite extrem gequetscht.
3. **Kapitel 02 (2D-Pixel), Folien 13, 22, 28:**
   - Folie 13: 23 Zeilen (`MainWindow`-Initialisierung).
   - Folie 22: 22 Zeilen (Viridis-LUT Generator mit 92 Zeichen Breite).
   - Folie 28: 23 Zeilen (`RenderToBitmap` mit `Parallel.For`).
4. **Kapitel 03 (2D-Vektor), Folien 28, 29:**
   - Folie 28: 22 Zeilen (`DrawingContext`-Zeichenroutine).
   - Folie 29: 21 Zeilen (`VisualHost`-Klasse).
5. **Kapitel 04 (2D-Diagramme), Folien 19, 26:**
   - Folie 19: 22 Zeilen (`CircularBuffer<T>`).
   - Folie 26: 23 Zeilen (MSAGL Zyklushervorhebung).
6. **Kapitel 05 (3D-OpenGL), Folien 39, 75:**
   - Folie 39: 21 Zeilen (Resize-Handler).
   - Folie 75: 23 Zeilen (`OrbitCamera`-Klasse Teil 1).
7. **Kapitel 06 (Multithreading), Folie 23 (Zeile 0480):**
   - 22 Zeilen (`CancellationTokenSource` & `ParallelOptions`).
8. **Kapitel 07 (Statische Modelle), Folie 52 (Zeile 0908):**
   - 23 Zeilen (`Truss`-Klasse in Spalte).
9. **Kapitel 09 (Diskrete Dynamik), Folie 53 (Zeile 1116):**
   - 23 Zeilen, Zeilenbreite 91 Zeichen (Monte-Carlo & Konfidenzintervall).
10. **Kapitel 10 (Hybride Dynamik), Folie 32 (Zeile 0617):**
    - 23 Zeilen, Zeilenbreite 98 Zeichen (`Block`-Klasse).

### 4.2 Horizontale Breitenüberläufe (> 80 Zeichen pro Zeile)
Insgesamt **27 Code-Zeilen** überschreiten die Grenze von 80 Zeichen. Spitzenwerte erreichen bis zu **103 Zeichen**:
- *Kapitel 04, Folie 23:* 103 Zeichen in XAML (`<WindowsFormsHost Name="graphHost" ... />`).
- *Kapitel 05, Folie 77:* 101 Zeichen in C# (`_camera.Azimuth += (float)((pos.X - _lastMousePos.X) * 0.5);`).
- *Kapitel 10, Folien 36, 37:* jeweils 99 Zeichen in C# (`ZeroOrderHoldBlock` und `DiscreteTimeIntegratorBlock`).

*Folge:* Bei Monospace-Schriften führt dies bei Beamer-Projektion entweder zum harten Abschneiden von schließenden Klammern oder zu unschönem Zeilenumbruch, der die Code-Struktur zerstört.

### 4.3 Fehlende Syntax-Highlighting-Tags & ASCII-Art (Kapitel 11)
In Kapitel 11 (*Epilog*) wurden auf **11 Folien** Code-Blöcke ohne Sprachbezeichner (` ``` `) deklariert:
- *Folien 08, 12, 13, 18, 19, 22, 23, 24, 28, 29, 31.*
- *Befund:* Diese Blöcke enthalten keine Programmcodes, sondern **ASCII-Art-Diagramme**, Entscheidungskästen und handschriftartige Pfeilverbindungen (z.B. `[Modell] ---> [Solver]`).
- *Didaktisches Problem:* Während in den früheren Kapiteln professionelle Mermaid- und TikZ-Grafiken glänzen, wirken diese ASCII-Kästen im Epilog provisorisch und unfertig. Sie sollten durch saubere Mermaid-Flussdiagramme (`flowchart TD` / `flowchart LR`) ersetzt werden.

### 4.4 Fehlende Folienüberschrift
- **Kapitel 10 (Hybride Modelle), Folie 32:** Die Folie beginnt direkt mit einem 23-zeiligen C#-Block (`public abstract class Block`). Die Überschrift `### Softwarearchitektur: Die Basisklasse Block` fehlt vollständig!

### 4.5 Mehrspaltige Layouts (`div.columns`)
Das FH-Theme bietet Spalten über `<div class="columns">` und Breitenklassen wie `two`, `three` etc.
- In 221 Folien wird dieses Feature intensiv genutzt (vorbildlich für 2-Spalten-Layouts: Text links, Grafik rechts).
- **Mangel in `fhooe.css`:** `section div.columns` ist mit `align-items: center;` definiert. Wenn links ein kurzer Aufzählungstext steht und rechts ein hohes Diagramm oder Codeblock, wird der Text vertikal auf halber Folienhöhe zentriert. Dies bricht die gewohnte Leselinie (Oberkante Folie).
- *Lösung:* In `fhooe.css` sollte `align-items: flex-start;` der Default für alle Spalten sein (oder standardmäßig die Klasse `top` ergänzt werden).

---

## 5. Bild-, Grafik- und Medienqualität

### 5.1 Defekte Bildreferenzen (Broken Image Links)
In **Kapitel 07 (Statische Modelle)** führen drei Bildreferenzen zu einem 404-Fehler:
- **Folie 24 (Zeile 0338):** `![bg right w:500](../03_Statische_Modelle_3D/Diagramme/Stablaengenaenderung.tikz.svg)`
- **Folie 25 (Zeile 0363):** `![bg right w:500](../03_Statische_Modelle_3D/Diagramme/Stablaengenaenderung.tikz.svg)`
- **Folie 26 (Zeile 0391):** `![bg right w:500](../03_Statische_Modelle_3D/Diagramme/Stablaengenaenderung_Approximation.tikz.svg)`

*Ursache:* Im Rahmen einer früheren Reorganisation des Curriculums wurde das Kapitel von `03_Statische_Modelle_3D` nach `07_Statische_Modelle` verschoben. Die SVG-Dateien befinden sich physisch im Ordner `Folien/07_Statische_Modelle/Diagramme/`. Die Markdown-Links wurden jedoch nicht auf `./Diagramme/...` aktualisiert.

### 5.2 Das "Hotlinking-Risiko": 14 externe Web-Grafiken
Insgesamt **14 Grafiken** werden zur Laufzeit live aus dem Internet geladen:

| Kapitel | Folie | Externe URL | Empfohlener lokaler Ersatz |
|:---|:---:|:---|:---|
| **04 Diagramme** | 07 | `https://scottplot.net/images/brand/favicon.svg` | Lokal in `04/Illustrationen/ScottPlot_Logo.svg` speichern |
| **05 OpenGL** | 04 | `https://upload.wikimedia.org/.../Opengl-logo.svg` | Lokal in `05/Illustrationen/OpenGL_Logo.svg` speichern |
| **05 OpenGL** | 07 | `https://upload.wikimedia.org/.../RGB_Cube_Show_lowgamma_cutout_b.png` | Lokal in `05/Screenshots/RGB_Cube.png` ablegen |
| **05 OpenGL** | 08 | `https://www.dca.ufrn.br/~lmarcos/.../Image77.gif` | Lokale Vektorgrafik oder Screenshot |
| **05 OpenGL** | 09 | `https://upload.wikimedia.org/.../Phong_components_version_4.png` | **Lokale Vektorgrafik existiert bereits:** `./Diagramme/Phong - Gesamt.svg`! |
| **05 OpenGL** | 17 | `https://xoax.net/sub_cpp/crs_opengl/Lesson5/Image2.png` | Lokale Grafik anlegen |
| **05 OpenGL** | 20 | `https://i.sstatic.net/uZhIF.png` | Lokale Grafik anlegen |
| **05 OpenGL** | 53 | `https://machinethink.net/images/3d-rendering/Geometry@2x.png` | Lokale Grafik anlegen |
| **05 OpenGL** | 55 | `https://www.mbsoftworks.sk/.../8_sllices_stacks_sphere.png` | Lokale Grafik anlegen |
| **05 OpenGL** | 61 | `https://www.songho.ca/opengl/files/gl_cylinder03.png` | Lokale Grafik anlegen |
| **09 Diskret** | 36 | `https://upload.wikimedia.org/.../ExpDichteF.svg` | Lokal in `09/Diagramme/ExpDichteF.svg` speichern |
| **09 Diskret** | 36 | `https://upload.wikimedia.org/.../ExpVerteilungF.svg` | Lokal in `09/Diagramme/ExpVerteilungF.svg` speichern |
| **09 Diskret** | 41 | `https://upload.wikimedia.org/.../Normal_Distribution_PDF.svg` | Lokal in `09/Diagramme/Normal_PDF.svg` speichern |
| **09 Diskret** | 41 | `https://upload.wikimedia.org/.../Normal-distribution-cumulative-distribution-function-many.svg` | Lokal in `09/Diagramme/Normal_CDF.svg` speichern |

*Gefahrenpotenzial:* 
- Wenn im Hörsaal das Gäste-WLAN ausfällt, bleiben diese Folien weiß oder zeigen defekte Bildrahmen.
- Fremdseiten können Hotlinking blockieren (HTTP 403 Forbidden) oder Inhalte modifizieren/löschen.

### 5.3 Niedrig auflösende Rasterbilder (< 800 $\times$ 600 Pixel)
Auf 4K- und Full-HD-Hörsaalbeamern wirken Rastergrafiken mit geringer Auflösung verschwommen und unprofessionell. Im Kurs wurden **27 Bilder** mit kritisch niedriger Auflösung identifiziert:
- **Kapitel 02, Folie 27:** `Heatmap_Temperaturfeld.png` mit lediglich **400 $\times$ 300 Pixeln**. Bei einer Folienprojektion auf 1920 $\times$ 1080 wird das Bild stark aufskaliert, was zu massiver Unschärfe führt.
- **Kapitel 05, Folien 23–31:** Neun Screenshots von OpenGL-Primitiven (`OpenGL_Primitives_*.png`) mit nur **510 $\times$ 435 Pixeln**. Weiße Pixel auf schwarzem Grund wirken verwaschen.
- **Kapitel 07, Folie 10:** `Fachwerk_Elemente.png` mit nur **550 $\times$ 269 Pixeln**.
- **Kapitel 08, Folie 06:** `Bewegungsgleichung.jpg` (524 $\times$ 450 Pixel) und Folie 27: `Pendelsimulation.png` (576 $\times$ 302 Pixel).

### 5.4 Verwaiste Mediendateien (Unreferenced Assets)
Im Repository liegen mehrere hochwertige Bilddateien, die erstellt wurden, aber auf keiner einzigen Folie eingebunden sind:
1. **Kapitel 03:** `Folien/03_Visualisierung_2D_Vektor/Titelbild.jpg` (551 KB) – Existiert, fehlt auf Deckblatt!
2. **Kapitel 04:** `Folien/04_Visualisierung_2D_Diagramme/Titelbild.jpg` (722 KB) – Existiert, fehlt auf Deckblatt!
3. **Kapitel 06:** `Folien/06_Multithreading/Titelbild.jpg` (1.027 KB) – Existiert, fehlt auf Deckblatt!
4. **Kapitel 05:** `Folien/05_Visualisierung_3D_OpenGL/Diagramme/Phong - Gesamt.svg` – Fertige Vektorgrafik liegt im Ordner, stattdessen wird auf Folie 9 ein Wikipedia-PNG geladen!
5. **Kapitel 08:** Drei ungenutzte Simulations-Screenshots (`Bouncing_Ball_Euler_Explizit.png`, `Bouncing_Ball_Euler_Implizit.png`, `Einfacher_Nulldurchgang_Euler_Explizit.png`).
6. **Kapitel 10:** Sechs ungenutzte Screenshots im Ordner `Screenshots/`.

---

## 6. Analyse der Begleitnotizen (`Notizen.md`)

In `GEMINI.md` ist festgelegt:
> *"Die Datei `./Folien/[XX_Kapitel_Bezeichnung]/Notizen.md` enthält Notizen zum Foliensatz (z.B. größere TODOs)"*

Die Überprüfung aller 12 Kapitel zeigt eine enorme Schere in der Pflegequalität:

### 6.1 Vollständigkeit und Statusübersicht

- **Kapitel 00 (Prolog):** 0 Zeilen (Völlig leer).
- **Kapitel 01 (Einführung):** 0 Zeilen (Völlig leer).
- **Kapitel 02 (2D-Pixel):** **15 Zeilen (Musterbeispiel!)**. Enthält eine vollständige Liste abgearbeiteter Aufgaben (`- [x]`), didaktische Hinweise für den Vortragenden (Live-Coding, Cache-Misses demonstrieren, CFL-Stabilitätsgrenze provozieren).
- **Kapitel 03 (2D-Vektor):** 7 Zeilen. 4 Punkte erledigt, aber 1 offener Punkt: `- [ ] Titelbild generieren`. *Inkonsistenz:* Das Titelbild existiert bereits physisch auf der Festplatte!
- **Kapitel 04 (2D-Diagramme):** 5 Zeilen. 4 Punkte erledigt, 1 offener Punkt: `- [ ] Titelbild generieren` (existiert ebenfalls bereits).
- **Kapitel 05 (3D-OpenGL):** 10 Zeilen. 3 Punkte erledigt, **5 offene technische Großbaustellen**:
  - `- [ ] Flush-Methode zur 3D-Visualisierung ergänzen (gl.Flush())`
  - `- [ ] Texture-Mapping zur 3D-Visualisierung ergänzen`
  - `- [ ] Geometry-Buffer (VBO/VAO) zur 3D-Visualisierung ergänzen`
  - `- [ ] Directional- und Spot-Lights zur 3D-Visualisierung ergänzen`
  - `- [ ] Shadow-Casting zur 3D-Visualisierung ergänzen`
- **Kapitel 06 (Multithreading):** 3 Zeilen. 1 erledigt, 2 offen (`ThreadLocal<T>` und `Titelbild generieren`).
- **Kapitel 07 (Statik):** 2 Zeilen. Nur unformatierte Stichpunkte (3D-Beispiele, direkte vs. iterative Solver).
- **Kapitel 08 (Kontinuierlich):** 2 Zeilen. Nur Stichpunkte (Simscape/Modelica).
- **Kapitel 09 (Diskret):** 0 Zeilen (Völlig leer).
- **Kapitel 10 (Hybrid):** 0 Zeilen (Völlig leer).
- **Kapitel 11 (Epilog):** **9 Zeilen (Hervorragend)**. Alle 7 didaktischen Meilensteine als `- [x]` dokumentiert.

---

## 7. Detailliertes Kapitel-Review (Kapitel 00 bis 11)

### Kapitel 00: Prolog (14 Folien)
- **MARP & Frontmatter:** Header enthält `Prolog (2025-12-05)` (Datum veraltet und uneinheitlich zu Kap. 02–11). Keine Quotes um Header-Wert.
- **Titelfolie:** Besitzt als einziges Kapitel im gesamten Kurs **kein Hintergrundbild** (`![bg right]`).
- **Layout & Lesbarkeit:** Gute Foliendichte, kurze prägnante Textblöcke. Keine Spaltenlayouts verwendet.
- **Notizen:** Datei ist komplett leer.

### Kapitel 01: Einführung (36 Folien)
- **MARP & Frontmatter:** Header enthält `'Kapitel 1: Einführung (2025-12-05)'`.
- **Layout:** Sehr ausgewogenes 2-Spalten-Layout (19 von 36 Folien mit `<div class="columns">`).
- **Bilder:** Hohe Anzahl KI-generierter Illustrationen. Sieben Grafiken haben jedoch eine geringe Auflösung (650 $\times$ 650 bzw. 700 $\times$ 1024), was auf Großbildleinwänden leicht unscharf wirkt.
- **Verwaiste Medien:** Drei Tafelbild-Fotos (`Modellarten WS24.jpg`, `Modellarten WS25.jpg`, `Modelle_Simulation_Virtuelle_Inbetriebnahme.jpg`) und `OpenGL.jpg` liegen ungenutzt im Ordner.

### Kapitel 02: 2D-Visualisierung (Pixel) (29 Folien)
- **Layout:** Solide Aufteilung, jedoch punktuell zu lange Code-Blöcke (Folien 13, 22, 28 mit bis zu 23 Zeilen und bis zu 92 Zeichen Breite).
- **Bildqualität:** Folie 27 bindet `Heatmap_Temperaturfeld.png` mit nur 400 $\times$ 300 Pixeln ein (starke Skalierungsunschärfe).
- **Notizen:** Best-Practice-Beispiel für den gesamten Kurs.

### Kapitel 03: 2D-Visualisierung (Vektor) (32 Folien)
- **Deckblatt & Assets:** Deckblatt hat kein Hintergrundbild verlinkt, obwohl `Titelbild.jpg` (551 KB) im Ordner liegt!
- **Code-Dichte:** Folien 28 (22 Zeilen) und 29 (21 Zeilen) überladen.
- **Notizen:** Veralteter TODO-Status (`- [ ] Titelbild generieren`).

### Kapitel 04: 2D-Visualisierung (Diagramme & Graphen) (28 Folien)
- **Deckblatt & Assets:** `Titelbild.jpg` (722 KB) existiert im Ordner, ist aber nicht auf Folie 1 eingebunden.
- **Code-Dichte:** Folien 19 (22 Zeilen) und 26 (23 Zeilen) zu lang. Folie 23 enthält eine XAML-Zeile mit 103 Zeichen.
- **Hotlinking:** Folie 07 verlinkt das ScottPlot-Favicon direkt von `scottplot.net`.

### Kapitel 05: 3D-Visualisierung mit OpenGL (78 Folien)
- **Umfang:** Mit 78 Folien das mit Abstand umfangreichste Kapitel des Kurses.
- **Hotlinking-Befund:** **9 externe Web-Grafiken!** Auf Folie 9 wird ein Wikipedia-PNG für Phong-Shading eingebunden, obwohl mit `Diagramme/Phong - Gesamt.svg` eine perfekte lokale Vektordatei bereitsteht.
- **Code-Dichte:** Folie 77 ist mit **28 Zeilen** und **101 Zeichen Zeilenbreite** der am stärksten überladene Codeblock des gesamten Kurses.
- **Bildqualität:** 9 Screenshots der OpenGL-Primitive (`OpenGL_Primitives_*.png`) sind mit 510 $\times$ 435 Pixeln zu klein aufgelöst.

### Kapitel 06: Multithreading & Parallele Simulation (24 Folien)
- **Deckblatt & Assets:** `Titelbild.jpg` (1.027 KB) existiert, fehlt im Markdown.
- **Foliendichte:** Vier Folien (13, 18, 21, 23) sind extrem text- und code-dicht (> 32 bis 43 Textzeilen). Folie 23 hat einen 22-zeiligen Codeblock.
- **Header:** Langer Titel kollidiert fast mit dem FH-Logo.

### Kapitel 07: Statische Modelle (54 Folien)
- **Encoding:** Enthält UTF-8 BOM (`\xef\xbb\xbf`).
- **Defekte Links (Kritisch):** Folien 24, 25 und 26 verlinken auf `../03_Statische_Modelle_3D/Diagramme/...`. Diese Pfade sind tot und müssen auf `./Diagramme/...` korrigiert werden.
- **Code-Dichte:** Folie 52 quetscht 23 Zeilen Code in eine schmale Spalte.

### Kapitel 08: Kontinuierliche Dynamische Modelle (62 Folien)
- **Encoding:** Enthält UTF-8 BOM (`\xef\xbb\xbf`).
- **Abschnittsbilder:** Nur 2 von 5 Abschnittsfolien besitzen ein Hintergrundbild (`![bg right]`), die anderen drei sind kahl.
- **Code-Dichte:** Fünf Folien im Grenzbereich von 16–18 Zeilen. Folie 40 und 41 sind sehr textlastig.

### Kapitel 09: Diskrete Dynamische Modelle (53 Folien)
- **Hotlinking:** Vier externe Grafiken von Wikimedia Commons auf den Folien 36 und 41 (Exponential- und Normalverteilung).
- **Code-Dichte:** Folie 24 (24 Zeilen in Spalte) und Folie 53 (23 Zeilen, 91 Zeichen Breite).
- **Abschnittsbilder:** Vorbildlich – alle 7 Abschnittsfolien verfügen über konsistente Hintergrundbilder.
- **Notizen:** Völlig leer (0 Zeilen).

### Kapitel 10: Hybride Dynamische Modelle (67 Folien)
- **Encoding:** Enthält UTF-8 BOM (`\xef\xbb\xbf`).
- **Fehlende Überschrift:** Folie 32 beginnt ohne `###`-Titel direkt mit einem 23-zeiligen Codeblock.
- **Code-Breite:** Sieben Folien überschreiten 85–99 Zeichen Breite (insbesondere Folien 36–40).
- **Notizen:** Völlig leer (0 Zeilen).

### Kapitel 11: Epilog & Synthese (32 Folien)
- **Typografie & Stilbruch:** Auf **11 Folien** werden ASCII-Art-Kästen in ungelabelten ` ``` `-Blöcken verwendet. Dies wirkt unfertig und sollte durch Mermaid-Diagramme ersetzt werden.
- **Foliendichte:** Folien 08, 13 und 19 sind stark überfüllt (bis zu 141 Wörter).
- **Notizen:** Sehr gut und lückenlos gepflegt.

---

## 8. Strategischer Maßnahmen- und Optimierungskatalog

Zur Behebung der identifizierten Mängel wird ein strukturierter Drei-Stufen-Plan empfohlen:

### Stufe 1: Sofortmaßnahmen (Quick Wins & Bugfixes)
1. **Broken Links in Kapitel 07 korrigieren:**
   In `Folien/07_Statische_Modelle/Folien.md` auf den Folien 24, 25 und 26 den Pfadpräfix `../03_Statische_Modelle_3D/` durch `./` ersetzen.
2. **Existierende Titelbilder einbinden & Notizen aktualisieren:**
   In den Kapiteln 03, 04 und 06 auf Folie 1 `![bg right](./Titelbild.jpg)` ergänzen und in `Notizen.md` die Checkbox auf `- [x] Titelbild generieren` setzen.
3. **UTF-8 BOM entfernen:**
   Die Dateien `Folien.md` in den Kapiteln 07, 08 und 10 ohne BOM abspeichern.
4. **Fehlende Überschrift in Kapitel 10 ergänzen:**
   Auf Folie 32 den Titel `### Softwarearchitektur: Die Basisklasse Block` einfügen.
5. **Datumsangaben im Header vereinheitlichen:**
   In Kapitel 00 und 01 das veraltete `(2025-12-05)` aus den Frontmatter-Headern entfernen, um Gleichförmigkeit mit den Kapiteln 02–11 herzustellen.

### Stufe 2: Medienbereinigung & Ausfallsicherheit
1. **Lokalisierung aller 14 externen Web-Grafiken:**
   Herunterladen der Grafiken von Wikipedia, ScottPlot, etc. in die lokalen Verzeichnisse `Illustrationen/` bzw. `Diagramme/` und Umstellen der Markdown-Links auf relative lokale Pfade.
2. **Nutzung vorhandener Vektordateien:**
   In Kapitel 05 auf Folie 9 das Wikipedia-PNG durch die bereits vorhandene lokale Vektordatei `./Diagramme/Phong - Gesamt.svg` ersetzen.
3. **Auflösung von Rasterbildern nachschärfen:**
   Neuaufnahme oder hochauflösender Export von `Heatmap_Temperaturfeld.png` (Kap. 02) sowie den OpenGL-Screenshots (Kap. 05).
4. **Umwandlung der ASCII-Art in Kapitel 11:**
   Ersetzen der 11 unformatierten ASCII-Kästen durch gerenderte Mermaid-Diagramme (`Diagramme/Entscheidungsbaum.mmd` etc.).

### Stufe 3: Theme- & Typografie-Refactoring (`Themen/fhooe.css`)
1. **Logo-Portabilität & Titelfolien-Schutz:**
   Das FH-Logo als Data-URI einbetten und mit Pseudoklassen vor Überlagerung auf Titelfolien schützen:
   ```css
   section:not(.title):not(.lead)::before {
       content: "";
       display: block;
       position: absolute;
       top: 0;
       right: 0;
       z-index: 100;
       width: 4.5rem;
       height: 4.5rem;
       background-color: #004B96;
       background-image: url("data:image/svg+xml;base64,...");
       background-repeat: no-repeat;
       background-size: 65%;
       background-position: center;
   }
   ```
2. **Spalten-Ausrichtung anpassen:**
   Standardmäßiges `align-items: flex-start;` für `.columns`, damit Text- und Bildblöcke bündig an der Oberkante ansetzen.
3. **Typografische Grenzen für Codeblöcke einziehen:**
   ```css
   section pre {
       font-size: 0.75em;
       line-height: 1.35;
       max-height: 480px;
       overflow-x: auto;
   }
   ```
4. **Didaktische Regel für Code-Splitting etablieren:**
   Codeblöcke mit mehr als 15 Zeilen konsequent auf zwei Folien aufteilen (z.B. *Teil 1: Datenstrukturen / Initialisierung*, *Teil 2: Ausführung / Event-Handling*).

---

## 9. Fazit

Das Vorlesungsmaterial zu **"Systemsimulation / Digitaler Zwilling"** verfügt über ein herausragendes didaktisches und fachliches Fundament. Die visuelle Gestaltung im FH-OÖ-MARP-Theme verleiht dem Kurs ein modernes und professionelles Erscheinungsbild.

Die in diesem Gutachten aufgezeigten Mängel – insbesondere die **drei defekten Links in Kapitel 07**, die **14 externen Web-Grafiken**, die **vergessenen Titelbilder**, die **16 überlangen Code-Blöcke** sowie die **fehlenden Notizen in vier Kapiteln** – stellen jedoch spürbare didaktische Reibungspunkte und technische Risiken im Vorlesungsbetrieb dar.

Durch die Umsetzung des vorgeschlagenen Maßnahmenplans kann das Vorlesungsmaterial mit überschaubarem Aufwand auf ein durchgängig exzellentes, beamergerechtes und ausfallsicheres Niveau gehoben werden.
