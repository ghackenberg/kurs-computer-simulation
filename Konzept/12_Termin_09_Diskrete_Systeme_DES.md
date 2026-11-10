# Termin-Steckbrief T09: Diskrete Dynamische Systeme: Ereignissimulation (DES) & Monte-Carlo

**Dokument-ID:** `Konzept/12_Termin_09_Diskrete_Systeme_DES.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](./01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](./02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](./03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte, Vorgreif-Sperre & Kapitel-Schnittstellen
- **Foliensatz:** [`09_Dynamische_Modelle_Diskret/Folien.md`](../Folien/09_Dynamische_Modelle_Diskret/Folien.md)
- **Übungsblatt & Vorlage:** [`Aufgabenblatt.md`](../Uebungen/Termin_09_Diskrete_Systeme_DES/Aufgabenblatt.md) | [`DiscreteEventSimulation.sln`](../Uebungen/Termin_09_Diskrete_Systeme_DES/Vorlage/DiscreteEventSimulation.sln)
- **Vorgreif-Sperre (Technologie-Stand T09):** `PriorityQueue<TEvent, double>`, Next-Event-Time-Advance, Inversionsmethode, Box-Muller, Little's Gesetz. *Strikte Tabus:* Noch keine hybride Zero-Crossing-Bisektion (erst T10).
- **Kapitel-Brücken & Quiz-Zuordnung:**
  - **Rückwärts ($\leftarrow$):** [`T04`](./07_Termin_04_Telemetrie_und_ScottPlot.md) (Welford-Online-Varianz für Konfidenzintervalle, `MSAGL` & `ScottPlot 5`) sowie [`T06`](./09_Termin_06_Multithreading_und_TPL.md) (`Parallel.For` für parallele Monte-Carlo-Replikationen).
  - **Vorwärts ($\to$):** [`T10`](./13_Termin_10_Hybride_Dynamik_Synthese.md) (Diskrete Zustandsübergänge / Events verschmelzen mit den kontinuierlichen ODEs aus [`T08`](./11_Termin_08_DGL_und_SFunctions.md)).
  - **Geprüft in:** **Quiz 04** (zu Beginn von [`T10`](./13_Termin_10_Hybride_Dynamik_Synthese.md), prüft Kap. 08–09).

## 2. Lernziele der Vorlesung (Bloom-Kaskade)
1. **Verstehen:** Ereignisgesteuerter Zeitsprung ($t \leftarrow t_{\text{next}}$) statt Festschritt-Polling, Kendall-Notation ($M/M/c/K$), zeitgewichtetes Flächenintegral $\frac{1}{T}\int_0^T N(t)\,\mathrm{d}t$ und Little's Gesetz ($\bar{L} = \lambda_{\text{eff}}\bar{W}$ mit $\lambda_{\text{eff}} = \lambda(1 - P_{\text{Block}})$).
2. **Anwenden:** Zufallszahlenerzeugung via Inversionsmethode ($-\frac{1}{\lambda}\ln(1-U)$) und Box-Muller sowie parallele Monte-Carlo-Replikationen mit Welford-Konfidenzintervallen implementieren.
3. **Erschaffen & Evaluieren:** Eine industrielle Lackierstraße ($M/M/c/K$) bzw. einen Freizeitpark mit VIP-Fastpass-Prioritäten zur Engpass- und Pufferdimensionierung simulieren.

## 3. Zweistufige Hausübung (`Einheit 09`) & Showcase-Fokus
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Endliche Pufferkapazität $K$, Abweisungsrate $P_{\text{Block}}$ und effektiven Durchsatz $\lambda_{\text{eff}} = \lambda(1 - P_{\text{Block}})$ in der Future-Event-List-Simulation (`PriorityQueue`) ergänzen.
  - `1.2`: Zeitgewichtetes Flächenintegral `areaUnderL += numberInSystem * (ev.Timestamp - lastEventTime)` für $\bar{L}$ nachführen.
  - `1.3`: Log-Normal-Bedienzeiten via Box-Muller-Transformation und parallele Monte-Carlo-Replikationen (`Parallel.For`) einbinden.
  - `1.4`: Little's Gesetz ($\bar{L} = \lambda_{\text{eff}}\bar{W}$ auf $< 10^{-9}$) und $M/M/1$-Grenzfall ($\bar{L} = \frac{\rho}{1-\rho}$) via `dotnet test` verifizieren.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – Automobil-Lackierstraße $M/M/c/K$):** Mehrkanal-Abfertigung ($c$ Kabinen, Puffer $K$), Auslegungsstudie für $P_{\text{Block}} < 1\,\%$ und $\bar{W}_q < 6\,\text{min}$ inklusive Nachweis von Little's Gesetz.
  - **Track B (`B.1`–`B.4` – Theme Park Rush / Rollercoaster Queue):** Freizeitpark-Station mit Non-Preemptive Priority Queuing (VIP-Fastpass vs. Normal-Ticket), getrennter Wartezeitstatistik und Monte-Carlo-Sensitivitätsstudie über den VIP-Anteil.
- **Showcase- & Code-Defense-Fokus (zu Beginn von T10):** Warum liefert das ungewichtete Mittel über die Event-Zeitpunkte ein falsches $\bar{L}$? Was passiert im Live-Stresstest, wenn $\lambda \to c\mu$ ($\rho \to 1$) gesetzt wird?
