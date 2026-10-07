# Notizen zu Kapitel 2: 2D-Visualisierung (WPF/Pixel)

## Status & Abgeschlossene Punkte
- [x] Vektorgrafik `Speicherlayout_Stride.svg` für 2D-Pixelraster, Zeilenschrittweite (Stride) und 1D-RAM-Abbildung erstellt.
- [x] Titelbild `Titelbild.jpg` mit KI generiert und eingebunden (Thermal Analyzer / Digitaler Zwilling).
- [x] Abschnitt 2.1 vertieft: Bgra32 Little-Endian Farbmodell, mathematische Adressrechnung, Cache-Lokalität.
- [x] Abschnitt 2.2 vertieft: Visual-Tree-Grenzen, BackBuffer/FrontBuffer-Architektur, XAML NearestNeighbor-Filterung.
- [x] Abschnitt 2.3 vertieft: Lock/Unlock-Lebenszyklus, Pointerzugriff mit `unsafe`, 32-Bit Wortschreiben (`uint*`), Multithreading mit `Parallel.For`.
- [x] Abschnitt 2.4 erweitert: Look-Up-Tables (LUT) für kontinuierliche Skalarfelder, Viridis & Cool-Warm Paletten.
- [x] Neuer Abschnitt 2.5: Vollständige 2D-Wärmeleitungsgleichung mit Finiten Differenzen (5-Punkt-Stern), Von-Neumann-Stabilitätsanalyse ($s \le 0{,}25$, diskretes Maximumprinzip) und Einbindung der Heatmap-Visualisierung (`Heatmap_Temperaturfeld.png`).

## Vorlesungs- und Übungshinweise
- **Live-Coding:** Den Unterschied zwischen `Image`-Control mit `WriteableBitmap` und 10.000 `Rectangle`-Objekten im Canvas im Profiler (Visual Studio Diagnostics Tool / FPS-Anzeige) demonstrieren.
- **Speicherzugriff:** Zeigen, was passiert, wenn Schleifen vertauscht werden (`x` außen, `y` innen) bezüglich CPU Cache-Misses.
- **Von-Neumann-Stabilität & Diskretes Maximumprinzip:** Im Simulationsbeispiel den Zeitschritt $\Delta t$ testweise über das Stabilitätslimit ($s > 0{,}25$) heben, um die dramatische numerische Divergenz (Schachbrettmuster/Explosion) live zu visualisieren. Didaktisch abgrenzen gegenüber der CFL-Bedingung hyperbolischer Systeme.
