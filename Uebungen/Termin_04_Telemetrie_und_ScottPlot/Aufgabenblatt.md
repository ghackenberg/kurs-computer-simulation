# Aufgabenblatt 04: Telemetrie, ScottPlot 5 & Welford-Statistik

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** B.Sc. Automatisierungstechnik, 5. Semester  
**Institution:** Fachhochschule Oberösterreich – Campus Wels  
**Bearbeitungsform:** 
- **Stufe A (In-Class Sprint):** Einzelarbeit oder 2er-Tandem (Labor, 60 min)
- **Stufe B (Homework Extension):** Festes 2er-Team (1 Woche, ca. 2–3 h pro Person)
**Technologie-Vorgabe:** C# 12 / .NET 8 oder .NET 10, WPF mit `ScottPlot.WPF` (Version 5.x) und `Microsoft.Msagl.WpfGraphControl`.  
> [!CAUTION]
> **Vorgreif-Sperre & API-Versions-Sperre für Termin 04:**  
> - Es ist zwingend **ScottPlot Version 5** einzusetzen! Die veraltete ScottPlot-4-Syntax (`AddSignal`, alter Achsenzugriff) ist unzulässig.
> - **KEIN** SharpGL 3D, **KEIN** Multithreading-Solver (`Parallel.For`), **KEINE** S-Functions! Die Datengenerierung erfolgt timergesteuert über vorallokierte Puffer.

---

## 1. Lernziele (Intended Learning Outcomes - ILOs)

Nach erfolgreicher Bearbeitung dieses Aufgabenblattes können Sie:
1. **ScottPlot 5 High-Performance Streaming:** Den modernen `WpfPlot` mit `DataLogger` bzw. `DataStreamer` für hochfrequente Signalströme konfigurieren und ruckelfrei mit 50–60 FPS betreiben.
2. **Allokationsfreie Pufferarchitektur:** Ringpuffer (`CircularBuffer<double>`) so entwerfen, dass im laufenden Simulations- und Render-Loop keinerlei Garbage-Collection-Allokationen (0 B Heap-Allokation pro Frame) anfallen.
3. **Numerisch stabile Online-Statistik (Welford-Algorithmus):** Rollierenden Mittelwert $\bar{x}_k$ und Varianz $s_k^2$ in $O(1)$-Zeit ohne Speicherung vergangener Messwerte berechnen, ohne katastrophale numerische Auslöschung zu riskieren.
4. **Mehrkanal-Dashboard & Phasenplots:** Zeitreihen, Streudiagramme (Phasenraum) und dynamische Histogramme synchron in einem übersichtlichen Leitstand anordnen.
5. **Topologische Systemgraphen mit MSAGL:** Anlagenstrukturen und Messketten als gerichtete Graphen visualisieren und interaktiv mit Messwerten annotieren.

---

## 2. Mathematische Grundlagen

### 2.1 Das Problem der naiven Varianzberechnung
Die Lehrbuchformel der Stichprobenvarianz
$$s^2 = \frac{1}{k-1} \left( \sum_{i=1}^k x_i^2 - \frac{1}{k} \left(\sum_{i=1}^k x_i\right)^2 \right)$$
ist für Streaming-Daten hochgradig instabil: Bei großen Werten mit kleiner Varianz (z. B. Netzfrequenz $f \approx 50{,}001\,\text{Hz}$) subtrahiert man zwei riesige Zahlen voneinander. Dies führt zu **katastrophaler numerischer Auslöschung** (Subtraktionsauslöschung) und sogar zu negativen Varianzen.

### 2.2 Der Welford-Algorithmus (1962)
B. P. Welford formulierte eine numerisch exzellent konditionierte Rekursionsformel, die pro Messwert $x_k$ exakt eine Division und keine Pufferhistorie benötigt:
1. **Mittelwert-Update:**
   $$\bar{x}_k = \bar{x}_{k-1} + \frac{x_k - \bar{x}_{k-1}}{k}$$
2. **Summe der quadratischen Abweichungen ($S_k = \sum (x_i - \bar{x}_k)^2$):**
   $$S_k = S_{k-1} + (x_k - \bar{x}_{k-1})(x_k - \bar{x}_k)$$
3. **Stichproben-Varianz und Standardabweichung:**
   $$s_k^2 = \frac{S_k}{k-1} \quad (k \ge 2), \qquad \sigma_k = \sqrt{s_k^2}$$
4. **Dynamisches Toleranzband ($\pm 3\sigma$-Hüllkurve):**
   $$y_{\text{upper}} = \bar{x}_k + 3 \sigma_k, \qquad y_{\text{lower}} = \bar{x}_k - 3 \sigma_k$$
   Nach der Drei-Sigma-Regel liegen bei Normalverteilung 99,73 % aller Messpunkte innerhalb dieses Bandes. Ausreißer jenseits dieser Grenze indizieren Anlagen-Anomalien.

---

## 3. Stufe A: In-Class Sprint (60 Minuten)

**Thema:** Allokationsfreier Signal-Streamer mit ScottPlot 5  
**Ziel:** Konfigurieren Sie in 60 Minuten einen `WpfPlot` mit kontinuierlichem Datenstrom und rollierender Welford-Statistik ohne GC-Spikes.

### Aufgabenstellung:
1. Erstellen Sie ein neues WPF-Projekt `Sprint_ScottPlot5Telemetry`.
2. Installieren Sie das NuGet-Paket `ScottPlot.WPF` (Version 5.x).
3. Fügen Sie im XAML den Namespace und den Plot ein:
   ```xml
   <Window ... xmlns:sp="clr-namespace:ScottPlot.WPF;assembly=ScottPlot.WPF">
       <Grid>
           <sp:WpfPlot x:Name="Plot1"/>
       </Grid>
   </Window>
   ```
4. **ScottPlot 5 Konfiguration (Code-Behind):**
   - Nutzen Sie den modernen `DataLogger` oder `DataStreamer`:
     ```csharp
     var streamer = Plot1.Plot.Add.DataStreamer(points: 1000);
     streamer.ViewScrollLeft(); // Rollierender Oszilloskop-Modus
     ```
5. **Welford-Klasse implementieren:**
   - Erstellen Sie eine kompakte Klasse `WelfordTracker`:
     ```csharp
     public class WelfordTracker
     {
         public long Count { get; private set; }
         public double Mean { get; private set; }
         private double _m2;
         public double Variance => Count > 1 ? _m2 / (Count - 1) : 0;
         public double StdDev => Math.Sqrt(Variance);

         public void Add(double x)
         {
             Count++;
             double delta = x - Mean;
             Mean += delta / Count;
             double delta2 = x - Mean;
             _m2 += delta * delta2;
         }
     }
     ```
6. **Streaming-Timer:**
   - Starten Sie einen `DispatcherTimer` mit $20\,\text{ms}$ Intervall ($50\,\text{Hz}$).
   - Generieren Sie ein verrauschtes Signal: $y(t) = 100 + 15 \cdot \sin(2\pi \cdot 0{,}5 \cdot t) + \text{Rauschen}$.
   - Füttern Sie den Streamer und den `WelfordTracker`.
   - Aktualisieren Sie das Fenster via `Plot1.Refresh()`.
7. **GC-Audit:**
   - Überprüfen Sie im Visual Studio Diagnostic Tools Fenster: Die Process Memory Kurve muss flach bleiben (keine sägezahnartigen Garbage-Collection-Spikes!).
- **Erwartetes Ergebnis:** Ein flüssig durchlaufendes, stabiles Signaldiagramm bei 50 FPS ohne UI-Lags.

---

## 4. Stufe B: Homework Extension (Wahlmodell)

> [!IMPORTANT]
> **Wahlmodell – GENAU EINE Aufgabe (keine Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **entweder Track A (Industrie)** ODER **Track B (Simulation Game)**.  
> Beide Tracks basieren auf ScottPlot 5, Multikanal-Streaming, Welford-Statistik und MSAGL-Graphen und führen zur Höchstpunktzahl (10 Punkte).

```
                    ┌──────────────────────────────────────────────┐
                    │ WÄHLEN SIE GENAU EINEN DER BEIDEN TRACKS:    │
                    └──────────────────────┬───────────────────────┘
                                           │
                 ┌─────────────────────────┴─────────────────────────┐
                 ▼                                                   ▼
┌─────────────────────────────────┐                 ┌─────────────────────────────────┐
│  Track A: Industrie & Mechatronik│                 │   Track B: Simulation Game      │
│  Industrieller Antriebsprüfstand│                 │   Retro Arcade Racing HUD       │
│  & Schwingungsüberwachung       │                 │   G-Kräfte, Speed & Streckengraph│
└─────────────────────────────────┘                 └─────────────────────────────────┘
```

---

### Track A (Industrie): Industrieller Antriebsprüfstand & Schwingungs-Leitstand

#### Industrielles Szenario:
Auf einem mechatronischen Motorprüfstand für Elektroantriebe werden Drehzahl $n(t)$, Drehmoment $M(t)$ und Lagervibrationen $a_{\text{vib}}(t)$ hochfrequent erfasst. Sie entwickeln das Leitstand-Dashboard zur Echtzeit-Zustandsüberwachung (Condition Monitoring).

#### Dashboard-Architektur (3 synchrone ScottPlot-Panels + MSAGL-Graph):
1. **Panel 1: Zeitbereichs-Telemetrie mit dynamischem Toleranzband:**
   - Kontinuierlicher Plot von Drehzahl $n(t)$ und Drehmoment $M(t)$ (2 Y-Achsen links/rechts).
   - Horizontale Hüllkurven für $\bar{M} \pm 3\sigma_M$, dynamisch berechnet über den Welford-Algorithmus.
   - Farblicher Warn-Marker, sobald das Signal für mehr als 3 aufeinanderfolgende Ticks außerhalb des Toleranzbandes liegt (Kavitations- oder Schlupf-Erkennung).
2. **Panel 2: Phasenraum-Betriebskennfeld ($M$ vs. $n$):**
   - Live-Scatter-Plot des aktuellen Arbeitspunktes im Drehmoment-Drehzahl-Kennfeld.
   - Einblendung der thermischen Leistungsgrenze ($P = 2\pi n M \le P_{\max}$).
3. **Panel 3: Schwingungs-Histogramm mit Normalverteilungskurve:**
   - Echtzeit-Histogramm der Vibrationsamplituden in 20 Bins.
   - Dynamisch überlagerte theoretische Gaußsche Glockenkurve basierend auf Welford-Mittelwert und Varianz.
4. **Anlagentopologie mit MSAGL (`Microsoft.Msagl.WpfGraphControl`):**
   - Gerichteter Antriebsstrang-Graph: `[Umrichter] -> [E-Motor] -> [Kupplung] -> [Getriebe] -> [Lastbremse]`.
   - Sensor-Knoten färben sich bei Toleranzüberschreitung von Grün auf Rot.

---

### Track B (Simulation Game): Retro Arcade Racing HUD & G-Force Telemetrie

#### Gaming-Szenario:
Im Telemetrie-Center eines Sim-Racing-Spiels analysiert die Boxencrew das Fahrverhalten des Boliden während der Trainingsrunde.

#### Dashboard-Architektur (3 synchrone ScottPlot-Panels + MSAGL-Graph):
1. **Panel 1: Speed- & RPM-Streamer mit Schalthüllkurve:**
   - Live-Geschwindigkeit $v(t)$ und Drehzahl $\text{RPM}(t)$.
   - Welford-Streaming zur Identifikation des optimalen Schaltzeitpunkts (Mittelwert der Ausdrehzahl).
   - Optischer Shift-Flash-Alarm bei Erreichen des Drehzahlbegrenzers ($\text{RPM} > 7200$).
2. **Panel 2: G-Kräfte Phasen-Diagramm (Kamm'scher Kreis):**
   - Phasenplot von Querbeschleunigung $a_y$ gegen Längsbeschleunigung $a_x$ (G-G-Diagramm).
   - Einblendung des physikalischen Reifenhaftungslimits (Kamm'scher Kreis mit $a_{\text{res}} = \sqrt{a_x^2 + a_y^2} \le \mu \cdot g$).
   - Farbcodierung der Punkte: Grün = Voller Grip, Orange = Untersteuern/Drift, Rot = Traktionsabriss.
3. **Panel 3: Rundenzeit- & Bremsverzögerungs-Histogramm:**
   - Live-Histogramm der Verzögerungswerte beim Anbremsen mit Gauß-Kurvenüberlagerung.
4. **Streckentopologie mit MSAGL:**
   - Topologischer Rundkurs-Graph mit Sektoren (`Sektor 1`, `Sektor 2`, `Sektor 3`), Kurvenknoten (`Hairpin`, `Chicane`) und `Boxengasse`.
   - Der aktuelle Aufenthaltsort des Boliden wird durch Hervorhebung des aktiven Knotens visualisiert.

---

## 5. Akzeptanzkriterien & Bewertungsrubrik (10 Punkte)

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **Saubere ScottPlot-5-Architektur** | 3 P. | Konsequente Nutzung der modernen ScottPlot-5-API (`WpfPlot`, `DataStreamer`/`DataLogger`). Keine veralteten v4-Aufrufe. |
| **Allokationsfreie Pufferverwaltung** | 2 P. | 0 Byte GC-Allokation im Render-Loop. Saubere Nutzung vorallokierter Ringpuffer. |
| **Mathematisch exakte Welford-Statistik** | 3 P. | Fehlerfreie Implementierung des Welford-Algorithmus mit $\pm 3\sigma$-Band und Histogramm-Anbindung. |
| **Topologie-Visualisierung mit MSAGL** | 1 P. | Einbindung des interaktiven System- bzw. Streckengraphen via MSAGL-WPF-Control. |
| **Dokumentation & Code-Qualität** | 1 P. | Nachvollziehbarer Bericht in `README.md` mit Screenshot des Dashboards und Performance-Profil. |
| **Gesamt** | **10 P.** | **100 % der Übungseinheit** |

---

## 6. Online-Recherche-Box

- **Offizielle Dokumentation:**
  - [ScottPlot 5 Official Documentation & Cookbook](https://scottplot.net/cookbook/5.0/) – Verbindliche API-Dokumentation für Version 5.
  - [ScottPlot 5 DataStreamer FAQ](https://scottplot.net/cookbook/5.0/DataStreamer/) – Oszilloskop-artiges Streaming ohne Neuallokation.
  - [Microsoft MSAGL GitHub Repository](https://github.com/microsoft/automatic-graph-layout) – Automatisches Graph-Layout in WPF.
  - [Wikipedia: Algorithms for calculating variance (Welford)](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_algorithm) – Formeln und Beweis der numerischen Stabilität.
- **Gezielte englische Suchbegriffe:**
  - `ScottPlot 5 WPF live streaming DataLogger`
  - `Welford algorithm online running variance C# zero allocation`
  - `MSAGL WPF GraphControl custom nodes tutorial`

---

## 7. Vibe-Coding Prompting-Tipps

> [!CAUTION]
> **Häufigster KI-Fehler bei Termin 04 (ScottPlot 4 vs. ScottPlot 5):**
> Fast alle LLMs (GPT-4, Claude) trainierten auf veralteten ScottPlot-4-Beispielen (`Plot.AddSignal()`, `formsPlot1.Plot.XAxis.ManualTickSpacing()`). Diese Methoden existieren in Version 5 nicht mehr oder wurden völlig umstrukturiert (`Plot.Add.DataStreamer()`, `Plot.Axes.SetLimits()`). Weisen Sie das LLM explizit an!

### Empfohlener Prompt für LLMs:
```text
Erstelle mir eine WPF-C#-Anwendung mit ScottPlot 5 (Version 5.x).
WICHTIG: Verwende ausschließlich die moderne ScottPlot 5 Syntax (z.B. Plot.Add.DataStreamer(), Plot.Axes, WpfPlot).
Verwende keinesfalls ScottPlot 4 Methoden wie AddSignal() oder plt.XAxis.
Implementiere den Welford-Algorithmus zur Berechnung des gleitenden Mittelwerts und der Standardabweichung in einer eigenen allokationsfreien Klasse.
Das Streaming muss 50 Mal pro Sekunde ohne Garbage-Collection-Allokationen (kein 'new double[]' im Timer-Loop) laufen.
```

---

## 8. 🔍 Peer-Review-Leitfragen für das Plenum (Showcase & Peer-Challenge)

1. **GC-Audit im Profiler live am Beamer:**  
   *„Starten Sie das Diagnose-Tool in Visual Studio: Steigt der Arbeitsspeicher (Heap) während des Streamings kontinuierlich an oder bleibt die Allokationsrate bei exakt 0 B pro Frame?“*
2. **Welford-Verifikation vs. Naive Formel:**  
   *„Basiert die $\pm 3\sigma$-Berechnung auf der echten Welford-Rekursion, oder wird im Hintergrund über ein LINQ `.Average()` und `.Sum(x => ...)` gerechnet, was bei langen Messreihen den CPU-Thread blockiert?“*
3. **ScottPlot-5-API-Integrität:**  
   *„Ist der Code frei von alten ScottPlot-4-Relikten? Werden die Achsen und Renderer über die moderne Version-5-Architektur angesteuert?“*
4. **Phasen- und Histogramm-Dynamik:**  
   *„Aktualisiert sich das Schwingungs-/G-Kraft-Histogramm dynamisch mit den eingehenden Daten, und bleibt die Visualisierung auch bei abrupten Signalsprüngen flüssig?“*
