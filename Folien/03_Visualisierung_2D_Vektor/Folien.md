---
marp: true
theme: fhooe
header: 'Kapitel 3: 2D-Visualisierung (WPF/Vektor)'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

<!-- _paginate: false -->
<!-- _header: "" -->
<!-- _footer: "" -->

![bg right](./Titelbild.jpg)

# Kapitel 3: 2D-Visualisierung (WPF/Vektor)

Dieses Kapitel umfasst die folgenden Abschnitte:

- 3.1: Grundlagen der Vektorgrafik und WPF Canvas
- 3.2: Transformation: Welt- zu Bildschirmkoordinaten
- 3.3: Vektordarstellung geometrischer Elemente und Kräfte
- 3.4: Interaktive Steuerung im Canvas (Pan & Zoom)
- 3.5: Performance & Architektur: Shapes vs. DrawingVisual

---

### Showcase & Peer-Challenge: Termin 02

Präsentation der Ergebnisse aus Termin 02 ([Aufgabenblatt 02](../../Uebungen/Termin_02_Pixelgrafik_und_FDM/Aufgabenblatt.md)):

<div class="columns">
<div class="two">

#### Track A: Industrie (CPU-Kühlkörper)
- **FDM-Modell:** Inhomogene Materialien (Si, Cu, Al) & Robin-Randbedingungen an Finnen.
- **Numerik:** Stabilitätsgrenze $\Delta t \le \frac{\Delta x^2}{4 a_{\max}}$ für Kupfer nachweisen.
- **Stresstest:** Lüfterausfall live schalten ($h: 250 \to 20\,\text{W/m}^2\text{K}$) oder $\Delta t$ verdoppeln.

</div>
<div class="two">

#### Track B: Game (Doom Fire & Lava)
- **Hybrid-Gitter:** 5-Punkt-FDM Wärmefeld gekoppelt mit zellulärem Sand-/Lava-Automat.
- **Performance:** Allokationsfreier Render-Loop auf `WriteableBitmap.BackBuffer` ($\ge 45\,\text{FPS}$).
- **Stresstest:** Diffusionsfaktor überkriechen lassen oder Großbrand live auslösen.

</div>
</div>

> **Peer-Challenge (Säule 2b):** Prüfung auf physikalisches Double-Buffering (kein In-Place-Überschreiben) und 0 B GC-Allokationen im Render-Tick.

---

<!-- Platzhalter für Abschnittsbildbeschreibung -->

![bg right](./Illustrationen/Abschnitt_1.jpg)

## 3.1: Grundlagen der Vektorgrafik und WPF Canvas

Dieser Abschnitt umfasst die folgenden Inhalte:

- Prinzip der Vektorgrafik im Vergleich zur Rastergrafik
- Retained Mode vs. Immediate Mode in Benutzeroberflächen
- Das `Canvas`-Element in WPF und Attached Properties
- Vektorielle Grundformen (`Line`, `Rectangle`, `Ellipse`, `Polygon`, `Path`)
- Szenengraph und Visual Tree in WPF

---

### Was ist Vektorgrafik?

<div class="columns">
<div class="two">

- **Mathematische Repräsentation**: Bilder bestehen nicht aus Pixeln, sondern aus analytisch definierten Primitiven (Punkte, Linien, Polygone).
- **Auflösungsunabhängigkeit**: Vektoren lassen sich ohne Qualitätsverlust beliebig skalieren – gestochen scharf auf jedem Monitor.
- **Parametrisierbarkeit**: Jede Geometrie besitzt modifizierbare Attribute:
  - Anfangs- und Endkoordinaten $(x_1, y_1) \to (x_2, y_2)$
  - Linienstärke (`StrokeThickness`) und Strichmuster
  - Füllfarbe (`Fill`) und Konturfarbe (`Stroke`)
- **Einsatzbereich**: CAD, Fachwerke, Schemata, Kraftvektoren.

</div>
<div class="one">

![w:1000](./Diagramme/Mini_Vektor_vs_Pixel.svg)

</div>
</div>

---

### Retained Mode vs. Immediate Mode

<div class="columns top">
<div class="two">

**Immediate Mode (Termin 02 – `WriteableBitmap`):**
- Pixel werden direkt in den Bildspeicher geschrieben.
- Die GUI-Bibliothek „vergisst“ gezeichnete Formen sofort.
- Keine UI-Objekte, kein Klick-Handling auf einzelnen Linien.

**Retained Mode (Termin 03 – WPF `Canvas` & `Shapes`):**
- Die GUI verwaltet einen Szenengraph (**Visual Tree**) im RAM.
- Jede Linie und jeder Knoten existiert als C#-Objekt.
- **Automatisches Neuzeichnen** bei Größenänderungen.
- **Ereignisbehandlung**: Native Maus-Events auf jedem Shape.

</div>
<div class="one">

![w:1000](./Diagramme/Mini_WPF_Szenengraph.svg)

</div>
</div>

---

### Das `Canvas`-Control in WPF

<div class="columns top">
<div class="two">

In WPF bietet das `Canvas`-Control eine 2D-Zeichenfläche mit **absoluter Positionierung**:

- Kindelemente werden über angehängte Eigenschaften (**Attached Properties**) exakt im Koordinatenraum platziert:
  - `Canvas.Left="120"`
  - `Canvas.Top="85"`
- Im Gegensatz zu `Grid` führt der Canvas **keine automatische Layout-Verschachtelung** durch.
- Kindelemente können sich frei überlappen (Z-Index).
- Ideal geeignet für technische 2D-Simulationsmodelle, CAD-Viewer und interaktive Vektorgrafiken.

</div>
<div class="one">

![w:1000](./Diagramme/Mini_WPF_Grundformen.svg)

</div>
</div>

---

### WPF Canvas: Instanziierung im Code

Kindelemente lassen sich direkt im Code-Behind erzeugen und zur `Children`-Sammlung hinzufügen:

```csharp
// Linie auf einem WPF Canvas im C#-Code erzeugen
var member = new Line
{
    X1 = 50,  Y1 = 50,   // Startpunkt [px]
    X2 = 250, Y2 = 150,  // Endpunkt [px]
    Stroke = Brushes.SteelBlue,
    StrokeThickness = 3.0,
    StrokeEndLineCap = PenLineCap.Round
};

// Zur Zeichenfläche hinzufügen
myCanvas.Children.Add(member);
```

- Das Element wird sofort Bestandteil des WPF Visual Tree.
- Bei Fensteränderungen zeichnet WPF das Element automatisch neu.

---

### Attached Properties: Warum `Canvas.Left`?

<div class="columns top">
<div class="two">

Ein fundamentales Architekturprinzip von WPF:

- Ein Shape (`Line`, `Ellipse`) besitzt von sich aus **keine** Eigenschaften namens `Left` oder `Top`.
- In einem `Grid` oder `StackPanel` wären absolute Koordinaten sinnlos.
- Der `Canvas` stellt diese Eigenschaften als **angehängte Abhängigkeitseigenschaften** bereit:

```csharp
// XAML:
<Ellipse Canvas.Left="100" Canvas.Top="50" Width="10" Height="10"/>

// C#-Code-Behind:
Canvas.SetLeft(myNode, 100.0);
Canvas.SetTop(myNode, 50.0);
double x = Canvas.GetLeft(myNode);
```

</div>
<div class="one">

> **Architektur-Vorteil:**  
> Strikte Entkopplung zwischen der visuellen Form und der Layout-Strategie des übergeordneten Containers!

<br>

> **Praxis-Tipp:**  
> Positionsänderungen über `Canvas.SetLeft()` lösen einen lokalen Layout-Cycle aus.

</div>
</div>

---

### Positionierungs-Strategien der WPF Shapes

<div class="columns top">
<div class="two">

| Control | Positionierungsmethode |
| :--- | :--- |
| **`Line`** | Eigene Eigenschaften `X1, Y1, X2, Y2` (relativ zu Canvas) |
| **`Ellipse`** | `Canvas.Left`, `Canvas.Top` (linke obere Hüllbox-Ecke!) |
| **`Polygon`** | Interne `Points`-Sammlung absoluter Koordinaten |
| **`Path`** | Koordinaten in der `PathGeometry` (`Figures`) |

<br>

**Zentrierung von Knotenpunkten (Ellipsen):**
Um eine `Ellipse` mit Radius $r$ exakt auf dem Punkt $(x_s, y_s)$ zu zentrieren:
$$\text{Canvas.Left} = x_s - r, \quad \text{Canvas.Top} = y_s - r$$

</div>
<div class="one">

```csharp
// Knoten als zentrierten Kreis zeichnen
public void AddNode(Canvas canvas, 
                    Point p, double r)
{
    var node = new Ellipse
    {
        Width = 2 * r,
        Height = 2 * r,
        Fill = Brushes.SteelBlue
    };
    Canvas.SetLeft(node, p.X - r);
    Canvas.SetTop(node, p.Y - r);
    canvas.Children.Add(node);
}
```

</div>
</div>

---

### WPF Shape-Elemente (Übersicht)

<div class="columns top">
<div class="one">

**`Line`**
- Verbindet zwei Punkte $(X_1, Y_1)$ und $(X_2, Y_2)$.
- Eigenschaften: `Stroke`, `StrokeThickness`, `StrokeDashArray`.
- Einsatz: Stäbe, Achsen, Maßhilfslinien.

**`Rectangle` / `Ellipse`**
- Bemaßung über `Width` und `Height`.
- Flächenfüllung (`Fill`) und Kontur (`Stroke`).
- Einsatz: Tragwerksknoten, Gelenke, Bauteile.

</div>
<div class="one">

**`Polygon`**
- Geschlossene Kette aus $N$ Punkten (`PointCollection`).
- Automatischer Ringschluss vom letzten zum ersten Punkt.
- Einsatz: Pfeilspitzen, Lager-Dreiecke, Profile.

**`Path`**
- Mächtigstes Vektor-Element in WPF.
- Unterstützt Geraden, Kreisbögen und Bézier-Kurven.
- Einsatz: Biegelinien, Freiform-CAD-Konturen.

</div>
</div>

---

<!-- Platzhalter für Abschnittsbildbeschreibung -->

![bg right](./Illustrationen/Abschnitt_2.jpg)

## 3.2: Transformation: Welt- zu Bildschirmkoordinaten

Dieser Abschnitt umfasst die folgenden Inhalte:

- Das Koordinaten-Paradoxon (Physik vs. Monitor)
- Bounding Box, Modellgrenzen und Randabstand
- Die Anisotropie-Falle (Verzerrung vs. Isotropie)
- Isotropes Skalieren und Invertierung der Y-Achse
- C#-Implementierung der Klasse `Transform2D`

---

### Das fundamentale Koordinaten-Paradoxon

<div class="columns top">
<div class="two">

Beim Zeichnen physikalischer Systeme treffen zwei inkompatible Welten aufeinander:

1. **Ingenieurtechnisches Weltsystem (Physik / DIN 1304):**
   - Kontinuierlich: $x_w, y_w \in \mathbb{R}$ in Metern $[\mathrm{m}]$.
   - **$+Y$-Achse zeigt nach OBEN** (Höhe, Gravitation $\vec{g}$).
   - Ursprung beliebig (z.B. Auflagerpunkt).

2. **Bildschirm-Koordinatensystem (WPF Canvas):**
   - Diskret: Bildschirmpixel in $[\mathrm{px}]$.
   - **$+Y$-Achse zeigt nach UNTEN** (Scanline-Raster).
   - Ursprung $(0,0)$ starr in der linken oberen Fensterecke.

</div>
<div class="one">

![w:1000](./Diagramme/Mini_Welt_vs_Screen.svg)

</div>
</div>

---

### Gegenüberstellung: Welt- vs. Bildschirmraum

<div class="columns top">
<div class="one">

### 1. Weltkoordinatensystem (Physik)

- **Modellraum**: Reale physikalische Geometrie
- **Kontinuierlich**: Reelle Koordinaten $x_w, y_w \in \mathbb{R}$
- **Einheit**: Physikalische Größen (z.B. Meter $[\mathrm{m}]$)
- **Orientierung**: Die $+Y$-Achse zeigt nach **oben**!
- **Ursprung $(0,0)$**: Beliebig im Raum platziert (z.B. linker Auflagerpunkt oder Schwerpunkt).

</div>
<div class="one">

### 2. Bildschirmkoordinaten (WPF Canvas)

- **Anzeigeraum**: Viewport auf dem Monitor
- **Diskret**: Pixel bzw. Device Independent Pixels $[\mathrm{px}]$
- **Einheit**: $1/96$ Zoll pro Pixel
- **Orientierung**: Die $+Y$-Achse zeigt nach **unten**!
- **Ursprung $(0,0)$**: Fest in der **linken oberen Ecke** des Steuerelements fixiert.

</div>
</div>

---

![center w:1080](./Diagramme/Koordinatentransformation.svg)

---

### Bounding Box & Bemaßung des Modells

<div class="columns top">
<div class="two">

Vor der Skalierung wird die minimale Hüllbox (**Bounding Box**) der Knotenkoordinaten ermittelt:

**1. Extremwerte aller Knotenpunkte ermitteln:**
$$X_{\min} = \min_{i} (x_i), \quad X_{\max} = \max_{i} (x_i) \quad [\mathrm{m}]$$
$$Y_{\min} = \min_{i} (y_i), \quad Y_{\max} = \max_{i} (y_i) \quad [\mathrm{m}]$$

**2. Physische Ausdehnung des Modells:**
$$W_{\text{world}} = X_{\max} - X_{\min}, \quad H_{\text{world}} = Y_{\max} - Y_{\min} \quad [\mathrm{m}]$$

**3. Nutzbare Zeichenfläche mit Randabstand:**
$$W_{\text{draw}} = W_{\text{canvas}} - 2 \cdot \text{margin} \quad [\mathrm{px}]$$
$$H_{\text{draw}} = H_{\text{canvas}} - 2 \cdot \text{margin} \quad [\mathrm{px}]$$

</div>
<div class="one">

![w:1000](./Diagramme/Mini_Bounding_Box.svg)

</div>
</div>

---

### Die Anisotropie-Falle (Verzerrung!)

<div class="columns top">
<div class="two">

Was passiert bei **naiver Skalierung** mit getrennten Faktoren für X und Y?

$$s_x = \frac{W_{\text{draw}}}{W_{\text{world}}}, \quad s_y = \frac{H_{\text{draw}}}{H_{\text{world}}} \quad \left[\frac{\mathrm{px}}{\mathrm{m}}\right]$$

- Wenn $s_x \ne s_y$, wird der Raum gestreckt oder gestaucht.
- **Folgen für technische Visualisierungen:**
  - Kreise werden zu eirigen Ellipsen.
  - Quadratische Fachwerke werden rechteckig verzerrt.
  - $45^\circ$-Diagonalstreben kippen optisch ab.
  - Kraftvektoren zeigen in falsche Raumrichtungen!
- **Ingenieur-Regel:** In physikalischen Modellen ist anisotrope Skalierung unzulässig!

</div>
<div class="one">

![w:1000](./Diagramme/Mini_Anisotropie_Falle.svg)

</div>
</div>

---

### Isotropes Uniform Scaling

<div class="columns top">
<div class="two">

Die Lösung: **Isotrope Skalierung** mit einheitlichem Maßstab $s$:

$$s = \min(s_x, s_y) \quad \left[\frac{\mathrm{px}}{\mathrm{m}}\right]$$

- **Bedeutung:** Einheit $[\mathrm{px/m}]$ (Pixel pro Meter).
- Der **kleinere** Faktor garantiert, dass das Modell in beiden Dimensionen vollständig auf die Zeichenfläche passt.
- **Eigenschaften:**
  - Alle geometrischen Proportionen bleiben physikalisch exakt erhalten.
  - Winkel bleiben winkeltreu ($45^\circ$ bleibt exakt $45^\circ$).
  - Modell skaliert responsiv bei Fenstergrößenänderung.

</div>
<div class="one">

| Symbol | Bedeutung | Einheit |
| :--- | :--- | :---: |
| $W_{\text{world}}$ | Modellbreite | $[\mathrm{m}]$ |
| $H_{\text{world}}$ | Modellhöhe | $[\mathrm{m}]$ |
| $W_{\text{draw}}$ | Nutzbare Breite | $[\mathrm{px}]$ |
| $H_{\text{draw}}$ | Nutzbare Höhe | $[\mathrm{px}]$ |
| $s$ | Isotroper Maßstab | $[\mathrm{px/m}]$ |
| $x_{\text{off}}, y_{\text{off}}$ | Zentrierungs-Offsets | $[\mathrm{px}]$ |

</div>
</div>

---

### Zentrierung und Invertierung der Y-Achse

<div class="columns top">
<div class="two">

**1. Zentrierungs-Offsets (Symmetrischer Freiraum):**
$$x_{\text{offset}} = \text{margin} + \frac{W_{\text{draw}} - W_{\text{world}} \cdot s}{2} \quad [\mathrm{px}]$$
$$y_{\text{offset}} = \text{margin} + \frac{H_{\text{draw}} - H_{\text{world}} \cdot s}{2} \quad [\mathrm{px}]$$

**2. Transformationsgleichungen (Welt $\to$ Screen):**
$$x_{\text{screen}} = x_{\text{offset}} + (x_w - X_{\min}) \cdot s \quad [\mathrm{px}]$$
$$y_{\text{screen}} = y_{\text{offset}} + (Y_{\max} - y_w) \cdot s \quad [\mathrm{px}]$$

- Für $y_w = Y_{\max} \implies y_{\text{screen}} = y_{\text{offset}}$ (oberer Bildschirmrand).
- Für $y_w = Y_{\min} \implies y_{\text{screen}} = y_{\text{offset}} + H_{\text{world}} \cdot s$ (unten).

</div>
<div class="one">

> **Einheitenkontrolle:**  
> $$[\mathrm{px}] + ([\mathrm{m}] - [\mathrm{m}]) \cdot \left[\frac{\mathrm{px}}{\mathrm{m}}\right] = [\mathrm{px}]$$  
> Die Formel ist dimensionsrein!

<br>

> **Analytische Umkehrfunktion:**  
> $$x_w = X_{\min} + \frac{x_{\text{screen}} - x_{\text{offset}}}{s} \quad [\mathrm{m}]$$  
> $$y_w = Y_{\max} - \frac{y_{\text{screen}} - y_{\text{offset}}}{s} \quad [\mathrm{m}]$$

</div>
</div>

---

### C#-Implementierung: `Transform2D` (Setup & Skalierung)

```csharp
public class Transform2D
{
    public double Scale { get; private set; } = 1.0;
    public double OffsetX { get; private set; }
    public double OffsetY { get; private set; }
    public double XMin { get; private set; }
    public double YMax { get; private set; }

    public void Update(double xMin, double xMax, double yMin, double yMax,
                       double canvasWidth, double canvasHeight, double margin = 50.0)
    {
        XMin = xMin;
        YMax = yMax; // Höchster Y-Wert für Invertierung!
        double worldW = Math.Max(xMax - xMin, 1e-4);
        double worldH = Math.Max(yMax - yMin, 1e-4);

        double drawW = Math.Max(canvasWidth - 2.0 * margin, 10.0);
        double drawH = Math.Max(canvasHeight - 2.0 * margin, 10.0);

        Scale = Math.Min(drawW / worldW, drawH / worldH); // Isotrop!
        OffsetX = margin + (drawW - worldW * Scale) / 2.0;
        OffsetY = margin + (drawH - worldH * Scale) / 2.0;
    }
}
```

---

### C#-Implementierung: `Transform2D` (Transformation)

```csharp
public class Transform2D
{
    // ... Bounding-Box & Skalierungszustand aus Update() ...

    // Wandelt Weltpunkt (X_w, Y_w) [m] in Canvas-Pixel (x_s, y_s) [px] um
    public Point WorldToScreen(double xW, double yW) => new(
        OffsetX + (xW - XMin) * Scale,
        OffsetY + (YMax - yW) * Scale // Y-Achsen-Invertierung!
    );

    // Wandelt Canvas-Pixel (x_s, y_s) [px] zurück in Weltkoordinaten [m]
    public (double Xw, double Yw) ScreenToWorld(double xS, double yS) => (
        XMin + (xS - OffsetX) / Scale,
        YMax - (yS - OffsetY) / Scale
    );
}
```

- Entspricht exakt der Vorlagenklasse in [`VectorTrussCanvas/Geometry/Transform2D.cs`](../../Uebungen/Termin_03_Vektorgrafik_Canvas/Vorlage/VectorTrussCanvas/Geometry/Transform2D.cs).

---

<!-- Platzhalter für Abschnittsbildbeschreibung -->

![bg right](./Illustrationen/Abschnitt_3.jpg)

## 3.3: Vektordarstellung geometrischer Elemente und Kräfte

Dieser Abschnitt umfasst die folgenden Inhalte:

- Darstellung gerichteter physikalischer Größen (Kräfte, Geschwindigkeiten)
- Geometriemaßstab vs. Kraftmaßstab ($s_F$ in $[\mathrm{px/N}]$)
- Konstruktion zusammengesetzter Pfeilformen (Schaftlinie + Spitzenpolygon)
- Analytische Berechnung der Pfeilspitze über Orthogonalvektoren (ohne Trigonometrie)
- Normgerechte Bemaßungsketten nach DIN 406 (Maßhilfslinien, Maßlinien, Pfeile)

---

### Geometriemaßstab vs. Kraftmaßstab

<div class="columns top">
<div class="two">

- **Geometrie:** Maßstab $s = \min(s_x, s_y)$ $[\mathrm{px/m}]$ (z.B. $10\,\mathrm{m}$ Träger $\to 500\,\mathrm{px}$).
- **Physikalische Kräfte:** Dürfen **nicht** mit dem Geometriemaßstab gezeichnet werden!
  - Eine Last von $50\,\mathrm{kN}$ wäre sonst $2.500.000\,\mathrm{px}$ lang.
- **Zwei professionelle Lösungsansätze:**
  1. **Konfigurierbarer Kraftmaßstab $s_F$ $[\mathrm{px/N}]$:**
     $\vec{L}_F = s_F \cdot \vec{F}_{\text{screen}} \quad [\mathrm{px}]$
  2. **Feste Pfeillänge mit Beschriftung (Industriestandard):**
     Pfeilschaft besitzt feste Länge ($65\,\mathrm{px}$); Betrag wird als Text gerendert (`"25.0 kN"`).

</div>
<div class="two">

![w:520](./Diagramme/Pfeilspitzengeometrie_2D.svg)

</div>
</div>

---

### Analytische Berechnung der Pfeilspitze

<div class="columns top">
<div class="two">

Gegeben: Knoten $\vec{P}_{\text{node}}$ $[\mathrm{px}]$, Kraftvektor $\vec{F} = (F_x, F_y)^T$, Spitzenmaße $L$ und $W$ $[\mathrm{px}]$.

1. **Pfeilspitze:** $\vec{P}_{\text{tip}} = \vec{P}_{\text{node}} + \text{length} \cdot \vec{e}_u$
2. **Normierter Richtungsvektor:** $\vec{e}_u = \vec{F}_{\text{screen}} / \|\vec{F}_{\text{screen}}\|$
3. **Orthogonalvektor ($90^\circ$ links):** $\vec{e}_u^\perp = (-e_{u,y}, e_{u,x})^T$
4. **Basispunkt & Flügelpunkte:**
   $\vec{P}_{\text{base}} = \vec{P}_{\text{tip}} - L \cdot \vec{e}_u, \quad \vec{P}_{\text{wing1,2}} = \vec{P}_{\text{base}} \pm \frac{W}{2} \cdot \vec{e}_u^\perp$

</div>
<div class="one">

![w:1000](./Diagramme/Mini_Pfeil_Vektorgeometrie.svg)

</div>
</div>

---

### Berechnung der Pfeilspitze in C#

```csharp
// Berechnet die Eckpunkte für ein Pfeilspitzen-Dreieck ohne Trigonometrie
public static Point[] GetArrowhead(Point tip, Vector dir, double length, double width)
{
    dir.Normalize(); // Richtungs-Einheitsvektor e_u
    
    // Orthogonalvektor e_u_perp (90° gegen den Uhrzeigersinn gedreht)
    var perp = new Vector(-dir.Y, dir.X);

    Point pBase = tip - (length * dir);             // P_base
    Point pWing1 = pBase + (width / 2.0 * perp);     // P_wing1
    Point pWing2 = pBase - (width / 2.0 * perp);     // P_wing2

    return new Point[] { tip, pWing1, pWing2 };
}
```

- **Vorteil:** Verwendet reine Vektoralgebra ohne teure Aufrufe von `Math.Sin()` oder `Math.Cos()`.
- Liefert die drei Eckpunkte direkt für die `Points`-Collection eines WPF-`Polygon`.

---

### Technische Bemaßung nach DIN 406

<div class="columns top">
<div class="two">

In industriellen CAD-Viewern werden Abmessungen normgerecht nach **DIN 406** dargestellt:

1. **Maßhilfslinien (Extension Lines):**
   - Verlängern Bauteilkanten nach außen.
   - Kurzer Sicherheitsabstand zum Knoten ($3–5\,\mathrm{px}$).
   - Überstand über Maßlinie: ca. $2–3\,\mathrm{mm}$ ($8–12\,\mathrm{px}$).
2. **Maßlinie (Dimension Line):**
   - Steht orthogonal zu den Maßhilfslinien.
   - Begrenzung durch schlanke Maßpfeile (Verhältnis 1:3).
3. **Maßzahl (Dimension Text):**
   - Mittig über der Maßlinie platziert (z.B. `"4.00 m"`).

</div>
<div class="one">

![w:1000](./Diagramme/Mini_DIN_406_Bemaszung.svg)

</div>
</div>

---

### C#-Implementierung: DIN-406 Maßkette

```csharp
public static void AddHorizontalDimensionLine(Canvas canvas, Point p1, Point p2, 
                                              double yScreen, string text, Brush stroke)
{
    // 1. Maßhilfslinien mit 8 px Überstand
    canvas.Children.Add(new Line { X1 = p1.X, Y1 = p1.Y + 4, X2 = p1.X, Y2 = yScreen + 8, Stroke = stroke });
    canvas.Children.Add(new Line { X1 = p2.X, Y1 = p2.Y + 4, X2 = p2.X, Y2 = yScreen + 8, Stroke = stroke });

    // 2. Maßlinie
    canvas.Children.Add(new Line { X1 = p1.X, Y1 = yScreen, X2 = p2.X, Y2 = yScreen, Stroke = stroke });

    // 3. Maßpfeile (links und rechts nach außen zeigend)
    canvas.Children.Add(CreateArrowHead(p1, new Vector(1, 0), stroke));
    canvas.Children.Add(CreateArrowHead(p2, new Vector(-1, 0), stroke));

    // 4. Maßzahl zentriert platzieren
    var label = new TextBlock { Text = text, Foreground = stroke, FontSize = 11 };
    Canvas.SetLeft(label, (p1.X + p2.X) / 2.0 - 20);
    Canvas.SetTop(label, yScreen - 16);
    canvas.Children.Add(label);
}
```

---

<!-- Platzhalter für Abschnittsbildbeschreibung -->

![bg right](./Illustrationen/Abschnitt_4.jpg)

## 3.4: Interaktive Steuerung im Canvas (Pan & Zoom)

Dieser Abschnitt umfasst die folgenden Inhalte:

- Navigation in Simulationsmodellen
- Naives Neuzeichnen vs. GPU-`MatrixTransform`
- Zoom mit Mauszeiger-Fixpunkt (`ScaleAt`)
- Verschieben per Drag & Drop (`Pan`) und `CaptureMouse`
- Der Dragging-Jitter Bugfix & `ScreenToWorld`

---

### Navigationskonzept: Naives CPU-Neuzeichnen

<div class="columns top">
<div class="two">

**Ansatz A: Naives CPU-Neuzeichnen**
- Bei jeder Mausbewegung werden alle Weltkoordinaten neu berechnet.
- Alle WPF-Shapes werden im Canvas verschoben (`Canvas.SetLeft`).
- **Gravierende Nachteile**:
  - $O(N)$ CPU-Rechenaufwand bei jeder Mausbewegung.
  - Extremes Flackern und UI-Lags ab 1.000 Elementen.
  - Koppelt den Navigationszustand unnötig an Modelldaten.
  - Erzeugt unzählige Layout-Passes in WPF.

</div>
<div class="one">

![w:1000](./Diagramme/Mini_Pan_Zoom_Matrix.svg)

</div>
</div>

---

### Navigationskonzept: GPU-`MatrixTransform`

<div class="columns top">
<div class="two">

**Ansatz B: GPU-`MatrixTransform` (Industriestandard)**
- Das Modell wird **einmalig** auf den Canvas gezeichnet.
- Pan und Zoom verändern ausschließlich eine einzige affine Transformationsmatrix am Canvas.
- **Vorteile**:
  - Hardwarebeschleunigt über DirectX / GPU ($O(1)$ Aufwand).
  - Konstant 60+ FPS selbst bei komplexen Großmodellen.
  - Vollständige Entkopplung von Geometriedaten und Kameraansicht.
  - Keine GC-Allokationen im Navigationstakt!

</div>
<div class="one">

$$\begin{pmatrix} x' \\ y' \\ 1 \end{pmatrix} = \begin{pmatrix} s & 0 & d_x \\ 0 & s & d_y \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \\ 1 \end{pmatrix}$$

> **DirectX Render-Pipeline:**  
> Die GPU schiebt die gezeichnete Textur im Video-RAM – die CPU bleibt völlig unberührt!

</div>
</div>

---

### XAML-Struktur für hardwarebeschleunigtes Pan & Zoom

Ein übergeordneter Container (`Border` oder `Grid`) fängt alle Mausereignisse ab:

```xml
<Border ClipToBounds="True" Background="#F8FAFC"
        MouseWheel="OnMouseWheel" MouseDown="OnMouseDown"
        MouseMove="OnMouseMove" MouseUp="OnMouseUp">
    <Canvas x:Name="SimulationCanvas">
        <Canvas.RenderTransform>
            <MatrixTransform x:Name="CanvasMatrixTransform" />
        </Canvas.RenderTransform>
    </Canvas>
</Border>
```

- **`ClipToBounds="True"`**: Schneidet herausgezoomte Elemente am Fensterrand sauber ab.
- **`CanvasMatrixTransform`**: Steuert Pan (Translation) und Zoom (Skalierung) in einer einzigen affinen $3 \times 3$-Matrix.

---

### Zoom zentriert auf den Mauszeiger (`ScaleAt`)

<div class="columns top">
<div class="two">

**Das Problem bei naivem Zoom:**
- Wird um den Ursprung $(0,0)$ skaliert, springt das anvisierte Bauteil bei jedem Mausrad-Tick nach rechts unten weg.

**Die Lösung: Fixpunkt unter dem Cursor (`ScaleAt`):**
- Der Punkt unter dem Cursor $\vec{P}_{\text{cursor}}$ muss während des Skalierens an derselben Bildschirmposition verbleiben.
- **Mathematischer 3-Schritt-Ablauf:**
  1. Translation um $-\vec{P}_{\text{cursor}}$ (Punkt in Ursprung).
  2. Skalierung um Zoom-Faktor $s_{\text{zoom}}$.
  3. Translation um $+\vec{P}_{\text{cursor}}$ (Punkt zurück an Ort).

In WPF gekapselt: `m.ScaleAt(zoom, zoom, mousePos.X, mousePos.Y);`

</div>
<div class="one">

![w:1000](./Diagramme/Mini_ScaleAt_Cursor.svg)

</div>
</div>

---

### C#-Implementierung: Zoom per Mausrad

```csharp
private void OnMouseWheel(object sender, MouseWheelEventArgs e)
{
    // Exakte Position des Mauszeigers im Canvas-Koordinatenraum ermitteln
    Point mousePos = e.GetPosition(SimulationCanvas);
    
    // Zoomfaktor bestimmen: +15 % hineinzoomen, -13 % herauszoomen
    double zoomFactor = e.Delta > 0 ? 1.15 : 1.0 / 1.15;

    // Aktuelle Transformationsmatrix des Canvas auslesen
    Matrix m = CanvasMatrixTransform.Matrix;
    
    // Multipliziert Skalierung mit Fixpunkt-Erhalt unter dem Mauszeiger
    m.ScaleAt(zoomFactor, zoomFactor, mousePos.X, mousePos.Y);
    
    // Neue Matrix an die GPU übergeben
    CanvasMatrixTransform.Matrix = m;
}
```

- Flüssiges, intuitives Zoomen wie in professionellen CAD-Programmen.

---

### Verschieben der Arbeitsfläche per Drag & Drop (`Pan`)

Damit die Maus bei schnellen Wisch-Bewegungen nicht abreißt, wird **`CaptureMouse()`** genutzt:

```csharp
private Point _lastPos;
private bool _isPanning;

private void OnMouseDown(object sender, MouseButtonEventArgs e)
{
    if (e.MiddleButton != MouseButtonState.Pressed && !Keyboard.IsKeyDown(Key.Space)) return;
    _lastPos = e.GetPosition(this);
    _isPanning = true;
    ((IInputElement)sender).CaptureMouse();
    Cursor = Cursors.SizeAll;
}

private void OnMouseUp(object sender, MouseButtonEventArgs e)
{
    _isPanning = false;
    ((IInputElement)sender).ReleaseMouseCapture();
    Cursor = Cursors.Arrow;
}
```

---

### Verschieben: Die `MouseMove`-Logik

In `MouseMove` wird die Differenz $\vec{\Delta} = \vec{P}_{\text{current}} - \vec{P}_{\text{last}}$ direkt auf die Matrix translatiert:

```csharp
private void OnMouseMove(object sender, MouseEventArgs e)
{
    if (!_isPanning) return;

    Point currentPos = e.GetPosition(this);
    Vector delta = currentPos - _lastMousePos;
    _lastMousePos = currentPos;

    Matrix m = CanvasMatrixTransform.Matrix;
    m.Translate(delta.X, delta.Y); // Hardwarebeschleunigter Pan
    CanvasMatrixTransform.Matrix = m;
}
```

- Funktioniert nahtlos in jeder beliebigen Zoomstufe ohne Neuberechnung der Geometriedaten.

---

### Die Dragging-Jitter-Falle (In-Class Bugfix!)

<div class="columns top">
<div class="two">

Beim interaktiven Verschieben von Knotenpunkten tritt in naiven Implementierungen ein **schwerer Feedback-Bug** auf:

**Der Teufelskreis beim Knoten-Dragging:**
1. Die Maus greift Knoten $K_3$ und zieht ihn nach oben.
2. In `MouseMove` ruft `Redraw()` die Bounding Box und `_transform.Update()` auf.
3. Durch den weiter außen liegenden Knoten **wächst die Bounding Box**.
4. Der Auto-Fit-Maßstab $s = \min(s_x, s_y)$ **schrumpft**.
5. Das Tragwerk verkleinert sich $\implies$ der Knoten hüpft unter dem Mauszeiger weg!
6. **Ergebnis:** Heftiges Zittern und Flackern (**Jittering**).

</div>
<div class="one">

![w:1000](./Diagramme/Mini_Jitter_Schleife.svg)

</div>
</div>

---

### Die Lösung des Jittering-Problems

<div class="columns top">
<div class="two">

**Die Entkopplungs-Regel:**
Während eines aktiven Drag-Vorgangs darf die Bounding Box **niemals** dynamisch neu angepasst werden!

```csharp
private void Redraw()
{
    // Auto-Fit BoundingBox NUR aktualisieren,
    // wenn gerade KEIN Knoten gezogen wird!
    if (_draggedNode == null)
    {
        var (xMin, xMax, yMin, yMax) = 
            _truss.GetBounds();
        _transform.Update(xMin, xMax, 
            yMin, yMax, 
            TrussCanvas.ActualWidth, 
            TrussCanvas.ActualHeight);
    }

    DrawTruss();
}
```

</div>
<div class="one">

> **Die Kern-Erkenntnis:**  
> Die Kamera-Transformation muss während der Maus-Interaktion **eingefroren** bleiben!  
> Erst beim Loslassen der Maustaste (`MouseUp`) wird das Koordinatensystem neu eingepasst.

</div>
</div>

---

### Der Dragging-Lebenszyklus im Detail

<div class="columns top">
<div class="one">

#### 1. `MouseDown` auf Knoten
- Knoten per Hit-Testing erfassen:  
  `_draggedNode = hitNode;`
- Auto-Fit Transformation wird **eingefroren**.
- Maus fangen mit `CaptureMouse()`.

#### 2. `MouseMove` (Dragging)
- Bildschirmkoordinaten in Welt $[\mathrm{m}]$ umrechnen (`ScreenToWorld`).
- Knotenkoordinaten in Welt nachführen:  
  `_draggedNode.X = worldX;`
- Canvas zeichnet mit eingefrorenem Maßstab $\implies$ **kein Zittern!**

</div>
<div class="one">

#### 3. `MouseUp` (Abschluss)
- `_draggedNode = null;`
- `ReleaseMouseCapture();`
- Erst jetzt darf `Redraw()` die Bounding Box aktualisieren und das Modell neu einpassen.

> **Sprint-Bezug:**  
> Genau diesen Bugfix setzt ihr in Sprint-Aufgabe 4 live in [`VectorTrussCanvas`](../../Uebungen/Termin_03_Vektorgrafik_Canvas/Vorlage/VectorTrussCanvas/MainWindow.xaml.cs) um!

</div>
</div>

</div>
</div>

---

### Analytische Rücktransformation: Bildschirm zu Welt

<div class="columns top">
<div class="two">

Für Selektion und Picking (z.B. Knoten anklicken, Lasten aufbringen) muss ein Bildschirmpixel $\vec{p}_{\text{pixel}} = (x_p, y_p)^T$ $[\mathrm{px}]$ in Weltkoordinaten $\vec{p}_w = (x_w, y_w)^T$ $[\mathrm{m}]$ rücktransformiert werden:

**1. Invertierung von Pan & Zoom (Affine WPF-Matrix $\mathbf{M} \in \mathbb{R}^{3 \times 3}$):**
$$\begin{pmatrix} x_u \\ y_u \\ 1 \end{pmatrix} = \mathbf{M}^{-1} \begin{pmatrix} x_p \\ y_p \\ 1 \end{pmatrix} \quad [\mathrm{px}]$$

**2. Invertierung der Viewport-Projektion ($[\mathrm{px}] \to [\mathrm{m}]$):**
$$x_w = X_{\min} + \frac{x_u - x_{\text{offset}}}{s} \quad [\mathrm{m}]$$
$$y_w = Y_{\max} - \frac{y_u - y_{\text{offset}}}{s} \quad [\mathrm{m}]$$

</div>
<div class="one">

![w:1000](./Diagramme/Mini_Screen_to_World.svg)

</div>
</div>

---

### C#-Implementierung: `ScreenToWorld`

```csharp
public Point ScreenToWorld(Point screenPixel, Matrix canvasMatrix, Transform2D trans)
{
    // 1. Pan- und Zoom-Matrix invertieren (WPF-Affine Transformation)
    Matrix invMatrix = canvasMatrix;
    invMatrix.Invert();
    Point unzoomed = invMatrix.Transform(screenPixel);

    // 2. Viewport-Projektion analytisch invertieren (Pixel -> Meter):
    var (worldX, worldY) = trans.ScreenToWorld(unzoomed.X, unzoomed.Y);

    return new Point(worldX, worldY);
}
```

- Liefert präzise physikalische Koordinaten $[\mathrm{m}]$ für Raycasting, Picking und Hit-Testing.
- Unabhängig vom aktuellen Zoom-Faktor oder der Pan-Verschiebung mathematisch exakt!

---

<!-- Platzhalter für Abschnittsbildbeschreibung -->

![bg right](./Illustrationen/Abschnitt_5.jpg)

## 3.5: Performance & Architektur: Shapes vs. DrawingVisual

Dieser Abschnitt umfasst die folgenden Inhalte:

- Der `UIElement`-Overhead von WPF `Shape`-Objekten
- Der 2-stufige Layout-Pass (`Measure` / `Arrange`)
- High-Performance Vektorgrafik mit `DrawingVisual`
- Die lebenswichtige `Freeze()`-Doktrin
- Aufbau des `VisualHost`-Controls & Technologievergleich

---

### WPF Shapes: Der UIElement-Overhead

<div class="columns top">
<div class="two">

`Line`, `Rectangle`, `Ellipse` und `Path` sind sehr komfortabel, stoßen bei komplexen Simulationen aber schnell an Grenzen:

- **Der `UIElement`-Overhead:**
  - Jedes `Shape` erbt von:  
    `Visual` $\rightarrow$ `UIElement` $\rightarrow$ `FrameworkElement` $\rightarrow$ `Shape`.
  - Hunderte Dependency Properties, Focus-Handling, Styling, Animations-Slots.
  - Hoher Speicherverbrauch (mehrere KB pro Shape-Instanz).
- **Skalierungs-Grenzen**:
  - Bis 1.000 Shapes: Flüssig (60 FPS).
  - Ab 2.000 Shapes: Spürbare Verzögerungen.
  - Ab 5.000 Shapes: Frame-Einbrüche ($< 10\,\mathrm{FPS}$).

</div>
<div class="one">

![w:1000](./Diagramme/Mini_Shape_vs_DrawingVisual.svg)

</div>
</div>

---

### WPF Shapes: Der Layout-Pass (`Measure`/`Arrange`)

<div class="columns top">
<div class="two">

Warum bricht die Performance bei vielen Shapes ein?

- **Der 2-stufige Layout-Cycle:**
  1. `MeasureOverride`: Ermittelt den Platzbedarf jedes Kindelements.
  2. `ArrangeOverride`: Weist jedem Element seine finale Position zu.
- **Konsequenz bei Animationen & Simulationen:**
  - Jede Positionsänderung triggert den rekursiven Layout-Cycle im gesamten Visual Tree.
  - Bei 5.000 Elementen bedeutet dies 10.000 Methodenaufrufe pro Render-Frame!
  - Die CPU wird vollständig blockiert, bevor die GPU überhaupt ein einziges Bild rendern darf.

</div>
<div class="one">

> **Die Diagnose:**  
> WPF `Shapes` sind für UI-Elemente (Buttons, Icons) entworfen – nicht für Simulations-Netze mit zehntausenden Stäben!

<br>

> **Die Lösung:**  
> Umgehung des UIElement- und Layout-Layers mittels `DrawingVisual`.

</div>
</div>

---

### Die Lösung: `DrawingVisual`

<div class="columns">
<div class="one">

`DrawingVisual` ist ein extrem leichtgewichtiger Visual-Knoten ohne UI-Ballast:

- Erbt direkt von `Visual` (kein `UIElement`, kein `FrameworkElement`).
- **Kein** Layout-Pass, kein Data Binding, keine separaten Event-Handler pro Vektorelement.
- Vektorbefehle werden direkt in einen kompakten **`DrawingContext`** geschrieben.
- Hardwarebeschleunigte Übergabe der Vektor-Streams an die GPU.

</div>
<div class="one">

![center w:450](./Diagramme/WPF_Visual_Hierarchie.svg)

</div>
</div>

---

### Die lebenswichtige `Freeze()`-Doktrin

<div class="columns top">
<div class="two">

In Render-Schleifen von Simulationsanwendungen gilt die **strikte Regel**:

> **Jeder `Pen` und jeder `Brush` muss vor dem Zeichnen mit `.Freeze()` eingefroren werden!**

**Warum ist das so entscheidend?**
1. **Change-Tracking aus:** `Freeze()` schaltet das lauschende Event-Tracking komplett ab.
2. **Thread-Sicherheit:** Nur unveränderliche Ressourcen dürfen an den DirectX-Render-Thread übergeben werden.
3. **Statische Wiederverwendung:** Eingefrorene Pinsel können statisch gecacht werden.
4. **0 Bytes GC-Last:** Verhindert Millionen kurzlebiger Heap-Objekte!

</div>
<div class="one">

![w:1000](./Diagramme/Mini_Freeze_Optimierung.svg)

</div>
</div>

---

### Zeichnen im `DrawingContext`

<div class="columns top">
<div class="one">

**Setup & Freezing:**
```csharp
var visual = new DrawingVisual();

using (DrawingContext dc = visual.RenderOpen())
{
    // Golden Rule: Pens & Brushes FREEZEN!
    var pen = new Pen(Brushes.SteelBlue, 2.0);
    pen.Freeze();
    
    var brush = Brushes.Crimson;
    brush.Freeze();

    DrawScene(dc, rods, nodes, pen, brush);
}
```

</div>
<div class="one">

**Zeichenschleifen:**
```csharp
private void DrawScene(
    DrawingContext dc, List<Rod> rods, 
    List<Node> nodes, Pen pen, Brush brush)
{
    // 50.000 Stäbe zeichnen:
    foreach (var rod in rods)
        dc.DrawLine(pen, rod.P1, rod.P2);

    // 50.000 Knoten zeichnen:
    foreach (var node in nodes)
        dc.DrawEllipse(brush, null, 
                       node.Pos, 3.0, 3.0);
}
```

</div>
</div>

---

### Das `VisualHost`-Control

Um `DrawingVisual`-Objekte im WPF-Fenster anzuzeigen, erstellen wir ein schlankes Control:

```csharp
public class FastDrawingCanvas : FrameworkElement
{
    private readonly VisualCollection _children;
    private readonly DrawingVisual _drawingVisual = new();

    public FastDrawingCanvas()
    {
        _children = new VisualCollection(this) { _drawingVisual };
    }

    protected override int VisualChildrenCount => _children.Count;
    protected override Visual GetVisualChild(int index) => _children[index];

    public void Render(Action<DrawingContext> renderAction)
    {
        using DrawingContext dc = _drawingVisual.RenderOpen();
        renderAction(dc);
    }
}
```

---

### Alternative: Direktes Überschreiben von `OnRender`

Wenn kein selektives Hit-Testing oder Multi-Layer-Visuals benötigt werden, kann auch direkt `OnRender` überschrieben werden:

```csharp
public class SimpleRenderCanvas : FrameworkElement
{
    public SimulationData? Data { get; set; }

    protected override void OnRender(DrawingContext dc)
    {
        base.OnRender(dc);
        if (Data == null) return;

        var pen = new Pen(Brushes.Black, 1.0);
        pen.Freeze();
        foreach (var bar in Data.Bars)
            dc.DrawLine(pen, bar.P1, bar.P2);
    }
}
```

- Neuzeichnen wird gezielt über `this.InvalidateVisual()` ausgelöst.

---

### Technologie- und Performancevergleich

| Kriterium | WPF `Shapes` (`Canvas`) | `DrawingVisual` / `OnRender` | `WriteableBitmap` (Pixel) |
| :--- | :--- | :--- | :--- |
| **Grafiktyp** | Vektor (High-Level) | Vektor (Low-Level) | Rastergrafik (Pixel) |
| **Max. Elementanzahl** | $\approx 1.000 - 2.000$ | $\mathbf{> 100.000}$ | Unbegrenzt (pixelweise) |
| **Speicherverbrauch** | Sehr hoch ($\approx$ KB / Shape) | Sehr gering ($\approx$ Bytes) | Fest ($W \times H \times 4$ Bytes) |
| **Zoom-Verhalten** | Stufenlos scharf | **Stufenlos scharf** | Pixelig beim Hineinzoomen |
| **Interaktivität** | Direkt (`Click`, `Hover`) | Hit-Testing (`HitTest()`) | Koordinatenberechnung |
| **Typischer Einsatz** | UI-Icons, kleine Schemata | **Fachwerke, CAD, FE-Netze** | Wärmebilder, Partikelfelder |

---

### Zusammenfassung: Geometrie & Transformation

- **Vektorgrafiken** bieten auflösungsunabhängige, stufenlos skalierbare Darstellungen für technische Simulationsmodelle.
- Die **Koordinatentransformation** bildet kontinuierliche Weltkoordinaten ($+Y$ nach oben, Meter) auf diskrete Canvas-Koordinaten ($+Y$ nach unten, Pixel) ab:
  - **Uniform Scaling** ($s = \min(s_x, s_y)$ in $[\mathrm{px/m}]$) verhindert jede Verzerrung.
  - Zentrierungs-Offsets und `margin` garantieren eine saubere, vollständige Platzierung.
- Mittels **Vektoralgebra** (Orthogonalvektor $\vec{e}_u^\perp$) werden Pfeilschäfte und Spitzen analytisch ohne Winkelfunktionen berechnet.
- Bemaßungsketten nach **DIN 406** verknüpfen Maßhilfslinien, Maßlinien mit Pfeilen und zentrierte Maßzahlen.

---

### Zusammenfassung: Navigation & Performance

- Eine **`MatrixTransform`** am Canvas ermöglicht flüssiges, hardwarebeschleunigtes **Pan & Zoom** mit Zentrierung auf den Mauszeiger (`ScaleAt`).
- Bounding-Box Jittering beim Dragging wird durch **Einfrieren der Transformation** während des aktiven Ziehens vermieden.
- Die **`ScreenToWorld`**-Rücktransformation invertiert erst die Matrix und danach die Viewport-Projektion.
- Bei großen Datenmengen ($> 2.000$ Elemente) bricht der WPF `Shape`-Baum ein. **`DrawingVisual` / `DrawingContext`** bietet professionelle High-Performance-Vektorgrafik für komplexe Netze.
- **Freeze-Doktrin:** Alle `Pen`- und `Brush`-Objekte in Render-Schleifen müssen zwingend eingefroren werden.

---

### Laborübung Termin 03: Vektorgrafik auf Canvas

Vertiefende Hausübung (10 Pkt., Wahlmodell Track A oder B) – Details siehe [Aufgabenblatt 03](../../Uebungen/Termin_03_Vektorgrafik_Canvas/Aufgabenblatt.md):

<div class="columns">
<div class="two">

#### Track A: CAD-Fachwerkträger
- Pratt-/Warren-Träger (min. 8 Knoten, 13 Stäbe)
- Auto-Fit BoundingBox mit isotroper Skalierung
- Normgerechte DIN-406 Bemaßungsketten
- Analytische Pfeilspitzen für Lager- und Lastvektoren
- Drag & Drop der Knoten mit interaktivem Maustracking

</div>
<div class="two">

#### Track B: Radar / Blueprint-Sketcher
- **Option B.1 Space Radar:** Vektorschiff mit Pfeilspitzen für $\vec{v}, \vec{a}$, Distanzringe & Kursprädiktor
- **Option B.2 Blueprint Sketcher:** Interaktiver CAD-Editor mit Grid-Snapping & Stab-Aufspannen
- Stufenloses Pan & Zoom via `MatrixTransform`
- Saubere WPF Canvas / `DrawingVisual`-Architektur

</div>
</div>
