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
- 5.2: Modellierung eines Warteschlangensystems
- 5.3: Simulationsalgorithmus
- 5.4: Implementierung in C#
- 5.5: Analyse und Visualisierung

---

<!-- Dieser Abschnitt führt in die grundlegenden Konzepte von diskreten dynamischen Systemen ein und grenzt sie von kontinuierlichen Systemen ab. -->

<div class="columns">
<div class="two">

## 5.1: Grundlagen und Konzepte

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

<!-- In diesem Abschnitt wird das Beispiel eines einfachen Warteschlangensystems (Single-Server Queue) modelliert. -->

<div class="columns">
<div class="two">

## 5.2: Modellierung eines Warteschlangensystems

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

<!-- Dieser Abschnitt erläutert den "Next-Event Time Advance"-Algorithmus, der die Grundlage für die Simulation von diskreten Systemen bildet. -->

## 5.3: Simulationsalgorithmus

1.  **Initialisierung:** Startzustand und initiale Ereignisse festlegen.
2.  **Schleife:** Solange es zukünftige Ereignisse gibt:
    a.  **Ereignis auswählen:** Das Ereignis mit dem frühesten Zeitstempel aus der Ereignisliste (Event Queue) entnehmen.
    b.  **Uhr vorstellen:** Die Simulationsuhr auf den Zeitstempel dieses Ereignisses setzen.
    c.  **Ereignis behandeln:** Die Zustandsänderungen für das Ereignis durchführen und ggf. neue Ereignisse generieren und in die Ereignisliste einfügen.

![](../../Grafiken/Next-Event-Time-Advance.svg)

---

<!-- In diesem Abschnitt wird die C#-Implementierung des Simulationsalgorithmus und der Ereignisbehandlung gezeigt. -->

<div class="columns">
<div class="three">

## 5.4: Implementierung in C#

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

<!-- Dieser Abschnitt zeigt, wie die während der Simulation gesammelten Daten mit ScottPlot visualisiert werden können. -->

![bg contain right](../../Quellen/WS24/DynamischWarteschlange/Screenshot.png)

## 5.5: Analyse und Visualisierung

Während der Simulation werden Daten wie die Belegung der Station, die Länge der Warteschlange und die Wartezeiten der Kunden gesammelt.

```csharp
// Listen für die Visualisierung
public List<double> ChartTime = new List<double>();
public List<bool> ChartBusy = new List<bool>();
public List<int> ChartLength = new List<int>();
public List<double> WaitTime = new List<double>();
```

Nach dem Simulationslauf werden diese Daten verwendet, um Verläufe und Histogramme zu erstellen, z.B. mit der Bibliothek `ScottPlot`.

```csharp
// Beschäftigungsverlauf visualisieren
DiagramBusy.Plot.XLabel("Simulationszeit (in Sekunden)");
DiagramBusy.Plot.YLabel("Beschäftigung");
DiagramBusy.Plot.Add.Scatter(sim.ChartTime, sim.ChartBusy);

// Warteschlangenverlauf visualisieren
DiagramLength.Plot.XLabel("Simulationszeit (in Sekunden)");
DiagramLength.Plot.YLabel("Warteschlange");
DiagramLength.Plot.Add.Scatter(sim.ChartTime, sim.ChartLength);
```
