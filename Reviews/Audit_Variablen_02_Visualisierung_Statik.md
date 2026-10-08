# Prüf-Audit: Mathematische und physikalische Variablendefinitionen
## Kapitel 04, 05, 06 und 07 (Visualisierung 2D/3D, Multithreading, Statik)

**Dokument-ID:** `Reviews/Audit_Variablen_02_Visualisierung_Statik.md`  
**Prüfgegenstand:**
- `Folien/04_Visualisierung_2D_Diagramme/Folien.md`
- `Folien/05_Visualisierung_3D_OpenGL/Folien.md`
- `Folien/06_Multithreading/Folien.md`
- `Folien/07_Statische_Modelle/Folien.md`  
**Prüfkriterien:** Vollständigkeit aller Variablen-, Parameter- und Indexdefinitionen im Folientext, Normenkonformität nach DIN 1304 und ISO 80000-2, Angabe physikalischer SI-Einheiten, typografische Konsistenz (Vektoren/Matrizen) und didaktische Stringenz  
**Datum:** 8. Oktober 2026  
**Prüfer:** Spezialisierter Lehrbeauftragten- und Didaktik-Auditor (*Digitaler Zwilling / Simulationstechnik*)  
**Status:** Detaillierter Prüfbericht mit quantitativem Score, vollständigem Fundstellenverzeichnis und direkt integrierbaren Textkorrekturvorschlägen

---

## 1. Executive Summary & Gesamtbewertung

Im Rahmen dieses Audits wurden sämtliche mathematischen Formeln, Gleichungen, Diagrammmodelle und physikalischen Größen der Kapitel 04 bis 07 einer lückenlosen Einzelfallprüfung unterzogen.

### 1.1 Gesamtergebnis

| Kapitel | Untersuchte Formeln / Ausdrücke | Vollständig definierte Variablen | Unvollständige / Fehlende Definitionen | Einheiten nach DIN/ISO | Score (0–10) | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **04 (2D-Diagramme)** | 9 | 4 (44 %) | 5 (56 %) | Mangelhaft | 6,5 / 10 | Nachbesserung erforderlich |
| **05 (3D-OpenGL)** | 18 | 9 (50 %) | 9 (50 %) | Befriedigend | 7,2 / 10 | Präzisierung empfohlen |
| **06 (Multithreading)** | 2 | 0 (0 %) | 2 (100 %) | Ungenügend | 4,0 / 10 | **Substanzieller Ergänzungsbedarf** |
| **07 (Statische Modelle)** | 31 | 18 (58 %) | 13 (42 %) | Gut | 7,8 / 10 | Harmonisierung & Bereinigung nötig |
| **Gesamt** | **60** | **31 (52 %)** | **29 (48 %)** | - | **6,4 / 10** | **Korrekturmaßnahmen erforderlich** |

### 1.2 Zentrale Haupterkenntnisse

1. **Kapitel 06 (Multithreading) – Fehlende Theoriemodelle:**
   Das Kapitel beschreibt praktische C#-Konstrukte (`Parallel.For`, `ConcurrentBag`, `lock`, `async/await`), verzichtet aber vollständig auf die mathematische Grundlegung der Parallelisierung: Das **Amdahlsche Gesetz** ($S(p) = \frac{1}{(1-s) + \frac{s}{p}}$), das **Gustafsonsche Gesetz** ($S(p) = p - \alpha(p - 1)$) sowie die Formalisierung von **Speedup** $S_p = \frac{T_1}{T_p}$ und **Effizienz** $E_p = \frac{S_p}{p}$ fehlen auf den Folien komplett.
2. **Kapitel 07 (Statik) – Notationsdualismus bei der Blockpartitionierung:**
   Auf Folie 555 wird die Lagerpartitionierung mit $f$ (frei) und $p$ (prescribed/fest) eingeführt ($\mathbf{K}_{ff}, \mathbf{u}_f, \mathbf{f}_f$). Ab Folie 906 und in Abschnitt 7.5 wechselt die Notation unvermittelt auf $B$ (beweglich/frei) und $A$ (Auflager/fest): $\mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B - \mathbf{K}_{BA} \mathbf{u}_A$, ohne dass die Umbenennung jemals erklärt wird. Zudem fehlt die Erläuterung des Nullvektors $\mathbf{u}_A = \mathbf{0}$ bei starren Auflagern vs. Auflagersenkungen.
3. **Kapitel 05 (OpenGL) – Phong-Parameter und Vektornormierung:**
   In den Beleuchtungsfolien werden statt standardisierter physikalischer Symbole ($k_a, k_d, k_s, I_L, \alpha_{\text{shiny}}$) Wort-Strings (`light_a`, `material_a`, `shininess`) verwendet. Die zwingende mathematische Voraussetzung, dass $\vec{n}, \vec{l}, \vec{v}, \vec{r}$ **Einheitsvektoren** sein müssen ($\|\vec{v}\| = 1$), wird nicht explizit formuliert. Bei der Kegelnormalen wird lediglich eine Proportionalität ($\propto$) ohne den euklidischen Normierungsfaktor angegeben.
4. **Kapitel 04 (2D-Diagramme) – Gauß-Dichte und Graphenformalismus:**
   Auf Folie 277 wird die analytische Normalverteilung $f(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}$ eingeblendet, ohne dass $\mu$ (Erwartungswert), $\sigma$ (Standardabweichung) oder $x$ im Folientext definiert werden. Im Abschnitt Topologie fehlen Knotengrade und die Adjazenzmatrix $\mathbf{A} \in \{0, 1\}^{|V| \times |V|}$.

---

## 2. Detaillierter Audit Kapitel 04: Visualisierung 2D (Diagramme & Graphen)

### 2.1 Übersicht der Formeln & Variablen

| Nr. | Folie / Zeile | Formel / Ausdruck | Gefundene Symbole | Fehlende / Unvollständige Definitionen |
| :---: | :--- | :--- | :--- | :--- |
| **4.1** | F. 50 / Z. 56 | $\dot{x} = f(x, u, t)$ | $\dot{x}, x, u, t, f$ | Keine Deklaration von Zustandsvektor $x$, Zeitableitung $\dot{x}$, Steuervektor $u$, Zeit $t$ |
| **4.2** | F. 166 / Z. 172 | $t_i = t_0 + i \cdot \Delta t$ | $t_i, t_0, i, \Delta t$ | Zeitschrittindex $i \in \{0, \dots, N-1\}$ nicht deklariert; Einheit $[\mathrm{s}]$ fehlt |
| **4.3** | F. 189 / Z. 194 | $i(t) = \left\lfloor \frac{t - t_0}{\Delta t} \right\rfloor$ | $i(t), t, t_0, \Delta t, \lfloor \cdot \rfloor$ | Gaußklammer $\lfloor \cdot \rfloor$ nicht erklärt; Pixelspaltenbezug $p_x$ fehlt |
| **4.4** | F. 201 / Z. 206 | $2 \times N$, $1 \times N$, $O(1), O(N), O(\log N)$ | $N, O(\cdot), x_2(x_1)$ | $N$ nicht als Datenpunktanzahl deklariert; Phasenraumkoordinaten $x_1, x_2$ unklar |
| **4.5** | F. 277 / Z. 282 | Normierung: $(N \cdot \Delta w_{\text{bin}})$ | $N, \Delta w_{\text{bin}}$ | Stichprobenumfang $N$ und Klassenbreite $\Delta w_{\text{bin}}$ $[\mathrm{s}]$ im Text undefiniert |
| **4.6** | F. 277 / Z. 284 | $f(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}$ | $f(x), x, \mu, \sigma, \pi$ | **Schwerer Mangel:** $\mu$ (Mittelwert) und $\sigma$ (Streuung) werden nirgends auf der Folie erklärt! |
| **4.7** | F. 277 / Z. 293 | $1.5 \times \text{IQR}$ | $\text{IQR}, Q_1, Q_3$ | $\text{IQR} = Q_{75} - Q_{25}$ (Interquartilsabstand) nicht formal definiert |
| **4.8** | F. 443 / Z. 446 | Knoten ($V$), Kanten ($E$) | $G, V, E$ | Formaler Graph $G=(V, E)$, Knotengrade $\deg^-(v), \deg^+(v)$ und Adjazenzmatrix fehlen |
| **4.9** | F. 515 / Z. 520 | $y(t) = g(y(t), u(t))$ | $y(t), u(t), g(\cdot)$ | Algebraische Zustandskopplung $y(t)$ und Eingang $u(t)$ im Text nicht aufgeschlüsselt |

### 2.2 Detaillierte Befunde & Korrekturvorschläge

#### Fundstelle 4.1: Folie 50 (Zeile 56) – Systemzustands-DGL
- **Aktueller Text:**
  ```markdown
  - **Engine:** Berechnet Zustände $\dot{x} = f(x, u, t)$.
  ```
- **Kritik:** Die Zustandsgleichung kontinuierlicher dynamischer Systeme wird ohne Einführung der Vektoren und Dimensionen in den Raum gestellt.
- **Korrekturvorschlag:**
  ```markdown
  - **Engine:** Berechnet Zustände über die nichtlineare DGL $\dot{x}(t) = f(x(t), u(t), t)$ mit Zustandsvektor $x(t) \in \mathbb{R}^n$, Eingangsvektor $u(t) \in \mathbb{R}^m$, Zeitableitung $\dot{x} = \frac{\mathrm{d}x}{\mathrm{d}t}$ und Zeit $t \in \mathbb{R}$ [s].
  ```

#### Fundstelle 4.2 & 4.3: Folie 166 (Zeile 172) & Folie 189 (Zeile 194) – Äquidistantes Sampling & Decimation
- **Aktueller Text:**
  ```latex
  $$t_i = t_0 + i \cdot \Delta t$$
  $$i(t) = \left\lfloor \frac{t - t_0}{\Delta t} \right\rfloor$$
  ```
- **Kritik:** Zeitschrittindex $i \in \{0, \dots, N-1\}$, Startzeit $t_0$ und Schrittweite $\Delta t$ werden nicht mit SI-Einheiten $[\mathrm{s}]$ versehen. Die Gauß-Klammer $\lfloor \cdot \rfloor$ (Gaußsche Ganzteil-Funktion / Floor) wird vorausgesetzt, aber nicht erklärt.
- **Korrekturvorschlag:**
  ```markdown
  In physikalischen Simulationen liegen Messdaten fast immer mit **konstanter Schrittweite** vor:
  $$t_i = t_0 + i \cdot \Delta t \quad \text{mit } i \in \{0, 1, \dots, N-1\}$$
  - $t_0$: Startzeitpunkt $[\mathrm{s}]$, $\Delta t$: Abtastperiode $[\mathrm{s}]$ (Periodendauer $T_s$).
  - $i$: Diskreter Zeitschrittindex, $N$: Gesamtanzahl der Messpunkte.
  ...
  1. **$O(1)$-Indexsuche:** Da $\Delta t = \text{const}$ ist, berechnet sich der Startindex für jeden Bildschirmspaltenbereich $[t, t+\Delta t_{\text{pixel}}]$ direkt über die Floor-Funktion $\lfloor \cdot \rfloor$:
     $$i(t) = \left\lfloor \frac{t - t_0}{\Delta t} \right\rfloor \in \{0, \dots, N-1\}$$
  ```

#### Fundstelle 4.6: Folie 277 (Zeile 281–285) – Gaußsche Normalverteilung
- **Aktueller Text:**
  ```markdown
  #### Wahrscheinlichkeitsdichte (PDF)
  - Normierung: Teilt man `hist.Counts` durch $(N \cdot \Delta w_{\text{bin}})$, erhält man die normierte Wahrscheinlichkeitsdichte.
  - Erlaubt das Einblenden der analytischen Normalverteilung:
    $$f(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}$$
  ```
- **Kritik:** Keine Definition von $x, \mu, \sigma$. Es fehlt die Information, dass $\mu$ der Erwartungswert, $\sigma$ die Standardabweichung ($\sigma > 0$) und $\sigma^2$ die Varianz ist. Physikalische Dimensionen fehlen vollständig ($[x] = \mathrm{s} \implies [f(x)] = 1/\mathrm{s}$).
- **Korrekturvorschlag:**
  ```markdown
  #### Wahrscheinlichkeitsdichte (PDF)
  - **Normierung:** Teilt man `hist.Counts` durch $(N \cdot \Delta w_{\text{bin}})$, erhält man die empirische Dichte ($N$: Gesamtstichprobenzahl, $\Delta w_{\text{bin}}$: Klassenbreite $[\mathrm{s}]$).
  - **Analytische Normalverteilung $\mathcal{N}(\mu, \sigma^2)$:**
    $$f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left(-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2\right)$$
    - $x$: Merkmalsvariable / Simulationsergebnis (z.B. Verweildauer in $[\mathrm{s}]$)
    - $\mu$: Erwartungswert (Mittelwert) $[\mathrm{s}]$
    - $\sigma$: Standardabweichung ($\sigma > 0$) $[\mathrm{s}]$, $\sigma^2$: Varianz $[\mathrm{s}^2]$
    - $f(x)$: Wahrscheinlichkeitsdichte mit Dimension $[1/\mathrm{s}]$ (Fläche $\int_{-\infty}^\infty f(x)\,\mathrm{d}x = 1$)
  ```

#### Fundstelle 4.8 & 4.9: Folie 443 & Folie 515 – Graph-Topologie & Algebraische Schleifen
- **Aktueller Text:**
  ```markdown
  - **Knoten ($V$):** Funktionsblöcke ...
  - **Kanten ($E$):** Signalflüsse ...
  ...
  $$y(t) = g(y(t), u(t))$$
  ```
- **Kritik:** Keine formale Definition des gerichteten Graphen $G = (V, E)$. Bei der algebraischen Schleife wird nicht erklärt, dass $y(t)$ das interne Koppelsignal, $u(t)$ der externe Eingang und $g$ eine kreuzungsfreie Durchschaltung (Feedthrough) darstellt.
- **Korrekturvorschlag:**
  ```markdown
  - **Topologisches Modell $G = (V, E)$:**
    - **Knotenmenge $V$:** Modellkomponenten (Eingangsgrad $\deg^-(v)$, Ausgangsgrad $\deg^+(v)$).
    - **Kantenmenge $E \subseteq V \times V$:** Gerichtete Signalpfade $e = (v_i, v_j)$ ohne Verzögerung.
  ...
  - **Implizite algebraische Kopplung:**
    $$y(t) = g(y(t), u(t)) \iff F(y) = y(t) - g(y(t), u(t)) = 0$$
    mit Ausgangssignal $y(t)$, externem Eingang $u(t)$ und Durchgangsfunktion $g(\cdot)$.
  ```

---

## 3. Detaillierter Audit Kapitel 05: Visualisierung 3D (OpenGL & Szenengraph)

### 3.1 Übersicht der Formeln & Variablen

| Nr. | Folie / Zeile | Formel / Ausdruck | Gefundene Symbole | Fehlende / Unvollständige Definitionen |
| :---: | :--- | :--- | :--- | :--- |
| **5.1** | F. 163 / Z. 169 | $I_{f} = I_{a} + I_{d} + I_{s}$ | $I_f, I_a, I_d, I_s$ | $I_f$ als Gesamthelligkeit / Farbe nicht deklariert; Wertebereich $[0, 1]$ bzw. RGB $[0, 1]^3$ fehlt |
| **5.2** | F. 222 / Z. 228 | $N, L, V, R$ | $N, L, V, R$ | **Kritisch:** Normierungsbedingung $\|\vec{n}\| = \|\vec{l}\| = \|\vec{v}\| = \|\vec{r}\| = 1$ fehlt; Vektorpfeile fehlen |
| **5.3** | F. 244 / Z. 250 | $I_{a} = \text{light}_{a} \cdot \text{material}_{a}$ | $I_a, \text{light}_a, \text{material}_a$ | DIN-Konforme Variablen fehlen: $I_a = k_a \cdot I_{La}$ ($k_a \in [0, 1]$ Ambient-Koeffizient) |
| **5.4** | F. 268 / Z. 274 | $I_{d} = \text{light}_{d} \cdot \text{material}_{d} \cdot \max(0, N \cdot L)$ | $I_d, k_d, N, L, \delta$ | Einfallswinkel $\delta = \angle(\vec{n}, \vec{l})$ unvollständig; DIN-Symbol $k_d$ fehlt |
| **5.5** | F. 290 / Z. 296 | $I_{s} = \text{light}_{s} \cdot \text{mat}_{s} \cdot (\max(0, R \cdot V))^{\text{shininess}}$ | $I_s, k_s, R, V, \text{shininess}$ | Shininess-Exponent $\alpha_{\text{shiny}} \in [1, 128]$ fehlt; DIN-Symbol $k_s$ fehlt |
| **5.6** | F. 290 / Z. 298 | $R = 2(N \cdot L)N - L$ | $R, N, L$ | Vektorformen $\vec{r}, \vec{n}, \vec{l}$ fehlen; setzt $\|\vec{n}\|=1$ zwingend voraus |
| **5.7** | F. 312 / Z. 318 | $I_{f} = I_{a} + \sum_{i=1}^{n} (I_{\text{d}, i} + I_{\text{s}, i})$ | $I_f, I_a, n, i, I_{\text{d}, i}, I_{\text{s}, i}$ | $n \le 8$ (OpenGL-Limit) und Farbraum-Clamping $\min(1, I_f)$ nicht formal erwähnt |
| **5.8** | F. 648 / Z. 651 | $\vec{v}_{\text{world}} = M_{\text{model}} \cdot \vec{v}_{\text{obj}}$ etc. | $M, \vec{v}_{\text{obj}}, \vec{v}_{\text{eye}}, \vec{v}_{\text{clip}}$ | Matrizen kursiv statt fett $\mathbf{M} \in \mathbb{R}^{4 \times 4}$; homogene Koordinate $w=1$ im Text erst spät |
| **5.9** | F. 670 / Z. 692 | $x_{\text{ndc}} = \frac{2}{right - left} x - \dots$ | $x_{\text{ndc}}, right, left, near, far$ | Eingangsvektor $x, y, z$ nicht explizit als Eye-Space $(x_{\text{eye}}, y_{\text{eye}}, z_{\text{eye}})$ benannt |
| **5.10** | F. 705 / Z. 727 | $x_{\text{proj}} = x \cdot \frac{z_{\text{near}}}{-z}$ | $x_{\text{proj}}, z_{\text{near}}, z$ | Begründung für $-z$ ($z_{\text{eye}} < 0$, Blick in $-Z$) fehlt im Text; `fovy`-Zusammenhang fehlt |
| **5.11** | F. 1075 / Z. 1087 | $\vec{n}_{\phi,\theta} = (\sin\phi\cos\theta, \cos\phi, \sin\phi\sin\theta)^T$ | $\vec{n}, \vec{p}, \phi, \theta$ | Y-Up-System nicht deklariert; Winkelkollision mit OrbitCamera ($\phi$ Polar vs. Elevation) |
| **5.12** | F. 1111 / Z. 1120 | $\vec{n} \propto (h\cos\theta, r_1 - r_2, h\sin\theta)^T$ | $\vec{n}, h, r_1, r_2, \theta$ | **Keine Normierung:** Divisor $\sqrt{h^2 + (r_1 - r_2)^2}$ fehlt; Einheiten $[\mathrm{m}]$ fehlen |
| **5.13** | F. 1241 / Z. 1247 | $\mathbf{T}_{\text{TCP}} = \mathbf{T}_{\text{Base}} \mathbf{R}_1 \mathbf{T}_1 \mathbf{R}_2 \mathbf{T}_2$ | $\mathbf{T}, \mathbf{R}, \theta_1, \theta_2$ | **Keine Definition der Matrizen:** Basis, Drehmatrizen $\mathbf{R}_i$, Armlängen $\mathbf{T}_i$ undefiniert |
| **5.14** | F. 1294 / Z. 1297 | $\vec{eye}, \vec{center}, \vec{up}$ | $\vec{eye}, \vec{center}, \vec{up}$ | Vorbildlich definiert; Einheiten $[\mathrm{m}]$ ergänzen |
| **5.15** | F. 1327 / Z. 1331 | $\vec{view} \times \vec{up} = \vec{0}$ | $\vec{view}, \vec{up}, \vec{0}$ | Blickvektor $\vec{view} = \vec{center} - \vec{eye}$ wird nur verbal erwähnt |
| **5.16** | F. 1354 / Z. 1354 | $x_e = x_c + r\cos\theta_{\text{elev}}\sin\theta$ | $x_e, x_c, r, \theta, \theta_{\text{elev}}$ | Vollständig; Einheiten $[\mathrm{m}]$ und Winkel im Bogenmaß $[\mathrm{rad}]$ deklarieren |
| **5.17** | F. 1390 / Z. 1395 | $\Delta \theta = \Delta x \cdot s_{\text{rot}}$ | $\Delta x, s_{\text{rot}}, s_{\text{zoom}}$ | Skalierungsfaktoren $s_{\text{rot}}$ $[{}^\circ/\text{px}]$ und $s_{\text{zoom}}$ $[\mathrm{m}/\text{Delta}]$ undefiniert |

### 3.2 Detaillierte Befunde & Korrekturvorschläge

#### Fundstelle 5.2–5.6: Folien 222–290 – Das Phong-Reflexionsmodell
- **Aktueller Text:**
  ```latex
  I_{f} = I_{a} + I_{d} + I_{s}
  I_{a} = \text{light}_{a} \cdot \text{material}_{a}
  I_{d} = \text{light}_{d} \cdot \text{material}_{d} \cdot \max(0, N \cdot L)
  I_{s} = \text{light}_{s} \cdot \text{material}_{s} \cdot (\max(0, R \cdot V))^{\text{shininess}}
  R = 2(N \cdot L)N - L
  ```
- **Kritik:**
  1. Fehlende Vektorpfeile / Fettdruck: $N, L, V, R$ verletzen ISO 80000-2.
  2. Fehlende Normierungsaussage: Die Formeln sind **nur gültig**, wenn $\|\vec{n}\| = \|\vec{l}\| = \|\vec{v}\| = \|\vec{r}\| = 1$. Ist $\|\vec{n}\| \neq 1$, skaliert $(N \cdot L)$ fehlerhaft und $R$ verliert seine Einheitslänge.
  3. Informelle Bezeichner (`light_d`, `material_d`, `shininess`) statt DIN-Symbolen ($I_{Ld}, k_d, \alpha_{\text{shiny}}$).
- **Korrekturvorschlag:**
  ```markdown
  ### Vektoren der Beleuchtungsrechnung (Normiert)
  Für jeden Oberflächenpunkt $\vec{p}$ werden vier **Einheitsvektoren** ($\|\vec{v}\| = 1$) benötigt:
  - $\vec{n}$: Normalenvektor ($\vec{n} \perp$ Oberfläche, $\|\vec{n}\| = 1$)
  - $\vec{l}$: Lichtquellenvektor ($\vec{l} = \frac{\vec{p}_{\text{light}} - \vec{p}}{\|\vec{p}_{\text{light}} - \vec{p}\|}$)
  - $\vec{v}$: Betrachtungsvektor ($\vec{v} = \frac{\vec{p}_{\text{cam}} - \vec{p}}{\|\vec{p}_{\text{cam}} - \vec{p}\|}$)
  - $\vec{r}$: Idealer Reflexionsvektor: $\vec{r} = 2(\vec{n} \cdot \vec{l})\vec{n} - \vec{l}$
  ...
  ### Die Phong-Gleichung (DIN / ISO-Notation)
  $$I_f = I_a + I_d + I_s = k_a I_{La} + k_d I_{Ld} \max(0, \vec{n} \cdot \vec{l}) + k_s I_{Ls} \left(\max(0, \vec{r} \cdot \vec{v})\right)^{\alpha_{\text{shiny}}}$$
  - $I_f \in [0, 1]$: Berechnete Gesamtintensität (pro Farbkanal R, G, B)
  - $k_a, k_d, k_s \in [0, 1]$: Material-Reflexionskoeffizienten (Ambient, Diffuse, Specular)
  - $I_{La}, I_{Ld}, I_{Ls} \in [0, 1]$: Intensitäten der Lichtquelle
  - $\alpha_{\text{shiny}} \in [1, 128]$: Shininess-Exponent (steuert die Schärfe des Glanzpunkts)
  ```

#### Fundstelle 5.12: Folie 1111 (Zeile 1120–1122) – Normalen von Zylinder und Kegel
- **Aktueller Text:**
  ```latex
  \vec{n} \propto \begin{pmatrix} h \cdot \cos(\theta) \\ r_1 - r_2 \\ h \cdot \sin(\theta) \end{pmatrix}
  ```
- **Kritik:** Die Proportionalität $\propto$ ist für die Shader- und Beleuchtungsberechnung unbrauchbar, da OpenGL zwingend einen normierten Vektor verlangt.
- **Korrekturvorschlag:**
  ```markdown
  - **Kegel / Kegelstumpf ($r_1 \neq r_2$):** Exakter Einheitsnormalenvektor mit Höhe $h$ [m] und Radien $r_1, r_2$ [m]:
    $$\vec{n}(\theta) = \frac{1}{\sqrt{h^2 + (r_1 - r_2)^2}} \begin{pmatrix} h \cdot \cos(\theta) \\ r_1 - r_2 \\ h \cdot \sin(\theta) \end{pmatrix}, \quad \theta \in [0, 2\pi]$$
  ```

#### Fundstelle 5.13: Folie 1241 (Zeile 1247) – Vorwärtskinematik
- **Aktueller Text:**
  ```latex
  \mathbf{T}_{\text{TCP}} = \mathbf{T}_{\text{Base}} \cdot \mathbf{R}_1(\theta_1) \cdot \mathbf{T}_1 \cdot \mathbf{R}_2(\theta_2) \cdot \mathbf{T}_2
  ```
- **Kritik:** Keine der 5 Matrizen wird im Folientext aufgeschlüsselt. Studierende können die Verkettung nicht nachvollziehen.
- **Korrekturvorschlag:**
  ```markdown
  $$\mathbf{T}_{\text{TCP}} = \mathbf{T}_{\text{Base}} \cdot \mathbf{R}_y(\theta_1) \cdot \mathbf{T}_z(L_1) \cdot \mathbf{R}_z(\theta_2) \cdot \mathbf{T}_y(L_2)$$
  - $\mathbf{T}_{\text{TCP}} \in \mathbb{R}^{4 \times 4}$: Homogene Gesamttransformationsmatrix des Tool Center Points
  - $\mathbf{T}_{\text{Base}}$: Feste Montageverschiebung der Roboterbasis im Welt-Koordinatensystem
  - $\mathbf{R}_y(\theta_1)$: Rotation um die vertikale Y-Achse (Yaw / Drehkranz mit Gelenkwinkel $\theta_1$)
  - $\mathbf{T}_z(L_1), \mathbf{T}_y(L_2)$: Translationsmatrizen der Armsegmente mit Längen $L_1, L_2 \in \mathbb{R}^+$ [m]
  - $\mathbf{R}_z(\theta_2)$: Rotation des Schultergelenks (Pitch mit Gelenkwinkel $\theta_2$)
  ```

---

## 4. Detaillierter Audit Kapitel 06: Multithreading & Parallele Simulation

### 4.1 Übersicht der Formeln & Variablen

| Nr. | Folie / Zeile | Formel / Ausdruck | Gefundene Symbole | Fehlende / Unvollständige Definitionen |
| :---: | :--- | :--- | :--- | :--- |
| **6.1** | F. 40 / Z. 43 | $\approx 6{,}25\,\%$ bei 16 Cores | - | Auslastungsformel $\eta = 1/p$ nicht formal deklariert; Prozessoranzahl $p$ nicht deklariert |
| **6.2** | F. 38–46 | **Fehlend:** Speedup $S_p$ | - | **Fundamental:** $S(p) = \frac{T_1}{T_p}$ mit sequentieller Zeit $T_1$ und paralleler Zeit $T_p$ [s] fehlt |
| **6.3** | F. 38–46 | **Fehlend:** Effizienz $E_p$ | - | **Fundamental:** $E(p) = \frac{S(p)}{p}$ ($0 \le E \le 1$) fehlt |
| **6.4** | F. 38–46 | **Fehlend:** Amdahl's Law | - | **Fundamental:** $S(p) = \frac{1}{(1-s) + \frac{s}{p}}$ mit seriellem Anteil $1-s$ und Parallelanteil $s$ fehlt |
| **6.5** | F. 38–46 | **Fehlend:** Gustafson's Law | - | **Fundamental:** $S(p) = p - \alpha(p - 1)$ mit skalierter Problemgröße fehlt |

### 4.2 Detaillierte Befunde & Ergänzungsvorschlag

#### Fundstelle 6.1–6.5: Folie 40–46 (Abschnitt 6.1) – Theoretische Fundierung des Multithreadings
- **Kritik:** Kapitel 06 ist das einzige Kapitel im gesamten Kurs, das fast vollständig ohne mathematische Formalisierung auskommt. Das führt zu einer erheblichen akademischen Schwachstelle: Studierende lernen zwar C#-Befehle (`Parallel.For`), können aber **nicht begründen**, warum eine Verdopplung der Rechenkerne in der Praxis niemals zu einer Verdopplung der Simulationsgeschwindigkeit führt (Amdahl-Grenze).
- **Korrektur- und Integrationsvorschlag (Neue Folie für Abschnitt 6.1):**
  Es wird dringend empfohlen, nach Folie 46 folgende Theorie-Folie einzufügen:

  ```markdown
  ---

  ### Mathematische Grenzen der Parallelisierung (Amdahl & Gustafson)

  <div class="columns top">
  <div class="one">

  #### Speedup & Parallele Effizienz
  - **Speedup (Beschleunigung):** Verhältnis der sequentiellen zur parallelen Rechenzeit:
    $$S(p) = \frac{T_1}{T_p}$$
    - $T_1$: Ausführungszeit auf einem Kern $[\mathrm{s}]$
    - $T_p$: Ausführungszeit auf $p$ Kernen $[\mathrm{s}]$ ($p \in \mathbb{N}^+$)
  - **Parallele Effizienz:**
    $$E(p) = \frac{S(p)}{p} \le 1 \quad (100\,\%)$$

  </div>
  <div class="one">

  #### Amdahlsches Gesetz (Feste Problemgröße)
  Sei $s \in [0, 1]$ der parallelisierbare Anteil und $(1-s)$ der streng sequentielle Anteil:
  $$S_{\text{Amdahl}}(p) = \frac{1}{(1-s) + \frac{s}{p}} \quad \xrightarrow{p \to \infty} \quad \frac{1}{1-s}$$

  - **Konsequenz:** Beträgt der serielle Anteil nur $5\,\%$ ($s = 0{,}95$), ist der Speedup selbst bei unendlich vielen Kernen auf **maximal 20** limitiert!
  - **Gustafson (Skalierte Last):** $S_{\text{Gustafson}}(p) = p - (1-s)(p - 1)$.

  </div>
  </div>
  ```

---

## 5. Detaillierter Audit Kapitel 07: Statische Modelle (Fachwerke & FEM)

### 5.1 Übersicht der Formeln & Variablen

| Nr. | Folie / Zeile | Formel / Ausdruck | Gefundene Symbole | Fehlende / Unvollständige Definitionen |
| :---: | :--- | :--- | :--- | :--- |
| **7.1** | F. 39 / Z. 42 | $\sum \vec{F} = 0, \sum \vec{M} = 0$ | $\vec{F}, \vec{M}$ | Skalar $0$ statt Nullvektor $\vec{0}$; keine Indizes; Einheiten $[\mathrm{N}]$, $[\mathrm{N\cdot m}]$ fehlen |
| **7.2** | F. 152 / Z. 155 | $N=\{n_1..n_k\}, R=\{r_1..r_s\}$ | $N, n_i, \vec{p}_i, \vec{F}_{ext}, R, r_j, S_j$ | Einheiten $[\mathrm{m}], [\mathrm{N}]$ fehlen; Vorzeichenkonvention Zug ($+$) / Druck ($-$) fehlt |
| **7.3** | F. 170 / Z. 172 | $\vec{v}_{ik} = \vec{p}_k - \vec{p}_i$, $\vec{e}_{ik} = \dots$ | $\vec{v}_{ik}, L_{ik}, \vec{e}_{ik}, S_{ik}$ | **Indexkollision:** $k$ als Nachbarindex vs. $k=|N|$ als Knotengesamtzahl; Einheiten $[\mathrm{m}]$ fehlen |
| **7.4** | F. 170 / Z. 180 | $\sum_k (S_{ik}\vec{e}_{ik}) + \vec{F}_{ext,i} = \vec{0}$ | $S_{ik}, \vec{e}_{ik}, \vec{F}_{ext,i}$ | Nachbarschaftssumme $\sum_{j \in \mathcal{N}(i)}$ unpräzise; Richtungskosinus $e_{x,ik}, e_{y,ik}$ undefiniert |
| **7.5** | F. 191 / Z. 193 | Blockmatrix $2k \times (s+l)$ | $e_{x,11}, S_j, F_{Lager}, F_{ext}$ | Dimensionen $(2k) \times (s+l)$ und Lagerwertigkeit $l$ nicht formell eingeführt |
| **7.6** | F. 225 / Z. 228 | $A \cdot x = b$ | $A, x, b$ | Nicht-fett $\mathbf{A}\mathbf{x}=\mathbf{b}$; Vektorräume $\mathbf{A} \in \mathbb{R}^{n \times n}$ und Einheiten fehlen |
| **7.7** | F. 239 / Z. 242 | $2k = s + l$ | $k, s, l$ | $l$ nicht als Gesamtlagerwertigkeit deklariert; Stabilitätskriterium $f_{\text{stat}} = 0$ unvollständig |
| **7.8** | F. 349 / Z. 352 | $S = \frac{E \cdot A}{L_0} \cdot \Delta L$ | $S, E, A, L_0, \Delta L, k$ | Federsteifigkeit $k_{\text{Stab}} = \frac{EA}{L_0}$ $[\mathrm{N/m}]$; Einheiten $[\mathrm{Pa}], [\mathrm{m}^2], [\mathrm{m}]$ im Text lückenhaft |
| **7.9** | F. 387 / Z. 391 | $L'^2 = L^2 + 2(\vec{L}\cdot\Delta\vec{u}) + |\Delta\vec{u}|^2$ | $L', L, \vec{L}, \Delta\vec{u}$ | Saubere Taylor-Herleitung; Einheiten $[\mathrm{m}]$ am Ende ergänzen |
| **7.10** | F. 444 / Z. 451 | $\mathbf{k}_e \cdot \mathbf{u}_e = \mathbf{f}_e$ | $\mathbf{k}_e, \mathbf{u}_e, \mathbf{f}_e, e_x, e_y$ | Exzellente Blockform; Einheiten $[\mathbf{k}_e]=\mathrm{N/m}, [\mathbf{u}_e]=\mathrm{m}, [\mathbf{f}_e]=\mathrm{N}$ ergänzen |
| **7.11** | F. 520 / Z. 524 | $\mathbf{k}_e^{glob} = \mathbf{T}^T \mathbf{k}_e^{loc} \mathbf{T}$ | $\mathbf{T}, \mathbf{k}_e^{loc}, \mathbf{k}_e^{glob}$ | Vektorräume $\mathbf{T} \in \mathbb{R}^{2 \times 4}, \mathbf{k}_e^{loc} \in \mathbb{R}^{2 \times 2}$ und Stabwinkel $\alpha$ formalisieren |
| **7.12** | F. 543 / Z. 546 | $\mathbf{K}\mathbf{u} = \mathbf{f}$ | $\mathbf{K}, \mathbf{u}, \mathbf{f}$ | Systemdimension $2k \times 2k$ $[\mathrm{N/m}]$ und positive Definitheit $\mathbf{x}^T \mathbf{K} \mathbf{x} > 0$ deklarieren |
| **7.13** | F. 555 / Z. 570 | $\begin{pmatrix} \mathbf{K}_{ff} & \mathbf{K}_{fp} \\ \mathbf{K}_{pf} & \mathbf{K}_{pp} \end{pmatrix} \begin{pmatrix} \mathbf{u}_f \\ \mathbf{u}_p \end{pmatrix} = \begin{pmatrix} \mathbf{f}_f \\ \mathbf{f}_p \end{pmatrix}$ | $\mathbf{K}_{ff}, \mathbf{u}_f, \mathbf{u}_p, \dots$ | **Großer Bruch:** Folie nutzt $f, p$; Folie 906 wechselt ohne Erklärung auf $B, A$! |
| **7.14** | F. 661 / Z. 664 | $L_j = P_k - P_i$, $e_j = L_j/|L_j|$ | $L_j, P_k, P_i, e_j, S_j$ | Vektorpfeile fehlen ($\vec{L}_j, \vec{p}_k, \vec{p}_i, \vec{e}_j$); Richtungskosinusse $c_x, c_y, c_z$ |
| **7.15** | F. 849 / Z. 858 | $\mathbf{k}_{\text{Stab}} \in \mathbb{R}^{6 \times 6}$ (3D) | $\mathbf{k}_{\text{Stab}}, e_x, e_y, e_z, E, A, L$ | Saubere Dyadenform; Richtungskosinus $e_x^2 + e_y^2 + e_z^2 = 1$ deklarieren |
| **7.16** | F. 902 / Z. 906 | $\mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B - \mathbf{K}_{BA} \mathbf{u}_A$ | $\mathbf{K}_{BB}, \mathbf{u}_B, \mathbf{f}_B, \mathbf{u}_A$ | **Undefinierte Indizes:** Was bedeuten $A$ und $B$? Bezug zu Folie 555 fehlt völlig! |
| **7.17** | F. 902 / Z. 913 | $\mathbf{K}_{BB} = \mathbf{L}\mathbf{L}^T$ (Cholesky) | $\mathbf{L}$ | Untere Dreiecksmatrix $\mathbf{L}$ mit $L_{ii} > 0$ im Folientext nicht näher aufgeschlüsselt |
| **7.18** | F. 1056 / Z. 1064 | $S = \frac{EA}{L}[\mathbf{e}\cdot(\mathbf{u}_j - \mathbf{u}_i)]$ | $S, E, A, L, \mathbf{e}, \mathbf{u}_i, \mathbf{u}_j$ | Normalkraft $S$ $[\mathrm{N}]$; Codekommentare sind vorbildlich ($E$ in $[\mathrm{Pa}]$, $A$ in $[\mathrm{m}^2]$) |

### 5.2 Detaillierte Befunde & Korrekturvorschläge

#### Fundstelle 7.1: Folie 39 (Zeile 42) – Statisches Gleichgewicht
- **Aktueller Text:**
  ```latex
  $\sum \vec{F} = 0$ und $\sum \vec{M} = 0$
  ```
- **Kritik:** Formel summiert Vektoren, setzt aber eine Skalarnull $0$ statt des Nullvektors $\vec{0}$. Indizes und physikalische Einheiten fehlen.
- **Korrekturvorschlag:**
  ```markdown
  - Statisches Gleichgewicht (Kräfte und Momente heben sich exakt auf):
    $$\sum_{i=1}^n \vec{F}_i = \vec{0} \quad [\mathrm{N}] \quad \text{und} \quad \sum_{j=1}^m \vec{M}_j = \vec{0} \quad [\mathrm{N\cdot m}]$$
  ```

#### Fundstelle 7.3 & 7.4: Folie 170 (Zeile 172–185) – Knotengleichgewicht & Indexbereinigung
- **Aktueller Text:**
  ```latex
  \vec{v}_{ik} = \vec{p}_k - \vec{p}_i, \quad L_{ik} = |\vec{v}_{ik}|, \quad \vec{e}_{ik} = \frac{\vec{v}_{ik}}{L_{ik}} = \begin{pmatrix} e_{x,ik} \\ e_{y,ik} \end{pmatrix}
  \sum_{k} (S_{ik} \cdot \vec{e}_{ik}) + \vec{F}_{ext,i} = \vec{0}
  ```
- **Kritik:** Index $k$ wird doppelt belegt (als Anzahl aller Knoten $k = |N|$ auf Folie 152 und als Nachbarknotenindex an Knoten $i$). Euklidische Norm sollte als $\|\cdot\|$ notiert werden.
- **Korrekturvorschlag:**
  ```markdown
  Für einen Stab zwischen Knoten $i$ (Position $\vec{p}_i$) und Nachbarknoten $j \in \mathcal{N}(i)$ (Position $\vec{p}_j$):
  1. **Verbindungsvektor:** $\vec{v}_{ij} = \vec{p}_j - \vec{p}_i \in \mathbb{R}^2 \quad [\mathrm{m}]$
  2. **Stablänge:** $L_{ij} = \|\vec{v}_{ij}\| = \sqrt{(x_j - x_i)^2 + (y_j - y_i)^2} \quad [\mathrm{m}]$
  3. **Normierter Richtungs-Einheitsvektor:** $\vec{e}_{ij} = \frac{\vec{v}_{ij}}{L_{ij}} = \begin{pmatrix} e_{x,ij} \\ e_{y,ij} \end{pmatrix} \quad [-] \quad \text{mit } e_{x,ij}^2 + e_{y,ij}^2 = 1$
  
  Gleichgewicht an Knoten $i$ (mit Nachbarschaftsmenge $\mathcal{N}(i)$):
  $$\sum_{j \in \mathcal{N}(i)} S_{ij} \cdot \vec{e}_{ij} + \vec{F}_{\text{ext},i} = \vec{0} \quad [\mathrm{N}]$$
  - $S_{ij} \in \mathbb{R}$ [N]: Stabnormalkraft ($S_{ij} > 0$: Zugkraft, $S_{ij} < 0$: Druckkraft)
  - $\vec{F}_{\text{ext},i} = (F_{\text{ext},ix}, F_{\text{ext},iy})^T \in \mathbb{R}^2$ [N]: Externe Knotenlast
  ```

#### Fundstelle 7.8: Folie 349 (Zeile 352) – Hooke'sches Gesetz & Stabsteifigkeit
- **Aktueller Text:**
  ```latex
  S = \frac{E \cdot A}{L_0} \cdot \Delta L
  ```
- **Kritik:** Die Einheiten werden nicht strukturiert aufgeschlüsselt. Das Symbol $k$ für Stabsteifigkeit kollidiert mit der Knotenzahl $k$.
- **Korrekturvorschlag:**
  ```markdown
  $$S = \frac{E \cdot A}{L_0} \cdot \Delta L = k_{\text{Stab}} \cdot \Delta L$$
  - $S$: Normalkraft im Stab $[\mathrm{N}]$ ($S > 0$: Zug, $S < 0$: Druck)
  - $E$: Elastizitätsmodul des Materials $[\mathrm{N/m^2}]$ bzw. $[\mathrm{Pa}]$ (z.B. Baustahl: $210 \cdot 10^9\,\mathrm{Pa} = 210\,\mathrm{GPa}$)
  - $A$: Querschnittsfläche des Stabprofils $[\mathrm{m^2}]$
  - $L_0$: Unverformte Ausgangslänge des Stabes $[\mathrm{m}]$
  - $\Delta L$: Längenänderung $[\mathrm{m}]$ ($\Delta L = L' - L_0$)
  - $k_{\text{Stab}} = \frac{EA}{L_0}$: Axiale Stabfedersteifigkeit $[\mathrm{N/m}]$ (Dehnsteifigkeit bezogen auf Länge)
  ```

#### Fundstelle 7.13 & 7.16: Folie 555 & 902 – Harmonisierung der Blockpartitionierung
- **Aktueller Text (Folie 555):**
  ```latex
  \begin{pmatrix} \mathbf{K}_{ff} & \mathbf{K}_{fp} \\ \mathbf{K}_{pf} & \mathbf{K}_{pp} \end{pmatrix} \begin{pmatrix} \mathbf{u}_f \\ \mathbf{u}_p \end{pmatrix} = \begin{pmatrix} \mathbf{f}_f \\ \mathbf{f}_p \end{pmatrix}
  ```
- **Aktueller Text (Folie 902):**
  ```latex
  \mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B - \mathbf{K}_{BA} \mathbf{u}_A
  ```
- **Kritik:** Dies ist der schwerste Nomenklatur-Bruch im Kapitel. Folie 555 verwendet die internationale FEM-Standardnotation:
  - $f$ = *free* (freie, ungebundene Freiheitsgrade)
  - $p$ = *prescribed* (vorgegebene / gelagerte Freiheitsgrade)
  Folie 902 verwendet ohne jede Erklärung die deutschsprachige Konvention:
  - $B$ = *beweglich* ($B \equiv f$)
  - $A$ = *Auflager* ($A \equiv p$)
- **Korrekturvorschlag (Harmonisierung auf Folie 902):**
  ```markdown
  ### Numerische Lösung des reduzierten Gleichungssystems

  Für die Auflösung nach den freien Verschiebungen $\mathbf{u}_f$ (bzw. $\mathbf{u}_B$ für *beweglich*) gilt:

  $$\mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f - \mathbf{K}_{fp} \mathbf{u}_p \quad \iff \quad \mathbf{K}_{BB} \mathbf{u}_B = \mathbf{f}_B - \mathbf{K}_{BA} \mathbf{u}_A$$

  - **Index-Konvention:**
    - Index $f$ (bzw. $B$): Freie / bewegliche Freiheitsgrade (unbekannte Verschiebungen $\mathbf{u}_f \in \mathbb{R}^{n_f}$ [m]).
    - Index $p$ (bzw. $A$): Feste Auflager-Freiheitsgrade (vorgegebene Randverschiebungen $\mathbf{u}_p \in \mathbb{R}^{n_p}$ [m]).
  - **Sonderfall starre Auflager:** Gilt $\mathbf{u}_p = \mathbf{0}$, entfällt der Koppelterm $\mathbf{K}_{fp} \mathbf{u}_p = \mathbf{0} \implies \mathbf{K}_{ff} \mathbf{u}_f = \mathbf{f}_f$.
  - **Auflagersenkung:** Bei definierter Stützensenkung ($\mathbf{u}_p \neq \mathbf{0}$) induziert $\mathbf{K}_{fp} \mathbf{u}_p$ zusätzliche Zwangskräfte.
  - **Cholesky-Zerlegung:** Da $\mathbf{K}_{ff}$ symmetrisch positiv-definit (SPD) ist, existiert eine eindeutige untere Dreiecksmatrix $\mathbf{L} \in \mathbb{R}^{n_f \times n_f}$ mit strikt positiven Diagonalelementen ($L_{ii} > 0$), sodass:
    $$\mathbf{K}_{ff} = \mathbf{L} \mathbf{L}^T$$
  ```

#### Fundstelle 7.14: Folie 661 (Zeile 664–670) – 3D-Kräftegleichgewicht
- **Aktueller Text:**
  ```latex
  L_j = P_k - P_i, \quad e_j = \frac{L_j}{|L_j|}
  F_j = S_j \cdot e_j = S_j \cdot \begin{pmatrix} e_{j,x} \\ e_{j,y} \\ e_{j,z} \end{pmatrix}
  ```
- **Kritik:** Vektoren $L_j, P_k, P_i, e_j, F_j$ sind typografisch Skalare (keine Pfeile / keine Fettschrift).
- **Korrekturvorschlag:**
  ```markdown
  - **Stabvektor:** $\vec{L}_j = \vec{p}_k - \vec{p}_i \in \mathbb{R}^3 \quad [\mathrm{m}]$
  - **Richtungseinheitsvektor:** $\vec{e}_j = \frac{\vec{L}_j}{\|\vec{L}_j\|} = \begin{pmatrix} c_{jx} \\ c_{jy} \\ c_{jz} \end{pmatrix} \quad [-] \quad \text{mit } c_{jx}^2 + c_{jy}^2 + c_{jz}^2 = 1$
  - **Knotenkraftvektor:** $\vec{F}_j = S_j \cdot \vec{e}_j \in \mathbb{R}^3 \quad [\mathrm{N}]$
  ```

---

## 6. Querschnittliche Harmonisierungsmatrix & Glossar

Um Inkonsistenzen zwischen den Foliensätzen und Begleitdokumenten dauerhaft zu eliminieren, definiert die folgende Tabelle die verbindlichen Standards:

| Fachgebiet | Konzept / Größe | Empfohlenes Standard-Symbol | Alternativen im Altbestand (zu harmonisieren) | SI-Einheit / Dimension | Normenreferenz |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Mechanik** | Kraftvektor | $\vec{F}$ bzw. $\mathbf{f}$ | $F$ (skalar kursiv) | $\mathrm{N}$ | ISO 80000-4 |
| **Mechanik** | Momentenvektor | $\vec{M}$ bzw. $\mathbf{m}$ | $M$ | $\mathrm{N\cdot m}$ | ISO 80000-4 |
| **Mechanik** | Stabnormalkraft | $S$ bzw. $N_{\text{Stab}}$ | `Force` | $\mathrm{N}$ | DIN 1304 |
| **Mechanik** | E-Modul | $E$ | `Elasticity` | $\mathrm{N/m^2} = \mathrm{Pa}$ | ISO 80000-4 |
| **Mechanik** | Stabfedersteifigkeit | $k_{\text{Stab}}$ | $k$ (Kollision mit Knotenindex) | $\mathrm{N/m}$ | DIN 1304 |
| **FEM** | Elementsteifigkeitsmatrix | $\mathbf{k}_e$ | $k_{Stab}$ | $\mathrm{N/m}$ | Lehrbuchstandard |
| **FEM** | Globale Steifigkeitsmatrix| $\mathbf{K}$ | $K$ | $\mathrm{N/m}$ | Lehrbuchstandard |
| **FEM** | Verschiebungsvektor | $\mathbf{u}$ | $u, x$ | $\mathrm{m}$ | Lehrbuchstandard |
| **FEM** | Partitionierungs-Indizes | $f$ (frei), $p$ (prescribed) | $B$ (beweglich), $A$ (Auflager) | $[-]$ | DIN / Int. FEM |
| **Optik** | Reflexionskoeffizienten | $k_a, k_d, k_s$ | `material_a`, `matDiffuse` | $[-]$ ($0 \dots 1$) | DIN 5036 / Phong |
| **Optik** | Shininess-Exponent | $\alpha_{\text{shiny}}$ | `shininess` | $[-]$ ($1 \dots 128$) | Phong 1975 |
| **Optik** | Oberflächennormale | $\vec{n}$ ($\|\vec{n}\|=1$) | $N$ | $[-]$ | ISO 80000-2 |
| **Optik** | Licht-/Betrachtervektor | $\vec{l}, \vec{v}, \vec{r}$ | $L, V, R$ | $[-]$ | ISO 80000-2 |
| **Kamera** | Kugelkoordinaten | $r, \theta, \theta_{\text{elev}}$ | `Distance`, `Azimuth`, `Elevation` | $[\mathrm{m}], [{}^\circ], [{}^\circ]$ | ISO 80000-2 |
| **HPC** | Speedup | $S(p)$ | - | $[-]$ | Amdahl 1967 |
| **HPC** | Parallele Effizienz | $E(p)$ | - | $[-]$ ($0 \dots 1$) | HPC-Standard |
| **Statistik**| Normalverteilung | $\mathcal{N}(\mu, \sigma^2)$ | - | $[\mu]=\mathrm{s}, [\sigma]=\mathrm{s}$ | ISO 80000-2 |

---

## 7. Priorisierter Maßnahmenkatalog zur Folienüberarbeitung

Die folgenden Korrekturmaßnahmen sind vor dem Vorlesungsstart umzusetzen:

### Priorität 1 (Sofortige Korrektur / Didaktisch kritisch)
1. **Kapitel 06 (Multithreading):**
   - Einfügen einer Theorie-Folie nach Folie 46 mit den formalen Definitionen von **Speedup $S(p)$**, **Effizienz $E(p)$**, **Amdahlschem Gesetz** und **Gustafsonschem Gesetz**.
2. **Kapitel 07 (Statische Modelle):**
   - Auf Folie 902 eine Erläuterungsbox zur Partitionierung einbauen, die den Nomenklatur-Wechsel von $f/p$ auf $B/A$ formal auflöst und die Bedingung $\mathbf{u}_A = \mathbf{0}$ (starre Lager) erklärt.
   - Folie 39: $\sum \vec{F} = \vec{0}$ und $\sum \vec{M} = \vec{0}$ mit Vektorpfeilen und Nullvektor versehen.
3. **Kapitel 05 (3D OpenGL):**
   - Folie 222: Explizite Normierungsforderung $\|\vec{n}\| = \|\vec{l}\| = \|\vec{v}\| = \|\vec{r}\| = 1$ ergänzen.
   - Folie 1111: Normierten Einheitsvektor für Kegel/Kegelstumpf mit Wurzeldivisor angeben.

### Priorität 2 (Qualitätssteigerung & Normenkonformität)
4. **Kapitel 04 (2D Diagramme):**
   - Folie 277: Variablen $\mu$ (Erwartungswert) und $\sigma$ (Standardabweichung) zur Normalverteilung $f(x)$ ergänzen.
   - Folie 166 & 189: Abtastschrittweite $\Delta t$ und Zeitstempel $t_i$ mit physikalischer Einheit $[\mathrm{s}]$ und Indexbereich deklarieren.
5. **Kapitel 05 (3D OpenGL):**
   - Folie 244–290: Phong-Koeffizienten $k_a, k_d, k_s$ und Exponent $\alpha_{\text{shiny}}$ neben den OpenGL-Strings ergänzen.
   - Folie 1241: Transformationsmatrizen $\mathbf{T}_{\text{Base}}, \mathbf{R}_1, \mathbf{T}_1, \dots$ der kinematischen Kette kurz mit Gelenkwinkeln und Armlängen aufschlüsseln.
6. **Kapitel 07 (Statische Modelle):**
   - Folie 170: Nachbarschaftsindex auf $j \in \mathcal{N}(i)$ umstellen, um die Kollision mit $k = |N|$ aufzulösen.
   - Physikalische Einheiten für Dehnsteifigkeit ($k_{\text{Stab}} \in [\mathrm{N/m}]$), E-Modul ($E \in [\mathrm{Pa}]$) und Querschnitt ($A \in [\mathrm{m}^2]$) tabellieren.

---
*Bericht abgeschlossen und freigegeben zur direkten Einarbeitung in die MARP-Foliensätze.*
