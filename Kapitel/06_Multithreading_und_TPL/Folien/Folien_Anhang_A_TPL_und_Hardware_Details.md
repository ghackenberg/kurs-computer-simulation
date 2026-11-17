---
marp: true
theme: fhooe
paginate: true
math: mathjax
header: 'Kapitel 6 (Anhang A): TPL-Interna & Hardware-Effizienz'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _header: "" -->
<!-- _footer: "" -->
![bg](./Titelbild.jpg)

# Kapitel 6 (Anhang A): TPL-Interna & Hardware-Effizienz

## Cache-Kohärenz (MESI), Work-Stealing, Partitioner & Lock-freie Channels

Prof. Dr. Georg Hackenberg — FH Oberösterreich (Campus Wels)

---

### 1. Hardware-Realität: Cache-Lines & MESI-Kohärenz

Moderne Prozessoren (**Central Processing Unit, CPU**) tauschen Daten in **64-Byte-Cache-Lines** aus:

<div class="columns top">
<div class="three">

**Modified–Exclusive–Shared–Invalid (MESI):**
- Liest ein Kern eine Adresse, liegt die 64-Byte-Zeile **Shared** im L1-Cache.
- Schreibt Kern 0 auf `slots[0]` (`long`), invalidiert die Hardware die Zeile bei Kern 1 (**Invalid**).
- Schreibt Kern 1 auf `slots[1]` (selbe Zeile), entsteht **Cache-Ping-Pong** ($5\times$–$20\times$ Latenz).

</div>
<div class="three">

**Gegenstrategien:**
1. **Stack-lokal:** Thread zählt in `local` + `Interlocked.Add`.
2. **Padding (`Size = 64`):** Trennt Zähler auf eigene Cache-Lines:

```csharp
[StructLayout(LayoutKind.Explicit, Size = 64)]
struct PaddedCounter { [FieldOffset(0)] public long Value; }
```

</div>
</div>

> **Merksatz:** *False Sharing* entsteht durch geteilte physische 64-Byte-Cache-Lines unabhängiger Variablen.

---

### 1b. Thread-lokale Reduktion mit `Parallel.For`

Die **Task Parallel Library (TPL)** bietet eine **Thread-lokale Überladung** von `Parallel.For` für Map-Reduce-Schleifen:

<div class="columns top">
<div class="three">

```csharp
long totalHits = 0;

Parallel.For(
  fromInclusive: 0,
  toExclusive: totalSamples,
  localInit: () => 0L,
  body: (i, state, localHits) =>
    IsInsideCircle(i) ? localHits + 1 : localHits,
  localFinally: localHits =>
    Interlocked.Add(ref totalHits, localHits)
);
```

</div>
<div class="three">

**Ablauf der drei Delegaten:**
- **`localInit`:** Initialisiert einmal pro Worker-Task den privaten Stack-Akkumulator `0L`.
- **`body`:** Arbeitet sperrfrei auf `localHits` — kein geteilter Schreibzugriff, kein *False Sharing*.
- **`localFinally`:** Addiert am Ende einmal pro Partition über `Interlocked.Add(ref totalHits, localHits)`.

</div>
</div>

> **Praxis-Tipp:** Vermeidet manuelle Thread-Indizes und minimiert Synchronisationskosten bei Millionen Iterationen.

---

### 2. TPL-Interna: `ThreadPool`, Work-Stealing & Hill-Climbing

Warum skaliert `Parallel.For` besser als manuelles `new Thread(...)`?

<div class="columns top">
<div class="three">

**Zweistufige Warteschlangen:**
- **Globale Queue:** Externe `Task.Run`-Aufrufe landen in einer **First-In-First-Out-Warteschlange (FIFO)**.
- **Lokale Queues:** Kind-Tasks (`Parallel.For`) legt jeder Worker lokal **Last-In-First-Out (LIFO)** ab $\to$ maximale Cache-Lokalität.
- **Work-Stealing:** Läuft ein Worker leer, stiehlt er vom FIFO-Ende einer fremden Queue.

</div>
<div class="three">

**Adaptives *Hill-Climbing*:**
- Startet mit einem Thread pro logischem Kern (`Environment.ProcessorCount`).
- Blockiert ein Thread (z. B. I/O), injiziert der Pool bei stagnierendem Durchsatz gezielt Ersatz-Threads.
- Steigt die Kontextwechsel-Last durch zu viele Threads, drosselt der Pool die aktive Thread-Zahl automatisch.

</div>
</div>

> **Konsequenz:** Rechenkerne niemals mit `Thread.Sleep` blockieren — sonst startet der Pool neue Threads nach.

---

### 2b. Ungleichmäßige Lasten: `Partitioner.Create`

Bei **ungleichmäßigen Schleifenkosten** (z. B. Dreiecksmatrizen) bremst statisches Splitting durch langsame Chunks (*Straggler*):

<div class="columns top">
<div class="three">

```csharp
var rangePartitioner = Partitioner.Create(
  fromInclusive: 0,
  toExclusive: nodeCount,
  rangeSize: 256
);

Parallel.ForEach(rangePartitioner, range => {
  for (int i = range.Item1; i < range.Item2; i++) {
    UpdateAdaptiveNode(i);
  }
});
```

</div>
<div class="three">

**Wirkung von `rangePartitioner`:**
- **`rangeSize: 256`** zerlegt die Arbeit in dynamische Blöcke von `range.Item1` bis `range.Item2`.
- Schnelle Kerne holen weitere Blöcke nach, während langsame Kerne noch rechnen (**Lastausgleich**).
- Die innere `for`-Schleife bleibt direkt vom Just-In-Time-Compiler optimierbar.

</div>
</div>

> **Faustregel:** `rangeSize` so wählen, dass ein Block ca. $10\,\mu\text{s}$ bis $100\,\mu\text{s}$ Nutzarbeit umfasst.

---

### 3. Lock-freie Atomics: `CompareExchange` (CAS)

Für `double`-Werte (z. B. globales Maximum) gibt es kein `Interlocked.Add` — hier hilft **Compare-And-Swap (CAS)**:

<div class="columns top">
<div class="three">

**Optimistische Schleife:**
1. Aktuellen Wert `snapshot` atomar lesen (`Volatile.Read`).
2. Prüfen, ob `candidate` größer ist; sonst Abbruch.
3. `Interlocked.CompareExchange(ref target, next, snapshot)` schreibt `next` nur, wenn `target` unverändert ist — sonst Neustart.

</div>
<div class="three">

```csharp
static void AtomicMax(ref double target, double candidate) {
  double snapshot, next;
  do {
    snapshot = Volatile.Read(ref target);
    if (candidate <= snapshot) return;
    next = candidate;
  } while (Interlocked.CompareExchange(
             ref target, next, snapshot) != snapshot);
}
```

</div>
</div>

> **Wichtig:** `Volatile.Read` verhindert, dass der Wert in einem CPU-Register veraltet zwischengespeichert wird.

---

### 3b. Entkopplung mit `Channel<T>` (Producer–Consumer)

Für **hochfrequente Telemetrie-Pakete** zwischen Rechenthread und Auswertung bietet `.NET` den lock-freien `Channel<T>`:

<div class="columns top">
<div class="three">

```csharp
var channel = Channel.CreateBounded<TelemetryFrame>(
  new BoundedChannelOptions(capacity: 64) {
    FullMode = BoundedChannelFullMode.DropOldest,
    SingleWriter = true, SingleReader = true
  });

channel.Writer.TryWrite(new TelemetryFrame(t, energy));
await foreach (var f in channel.Reader.ReadAllAsync(ct))
  UpdateChart(f);
```

</div>
<div class="three">

**Vorteile gegenüber `ConcurrentQueue<T>`:**
- **`DropOldest`:** Verwirft bei langsamem **User Interface (UI)** alte Frames (*Backpressure*).
- **`SingleWriter / SingleReader`:** Aktiviert nahezu lock-freie Ringpuffer-Pfade.
- **`ReadAllAsync(ct)`:** Schläft ereignisgesteuert ohne Polling.

</div>
</div>

> **Brücke zu Kapitel 4 & 6:** `Channel<T>` vereint feste Ringpuffer-Größe (Kap. 4) mit `async`/`await`-Entkopplung (Kap. 6).
