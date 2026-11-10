# Quiz 01 (Termin 03) – Grundlagen, Digitaler Zwilling & 2D-Pixelgrafik

**Quiz-ID:** `Quiz_01_Termin_03`  
**Export-XML:** `./Quiz_01_Termin_03.xml`  
**Prüfungszeitpunkt:** Termin 03  
**Stoffabgrenzung (Rückwärts-Kausalität):** Kapitel 00 (Prolog), Kapitel 01 (Einführung, Digitaler Zwilling & Expliziter Euler), Kapitel 02 (2D-Pixelgrafik & FDM-Wärmeraster)  
**Kausalitäts-Sperre:** Kein WPF Canvas / Vektorgrafik (Kap. 03), kein ScottPlot (Kap. 04), kein 3D / SharpGL (Kap. 05), kein TPL (Kap. 06), kein Cholesky (Kap. 07), kein RK4 (Kap. 08)!

---

## Übersicht der 10 Test-Varianten

| Datei | Status | Q1 (`cloze`, 2,0 P.) | Q2 (`numerical`, 1,5 P.) | Q3 (`numerical` Code, 1,5 P.) | Q4 (`gapselect` C#, 1,0 P.) | Q5 (`matching`/`ddwtos`, 1,0 P.) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [`Test_01_Vorbereitung.md`](./Test_01_Vorbereitung.md) | 🟢 Vorbereitung | CFL $\Delta t_{\max}$ & Schritte ($\Delta x=2$ mm) | Euler-Höhe $y_1$ nach 1 Schritt | `Bgra32` Byte-Index (`x=5, y=3`) | 5-Punkt-Stern mit `Array.Copy` | Stachowiak-Merkmale & Kritzinger |
| [`Test_02_Vorbereitung.md`](./Test_02_Vorbereitung.md) | 🟢 Vorbereitung | Fourier-Zahl $s$ & neue Temperatur $T_{i,j}^{n+1}$ | Interpolierter Auftreffzeitpunkt $t_{\text{impact}}$ | `uint` Bit-Shift Farbkanal-Extraktion | `unsafe` Pointer-Zugriff auf `BackBuffer` | `WriteableBitmap` Update-Pipeline (`Lock`..`Unlock`) |
| [`Test_03_Vorbereitung.md`](./Test_03_Vorbereitung.md) | 🟢 Vorbereitung | `BackBufferStride` & Speicherbedarf in KiB | Heun-Korrektorschritt (RK2) bei Abkühlung | Farbkanal-Interpolation `Lerp` bei $T=45^\circ\text{C}$ | Boden-Reflexion mit Interpolation $\tau$ | Randbedingungen (Dirichlet, Neumann, Robin) |
| [`Test_04_Pruefung.md`](./Test_04_Pruefung.md) | 🔴 **Prüfung** | Minimales $\Delta x_{\min}$ & Gitterknoten $N_{\text{total}}$ | Euler-Höhe $y_2$ nach 2 Zeitschritten | Code-Tracing 5-Punkt-Stern (`T_next[1, 1]`) | Heun-Verfahren (RK2) in C# | Ablaufkette Heun-Prädiktor-Korrektor |
| [`Test_05_Pruefung.md`](./Test_05_Pruefung.md) | 🔴 **Prüfung** | `BackBufferStride` mit 64-Byte-Padding & Puffergröße | Betrag des globalen Fehlers $|y_{\text{Euler}} - y_{\text{exakt}}|$ | Code-Tracing Euler-Schleife (`3` Iterationen) | Randbedingungen im 2D-Array setzen | Zuordnung System-Taxonomie (Beispiele) |
| [`Test_06_Pruefung.md`](./Test_06_Pruefung.md) | 🔴 **Prüfung** | 5-Punkt-Stern bei $s=0{,}25$ & Gleichgewicht | Rücksprunggeschwindigkeit $v_{\text{after}} = -e \cdot v_{\text{impact}}$ | Rückrechnung Spalte `x` aus Byte-Offset `idx` | Bit-Shifting `uint` Packen (`Bgra32`) | Ablaufkette 2D-FDM-Simulationsschritt |
| [`Test_07_Pruefung.md`](./Test_07_Pruefung.md) | 🔴 **Prüfung** | Rückrechnung $\alpha$ aus $s$ & $\Delta t_{\max}$ | Euler-Zustand $v_2$ eines PT1-Glieds nach 2 Schritten | Code-Tracing Neumann-Rand + 5-Punkt-Stern | `WriteableBitmap` Methodenrahmen (`Lock`, `AddDirtyRect`, `Unlock`) | Zuordnung Numerik-Begriffe (Euler, Heun, CFL, Symplektisch) |
| [`Test_08_Pruefung.md`](./Test_08_Pruefung.md) | 🔴 **Prüfung** | Halbierung von $\Delta x$ $\to$ neues $\Delta t_{\max}$ & Schritte | Steigflug-Höhe $y_2$ nach 2 Euler-Schritten | `uint*` Index-Berechnung aus `BackBufferStride` | Falschfarben-Mapping mit `Math.Clamp` | Ablaufkette Sub-Step-Bodenreflexion |
| [`Test_09_Pruefung.md`](./Test_09_Pruefung.md) | 🔴 **Prüfung** | Neumann-Rand + 5-Punkt-Stern-Temperatur $T_{1,1}^{n+1}$ | Relativer Kollisionsfaktor $\tau = y_n / (y_n - y_{n+1})$ | 1D-Index des unteren Nachbarn `(y + 1) * nx + x` | Berechnung von `dtMax` und `s` in C# | Zuordnung `WriteableBitmap`-API (`BackBuffer`, `Stride`, `DirtyRect`) |
| [`Test_10_Pruefung.md`](./Test_10_Pruefung.md) | 🔴 **Prüfung** | Anzahl Knoten-Updates pro Sekunde & Echtzeitbudget | Heun-Ortsupdate $y_1$ beim freien Fall aus Ruhe | `uint` Bit-Shifting `>> 16` für Rot-Kanal | Semi-impliziter Euler in C# | Modellierungs- & Simulations-Workflow |
