# Aufgabenblatt 03: Vektorgrafik, WPF Canvas & Koordinatentransformation

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** B.Sc. Automatisierungstechnik, 5. Semester  
**Institution:** Fachhochschule Oberösterreich – Campus Wels  
**Bearbeitungsform:** 
- **Stufe A (In-Class Sprint):** Einzelarbeit oder 2er-Tandem (Labor, 60 min)
- **Stufe B (Homework Extension):** Festes 2er-Team (1 Woche, ca. 2–3 h pro Person)
**Technologie-Vorgabe:** C# 12 / .NET 8 oder .NET 10, WPF mit `System.Windows.Controls.Canvas` und 2D-Vektorprimitiven (`Line`, `Path`, `Polygon`, `Ellipse`).  
> [!CAUTION]
> **Vorgreif-Sperre & Didaktische Kausalitäts-Sperre für Termin 03:**  
> In dieser Einheit steht ausschließlich die **reine geometrische 2D-Vektorgrafik und Interaktion** im Fokus!  
> Es dürfen **KEINE Steifigkeitsmatrizen**, **KEINE Cholesky-Zerlegungen** und **KEINE Stabkräfteberechnungen** implementiert werden! (Die mechanisch-statische FEM-Berechnung erfolgt erst in Einheit 07).  
> Zudem gilt: **KEIN** ScottPlot, **KEIN** SharpGL 3D, **KEIN** Multithreading!

---

## 1. Lernziele (Intended Learning Outcomes - ILOs)

Nach erfolgreicher Bearbeitung dieses Aufgabenblattes können Sie:
1. **Affine Welt-zu-Bildschirm-Transformation:** Ingenieurtechnische Weltkoordinaten in Metern mathematisch exakt, verzerrungsfrei (isotropes Seitenverhältnis) und mit Achseninversion ($Y$ positiv nach oben) auf Bildschirm-Pixel abbilden.
2. **Dynamische BoundingBox & Auto-Fit:** Die minimale Hüllbox (Bounding Box) beliebiger 2D-Geometrien berechnen und das Modell mit konfigurierbarem Randabstand (Margin) responsiv im Fenster zentrieren.
3. **Vektorielle Pfeilspitzendynamik:** Aus Richtungsvektoren und Einheitsnormalen geschlossene Pfeilspitzen (`Polygon`) mit definierter Spitzenlänge und konstantem Spreizwinkel analytisch rotieren.
4. **Normgerechte Bemaßungsketten (DIN 406):** Technische Maßhilfslinien, Maßlinien mit Pfeilen und zentrierte Maßbeschriftungen vektorbasiert generieren.
5. **Flüssige Canvas-Interaktivität:** Geometrieknoten per Mouse-Drag-and-Drop in Echtzeit verschieben, ohne Render-Artefakte oder Speicherlecks zu erzeugen.

---

## 2. Mathematische Grundlagen

### 2.1 Koordinatentransformation (Welt $\to$ Screen)
Ingenieurkoordinaten $(x_{\text{w}}, y_{\text{w}})$ in Metern besitzen eine nach oben positive $Y$-Achse. Der WPF-Canvas hat seinen Ursprung $(0,0)$ links oben mit einer nach unten positiven $Y$-Achse.

```
   Welt-System (Meter)                  WPF-Canvas (Pixel)
   Y ^                                  (0,0) ───────> X_screen
     │                                    │
     │   (x_w, y_w)                       │        (x_s, y_s)
     │       •                            │            •
     └─────────────> X                    ▼ Y_screen
```

Gegeben sei das BoundingBox-Intervall $[x_{\min}, x_{\max}] \times [y_{\min}, y_{\max}]$, die Canvas-Breite $w_{\text{canvas}}$ und -Höhe $h_{\text{canvas}}$ sowie die Ränder $\text{margin}_x, \text{margin}_y$:
1. **Isotroper Skalierungsfaktor $s$ (Wahrung des Seitenverhältnisses):**
   $$s_x = \frac{w_{\text{canvas}} - 2 \cdot \text{margin}_x}{x_{\max} - x_{\min}}, \quad s_y = \frac{h_{\text{canvas}} - 2 \cdot \text{margin}_y}{y_{\max} - y_{\min}}$$
   $$s = \min(s_x, s_y) \quad \left[\frac{\text{Pixel}}{\text{m}}\right]$$
2. **Zentrierungs-Offsets (Centering Offsets):**
   $$x_{\text{offset}} = \frac{(w_{\text{canvas}} - 2 \cdot \text{margin}_x) - (x_{\max} - x_{\min}) \cdot s}{2}$$
   $$y_{\text{offset}} = \frac{(h_{\text{canvas}} - 2 \cdot \text{margin}_y) - (y_{\max} - y_{\min}) \cdot s}{2}$$
3. **Transformationsgleichungen:**
   $$x_{\text{screen}} = \text{margin}_x + x_{\text{offset}} + (x_{\text{w}} - x_{\min}) \cdot s$$
   $$y_{\text{screen}} = h_{\text{canvas}} - \left[ \text{margin}_y + y_{\text{offset}} + (y_{\text{w}} - y_{\min}) \cdot s \right]$$

### 2.2 Analytische Pfeilspitzenberechnung
Für einen Kraft- oder Geschwindigkeitsvektor $\vec{F} = [F_x, F_y]^\top$ vom Angriffspunkt $\vec{p}_{\text{start}}$ zum Endpunkt $\vec{p}_{\text{end}}$ lautet der Richtungswinkel:
$$\phi = \operatorname{atan2}(F_y, F_x)$$
Die beiden Flügelpunkte $\vec{p}_{\text{left}}$ und $\vec{p}_{\text{right}}$ einer geschlossenen Pfeilspitze mit Länge $L_{\text{tip}}$ und Halbwinkel $\beta$ (typisch $15^\circ \approx 0{,}26\,\text{rad}$) werden über Drehmatrizen relativ zur Spitze $\vec{p}_{\text{tip}} = \vec{p}_{\text{end}}$ berechnet:
$$\vec{p}_{\text{left}} = \vec{p}_{\text{tip}} - L_{\text{tip}} \begin{bmatrix} \cos(\phi - \beta) \\ \sin(\phi - \beta) \end{bmatrix}, \quad \vec{p}_{\text{right}} = \vec{p}_{\text{tip}} - L_{\text{tip}} \begin{bmatrix} \cos(\phi + \beta) \\ \sin(\phi + \beta) \end{bmatrix}$$

---

## 3. Stufe A: In-Class Sprint (60 Minuten)

**Thema:** 2D-Trägerdreieck & Vektorpfeile auf WPF Canvas  
**Ziel:** Entwickeln Sie in 60 Minuten eine responsive WPF-Vektoranwendung, die ein einfaches Dreieckstragwerk mit Bemaßung und Lastpfeil zentriert auf einem Canvas darstellt.

### Aufgabenstellung:
1. Erstellen Sie ein neues WPF-Projekt `Sprint_CanvasVector`.
2. Platzieren Sie im XAML ein `<Canvas x:Name="TrussCanvas" Background="#1E1E1E"/>`.
3. Schreiben Sie eine Hilfsklasse `CoordinateTransformer`:
   - Wandelt Weltkoordinaten $(X, Y)$ in Canvas-Punkte $(x_{\text{s}}, y_{\text{s}})$ um.
   - Berechnet $s = \min(s_x, s_y)$ und zentriert die Geometrie mit $50\,\text{px}$ Margin.
4. **Geometrie-Definition:**
   - 3 Knoten: $K_1 = (0, 0)\,\text{m}$, $K_2 = (4, 0)\,\text{m}$, $K_3 = (2, 2)\,\text{m}$.
   - 3 Stäbe: $(K_1, K_2)$, $(K_2, K_3)$, $(K_3, K_1)$.
5. **Canvas-Zeichnen:**
   - Zeichnen Sie die Stäbe als `Line` (Strichstärke $3\,\text{px}$, Farbe Weiß oder Hellgrau).
   - Zeichnen Sie die Knoten als gefüllte Kreise (`Ellipse`, Durchmesser $14\,\text{px}$, Cyan).
   - Fügen Sie Textlabels („K1“, „K2“, „K3“) neben den Knoten ein.
6. **Vektorpfeil:**
   - Zeichnen Sie an Knoten $K_3$ einen nach unten gerichteten Lastpfeil $\vec{F} = [0, -20]\,\text{kN}$ (Länge z. B. $60\,\text{px}$, Farbe Rot).
   - Generieren Sie die Spitze als geschlossenes `Polygon` mit 3 Punkten ($\vec{p}_{\text{tip}}, \vec{p}_{\text{left}}, \vec{p}_{\text{right}}$).
7. **Resize-Handling:**
   - Abonnieren Sie das `TrussCanvas.SizeChanged`-Event: Bei jeder Fenstergrößenänderung muss sich das Tragwerk ohne Verzerrung neu im Canvas zentrieren.
- **Erwartetes Ergebnis:** Ein absolut sauber zentriertes, unverzerrtes Vektor-Dreieck mit rotem Lastpfeil bei beliebigem Fensterformat.

---

## 4. Stufe B: Homework Extension (Wahlmodell)

> [!IMPORTANT]
> **Wahlmodell – GENAU EINE Aufgabe (keine Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **entweder Track A (Industrie)** ODER **Track B (Simulation Game)**.  
> Beide Tracks konzentrieren sich rein auf 2D-Vektorgrafik, mathematische Transformationen und Interaktivität auf dem Canvas und führen zur Höchstpunktzahl (10 Punkte).

```
                    ┌──────────────────────────────────────────────┐
                    │ WÄHLEN SIE GENAU EINEN DER BEIDEN TRACKS:    │
                    └──────────────────────┬───────────────────────┘
                                           │
                 ┌─────────────────────────┴─────────────────────────┐
                 ▼                                                   ▼
┌─────────────────────────────────┐                 ┌─────────────────────────────────┐
│  Track A: Industrie & CAD       │                 │   Track B: Simulation Game / CAD│
│  2D-CAD Fachwerkträger-Viewer   │                 │   Space Radar & Navigation ODER │
│  mit DIN 406 Bemaßungsketten    │                 │   Bridge Blueprint Sketcher     │
└─────────────────────────────────┘                 └─────────────────────────────────┘
```

---

### Track A (Industrie): Interaktiver 2D-CAD Fachwerkträger-Viewer

#### Industrielles Szenario:
In der Tragwerksplanung werden Brücken- und Hallenträger als Vektor-Topologien modelliert. Sie entwickeln das interaktive grafische Frontend für einen Fachwerkträger-Viewer, das in Einheit 07 direkt mit dem FEM-Cholesky-Löser gekoppelt werden wird.

#### Funktionsumfang & Anforderungen:
1. **Tragwerks-Import & Topologie:**
   - Einlesen eines industriellen Fachwerkträgers (z. B. Pratt-Träger oder Warren-Träger) mit mindestens **8 Knoten und 13 Stäben**.
   - Knoten-Koordinaten in Metern: z. B. Untergurt bei $Y = 0$, Obergurt bei $Y = 2{,}5\,\text{m}$, Gesamtlänge $12\,\text{m}$.
2. **Auto-Fit BoundingBox mit Seitenverhältnistreue:**
   - Exakte Ermittlung von $X_{\min}, X_{\max}, Y_{\min}, Y_{\max}$ aus allen aktuellen Knoten.
   - Responsives Anpassen bei Resize mit $10\,\%$ Randabstand.
3. **Normgerechte DIN-Bemaßungsketten (DIN 406):**
   - Horizontale Gesamtlängen- und Teilbemaßung unterhalb des Untergurts:
     - Maßhilfslinien (senkrecht von den Knoten nach unten abgesetzt).
     - Maßlinie mit beidseitigen spitzen Maßpfeilen (gefüllte schlanke Dreiecke).
     - Zentrierte Maßbeschriftung (z. B. `4.00 m`).
   - Vertikale Maßkette für die Trägerhöhe links vom Träger.
4. **Kraftpfeile und Auflager-Visualisierung:**
   - Darstellung vorgegebener statischer Lasten (z. B. Einzellasten am Obergurt, rot mit Pfeilspitze).
   - Auflagersymbole: Dreieck für Festlager (Knoten 1), Dreieck auf Rollen für Loselager (Knoten 4).
5. **Interaktives Drag-and-Drop der Knoten:**
   - Der Benutzer kann mit der linken Maustaste einen beliebigen Knoten greifen und frei über den Canvas ziehen.
   - Alle verbundenen Stäbe, Lastpfeile und Maßketten folgen dem Knoten in Echtzeit (`MouseMove`).
   - Eine Infobox oder Tooltip zeigt live die aktuellen Weltkoordinaten $(X, Y)$ in Millimeter-Auflösung an.

---

### Track B (Simulation Game): 2D Space Radar ODER Bridge Blueprint Sketcher

*(Wählen Sie innerhalb von Track B eine der beiden Optionen):*

#### Option B.1: „2D Space Radar & Vector Navigation“ (Sci-Fi Arcade Radar)
- **Szenario:** Taktischer Radarschirm eines Raumschiffs im Vektor-Look (*Asteroids*, *Elite*).
- **Zentrales Raumschiff:** Frei rotierbares Polygon mit Triebwerksschub.
- **Vektorpfeile:** 
  - Geschwindigkeitsvektor $\vec{v}$ (Grün) und Beschleunigungsvektor $\vec{a}$ (Rot) mit exakter Pfeilspitzenberechnung.
  - Vektorlängen skalieren mit dem Betrag, die Pfeilspitzen behalten konstante Pixelabmessungen.
- **Kurs-Prädiktor:** Vorausschau-Trajektorie (gepunktete Linie), die die berechnete Bahn der nächsten 5 Sekunden visualisiert.
- **Radarkreis & Bemaßung:** Konzentrische Distanzringe mit Meter-Bemaßung (z. B. $50\,\text{m}, 100\,\text{m}, 200\,\text{m}$).
- **Interaktion:** Mausrad für stufenlosen Zoom in/out, Drehung der Schiffsnase zur Mausposition.

#### Option B.2: „Bridge Blueprint Sketcher“ (Interaktives Brückenbau-Zeichenbrett)
- **Szenario:** Zeichen- und Entwurfs-Modus für ein Physik-Brückenbauspiel (*Poly Bridge*).
- **Interaktives Konstruieren:**
  - Klick auf den Canvas setzt einen neuen Trägerknoten.
  - Zuschaltbares Grid-Snapping auf ein $0{,}5\,\text{m}$-Gitter.
  - Klicken und Ziehen von Knoten zu Knoten spannt einen neuen elastischen Stab auf.
  - Kontextmenü / Tastenkürzel zum Zuweisen von Lagern (Festlager / Loselager) und Verkehrslasten.
- **Modifikation & Löschen:**
  - Drag-and-Drop zum nachträglichen Justieren bestehender Knoten.
  - Taste `Entf` löscht selektierte Stäbe oder Knoten.
- **JSON-Export:**
  - Schaltfläche „Export JSON“: Speichert die vollständige Topologie (Knoten, Stäbe, Lager, Lasten) in eine strukturierte `.json`-Datei ab.  
  *(Diese Datei kann in Einheit 07 direkt als Input für den statischen Cholesky-FEM-Solver genutzt werden!)*

---

## 5. Akzeptanzkriterien & Bewertungsrubrik (10 Punkte)

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **Mathematische Transformation & Auto-Fit** | 3 P. | Isotropes $s = \min(s_x, s_y)$, korrekte $Y$-Inversion, BoundingBox-Zentrierung ohne Verzerrung bei beliebigem Fensterformat. |
| **Vektorpfeile & Geometrie-Präzision** | 3 P. | Mathematisch exakt rotierte Pfeilspitzen (`Polygon`) mit fixer Pixelgröße bei beliebigen Winkeln $\phi \in [0, 2\pi)$. |
| **Bemaßungsketten / Blueprint-Tools** | 2 P. | **Track A:** Normgerechte DIN 406 Bemaßung (Hilfslinien, Maßlinie, Maßzahl). **Track B:** Snapping, interaktives Stäbeziehen oder Radar-Distanzringe. |
| **Flüssiges Drag-and-Drop** | 1 P. | Ruckelfreies Verschieben von Geometrie-Elementen ohne Render-Artefakte oder Vervielfachung von Canvas-Objekten. |
| **Dokumentation & Code-Qualität** | 1 P. | Saubere Struktur, klare Trennung von Geometrie-Datenmodell und Rendering in `README.md`. |
| **Gesamt** | **10 P.** | **100 % der Übungseinheit** |

---

## 6. Online-Recherche-Box

- **Offizielle Dokumentation:**
  - [Microsoft Learn: Shapes and Basic Drawing in WPF](https://learn.microsoft.com/de-de/dotnet/desktop/wpf/graphics-multimedia/shapes-and-basic-drawing-in-wpf-overview) – Primitive Vektoren in WPF.
  - [Microsoft Learn: MatrixTransform in WPF](https://learn.microsoft.com/de-de/dotnet/api/system.windows.media.matrixtransform) – Affine 2D-Transformationen.
  - [DIN 406-11: Maßeintragung in Zeichnungen](https://de.wikipedia.org/wiki/Ma%C3%9Feintragung) – Regeln für Maßlinien und Maßpfeile.
- **Gezielte englische Suchbegriffe:**
  - `WPF Canvas world to screen coordinate transform aspect ratio`
  - `calculate polygon arrowhead rotation vector geometry C#`
  - `WPF Canvas interactive drag and drop line node update`

---

## 7. Vibe-Coding Prompting-Tipps

> [!WARNING]
> **Typischer KI-Fehler bei Termin 03:**
> - KIs verwenden für Vektorpfeile gerne `Line.StrokeDashArray` oder externe Bibliotheken wie ScottPlot. In dieser Einheit sind jedoch native Canvas-Shapes gefordert!
> - KIs vergessen oft, die Pfeilspitzenlänge unabhängig von der Vektorlänge konstant zu halten, sodass Pfeile bei großen Lasten gigantische Spitzen bekommen.

### Empfohlener Prompt für LLMs:
```text
Schreibe eine WPF-C#-Klasse 'CanvasArrowRenderer', die einen Vektorpfeil von Start- zu Endpunkt auf einem Canvas darstellt.
Der Schaft ist eine 'Line'.
Die Spitze ist ein geschlossenes 'Polygon' (3 Punkte), das über die Drehmatrix mit Winkel atan2(dy, dx) berechnet wird.
Die Pfeilspitze muss eine feste Bildschirmlänge von 12 Pixeln und einen Spreizwinkel von 15 Grad haben, unabhängig von der Vektorlänge.
Verwende saubere Vektorrechnung (System.Numerics.Vector2) und binde KEINE FEM- oder Statikbibliotheken ein.
```

---

## 8. 🔍 Peer-Review-Leitfragen für das Plenum (Showcase & Peer-Challenge)

1. **Seitenverhältnis-Stresstest:**  
   *„Ziehen Sie das Anwendungsfenster am Rand ganz schmal und breit: Behalten die Träger-Dreiecke, Kreise und Bemaßungen ihre exakten Winkel und Proportionen, oder verzerren sie sich zu Ellipsen?“*
2. **Pfeilspitzen-Invarianz:**  
   *„Wird die Pfeilspitze beim Drehen oder Skalieren des Vektors größer oder kleiner, oder behält sie konstant ihre 12 Pixel Kantenlänge und scharfe Spitze?“*
3. **Kausalitäts- und Vorgreif-Check:**  
   *„Wurde die Vorgreif-Sperre strikt eingehalten (kein vorzeitiges Lösen von Gleichungssystemen oder FEM-Rechnungen vor T07)? Konzentriert sich die Architektur rein auf saubere Vektordarstellung und Interaktion?“*
4. **Performance beim Drag-and-Drop:**  
   *„Werden bei jedem Maus-Move neue WPF-Shapes erzeugt und auf den Canvas geklatscht (Memory Leak), oder werden die bestehenden Koordinaten der Shapes (`X1, Y1, X2, Y2`, `Points`) dynamisch aktualisiert?“*
