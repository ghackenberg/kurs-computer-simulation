---
marp: true
theme: fhooe
header: 'Kapitel 5: 3D-Visualisierung – Anhang: Normalen & Geometrieherleitung'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

<!-- _paginate: false -->
<!-- _header: "" -->
<!-- _footer: "" -->

![bg right](./Titelbild.jpg)

# Anhang: Mathematische Geometrieherleitung & Normalenvektoren

## Ergänzung zu Kapitel 5: 3D-Visualisierung mit OpenGL

Dieser Anhang vertieft die analytische Herleitung und manuelle Triangulation parametrischer 3D-Grundkörper:

- Kugelkoordinaten & Normalen auf der Einheitskugel
- Parametrisierung von Zylindern, Kegeln und Kegelstümpfen
- 2D-Querschnitts-Herleitung der Kegel- und Zylindernormalen
- 3D-Rotation des Normalenvektors um die Symmetrieachse
- Triangulation via `GL_QUAD_STRIP` und `GL_TRIANGLE_FAN`

---

## A.1: Analytische Herleitung der Kugelkoordinaten

<div class="columns">
<div class="two">

### Parametrisierung der Kugeloberfläche

Jeder Punkt $P(x, y, z)$ einer Kugel mit Radius $r$ lässt sich über zwei Winkel beschreiben:

- **Polarwinkel $\phi \in [0, \pi]$**: Winkel von der positiven Y-Achse ($0 = \text{Nordpol}$, $\pi = \text{Südpol}$).
- **Azimutwinkel $\theta \in [0, 2\pi]$**: Winkel in der XZ-Ebene um die Y-Achse.

Diskrete Abtastung mit `stacks` ($i = 0 \dots \text{stacks}$) und `slices` ($j = 0 \dots \text{slices}$):

$$\phi_i = \frac{i}{\text{stacks}} \cdot \pi, \quad \theta_j = \frac{j}{\text{slices}} \cdot 2\pi$$

</div>
<div>

![width:1000px](./Illustrationen/Sphere_Slices_Stacks.png)

</div>
</div>

---

### Kartesische Koordinaten der Kugel

Die Umrechnung der sphärischen Parameter $(\phi, \theta)$ in kartesische Koordinaten $(x, y, z)$ erfolgt trigonometrisch:

<div class="columns top">
<div>

**Analytische Gleichungen:**

$$x = r \cdot \sin(\phi) \cdot \cos(\theta)$$
$$y = r \cdot \cos(\phi)$$
$$z = r \cdot \sin(\phi) \cdot \sin(\theta)$$

- Am Nordpol ($\phi = 0$): $(0, r, 0)$.
- Am Äquator ($\phi = \frac{\pi}{2}$): $(r\cos\theta, 0, r\sin\theta)$.
- Am Südpol ($\phi = \pi$): $(0, -r, 0)$.

</div>
<div>

**C#-Implementierung:**

```csharp
private (float x, float y, float z) ComputeCoordinate(
    float radius, int i, int j)
{
    float phi = i / (float)stacks * (float)Math.PI;
    float theta = j / (float)slices * 2.0f * (float)Math.PI;

    float x = radius * (float)(Math.Sin(phi) * Math.Cos(theta));
    float y = radius * (float)Math.Cos(phi);
    float z = radius * (float)(Math.Sin(phi) * Math.Sin(theta));

    return (x, y, z);
}
```

</div>
</div>

---

### Berechnung der Kugel-Normalenvektoren

Für die Phong-Beleuchtung benötigt OpenGL an jedem Vertex einen normierten Normalenvektor $\vec{n}$ mit $\|\vec{n}\| = 1$.

<div class="columns top">
<div>

**Mathematische Eigenschaft:**

Da eine Kugel punktsymmetrisch zum Ursprung ist, steht der Ortsvektor $\vec{p} = (x, y, z)^T$ in jedem Oberflächenpunkt exakt senkrecht auf der Tangentialebene:

$$\vec{n}_{\phi,\theta} = \frac{\vec{p}}{\|\vec{p}\|} = \frac{1}{r} \begin{pmatrix} x \\ y \\ z \end{pmatrix} = \begin{pmatrix} \sin(\phi) \cos(\theta) \\ \cos(\phi) \\ \sin(\phi) \sin(\theta) \end{pmatrix}$$

Der Normalenvektor entspricht identisch den Koordinaten des Punktes auf einer **Einheitskugel** ($r = 1$).

</div>
<div>

**C#-Normalen-Berechnung:**

```csharp
private void SphereVertexNormal(OpenGL gl, int i, int j)
{
    // Einheitskugel liefert direkt die Einheitsnormale
    (float nx, float ny, float nz) = 
        ComputeCoordinate(1.0f, i, j);

    // Normalenvektor an OpenGL übergeben
    gl.Normal(nx, ny, nz);
}
```

</div>
</div>

---

### Triangulation der Kugel via Quad-Strips & Triangle-Fans

Um die Kugeloberfläche mit OpenGL effizient zu zeichnen, wird die Kugel in Streifen zerlegt:

- **Polkappen**: Nord- und Südpol werden durch `GL_TRIANGLE_FAN` geschlossen. Der Mittelpunkt ist der jeweilige Pol, die Fächerknoten liegen auf dem ersten bzw. letzten Breitenkreis.
- **Bauchbinden**: Die Zonen zwischen zwei aufeinanderfolgenden Breitengraden ($i$ und $i+1$) werden als geschlossener `GL_QUAD_STRIP` erzeugt.

```csharp
for (int i = 0; i < stacks; i++)
{
    gl.Begin(OpenGL.GL_QUAD_STRIP);
    for (int j = 0; j <= slices; j++)
    {
        SphereVertexNormal(gl, i, j);
        var p1 = ComputeCoordinate(Radius, i, j);
        gl.Vertex(p1.x, p1.y, p1.z);

        SphereVertexNormal(gl, i + 1, j);
        var p2 = ComputeCoordinate(Radius, i + 1, j);
        gl.Vertex(p2.x, p2.y, p2.z);
    }
    gl.End();
}
```

---

## A.2: Parametrisierung von Zylinder, Kegel & Kegelstumpf

<div class="columns">
<div class="two">

### Geometrische Modellierung

Ein rotationssymmetrischer Körper entlang der Y-Achse mit Höhe $h$, unterem Radius $r_1$ und oberem Radius $r_2$:

- $r_1 = r_2$: Kreiszylinder
- $r_1 > 0, r_2 = 0$: Kreiskegel mit Spitze oben
- $r_1 \neq r_2 > 0$: Allgemeiner Kegelstumpf

**Abtastparameter:**
- $\phi \in [0, 1]$: Relative Höhe entlang der Achse.
- $\theta \in [0, 2\pi]$: Umlaufwinkel in der XZ-Ebene.
- $r(\phi) = r_1 + \phi \cdot (r_2 - r_1)$: Linear interpolierter Radius.

</div>
<div>

![width:1000px](./Illustrationen/Cylinder_Slices.png)

</div>
</div>

---

### Koordinatenberechnung in C#

<div class="columns top">
<div>

**Formeln:**

$$\phi_i = \frac{i}{\text{stacks}}, \quad \theta_j = \frac{j}{\text{slices}} \cdot 2\pi$$

$$r(\phi_i) = r_1 + \phi_i \cdot (r_2 - r_1)$$

$$x = r(\phi_i) \cdot \cos(\theta_j)$$
$$y = h \cdot \phi_i$$
$$z = r(\phi_i) \cdot \sin(\theta_j)$$

</div>
<div>

**C#-Methode:**

```csharp
private (float x, float y, float z) ComputeCoordinate(
    int i, int j)
{
    float phi = i / (float)Stacks;
    float theta = (float)Math.PI * 2.0f / Slices * j;
    float r = Radius1 + phi * (Radius2 - Radius1);

    float x = r * (float)Math.Cos(theta);
    float y = Length * phi;
    float z = r * (float)Math.Sin(theta);

    return (x, y, z);
}
```

</div>
</div>

---

<div class="columns">
<div class="two">

### Herleitung der Zylinder-Normalen in 2D

Die Herleitung erfolgt über einen Schnitt in der XY-Ebene ($\theta = 0$):

1. **Eckpunkte der Mantellinie**:
   - $P_1 = (r_1, 0)$
   - $P_2 = (r_2, h)$
2. **Richtungsvektor der Mantellinie**:
   $$\vec{v} = P_2 - P_1 = \begin{pmatrix} r_2 - r_1 \\ h \end{pmatrix}$$
3. **Orthogonalitätsbedingung ($\vec{v} \cdot \vec{n}_{2D} = 0$)**:
   $$\vec{n}_{2D} = \begin{pmatrix} h \\ -(r_2 - r_1) \end{pmatrix} = \begin{pmatrix} h \\ r_1 - r_2 \end{pmatrix}$$
   Zeigt für $h > 0$ stets nach außen.

</div>
<div>

![width:1000px](./Diagramme/Zylindernormale%20-%20Normalenvektor%20XY.svg)

</div>
</div>

---

<div class="columns">
<div class="two">

### 3D-Rotation des Normalenvektors

Um den 3D-Normalenvektor $\vec{P}_\theta$ für jeden Winkel $\theta$ zu erhalten, wird der 2D-Vektor $\vec{n}_{2D}$ um die Y-Achse rotiert:

- Die vertikale Komponente $n_y = r_1 - r_2$ bleibt unverändert.
- Die radiale Komponente $n_x = h$ projiziert sich auf X und Z:
  $$P_x = h \cdot \cos(\theta)$$
  $$P_y = r_1 - r_2$$
  $$P_z = h \cdot \sin(\theta)$$

$$\vec{P}_\theta = \begin{pmatrix} h \cdot \cos(\theta) \\ r_1 - r_2 \\ h \cdot \sin(\theta) \end{pmatrix}$$

</div>
<div>

![width:1000px](./Diagramme/Zylindernormale%20-%20Normalenvektor%20XZ.svg)

</div>
</div>

---

### Implementierung der Zylinder-Normalen in C#

Zur Verwendung in OpenGL muss der analytische Vektor noch auf die euklidische Länge 1 normiert werden:

```csharp
private (float nx, float ny, float nz) ComputeNormal(int j)
{
    float theta = (float)Math.PI * 2.0f / slices * j;

    // Unnormierter Normalenvektor aus der 2D/3D-Herleitung
    float nx = Length * (float)Math.Cos(theta);
    float ny = Radius1 - Radius2;
    float nz = Length * (float)Math.Sin(theta);

    // Euklidische Norm berechnen
    float norm = (float)Math.Sqrt(nx * nx + ny * ny + nz * nz);

    return (nx / norm, ny / norm, nz / norm);
}
```

> [!NOTE]
> Für den Spezialfall eines geraden Zylinders ($r_1 = r_2$) ist $n_y = 0$. Die Normale vereinfacht sich zu $(\cos\theta, 0, \sin\theta)^T$, was exakt dem horizontalen Einheitskreis entspricht.

---

### Triangulation des Zylindermantels

Der Zylindermantel wird analog zur Kugel als umlaufender `GL_QUAD_STRIP` erzeugt:

```csharp
for (int i = 0; i < Stacks; i++)
{
    gl.Begin(OpenGL.GL_QUAD_STRIP);
    for (int j = 0; j <= Slices; j++)
    {
        var n = ComputeNormal(j);
        gl.Normal(n.nx, n.ny, n.nz);

        var pBottom = ComputeCoordinate(i, j);
        gl.Vertex(pBottom.x, pBottom.y, pBottom.z);

        var pTop = ComputeCoordinate(i + 1, j);
        gl.Vertex(pTop.x, pTop.y, pTop.z);
    }
    gl.End();
}
```

Deck- und Bodenflächen (falls $r_1 > 0$ bzw. $r_2 > 0$) werden mit `GL_TRIANGLE_FAN` und den konstanten Normalen $(0, -1, 0)$ bzw. $(0, +1, 0)$ versiegelt.
