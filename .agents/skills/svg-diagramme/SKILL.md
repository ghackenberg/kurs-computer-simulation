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
| **Hintergrund-Transparenz** | Kein rahmenloses Vollflächen-`<rect fill="#FFFFFF">` | SVG-Canvas bleibt transparent, damit CSS-`drop-shadow` und getönte Highlight-Folien sauber wirken (Container-Karten immer mit `rx` + `stroke`). |
| **Semantische Farbklassen (`sem-*`)** | Ausschließlich Klassen aus [`Themen/svg_palette.json`](../../../Themen/svg_palette.json) (`sem-primary`, `sem-info`, `sem-success`, `sem-warning`, `sem-danger`, `sem-accent`, `sem-card`, `sem-muted`, `sem-neutral` inkl. `-bg`, `-fill`, `-stroke`, `-text`) | Keine hartcodierten Hex-Farben in handgezeichneten `Diagramme/*.svg`; Änderungen zentral über `npm run sync:svg-palette` verteilbar. |

---

## 2. Didaktische Gestaltung & Farbsemantik

1. **Konkrete Zahlenwerte statt abstrakter Boxen:**
   - Algorithmen- und Datenstruktur-SVGs müssen **echte, nachrechenbare Zahlenwerte** zeigen (konkrete Array-Einträge, Suchschritte mit Index-Vergleich oder konkrete Koordinatenwerte vor/nach einer Transformation).
2. **Visueller Direktvergleich (*Naiv/Falsch vs. Richtig*):**
   - Wo eine Reihenfolge, Speicheranordnung oder ein numerischer Fehler erklärt wird, stelle beide Fälle nebeneinander in einem Kontrast-SVG gegenüber.
3. **Keine eingebauten Text-Sidebars („Poster-SVGs“):**
   - Erklärender Fließtext, Aufzählungslisten und mehrtermige Formeln gehören als echtes Markdown/MathJax in eine eigene MARP-Spalte (`<div class="columns">`), **nicht** als Textbox-Sidebar neben das Diagramm ins SVG (außer wenn ausdrücklich gewünscht). Im SVG stehen nur Achsen, Kurven, kurze Labels und konkrete Zahlenwerte.
3. **Einheitliche, zentrale Farbsemantik (`Themen/svg_palette.json`):**
   - **Keine hartcodierten Hex-/RGB-Farben in neuen oder überarbeiteten SVGs!** Nutze stattdessen ausschließlich die semantischen CSS-Klassen aus [`Themen/svg_palette.json`](../../../Themen/svg_palette.json) (Single Source of Truth für Skill, Linter und Sync-Skript):
     - Je Rolle `<role>` stehen `.sem-<role>` (`fill` + `stroke`), `.sem-<role>-stroke` und `.sem-<role>-text` zur Verfügung (Standardrollen: `sem-primary`, `sem-success`, `sem-warning`, `sem-danger`, `sem-muted`, `sem-neutral` – exakte Liste & Bedeutung immer direkt in `Themen/svg_palette.json` nachsehen).
     - **Neue semantische Rollen:** Reichen die vorhandenen Rollen für ein Diagramm nicht aus, darfst du eine neue semantische Rolle (ohne Farbnamen, z. B. `sem-highlight` oder `sem-accent-2`) in `Themen/svg_palette.json` ergänzen.
     - **Pflicht-Synchronisation:** Nach dem Anlegen/Ändern von SVGs oder `Themen/svg_palette.json` immer `npm run sync:svg-palette` ausführen; `npm run lint:svg` prüft automatisch auf unbekannte Klassen, veraltete Paletten-Blöcke und hartcodierte Farben.
4. **Variablen- & Geometrie-Synchronität (`npm run lint:variables`):**
   - Alle alleinstehenden mathematischen Symbole oder `Consolas`-Bezeichner im SVG müssen exakt mit den Bezeichnern im Folientext übereinstimmen.
   - **Vollständige kinematische & trigonometrische Konstruktion:** Bei kinematischen Ketten oder geometrischen Herleitungen müssen (a) alle Teil-Transformationen ($\mathbf{T}, \mathbf{R}$) als Pfeile/Drehbögen entlang der Kette und (b) in analytischen Skizzen sowohl Einzel-/Relativwinkel (z. B. $\theta_1, \theta_2$) als auch Summenwinkel (z. B. $\theta_1 + \theta_2$ gegen eine gestrichelte Parallel-Hilfslinie) explizit eingezeichnet sein.

---

## 3. Technische Auditor-Regeln & Prüfworkflow

- **Vermeidung von `SHIELD_TEXT_OVERFLOW`-Fehlalarmen:** Zeichne geneigte Stäbe oder schmale Bauteile dicht neben `<text>`-Labels als dicke `<line stroke-linecap="round">` oder `<polygon>` statt als kleines `<rect>` (der SVG-Auditor stuft kleine `<rect>`-Elemente nahe Text als zu enge Text-Hintergrundboxen ein).
- **Saubere Dateinamen, transparenter Canvas & UTF-8:** Nur Unterstrich-Dateinamen (`Mein_Diagramm.svg`) ohne verwaiste Alt-Dateien im Ordner `Diagramme/` erzeugen; äußeren SVG-Canvas transparent lassen (`fill="none"` statt vollflächigem `#FFFFFF`-Hintergrund-`<rect>`, damit sich SVGs nahtlos in weiße und getönte Highlight-Folien einfügen); saubere UTF-8-Umlaute bzw. XML-Entities (`&#8594;`, `&#177;`, `&amp;`, `&lt;`, `&gt;`) nutzen.
- **Pflicht-Prüfung nach jeder SVG-Änderung:**
  ```powershell
  npm run lint:svg:XX
  npm run lint:variables:XX
  npm run lint:slides:XX
  ```
