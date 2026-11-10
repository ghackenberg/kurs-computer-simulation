# Aufgabenblatt 03: Vektorgrafik, WPF Canvas & Koordinatentransformation

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** B.Sc. Automatisierungstechnik, 5. Semester  
**Institution:** Fachhochschule Oberösterreich – Campus Wels  
**Bearbeitungsform:** Zweistufige Hausübung im festen 2er-Team (1 Woche):
- **Stufe 1 (Basisaufgabe):** Gemeinsames Fundament auf der C#-Vorlage (Richtwert ca. 60 Min. zu Hause)
- **Stufe 2 (Vertiefungsaufgabe / Track-Ausbau):** Wahlmodell Track A (Industrie) **ODER** Track B (Simulation Game) (Richtwert ca. 3–4 h zu Hause)
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

### 3. Stufe 1: Basisaufgabe (Gemeinsames Fundament auf der C#-Vorlage, Richtwert ca. 60 Min.)

**Basis-Projekt:** Öffnen Sie die bereitgestellte Projektvorlage `Vorlage/VectorTrussCanvas.sln` (`Transform2D.cs`, `VectorArrow.cs`, `TrussGeometry.cs`, `MainWindow.xaml.cs`).  
Die Vorlage enthält bereits die Basisklasse `Transform2D`, das Dreieckstragwerk `CreateStage1Triangle()` sowie die Pfeilspitzen-Methode `VectorArrow.AddForceArrow` und die horizontale Gesamtmaßkette `AddHorizontalDimensionLine`.  
**Ziel der Basisaufgabe (Stufe 1):** Analysieren Sie die Welt-zu-Bildschirm-Transformation, beheben Sie das Koordinaten-Jittering beim Drag-and-Drop und erweitern Sie den Viewer um Live-Stablängen und eine vertikale DIN-406-Höhenbemaßung (als direktes Fundament für Stufe 2 Track A und Track B!).

### Aufgabenstellung (auf Basis von `Vorlage/VectorTrussCanvas.sln`):
1. **Aufgabe 1.1 – Code-Walkthrough & Seitenverhältnis-Test (`Transform2D.cs`):**
   - Starten Sie `VectorTrussCanvas` und führen Sie die bestehenden Unit-Tests (`dotnet test`) aus.
   - Ziehen Sie das Anwendungsfenster extrem schmal und extrem breit: Prüfen Sie, wie `s = Math.Min(sx, sy)` und die Zentrierungs-Offsets `OffsetX`, `OffsetY` das Dreieck ($K_1=(0,0)$, $K_2=(4,0)$, $K_3=(2,2)$) verzerrungsfrei zentrieren.
2. **Aufgabe 1.2 – Euklidische Stablängen & Mittelpunkts-Beschriftung (`TrussGeometry.cs` / `MainWindow.xaml.cs`):**
   - Berechnen Sie für jeden Stab `bar` die exakte euklidische Länge in Weltkoordinaten (Metern):
     $$L = \sqrt{(X_B - X_A)^2 + (Y_B - Y_A)^2}$$
   - Platzieren Sie in `Redraw()` am Bildschirm-Mittelpunkt $\vec{p}_{\text{mid}} = \frac{1}{2}(\vec{p}_A + \vec{p}_B)$ jedes Stabes ein gut lesbares `TextBlock`-Label mit der aktuellen Stablänge (z. B. `"2.83 m"` in Gelb/Cyan).
3. **Aufgabe 1.3 – Vertikale DIN-406-Bemaßungskette (`VectorArrow.cs`):**
   - In `VectorArrow.cs` ist bereits `AddHorizontalDimensionLine(...)` für die horizontale Gesamtlänge implementiert.
   - Implementieren Sie analog dazu die Methode `public static void AddVerticalDimensionLine(Canvas canvas, Point pBottom, Point pTop, double xScreen, string dimensionText, Brush? strokeColor = null)` mit waagerechten gestrichelten Maßhilfslinien, senkrechter Maßlinie, oberen/unteren Maßpfeilen (`Polygon`) und mittig platziertem Maßtext.
   - Rufen Sie diese Methode in `Redraw()` auf, um die Gesamthöhe $(y_{\max} - y_{\min})$ links neben dem Tragwerk (`xScreen = pLeft.X - 35.0`) normgerecht zu bemaßen.
4. **Aufgabe 1.4 – Fix des Bounding-Box-Jitterings beim Maus-Dragging & Millimeter-Auflösung (`MainWindow.xaml.cs`):**
   - **Beobachten Sie den Bug:** Wenn Sie aktuell den oberen Knoten $K_3$ oder einen Randknoten mit der Maus nach außen ziehen (`TrussCanvas_MouseMove`), ruft `Redraw()` in jedem Frame `_truss.GetBounds()` und `_transform.Update(...)` neu auf. Dadurch skaliert und verschiebt sich das Koordinatensystem *während des Ziehens* unter dem Mauszeiger weg!
   - **Ihre Lösung:** Aktualisieren Sie `_transform.Update(...)` in `Redraw()` **nur dann**, wenn gerade **kein** Knoten gezogen wird (`if (_draggedNode == null)`). Erst beim Loslassen der Maustaste (`TrussCanvas_MouseUp`) darf das Auto-Fit auf die neue Bounding Box nachgeführt werden!
   - Erhöhen Sie zudem die Koordinaten-Rundung in `TrussCanvas_MouseMove` von Zentimetern auf **Millimeter-Auflösung (`Math.Round(worldX, 3)` und `:F3`)**.

---

## 4. Stufe 2: Vertiefungsaufgabe / Track-Ausbau (Wahlmodell: Track A ODER Track B)

> [!IMPORTANT]
> **Wahlmodell – GENAU EINE Aufgabe (keine Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **entweder Track A (Industrie)** ODER **Track B (Simulation Game)**.  
> Beide Tracks bauen direkt auf Ihrem Ergebnis aus Stufe 1 (`VectorTrussCanvas.sln`) auf, haben exakt denselben Umfang (4 Arbeitspakete) und führen zur Höchstpunktzahl (10 Punkte).

```
                    ┌──────────────────────────────────────────────┐
                    │ WÄHLEN SIE GENAU EINEN DER BEIDEN TRACKS:    │
                    └──────────────────────┬───────────────────────┘
                                           │
                 ┌─────────────────────────┴─────────────────────────┐
                 ▼                                                   ▼
┌─────────────────────────────────┐                 ┌─────────────────────────────────┐
│  Track A: Industrie & CAD       │                 │  Track B: Simulation Game       │
│  2D-CAD Tragwerks-Inspektor mit │                 │  Poly Bridge Blueprint-         │
│  DIN 406, Last-Editor & Zoom    │                 │  Baumeister (Snap, Budget, JSON)│
└─────────────────────────────────┘                 └─────────────────────────────────┘
```

---

### Track A (Industrie): Interaktiver 2D-CAD Tragwerks-Inspektor & Last-Editor

#### Industrielles Szenario:
In der Tragwerksplanung werden Brücken- und Hallenträger als normgerechte 2D-Vektorzeichnungen geprüft und belastet. Aufbauend auf Ihrer Lösung aus Stufe 1 (`VectorTrussCanvas`) entwickeln Sie einen interaktiven 2D-CAD-Inspektor mit zweistufiger DIN-406-Bemaßung, direkt greifbaren Kraftvektor-Spitzen, Kamera-Zoom/Pan und JSON-Persistenz, der in Einheit 07 direkt mit dem FEM-Cholesky-Löser gekoppelt wird.

#### Funktionsumfang & Anforderungen (4 Arbeitspakete):
1. **Arbeitspaket A.1 – Erweiterte Tragwerks-Topologie & Hintergrund-Koordinatengitter (`TrussGeometry.cs` / `MainWindow.xaml.cs`):**
   - Ergänzen Sie neben dem Dreieck und dem Pratt-Träger ein drittes industrielles Modell `CreateCantileverCraneTruss()` (asymmetrischer Hallen-Auslegerkran oder Satteldachbinder mit **mindestens 10 Knoten**) und binden Sie es in die ComboBox `CmbModelSelection` ein.
   - Zeichnen Sie in `Redraw()` als unterste Ebene ein dezentes, maßstabsgetreues $1{,}0\,\text{m}$-Hintergrundgitter (`Line` mit dunklem Grau).
2. **Arbeitspaket A.2 – Zweistufige normgerechte DIN-406-Bemaßungsketten (`VectorArrow.cs` / `MainWindow.xaml.cs`):**
   - **Ebene 1 (Innere horizontale Maßkette bei `dimY = +30 px`):** Automatische Einzel-Teilbemaßung aller benachbarten Untergurt-Abschnitte (z. B. `4.00 m | 4.00 m | 4.00 m`).
   - **Ebene 2 (Äußere horizontale Maßkette bei `dimY = +60 px`):** Gesamtlängenbemaßung über die gesamte Spannweite (z. B. `12.00 m`).
3. **Arbeitspaket A.3 – Interaktiver Lastvektor-Editor (Pfeilspitzen-Dragging) & Kamera-Steuerung (Zoom & Pan):**
   - Machen Sie die Pfeilspitzen der angreifenden Kräfte (`TrussLoad`) per Maus greifbar: Zieht man die Spitze eines Kraftpfeils mit der Maus, werden $(F_x, F_y)$ in $\text{kN}$ live aus dem Differenzvektor zum Angriffsknoten aktualisiert; die Pfeilrichtung ($\operatorname{atan2}$) und Pfeillänge passen sich sofort an, während die Pfeilspitze exakt ihre feste Pixelgröße ($14\,\text{px}$) behält!
   - Implementieren Sie stufenlosen **Mausrad-Zoom (`MouseWheel`)** und **Kamera-Panning (Rechte/Mittlere Maustaste ziehen)** über einen Zoomfaktor und Kamera-Offset in `Transform2D`.
4. **Arbeitspaket A.4 – JSON-Import/Export & Freeze-Optimierung (`System.Text.Json`):**
   - Frieren Sie statisch verwendete `SolidColorBrush`-Instanzen ein (`Freeze()`), um GC-Allokationen beim Dragging zu minimieren.
   - Fügen Sie zwei Buttons **„JSON Speichern“** und **„JSON Laden“** hinzu, mit denen das aktuelle Tragwerk (Knoten, Stäbe, Lager, Lasten) als `.json`-Datei exportiert und wieder eingeladen werden kann.

---

### Track B (Simulation Game): „Poly Bridge“ Blueprint-Baumeister

#### Gaming-Szenario:
Im Konstruktionsmodus von Physik-Brückenbauspielen (*Poly Bridge*, *Bridge Constructor*) entwirft der Spieler eine frei tragende Fachwerkbrücke über eine tiefe Schlucht unter strikten Material- und Budgetvorgaben. Aufbauend auf Ihrer Lösung aus Stufe 1 (`VectorTrussCanvas`) entwickeln Sie ein interaktives Brückenbau-Zeichenbrett mit Grid-Snapping, Längengrenzen-Vorschau, Live-Baubudget und JSON-Level-Export für den LKW-Belastungstest in Einheit 07.

#### Funktionsumfang & Anforderungen (4 Arbeitspakete):
1. **Arbeitspaket B.1 – Schlucht-Szenerie & $0{,}5\,\text{m}$-Konstruktionsraster mit Grid-Snapping (`TrussGeometry.cs` / `MainWindow.xaml.cs`):**
   - Ergänzen Sie in `TrussGeometry.cs` eine Start-Szene `CreateCanyonBlueprintLevel()` (Spannweite $12{,}0\,\text{m}$ mit einem Festlager am linken Felsrand $(0,0)$ und einem Loselager am rechten Felsrand $(12,0)$) und zeichnen Sie in `Redraw()` die beiden Felswände sowie den Fluss/Abgrund als farbige `Polygon`-Flächen ein.
   - Zeichnen Sie im Baufenster ein Konstruktionsraster (Gitterweite $0{,}5\,\text{m}$) und runden Sie alle Maus-Weltkoordinaten beim Setzen und Verschieben von Knoten exakt auf dieses $0{,}5\,\text{m}$-Gitter (`Math.Round(val * 2.0) / 2.0`).
2. **Arbeitspaket B.2 – Stab-Vorschau mit Maximallängen-Prüfung ($L_{\max}$) & Live-Baubudget-HUD:**
   - Während der Spieler mit der Maus von einem Startknoten zu einem Zielpunkt zieht, wird eine gestrichelte **Vorschau-Linie** mit Live-Längenangabe gezeichnet: Ist die Länge $L \le 4{,}00\,\text{m}$, leuchtet die Vorschau **grün** (gültig); überschreitet sie $L_{\max} = 4{,}00\,\text{m}$, färbt sie sich **rot** und der Stab kann nicht gebaut werden!
   - Berechnen Sie in `Redraw()` laufend die Gesamtbaukosten der Brücke ($\text{Kosten} = \sum L_i \cdot 1\,000\,\text{EUR/m}$ bei einem Maximalbudget von z. B. $35\,000\,\text{EUR}$) und stellen Sie die Auslastung als farbigen Budget-Fortschrittsbalken mit Prozent- und Euro-Anzeige im HUD dar.
3. **Arbeitspaket B.3 – Interaktives Konstruieren (Knoten setzen, Stäbe spannen & Elemente löschen):**
   - **Knoten setzen & verschieben:** Ein Klick ins freie $0{,}5\,\text{m}$-Raster legt einen neuen Knoten an; bestehende Knoten lassen sich (wie in Stufe 1) per Drag-and-Drop verschieben.
   - **Stäbe spannen & löschen:** Ziehen von Knoten A zu Knoten B (oder Klick-Klick im Baumodus) erzeugt bei $L \le 4{,}00\,\text{m}$ und ausreichendem Budget einen neuen `TrussBar` (keine doppelten Stäbe!). Ein Rechtsklick oder die Taste `Entf` auf einen Knoten/Stab löscht das Element samt angrenzender Stäbe (die beiden Felswand-Auflagerknoten sind unlöschbar).
4. **Arbeitspaket B.4 – JSON-Level-Import/Export & Freeze-Optimierung (`System.Text.Json`):**
   - Frieren Sie statisch verwendete `SolidColorBrush`-Instanzen ein (`Freeze()`), um GC-Allokationen beim Zeichnen zu minimieren.
   - Fügen Sie zwei Buttons **„JSON Speichern“** und **„JSON Laden“** hinzu, mit denen der konstruierte Brücken-Entwurf (Knoten, Stäbe, Lager, Lasten) als `.json`-Datei für den LKW-Überfahrt-Test in Einheit 07 gespeichert und geladen werden kann.

---

## 5. Akzeptanzkriterien & Bewertungsrubrik (10 Punkte)

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **Mathematische Transformation & Auto-Fit (Stufe 1 & 2)** | 2 P. | Isotropes $s = \min(s_x, s_y)$, korrekte $Y$-Inversion, BoundingBox-Zentrierung ohne Jittering beim Drag-and-Drop. |
| **Vektorpfeile, Stablängen & Vertikalbemaßung (Stufe 1)** | 2 P. | Exakt rotierte Pfeilspitzen (`Polygon`) mit fixer Pixelgröße, euklidische Stablängen-Labels und vertikale DIN-406-Höhenmaßkette. |
| **Track-Spezialisierung Geometrie (Arbeitspaket A.1/A.2 bzw. B.1/B.2)** | 2 P. | **Track A:** Neues Kran-/Dachbindermodell + zweistufige horizontale DIN-406-Bemaßungskette.<br>**Track B:** Schlucht-Polygon-Szene mit $0{,}5\,\text{m}$-Grid-Snapping + $L_{\max}$-Vorschau & Live-Baubudget-Balken. |
| **Track-Spezialisierung Interaktion (Arbeitspaket A.3 bzw. B.3)** | 2 P. | **Track A:** Interaktives Ziehen/Drehen der Lastpfeilspitzen $(F_x, F_y)$ + Mausrad-Zoom & Kamera-Pan.<br>**Track B:** Interaktives Knoten-Setzen, Stäbe-Spannen ($L \le 4\,\text{m}$) und Löschen (`Entf`/Rechtsklick). |
| **JSON-Persistenz, Freeze & Code-Qualität (Arbeitspaket A.4 bzw. B.4)** | 2 P. | Funktionierender JSON-Export/Import (`System.Text.Json`), eingefrorene Brushes (`Freeze()`) und kurze `README.md`. |
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
Erweitere die bestehende WPF-C#-Vorlage VectorTrussCanvas (Transform2D.cs, VectorArrow.cs, TrussGeometry.cs, MainWindow.xaml.cs).
Behalte die isotrope Welt-zu-Bildschirm-Transformation (s = Min(sx, sy), Y nach oben positiv) und die geschlossenen Polygon-Pfeilspitzen (14 px feste Spitzenlänge, 15 Grad Spreizwinkel über atan2) bei.
Implementiere für Track A die zweistufige DIN-406-Untergurtbemaßung, das Ziehen der Kraftpfeilspitzen und den Mausrad-Zoom bzw. für Track B das 0.5m-Grid-Snapping, die Stab-Vorschau mit Maximallänge L_max = 4.0m, die Live-Baubudget-Berechnung und das Löschen per Entf/Rechtsklick.
Ergänze zudem den JSON-Import/Export mit System.Text.Json und binde KEINE FEM- oder Statikbibliotheken ein.
```

---

## 8. 🔍 Leitfragen für den Live-Showcase & Code-Defense (Säule 2b)

1. **Seitenverhältnis-Stresstest:**  
   *„Ziehen Sie das Anwendungsfenster am Rand ganz schmal und breit: Behalten die Träger-Dreiecke, Bemaßungen und das Konstruktionsraster ihre exakten Winkel und Proportionen, ohne zu verzerren?“*
2. **Pfeilspitzen-Invarianz & Längengrenzen:**  
   *„Behält in Track A die Pfeilspitze beim Ziehen der Kraft konstant ihre 14 Pixel Kantenlänge? Färbt sich in Track B die Vorschau-Linie ab exakt $L > 4{,}00\,\text{m}$ rot und blockiert den Bau?“*
3. **Kausalitäts- und Vorgreif-Check:**  
   *„Wurde die Vorgreif-Sperre strikt eingehalten (kein vorzeitiges Lösen von Gleichungssystemen oder FEM-Rechnungen vor T07)? Konzentriert sich die Architektur rein auf saubere Vektordarstellung, Transformation und Interaktion?“*
4. **Performance beim Drag-and-Drop:**  
   *„Werden Brushes/Pens vorab eingefroren (`Freeze()`) und bleibt das Koordinatensystem während des Ziehens eines Knotens ruhig, ohne unter dem Mauszeiger wegzuspringen?“*
