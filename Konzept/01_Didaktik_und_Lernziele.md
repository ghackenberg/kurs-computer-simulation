# Didaktisches Rahmenkonzept, Zielgruppe & Übergeordnete Lernziele
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling

**Dokument-ID:** `Konzept/01_Didaktik_und_Lernziele.md`  
**Studiengang:** Bachelor Automatisierungstechnik (5. Fachsemester)  
**Institution:** Fachhochschule Oberösterreich, Campus Wels  
**Verantwortlicher:** Prof. Dr. Georg Hackenberg (*Professor für Informatik und Industriesysteme*)  
**Format & Umfang:** Integrierte Lehrveranstaltung (ILV), 2 SWS / 3 ECTS (75 h Workload: 25 h Präsenz, 50 h Selbststudium/Hausübung), 10 Präsenztermine à 150 Minuten  
**Begleitdokumente (Single Source of Truth):**
- [`Konzept/02_Semestermatrix_und_Abhaengigkeiten.md`](./02_Semestermatrix_und_Abhaengigkeiten.md) – Semester-Übersichtsmatrix, Kapitel-Abhängigkeitsmatrix, 2-Stufen-Hausübungsmodell & Goldene Architektur-Regel
- [`Konzept/03_Beurteilung_und_Pruefungen.md`](./03_Beurteilung_und_Pruefungen.md) – 5-stufige Lernfortschrittskontrolle, 2-Säulen-Benotung (40–40–20), Quiz-Stoffabgrenzung, Rubriken & AI Honor Code
- [`Konzept/04_Termin_01_*.md`](./04_Termin_01_Kinematik_und_Euler.md) bis [`13_Termin_10_*.md`](./13_Termin_10_Hybride_Dynamik_Synthese.md) – Autarke Termin-Steckbriefe (Vorlesung + Hausübung + Schnittstellen pro Termin)

---

## 1. Zielgruppe, Übergeordnete Lernziele & Workload

### 1.1 Zielgruppenprofil (5. Semester Automatisierungstechnik, Campus Wels)
- **Starkes Fundament (anknüpfen, nicht als „neu“ erklären):** Höhere Mathematik (Lineare Algebra, DGLn), Technische Mechanik (Statik, Kinematik, Kinetik), Regelungstechnik (Zustandsraum, PID, Frequenzgang) und SPS-Programmierung (IEC 61131-3).
- **Typische Lücken (behutsam mit Konventions-Brücken & mentalen Modellen herleiten):** Hardwarenahe Speicherverwaltung (`unsafe`, Stride, Cache-Lines), moderne UI-/Grafik-Pipelines (WPF, MVVM, 2D-Canvas, 3D-OpenGL), Nebenläufigkeit (TPL, Race Conditions, False Sharing) und numerische Implementierungsdetails (Schrittweitenstabilität, Matrix-Partitionierung, Zero-Crossing-Bisektion).

### 1.2 Übergeordnete Lernziele (Intended Learning Outcomes – ILOs)
1. **Modellbildung & Systemarchitektur:** Für technische Problemstellungen passende mathematische Modelle (statisch/dynamisch, kontinuierlich/diskret/hybrid) ableiten und in sauber entkoppelten C#-Programmen (.NET 8/10) ohne Blackbox-Simulatoren umsetzen.
2. **Numerische Urteilskraft & Parametrierung:** Numerische Lösungsalgorithmen (Expliziter Euler, Heun/RK2, RK4, FDM-5-Punkt-Stern, Cholesky-LGS, Ereignis-Warteschlangen, Zero-Crossing-Bisektion) hinsichtlich Schrittweite, Stabilität, Konditionierung und Erhaltungssätzen gezielt parametrieren und validieren.
3. **Echtzeit-Visualisierung & Parallelisierung:** Performante, allokationsfreie 2D- und 3D-Visualisierungen sowie Multi-Core-Simulationen entwickeln (`WPF WriteableBitmap`, `WPF Canvas`/`DrawingVisual`, `ScottPlot 5`, `MSAGL`, `SharpGL`, `Math.NET Numerics`, `Parallel.For`).

### 1.3 ECTS-Workload-Kalkulation (3 ECTS = 75 Echtstunden)

| Kategorie | Aktivität | Aufwand | Anteil |
| :--- | :--- | :---: | :---: |
| **Präsenzlehre (ILV)** | 10 Termine à 150 Min. (Live-Showcase & Code-Defense, 4 Moodle-Quizzes, interaktive Folien-Vorlesung) | **25,0 h** | 33,3 % |
| **Wöchentliche Hausübungen** | 10 zweistufige Übungen im 2er-Team zu Hause (Stufe 1 Basisaufgabe ~1,0 h + Stufe 2 Track-Ausbau ~2,6 h) | **36,0 h** | 48,0 % |
| **Moodle-Assessments** | Vorbereitung mit den 3 Übungstests (`Test_01..03`) & Nachbereitung der 4 Moodle-Prüfungen | **8,0 h** | 10,7 % |
| **Vor- & Nachbereitung** | Studium der Vorlesungsfolien, Code-Snippets und Primärdokumentationen | **6,0 h** | 8,0 % |
| **Gesamtsumme** | **3 ECTS × 25 Echtstunden** | **75,0 h** | **100,0 %** |

---

## 2. Didaktische Leitphilosophie, Motivation & Anspruchsniveau

### 2.1 Constructive Alignment & Bloom-Lernziel-Kaskade
Jeder Termin verzahnt drei steigende Kompetenzstufen nach Bloom direkt mit den Lehr- und Prüfungsformaten:
1. **Verstehen & Analysieren** *(Modell, Geometrie, Stabilitätsgrenze)* $\longleftrightarrow$ **Interaktive Vorlesung (3-Schritt-Rhythmus) & Moodle-Quiz / Code-Defense-Leitfragen**.
2. **Anwenden** *(Grundalgorithmus & API am lauffähigen System)* $\longleftrightarrow$ **Hausübung Stufe 1 (Basisaufgabe `1.1`–`1.4` auf der C#-Vorlage + Unit-Tests)**.
3. **Erschaffen & Evaluieren** *(Reale Nichtlinearitäten, Grenzfälle, Systemintegration)* $\longleftrightarrow$ **Hausübung Stufe 2 (`Track A` oder `Track B`) + Live-Parameter-Stresstest am Beamer**.

### 2.2 Studierenden-Motivation: Abwechslungsreich, Interessant & Lehrreich
1. **Autonomie durch das Wahlmodell („Pick your Track: Industrie vs. Simulation Game“):**
   - In **Stufe 2** wählt jedes 2er-Team frei zwischen **Track A (Industrieller Digitaler Zwilling)** und **Track B (Interaktives Simulationsspiel / Arcade-Physik)**. Beide Tracks bauen auf Stufe 1 auf, nutzen exakt dieselbe Mathematik und zählen 10 Punkte.
   - Im **Cross-Track-Showcase** zu Beginn des Folgetermins präsentiert je ein Team aus Track A und Track B seine Lösung am Beamer – so erlebt das gesamte Plenum beide Perspektiven.
2. **Wöchentlicher Domänenwechsel statt Monotonie:**
   - Jeder der 10 Termine erschließt eine neue physikalisch-technische Erlebniswelt: Ballistik/Hydraulik (T01) $\to$ Chip-Thermik/Lava-Physik (T02) $\to$ Tragwerks-CAD/Poly-Bridge (T03) $\to$ 1-kHz-Prüfstand/Racing-Telemetrie (T04) $\to$ 3D-SCARA-Roboter/Claw-Crane (T05) $\to$ Toleranz-Monte-Carlo/100.000-Boids-Schwarm (T06) $\to$ Portalkran-FEM/Brückeneinsturz (T07) $\to$ DC-Servo/SpaceX-Raketenlandung (T08) $\to$ Lackierstraße/Freizeitpark-Logistik (T09) $\to$ Pneumatik-VIBN/Pinball-Physik (T10).
3. **Unmittelbares visuelles Feedback & „Kontrollierter Crash“:**
   - Algorithmen werden nie trocken auf Papier abgehandelt, sondern visuell zum Leben erweckt – inklusive des bewussten *„Was-passiert-wenn-nicht?“*-Effekts (sichtbare Gitterexplosion bei $s > 0{,}25$, Gimbal-Flip ohne Clamping, Raketen-Überschwingen ohne Anti-Windup).

### 2.3 Anspruchsniveau: „Low Floor, High Ceiling“ (Fordernd ohne Frustration)
- **Low Floor (Frustfreier Einstieg):** Bereitgestellte C#-Projektvorlagen (`Vorlage/*.sln`) nehmen reines UI-Boilerplate ab; Folien liefern explizite Konventions-Brücken; **Stufe 1 (`1.1`–`1.4`)** führt mit *Golden Reference Numbers* (5-Sekunden-Selbsttest) und vorbereiteten Unit-Tests (`dotnet test`) in ~60 Minuten sicher zum ersten Erfolgserlebnis.
- **High Ceiling (Echter Ingenieur-Anspruch):** Keine Blackbox-Solver oder gefakten UI-Animationen; **Stufe 2** fordert reale Nichtlinearitäten, Allokationsfreiheit (0 Byte GC-Druck in der Schleife), Thread-Sicherheit und numerische Validierung; **Moodle-Prüfungen** und **Live-Parameter-Stresstests** prüfen echten Transfer statt Auswendiglernen.

### 2.4 Ablaufstruktur eines 150-Minuten-Präsenztermins (Ohne Live-Coding im Hörsaal)
In der Präsenzveranstaltung findet **kein Live-Coding** und **kein In-Class-Programmiersprint** statt; die Programmierarbeit erfolgt als zweistufige Hausübung zu Hause:

| Phase | Zeitfenster | Dauer | Aktivitäten & Didaktische Funktion |
| :---: | :---: | :---: | :--- |
| **Moodle-Quiz** *(nur T03, T05, T08, T10)* | 00:00 – 00:15 | **15 Min.** | **Summativer Kurztest (Rückwärts-Kausalität):** 8 Fragen / 10 Pkt. (100 % Auto-Grading) ausschließlich über die abgeschlossenen Vor-Termine. |
| **Phase 1: Showcase & Defense** *(ab T02)* | 00:00 – 00:25 *(bzw. 00:15 – 00:35)* | **20–25 Min.** | **Live-Showcase & Code-Defense (Säule 2b, 20 %):** 1× Team Track A + 1× Team Track B zeigen die Hausübung der Vorwoche live am Beamer, beantworten Code-Fragen (*„Warum genau diese Zeile?“*) und bestehen den Live-Parameter-Stresstest. |
| **Phase 2: Interaktive Vorlesung** | 00:25 – 02:25 *(inkl. 15 Min. Pause)* | **100–115 Min. netto** | **Interaktive Folien-Vorlesung (40–48 Folien):** Einstieg über `### Rückblick & Brücke:`, danach **3-Schritt-Rhythmus** pro Sektion (*1. Anwendungsbeispiel* $\to$ *2. Blick unter die Haube mit Kontrast-SVG & Zahlenbeispiel* $\to$ *3. Besprechung des C#-Codes*). |
| **Phase 3: Hausübungs-Briefing** | 02:25 – 02:30 | **5 Min.** | **Ausblick (`### Hausübung Termin XX`):** Vorstellung von Stufe 1 (`1.1`–`1.4`) und Stufe 2 (`Track A` vs. `Track B`). |
