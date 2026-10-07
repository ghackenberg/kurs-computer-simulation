# Notizen zu Kapitel 8: Kontinuierliche Dynamische Modelle

## Didaktische Leitlinien & Numerische Schwerpunkte

### 1. Ballwurf & Euler-Cromer (Semi-Implizit)
- **Terminologie:** Die Vorschrift, erst die Geschwindigkeit $v_{k+1} = v_k - h g$ und damit den Ort $y_{k+1} = y_k + h v_{k+1}$ zu berechnen, ist der *semi-implizite Euler* (Euler-Cromer).
- **Symplektizität:** Erkläre den Studierenden anhand der Jacobi-Matrix $\mathbf{J}$, dass $\det(\mathbf{J}) \equiv 1$ gilt. Die Fläche im Phasenraum bleibt exakt erhalten (Liouville-Theorem). Oszillatoren schaukeln weder auf (wie beim expliziten Euler mit $\det > 1$), noch werden sie künstlich gedämpft (wie beim echten impliziten Euler mit $\det < 1$).
- **Gekoppelte Systeme:** Betone, dass Euler-Cromer beim freien Fall nur deshalb ohne Gleichungslösen auskommt, weil $\dot{v} = -g$ nicht von $y$ abhängt. Beim Federpendel hingegen koppeln Ort und Geschwindigkeit wechselseitig.

### 2. Banach-Fixpunktiteration (Picard-Iteration) im `EulerImplicitSolver`
- **Abgrenzung zu Newton:** Im Vorlesungsframework wird *keine* Jacobi-Matrix aufgestellt und kein lineares Gleichungssystem gelöst. Stattdessen wird eine sukzessive Fixpunktiteration mit Relaxationsfaktor $\alpha = 0{,}1$ ausgeführt:
  $$\dot{x}^{(m+1)} = \dot{x}^{(m)} + \alpha \cdot (f(t_{k+1}, x^{(m)}) - \dot{x}^{(m)})$$
- **Konvergenzkriterium:** Nach dem Banachschen Fixpunktsatz konvergiert die Iteration genau dann, wenn $L \cdot h < 1$ gilt (Kontraktion).
- **Industrie-Praxis:** Für stark nichtlineare oder hochgradig steife Kennlinien (z.B. Halbleiterdioden, Kontaktmechanik) wird Newton-Raphson benötigt, da Picard-Iterationen dort zu langsam konvergieren oder oszillieren.

### 3. Mehrstufenverfahren: Heun (RK2) & Runge-Kutta 4 (RK4)
- **Didaktischer Pfad:** Vom Prädiktor-Korrektor-Gedanken (Heun) über das Butcher-Tableau als kompakte Matrix-Notation bis zum klassischen 4-Stufen-Verfahren RK4.
- **Simpson-Regel:** RK4 entspricht der Simpson-Quadratur $\frac{1}{6}(1 + 2 + 2 + 1)$ für das Integral über das Zeitschritt-Intervall.
- **Stabilität auf der Imaginärachse:**
  - Expliziter Euler und Heun schließen die Imaginärachse $\lambda = \pm i\omega_0$ für $\beta > 0$ *nicht* ein $\implies$ ungedämpfte Schwinger schaukeln sich zwingend auf!
  - Erst RK4 umschließt ein Segment der Imaginärachse bis $|\beta| \le 2\sqrt{2} \approx 2{,}828$. Für $h \le 2{,}828 / \omega_0$ ist die Simulation ungedämpfter Schwinger absolut stabil.
- **Konvergenzordnung:** Demonstriere den doppelt-logarithmischen Konvergenzplot (`Solver_Konvergenzordnung.png`). Eine Halbierung des Zeitschritts ($h \to h/2$) reduziert den Fehler bei Euler um Faktor 2, bei Heun um Faktor 4 und bei RK4 um Faktor 16 ($2^4$).