---
marp: true
theme: fhooe
header: 'Kapitel 6: Hybride Dynamische Modelle (2025-11-20)'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

![bg right](./Titelbild.jpg)

# Kapitel 6: Hybride Dynamische Modelle

Dieses Kapitekl beinhaltet Folgendes:

TODO Kurze Übersicht über das Kapitel

---

![bg right](./Illustrationen/Abschnitt_1.jpg)

## 6.1: Fallbeispiel: Der Bouncing Ball

Dieser Abschnitt beinhaltet Folgendes:

TODO Kurze Übersicht der Inhalte

---

<div class="columns">
<div class="five">

### Mathematische Beschreibung des Bouncing Balls

Das System wird durch folgende Annahmen vereinfacht:
-   **Ein-dimensionales System:** Bewegung nur entlang der y-Achse.
-   **Konstante Erdbeschleunigung:** $g = 9.81 \, \text{m/s}^2$ (oder als positiv betrachtet für die Bewegung nach unten).
-   **Kein Luftwiderstand.**
-   **Instantane Kollisionen:** Der Aufprall auf den Boden findet ohne Zeitverzögerung statt.
-   **Restitutionskoeffizient:** Ein konstanter Wert $e \in [0, 1]$, der den Energieverlust bei jeder Kollision beschreibt.

</div>
<div class="four">

![w:1000](./Diagramme/BouncingBall_Zeit-Positions-Diagramm.tikz.svg)

</div>
</div>

---

<div class="columns">
<div>

### Differentialgleichungen der Bewegung

Während der Freiflugphase (kein Bodenkontakt) wird die Bewegung des Balls durch folgende Differentialgleichungen beschrieben:

**Position ($y$):**
$$ \frac{d^2y}{dt^2} = -g $$
oder als System erster Ordnung:
$$ \dot{y} = v \text{ und } \dot{v} = -g $$

-   $y(t)$: Position des Balls zur Zeit $t$.
-   $v(t)$: Geschwindigkeit des Balls zur Zeit $t$.
-   $g$: Erdbeschleunigung (positiv angenommen).

</div>
<div>

![w:1000](./Diagramme/BouncingBall_Flugparabel.tikz.svg)

</div>
</div>

---

<div class="columns">
<div class="two">

### Bedingungen für den Aufprall

Ein Aufprall auf den Boden (bei $y=0$) wird durch folgende Bedingung detektiert:

-   **Position:** $y(t) = 0$<br/>(Ball berührt den Boden)
-   **Geschwindigkeit:** $v(t) < 0$<br/>(Ball bewegt sich nach unten)

Diese Bedingungen definieren ein sogenanntes *Nulldurchgangsereignis*, bei dem die kontinuierliche Dynamik unterbrochen wird und eine diskrete Zustandsänderung (Kollision) stattfindet.

</div>
<div>

![w:1000](./Diagramme/BouncingBall_Aufprall_Bedingung.tikz.svg)

</div>
</div>

---

<div class="columns">
<div>

### Diskrete Zustandsänderung beim Aufprall

Zum Zeitpunkt des Aufpralls $t_e$, wenn $y(t_e)=0$ und $v(t_e^-) < 0$, ändert sich die Geschwindigkeit des Balls sprunghaft:

$$ v(t_e^+) = -e \cdot v(t_e^-) $$

-   $v(t_e^-)$: Geschwindigkeit unmittelbar vor dem Aufprall.
-   $v(t_e^+)$: Geschwindigkeit unmittelbar nach dem Aufprall.
-   $e$: Restitutionskoeffizient ($0 \le e \le 1$). Für $e=1$ ist die Kollision elastisch (kein Energieverlust), für $e=0$ ist sie vollkommen unelastisch (Ball bleibt am Boden liegen).

</div>
<div>

![w:1000](./Diagramme/BouncingBall_Aufprall_Zustandsaenderung.tikz.svg)

</div>
</div>

---

<div class="columns">
<div>

### Analytische Lösung: Freiflugphase

Die Bewegungsgleichungen $\dot{y} = v$ und $\dot{v} = -g$ können analytisch integriert werden.

Mit den Anfangsbedingungen $y(t_0) = y_0$ und $v(t_0) = v_0$ sind die Lösungen:

**Geschwindigkeit:**
$$ v(t) = v_0 - g(t - t_0) $$

**Position:**
$$ y(t) = y_0 + v_0(t - t_0) - \frac{1}{2}g(t - t_0)^2 $$

Diese Gleichungen gelten, solange der Ball sich in der Luft befindet ($y(t) > 0$).

</div>
<div>

![w:1000](./Diagramme/BouncingBall_Freiflug_Position_Geschwindigkeit.tikz.svg)

</div>
</div>

---

<div class="columns">
<div>

### Analytische Lösung: Zeitpunkt des Aufpralls

Um den Zeitpunkt des nächsten Aufpralls ($t_e$) zu finden, setzen wir $y(t_e) = 0$ und lösen die Positionsgleichung nach $t_e$ auf.

Ausgehend von $y_0, v_0$ zum Zeitpunkt $t_0$:
$$ 0 = y_0 + v_0(t_e - t_0) - \frac{1}{2}g(t_e - t_0)^2 $$

Dies ist eine quadratische Gleichung für $\Delta t = (t_e - t_0)$. Die positive Lösung (wenn der Ball nach unten fällt) ist der relevante Aufprallzeitpunkt.

</div>
<div>

![w:1000](./Diagramme/BouncingBall_Aufprall_Zeitpunkt.tikz.svg)

</div>
</div>

---

<div class="columns">
<div class="three">

### Analytische Lösung: Simulation der Kollisionen

Abfolge von Freiflugphasen und Kollisionsereignissen:

1.  **Initialisierung:** Startposition $y_0$ und Startgeschwindigkeit $v_0$ zum Zeitpunkt $t_0$.
2.  **Berechnung der Freiflugphase:** Solange $y(t) > 0$, wird die Bewegung mit den analytischen Lösungen für $y(t)$ und $v(t)$ berechnet.
3.  **Detektion des Aufpralls:** Bestimme den Zeitpunkt $t_e$ wann $y(t_e^-) = 0$ (unter der Bedingung $v(t_e^-) < 0$).
4.  **Zustandsupdate:** Berechne die neue Geschwindigkeit $v(t_e^+) = -e \cdot v(t_e^-)$ und setze $y(t_e^+) = 0$.
5.  **Iteration:** Setze $t_0 = t_e$, $y_0 = y(t_e^+)$, $v_0 = v(t_e^+)$ und wiederhole ab Schritt 2, bis die Simulationszeit endet oder der Ball zur Ruhe kommt ($v \approx 0$ und $y \approx 0$).

</div>
<div>

![](./Diagramme/BouncingBall_Simulation.svg)

</div>
</div>

---

![bg right](./Illustrationen/Abschnitt_2.jpg)

## 6.2: Fallbeispiel: Digitaler Sensor

Dieser Abschnitt beinhaltet Folgendes:

- Mathematische Beschreibung eines digitalen Sensors mit diskreter Abtastzeit.
- Diskussion der hybriden Systemeigenschaften.
- Erweiterung des Modells auf eine variable, signalgesteuerte Abtastzeit.

---

<div class="columns">
<div class="two">

### Fallbeispiel: Digitaler Sensor mit **diskreter Abtastzeit**

In diesem Beispiel modellieren wir einen einfachen digitalen Sensor, der ein kontinuierliches physikalisches Signal (z.B. eine Spannung) in ein digitales, zeitdiskretes Signal umwandelt.

- **Eingang:** Ein kontinuierliches, sich stetig änderndes Signal.
- **Verarbeitung:** Der Sensor misst den Wert des Eingangs zu festen, periodischen Zeitpunkten (Abtastung).
- **Ausgang:** Der zuletzt gemessene Wert wird bis zur nächsten Abtastung konstant gehalten (Zero-Order Hold).

Dieses System ist ein klassisches Beispiel für ein **zeitgesteuertes hybrides System**, bei dem diskrete Ereignisse (die Abtastungen) in regelmäßigen Abständen auftreten.

</div>
<div>

TODO Nano Banana Illustration eines digitalen Prozessors, der ein kontinuierliches Eingangssignal in ein diskretes ausgangssignal verwandelt. Comic-artige technische Zeichnung. Weißer Hintergrund. Format 2 breit, 3 hoch.

</div>
</div>

---

<div class="columns">
<div>

### Mathematische Beschreibung (1/2)

**1. Kontinuierliches Eingangssignal**

Das zu messende Signal sei eine sinusförmige Spannung $U(t)$:
$$ U(t) = A \cdot \sin(\omega t + \phi) $$
- $A$: Amplitude
- $\omega = 2\pi f$: Kreisfrequenz
- $\phi$: Phasenverschiebung

Dieses Signal existiert und ändert sich kontinuierlich über die Zeit.

</div>
<div>

![w:1000](./Diagramme/DigitalerSensor_Eingangssignal.tikz.svg)

</div>
</div>

---

<div class="columns">
<div class="two">

### Mathematische Beschreibung (2/2)

**2. Diskreter Abtastvorgang**

Der Sensor misst den Wert von $U(t)$ nur zu bestimmten Zeitpunkten $t_k$:
$$ t_k = k \cdot T_s, \quad k = 0, 1, 2, \dots $$
- $T_s$: Abtastperiode (z.B. 100 ms)

**3. Ausgangssignal (Zero-Order Hold)**

Zwischen zwei Abtastungen hält der Sensor den zuletzt gemessenen Wert konstant. Dies wird als **Zero-Order Hold (ZOH)** bezeichnet. Das Ausgangssignal $U_{sens}(t)$ ist eine stückweise konstante Funktion:
$$ U_{sens}(t) = U(t_k) \quad \text{für} \quad t_k \le t < t_{k+1} $$

</div>
<div>

![w:700](./Diagramme/DigitalerSensor_Abtastung.tikz.svg)

</div>
</div>

---

<div class="columns">
<div class="two">

### Hybride Eigenschaften des Systems

Das Gesamtsystem ist ein klassisches hybrides System:

- **Kontinuierliche Dynamik:** Das Eingangssignal $U(t)$ entwickelt sich kontinuierlich.
- **Diskrete Ereignisse:** Die Abtastzeitpunkte $t_k$ sind diskrete Ereignisse, die periodisch auftreten.
- **Diskrete Zustandsänderung:** Bei jedem Abtastereignis wird der interne Zustand des Sensors (der gespeicherte Messwert) aktualisiert. Dies führt zu einer sprunghaften Änderung des Ausgangssignals $U_{sens}(t)$.

Im Gegensatz zum Bouncing Ball sind die Ereignisse hier **zeitgesteuert** (periodisch) und nicht **zustandsgesteuert** (abhängig von $y(t) \le 0$).

</div>
<div>

![w:1000](./Diagramme/DigitalerSensor_Gesamtsystem.tikz.svg)

</div>
</div>

---

<div class="columns">
<div class="three">

### Erweiterung: Digitaler Sensor mit **variabler Abtastzeit**

Eine starre, periodische Abtastung kann ineffizient sein:
-   **Zu langsame Abtastung:** Wichtige Signaländerungen werden verpasst (Aliasing).
-   **Zu schnelle Abtastung:** Redundante Daten werden erzeugt, wenn sich das Signal kaum ändert.

**Ansatz:** Die Abtastrate wird dynamisch angepasst:
-   **Hohe Abtastrate** bei schnellen Änderungen.
-   **Niedrige Abtastrate** bei langsamen Änderungen.

Dies führt zu einem **ereignisgesteuerten hybriden System**, bei dem die Abtastereignisse nicht mehr rein zeitgesteuert, sondern auch vom Zustand des Systems abhängig sind.

</div>
<div>

![w:1000](./Diagramme/DigitalerSensor_VariableAbtastrate_Signal.tikz.svg)

</div>
</div>

---

### Steuerung der Abtastrate

Die Abtastrate wird durch ein zweites, kontinuierliches Signal gesteuert, das die Änderungsrate des Eingangssignals repräsentiert.

**1. Eingangssignal $U(t)$:**
$$ U(t) = A \cdot \sin(\omega t) $$

**2. Steuer-Signal (Änderungsrate) $c(t)$:**
Die Ableitung von $U(t)$ beschreibt, wie schnell es sich ändert. Wir verwenden den Absolutwert:
$$ c(t) = \left| \frac{dU}{dt} \right| = |A \omega \cos(\omega t)| $$

**3. Variable Abtastperiode $T_s(t)$:**
Die Zeit bis zur nächsten Abtastung wird umgekehrt proportional zur Änderungsrate festgelegt:
- **Schnelle Änderung (hohes $c(t)$) $\implies$ kurze Abtastperiode.**
- **Langsame Änderung (niedriges $c(t)$) $\implies$ lange Abtastperiode.**

---

TODO Folie zur Illustration des Eingangssignals und des Steuer-Signals mit Tikz-Illustration

---

<div class="columns">
<div class="two">

### Umsetzung der variablen Abtastung

**Ablauf bei jedem Abtast-Schritt $t_k$:**
1.  **Messen:** Der Wert des Eingangssignals $U(t_k)$ wird erfasst.
2.  **Bestimmen der Änderungsrate:** Der Wert des Steuersignals $c(t_k)$ wird ermittelt.
3.  **Berechnen des nächsten Zeitpunkts:** Die nächste Abtastperiode $\Delta t_k$ wird berechnet, z.B. über eine Formel wie:
    $$ \Delta t_k = \frac{T_{max}}{1 + \text{gain} \cdot c(t_k)} $$
    Der nächste Abtastzeitpunkt ist dann $t_{k+1} = t_k + \Delta t_k$.
4.  **Halten des Werts:** Der Ausgang $U_{sens}(t)$ wird für das Intervall $[t_k, t_{k+1})$ auf den Wert $U(t_k)$ gesetzt.

</div>
<div>

TODO Illustration des variabel abgetasteten Signals mit Tikz

</div>
</div>

---

![bg right](./Illustrationen/Abschnitt_3.jpg)

## 6.3: Allgemeine Definition

Dieser Abschnitt beinhaltet Folgendes:

TODO Kurze Übersicht der Inhalte

---

<div class="columns">
<div>

### Definition hybrider dynamischer Modelle

- **Kombination** aus kontinuierlichen und diskreten Dynamiken.
- **Zustandsänderungen** können kontinuierlich (beschrieben durch Differentialgleichungen) oder sprunghaft (ausgelöst durch Ereignisse) sein.
- **Beispiele:** Systeme mit physikalischen Prozessen, die durch Software gesteuert werden, oder mechanische Systeme mit Kontaktphänomenen.
- **Modellierung:** Oft durch Differential-Algebraische Gleichungen (DAEs) und endliche Automaten (State Machines).

</div>
<div>

![](./Illustrationen/HybrideModelle.jpg)

</div>
</div>

---

<div class="columns">
<div class="three">

### Abgrenzung zu rein kontinuierlichen und rein diskreten Modellen

- **Rein kontinuierliche Modelle:**
    - Zustand ändert sich stetig über die Zeit.
    - Beschrieben durch Differentialgleichungen.
    - Beispiel: Feder-Masse-Dämpfer-System.
- **Rein diskrete Modelle:**
    - Zustand ändert sich nur zu bestimmten Zeitpunkten.
    - Beschrieben durch Ereignisse / Zustandsübergänge.
    - Beispiel: Warteschlangensysteme, Petri-Netze.
- **Hybride Modelle:** Überbrücken die Lücke zwischen diesen beiden Welten, indem sie beide Arten von Dynamiken integrieren.

</div>
<div class="two">

![](./Illustrationen/KontinuierlichDiskretHybrid.jpg)

</div>
</div>

---

### Typische Anwendungsbeispiele

- **Regelungssysteme:**
    - Kontinuierlicher physikalischer Prozess (z.B. Temperaturregelung).
    - Diskret arbeitender digitaler Regler (z.B. PID-Regler in einem Mikrocontroller).
- **Schaltvorgänge:**
    - Elektrische Schaltungen, die ihren Zustand sprunghaft ändern (z.B. Relais, Transistoren).
    - Hydraulische oder pneumatische Ventile.
- **Physikalische Kontakte:**
    - Aufprall eines Balls auf eine Oberfläche.
    - Öffnen und Schließen von Türen oder Klappen.
- **Produktionssysteme:**
    - Kontinuierliche Materialflüsse (z.B. Flüssigkeiten in Rohren).
    - Diskrete Fertigungsschritte (z.B. Montage, Qualitätskontrolle).

---

### Herausforderungen bei der Simulation hybrider Systeme

- **Ereignisbehandlung:**
    - Präzise Lokalisierung von Ereigniszeitpunkten (z.B. Nulldurchgänge).
    - Vermeidung von "Event Missing" (Ereignis wird übersehen) oder "Event Jitter" (ungenauer Zeitpunkt).
- **Zustandskonsistenz:**
    - Sicherstellung korrekter Zustandsübergänge bei Ereignissen.
    - Behandlung von Zustands-Resets oder -Modifikationen.
- **Numerische Stabilität:**
    - Integratoren können bei steifen Systemen oder häufigen Ereignissen instabil werden.
    - Anpassung der Schrittweite.
- **Komplexität:**
    - Höherer Modellierungs- und Implementierungsaufwand.
    - Kombination von kontinuierlichen Solvern und Ereignis-Dispatchern.

---

### **Erweiterter** allgemeiner Formalismus (1/3)

<div class="columns top">
<div class="two">

**Bisheriger Formalismus (rein kontinuierlich)**

Basierend auf der Zustandsraumdarstellung aus Kapitel 4:

**Zustandsgleichung (Ableitungen):**
$$ \dot{x}(t) = f(t, x(t), u(t)) $$

**Ausgangsgleichung:**
$$ y(t) = g(t, x(t), u(t)) $$

- $x(t)$: Vektor der **kontinuierlichen** Zustände
- $u(t)$: Vektor der Eingänge
- $y(t)$: Vektor der Ausgänge

</div>
<div class="two">

**Erweiterung für hybride Systeme**

Um hybride Systeme zu modellieren, erweitern wir diesen Formalismus um:

1.  **Diskrete Zustände ($x_d$)**: Speichern von Zustandsinformation, die sich nur sprunghaft ändert (z.B. der aktuelle Modus eines Schalters).

2.  **Update-Funktion ($h$)**: Definiert die sprunghafte Änderung der Zustände bei einem Ereignis.

3.  **Zero-Crossing-Funktion ($z$)**: Erkennt, wann ein diskretes Ereignis eintritt (z.B. Kollision, Schwellwert erreicht).

</div>
</div>

---

### **Erweiterter** allgemeiner Formalismus (2/3)

**Zustände:**
Ein hybrides System besitzt zwei Arten von Zuständen:
- **Kontinuierliche Zustände $x_c(t) \in \mathbb{R}^{n_c}$**: Ändern sich stetig (z.B. Position, Geschwindigkeit).
- **Diskrete Zustände $x_d(t) \in \mathbb{R}^{n_d}$**: Ändern sich nur zu diskreten Zeitpunkten (z.B. Schaltzustand, Zähler).

**Funktionen:**
Die Dynamik wird durch vier Kernfunktionen beschrieben:

1.  **Ableitungsfunktion $f$**: Definiert die kontinuierliche Dynamik.
    $$ \dot{x}_c(t) = f(t, x_c(t), x_d(t), u(t)) $$

2.  **Ausgangsfunktion $g$**: Berechnet die Ausgänge des Blocks.
    $$ y(t) = g(t, x_c(t), x_d(t), u(t)) $$

---

### **Erweiterter** allgemeiner Formalismus (3/3)

3.  **Zero-Crossing-Funktion $z$**:
    Eine Vektor-wertige Funktion, deren Nulldurchgänge Ereignisse signalisieren.
    $$ z(t, x_c(t), x_d(t), u(t)) \in \mathbb{R}^{n_z} $$
    Ein Ereignis tritt zum Zeitpunkt $t_e$ auf, wenn eine Komponente $z_i$ das Vorzeichen wechselt (d.h. $z_i(t_e) = 0$).

4.  **Update-Funktion $h$**:
    Wird zum Ereigniszeitpunkt $t_e$ aufgerufen und berechnet die neuen Zustände $x_c^+$ und $x_d^+$ unmittelbar nach dem Ereignis.
    $$ (x_c(t_e^+), x_d(t_e^+)) = h(t_e, x_c(t_e^-), x_d(t_e^-), u(t_e)) $$
    - $x_c(t_e^-), x_d(t_e^-)$: Zustände unmittelbar *vor* dem Ereignis.

Dieser Formalismus erlaubt die Modellierung des komplexen Zusammenspiels von kontinuierlicher Entwicklung und sprunghaften Zustandsänderungen.

---

![bg right](./Illustrationen/Abschnitt_4.jpg)

## 6.4: Softwarearchitektur

Dieser Abschnitt beinhaltet Folgendes:

TODO Kurze Übersicht der Inhalte

---

### Erweiterte `Block`-Klasse

Die `Block`-Klasse, der zentrale Baustein unserer Simulationsumgebung, wurde erheblich erweitert, um diskrete Zustände, Ereignisse und flexible Abtastzeiten verwalten zu können:

-   **`DiscreteStates`**: Eine Liste von diskreten Zustandsvariablen, die sich nur sprunghaft ändern.
-   **`ZeroCrossings`**: Eine Liste von Ereignissignalen, deren Nulldurchgänge diskrete Ereignisse auslösen.
-   **`SampleTime`**: Ein Objekt, das die Abtasteigenschaften des Blocks definiert (kontinuierlich, diskret, variabel).
-   **`GetNextVariableHitTime(...)`**: Eine Methode zur Bestimmung des nächsten Zeitpunkts, zu dem ein Block mit variabler Abtastzeit aktiv werden muss.
-   **`CalculateZeroCrossings(...)`**: Eine Methode zur Berechnung der Werte der Zero-Crossing-Funktionen.
-   **`UpdateStates(...)`**: Eine Methode, die bei diskret getakteten Blöcken oder nach dem Erkennen eines Nulldurchgangs aufgerufen wird, um die Zustände (kontinuierlich und/oder diskret) sprunghaft anzupassen.

---

<div class="columns">
<div class="two">

TODO Überschrift und Text

</div>
<div class="three">

![Klassendiagramm Block](../../Quellen/WS25/SFunctionHybrid/Block.svg)

</div>
</div>

---

```csharp
public abstract class Block
{
    public List<StateDeclaration> ContinuousStates { get; }
    public List<StateDeclaration> DiscreteStates { get; }
    public List<InputDeclaration> Inputs { get; }
    public List<OutputDeclaration> Outputs { get; }
    public List<ZeroCrossingDeclaration> ZeroCrossings { get; }

    public SampleTime SampleTime { get; }

    virtual public void InitializeStates(
        double[] cStates, double[] dStates);
    virtual public double GetNextVariableHitTime(
        double time, double[] cStates, double[] dStates, double[] inputs);
    virtual public void CalculateOutputs(
        double time, double[] cStates, double[] dStates, double[] inputs, double[] outputs);
    virtual public void CalculateDerivatives(
        double time, double[] cStates, double[] dStates, double[] inputs, double[] derivatives);
    virtual public void CalculateZeroCrossings(
        double time, double[] cStates, double[] dStates, double[] inputs, double[] zeroCrossings);
    virtual public void UpdateStates(
        double time, double[] cStates, double[] dStates, double[] inputs);
}
```

---

<div class="columns">
<div class="three">

### Deklaration von Schnittstellen und Ereignissen

Neben den bereits bekannten Deklarationen für Zustände (`StateDeclaration`), Eingänge (`InputDeclaration`) und Ausgänge (`OutputDeclaration`) wurde eine neue `ZeroCrossingDeclaration` hinzugefügt, um die Zero-Crossing-Signale eines Blocks zu beschreiben.

```csharp
namespace SFunctionHybrid.Framework.Declarations
{
    public class ZeroCrossingDeclaration : Declaration
    {
        public ZeroCrossingDeclaration(string name) : base(name)
        {

        }
    }
}
```

</div>
<div class="two">

![Klassendiagramm Deklarationen](../../Quellen/WS25/SFunctionHybrid/Declaration.svg)

</div>
</div>

---

### Abtastzeiten (`SampleTime`)

Das Konzept der Abtastzeit (`SampleTime`) wurde eingeführt, um dem Solver mitzuteilen, wie und wann ein Block seine Zustände aktualisieren und Ausgänge berechnen soll. Dies wird durch eine Klassenhierarchie abgebildet:

-   **`ContinuousSampleTime`**: Der Block ist kontinuierlich und wird bei jedem Integrationsschritt des Solvers berechnet (Standard für kontinuierliche Blöcke).
-   **`DiscreteSampleTime`**: Der Block ist diskret und wird in festen, periodischen Intervallen aktualisiert. Definiert durch `Offset` (Startzeitpunkt) und `Period` (Abtastperiode).
-   **`VariableSampleTime`**: Der Block ist ereignisgesteuert und wird zu variablen Zeitpunkten aktualisiert, die der Block selbst über `GetNextVariableHitTime` meldet. Definiert durch einen initialen `Offset`.
-   **`ConstantSampleTime`**: Für Blöcke, die konstante Werte liefern und keine Abtastzeit im eigentlichen Sinne benötigen (z.B. `ConstantBlock`).
-   **`InheritedSampleTime`**: Die Abtastzeit wird vom übergeordneten System oder den Eingangsblöcken geerbt (Standard für algebraische Blöcke).

---

<div class="columns">
<div class="three">

TODO Überschrift

```csharp
public abstract class SampleTime { }

public class ContinuousSampleTime : SampleTime { }

public class DiscreteSampleTime : SampleTime
{
    public double Offset { get; }
    public double Period { get; }
    public DiscreteSampleTime(double offset, double period) { /* ... */ }
}

public class VariableSampleTime : SampleTime
{
    public double Offset { get; }
    public VariableSampleTime(double offset) { /* ... */ }
}

public class ConstantSampleTime : SampleTime { }

public class InheritedSampleTime : SampleTime { }
```

</div>
<div>

![Klassendiagramm SampleTime](../../Quellen/WS25/SFunctionHybrid/SampleTime.svg)

</div>
</div>

---

### Neue Block-Typen für Hybride Systeme

-   **Diskrete Zeitintegratoren und Zero-Order Holds:**
    -   `DiscreteTimeIntegratorBlock`: Integriert ein Signal in festen diskreten Schritten.
    -   `ZeroOrderHoldBlock`: Hält den letzten abgetasteten Wert eines kontinuierlichen Signals für eine definierte Abtastperiode.

-   **Zero-Crossing-Detektoren:**
    -   `HitLowerLimitBlock`: Erzeugt ein Ereignis, wenn ein Signal einen unteren Grenzwert erreicht.
    -   `HitUpperLimitBlock`: Erzeugt ein Ereignis, wenn ein Signal einen oberen Grenzwert erreicht.

-   **Variable Abtastzeit-Blöcke:**
    -   `VariableSampleTimeBlock`: Ein Block, dessen Abtastzeitpunkte dynamisch durch ein Eingangssignal gesteuert werden.
    -   `VariableZeroOrderHoldBlock`: Ein Zero-Order Hold, dessen Abtastrate variabel ist.

---

<div class="columns">
<div class="three">

### Erweiterte Solver-Implementierungen

TODO Text

-   Sie berücksichtigt nun `DiscreteStates` bei der Initialisierung und Zustandsspeicherung.
-   Die Logik zur Nulldurchgangsdetektion wurde erweitert und nutzt die `ZeroCrossings`-Deklarationen der Blöcke.
-   Die `UpdateStates`-Methode des Solvers ruft nun die `UpdateStates`-Methode der Blöcke basierend auf ihren `SampleTime`-Eigenschaften (diskret, variabel) oder erkannten Zero-Crossings auf.

</div>
<div class="two">

![Klassendiagramm Solver](../../Quellen/WS25/SFunctionHybrid/Solver.svg)

</div>
</div>

---

![bg right](./Illustrationen/Abschnitt_5.jpg)

## 6.5: Nulldurchgangsdetektion

Dieser Abschnitt beinhaltet Folgendes:

TODO Kurze Übersicht der Inhalte

---

TODO Folien zum Algorithmus für Nulldurchgangsdetektion

---

TODO Einleitende Folien zum Beispiel IntegrateWithLowerLimit

---

![bg contain right](./Screenshots/IntegrateWithLowerLimit_Explizit.png)

TODO Text (insbesondere Hinweis auf die engeren Abtastzeiten am Nullpunkt)

---

TODO Einleitende Folie zur Umsetzung des Bouncing Ball Beispiels mit der erweiterten Softwarearchitektur und dem Algorithmus für Nulldurchgangsdetektion

---

### Implementierung des Modells (`BouncingBallExample.cs`)

- **`ConstantBlock("Gravity", -9.81)`:** Liefert die konstante Beschleunigung.
- **`IntegrateWithResetBlock("Velocity", 10)`:**
    - Integriert die Gravitationsbeschleunigung zur Geschwindigkeit.
    - Besitzt eine Reset-Funktion, die bei einem Aufprall die Geschwindigkeit anpasst.
- **`IntegrateBlock("Position", 10)`:**
    - Integriert die Geschwindigkeit zur Position.
- **`HitLowerLimitBlock("HitLowerLimit", 0)`:**
    - Detektiert den Nulldurchgang, wenn die Position den Boden ($0$) erreicht.
    - Sein Ausgang wird als Trigger für den Reset des Geschwindigkeits-Integrators verwendet.
- **`GainBlock("Damping", -0.8)`:**
    - Multipliziert die Geschwindigkeit mit dem negativen Restitutionskoeffizienten, um die neue Geschwindigkeit nach dem Aufprall zu berechnen.
- **`RecordBlock`s:** Zum Aufzeichnen von Position und Geschwindigkeit für die Visualisierung.

---

### `IntegrateWithResetBlock` für die Geschwindigkeit

- **Zweck:** Ein Integrator, dessen Zustand (Geschwindigkeit) bei einem externen Signal (Aufprall) zurückgesetzt werden kann.
- **Kontinuierlicher Zustand:** Speichert die aktuelle Geschwindigkeit.
- **`CalculateDerivatives`:** Berechnet die Ableitung der Geschwindigkeit (die Beschleunigung).
- **`UpdateStates` Methode:**
    - Wird vom Solver aufgerufen, wenn ein Zero-Crossing (Aufprall) erkannt wurde.
    - Prüft ein Eingangssignal (vom `HitLowerLimitBlock`).
    - Wenn das Signal aktiv ist, wird der Geschwindigkeitszustand auf den gedämpften Wert gesetzt.
    - `continuousStates[0] = inputs[2];` (wobei `inputs[2]` der gedämpfte Geschwindigkeitswert ist).

---

### `HitLowerLimitBlock` für die Bodenerkennung

- **Zweck:** Erzeugt ein Zero-Crossing-Signal, wenn ein Eingangswert (Position) einen definierten unteren Grenzwert (Boden bei 0) erreicht.
- **`Inputs.Add(new InputDeclaration("U", true))`:** Nimmt die aktuelle Position als Eingang.
- **`ZeroCrossings.Add(new ZeroCrossingDeclaration("Z"))`:** Deklariert ein Zero-Crossing-Signal.
- **`CalculateZeroCrossings` Methode:**
    - Berechnet die Zero-Crossing-Funktion: `zeroCrossings[0] = inputs[0] - LowerLimit;`
    - Wenn `inputs[0]` (Position) kleiner oder gleich `LowerLimit` (0) wird, wechselt das Signal von positiv zu negativ (oder umgekehrt, je nach Start).
    - Dieses Signal wird vom Solver verwendet, um den genauen Zeitpunkt des Aufpralls zu lokalisieren.

---

![bg contain right](./Screenshots/Bouncing_Ball_Naive_Explizit.png)

TODO Text

---

![bg contain right](./Screenshots/Bouncing_Ball_Naive_Implizit.png)

TODO Text (insbesondere, warum bricht der Ball durch die Nulllinie)

---

TODO Folien zum erweiterten modell (BouncingBallExtendedExample)

---

![bg contain right](./Screenshots/Bouncing_Ball_Erweitert_Explizit.png)

TODO Text

---

![bg contain right](./Screenshots/Bouncing_Ball_Erweitert_Implizit.png)

TODO Text

---

![bg right](./Illustrationen/Abschnitt_6.jpg)

## 6.6: Diskrete Abtastzeiten

Dieser Abschnitt beinhaltet Folgendes:

TODO Kurze Übersicht der Inhalte

---

TODO Folien zur Blöcken mit diskreter Abtastzeit (Offset und Periode)

---

![bg right](./Illustrationen/Abschnitt_7.jpg)

## 6.7: Variable Abtastzeiten

Dieser Abschnitt beinhaltet Folgendes:

TODO Kurze Übersicht der Inhalte

---

TODO Folien zu Blöcken mit variabler Abtastzeit (GetNextVariableHitTime)