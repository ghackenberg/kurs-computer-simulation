---
marp: true
theme: fhooe
header: 'Kapitel 5: Diskrete Dynamische Modelle (2025-11-13)'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

<!-- In diesem Kapitel werden die Grundlagen von diskreten dynamischen Modellen sowie deren Simulation und Implementierung behandelt. -->

![bg right](./Titelbild.jpg)

# Kapitel 5: Diskrete Dynamische Modelle

Dieses Kapitel umfasst die folgenden Abschnitte:

- 5.1: Grundlagen und Konzepte
- 5.2: Warteschlangensystem
- 5.3: Simulationsalgorithmus
- 5.4: Implementierung in C#
- 5.5: Analyse und Visualisierung
- 5.6: Probabilistische Modelle
- 5.7: Monte-Carlo-Simulation

---

<!-- Übersicht über die Grundlagen und Konzepte von diskreten dynamischen Modellen. -->

## 5.1: Grundlagen und Konzepte

Dieser Abschnitt umfasst die folgenden Inhalte:

- **Definition** diskreter dynamischer Modelle
- **Abgrenzung** zu kontinuierlichen Modellen
- **Typische Anwendungsbeispiele** wie Warteschlangensysteme

---

<!-- Dieser Abschnitt führt in die grundlegenden Konzepte von diskreten dynamischen Systemen ein und grenzt sie von kontinuierlichen Systemen ab. -->

<div class="columns">
<div class="two">

### Grundlagen und Konzepte

Diskrete dynamische Modelle beschreiben Systeme, deren Zustand sich nur zu diskreten Zeitpunkten ändert. Diese Zustandsänderungen werden durch **Ereignisse** ausgelöst.

Im Gegensatz zu kontinuierlichen Modellen, bei denen der Zustand sich stetig über die Zeit ändert, springt der Zustand bei diskreten Modellen von einem Wert zum nächsten.

Typische Anwendungsbeispiele sind:
- **Warteschlangensysteme** (z.B. Supermarktkassen, Callcenter)
- **Produktions- und Logistiksysteme**
- **Computernetzwerke**

</div>
<div>


![](../../Grafiken/Modellarten%20-%20Diskret.svg)

</div>
</div>

---

<div class="columns">
<div class="two">

### Anwendungsbeispiel: Warteschlangensysteme

Systeme, in denen "Kunden" auf eine oder mehrere "Bedienstationen" warten.

**Typische Fragestellungen:**
- Wie viele Schalter/Kassen werden benötigt, um eine maximale Wartezeit nicht zu überschreiten?
- Wie lang ist die durchschnittliche und maximale Wartezeit?
- Wie hoch ist die durchschnittliche und maximale Auslastung der Schalter?
- Wie wirkt sich eine Änderung der Ankunftsrate der Kunden aus?

</div>
<div>

![](./Diagramme/Warteschlangensystem.svg)

</div>
</div>

---

<div class="columns">
<div class="five">

### Anwendungsbeispiel: Produktions- & Logistiksysteme

Systeme, die den Fluss von Material, Teilen und Produkten durch eine Reihe von Prozessen (z.B. Maschinen, Lager, Transport) modellieren.

**Typische Fragestellungen:**
- Was ist der maximale Durchsatz der Produktionslinie?
- Wo befinden sich Engpässe (Bottlenecks) im System?
- Wie groß müssen Pufferlager dimensioniert werden?
- Wie wirkt sich der Ausfall einer Maschine auf die Gesamtleistung aus?

</div>
<div>

![](./Diagramme/Produktionssystem.svg)

</div>
</div>

---

<div class="columns">
<div class="three">

### Anwendungsbeispiel: Computernetzwerke

Systeme zur Übertragung von Datenpaketen zwischen verschiedenen Knoten (z.B. Clients, Server, Router).

**Typische Fragestellungen:**
- Wie hoch ist die durchschnittliche Netzwerkauslastung?
- Wie groß sind die Latenzzeiten (Verzögerungen) für Datenpakete?
- Was ist der maximale Datendurchsatz zwischen zwei Punkten?
- Wie robust ist das Netzwerk gegen den Ausfall von Verbindungen oder Knoten?

</div>
<div>

![](./Diagramme/Computernetzwerk.svg)

</div>
</div>

---

### Allgemeiner Formalismus (1/2)

Ein diskretes Simulationsmodell besteht aus folgenden Komponenten:

- **Systemzustand $\vec{z}(t)$:** Eine Menge von Zustandsvariablen, die das System beschreiben (z.B. `Queue.Count`, `Server.Busy`). Der Zustand ändert sich nur zu diskreten Zeitpunkten.
- **Ereignisse $e$:** Vorkommnisse, die den Systemzustand sprunghaft ändern (z.B. `Ankunft`, `Bedienende`).
- **Simulationsuhr $t$:** Verfolgt den Fortschritt der Simulationszeit. Sie springt von Ereignis zu Ereignis.
- **Ereignisliste $L$:** Eine nach Zeit geordnete Liste zukünftiger Ereignisse. $L = [(e_1, t_1), (e_2, t_2), ...]$ mit $t_1 \le t_2 \le ...$

---

### Allgemeiner Formalismus (2/2)

Für jedes Ereignis $e_i$ gibt es eine **Ereignisroutine**, die beim Eintreten des Ereignisses ausgeführt wird und zwei Hauptaufgaben hat:

1.  **Zustandsänderung:** Aktualisierung des Systemzustands $\vec{z}(t)$ basierend auf dem alten Zustand und dem aktuellen Ereignis.
    -   $\vec{z}(t_{neu}) \leftarrow f(\vec{z}(t_{alt}), e_i)$

2.  **Ereignisplanung:** Generierung einer Menge neuer zukünftiger Ereignisse $E_{neu}$ und Aktualisierung der Ereignisliste $L$.
    -   $E_{neu} = g(\vec{z}(t_{alt}), e_i)$
    -   $L_{neu} = (L_{alt} \setminus \{(e_i, t_i)\}) \cup E_{neu}$
    - Die Liste $L_{neu}$ muss nach Zeitstempeln sortiert bleiben.

---

<!-- Übersicht über die Modellierung eines Warteschlangensystems. -->

## 5.2: Warteschlangensystem

Dieser Abschnitt umfasst die folgenden Inhalte:

- **Modellierung** eines einfachen Warteschlangensystems
- Definition des **Systemzustands** (`State`)
- Definition der **Ereignisse** (`Events`)
- Abbildung von Zustand und Ereignissen in **C#-Klassen**

---

<div class="columns">
<div class="two">

### Mathematische Beschreibung

Anwendung des Formalismus auf das Warteschlangensystem:

- **Systemzustand $\vec{z}(t)$:**
  - $N(t)$: Anzahl der Kunden im System (in Schlange + in Bedienung).
  - $B(t)$: Zustand der Bedienstation (0 = frei, 1 = besetzt).
  - $\vec{z}(t) = (N(t), B(t))$

- **Ereignisse $e$:**
  - $e_A$: Ankunft eines Kunden (Arrival).
  - $e_D$: Ende der Bedienung eines Kunden (Departure).

</div>
<div>



![](./Illustrationen/SimulationBeispiel.jpg)

</div>
</div>

---

<div class="columns">
<div>

### Ereignisroutine für **Ankunft**

Wenn ein Kunde ankommt, wird geprüft, ob die Bedienstation frei ist.

- **Station besetzt:** Der Kunde wird in die Warteschlange eingereiht.
- **Station frei:** Die Station wird besetzt und ein `DepartureEvent` für die Zukunft geplant, das das Ende der Bedienung markiert.

</div>
<div>

![](./Illustrationen/ArrivalEvent.jpg)

</div>
</div>

---

### **Formalisierung** der Ereignisroutine für Ankunft $e_A$ zum Zeitpunkt $t$

1.  **Zustandsänderung $f(\vec{z}(t_{alt}), e_A)$:**
    - $N(t_{neu}) = N(t_{alt}) + 1$.
    - Wenn $B(t_{alt}) = 0$ (frei) dann $B(t_{neu}) \leftarrow 1$ sonst $B(t_{neu}) = 0$.
2.  **Ereignisplanung $g(\vec{z}(t), e_A)$:**
    - \{(e_A, t + \text{Zwischenankunftszeit})\} \cup ($ wenn $B(t)=0$ dann \{(e_D, t + \text{Bedienzeit})\} sonst $\emptyset$)

![](./Diagramme/ArrivalEvent.svg)

---

<div class="columns">
<div>

### Ereignisroutine für **Abfahrt**

Wenn ein Kunde fertig bedient ist, wird geprüft, ob weitere Kunden warten.

- **Schlange leer:** Die Station wird freigegeben.
- **Schlange nicht leer:** Der nächste Kunde wird aus der Schlange geholt und ein neues `DepartureEvent` für dessen Bedienende geplant.

</div>
<div>

![](./Illustrationen/DepartureEvent.jpg)

</div>
</div>

---

### **Formalisierung** der Ereignisroutine für Abfahrt $e_D$ zum Zeitpunkt $t$

1.  **Zustandsänderung $f(\vec{z}(t_{alt}), e_D)$:**
    - $N(t_{neu}) = N(t_{alt}) - 1$.
    - Wenn $N(t_{alt}) = 0$ (keine Kunden mehr) dann $B(t_{neu}) \leftarrow 0$ sonst $B(t_{neu}) = 1$.
2.  **Ereignisplanung $g(\vec{z}(t), e_D)$:**
    - wenn $N(t)>0$ dann \{(e_D, t + \text{Bedienzeit})\} sonst $\emptyset$

![](./Diagramme/DepartureEvent.svg)

---

<!-- Übersicht über den Simulationsalgorithmus für diskrete Systeme. -->

## 5.3: Simulationsalgorithmus

Dieser Abschnitt umfasst die folgenden Inhalte:

- Vorstellung des **"Next-Event Time Advance"**-Algorithmus
- Die drei zentralen Schritte: **Initialisierung, Ereignisauswahl, Ereignisbehandlung**
- Bedeutung der **Simulationsuhr** und der **Ereignisliste**

---

<!-- Dieser Abschnitt erläutert den "Next-Event Time Advance"-Algorithmus, der die Grundlage für die Simulation von diskreten Systemen bildet. -->

### Simulationsalgorithmus

1.  **Initialisierung:** Startzustand und initiale Ereignisse festlegen.
2.  **Schleife:** Solange es zukünftige Ereignisse gibt:
    a.  **Ereignis auswählen:** Das Ereignis mit dem frühesten Zeitstempel aus der Ereignisliste (Event Queue) entnehmen.
    b.  **Uhr vorstellen:** Die Simulationsuhr auf den Zeitstempel dieses Ereignisses setzen.
    c.  **Ereignis behandeln:** Die Zustandsänderungen für das Ereignis durchführen und ggf. neue Ereignisse generieren und in die Ereignisliste einfügen.

![](../../Grafiken/Next-Event-Time-Advance.svg)

---

<div class="columns">
<div>

### Konkretes Beispiel: Simulationsablauf

Annahmen für das Beispiel:
- **Kunde 1:** Ankunft bei t=1, Bedienzeit=3
- **Kunde 2:** Ankunft bei t=2, Bedienzeit=2
- **Kunde 3:** Ankunft bei t=5, Bedienzeit=3

**Initialisierung:**
- `Clock = 0`
- `State = { Busy: false, Queue: [] }`
- `EventQueue = [ (Arrival, t=1), (Arrival, t=2), (Arrival, t=5) ]`

</div>
<div>

![](./Illustrationen/SimulationBeispiel.jpg)

</div>
</div>

---

### Tabellarischer Ablauf

Die folgende Tabelle zeigt die Werte der `Clock`, des `State` und der `EventQueue` während der Simulationsrechnung:

| Clock | Event | State (Busy, Queue) | Event Queue | Anmerkung |
| :--- | :--- | :--- | :--- | :--- |
| 0 | Init | `(false, 0)` | `[(A,1), (A,2), (A,5)]` |
| 1 | Arrival | `(true, 0)` | `[(A,2), (D,4), (A,5)]` | K1 kommt an und wird bedient |
| 2 | Arrival | `(true, 1)` | `[(D,4), (A,5)]` | K2 kommt an und wartet |
| 4 | Departure | `(true, 0)` | `[(A,5), (D,6)]` | K1 ist fertig, K2 wird bedient |
| 5 | Arrival | `(true, 1)` | `[(D,6)]` | K3 kommt an und wartet |
| 6 | Departure | `(true, 0)` | `[(D,9)]` | K2 ist fertig, K3 wird bedient |
| 9 | Departure | `(false, 0)` | `[]` | K3 ist fertig |

---

<!-- Übersicht über die Implementierung des Simulationsmodells in C#. -->

## 5.4: Implementierung in C#

Dieser Abschnitt umfasst die folgenden Inhalte:

- Implementierung der **Simulationsschleife**
- Verwendung einer **`PriorityQueue`** für die Ereignisliste
- Logik zur Behandlung von **Ankunftsereignissen** (`ArrivalEvent`)
- Logik zur Behandlung von **Abfahrtsereignissen** (`DepartureEvent`)


---

<!-- In diesem Abschnitt wird das Beispiel eines einfachen Warteschlangensystems (Single-Server Queue) modelliert. -->

<div class="columns">
<div class="two">

### Modellierung eines Warteschlangensystems

Wir betrachten ein einfaches System mit einer einzigen Bedienstation (Server) und einer Warteschlange.

**Systemzustand (State):**
- Ist die Bedienstation besetzt? (`bool Busy`)
- Wie viele Kunden warten in der Schlange? (`Queue<double>`)

**Ereignisse (Events):**
- Ankunft eines Kunden (`ArrivalEvent`)
- Ende der Bedienung (`DepartureEvent`)

</div>
<div>

![](../../Quellen/WS24/DynamischWarteschlange/Screenshot.png)

</div>
</div>

---

### Systemzustand (State)

Der Zustand des Systems wird durch eine Klasse abgebildet, die alle relevanten Zustandsgrößen enthält. Für unser Warteschlangensystem sind das die Belegung der Station und die Warteschlange selbst.

```csharp
namespace DynamischWarteschlange.Model
{
    // Zustand des Systems zu einem gegebenen Zeitpunkt
    internal class State
    {
        // Belegung der Kasse bzw. der Maschine
        public bool Busy { get; set; } = false;

        // Warteschlange vor der Kasse bzw. der Maschine
        public Queue<double> Queue { get; } = new Queue<double>();
    }
}
```

---

### Ereignisse (Events)

Ereignisse repräsentieren die Zeitpunkte, an denen sich der Systemzustand ändern kann. Wir definieren eine Basisklasse `Event` mit einem Zeitstempel und leiten davon spezifische Ereignistypen ab.

```csharp
namespace DynamischWarteschlange.Model
{
    // Basisklasse für alle Arten von Ereignissen
    internal abstract class Event
    {
        public double Timestamp { get; set; }

        public Event(double timestamp)
        {
            Timestamp = timestamp;
        }
    }
    // Ankunft eines Kunden
    internal class ArrivalEvent : Event { ... }
    // Abfahrt eines Kunden
    internal class DepartureEvent : Event { ... }
}
```

---

<!-- In diesem Abschnitt wird die C#-Implementierung des Simulationsalgorithmus und der Ereignisbehandlung gezeigt. -->

<div class="columns">
<div class="three">

### Implementierung in C#

Die `Simulation`-Klasse steuert den Ablauf und enthält die Simulationsuhr (`Clock`), den Systemzustand (`State`) und die Ereignisliste (`EventQueue`).

Die `Run()`-Methode implementiert die Haupt-Simulationsschleife. Sie verarbeitet Ereignisse aus der `PriorityQueue`, bis diese leer ist. Die `PriorityQueue` stellt sicher, dass immer das Ereignis mit dem kleinsten Zeitstempel als nächstes behandelt wird.

</div>
<div class="three">

```csharp
internal class Simulation
{
    public double Clock { get; set; } = 0;
    public State State { get; set; } = new State();
    private PriorityQueue<Event, double> EventQueue { get; }

    public void Run()
    {
        while (EventQueue.Count > 0)
        {
            Event next = EventQueue.Dequeue();
            Clock = next.Timestamp;

            if (next is ArrivalEvent)
            {
                // ...
            }
            else if (next is DepartureEvent)
            {
                // ...
            }
        }
    }
}
```

</div>
</div>

---

### Behandlung eines Ankunftsereignisses (`ArrivalEvent`)

Wenn ein Kunde ankommt, gibt es zwei Möglichkeiten:

<div class="columns">
<div class="three">

**1. Station ist besetzt:**
Der Kunde wird in die Warteschlange (`State.Queue`) eingereiht.

**2. Station ist frei:**
Der Kunde wird sofort bedient.
- Der Zustand `State.Busy` wird auf `true` gesetzt.
- Eine Bedienzeit wird (zufällig) bestimmt.
- Ein neues `DepartureEvent` wird generiert und zum Zeitpunkt `Clock + Bedienzeit` in die `EventQueue` eingefügt.

</div>
<div class="three">

```csharp
if (next is ArrivalEvent)
{
    if (State.Busy)
    {
        State.Queue.Enqueue(Clock);
    }
    else
    {
        State.Busy = true;
        var serviceTime = Random.NextDouble() * 5 * 60;
        Add(new DepartureEvent(Clock + serviceTime));
    }
}
```

</div>
</div>

---

### Behandlung eines Abfahrtsereignisses (`DepartureEvent`)

Wenn ein Kunde die Station verlässt, gibt es zwei Möglichkeiten:

<div class="columns">
<div class="three">

**1. Warteschlange ist leer:**
Die Station wird frei.
- Der Zustand `State.Busy` wird auf `false` gesetzt.

**2. Warteschlange ist nicht leer:**
Der nächste Kunde wird aus der Schlange geholt und bedient.
- Eine neue Bedienzeit wird bestimmt.
- Ein neues `DepartureEvent` für diesen Kunden wird zum Zeitpunkt `Clock + Bedienzeit` in die `EventQueue` eingefügt.

</div>
<div class="three">

```csharp
else if (next is DepartureEvent)
{
    if (State.Queue.Count == 0)
    {
        State.Busy = false;
    }
    else
    {
        var arrivalTime = State.Queue.Dequeue();
        var waitTime = Clock - arrivalTime;
        // ...
        var serviceTime = Random.NextDouble() * 5 * 60;
        Add(new DepartureEvent(Clock + serviceTime));
    }
}
```

</div>
</div>

---

<!-- Übersicht über die Analyse und Visualisierung der Simulationsergebnisse. -->

## 5.5: Analyse und Visualisierung

Dieser Abschnitt umfasst die folgenden Inhalte:

- **Sammeln von Daten** während der Simulation (z.B. Warteschlangenlänge)
- **Speicherung** der Daten in Listen für die spätere Auswertung
- **Visualisierung** der Ergebnisse als Verlaufsdiagramme und Histogramme mittels `ScottPlot`

---

<!-- Dieser Abschnitt zeigt, wie die während der Simulation gesammelten Daten mit ScottPlot visualisiert werden können. -->

![bg contain right](../../Quellen/WS24/DynamischWarteschlange/Screenshot.png)

### Analyse und Visualisierung

Während der Simulation werden Daten wie die Belegung der Station, die Länge der Warteschlange und die Wartezeiten der Kunden gesammelt.

```csharp
// Listen für die Visualisierung
public List<double> ChartTime = new List<double>();
public List<bool> ChartBusy = new List<bool>();
public List<int> ChartLength = new List<int>();
public List<double> WaitTime = new List<double>();
```

Nach dem Simulationslauf werden diese Daten verwendet, um Verläufe und Histogramme zu erstellen, z.B. mit der Bibliothek `ScottPlot`.

---

<div class="columns">
<div class="two">

### Visualisierung mit ScottPlot

`ScottPlot` ist eine freie und quelloffene Bibliothek für .NET zur Erstellung von Diagrammen.

- **Einfache API:** Erlaubt das schnelle Erstellen von Diagrammen mit wenigen Codezeilen.
- **Performant:** Optimiert für die interaktive Darstellung großer Datenmengen.
- **Vielseitig:** Unterstützt eine Vielzahl von Diagrammtypen wie Linien-, Streu-, Balkendiagramme und Histogramme.
- **Interaktiv:** Diagramme in WPF- und WinForms-Anwendungen sind standardmäßig interaktiv (zoomen, verschieben).

Ideal für die schnelle Visualisierung von Simulationsergebnissen.

</div>
<div>

![](https://scottplot.net/images/brand/favicon.svg)

</div>
</div>

---

<div class="columns">
<div class="three">

### ScottPlot API: **Grundlagen**

Die zentrale Klasse in ScottPlot ist `ScottPlot.Plot`. Eine Instanz davon repräsentiert ein Diagramm.

**Typischer Workflow:**
1.  **Plot-Objekt erhalten:** Entweder über ein `FormsPlot` (WinForms) oder `WpfPlot` (WPF) Control oder direkt `new Plot()`.
2.  **Daten hinzufügen:** Mit Methoden wie `Plot.Add.Scatter()`, `Plot.Add.Line()`, `Plot.Add.Bar()`.
3.  **Diagramm konfigurieren:** Achsenbeschriftungen (`Plot.XLabel()`, `Plot.YLabel()`), Titel (`Plot.Title()`), Legende (`Plot.Legend.IsVisible = true`).
4.  **Rendern/Aktualisieren:** Das Diagramm neu zeichnen lassen (z.B. `WpfPlot.Plot.Render()`)

</div>
<div>

```csharp
// Ein Plot-Objekt erhalten
var myPlot = WpfPlotControl.Plot;

// Daten hinzufügen
myPlot.Add.Scatter(xs, ys);

// Achsen beschriften
myPlot.XLabel("Zeit [s]");
myPlot.YLabel("Wert");

// Diagramm aktualisieren
WpfPlotControl.Refresh();
```

</div>
</div>

---

### ScottPlot API: **Linien- und Streudiagramme**

```csharp
// Daten für X- und Y-Achse
double[] xs = { 1, 2, 3, 4, 5 };
double[] ys1 = { 10, 12, 15, 13, 18 };
double[] ys2 = { 8, 11, 13, 16, 14 };

// Linien- und Streudiagramm hinzufügen
var scatter1 = myPlot.Add.Scatter(xs, ys1);
scatter1.Label = "Messreihe 1";
scatter1.Color = ScottPlot.Colors.Blue;
scatter1.MarkerSize = 5; // Punkte anzeigen

var scatter2 = myPlot.Add.Scatter(xs, ys2);
scatter2.Label = "Messreihe 2";
scatter2.Color = ScottPlot.Colors.Red;
scatter2.LineStyle = ScottPlot.LineStyle.Dash; // Gestrichelte Linie

// Legende anzeigen
myPlot.Legend.IsVisible = true;

// Achsen automatisch anpassen
myPlot.Axes.AutoScale();
```

---

### ScottPlot API: **Histogramme**

```csharp
// Beispiel: Wartezeiten aus einer Simulation
double[] waitTimes = { 1.2, 2.5, 1.8, 3.1, 2.0, 1.5, 2.8, 3.5, 2.2, 1.9 };

// Histogramm-Daten berechnen
// bins: Anzahl der Intervalle
var hist = new ScottPlot.Statistics.Histogram(waitTimes, min: 0, max: 5, binCount: 10);

// Histogramm zum Plot hinzufügen
var bar = myPlot.Add.Bar(hist.Counts, hist.BinCenters);
bar.Label = "Verteilung der Wartezeiten";
bar.FillColor = ScottPlot.Colors.Green.WithAlpha(0.7);
bar.BorderColor = ScottPlot.Colors.Green;

// Achsen beschriften
myPlot.XLabel("Wartezeit [min]");
myPlot.YLabel("Häufigkeit");

// Achsen automatisch anpassen
myPlot.Axes.AutoScale();
```

---

<!-- Übersicht über probabilistische Modelle und Monte-Carlo-Simulation. -->

## 5.6: Probabilistische Modelle und Monte-Carlo-Simulation

Dieser Abschnitt umfasst die folgenden Inhalte:

- **Abgrenzung** deterministischer und probabilistischer Modelle
- **Erweiterung des Formalismus** um Zufallsvariablen
- **Grundprinzip** der Monte-Carlo-Simulation zur statistischen Auswertung

---

<!-- Dieser Abschnitt grenzt deterministische von probabilistischen (stochastischen) Modellen ab. -->

<div class="columns">
<div class="two">

### Probabilistische vs. Deterministische Modelle

Bisher waren unsere Modelle **deterministisch**: Bei gleichem Input kommt immer der gleiche Output heraus.

Reale Systeme beinhalten jedoch oft **Zufallsprozesse**:
- Kundenankünfte sind unregelmäßig.
- Bedienzeiten oder Prozessdauern variieren.

Diese Zufälligkeiten werden durch **Wahrscheinlichkeitsverteilungen** (z.B. Exponential-, Normalverteilung) modelliert. Das Modell wird **probabilistisch** (oder stochastisch). 

Das Ergebnis einer einzelnen Simulation ist damit selbst eine **Zufallsvariable**.

</div>
<div>

![](../../Grafiken/Modellarten%20-%20Probabilistisch.svg)

</div>
</div>

---

### Erweiterter Formalismus mit Zufallsvariablen

Die Zufälligkeit fließt in die **Ereignisplanung** ein. Die Funktion $g$ hängt nun zusätzlich von einer Zufallszahl (oder einem Zufallsvektor) $\omega$ ab.

-   $E_{neu} = g(\vec{z}(t_{alt}), e_i, \omega_i)$

Im Warteschlangen-Beispiel werden Zwischenankunfts- und Bedienzeiten aus Verteilungen gezogen:
-   **Zwischenankunftszeit** $\sim \text{Exponential}(\lambda)$
-   **Bedienzeit** $\sim \text{Normal}(\mu, \sigma^2)$

```csharp
// Bedienzeit aus einer Normalverteilung mit µ=3min, σ=30s
var serviceTime = NextNormal(mean: 3 * 60, stdDev: 0.5 * 60);
Add(new DepartureEvent(Clock + serviceTime));

// Nächste Ankunft mit Exponentialverteilung (mittlere Ankunftsrate: 1 Kunde alle 2min)
var interarrivalTime = NextExponential(lambda: 1.0 / (2 * 60));
Add(new ArrivalEvent(Clock + interarrivalTime));
```

---

### Definition der **Exponentialverteilung**

Die **Exponentialverteilung** beschreibt die Zeit zwischen zwei aufeinanderfolgenden Ereignissen in einem Poisson-Prozess, d.h. Ereignisse, die kontinuierlich und unabhängig voneinander mit einer konstanten durchschnittlichen Rate auftreten.

- **Kontinuierliche** Wahrscheinlichkeitsverteilung.
- **Parameter:** $\lambda > 0$ (Ratenparameter), der die durchschnittliche Anzahl der Ereignisse pro Zeiteinheit angibt.
- **Wahrscheinlichkeitsdichtefunktion (PDF):**
  $f(x; \lambda) = \lambda e^{-\lambda x}$ für $x \ge 0$
- **Kumulative Verteilungsfunktion (CDF):**
  $F(x; \lambda) = 1 - e^{-\lambda x}$ für $x \ge 0$
- **Erwartungswert (Mittelwert):** $E[X] = 1/\lambda$
- **Varianz:** $Var[X] = 1/\lambda^2$

---

### Verlauf der Exponentialverteilung

Die folgenden beiden Diagramme zeigen den Verlauf der Wahrscheinlichkeitsdichtefunktion und der kummulativen Verteilungsfunktion für die Exponentialverteilung:

<div class="columns">
<div>

**Wahrscheinlichkeitsdichtefunktion**

![width:350](https://upload.wikimedia.org/wikipedia/commons/a/af/ExpDichteF.svg)

</div>
<div>

**Kumulative Verteilungsfunktion**

![width:350](https://upload.wikimedia.org/wikipedia/commons/b/ba/ExpVerteilungF.svg)

</div>
</div>

---

### Implementierung der Exponentialverteilung

Zufallszahlen, die einer **Exponentialverteilung** folgen, können mittels der **Inversionsmethode** aus gleichverteilten Zufallszahlen erzeugt werden.

- Eine gleichverteilte Zufallszahl $u \in [0, 1)$ wird mit `random.NextDouble()` erzeugt.
- Die Transformation lautet: $x = -\frac{1}{\lambda} \ln(1 - u)$
- $\lambda$ ist die Rate der Verteilung (z.B. mittlere Anzahl Ankünfte pro Zeiteinheit).

```csharp
private double NextExponential(Random random, double lambda)
{
    // random.NextDouble() liefert eine Zahl in [0.0, 1.0)
    double u = random.NextDouble();

    // Inversionsmethode anwenden
    // (1.0 - u) um zu verhindern, dass Log(0) -> -unendlich wird
    return -Math.Log(1.0 - u) / lambda;
}
```

---

<div class="columns">
<div class="three">

### Herleitung mittels Inversionsmethode (1/2) - **Prinzip**

Die **Inversionsmethode** (Inverse Transform Sampling) ist ein Verfahren zur Erzeugung von Zufallszahlen nach einer beliebigen Verteilung, deren kumulative Verteilungsfunktion (CDF) $F_X(x)$ bekannt und analytisch invertierbar ist.

**Grundidee:**
1.  Wir wissen: Wenn eine Zufallsvariable $X$ die CDF $F_X(x)$ besitzt, dann ist $U = F_X(X)$ gleichverteilt im Intervall $[0, 1]$.
2.  Umgekehrt können wir eine gleichverteilte Zufallszahl $U \sim \text{Uniform}(0, 1)$ nutzen, um $X$ zu erzeugen, indem wir die umgekehrte Funktion der CDF, $F_X^{-1}$, anwenden: $X = F_X^{-1}(U)$

</div>
<div class="two">

![width:1000](./Diagramme/Inversionsmethode_Prinzip.tikz.svg)

</div>
</div>

---

### Herleitung mittels Inversionsmethode (2/2) - **Exponentialverteilung**

**Ziel:** Erzeuge eine Zufallsvariable $X$ mit der kumulativen Verteilungsfunktion (CDF) der Exponentialverteilung: $F_X(x) = 1 - e^{-\lambda x}$ für $x \ge 0$.

**Schritte:**
1.  Setze die CDF gleich einer gleichverteilten Zufallszahl $U \in [0, 1)$: $U = 1 - e^{-\lambda X}$
2.  Löse nach $e^{-\lambda X}$ auf: $e^{-\lambda X} = 1 - U$
3.  Wende den natürlichen Logarithmus auf beide Seiten an:
    $\ln(e^{-\lambda X}) = \ln(1 - U)$ und $-\lambda X = \ln(1 - U)$
4.  Löse nach $X$ auf: $X = -\frac{1}{\lambda} \ln(1 - U)$

**Hinweis:** Da $U$ eine gleichverteilte Zufallszahl in $[0, 1)$ ist, ist auch $1 - U$ eine gleichverteilte Zufallszahl in $(0, 1]$. Daher kann die Formel vereinfacht werden zu: $X = -\frac{1}{\lambda} \ln(U)$

---

### Definition der **Normalverteilung**

Die **Normalverteilung**, auch **Gauß-Verteilung** genannt, ist eine kontinuierliche Wahrscheinlichkeits-verteilung, die symmetrisch um ihren Mittelwert ist. Sie beschreibt, dass Datenpunkte, die nahe am Mittelwert liegen, häufiger auftreten als Datenpunkte, die weiter vom Mittelwert entfernt sind.

- Oft als "Glockenkurve" bezeichnet.
- **Parameter:**
  - $\mu$ (Mittelwert): Der zentrale Wert der Verteilung.
  - $\sigma$ (Standardabweichung): Ein Maß für die Streuung der Daten um den Mittelwert.
- **Wahrscheinlichkeitsdichtefunktion (PDF):**
  - $f(x; \mu, \sigma) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{1}{2} \left(\frac{x - \mu}{\sigma}\right)^2}$
- Die kumulative Verteilungsfunktion (CDF) hat keine geschlossene analytische Form und wird üblicherweise mit $\Phi(x)$ bezeichnet.

---

### Verlauf der Normalverteilung

Die folgenden beiden Diagramme zeigen den Verlauf der Wahrscheinlichkeitsdichtefunktion und der kummulativen Verteilungsfunktion für die Normalverteilung:

<div class="columns top">
<div>

**Wahrscheinlichkeitsdichtefunktion**

![](https://upload.wikimedia.org/wikipedia/commons/7/74/Normal_Distribution_PDF.svg)

</div>
<div>

**Kumulative Verteilungsfunktion**

![](https://upload.wikimedia.org/wikipedia/commons/1/14/Normal-distribution-cumulative-distribution-function-many.svg)

</div>
</div>

---

### Implementierung der Normalverteilung

Zufallszahlen, die einer **Normalverteilung** folgen, können mittels der **Box-Muller-Transformation** erzeugt werden. Diese Methode transformiert zwei unabhängige, gleichverteilte Zufallszahlen in zwei unabhängige, standardnormalverteilte Zufallszahlen.

- $Z_0 = \sqrt{-2 \ln U_1} \cos(2\pi U_2)$
- Eine standardnormalverteilte Zahl $Z_0$ kann dann auf eine beliebige Normalverteilung mit Mittelwert $\mu$ und Standardabweichung $\sigma$ skaliert werden: $X = \mu + \sigma Z_0$.

```csharp
private double NextNormal(Random random, double mean, double stdDev)
{
    // Zwei gleichverteilte Zufallszahlen im Intervall (0.0, 1.0]
    double u1 = 1.0 - random.NextDouble();
    double u2 = 1.0 - random.NextDouble();
    // Box-Muller-Transformation für eine standardnormalverteilte Zahl (Z)
    double z = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Cos(2.0 * Math.PI * u2);
    // Transformation zur gewünschten Normalverteilung (µ, σ)
    return mean + stdDev * z;
}
```

---

### Herleitung der Box-Muller-Transformation (1/3) - **Die Idee**

Die **Box-Muller-Transformation** ist eine Methode zur Erzeugung von Paaren unabhängiger, standardnormalverteilter Zufallszahlen aus Paaren unabhängiger, gleichverteilter Zufallszahlen.

**Grundidee:**
1.  Betrachte zwei unabhängige standardnormalverteilte Zufallsvariablen $Z_1$ und $Z_2$.
2.  Ihre gemeinsame Wahrscheinlichkeitsdichtefunktion (PDF) ist:
    - $f(z_1, z_2) = \frac{1}{2\pi} e^{-\frac{z_1^2 + z_2^2}{2}}$
3.  Diese PDF besitzt eine **radiale Symmetrie**. Dies legt nahe, dass eine Transformation in Polarkoordinaten hilfreich sein könnte.
    -   $Z_1 = R \cos \Theta$
    -   $Z_2 = R \sin \Theta$
    -   Wobei $R^2 = Z_1^2 + Z_2^2$ und $\Theta = \arctan(Z_2/Z_1)$.

---

### Herleitung der Box-Muller-Transformation (2/3) - **Die Transformation**

Die Transformation von kartesischen zu Polarkoordinaten führt zu neuen Zufallsvariablen $R$ (Radius) und $\Theta$ (Winkel).

**Eigenschaften von $R^2$ und $\Theta$:**
-   Es kann gezeigt werden, dass $R^2 = Z_1^2 + Z_2^2$ einer Exponentialverteilung mit Rate $\lambda = 1/2$ folgt.
    -   Wir können $R^2$ aus einer gleichverteilten Zufallszahl $U_1 \in (0, 1]$ erzeugen, indem wir die Inversionsmethode anwenden:
        $R^2 = -2 \ln(U_1)$
-   Der Winkel $\Theta$ ist gleichverteilt im Intervall $[0, 2\pi]$.
    -   Wir können $\Theta$ aus einer gleichverteilten Zufallszahl $U_2 \in [0, 1)$ erzeugen:
        $\Theta = 2\pi U_2$

**Zusammenfassung der Zwischenschritte:**
-   $R = \sqrt{-2 \ln U_1}$  und  $\Theta = 2\pi U_2$

---

### Herleitung der Box-Muller-Transformation (3/3) - **Die Formeln**

Durch Einsetzen von $R$ und $\Theta$ in die Polarkoordinaten-Gleichungen erhalten wir die beiden standardnormalverteilten Zufallszahlen $Z_1$ und $Z_2$:

1.  **Erste standardnormalverteilte Zufallszahl $Z_1$:**
    $Z_1 = R \cos \Theta = \sqrt{-2 \ln U_1} \cos(2\pi U_2)$

2.  **Zweite standardnormalverteilte Zufallszahl $Z_2$:**
    $Z_2 = R \sin \Theta = \sqrt{-2 \ln U_1} \sin(2\pi U_2)$

**Anwendung:**
-   Diese Methode erzeugt immer ein Paar von standardnormalverteilten Zufallszahlen.
-   Man kann eine der Zahlen verwenden und die andere für den nächsten Bedarf speichern oder verwerfen, falls nur eine benötigt wird.
-   Um eine Normalverteilung mit Mittelwert $\mu$ und Standardabweichung $\sigma$ zu erhalten, skaliert man die standardnormalverteilte Zahl $Z$, sodass  $X = \mu + \sigma Z$

---

<div class="columns">
<div>

### Das Problem mit der Einzelsimulation

Ein einzelner Simulationslauf (eine **Replikation**) ist nur *ein möglicher* Systemverlauf ("Sample Path").

Das Ergebnis (z.B. mittlere Wartezeit = 4.7 min) ist nicht repräsentativ für das allgemeine Systemverhalten. Bei einem erneuten Lauf mit anderen Zufallszahlen könnte das Ergebnis 8.1 min sein.

**Ziel:** Wir wollen nicht das Ergebnis eines einzelnen Laufs, sondern **statistische Kennzahlen** über viele mögliche Verläufe hinweg (z.B. den Erwartungswert der mittleren Wartezeit).

</div>
<div>

![](./Illustrationen/ProbabilistischeModelle.jpg)

</div>
</div>

---

## 5.7: Monte-Carlo-Simulation

Dieser Abschnitt umfasst die folgenden Inhalte:

- Grundprinzip der Monte-Carlo-Simulation
- Monte-Carlo-Algorithmus
- Parallelisierung zur Performance-Verbesserung
- Task Parallel Library (`Parallel.For`)
- Threadsichere Sammlungen (`ConcurrentBag<T>`)
- Race Conditions und deren Vermeidung
- Threadsicherheit von `System.Random`

---

<!-- Dieser Abschnitt erklärt das Grundprinzip der Monte-Carlo-Simulation. -->

### Monte-Carlo-Simulation

Die **Monte-Carlo-Methode** ist ein numerisches Verfahren, um statistische Eigenschaften eines Systems durch wiederholte Simulation zu schätzen.

**Grundprinzip:**
1.  Führe die Simulation sehr oft durch ($N$ **Replikationen**).
2.  Jede Replikation muss mit **unabhängigen Zufallszahlen** laufen (d.h. anderer Startwert / "Seed" für den Zufallszahlengenerator).
3.  Sammle die Ergebnis-Kennzahl (z.B. mittlere Wartezeit) aus jeder einzelnen Replikation.
4.  Werte die gesammelten Ergebnisse statistisch aus (z.B. Mittelwert, Varianz, Konfidenzintervall).

Nach dem **Gesetz der großen Zahlen** nähert sich der Mittelwert der Ergebnisse mit steigendem $N$ dem wahren Erwartungswert der Kennzahl an.

---

<div class="columns">
<div class="two">

### Monte-Carlo-Algorithmus

</div>
<div>

![](./Illustrationen/MonteCarlo.jpg)

</div>
</div>

```csharp
var results = new List<double>();
int numberOfReplications = 1000;

for (int i = 0; i < numberOfReplications; i++)
{
    // Wichtig: Jede Replikation braucht einen anderen Seed!
    var simulation = new Simulation(seed: i); 
    simulation.Run();
    // Sammle die relevante Kenngröße aus dem Simulationslauf
    if (simulation.WaitTimes.Any())
    {
        var averageWaitTime = simulation.WaitTimes.Average();
        results.Add(averageWaitTime);
    }
}

// Werte die Ergebnisse aller Replikationen statistisch aus
var overallMeanWaitTime = results.Average();
var variance = results.Sum(d => Math.Pow(d - overallMeanWaitTime, 2)) / (results.Count - 1);
var stdDev = Math.Sqrt(variance);
```

---

<div class="columns">
<div>

### Parallelisierung der Monte-Carlo-Simulation

Da jede Replikation einer Monte-Carlo-Simulation **unabhängig** von den anderen ist, können alle Replikationen **parallel** ausgeführt werden.

- Dies ist ein klassischer "Embarrassingly Parallel"-Anwendungsfall.
- Auf modernen Multi-Core-CPUs kann dies zu einer massiven Beschleunigung führen.
- Anstatt 10.000 Replikationen nacheinander auszuführen, kann man z.B. auf 8 Kernen jeweils 1.250 Replikationen gleichzeitig berechnen.

</div>
<div>

![](./Illustrationen/MonteCarloParallel.jpg)

</div>
</div>

---

### Implementierung der Parallelisierung

```csharp
// Threadsichere Sammlung für die Ergebnisse
var results = new ConcurrentBag<double>();
int numberOfReplications = 10000;

Parallel.For(0, numberOfReplications, i =>
{
    // Wichtig: Jeder Thread braucht eine eigene Random-Instanz,
    // initialisiert mit einem eindeutigen Seed.
    var threadLocalRandom = new Random(i);

    // Simulation mit der thread-lokalen Random-Instanz durchführen
    var simulation = new Simulation(random: threadLocalRandom); 
    simulation.Run();
    
    if (simulation.WaitTimes.Any())
    {
        var averageWaitTime = simulation.WaitTimes.Average();
        results.Add(averageWaitTime);
    }
});
```

---

### Task Parallel Library: `Parallel.For`

`Parallel.For` ist eine Methode aus der Task Parallel Library (TPL) in .NET, die eine `for`-Schleife parallelisiert.

- Die TPL kümmert sich automatisch um die Erstellung und Verwaltung von Threads und die Aufteilung der Arbeit auf die verfügbaren CPU-Kerne.
- Der Schleifenkörper wird als *Lambda*-Ausdruck übergeben, der für jede Iteration ausgeführt wird – potenziell auf einem anderen Thread.

<div class="columns">
<div>

**Sequentiell:**
```csharp
for (int i = 0; i < 100; i++)
{
    DoWork(i);
}
```

</div>
<div>

**Parallel:**
```csharp
Parallel.For(0, 100, i =>
{
    DoWork(i);
});
```

</div>
</div>

---

### Threadsichere Sammlungen: `ConcurrentBag<T>`

Wenn mehrere Threads gleichzeitig auf eine Standard-Collection wie `List<T>` schreibend zugreifen, kann dies zu Datenkorruption (*Race Conditions*) führen.

- `ConcurrentBag<T>` ist eine threadsichere Collection, die für Szenarien optimiert ist, in denen die Reihenfolge der Elemente keine Rolle spielt.
- Sie erlaubt das gleichzeitige Hinzufügen von Elementen durch mehrere Threads ohne explizite `lock`-Anweisungen.

<div class="columns">
<div>

**Nicht threadsicher:**
```csharp
var list = new List<double>();

// Führt zu Fehlern!
Parallel.For(0, 100, i =>
{
    list.Add(i * 2.0);
});
```

</div>
<div>

**Threadsicher:**
```csharp
var bag = new ConcurrentBag<double>();

// Sicher!
Parallel.For(0, 100, i =>
{
    bag.Add(i * 2.0);
});
```

</div>
</div>

---

### Exkurs: **Race Conditions**

Eine **Race Condition** (Wettlaufsituation) tritt auf, wenn mehrere Threads gleichzeitig auf dieselben gemeinsam genutzten Daten zugreifen und versuchen, diese zu ändern. Das Endergebnis hängt dann von der unvorhersehbaren Reihenfolge ab, in der die Threads ausgeführt werden.

**Konsequenzen:**
- **Falsche Ergebnisse:** Die Daten können inkonsistent oder fehlerhaft sein.
- **Datenkorruption:** Der Zustand des Programms kann unbrauchbar werden.
- **Schwer zu debuggen:** Da Race Conditions nicht deterministisch sind, treten sie oft nur sporadisch auf und sind schwer zu reproduzieren.

**Beispiel:** Zwei Threads inkrementieren einen gemeinsamen Zähler. Wenn der Zugriff nicht synchronisiert ist, kann der Zähler einen falschen Endwert haben, da eine Inkrementierung die andere überschreiben könnte.

---

### Code-Beispiel: Race Condition mit Zähler

Dieses Beispiel zeigt, wie ein gemeinsam genutzter Zähler bei parallelem Zugriff ohne Synchronisation zu falschen Ergebnissen führen kann und wie dies mit einem `lock`-Statement behoben wird.

<div class="columns top">
<div>

**Falsches Ergebnis (ohne `lock`):**
```csharp
int counter = 0;
Parallel.For(0, 10000, _ =>
{
    // Mehrere Threads versuchen gleichzeitig,
    // 'counter' zu lesen, zu inkrementieren und zu schreiben.
    // Dies führt zu Datenverlust.
    counter++; // Nicht threadsicher!
});
Console.WriteLine($"Ergebnis (falsch): {counter}");
// Erwartet: 10000, Tatsächlich: < 10000
```

</div>
<div>

**Korrigiertes Ergebnis (mit `lock`):**
```csharp
int counter = 0;
// Ein Objekt, das als Sperre dient.
// Nur ein Thread kann gleichzeitig den Code im 'lock'-Block ausführen.
object lockObject = new object();
Parallel.For(0, 10000, _ =>
{
    lock (lockObject) // Threadsicher!
    {
        counter++;
    }
});
Console.WriteLine($"Ergebnis (korrekt): {counter}");
// Erwartet: 10000, Tatsächlich: 10000
```

</div>
</div>

---

### Threadsicherheit von `System.Random`

Die Klasse `System.Random` ist **nicht threadsicher**. Wenn mehrere Threads dieselbe `Random`-Instanz verwenden, kann deren interner Zustand beschädigt werden. Dies führt zu fehlerhaften oder nicht mehr zufälligen Zahlenfolgen.

**Lösung:** Jeder Thread muss seine eigene, unabhängige `Random`-Instanz erhalten.
- In einer `Parallel.For`-Schleife wird dies erreicht, indem man die Instanz *innerhalb* des Schleifenkörpers erstellt.
- Um sicherzustellen, dass jede Instanz eine andere Zahlenfolge erzeugt, muss sie mit einem eindeutigen **Seed** initialisiert werden. Die Schleifenvariable `i` ist dafür gut geeignet.

```csharp
Parallel.For(0, numberOfReplications, i =>
{
    // Jede Iteration (potenziell in einem anderen Thread)
    // erhält eine eigene, eindeutig initialisierte Random-Instanz.
    var localRandom = new Random(seed: i);
});
```