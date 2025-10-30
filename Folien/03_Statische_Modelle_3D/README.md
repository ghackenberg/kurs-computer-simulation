---
marp: true
theme: fhooe
header: 'Kapitel 3: Statische Modelle (3D)'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

![bg right](./Titelbild.jpg)

# Kapitel 3: Statische Modelle in 3D

Dieses Kapitel umfasst die folgenden Inhalte:

- 3.1: Erweiterung der Berechnungsmodelle auf 3D
- 3.2: Grundlagen der 3D-Visualisierung mit OpenGL
- 3.3: Strukturierung komplexer Szenen mit Szenengraphen

---

## 3.1: Erweiterung der Berechnungsmodelle auf 3D

Dieser Abschnitt umfasst die folgenden Inhalte:

- Erweiterung der Freiheitsgrade von 2D auf 3D
- Anpassung des idealen Fachwerk-Modells für 3D
- Anpassung des elastischen Fachwerk-Modells für 3D

---

### Vom 2D- zum 3D-Fachwerk

Die grundlegenden physikalischen Prinzipien (Kräftegleichgewicht, Hooke\'sches Gesetz) bleiben exakt gleich. Die Mathematik wird lediglich um eine Dimension erweitert:

<div class="columns top">
<div class="one">

**2D**
- Knoten haben 2 Freiheitsgrade (DOF): $u_x, u_y$.
- Gleichgewicht in 2 Richtungen: $\sum F_x = 0, \sum F_y = 0$.
- Geometrie durch Vektoren in $\mathbb{R}^2$.

</div>
<div class="one">

**3D**
- Knoten haben 3 Freiheitsgrade (DOF): $u_x, u_y, u_z$.
- Gleichgewicht in 3 Richtungen: $\sum F_x = 0, \sum F_y = 0, \sum F_z = 0$.
- Geometrie durch Vektoren in $\mathbb{R}^3$.

</div>
</div>

---

<div class="columns">
<div>

### Ideales Fachwerk in 3D

- **Knotenpunktverfahren**: An jedem Knoten werden nun **drei** Gleichgewichtsgleichungen aufgestellt.
- Für ein Fachwerk mit $k$ Knoten, $s$ Stäben und $l$ Lagerreaktionen muss gelten: $3k = s + l$ (statische Bestimmtheit).
- Das LGS $A \cdot x = b$ wird entsprechend größer, das Prinzip ist aber identisch. Die Koeffizienten in $A$ sind nun die Richtungskosinusse der Stäbe im 3D-Raum.

</div>
<div>

![](../../Quellen/WS25/IdealesFachwerk3D/Screenshot.png)

</div>
</div>

---

TODO Folie zu Kräftegleichgewicht in einem Knoten

---

TODO Folie zu Matrixdarstellung des Kräftegleichgewichts in einem Knoten

---

TODO Folie zu Gleichungssystem für mehrere Knoten

---

<div class="columns">
<div>

### Elastisches Fachwerk in 3D

- **Knotenverschiebungen**: Der Vektor $u$ enthält nun für jeden Knoten drei Komponenten ($u_x, u_y, u_z$).
- **Stab-Steifigkeitsmatrix**: Die $k_{stab}$ ist nun eine 6x6-Matrix, da sie die 3 Verschiebungen an beiden Enden des Stabes in Beziehung setzt.
- **Globale Steifigkeitsmatrix $K$**: Wird analog zum 2D-Fall assembliert, wird aber deutlich größer. Für ein Fachwerk mit $k$ Knoten ist $K$ eine $3k \times 3k$ Matrix.
- Die Lösung $K \cdot u = f$ folgt dem gleichen Schema.

</div>
<div>

![](../../Quellen/WS25/ElastischesFachwerk3D/Screenshot.png)

</div>
</div>

---

## 3.2: Grundlagen der 3D-Visualisierung mit OpenGL

Dieser Abschnitt umfasst die folgenden Inhalte:

- Grundkonzepte von OpenGL (Zustandsmaschine, Grafik-Pipeline)
- Verwendung von Buffern (Color, Depth)
- Koordinatensysteme und Transformationen (Projection, ModelView)
- Zeichnen von Primitiven und Beleuchtung

---

<div class="columns">
<div>

### Was ist OpenGL?

- **Open Graphics Library**
- Eine plattform- und programmiersprachenübergreifende **API** zur Erzeugung von 2D- und 3D-Computergrafik.
- Es ist ein **Standard**, der von Grafikkartenherstellern implementiert wird.
- Es bietet eine Schnittstelle, um der **GPU (Graphics Processing Unit)** Befehle zum Zeichnen zu geben.
- Wir betrachten hier "klassisches" (fixed-function) OpenGL, wie es in `SharpGL` oft für einfache Darstellungen genutzt wird.

</div>
<div>

![](https://upload.wikimedia.org/wikipedia/commons/e/e9/Opengl-logo.svg)

</div>
</div>

---

### Einbindung mit SharpGL

Die `SharpGL.WPF`-Bibliothek stellt ein `OpenGLControl` für die einfache Integration von OpenGL-Funktionalität in WPF-Anwendungen bereit.

- Es ist ein WPF-`Control`, das eine Zeichenfläche für OpenGL bzw. die Grafikkarte (z.B. Nvidia) zur Verfügung stellt.
- Es stellt zwei zentrale Ereignisse für die Initialisierung und das Zeichnen bereit: `OpenGLInitialized` und `OpenGLDraw`.

Und so wird das `OpenGLControl`-Steuerelement in ein WPF-Fenster eingebunden (beachte den XML-Namensraum `xmlns:sharpGL`):

```xml
<Window xmlns:sharpGL="clr-namespace:SharpGL.WPF;assembly=SharpGL.WPF">
    <Grid>
        <sharpGL:OpenGLControl  OpenGLInitialized="OnInitialize" OpenGLDraw="OnDraw"/>
    </Grid>
</Window>
```

---

### Initialisierung der Szene: `OpenGLInitialized`

Die `OpenGLInitialized`-Ereignisroutine wird **einmalig** aufgerufen, wenn der OpenGL-Kontext bereit ist. Hier werden alle globalen Zustände gesetzt.

```csharp
private void OnInitialize(object sender, OpenGLRoutedEventArgs args)
{
    OpenGL gl = args.OpenGL;

    // 1. Hintergrundfarbe festlegen (Clear Color)
    
    // 2. Beleuchtung und Materialeigenschaften aktivieren
    
    // 3. Globales Umgebungslicht definieren
    
    // 4. Punktlichtquellen aktivieren und definieren
    
    // 5. Schattierungsmodus für weiche Farbübergänge
    
    // 6. Tiefentest für korrekte Verdeckungen aktivieren
}
```

---

<div class="columns">
<div>

### Hintergrundfarbe festlegen

Die `ClearColor`-Methode definiert die Farbe, mit der der Bildschirm bei jedem Frame geleert wird.

- Die Parameter sind die RGBA-Werte als `float` zwischen 0.0 und 1.0.
- Bei der Farbe *Schwarz* sind alle Werte auf Null gesetzt.
- Bei der Farbe *Weiß* sind hingegen alle Werte auf Eins gesetzt.

```csharp
// In der OnInitialize-Routine

// Setzt die Hintergrundfarbe auf ein Dunkelblau
gl.ClearColor(0.1f, 0.2f, 0.3f, 1.0f);
```

</div>
<div>

![width:1000px](https://upload.wikimedia.org/wikipedia/commons/8/83/RGB_Cube_Show_lowgamma_cutout_b.png)

</div>
</div>

---

<div class="columns">
<div>

### Beleuchtung & Material aktivieren

Damit Objekte auf Licht reagieren, muss die Lichtberechnung zunächst global aktiviert werden:

- `GL_LIGHTING`: Schaltet das gesamte Beleuchtungssystem ein.
- Ohne dies sind alle Objekte nur in ihrer Grundfarbe sichtbar.
- Die Beleuchtung verursacht die Schattierung der Oberflächen.

```csharp
// In der OnInitialize-Routine

// Aktiviert das Beleuchtungssystem
gl.Enable(OpenGL.GL_LIGHTING);
```

</div>
<div>

![width:1000px](https://www.dca.ufrn.br/~lmarcos/courses/compgraf/redbook/images/Image77.gif)

</div>
</div>

---

### Globales Umgebungslicht

Umgebungslicht (*Ambient Light*) sorgt dafür, dass auch die nicht direkt von einer Lichtquelle angestrahlten Flächen eines Objekts nicht komplett schwarz sind. Es simuliert indirekte Beleuchtung.

```csharp
// In der OnInitialize-Routine

// Definiert ein schwaches, weißes Umgebungslicht für die gesamte Szene
float[] ambientLight = { 0.2f, 0.2f, 0.2f, 1.0f };
gl.LightModel(OpenGL.GL_LIGHT_MODEL_AMBIENT, ambientLight);
```

---

### Punktlichtquelle definieren

Eine Punktlichtquelle strahlt von einer Position im Raum Licht ab. Man kann ihre Farbe für die diffuse und spiegelnde Reflexion getrennt definieren.

```csharp
// In der OnInitialize-Routine

// Aktiviert die erste Lichtquelle (GL_LIGHT0)
gl.Enable(OpenGL.GL_LIGHT0);

// Definiert die Eigenschaften von GL_LIGHT0
float[] lightPosition = { 2, 2, 5, 1 }; // Position (x, y, z, w=1 für Punktlicht)
float[] lightDiffuse = { 1, 1, 1, 1 };  // Helles, weißes diffuses Licht

gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_POSITION, lightPosition);
gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_DIFFUSE, lightDiffuse);
```

---

<div class="columns">
<div>

### Das Phong-Beleuchtungsmodell

Die Farbe eines Punktes auf einer Oberfläche wird als Summe von drei Komponenten berechnet:

$I_{f} = I_{a} + I_{d} + I_{s}$

- **Ambient**: Konstante Grundhelligkeit, simuliert indirektes Licht.
- **Diffuse**: Helligkeit basierend auf dem Winkel des Lichteinfalls, simuliert matte Oberflächen.
- **Specular**: Glanzlicht, das von der Kameraposi-tion abhängt, simuliert glänzende Oberflächen.

Jede dieser Komponenten wird für jede Lichtquelle berechnet und aufsummiert.

</div>
<div>

![width:900px](https://upload.wikimedia.org/wikipedia/commons/6/6b/Phong_components_version_4.png)

</div>
</div>

---

<div class="columns">
<div>

### Vektoren für die Beleuchtungsrechnung

Für die Berechnung werden an jedem Punkt der Oberfläche vier Vektoren benötigt:

- **$N$ (Normalenvektor)**: Vektor, der senkrecht von der Oberfläche weg zeigt.
- **$L$ (Lichtvektor)**: Vektor vom Oberflächenpunkt zur Lichtquelle.
- **$V$ (Betrachtungsvektor)**: Vektor vom Oberflächenpunkt zur Kamera.
- **$R$ (Reflexionsvektor)**: Vektor, in den der Lichtstrahl an der Oberfläche reflektiert wird. 

</div>
<div>

![width:1000px](./Diagramme/Phong%20-%20Vektoren.svg)

</div>
</div>

---

<div class="columns">
<div>

### **Ambient**-Komponente

Die Ambient-Komponente ist am einfachsten. Sie ist das Produkt aus der Lichtfarbe und der Materialfarbe für Umgebungslicht.

$I_{a} = \text{light}_{a} \cdot \text{material}_{a}$

- $\text{light}_{a}$: Farbe des globalen Umgebungslichts (z.B. `GL_LIGHT_MODEL_AMBIENT`).
- $\text{material}_{a}$: Ambient-Reflexionsvermögen des Materials (definiert mit `glMaterial`).

Diese Komponente ist für jeden Punkt eines Objekts gleich und sorgt für eine Grundhelligkeit.

</div>
<div>

![width:1000px](./Diagramme/Phong%20-%20Vektoren.svg)

</div>
</div>

---

<div class="columns">
<div>

### **Diffuse**-Komponente

Die Diffuse-Komponente hängt vom Winkel zwischen dem Normalenvektor $N$ und dem Lichtvektor $L$ ab. Je direkter das Licht auf die Oberfläche trifft, desto heller ist sie.

$I_{d} = \text{light}_{d} \cdot \text{material}_{d} \cdot \max(0, N \cdot L)$

- $N \cdot L$: Skalarprodukt der normalisierten Vektoren. Entspricht $\cos(\delta)$.
- $\max(0, ...)$: Sorgt dafür, dass von hinten beleuchtete Flächen nicht negativ beitragen.

</div>
<div>

![width:1000px](./Diagramme/Phong%20-%20Diffuse.svg)

</div>
</div>

---

<div class="columns">
<div>

### **Specular**-Komponente

Die Specular-Komponente erzeugt ein Glanzlicht und hängt vom Winkel zwischen dem Reflexionsvektor $R$ und dem Betrachtervektor $V$ ab.

$I_{s} = \text{light}_{s} \cdot \text{material}_{s} \cdot (\max(0, R \cdot V))^{\text{shininess}}$

- $R = 2(N \cdot L)N - L$: Berechnung des Reflexionsvektors.
- $\text{shininess}$: Ein Exponent, der die Größe und Schärfe des Glanzlichts steuert (definiert mit `glMaterial`). Je höher der Wert, desto kleiner und schärfer der Glanzpunkt.

</div>
<div>

![width:1000px](./Diagramme/Phong%20-%20Specular.svg)

</div>
</div>

---

<div class="columns">
<div>

### Kombination für **mehrere** Lichtquellen

Die finale Farbe eines Punktes ist die Summe der Ambient-Komponente (global) und der Summe der Diffuse- und Specular-Komponenten für *jede* aktive Lichtquelle.

$I_{f} = I_{a} + \sum_{i=1}^{n} (I_{\text{d}, i} + I_{\text{s}, i})$

- $I_{a}$: Globale Ambient-Komponente.
- $I_{\text{d}, i}$: Diffuser Beitrag der Lichtquelle $i$.
- $I_{\text{s}, i}$: Specular-Beitrag der Lichtquelle $i$.

In klassischem OpenGL wird diese Berechnung für bis zu 8 Lichtquellen (`GL_LIGHT0` bis `GL_LIGHT7`) automatisch durchgeführt.

</div>
<div>

![width:1000px](./Diagramme/Phong%20-%20Kombiniert.svg)

</div>
</div>

---

<div class="columns">
<div>

### Schattierungsmodus festlegen

Der Schattierungsmodus bestimmt, wie die Farben zwischen den Eckpunkten eines Polygons interpoliert werden.
- `GL_FLAT`: Das gesamte Polygon hat eine einzige Farbe.
- `GL_SMOOTH`: Die Farben werden zwischen den Eckpunkten interpoliert (Gouraud Shading).

```csharp
// In der OnInitialize-Routine

// Weiche Farbübergänge aktivieren
gl.ShadeModel(OpenGL.GL_SMOOTH);
```

</div>
<div>

![width:1000px](https://xoax.net/sub_cpp/crs_opengl/Lesson5/Image2.png)

</div>
</div>

---

<div class="columns">
<div class="two">

### Tiefentest aktivieren

Der Tiefentest (Depth Test) sorgt dafür, dass Objekte, die weiter von der Kamera entfernt sind, von näheren Objekten verdeckt werden.

```csharp
// In der OnInitialize-Routine

// Aktiviere den Tiefentest
gl.Enable(OpenGL.GL_DEPTH_TEST);
```

</div>
<div>

![](https://i.sstatic.net/uZhIF.png)

</div>
</div>

---

### Der Render-Loop: `OpenGLDraw`

Die `OpenGLDraw`-Ereignisroutine wird für jeden Frame wiederholt aufgerufen. Hier finden alle Zeichenoperationen statt.

```csharp
private void OnDraw(object sender, OpenGLRoutedEventArgs args)
{
    OpenGL gl = args.OpenGL;

    // 1. Buffer zurücksetzen (Farbe und Tiefe)
    gl.Clear(OpenGL.GL_COLOR_BUFFER_BIT | OpenGL.GL_DEPTH_BUFFER_BIT);

    // 2. ModelView-Matrix zurücksetzen
    gl.MatrixMode(OpenGL.GL_MODELVIEW);
    gl.LoadIdentity();

    // 3. Kamera positionieren
    gl.LookAt(5, 5, 5, 0, 0, 0, 0, 1, 0);

    // 4. Objekte zeichnen...
}
```

---

### Zeichnen von Primitiven

Geometrie wird innerhalb von `gl.Begin()` und `gl.End()` definiert. Der Parameter von `gl.Begin` legt fest, wie die folgenden Vertices interpretiert werden.

- `GL_POINTS`: Zeichnet für jeden Vertex einen einzelnen Punkt.
- `GL_LINES`: Zeichnet Linien zwischen je zwei Vertices (1-2, 3-4, ...).
- `GL_LINE_STRIP`: Zeichnet eine verbundene Linienkette (1-2, 2-3, 3-4, ...).
- `GL_LINE_LOOP`: Wie `GL_LINE_STRIP`, schließt aber die Lücke zwischen dem letzten und ersten Vertex.
- `GL_TRIANGLES`: Zeichnet für je drei Vertices ein separates, gefülltes Dreieck (1-2-3, 4-5-6, ...).
- `GL_TRIANGLE_STRIP`: Erzeugt eine Kette von Dreiecken, die sich Vertices teilen (1-2-3, 2-3-4, 3-4-5, ...).
- `GL_TRIANGLE_FAN`: Erzeugt einen Fächer von Dreiecken um den ersten Vertex (1-2-3, 1-3-4, 1-4-5, ...).
- `GL_QUADS`: Zeichnet für je vier Vertices ein separates, gefülltes Viereck (1-2-3-4, 5-6-7-8, ...).
- `GL_QUAD_STRIP`: Erzeugt eine Kette von Vierecken (1-2-4-3, 3-4-6-5, ...)

---

<div class="columns">
<div>

TODO Folie zu `GL_POINTS`

</div>
<div>

![width:1000px](./OpenGL_Primitives_Points.png)

</div>
</div>

---

<div class="columns">
<div>

TODO Folie zu `GL_LINES`

</div>
<div>

![width:1000px](./OpenGL_Primitives_Lines.png)

</div>
</div>

---

<div class="columns">
<div>

TODO Folie zu `GL_LINE_STRIP`

</div>
<div>

![width:1000px](./OpenGL_Primitives_LineStrip.png)

</div>
</div>

---

<div class="columns">
<div>

TODO Folie zu `GL_LINE_LOOP`

</div>
<div>

![width:1000px](./OpenGL_Primitives_LineLoop.png)

</div>
</div>

---

<div class="columns">
<div>

TODO Folie zu `GL_TRIANGLES`

</div>
<div>

![width:1000px](./OpenGL_Primitives_Triangles.png)

</div>
</div>

---

<div class="columns">
<div>

TODO Folie zu `GL_TRIANGLE_STRIP`

</div>
<div>

![width:1000px](./OpenGL_Primitives_TriangleStrip.png)

</div>
</div>

---

<div class="columns">
<div>

TODO Folie zu `GL_TRIANGLE_FAN`

</div>
<div>

![width:1000px](./OpenGL_Primitives_TriangleFan.png)

</div>
</div>

---

<div class="columns">
<div>

TODO Folie zu `GL_QUADS`

</div>
<div>

![width:1000px](./OpenGL_Primitives_Quads.png)

</div>
</div>

---

<div class="columns">
<div>

TODO Folie zu `GL_QUAD_STRIP`

</div>
<div>

![width:1000px](./OpenGL_Primitives_QuadStrip.png)

</div>
</div>

---

### Materialeigenschaften

Das Material definiert, wie eine Oberfläche Licht reflektiert. Die wichtigsten Eigenschaften sind:
- **Ambient**: Farbe des Objekts unter Umgebungslicht.
- **Diffuse**: Grundfarbe des Objekts, wenn es direkt beleuchtet wird.
- **Specular**: Farbe des Glanzlichts auf dem Objekt.

```csharp
// Definiere ein Material für glänzendes, rotes Plastik
float[] matDiffuse = { 1.0f, 0.0f, 0.0f, 1.0f };
float[] matSpecular = { 1.0f, 1.0f, 1.0f, 1.0f };

gl.Material(OpenGL.GL_FRONT, OpenGL.GL_DIFFUSE, matDiffuse);
gl.Material(OpenGL.GL_FRONT, OpenGL.GL_SPECULAR, matSpecular);
```

---

### Transformationen und der Matrix-Stack

Um Objekte unabhängig voneinander zu positionieren, nutzt OpenGL einen Matrix-Stack.

- `gl.PushMatrix()`: Speichert die aktuelle ModelView-Matrix.
- `gl.PopMatrix()`: Stellt die zuletzt gespeicherte Matrix wieder her.

```csharp
// Zeichne einen Planeten
gl.PushMatrix();
    gl.Rotate(planetRotation, 0, 1, 0);
    gl.Translate(5, 0, 0);
    // ... zeichne Planet ...

    // Zeichne einen Mond, der den Planeten umkreist
    gl.PushMatrix();
        gl.Rotate(moonRotation, 0, 1, 0);
        gl.Translate(1, 0, 0);
        // ... zeichne Mond ...
    gl.PopMatrix(); // Zurück zum Planeten-Koordinatensystem
gl.PopMatrix(); // Zurück zum Sonnen-Koordinatensystem
```

---

## 3.3: Strukturierung mit einem Szenengraphen

Dieser Abschnitt umfasst die folgenden Inhalte:

- Motivation und Konzept eines Szenengraphen
- Aufbau einer Szene aus Knoten, Transformationen und Gruppen
- Traversierung des Graphen zur Darstellung der Szene
- Umsetzung in C# am Beispiel der Vorlage

---

<div class="columns">
<div>

### Die Herausforderung: Komplexe Szenen

- Direkte OpenGL-Aufrufe für hunderte Objekte werden schnell unübersichtlich.
- Wie lassen sich Objekte gruppieren (z.B. ein Tisch mit vier Beinen)?
- Wie lassen sich Transformationen logisch vererben (z.B. ein Mond, der um einen Planeten rotiert, der um die Sonne rotiert)?

**Lösung**: Eine baumartige Datenstruktur zur Organisation der Szene – ein **Szenengraph**.

</div>
<div>

![Szenengraph-Struktur](./Diagramme/Szenengraph.svg)

</div>
</div>

---

### Das Konzept des Szenengraphen

Ein Szenengraph ist eine hierarchische Struktur (ein Baum), die alle Elemente einer 3D-Szene enthält.

- **Knoten (Nodes)**: Die Elemente im Baum. Jeder Knoten repräsentiert etwas in der Szene.
- **Wurzelknoten (Root Node)**: Der oberste Knoten, von dem die ganze Szene ausgeht.
- **Blattknoten (Leaf Nodes)**: Knoten am Ende der Äste. Sie enthalten die sichtbare Geometrie (z.B. ein 3D-Modell).
- **Gruppenknoten (Group Nodes)**: Knoten, die andere Knoten (Kinder) zusammenfassen. Sie definieren die Struktur.
- **Transformationen**: Jeder Knoten kann eine oder mehrere Transformationen (Verschiebung, Rotation, Skalierung) haben, die auch auf alle seine Kinder wirken.

---

<div class="columns">
<div>

### Umsetzung: Die Klassenstruktur

- **`Scene`**: Das Hauptobjekt. Enthält den `Root`-Knoten und globale Einstellungen wie Lichter und Hintergrundfarbe.
- **`Node`**: Die abstrakte Basisklasse für alle Knoten. Definiert eine Liste von `Transforms` und eine `Draw`-Methode.
- **`Group`**: Ein `Node`, der eine Liste von Kindern (`Node`s) besitzt. Erzeugt die Baumstruktur.
- **`Primitive` / `Volume`**: Konkrete `Node`-Typen, die Geometrie darstellen (Blattknoten).
- **`Transform`**: Basisklasse für `Translate`, `Rotate`, `Scale`.

</div>
<div>

![UML-Diagramm des Szenengraphen](../../Quellen/WS25/VorlageSzenengraph3D/Model.Scene.svg)

</div>
</div>

---

### Traversierung des Graphen

Das Zeichnen der Szene erfolgt durch eine **rekursive Traversierung** des Baumes, beginnend am Wurzelknoten.

```csharp
public void Draw(OpenGL gl)
{
    gl.PushMatrix(); // Aktuellen Zustand der ModelView-Matrix sichern

    // 1. Alle Transformationen DIESES Knotens anwenden
    foreach (Transform t in Transforms)
    {
        t.Apply(gl);
    }

    // 2. Die lokale Geometrie DIESES Knotens zeichnen
    DrawLocal(gl);

    gl.PopMatrix(); // Gesicherten Zustand wiederherstellen
}
```

---

<div class="columns">
<div class="two">

Folie zu Klasse `Transform`

</div>
<div>

![](../../Quellen/WS25/VorlageSzenengraph3D/Model.Transform.svg)

</div>
</div>

---

TODO Folie zu Klasse `Translate` (`Delta`)

---

TODO Folie zu Klasse `Rotate` (`Axis`, `Angle`)

---

TODO Folie zu Klasse `Scale` (`Factor`)

---

### Die `Group`-Klasse

Die `DrawLocal`-Methode eines `Group`-Knotens ist besonders einfach: Sie ruft lediglich die `Draw`-Methode all ihrer Kinder auf.

```csharp
// Aus der Klasse Group
protected override void DrawLocal(OpenGL gl)
{
    // Rufe die Draw-Methode für alle Kinder auf
    foreach (Node child in _children.Values)
    {
        child.Draw(gl);
    }
}
```

Durch diesen rekursiven Aufruf (`Group.Draw` -> `Child.Draw` -> ...) werden die Transformationen korrekt entlang der Baumhierarchie akkumuliert.

---

<div class="columns">
<div class="two">

TODO Folie zu Klasse `Primitive`

</div>
<div>

![](../../Quellen/WS25/VorlageSzenengraph3D/Model.Primitive.svg)

</div>
</div>

---

TODO Folie zu Methode `DrawLocal` der Klasse `Primitive`

---

TODO Folie zu Klasse `Points` (`Size`)

---

TODO Folie zu Klasse `Lines` (`Width`)

---

TODO Folie zu Klasse `Triangles`

---

TODO Folie zu Klasse `Quads`

---

<div class="columns">
<div class="two">

TODO Folie zu Klasse `Volume`

</div>
<div>

![](../../Quellen/WS25/VorlageSzenengraph3D/Model.Volume.svg)

</div>
</div>

---

<div class="columns">
<div class="two">

TODO Folie zu Klasse `Cube` (`SizeX`, `SizeY`, `SizeZ`)

</div>
<div>

![width:1000px](https://machinethink.net/images/3d-rendering/Geometry@2x.png)

</div>
</div>

---

<div class="columns">
<div class="two">

TODO Folie zu Klasse `Sphere` (`Radius`, `Slices`, `Stacks`)

</div>
<div>

![width:1000px](https://www.mbsoftworks.sk/tutorials/opengl4/022-cylinder-and-sphere/8_sllices_stacks_sphere.png)

</div>
</div>

---

<div class="columns">
<div class="two">

TODO Folie zu Klasse `Cone` (`Radius1`, `Radius2`, `Height`, `Slices`, `Stacks`)

</div>
<div>

![width:1000px](https://www.songho.ca/opengl/files/gl_cylinder03.png)

</div>
</div>

---

### Beispiel: Aufbau einer Szene

So wird in der Vorlage eine einfache Szene aufgebaut:

```csharp
// 1. Wurzelknoten erstellen
Group root = new Group("Root");

// 2. Transformationen auf die ganze Szene anwenden
root.Transforms.Add(new Translate(0, 0, -5)); // Alles nach hinten schieben
root.Transforms.Add(_rotate); // Eine globale Rotation hinzufügen

// 3. Geometrie-Knoten erstellen
Cube cube1 = new Cube("Cube1", 1, 1, 1, Material.RED);

// 4. Lokale Transformation auf den Würfel anwenden
cube1.Transforms.Add(new Translate(0, 0, -2));

// 5. Würfel als Kind zum Wurzelknoten hinzufügen
root.Add(cube1);

// 6. Szene mit dem Wurzelknoten erstellen
_scene = new Scene(Color.WHITE, Color.DARKGRAY, root);
```

---

# Zusammenfassung Kapitel 3

- Die Erweiterung statischer Modelle auf **3D** ist mathematisch eine Erweiterung der Vektoren und Matrizen um eine Dimension.
- Die **Visualisierung** wird deutlich komplexer und erfordert eine **Grafik-Pipeline** wie die von OpenGL.
- Ein **Szenengraph** ist eine essentielle Datenstruktur, um komplexe 3D-Szenen hierarchisch zu organisieren und Transformationen logisch zu vererben.
- Die Traversierung des Graphen mit `glPushMatrix` und `glPopMatrix` sorgt für die korrekte Anwendung der Transformationen auf die jeweiligen Objekte und deren Kinder.
