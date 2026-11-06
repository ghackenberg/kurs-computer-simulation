---
name: uebungsaufgaben-und-moodle
description: >-
  Regeln für den Aufbau, die Symmetrie und die Synchronisation von Übungsblättern
  (Uebungen/Termin_XX_*/Aufgabenblatt.md), C#-Vorlagen (Vorlage/**), Konzeptdokumenten
  (Konzept/*.md) und Moodle-Termintexten (Moodle/Moodle_Kursstruktur_und_Termintexte.md).
  IMMER aktivieren, wenn Übungsaufgaben, Vorlagen oder Moodle-Texte bearbeitet werden.
---

# Skill: Übungsaufgaben, C#-Vorlagen & Moodle-Synchronisation

Dieser Skill regelt den didaktischen und strukturellen Aufbau der 10 Übungseinheiten (`Uebungen/Termin_01` bis `Termin_10`) sowie die Synchronisation mit den Vorlesungsfolien, Konzeptdokumenten und Moodle-Texten.

---

## 1. Struktur & Symmetrie der Übungsblätter (`Aufgabenblatt.md`)

Jedes Aufgabenblatt besteht aus zwei aufeinander aufbauenden Stufen:

### 1.1 Stufe A: In-Class Sprint (60 Minuten im Hörsaal/Labor)
- Alle Studierenden starten gemeinsam auf Basis der bereitgestellten C#-Projektvorlage (`Uebungen/Termin_XX_.../Vorlage/...sln`) inklusive Unit-Tests (`dotnet test`).
- Stufe A umfasst 3–4 präzise geführte Teilaufgaben, die die Kernmechanik der aktuellen Vorlesung am lauffähigen Code erlebbar machen (z. B. einen konkreten Bug wie Bounding-Box-Jittering beheben, eine zentrale Formel implementieren, einen Stabilitätstest durchführen).
- **Wichtig:** Das Ergebnis von Stufe A ist das **direkte technische Fundament für BEIDE Homework-Tracks in Stufe B**!

### 1.2 Stufe B: Homework Extension (Wahlmodell: Track A ODER Track B)
Für das Wahlmodell in Stufe B gelten vier eiserne Regeln:
1. **Genau 1 Track A (Industrie & Mechatronik) und genau 1 Track B (Simulation Game):**
   - Niemals Unter-Optionen wie `Option B.1 ODER Option B.2` aufmachen! Jeder Track ist eine einzige, klar spezifizierte Aufgabe.
2. **Beide Tracks müssen direkt auf Stufe A (`Vorlage/...sln`) aufbauen:**
   - Weder Track A noch Track B darf verlangen, dass die Studierenden den Code aus Stufe A verwerfen und auf der grünen Wiese neu beginnen.
   - In der C#-Vorlage (`MainWindow.xaml.cs` bzw. `Program.cs`) müssen für **beide** Tracks klare `// TODO: [Stufe B Track A: ...]` und `// TODO: [Stufe B Track B: ...]` Kommentarblöcke vorhanden sein.
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
   - `TODO`-Kommentare in `Uebungen/Termin_XX_.../Vorlage/...` für Stufe A, Track A und Track B synchron halten.
3. **Die Ausblick-Folie am Ende von Vorlesungskapitel `XX`:**
   - Letzte Folie (`### Laborübung Termin XX: ...`) in `Folien/XX_.../Folien.md` anpassen + `npm run lint:slides:XX` & `npm run export:pdf:XX`.
4. **Die Showcase-Folie am Anfang des Folgekapitels `XX+1`:**
   - Folie 2 (`### Showcase & Peer-Challenge: Termin XX`) in `Folien/[XX+1]_.../Folien.md` anpassen + `npm run lint:slides:[XX+1]` & `npm run export:pdf:[XX+1]`.
5. **Die Konzept-Dokumente:**
   - `Konzept/01_Lehrveranstaltungsstruktur_und_Syllabus.md` (Übersichtstabelle & Termin-Steckbrief)
   - `Konzept/02_Uebungskatalog_und_Abschlussprojekt.md`
6. **Die Moodle-Kursstruktur (`Moodle/Moodle_Kursstruktur_und_Termintexte.md`):**
   - **WICHTIGE FORMATIERUNGSREGEL FÜR MOODLE:** Der Text aus `Moodle/Moodle_Kursstruktur_und_Termintexte.md` wird als HTML nach Moodle kopiert. Verwende in dieser Datei **KEINE LaTeX-Formeln (`$...$`)** und **KEINE Inline-Code-Backticks (`` `...` ``)**, da diese in Moodle unschönes Text-Layout verursachen! Schreibe Zahlen und Einheiten dort immer als reinen Fließtext (z. B. `0,5-m-Grid-Snapping`, `bis 4,0 m`).
   - **Vorsicht beim Editieren:** Prüfe nach dem Editieren mit `git diff Moodle/Moodle_Kursstruktur_und_Termintexte.md`, dass die Änderung unter dem richtigen Termin (`### Termin XX:`) gelandet ist (da die Aufzählungspunkte `* **Stufe A (In-Class Sprint):**` in jedem Termin gleich beginnen!).
