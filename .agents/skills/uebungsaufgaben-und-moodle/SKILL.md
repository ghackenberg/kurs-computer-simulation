---
name: uebungsaufgaben-und-moodle
description: >-
  Regeln für den Aufbau, die Symmetrie und die Synchronisation von Übungsblättern
  (Uebungen/Termin_XX_*/Aufgabenblatt.md), C#-Vorlagen (Vorlage/**), Konzeptdokumenten
  (Konzept/*.md), Moodle-Termintexten (Moodle/Moodle_Kursstruktur_und_Termintexte.md)
  sowie Moodle-Quizzes (Moodle/Quiz_0X_*/**).
  IMMER aktivieren, wenn Übungsaufgaben, Vorlagen, Moodle-Texte oder Moodle-Quizzes bearbeitet werden.
---

# Skill: Übungsaufgaben, C#-Vorlagen, Moodle-Synchronisation & Quizzes

Dieser Skill regelt den didaktischen und strukturellen Aufbau der 10 Übungseinheiten (`Uebungen/Termin_01` bis `Termin_10`), der 4 summativen Moodle-Quizzes (`Moodle/Quiz_01_...` bis `Quiz_04_...`) sowie die Synchronisation mit den Vorlesungsfolien, Konzeptdokumenten und Moodle-Texten.

---

## 1. Struktur & Symmetrie der Übungsblätter (`Aufgabenblatt.md`)

Die gesamte Programmierarbeit (**Stufe 1 + Stufe 2**) findet **als zweistufige Hausübung zu Hause im 2er-Team** statt (in der Präsenzveranstaltung gibt es **kein Live-Coding** und **keinen In-Class-Programmiersprint**, da die Präsenzzeit durch Showcase/Peer-Review, Moodle-Quiz und die umfangreiche Vorlesung vollständig ausgefüllt ist).

> **WICHTIGE BEZEICHNUNGS-REGEL (Ziffern für Stufen, Buchstaben für Tracks!):**
> Um jede Verwechslung zwischen der zeitlichen Reihenfolge (beide Stufen verpflichtend!) und der Track-Wahl (nur ein Track zu wählen!) auszuschließen, werden **Stufen immer mit Ziffern (`Stufe 1`, `Stufe 2`)** und **Tracks immer mit Buchstaben (`Track A`, `Track B`)** bezeichnet:
> - **Ziffern (`Stufe 1` $\to$ `Stufe 2`) = Nacheinander (Stufe 1 UND Stufe 2 sind Pflicht!)**
> - **Buchstaben (`Track A` | `Track B`) = Auswahl innerhalb von Stufe 2 (Track A ODER Track B!)**

Jedes Aufgabenblatt besteht aus zwei aufeinander aufbauenden Stufen für die Hausarbeit:

### 1.1 Stufe 1: Basisaufgabe (Gemeinsames Fundament mit Unit-Tests, Teilaufgaben `1.1` bis `1.4`)
- Alle Studierenden starten zu Hause auf Basis der bereitgestellten C#-Projektvorlage (`Uebungen/Termin_XX_.../Vorlage/...sln`) inklusive automatisierter Unit-Tests (`dotnet test`).
- **Stufe 1** umfasst 3–4 präzise geführte Teilaufgaben (**`Aufgabe 1.1` bis `Aufgabe 1.4`**, ca. 60 Minuten Bearbeitungszeit zu Hause), die die Kernmechanik der aktuellen Vorlesung am lauffähigen Code verankern (z. B. einen konkreten Bug wie Bounding-Box-Jittering beheben, eine zentrale Formel implementieren, die mitgelieferten Unit-Tests auf Grün bringen).
- **Wichtig:** Das Ergebnis von **Stufe 1** ist das **direkte technische Fundament für BEIDE Ausbau-Tracks in Stufe 2**!

### 1.2 Stufe 2: Vertiefungsaufgabe (Wahlmodell: Track A ODER Track B)
Für das Wahlmodell in **Stufe 2** gelten vier eiserne Regeln:
1. **Genau 1 Track A (Industrie & Mechatronik, Arbeitspakete `A.1`–`A.4`) und genau 1 Track B (Simulation Game, Arbeitspakete `B.1`–`B.4`):**
   - Niemals Unter-Optionen wie `Option B.1 ODER Option B.2` aufmachen! Jeder Track ist eine einzige, klar spezifizierte Aufgabe.
2. **Beide Tracks müssen direkt auf Stufe 1 (`Vorlage/...sln`) aufbauen:**
   - Weder Track A noch Track B darf verlangen, dass die Studierenden den Code aus Stufe 1 verwerfen und auf der grünen Wiese neu beginnen.
   - In der C#-Vorlage (`MainWindow.xaml.cs` bzw. `Program.cs`) müssen für Stufe 1 (`// TODO: [Stufe 1 - Aufgabe 1.X: ...]`) sowie für **beide** Tracks in Stufe 2 (`// TODO: [Stufe 2 Track A: ...]` und `// TODO: [Stufe 2 Track B: ...]`) klare Kommentarblöcke vorhanden sein.
   - **UI-Kontext & Methodennamen in den Vorlagen:** Wenn in einer WPF-Oberfläche (`MainWindow.xaml`, z. B. `ComboBoxItem`) oder einem Konsolenmenü (`Program.cs`) zwischen der Basisaufgabe und den Vertiefungstracks umgeschaltet wird, müssen Track A und Track B **immer explizit in den Kontext von Stufe 2** gesetzt werden (z. B. `Stufe 1: ...` vs. `Stufe 2 (Track A): ...` / `Stufe 2 (Track B): ...`, niemals `Stufe 1: ...` direkt neben kontextlosem `Track A: ...`). Methoden- und Klassennamen für Stufe 1 verwenden `Stage1` oder `Base` (niemals das veraltete `Sprint`).
3. **Exakt gleicher Umfang (Symmetrische Arbeitspakete), aber null Redundanz:**
   - Beide Tracks werden in gleich viele (typischerweise **4**) symmetrische Arbeitspakete mit identischem Programmieraufwand und identischer Punkteverteilung in der Bewertungsrubrik (10 Punkte) gegliedert.
   - Inhaltlich müssen sich Track A und Track B klar unterscheiden (keine 80-%-Doppelung!):
     - *Beispiel Termin 03:* **Track A** fokussiert auf *normgerechte 2D-CAD-Inspektion* (zweistufige DIN-406-Bemaßungskette, Ziehen der Kraftpfeilspitzen $(F_x, F_y)$, Mausrad-Zoom/Pan), während **Track B** auf *interaktives Level-Building („Poly Bridge“)* fokussiert (Schlucht-Polygone, $0{,}5\,\text{m}$-Grid-Snapping, Knoten/Stäbe setzen & löschen mit Maximallänge $L_{\max}$ und Live-Baubudget).
4. **Kausalitäts-Sperre & Schnittstellen-Kontinuität über Termine hinweg:**
   - Strikte Einhaltung der Vorgreif-Sperre (z. B. in Termin 03 reine 2D-Vektorgeometrie ohne Statik/Cholesky; erst in Termin 07 folgt die FEM-Berechnung).
   - Wenn ein späterer Termin (wie Termin 07) auf den Daten eines früheren Termins (wie Termin 03) aufbaut, müssen **beide** Tracks (A und B) in Termin 03 dasselbe kompatible Austauschformat (z. B. JSON-Export von Knoten, Stäben, Lagern, Lasten) erzeugen!

---

## 2. Verbindliche 6-Punkte-Synchronisations-Checkliste

Wenn sich der Inhalt oder Zuschnitt einer Übungsaufgabe für Termin `XX` ändert, müssen **alle 6 folgenden Orte** synchron aktualisiert werden:

1. **Das Aufgabenblatt selbst:**
   - `Uebungen/Termin_XX_.../Aufgabenblatt.md` (inkl. ASCII-Auswahlbaum, Arbeitspakete, 10-Punkte-Rubrik, LLM-Prompt und Peer-Review-Fragen).
   - Prüfen: **Kein `€`-Symbol innerhalb von `$ ... $` Mathe-Umgebungen** verwenden (immer `\text{EUR}` schreiben, da KaTeX beim PDF-Export sonst eine Unicode-Warnung wirft!).
   - PDF neu generieren: `npm run export:pdf:uebung:XX`.
2. **Die C#-Projektvorlage:**
   - `TODO`-Kommentare in `Uebungen/Termin_XX_.../Vorlage/...` für **Stufe 1**, **Stufe 2 – Track A** und **Stufe 2 – Track B** synchron halten.
3. **Die Hausübungs-Folie am Ende von Vorlesungskapitel `XX`:**
   - Letzte Folie (`### Hausübung Termin XX: ...`) in `Folien/XX_.../Folien.md` anpassen (nennt oben **Stufe 1: Basisaufgabe** für alle Teams und darunter zweispaltig **Stufe 2: Vertiefungsaufgabe** mit **Track A** links und **Track B** rechts) + `npm run lint:slides:XX` & `npm run export:pdf:XX`.
4. **Die Showcase-Folie am Anfang des Folgekapitels `XX+1`:**
   - Folie 2 (`### Showcase & Peer-Challenge: Termin XX`) in `Folien/[XX+1]_.../Folien.md` anpassen + `npm run lint:slides:[XX+1]` & `npm run export:pdf:[XX+1]`.
5. **Die Konzept-Dokumente:**
   - `Konzept/01_Lehrveranstaltungsstruktur_und_Syllabus.md` (Übersichtstabelle & Termin-Steckbrief)
   - `Konzept/02_Uebungskatalog_und_Abschlussprojekt.md`
6. **Die Moodle-Kursstruktur (`Moodle/Moodle_Kursstruktur_und_Termintexte.md`):**
   - **WICHTIGE FORMATIERUNGSREGEL FÜR MOODLE:** Der Text aus `Moodle/Moodle_Kursstruktur_und_Termintexte.md` wird als HTML nach Moodle kopiert. Verwende in dieser Datei **KEINE LaTeX-Formeln (`$...$`)** und **KEINE Inline-Code-Backticks (`` `...` ``)**, da diese in Moodle unschönes Text-Layout verursachen! Schreibe Zahlen und Einheiten dort immer als reinen Fließtext (z. B. `0,5-m-Grid-Snapping`, `bis 4,0 m`).
   - **Vorsicht beim Editieren:** Prüfe nach dem Editieren mit `git diff Moodle/Moodle_Kursstruktur_und_Termintexte.md`, dass die Änderung unter dem richtigen Termin (`### Termin XX:`) gelandet ist (da die Aufzählungspunkte `* **Stufe 1 (Basisaufgabe):**` in jedem Termin gleich beginnen!).

---

## 3. Moodle-Quiz-Design, Kausalität & Anti-Bias-Regeln (`Moodle/Quiz_01` bis `Quiz_04`)

Aus der Evaluation im Hörsaal (Termin 03) gelten für alle vier summativen Moodle-Quizzes verbindliche Qualitäts- und Kausalitätsregeln:

### 3.1 Strikte Rückwärts-Kausalität (Quiz findet immer ZU BEGINN des Termins statt!)
Da jedes Quiz in den ersten 15 Minuten **vor** dem Theorie-Impuls des jeweiligen Termins geschrieben wird, darf es **ausschließlich den Stoff der vorangegangenen Termine** abfragen (niemals das Kapitel des aktuellen Termins!):

| Quiz | Zeitpunkt | Geprüfte Kapitel (Rückwärts-Kausalität) | Kernthemen | Strengstens ausgeschlossen (Tabu!) |
| :--- | :--- | :--- | :--- | :--- |
| **Quiz 01** | Zu Beginn von **Termin 03** | **Kapitel 00, 01, 02** *(T01 & T02)* | Modelltheorie (Stachowiak, Grieves, Kritzinger), Expliziter Euler & Diskretisierungsfehler, `WriteableBitmap`, `Bgra32`-Stride & `unsafe` Pointer, 2D-FDM-Wärmeleitung (5-Punkt-Stern, Randbedingungen), CFL-/Von-Neumann-Stabilitätsgrenze ($s \le 0{,}25$). | Kein WPF Canvas / Vektorgrafik (Kap. 03), kein ScottPlot, kein 3D, kein TPL, kein Cholesky, kein RK4! |
| **Quiz 02** | Zu Beginn von **Termin 05** | **Kapitel 03, 04** *(T03 & T04)* | Affine 2D-Koordinatentransformation (Welt $\leftrightarrow$ Screen), Uniform Scaling ($s = \min(s_x, s_y)$), Letterboxing-Offsets, Y-Invertierung, Hit-Testing, DIN-406-Bemaßung & gedrehte Pfeilspitzen im Screen Space, `Canvas` vs. `DrawingVisual`; ScottPlot 5 (`Signal` vs. `Scatter`, `DataStreamer`), allokationsfreie Ringpuffer, Welford-Online-Varianz ($\mu \pm 3\sigma$), MSAGL (`SugiyamaLayoutSettings` vs. `MdsLayoutSettings` / Force-Directed Layout). | **Kein 3D / OpenGL (Kap. 05 wird erst nach dem Quiz gelehrt!)**, kein Multithreading, keine FEM-Statik / Cholesky (Kap. 07)! |
| **Quiz 03** | Zu Beginn von **Termin 08** | **Kapitel 05, 06, 07** *(T05, T06 & T07)* | SharpGL 3D-Pipeline, Kugelkoordinaten-Orbit-Kamera & Gimbal-Lock-Schutz, homogene $4\times 4$-Matrizen, Szenengraph (`glPushMatrix`/`glPopMatrix`), Vorwärtskinematik, Phong-Beleuchtung; TPL (`Parallel.For`, Partitionierung, Race Conditions, `Interlocked` vs. `lock`, False Sharing auf Cache-Lines, Amdahlsches Gesetz & Speedup); Statische 2D-FEM-Fachwerke ($EA/L$, globale Steifigkeitsmatrix $\mathbf{K}$, Blockpartitionierung $\mathbf{K}_{ff}$, Starrkörpermoden & Lagerungen, Cholesky-Zerlegung $\mathbf{K}_{ff} = \mathbf{L}\mathbf{L}^\top$). | **Noch keine kontinuierlichen ODE-Solver höherer Ordnung (RK4), keine S-Functions, kein Anti-Windup (Kap. 08 wird erst nach dem Quiz gelehrt!)**, kein DES! |
| **Quiz 04** | Zu Beginn von **Termin 10** | **Kapitel 08, 09** *(T08 & T09)* | Zustandsraumdarstellung 1. Ordnung, Euler vs. Heun (RK2) vs. RK4 (Butcher-Tableau, Konsistenz-/Konvergenzordnung, Stabilitätsgebiete), Simulink-analoge S-Functions (`ComputeDerivatives`, `ComputeOutputs`), Aktor-Sättigung & Anti-Windup Clamping; Diskrete Ereignissimulation (DES, Next-Event-Time-Advance, Future Event List via `PriorityQueue`, Kendall-Notation $M/M/1$ & $M/M/c/K$, zeitgewichtetes Flächenintegral `areaUnderL`, Little's Gesetz $\bar{L} = \lambda_{\text{eff}} \bar{W}$), Stochastik (Inversionsmethode $-\frac{1}{\lambda}\ln(1-U)$, Box-Muller). | **Noch keine hybride Zero-Crossing-Bisektion, kein Zeno-Kollaps, kein FMI/VIBN (Kap. 10/11 werden erst nach dem Quiz gelehrt!)** |

### 3.2 Zielumfang für 15 Minuten Prüfungszeit: 8 Fragen / 10,0 Punkte
Damit Studierende die 15 Minuten konzentriert nutzen und nicht nach 4 Minuten durch Raten fertig sind, besteht jedes Quiz (`Quiz_0X.md` und `Quiz_0X.gift.txt`) aus **exakt 8 Fragen (Summe: 10,0 Punkte)**:
- **3 Numerische Berechnungs- & Code-Tracing-Fragen (Freitext-Zahleneingabe `{#...}` im GIFT-Format, zusammen 5,0 Punkte: 1× 2,0 P. + 2× 1,5 P.):**
  - Mindestens 2 mehrstufige Ingenieurs-Rechenfragen (ohne vorgegebene Lösungsformel im Text!) und 1 C#-Code-Tracing-Frage (bei der der exakte numerische Ausgabewert, Index oder Zustand nach Ausführung eines kurzen Code-Snippets frei eingetippt werden muss).
- **3 Single-Choice-Fragen (4 Optionen A–D, genau 1 richtig, je 1,0 Punkt = 3,0 Punkte):**
  - Fokus auf tiefes Konzeptverständnis, subtile C#-Bug-Diagnose („Find the Bug“) und numerisch-physikalische Phänomene.
- **2 Multiple-Select-Fragen (4 Optionen A–D, 2 oder 3 richtig mit symmetrischer Teilpunkte-Gewichtung in GIFT, je 1,0 Punkt = 2,0 Punkte):**
  - Prüfung vernetzter Zusammenhänge über beide/alle Kapitel des jeweiligen Quiz-Zeitraums.

### 3.3 Strikte Anti-Bias-Regeln für Antwortoptionen (Verbot von „Giveaways“)
1. **Längen-Symmetrie (Kein Length Bias!):**
   - Alle 4 Antwortoptionen (A, B, C, D) einer Frage **müssen gleich lang und gleich detailliert formuliert sein** (jeweils 1–2 präzise Sätze; die Zeichenlänge der längsten Option darf maximal $25\,\%$ über der kürzesten Option liegen).
   - **Verboten:** Eine 3-zeilige Lehrbuch-Erklärung als richtige Antwort neben drei kurzen Einzeilern als Falschantworten! Ausführliche Herleitungen gehören ausschließlich in das `####Feedback` bzw. den Lösungsblock unter der Frage, niemals in den Auswahltext selbst.
2. **Technisch plausible Ingenieurs-Fehlkonzepte statt Scherzantworten:**
   - Absurde Distraktoren (*„WPF unterstützt `Math.Sin` nur im Screen Space“*, *„funktioniert nur unter Linux“*, *„Kosinus verbraucht zu viele Register“*) sind **streng verboten**.
   - Jede falsche Option muss einen **echten, häufigen Denkfehler von Studierenden oder LLMs** repräsentieren (z. B. 1D-Stabilitätsgrenze $s \le 0{,}5$ statt 2D-Grenze $s \le 0{,}25$; Vergessen der Y-Invertierung; `Math.Max` statt `Math.Min` beim Letterboxing; Kommutativitätsfehler $\mathbf{R}\cdot\mathbf{T}$ statt $\mathbf{T}\cdot\mathbf{R}$; Verwechslung von lokalem Fehler $\mathcal{O}(h^{p+1})$ und globalem Fehler $\mathcal{O}(h^p)$; Verwendung von $\lambda$ statt $\lambda_{\text{eff}} = \lambda(1 - P_{\text{Block}})$ bei endlichem Puffer $K$).
3. **Keine Formeln oder Zwischenschritte im Fragetext verraten:**
   - Der Fragetext nennt ausschließlich das physikalisch-technische Szenario und die gegebenen Rohgrößen (mit Einheiten).
   - **Verboten im Fragetext:** Das Abdrucken der gesuchten Grundformeln (wie $\Delta t_{\max} = \frac{\Delta x^2}{4\alpha}$, `ys = canvasHeight - (offsetY + ...)`, Amdahls Formel $S(N) = \dots$, Welford-Update, Cholesky-Gleichung, Little's Law $L = \lambda W$, Inversionsformel) oder das Vorrechnen von Zwischenwerten (wie $s = 0{,}375 > 0{,}25$ oder $W = 10\,\text{Min} = \frac{1}{6}\,\text{h}$).
