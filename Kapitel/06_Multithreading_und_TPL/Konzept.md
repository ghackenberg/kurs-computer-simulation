# Termin-Steckbrief T06: Multithreading, Task Parallel Library & Hardware-Effizienz

**Dokument-ID:** `Kapitel/06_Multithreading_und_TPL/Konzept.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](../../Konzept/01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](../../Konzept/02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](../../Konzept/03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte, Vorgreif-Sperre & Kapitel-Schnittstellen
- **Foliensatz:** [`Folien/Folien.md`](./Folien/Folien.md)
- **Übungsblatt & Vorlage:** [`Aufgabenblatt.md`](./Uebung/Aufgabenblatt.md) | **Moodle-Text:** [`Text.md`](./Moodle/Text.md) | [`MultithreadingBenchmark.sln`](./Uebung/Vorlage/MultithreadingBenchmark.sln)
- **Vorgreif-Sperre (Technologie-Stand T06):** TPL (`Parallel.For`, `Task.Run`), `Interlocked`, `lock`, `IProgress<T>`, `CancellationToken`, Amdahl. *Strikte Tabus:* Kein Math.NET Cholesky (erst T07).
- **Kapitel-Brücken & Quiz-Zuordnung:**
  - **Rückwärts ($\leftarrow$):** [`T02`](../02_Pixelgrafik_und_FDM/Konzept.md) (1D-Speicherlayout im RAM & 64-Byte-Cache-Lines) und [`T04`](../04_Telemetrie_und_ScottPlot/Konzept.md) (`ScottPlot 5` für Speedup-Plots).
  - **Vorwärts ($\to$):** [`T07`](../07_Statik_FEM_Cholesky/Konzept.md)–[`T10`](../10_Hybride_Dynamik_Synthese/Konzept.md) (Parallele Parameterstudien & Monte-Carlo-Replikationen via `Parallel.For` in [`T09`](../09_Diskrete_Systeme_DES/Konzept.md)).
  - **Geprüft in:** **Quiz 03** (zu Beginn von [`T08`](../08_DGL_und_SFunctions/Konzept.md), prüft Kap. 05–07).

## 2. Lernziele der Vorlesung (Bloom-Kaskade)
1. **Analysieren:** UI-Thread-Blockaden, Race Conditions (*Lost Updates*), Lock Contention und *False Sharing* auf 64-Byte-CPU-Cache-Lines diagnostizieren.
2. **Anwenden:** Asynchrone Worker-Auslagerung (`Task.Run`, `IProgress<T>`, kooperativer Abbruch) sowie deterministische Datenparallelität (`Parallel.For` mit Double-Buffering bzw. Thread-lokaler Reduktion) umsetzen.
3. **Evaluieren:** Multi-Core-Speedup $S(p)$ mit JIT-Warmup vermessen und über das Amdahlsche Gesetz den seriellen Programmanteil $1 - f_{\text{par}}$ bestimmen.

## 3. Zweistufige Hausübung (`Einheit 06`) & Showcase-Fokus
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Datenparallelen Partikelschritt (`StepParallel`) mit `Parallel.For` und `MaxDegreeOfParallelism` implementieren.
  - `1.2`: UI-Freeze durch Auslagerung in `Task.Run` mit gedrosseltem `IProgress<T>` und kooperativem `CancellationTokenSource` beheben.
  - `1.3`: Automatisierte Kernskalierungsreihe ($p = 1 \dots P_{\max}$) mit JIT-Warmup und Amdahl-Berechnung aufbauen.
  - `1.4`: Bitweise/numerische Übereinstimmung zwischen `StepSerial` und `StepParallel` via `dotnet test` nachweisen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – Parallele Monte-Carlo-Toleranzanalyse):** Maßkettenrechnung für $10^7$ Getriebewellen-Baugruppen (Box-Muller), Thread-lokale Reduktion vs. `Interlocked` vs. `lock` und Amdahl-Parameterfit für den seriellen Anteil $1 - f_{\text{par}}$.
  - **Track B (`B.1`–`B.4` – 100.000 Boids / Zombie-Horde):** Hochparalleler 2D-Schwarm-Benchmark mit strikter Read/Write-Puffertrennung (`stateRead` $\to$ `stateWrite`), Kernskalierung und experimentellem Nachweis von *False Sharing* (`long[p]` vs. `long[p * 16]`).
- **Showcase- & Code-Defense-Fokus (zu Beginn von T07):** Warum ist `new Random()` in parallelen Schleifen nicht thread-sicher? Warum bremst `lock` in der inneren Schleife auf $S < 1$ aus? Wie entsteht 64-Byte Cache-Line Ping-Pong (*False Sharing*)?
