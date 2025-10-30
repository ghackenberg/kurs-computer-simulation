---
marp: true
theme: fhooe
header: 'Kapitel 3: Statische Modelle (3D)'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

# Kapitel 3: TODO

---

## 3.1: Erweiterung auf 3D

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

<div class="columns">
<div>

### Die größte Herausforderung: Visualisierung

- Während die Berechnung eine reine Erweiterung der Dimension ist, stellt die Visualisierung eine neue Herausforderung dar.
- Wir müssen eine 3D-Szene auf einen 2D-Bildschirm projizieren.
- Dies ist die Aufgabe der **3D-Grafikpipeline**, die typischerweise mit APIs wie **OpenGL** oder **DirectX** gesteuert wird.

</div>
<div>

TODO

</div>
</div>

---

### Was ist OpenGL?

- **Open Graphics Library**
- Eine plattform- und programmiersprachenübergreifende **API** (Application Programming Interface) zur Erzeugung von 2D- und 3D-Computergrafik.
- Es ist ein **Standard**, der von Grafikkartenherstellern implementiert wird.
- Es bietet eine Schnittstelle, um der **GPU (Graphics Processing Unit)** Befehle zum Zeichnen zu geben.
- Wir betrachten hier "klassisches" (fixed-function) OpenGL, wie es in `SharpGL` oft für einfache Darstellungen genutzt wird.

---

### OpenGL als Zustandsmaschine

- Man kann sich OpenGL als eine große Maschine mit sehr vielen Schaltern und Einstellungen vorstellen.
- **Beispiele für Zustände**:
    - Aktuelle Zeichenfarbe
    - Aktuelle Transformationsmatrix
    - Ist die Beleuchtung aktiviert?
    - Ist der Tiefentest aktiviert?
- **Befehle**:
    - `glColor3f(1, 0, 0)`: Setzt die aktuelle Farbe auf Rot. Alle danach gezeichneten Objekte sind rot, bis die Farbe wieder geändert wird.
    - `glEnable(GL_LIGHTING)`: Schaltet die Beleuchtung ein.

---

### Die Grafik-Pipeline (Fixed-Function, stark vereinfacht)

Der Weg von einem 3D-Punkt (Vertex) zu einem farbigen Pixel auf dem Bildschirm.

1.  **Vertex-Transformation**: Der Vertex wird mit der ModelView- und Projection-Matrix transformiert.
2.  **Primitive Assembly**: Aus den transformierten Vertices werden Primitiven (Linien, Dreiecke) zusammengesetzt.
3.  **Rasterisierung**: Die Primitiven werden in Fragmente (Pixel-Kandidaten) umgewandelt.
4.  **Fragment-Verarbeitung**: Beleuchtung und Texturierung werden angewendet, um die endgültige Farbe des Fragments zu bestimmen.
5.  **Per-Fragment Operations**: Tiefentest, Blending, etc. entscheiden, ob und wie das Fragment in den Framebuffer geschrieben wird.

---

### Framebuffer: Die "Leinwand" der GPU

Der **Framebuffer** ist ein Speicherbereich auf der GPU, der alle für die Darstellung relevanten Informationen enthält.

- **Color Buffer**: Speichert die Farbinformation (RGBA) für jedes einzelne Pixel des Ausgabebildes. Das ist das, was man am Ende sieht.
- **Depth Buffer (Z-Buffer)**: Speichert für jedes Pixel einen Tiefenwert (meist zwischen 0.0 und 1.0).
- **Stencil Buffer**: Ein weiterer Buffer für komplexere Effekte (hier nicht im Detail behandelt).

---

### Der Depth Buffer: Verdeckungen lösen

- **Problem**: Wenn wir zwei Dreiecke zeichnen, die sich überlappen, welches ist vorne?
- **Lösung**: Der **Tiefentest (Depth Test)**.
- Muss explizit aktiviert werden: `glEnable(GL_DEPTH_TEST)`.
- **Funktionsweise**:
    1. Bevor ein Pixel gezeichnet wird, wird sein Z-Wert (Abstand zur Kamera) mit dem bereits im Depth Buffer gespeicherten Z-Wert an dieser Pixel-Position verglichen.
    2. Ist der neue Z-Wert **kleiner** (näher an der Kamera), wird das Pixel gezeichnet und der Depth Buffer mit dem neuen, kleineren Z-Wert aktualisiert.
    3. Ist der neue Z-Wert größer, wird das Pixel verworfen (da es von etwas verdeckt wird).
- **Wichtig**: Der Depth Buffer muss vor jedem neuen Frame gelöscht werden! `glClear(GL_DEPTH_BUFFER_BIT)`.

---

### Clearing Buffers

- Vor dem Zeichnen eines neuen Bildes (Frames) müssen die Buffer zurückgesetzt werden.
- `glClearColor(r, g, b, a)`: Legt die "Löschfarbe" fest (Hintergrundfarbe).
- `glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)`: Löscht den Color Buffer mit der Löschfarbe und den Depth Buffer auf seinen Maximalwert.

```csharp
// In der Render-Methode (wird für jeden Frame aufgerufen)
var gl = openGLControl.OpenGL;

// 1. Hintergrundfarbe setzen und Buffer löschen
gl.ClearColor(0.1f, 0.2f, 0.3f, 1.0f); // Dunkelblau
gl.Clear(OpenGL.GL_COLOR_BUFFER_BIT | OpenGL.GL_DEPTH_BUFFER_BIT);

// ... hier kommen die Zeichenbefehle ...
```

---

### Koordinatensysteme und Transformationen

Der Kern der 3D-Grafik: Punkte von einem Koordinatensystem in ein anderes zu überführen.

1.  **Objektkoordinaten (Model Space)**: Die Koordinaten, in denen ein Objekt modelliert wurde (z.B. der Ursprung ist die Mitte des Objekts).
2.  **Weltkoordinaten (World Space)**: Positioniert die Objekte in der globalen 3D-Szene.
3.  **Kamerakoordinaten (View Space)**: Transformiert die Welt so, dass die Kamera im Ursprung ist und in die negative Z-Richtung blickt.
4.  **Clip Space**: Projiziert die 3D-Szene auf einen 2D-Bereich.
5.  **Bildschirmkoordinaten (Screen Space)**: Skaliert das Ergebnis auf die Pixel des Fensters.

---

### Die OpenGL-Matrizen

OpenGL verwaltet die Transformationen mit zwei Hauptmatrizen:

- **Projection Matrix**: Zuständig für die Transformation von Kamera- in den Clip-Space (Schritt 4).
- **ModelView Matrix**: Zuständig für die Transformation von Objekt- in den Kamera-Space (Schritte 1-3).

Man muss OpenGL sagen, welche Matrix man gerade bearbeiten möchte:
`glMatrixMode(GL_PROJECTION)` oder `glMatrixMode(GL_MODELVIEW)`.

---

### Die Projection Matrix

- Definiert das **Sichtvolumen (Viewing Frustum)**. Alles außerhalb dieses Volumens wird weggeschnitten (clipping).
- **Perspektivische Projektion (`gluPerspective`)**:
    - Objekte, die weiter weg sind, erscheinen kleiner.
    - Erzeugt eine realistische Tiefenwahrnehmung.
    - Parameter: Öffnungswinkel (fov), Seitenverhältnis (aspect), nahe und ferne Clipping-Ebene (zNear, zFar).
- **Orthographische Projektion (`glOrtho`)**:
    - Keine perspektivische Verkürzung, parallele Linien bleiben parallel.
    - Nützlich für technische Zeichnungen, 2D-Darstellungen oder UI-Elemente.

---

### Setup der Projection Matrix

```csharp
// Typischer Code am Anfang oder bei Größenänderung des Fensters
var gl = openGLControl.OpenGL;
gl.MatrixMode(OpenGL.GL_PROJECTION);
gl.LoadIdentity(); // Matrix zurücksetzen

// Perspektivische Projektion
// fov=60°, aspect=width/height, near=0.1, far=1000
gl.Perspective(60.0f, (double)Width / (double)Height, 0.1, 1000.0);
```

---

### Die ModelView Matrix

- Ist eine Kombination aus **Model-Transformation** und **View-Transformation**.
- **View-Transformation (`gluLookAt`)**: Definiert die Kamera.
    - Position der Kamera (eye).
    - Punkt, auf den die Kamera schaut (center).
    - "Oben"-Vektor der Kamera (up), typischerweise (0, 1, 0).
- **Model-Transformation**: Positioniert das Objekt in der Welt.
    - `glTranslate(x, y, z)`: Verschieben.
    - `glRotate(angle, x, y, z)`: Rotieren um eine Achse.
    - `glScale(x, y, z)`: Skalieren.

---

### Setup der ModelView Matrix

```csharp
// In der Render-Methode
var gl = openGLControl.OpenGL;
gl.MatrixMode(OpenGL.GL_MODELVIEW);
gl.LoadIdentity(); // Matrix zurücksetzen

// 1. Kamera positionieren (View-Transformation)
// Kamera bei (5,5,5), schaut auf (0,0,0), Y ist oben
gl.LookAt(5, 5, 5, 0, 0, 0, 0, 1, 0);

// 2. Objekt transformieren (Model-Transformation)
// Verschiebe das Fachwerk um (1,0,0)
gl.Translate(1.0f, 0.0f, 0.0f);
// Rotiere es um 45 Grad um die Y-Achse
gl.Rotate(45.0f, 0.0f, 1.0f, 0.0f);

// ... jetzt das Fachwerk zeichnen ...
```
**Wichtig**: Die Transformationen werden in umgekehrter Reihenfolge angewendet! (Zuerst Skalieren, dann Rotieren, dann Verschieben).

---

### Zeichnen von Primitiven

- Der grundlegende Weg, um Geometrie zu definieren.
- Man beginnt einen Zeichenblock mit `gl.Begin(...)` und beendet ihn mit `gl.End()`.
- Der Parameter von `gl.Begin` bestimmt, **wie** die folgenden Vertices interpretiert werden.

---

### Primitiv-Typen

- `GL_POINTS`: Jeder Vertex ist ein Punkt.
- `GL_LINES`: Je zwei Vertices bilden eine Linie.
- `GL_LINE_STRIP`: Die Vertices werden zu einer durchgehenden Linie verbunden.
- `GL_LINE_LOOP`: Wie `GL_LINE_STRIP`, aber der letzte Vertex wird mit dem ersten verbunden.
- `GL_TRIANGLES`: Je drei Vertices bilden ein gefülltes Dreieck.
- `GL_QUADS`: Je vier Vertices bilden ein gefülltes Viereck.
- `GL_POLYGON`: Die Vertices bilden ein gefülltes Polygon.

---

### Beispiel: Ein Dreieck und eine Linie zeichnen

```csharp
var gl = openGLControl.OpenGL;

// Zeichne eine rote Linie
gl.Color(1.0f, 0.0f, 0.0f); // Farbe auf Rot setzen
gl.Begin(OpenGL.GL_LINES);
    gl.Vertex(0.0f, 0.0f, 0.0f);
    gl.Vertex(1.0f, 1.0f, 0.0f);
gl.End();

// Zeichne ein grünes Dreieck
gl.Color(0.0f, 1.0f, 0.0f); // Farbe auf Grün setzen
gl.Begin(OpenGL.GL_TRIANGLES);
    gl.Vertex(0.0f, 0.0f, 0.0f);
    gl.Vertex(1.0f, 0.0f, 0.0f);
    gl.Vertex(0.5f, 1.0f, 0.0f);
gl.End();
```

---

### Beleuchtung

- Ohne Beleuchtung sehen 3D-Objekte flach aus. Die Farbe eines Pixels ist einfach die Grundfarbe, die mit `glColor` gesetzt wurde.
- Die Beleuchtung simuliert, wie Licht von der Oberfläche eines Objekts reflektiert wird, und erzeugt so den Eindruck von Tiefe und Form.
- Muss aktiviert werden: `glEnable(GL_LIGHTING)`.

---

### Komponenten des Beleuchtungsmodells (Phong)

OpenGL verwendet ein einfaches, aber effektives Beleuchtungsmodell, das sich aus drei Komponenten zusammensetzt:

- **Ambient (Umgebungslicht)**: Eine Grundhelligkeit, die von überall zu kommen scheint. Verhindert, dass Flächen im Schatten komplett schwarz sind.
- **Diffuse (diffuses Licht)**: Licht von einer gerichteten Lichtquelle, das von einer matten Oberfläche in alle Richtungen gleichmäßig gestreut wird. Die Helligkeit hängt vom Winkel zwischen Lichtstrahl und Oberflächennormale ab.
- **Specular (Glanzlicht)**: Erzeugt Glanzlichter auf glatten Oberflächen. Die Helligkeit hängt zusätzlich von der Kameraposition ab.

---

### Was wird für die Beleuchtung benötigt?

1.  **Lichtquellen aktivieren und definieren**:
    - `glEnable(GL_LIGHT0)`
    - `glLightfv(GL_LIGHT0, GL_POSITION, ...)`: Position der Lichtquelle.
    - `glLightfv(GL_LIGHT0, GL_DIFFUSE, ...)`: Farbe des diffusen Lichts.
2.  **Materialien für die Objekte definieren**:
    - `glMaterialfv(GL_FRONT, GL_DIFFUSE, ...)`: Wie reflektiert das Material diffuses Licht?
    - `glMaterialfv(GL_FRONT, GL_SPECULAR, ...)`: Wie stark glänzt das Material?
3.  **Normalenvektoren für die Vertices definieren**:
    - Der **Normalenvektor** (kurz: Normale) ist ein Vektor, der senkrecht auf der Oberfläche steht.
    - Er ist **entscheidend** für die Berechnung, wie viel Licht eine Fläche empfängt.
    - `glNormal3f(nx, ny, nz)`

---

### Normalenvektoren

- Für eine flache Oberfläche (z.B. ein Dreieck) ist die Normale für alle Vertices gleich. Sie kann aus zwei Kantenvektoren des Dreiecks per Kreuzprodukt berechnet werden.
- Für gekrümmte Oberflächen hat jeder Vertex seine eigene Normale (Vertex Normal), um weiche Übergänge zu simulieren (Gouraud Shading).
- OpenGL muss die Normalen kennen, **bevor** der Vertex definiert wird.
- `glEnable(GL_NORMALIZE)`: Sorgt dafür, dass die Normalenvektoren immer die Länge 1 haben, auch wenn das Objekt skaliert wird.

---

### Beispiel: Beleuchtetes Dreieck

```csharp
var gl = openGLControl.OpenGL;

gl.Enable(GL_LIGHTING);
gl.Enable(GL_LIGHT0);

// Material für das Dreieck (z.B. grüner Kunststoff)
float[] mat_diffuse = { 0.1f, 0.8f, 0.2f, 1.0f };
gl.Material(OpenGL.GL_FRONT, OpenGL.GL_DIFFUSE, mat_diffuse);

gl.Begin(OpenGL.GL_TRIANGLES);
    // Normale für die ganze Fläche (zeigt aus dem Bildschirm heraus)
    gl.Normal(0.0f, 0.0f, 1.0f);

    gl.Vertex(0.0f, 0.0f, 0.0f);
    gl.Vertex(1.0f, 0.0f, 0.0f);
    gl.Vertex(0.5f, 1.0f, 0.0f);
gl.End();
```

---

# Zusammenfassung Kapitel 3

- Die Erweiterung auf **3D** ist konzeptionell einfach, erhöht aber die Größe der Gleichungssysteme.
- Die **Visualisierung** erfordert eine komplexe **Grafik-Pipeline** (3D) mit Konzepten wie Matrizen, Buffern und Beleuchtung.
