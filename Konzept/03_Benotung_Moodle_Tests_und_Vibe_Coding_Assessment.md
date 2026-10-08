# Benotungskonzept, Moodle-MCQ-Prüfungen & Vibe-Coding-Assessment

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (5./6. Semester)  
**Institution:** Fachhochschule Oberösterreich, Campus Wels  
**Verfasser:** Assessment- & KI-Prüfungsexperte  
**Gültigkeit:** Ab Studienjahr 2026/2027  

---

## 1. Die zentrale pädagogische Herausforderung

### 1.1 Ausgangslage: Der Paradigmenwechsel durch generative KI und Vibe Coding
Mit der ubiquitären Verfügbarkeit von modernen Large Language Models (LLMs wie Claude 3.5 Sonnet, GPT-4o, OpenAI o1/o3) und KI-gestützten Entwicklungsumgebungen (GitHub Copilot, Cursor, Windsurf) hat sich das Programmieren grundlegend verändert. Das von Andrej Karpathy geprägte Phänomen des **„Vibe Coding“** – das iterative, sprachbasierte Generieren von Code auf Basis von Prompts und Systembeschreibungen – ist in der Ingenieurpraxis angekommen.

Für eine Hochschul-Lehrveranstaltung wie *Systemsimulation / Digitaler Zwilling* bedeutet dies:
* **Traditionelles Coding als Prüfungsgegenstand ist obsolet:** Aufgaben wie *„Schreiben Sie eine C#-Klasse für das Runge-Kutta-4-Verfahren“* oder *„Implementieren Sie einen 5-Punkt-Stern für die 2D-Wärmeleitungsgleichung in WPF“* lösen moderne LLMs in unter fünf Sekunden fehlerfrei auf syntaktischer Ebene.
* **Scheinkompetenz und „Cargo Cult Engineering“:** Studierende können lauffähige, visuell beeindruckende Benutzeroberflächen generieren, ohne die physikalische Modellbildung, die mathematischen Stabilitätsgrenzen oder die numerischen Integrationsfehler im Kern verstanden zu haben.
* **Trivialer Täuschungsversuch vs. professionelle Werkzeugnutzung:** Ein Verbot von generativer KI ist an einer Fachhochschule weder technisch durchsetzbar noch didaktisch sinnvoll. In der industriellen Automatisierungstechnik werden Ingenieure künftig simulationsgestützte Digitale Zwillinge in Symbiose mit KI-Agenten entwickeln.

```
Traditioneller Ansatz (Veraltet):
[Problem] ───> [Code manuell schreiben] ───> [Compiler-Lauf] ───> [Benotung nach Funktion]
                      ▲
               KI löst dies in 2s!

Neues Assessment-Paradigma (Systemsimulation):
[Problem] ───> [Prompt / Spezifikation] ───> [KI generiert Code] ───> [Validation / Plausibilisierung]
                                                                                │
   ┌────────────────────────────────────────────────────────────────────────────┴────────┐
   ▼                                            ▼                                        ▼
[Physikalische Konsistenz]            [Numerische Stabilität]               [Mündliche Verteidigung]
• Energie- & Impulserhaltung          • Eigenwerte & Schrittweite           • "Warum genau diese Zeile?"
• Grenzfall- & Sensitivitätsanalyse   • Steifigkeit & Lösungsverfahren      • Live-Parameteränderung im Labor
```

### 1.2 Die neue Kernkompetenz: Verstehen, Validieren, Parametrieren, Verteidigen
Die Prüfungs- und Benotungsphilosophie verschiebt sich von den unteren Stufen der Bloom’schen Taxonomie (Erinnern, Verstehen, Code abtippen) hin zu den höheren Stufen (Analysieren, Evaluieren, Validieren und Kritisieren):

1. **Systemische Architekturkompetenz:** Die Fähigkeit, eine simulationsgerechte Architektur vorzugeben (z. B. strikte Kapselung von kontinuierlichen/diskreten Zuständen in Simulink-artigen S-Funktionen, Entkopplung von Physik-Engine, Solver und WPF-Rendering-Pipeline).
2. **Physikalische & mathematische Plausibilitätsprüfung:** Erkennen von subtilen Halluzinationen der KI (z. B. nicht-konservative Dämpfungsansätze, verletzte Randbedingungen bei FE/Differenzen-Methoden, instabile Schrittweiten).
3. **Numerische Urteilskraft & Parametrierung:** Auswahl und Begründung von Diskretisierungsparametern (CFL-Bedingung, Stabilitätsgebiet expliziter vs. impliziter Integratoren, Regularisierung singulärer Steifigkeitsmatrizen).
4. **Mündliche Auskunftsfähigkeit (Defensibility):** Wer den Code vorlegt, haftet dafür. Studierende müssen in der Lage sein, jede Zeile des von der KI generierten Codes im Detail zu erklären, live im Code-Review auf Fehler zu untersuchen und unter Zeitdruck mechatronische Parameteränderungen vorzunehmen.

---

## 2. Aufbau des Benotungsschemas (Gewichtung & Säulen)

Um Fairness, Transparenz und Manipulationssicherheit bei vollständiger KI-Erlaubnis zu garantieren, basiert die Gesamtnote auf einer **Drei-Säulen-Architektur**. Jede Säule deckt ein eigenständiges didaktisches Ziel ab.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                GESAMTNOTE (100 %)                                      │
├────────────────────────────┬────────────────────────────┬──────────────────────────────┤
│    SÄULE 1: 30 %           │    SÄULE 2: 30 %           │    SÄULE 3: 40 %             │
│    Moodle MCQ-Tests        │    Übungsmeilensteine &    │    Abschlussprojekt &        │
│    (Kontinuierliche        │    Micro-Defenses          │    Oral Defense              │
│     Theorie- & Fehler-     │    (Präsenz-Labor, Live-   │    (Gesamtsystem, Validierung│
│     analyse)               │     Testing & Parameter)   │     & Teamverteidigung)      │
└────────────────────────────┴────────────────────────────┴──────────────────────────────┘
```

### 2.1 Säule 1: Moodle Multiple-Choice-Tests (30 %)
* **Ziel:** Kontinuierliche Überprüfung des fundierten theoretischen und mathematisch-numerischen Grundlagenwissens.
* **Umfang:** 3 formatgebundene Moodle-Tests über das Semester verteilt (je 10 % der Gesamtnote; ca. 15–20 Minuten pro Test).
* **Durchführung:** In Präsenz zu Beginn ausgewählter Vorlesungseinheiten (Open-Book oder geschlossenes Setting auf Moodle/Safe Exam Browser).
* **Fokus:** Bildgestützte Fehleranalysen, numerische Parametrisierungsaufgaben mit Zufallsvariablen, Interpretation von Phasenraumkurven und Identifikation logischer Bugs in Codefragmenten, die nicht durch reines Copy-Paste gelöst werden können.

### 2.2 Säule 2: Übungsmeilensteine & Micro-Defenses (30 %)
* **Ziel:** Laufende Überprüfung der praktischen Implementierungsfähigkeit und spontanen Erklärungsfähigkeit im C#/.NET-Umfeld.
* **Umfang:** 4 praktische Labor-Meilensteine (begleitend zu den Kapiteln 02–06 und 07–10).
* **Durchführung („Micro-Defense“):** Die Abnahme erfolgt direkt am Arbeitsplatz im Rechnerraum der FH OÖ (Campus Wels):
  1. **Live-Vorführung:** Das erstellte C#/WPF-Programm läuft flüssig.
  2. **Spontane Ad-hoc-Frage (Code-Inspection):** Die Lehrperson deutet auf eine beliebige Codezeile (z. B. Zeigerzugriff in `WriteableBitmap`, Matrix-Faktorisierung in `Math.NET Numerics`, Zeitdiskretisierungsschleife): *„Erklären Sie exakt, was hier passiert und warum Speicherlecks/Rundungsfehler vermieden werden.“*
  3. **Live-Stresstest (Parameteränderung):** Die Lehrperson fordert eine Live-Parameteränderung im laufenden Code: *„Erhöhen Sie die Schrittweite $h$ von $0{,}001$ auf $0{,}05$. Was beobachten Sie im Plot? Handelt es sich um ein Amplituden- oder Phasenproblem?“*
* **Bewertung:** Binär oder Dreistufig pro Meilenstein (0 / 1 / 2 Punkte) mit klarem Bewertungsraster.

### 2.3 Säule 3: Abschlussprojekt & mündliche Verteidigung (40 %)
* **Ziel:** Entwicklung eines nichttrivialen Digitalen Zwillings / mechatronischen Simulationssystems im Team (2–3 Studierende) mit anschließender individueller Verteidigung.
* **Aufteilung der 40 Prozentpunkte:**
  * **10 % Softwarearchitektur & C#-Code:** Saubere Trennung (S-Functions, Physics, Numerik, WPF-GUI, ggf. TPL/Multithreading), Versionskontrolle (Git-Historie mit nachvollziehbarer Prompt- und Entwicklungsdokumentation).
  * **10 % Physikalische Validierung & Plausibilitätsnachweis:** Schriftlicher Kurzbericht (6–8 Seiten) mit mathematischem Nachweis (analytischer Grenzfall, Energiebilanz, Konvergenztest der Schrittweite, Stabilitätsanalyse).
  * **20 % Mündliche Team- und Einzelverteidigung (15 Minuten pro Team):**
    * 5 Min. Live-Demonstration des Gesamtsystems.
    * 10 Min. intensives Kreuzverhör pro Studierendem: Deep-Dive in Algorithmen, Begründung von Architekturentscheidungen, Abfangen von Randfällen, ad-hoc Deaktivierung von Schutzmechanismen.

---

## 3. Moodle Multiple-Choice Tests (MCQ-Konzept)

### 3.1 Testorganisation & Zeitplan
Die Moodle-Tests werden über das Semester getaktet, um ein kontinuierliches Lernen sicherzustellen:
* **Test 1 (nach Termin 4 / Kap. 01–04):** Grundlagen der Systemsimulation, 2D-Pixelgrafik (`WriteableBitmap`, PDE-Wärmeleitung, CFL-Bedingung), Vektorgrafik und Diagramme (`ScottPlot`).
* **Test 2 (nach Termin 7 / Kap. 05–07):** 3D-Computergrafik (Szenengraphen, Transformationen), Multithreading (`Parallel.For`, Race Conditions), Statische Modelle (LGS, Fachwerke, Konditionszahl).
* **Test 3 (nach Termin 10 / Kap. 08–10):** Kontinuierliche Dynamik (Euler, Heun, RK4, Stabilitätsgebiete), Diskrete Simulation (DEVS, Warteschlangen), Hybride Systeme (S-Functions, Event Detection, Zeno-Kollaps, Anti-Windup).

### 3.2 Strategien gegen unreflektiertes KI-Copy-Paste
Standard-LLMs scheitern zuverlässig an spezifischen Typen von Simulationsfragen, wenn folgende Techniken kombiniert werden:
1. **Zufallsvariablen in Berechnungsfragen (Moodle Algorithmic Questions):** Jeder Studierende erhält individuelle Parameter ($m, c, d, h, \lambda$). LLMs berechnen mehrstufige numerische Formeln oft mit Rundungsfehlern oder falschen Einheiten.
2. **Visuelle Artefakt- und Fehlerdiagnose:** Bereitstellung von Diagrammen (Phasenportraits, FE-Netzverzerrungen, Spektren), bei denen das Phänomen interpretiert werden muss (z. B. künstliche Energiezunahme durch expliziten Euler).
3. **Subtile Code-Mutationen („Find the Bug“):** C#-Snippets, die auf den ersten Blick syntaktisch perfekt wirken, aber einen gravierenden numerischen oder semantischen Defekt aufweisen (z. B. globale Variable in paralleler Schleife, falsches Butcher-Tableau-Gewicht).
4. **Striker Zeittakt:** 10–12 Fragen in 15 Minuten. Wer jede Frage erst als Screenshot prompten muss, gerät unter massiven Zeitdruck.

---

### 3.3 Konkrete Beispielfragen für 3 Kernbereiche

#### Themenbereich 1: Numerik & Kontinuierliche Dynamik (Kapitel 08)

##### Frage 1.1: Parametrisierung & Stabilitätsgrenze (Berechnung mit Zufallswerten)
* **Fragentyp:** Berechnungsfrage (Moodle Calculated / Cloze)
* **Aufgabenstellung:**
  Gegeben ist das lineare Dämpfungssystem erster Ordnung:
  $$\dot{x}(t) = \lambda \cdot x(t) \quad \text{mit } \lambda = -{A}\,\text{s}^{-1}$$
  Sie verwenden zur numerischen Lösung das **explizite Euler-Verfahren**:
  $$x_{k+1} = x_k + h \cdot \lambda \cdot x_k$$
  1. Berechnen Sie die theoretische maximale Zeitschrittweite $h_{\text{krit}}$, ab der die numerische Lösung instabil wird (Schwingungsanfachung / Vorzeichenwechsel mit Amplitudenwachstum).
  2. Welche Schrittweite $h$ garantiert, dass die Lösung asymptotisch stabil und **ohne unphysikalisches Überschwingen (monoton fallend)** gegen 0 konvergiert?
* **Lösung & Formeln:**
  * Stabilitätsfunktion expliziter Euler: $R(z) = 1 + z$ mit $z = \lambda \cdot h$.
  * Stabilitätsbedingung: $|1 + \lambda h| < 1 \implies -2 < \lambda h < 0 \implies h_{\text{krit}} = \frac{2}{|\lambda|} = \frac{2}{A}\,\text{s}$.
  * Monotoniebedingung (kein Vorzeichenwechsel): $0 < 1 + \lambda h < 1 \implies h_{\text{monoton}} < \frac{1}{|\lambda|} = \frac{1}{A}\,\text{s}$.
* **Didaktischer Mehrwert:** KI generiert bei der Frage nach „Stabilität“ oft fälschlich $h < \frac{1}{|\lambda|}$ (verwechselt Stabilität mit Aperiodizität) oder gibt qualitative Erklärungen ohne exakten Zahlenwert ab.

##### Frage 1.2: Visuelle Fehlerdiagnose im Phasenraum (Multiple-Choice Single-Select)
* **Fragentyp:** Bild-basierte Multiple-Choice Frage
* **Aufgabenstellung:**
  Ein reibungsfreier mechanischer Oszillator (Feder-Masse-Schwinger: $m \ddot{x} + c x = 0$) wird simuliert. Die folgende Abbildung zeigt das berechnete Phasenraumportrait $(x, \dot{x})$ über 50 Perioden:

```
        ▲ v = dx/dt
        │       ╭─────╮
        │     ╭─╯     ╰─╮
        │   ╭─╯  ╭───╮  ╰─╮
        │   │   ╭╯ (0)╰╮  │
────────┼───┼───┼──┼──┼──┼──────► x
        │   │   ╰╮   ╭╯  │
        │   ╰─╮  ╰───╯  ╭─╯
        │     ╰─╮     ╭─╯
        │       ╰─────╯
```
*(Die Trajektorie spiralt kontinuierlich von innen nach außen auf, obwohl keine externe Energie zugeführt wird.)*

Welche Diagnose beschreibt die Ursache für dieses Verhalten exakt?
* [ ] A) Die Schrittweite $h$ war zu klein, wodurch Rundungsfehler der 64-Bit-Gleitkommazahlen das System aufschaukeln.
* [x] B) Es wurde das explizite Euler-Verfahren verwendet. Dessen Stabilitätsfunktion $|1 + i \omega h| = \sqrt{1 + \omega^2 h^2} > 1$ führt für rein imaginäre Eigenwerte stets zu künstlicher Energiezufuhr.
* [ ] C) Das System weist das physikalische Phänomen der Resonanzkatastrophe auf.
* [ ] D) Es liegt ein Phasenfehler zweiter Ordnung vor, der die Dämpfungskonstante negativ skaliert.
* [ ] E) Das Runge-Kutta-Verfahren 4. Ordnung (RK4) ist für lineare Systeme nicht symplektisch und erzeugt daher Amplitudenexplosion.

---

#### Themenbereich 2: Statische Modelle & Lineare Gleichungssysteme (Kapitel 07)

##### Frage 2.1: Singularität & Konditionierung (Code-Verständnis & Statik)
* **Fragentyp:** Multiple-Choice (Multiple-Select)
* **Aufgabenstellung:**
  Gegeben ist der folgende C#-Code zur Berechnung der Knotenauslenkungen eines 2D-Fachwerks mit `Math.NET Numerics`:

```csharp
// K: Globale Steifigkeitsmatrix (Größe 2N x 2N)
// f: Globaler Lastvektor (Größe 2N)
Matrix<double> K = AssembleGlobalStiffnessMatrix(nodes, elements);
Vector<double> f = AssembleLoadVector(nodes);

// Modifikation für Lagerbedingungen (z.B. Knoten 0 fixiert: u_x0 = 0, u_y0 = 0)
// Zeile und Spalte werden eliminiert oder mit Penalty belegt:
ApplyBoundaryConditions(K, f, boundaryConditions);

// Lösung des linearen Gleichungssystems K * u = f
Vector<double> u = K.Solve(f);
```

Bei der Ausführung von `K.Solve(f)` bricht das Programm mit einer `SingularMatrixException` ab oder liefert Vektoren mit `double.NaN` und extremen Werten ($> 10^{18}$). Welche der folgenden Ursachen führen direkt zu diesem numerischen Befund? *(Wählen Sie alle zutreffenden Aussagen)*

* [x] A) Es wurden unzureichende Lagerbedingungen definiert, sodass das Fachwerk als starrer Körper in der Ebene frei rotieren oder translatieren kann (Starrkörperbewegungen $\implies \det(\mathbf{K}) = 0$).
* [x] B) In der Struktur befindet sich ein nicht-triangulierter Bereich (Mechanismus), wodurch mindestens ein innerer Freiheitsgrad kraftfrei verschiebbar ist.
* [ ] C) Der Lastvektor $\mathbf{f}$ enthält an unbelasteten Knoten den Wert $0{,}0$, was zu einer Division durch Null führt.
* [x] D) Zwei Stäbe weisen einen extrem spitzen Winkel zueinander auf ($< 0{,}1^\circ$), was zu einer extrem schlechten Konditionszahl $\kappa(\mathbf{K}) \gg 10^{15}$ führt.
* [ ] E) `Math.NET Numerics` kann symmetrische Matrizen generell nur lösen, wenn zuvor eine Singulärwertzerlegung (SVD) explizit im RAM allokiert wurde.

---

#### Themenbereich 3: Hybride & Diskrete Systeme (Kapitel 09 & 10)

##### Frage 3.1: Event-Detection, Zeno-Kollaps & Anti-Windup
* **Fragentyp:** Multiple-Choice Single-Select mit C#-Snippet
* **Aufgabenstellung:**
  Gegeben ist die folgende Update-Methode einer mechatronischen S-Function für einen PI-Geschwindigkeitsregler mit Aktor-Sättigung (Motorstrom maximal $\pm I_{\text{max}}$):

```csharp
public void UpdateContinuousStates(double dt)
{
    double error = setpoint - actualVelocity;
    
    // Proportionalanteil
    double u_p = Kp * error;
    
    // Integrator
    integratorState += Ki * error * dt;
    
    // Gesamtstellgröße
    double u_raw = u_p + integratorState;
    
    // Sättigung (Aktorbegrenzung)
    actuatorOutput = Math.Clamp(u_raw, -I_max, I_max);
}
```

Bei einem großen Geschwindigkeitssprung gerät der Motor über 5 Sekunden in die Sättigung (`actuatorOutput == I_max`). Nach Erreichen der Solldrehzahl bleibt der Motor noch weitere 4 Sekunden auf Vollgas, bevor die Drehzahl wieder sinkt.

Welche Modifikation im Code beseitigt diesen **Integrator-Windup-Effekt** fachgerecht?

* [ ] A) Man ersetzt `Math.Clamp` durch eine lineare Dämpfung `integratorState *= 0.99`.
* [ ] B) Man setzt `Ki = 0`, sobald `error < 0` wird.
* [x] C) Man integriert `integratorState` nur dann weiter auf, wenn der Ausgang nicht gesättigt ist, oder man implementiert eine dynamische Rückführung der Differenz `(actuatorOutput - u_raw)` auf den Integratoreingang (Tracking Anti-Windup / Clamping).
* [ ] D) Man verringert die Abtastzeit `dt` um den Faktor 100, um den Zeno-Effekt des Begrenzers numerisch aufzulösen.

##### Frage 3.2: Bouncing Ball & Zeno-Effekt
* **Fragentyp:** Kurzantwort / Multiple Choice
* **Aufgabenstellung:**
  Bei der Modellierung eines hüpfenden Balls mit elastischem Stoß ($v^+ = -\varepsilon \cdot v^-$ mit $\varepsilon = 0{,}8$) sinkt die Sprunghöhe nach jedem Aufprall exponentiell ab. Die Zeitintervalle zwischen zwei aufeinanderfolgenden Stößen konvergieren in einer geometrischen Reihe:
  $$\Delta t_k = \frac{2 v_k}{g} = \frac{2 v_0 \varepsilon^k}{g} \implies \sum_{k=0}^{\infty} \Delta t_k < \infty$$
  Welches simulationsspezifische Problem tritt auf, wenn ein kontinuierlicher Integrator mit Nullstellensuche (Event Detection) diesen Vorgang simuliert, und wie wird es in industriellen Simulatoren (z. B. Stateflow / S-Functions) gelöst?
* **Musterantwort:**
  * **Phänomen:** **Zeno-Effekt / Zeno-Kollaps**. Der Simulator versucht unendlich viele Schaltungen in endlicher Zeit durchzuführen; die Integrationsschrittweite konvergiert gegen 0 ($h \to 0$), die Simulation friert ein.
  * **Lösung:** Einführung einer Schaltschwelle (Restitution Lock / Chattering Protection): Sinkt die Aufprallgeschwindigkeit $|v^-| < v_{\text{threshold}}$ (z. B. $0{,}05\,\text{m/s}$), wird der diskrete Zustand von `Bouncing` auf `Resting / Contact` umgeschaltet, der Stoßkoeffizient auf $\varepsilon = 0$ gesetzt und das System wechselt in ein rein statisches Zwangslauf-Modell.

---

## 4. Bewertungsrubrik für Vibe-Coding-Projekte

Für das Abschlussprojekt (Säule 3) und die Übungsmeilensteine (Säule 2) kommt eine transparente, kompetenzorientierte Bewertungsrubrik zum Einsatz. Sie unterscheidet explizit zwischen **reiner KI-Generierung** und **echter ingenieurwissenschaftlicher Beherrschung**.

### 4.1 Die 5 Bewertungsdimensionen

| Kriterium | Gewicht | Fokus & Leitfragen |
| :--- | :---: | :--- |
| **K1: Softwarearchitektur & C#-Design** | 20 % | Ist der Code sauber strukturiert (S-Functions, Physics, GUI-Entkopplung) oder handelt es sich um einen unstrukturierten KI-Monolithen? Werden Patterns (.NET 8, TPL, WPF-Bindings) korrekt angewandt? |
| **K2: Physikalische Validierung & Plausibilität** | 25 % | Wurde die Simulation gegen analytische Lösungen, Erhaltungssätze (Energie, Impuls) oder Grenzfälle verifiziert? Sind Plausibility Checks implementiert? |
| **K3: Numerik, Sensitivität & Stabilität** | 20 % | Wurde die Wahl von Integrator und Schrittweite $h$ begründet? Wurde eine Konvergenzstudie ($h \to h/2$) durchgeführt? Werden Stabilitätsgrenzen eingehalten? |
| **K4: Mündliche Auskunftsfähigkeit (Oral Defense)** | 25 % | Kann der Studierende jede Zeile erklären? Kann er/sie Ad-hoc-Modifikationen durchführen? Werden numerische Effekte bei Parameteränderungen verstanden? |
| **K5: KI-Transparenz & Prompt-Engineering** | 10 % | Wurde der KI-Einsatz offen dokumentiert (AI Disclosure)? Wurden Prompt-Ketten reflektiert und Fehler der KI identifiziert und korrigiert? |

---

### 4.2 Detailliertes Bewertungsraster (Rubric)

```
Bewertungsstufen:
[4] Exzellent (90 - 100 %)  | [3] Gut (80 - 89 %)
[2] Befriedigend (70 - 79 %) | [1] Ausreichend (60 - 69 %) | [0] Nicht genügend (< 60 %)
```

#### K1: Softwarearchitektur & C#-Design (Gewicht: 20 %)
* **[4] Exzellent:** Vorbildliche Trennung von Belangen (*Separation of Concerns*). Modellierung strictly nach S-Function-Paradigma (kontinuierliche Zustände, diskrete Zustände, Ausgänge, Event-Methoden). Die WPF-Benutzeroberfläche kommuniziert ausschließlich asynchron/über MVVM oder saubere Datenpuffer mit der Simulations-Engine. Kein UI-Blockieren. Effiziente Speichernutzung (keine Allokationen in der Integrationsschleife).
* **[3] Gut:** Klare Trennung zwischen Modell und GUI. S-Functions sauber implementiert. Gelegentlich kleine architektonische Kopplungen, die jedoch Stabilität und Wartbarkeit nicht gefährden.
* **[2] Befriedigend:** Grundlegende Trennung vorhanden, aber typische „LLM-Vibe-Code-Spuren“: Redundante Hilfsklassen, statische globale Variablen für Zustände, gelegentliches Rechnen direkt im UI-Thread.
* **[1] Ausreichend:** Stark monolithischer Code („God-Class“). Logik, Vektorrechnung und WPF-Zeichencode vermischt. Programm läuft, ist aber kaum erweiterbar.
* **[0] Nicht genügend:** Chaotischer Spaghetti-Code; wiederholtes Kopieren unpassender KI-Snippets; Speicherlecks in `WriteableBitmap` oder Deadlocks in TPL-Tasks; stürzt bei Randbedingungen ab.

#### K2: Physikalische Validierung & Plausibilitätsnachweis (Gewicht: 25 %)
* **[4] Exzellent:** Systematische Verifikation auf Hochschulniveau:
  1. *Energiebilanz:* $E_{\text{ges}}(t) = E_{\text{kin}} + E_{\text{pot}} + E_{\text{dissipiert}}$ wird online mitgeplottet; Drift liegt innerhalb der theoretischen Integrationsordnung.
  2. *Analytischer Grenzfall:* Modell wurde für vereinfachte Parameter analytisch gelöst und die Simulation weicht exakt um die vorausberechnete Fehlerordnung ab.
  3. *Plausibility Checks:* Automatisierte `Debug.Assert`-Bedingungen gegen unphysikalische Zustände (z. B. negative Kelvin-Temperaturen, Massenänderung).
* **[3] Gut:** Plausibilitätsnachweis vorhanden. Energieerhaltung oder analytischer Vergleich sauber gerechnet und dokumentiert. Kleine Lücken bei extremen Betriebszuständen.
* **[2] Befriedigend:** Validierung beschränkt sich auf rein optischen Vergleich („Kurve sieht plausibel aus wie in MATLAB“). Keine mathematisch fundierte Fehlerrechnung.
* **[1] Ausreichend:** Nur minimale Plausibilitätsprüfung. Gravierende Abweichungen bei Randparametern werden ignoriert oder als „Modellunsicherheit“ abgetan.
* **[0] Nicht genügend:** Völlig unphysikalische Ergebnisse (z. B. ungedämpftes System explodiert, Massen heben ohne Kraft ab); KI-Halluzinationen wurden ungeprüft übernommen.

#### K3: Numerik, Sensitivität & Stabilität (Gewicht: 20 %)
* **[4] Exzellent:** Fundierte numerische Begründung:
  1. *Eigenwertanalyse:* Steifigkeit des DGL-Systems bestimmt; Wahl von explizitem vs. implizitem Verfahren mathematisch untermauert.
  2. *Konvergenztest:* Zeitschrittweiten-Studie ($h, h/2, h/4$) belegt die theoretische Konvergenzordnung des Solvers (z. B. $O(h^4)$ für RK4).
  3. *Singularitätshandhabung:* Robuste Handhabung von Divisionen durch Null oder schlecht konditionierten Matrizen.
* **[3] Gut:** Schrittweite $h$ wurde systematisch experimentell validiert. Stabilitätsgrenze ist bekannt und wird eingehalten.
* **[2] Befriedigend:** Schrittweite wurde heuristisch gewählt („damit es nicht ruckelt und stabil bleibt“). Keine formale Stabilitätsanalyse.
* **[1] Ausreichend:** Instabile Parameterbereiche existieren; bei ungünstigen Eingaben stürzt der Integrator ab (`NaN` / `Overflow`).
* **[0] Nicht genügend:** Kein Verständnis für numerische Zusammenhänge; Solver schwingt auf; Studierende verstehen den Zusammenhang zwischen Eigenwerten und $h$ nicht.

#### K4: Mündliche Auskunftsfähigkeit (Oral Defense & Live-Modification) (Gewicht: 25 %)
* **[4] Exzellent:** Vollständige intellektuelle Durchdringung:
  * Erklärt jede Zeile, Schleife und Datenstruktur präzise und fehlerfrei.
  * *Live-Code-Challenge:* Auf Aufforderung der Prüfenden modifiziert der Studierende innerhalb von 3 Minuten Parameter oder fügt eine Dämpfung ein; erklärt die resultierende Änderung im Phasenportrait sofort korrekt.
  * Benennt spontan Schwachstellen und Limitierungen des Codes.
* **[3] Gut:** Erklärt den Großteil des Codes souverän. Bei komplexen KI-generierten Konstrukten wird nach kurzer Bedenkzeit die Funktionsweise korrekt hergeleitet. Live-Änderung gelingt mit kleiner Hilfestellung.
* **[2] Befriedigend:** Kennt die Funktionsweise des Gesamtprogramms, stockt aber bei C#-spezifischen Details oder numerischen Hilfsfunktionen. Live-Änderung dauert länger.
* **[1] Ausreichend:** Große Unsicherheit. Kann Standardabläufe erklären, offenbart aber deutliche Lücken bei von der KI eingefügten Codeblöcken.
* **[0] Nicht genügend (K.O.-Kriterium):** Kann fundamentale Codeabschnitte nicht erklären; reagiert auf Fragen mit *„Das hat Copilot so vorgeschlagen, ich weiß nicht, was das tut“*; scheitert an trivialsten Codeänderungen.

#### K5: KI-Transparenz & Prompt-Engineering (Gewicht: 10 %)
* **[4] Exzellent:** Vorbildliche Dokumentation im Anhang:
  * Vollständiges Prompt-Protokoll (Welches LLM, welche Prompts, welche Fehlversuche?).
  * Kritische Reflexion: Analyse von 2–3 konkreten Situationen, in denen die KI falschen, ineffizienten oder unphysikalischen Code generiert hat, und wie dieser korrigiert wurde.
* **[3] Gut:** Transparente Angabe der verwendeten Werkzeuge und Prompt-Strategien. Nachvollziehbare Korrektur von KI-Fehlern.
* **[2] Befriedigend:** Summarische Angabe („Entwickelt mit Cursor und Claude 3.5“); Prompts nur auszugsweise dokumentiert.
* **[1] Ausreichend:** Minimale Dokumentation; erst auf Nachfrage wird der Umfang des KI-Einsatzes eingeräumt.
* **[0] Nicht genügend:** Verschleierung von KI-Nutzung; Vortäuschung vollständiger Eigenprogrammierung bei offensichtlicher LLM-Signatur.

---

## 5. Notenskala & Richtlinie nach FH OÖ Standard

### 5.1 Notenschlüssel gem. Satzung der FH Oberösterreich

Die Leistungsbeurteilung erfolgt gemäß der offiziellen Notenskala der FH Oberösterreich:

$$\text{Gesamtprozent } P = 0{,}30 \cdot P_{\text{MCQ}} + 0{,}30 \cdot P_{\text{Übung}} + 0{,}40 \cdot P_{\text{Projekt}}$$

| Note | Bezeichnung | Prozentbereich | Definition nach FH OÖ Standard |
| :---: | :--- | :---: | :--- |
| **1** | **Sehr gut** | $90{,}0\,\% - 100{,}0\,\%$ | Eine den Anforderungen in weit über das Ziel hinausgehendem Maße entsprechende Leistung bei hervorragender Eigenständigkeit und vollendeter Beherrschung. |
| **2** | **Gut** | $80{,}0\,\% - 89{,}9\,\%$ | Eine den Anforderungen voll entsprechende Leistung bei überdurchschnittlicher Beherrschung und selbstständiger Problemlösung. |
| **3** | **Befriedigend** | $70{,}0\,\% - 79{,}9\,\%$ | Eine den Anforderungen im Wesentlichen entsprechende Leistung mit soliden Kenntnissen, jedoch kleineren Mängeln in Systematik oder Begründung. |
| **4** | **Genügend** | $60{,}0\,\% - 69{,}9\,\%$ | Eine den Anforderungen trotz erkennbarer Mängel noch knapp entsprechende Leistung, welche die elementaren Mindeststandards erfüllt. |
| **5** | **Nicht genügend** | $< 60{,}0\,\%$ | Eine den Anforderungen nicht entsprechende Leistung; Mindesterfordernisse wurden verfehlt. |

---

### 5.2 Mindesterfordernisse (Hürdenkriterien)

Um zu verhindern, dass Studierende Säulen vollständig abwählen (z. B. durch ein perfektes Projekt die Theorie komplett ignorieren), gelten folgende **strikte Mindesterfordernisse**:

1. **Teilbereichs-Hürde:** In **jeder der drei Teilsäulen** müssen mindestens **50 % der erreichbaren Punkte** erzielt werden:
   * $P_{\text{MCQ}} \ge 50\,\%$ (mind. 15 von 30 Punkten)
   * $P_{\text{Übung}} \ge 50\,\%$ (mind. 15 von 30 Punkten)
   * $P_{\text{Projekt}} \ge 50\,\%$ (mind. 20 von 40 Punkten)
   * *Wird in einer Teilsäule weniger als 50 % erreicht, wird die Lehrveranstaltung unabhängig von der rechnerischen Gesamtsumme mit „Nicht genügend“ (5) beurteilt.*
2. **Anwesenheitspflicht:** In den Labor- und Übungseinheiten gilt die studiengangsübliche Anwesenheitspflicht von **mindestens 80 %**.
3. **Das K.O.-Kriterium der mündlichen Verteidigung:**
   * Wenn ein Studierender in der mündlichen Verteidigung (Säule 2 oder Säule 3) fundamentale Teile seines Codes nicht erklären kann oder der Verdacht erhärtet wird, dass der Code weder selbst generiert noch verstanden wurde (Totalausfall in Kriterium K4), wird das Projekt bzw. der Meilenstein mit **0 Punkten** bewertet.
   * Bei schwerwiegender Leistungsverweigerung greift § 14 der Prüfungsordnung (Erschleichung von Leistungen).

---

### 5.3 Richtlinie zum KI-Einsatz („AI Compliance & Honor Code“)

Für die Lehrveranstaltung *Systemsimulation / Digitaler Zwilling* gilt ein moderner, professioneller **Honor Code**:

```
                              ┌──────────────────────────────────┐
                              │     FH OÖ AI HONOR CODE          │
                              │ "Verantwortung statt Verbot"     │
                              └─────────────────┬────────────────┘
                                                │
         ┌──────────────────────────────────────┴──────────────────────────────────────┐
         ▼                                      ▼                                      ▼
┌──────────────────┐                  ┌──────────────────┐                  ┌──────────────────┐
│   TRANSPARENZ    │                  │  VERANTWORTUNG   │                  │ VERTEIDIGBARKEIT │
│ Jedes Tool &     │                  │ Jede Zeile Code  │                  │ Wer abgibt, muss │
│ Prompt-Verfahren │                  │ gilt als eigene  │                  │ alles erklären & │
│ offenlegen       │                  │ Willenserklärung │                  │ live anpassen    │
└──────────────────┘                  └──────────────────┘                  └──────────────────┘
```

#### 1. Grundsatz der vollständigen Autorenschaft
* Die Studierenden sind voll verantwortlich für das eingereichte Endprodukt.
* Ausreden der Art *„Das hat ChatGPT so vorgeschlagen“*, *„Ich wusste nicht, was dieser Algorithmus macht“* oder *„Der Bug stammt aus dem Copilot-Autocomplete“* werden als **fachliches Unvermögen** gewertet und führen zu Punkteabzug in den Kriterien K2 und K4.

#### 2. Deklarationspflicht (AI Disclosure Statement)
Jeder Meilenstein- und Projektabgabe ist eine kurze Erklärung beizufügen:
* Verwendete KI-Tools (z. B. *Cursor Version 0.42 mit Claude 3.5 Sonnet*, *ChatGPT-4o*).
* Beschreibung des Einsatzbereichs (z. B. *„Erstellung des WPF-XAML-Layouts und Scaffolding der S-Function-Klassenstruktur; mathematische DGLs und Anti-Windup wurden manuell implementiert und validiert“*).
* Wichtigste Korrekturen: Kurze Nennung von mindestens einem Fall, in dem die KI fehlerhaften Code vorgeschlagen hat und wie dieser behoben wurde.

#### 3. Abgrenzung Täuschung vs. erlaubte Nutzung
* **Erlaubt:**
  * Nutzung von LLMs zum Generieren von Boilerplate-Code, C#-Klassen, WPF-Styles und XAML-Layouts.
  * Nutzung von LLMs als Tutor zur Erklärung von mathematischen Zusammenhängen (z. B. Butcher-Tableau).
  * Nutzung von KI-Tools zum Refactoring und zur Fehlersuche.
* **Täuschungshandlungen (Notennote 5 & Disziplinarverfahren):**
  * Unerlaubte Absprachen oder Nutzung fremder Hilfe während der Moodle-Präsenztests (Säule 1).
  * Einreichen von Projekten Dritter (Plagiat von Kommilitonen früherer Semester).
  * Fälschen von Validierungsplots (z. B. Zeichnen von gefakten Sinuskurven in `ScottPlot` anstelle echter Integrator-Ausgaben, um Stabilität vorzutäuschen).
  * Unfähigkeit, in der mündlichen Verteidigung nachzuweisen, dass man geistiger Urheber/Beherrscher der eingereichten Lösung ist.

---

## 6. Zusammenfassung & Mehrwert für die Lehre

Das vorliegende Assessment-Konzept löst das Dilemma zwischen akademischer Integrität und moderner KI-Realität an der FH Oberösterreich:

1. **Förderung zukunftsfähiger Ingenieurkompetenzen:** Die Studierenden lernen, KI als hochproduktiven Multiplikator einzusetzen, behalten jedoch die kritische, prüfende und validierende Rolle des verantwortlichen Mechatronik-Ingenieurs.
2. **Manipulationssicherheit durch Triangulation:** Durch die Kombination aus manipuliersicheren Moodle-Tests (Theorie), Labor-Micro-Defenses (Live-Handwerk) und mündlicher Projektverteidigung (Systemsynthese) ist ein Bestehen durch reines „Prompt-Glück“ mathematisch und praktisch ausgeschlossen.
3. **Didaktische Kongruenz:** Das Benotungsschema spiegelt exakt wider, worauf es beim Aufbau von Digitalen Zwillingen in der Industrie ankommt: **Präzision, Stabilität, physikalische Verlässlichkeit und defensive Softwarearchitektur.**
