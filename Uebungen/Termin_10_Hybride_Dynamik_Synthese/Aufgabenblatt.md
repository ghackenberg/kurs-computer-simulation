# Aufgabenblatt Termin 10: Hybride Dynamik, Zero-Crossing Wurzelsuche & Zeno-Vermeidung
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
### FH Oberösterreich – Campus Wels | Studiengang Automatisierungstechnik

---

| Metadaten | Details |
| :--- | :--- |
| **Lehrveranstaltungseinheit:** | Termin 10 (begleitend zu Kapitel 10: Dynamische Modelle Hybrid & Kapitel 11: Epilog) |
| **Themenschwerpunkt:** | Hybride Automaten, Zero-Crossing-Funktionen $z(\mathbf{x})=0$, Bisektions-Nullstellensuche & Zeno-Schutz |
| **Technologie-Stack:** | C# 12 / .NET 8/10, S-Functions, Bisektion, WPF Canvas / ScottPlot 5 |
| **Vorgreif-Sperre:** | **Keine Vorgreif-Sperre!** Der gesamte Semester-Stack (DGL, S-Functions, TPL, WPF Canvas, ScottPlot 5) steht uneingeschränkt zur Verfügung! |
| **Zeitbudget:** | **In-Class Sprint:** 60 Minuten (Laborpräsenz)<br>**Homework Extension:** 2–3 Stunden (2er-Team, 1 Woche) |
| **Abgabeform:** | Git-Repository: Sourcecode, Unit-Tests und Markdown-Bericht (`README.md`) |

---

## 1. Lernziele (Intended Learning Outcomes - ILOs)

Nach erfolgreicher Bearbeitung dieser Übungseinheit sind Sie in der Lage:
1. **Hybride Systeme modellieren:** Kontinuierliche DGL-Integration (Fluss-Phasen) und diskrete Schaltzustände (Events, Guards, Resets) in einem hybriden Automaten zu koppeln.
2. **Zero-Crossing-Funktionen aufstellen:** Mathematische Indikatorfunktionen $z(\mathbf{x}) = 0$ für geometrische Kontakte und Schaltpunkte zu formulieren und Vorzeichenwechsel ($z_k \cdot z_{k+1} \le 0$) im Integrationsschritt zuverlässig zu detektieren.
3. **Bisektions-Wurzelsuche implementieren:** Das Zeitintervall $[t_k, t_{k+1}]$ mittels Bisektion auf $|z| < 10^{-6}\,\text{m}$ einzugrenzen, um Wandpenetrationen, geometrisches Tunneling und unphysikalischen Energiegewinn vollständig zu unterbinden.
4. **Zeno-Effekt & Chattering beherrschen:** Die unendliche Verdichtung von Schaltzeitpunkten bei abklingenden Hüpf- und Prellbewegungen durch Geschwindigkeits-Schwellwerte ($\epsilon_v$) abzufangen und stabil in kontinuierliche Haft- oder Gleitzustände überzugehen.
5. **Synthese des Digitalen Zwillings:** Mechatronische Aktoren, Schaltkontakte, Regler und interaktive Visualisierungen nach der *Goldenen Regel der Simulationsarchitektur* zu einem Gesamtsystem zusammenzuführen.

---

## 2. Mathematisch-Theoretische Grundlagen

### 2.1 Hybrider Automat & Zero-Crossing

Ein hybrides dynamisches System wechselt zwischen kontinuierlichen Zustandsräumen $\dot{\mathbf{x}} = \mathbf{f}_m(\mathbf{x}, \mathbf{u})$ über diskrete Umschaltbedingungen (Guards). Eine Schaltbedingung wird als Nullstelle einer stetigen **Zero-Crossing-Funktion** formuliert:

$$z(\mathbf{x}) = 0$$

Findet in einem Zeitschritt $[t_k, t_{k+1}]$ mit Schrittweite $h$ ein Vorzeichenwechsel statt:

$$\operatorname{sign}(z(\mathbf{x}_k)) \neq \operatorname{sign}(z(\mathbf{x}_{k+1})) \iff z(\mathbf{x}_k) \cdot z(\mathbf{x}_{k+1}) \le 0$$

so liegt der exakte Schaltzeitpunkt $t^* \in [t_k, t_{k+1}]$.

```
┌────────────────────────────────────────────────────────────────────────┐
│ ZERO-CROSSING BISEKTIONS-ALGORITHMUS                                   │
│                                                                        │
│   z(t)                                                                 │
│    ▲                                                                   │
│    │     z(t_k) > 0                                                    │
│    │       \                                                           │
│    │────────\───────*──────────────────────────────────────> t         │
│    │         \     t* (Exakte Nullstelle z(t*)=0)                      │
│    │          \                                                        │
│    │           \___ z(t_k+1) < 0  (Vorzeichenwechsel detektiert!)      │
│    ▼                                                                   │
│                                                                        │
│   Intervallhalbierung: t_mid = 0.5 * (t_left + t_right)                │
│   Iteriere bis |z(x(t_mid))| < 1e-6 m                                  │
│   1. Zustand x(t*) einfrieren                                          │
│   2. Diskreten Reset ausführen: v^+ = -e * v^-                         │
│   3. Integrator ab t* neu aufsetzen                                    │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Bisektionsverfahren

1. Setze $t_{\text{left}} = t_k$, $t_{\text{right}} = t_{k+1}$.
2. Berechne $t_{\text{mid}} = \frac{1}{2}(t_{\text{left}} + t_{\text{right}})$.
3. Integriere den Zustand von $t_k$ nach $t_{\text{mid}}$ und bewerte $z_{\text{mid}} = z(\mathbf{x}(t_{\text{mid}}))$.
4. Ist $|z_{\text{mid}}| < 10^{-6}\,\text{m}$ oder die maximale Iterationszahl (z. B. 25) erreicht: Abbruch mit $t^* = t_{\text{mid}}$.
5. Andernfalls: Hat $z$ zwischen $t_{\text{left}}$ und $t_{\text{mid}}$ das Vorzeichen gewechselt, setze $t_{\text{right}} = t_{\text{mid}}$, andernfalls $t_{\text{left}} = t_{\text{mid}}$. Wiederhole ab Schritt 2.

### 2.3 Das Zeno-Problem & Chattering-Vermeidung

Bei einem hüpfenden Ball mit Stoßzahl $e \in (0, 1)$ konvergiert die Zeitdauer zwischen zwei Stößen geometrisch gegen Null:
$$\Delta t_n = \Delta t_0 \cdot e^n \implies \sum_{n=0}^{\infty} \Delta t_n = \Delta t_0 \frac{1}{1 - e} < \infty$$
In endlicher physikalischer Zeit treten unendlich viele Stöße auf (**Zeno-Verhalten**). Ohne Schutz bricht die Bisektion in einer Endlosschleife zusammen.  
**Lösung (Zeno-Schutz):** Unterschreitet die Aufprallgeschwindigkeit den Schwellwert $|v^-| < \epsilon_v$ (z. B. $0{,}01\,\text{m/s}$), wird die Stoßzahl auf $e = 0$ gesetzt und der diskrete Modus auf „Rollen/Liegen“ (Haftreibung mit $\dot{y} = 0, \ddot{y} = 0$) umgeschaltet.

---

## 3. Stufe A: In-Class Sprint (60 min)

### Thema: „Bouncing Ball: Naiver Festschritt vs. Bisektion“

Erstellen Sie eine C#-Konsolenapplikation (`BouncingBallSprint`), die den freien Fall eines Balls unter Schwerkraft simuliert und den gravierenden Energie- und Penetrationsfehler eines naiven Festschrittverfahrens gegenüber einer sauberen Bisektions-Nullstellensuche demonstriert.

```
┌────────────────────────────────────────────────────────────────────────┐
│ STUFE A: BOUNCING BALL EXPERIMENT                                      │
│                                                                        │
│   Start: y_0 = 5.0 m, v_0 = 0 m/s                                      │
│   Ballradius: R = 0.1 m, Stoßzahl e = 0.8, g = 9.81 m/s^2              │
│   Boden bei y = 0  ==>  Kontaktfläche bei y = R                        │
│   Zero-Crossing Funktion: z(y) = y - R = 0                             │
│                                                                        │
│   Verfahren 1 (Naiver Festschritt h = 0.05 s):                         │
│     Wenn y_k+1 <= R: v_k+1 = -e * v_k+1  (Ball dringt tief in Boden ein!)
│                                                                        │
│   Verfahren 2 (Bisektion):                                             │
│     Halbiere Zeitschritt, bis |z| < 1e-6 m. Reset exakt bei y = R!    │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung (Schritt für Schritt):

1. **Systemgleichungen:**
   $$\dot{y} = v, \quad \dot{v} = -g \quad (g = 9{,}81\,\text{m/s}^2)$$
   Gesamtenergie: $E_{\text{tot}} = m g y + \frac{1}{2} m v^2$ (mit Masse $m = 1{,}0\,\text{kg}$).
2. **Verfahren 1 (Naiver Festschritt):**
   - Schrittweite $h = 0{,}05\,\text{s}$.
   - Führe den Euler-Schritt aus: $y_{k+1} = y_k + h \cdot v_k$, $v_{k+1} = v_k - h \cdot g$.
   - Prüfe Bedingung: `if (y_k1 <= R) { v_k1 = -e * v_k1; }`
   - Protokolliere die Bodenpenetration $\Delta y_{\text{pen}} = R - y_{k+1}$ und die Energie $E_{\text{tot}}$ direkt nach dem Stoß.
3. **Verfahren 2 (Bisektions-Nullstellensuche):**
   - Zero-Crossing-Funktion: $z(y) = y - R$.
   - Erkennt der Schritt einen Vorzeichenwechsel ($z_k > 0$ und $z_{k+1} \le 0$):
     - Halbiere das Intervall $[t_k, t_{k+1}]$, bis $|z| < 10^{-6}\,\text{m}$.
     - Führe den Stoß exakt am gefundenen Zeitpunkt $t^*$ aus: $v^+ = -e \cdot v^-$.
     - Setze die kontinuierliche Integration ab $t^*$ mit Restschrittweite $h_{\text{rest}} = t_{k+1} - t^*$ fort.
4. **Auswertung auf der Konsole:**
   Geben Sie nach dem ersten Aufprall für beide Verfahren aus:
   - Tatsächliche Stoßhöhe $y_{\text{impact}}$
   - Penetrationsfehler in Millimetern
   - Kinetische Energie direkt vor und nach dem Stoß
   - Berechneter theoretischer Energieverlustfaktor $\frac{E_{\text{nach}}}{E_{\text{vor}}} \stackrel{?}{=} e^2 = 0{,}64$.

**Erwartetes Ergebnis nach 50 Minuten:**  
- Verfahren 1 zeigt Penetration von $> 30\,\text{mm}$ und grob verfälschte Energieverhältnisse.
- Verfahren 2 lokalisiert den Bodenkontakt auf $< 1\,\mu\text{m}$ genau und erfüllt $\frac{E_{\text{nach}}}{E_{\text{vor}}} = 0{,}64000$ exakt.

---

## 4. Stufe B: Homework Extension (Wahlmodell – GENAU EINE Aufgabe!)

> [!IMPORTANT]
> **Pick your Track (Wahlmodell – KEINE Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **GENAU EINEN** der beiden Tracks:
> - **Track A (Industrie):** Virtuelle Inbetriebnahme (VIBN) eines pneumatischen Taktvorschubs mit SPS-Kopplung
> - **Track B (Simulation Game):** Arcade Pinball Wizard mit Bumper-Bisektion & Rampen-Zeno-Schutz
> 
> Beide Aufgaben basieren auf der hybriden Simulation mit Zero-Crossing Wurzelsuche und Zeno-Vermeidung. Bearbeiten Sie **NUR EINEN** Track!

---

### Track A (Industrie): Virtuelle Inbetriebnahme (VIBN) eines pneumatischen Taktvorschubs

#### Industrieller Kontext:
In automatisierten Fertigungslinien schieben pneumatische Zylinder Werkstücke getaktet gegen feste Anschläge. Bei der virtuellen Inbetriebnahme (VIBN) muss das Zusammenspiel aus nichtlinearer Zylinderkammer-Thermodynamik, harter metallischer Anschlagskollision und SPS-Endschaltern realitätsgetreu vorab validiert werden.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK A: PNEUMATISCHER ZYLINDER MIT ANSCHLAG & SPS-KOPPLUNG            │
│                                                                        │
│   Ventil A/B ──> Druckkammer 1 [ p1 ]      Druckkammer 2 [ p2 ]        │
│                  ───────────────[ KOLBEN m ]──────────────────         │
│                                       │                                │
│   Endschalter S0 (x = 0)              └───> fährt gegen Anschlag x_max │
│                                             Zero-Crossing z(x)=x_max-x │
│                                             Zeno-Schutz: Haftreibung   │
│   SPS-Logik:                                                           │
│     Wenn Kolben an S1 (x_max) erreicht: Warte 200 ms, schalte Ventil um│
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track A:

1. **Pneumatik-Modell (Kontinuierlicher Fluss):**
   - Kolbenmasse $m = 2{,}5\,\text{kg}$, Kolbenfläche $A_1 = 2 \times 10^{-3}\,\text{m}^2$, $A_2 = 1{,}8 \times 10^{-3}\,\text{m}^2$, Hub $L = 0{,}3\,\text{m}$ ($x \in [0, L]$).
   - Druckaufbau in den Kammern (vereinfachtes Füllmodell mit Versorgungsdruck $p_0 = 6 \times 10^5\,\text{Pa}$, Umgebungsdruck $p_{\text{amb}} = 10^5\,\text{Pa}$ und Zeitkonstante $\tau = 0{,}05\,\text{s}$):
     $$\dot{p}_1 = \frac{p_{\text{soll}, 1} - p_1}{\tau}, \quad \dot{p}_2 = \frac{p_{\text{soll}, 2} - p_2}{\tau}$$
   - Bewegungsgleichung bei freier Fahrt:
     $$m \ddot{x} = p_1 A_1 - p_2 A_2 - d \cdot \dot{x} - F_{\text{Coulomb}} \cdot \operatorname{sign}(\dot{x})$$
2. **Hybride Anschlagmechanik & Bisektion:**
   - Mechanische Anschläge bei $x_{\min} = 0$ und $x_{\max} = 0{,}3\,\text{m}$.
   - Zero-Crossing-Funktionen:
     $$z_{\text{links}}(x) = x - x_{\min}, \quad z_{\text{rechts}}(x) = x_{\max} - x$$
   - Bei Vorzeichenwechsel: Bisektionssuche nach $t^*$ bis $|z| < 10^{-6}\,\text{m}$.
   - Anschlagstoß mit Restitutionskoeffizient $e = 0{,}30$.
3. **Zeno-Vermeidung (Übergang in Endlagen-Haftreibung):**
   - Unterschreitet die Rückprallgeschwindigkeit nach einem Stoß $|v| < \epsilon_v = 0{,}015\,\text{m/s}$, wird der Kolben im diskreten Zustand `AtStop` arretiert:
     $$x = x_{\text{Anschlag}}, \quad v = 0, \quad a = 0$$
   - Er verbleibt in Haftreibung, bis die pneumatische Nettokraft $|p_1 A_1 - p_2 A_2|$ die Haftreibungskraft $F_{\text{Haft}} = 80\,\text{N}$ übersteigt.
4. **SPS-Taktsteuerung & Visualisierung:**
   - Modellieren Sie eine einfache SPS-Schrittkette:
     - Endschalter $S_1$ meldet: $x \ge x_{\max} - 0{,}001\,\text{m}$.
     - SPS startet Timer ($200\,\text{ms}$ Verweilzeit) und schaltet dann das 5/2-Wegeventil um (Kammer 2 belüften, Kammer 1 entlüften).
     - Kolben fährt zurück zu $S_0$ ($x \le 0{,}001\,\text{m}$), verweilt $200\,\text{ms}$ und startet neuen Zyklus.
   - Visualisieren Sie Kolbenposition, Kammerdrücke und Schaltzustände im WPF Canvas und ScottPlot 5.

---

### Track B (Simulation Game): Arcade Pinball Wizard mit Bumper-Bisektion

#### Game-Kontext:
Ein klassischer Flipperautomat lebt von rasanter Kugelmechanik. Trifft die Metallkugel mit hoher Geschwindigkeit auf federnde Bumper, erhält sie einen energetischen Kick. Ohne exakte Wurzelsuche durchdringt die Kugel bei hohen Frameraten die Wände (Tunneling) oder bleibt auf geneigten Führungsbahnen im Zeno-Chattering hängen.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK B: PINBALL ARCHITEKTUR & BUMPER                                  │
│                                                                        │
│   Geneigtes Spielfeld (alpha = 6.5°, g_eff = g * sin(alpha))           │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │  /                                                        \  │     │
│   │ /     ( BUMPER 1 )                   ( BUMPER 2 )          \ │     │
│   ││       Radius R_B                     Radius R_B            ││     │
│   ││       Kick: e = 1.2                  Kick: e = 1.2         ││     │
│   ││                                                            ││     │
│   ││                   O  Kugel (m, R)                          ││     │
│   ││                    \                                       ││     │
│   ││                     v                                      ││     │
│   ││   \                                                   /    ││     │
│   ││    \___ [ FLIPPER L ]               [ FLIPPER R ] ___/     ││     │
│   └──────────────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track B:

1. **Spielfeld-Dynamik & Kugelbewegung:**
   - Spielfeldneigung $\alpha = 6{,}5^\circ \implies g_{\text{eff}} = 9{,}81 \cdot \sin(6{,}5^\circ) \approx 1{,}11\,\text{m/s}^2$ entlang der Y-Achse nach unten.
   - Kugelzustand $\mathbf{x} = \begin{bmatrix} x & y & v_x & v_y \end{bmatrix}^\top$ mit Radius $R = 15\,\text{mm}$ und Masse $m = 0{,}08\,\text{kg}$.
2. **Bumper-Kollision & Bisektion:**
   - Platzieren Sie mindestens 3 kreisförmige Bumper ($R_B = 30\,\text{mm}$) und 4 lineare Führungswände.
   - Zero-Crossing-Funktion für Kugel gegen Bumper an Position $\mathbf{p}_B$:
     $$z_{\text{Bumper}}(\mathbf{x}) = \|\mathbf{p}_{\text{Kugel}} - \mathbf{p}_B\| - (R + R_B)$$
   - Bei Vorzeichenwechsel ($z_k > 0$ und $z_{k+1} \le 0$): Bisektion auf $|z| < 10^{-6}\,\text{m}$.
   - **Aktiver Bumper-Impuls:** Stoßzahl $e = 1{,}20$ (Kugel gewinnt Energie!):
     $$\vec{n} = \frac{\mathbf{p}_{\text{Kugel}} - \mathbf{p}_B}{\|\mathbf{p}_{\text{Kugel}} - \mathbf{p}_B\|}, \quad v_n^- = \mathbf{v}^- \cdot \vec{n}, \quad \mathbf{v}^+ = \mathbf{v}^- - (1 + e) v_n^- \vec{n}$$
3. **Zeno-Schutz auf Führungsrampen:**
   - Rollt die Kugel eine geneigte Führungswand hinab, treten Mikrostöße auf.
   - Ist die Stoß-Normalkomponente $|v_n^-| < \epsilon_v = 0{,}02\,\text{m/s}$, schalten Sie in den Zustand `Rolling`:
     $$v_n = 0, \quad \mathbf{a}_{\text{roll}} = \mathbf{g}_{\text{eff},\parallel} - \mu_{\text{roll}} g_{\text{eff},\perp} \frac{\mathbf{v}_{\parallel}}{\|\mathbf{v}_{\parallel}\|}$$
4. **Interaktiver Flipperfinger & Punktezähler:**
   - Steuerbarer Flipperhebel am unteren Spielfeldrand (Tastendruck dreht den Hebel mit $\omega = 25\,\text{rad/s}$ nach oben).
   - Bei Kollision der Kugel mit dem rotierenden Hebel wird die Umfangsgeschwindigkeit $\mathbf{v}_{\text{hebel}} = \vec{\omega} \times \vec{r}$ auf den Stoß aufaddiert.
   - Grafische Anzeige der Kugelbewegung im WPF Canvas und Punktestand-Overlay.

---

## 5. Akzeptanzkriterien & Definition of Done

Für die volle Punktzahl (10 Punkte) müssen folgende Kriterien erfüllt sein:

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **Zero-Crossing Bisektion** | **3 P.** | Mathematisch exakte Formulierung von $z(\mathbf{x})$; robuste Bisektion auf $|z| < 10^{-6}\,\text{m}$; absolutes Verhindern von Tunneling. |
| **Zeno-Schutz & Reibung** | **3 P.** | Sichere Erkennung von Chattering über Schwellwert $\epsilon_v$; stabiler Übergang in den Haft- bzw. Rollzustand ohne Hängenbleiben in der Integrationsschleife. |
| **Szenario-Funktionalität** | **2 P.** | **Track A:** Vollständige SPS-Schrittkette mit Pneumatik-Kopplung.<br>**Track B:** Aktive Bumper ($e = 1{,}2$) und beweglicher Flipperhebel. |
| **Visualisierung & Dokumentation** | **2 P.** | Flüssiges Canvas-Rendering; ScottPlot-Telemetrie; sauberer Markdown-Bericht mit Phasenportrait und Energieanalyse. |

---

## 6. Online-Recherche-Box

Nutzen Sie zur Vorbereitung und Vertiefung folgende Quellen:

- **Offizielle Dokumentation:**
  - [Modelica Association: Hybrid Modeling & Event Handling](https://modelica.org/specifications/)
  - [Functional Mock-up Interface (FMI) Standard (Event Handling)](https://fmi-standard.org/)
  - [Wikipedia: Zeno's paradoxes & Hybrid Systems](https://en.wikipedia.org/wiki/Hybrid_system)
- **Gezielte englische Suchbegriffe:**
  - `hybrid system simulation zero crossing bisection C#`
  - `Zeno phenomenon chattering avoidance contact mechanics`
  - `elastic collision vector reflection normal impulse formula`
  - `pneumatic cylinder state space differential equation model`

---

## 7. Vibe-Coding Prompting-Tipps

Falls Sie KI-Assistenten verwenden, beachten Sie folgende Vorgaben zur Vermeidung typischer KI-Fehler:

> [!TIP]
> **Prompt-Vorlage 1: Bisektions-Nullstellensuche mit Zeit-Rücksetzung**  
> *„Schreibe eine C#-Methode zur Nullstellensuche eines Zero-Crossing-Events $z(t) = 0$ zwischen $t_0$ und $t_1$. Verwende Bisektion mit maximal 25 Schritten oder Abbruch bei $|z| < 10^{-6}$. Wichtig: Der kontinuierliche Solver muss nach Lokalisierung von $t^*$ den Zustand an $t^*$ setzen, das diskrete Event (Stoß) ausführen und mit der verbleibenden Restzeit $\Delta t_{\text{rest}} = t_1 - t^*$ bis zum vollen Zeitschritt weitermarschieren.“*

> [!WARNING]
> **Prompt-Vorlage 2: Zeno-Schutz zur Chattering-Vermeidung**  
> *„Implementiere eine Umschaltbedingung für einen Stoßkörper gegen eine Wand. Wenn die Normalkomponente der Stoßgeschwindigkeit $|v_n| < 0{,}02\,\text{m/s}$ ist, darf KEIN weiterer Stoß ($v_n^+ = -e \cdot v_n^-$) mehr ausgeführt werden, um den Zeno-Effekt zu verhindern. Schalte stattdessen in den Modus `Haftreibung` mit $v_n = 0$ und berechne die Stützkraft.“*

---

## 8. 🔍 Peer-Review-Leitfragen für das Auditorium

Beim wöchentlichen „Showcase & Peer-Challenge“ prüft das Auditorium die vorgeführten Lösungen anhand folgender Fragen:

1. **Tunneling-Stresstest bei Höchstgeschwindigkeit:** Was passiert, wenn die Geschwindigkeit der Kugel bzw. der Pneumatikdruck verfünffacht wird? Schlägt die Kugel durch die Wand hindurch (Tunneling), oder fängt die Zero-Crossing-Bisektion das Event stets absolut zuverlässig ab?
2. **Zeno-Stabilitätstest:** Was passiert, wenn der Ball auf der schrägen Rampe ausrollt bzw. der Pneumatikzylinder am Endanschlag prellt? Friert die Simulation in einer unendlichen Bisektionskaskade ein (CPU-Kern auf $100\,\%$, Zeit bleibt stehen), oder schaltet das System sauber und ruckelfrei in den Roll-/Haftmodus um?
3. **Energieerhaltung beim Stoß:** Zeigt das Phasenportrait vor und nach dem Stoß das exakte theoretische Verhältnis der kinetischen Energien ($\frac{E^+}{E^-} = e^2$)?
4. **Trennung von Physik und UI:** Läuft die Bisektionsschleife unabhängig vom UI-Thread im Modellcode, sodass die Benutzeroberfläche auch bei vielen Kontakten flüssig bedienbar bleibt?
