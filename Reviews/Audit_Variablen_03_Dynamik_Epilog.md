# Prüf-Audit: Mathematische & Physikalische Variablendefinitionen (Kapitel 08, 09, 10, 11)

**Dokument-ID:** `Reviews/Audit_Variablen_03_Dynamik_Epilog.md`  
**Gegenstand:** Rigoroser mathematisch-physikalischer Detailaudit der Vorlesungsfoliensätze:
- `Folien/08_Dynamische_Modelle_Kontinuierlich/Folien.md`
- `Folien/09_Dynamische_Modelle_Diskret/Folien.md`
- `Folien/10_Dynamische_Modelle_Hybrid/Folien.md`
- `Folien/11_Epilog/Folien.md`  
**Prüffokus:** Vollständigkeit von Variablendefinitionen, physikalische SI-Einheiten, Konsistenz der mathematischen Indizierung und Konformität zu DIN 1304 sowie ISO 80000-2  
**Datum:** 8. Oktober 2026  
**Zielgruppe:** Dozenten, Modulverantwortliche und Entwickler des Curriculums *Systemsimulation / Digitaler Zwilling* (FH Oberösterreich, Campus Wels)  
**Status:** Detaillierter Auditbericht mit quantitativem Scoring, Befundkatalog und präzisen Folien-Korrekturvorschlägen  

---

## 1. Executive Summary & Gesamtevaluation

Im Rahmen der Qualitätssicherung des Hochschulcurriculums *Systemsimulation / Digitaler Zwilling* wurden die vier fortgeschrittenen Foliensätze zu den dynamischen Modellwelten (kontinuierlich, diskret, hybrid) sowie der abschließende Epilog auf die Exaktheit, Vollständigkeit und Normenkonformität sämtlicher mathematischer und physikalischer Gleichungen geprüft.

Die Untersuchung erfolgte formelweise anhand dreier Kernkriterien:
1. **Definitionsvollständigkeit:** Wird jede auftretende Variable, jeder Parameter, jede physikalische Konstante und jeder diskrete Index im Text der Folie oder im unmittelbaren Kontext eindeutig deklariert?
2. **Einheitenkonsistenz (DIN 1304 / ISO 80000-2):** Werden physikalische Größen mit ihren korrekten SI-Einheiten versehen (z.B. $\mathrm{s^{-1}}$, $\mathrm{kg}$, $\mathrm{N/m}$, $\mathrm{N\cdot s/m}$, $\mathrm{\Omega}$, $\mathrm{H}$, $\mathrm{rad/s}$)? Sind abgeleitete Terme dimensionsrein?
3. **Typografische & Notationskonsistenz:** Werden Vektoren und Matrizen kursweit einheitlich nach ISO 80000-2 (fett-kursiv bzw. fett-aufrecht) gesetzt, oder treten Brüche zwischen Skalar-, Vektor- und Pfeilnotationen auf?

### 1.1 Quantitative Scorecard

| Kapitel | Untersuchte Folien | Display-Formeln (`$$`) | Inline-Formeln (`$`) | Vollständigkeitsgrad Variablen | Erfüllungsgrad DIN 1304 / ISO 80000-2 | Gesamtnote (1–10) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **08 Dynamik Kontinuierlich** | 83 | 65 | 230 | 82 % | 78 % | **8,2 / 10** |
| **09 Dynamik Diskret** | 67 | 17 | 216 | 80 % | 75 % | **8,0 / 10** |
| **10 Dynamik Hybrid** | 76 | 26 | 172 | 84 % | 82 % | **8,4 / 10** |
| **11 Epilog & Synthese** | 47 | 3 | 58 | 74 % | 70 % | **7,5 / 10** |
| **Gesamt** | **273** | **111** | **676** | **80,8 %** | **77,1 %** | **8,1 / 10** |

### 1.2 Zusammenfassung der zentralen Audit-Befunde

1. **Kapitel 08 (Kontinuierlich):**
   - *Lineare Zustandsraumdarstellung:* Auf Folie 6 wird nur die allgemeine nichtlineare Form $\dot{\mathbf{x}} = \mathbf{f}(t, \mathbf{x}, \mathbf{u}), \mathbf{y} = \mathbf{g}(t, \mathbf{x}, \mathbf{u})$ definiert. Auf Folie 8 und Folie 77 taucht plötzlich $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$ auf, ohne dass die Systemmatrix $\mathbf{A}$, die Eingangsmatrix $\mathbf{B}$ sowie die Ausgangsgleichung $\mathbf{y} = \mathbf{C}\mathbf{x} + \mathbf{D}\mathbf{u}$ deklariert werden.
   - *Physikalischer Feder-Dämpfer:* Auf Folie 7 und 25 fehlen bei $m \ddot{y} + d \dot{y} + k y = F$ die physikalischen Einheiten ($m$ in $\mathrm{kg}$, $d$ in $\mathrm{N\cdot s/m}$, $k$ in $\mathrm{N/m}$, $F$ in $\mathrm{N}$); Kennkreisfrequenz $\omega_0 = \sqrt{k/m}$ und Dämpfungsmaß $D = \frac{d}{2\sqrt{km}}$ werden nicht formal eingeführt.
   - *DC-Servomotor:* Das Modell auf Folie 77 führt die Zeitkonstante $T_m$ und den Beiwert $K_m$ ein, unterschlägt jedoch die elektromechanische Herleitung aus Trägheit $J$, Widerstand $R$, Induktivität $L$, Motorkonstante $k_m$ und Gegen-EMK-Konstante $k_e$.
   - *Anti-Windup Clamping:* Auf Folie 79 fehlt die mathematische Formel für die ungesättigte Stellgröße $u_{\text{raw}}(t) = K_p e(t) + x_I(t) - K_d \omega(t)$; die Einheiten der Reglerparameter ($K_p, K_i, K_d$) werden erst im Code ersichtlich.
   - *Diodengleichung & Strömungsmechanik:* Bei der Diode fehlt die thermodynamische Gleichung der Temperaturspannung $V_T = \frac{k_B T}{q}$; bei der Added Mass fehlt die Einheit des Widerstandsbeiwerts $c$ ($[\mathrm{kg/m}]$).
2. **Kapitel 09 (Diskret):**
   - *Warteschlangentheorie:* Das Kürzel $M/M/1$ wird auf Folie 32 erwähnt, jedoch wird weder die Kendall-Notation erklärt noch die Bedienrate $\mu$ oder die fundamentale Systemauslastung $\rho = \frac{\lambda}{\mu}$ definiert. Little's Gesetz wird nur für die Warteschlange ($\bar{L}_q = \lambda \bar{W}_q$), nicht aber für das Gesamtsystem ($L = \lambda W$) formuliert.
   - *Exponentialverteilung & Dimensionskonsistenz:* Die Zufallsvariable wird mit $x$ statt $t$ bezeichnet; die SI-Einheit der Rate $\lambda$ ($\mathrm{s^{-1}}$) und die Dimensionslosigkeit des Exponenten $\lambda t$ werden nicht hervorgehoben.
   - *Inversionsmethode Singularität:* Auf Folie 41 wird die Formel $X = -\frac{1}{\lambda}\ln(U)$ genannt, ohne zu warnen, dass $U \in [0, 1)$ für $U=0$ eine Polstelle ($-\infty$) erzeugt.
   - *Welford- & Chan-Algorithmen:* Auf Folie 60 fehlen die mathematischen Initialisierungsbedingungen $M_0 = 0, S_0 = 0$; auf Folie 61 fehlen die formalen Erklärungen der Partitionen $A, B$ und deren Freiheitsgrade.
3. **Kapitel 10 (Hybrid):**
   - *Zeno-Bouncing Ball:* Die Formel $\Delta t_k = 2\frac{v_0}{g} e^k$ auf Folie 12 setzt stillschweigend einen Start am Boden ($y_0=0, v_0>0$) voraus; der reale Fallversuch aus Höhe $h_0$ mit Ruhestop ($v_0=0$) führt zu einer abweichenden ersten Falldauer $t_0 = \sqrt{2h_0/g}$.
   - *Sticking- und Bisektionstoleranzen:* Schwellenwerte für Kontakthaftung ($v_{\text{sticking}}, y_{\text{tol}}$) und Bisektion ($\varepsilon_z, \varepsilon_t$) werden ohne SI-Einheiten und typische Größenordnungen gelassen.
   - *Hybrider Formalismus:* Die Vektordimensionen von Eingängen $\mathbf{u} \in \mathbb{R}^m$ und Ausgängen $\mathbf{y} \in \mathbb{R}^p$ fehlen auf Folie 28.
4. **Kapitel 11 (Epilog):**
   - *Notationsdivergenz:* Bei der Taxonomie (Folie 5, 8) fallen alle Matrizen und Vektoren zurück in Magersatz ($A \cdot x = b, \dot{x} = f(x,u,t)$).
   - *Symbolkonflikt:* Zero-Crossing wird in Kapitel 11 plötzlich mit $g(x) = 0$ bezeichnet, während Kapitel 10 konsistent $z(\mathbf{x}) = 0$ nutzt.
   - *Regularisierung:* Bei der Kontaktregularisierung $r_{\text{reg}} = \sqrt{r^2 + \epsilon^2}$ fehlt die physikalische Dimension von $\epsilon$ ($[\mathrm{m}]$).

---

## 2. Normenkonformität & Typografische Standards (DIN 1304 / ISO 80000-2)

### 2.1 Mathematische Typografie nach ISO 80000-2

ISO 80000-2 definiert klare Regeln für den Schriftsatz mathematischer und physikalischer Dokumente:
- **Skalare Variablen und Parameter:** Kursiv, mager ($m, t, h, k, \omega, \lambda, \mu, \sigma$).
- **Vektoren:** Fett, aufrecht oder kursiv ($\mathbf{x}, \mathbf{u}, \mathbf{y}, \mathbf{k}_i$). *(Hinweis: Vektorpfeile wie $\vec{z}$ oder $\vec{u}$ sind veraltet und im Hochschulumfeld durch Fettdruck zu ersetzen).*
- **Matrizen und Tensoren:** Fett, aufrecht Großbuchstaben ($\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D}, \mathbf{J}$).
- **Mathematische Standardfunktionen & Operatoren:** Aufrecht ($\sin, \cos, \ln, \exp, \det, \text{sgn}$).
- **Diskrete Indizes:**
  - Zählindizes / Laufvariablen kursiv ($k, i, j, n$).
  - Deskriptive Wort-Indizes aufrecht ($t_{\text{pred}}, E_{\text{kin}}, E_{\text{pot}}, F_{\text{Feder}}, u_{\text{raw}}, u_{\max}, \bar{L}_q, \bar{W}_q$).

### 2.2 Physikalische Einheiten nach DIN 1304

- Physikalische Einheiten stehen stets **aufrecht** in eckigen Klammern oder hinter Zahlenwerten mit schmalem Festabstand: $g = 9{,}81\,\mathrm{m/s^2}$, $T_m = 0{,}05\,\mathrm{s}$.
- Niemals Kursivsatz für Einheiten ($m/s$ $\to$ $\mathrm{m/s}$, $s$ $\to$ $\mathrm{s}$, $V$ $\to$ $\mathrm{V}$, $kg$ $\to$ $\mathrm{kg}$).
- In Formelblöcken sollen bei der Einführung von Zuständen und Parametern die Standard-SI-Einheiten aufgeführt werden.

---

## 3. Kapitel 08: Kontinuierliche Dynamische Modelle – Detaillierter Formelaudit

### Befund K08-01: Unvollständige Zustandsraumdarstellung (Fehlende lineare Standardform)
- **Folie / Zeile:** Folie 6 (Zeile 67–98) & Folie 8 (Zeile 128–146)
- **Titel:** `Zustandsraumdarstellung` / `Von höheren Ordnungen zur ersten Ordnung (Matrixform)`
- **Aktuelle Formel:**
  $$\dot{\mathbf{x}}(t) = \mathbf{f}(t, \mathbf{x}(t), \mathbf{u}(t)), \quad \mathbf{y}(t) = \mathbf{g}(t, \mathbf{x}(t), \mathbf{u}(t))$$
  Auf Folie 8 folgt unvermittelt:
  $$\begin{pmatrix} \dot{x}_1 \\ \dot{x}_2 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -\frac{k}{m} & -\frac{d}{m} \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \end{pmatrix} + \begin{pmatrix} 0 \\ \frac{1}{m} \end{pmatrix} F(t) \quad \text{("Dies entspricht der Form } \dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}\text{")}$$
- **Fehlende / Unzureichende Definitionen:**
  1. Dimensionen der Vektoren fehlen auf Folie 6: $\mathbf{x} \in \mathbb{R}^n$ ($n$ Zustände), $\mathbf{u} \in \mathbb{R}^m$ ($m$ Eingänge), $\mathbf{y} \in \mathbb{R}^p$ ($p$ Ausgänge).
  2. Die **lineare Zustandsraumdarstellung** ($\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$, $\mathbf{y} = \mathbf{C}\mathbf{x} + \mathbf{D}\mathbf{u}$) wird auf Folie 6 nicht eingeführt!
  3. Die Matrizen $\mathbf{A} \in \mathbb{R}^{n\times n}$ (Systemmatrix), $\mathbf{B} \in \mathbb{R}^{n\times m}$ (Eingangsmatrix), $\mathbf{C} \in \mathbb{R}^{p\times n}$ (Ausgangs- bzw. Messmatrix) und $\mathbf{D} \in \mathbb{R}^{p\times m}$ (Durchgriffsmatrix) werden weder namentlich noch dimensional deklariert.
- **Folienkompatibler Korrekturvorschlag (Folie 6, Spalte 1):**
  ```markdown
  **Allgemeine nichtlineare Form:**
  $$\dot{\mathbf{x}}(t) = \mathbf{f}(t, \mathbf{x}(t), \mathbf{u}(t)), \quad \mathbf{y}(t) = \mathbf{g}(t, \mathbf{x}(t), \mathbf{u}(t))$$
  
  **Lineare zeitinvariante Standardform (LTI):**
  $$\dot{\mathbf{x}}(t) = \mathbf{A}\mathbf{x}(t) + \mathbf{B}\mathbf{u}(t), \quad \mathbf{y}(t) = \mathbf{C}\mathbf{x}(t) + \mathbf{D}\mathbf{u}(t)$$

  - $\mathbf{x}(t) \in \mathbb{R}^n$: Zustandsvektor, $\dot{\mathbf{x}}(t) = \frac{d\mathbf{x}}{dt}$ Änderungsrate
  - $\mathbf{u}(t) \in \mathbb{R}^m$: Eingangs- / Stellvektor
  - $\mathbf{y}(t) \in \mathbb{R}^p$: Ausgangs- / Messvektor
  - $\mathbf{A} \in \mathbb{R}^{n\times n}$: Systemmatrix; $\mathbf{B} \in \mathbb{R}^{n\times m}$: Eingangsmatrix
  - $\mathbf{C} \in \mathbb{R}^{p\times n}$: Ausgangsmatrix; $\mathbf{D} \in \mathbb{R}^{p\times m}$: Durchgriffsmatrix
  ```

---

### Befund K08-02: Fehlende physikalische Parameter, Einheiten und Schwingungskennwerte (Federpendel)
- **Folie / Zeile:** Folie 7 (Zeile 100–126) & Folie 25 (Zeile 524–538)
- **Titel:** `Von höheren Ordnungen zur ersten Ordnung` / `Federpendel: Einführung`
- **Aktuelle Formel:**
  $$m \ddot{y}(t) + d \dot{y}(t) + k y(t) = F(t)$$
  $$\ddot{y}(t) = -\frac{k}{m} y(t)$$
- **Fehlende / Unzureichende Definitionen:**
  1. Physikalische SI-Einheiten fehlen: Masse $m$ [$\mathrm{kg}$], Dämpfungskonstante $d$ [$\mathrm{N\cdot s/m}$ bzw. $\mathrm{kg/s}$], Federsteifigkeit $k$ (nach DIN 1304 oft $c$) [$\mathrm{N/m}$], Erregerkraft $F(t)$ [$\mathrm{N}$], Koordinate $y(t)$ [$\mathrm{m}$].
  2. Elementare Kennwerte der Schwingungslehre fehlen:
     - Ungedämpfte Eigenkreisfrequenz: $\omega_0 = \sqrt{\frac{k}{m}}$ [$\mathrm{rad/s}$] bzw. [$\mathrm{s^{-1}}$]
     - Dämpfungsmaß (Lehr'sches Dämpfungsmaß): $D = \frac{d}{2\sqrt{k\cdot m}} = \frac{d}{2 m \omega_0}$ (dimensionslos)
     - DGL in Standardform: $\ddot{y}(t) + 2 D \omega_0 \dot{y}(t) + \omega_0^2 y(t) = \frac{1}{m} F(t)$.
  3. Symbol-Inkonsistenz: Auf Folie 7 und 25 wird $k$ verwendet; Folie 27 nutzt Kreisfrequenz $\omega$, Folie 72 nutzt plötzlich $\omega_0$.
- **Folienkompatibler Korrekturvorschlag (Folie 7):**
  ```markdown
  **Beispiel: Gedämpfter mechanischer Schwinger (2. Ordnung)**
  $$m \ddot{y}(t) + d \dot{y}(t) + k y(t) = F(t) \iff \ddot{y}(t) + 2 D \omega_0 \dot{y}(t) + \omega_0^2 y(t) = \frac{1}{m}F(t)$$

  - $y(t)$: Position / Auslenkung [$\mathrm{m}$], $\dot{y}(t)$: Geschwindigkeit [$\mathrm{m/s}$], $\ddot{y}(t)$: Beschleunigung [$\mathrm{m/s^2}$]
  - $m$: Träge Masse [$\mathrm{kg}$]
  - $d$: Dämpfungskonstante [$\mathrm{N\cdot s/m}$]
  - $k$: Federsteifigkeit [$\mathrm{N/m}$]
  - $F(t)$: Äußere Erregerkraft [$\mathrm{N}$]
  - $\omega_0 = \sqrt{k/m}$: Eigenkreisfrequenz [$\mathrm{rad/s}$], $D = \frac{d}{2\sqrt{km}}$: Dämpfungsmaß [-]
  ```

---

### Befund K08-03: Notationsbruch zwischen Skalar und Vektor ($\dot{x} = f(x)$ statt $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$)
- **Folie / Zeile:** Folie 15 (Zeile 280–308), Folie 18 (Zeile 376–391), Folie 26 (Zeile 540–567), Folie 28 (Zeile 588–600)
- **Titel:** `Vertikaler Wurf: Zustandsraummodell`, `Federpendel: Zustandsraummodell`
- **Aktuelle Formel:**
  $$\dot{x} = \begin{pmatrix} \dot{x}_1 \\ \dot{x}_2 \end{pmatrix} = \begin{pmatrix} x_2 \\ -g \end{pmatrix} = f(x)$$
  $$\dot{x} = \begin{pmatrix} x_2 \\ -\frac{k}{m} x_1 \end{pmatrix} = f(x)$$
- **Fehlende / Unzureichende Definitionen:**
  - Auf Folie 5 und 6 wurde der Zustandsvektor korrekt nach ISO 80000-2 in Fettschrift als $\mathbf{x}$ und $\mathbf{f}$ eingeführt. In den Beispielen (Freier Fall, Federpendel) wird für den Zustandsvektor und die Dynamikfunktion jedoch durchgängig magerer Skalarsatz ($x, \dot{x}, f(x)$) gesetzt.
  - Verwechslungsgefahr: $x_1$ ist eine Skalarkomponente, $x$ ist hier jedoch der 2-dimensionale Vektor $(x_1, x_2)^T$.
- **Folienkompatibler Korrekturvorschlag:**
  Ersetzen aller Vektorbezeichner durch Fettdruck:
  $$\dot{\mathbf{x}}(t) = \begin{pmatrix} \dot{x}_1(t) \\ \dot{x}_2(t) \end{pmatrix} = \begin{pmatrix} x_2(t) \\ -g \end{pmatrix} = \mathbf{f}(\mathbf{x}(t)), \quad \mathbf{x}(t) \in \mathbb{R}^2$$

---

### Befund K08-04: Undefinierter Schatten-Hamiltonian $H$ und Jacobi-Matrix $\mathbf{J}$
- **Folie / Zeile:** Folie 21 (Zeile 440–452)
- **Titel:** `Symplektische Eigenschaft & Phasenraumvolumenerhaltung`
- **Aktuelle Formel:**
  $$\det(\mathbf{J}) = \det \begin{pmatrix} 1 & h \\ 0 & 1 \end{pmatrix} = 1 \cdot 1 - 0 \cdot h \equiv 1$$
  $$\tilde{H} = H + \mathcal{O}(h)$$
- **Fehlende / Unzureichende Definitionen:**
  1. $H$ wird unvermittelt als Formelzeichen eingeführt, ohne zu erklären, was $H$ physikalisch bedeutet: Hamilton-Funktion (Gesamtenergie des freien Falls $H(y, v) = \frac{1}{2} m v^2 + m g y$ in $[\mathrm{J}]$).
  2. $\tilde{H}$ ist der modifizierte ("Schatten"-) Hamiltonian, der vom diskreten symplektischen Fluss exakt erhalten wird.
  3. $\mathbf{J} = \frac{\partial (y_{k+1}, v_{k+1})}{\partial (y_k, v_k)}$ ist die Funktional- / Jacobi-Matrix des Zeitschritt-Updates.
- **Folienkompatibler Korrekturvorschlag (Folie 21):**
  ```markdown
  - **Phasenraumvolumenerhaltung (Satz von Liouville):**
    Die Jacobi-Matrix $\mathbf{J} = \frac{\partial (y_{k+1}, v_{k+1})}{\partial (y_k, v_k)}$ der Abbildung erfüllt:
    $$\det(\mathbf{J}) = \det \begin{pmatrix} 1 & h \\ 0 & 1 \end{pmatrix} = 1 \cdot 1 - 0 \cdot h \equiv 1$$
  - **Energieerhaltung:** Euler-Cromer erzeugt keine künstliche Dissipation ($\det < 1$) und keine Aufschaukelung ($\det > 1$), sondern erhält exakt einen modifizierten Schatten-Hamiltonian $\tilde{H} = H + \mathcal{O}(h)$ nahe der echten physikalischen Gesamtenergie $H = E_{\text{kin}} + E_{\text{pot}}$ [$\mathrm{J}$].
  ```

---

### Befund K08-05: Fehlende quantitative Energiedivergenz und Einheiten des Federpendels
- **Folie / Zeile:** Folie 29 (Zeile 602–624)
- **Titel:** `Problem des expliziten Eulers: Instabilität`
- **Aktuelle Formel:**
  $$E = E_{kin} + E_{pot} = \frac{1}{2}mv^2 + \frac{1}{2}ky^2$$
- **Fehlende / Unzureichende Definitionen:**
  1. Typografie: Aufrechte Text-Indizes nach ISO 80000-2: $E_{\text{kin}}$, $E_{\text{pot}}$. Einheit $[\mathrm{J}] = [\mathrm{N\cdot m}] = [\mathrm{kg\cdot m^2/s^2}]$.
  2. Es wird nur qualitativ behauptet: "Beim expliziten Euler-Verfahren wächst die numerische Energie mit jedem Schritt". Die exakte mathematische Beziehung für das Energiewachstum pro Schritt fehlt:
     $$E_{k+1} = E_k \cdot \left(1 + \omega_0^2 h^2\right)$$
     (Beweis: $y_{k+1}^2 + \frac{m}{k}v_{k+1}^2 = (y_k + h v_k)^2 + \frac{m}{k}(v_k - h \frac{k}{m} y_k)^2 = (y_k^2 + \frac{m}{k}v_k^2)(1 + \frac{k}{m}h^2)$).
     Dieser Schritt beweist den Studierenden sofort analytisch, warum der Zuwachs für jedes $h > 0$ zwingend positiv ist!
- **Folienkompatibler Korrekturvorschlag (Folie 29):**
  ```markdown
  Die physikalische Gesamtenergie $E$ [$\mathrm{J}$] setzt sich zusammen aus:
  $$E = E_{\text{kin}} + E_{\text{pot}} = \frac{1}{2} m v^2 + \frac{1}{2} k y^2$$
  Setzt man die expliziten Euler-Updates ein, wächst die diskrete Energie $E_k$ exakt um:
  $$E_{k+1} = E_k \cdot \left(1 + \frac{k}{m} h^2\right) = E_k \cdot (1 + \omega_0^2 h^2) > E_k \quad \forall h > 0$$
  $\implies$ Der explizite Euler pumpt in jedem Schritt künstlich Energie in das ungedämpfte System!
  ```

---

### Befund K08-06: Physikalische Konstanten der Halbleiterdiode (Shockley-Gleichung)
- **Folie / Zeile:** Folie 57–58 (Zeile 1243–1277)
- **Titel:** `Beispiel: Diode als nichtlineares Element (1/2 & 2/2)`
- **Aktuelle Formel:**
  $$I = I_S \left( e^{\frac{V_{out}}{n \cdot V_T}} - 1 \right)$$
- **Fehlende / Unzureichende Definitionen:**
  1. Temperaturspannung $V_T$: Auf Folie 58 steht lediglich: "Hängt von der Temperatur ab. Bei Raumtemperatur ($\approx 25-26\,\text{mV}$)".
  2. Die fundamentale thermodynamische Definition fehlt:
     $$V_T = \frac{k_B \cdot T}{q}$$
     - $k_B \approx 1{,}3806 \times 10^{-23}\,\mathrm{J/K}$: Boltzmann-Konstante
     - $T$: Absolute thermodynamische Temperatur in Kelvin [$\mathrm{K}$] (z.B. $T = 300\,\mathrm{K} \implies V_T \approx 25{,}85\,\mathrm{mV}$)
     - $q \approx 1{,}6022 \times 10^{-19}\,\mathrm{C}$: Elementarladung
  3. SI-Einheiten: $I_S$ in Ampere [$\mathrm{A}$], $V_{out}$ in Volt [$\mathrm{V}$], $n$ dimensionslos [-].

---

### Befund K08-07: Parameter und Einheiten der Hydrodynamik (Added Mass)
- **Folie / Zeile:** Folie 59 (Zeile 1279–1294)
- **Titel:** `Praktische Anwendung: Beschleunigung im Fluid (Added Mass) (1/2)`
- **Aktuelle Formel:**
  $$m \cdot a = F_{Netto} = F_{Antrieb} - F_{Widerstand} - F_{Zusatz}$$
  $$F_{Widerstand} = c \cdot v^2, \quad F_{Zusatz} = m_{Zusatz} \cdot a$$
- **Fehlende / Unzureichende Definitionen:**
  1. Strömungswiderstandsbeiwert $c$:
     $$c = \frac{1}{2} c_w \rho_{\text{fluid}} A$$
     - $\rho_{\text{fluid}}$: Dichte des Fluids in $[\mathrm{kg/m^3}]$ (Wasser $\approx 1000\,\mathrm{kg/m^3}$)
     - $c_w$: Widerstandsbeiwert (Drag Coefficient, dimensionslos)
     - $A$: Stirnfläche des Körpers in $[\mathrm{m^2}]$
     - Physikalische Einheit von $c$: $[\mathrm{N / (m/s)^2}] = [\mathrm{kg/m}]$.
  2. $m_{\text{Zusatz}}$: Hydrodynamische Zusatzmasse in $[\mathrm{kg}]$ (bei einer Kugel $m_{\text{Zusatz}} = \frac{1}{2}\rho_{\text{fluid}} V$).
  3. Typografie: Aufrechte Text-Indizes $F_{\text{netto}}, F_{\text{antrieb}}, F_{\text{widerstand}}, F_{\text{zusatz}}$.

---

### Befund K08-08: Fixpunktgleichung & Lipschitz-Konstante im impliziten Euler
- **Folie / Zeile:** Folie 62 (Zeile 1314–1338)
- **Titel:** `Der EulerImplicitSolver`
- **Aktuelle Formel:**
  $$\dot{\mathbf{x}}^{(m+1)} = \dot{\mathbf{x}}^{(m)} + \alpha \cdot \left(\mathbf{f}(t_{k+1}, \mathbf{x}^{(m)}) - \dot{\mathbf{x}}^{(m)}\right)$$
  $$h \cdot L < 1 \quad \text{mit } L = \|\mathbf{J}\|$$
- **Fehlende / Unzureichende Definitionen:**
  1. Wie berechnet sich der Zustand $\mathbf{x}^{(m)}$ in der Picard-Iteration? Die entscheidende Kopplungsgleichung fehlt in der Formel:
     $$\mathbf{x}^{(m)} = \mathbf{x}_k + h \cdot \dot{\mathbf{x}}^{(m)}$$
  2. $\mathbf{J} = \frac{\partial \mathbf{f}}{\partial \mathbf{x}}$ ist die Jacobi-Matrix der kontinuierlichen Dynamik ($\in \mathbb{R}^{n\times n}$).
  3. Lipschitz-Konstante $L$: Hat die physikalische Dimension $[L] = \mathrm{s^{-1}}$ (Kehrwert einer Zeitkonstante). Matrixnorm $\|\mathbf{J}\|$ (z.B. induzierte euklidische Spektralnorm).
- **Folienkompatibler Korrekturvorschlag (Folie 62):**
  ```markdown
  - **Gedämpfte Banach-Fixpunktiteration (Picard-Iteration)** mit Relaxationsfaktor $\alpha = 0{,}1$:
    $$\mathbf{x}^{(m)} = \mathbf{x}_k + h \cdot \dot{\mathbf{x}}^{(m)}$$
    $$\dot{\mathbf{x}}^{(m+1)} = \dot{\mathbf{x}}^{(m)} + \alpha \cdot \left(\mathbf{f}(t_{k+1}, \mathbf{x}^{(m)}) - \dot{\mathbf{x}}^{(m)}\right)$$
  - **Konvergenzbedingung:** Kontraktion erfordert $h \cdot L < 1$, wobei $L = \sup \|\mathbf{J}\| = \sup \left\|\frac{\partial \mathbf{f}}{\partial \mathbf{x}}\right\|$ die Lipschitz-Konstante mit Einheit $[\mathrm{s^{-1}}]$ ist.
  ```

---

### Befund K08-09: Butcher-Tableau Konsistenzbedingungen & Stufenvektoren
- **Folie / Zeile:** Folie 68–70 (Zeile 1413–1499)
- **Titel:** `Das Verfahren von Heun (RK2)`, `Das Butcher-Tableau`, `Klassisches Runge-Kutta 4. Ordnung (RK4)`
- **Aktuelle Formel:**
  $$\mathbf{k}_i = \mathbf{f}\left(t_k + c_i h, \ \mathbf{x}_k + h \sum_{j=1}^{i-1} a_{ij} \mathbf{k}_j\right), \quad \mathbf{x}_{k+1} = \mathbf{x}_k + h \sum_{i=1}^s b_i \mathbf{k}_i$$
- **Fehlende / Unzureichende Definitionen:**
  1. Stufensteigungen $\mathbf{k}_i \in \mathbb{R}^n$ tragen die physikalische Einheit $[\mathbf{x}]/\mathrm{s}$ (Geschwindigkeit im Zustandsraum).
  2. Stufenzahl $s \in \mathbb{N}$ ($s=2$ für Heun, $s=4$ für RK4).
  3. Butcher-Konsistenzbedingungen:
     $$\sum_{j=1}^{i-1} a_{ij} = c_i \quad \forall i=1,\dots,s, \qquad \sum_{i=1}^s b_i = 1$$
     Diese Bedingungen erklären den Studierenden, warum die Summe der Zeilen der Matrix $\mathbf{A}$ exakt den Stützstellen $\mathbf{c}$ entspricht und warum die Summe der Gewichte $b_i$ zwingend $1$ ergibt!

---

### Befund K08-10: Dahlquist-Testgleichung: Systempol $\lambda \in \mathbb{C}$ vs. Eigenfrequenz $\omega_0$
- **Folie / Zeile:** Folie 71–72 (Zeile 1501–1531)
- **Titel:** `Stabilitätsanalyse: Die Dahlquist-Testgleichung` / `Oszillatoren auf der Imaginärachse (\lambda = \pm i\omega)`
- **Aktuelle Formel:**
  $$\dot{x} = \lambda x, \quad x_{k+1} = R(z) \cdot x_k, \quad z = \lambda \cdot h \in \mathbb{C}$$
  Titel: $\lambda = \pm i\omega$, Text: $\beta = \omega_0 h$.
- **Fehlende / Unzureichende Definitionen:**
  1. $\lambda \in \mathbb{C}$: Eigenwert der Systemmatrix $\mathbf{A}$ bzw. Polstelle des Übertragungssystems; Einheit $[\lambda] = \mathrm{s^{-1}}$.
  2. $z = \lambda h$: Normalisierte, dimensionslose Schrittweitenvariable ($[z] = 1$).
  3. Symbol-Diskrepanz: Folientitel nennt $\omega$, Folientext $\omega_0$. Korrektur: Einheitlich $\omega_0$ für die ungedämpfte Eigenkreisfrequenz des harmonischen Oszillators.

---

### Befund K08-11: Fehlende elektromechanische Parameter des DC-Servomotors
- **Folie / Zeile:** Folie 77 (Zeile 1606–1638)
- **Titel:** `DC-Servomotor: Kontinuierliches Streckenmodell`
- **Aktuelle Formel:**
  $$\dot{\theta}(t) = \omega(t), \quad \dot{\omega}(t) = -\frac{1}{T_m} \omega(t) + \frac{K_m}{T_m} u(t)$$
  $$\mathbf{A} = \begin{pmatrix} 0 & 1 \\ 0 & -\frac{1}{T_m} \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 0 \\ \frac{K_m}{T_m} \end{pmatrix}$$
- **Fehlende / Unzureichende Definitionen:**
  Auf Folie 77 werden $T_m = 0{,}05\,\mathrm{s}$ und $K_m = 2{,}5\,\mathrm{rad/(s\cdot V)}$ phänomenologisch als Black-Box-Konstanten eingeführt. Die mechatronische Herleitung aus den physikalischen Kreisgleichungen fehlt vollständig:
  1. **Mechanischer Kreis (Drehimpulsbilanz):**
     $$J \dot{\omega}(t) = M_{\text{motor}}(t) - M_{\text{last}}(t) - d \cdot \omega(t) = k_m \cdot i(t) - d \cdot \omega(t)$$
     - $J$: Massenträgheitsmoment des Rotors und der Welle [$\mathrm{kg\cdot m^2}$]
     - $k_m$: Drehmomentkonstante des Motors [$\mathrm{N\cdot m/A}$]
     - $i(t)$: Ankerstrom [$\mathrm{A}$]
     - $d$: Mechanische viskose Reibungskonstante [$\mathrm{N\cdot m\cdot s/rad}$]
  2. **Elektrischer Kreis (Maschenregel):**
     $$u(t) = R \cdot i(t) + L \frac{di(t)}{dt} + u_{\text{ind}}(t) = R \cdot i(t) + L \frac{di}{dt} + k_e \cdot \omega(t)$$
     - $R$: Ankerwiderstand [$\mathrm{\Omega}$]
     - $L$: Ankerinduktivität [$\mathrm{H}$]
     - $u_{\text{ind}}(t) = k_e \cdot \omega(t)$: Gegen-EMK (induzierte Gegenspannung) [$\mathrm{V}$]
     - $k_e$: Gegen-EMK-Spannungskonstante [$\mathrm{V/(rad/s)}$] (im SI-System gilt numerisch $k_e = k_m$).
  3. **Quasistationäre Stromnäherung ($L \ll R \cdot T_m$):**
     $$i(t) \approx \frac{u(t) - k_e \omega(t)}{R} \implies J \dot{\omega} = \frac{k_m}{R}(u - k_e \omega) - d\omega = -\frac{k_m k_e + d R}{R}\omega + \frac{k_m}{R}u$$
     Daraus resultieren die exakten Gleichungen:
     $$T_m = \frac{J \cdot R}{k_m k_e + d \cdot R}, \qquad K_m = \frac{k_m}{k_m k_e + d \cdot R}$$
- **Folienkompatibler Korrekturvorschlag (Folie 77, Spalte 1):**
  Einfügen einer Infobox zur elektromechanischen Kopplung:
  ```markdown
  *Elektromechanische Herkunft:* Aus Motormoment $M = k_m \cdot i$, Gegen-EMK $u_{\text{ind}} = k_e \cdot \omega$ und Ankerkreis $u = R\cdot i + u_{\text{ind}}$ folgt mit $T_e = L/R \ll T_m$:
  $$T_m = \frac{J \cdot R}{k_m k_e + d R} = 0{,}05\,\mathrm{s}, \quad K_m = \frac{k_m}{k_m k_e + d R} = 2{,}5\,\frac{\mathrm{rad}}{\mathrm{s \cdot V}}$$
  ```

---

### Befund K08-12: Fehlende mathematische Reglergleichung beim Anti-Windup Clamping
- **Folie / Zeile:** Folie 79 (Zeile 1646–1669)
- **Titel:** `Sättigung & Anti-Windup (Clamping)`
- **Aktuelle Formel:**
  $$\dot{x}_I = \begin{cases} 0, & |u_{\text{raw}}| \ge u_{\max} \land e \cdot u_{\text{raw}} > 0 \\ K_i \cdot e(t), & \text{sonst} \end{cases}$$
- **Fehlende / Unzureichende Definitionen:**
  1. Auf Folie 79 fehlt die mathematische Formel für die ungesättigte Stellgröße $u_{\text{raw}}(t)$! Sie taucht erst im C#-Code auf Folie 81 auf.
  2. Die vollständige mathematische PID-Reglerstruktur mit D-Anteil auf die Winkelgeschwindigkeit (Setpoint-Weighting / D-on-Measurement) muss explizit genannt werden:
     $$u_{\text{raw}}(t) = K_p \cdot e(t) + x_I(t) - K_d \cdot \omega(t)$$
     $$u(t) = \text{sat}(u_{\text{raw}}(t), \pm u_{\max}) = \operatorname{clamp}(u_{\text{raw}}(t), -u_{\max}, +u_{\max})$$
  3. Regelfehler: $e(t) = w(t) - \theta(t) = \theta_{\text{soll}} - \theta(t)$ [$\mathrm{rad}$].
  4. Einheiten der Reglerparameter:
     - $K_p = 15{,}0\,\mathrm{V/rad}$: Proportionalbeiwert
     - $K_i = 40{,}0\,\mathrm{V/(rad\cdot s)}$: Integrationsbeiwert
     - $K_d = 0{,}5\,\mathrm{V\cdot s/rad}$: Differentialbeiwert
     - $x_I(t)$: Integratorzustand mit physikalischer Einheit $[\mathrm{V}]$.
- **Folienkompatibler Korrekturvorschlag (Folie 79):**
  ```markdown
  **Reglergleichung mit Stellgrößensättigung ($u_{\max} = 10\,\mathrm{V}$):**
  $$e(t) = \theta_{\text{soll}} - \theta(t), \quad u_{\text{raw}}(t) = K_p \cdot e(t) + x_I(t) - K_d \cdot \omega(t)$$
  $$u(t) = \operatorname{clamp}(u_{\text{raw}}(t), -u_{\max}, +u_{\max})$$

  **Dynamisches Anti-Windup Clamping:**
  $$\dot{x}_I(t) = \begin{cases} 0, & |u_{\text{raw}}| \ge u_{\max} \ \land \ (e(t) \cdot u_{\text{raw}} > 0) \\ K_i \cdot e(t), & \text{sonst} \end{cases}$$
  - $x_I(t)$: Integratorzustand [$\mathrm{V}$], $K_p$ [$\mathrm{V/rad}$], $K_i$ [$\mathrm{V/(rad\cdot s)}$], $K_d$ [$\mathrm{V\cdot s/rad}$]
  ```

---

## 4. Kapitel 09: Diskrete Dynamische Modelle – Detaillierter Formelaudit

### Befund K09-01: Warteschlangenformalismus: Systemzustand vs. Warteschlangenlänge
- **Folie / Zeile:** Folie 12 (Zeile 163–189) & Folie 31 (Zeile 608–638)
- **Titel:** `Mathematische Beschreibung` / `Auswertung 1: Verlauf der Warteschlangenlänge L(t)`
- **Aktuelle Formel:**
  $$\vec{z}(t) = (N(t), B(t))$$
  Auf Folie 31: Diagrammtitel $L(t)$ ("Kunden in der Warteschlange").
- **Fehlende / Unzureichende Definitionen:**
  1. Begriffsverwirrung zwischen Systemgröße $N(t)$ und Warteschlangenlänge $L_q(t)$:
     - $N(t) \in \mathbb{N}_0$: Gesamtzahl der Kunden im System (in Bedienung + in der Schlange).
     - $B(t) \in \{0, 1\}$: Belegungszustand der Station ($B(t) = \min(1, N(t))$).
     - $L_q(t) = \max(0, N(t) - 1)$: Reine Warteschlangenlänge (Kunden, die auf Bedienung warten).
     Auf Folie 12 wird $N(t)$ definiert, auf Folie 31 und 33 wird jedoch $L(t)$ und $\bar{L}_q$ ausgewertet. Der funktionale Zusammenhang $L_q(t) = \max(0, N(t) - 1)$ muss explizit hergestellt werden!
  2. Notationsstandard ISO 80000-2: $\vec{z}(t)$ nutzt veraltete Pfeilnotation; zu ersetzen durch fett-aufrecht $\mathbf{z}(t) = (N(t), B(t))^T \in \mathbb{N}_0 \times \{0, 1\}$.

---

### Befund K09-02: Warteschlangentheorie: Bedienrate $\mu$, Auslastung $\rho$ und Little's Gesetz
- **Folie / Zeile:** Folie 33 (Zeile 672–700) & Folie 32 (Zeile 640–670)
- **Titel:** `Statistische Kennzahlen des Simulationslaufs` / `Auswertung 2: Wartezeiten-Histogramm`
- **Aktuelle Formel:**
  $$\bar{L}_q = \lambda \cdot \bar{W}_q$$
  Auf Folie 32: "Bei Markov'schen Systemen (M/M/1) zeigt sich eine exponentiell abfallende Häufigkeit."
- **Fehlende / Unzureichende Definitionen:**
  1. **Kendall-Notation:** Die Abkürzung $M/M/1$ wird auf Folie 32 ohne Erklärung verwendet:
     - 1. $M$: Markov'scher Ankunftsprozess (Poisson-Prozess, exponentialverteilte Zwischenankunftszeiten mit Rate $\lambda$)
     - 2. $M$: Markov'scher Bedienprozess (exponentialverteilte Bedienzeiten mit Rate $\mu$)
     - $1$: Einzelne Bedienstation (Single Server).
  2. **Bedienrate $\mu$ und Systemauslastung $\rho$ fehlen vollständig:**
     - $\mu$: Mittlere Bedienrate [$\mathrm{Bedienungen/s}$] bzw. [$\mathrm{min^{-1}}$]
     - $\rho = \frac{\lambda}{\mu}$: Auslastungsgrad / Verkehrsintensität (Traffic Intensity, dimensionslos [-])
     - **Stabilitätskriterium nach Kendall:** Nur für $\rho < 1$ existiert ein stationäres Gleichgewicht! Für $\rho \ge 1$ wächst die Schlange gegen unendlich ($\bar{L}_q \to \infty$).
  3. **Little's Gesetz für Gesamtsystem vs. Teilsystem:**
     - Warteschlange: $\bar{L}_q = \lambda \cdot \bar{W}_q$
     - Gesamtsystem: $\bar{L} = \lambda \cdot \bar{W}$ mit mittlerer Gesamtkundenzahl $\bar{L} = \bar{L}_q + \rho$ und Verweilzeit $\bar{W} = \bar{W}_q + \frac{1}{\mu}$.
- **Folienkompatibler Korrekturvorschlag (Folie 33, Spalte 2):**
  ```markdown
  **3. Gesetz von Little & Stationaritätsbedingung**
  - **Auslastung der Bedienstation:** $\rho = \frac{\lambda}{\mu} \in [0, 1)$  
    *(Stabilitätsgrenze: Bei $\rho \ge 1$ divergiert die Schlange gegen unendlich!)*
  - **Little's Gesetz für die Warteschlange:**
    $$\bar{L}_q = \lambda \cdot \bar{W}_q$$
  - **Little's Gesetz für das Gesamtsystem:**
    $$\bar{L} = \lambda \cdot \bar{W} \quad \text{mit } \bar{L} = \bar{L}_q + \rho \quad \text{und } \bar{W} = \bar{W}_q + \frac{1}{\mu}$$
  - $\lambda$: Ankunftsrate [$\mathrm{min^{-1}}$], $\mu$: Bedienrate [$\mathrm{min^{-1}}$]
  - $\bar{W}_q$: Wartezeit [$\mathrm{min}$], $\bar{W}$: Verweilzeit [$\mathrm{min}$], $\bar{L}_q, \bar{L}$: Kundenanzahl [-]
  ```

---

### Befund K09-03: Exponentialverteilung: Zeitvariable $t$ und Dimensionskonsistenz
- **Folie / Zeile:** Folie 37 (Zeile 763–776)
- **Titel:** `Definition der Exponentialverteilung`
- **Aktuelle Formel:**
  $$f(x; \lambda) = \lambda e^{-\lambda x}, \quad F(x; \lambda) = 1 - e^{-\lambda x} \quad \text{für } x \ge 0$$
- **Fehlende / Unzureichende Definitionen:**
  1. Im Kontext der Ereignissimulation modelliert die Zufallsvariable eine **Zeitspanne** (Interarrival Time / Service Time). Die Bezeichnung $x$ sollte durch $t \ge 0$ ersetzt oder ergänzt werden: $f(t) = \lambda e^{-\lambda t}$.
  2. Physikalische Dimensionsanalyse nach DIN 1304:
     - Zeitdauer $t$: Einheit Sekunde [$\mathrm{s}$]
     - Ratenparameter $\lambda$: Einheit $[\mathrm{s^{-1}}]$ (Ereignisse pro Sekunde)
     - Exponent: $\lambda \cdot t$ ist dimensionslos ($[\mathrm{s^{-1}} \cdot \mathrm{s}] = 1$).
     - Dichtefunktion $f(t)$: Trägt die Einheit $[\mathrm{s^{-1}}]$, da $\int_0^\infty f(t) dt = 1$ dimensionslos sein muss.
     - Verteilungsfunktion $F(t) = P(T \le t)$: Wahrscheinlichkeit, dimensionslos [-].

---

### Befund K09-04: Inversionsmethode: Randwertsingularität bei $U = 0$
- **Folie / Zeile:** Folie 41 (Zeile 844–857)
- **Titel:** `Herleitung mittels Inversionsmethode (2/2) - Exponentialverteilung`
- **Aktuelle Formel:**
  $$X = -\frac{1}{\lambda} \ln(1 - U) \implies X = -\frac{1}{\lambda} \ln(U)$$
- **Fehlende / Unzureichende Definitionen:**
  1. $U$ wird als gleichverteilt auf $[0, 1)$ deklariert.
  2. **Numerische Singularität:** Bei $U = 0$ ist $\ln(0)$ mathematisch nicht definiert ($\ln(0) \to -\infty$). In C# liefert `Math.Log(0.0)` den IEEE-Wert `-Infinity`, was zu `X = +Infinity` führt und den Event-Kalender zerstört!
  3. **Korrektur:** Formale Spezifikation des Definitionsbereichs:
     - Für $X = -\frac{1}{\lambda}\ln(1 - U)$ mit $U \in [0, 1)$ ist $1 - U \in (0, 1]$ strikt positiv.
     - Wird vereinfacht $X = -\frac{1}{\lambda}\ln(U)$ genutzt, muss $U \in (0, 1]$ gelten (in C# z.B. `1.0 - rng.NextDouble()`).

---

### Befund K09-05: Normalverteilung: Parameterdimensionen und Dichteeinheit
- **Folie / Zeile:** Folie 42 (Zeile 859–871)
- **Titel:** `Definition der Normalverteilung`
- **Aktuelle Formel:**
  $$f(x; \mu, \sigma) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{1}{2} \left(\frac{x - \mu}{\sigma}\right)^2}$$
- **Fehlende / Unzureichende Definitionen:**
  1. Dimensionen und Einheiten:
     - $x$: Messgröße mit Einheit $[x]$ (z.B. Zeit in [$\mathrm{s}$])
     - $\mu = E[X]$: Erwartungswert / Lageparameter mit identischer Einheit $[x]$
     - $\sigma = \sqrt{\text{Var}[X]}$: Standardabweichung / Streuung mit identischer Einheit $[x]$
     - Der Exponent $\frac{x - \mu}{\sigma}$ ist eine dimensionslose Kennzahl.
     - Der Vorfaktor $\frac{1}{\sigma \sqrt{2\pi}}$ sorgt dafür, dass $f(x)$ die reziproke Einheit $[x]^{-1}$ besitzt.

---

### Befund K09-06: Box-Muller-Transformation: Trägerbereiche & Polarkoordinaten
- **Folie / Zeile:** Folie 45–47 (Zeile 918–963)
- **Titel:** `Herleitung der Box-Muller-Transformation (1/3 bis 3/3)`
- **Aktuelle Formel:**
  $$Z_1 = \sqrt{-2 \ln U_1} \cos(2\pi U_2), \quad Z_2 = \sqrt{-2 \ln U_1} \sin(2\pi U_2)$$
- **Fehlende / Unzureichende Definitionen:**
  1. Trägerbereich der Zufallszahlen:
     - $U_1 \in (0, 1]$ (offenes Null-Intervall, da $\ln(0)$ singulär ist!)
     - $U_2 \in [0, 1)$ (Winkelintervall $[0, 2\pi)$)
  2. Statistische Eigenschaften: $Z_1, Z_2 \sim \mathcal{N}(0, 1)$ sind zwei **stochastisch unabhängige, standardnormalverteilte** Zufallsvariablen (Erwartungswert $0$, Varianz $1$, dimensionslos).

---

### Befund K09-07: Log-Normal-Verteilung: Parameterentkopplung
- **Folie / Zeile:** Folie 49 (Zeile 979–1012)
- **Titel:** `Die Log-Normal-Verteilung: Parameterumrechnung`
- **Aktuelle Formel:**
  $$\sigma^2 = \ln\left(1 + \frac{v}{m^2}\right), \quad \mu = \ln(m) - \frac{1}{2}\sigma^2, \quad X = \exp(\mu + \sigma Z)$$
- **Fehlende / Unzureichende Definitionen:**
  1. Klärende Begriffsabgrenzung:
     - $m = E[X]$: Physikalischer Ziel-Erwartungswert (z.B. $[\mathrm{s}]$)
     - $v = \text{Var}[X] = s^2$: Physikalische Ziel-Varianz (z.B. $[\mathrm{s^2}]$)
     - $\mu$: Lageparameter der transformierten Normalverteilung $\ln(X) \sim \mathcal{N}(\mu, \sigma^2)$
     - $\sigma$: Skalenparameter der transformierten Normalverteilung.
  2. Dimensionsanalyse: $\frac{v}{m^2}$ ist dimensionslos $\implies \sigma$ ist dimensionslos. Bei $\ln(m)$ muss $m$ auf eine Basiseinheit (z.B. $[m]/\mathrm{s}$) bezogen werden.

---

### Befund K09-08: Konfidenzintervall: Unterscheidung Schätzer vs. Realisierung & Freiheitsgrade
- **Folie / Zeile:** Folie 57 (Zeile 1169–1183)
- **Titel:** `Konfidenzintervalle`
- **Aktuelle Formel:**
  $$KI_{1-\alpha} = \left[ \bar{X} - z_{1-\alpha/2} \cdot \frac{s}{\sqrt{N}}, \quad \bar{X} + z_{1-\alpha/2} \cdot \frac{s}{\sqrt{N}} \right]$$
  "Für kleine Stichproben ($N < 30$): Student-$t$-Quantil $t_{N-1, 1-\alpha/2}$ anstelle von $z$ verwenden."
- **Fehlende / Unzureichende Definitionen:**
  1. Typografie: $\bar{X}$ ist die Zufallsvariable (Schätzfunktion), $\bar{x} = \frac{1}{N}\sum_{i=1}^N x_i$ die konkrete Schätzung im Experiment.
  2. $s = \sqrt{\frac{1}{N-1}\sum_{i=1}^N (x_i - \bar{x})^2}$ ist die korrigierte Stichproben-Standardabweichung.
  3. Student-$t$-Quantil-Notation: Der Freiheitsgrad $\nu = N - 1$ und das Quantilniveau $1 - \alpha/2$ sollten nach DIN/ISO als $t_{1-\alpha/2, \ N-1}$ notiert werden.
  4. Definition des Standardfehlers: $\text{SE} = \frac{s}{\sqrt{N}}$ (Standard Error of the Mean).

---

### Befund K09-09: Welford-Algorithmus: Explizite Initialisierungsbedingungen
- **Folie / Zeile:** Folie 60 (Zeile 1224–1239)
- **Titel:** `Numerisch stabile 1-Pass-Varianz: Welford (1962)`
- **Aktuelle Formel:**
  $$M_k = M_{k-1} + \frac{x_k - M_{k-1}}{k}, \quad S_k = S_{k-1} + (x_k - M_{k-1}) \cdot (x_k - M_k)$$
  $$s^2 = \frac{S_N}{N - 1}, \quad \text{SE} = \frac{s}{\sqrt{N}}$$
- **Fehlende / Unzureichende Definitionen:**
  1. Die Initialisierungsbedingungen für den Rekursionsanfang fehlen im mathematischen Text:
     $$M_0 = 0, \qquad S_0 = 0$$
  2. Laufindex $k \in \{1, 2, \dots, N\}$.
  3. Bedeutung von $S_k$: Summe der quadrierten Abweichungen zum aktuellen Mittelwert:
     $$S_k = \sum_{i=1}^k (x_i - M_k)^2$$
  4. Die unverzerrte Zwischenvarianz nach $k$ Werten ist $s_k^2 = \frac{S_k}{k - 1}$ für $k \ge 2$.

---

### Befund K09-10: Chan-Merge-Formel: Formale Stichprobenparameter
- **Folie / Zeile:** Folie 61 (Zeile 1241–1254)
- **Titel:** `Parallele Aggregation: Chan-Merge-Formel (1979)`
- **Aktuelle Formel:**
  $$n = n_A + n_B, \quad \delta = M_B - M_A$$
  $$M = M_A + \delta \cdot \frac{n_B}{n}, \quad S = S_A + S_B + \delta^2 \cdot \frac{n_A \cdot n_B}{n}$$
- **Fehlende / Unzureichende Definitionen:**
  1. $n_A, n_B \in \mathbb{N}$: Stichprobenumfänge der Teilstichproben $A$ und $B$.
  2. $M_A, M_B$: Lokale Mittelwerte der Teilmengen.
  3. $S_A, S_B$: Lokale Quadratsummen der Teilmengen.
  4. Kombinierte Stichprobenvarianz nach der Fusion: $s^2 = \frac{S}{n - 1}$.

---

## 5. Kapitel 10: Hybride Dynamische Modelle – Detaillierter Formelaudit

### Befund K10-01: Bouncing Ball: Koordinatensystem, Einheiten und Vektordynamik
- **Folie / Zeile:** Folie 5–6 (Zeile 40–86)
- **Titel:** `Mathematische Beschreibung des Bouncing Balls` / `Differentialgleichungen der Bewegung`
- **Aktuelle Formel:**
  $$\ddot{y} = -g, \quad \dot{y} = v, \quad \dot{v} = -g$$
- **Fehlende / Unzureichende Definitionen:**
  1. Physikalische Einheiten: $y \in [\mathrm{m}]$, $v \in [\mathrm{m/s}]$, $g \approx 9{,}81\,\mathrm{m/s^2}$.
  2. Stoßzahl / Restitutionskoeffizient $e \in [0, 1]$ (dimensionslos [-]).
  3. Vorbereitung des allgemeinen hybriden Formalismus: Die Bewegungsgleichungen sollten als 2-dimensionales kontinuierliches Zustandsraummodell dargestellt werden:
     $$\mathbf{x}_c = \begin{pmatrix} y \\ v \end{pmatrix}, \quad \dot{\mathbf{x}}_c = \mathbf{f}(\mathbf{x}_c) = \begin{pmatrix} v \\ -g \end{pmatrix}$$

---

### Befund K10-02: Zero-Crossing-Funktion & Diskreter 2-Zustands-Stoßvektor
- **Folie / Zeile:** Folie 7–8 (Zeile 88–131)
- **Titel:** `Bedingungen für den Aufprall` / `Diskrete Zustandsänderung beim Aufprall`
- **Aktuelle Formel:**
  $$v(t_e^+) = -e \cdot v(t_e^-)$$
- **Fehlende / Unzureichende Definitionen:**
  1. Die Zero-Crossing-Funktion $z(\mathbf{x}_c)$ wird auf Folie 7 nur verbal beschrieben. Mathematisch:
     $$z(\mathbf{x}_c) = y(t) = 0 \quad \text{mit Vorbedingung } v(t^-) < 0$$
  2. Diskretes Zustandsupdate: Auf Folie 8 wird nur die Geschwindigkeit aktualisiert. Der vollständige Zustandsvektor $\mathbf{x}_c = (y, v)^T$ vor und nach dem Stoß lautet:
     $$\mathbf{x}_c(t_e^+) = \mathbf{h}(\mathbf{x}_c(t_e^-)) = \begin{pmatrix} y(t_e^-) \\ -e \cdot v(t_e^-) \end{pmatrix} = \begin{pmatrix} 0 \\ -e \cdot v(t_e^-) \end{pmatrix}$$
     (Dies verdeutlicht, dass die Position stetig bleibt: $y(t_e^+) = y(t_e^-) = 0$, während die Geschwindigkeit einen Sprung erfährt).

---

### Befund K10-03: Analytische Lösung des Aufprallzeitpunkts (Geschlossene Wurzelformel)
- **Folie / Zeile:** Folie 10 (Zeile 160–180)
- **Titel:** `Analytische Lösung: Zeitpunkt des Aufpralls`
- **Aktuelle Formel:**
  $$0 = y_0 + v_0(t_e - t_0) - \frac{1}{2}g(t_e - t_0)^2$$
- **Fehlende / Unzureichende Definitionen:**
  Die Folie erklärt nur: "Dies ist eine quadratische Gleichung... die positive Lösung ist der relevante Aufprallzeitpunkt". Die explizite geschlossene Lösungsformel fehlt:
  $$\Delta t_e = t_e - t_0 = \frac{v_0 + \sqrt{v_0^2 + 2 g y_0}}{g} > 0$$
  Dies belegt die analytische Berechenbarkeit und dient im Unterricht als Benchmark für die numerische Nulldurchgangsdetektion!

---

### Befund K10-04: Zeno-Effekt: Diskrepanz der Anfangsbedingungen
- **Folie / Zeile:** Folie 12 (Zeile 205–234)
- **Titel:** `Das Zeno-Phänomen (Zeno-Effekt)`
- **Aktuelle Formel:**
  $$\Delta t_k = 2 \frac{v_k}{g} = 2 \frac{v_0}{g} e^k, \qquad t_\infty = t_0 + \frac{2 v_0}{g(1 - e)} < \infty$$
- **Fehlende / Unzureichende Definitionen:**
  1. **Physikalische Voraussetzung:** Die Formel $\Delta t_k = 2 \frac{v_k}{g}$ gilt exakt für einen Ball, der vom Boden ($y=0$) mit Startgeschwindigkeit $v_0 > 0$ nach oben prallt (Aufstieg + Abstieg).
  2. **Fallversuch aus Höhe $h_0$:** Lässt man den Ball im Ruhezustand aus der Höhe $h_0$ fallen ($v(0) = 0$), so lautet die erste Falldauer:
     $$\Delta t_{\text{fall}, 0} = \sqrt{\frac{2 h_0}{g}}$$
     Die Auftreffgeschwindigkeit ist $v_1^- = -\sqrt{2 g h_0}$. Erst der Rückprall besitzt die Geschwindigkeit $v_1^+ = e \sqrt{2 g h_0}$ mit Flugdauer $\Delta t_1 = \frac{2 v_1^+}{g}$. Die Zeno-Grenzzeit für den Fall aus der Höhe $h_0$ lautet:
     $$t_\infty = \sqrt{\frac{2 h_0}{g}} + \sum_{k=1}^\infty \Delta t_k = \sqrt{\frac{2 h_0}{g}} \left(1 + \frac{2e}{1 - e}\right) = \sqrt{\frac{2 h_0}{g}} \left(\frac{1 + e}{1 - e}\right)$$
  3. Diese Unterscheidung muss auf Folie 12 klar benannt werden, da in den Beispielen (z.B. Folie 55) der Ball aus $y_0 = 1\,\mathrm{m}$ fallen gelassen wird!

---

### Befund K10-05: Sticking Mode: Schwellenwerte, Einheiten und Gleichgewicht
- **Folie / Zeile:** Folie 13 (Zeile 236–263)
- **Titel:** `Auflösung des Zeno-Effekts: Sticking Mode`
- **Aktuelle Formel:**
  $$|v^-| < v_{\text{sticking}} \quad \text{und} \quad |y| < y_{\text{tol}}$$
  $$y(t) \equiv 0, \quad v(t) \equiv 0, \quad \dot{v}(t) = 0$$
- **Fehlende / Unzureichende Definitionen:**
  1. Physikalische Einheiten und typische Dimensionen:
     - $v_{\text{sticking}}$: Geschwindigkeitsschwelle in $[\mathrm{m/s}]$ (z.B. $10^{-3}\,\mathrm{m/s}$ bzw. $1\,\mathrm{mm/s}$)
     - $y_{\text{tol}}$: Kontakttoleranz in $[\mathrm{m}]$ (z.B. $10^{-6}\,\mathrm{m}$ bzw. $1\,\mathrm{\mu m}$).
  2. Physikalische Begründung für $\dot{v} = 0$: Normalkraft des Bodens kompensiert die Schwerkraft exakt ($F_N - m g = 0 \implies a = 0$).

---

### Befund K10-06: Erweiterter allgemeiner Formalismus: Vektordimensionen
- **Folie / Zeile:** Folie 28–31 (Zeile 554–632)
- **Titel:** `Erweiterter allgemeiner Formalismus (1/4 bis 4/4)`
- **Aktuelle Formel:**
  $$\mathbf{x}_c(t) \in \mathbb{R}^{n_c}, \quad \mathbf{x}_d(t) \in \mathbb{R}^{n_d}$$
  $$\dot{\mathbf{x}}_c(t) = \mathbf{f}(t, \mathbf{x}_c, \mathbf{x}_d, \mathbf{u}), \quad \mathbf{y}(t) = \mathbf{g}(t, \mathbf{x}_c, \mathbf{x}_d, \mathbf{u})$$
  $$\mathbf{z}(t, \mathbf{x}_c, \mathbf{x}_d, \mathbf{u}) \in \mathbb{R}^{n_z}$$
- **Fehlende / Unzureichende Definitionen:**
  1. Die Dimensionen des Eingangsvektors $\mathbf{u}(t) \in \mathbb{R}^m$ und des Ausgangsvektors $\mathbf{y}(t) \in \mathbb{R}^p$ werden nicht deklariert (im Gegensatz zu $n_c, n_d, n_z$).
  2. Nulldurchgangsrichtung: Für $\mathbf{z} \in \mathbb{R}^{n_z}$ sollte definiert werden, ob Ereignisse bei Vorzeichenwechsel von Minus nach Plus, Plus nach Minus oder beidseitig ausgelöst werden.

---

### Befund K10-07: Vorzeichenwechsel-Bisektion: Toleranzen & Iterationsschranke
- **Folie / Zeile:** Folie 49 (Zeile 1013–1031)
- **Titel:** `Echte Vorzeichenwechsel-Bisektion: Theorie & Kriterien`
- **Aktuelle Formel:**
  $$\text{sgn}(z(t_a)) \neq \text{sgn}(z(t_b)) \iff z(t_a) \cdot z(t_b) \le 0$$
  $$|z_{\text{mid}}| \le \varepsilon_z \quad \text{oder} \quad (t_{\text{right}} - t_{\text{left}}) \le \varepsilon_t$$
- **Fehlende / Unzureichende Definitionen:**
  1. Toleranzparameter:
     - $\varepsilon_z$: Nullstellentoleranz / Residualtoleranz der Zero-Crossing-Funktion (Einheit $[z]$, z.B. $10^{-6}\,\mathrm{m}$)
     - $\varepsilon_t$: Zeittoleranz des Bisektionsintervalls (Einheit $[\mathrm{s}]$, z.B. $10^{-8}\,\mathrm{s}$).
  2. Theoretische maximale Iterationsanzahl:
     $$k_{\max} = \left\lceil \log_2 \left(\frac{\Delta t}{\varepsilon_t}\right) \right\rceil$$
     (z.B. für $\Delta t = 0{,}01\,\mathrm{s}$ und $\varepsilon_t = 10^{-8}\,\mathrm{s}$ sind maximal $k = 20$ Bisektionsschritte nötig).

---

## 6. Kapitel 11: Epilog & Synthese – Detaillierter Formelaudit

### Befund K11-01: Notationsbruch bei der Modelltaxonomie (Magersatz statt ISO-Fettdruck)
- **Folie / Zeile:** Folie 5 (Zeile 38–65) & Folie 8 (Zeile 102–112)
- **Titel:** `Die 4 Simulationsmodellarten im Überblick (1/2)` / `Vergleichende Taxonomie der Modellarten (1/2)`
- **Aktuelle Formel:**
  $$A \cdot x = b, \quad \dot{x} = f(x, u, t)$$
- **Fehlende / Unzureichende Definitionen:**
  1. Nach ISO 80000-2 müssen Matrizen und Vektoren in Fettdruck gesetzt werden. Auf Folie 5 und in der Taxonomietabelle auf Folie 8 fallen sie wieder auf einfachen Magersatz zurück ($A \cdot x = b$ statt $\mathbf{A}\mathbf{x} = \mathbf{b}$).
  2. Kontinuierlich: $\dot{\mathbf{x}}(t) = \mathbf{f}(t, \mathbf{x}(t), \mathbf{u}(t))$ mit $\mathbf{x} \in \mathbb{R}^n, \mathbf{u} \in \mathbb{R}^m$.
  3. Statisch: $\mathbf{A} \in \mathbb{R}^{n\times n}, \mathbf{x} \in \mathbb{R}^n, \mathbf{b} \in \mathbb{R}^n$.

---

### Befund K11-02: Zero-Crossing-Symbolkonflikt ($g(x)=0$ vs. $z(\mathbf{x})=0$)
- **Folie / Zeile:** Folie 8 (Zeile 102–112)
- **Titel:** `Vergleichende Taxonomie der Modellarten (1/2)`
- **Aktuelle Formel:**
  $$\text{Hybrid (Kap. 10): } \dot{x} = f_m(x, u), \quad g(x) = 0 \implies x^+$$
- **Fehlende / Unzureichende Definitionen:**
  1. Symbolkonflikt: In Kapitel 10 wurde die Zero-Crossing-Funktion durchgängig und normgerecht als $\mathbf{z}(\mathbf{x}_c, \dots)$ bezeichnet; die Ausgangsgleichung hieß $\mathbf{g}$. In Kapitel 11 wird plötzlich $g(x) = 0$ für den Nulldurchgang verwendet!
  2. Modus-Index: $m \in M$ deklariert den diskreten Betriebsmodus (z.B. Freiflug vs. Kontakt).
  3. Korrekturvorschlag für Tabelle: $\dot{\mathbf{x}}_c = \mathbf{f}_m(\mathbf{x}_c, \mathbf{u}), \quad z(\mathbf{x}_c) = 0 \implies \mathbf{x}_c^+ = \mathbf{h}(\mathbf{x}_c^-)$.

---

### Befund K11-03: Zeitschrittakkumulation: Ungenauer Indexbereich
- **Folie / Zeile:** Folie 24 (Zeile 446–470)
- **Titel:** `Numerische Fallstricke: Floating-Point-Präzision (1/2)`
- **Aktuelle Formel:**
  $$t_k = t_0 + k \cdot \Delta t \quad (k \in \mathbb{N})$$
- **Fehlende / Unzureichende Definitionen:**
  1. Für den Startzeitpunkt $t = t_0$ muss $k = 0$ gelten. Die Angabe $k \in \mathbb{N}$ schließt die Null nach DIN 5473 formal aus! Korrekt ist $k \in \mathbb{N}_0 = \{0, 1, 2, \dots\}$.
  2. Einheit von $\Delta t$: $[\mathrm{s}]$.

---

### Befund K11-04: Physikalische Dimension des Regularisierungsparameters $\epsilon$
- **Folie / Zeile:** Folie 25 (Zeile 472–495)
- **Titel:** `Numerische Fallstricke: Floating-Point-Präzision (2/2)`
- **Aktuelle Formel:**
  $$r_{\text{reg}} = \sqrt{r^2 + \epsilon^2} \quad (\epsilon \ll 1)$$
- **Fehlende / Unzureichende Definitionen:**
  1. Dimensionsreinheit nach DIN 1304: Der Abstand $r$ besitzt die Einheit Meter [$\mathrm{m}$]. Folglich **muss** der Glättungsparameter $\epsilon$ ebenfalls die physikalische Einheit Meter tragen ($[\epsilon] = \mathrm{m}$), da die Summe $r^2 + \epsilon^2$ sonst physikalisch unzulässig ist!
  2. Der Zusatz $(\epsilon \ll 1)$ ist irreführend, da $\epsilon$ keine dimensionslose Zahl ist, sondern eine Schranke bezogen auf den charakteristischen Objektradius darstellt (z.B. $\epsilon \ll r_{\text{char}}$ oder $\epsilon = 10^{-4}\,\mathrm{m}$).

---

### Befund K11-05: Spektrale Stabilitätsgrenze & Zeitkonstante bei steifen Systemen
- **Folie / Zeile:** Folie 26 (Zeile 497–519)
- **Titel:** `Steifigkeit (Stiffness) & Stabilitätsgrenzen (1/2)`
- **Aktuelle Formel:**
  $$\Delta t < \frac{2}{\omega_{\max}}, \qquad \Delta t \le \frac{T_{\min}}{10}$$
- **Fehlende / Unzureichende Definitionen:**
  1. $\omega_{\max}$: Höchste System-Eigenkreisfrequenz bzw. spektraler Radius der Systemmatrix $\mathbf{A}$:
     $$\omega_{\max} = \max_i |\operatorname{Im}(\lambda_i)| \quad \text{bzw.} \quad \rho(\mathbf{A}) = \max_i |\lambda_i| \quad [\mathrm{rad/s}] \text{ bzw. } [\mathrm{s^{-1}}]$$
  2. Kleinste Zeitkonstante:
     $$T_{\min} = \frac{1}{\max_i |\operatorname{Re}(\lambda_i)|} \quad [\mathrm{s}]$$
  3. Die Stabilitätsgrenze $\Delta t < \frac{2}{\omega_{\max}}$ leitet sich exakt aus dem Dahlquist-Intervall $[-2, 0]$ für den expliziten Euler ab.

---

### Befund K11-06: Fehlende mathematische Verlustfunktion bei PINNs
- **Folie / Zeile:** Folie 37 (Zeile 732–755)
- **Titel:** `KI-Surrogatmodelle & Physics-Informed Neural Networks`
- **Aktueller Text:** "PINNs betten die physikalischen Differentialgleichungen direkt in die Verlustfunktion ein..."
- **Didaktisches Defizit:** Im gesamten Text wird keine einzige Formel gezeigt, obwohl Studierende in Master-Modulen und Bachelorarbeiten zunehmend mit PINNs arbeiten.
- **Folienkompatibler Ergänzungsvorschlag (Folie 37, Spalte 2):**
  ```markdown
  **Verlustfunktion eines PINN:**
  $$\mathcal{L}(\boldsymbol{\theta}) = \mathcal{L}_{\text{Daten}}(\boldsymbol{\theta}) + \lambda_{\text{phys}} \cdot \mathcal{L}_{\text{DGL}}(\boldsymbol{\theta})$$
  $$\mathcal{L}_{\text{DGL}}(\boldsymbol{\theta}) = \frac{1}{N_c} \sum_{i=1}^{N_c} \left\| \mathcal{D}[\hat{u}_{\boldsymbol{\theta}}](t_i, \mathbf{x}_i) - f(t_i, \mathbf{x}_i) \right\|^2$$
  - $\mathcal{D}[\cdot]$: Physikalischer Differentialoperator (via automatischer Differentiation)
  - $\lambda_{\text{phys}}$: Gewichtungsfaktor; $N_c$: Anzahl der Kollokationspunkte
  ```

---

### Befund K11-07: Mathematische Präzisierung von Validierungsmetriken
- **Folie / Zeile:** Folie 41 (Zeile 820–847)
- **Titel:** `Wie validiert man eine Simulation?`
- **Aktuelle Formel:**
  $$\text{Fehler}(t) = \|x_{\text{num}}(t) - x_{\text{analytisch}}(t)\|$$
- **Fehlende / Unzureichende Definitionen:**
  1. Vektornotation: $\mathbf{x}_{\text{num}}(t)$ und $\mathbf{x}_{\text{analytisch}}(t)$.
  2. Norm: Euklidische $L_2$-Norm $\|\cdot\|_2$ für Vektoren.
  3. Ergänzung des **relativen Fehlers** (Singularitätsschutz mit $\varepsilon > 0$):
     $$e_{\text{rel}}(t) = \frac{\|\mathbf{x}_{\text{num}}(t) - \mathbf{x}_{\text{analytisch}}(t)\|_2}{\|\mathbf{x}_{\text{analytisch}}(t)\|_2 + \varepsilon}$$
     und des maximalen globalen Fehlers (Tschebyscheff-Norm): $e_{\max} = \max_{k} \|\mathbf{x}_{\text{num}}(t_k) - \mathbf{x}(t_k)\|$.

---

## 7. Systemischer Mängelkatalog & Priorisierte Roadmap

### 7.1 Übersichtstabelle aller Einzelbefunde

| ID | Kapitel | Folie | Zeile | Schweregrad | Kategorie | Kurzbeschreibung |
| :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **K08-01** | 08 | 6, 8 | 67, 128 | **P1 (Hoch)** | Vollständigkeit | Lineare Zustandsraumdarstellung $\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D}$ und Vektordimensionen fehlen |
| **K08-02** | 08 | 7, 25 | 100, 524 | **P1 (Hoch)** | Einheiten / Didaktik | Physikalische SI-Einheiten ($m, d, k, F$) und Kennwerte $\omega_0, D$ fehlen |
| **K08-03** | 08 | 15, 26 | 280, 540 | **P2 (Mittel)** | ISO 80000-2 | Magerer Skalarsatz für Zustandsvektor $\dot{x} = f(x)$ statt $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$ |
| **K08-04** | 08 | 21 | 440 | **P2 (Mittel)** | Vollständigkeit | Hamilton-Funktion $H$ und Jacobi-Matrix $\mathbf{J}$ unzureichend erklärt |
| **K08-05** | 08 | 29 | 602 | **P1 (Hoch)** | Didaktik / Rigor | Analytischer Nachweis der Energiedivergenz $E_{k+1}=E_k(1+\omega_0^2 h^2)$ fehlt |
| **K08-06** | 08 | 57, 58 | 1243 | **P2 (Mittel)** | Physik | Thermodynamische Gleichung der Temperaturspannung $V_T = k_B T / q$ fehlt |
| **K08-07** | 08 | 59 | 1279 | **P2 (Mittel)** | Einheiten | Einheit des Strömungswiderstandsbeiwerts $c$ ($[\mathrm{kg/m}]$) fehlt |
| **K08-08** | 08 | 62 | 1314 | **P2 (Mittel)** | Numerik | Kopplungsgleichung $\mathbf{x}^{(m)} = \mathbf{x}_k + h\dot{\mathbf{x}}^{(m)}$ in Picard-Iteration fehlt |
| **K08-09** | 08 | 69 | 1431 | **P2 (Mittel)** | Numerik | Butcher-Konsistenzbedingungen $\sum a_{ij} = c_i, \sum b_i = 1$ fehlen |
| **K08-10** | 08 | 71, 72 | 1501 | **P3 (Niedrig)** | Konsistenz | Diskrepanz zwischen Folientitel ($\omega$) und Folientext ($\omega_0$) |
| **K08-11** | 08 | 77 | 1606 | **P1 (Hoch)** | Mechatronik | Elektromechanische Herleitung ($J, R, L, k_m, k_e$) des DC-Motors fehlt |
| **K08-12** | 08 | 79 | 1646 | **P1 (Hoch)** | Regelungstechnik | Vollständige Reglergleichung $u_{\text{raw}}$ und Einheiten von $K_p, K_i, K_d$ fehlen |
| **K09-01** | 09 | 12, 31 | 163, 608 | **P2 (Mittel)** | Notation / Taxonomie | Vektorpfeil $\vec{z}$ und Verwechslung $N(t)$ (System) vs. $L_q(t)$ (Schlange) |
| **K09-02** | 09 | 33, 6 | 672, 66 | **P1 (Hoch)** | Vollständigkeit | Kendall $M/M/1$, Bedienrate $\mu$, Auslastung $\rho < 1$ und Little-Gesamtsystem fehlen |
| **K09-03** | 09 | 37 | 763 | **P2 (Mittel)** | DIN 1304 | Zeitvariable $t$ statt $x$; Einheitenanalyse von $\lambda$ ($[\mathrm{s^{-1}}]$) fehlt |
| **K09-04** | 09 | 41 | 844 | **P1 (Hoch)** | Numerik | Warnung vor Polstellensingularität bei Inversion $X = -\frac{1}{\lambda}\ln(U)$ bei $U=0$ |
| **K09-05** | 09 | 42 | 859 | **P2 (Mittel)** | Einheiten | Physikalische Dimensionen von $\mu, \sigma$ und reziproke Dichteeinheit fehlen |
| **K09-06** | 09 | 45–47 | 918 | **P2 (Mittel)** | Stochastik | Explizite Trägerintervalle $U_1 \in (0, 1]$ und $U_2 \in [0, 1)$ fehlen |
| **K09-07** | 09 | 49 | 979 | **P2 (Mittel)** | Begriffsschärfe | Trennung von physikalischen Momenten $(m, s^2)$ und Log-Parametern $(\mu, \sigma^2)$ |
| **K09-08** | 09 | 57 | 1169 | **P2 (Mittel)** | DIN/ISO | Notation Schätzer $\bar{X}$ vs. Schätzwert $\bar{x}$, Freiheitsgrade Student-$t$ |
| **K09-09** | 09 | 60 | 1224 | **P2 (Mittel)** | Vollständigkeit | Rekursionsanfang $M_0 = 0, S_0 = 0$ im Welford-Algorithmus fehlt |
| **K09-10** | 09 | 61 | 1241 | **P3 (Niedrig)** | Vollständigkeit | Explizite Zuordnung der Partitionen $A, B$ in der Chan-Formel |
| **K10-01** | 10 | 5, 6 | 40, 62 | **P2 (Mittel)** | Einheiten / Notation | Einheiten $y, v, g$ und 2D-Zustandsvektorform $\mathbf{x}_c = (y, v)^T$ fehlen |
| **K10-02** | 10 | 7, 8 | 88, 110 | **P2 (Mittel)** | Vollständigkeit | Formale Zero-Crossing-Funktion $z(\mathbf{x}_c)=0$ und 2D-Zustandsupdate fehlen |
| **K10-03** | 10 | 10 | 160 | **P2 (Mittel)** | Rigor | Analytische geschlossene Lösungsformel für Aufprallzeitpunkt $\Delta t_e$ fehlt |
| **K10-04** | 10 | 12 | 205 | **P1 (Hoch)** | Physik / Rigor | Diskrepanz bei Zeno-Startbedingung ($y_0=0, v_0>0$ vs. Fallhöhe $h_0, v_0=0$) |
| **K10-05** | 10 | 13 | 236 | **P2 (Mittel)** | Einheiten | Einheiten und typische Schwellenwerte für $v_{\text{sticking}}$ und $y_{\text{tol}}$ |
| **K10-06** | 10 | 28 | 554 | **P2 (Mittel)** | Vollständigkeit | Dimensionen der Vektoren $\mathbf{u} \in \mathbb{R}^m$ und $\mathbf{y} \in \mathbb{R}^p$ fehlen |
| **K10-07** | 10 | 49 | 1013 | **P2 (Mittel)** | Numerik | Einheiten der Bisektionstoleranzen $\varepsilon_z, \varepsilon_t$ und Iterationsschranke $k_{\max}$ |
| **K11-01** | 11 | 5, 8 | 38, 102 | **P1 (Hoch)** | ISO 80000-2 | Notationsbruch: Magersatz $A \cdot x = b, \dot{x} = f(x,u,t)$ in Synthesefolien |
| **K11-02** | 11 | 8 | 102 | **P2 (Mittel)** | Konsistenz | Symbolkonflikt Zero-Crossing $g(x) = 0$ in Epilog vs. $z(\mathbf{x}) = 0$ in Kap. 10 |
| **K11-03** | 11 | 24 | 446 | **P3 (Niedrig)** | DIN 5473 | Diskreter Zeitindex $k \in \mathbb{N}_0$ statt $k \in \mathbb{N}$ |
| **K11-04** | 11 | 25 | 472 | **P2 (Mittel)** | DIN 1304 | Physikalische Einheit des Regularisierungsparameters $\epsilon$ ($[\mathrm{m}]$) fehlt |
| **K11-05** | 11 | 26 | 497 | **P2 (Mittel)** | Vollständigkeit | Spektrale Definition $\omega_{\max} = \max |\lambda_i|$ und $T_{\min} = 1/\max|\operatorname{Re}(\lambda)|$ |
| **K11-06** | 11 | 37 | 732 | **P2 (Mittel)** | Didaktik | Fehlende mathematische Formel für Physics-Informed Loss $\mathcal{L}_{\text{PINN}}$ |
| **K11-07** | 11 | 41 | 820 | **P3 (Niedrig)** | Vollständigkeit | Vektorfettung, $L_2$-Norm und relative Fehlermetrik präzisieren |

---

### 7.2 Priorisierte Handlungsempfehlungen

1. **Sofortmaßnahmen (Priorität P1 - Fachliche Korrektheit & Vollständigkeit):**
   - **Kapitel 08 (Folie 6 & 8):** Ergänzung der linearen Zustandsraumdarstellung $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}, \mathbf{y} = \mathbf{C}\mathbf{x} + \mathbf{D}\mathbf{u}$ mit Definition aller Matrizen und Vektordimensionen.
   - **Kapitel 08 (Folie 77 & 79):** Einbettung der elektromechanischen Parameter des Servomotors ($J, R, L, k_m, k_e$) und Ergänzung der ungesättigten Reglerformel $u_{\text{raw}}(t)$ beim Anti-Windup Clamping.
   - **Kapitel 08 (Folie 29):** Einfügen des analytischen Nachweises für das Energiewachstum $E_{k+1} = E_k(1 + \omega_0^2 h^2)$ beim expliziten Euler.
   - **Kapitel 09 (Folie 33):** Einführung der Bedienrate $\mu$, der Systemauslastung $\rho = \lambda/\mu < 1$, der Kendall-Notation $M/M/1$ und Little's Gesetz für das Gesamtsystem ($L = \lambda W$).
   - **Kapitel 09 (Folie 41):** Absicherung der Inversionsformel gegen $U = 0$ durch Spezifikation des offenen Null-Intervalls $U \in (0, 1]$.
   - **Kapitel 10 (Folie 12):** Präzisierung der Zeno-Anfangsbedingung (Abschuss vom Boden vs. Fallversuch aus Höhe $h_0$).
   - **Kapitel 11 (Folie 5 & 8):** Durchgängige Umstellung aller Gleichungen der Synthesefolien auf ISO 80000-2 Fettdruck ($\mathbf{A}\mathbf{x} = \mathbf{b}$, $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x}, \mathbf{u}, t)$).

2. **Mittelfristige Konsolidierung (Priorität P2 - Normenkonformität & SI-Einheiten):**
   - Bereinigung aller Vektorbezeichner in Kapitel 08 (Freier Fall, Federpendel) von magerem $x$ auf fetten Vektor $\mathbf{x}$.
   - Ergänzung der SI-Einheiten an sämtlichen Parametereinführungen (Masse $[\mathrm{kg}]$, Dämpfung $[\mathrm{N\cdot s/m}]$, Steifigkeit $[\mathrm{N/m}]$, Raten $[\mathrm{s^{-1}}]$).
   - Harmonisierung des Zero-Crossing-Formelzeichens zwischen Kapitel 10 und Kapitel 11 auf $z(\mathbf{x}) = 0$.
   - Klärung der Regularisierungsdimension $[\epsilon] = \mathrm{m}$ auf Folie 25 in Kapitel 11.

3. **Didaktischer Feinschliff (Priorität P3):**
   - Ergänzung der Butcher-Konsistenzbedingungen $\sum a_{ij} = c_i$ und $\sum b_i = 1$ in Kapitel 08.
   - Angabe der PINN-Verlustfunktion auf Folie 37 in Kapitel 11.
   - Explizite Initialisierung $M_0=0, S_0=0$ bei Welford auf Folie 60 in Kapitel 09.
