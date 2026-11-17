# Aufgabenblatt 03: Vektorgrafik, WPF Canvas & Koordinatentransformation

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** B.Sc. Automatisierungstechnik, 5. Semester  
**Institution:** Fachhochschule Oberösterreich – Campus Wels  
**Bearbeitungsform:** Zweistufige Hausübung im 2er-Team (1 Woche)

| Stufe | Richtwert | Thema / Inhalt |
| :--- | :--- | :--- |
| **Stufe 1 (Basisaufgabe)** | ca. 60 Min. | `Transform2D`, `TrussGeometry`, DIN-406-Bemaßung & Jitter-Fix auf `VectorTrussCanvas.sln` (`1.1`–`1.4`) |
| **Stufe 2 – Track A (Industrie)** | ca. 3–4 h *(Wahl)* | Interaktiver 2D-CAD Tragwerks-Inspektor & Last-Editor |
| **Stufe 2 – Track B (Simulation Game)** | ca. 3–4 h *(Wahl)* | „Poly Bridge“ Blueprint-Baumeister |

> [!IMPORTANT]
> **Technische Rahmenbedingungen**
> - **Plattform & Projekt:** C# 12 / .NET 8 oder .NET 10, bereitgestellte WPF-Projektmappe (ohne zusätzliche NuGet-Pakete)
> - **Zugelassene APIs:** `System.Windows.Controls.Canvas`, 2D-Vektorprimitive (`Line`, `Path`, `Polygon`, `Ellipse`), `DrawingVisual`
> - **Abgrenzung:** Reiner Fokus auf 2D-Vektorgeometrie, Transformation und Interaktion — ohne mechanische Statik- oder Gleichungslöser  
> Zudem gilt: **KEIN** ScottPlot, **KEIN** SharpGL 3D, **KEIN** Multithreading!


## 1. Lernziele (Intended Learning Outcomes - ILOs)

Nach erfolgreicher Bearbeitung dieses Aufgabenblattes können Sie:
1. **Affine Welt-zu-Bildschirm-Transformation:** Ingenieurtechnische Weltkoordinaten in Metern mathematisch exakt, verzerrungsfrei (isotropes Seitenverhältnis) und mit Achseninversion ($Y$ positiv nach oben) auf Bildschirm-Pixel abbilden.
2. **Dynamische BoundingBox & Auto-Fit:** Die minimale Hüllbox (Bounding Box) beliebiger 2D-Geometrien berechnen und das Modell mit konfigurierbarem Randabstand (Margin) responsiv im Fenster zentrieren.
3. **Vektorielle Pfeilspitzendynamik:** Aus Richtungsvektoren und Einheitsnormalen geschlossene Pfeilspitzen (`Polygon`) mit definierter Spitzenlänge und konstantem Spreizwinkel analytisch rotieren.
4. **Normgerechte Bemaßungsketten (DIN 406):** Technische Maßhilfslinien, Maßlinien mit Pfeilen und zentrierte Maßbeschriftungen vektorbasiert generieren.
5. **Flüssige Canvas-Interaktivität:** Geometrieknoten per Mouse-Drag-and-Drop in Echtzeit verschieben, ohne Render-Artefakte oder Speicherlecks zu erzeugen.


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
2. **Gesamte Zentrierungs-Offsets vom Fensterrand (`OffsetX`, `OffsetY` in `Transform2D.cs`):**
   $$x_{\text{off}} = \text{margin}_x + \frac{(w_{\text{canvas}} - 2 \cdot \text{margin}_x) - (x_{\max} - x_{\min}) \cdot s}{2} = \frac{w_{\text{canvas}} - (x_{\max} - x_{\min}) \cdot s}{2}$$
   $$y_{\text{off}} = \text{margin}_y + \frac{(h_{\text{canvas}} - 2 \cdot \text{margin}_y) - (y_{\max} - y_{\min}) \cdot s}{2} = \frac{h_{\text{canvas}} - (y_{\max} - y_{\min}) \cdot s}{2}$$
3. **Vorwärts- & Rücktransformation (`WorldToScreen` $\leftrightarrow$ `ScreenToWorld`):**
   $$x_{\text{screen}} = x_{\text{off}} + (x_{\text{w}} - x_{\min}) \cdot s, \quad y_{\text{screen}} = y_{\text{off}} + (y_{\max} - y_{\text{w}}) \cdot s$$
   $$x_{\text{w}} = x_{\min} + \frac{x_{\text{screen}} - x_{\text{off}}}{s}, \quad y_{\text{w}} = y_{\max} - \frac{y_{\text{screen}} - y_{\text{off}}}{s}$$

### 2.2 Analytische Pfeilspitzenberechnung
Für einen Kraft- oder Geschwindigkeitsvektor $\vec{F} = [F_x, F_y]^\top$ in Weltkoordinaten ($Y$ nach oben positiv) ergibt sich wegen der nach unten gerichteten Screen-$Y$-Achse des WPF-Canvas vom Angriffspunkt $\vec{p}_{\text{start}}$ zur Pfeilspitze $\vec{p}_{\text{tip}}$ der normierte Screen-Richtungsvektor $\vec{u} = [u_x, u_y]^\top = \frac{\vec{p}_{\text{tip}} - \vec{p}_{\text{start}}}{\|\vec{p}_{\text{tip}} - \vec{p}_{\text{start}}\|} = \frac{1}{\|\vec{F}\|}[F_x, -F_y]^\top$ (wie in `VectorArrow.cs`). Der Richtungswinkel im Screen Space lautet damit:
$$\phi_{\text{screen}} = \operatorname{atan2}(-F_y, F_x) = \operatorname{atan2}(u_y, u_x)$$
Die beiden Flügelpunkte $\vec{p}_{\text{left}}$ und $\vec{p}_{\text{right}}$ einer geschlossenen Pfeilspitze mit fester Pixel-Länge $L_{\text{tip}}$ und Halbwinkel $\beta$ (typisch $15^\circ \approx 0{,}26\,\text{rad}$) werden über Drehmatrizen im Screen Space relativ zur Spitze $\vec{p}_{\text{tip}}$ berechnet:
$$\vec{p}_{\text{left}} = \vec{p}_{\text{tip}} - L_{\text{tip}} \begin{bmatrix} \cos(\phi_{\text{screen}} - \beta) \\ \sin(\phi_{\text{screen}} - \beta) \end{bmatrix}, \quad \vec{p}_{\text{right}} = \vec{p}_{\text{tip}} - L_{\text{tip}} \begin{bmatrix} \cos(\phi_{\text{screen}} + \beta) \\ \sin(\phi_{\text{screen}} + \beta) \end{bmatrix}$$


## 3. Stufe 1: Basisaufgabe (Gemeinsames Fundament auf der C#-Vorlage, Richtwert ca. 60 Min.)

**Basis-Projekt:** Öffnen Sie die bereitgestellte Projektvorlage `Vorlage/VectorTrussCanvas.sln` (`Transform2D.cs`, `VectorArrow.cs`, `TrussGeometry.cs`, `MainWindow.xaml.cs`).  
Die Vorlage enthält bereits die Basisklasse `Transform2D`, das Dreieckstragwerk `CreateStage1Triangle()` sowie die Pfeilspitzen-Methode `VectorArrow.AddForceArrow` und die horizontale Gesamtmaßkette `AddHorizontalDimensionLine`.  
**Ziel der Basisaufgabe (Stufe 1):** Analysieren Sie die Welt-zu-Bildschirm-Transformation, beheben Sie das Koordinaten-Jittering beim Drag-and-Drop und erweitern Sie den Viewer um Live-Stablängen und eine vertikale DIN-406-Höhenbemaßung (als direktes Fundament für Stufe 2 Track A und Track B!).

### Aufgabenstellung (auf Basis von `Vorlage/VectorTrussCanvas.sln`):
**Vorbereitung – Starter-Kit untersuchen (`Vorlage/VectorTrussCanvas.sln`):**
- Öffnen Sie `Vorlage/VectorTrussCanvas.sln` und sichten Sie das Zusammenspiel aus `Transform2D.cs`, `VectorArrow.cs`, `TrussGeometry.cs` und `MainWindow.xaml.cs`.

1. **Aufgabe 1.1 – Code-Walkthrough & Seitenverhältnis-Test (`Transform2D.cs`):**
   - Starten Sie `VectorTrussCanvas` und führen Sie die bestehenden Unit-Tests (`dotnet test`) aus.
   - Ziehen Sie das Anwendungsfenster extrem schmal und extrem breit: Prüfen Sie, wie `Scale = Math.Min(sx, sy)` und die Zentrierungs-Offsets `OffsetX`, `OffsetY` das Dreieck ($K_1=(0,0)$, $K_2=(4,0)$, $K_3=(2,2)$) verzerrungsfrei zentrieren.
   - *Selbsttest-Referenzwerte (Golden Reference Numbers):* Für das Start-Dreieck ($[x_{\min}, x_{\max}] = [0, 4]\,\text{m}$, $[y_{\min}, y_{\max}] = [0, 2]\,\text{m}$) auf einem $800 \times 500\,\text{px}$ großen Canvas mit `MarginX = MarginY = 70.0` (wie in `MainWindow.Redraw()`) ergeben sich exakt $s_x = \frac{660}{4} = 165{,}0\,\text{px/m}$, $s_y = \frac{360}{2} = 180{,}0\,\text{px/m} \implies s = 165{,}0\,\text{px/m}$, `OffsetX` $= 70{,}0\,\text{px}$, `OffsetY` $= 85{,}0\,\text{px}$ sowie die Bildschirmpunkte $K_1 \mapsto (70{,}0;\; 415{,}0)\,\text{px}$, $K_2 \mapsto (730{,}0;\; 415{,}0)\,\text{px}$ und $K_3 \mapsto (400{,}0;\; 85{,}0)\,\text{px}$.
2. **Aufgabe 1.2 – Euklidische Stablängen & Mittelpunkts-Beschriftung (`TrussGeometry.cs` / `MainWindow.xaml.cs`):**
   - Ergänzen Sie in `TrussGeometry.cs` die Methode `public double GetBarLength(TrussBar bar)`, welche für jeden Stab `bar` die exakte euklidische Länge in Weltkoordinaten (Metern) berechnet:
     $$L = \sqrt{(X_B - X_A)^2 + (Y_B - Y_A)^2}$$
   - Platzieren Sie in `Redraw()` am Bildschirm-Mittelpunkt $\vec{p}_{\text{mid}} = \frac{1}{2}(\vec{p}_A + \vec{p}_B)$ jedes Stabes ein gut lesbares `TextBlock`-Label mit der aktuellen Stablänge (`$"{length:F2} m"` in Gelb/Cyan).
   - *5-Sekunden-Selbsttest:* Beim Start-Dreieck zeigt der Untergurt exakt `"4.00 m"` und beide schrägen Streben $\sqrt{2^2 + 2^2} = \sqrt{8} \approx 2{,}8284\,\text{m}$ (`"2.83 m"`). Schalten Sie in der ComboBox auf den Pratt-Träger um: Dort müssen Gurte `"4.00 m"`, Vertikalpfosten `"2.50 m"` und Diagonalen $\sqrt{4{,}0^2 + 2{,}5^2} = \sqrt{22{,}25} \approx 4{,}7170\,\text{m}$ (`"4.72 m"`) anzeigen!
3. **Aufgabe 1.3 – Vertikale DIN-406-Bemaßungskette (`VectorArrow.cs`):**
   - In `VectorArrow.cs` ist bereits `AddHorizontalDimensionLine(...)` für die horizontale Gesamtlänge implementiert.
   - Implementieren Sie analog dazu die Methode `public static void AddVerticalDimensionLine(Canvas canvas, Point pBottom, Point pTop, double xScreen, string dimensionText, Brush? strokeColor = null)` mit waagerechten gestrichelten Maßhilfslinien, senkrechter Maßlinie, oberen/unteren Maßpfeilen (`Polygon`) und mittig platziertem Maßtext. *(Konventions-Hinweis: Wegen der nach unten wachsenden Canvas-$Y$-Achse gilt `pTop.Y < pBottom.Y` – die obere Pfeilspitze bei `pTop.Y` zeigt nach `-Y`, ihre Flügelbasis liegt also bei `pTop.Y + arrowLen`; die untere Spitze bei `pBottom.Y` zeigt nach `+Y` mit Flügelbasis bei `pBottom.Y - arrowLen`!)*
   - Rufen Sie diese Methode in `Redraw()` auf, um die Gesamthöhe $(y_{\max} - y_{\min})$ links neben dem Tragwerk (`xScreen = pLeft.X - 35.0`) normgerecht zu bemaßen (*Selbsttest-Kontrollwert:* `"2.00 m"` beim Start-Dreieck bzw. `"2.50 m"` beim Pratt-Träger; bei $800 \times 500\,\text{px}$ verläuft die Maßlinie bei `xScreen = 35.0 px` von $y_s = 85{,}0\,\text{px}$ bis $415{,}0\,\text{px}$).
4. **Aufgabe 1.4 – Fix des Bounding-Box-Jitterings, Millimeter-Auflösung & Unit-Tests (`MainWindow.xaml.cs` & `VectorTrussCanvas.Tests`):**
   - **Beobachten Sie den Bug:** Wenn Sie aktuell den oberen Knoten $K_3$ oder einen Randknoten mit der Maus nach außen ziehen (`TrussCanvas_MouseMove`), ruft `Redraw()` in jedem Frame `_transform.Update(...)` neu auf. Dadurch skaliert und verschiebt sich das Koordinatensystem *während des Ziehens* unter dem Mauszeiger weg!
   - **Ihre Lösung:** Berechnen Sie `var (xMin, xMax, yMin, yMax) = _truss.GetBounds();` weiterhin für die Live-Maßketten, rufen Sie `_transform.Update(...)` in `Redraw()` aber **nur dann** auf, wenn gerade **kein** Knoten gezogen wird (`if (_draggedNode == null)`). Erst beim Loslassen der Maustaste (`TrussCanvas_MouseUp`) darf das Auto-Fit auf die neue Bounding Box nachgeführt werden! Erhöhen Sie zudem die Koordinaten-Rundung in `TrussCanvas_MouseMove` von Zentimetern auf **Millimeter-Auflösung (`Math.Round(worldX, 3)` und `:F3`)**.
   - **Automatisierte Unit-Test-Verifikation:** Öffnen Sie im Testprojekt `VectorTrussCanvas.Tests/GeometryTests.cs` die Methode `Test_Stage1_GoldenReference_And_BarLengths()`, kommentieren Sie dort den vorbereiteten `TODO [Stufe 1 - Aufgabe 1.4]`-Testblock für `GetBarLength(...)` ein und führen Sie im Vorlagenordner `dotnet test` aus, bis alle **5 Unit-Tests** in `VectorTrussCanvas.Tests` grün durchlaufen!


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
   - Implementieren Sie stufenlosen **Mausrad-Zoom (`MouseWheel`)** und **Kamera-Panning (Rechte/Mittlere Maustaste ziehen)** wahlweise über eine `MatrixTransform` am Canvas (`ScaleAt` / `Translate` samt Matrix-Inversion beim Picking wie in der Vorlesung) oder über Zoom- und Kamera-Offset-Parameter in `Transform2D`.
4. **Arbeitspaket A.4 – JSON-Import/Export & Freeze-Optimierung (`System.Text.Json`):**
   - Frieren Sie statisch verwendete `SolidColorBrush`-Instanzen ein (`Freeze()`), um GC-Allokationen beim Dragging zu minimieren.
   - Fügen Sie zwei Buttons **„JSON Speichern“** und **„JSON Laden“** hinzu, mit denen das aktuelle Tragwerk (Knoten, Stäbe, Lager, Lasten) als `.json`-Datei exportiert und wieder eingeladen werden kann.


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
   - **Stäbe spannen & löschen:** Ziehen von Knoten A zu Knoten B (oder Klick-Klick im Baumodus) erzeugt bei $L \le 4{,}00\,\text{m}$ und ausreichendem Budget einen neuen `TrussBar` (keine doppelten Stäbe!). Ein Rechtsklick oder die Taste `Entf` auf einen Knoten/Stab löscht das Element samt angrenzender Stäbe (die beiden Felswand-Auflagerknoten sind unlöschbar). *(UI-Praxis-Tipp: Da ein WPF-`Canvas` standardmäßig keinen Tastaturfokus hält und `ComboBox`/`Button` Tasten abfangen können, registrieren Sie `PreviewKeyDown` direkt am `Window` für `Key.Delete` mit `e.Handled = true` und trennen Sie Linksklick/Rechtsklick in `TrussCanvas_MouseDown` sauber per `if / else if`.)*
4. **Arbeitspaket B.4 – JSON-Level-Import/Export & Freeze-Optimierung (`System.Text.Json`):**
   - Frieren Sie statisch verwendete `SolidColorBrush`-Instanzen ein (`Freeze()`), um GC-Allokationen beim Zeichnen zu minimieren.
   - Fügen Sie zwei Buttons **„JSON Speichern“** und **„JSON Laden“** hinzu, mit denen der konstruierte Brücken-Entwurf (Knoten, Stäbe, Lager, Lasten) als `.json`-Datei für den LKW-Überfahrt-Test in Einheit 07 gespeichert und geladen werden kann.


## 5. Akzeptanzkriterien & Bewertungsrubrik (10 Punkte)

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **Mathematische Transformation & Auto-Fit (Stufe 1 & 2)** | 2 P. | Isotropes $s = \min(s_x, s_y)$, korrekte $Y$-Inversion, BoundingBox-Zentrierung ohne Jittering beim Drag-and-Drop. |
| **Vektorpfeile, Stablängen & Vertikalbemaßung (Stufe 1)** | 2 P. | Exakt rotierte Pfeilspitzen (`Polygon`) mit fixer Pixelgröße, euklidische Stablängen-Labels und vertikale DIN-406-Höhenmaßkette. |
| **Track-Spezialisierung Geometrie (Arbeitspaket A.1/A.2 bzw. B.1/B.2)** | 2 P. | **Track A:** Neues Kran-/Dachbindermodell + zweistufige horizontale DIN-406-Bemaßungskette.<br>**Track B:** Schlucht-Polygon-Szene mit $0{,}5\,\text{m}$-Grid-Snapping + $L_{\max}$-Vorschau & Live-Baubudget-Balken. |
| **Track-Spezialisierung Interaktion (Arbeitspaket A.3 bzw. B.3)** | 2 P. | **Track A:** Interaktives Ziehen/Drehen der Lastpfeilspitzen $(F_x, F_y)$ + Mausrad-Zoom & Kamera-Pan.<br>**Track B:** Interaktives Knoten-Setzen, Stäbe-Spannen ($L \le 4\,\text{m}$) und Löschen (`Entf`/Rechtsklick). |
| **JSON-Persistenz, Unit-Tests & Code-Qualität (Aufgabe 1.4 & A.4/B.4)** | 2 P. | Grüne Unit-Test-Suite (`VectorTrussCanvas.Tests` / `dotnet test`), funktionierender JSON-Export/Import (`System.Text.Json`), eingefrorene Brushes (`Freeze()`) und kurze `README.md`. |
| **Gesamt** | **10 P.** | **100 % der Übungseinheit** |


## 6. Online-Recherche-Box

- **Offizielle Dokumentation:**
  - [Microsoft Learn: Shapes and Basic Drawing in WPF](https://learn.microsoft.com/de-de/dotnet/desktop/wpf/graphics-multimedia/shapes-and-basic-drawing-in-wpf-overview) – Primitive Vektoren in WPF.
  - [Microsoft Learn: MatrixTransform in WPF](https://learn.microsoft.com/de-de/dotnet/api/system.windows.media.matrixtransform) – Affine 2D-Transformationen.
  - [DIN 406-11: Maßeintragung in Zeichnungen](https://de.wikipedia.org/wiki/Ma%C3%9Feintragung) – Regeln für Maßlinien und Maßpfeile.
- **Gezielte englische Suchbegriffe:**
  - `WPF Canvas world to screen coordinate transform aspect ratio`
  - `calculate polygon arrowhead rotation vector geometry C#`
  - `WPF Canvas interactive drag and drop line node update`


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


## 8. 🔍 Leitfragen für den Live-Showcase & Code-Defense (Säule 2b)

1. **Seitenverhältnis-Stresstest:**  
   *„Ziehen Sie das Anwendungsfenster am Rand ganz schmal und breit: Behalten die Träger-Dreiecke, Bemaßungen und das Konstruktionsraster ihre exakten Winkel und Proportionen, ohne zu verzerren?“*
2. **Pfeilspitzen-Invarianz & Längengrenzen:**  
   *„Behält in Track A die Pfeilspitze beim Ziehen der Kraft konstant ihre 14 Pixel Kantenlänge? Färbt sich in Track B die Vorschau-Linie ab exakt $L > 4{,}00\,\text{m}$ rot und blockiert den Bau?“*
3. **Architektur- und Fokus-Check:**  
   *„Konzentriert sich die Architektur rein auf saubere 2D-Vektordarstellung, Transformation und Interaktion (ohne eigene Statik- oder Gleichungslöser)?“*
4. **Performance beim Drag-and-Drop:**  
   *„Werden Brushes/Pens vorab eingefroren (`Freeze()`) und bleibt das Koordinatensystem während des Ziehens eines Knotens ruhig, ohne unter dem Mauszeiger wegzuspringen?“*
