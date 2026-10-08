# Operativer Überarbeitungsplan: Grundlagen, 2D/3D-Visualisierung & Multithreading (Kapitel 00 bis 06)
## Fachlicher Implementierungs- und Layoutplan zur Beseitigung aller Audit-Mängel

**Dokument-ID:** `Planung/Plan_02_Kapitel_00_bis_06.md`  
**Geltungsbereich:** Vorlesungsfolien und Diagramme der Kapitel 00 bis 06:
- `Folien/00_Prolog/Folien.md`
- `Folien/01_Einführung/Folien.md`
- `Folien/02_Visualisierung_2D_Pixel/Folien.md`
- `Folien/03_Visualisierung_2D_Vektor/Folien.md`
- `Folien/04_Visualisierung_2D_Diagramme/Folien.md`
- `Folien/05_Visualisierung_3D_OpenGL/Folien.md`
- `Folien/06_Multithreading/Folien.md`  
**Referenzdokumente:**
- `Reviews/Audit_Variablen_01_Grundlagen.md`
- `Reviews/Audit_Variablen_02_Visualisierung_Statik.md`
- `Planung/Plan_01_Notationsstandard_und_Harmonisierung.md`
- `GEMINI.md` (MARP-Vorgaben & fhooe Theme)  
**Datum:** 8. Oktober 2026  
**Autor:** Planer 2 (Fach- und Layout-Architekt Grundlagen & Visualisierung, FH Oberösterreich)  
**Status:** Operativ freigegeben zur direkten Umsetzung

---

## Inhaltsverzeichnis

1. [Executive Summary & Operative Zielsetzung](#1-executive-summary--operative-zielsetzung)
2. [Kapitelspezifische Überarbeitungsmaßnahmen](#2-kapitelspezifische-überarbeitungsmaßnahmen)
   - [2.1 Kapitel 00: Prolog](#21-kapitel-00-prolog)
   - [2.2 Kapitel 01: Einführung](#22-kapitel-01-einführung)
   - [2.3 Kapitel 02: 2D-Visualisierung (Pixel & Raster)](#23-kapitel-02-2d-visualisierung-pixel--raster)
   - [2.4 Kapitel 03: 2D-Visualisierung (Vektor & Geometrie)](#24-kapitel-03-2d-visualisierung-vektor--geometrie)
   - [2.5 Kapitel 04: 2D-Visualisierung (Diagramme & Graphen)](#25-kapitel-04-2d-visualisierung-diagramme--graphen)
   - [2.6 Kapitel 05: 3D-Visualisierung (OpenGL & Kinematik)](#26-kapitel-05-3d-visualisierung-opengl--kinematik)
   - [2.7 Kapitel 06: Multithreading & Parallele Simulation](#27-kapitel-06-multithreading--parallele-simulation)
3. [Detaillierte Spezifikation der neuen Erklär-Bilder (SVG)](#3-detaillierte-spezifikation-der-neuen-erklär-bilder-svg)
   - [3.1 Spezifikation: Schiefer_Wurf_Kraefte.svg (Kapitel 01)](#31-spezifikation-schiefer_wurf_kraeftesvg-kapitel-01)
   - [3.2 Spezifikation: Amdahlsches_Gesetz_Speedup.svg (Kapitel 06)](#32-spezifikation-amdahlsches_gesetz_speedupsvg-kapitel-06)
4. [Folienanzahl-Bilanz & Slide-Split-Strategie](#4-folienanzahl-bilanz--slide-split-strategie)
   - [4.1 Quantitative Folienbilanz](#41-quantitative-folienbilanz)
   - [4.2 Detaillierte Begründung aller Slide-Splits](#42-detaillierte-begründung-aller-slide-splits)
   - [4.3 MARP-Layout-Sicherheitsregeln (fhooe Theme)](#43-marp-layout-sicherheitsregeln-fhooe-theme)
5. [Arbeitsanweisungen für den Umsetzungs-Agenten](#5-arbeitsanweisungen-für-den-umsetzungs-agenten)

---

## 1. Executive Summary & Operative Zielsetzung

Die tiefgehenden Reviews `Reviews/Audit_Variablen_01_Grundlagen.md` und `Reviews/Audit_Variablen_02_Visualisierung_Statik.md` haben offengelegt, dass die ersten sieben Kapitel (Kapitel 00 bis 06) trotz hoher programmiertechnischer Qualität erhebliche Mängel in der mathematisch-physikalischen Stringenz aufweisen:
1. **Fundamentale Theorielücke in Kapitel 06 (Multithreading):** Es fehlt die gesamte theoretische Fundierung paralleler Algorithmen (Speedup, Parallele Effizienz, Amdahlsches Gesetz, Gustafsonsches Gesetz). Studierende lernen parallele C#-Konstrukte, ohne quantitative Grenzen verstehen oder berechnen zu können.
2. **Totalausfall von Deklarationen und Einheiten in Kapitel 01:** Beim freien Fall und beim schiefen Wurf mit Luftwiderstand werden komplexe Formeln präsentiert, ohne die physikalischen Größen ($y_0, v_0, g, \alpha, c_w, \rho, A, \vec{v}$) zu definieren oder SI-Einheiten zuzuordnen.
3. **Diskrepanzen zwischen mathematischen Formeln und Vektorgrafiken:** In Kapitel 03 stimmen die Formelsymbole der Pfeilspitzenberechnung nicht mit dem SVG-Diagramm überein.
4. **Fehlende Material- und Gitterdefinitionen:** In Kapitel 02 fehlen die thermodynamischen Stoffwerte ($\lambda, \rho, c, \alpha$) sowie die Gitter- und Zeitschrittindizes des FDM-Verfahrens.
5. **Veraltete und informelle Nomenklatur:** In Kapitel 00 werden Quantoren fälschlicherweise als Operatoren bezeichnet; in Kapitel 05 werden informelle String-Variablen (`light_a`, `material_a`) statt normierter DIN-Formelzeichen im Phong-Modell verwendet.

Dieser Plan definiert die **exakten Folientexte, Slide-Splits, Formeln, Einheiten und Diagrammspezifikationen**, um alle 7 Kapitel in einen exzellenten, normkonformen Zustand nach DIN 1304 und ISO 80000-2 zu überführen.

---

## 2. Kapitelspezifische Überarbeitungsmaßnahmen

### 2.1 Kapitel 00: Prolog (`Folien/00_Prolog/Folien.md`)

#### Ist-Zustand & Mängel:
- **Folie 3 (`Logik`):** Die Termini „Schwache Implikation“ und „Starke Implikation“ sind mathematisch unüblich. Unvollständige Benennung der Junktoren.
- **Folie 4 (`Mengenlehre`):** Verwechslung von Relationen, Operationen und Prädikatenquantoren: $\forall, \exists, \nexists$ werden fälschlicherweise als *„Elementoperatoren“* tituliert. $\mathcal{P}(\cdot)$ ohne Mengenangabe.

#### Operative Maßnahmen:
1. **Folie 3 überarbeiten:**
   - Ersetzung durch mathematisch standardisierte Fachterminologie (Aussagenvariablen, Wahrheitswerte, Negation, Konjunktion, Disjunktion, Konditional/Implikation, Bikonditional/Äquivalenz).
   - Layout-Sicherheit: Das Bild `![bg right](./Illustrationen/Logik.png)` belegt 50% der Folienbreite. Die Stichpunkte werden prägnant formatiert, um Überlauf zu vermeiden.
2. **Folie 4 überarbeiten:**
   - Saubere Trennung von Grundmengen, Elementrelation ($\in, \notin$), Prädikatenquantoren ($\forall, \exists, \nexists$), Mengenoperationen ($\cup, \cap, \setminus, \times$) und Relationen ($\subseteq, \subset$).
   - Layout-Sicherheit: Bei `![bg contain right:35%](./Illustrationen/Mengenlehre.png)` bleibt 65% Breite; 6 strukturierte Bulletpoints passen exakt ohne Split.

#### Exakter Ziel-Markdown Folie 3 & Folie 4:

```markdown
![bg right](./Illustrationen/Logik.png)

### Logik

Formalisierung der Prinzipien mathematischer Beweisführung:

- **Wahrheitswerte:** $\mathrm{true}$ ($t$, wahr, $1$) und $\mathrm{false}$ ($f$, falsch, $0$)
- **Negation (unär):** $\neg A$ (Nicht-Operator)
- **Junktoren (binär):** Konjunktion $A \wedge B$ (Und), Disjunktion $A \vee B$ (Oder)
- **Konditional (Implikation):** $A \Rightarrow B$ (Wenn $A$, dann $B$; hinreichende Bedingung)
- **Bikonditional (Äquivalenz):** $A \Leftrightarrow B$ (Genau dann, wenn; logische Gleichheit)

---

![bg contain right:35%](./Illustrationen/Mengenlehre.png)

### Mengenlehre

Untersuchung von Mengen als Sammlungen von Objekten:

- **Grundmengen:** Leere Menge $\emptyset$, Potenzmenge $\mathcal{P}(M) = \{U \mid U \subseteq M\}$
- **Elementrelation:** $x \in M$ (Element von), $x \notin M$ (kein Element von)
- **Prädikatenquantoren:** $\forall$ (Allquantor: „für alle“), $\exists$ (Existenzquantor: „es existiert“), $\nexists$ („existiert nicht“)
- **Mengenoperationen:** Vereinigung $A \cup B$, Schnitt $A \cap B$, Differenz $A \setminus B$, kartesisches Produkt $A \times B$
- **Mengenrelationen:** Teilmenge $A \subseteq B$, echte Teilmenge $A \subset B$
- **Geordnetes Tupel:** $(a, b) \in A \times B$
```

---

### 2.2 Kapitel 01: Einführung (`Folien/01_Einführung/Folien.md`)

#### Ist-Zustand & Mängel:
- **Folie 18 (`Analytische Lösung`):** Freier Fall $y(t) = y_0 + v_0 t - \frac{1}{2} g t^2$ ohne Deklaration von $y(t), y_0, v_0, g, t$ und ohne SI-Einheiten.
- **Folie 19 (`Numerische Lösung`):** Euler-Verfahren $y_{k+1} = y_k + \Delta t \cdot f(t_k, y_k)$ ohne Zeitschrittindex $k \in \mathbb{N}_0$, Zeitgitter $t_k$ und ohne Zeitschritt-Einheit [s].
- **Folie 20 (`Analytisch vs. Numerisch: Ein Beispiel`):** 2-Spalten-Folie mit Schiefem Wurf. Es fehlen Abwurfwinkel $\alpha$, Geschwindigkeitszerlegung $v_{0x}, v_{0y}$, Strömungsparameter $c_w, \rho, A, \|\vec{v}\|$ und sämtliche SI-Einheiten. Der Versuch, all dies in einer 2-Spalten-Folie unterzubringen, führt zum vertikalen Layout-Kollaps.

#### Operative Maßnahmen:
1. **Folie 18 (Freier Fall):** Vollständige Variablendeklaration mit SI-Einheiten direkt unter die Formel einfügen.
2. **Folie 19 (Euler-Verfahren):** Formale Einführung des Zeitgitters $t_k = t_0 + k\Delta t$ und des diskreten Zustands $y_k \approx y(t_k)$.
3. **Folie 20 aufspalten (Slide-Split):**
   - **Folie 20a:** *Analytische Modellierung: Der ungedämpfte schiefe Wurf* (Parabelbahn, Zerlegung $\vec{v}_0$ in $v_{0x}, v_{0y}$, geschlossene Stammfunktion, Einheiten).
   - **Folie 20b:** *Numerische Modellierung: Schiefer Wurf mit Luftwiderstand* (Aerodynamischer Widerstand $\vec{F}_R$, Komponenten $F_{Rx}, F_{Ry}$, DGL-System 2. Ordnung, Parameter $c_w, \rho, A, \|\vec{v}\|$, Einbettung des neuen Diagramms).
4. **Neues SVG-Diagramm einbinden:** `Folien/01_Einführung/Diagramme/Schiefer_Wurf_Kraefte.svg`.

#### Exakter Ziel-Markdown Folie 18 bis Folie 20b:

```markdown
### **Analytische** Lösung

- **Was ist das?** Eine exakte, geschlossene mathematische Formel für die Lösung als kontinuierliche Zeitfunktion.
- **Beispiel (Freier Fall mit Anfangsgeschwindigkeit):**
  $$y(t) = y_0 + v_0 \cdot t - \frac{1}{2} g \cdot t^2$$
  - $y(t)$: Momentane Höhe zur Zeit $t$ $[\mathrm{m}]$
  - $t$: Zeit $[\mathrm{s}]$, $y_0$: Anfangshöhe bei $t=0\,\mathrm{s}$ $[\mathrm{m}]$
  - $v_0$: Vertikale Anfangsgeschwindigkeit $[\mathrm{m/s}]$
  - $g \approx 9{,}81\,\mathrm{m/s^2}$: Erdbeschleunigung
- **Vorteile:** Exakt, unendliche zeitliche Auflösung, geschlossene Parameterstudien möglich.
- **Nachteile:** Nur für einfache, meist lineare Modelle existieren geschlossene Stammfunktionen.

---

### **Numerische** Lösung

- **Was ist das?** Eine schrittweise, approximative Berechnung des Systemzustands auf einem diskreten Zeitgitter.
- **Beispiel (Explizites Euler-Verfahren für $y'(t) = f(t, y)$):**
  $$y_{k+1} = y_k + \Delta t \cdot f(t_k, y_k), \quad t_{k+1} = t_k + \Delta t$$
  - $k \in \{0, 1, 2, \dots\}$: Diskreter Zeitschrittindex
  - $t_k = t_0 + k \cdot \Delta t$: Diskrete Zeitpunkte $[\mathrm{s}]$ mit Zeitschrittweite $\Delta t$ $[\mathrm{s}]$
  - $y_k \approx y(t_k)$: Diskreter Näherungswert des Zustands
- **Vorteile:** Universell auf hochgradig nichtlineare und gekoppelte Systeme anwendbar.
- **Nachteile:** Approximationsfehler (Diskretisierungs- und Rundungsfehler); Wahl von $\Delta t$ entscheidet über Stabilität und Konvergenz.

---

### Analytische Modellierung: Ungedämpfter schiefer Wurf

<div class="columns top">
<div class="one">

**Problemstellung:**
Massepunkt im Gravitationsfeld ohne atmosphärische Dämpfung.

- **Anfangsbedingungen ($t=0\,\mathrm{s}$):**
  - Position: $\vec{r}_0 = (0, y_0)^T$ mit Anfangshöhe $y_0$ $[\mathrm{m}]$
  - Geschwindigkeit: Betrag $v_0$ $[\mathrm{m/s}]$, Abwurfwinkel $\alpha \in [0^\circ, 90^\circ]$
  - Vektorzerlegung:
    $$v_{0x} = v_0 \cos(\alpha), \quad v_{0y} = v_0 \sin(\alpha) \quad [\mathrm{m/s}]$$

**Analytische Trajektorie:**
$$x(t) = v_{0x} \cdot t, \quad y(t) = y_0 + v_{0y} \cdot t - \frac{1}{2} g \cdot t^2$$
Geschlossene Formeln für Steighöhe, Wurfweite und Flugdauer direkt auflösbar ($g \approx 9{,}81\,\mathrm{m/s^2}$).

</div>
<div class="one">

![w:420](./Diagramme/Schiefer_Wurf_Kraefte.svg)

</div>
</div>

---

### Numerische Modellierung: Schiefer Wurf mit Luftwiderstand

<div class="columns top">
<div class="one">

**Einfluss des Strömungswiderstands:**
In realen Medien bremst die turbulente Reibungskraft $\vec{F}_R$ $[\mathrm{N}]$ antiparallel zum Geschwindigkeitsvektor $\vec{v}$:

$$\vec{F}_R = -\frac{1}{2} c_w \rho A \|\vec{v}\| \vec{v}$$

- $c_w$: Strömungswiderstandsbeiwert $[-]$
- $\rho$: Fluiddichte (Luft: $\rho \approx 1{,}2\,\mathrm{kg/m^3}$)
- $A$: Stirn- bzw. Querschnittsfläche $[\mathrm{m^2}]$
- $\vec{v} = (v_x, v_y)^T$: Momentangeschwindigkeit $[\mathrm{m/s}]$
- $\|\vec{v}\| = \sqrt{v_x^2 + v_y^2}$: Geschwindigkeitsbetrag $[\mathrm{m/s}]$

</div>
<div class="one">

**Gekoppeltes DGL-System 2. Ordnung:**
$$m \ddot{x} = F_{Rx} = -\frac{1}{2} c_w \rho A \sqrt{v_x^2 + v_y^2} \cdot v_x$$
$$m \ddot{y} = -m g + F_{Ry} = -m g - \frac{1}{2} c_w \rho A \sqrt{v_x^2 + v_y^2} \cdot v_y$$

- **Nichtlineare Geschwindigkeitskopplung:** $v_x$ und $v_y$ koppeln im Term $\sqrt{v_x^2+v_y^2}$ miteinander.
- **Folge:** Keine elementare geschlossene Stammfunktion möglich!
- **Lösung:** Numerische Zeitschrittintegration (z.B. Runge-Kutta oder Euler).

</div>
</div>
```

---

### 2.3 Kapitel 02: 2D-Visualisierung (Pixel & Raster) (`Folien/02_Visualisierung_2D_Pixel/Folien.md`)

#### Ist-Zustand & Mängel:
- **Folie 4:** Fehlende physikalische Dimensionen bei Skalarfeldern $T, p, c$.
- **Folie 7 (`Stride`):** Fehlende Kennzeichnung der Byte-Einheiten und Bilddimensionen.
- **Folie 23 (`2D-Wärmeleitungsgleichung`):** Thermodynamische Stoffwerte $\lambda, \rho, c$ sind nicht deklariert; Quellterm $Q(x,y,t)$ besitzt keine SI-Einheit (muss $[\mathrm{K/s}]$ lauten); Laplace-Operator $\Delta$ ohne Dimension $[1/\mathrm{m^2}]$.
- **Folie 24 (`FDM-Diskretisierung`):** Raumgitter-Indizes $i, j$, Zeitgitter $t_n = n\Delta t$, Zeitschrittindex $n$, Fourier-Zahl $s = \frac{\alpha\Delta t}{h^2}$ nicht normkonform formalisiert.
- **Folie 26 (`Dirichlet vs. Neumann`):** Fehlende Deklaration des Normalenvektors $\vec{n}$, der Wärmestromdichte $\dot{q}''$ $[\mathrm{W/m^2}]$ und der Ghost-Cell $T_{-1,j}$.

#### Operative Maßnahmen:
1. **Folie 4 & 7:** Präzisierung der SI-Einheiten und Byte-Formeln ($W, H$ in $[\mathrm{px}]$, Stride in $[\mathrm{Bytes}]$).
2. **Folie 23 überarbeiten:** Vollständige, tabellarische Aufschlüsselung der Stoffwerte und des Quellterms inklusive physikalischer Dimensionskontrolle.
3. **Folie 24 überarbeiten:** Diskrete Indizes $i, j \in \mathbb{N}_0$, Zeitindex $n$, Laplace-Differenzensumme $L_{i,j}^n$ und die dimensionslose Fourier-Zahl $\mathrm{Fo}_\Delta = s$ sauber deklarieren.
4. **Folie 26 überarbeiten:** Dirichlet- und Neumann-Randbedingungen normkonform mit Normalenvektor und Ghost-Cell-Gleichung formalisieren.

#### Exakter Ziel-Markdown Folie 23 & Folie 24:

```markdown
### Die physikalische 2D-Wärmeleitungsgleichung

Die Ausbreitung von Wärme in einem homogenen, isotropen Festkörper genügt der parabolischen Diffusions-PDE:

$$\frac{\partial T}{\partial t} = \alpha \cdot \Delta T + Q(x, y, t)$$

| Symbol | Physikalische Größe | SI-Einheit | Erläuterung / Zusammenhang |
| :--- | :--- | :---: | :--- |
| $T(x,y,t)$ | Temperaturfeld | $\mathrm{K}$ (bzw. ${}^\circ\mathrm{C}$) | Zustand an Ort $(x,y)$ und Zeit $t$ $[\mathrm{s}]$ |
| $\alpha$ | **Temperaturleitfähigkeit** | $\mathrm{m^2/s}$ | $\alpha = \frac{\lambda}{\rho \cdot c}$ (thermische Diffusivität) |
| $\lambda$ | Wärmeleitfähigkeit | $\mathrm{W/(m\cdot K)}$ | Stoffwert des Materials (Fourier-Gesetz) |
| $\rho$ | Materialdichte | $\mathrm{kg/m^3}$ | Spezifische Masse des Mediums |
| $c$ | Spezifische Wärmekapazität | $\mathrm{J/(kg\cdot K)}$ | Thermisches Speichervermögen |
| $\Delta$ | Laplace-Operator | $\mathrm{1/m^2}$ | $\Delta = \nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2}$ (Krümmung des Feldes) |
| $Q(x,y,t)$ | **Wärmequellrate** | $\mathrm{K/s}$ | $Q = \frac{\dot{q}_V}{\rho \cdot c}$ mit volumetrischem Wärmestrom $\dot{q}_V$ $[\mathrm{W/m^3}]$ |

*(Dimensionskontrolle Diffusivität: $\frac{\mathrm{W/(m\cdot K)}}{\mathrm{kg/m^3} \cdot \mathrm{J/(kg\cdot K)}} = \frac{(\mathrm{J/s}) / (\mathrm{m\cdot K})}{\mathrm{J/(m^3\cdot K)}} = \frac{\mathrm{m^2}}{\mathrm{s}}$).*

---

### Diskretisierung mit Finiten Differenzen

<div class="columns">
<div class="two">

Diskretisierung auf gleichmäßigem 2D-Raumgitter ($x_i = i \cdot h, y_j = j \cdot h$ mit $h = \Delta x = \Delta y$ $[\mathrm{m}]$) und Zeitgitter ($t_n = n \cdot \Delta t$ $[\mathrm{s}]$):

- **Zustand an Zelle $(i, j)$ zur Zeitstufe $n$:** $T_{i,j}^n \approx T(x_i, y_j, t_n)$ $[\mathrm{K}]$
- **Räumlicher 5-Punkt-Differenzenstern:**
  $$\nabla^2 T_{i,j}^n \approx \frac{T_{i+1,j}^n + T_{i-1,j}^n + T_{i,j+1}^n + T_{i,j-1}^n - 4 T_{i,j}^n}{h^2} \quad \left[\frac{\mathrm{K}}{\mathrm{m^2}}\right]$$
- **Explizites Zeitschrittschema mit Fourier-Zahl $s$ (dimensionslos):**
  $$L_{i,j}^n = T_{i+1,j}^n + T_{i-1,j}^n + T_{i,j+1}^n + T_{i,j-1}^n - 4 T_{i,j}^n \quad [\mathrm{K}]$$
  $$T_{i,j}^{n+1} = T_{i,j}^n + s \cdot L_{i,j}^n + \Delta t \cdot Q_{i,j}^n \quad [\mathrm{K}], \quad \text{mit } s = \frac{\alpha \cdot \Delta t}{h^2} \le 0{,}25$$

</div>
<div class="one">

![w:340](./Diagramme/FDM_5_Punkt_Stern.svg)

**5-Punkt-Differenzenstern:**  
Wärme diffundiert in einem Zeitschritt ausschließlich zu den 4 direkten Nachbarzellen.

</div>
</div>
```

---

### 2.4 Kapitel 03: 2D-Visualisierung (Vektor & Geometrie) (`Folien/03_Visualisierung_2D_Vektor/Folien.md`)

#### Ist-Zustand & Mängel:
- **Folie 8 & 9:** Der Skalierungsfaktor $s$ wird fälschlicherweise als dimensionslos suggeriert, obwohl er $[\mathrm{px/m}]$ abbildet.
- **Folie 10:** Offsets und Bildschirmkoordinaten ohne Einheitenangaben.
- **Folie 15 (`Analytische Berechnung der Pfeilspitze`):** Gravierende Symbol-Diskrepanz zur Vektorgrafik `Pfeilspitzengeometrie_2D.svg`. Der Basispunkt $\vec{P}_{\text{base}}$ fehlt im Folientext völlig; Flügelpunkte heißen $\vec{P}_1, \vec{P}_2$ statt $\vec{P}_{\text{wing1}}, \vec{P}_{\text{wing2}}$; Kraftskalierung $s_F$ $[\mathrm{px/N}]$ fehlt.
- **Folie 22 (`ScreenToWorld`):** Enthält ausschließlich C#-Code, aber keine formale zweistufige mathematische Umkehrfunktion.

#### Operative Maßnahmen:
1. **Folie 8, 9 & 10 überarbeiten:** Skalierungsfaktor $s$ mit expliziter Einheit $[\mathrm{px/m}]$ deklarieren; Weltabmessungen $[\mathrm{m}]$ und Pixelabmessungen $[\mathrm{px}]$ strikt trennen.
2. **Folie 15 überarbeiten:** Formeln buchstabengetreu mit `Pfeilspitzengeometrie_2D.svg` und dem C#-Quellcode synchronisieren ($\vec{P}_{\text{node}}, \vec{P}_{\text{tip}}, \vec{P}_{\text{base}}, \vec{P}_{\text{wing1,2}}, \vec{e}_u, \vec{e}_u^\perp, s_F$).
3. **Folie 22 aufspalten (Slide-Split):**
   - **Folie 22a (Neu):** *Analytische Rücktransformation: Bildschirm zu Welt* (Zweistufige mathematische Formulierung: 1. Invertierung der affinen Pan/Zoom-Matrix $\mathbf{M}^{-1}$, 2. Invertierung der Viewport-Projektion von $[\mathrm{px}]$ nach $[\mathrm{m}]$).
   - **Folie 22b:** *C#-Implementierung: ScreenToWorld* (Der C#-Codeblock erhält die volle Folienhöhe und wird dadurch perfekt lesbar ohne Zeilenstauchung).

#### Exakter Ziel-Markdown Folie 15 & Folie 22a/b:

```markdown
### Analytische Berechnung der Pfeilspitze

<div class="columns top">
<div class="two">

Gegeben: Knoten $\vec{P}_{\text{node}}$ $[\mathrm{px}]$, Kraftvektor $\vec{F} = (F_x, F_y)^T$ $[\mathrm{N}]$, Kraftmaßstab $s_F$ $[\mathrm{px/N}]$, Spitzenmaße $L$ (Länge) und $W$ (Breite) $[\mathrm{px}]$.

1. **Pfeilspitze:** $\vec{P}_{\text{tip}} = \vec{P}_{\text{node}} + s_F \cdot \vec{F}_{\text{screen}} \quad [\mathrm{px}]$
2. **Normierter Richtungs-Einheitsvektor $\vec{e}_u$:**
   $$\vec{e}_u = \frac{\vec{F}}{\|\vec{F}\|} = \frac{1}{\sqrt{F_x^2 + F_y^2}} \begin{pmatrix} F_x \\ F_y \end{pmatrix} \quad (\|\vec{e}_u\| = 1)$$
3. **Orthogonalvektor $\vec{e}_u^\perp$ ($90^\circ$-Drehung links):** $\vec{e}_u^\perp = (-e_{u,y}, e_{u,x})^T$
4. **Basispunkt & Flügelpunkte des Dreiecks $[\mathrm{px}]$:**
   $$\vec{P}_{\text{base}} = \vec{P}_{\text{tip}} - L \cdot \vec{e}_u$$
   $$\vec{P}_{\text{wing1,2}} = \vec{P}_{\text{base}} \pm \frac{W}{2} \cdot \vec{e}_u^\perp$$

</div>
<div class="one">

![w:380](./Diagramme/Pfeilspitzengeometrie_2D.svg)

</div>
</div>

---

### Analytische Rücktransformation: Bildschirm zu Welt

Für interaktive Eingaben (z.B. Knotenanklicken, Lasten aufbringen) muss ein Bildschirmpixel $\vec{p}_{\text{pixel}} = (x_{\text{pixel}}, y_{\text{pixel}})^T$ $[\mathrm{px}]$ in Weltkoordinaten $\vec{p}_w = (x_w, y_w)^T$ $[\mathrm{m}]$ rücktransformiert werden:

1. **Invertierung von Pan und Zoom (Affine Transformationsmatrix $\mathbf{M} \in \mathbb{R}^{3 \times 3}$):**
   $$\begin{pmatrix} x_{\text{unzoomed}} \\ y_{\text{unzoomed}} \\ 1 \end{pmatrix} = \mathbf{M}^{-1} \begin{pmatrix} x_{\text{pixel}} \\ y_{\text{pixel}} \\ 1 \end{pmatrix} \quad [\mathrm{px}]$$

2. **Invertierung der Viewport-Projektion ($[\mathrm{px}] \to [\mathrm{m}]$):**
   $$x_w = X_{\min} + \frac{x_{\text{unzoomed}} - x_{\text{offset}}}{s} \quad [\mathrm{m}]$$
   $$y_w = Y_{\max} - \frac{y_{\text{unzoomed}} - y_{\text{offset}}}{s} \quad [\mathrm{m}] \quad (\text{Rückkehr zur physikalischen Y-Achse!})$$

*(Einheitenkontrolle: $\frac{[\mathrm{px}] - [\mathrm{px}]}{[\mathrm{px/m}]} = [\mathrm{m}]$; mathematisch exakte Umkehrung der Vorwärtstransformation).*

---

### C#-Implementierung: ScreenToWorld

```csharp
public Point ScreenToWorld(
    Point screenPixel, Matrix canvasMatrix, CoordinateTransformer trans)
{
    // 1. Pan- und Zoom-Matrix invertieren (WPF-Affine Transformation)
    Matrix invMatrix = canvasMatrix;
    invMatrix.Invert();
    Point unzoomed = invMatrix.Transform(screenPixel);

    // 2. Viewport-Projektion analytisch invertieren (Pixel -> Meter):
    double worldX = _xMin + (unzoomed.X - _xOffset) / _scale;
    double worldY = _yMax - (unzoomed.Y - _yOffset) / _scale; // Y-Achse invertieren

    return new Point(worldX, worldY);
}
```

- Liefert präzise physikalische Koordinaten $[\mathrm{m}]$ für Raycasting, Picking und Hit-Testing.
- Unabhängig von aktuellem Zoom-Faktor oder Pan-Verschiebung exakt.
```

---

### 2.5 Kapitel 04: 2D-Visualisierung (Diagramme & Graphen) (`Folien/04_Visualisierung_2D_Diagramme/Folien.md`)

#### Ist-Zustand & Mängel:
- **Folie 50:** Systemzustands-DGL $\dot{x} = f(x, u, t)$ ohne Dimensions- und Vektordeklarationen.
- **Folie 166 & 189:** Äquidistantes Sampling $t_i = t_0 + i\Delta t$ und Indexsuche per Gaußklammer $\lfloor\cdot\rfloor$ ohne Einheiten und mathematische Definition.
- **Folie 276/277 (`Dichtefunktionen und Box-Plots`):** Gaußsche Normalverteilung $f(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{1}{2}(\frac{x-\mu}{\sigma})^2}$ ohne jegliche Definition von $x, \mu, \sigma$ oder Dimensionen. Folie enthält gleichzeitig PDF, Box-Plots und einen C#-Codeblock $\implies$ schwerer Layout-Überlauf!
- **Folie 443 (`Netzwerktopologien & Blockdiagramme`):** Graphenformalismus $G=(V, E)$, Knotengrade $\deg^-(v), \deg^+(v)$ und Adjazenzmatrix fehlen; algebraische Schleife $y(t) = g(y(t), u(t))$ mathematisch unzureichend formalisiert.

#### Operative Maßnahmen:
1. **Folie 50, 166, 189 überarbeiten:** Formeln durch präzise Vektorraum- und Einheitenangaben ergänzen.
2. **Folie 276/277 aufspalten (Slide-Split):**
   - **Folie 276a (Neu):** *Wahrscheinlichkeitsdichte & Analytische Normalverteilung* (Normierung $N\cdot\Delta w_{\text{bin}}$, Gauß-Dichte $f(x)$ mit Erwartungswert $\mu$ $[\mathrm{s}]$, Standardabweichung $\sigma$ $[\mathrm{s}]$, Varianz $\sigma^2$ $[\mathrm{s^2}]$ und Dimension $[1/\mathrm{s}]$).
   - **Folie 276b:** *Statistische Vergleiche mit Box-Plots & ScottPlot* (Definition IQR, Whiskers, Ausreißer, C#-Codebeispiel).
3. **Folie 443 aufspalten (Slide-Split):**
   - **Folie 443a (Neu):** *Mathematische Modellierung von Modelltopologien* (Formaler gerichteter Graph $G=(V, E)$, In-Degree $\deg^-(v)$, Out-Degree $\deg^+(v)$, Adjazenzmatrix $\mathbf{A} \in \{0, 1\}^{|V| \times |V|}$, algebraische Schleifen $F(y) = y - g(y, u) = 0$).
   - **Folie 443b:** *Netzwerktopologien & Automatisches Layout mit MSAGL* (Verbindung zu Simulink/Simscape, automatisches Routing).

#### Exakter Ziel-Markdown Folie 276a/b & Folie 443a/b:

```markdown
### Wahrscheinlichkeitsdichte & Analytische Normalverteilung

<div class="columns top">
<div class="one">

#### Normierte Wahrscheinlichkeitsdichte (PDF)
- Das reine Histogramm liefert absolute Klassenhäufigkeiten $H_k \in \mathbb{N}_0$.
- **Flächennormierung:** Teilt man $H_k$ durch $(N \cdot \Delta w_{\text{bin}})$, erhält man die normierte empirische Dichte $f_k$:
  - $N = \sum H_k$: Stichprobenumfang
  - $\Delta w_{\text{bin}}$: Klassenbreite $[\mathrm{s}]$
  - Eigenschaft: $\int_{-\infty}^\infty f(x)\,\mathrm{d}x = \sum f_k \Delta w_{\text{bin}} = 1$

</div>
<div class="one">

#### Gaußsche Normalverteilung $\mathcal{N}(\mu, \sigma^2)$
Überlagerung der Messdaten mit der theoretischen Wahrscheinlichkeitsdichtefunktion:

$$f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left(-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2\right) \quad \left[\frac{1}{\mathrm{s}}\right]$$

- $x$: Merkmalswert (z.B. Zykluszeit) $[\mathrm{s}]$
- $\mu$: Erwartungswert (Mittelwert) $[\mathrm{s}]$
- $\sigma$: Standardabweichung ($\sigma > 0$) $[\mathrm{s}]$
- $\sigma^2$: Varianz des Prozesses $[\mathrm{s^2}]$

</div>
</div>

---

### Verteilungsvergleiche mit Box-Plots (ScottPlot)

<div class="columns top">
<div class="one">

#### Kennwerte eines Box-Plots
Kompakter Vergleich mehrerer Simulationsreihen nebeneinander:
- **Median ($Q_2$):** 50. Perzentil (robuster Lageparameter)
- **Box (IQR):** Interquartilsabstand $\text{IQR} = Q_3 - Q_1$ (mittlere 50 % der Daten)
- **Whisker:** Wertebereich bis maximal $1{,}5 \times \text{IQR}$ ab Quartilsgrenze
- **Punkte:** Statistische Ausreißer außerhalb der Whiskers

</div>
<div class="one">

```csharp
// Box-Plot für zwei Simulationsläufe
var box1 = new ScottPlot.Box {
    Position = 1,
    BoxMiddle = 2.4, // Median
    BoxMin = 1.8,    // Q1 (25 %)
    BoxMax = 3.1,    // Q3 (75 %)
    WhiskerMin = 1.2,
    WhiskerMax = 3.8
};
var box2 = new ScottPlot.Box {
    Position = 2,
    BoxMiddle = 3.8,
    BoxMin = 2.9,
    BoxMax = 4.6
};
WpfPlot1.Plot.Add.Box(new[] { box1, box2 });
```

</div>
</div>

---

### Mathematische Modellierung von Modelltopologien

In modernen Blockdiagramm- und Multi-Domain-Simulatoren (Simulink, Modelica, Simscape) wird das Gesamtsystem als gerichteter Graph abgebildet:

$$G = (V, E)$$

- **Knotenmenge $V = \{v_1, \dots, v_n\}$:** Funktionsblöcke (z.B. Integratoren, Kennfelder) oder physikalische Komponenten (Ventil, Zylinder).
  - Eingangsgrad $\deg^-(v_i)$: Anzahl eingehender Signale / Kopplungen
  - Ausgangsgrad $\deg^+(v_i)$: Anzahl erzeugter Ausgangssignale
- **Kantenmenge $E \subseteq V \times V$:** Signal- und Leistungsflüsse $e = (v_i, v_j)$
- **Adjazenzmatrix $\mathbf{A} \in \{0, 1\}^{n \times n}$:**
  $$a_{ij} = \begin{cases} 1, & \text{falls } (v_i, v_j) \in E \text{ (Signal von } v_i \text{ zu } v_j \text{)} \\ 0, & \text{sonst} \end{cases}$$
- **Algebraische Schleifen (Zyklen):** Ein geschlossener Pfad in $\mathbf{A}$ ohne Zustandsverzögerung erzwingt die simultane Nullstellensuche $F(y) = y(t) - g(y(t), u(t)) = 0$.

---

### Netzwerktopologien & Automatisches Layout mit MSAGL

- **Herausforderung:** Bei komplexen Systemen mit hunderten Blöcken ist manuelle Platzierung unmöglich und blockiert Modellrefactorings.
- **Lösung:** Microsoft Automatic Graph Layout (`MSAGL`):
  - Berechnet ästhetische, kreuzungsminimierte Layouts vollautomatisch.
  - Unterstützt hierarchische Layering-Verfahren (Sugiyama-Algorithmus) für kausale Signalflüsse (von links nach rechts).
  - Unterstützt Force-Directed-Layouts für physikalische Netzwerkgraphen (ungestrickte Feder-Masse-Modelle).
  - Erlaubt interaktives Zoomen, Panning und Hervorheben kritischer Signalpfade (algebraische Zyklen rot markieren).
```

---

### 2.6 Kapitel 05: 3D-Visualisierung (OpenGL & Kinematik) (`Folien/05_Visualisierung_3D_OpenGL/Folien.md`)

#### Ist-Zustand & Mängel:
- **Folien 221–290 (`Phong-Modell`):**
  - Informelle Variablen wie `light_a`, `material_a`, `shininess` statt DIN-konformer Symbole.
  - Vektoren ohne Pfeil ($N, L, V, R$).
  - Die fundamentale mathematische Voraussetzung der **Einheitslänge** ($\|\vec{n}\| = \|\vec{l}\| = \|\vec{v}\| = \|\vec{r}\| = 1$) wird nicht explizit verlangt.
- **Folie 1111:** Normale für Kegel/Kegelstumpf ist nur als Proportionalität ($\propto$) angegeben; OpenGL benötigt zwingend den normierten Einheitsvektor.
- **Folie 1240 (`Vorwärtskinematik`):** Die Matrizengleichung $\mathbf{T}_{\text{TCP}} = \mathbf{T}_{\text{Base}} \cdot \mathbf{R}_1(\theta_1) \cdot \mathbf{T}_1 \cdot \mathbf{R}_2(\theta_2) \cdot \mathbf{T}_2$ wird ohne Aufschlüsselung der $4\times 4$-Translations- und Rotationsmatrizen dargestellt.

#### Operative Maßnahmen:
1. **Folien 221–290 (Phong-Beleuchtung) grundlegend sanieren:**
   - Einheitsvektoren formal fordern: $\vec{n}, \vec{l}, \vec{v}, \vec{r}$ mit $\|\cdot\| = 1$.
   - DIN-Symbole einführen: $k_a, k_d, k_s \in [0, 1]$ für Materialeigenschaften; $I_{La}, I_{Ld}, I_{Ls} \in [0, 1]$ für Lichtquellen; $\alpha_{\text{shiny}} \in [1, 128]$ für Glanzexponent.
   - Reflexionsformel exakt angeben: $\vec{r} = 2(\vec{n} \cdot \vec{l})\vec{n} - \vec{l}$.
2. **Folie 1111 überarbeiten:** Exakte analytische Formel mit Euklidischer Normierungs-Wurzel für Zylinder und Kegel.
3. **Folie 1240 überarbeiten:** Vollständige formale Deklaration der homogenen $4\times 4$-Transformationsmatrizen mit Drehachse, Winkeln $\theta_1, \theta_2$ und Segmentlängen $L_1, L_2$ $[\mathrm{m}]$.

#### Exakter Ziel-Markdown Folie 221–290 & Folie 1240:

```markdown
### Vektoren für die Beleuchtungsrechnung (Normiert)

<div class="columns">
<div>

Für jeden Oberflächenpunkt $\vec{p}$ erfordert das empirische Phong-Modell vier **Einheitsvektoren** ($\|\cdot\| = 1$):

- **$\vec{n}$ (Normalenvektor):** Senkrecht zur Tangentialebene der Fläche gerichtet ($\|\vec{n}\| = 1$).
- **$\vec{l}$ (Lichtvektor):** Zeigt vom Punkt $\vec{p}$ zur Lichtposition:
  $$\vec{l} = \frac{\vec{p}_{\text{light}} - \vec{p}}{\|\vec{p}_{\text{light}} - \vec{p}\|}$$
- **$\vec{v}$ (Betrachtungsvektor):** Zeigt vom Punkt $\vec{p}$ zur Kamera:
  $$\vec{v} = \frac{\vec{p}_{\text{cam}} - \vec{p}}{\|\vec{p}_{\text{cam}} - \vec{p}\|}$$
- **$\vec{r}$ (Reflexionsvektor):** Ideale Spiegelrichtung des einfallenden Lichts:
  $$\vec{r} = 2(\vec{n} \cdot \vec{l})\vec{n} - \vec{l} \quad (\|\vec{r}\| = 1)$$

</div>
<div>

![w:500](./Diagramme/Phong%20-%20Vektoren.svg)

</div>
</div>

---

### **Ambient**-Komponente (DIN / ISO)

<div class="columns">
<div>

Simuliert die indirekte, diffuse Grundhelligkeit im Raum (hervorgerufen durch mehrfache Streuung an Wänden und Objekten):

$$I_a = k_a \cdot I_{La}$$

- $k_a \in [0, 1]$: Ambienter Reflexionskoeffizient des Materials (`glMaterial`, Farbvektor RGB)
- $I_{La} \in [0, 1]$: Intensität / Farbe des globalen Umgebungslichts (`GL_LIGHT_MODEL_AMBIENT`)

*Eigenschaft:* Völlig unabhängig von Oberflächennormalen, Lichtposition oder Kamerablickwinkel; verhindert tiefe, unphysikalisch schwarze Schatten.

</div>
<div>

![w:500](./Diagramme/Phong%20-%20Vektoren.svg)

</div>
</div>

---

### **Diffuse**-Komponente (Lambertsches Gesetz)

<div class="columns">
<div>

Beschreibt die richtungsunabhängige, matte Streuung nach dem Lambertschen Kosinusgesetz:

$$I_d = k_d \cdot I_{Ld} \cdot \max(0, \vec{n} \cdot \vec{l})$$

- $k_d \in [0, 1]$: Diffuser Materialkoeffizient (Eigenfarbe)
- $I_{Ld} \in [0, 1]$: Diffuse Lichtquellenintensität
- $\vec{n} \cdot \vec{l} = \cos(\delta)$: Kosinus des Einfallswinkels $\delta$
- $\max(0, \dots)$: Flächen, die von der Lichtquelle abgewandt sind ($\delta > 90^\circ \implies \vec{n}\cdot\vec{l} < 0$), empfangen kein direktes Licht.

</div>
<div>

![w:500](./Diagramme/Phong%20-%20Diffuse.svg)

</div>
</div>

---

### **Specular**-Komponente (Glanzpunkt)

<div class="columns">
<div>

Erzeugt den charakteristischen, schimmernden Glanzpunkt auf glatten Oberflächen:

$$I_s = k_s \cdot I_{Ls} \cdot \left(\max(0, \vec{r} \cdot \vec{v})\right)^{\alpha_{\text{shiny}}}$$

- $k_s \in [0, 1]$: Spekularer Reflexionskoeffizient
- $I_{Ls} \in [0, 1]$: Spekulare Lichtquellenintensität (meist rein weiß)
- $\vec{r} = 2(\vec{n}\cdot\vec{l})\vec{n} - \vec{l}$: Reflexions-Einheitsvektor
- $\alpha_{\text{shiny}} \in [1, 128]$: Shininess-Exponent. Je größer $\alpha_{\text{shiny}}$, desto enger gebündelt und schärfer der Glanzpunkt.

</div>
<div>

![w:500](./Diagramme/Phong%20-%20Specular.svg)

</div>
</div>

---

### Vorwärtskinematik & Matrix-Stack

<div class="columns top">
<div class="two">

Die globale Pose des Greifers $\mathbf{T}_{\text{TCP}} \in \mathbb{R}^{4 \times 4}$ berechnet sich durch Verkettung homogener Transformationsmatrizen entlang der kinematischen Kette:

$$\mathbf{T}_{\text{TCP}} = \mathbf{T}_{\text{Base}} \cdot \mathbf{R}_y(\theta_1) \cdot \mathbf{T}_z(L_1) \cdot \mathbf{R}_z(\theta_2) \cdot \mathbf{T}_y(L_2)$$

- $\mathbf{T}_{\text{Base}}$: Montageposition und Basis-Ausrichtung im Weltraum $[\mathrm{m}]$
- $\mathbf{R}_y(\theta_1)$: Drehung um die vertikale Y-Achse (Drehkranz / Yaw mit Winkel $\theta_1$)
- $\mathbf{T}_z(L_1)$: Translation entlang des ersten Armsegments (Länge $L_1$ $[\mathrm{m}]$)
- $\mathbf{R}_z(\theta_2)$: Rotation im Ellbogengelenk (Pitch mit Gelenkwinkel $\theta_2$)
- $\mathbf{T}_y(L_2)$: Segmenttranslation zum Werkzeugmittelpunkt TCP (Länge $L_2$ $[\mathrm{m}]$)

*OpenGL-Vorteil:* Durch `gl.PushMatrix()` und `gl.PopMatrix()` wird diese Vorwärtskinematik implizit über den Hardware-Matrix-Stack akkumuliert!

</div>
<div class="one">

> [!TIP]
> **Industrieller Standard:**  
> Genau wie in TwinCAT Kinematics, ROS (URDF) oder MATLAB Simscape Multibody vererben serielle Gelenke ihre Posen automatisch an nachfolgende Substrukturen.

</div>
</div>
```

---

### 2.7 Kapitel 06: Multithreading & Parallele Simulation (`Folien/06_Multithreading/Folien.md`)

#### Ist-Zustand & Mängel:
- **Gravierende Theorielücke:** Kapitel 06 ist das einzige Kapitel im Lehrwerk, das fast ohne mathematisch-theoretische Fundierung auskommt.
- Es fehlen:
  - Formale Definition von **Speedup** $S(p) = \frac{T_1}{T_p}$ und **Paralleler Effizienz** $E(p) = \frac{S(p)}{p}$.
  - **Amdahlsches Gesetz** (Strong Scaling bei fester Problemgröße) mit seriellem Flaschenhals:
    $$S_{\text{Amdahl}}(p) = \frac{1}{(1-s) + \frac{s}{p}} \quad \xrightarrow{p \to \infty} \quad \frac{1}{1-s}$$
  - **Gustafsonsches Gesetz** (Weak Scaling bei skalierter Problemgröße):
    $$S_{\text{Gustafson}}(p) = p - (1-s)(p - 1)$$
  - Visuelle Darstellung der Speedup-Kurven und Asymptoten.

#### Operative Maßnahmen:
1. **Abschnittsübersicht 6.1 (Folie 29) aktualisieren:** Den Punkt „Theoretische Grenzen: Speedup, Effizienz & Amdahlsches Gesetz“ als verbindlichen Inhalt aufnehmen.
2. **Zwei neue Theorie-Folien in Abschnitt 6.1 einfügen:**
   - **Folie 6.1-A (Neu):** *Parallele Leistungsmetriken: Speedup & Effizienz* (Definitionen $T_1, T_p$, Speedup-Gleichung, Effizienz-Gleichung, Ursachen für sublineare Skalierung).
   - **Folie 6.1-B (Neu):** *Amdahlsches vs. Gustafsonsches Gesetz (Skalierungsgrenzen)* (Amdahlsches Gesetz für konstante Problemgröße, Grenzwertbetrachtung für $p \to \infty$, Rechnerisches Fallbeispiel mit $95\,\%$ Parallelanteil, Gustafsons Gesetz für skaliertes Modellieren).
3. **Neues SVG-Diagramm einbinden:** `Folien/06_Multithreading/Diagramme/Amdahlsches_Gesetz_Speedup.svg` auf Folie 6.1-B einbetten.

#### Exakter Ziel-Markdown für die neuen Folien in Kapitel 06:

```markdown
### Parallele Leistungsmetriken: Speedup & Effizienz

Wie stark beschleunigt sich eine Simulation, wenn wir $p$ Rechenkerne einsetzen?

<div class="columns top">
<div class="one">

#### Speedup (Beschleunigungsfaktor)
Verhältnis der Ausführungszeit auf einem Kern zur Ausführungszeit auf $p$ Kernen:

$$S(p) = \frac{T_1}{T_p}$$

- $T_1$: Ausführungszeit des Programms auf $1$ CPU-Kern $[\mathrm{s}]$
- $T_p$: Ausführungszeit auf $p$ parallelen Kernen $[\mathrm{s}]$ ($p \in \mathbb{N}^+$)
- **Idealer Speedup (linear):** $S(p) = p$ (Verdopplung der Kerne halbiert die Zeit).

</div>
<div class="one">

#### Parallele Effizienz
Auslastungsgrad der eingesetzten Hardware:

$$E(p) = \frac{S(p)}{p} = \frac{T_1}{p \cdot T_p} \le 1 \quad (100\,\%)$$

- **Reale Effizienzverluste:** In der Praxis sinkt $E(p)$ mit steigendem $p$ durch:
  - Thread-Erzeugungs- und Scheduling-Overhead
  - Synchronisationsbarrieren (`lock`, Memory Barriers)
  - Speicherbandbreiten-Engpässe (Cache-Contention)
  - Sequentielle Codeanteile (Amdahls Gesetz!)

</div>
</div>

---

### Amdahlsches Gesetz & Skalierungsgrenzen

<div class="columns top">
<div class="two">

#### Amdahlsches Gesetz (Feste Problemgröße / Strong Scaling)
Sei $s \in [0, 1]$ der parallelisierbare Codeanteil und $(1-s)$ der streng sequentielle Anteil:

$$S_{\text{Amdahl}}(p) = \frac{1}{(1 - s) + \frac{s}{p}} \quad \xrightarrow{p \to \infty} \quad \frac{1}{1 - s}$$

- **Konsequenz:** Beträgt der sequentielle Anteil nur $5\,\%$ ($s = 0{,}95$), ist der Speedup selbst bei $p = 1000$ Kernen auf **maximal $S_{\max} = 20$** limitiert!
- **Gustafson-Barsis (Skalierte Problemgröße / Weak Scaling):**
  Wächst die Problemgröße mit der Kernanzahl (höhere Gitterauflösung), gilt:
  $$S_{\text{Gustafson}}(p) = p - (1 - s)(p - 1)$$

</div>
<div class="one">

![w:380](./Diagramme/Amdahlsches_Gesetz_Speedup.svg)

</div>
</div>
```

---

## 3. Detaillierte Spezifikation der neuen Erklär-Bilder (SVG)

### 3.1 Spezifikation: `Schiefer_Wurf_Kraefte.svg` (Kapitel 01)

- **Dateipfad:** `Folien/01_Einführung/Diagramme/Schiefer_Wurf_Kraefte.svg`
- **Didaktisches Ziel:** Anschauliche Gegenüberstellung der geometrischen Vektorzerlegung des Abwurfwinkels und des physikalischen Kräfte-Gleichgewichts während des Flugs (Geschwindigkeitsvektor $\vec{v}$, antiparallele Strömungswiderstandskraft $\vec{F}_R$, Schwerkraft $\vec{F}_G$).
- **Canvas-Format:** `viewBox="0 0 580 440"`, optimiert für MARP Spaltenbreite `![w:420]`.
- **Farbpalette:**
  - Hintergrund/Card: `#FFFFFF`, Rahmen `#CBD5E1`, Header-Banner `#F1F5F9`
  - Trajektorie / Parabel: `#004B96` (FH-Blau), gestrichelt für ungedämpft, durchgezogen für gedämpft
  - Geschwindigkeitsvektoren: `#0284C7` (Sky-Blue)
  - Widerstandskraft $\vec{F}_R$: `#DC2626` (Warn-Rot, exakt $180^\circ$ antiparallel zu $\vec{v}$)
  - Gewichtskraft $\vec{F}_G$: `#16A34A` (Grün, senkrecht nach unten)
  - Winkelbögen & Maße: `#D97706` (Amber)
- **Visuelle Elemente:**
  1. **Koordinatenachsen:** $x$ (horizontal) $[\mathrm{m}]$ und $y$ (vertikal) $[\mathrm{m}]$ mit Pfeilspitzen.
  2. **Abwurfpunkt $(0, y_0)$:** Startposition mit Anfangshöhe $y_0$.
  3. **Startvektor $\vec{v}_0$:** Schräg nach rechts oben mit Winkel $\alpha$. Gestrichelte Projektionslinien auf Achsen mit Beschriftungen $v_{0x} = v_0 \cos\alpha$ und $v_{0y} = v_0 \sin\alpha$.
  4. **Momentanpunkt $P(t)$ auf der Flugbahn:**
     - Tangentialer Geschwindigkeitsvektor $\vec{v} = (v_x, v_y)^T$.
     - Luftwiderstandskraft $\vec{F}_R = -\frac{1}{2} c_w \rho A \|\vec{v}\| \vec{v}$ (antiparallel zurück entlang der Tangente).
     - Gravitationskraft $\vec{F}_G = m \vec{g} = (0, -mg)^T$ senkrecht nach unten.
     - Resultierende Gesamtkraft $\vec{F}_{\text{ges}} = \vec{F}_G + \vec{F}_R$ per Vektoraddition angedeutet.
  5. **Legenden-Box / Badge:** Klare Zuordnung der Formelsymbole und Einheiten.

---

### 3.2 Spezifikation: `Amdahlsches_Gesetz_Speedup.svg` (Kapitel 06)

- **Dateipfad:** `Folien/06_Multithreading/Diagramme/Amdahlsches_Gesetz_Speedup.svg`
- **Didaktisches Ziel:** Mathematischer Nachweis der Skalierungsgrenze von Multithreading-Algorithmen über variierende Prozessor-Kernanzahlen.
- **Canvas-Format:** `viewBox="0 0 580 440"`, optimiert für MARP Spaltenbreite `![w:380]`.
- **Farbpalette:**
  - Hintergrund/Card: `#FFFFFF`, Rahmen `#CBD5E1`, Header-Banner `#F1F5F9`
  - Linearer Ideal-Speedup ($S=p$): `#94A3B8` (gestrichelte graue Diagonale)
  - Kurve $s = 0{,}95$ ($5\,\%$ seriell): `#004B96` (FH-Blau, $S_{\max} = 20$)
  - Kurve $s = 0{,}90$ ($10\,\%$ seriell): `#0284C7` (Cyan/Sky-Blue, $S_{\max} = 10$)
  - Kurve $s = 0{,}75$ ($25\,\%$ seriell): `#D97706` (Amber, $S_{\max} = 4$)
  - Kurve $s = 0{,}50$ ($50\,\%$ seriell): `#DC2626` (Rot, $S_{\max} = 2$)
  - Horizontale Asymptoten: Gestrichelte Linien auf Niveau $S = 2, 4, 10, 20$.
- **Achsenskalierung & Wertebereich:**
  - X-Achse: Prozessor-Kerne $p \in [1, 64]$ (mit Markierungen bei $1, 2, 4, 8, 16, 32, 64$).
  - Y-Achse: Speedup $S(p) \in [0, 22]$.
- **Visuelle Elemente:**
  1. Mathematisch exakt berechnete Bezier-Splines für die vier Kurven.
  2. Asymptoten-Linien mit Beschriftung $S_{\max} = \frac{1}{1-s}$.
  3. Callout-Badge bei $p=64$ für $s=0{,}95$ mit Text: „Amdahl-Grenze: Max. $20\times$ Speedup trotz $1000$ Kernen!“.

---

## 4. Folienanzahl-Bilanz & Slide-Split-Strategie

### 4.1 Quantitative Folienbilanz

| Kapitel | Dateipfad | Bisherige Folien | Geplante Folien | Delta | Begründung & Maßnahmen |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **00** Prolog | `Folien/00_Prolog/Folien.md` | 13 | 13 | $\pm 0$ | Textuelle Präzisierung F3/F4 ohne Split (vollständig layoutstabil) |
| **01** Einführung | `Folien/01_Einführung/Folien.md` | 31 | 32 | **+1** | **Slide-Split Folie 20:** Trennung in ungedämpften & gedämpften Wurf (+ SVG) |
| **02** Vis. 2D Pixel | `Folien/02_Visualisierung_2D_Pixel/Folien.md` | 33 | 33 | $\pm 0$ | Formale Stoffwertetabelle F23 & Gitterparameter F24 layoutneutral integriert |
| **03** Vis. 2D Vektor | `Folien/03_Visualisierung_2D_Vektor/Folien.md` | 32 | 33 | **+1** | **Slide-Split Folie 22:** Analytische Umkehrformel `ScreenToWorld` getrennt vom Code |
| **04** Vis. 2D Diagr. | `Folien/04_Visualisierung_2D_Diagramme/Folien.md` | 30 | 32 | **+2** | **Slide-Split 1 (F276):** PDF/Gauß getrennt von Box-Plots<br>**Slide-Split 2 (F443):** Graphentheorie $G=(V,E)$ getrennt von MSAGL |
| **05** Vis. 3D OpenGL | `Folien/05_Visualisierung_3D_OpenGL/Folien.md` | 55 | 55 | $\pm 0$ | DIN-Phong-Harmonisierung & Matrixaufschlüsselung F1240 ohne Folienerhöhung |
| **06** Multithreading | `Folien/06_Multithreading/Folien.md` | 27 | 29 | **+2** | **Theorielücke geschlossen:** 2 neue Folien für Speedup/Effizienz & Amdahl/Gustafson (+ SVG) |
| **Gesamt** | **Kapitel 00 bis 06** | **221** | **227** | **+6** | **Substanzielle didaktische Aufwertung bei 100 % Layout-Garantie** |

---

### 4.2 Detaillierte Begründung aller Slide-Splits

1. **Kapitel 01 (Folie 20 $\to$ Folie 20a & 20b):**
   - *Ursache:* Die bisherige Folie versucht, die analytische Parabelbahn und den numerischen Luftwiderstand mit 8 unerklärten Symbolen in zwei Spalten zu zwängen.
   - *Split-Notwendigkeit:* Die vollständige Definition von $\alpha, v_0, v_{0x}, v_{0y}, c_w, \rho, A, \|\vec{v}\|$, Einheiten sowie das Einbetten des neuen Diagramms `Schiefer_Wurf_Kraefte.svg` erfordert ca. $180\,\%$ der Höhe einer einzelnen 16:9-Folie. Der Split entzerrt die analytische Grundlagenherleitung von der nichtlinearen DGL-Formulierung.
2. **Kapitel 03 (Folie 22 $\to$ Folie 22a & 22b):**
   - *Ursache:* Die bisherige Folie zeigt ausschließlich einen 16-zeiligen C#-Codeblock für `ScreenToWorld`. Die mathematische Herleitung fehlte vollständig.
   - *Split-Notwendigkeit:* Das Hinzufügen der zweistufigen Matrix- und Projektionsinversion über dem C#-Codeblock würde zu einem massiven Abschneiden des Codes am unteren Folienrand führen. Folie 22a erklärt nun die Mathematik; Folie 22b widmet sich der sauberen C#-Implementierung.
3. **Kapitel 04 (Folie 276 $\to$ Folie 276a & 276b):**
   - *Ursache:* Folie 276 kombinierte Wahrscheinlichkeitsdichten (PDF), analytische Gaußkurven, Box-Plot-Erklärungen UND einen C#-Codeblock auf einer einzigen Seite.
   - *Split-Notwendigkeit:* Durch die formale Deklaration von $\mu, \sigma, \sigma^2, \text{IQR}$ und SI-Einheiten ist eine Aufteilung zwingend. Folie 276a fokussiert die stochastische Dichte; Folie 276b behandelt Box-Plots und deren ScottPlot-Generierung.
4. **Kapitel 04 (Folie 443 $\to$ Folie 443a & 443b):**
   - *Ursache:* Die Folie leitete unvermittelt von Blockdiagrammen zu MSAGL über, ohne das topologische Graphenmodell formal zu definieren.
   - *Split-Notwendigkeit:* Das formale Graphenmodell ($G=(V,E)$, Knotengrade, Adjazenzmatrix $\mathbf{A}$, algebraische Schleifen) benötigt eine eigene Theorie-Folie, um eine solide Brücke zu Kapitel 08/10 (Zustandsraum & DES) zu schlagen.
5. **Kapitel 06 (Abschnitt 6.1 $\to$ 2 neue Theorie-Folien):**
   - *Ursache:* Vollständiges Fehlen der quantitativen Parallelisierungstheorie im Vorlesungsskript.
   - *Einfügung:* Einschub von zwei systematisch gestalteten Folien für Speedup/Effizienz und Amdahl/Gustafson vor den C#-Parallelsyntax-Folien.

---

### 4.3 MARP-Layout-Sicherheitsregeln (fhooe Theme)

Zur absoluten Vermeidung vertikaler Überläufe sind folgende Grenzwerte bei der Textgenerierung einzuhalten:

1. **Maximale Zeilenzahl bei Bulletpoint-Listen:** Maximal 6 bis 7 Hauptpunkte pro Folie (bzw. maximal 5 mit Unterpunkten).
2. **2-Spalten-Layouts (`<div class="columns">`):**
   - Spalteninhalt darf maximal 10 Textzeilen umfassen.
   - Textblöcke und Formeln müssen vertikal kompakt mit `\quad` gegliedert werden (keine überflüssigen Leerzeilen innerhalb mathematischer Umgebungen).
3. **Code-Blöcke:** Maximal 12 Zeilen Code pro Folie. Bei längeren Methoden zwingend Auslassungen (`// ...`) oder Slide-Split anwenden.
4. **Abbildungsgrößen:**
   - Einspaltige Diagramme: Maximal `![w:520]`
   - Zweispaltige Diagramme (in `<div class="one">`): Maximal `![w:380]` bis `![w:420]`
5. **Formel-Typografie:** Keine gestapelten Brüche in Fließtextzeilen; stattdessen Inline-Divisionen wie $s = (\alpha \Delta t) / h^2$ oder zentrierte Blockformeln mit `$$...$$`.

---

## 5. Arbeitsanweisungen für den Umsetzungs-Agenten

Der Umsetzungs-Agent hat bei der Durchführung dieses Plans folgende Schritte autonom und strikt in dieser Reihenfolge abzuarbeiten:

1. **Erstellung der Vektorgrafiken (SVG):**
   - Generierung von `Folien/01_Einführung/Diagramme/Schiefer_Wurf_Kraefte.svg` gemäß Abschnitt 3.1.
   - Generierung von `Folien/06_Multithreading/Diagramme/Amdahlsches_Gesetz_Speedup.svg` gemäß Abschnitt 3.2.
   - Visuelle und syntaktische Validierung beider SVG-Dateien.
2. **Aktualisierung der Foliendateien (Kapitel 00 bis 06):**
   - Schrittweise Modifikation von `Folien/00_Prolog/Folien.md` bis `Folien/06_Multithreading/Folien.md` gemäß den Ziel-Markdowns aus Abschnitt 2.
   - Exakte Einhaltung der Slide-Splits und Paginierungsstruktur.
3. **Qualitätskontrolle & Konsistenzabgleich:**
   - Abgleich gegen die Normen DIN 1304 und ISO 80000-2 (kursiv für Variablen, aufrecht für Einheiten und Vektoren/Matrizen fett bzw. mit Pfeil).
   - Verifizierung, dass keine Datei Syntaxfehler im MARP-Frontmatter oder ungeschlossene `<div>`-Tags enthält.
4. **Abschlussbericht:** Prägnanter Bericht über die vollzogene Überarbeitung an den Hauptagenten.
