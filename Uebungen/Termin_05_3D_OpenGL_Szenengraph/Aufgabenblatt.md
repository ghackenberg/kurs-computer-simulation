# Aufgabenblatt 05: 3D-Visualisierung, SharpGL & Hierarchischer Szenengraph

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** B.Sc. Automatisierungstechnik, 5. Semester  
**Institution:** Fachhochschule Oberösterreich – Campus Wels  
**Bearbeitungsform:** 
- **Stufe A (In-Class Sprint):** Einzelarbeit oder 2er-Tandem (Labor, 60 min)
- **Stufe B (Homework Extension):** Festes 2er-Team (1 Woche, ca. 2–3 h pro Person)
**Technologie-Vorgabe:** C# 12 / .NET 8 oder .NET 10, WPF mit `SharpGL.WPF.OpenGLControl`.  
> [!CAUTION]
> **Vorgreif-Sperre für Termin 05:**  
> In dieser Einheit liegt der Fokus rein auf der **3D-Computergrafik, Kinematik und Szenengraph-Hierarchie via OpenGL**.  
> **KEIN** Multithreading (`Parallel.For`), **KEINE** numerischen Gleichungslöser (Math.NET Cholesky), **KEINE** kontinuierlichen S-Functions! Die Kinematik wird rein über geometrische Transformationsmatrizen auf dem OpenGL-Stack berechnet.

---

## 1. Lernziele (Intended Learning Outcomes - ILOs)

Nach erfolgreicher Bearbeitung dieses Aufgabenblattes können Sie:
1. **3D-Kameraführung & Kugelkoordinaten:** Eine kardanfehlerfreie (Gimbal-Lock-resistente) Orbit-Kamera mit Azimut $\theta$, Elevation $\phi$ und Radius $r$ in kartesische Weltkoordinaten umrechnen und mit `gluLookAt` anbinden.
2. **Hierarchischer Szenengraph & Matrix-Stack:** Mehrgliedrige mechatronische Kinematikketten durch kaskadiertes `glPushMatrix()` und `glPopMatrix()` in lokalen Koordinatensystemen aufbauen, sodass Subkomponenten ihren Elternkörpern automatisch folgen.
3. **Flächennormalen & Phong-Beleuchtungsmodell:** Diffuse, ambiente und spekulare Lichtreflexion (`GL_LIGHTING`) konfigurieren und korrekte Normalenvektoren (`glNormal3f`) für geometrische Primitive berechnen.
4. **Vorwärtskinematik:** Die Endeffektor-Position (Tool Center Point - TCP) aus Gelenkvariablen (Drehwinkel, Verfahrwege) analytisch bestimmen und mit der 3D-Grafikdarstellung zur Deckung bringen.
5. **Geometrische Interaktion & Kollisions-Snap:** Einfache Distanz- oder BoundingBox-Prüfungen in 3D implementieren, um Werkstücke oder Spielobjekte physikalisch plausibel aufzunehmen.

---

## 2. Mathematische Grundlagen

### 2.1 Kugelkoordinaten der Orbit-Kamera
Die Kamera blickt auf einen Zielpunkt $\vec{p}_{\text{look}} = [x_{\text{look}}, y_{\text{look}}, z_{\text{look}}]^\top$. Die Position der Kamera $\vec{p}_{\text{eye}}$ auf einer Kugelschale mit Radius $r$, Azimutwinkel $\theta \in [0, 2\pi)$ und Elevationswinkel $\phi \in \left(-\frac{\pi}{2}, +\frac{\pi}{2}\right)$ lautet (mit $Y$ als vertikaler Achse):
$$x_{\text{eye}} = x_{\text{look}} + r \cdot \cos \phi \cdot \sin \theta$$
$$y_{\text{eye}} = y_{\text{look}} + r \cdot \sin \phi$$
$$z_{\text{eye}} = z_{\text{look}} + r \cdot \cos \phi \cdot \cos \theta$$
> [!IMPORTANT]
> **Gimbal-Lock-Schutz:** Der Elevationswinkel $\phi$ muss im Code strikt auf z. B. $[-85^\circ, +85^\circ]$ begrenzt werden (`Math.Clamp`), da bei $\phi = \pm 90^\circ$ die Blickrichtung kollinear zum Up-Vektor $\vec{e}_{\text{up}} = [0, 1, 0]^\top$ wird und die Sichtmatrix kollabiert.

Die Sichtmatrix wird in OpenGL über `gluLookAt` gesetzt:
$$\text{gluLookAt}(x_{\text{eye}}, y_{\text{eye}}, z_{\text{eye}}, \; x_{\text{look}}, y_{\text{look}}, z_{\text{look}}, \; 0, 1, 0)$$

### 2.2 Der hierarchische Matrix-Stack (`glPushMatrix` / `glPopMatrix`)
In einer mechatronischen Kinematikkette (z. B. Basis $\to$ Oberarm $\to$ Unterarm $\to$ Greifer) hängt die Lage jedes Gliedes $i$ von allen vorherigen Gelenkstellungen $1 \dots i-1$ ab.  
Im OpenGL-Matrix-Stack wird die aktuelle Transformationsmatrix $\mathbf{M}$ dupliziert (`glPushMatrix`), lokal modifiziert (Translation $\mathbf{T}$, Rotation $\mathbf{R}$) und nach dem Rendern des Astes wieder restauriert (`glPopMatrix`):
$$\mathbf{M}_{\text{Sub}} = \mathbf{M}_{\text{Eltern}} \cdot \mathbf{T}(x, y, z) \cdot \mathbf{R}_y(\theta)$$

```
glPushMatrix(); // Zustand: Elternkoordinaten
    glTranslate(...);
    glRotate(...);
    RenderLink(); // Bauteil im lokalen System zeichnen
    glPushMatrix(); // Zustand: Kindkoordinaten
        glTranslate(...);
        RenderSubLink();
    glPopMatrix();
glPopMatrix(); // Zurück zum Elternsystem
```

### 2.3 Phong-Beleuchtungsmodell
Die Lichtintensität $I$ eines Oberflächenpunktes setzt sich aus drei Komponenten zusammen:
$$I = I_{\text{a}} k_{\text{a}} + I_{\text{d}} k_{\text{d}} (\vec{n} \cdot \vec{l}) + I_{\text{s}} k_{\text{s}} (\vec{r} \cdot \vec{v})^\alpha$$
- $\vec{n}$: Normaleneinheitsvektor der Oberfläche ($\|\vec{n}\| = 1$)
- $\vec{l}$: Einheitsvektor zur Lichtquelle
- $\vec{r} = 2(\vec{n} \cdot \vec{l})\vec{n} - \vec{l}$: Reflektierter Lichtstrahl
- $\vec{v}$: Einheitsvektor zum Betrachter (Kamera)
- $\alpha$: Glanzkoeffizient (Shininess)

---

## 3. Stufe A: In-Class Sprint (60 Minuten)

**Thema:** SharpGL-Basisszene mit Orbit-Kamera & Phong-Beleuchtung  
**Ziel:** Erstellen Sie in 60 Minuten ein WPF-Projekt mit SharpGL, das eine schattierte 3D-Geometrie anzeigt, die frei mit der Maus im Raum umkreist werden kann.

### Aufgabenstellung:
1. Öffnen Sie die Vorlage `Quellen/WS25/VorlageVisualisierung3D` oder binden Sie das NuGet-Paket `SharpGL.WPF` in ein neues WPF-Projekt ein.
2. Platzieren Sie im XAML:
   ```xml
   <Grid>
       <sharpGL:OpenGLControl x:Name="OpenGlView" 
                              OpenGLDraw="OpenGlView_OpenGLDraw" 
                              OpenGLInitialized="OpenGlView_OpenGLInitialized" 
                              Resized="OpenGlView_Resized"/>
   </Grid>
   ```
3. **OpenGL-Initialisierung (`OpenGLInitialized`):**
   - Tiefenpuffer aktivieren: `gl.Enable(OpenGL.GL_DEPTH_TEST)`.
   - Beleuchtung aktivieren: `gl.Enable(OpenGL.GL_LIGHTING)`, `gl.Enable(OpenGL.GL_LIGHT0)`.
   - Lichtquelle bei Position $[10, 20, 15, 1]^\top$ definieren.
   - Material-Farben setzen (`gl.Material(...)`) und Shading-Modell auf `GL_SMOOTH` einstellen.
4. **Kamera-Klasse `OrbitCamera` implementieren:**
   - Parameter: $r = 10{,}0$, $\theta = 45^\circ$, $\phi = 30^\circ$, Look-At: $(0, 0, 0)$.
   - Maus-Events anbinden:
     - Linke Maustaste + Bewegen: Ändert Azimut $\theta$ und Elevation $\phi$. Begrenzen Sie $\phi \in [-85^\circ, +85^\circ]$.
     - Mausrad: Ändert Distanz $r$ ($r \in [2, 50]$).
5. **Renderschleife (`OpenGLDraw`):**
   - Puffer leeren: `gl.Clear(OpenGL.GL_COLOR_BUFFER_BIT | OpenGL.GL_DEPTH_BUFFER_BIT)`.
   - `gl.LoadIdentity()`.
   - Sichtmatrix via `gl.LookAt(eyeX, eyeY, eyeZ, 0, 0, 0, 0, 1, 0)` setzen.
   - Zeichnen Sie ein 3D-Koordinatenkreuz (Achsenlänge 3 m: $X$=Rot, $Y$=Grün, $Z$=Blau).
   - Zeichnen Sie einen 3D-Zylinder oder Würfel mit korrekten Flächennormalen (`gl.Normal3f(...)`).
- **Erwartetes Ergebnis:** Eine butterweiche 3D-Orbit-Kamerabewegung um das zentrierte, plastisch beleuchtete Objekt.

---

## 4. Stufe B: Homework Extension (Wahlmodell)

> [!IMPORTANT]
> **Wahlmodell – GENAU EINE Aufgabe (keine Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **entweder Track A (Industrie)** ODER **Track B (Simulation Game)**.  
> Beide Tracks basieren auf dem hierarchischen SharpGL-Szenengraphen, Transformationsmatrizen und 3D-Interaktion und führen zur Höchstpunktzahl (10 Punkte).

```
                    ┌──────────────────────────────────────────────┐
                    │ WÄHLEN SIE GENAU EINEN DER BEIDEN TRACKS:    │
                    └──────────────────────┬───────────────────────┘
                                           │
                 ┌─────────────────────────┴─────────────────────────┐
                 ▼                                                   ▼
┌─────────────────────────────────┐                 ┌─────────────────────────────────┐
│  Track A: Industrie & Mechatronik│                 │   Track B: Simulation Game      │
│  SCARA-Roboterarm mit           │                 │   3D Arcade Claw Crane          │
│  Vorwärtskinematik & TCP-Check  │                 │   Jahrmarkt-Greifarm-Simulator  │
└─────────────────────────────────┘                 └─────────────────────────────────┘
```

---

### Track A (Industrie): SCARA-Roboterarm mit Vorwärtskinematik

#### Industrielles Szenario:
SCARA-Roboter (Selective Compliance Assembly Robot Arm) sind der Industriestandard für High-Speed-Pick-and-Place-Aufgaben. Sie modellieren einen 4-Achs-SCARA-Roboterarm als hierarchischen 3D-Szenengraph mit interaktiver Gelenkverstellung und analytischer Vorwärtskinematik.

#### Kinematische Struktur (4 Freiheitsgrade):
1. **Basis/Sockel (statisch):** Massiver Zylinder auf dem Hallenboden bei $(0,0,0)$, Höhe $H_{\text{base}} = 0{,}5\,\text{m}$.
2. **Achse 1 (Schultergelenk):** Rotation $\theta_1 \in [-150^\circ, +150^\circ]$ um die vertikale $Y$-Achse.  
   - Armglied 1 (Oberarm): Länge $L_1 = 1{,}0\,\text{m}$.
3. **Achse 2 (Ellenbogen):** Am Ende von Arm 1, Rotation $\theta_2 \in [-150^\circ, +150^\circ]$ um die vertikale Achse.  
   - Armglied 2 (Unterarm): Länge $L_2 = 0{,}8\,\text{m}$.
4. **Achse 3 (Z-Pinole / Vertikalhub):** Am Ende von Arm 2, lineare Translation $d_3 \in [0{,}0, 0{,}5]\,\text{m}$ vertikal nach unten.
5. **Achse 4 (Handgelenk-Rotation & Greifer):** Rotation $\theta_4 \in [-180^\circ, +180^\circ]$ um die Pinolenachse.  
   - Pneumatischer 2-Backen-Parallelgreifer: Greifbacken öffnen/schließen symmetrisch ($g_{\text{width}} \in [0{,}02, 0{,}10]\,\text{m}$).

#### Aufgabenstellung Track A:
1. **Hierarchischer Szenengraph:** Bauen Sie die Roboterkinematik über Klassen (`SceneNode`, `RobotLink`) auf. Jedes Glied rendert seine Geometrie und ruft anschließend seine Kindknoten innerhalb von `glPushMatrix()` / `glPopMatrix()` auf.
2. **Analytische Vorwärtskinematik (TCP-Berechnung):**
   - Berechnen Sie im C#-Modell die exakte Position des Greifer-Mittelpunktes (TCP):
     $$x_{\text{tcp}} = L_1 \cos \theta_1 + L_2 \cos(\theta_1 + \theta_2)$$
     $$z_{\text{tcp}} = -(L_1 \sin \theta_1 + L_2 \sin(\theta_1 + \theta_2))$$
     $$y_{\text{tcp}} = H_{\text{base}} - d_3$$
3. **Validierung in der 3D-Szene:** Zeichnen Sie an der berechneten TCP-Position eine kleine gelbe Kontrollkugel. Diese Kugel muss sich bei jeder Gelenkbewegung mathematisch exakt mit dem physikalischen Greifer decken!
4. **Interaktive Steuerung & Teach-in:**
   - GUI-Slider für alle 4 Freiheitsgrade ($\theta_1, \theta_2, d_3, \theta_4$).
   - Zwei vordefinierte Knöpfe („Pos A anfahren“, „Pos B anfahren“) zur kontinuierlichen Bewegung.

---

### Track B (Simulation Game): 3D Arcade Claw Crane (Jahrmarkt-Greifarm)

#### Gaming-Szenario:
Vollständige mechatronische 3D-Simulation eines Jahrmarkt-Greifarm-Automaten (*Claw Machine*) mit Tastatursteuerung und physikalischem Greifmechanismus.

#### Szenen-Aufbau & Hierarchischer Szenengraph:
1. **Gehäuse & Glaskasten:** Transparenter Glasquader mit Eckprofilen, Bodenplatte und Auswurfschacht (Loch im Boden) in einer Ecke.
2. **$X$-Brücke (Portalachse):** Fährt auf Längsschienen horizontal entlang der Tiefe ($X \in [-1{,}5, +1{,}5]\,\text{m}$).
3. **$Y$-Laufkatze (Querachse):** Sitzt auf der $X$-Brücke und fährt quer ($Z \in [-1{,}0, +1{,}0]\,\text{m}$).
4. **$Z$-Seilzug / Teleskopstange:** Hängt an der Laufkatze und lässt sich vertikal absenken ($Y \in [0{,}2, 2{,}0]\,\text{m}$).
5. **3-Finger-Greifklaue:** Am unteren Ende des Seilzugs: 3 Greiffinger im Winkel von $120^\circ$ angeordnet, die sich synchron öffnen und schließen (Gelenkwinkel $\gamma \in [0^\circ, 45^\circ]$).
6. **Spielobjekte (Preise):** Mehrere bunte Würfel und Kugeln auf dem Automatenboden.

#### Aufgabenstellung Track B:
1. **Hierarchischer Szenengraph:** Modellierung der Kette Gehäuse $\to X$-Brücke $\to Y$-Katze $\to Z$-Seil $\to$ Greiferbacken via `glPushMatrix` / `glPopMatrix`.
2. **Interaktive Tastatur-Steuerung:**
   - Pfeiltasten: Bewegen die Laufkatze in der horizontalen Ebene ($X/Z$).
   - Leertaste: Startet den vollautomatischen Greifzyklus:
     1. Klaue senkt sich ab bis kurz über den Boden.
     2. Finger schließen sich.
     3. Klaue fährt wieder nach ganz oben.
     4. Laufkatze fährt zur Auswurfposition über dem Schacht und öffnet die Klaue.
3. **Greifmechanik (Kollisions-Snap):**
   - Prüfen Sie den 3D-Euklidischen Abstand zwischen Greifer-Zentrum und den Spielzeug-Objekten: $d = \|\vec{p}_{\text{claw}} - \vec{p}_{\text{objekt}}\|$.
   - Liegt ein Objekt innerhalb des Greifradius ($d < r_{\text{grab}}$), wird es gegriffen und folgt ab diesem Moment der Bewegung der Klaue.
4. **Atmosphärische Beleuchtung:**
   - Aktivieren Sie einen lokalen Spotlight-Scheinwerfer (`GL_LIGHT1`), der von der Decke des Automaten senkrecht auf die Spielfläche strahlt.

---

## 5. Akzeptanzkriterien & Bewertungsrubrik (10 Punkte)

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **Hierarchischer Szenengraph & Matrix-Stack** | 3 P. | Kaskadierte Kinematik mit mindestens 4 Freiheitsgraden über `glPushMatrix()`/`glPopMatrix()`. Keine manuell berechneten Weltkoordinaten für Kindkörper. |
| **Orbit-Kamera mit Gimbal-Lock-Schutz** | 2 P. | Flüssige Maussteuerung ($\theta, \phi, r$) mit striktem Clamping von $\phi$ gegen Achsenkollaps. |
| **Phong-Beleuchtung & Normalenvektoren** | 2 P. | Korrekt konfigurierte Lichtquellen, Materialglanzpunkte und fehlerfreie Normalenvektoren an allen Flächen. |
| **Kinematik-Check / Interaktion** | 2 P. | **Track A:** Exakte Deckung der analytischen TCP-Position mit Kontrollkugel. **Track B:** Vollständiger Greifzyklus mit Distanz-Kollisionsprüfung. |
| **Dokumentation & Code-Qualität** | 1 P. | Saubere Gliederung der Szenenknoten, aussagekräftige `README.md` mit Screenshot und Kinematik-Schema. |
| **Gesamt** | **10 P.** | **100 % der Übungseinheit** |

---

## 6. Online-Recherche-Box

- **Offizielle Dokumentation:**
  - [SharpGL GitHub Repository & Demos](https://github.com/dwmkerr/sharpgl) – Quellcode und Beispiele für WPF.
  - [OpenGL 2.1 Reference Pages: gluLookAt](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/gluLookAt.xml) – Spezifikation der Kamerasichtmatrix.
  - [OpenGL Reference: glPushMatrix & glPopMatrix](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glPushMatrix.xml) – Der Matrix-Stack.
  - [Wikipedia: Forward Kinematics (SCARA)](https://en.wikipedia.org/wiki/Forward_kinematics) – Analytische Vorwärtskinematik.
- **Gezielte englische Suchbegriffe:**
  - `SharpGL WPF OpenGLControl tutorial scene graph`
  - `OpenGL spherical camera orbit clamped pitch gimbal lock`
  - `OpenGL hierarchical modeling glPushMatrix robotic arm`

---

## 7. Vibe-Coding Prompting-Tipps

> [!WARNING]
> **Typischer KI-Fehler bei Termin 05:**
> - KIs verwenden häufig veraltetes Windows-Forms-GlControl oder versuchen moderne OpenGL 4 Core Profile Shader (GLSL) einzubauen, die in SharpGL-WPF-Standardprojekten oft Treiberprobleme verursachen.
> - KIs vergessen oft `glNormal3f`, was zu völlig flachen, pechschwarzen Körpern führt, sobald `GL_LIGHTING` eingeschaltet wird.

### Empfohlener Prompt für LLMs:
```text
Erstelle mir eine C#-Klasse für einen hierarchischen Szenengraphen mit SharpGL in WPF.
Nutze die Fixed-Function-Pipeline (OpenGL 2.1) mit glPushMatrix() und glPopMatrix().
Jeder Knoten (SceneNode) besitzt eine Liste von Kindknoten und eine Render-Methode.
Berechne für alle Flächen (Würfel, Zylinder) saubere Normalenvektoren mit gl.Normal3f(), damit die Phong-Beleuchtung (GL_LIGHTING) plastisch wirkt.
Implementiere eine Orbit-Kamera in Kugelkoordinaten, deren Elevation phi auf maximal +-85 Grad geklemmt ist.
```

---

## 8. 🔍 Peer-Review-Leitfragen für das Plenum (Showcase & Peer-Challenge)

1. **Der Kinematik-Ablösetest:**  
   *„Verfahren Sie die Basis bzw. den Hauptschlitten live am Beamer: Bleiben Unterarm, Greifer und Werkstück fest an der Kinematikkette montiert, oder löst sich die Subkomponente im Raum ab (Zeichen für manuelle statt hierarchische Transformation)?“*
2. **Kardanfehler-Stresstest:**  
   *„Schwenken Sie die Orbit-Kamera mit der Maus steil über den Nordpol ($\phi \to +90^\circ$): Bleibt die Szene stabil steuerbar oder kippt das Bild unkontrolliert um (Gimbal Lock)?“*
3. **Beleuchtungs- und Normalen-Audit:**  
   *„Treten auf den Zylindern und Quadern sichtbare Lichtglanzpunkte auf, oder sind Flächen schattierungslos bzw. schwarz, weil Normalenvektoren vergessen wurden?“*
4. **Validierung der Kinematik (Track A) bzw. Greiflogik (Track B):**  
   *„Trifft die gelbe TCP-Analysekugel exakt den Schnittpunkt der Greiferbacken, und greift die Klaue das Objekt nach einer echten räumlichen Abstandsfunktion?“*
