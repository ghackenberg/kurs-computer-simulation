# Aufgabenblatt Termin 09: Dynamische Modelle Diskret, Diskrete Ereignissimulation (DES) & Warteschlangen
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
### FH Oberösterreich – Campus Wels | Studiengang Automatisierungstechnik

---

| Metadaten | Details |
| :--- | :--- |
| **Lehrveranstaltungseinheit:** | Termin 09 (begleitend zu Kapitel 09: Dynamische Modelle Diskret) |
| **Themenschwerpunkt:** | Diskrete Ereignissimulation (DES), Future Event List (FEL), Inversionsmethode, $M/M/c/K$-Systeme & Little's Gesetz |
| **Technologie-Stack:** | C# 12 / .NET 8/10, `System.Collections.Generic.PriorityQueue<TElement, TPriority>`, TPL `Parallel.For`, ScottPlot 5 |
| **Vorgreif-Sperre:** | **Erlaubt:** `PriorityQueue`, stochastische Zufallsgeneratoren, Inversionsmethode, TPL für Replikationen, ScottPlot 5.<br>**Strengstens verboten:** *KEINE* kontinuierlichen DGL-Schaltfunktionen (Zero-Crossing Wurzelsuche)! |
| **Zeitbudget:** | **In-Class Sprint:** 60 Minuten (Laborpräsenz)<br>**Homework Extension:** 2–3 Stunden (2er-Team, 1 Woche) |
| **Abgabeform:** | Git-Repository: Sourcecode, Unit-Tests und Markdown-Bericht (`README.md`) |

---

## 1. Lernziele (Intended Learning Outcomes - ILOs)

Nach erfolgreicher Bearbeitung dieser Übungseinheit sind Sie in der Lage:
1. **DES-Engine mit FEL konzipieren:** Eine zeitdiskrete Simulations-Engine mit ereignisgesteuertem Zeitsprung ($t \leftarrow t_{\text{event}}$) unter Nutzung der modernen .NET `PriorityQueue<TElement, double>` als Future Event List (FEL) aufzubauen.
2. **Stochastische Prozesse modellieren:** Exponentialverteilte Zufallsvariablen für Poisson-Ankunftsprozesse und Servicezeiten mittels der mathematischen Inversionsmethode ($\tau = -\frac{1}{\lambda} \ln(1 - U)$) exakt und thread-sicher zu erzeugen.
3. **Mehrkanal-Wartesysteme abbilden:** Reale $M/M/c/K$-Systeme mit mehreren parallelen Servern ($c$), begrenzter Pufferkapazität ($K$) und Prioritätsklassen (Non-preemptive Priority Queuing) modular zu implementieren.
4. **Little's Gesetz empirisch nachweisen:** Den fundamentalen stationären Erhaltungssatz der Warteschlangentheorie $\bar{L} = \lambda_{\text{eff}} \cdot \bar{W}$ über statistische Datenakkumulation zu verifizieren.
5. **Monte-Carlo-Konfidenzintervalle berechnen:** Simulationsläufe über TPL `Parallel.For` zu replizieren und 95%-Konfidenzintervalle für Durchlauf- und Wartezeiten auszuweisen.

---

## 2. Mathematisch-Theoretische Grundlagen

### 2.1 Das Paradigma der Diskreten Ereignissimulation (DES)

Im Gegensatz zu kontinuierlichen Zeitschrittverfahren (z. B. Euler, RK4) springt eine DES von Ereignis zu Ereignis:
$$\Delta t_{\text{step}} = t_{\text{next\_event}} - t_{\text{current}} \ge 0$$
Dazwischen ändert sich der Systemzustand nicht. Die Verwaltung aller zukünftigen Ereignisse erfolgt über eine min-orientierte Prioritätswarteschlange (**Future Event List, FEL**).

```
┌────────────────────────────────────────────────────────────────────────┐
│ DISCRETE EVENT SIMULATION LOOP (FEL)                                   │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │ Future Event List (FEL): PriorityQueue<Event, Timestamp>     │     │
│   │   [ t=12.4: Arrival ] <── Top Element (nächste Aktion)       │     │
│   │   [ t=15.1: Departure Server 1 ]                             │     │
│   │   [ t=18.7: Departure Server 2 ]                             │     │
│   └──────────────────────────────────────────────────────────────┘     │
│             │                                                          │
│             ▼ Dequeue next event                                       │
│   Simulationsuhr vorrücken: t = 12.4                                   │
│   Zustand aktualisieren (Queue++, Serverbelegung)                      │
│   Folge-Ereignisse einplanen (Enqueue FEL)                             │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Die Inversionsmethode für Exponentialverteilung

Ein Poisson-Prozess mit Zählrate $\lambda$ besitzt exponentialverteilte Zwischenankunftszeiten $\tau \sim \text{Exp}(\lambda)$:
$$F(\tau) = 1 - e^{-\lambda \tau} = U \quad \implies \quad \tau = -\frac{1}{\lambda} \ln(1 - U)$$
wobei $U \sim \mathcal{U}(0, 1)$ eine standardgleichverteilte Zufallsvariable ist.

### 2.3 Little's Gesetz & $M/M/c/K$-Systeme

Für jedes stabile Wartesystem im stationären Zustand gilt **Little's Gesetz**:

$$\bar{L} = \lambda_{\text{eff}} \cdot \bar{W}, \quad \bar{L}_{\text{q}} = \lambda_{\text{eff}} \cdot \bar{W}_{\text{q}}$$

- $\bar{L}$: Mittlere Anzahl Einheiten im Gesamtsystem (Warteschlange + Bedienung).
- $\bar{L}_{\text{q}}$: Mittlere Anzahl wartender Einheiten in der Queue (zeitgewichteter Mittelwert: $\bar{L}_{\text{q}} = \frac{1}{T} \int_0^T L_{\text{q}}(t)\,\mathrm{d}t$).
- $\bar{W}$: Mittlere Verweilzeit im Gesamtsystem.
- $\bar{W}_{\text{q}}$: Mittlere reine Wartezeit in der Queue.
- $\lambda_{\text{eff}}$: Effektive Ankunftsrate. Bei begrenzter Kapazität $K$ gehen blockierte Einheiten verloren:
  $$\lambda_{\text{eff}} = \lambda \cdot (1 - P_{\text{Block}})$$

---

## 3. Stufe A: In-Class Sprint (60 min)

### Thema: „FEL-Engine, Puffergrenzen, Log-Normal-Kausalität & Monte-Carlo in `DiscreteEventSimulation.sln`“

In der bereitgestellten WPF-Starter-Vorlage (`Vorlage/DiscreteEventSimulation.sln`) sind die ereignisdiskrete Future Event List (`EventQueue`), die Exponentialverteilung (`ExponentialDistribution`), das Basis-Warteschlangenmodell (`QueueSystem`) sowie das `ScottPlot.WPF`-Dashboard (`MainWindow.xaml.cs`) bereits als lauffähige Baseline vorimplementiert. Starten Sie die Anwendung und bearbeiten Sie im Live-Sprint die folgenden **3 Erweiterungsaufgaben**:

```
┌────────────────────────────────────────────────────────────────────────┐
│ STUFE A: M/M/1/K- UND M/G/1-WARTESYSTEM (WPF + SCOTTPLOT 5)            │
│                                                                        │
│   Ankünfte           Wartepuffer (max K)           Bedienstation       │
│   lambda = 4/min     Queue<Customer>               c = 1 (mu = 5/min)  │
│   ───────────────>   [ ■ ■ ■ ■ ] ───────────────>  [ SERVER ] ───────> │
│                         │                                              │
│                         └── voll (Count >= K)? ──> BLOCKED (P_Block)   │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung (Schritt für Schritt):

1. **Aufgabe A1 – Wartepuffer-Kapazität $K$ vs. Systemkapazität & Little's Gesetz unter Blocking (`QueueSystem.cs`):**
   - Starten Sie die Vorlage zunächst mit den Standardwerten ($\lambda = 4{,}0/\text{min}$, $\mu = 5{,}0/\text{min}$, $c = 1$, $K = 0 \implies \infty$) und vergleichen Sie die gemessene mittlere Warteschlangenlänge $\bar{L}_q$ mit dem analytischen Erlang-Wert $L_q = \frac{\rho^2}{1 - \rho} = 3{,}20$.
   - Öffnen Sie `Models/QueueSystem.cs` beim Kommentar `// TODO [Aufgabe A1]`: Aktuell prüft der Code `totalInSystem >= Capacity` (Gesamtsystem-Kapazität inkl. Server). Ändern Sie die Abfrage so, dass `Capacity` die reine **Wartepuffer-Kapazität** `waitingQueue.Count >= Capacity` begrenzt.
   - Setzen Sie in der GUI die Kapazität auf $K = 10$ (und anschließend im Überlastfall $\lambda = 6{,}0/\text{min} > \mu$). Vergleichen Sie im Dashboard den relativen Fehler von Little's Gesetz mit der **effektiven Ankunftsrate** $\lambda_{\text{eff}} = \lambda (1 - P_{\text{Block}})$ gegenüber dem naiven Einsetzen der Brutto-Ankunftsrate $\lambda$!
2. **Aufgabe A2 – Log-Normalverteilte Bedienzeiten via Box-Muller & $M/G/1$-Effekt (`LogNormalDistribution.cs`):**
   - Öffnen Sie `Random/LogNormalDistribution.cs` bei `// TODO [Aufgabe A2]`. Aktuell gibt `Sample()` lediglich den konstanten Mittelwert `Mean` zurück (deterministische Bedienzeit $M/D/1$ – testen Sie dies kurz in der GUI per Checkbox: $\bar{L}_q$ halbiert sich auf $\approx 1{,}60$!).
   - Implementieren Sie in `Sample()` die **Box-Muller-Transformation** für $Z \sim \mathcal{N}(0, 1)$ und geben Sie $X = \exp(\mu_{\ln} + \sigma_{\ln} Z) > 0$ zurück (vgl. Folienabschnitt 9.6):
     ```csharp
     double u1 = 1.0 - _random.NextDouble();
     double u2 = 1.0 - _random.NextDouble();
     double z = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Cos(2.0 * Math.PI * u2);
     return Math.Exp(MuLog + SigmaLog * z);
     ```
   - Aktivieren Sie in der GUI die Checkbox *„Log-Normal-Bedienzeit aktivieren“* mit $\sigma_{\text{service}} = 0{,}40\,\text{min}$ (bei gleichem Mittelwert $1/\mu = 0{,}20\,\text{min}$) und beobachten Sie im Histogramm sowie an $\bar{L}_q$, wie stark Rechtsschiefe (Heavy Tail) die Warteschlange trotz unveränderter Auslastung $\rho = 80\,\%$ aufbläht (Pollaczek-Khinchine-Effekt)!
3. **Aufgabe A3 – Parallele Monte-Carlo-Replikationen (`Parallel.For`) & 95%-Konfidenzintervall (`MainWindow.xaml.cs`):**
   - Öffnen Sie `MainWindow.xaml.cs` in der Methode `RunMonteCarloSimulation()` bei `// TODO [Aufgabe A3]`.
   - Erhöhen Sie die Anzahl der Replikationen von `replications = 5` auf `replications = 100` und parallelisieren Sie die Schleife mittels `Parallel.For(0, replications, r => { ... })` unter Verwendung des deterministischen Prime-Stride-Seeds `int seed = 42 + r * 104729;` (vgl. Folienabschnitt 9.7).
   - Prüfen Sie im unteren ScottPlot-Diagramm, wie sich der Standardfehler $\text{SE} = s_W / \sqrt{R}$ und die Breite des 95%-Konfidenzintervalls $\bar{W} \pm 1{,}96 \cdot \text{SE}$ durch Verzwanzigfachung der Stichprobe verkleinern.

**Erwartetes Ergebnis nach dem Sprint:**  
- Bei $K = 10$ gilt $\bar{L} = \lambda_{\text{eff}} \cdot \bar{W}$ exakt ($< 0{,}5\,\%$ Fehler), während $\lambda \cdot \bar{W}$ um die Blockierwahrscheinlichkeit $P_{\text{Block}}$ abweicht.  
- Bei $R = 100$ parallelen Läufen schrumpft das 95%-Konfidenzintervall für $\mathbb{E}[W]$ auf ca. $\pm 0{,}015\,\text{min}$ um den theoretischen Wert $W = 1{,}00\,\text{min}$.

---

## 4. Stufe B: Homework Extension (Wahlmodell – GENAU EINE Aufgabe!)

> [!IMPORTANT]
> **Pick your Track (Wahlmodell – KEINE Doppelbelastung!):**  
> Wählen Sie als 2er-Team für die Hausübung **GENAU EINEN** der beiden Tracks:
> - **Track A (Industrie):** Automobil-Lackierstraße mit M/M/c-Puffern, Blocking & Little's Gesetz
> - **Track B (Simulation Game):** Theme Park Rush & Achterbahn-Warteschlangen mit VIP-Fastpass
> 
> Beide Aufgaben basieren auf der diskreten Ereignissimulation mit Mehrkanal-Servern ($M/M/c/K$), Prioritätswarteschlangen und statistischer Validierung über Little's Gesetz. Bearbeiten Sie **NUR EINEN** Track!

---

### Track A (Industrie): Automobil-Lackierstraße mit M/M/c-Puffern & Little's Gesetz

#### Industrieller Kontext:
In der Automobilendmontage werden Rohkarosserien durch eine Lackierstraße geschleust. Die Station besteht aus $c = 3$ parallelen Roboterkabinen. Ein vorgelagerter Puffer fasst maximal $K = 25$ Karosserien. Ist der Puffer voll, müssen ankommende Karosserien auf Notfallspuren abgeleitet werden ($P_{\text{Block}}$). Zudem genießen Eilaufträge Vorrang.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK A: AUTOMOBIL-LACKIERSTRASSE (M/M/3/25 MIT PRIORITÄT)             │
│                                                                        │
│   Karosserie-Eingang              Puffer (max K = 25)                  │
│   80% Standard (Prio 1) ───┐      ┌───┬───┬───┬───┬───┐                │
│   20% Express  (Prio 0) ───┼─────>│ E │ E │ S │ S │ S │                │
│                            │      └───┴───┴───┴───┴───┘                │
│   Puffer voll (K=25)? ─────┘        ▲                                  │
│   ──> BLOCKIERT / ABGEWIESEN        └── Express überholt Standard!     │
│                                                                        │
│                            ┌───────────────┐                           │
│                            │ Kabine 1 (mu) │                           │
│                            ├───────────────┤                           │
│                            │ Kabine 2 (mu) │ ───> Fertig lackiert      │
│                            ├───────────────┤                           │
│                            │ Kabine 3 (mu) │                           │
│                            └───────────────┘                           │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track A:

1. **Systemkonfiguration & Multi-Server Logik:**
   - $c = 3$ identische parallele Lackierkabinen, jede mit Bedienrate $\mu = 1{,}5\,\text{Karosserien/h}$.
   - Gesamte Ankunftsrate: $\lambda = 4{,}0\,\text{Karosserien/h}$ (Exponentialverteilung via Inversionsmethode).
   - Gesamtauslastung $\rho = \frac{\lambda}{c \cdot \mu} = \frac{4{,}0}{4{,}5} \approx 0{,}889$.
   - Puffergrenze: $K = 25$ (warten bereits 25 Karosserien, wird jede weitere Ankunft abgewiesen).
2. **Prioritäts-Warteschlange (Non-preemptive Priority):**
   - $80\,\%$ der Karosserien sind Standard-Aufträge (Priorität 1).
   - $20\,\%$ sind Express-Serien / Eilaufträge (Priorität 0, höchster Vorrang).
   - Express-Karosserien reihen sich vor wartenden Standard-Karosserien ein. Bereits lackierende Aufträge werden jedoch nicht unterbrochen.
3. **Statistische Verifikation von Little's Gesetz:**
   - Verfolgen Sie jede einzelne Karosserie mit individueller Eintrittszeit $t_{\text{in}}$ und Austrittszeit $t_{\text{out}}$.
   - Berechnen Sie über $T_{\max} = 50\,000\,\text{h}$:
     - Gemessene Blocking-Wahrscheinlichkeit: $P_{\text{Block}} = \frac{N_{\text{rejected}}}{N_{\text{total}}}$.
     - Effektive Ankunftsrate: $\lambda_{\text{eff}} = \frac{N_{\text{served}}}{T_{\max}} = \lambda (1 - P_{\text{Block}})$.
     - Mittlere Verweilzeit $\bar{W}$ und mittlere reine Wartezeit $\bar{W}_{\text{q}}$ getrennt für Express und Standard.
     - Mittlere Bestände $\bar{L}$ und $\bar{L}_{\text{q}}$ über das zeitgewichtete Integral.
   - **Beweis:** Zeigen Sie im Bericht, dass $\bar{L} = \lambda_{\text{eff}} \cdot \bar{W}$ bis auf $< 1\,\%$ übereinstimmt.
4. **Multithreadete Monte-Carlo-Replikation & ScottPlot:**
   - Führen Sie 100 Replikationen (mit unterschiedlichen Seeds via `Parallel.For`) über je $5000\,\text{h}$ durch.
   - Berechnen Sie den Mittelwert und das 95%-Konfidenzintervall:
     $$\text{CI}_{95\%} = \bar{W} \pm 1{,}96 \cdot \frac{s_W}{\sqrt{N_{\text{runs}}}}$$
   - Plotten Sie das Verteilungs-Histogramm der Verweilzeiten in ScottPlot 5.

---

### Track B (Simulation Game): Theme Park Rush & Achterbahn-Warteschlangen

#### Game-Kontext:
In Freizeitpark-Aufbauspielen (*RollerCoaster Tycoon*, *Planet Coaster*) entscheiden Wartezeiten über Besucherzufriedenheit und Parkbewertung. Die Top-Attraktion besitzt $c = 3$ parallele Drehkreuze und ein exklusives „Fastpass“-Ticket. Ist die Queue voll, drehen Besucher frustriert ab.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRACK B: FREIZEITPARK ACHTERBAHN-DREHKREUZE                            │
│                                                                        │
│   Gäste-Ankunft                                                        │
│   80% Normaler Gast (Queue Standard) ──┐                               │
│   20% VIP FastPass  (Queue Express)  ──┼──> Wartebereich (max K = 25)  │
│                                        │    VIPs werden bevorzugt!     │
│   Wartebereich voll (K=25)? ───────────┘                               │
│   ──> FRUSTRIERTER ABGANG (LOST CUSTOMER)                              │
│                                                                        │
│                         ┌───────────────────────┐                      │
│                         │ Drehkreuz 1 (Boarding)│                      │
│                         ├───────────────────────┤                      │
│                         │ Drehkreuz 2 (Boarding)│ ───> Achterbahnfahrt │
│                         ├───────────────────────┤                      │
│                         │ Drehkreuz 3 (Boarding)│                      │
│                         └───────────────────────┘                      │
└────────────────────────────────────────────────────────────────────────┘
```

#### Aufgabenstellung Track B:

1. **Achterbahn-Drehkreuze & Einlasslogik:**
   - $c = 3$ Abfertigungsstationen (Drehkreuze), Bedienrate $\mu = 1{,}5\,\text{Gäste/min}$.
   - Ankunftsrate: $\lambda = 4{,}0\,\text{Gäste/min}$ (Inversionsmethode).
   - Maximaler Wartebereich vor den Drehkreuzen: $K = 25$ Personen. Kommen weitere Gäste, verlassen sie verärgert die Warteschlange (Lost Visitors).
2. **FastPass-Vorrangsystem:**
   - VIP/FastPass-Gäste ($20\,\%$) haben absolute Priorität vor regulären Parkbesuchern ($80\,\%$).
   - Wird ein Drehkreuz frei, wird zuerst die VIP-Warteschlange bedient.
3. **Statistische Verifikation von Little's Gesetz:**
   - Messen Sie die individuelle Aufenthaltsdauer aller Gäste.
   - Berechnen Sie $\bar{W}_{\text{VIP}}$ vs. $\bar{W}_{\text{Standard}}$.
   - Verifizieren Sie empirisch Little's Gesetz: $\bar{L}_{\text{system}} = \lambda_{\text{eff}} \cdot \bar{W}_{\text{system}}$.
4. **Multithreadete Monte-Carlo-Simulation:**
   - 100 Replikationen via `Parallel.For` über je einen 12-Stunden-Öffnungstag ($720\,\text{min}$).
   - Ermitteln Sie das 95%-Konfidenzintervall der maximalen Wartezeit eines regulären Gastes.
   - Visualisieren Sie die Wartezeitverteilung in ScottPlot 5.

---

## 5. Akzeptanzkriterien & Definition of Done

Für die volle Punktzahl (10 Punkte) müssen folgende Kriterien erfüllt sein:

| Kriterium | Punkte | Beschreibung |
| :--- | :---: | :--- |
| **DES-Engine & PriorityQueue** | **3 P.** | Korrekte Future Event List mit `PriorityQueue`; reiner ereignisdiskreter Zeitsprung ($t \leftarrow t_{\text{event}}$); saubere Trennung von Arrival und Departure. |
| **Inversionsmethode & Prioritäten** | **3 P.** | Mathematisch exakte Inversionsmethode für $\text{Exp}(\lambda)$; Prioritätsbehandlung (Express/Fastpass) einwandfrei abgebildet. |
| **Little's Gesetz & Verifikation** | **2 P.** | Empirischer Nachweis von $\bar{L} = \lambda_{\text{eff}} \cdot \bar{W}$ inklusive korrekter Berücksichtigung abgewiesener Einheiten ($P_{\text{Block}}$) im Bericht. |
| **Monte-Carlo & ScottPlot** | **2 P.** | Parallele Ausführung von 100 Replikationen (`Parallel.For`); Berechnung des 95%-Konfidenzintervalls; ansprechendes Histogramm in ScottPlot 5. |

---

## 6. Online-Recherche-Box

Nutzen Sie zur Vorbereitung und Vertiefung folgende Quellen:

- **Offizielle Dokumentation:**
  - [Microsoft Learn: PriorityQueue<TElement, TPriority> Class](https://learn.microsoft.com/de-de/dotnet/api/system.collections.generic.priorityqueue-2)
  - [Wikipedia: Discrete-event simulation (DES)](https://en.wikipedia.org/wiki/Discrete-event_simulation)
  - [Wikipedia: Little's law](https://en.wikipedia.org/wiki/Little%27s_law)
  - [Wikipedia: M/M/c queue (Erlang-C)](https://en.wikipedia.org/wiki/M/M/c_queue)
- **Gezielte englische Suchbegriffe:**
  - `C# PriorityQueue discrete event simulation future event list`
  - `inversion method exponential random variable NextDouble`
  - `Little's law verification simulation effective arrival rate`
  - `M/M/c/K queue blocking probability simulation C#`

---

## 7. Vibe-Coding Prompting-Tipps

Falls Sie KI-Assistenten verwenden, beachten Sie folgende Vorgaben zur Vermeidung typischer KI-Fehler:

> [!TIP]
> **Prompt-Vorlage 1: Echter DES-Event-Loop statt Timer-Tick**  
> *„Schreibe mir eine diskrete Ereignissimulation (DES) in C#. Nutze `PriorityQueue<IEvent, double>` als Future Event List. Verwende KEINEN `DispatcherTimer`, KEINE `Task.Delay`-Aufrufe und KEINE festen Zeitschritte $\Delta t$! Die Simulationszeit $t$ muss in jedem Schritt direkt auf die Zeit des nächsten Events `fel.Dequeue()` springen.“*

> [!WARNING]
> **Prompt-Vorlage 2: Inversionsmethode ohne mathematische Singularität**  
> *„Zeige mir die C#-Formel zur Erzeugung einer exponentialverteilten Zufallsvariablen aus `Random.Shared`. Beachte: `1.0 - NextDouble()` verhindert die Auswertung von $\ln(0)$, was zu `-Infinity` führen würde: `double tau = -Math.Log(1.0 - rnd.NextDouble()) / lambda;`. Stelle sicher, dass der Random-Generator in parallelen Replikationen thread-sicher ist.“*

---

## 8. 🔍 Peer-Review-Leitfragen für das Auditorium

Beim wöchentlichen „Showcase & Peer-Challenge“ prüft das Auditorium die vorgeführten Lösungen anhand folgender Fragen:

1. **Prüfung von Little's Gesetz:** Stimmt $\bar{L} = \lambda_{\text{eff}} \cdot \bar{W}$ überein? *(Auditorium-Test: Wurde bei der Berechnung von $\lambda_{\text{eff}}$ der Ausschuss / die geblockten Kunden herausgerechnet, oder wurde naiv die Brutto-Ankunftsrate $\lambda$ eingesetzt, was bei $K=25$ zu einem eklatanten Rechenfehler führt?)*
2. **Ereignisdiskreter Ablauf vs. Pseudo-Timer:** Gibt es im Quellcode irgendeine Schleife mit festem $\Delta t$ oder `Thread.Sleep`, oder springt die Simulation blitzschnell über $50\,000$ Stunden in wenigen Millisekunden rein über die `PriorityQueue`?
3. **Prioritätslogik (Non-preemptive):** Überholt ein eintreffender Eilauftrag sofort alle wartenden Standardaufträge in der Schlange? Bleibt ein bereits in Bearbeitung befindlicher Auftrag ungestört bis zu seinem Departure-Event?
4. **Statistische Signifikanz:** Wurden 100 Replikationen gerechnet und ein 95%-Konfidenzintervall angegeben, oder basiert die Aussage auf einem einzigen Zufallslauf?
