---
marp: true
theme: fhooe
header: 'Kapitel 11: Epilog'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

<!-- _paginate: false -->
<!-- _header: "" -->
<!-- _footer: "" -->

![bg right](./Titelbild.jpg)

# Kapitel 11: Epilog

Dieses abschließende Kapitel umfasst die folgenden Abschnitte:

- 11.1: Die große Synthese: Modell- & Visualisierungstaxonomie
- 11.2: Leitfaden zur Modellauswahl in Industrieprojekten
- 11.3: Softwarearchitektur & Best Practices für Simulationscode
- 11.4: Der Digitale Zwilling in der industriellen Praxis
- 11.5: Hinweise zur Projektarbeit und Prüfung

---

## 11.1: Die große Synthese

Dieser Abschnitt umfasst die folgenden Inhalte:

- Rückblick auf die 4 Simulationsmodellarten (Statisch, Kontinuierlich, Diskret, Hybrid)
- Die Modellierungsmatrix: Zeitverhalten vs. Zustandsraum
- Rückblick auf die 4 Visualisierungsarten (Pixel, Vektor, Charts/Graphen, 3D)
- Die optimale Paarung von Modell und Visualisierung

---

### Die 4 Simulationsmodellarten im Überblick

Im Verlauf des Semesters haben wir vier grundlegende Paradigmen der mathematischen Modellierung kennengelernt:

<div class="columns top">
<div>

**1. Statische Modelle (Kap. 7)**
- Zeitinvariantes Verhalten
- Zustand im statischen Gleichgewicht
- Algebraische Gleichungssysteme ($A \cdot x = b$)
- Bsp.: Statisches Fachwerk, Widerstandsnetzwerk

**2. Kontinuierliche Modelle (Kap. 8)**
- Zeit stetig: $t \in \mathbb{R}$
- Zustand stetig: $x(t) \in \mathbb{R}^n$
- Gewöhnliche Differentialgleichungen ($\dot{x} = f(x, u, t)$)
- Bsp.: Vertikaler Wurf, Federpendel

</div>
<div>

**3. Diskrete Modelle (Kap. 9)**
- Zeit getaktet ($t_k$) oder ereignisbasiert ($t_e$)
- Zustand zählbar/diskret: $s \in S$
- Zustandsübergangsfunktionen ($s_{k+1} = \delta(s_k, e)$)
- Bsp.: Warteschlangen, Fördertechnik, Logistik

**4. Hybride Modelle (Kap. 10)**
- Kopplung kontinuierlicher Dynamik mit diskreten Sprüngen
- Phasen stetiger Bewegung + Events (Zero-Crossing)
- Bsp.: Bouncing Ball (Stoß), Thermostat mit Hysterese

</div>
</div>

---

### Die Modellierungsmatrix

<div class="columns top">
<div>

Das Zusammenspiel von **Zeitachse** und **Zustandsraum** spannt den mathematischen Raum aller Modellierungsarten auf:

- **Zeit:**
  - Statisch (keine Zeitabhängigkeit)
  - Kontinuierlich ($t \in \mathbb{R}$)
  - Diskret ($t_k = k \cdot \Delta t$ oder Next-Event $t_e$)
- **Zustand:**
  - Kontinuierlich ($x \in \mathbb{R}^n$)
  - Diskret ($s \in S$)
  - Gemischt / Hybrid ($(x, m) \in \mathbb{R}^n \times M$)

</div>
<div class="two">

![h:440px](./Diagramme/Modellierungsmatrix.svg)

</div>
</div>

---

### Vergleichende Taxonomie der Modellarten

| Kriterium | Statisch (Kap. 7) | Kontinuierlich (Kap. 8) | Diskret (Kap. 9) | Hybrid (Kap. 10) |
| :--- | :--- | :--- | :--- | :--- |
| **Zeitverhalten** | Zeitinvariant / Stationär | Kontinuierlich ($t \in \mathbb{R}$) | Diskrete Schritte / Ereignisse | Stetige Phasen + diskrete Events |
| **Zustandsraum** | Kontinuierlich ($x \in \mathbb{R}^n$) | Kontinuierlich ($x(t) \in \mathbb{R}^n$) | Abzählbar ($s \in S$) | Gemischt ($x \in \mathbb{R}^n, m \in M$) |
| **Mathematik** | $f(x, u) = 0$ bzw. $A \cdot x = b$ | $\dot{x}(t) = f(x, u, t)$ | $s_{k+1} = \delta(s_k, e_k)$ | $\dot{x} = f_m(x, u), g(x)=0 \implies x^+$ |
| **Lösungsverfahren** | Gauß, LU-Zerlegung, CG | Euler, Heun, Runge-Kutta 4 | Next-Event-Time-Advance | Integrator mit Zero-Crossing |
| **C#-Bibliotheken** | `Math.NET Numerics` | Eigene Integratoren, Simulink-Arch. | Eigene Event-Queue / PriorityQueue | S-Function Hybrid Solver |
| **Typische Anwendung** | Tragwerke, Strömungsfeld | Regelungstechnik, Mechanik | Fertigungslinien, Logistik | Roboter mit Kontakt, Leistungselektronik |

---

### Die 4 Visualisierungsarten im Überblick

Simulation ohne verständliche Visualisierung bleibt eine Black Box. Wir haben vier Grafikparadigmen in C# erarbeitet:

<div class="columns top">
<div>

**1. Pixelgrafik (Kap. 2)**
- Technologie: `WriteableBitmap` (WPF)
- Direkter Speicherzugriff via Pointer (`Lock()`)
- Darstellung von 2D-Skalar- und Vektorfeldern
- Bsp.: Temperaturverteilung, Druckfelder

**2. Vektorgrafik (Kap. 3)**
- Technologie: `Canvas`, `Shape`, `Path` (WPF)
- Auflösungsunabhängig, Matrixtransformationen
- Geometrische 2D-Objekte, Zooming & Panning
- Bsp.: Kinematische Mechanismen, Fachwerke

</div>
<div>

**3. Diagramme & Graphen (Kap. 4)**
- Technologie: `ScottPlot` (1D/2D Charts) & `MSAGL`
- Schnelle Zeitreihen, Phasenporträts, Histogramme
- Topologische Graphen, Signalflüsse, Zustandsnetze
- Bsp.: Trajektorien $y(t)$, Petri-Netze, Flussdiagramme

**4. 3D-Visualisierung (Kap. 5)**
- Technologie: `SharpGL` / OpenGL
- Szenengraph, Vertices, Normalen, Beleuchtung
- Räumliche Immersion und Kameraprojektion
- Bsp.: 3D-Roboterarm, räumliche Mehrkörpersysteme

</div>
</div>

---

### Die optimale Paarung von Modell und Visualisierung

Nicht jede Visualisierung passt zu jedem Modell. Eine fundierte Architektur wählt gezielt die informative Darstellung:

<div class="columns top">
<div>

- **Feldgrößen & Stationäre Verteilungen:**
  - Modell: Statisch (Kap. 7) oder Diffusions-DGLs
  - Vis: **Pixelgrafik** (Farbgradienten / Isolinien)
- **Kinematik & Mechanismen:**
  - Modell: Kontinuierlich (Kap. 8) oder Hybrid (Kap. 10)
  - Vis: **Vektorgrafik** oder **3D-Szenengraph**
- **Systemdynamik & Regleranalyse:**
  - Modell: Kontinuierlich (Kap. 8)
  - Vis: **ScottPlot** (Signalverläufe, Bode-Diagramme)
- **Materialfluss & Automatisierungsnetze:**
  - Modell: Diskret (Kap. 9)
  - Vis: **MSAGL** (Netzwerktopologien) & Canvas

</div>
<div>

| Anwendungsfall | Geeignete Visualisierung |
| :--- | :--- |
| Kontinuierliche Schwingung | **ScottPlot** (Zeitreihe) |
| Räumliches Fachwerk | **Canvas** / **SharpGL 3D** |
| Fertigungs-Materialfluss | **MSAGL** / **Canvas** (Topologie) |
| Kontaktmechanik (Ball) | **ScottPlot** + **Canvas-Anim.** |
| 2D-Wärmeleitung | **WriteableBitmap** (Pixel) |

> **Leitsatz:** Die Visualisierung muss den Erkenntnisgewinn maximieren – Ästhetik dient der didaktischen Klarheit, nicht dem Selbstzweck!

</div>
</div>

---

## 11.2: Leitfaden zur Modellauswahl

Dieser Abschnitt umfasst die folgenden Inhalte:

- Die Kunst der ingenieurmäßigen Abstraktion
- Das "Magische Viereck" der Modellierung (Trade-Offs)
- Entscheidungsbaum für reale Industrieprojekte
- Multi-Fidelity-Modellierung und Skalierbarkeit

---

### Die Kunst der Abstraktion

<div class="columns top">
<div class="two">

> *"All models are wrong, but some are useful."*  
> — George E. P. Box

> *"Everything should be made as simple as possible, but not simpler."*  
> — Albert Einstein

**Zentrale Erkenntnis für Ingenieure:**
- Ein Modell ist niemals ein 1:1-Abbild der Realität.
- Wer versucht, jedes Detail abzubilden, scheitert an Rechenzeit, Parametrieraufwand und Fehleranfälligkeit.
- Das Ziel ist stets ein **Zweckmodell**: minimaler Modellierungsaufwand bei ausreichender Genauigkeit zur Beantwortung der Fragestellung!

</div>
<div>

**Typische Abstraktionsstufen:**

1. **Punktmasse:** Reicht für Bahnkurven aus.
2. **Starrer Körper (Rigid Body):** Reicht für Trägheit & Momente.
3. **Elastischer Mehrkörper:** Erforderlich bei Durchbiegung & Schwingung.
4. **Finite Elemente (FEM):** Notwendig für lokale Spannungsspitzen.

</div>
</div>

---

### Das Magische Viereck der Simulationsmodellierung

Jede Modellierungsentscheidung in der Industrie bewegt sich in einem Zielkonflikt aus vier Dimensionen:

<div class="columns top">
<div>

1. **Detailgrad & Granularität**
   - Höhere physikalische Wiedergabetreue
   - Erfordert mehr Parameter und feinere Diskretisierung
2. **Modellierungs- & Kalibrieraufwand**
   - Entwicklungszeit für mathematische Herleitung
   - Aufwand für Sensorik, Messungen und Parameteridentifikation

</div>
<div>

3. **Rechenzeit & Echtzeitfähigkeit**
   - Simulation schneller als Realzeit (Offline-Optimierung)?
   - Strikte Zeitschranken für Hardware-in-the-Loop ($< 1\,\text{ms}$)?
4. **Datenverfügbarkeit**
   - Sind Stoffwerte, Reibwerte, Dämpfungsparameter bekannt?
   - Ein hochkomplexes Modell mit geschätzten Parametern liefert Scheingenauigkeit ("Garbage in, Garbage out")!

</div>
</div>

---

### Entscheidungsbaum: Welches Paradigma wählen?

<div class="columns top">
<div>

**Leitfragen für Ihr Industrieprojekt:**

1. **Ändert sich das System über die Zeit?**
   - *Nein:* $\implies$ **Statisches Modell** (Kap. 7)
2. **Dominieren kontinuierliche physikalische Fluss- und Speichergrößen?**
   - *Ja:* $\implies$ **Kontinuierliches Modell** (Kap. 8)
   - Weiter: Sind hohe Steifigkeiten vorhanden? (Wahl expliziter vs. impliziter Solver)
3. **Wird das System durch diskrete Ereignisse, Takte oder Stückgut getrieben?**
   - *Ja:* $\implies$ **Diskretes Modell** (Kap. 9)
4. **Treten signifikante Anschläge, Strukturwechsel oder Reibungshysteresen auf?**
   - *Ja:* $\implies$ **Hybrides Modell** (Kap. 10)

</div>
<div>

![w:540](./Diagramme/Entscheidungsbaum_Modellarten.svg)

> **Praxis-Tipp:** Beginnen Sie immer mit dem einfachsten Modell (z.B. kontinuierliche Punktmasse). Erweitern Sie erst dann auf diskrete Zustände oder hybride Kontakte, wenn die Validierung Lücken zeigt.

</div>
</div>

---

### Multi-Fidelity-Modellierung im Lebenszyklus

In modernen Industrieunternehmen (Automotive, Maschinenbau, Luftfahrt) existiert selten nur ein einziges Modell:

<div class="columns top">
<div>

**Konzeptphase (Low-Fidelity):**
- 1D-Systemsimulation (z.B. konzentrierte Massen, ideale Quellen)
- Grobe Abschätzung der Hauptabmessungen, Motordimensionierung
- Rechenzeit im Millisekundenbereich $\implies$ Optimierungsschleifen

**Detailentwurf & Absicherung (High-Fidelity):**
- 3D-FEM (Strukturmechanik) und CFD (Strömungssimulation)
- Hohe Genauigkeit, Rechenzeit Stunden bis Tage
- Validierung kritischer Bauteile

</div>
<div>

**Virtuelle Inbetriebnahme & Betrieb (Real-Time):**
- Zurückführung auf echtzeitfähige Zustandsraummodelle
- Surrogatmodelle oder Co-Simulation (FMI/FMU)
- Synchronisation mit SPS-Taktzeiten (1 ms)

![w:540](./Diagramme/Detailgrad_Projektfortschritt.svg)

</div>
</div>

---

## 11.3: Softwarearchitektur & Best Practices

Dieser Abschnitt umfasst die folgenden Inhalte:

- Das Architekturmuster: Modell vs. Solver vs. UI
- Numerische Fallstricke & IEEE-754 Floating-Point-Präzision
- Multithreading: Physik-Update vs. Render-Schleife
- Performance-Profiling & sauberes Ressourcenmanagement

---

### Die goldene Regel: Trennung von Modell, Solver und UI

Einer der häufigsten Fehler bei Simulationssoftware ist die Vermischung von Gleichungen, Lösungsverfahren und Benutzeroberfläche:

<div class="columns top">
<div class="two">

**1. Das Modell (`Model`)**
- Beinhaltet rein deklarativ Systemparameter, Zustandsvektoren $\mathbf{x}$ und Ableitungsfunktionen $\mathbf{f}(\mathbf{x}, \mathbf{u}, t)$.
- Hat **keine** Abhängigkeit zu WPF, Windows Forms oder Grafikelementen!
- Kennt seinen Solver nicht.

**2. Der Solver (`Solver`)**
- Kapselt den mathematischen Lösungsalgorithmus (z.B. `EulerSolver`, `RungeKutta4Solver`, `LUDecomposition`).
- Ruft das Modell über Schnittstellen (`ISimulationModel`) auf.
- Beliebig austauschbar für Genauigkeits- und Stabilitätsvergleiche!

</div>
<div>

**3. Die Benutzeroberfläche (`UI / Renderer`)**
- Liest Zustände nur lesend aus (Polling oder Push via Events/DataBinding).
- Darf die zeitkritische Integrationsschleife niemals blockieren!
- Kann bei Bedarf Frames auslassen (Frame Skipping), während der Solver mit festem Zeitschritt weiterrechnet.

</div>
</div>

---

### Softwarearchitektur: Interfaces & Entkopplung

```csharp
// 1. Reines Modell: Frei von UI- und Solver-Logik
public interface IContinuousModel {
    int StateDimension { get; }
    void ComputeDerivatives(double t, double[] x, double[] u, double[] dxdt);
}

// 2. Unabhängiger Solver: Austauschbares Lösungsverfahren
public interface IContinuousSolver {
    void Step(IContinuousModel model, double t, double[] x, double dt);
}

// 3. Konkreter Solver: z.B. Runge-Kutta 4. Ordnung
public class RungeKutta4Solver : IContinuousSolver {
    public void Step(IContinuousModel m, double t, double[] x, double dt) =>
        /* RK4-Berechnung (k1..k4) unabhängig vom Physikmodell */;
}
```

*Vorteil:* Sie können dasselbe Pendelmodell einmal mit explizitem Euler, einmal mit RK4 und einmal mit adaptivem Schrittweitenverfahren simulieren – ohne eine einzige Zeile Modellcode zu ändern!

---

### Numerische Fallstricke: Floating-Point-Präzision

Numerische Simulationen basieren auf IEEE 754 Gleitkommaarithmetik. Unbedachte Implementierungen führen schnell zu gravierenden Fehlern:

<div class="columns top">
<div>

**`float` vs. `double`:**
- Für physikalische Simulationen in C# grundsätzlich `double` (64-Bit) verwenden!
- `float` (32-Bit) hat nur ca. 7 Dezimalstellen Mantissenpräzision $\implies$ Rundungsfehler akkumulieren rasch bei kleinen Zeitschritten.

**Akkumulationsfehler bei Zeitschritten:**
- Schlecht: $t = t + \Delta t$ über Millionen Schritte.
- Besser: $t_k = t_0 + k \cdot \Delta t$ mit ganzzahligem Schrittzähler $k$.

</div>
<div>

**Auslöschung (Catastrophic Cancellation):**
- Tritt auf, wenn zwei fast gleich große Zahlen voneinander subtrahiert werden:
$$ x - y \quad \text{mit} \quad x \approx y $$
- Führt zum fast vollständigen Verlust signifikanter Stellen.
- *Lösung:* Algebraische Umformung der Formeln vor der Berechnung!

**Division durch Null bei Kontakten:**
- Z.B. bei Gravitationsgesetzen $F = G \frac{m_1 m_2}{r^2}$: Wenn $r \to 0$, divergiert die Kraft ins Unendliche.
- *Best Practice:* Regularisierung einführen: $r_{\text{reg}} = \sqrt{r^2 + \epsilon^2}$.

</div>
</div>

---

### Steifigkeit (Stiffness) & Stabilitätsgrenzen

<div class="columns top">
<div>

Ein DGL-System heißt **steif**, wenn Prozesse auf extrem unterschiedlichen Zeitskalen gleichzeitig ablaufen (z.B. sehr harte Feder mit schneller Schwingung gekoppelt an langsame Bewegung):

- Bei expliziten Verfahren (z.B. Euler, RK4) bestimmt die **schnellste** Eigenkreisfrequenz $\omega_{\max}$ die maximale Schrittweite:
$$ \Delta t < \frac{2}{\omega_{\max}} $$
- Wird $\Delta t$ minimal zu groß gewählt, explodiert die Simulation numerisch gegen $\pm \infty$!
- *Lösung in der Industrie:* Implizite Integrationsverfahren (z.B. BDF, impliziter Euler/Trapezmethode) oder algebraische Reduktion steifer Teilsysteme.

</div>
<div>

![w:540](./Diagramme/Numerische_Divergenz_vs_Stabil.svg)

> **Faustregel:** Wählen Sie die Schrittweite mindestens um den Faktor 10 bis 20 kleiner als die kleinste Systemzeitkonstante: $\Delta t \le \frac{T_{\min}}{10}$.

</div>
</div>

---

### Multithreading: Trennung von Physik & Rendering

In interaktiven Simulationen (wie unserem WPF-Simulator) müssen Berechnungslogik und Visualisierung nebenläufig betrieben werden:

<div class="columns top">
<div>

**Der Simulationsthread (Hintergrund):**
- Läuft in einer eigenständigen Task oder Timer-Schleife mit festem $\Delta t$ (z.B. 1 ms = 1000 Hz).
- Garantiert physikalisch konstante Zeitschritte, unabhängig von der Bildschirmwiederholrate.
- Nutzt für rechenintensive Vektoroperationen die Task Parallel Library (`Parallel.For`).

**Der UI-Thread (WPF Dispatcher):**
- Rendert den aktuellen Zustand mit z.B. 60 FPS ($\approx 16.6\,\text{ms}$).
- Synchronisation über thread-sichere Datenübergabe (Snapshot-Pattern oder Lock-Free Ringbuffer).

</div>
<div>

![w:540](./Diagramme/Thread_Architektur_Simulation.svg)

> **Wichtig:** Niemals rechenintensive `for`-Schleifen direkt im WPF-UI-Thread ausführen! Das führt zum sofortigen Einfrieren der GUI.

</div>
</div>

---

### Profiling: Messen statt Raten

<div class="columns top">
<div class="two">

Optimieren Sie Ihren Simulationscode niemals auf Basis von Bauchgefühl:

- Nutzen Sie `System.Diagnostics.Stopwatch` für mikrofeine Laufzeitmessungen.
- Verwenden Sie moderne Profiler (Visual Studio Diagnostic Tools, JetBrains dotTrace).
- Achten Sie auf den **Garbage Collector (GC):**
  - Allokieren Sie Arrays für Zustände und Zwischenergebnisse (`double[] k1, k2`) **vor** der Simulationsschleife!
  - Werden in jedem Zeitschritt neue Objekte allokiert, triggert die .NET Runtime GC-Pausen (Stop-the-World), die Echtzeitfähigkeit zerstören.
- Nutzen Sie `Span<double>` und `stackalloc` für kleine, temporäre Vektoren.

</div>
<div>

```csharp
// Schlecht: Allokation in Schleife
while (simulating) {
    var k1 = new double[dim]; // GC Stress!
    model.Derivatives(t, x, k1);
    ...
}

// Exzellent: Wiederverwendung
var k1 = new double[dim];
var k2 = new double[dim];
while (simulating) {
    model.Derivatives(t, x, k1);
    ...
}
```

</div>
</div>

---

## 11.4: Digitaler Zwilling in der Praxis

Dieser Abschnitt umfasst die folgenden Inhalte:

- Vom Simulationsmodell zum vollwertigen Digitalen Zwilling
- Co-Simulation und der Industriestandard FMI / FMU
- Virtuelle Inbetriebnahme (VIBN) und Hardware-in-the-Loop (HiL)
- KI-Surrogatmodelle & Physics-Informed Neural Networks (PINNs)

---

### Der Weg zum Digitalen Zwilling

Ein Simulationsmodell allein ist noch kein Digitaler Zwilling. Erst die Verknüpfung mit realen Betriebsdaten schafft die Zwillingsidentität:

<div class="columns top">
<div>

**1. Digitales Modell (Digital Model)**
- Reine Simulation ohne automatisierten Datenfluss zur Realität.
- Dient dem Entwurf und der Auslegung in der Konstruktionsphase.

**2. Digitaler Schatten (Digital Shadow)**
- Einweg-Datenfluss: Sensorik der physischen Anlage überträgt Daten an das Modell.
- Dient dem Zustandsmonitoring, der Diagnose und der Protokollierung.

</div>
<div>

**3. Digitaler Zwilling (Digital Twin)**
- **Bidirektionaler, geschlossener Datenfluss!**
- Messdaten kalibrieren kontinuierlich das Modell.
- Das Modell berechnet optimale Stellgrößen oder prädiziert Ausfälle und steuert die reale Anlage aktiv nach.

![w:540](./Diagramme/Kopplung_Realsystem_DigitalerZwilling.svg)

</div>
</div>

---

### Co-Simulation mit FMI / FMU

In realen Industrieanlagen stammen Teilsysteme aus unterschiedlichen Domänen und Entwicklungswerkzeugen:

<div class="columns top">
<div>

- Mechanik in CAD/Multi-Body (z.B. Adams, Simpack)
- Hydraulik & Thermik in Modelica / Dymola
- Regelungstechnik in MATLAB / Simulink
- Übergeordnete Logik & Visualisierung in C# / .NET

**Der Standard: Functional Mock-up Interface (FMI)**
- Ein offener, werkzeugunabhängiger Schnittstellenstandard.
- Exportiert Teilmodelle als **FMU (Functional Mock-up Unit)**: ZIP-Archiv mit C-Code/Binaries und XML-Beschreibung.

</div>
<div>

**Zwei FMI-Modi:**
1. **Model Exchange (ME):** Die FMU enthält nur die Modellgleichungen; der Master-Simulator steuert die numerische Integration.
2. **Co-Simulation (CS):** Jede FMU bringt ihren eigenen internen Solver mit; der Master synchronisiert lediglich Ein- und Ausgänge an diskreten Kommunikationspunkten.

![w:540](./Diagramme/FMI_CoSimulation_Architektur.svg)

</div>
</div>

---

### Virtuelle Inbetriebnahme (VIBN) & HiL

Bevor eine Sondermaschine physisch gebaut wird, spart die virtuelle Inbetriebnahme enorme Kosten und Risiken:

<div class="columns top">
<div>

**MiL (Model-in-the-Loop):**
- Steuerungsalgorithmus und Anlagenmodell laufen gemeinsam in der Simulationsumgebung.

**SiL (Software-in-the-Loop):**
- Der compilierte SPS-Code (z.B. B&R Automation Studio, Siemens TIA) wird auf einem Soft-SPS-Emulator ausgeführt und mit dem Simulationsmodell gekoppelt.

**HiL (Hardware-in-the-Loop):**
- Die reale physische SPS wird über Feldbus (EtherCAT, PROFINET) an einen Echtzeitrechner angeschlossen, der das Anlagenmodell berechnet.

</div>
<div>

![h:380px](./Diagramme/VIBN_Systemarchitektur.svg)

> **Nutzen:** Test von Not-Aus-Szenarien und Fehlsituationen ohne Beschädigungsgefahr für reale Maschinen!

</div>
</div>

---

### KI-Surrogatmodelle & Physics-Informed Neural Networks

Komplexe FEM- oder CFD-Simulationen benötigen oft Stunden – unmöglich für die Echtzeitüberwachung an der Maschine:

<div class="columns top">
<div>

**Surrogatmodelle (Reduced Order Models - ROM):**
- Ein künstliches neuronales Netz (z.B. MLP, LSTM) wird mit den Ein- und Ausgangsdaten der hochpräzisen Offline-Simulation trainiert.
- Zur Laufzeit berechnet das neuronale Netz die Systemantwort in **Mikrosekunden**!
- Ermöglicht modellprädiktive Regelung (MPC) direkt auf Edge-Controllern.

</div>
<div>

**Physics-Informed Neural Networks (PINNs):**
- Klassische KI lernt rein datenbasiert ("Black Box") und kann bei Datenmangel physikalisch unsinnige Werte liefern.
- PINNs betten die physikalischen Differentialgleichungen (z.B. Navier-Stokes, Biegung) direkt in die Verlustfunktion (Loss Function) des Netzes ein!
- Das neuronale Netz respektiert damit physikalische Erhaltungssätze (Energie, Impuls, Masse).

</div>
</div>

---

## 11.5: Hinweise zur Projektarbeit und Prüfung

Dieser Abschnitt umfasst die folgenden Inhalte:

- Kriterien für herausragende Simulationsprojekte
- Validierungsstrategien und Plausibilitätsprüfungen
- Typische Fallstricke bei der Abgabe
- Prüfungsrelevanz und Kernkompetenzen für Ihren Werdegang

---

### Kriterien für eine erfolgreiche Projektarbeit

Für die Umsetzung Ihrer simulationsbezogenen Semesteraufgabe gelten folgende Qualitätsmaßstäbe:

<div class="columns top">
<div>

**1. Saubere mathematische Herleitung**
- Formulieren Sie das System zuerst auf Papier!
- Klären Sie: Welche Zustandsvariablen bilden den Vektor $\mathbf{x}$?
- Welche Vereinfachungen und Annahmen wurden getroffen?

**2. Software-Architektur**
- Konsequente Entkopplung von `Model`, `Solver` und `View`.
- Keine "God-Objects" oder 2000-Zeilen-Codeblocks im Code-Behind der WPF-Fenster.
- Verständliche Variablenbenennung (Physikalische Größen und Einheiten in XML-Kommentaren dokumentieren).

</div>
<div>

**3. Numerische Robustheit**
- Begründete Wahl des Solvers (z.B. RK4 statt reinem Euler bei Schwingungssystemen).
- Nachweis der Schrittweitenkonvergenz (Vergleich mit kleinerem $\Delta t$).

**4. Visuelle Aussagekraft**
- Nicht nur Zahlenwerte in Textboxen!
- Flüssige Animation der Mechanik (Canvas / 3D) kombiniert mit ScottPlot-Zeitverläufen für relevante Zustände.

</div>
</div>

---

### Wie validiert man eine Simulation?

Ein Modell, dessen Ergebnisse nicht hinterfragt werden, ist wertlos. Wenden Sie folgende Validierungsstufen an:

<div class="columns top">
<div class="two">

**1. Erhaltungssatz-Prüfung (Sanity Check):**
- Bei konservativen mechanischen Systemen: Bleibt die Gesamtenergie $E_{\text{ges}} = E_{\text{kin}} + E_{\text{pot}}$ über die Zeit konstant?
- Bei elektrischen Netzwerken: Gilt die Kirchhoffsche Knotensatz-Bilanz $\sum I = 0$?

**2. Grenzfallanalyse (Extreme Condition Testing):**
- Was passiert bei Masse $m \to 0$ oder Steifigkeit $c \to \infty$?
- Was passiert bei Reibung $\mu = 0$ (Dauerschwingung) vs. $\mu \to \infty$ (Stillstand)?
- Verhält sich das Modell an den physikalischen Rändern plausibel?

</div>
<div>

**3. Analytischer Abgleich:**
- Lösen Sie einen vereinfachten Spezialfall analytisch (z.B. ungedämpftes Federpendel ohne Reibung) und vergleichen Sie den numerischen Verlauf direkt mit der exakten Sinusfunktion.

$$ \text{Fehler}(t) = \|x_{\text{num}}(t) - x_{\text{analytisch}}(t)\| $$

</div>
</div>

---

### Typische Fallstricke vermeiden

<div class="columns top">
<div>

**Häufige Fehler in Studierendenprojekten:**

- **Zu ambitionierter Start:** Beginn mit einem komplexen 3D-Mehrkörpersystem mit Reibung und Kontakt $\implies$ Nach Wochen noch kein lauffähiger Code.
  - *Gegenmittel:* **Agile Modellierung!** Minimal funktionsfähiges 1D-System zum Laufen bringen, dann schrittweise verfeinern.
- **Zeitschritt-Katastrophen:** $\Delta t$ wird im Code hart verdrahtet und unreflektiert vergrößert, wenn die Simulation ruckelt.
- **Rundungsfehler bei Kollisionen:** Bei Hybrid-Systemen sinkt der Ball in den Boden ein, weil kein Zero-Crossing verwendet wird.

</div>
<div>

![w:540](./Diagramme/Teufelskreis_Numerische_Instabilitaet.svg)

> **Die Lösung:** Solver-Schrittweite $\Delta t$ klein halten, Berechnungs-Schleife optimieren und Render-Frequenz entkoppeln!

</div>
</div>

---

### Prüfungsrelevanz: Was müssen Sie beherrschen?

Für die mündliche/schriftliche Prüfung im Fach Systemsimulation / Digitaler Zwilling:

<div class="columns top">
<div>

**Theorie & Mathematik:**
- Systemzustand, Zustandsraum, Ordnung einer DGL.
- Umwandlung einer DGL n-ter Ordnung in ein System 1. Ordnung.
- Funktionsweise von explizitem Euler, Heun und Runge-Kutta 4. Ordnung.
- Stabilitätsbedingungen und Fehlerordnung ($O(\Delta t^p)$).
- Zero-Crossing-Detektion und Diskrete-Ereignis-Verarbeitung.

</div>
<div>

**Software & Architektur:**
- Strukturierung einer Simulationsengine nach dem S-Funktions-Paradigma.
- Vor- und Nachteile der 4 Visualisierungsarten (`WriteableBitmap`, `Canvas`, `ScottPlot`, `SharpGL`).
- Multithreading-Konzepte: Warum und wie werden Berechnung und Rendering getrennt?
- Definition und Nutzen von FMI, Co-Simulation und HiL.

</div>
</div>

---

### Zusammenfassung: Ihr Werkzeugkasten als Ingenieur

<div class="columns top">
<div>

Mit dem Abschluss dieses Kurses besitzen Sie ein fundamentales Verständnis:

1. **Modelle verstehen:** Sie können reale mechatronische Systeme in statische, kontinuierliche, diskrete oder hybride Formalismen übersetzen.
2. **Algorithmen beherrschen:** Sie wissen, welcher numerische Lösungsansatz stabil und effizient zum Ziel führt.
3. **Software bauen:** Sie können performante Simulationsprogramme in C# mit moderner Benutzeroberfläche und flüssiger Visualisierung entwickeln.

</div>
<div>

![h:380px](./Diagramme/Simulationsprozess_Synthese.svg)

</div>
</div>

---

![bg right](./Titelbild.jpg)

# Viel Erfolg!

> *"Die Simulation ist die Kunst, die Konsequenzen von Entscheidungen zu erforschen, bevor diese in der Realität teure oder fatale Fehler verursachen."*

Viel Erfolg bei Ihrer Projektarbeit und der bevorstehenden Prüfung!

Nutzen Sie die erlernten Fähigkeiten für Ihre Bachelorarbeit und Ihre zukünftigen Aufgaben als Entwickler moderner Automatisierungs- und Industriesysteme!
