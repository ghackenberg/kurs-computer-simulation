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

### 3. Stufe A: In-Class Sprint (60 Minuten)

**Basis-Projekt:** Öffnen Sie die bereitgestellte Projektvorlage `Vorlage/VectorTrussCanvas.sln` (`Transform2D.cs`, `VectorArrow.cs`, `TrussGeometry.cs`, `MainWindow.xaml.cs`).  
Die Vorlage enthält bereits die Basisklasse `Transform2D`, das Dreieckstragwerk `CreateSprintTriangle()` sowie die Pfeilspitzen-Methode `VectorArrow.AddForceArrow` und die horizontale Gesamtmaßkette `AddHorizontalDimensionLine`.  
**Ziel des Live-Sprints:** Analysieren Sie die Welt-zu-Bildschirm-Transformation, beheben Sie das Koordinaten-Jittering beim Drag-and-Drop und erweitern Sie den Viewer um Live-Stablängen und eine vertikale DIN-406-Höhenbemaßung!

### Aufgabenstellung (Live im Hörsaal):
1. **Code-Walkthrough & Seitenverhältnis-Test (`Transform2D.cs`):**
   - Starten Sie `VectorTrussCanvas` und führen Sie die bestehenden Unit-Tests (`dotnet test`) aus.
   - Ziehen Sie das Anwendungsfenster extrem schmal und extrem breit: Prüfen Sie, wie `s = Math.Min(sx, sy)` und die Zentrierungs-Offsets `OffsetX`, `OffsetY` das Dreieck ($K_1=(0,0)$, $K_2=(4,0)$, $K_3=(2,2)$) verzerrungsfrei zentrieren.
2. **Euklidische Stablängen & Mittelpunkts-Beschriftung (`TrussGeometry.cs` / `MainWindow.xaml.cs`):**
   - Berechnen Sie für jeden Stab `bar` die exakte euklidische Länge in Weltkoordinaten (Metern):
     $$L = \sqrt{(X_B - X_A)^2 + (Y_B - Y_A)^2}$$
   - Platzieren Sie in `Redraw()` am Bildschirm-Mittelpunkt $\vec{p}_{\text{mid}} = \frac{1}{2}(\vec{p}_A + \vec{p}_B)$ jedes Stabes ein gut lesbares `TextBlock`-Label mit der aktuellen Stablänge (z. B. `"2.83 m"` in Gelb/Cyan).
3. **Vertikale DIN-406-Bemaßungskette (`VectorArrow.cs`):**
   - In `VectorArrow.cs` ist bereits `AddHorizontalDimensionLine(...)` für die horizontale Gesamtlänge implementiert.
   - Implementieren Sie analog dazu die Methode `public static void AddVerticalDimensionLine(Canvas canvas, Point pBottom, Point pTop, double xScreen, string dimensionText, Brush? strokeColor = null)` mit waagerechten gestrichelten Maßhilfslinien, senkrechter Maßlinie, oberen/unteren Maßpfeilen (`Polygon`) und mittig platziertem Maßtext.
   - Rufen Sie diese Methode in `Redraw()` auf, um die Gesamthöhe $(y_{\max} - y_{\min})$ links neben dem Tragwerk (`xScreen = pLeft.X - 35.0`) normgerecht zu bemaßen.
4. **Fix des Bounding-Box-Jitterings beim Maus-Dragging & Millimeter-Auflösung (`MainWindow.xaml.cs`):**
   - **Beobachten Sie den Bug:** Wenn Sie aktuell den oberen Knoten $K_3$ oder einen Randknoten mit der Maus nach außen ziehen (`TrussCanvas_MouseMove`), ruft `Redraw()` in jedem Frame `_truss.GetBounds()` und `_transform.Update(...)` neu auf. Dadurch skaliert und verschiebt sich das Koordinatensystem *während des Ziehens* unter dem Mauszeiger weg!
   - **Ihre Lösung:** Aktualisieren Sie `_transform.Update(...)` in `Redraw()` **nur dann**, wenn gerade **kein** Knoten gezogen wird (`if (_draggedNode == null)`). Erst beim Loslassen der Maustaste (`TrussCanvas_MouseUp`) darf das Auto-Fit auf die neue Bounding Box nachgeführt werden!
   - Erhöhen Sie zudem die Koordinaten-Rundung in `TrussCanvas_MouseMove` von Zentimetern auf **Millimeter-Auflösung (`Math.Round(worldX, 3)` und `:F3`)**.

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
│  2D-CAD Fachwerkträger-Editor   │                 │   Space Radar & Navigation ODER │
│  mit DIN 406, Zoom/Pan & JSON   │                 │   Bridge Blueprint Sketcher     │
└─────────────────────────────────┘                 └─────────────────────────────────┘
```

---

### Track A (Industrie): Interaktiver 2D-CAD Fachwerkträger-Editor

#### Industrielles Szenario:
In der Tragwerksplanung werden Brücken- und Hallenträger als Vektor-Topologien modelliert. Aufbauend auf dem in `VectorTrussCanvas` vorhandenen Pratt-Träger (`CreateIndustrialPrattTruss()`) entwickeln Sie einen vollwertigen interaktiven 2D-CAD-Editor mit zweistufiger DIN-406-Bemaßung, Kamera-Zoom/Pan und JSON-Persistenz, der in Einheit 07 direkt mit dem FEM-Cholesky-Löser gekoppelt wird.

#### Funktionsumfang & Anforderungen:
1. **Erweiterte Tragwerks-Topologie (3. Modell in `TrussGeometry.cs`):**
   - Ergänzen Sie neben dem Dreieck und dem Pratt-Träger ein drittes, eigenes industrielles Tragwerksmodell `CreateCantileverCraneTruss()` (z. B. asymmetrischer Hallen-Auslegerkran oder Satteldachbinder mit **mindestens 10 Knoten und 17 Stäben**) und machen Sie es in der ComboBox `CmbModelSelection` auswählbar.
2. **Zweistufige normgerechte DIN-406-Bemaßungsketten:**
   - **Stufe 1 (Innere horizontale Maßkette bei `dimY = +30 px`):** Automatische Einzel-Teilbemaßung aller benachbarten Untergurt-Abschnitte (z. B. `4.00 m | 4.00 m | 4.00 m`).
   - **Stufe 2 (Äußere horizontale Maßkette bei `dimY = +60 px`):** Gesamtlängenbemaßung über die gesamte Spannweite (z. B. `12.00 m`).
   - **Vertikale Maßkette (links bei `dimX = -40 px`):** Gesamthöhe des Trägers sowie (falls vorhanden) Zwischenhöhen.
3. **Interaktiver Lastvektor-Editor & Kamera-Steuerung (Zoom & Pan):**
   - Erlauben Sie per Klick auf einen Knoten (oder über Seitenleisten-Steuerelemente / Rechtsklick) das dynamische Ändern von Kraftkomponenten $(F_x, F_y)$ in $\text{kN}$: Die Pfeilrichtung ($\operatorname{atan2}$) und Pfeillänge passen sich sofort live an, während die Pfeilspitze exakt ihre feste Pixelgröße ($14\,\text{px}$) behält!
   - Implementieren Sie stufenlosen **Mausrad-Zoom (`MouseWheel`)** und **Kamera-Panning (Rechte/Mittlere Maustaste ziehen)** über einen Zoomfaktor und Kamera-Offset in `Transform2D` (oder `MatrixTransform` gemäß Abschnitt 3.4 der Vorlesung).
4. **Performance-Optimierung & JSON-Import/Export:**
   - Stellen Sie sicher, dass Brushes statisch eingefroren (`Freeze()`) oder wiederverwendet werden, um unnötige GC-Allokationen beim Dragging zu vermeiden.
   - Fügen Sie zwei Buttons **„JSON Speichern“** und **„JSON Laden“** (`System.Text.Json`) hinzu, mit denen das aktuell bearbeitete Tragwerk (Knoten, Stäbe, Lager, Lasten) als `.json`-Datei exportiert und wieder eingeladen werden kann.

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
