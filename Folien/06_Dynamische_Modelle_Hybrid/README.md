---
marp: true
theme: fhooe
header: 'Kapitel 6: Hybride Dynamische Modelle (2025-11-13)'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

![bg right](./Titelbild.jpg)

# Kapitel 6: Hybride Dynamische Modelle

Dieses Kapitel umfasst die folgenden Abschnitte:

- 6.1: Einführung in Hybride Dynamische Modelle
- 6.2: Nulldurchgangsdetektion
- 6.3: Fallbeispiel: Der Bouncing Ball
- 6.4: Diskrete Blöcke mit regelmäßiger Abtastzeit
- 6.5: Diskrete Blöcke mit variabler Abtastzeit (Next Variable Hit Time)

---

![bg right:40%](./Illustrationen/Abschnitt_1.jpg)

## 6.1: Einführung in Hybride Dynamische Modelle

Dieser Abschnitt umfasst die folgenden Inhalte:

- **Definition** hybrider dynamischer Modelle
- **Abgrenzung** zu rein kontinuierlichen und rein diskreten Modellen
- **Typische Anwendungsbeispiele** (z.B. Systeme mit Regelung, Schaltvorgängen, physikalischen Kontakten)
- **Herausforderungen** bei der Simulation hybrider Systeme

---

![bg right:40%](./Illustrationen/Abschnitt_2.jpg)

## 6.2: Nulldurchgangsdetektion

Dieser Abschnitt umfasst die folgenden Inhalte:

- **Konzept** des Nulldurchgangs (Zero-Crossing)
- **Bedeutung** in hybriden Systemen (Ereignisdetektion)
- **Algorithmus** zur Nulldurchgangslokalisierung (Iterative Bisektion im `EulerExplicitSolver`)
- **Implementierung** im `Solver.cs` und `EulerExplicitSolver.cs`
- **Zero-Crossing-Funktionen** in Blöcken (`Block.cs`, `HitLowerLimitBlock.cs`, `IntegrateWithLimitsBlock.cs`)

---

![bg right:40%](./Illustrationen/Abschnitt_3.jpg)

## 6.3: Fallbeispiel: Der Bouncing Ball

Dieser Abschnitt umfasst die folgenden Inhalte:

- **Modellierung** des Bouncing Ball-Systems
    - Kontinuierliche Zustände (Position, Geschwindigkeit)
    - Diskret-Ereignisse (Aufprall auf den Boden)
- **Implementierung** des Modells (`BouncingBallExample.cs`)
    - `IntegrateWithResetBlock` für die Geschwindigkeit
    - `HitLowerLimitBlock` für die Bodenerkennung
- **Simulationsergebnisse** und Visualisierung
- **Diskussion** der Genauigkeit und Stabilität

---

![bg right:40%](./Illustrationen/Abschnitt_4.jpg)

## 6.4: Diskrete Blöcke mit regelmäßiger Abtastzeit

Dieser Abschnitt umfasst die folgenden Inhalte:

- **Definition** von diskreten Blöcken
- **Konzept** der regelmäßigen Abtastzeit (Fixed-Step Discrete Blocks)
- **Parameter** für Abtastzeit und Offset
- **Anwendungsbeispiele** (z.B. digitale Regler, Zähler)
- **Implementierung** (konzeptionell, da kein Code vorhanden)
    - `UpdateStates` Methode
    - Verwaltung der diskreten Zustände

---

![bg right:40%](./Illustrationen/Abschnitt_5.jpg)

## 6.5: Diskrete Blöcke mit variabler Abtastzeit (Next Variable Hit Time)

Dieser Abschnitt umfasst die folgenden Inhalte:

- **Motivation** für variable Abtastzeiten
- **Konzept** der "Next Variable Hit Time"
- **Ereignisgesteuerte Simulation** für diskrete Ereignisse
- **Anwendungsbeispiele** (z.B. Zustandsautomaten, ereignisbasierte Logik)
- **Implementierung** (konzeptionell, da kein Code vorhanden)
    - Ereignisliste
    - Ereignisbehandlung
