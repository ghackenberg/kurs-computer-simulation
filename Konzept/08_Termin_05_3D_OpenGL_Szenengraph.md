# Termin-Steckbrief T05: 3D-Visualisierung, OpenGL-Pipeline & Kinematische Szenengraphen

**Dokument-ID:** `Konzept/08_Termin_05_3D_OpenGL_Szenengraph.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](./01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](./02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](./03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte, Vorgreif-Sperre & Kapitel-Schnittstellen
- **Foliensätze:** [`05_Visualisierung_3D_OpenGL/Folien.md`](../Folien/05_Visualisierung_3D_OpenGL/Folien.md) (+ [`Folien_Anhang_3D_Normalen.md`](../Folien/05_Visualisierung_3D_OpenGL/Folien_Anhang_3D_Normalen.md))
- **Übungsblatt & Vorlage:** [`Aufgabenblatt.md`](../Uebungen/Termin_05_3D_OpenGL_Szenengraph/Aufgabenblatt.md) | **Moodle-Text:** [$moodleFile](../Moodle/Termintexte/05_Termin_05_3D_OpenGL_Szenengraph.md) | [`SceneGraph3D.sln`](../Uebungen/Termin_05_3D_OpenGL_Szenengraph/Vorlage/SceneGraph3D.sln)
- **Assessment zu Terminbeginn:** **Moodle-Test 2** (15 Min., prüft ausschließlich Kap. 03–04).
- **Vorgreif-Sperre (Technologie-Stand T05):** `SharpGL.WPF`, homogene $4\times 4$-Matrizen, `OrbitCamera`, `SceneNode`, Vorwärtskinematik. *Strikte Tabus:* Kein Multithreading (erst T06), keine inversen Jacobi-LGS (erst T07).
- **Kapitel-Brücken & Quiz-Zuordnung:**
  - **Rückwärts ($\leftarrow$):** [`T03`](./06_Termin_03_Vektorgrafik_und_Canvas.md) (Kontrast linkshändiges 2D-Canvas vs. rechtshändiges 3D-OpenGL; isotrope `aspect`-Skalierung); [`T04`](./07_Termin_04_Telemetrie_und_ScottPlot.md) (`MSAGL`-Baumstruktur als Vorläufer des 3D-Szenengraphen `SceneNode`).
  - **Vorwärts ($\to$):** [`T07`](./10_Termin_07_Statik_FEM_Cholesky.md) (Die in T05 hergeleitete SCARA-*Vorwärtskinematik* $(\theta_1, \theta_2) \mapsto (x, z)$ mit $L_1, L_2$ wird in T07 als *Inverse Kinematik* $(x, z) \mapsto (\theta_1, \theta_2)$ über die Jacobi-Matrix $\mathbf{J}$ numerisch invertiert); [`T10`](./13_Termin_10_Hybride_Dynamik_Synthese.md) (3D-Anlagenmodell als Frontend der Virtuellen Inbetriebnahme).
  - **Geprüft in:** **Quiz 03** (zu Beginn von [`T08`](./11_Termin_08_DGL_und_SFunctions.md), prüft Kap. 05–07).

## 2. Lernziele der Vorlesung (Bloom-Kaskade)
1. **Verstehen:** Rechtshändiges 3D-OpenGL-System ($+Y$ oben, $+Z$ zum Betrachter), MVP-Pipeline, Nicht-Kommutativität ($\mathbf{T}\cdot\mathbf{R} \neq \mathbf{R}\cdot\mathbf{T}$), Kugelkoordinaten $(r, \theta, \phi)$ mit Gimbal-Lock-Clamping und Phong-Beleuchtung.
2. **Anwenden:** Rekursive Szenengraph-Traversierung (`gl.PushMatrix` / `gl.PopMatrix`), lokale Kamera-Verschiebung (`OrbitCamera.Pan`) und 3D-Abstandsprüfung implementieren.
3. **Erschaffen:** Einen 4-Achs-SCARA-Roboterzwilling mit Teach-In & Pick-and-Place bzw. einen 3D-Greifautomaten (Claw Crane) mit dynamischem Re-Parenting realisieren.

## 3. Zweistufige Hausübung (`Einheit 05`) & Showcase-Fokus
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Szenengraph-Traversierung vereinen (`RenderCustomGeometry` an `_baseNode`, `_arm1Node`, `_arm2Node`, `_pinoleNode` zuweisen und `_rootNode.Render(gl)` nutzen; $\Delta = 0{,}000\,\text{mm}$ TCP-Deckung).
  - `1.2`: Zielpunkt-Panning (`OrbitCamera.Pan(deltaRight, deltaUp)`) entlang des lokalen Kamera-Rechtsvektors in der XZ-Ebene und der Welt-Y-Achse implementieren.
  - `1.3`: 3D-Werkstück-Knoten (`_workpieceNode`) unter `_rootNode` einhängen und euklidischen Greifabstand $d = \|\vec{p}_{\text{TCP}} - \vec{p}_{\text{Workpiece}}\|_2 < 0{,}12\,\text{m}$ prüfen.
  - `1.4`: Vorbereitete Assertions für `OrbitCamera.Pan` in `SceneGraphTests.cs` aktivieren und alle 5 Unit-Tests (`dotnet test`) auf Grün bringen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – 4-Achs-SCARA-Roboterarm):** Ausbau um Achse 4 (`_wristNode`, $\theta_4$) und 2-Backen-Parallelgreifer ($g_{\text{width}}$), 60-Hz-Teach-In-Bahnsteuerung zwischen Posen, Pick-and-Place-Werkstücktransport via Re-Parenting und Spotlight (`GL_LIGHT1`).
  - **Track B (`B.1`–`B.4` – 3D Arcade Claw Crane):** Hierarchischer Greifautomat (Portalbrücke $\to$ Laufkatze $\to$ Seilwinde $\to$ 3-Finger-Klaue), Tastatursteuerung (`PreviewKeyDown`) mit automatischem Absenk-/Greif-/Rückführzyklus, Kollisions-Snap von Preiskisten und Decken-Spotlight (`GL_LIGHT1`).
- **Showcase- & Code-Defense-Fokus (zu Beginn von T06):** Nicht-Kommutativität $\mathbf{T}\cdot\mathbf{R} \neq \mathbf{R}\cdot\mathbf{T}$, warum Skalierung (`Sx = L1`) nicht auf Gelenkknoten liegen darf, `gl.PushMatrix`/`gl.PopMatrix`-Isolation und Gimbal-Lock-Schutz ($\phi \in [-85^\circ, +85^\circ]$).
