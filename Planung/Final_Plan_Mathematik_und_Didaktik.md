# Finaler Fachplan (Stream C)
## Mathematik, Formeln & Notationsharmonisierung

**Dokument-ID:** `Planung/Final_Plan_Mathematik_und_Didaktik.md`  
**Autor:** Spezialist für Mathematik, Numerik & Fachdidaktik (Stream C)  
**Bezugsdokument:** `Reviews/FinalAudit_03_Mathematik_und_Formeln.md`  
**Datum:** 7. Oktober 2026  
**Zielgruppe:** Dozierende, Modulverantwortliche und Entwickler des Curriculums *Systemsimulation / Digitaler Zwilling* (FH Oberösterreich, Campus Wels)  
**Status:** Detaillierter, operativer Ausführungsplan (Bereit zur Implementierung)

---

## Inhaltsverzeichnis

1. [Executive Summary & Zielsetzung](#1-executive-summary--zielsetzung)
2. [AP-C1: Korrektur der Display-Math-Begrenzer in Kapitel 07 (P0)](#2-ap-c1-korrektur-der-display-math-begrenzer-in-kapitel-07-p0)
   - 2.1 Problemstellung: MathJax/KaTeX-Parsingrisiken bei Multiline-Inline-Math
   - 2.2 Korrektur der 4x4-Stabsteifigkeitsmatrix (Folie 27, Z. 473–478)
   - 2.3 Korrektur der 6x6-Stabsteifigkeitsmatrix (Folie 41, Z. 795–802)
   - 2.4 Sanierung hoher Inline-Vektoren in Fließtextabsätzen
3. [AP-C2: Harmonisierung des 2D/3D-Notationsdualismus in Kapitel 07 (P1)](#3-ap-c2-harmonisierung-des-2d3d-notationsdualismus-in-kapitel-07-p1)
   - 3.1 Analyse des Notationsbruchs zwischen Abschnitt 7.3 und 7.4
   - 3.2 Normative Festlegung nach ISO 80000-2 und DIN 1304
   - 3.3 Vollständiger Fundstellenkatalog und Transformationsmatrix
   - 3.4 Schlüsselfertige Folienüberarbeitung für das 3D-Fachwerk
4. [AP-C3: Didaktische Ergänzung der FEM-Koordinatentransformation (P1)](#4-ap-c3-didaktische-ergänzung-der-fem-koordinatentransformation-p1)
   - 4.1 Didaktische Lücke: Ankündigung in der Agenda vs. Fehlen im Haupttext
   - 4.2 Mathematische Herleitung: Lokales System, Richtungs-Kosinus-Matrix $\mathbf{T}$ & Kontragredienz
   - 4.3 Äquivalenzbeweis zwischen dyadischem Produkt $\mathbf{d}\mathbf{d}^T$ und $\mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}$
   - 4.4 Schlüsselfertiger Folientext der Ergänzungsfolie für Kapitel 07
5. [AP-C4: Didaktische Schärfung & Differenzierung von Abschnitt 7.5 (P1)](#4-ap-c4-didaktische-schärfung--differenzierung-von-abschnitt-75-p1)
   - 5.1 Analyse der Code-Theorie-Diskrepanz (Ideales vs. Elastisches Fachwerk)
   - 5.2 Präzisierung der Folientitel und Begriffsschärfung
   - 5.3 Ergänzungsfolie: Datenstrukturen des elastischen Fachwerks (FEM-Erweiterung)
   - 5.4 Schlüsselfertige Text- und Codebausteine
6. [AP-C5: Mathematischer Feinschliff in Kapiteln 01, 05 und 10 (P2)](#6-ap-c5-mathematischer-feinschliff-in-kapiteln-01-05-und-10-p2)
   - 6.1 Kapitel 01 (Folie 22): Vektorielle Formulierung des Luftwiderstands
   - 6.2 Kapitel 05 (Folien 47, 57): Disambiguierung der Kugelkoordinaten-Terminologie
   - 6.3 Kapitel 10 (Folie 48): Hinweisbox zur Zeitschrittgrenze bei Zero-Crossing
7. [Parallelitäts-, Abhängigkeits- & Schnittstellenanalyse](#7-parallelitäts--abhängigkeits--schnittstellenanalyse)
   - 7.1 Autonomie gegenüber Stream B (Grafiken/Assets) und Stream D (Code)
   - 7.2 Kollisionsfreie Synchronisation mit Stream A (Layout/Typografie)
   - 7.3 Phasen- und Arbeitsablauf
8. [Qualitätskriterien, Abnahme-Checkliste & Definition of Done](#8-qualitätskriterien-abnahme-checkliste--definition-of-done)

---

## 1. Executive Summary & Zielsetzung

Der abschließende Qualitäts-Audit zur mathematisch-physikalischen Exaktheit (`Reviews/FinalAudit_03_Mathematik_und_Formeln.md`) bescheinigt dem Curriculum *Systemsimulation / Digitaler Zwilling* ein exzellentes Gesamtniveau von **9,4 von 10 Punkten**. Frühere Großbaustellen – wie das unvollständige Solverspektrum, der industrielle Mechatronik-Regelkreis mit Anti-Windup, die PDE-Randwertbehandlung via Ghost-Cells und die numerisch stabile 1-Pass-Stochastik – wurden erfolgreich geschlossen.

Zur Erreichung der formalen und didaktischen Perfektion (10/10) definiert der vorliegende Fachplan **Stream C** präzise Korrekturmaßnahmen für fünf verbliebene Mängelbereiche:

| Arbeitspaket | Priorität | Betroffene Kapitel | Kernziel |
| :--- | :---: | :--- | :--- |
| **AP-C1** | **P0** | `Folien/07_Statische_Modelle` | Beseitigung aller mehrzeiligen `$ ... $`-Matrizen und Überführung in abgesetztes Display-Math `$$ ... $$` zur Eliminierung von MathJax/KaTeX-Renderfehlern. |
| **AP-C2** | **P1** | `Folien/07_Statische_Modelle` | Vollständige Beseitigung des Notationsdualismus zwischen 2D ($\mathbf{k}_{\text{Stab}}, \mathbf{u}$) und 3D ($k_{Stab}, \vec{u}$) gemäß ISO 80000-2. |
| **AP-C3** | **P1** | `Folien/07_Statische_Modelle` | Schließen der didaktischen Lücke bzgl. FEM-Koordinatentransformation ($\mathbf{k}_e^{glob} = \mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}$) als Brücke zur Technischen Mechanik. |
| **AP-C4** | **P1** | `Folien/07_Statische_Modelle` | Klare Kennzeichnung des Datenmodells in Abschnitt 7.5 als *ideales Fachwerk* und didaktische Gegenüberstellung zum *elastischen FEM-Fachwerk*. |
| **AP-C5** | **P2** | `Folien/01_Einführung`<br>`Folien/05_Visualisierung_3D_OpenGL`<br>`Folien/10_Dynamische_Modelle_Hybrid` | Mathematischer Feinschliff: Vektorieller Luftwiderstand ($\vec{F}_R \propto \|\vec{v}\|\vec{v}$), Disambiguierung Kugel-/Kamerakoordinaten ($\theta_{\text{elev}}$ vs. $\phi_{\text{polar}}$), Zero-Crossing-Schranke. |

Alle Maßnahmen sind so konzipiert, dass sie **vollkommen unabhängig von Stream B** (Grafikgenerierung) und **ohne semantische Interferenzen parallel zu Stream A** (Layout/Typografie) durchgeführt werden können.

---

## 2. AP-C1: Korrektur der Display-Math-Begrenzer in Kapitel 07 (P0)

### 2.1 Problemstellung: MathJax/KaTeX-Parsingrisiken bei Multiline-Inline-Math

Im CommonMark-Standard sowie in den Markdown-Parsern von MARP (basiert auf `markdown-it` mit MathJax- bzw. KaTeX-Erweiterung) ist die Begrenzung durch einfache Dollarzeichen (`$ ... $`) ausschließlich für einzeilige Inline-Formeln innerhalb eines Fließtextabsatzes spezifiziert.

Sobald innerhalb einer einfachen Dollar-Klammerung Zeilenumbrüche (`\n`) auftreten, greift das CommonMark-Absatzparsing:
1. Einige Parser interpretieren den Zeilenumbruch als Whitespace, andere brechen den Mathemodus sofort ab und rendern die Folgezeilen als unformatierten Rohtext (`e_x^2 & e_x e_y ... \end{pmatrix}$`).
2. Auf Zielsystemen mit strengen Markdown-Linter-Regeln oder alternativen KaTeX-Render-Pipelines führt dies zu sichtbarem Syntax-Salat auf den Präsentationsfolien.
3. Formeln dieser Größenordnung ($4 \times 4$ und $6 \times 6$) sind definitionsgemäß Blockformeln und gehören typografisch zwingend in abgesetzte Display-Math-Umgebungen (`$$ ... $$`).

### 2.2 Korrektur der 4x4-Stabsteifigkeitsmatrix (Folie 27, Z. 473–478)

#### Ist-Zustand (`Folien/07_Statische_Modelle/Folien.md:471–480`)
```latex
Durch Ausmultiplizieren der Vektoren (äußeres Produkt) ergibt sich die **4x4-Stab-Steifigkeitsmatrix** $\mathbf{k}_{\text{Stab}}$:

$\mathbf{k}_{\text{Stab}} = \frac{EA}{L} \begin{pmatrix}
e_x^2 & e_x e_y & -e_x^2 & -e_x e_y \\
e_y e_x & e_y^2 & -e_y e_x & -e_y^2 \\
-e_x^2 & -e_x e_y & e_x^2 & e_x e_y \\
-e_y e_x & -e_y^2 & e_y e_x & e_y^2
\end{pmatrix}$

Diese Matrix beschreibt den linearen Zusammenhang zwischen den 4 Verschiebungs-Freiheitsgraden eines Stabes und den daraus resultierenden 4 Knotenkräften im globalen Koordinatensystem.
```

#### Soll-Zustand (Korrektur & Typografie-Optimierung)
```latex
Durch Ausmultiplizieren der Vektoren (äußeres Produkt) ergibt sich die **4x4-Stab-Steifigkeitsmatrix** $\mathbf{k}_{\text{Stab}}$:

$$
\mathbf{k}_{\text{Stab}} = \frac{EA}{L} \begin{pmatrix}
e_x^2 & e_x e_y & -e_x^2 & -e_x e_y \\
e_y e_x & e_y^2 & -e_y e_x & -e_y^2 \\
-e_x^2 & -e_x e_y & e_x^2 & e_x e_y \\
-e_y e_x & -e_y^2 & e_y e_x & e_y^2
\end{pmatrix}
$$

Diese Matrix beschreibt den linearen Zusammenhang zwischen den 4 Verschiebungs-Freiheitsgraden eines Stabes und den daraus resultierenden 4 Knotenkräften im globalen Koordinatensystem.
```

### 2.3 Korrektur der 6x6-Stabsteifigkeitsmatrix (Folie 41, Z. 793–804)

#### Ist-Zustand (`Folien/07_Statische_Modelle/Folien.md:793–804`)
```latex
Das Ausmultiplizieren der Vektoren führt zur **6x6-Stab-Steifigkeitsmatrix** $k_{Stab}$:

$k_{Stab} = \frac{EA}{L} \begin{pmatrix}
e_x^2 & e_x e_y & e_x e_z & -e_x^2 & -e_x e_y & -e_x e_z \\
e_y e_x & e_y^2 & e_y e_z & -e_y e_x & -e_y^2 & -e_y e_z \\
e_z e_x & e_z e_y & e_z^2 & -e_z e_x & -e_z e_y & -e_z^2 \\
-e_x^2 & -e_x e_y & -e_x e_z & e_x^2 & e_x e_y & e_x e_z \\
-e_y e_x & -e_y^2 & -e_y e_z & e_y e_x & e_y^2 & e_y e_z \\
-e_z e_x & -e_z e_y & -e_z^2 & e_z e_x & e_z e_y & e_z^2
\end{pmatrix}$

Diese Matrix beschreibt den Zusammenhang zwischen den 6 Verschiebungs-Freiheitsgraden eines Stabes und den daraus resultierenden 6 Knotenkräften im globalen Koordinatensystem.
```

#### Soll-Zustand (Korrektur & Notationsharmonisierung)
```latex
Das Ausmultiplizieren der Vektoren führt zur **6x6-Stab-Steifigkeitsmatrix** $\mathbf{k}_{\text{Stab}}$:

$$
\mathbf{k}_{\text{Stab}} = \frac{EA}{L} \begin{pmatrix}
e_x^2 & e_x e_y & e_x e_z & -e_x^2 & -e_x e_y & -e_x e_z \\
e_y e_x & e_y^2 & e_y e_z & -e_y e_x & -e_y^2 & -e_y e_z \\
e_z e_x & e_z e_y & e_z^2 & -e_z e_x & -e_z e_y & -e_z^2 \\
-e_x^2 & -e_x e_y & -e_x e_z & e_x^2 & e_x e_y & e_x e_z \\
-e_y e_x & -e_y^2 & -e_y e_z & e_y e_x & e_y^2 & e_y e_z \\
-e_z e_x & -e_z e_y & -e_z^2 & e_z e_x & e_z e_y & e_z^2
\end{pmatrix}
$$

Diese Matrix beschreibt den Zusammenhang zwischen den 6 Verschiebungs-Freiheitsgraden eines Stabes und den daraus resultierenden 6 Knotenkräften im globalen Koordinatensystem.
```

### 2.4 Sanierung hoher Inline-Vektoren in Fließtextabsätzen

Neben den beiden mehrzeiligen Matrizen existieren vier Stellen, an denen $4 \times 1$- bzw. $6 \times 1$-Spaltenvektoren im Inline-Modus deklariert sind, was die typografische Zeilenhöhe massiv aufreißt:

1. **Folie 24 (Z. 441):**
   - *Ist:* `$\begin{pmatrix} F_{ix} \\ F_{iy} \\ F_{jx} \\ F_{jy} \end{pmatrix} = k_{stab} \cdot \begin{pmatrix} u_{ix} \\ u_{iy} \\ u_{jx} \\ u_{jy} \end{pmatrix}$`
   - *Soll:* Umwandlung in abgesetzten Display-Math-Block mit Fettschrift:
     ```latex
     $$
     \begin{pmatrix} F_{ix} \\ F_{iy} \\ F_{jx} \\ F_{jy} \end{pmatrix} = \mathbf{k}_{\text{Stab}} \begin{pmatrix} u_{ix} \\ u_{iy} \\ u_{jx} \\ u_{jy} \end{pmatrix}
     $$
     ```
2. **Folie 26 (Z. 458):**
   - *Ist:* `$\mathbf{f}_{\text{Stab}} = \begin{pmatrix} \mathbf{f}_i \\ \mathbf{f}_j \end{pmatrix} = S \begin{pmatrix} -\mathbf{e} \\ \mathbf{e} \end{pmatrix} = \frac{EA}{L} \Delta L \begin{pmatrix} -e_x \\ -e_y \\ e_x \\ e_y \end{pmatrix}$`
   - *Soll:* Belassen von $\mathbf{f}_{\text{Stab}} = (\mathbf{f}_i^T, \mathbf{f}_j^T)^T$ im Text oder Absetzen als Display-Formel.
3. **Folie 27 (Z. 469):**
   - *Ist:* `$\mathbf{f}_{\text{Stab}} = \frac{EA}{L} \left( \begin{pmatrix} -e_x & -e_y & e_x & e_y \end{pmatrix} \cdot \mathbf{u} \right) \cdot \begin{pmatrix} -e_x \\ -e_y \\ e_x \\ e_y \end{pmatrix}$`
   - *Soll:* Absetzen als Display-Formel:
     ```latex
     $$
     \mathbf{f}_{\text{Stab}} = \frac{EA}{L} \left( \begin{pmatrix} -e_x & -e_y & e_x & e_y \end{pmatrix} \mathbf{u} \right) \begin{pmatrix} -e_x \\ -e_y \\ e_x \\ e_y \end{pmatrix}
     $$
     ```
4. **Folie 40 (Z. 787):**
   - *Ist:* Mehrzeiliger Spaltenvektor im Fließtext.
   - *Soll:* Saubere Display-Math-Umgebung `$$ ... $$`.

---

## 3. AP-C2: Harmonisierung des 2D/3D-Notationsdualismus in Kapitel 07 (P1)

### 3.1 Analyse des Notationsbruchs zwischen Abschnitt 7.3 und 7.4

Im Skriptum zu Kapitel 07 liegt derzeit ein ausgeprägter didaktischer und typografischer Bruch vor:
- **Abschnitt 7.3 (Elastisches 2D-Fachwerk):** Verwendet überwiegend moderne Matrix-Vektor-Notation nach ISO 80000-2:
  - Elementsteifigkeitsmatrix: $\mathbf{k}_{\text{Stab}}$
  - Verschiebungsvektor: $\mathbf{u}$
  - Knotenkräfte: $\mathbf{f}_{\text{Stab}}$
  - Globale Steifigkeitsmatrix: $\mathbf{K}$
- **Abschnitt 7.4 (Elastisches 3D-Fachwerk):** Fällt unvermittelt in eine veraltete Mischform aus Pfeilnotation und kursiven Skalaren zurück:
  - Steifigkeitsmatrix: $k_{Stab}$, $K$, $k_{BB}$, $k_{BA}$ (kursiv wie Skalare!)
  - Verschiebungsvektor: $\vec{u}$, $\vec{u}_B$, $\vec{u}_A$ (mit Vektorpfeilen)
  - Kraftvektoren: $\vec{f}_{Stab}$, $\vec{f}$, $\vec{f}_B$

Dieser Bruch verwirrt Studierende, da eine Matrix $k_{BB}$ optisch nicht von einem Federsteifigkeits-Skalar $k$ unterscheidbar ist und der Eindruck entsteht, 2D- und 3D-FEM folgten unterschiedlichen mathematischen Formalismen.

### 3.2 Normative Festlegung nach ISO 80000-2 und DIN 1304

Für das gesamte Lehrwerk gilt folgende verbindliche Konvention:

1. **Matrizen:** Aufrechte, fette lateinische Großbuchstaben bzw. indizierte Kleinbuchstaben:
   - Globale Steifigkeitsmatrix: $\mathbf{K} \in \mathbb{R}^{n \times n}$
   - Partitionierte Teilmatrizen: $\mathbf{K}_{BB}, \mathbf{K}_{BA}, \mathbf{K}_{AA} \in \mathbb{R}^{\dots}$
   - Elementsteifigkeitsmatrix: $\mathbf{k}_{\text{Stab}} \in \mathbb{R}^{4 \times 4}$ (2D) bzw. $\mathbb{R}^{6 \times 6}$ (3D), alternativ $\mathbf{k}_e$
   - Transformationsmatrix: $\mathbf{T}$
   - Dreiecksmatrix der Cholesky-Zerlegung: $\mathbf{L}$ mit $\mathbf{K}_{BB} = \mathbf{L} \mathbf{L}^T$
2. **Vektoren:** Aufrechte, fette lateinische Kleinbuchstaben:
   - Globaler Verschiebungsvektor: $\mathbf{u}$ (freie Verschiebungen: $\mathbf{u}_B$, Lagerverschiebungen: $\mathbf{u}_A$)
   - Globaler Lastvektor: $\mathbf{f}$ (äußere Lasten: $\mathbf{f}_B$, Lagerreaktionen: $\mathbf{f}_A$)
   - Elementkräfte: $\mathbf{f}_{\text{Stab}}$
   - *Ausnahme für 2D/3D-Raumgeometrie:* Ortsvektoren einzelner geometrischer Punkte oder Richtungs-Einheitsvektoren im Raum dürfen zur Verdeutlichung ihrer geometrischen Anschauung als $\vec{p}_i = (x_i, y_i, z_i)^T$ und $\vec{e} = (e_x, e_y, e_z)^T$ notiert werden, solange der algebraische Verschiebungs- und Kraftzustand konsequent als $\mathbf{u}$ und $\mathbf{f}$ behandelt wird.
3. **Skalare & Materialparameter:** Kursive Standard-Schrift:
   - $E$ (Elastizitätsmodul), $A$ (Querschnittsfläche), $L$ (Stablänge), $S$ (Stabnormalkraft), $\Delta L$ (Längenänderung).

### 3.3 Vollständiger Fundstellenkatalog und Transformationsmatrix

Die folgende Tabelle enthält alle zu transformierenden Textstellen in `Folien/07_Statische_Modelle/Folien.md`:

| Folie / Zeile | Ist-Zustand (Bruch) | Soll-Zustand (Harmonisiert) | Didaktische Begründung |
| :--- | :--- | :--- | :--- |
| **Folie 24, Z. 439** | `$k_{stab}$` | `$\mathbf{k}_{\text{Stab}}$` | Beseitigung des kursiven Skalar-Symbols im 2D-Text. |
| **Folie 24, Z. 441** | `$k_{stab} \cdot \begin{pmatrix} \dots \end{pmatrix}$` | `$$\mathbf{k}_{\text{Stab}} \begin{pmatrix} \dots \end{pmatrix}$$` | Matrix-Vektor-Produkt in Fettschrift und Display-Math. |
| **Folie 39, Z. 661** | `$k_{stab}$ ist nun eine 6x6-Matrix` | `$\mathbf{k}_{\text{Stab}}$ ist nun eine $6 \times 6$-Matrix` | Harmonisierung im 3D-Überblick. |
| **Folie 40, Z. 780** | `$k_{Stab}$, $\vec{u}$, $\vec{f}_{Stab}$` | `$\mathbf{k}_{\text{Stab}}$, $\mathbf{u}$, $\mathbf{f}_{\text{Stab}}$` | Übergang zur normgerechten Vektor-/Matrixschreibweise. |
| **Folie 40, Z. 782** | `$\vec{u} = (u_{ix}, \dots)^T$` | `$\mathbf{u} = (u_{ix}, u_{iy}, u_{iz}, u_{jx}, u_{jy}, u_{jz})^T$` | Elementverschiebungsvektor in Fettschrift. |
| **Folie 40, Z. 783** | `$\vec{f}_{Stab} = (\vec{f}_i^T, \vec{f}_j^T)^T$` | `$\mathbf{f}_{\text{Stab}} = (\mathbf{f}_i^T, \mathbf{f}_j^T)^T$` | Stab-Knotenkraftvektor in Fettschrift. |
| **Folie 40, Z. 787** | `$\vec{f}_{Stab} = \dots \vec{u} \dots$` | `$$\mathbf{f}_{\text{Stab}} = \dots \mathbf{u} \dots$$` | Display-Math und fette Vektoren. |
| **Folie 41, Z. 793** | `$k_{Stab}$` | `$\mathbf{k}_{\text{Stab}}$` | Matrix fett im Einleitungssatz. |
| **Folie 41, Z. 795** | `$k_{Stab} = \frac{EA}{L} \begin{pmatrix}\dots\end{pmatrix}$` | `$$\mathbf{k}_{\text{Stab}} = \frac{EA}{L} \begin{pmatrix}\dots\end{pmatrix}$$` | Display-Math und fettes Matrix-Symbol. |
| **Folie 42, Z. 810** | `$K$, $k_{Stab}$` | `$\mathbf{K}$, $\mathbf{k}_{\text{Stab}}$` | Globale und Elementsteifigkeit fett. |
| **Folie 42, Z. 812** | `$k_{Stab}$-Matrix an die [...] $K$ addiert` | `$\mathbf{k}_{\text{Stab}}$-Matrix an die [...] $\mathbf{K}$ addiert` | Direkte Steifigkeitsmethode präzisiert. |
| **Folie 42, Z. 817** | `$K \cdot \vec{u} = \vec{f}$` | `$$\mathbf{K} \mathbf{u} = \mathbf{f}$$` | Globales LGS in Display-Math und Fettschrift. |
| **Folie 42, Z. 820** | `$\vec{u}$: Globaler Vektor` | `$\mathbf{u}$: Globaler Vektor` | Konsistenter Verschiebungsvektor. |
| **Folie 42, Z. 821** | `$\vec{f}$: Globaler Vektor` | `$\mathbf{f}$: Globaler Vektor` | Konsistenter Lastvektor. |
| **Folie 48, Z. 827** | `$\vec{u}_B$` | `$\mathbf{u}_B$` | Vektor der freien Freiheitsgrade fett. |
| **Folie 48, Z. 829** | `$k_{BB} \cdot \vec{u}_B = \vec{f}_B - k_{BA} \cdot \vec{u}_A$` | `$$\mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B - \mathbf{K}_{BA} \mathbf{u}_A$$` | Abgesetzte Blockformel mit fetten Blockmatrizen. |
| **Folie 48, Z. 835** | `$k_{BB} \cdot u_B = f_B'$, $k_{BB} = L L^T$` | `$\mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B'$, $\mathbf{K}_{BB} = \mathbf{L} \mathbf{L}^T$` | Cholesky-Gleichung mit Matrix $\mathbf{L}$. |
| **Folie 53, Z. 979** | `kBB.Cholesky() ($k_{BB}$)` | `kBB.Cholesky() ($\mathbf{K}_{BB}$)` | Notationsabgleich mit C#-Code. |
| **Folie 53, Z. 988** | `kBA * uKnown` | `kBA * uKnown` (Formel $\mathbf{K}_{BA} \mathbf{u}_A$) | Didaktischer Bezug hergestellt. |

### 3.4 Schlüsselfertige Folienüberarbeitung für das 3D-Fachwerk

Nachfolgend sind die schlüsselfertigen Markdown-Blöcke für die Folien 40 bis 48 dargestellt:

```markdown
---

### Die 3D-Stab-Steifigkeitsmatrix (1/2)

Ziel ist es, eine Matrix $\mathbf{k}_{\text{Stab}}$ zu finden, die die Knotenverschiebungen $\mathbf{u}$ direkt mit den resultierenden Knotenkäften $\mathbf{f}_{\text{Stab}}$ in Beziehung setzt: $\mathbf{f}_{\text{Stab}} = \mathbf{k}_{\text{Stab}} \mathbf{u}$.

- **Vektor der Knotenverschiebungen**: $\mathbf{u} = (u_{ix}, u_{iy}, u_{iz}, u_{jx}, u_{jy}, u_{jz})^T$
- **Vektor der Stabkräfte**: $\mathbf{f}_{\text{Stab}} = (\mathbf{f}_i^T, \mathbf{f}_j^T)^T$

Setzt man die Formeln für $\Delta L$ und $S$ in die Kraftgleichungen ein, erhält man:

$$
\mathbf{f}_{\text{Stab}} = \frac{EA}{L} \cdot \Delta L \begin{pmatrix} -e_x \\ -e_y \\ -e_z \\ e_x \\ e_y \\ e_z \end{pmatrix} = \frac{EA}{L} \left( \begin{pmatrix} -e_x & -e_y & -e_z & e_x & e_y & e_z \end{pmatrix} \mathbf{u} \right) \begin{pmatrix} -e_x \\ -e_y \\ -e_z \\ e_x \\ e_y \\ e_z \end{pmatrix}
$$

---

### Die 3D-Stab-Steifigkeitsmatrix (2/2)

Das Ausmultiplizieren der Vektoren führt zur **6x6-Stab-Steifigkeitsmatrix** $\mathbf{k}_{\text{Stab}}$:

$$
\mathbf{k}_{\text{Stab}} = \frac{EA}{L} \begin{pmatrix}
e_x^2 & e_x e_y & e_x e_z & -e_x^2 & -e_x e_y & -e_x e_z \\
e_y e_x & e_y^2 & e_y e_z & -e_y e_x & -e_y^2 & -e_y e_z \\
e_z e_x & e_z e_y & e_z^2 & -e_z e_x & -e_z e_y & -e_z^2 \\
-e_x^2 & -e_x e_y & -e_x e_z & e_x^2 & e_x e_y & e_x e_z \\
-e_y e_x & -e_y^2 & -e_y e_z & e_y e_x & e_y^2 & e_y e_z \\
-e_z e_x & -e_z e_y & -e_z^2 & e_z e_x & e_z e_y & e_z^2
\end{pmatrix}
$$

Diese Matrix beschreibt den Zusammenhang zwischen den 6 Verschiebungs-Freiheitsgraden eines Stabes und den daraus resultierenden 6 Knotenkräften im globalen Koordinatensystem.

---

### Globales Gleichungssystem

Die globale Steifigkeitsmatrix $\mathbf{K}$ des gesamten Fachwerks wird durch "Assemblierung" der einzelnen Stab-Steifigkeitsmatrizen $\mathbf{k}_{\text{Stab}}$ aufgebaut.

- Für jeden Stab werden die 36 Elemente seiner $\mathbf{k}_{\text{Stab}}$-Matrix an die richtigen Positionen in der globalen Matrix $\mathbf{K}$ addiert. Die Positionen ergeben sich aus den globalen Freiheitsgraden der beiden Knoten des Stabes.
- Dieser Prozess wird als **Direkte Steifigkeitsmethode** bezeichnet.

Das resultierende globale Gleichungssystem lautet:

$$
\mathbf{K} \mathbf{u} = \mathbf{f}
$$

- $\mathbf{K}$: Globale Steifigkeitsmatrix (Größe $3k \times 3k$ für $k$ Knoten)
- $\mathbf{u}$: Globaler Vektor der unbekannten Knotenverschiebungen
- $\mathbf{f}$: Globaler Vektor der externen Kräfte

---

### Numerische Lösung des Gleichungssystems

Für die Auflösung nach den freien Verschiebungen $\mathbf{u}_B$ gilt:

$$
\mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B - \mathbf{K}_{BA} \mathbf{u}_A
$$

- **Ideales Fachwerk ($\mathbf{A} \mathbf{x} = \mathbf{b}$):** Regulär, nicht symmetrisch $\to$ LU-Faktorisierung mit partieller Pivotisierung:
  ```csharp
  Vector<double> x = A.Solve(b); // O(2/3 n^3) statt O(2 n^3) Inversion
  ```
- **Elastisches Fachwerk ($\mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B'$):** Die Matrix $\mathbf{K}_{BB}$ ist **symmetrisch positiv-definit (SPD)** $\to$ **Cholesky-Zerlegung** ($\mathbf{K}_{BB} = \mathbf{L} \mathbf{L}^T$):
  ```csharp
  // Cholesky ist 2x schneller als LU; robuster Fallback bei Singularität
  var uB = kBB.Cholesky().Solve(fB);
  ```
- **Numerische Best Practice:** Keine explizite Invertierung (`A.Inverse().Multiply(b)` ist numerisch instabil und ineffizient)!
```

---

## 4. AP-C3: Didaktische Ergänzung der FEM-Koordinatentransformation (P1)

### 4.1 Didaktische Lücke: Ankündigung in der Agenda vs. Fehlen im Haupttext

In `Folien/07_Statische_Modelle/Folien.md` kündigt die Agenda-Folie zu Abschnitt 7.3 (Zeile 313) explizit an:
> *- Koordinatentransformation & globale Stabsteifigkeit*

Im nachfolgenden Text wird die Stabsteifigkeitsmatrix jedoch rein über die Projektion der Stabkraft $S$ entlang des Einheitsrichtungsvektors $\mathbf{e}$ hergeleitet (dyadisches Produkt $\mathbf{d}\mathbf{d}^T$). Die in der Finiten-Elemente-Methode, Mehrkörperdynamik und Mechatronik universell etablierte Beziehung:
$$
\mathbf{k}_e^{glob} = \mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}
$$
fehlt vollständig. Diese Lücke erzeugt Verwirrung, wenn Studierende parallele Mechanik- oder FEM-Vorlesungen besuchen.

### 4.2 Mathematische Herleitung: Lokales System, Richtungs-Kosinus-Matrix $\mathbf{T}$ & Kontragredienz

Die FEM-Standardformulierung leitet die globale Steifigkeit in drei kanonischen Schritten her:

1. **Lokales Elementkoordinatensystem:**
   In einem mit dem Stab mitrotierenden Koordinatensystem ($\xi$-Achse entlang der Stabachse) besitzt der 1D-Stab nur zwei axiale Verschiebungsfreiheitsgrade $\mathbf{u}^{loc} = (u_1', u_2')^T$ und zwei Axialkräfte $\mathbf{f}^{loc} = (f_1', f_2')^T$:
   $$
   \mathbf{f}^{loc} = \mathbf{k}_e^{loc} \mathbf{u}^{loc} \quad \text{mit} \quad \mathbf{k}_e^{loc} = \frac{EA}{L} \begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}
   $$

2. **Kinematische Transformation der Verschiebungen:**
   Die Transformation der globalen 2D-Knotenverschiebungen $\mathbf{u} = (u_{ix}, u_{iy}, u_{jx}, u_{jy})^T$ in die lokalen Axialverschiebungen erfolgt über die Richtungs-Kosinus-Matrix $\mathbf{T} \in \mathbb{R}^{2 \times 4}$:
   $$
   \mathbf{u}^{loc} = \mathbf{T} \mathbf{u} \quad \text{mit} \quad \mathbf{T} = \begin{pmatrix} \cos\alpha & \sin\alpha & 0 & 0 \\ 0 & 0 & \cos\alpha & \sin\alpha \end{pmatrix} = \begin{pmatrix} e_x & e_y & 0 & 0 \\ 0 & 0 & e_x & e_y \end{pmatrix}
   $$

3. **Statische Transformation der Kräfte (Kontragredienz):**
   Nach dem Prinzip der virtuellen Verschiebungen muss die virtuelle innere Formänderungsarbeit im lokalen und globalen Koordinatensystem invariant sein ($\delta W_{int} = (\delta \mathbf{u}^{loc})^T \mathbf{f}^{loc} = \delta \mathbf{u}^T \mathbf{f}$):
   $$
   (\mathbf{T} \, \delta \mathbf{u})^T \mathbf{f}^{loc} = \delta \mathbf{u}^T (\mathbf{T}^T \mathbf{f}^{loc}) = \delta \mathbf{u}^T \mathbf{f} \implies \mathbf{f} = \mathbf{T}^T \mathbf{f}^{loc}
   $$

4. **Globale Elementsteifigkeitsmatrix:**
   Einsetzen der lokalen Materialgleichung liefert direkt:
   $$
   \mathbf{f} = \mathbf{T}^T (\mathbf{k}_e^{loc} \mathbf{u}^{loc}) = \mathbf{T}^T \mathbf{k}_e^{loc} (\mathbf{T} \mathbf{u}) = \underbrace{(\mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T})}_{\mathbf{k}_e^{glob}} \mathbf{u}
   $$

### 4.3 Äquivalenzbeweis zwischen dyadischem Produkt $\mathbf{d}\mathbf{d}^T$ und $\mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}$

Das Ausmultiplizieren beweist die exakte Identität:
$$
\begin{aligned}
\mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T} &= \begin{pmatrix} e_x & 0 \\ e_y & 0 \\ 0 & e_x \\ 0 & e_y \end{pmatrix} \cdot \left[ \frac{EA}{L} \begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix} \right] \cdot \begin{pmatrix} e_x & e_y & 0 & 0 \\ 0 & 0 & e_x & e_y \end{pmatrix} \\
&= \frac{EA}{L} \begin{pmatrix} e_x & -e_x \\ e_y & -e_y \\ -e_x & e_x \\ -e_y & e_y \end{pmatrix} \begin{pmatrix} e_x & e_y & 0 & 0 \\ 0 & 0 & e_x & e_y \end{pmatrix} \\
&= \frac{EA}{L} \begin{pmatrix}
e_x^2 & e_x e_y & -e_x^2 & -e_x e_y \\
e_y e_x & e_y^2 & -e_y e_x & -e_y^2 \\
-e_x^2 & -e_x e_y & e_x^2 & e_x e_y \\
-e_y e_x & -e_y^2 & e_y e_x & e_y^2
\end{pmatrix} = \mathbf{k}_{\text{Stab}}
\end{aligned}
$$

### 4.4 Schlüsselfertiger Folientext der Ergänzungsfolie für Kapitel 07

Diese neue Folie wird unmittelbar nach Folie 27 (*Herleitung der Stab-Steifigkeitsmatrix (2/2)*) als Folie 27b eingefügt:

```markdown
---

### Alternative FEM-Sicht: Koordinatentransformation

In der Finiten-Elemente-Methode (FEM) wird die globale Matrix standardmäßig über eine **Transformationsmatrix $\mathbf{T}$** aus dem lokalen 1D-Stab abgeleitet:

1. **Lokale Elementsteifigkeit:** Im mitrotierenden System ($\xi$-Achse entlang Stab):
   $$\mathbf{f}^{loc} = \mathbf{k}_e^{loc} \mathbf{u}^{loc} \quad \text{mit} \quad \mathbf{k}_e^{loc} = \frac{EA}{L} \begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}$$

2. **Kinematische Transformation:** Globale 2D-Verschiebungen $\to$ Lokale 1D-Verformung:
   $$\mathbf{u}^{loc} = \mathbf{T} \mathbf{u} \quad \text{mit} \quad \mathbf{T} = \begin{pmatrix} e_x & e_y & 0 & 0 \\ 0 & 0 & e_x & e_y \end{pmatrix}, \quad e_x = \cos\alpha, \; e_y = \sin\alpha$$

3. **Globale Elementsteifigkeit via Kontragredienz:**
   $$\mathbf{f} = \mathbf{T}^T \mathbf{f}^{loc} = \mathbf{T}^T (\mathbf{k}_e^{loc} \mathbf{T} \mathbf{u}) \implies \mathbf{k}_e^{glob} = \mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}$$

> [!NOTE]
> Beide Wege führen zum identischen Resultat: $\mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T} \equiv \frac{EA}{L} (\mathbf{d} \mathbf{d}^T) = \mathbf{k}_{\text{Stab}}$.
> Die Transformationsmatrix-Methode ist der universelle Standard für Balken, Schalen und 3D-Volumenelemente.
```

---

## 5. AP-C4: Didaktische Schärfung & Differenzierung von Abschnitt 7.5 (P1)

### 5.1 Analyse der Code-Theorie-Diskrepanz (Ideales vs. Elastisches Fachwerk)

In Abschnitt 7.3 und 7.4 wird die Theorie des **elastischen Fachwerks** (FEM, Knotenverschiebungen $\mathbf{u}$, Dehnsteifigkeit $EA$, Cholesky-Zerlegung) aufwendig hergeleitet.

In Abschnitt 7.5 (*Programmtechnische Umsetzung: Datenstrukturen*, Folien 50–52) zeigen die Klassen `Node`, `Rod` und `Truss` jedoch die Architektur des **idealen 2D-Fachwerks**:
- `Node` besitzt Lasten `ForceX/Y` und Fixierungen `FixX/Y`, aber keine Verschiebungsfelder `DisplacementX/Y`.
- `Rod` besitzt nur `NodeA`, `NodeB` und die Schnittkraft `Force`, aber weder Elastizitätsmodul `E` noch Fläche `A` noch Ausgangslänge `L0`.
- `Truss.Solve()` löst das Gleichgewichtssystem $\mathbf{A} \mathbf{s} = \mathbf{f}$ für Stabnormalkräfte mittels LU-Zerlegung.

Ohne didaktische Klarstellung entsteht der fatale Eindruck, der zuvor hergeleitete FEM-Formalismus mit Steifigkeitsmatrizen sei im Code „vergessen“ worden.

### 5.2 Präzisierung der Folientitel und Begriffsschärfung

1. **Folie 49 (Abschnitts-Agenda):**
   - *Titel:* `## 7.5: Programmtechnische Umsetzung`
   - *Inhalt präzisieren:* Klare Unterteilung in das Basisdatenmodell für das *ideale Fachwerk* und dessen Erweiterung für das *elastische FEM-Fachwerk*.
2. **Folie 50 (Datenstrukturen):**
   - *Titel anpassen:* `### Programmtechnische Umsetzung: Datenstrukturen für das ideale 2D-Fachwerk`
   - *Text ergänzen:* Expliziter Hinweis, dass dieses Modell die Gleichgewichtsbedingungen starrer Stäbe abbildet.

### 5.3 Ergänzungsfolie: Datenstrukturen des elastischen Fachwerks (FEM-Erweiterung)

Zur Auflösung der Diskrepanz wird unmittelbar nach Folie 52 (vor der `Math.NET`-Bibliotheksfolie) eine Scharnierfolie 52b eingefügt:

```markdown
---

<div class="columns">
<div>

### Erweiterung: Datenmodell für das elastische Fachwerk (FEM)

Für die FEM-Berechnung des elastischen Fachwerks werden die Datenstrukturen um Material- und Verschiebungsdaten erweitert:

- **`ElasticNode`**: Erhält Felder für die unbekannten bzw. berechneten Knotenverschiebungen:
  - `DisplacementX`, `DisplacementY` ($u_x, u_y$ in $\mathrm{m}$)
- **`ElasticRod`**: Benötigt die physikalischen Querschnitts- und Materialkonstanten:
  - `ElasticityModulus` ($E$ in $\mathrm{N/m^2}$)
  - `CrossSectionArea` ($A$ in $\mathrm{m^2}$)
- **Schnittkraftberechnung (Post-Processing):**
  Nach Lösen von $\mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B'$ wird die Stabkraft berechnet:
  $$S = \frac{EA}{L} \cdot \left[ \mathbf{e} \cdot (\mathbf{u}_j - \mathbf{u}_i) \right]$$

</div>
<div>

```csharp
public class ElasticNode : Node
{
    // Berechnete Knotenverschiebungen
    public double DisplacementX { get; set; }
    public double DisplacementY { get; set; }
}

public class ElasticRod : Rod
{
    // Physikalische Stabparameter
    public double Elasticity { get; set; } // E [Pa]
    public double Area { get; set; }       // A [m^2]

    public double ComputeNormalForce()
    {
        double dx = NodeB.PositionX - NodeA.PositionX;
        double dy = NodeB.PositionY - NodeA.PositionY;
        double L = Math.Sqrt(dx * dx + dy * dy);
        double ex = dx / L, ey = dy / L;

        var eNodeA = (ElasticNode)NodeA;
        var eNodeB = (ElasticNode)NodeB;
        double du = (eNodeB.DisplacementX - eNodeA.DisplacementX) * ex
                  + (eNodeB.DisplacementY - eNodeA.DisplacementY) * ey;

        return (Elasticity * Area / L) * du;
    }
}
```

</div>
</div>
```

---

## 6. AP-C5: Mathematischer Feinschliff in Kapiteln 01, 05 und 10 (P2)

### 6.1 Kapitel 01 (Folie 22): Vektorielle Formulierung des Luftwiderstands

#### Problemstellung
In `Folien/01_Einführung/Folien.md:437` steht bisher:
> `- Luftwiderstand $F_R \propto v^2$ macht die DGL nichtlinear.`

Didaktische Falle: Studierende neigen dazu, die Proportionalität $v^2$ komponentenweise anzusetzen ($F_{Rx} \propto v_x^2, F_{Ry} \propto v_y^2$). Dies ist physikalisch grob falsch! Der Luftwiderstand wirkt stets antiparallel zum aktuellen Geschwindigkeitsvektor $\vec{v}$. Die korrekte Vektorgleichung:
$$
\vec{F}_R = -\frac{1}{2} c_w \rho A \|\vec{v}\| \vec{v}
$$
koppelt die Bewegungsgleichungen in $x$ und $y$ über die euklidische Norm $\|\vec{v}\| = \sqrt{v_x^2 + v_y^2}$:
$$
F_{Rx} = -\frac{1}{2} c_w \rho A \sqrt{v_x^2 + v_y^2} \cdot v_x, \quad F_{Ry} = -\frac{1}{2} c_w \rho A \sqrt{v_x^2 + v_y^2} \cdot v_y
$$
Dies begründet zwingend, warum bei Luftwiderstand keine getrennte analytische Lösung mehr existiert und numerische Integrationsverfahren erforderlich sind.

#### Schlüsselfertiger Folien-Patch (`Folien/01_Einführung/Folien.md:435–442`)
```markdown
**Numerische Lösung (mit Luftwiderstand)**
- Luftwiderstand $\vec{F}_R = -\frac{1}{2} c_w \rho A \|\vec{v}\| \vec{v}$ wirkt antiparallel zur Bahn:
  $$F_{Rx} \propto -\sqrt{v_x^2 + v_y^2} \cdot v_x, \quad F_{Ry} \propto -\sqrt{v_x^2 + v_y^2} \cdot v_y$$
- Die nichtlineare Kopplung verhindert eine einfache geschlossene Stammfunktion.
- Lösung durch schrittweise numerische Integration von Position und Geschwindigkeit.
```

### 6.2 Kapitel 05 (Folien 47, 57): Disambiguierung der Kugelkoordinaten-Terminologie

#### Problemstellung
In `Folien/05_Visualisierung_3D_OpenGL/Folien.md` liegt ein Symbolkonflikt beim Winkel $\phi$ vor:
1. **Folie 47 (Klasse `Sphere`, Z. 1086):** Hier bezeichnet $\phi \in [0, \pi]$ den klassischen **Polarwinkel (Koladitude / Zenitwinkel)** vom Nordpol ($\phi = 0$) zum Südpol ($\phi = \pi$).
2. **Folie 57 (Orbit-Kamera, Z. 1334, 1370):** Hier bezeichnet $\phi \in [-89^\circ, +89^\circ]$ den **Elevationswinkel (geografische Breite)** bezogen auf die Äquatorebene ($0^\circ$ = Horizont, $+90^\circ$ = Zenit).

Beide Konventionen sind in ihren jeweiligen Fachdisziplinen üblich, erzeugen jedoch Verwirrung, wenn in derselben Vorlesung dasselbe Symbol $\phi$ einmal mit $\cos(\phi)$ als vertikaler Achse und einmal mit $\sin(\phi)$ als vertikaler Achse auftritt.

#### Harmonisierungs-Lösung
In Abschnitt 5.8 (Orbit-Kamera, Folien 1334, 1370, 1411, 1435) wird der Elevationswinkel präzise als $\theta_{\text{elev}}$ (bzw. $\varphi_{\text{elev}}$) notiert und eine didaktische Hinweisbox ergänzt:

```markdown
> [!NOTE]
> **Terminologie-Hinweis (Kugel- vs. Orbit-Koordinaten):**
> Bei der Geometrie-Triangulation (`Sphere`) bezeichnet $\phi \in [0, \pi]$ den **Polarwinkel** gemessen von der Polachse (Zenit).
> Bei der virtuellen Kamera bezeichnet $\theta_{\text{elev}} \in [-89^\circ, +89^\circ]$ den **Elevationswinkel** gemessen von der Äquatorebene. Es gilt: $\theta_{\text{elev}} = 90^\circ - \phi_{\text{polar}}$.
```

### 6.3 Kapitel 10 (Folie 48): Hinweisbox zur Zeitschrittgrenze bei Zero-Crossing

#### Problemstellung (Befund M8 aus Final-Audit)
Auf Folie 48 (`Folien/10_Dynamische_Modelle_Hybrid/Folien.md:1049`) wird das Kriterium für Vorzeichenwechsel $z(t_a) \cdot z(t_b) \le 0$ erläutert. Passieren zwei Nullstellen innerhalb desselben Zeitschritts $[t, t+\Delta t]$ (z. B. extrem schnelles Prellen oder kurzer Sensorimpuls), ist $z(t) \cdot z(t+\Delta t) > 0$. Das Ereignis wird vollständig übersehen.

#### Schlüsselfertige Hinweisbox für Folie 48
```markdown
> [!WARNING]
> **Abtasttheorem für Zero-Crossing-Events:**
> Das Vorzeichenwechsel-Kriterium $z(t_a) \cdot z(t_b) \le 0$ detektiert nur eine ungerade Anzahl von Nulldurchgängen. Zwei Ereignisse innerhalb von $\Delta t$ löschen sich gegenseitig aus!
> **Regel:** Die maximale Schrittweite $\Delta t$ des Solvers muss kleiner sein als das kürzeste physikalische Schaltintervall des Gesamtsystems: $\Delta t < \Delta t_{\text{event,min}}$.
```

---

## 7. Parallelitäts-, Abhängigkeits- & Schnittstellenanalyse

### 7.1 Autonomie gegenüber Stream B (Grafiken/Assets) und Stream D (Code)

Stream C befasst sich ausschließlich mit den mathematischen Gleichungen, typografischen Formelbegrenzern und didaktischen Erläuterungstexten in den Markdown-Folien.
- **Keine Abhängigkeit zu Stream B:** Stream B generiert PNG/SVG-Grafiken in Ordnern wie `Folien/02_.../Illustrationen` oder `Grafiken/`. Die in Stream C ergänzten Folien (27b FEM-Transformation, 52b ElasticTruss) nutzen reine Markdown-Tabellen, LaTeX-Formeln und Text bzw. C#-Fenced-Code-Blocks. Es werden keine neuen Bild-Assets benötigt.
- **Keine Abhängigkeit zu Stream D:** Stream D refaktoriert C#-Projekte im Root-Verzeichnis (z. B. WPF-Apps, Solution-Dateien). Die C#-Listings in Kapitel 07 sind didaktische Code-Snippets in den Folien.

### 7.2 Kollisionsfreie Synchronisation mit Stream A (Layout/Typografie)

Stream A überarbeitet globale Layouts, Spaltenbreiten (`two`, `three`, `five`) und Kopfzeilen.
- **Präventive Entkopplung:** Die Änderungen von Stream C sind auf klar abgegrenzte Zeilenbereiche fokussiert:
  - `Folien/01_Einführung/Folien.md`: Nur Zeile 437.
  - `Folien/05_Visualisierung_3D_OpenGL/Folien.md`: Nur Abschnitt 5.8 (OrbitCamera).
  - `Folien/07_Statische_Modelle/Folien.md`: Zeilen 439–480, Zeilen 780–840, Zeilen 856–970.
  - `Folien/10_Dynamische_Modelle_Hybrid/Folien.md`: Nur Folie 48.
- **Merge-Strategie:** Stream C kann entweder vor oder parallel zu Stream A committet werden. Da Stream C primär Inhalte von Formelblöcken modifiziert, treten keine Konflikte mit Layoutklassen auf.

### 7.3 Phasen- und Arbeitsablauf

```
[Start Stream C]
       │
       ├─► Meilenstein C.1: Display-Math-Korrektur (P0) ──► Kap. 07 (Folien 27, 41, 24, 26)
       │
       ├─► Meilenstein C.2: Notationsharmonisierung (P1) ──► Kap. 07 (3D-Fachwerk & LGS)
       │
       ├─► Meilenstein C.3: FEM-Transformation (P1) ───────► Kap. 07 (Neue Folie 27b)
       │
       ├─► Meilenstein C.4: Didaktik Abschnitt 7.5 (P1) ───► Kap. 07 (Folie 50, Neue Folie 52b)
       │
       └─► Meilenstein C.5: Mathematischer Feinschliff (P2) ─► Kap. 01, 05, 10
       │
[Validierung & Abnahme via Definition of Done]
       │
[Abschlussbericht an Hauptagenten]
```

---

## 8. Qualitätskriterien, Abnahme-Checkliste & Definition of Done

Für die erfolgreiche Abnahme von Stream C müssen alle Kriterien der folgenden Checkliste erfüllt sein:

| ID | Prüfpunkt | Kriterium | Prüfmethode | Status |
| :---: | :--- | :--- | :--- | :---: |
| **Q1** | **MathJax-Renderintegrität** | Keine mehrzeiligen `$ ... $`-Ausdrücke in Kapitel 07 mehr vorhanden. Alle Matrizen stehen in `$$ ... $$`. | Regex-Suche nach `\$[^$\n]*\n[^$]*\$` liefert 0 Treffer. | [ ] |
| **Q2** | **Formel-Syntax** | 100% balancierte Klammern `{}` und geschlossene Umgebungen `\begin{pmatrix} ... \end{pmatrix}`. | Automatisierter LaTeX-Check. | [ ] |
| **Q3** | **Notationskonsistenz 2D/3D** | In Kapitel 07 stehen alle Steifigkeitsmatrizen als $\mathbf{k}_{\text{Stab}}, \mathbf{K}, \mathbf{K}_{BB}, \mathbf{K}_{BA}$. Verschiebungen einheitlich als $\mathbf{u}$. Keine Pfeile $\vec{u}$ im LGS. | Volltextprüfung Kapitel 07. | [ ] |
| **Q4** | **FEM-Transformation** | Die Ergänzungsfolie $\mathbf{k}_e^{glob} = \mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}$ ist nach Folie 27 integriert und löst das Agenda-Versprechen von Folie 20 ein. | Sichtprüfung Folie 27b. | [ ] |
| **Q5** | **Didaktik Abschnitt 7.5** | Folie 50 trägt den Titel *„... für das ideale 2D-Fachwerk“*. Folie 52b stellt die elastische FEM-Erweiterung (`ElasticNode`, `ElasticRod`) vor. | Sichtprüfung Folien 50 & 52b. | [ ] |
| **Q6** | **Luftwiderstand Kap. 01** | Folie 22 formuliert den Luftwiderstand vektoriell mit euklidischer Norm $\|\vec{v}\| \vec{v}$ und begründet die Nichtlinearität. | Sichtprüfung Folie 22. | [ ] |
| **Q7** | **Kugelkoordinaten Kap. 05** | Der Elevationswinkel ist klar als $\theta_{\text{elev}}$ ausgewiesen; die Hinweisbox grenzt ihn gegen den Polarwinkel $\phi_{\text{polar}}$ ab. | Sichtprüfung Folie 57. | [ ] |
| **Q8** | **Zero-Crossing Kap. 10** | Folie 48 enthält die Warning-Box zum Abtastkriterium $\Delta t < \Delta t_{\text{event,min}}$. | Sichtprüfung Folie 48. | [ ] |
| **Q9** | **MARP-Kompilierung** | Alle modifizierten Foliensätze lassen sich ohne Warnungen oder Fehler mit dem MARP-Compiler rendern. | Testlauf `marp --preview`. | [ ] |

---
*Ende des Fachplans Stream C (Mathematik, Formeln & Notationsharmonisierung).*
