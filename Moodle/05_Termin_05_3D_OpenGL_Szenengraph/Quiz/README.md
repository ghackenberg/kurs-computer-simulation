# Quiz 02: 2D-Vektorgrafik, WPF Canvas, ScottPlot 5, Welford & MSAGL

**Quiz-ID:** `Quiz_02_Termin_05`  
**Export-XML:** `Export/Moodle/Quiz_02_Termin_05.xml`  
**Prüfungszeitpunkt:** Zu Beginn von Termin 05 (vor dem Theorie-Impuls zu Kapitel 05)  
**Stoffabgrenzung (Rückwärts-Kausalität):** Kapitel 03 (2D-Vektorgrafik & WPF Canvas) und Kapitel 04 (2D-Diagramme, ScottPlot 5, Welford & MSAGL)  
**Kausalitäts-Sperre:** KEIN 3D / OpenGL / SharpGL (Kapitel 05), keine 4x4-Matrizen, kein Gimbal Lock, kein Multithreading (Kapitel 06), keine FEM-Statik / Cholesky (Kapitel 07)!

---

## Übersicht der 10 Test-Varianten

| Datei | Status | Q1 (`cloze`, 2,0 P.) | Q2 (`numerical`, 1,5 P.) | Q3 (`numerical` Code, 1,5 P.) | Q4 (`gapselect` C#, 1,0 P.) | Q5 (`matching`/`ddwtos`, 1,0 P.) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [`Test_01_Vorbereitung.md`](./Test_01_Vorbereitung.md) | 🟢 Vorbereitung | Uniform Scaling $s$ & $Y_{\text{screen}}$ | Welford neuer Mittelwert $\mu_5$ | Ringpuffer physischer Array-Index | C# Pfeilspitzen-Geometrie im Screen Space | ScottPlot 5 Plottables zuordnen |
| [`Test_02_Vorbereitung.md`](./Test_02_Vorbereitung.md) | 🟢 Vorbereitung | Horizontaler Letterboxing-Offset & $X_{\text{screen}}$ | Welford $M_{2,k}$-Update berechnen | C#-Tracing: Hit-Testing Distanzquadrat | C# ScreenToWorld Transformation | 4 Phasen des Sugiyama-Algorithmus |
| [`Test_03_Vorbereitung.md`](./Test_03_Vorbereitung.md) | 🟢 Vorbereitung | Inverse Transformation $X_{\text{world}}$ & $Y_{\text{world}}$ | Obere $3\sigma$-Warngrenze aus $M_2$ | C#-Tracing: Gruppierte Balkenposition | C# Welford-Methode AddSample | Kap. 03/04 Klassen & Konzepte zuordnen |
| [`Test_04_Pruefung.md`](./Test_04_Pruefung.md) | 🔴 **Prüfung** | Vertikaler Letterboxing-Offset & $Y_{\text{screen}}$ | Empirische Stichprobenvarianz $s^2$ | C#-Tracing: BoxPlot IQR & Whisker-Grenze | C# Ringpuffer Push-Methode | Welford-Pipeline Reihenfolge |
| [`Test_05_Pruefung.md`](./Test_05_Pruefung.md) | 🔴 **Prüfung** | Skalierungsfaktor $s$ & Stablänge $L_{\text{screen}}$ | Zeitfenster-Dauer im DataStreamer | C#-Tracing: Maßlinien-Normalenversatz | C# MSAGL Layout berechnen | Transformations- & DIN-406-Größen zuordnen |
| [`Test_06_Pruefung.md`](./Test_06_Pruefung.md) | 🔴 **Prüfung** | DIN-406-Maßhilfslinie & Endpunkt $Y_{\text{ext}}$ | Volle Bandbreite $6\sigma$ des Toleranzbands | C#-Tracing: Ringpuffer nach Wrap-Around | C# ScottPlot 5 DataStreamer Setup | 4 Schritte der WorldToScreen-Pipeline |
| [`Test_07_Pruefung.md`](./Test_07_Pruefung.md) | 🔴 **Prüfung** | Transformation mit $x_{\min} < 0$ & $X_{\text{screen}}$ | Pfeilspitzen-Flügelkoordinate berechnen | C#-Tracing: Welford $M_2$ nach 3 Werten | C# SolidColorBrush Freeze() & Caching | Visuelle 2D-Bugs den Ursachen zuordnen |
| [`Test_08_Pruefung.md`](./Test_08_Pruefung.md) | 🔴 **Prüfung** | Maus-Dragging $\Delta X_{\text{world}}$ & $\Delta Y_{\text{world}}$ | Min/Max-Downsampling Datenpunkte pro Pixel | C#-Tracing: DIN-406-Winkelkorrektur | C# Hit-Testing FindNodeAtScreenPos | 4 Schritte der Echtzeit-Plot-Pipeline |
| [`Test_09_Pruefung.md`](./Test_09_Pruefung.md) | 🔴 **Prüfung** | Nutzbare Breite $W_{\text{eff}}$ & Maßstab $s$ | Untere $3\sigma$-Grenze (LCL) aus $M_2$ | C#-Tracing: Pfeilflügel X-Koordinate | C# ScottPlot HorizontalLine & Span | Statistische Kennzahlen (Kap. 04) zuordnen |
| [`Test_10_Pruefung.md`](./Test_10_Pruefung.md) | 🔴 **Prüfung** | Maßstab $s$ & wahre Länge $L_{\text{world}}$ | Welford $M_2$ aus Standardabweichung $s$ | C#-Tracing: Normalenvektor-Komponente | C# ScottPlot 5 Box-Objekt befüllen | WPF-Vektorgrafik-Eigenschaften zuordnen |
