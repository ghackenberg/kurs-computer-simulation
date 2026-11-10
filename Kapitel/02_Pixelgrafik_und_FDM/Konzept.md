# Termin-Steckbrief T02: 2D-Pixelgrafik & Feldsimulation (Finite Differenzen)

**Dokument-ID:** `Kapitel/02_Pixelgrafik_und_FDM/Konzept.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](../../Konzept/01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](../../Konzept/02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](../../Konzept/03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte, Vorgreif-Sperre & Kapitel-Schnittstellen
- **Foliensatz:** [`Folien/Folien.md`](./Folien/Folien.md)
- **Übungsblatt & Vorlage:** [`Aufgabenblatt.md`](./Uebung/Aufgabenblatt.md) | **Moodle-Text:** [`Text.md`](./Moodle/Text.md) | [`PixelHeatFDM.sln`](./Uebung/Vorlage/PixelHeatFDM.sln)
- **Vorgreif-Sperre (Technologie-Stand T02):** WPF `WriteableBitmap`, `unsafe`-Pointer, 2D-FDM. *Strikte Tabus:* Kein WPF Canvas, kein `ScottPlot`, kein `Parallel.For` (erst T06).
- **Kapitel-Brücken & Quiz-Zuordnung:**
  - **Rückwärts ($\leftarrow$):** [`T01`](../01_Kinematik_und_Euler/Konzept.md) (Zeitdiskrete Vorwärts-Integration $\Delta t$ auf 2D-Ortsgitter übertragen).
  - **Vorwärts ($\to$):** [`T06`](../06_Multithreading_und_TPL/Konzept.md) (1D-Speicherlayout `y * stride + x * 4` und 2D-Gitterschleifen als Referenz für `Parallel.For` & 64-Byte-Cache-Lines); [`T08`](../08_DGL_und_SFunctions/Konzept.md) (CFL-Stabilitätsgrenze $s \le 0{,}25$ bereitet Stabilitätsgebiete steifer ODEs vor).
  - **Geprüft in:** **Quiz 01** (zu Beginn von [`T03`](../03_Vektorgrafik_und_Canvas/Konzept.md), prüft Kap. 00–02).

## 2. Lernziele der Vorlesung (Bloom-Kaskade)
1. **Verstehen:** Speicherlinearisierung (`index = y * stride + x * 4`), `Bgra32`-Farbkanäle und den 5-Punkt-Laplace-Differenzenstern inkl. Von-Neumann-Stabilitätsgrenze ($s = \frac{\alpha \Delta t}{\Delta x^2} \le 0{,}25$).
2. **Anwenden:** Allokationsfreies Direct-Pixel-Writing via `WriteableBitmap.Lock()`, `BackBuffer`, 256-Stufen-LUT und Double-Buffering (`_tCurrent` $\leftrightarrow$ `_tNext`) umsetzen.
3. **Erschaffen & Evaluieren:** Ortsabhängige Mehrzonen-Wärmeleitung mit Dirichlet-, Neumann- und konvektiven Robin-Randbedingungen bzw. zellulärer Partikelphysik simulieren und die Schachbrett-Instabilität bei $s > 0{,}25$ nachweisen.

## 3. Zweistufige Hausübung (`Einheit 02`) & Showcase-Fokus
- **Stufe 1 – Basisaufgabe (`1.1`–`1.4`):**
  - `1.1`: Vorberechnete 256-Stufen-Farbtabelle (`ThermalColorMap`, Blau $\to$ Cyan $\to$ Grün $\to$ Gelb $\to$ Rot) für $\mathcal{O}(1)$-Lookup aufbauen.
  - `1.2`: Ortsabhängiges Temperaturleitfähigkeits-Gitter (`AlphaMap`) mit adiabaten Neumann-Spiegelungen an Isolator-Hindernissen ($\alpha = 0$) im 5-Punkt-Stern umsetzen.
  - `1.3`: Interaktives Maus-Zeichnen von Wärmequellen und Isolatorwänden über `WriteableBitmap.Lock()` und `BackBuffer` anbinden.
  - `1.4`: Stationäre Wärmebilanz und LUT-Zuordnung mit `dotnet test` prüfen.
- **Stufe 2 – Wahlmodell (10 Pkt.):**
  - **Track A (`A.1`–`A.4` – CPU-Kühlkörper-Optimierung):** Mehrzonen-Gitter (Silizium-Chip, Kupfer-Heatspreader, Alu-Finne), konvektive Robin-Randbedingung am oberen Rand (Lüfter Aus vs. Ein) und experimenteller Nachweis der Schachbrett-Explosion bei $s > 0{,}25$.
  - **Track B (`B.1`–`B.4` – Falling Sand & Doom Fire / Lava):** Zelluläre Partikel-Physik (Sand-Böschung, Wasser-Verdampfung bei $100\,^\circ\text{C}$, Lava-Wärmequellen) gekoppelt mit aufsteigender Konvektionsglut im FDM-Temperaturfeld.
- **Showcase- & Code-Defense-Fokus (zu Beginn von T03):** Live-Stresstest mit $s = 0{,}28 > 0{,}25$ (echte Schachbrett-Oszillation vs. künstliches `Math.Clamp`), Stride-Berechnung (`width * 4`) und Double-Buffering (`_tCurrent` $\leftrightarrow$ `_tNext`).
