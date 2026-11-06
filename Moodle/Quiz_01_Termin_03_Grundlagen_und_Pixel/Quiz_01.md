# Moodle-Quiz 1 (Zu Beginn von Termin 3): Grundlagen, Modelltheorie & 2D-Pixelgrafik

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (FH Oberösterreich, Campus Wels)  
**Prüfungszeitpunkt:** Zu Beginn von Termin 3 (erste 15 Minuten vor dem Theorie-Impuls zu Kapitel 03)  
**Bearbeitungszeit:** 15 Minuten  
**Säule:** Säule 1 (Theoretische & numerische Grundlagen, Gewicht: 7,5 % der Gesamtnote)  
**Prüfungsmodus:** Präsenz im EDV-Labor / Safe Exam Browser in Moodle  
**Zulässige Hilfsmittel:** Taschenrechner (nicht-programmierbar) oder Windows-Rechner; keine LLM-Nutzung / Closed-Book

---

## Didaktische Zielsetzung & Einbettung

Dieses Quiz bildet den ersten summativen Meilenstein der Lehrveranstaltung zu Beginn von Termin 03. Es überprüft nach dem Prinzip der strikten Rückwärts-Kausalität ausschließlich den Stoff der vorangegangenen Termine 01 und 02 (Kapitel 00, 01 und 02): das Fundament der technischen Modellierung, das hardwarenahe Speicherverständnis von Rasterbildern in C#/WPF sowie die numerische Integration und Stabilität expliziter Finite-Differenzen-Verfahren (FDM).

### Stoffabgrenzung & Tabu-Grenzen (Rückwärts-Kausalität)
* **Geprüfte Inhalte (Termin 01 & 02):** Kapitel 00 (Prolog), Kapitel 01 (Modellbegriff nach Stachowiak, Modelltaxonomie, Digitaler Zwilling nach Grieves & Integrationsstufen nach Kritzinger, explizites Euler-Verfahren & Diskretisierungsfehler), Kapitel 02 (2D-Pixelgrafik, `WriteableBitmap`, Stride, Pixelformat `Bgra32`, `unsafe`-Pointer, 2D-Wärmeleitungsgleichung mit Laplace-5-Punkt-Stern, CFL- bzw. Von-Neumann-Stabilitätsgrenze $s \le 0{,}25$, Randbedingungen Dirichlet vs. Neumann).
* **Strikte Tabu-Grenzen (ab Termin 03+):**
  - ❌ **KEINE** 2D-Vektorgrafiken, WPF `Canvas` oder Koordinatentransformationen (Kapitel 03 – wird erst nach dem Quiz gelehrt!)
  - ❌ **KEIN** ScottPlot 5, Ringpuffer oder MSAGL (Kapitel 04)
  - ❌ **KEINE** 3D-Computergrafik / OpenGL (Kapitel 05)
  - ❌ **KEIN** Multithreading / TPL (Kapitel 06)
  - ❌ **KEINE** Steifigkeitsmatrizen / Cholesky-Zerlegungen (Kapitel 07)
  - ❌ **KEINE** ODE-Solver höherer Ordnung wie RK4 oder Heun (Kapitel 08)

---

## Fragenübersicht (8 Fragen / 10,0 Punkte)

| Nr. | Thema | Fragentyp | Bloom-Taxonomie | Punkte |
| :---: | :--- | :--- | :---: | :---: |
| **Q1.1** | 2D-FDM-Wärmeleitung & Von-Neumann-Stabilitätsgrenze | Numerische Berechnung (Freitext `{#...}`) | Anwenden / Berechnen (L3) | 2,0 |
| **Q1.2** | Explizites Euler-Verfahren: Thermischer Abkühlprozess | Numerische Berechnung (Freitext `{#...}`) | Anwenden / Berechnen (L3) | 1,5 |
| **Q1.3** | Code-Tracing: 2D-FDM 5-Punkt-Stern mit Neumann-Rand | Code-Tracing (Freitext `{#...}`) | Analysieren / Berechnen (L4) | 1,5 |
| **Q1.4** | `WriteableBitmap`: Stride-Berechnung & Speicherlayout | Code-Diagnose (Single-Choice, 4 Optionen) | Analysieren / Debuggen (L4) | 1,0 |
| **Q1.5** | Bild-Diagnostik bei Überschreitung der Stabilitätsgrenze | Phänomen-Diagnose (Single-Choice, 4 Optionen) | Bewerten / Diagnostizieren (L5) | 1,0 |
| **Q1.6** | `unsafe`-Pointer & Little-Endian Kanalordnung in `Bgra32` | Speicheranalyse (Single-Choice, 4 Optionen) | Analysieren (L4) | 1,0 |
| **Q1.7** | Modelltheorie (Stachowiak) & Digitaler Zwilling (Grieves/Kritzinger) | Konzeptverständnis (Multiple-Select, 4 Optionen) | Verstehen / Differenzieren (L2) | 1,0 |
| **Q1.8** | Randbedingungen (Dirichlet vs. Neumann) & Doppelpufferung | Vernetztes Wissen (Multiple-Select, 4 Optionen) | Verstehen / Analysieren (L3) | 1,0 |
| **Gesamt** | **3× Numerisch (5,0 P.) + 3× Single-Choice (3,0 P.) + 2× Multiple-Select (2,0 P.)** | | | **10,0 Pkt.** |

---

## Detaillierte Fragen & Musterlösungen

### Frage 1.1: 2D-FDM-Wärmeleitung & Von-Neumann-Stabilitätsgrenze (Numerisch – 2,0 Punkte)

#### Fragetext
Sie simulieren die instationäre zweidimensionale Wärmeleitung in einer quadratischen Aluminium-Kühlplatte mittels der expliziten Finite-Differenzen-Methode (FDM, 5-Punkt-Laplace-Stern auf einem äquidistanten quadratischen Pixelgitter).

Gegeben sind folgende physikalische und geometrische Parameter:
* Temperaturleitfähigkeit des Werkstoffs: $\alpha = 1{,}25 \cdot 10^{-4}\,\frac{\text{m}^2}{\text{s}}$
* Räumliche Gitterweite in beiden Koordinatenrichtungen: $\Delta x = \Delta y = 2{,}0\,\text{mm}$

Berechnen Sie die **theoretische maximale Zeitschrittweite $\Delta t_{\max}$ in Millisekunden $[\text{ms}]$**, bis zu welcher das explizite zweidimensionale Zeitintegrationsverfahren nach dem Von-Neumann-Stabilitätskriterium numerisch stabil bleibt.  
*(Geben Sie das Ergebnis als Dezimalzahl in Millisekunden ohne Einheit ein, z. B. `12.5`)*

#### Antwortwert
* **Musterlösung:** `8.0` (akzeptierter Toleranzbereich: `7.9` bis `8.1`)

#### Mathematische Herleitung & Didaktik
Für die zweidimensionale Wärmeleitungsgleichung mit explizitem 5-Punkt-Differenzenstern auf einem quadratischen Gitter ($\Delta x = \Delta y$) lautet die dimensionslose Fourier-Zahl (Stabilitätsparameter):
$$s = \frac{\alpha \cdot \Delta t}{\Delta x^2} \le \frac{1}{4} = 0{,}25$$

Umstellen nach der maximal zulässigen Zeitschrittweite $\Delta t_{\max}$ mit Einheitenumrechnung $\Delta x = 2{,}0\,\text{mm} = 2{,}0 \cdot 10^{-3}\,\text{m}$:
$$\Delta t_{\max} = \frac{\Delta x^2}{4 \cdot \alpha} = \frac{(2{,}0 \cdot 10^{-3}\,\text{m})^2}{4 \cdot 1{,}25 \cdot 10^{-4}\,\frac{\text{m}^2}{\text{s}}} = \frac{4{,}0 \cdot 10^{-6}\,\text{m}^2}{5{,}0 \cdot 10^{-4}\,\frac{\text{m}^2}{\text{s}}} = 0{,}008\,\text{s} = 8{,}0\,\text{ms}$$

*Typische Fehlkonzepte:* Wer das eindimensionale Stabilitätskriterium ($s \le 0{,}5$) verwendet, erhält fälschlicherweise $16{,}0\,\text{ms}$. Wer vergisst, Millimeter in Meter umzurechnen, liegt um den Faktor $10^6$ daneben.

---

### Frage 1.2: Explizites Euler-Verfahren: Thermischer Abkühlprozess (Numerisch – 1,5 Punkte)

#### Fragetext
Ein aufgeheizter Temperatursensor kühlt in einem ruhenden Ölbad ab. Die zeitliche Änderung seiner Temperatur $T(t)$ (in $^\circ\text{C}$) folgt dem linearen Differentialgleichungsmodell erster Ordnung:
$$\frac{\mathrm{d}T}{\mathrm{d}t} = -k \cdot (T(t) - T_{\text{Umg}})$$

Gegeben sind folgende Prozessparameter:
* Umgebungstemperatur des Ölbads: $T_{\text{Umg}} = 20{,}0\,^\circ\text{C}$
* Abkühlkonstante: $k = 0{,}5\,\text{s}^{-1}$
* Anfangstemperatur zum Zeitpunkt $t_0 = 0\,\text{s}$: $T_0 = 100{,}0\,^\circ\text{C}$
* Konstante numerische Zeitschrittweite: $\Delta t = 0{,}4\,\text{s}$

Berechnen Sie mit dem **expliziten Euler-Verfahren** die numerische Näherung der Sensortemperatur **$T_2$ in $^\circ\text{C}$ nach exakt zwei Zeitschritten** (also zum Zeitpunkt $t_2 = 0{,}8\,\text{s}$).  
*(Geben Sie den Zahlenwert ohne Einheit ein, z. B. `75.2`)*

#### Antwortwert
* **Musterlösung:** `71.2` (akzeptierter Toleranzbereich: `71.0` bis `71.4`)

#### Mathematische Herleitung & Didaktik
DieIterationsvorschrift des expliziten Euler-Verfahrens lautet $T_{n+1} = T_n + \Delta t \cdot f(T_n)$:
1. **Erster Zeitschritt ($t_0 = 0\,\text{s} \to t_1 = 0{,}4\,\text{s}$):**
   $$\dot{T}_0 = -0{,}5\,\text{s}^{-1} \cdot (100{,}0 - 20{,}0)\,^\circ\text{C} = -40{,}0\,\frac{^\circ\text{C}}{\text{s}}$$
   $$T_1 = 100{,}0 + 0{,}4 \cdot (-40{,}0) = 100{,}0 - 16{,}0 = 84{,}0\,^\circ\text{C}$$
2. **Zweiter Zeitschritt ($t_1 = 0{,}4\,\text{s} \to t_2 = 0{,}8\,\text{s}$):**
   $$\dot{T}_1 = -0{,}5\,\text{s}^{-1} \cdot (84{,}0 - 20{,}0)\,^\circ\text{C} = -32{,}0\,\frac{^\circ\text{C}}{\text{s}}$$
   $$T_2 = 84{,}0 + 0{,}4 \cdot (-32{,}0) = 84{,}0 - 12{,}8 = 71{,}2\,^\circ\text{C}$$

---

### Frage 1.3: Code-Tracing: 2D-FDM 5-Punkt-Stern mit Neumann-Rand (Numerisch – 1,5 Punkte)

#### Fragetext
Gegeben sei folgender C#-Codeausschnitt aus einer 2D-Wärmeleitungssimulation, der einen einzelnen expliziten Zeitschritt für den Gitterknoten $(x=1, y=0)$ am oberen Plattenrand berechnet:

```csharp
double s = 0.20;
double[,] u = new double[3, 3]
{
    { 50.0,  60.0,  70.0 }, // Zeile y = 0 (oberer Rand)
    { 50.0, 100.0,  90.0 }, // Zeile y = 1 (Platteninneres)
    { 50.0,  80.0,  80.0 }  // Zeile y = 2 (unterer Rand)
};

int x = 1, y = 0;
double center = u[y, x];
double left   = u[y, x - 1];
double right  = u[y, x + 1];
double down   = u[y + 1, x];
double up     = (y == 0) ? center : u[y - 1, x]; // Adiabater Neumann-Rand

double uNext = center + s * (left + right + up + down - 4.0 * center);
```

Welchen exakten numerischen Wert hat die Variable `uNext` nach Ausführung dieses Codeblocks?  
*(Geben Sie den Zahlenwert ohne Einheit ein, z. B. `65.0`)*

#### Antwortwert
* **Musterlösung:** `70.0` (akzeptierter Toleranzbereich: `69.9` bis `70.1`)

#### Mathematische Herleitung & Didaktik
Auslesen der Array-Einträge für `y = 0, x = 1`:
* `center = u[0, 1] = 60.0`
* `left   = u[0, 0] = 50.0`
* `right  = u[0, 2] = 70.0`
* `down   = u[1, 1] = 100.0`
* `up     = center  = 60.0` (da `y == 0` wahr ist, Spiegelung für adiabaten Rand $\frac{\partial T}{\partial y} = 0$)

Einsetzen in die Update-Zeile mit `s = 0.20`:
$$\text{uNext} = 60{,}0 + 0{,}20 \cdot (50{,}0 + 70{,}0 + 60{,}0 + 100{,}0 - 4{,}0 \cdot 60{,}0) = 60{,}0 + 0{,}20 \cdot (280{,}0 - 240{,}0) = 60{,}0 + 0{,}20 \cdot 40{,}0 = 70{,}0$$

---

### Frage 1.4: `WriteableBitmap`: Stride-Berechnung & Speicherlayout (Single-Choice – 1,0 Punkte)

#### Fragetext
Ein Entwickler möchte ein Graustufen-Temperaturfeld auf einer WPF `WriteableBitmap` (Breite: $W = 640\,\text{px}$, Höhe: $H = 480\,\text{px}$, Pixelformat: `PixelFormats.Bgra32`) darstellen und schreibt folgenden Code:

```csharp
int width = 640, height = 480;
int stride = width * 3;
byte[] pixelData = new byte[stride * height];

for (int y = 0; y < height; y++)
{
    for (int x = 0; x < width; x++)
    {
        int index = y * stride + x * 4;
        byte val = GetIntensity(x, y);
        pixelData[index + 0] = val;
        pixelData[index + 1] = val;
        pixelData[index + 2] = val;
        pixelData[index + 3] = 255;
    }
}
bitmap.WritePixels(new Int32Rect(0, 0, width, height), pixelData, stride, 0);
```

Beim Ausführen bricht das Programm mit einer `IndexOutOfRangeException` ab. Was ist die exakte technische Ursache dieses Fehlers?

#### Antwortoptionen
* [ ] A) Das Pixelformat `Bgra32` erwartet im Array `pixelData` zwingend normalisierte `float`-Gleitkommawerte zwischen $0{,}0$ und $1{,}0$ statt ganzzahliger `byte`-Werte, wodurch die Typkonvertierung im Speicher fehlschlägt.
* [x] B) Das Pixelformat `Bgra32` belegt $4\,\text{Bytes}$ pro Pixel, während `stride` fehlerhaft mit `width * 3` berechnet wurde; dadurch ist das Array zu klein dimensioniert und der Zugriff `y * stride + x * 4` überschreitet die Array-Grenze.
* [ ] C) Die geschachtelte Schleifenreihenfolge (`y` außen, `x` innen) verletzt die Column-Major-Speicherarchitektur von WPF-Bitmaps, sodass der Spaltenindex `x` bereits in der ersten Bildzeile über den Zeilenpuffer hinausläuft.
* [ ] D) Die Methode `WritePixels` erfordert bei einer Auflösung von $640 \times 480$ Pixeln zwingend eine auf Potenzen von zwei aufgerundete Texturbreite ($1024\,\text{px}$), da der Grafiktreiber sonst einen Pufferüberlauf auslöst.

#### Didaktische Begründung
* *Option B ist korrekt:* `Bgra32` nutzt 32 Bit = 4 Bytes pro Pixel. Für $640\,\text{px}$ Breite beträgt der Mindest-Stride $640 \times 4 = 2560\,\text{Bytes}$. Mit `stride = width * 3 = 1920` werden nur $1920 \times 480$ Bytes reserviert, während die Schleife über `x * 4` bis zu $2560\,\text{Bytes}$ pro Zeile adressiert.
* *Distraktoren A, C, D:* Repräsentieren typische Fehlannahmen über Float-Farbräume (ScRGB vs. Bgra32), Speicherordnung (Row-Major vs. Column-Major) und Power-of-Two-Padding moderner GPUs.

---

### Frage 1.5: Bild-Diagnostik bei Überschreitung der Stabilitätsgrenze (Single-Choice – 1,0 Punkte)

#### Fragetext
In einer zweidimensionalen Wärmeleitungssimulation (expliziter 5-Punkt-Stern auf einem äquidistanten Gitter mit $\Delta x = \Delta y = 2{,}0\,\text{mm}$ und $\alpha = 1{,}25 \cdot 10^{-4}\,\text{m}^2/\text{s}$) erhöht ein Ingenieur die Zeitschrittweite $\Delta t$ von $6{,}0\,\text{ms}$ auf $12{,}0\,\text{ms}$, um die Berechnung zu beschleunigen.

Welches spezifische numerische und optische Phänomen tritt in der animierten Heatmap unmittelbar nach wenigen Zeitschritten auf?

#### Antwortoptionen
* [ ] A) Durch die größere Zeitschrittweite nimmt die numerische künstliche Viskosität stark zu, sodass scharfe Temperaturgradienten übermäßig schnell weichgezeichnet werden, die Lösung aber beschränkt bleibt.
* [x] B) Das zentrale Eigengewicht des 5-Punkt-Sterns wird negativ, wodurch benachbarte Gitterknoten in jedem Zeitschritt ihr Vorzeichen alternierend umkehren und als Schachbrettmuster exponentiell gegen $\pm\infty$ (`NaN`) divergieren.
* [ ] C) Die explizite Zeitintegration verliert ihre Konsistenz erster Ordnung und friert den letzten gültigen Temperaturzustand dauerhaft ein, weil die Differenzenquotienten zu Null unterlaufen (Underflow).
* [ ] D) Es entsteht ein systematischer Phasenfehler entlang der Hauptdiagonalen des Gitters, durch den sich die Wärmewelle elliptisch statt kreisförmig ausbreitet, ohne dass die Temperaturwerte den Anfangsbereich verlassen.

#### Didaktische Begründung
* *Option B ist korrekt:* Bei $\Delta t = 12\,\text{ms}$ beträgt die Fourier-Zahl $s = \frac{1{,}25 \cdot 10^{-4} \cdot 0{,}012}{(2 \cdot 10^{-3})^2} = 0{,}375 > 0{,}25$. In der Update-Gleichung $T_{i,j}^{n+1} = (1 - 4s) T_{i,j}^n + s \sum T_{\text{Nachbarn}}$ wird der Vorfaktor $(1 - 4s) = -0{,}5 < 0$. Ein heißer Punkt wird im nächsten Schritt kälter als seine Nachbarn und schaukelt sich in einem hochfrequenten Schachbrettmuster (*Checkerboard Instability*) unbegrenzt auf.

---

### Frage 1.6: `unsafe`-Pointer & Little-Endian Kanalordnung in `Bgra32` (Single-Choice – 1,0 Punkte)

#### Fragetext
Für maximale Render-Performance schreibt eine Simulationsschleife über unmanaged C#-Pointer direkt in den Back-Buffer einer `WriteableBitmap` (`PixelFormats.Bgra32`):

```csharp
bitmap.Lock();
unsafe
{
    byte* pBackBuffer = (byte*)bitmap.BackBuffer;
    int stride = bitmap.BackBufferStride;
    for (int y = 0; y < height; y++)
    {
        byte* row = pBackBuffer + (y * stride);
        for (int x = 0; x < width; x++)
        {
            byte heat = GetHeatByte(x, y); // 0 = kalt (0 °C), 255 = heiß (100 °C)
            row[x * 4 + 0] = heat;
            row[x * 4 + 1] = 0;
            row[x * 4 + 2] = (byte)(255 - heat);
            row[x * 4 + 3] = 255;
        }
    }
}
bitmap.AddDirtyRect(new Int32Rect(0, 0, width, height));
bitmap.Unlock();
```

Der Entwickler wollte heiße Zonen (`heat = 255`) tiefrot und kalte Zonen (`heat = 0`) tiefblau einfärben. Welches Ergebnis zeigt sich tatsächlich auf dem Bildschirm und warum?

#### Antwortoptionen
* [x] A) Die Farbdarstellung ist exakt invertiert (heiße Zonen erscheinen blau, kalte Zonen rot), weil `Bgra32` im Speicher an Byte-Offset `0` den Blau-Kanal und erst an Byte-Offset `2` den Rot-Kanal ablegt.
* [ ] B) Das gesamte Bild bleibt transparent (Hintergrund scheint durch), weil der Alpha-Kanal in `Bgra32` an Byte-Offset `0` liegt und für kalte Regionen mit `heat = 0` vollständig durchsichtig geschaltet wird.
* [ ] C) Die Farben werden wie gewünscht dargestellt (heiß = rot, kalt = blau), weil die Methode `AddDirtyRect` vor der Übergabe an DirectX eine automatische Big-Endian-Konvertierung von RGB nach BGRA durchführt.
* [ ] D) Jede zweite Bildspalte weist einen Grünstich auf, weil die Zeigerarithmetik `byte* row = pBackBuffer + (y * stride)` ohne expliziten Cast auf `uint*` um jeweils ein Byte pro Pixelzeile verrutscht.

#### Didaktische Begründung
* *Option A ist korrekt:* Das Format `Bgra32` legt die 4 Bytes pro Pixel in der Reihenfolge **B**lue (Offset 0), **G**reen (Offset 1), **R**ed (Offset 2), **A**lpha (Offset 3) im Speicher ab. Da `heat` auf Offset 0 geschrieben wird, leuchten heiße Bereiche blau statt rot.

---

### Frage 1.7: Modelltheorie (Stachowiak) & Digitaler Zwilling (Grieves/Kritzinger) (Multiple-Select – 1,0 Punkte)

#### Fragetext
Welche der folgenden Aussagen zur allgemeinen Modelltheorie nach Herbert Stachowiak sowie zur Klassifikation des Digitalen Zwillings nach Michael Grieves und Werner Kritzinger et al. sind **fachlich zutreffend**?  
*(Wählen Sie alle richtigen Aussagen; 2 bis 3 Antworten sind korrekt)*

#### Antwortoptionen
* [x] A) Nach dem Verkürzungsmerkmal von Stachowiak erfasst ein Modell niemals alle Attribute des realen Originals, sondern abstrahiert gezielt auf diejenigen Eigenschaften, die für den jeweiligen Untersuchungszweck relevant sind.
* [x] B) Nach Kritzinger et al. unterscheidet sich ein Digitaler Zwilling (*Digital Twin*) vom Digitalen Schatten (*Digital Shadow*) dadurch, dass ein automatisierter bidirektionaler Datenfluss zwischen physischem und digitalem Objekt besteht.
* [ ] C) Ein hochdetailliertes 3D-CAD-Baugruppenmodell inklusive kinematischer Zwangsbedingungen erfüllt nach Kritzinger et al. bereits ohne automatisierte Sensordaten-Kopplung zur realen Anlage alle Kriterien eines *Digital Shadow*.
* [ ] D) Nach dem pragmatischen Merkmal von Stachowiak ist die Gültigkeit eines mathematischen Simulationsmodells eine rein objektive Eigenschaft des Originals und vollkommen unabhängig vom menschlichen Nutzer und dem Einsatzzweck.

#### Didaktische Begründung
* *A und B sind korrekt (+50 % je Option).*
* *C ist falsch (-50 %):* Ohne automatisierten Datenfluss vom physischen Objekt zum digitalen Modell handelt es sich nach Kritzinger lediglich um ein *Digital Model*, noch nicht um einen *Digital Shadow* (automatischer unidirektionaler Datenfluss Physisch $\to$ Digital).
* *D ist falsch (-50 %):* Das pragmatische Merkmal besagt gerade das Gegenteil: Modelle sind ihren Originalen nicht per se zugeordnet, sondern erfüllen ihre Ersetzungsfunktion nur *für bestimmte Subjekte (Nutzer)*, *innerhalb bestimmter Zeitintervalle* und *hinsichtlich bestimmter gedanklicher oder tatsächlicher Operationen (Zweck)*.

---

### Frage 1.8: Randbedingungen (Dirichlet vs. Neumann) & Doppelpufferung (Multiple-Select – 1,0 Punkte)

#### Fragetext
Bei der Implementierung der zweidimensionalen instationären Wärmeleitung auf einem diskreten Pixelgitter müssen thermische Randbedingungen und Speicherstrukturen korrekt gewählt werden. Welche der folgenden Aussagen sind **physikalisch und programmiertechnisch zutreffend**?  
*(Wählen Sie alle richtigen Aussagen; 2 bis 3 Antworten sind korrekt)*

#### Antwortoptionen
* [x] A) Eine ideale thermische Wärmeisolierung am Plattenrand (adiabater Rand ohne Wärmefluss über die Grenze) wird mathematisch durch eine homogene **Neumann-Randbedingung** ($\frac{\partial T}{\partial n} = 0$) modelliert, indem der Randwert auf den benachbarten Geisterknoten gespiegelt wird.
* [x] B) Ein aktives Heizelement, das einen Teilbereich der Platte dauerhaft auf einer fest vorgegebenen Solltemperatur von $80\,^\circ\text{C}$ hält, entspricht einer **Dirichlet-Randbedingung** (Vorgabe des Funktionswerts selbst) und muss nach jedem Zeitschritt fest eingeprägt werden.
* [ ] C) Wenn beim expliziten 5-Punkt-Stern aus Speicherplatzgründen auf ein zweites Array (`uNext`) verzichtet und direkt in-place im selben Array überschrieben wird, bleibt das Verfahren ein symmetrisches explizites Verfahren mit identischer Stabilitätsgrenze $s \le 0{,}25$.
* [ ] D) Bei einer homogenen Dirichlet-Randbedingung ($T_{\text{Rand}} = 0\,^\circ\text{C}$) ist der Wärmestrom über den Plattenrand zu jedem Zeitpunkt exakt gleich Null, sodass die gesamte thermische Energie im Inneren der Platte konstant erhalten bleibt.

#### Didaktische Begründung
* *A und B sind korrekt (+50 % je Option):* Neumann gibt die Normalenableitung (Wärmestromdichte $\dot{q} = -\lambda \frac{\partial T}{\partial n}$) vor; Dirichlet gibt das Temperaturniveau $T$ direkt vor.
* *C ist falsch (-50 %):* Überschreibt man `u[y, x]` in-place während der Schleife, greifen die nachfolgenden Gitterpunkte $(x+1, y)$ und $(x, y+1)$ bereits auf Werte des neuen Zeitschritts $t_{n+1}$ zu (Gauß-Seidel-artiger Effekt), was die Symmetrie der Wärmediffusion bricht und zu einer unphysikalischen Vorzugsrichtung (Drift) führt.
* *D ist falsch (-50 %):* Eine feste Randtemperatur von $0\,^\circ\text{C}$ (Dirichlet) wirkt als Wärmesenke; solange das Platteninnere wärmer ist ($\frac{\partial T}{\partial n} \neq 0$), fließt kontinuierlich Wärme über den Rand ab.
