# Studentischer Detail-Review: Vorlesungsfolien (Kapitel 00 bis 11)

**Perspektive:** Studierender im 5. Semester Bachelor *Automatisierungstechnik (AT)*, FH OÖ Campus Wels  
**Geprüfte Dateien:** Alle MARP-Foliensätze in `Folien/00_Prolog/Folien.md` bis `Folien/11_Epilog/Folien.md` inkl. `Folien/05_Visualisierung_3D_OpenGL/Folien_Anhang_3D_Normalen.md`

---

## Überblick & Bewertungsmatrix der Vorlesungskapitel

| Kapitel | Titel / Thema | Umfang (`Folien.md`) | Didaktik & Roter Faden | Mathe & Code-Qualität | Übungs-Passung | Gesamturteil (Studentensicht) |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| **00** | Prolog (Kontext & Organisation) | 264 Z. | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐☆ | n/a | Trockener Informatik-Block zu Beginn; ab Folie „Kursaufbau“ sehr motivierend. |
| **01** | Einführung & Digitaler Zwilling | 768 Z. | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | Exzellenter Einstieg (Kranpendel, Schiefer Wurf, Euler, Goldene Regel). Heun (RK2) fehlt für T01. |
| **02** | 2D-Visualisierung: Pixelgrafik (`WriteableBitmap`) | 749 Z. | ⭐⭐⭐⭐⭐ | ⭐⭐⭐☆☆ | ⭐⭐⭐☆☆ | Super Erklärung von BackBuffer/Stride & CFL ($s \le 0{,}25$). Aber `[x, y]`-Cache-Falle im Code & Robin-Rand fehlt. |
| **03** | 2D-Visualisierung: Vektorgrafik (`WPF Canvas`) | 760 Z. | ⭐⭐⭐⭐☆ | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐☆ | Anschauliche Transformation & Pfeilgeometrie. Kritischer `Rect.Top/Bottom`-Bug in `CoordinateTransformer`! |
| **04** | 2D-Visualisierung: Diagramme (`ScottPlot 5` & `MSAGL`) | 779 Z. | ⭐⭐⭐⭐☆ | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐☆ | Starke Welford-Motivation. Aber veralteter ScottPlot-4-Code beim Histogramm (Z. 285) & MSAGL zu knapp. |
| **05** | 3D-Visualisierung: OpenGL (`SharpGL`) + Anhang | 1574 + 332 Z. | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐☆ | Inhaltlich stark, aber viel zu lang (OpenGL 1.1 Vertex-Friedhöfe). „SCARA“-Code baut eigentlich Knickarm! |
| **06** | Multithreading (`Parallel.For` & `async/await`) | 671 Z. | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | Sehr klar strukturiert (Amdahl, Race Condition, UI-Entkopplung). `Interlocked` für T06 Track A fehlt. |
| **07** | Statische Modelle (FEM-Fachwerk & `Math.NET`) | 1182 Z. | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐☆ | ⭐⭐⭐☆☆ | Gute Brücke Ideal $\to$ Elastisch. Aber doppelte Taylor-Herleitung & C#-Code für Index-Partitionierung fehlt. |
| **08** | Dynamische Modelle: Kontinuierlich (DGL & S-Functions) | 1844 Z. | ⭐⭐⭐⭐☆ | ⭐⭐⭐☆☆ | ⭐⭐⭐☆☆ | Extrem fundiert (Euler, RK4, Dahlquist, Anti-Windup). Massiver API-Bruch der Klasse `Block` mitten im Kapitel! |
| **09** | Dynamische Modelle: Diskret (DES & Stochastik) | 1456 Z. | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐☆ | Sehr praxisnah (FEL, Little, Inversionsmethode, Log-Normal, Chan-Welford). $M/M/c/K$ & Prioritäten fehlen. |
| **10** | Dynamische Modelle: Hybrid (Zero-Crossing & Zeno) | 1629 Z. | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Eines der besten Kapitel! Bouncing Ball, Zeno-Grenzzeit $t_\infty$, Sticking und Bisektion perfekt verknüpft. |
| **11** | Epilog (Synthese, FMI/FMU, Validierung) | 1065 Z. | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | n/a | Würdiger Abschluss: Modellwahl-Entscheidungsbaum, FMI-Industriestandard und „Teufelskreis der Instabilität“. |

---

## Kapitelweise Detailanalyse

---

### Kapitel 00: Prolog ([00_Prolog/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/00_Prolog/Folien.md))

#### 1. Didaktik & Roter Faden (AT-Studentensicht)
* **Trockener Kaltstart (Zeilen 39–113):** Die ersten 6 Inhaltsfolien nach dem Inhaltsverzeichnis wirken wie ein Lexikon-Auszug aus dem 1. Semester Technische Informatik (*Aussagenlogik, Prädikatenlogik, Mengenlehre, Zahlensysteme, ASCII/UTF, Von-Neumann vs. Harvard, Flynn'sche Taxonomie*). Als 5.-Semester-AT-Studierender fragt man sich in den ersten 15 Minuten: *„Warum wiederholen wir ASCII und Harvard-Architektur in Systemsimulation?“*
* **Starker zweiter Teil (ab Zeile 145):** Sobald der Bogen zum Studiengang Automatisierungstechnik (Zeile 145), zum „Vorwärts-Stolpern durch den Nebel“ (Zeile 188) und zum transparenten 2-Säulen-Benotungsschema (Zeile 198) geschlagen wird, steigt die Motivation sofort an.

#### 2. Konkrete Fehler & Tippfehler
* **Zeile 119:** Trennungsartefakt mitten im Wort: `- Objektorientierte Program-mierung` $\to$ `Objektorientierte Programmierung`.
* **Zeile 130:** Zwei Tippfehler/Grammatikfehler in einem Satz: `Beispiele sind die Darstellung der Daten den Computer-Programms mittles Charts...` $\to$ `...der Daten des Computer-Programms mittels Charts...`.

#### 3. Konkrete Verbesserungsvorschläge
* Den Block *„Theoretische & Technische Informatik“* (Zeilen 39–113) auf **eine einzige pointierte Folie** verdichten, die direkt erklärt, *warum* das für Simulation relevant ist (z. B. IEEE-754 Gleitkomma-Rundungsfehler $\to$ Auslöschung in Kap. 04; Von-Neumann-Flaschenhals & Cache-Lines $\to$ Row-Major-Iteration in Kap. 02; SIMD/MIMD $\to$ `Parallel.For` in Kap. 06).

---

### Kapitel 01: Einführung ([01_Einführung/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/01_Einführung/Folien.md))

#### 1. Didaktik & Roter Faden
* **Hervorragender Aufbau:** Der Einstieg über reale Industriekatastrophen (Kranpendel, Extruder, Resonanz) und das „Magische Dreieck“ (Modell – Solver – Visualisierung, Zeile 101) packt uns AT-Studierende sofort.
* **Sehr gute Gegenüberstellung Analytisch vs. Numerisch:** Das Beispiel des schiefen Wurfs (im Vakuum geschlossen lösbar vs. mit quadratischem Newton-Luftwiderstand $F_d \propto v |\vec{v}|$ analytisch nicht mehr geschlossen lösbar, Zeilen 335–457) leuchtet jedem sofort ein.
* **„Die Goldene Regel der Simulationsarchitektur“ (Zeile 532):** Dass bereits in Kapitel 01 die strikte Trennung von `SimulationState`, `PhysicsSolver` und `Visualizer` eingefordert wird, legt das perfekte Fundament für das ganze Semester.

#### 2. Mathematische & Code-Konsistenz / Skill Gaps zur Übung T01
* **Fehlende theoretische Brücke zu Übung 01 (Heun RK2 & Schnittpunkt-Interpolation):**
  - Auf Folie 748 ([Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/01_Einführung/Folien.md#L748-L766)) und im [Aufgabenblatt 01](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_01_Kinematik_und_Euler/Aufgabenblatt.md#L39-L48) werden das **Prädiktor-Korrektor-Verfahren nach Heun (RK2)**, die **lineare Schnittpunkt-Interpolation am Boden** ($\tau = \frac{-y_k}{y_{k+1}-y_k}$) sowie in Track B eine **Bisektions-Winkelsuche** verlangt.
  - In den Vorlesungsfolien von Kapitel 01 wird jedoch ausschließlich der **Explizite Euler 1. Ordnung** (Zeile 409) behandelt (Heun folgt erst in Kapitel 08, Bisektion erst in Kapitel 10). Zwar stehen die Formeln im Aufgabenblatt 01, aber 1–2 Folien in Abschnitt 1.3 („Ausblick: Warum Euler allein oft nicht reicht $\to$ Prädiktor-Korrektor nach Heun & lineare Auftreff-Interpolation“) würden den Vorlesungs-Übungs-Übergang nahtlos machen.

#### 3. Konkrete Sprach- & Tippfehler
* **Zeile 16 (Kapiteltitel):** Grammatikfehler im Akkusativ: `# Kapitel 1: Systemsimulation und den Digitalen Zwilling` $\to$ `# Kapitel 1: Systemsimulation und der Digitale Zwilling`.
* **Zeilen 131, 189, 587:** Silbentrennungs-Artefakte aus einem Fließtext-Copy-Paste: `Spannungs-schwankungen` (Z. 131), `untersuch-enden` (Z. 189), `Simulations-modelle` (Z. 587).

---

### Kapitel 02: 2D-Visualisierung – Pixelgrafik ([02_Visualisierung_2D_Pixel/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/02_Visualisierung_2D_Pixel/Folien.md))

#### 1. Didaktik & Roter Faden
* **Didaktisch exzellent:** Warum `Canvas` bei $1000 \times 1000$ Wärmeleitungs-Zellen komplett zusammenbricht und wie `WriteableBitmap` über `BackBuffer`, `BackBufferStride` und `unsafe uint*` 60 FPS schafft, ist glasklar erklärt.
* **Starke Herleitung des 5-Punkt-Laplace-Sterns & CFL ($s \le 0{,}25$):** Die Taylor-Herleitung der 2. Ableitung (Zeilen 495–525) und das Von-Neumann-Stabilitätskriterium $s = \frac{\alpha \Delta t}{\Delta x^2} \le \frac{1}{4}$ (Zeile 539) sind vorbildlich.

#### 2. Kritische Code- & Modellierungs-Befunde
1. **Widerspruch zwischen Speicherlayout-Theorie (Row-Major) und C#-Code (`float[x, y]`):**
   - Auf den Folien [Zeilen 138–143](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/02_Visualisierung_2D_Pixel/Folien.md#L138-L143) wird völlig richtig betont: *„In C# liegen 2D-Arrays zeilenweise (Row-Major) hintereinander im RAM. Äußere Schleife MUSS über `y` (Zeilen), innere über `x` (Spalten) laufen!“*
   - Doch auf den Code-Folien [Zeilen 629–645](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/02_Visualisierung_2D_Pixel/Folien.md#L629-L645) und [Zeilen 688–703](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/02_Visualisierung_2D_Pixel/Folien.md#L688-L703) (sowie in `Vorlage/PixelHeatFDM/Simulation/HeatGrid.cs`) wird das 2D-Array als `float[Width, Height]` angelegt und in der inneren `x`-Schleife über **`f[x, y]`** (bzw. `f_neu[x, y]`) indiziert!
   - **Technischer Fakt in C# (.NET):** Bei einem mehrdimensionalen Array `T[dim0, dim1]` ist der **zweite** Index (`dim1`) im Speicher benachbart ($O(1)$ Stride), während eine Erhöhung des **ersten** Index (`dim0`) im Speicher um `dim1 * sizeof(T)` springt! Wer `for (int y = 0; y < Height; y++) for (int x = 0; x < Width; x++)` schreibt und darin `f[x, y]` aufruft, erzeugt **in jedem einzelnen Schritt der inneren Schleife einen Spalten-Sprung (Cache-Miss)**!
   - **Lösung:** Entweder ein 1D-Array `float[Width * Height]` mit `[y * Width + x]` nutzen (wie beim `backBuffer`), oder bei 2D-Arrays `float[Height, Width]` und `f[y, x]` schreiben!
2. **Fehlende Herleitung der Robin-Randbedingung & Inhomogenität für Übung T02 Track A:**
   - Auf den Folien (Zeilen 554–620) werden nur **Dirichlet** ($T = \text{const}$) und **homogener Neumann** ($\frac{\partial T}{\partial n} = 0 \implies T_0 = T_1$) behandelt.
   - Auf der Übungsfolie (Zeile 728) und in [Aufgabenblatt 02](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_02_Pixelgrafik_und_FDM/Aufgabenblatt.md#L51-L52) ist jedoch die **konvektive Robin-Randbedingung** ($-\lambda \frac{\partial T}{\partial n} = h(T - T_\infty)$) an den Aluminium-Kühlrippen das Kernstück von Track A. Eine Folie nach Zeile 602, die kurz zeigt, wie aus $-\lambda \frac{T_0 - T_1}{\Delta x} = h(T_0 - T_\infty)$ die diskrete Randformel $T_0 = \frac{\lambda T_1 + h \Delta x T_\infty}{\lambda + h \Delta x}$ entsteht, spart den Studierenden im Labor viel Frust.
3. **Notationswechsel $\alpha$ vs. $a$:**
   - Auf den Folien heißt die Temperaturleitfähigkeit durchgängig $\alpha$ (`Alpha`), im Aufgabenblatt 02 (Abschnitt 2.1–2.3, Zeilen 32–45) heißt sie $a$, im C#-Startercode (`HeatGrid.cs`) wieder `Alpha`. Ein kurzer Hinweis $a \equiv \alpha = \frac{\lambda}{\rho c_p}$ verhindert Verwirrung.
4. **Toter Link auf Folie 746:**
   - `[Aufgabenblatt Termin 02](../../Uebungen/Termin_02_Pixel_2D_Waermeleitung/Aufgabenblatt.md)` $\to$ muss `../../Uebungen/Termin_02_Pixelgrafik_und_FDM/Aufgabenblatt.md` lauten.

---

### Kapitel 03: 2D-Visualisierung – Vektorgrafik ([03_Visualisierung_2D_Vektor/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/03_Visualisierung_2D_Vektor/Folien.md))

#### 1. Didaktik & Roter Faden
* Sehr gute Gegenüberstellung, wann Vektorgrafik (`WPF Canvas`) der Pixelgrafik überlegen ist (Tragwerke, Roboterarme, Bemaßungen).
* Die Herleitung der isotropen Skalierung $s = \min(s_x, s_y)$, der Zentrierungsoffsets und der gedrehten Pfeilspitzen mit konstanter Pixellänge $l$ (Zeilen 150–400) ist sehr anschaulich.

#### 2. Kritische Code-Bugs auf den Folien
1. **Schwerer Vorzeichen-/Eigenschafts-Bug in `CoordinateTransformer` ([Zeilen 256–260](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/03_Visualisierung_2D_Vektor/Folien.md#L256-L260)):**
   - Auf der Folie steht im Konstruktor `public CoordinateTransformer(Rect w, Size s, double m)`:
     ```csharp
     _xMin = w.Left;
     _yMax = w.Top;
     ```
   - **Der Bug:** In WPF (`System.Windows.Rect`) ist `w.Top` definiert als `w.Y` (also der **kleinste** Y-Wert $y_{\min}$!), während `w.Bottom` definiert ist als `w.Y + w.Height` (also der **größte** Y-Wert $y_{\max}$!). Wer `Rect world = new Rect(-2, -1, 14, 5);` übergibt (Zeile 272), erhält `w.Top = -1` statt `+4`! Damit wird `_yMax = -1` gesetzt und das gesamte Tragwerk verschwindet invertiert außerhalb des Bildschirms!
   - **Korrektur auf Folie 259:** `_yMax = w.Bottom;` (oder wie in `Vorlage/VectorTrussCanvas/Geometry/Transform2D.cs` explizit `(xMin, xMax, yMin, yMax)` übergeben).
2. **Nicht kompilierender Variablenname beim Maus-Panning ([Zeile 458 vs. Zeile 488](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/03_Visualisierung_2D_Vektor/Folien.md#L458-L495)):**
   - Auf Folie 458 wird das Feld als `private Point _lastPos;` deklariert und in `OnMouseDown` gesetzt.
   - Auf Folie 488 (`OnMouseMove`) heißt die Variable plötzlich `_lastMousePos` (`Vector delta = currentPos - _lastMousePos;`).
3. **Inkonsistenter Parameterzugriff in `ScreenToWorld` ([Zeilen 522–535](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/03_Visualisierung_2D_Vektor/Folien.md#L522-L535)):**
   - Die Methode `public Point ScreenToWorld(Point screenPt, CoordinateTransformer trans)` nimmt `trans` als Parameter entgegen, greift aber in den Zeilen 532–533 direkt auf `_xMin`, `_xOffset`, `_scale` und `_yMax` zu, die private Felder von `CoordinateTransformer` sind!
4. **Toter Link auf Folie 757:**
   - `[Aufgabenblatt Termin 03](../../Uebungen/Termin_03_Vektor_2D_Fachwerk/Aufgabenblatt.md)` $\to$ muss `../../Uebungen/Termin_03_Vektorgrafik_Canvas/Aufgabenblatt.md` lauten.

---

### Kapitel 04: 2D-Visualisierung – Diagramme ([04_Visualisierung_2D_Diagramme/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/04_Visualisierung_2D_Diagramme/Folien.md))

#### 1. Didaktik & Roter Faden
* Sehr gute Einordnung der Diagrammtypen (Zeitreihe, XY-Phasenraum, Histogramm, Bode-Plot) und überzeugende Herleitung des **Welford-Algorithmus** (Abschnitt 4.2, Zeilen 390–500) inklusive Gegenüberstellung mit der numerischen Auslöschung der naiven Varianzformel.

#### 2. Kritische Code- & API-Befunde
1. **Veralteter ScottPlot-4-Code auf Folie 285 ([Zeilen 285–292](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/04_Visualisierung_2D_Diagramme/Folien.md#L285-L292)):**
   - Im Aufgabenblatt 04 (Zeile 12 & 168) wird strengstens gewarnt: *„Es ist zwingend ScottPlot Version 5 einzusetzen! Die veraltete ScottPlot-4-Syntax ist unzulässig.“*
   - Doch mitten in Kapitel 04 auf Folie 285 (`ScottPlot API: Histogramme und Bins`) steht veralteter, in ScottPlot 5 **nicht kompilierender** v4-Mischcode:
     ```csharp
     var hist = new ScottPlot.Statistics.Histogram(durations, min: 0, max: 10, binCount: 20);
     var bar = wpfPlot1.Plot.Add.Bar(hist.Counts, hist.BinCenters);
     bar.BarWidth = (10.0 - 0.0) / 20 * 0.8;
     ```
   - **Korrektur:** Genau denselben sauberen ScottPlot-5-Histogramm-Code verwenden, der bereits in Kapitel 09 ([09_Dynamische_Modelle_Diskret/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/09_Dynamische_Modelle_Diskret/Folien.md#L682-L702), Zeilen 682–702) steht (`ScottPlot.Statistics.Histogram.WithBinCount(20, 0, 10)` und `Plot.Add.Bars(bars)`).
2. **MSAGL-Abschnitt (Abschnitt 4.3, Zeilen 560–750) vs. Übung T04:**
   - Auf Folie 673 (`Erkennung algebraischer Schleifen`) wird das Array `var loopEdges = new[] { eLoop1, eLoop2, eLoop3 };` einfach manuell hartcodiert und rot gefärbt – die Überschrift suggeriert eine algorithmische Erkennung, der Code färbt aber nur drei bekannte Referenzen ein.
   - Zudem wird in Hausübung 04 (Track A & B) die Einbindung von `Microsoft.Msagl.WpfGraphControl` gefordert, im Starter-Kit `Vorlage/ScottPlotTelemetry` ist das NuGet-Paket `Microsoft.Msagl.WpfGraphControl` aber noch nicht eingebunden (siehe Review zu Termin 04).
3. **Toter Link auf Folie 776:**
   - `[Aufgabenblatt Termin 04](../../Uebungen/Termin_04_Diagramme_2D_Telemetrie/Aufgabenblatt.md)` $\to$ muss `../../Uebungen/Termin_04_Telemetrie_und_ScottPlot/Aufgabenblatt.md` lauten.

---

### Kapitel 05: 3D-Visualisierung – OpenGL ([05_Visualisierung_3D_OpenGL/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/05_Visualisierung_3D_OpenGL/Folien.md) & [Folien_Anhang_3D_Normalen.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/05_Visualisierung_3D_OpenGL/Folien_Anhang_3D_Normalen.md))

#### 1. Didaktik, Umfang & Roter Faden
* **Sehr hohes Volumen (1574 Zeilen + 332 Zeilen Anhang):** Obwohl viele Detailfolien zu `gl.Begin(GL_QUADS)` bereits sinnvoll als `*(Deep Dive / Referenz)*` markiert sind und die komprimierte Herleitung in `Folien_Anhang_3D_Normalen.md` ausgelagert wurde, erschlägt die schiere Anzahl an Low-Level-OpenGL-1.1-Folien (Abschnitt 5.1 & 5.2, Zeilen 1–915) im Vorlesungsfluss. Für uns AT-Studierende sind Abschnitt 5.3 (**Szenengraph-Architektur**) und Abschnitt 5.4 (**Vorwärtskinematik & Orbit-Kamera**) die eigentlich wichtigen Ingenieurthemen!

#### 2. Kritische Code- & Mechatronik-Befunde
1. **Mechatronischer Widerspruch: „SCARA-Roboter“ auf den Folien (Zeilen 1230–1290) ist kein SCARA, sondern ein Knickarmroboter!**
   - Ein **SCARA-Roboter** (*Selective Compliance Assembly Robot Arm*) besitzt definitionsgemäß **zwei parallele vertikale Drehachsen** ($\theta_1, \theta_2$, die in der horizontalen Ebene schwenken) und eine vertikale Hubpinole ($d_3$). Genau so ist er auch im Starter-Kit `Uebungen/Termin_05_3D_OpenGL_Szenengraph/Vorlage/SceneGraph3D/MainWindow.xaml.cs` (Zeilen 70–85: beide Arme rotieren um die Y-Achse `Ry`) korrekt gebaut!
   - Auf den Vorlesungsfolien [Zeilen 1255–1268](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/05_Visualisierung_3D_OpenGL/Folien.md#L1255-L1268) rotiert jedoch `axis1` um die **Y-Achse** (`new Rotate(joint1Angle, 0, 1, 0)`) und `axis2` um die **Z-Achse** (`new Rotate(joint2Angle, 0, 0, 1)`)! Das ist ein vertikaler Knickarmroboter (Articulated Robot mit Yaw + Pitch), wird aber auf Folie 1551 als *„3-Achs-SCARA-Roboter“* bezeichnet.
2. **Reihenfolge von `Rotate` und `Translate` in `Group.Render` ([Zeilen 961–975](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/05_Visualisierung_3D_OpenGL/Folien.md#L961-L975) vs. [Zeilen 1255–1285](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/05_Visualisierung_3D_OpenGL/Folien.md#L1255-L1285)):**
   - Auf Folie 971 iteriert `Group.Render` über `foreach (Node child in _children.Values)` (impliziert ein `Dictionary`), während auf Folie 1216 `root.Add(cube1)` (impliziert eine `List<Node>`) aufgerufen wird.
   - Zudem unterscheidet sich die Szenengraph-Architektur auf den Folien (`Node`, `Group`, `Geometry`, `Transform`-Liste aus `Quellen/WS25/VorlageSzenengraph3D`) deutlich von der viel kompakteren Klasse `SceneNode` im Übungs-Starterkit (`Uebungen/Termin_05_.../Vorlage/SceneGraph3D/Scene/SceneNode.cs`). Ein kurzer Hinweis auf den Folien, dass `SceneNode` im Labor `Group` und `Transform` in einer Klasse vereint, hilft enorm.
3. **Toter Link auf Folie 1571:**
   - `[Aufgabenblatt Termin 05](../../Uebungen/Termin_05_OpenGL_3D_Roboter/Aufgabenblatt.md)` $\to$ muss `../../Uebungen/Termin_05_3D_OpenGL_Szenengraph/Aufgabenblatt.md` lauten.

---

### Kapitel 06: Multithreading ([06_Multithreading/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/06_Multithreading/Folien.md))

#### 1. Didaktik & Roter Faden
* **Eines der klarsten und besten Kapitel:** Von Amdahls Gesetz über `Parallel.For` und die zwei klassischen Fallen (Race Condition bei Summenbildung, korrumpierter `Random`-Zustand mit Nullen) bis hin zur reaktiven WPF-Entkopplung (`async/await`, `Task.Run`, `IProgress<T>`, `CancellationToken`) passt jede Folie perfekt zur In-Class-Sprint-Aufgabe in Termin 06!

#### 2. Fehlende Brücke zu Hausübung T06 Track A (`Interlocked` & `Random.Shared`)
* In [Aufgabenblatt 06](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_06_Multithreading_und_TPL/Aufgabenblatt.md#L135-L138) (Track A: Monte-Carlo-Toleranzanalyse mit $10^7$ Montagen) wird explizit verlangt, Histogramm-Bins und Ausschusszähler über thread-lokale Arrays und **`Interlocked.Add`** zusammenzuführen sowie **`Random.Shared`** oder **`ThreadLocal<Random>`** zu nutzen.
* Auf den Vorlesungsfolien von Kapitel 06 (Zeilen 280–345) werden jedoch nur `ConcurrentBag<T>`, `lock (_lockObj)` und `new Random(Guid.NewGuid().GetHashCode())` gezeigt (`Interlocked` und der thread-lokale `Parallel.For`-Overload tauchen erst in Kapitel 09 Zeile 1356 auf!).
* **Empfehlung:** Auf Folie 302 (`Lösung B: Lock für Summen`) eine kurze Box zu `Interlocked.Increment(ref count)` / `Interlocked.Add(ref total, localSum)` und auf Folie 342 zu `Random.Shared.NextDouble()` (ab .NET 6 thread-sicher ohne Allokation!) ergänzen.
* **Toter Link auf Folie 669:**
  - `[Aufgabenblatt Termin 06](../../Uebungen/Termin_06_Multithreading_Speedup/Aufgabenblatt.md)` $\to$ muss `../../Uebungen/Termin_06_Multithreading_und_TPL/Aufgabenblatt.md` lauten.

---

### Kapitel 07: Statische Modelle ([07_Statische_Modelle/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/07_Statische_Modelle/Folien.md))

#### 1. Didaktik & Roter Faden
* **Starke Motivation:** Warum das ideale Fachwerkmodell ($\mathbf{A}\mathbf{x}=\mathbf{b}$) bei statisch überbestimmten Systemen versagt und keine Verformungen liefert, motiviert den Übergang zum elastischen Feder-/FEM-Modell ($\mathbf{K}\mathbf{u}=\mathbf{f}$) hervorragend.

#### 2. Kritische Befunde (Redundanz & fehlendes C#-Mapping)
1. **Wortwörtliche Duplizierung von 5 Folien (Taylor-Linearisierung der Stablänge):**
   - Die komplette Herleitung der Längenänderung $\Delta L(\Delta \vec{p}_i, \Delta \vec{p}_j)$, der partiellen Ableitungen und der Taylor-Linearisierung in **Abschnitt 7.2 ([Zeilen 391–470](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/07_Statische_Modelle/Folien.md#L391-L470))** wird in **Abschnitt 7.3 ([Zeilen 759–859](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/07_Statische_Modelle/Folien.md#L759-L859))** nahezu wortwörtlich (inklusive derselben 2D-Vektoren!) ein zweites Mal wiederholt!
   - **Empfehlung:** In Abschnitt 7.3 (3D-Modell) die 5 redundanten Folien streichen und auf einer einzigen Folie zeigen, dass die Vektorformel $\Delta L \approx \vec{e}_{ij} \cdot (\Delta \vec{p}_j - \Delta \vec{p}_i)$ dimensionsunabhängig in $\mathbb{R}^2$ und $\mathbb{R}^3$ identisch gilt ($\mathbf{K}_e \in \mathbb{R}^{4\times 4}$ in 2D $\to$ $\mathbf{K}_e \in \mathbb{R}^{6\times 6}$ in 3D).
2. **Fehlender C#-Code für Assemblierung & Submatrix-Partitionierung (`kff`, `kpf`):**
   - Auf Folie 1118–1138 wird zwar der Aufruf `uUnknown = kBB.Cholesky().Solve(rhs);` gezeigt, aber **nirgends im Foliensatz ist zu sehen, wie man in C# aus den Stabelementen die globale Matrix $\mathbf{K}$ assembliert und über `freeDofs` / `fixedDofs` die Submatrizen $\mathbf{K}_{ff}$ (`kBB`) und $\mathbf{K}_{pf}$ (`kAB`) extrahiert**!
   - Da genau diese Partitionierung in Übung 07 (und im Quiz) zentral ist, sollte eine Folie das 15-zeilige C#-Snippet aus `GlobalStiffnessMatrix.Partition()` (`Vorlage/TrussFemSolver/Fem/GlobalStiffnessMatrix.cs` Zeilen 93–125) zeigen.
3. **Fehlende Formel zur Euler-Knicklast:**
   - Auf Folie 1161 und in [Aufgabenblatt 07](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_07_Statik_FEM_Cholesky/Aufgabenblatt.md#L168-L172) wird der **Euler-Knicknachweis** ($N_{\text{knick}} = \frac{\pi^2 E I}{L^2}$) für Druckstäbe gefordert. Eine kurze Folie am Ende von Abschnitt 7.2 (Zugversagen $\sigma > R_{p0,2}$ vs. Stabilitätsversagen durch Euler-Knickung bei schlanken Druckstäben) rundet die Ingenieurmechanik perfekt ab.
4. **Toter Link auf Folie 1180:**
   - `[Aufgabenblatt Termin 07](../../Uebungen/Termin_07_Statik_FEM_Fachwerk/Aufgabenblatt.md)` $\to$ muss `../../Uebungen/Termin_07_Statik_FEM_Cholesky/Aufgabenblatt.md` lauten.

---

### Kapitel 08: Dynamische Modelle – Kontinuierlich ([08_Dynamische_Modelle_Kontinuierlich/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md))

#### 1. Didaktik & Roter Faden
* **Fachlich ein Meisterwerk für Automatisierungstechniker:** Die Herleitung des Zustandsraums, der anschauliche Phasenraum-Vergleich (Expliziter Euler spiraliert nach außen = Energiegewinn, Impliziter Euler spiraliert nach innen = künstliche Dämpfung, Semi-Impliziter Euler ist symplektisch = Energieerhaltung), die Dahlquist-Testgleichung $\dot{y} = \lambda y$, die algebraischen Schleifen und der geregelte DC-Servomotor mit **Anti-Windup Clamping** (Abschnitt 8.7) verbinden Regelungstechnik und Systemsimulation auf höchstem Niveau!

#### 2. Kritischer Software-Architektur-Bruch innerhalb von Kapitel 08!
* **Zwei inkompatible `Block`-APIs im selben Foliensatz (und eine dritte in der Übungsvorlage T08):**
  1. **Variante 1 (Abschnitt 8.4 & 8.5, [Zeilen 714–1000](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md#L714-L1000)):**
     - `ContinuousStates` ist eine `List<StateDeclaration>`.
     - Die Methode heißt `public virtual void CalculateDerivatives(double time, double[] cStates, double[] inputs, double[] derivatives)` (bzw. auf Folie 803 plötzlich mit einem 5. Parameter `double[] dStates`!).
  2. **Variante 2 (Abschnitt 8.6 & 8.7, [Zeilen 1590–1765](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md#L1590-L1765)):**
     - Plötzlich ist `ContinuousStates` eine `List<double>` (`ContinuousStates.AddRange(new[] { 0.0, 0.0, 0.0 });` auf Zeile 1594 & 1711)!
     - Die Methode hat plötzlich die Signatur `public override void CalculateDerivatives(double time)` (nur noch 1 Parameter!) und greift auf Properties `ContinuousStates[0]` und `Derivatives[0]` der Basisklasse `Block` zu!
  3. **Variante 3 (Übungsvorlage `Uebungen/Termin_08_DGL_und_SFunctions/Vorlage/SFunctionSimulation/Core/ISFunction.cs`):**
     - Verwendet das schlanke Interface `ISFunction` mit `double[] ComputeDerivatives(double t, double[] x, double[] u)` und `double[] ComputeOutputs(double t, double[] x, double[] u)`.
* **Auswirkung auf Studierende:** Wer in Abschnitt 8.7 die Code-Folien zu `ClosedLoopMotorBlock` (Zeilen 1705–1765) liest und mit Abschnitt 8.4 (`Block.cs` aus `Quellen/WS25/SFunctionContinuous`) vergleicht, versteht nicht, warum die Signaturen und Datentypen komplett anders sind!
* **Empfehlung:**
  - Die Code-Folien in Abschnitt 8.6 und 8.7 (Zeilen 1590–1765) entweder an die Signatur aus Abschnitt 8.4 (`cStates[]`, `derivatives[]`) oder – noch besser! – direkt an das saubere, zustandsfreie `ISFunction`-Interface (`ComputeDerivatives(double t, double[] x, double[] u)`) aus der Übungsvorlage `Termin_08` anpassen!
  - Auf Folie 803 den überzähligen Parameter `double[] dStates` entfernen (diskrete Zustände kommen erst in Kapitel 10).
* **Toter Link auf Folie 1842:**
  - `[Aufgabenblatt Termin 08](../../Uebungen/Termin_08_Dynamik_Kontinuierlich_Antrieb/Aufgabenblatt.md)` $\to$ muss `../../Uebungen/Termin_08_DGL_und_SFunctions/Aufgabenblatt.md` lauten.

---

### Kapitel 09: Dynamische Modelle – Diskret ([09_Dynamische_Modelle_Diskret/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/09_Dynamische_Modelle_Diskret/Folien.md))

#### 1. Didaktik & Roter Faden
* **Ausgezeichnete Struktur:** Der Kontrast zwischen kontinuierlicher Zeitschritt-Integration und dem ereignisgesteuerten Zeitsprung ($t \leftarrow t_{\text{event}}$) mittels .NET `PriorityQueue<Event, double>` (Future Event List) ist kristallklar.
* Die Abschnitte 9.5 bis 9.7 (Little's Gesetz $\bar{L} = \lambda \bar{W}$, Inversionsmethode für Exponentialverteilung, Box-Muller, **warum Normalverteilung wegen $X < 0$ die Kausalität verletzt $\to$ Log-Normalverteilung**, sowie Monte-Carlo-Replikationen mit `ParallelWelfordAccumulator` nach Chan) sind didaktisch erstklassig!

#### 2. Kleine Inkonsistenzen & Skill Gaps zur Übung T09
1. **Uniforme Bedienzeit und statischer `Random`-Aufruf in Abschnitt 9.4 ([Zeilen 532 & 575](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/09_Dynamische_Modelle_Diskret/Folien.md#L532-L575)):**
   - Auf Folie 532 und 575 steht `var serviceTime = Random.NextDouble() * 5 * 60;`. Erstens ist `Random.NextDouble()` in C# keine statische Methode (es müsste `Random.Shared.NextDouble()` oder `_random.NextDouble()` heißen), zweitens wird hier eine Gleichverteilung genutzt, bevor in Abschnitt 9.6 die Exponential-/Log-Normalverteilung eingeführt wird. Ein kurzer Kommentar `// Vorläufig gleichverteilt (in 9.6 folgt Exponential/Log-Normal)` und `Random.Shared.NextDouble()` machen den Code sofort kompilierbar.
2. **Fehlende Brücke zu $M/M/c/K$ (Multi-Server mit Blocking) & Prioritätswarteschlange für Übung T09:**
   - In Abschnitt 9.3–9.5 wird ausschließlich ein einzelner Server (`bool Busy`, unendlicher Puffer $M/M/1/\infty$) betrachtet.
   - In [Aufgabenblatt 09](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Uebungen/Termin_09_Diskrete_Systeme_DES/Aufgabenblatt.md#L96-L183) geht es im Sprint um endliche Pufferkapazität $K$ (**Blocking** mit effektiver Ankunftsrate $\lambda_{\text{eff}} = \lambda(1 - P_{\text{Block}})$) und in Stufe B (Track A & B) um **$c = 3$ parallele Server ($M/M/3/25$)** sowie **Prioritätsklassen (Express/VIP überholt Standard)**.
   - **Empfehlung:** In Abschnitt 9.5 eine einzige Folie *„Erweiterung auf reale Fertigungslinien: $M/M/c/K$ & Prioritäten“* ergänzen, die zeigt:
     1. Statt `bool Busy` zählt `int busyServers < c`.
     2. Bei `waitingQueue.Count >= K` wird der Kunde abgewiesen ($P_{\text{Block}}$) und in Little's Gesetz **muss** $\lambda_{\text{eff}} = \lambda(1 - P_{\text{Block}})$ eingesetzt werden!
     3. Für Prioritäten im Wartepuffer nutzt man entweder zwei Queues (`vipQueue`, `standardQueue`) oder eine `PriorityQueue<Customer, (int Priority, double ArrivalTime)>`.
3. **Toter Link auf Folie 1453:**
   - `[Aufgabenblatt Termin 09](../../Uebungen/Termin_09_Dynamik_Diskret_Fertigung/Aufgabenblatt.md)` $\to$ muss `../../Uebungen/Termin_09_Diskrete_Systeme_DES/Aufgabenblatt.md` lauten.

---

### Kapitel 10: Dynamische Modelle – Hybrid ([10_Dynamische_Modelle_Hybrid/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/10_Dynamische_Modelle_Hybrid/Folien.md))

#### 1. Didaktik & Roter Faden
* **Absolutes Highlight des Kurses:** Wie hier das Zusammenspiel aus kontinuierlicher Physik (Fluss) und diskreten Schaltereignissen (Sprung/Reset) anhand des **hüpfenden Balls (Bouncing Ball)** und des **digitalen Sensors mit Abtastzeit (Sample-and-Hold)** entwickelt wird, ist vorbildlich.
* Die mathematische Herleitung der **endlichen Zeno-Akkumulationszeit** $t_\infty = t_1 + \frac{2 v_{\text{Aufprall}}}{g} \frac{e}{1 - e}$ über die geometrische Reihe (Zeilen 216–285) und die technische Lösung über den Sticking-Schwellwert $v_{\text{min}}$ (Zeilen 295–350) leuchten sofort ein.
* Auch die Gegenüberstellung in Abschnitt 10.6 (Naive Schrittweitenhalbierung scheitert bei mehreren Blöcken $\to$ saubere **Zero-Crossing-Wurzelsuche mittels Bisektion** auf $[t_a, t_b]$ bis $|z| < \varepsilon$, Zeilen 1215–1585) bereitet zu 100 % passgenau auf Übung 10 vor!

#### 2. Minimale Anmerkung zur API-Brücke (Vorlesung vs. Vorlage T10)
* Analog zu Kapitel 08 nutzt die Vorlesung in Abschnitt 10.4–10.6 die `Block`/`Model`/`Solver`-Klassen aus `Quellen/WS25/SFunctionHybrid`, während die Übungsvorlage `Termin_10` das kompaktere Interface `IHybridSystem` (`ComputeDerivatives`, `ZeroCrossingIndicator`, `ApplyDiscreteReset`) und `BisectionRootFinder.FindRoot(...)` verwendet. Ein einzeiliger Hinweis am Ende von Abschnitt 10.6 auf `IHybridSystem` und `BisectionRootFinder` in der Laborvorlage genügt vollkommen.
* *(Hinweis: Der Link auf Folie 1627 zu `../../Uebungen/Termin_10_Hybride_Dynamik_Synthese/Aufgabenblatt.md` ist korrekt!)*

---

### Kapitel 11: Epilog ([11_Epilog/Folien.md](file:///c:/Users/georg/Desktop/Repositories/kurs-computer-simulation/Folien/11_Epilog/Folien.md))

#### 1. Didaktik & Roter Faden
* **Exzellente Synthese:** Der Epilog fasst nicht einfach nur Folien zusammen, sondern liefert uns Studierenden das „Ingenieur-Handwerkszeug“ für die Praxis und die Bachelorarbeit:
  - **Entscheidungsbaum zur Modellwahl** (Statisch vs. Kontinuierlich vs. Diskret vs. Hybrid, Zeilen 70–265).
  - **Industrielle Co-Simulation & FMI/FMU-Standard** (Functional Mock-up Interface, Master-Slave-Orchestrierung, Hardware-in-the-Loop, Zeilen 305–540).
  - **3-Stufen-Validierung einer Simulation** (Erhaltungssatz-Prüfung, Grenzfallanalyse, Analytischer Abgleich, Zeilen 822–847) und der **„Teufelskreis der numerischen Instabilität“** (Zeilen 874–893).
* Die Abschlussfolien (Zeilen 925–987) sind bereits vollständig auf das aktuelle **10-Meilensteine-Portfolio + 2-Säulen-Bewertungsmodell (40 % Quizzes an T03/T05/T08/T10, 60 % Portfolio/Showcase/Peer-Review)** aktualisiert.

#### 2. Kleine Anmerkung zu Abschnitt 11.4 (Zeilen 545–818)
* In Abschnitt 11.4 (*„Best Practices für eigene Simulationsprojekte“*, z. B. Folie 858 *„Häufige Fehlerquellen in Studierendenprojekten... Nach Wochen noch kein lauffähiger Code“*) klingt sprachlich noch leicht das frühere freie Semesterprojekt durch, auch wenn es als allgemeiner Leitfaden für eigene Ingenieur-/Bachelorprojekte super passt. Ein kurzer Halbsatz auf der Abschnittstrennfolie 548 (*„Leitfaden für Ihr Code-Portfolio, zukünftige F&E-Projekte und Ihre Bachelorarbeit“*) stellt klar, dass kein separates elftes Projekt abgegeben werden muss.
