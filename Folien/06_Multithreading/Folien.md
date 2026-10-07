---
marp: true
theme: fhooe
header: 'Kapitel 6: Multithreading & Parallele Simulation'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

# Kapitel 6: Multithreading & Parallele Simulation

Dieses Kapitel umfasst die folgenden Abschnitte:

- 6.1: Grundlagen: Prozesse, Threads & Parallelität
- 6.2: Task Parallel Library (`Parallel.For` & `Parallel.ForEach`)
- 6.3: Threadsichere Datenstrukturen (`ConcurrentBag<T>`)
- 6.4: Synchronisation & Race Conditions (`lock`)
- 6.5: Parallele Zufallszahlen & thread-lokale Zustände

---

## 6.1: Grundlagen: Prozesse, Threads & Parallelität

Dieser Abschnitt umfasst die folgenden Inhalte:

- Motivation: Auslastung moderner Mehrkern-Prozessoren
- Unterschied: Prozess vs. Thread
- Nebenläufigkeit (Concurrency) vs. echte Parallelität

---

### Warum Multithreading in der Simulation?

- Physikalische Simulationen und stochastische Verfahren (z.B. Monte-Carlo) erfordern oft Milliarden Rechenoperationen.
- Die Taktfrequenzen einzelner CPU-Kerne stagnieren seit Jahren (Physical Scaling Wall); Leistungszuwachs erfolgt primär über **mehr Kerne**.
- **Sequentieller Code** nutzt auf einer 16-Core-CPU nur $\approx 6{,}25\,\%$ der verfügbaren Rechenkapazität.
- Durch Parallelisierung können unabhängige Simulationsläufe (z.B. Parameterschwankungen, Replikationen) zeitgleich auf allen Kernen berechnet werden (**"Embarrassingly Parallel"**).

---

### Prozess vs. Thread

<div class="columns top">
<div class="one">

**Prozess (Process)**
- Eine isolierte Programminstanz des Betriebssystems.
- Eigener, geschützter virtueller Adressraum.
- Kommunikation zwischen Prozessen (IPC) erfordert Serialisierung und OS-Overhead.

</div>
<div class="one">

**Thread (Leichtgewichtiger Faden)**
- Die kleinste Ausführungseinheit innerhalb eines Prozesses.
- Alle Threads eines Prozesses **teilen sich denselben Adressraum** (Heap, globale Variablen).
- Schnelle Kommunikation, aber hohes Risiko für Datenkonflikte.

</div>
</div>

---

### Nebenläufigkeit vs. Echte Parallelität

<div class="columns top">
<div class="one">

**Nebenläufigkeit (Concurrency)**
- Mehrere Aufgaben sind logisch im Gange und teilen sich Rechenzeit (z.B. per Zeitscheiben-Scheduling auf 1 CPU-Kern).
- Strukturierungsprinzip für responsive UIs und asynchrone I/O.

</div>
<div class="one">

**Parallelität (True Parallelism)**
- Mehrere Aufgaben werden **zur exakt gleichen physikalischen Zeit** auf verschiedenen CPU-Kernen ausgeführt.
- Rechenbeschleunigung für mathematische Berechnungen und Simulationen.

</div>
</div>

---

## 6.2: Task Parallel Library (`Parallel.For` & `Parallel.ForEach`)

Dieser Abschnitt umfasst die folgenden Inhalte:

- Die Task Parallel Library (TPL) in .NET
- Parallelisierung von Zählschleifen mit `Parallel.For`
- Partitionierung und Lastverteilung durch den ThreadPool

---

### Die Task Parallel Library (TPL)

`Parallel.For` ist eine Methode aus dem Namespace `System.Threading.Tasks`, die eine Standard-`for`-Schleife automatisch parallelisiert:

- Die TPL teilt den Iterationsbereich in Chunks auf und verteilt sie über den internen **.NET ThreadPool** auf alle verfügbaren Kerne.
- Der Schleifenkörper wird als Lambda-Ausdruck übergeben.

<div class="columns">
<div>

**Sequentiell:**
```csharp
for (int i = 0; i < 100; i++)
{
    DoSimulation(i);
}
```

</div>
<div>

**Parallel:**
```csharp
Parallel.For(0, 100, i =>
{
    DoSimulation(i);
});
```

</div>
</div>

---

## 6.3: Threadsichere Datenstrukturen (`ConcurrentBag<T>`)

Dieser Abschnitt umfasst die folgenden Inhalte:

- Das Problem ungeschützter Collections (`List<T>`)
- Datenkorruption bei gleichzeitigem Schreibzugriff
- Threadsichere Alternativen aus `System.Collections.Concurrent`

---

### Threadsichere Sammlungen: `ConcurrentBag<T>`

Wenn mehrere Threads gleichzeitig auf eine Standard-Collection wie `List<T>` schreibend zugreifen, führt dies unweigerlich zu Ausnahmen oder unbemerktem Datenverlust.

- **`ConcurrentBag<T>`** ist eine threadsichere, ungeordnete Sammlung für Szenarien, bei denen die Reihenfolge der Ergebnisse unwichtig ist.
- Erlaubt paralleles Hinzufügen ohne manuelle Sperren.

<div class="columns">
<div>

**Nicht threadsicher (Gefahr!):**
```csharp
var list = new List<double>();

// Führt zu Fehlern/Datenverlust!
Parallel.For(0, 1000, i =>
{
    list.Add(Compute(i));
});
```

</div>
<div>

**Threadsicher (Korrekt):**
```csharp
var bag = new ConcurrentBag<double>();

// Sicher und hochperformant!
Parallel.For(0, 1000, i =>
{
    bag.Add(Compute(i));
});
```

</div>
</div>

---

## 6.4: Synchronisation & Race Conditions (`lock`)

Dieser Abschnitt umfasst die folgenden Inhalte:

- Was ist eine Race Condition?
- Nicht-atomare Operationen (z.B. `counter++`)
- Das `lock`-Statement und gegenseitiger Ausschluss (Mutual Exclusion)

---

### Was ist eine Race Condition?

Eine **Race Condition** (Wettlaufsituation) tritt auf, wenn mehrere Threads gleichzeitig auf geteilte Daten zugreifen und mindestens ein Thread schreibend zugreift:

- Das Endergebnis hängt von der unvorhersehbaren Reihenfolge des Betriebssystem-Schedulers ab.
- **Konsequenzen:** Sporadische Fehler, falsche Simulationsergebnisse, extrem schwer reproduzierbare Bugs.
- Schon einfache Operationen wie `counter++` sind in Maschinensprache **drei Einzelschritte** (Read-Modify-Write) und können jederzeit unterbrochen werden!

---

### Code-Beispiel: Race Condition & `lock`

<div class="columns top">
<div>

**Fehlerhaft (ohne `lock`):**
```csharp
int counter = 0;

Parallel.For(0, 10000, _ =>
{
    // Mehrere Threads überschreiben
    // sich gegenseitig beim Inkrement!
    counter++; 
});

// Erwartet: 10000
// Ergebnis: z.B. 7842 (falsch!)
Console.WriteLine(counter);
```

</div>
<div>

**Korrekt (mit `lock`):**
```csharp
int counter = 0;
object sync = new object();

Parallel.For(0, 10000, _ =>
{
    lock (sync) // Kritischer Abschnitt
    {
        counter++;
    }
});

// Ergebnis: 10000 (exakt!)
Console.WriteLine(counter);
```

</div>
</div>

---

## 6.5: Parallele Zufallszahlen & thread-lokale Zustände

Dieser Abschnitt umfasst die folgenden Inhalte:

- Gefahren geteilter Zufallsgeneratoren (`System.Random`)
- Reproduzierbarkeit und Seed-Management
- Thread-lokale Instanziierung

---

### Threadsicherheit von `System.Random`

Die Klasse `System.Random` ist **nicht threadsicher**:
- Greifen mehrere Threads gleichzeitig auf dieselbe Instanz zu, korrumpiert der interne Zustand $\to$ es werden nur noch Nullen oder identische Folgen geliefert.
- **Lösung:** Jeder Thread (bzw. jede Iteration) benötigt eine eigene Instanz mit einem **eindeutigen Seed**!

```csharp
Parallel.For(0, numberOfRuns, i =>
{
    // Eindeutiger Seed garantiert unabhängige, reproduzierbare Zufallsfolgen
    var localRandom = new Random(seed: i);

    double result = RunSingleSimulation(localRandom);
    results.Add(result);
});
```

---

# Zusammenfassung Kapitel 6

- Multithreading ist der Schlüssel zur vollen Auslastung moderner Mehrkern-CPUs bei rechenintensiven Simulationen.
- Die **Task Parallel Library (TPL)** mit `Parallel.For` abstrahiert das manuelle Thread-Management.
- **Race Conditions** entstehen beim gleichzeitigen Schreiben auf geteilte Ressourcen; sie lassen sich durch `lock` (gegenseitigen Ausschluss) verhindern.
- **`ConcurrentBag<T>`** bietet eine threadsichere Lösung zum Sammeln paralleler Simulationsergebnisse.
- Zufallszahlengeneratoren (`System.Random`) müssen strikt thread-lokal und mit individuellem Seed betrieben werden, um Korruption zu vermeiden und Reproduzierbarkeit zu wahren.
