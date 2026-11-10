---
name: uebungsaufgaben
description: >-
  Vorlesungsübergreifende Regeln für den Aufbau, die Symmetrie, den forensischen Code-Walkthrough
  und die Verifikation von zweistufigen Übungsblättern (Kapitel/*/Uebung/Aufgabenblatt.md)
  sowie Programmier-Vorlagen (Vorlage/**).
  IMMER aktivieren, wenn Übungsaufgaben oder Programmier-Vorlagen geplant, erstellt oder überarbeitet werden.
---

# Skill: Zweistufige Übungsaufgaben & Programmier-Vorlagen (`Kapitel/*/Uebung/**`)

Verbindliche Regeln für den Aufbau der Aufgabenblätter (`Kapitel/XX_*/Uebung/Aufgabenblatt.md`) und der zugehörigen C#-Projektvorlagen (`Vorlage/`). Übergreifende Kausalitäts-, Motivations- und Synchronisationsregeln sind im Skill [`lehrkonzept-und-didaktik`](../lehrkonzept-und-didaktik/SKILL.md) sowie in `Konzept/02_*.md` definiert.

---

## 1. Struktur & Bezeichnungs-Konvention (`Stufe 1` $\to$ `Stufe 2`)

Die gesamte Programmierarbeit findet als **zweistufige Hausübung zu Hause im 2er-Team** statt (kein Live-Coding / kein In-Class-Sprint im Hörsaal).

> **Eiserne Bezeichnungs-Regel:**
> - **Ziffern (`Stufe 1` $\to$ `Stufe 2`) = Nacheinander (beide Stufen sind Pflicht!)**
> - **Buchstaben (`Track A` | `Track B`) = Auswahl innerhalb von Stufe 2 (Track A ODER Track B!)**

---

## 2. Stufe 1: Basisaufgabe (Gemeinsames Fundament, `1.1` bis `1.4`)

1. **Synchrone 4er-Nummerierung:**
   - Ein allgemeiner Punkt *„Vorbereitung – Starter-Kit untersuchen“* steht als **unnummerierter Absatz** vor der Liste.
   - Darauf folgen exakt **4 nummerierte Teilaufgaben (`1. Aufgabe 1.1` bis `4. Aufgabe 1.4`**, Richtwert ca. 60 Min.), synchron zu den 4 Arbeitspaketen in Stufe 2.
2. **Nahtloser Unterbau für Stufe 2:**
   - Beide Wahl-Tracks in Stufe 2 bauen technisch direkt auf dem in Stufe 1 erstellten Code auf (kein Verwerfen oder Neustart auf der grünen Wiese).
3. **Golden Reference Numbers (5-Sekunden-Selbsttest im Aufgabenblatt):**
   - Jede Berechnungsaufgabe nennt im Aufgabenblatt konkrete Test-Eingabewerte und das exakt erwartete numerische Kontrollergebnis (z. B. *„Selbsttest-Tipp: Bei Eingabe $X$ ergibt sich exakt $Y = \dots$“*), damit Studierende ihre Formel sofort ohne Rückwärtsrechnen verifizieren können.
4. **Aktive Unit-Tests in `Aufgabe 1.4` (`dotnet test`):**
   - `Vorlage/Tests/` enthält neben Basis-Tests mindestens einen vorbereiteten Unit-Test (z. B. mit auskommentierter Assertion), mit dem die Studierenden in `Aufgabe 1.4` ihre eigene Stufe-1-Implementierung via `dotnet test` auf Grün bringen.

---

## 3. Stufe 2: Vertiefungsaufgabe (`Track A` ODER `Track B`)

1. **Eindeutige Track-Struktur ohne Unter-Optionen:**
   - Genau **1 Track A** (*Industrie & Technik*, Arbeitspakete `A.1`–`A.4`) und genau **1 Track B** (*Simulation Game*, Arbeitspakete `B.1`–`B.4`).
2. **Symmetrie ohne Redundanz:**
   - Beide Tracks umfassen exakt 4 Arbeitspakete und dieselbe Punkteverteilung in der 10-Punkte-Rubrik, setzen aber klar unterschiedliche fachliche Schwerpunkte.
3. **Kausalitäts-Sperre & Schnittstellen-Kontinuität (laut `Konzept/01_*.md`):**
   - Strikter Ausschluss von Konzepten/Bibliotheken späterer Kapitel. Wenn ein späterer Termin auf den Ergebnissen aufbaut (z. B. T03 $\to$ T07), müssen **beide** Tracks kompatible Datenstrukturen/Austauschformate (z. B. JSON) liefern.

---

## 4. Forensischer Code-Walkthrough gegen `Vorlage/`

Jede Teilaufgabe (`1.1`–`1.4`, `A.1`–`A.4`, `B.1`–`B.4`) muss Zeile für Zeile gegen den echten Starter-Code in `Vorlage/` geprüft werden:
1. **Saubere `TODO`-Markierungen & Benennung:**
   - Im Starter-Code existieren klare Kommentarblöcke für `// TODO [Stufe 1 - Aufgabe 1.X]`, `// TODO [Stufe 2 - Track A]` und `// TODO [Stufe 2 - Track B]`.
   - UI-Umschalter und Methodennamen verwenden konsequent `Stufe 1` / `Stage1` / `Base` sowie `Stufe 2 (Track A)` / `Stufe 2 (Track B)` (niemals `Sprint`).
2. **Explizite Dokumentation von Vorlagen-Konventionen & UI-Fallstricken:**
   - Versteckte Geometrie-/Einheiten-Konventionen von Hilfsmethoden (z. B. Einheitskörper ohne Größenparameter, Zurücksetzen lokaler Offsets beim Umhängen von Knoten) müssen direkt bei der jeweiligen Teilaufgabe genannt werden.
   - Typische UI-Event-Fallstricke (z. B. Fokus-Diebstahl von Pfeil-/Leertasten durch `Slider`/`Button` $\implies$ Hinweis auf `PreviewKeyDown` mit `e.Handled = true` bzw. sauberes `else if` bei Maustasten) müssen als kurzer Praxis-Tipp im Aufgabenblatt stehen.
   - **WPF-Initialisierungsreihenfolge (`ValueChanged` / `SelectionChanged`):** Wenn in XAML ein `Slider` oder eine `ComboBox` vor dem zugehörigen `TextBlock` steht, feuert `ValueChanged` bereits während `InitializeComponent()`, noch bevor die nachfolgenden XAML-Elemente existieren (`null`). Jeder solche Event-Handler in der Vorlage MUSS zu Beginn mit `if (!IsLoaded || TxtTarget == null) return;` abgesichert sein.
3. **Pflicht-Checks nach jeder Änderung:**
   - Kein `€`-Symbol innerhalb von `$ ... $` Mathe-Umgebungen verwenden (immer `\text{EUR}` schreiben).
   - `dotnet test` in `Vorlage/` ausführen, `npm run export:pdf:uebung:XX` generieren und die **6-Punkte-Synchronisation** (siehe Skill [`lehrkonzept-und-didaktik`](../lehrkonzept-und-didaktik/SKILL.md)) abarbeiten.
