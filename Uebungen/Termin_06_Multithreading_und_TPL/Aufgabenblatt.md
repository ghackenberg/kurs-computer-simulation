# Aufgabenblatt Termin 06: Multithreading, TPL & Reaktive WPF-Entkopplung
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
### FH Oberösterreich – Campus Wels | Studiengang Automatisierungstechnik

---

| Metadaten | Details |
| :--- | :--- |
| **Lehrveranstaltungseinheit:** | Termin 06 (begleitend zu Kapitel 06: Multithreading & Parallele Simulation) |
| **Themenschwerpunkt:** | Task Parallel Library (`Parallel.For`), Thread-Sicherheit (`Interlocked`, `Random`), Amdahlsches Gesetz & Reaktive WPF-Entkopplung (`async/await`, `Task.Run`, `IProgress<T>`, `CancellationToken`) |
| **Technologie-Stack:** | C# 12 / .NET 8 (`net8.0-windows`), WPF (`WriteableBitmap`), TPL, `System.Diagnostics.Stopwatch`, `System.Threading` |
| **Vorgreif-Sperre:** | **Erlaubt:** TPL, `Parallel.For`, `ParallelOptions`, `Interlocked`, `ConcurrentBag<T>`, `Task.Run`, `IProgress<T>`, `CancellationTokenSource`, `Stopwatch`.<br>**Strengstens verboten:** *KEIN* Math.NET Cholesky, *KEINE* kontinuierlichen S-Functions, *KEINE* Event-Queues! |
| **Zeitbudget:** | **In-Class Sprint:** ca. 45–60 Minuten (Laborpräsenz)<br>**Homework Extension:** 2–3 Stunden (2er-Team, 1 Woche) |
| **Abgabeform:** | Git-Repository: Sourcecode, Unit-Tests und Markdown-Bericht (`README.md`) |

---

## 1. Lernziele (Intended Learning Outcomes - ILOs)

Nach erfolgreicher Bearbeitung dieser Übungseinheit sind Sie in der Lage:
1. **Parallelisierungsmuster anwenden:** Rechenintensive Simulationsschleifen mittels Task Parallel Library (`Parallel.For`, `ParallelOptions.MaxDegreeOfParallelism`) thread-sicher auf alle CPU-Kerne zu verteilen.
2. **Synchronisationsfehler vermeiden:** Race Conditions und Datenkorruption bei geteilten Zuständen sowie Zufallszahlengeneratoren über thread-lokales `Random` (`Random.Shared` / `ThreadLocal<Random>`), Double-Buffering und atomare Operationen (`Interlocked`) zu verhindern.
3. **Reaktive WPF-Entkopplung implementieren:** Das Einfrieren des UI-Threads (*UI-Freeze*) durch Auslagerung der Simulationsschleife in `await Task.Run(...)`, gedrosselte Rückmeldung über `IProgress<T>` und kooperativen Not-Aus über `CancellationTokenSource` zu lösen.
4. **Skalierung quantitativ analysieren:** Den parallelen Speedup $S(p)$ und die Effizienz $E(p)$ über variierende Thread-Zahlen $p$ experimentell mit `Stopwatch` im WPF-Dashboard zu messen und den seriellen Codeanteil $s = 1 - f_{\text{par}}$ nach dem Amdahlschen Gesetz zu bestimmen.

---

## 2. Mathematisch-Theoretische Grundlagen

### 2.1 Amdahlsches Gesetz & Parallele Effizienz

Ist ein Programm zu einem Anteil $f_{\text{par}} \in [0, 1]$ ideal parallelisierbar und zu einem Anteil $s = 1 - f_{\text{par}}$ strikt seriell, so lautet der theoretische Speedup $S(p)$ bei Ausführung auf $p$ Prozessorkernen:

$$S(p) = \frac{T_1}{T_p} = \frac{1}{(1 - f_{\text{par}}) + \frac{f_{\text{par}}}{p}} = \frac{1}{s + \frac{1 - s}{p}}$$

Der maximal erzielbare Grenz-Speedup bei unendlich vielen Prozessorkernen ($p \to \infty$) ist nach oben beschränkt:

$$S_{\max} = \lim_{p \to \infty} S(p) = \frac{1}{s} = \frac{1}{1 - f_{\text{par}}}$$

Die **parallele Effizienz** $E(p)$ beschreibt den Auslastungsgrad der eingesetzten Hardware:

$$E(p) = \frac{S(p)}{p} = \frac{1}{p \cdot s + (1 - s)} \le 1{,}0 \quad (100\,\%)$$

Aus einem gemessenen Speedup $S(p)$ bei $p > 1$ Kernen lässt sich der experimentelle serielle Anteil $s$ direkt rekonstruieren:

$$s = \frac{\frac{1}{S(p)} - \frac{1}{p}}{1 - \frac{1}{p}}$$

### 2.2 Reaktive UI-Architektur in WPF (`Task.Run`, `IProgress<T>`, `CancellationToken`)

Führt der WPF-UI-Thread eine lange Simulationsschleife direkt im Button-Click-Handler aus, kann die Message-Pump keine Maus-, Tastatur- oder Zeichenereignisse (`OnRender`) mehr abarbeiten – das Fenster friert ein („Keine Rückmeldung“).

```
┌──────────────────────────────┐        Task.Run(...)         ┌──────────────────────────────┐
│        WPF UI-Thread         │ ───────────────────────────► │   Hintergrund-Worker (TPL)   │
│  • MainWindow / Controls     │                              │  • Simulationsschleife       │
│  • WriteableBitmap.WritePixels│ ◄─────────────────────────── │  • Parallel.For (Kerne 1..p) │
│  • ProgressBar & Telemetrie  │   IProgress<T>.Report(...)   │  • Prüft CancellationToken   │
└──────────────────────────────┘   (gedrosselt, z.B. alle 5)  └──────────────────────────────┘
```

---

## 3. Stufe A: In-Class Sprint (ca. 45–60 min)

### Thema: „UI-Freeze beheben: Reaktives WPF-Partikel-Dashboard mit `Task.Run`, `IProgress<T>` & `CancellationToken`“

Öffnen Sie das vorbereitete WPF-Starter-Projekt `Vorlage/MultithreadingBenchmark.sln`. Es enthält bereits das physikalische 2D-Partikelfeld (`ParticleField.cs` mit $N = 100\,000$ Partikeln im Zentralfeld-Attraktor), den Benchmark-Runner (`ParallelRunner.cs`) sowie die WPF-Oberfläche (`MainWindow.xaml` mit `WriteableBitmap`-Partikelansicht, Telemetrie-Panel und Amdahl-Datentabelle).

#### Aufgabenstellung (Schritt für Schritt auf Basis der Vorlage):

1. **Starter-Kit starten & UI-Freeze beobachten:**
   - Starten Sie die Anwendung und klicken Sie im Bild auf verschiedene Positionen, um den Gravitations-Attraktor (rotes Fadenkreuz) zu verschieben.
   - Klicken Sie nun auf **„▶ Simulation starten (200 Schritte)“**: Beobachten Sie, dass das gesamte WPF-Fenster während der Berechnung **komplett einfriert**, die `ProgressBar` erst ganz am Ende auf $100\,\%$ springt und der Button **„⏹ Not-Aus (Cancel)“** während des Laufs gar nicht angeklickt werden kann!
2. **Aufgabe A1 – Asynchrone Auslagerung mit `async/await`, `Task.Run` und `IProgress<SimulationProgress>`:**
   - Machen Sie den Event-Handler `BtnStart_Click` in `MainWindow.xaml.cs` asynchron (`private async void BtnStart_Click(...)`).
   - Erstellen Sie vor dem Start des Hintergrund-Tasks ein `IProgress<SimulationProgress>`-Objekt:
     ```csharp
     IProgress<SimulationProgress> progress = new Progress<SimulationProgress>(p => UpdateUiProgress(p));
     ```
   - Lagern Sie die `for`-Schleife über die 200 Zeitschritte in `await Task.Run(() => { ... })` aus und rufen Sie alle 5 Zeitschritte `progress.Report(...)` auf.
   - *Wichtig:* Warum darf `UpdateUiProgress` (bzw. `_bitmap.WritePixels`) **niemals direkt** aus dem `Task.Run`-Hintergrundthread aufgerufen werden? Überprüfen Sie, dass die Partikelanimation und die `ProgressBar` nun butterweich in Echtzeit laufen!
3. **Aufgabe A2 – Kooperativer Not-Aus mit `CancellationTokenSource`:**
   - Instanziieren Sie zu Beginn von `BtnStart_Click` eine neue `_cts = new CancellationTokenSource()`, setzen Sie `BtnCancel.IsEnabled = true` und übergeben Sie `_cts.Token` sowohl an `Task.Run` als auch an `_field.StepParallel(Dt, threads, _cts.Token)` bzw. `_field.StepSequential(Dt, _cts.Token)`.
   - Fangen Sie die `OperationCanceledException` in einem `try / catch (OperationCanceledException) / finally`-Block sauber ab und geben Sie in `TxtStatus` die Meldung `"Simulation durch Benutzer (Not-Aus) abgebrochen."` aus.
4. **Aufgabe A3 – Asynchrone Amdahl-Skalierungsreihe ($1 \dots P_{\max}$ Kerne) im UI:**
   - Machen Sie auch `BtnRunScaling_Click` in `MainWindow.xaml.cs` asynchron (`async void`) und führen Sie `ParallelRunner.RunScalingSeries(...)` im Hintergrund über `await Task.Run(...)` aus, damit das Fenster während der mehrstufigen Benchmark-Messung nicht einfriert.
   - Vergleichen Sie in der `DataGrid`-Tabelle den Speedup $S(p)$ und die Effizienz $E(p)$ Ihres Prozessors!

---

## 4. Stufe B: Homework Extension (Wahlmodell – GENAU EINE Aufgabe!)

> [!IMPORTANT]
> **Pick your Track (Wahlmodell – KEINE Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **GENAU EINEN** der beiden Tracks:
> - **Track A (Industrie):** Parallele Monte-Carlo-Toleranzanalyse & Passungsprüfung im WPF-Dashboard
> - **Track B (Simulation Game):** Interaktive 2D-Schwarm- & Zombie-Horden-Simulation (50.000+ Agenten) in WPF
> 
> Beide Aufgaben basieren auf derselben TPL-Multithreading- und WPF-Entkopplungs-Methodik (`Parallel.For`, `Task.Run`, `IProgress<T>`, `CancellationToken`), erfordern denselben Arbeitsaufwand und führen zur maximalen Punktzahl (10 Punkte). Bearbeiten Sie **NUR EINEN** Track!

---

### Track A (Industrie): Parallele Monte-Carlo-Toleranzanalyse für Baugruppen-Passungen

#### Industrieller Kontext:
In der automatisierten Serienfertigung (z. B. Getriebe- oder Spindellagerung) addieren sich die Fertigungstoleranzen einzelner Bauteile zu einer Maßkette. Um Ausschussraten (Millionstel-Bereich / ppm) vor Produktionsbeginn zuverlässig zu bestimmen, werden $N = 10\,000\,000$ virtuelle Baugruppen parallel montiert und statistisch ausgewertet.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK A: STATISTISCHE MASSKETTE (N = 10.000.000 MONTAGEN)              │
│                                                                        │
│   Gehäuse L_1          Innenring L_2      Scheibe L_3     Welle L_4    │
│   [Normal / Gauss]     [Gleichverteilt]   [Log-Normal]    [Normal]     │
│   ───────────────►     ───────────────►   ───────────►    ────────►    │
│                                                                        │
│   Axiales Passungsspiel: S = L_1 - (L_2 + L_3 + L_4)                   │
│   Ausschuss: S < 0,050 mm (Klemmer) ODER S > 0,150 mm (zu großes Spiel)│
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track A:

1. **Mathematisches Maßketten-Modell:**
   Ein Präzisions-Spindellager besteht aus 4 gefügten Bauteilen mit statistisch schwankenden Abmessungen:
   - Bauteil 1 (Gehäusebohrung): $L_1 \sim \mathcal{N}(\mu=50{,}00\,\text{mm}, \sigma=0{,}020\,\text{mm})$ (Normalverteilung via Box-Muller).
   - Bauteil 2 (Lager-Innenring): $L_2 \sim \mathcal{U}(19{,}95\,\text{mm}, 20{,}05\,\text{mm})$ (Gleichverteilung).
   - Bauteil 3 (Distanzscheibe): $L_3 \sim \mathcal{N}(\mu=1{,}50\,\text{mm}, \sigma=0{,}010\,\text{mm})$.
   - Bauteil 4 (Wellenabsatz): $L_4 \sim \mathcal{N}(\mu=28{,}40\,\text{mm}, \sigma=0{,}015\,\text{mm})$.
   
   Das resultierende axiale Funktionsspiel beträgt:
   $$S = L_1 - (L_2 + L_3 + L_4)$$
   Zulässiges Toleranzband: $S \in [0{,}050\,\text{mm}, 0{,}150\,\text{mm}]$. Liegt $S < 0{,}050\,\text{mm}$ (Klemmer) oder $S > 0{,}150\,\text{mm}$ (übermäßiges Spiel), gilt das Aggregat als **Ausschuss (Scrap)**.

2. **Thread-sichere Monte-Carlo-Parallelisierung (`Parallel.For` & `Interlocked`):**
   - Simulieren Sie $N = 10\,000\,000$ Stichproben in Blöcken (damit `IProgress<T>` und `CancellationToken` regelmäßig greifen).
   - **Thread-lokaler Zufall:** Nutzen Sie zwingend `Random.Shared` oder `ThreadLocal<Random>` mit unterschiedlichem Seed pro Thread – niemals eine ungeschützte gemeinsame `Random`-Instanz!
   - **Vermeidung von Race Conditions & Lock-Contention:** Akkumulieren Sie die Treffer für Klemmer ($S < S_{\min}$), Gutteile, Übermaß ($S > S_{\max}$) sowie ein Histogramm über z. B. $60$ Klassen (Bins im Bereich $[0{,}00, 0{,}20]\,\text{mm}$) zunächst in thread-lokalen Variablen/Arrays und führen Sie diese atomar mittels `Interlocked.Add` zusammen.

3. **Reaktives WPF-Qualitäts-Dashboard:**
   - Erweitern Sie das WPF-Fenster um eine visuelle Darstellung der Monte-Carlo-Analyse:
     - Live-`ProgressBar` und Not-Aus-Button (`CancellationToken`).
     - Grafische Darstellung des berechneten Häufigkeits-Histogramms von $S$ (entweder im `WriteableBitmap` oder auf einem `Canvas`) mit farblicher Kennzeichnung der Gutzone (grün) und der beiden Ausschusszonen links/rechts (rot).
     - Anzeige von Mittelwert $\bar{S}$, Standardabweichung $\sigma_S$, Ausschussquote in $\%$ bzw. $\text{ppm}$ (Parts per Million) sowie Prozessfähigkeitsindex $C_p = \frac{S_{\max} - S_{\min}}{6\,\sigma_S}$.

4. **Systematische Skalierungsreihe & Amdahl-Auswertung:**
   - Messen Sie die Laufzeit der $10\,000\,000$ Montagen für $p \in \{1, 2, 4, \dots, P_{\max}\}$ Threads (inkl. JIT-Warmup) und stellen Sie Speedup $S(p)$, Effizienz $E(p)$ und den geschätzten seriellen Anteil $s$ in der `DataGrid`-Tabelle sowie im `README.md`-Bericht dar.

---

### Track B (Simulation Game): Interaktive 2D-Schwarm- & Zombie-Horden-Simulation in WPF

#### Game-Kontext:
In modernen Crowd-Simulationen und Survival-Games müssen zehntausende autonome Agenten zeitgleich Zielverfolgung, Hindernisumgehung und gegenseitige Abstoßung berechnen. Auf einem einzelnen CPU-Kern bricht die Bildrate ein – mit `Parallel.For` und Double-Buffering erreichen Sie flüssige Echtzeit!

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK B: SCHWARM-VEKTORFELD & DOUBLE-BUFFERING IN WPF                  │
│                                                                        │
│   Agent i liest aus StateCurrent[]:                                    │
│     • Attraktion zum beweglichen Spieler-Zielpunkt P_target (Mausklick)│
│     • Lokale Abstoßung / Wirbelkraft + Geschwindigkeitsbegrenzung v_max│
│   Agent i schreibt neuen Zustand exklusiv in StateNext[i]              │
│   Am Ende des Zeitschritts: Referenztausch Swap(ref Current, ref Next) │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track B:

1. **Agentenmodell & Schwarmdynamik ($N = 50\,000 \dots 100\,000$ Agenten):**
   - Jeder Agent $i$ besitzt Position $\mathbf{x}_i = (x_i, y_i)$, Geschwindigkeit $\mathbf{v}_i = (v_{x,i}, v_{y,i})$ und einen Typ/Zustand (z. B. langsame vs. schnelle Agenten oder infizierte vs. fliehende Agenten).
   - Pro Zeitschritt wirkt auf jeden Agenten:
     - **Zielverfolgung:** Beschleunigung in Richtung des per Maus im `WriteableBitmap` steuerbaren Zielpunkts $\mathbf{P}_{\text{Target}}$.
     - **Lokale Interaktion / Repulsionsfeld:** Abstoßung von lokalen Nachbarn (z. B. über ein schnelles räumliches 2D-Gitter / Spatial Grid oder lokale Nachbarschaftsstichprobe) sowie Abprallen an Kreishindernissen auf der Karte.
     - **Geschwindigkeitsdämpfung & Maximalbegrenzung:** $\|\mathbf{v}_i\| \le v_{\max}$.

2. **Thread-Sicherheit durch striktes Double-Buffering:**
   - Da Agent $i$ beim Update die Positionen anderer Agenten $j$ liest, würde direktes Überschreiben eines einzigen Arrays zu **Race Conditions (Tearing)** führen!
   - Implementieren Sie zwei Arrays `StateCurrent[]` und `StateNext[]`: Innerhalb von `Parallel.For` wird ausschließlich aus `StateCurrent` gelesen und in `StateNext[i]` geschrieben; nach der Schleife werden die Array-Referenzen getauscht.

3. **Reaktives WPF-Echtzeit-Dashboard:**
   - Starten und stoppen Sie die Endlos-Echtzeitsimulation im Hintergrund über `await Task.Run(...)`, `IProgress<T>` und `CancellationToken` (Not-Aus).
   - Ermöglichen Sie im laufenden Betrieb das Live-Umschalten zwischen **Sequentiell (1 Thread)** und **TPL `Parallel.For` ($p$ Threads)** sowie das Einstellen der Thread-Anzahl per Slider, sodass der drastische FPS- und Speedup-Unterschied sofort visuell im `WriteableBitmap` und in der Telemetrie sichtbar wird!

4. **Systematische Skalierungsreihe & Amdahl-Auswertung:**
   - Führen Sie über die `DataGrid`-Tabelle im UI eine reproduzierbare Benchmark-Skalierungsreihe über $p \in \{1, 2, 4, \dots, P_{\max}\}$ Threads durch und dokumentieren Sie Speedup $S(p)$, Effizienz $E(p)$ und den seriellen Anteil $s$ nach Amdahl in Ihrer `README.md`.

---

## 5. Akzeptanzkriterien & Bewertungsrubrik (10 Punkte)

Für die volle Punktzahl (10 Punkte) müssen folgende Kriterien erfüllt sein:

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **Thread-sichere TPL-Parallelisierung** | **3 P.** | Korrekte Nutzung von `Parallel.For` und `ParallelOptions`. Keine Race Conditions (Track A: thread-lokales `Random` + `Interlocked`; Track B: striktes Double-Buffering `Current`/`Next`). |
| **Reaktive WPF-Entkopplung & Not-Aus** | **3 P.** | Kein Einfrieren des UI-Threads! Saubere Entkopplung mit `async/await` und `Task.Run`, gedrosselte UI-Updates via `IProgress<T>` und jederzeit funktionierender Abbruch via `CancellationTokenSource`. |
| **Amdahl-Skalierungsreihe & Telemetrie** | **2 P.** | Vollständige Messreihe über $p \in \{1, \dots, P_{\max}\}$ mit JIT-Warmup, korrekter Berechnung von Speedup $S(p)$, Effizienz $E(p)$ und seriellem Anteil $s$ im WPF-Dashboard. |
| **Codequalität & Dokumentation** | **2 P.** | Sauberes WPF-Projekt, bestandene Unit-Tests (`dotnet test`), strukturierte `README.md` mit Screenshots, Skalierungstabelle und Diskussion des beobachteten Speedups. |
| **Gesamt** | **10 P.** | **100 % der Übungseinheit** |

---

## 6. Online-Recherche-Box

Nutzen Sie zur Vorbereitung und Vertiefung folgende Quellen:

- **Offizielle Dokumentation:**
  - [Microsoft Learn: Datenparallelität (Task Parallel Library)](https://learn.microsoft.com/de-de/dotnet/standard/parallel-programming/data-parallelism-task-parallel-library)
  - [Microsoft Learn: Asynchrone Programmierung mit async und await in WPF](https://learn.microsoft.com/de-de/dotnet/csharp/asynchronous-programming/)
  - [Microsoft Learn: IProgress<T> & Progress<T> für UI-Updates](https://learn.microsoft.com/de-de/dotnet/api/system.progress-1)
  - [Microsoft Learn: Abbruch in verwalteten Threads (CancellationTokenSource)](https://learn.microsoft.com/de-de/dotnet/standard/threading/cancellation-in-managed-threads)
  - [Microsoft Learn: Interlocked Class (Atomare Operationen)](https://learn.microsoft.com/de-de/dotnet/api/system.threading.interlocked)
- **Gezielte englische Suchbegriffe:**
  - `"C# WPF Task.Run IProgress CancellationToken WriteableBitmap"`
  - `"TPL Parallel.For thread local state Interlocked.Add Monte Carlo"`
  - `"Amdahl's law serial fraction estimation parallel efficiency"`

---

## 7. Vibe-Coding Prompting-Tipps

> [!WARNING]
> **Typische KI-Halluzinationen & Fallstricke bei Termin 06:**
> 1. **`Dispatcher.Invoke` in jedem Schleifendurchlauf:** Viele KIs rufen innerhalb von `Parallel.For` direkt `Application.Current.Dispatcher.Invoke(...)` auf. Das serialisiert alle Worker-Threads über die UI-Message-Queue und macht die parallele Berechnung 100-mal langsamer als Single-Threading! Nutzen Sie stattdessen `IProgress<T>` und melden Sie nur alle $k$ Schritte (oder einmal pro Frame) einen Zwischenstand.
> 2. **`System.Random` ist bei geteilter Instanz nicht thread-sicher:** Wird `new Random()` außerhalb von `Parallel.For` erzeugt und innen ohne Schutz `rnd.NextDouble()` aufgerufen, korrumpiert der interne Zustand und liefert nach kurzer Zeit nur noch `0.0`! Nutzen Sie `Random.Shared` oder `ThreadLocal<Random>`.
> 3. **UI-Objekte im Hintergrundthread anfassen:** Ein direkter Zugriff auf `SimProgressBar.Value` oder `WriteableBitmap.WritePixels` innerhalb von `Task.Run` wirft sofort eine `InvalidOperationException` (Thread-Affinität von WPF).

**Empfohlener Prompt-Rahmen für Ihren KI-Assistenten:**
> *„Erstelle in C# (.NET 8 WPF) eine asynchrone Hintergrundschleife mit `await Task.Run(...)`, `CancellationTokenSource` und `IProgress<SimulationProgress>`. Innerhalb des Hintergrund-Tasks soll `Parallel.For` mit `ParallelOptions { MaxDegreeOfParallelism = p, CancellationToken = token }` ausgeführt werden. Melde nur alle 5 Zeitschritte über `progress.Report(...)` den Fortschritt an den UI-Thread zurück, wo `WriteableBitmap.WritePixels` und die `ProgressBar` aktualisiert werden.“*

---

## 8. 🔍 Peer-Review-Leitfragen für das Plenum (Showcase & Peer-Challenge)

1. **Der UI-Freeze- & Fenster-Verschiebe-Test:**
   *„Starten Sie eine lange Simulation und verschieben Sie währenddessen das WPF-Fenster mit der Maus oder betätigen Sie den Thread-Slider: Reagiert die Oberfläche verzögerungsfrei, oder hängt der UI-Thread?“*
2. **Der Sofort-Not-Aus-Stresstest:**
   *„Klicken Sie mitten in der laufenden Berechnung auf den roten ‚Not-Aus (Cancel)‘-Button: Bricht die TPL-Schleife innerhalb weniger Millisekunden sauber über das `CancellationToken` ab, ohne eine unbehandelte Exception zum Absturz zu bringen?“*
3. **Der Race-Condition-Check:**
   *„Liefert die parallele Berechnung bei fester Stichprobengröße bzw. festem Seed konsistente Ergebnisse zu einem 1-Thread-Durchlauf, oder gehen durch fehlendes `Interlocked` / fehlendes Double-Buffering Zählwerte verloren?“*
4. **Der Amdahl-Realitätscheck:**
   *„Warum steigt der Speedup $S(p)$ ab der Anzahl physischer Kerne (Hyperthreading / Memory-Bandwidth-Limit) deutlich flacher an als die ideale Diagonale $S(p) = p$, und welchen seriellen Anteil $s$ weist Ihr Dashboard aus?“*
