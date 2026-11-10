---
name: svg-diagramme
description: >-
  Vorlesungsübergreifende Richtlinien für den Entwurf, die Bemaßung, Typografie und Pflege
  von SVG-Diagrammen (Kapitel/*/Folien/Diagramme/*.svg).
  IMMER aktivieren, wenn SVG-Grafiken erstellt, geprüft oder überarbeitet werden.
---

# Skill: SVG-Diagramme & Visuelle Mentale Modelle (`Diagramme/*.svg`)

Verbindliche Gestaltungs-, Typografie- und Prüfregeln für SVG-Illustrationen in MARP-Vorlesungsfolien (`1280x720`-Viewport). Die `.svg`-Dateien unter `Kapitel/*/Folien/Diagramme/` sind direkt die *Single Source of Truth* (keine redundanten JS-Generator-Skripte unter `Skripte/` anlegen!).

---

## 1. Geometrie, `viewBox` & Typografie

| Parameter | Vorgabe | Begründung |
| :--- | :--- | :--- |
| **Halbseitiges SVG (`<div class="two">`)** | `viewBox="-45 0 570 380" width="570" height="380"` | Skaliert bei ~564 px Spaltenbreite im Faktor $\approx 0{,}99$ (`376.6 px` Höhe $\implies$ kein vertikaler Überlauf, kein Text-Downscaling). |
| **Vollbild-SVG (einspaltig)** | `viewBox="0 0 1080 450" width="1080" height="450"` | Passt unter einen kurzen Einleitungssatz ohne Footer-Kollision. |
| **Überschriften (`.hdr`, `.title`)** | `15px`–`18px`, `font-weight: bold` | Klare visuelle Hierarchie im Hörsaal. |
| **Code- & Zahlenwerte (`.code`, `.val`)** | `13.5px`–`15px`, `'Consolas', monospace`, `bold` | Hohe Lesbarkeit für Indizes, Formeln und Array-Werte. |
| **Untertitel / Indizes (`.sub`, `.idx`)** | $\ge 12.5\text{px}$ (niemals $< 12\text{px}$) | Hält die effektive Schriftgröße nach Browser-CTM sicher über dem Linter-Limit von `11.5 px`. |
| **Box-Innenabstand (`panel_clipping`)** | $\ge 8\text{px}$ horizontaler Abstand zum `<rect>`-Rand | Verhindert seitliches Überlaufen von `<text>`-Elementen. |

---

## 2. Didaktische Gestaltung & Farbsemantik

1. **Konkrete Zahlenwerte statt abstrakter Boxen:**
   - Algorithmen- und Datenstruktur-SVGs müssen **echte, nachrechenbare Zahlenwerte** zeigen (konkrete Array-Einträge, Suchschritte mit Index-Vergleich oder konkrete Koordinatenwerte vor/nach einer Transformation).
2. **Visueller Direktvergleich (*Naiv/Falsch vs. Richtig*):**
   - Wo eine Reihenfolge, Speicheranordnung oder ein numerischer Fehler erklärt wird, stelle beide Fälle nebeneinander in einem Kontrast-SVG gegenüber.
3. **Einheitliche Farbsemantik:**
   - **Blau (`#eff6ff` Füllung, `#2563eb` Rahmen, `#1e40af` Text):** Aktiver Datenpfad, reguläre Schritte.
   - **Grün (`#f0fdf4` / `#dcfce7` Füllung, `#16a34a` Rahmen, `#15803d` Text):** Zieltreffer, korrekter Pfad, Optimierungserfolg.
   - **Gelb/Amber (`#fffbeb` / `#fef3c7` Füllung, `#d97706` Rahmen, `#b45309` Text):** Aktuell geprüfter Index / Zwischenzustand.
   - **Rot (`#fef2f2` / `#fee2e2` Füllung, `#dc2626` Rahmen, `#991b1b` Text):** Fehlerfall, ausgeschlossener Bereich, Engpass.
   - **Grau (`#e2e8f0` Füllung, `#94a3b8` Text):** Ignorierte oder bereits verarbeitete Elemente.
4. **Variablen-Synchronität (`npm run lint:variables`):**
   - Alle alleinstehenden mathematischen Symbole oder `Consolas`-Bezeichner im SVG müssen exakt mit den Bezeichnern im Folientext übereinstimmen.

---

## 3. Technische Auditor-Regeln & Prüfworkflow

- **Vermeidung von `SHIELD_TEXT_OVERFLOW`-Fehlalarmen:** Zeichne geneigte Stäbe oder schmale Bauteile dicht neben `<text>`-Labels als dicke `<line stroke-linecap="round">` oder `<polygon>` statt als kleines `<rect>` (der SVG-Auditor stuft kleine `<rect>`-Elemente nahe Text als zu enge Text-Hintergrundboxen ein).
- **Saubere Dateinamen & UTF-8:** Nur Unterstrich-Dateinamen (`Mein_Diagramm.svg`) ohne verwaiste Alt-Dateien im Ordner `Diagramme/` erzeugen; saubere UTF-8-Umlaute bzw. XML-Entities (`&#8594;`, `&#177;`, `&amp;`, `&lt;`, `&gt;`) nutzen.
- **Pflicht-Prüfung nach jeder SVG-Änderung:**
  ```powershell
  npm run lint:svg:XX
  npm run lint:variables:XX
  npm run lint:slides:XX
  ```
