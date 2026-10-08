# Qualitäts-Audit: Visuelle Medien, Grafiken & Diagramme

**Vorlesung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (5./6. Semester)  
**Institution:** FH Oberösterreich, Campus Wels  
**Dozent:** Dr. Georg Hackenberg  
**Gegenstand:** Vollständiger Re-Audit aller visuellen Medien und Assets über alle 12 Kapitel (`Folien/00_Prolog` bis `Folien/11_Epilog`), `Quellen/`, `Grafiken/` und `Skripte/GrafikGenerator/`  
**Datum:** Oktober 2026  
**Status:** Abgeschlossen  

---

## 1. Executive Summary & Gesamtbewertung

Im Rahmen dieses Audits wurden alle **227 Bild- und Diagrammreferenzen** in den 12 Vorlesungs-Foliensätzen sowie der Gesamtbestand von **243 Mediendateien** auf ihre technische Gültigkeit, typografische Lesbarkeit bei 1080p-Projektion, grafische Präzision und inhaltliche Exaktheit untersucht.

Besondere Beachtung fanden die vom Benutzer vorgegebenen Kern-Restriktionen:
1. **Keine handgezeichneten Tafelbilder / Whiteboard-Fotos mehr im Foliensatz:** Vollständige Identifikation aller verbliebenen handgezeichneten Skizzen und Formulierung exakter Vektor-Ersatzspezifikationen.
2. **SVG-Diagramme:** Validierung von XML-Wohlgeformtheit, Ausrichtung, Bounding Boxes, Paddings, Zeilenumbrüchen und Beseitigung extremer Aspektverhältnisse.
3. **Rastergrafiken & Typografie:** Beseitigung von Tippfehlern und Terminologie-Lapsus in C#-generierten Diagrammen, Beseitigung von UI-Tippfehlern in Screenshots und Prüfung von KI-Illustrationen auf Pseudo-Text ("AI Gibberish").

### Quantitative Bewertungsmatrix

| Bewertungsdimension | Score | Status | Kernbefund |
|:---|:---:|:---:|:---|
| **Eliminierung von Tafelbildern** | **4.0 / 10** | 🔴 Handlungsbedarf | **5 handgezeichnete Tafelbilder** sind weiterhin aktiv in Kapitel 03 und 07 eingebunden. |
| **SVG-Validität & Technische Robustheit** | **6.5 / 10** | 🔴 Handlungsbedarf | 1 SVG syntaktisch defekt (unparsed XML); 2 Mermaid-SVGs mit ``-Encoding-Fehlern; 15 SVGs mit statischen `mm`-Einheiten. |
| **Diagramm-Ergonomie & Aspektverhältnisse** | **6.0 / 10** | 🟡 Optimierungsbedarf | 8 SVGs weisen extreme Aspektverhältnisse (> 5:1 bis 12:1) auf ("Banner-Problem"). |
| **Typografie & Fachterminologie in Plots** | **7.5 / 10** | 🟡 Optimierungsbedarf | Falscher Fachbegriff "Schrittantwort" statt "Sprungantwort"; Kurvendiskrepanz bei Anti-Windup. |
| **Software-Screenshots & UI-Labels** | **7.0 / 10** | 🟡 Optimierungsbedarf | Tippfehler `"Intergate"` in C#-Code schlägt auf Vorlesungs-Screenshots durch; Fenster-Artefakte. |
| **Illustrationen & KI-Bildkohärenz** | **8.5 / 10** | 🟢 Hohe Qualität | Hoher visueller Standard (Nano Banana); vereinzelt englische Texte und KI-Restfragmente (`--> PX`). |
| **GESAMTINDEX MEDIENQUALITÄT** | **6.6 / 10** | 🟡 Solide Basis mit klaren Blockern | **Dringender Sanierungsbedarf bei Tafelbildern und XML-Syntaxfehler.** |

---

## 2. Schwerpunkt 1: Handgezeichnete Tafelbilder & Whiteboard-Fotos

Entgegen der Vorgabe, keine handgezeichneten Tafelbilder mehr in den Folien zu verwenden, befinden sich in den Foliensätzen **noch exakt 5 aktive Einbindungen** von Fotos grüner Schultafeln mit Kreideaufschrieben und Handskizzen.

### 2.1 Übersicht der 5 aktiven Fundstellen

| Nr. | Kapitel & Folie | Folientitel | Pfad im Repository | Format & Auflösung | Inhalt des Tafelbilds |
|:---:|:---|:---|:---|:---:|:---|
| **TB-1** | `03_Visualisierung_2D_Vektor`<br>Folie 17 (Z. 294) | `### Visualisierung der Kräfte: Pfeile` | `Quellen/WS25/FachwerkIdeal2D/Tafelbild_Visualisierung_Pfeilspitze_2D.jpg` | JPG<br>$1920 \times 960$ | Foto grüner Tafel: Handschriftliche Kreideskizze zur Vektor-Trigonometrie einer Pfeilspitze (Punkte A, B, `delta_xy`, Normalen `norm_xy`, `-norm_xy`). |
| **TB-2** | `07_Statische_Modelle`<br>Folie 6 (Z. 58) | `### Das Fachwerk als klassisches Beispiel` | `Quellen/WS24/StatischFachwerkIdeal2D/Fachwerk_Beispiel.png` | PNG<br>$800 \times 446$ | Foto grüner Tafel: Handgezeichnetes 2D-Fachwerk mit 5 Knoten (A–E), 7 nummerierten Stäben ($S_1$–$S_7$), Auflagern und Lastpfeilen ($L_1, L_2$). |
| **TB-3** | `07_Statische_Modelle`<br>Folie 11 (Z. 133) | `### Annahmen des idealen Fachwerks` | `Quellen/WS24/StatischFachwerkIdeal2D/Fachwerk_Elemente.png` | PNG<br>$550 \times 269$ | Foto grüner Tafel: Handschriftlicher Kreidetext ("2D Fachwerk <-- / - Stäbe (Kraft ?) / - Knoten / - Lasten / - Lager"). |
| **TB-4** | `07_Statische_Modelle`<br>Folie 28 (Z. 448) | `### Stab-Steifigkeitsbeziehung` | `Quellen/WS24/StatischFachwerkElastisch2D/Stabgleichungssystem.jpg` | JPG<br>$3436 \times 1906$ | Foto grüner Tafel: Handschriftliche $4 \times 4$-Stabsteifigkeitsmatrix $\mathbf{k}_{\text{Stab}}$ mit Kreide aufgeschrieben ($e_x^2, e_x e_y, -e_x^2, \dots$). |
| **TB-5** | `07_Statische_Modelle`<br>Folie 34 (Z. 539) | `### Einbau der Randbedingungen` | `Quellen/WS24/StatischFachwerkElastisch2D/Allgemeines Gleichungssystem mit Randbedingungen.jpg` | JPG<br>$2018 \times 1975$ | Foto grüner Tafel: Handgezeichnete Skizze der Blockmatrix-Partitionierung $\begin{pmatrix} F_u \\ F_B \end{pmatrix} = \begin{pmatrix} K_{AA} & K_{AB} \\ K_{BA} & K_{BB} \end{pmatrix} \begin{pmatrix} u_B \\ u_u \end{pmatrix}$. |

---

### 2.2 Detaillierte Ersatzspezifikationen für die 5 Fundstellen

#### Zu TB-1: Pfeilspitzen-Geometrie (`03_Visualisierung_2D_Vektor`, Folie 17)
- **Problem:** Das Tafelbild wirkt didaktisch unruhig, die Kreidehandschrift ist teils schwer entzifferbar (`deltaxy`, `normxy`).
- **Erforderlicher Ersatz:** Ein sauberes **TikZ-Diagramm** (`Diagramme/Pfeilspitzengeometrie_2D.tikz.svg`), das exakt die auf Folie 18 berechneten Vektoren visualisiert:
  - Stabachse von Knoten $\vec{P}_{\text{start}}$ zu Spitzen-Endpunkt $\vec{P}_{\text{tip}}$
  - Normalisierter Richtungsvektor $\vec{u}$
  - Orthogonaler Normalenvektor $\vec{u}^\perp = (-u_y, u_x)^T$
  - Bemaßung der Pfeillänge $L$ und Basisbreite $W$
  - Berechnete Dreieckseckpunkte $\vec{P}_1 = \vec{P}_{\text{tip}} - L\vec{u} + \frac{W}{2}\vec{u}^\perp$ und $\vec{P}_2 = \vec{P}_{\text{tip}} - L\vec{u} - \frac{W}{2}\vec{u}^\perp$.

```latex
% Entwurf für Pfeilspitzengeometrie_2D.tikz.tex
\begin{tikzpicture}[>=latex, scale=1.2]
  \coordinate (P0) at (0,0);
  \coordinate (Ptip) at (5,2);
  \draw[thick, color=blue!70!black] (P0) -- (Ptip) node[midway, below right] {Stabachse};
  \draw[fill=blue!20, draw=blue!80!black, thick] (Ptip) -- ++(-150:1.2) -- ++(-60:0.6) -- cycle;
  % Vektorpfeile u und u_perp
  \draw[->, very thick, red] (Ptip) -- ++(30:1.0) node[above right] {$\vec{u}$};
  \draw[->, very thick, green!60!black] (Ptip) -- ++(120:1.0) node[above left] {$\vec{u}^\perp$};
  \node[circle, fill=black, inner sep=1.5pt, label=below:$\vec{P}_{\text{start}}$] at (P0) {};
  \node[circle, fill=black, inner sep=1.5pt, label=above:$\vec{P}_{\text{tip}}$] at (Ptip) {};
\end{tikzpicture}
```

#### Zu TB-2: 2D-Fachwerk-Topologie (`07_Statische_Modelle`, Folie 6)
- **Problem:** Ein altes Foto einer grünen Kreidetafel dient als Einführungsbild für das zentrale Vorlesungsbeispiel.
- **Erforderlicher Ersatz:** Vektorgrafik (`Diagramme/Fachwerk_Topologie_2D.svg` oder `.tikz.svg`):
  - 5 Knoten A $(0,0)$, B $(4,0)$, C $(8,0)$, D $(2,3)$, E $(6,3)$ mit sauberen Knotenkreisen.
  - Stäbe $S_1$ bis $S_7$ mit klar lesbaren Stabnummerierungs-Badges.
  - Genormte Lagersymbole nach DIN 1357: Festlager bei A (schraffiertes Dreieck), Loslager bei C (Rollenlager).
  - Äußere Lasten $L_1, L_2$ als rote Pfeile an den Knoten D und E.

#### Zu TB-3: Fachwerk-Elemente Aufzählung (`07_Statische_Modelle`, Folie 11)
- **Problem:** Die Tafel zeigt lediglich 5 handschriftliche Bulletpoints ("Stäbe, Knoten, Lasten, Lager").
- **Erforderlicher Ersatz:** **Keine Rastergrafik nötig!**
  - Entweder als strukturierte Markdown-Infobox direkt im Folientext:
    ```markdown
    > [!IMPORTANT]
    > **Die 4 Grundelemente des idealen Fachwerks:**
    > - **Knoten:** Geometrische Positionen $(x_i, y_i)$, reibungsfreie Gelenke
    > - **Stäbe:** Kraftübertragung rein axial (Zug/Druck $S_k$)
    > - **Lager:** Randbedingungen (Festlager $A_x, A_y$, Loslager $C_y$)
    > - **Lasten:** Externe Kräfte $F_x, F_y$, die ausschließlich an Knoten angreifen
    ```
  - Oder als kompaktes Mermaid-Mindmap-Diagramm (`Diagramme/Fachwerk_Struktur.svg`).

#### Zu TB-4: $4 \times 4$ Stab-Steifigkeitsmatrix (`07_Statische_Modelle`, Folie 28)
- **Problem:** Das Tafelbild zeigt die explizite Matrix in Kreideschrift.
- **Erforderlicher Ersatz:** Vollwertige mathematische Darstellung via **KaTeX/MathJax** auf der Folie (oder gerendertes TikZ-Vektordiagramm mit Blockfarben):
  $$
  \mathbf{k}_{\text{Stab}} = \frac{EA}{L} \begin{pmatrix}
  e_x^2 & e_x e_y & -e_x^2 & -e_x e_y \\
  e_x e_y & e_y^2 & -e_x e_y & -e_y^2 \\
  -e_x^2 & -e_x e_y & e_x^2 & e_x e_y \\
  -e_x e_y & -e_y^2 & e_x e_y & e_y^2
  \end{pmatrix} = \frac{EA}{L} \begin{pmatrix} \mathbf{e}\mathbf{e}^T & -\mathbf{e}\mathbf{e}^T \\ -\mathbf{e}\mathbf{e}^T & \mathbf{e}\mathbf{e}^T \end{pmatrix}
  $$
  Die farbliche Gruppierung der $2 \times 2$-Blöcke visualisiert die Koppelung zwischen Anfangsknoten $i$ und Endknoten $j$ mathematisch perfekt.

#### Zu TB-5: Randbedingungen & Gleichungssystem-Partitionierung (`07_Statische_Modelle`, Folie 34)
- **Problem:** Skizze einer Blockmatrix mit unleserlichen Indizes ($u_B, u_u, K_{AA}, K_{AB}$).
- **Erforderlicher Ersatz:** Ein sauberes TikZ- oder Mermaid-Blockdiagramm (`Diagramme/Steifigkeitsmatrix_Partitionierung.svg`), das die Aufteilung in freie Verschiebungen $\mathbf{u}_f$ und vorgegebene Randverschiebungen $\mathbf{u}_p = \mathbf{0}$ visualisiert:
  $$
  \begin{pmatrix} \mathbf{K}_{ff} & \mathbf{K}_{fp} \\ \mathbf{K}_{pf} & \mathbf{K}_{pp} \end{pmatrix} \begin{pmatrix} \mathbf{u}_f \\ \mathbf{0} \end{pmatrix} = \begin{pmatrix} \mathbf{f}_{\text{ext}} \\ \mathbf{r} \end{pmatrix} \implies \mathbf{u}_f = \mathbf{K}_{ff}^{-1} \mathbf{f}_{\text{ext}}
  $$

---

### 2.3 Verwaiste Tafelbild-Bestände im Repository

Neben den 5 aktiv eingebundenen Tafelbildern befinden sich weitere 17 historische Tafelbild-Dateien im Repository, die keinen Bezug mehr zum Vorlesungsablauf haben:
- `Folien/01_Einführung/Tafelbilder/Modellarten WS24.jpg` (verwaist)
- `Folien/01_Einführung/Tafelbilder/Modellarten WS25.jpg` (verwaist)
- `Folien/01_Einführung/Tafelbilder/Modelle_Simulation_Virtuelle_Inbetriebnahme.jpg` (verwaist)
- 14 Tafelbild-Fotos in `Quellen/WS24/DynamischBallwurf1D/`, `Quellen/WS24/StatischFachwerkIdeal2D/` und `Quellen/WS25/VorlageVisualisierung3D/`.

> [!TIP]
> **Empfehlung:** Der Ordner `Folien/01_Einführung/Tafelbilder/` sollte vollständig gelöscht oder in ein Archivverzeichnis (`Archiv/Tafelbilder/`) verschoben werden, um das Repository sauber zu halten.

---

## 3. Schwerpunkt 2: Prüfung aller SVG-Vektorgrafiken

### 3.1 Kritischer XML-Syntaxfehler: `Projektionsarten.svg`

In `Folien/05_Visualisierung_3D_OpenGL/Diagramme/Projektionsarten.svg` (eingebunden auf Folie 37, Z. 665 mit `![width:1080px](./Diagramme/Projektionsarten.svg)`) liegt ein **schwerwiegender XML-Syntaxfehler** vor.

**Befund:**  
An vier Textstellen wurde das kaufmännische Und (`&`) als reines Textzeichen statt als XML-Entity `&amp;` notiert:
- **Zeile 172:** `<text class="info-label" x="14" y="24">Mathematik & Eigenschaften:</text>`
- **Zeile 181:** `<text class="info-val" x="14" y="153">✓ CAD-Software & technische Konstruktionszeichnungen ...</text>`
- **Zeile 294:** `<text class="info-label" x="14" y="24">Mathematik & Eigenschaften:</text>`
- **Zeile 303:** `<text class="info-val" x="14" y="153">✓ 3D-Simulationen, Digitale Zwillinge & Virtuelle Inbetriebnahmen</text>`

**Auswirkung:**  
XML-Parser (z.B. Python `xml.etree`, SVG-Rendering-Engines in Chromium/WebKit, MARP-PDF-Exporteure) brechen das Parsen der Datei mit der Fehlermeldung `not well-formed (invalid token): line 172, column 57` ab. Auf der Folie erscheint im ungünstigsten Fall ein leeres Feld oder ein gebrochenes Bild-Icon.

**Behebung:**  
Ersetzung aller vier Vorkommen von `&` durch `&amp;`.

---

### 3.2 UTF-8 Encoding-Korruption (``) in Mermaid-Diagrammen

Zwei Mermaid-Diagramme und deren kompilierte SVGs in Kapitel 08 wurden mit falschen Zeichensätzen (Windows-1252 / ISO-8859-1) gespeichert:

1. **`Algebraische_Schleife_Praxis.mmd` & `.svg`:**
   - Quellzeile: `Gain["<b>Gain R1</b><br/>V = I·R1"]` enthält das Byte `0xb7` (Mittelpunkt `·` in CP1252).
   - In der SVG-Datei wird dies als Unicode Replacement Character `` gerendert: `V = IR1`.
2. **`Simulationsschleife_Implizit.mmd` & `.svg`:**
   - Enthält deutsche Umlaute (`Zustände`, `Ausgänge`, `erhöhen`) in Windows-1252-Kodierung (Byte `0xe4` für `ä`, `0xf6` für `ö`).
   - In der SVG-Datei resultiert dies in fehlerhaften Zeichen: `Zustnde initialisieren`, `Ausgnge & Ableitungen`, `Zeit erhhen`.

**Behebung:**  
Konvertierung beider `.mmd`-Dateien nach **UTF-8 ohne BOM** und Neukompilierung der SVGs mit `mmdc`.

---

### 3.3 Extreme Aspektverhältnisse ("Das Banner-Problem")

Acht SVG-Diagramme weisen extreme Seitenverhältnisse auf ($B : H > 5 : 1$ oder gar $> 12 : 1$). Bei Skalierung auf Folienbreite führt dies zu mikroskopisch kleinen Schriften, die im Hörsaal nicht lesbar sind:

| Diagramm | Kapitel & Folie | ViewBox ($B \times H$) | Aspekt ($B : H$) | Einbindung | Effektive Schriftgröße bei 1080p | Visueller Befund & Handlungsbedarf |
|:---|:---|:---:|:---:|:---|:---:|:---|
| **`Simulationsprozess_Synthese.svg`** | 11, F. 48 (Z. 957) | $1654.9 \times 136.0$ | **12.17 : 1** | `![w:1150 center]` | **ca. 5.5 px** | **Extremes Banner:** 6 lineare Schritte horizontal gekettet. Auf $w:1150$ schrumpft die Texthöhe dramatisch. Umbruch in 2 Zeilen (3 Blöcke oben, 3 unten). |
| **`Produktionssystem.svg`** | 09, F. 15 (Z. 222) | $1050.8 \times 140.0$ | **7.51 : 1** | `![w:500]` | **ca. 6.2 px** | Sehr schmale Kette in Halbspalte. Text kaum lesbar. Umstellung auf 2-zeiligen Fluss. |
| **`VIBN_Systemarchitektur.svg`** | 11, F. 37 (Z. 725) | $1371.2 \times 196.0$ | **7.00 : 1** | `![w:1100 center]` | **ca. 8.0 px** | Flaches Band. Lesbarkeit grenzwertig; Stacking von Steuerung und virtuellem Modell empfohlen. |
| **`MSAGL_AlgebraicLoop_Highlight.svg`** | 04, F. 27 (Z. 528) | $1404.9 \times 221.0$ | **6.36 : 1** | `![w:1100 center]` | **ca. 8.5 px** | Lineares Blockschaltbild. Feedback-Kante über die gesamte Breite. |
| **`DepartureEvent.svg`** | 09, F. 21 (Z. 317) | $1152.7 \times 213.3$ | **5.40 : 1** | `![w:500]` | **ca. 7.8 px** | Ereignisablauf in Halbspalte gequetscht. |
| **`Next-Event-Time-Advance.svg`** | 09, F. 11 (Z. 165) | $1125.1 \times 212.0$ | **5.31 : 1** | `![w:1000 center]` | **ca. 9.0 px** | Zeitleiste akzeptabel, Beschriftungen könnten größer sein. |
| **`Algebraische_Schleife_Praxis.svg`** | 08, F. 61 (Z. 1525) | $739.6 \times 141.0$ | **5.25 : 1** | `![w:500]` | **ca. 8.2 px** | Kompaktes Schleifendiagramm. Noch lesbar, aber Umbruch optimierbar. |
| **`ArrivalEvent.svg`** | 09, F. 19 (Z. 285) | $1114.4 \times 222.0$ | **5.02 : 1** | `![w:500]` | **ca. 8.0 px** | Ereignisablauf in Halbspalte gequetscht. |

---

### 3.4 Feste physikalische Maßeinheiten (`mm`) in älteren Vektorgrafiken

15 ältere Vektorgrafiken (hauptsächlich CAD- und OpenOffice-Exporte in Kapitel 01, 05, 08 und 10) enthalten feste Millimeter-Angaben in ihren Wurzelelementen:
- `Phong - Diffuse.svg`, `Phong - Gesamt.svg`, `Phong - Specular.svg`, `Phong - Vektoren.svg`, `Phong - Kombiniert.svg`: `width="100mm" height="100mm"`
- `ShadeModel_Flat.svg`, `ShadeModel_Smooth.svg`: `width="100mm" height="100mm"`
- 5 Zylinder-Normalen-Diagramme in Kapitel 05: `width="77.51mm" ...`
- `Nulldurchgang.svg` in Kapitel 10: `width="40.26mm" height="80.26mm"`
- 6 Modellarten-SVGs in `Grafiken/`: `width="160mm" height="90mm"`

**Problem:**  
Wenn ein Browser oder MARP-Renderer eine SVG mit absoluten Maßeinheiten (`mm`) ohne explizite Breitenangabe rendert, wird die physische Druckauflösung (1 Inch = 25.4 mm = 96 px) zugrunde gelegt. Dies führt dazu, dass Containergrenzen ignoriert werden.

**Empfehlung:**  
Standardisierung aller Wurzelelemente auf responsive Attribute:
`width="100%" height="100%" viewBox="minX minY width height"`

---

### 3.5 Didaktischer Widerspruch: 2D-Kräftegrafik auf 3D-Folie

In `Folien/07_Statische_Modelle/Folien.md`, Folie 40 (Z. 655):
- Folientext: Behandelt das **räumliche Gleichungssystem im 3D-Raum** ($\sum F_x = 0, \sum F_y = 0, \sum F_z = 0$, $3k$ Gleichungen für $k$ Knoten).
- Eingebundene Grafik: `![w:450](./Diagramme/Kraeftegleichgewicht_2D.tikz.svg)`.
- **Befund:** Ein 2D-Kräftedreieck in der $xy$-Ebene wird gezeigt, während der Text die $z$-Achse und 3D-Einheitsvektoren erklärt.
- **Handlungsempfehlung:** Erstellung einer 3D-Kräftegleichgewichts-Grafik (`Kraeftegleichgewicht_3D.tikz.svg`) mit räumlichem Achsenkreuz $(x,y,z)$ und 3D-Stabvektoren am Knoten.

---

## 4. Schwerpunkt 3: Rastergrafiken, Typografie & Software-Screenshots

### 4.1 C#-generierte Diagramme (`Skripte/GrafikGenerator/`)

Die mit ScottPlot 5 und SkiaSharp generierten HiDPI-Grafiken weisen eine exzellente Renderauflösung ($1600 \times 900$ bzw. $1600 \times 960\,\text{px}$) auf. Bei der Detailprüfung der Beschriftungen wurden jedoch zwei fachliche Mängel festgestellt:

#### 1. Terminologischer Fehler in `AntiWindup_Vergleich.png`
- **Titel:** `"DC-Servomotor Schrittantwort: Anti-Windup Clamping"`
- **Kritik:** In der deutschsprachigen Regelungstechnik existiert der Begriff "Schrittantwort" nicht. Die Reaktion eines dynamischen Systems auf eine sprunghafte Änderung der Eingangsgröße (Heaviside-Sprung) heißt normgerecht und ausnahmslos **Sprungantwort** (engl. *step response*).
- **Kurvendiskrepanz:**
  - Die Legende deklariert: *"Ohne Anti-Windup (Überschwingen 60%)"* und *"Mit Anti-Windup Clamping (aperiodisch)"*.
  - Die tatsächliche Simulation in `Program.cs` (Zeilen 483–520) berechnet jedoch für die rote Kurve ein Maximum von ca. $1.155$ (entspricht **$15.5\%$** Überschwingen, nicht $60\%$).
  - Die grüne Kurve schwingt auf $1.112$ über (entspricht **$11.2\%$** Überschwingen). Sie ist daher streng genommen **nicht aperiodisch**, da ein aperiodischer Grenzfall per Definition überhaupt kein Überschwingen ($\le 1.0$) aufweisen darf!
- **Korrektur:** Anpassung der Reglerparameter in `Program.cs` ($K_p, K_i$), sodass ohne Anti-Windup tatsächlich ca. $50–60\%$ Überschwingen auftritt und mit Clamping ein echter aperiodischer Verlauf resultiert. Titel auf *"DC-Servomotor Sprungantwort: Anti-Windup Clamping"* korrigieren.

#### 2. Code-Notation auf Achsenbeschriftung in `Solver_Konvergenzordnung.png`
- **Y-Achse:** `"log₁₀(Globaler Fehler ||x(T) - x_analytisch(T)||)"`
- **Kritik:** Der Unterstrich `x_analytisch` entspricht Programmier-Syntax statt mathematischer Formelkonvention ($x_{\text{analytisch}}$ bzw. $x_{\text{exact}}$).

#### 3. Schwacher visueller Kontrast in `Randbedingungen_Vergleich.png`
- **Befund:** Bei 120 Zeitschritten auf dem $180 \times 180$-Gitter hat die Diffusionsfront die Ränder bei $x=0, y=0$ kaum erreicht. Der Unterschied zwischen absorbierendem Dirichlet-Rand und reflektierendem Neumann-Rand ist mit bloßem Auge kaum wahrnehmbar.
- **Empfehlung:** Erhöhung der Simulationsschritte auf $300$ oder Platzierung der Wärmequelle näher an der linken oberen Ecke (z.B. bei $x=25, y=25$).

---

### 4.2 Software-Screenshots (`Screenshots/`) & UI-Typografie

#### 1. Durchschlagender Code-Tippfehler: `"Intergate"`
In zwei Vorlesungs-Screenshots aus Kapitel 08 ist der Knotenname des Integrators falsch geschrieben:
- `Einfaches_Beispiel_Euler_Explizit.png`: Knotenbeschriftung `Intergate1 (StartValue = 0)`
- `Einfache_Schleife_Euler_Explizit.png`: Knotenbeschriftung `Intergate (StartValue = 1)`

**Ursache im C#-Quellcode:**  
Der Fehler ist direkt im Quellcode der Vorlesungsbeispiele verankert:
- `Quellen/WS25/SFunctionContinuous/Framework/Examples/BasicExample.cs` (Zeile 10):
  ```csharp
  Block i1 = new IntegrateBlock("Intergate1", 0); // <-- Tippfehler
  ```
- `Quellen/WS25/SFunctionContinuous/Framework/Examples/BasicLoopExample.cs` (Zeile 9):
  ```csharp
  Block i = new IntegrateBlock("Intergate", 1);    // <-- Tippfehler
  ```
- Identische Tippfehler in `Quellen/WS25/SFunctionHybrid/Framework/Examples/`.

**Handlungsempfehlung:**  
Korrektur der String-Literale im C#-Code auf `"Integrate1"` bzw. `"Integrate"` und Neuaufnahme der beiden Screenshots.

#### 2. Screen-Capture-Artefakte in Titelleisten
In den Screenshots `Bouncing_Ball_Naive_Explizit.png` und `Bouncing_Ball_Erweitert_Explizit.png` in Kapitel 10 befindet sich mittig im oberen Fensterrand ein auffälliger schwarzer Rechteckbalken (Überbleibsel des Windows-Fensterschnapp-Handles bzw. des Snipping Tools). Die Screenshots sollten sauber ohne Fenster-Overlays neu zugeschnitten werden.

#### 3. Veralteter Low-Res Plot `Pendelsimulation.png`
In `Folien/08_Dynamische_Modelle_Kontinuierlich/Illustrationen/Pendelsimulation.png`:
- Auflösung nur $576 \times 302\,\text{px}$.
- Kryptische Legende: `"Implizit + N"` (gemeint ist implizites Euler-Verfahren mit Newton-Raphson-Iteration).
- Farbinkonsistenz: Die grüne Legendenlinie taucht im Diagramm nicht auf (die gedämpfte Schwingung ist braun).
- **Empfehlung:** Neu-Generierung über den `GrafikGenerator` als sauberer ScottPlot 5 Plot mit $1600 \times 900\,\text{px}$.

---

### 4.3 KI-Illustrationen (Nano Banana) & Titelbilder

#### 1. Sprachinkonsistenz (Englische Schlagwörter in deutscher Vorlesung)
Mehrere Illustrationen enthalten prominente englische Schlagwörter, die im Kontrast zum sonst rein deutschsprachigen Vorlesungsmaterial stehen:
- `ArrivalEvent.jpg`, `DepartureEvent.jpg`, `SimulationBeispiel.jpg` (Kapitel 09):
  Große Überschrift **"SERVICE FLOW"** und Schild **"QUEUE HERE"**.
- `Digitaler_Zwilling_Erweitert.jpg` (Kapitel 01):
  **"Digital Twin"**, **"GEOMETRY DATA"**, **"PHYSICS & LOGIC"**, **"CURRENT STATE DATA"**.
- `Digitaler_Zwilling_Simulation.jpg` (Kapitel 01):
  **"DIGITAL TWIN"**, **"SIMULATION PLATFORM"**, **"CORE TECHNOLOGY"**.
- `Analog_Digital.jpg` (Kapitel 10):
  **"ANALOG IN"**, **"A/D CONVERSION"**, **"DIGITAL OUT"**.

> [!NOTE]
> Während technische Fachbegriffe wie *A/D Conversion* oder *Digital Twin* im Ingenieurwesen international verstanden werden, wirken rein englische Plakate wie *"SERVICE FLOW / QUEUE HERE"* in einer deutschsprachigen Grundvorlesung wie Fremdkörper aus angelsächsischen Stock-Bibliotheken.

#### 2. KI-Fragment-Artefakte ("AI Gibberish")
- In `Folien/01_Einführung/Illustrationen/Digitaler_Zwilling_Erweitert.jpg` existiert neben dem Gehirn-Symbol ein schwebendes Pseudotext-Fragment: ein Pfeil mit der Beschriftung `--> PX` und ein unvollständiges Formelfragment `IF / \ ->`.
- In `Folien/00_Prolog/Titelbild.png` enthalten die Monitore im Hintergrund verwaschene Linienmuster, die Programmcode simulieren sollen. Dies ist als rein atmosphärisches Stilelement akzeptabel, sollte jedoch bei hochaufgelöster Projektion nicht als echter Code missverstanden werden.

#### 3. Seitenverhältnis-Inkonsistenz der Titelbilder
Die 12 Kapitel-Titelbilder weisen zwei unterschiedliche Formate auf:
- **Format 3:4 ($896 \times 1200\,\text{px}$):** Kapitel 02, 03, 04, 06, 11  
  *Wirkung:* Füllt den rechten MARP-Split (`![bg right]`) bei 16:9-Folien ohne jeglichen Bildbeschnitt ideal aus.
- **Format 1:1 ($1024 \times 1024\,\text{px}$):** Kapitel 00, 01, 05, 07, 08, 09, 10  
  *Wirkung:* Durch das CSS-Verhalten `background-size: cover` werden ca. 12% an der oberen und unteren Bildkante unkontrolliert abgeschnitten.
- **Dateiformat:** Kapitel 00 nutzt `.png`, alle anderen 11 Kapitel nutzen `.jpg`.

---

## 5. Detaillierte Schweregrad-Klassifizierung

### Kategorie A: Kritische Mängel (Blocker / Sofortige Behebung erforderlich)

| ID | Datei / Fundstelle | Problem / Ursache | Auswirkung | Handlungsempfehlung |
|:---:|:---|:---|:---|:---|
| **A-1** | `Folien/05_Visualisierung_3D_OpenGL/Diagramme/Projektionsarten.svg` | Unmaskierte `&`-Zeichen in Zeilen 172, 181, 294, 303 | **XML Parsing Error:** SVG wird von Browsern und MARP-Exporten nicht gerendert. | Alle `&` durch `&amp;` ersetzen. |
| **A-2** | `Folien/03_Visualisierung_2D_Vektor/Folien.md` (F. 17)<br>`Folien/07_Statische_Modelle/Folien.md` (F. 6, 11, 28, 34) | **5 handgezeichnete Tafelbilder** aktiv im Foliensatz eingebunden | Verstößt gegen No-Go-Kriterium des Kurses; unprofessioneller Eindruck. | Vollständiger Ersatz durch saubere TikZ-/SVG-Vektorgrafiken gemäß Spezifikation in Kap. 2.2. |
| **A-3** | `Folien/08_Dynamische_Modelle_Kontinuierlich/Diagramme/Algebraische_Schleife_Praxis.svg`<br>`.../Simulationsschleife_Implizit.svg` | Nicht-UTF-8 Zeichen (CP1252) führen zu ``-Glyphen in den gerenderten SVGs | Zerstörte Umlaute und Sonderzeichen im Vorlesungsdiagramm. | `.mmd`-Quellen nach UTF-8 konvertieren und SVGs neu kompilieren. |
| **A-4** | `Quellen/WS25/SFunctionContinuous/.../BasicExample.cs`<br>`Folien/08_.../Screenshots/Einfaches_Beispiel_Euler_Explizit.png`<br>`.../Einfache_Schleife_Euler_Explizit.png` | Tippfehler `"Intergate"` im C#-Blockbezeichner und im gerenderten Screenshot | Fachlicher Tippfehler in offiziellen Vorlesungs-Screenshots. | Im C#-Code korrigieren (`"Integrate"`), Projekt ausführen und Screenshots neu erfassen. |
| **A-5** | `Folien/07_Statische_Modelle/Folien.md` (Folie 40, Z. 655) | Einbindung von `Kraeftegleichgewicht_2D.tikz.svg` auf einer Folie zur 3D-Statik | Didaktischer Widerspruch: 2D-Grafik auf 3D-Herleitungsfolie. | Durch 3D-Kräftegleichgewichtsgrafik ersetzen. |

---

### Kategorie B: Mittlere Mängel (Unschön / Optimierung dringend empfohlen)

| ID | Datei / Fundstelle | Problem / Ursache | Auswirkung | Handlungsempfehlung |
|:---:|:---|:---|:---|:---|
| **B-1** | `Simulationsprozess_Synthese.svg` (Kap. 11)<br>`Produktionssystem.svg` (Kap. 09)<br>`VIBN_Systemarchitektur.svg` (Kap. 11)<br>`MSAGL_AlgebraicLoop_Highlight.svg` (Kap. 04) | Extreme Aspektverhältnisse ($5:1$ bis $12.2:1$) | Horizontale Skalierung komprimiert Schriftgröße auf $\le 6\,\text{px}$ (unlesbar auf Beamer). | Mermaid-Graphen 2-stufig bzw. vertikal umbrechen (Stacking). |
| **B-2** | `Skripte/GrafikGenerator/Program.cs`<br>`AntiWindup_Vergleich.png` | Fachbegriff "Schrittantwort" statt "Sprungantwort"; Kurvenabweichung (15.5% statt 60% Overshoot) | Terminologischer Fehler in Regelungstechnik; didaktische Kurvendiskrepanz. | Titel auf "Sprungantwort" korrigieren; Reglerparameter für realistische Dämpfung anpassen. |
| **B-3** | 15 SVG-Dateien (`Phong - *.svg`, `Zylindernormale - *.svg`, `Nulldurchgang.svg`, etc.) | Absolute Millimeter-Angaben (`width="100mm"`) im SVG-Header | Unkontrolliertes Skalierungsverhalten in responsiven Containern. | Header auf `width="100%" height="100%"` mit Erhalt der `viewBox` umstellen. |
| **B-4** | `Sphere_Slices_Stacks.png` ($361 \times 362\,\text{px}$)<br>`OpenGL_Normalen.png` ($400 \times 200\,\text{px}$)<br>`Pendelsimulation.png` ($576 \times 302\,\text{px}$) | Niedrige Bitmap-Auflösung wird um das 1.5- bis 2.5-fache hochskaliert | Sichtbare Pixelierung und Kantenunschärfe bei 1080p/4K-Beamerprojektion. | Neu-Generierung als SVG oder hochauflösende Rastergrafik ($\ge 1600\,\text{px}$). |
| **B-5** | `Bouncing_Ball_Naive_Explizit.png`<br>`Bouncing_Ball_Erweitert_Explizit.png` | Schwarzer Fenster-Capture-Balken in Titelleiste; Kanten schneiden Text im MSAGL-Graph | Unprofessionelle Screenshot-Qualität; unruhiges Graph-Layout. | Screenshots ohne Fenster-Overlays neu erfassen; Node-Abstände in MSAGL vergrößern. |
| **B-6** | `ArrivalEvent.jpg`, `DepartureEvent.jpg`<br>`Digitaler_Zwilling_Erweitert.jpg`<br>`Digitaler_Zwilling_Simulation.jpg` | Rein englische Überschriften und Labels ("SERVICE FLOW", "QUEUE HERE") | Stilistischer Bruch mit dem deutschsprachigen Vorlesungsmaterial. | Grafiken bei Gelegenheit durch deutsch beschriftete Varianten ersetzen. |

---

### Kategorie C: Geringe Mängel (Polishing & Clean-Up)

| ID | Datei / Fundstelle | Problem / Ursache | Auswirkung | Handlungsempfehlung |
|:---:|:---|:---|:---|:---|
| **C-1** | Alle 12 Kapitel (`Titelbild.*`) | Mix aus $1024 \times 1024$ (1:1) und $896 \times 1200$ (3:4); Kapitel 00 nutzt `.png`, sonst `.jpg` | Quadratische Titelbilder werden vertikal um ca. 12% beschnitten; Format-Inkonsistenz. | Langfristig alle Titelbilder auf einheitliches 3:4-Format ($896 \times 1200\,\text{px}$, JPG) standardisieren. |
| **C-2** | 23 verwaiste Mediendateien in `Folien/` | Bilder und SVGs existieren auf der Festplatte, werden aber in keinem Foliensatz referenziert | Unnötiger Ballast im Repository, Verwirrung bei Pflege. | In `Archiv/` verschieben oder löschen. |
| **C-3** | `Digitaler_Zwilling_Erweitert.jpg` | Schwebende KI-Artefakt-Fragmente (`--> PX`, `IF / \ ->`) | Leichte optische Irritation bei genauem Hinsehen. | Bildbereinigung (Inpainting) der störenden Schriftfragmente. |
| **C-4** | `Skripte/GrafikGenerator/Program.cs`<br>`Randbedingungen_Vergleich.png` | Zu geringe Diffusionszeit (120 Schritte) lässt Dirichlet vs. Neumann sehr ähnlich wirken | Didaktischer Kontrast zwischen Absorption und Reflexion bleibt subtil. | Zeitschritte auf 300 erhöhen oder Wärmequelle näher an den Rand setzen. |

---

## 6. Konkreter, priorisierter Maßnahmenkatalog

### Phase 1: Sofortmaßnahmen (Blocker-Beseitigung innerhalb von 1–2 Tagen)

1. **Reparatur von `Projektionsarten.svg`:**
   - In `Folien/05_Visualisierung_3D_OpenGL/Diagramme/Projektionsarten.svg` alle unmaskierten `&` durch `&amp;` ersetzen.
2. **UTF-8 Sanierung von `Algebraische_Schleife_Praxis.mmd` & `Simulationsschleife_Implizit.mmd`:**
   - Beide Dateien als UTF-8 ohne BOM abspeichern (`·` und Umlaute korrigieren).
   - Mit `mmdc -i input.mmd -o output.svg` neu kompilieren, sodass keine ``-Zeichen mehr gerendert werden.
3. **C#-Code-Korrektur ("Intergate" -> "Integrate"):**
   - In `BasicExample.cs` und `BasicLoopExample.cs` (in `Quellen/WS25/SFunctionContinuous/` und `SFunctionHybrid/`) den Tippfehler korrigieren.
   - Programm ausführen und die beiden Screenshots in `Folien/08_Dynamische_Modelle_Kontinuierlich/Screenshots/` aktualisieren.

### Phase 2: Eliminierung der 5 Tafelbilder (Vektorisierungs-Sprint)

1. **Kapitel 03 (Folie 17):**
   - TikZ-Grafik `Diagramme/Pfeilspitzengeometrie_2D.tikz.tex` erstellen und kompilieren.
   - In `Folien/03_Visualisierung_2D_Vektor/Folien.md` die Einbindung von `Tafelbild_Visualisierung_Pfeilspitze_2D.jpg` auf `./Diagramme/Pfeilspitzengeometrie_2D.tikz.svg` umstellen.
2. **Kapitel 07 (Folie 6):**
   - Vektorgrafik `Diagramme/Fachwerk_Topologie_2D.svg` für das 5-Knoten-Fachwerk erstellen und `Fachwerk_Beispiel.png` ersetzen.
3. **Kapitel 07 (Folie 11):**
   - `Fachwerk_Elemente.png` entfernen und durch eine strukturierte Markdown-Definitionsbox oder ein sauberes Mermaid-Objektdiagramm ersetzen.
4. **Kapitel 07 (Folie 28 & 34):**
   - `Stabgleichungssystem.jpg` und `Allgemeines Gleichungssystem mit Randbedingungen.jpg` durch saubere mathematische MathJax-Formelblöcke bzw. TikZ-Matrixdiagramme ersetzen.

### Phase 3: Ergonomie & Feinschliff (Banner-Umbrüche & Generator)

1. **Entflechtung der Banner-Diagramme:**
   - `Simulationsprozess_Synthese.mmd` von `flowchart LR` auf ein 2-zeiliges Layout mit Stacking umstellen.
   - `Produktionssystem.mmd` und `VIBN_Systemarchitektur.mmd` zweizeilig anordnen.
2. **Update des C#-Grafikgenerators:**
   - In `Program.cs` die Beschriftung auf `"DC-Servomotor Sprungantwort: Anti-Windup Clamping"` ändern.
   - Die Reglerverstärkung anpassen, sodass ein deutlicherer Unterschied zwischen ungedämpftem und geklemmtem Verhalten entsteht.
   - Diffusionsschritte bei `Randbedingungen_Vergleich` auf 300 anheben.
   - `dotnet run` im Verzeichnis `Skripte/GrafikGenerator/` ausführen.
3. **Repository-Bereinigung:**
   - 23 verwaiste Dateien in ein Archiv verschieben.
   - Statische `mm`-Einheiten in den 15 älteren SVGs auf Prozentangaben mit fester `viewBox` normalisieren.
