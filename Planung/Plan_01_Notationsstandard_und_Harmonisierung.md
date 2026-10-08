# Verbindlicher Notationsstandard & Harmonisierungsarchitektur
## Mathematisch-Physikalische Formel- und Variablennorm für das Gesamtcurriculum (Kapitel 00 bis 11)

**Dokument-ID:** `Planung/Plan_01_Notationsstandard_und_Harmonisierung.md`  
**Geltungsbereich:** Vorlesungsfolien (`Folien/*/Folien.md`), Begleitnotizen (`Folien/*/Notizen.md`), SVG-Diagramme, C#-Grafikgeneratoren und Programmierbeispiele  
**Normenbasis:** DIN 1304 (Formelzeichen), DIN 1338 (Formelschreibweise), ISO 80000-1 (Allgemeines), ISO 80000-2 (Mathematische Zeichen), DIN 5483 (Zeitabhängige Größen)  
**Datum:** 8. Oktober 2026  
**Autor:** Notationsstandard- & Harmonisierungs-Architekt (Planungsteam Hochschuldidaktik & Systemsimulation, FH Oberösterreich)  
**Status:** Normativ verbindlicher Referenzstandard (Freigegeben für Umsetzung & Revisionskontrolle)

---

## Inhaltsverzeichnis

1. [Präambel & Didaktische Zielsetzung](#1-präambel--didaktische-zielsetzung)
2. [Typografische Grundregeln nach ISO 80000-2 & DIN 1304](#2-typografische-grundregeln-nach-iso-80000-2--din-1304)
   - [2.1 Skalare und reelle Variablen](#21-skalare-und-reelle-variablen)
   - [2.2 Vektoren: Verbindliche Domänenteilung (Pfeil vs. Fett-Aufrecht)](#22-vektoren-verbindliche-domänenteilung-pfeil-vs-fett-aufrecht)
   - [2.3 Matrizen und Tensoren](#23-matrizen-und-tensoren)
   - [2.4 Physikalische Einheiten nach DIN 1304](#24-physikalische-einheiten-nach-din-1304)
   - [2.5 Nullvektoren, Einheitsmatrizen und Operatoren](#25-nullvektoren-einheitsmatrizen-und-operatoren)
   - [2.6 Indizes, Subskripte und Superskripte](#26-indizes-subskripte-und-superskripte)
   - [2.7 Mehrbuchstabige Bezeichner, Abkürzungen und Wortmarken](#27-mehrbuchstabige-bezeichner-abkürzungen-und-wortmarken)
3. [Kapitelübergreifende Harmonisierungstabelle](#3-kapitelübergreifende-harmonisierungstabelle)
   - [3.1 Zustandsraumdarstellung (Kapitel 04, 08, 10, 11)](#31-zustandsraumdarstellung-kapitel-04-08-10-11)
   - [3.2 Zero-Crossing & Ereigniserkennung (Kapitel 10, 11)](#32-zero-crossing--ereigniserkennung-kapitel-10-11)
   - [3.3 FEM-Gleichungssystem & Blockpartitionierung (Kapitel 07)](#33-fem-gleichungssystem--blockpartitionierung-kapitel-07)
   - [3.4 Phong-Beleuchtung & Schattierungsmodelle (Kapitel 05)](#34-phong-beleuchtung--schattierungsmodelle-kapitel-05)
   - [3.5 Warteschlangentheorie & Stochastische Prozesse (Kapitel 09)](#35-warteschlangentheorie--stochastische-prozesse-kapitel-09)
   - [3.6 Parallele Rechenmodelle & Skalierungsgesetze (Kapitel 06)](#36-parallele-rechenmodelle--skalierungsgesetze-kapitel-06)
   - [3.7 2D/3D-Grafiktransformation & Disambiguierung (Kapitel 02, 03, 05)](#37-2d3d-grafiktransformation--disambiguierung-kapitel-02-03-05)
4. [Umfassendes Symbol-Glossar pro Fachdomäne](#4-umfassendes-symbol-glossar-pro-fachdomäne)
   - [4.1 Mechanik, Kinematik & Aerodynamik](#41-mechanik-kinematik--aerodynamik)
   - [4.2 Thermodynamik, Wärmeleitung & Finite Differenzen (FDM)](#42-thermodynamik-wärmeleitung--finite-differenzen-fdm)
   - [4.3 Elektrotechnik, Mechatronik & Regelungstechnik](#43-elektrotechnik-mechatronik--regelungstechnik)
   - [4.4 Wahrscheinlichkeitsrechnung, Stochastik & Warteschlangen](#44-wahrscheinlichkeitsrechnung-stochastik--warteschlangen)
   - [4.5 Diskrete Ereignissimulation (DES) & Hybride Systeme](#45-diskrete-ereignissimulation-des--hybride-systeme)
5. [Disambiguierungs-Matrix für Mehrfachbelegungen](#5-disambiguierungs-matrix-für-mehrfachbelegungen)
6. [Autoren- und Dozenten-Leitfaden (Implementation Guide)](#6-autoren--und-dozenten-leitfaden-implementation-guide)
   - [6.1 Typografische Negativ-/Positiv-Beispiele (Don'ts vs. Do's)](#61-typografische-negativ-positiv-beispiele-donts-vs-dos)
   - [6.2 MARP-spezifische KaTeX/LaTeX-Syntax-Vorgaben](#62-marp-spezifische-katexlatex-syntax-vorgaben)
   - [6.3 Formelblock-Template für Foliensätze](#63-formelblock-template-für-foliensätze)
7. [Qualitätskriterien & Abnahme-Checkliste](#7-qualitätskriterien--abnahme-checkliste)

---

## 1. Präambel & Didaktische Zielsetzung

Die Lehrveranstaltungsreihe *Systemsimulation / Digitaler Zwilling* an der FH Oberösterreich schlägt eine anspruchsvolle Brücke zwischen ingenieurwissenschaftlicher Theorie (Technische Mechanik, Thermodynamik, Mechatronik, Höhere Numerik) und praxisnaher Softwarearchitektur (C#, OOP, WPF, Multithreading, DirectX/OpenGL).

Aus den Audits `Reviews/Audit_Variablen_01_Grundlagen.md`, `Reviews/Audit_Variablen_02_Visualisierung_Statik.md` und `Reviews/Audit_Variablen_03_Dynamik_Epilog.md` geht hervor, dass curriculare Brüche und uneinheitliche Notationen zu signifikanter kognitiver Überlastung bei den Studierenden führen:
1. **Unklare Dimensionen und fehlende SI-Einheiten:** Formeln ohne Einheitenangaben erschweren die Plausibilitätskontrolle und verführen zu Implementierungsfehlern (z.B. Grad vs. Bogenmaß, Sekunden vs. Millisekunden, Meter vs. Pixel).
2. **Notationskonflikte zwischen Kapiteln:** Die uneinheitliche Bezeichnung von Freiheitsgraden in der Statik ($f/p$ vs. $B/A$), wechselnde Symbole für Zero-Crossings ($z(\mathbf{x})$ vs. $g(x)$) oder das Verwenden von C#-Variablennamen (`material_a`) in analytischen Formeln untergraben das wissenschaftliche Profil.
3. **Magersatz vs. Vektor-/Matrixschreibweise:** Das Verschwimmen von Skalaren, Vektoren und Matrizen (z.B. $A \cdot x = b$ statt $\mathbf{A}\mathbf{x} = \mathbf{b}$) verhindert das intuitive Erfassen von Vektorräumen und Matrixdimensionen.

Das vorliegende Dokument setzt den **verbindlichen, universellen Notationsstandard** fest. Alle Autorinnen, Autoren, Vortragenden und Code-Entwickler des Moduls sind verpflichtet, ihre Unterlagen nach diesen Maßgaben auszurichten.

---

## 2. Typografische Grundregeln nach ISO 80000-2 & DIN 1304

### 2.1 Skalare und reelle Variablen
- **Regel:** Alle skalaren Variablen, Parameter, Koordinaten und zeitabhängigen Funktionen werden **kursiv (italic), mager** gesetzt.
- **Gültige Zeichen:** Lateinische und griechische Klein- und Großbuchstaben:
  $$t, m, c, k, x, y, z, r, h, \alpha, \beta, \gamma, \theta, \phi, \omega, \lambda, \mu, \rho, \sigma, \tau, E, I, T, Q$$
- **Mathematische Konstanten:**
  Naturmathematische Konstanten werden strikt **aufrecht (roman)** gesetzt:
  - Eulersche Zahl: $\mathrm{e} \approx 2{,}71828$ (nicht *e*)
  - Kreiszahl: $\pi \approx 3{,}14159$ (im KaTeX-Schriftsatz als `\pi` akzeptiert)
  - Imaginäre Einheit: $\mathrm{i}$ bzw. $\mathrm{j}$ mit $\mathrm{i}^2 = -1$ (aufrecht)

### 2.2 Vektoren: Verbindliche Domänenteilung (Pfeil vs. Fett-Aufrecht)

Im Curriculum treffen zwei disziplinäre Notationskulturen aufeinander: die *Technische Mechanik / Geometrische 2D/3D-Computergrafik* (traditionell Vektorpfeile) und die *Höhere Systemtheorie / FEM / Numerische Lineare Algebra* (traditionell fett-aufrechte Vektoren). 

Zur Gewährleistung maximaler Klarheit gilt folgende **verbindliche Domänenteilung**:

| Domäne / Kontext | Schreibweise | Syntax (LaTeX) | Beispiele | Begründung & Geltungsbereich |
| :--- | :---: | :---: | :--- | :--- |
| **Geometrische Vektoren (2D & 3D)** | **Pfeilnotation** | `\vec{v}` | $\vec{r}, \vec{p}, \vec{v}, \vec{a}, \vec{F}, \vec{M}, \vec{n}, \vec{l}, \vec{e}$ | Euklidischer Anschauungsraum $\mathbb{R}^2$ und $\mathbb{R}^3$. Gilt ausnahmslos in **Kapitel 01, 02, 03, 05** sowie bei statischen Gleichgewichten in **Kapitel 07** (Abschnitt 7.1 & 7.4). |
| **Einheitsvektoren (2D & 3D)** | **Pfeil mit Basis** | `\vec{e}_x`, `\vec{e}_u` | $\vec{e}_x, \vec{e}_y, \vec{e}_z, \vec{e}_u, \vec{e}_u^\perp, \vec{n}, \vec{l}, \vec{v}, \vec{r}$ | Richtungsvektoren mit $\|\vec{e}\| = 1$. Richtungsnormierung muss stets explizit angegeben sein. |
| **Zustands- & Systemvektoren** | **Fett aufrecht** | `\mathbf{x}` | $\mathbf{x}, \mathbf{u}, \mathbf{y}, \mathbf{z}, \mathbf{w}, \mathbf{f}$ | Beliebig-dimensionale Zustandsräume $\mathbf{x} \in \mathbb{R}^n$, Eingänge $\mathbf{u} \in \mathbb{R}^m$, Ausgänge $\mathbf{y} \in \mathbb{R}^p$. Gilt in **Kapitel 04, 08, 10, 11**. |
| **FEM-Verschiebungen & Kräfte** | **Fett aufrecht** | `\mathbf{u}`, `\mathbf{f}` | $\mathbf{u}, \mathbf{f}, \mathbf{u}_e, \mathbf{f}_e, \mathbf{u}_f, \mathbf{u}_p, \mathbf{f}_f, \mathbf{f}_p$ | Diskrete Systemknotenvektoren der Dimension $\mathbb{R}^{2k}$ bzw. $\mathbb{R}^{3k}$. Gilt in **Kapitel 07** (Abschnitt 7.2, 7.3, 7.5). |
| **Runge-Kutta-Stufensteigungen** | **Fett aufrecht** | `\mathbf{k}_i` | $\mathbf{k}_1, \mathbf{k}_2, \mathbf{k}_3, \mathbf{k}_4 \in \mathbb{R}^n$ | Steigungsvektoren der numerischen Integratoren in **Kapitel 08**. |

> [!IMPORTANT]
> **Strikte Trennungsregel:**
> - Innerhalb einer mathematischen Herleitung darf **niemals** unbegründet zwischen Pfeilnotation und Fettnotation gewechselt werden.
> - Wenn in der Statik (Kapitel 07) von der geometrischen Knotengleichung $\sum \vec{F}_i = \vec{0}$ zur globalen Matrixgleichung übergegangen wird, ist der Übergang explizit zu moderieren: *"Zusammenfassung aller Knotenverschiebungen $\vec{u}_i$ zum globalen Verschiebungsvektor $\mathbf{u} \in \mathbb{R}^{N_{\text{DOF}}}$"*.

### 2.3 Matrizen und Tensoren
- **Regel:** Matrizen und Tensoren zweiter Stufe werden **ausnahmslos fett und aufrecht (bold roman)** gesetzt.
- **Magersatz ist strikt untersagt:** Formeln wie $A x = b$ oder $T \cdot x$ sind fehlerhaft und müssen durch $\mathbf{A}\mathbf{x} = \mathbf{b}$ bzw. $\mathbf{T}\mathbf{x}$ ersetzt werden.
- **Standardbezeichner:**
  $$\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D}, \mathbf{J}, \mathbf{K}, \mathbf{M}, \mathbf{T}, \mathbf{R}, \mathbf{L}, \mathbf{H}, \mathbf{W}$$
- **Vektorräume & Dimensionen:** Bei jeder Einführung einer Matrix ist deren Raum explizit anzugeben:
  $$\mathbf{A} \in \mathbb{R}^{n \times n}, \quad \mathbf{B} \in \mathbb{R}^{n \times m}, \quad \mathbf{K}_{ff} \in \mathbb{R}^{n_f \times n_f}$$

### 2.4 Physikalische Einheiten nach DIN 1304
- **Regel:** Physikalische Einheiten werden stets **aufrecht (roman)** gesetzt und niemals kursiv.
- **Trennung vom Zahlenwert:** Zwischen Zahlenwert und Einheit steht ein schmales, geschütztes Spatium (`\,` in LaTeX):
  - Richtig: $g = 9{,}81\,\mathrm{m/s^2}$, $\rho = 1{,}204\,\mathrm{kg/m^3}$, $T = 293{,}15\,\mathrm{K}$
  - Falsch: $g = 9.81 m/s^2$, $g = 9,81 m/s^2$, $\rho = 1,2 kg/m^3$
- **Klammerkonvention bei Größendefinitionen:**
  - Im beschreibenden Text oder in Legenden steht die Einheit in eckigen Klammern:
    - $t$: Zeit $[\mathrm{s}]$
    - $v$: Geschwindigkeit $[\mathrm{m/s}]$
    - $E$: Elastizitätsmodul $[\mathrm{N/m^2}]$ bzw. $[\mathrm{Pa}]$
    - $c_w$: Widerstandsbeiwert $[-]$ (dimensionslos)
  - **Streng verboten nach DIN 1313:** Mathematische Brüche mit Einheiten in Klammern der Form $v \, [\mathrm{m/s}] = s \, [\mathrm{m}] / t \, [\mathrm{s}]$ dürfen in Rechenausdrücken nicht vorkommen.
- **Zusammengesetzte Einheiten:**
  Multiplikationen von Einheiten werden durch einen zentrierten Multiplikationspunkt (`\cdot`) getrennt:
  - Richtig: $[\mathrm{N\cdot m}]$, $[\mathrm{N\cdot s/m}]$, $[\mathrm{W/(m\cdot K)}]$
  - Falsch: $[\mathrm{Nm}]$, $[\mathrm{Nsm}]$, $[\mathrm{W/mK}]$

### 2.5 Nullvektoren, Einheitsmatrizen und Operatoren
- **Nullvektoren:**
  Vektornullen dürfen nicht als skalare $0$ gesetzt werden:
  - Im 2D/3D-Raum: $\vec{0} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$ (`\vec{0}`)
  - Im $n$-dimensionalen Zustandsraum: $\mathbf{0} \in \mathbb{R}^n$ (`\mathbf{0}`)
  - Beispiel Gleichgewichtsbedingung: $\sum \vec{F}_i = \vec{0}$ (nicht $= 0$)
  - Beispiel Zustandsraum-Ruhelage: $\mathbf{f}(\mathbf{x}^*, \mathbf{u}^*) = \mathbf{0}$
- **Einheitsmatrix:**
  - $\mathbf{I}$ (`\mathbf{I}`) oder $\mathbf{I}_n \in \mathbb{R}^{n \times n}$ (international standardisiert) bzw. $\mathbf{E}_n$.
- **Transposition:**
  - Aufrechtes hochgestelltes $\mathsf{T}$ oder $T$: $\mathbf{A}^T$, $\mathbf{x}^T$, $\mathbf{T}^T$.
- **Invertierung:**
  - $\mathbf{A}^{-1}$.
- **Differentialoperatoren:**
  - Totales Differential: $\mathrm{d}t$, $\mathrm{d}x$ mit aufrechtem $\mathrm{d}$ (`\mathrm{d}t`).
  - Zeitableitung: Für zeitliche Ableitungen im Zustandsraum ist die Newtonsche Punktnotation verbindlich: $\dot{x} = \frac{\mathrm{d}x}{\mathrm{d}t}$, $\ddot{x} = \frac{\mathrm{d}^2x}{\mathrm{d}t^2}$, $\dot{\mathbf{x}} \in \mathbb{R}^n$.
  - Partielle Ableitung: $\frac{\partial T}{\partial t}$, $\frac{\partial^2 T}{\partial x^2}$ (`\partial`).
  - Nabla- und Laplace-Operator: $\nabla T$ (Gradient), $\Delta T = \nabla^2 T = \frac{\partial^2 T}{\partial x^2} + \frac{\partial^2 T}{\partial y^2}$ (Laplace).

### 2.6 Indizes, Subskripte und Superskripte
- **Regel zur Kursiv-/Aufrechtschreibung von Indizes:**
  1. **Kursiv:** Wenn der Index eine mathematische Variable, eine Koordinatenachse oder eine Laufvariable darstellt:
     - $x_i, y_j, a_k$ ($i, j, k$: Laufvariablen)
     - $F_x, F_y, F_z$ ($x, y, z$: Raumachsen)
     - $T_i^n$ ($i$: Gitterknoten, $n$: Zeitschritt)
  2. **Aufrecht:** Wenn der Index ein Wort, eine Abkürzung, ein Namenskürzel oder ein feststehendes Attribut darstellt:
     - $F_{\text{ext}}$ (extern), $F_{\text{Feder}}$ (Feder), $F_{\text{Dämpfer}}$ (Dämpfer)
     - $t_{\text{start}}, t_{\text{end}}, t_{\text{max}}$
     - $E_{\text{kin}}, E_{\text{pot}}$ (kinetisch, potenziell)
     - $\mathbf{K}_{\text{Stab}}, \mathbf{k}_e^{\text{glob}}, \mathbf{k}_e^{\text{loc}}$
     - $u_{\text{raw}}, u_{\max}, u_{\min}$
     - $\Delta w_{\text{bin}}$ (Bin-Breite)

### 2.7 Mehrbuchstabige Bezeichner, Abkürzungen und Wortmarken
- **Regel:** Wörter oder Abkürzungen mit mehr als einem Buchstaben dürfen im Formelsatz niemals einfach getippt werden (z.B. `$IQR$` rendert als Produkt $I \cdot Q \cdot R$). Sie müssen verbindlich in `\text{...}` oder `\mathrm{...}` gefasst werden.
- **Standardisierte mehrbuchstabige Größen:**
  - Interquartilsabstand: $\text{IQR} = Q_{75} - Q_{25}$
  - Tool Center Point: $\mathbf{T}_{\text{TCP}}$
  - World / Model / View / Projection: $\mathbf{M}_{\text{world}}, \mathbf{M}_{\text{view}}, \mathbf{M}_{\text{proj}}$
  - Standardoperatoren: `\min`, `\max`, `\det`, `\ln`, `\exp`, `\sin`, `\cos`, `\tan`, `\operatorname{diag}`, `\operatorname{sgn}`

---

## 3. Kapitelübergreifende Harmonisierungstabelle

Die nachfolgende Tabelle löst sämtliche in den drei Review-Audits identifizierten Notationsbrüche verbindlich auf:

```
+----------------------------------------------------------------------------------------------------+
|                                    CURRICULARE HARMONISIERUNG                                      |
+------------------------------+-------------------------------+-------------------------------------+
| Domäne / Konzept             | Alte / Divergente Notation    | Verbindliche Harmonisierte Form     |
+------------------------------+-------------------------------+-------------------------------------+
| Zustandsraum (Kap 08, 10, 11)| $\dot{x} = f(x, u, t)$        | $\dot{\mathbf{x}}(t) =              |
|                              | $A \cdot x = b$ (Magersatz)   |   \mathbf{f}(t,\mathbf{x},\mathbf{u})|
|                              | Dimensionen unklar            | $\mathbf{y}(t) =                    |
|                              |                               |   \mathbf{g}(t,\mathbf{x},\mathbf{u})|
|                              |                               | $\dot{\mathbf{x}} =                 |
|                              |                               |   \mathbf{A}\mathbf{x} +            |
|                              |                               |   \mathbf{B}\mathbf{u}$             |
|                              |                               | $\mathbf{y} =                       |
|                              |                               |   \mathbf{C}\mathbf{x} +            |
|                              |                               |   \mathbf{D}\mathbf{u}$             |
|                              |                               | mit $\mathbf{x} \in \mathbb{R}^n$,  |
|                              |                               | $\mathbf{u} \in \mathbb{R}^m$,      |
|                              |                               | $\mathbf{y} \in \mathbb{R}^p$       |
+------------------------------+-------------------------------+-------------------------------------+
| Zero-Crossing (Kap 10, 11)   | $z(\mathbf{x}) = 0$ (Kap 10)  | Verbindlich: $z(\mathbf{x}) = 0$     |
|                              | $g(x) = 0$ (Kap 11)           | bzw. $z(t, \mathbf{x}, \mathbf{u})=0|
|                              | Kollision mit Ausgangsgleich. | Toleranzen: $\varepsilon_z$,        |
|                              | und Erdbeschleunigung $g$     |             $\varepsilon_t$         |
+------------------------------+-------------------------------+-------------------------------------+
| FEM-Partitionierung (Kap 07) | Folie 555: $\mathbf{K}_{ff}$  | Primärstandard:                     |
|                              | Folie 902: $\mathbf{K}_{BB}$  | $\mathbf{K}_{ff} \mathbf{u}_f =     |
|                              | Keine Äquivalenzerklärung     |   \mathbf{f}_f -                    |
|                              |                               |   \mathbf{K}_{fp} \mathbf{u}_p      |
|                              |                               | Didaktische Brücke:                 |
|                              |                               | $f \equiv B$ (frei/beweglich)       |
|                              |                               | $p \equiv A$ (fest/Auflager)        |
+------------------------------+-------------------------------+-------------------------------------+
| Phong-Beleuchtung (Kap 05)   | Code-Fragmente im Matheblock: | $I = I_a + I_d + I_s$               |
|                              | `material_a * light_a`,       | $I_a = k_a I_{L,a}$                 |
|                              | fehlende Einheitsvektoren,    | $I_d = k_d I_{L,d}(\vec{n}\cdot     |
|                              | $\vec{n} \propto (\dots)$     |        \vec{l})$                    |
|                              |                               | $I_s = k_s I_{L,s}(\vec{v}\cdot     |
|                              |                               |        \vec{r})^{\alpha_{\text{sh}}}|
|                              |                               | $\|\vec{n}\|=\|\vec{l}\|=\dots=1$   |
+------------------------------+-------------------------------+-------------------------------------+
| Warteschlangen (Kap 09)      | $M/M/1$ ohne Definition       | Ankunftsrate: $\lambda [\mathrm{1/s}]|
|                              | Keine Bedienrate $\mu$        | Bedienrate: $\mu [\mathrm{1/s}]$    |
|                              | Auslastung $\rho$ fehlt       | Auslastung: $\rho = \lambda/\mu$    |
|                              | Little nur partiell           | Little: $L = \lambda W$,            |
|                              |                               |         $L_q = \lambda W_q$         |
+------------------------------+-------------------------------+-------------------------------------+
| Multithreading (Kap 06)      | Rein deskriptiv,              | Speedup: $S(p) = T_1/T_p$           |
|                              | keine mathematischen Modelle  | Effizienz: $E(p) = S(p)/p$          |
|                              |                               | Amdahl: $S(p) = \frac{1}{(1-s)+s/p}$|
|                              |                               | Gustafson: $S(p)=p-\alpha(p-1)$     |
+------------------------------+-------------------------------+-------------------------------------+
| Luftwiderstand (Kap 01)      | $\vec{F}_R = -c v^2$ skalar   | $\vec{F}_R = -\frac{1}{2} c_w \rho  |
|                              | oder ohne Vektornorm          |   A \|\vec{v}\| \vec{v}$            |
+------------------------------+-------------------------------+-------------------------------------+
```

---

### 3.1 Zustandsraumdarstellung (Kapitel 04, 08, 10, 11)

In der Systemtheorie und dynamischen Simulation bildet die Zustandsraumdarstellung das universelle Fundament. Alle Kapitel nutzen ab sofort dieselbe formale Struktur:

#### Allgemeine nichtlineare Zustandsraumdarstellung (MIMO)
$$\begin{aligned}
\dot{\mathbf{x}}(t) &= \mathbf{f}(t, \mathbf{x}(t), \mathbf{u}(t)), \quad \mathbf{x}(t_0) = \mathbf{x}_0 \\
\mathbf{y}(t) &= \mathbf{g}(t, \mathbf{x}(t), \mathbf{u}(t))
\end{aligned}$$

#### Lineare zeitinvariante Zustandsraumdarstellung (LTI-Systeme)
$$\begin{aligned}
\dot{\mathbf{x}}(t) &= \mathbf{A}\mathbf{x}(t) + \mathbf{B}\mathbf{u}(t) \\
\mathbf{y}(t) &= \mathbf{C}\mathbf{x}(t) + \mathbf{D}\mathbf{u}(t)
\end{aligned}$$

#### Dimensionen & Vektorräume
- $\mathbf{x}(t) \in \mathbb{R}^n$: Zustandsvektor ($n$ Energiespeicher / innere Freiheitsgrade)
- $\dot{\mathbf{x}}(t) = \frac{\mathrm{d}\mathbf{x}}{\mathrm{d}t} \in \mathbb{R}^n$: Vektor der Zustandsableitungen (Geschwindigkeiten, Flussgrößen)
- $\mathbf{u}(t) \in \mathbb{R}^m$: Eingangs- / Steuer- / Stellvektor ($m$ äußere Anregungen)
- $\mathbf{y}(t) \in \mathbb{R}^p$: Ausgangs- / Messvektor ($p$ beobachtbare Systemausgänge)
- $\mathbf{A} \in \mathbb{R}^{n \times n}$: Systemmatrix (beschreibt die Eigendynamik des Systems)
- $\mathbf{B} \in \mathbb{R}^{n \times m}$: Eingangsmatrix (Kopplung der Aktoren auf die Zustände)
- $\mathbf{C} \in \mathbb{R}^{p \times n}$: Ausgangs- bzw. Beobachtungsmatrix (Sensormodell)
- $\mathbf{D} \in \mathbb{R}^{p \times m}$: Durchgriffsmatrix (direkte Kopplung von Eingang auf Ausgang)

---

### 3.2 Zero-Crossing & Ereigniserkennung (Kapitel 10, 11)

In hybriden dynamischen Systemen (kontinuierliche Trajektorien mit diskreten Zustandswechseln) müssen Schaltpunkte exakt über Nullstellensuche lokalisiert werden.

#### Standard-Ereignisfunktion
Das Schaltereignis wird verbindlich über die skalarwertige Zero-Crossing-Funktion $z(\mathbf{x})$ bzw. $z(t, \mathbf{x}, \mathbf{u})$ deklariert:
$$z(t, \mathbf{x}(t), \mathbf{u}(t)) = 0$$

> [!CAUTION]
> Das Symbol $g(x)$ darf in Kapitel 11 **nicht mehr** für Zero-Crossings verwendet werden! $g$ ist im gesamten Curriculum für die Erdbeschleunigung ($g = 9{,}81\,\mathrm{m/s^2}$) und für die Ausgangsgleichung $\mathbf{g}(\cdot)$ reserviert.

#### Ereignis-Kriterien & Lokalisierung
- **Vorzeichenwechsel-Bedingung im Zeitschritt $[t_k, t_k + h]$:**
  $$z(\mathbf{x}(t_k)) \cdot z(\mathbf{x}(t_k + h)) \le 0$$
- **Schaltbedingung / Guard:**
  $$\gamma(t, \mathbf{x}) \equiv [z(\mathbf{x}) \le 0]$$
- **Numerische Abbruchkriterien (Toleranzen):**
  - Wertetoleranz: $|z(\mathbf{x}(t^*))| \le \varepsilon_z$ mit $\varepsilon_z > 0$ (z.B. $10^{-6}\,\mathrm{m}$)
  - Zeittoleranz: $|t_{\text{right}} - t_{\text{left}}| \le \varepsilon_t$ mit $\varepsilon_t > 0$ (z.B. $10^{-8}\,\mathrm{s}$)
- **Diskreter Zustandsübergang (State Transition & Reset-Map):**
  $$\mathbf{x}(t^{*+}) = \mathbf{r}(t^*, \mathbf{x}(t^{*-}), \mathbf{u}(t^*))$$
  - $\mathbf{x}(t^{*-})$: Systemzustand unmittelbar vor dem Stoß / Ereignis
  - $\mathbf{x}(t^{*+})$: Systemzustand unmittelbar nach dem Stoß / Ereignis
  - $\mathbf{r}(\cdot)$: Sprungfunktion (Reset-Map), z.B. elastischer Stoß $\dot{y}^+ = -\varepsilon_{\text{restit}} \dot{y}^-$ mit Restitutionskoeffizient $\varepsilon_{\text{restit}} \in [0, 1]$.

---

### 3.3 FEM-Gleichungssystem & Blockpartitionierung (Kapitel 07)

Das FEM-Gleichungssystem für statische elastische Fachwerke lautet global:
$$\mathbf{K}\mathbf{u} = \mathbf{f}$$
mit Gesamtsteifigkeitsmatrix $\mathbf{K} \in \mathbb{R}^{N_{\text{DOF}} \times N_{\text{DOF}}}$, Knotenverschiebungsvektor $\mathbf{u} \in \mathbb{R}^{N_{\text{DOF}}}$ und Lastvektor $\mathbf{f} \in \mathbb{R}^{N_{\text{DOF}}}$.

#### Harmonisierung der Blockpartitionierung
Zur Berücksichtigung der kinematischen Randbedingungen (Lager) wird das System in freie ($f$) und vorgeschriebene ($p$) Freiheitsgrade unterteilt.

**Internationale Standardform (Primärnotation):**
$$\begin{pmatrix} \mathbf{K}_{ff} & \mathbf{K}_{fp} \\ \mathbf{K}_{pf} & \mathbf{K}_{pp} \end{pmatrix} \begin{pmatrix} \mathbf{u}_f \\ \mathbf{u}_p \end{pmatrix} = \begin{pmatrix} \mathbf{f}_f \\ \mathbf{f}_p \end{pmatrix}$$

**Didaktisches Brücken-Mapping:**
In deutschsprachiger Mechanik-Literatur werden die Indizes $B$ (*beweglich*) und $A$ (*Auflager*) verwendet. Folgende Äquivalenz ist auf Folie 902 explizit anzugeben:
$$\text{Index } f \equiv B \quad (\text{freie / bewegliche DOFs}), \qquad \text{Index } p \equiv A \quad (\text{vorgegebene Auflager-DOFs})$$

$$\mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f - \mathbf{K}_{fp} \mathbf{u}_p \quad \iff \quad \mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B - \mathbf{K}_{BA} \mathbf{u}_A$$

#### Spezialfälle & Lösungsverfahren
1. **Starre Auflager ohne Senkung:**
   $$\mathbf{u}_p = \mathbf{0} \quad \implies \quad \mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f$$
2. **Reaktionskraft-Berechnung an den Auflagern:**
   $$\mathbf{f}_p = \mathbf{K}_{pf} \mathbf{u}_f + \mathbf{K}_{pp} \mathbf{u}_p$$
3. **Cholesky-Zerlegung:**
   Da $\mathbf{K}_{ff}$ symmetrisch und positiv definit (SPD) ist ($\mathbf{x}^T \mathbf{K}_{ff} \mathbf{x} > 0 \;\forall \mathbf{x} \neq \mathbf{0}$), existiert eine eindeutige untere Dreiecksmatrix $\mathbf{L} \in \mathbb{R}^{n_f \times n_f}$ mit Diagonalelementen $L_{ii} > 0$:
   $$\mathbf{K}_{ff} = \mathbf{L}\mathbf{L}^T$$

#### Stabsteifigkeit & Elementmatrizen
- Axiale Stabfedersteifigkeit: $k_{\text{Stab}} = \frac{EA}{L_0} \quad [\mathrm{N/m}]$  
  *(Zur strikten Unterscheidung von der Gesamtanzahl der Knoten $k \in \mathbb{N}$)*
- 2D-Elementsteifigkeitsmatrix ($4 \times 4$):
  $$\mathbf{k}_e = k_{\text{Stab}} \begin{pmatrix} \vec{e}\vec{e}^T & -\vec{e}\vec{e}^T \\ -\vec{e}\vec{e}^T & \vec{e}\vec{e}^T \end{pmatrix}, \quad \vec{e} = \begin{pmatrix} c_x \\ c_y \end{pmatrix}, \quad c_x^2 + c_y^2 = 1$$
- 3D-Elementsteifigkeitsmatrix ($6 \times 6$):
  $$\mathbf{k}_e = k_{\text{Stab}} \begin{pmatrix} \mathbf{d}\mathbf{d}^T & -\mathbf{d}\mathbf{d}^T \\ -\mathbf{d}\mathbf{d}^T & \mathbf{d}\mathbf{d}^T \end{pmatrix}, \quad \mathbf{d} = \begin{pmatrix} c_x \\ c_y \\ c_z \end{pmatrix}, \quad c_x^2 + c_y^2 + c_z^2 = 1$$

---

### 3.4 Phong-Beleuchtung & Schattierungsmodelle (Kapitel 05)

Die optische Intensität $I$ (bzw. RGB-Farbvektor $\vec{I}_{\text{RGB}}$) an einem Oberflächenpunkt setzt sich aus ambientem ($a$), diffusem ($d$) und spekularem ($s$) Anteil zusammen:

$$I = I_a + I_d + I_s$$

#### Exakte mathematische Formulierung
$$\begin{aligned}
I_a &= k_a \cdot I_{L,a} \\
I_d &= k_d \cdot I_{L,d} \cdot \max(0, \vec{n} \cdot \vec{l}) \\
I_s &= k_s \cdot I_{L,s} \cdot \max(0, \vec{v} \cdot \vec{r})^{\alpha_{\text{shiny}}}
\end{aligned}$$

#### Parameter & Vektornormierung
- $k_a \in [0, 1]$: Ambienter Reflexionskoeffizient des Materials $[-]$
- $k_d \in [0, 1]$: Diffuser Reflexionskoeffizient (Lambertsches Gesetz) $[-]$
- $k_s \in [0, 1]$: Spekularer Reflexionskoeffizient (Glanzlicht) $[-]$
- $\alpha_{\text{shiny}} \ge 1$: Glanzexponent / Shininess $[-]$ (z.B. matt: $5$, hochglänzend: $128$)
- $I_{L,a}, I_{L,d}, I_{L,s}$: Lichtquellenintensitäten für die drei Farbkanäle
- **Zwingende Einheitsvektor-Bedingung:**
  $$\|\vec{n}\| = \|\vec{l}\| = \|\vec{v}\| = \|\vec{r}\| = 1$$
  - $\vec{n}$: Normaleneinheitsvektor der Oberfläche an der Fragmentposition
  - $\vec{l}$: Einheitsvektor vom Fragment zur Lichtquelle: $\vec{l} = \frac{\vec{P}_{\text{Light}} - \vec{P}_{\text{Frag}}}{\|\vec{P}_{\text{Light}} - \vec{P}_{\text{Frag}}\|}$
  - $\vec{v}$: Einheitsvektor vom Fragment zur Kamera (Viewer): $\vec{v} = \frac{\vec{P}_{\text{Cam}} - \vec{P}_{\text{Frag}}}{\|\vec{P}_{\text{Cam}} - \vec{P}_{\text{Frag}}\|}$
  - $\vec{r}$: Exakter Reflexions-Einheitsvektor: $\vec{r} = 2(\vec{n} \cdot \vec{l})\vec{n} - \vec{l}$

---

### 3.5 Warteschlangentheorie & Stochastische Prozesse (Kapitel 09)

#### Kendall-Notation: $A / S / c / K / m / Z$
- Standardmodell im Kurs: $M / M / 1$ (Markov-Ankünfte / Markov-Bedienzeiten / 1 Server)

#### Raten, Zeiten und Kennzahlen
- $\lambda \in \mathbb{R}^+$: Ankunftsrate (mittlere Anzahl eintreffender Entitäten pro Zeiteinheit) $[\mathrm{s^{-1}}]$
- $\mu \in \mathbb{R}^+$: Bedienrate (mittlere Anzahl abgefertigter Entitäten pro Zeiteinheit) $[\mathrm{s^{-1}}]$
- $E[T_A] = \frac{1}{\lambda}$: Mittlere Interankunftszeit $[\mathrm{s}]$
- $E[T_S] = \frac{1}{\mu}$: Mittlere Bedienzeit $[\mathrm{s}]$
- $\rho = \frac{\lambda}{\mu}$: Verkehrsdichte / Systemauslastung $[-]$  
  - **Stabilitätsbedingung:** $\rho < 1$ (für $\rho \ge 1$ wächst die Schlange über alle Grenzen).
  - Mehrbediener-System ($c$ Server): $\rho = \frac{\lambda}{c \mu} < 1$.

#### Littles Gesetz (Fundamentaltheorem der Warteschlangentheorie)
$$\begin{aligned}
L &= \lambda \cdot W \quad (\text{Gesamtsystem}) \\
L_q &= \lambda \cdot W_q \quad (\text{Warteschlange})
\end{aligned}$$
- $L$: Mittlere Anzahl von Kunden im Gesamtsystem $[-]$
- $L_q$: Mittlere Anzahl von Kunden in der Warteschlange $[-]$
- $W$: Mittlere Verweilzeit im Gesamtsystem $[\mathrm{s}]$ ($W = W_q + E[T_S]$)
- $W_q$: Mittlere Wartezeit in der Schlange $[\mathrm{s}]$

#### Numerisch stabile Inversionsmethode (Exponentialverteilung)
Um die Polstelle $\ln(0) = -\infty$ bei Pseudozufallszahlen $U \in [0, 1)$ streng zu verhindern:
$$T = -\frac{1}{\lambda} \ln(1 - U) \quad \text{mit } U \in [0, 1) \implies (1 - U) \in (0, 1]$$

---

### 3.6 Parallele Rechenmodelle & Skalierungsgesetze (Kapitel 06)

Zur formalen Fundierung des Multithreadings gelten folgende Kennwerte und Gesetze:

#### Grundgrößen
- $p \in \mathbb{N}^+$: Anzahl der parallelen Rechenkerne / Worker-Threads $[-]$
- $T_1 \in \mathbb{R}^+$: Ausführungszeit der sequentiellen Referenzimplementierung auf einem Kern $[\mathrm{s}]$
- $T_p \in \mathbb{R}^+$: Ausführungszeit bei paralleler Ausführung auf $p$ Kernen $[\mathrm{s}]$
- $S(p) = \frac{T_1}{T_p}$: Speedup (Beschleunigungsfaktor) $[-]$ ($S(p) \ge 1$)
- $E(p) = \frac{S(p)}{p}$: Parallele Effizienz $[-]$ ($0 \le E(p) \le 1$ bzw. $0\,\% \dots 100\,\%$)

#### Amdahlsches Gesetz (Feste Gesamtwearbeit / Strong Scaling)
Sei $s \in [0, 1]$ der parallelisierbare Codeanteil und $(1-s)$ der streng sequentielle Anteil:
$$S_{\text{Amdahl}}(p) = \frac{1}{(1-s) + \frac{s}{p}} \quad \xrightarrow{p \to \infty} \quad S_{\max} = \frac{1}{1-s}$$

#### Gustafsonsches Gesetz (Skalierte Problemgröße / Weak Scaling)
Wächst das Datenvolumen proportional mit der Prozessoranzahl $p$:
$$S_{\text{Gustafson}}(p) = p - (1-s)(p - 1) = (1-s) + s \cdot p$$

---

### 3.7 2D/3D-Grafiktransformation & Disambiguierung (Kapitel 02, 03, 05)

#### Koordinatentransformation & Welt-zu-Bildschirm-Skalierung
- Weltkoordinaten: $(x_w, y_w) \in \mathbb{R}^2 \quad [\mathrm{m}]$
- Bildschirm- / Pixelkoordinaten: $(u, v) \in \mathbb{N}_0^2$ mit $u \in [0, W-1]$, $v \in [0, H-1] \quad [\mathrm{px}]$
- Skalierungsfaktor:
  $$s = \min(s_x, s_y) = \min\left(\frac{W - 2\cdot \text{margin}}{x_{\max} - x_{\min}}, \, \frac{H - 2\cdot \text{margin}}{y_{\max} - y_{\min}}\right) \quad \left[\frac{\mathrm{px}}{\mathrm{m}}\right]$$
  *(Die Dimension $[\mathrm{px/m}]$ muss stets genannt werden!)*

#### Disambiguierung der Kugel- und Kamerakoordinaten
In Kapitel 05 treten Kugelkoordinaten zur Orbit-Kamerasteuerung auf:
- Horizontaler Azimutwinkel: $\theta \in [0, 2\pi) \quad [\mathrm{rad}]$ (Rotation um die Hochachse / Pan)
- Vertikaler Elevationswinkel: $\phi_{\text{elev}} \in \left[-\frac{\pi}{2} + \varepsilon, \, \frac{\pi}{2} - \varepsilon\right] \quad [\mathrm{rad}]$ (Blickwinkel über/unter Horizont)
- Alternativ: Mathematischer Polarwinkel $\phi_{\text{polar}} \in [0, \pi] \quad [\mathrm{rad}]$ (gemessen vom Zenit zur Achse).
- **Vorgabe:** In den Vorlesungsfolien ist **ausschließlich** der Begriff **Elevationswinkel** $\phi_{\text{elev}}$ zu verwenden, um Singularitäten (Gimbal Lock bei $\cos(\phi) = 0$) anschaulich mit $\pm 89^\circ$ abfangen zu können.

---

## 4. Umfassendes Symbol-Glossar pro Fachdomäne

### 4.1 Mechanik, Kinematik & Aerodynamik

| Symbol | Raum / Typ | Bedeutung | SI-Einheit | Kapitel |
| :--- | :---: | :--- | :---: | :---: |
| $t$ | $\mathbb{R}$ | Zeit | $\mathrm{s}$ | alle |
| $\vec{r}, \vec{p}$ | $\mathbb{R}^2 / \mathbb{R}^3$ | Ortsvektor / Punktkoordinate | $\mathrm{m}$ | 01, 03, 05, 07 |
| $\vec{v}, \mathbf{v}$ | $\mathbb{R}^2 / \mathbb{R}^3$ | Geschwindigkeitsvektor | $\mathrm{m/s}$ | 01, 08, 10 |
| $v = \|\vec{v}\|$ | $\mathbb{R}^+_0$ | Skalare Bahngeschwindigkeit | $\mathrm{m/s}$ | 01, 08, 10 |
| $\vec{a}, \ddot{\vec{r}}$ | $\mathbb{R}^2 / \mathbb{R}^3$ | Beschleunigungsvektor | $\mathrm{m/s^2}$ | 01, 08, 10 |
| $g$ | $\mathbb{R}^+$ | Erdbeschleunigung ($9{,}80665 \approx 9{,}81$) | $\mathrm{m/s^2}$ | 01, 08, 10, 11 |
| $m$ | $\mathbb{R}^+$ | Masse des Körpers | $\mathrm{kg}$ | 01, 08, 10 |
| $J$ | $\mathbb{R}^+$ | Massenträgheitsmoment | $\mathrm{kg\cdot m^2}$ | 08 |
| $\vec{F}$ | $\mathbb{R}^2 / \mathbb{R}^3$ | Kraftvektor | $\mathrm{N}$ | 01, 07, 08, 10 |
| $\vec{F}_R$ | $\mathbb{R}^2 / \mathbb{R}^3$ | Aerodynamische Widerstandskraft | $\mathrm{N}$ | 01, 08 |
| $c_w$ | $\mathbb{R}^+$ | Aerodynamischer Widerstandsbeiwert (Drag Coeff.) | $-$ | 01, 08 |
| $\rho_{\text{air}}$ | $\mathbb{R}^+$ | Luftdichte (Standardatmosphäre: $1{,}204$) | $\mathrm{kg/m^3}$ | 01, 08 |
| $A_{\text{ref}}$ | $\mathbb{R}^+$ | Stirnfläche / Referenzquerschnitt | $\mathrm{m^2}$ | 01, 08 |
| $k, k_{\text{Stab}}$ | $\mathbb{R}^+$ | Federsteifigkeit (Stabfedersteifigkeit) | $\mathrm{N/m}$ | 07, 08, 10 |
| $d$ | $\mathbb{R}^+$ | Dämpfungskonstante (Viskose Dämpfung) | $\mathrm{N\cdot s/m}$ | 08, 10 |
| $\omega_0$ | $\mathbb{R}^+$ | Ungedämpfte Eigenkreisfrequenz ($\sqrt{k/m}$) | $\mathrm{rad/s}$ bzw. $\mathrm{s^{-1}}$ | 08 |
| $D$ | $\mathbb{R}^+_0$ | Lehr'sches Dämpfungsmaß ($\frac{d}{2\sqrt{km}}$) | $-$ | 08 |
| $S$ | $\mathbb{R}$ | Stabnormalkraft ($S>0$: Zug, $S<0$: Druck) | $\mathrm{N}$ | 07 |
| $E$ | $\mathbb{R}^+$ | Elastizitätsmodul (Young's Modulus) | $\mathrm{Pa}$ bzw. $\mathrm{N/m^2}$ | 07 |
| $A$ | $\mathbb{R}^+$ | Stabquerschnittsfläche | $\mathrm{m^2}$ | 07 |
| $L_0, L$ | $\mathbb{R}^+$ | Ausgangslänge / Momentane Stablänge | $\mathrm{m}$ | 07 |
| $\Delta L$ | $\mathbb{R}$ | Längenänderung ($L - L_0$) | $\mathrm{m}$ | 07 |
| $\varepsilon_{\text{restit}}$ | $[0, 1]$ | Stoßbeiwert / Restitutionskoeffizient | $-$ | 10 |

---

### 4.2 Thermodynamik, Wärmeleitung & Finite Differenzen (FDM)

| Symbol | Raum / Typ | Bedeutung | SI-Einheit | Kapitel |
| :--- | :---: | :--- | :---: | :---: |
| $T$ | $\mathbb{R}$ | Temperatur | $\mathrm{K}$ bzw. ${}^\circ\mathrm{C}$ | 02, 08 |
| $\Delta T, \dot{T}$ | $\mathbb{R}$ | Temperaturdifferenz / Zeitliche Änderungsrate | $\mathrm{K}$ bzw. $\mathrm{K/s}$ | 02, 08 |
| $\lambda_{\text{th}}$ | $\mathbb{R}^+$ | Wärmeleitfähigkeit des Materials | $\mathrm{W/(m\cdot K)}$ | 02 |
| $\rho_{\text{mass}}$ | $\mathbb{R}^+$ | Materialdichte | $\mathrm{kg/m^3}$ | 02 |
| $c_{\text{spec}}$ | $\mathbb{R}^+$ | Spezifische Wärmekapazität | $\mathrm{J/(kg\cdot K)}$ | 02 |
| $\alpha_{\text{diff}}$ | $\mathbb{R}^+$ | Temperaturleitfähigkeit ($\alpha = \frac{\lambda}{\rho \cdot c}$) | $\mathrm{m^2/s}$ | 02 |
| $Q$ | $\mathbb{R}$ | Thermischer Quellterm / Wärmeproduktionsrate | $\mathrm{K/s}$ bzw. $\mathrm{W/m^3}$ | 02 |
| $\Delta x, \Delta y$ | $\mathbb{R}^+$ | Gitterweite des Raumdiskretiersierungsgitters | $\mathrm{m}$ | 02 |
| $\Delta t, h$ | $\mathbb{R}^+$ | Zeitschrittweite der Simulation | $\mathrm{s}$ | 01, 02, 08, 10 |
| $r_{\text{diff}}$ | $\mathbb{R}^+$ | Diffusionszahl / CFL-Stabilitätskennzahl ($r = \frac{\alpha \Delta t}{\Delta x^2}$) | $-$ | 02 |
| $T_{i,j}^n$ | $\mathbb{R}$ | Temperatur am Gitterpunkt $(i, j)$ zum Zeitschritt $n$ | $\mathrm{K}$ | 02 |

---

### 4.3 Elektrotechnik, Mechatronik & Regelungstechnik

| Symbol | Raum / Typ | Bedeutung | SI-Einheit | Kapitel |
| :--- | :---: | :--- | :---: | :---: |
| $u(t), U$ | $\mathbb{R}$ | Elektrische Spannung | $\mathrm{V}$ | 08 |
| $i(t), I$ | $\mathbb{R}$ | Elektrischer Strom | $\mathrm{A}$ | 08 |
| $R$ | $\mathbb{R}^+$ | Ohmscher Widerstand | $\mathrm{\Omega}$ | 08 |
| $L_{\text{ind}}$ | $\mathbb{R}^+$ | Induktivität | $\mathrm{H}$ bzw. $\mathrm{V\cdot s/A}$ | 08 |
| $C$ | $\mathbb{R}^+$ | Elektrische Kapazität | $\mathrm{F}$ bzw. $\mathrm{A\cdot s/V}$ | 08 |
| $k_m$ | $\mathbb{R}^+$ | Motordrehmomentkonstante | $\mathrm{N\cdot m/A}$ | 08 |
| $k_e$ | $\mathbb{R}^+$ | Gegen-EMK-Konstante (Generatorische Spannungskonstante) | $\mathrm{V/(rad/s)}$ | 08 |
| $T_m$ | $\mathbb{R}^+$ | Elektromechanische Motorzeitkonstante | $\mathrm{s}$ | 08 |
| $K_m$ | $\mathbb{R}^+$ | Statische Motorkennziffer | $\mathrm{rad/(V\cdot s)}$ | 08 |
| $w(t)$ | $\mathbb{R}$ | Führungssollwert (Setpoint) | Skalenabhängig | 08 |
| $e(t)$ | $\mathbb{R}$ | Regelabweichung ($e(t) = w(t) - y(t)$) | Skalenabhängig | 08 |
| $K_p$ | $\mathbb{R}^+$ | Proportionalbeiwert des Reglers | $[\mathrm{u}] / [\mathrm{e}]$ | 08 |
| $K_i, T_n$ | $\mathbb{R}^+$ | Integrationsbeiwert ($K_i$) / Nachstellzeit ($T_n$) | $[\mathrm{u}] / ([\mathrm{e}]\cdot\mathrm{s})$ bzw. $\mathrm{s}$ | 08 |
| $K_d, T_v$ | $\mathbb{R}^+$ | Differenzierbeiwert ($K_d$) / Vorhaltzeit ($T_v$) | $([\mathrm{u}]\cdot\mathrm{s}) / [\mathrm{e}]$ bzw. $\mathrm{s}$ | 08 |
| $u_{\text{raw}}(t)$ | $\mathbb{R}$ | Ungesättigte Stellgröße vor dem Stellbegrenzer | $[\mathrm{u}]$ | 08 |
| $u_{\max}, u_{\min}$| $\mathbb{R}$ | Maximale und minimale Stellgrößengrenze (Sättigung) | $[\mathrm{u}]$ | 08 |
| $V_T$ | $\mathbb{R}^+$ | Temperaturspannung der Diode ($V_T = \frac{k_B T}{q} \approx 26\,\mathrm{mV}$) | $\mathrm{V}$ | 08 |
| $I_S$ | $\mathbb{R}^+$ | Sättigungssperrstrom der Diode | $\mathrm{A}$ | 08 |

---

### 4.4 Wahrscheinlichkeitsrechnung, Stochastik & Warteschlangen

| Symbol | Raum / Typ | Bedeutung | SI-Einheit | Kapitel |
| :--- | :---: | :--- | :---: | :---: |
| $X, T_A, T_S$| Zufallsvariable | Reelle stochastische Zufallsvariable | Skalenabhängig bzw. $\mathrm{s}$ | 04, 09 |
| $f(x)$ | $\mathbb{R}^+_0$ | Wahrscheinlichkeitsdichtefunktion (PDF) | $1 / [x]$ | 04, 09 |
| $F(x)$ | $[0, 1]$ | Kumulative Verteilungsfunktion (CDF, $P(X \le x)$) | $-$ | 04, 09 |
| $U$ | $[0, 1)$ | Standardgleichverteilte Pseudozufallsvariable | $-$ | 09 |
| $\mu_{\text{exp}}, E[X]$ | $\mathbb{R}$ | Erwartungswert / Verteilungsmittelwert | $[x]$ | 04, 09 |
| $\sigma^2, \mathrm{Var}(X)$ | $\mathbb{R}^+_0$ | Varianz der Verteilung | $[x]^2$ | 04, 09 |
| $\sigma$ | $\mathbb{R}^+_0$ | Standardabweichung der Verteilung | $[x]$ | 04, 09 |
| $\text{IQR}$ | $\mathbb{R}^+_0$ | Interquartilsabstand ($Q_{75} - Q_{25}$) | $[x]$ | 04 |
| $N$ | $\mathbb{N}^+$ | Stichprobenumfang / Gesamtanzahl an Messungen | $-$ | 04, 09 |
| $\Delta w_{\text{bin}}$| $\mathbb{R}^+$ | Klassenbreite eines Histogramm-Bins | $[x]$ | 04 |
| $\lambda$ | $\mathbb{R}^+$ | Mittlere Ankunftsrate (Poisson-Prozess) | $\mathrm{s^{-1}}$ | 09 |
| $\mu_{\text{queue}}$ | $\mathbb{R}^+$ | Mittlere Abfertigungs- / Bedienrate | $\mathrm{s^{-1}}$ | 09 |
| $\rho$ | $[0, 1)$ | Systemauslastung / Verkehrsdichte | $-$ | 09 |
| $L, L_q$ | $\mathbb{R}^+_0$ | Mittlere Kundenanzahl im System / in der Schlange | $-$ | 09 |
| $W, W_q$ | $\mathbb{R}^+_0$ | Mittlere Verweilzeit / Wartezeit | $\mathrm{s}$ | 09 |

---

### 4.5 Diskrete Ereignissimulation (DES) & Hybride Systeme

| Symbol | Raum / Typ | Bedeutung | SI-Einheit | Kapitel |
| :--- | :---: | :--- | :---: | :---: |
| $t_{\text{sim}}$ | $\mathbb{R}^+_0$ | Globale Simulationsuhrzeit | $\mathrm{s}$ | 09, 10 |
| $e_k = (t_k, \text{type})$| Tupel | Diskretes Ereignis mit Ausführungszeit $t_k$ | $-$ | 09 |
| $Q_{\text{event}}$| Vorrangwarteschlange | Event-Queue (sortiert nach aufsteigender Event-Zeit $t_k$) | $-$ | 09 |
| $q \in Q$ | Diskret | Diskreter Systemzustand / Betriebsmodus | $-$ | 10 |
| $\delta(q, e)$ | Funktion | Zustandsübergangsfunktion des Automaten | $-$ | 10 |
| $z(\mathbf{x})$ | $\mathbb{R}$ | Zero-Crossing-Funktion (Indikator für Zustandswechsel) | Skalenabhängig (oft $\mathrm{m}$) | 10, 11 |
| $\varepsilon_z, \varepsilon_t$ | $\mathbb{R}^+$ | Schwellenwert-Toleranzen für Wert- bzw. Zeitbisektion | $[z]$ bzw. $\mathrm{s}$ | 10 |
| $\mathbf{r}(\mathbf{x})$ | $\mathbb{R}^n \to \mathbb{R}^n$ | Diskrete Reset-Map / Zustands-Neubelegung nach Sprung | $[\mathbf{x}]$ | 10 |
| $v_{\text{sticking}}$| $\mathbb{R}^+$ | Grenzgeschwindigkeit für Haftreibung / Ruhekontakt | $\mathrm{m/s}$ | 10 |

---

## 5. Disambiguierungs-Matrix für Mehrfachbelegungen

Da in der interdisziplinären Systemsimulation identische Formelzeichen in verschiedenen Fachgebieten traditionell unterschiedliche Bedeutungen tragen, ist folgende Disambiguierung verbindlich vorgeschrieben:

```
+-------------------------------------------------------------------------------------------------------+
|                                    DISAMBIGUIERUNGS-MATRIX                                            |
+----------+------------------------------------+------------------------------------+------------------+
| Symbol   | Bedeutung A (Fachgebiet 1)         | Bedeutung B (Fachgebiet 2)         | Entflechtungs-   |
|          |                                    |                                    | Vorgabe          |
+----------+------------------------------------+------------------------------------+------------------+
| $\lambda$| Thermische Wärmeleitfähigkeit      | Mittlere Ankunftsrate              | In Thermodynamik |
|          | $[\mathrm{W/(m\cdot K)}]$ (Kap 02) | $[\mathrm{s^{-1}}]$ (Kap 09)       | $\lambda_{\text{th}}$, im DES $\lambda$ |
+----------+------------------------------------+------------------------------------+------------------+
| $\rho$   | Massendichte                       | Systemauslastung                   | Bei Verwechslungs-|
|          | $[\mathrm{kg/m^3}]$ (Kap 01, 02)   | $[-]$ (Kap 09)                     | gefahr $\rho_{\text{mass}}$ vs. $\rho_{\text{Ausl}}$|
+----------+------------------------------------+------------------------------------+------------------+
| $k$      | Federsteifigkeit                   | Gesamtanzahl Knoten                | Stets            |
|          | $[\mathrm{N/m}]$ (Kap 07, 08)      | $[-]$ (Kap 07, Graphentheorie)     | $k_{\text{Stab}}$ vs. Knotenzahl $N$ bzw. $k$ |
+----------+------------------------------------+------------------------------------+------------------+
| $c$      | Spezifische Wärmekapazität         | Dämpfungskonstante                 | Thermisch $c_{\text{spec}}$,     |
|          | $[\mathrm{J/(kg\cdot K)}]$ (Kap 02)| $[\mathrm{N\cdot s/m}]$ (Kap 08)   | Mechanisch $d$ (DIN-Norm!)|
+----------+------------------------------------+------------------------------------+------------------+
| $\alpha$ | Temperaturleitfähigkeit            | Shininess-Glanzexponent            | Thermisch $\alpha_{\text{diff}}$,|
|          | $[\mathrm{m^2/s}]$ (Kap 02)        | $[-]$ (Kap 05)                     | Phong $\alpha_{\text{shiny}}$    |
+----------+------------------------------------+------------------------------------+------------------+
| $\mu$    | Verteilungs-Erwartungswert         | Stochastische Bedienrate           | Gauß: $\mu$,                     |
|          | (Kap 04)                           | $[\mathrm{s^{-1}}]$ (Kap 09)       | Schlange: $\mu$ mit Kontext      |
+----------+------------------------------------+------------------------------------+------------------+
| $u$      | Elektrische Steuerspannung         | Knotenverschiebungskomponente      | Im FEM-Kontext   |
|          | $[\mathrm{V}]$ (Kap 08)             | $[\mathrm{m}]$ (Kap 07)            | $u_x, u_y$, E-Technik $u(t)$     |
+----------+------------------------------------+------------------------------------+------------------+
| $x$      | Räumliche Koordinate               | Kontinuierlicher Systemzustand     | Zustand $\mathbf{x}$,            |
|          | $[\mathrm{m}]$ (Kap 01, 02, 03)    | (Kap 08, 10, 11)                   | Raumkoordinate $x, y$            |
+----------+------------------------------------+------------------------------------+------------------+
```

> [!TIP]
> **Mechanische Dämpfung:** Für die viskose Dämpfungskonstante ist im gesamten Kurs verbindlich das Symbol $d$ mit der Einheit $[\mathrm{N\cdot s/m}]$ zu verwenden. Die im angloamerikanischen Raum verbreitete Bezeichnung $c$ kollidiert im deutschen Maschinenbau mit der Federsteifigkeit (Federkonstante $c$) und in der Thermodynamik mit der Wärmekapazität $c$.

---

## 6. Autoren- und Dozenten-Leitfaden (Implementation Guide)

### 6.1 Typografische Negativ-/Positiv-Beispiele (Don'ts vs. Do's)

| Aspekt | Negativ-Beispiel (Verboten) | Positiv-Beispiel (Normkonform) | Korrekturbegründung |
| :--- | :--- | :--- | :--- |
| **Gleichungssystem** | `$A * x = b$` | `$$\mathbf{A}\mathbf{x} = \mathbf{b}$$` | Matrizen und Vektoren müssen fett-aufrecht sein; Display-Math verhindert KaTeX-Renderfehler. |
| **Vektoren Mechanik**| `F = m * a` oder `$F = m \cdot a$` | `$$\vec{F} = m \cdot \vec{a}$$` | Kraft und Beschleunigung sind gerichtete Raumvektoren im $\mathbb{R}^3$. |
| **Nullvektor** | `\sum \vec{F}_i = 0` | `$$\sum_{i=1}^n \vec{F}_i = \vec{0}$$` | Vektorsumme ergibt einen Nullvektor $\vec{0}$, keinen Skalar $0$. |
| **Einheiten im Text**| `$g = 9.81 m/s^2$` | `$g = 9{,}81\,\mathrm{m/s^2}$` | Aufrechter Schriftsatz, Komma im Deutschen, schmales Spatium vor Einheit. |
| **Multi-Letter-Name**| `$IQR = Q3 - Q1$` | `$\text{IQR} = Q_{75} - Q_{25}$` | Unbehandelte Wörter rendern als kursive Produkte ($I \cdot Q \cdot R$). |
| **Zero-Crossing** | `$g(x) = 0$` (in Kap 11) | `$$z(\mathbf{x}) = 0$$` | Vermeidet Namenskollision mit Ausgangsgleichung $g(\cdot)$ und Fallbeschleunigung $g$. |
| **FEM-Lagerblock** | `K_BB * u_B = f_B` (ohne Kontext) | `$$\mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f$$` | Harmonisierung auf die primäre $f/p$-Notation mit didaktischer Brücke zu $B/A$. |
| **Phong-Material** | `material_d * cos(theta)` | `$$k_d \cdot (\vec{n} \cdot \vec{l})$$` | Trennung von analytischem Modell und C#-Shader-Implementierungsvariablen. |

---

### 6.2 MARP-spezifische KaTeX/LaTeX-Syntax-Vorgaben

Um in MARP ein absolut sauberes Rendern ohne Überläufe oder Layout-Glitches sicherzustellen, gelten folgende syntaktische Regeln:

1. **Kein mehrzeiliges Inline-Math:**
   Matrizen (`\begin{pmatrix} ... \end{pmatrix}`) dürfen niemals in einfachen Dollarzeichen `$ ... $` stehen. Sie müssen stets als abgesetztes Display-Math in doppelten Dollarzeichen `$$ ... $$` mit Leerzeilen davor und danach formatiert werden.
2. **Kompakte Vektordarstellung im Fließtext:**
   Im Fließtext sind mehrzeilige Spaltenvektoren unzulässig, da sie den Zeilenabstand zerstören. Stattdessen ist die transponierte Zeilenform zu nutzen:
   - Richtig: $\mathbf{x} = (x_1, x_2)^T$
   - Falsch im Fließtext: $\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$
3. **Display-Gleichungen mit Fallunterscheidungen:**
   Fallunterscheidungen sind mit der `cases`-Umgebung zu setzen:
   ```latex
   $$u(t) = \begin{cases} u_{\max}, & \text{für } u_{\text{raw}}(t) > u_{\max} \\ u_{\text{raw}}(t), & \text{für } u_{\min} \le u_{\text{raw}}(t) \le u_{\max} \\ u_{\min}, & \text{für } u_{\text{raw}}(t) < u_{\min} \end{cases}$$
   ```

---

### 6.3 Formelblock-Template für Foliensätze

Jede Folie, die eine physikalisch-mathematische Kernformel einführt, muss dem standardisierten Dreischritt folgen:

```markdown
### Titel des Modells / der Gleichung

$$\mathbf{Formel\;in\;Display-Math}$$

- **Zustands- & Ausgangsgrößen:**
  - $x(t) \in \mathbb{R}$: Physikalische Größe mit Erläuterung $[\mathrm{Einheit}]$
- **Systemparameter & Materialkonstanten:**
  - $k \in \mathbb{R}^+$: Parametername mit typischem Wertebereich $[\mathrm{Einheit}]$
- **Didaktischer Kernhinweis:**
  - Prägnante Erläuterung der physikalischen Wirkung oder numerischen Besonderheit.
```

---

## 7. Qualitätskriterien & Abnahme-Checkliste

Für jedes künftige Review und jede Abnahme eines Foliensatzes gelten folgende harte Abbruchkriterien (**Definition of Done**):

- [ ] **1. Vollständigkeitskriterium:** Jede in einer Formel auftretende Variable ist im Folientext oder in einer unmittelbar sichtbaren Legende namentlich benannt.
- [ ] **2. Dimensionskriterium:** Jede physikalische Größe besitzt eine explizite SI-Einheit in eckigen Klammern $[\mathrm{...}]$ nach DIN 1304.
- [ ] **3. Vektortypografie-Kriterium:**
  - Anschauungsvektoren ($\mathbb{R}^2, \mathbb{R}^3$) tragen Vektorpfeile ($\vec{v}, \vec{F}, \vec{n}$).
  - Zustandsvektoren ($\mathbb{R}^n$) sind fett-aufrecht ($\mathbf{x}, \mathbf{u}, \mathbf{y}$).
- [ ] **4. Matrizentypografie-Kriterium:** Sämtliche Matrizen sind ausnahmslos fett-aufrecht gesetzt ($\mathbf{A}, \mathbf{B}, \mathbf{K}, \mathbf{T}, \mathbf{L}$). Es existiert kein einziger Magersatzausdruck mehr.
- [ ] **5. Nullvektor-Kriterium:** Vektorielle Bilanzen und homogene Gleichungen enden auf $\vec{0}$ bzw. $\mathbf{0}$, niemals auf einen einfachen Skalar $0$.
- [ ] **6. Normierungskriterium:** Geometrische Normalen- und Richtungsvektoren werden ausdrücklich als normiert deklariert ($\|\vec{n}\| = 1$).
- [ ] **7. Disambiguierungskriterium:** Mehrfach belegte Symbole ($\lambda, \rho, k, c, \alpha, \mu$) sind gemäß Abschnitt 5 durch Subskripte disambiguiert.

---
*Dieser Notationsstandard ist mit Beschluss des Planungsteams ab sofort für das gesamte Curriculum verbindlich.*
