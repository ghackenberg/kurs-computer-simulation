# Moodle-Quiz 4 (Termin 10): Diskrete Ereignissimulation, Hybride Dynamik & Synthese

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (FH Oberösterreich, Campus Wels)  
**Prüfungszeitpunkt:** Beginn Termin 10  
**Bearbeitungszeit:** 15–20 Minuten  
**Säule:** Säule 1 (Theoretische & numerische Grundlagen, Gewicht: 7,5 % der Gesamtnote)  
**Prüfungsmodus:** Präsenz im EDV-Labor / Safe Exam Browser in Moodle  
**Zulässige Hilfsmittel:** Taschenrechner (nicht-programmierbar) oder Windows-Rechner; keine LLM-Nutzung / Closed-Book

---

## Didaktische Zielsetzung & Einbettung

Dieses Abschlussquiz der Säule 1 überprüft das Verständnis für stochastische, ereignisdiskrete Prozesse (DES) und Warteschlangensysteme, die exakte Behandlung hybrider dynamischer Systeme mit unstetigen Kontakten (Zero-Crossing, Zeno-Vermeidung) sowie die industrielle Synthese und Schnittstellenstandards (FMI / Virtuelle Inbetriebnahme).

### Stoffabgrenzung & Synthesecharakter
* **Inhalte:** Kapitel 09 (Diskrete dynamische Modelle, DES, Future Event List / `PriorityQueue`, Little's Gesetz $L = \lambda W$, Inversionsmethode für Zufallszahlen, M/M/1-Warteschlangen), Kapitel 10 (Hybride dynamische Modelle, Schaltfunktion $z(\mathbf{x}) = 0$, Zero-Crossing-Bisektion vs. Tunneling, Stoßgesetze, Zeno-Kollaps / Chattering-Vermeidung), Kapitel 11 (Epilog, FMI-Standard: Model Exchange vs. Co-Simulation, Virtuelle Inbetriebnahme VIBN).
* **Synthese:** Als Abschluss der Theorieprüfung greift Quiz 4 auch auf das Verständnis kontinuierlicher und diskreter Interaktionsmuster zurück.

---

## Fragenübersicht

| Nr. | Thema | Fragentyp | Bloom-Taxonomie | Punkte |
| :---: | :--- | :--- | :--- | :---: |
| **Q4.1** | Little's Gesetz & M/M/1-Warteschlangensystem | Numerische Berechnung | Anwenden / Berechnen (L3) | 2,0 |
| **Q4.2** | Stochastik & Inversionsmethode ($\mathcal{U}(0,1) \to \text{Exp}(\lambda)$) | Stochastik & Code (Single-Choice) | Verstehen / Analysieren (L3) | 1,5 |
| **Q4.3** | Zero-Crossing-Bisektion vs. Tunneling-Effekt | Hybride Dynamik (Single-Choice) | Analysieren / Bewerten (L4) | 1,5 |
| **Q4.4** | Zeno-Effekt & Chattering-Vermeidung bei Stößen | Nichtlineare Dynamik (Multiple-Select) | Verstehen / Differenzieren (L3) | 1,5 |
| **Q4.5** | Industriestandard FMI: Model Exchange vs. Co-Simulation | Softwarearchitektur (Single-Choice) | Verstehen / Systematik (L2) | 1,5 |
| **Gesamt** | | | | **8,0 Pkt.** |

---

## Detaillierte Fragen & Musterlösungen

### Frage 4.1: Little's Gesetz & M/M/1-Warteschlangensystem (Berechnung)

#### Fragetext
Eine automatisierte optische Prüfstation in einer flexiblen Fertigungszelle wird als stationäres $M/M/1$-Warteschlangensystem modelliert:
* Mittlere Ankunftsrate neuer Werkstücke: $\lambda = 24\,\frac{\text{Teile}}{\text{h}}$ (Poisson-Prozess)
* Mittlere Prüfdauer an der Station: $\bar{t}_s = 2{,}0\,\text{Minuten} = \frac{1}{30}\,\text{h}$ (exponentialverteilt mit Servicerate $\mu = \frac{1}{\bar{t}_s} = 30\,\frac{\text{Teile}}{\text{h}}$)

1. Die mittlere Verweildauer eines Werkstücks im Gesamtsystem (Warten in der Schlange + Prüfung) beträgt:
   $$W = \frac{1}{\mu - \lambda} = \frac{1}{30 - 24}\,\text{h} = \frac{1}{6}\,\text{h} = 10{,}0\,\text{Minuten}$$

Berechnen Sie die **mittlere Anzahl an Bauteilen $L$ im Gesamtsystem** (Puffer + Prüfstation) unter Anwendung von **Little's Gesetz**:
$$L = \lambda \cdot W$$

*(Geben Sie die mittlere Bauteilanzahl als Dezimalzahl ohne Einheit an, z. B. `5.0`)*

#### Antwortwert
* **Musterlösung:** `4.0` (akzeptierter Toleranzbereich: `3.9` bis `4.1`)

#### Mathematische Herleitung & Didaktik
* Nach Little's Gesetz:
  $$L = \lambda \cdot W = 24\,\text{h}^{-1} \cdot \frac{1}{6}\,\text{h} = 4{,}0\,\text{Bauteile}$$
* Alternativer Kontrollpfad über die Systemauslastung $\rho$:
  $$\rho = \frac{\lambda}{\mu} = \frac{24}{30} = 0{,}80 \quad (80\,\%)$$
  $$L = \frac{\rho}{1 - \rho} = \frac{0{,}80}{1 - 0{,}80} = \frac{0{,}80}{0{,}20} = 4{,}0\,\text{Bauteile}$$

*Didaktischer Hinweis:* Little's Gesetz ist distributionsunabhängig und gilt universell für beliebige stationäre Systeme. Wer vergisst, die Einheiten aufeinander abzustimmen (z. B. $24\,\text{Teile/h} \times 10\,\text{Min}$ multipliziert ohne Stundenkonversion), erhält das unplausible Ergebnis $240$.

---

### Frage 4.2: Stochastik & Inversionsmethode ($\mathcal{U}(0,1) \to \text{Exp}(\lambda)$)

#### Fragetext
Zur Generierung stochastischer Zwischenankunftszeiten $\Delta t$ eines Poisson-Prozesses mit Rate $\lambda$ wird die analytische **Inversionsmethode** verwendet. Die kumulative Verteilungsfunktion (CDF) der Exponentialverteilung lautet:
$$F(t) = 1 - e^{-\lambda t} \quad \text{für } t \ge 0$$
Setzt man $F(t) = U$ mit einer gleichverteilten Pseudozufallsvariable $U \sim \mathcal{U}(0,1)$, ergibt die analytische Inversion:
$$t = -\frac{1}{\lambda} \ln(1 - U)$$

In professionellen Simulations-Engines findet man im C#-Code jedoch häufig folgende Zeile:
```csharp
double dt = -Math.Log(random.NextDouble()) / lambda;
```
Hier wird direkt `Math.Log(U)` anstelle von `Math.Log(1.0 - U)` berechnet.

Warum ist diese Codezeile **mathematisch exakt äquivalent** und führt zur identischen Verteilung?

#### Antwortoptionen
* [x] A) Wenn $U$ auf dem offenen Intervall $(0, 1)$ standard-gleichverteilt ist, dann ist auch die Zufallsvariable $V = (1 - U)$ identisch standard-gleichverteilt auf $(0, 1)$. Da beide Variablen dieselbe Wahrscheinlichkeitsdichte besitzen, erzeugt $-\frac{1}{\lambda}\ln(U)$ exakt dieselbe stochastische Exponentialverteilung wie $-\frac{1}{\lambda}\ln(1 - U)$, spart jedoch in jedem Ziehungsschritt eine Gleitkomma-Subtraktion ein.
* [ ] B) Der natürliche Logarithmus kehrt das Vorzeichen von $(1 - U)$ im CPU-Register automatisch um, sodass $1 - U = U$ gilt.
* [ ] C) Die Methode `random.NextDouble()` liefert nur negative Zahlen, weshalb das Minuszeichen vor dem Logarithmus wegfällt.
* [ ] D) Dies ist ein bekannter KI-Halluzinationsfehler; der Code erzeugt eine Poisson-Verteilung statt einer Exponentialverteilung.

#### Didaktische Begründung
* *Option A ist das elementare Symmetrieprinzip der kontinuierlichen Gleichverteilung:* Ist $U \sim \mathcal{U}(0,1)$, so ist $1 - U \sim \mathcal{U}(0,1)$. Die Transformation ist eine Standard-Mikrooptimierung in diskreten Simulationskernen.
* *Distraktoren B, C, D sind mathematischer und technischer Unsinn.*

---

### Frage 4.3: Zero-Crossing-Bisektion vs. Tunneling-Effekt (Hybride Dynamik)

#### Fragetext
In einer hybriden mechatronischen Simulation (z. B. elastischer Teile-Anschlag, Flipper-Ball) prallt ein Körper (Radius $R$, Masse $m$) mit hoher Geschwindigkeit $v$ auf eine starre Wand bei $x = x_{\text{Wand}}$.  
Die Kontakt-Schaltfunktion lautet:
$$z(\mathbf{x}) = x(t) + R - x_{\text{Wand}}$$

Ein naiver Festschritt-Simulator prüft die Kollision erst am Ende jedes Zeitschritts $h$:
```csharp
// Nach Integrationsschritt mit Schrittweite h:
if (x + R >= x_Wand)
{
    vx = -e * vx; // Stoßumkehr
}
```

Welche gravierenden physikalischen Fehler treten bei diesem naiven Ansatz auf, und wie löst ein **hybrider Simulator mit Zero-Crossing-Bisektion** das Problem ingenieurgerecht?

#### Antwortoptionen
* [x] A) **Tunneling und Energieerzeugung:** Bei hoher Geschwindigkeit kann $v \cdot h$ größer sein als die Wandstärke; der Ball durchdringt die Wand unbemerkt im Zeitschritt (**Tunneling**). Wird der Kontakt erkannt, ist der Ball bereits tief eingedrungen; das Spiegeln der Geschwindigkeit an falscher Position führt zu Geisterhaftung oder unphysikalischem Energiezuwachs. **Die Zero-Crossing-Bisektion** überwacht den Vorzeichenwechsel $z(t_k) \cdot z(t_{k+1}) \le 0$, friert die kontinuierliche Integration ein, findet den exakten Kontaktzeitpunkt $t^*$ via Bisektion bis auf $|z| < \varepsilon$, führt den Stoß exakt auf der Berührfläche durch ($v^+ = -e \cdot v^-$) und startet die Integration mit neuem Anfangszustand sauber neu.
* [ ] B) Der naive Ansatz funktioniert exakt; Zero-Crossing wird in der Praxis nur verwendet, um DirectX-Shader zu synchronisieren.
* [ ] C) Das Tunneling lässt sich ohne Bisektion verhindern, indem man die Stoßzahl $e$ auf Werte größer als $1{,}0$ anhebt.
* [ ] D) Bei Festschritt-Simulationen tritt Tunneling prinzipiell niemals auf, da Computer keine kontinuierlichen Räume kennen.

#### Didaktische Begründung
* *Option A erklärt das Herzstück hybrider Simulation:* Unstetige Zustandsübergänge dürfen nicht an willkürlichen Integratorschritten ausgeführt werden. Nur durch Wurzelbestimmung der Schaltfunktion $z(t^*) = 0$ wird der physikalische Erhaltungssatz gewahrt.

---

### Frage 4.4: Zeno-Effekt & Chattering-Vermeidung bei Stößen (Multiple-Select)

#### Fragetext
Ein elastischer Ball fällt unter Erdbeschleunigung $g$ auf eine Bodenplatte und prallt mit einer Stoßzahl $e = 0{,}8$ wiederholt ab ($v^+ = -e \cdot v^-$).  
Welche Aussagen zum **Zeno-Effekt (Chattering)** und dessen mechatronischer Beherrschung in Simulationsmodellen sind **fachlich zutreffend**?  
*(Wählen Sie alle richtigen Aussagen)*

#### Antwortoptionen
* [x] A) Die Zeitintervalle zwischen aufeinanderfolgenden Stößen bilden eine geometrische Folge ($\Delta t_k = e \cdot \Delta t_{k-1}$), deren unendliche Summe gegen eine endliche Zeitspanne konvergiert ($t_{\text{Zeno}} < \infty$). Es treten mathematisch unendlich viele Stöße in endlicher Zeit auf.
* [x] B) Ein rein ereignisgesteuerter Zero-Crossing-Simulator ohne Schutzlogik friert ein (**Zeno-Kollaps**), da die Schrittweiten $\Delta t \to 0$ gegen Null streben und die Simulationsuhr nicht mehr voranschreitet.
* [x] C) In der praktischen Simulation wird das Chattering durch Einführen eines **Schwellwerts für die Restgeschwindigkeit** ($v_{\text{thresh}}$) vermieden: Fällt $|v| < v_{\text{thresh}}$ bei Kontakt, wird der diskrete Zustand von *Prellen* auf *Dauerhafter Kontakt (Haften)* umgeschaltet ($v = 0$, $a = 0$ bzw. Gleichgewicht $F_N = mg$).
* [ ] D) Der Zeno-Effekt tritt ausschließlich dann auf, wenn die Stoßzahl $e > 1{,}0$ beträgt und das System unendlich viel Energie erzeugt.
* [ ] E) Das Zeno-Problem lässt sich vollständig lösen, indem man den RK4-Solver durch einen Runge-Kutta 8. Ordnung ersetzt.

#### Didaktische Begründung
* *A, B, C beschreiben die mathematische Ursache und die ingenieurmäßige Lösung des Zeno-Problems:* Zeno von Elea; konvergierende geometrische Reihe führt zum Stillstand numerischer Event-Loops. Die Modusumschaltung auf Haftkontakt bricht die Endlosschleife.
* *D und E sind sachlich falsch:* $e > 1$ erzeugt Explosion statt Zeno-Konvergenz; höhere Solver-Ordnung löst kein hybrides Strukturproblem.

---

### Frage 4.5: Industriestandard FMI: Model Exchange vs. Co-Simulation

#### Fragetext
Bei der Virtuellen Inbetriebnahme (VIBN) und der herstellerübergreifenden Kopplung Digitaler Zwillinge ist das **Functional Mock-up Interface (FMI)** der etablierte Industriestandard. Eine Simulationskomponente wird als **FMU (Functional Mock-up Unit)** bereitgestellt.

Was ist der **fundamentale softwaretechnische und numerische Unterschied** zwischen **FMI for Model Exchange (ME)** und **FMI for Co-Simulation (CS)**?

#### Antwortoptionen
* [x] A) **Model Exchange (ME):** Die FMU enthält ausschließlich die mathematischen Modellgleichungen (Zustandsableitungen $\dot{\mathbf{x}} = f(\mathbf{x}, \mathbf{u})$ und algebraische Relationen). Der übergeordnete Master-Simulator muss den numerischen Integrator bereitstellen und steuern.  
**Co-Simulation (CS):** Die FMU kapselt das physikalische Modell **zusammen mit einem eigenen numerischen Solver**. Die FMU führt eigenständig Zeitschritte $\Delta t$ aus und tauscht mit dem Master nur Kopplungsdaten zu diskreten Kommunikationspunkten aus.
* [ ] B) Model Exchange funktioniert nur unter Linux, während Co-Simulation ausschließlich für Windows-Betriebssysteme spezifiziert ist.
* [ ] C) Bei Model Exchange dürfen nur diskrete Warteschlangen simuliert werden, während Co-Simulation ausschließlich 3D-CAD-Grafiken streamt.
* [ ] D) Model Exchange erfordert zwingend eine Internetverbindung zur Cloud, während Co-Simulation offline auf der SPS läuft.

#### Didaktische Begründung
* *Option A ist die offizielle Definition des FMI-Standards (Version 2.0/3.0):* ME überlässt die Zeitintegration dem Master (ideal für hochgradig gekoppelte DGL-Systeme). CS bringt seinen eigenen Solver mit (ideal für verteilte Werkzeuge und geistiges Eigentum/IP-Schutz).
