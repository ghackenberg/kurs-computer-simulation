# Notizen Kapitel 9: Diskrete Dynamische Modelle & Simulation

- [x] AP-B5: Bedienzeiten auf die strikt positive Log-Normal-Verteilung ($T > 0$) umgestellt, um physikalische Kausalität und zeitliche Monotonie der `PriorityQueue` sicherzustellen.
- [x] AP-B5: Analytische Formeln zur Umrechnung von Soll-Mittelwert $m$ und Varianz $s^2$ in die Verteilungsparameter $\mu$ und $\sigma^2$ der Log-Normalverteilung auf den Folien integriert.
- [x] AP-B5: C#-Implementierung der Log-Normal-Generierung via Box-Muller dokumentiert.
- [x] AP-B5: Naive 2-Pass-Varianzberechnung durch den Welford-Online-Algorithmus (1962, numerisch stabile 1-Pass-Varianz) ersetzt.
- [x] AP-B5: Chan-Merge-Formel (1979) zur verlustfreien Kombination thread-lokaler Welford-Akkumulatoren in parallelen Monte-Carlo-Simulationen (`Parallel.For`) integriert.
- [x] AP-B5: Vollständige C#-Implementierung der Klasse `ParallelWelfordAccumulator` bereitgestellt.
