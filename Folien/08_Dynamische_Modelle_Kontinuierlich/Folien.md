---
marp: true
theme: fhooe
header: 'Kapitel 8: Kontinuierliche Dynamische Modelle'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

<!-- _paginate: false -->
<!-- _header: "" -->
<!-- _footer: "" -->

![bg right](./Titelbild.jpg)

# Kapitel 8: Kontinuierliche Dynamische Modelle

- 8.1: Grundlagen und Definitionen
- 8.2: Beispiel: Freier Fall / Vertikaler Wurf
- 8.3: Beispiel: Ungedämpftes Federpendel
- 8.4: Softwarearchitektur für Simulation
- 8.5: Lösungsalgorithmen für Simulation
- 8.6: Höhere Integrationsverfahren (Heun & Runge-Kutta 4)

---

## 8.1: Grundlagen und Definitionen

Dieser Abschnitt umfasst die folgenden Inhalte:

- Definition von kontinuierlichen dynamischen Modellen
- Die Zustandsraumdarstellung
- Umwandlung von Differentialgleichungen höherer Ordnung
- Analytische vs. numerische Lösungsansätze

---

### Was sind kontinuierliche dynamische Modelle?

<div class="columns top">
<div>

**Informelle Beschreibung:**

- Beschreiben Systeme, deren Zustände sich **kontinuierlich** über die Zeit ändern.
- Die Zeit wird als kontinuierliche Variable `t` (aus den reellen Zahlen) betrachtet.
- Die Zustandsänderungen werden durch **Differentialgleichungen** beschrieben.

</div>
<div>

**Formale Darstellung:**

Eine gewöhnliche Differentialgleichung (ODE) erster Ordnung:
$$ \frac{d\mathbf{x}}{dt} = \dot{\mathbf{x}}(t) = \mathbf{f}(t, \mathbf{x}(t), \mathbf{u}(t)) $$

- $t$: Zeit
- $\mathbf{x}(t)$: Vektor der Zustandsvariablen zum Zeitpunkt $t$
- $\mathbf{u}(t)$: Vektor der Eingangssignale zum Zeitpunkt $t$
- $\mathbf{f}$: Vektorwertige Funktion, die die Änderungsrate des Zustands beschreibt

</div>
</div>

---

<div class="columns">
<div class="three">

### Zustandsraumdarstellung

Eine übliche Methode zur Darstellung von dynamischen Systemen.

**Zustandsgleichung:**

$$ \dot{\mathbf{x}}(t) = \mathbf{f}(t, \mathbf{x}(t), \mathbf{u}(t)) $$

Beschreibt die Dynamik des Systems.

**Ausgangsgleichung:**

$$ \mathbf{y}(t) = \mathbf{g}(t, \mathbf{x}(t), \mathbf{u}(t)) $$

Beschreibt, wie die beobachtbaren Ausgänge $\mathbf{y}(t)$ aus den Zuständen $\mathbf{x}(t)$ und Eingängen $\mathbf{u}(t)$ berechnet werden.

**Legende:**

*$\mathbf{x}$: Zustandsvektor, $\mathbf{u}$: Eingangsvektor, $\mathbf{y}$: Ausgangsvektor*

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

![width: 1000px](./Illustrationen/Bewegungsgleichung.jpg)

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
Dies entspricht der Form $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$.

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

<div class="columns">
<div class="three">

### Numerische Integrationsverfahren

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

![](./Illustrationen/Numerische_Verfahren.jpg)

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

![bg right:40%](./Illustrationen/Wurfbeispiel.jpg)

## 8.2: Beispiel: Freier Fall / Vertikaler Wurf

Dieser Abschnitt umfasst die folgenden Inhalte:

- Physikalische Modellierung des vertikalen Wurfs
- Aufstellen des Zustandsraummodells
- Herleitung der analytischen Lösung

---

### Vertikaler Wurf: Einführung

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

### Vertikaler Wurf: Numerische Lösung (**Expliziter Euler**)

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
- $y_0 = 100\,\mathrm{m}$, $v_0 = 0\,\mathrm{m/s}$
- $g = 9{,}81\,\mathrm{m/s^2}$
- Schrittweite $h = 0{,}1\,\mathrm{s}$

**Schritt 0 -> 1 ($t = 0\,\mathrm{s} \to t = 0{,}1\,\mathrm{s}$):**
- $y_1 = y_0 + h \cdot v_0 = 100 + 0{,}1 \cdot 0 = 100\,\mathrm{m}$
- $v_1 = v_0 - h \cdot g = 0 - 0{,}1 \cdot 9{,}81 = -0{,}981\,\mathrm{m/s}$

**Schritt 1 -> 2 ($t = 0{,}1\,\mathrm{s} \to t = 0{,}2\,\mathrm{s}$):**
- $y_2 = y_1 + h \cdot v_1 = 100 + 0{,}1 \cdot (-0{,}981) = 99{,}9019\,\mathrm{m}$
- $v_2 = v_1 - h \cdot g = -0{,}981 - 0{,}1 \cdot 9{,}81 = -1{,}962\,\mathrm{m/s}$

</div>
<div>

| $i$ | $a_i$ | $v_i$ | $y_i$ |
|-|-|-|-|
| 0 | -9{,}81 | 0 | 100 |
| 1 | -9{,}81 | -0{,}981 | 100 |
| 2 | -9{,}81 | -1{,}962 | 99{,}9019 |
| ... | ... | ... | ... |

</div>
</div>

---

### Vertikaler Wurf: Numerische Lösung (**Semi-Impliziter Euler**)

Aktualisiert man zuerst die Geschwindigkeit und nutzt den neuen Wert für den Ort:

$$ v_{k+1} = v_k - h \cdot g $$
$$ y_{k+1} = y_k + h \cdot v_{k+1} $$

**Mathematische Einordnung:**
- Dies ist der **semi-implizite Euler** (auch bekannt als **Euler-Cromer**-Verfahren).
- Die Geschwindigkeit wird explizit aktualisiert, der Ort hingegen semi-implizit mit der bereits vorauseilenden Geschwindigkeit $v_{k+1}$.
- Beim freien Fall entkoppeln die Gleichungen, da die Erdbeschleunigung $g$ ortsunabhängig ist.

---

### Symplektische Eigenschaft & Phasenraumvolumenerhaltung

Warum ist Euler-Cromer in der mechatronischen Simulation so populär?

- **Phasenraumvolumenerhaltung (Satz von Liouville):**
  Die Jacobi-Matrix $\mathbf{J}$ der Transformation $(y_k, v_k) \mapsto (y_{k+1}, v_{k+1})$ erfüllt:
  $$\det(\mathbf{J}) = \det \begin{pmatrix} 1 & h \\ 0 & 1 \end{pmatrix} = 1 \cdot 1 - 0 \cdot h \equiv 1$$
- **Kontrast zum expliziten und echten impliziten Euler:**
  - **Expliziter Euler:** $\det(\mathbf{J}) > 1$ $\implies$ führt künstlich Energie zu (System schaukelt auf).
  - **Echter Impliziter Euler:** $\det(\mathbf{J}) < 1$ $\implies$ erzeugt künstliche numerische Dämpfung.
  - **Euler-Cromer (symplektisch):** $\det(\mathbf{J}) \equiv 1$ $\implies$ volumenerhaltend! Die Energie oszilliert stabil um einen Schatten-Hamiltonian $\tilde{H} = H + \mathcal{O}(h)$ ohne Drift.

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
- Standard explizit (Forward Euler).
- Veraltete Geschwindigkeit $v_k$ für $y_{k+1}$.

</div>
<div class="two">

**Semi-Impliziter Euler (Euler-Cromer)**
```csharp
// Zustand (y, v) zum Zeitpunkt k
var y_k = 100.0;
var v_k = 0.0;

// Berechnung für k+1 (v zuerst!)
var v_kp1 = v_k - h * g;
var y_kp1 = y_k + h * v_kp1;
```
- Symplektischer Integrator erster Ordnung.
- Neue Geschwindigkeit $v_{k+1}$ für $y_{k+1}$.

</div>
</div>

Die Geschwindigkeit ist identisch, da $\dot{v} = -g$ konstant ist. Bei der Position nutzt Euler-Cromer bereits die Geschwindigkeit am Intervallende.

---

### Genauigkeit der Euler-Methoden

Vergleichen wir die numerischen Ergebnisse mit der analytischen Lösung ($t = 0{,}1\,\mathrm{s}$):

**Analytische Lösung nach $0{,}1\,\mathrm{s}$:**
- $v(0{,}1) = 0 - 9{,}81 \cdot 0{,}1 = -0{,}981\,\mathrm{m/s}$
- $y(0{,}1) = 100 + 0 \cdot 0{,}1 - 0{,}5 \cdot 9{,}81 \cdot (0{,}1)^2 = 99{,}95095\,\mathrm{m}$

**Numerische Ergebnisse für $y_1$ (bei $h = 0{,}1\,\mathrm{s}$):**
- **Expliziter Euler:** $y_1 = 100{,}0\,\mathrm{m}$ (Fehler: $+0{,}04905\,\mathrm{m}$)
- **Semi-Impliziter Euler:** $y_1 = 100 + 0{,}1 \cdot (-0{,}981) = 99{,}9019\,\mathrm{m}$ (Fehler: $-0{,}04905\,\mathrm{m}$)

Beide Methoden haben einen lokalen Fehler der Ordnung $\mathcal{O}(h^2)$ und einen globalen Fehler der Ordnung $\mathcal{O}(h)$ (Verfahren 1. Ordnung).

---

![bg contain right:40%](./Illustrationen/Pendelbeispiel.jpg)

## 8.3: Beispiel: Ungedämpftes Federpendel

Dieser Abschnitt umfasst die folgenden Inhalte:

- Physikalische Modellierung des Federpendels
- Aufstellen des Zustandsraummodells
- Herleitung der analytischen Lösung
- Analyse der numerischen Stabilität (expliziter vs. impliziter Euler)

---

### Federpendel: Einführung

Ein klassisches Beispiel für ein oszillierendes System.

**Annahmen:**
- Eine Masse `m` ist an einer Feder mit Federkonstante `k` befestigt.
- Keine Dämpfung (keine Reibung).
- Bewegung nur in einer Dimension (`y`).

**Physikalisches Gesetz (Hooke'sches Gesetz & Newton):**
$$ F_{Feder} = -k y $$
$$ F = m a \implies -k y(t) = m \ddot{y}(t) $$
$$ \ddot{y}(t) = -\frac{k}{m} y(t) $$

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

![](./Illustrationen/Pendelsimulation.png)

</div>
</div>

---

### Federpendel: Numerische Lösung (Impliziter Euler)

**Implizite Euler-Formel:** $\mathbf{x}_{k+1} = \mathbf{x}_k + h \cdot \mathbf{f}(\mathbf{x}_{k+1})$
$$ \begin{pmatrix} y_{k+1} \\ v_{k+1} \end{pmatrix} = \begin{pmatrix} y_k \\ v_k \end{pmatrix} + h \cdot \begin{pmatrix} v_{k+1} \\ -\frac{k}{m} y_{k+1} \end{pmatrix} $$

**Gekoppeltes lineares Gleichungssystem:**
1.  $y_{k+1} - h \cdot v_{k+1} = y_k$
2.  $\frac{k \cdot h}{m} y_{k+1} + v_{k+1} = v_k$

Im Kontrast zum vertikalen Wurf sind hier beide Zustände wechselseitig gekoppelt: Die Berechnung erfordert in jedem Zeitschritt die Lösung eines Gleichungssystems (z.B. analytisch oder iterativ via **Banach-Fixpunktiteration**).


---

## 8.4: Softwarearchitektur für Simulation

Dieser Abschnitt beschreibt eine flexible, blockbasierte Architektur für die Simulation von dynamischen Systemen, die stark an das Konzept von **Simulink S-Functions** angelehnt ist.

- Konzept der `Block`-Klasse als universeller Baustein
- Deklaration von Zuständen, Ein- und Ausgängen
- Implementierung von algebraischen und dynamischen Blöcken
- Modellierung eines Gesamtsystems in der `Model`-Klasse

---

<div class="columns">
<div class="two">

### Die Kernklassen der Architektur

Die Architektur basiert auf drei zentralen Klassen, um ein block-basiertes Modell zu erstellen:

- **`Block`**: Die abstrakte Basisklasse für alle Funktionsblöcke. Jeder Block kapselt eine spezifische Funktionalität (z.B. Addition, Integration, Konstante).
- **`Connection`**: Repräsentiert eine Verbindung von einem Ausgangsport eines Quell-Blocks zu einem Eingangsport eines Ziel-Blocks.
- **`Model`**: Dient als Container für das gesamte System. Es hält eine Liste aller `Block`- und `Connection`-Instanzen.

</div>
<div>

![](../../Quellen/WS25/SFunctionContinuous/Model.svg)

</div>
</div>

---

### Die `Block`-Klasse (S-Function)

Jede Komponente wird von der abstrakten Klasse `Block` abgeleitet. Sie definiert die Schnittstellen, die ein Solver benötigt, um das System zu simulieren.

```csharp
public abstract class Block
{
    // Deklarationen für Zustände, Ein- & Ausgänge
    public List<StateDeclaration> ContinuousStates { get; }
    public List<InputDeclaration> Inputs { get; }
    public List<OutputDeclaration> Outputs { get; }

    // Virtuelle Methoden, die vom Solver aufgerufen werden
    virtual public void InitializeStates(...);
    virtual public void CalculateDerivatives(...);
    virtual public void CalculateOutputs(...);
    virtual public void UpdateStates(...);
}
```

---

<div class="columns">
<div class="two">

### Deklaration von Schnittstellen

Jeder Block deklariert seine Zustände, Ein- und Ausgänge im Konstruktor.

- **`StateDeclaration`**: Definiert einen kontinuierlichen Zustand.
- **`InputDeclaration`**: Definiert einen Eingang. Das Flag `DirectFeedThrough` gibt an, ob der Ausgang direkt vom Eingang abhängt (wichtig für algebraische Schleifen).
- **`OutputDeclaration`**: Definiert einen Ausgang.

</div>
<div>

![](../../Quellen/WS25/SFunctionContinuous/Declaration.svg)

</div>
</div>

---

<div class="columns">
<div class="two">

### Quelle- und Senkenblöcke

- **Quellen** sind Blöcke ohne Eingänge, die Signale erzeugen.
    - **`ConstantBlock`**: Eine Signalquelle, die einen konstanten Wert ausgibt.
- **Senken** sind Blöcke ohne Ausgänge, die Signale verarbeiten oder speichern.
    - **`RecordBlock`**: Eine Signalsenke, die die ankommenden Werte über die Zeit aufzeichnet. Sie hat keine Ausgänge und dient zur Visualisierung.

</div>
<div>

![](../../Quellen/WS25/SFunctionContinuous/Block.SourceSink.svg)

</div>
</div>

---

### Beispiel: `ConstantBlock`

Ein Block, der einen konstanten Wert ausgibt. Er hat keine Zustände und keine Eingänge.

<div class="columns">
<div class="two">

- **Deklaration**: Ein Ausgang `Value`.
- **`CalculateOutputs`**: Setzt den Ausgang `outputs[0]` auf den konstanten `Value`.
- Die anderen Methoden (`CalculateDerivatives`, etc.) werden nicht überschrieben.

</div>
<div class="two">

```csharp
public class ConstantBlock : Block
{
    public double Value;

    public ConstantBlock(string name, double value) : base(name)
    {
        Value = value;
        Outputs.Add(new OutputDeclaration("Value"));
    }

    public override void CalculateOutputs(double time, 
        double[] cStates, double[] dStates, double[] inputs, double[] outputs)
    {
        outputs[0] = Value;
    }
}
```

</div>
</div>

---

<div class="columns">
<div>

### Algebraische Blöcke

Algebraische Blöcke haben keine Zustände. Ihr Ausgang `y` hängt direkt von den Eingängen `u` ab (`DirectFeedThrough = true`).

- **`GainBlock`**: Multipliziert einen Eingang mit einem konstanten Faktor.
- **`AddBlock`**: Addiert zwei Eingänge.
- **`SubtractBlock`**: Subtrahiert zwei Eingänge.
- **`MultiplyBlock`**: Multipliziert zwei Eingänge.
- **`DivideBlock`**: Dividiert zwei Eingänge.

</div>
<div>

![](../../Quellen/WS25/SFunctionContinuous/Block.DirectFeedThrough.svg)

</div>
</div>

---

<div class="columns">
<div class="two">

### Beispiel: `GainBlock`

Ein Block, der einen Eingang mit einem konstanten Faktor multipliziert.

- **Deklaration**: Ein Eingang `U`, ein Ausgang `Y`.
- **`CalculateOutputs`**: Setzt den Ausgang `outputs[0]` auf das Produkt aus `inputs[0]` und dem `Factor`.
- Der Eingang hat `DirectFeedThrough = true`.

</div>
<div class="two">

```csharp
public class GainBlock : Block
{
    public double Factor;
    public GainBlock(string name, double factor) : base(name)
    {
        Factor = factor;
        Inputs.Add(new InputDeclaration("U", true));
        Outputs.Add(new OutputDeclaration("Y"));
    }

    public override void CalculateOutputs(double time, 
        double[] cStates, double[] inputs, double[] outputs)
    {
        outputs[0] = Factor * inputs[0];
    }
}
```

</div>
</div>

---

<div class="columns">
<div class="two">

### Beispiel: `AddBlock`

Ein Block, der zwei Eingänge addiert.

- **Deklaration**: Zwei Eingänge `A` und `B`, ein Ausgang `Sum`.
- **`CalculateOutputs`**: Setzt den Ausgang `outputs[0]` auf die Summe von `inputs[0]` und `inputs[1]`.
- Beide Eingänge haben `DirectFeedThrough = true`.

</div>
<div class="two">

```csharp
public class AddBlock : Block
{
    public AddBlock(string name = "Add") : base(name)
    {
        Inputs.Add(new InputDeclaration("A", true));
        Inputs.Add(new InputDeclaration("B", true));
        Outputs.Add(new OutputDeclaration("Sum"));
    }

    public override void CalculateOutputs(double time, 
        double[] continuousStates, double[] inputs, 
        double[] outputs)
    {
        outputs[0] = inputs[0] + inputs[1];
    }
}
```

</div>
</div>

---

<div class="columns">
<div class="two">

### Der `IntegrateBlock`

Der `IntegrateBlock` ist der entscheidende Baustein zur Modellierung dynamischer Systeme.

- Er ist der **einzige grundlegende Block mit einem kontinuierlichen Zustand**.
- Sein Zustand `x` repräsentiert den integrierten Wert seines Eingangs `u`.
- `InitializeStates`: Setzt den Anfangswert des Zustands.
- `CalculateDerivatives`: Setzt die Zustandsableitung $\dot{x}$ gleich dem Eingang $u$.
- `CalculateOutputs`: Der Ausgang `y` des Blocks ist einfach der aktuelle Wert des Zustands `x`.

</div>
<div>

![](../../Quellen/WS25/SFunctionContinuous/Block.Integrate.svg)

</div>
</div>

---

### Beispiel: `IntegrateBlock`

Der zentrale Block zur Modellierung von Dynamik. Er integriert das Eingangssignal über die Zeit.

```csharp
public class IntegrateBlock : Block
{
    public double StartValue;

    public IntegrateBlock(string name, double startValue) : base(name)
    {
        StartValue = startValue;
        ContinuousStates.Add(new StateDeclaration("X"));
        Inputs.Add(new InputDeclaration("U", false));
        Outputs.Add(new OutputDeclaration("Y"));
    }

    public override void InitializeStates(...) { ... }
    public override void CalculateDerivatives(...) { ... }
    public override void CalculateOutputs(...) { ... }
}
```

---

<div class="columns">
<div class="">

### `IntegrateBlock`: Implementierung

Und das machen die Methoden des Blocks:

**`InitializeStates(...)`**

- Setzt den Anfangswert des Zustands `X` auf den konfigurierten `StartValue`.

**`CalculateDerivatives(...)`**

- Die Ableitung des Zustands $\dot{x}$ ist per Definition der Wert am Eingang `U`.

**`CalculateOutputs(...)`**

- Der Ausgang `Y` ist einfach der aktuelle Wert des Zustands `X`.

</div>
<div>

```csharp
public override void InitializeStates(double[] cStates)
{
    cStates[0] = StartValue;
}

public override void CalculateDerivatives(..., 
    double[] inputs, double[] derivatives)
{
    derivatives[0] = inputs[0];
}

public override void CalculateOutputs(...,
    double[] cStates, ..., double[] outputs)
{
    outputs[0] = cStates[0];
}
```

</div>
</div>

---

### Die `Model`- und `Connection`-Klassen

Das Gesamtmodell wird in einer `Model`-Klasse zusammengebaut, die alle Blöcke und deren Verbindungen (`Connection`) enthält.

<div class="columns top">
<div class="three">

```csharp
// Ausschnitt aus der Model-Klasse
class Model
{
    public List<Block> Blocks { get; }
    public List<Connection> Connections { get; }

    public void AddBlock(Block f) { ... }

    public void AddConnection(
        Block sourceBlock, int outputIndex, 
        Block targetBlock, int inputIndex) 
    { ... }
}
```

</div>
<div class="two">

```csharp
// Die Connection-Klasse
class Connection
{
    public Block Source { get; }
    public int Output { get; }
    public Block Target { get; }
    public int Input { get; }
}
```

</div>
</div>

---

## 8.5: Lösungsalgorithmen für Simulationen

Dieser Abschnitt umfasst die folgenden Inhalte:

- Die `Solver`-Klasse als zentraler Algorithmus
- Expliziter Euler-Solver (`EulerExplicitSolver`)
- Impliziter Euler-Solver (`EulerImplicitSolver`)
- Erkennung und Behandlung von algebraischen Schleifen (`EulerExplicitLoopSolver`, `EulerImplicitLoopSolver`)

---

<div class="columns">
<div class="two">

### Die `Solver`-Klasse

Die `Solver`-Klasse ist für die Durchführung der Simulation verantwortlich.

- Sie hält das `Model`.
- Sie verwaltet die Daten-Arrays für alle Blöcke:
  - `ContinuousStates` und `Derivatives`
  - `Inputs` und `Outputs`
  - `InputReadyFlags`
- Die `Solve`-Methode implementiert den eigentlichen Algorithmus (z.B. expliziter Euler).
- Sie enthält die Logik zur Erkennung und Behandlung von algebraischen Schleifen.

</div>
<div>

![](../../Quellen/WS25/SFunctionContinuous/Solver.svg)

</div>
</div>

---

<div class="columns">
<div class="two">

### Der `EulerExplicitSolver`

Implementiert den expliziten Euler-Algorithmus.

- Erbt von der abstrakten `Solver`-Klasse.
- Die `Solve`-Methode enthält die Haupt-Simulationsschleife.
- Die `CalculateOutputs`-Methode implementiert eine topologische Sortierung, um die Blöcke in der richtigen Reihenfolge auszuführen.
- Erkennt algebraische Schleifen und wirft eine Exception, da er diese nicht auflösen kann.

</div>
<div>

![](../../Quellen/WS25/SFunctionContinuous/Solver.Explicit.svg)

</div>
</div>

---

<div class="columns">
<div class="three">

### Simulationsschleife in `EulerExplicitSolver`

Die Klasse `EulerExplicitSolver` implementiert einen einfachen Algorithmus für die Berechnung des Modells. Der Algorithmus umfasst die folgenden Schritte und Unterschritte:

1.  **Initialisierung**: `InitializeStates` aller Blöcke aufrufen.
2. **Ausgänge berechnen**: `CalculateOutputs` für alle Blöcke aufrufen.
3. **Ableitungen berechnen**: `CalculateDerivatives` für alle Blöcke 
4.  **Zeitschleife** (`while t <= tmax`):
    a. **Zustände integrieren**: $x_{k+1} = x_k + h \cdot \dot{x}_k$.
    b. **Ausgänge berechnen**: `CalculateOutputs` für alle Blöcke aufrufen.
    c. **Ableitungen berechnen**: `CalculateDerivatives` für alle Blöcke aufrufen.
    e. **Zeit erhöhen**: $t = t + h$.

</div>
<div>

![](./Diagramme/Simulationsschleife_Explizit.svg)

</div>
</div>

---

![bg contain right:40%](./Screenshots/Einfaches_Beispiel_Euler_Explizit.png)

### Beispiel: `BasicExample`

Zweifache Integration einer Konstante.

**Modellaufbau:**
- Ein `ConstantBlock` erzeugt den Wert `1`.
- Ein erster `IntegrateBlock` integriert die Konstante.
- Ein zweiter `IntegrateBlock` integriert das Ergebnis des ersten.

**Mathematische Beschreibung:**
- Ausgang von `Integrate1`: $y_1(t) = \int u(t) dt = \int 1 dt = t$
- Ausgang von `Integrate2`: $y_2(t) = \int y_1(t) dt = \int t dt = \frac{1}{2}t^2$

---

![bg contain right:40%](./Screenshots/Einfache_Schleife_Euler_Explizit.png)

### Beispiel: `BasicLoopExample`

Ein Modell mit einer einfachen Rückkopplungsschleife.

**Modellaufbau:**
- Ein `IntegrateBlock` mit Anfangswert `1`.
- Der Ausgang des Integrators wird direkt auf seinen eigenen Eingang zurückgeführt.

**Mathematische Beschreibung:**
- Das Modell beschreibt die Differentialgleichung:
  $$ \dot{x}(t) = x(t) $$
- Die analytische Lösung dieser DGL ist die e-Funktion:
  $$ x(t) = e^t $$

---

![bg contain right:40%](./Screenshots/Einfache_Algebraische_Schleife_Euler_Explizit.png)

### Beispiel: `BasicAlgebraicLoopExample`

Ein Modell mit einer direkten algebraischen Schleife.

**Modellaufbau:**
- Ein `ConstantBlock` mit dem Wert `1`.
- Ein `SubtractBlock`.
- Der Ausgang des `SubtractBlock` wird auf seinen zweiten Eingang zurückgeführt. Der erste Eingang ist die Konstante.

**Mathematische Beschreibung:**
- Der `SubtractBlock` berechnet: $y = 1 - y$
- Die Lösung lautet: $2y = 1 \implies y = 0.5$

---

### **Erkennung** von algebraischen Schleifen

1.  Erstelle eine Liste `open` aller Blöcke.
2.  Iteriere, solange `open` nicht leer ist:
    a. Merke die Anzahl der Blöcke in `open`.
    b. Gehe alle Blöcke in `open` durch.
    c. Wenn alle Eingänge eines Blocks `f` bereit sind (`AreAllInputsReady`):
    - Berechne die Ausgänge von `f`.
    - Leite die Ausgänge an die Nachfolger weiter (`ForwardOutputs`).
    - Entferne `f` aus `open`.

    d. Wenn sich die Anzahl der Blöcke in `open` in einer Iteration nicht verringert hat, bedeutet das, dass kein Block mehr berechnet werden kann.
    e. Dies ist nur möglich, wenn eine zyklische Abhängigkeit (algebraische Schleife) vorliegt -> Wirf eine `Exception`.

---

<div class="columns">
<div class="two">

### Der `EulerExplicitLoopSolver`

Dieser Solver erweitert den `EulerExplicitSolver`, um algebraische Schleifen aufzulösen.

- Erbt von `EulerExplicitSolver`.
- Überschreibt die `CalculateOutputs`-Methode.
- Wenn eine algebraische Schleife erkannt wird, bricht er nicht ab, sondern beginnt einen iterativen Lösungsversuch.
- Er "errät" den Wert eines Eingangs in der Schleife und iteriert, bis der Fehler klein genug ist
- Für die Verwaltung der Schätzungen werden neue *Dictionaries* und Methoden eingeführt
- Außerdem werden neue Steuervariablen definiert, mit welchen der Algorithmus konfiguriert werden kann

</div>
<div>

![](../../Quellen/WS25/SFunctionContinuous/Solver.Explicit.Loop.svg)

</div>
</div>

---

### **Lösung** von algebraischen Schleifen

Der `EulerExplicitLoopSolver` löst die Schleife durch eine iterative Methode (**Banach-Fixpunktiteration**).

1.  Wenn eine Schleife erkannt wird (kein Fortschritt in `open`), wähle einen Block aus der Schleife.
2.  "Rate" den Wert für einen seiner noch nicht berechneten Eingänge (z.B. setze ihn auf 0). Markiere diesen als `InputGuessMaster`.
3.  Berechne die Schleife mit diesem geratenen Wert.
4.  Am Ende der Schleife wird der "geratene" Eingang selbst einen neuen Wert vom Vorgängerblock erhalten.
5.  Vergleiche den neuen Wert mit dem geratenen Wert. Die Differenz ist der Fehler.
6.  Wenn der Fehler zu groß ist, passe den geratenen Wert mit dem Relaxationsfaktor $\alpha = 0{,}1$ an:
    `guess = guess + (new_value - guess) * learning_rate`
7.  Wenn der Fehler klein genug ist, ist die Schleife gelöst.

---

![bg contain right](./Screenshots/Einfache_Algebraische_Schleife_Euler_Explizit_Loop.png)

### `BasicAlgebraicLoopExample` mit `EulerExplicitLoopSolver`

Wird das Modell mit dem `EulerExplicitLoopSolver` ausgeführt, kann die algebraische Schleife erfolgreich gelöst werden.

**Simulationsergebnis:**
- Der Solver iteriert in jedem Zeitschritt, um die Gleichung $y = 1 - y$ aufzulösen.
- Er konvergiert schnell gegen die korrekte Lösung $y = 0.5$.
- Der `Record`-Block zeichnet über die gesamte Simulationsdauer den konstanten Wert `0.5` auf.

---

### Praktische Anwendung: **Nichtlineares elektrisches Netzwerk** (1/2)

**Beispiel: Spannungsteiler mit nichtlinearem Widerstand**

Betrachten wir einen einfachen Spannungsteiler. Anstelle eines festen Lastwiderstands $R_2$ verwenden wir ein nichtlineares Element (z.B. eine Diode, eine Lampe, ein Thermistor), dessen Strom-Spannungs-Kennlinie nicht linear ist.

**Systemgleichungen:**
1.  Maschenregel: $V_{in} = I \cdot R_1 + V_{out}$
2.  Kennlinie des Elements: $I = f(V_{out})$

**Algebraische Schleife:**
Um $V_{out}$ zu berechnen, müssen wir eine Gleichung lösen, in der $V_{out}$ auf beiden Seiten implizit vorkommt:
$$ V_{out} = V_{in} - R_1 \cdot f(V_{out}) $$
Der Ausgang $V_{out}$ hängt direkt von sich selbst ab.

---

<div class="columns">
<div class="three">

### Praktische Anwendung: **Nichtlineares elektrisches Netzwerk** (2/2)

**Blockdiagramm der Schleife:**

Die Auflösung erfordert einen iterativen Prozess in jedem einzelnen Simulationsschritt:

1.  **Schätze** einen Wert für $V_{out}$.
2.  Berechne den Strom $I = f(V_{out})$.
3.  Berechne einen neuen Wert für $V_{out}' = V_{in} - I \cdot R_1$.
4.  Vergleiche $V_{out}'$ mit dem geschätzten $V_{out}$.
5.  Wenn die Differenz zu groß ist, passe die Schätzung an und wiederhole ab Schritt 2.

</div>
<div>

![width:1000px](./Diagramme/Algebraische_Schleife_Praxis.svg)

</div>
</div>

---

### Beispiel: **Diode** als nichtlineares Element (1/2)

Ein klassisches Beispiel für ein Bauteil mit nichtlinearer Kennlinie ist die Halbleiterdiode. Ihr Verhalten lässt sich durch die **Shockley-Gleichung** beschreiben.

**Strom-Spannungs-Kennlinie einer Diode**

Die Funktion $I = f(V_{out})$ für eine Diode lautet:

$$ I = I_S \left( e^{\frac{V_{out}}{n \cdot V_T}} - 1 \right) $$

Diese Gleichung beschreibt den exponentiellen Anstieg des Stroms, sobald die Spannung in Durchlassrichtung einen Schwellenwert überschreitet.

**Einsetzen in die Maschengleichung:**

$$ V_{out} = V_{in} - R_1 \cdot I_S \left( e^{\frac{V_{out}}{n \cdot V_T}} - 1 \right) $$

Diese transzendente Gleichung kann nicht analytisch nach $V_{out}$ umgeformt werden.

---

### Beispiel: **Diode** als nichtlineares Element (2/2)

**Parameter der Shockley-Gleichung:**

- **$I_S$ (Sperrsättigungsstrom):** Ein sehr kleiner Strom, der bei Anlegen einer Spannung in Sperrrichtung fließt (typ. $10^{-12}$ bis $10^{-6}$ A). Material- und temperaturabhängig.
- **$n$ (Idealitätsfaktor):** Ein dimensionsloser Faktor, der die Abweichung der Diode vom idealen Verhalten beschreibt (typ. zwischen 1 und 2).
- **$V_T$ (Temperaturspannung):** Hängt von der Temperatur ab. Bei Raumtemperatur ($\approx 25-26$ mV).

**Konsequenz für die Simulation:**

Die Auflösung der algebraischen Schleife erfordert in jedem Zeitschritt ein numerisches Iterationsverfahren:
- Unser Lehrframework nutzt eine **gedämpfte Banach-Fixpunktiteration (Picard-Iteration)** mit Relaxationsfaktor $\alpha = 0{,}1$.
- Im industriellen Umfeld (Simulink, SPICE) wird für solche stark nichtlinearen Kennlinien das schnellere, quadratisch konvergente **Newton-Raphson-Verfahren** eingesetzt.

---

### Praktische Anwendung: **Beschleunigung im Fluid** (Added Mass) (1/2)

**Beispiel: Beschleunigung eines Körpers (z.B. U-Boot) in Wasser**

Wenn ein Körper in einem Fluid beschleunigt, muss er auch das umgebende Fluid verdrängen und beschleunigen. Nach dem 3. Newtonschen Gesetz übt das Fluid eine entgegengesetzte Trägheitskraft auf den Körper aus. Diese wird als **hydrodynamische Zusatzmasse** (Added Mass) bezeichnet.

**Systemgleichungen:**
1.  **Newtonsches Gesetz:** $m \cdot a = F_{Netto} = F_{Antrieb} - F_{Widerstand} - F_{Zusatz}$
2.  **Widerstandskraft:** Hängt von der Geschwindigkeit ab, z.B. $F_{Widerstand} = c \cdot v^2$.
3.  **Zusatzmassenkraft:** Ist proportional zur Beschleunigung $a$: $F_{Zusatz} = m_{Zusatz} \cdot a$.

**Algebraische Schleife:**
Setzt man die Kraft-Terme in das Newtonsche Gesetz ein, erhält man eine Gleichung, in der die Beschleunigung $a$ auf beiden Seiten auftritt:
$$ m \cdot a = F_{Antrieb} - c \cdot v^2 - m_{Zusatz} \cdot a $$

---

<div class="columns">
<div class="two">

### Praktische Anwendung: Beschleunigung im Fluid (2/2)

**Blockdiagramm der Schleife:**

1.  Ein Solver (wie `EulerExplicitLoopSolver`) **schätzt** einen Startwert für die Beschleunigung `a`.
2.  Mit diesem `a` wird die Zusatzkraft $F_{Zusatz} = m_{Zusatz} \cdot a$ berechnet.
3.  Die Nettokraft wird berechnet: $F_{Netto} = F_{Antrieb} - F_{Widerstand} - F_{Zusatz}$.
4.  Daraus ergibt sich ein neuer Wert für die Beschleunigung: $a' = F_{Netto} / m$.
5.  Der Solver vergleicht $a'$ mit der Schätzung `a` und passt die Schätzung an, bis die Differenz unter einer Toleranzschwelle liegt.

</div>
<div>

![](./Diagramme/Algebraische_Schleife_Mechanik.svg)

</div>
</div>

---

<div class="columns">
<div class="two">

### Der `EulerImplicitSolver`

Implementiert den impliziten Euler-Algorithmus.

- In jedem Zeitschritt wird iterativ nach dem Zustand $\mathbf{x}_{k+1}$ gesucht, der die implizite Gleichung $\mathbf{x}_{k+1} = \mathbf{x}_k + h \mathbf{f}(t_{k+1}, \mathbf{x}_{k+1})$ erfüllt.
- **Lösungsverfahren in unserem Solver:** Gedämpfte **Banach-Fixpunktiteration (Picard-Iteration)** mit $\alpha = 0{,}1$:
  $$\dot{\mathbf{x}}^{(m+1)} = \dot{\mathbf{x}}^{(m)} + \alpha \cdot \left(\mathbf{f}(t_{k+1}, \mathbf{x}^{(m)}) - \dot{\mathbf{x}}^{(m)}\right)$$
- **Vorteil:** Extrem leicht zu implementieren; erfordert keine Jacobi-Matrix $\mathbf{J}$ und keine Matrixinversion.

</div>
<div class="two">

> [!WARNING]
> **Achtung vor dem Steifigkeits-Paradoxon!**  
> Die Banach-Iteration konvergiert nur, wenn die Abbildung eine Kontraktion ist ($h \cdot L < 1$, mit Lipschitz-Konstante $L = \|\mathbf{J}\|$).  
> Bei **steifen Systemen** ($L \gg 1$) zwingt dies zu winzigen Schritten ($h < 1/L$). Dadurch geht der Hauptvorteil des impliziten Eulers – die unbedingte A-Stabilität – verloren!  
> **Industrie-Solver** (z.B. MATLAB `ode15s`) nutzen daher stets das **Newton-Raphson-Verfahren** mit Jacobi-Matrix $(\mathbf{I} - h\mathbf{J})$, welches ohne Schrittweitenbeschränkung konvergiert.

</div>
</div>

---

<div class="columns">
<div class="three">

### Simulationsschleife in `EulerImplicitSolver`

1.  **Initialisierung**: Wie beim expliziten Solver.
2.  **Zeitschleife** (`while t <= tmax`):
    a. **Merke Zustände**: Speichere den aktuellen Zustand $x_k$.
    b. Setze die Ableitung $\dot{x}_{k+1}$ auf die bekannte Ableitung $\dot{x}_k$.
    c. **Wiederhole bis Konvergenz:**
    - Berechne den neuen Zustand $x_{k+1} = x_k + h \cdot \dot{x}_{k+1}$.
    - Berechne die Ausgänge $y_{k+1}$ mit dem neuen Zustand $x_{k+1}$.
    - Berechne die neue Ableitung $\dot{x}'_{k+1}$ mit den neuen Ausgängen.
    - Wenn sich die Ableitung kaum noch ändert, dann beende.
    - Ansonsten, passe $\dot{x}_{k+1}$ an und wiederhole.

    d. **Zeit erhöhen**: $t = t + h$.

</div>
<div>

![](./Diagramme/Simulationsschleife_Implizit.svg)

</div>
</div>

---

<div class="columns">
<div class="two">

### Der `EulerImplicitLoopSolver`

Kombiniert den impliziten Solver mit der Auflösung von algebraischen Schleifen.

- Erbt von `EulerImplicitSolver`.
- Überschreibt die `CalculateOutputs`-Methode mit der iterativen Logik des `EulerExplicitLoopSolver`.
- Dadurch können Modelle, die sowohl implizite Integration erfordern als auch algebraische Schleifen enthalten, stabil gelöst werden.

</div>
<div>

![](../../Quellen/WS25/SFunctionContinuous/Solver.Implicit.Loop.svg)

</div>
</div>

---

## 8.6: Höhere Integrationsverfahren (Heun & Runge-Kutta 4)

Dieser Abschnitt umfasst die folgenden Inhalte:

- Motivation von Mehrstufenverfahren (Ordnung vs. Rechenaufwand)
- Das Prädiktor-Korrektor-Verfahren von Heun (RK2)
- Das Butcher-Tableau als universelle Charakterisierung
- Das klassische Runge-Kutta-Verfahren 4. Ordnung (RK4)
- Dahlquist-Stabilitätsanalyse & Verhalten ungedämpfter Oszillatoren
- Numerischer Konvergenzvergleich (Doppelt-logarithmischer Plot)
- C#-Implementierung: `RungeKutta4Solver : Solver`

---

### Motivation für Mehrstufenverfahren

Warum reicht der explizite Euler für mechatronische Simulationen meist nicht aus?

- **Grenze der Verfahren 1. Ordnung:**
  - Expliziter Euler besitzt globale Konvergenzordnung $\mathcal{O}(h^1)$.
  - Um die Genauigkeit um den Faktor 10 zu verbessern, muss der Zeitschritt verzehnfacht verkleinert werden $\implies$ $10\times$ mehr Rechenschritte.
- **Die Kernidee von Mehrstufenverfahren (Runge-Kutta):**
  - Statt nur am Intervallanfang $t_k$ eine einzige Steigung zu berechnen, werden innerhalb des Schritts $[t_k, t_k + h]$ mehrere **Stützstellen (Stufen)** abgetastet.
  - Eine gewichtete Mittelung eliminiert führende Taylor-Fehlerterme.
  - **Vorteil:** Signifikant größere Zeitschritte bei identischer oder drastisch höherer Genauigkeit!

---

### Das Verfahren von Heun (RK2)

Das Verfahren von Heun ist ein zweistufiges **Prädiktor-Korrektor-Verfahren**:

- **Stufe 1 (Euler-Prädiktor):**
  Steigung am Intervallanfang berechnen und Zwischenzustand schätzen:
  $$\mathbf{k}_1 = \mathbf{f}(t_k, \mathbf{x}_k)$$
  $$\mathbf{x}_{\text{pred}} = \mathbf{x}_k + h \cdot \mathbf{k}_1$$

- **Stufe 2 (Korrektor via Trapezmittelung):**
  Steigung am Intervallende auswerten und beide Steigungen mitteln:
  $$\mathbf{k}_2 = \mathbf{f}(t_k + h, \mathbf{x}_{\text{pred}})$$
  $$\mathbf{x}_{k+1} = \mathbf{x}_k + \frac{h}{2} (\mathbf{k}_1 + \mathbf{k}_2)$$

- **Fehlerordnung:** Lokal $\mathcal{O}(h^3)$, globaler Verfahrensfehler $\mathcal{O}(h^2)$ (Verfahren 2. Ordnung).

---

### Das Butcher-Tableau

Ein allgemeines $s$-stufiges explizites Runge-Kutta-Verfahren lautet:
$$\mathbf{k}_i = \mathbf{f}\left(t_k + c_i h, \ \mathbf{x}_k + h \sum_{j=1}^{i-1} a_{ij} \mathbf{k}_j\right), \quad \mathbf{x}_{k+1} = \mathbf{x}_k + h \sum_{i=1}^s b_i \mathbf{k}_i$$

Dargestellt im standardisierten **Butcher-Tableau**:

<div class="columns top">
<div class="two">

**Allgemeines Butcher-Schema**
$$\begin{array}{c|c}
\mathbf{c} & \mathbf{A} \\
\hline
& \mathbf{b}^T
\end{array}
\iff
\begin{array}{c|cccc}
0 & 0 & 0 & \dots & 0 \\
c_2 & a_{21} & 0 & \dots & 0 \\
\vdots & \vdots & \ddots & \ddots & \vdots \\
c_s & a_{s1} & \dots & a_{s,s-1} & 0 \\
\hline
& b_1 & b_2 & \dots & b_s
\end{array}$$

</div>
<div class="two">

**Verfahren von Heun (RK2)**
$$\begin{array}{c|cc}
0 & 0 & 0 \\
1 & 1 & 0 \\
\hline
& 1/2 & 1/2
\end{array}$$

- $c_i$: Stützstellen im Zeitschritt
- $a_{ij}$: Kopplungsgewichte der Stufen
- $b_i$: Integrationsgewichte

</div>
</div>

---

### Klassisches Runge-Kutta 4. Ordnung (RK4)

Das Standard-Arbeitspferd der Ingenieursimulation (TwinCAT, Simulink, FMI):

- **Vier Stufen (Simpson-Quadratur-Prinzip):**
  $$\mathbf{k}_1 = \mathbf{f}(t_k, \mathbf{x}_k)$$
  $$\mathbf{k}_2 = \mathbf{f}\left(t_k + \frac{h}{2}, \mathbf{x}_k + \frac{h}{2} \mathbf{k}_1\right), \quad \mathbf{k}_3 = \mathbf{f}\left(t_k + \frac{h}{2}, \mathbf{x}_k + \frac{h}{2} \mathbf{k}_2\right)$$
  $$\mathbf{k}_4 = \mathbf{f}(t_k + h, \mathbf{x}_k + h \mathbf{k}_3)$$

- **Butcher-Tableau und Simpson-Zusammensetzung:**
  $$\begin{array}{c|cccc}
  0 & 0 & 0 & 0 & 0 \\
  1/2 & 1/2 & 0 & 0 & 0 \\
  1/2 & 0 & 1/2 & 0 & 0 \\
  1 & 0 & 0 & 1 & 0 \\
  \hline
  & 1/6 & 1/3 & 1/3 & 1/6
  \end{array}
  \quad
  \mathbf{x}_{k+1} = \mathbf{x}_k + \frac{h}{6} (\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4)$$
- **Fehlerordnung:** Global $\mathcal{O}(h^4)$ (Halbierung $h \to h/2 \implies$ Fehler sinkt um Faktor 16!).

---

### Stabilitätsanalyse: Die Dahlquist-Testgleichung

Zur Stabilitätsprüfung dient die lineare Testgleichung $\dot{x} = \lambda x$ mit $\lambda \in \mathbb{C}$:
$$x_{k+1} = R(z) \cdot x_k, \quad z = \lambda \cdot h \in \mathbb{C}$$
Das Stabilitätsgebiet $\mathcal{S}$ umfasst alle $z \in \mathbb{C}$, für die der Betrag $|R(z)| \le 1$ gilt:

| Verfahren | Stabilitätsfunktion $R(z)$ | Ordnung | Reelles Stabilitätsintervall |
| :--- | :--- | :---: | :--- |
| **Expliziter Euler (RK1)** | $1 + z$ | 1 | $[-2{,}0 \ ; \ 0]$ |
| **Heun (RK2)** | $1 + z + \frac{z^2}{2}$ | 2 | $[-2{,}0 \ ; \ 0]$ |
| **Klassisches RK4** | $1 + z + \frac{z^2}{2} + \frac{z^3}{6} + \frac{z^4}{24}$ | 4 | $[-2{,}785 \ ; \ 0]$ |

Reell negative Eigenwerte (gedämpfte Systeme) erfordern die Einhaltung dieser Schranken für den Zeitschritt $h$.

---

### Oszillatoren auf der Imaginärachse ($\lambda = \pm i\omega$)

Beim ungedämpften Federpendel liegen die Eigenwerte rein imaginär: $\lambda = \pm i\omega_0$.
Setzt man $z = i\beta$ mit $\beta = \omega_0 h > 0$ in die Stabilitätsfunktionen ein:

- **Expliziter Euler:**
  $$|R(i\beta)| = |1 + i\beta| = \sqrt{1 + \beta^2} > 1 \quad \forall \beta > 0$$
  $\implies$ **Immer instabil!** Die Schwingung schaukelt sich unweigerlich künstlich auf.

- **Heun (RK2):**
  $$|R(i\beta)| = \left|1 - \frac{\beta^2}{2} + i\beta\right| = \sqrt{1 + \frac{\beta^4}{4}} > 1 \quad \forall \beta > 0$$
  $\implies$ **Ebenfalls immer instabil!** Wächst langsamer als Euler, divergiert jedoch stets.

- **Klassisches RK4:**
  $$|R(i\beta)| \le 1 \quad \text{für} \quad |\beta| \le 2\sqrt{2} \approx 2{,}828$$
  $\implies$ **Bedingt stabil!** Für $h \le \frac{2{,}828}{\omega_0}$ bleibt die Simulation ungedämpfter Schwingungen stabil!

---

### Konvergenzordnung im Vergleich (Log-Log-Plot)

![bg right:55% width:650px](./Illustrationen/Solver_Konvergenzordnung.png)

- **Doppelt-logarithmische Skala:**
  $$\log_{10}(\text{Fehler}) = p \cdot \log_{10}(h) + C$$
  Die Steigung der Kurven entspricht exakt der Konvergenzordnung $p$!
- **Euler (Rot):** Steigung $p = 1$.
- **Heun (Blau):** Steigung $p = 2$.
- **RK4 (Grün):** Steigung $p = 4$.
- Bei $h = 0{,}01\,\text{s}$ ist RK4 um mehr als **7 Zehnerpotenzen** präziser als der explizite Euler!

---

### C#-Implementierung: `RungeKutta4Solver` (Stufen)

```csharp
BackupStates(); // Ausgangszustände x(t) sichern
// Stufe 1: Steigung bei t
CalculateOutputs(time);
CalculateDerivatives(time);
CopyDerivativesTo(_k1);
// Stufe 2: Vorschritt mit k1 auf t + dt/2
ApplyIntermediateStates(0.5 * timeStep, _k1);
CalculateOutputs(time + 0.5 * timeStep);
CalculateDerivatives(time + 0.5 * timeStep);
CopyDerivativesTo(_k2);
// Stufe 3: Vorschritt mit k2 auf t + dt/2
ApplyIntermediateStates(0.5 * timeStep, _k2);
CalculateOutputs(time + 0.5 * timeStep);
CalculateDerivatives(time + 0.5 * timeStep);
CopyDerivativesTo(_k3);
```
- Vier Stufen pro Zeitschritt; Hilfszustände werden isoliert im Blockgraphen berechnet.

---

### C#-Implementierung: `RungeKutta4Solver` (Finalisierung)

```csharp
// Stufe 4: Vorschritt mit k3 auf t + dt
ApplyIntermediateStates(timeStep, _k3);
CalculateOutputs(time + timeStep);
CalculateDerivatives(time + timeStep);
CopyDerivativesTo(_k4);

// Finale Zusammensetzung nach Simpson-Regel
foreach (var b in Blocks)
{
    for (int i = 0; i < b.ContinuousStates.Count; i++)
    {
        ContinuousStates[b][i] = _statesBackup[b][i] + (timeStep / 6.0) * (
            _k1[b][i] + 2.0 * _k2[b][i] + 2.0 * _k3[b][i] + _k4[b][i]
        );
    }
}
```
- Gewichtet die Stufen exakt mit $\frac{1}{6}(1 + 2 + 2 + 1)$ und sichert globale Ordnung $\mathcal{O}(h^4)$.

---

# Zusammenfassung Kapitel 8

- **Kontinuierliche dynamische Modelle** beschreiben Systeme mit kontinuierlicher Zeitentwicklung mittels **Differentialgleichungen**.
- Die **Zustandsraumdarstellung** ($\dot{\mathbf{x}}=\mathbf{f}(\mathbf{x},\mathbf{u})$) ist der mathematische Standard.
- **Semi-impliziter Euler (Euler-Cromer)** ist symplektisch ($\det(\mathbf{J})\equiv 1$) und erhält die Energie ungedämpfter Oszillatoren im Mittel.
- **Banach-Fixpunktiteration** löst implizite Gleichungen und algebraische Schleifen iterativ ohne Berechnung einer Jacobi-Matrix.
- **Mehrstufenverfahren (Heun RK2, klassisches RK4)** bieten dramatisch höhere Genauigkeit ($\mathcal{O}(h^2)$, $\mathcal{O}(h^4)$).
- **Stabilität auf der Imaginärachse:** Erst ab RK4 können ungedämpfte Schwingungssysteme mit expliziten Verfahren stabil integriert werden ($h\omega_0 \le 2\sqrt{2}$).
