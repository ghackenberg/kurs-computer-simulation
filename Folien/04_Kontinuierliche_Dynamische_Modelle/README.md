---
marp: true
theme: fhooe
header: 'Kapitel 3: Kontinuierliche Dynamische Modelle'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

![bg right](./Titelbild.jpg)

# Kapitel 3: Kontinuierliche Dynamische Modelle

- 3.1: Grundlagen und Definitionen
- 3.2: Beispiel: Freier Fall / Vertikaler Wurf
- 3.3: Numerische Integrationsverfahren
- 3.4: Beispiel: Ungedämpftes Federpendel
- 3.5: Differential-Algebraische Gleichungen
- 3.6: Softwarearchitektur für Simulation

---

## 3.1: Grundlagen und Definitionen

<div class="columns top">
<div>

**Was sind kontinuierliche dynamische Modelle?**

- Beschreiben Systeme, deren Zustände sich **kontinuierlich** über die Zeit ändern.
- Die Zeit wird als kontinuierliche Variable `t` (aus den reellen Zahlen) betrachtet.
- Die Zustandsänderungen werden durch **Differentialgleichungen** beschrieben.

</div>
<div>

**Formale Darstellung:**

Eine gewöhnliche Differentialgleichung (ODE) erster Ordnung:
$$ \frac{dx}{dt} = \dot{x}(t) = f(t, x(t), u(t)) $$

- `t`: Zeit
- `x(t)`: Vektor der Zustandsvariablen zum Zeitpunkt `t`
- `u(t)`: Vektor der Eingangssignale zum Zeitpunkt `t`
- `f`: Funktion, die die Änderungsrate des Zustands beschreibt

</div>
</div>

---

<div class="columns">
<div class="three">

### Zustandsraumdarstellung

Eine übliche Methode zur Darstellung von dynamischen Systemen.

**Zustandsgleichung:**

$$ \dot{x}(t) = f(t, x(t), u(t)) $$

Beschreibt die Dynamik des Systems.

**Ausgangsgleichung:**

$$ y(t) = g(t, x(t), u(t)) $$

Beschreibt, wie die beobachtbaren Ausgänge `y(t)` aus den Zuständen `x(t)` und Eingängen `u(t)` berechnet werden.

**Legende:**

*`x`: Zustandsvektor,  `u`: Eingangsvektor, `y`: Ausgangsvektor*

</div>
<div>

![](./Diagramme/Zustandsraum.svg)

</div>
</div>

---

<div class="columns">
<div class="three">

### Von höheren Ordnungen zur ersten Ordnung

Differentialgleichungen höherer Ordnung können immer in ein System von Differentialgleichungen erster Ordnung umgewandelt werden.

**Beispiel: Bewegungsgleichung (2. Ordnung)**
$$ m \ddot{y}(t) + d \dot{y}(t) + k y(t) = F(t) $$

**Umwandlung:**
1.  Definiere Zustandsvariablen:
    -   $x_1(t) = y(t)$ (Position)
    -   $x_2(t) = \dot{y}(t)$ (Geschwindigkeit)
2.  Leite die Zustandsvariablen nach der Zeit ab:
    -   $\dot{x}_1(t) = \dot{y}(t) = x_2(t)$
    -   $\dot{x}_2(t) = \ddot{y}(t) = \frac{1}{m}(F(t) - d x_2(t) - k x_1(t))$

</div>
<div>

![width: 1000px](./Bewegungsgleichung.jpg)

</div>
</div>

---

### Von höheren Ordnungen zur ersten Ordnung (Matrixform)

Das System von DGLs erster Ordnung:
$$ \dot{x}_1(t) = x_2(t) $$
$$ \dot{x}_2(t) = -\frac{k}{m} x_1(t) - \frac{d}{m} x_2(t) + \frac{1}{m} F(t) $$

**In Matrixform (lineares System):**
$$
\begin{pmatrix} \dot{x}_1 \\ \dot{x}_2 \end{pmatrix}
=
\begin{pmatrix} 0 & 1 \\ -\frac{k}{m} & -\frac{d}{m} \end{pmatrix}
\begin{pmatrix} x_1 \\ x_2 \end{pmatrix}
+
\begin{pmatrix} 0 \\ \frac{1}{m} \end{pmatrix}
F(t)
$$
Dies entspricht der Form $\dot{x} = Ax + Bu$.

---

### Wie löst man eine Differentialgleichung?

<div class="columns top">
<div class="two">

**Analytische Lösung**

- Finden einer exakten mathematischen Funktion `x(t)`, die die DGL für alle `t` erfüllt.
- Beispiel: $x(t) = e^{-t}$ ist die analytische Lösung für $\dot{x} = -x$ mit $x(0)=1$.
- **Vorteil:** Exakt, liefert Einblick in das Systemverhalten.
- **Nachteil:** Nur für relativ einfache, oft lineare Systeme möglich.

</div>
<div class="two">

**Numerische Lösung**

- Approximation der Lösung zu diskreten Zeitpunkten $t_0, t_1, t_2, ...$
- Startet bei einem Anfangswert $x(t_0) = x_0$.
- Berechnet schrittweise $x_1 \approx x(t_1)$, $x_2 \approx x(t_2)$, usw.
- **Vorteil:** Anwendbar auf praktisch alle (auch hochkomplexe, nichtlineare) Systeme.
- **Nachteil:** Ist immer eine Approximation, Genauigkeit hängt von der Methode und der Schrittweite ab.

</div>
</div>

---

![bg right:40%](./Wurfbeispiel.jpg)

## 3.2: Beispiel: Freier Fall / Vertikaler Wurf

Ein einfaches, aber fundamentales Beispiel für ein kontinuierliches dynamisches System.

**Annahmen:**
- Bewegung nur in vertikaler Richtung (`y`).
- Konstante Erdbeschleunigung `g`.
- Kein Luftwiderstand.

**Physikalisches Gesetz (Newton):**
$$ F = m a $$
$$ -m g = m \ddot{y} $$
$$ \ddot{y}(t) = -g $$

Dies ist eine DGL 2. Ordnung.

---

### Vertikaler Wurf: Zustandsraummodell

Zunächst überführen wir das DGL 2. Ordnung in System von DGLs. 1. Ordnung (das Zustandsraummodell):

<div class="columns top">
<div>

**DGL 2. Ordnung:**
$$ \ddot{y}(t) = -g $$

**Zustandsvariablen:**
- $x_1(t) = y(t)$ (Position/Höhe)
- $x_2(t) = \dot{y}(t)$ (Geschwindigkeit)

</div>
<div>

**System von DGLs 1. Ordnung:**
- $\dot{x}_1(t) = \dot{y}(t) = x_2(t)$
- $\dot{x}_2(t) = \ddot{y}(t) = -g$

**Zustandsraumdarstellung:**
$$ \dot{x} = \begin{pmatrix} \dot{x}_1 \\ \dot{x}_2 \end{pmatrix} = \begin{pmatrix} x_2 \\ -g \end{pmatrix} = f(x) $$
Hier ist die Dynamik `f` unabhängig von `t` und es gibt keinen Eingang `u`.

</div>
</div>

---

### Vertikaler Wurf: Analytische Lösung

Wir lösen die DGLs durch direkte Integration.

<div class="columns top">
<div>

**Anfangsbedingungen:**

Zunächst müssen wir den Anfangszustand festlegen:

- $y(0) = y_0$<br/>(Anfangshöhe)
- $\dot{y}(0) = v_0$ (Anfangsgeschwindigkeit)

</div>
<div>

**1. Integration (*Geschwindigkeit*):**

Dann können wir die Geschwindigkeit berechnen:

$$ \dot{y}(t) = v(t) = \int -g \, dt = -g t + C_1 $$
Mit $\dot{y}(0) = v_0$ folgt $C_1 = v_0$.
$$ v(t) = v_0 - g t $$

</div>
<div>

**2. Integration (*Position*):**

Schließlich ergibt sich daraus die Positionsgleichung:

$$ y(t) = \int (v_0 - g t) \, dt = v_0 t - \frac{1}{2} g t^2 + C_2 $$
Mit $y(0) = y_0$ folgt $C_2 = y_0$.
$$ y(t) = y_0 + v_0 t - \frac{1}{2} g t^2 $$

</div>
</div>

---

<div class="columns">
<div>

### Vertikaler Wurf: Analytische Lösung (Zusammenfassung)

Für die Anfangsbedingungen $x(0) = \begin{pmatrix} y_0 \\ v_0 \end{pmatrix}$ lautet die exakte, analytische Lösung:

**Position:**
$$ y(t) = y_0 + v_0 t - \frac{1}{2} g t^2 $$

**Geschwindigkeit:**
$$ v(t) = v_0 - g t $$

Diese Formeln beschreiben die exakte Trajektorie des Objekts für jeden beliebigen Zeitpunkt `t > 0`.

</div>
<div>

![](../../Quellen/WS24/DynamischBallwurf1D/Screenshot.png)

</div>
</div>

---

<div class="columns">
<div class="three">

## 3.3: Numerische Integrationsverfahren

**Grundidee:** Approximiere den kontinuierlichen Verlauf von `x(t)` durch eine Folge von Werten $x_k \approx x(t_k)$ an diskreten Zeitpunkten $t_k = t_0 + k \cdot h$.

- `h`: Schrittweite (step size)

**Basis:** Taylor-Reihenentwicklung
$$ x(t+h) = x(t) + h \dot{x}(t) + \frac{h^2}{2!} \ddot{x}(t) + \dots $$

Wenn `h` klein ist, können wir Terme höherer Ordnung vernachlässigen:
$$ x(t+h) \approx x(t) + h \dot{x}(t) $$
Da wir wissen, dass $\dot{x}(t) = f(t, x(t))$, erhalten wir:
$$ x(t+h) \approx x(t) + h f(t, x(t)) $$

</div>
<div>

![](./Numerische_Verfahren.jpg)

</div>
</div>

---

<div class="columns">
<div>

### Die explizite Euler-Methode

Auch "Euler-Vorwärts" genannt. Die einfachste numerische Methode.

**Formel:**
$$ x_{k+1} = x_k + h \cdot f(t_k, x_k) $$

- Um den neuen Zustand $x_{k+1}$ zu berechnen, wird die Ableitung (Steigung) am **aktuellen** Punkt $(t_k, x_k)$ verwendet.
- Die Methode ist **explizit**, weil $x_{k+1}$ direkt aus bekannten Werten berechnet werden kann.

</div>
<div>

![width:2000px](./Diagramme/Euler%20-%20Explizit.svg)

</div>
</div>

---

### Anwendung: Expliziter Euler auf den vertikalen Wurf

**Zustandsmodell:**
$$ \dot{x} = \begin{pmatrix} \dot{y} \\ \dot{v} \end{pmatrix} = \begin{pmatrix} v \\ -g \end{pmatrix} = f(x) $$

**Euler-Formel:**
$$ x_{k+1} = x_k + h \cdot f(x_k) $$

**Aufgeteilt in Komponenten:**
$$ \begin{pmatrix} y_{k+1} \\ v_{k+1} \end{pmatrix} = \begin{pmatrix} y_k \\ v_k \end{pmatrix} + h \cdot \begin{pmatrix} v_k \\ -g \end{pmatrix} $$

**Das ergibt zwei einfache Update-Regeln:**
1.  $y_{k+1} = y_k + h \cdot v_k$
2.  $v_{k+1} = v_k - h \cdot g$

---

<div class="columns">
<div class="three">

### Beispielrechnung: Expliziter Euler

**Parameter:**
- $y_0 = 100\,m$, $v_0 = 0\,m/s$
- $g \approx 9.81\,m/s^2$
- Schrittweite $h = 0.1\,s$

**Schritt 0 -> 1 (t=0s -> t=0.1s):**
- $y_1 = y_0 + h \cdot v_0 = 100 + 0.1 \cdot 0 = 100\,m$
- $v_1 = v_0 - h \cdot g = 0 - 0.1 \cdot 9.81 = -0.981\,m/s$

**Schritt 1 -> 2 (t=0.1s -> t=0.2s):**
- $y_2 = y_1 + h \cdot v_1 = 100 + 0.1 \cdot (-0.981) = 99.9019\,m$
- $v_2 = v_1 - h \cdot g = -0.981 - 0.1 \cdot 9.81 = -1.962\,m/s$

</div>
<div>

| $i$ | $a_i$ | $v_i$ | $y_i$ |
|-|-|-|-|
| 0 | -9.81 | 0 | 100 |
| 1 | -9.81 | -0.981 | 100 |
| 2 | -9.81 | -1.962 | 00.9019 |
| ... | ... | ... | ... |

</div>
</div>

---

<div class="columns">
<div>

### Die implizite Euler-Methode

Auch "Euler-Rückwärts" genannt.

**Formel:**
$$ x_{k+1} = x_k + h \cdot f(t_{k+1}, x_{k+1}) $$

- Um den neuen Zustand $x_{k+1}$ zu berechnen, wird die Ableitung (Steigung) am **zukünftigen** Punkt $(t_{k+1}, x_{k+1})$ verwendet.
- Die Methode ist **implizit**, weil der gesuchte Wert $x_{k+1}$ auf beiden Seiten der Gleichung steht.
- Es muss bei jedem Schritt eine (oft nichtlineare) Gleichung gelöst werden!

</div>
<div>

![width:1000px](./Diagramme/Euler%20-%20Implizit.svg)

</div>
</div>

---

### Anwendung: Impliziter Euler auf den vertikalen Wurf

**Implizite Euler-Formel:**
$$ x_{k+1} = x_k + h \cdot f(x_{k+1}) $$

**Aufgeteilt in Komponenten:**
$$ \begin{pmatrix} y_{k+1} \\ v_{k+1} \end{pmatrix} = \begin{pmatrix} y_k \\ v_k \end{pmatrix} + h \cdot \begin{pmatrix} v_{k+1} \\ -g \end{pmatrix} $$

**Das ergibt zwei Gleichungen:**
1.  $y_{k+1} = y_k + h \cdot v_{k+1}$
2.  $v_{k+1} = v_k - h \cdot g$

Hier ist es einfach: Wir können zuerst $v_{k+1}$ berechnen und das Ergebnis dann in die erste Gleichung einsetzen.

---

### Vergleich: Euler-Methoden für den vertikalen Wurf

<div class="columns top">
<div class="two">

**Expliziter Euler**
```csharp
// Zustand (y, v) zum Zeitpunkt k
var y_k = 100.0;
var v_k = 0.0;

// Berechnung für k+1
var y_kp1 = y_k + h * v_k;
var v_kp1 = v_k - h * g;
```
- Sehr einfach zu berechnen.

</div>
<div class="two">

**Impliziter Euler**
```csharp
// Zustand (y, v) zum Zeitpunkt k
var y_k = 100.0;
var v_k = 0.0;

// Berechnung für k+1
var v_kp1 = v_k - h * g;
var y_kp1 = y_k + h * v_kp1;
```
- In diesem speziellen Fall auch sehr einfach.
- Man beachte die Reihenfolge der Berechnungen!

</div>
</div>

Interessanterweise liefert die implizite Methode für die Geschwindigkeit exakt das gleiche Ergebnis wie die explizite Methode, da $\dot{v} = -g$ eine Konstante ist. Für die Position ergibt sich jedoch ein Unterschied.

---

### Genauigkeit der Euler-Methoden

Vergleichen wir die numerischen Ergebnisse mit der analytischen Lösung.

**Analytische Lösung nach 0.1s:**
- $v(0.1) = 0 - 9.81 \cdot 0.1 = -0.981\,m/s$
- $y(0.1) = 100 + 0 \cdot 0.1 - 0.5 \cdot 9.81 \cdot (0.1)^2 = 99.95095\,m$

**Numerische Ergebnisse für $y_1$ (bei $t=0.1s$):**
- **Expliziter Euler:** $y_1 = 100\,m$ (Fehler: -0.049 m)
- **Impliziter Euler:** $y_1 = 100 + 0.1 \cdot (-0.981) = 99.9019\,m$ (Fehler: -0.049 m)

Beide Methoden haben einen lokalen Fehler der Ordnung $O(h^2)$ und einen globalen Fehler der Ordnung $O(h)$. Sie sind Methoden erster Ordnung.

---

<div class="columns">
<div class="two">

## 3.4: Beispiel: Ungedämpftes Federpendel

Ein klassisches Beispiel für ein oszillierendes System.

**Annahmen:**
- Eine Masse `m` ist an einer Feder mit Federkonstante `k` befestigt.
- Keine Dämpfung (keine Reibung).
- Bewegung nur in einer Dimension (`y`).

**Physikalisches Gesetz (Hooke'sches Gesetz & Newton):**
$$ F_{Feder} = -k y $$
$$ F = m a \implies -k y(t) = m \ddot{y}(t) $$
$$ \ddot{y}(t) = -\frac{k}{m} y(t) $$

</div>
<div>

![](./Pendelbeispiel.jpg)

</div>
</div>

---

### Federpendel: Zustandsraummodell

Wir überführen das Modell zunächst wieder in ein Zustandsraummodell:

<div class="columns top">
<div>

**DGL 2. Ordnung:**
$$ \ddot{y}(t) = -\frac{k}{m} y(t) $$

**Zustandsvariablen:**
- $x_1(t) = y(t)$ (Position/Auslenkung)
- $x_2(t) = \dot{y}(t)$ (Geschwindigkeit)

</div>
<div>

**System von DGLs 1. Ordnung:**
- $\dot{x}_1(t) = x_2(t)$
- $\dot{x}_2(t) = -\frac{k}{m} x_1(t)$

**Zustandsraumdarstellung:**
$$ \dot{x} = \begin{pmatrix} \dot{x}_1 \\ \dot{x}_2 \end{pmatrix} = \begin{pmatrix} x_2 \\ -\frac{k}{m} x_1 \end{pmatrix} = f(x) $$

</div>
</div>

---

### Federpendel: Analytische Lösung

Die DGL $\ddot{y} + \omega^2 y = 0$ mit $\omega = \sqrt{k/m}$ beschreibt eine harmonische Schwingung.

**Allgemeine Lösung:**
$$ y(t) = C_1 \cos(\omega t) + C_2 \sin(\omega t) $$

**Mit Anfangsbedingungen $y(0)=y_0$ und $\dot{y}(0)=v_0$:**
- $y(0) = y_0 \implies C_1 = y_0$
- $\dot{y}(t) = -C_1 \omega \sin(\omega t) + C_2 \omega \cos(\omega t)$
- $\dot{y}(0) = v_0 \implies C_2 \omega = v_0 \implies C_2 = v_0 / \omega$

**Spezifische analytische Lösung:**
$$ y(t) = y_0 \cos(\omega t) + \frac{v_0}{\omega} \sin(\omega t) $$

Diese Lösung beschreibt eine ewige, ungedämpfte Schwingung.

---

### Federpendel: Numerische Lösung (Expliziter Euler)

**Zustandsmodell:**
$$ f(x) = \begin{pmatrix} x_2 \\ -\frac{k}{m} x_1 \end{pmatrix} $$

**Explizite Euler-Formel:** $x_{k+1} = x_k + h \cdot f(x_k)$
$$ \begin{pmatrix} y_{k+1} \\ v_{k+1} \end{pmatrix} = \begin{pmatrix} y_k \\ v_k \end{pmatrix} + h \cdot \begin{pmatrix} v_k \\ -\frac{k}{m} y_k \end{pmatrix} $$

**Update-Regeln:**
1.  $y_{k+1} = y_k + h \cdot v_k$
2.  $v_{k+1} = v_k - h \frac{k}{m} y_k$

---

<div class="columns">
<div>

### Problem des expliziten Eulers: Instabilität

Was passiert mit der Energie des Systems bei der numerischen Simulation? Die Gesamtenergie ist:

$E = E_{kin} + E_{pot} = \frac{1}{2}mv^2 + \frac{1}{2}ky^2$

Bei der analytischen Lösung ist `E` konstant.
Beim expliziten Euler-Verfahren **wächst** die numerische Energie $E_k = \frac{1}{2}mv_k^2 + \frac{1}{2}ky_k^2$ mit jedem Schritt!

Dieses Verhalten ist typisch für den expliziten Euler bei oszillierenden Systemen. Das Verfahren ist nur bedingt stabil. Eine kleinere Schrittweite `h` verlangsamt das Anwachsen, verhindert es aber nicht.

</div>
<div>

![](./Pendelsimulation.png)

</div>
</div>

---

### Federpendel: Numerische Lösung (Impliziter Euler)

**Implizite Euler-Formel:** $x_{k+1} = x_k + h \cdot f(x_{k+1})$
$$ \begin{pmatrix} y_{k+1} \\ v_{k+1} \end{pmatrix} = \begin{pmatrix} y_k \\ v_k \end{pmatrix} + h \cdot \begin{pmatrix} v_{k+1} \\ -\frac{k}{m} y_{k+1} \end{pmatrix} $$

**Gleichungssystem:**
1.  $y_{k+1} = y_k + h \cdot v_{k+1}$
2.  $v_{k+1} = v_k - h \frac{k}{m} y_{k+1}$

Dies ist ein lineares Gleichungssystem für die unbekannten Größen $y_{k+1}$ und $v_{k+1}$.

---

## 3.5: Differential-Algebraische Gleichungen (DAE)

Das Gleichungssystem aus dem impliziten Euler ist ein Beispiel für eine **algebraische Schleife**.

**System umordnen:**
1.  $y_{k+1} - h \cdot v_{k+1} = y_k$
2.  $(h \frac{k}{m}) y_{k+1} + v_{k+1} = v_k$

**In Matrixform:**
$$
\begin{pmatrix}
1 & -h \\
h \frac{k}{m} & 1
\end{pmatrix}
\begin{pmatrix}
y_{k+1} \\
v_{k+1}
\end{pmatrix}
=
\begin{pmatrix}
y_k \\
v_k
\end{pmatrix}
$$

Um $y_{k+1}$ und $v_{k+1}$ zu finden, müssen wir bei jedem Zeitschritt dieses $2 \times 2$ Gleichungssystem lösen. Dies ist eine **differential-algebraische Gleichung (DAE)**.

---

### Lösung der algebraischen Schleife

Wir müssen die Matrix invertieren:
$$
\begin{pmatrix}
y_{k+1} \\
v_{k+1}
\end{pmatrix}
=
\begin{pmatrix}
1 & -h \\
h \frac{k}{m} & 1
\end{pmatrix}^{-1}
\begin{pmatrix}
y_k \\
v_k
\end{pmatrix}
$$

Die Inverse einer $2 \times 2$ Matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ ist $\frac{1}{ad-bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.

$$ \text{det} = 1 \cdot 1 - (-h) \cdot (h \frac{k}{m}) = 1 + h^2 \frac{k}{m} $$

$$
\begin{pmatrix}
y_{k+1} \\
v_{k+1}
\end{pmatrix}
=
\frac{1}{1 + h^2 \frac{k}{m}}
\begin{pmatrix}
1 & h \\
-h \frac{k}{m} & 1
\end{pmatrix}
\begin{pmatrix}
y_k \\
v_k
\end{pmatrix}
$$

---

<div class="columns">
<div>

### Stabilität des impliziten Eulers

Führt man die Simulation mit dem impliziten Euler durch, beobachtet man ein anderes Verhalten.

- Der implizite Euler führt künstliche Dämpfung in das System ein; die Energie nimmt ab.
- Das Verfahren ist **A-stabil**: Die Lösung geht für $h \to \infty$ gegen Null, sie explodiert niemals. Dies ist oft ein erwünschtes Verhalten, auch wenn es physikalisch nicht ganz korrekt ist.

</div>
<div>

![](./Pendelsimulation.png)

</div>
</div>

---

### Einfluss der Schrittweite `h`

Die Genauigkeit aller numerischen Verfahren hängt entscheidend von der Schrittweite `h` ab.

- **Zu großes `h`**:
    - Große Ungenauigkeit.
    - Kann bei expliziten Verfahren zu Instabilität führen.
- **Zu kleines `h`**:
    - Hohe Genauigkeit.
    - Hoher Rechenaufwand (mehr Schritte für das gleiche Zeitintervall).
    - Kann zu Rundungsfehler-Akkumulation führen.

Die Wahl der richtigen Schrittweite ist ein kritischer Kompromiss zwischen Genauigkeit und Rechenzeit. Moderne Solver verwenden oft **adaptive Schrittweitensteuerung**, um `h` während der Simulation anzupassen.

---

## 3.6: Softwarearchitektur für Simulation

Wie können wir komplexe dynamische Systeme am Computer modellieren und simulieren?
Ein bewährter Ansatz ist die Modularisierung, inspiriert von **Simulink S-Functions**.

**Grundidee:**
- Jede Komponente des Systems wird als "Blackbox" (ein Block) mit definierten Schnittstellen modelliert.
- Jeder Block kapselt seine eigenen Zustandsgleichungen.
- Ein übergeordneter "Solver" (Integrator) kümmert sich um die numerische Lösung der DGLs für das Gesamtsystem.

---

### Struktur einer vereinfachten S-Funktion

<div class="columns">
<div class="two">

Ein Block, der ein kontinuierliches dynamisches System beschreibt, benötigt typischerweise folgende Methoden:

- `InitializeSizes()`: Definiert die "Größe" des Blocks (Anzahl der Zustände, Ein- und Ausgänge).
- `InitializeConditions(double[] x0)`: Setzt die Anfangswerte $x_0$ für die Zustände.
- `Derivatives(double t, double[] x, double[] u, double[] dx)`: Berechnet die Ableitungen der Zustände: $\dot{x} = f(t, x, u)$. **Dies ist das Herzstück des Modells.**
- `Outputs(double t, double[] x, double[] u, double[] y)`: Berechnet die Ausgänge des Blocks: $y = g(t, x, u)$.

</div>
<div>

```csharp
class SFunction {

    int NumContinuousStates
    int NumInputs
    int NumOuputs

    void InitializeSizes()
    void InitializeConditions(...)
    void Derivatives(...)
    void Outputs(...)

}
```

</div>
</div>

---

### Beispiel: S-Funktion für eine Konstante

<div class="columns top">
<div class="two">

Ein Block, der einen konstanten Wert ausgibt.

- **Eigenschaften:**
  - Keine Zustände (`NumContinuousStates = 0`)
  - Keine Eingänge (`NumInputs = 0`)
  - Ein Ausgang (`NumOutputs = 1`)
  - Ein Parameter (`Value`)

- **Verhalten:**
  - Der Ausgang `y` ist immer gleich dem Parameter `Value`.

</div>
<div class="two">

```csharp
class ConstantBlock : SFunction {
    // Parameter
    double Value = 1.0;

    void InitializeSizes() {
        NumContinuousStates = 0;
        NumInputs = 0;
        NumOutputs = 1;
    }

    void Outputs(double t, 
                 double[] x,
                 double[] u,
                 double[] y) {
        y[0] = this.Value;
    }
}
```

</div>
</div>

---

### Beispiel: S-Funktion für einen Gain (Verstärkung)

<div class="columns top">
<div class="two">

Ein Block, der seinen Eingang mit einem konstanten Faktor multipliziert.

- **Eigenschaften:**
  - Keine Zustände (`NumContinuousStates = 0`)
  - Ein Eingang (`NumInputs = 1`)
  - Ein Ausgang (`NumOutputs = 1`)
  - Ein Parameter (`Gain`)
  - Direkte Durchleitung (direct feedthrough)

- **Verhalten:**
  - `y = Gain * u`

</div>
<div class="two">

```csharp
class GainBlock : SFunction {
    // Parameter
    double Gain = 2.0;

    void InitializeSizes() {
        NumContinuousStates = 0;
        NumInputs = 1;
        NumOutputs = 1;
    }

    void Outputs(double t, 
                 double[] x,
                 double[] u,
                 double[] y) {
        y[0] = this.Gain * u[0];
    }
}
```

</div>
</div>

---

### Beispiel: S-Funktion für eine Summe

<div class="columns top">
<div class="two">

Ein Block, der seine Eingänge addiert oder subtrahiert.

- **Eigenschaften:**
  - Keine Zustände (`NumContinuousStates = 0`)
  - Mehrere Eingänge (z.B. `NumInputs = 2`)
  - Ein Ausgang (`NumOutputs = 1`)
  - Parameter für die Operationen (z.B. `[+, -]`)
  - Direkte Durchleitung (direct feedthrough)

- **Verhalten:**
  - `y = u[0] - u[1]`

</div>
<div class="two">

```csharp
class SumBlock : SFunction {
    // Parameter: z.B. "+" oder "-"
    string Signs = "+-";

    void InitializeSizes() {
        NumContinuousStates = 0;
        NumInputs = 2; // oder mehr
        NumOutputs = 1;
    }

    void Outputs(double t, 
                 double[] x,
                 double[] u,
                 double[] y) {
        double sum = 0.0;
        // Annahme: Signs.Length == NumInputs
        for (int i = 0; i < NumInputs; i++) {
            if (Signs[i] == '+')
                sum += u[i];
            else
                sum -= u[i];
        }
        y[0] = sum;
    }
}
```

</div>
</div>

---

### Beispiel: S-Funktion für einen Integrator

<div class="columns top">
<div class="two">

Der wichtigste Block für dynamische Systeme. Er integriert das Eingangssignal.

- **Eigenschaften:**
  - Ein Zustand (`NumContinuousStates = 1`)
  - Ein Eingang (`NumInputs = 1`)
  - Ein Ausgang (`NumOutputs = 1`)

- **Verhalten:**
  - Die Ableitung des Zustands ist der Eingang: $\dot{x} = u$
  - Der Ausgang ist der Zustand: $y = x$

</div>
<div class="two">

```csharp
class IntegratorBlock : SFunction {
    void InitializeSizes() {
        NumContinuousStates = 1;
        NumInputs = 1;
        NumOutputs = 1;
    }
    void InitializeConditions(double[] x) {
        // Setze Anfangswert
        x[0] = 0.0; 
    }
    void Derivatives(double t, 
                     double[] x,
                     double[] u,
                     double[] dx) {
        // dx/dt = u
        dx[0] = u[0];
    }
    void Outputs(double t, 
                 double[] x,
                 double[] u,
                 double[] y) {
        // y = x
        y[0] = x[0];
    }
}
```

</div>
</div>

---

### Beispiel: S-Funktion für das Federpendel

<div class="columns top">
<div class="two">

```csharp
// Block-Definition
class SpringMassDamper {
    // Parameter
    double m, k, d;

    // Zustände x = [y, v]
    // Eingänge u = [F]
    // Ausgänge y = [y, v, a]

    void InitializeSizes() {
        NumContinuousStates = 2;
        NumInputs = 1;
        NumOutputs = 3;
    }

    void InitializeConditions(double[] x) {
        x[0] = 1.0; // y_0
        x[1] = 0.0; // v_0
    }
}
```

</div>
<div class="two">

```csharp
    void Derivatives(double t, 
                     double[] x,
                     double[] u,
                     double[] dx)
    {
        double y = x[0];
        double v = x[1];
        double F = u[0];

        dx[0] = v; // dy/dt
        dx[1] = (F - k*y - d*v) / m; // dv/dt
    }

    void Outputs(double t, 
                 double[] x,
                 double[] u,
                 double[] y)
    {
        y[0] = x[0]; // Position
        y[1] = x[1]; // Geschwindigkeit
        
        // Beschleunigung ist algebraisch
        double F = u[0];
        y[2] = (F - k*x[0] - d*x[1]) / m;
    }
}
```

</div>
</div>

---

### Zusammenspiel von Solver und S-Funktionen

Der Solver (z.B. ein expliziter Euler) orchestriert die Simulation.

1.  **Initialisierung:**
    - Rufe `InitializeSizes` und `InitializeConditions` für alle Blöcke auf.
    - Setze $t = t_0$ und $x = x_0$.
2.  **Zeitschritt-Schleife (für k = 0, 1, 2, ...):**
    1. **Outputs berechnen:** Rufe für alle Blöcke `Outputs(t, x, u, y)` auf, um die Ausgänge $y_k$ zu erhalten.
    2. **Verbindungen auflösen:** Die Ausgänge $y_k$ von Block A werden zu den Eingängen $u_k$ von Block B.
    3. **Ableitungen berechnen:** Rufe für alle Blöcke `Derivatives(t, x, u, dx)` auf, um die Ableitungen $\dot{x}_k$ zu erhalten.
    4. **Zustände integrieren:** Der Solver berechnet den neuen Zustand $x_{k+1}$ mit der gewählten Methode (z.B. $x_{k+1} = x_k + h \cdot \dot{x}_k$).
    5. **Zeit fortschreiten:** $t_{k+1} = t_k + h$.

---

### Modellierung komplexer Systeme

Durch die Kombination einfacher S-Funktionen können komplexe Systeme modelliert werden.

**Beispiel: Zwei gekoppelte Feder-Masse-Systeme**

- **Block 1:** Modelliert die erste Masse $m_1$.
    - Eingang: Kraft von der Kopplungsfeder.
    - Ausgang: Position $y_1$.
- **Block 2:** Modelliert die zweite Masse $m_2$.
    - Eingang: Kraft von der Kopplungsfeder.
    - Ausgang: Position $y_2$.
- **Block 3 (algebraisch):** Berechnet die Kraft der Kopplungsfeder.
    - Eingang: Positionen $y_1, y_2$.
    - Ausgang: $F_{koppel} = k_{12} (y_2 - y_1)$.

Die Ausgänge werden über die Eingänge der jeweils anderen Blöcke verbunden.

---

### Umgang mit algebraischen Schleifen in S-Funktionen

Was passiert, wenn der Ausgang eines Blocks direkt (ohne Verzögerung durch einen Zustand) auf seinen eigenen Eingang zurückwirkt?

`Ausgang y = g(x, u)`
`Eingang u = y`

- **Explizite Solver:** Können dies nicht auflösen. Die Berechnung für den aktuellen Zeitschritt hängt von sich selbst ab. Simulink wirft einen "Algebraic loop" Fehler.
- **Implizite Solver:** Sind genau dafür gemacht! Sie führen zu einem Gleichungssystem (wie beim impliziten Euler für das Federpendel), das in jedem Zeitschritt gelöst werden muss.

Die S-Funktions-Architektur muss dem Solver mitteilen, ob eine solche direkte Abhängigkeit (`direct feedthrough`) vom Eingang zum Ausgang besteht, damit er entsprechend reagieren kann.

---

# Zusammenfassung Kapitel 3

- **Kontinuierliche dynamische Modelle** beschreiben Systeme mit kontinuierlicher Zeitentwicklung mittels **Differentialgleichungen**.
- Die **Zustandsraumdarstellung** ($\dot{x}=f(x,u), y=g(x,u)$) ist eine Standardform.
- **Analytische Lösungen** sind exakt, aber selten findbar. **Numerische Lösungen** sind Approximationen und universell einsetzbar.
- **Expliziter Euler** ist einfach, aber oft instabil.
- **Impliziter Euler** ist stabil, erfordert aber die Lösung von (oft nichtlinearen) Gleichungssystemen in jedem Schritt (**algebraische Schleifen / DAEs**).
- Die **Schrittweite `h`** ist ein kritischer Parameter, der Genauigkeit und Rechenaufwand steuert.
- **S-Funktionen** bieten eine modulare Architektur, um komplexe Systeme zu modellieren, die von einem zentralen **Solver** gelöst werden.
