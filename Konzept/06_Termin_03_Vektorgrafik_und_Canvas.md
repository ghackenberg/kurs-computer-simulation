# Termin-Steckbrief T03: 2D-Vektorgrafik & Koordinatentransformation (Rein geometrisch)

**Dokument-ID:** `Konzept/06_Termin_03_Vektorgrafik_und_Canvas.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](./01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](./02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](./03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte, Vorgreif-Sperre & Kapitel-Schnittstellen
- **Foliensatz:** [`03_Visualisierung_2D_Vektor/Folien.md`](../Folien/03_Visualisierung_2D_Vektor/Folien.md)
- **Übungsblatt & Vorlage:** [`Aufgabenblatt.md`](../Uebungen/Termin_03_Vektorgrafik_Canvas/Aufgabenblatt.md) | **Moodle-Text:** [`Text.md`](../Moodle/03_Termin_03_Vektorgrafik_und_Canvas/Text.md) | [`VectorTrussCanvas.sln`](../Uebungen/Termin_03_Vektorgrafik_Canvas/Vorlage/VectorTrussCanvas.sln)
- **Assessment zu Terminbeginn:** **Moodle-Test 1** ([`Quiz_01_Grundlagen_und_Pixel`](../Moodle/03_Termin_03_Vektorgrafik_und_Canvas/Quiz_01_Grundlagen_und_Pixel/Uebersicht_10_Moodle_Tests.md), 15 Min., prüft ausschließlich Kap. 00–02).
- **Vorgreif-Sperre (Technologie-Stand T03):** Rein geometrisch auf WPF `Canvas` / `DrawingVisual`. *Strikte Tabus:* **Keine Fachwerk-Statik, keine Steifigkeitsmatrix $\mathbf{K}$, kein Math.NET Cholesky (erst in T07!)** – alle Kräfte sind fest vorgegebene Vektoren.
- **Kapitel-Brücken & Quiz-Zuordnung:**
  - **Vorwärts ($\to$):** [`T05`](./08_Termin_05_3D_OpenGL_Szenengraph.md) (Verallgemeinerung von 2D-Transformationen $3\times 3$ mit $+Y$ unten auf 3D $4\times 4$ mit $+Y$ oben, $+Z$ zum Betrachter und `aspect`-Skalierung); [`T07`](./10_Termin_07_Statik_FEM_Cholesky.md) (Das in T03 rein geometrisch gezeichnete 2D-Fachwerk samt JSON-Format erhält in T07 seinen Cholesky-Statiklöser $\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$).
  - **Geprüft in:** **Quiz 02** (zu Beginn von [`T05`](./08_Termin_05_3D_OpenGL_Szenengraph.md), prüft Kap. 03–04).

## 2. Lernziele der Vorlesung (Bloom-Kaskade)
1. **Verstehen:** Zusammenhang zwischen kartesischen Weltkoordinaten ($+Y$ oben, Meter) und linkshändigen Bildschirmkoordinaten ($+Y$ unten, Pixel) bei isotroper Skalierung $s = \min(s_x, s_y)$ und Bounding-Box-Zentrierung.
2. **Anwenden:** Affine 2D-Transformation (`WorldToScreen` / `ScreenToWorld`), gedrehte Pfeilspitzen im Screen Space, DIN-406-Maßketten und interaktives Maus-Dragging ohne Bounding-Box-Jittering implementieren.
3. **Erschaffen:** Einen interaktiven 2D-CAD-Tragwerks-Inspektor bzw. Poly-Bridge-Blueprint-Editor mit JSON-Persistenz als geometrisches Frontend für T07 entwickeln.

## 3. Zweistufige Hausübung (`Einheit 03`) & Showcase-Fokus
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Euklidische Stablängenberechnung $L = \sqrt{\Delta x^2 + \Delta y^2}$ in Weltkoordinaten ergänzen.
  - `1.2`: Vertikale DIN-406-Gesamthöhenbemaßung mit im Screen Space gedrehten Maßpfeilen implementieren.
  - `1.3`: Bounding-Box-Jittering beim interaktiven Knoten-Dragging durch Einfrieren der Referenz-BoundingBox während `MouseMove` beheben.
  - `1.4`: Hin- und Rücktransformation (`WorldToScreen` $\leftrightarrow$ `ScreenToWorld`) und Pfeilgeometrie mit `dotnet test` verifizieren.
- **Stufe 2 – Wahlmodell (10 Pkt. – *Vorgreif-Sperre: Keine FEM-Statik vor T07!*):**
  - **Track A (`A.1`–`A.4` – 2D-CAD Tragwerks-Inspektor):** Zweistufige DIN-406-Bemaßungsketten (Einzelfelder + Gesamtspannweite), interaktives Ziehen/Drehen von Kraftpfeilspitzen $(F_x, F_y)$, Mausrad-Zoom/Pan und JSON-Import/Export.
  - **Track B (`B.1`–`B.4` – Poly Bridge Blueprint-Baumeister):** Interaktives Brückenbau-Zeichenbrett über einer Schlucht mit $0{,}5\,\text{m}$-Grid-Snapping, gestrichelter Stab-Vorschau ($L_{\max} = 4{,}0\,\text{m}$), Knoten-/Stab-Löschung (`Entf`), Live-Baubudget ($1\,000\,\text{EUR/m}$) und JSON-Level-Export.
- **Showcase- & Code-Defense-Fokus (zu Beginn von T04):** Seitenverhältnis-Stresstest (32:9-Fenster $\implies$ bleibt Geometrie verzerrungsfrei?), Y-Achsen-Inversion ($+Y$ oben vs. unten) und Skalierungsinvarianz der Screen-Space-Pfeilspitzen.
