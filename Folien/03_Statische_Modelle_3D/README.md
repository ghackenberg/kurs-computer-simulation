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

### Was ist OpenGL?

- **Open Graphics Library**
- Eine plattform- und programmiersprachenübergreifende **API** zur Erzeugung von 2D- und 3D-Computergrafik.
- Es ist ein **Standard**, der von Grafikkartenherstellern implementiert wird.
- Es bietet eine Schnittstelle, um der **GPU (Graphics Processing Unit)** Befehle zum Zeichnen zu geben.
- Wir betrachten hier "klassisches" (fixed-function) OpenGL, wie es in `SharpGL` oft für einfache Darstellungen genutzt wird.

---

TODO SharpGL OpenGLControl

---

TODO SharpGL OpenGLControl Initialize Ereignisroutine

---

TODO Clear Color

---

TODO Umgebungslicht

---

TODO Punktlicht (Position / Ambient / Diffuse / Specular)

---

TODO Schattierungsmodus

---

TODO Depth Test

---

TODO SharpGL OpenGLControl Draw Ereignisroutine

---

TODO Clear Color / Depth Buffer

---

TODO OpenGL Primitives (Lines / Triangles / Quads)

---

TODO Material (Ambient / Diffuse / Specular)

---

TODO OpenGL LoadIdentity

---

TODO OpenGL Translate / Rotate / Scale

---

TODO OpenGL PushMatrix / PopMatrix

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

TODO

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
