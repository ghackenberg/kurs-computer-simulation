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

## 3. Stufe A: In-Class Sprint (ca. 30–45 Minuten)

**Thema:** Szenengraph-Traversierung vereinen, Kamera-Panning & 3D-Werkstück-Distanzprüfung auf Basis des Starter-Kits  
**Ziel:** Analysieren Sie das ausführbare Starter-Projekt `Vorlage/SceneGraph3D.sln` (das bereits die `OrbitCamera`, Phong-Beleuchtung und eine 3-Achs-SCARA-Grundstruktur mitbringt), beheben Sie die Trennung zwischen Matrix-Baum und OpenGL-Rendering und ergänzen Sie Kamera-Panning sowie ein 3D-Werkstück.

### Aufgabenstellung:
1. **Starter-Kit untersuchen (`Vorlage/SceneGraph3D.sln`):**
   - Starten Sie die Anwendung und prüfen Sie die 3 Gelenk-Slider ($\theta_1, \theta_2, d_3$) sowie die Deckung der gelben analytischen TCP-Kugel (`CalculateAnalyticTcp`) mit der Szenengraph-Matrix (`_pinoleNode.GetWorldPosition()`).
   - Öffnen Sie `MainWindow.xaml.cs` und vergleichen Sie `BuildSceneGraph()` mit `RenderRobot(OpenGL gl)`: Aktuell wird `_rootNode` zwar für `GetWorldPosition()` genutzt, aber `RenderRobot(gl)` zeichnet die Geometrie über manuell duplizierte `gl.PushMatrix()`-Aufrufe, statt `_rootNode.Render(gl)` aufzurufen!
2. **Aufgabe A1 – Szenengraph-Rendering vereinen (`RenderCustomGeometry` & `_rootNode.Render`):**
   - Weisen Sie in `BuildSceneGraph()` jedem Knoten (`_baseNode`, `_arm1Node`, `_arm2Node`, `_pinoleNode`) über die Eigenschaft `RenderCustomGeometry = gl => { ... }` seine lokale Zeichenlogik zu.
   - *Wichtiger Hinweis zur Skalierung:* Behalten Sie `gl.PushMatrix(); gl.Translate(L1 / 2.0f, 0, 0); gl.Scale(L1, 0.14f, 0.18f); DrawCube(gl); gl.PopMatrix();` **innerhalb** von `RenderCustomGeometry` bei (setzen Sie **nicht** `_arm1Node.Sx = L1`, da eine Knotenskalierung über den Matrix-Stack auch alle Kindknoten wie `_arm2Node` und `_pinoleNode` verzerren würde!).
   - Ersetzen Sie den gesamten Rumpf von `RenderRobot(OpenGL gl)` durch den einzigen rekursiven Aufruf `_rootNode.Render(gl);`.
   - Überprüfen Sie, dass der Roboter optisch exakt gleich aussieht und der Deckungsfehler $\Delta = 0{,}000\,\text{mm}$ erhalten bleibt.
3. **Aufgabe A2 – Kamera-Panning mit rechter Maustaste (`OrbitCamera.Pan`):**
   - Ergänzen Sie in `Camera/OrbitCamera.cs` eine Methode `public void Pan(double deltaRight, double deltaUp)`, welche den Zielpunkt (`LookAtX`, `LookAtY`, `LookAtZ`) quer zur aktuellen horizontalen Blickrichtung ($\theta$) und vertikal entlang $Y$ verschiebt:
     $$\Delta x_{\text{look}} = -\Delta_{\text{right}} \cdot \cos\theta, \quad \Delta z_{\text{look}} = +\Delta_{\text{right}} \cdot \sin\theta, \quad \Delta y_{\text{look}} = \Delta_{\text{up}}$$
   - Binden Sie in `MainWindow.xaml.cs` (`OpenGlView_MouseDown` / `MouseMove` / `MouseUp`) die **rechte Maustaste** an `_camera.Pan(dx * 0.01, dy * 0.01)`, sodass Sie das Zentrum der 3D-Szene frei verschieben können.
4. **Aufgabe A3 – 3D-Werkstück auf dem Hallenboden & TCP-Distanzanzeige:**
   - Fügen Sie in `BuildSceneGraph()` einen weiteren Kindknoten `_workpieceNode = new SceneNode("Workpiece")` unter `_rootNode` bei der Bodenposition $(1{,}10, 0{,}06, -0{,}40)\,\text{m}$ hinzu, der einen orangen Würfel (Kantenlänge $0{,}12\,\text{m}$) zeichnet.
   - Berechnen Sie in `UpdateTcpCalculations()` den euklidischen 3D-Abstand $d = \|\vec{p}_{\text{TCP}} - \vec{p}_{\text{Workpiece}}\|$ und geben Sie ihn in der Statusleiste (`TxtStatus`) aus. Färben Sie das Werkstück grün, sobald sich der TCP in Greifdistanz ($d < 0{,}12\,\text{m}$) befindet!

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
│  4-Achs-SCARA mit Parallelgreifer│                 │   3D Arcade Claw Crane          │
│  Teach-In & Pick-and-Place      │                 │   Jahrmarkt-Greifarm-Simulator  │
└─────────────────────────────────┘                 └─────────────────────────────────┘
```

---

### Track A (Industrie): Ausbau zum 4-Achs-SCARA mit Parallelgreifer, Teach-In & Pick-and-Place

#### Industrielles Szenario:
Da die ersten 3 Achsen ($\theta_1, \theta_2, d_3$) und die TCP-Validierung bereits im Starter-Kit enthalten sind, erweitern Sie den SCARA-Roboter zu einer vollständigen **4-Achs-Pick-and-Place-Fertigungszelle** mit Handgelenksrotation, symmetrischem 2-Backen-Parallelgreifer, animierter Teach-In-Bahnsteuerung und Werkstück-Transport.

#### Kinematische Erweiterung (Achse 4 + Greiferbacken als `SceneNode`s):
1. **Basis, Achse 1 ($\theta_1$), Achse 2 ($\theta_2$) und Achse 3 ($d_3$):** Wie im Starter-Kit über `_rootNode.Render(gl)` traversiert.
2. **Achse 4 (Handgelenks-Rotation $\theta_4$):** Kindknoten `_wristNode` unter `_pinoleNode`, Rotation $\theta_4 \in [-180^\circ, +180^\circ]$ um die vertikale Pinolenachse ($Y$-Achse) mit horizontaler Traverse (Querbalken).
3. **Pneumatischer 2-Backen-Parallelgreifer ($g_{\text{width}}$):** Zwei Kindknoten `_leftFingerNode` und `_rightFingerNode` unter `_wristNode`, die sich bei Verstellung der Öffnungsweite $g_{\text{width}} \in [0{,}02, 0{,}16]\,\text{m}$ symmetrisch um $\pm g_{\text{width}}/2$ entlang der lokalen Querachse öffnen und schließen.

#### Aufgabenstellung Track A:
1. **Hierarchischer Szenengraph für Achse 4 & Parallelgreifer:**
   - Erweitern Sie den Szenengraphen um `_wristNode`, `_leftFingerNode` und `_rightFingerNode` und ergänzen Sie in der Sidebar zwei neue GUI-Slider für $\theta_4 \in [-180^\circ, +180^\circ]$ und die Greiferöffnung $g_{\text{width}} \in [0{,}02, 0{,}16]\,\text{m}$.
   - Stellen Sie sicher, dass sich die beiden Greiferbacken bei Änderung von $\theta_1, \theta_2, d_3, \theta_4$ ohne manuelle Weltkoordinaten-Rechnung automatisch im lokalen Koordinatensystem des Handgelenks mitdrehen.
2. **Animierte Teach-In-Steuerung (`DispatcherTimer`):**
   - Ergänzen Sie eine Teach-In-Steuerung, mit der mindestens 3 Posen („Aufnahmeposition A“, „Ablageposition B“, „Home“) gespeichert und per Button angefahren werden können.
   - Beim Klick auf eine Pose (oder „Pick & Place Zyklus starten“) dürfen die Gelenke **nicht unphysikalisch springen**, sondern müssen über einen `DispatcherTimer` (ca. 60 Hz) kontinuierlich und flüssig (z. B. lineare oder kubische Interpolation aller Gelenkwerte $\theta_1, \theta_2, d_3, \theta_4, g_{\text{width}}$) zur Zielpose verfahren.
3. **Interaktiver Pick-and-Place-Werkstücktransport:**
   - Platzieren Sie auf dem Hallenboden eine **Aufnahmestation A** (mit Werkstück) und eine **Ablagestation B** (Zielplattform).
   - Schließt sich der Parallelgreifer ($g_{\text{width}} \le g_{\text{grip}}$), während sich der TCP innerhalb des Greifradius ($d < r_{\text{grab}}$) zum Werkstück befindet, wird das Werkstück gegriffen (entweder durch dynamisches Umhängen `Reparenting` von `_rootNode` unter `_wristNode` oder durch Mitführen mit Position & Orientierung $\theta_1 + \theta_2 + \theta_4$) und beim Öffnen des Greifers über Station B dort abgesetzt.

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
1. **Hierarchischer Szenengraph:** Modellierung der Kette Gehäuse $\to X$-Brücke $\to Y$-Katze $\to Z$-Seil $\to$ Greiferbacken via `SceneNode` (`glPushMatrix` / `glPopMatrix`).
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
| **Hierarchischer Szenengraph & Matrix-Stack** | 3 P. | Durchgängiges Rendering über `_rootNode.Render(gl)` mit mindestens 4 Freiheitsgraden + beweglichen Greiferbacken als Kindknoten. Keine manuell berechneten Weltkoordinaten für Kindkörper. |
| **Orbit-Kamera mit Gimbal-Lock-Schutz & Panning** | 2 P. | Flüssige Maussteuerung (Links: Orbit $\theta, \phi$ mit Clamping auf $[-85^\circ, +85^\circ]$; Rechts: Zielpunkt-Panning; Mausrad: Zoom $r$). |
| **Phong-Beleuchtung & Normalenvektoren** | 2 P. | Korrekt konfigurierte Lichtquellen, Materialglanzpunkte und fehlerfreie Normalenvektoren an allen Flächen (inkl. Greifer und Werkstücken). |
| **Animierte Bahnsteuerung & Greif-Interaktion** | 2 P. | **Track A:** Flüssig interpoliertes Teach-In (`DispatcherTimer`) + Pick-and-Place-Werkstücktransport mit TCP-Deckung. **Track B:** Vollständiger animierter Greifzyklus mit 3D-Distanzprüfung. |
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
