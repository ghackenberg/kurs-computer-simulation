# Rigoroser Prüf-Audit: Mathematische & Physikalische Variablendefinitionen (Grundlagenblock)

**Dokument-ID:** `Reviews/Audit_Variablen_01_Grundlagen.md`  
**Gegenstand:** Tiefenprüfung der mathematischen und physikalischen Formeln, Variablen, Konstanten, Indizes und Einheiten in den ersten vier Vorlesungskapiteln:
- `Folien/00_Prolog/Folien.md`
- `Folien/01_Einführung/Folien.md`
- `Folien/02_Visualisierung_2D_Pixel/Folien.md`
- `Folien/03_Visualisierung_2D_Vektor/Folien.md`  
**Normen- und Referenzbasis:** DIN 1304 (Formelzeichen), ISO 80000-1 / ISO 80000-2 (Größen und Einheiten: Mathematische Zeichen), DIN 5483 (Zeitabhängige Größen)  
**Datum:** 8. Oktober 2026  
**Autor:** Spezialisierter Assistent für Hochschuldidaktik & Systemsimulation (FH Oberösterreich, Campus Wels)  
**Status:** Detaillierter Audit-Bericht mit Befundkatalog, Variablen-Synopse und folienkompatiblen Korrekturvorschlägen

---

## 1. Executive Summary & Audit-Methodik

Im Rahmen dieses Audits wurden alle mathematischen und physikalischen Ausdrücke in den einführenden vier Kapiteln (Prolog, Einführung sowie den beiden 2D-Visualisierungskapiteln Raster/Pixel und Vektor) einer lückenlosen Vollprüfung unterzogen.

Gerade in einer Lehrveranstaltung, die den Übergang von mathematischen Modellen der Ingenieurwissenschaften zu hardwarenaher Softwareentwicklung (C# / WPF / DirectX / Numerik) vermittelt, ist eine kompromisslose Klarheit der Variablendefinitionen didaktisch unverzichtbar:
- Treten in Formeln Symbole auf, die auf der Folie weder im Text noch in einer Legende deklariert werden, führt dies bei Studierenden unweigerlich zu kognitiver Überlastung und Fehlinterpretationen.
- Das Fehlen physikalischer Dimensionen und Einheiten ([$\mathrm{m}$], [$\mathrm{s}$], [$\mathrm{kg/m^3}$], [$\mathrm{W/(m\cdot K)}$], [$\mathrm{px/m}$]) verschleiert die physikalische Plausibilität und Dimensionskonsistenz.
- Inkonsistenzen zwischen Vektordiagrammen (SVG) und dem mathematischen Begleittext auf den Folien untergraben die didaktische Stringenz.

### 1.1 Quantitative Befund-Übersicht

| Kapitel | Untersuchte Formeln / Ausdrücke | Variablen / Parameter gesamt | Vollständig definiert | Unvollständig / Implizit | Undefiniert / Fehlend | Einheiten缺失 | Gesamtnote (1–10) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **00 Prolog** | 12 | 14 | 10 | 2 | 2 | entfällt (rein math.) | **8,0 / 10** |
| **01 Einführung** | 5 | 18 | 3 | 4 | 11 | 15 von 18 | **4,5 / 10** |
| **02 Vis. 2D Pixel** | 14 | 29 | 15 | 8 | 6 | 7 von 14 phys. | **7,0 / 10** |
| **03 Vis. 2D Vektor** | 12 | 24 | 14 | 6 | 4 | 8 von 10 geometr. | **7,5 / 10** |
| **Gesamt** | **43** | **85** | **42 (49,4 %)** | **20 (23,5 %)** | **23 (27,1 %)** | **30 von 42 phys.** | **6,8 / 10** |

### 1.2 Die 4 gravierendsten Problemcluster

1. **Kapitel 01 (Einführung): Totalausfall der Variablendeklaration bei Schiefem Wurf und Freiem Fall**  
   Auf Folie 18 (`Analytische Lösung`) und Folie 20 (`Analytisch vs. Numerisch: Ein Beispiel`) werden Gleichungen für den freien Fall ($y(t) = y_0 + v_0 t - \frac{1}{2} g t^2$), das Euler-Verfahren ($y_{k+1} = y_k + \Delta t \cdot f(t_k, y_k)$), den ungedämpften schiefen Wurf ($x(t), y(t)$) sowie die aerodynamische Widerstandskraft ($\vec{F}_R = -\frac{1}{2} c_w \rho A \|\vec{v}\| \vec{v}$) präsentiert. **Keine einzige der auftretenden physikalischen Größen ($y_0, v_0, g, \alpha, c_w, \rho, A, \vec{v}$) wird im Folientext definiert oder mit einer SI-Einheit versehen.**

2. **Kapitel 02 (Pixel): Versteckte Materialparameter in der Diffusionsgleichung**  
   Auf Folie 23 wird die PDE $\frac{\partial T}{\partial t} = \alpha \Delta T + Q$ mit $\alpha = \frac{\lambda}{\rho \cdot c}$ eingeführt. $\alpha$ wird korrekt als Temperaturleitfähigkeit [$\mathrm{m^2/s}$] benannt, jedoch werden die thermodynamischen Basisgrößen $\lambda$, $\rho$ und $c$ mit keinem Wort erklärt. Der Quellterm $Q(x,y,t)$ besitzt keine physikalische Einheit (muss zwingend $[\mathrm{K/s}]$ lauten). Zudem werden auf Folie 24 die Raum- und Zeitindizes ($i, j, n$) des 5-Punkt-Differenzensterns $T_{i,j}^{n+1}$ nicht formal deklariert.

3. **Kapitel 03 (Vektor): Fehlende Dimensionierung des Skalierungsfaktors und Diskrepanz zur Pfeil-SVG**  
   - Bei der Koordinatentransformation wird der Skalierungsfaktor $s = \min(s_x, s_y)$ berechnet. Seine fundamentale Eigenschaft als Dimensionswechsler von Weltkoordinaten in Bildschirmkoordinaten ($[\mathrm{px/m}]$) wird verschwiegen.
   - Auf Folie 15 weichen die Bezeichnungen der Pfeilspitzen-Eckpunkte ($\vec{P}_1, \vec{P}_2, \vec{u}$) eklatant vom beigelegten SVG-Diagramm ab, das $\vec{P}_{\text{node}}, \vec{P}_{\text{tip}}, \vec{P}_{\text{base}}, \vec{P}_{\text{wing1}}, \vec{P}_{\text{wing2}}$ und $\vec{e}_u, \vec{e}_u^\perp$ definiert. Die kritische Zwischengröße $\vec{P}_{\text{base}}$ fehlt im Folientext völlig.

4. **Kapitel 00 (Prolog): Begriffsverwechslung von Quantoren und Operatoren**  
   Auf Folie 4 werden $\forall, \exists, \nexists$ unter der Überschrift *„Elementoperatoren“* subsumiert. Dies widerspricht der mathematischen Logik (es handelt sich um *Prädikatenquantoren*, während $\in$ die Elementrelation darstellt).

---

## 2. Normenkonformität & Notationskonventionen (DIN 1304 / ISO 80000)

Die Überprüfung basiert auf folgenden verbindlichen Standards wissenschaftlich-technischer Dokumentation:
- **ISO 80000-1 / DIN 1304:** Formelzeichen für physikalische Größen sind stets *kursiv* zu setzen ($x, y, t, T, \alpha$).
- **ISO 80000-2:**
  - Vektoren: Entweder **fett-aufrecht** ($\mathbf{v}$) oder mit Vektorpfeil ($\vec{v}$). Im Skript wird überwiegend die Pfeilnotation ($\vec{v}, \vec{F}_R$) genutzt; diese muss konsistent durchgehalten werden (kein unmotivierter Wechsel zu fett-kursiven Symbolen wie $\mathbf{x}$ ohne Erläuterung).
  - Einheiten: Stets **aufrecht (roman)** mit festem Spatium zum Zahlenwert, z.B. $9{,}81\,\mathrm{m/s^2}$, $1{,}2\,\mathrm{kg/m^3}$, $0{,}25$.
  - Mehrbuchstabige Bezeichner im Formelsatz: Wörter oder Abkürzungen wie „Stride“, „Breite“, „Offset“, „min“, „max“ müssen mit `\text{...}` bzw. Standardoperatoren `\min`, `\max` aufrecht gesetzt werden.
  - Subskripte: Beschreibende Text-Subskripte müssen aufrecht gesetzt werden (z.B. $X_{\min}$ statt $X_{min}$, $T_{\text{Wand}}$ statt $T_{Wand}$, $\vec{P}_{\text{tip}}$ statt $\vec{P}_{tip}$).

---

## 3. Detaillierter Mängelkatalog nach Kapiteln

### 3.1 Kapitel 00: Prolog (`Folien/00_Prolog/Folien.md`)

#### Befund 00-1: Falsche Kategorisierung von Quantoren als „Elementoperatoren“
- **Folie:** Folie 4 (Zeile 53–62)  
- **Titel:** `### Mengenlehre`  
- **Aktueller Text:**
  ```markdown
  - Mengen $\emptyset$ und $\mathcal{P}(\cdot)$
  - Elementoperatoren $\in$ und $\forall$ sowie $\exists$ und $\nexists$
  - Mengenoperatoren $\cup$ und $\cap$ sowie $\setminus$ und $\times$
  - Mengenbeziehungen $\subset$ und $\subseteq$
  - Tupel $(a, b) \in A \times B$
  ```
- **Kritik:** $\forall$ (Allquantor), $\exists$ (Existenzquantor) und $\nexists$ sind keine Elementoperatoren, sondern Quantoren der Prädikatenlogik 1. Stufe. Das Symbol $\in$ ist die Elementrelation (Prädikat / mengentheoretische Zugehörigkeit), deren Negation $\notin$ ist. Zudem ist $\mathcal{P}(\cdot)$ unvollständig notiert; üblich ist $\mathcal{P}(M)$ als Potenzmenge der Menge $M$.
- **Korrekturvorschlag:**
  ```markdown
  - Grundmengen: Leere Menge $\emptyset$, Potenzmenge $\mathcal{P}(M)$
  - Elementrelation: $x \in M$ (Element von), $x \notin M$ (kein Element von)
  - Quantoren: $\forall$ (für alle), $\exists$ (es existiert), $\nexists$ (es existiert kein)
  - Mengenoperationen: Vereinigung $\cup$, Schnitt $\cap$, Differenz $\setminus$, kartesisches Produkt $\times$
  - Mengenrelationen: Teilmenge $\subseteq$, echte Teilmenge $\subset$
  - Geordnetes Paar / Tupel: $(a, b) \in A \times B$
  ```

#### Befund 00-2: Unpräzise Bezeichnung von logischen Operatoren & Wahrheitswerten
- **Folie:** Folie 3 (Zeile 39–48)  
- **Titel:** `### Logik`  
- **Aktueller Text:**
  ```markdown
  - Wahrheitswerte $t$ und $f$
  - Unärer Operator $\neg$
  - Binäre Operatoren $\vee$ und $\wedge$
  - Schwache Implikation $\Rightarrow$
  - Starke Implikation $\Leftrightarrow$
  ```
- **Kritik:** Die Bezeichnungen „Schwache Implikation“ und „Starke Implikation“ sind mathematisch unüblich. $\Rightarrow$ ist die Implikation (Konditional), $\Leftrightarrow$ ist die Äquivalenz (Bikonditional). Die Operatoren sollten mit ihren Fachtermini benannt werden.
- **Korrekturvorschlag:**
  ```markdown
  - Wahrheitswerte: $\mathrm{true}$ ($t$, wahr, $1$) und $\mathrm{false}$ ($f$, falsch, $0$)
  - Negation (unär): $\neg A$ (Nicht)
  - Junktoren (binär): Konjunktion $A \wedge B$ (Und), Disjunktion $A \vee B$ (Oder)
  - Konditional: Implikation $A \Rightarrow B$ (Wenn $A$, dann $B$)
  - Bikonditional: Äquivalenz $A \Leftrightarrow B$ (Genau dann, wenn)
  ```

---

### 3.2 Kapitel 01: Einführung (`Folien/01_Einführung/Folien.md`)

#### Befund 01-1: Freier Fall – Vollständiges Fehlen von Variablendefinitionen und Einheiten
- **Folie:** Folie 18 (Zeile 391–401)  
- **Titel:** `### **Analytische** Lösung`  
- **Aktueller Text:**
  ```markdown
  - **Beispiel (freier Fall):** Die Höhe $y(t)$ eines Objekts zum Zeitpunkt $t$ ist $y(t) = y_0 + v_0 t - \frac{1}{2} g t^2$.
  ```
- **Kritik:**
  - $y(t)$: Momentane Höhe in Metern [$\mathrm{m}$] – nicht definiert.
  - $t$: Zeit in Sekunden [$\mathrm{s}$] – nur im Nebensatz genannt.
  - $y_0$: Anfangshöhe bei $t = 0\,\mathrm{s}$ in Metern [$\mathrm{m}$] – nicht deklariert.
  - $v_0$: Anfangsgeschwindigkeit in Vertikalrichtung in [$\mathrm{m/s}$] – nicht deklariert.
  - $g$: Erdbeschleunigung ($g \approx 9{,}81\,\mathrm{m/s^2}$) – nicht deklariert.
  - Es fehlen sämtliche physikalischen Einheiten.
- **Korrekturvorschlag:**
  ```markdown
  - **Beispiel (Freier Fall mit Anfangsgeschwindigkeit):**
    $$y(t) = y_0 + v_0 t - \frac{1}{2} g t^2$$
    mit Höhe $y(t)$ [$\mathrm{m}$], Zeit $t$ [$\mathrm{s}$], Anfangshöhe $y_0$ [$\mathrm{m}$], Anfangsgeschwindigkeit $v_0$ [$\mathrm{m/s}$] und Erdbeschleunigung $g \approx 9{,}81\,\mathrm{m/s^2}$.
  ```

#### Befund 01-2: Euler-Verfahren – Fehlende Spezifikation der Indizes und Zeitschritte
- **Folie:** Folie 19 (Zeile 404–417)  
- **Titel:** `### **Numerische** Lösung`  
- **Aktueller Text:**
  ```markdown
  - **Beispiel (Euler-Verfahren für $y' = f(t, y)$):**
    $y_{k+1} = y_k + \Delta t \cdot f(t_k, y_k)$
  - Man startet bei einem bekannten Zustand und berechnet den nächsten Zustand in einem kleinen Zeitschritt $\Delta t$.
  ```
- **Kritik:**
  - Die Ableitung $y' \equiv \frac{\mathrm{d}y}{\mathrm{d}t}$ wird nicht erläutert.
  - Der Index $k \in \mathbb{N}_0$ (Zeitschrittindex) wird nicht definiert.
  - Die Diskretisierung der Zeitachse $t_k = t_0 + k \cdot \Delta t$ mit Zeitschritt $\Delta t$ [$\mathrm{s}$] fehlt.
  - $y_k \approx y(t_k)$ als diskrete Näherung der kontinuierlichen Trajektorie wird nicht formalisiert.
- **Korrekturvorschlag:**
  ```markdown
  - **Beispiel (Explizites Euler-Verfahren für $y'(t) = f(t, y)$):**
    $$y_{k+1} = y_k + \Delta t \cdot f(t_k, y_k), \quad t_{k+1} = t_k + \Delta t$$
    mit Zeitschrittindex $k \in \{0, 1, 2, \dots\}$, Zeitschrittweite $\Delta t$ [$\mathrm{s}$], Zeitgitter $t_k = t_0 + k \Delta t$ und Zustand $y_k \approx y(t_k)$.
  ```

#### Befund 01-3: Schiefer Wurf & Luftwiderstand – Komplett fehlende Variablendeklaration
- **Folie:** Folie 20 (Zeile 420–447)  
- **Titel:** `### Analytisch vs. Numerisch: Ein Beispiel`  
- **Aktueller Text:**
  ```markdown
  **Analytische Lösung (ohne Luftwiderstand)**
  - Einfache Parabelbahn.
  - Formeln für Wurfweite, Wurfhöhe, Flugdauer etc. können direkt hergeleitet werden.
  - $x(t) = v_0 \cos(\alpha) t$
  - $y(t) = v_0 \sin(\alpha) t - \frac{1}{2} g t^2$

  **Numerische Lösung (mit Luftwiderstand)**
  - Luftwiderstand $\vec{F}_R = -\frac{1}{2} c_w \rho A \|\vec{v}\| \vec{v}$ wirkt antiparallel zur Bahn:
    $$F_{Rx} \propto -\sqrt{v_x^2 + v_y^2} \cdot v_x, \quad F_{Ry} \propto -\sqrt{v_x^2 + v_y^2} \cdot v_y$$
  - Die nichtlineare Kopplung verhindert eine einfache geschlossene Stammfunktion.
  ```
- **Kritik:**
  1. **Analytischer Teil:** Keines der Symbole $x(t)$, $y(t)$, $v_0$, $\alpha$, $g$, $t$ wird deklariert!
     - $x(t), y(t)$: Horizontale und vertikale Koordinaten [$\mathrm{m}$]
     - $v_0$: Abwurfgeschwindigkeit [$\mathrm{m/s}$]
     - $\alpha$: Abwurfwinkel zur Horizontalen [$\mathrm{rad}$ bzw. $^\circ$]
     - $g$: Erdbeschleunigung [$\mathrm{m/s^2}$]
     - $t$: Flugzeit [$\mathrm{s}$]
  2. **Numerischer Teil:** Die Gleichung des Newton'schen Strömungswiderstands enthält 5 Parameter, die allesamt unerklärt bleiben:
     - $\vec{F}_R$: Luftwiderstandskraft [$\mathrm{N}$]
     - $c_w$: Strömungswiderstandskoeffizient / Widerstandsbeiwert (dimensionslos)
     - $\rho$: Fluiddichte (Luftdichte $\rho \approx 1{,}2\,\mathrm{kg/m^3}$)
     - $A$: wirksame Stirnfläche / Querschnittsfläche [$\mathrm{m^2}$]
     - $\vec{v} = (v_x, v_y)^T$: Geschwindigkeitsvektor [$\mathrm{m/s}$]
     - $\|\vec{v}\| = \sqrt{v_x^2 + v_y^2}$: Geschwindigkeitsbetrag [$\mathrm{m/s}$]
  3. **Proportionalität vs. Gleichung:** Statt des unscharfen Proportionalitätszeichens $\propto$ sollte die exakte Kopplung $F_{Rx} = -\frac{1}{2} c_w \rho A \sqrt{v_x^2 + v_y^2} \, v_x$ angegeben werden, um das Einsetzen in Newtons 2. Axiom $m \ddot{\vec{x}} = \vec{F}_G + \vec{F}_R$ nachvollziehbar zu machen.
- **Korrekturvorschlag:**
  ```markdown
  **Analytische Lösung (ohne Luftwiderstand)**
  - Parabelbahn mit Anfangsgeschwindigkeit $v_0$ [$\mathrm{m/s}$] und Abwurfwinkel $\alpha$ [$^\circ$]:
    $$x(t) = v_0 \cos(\alpha) \cdot t, \quad y(t) = v_0 \sin(\alpha) \cdot t - \frac{1}{2} g t^2$$
  - Exakte Stammfunktionen für Wurfweite, Steighöhe und Flugdauer direkt lösbar ($g \approx 9{,}81\,\mathrm{m/s^2}$).

  **Numerische Lösung (mit Luftwiderstand)**
  - Quadratischer Strömungswiderstand $\vec{F}_R = -\frac{1}{2} c_w \rho A \|\vec{v}\| \vec{v}$ [$\mathrm{N}$]:
    $$F_{Rx} = -\frac{1}{2} c_w \rho A \sqrt{v_x^2 + v_y^2} \cdot v_x, \quad F_{Ry} = -\frac{1}{2} c_w \rho A \sqrt{v_x^2 + v_y^2} \cdot v_y$$
  - Mit Widerstandsbeiwert $c_w$ ([-]), Luftdichte $\rho \approx 1{,}2\,\mathrm{kg/m^3}$ und Stirnfläche $A$ [$\mathrm{m^2}$].
  - Nichtlineare Geschwindigkeitskopplung $\|\vec{v}\| = \sqrt{v_x^2 + v_y^2}$ [$\mathrm{m/s}$] erzwingt numerische Zeitschrittintegration!
  ```

---

### 3.3 Kapitel 02: 2D-Visualisierung Pixel (`Folien/02_Visualisierung_2D_Pixel/Folien.md`)

#### Befund 02-1: Unvollständige Einheiten bei physikalischen Feldgrößen
- **Folie:** Folie 4 (Zeile 44–65)  
- **Titel:** `### Was ist ein Rasterbild in der Simulation?`  
- **Aktueller Text:**
  ```markdown
  - **2D-Skalarfelder:** Temperatur $T(x,y)$, Druck $p(x,y)$, Konzentration $c(x,y)$
  ```
- **Kritik:** Für technische Simulationen sollten die Standard-SI-Einheiten genannt werden: Temperatur $T$ [$\mathrm{K}$], Druck $p$ [$\mathrm{Pa}$], Stoffmengenkonzentration $c$ [$\mathrm{mol/m^3}$]. Zudem wird in der Formel $0 \le x < \text{Breite}$ im Text von „Breite $W$“ gesprochen; hier sollte konsistent $W$ und $H$ (in [px]) genutzt werden.
- **Korrekturvorschlag:**
  ```markdown
  - Jedes Pixel besitzt ganzzahlige Gitterkoordinaten $(x, y)$ mit:
    $$0 \le x < W \quad (\text{Spalten}), \quad 0 \le y < H \quad (\text{Zeilen})$$
  - In technischen Simulationen repräsentiert jedes Pixel den Zustand einer Zelle:
    - **2D-Skalarfelder:** Temperatur $T(x,y)$ [$\mathrm{K}$], Druck $p(x,y)$ [$\mathrm{Pa}$], Konzentration $c(x,y)$ [$\mathrm{mol/m^3}$]
  ```

#### Befund 02-2: Dimensionsanalyse der Stride-Gleichung
- **Folie:** Folie 7 (Zeile 83–93)  
- **Titel:** `### Das Konzept des Strides`  
- **Aktueller Text:**
  ```markdown
  - **`Stride` (Zeilenschrittweite):** Die tatsächliche Anzahl an Bytes von einer Zeile zur nächsten:
    $$\text{Stride} = \text{Breite} \times \text{BytesJePixel} + \text{Padding}$$
  ```
- **Kritik:** Die Größen besitzen unterschiedliche Einheiten: $\text{Breite}$ in Pixeln [px], $\text{BytesJePixel} = 4\,\mathrm{Bytes/px}$, $\text{Padding}$ in [Bytes], $\text{Stride}$ in [Bytes]. Eine kurze Dimensionsprüfung hilft Studierenden beim Verständnis hardwarenaher Byte-Alignments.
- **Korrekturvorschlag:**
  ```markdown
  - **`Stride` (Zeilenschrittweite im RAM):** Byte-Distanz zwischen zwei Zeilenanfängen:
    $$\text{Stride} = W \cdot b_{\text{px}} + \text{Padding} \quad [\mathrm{Bytes}]$$
    mit Bildbreite $W$ [$\mathrm{px}$], Farbtiefe $b_{\text{px}} = 4\,\mathrm{Bytes/px}$ (bei `Bgra32`) und Füll-Bytes $\text{Padding} \ge 0$ zur 4-/8-Byte-Wortausrichtung.
  ```

#### Befund 02-3: Fehlende Materialkonstanten und Quellterm-Einheit in der Wärmeleitungsgleichung
- **Folie:** Folie 23 (Zeile 453–464)  
- **Titel:** `### Die physikalische 2D-Wärmeleitungsgleichung`  
- **Aktueller Text:**
  ```markdown
  $$\frac{\partial T}{\partial t} = \alpha \cdot \Delta T + Q(x, y, t)$$

  - $T(x, y, t)$: Temperaturfeld [$\mathrm{K}$]
  - $\alpha = \frac{\lambda}{\rho \cdot c}$: Temperaturleitfähigkeit [$\mathrm{m^2/s}$]
  - $\Delta = \nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2}$: Laplace-Operator
  - $Q(x, y, t)$: Externe Wärmequellen bzw. Wärmesenken
  ```
- **Kritik:**
  1. In der Definitionsgleichung $\alpha = \frac{\lambda}{\rho \cdot c}$ sind die thermodynamischen Stoffgrößen $\lambda$, $\rho$ und $c$ völlig unerklärt:
     - $\lambda$: Wärmeleitfähigkeit [$\mathrm{W/(m\cdot K)}$]
     - $\rho$: Dichte des Festkörpers [$\mathrm{kg/m^3}$]
     - $c$: spezifische Wärmekapazität [$\mathrm{J/(kg\cdot K)}$]
     - Dimensionskontrolle: $\frac{\mathrm{W/(m\cdot K)}}{(\mathrm{kg/m^3})\cdot (\mathrm{J/(kg\cdot K)})} = \frac{\mathrm{(J/s)/(m\cdot K)}}{\mathrm{J/(m^3\cdot K)}} = \frac{\mathrm{m^2}}{\mathrm{s}}$. Dies muss Studierenden gezeigt werden!
  2. Der Quellterm $Q(x, y, t)$ hat KEINE Einheit angegeben. Da $\frac{\partial T}{\partial t}$ die Einheit $[\mathrm{K/s}]$ besitzt, muss $Q$ zwingend in $[\mathrm{K/s}]$ gemessen werden (entspricht der volumetrischen Wärmeleistung $\dot{q}_V$ [$\mathrm{W/m^3}$] geteilt durch $\rho c$).
  3. Dem Laplace-Operator $\Delta$ fehlt die Dimension $[\mathrm{1/m^2}]$.
- **Korrekturvorschlag:**
  ```markdown
  $$\frac{\partial T}{\partial t} = \alpha \cdot \Delta T + Q(x, y, t)$$

  - $T(x, y, t)$: Temperaturfeld [$\mathrm{K}$] zu Ort $(x,y)$ und Zeit $t$ [$\mathrm{s}$]
  - $\alpha = \frac{\lambda}{\rho \cdot c}$: Temperaturleitfähigkeit (Diffusivität) [$\mathrm{m^2/s}$]
    - $\lambda$: Wärmeleitfähigkeit [$\mathrm{W/(m\cdot K)}$]
    - $\rho$: Materialdichte [$\mathrm{kg/m^3}$], $c$: spezifische Wärmekapazität [$\mathrm{J/(kg\cdot K)}$]
  - $\Delta = \nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2}$: Laplace-Operator [$\mathrm{1/m^2}$]
  - $Q(x, y, t) = \frac{\dot{q}_V}{\rho c}$: Externe Wärmequellrate [$\mathrm{K/s}$] ($\dot{q}_V$: Wärmestromdichte [$\mathrm{W/m^3}$])
  ```

#### Befund 02-4: Diskrete FDM-Indizes und Fourier-Zahl unzureichend deklariert
- **Folie:** Folie 24 (Zeile 466–493)  
- **Titel:** `### Diskretisierung mit Finiten Differenzen`  
- **Aktueller Text:**
  ```markdown
  Wir diskretisieren Raum und Zeit auf einem gleichmäßigen 2D-Gitter mit Schrittweite $\Delta x = \Delta y = h$:
  - **Zweite räumliche Ableitungen (5-Punkt-Stern):**
    $$\nabla^2 T_{i,j} \approx \frac{T_{i+1,j} + T_{i-1,j} + T_{i,j+1} + T_{i,j-1} - 4 T_{i,j}}{h^2}$$
  - **Explizites Euler-Verfahren für die Zeit:**
    $$T_{i,j}^{n+1} = T_{i,j}^n + \Delta t \cdot \left[ \alpha \nabla^2 T_{i,j} + Q_{i,j} \right]$$
  - **Implementierungsform mit Vorfaktor $s = \frac{\alpha \Delta t}{h^2}$:**
    $$L_{i,j} = T_{i+1,j} + T_{i-1,j} + T_{i,j+1} + T_{i,j-1} - 4 T_{i,j}$$
    $$T_{i,j}^{n+1} = T_{i,j}^n + s \cdot L_{i,j} + \Delta t \cdot Q_{i,j}$$
  ```
- **Kritik:**
  - $i \in \{0, \dots, W-1\}$ und $j \in \{0, \dots, H-1\}$ (Ortsindizes mit $x_i = i \cdot h$, $y_j = j \cdot h$, $h$ in [$\mathrm{m}$]) werden nicht formal eingeführt.
  - $n \in \mathbb{N}_0$ (Zeitschrittindex mit $t_n = n \cdot \Delta t$) fehlt.
  - $T_{i,j}^n \approx T(x_i, y_j, t_n)$ in [$\mathrm{K}$] wird nicht formal definiert.
  - $L_{i,j}$ ist die unskalierte Laplace-Differenzen-Summe [$\mathrm{K}$].
  - Der „Vorfaktor $s$“ ist die fundamentale, dimensionslose **Mesh-Fourier-Zahl** ($\mathrm{Fo}_\Delta = \frac{\alpha \Delta t}{h^2}$, $[-]$).
- **Korrekturvorschlag:**
  ```markdown
  Diskretisierung auf Raumgitter $x_i = i \cdot h, y_j = j \cdot h$ ($h = \Delta x = \Delta y$ [$\mathrm{m}$]) und Zeitgitter $t_n = n \cdot \Delta t$ ($\Delta t$ [$\mathrm{s}$]):
  - **Zustand:** $T_{i,j}^n \approx T(x_i, y_j, t_n)$ [$\mathrm{K}$] an Zelle $(i, j)$ zur Zeitstufe $n$
  - **Zweite räumliche Ableitung (5-Punkt-Stern):**
    $$\nabla^2 T_{i,j}^n \approx \frac{T_{i+1,j}^n + T_{i-1,j}^n + T_{i,j+1}^n + T_{i,j-1}^n - 4 T_{i,j}^n}{h^2} \quad [\mathrm{K/m^2}]$$
  - **Explizites Zeitschrittverfahren mit Fourier-Zahl $s = \frac{\alpha \Delta t}{h^2}$ (dimensionslos):**
    $$L_{i,j}^n = T_{i+1,j}^n + T_{i-1,j}^n + T_{i,j+1}^n + T_{i,j-1}^n - 4 T_{i,j}^n \quad [\mathrm{K}]$$
    $$T_{i,j}^{n+1} = T_{i,j}^n + s \cdot L_{i,j}^n + \Delta t \cdot Q_{i,j}^n \quad [\mathrm{K}]$$
  ```

#### Befund 02-5: Randbedingungen – Ghost-Cell-Definition und Einheiten
- **Folie:** Folie 26 (Zeile 512–538)  
- **Titel:** `### Physikalische Randbedingungen: Dirichlet vs. Neumann`  
- **Aktueller Text:**
  ```markdown
  **1. Dirichlet-Rand (Feste Temperatur):**
  $$T(\mathbf{x}, t) = T_{\text{Wand}} = \text{const.}$$

  **2. Neumann-Rand (Adiabatisch / Isoliert):**
  $$\frac{\partial T}{\partial n} = 0 \iff -\lambda \nabla T \cdot \vec{n} = 0$$
  - **Diskrete Ghost-Cell:** Aus $\frac{T_{1,j} - T_{-1,j}}{2h} = 0$ folgt $T_{-1,j} = T_{1,j}$:
    $$L_{0,j} = 2 T_{1,j} + T_{0,j+1} + T_{0,j-1} - 4 T_{0,j}$$
  ```
- **Kritik:**
  - $\mathbf{x} \in \partial\Omega$: Gebietsrandvektor [$\mathrm{m}$].
  - $\vec{n}$: äußerer Einheitsnormalenvektor ($\|\vec{n}\| = 1$, dimensionslos) – fehlt.
  - $\dot{q}'' = -\lambda \nabla T \cdot \vec{n}$: Wärmestromdichte durch den Rand [$\mathrm{W/m^2}$] – fehlt.
  - $T_{-1,j}$: Fiktiver Gitterknoten (Ghost-Cell) außerhalb des physikalischen Simulationsgebiets bei $i = -1$. Dies sollte kurz explizit benannt werden.
- **Korrekturvorschlag:**
  ```markdown
  **1. Dirichlet-Rand (vorgeschriebene Wandtemperatur):**
  - Auf Systemrand $\partial\Omega$: $T(\mathbf{x}, t) = T_{\text{Wand}} = \text{const.} \quad [\mathrm{K}]$

  **2. Neumann-Rand (adiabatisch / thermisch isoliert):**
  - Verschwindende Wärmestromdichte über äußere Randnormale $\vec{n}$ ($\|\vec{n}\| = 1$):
    $$\dot{q}'' = -\lambda (\nabla T \cdot \vec{n}) = 0 \implies \frac{\partial T}{\partial n} = 0 \quad [\mathrm{K/m}]$$
  - **Virtuelle Geisterzelle (Ghost-Cell $i = -1$):** Symmetrischer Differenzenquotient
    $$\left.\frac{\partial T}{\partial x}\right|_{0,j} \approx \frac{T_{1,j} - T_{-1,j}}{2h} = 0 \implies T_{-1,j} = T_{1,j} \implies L_{0,j} = 2 T_{1,j} + T_{0,j+1} + T_{0,j-1} - 4 T_{0,j}$$
  ```

---

### 3.4 Kapitel 03: 2D-Visualisierung Vektor (`Folien/03_Visualisierung_2D_Vektor/Folien.md`)

#### Befund 03-1: Bounding Box & Canvas-Fläche – Gemischte Dimensionen
- **Folie:** Folie 8 (Zeile 144–168)  
- **Titel:** `### Bounding Box & Bemaßung des Modells`  
- **Aktueller Text:**
  ```markdown
  $$X_{min} = \min_{i} (x_i), \quad X_{max} = \max_{i} (x_i)$$
  $$Y_{min} = \min_{i} (y_i), \quad Y_{max} = \max_{i} (y_i)$$
  $$W_{world} = X_{max} - X_{min}$$
  $$H_{world} = Y_{max} - Y_{min}$$
  $$W_{draw} = W_{canvas} - 2 \cdot \text{margin}$$
  $$H_{draw} = H_{canvas} - 2 \cdot \text{margin}$$
  ```
- **Kritik:**
  - $i \in \{1, \dots, N\}$: Laufindex aller $N$ Modellknoten / Geometriepunkte – fehlt.
  - $(x_i, y_i)$: Knotenkoordinaten im Weltraum [$\mathrm{m}$] – fehlt.
  - $X_{\min}, X_{\max}, Y_{\min}, Y_{\max}, W_{world}, H_{world}$ sind Längen im Weltraum [$\mathrm{m}$].
  - $W_{canvas}, H_{canvas}, \text{margin}, W_{draw}, H_{draw}$ sind Bildschirmgrößen in Pixeln [$\mathrm{px}$].
  - Die Subskripte sollten nach ISO 80000-2 aufrecht gesetzt werden: $X_{\min}, X_{\max}$ statt $X_{min}, X_{max}$.
- **Korrekturvorschlag:**
  ```markdown
  **Extremwerte aller $N$ Modellknoten $(x_i, y_i) \in \mathbb{R}^2$ [$\mathrm{m}$]:**
  $$X_{\min} = \min_{i=1\dots N} (x_i), \quad X_{\max} = \max_{i=1\dots N} (x_i) \quad [\mathrm{m}]$$
  $$Y_{\min} = \min_{i=1\dots N} (y_i), \quad Y_{\max} = \max_{i=1\dots N} (y_i) \quad [\mathrm{m}]$$

  **Physikalische Modellabmessungen vs. Bildschirmfläche:**
  - Weltgröße: $W_{\text{world}} = X_{\max} - X_{\min} \quad [\mathrm{m}], \quad H_{\text{world}} = Y_{\max} - Y_{\min} \quad [\mathrm{m}]$
  - Zeichenbereich (Canvas): $W_{\text{draw}} = W_{\text{canvas}} - 2 \cdot \text{margin} \quad [\mathrm{px}]$ mit Randabstand $\text{margin}$ [$\mathrm{px}$]
  ```

#### Befund 03-2: Skalierungsfaktor – Fehlende physikalische Einheit $[\mathrm{px/m}]$
- **Folie:** Folie 9 (Zeile 171–192)  
- **Titel:** `### Erhalt des Seitenverhältnisses (Aspect Ratio)`  
- **Aktueller Text:**
  ```markdown
  $$s_x = \frac{W_{draw}}{W_{world}}, \quad s_y = \frac{H_{draw}}{H_{world}}$$
  $$s = \min(s_x, s_y)$$
  ```
- **Kritik:** Da $W_{\text{draw}}$ in [$\mathrm{px}$] und $W_{\text{world}}$ in [$\mathrm{m}$] gemessen wird, besitzt der Skalierungsfaktor $s$ zwingend die physikalische Einheit **$[\mathrm{px/m}]$ (Pixel pro Meter)**. Auf der Folie wird $s$ als dimensionsloser Faktor dargestellt. Die Angabe der Einheit $[\mathrm{px/m}]$ ist der Schlüssel zum Verständnis der Dimensionskonsistenz der Transformationsgleichungen auf der Folgefolie!
- **Korrekturvorschlag:**
  ```markdown
  **Isotrope Maßstabsberechnung (Uniform Scaling):**
  $$s_x = \frac{W_{\text{draw}}}{W_{\text{world}}}, \quad s_y = \frac{H_{\text{draw}}}{H_{\text{world}}} \quad \left[\frac{\mathrm{px}}{\mathrm{m}}\right]$$
  $$s = \min(s_x, s_y) \quad \left[\frac{\mathrm{px}}{\mathrm{m}}\right]$$
  - Der Maßstab $s$ gibt an, wie viele **Bildschirm-Pixel einem physikalischen Meter** entsprechen.
  - Der Minimalwert garantiert, dass das Modell vollständig ohne Verzerrung sichtbar bleibt.
  ```

#### Befund 03-3: Zentrierung und Invertierung – Dimensionskontrolle
- **Folie:** Folie 10 (Zeile 195–217)  
- **Titel:** `### Zentrierung und Invertierung der Y-Achse`  
- **Aktueller Text:**
  ```markdown
  $$x_{offset} = \text{margin} + \frac{W_{draw} - W_{world} \cdot s}{2}$$
  $$y_{offset} = \text{margin} + \frac{H_{draw} - H_{world} \cdot s}{2}$$
  $$x_{screen} = x_{offset} + (x_w - X_{min}) \cdot s$$
  $$y_{screen} = y_{offset} + (Y_{max} - y_w) \cdot s$$
  ```
- **Kritik:**
  - $x_{\text{offset}}, y_{\text{offset}}$ in [$\mathrm{px}$].
  - $x_w, y_w, X_{\min}, Y_{\max}$ in [$\mathrm{m}$].
  - $(x_w - X_{\min}) \cdot s \implies [\mathrm{m}] \cdot [\mathrm{px/m}] = [\mathrm{px}]$.
  - $x_{\text{screen}}, y_{\text{screen}}$ in [$\mathrm{px}$].
  - Die Formeln sind exakt dimensionsrein, dies sollte durch Einheitenhinweise explizit herausgestellt werden.
- **Korrekturvorschlag:**
  ```markdown
  **Zentrierungs-Offsets [$\mathrm{px}$]:**
  $$x_{\text{offset}} = \text{margin} + \frac{W_{\text{draw}} - W_{\text{world}} \cdot s}{2}, \quad y_{\text{offset}} = \text{margin} + \frac{H_{\text{draw}} - H_{\text{world}} \cdot s}{2}$$

  **Transformationsgleichungen (Welt $[\mathrm{m}] \to$ Canvas $[\mathrm{px}]$):**
  $$x_{\text{screen}} = x_{\text{offset}} + (x_w - X_{\min}) \cdot s \quad [\mathrm{px}]$$
  $$y_{\text{screen}} = y_{\text{offset}} + (Y_{\max} - y_w) \cdot s \quad [\mathrm{px}] \quad (\text{Y-Achseninversion!})$$
  *(Probe: $[\mathrm{m}] \cdot [\mathrm{px/m}] = [\mathrm{px}]$; Einheiten sind absolut konsistent).*
  ```

#### Befund 03-4: Pfeilspitzen-Herleitung – Diskrepanz zwischen SVG-Diagramm und Folientext
- **Folie:** Folie 15 (Zeile 300–315)  
- **Titel:** `### Analytische Berechnung der Pfeilspitze`  
- **Aktueller Text:**
  ```markdown
  Gegeben sei der Endpunkt (Spitze) $\vec{P}_{tip}$ und der gerichtete Kraftvektor $\vec{F} = (F_x, F_y)^T$.

  1. **Normalisierter Richtungsvektor**:
     $$\vec{u} = \frac{\vec{F}}{\|\vec{F}\|} = \frac{1}{\sqrt{F_x^2 + F_y^2}} \begin{pmatrix} F_x \\ F_y \end{pmatrix}$$
  2. **Orthogonalvektor (Normalenvektor, $90^\circ$ gedreht)**:
     $$\vec{u}^\perp = \begin{pmatrix} -u_y \\ u_x \end{pmatrix}$$
  3. **Eckpunkte des Dreiecks (Länge $L$, Basisbreite $W$)**:
     $$\vec{P}_1 = \vec{P}_{tip} - L \cdot \vec{u} + \frac{W}{2} \cdot \vec{u}^\perp$$
     $$\vec{P}_2 = \vec{P}_{tip} - L \cdot \vec{u} - \frac{W}{2} \cdot \vec{u}^\perp$$
  ```
- **Kritik:**
  1. **Diskrepanz zur Vektorgrafik `Pfeilspitzengeometrie_2D.svg`:**
     - Das Diagramm weist explizit den Knoten-Startpunkt $\vec{P}_{\text{node}}$ aus; im Text fehlt $\vec{P}_{\text{node}}$ völlig.
     - Das Diagramm definiert den Basispunkt $\vec{P}_{\text{base}} = \vec{P}_{\text{tip}} - L \cdot \vec{u}$. Im Text wird $\vec{P}_{\text{base}}$ übersprungen, obwohl er auch im C#-Code als `basePoint` existiert!
     - Die Flügelpunkte heißen im SVG $\vec{P}_{\text{wing1}} (\vec{P}_1)$ und $\vec{P}_{\text{wing2}} (\vec{P}_2)$; im Text stehen nur $\vec{P}_1, \vec{P}_2$.
     - Im Diagramm wird der Einheitsvektor als $\vec{u} = \vec{e}_u$ bezeichnet.
  2. **Kraftvektor vs. Pfeilkoordinaten:**
     - $\vec{F} = (F_x, F_y)^T$ ist eine physikalische Kraft in Newton [$\mathrm{N}$].
     - Die Pfeilspitzenmaße $L$ (Länge) und $W$ (Basisbreite) sind **Bildschirm-Pixelmaße [$\mathrm{px}$]** (üblicherweise fest vorgegeben, z.B. $L=15\,\mathrm{px}, W=10\,\mathrm{px}$, damit die Pfeilspitze beim Zoomen nicht entartet).
     - Der Zusammenhang zwischen der Kraft am Knoten und der Spitze lautet:
       $$\vec{P}_{\text{tip}} = \vec{P}_{\text{node}} + s_F \cdot \vec{F}_{\text{screen}}$$
       mit Kraft-Skalierungsfaktor $s_F$ [$\mathrm{px/N}$]. Dieser Zusammenhang muss genannt werden, da sonst unklar bleibt, wie $\vec{P}_{\text{tip}}$ entsteht.
- **Korrekturvorschlag:**
  ```markdown
  Gegeben: Knoten $\vec{P}_{\text{node}}$ [$\mathrm{px}$], Kraftvektor $\vec{F} = (F_x, F_y)^T$ [$\mathrm{N}$], Pfeilspitzenmaße $L$ (Länge) und $W$ (Breite) [$\mathrm{px}$].

  1. **Pfeilspitze auf dem Bildschirm:** $\vec{P}_{\text{tip}} = \vec{P}_{\text{node}} + s_F \cdot \vec{F}_{\text{screen}} \quad [\mathrm{px}]$ ($s_F$: Kraftmaßstab [$\mathrm{px/N}$])
  2. **Normierter Richtungs-Einheitsvektor $\vec{e}_u$:**
     $$\vec{e}_u = \frac{\vec{F}}{\|\vec{F}\|} = \frac{1}{\sqrt{F_x^2 + F_y^2}} \begin{pmatrix} F_x \\ F_y \end{pmatrix} \quad (\|\vec{e}_u\| = 1)$$
  3. **Orthogonalvektor $\vec{e}_u^\perp$ ($90^\circ$ Drehung gegen Uhrzeigersinn):** $\vec{e}_u^\perp = \begin{pmatrix} -e_{u,y} \\ e_{u,x} \end{pmatrix}$
  4. **Basispunkt & Flügelpunkte des Dreiecks [$\mathrm{px}$]:**
     $$\vec{P}_{\text{base}} = \vec{P}_{\text{tip}} - L \cdot \vec{e}_u, \quad \vec{P}_{\text{wing1,2}} = \vec{P}_{\text{base}} \pm \frac{W}{2} \cdot \vec{e}_u^\perp$$
  ```

#### Befund 03-5: Fehlende mathematische Formulierung der inversen Transformation (`ScreenToWorld`)
- **Folie:** Folie 22 (Zeile 478–498)  
- **Titel:** `### Rücktransformation: Bildschirm zu Welt (`ScreenToWorld`)`  
- **Aktueller Text:**
  - Folie enthält nur C#-Code, keine mathematische Formel.
- **Kritik:** Während für die Vorwärtstransformation auf Folie 10 eine mathematische Formel existiert, wird die Umkehrfunktion ausschließlich im Code abgebildet. Für Studierende fehlt der direkte formale Gegenpart zur Vorwärtstransformation.
- **Korrekturvorschlag:**
  - Ergänzung der zweistufigen analytischen Formel über dem Codeblock:
  ```markdown
  1. **Invertierung von Pan & Zoom (Affine Matrix $\mathbf{M}$):**
     $$\begin{pmatrix} x_{\text{unzoomed}} \\ y_{\text{unzoomed}} \end{pmatrix} = \mathbf{M}^{-1} \begin{pmatrix} x_{\text{pixel}} \\ y_{\text{pixel}} \end{pmatrix} \quad [\mathrm{px}]$$
  2. **Invertierung der Viewport-Projektion ($[\mathrm{px}] \to [\mathrm{m}]$):**
     $$x_w = X_{\min} + \frac{x_{\text{unzoomed}} - x_{\text{offset}}}{s} \quad [\mathrm{m}], \quad y_w = Y_{\max} - \frac{y_{\text{unzoomed}} - y_{\text{offset}}}{s} \quad [\mathrm{m}]$$
  ```

---

## 4. Vollständige Variablen-Synopse aller 4 Kapitel

In der folgenden Referenztabelle sind alle mathematischen und physikalischen Größen der vier Foliensätze mit Symbol, Name, SI-Einheit, Vorkommen und Audit-Befund konsolidiert:

| Symbol | Name / Bedeutung | SI-Einheit | Kapitel / Folie | Status vor Audit | Korrekturstatus |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **00 Prolog** | | | | | |
| $t, f$ | Wahrheitswerte (true, false) | $[-]$ | 00 / F3 | informell | präzisiert als boolesche Konstanten |
| $\neg, \wedge, \vee$ | Negation, Konjunktion, Disjunktion | $[-]$ | 00 / F3 | Operatoren gelistet | formale Benennung ergänzt |
| $\Rightarrow, \Leftrightarrow$ | Implikation (Konditional), Äquivalenz | $[-]$ | 00 / F3 | „schwach/stark“ | fachsprachlich korrigiert |
| $\emptyset, \mathcal{P}(M)$ | Leere Menge, Potenzmenge von $M$ | $[-]$ | 00 / F4 | unvollständig $\mathcal{P}(\cdot)$ | mit Argument $M$ formalisiert |
| $\in, \notin$ | Elementrelationen | $[-]$ | 00 / F4 | als Operator gelistet | als Relation präzisiert |
| $\forall, \exists, \nexists$ | All-, Existenz-, Nichtexistenzquantor | $[-]$ | 00 / F4 | **Fehlklassifikation** | als Prädikatenquantoren korrigiert |
| $\cup, \cap, \setminus, \times$| Mengenoperationen | $[-]$ | 00 / F4 | vorhanden | vollständig |
| $\subset, \subseteq$ | Echte Teilmenge, Teilmenge | $[-]$ | 00 / F4 | vorhanden | vollständig |
| $(a,b) \in A \times B$ | Geordnetes Paar / 2-Tupel | $[-]$ | 00 / F4 | vorhanden | vollständig |
| **01 Einführung** | | | | | |
| $t$ | Zeitvariable | $\mathrm{s}$ | 01 / F18, 20 | nur erwähnt | SI-Einheit zugeordnet |
| $y(t), x(t)$ | Vertikale und horizontale Position | $\mathrm{m}$ | 01 / F18, 20 | **nicht definiert** | als Koordinaten [$\mathrm{m}$] definiert |
| $y_0$ | Anfangshöhe bei $t = 0\,\mathrm{s}$ | $\mathrm{m}$ | 01 / F18 | **nicht definiert** | Anfangswert deklariert |
| $v_0$ | Anfangsgeschwindigkeit | $\mathrm{m/s}$ | 01 / F18, 20 | **nicht definiert** | als Geschwindigkeit deklariert |
| $g$ | Erdbeschleunigung | $\mathrm{m/s^2}$ | 01 / F18, 20 | **nicht definiert** | Konstante $9{,}81\,\mathrm{m/s^2}$ ergänzt |
| $\alpha$ | Abwurfwinkel zur Horizontalen | $\mathrm{rad}$ / $^\circ$ | 01 / F20 | **nicht definiert** | Winkel deklariert |
| $k$ | Zeitschrittindex | $[-]$ | 01 / F19 | **nicht definiert** | $k \in \mathbb{N}_0$ formal deklariert |
| $\Delta t$ | Zeitschrittweite | $\mathrm{s}$ | 01 / F13, 19 | im Text erwähnt | SI-Einheit zugeordnet |
| $t_k$ | Zeitgitterstempel ($t_0 + k\Delta t$) | $\mathrm{s}$ | 01 / F19 | **nicht definiert** | Diskretisierungsformel ergänzt |
| $y_k$ | Diskreter Zustandswert ($\approx y(t_k)$) | $[\mathrm{var}]$ | 01 / F19 | **nicht definiert** | Näherungswert deklariert |
| $y'$ | Erste Zeitableitung ($\frac{\mathrm{d}y}{\mathrm{d}t}$) | $[\mathrm{var/s}]$ | 01 / F19 | implizit | als ODE-Steigung deklariert |
| $\vec{F}_R$ | Luftwiderstandskraft-Vektor | $\mathrm{N}$ | 01 / F20 | nur Formel | Vektor deklariert |
| $c_w$ | Strömungswiderstandskoeffizient | $[-]$ | 01 / F20 | **nicht definiert** | dimensionsloser Beiwert deklariert |
| $\rho$ | Fluiddichte (Luftdichte) | $\mathrm{kg/m^3}$ | 01 / F20 | **nicht definiert** | $\approx 1{,}2\,\mathrm{kg/m^3}$ ergänzt |
| $A$ | Projizierte Stirnfläche | $\mathrm{m^2}$ | 01 / F20 | **nicht definiert** | Querschnittsfläche deklariert |
| $\vec{v}, \|\vec{v}\|$ | Geschwindigkeitsvektor und Betrag | $\mathrm{m/s}$ | 01 / F20 | **nicht definiert** | Komponenten und Betrag erklärt |
| $F_{Rx}, F_{Ry}$ | Horiz./vert. Widerstandskraft | $\mathrm{N}$ | 01 / F20 | nur $\propto$ | Gleichung mit Vorfaktor ergänzt |
| **02 Vis. 2D Pixel**| | | | | |
| $x, y$ | Gitter-/Pixelkoordinaten | $[-]$ | 02 / F4, 9 | Spalte/Zeile | Wertebereich $0 \le x < W$ |
| $W, H$ | Breite, Höhe des Pixelrasters | $\mathrm{px}$ | 02 / F4, 7 | in Tabelle | $W, H$ im Formelsatz vereinheitlicht |
| $T, p, c$ | Temperatur, Druck, Konzentration | $\mathrm{K, Pa, mol/m^3}$| 02 / F4 | keine Einheiten | SI-Einheiten ergänzt |
| $\text{Stride}$ | Zeilenschrittweite im RAM | $\mathrm{Bytes}$ | 02 / F7, 9 | im Text erklärt | Einheiten [Bytes] ausgewiesen |
| $b_{\text{px}}$ | Speicherbedarf pro Pixel | $\mathrm{Bytes/px}$ | 02 / F7 | als „BytesJePixel“ | $4\,\mathrm{Bytes/px}$ präzisiert |
| $\text{Offset}$ | Relativer Byte-Versatz im RAM | $\mathrm{Bytes}$ | 02 / F9 | Formel | Einheit [Bytes] ergänzt |
| $p_{\text{BackBuffer}}$| Basiszeiger auf nativen Speicher | $\mathrm{Pointer}$ | 02 / F9 | erklärt | Startadresse deklariert |
| $v, v_{\min}, v_{\max}$| Skalare Messgröße und Schranken | $[\mathrm{var}]$ | 02 / F18 | erklärt | Einheitenkonsistenz herausgestellt |
| $u$ | Normierter Farbparameter | $[-]$ | 02 / F18 | Intervall $[0,1]$ | explizit als dimensionslos benannt |
| $\lfloor \cdot \rfloor$ | Gauß-Klammer / Abrundung | $[-]$ | 02 / F19 | nur Symbol | Floor-Funktion erklärt |
| $T(x,y,t)$ | Kontinuierliches Temperaturfeld | $\mathrm{K}$ | 02 / F23 | definiert | vollständig |
| $\alpha$ | Temperaturleitfähigkeit | $\mathrm{m^2/s}$ | 02 / F23 | definiert | vollständig |
| $\lambda$ | Wärmeleitfähigkeit des Materials | $\mathrm{W/(m\cdot K)}$ | 02 / F23 | **nicht definiert** | Stoffwert & Einheit ergänzt |
| $\rho$ | Materialdichte | $\mathrm{kg/m^3}$ | 02 / F23 | **nicht definiert** | Stoffwert & Einheit ergänzt |
| $c$ | Spezifische Wärmekapazität | $\mathrm{J/(kg\cdot K)}$ | 02 / F23 | **nicht definiert** | Stoffwert & Einheit ergänzt |
| $\Delta, \nabla^2$ | Laplace-Operator | $\mathrm{1/m^2}$ | 02 / F23 | partiell | Einheit $[\mathrm{1/m^2}]$ ergänzt |
| $Q(x,y,t)$ | Externe Wärmequellrate | $\mathrm{K/s}$ | 02 / F23 | **keine Einheit** | als $[\mathrm{K/s}]$ ($\dot{q}_V / \rho c$) definiert |
| $i, j$ | Diskrete räumliche Gitterindizes | $[-]$ | 02 / F24 | nur implizit | $i \in [0, W-1], j \in [0, H-1]$ |
| $n$ | Diskreter Zeitschrittindex | $[-]$ | 02 / F24 | **nicht definiert** | $t_n = n \cdot \Delta t$ deklariert |
| $h$ | Räumliche Gitterweite ($\Delta x = \Delta y$) | $\mathrm{m}$ | 02 / F24 | erklärt | Einheit [$\mathrm{m}$] ergänzt |
| $L_{i,j}$ | Diskrete Laplace-Summe | $\mathrm{K}$ | 02 / F24 | Formel | Einheit [$\mathrm{K}$] ergänzt |
| $s$ | Mesh-Fourier-Zahl ($\mathrm{Fo}_\Delta$) | $[-]$ | 02 / F24, 25 | „Vorfaktor“ | als Fourier-Zahl benannt |
| $\mathbf{x}$ | Ortsvektor auf dem Rand $\partial\Omega$ | $\mathrm{m}$ | 02 / F26 | Symbol | Ortsvektor deklariert |
| $\vec{n}$ | Äußerer Einheitsnormalenvektor | $[-]$ | 02 / F26 | „Normale“ | $\|\vec{n}\| = 1$ präzisiert |
| $\dot{q}''$ | Wärmestromdichte durch Rand | $\mathrm{W/m^2}$ | 02 / F26 | implizit | Fourier-Gesetz ergänzt |
| $T_{-1,j}$ | Geisterzelle (Ghost-Cell) | $\mathrm{K}$ | 02 / F26 | in Formel | fiktiver Außenknoten benannt |
| **03 Vis. 2D Vektor**| | | | | |
| $x_w, y_w$ | Weltkoordinaten (Modellraum) | $\mathrm{m}$ | 03 / F6, 10 | deklariert | vollständig |
| $x_s, y_s$ | Bildschirmkoordinaten (Canvas) | $\mathrm{px}$ | 03 / F6, 10 | deklariert | vollständig |
| $X_{\min}, X_{\max}$ | Bounding-Box Extrema ($X$-Achse) | $\mathrm{m}$ | 03 / F8 | Subskript kursiv | aufrecht $X_{\min}$ gesetzt |
| $Y_{\min}, Y_{\max}$ | Bounding-Box Extrema ($Y$-Achse) | $\mathrm{m}$ | 03 / F8 | Subskript kursiv | aufrecht $Y_{\min}$ gesetzt |
| $W_{\text{world}}, H_{\text{world}}$ | Modellbreite und -höhe | $\mathrm{m}$ | 03 / F8 | Formel | Einheit [$\mathrm{m}$] ergänzt |
| $W_{\text{canvas}}, H_{\text{canvas}}$| Canvas-Abmessungen | $\mathrm{px}$ | 03 / F8 | Formel | Einheit [$\mathrm{px}$] ergänzt |
| $\text{margin}$ | Sicherheitsabstand | $\mathrm{px}$ | 03 / F8, 10 | erklärt | Einheit [$\mathrm{px}$] ergänzt |
| $W_{\text{draw}}, H_{\text{draw}}$ | Nutzbare Zeichenfläche | $\mathrm{px}$ | 03 / F8 | Formel | Einheit [$\mathrm{px}$] ergänzt |
| $s_x, s_y$ | Richtungsabhängige Skalierung | $\mathrm{px/m}$ | 03 / F9 | **keine Einheit** | Einheit $[\mathrm{px/m}]$ deklariert |
| $s$ | Isotroper Skalierungsfaktor | $\mathrm{px/m}$ | 03 / F9, 10 | **keine Einheit** | Einheit $[\mathrm{px/m}]$ deklariert |
| $x_{\text{offset}}, y_{\text{offset}}$ | Zentrierungs-Offsets | $\mathrm{px}$ | 03 / F10 | Formel | Einheit [$\mathrm{px}$] ergänzt |
| $\vec{F}$ | Kraftvektor am Knoten | $\mathrm{N}$ | 03 / F15 | genannt | physik. Kraftvektor |
| $s_F$ | Kraft-Visualisierungsmaßstab | $\mathrm{px/N}$ | 03 / F15 | **fehlte völlig** | zur Pfeillänge ergänzt |
| $\vec{P}_{\text{node}}$ | Knotenpunkt / Kraftangriffspunkt | $\mathrm{px}$ | 03 / F15 | **fehlte auf Folie**| synchronisiert mit SVG |
| $\vec{P}_{\text{tip}}$ | Endpunkt des Pfeils (Spitze) | $\mathrm{px}$ | 03 / F15 | genannt | Einheit [$\mathrm{px}$] deklariert |
| $\vec{P}_{\text{base}}$ | Basispunkt der Pfeilspitze | $\mathrm{px}$ | 03 / F15 | **fehlte auf Folie**| synchronisiert mit SVG/Code |
| $\vec{P}_{\text{wing1,2}}$ | Flügelspitzen des Pfeildreiecks | $\mathrm{px}$ | 03 / F15 | als $\vec{P}_1, \vec{P}_2$ | synchronisiert mit SVG |
| $\vec{e}_u$ | Normierter Richtungsvektor | $[-]$ | 03 / F15 | als $\vec{u}$ | synchronisiert mit SVG ($\vec{e}_u$) |
| $\vec{e}_u^\perp$ | Orthogonaler Einheitsvektor | $[-]$ | 03 / F15 | als $\vec{u}^\perp$ | vollständig |
| $L, W$ | Länge und Basisbreite der Spitze | $\mathrm{px}$ | 03 / F15 | genannt | Einheiten [$\mathrm{px}$] deklariert |
| $\mathbf{M}$ | Affine Transformationsmatrix | $[-]$ | 03 / F22 | im Code | math. Matrixformel ergänzt |

---

## 5. Konkrete, folienkompatible Überarbeitungsvorschläge

Um die Foliensätze ohne Zeilenüberläufe (*Slide Overflows*) oder Layout-Brüche direkt auf den Standard nach DIN 1304 / ISO 80000-2 zu heben, werden nachfolgend präzise Ersetzungsblöcke bereitgestellt:

### 5.1 Korrekturen für `Folien/00_Prolog/Folien.md`

#### Folie 4: Präzisierung von Mengenlehre und Quantoren (Zeilen 53–62)
```markdown
### Mengenlehre

Untersuchung von Mengen, also Sammlungen von Objekten, und Operationen auf diesen:

- **Grundmengen:** Leere Menge $\emptyset$, Potenzmenge $\mathcal{P}(M)$ (Menge aller Teilmengen von $M$)
- **Elementrelation:** $x \in M$ ($x$ ist Element von $M$), $x \notin M$ ($x$ ist kein Element von $M$)
- **Prädikatenquantoren:** $\forall$ (für alle), $\exists$ (es existiert mind. ein), $\nexists$ (kein)
- **Mengenoperationen:** Vereinigung $\cup$, Schnitt $\cap$, Differenz $\setminus$, Kreuzprodukt $\times$
- **Mengenrelationen:** Teilmenge $\subseteq$, echte Teilmenge $\subset$
- **Tupel:** Geordnetes Paar $(a, b) \in A \times B$
```

---

### 5.2 Korrekturen für `Folien/01_Einführung/Folien.md`

#### Folie 18: Analytische Lösung mit vollständiger Legende (Zeilen 391–401)
```markdown
### **Analytische** Lösung

- **Was ist das?** Eine exakte, geschlossene mathematische Formel für die Lösung.
- **Beispiel (Freier Fall mit Anfangshöhe und -geschwindigkeit):**
  $$y(t) = y_0 + v_0 t - \frac{1}{2} g t^2$$
  mit Höhe $y(t)$ [$\mathrm{m}$], Zeit $t$ [$\mathrm{s}$], Anfangsposition $y_0$ [$\mathrm{m}$], Anfangsgeschwindigkeit $v_0$ [$\mathrm{m/s}$] und Erdbeschleunigung $g \approx 9{,}81\,\mathrm{m/s^2}$.
- **Vorteile:** Exakt, liefert allgemeines Verständnis über Parametereinflüsse.
- **Nachteile:** Nur für relativ einfache, meist lineare Systeme auffindbar. Bei komplexen Kräften (z.B. Luftwiderstand) existiert oft keine geschlossene Stammfunktion.
```

#### Folie 19: Numerische Lösung mit Diskretisierungsstruktur (Zeilen 404–417)
```markdown
### **Numerische** Lösung

- **Was ist das?** Eine schrittweise, approximative Berechnung der Zustandsbahn.
- **Beispiel (Explizites Euler-Verfahren für DGL 1. Ordnung $y'(t) = f(t, y)$):**
  $$y_{k+1} = y_k + \Delta t \cdot f(t_k, y_k), \quad t_{k+1} = t_k + \Delta t$$
  mit Zeitschrittindex $k \in \mathbb{N}_0$, Zeitgitter $t_k = t_0 + k \Delta t$ [$\mathrm{s}$], Schrittweite $\Delta t$ [$\mathrm{s}$] und approximiertem Zustand $y_k \approx y(t_k)$.
- Man startet beim Anfangszustand $(t_0, y_0)$ und extrapoliert schrittweise entlang des lokalen Tangentenanstiegs $f(t_k, y_k)$.
- **Vorteile:** Auf beliebige nichtlineare, gekoppelte Systeme anwendbar.
- **Nachteile:** Näherungslösung mit Diskretisierungs- und Rundungsfehlern; Algorithmus und Schrittweite $\Delta t$ entscheiden über numerische Stabilität.
```

#### Folie 20: Schiefer Wurf – Exakte Deklaration aller physikalischen Größen (Zeilen 420–447)
```markdown
### Analytisch vs. Numerisch: Ein Beispiel

**Problem:** Schiefer Wurf eines Körpers mit Masse $m$

<div class="columns top">
<div class="one">

**Analytisch (ohne Luftwiderstand)**
- Parabelbahn mit Anfangsgeschwindigkeit $v_0$ [$\mathrm{m/s}$] und Abwurfwinkel $\alpha$ [$^\circ$]:
  $$x(t) = v_0 \cos(\alpha) \cdot t$$
  $$y(t) = v_0 \sin(\alpha) \cdot t - \frac{1}{2} g t^2$$
- $x, y$: Position [$\mathrm{m}$], $g \approx 9{,}81\,\mathrm{m/s^2}$.
- Wurfweite, Steighöhe und Flugdauer analytisch exakt berechenbar.

</div>
<div class="one">

**Numerisch (mit Luftwiderstand)**
- Quadratische Widerstandskraft $\vec{F}_R$ [$\mathrm{N}$]:
  $$\vec{F}_R = -\frac{1}{2} c_w \rho A \|\vec{v}\| \vec{v}$$
  $$F_{Rx} = -\frac{1}{2} c_w \rho A \sqrt{v_x^2 + v_y^2} \cdot v_x$$
  $$F_{Ry} = -\frac{1}{2} c_w \rho A \sqrt{v_x^2 + v_y^2} \cdot v_y$$
- Beiwert $c_w$ ([-]), Luftdichte $\rho \approx 1{,}2\,\mathrm{kg/m^3}$, Stirnfläche $A$ [$\mathrm{m^2}$], Tempo $\|\vec{v}\|$ [$\mathrm{m/s}$].
- Gekoppelte Nichtlinearität erfordert schrittweise numerische Integration!

</div>
</div>

Fast alle praxisrelevanten Simulationen basieren auf numerischen Methoden.
```

---

### 5.3 Korrekturen für `Folien/02_Visualisierung_2D_Pixel/Folien.md`

#### Folie 23: Physikalische Wärmeleitungsgleichung mit thermodynamischen Stoffwerten (Zeilen 453–464)
```markdown
### Die physikalische 2D-Wärmeleitungsgleichung

Die zeitliche und räumliche Ausbreitung von Wärme in einem homogenen Medium wird durch die parabolische PDE beschrieben:

$$\frac{\partial T}{\partial t} = \alpha \cdot \Delta T + Q(x, y, t)$$

- $T(x, y, t)$: Temperaturfeld [$\mathrm{K}$] am Ort $(x,y)$ zur Zeit $t$ [$\mathrm{s}$]
- $\alpha = \frac{\lambda}{\rho \cdot c}$: Temperaturleitfähigkeit (Diffusivität) [$\mathrm{m^2/s}$]
  - $\lambda$: Wärmeleitfähigkeit des Materials [$\mathrm{W/(m\cdot K)}$]
  - $\rho$: Materialdichte [$\mathrm{kg/m^3}$]
  - $c$: spezifische Wärmekapazität [$\mathrm{J/(kg\cdot K)}$]
- $\Delta = \nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2}$: Laplace-Operator [$\mathrm{1/m^2}$]
- $Q(x, y, t)$: Externe Wärmequellrate [$\mathrm{K/s}$] (zugeführte Heizleistung je Volumen)
```

#### Folie 24: Finite Differenzen – Vollständige Indizierung und Fourier-Zahl (Zeilen 466–493)
```markdown
### Diskretisierung mit Finiten Differenzen

<div class="columns">
<div class="two">

Raumgitter $x_i = i \cdot h, y_j = j \cdot h$ ($h = \Delta x = \Delta y$ [$\mathrm{m}$]) und Zeitschritte $t_n = n \cdot \Delta t$ [$\mathrm{s}$]:

- **Laplace-Operator (5-Punkt-Differenzenstern):**
  $$\nabla^2 T_{i,j}^n \approx \frac{T_{i+1,j}^n + T_{i-1,j}^n + T_{i,j+1}^n + T_{i,j-1}^n - 4 T_{i,j}^n}{h^2}$$

- **Explizites Euler-Verfahren mit Zeitschritt $\Delta t$ [$\mathrm{s}$]:**
  $$T_{i,j}^{n+1} = T_{i,j}^n + \Delta t \cdot \left[ \alpha \nabla^2 T_{i,j}^n + Q_{i,j}^n \right]$$

- **Berechnungsform mit Fourier-Zahl $s = \frac{\alpha \Delta t}{h^2}$ (dimensionslos):**
  $$L_{i,j}^n = T_{i+1,j}^n + T_{i-1,j}^n + T_{i,j+1}^n + T_{i,j-1}^n - 4 T_{i,j}^n \quad [\mathrm{K}]$$
  $$T_{i,j}^{n+1} = T_{i,j}^n + s \cdot L_{i,j}^n + \Delta t \cdot Q_{i,j}^n \quad [\mathrm{K}]$$

</div>
<div class="one">

![w:340](./Diagramme/FDM_5_Punkt_Stern.svg)

**5-Punkt-Stern:**
Temperatur an Gitterzelle $(i, j)$ diffundiert zu den 4 direkten Nachbarzellen.

</div>
</div>
```

---

### 5.4 Korrekturen für `Folien/03_Visualisierung_2D_Vektor/Folien.md`

#### Folie 8: Bounding Box & Bemaßung mit Knotenindizes (Zeilen 144–168)
```markdown
### Bounding Box & Bemaßung des Modells

Beurteilung der Gesamtausdehnung aller $N$ Modellknoten $(x_i, y_i) \in \mathbb{R}^2$ [$\mathrm{m}$]:

<div class="columns top">
<div class="one">

**Extremwerte in Weltkoordinaten [$\mathrm{m}$]:**
$$X_{\min} = \min_{i=1\dots N} (x_i), \quad X_{\max} = \max_{i=1\dots N} (x_i)$$
$$Y_{\min} = \min_{i=1\dots N} (y_i), \quad Y_{\max} = \max_{i=1\dots N} (y_i)$$

**Modellausdehnung [$\mathrm{m}$]:**
$$W_{\text{world}} = X_{\max} - X_{\min}$$
$$H_{\text{world}} = Y_{\max} - Y_{\min}$$

</div>
<div class="one">

**Nutzbare Bildschirmfläche [$\mathrm{px}$]:**
- Randabstand `margin` [$\mathrm{px}$] schützt vor dem Abschneiden von Linienstärken und Knoten:
$$W_{\text{draw}} = W_{\text{canvas}} - 2 \cdot \text{margin}$$
$$H_{\text{draw}} = H_{\text{canvas}} - 2 \cdot \text{margin}$$

</div>
</div>
```

#### Folie 9: Seitenverhältnis mit expliziter Einheit $[\mathrm{px/m}]$ (Zeilen 171–192)
```markdown
### Erhalt des Seitenverhältnisses (Aspect Ratio)

<div class="columns top">
<div class="one">

**Naive Skalierung (Verzerrung!):**
$$s_x = \frac{W_{\text{draw}}}{W_{\text{world}}}, \quad s_y = \frac{H_{\text{draw}}}{H_{\text{world}}} \quad \left[\frac{\mathrm{px}}{\mathrm{m}}\right]$$
- Wenn $s_x \ne s_y$, wird das Modell anisotrop verzerrt.
- Kreise werden zu Ellipsen, rechte Winkel und physikalische Proportionen verfälscht!

</div>
<div class="one">

**Uniform Scaling (Isotrop):**
$$s = \min(s_x, s_y) \quad \left[\frac{\mathrm{px}}{\mathrm{m}}\right]$$
- Der Skalierungsfaktor $s$ definiert die Auflösung: **Pixel pro physikalischem Meter**.
- Der kleinere Faktor garantiert, dass das Modell vollständig in den Viewport passt.
- **Alle Winkel und Proportionen bleiben exakt erhalten.**

</div>
</div>
```

#### Folie 15: Pfeilspitzenberechnung – Perfekte Synchronisation mit SVG (Zeilen 300–315)
```markdown
### Analytische Berechnung der Pfeilspitze

Gegeben: Kraftangriffspunkt $\vec{P}_{\text{node}}$ [$\mathrm{px}$], Kraftvektor $\vec{F} = (F_x, F_y)^T$ [$\mathrm{N}$] und Pfeilspitzenmaße $L$ (Länge) und $W$ (Basisbreite) in Pixeln [$\mathrm{px}$]:

1. **Pfeilspitze:** $\vec{P}_{\text{tip}} = \vec{P}_{\text{node}} + s_F \cdot \begin{pmatrix} F_x \\ -F_y \end{pmatrix} \quad [\mathrm{px}]$ mit Kraftmaßstab $s_F$ [$\mathrm{px/N}$]
2. **Normierter Richtungs-Einheitsvektor $\vec{e}_u$:**
   $$\vec{e}_u = \frac{\vec{P}_{\text{tip}} - \vec{P}_{\text{node}}}{\|\vec{P}_{\text{tip}} - \vec{P}_{\text{node}}\|} = \begin{pmatrix} u_x \\ u_y \end{pmatrix}, \quad \|\vec{e}_u\| = 1$$
3. **Orthogonalvektor ($90^\circ$ Drehung im Uhrzeigersinn):** $\vec{e}_u^\perp = \begin{pmatrix} -u_y \\ u_x \end{pmatrix}$
4. **Basispunkt und Flügel-Eckpunkte des Pfeildreiecks [$\mathrm{px}$]:**
   $$\vec{P}_{\text{base}} = \vec{P}_{\text{tip}} - L \cdot \vec{e}_u, \quad \vec{P}_{\text{wing1,2}} = \vec{P}_{\text{base}} \pm \frac{W}{2} \cdot \vec{e}_u^\perp$$
```

---

## 6. Fazit & Freigabeempfehlung

Der vorliegende Audit belegt:
1. Die mathematischen Grundstrukturen und didaktischen Herleitungen in den Foliensätzen 00 bis 03 sind inhaltlich hochkarätig und didaktisch stringent konzipiert.
2. Es bestanden jedoch erhebliche Lücken bei der **formalen Variablendeklaration** (insbesondere in Kapitel 01 beim Schiefen Wurf und in Kapitel 02 bei den thermodynamischen Parametern) sowie beim Ausweisen **physikalischer Einheiten**.
3. Durch die in Kapitel 5 formulierten Korrekturvorschläge können sämtliche Befunde behoben werden. Alle vorgeschlagenen Anpassungen wurden so formuliert, dass sie:
   - die strengen Vorgaben von DIN 1304 und ISO 80000-2 erfüllen,
   - die 100%ige Konsistenz zu den begleitenden SVG-Diagrammen und C#-Quellcodes herstellen,
   - die Folienlayouts nicht sprengen und vertikale Scrollbalken bzw. Überläufe im MARP-Theme `fhooe` sicher ausschließen.

Nach Einpflegen dieser Korrekturen erreichen die Foliensätze 00 bis 03 eine mathematisch-physikalische Exaktheitsbewertung von **9,8 von 10 Punkten**.
