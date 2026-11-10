# Termin-Steckbrief T04: Echtzeit-Telemetrie, Ringpuffer & Signalflussgraphen

**Dokument-ID:** `Kapitel/04_Telemetrie_und_ScottPlot/Konzept.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](../../Konzept/01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](../../Konzept/02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](../../Konzept/03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte, Vorgreif-Sperre & Kapitel-Schnittstellen
- **Foliensatz:** [`Folien/Folien.md`](./Folien/Folien.md)
- **Übungsblatt & Vorlage:** [`Aufgabenblatt.md`](./Uebung/Aufgabenblatt.md) | **Moodle-Text:** [`Text.md`](./Moodle/Text.md) | [`ScottPlotTelemetry.sln`](./Uebung/Vorlage/ScottPlotTelemetry.sln)
- **Vorgreif-Sperre (Technologie-Stand T04):** `ScottPlot 5`, `CircularBuffer<T>`, Welford-Statistik, `MSAGL`, MVVM. *Strikte Tabus:* Kein SharpGL 3D, kein Multithreading, kein RK4.
- **Kapitel-Brücken & Quiz-Zuordnung:**
  - **Vorwärts ($\to$):** [`T06`](../06_Multithreading_und_TPL/Konzept.md), [`T08`](../08_DGL_und_SFunctions/Konzept.md), [`T09`](../09_Diskrete_Systeme_DES/Konzept.md) & [`T10`](../10_Hybride_Dynamik_Synthese/Konzept.md) (`ScottPlot 5` als Standard-Plotter); [`T09`](../09_Diskrete_Systeme_DES/Konzept.md) (Welford-Online-Varianz $\mu, \sigma$ für Monte-Carlo-Konfidenz); [`T05`](../05_3D_OpenGL_Szenengraph/Konzept.md), [`T09`](../09_Diskrete_Systeme_DES/Konzept.md) & [`T10`](../10_Hybride_Dynamik_Synthese/Konzept.md) (`MSAGL`-Graphen als mentales Modell für Szenengraphen, Warteschlangennetze und hybride Statecharts).
  - **Geprüft in:** **Quiz 02** (zu Beginn von [`T05`](../05_3D_OpenGL_Szenengraph/Konzept.md), prüft Kap. 03–04).

## 2. Lernziele der Vorlesung (Bloom-Kaskade)
1. **Verstehen:** Warum Heap-Allokationen im Render-Timer zu GC-Rucklern führen, wie ein Ringpuffer (`Head`/`Tail` modulo Kapazität) in $\mathcal{O}(1)$ arbeitet und warum der Welford-Algorithmus numerische Auslöschung vermeidet.
2. **Anwenden:** Allokationsfreies 50-Hz-Streaming in `ScottPlot 5` (`Plot.Add.Signal`), `CircularBuffer.CopyTo` sowie gleitende Mittelwert-/$\pm 3\sigma$-Toleranzbänder implementieren.
3. **Erschaffen:** Ein mehrkanaliges Industrie-4.0- bzw. Racing-Telemetrie-Dashboard inklusive gekoppeltem `MSAGL`-Topologiegraphen entwerfen.

## 3. Zweistufige Hausübung (`Einheit 04`) & Showcase-Fokus
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Allokationsfreies `CircularBuffer<T>.CopyTo(T[] destination)` in chronologischer Reihenfolge implementieren.
  - `1.2`: Numerisch stabile Online-Varianz nach B. P. Welford (`WelfordStatistics.Add`) vervollständigen.
  - `1.3`: GC-Memory-Leak im 50-Hz-Render-Timer beheben (einmaliges `Plot.Add.Signal` im Konstruktor statt `Plot.Clear()` + Neuallokation pro Frame).
  - `1.4`: Dynamische $\pm 3\sigma$-Toleranzlinien im Plot nachführen und Ringpuffer-/Welford-Tests (`dotnet test`) bestehen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – 1-kHz-Vibrationsmonitoring & Industrie-4.0-Leitstand):** Synchronisierte Mehrkanal-Telemetrie (Schwingung, Temperatur, Strom), entprellte $+3\sigma$-Anomalie-Erkennung mit Alarm-Log und `MSAGL`-Anlagentopologie mit roter Knoten-Hervorhebung im Fehlerfall.
  - **Track B (`B.1`–`B.4` – Retro Arcade Racing Telemetry):** Live-Geschwindigkeits-/RPM-Signalplot, 2D-G-Force-Phasenplot (Kamm'scher Traktionskreis $1{,}2\,g$), Welford-Rundenzeitstatistik und `MSAGL`-Rennstreckengraph mit Sektor-Tracking.
- **Showcase- & Code-Defense-Fokus (zu Beginn von T05):** 0-Byte-Allokationsprüfung im Render-Timer, numerische Auslöschung bei naiver Varianzformel vs. Welford, ScottPlot-5-API vs. veraltete v4-Syntax.
