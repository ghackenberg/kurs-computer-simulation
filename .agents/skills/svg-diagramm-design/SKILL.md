---
name: svg-diagramm-design
description: >-
  Richtlinien für den Entwurf, die Bemaßung, Typografie und Generierung von SVG-Diagrammen
  (Folien/**/Diagramme/*.svg und Skripte/generate_*_svgs.js). IMMER aktivieren, wenn
  SVG-Grafiken oder SVG-Generierungsskripte erstellt, geprüft oder überarbeitet werden.
---

# Skill: SVG-Diagramm-Design & Visualisierung (`Diagramme/*.svg`)

Dieser Skill stellt sicher, dass alle SVG-Illustrationen in den Vorlesungsfolien auf Anhieb verständlich sind, konkrete Zahlenwerte zeigen und alle technischen Prüfungen (`lint:svg` und `lint:slides` im `1280x720`-Marp-Viewport) fehlerfrei bestehen.

---

## 1. Geometrie, `viewBox` & Schriftgrößen

1. **Optimale Abmessungen für zweispaltige Folien (`<div class="two">`):**
   - Verwende für halbseitige Illustrationen standardmäßig:
     ```xml
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
     ```
   - **Warum genau `570x380`?** Bei einer Spaltenbreite von ~564 px im `1280x720`-Marp-Viewport skaliert das SVG im Faktor $\approx 0{,}99$, hat eine gerenderte Höhe von `376.6 px` (verursacht also niemals vertikalen Folienüberlauf!) und hält eine 13.5 px-Schrift bei effektiv $> 13\,\text{px}$ (deutlich über dem `minFontSize`-Limit von `11.5 px`).
2. **Optimale Abmessungen für Vollbild-Diagramme (einspaltig unter kurzem Einleitungssatz):**
   - Verwende `viewBox="0 0 1080 450" width="1080" height="450"` (oder `1110x475`).
3. **Mindestschriftgrößen im SVG:**
   - Überschriften (`.hdr`, `.title`): `15px` bis `18px`, `font-weight: bold`
   - Code- & Zahlenwerte (`.code`, `.val`): `13.5px` bis `15px`, `font-family: 'Consolas', monospace`, `font-weight: bold`
   - Untertitel / Indizes (`.sub`, `.idx`): mindestens `12.5px` bis `13.5px` (niemals kleiner als `12px` deklarieren, damit die effektive Größe nach Browser-CTM immer $\ge 11{,}5\,\text{px}$ bleibt!).
4. **Kein Panel-Overflow (`panel_clipping`):**
   - Jeder `<text>` innerhalb einer `<rect>`-Box muss links und rechts mindestens `8px` Abstand zum Box-Rand einhalten. Lange Header-Texte kompakt formulieren (z. B. `"[0..3] fällt weg"` statt `"linke Hälfte [0..3] fällt weg"`).

---

## 2. Didaktische Gestaltung von Algorithmen-SVGs

1. **Konkrete Zahlenwerte statt abstrakter Boxen:**
   - Ein SVG, das einen Algorithmus erklärt (wie Binärsuche, Dreisatz-Clipping, Bucketing, Ringpuffer oder Welford), muss **echte, nachrechenbare Zahlenwerte** enthalten!
   - *Positivbeispiel (`SignalXY_Binaersuche_Illu.svg`):* Zeigt konkret das Array `xs[0..7] = [0.00, 0.01, 0.03, 0.08, 0.20, 0.42, 0.85, 1.50]`, sucht `t_min = 0.20 s` und stellt die 3 Halbierungsschritte (`Mitte [3]: 0.08 < 0.20` $\to$ `Mitte [5]: 0.42 > 0.20` $\to$ `Treffer [4]: 0.20`) untereinander dar.
   - *Positivbeispiel (`Signal_Clipping_Dreisatz_Illu.svg`):* Zeigt das Zoom-Fenster `[5.000 s ... 5.010 s]`, die Dreisatz-Formel `i = (t - t_0) / dt` und das Array `ys[5000..5010]` (`Nur 11 Werte gelesen!`), während `ys[0..4999]` und `ys[5011..N]` ausgegraut sind (`Ignoriert!`).
2. **Einheitliche Farbsemantik (FH OÖ & Didaktik-Palette):**
   - **Blau (`#eff6ff` Füllung, `#2563eb` Rahmen, `#1e40af` Text):** Aktiver Datenpfad, Kurzzeit-Puffer, reguläre Schritte.
   - **Grün (`#f0fdf4` / `#dcfce7` Füllung, `#16a34a` Rahmen, `#15803d` Text):** Zieltreffer, Optimierungserfolg ($\mathcal{O}(1)$), Gutbereich / Sollwert.
   - **Gelb/Amber (`#fffbeb` / `#fef3c7` Füllung, `#d97706` Rahmen, `#b45309` Text):** Aktuell geprüfter Index (Pivot/Mitte), Zwischenspeicher.
   - **Rot (`#fef2f2` / `#fee2e2` Füllung, `#dc2626` Rahmen, `#991b1b` Text):** Ausgeschlossener Bereich, Alarm-Ausreißer, Engpass / Verbot.
   - **Grau (`#e2e8f0` Füllung, `#94a3b8` Text):** Bereits erledigte / im RAM ignorierte Elemente.
3. **Vermeidung von Variablen-Linter-Konflikten:**
   - Alle alleinstehenden mathematischen Bezeichner oder `Consolas`-Variablen im SVG werden von `npm run lint:variables` geprüft. Verwende im SVG exakt dieselben Variablennamen wie im Folientext (oder nutze klare deutsche Begriffe wie `Mittelwert`, `Obere Grenze`).

---

## 3. UTF-8 Encoding & Prüf-Workflow

- **Reines UTF-8:** Achte beim Schreiben von Node.js-Generierungsskripten (`Skripte/generate_*_svgs.js`) strikt auf saubere UTF-8-Kodierung für deutsche Umlaute (`ä, ö, ü, Ä, Ö, Ü, ß`) oder nutze für Sonderzeichen wie Pfeile und Operatoren eindeutige XML-Entities (`&#8594;` für $\to$, `&#177;` für $\pm$, `&amp;`, `&lt;`, `&gt;`).
- **Pflicht-Prüfung nach jeder SVG-Generierung:**
  ```powershell
  node Skripte/generate_chapterX_svgs.js
  npm run lint:svg:XX
  npm run lint:variables:XX
  npm run lint:slides:XX
  ```
