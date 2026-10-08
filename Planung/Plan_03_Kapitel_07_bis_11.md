# Operativer Überarbeitungsplan: Kapitel 07 bis 11 (Statik, Dynamik & Epilog)

**Dokument-ID:** `Planung/Plan_03_Kapitel_07_bis_11.md`  
**Autor:** Planer 3 (Fokus: Kapitel 07 bis 11 – Statik, Dynamische Systeme, Epilog)  
**Bezugsdokumente:**
- `Reviews/Audit_Variablen_02_Visualisierung_Statik.md` (Detailaudit Kap. 04–07)
- `Reviews/Audit_Variablen_03_Dynamik_Epilog.md` (Detailaudit Kap. 08–11)
- `Planung/02_Plan_Didaktik_und_Numerik.md` & `Planung/Final_Plan_Mathematik_und_Didaktik.md`  
**Geltungsbereich:**
- `Folien/07_Statische_Modelle/Folien.md`
- `Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md`
- `Folien/09_Dynamische_Modelle_Diskret/Folien.md`
- `Folien/10_Dynamische_Modelle_Hybrid/Folien.md`
- `Folien/11_Epilog/Folien.md`  
**Datum:** 8. Oktober 2026  
**Status:** Genehmigter Fachplan zur direkten Umsetzung durch die Implementierungsagenten  

---

## Inhaltsverzeichnis
1. [Executive Summary & Leitprinzipien](#1-executive-summary--leitprinzipien)
2. [Kapitel 07: Statische Modelle (Fachwerke & FEM)](#2-kapitel-07-statische-modelle-fachwerke--fem)
   - 2.1 Audit-Befunde & Maßnahmenübersicht
   - 2.2 Gleichgewicht & Vektorschreibweise ($\sum \vec{F}_i = \vec{0}$)
   - 2.3 Harmonisierung der LGS-Partitionierung ($f/p \leftrightarrow B/A$)
   - 2.4 Spezifikation Neu-Grafik: `LGS_Partitionierung_Matrix.svg`
   - 2.5 Detaillierter Folienänderungs- und Slide-Split-Plan
3. [Kapitel 08: Kontinuierliche Dynamische Modelle](#3-kapitel-08-kontinuierliche-dynamische-modelle)
   - 3.1 Audit-Befunde & Maßnahmenübersicht
   - 3.2 Klassische lineare Zustandsraumdarstellung ($\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}, \mathbf{y} = \mathbf{C}\mathbf{x} + \mathbf{D}\mathbf{u}$)
   - 3.3 Federpendel: SI-Einheiten & Schwingungskennwerte ($\omega_0, D$)
   - 3.4 DC-Servomotor: Elektromechanische Herleitung ($J, R, L, k_m, k_e \to T_m, K_m$)
   - 3.5 Anti-Windup Clamping: Reglerstruktur & Clamping-Kriterium
   - 3.6 Expliziter Euler: Analytische Energiedivergenz ($E_{k+1} = E_k(1 + \omega_0^2 h^2)$)
   - 3.7 Spezifikation Neu-Grafik: `DC_Motor_Ersatzschaltbild.svg`
   - 3.8 Detaillierter Folienänderungs- und Slide-Split-Plan
4. [Kapitel 09: Diskrete Dynamische Modelle](#4-kapitel-09-diskrete-dynamische-modelle)
   - 4.1 Audit-Befunde & Maßnahmenübersicht
   - 4.2 Warteschlangentheorie: Kendall $M/M/1$, Auslastung $\rho < 1$, Little's Gesetz
   - 4.3 Inversionsmethode: Numerische Singularitätsvermeidung ($U \in (0, 1]$)
   - 4.4 Spezifikation Neu-Grafik: `MM1_Warteschlange_Kinetik.svg`
   - 4.5 Detaillierter Folienänderungs- und Slide-Split-Plan
5. [Kapitel 10: Hybride Dynamische Modelle](#5-kapitel-10-hybride-dynamische-modelle)
   - 5.1 Audit-Befunde & Maßnahmenübersicht
   - 5.2 Zeno-Effekt: Exakte mathematische Korrektur der Fall-Reihe ($t_\infty$)
   - 5.3 Bisektion: Nullstelleneinkreisung & Abbruchschranken ($|z| < \varepsilon_z$)
   - 5.4 Spezifikation Neu-Grafik: `ZeroCrossing_Bisektion_Intervall.svg`
   - 5.5 Detaillierter Folienänderungs- und Slide-Split-Plan
6. [Kapitel 11: Epilog & Synthese](#6-kapitel-11-epilog--synthese)
   - 6.1 Audit-Befunde & Maßnahmenübersicht
   - 6.2 ISO-80000-2-Bereinigung: Durchgängiger Fettdruck ($\mathbf{A}\mathbf{x} = \mathbf{b}$)
   - 6.3 Harmonisierung Zero-Crossing: $z(\mathbf{x}) = 0$
   - 6.4 Regularisierungseinheit $[\epsilon] = \mathrm{m}$ & Indexmenge $k \in \mathbb{N}_0$
   - 6.5 Detaillierter Folienänderungsplan
7. [Folienbilanz & Layout-Sicherheitsmatrix (0 Overflow-Garantie)](#7-folienbilanz--layout-sicherheitsmatrix-0-overflow-garantie)
8. [Grafik- und Diagrammspezifikation (Übersichtstabelle)](#8-grafik--und-diagrammspezifikation-übersichtstabelle)

---

## 1. Executive Summary & Leitprinzipien

Auf Basis der systematischen Prüfberichte `Reviews/Audit_Variablen_02_Visualisierung_Statik.md` und `Reviews/Audit_Variablen_03_Dynamik_Epilog.md` definiert dieser Fachplan die präzisen operativen Arbeitsschritte für die zweite Hälfte des Curriculums (Kapitel 07 bis 11).

### Leitprinzipien der Überarbeitung:
1. **Normenkonformität nach ISO 80000-2 & DIN 1304:**
   - Matrizen und Vektoren werden ausnahmslos in Fettdruck gesetzt ($\mathbf{A}, \mathbf{x}, \mathbf{u}, \mathbf{y}, \mathbf{K}, \mathbf{f}$).
   - Skalare Variablen und Parameter stehen kursiv ($m, d, k, t, \omega, \lambda, \mu, \rho$).
   - Deskriptive Indizes stehen aufrecht ($E_{\text{kin}}, E_{\text{pot}}, u_{\text{raw}}, u_{\max}, \bar{L}_q, \bar{W}_q$).
   - Sämtliche physikalischen Größen erhalten bei ihrer Einführung ihre standardisierten SI-Einheiten (z.B. $[\mathrm{N}]$, $[\mathrm{N\cdot m}]$, $[\mathrm{N/m}]$, $[\mathrm{kg}]$, $[\mathrm{s^{-1}}]$, $[\mathrm{rad/s}]$).
2. **Didaktische Transparenz & lückenlose Herleitung:**
   - Keine "vom Himmel gefallenen" Formeln (z.B. Zeitkonstante $T_m$ des DC-Motors, Little's Gesetz, Zeno-Grenzzeit). Studierende müssen physikalische Ursachen und mathematische Konsequenzen direkt auf der Folie nachvollziehen können.
3. **Layout-Sicherheit (0 Vertikale Überläufe):**
   - Das Vorlesungstemplate (`fhooe` / MARP) definiert eine strikte Folienhöhe von 720 px bei 1280 px Breite (16:9).
   - Wo Formelergänzungen oder Parameterlisten den verfügbaren Platz überschreiten, wird **zwingend ein Slide-Split** (z.B. Folie 77 $\to$ 77a + 77b) vorgenommen.
   - Text und Bild werden ausgewogen in 2-Spalten-Gittern (`<div class="columns top">` bzw. `two`) platziert. Bildhöhen werden auf maximal 420 px bzw. Breiten auf maximal 520 px limitiert.

---

## 2. Kapitel 07: Statische Modelle (Fachwerke & FEM)

### 2.1 Audit-Befunde & Maßnahmenübersicht
- **Befund 7.1:** Auf Folie 3 (Zeile 42) werden Kräfte und Momente fälschlicherweise zur Skalarnull $0$ addiert ($\sum \vec{F} = 0$). Korrektur: Vektornull $\vec{0}$ mit Indizes und Einheiten.
- **Befund 7.13 & 7.16:** Schwerer Nomenklatur-Bruch bei der LGS-Partitionierung: Auf Folie 28 (Zeile 569) wird die internationale FEM-Notation mit $f$ (*free*) und $p$ (*prescribed*) eingeführt. Auf Folie 45 (Zeile 906) springt der Text ohne Ankündigung auf die deutsche Notation mit $B$ (*beweglich*) und $A$ (*Auflager*).
- **Fehlendes Erklär-Bild:** Die Eliminierung gelagerter Freiheitsgrade wird bisher rein symbolisch dargestellt. Es fehlt eine intuitive Visualisierung der Blockmatrix-Zerlegung.

### 2.2 Gleichgewicht & Vektorschreibweise ($\sum \vec{F}_i = \vec{0}$)
Auf Folie 3 (`Was ist ein statisches Modell?`, Zeile 38–45) wird die Gleichgewichtsbedingung formalisiert:
$$\sum_{i=1}^n \vec{F}_i = \vec{0} \quad [\mathrm{N}] \qquad \text{und} \qquad \sum_{j=1}^m \vec{M}_j = \vec{0} \quad [\mathrm{N\cdot m}]$$
- $\vec{F}_i \in \mathbb{R}^d$ ($d \in \{2, 3\}$): Äußere und innere Kraftvektoren [$\mathrm{N}$]
- $\vec{M}_j \in \mathbb{R}^3$: Kraft- und Torsionsmomente [$\mathrm{N\cdot m}$]
- $\vec{0}$: Nullvektor der entsprechenden Dimension

### 2.3 Harmonisierung der LGS-Partitionierung ($f/p \leftrightarrow B/A$)
Die Blockzerlegung der globalen Steifigkeitsmatrix $\mathbf{K} \in \mathbb{R}^{n\times n}$ trennt freie ($f$) von gelagerten ($p$) Freiheitsgraden:
$$\begin{pmatrix} \mathbf{K}_{ff} & \mathbf{K}_{fp} \\ \mathbf{K}_{pf} & \mathbf{K}_{pp} \end{pmatrix} \begin{pmatrix} \mathbf{u}_f \\ \mathbf{u}_p \end{pmatrix} = \begin{pmatrix} \mathbf{f}_f \\ \mathbf{f}_p \end{pmatrix}$$
- **Nomenklatur-Mapping:** International $f$ (*free*) $\equiv$ Deutsch $B$ (*beweglich*); International $p$ (*prescribed*) $\equiv$ Deutsch $A$ (*Auflager*).
- **Zeile 1 (Primäres Gleichungssystem für Verschiebungen $\mathbf{u}_f$):**
  $$\mathbf{K}_{ff} \mathbf{u}_f + \mathbf{K}_{fp} \mathbf{u}_p = \mathbf{f}_f \implies \mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f - \mathbf{K}_{fp} \mathbf{u}_p$$
- **Starre Auflager ($\mathbf{u}_p = \mathbf{0}$):** Der Koppelterm entfällt vollständig:
  $$\mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f \quad (\text{bzw. } \mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B)$$
- **Auflagersenkungen ($\mathbf{u}_p \neq \mathbf{0}$):** Definiertes Absenken eines Stützpunkts induziert eine Zusatzlast $-\mathbf{K}_{fp}\mathbf{u}_p$.
- **Zeile 2 (Post-Processing: Reaktionskräfte an den Lagern):**
  $$\mathbf{f}_p = \mathbf{K}_{pf} \mathbf{u}_f + \mathbf{K}_{pp} \mathbf{u}_p \xrightarrow{\mathbf{u}_p = \mathbf{0}} \mathbf{f}_p = \mathbf{K}_{pf} \mathbf{u}_f$$

### 2.4 Spezifikation Neu-Grafik: `LGS_Partitionierung_Matrix.svg`
- **Dateipfad:** `Folien/07_Statische_Modelle/Diagramme/LGS_Partitionierung_Matrix.svg`
- **Abmessungen:** $960 \times 440\,\mathrm{px}$, Vektorgrafik SVG
- **Didaktisches Ziel:** Studierenden visualisieren, warum aus einem großen singulären Gesamtsystem $\mathbf{K}\mathbf{u}=\mathbf{f}$ durch Streichen der Auflagerzeilen ein invertierbares, symmetrisch positiv-definites (SPD) Teilsystem $\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$ entsteht.
- **Inhaltliche Komponenten:**
  1. *Große Matrix $\mathbf{K}$ ($2\times 2$-Blockaufteilung):*
     - Block $\mathbf{K}_{ff}$ (oben links, $n_f \times n_f$): Hellgrüner Hintergrund (`#E8F5E9`), grüner Rahmen (`#2E7D32`), Label: **$\mathbf{K}_{ff}$ (Frei / Beweglich - SPD)**.
     - Block $\mathbf{K}_{fp}$ (oben rechts, $n_f \times n_p$): Grauer Hintergrund (`#ECEFF1`), gestrichelter Rahmen, Label: $\mathbf{K}_{fp}$ (Kopplung $\to \mathbf{0}$ bei starren Lagern).
     - Block $\mathbf{K}_{pf}$ (unten links, $n_p \times n_f$): Blauer Hintergrund (`#E1F5FE`), blauer Rahmen, Label: $\mathbf{K}_{pf}$ (Einfluss auf Lagerkräfte).
     - Block $\mathbf{K}_{pp}$ (unten rechts, $n_p \times n_p$): Dunkelgrauer Hintergrund, Label: $\mathbf{K}_{pp}$ (Lager-Steifigkeit).
  2. *Vektoren $\mathbf{u}$ und $\mathbf{f}$:*
     - Vektor $\mathbf{u}$: Geteilt in $\mathbf{u}_f$ (rot umrandet: **Gesuchte Unbekannte**) und $\mathbf{u}_p = \mathbf{0}$ (ausgegraut: **Bekannte Randwerte**).
     - Vektor $\mathbf{f}$: Geteilt in $\mathbf{f}_f$ (bekannte Knotenlasten) und $\mathbf{f}_p$ (unbekannte Reaktionskräfte).
  3. *Eliminierungspfeil / Workflow:*
     - Pfeil von Matrixzeile 1 nach rechts mit Beschriftung: "Mit $\mathbf{u}_p = \mathbf{0} \implies \mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$ (Lösbar via Cholesky)".
     - Pfeil von Matrixzeile 2 nach unten: "Lagerkraft-Berechnung: $\mathbf{f}_p = \mathbf{K}_{pf}\mathbf{u}_f$".
  4. *Nomenklatur-Badge:* Legendenkasten: "$f \equiv B$ (frei / beweglich), $p \equiv A$ (fest / Auflager)".

### 2.5 Detaillierter Folienänderungs- und Slide-Split-Plan (Kapitel 07)

#### Maßnahme 07-A: Statisches Gleichgewicht (Folie 3)
- **Datei:** `Folien/07_Statische_Modelle/Folien.md`, Zeile 38–45
- **Änderung:** Ersetzung von $\sum \vec{F} = 0$ durch DIN/ISO-konforme Vektorgleichung:
  ```markdown
  ### Was ist ein statisches Modell?

  - Beschreibt ein System im **Ruhezustand** (im mechanischen Gleichgewicht).
  - Alle wirkenden Kräfte und Momente kompensieren sich exakt zu Null:
    $$\sum_{i=1}^n \vec{F}_i = \vec{0} \quad [\mathrm{N}] \qquad \text{und} \qquad \sum_{j=1}^m \vec{M}_j = \vec{0} \quad [\mathrm{N\cdot m}]$$
  - Das System ist **zeitunabhängig** ($\dot{\mathbf{x}} = \mathbf{0}$).
  - **Typische Fragestellung**: Welche Schnittkräfte ($S$) wirken in den Stäben eines Tragwerks und wie groß sind die elastischen Verformungen ($\mathbf{u}$) unter konstanter Nennlast?
  ```

#### Maßnahme 07-B: Slide-Split bei der LGS-Partitionierung (Folie 28 $\to$ Folie 28a + 28b)
- **Aktueller Stand:** Folie 28 (Zeile 554–591) ist extrem dicht und versucht, Randbedingungen, Formelblock und Auflösungsregeln auf einer Einzelfolie unterzubringen.
- **Slide 28a (Neu strukturiert):** `Einbau der Randbedingungen: Blockpartitionierung`
  - Einbettung des neuen Diagramms `LGS_Partitionierung_Matrix.svg`.
  - Formulierung der $2\times 2$-Blockmatrix.
  - Definition der Indizes $f$ (*free*) und $p$ (*prescribed*).
- **Slide 28b (Neue Folie):** `Lösung des partitionierten Systems & Auflagerreaktionen`
  - Ausführliche Ableitung von Zeile 1 und Zeile 2.
  - Sonderfall $\mathbf{u}_p = \mathbf{0}$ vs. Stützensenkung $\mathbf{u}_p \neq \mathbf{0}$.
  - Nomenklatur-Brücke zu $B$ und $A$.

#### Maßnahme 07-C: Nomenklatur-Harmonisierung bei numerischer Lösung (Folie 45)
- **Datei:** `Folien/07_Statische_Modelle/Folien.md`, Zeile 901–919
- **Änderung:** Formelzeile harmonisieren:
  $$\mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f - \mathbf{K}_{fp} \mathbf{u}_p \quad \iff \quad \mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B - \mathbf{K}_{BA} \mathbf{u}_A$$
  Erläuterung ergänzen, dass $\mathbf{K}_{ff}$ bzw. $\mathbf{K}_{BB}$ symmetrisch positiv-definit (SPD) ist und via Cholesky-Zerlegung $\mathbf{K}_{ff} = \mathbf{L}\mathbf{L}^T$ in $\mathcal{O}(\frac{1}{3}n_f^3)$ Operationen gelöst wird.

---

## 3. Kapitel 08: Kontinuierliche Dynamische Modelle

### 3.1 Audit-Befunde & Maßnahmenübersicht
- **Befund 8.1:** Auf Folie 6 wird nur die nichtlineare Zustandsraumform vorgestellt; auf Folie 8 und 77 taucht plötzlich $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$ auf. Vektordimensionen und Matrizen $\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D}$ fehlen.
- **Befund 8.2:** Beim Federpendel (Folie 7 & 25) fehlen physikalische Einheiten und Schwingungskennwerte ($\omega_0 = \sqrt{k/m}$, $D = \frac{d}{2\sqrt{km}}$).
- **Befund 8.5:** Die Energiedivergenz des expliziten Eulers (Folie 29) wird nur verbal behauptet; der analytische Beweis $E_{k+1} = E_k(1 + \omega_0^2 h^2)$ fehlt.
- **Befund 8.11:** Der DC-Servomotor (Folie 77) nennt $T_m = 0{,}05\,\mathrm{s}$ und $K_m = 2{,}5\,\mathrm{rad/(s\cdot V)}$ ohne jede Herleitung aus Ankerkreis und Rotorträgheit.
- **Befund 8.12:** Beim Anti-Windup Clamping (Folie 79) fehlt die mathematische Formel für die ungesättigte Stellgröße $u_{\text{raw}}$ und die Clamping-Bedingung $\text{sgn}(u_{\text{raw}}) = \text{sgn}(e)$.

### 3.2 Klassische lineare Zustandsraumdarstellung
Einführung der LTI-Standardform (*Linear Time-Invariant*):
$$\dot{\mathbf{x}}(t) = \mathbf{A}\mathbf{x}(t) + \mathbf{B}\mathbf{u}(t), \qquad \mathbf{y}(t) = \mathbf{C}\mathbf{x}(t) + \mathbf{D}\mathbf{u}(t)$$
- $\mathbf{x}(t) \in \mathbb{R}^n$: Zustandsvektor ($n$ Energiespeicher / innere Freiheitsgrade)
- $\mathbf{u}(t) \in \mathbb{R}^m$: Eingangs- bzw. Steuervektor ($m$ Aktoren / Erregerkräfte)
- $\mathbf{y}(t) \in \mathbb{R}^p$: Ausgangs- bzw. Messvektor ($p$ Sensoren / Zielgrößen)
- $\mathbf{A} \in \mathbb{R}^{n\times n}$: Systemmatrix (beschreibt die freie Eigendynamik)
- $\mathbf{B} \in \mathbb{R}^{n\times m}$: Eingangs- bzw. Steuermatrix (Kopplung der Aktoren an die Zustände)
- $\mathbf{C} \in \mathbb{R}^{p\times n}$: Ausgangs- bzw. Messmatrix (Projektion auf Messgrößen)
- $\mathbf{D} \in \mathbb{R}^{p\times m}$: Durchgriffsmatrix (direkte algebraische Durchkopplung)

### 3.3 Federpendel: SI-Einheiten & Schwingungskennwerte
Die Bewegungsgleichung 2. Ordnung für den gedämpften Schwinger lautet:
$$m \ddot{y}(t) + d \dot{y}(t) + k y(t) = F(t) \iff \ddot{y}(t) + 2 D \omega_0 \dot{y}(t) + \omega_0^2 y(t) = \frac{1}{m} F(t)$$
- $y(t)$: Auslenkung / Position [$\mathrm{m}$]
- $m$: Träge Masse [$\mathrm{kg}$]
- $d$: Viskose Dämpfungskonstante [$\mathrm{N\cdot s/m}$] bzw. [$\mathrm{kg/s}$]
- $k$: Federsteifigkeit [$\mathrm{N/m}$]
- $F(t)$: Äußere Erregerkraft [$\mathrm{N}$]
- $\omega_0 = \sqrt{\frac{k}{m}}$: Ungedämpfte Eigenkreisfrequenz [$\mathrm{rad/s}$]
- $D = \frac{d}{2\sqrt{k\cdot m}} = \frac{d}{2m\omega_0}$: Lehr'sches Dämpfungsmaß [-] ($D < 1$: Schwingfall, $D = 1$: Aperiodischer Grenzfall, $D > 1$: Kriechfall)

### 3.4 DC-Servomotor: Elektromechanische Herleitung
Der mechatronische Gleichstrom-Servomotor besteht aus zwei gekoppelten physikalischen Subsystemen:

1. **Elektrischer Ankerkreis (Maschenregel nach Kirchhoff):**
   $$u(t) = R \cdot i(t) + L \frac{\mathrm{d}i(t)}{\mathrm{d}t} + u_{\text{ind}}(t)$$
   - $u(t)$: Ankerspannung [$\mathrm{V}$] (vom Leistungsverstärker eingeprägt)
   - $R$: Ankerwiderstand [$\mathrm{\Omega}$]
   - $L$: Ankerinduktivität [$\mathrm{H}$]
   - $i(t)$: Ankerstrom [$\mathrm{A}$]
   - $u_{\text{ind}}(t) = k_e \cdot \omega(t)$: Gegen-EMK (induzierte Gegenspannung) [$\mathrm{V}$]
   - $k_e$: Gegen-EMK-Spannungskonstante [$\mathrm{V/(rad/s)}$]

2. **Mechanischer Rotor (Drehimpulsbilanz nach Newton-Euler):**
   $$J \dot{\omega}(t) = M_m(t) - M_{\text{last}}(t) - d \cdot \omega(t)$$
   - $J$: Rotor- und Wellenträgheitsmoment [$\mathrm{kg\cdot m^2}$]
   - $\omega(t)$: Winkelgeschwindigkeit / Motordrehzahl [$\mathrm{rad/s}$]
   - $M_m(t) = k_m \cdot i(t)$: Elektromagnetisches Motormoment [$\mathrm{N\cdot m}$]
   - $k_m$: Drehmomentkonstante [$\mathrm{N\cdot m/A}$] (Im SI-System gilt $k_m = k_e$)
   - $d$: Viskose Reibungskonstante der Motorlager [$\mathrm{N\cdot m\cdot s/rad}$]

3. **Quasistationäre Stromnäherung ($T_e = L/R \ll T_m$):**
   Da die elektrische Zeitkonstante $T_e = L/R \approx 0{,}5\,\mathrm{ms}$ um Größenordnungen kleiner ist als die mechanische Zeitkonstante $T_m \approx 50\,\mathrm{ms}$, kann die Induktivität vernachlässigt werden ($L \approx 0$):
   $$i(t) \approx \frac{u(t) - k_e \omega(t)}{R}$$
   Einsetzen in den mechanischen Kreis:
   $$J \dot{\omega} = k_m \frac{u - k_e \omega}{R} - d \omega = -\left(\frac{k_m k_e + d R}{R}\right) \omega + \frac{k_m}{R} u$$
   Normierung auf Standardform $\dot{\omega} = -\frac{1}{T_m} \omega + \frac{K_m}{T_m} u$:
   $$T_m = \frac{J \cdot R}{k_m k_e + d \cdot R} \quad [\mathrm{s}], \qquad K_m = \frac{k_m}{k_m k_e + d \cdot R} \quad \left[\frac{\mathrm{rad}}{\mathrm{s \cdot V}}\right]$$

### 3.5 Anti-Windup Clamping: Reglerstruktur & Clamping-Kriterium
Bei Aktor-Begrenzung (Motorspannung $|u| \le u_{\max} = 10\,\mathrm{V}$) führt ein PI/PID-Regler ohne Schutzmaßnahme zum gefährlichen **Integrator-Windup**:
- **Regelfehler:** $e(t) = \theta_{\text{soll}} - \theta(t)$ [$\mathrm{rad}$]
- **Ungesättigte Stellgröße (PID mit D auf die Drehzahl):**
  $$u_{\text{raw}}(t) = K_p \cdot e(t) + x_I(t) - K_d \cdot \omega(t) \quad [\mathrm{V}]$$
  mit Proportionalbeiwert $K_p = 15{,}0\,\mathrm{V/rad}$, Differentialbeiwert $K_d = 0{,}5\,\mathrm{V\cdot s/rad}$ und Integratorzustand $x_I(t)$ [$\mathrm{V}$].
- **Sättigungsfunktion des Leistungsverstärkers:**
  $$u(t) = \operatorname{sat}(u_{\text{raw}}(t), \pm u_{\max}) = \operatorname{clamp}(u_{\text{raw}}(t), -u_{\max}, +u_{\max})$$
- **Dynamische Anti-Windup Clamping-Bedingung:**
  Der Integrator wird exakt dann angehalten ($\dot{x}_I = 0$), wenn der Aktor in der Sättigung ist **und** die Fehlerspannung die Sättigung weiter verstärken würde:
  $$\dot{x}_I(t) = \begin{cases} 0, & |u_{\text{raw}}| \ge u_{\max} \ \land \ \operatorname{sgn}(u_{\text{raw}}) = \operatorname{sgn}(e) \ (\iff e(t) \cdot u_{\text{raw}} > 0) \\ K_i \cdot e(t), & \text{sonst} \end{cases}$$
  mit Integrationsbeiwert $K_i = 40{,}0\,\mathrm{V/(rad\cdot s)}$.

### 3.6 Expliziter Euler: Analytische Energiedivergenz
Gegeben sei der ungedämpfte Oszillator $\ddot{y} + \omega_0^2 y = 0$ mit $\omega_0^2 = k/m$.
Explizites Euler-Update mit Schrittweite $h > 0$:
$$y_{k+1} = y_k + h v_k, \qquad v_{k+1} = v_k - h \omega_0^2 y_k$$
Physikalische Gesamtenergie: $E_k = \frac{1}{2} m v_k^2 + \frac{1}{2} k y_k^2 = \frac{1}{2} k \left(y_k^2 + \frac{1}{\omega_0^2} v_k^2\right)$.
Berechnung von $E_{k+1}$:
$$y_{k+1}^2 + \frac{1}{\omega_0^2} v_{k+1}^2 = (y_k + h v_k)^2 + \frac{1}{\omega_0^2} (v_k - h \omega_0^2 y_k)^2$$
$$= y_k^2 + 2 h y_k v_k + h^2 v_k^2 + \frac{1}{\omega_0^2} v_k^2 - 2 h y_k v_k + h^2 \omega_0^2 y_k^2$$
$$= (y_k^2 + \frac{1}{\omega_0^2} v_k^2) + h^2 (v_k^2 + \omega_0^2 y_k^2) = (y_k^2 + \frac{1}{\omega_0^2} v_k^2) \cdot (1 + \omega_0^2 h^2)$$
Daraus folgt exakt:
$$E_{k+1} = E_k \cdot \left(1 + \omega_0^2 h^2\right) > E_k \quad \forall h > 0$$
*Konsequenz:* In jedem Zeitschritt pumpt der explizite Euler einen Faktor $(1 + \omega_0^2 h^2)$ an numerischer Scheinenergie in das System. Nach $N$ Schritten ist $E_N = E_0 (1 + \omega_0^2 h^2)^N \approx E_0 e^{N \omega_0^2 h^2} \to \infty$.

### 3.7 Spezifikation Neu-Grafik: `DC_Motor_Ersatzschaltbild.svg`
- **Dateipfad:** `Folien/08_Dynamische_Modelle_Kontinuierlich/Diagramme/DC_Motor_Ersatzschaltbild.svg`
- **Abmessungen:** $960 \times 400\,\mathrm{px}$, Vektorgrafik SVG
- **Didaktisches Ziel:** Anschauliche Verknüpfung der elektrotechnischen Masche mit der maschinenbaulichen Rotordynamik.
- **Inhaltliche Komponenten:**
  1. *Linke Hälfte (Elektrischer Ankerstromkreis):*
     - Klemmenpaar mit Eingangsspannung $u(t)$ (rot beschriftet).
     - Serienwiderstand $R$ (Symbol DIN EN 60617, mit Spannungsabfall $u_R = R \cdot i$).
     - Induktivität $L$ (Spulensymbol, mit $u_L = L \frac{di}{dt}$).
     - Strompfeil $i(t)$.
     - Kreis für Anker/Gegen-EMK mit Pfeil $u_{\text{ind}} = k_e \omega$.
     - Maschenumlauf-Pfeil: $u(t) - u_R - u_L - u_{\text{ind}} = 0$.
  2. *Mitte (Elektromechanische Energiewandlung):*
     - Vertikale gestrichelte Koppellinie / Magnetfeld-Symbol.
     - Wandlungsbeziehungen hervorgehoben:
       - Drehmomenterzeugung: $M_m(t) = k_m \cdot i(t)$ (Elektro $\to$ Mechanik).
       - Geschwindigkeitsinduktion: $u_{\text{ind}}(t) = k_e \cdot \omega(t)$ (Mechanik $\to$ Elektro).
  3. *Rechte Hälfte (Mechanischer Antriebsstrang):*
     - Zylindrischer Rotor mit Massenträgheitsmoment $J$.
     - Drehimpuls-Pfeil $\omega(t)$ und Position $\theta(t) = \int \omega \, dt$.
     - Dämpfersymbol / Lagerreibung $d$ mit Bremsmoment $M_{\text{fric}} = d \cdot \omega$.
     - Abtriebswelle mit Lastmoment $M_{\text{last}}(t)$.
  4. *Farbcodierung:*
     - Elektrischer Kreis: Blau (`#1976D2`)
     - Mechanischer Kreis: Dunkelorange/Braun (`#E65100`)
     - Wandlung / Koppelgrößen: Grün (`#2E7D32`)

### 3.8 Detaillierter Folienänderungs- und Slide-Split-Plan (Kapitel 08)

#### Maßnahme 08-A: Slide-Split Zustandsraumdarstellung (Folie 6 $\to$ Folie 6a + 6b)
- **Folie 6a:** `Zustandsraumdarstellung: Allgemeine nichtlineare Form`
  - Beibehaltung von `Zustandsraum.svg`.
  - Fokus auf $\dot{\mathbf{x}}(t) = \mathbf{f}(t, \mathbf{x}, \mathbf{u})$ und $\mathbf{y}(t) = \mathbf{g}(t, \mathbf{x}, \mathbf{u})$ mit Vektordefinitionen.
- **Folie 6b (Neue Folie):** `Zustandsraumdarstellung: Lineare zeitinvariante Systeme (LTI)`
  - Formel $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}, \mathbf{y} = \mathbf{C}\mathbf{x} + \mathbf{D}\mathbf{u}$.
  - Systematische Aufzählung aller 4 Matrizen mit Dimensionen ($n\times n, n\times m, p\times n, p\times m$).
  - Didaktischer Hinweis: Brücke zu Simulink / TwinCAT / FMI-Standards.

#### Maßnahme 08-B: Ergänzung Federpendel-Kennwerte (Folie 7)
- **Datei:** `Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md`, Zeile 101–126
- **Änderung:** Aufnehmen der SI-Einheiten und Kennwerte $\omega_0$ und $D$ in Spalte 1.

#### Maßnahme 08-C: Analytische Energiedivergenz des Expliziten Eulers (Folie 29)
- **Datei:** `Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md`, Zeile 603–624
- **Änderung:** Ersetzen der vagen Textbehauptung durch die exakte Formel $E_{k+1} = E_k(1 + \omega_0^2 h^2)$ mit 2 Zeilen analytischer Begründung.

#### Maßnahme 08-D: Slide-Split DC-Servomotor (Folie 77 $\to$ Folie 77a + 77b)
- **Folie 77a (Neue Folie):** `DC-Servomotor: Elektromechanische Modellbildung`
  - Integration von `DC_Motor_Ersatzschaltbild.svg`.
  - Herleitung aus Maschenregel und Drallsatz.
  - Quasistationäre Stromnäherung und Herleitung von $T_m$ und $K_m$.
- **Folie 77b (Angepasste Folie):** `DC-Servomotor: Kontinuierliches Streckenmodell (Zustandsraum)`
  - Zustandsvektor $\mathbf{x} = (\theta, \omega)^T$.
  - Systemmatrix $\mathbf{A} = \begin{pmatrix} 0 & 1 \\ 0 & -1/T_m \end{pmatrix}$ und Eingangsvektor $\mathbf{b} = \begin{pmatrix} 0 \\ K_m/T_m \end{pmatrix}$.
  - Polstellenlage $\lambda_1 = 0, \lambda_2 = -20\,\mathrm{s^{-1}}$ und Stabilitätsbedingung $h \le 0{,}1\,\mathrm{s}$.

#### Maßnahme 08-E: Präzisierung Anti-Windup Clamping (Folie 79)
- **Datei:** `Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md`, Zeile 1647–1669
- **Änderung:** Ergänzung der ungesättigten Stellgröße $u_{\text{raw}}$ und der Clamping-Formel mit Einheiten von $K_p, K_i, K_d$.

---

## 4. Kapitel 09: Diskrete Dynamische Modelle

### 4.1 Audit-Befunde & Maßnahmenübersicht
- **Befund 9.2:** Auf Folie 33 wird Little's Gesetz isoliert für die Warteschlange eingeführt. Die Kendall-Notation $M/M/1$, die Bedienrate $\mu$, die Systemauslastung $\rho = \lambda/\mu < 1$ sowie Little's Gesetz für das Gesamtsystem ($L = \lambda W$) fehlen.
- **Befund 9.4:** Auf Folie 41 wird bei der Inversionsmethode $X = -\frac{1}{\lambda}\ln(U)$ genannt, ohne zu warnen, dass $U \in [0, 1)$ für $U=0$ eine Polstellensingularität ($\ln 0 \to -\infty$) auslöst.
- **Fehlendes Erklär-Bild:** Das stochastische Kinetikmodell (Markov-Kette) eines $M/M/1$-Systems mit Ankunfts- und Bedienraten fehlt völlig.

### 4.2 Warteschlangentheorie: Kendall $M/M/1$, Auslastung $\rho$ & Little's Gesetz
Ein grundlegendes Warteschlangensystem wird nach Kendall als **$A/S/c$** klassifiziert:
- **$M/M/1$:** Markov'sche (gedächtnislose, exponentialverteilte) Ankünfte ($M$), Markov'sche Bedienzeiten ($M$), $1$ Bedienstation ($c=1$).
- **Kenngrößen:**
  - $\lambda$: Mittlere Ankunftsrate [$\mathrm{Kunden/s}$] bzw. [$\mathrm{min^{-1}}$] ($\text{E}[T_A] = 1/\lambda$ mittlere Zwischenankunftszeit)
  - $\mu$: Mittlere Bedienrate der Station [$\mathrm{Kunden/s}$] bzw. [$\mathrm{min^{-1}}$] ($\text{E}[T_S] = 1/\mu$ mittlere Bedienzeit)
  - $\rho = \frac{\lambda}{\mu}$: Auslastungsgrad / Verkehrsintensität (Traffic Intensity, dimensionslos [-])
- **Stabilitätsbedingung nach Kendall:**
  $$\rho = \frac{\lambda}{\mu} < 1 \iff \lambda < \mu$$
  *(Ist $\rho \ge 1$, treffen im Mittel mehr Kunden ein als abgearbeitet werden können $\implies$ Warteschlange divergiert gegen $\infty$!)*
- **Little's Gesetz (Zwei Ebenen):**
  1. *Warteschlange (Teilsystem):*
     $$\bar{L}_q = \lambda \cdot \bar{W}_q$$
     $\bar{L}_q$: Mittlere Anzahl wartender Kunden; $\bar{W}_q$: Mittlere Wartezeit in der Schlange.
  2. *Gesamtsystem (Warteschlange + Bedienstation):*
     $$\bar{L} = \lambda \cdot \bar{W}$$
     mit mittlerer Verweilzeit $\bar{W} = \bar{W}_q + \frac{1}{\mu}$ und mittlerer Kundenzahl im System $\bar{L} = \bar{L}_q + \rho$.
  3. *Analytische $M/M/1$-Gleichgewichtslösungen:*
     $$\bar{L} = \frac{\rho}{1 - \rho}, \qquad \bar{L}_q = \frac{\rho^2}{1 - \rho}, \qquad \bar{W} = \frac{1}{\mu - \lambda}, \qquad \bar{W}_q = \frac{\rho}{\mu - \lambda}$$

### 4.3 Inversionsmethode: Numerische Singularitätsvermeidung
Die Inversionsformel für die Exponentialverteilung $F(t) = 1 - e^{-\lambda t}$ lautet über $U = F(T)$:
$$T = -\frac{1}{\lambda} \ln(1 - U) \quad \text{mit } U \in [0, 1)$$
Da $1 - U$ bei $U \in [0, 1)$ im halboffenen Intervall $(0, 1]$ liegt, kann stochastisch äquivalent gesetzt werden:
$$T = -\frac{1}{\lambda} \ln(U_{\text{safe}}) \quad \text{mit } U_{\text{safe}} \in (0, 1]$$
- **Gefahr in C#:** Standard-Generatoren wie `Random.NextDouble()` liefern Werte im Intervall $[0{,}0, 1{,}0)$. Tritt der Fall $U = 0{,}0$ auf, berechnet `Math.Log(0.0)` den IEEE-Wert `-Infinity`. Multipliziert mit $-1/\lambda$ resultiert `+Infinity` $\implies$ Der Simulationskalender wird korrumpiert!
- **Numerisch sichere Implementierung:**
  ```csharp
  // Garantiert U_safe in (0.0, 1.0] und verhindert log(0):
  double u = 1.0 - rng.NextDouble();
  double dt = -Math.Log(u) / lambda;
  ```

### 4.4 Spezifikation Neu-Grafik: `MM1_Warteschlange_Kinetik.svg`
- **Dateipfad:** `Folien/09_Dynamische_Modelle_Diskret/Diagramme/MM1_Warteschlange_Kinetik.svg`
- **Abmessungen:** $960 \times 380\,\mathrm{px}$, Vektorgrafik SVG
- **Didaktisches Ziel:** Visualisierung des kontinuierlichen Markov-Zustandsübergangsmodells (Geburts- und Todesprozess) und Abgrenzung zwischen Systemzustand $N(t)$ und Warteschlange $L_q(t)$.
- **Inhaltliche Komponenten:**
  1. *Zustandskette (Horizontale Kette kreisförmiger Zustände):*
     - Zustand `0`: System leer (Server frei, 0 in der Schlange).
     - Zustand `1`: 1 Kunde im System (Server belegt, 0 in der Schlange).
     - Zustand `2`: 2 Kunden im System (Server belegt, 1 in der Schlange).
     - Zustand `k`: $k$ Kunden im System ($L_q = k - 1$).
     - Zustand `k+1`: $k+1$ Kunden.
  2. *Übergangspfeile mit Raten:*
     - Vorwärts (Ankünfte / Geburt): Pfeile oben von links nach rechts mit Beschriftung $\lambda$ (grün).
     - Rückwärts (Bedienabschluss / Tod): Pfeile unten von rechts nach links mit Beschriftung $\mu$ (blau, aktiv ab Zustand 1).
  3. *Balance-Gleichung & Wahrscheinlichkeitsverteilung:*
     - Flussgleichgewicht: $\lambda P_k = \mu P_{k+1} \implies P_k = (1 - \rho) \rho^k$.
     - Schwellenwert-Indikator: "Stabilität nur für $\rho = \lambda/\mu < 1$".
  4. *Physisches Modell-Schema darunter:*
     - Puffer/Schlange mit Kunden $L_q$.
     - Server/Station mit Bedienrate $\mu$.
     - Ausgang mit bedienten Kunden.

### 4.5 Detaillierter Folienänderungs- und Slide-Split-Plan (Kapitel 09)

#### Maßnahme 09-A: Slide-Split bei der Warteschlangentheorie (Folie 33 $\to$ Folie 33a + 33b)
- **Folie 33a (Neue Folie):** `Warteschlangentheorie: Das Markov-Modell M/M/1`
  - Integration von `MM1_Warteschlange_Kinetik.svg`.
  - Einführung der Kendall-Notation ($M/M/1$).
  - Definition von $\lambda$ [$\mathrm{min^{-1}}$], $\mu$ [$\mathrm{min^{-1}}$] und Auslastung $\rho = \lambda/\mu < 1$.
- **Folie 33b (Überarbeitete Folie):** `Statistische Kennzahlen & Gesetz von Little`
  - Berechnung von $\bar{L}_q$ und $\bar{W}_q$.
  - Little's Gesetz für Warteschlange ($\bar{L}_q = \lambda \bar{W}_q$) und Gesamtsystem ($\bar{L} = \lambda \bar{W}$).
  - Analytischer Vergleich mit Messdaten zur Plausibilisierung.

#### Maßnahme 09-B: Formale Absicherung der Inversionsmethode (Folie 41)
- **Datei:** `Folien/09_Dynamische_Modelle_Diskret/Folien.md`, Zeile 845–857
- **Änderung:** Formaler Warnhinweis zur Definitionsmenge $U \in (0, 1]$ und Vorbeugung von `Math.Log(0)`.

---

## 5. Kapitel 10: Hybride Dynamische Modelle

### 5.1 Audit-Befunde & Maßnahmenübersicht
- **Befund 10.4:** Auf Folie 12 setzt die Zeno-Reihe $\Delta t_k = 2\frac{v_0}{g}e^k$ unangekündigt einen Bodenabschuss ($y_0=0, v_0>0$) voraus. Der Standardfallversuch aus Ruhelage in Höhe $h_0$ erfordert eine korrigierte Summenformel ($t_\infty = \sqrt{2h_0/g}\cdot \frac{1+e}{1-e}$).
- **Befund 10.7:** Bei der Bisektion (Folie 49) fehlen die mathematischen Abbruchbedingungen ($|z| < \varepsilon_z, \Delta t < \varepsilon_t$), die Konvergenzrate $\Delta t_k = \Delta t_0 \cdot 2^{-k}$ und die Schranke $k_{\max}$.
- **Fehlendes Erklär-Bild:** Es existiert kein Diagramm, das die Einkreisung der Nullstelle durch Vorzeichenwechsel-Bisektion im Zeitbereich Schritt für Schritt illustriert.

### 5.2 Zeno-Effekt: Exakte mathematische Korrektur der Fall-Reihe
Je nach Versuchsaufbau ergeben sich zwei unterschiedliche geschlossene Reihen:

1. **Fall 1: Start am Boden mit Anfangsgeschwindigkeit $v_0 > 0$ ($y(0)=0$):**
   - Jede Hüpfphase $k$ ($k=0, 1, 2, \dots$) besteht aus Steig- und Fallzeit: $\Delta t_k = 2 \frac{v_k}{g} = 2 \frac{v_0}{g} e^k$.
   - Zeno-Grenzzeit:
     $$t_\infty = t_0 + \sum_{k=0}^\infty \Delta t_k = t_0 + \frac{2 v_0}{g} \sum_{k=0}^\infty e^k = t_0 + \frac{2 v_0}{g (1 - e)}$$

2. **Fall 2: Fallversuch aus Höhe $h_0$ aus der Ruhe ($y(0)=h_0, v(0)=0$):**
   - Die erste Fallphase bis zum Primäraufprall dauert nur eine halbe Periode:
     $$\Delta t_{\text{fall}, 0} = \sqrt{\frac{2 h_0}{g}}$$
   - Auftreffgeschwindigkeit: $v_1^- = -\sqrt{2 g h_0}$.
   - Rückprallgeschwindigkeit: $v_1^+ = e \sqrt{2 g h_0}$.
   - Nachfolgende Hüpfphasen $k \ge 1$ (Steigen + Fallen): $\Delta t_k = \frac{2 v_k^+}{g} = 2 \sqrt{\frac{2 h_0}{g}} e^k$.
   - Exakte Zeno-Grenzzeit für den Fallversuch:
     $$t_\infty = \Delta t_{\text{fall}, 0} + \sum_{k=1}^\infty \Delta t_k = \sqrt{\frac{2 h_0}{g}} \left(1 + 2 \sum_{k=1}^\infty e^k\right) = \sqrt{\frac{2 h_0}{g}} \left(1 + \frac{2e}{1 - e}\right) = \sqrt{\frac{2 h_0}{g}} \left(\frac{1 + e}{1 - e}\right)$$
   *(Beispiel mit $h_0 = 1{,}0\,\mathrm{m}, g = 9{,}81\,\mathrm{m/s^2}, e = 0{,}75$: Erste Falldauer $\Delta t_0 \approx 0{,}452\,\mathrm{s}$; Zeno-Endzeit $t_\infty = 0{,}452 \cdot \frac{1{,}75}{0{,}25} = 0{,}452 \cdot 7 \approx 3{,}16\,\mathrm{s}$.)*

### 5.3 Bisektion: Nullstelleneinkreisung & Abbruchschranken
Ein robustes hybrides Integrationsframework lokalisiert den Nulldurchgang der Schaltfunktion $z(t)$ über Vorzeichenwechsel-Bisektion:
- **Eingrenzungskriterium:**
  $$\operatorname{sgn}(z(t_{\text{left}})) \neq \operatorname{sgn}(z(t_{\text{right}})) \iff z(t_{\text{left}}) \cdot z(t_{\text{right}}) \le 0$$
- **Halbierungsfolge:** Nach $k$ Schritten beträgt die Intervallbreite:
  $$\Delta t_k = t_{\text{right}}^{(k)} - t_{\text{left}}^{(k)} = \Delta t_0 \cdot 2^{-k} \quad [\mathrm{s}]$$
- **Abbruchkriterien (Duale Toleranzprüfung):**
  1. *Residualtoleranz:* $|z(t_{\text{mid}})| \le \varepsilon_z$ (mit $[\varepsilon_z] = [z]$, z.B. $10^{-6}\,\mathrm{m}$)
  2. *Zeittoleranz:* $\Delta t_k \le \varepsilon_t$ (mit $[\varepsilon_t] = \mathrm{s}$, z.B. $10^{-8}\,\mathrm{s}$)
- **Theoretische Schranke der Iterationsschritte:**
  $$k_{\max} = \left\lceil \log_2\left(\frac{\Delta t_0}{\varepsilon_t}\right) \right\rceil$$
  *(Für einen Schritt $\Delta t_0 = 0{,}01\,\mathrm{s}$ und $\varepsilon_t = 10^{-8}\,\mathrm{s}$ sind maximal $k = 20$ Iterationen garantiert ausreichend).*

### 5.4 Spezifikation Neu-Grafik: `ZeroCrossing_Bisektion_Intervall.svg`
- **Dateipfad:** `Folien/10_Dynamische_Modelle_Hybrid/Diagramme/ZeroCrossing_Bisektion_Intervall.svg`
- **Abmessungen:** $960 \times 420\,\mathrm{px}$, Vektorgrafik SVG
- **Didaktisches Ziel:** Gegenüberstellung der fehlerhaften naiven Zeitschrittschrumpfung (`timeStep /= 2`) und der echten mathematischen Intervallbisektion mit Vorzeichenwechsel.
- **Inhaltliche Komponenten:**
  1. *Funktionskurve $z(t)$:*
     - Blaue Kurve schneidet die Nulllinie $z=0$ an der exakten Stelle $t^*$.
  2. *Schritt 0 (Startintervall):*
     - Klammern bei $t_0$ und $t_0 + \Delta t_0$.
     - Punkt $A$ bei $(t_0, z(t_0) > 0)$, Punkt $B$ bei $(t_0 + \Delta t_0, z(t_0+\Delta t_0) < 0)$.
     - Markierung: $\operatorname{sgn}(z_A) \neq \operatorname{sgn}(z_B) \implies$ Nullstelle sicher enthalten!
  3. *Schritt 1 (Erste Halbierung):*
     - Mittelpunkt $t_{\text{mid}, 1} = \frac{1}{2}(t_0 + t_1)$.
     - $z(t_{\text{mid}, 1}) > 0 \implies$ Linke Schranke rückt nach $t_{\text{mid}, 1}$. Intervallbreite $\Delta t_1 = \Delta t_0 / 2$.
  4. *Schritt 2 (Zweite Halbierung):*
     - Neuer Mittelpunkt $t_{\text{mid}, 2}$. $z(t_{\text{mid}, 2}) < 0 \implies$ Rechte Schranke rückt nach $t_{\text{mid}, 2}$. Intervallbreite $\Delta t_2 = \Delta t_0 / 4$.
  5. *Schritt $k$ (Konvergenz):*
     - Schattiertes Band zieht sich eng um die echte Nullstelle zusammen ($|z| \le \varepsilon_z$).
  6. *Fehlerbox (Warnung):*
     - Durchgestrichene rote Skizze: "Falsche Heuristik: Testet nur $t_0 + \frac{1}{2}\Delta t, t_0 + \frac{1}{4}\Delta t \dots$ und entfernt sich von Nullstellen bei $t > t_0 + 0{,}5\Delta t$!"

### 5.5 Detaillierter Folienänderungs- und Slide-Split-Plan (Kapitel 10)

#### Maßnahme 10-A: Slide-Split Zeno-Phänomen (Folie 12 $\to$ Folie 12a + 12b)
- **Folie 12a:** `Das Zeno-Phänomen: Fallversuch aus Höhe h₀`
  - Analytische Herleitung der Zeno-Reihe für den Fallversuch aus Höhe $h_0$.
  - Endliche Zeno-Grenzzeit $t_\infty = \sqrt{2h_0/g} \cdot \frac{1+e}{1-e}$.
  - Zahlenbeispiel ($h_0=1\,\mathrm{m}, e=0{,}75 \implies t_\infty \approx 3{,}16\,\mathrm{s}$).
- **Folie 12b (Neue Folie):** `Das Zeno-Phänomen: Konsequenzen & Zeno-Kollaps`
  - Chattering und Einfrieren der Simulationsuhr ($\Delta t_k \to 0$).
  - Unendlich viele Events in endlicher Zeit.
  - Überleitung zur Auflösung durch den Sticking Mode auf Folie 13.

#### Maßnahme 10-B: Slide-Split Vorzeichenwechsel-Bisektion (Folie 49 $\to$ Folie 49a + 49b)
- **Folie 49a:** `Echte Vorzeichenwechsel-Bisektion: Theorie & Kriterien`
  - Vorzeichenwechselkriterium $z(t_{\text{left}}) \cdot z(t_{\text{right}}) \le 0$.
  - Toleranzparameter $\varepsilon_z, \varepsilon_t$ mit Einheiten.
  - Schranke für maximale Iterationen $k_{\max} = \lceil \log_2(\Delta t_0/\varepsilon_t) \rceil$.
- **Folie 49b (Neue Folie):** `Visualisierung der Bisektions-Einkreisung`
  - Einbettung des neuen Diagramms `ZeroCrossing_Bisektion_Intervall.svg`.
  - Gegenüberstellung: Naives Schrittweitenhalbieren vs. echte Intervallschachtelung.

---

## 6. Kapitel 11: Epilog & Synthese

### 6.1 Audit-Befunde & Maßnahmenübersicht
- **Befund 11.1:** Auf Folie 5 und in der Taxonomietabelle auf Folie 8 fallen Vektoren und Matrizen in unzulässigen Magersatz zurück ($A \cdot x = b, \dot{x} = f(x,u,t)$).
- **Befund 11.2:** In der Taxonomietabelle (Folie 8) wird für Zero-Crossing plötzlich $g(x) = 0$ notiert, während Kapitel 10 durchgängig $z(\mathbf{x}) = 0$ verwendet und $\mathbf{g}$ für die Ausgangsgleichung reserviert ist.
- **Befund 11.3:** Auf Folie 24 wird der diskrete Schrittzähler mit $k \in \mathbb{N}$ statt $k \in \mathbb{N}_0$ angegeben (schließt $t_0$ bei $k=0$ aus).
- **Befund 11.4:** Auf Folie 25 fehlt bei der Kontaktregularisierung $r_{\text{reg}} = \sqrt{r^2 + \epsilon^2}$ die physikalische SI-Einheit $[\epsilon] = \mathrm{m}$.

### 6.2 ISO-80000-2-Bereinigung: Durchgängiger Fettdruck
Alle mathematischen Gleichungen der Modellübersicht und Taxonomie werden auf ISO-Fettdruck umgestellt:
- **Statische Modelle:** $\mathbf{A}\mathbf{x} = \mathbf{b}$ mit $\mathbf{A} \in \mathbb{R}^{n\times n}, \mathbf{x} \in \mathbb{R}^n, \mathbf{b} \in \mathbb{R}^n$.
- **Kontinuierliche Modelle:** $\dot{\mathbf{x}}(t) = \mathbf{f}(t, \mathbf{x}(t), \mathbf{u}(t))$ mit $\mathbf{x} \in \mathbb{R}^n, \mathbf{u} \in \mathbb{R}^m$.
- **Diskrete Modelle:** $\mathbf{s}_{k+1} = \boldsymbol{\delta}(\mathbf{s}_k, e_k)$ mit $\mathbf{s} \in \mathcal{S}$.
- **Hybride Modelle:** $\dot{\mathbf{x}}_c = \mathbf{f}_m(\mathbf{x}_c, \mathbf{u})$ mit kontinuierlichem Zustand $\mathbf{x}_c \in \mathbb{R}^{n_c}$ und diskretem Betriebsmodus $m \in \mathcal{M}$.

### 6.3 Harmonisierung Zero-Crossing: $z(\mathbf{x}) = 0$
In der Taxonomietabelle auf Folie 8 wird die Nulldurchgangsbedingung korrigiert:
$$\text{Bisher: } g(x) = 0 \implies x^+ \qquad \longrightarrow \qquad \text{Neu: } z(\mathbf{x}_c) = 0 \implies \mathbf{x}_c^+ = \mathbf{h}(\mathbf{x}_c^-)$$
Damit bleibt die Ausgangsgleichung $\mathbf{y} = \mathbf{g}(\mathbf{x}, \mathbf{u})$ überschneidungsfrei getrennt von der Schaltfunktion $z(\mathbf{x}_c)$.

### 6.4 Regularisierungseinheit $[\epsilon] = \mathrm{m}$ & Indexmenge $k \in \mathbb{N}_0$
1. **Zeitschrittakkumulation (Folie 24):**
   $$t_k = t_0 + k \cdot \Delta t \quad \text{mit } k \in \mathbb{N}_0 = \{0, 1, 2, \dots\} \quad \text{und } \Delta t \in \mathbb{R}^+ \ [\mathrm{s}]$$
2. **Singularitätsregularisierung bei Punktkontakten (Folie 25):**
   $$r_{\text{reg}} = \sqrt{r^2 + \epsilon^2} \quad \text{mit Regularisierungsparameter } \epsilon \in \mathbb{R}^+ \ [\mathrm{m}] \quad (\epsilon \ll r_{\text{char}})$$
   - Da der physikalische Abstand $r$ die Einheit Meter trägt ($[r] = \mathrm{m}$), **muss** $\epsilon$ zwingend ebenfalls in Metern angegeben werden ($[\epsilon] = \mathrm{m}$), um Dimensionsreinheit nach DIN 1304 zu gewährleisten.

### 6.5 Detaillierter Folienänderungsplan (Kapitel 11)
- Folie 5 (Zeile 39–65): Ersetzung aller Formeln durch ISO-konforme Vektoren/Matrizen.
- Folie 8 (Zeile 103–113): Tabellenzeile *Mathematik* korrigieren ($\mathbf{A}\mathbf{x} = \mathbf{b}$, $\dot{\mathbf{x}} = \mathbf{f}$, $z(\mathbf{x}_c) = 0 \implies \mathbf{x}_c^+ = \mathbf{h}(\mathbf{x}_c^-)$).
- Folie 24 (Zeile 447–470): Zeitschrittakkumulation auf $k \in \mathbb{N}_0$ korrigieren.
- Folie 25 (Zeile 473–495): Einheit $[\epsilon] = \mathrm{m}$ einfügen und $(\epsilon \ll 1)$ durch $(\epsilon \ll r_{\text{char}})$ ersetzen.
- Folie 26 (Zeile 498–519): Spektralen Radius und Eigenwertdefinition $\omega_{\max} = \max_i |\operatorname{Im}(\lambda_i)|$ deklarieren.

---

## 7. Folienbilanz & Layout-Sicherheitsmatrix (0 Overflow-Garantie)

Um vertikale Überläufe (Vertical Overflow / unerwünschte Scrollbalken in MARP) mathematisch und gestalterisch auszuschließen, folgt die Überarbeitung strengen Layout-Vorgaben:
1. **Folienbegrenzung:** Gesamthöhe 720 px. Bei $26\,\mathrm{px}$ Überschrift und $40\,\mathrm{px}$ Padding verbleiben maximal ca. $580\,\mathrm{px}$ für Text und Grafik.
2. **Textblöcke:** Maximal 6 bis 7 Aufzählungspunkte pro Folie; bei 2-Spalten-Layouts (`columns`) maximal 5 Punkte je Spalte.
3. **Grafikskalierung:** Bilder in 2-Spalten-Layouts werden mit `h:380px` bis `h:420px` bzw. `w:500px` begrenzt. Großformatige Vollbreiten-Grafiken erhalten maximal `h:420px center`.

### Übersicht der Folienanzahlen vor und nach der Überarbeitung:

| Kapitel | Bisherige Folien | Durchgeführte Slide-Splits | Neue Folien | Künftige Folien | Gefährdete Folien (Overflow-Check) | Layout-Status |
| :--- | :---: | :--- | :---: | :---: | :--- | :---: |
| **07 Statische Modelle** | 58 | F. 28 $\to$ F. 28a + 28b (LGS-Partitionierung) | +1 | **59** | F. 28b, F. 45 | Sicher (Geprüft) |
| **08 Dynamik Kontinuierlich** | 83 | F. 6 $\to$ F. 6a + 6b (LTI-Zustandsraum)<br>F. 77 $\to$ F. 77a + 77b (DC-Motor Herleitung) | +2 | **85** | F. 6b, F. 77a, F. 79 | Sicher (Geprüft) |
| **09 Dynamik Diskret** | 67 | F. 33 $\to$ F. 33a + 33b (M/M/1 Kinetik & Little) | +1 | **68** | F. 33a, F. 41 | Sicher (Geprüft) |
| **10 Dynamik Hybrid** | 76 | F. 12 $\to$ F. 12a + 12b (Zeno-Fallversuch)<br>F. 49 $\to$ F. 49a + 49b (Bisektions-Visualisierung) | +2 | **78** | F. 12a, F. 49b | Sicher (Geprüft) |
| **11 Epilog & Synthese** | 47 | Keine Splits (In-Place-Harmonisierung) | 0 | **47** | F. 5, F. 8, F. 25 | Sicher (Geprüft) |
| **Gesamt (Kap. 07–11)** | **331** | **6 Slide-Splits** | **+6** | **337** | **12 Schlüsselstellen** | **100 % Konform** |

---

## 8. Grafik- und Diagrammspezifikation (Übersichtstabelle)

Zur Unterstützung der überarbeiteten mathematischen Inhalte werden vier neue, didaktisch fokussierte SVG-Grafiken spezifiziert:

| Nr. | Zieldatei (Relativer Pfad) | Abmessungen | Typ | Dargestellte Fachinhalte | Ziel-Folie |
| :---: | :--- | :---: | :---: | :--- | :---: |
| **G-07** | `Folien/07_Statische_Modelle/Diagramme/LGS_Partitionierung_Matrix.svg` | $960 \times 440\,\mathrm{px}$ | SVG | $2\times 2$-Blockmatrix $\mathbf{K}$, Vektoren $\mathbf{u}_f, \mathbf{u}_p=\mathbf{0}$, Streichung der Auflagerblöcke zu $\mathbf{K}_{ff}\mathbf{u}_f = \mathbf{f}_f$, Berechnung von $\mathbf{f}_p$. | Folie 28a |
| **G-08** | `Folien/08_Dynamische_Modelle_Kontinuierlich/Diagramme/DC_Motor_Ersatzschaltbild.svg` | $960 \times 400\,\mathrm{px}$ | SVG | Elektrischer Ankerkreis ($u, R, L, i, u_{\text{ind}}$), elektromechanische Wandlung ($M=k_m i, u_{\text{ind}}=k_e \omega$), mechanischer Rotor ($J, d, \omega$). | Folie 77a |
| **G-09** | `Folien/09_Dynamische_Modelle_Diskret/Diagramme/MM1_Warteschlange_Kinetik.svg` | $960 \times 380\,\mathrm{px}$ | SVG | Markov'sche Zustandskette (Geburts-Todes-Prozess) mit Übergangsraten $\lambda$ und $\mu$, Puffer $L_q$, Serverauslastung $\rho = \lambda/\mu < 1$. | Folie 33a |
| **G-10** | `Folien/10_Dynamische_Modelle_Hybrid/Diagramme/ZeroCrossing_Bisektion_Intervall.svg` | $960 \times 420\,\mathrm{px}$ | SVG | Zeitachse mit Vorzeichenwechsel $z(t_a)\cdot z(t_b) \le 0$, schrittweise Intervallhalbierung $[t_a, t_b] \to [t_{\text{mid}}, t_b]$, Schranke $\varepsilon_z$, Gegenüberstellung mit naiver Schrumpfung. | Folie 49b |

### Farb- und Styling-Vorgaben für alle SVG-Grafiken:
- **Hintergrund:** Transparent oder reines Weiß (`#FFFFFF`).
- **Primärfarbe (FH OÖ Blau):** `#003366` bzw. `#005A9C` für Systemrahmen, Hauptachsen und Überschriften.
- **Akzentfarben:**
  - Signalgrün (`#2E7D32`): Erlaubte / stabile Zustände, Konvergenz, Vorwärtsraten $\lambda$.
  - Signalrot (`#C62828`): Instabilitäten, Sättigungsgrenzen, Fehlerraten, unzulässige Heuristiken.
  - Bernsteingelb (`#F57F17`): Schwellenwerte, Toleranzbänder, Umschaltpunkte.
- **Typografie:** Serifenlose Systemschriftart (`Segoe UI`, `Arial`, `Helvetica`), Mindestschriftgröße für Labels $14\,\mathrm{px}$, Formeln in klar lesbarer Kursiv-/Fettschrift.

---

*Fachplan 03 erfolgreich erstellt und zur Umsetzung freigegeben.*
