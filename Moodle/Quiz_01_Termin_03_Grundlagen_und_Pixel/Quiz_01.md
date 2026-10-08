# Moodle-Quiz 1 (Termin 2 / 3): Grundlagen, Modellbildung & 2D-Pixelgrafik

**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  
**Studiengang:** Bachelor Automatisierungstechnik (FH Oberösterreich, Campus Wels)  
**Prüfungszeitpunkt:** Beginn Termin 3 (bzw. Ende Termin 2)  
**Bearbeitungszeit:** 15 Minuten  
**Säule:** Säule 1 (Theoretische & numerische Grundlagen, Gewicht: 7,5 % der Gesamtnote)  
**Prüfungsmodus:** Präsenz im EDV-Labor / Safe Exam Browser in Moodle  
**Zulässige Hilfsmittel:** Taschenrechner (nicht-programmierbar) oder Windows-Rechner; keine LLM-Nutzung / Closed-Book

---

## Didaktische Zielsetzung & Einbettung

Dieses Quiz bildet den ersten summativen Meilenstein der Lehrveranstaltung. Es überprüft das Fundament der technischen Modellierung, das hardwarenahe Speicherverständnis von Rasterbildern in C#/WPF sowie die mathematische Stabilität expliziter Finite-Differenzen-Verfahren (FDM).

### Stoffabgrenzung & Tabu-Grenzen
* **Inhalte:** Kapitel 00 (Prolog), Kapitel 01 (Modellbegriff, Taxonomie, Digitaler Zwilling nach Grieves & Stachowiak), Kapitel 02 (2D-Pixelgrafik, Bitmap-Speicher, Stride, Pixelformat `Bgra32`, unsafe-Pointer, 2D-Wärmeleitungsgleichung mit Laplace-5-Punkt-Stern, CFL- bzw. Von-Neumann-Stabilitätsgrenze $s \le 0{,}25$, Randbedingungen Dirichlet vs. Neumann).
* **Strikte Tabu-Grenzen:**
  - ❌ **KEINE** 2D-Vektorgrafiken oder Matrizentransformationen (Kapitel 03)
  - ❌ **KEIN** ScottPlot / Telemetrie (Kapitel 04)
  - ❌ **KEINE** 3D-Computergrafik / OpenGL (Kapitel 05)
  - ❌ **KEIN** Multithreading / TPL (Kapitel 06)
  - ❌ **KEINE** Steifigkeitsmatrizen / Cholesky-Zerlegungen (Kapitel 07)
  - ❌ **KEINE** ODE-Solver wie RK4 oder Heun (Kapitel 08)

---

## Fragenübersicht

| Nr. | Thema | Fragentyp | Bloom-Taxonomie | Punkte |
| :---: | :--- | :--- | :--- | :---: |
| **Q1.1** | FDM-Wärmeleitung & CFL-Stabilitätsgrenze | Numerische Berechnung | Anwenden / Berechnen (L3) | 2,0 |
| **Q1.2** | Stride & Adressberechnung in `WriteableBitmap` | Code-Mutation (Single-Choice) | Analysieren / Debuggen (L4) | 1,5 |
| **Q1.3** | Bild-Diagnostik: Überbeanspruchung des CFL-Kriteriums | Phänomenologische Diagnose (Single-Choice) | Bewerten / Diagnostizieren (L5) | 1,5 |
| **Q1.4** | Modelltheorie (Stachowiak) & Digitaler Zwilling (Grieves) | Konzeptverständnis (Multiple-Select) | Verstehen / Differenzieren (L2) | 1,5 |
| **Q1.5** | Unsafe-Pointer & BGRA32 Farbkanalordnung | Speicheranalyse & Code-Logik (Single-Choice) | Analysieren (L4) | 1,5 |
| **Gesamt** | | | | **8,0 Pkt.** |

---

## Detaillierte Fragen & Musterlösungen

### Frage 1.1: FDM-Wärmeleitung & CFL-Stabilitätsgrenze (Berechnung)

#### Fragetext
Sie simulieren die instationäre 2D-Wärmeleitung in einer Aluminium-Kühlplatte mittels Finite-Differenzen-Methode (FDM, expliziter 5-Punkt-Differenzenstern auf einem äquidistanten quadratischen Pixelgitter). Die parabolische Differentialgleichung lautet:
$$\frac{\partial T}{\partial t} = \alpha \left( \frac{\partial^2 T}{\partial x^2} + \frac{\partial^2 T}{\partial y^2} \right)$$

Gegeben sind folgende Parameter:
* Temperaturleitfähigkeit des Werkstoffs: $\alpha = 1{,}25 \cdot 10^{-4}\,\frac{\text{m}^2}{\text{s}}$
* Räumliche Gitterweite (Pixelabstand): $\Delta x = \Delta y = 2{,}0\,\text{mm} = 2{,}0 \cdot 10^{-3}\,\text{m}$

Berechnen Sie die **theoretische maximale Zeitschrittweite $\Delta t_{\max}$** (Von-Neumann- / CFL-Stabilitätsgrenze) in **Millisekunden [ms]**, bis zu welcher das explizite Euler-FDM-Verfahren numerisch stabil bleibt.  
*(Geben Sie das Ergebnis als Zahl in Millisekunden [ms] ohne Einheit an, z. B. `12.5`)*

#### Antwortwert
* **Musterlösung:** `8.0` (akzeptierter Toleranzbereich: `7.9` bis `8.1`)

#### Mathematische Herleitung & Didaktik
Aus der Von-Neumann-Stabilitätsanalyse für das 2D-Diffusionsproblem mit dem expliziten 5-Punkt-Stern folgt:
$$s = \frac{\alpha \cdot \Delta t}{\Delta x^2} \le \frac{1}{4} = 0{,}25$$

Umstellen nach der maximalen Zeitschrittweite $\Delta t_{\max}$:
$$\Delta t_{\max} = \frac{\Delta x^2}{4 \alpha} = \frac{(2{,}0 \cdot 10^{-3}\,\text{m})^2}{4 \cdot 1{,}25 \cdot 10^{-4}\,\frac{\text{m}^2}{\text{s}}} = \frac{4{,}0 \cdot 10^{-6}\,\text{m}^2}{5{,}0 \cdot 10^{-4}\,\frac{\text{m}^2}{\text{s}}} = 0{,}008\,\text{s} = 8{,}0\,\text{ms}$$

*Didaktischer Hinweis:* Wer die Dimension mm nicht in m umrechnet, erhält $8000\,\text{s}$ (Faktor $10^6$). Wer den 1D-Faktor $1/2$ statt des 2D-Faktors $1/4$ verwendet, erhält fälschlicherweise $16{,}0\,\text{ms}$.

---

### Frage 1.2: Visuelle Fehlerdiagnose & Stride-Berechnung in `WriteableBitmap` (Code-Mutation)

#### Fragetext
Ein Entwickler möchte ein Graustufen-Simulationsfeld auf einer WPF `WriteableBitmap` (Breite: $W = 640\,\text{px}$, Höhe: $H = 480\,\text{px}$, Pixelformat: `PixelFormats.Bgra32`) darstellen. Der C#-Code lautet:

```csharp
int width = 640;
int height = 480;
int stride = width * 3; // Bildbreite mal Kanäle
byte[] pixelData = new byte[stride * height];

for (int y = 0; y < height; y++)
{
    for (int x = 0; x < width; x++)
    {
        int index = y * stride + x * 4;
        byte intensity = GetSimulationIntensity(x, y);
        pixelData[index + 0] = intensity; // Blau
        pixelData[index + 1] = intensity; // Grün
        pixelData[index + 2] = intensity; // Rot
        pixelData[index + 3] = 255;       // Alpha
    }
}
bitmap.WritePixels(new Int32Rect(0, 0, width, height), pixelData, stride, 0);
```

Beim Ausführen stürzt das Programm ab bzw. zeigt ein diagonal verzerrtes Bild. Was ist die **exakte Ursache** dieses Fehlers?

#### Antwortoptionen
* [ ] A) In WPF müssen Farbbilder im Format `Bgra32` zwingend mit `float`-Werten zwischen $0{,}0$ und $1{,}0$ befüllt werden; `byte` wirft eine `ArgumentException`.
* [x] B) Das Format `Bgra32` belegt 4 Bytes pro Pixel (32 Bit). Der Stride wurde fehlerhaft mit `width * 3` initialisiert. Dadurch verschiebt sich jede Zeile im Array um $W$ Bytes, und bei $x = width - 1$ greift `index + 3` über die allokierte Array-Grenze hinaus (`IndexOutOfRangeException`).
* [ ] C) Die Methode `WritePixels` darf ausschließlich aus einem Shader im Grafikspeicher aufgerufen werden.
* [ ] D) Die Schleifenordnung ($y$ außen, $x$ innen) verletzt die Row-Major-Konvention von WPF und führt zu einem Speicherzugriffsfehler.

#### Didaktische Begründung & Distraktoren
* *Option B ist korrekt:* $640 \times 4 = 2560\,\text{Bytes/Zeile}$. Bei `stride = width * 3` werden nur 1920 Bytes pro Zeile reserviert, wodurch Zeilen diagonal kollabieren und das Array zu klein ist ($1920 \times 480 < 2560 \times 480$).
* *Distraktor A:* WPF `Bgra32` verwendet exakt 8 Bit (1 Byte) pro Farbkanal, nicht float.
* *Distraktor C:* `WritePixels` ist eine Standard-CPU-WPF-Methode.
* *Distraktor D:* Zeilenweise Iteration ($y$ außen, $x$ innen) ist optimal für Row-Major-Speicher.

---

### Frage 1.3: Bild-Diagnostik: Überbeanspruchung des CFL-Kriteriums (Stabilität)

#### Fragetext
Ein Simulationsingenieur erhöht in der 2D-Wärmeleitungssimulation die Zeitschrittweite $\Delta t$ von $6\,\text{ms}$ auf $12\,\text{ms}$, während die Gitterauflösung unverändert bleibt ($\Delta x = 2\,\text{mm}$, $\alpha = 1{,}25 \cdot 10^{-4}\,\text{m}^2/\text{s}$, Stabilitätsgrenze $\Delta t_{\max} = 8\,\text{ms}$). Dadurch wird der Stabilitätsparameter:
$$s = \frac{\alpha \cdot \Delta t}{\Delta x^2} = \frac{1{,}25 \cdot 10^{-4} \cdot 0{,}012}{(2 \cdot 10^{-3})^2} = 0{,}375 > 0{,}25$$

Welches **spezifische optische und numerische Phänomen** tritt in der animierten Heatmap unmittelbar auf?

#### Antwortoptionen
* [ ] A) Das System geht harmonisch in den thermischen Gleichgewichtszustand über, jedoch läuft die Simulation in Zeitlupe ab.
* [x] B) Es entsteht eine räumlich alternierende **Schachbrettmuster-Instabilität (Checkerboard-Artefakt)**: Da das zentrale Gewicht $(1 - 4s) = 1 - 1{,}5 = -0{,}5$ negativ wird, kippen benachbarte Pixel periodisch zwischen extremen Werten hin und her, explodieren exponentiell zu $\pm\infty$ bzw. führen zu `NaN`/Überlauf in den Pixelwerten.
* [ ] C) Die Wärmeleitung kehrt ihre Richtung um, sodass Wärme von kalten Zonen zu heißen Zonen fließt, das Bild bleibt jedoch glatt und stetig.
* [ ] D) Es tritt der stochastische Tunneling-Effekt auf: Wärmepakete durchdringen die Dirichlet-Randbedingung ohne Temperaturabgabe.

#### Didaktische Begründung
Die Rekursionsformel des expliziten 5-Punkt-Sterns lautet:
$$T_{i,j}^{n+1} = (1 - 4s) T_{i,j}^n + s \sum T_{\text{Nachbarn}}$$
Ist $s > 0{,}25$, wird $(1 - 4s) < 0$. Die konvexe Mittelwertbildung bricht zusammen, und ein lokaler Peak kehrt im nächsten Schritt mit höherer Amplitude sein Vorzeichen um. Dies führt zur klassischen hochfrequenten Gitterinstabilität (Schachbrettmuster).

---

### Frage 1.4: Modelltheorie (Stachowiak) & Digitaler Zwilling (Grieves) (Multiple-Select)

#### Fragetext
Welche der folgenden Aussagen zur allgemeinen Modelltheorie nach Herbert Stachowiak und zur industriellen Definition des Digitalen Zwillings nach Michael Grieves sind **fachlich zutreffend**?  
*(Wählen Sie alle richtigen Aussagen)*

#### Antwortoptionen
* [x] A) **Abbildungsmerkmal:** Ein Modell ist stets ein Repräsentant oder ein Abbild eines natürlichen oder künstlichen Originals.
* [x] B) **Verkürzungsmerkmal:** Ein Modell erfasst im Allgemeinen nicht alle Attribute des Originals, sondern nur diejenigen, die dem Modellierer relevant erscheinen.
* [x] C) **Pragmatisches Merkmal:** Ein Modell ist einem Original nicht per se zugeordnet; es erfüllt eine Ersetzungsfunktion für bestimmte Subjekte, innerhalb bestimmter Zeitintervalle und unter Einschränkung auf bestimmte gedankliche oder tatsächliche Operationen.
* [x] D) Nach Michael Grieves besteht ein vollständiger **Digitaler Zwilling** aus drei Elementen: Dem physischen Produkt im realen Raum, dem virtuellen Produkt im virtuellen Raum und der **bidirektionalen Datenverbindung** zwischen beiden.
* [ ] E) Eine statische 3D-CAD-Baugruppe ohne dynamisches Modell, ohne Schnittstellen und ohne sensorische Rückkopplung erfüllt bereits alle Kriterien eines industriellen Digitalen Zwillings nach Grieves.

#### Didaktische Begründung
* *A, B, C sind die drei klassischen Hauptmerkmale nach Stachowiak (1973).*
* *D ist die Ur-Definition des Digitalen Zwillings nach Grieves (2002/2014).*
* *E ist ein populärer Irrtum:* Ein reines CAD-Modell ist lediglich ein digitales Modell (*Digital Model*), besitzt aber keinen automatisierten Datenfluss zum physischen System.

---

### Frage 1.5: Unsafe-Pointer & BGRA32 Farbkanalordnung in WPF

#### Fragetext
Für maximale Render-Geschwindigkeit greift eine Simulationsschleife direkt über unmanaged C#-Pointer auf den Back-Buffer einer `WriteableBitmap` zu:

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
            byte heat = GetTemperatureByte(x, y); // 0 = kalt (0°C), 255 = heiß (100°C)
            
            // Entwickler schreibt:
            row[x * 4 + 0] = heat;         // Offset 0
            row[x * 4 + 1] = 0;            // Offset 1
            row[x * 4 + 2] = (byte)(255 - heat); // Offset 2
            row[x * 4 + 3] = 255;          // Offset 3
        }
    }
}
bitmap.AddDirtyRect(new Int32Rect(0, 0, width, height));
bitmap.Unlock();
```

Der Entwickler beabsichtigte, dass heißes Metall **Rot** ($R=255, B=0$) und kaltes Metall **Blau** ($B=255, R=0$) dargestellt wird.  
Welche visuelle Darstellung erscheint stattdessen auf dem Monitor und warum?

#### Antwortoptionen
* [x] A) Die Farben sind vertauscht: Da das Format `Bgra32` an Offset 0 den Blau-Kanal und an Offset 2 den Rot-Kanal speichert, erscheinen heiße Zonen (`heat = 255`) tiefblau und kalte Zonen intensiv rot.
* [ ] B) Das Bild bleibt vollständig schwarz, da der Alphakanal an Offset 3 mit `255` vollkommen transparent geschaltet wird.
* [ ] C) Das Programm wirft eine `AccessViolationException`, weil `bitmap.Lock()` Pointern keinen Zugriff auf geradzahlige Zeilen gestattet.
* [ ] D) Das Bild wird korrekt rot dargestellt, weil der Windows-Grafiktreiber interne Konvertierungen von RGB nach BGR automatisch vornimmt.

#### Didaktische Begründung
* *A ist korrekt:* In Windows und DirectX ist `Bgra32` Little-Endian organisiert: Byte 0 = Blue, Byte 1 = Green, Byte 2 = Red, Byte 3 = Alpha. Setzt man an Byte 0 `heat = 255` und an Byte 2 `255 - heat = 0`, leuchtet der blaue Subpixel voll auf.
