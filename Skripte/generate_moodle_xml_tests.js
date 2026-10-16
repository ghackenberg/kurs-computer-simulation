const fs = require('fs');
const path = require('path');

// ------------------------------------------------------------------------------
// Definition aller 10 Tests für Termin 03 (Kapitel 00, 01, 02)
// Tests 01 bis 03: Vorbereitungstests (für Studierende in Moodle freigegeben)
// Tests 04 bis 10: Gewertete Prüfungstests (1 wird am Termin 3 zufällig gewählt)
// Jedes Quiz enthält 5 Fragen:
// 1. Berechnung: CFL / Von-Neumann Stabilitätsgrenze (FDM-Diffusion)
// 2. Code-Mutation & Debugging: Speicherarchitektur, Stride, Buffer & Pointer in C#
// 3. Phänomenologische Diagnose: Stabilität, Fehler-Artefakte & Randbedingungen
// 4. Wissenschaftliche Modelltheorie & Digitaler Zwilling (Stachowiak, Grieves, Box)
// 5. Hardwarenahe Architektur & Performance: Farbmodelle (Bgra32), Little-Endian, WPF
// ------------------------------------------------------------------------------

const testsData = [
  // ============================================================================
  // TEST 01 (Vorbereitung 1)
  // ============================================================================
  {
    id: "Test_01_Vorbereitung",
    title: "Test 01 (Vorbereitung) – Grundlagen, 2D-Pixel & FDM",
    category: "$course$/Quiz_01_Termin_03/Test_01_Vorbereitung",
    isPractice: true,
    questions: [
      {
        id: "T01_Q1_CFL_Berechnung_Aluminium",
        title: "T01.Q1: FDM-Wärmeleitung & CFL-Stabilitätsgrenze (Aluminium)",
        text: `<p>Sie simulieren die 2D-Wärmeleitung in einer Aluminium-Kühlplatte mittels Finite-Differenzen-Methode (FDM, expliziter 5-Punkt-Differenzenstern auf einem quadratischen Pixelgitter). Die zugrundeliegende parabolische Differentialgleichung lautet:</p>
<p>$$\\frac{\\partial T}{\\partial t} = \\alpha \\left( \\frac{\\partial^2 T}{\\partial x^2} + \\frac{\\partial^2 T}{\\partial y^2} \\right)$$</p>
<p>Gegeben sind folgende Parameter:</p>
<ul>
  <li>Temperaturleitfähigkeit von Aluminium: \\(\\alpha = 1{,}25 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}\\)</li>
  <li>Räumliche Gitterweite (Pixelabstand): \\(\\Delta x = \\Delta y = 2{,}0\\,\\text{mm} = 2{,}0 \\cdot 10^{-3}\\,\\text{m}\\)</li>
</ul>
<p>Wie groß ist die theoretische <strong>maximale Zeitschrittweite \\(\\Delta t_{\\max}\\)</strong> (Von-Neumann- / CFL-Stabilitätsgrenze), bis zu welcher das explizite 2D-FDM-Verfahren numerisch stabil bleibt?</p>`,
        generalFeedback: `<p>Die Stabilitätsbedingung für die 2D-Diffusionsgleichung beim expliziten 5-Punkt-Stern lautet:</p>
<p>$$s = \\frac{\\alpha \\Delta t}{\\Delta x^2} \\le \\frac{1}{4} = 0{,}25 \\implies \\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha}$$</p>
<p>Einsetzen der Zahlenwerte:</p>
<p>$$\\Delta t_{\\max} = \\frac{(2{,}0 \\cdot 10^{-3}\\,\\text{m})^2}{4 \\cdot 1{,}25 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}} = \\frac{4{,}0 \\cdot 10^{-6}}{5{,}0 \\cdot 10^{-4}}\\,\\text{s} = 0{,}008\\,\\text{s} = 8{,}0\\,\\text{ms}$$</p>`,
        answers: [
          {
            fraction: 100,
            text: "\\(\\Delta t_{\\max} = 8{,}0\\,\\text{ms}\\)",
            feedback: "Exakt! Aus \\(s = \\alpha \\Delta t / \\Delta x^2 \\le 0{,}25\\) folgt \\(\\Delta t_{\\max} = (2\\cdot 10^{-3})^2 / (4 \\cdot 1{,}25 \\cdot 10^{-4})\\,\\text{s} = 8{,}0\\,\\text{ms}\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} = 16{,}0\\,\\text{ms}\\)",
            feedback: "Falsch. Dies entspricht der 1D-Stabilitätsgrenze \\(s \\le 0{,}5\\). Im 2D-Raum gibt es 4 Nachbarn, daher gilt \\(s \\le 0{,}25\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} = 2{,}0\\,\\text{ms}\\)",
            feedback: "Falsch. Hier wurde versehentlich durch 16 statt durch 4 geteilt."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} = 8000\\,\\text{ms}\\)",
            feedback: "Falsch. Hier wurde vergessen, die Millimeter \\(\\Delta x\\) bei der Quadrierung in Meter umzurechnen (Faktor \\(10^{-6}\\))."
          }
        ]
      },
      {
        id: "T01_Q2_Code_Stride_Fehler",
        title: "T01.Q2: Code-Analyse: Stride & Speicherallokation in WriteableBitmap",
        text: `<p>Ein Entwickler implementiert eine Wärmebild-Visualisierung in WPF mittels <code>WriteableBitmap</code> im Format <code>PixelFormats.Bgra32</code> (Breite: \\(W = 640\\), Höhe: \\(H = 480\\)):</p>
<pre><code class="language-csharp">int width = 640;
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
bitmap.WritePixels(new Int32Rect(0, 0, width, height), pixelData, stride, 0);</code></pre>
<p>Beim Programmstart bricht die Anwendung mit einer <code>IndexOutOfRangeException</code> ab bzw. zeigt ein zerrissenes Bild. Was ist die <strong>exakte Fehlerursache</strong>?</p>`,
        generalFeedback: `<p>Im Pixelformat <code>Bgra32</code> belegt jedes Pixel 4 Bytes (Blue, Green, Red, Alpha). Eine Zeile belegt daher \\(640 \\times 4 = 2560\\) Bytes. Wird der Stride fälschlich mit <code>width * 3</code> (1920 Bytes) berechnet, ist das Array um 25% zu klein und jede Zeile greift um \\(x \\times 4\\) über die berechnete Zeilenlänge hinaus.</p>`,
        answers: [
          {
            fraction: 100,
            text: "<code>Bgra32</code> belegt 4 Bytes pro Pixel (32 Bit). Der Stride muss zwingend <code>width * 4</code> betragen; bei <code>width * 3</code> ist das Array zu klein und <code>index + 3</code> greift über das Array-Ende hinaus.",
            feedback: "Richtig! Bgra32 besitzt 4 Farbkanäle à 8 Bit = 4 Bytes pro Pixel."
          },
          {
            fraction: 0,
            text: "In WPF müssen Farbbilder im Format <code>Bgra32</code> zwingend mit <code>float</code>-Werten zwischen 0.0 und 1.0 befüllt werden; <code>byte</code> wirft eine ArgumentException.",
            feedback: "Falsch. Bgra32 erwartet ganzzahlige Bytes von 0 bis 255."
          },
          {
            fraction: 0,
            text: "Die Methode <code>WritePixels</code> darf nur direkt aus einem GPU-Pixel-Shader aufgerufen werden.",
            feedback: "Falsch. WritePixels ist eine reguläre CPU-Methode des WPF-Frameworks."
          },
          {
            fraction: 0,
            text: "Die Schleifenordnung (y außen, x innen) verletzt die Speicherordnung und führt zum Absturz.",
            feedback: "Falsch. Die Schleifenordnung (y außen, x innen) entspricht exakt dem Row-Major-Muster des Bildspeichers."
          }
        ]
      },
      {
        id: "T01_Q3_Diagnostik_Schachbrett",
        title: "T01.Q3: Fehlerdiagnostik: Überschreitung der CFL-Grenze",
        text: `<p>Ein Simulationsingenieur erhöht in der 2D-Wärmeleitungssimulation die Zeitschrittweite \\(\\Delta t\\) von \\(6\\,\\text{ms}\\) auf \\(12\\,\\text{ms}\\), während die Gitterauflösung unverändert bleibt (\\(\\Delta x = 2\\,\\text{mm}\\), \\(\\alpha = 1{,}25 \\cdot 10^{-4}\\,\\text{m}^2/\\text{s}\\), Stabilitätsgrenze \\(\\Delta t_{\\max} = 8\\,\\text{ms}\\)). Dadurch steigt der Stabilitätsfaktor auf:</p>
<p>$$s = \\frac{\\alpha \\Delta t}{\\Delta x^2} = 0{,}375 > 0{,}25$$</p>
<p>Welches <strong>spezifische visuelle und numerische Phänomen</strong> tritt in der Heatmap unmittelbar auf?</p>`,
        generalFeedback: `<p>Die FDM-Gleichung lautet \\(T_{i,j}^{n+1} = (1 - 4s) T_{i,j}^n + s \\sum T_{\\text{Nachbarn}}\\). Ist \\(s > 0{,}25\\), wird das zentrale Gewicht \\((1 - 4s)\\) negativ. Dadurch kippen Pixel alternierend um und es entsteht die charakteristische hochfrequente Schachbrett-Instabilität (Checkerboard-Artefakt) mit exponentieller Divergenz.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Es entsteht eine hochfrequente Schachbrettmuster-Instabilität (Checkerboard): Benachbarte Pixel kippen periodisch zwischen Extremwerten um und explodieren zu Überläufen (NaN / Infinity), weil das zentrale Gewicht \\((1 - 4s)\\) negativ wird.",
            feedback: "Richtig! Das negative zentrale Gewicht zerstört die konvexe Mittelwertbildung und führt zum Schachbrettmuster."
          },
          {
            fraction: 0,
            text: "Das System kühlt harmonisch und gleichmäßig ab, lediglich die Simulationsgeschwindigkeit verlangsamt sich proportional zum Zeitschritt.",
            feedback: "Falsch. Das System wird numerisch instabil und divergiert rasch."
          },
          {
            fraction: 0,
            text: "Die Wärmeleitung kehrt sich um, sodass Wärme von kalt nach heiß fließt, das Rasterbild bleibt jedoch völlig glatt und stetig.",
            feedback: "Falsch. Es entstehen räumlich diskrete Oszillationen von Pixel zu Pixel und keine kontinuierliche Strömung."
          },
          {
            fraction: 0,
            text: "Es tritt ein Tunneling-Effekt auf, bei dem Wärmepakete die Randbegrenzung ohne Energieübertrag durchdringen.",
            feedback: "Falsch. Tunneling ist ein Phänomen diskreter Partikel bei fehlender Kollisionsdetektion."
          }
        ]
      },
      {
        id: "T01_Q4_Modelltheorie_Stachowiak_Grieves",
        title: "T01.Q4: Modelltheorie nach Stachowiak & Digitaler Zwilling nach Grieves",
        text: `<p>Welche Aussage zur allgemeinen Modelltheorie nach <strong>Herbert Stachowiak</strong> und zur Definition des <strong>Digitalen Zwillings</strong> nach <strong>Michael Grieves</strong> ist <strong>fachlich zutreffend</strong>?</p>`,
        generalFeedback: `<p>Stachowiak begründet die Modelltheorie über das Abbildungsmerkmal (Modell ist Abbild eines Originals), Verkürzungsmerkmal (nicht alle Attribute werden übernommen) und pragmatische Merkmal (Zweck- und Zielbindung). Nach Grieves erfordert ein Digitaler Zwilling das physische Objekt, das virtuelle Objekt und eine automatisierte bidirektionale Datenverbindung.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Ein Digitaler Zwilling erfordert nach Grieves eine automatisierte, bidirektionale Datenverbindung zwischen physischem und virtuellem Objekt; nach Stachowiak ist ein Modell stets durch Abbildungs-, Verkürzungs- und pragmatisches Merkmal definiert.",
            feedback: "Richtig! Dies bildet das theoretische Fundament moderner Simulationssysteme."
          },
          {
            fraction: 0,
            text: "Ein Modell muss nach Stachowiak stets alle physikalischen Eigenschaften und molekularen Vorgänge des Originals verlustfrei im Maßstab 1:1 erfassen.",
            feedback: "Falsch. Das Verkürzungsmerkmal besagt explizit, dass unwesentliche Attribute weggelassen werden."
          },
          {
            fraction: 0,
            text: "Eine statische 3D-CAD-Baugruppe ohne Sensoranbindung und ohne dynamisches Verhaltensmodell erfüllt bereits alle Kriterien eines industriellen Digitalen Zwillings nach Grieves.",
            feedback: "Falsch. Ein CAD-Modell ohne Datenanbindung ist lediglich ein Digital Model."
          },
          {
            fraction: 0,
            text: "Ein Digitaler Schatten und ein Digitaler Zwilling sind identisch, da in beiden Konzepten Daten nur manuell per CSV-Export übertragen werden.",
            feedback: "Falsch. Beim Digitalen Schatten fließt der Datenstrom nur unidirektional automatisch; beim Zwilling bidirektional."
          }
        ]
      },
      {
        id: "T01_Q5_Hardware_Bgra32_Speicher",
        title: "T01.Q5: Hardwarenaher Speicherzugriff & Farbkanalordnung Bgra32",
        text: `<p>Für eine performante Wärme-Visualisierung greift eine Methode direkt über unmanaged C#-Pointer auf den Back-Buffer einer WPF <code>WriteableBitmap</code> im Format <code>PixelFormats.Bgra32</code> zu:</p>
<pre><code class="language-csharp">bitmap.Lock();
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
            row[x * 4 + 0] = heat;               // Byte-Offset 0
            row[x * 4 + 1] = 0;                  // Byte-Offset 1
            row[x * 4 + 2] = (byte)(255 - heat); // Byte-Offset 2
            row[x * 4 + 3] = 255;                // Byte-Offset 3
        }
    }
}
bitmap.AddDirtyRect(new Int32Rect(0, 0, width, height));
bitmap.Unlock();</code></pre>
<p>Der Entwickler beabsichtigte, dass heißes Material <strong>Rot</strong> (\\(R=255, B=0\\)) und kaltes Material <strong>Blau</strong> (\\(B=255, R=0\\)) leuchtet. Welche visuelle Darstellung erscheint stattdessen auf dem Monitor und warum?</p>`,
        generalFeedback: `<p>In Windows und DirectX ist <code>Bgra32</code> Little-Endian organisiert: Byte 0 ist Blau, Byte 1 ist Grün, Byte 2 ist Rot, Byte 3 ist Alpha. Setzt man bei Offset 0 den Wert <code>heat</code> und bei Offset 2 <code>255 - heat</code>, so leuchtet bei maximaler Hitze der Blau-Kanal voll auf!</p>`,
        answers: [
          {
            fraction: 100,
            text: "Die Farbzuordnung ist invertiert: Weil <code>Bgra32</code> an Byte-Offset 0 den Blau-Kanal und an Byte-Offset 2 den Rot-Kanal speichert, erscheinen heiße Zonen intensiv blau und kalte Zonen rot.",
            feedback: "Richtig! Bgra32 speichert die Kanäle in der Reihenfolge Blue, Green, Red, Alpha (Little-Endian)."
          },
          {
            fraction: 0,
            text: "Das Bild bleibt komplett schwarz, weil der Alpha-Kanal an Byte-Offset 3 mit dem Wert 255 vollständig transparent geschaltet wird.",
            feedback: "Falsch. Alpha 255 bedeutet vollkommen deckend (opak), nicht transparent."
          },
          {
            fraction: 0,
            text: "Das Bild wird korrekt rot dargestellt, weil der Windows-Grafiktreiber interne Konvertierungen von RGB nach BGR automatisch vornimmt.",
            feedback: "Falsch. Direct Memory Zugriffe über Pointer umgehen den Treiber; die Bytes werden direkt so interpretiert wie geschrieben."
          },
          {
            fraction: 0,
            text: "Es tritt eine <code>AccessViolationException</code> auf, weil Zeigerzugriffe in C# nur auf 64-Bit-Grenzen erlaubt sind.",
            feedback: "Falsch. Byte-Pointer können jedes Byte im adressierten Speicherbereich lesen und schreiben."
          }
        ]
      }
    ]
  },

  // ============================================================================
  // TEST 02 (Vorbereitung 2)
  // ============================================================================
  {
    id: "Test_02_Vorbereitung",
    title: "Test 02 (Vorbereitung) – FDM-Kupfer, Indexierung & Laplace-Vorzeichen",
    category: "$course$/Quiz_01_Termin_03/Test_02_Vorbereitung",
    isPractice: true,
    questions: [
      {
        id: "T02_Q1_CFL_Berechnung_Kupfer",
        title: "T02.Q1: FDM-Wärmeleitung & CFL-Stabilitätsgrenze (Kupfer)",
        text: `<p>Sie simulieren die 2D-Wärmeausbreitung in einem massiven Kupfer-Heatspreader mittels explizitem 5-Punkt-FDM-Stern. Folgende Parameter sind vorgegeben:</p>
<ul>
  <li>Temperaturleitfähigkeit von Kupfer: \\(\\alpha = 1{,}11 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}\\)</li>
  <li>Gitterweite des Rasters: \\(\\Delta x = \\Delta y = 1{,}0\\,\\text{mm} = 1{,}0 \\cdot 10^{-3}\\,\\text{m}\\)</li>
</ul>
<p>Wie lautet die maximale Zeitschrittweite \\(\\Delta t_{\\max}\\), um eine numerische Divergenz zu verhindern?</p>`,
        generalFeedback: `<p>Stabilitätskriterium: \\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha} = \\frac{(1{,}0 \\cdot 10^{-3})^2}{4 \\cdot 1{,}11 \\cdot 10^{-4}} = \\frac{1{,}0 \\cdot 10^{-6}}{4{,}44 \\cdot 10^{-4}}\\,\\text{s} \\approx 0{,}002252\\,\\text{s} \\approx 2{,}25\\,\\text{ms}\\).</p>`,
        answers: [
          {
            fraction: 100,
            text: "\\(\\Delta t_{\\max} \\approx 2{,}25\\,\\text{ms}\\)",
            feedback: "Richtig! \\(\\Delta x^2 / (4\\alpha) = 10^{-6} / (4{,}44 \\cdot 10^{-4})\\,\\text{s} \\approx 2{,}25\\,\\text{ms}\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 4{,}50\\,\\text{ms}\\)",
            feedback: "Falsch. Das wäre die 1D-Bedingung \\(\\Delta x^2 / (2\\alpha)\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 9{,}01\\,\\text{ms}\\)",
            feedback: "Falsch. Hier wurde der Faktor 4 im Nenner komplett vergessen."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 0{,}56\\,\\text{ms}\\)",
            feedback: "Falsch. Das entspricht einer 3D-Bedingung mit Faktor 6."
          }
        ]
      },
      {
        id: "T02_Q2_Code_Column_vs_Row_Major",
        title: "T02.Q2: Code-Analyse: Zeilen- vs. Spaltenindexierung im Bildspeicher",
        text: `<p>In einer Bildgenerierungsroutine für ein Simulationsfenster (\\(W = 800\\), \\(H = 600\\)) schreibt ein Entwickler folgende Zeigerberechnung:</p>
<pre><code class="language-csharp">byte* pBackBuffer = (byte*)bitmap.BackBuffer;
int stride = bitmap.BackBufferStride;

for (int y = 0; y < height; y++)
{
    for (int x = 0; x < width; x++)
    {
        // Verdächtige Adressberechnung:
        byte* pPixel = pBackBuffer + (x * stride + y * 4);
        *pPixel = 255;
    }
}</code></pre>
<p>Welches schwerwiegende Problem tritt bei der Ausführung dieses Codes auf?</p>`,
        generalFeedback: `<p>Der Stride entspricht dem Byte-Abstand zwischen zwei aufeinanderfolgenden Zeilen. Die korrekte Row-Major-Adressierung lautet \\(y \\cdot \\text{stride} + x \\cdot 4\\). Werden \\(x\\) und \\(y\\) vertauscht, wird der Stride mit \\(x\\) multipliziert. Da \\(W = 800 > H = 600\\), greift die Schleife bei \\(x \\ge 600\\) weit über den allokierten Speicher hinaus (Speicherzugriffsfehler / Crash).</p>`,
        answers: [
          {
            fraction: 100,
            text: "Vertauschung von Zeilen- und Spaltenkoordinate: Der Stride adressiert Zeilenabstände, wird hier jedoch mit \\(x\\) multipliziert. Dies führt zu geometrischer Scherung und zu einem Speicherüberlauf (Crash), sobald \\(x\\) die Bildhöhe überschreitet.",
            feedback: "Exakt! Stride gehört zur Zeilenkoordinate y."
          },
          {
            fraction: 0,
            text: "Der Code kompiliert nicht, da <code>*pPixel = 255</code> in C# nur für <code>int*</code> erlaubt ist.",
            feedback: "Falsch. Dereferenzierung von byte* ist vollkommen gültiges C#."
          },
          {
            fraction: 0,
            text: "Die Multiplikation mit 4 ist ungültig, weil Pixel in WPF stets 8 Bytes groß sind.",
            feedback: "Falsch. 32-Bit-Formate belegen exakt 4 Bytes pro Pixel."
          },
          {
            fraction: 0,
            text: "Das Bild wird lediglich um 180 Grad gedreht, bleibt aber stabil im Speicher.",
            feedback: "Falsch. Es tritt ein harter Speicherüberlauf auf, da x * stride weit über die Puffergrenze ragt."
          }
        ]
      },
      {
        id: "T02_Q3_Physik_Laplace_Kruemmung",
        title: "T02.Q3: Physikalische Interpretation des diskreten Laplace-Operators",
        text: `<p>Beim 2D-FDM-Verfahren wird der Laplace-Operator \\(\\Delta T = \\frac{\\partial^2 T}{\\partial x^2} + \\frac{\\partial^2 T}{\\partial y^2}\\) an der Stelle \\((i,j)\\) diskretisiert durch:</p>
<p>$$\\Delta T_{i,j} \\approx \\frac{T_{i+1,j} + T_{i-1,j} + T_{i,j+1} + T_{i,j-1} - 4 T_{i,j}}{\\Delta x^2}$$</p>
<p>Welche physikalische Bedeutung hat ein <strong>positiver Wert</strong> dieses Zählers (\\(\\Delta T_{i,j} > 0\\)) für den Gitterpunkt?</p>`,
        generalFeedback: `<p>Wenn \\(\\sum T_{\\text{Nachbarn}} - 4 T_{i,j} > 0\\) ist, bedeutet dies \\(\\frac{1}{4} \\sum T_{\\text{Nachbarn}} > T_{i,j}\\): Die durchschnittliche Temperatur der vier Nachbarn ist höher als die des Zentrums. Das Zentrum ist eine Wärmesenke und muss sich gemäß Fourier-Gesetz erwärmen.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Die Nachbarzellen sind im Durchschnitt heißer als die zentrale Zelle (thermische Senke); dem Gitterpunkt strömt netto Wärme zu und seine Temperatur steigt im nächsten Zeitschritt an.",
            feedback: "Richtig! Ein lokales Minimum (positive Krümmung) saugt Wärme aus der wärmeren Umgebung an."
          },
          {
            fraction: 0,
            text: "Der Punkt ist ein lokales Maximum (Hotspot); Wärme fließt von ihm ungebremst nach außen ab.",
            feedback: "Falsch. Bei einem Hotspot wäre T_{i,j} größer als die Nachbarn und der Laplace-Wert negativ."
          },
          {
            fraction: 0,
            text: "Ein positiver Laplace-Wert signalisiert zwingend, dass die Von-Neumann-Stabilitätsgrenze verletzt wurde.",
            feedback: "Falsch. Der Laplace-Operator ist die physikalische Krümmung und sagt noch nichts über die Zeitschrittstabilität aus."
          },
          {
            fraction: 0,
            text: "Dies zeigt an, dass Wärme gegen den Temperaturgradienten von Kalt nach Heiß fließt.",
            feedback: "Falsch. Das würde dem 2. Hauptsatz widersprechen."
          }
        ]
      },
      {
        id: "T02_Q4_Klassifikation_Kritzinger",
        title: "T02.Q4: Taxonomie des Digitalen Zwillings nach Kritzinger et al.",
        text: `<p>In der mechatronischen Fachliteratur (z. B. nach Kritzinger et al., 2018) werden drei Stufen digitaler Repräsentationen unterschieden: <strong>Digital Model</strong>, <strong>Digital Shadow</strong> und <strong>Digital Twin</strong>. Wodurch zeichnen sich diese drei Klassen hinsichtlich ihres Datenflusses aus?</p>`,
        generalFeedback: `<p>Digital Model: Manueller Datenfluss in beide Richtungen.<br>Digital Shadow: Automatischer Datenfluss vom physischen zum virtuellen Objekt, manueller Rückfluss.<br>Digital Twin: Vollautomatischer bidirektionaler Datenfluss zwischen beiden Objekten.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Digital Model: Manuelle Datenübertragung in beide Richtungen. Digital Shadow: Automatisierter Datenfluss von Realität zu Modell, manueller Rückweg. Digital Twin: Vollautomatischer, geschlossener bidirektionaler Datenaustausch.",
            feedback: "Richtig! Dies ist die international anerkannte Definition nach Kritzinger et al."
          },
          {
            fraction: 0,
            text: "Digital Model enthält 1D-Gleichungen, Digital Shadow 2D-Raster und Digital Twin 3D-CAD-Modelle.",
            feedback: "Falsch. Die Unterscheidung basiert auf dem Grad der automatisierten Datenkopplung, nicht auf der geometrischen Dimension."
          },
          {
            fraction: 0,
            text: "Ein Digital Shadow existiert nur während der Konstruktionsphase, während ein Digital Model erst bei Inbetriebnahme entsteht.",
            feedback: "Falsch. Ein Shadow benötigt reale Sensordaten der laufenden Anlage."
          },
          {
            fraction: 0,
            text: "Alle drei Begriffe bezeichnen dasselbe Konzept und werden in der Normung synonym verwendet.",
            feedback: "Falsch. Die Unterscheidung bezüglich des Automatisierungsgrades ist fundamental."
          }
        ]
      },
      {
        id: "T02_Q5_WPF_Canvas_vs_WriteableBitmap",
        title: "T02.Q5: Performance-Architektur: WPF Canvas vs. WriteableBitmap",
        text: `<p>Warum bricht die Render-Framerate einer WPF-Applikation dramatisch ein (unter 5 FPS), wenn ein 2D-Feld aus \\(500 \\times 500 = 250.000\\) Punkten als einzelne <code>Rectangle</code>-Elemente auf einem WPF <code>Canvas</code> dargestellt wird, während dieselbe Darstellung mittels <code>WriteableBitmap</code> mit flüssigen 60 FPS läuft?</p>`,
        generalFeedback: `<p>Ein <code>Rectangle</code> auf dem Canvas ist ein vollwertiges WPF-UIElement mit DependencyProperties, Layout-Messungen (Measure/Arrange), Hit-Testing und Event-Routing. 250.000 UIElements belegen hunderte Megabyte Speicher und überlasten den Visual Tree. <code>WriteableBitmap</code> schreibt rohe Pixelwerte direkt in ein zusammenhängendes Byte-Array im Speicher ohne UI-Overhead.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Jedes Canvas-Shape ist ein schwergewichtiges <code>UIElement</code> mit <code>DependencyProperty</code>-Overhead, Layout-Pässen und Event-Routing; <code>WriteableBitmap</code> hingegen manipuliert ein allokationsfreies, flaches Byte-Array im Speicher.",
            feedback: "Richtig! Der Visual Tree kollabiert unter der schieren Anzahl komplexer UI-Objekte."
          },
          {
            fraction: 0,
            text: "Der WPF Canvas unterstützt prinzipbedingt maximal 1024 visuelle Elemente pro Fenster.",
            feedback: "Falsch. Es gibt kein hartes Limit, aber die Performance degradiert kontinuierlich."
          },
          {
            fraction: 0,
            text: "<code>WriteableBitmap</code> berechnet alle Operationen automatisch auf den Tensor-Kernen der Grafikkarte.",
            feedback: "Falsch. WriteableBitmap ist ein CPU-basierter Speicherpuffer in WPF."
          },
          {
            fraction: 0,
            text: "Canvas-Elemente dürfen nur aus separaten Worker-Threads gezeichnet werden.",
            feedback: "Falsch. UIElements sind an den UI-Thread (Dispatcher) gebunden."
          }
        ]
      }
    ]
  },

  // ============================================================================
  // TEST 03 (Vorbereitung 3)
  // ============================================================================
  {
    id: "Test_03_Vorbereitung",
    title: "Test 03 (Vorbereitung) – Silizium, Ping-Pong-Puffer & Gitterverfeinerung",
    category: "$course$/Quiz_01_Termin_03/Test_03_Vorbereitung",
    isPractice: true,
    questions: [
      {
        id: "T03_Q1_CFL_Berechnung_Silizium",
        title: "T03.Q1: FDM-Wärmeleitung & CFL-Stabilitätsgrenze (Silizium-Chip)",
        text: `<p>Ein Mikroprozessor-Hotspot wird auf einem Siliziumsubstrat simuliert:</p>
<ul>
  <li>Temperaturleitfähigkeit von Silizium: \\(\\alpha = 0{,}88 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}\\)</li>
  <li>Feine räumliche Diskretisierung: \\(\\Delta x = \\Delta y = 0{,}5\\,\\text{mm} = 0{,}5 \\cdot 10^{-3}\\,\\text{m}\\)</li>
</ul>
<p>Berechnen Sie die maximale Zeitschrittweite \\(\\Delta t_{\\max}\\) für das explizite 2D-Euler-FDM-Verfahren.</p>`,
        generalFeedback: `<p>\\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha} = \\frac{(0{,}5 \\cdot 10^{-3})^2}{4 \\cdot 0{,}88 \\cdot 10^{-4}} = \\frac{0{,}25 \\cdot 10^{-6}}{3{,}52 \\cdot 10^{-4}}\\,\\text{s} \\approx 0{,}0007102\\,\\text{s} \\approx 0{,}71\\,\\text{ms}\\).</p>`,
        answers: [
          {
            fraction: 100,
            text: "\\(\\Delta t_{\\max} \\approx 0{,}71\\,\\text{ms}\\)",
            feedback: "Exakt! \\(0{,}25 \\cdot 10^{-6} / (3{,}52 \\cdot 10^{-4})\\,\\text{s} \\approx 0{,}71\\,\\text{ms}\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 1{,}42\\,\\text{ms}\\)",
            feedback: "Falsch. Das entspricht der unzulässigen 1D-Bedingung \\(\\Delta x^2 / (2\\alpha)\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 2{,}84\\,\\text{ms}\\)",
            feedback: "Falsch. Hier fehlt der Faktor 4 komplett."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 7{,}10\\,\\text{ms}\\)",
            feedback: "Falsch. Zehnerpotenzfehler um Faktor 10."
          }
        ]
      },
      {
        id: "T03_Q2_Code_InPlace_Update_Fehler",
        title: "T03.Q2: Code-Analyse: In-Place-Überschreiben vs. Ping-Pong-Buffering",
        text: `<p>In einer Simulationsschleife aktualisiert ein Student ein 2D-Temperaturfeld direkt im selben Array:</p>
<pre><code class="language-csharp">for (int y = 1; y < height - 1; y++)
{
    for (int x = 1; x < width - 1; x++)
    {
        // Fehlerhafte In-Place Zuweisung:
        grid[x, y] = grid[x, y] + s * (
            grid[x + 1, y] + grid[x - 1, y] +
            grid[x, y + 1] + grid[x, y - 1] - 4.0 * grid[x, y]
        );
    }
}</code></pre>
<p>Welcher <strong>fundamentale Simulationsfehler</strong> tritt durch dieses Vorgehen auf?</p>`,
        generalFeedback: `<p>Weil die Schleife zeilenweise von links nach rechts und oben nach unten läuft, wurden die Nachbarn <code>grid[x-1, y]</code> und <code>grid[x, y-1]</code> bereits mit Werten des neuen Zeitschritts \\(k+1\\) überschrieben, während <code>grid[x+1, y]</code> und <code>grid[x, y+1]</code> noch auf Zeitschritt \\(k\\) stehen. Dadurch entsteht ein asymmetrischer numerischer Transportfehler (künstliche thermische Drift). Abhilfe schafft Double-Buffering (Ping-Pong).</p>`,
        answers: [
          {
            fraction: 100,
            text: "Asymmetrische Richtungsverzerrung: Bereits berechnete Werte des neuen Zeitschritts gehen sofort in die Nachbarberechnung ein; es entsteht eine künstliche Richtungsdrift nach rechts unten. Es wird zwingend ein zweiter Puffer (Ping-Pong) benötigt.",
            feedback: "Richtig! Beim expliziten Zeitschritt müssen alle Nachbarn strikt aus dem alten Zeitschritt k stammen."
          },
          {
            fraction: 0,
            text: "Der C#-Compiler verweigert die Ausführung mit Compilerfehler CS0123 wegen verbotener Rekursion.",
            feedback: "Falsch. Syntaktisch ist das völlig legaler C#-Code."
          },
          {
            fraction: 0,
            text: "Das Verfahren transformiert sich automatisch in ein implizites Verfahren und wird dadurch absolut stabil.",
            feedback: "Falsch. Es handelt sich um ein fehlerhaftes Gauss-Seidel-Mischverfahren mit unkontrollierten Fehlern."
          },
          {
            fraction: 0,
            text: "Das Array wirft nach genau einem Durchlauf eine <code>NullReferenceException</code>.",
            feedback: "Falsch. Das Array bleibt allokiert."
          }
        ]
      },
      {
        id: "T03_Q3_Physik_Gitterverfeinerung_Konsequenz",
        title: "T03.Q3: Auswirkung einer räumlichen Gitterverfeinerung auf den Zeitschritt",
        text: `<p>Um feinere thermische Details an einem Kühlkörper aufzulösen, halbiert ein Entwickler die räumliche Schrittweite von \\(\\Delta x = 1{,}0\\,\\text{mm}\\) auf \\(\\Delta x = 0{,}5\\,\\text{mm}\\). Wie muss die maximale Zeitschrittweite \\(\\Delta t\\) angepasst werden, damit das explizite FDM-Verfahren stabil bleibt?</p>`,
        generalFeedback: `<p>Wegen \\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha}\\) geht die räumliche Schrittweite quadratisch in die Zeitschrittbegrenzung ein: \\((0{,}5)^2 = 0{,}25\\). Eine Halbierung von \\(\\Delta x\\) erfordert eine Viertelung von \\(\\Delta t\\)!</p>`,
        answers: [
          {
            fraction: 100,
            text: "\\(\\Delta t\\) muss auf mindestens ein Viertel (\\(1/4\\)) des vorherigen Werts reduziert werden, da bei parabolischen DGLn eine quadratische Kopplung \\(\\Delta t \\propto \\Delta x^2\\) gilt.",
            feedback: "Exakt! Die quadratische Abhängigkeit ist der Hauptgrund für den enormen Rechenaufwand feiner FDM-Gitter."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t\\) muss lediglich halbiert werden (\\(1/2\\)), da die Schrittweiten linear gekoppelt sind.",
            feedback: "Falsch. Das gilt für hyperbolische Wellengleichungen (CFL-Bedingung), nicht für parabolische Diffusion."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t\\) bleibt unverändert, da die zeitliche und räumliche Diskretisierung unabhängig voneinander gewählt werden können.",
            feedback: "Falsch. Das Verfahren würde sofort explodieren."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t\\) kann verdoppelt werden, da feinere Gitter numerisch stabiler sind.",
            feedback: "Falsch. Feinere Gitter verlangen zwingend kleinere Zeitschritte."
          }
        ]
      },
      {
        id: "T03_Q4_George_Box_Modellgrenzen",
        title: "T03.Q4: Das Diktum von George Box und Modellgrenzen in der Ingenieurpraxis",
        text: `<p>Der Statistiker George Box prägte das berühmte Zitat: <em>„All models are wrong, but some are useful.“</em> Welche fundamentale Erkenntnis leitet sich daraus für die Modellbildung mechatronischer Systeme ab?</p>`,
        generalFeedback: `<p>Jedes Modell ist eine Abstraktion und Reduktion der Wirklichkeit. Ein Modell soll die Realität nicht perfekt kopieren, sondern eine konkrete Fragestellung (z. B. thermische Grenztemperatur) mit hinreichender Genauigkeit und vertretbarem Rechenaufwand beantworten.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Jedes Modell vernachlässigt zwangsläufig reale Effekte; seine Qualität bemisst sich nicht an absoluter Vollständigkeit, sondern daran, ob es das zielgerichtete Verhalten für seinen Zweck hinreichend genau vorhersagt.",
            feedback: "Richtig! Ingenieure modellieren zielgerichtet („so einfach wie möglich, so detailliert wie nötig“)."
          },
          {
            fraction: 0,
            text: "Computersimulationen sind prinzipiell fehlerhaft und dürfen deshalb in industriellen Freigabeprozessen niemals eingesetzt werden.",
            feedback: "Falsch. Simulationen sind das Standardwerkzeug moderner Entwicklung."
          },
          {
            fraction: 0,
            text: "Ein Modell ist erst dann wissenschaftlich valide, wenn es bis auf atomare Ebene alle Naturgesetze gleichzeitig abbildet.",
            feedback: "Falsch. Ein solches Modell wäre unberechenbar und verstößt gegen das Verkürzungsmerkmal."
          },
          {
            fraction: 0,
            text: "Nur rein analytisch gelöste Formeln sind brauchbar, numerische Algorithmen sind grundsätzlich unbrauchbar.",
            feedback: "Falsch. Reale industrielle Systeme lassen sich fast nie geschlossen analytisch lösen."
          }
        ]
      },
      {
        id: "T03_Q5_WPF_AddDirtyRect_Lock",
        title: "T03.Q5: WPF-Rendering-Pipeline: Lock, Unlock und AddDirtyRect",
        text: `<p>Ein Entwickler aktualisiert den <code>BackBuffer</code> einer <code>WriteableBitmap</code> direkt über Zeiger im RAM. Er vergisst jedoch nach der Schleife den Aufruf von <code>bitmap.AddDirtyRect(...)</code>. Was ist die Folge?</p>`,
        generalFeedback: `<p><code>AddDirtyRect</code> signalisiert der WPF-Render-Pipeline (dem Composition-Engine), welcher Bereich des Back-Buffers verändert wurde und zur GPU kopiert werden muss. Ohne diesen Aufruf weiß WPF nichts von den geänderten Daten und das Fenster zeigt weiterhin das alte Bild.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Das Anzeigefenster aktualisiert sich nicht (optischer Stillstand), da WPF nicht informiert wird, welcher Bildbereich neu gerendert und an die Grafikkarte übertragen werden muss.",
            feedback: "Richtig! AddDirtyRect stößt das Dirty-Region-Tracking der WPF-Engine an."
          },
          {
            fraction: 0,
            text: "Das Betriebssystem stürzt mit einem Blue-Screen ab, weil DirectX unerlaubt manipuliert wurde.",
            feedback: "Falsch. Es passiert lediglich keine Bildschirmaktualisierung."
          },
          {
            fraction: 0,
            text: "WPF wechselt automatisch in den Software-Rendering-Modus und aktualisiert das Bild nach 5 Sekunden Verzögerung.",
            feedback: "Falsch. Es erfolgt gar kein Update der betroffenen Region."
          },
          {
            fraction: 0,
            text: "Es wird automatisch eine <code>InvalidOperationException</code> geworfen.",
            feedback: "Falsch. Fehlt AddDirtyRect, wird keine Exception ausgelöst, das Bild bleibt stumm unverändert."
          }
        ]
      }
    ]
  },

  // ============================================================================
  // TEST 04 (Prüfung 1)
  // ============================================================================
  {
    id: "Test_04_Pruefung",
    title: "Test 04 (Prüfung) – Messing, Stride-Padding & Ghost-Cells",
    category: "$course$/Quiz_01_Termin_03/Test_04_Pruefung",
    isPractice: false,
    questions: [
      {
        id: "T04_Q1_CFL_Messing",
        title: "T04.Q1: FDM-Stabilitätsgrenze für Messing-Kühlkörper",
        text: `<p>Ein Messingbauteil wird thermisch simuliert:</p>
<ul>
  <li>Temperaturleitfähigkeit von Messing: \\(\\alpha = 0{,}34 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}\\)</li>
  <li>Gitterweite: \\(\\Delta x = \\Delta y = 1{,}5\\,\\text{mm} = 1{,}5 \\cdot 10^{-3}\\,\\text{m}\\)</li>
</ul>
<p>Wie groß ist die maximale Zeitschrittweite \\(\\Delta t_{\\max}\\) nach der 2D-Von-Neumann-Bedingung?</p>`,
        generalFeedback: `<p>\\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha} = \\frac{(1{,}5 \\cdot 10^{-3})^2}{4 \\cdot 0{,}34 \\cdot 10^{-4}} = \\frac{2{,}25 \\cdot 10^{-6}}{1{,}36 \\cdot 10^{-4}}\\,\\text{s} \\approx 0{,}016544\\,\\text{s} \\approx 16{,}54\\,\\text{ms}\\).</p>`,
        answers: [
          {
            fraction: 100,
            text: "\\(\\Delta t_{\\max} \\approx 16{,}54\\,\\text{ms}\\)",
            feedback: "Exakt richtig! \\(2{,}25 \\cdot 10^{-6} / (1{,}36 \\cdot 10^{-4})\\,\\text{s} \\approx 16{,}54\\,\\text{ms}\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 33{,}09\\,\\text{ms}\\)",
            feedback: "Falsch. Das ist der 1D-Wert mit Faktor 2 statt 4."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 8{,}27\\,\\text{ms}\\)",
            feedback: "Falsch. Faktor 8 statt 4 verwendet."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 1{,}65\\,\\text{ms}\\)",
            feedback: "Falsch. Zehnerpotenzfehler um Faktor 10."
          }
        ]
      },
      {
        id: "T04_Q2_Code_Stride_Padding_Bug",
        title: "T04.Q2: Code-Analyse: Vernachlässigung des Grafiktreiber-Stride-Paddings",
        text: `<p>Ein Entwickler verwendet folgenden Code zum Zeilenumbruch im unmanaged Back-Buffer:</p>
<pre><code class="language-csharp">int stride = width * 4; // Feste Annahme ohne Abfrage der Bitmap-Eigenschaft
byte* pRow = (byte*)bitmap.BackBuffer + (y * stride);</code></pre>
<p>Auf manchen Systemen oder bei ungeraden Bildbreiten (z. B. \\(W = 643\\)) erscheint das Bild diagonal zerschnitten und schräg verzerrt. Warum ist die Annahme <code>stride = width * 4</code> gefährlich?</p>`,
        generalFeedback: `<p>Grafiktreiber und das Windows-Subsystem richten Zeilenanfänge aus Performancegründen oft auf 16-, 64- oder 128-Byte-Grenzen aus (Padding-Bytes am Zeilenende). Daher kann <code>BackBufferStride</code> größer sein als <code>width * 4</code>. Man muss zwingend immer <code>bitmap.BackBufferStride</code> abfragen!</p>`,
        answers: [
          {
            fraction: 100,
            text: "Grafiksysteme fügen zur Speicherausrichtung am Zeilenende oft Padding-Bytes ein, sodass <code>BackBufferStride &gt; width * 4</code> sein kann. Wird dieser Treiber-Stride ignoriert, entsteht bei jeder Zeile ein Versatz.",
            feedback: "Richtig! Niemals den Stride hart berechnen, sondern stets bitmap.BackBufferStride abfragen."
          },
          {
            fraction: 0,
            text: "<code>width * 4</code> ist in .NET verboten, weil der Garbage Collector nur Zweierpotenzen verarbeiten kann.",
            feedback: "Falsch. .NET verbietet diese Rechnung nicht, es ist ein Logikfehler bzgl. des Treibers."
          },
          {
            fraction: 0,
            text: "Bei ungeraden Bildbreiten müssen Farbwerte als 16-Bit-Shorts statt als Bytes abgelegt werden.",
            feedback: "Falsch. Das Pixelformat bleibt Bgra32 (8 Bit je Kanal)."
          },
          {
            fraction: 0,
            text: "Die Zeilenlänge muss stets mit 3 multipliziert werden, da der Alphakanal nicht im Stride liegt.",
            feedback: "Falsch. Der Alphakanal ist integraler Bestandteil von Bgra32."
          }
        ]
      },
      {
        id: "T04_Q3_Neumann_Ghost_Cells",
        title: "T04.Q3: Randbedingungen: Adiabater Neumann-Rand & Geisterknoten",
        text: `<p>An der linken Begrenzung (\\(x=0\\)) eines 2D-Kühlkörpers soll eine <strong>ideale thermische Isolation</strong> (adiabater Rand, Neumann-Randbedingung \\(\\frac{\\partial T}{\\partial x} = 0\\)) simuliert werden. Wie wird dieser Rand im expliziten 5-Punkt-Stern mittels eines Geisterknotens (Ghost Cell \\(T_{-1, j}\\)) korrekt diskretisiert?</p>`,
        generalFeedback: `<p>Die zentrale Differenz für den Gradienten am Rand lautet \\(\\frac{\\partial T}{\\partial x} \\approx \\frac{T_{1, j} - T_{-1, j}}{2 \\Delta x} = 0 \\implies T_{-1, j} = T_{1, j}\\). Einsetzen in die 5-Punkt-Formel am Rand \\(i=0\\) ergibt \\(T_{1, j} + T_{1, j} + T_{0, j+1} + T_{0, j-1} - 4 T_{0, j} = 2 T_{1, j} + T_{0, j+1} + T_{0, j-1} - 4 T_{0, j}\\).</p>`,
        answers: [
          {
            fraction: 100,
            text: "Der Geisterknoten wird gleich dem inneren Nachbarn gesetzt (\\(T_{-1, j} = T_{1, j}\\)); dadurch wird der innere Nachbar in der Bilanz zweifach gewichtet und der Wärmestrom über den Rand ist exakt null.",
            feedback: "Exakt! Dies spiegelt den Gradienten null symmetrisch wider."
          },
          {
            fraction: 0,
            text: "Die Randknoten werden auf konstant 0°C gesetzt (\\(T_{0, j} = 0\\)).",
            feedback: "Falsch. Das wäre eine homogene Dirichlet-Randbedingung (Kühlbad), keine Isolation."
          },
          {
            fraction: 0,
            text: "Der Geisterknoten wird negiert (\\(T_{-1, j} = -T_{1, j}\\)), um den Wärmestrom abzusaugen.",
            feedback: "Falsch. Das würde zu einem maximalen Wärmestrom führen."
          },
          {
            fraction: 0,
            text: "Am Rand wird der Laplace-Term komplett zu null gesetzt, sodass der Randpunkt seine Anfangstemperatur ewig behält.",
            feedback: "Falsch. Auch ein isolierter Rand ändert seine Temperatur durch Wärmeleitung von innen."
          }
        ]
      },
      {
        id: "T04_Q4_Stachowiak_Verkuerzung",
        title: "T04.Q4: Das Verkürzungsmerkmal nach Herbert Stachowiak",
        text: `<p>In der allgemeinen Modelltheorie nach Herbert Stachowiak spielt das <strong>Verkürzungsmerkmal</strong> eine tragende Rolle. Was besagt dieses Merkmal im Kontext der Computersimulation?</p>`,
        generalFeedback: `<p>Nach Stachowiak erfasst ein Modell nicht alle Attribute des Originals, sondern nur diejenigen, die dem Modellierer für das jeweilige Untersuchungsziel relevant erscheinen. Unwesentliche Details werden abstrahiert.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Modelle erfassen im Allgemeinen nicht alle Eigenschaften des Originals, sondern blenden irrelevante Attribute gezielt aus, um die Komplexität beherrschbar zu machen.",
            feedback: "Richtig! Dies ist das definitorische Verkürzungsmerkmal nach Stachowiak."
          },
          {
            fraction: 0,
            text: "Die Simulationszeit muss immer kürzer sein als die reale physikalische Prozesszeit.",
            feedback: "Falsch. Das betrifft die Echtzeitfähigkeit, nicht das modelltheoretische Verkürzungsmerkmal."
          },
          {
            fraction: 0,
            text: "Numerische Schrittweiten müssen immer kleiner gewählt werden als 1 Millisekunde.",
            feedback: "Falsch. Das ist eine numerische Parametrisierungsfrage."
          },
          {
            fraction: 0,
            text: "C#-Quelltexte müssen durch Code-Minifier im Speicher komprimiert werden.",
            feedback: "Falsch. Hat nichts mit Stachowiak zu tun."
          }
        ]
      },
      {
        id: "T04_Q5_Bitshift_Bgra32_Packing",
        title: "T04.Q5: 32-Bit-Integer Bit-Packing für PixelFormats.Bgra32",
        text: `<p>Ein Entwickler möchte 32-Bit-Farbwerte direkt als <code>uint</code> in den Back-Buffer schreiben:</p>
<pre><code class="language-csharp">uint* pPixel = (uint*)bitmap.BackBuffer + index;
// Entwickler schreibt:
*pPixel = (uint)((alpha << 24) | (red << 16) | (green << 8) | blue);</code></pre>
<p>Auf einem x86/x64-Windows-PC (Little-Endian) entspricht dies im Speicher der Bytefolge <code>[B, G, R, A]</code>. Was geschieht, wenn der Entwickler stattdessen folgende Zeile schreibt?</p>
<pre><code class="language-csharp">*pPixel = (uint)((alpha << 24) | (blue << 16) | (green << 8) | red);</code></pre>`,
        generalFeedback: `<p>In einem Little-Endian 32-Bit-Integer liegt das niederwertigste Byte (Bits 0..7) an der niedrigsten Speicheradresse. Im ersten Fall liegt <code>blue</code> bei Bits 0..7 (Byte 0) und <code>red</code> bei Bits 16..23 (Byte 2) – das entspricht exakt Bgra32! Im zweiten Fall liegt <code>red</code> an Byte 0 und <code>blue</code> an Byte 2. Rot und Blau sind somit im Bild vertauscht.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Rot- und Blau-Kanäle sind auf dem Bildschirm vertauscht: Was rot sein sollte, erscheint blau, und umgekehrt.",
            feedback: "Richtig! Auf Little-Endian-Systemen belegt der niederwertigste Teil (Bits 0..7) Byte-Offset 0."
          },
          {
            fraction: 0,
            text: "Das Bild wird vollkommen transparent, weil der Alpha-Wert durch das Verschieben gelöscht wird.",
            feedback: "Falsch. Alpha liegt in beiden Fällen korrekt bei Bits 24..31."
          },
          {
            fraction: 0,
            text: "Der C#-Compiler meldet einen Syntaxfehler, weil Bitshift-Operatoren auf uint nicht definiert sind.",
            feedback: "Falsch. Bitshifts auf uint sind Standard-C#."
          },
          {
            fraction: 0,
            text: "Es ändert sich nichts, da der x86-Prozessor Bit-Reihenfolgen automatisch korrigiert.",
            feedback: "Falsch. Der Prozessor führt die Bitshifts exakt so aus wie programmiert."
          }
        ]
      }
    ]
  },

  // ============================================================================
  // TEST 05 (Prüfung 2)
  // ============================================================================
  {
    id: "Test_05_Pruefung",
    title: "Test 05 (Prüfung) – Baustahl, Lock-Synchronisation & Cache-Lokalität",
    category: "$course$/Quiz_01_Termin_03/Test_05_Pruefung",
    isPractice: false,
    questions: [
      {
        id: "T05_Q1_CFL_Baustahl",
        title: "T05.Q1: FDM-Stabilitätsgrenze für Baustahl",
        text: `<p>Die Erwärmung eines massiven Baustahl-Trägers wird mittels FDM modelliert:</p>
<ul>
  <li>Temperaturleitfähigkeit von Baustahl: \\(\\alpha = 0{,}13 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}\\)</li>
  <li>Gitterauflösung: \\(\\Delta x = \\Delta y = 2{,}0\\,\\text{mm} = 2{,}0 \\cdot 10^{-3}\\,\\text{m}\\)</li>
</ul>
<p>Welche maximale Zeitschrittweite \\(\\Delta t_{\\max}\\) garantiert numerische Stabilität?</p>`,
        generalFeedback: `<p>\\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha} = \\frac{(2{,}0 \\cdot 10^{-3})^2}{4 \\cdot 0{,}13 \\cdot 10^{-4}} = \\frac{4{,}0 \\cdot 10^{-6}}{0{,}52 \\cdot 10^{-4}}\\,\\text{s} = \\frac{4{,}0}{52}\\,\\text{s} \\approx 0{,}07692\\,\\text{s} \\approx 76{,}9\\,\\text{ms}\\).</p>`,
        answers: [
          {
            fraction: 100,
            text: "\\(\\Delta t_{\\max} \\approx 76{,}9\\,\\text{ms}\\)",
            feedback: "Richtig! \\(4{,}0 \\cdot 10^{-6} / (0{,}52 \\cdot 10^{-4})\\,\\text{s} \\approx 76{,}9\\,\\text{ms}\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 153{,}8\\,\\text{ms}\\)",
            feedback: "Falsch. Das ist die unzulässige 1D-Bedingung."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 38{,}5\\,\\text{ms}\\)",
            feedback: "Falsch. Unnötig halbierter Wert."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 7{,}69\\,\\text{ms}\\)",
            feedback: "Falsch. Rechenfehler um den Faktor 10."
          }
        ]
      },
      {
        id: "T05_Q2_Code_Lock_Vergessen",
        title: "T05.Q2: Fehlendes Lock() beim Zugriff auf WriteableBitmap",
        text: `<p>Ein Student schreibt folgende Render-Methode in WPF:</p>
<pre><code class="language-csharp">public void UpdateFrame()
{
    // bitmap.Lock() wurde vergessen!
    unsafe
    {
        byte* ptr = (byte*)bitmap.BackBuffer;
        ptr[0] = 255;
    }
    bitmap.AddDirtyRect(new Int32Rect(0, 0, 1, 1));
    bitmap.Unlock(); // Wirft Ausnahme!
}</code></pre>
<p>Welches Problem tritt auf, wenn <code>bitmap.Lock()</code> vor dem Zugriff auf <code>BackBuffer</code> nicht aufgerufen wird?</p>`,
        generalFeedback: `<p>In WPF schützt <code>Lock()</code> den Back-Buffer vor gleichzeitigem Zugriff durch den Render-Thread der WPF-Engine. Fehlt <code>Lock()</code>, kann der Zeiger ungültig sein, es drohen Data Races mit der Grafikkarte und der Aufruf von <code>Unlock()</code> wirft eine <code>InvalidOperationException</code>, weil kein aktiver Lock besteht.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Es drohen Data Races mit dem WPF-Render-Thread und der Aufruf von <code>Unlock()</code> wirft eine <code>InvalidOperationException</code>, weil die Bitmap nicht zuvor gesperrt wurde.",
            feedback: "Richtig! Lock() und Unlock() müssen stets paarweise aufgerufen werden."
          },
          {
            fraction: 0,
            text: "Der C#-Compiler verhindert die Kompilierung bereits im Build-Schritt.",
            feedback: "Falsch. Der Compiler prüft keine Aufrufreihenfolgen von WPF-Methoden."
          },
          {
            fraction: 0,
            text: "WPF ignoriert dies und sperrt die Bitmap automatisch dauerhaft im Hintergrund.",
            feedback: "Falsch. Die interne Sperre muss explizit angefordert werden."
          },
          {
            fraction: 0,
            text: "Es führt lediglich dazu, dass die Bitmap in Graustufen umgewandelt wird.",
            feedback: "Falsch. Es handelt sich um ein gravierendes Synchronisations- und API-Problem."
          }
        ]
      },
      {
        id: "T05_Q3_Physik_Vorzeichenfehler_Laplace",
        title: "T05.Q3: Physikalischer Vorzeichenfehler im Laplace-Differenzenstern",
        text: `<p>In einer FDM-Implementierung unterläuft einem Entwickler ein Vorzeichenfehler in der Zeitschritt-Aktualisierung:</p>
<p>$$T_{i,j}^{n+1} = T_{i,j}^n - s \\cdot \\left( T_{i+1,j}^n + T_{i-1,j}^n + T_{i,j+1}^n + T_{i,j-1}^n - 4 T_{i,j}^n \\right)$$</p>
<p>Welche physikalische Konsequenz hat dieses <strong>Minuszeichen vor dem Diffusionsausdruck</strong>?</p>`,
        generalFeedback: `<p>Die Wärmeleitungsgleichung beschreibt einen irreversiblen Dissipationsprozess (2. Hauptsatz der Thermodynamik). Ein negatives Vorzeichen kehrt die Diffusionsrichtung um: Wärme fließt von Kalt nach Heiß, Temperaturunterschiede steilen sich auf und die Simulation explodiert antikausal.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Verletzung des 2. Hauptsatzes der Thermodynamik: Wärme fließt von kalten zu heißen Zonen; Temperaturgradienten verstärken sich antikausal selbst und das System divergiert sofort.",
            feedback: "Exakt! Dies entspräche einer 'Rückwärts-Wärmeleitungsgleichung', die mathematisch extrem instabil ist."
          },
          {
            fraction: 0,
            text: "Das System erreicht den thermischen Gleichgewichtszustand doppelt so schnell.",
            feedback: "Falsch. Es divergiert und erreicht nie ein Gleichgewicht."
          },
          {
            fraction: 0,
            text: "Die physikalische Ausbreitung bleibt identisch, lediglich die Achsen sind gespiegelt.",
            feedback: "Falsch. Die Vorzeichenumkehr invertiert das physikalische Fließverhalten fundamental."
          },
          {
            fraction: 0,
            text: "Die Temperatur fällt überall schlagartig auf den absoluten Nullpunkt (0 Kelvin).",
            feedback: "Falsch. Die Werte explodieren zu plus/minus unendlich."
          }
        ]
      },
      {
        id: "T05_Q4_Grieves_Drei_Elemente",
        title: "T05.Q4: Die drei Säulen des Digitalen Zwillings nach Michael Grieves",
        text: `<p>Michael Grieves formulierte 2002/2014 das Ursprungskonzept des <strong>Digitalen Zwillings (Digital Twin)</strong>. Aus welchen <strong>drei fundamentalen Entitäten</strong> besteht dieses Konzept zwingend?</p>`,
        generalFeedback: `<p>Nach Grieves besteht der Digitale Zwilling aus: 1. Dem physischen Produkt im realen Raum, 2. dem virtuellen Produkt im virtuellen Raum, 3. den Datenverbindungen, die Daten aus dem realen Raum in den virtuellen Raum und Informationen/Steuerbefehle aus dem virtuellen Raum in den realen Raum übertragen.</p>`,
        answers: [
          {
            fraction: 100,
            text: "1. Reales Produkt im physischen Raum, 2. virtuelles Produkt im virtuellen Raum, 3. automatisierte Daten- und Informationsverbindungen zwischen beiden Räumen.",
            feedback: "Richtig! Dies ist das 3-Säulen-Modell nach Grieves."
          },
          {
            fraction: 0,
            text: "1. CAD-Modell, 2. PDF-Dokumentation, 3. Kaufmännisches ERP-System.",
            feedback: "Falsch. Reine Dokumente ohne Verhaltensmodell und Datenkopplung bilden keinen Digitalen Zwilling."
          },
          {
            fraction: 0,
            text: "1. Sensor, 2. Mikrocontroller, 3. LCD-Display.",
            feedback: "Falsch. Das sind Standard-Hardwarekomponenten eines eingebetteten Systems."
          },
          {
            fraction: 0,
            text: "1. Finite-Elemente-Mesh, 2. Cloud-Speicher, 3. Mobilfunkvertrag.",
            feedback: "Falsch. Grieves definiert ein allgemeines systemisches Modell."
          }
        ]
      },
      {
        id: "T05_Q5_Cache_Lokalitaet_Row_Major",
        title: "T05.Q5: Cache-Lokalität: Row-Major vs. Column-Major in C#",
        text: `<p>Warum ist Schleife A in C# bei einem großen 2D-Gitter (\\(4000 \\times 4000\\) <code>double</code>) typischerweise um ein Vielfaches schneller als Schleife B?</p>
<pre><code class="language-csharp">// Schleife A:
for (int y = 0; y < height; y++)
    for (int x = 0; x < width; x++)
        sum += grid[y, x];

// Schleife B:
for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
        sum += grid[y, x];</code></pre>`,
        generalFeedback: `<p>In C# werden mehrdimensionale Arrays im <strong>Row-Major-Format</strong> abgelegt: Elemente einer Zeile liegen im Speicher direkt hintereinander. Schleife A liest linearen Speicher und nutzt geladene Cache-Lines (typisch 64 Bytes) optimal aus (räumliche Lokalität). Schleife B springt bei jedem Schritt um eine ganze Zeile im Speicher weiter, was zu ständigen Cache-Misses führt.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Schleife A greift sequenziell auf den linearen Speicher zu (Row-Major); dies maximiert die Ausnutzung von CPU-Cache-Lines (Spatial Locality), während Schleife B bei jedem Schritt Cache-Misses erzeugt.",
            feedback: "Richtig! Hardwarenahe Softwarearchitektur erfordert strikte Beachtung der Speicherlinearisierung."
          },
          {
            fraction: 0,
            text: "Schleife B wird vom JIT-Compiler aus Sicherheitsgründen nicht optimiert.",
            feedback: "Falsch. Der JIT optimiert beide Schleifen, kann aber die Speicherzugriffsmuster nicht völlig umstrukturieren."
          },
          {
            fraction: 0,
            text: "In C# dürfen Arrays per Sprachstandard nur mit der Variablen 'y' in der äußeren Schleife iteriert werden.",
            feedback: "Falsch. Variablennamen spielen für die Ausführung keine Rolle."
          },
          {
            fraction: 0,
            text: "Schleife A nutzt automatisch die GPU, während Schleife B auf der CPU läuft.",
            feedback: "Falsch. Beide Schleifen laufen auf der CPU."
          }
        ]
      }
    ]
  },

  // ============================================================================
  // TEST 06 (Prüfung 3)
  // ============================================================================
  {
    id: "Test_06_Pruefung",
    title: "Test 06 (Prüfung) – Gold, GC-Allokationsfreiheit & Robin-Rand",
    category: "$course$/Quiz_01_Termin_03/Test_06_Pruefung",
    isPractice: false,
    questions: [
      {
        id: "T06_Q1_CFL_Gold",
        title: "T06.Q1: FDM-Stabilitätsgrenze für eine Gold-Kontaktbeschichtung",
        text: `<p>Eine Bonddraht-Kontaktfläche aus Gold wird thermisch untersucht:</p>
<ul>
  <li>Temperaturleitfähigkeit von Gold: \\(\\alpha = 1{,}27 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}\\)</li>
  <li>Gitterweite: \\(\\Delta x = \\Delta y = 2{,}5\\,\\text{mm} = 2{,}5 \\cdot 10^{-3}\\,\\text{m}\\)</li>
</ul>
<p>Berechnen Sie die maximale Zeitschrittweite \\(\\Delta t_{\\max}\\) für den stabilen 2D-Euler-FDM-Schritt.</p>`,
        generalFeedback: `<p>\\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha} = \\frac{(2{,}5 \\cdot 10^{-3})^2}{4 \\cdot 1{,}27 \\cdot 10^{-4}} = \\frac{6{,}25 \\cdot 10^{-6}}{5{,}08 \\cdot 10^{-4}}\\,\\text{s} \\approx 0{,}012303\\,\\text{s} \\approx 12{,}30\\,\\text{ms}\\).</p>`,
        answers: [
          {
            fraction: 100,
            text: "\\(\\Delta t_{\\max} \\approx 12{,}30\\,\\text{ms}\\)",
            feedback: "Exakt! \\(6{,}25 \\cdot 10^{-6} / (5{,}08 \\cdot 10^{-4})\\,\\text{s} \\approx 12{,}30\\,\\text{ms}\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 24{,}61\\,\\text{ms}\\)",
            feedback: "Falsch. Das ist der 1D-Wert."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 6{,}15\\,\\text{ms}\\)",
            feedback: "Falsch. Faktor 8 statt 4."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 1{,}23\\,\\text{ms}\\)",
            feedback: "Falsch. Zehnerpotenzfehler um Faktor 10."
          }
        ]
      },
      {
        id: "T06_Q2_Code_GC_Spikes_Allokation",
        title: "T06.Q2: Garbage Collection Spikes durch Allokationen in der Renderschleife",
        text: `<p>Eine 60-FPS-Simulationsschleife aktualisiert die Bildschirmanzeige:</p>
<pre><code class="language-csharp">private void Timer_Tick(object sender, EventArgs e)
{
    // Simulationsschritt durchführen:
    StepSimulation();

    // Anzeige aktualisieren:
    int stride = width * 4;
    byte[] pixelBuffer = new byte[stride * height]; // Im 60-Hz-Tick neu angelegt!
    FillPixels(pixelBuffer);
    bitmap.WritePixels(new Int32Rect(0, 0, width, height), pixelBuffer, stride, 0);
}</code></pre>
<p>Welches schwerwiegende Performanceproblem tritt nach einigen Sekunden Betrieb auf?</p>`,
        generalFeedback: `<p>Wird bei jedem Frame (60-mal pro Sekunde) ein großes Byte-Array allokiert (z. B. \\(1920 \\times 1080 \\times 4 \\approx 8{,}3\\,\\text{MB}\\)), erzeugt dies hunderte Megabyte Müll pro Sekunde auf dem Large Object Heap (LOH). Der .NET Garbage Collector muss regelmäßig anhalten (Stop-the-World GC-Pausen), was zu massiven Framerate-Einbrüchen und Rucklern führt. Lösung: Array einmalig vorallokieren.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Der Garbage Collector muss ständig riesige Speichermengen auf dem Heap freiräumen; dies führt zu regelmäßigen 'Stop-the-World'-GC-Pausen und spürbaren Rucklern in der Visualisierung.",
            feedback: "Richtig! Null-Allokations-Politik in zeitkritischen Schleifen ist Pflicht."
          },
          {
            fraction: 0,
            text: "Das Betriebssystem schließt das Programm sofort mit einem OutOfMemory-Crash nach genau 10 Frames.",
            feedback: "Falsch. Der GC räumt den Speicher zwar frei, bremst die Anwendung dabei jedoch massiv aus."
          },
          {
            fraction: 0,
            text: "Der DispatcherTimer verliert seine Zeitbasis und zählt rückwärts.",
            feedback: "Falsch. Die Zeitbasis wird nicht invertiert."
          },
          {
            fraction: 0,
            text: "<code>WritePixels</code> akzeptiert keine Arrays, die im selben Frame instanziiert wurden.",
            feedback: "Falsch. WritePixels akzeptiert das Array, leidet aber unter dem Allokationsoverhead."
          }
        ]
      },
      {
        id: "T06_Q3_Physik_Robin_Randbedingung",
        title: "T06.Q3: Die Robin-Randbedingung (Konvektiver Wärmeübergang)",
        text: `<p>An den Kühlrippen eines Kühlkörpers wird der Wärmeübergang an die umgebende Luft über eine <strong>Robin-Randbedingung (Randbedingung 3. Art)</strong> modelliert:</p>
<p>$$-\\lambda \\frac{\\partial T}{\\partial n} = h \\left( T_{\\text{Rand}} - T_{\\infty} \\right)$$</p>
<p>Welche Grenzwertbetrachtung bezüglich des Wärmeübergangskoeffizienten \\(h\\) ist <strong>physikalisch korrekt</strong>?</p>`,
        generalFeedback: `<p>Geht \\(h \\to 0\\), verschwindet der Wärmestrom \\(q = 0 \\implies \\frac{\\partial T}{\\partial n} = 0\\); dies entspricht einer perfekten thermischen Isolation (homogene Neumann-Bedingung). Geht \\(h \\to \\infty\\), wird der Widerstand an der Oberfläche null und die Randtemperatur gleicht sich instantan der Umgebungstemperatur an (\\(T_{\\text{Rand}} = T_{\\infty}\\), Dirichlet-Bedingung).</p>`,
        answers: [
          {
            fraction: 100,
            text: "Für \\(h \\to 0\\) geht die Robin-Bedingung in eine adiabate Isolation (Neumann) über; für \\(h \\to \\infty\\) geht sie in eine feste Umgebungstemperatur (Dirichlet) über.",
            feedback: "Exakt! Die Robin-Bedingung verbindet Neumann und Dirichlet über den konvektiven Übergang."
          },
          {
            fraction: 0,
            text: "Für \\(h \\to \\infty\\) wird die Platte vollkommen isoliert, da unendlich viel Wärme abgestoßen wird.",
            feedback: "Falsch. Bei h -> unendlich gleicht sich die Randtemperatur sofort der Umgebung an."
          },
          {
            fraction: 0,
            text: "Der Wärmeübergangskoeffizient \\(h\\) hat dieselbe Dimension wie die Temperaturleitfähigkeit \\(\\alpha\\).",
            feedback: "Falsch. h hat die Einheit W/(m² K), alpha die Einheit m²/s."
          },
          {
            fraction: 0,
            text: "Die Robin-Bedingung kann nur bei statischen Problemen verwendet werden, bei dynamischen FDM-Gittern ist sie mathematisch verboten.",
            feedback: "Falsch. Robin-Bedingungen sind der Standard bei dynamischen Kühlkörper-Simulationen."
          }
        ]
      },
      {
        id: "T06_Q4_Taxonomie_Kontinuierlich_Diskret",
        title: "T06.Q4: Modell-Taxonomie: Kontinuierliche vs. Diskrete Systeme",
        text: `<p>In Kapitel 01 wird die Taxonomie technischer Modelle besprochen. Was ist das wesentliche Unterscheidungsmerkmal zwischen <strong>kontinuierlichen</strong> und <strong>diskreten</strong> dynamischen Modellen hinsichtlich ihrer Zustandsvariablen?</p>`,
        generalFeedback: `<p>Kontinuierliche dynamische Modelle besitzen Zustände, die sich stetig über der Zeit verändern (beschrieben durch Differentialgleichungen wie Temperatur, Druck, Geschwindigkeit). Diskrete Modelle ändern ihren Zustand sprunghaft zu isolierten Ereigniszeitpunkten (beschrieben durch Zähler, Warteschlangen, Zustandsautomaten).</p>`,
        answers: [
          {
            fraction: 100,
            text: "In kontinuierlichen Modellen ändern sich Zustände stetig im Zeitverlauf (DGLn); in diskreten Modellen ändert sich der Zustand sprunghaft zu diskreten Ereigniszeitpunkten (DES / Automaten).",
            feedback: "Richtig! Dies bildet die fundamentale Trennlinie in der Modelltheorie."
          },
          {
            fraction: 0,
            text: "Kontinuierliche Modelle können nur auf Analogrechnern ausgeführt werden, diskrete Modelle nur auf PCs.",
            feedback: "Falsch. Beide Modellklassen werden auf Digitalrechnern simuliert (kontinuierliche via Zeitschrittintegration)."
          },
          {
            fraction: 0,
            text: "Diskrete Modelle berücksichtigen keine Zeit, sondern nur Kosten und Gewichte.",
            feedback: "Falsch. Ereignisdiskrete Simulationen (DES) besitzen eine explizite Simulationszeitachse."
          },
          {
            fraction: 0,
            text: "Kontinuierliche Modelle haben keine physikalischen Einheiten.",
            feedback: "Falsch. Sie basieren direkt auf physikalischen SI-Größen."
          }
        ]
      },
      {
        id: "T06_Q5_LUT_Falschfarben_Performance",
        title: "T06.Q5: Performance-Optimierung durch Farbtabellen (Lookup Tables, LUT)",
        text: `<p>Zur Visualisierung einer 2D-Temperaturverteilung (Werte von 0 bis 255) erzeugt ein Algorithmus eine Falschfarben-Heatmap (Blau \\(\\to\\) Grün \\(\\to\\) Rot). Warum verwendet man hierfür in performantem C# eine vorab berechnete <strong>Lookup Table (LUT)</strong> mit 256 <code>uint</code>-Einträgen, anstatt die Farbwerte pro Pixel und Frame über mathematische Formeln zu berechnen?</p>`,
        generalFeedback: `<p>Bei einem Bild mit \\(800 \\times 600 = 480.000\\) Pixeln und 60 FPS müssten pro Sekunde fast 30 Millionen Farbinterpolationstransformationen gerechnet werden. Mit einer vorab berechneten LUT (256 Einträge im schnellen CPU-L1-Cache) reduziert sich die Farbzuordnung auf einen einzigen O(1) Array-Zugriff <code>lut[heatByte]</code>.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Die LUT reduziert die Farbzuordnung pro Pixel auf einen O(1)-Speicherzugriff im CPU-Cache und eliminiert Millionen rechenintensiver Verzweigungen und mathematischer Interpolationen pro Sekunde.",
            feedback: "Exakt! Lookup Tables sind ein Eckpfeiler hardwarenaher Echtzeitgrafik."
          },
          {
            fraction: 0,
            text: "Weil C# keine mathematischen Funktionen wie Sinus oder lineare Interpolation in Schleifen unterstützt.",
            feedback: "Falsch. C# unterstützt diese mathematischen Funktionen problemlos, sie kosten jedoch Rechenzeit."
          },
          {
            fraction: 0,
            text: "Weil WPF keine Bilder anzeigen kann, wenn die Pixel nicht vorab in einer Tabelle registriert wurden.",
            feedback: "Falsch. WPF interessiert sich nur für den fertigen Pufferinhalt."
          },
          {
            fraction: 0,
            text: "Eine LUT wird zwingend benötigt, um den Garbage Collector daran zu hindern, Pixeldaten zu löschen.",
            feedback: "Falsch. Das hat keinen Bezug zum GC."
          }
        ]
      }
    ]
  },

  // ============================================================================
  // TEST 07 (Prüfung 4)
  // ============================================================================
  {
    id: "Test_07_Pruefung",
    title: "Test 07 (Prüfung) – Silber, Off-by-One & Energieerhaltung",
    category: "$course$/Quiz_01_Termin_03/Test_07_Pruefung",
    isPractice: false,
    questions: [
      {
        id: "T07_Q1_CFL_Silber",
        title: "T07.Q1: FDM-Stabilitätsgrenze für Reinsilber",
        text: `<p>Silber besitzt die höchste thermische Leitfähigkeit aller Metalle:</p>
<ul>
  <li>Temperaturleitfähigkeit von Silber: \\(\\alpha = 1{,}74 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}\\)</li>
  <li>Gitterweite: \\(\\Delta x = \\Delta y = 1{,}0\\,\\text{mm} = 1{,}0 \\cdot 10^{-3}\\,\\text{m}\\)</li>
</ul>
<p>Wie lautet die maximale Zeitschrittweite \\(\\Delta t_{\\max}\\) für ein stabiles 2D-FDM-Verfahren?</p>`,
        generalFeedback: `<p>\\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha} = \\frac{(1{,}0 \\cdot 10^{-3})^2}{4 \\cdot 1{,}74 \\cdot 10^{-4}} = \\frac{1{,}0 \\cdot 10^{-6}}{6{,}96 \\cdot 10^{-4}}\\,\\text{s} \\approx 0{,}0014368\\,\\text{s} \\approx 1{,}44\\,\\text{ms}\\).</p>`,
        answers: [
          {
            fraction: 100,
            text: "\\(\\Delta t_{\\max} \\approx 1{,}44\\,\\text{ms}\\)",
            feedback: "Richtig! \\(1{,}0 \\cdot 10^{-6} / (6{,}96 \\cdot 10^{-4})\\,\\text{s} \\approx 1{,}44\\,\\text{ms}\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 2{,}87\\,\\text{ms}\\)",
            feedback: "Falsch. Das ist der 1D-Wert."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 5{,}75\\,\\text{ms}\\)",
            feedback: "Falsch. Faktor 4 im Nenner fehlt."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 0{,}72\\,\\text{ms}\\)",
            feedback: "Falsch. Unnötig halbiert."
          }
        ]
      },
      {
        id: "T07_Q2_Code_OffByOne_Rand",
        title: "T07.Q2: Code-Analyse: Off-by-One Fehler bei der Differenzenstern-Iteration",
        text: `<p>Ein Student schreibt folgende FDM-Berechnungsschleife für ein Gitter der Dimension \\(W \\times H\\):</p>
<pre><code class="language-csharp">for (int y = 0; y < height; y++)
{
    for (int x = 0; x < width; x++)
    {
        // 5-Punkt-Stern:
        nextGrid[x, y] = grid[x, y] + s * (
            grid[x + 1, y] + grid[x - 1, y] +
            grid[x, y + 1] + grid[x, y - 1] - 4 * grid[x, y]
        );
    }
}</code></pre>
<p>Was geschieht bei der Ausführung dieser Schleife?</p>`,
        generalFeedback: `<p>Bei \\(x = 0\\) greift <code>grid[x-1, y]</code> auf den Index -1 zu; bei \\(x = width - 1\\) greift <code>grid[x+1, y]</code> auf den Index <code>width</code> zu. Dasselbe gilt für \\(y\\). Die Schleife wirft sofort beim ersten Pixel eine <code>IndexOutOfRangeException</code>. Die inneren Punkte müssen von 1 bis Dimension - 2 laufen, während die Ränder separat behandelt werden müssen.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Es tritt sofort beim ersten Durchlauf (\\(x=0, y=0\\)) eine <code>IndexOutOfRangeException</code> auf, da auf negative Indizes (\\(x-1\\)) und Indizes außerhalb des Arrays zugegriffen wird.",
            feedback: "Exakt! Randpunkte müssen gesondert über Randbedingungen behandelt werden."
          },
          {
            fraction: 0,
            text: "C# setzt ungültige Indizes automatisch auf 0 zurück, sodass die Randberechnung fehlerfrei weiterläuft.",
            feedback: "Falsch. C# prüft Array-Grenzen strikt und wirft Ausnahmen."
          },
          {
            fraction: 0,
            text: "Die Schleife wird ausgeführt, aber das Bild wird um ein Pixel nach links verschoben.",
            feedback: "Falsch. Das Programm bricht sofort ab."
          },
          {
            fraction: 0,
            text: "Es entsteht ein Compilerfehler, da zweidimensionale Arrays in C# nicht mit 's' skaliert werden dürfen.",
            feedback: "Falsch. Das ist syntaktisch gültig."
          }
        ]
      },
      {
        id: "T07_Q3_Physik_Energieerhaltung_Neumann",
        title: "T07.Q3: Physikalische Konsistenzprüfung: Energieerhaltung bei adiabaten Rändern",
        text: `<p>In einer thermischen Simulation ist eine Platte an allen vier Außenrändern <strong>vollständig thermisch isoliert</strong> (adiabate Neumann-Ränder, \\(\\partial T / \\partial n = 0\\)). Es gibt keine inneren Wärmequellen. Welche fundamentale physikalische Invariante muss das numerische FDM-Verfahren über die gesamte Simulationszeit hinweg exakt einhalten?</p>`,
        generalFeedback: `<p>Nach dem 1. Hauptsatz der Thermodynamik (Energieerhaltung) kann aus einem allseitig isolierten System ohne Quellen weder Energie entweichen noch hinzukommen. Das Integral der Temperatur über die Fläche bzw. die Summe aller Zelltemperaturen \\(\\sum_{i,j} T_{i,j}\\) muss zeitlich exakt konstant bleiben (bis auf Maschinengenauigkeit).</p>`,
        answers: [
          {
            fraction: 100,
            text: "Die Summe bzw. das Integral der thermischen Energie über alle Gitterpunkte (\\(\\sum T_{i,j}\\)) muss über alle Zeitschritte hinweg konstant bleiben (Energieerhaltungssatz).",
            feedback: "Richtig! Dies ist der wichtigste Validierungstest für die Korrektheit der Neumann-Randimplementierung."
          },
          {
            fraction: 0,
            text: "Die maximale Temperatur im Gitter muss mit jedem Zeitschritt ansteigen.",
            feedback: "Falsch. Ohne Wärmequellen kann das Maximum nur fallen (Dissipation)."
          },
          {
            fraction: 0,
            text: "Die Temperatur aller Zellen muss innerhalb eines einzigen Zeitschritts auf 0°C absinken.",
            feedback: "Falsch. Wärme verteilt sich stetig, sie verschwindet nicht."
          },
          {
            fraction: 0,
            text: "Die Entropie des Systems muss kontinuierlich abnehmen.",
            feedback: "Falsch. Der 2. Hauptsatz besagt, dass die Entropie bei irreversibler Wärmeleitung zunimmt."
          }
        ]
      },
      {
        id: "T07_Q4_Stachowiak_Pragmatismus",
        title: "T07.Q4: Das Pragmatische Merkmal nach Herbert Stachowiak",
        text: `<p>Was versteht Herbert Stachowiak unter dem <strong>Pragmatischen Merkmal</strong> eines Modells?</p>`,
        generalFeedback: `<p>Das pragmatische Merkmal besagt: Modelle sind ihren Originalen nicht per se zugeordnet, sondern erfüllen eine Ersetzungsfunktion für bestimmte Subjekte (Nutzer), innerhalb bestimmter Zeitintervalle und unter Einschränkung auf bestimmte gedankliche oder tatsächliche Operationen (Zweck).</p>`,
        answers: [
          {
            fraction: 100,
            text: "Ein Modell ist nicht universell gültig, sondern erfüllt seine Ersetzungsfunktion stets nur für bestimmte Nutzer (Subjekte), innerhalb definierter Zeitspannen und für einen ganz konkreten Anwendungszweck.",
            feedback: "Richtig! Kein Modell ohne Zweck."
          },
          {
            fraction: 0,
            text: "Ein Modell muss pragmatisch programmiert werden, d. h. ohne objektorientierte Klassen.",
            feedback: "Falsch. Hat nichts mit Programmierparadigmen zu tun."
          },
          {
            fraction: 0,
            text: "Ein Modell darf maximal 100 Zeilen Quellcode umfassen.",
            feedback: "Falsch. Das ist keine wissenschaftliche Definition."
          },
          {
            fraction: 0,
            text: "Pragmatismus bedeutet, dass physikalische Gesetze in Simulationen ignoriert werden dürfen.",
            feedback: "Falsch. Physik ist das Fundament mechatronischer Modelle."
          }
        ]
      },
      {
        id: "T07_Q5_Unsafe_Pointer_vs_Array_Speed",
        title: "T07.Q5: Performancevorteil von Unsafe-Pointern gegenüber regulären 2D-Arrays",
        text: `<p>Warum ist der direkte Speicherzugriff über <code>unsafe byte*</code> in C# bei intensiven Pixel- und FDM-Berechnungen messbar schneller als der Zugriff über ein Standard-C#-Array <code>byte[,]</code>?</p>`,
        generalFeedback: `<p>Bei jedem Zugriff auf ein sicheres C#-Array (<code>array[i, j]</code>) prüft die CLR zur Laufzeit, ob der Index innerhalb der deklarierten Grenzen liegt (Array Bounds Checking). Bei <code>unsafe byte*</code> entfallen diese Prüfungen vollständig; die CPU führt reine Zeigeradditionen ohne Verzweigungen aus.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Bei Zeigeroperationen entfällt das von der .NET-CLR bei jedem regulären Array-Zugriff durchgeführte automatische 'Array Bounds Checking' (Bereichsprüfung), was Verzweigungen im Maschinencode eliminiert.",
            feedback: "Richtig! Bounds Checking kostet in tiefen Schleifen erhebliche Prozessorzyklen."
          },
          {
            fraction: 0,
            text: "Weil Pointer in C# automatisch im L1-Cache festgefroren werden.",
            feedback: "Falsch. Die Hardware steuert das Caching, nicht das unsafe-Schlüsselwort."
          },
          {
            fraction: 0,
            text: "Weil reguläre Arrays in C# auf der Festplatte zwischengespeichert werden.",
            feedback: "Falsch. Arrays liegen wie alle Objekte im Arbeitsspeicher (RAM)."
          },
          {
            fraction: 0,
            text: "Weil unsafe Pointer immer auf 128 Bit parallel vektorisiert werden.",
            feedback: "Falsch. Vektorisierung erfordert explizite SIMD-Instruktionen."
          }
        ]
      }
    ]
  },

  // ============================================================================
  // TEST 08 (Prüfung 5)
  // ============================================================================
  {
    id: "Test_08_Pruefung",
    title: "Test 08 (Prüfung) – Titan, Dimensionsabhängigkeit & Neumann-Falle",
    category: "$course$/Quiz_01_Termin_03/Test_08_Pruefung",
    isPractice: false,
    questions: [
      {
        id: "T08_Q1_CFL_Titan",
        title: "T08.Q1: FDM-Stabilitätsgrenze für ein Titanbauteil",
        text: `<p>Titan besitzt eine sehr geringe Temperaturleitfähigkeit:</p>
<ul>
  <li>Temperaturleitfähigkeit von Titan: \\(\\alpha = 0{,}09 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}\\)</li>
  <li>Gitterweite: \\(\\Delta x = \\Delta y = 1{,}0\\,\\text{mm} = 1{,}0 \\cdot 10^{-3}\\,\\text{m}\\)</li>
</ul>
<p>Welche maximale Zeitschrittweite \\(\\Delta t_{\\max}\\) ergibt sich für das explizite 2D-FDM-Verfahren?</p>`,
        generalFeedback: `<p>\\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha} = \\frac{(1{,}0 \\cdot 10^{-3})^2}{4 \\cdot 0{,}09 \\cdot 10^{-4}} = \\frac{1{,}0 \\cdot 10^{-6}}{0{,}36 \\cdot 10^{-4}}\\,\\text{s} = \\frac{1}{36}\\,\\text{s} \\approx 0{,}02778\\,\\text{s} \\approx 27{,}78\\,\\text{ms}\\).</p>`,
        answers: [
          {
            fraction: 100,
            text: "\\(\\Delta t_{\\max} \\approx 27{,}78\\,\\text{ms}\\)",
            feedback: "Exakt! \\(1{,}0 \\cdot 10^{-6} / (0{,}36 \\cdot 10^{-4})\\,\\text{s} \\approx 27{,}78\\,\\text{ms}\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 55{,}56\\,\\text{ms}\\)",
            feedback: "Falsch. Das ist der 1D-Wert."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 13{,}89\\,\\text{ms}\\)",
            feedback: "Falsch. Faktor 8 statt 4 verwendet."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 2{,}78\\,\\text{ms}\\)",
            feedback: "Falsch. Zehnerpotenzfehler um Faktor 10."
          }
        ]
      },
      {
        id: "T08_Q2_Code_Neumann_Kuehlakku_Falle",
        title: "T08.Q2: Die Kühlakku-Falle: Verwechslung von Neumann- und Dirichlet-Rand",
        text: `<p>Ein Student soll einen isolierten Rand (adiabater Rand, kein Wärmeaustausch) programmieren. Er implementiert dies im Code wie folgt:</p>
<pre><code class="language-csharp">// Randbehandlung für die linke Kante (x = 0):
for (int y = 0; y < height; y++)
{
    grid[0, y] = 0.0; // Student denkt: 0 bedeutet kein Wärmefluss
}</code></pre>
<p>Welchen physikalischen Effekt erzeugt dieser Code tatsächlich?</p>`,
        generalFeedback: `<p><code>grid[0, y] = 0.0</code> setzt die Temperatur am Rand fest auf 0°C. Das ist eine homogene <strong>Dirichlet-Randbedingung</strong> (ein unendliches Kühlbad / Eisbad), die dem System permanent Wärme entzieht. Eine echte Neumann-Isolationsbedingung erfordert \\(\\frac{\\partial T}{\\partial x} = 0\\), also <code>grid[0, y] = grid[1, y]</code>.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Der Rand wirkt wie ein ideales Kühlbad mit konstanter Temperatur 0°C (Dirichlet-Rand); er saugt permanent Wärme aus dem System ab, anstatt es thermisch zu isolieren.",
            feedback: "Richtig! Dies ist der klassische Fehler: Verwechslung von Gradient 0 (Neumann) mit Absolutwert 0 (Dirichlet)."
          },
          {
            fraction: 0,
            text: "Der Rand ist perfekt isoliert, da bei 0.0 keine Energie vorhanden ist.",
            feedback: "Falsch. Temperatur ist eine intensive Zustandsgröße; 0°C ist ein Kühlbad."
          },
          {
            fraction: 0,
            text: "Das Gitter stürzt sofort mit einer <code>DivideByZeroException</code> ab.",
            feedback: "Falsch. Es wird durch keinen Wert geteilt."
          },
          {
            fraction: 0,
            text: "Die Wärme reflektiert am Rand mit doppelter Energie.",
            feedback: "Falsch. Sie wird vernichtet."
          }
        ]
      },
      {
        id: "T08_Q3_Physik_Dimensionsabhaengigkeit_CFL",
        title: "T08.Q3: Dimensionale Abhängigkeit der CFL-Stabilitätsgrenze (1D, 2D, 3D)",
        text: `<p>Für die explizite Finite-Differenzen-Methode der Diffusionsgleichung lautet das Stabilitätskriterium in Abhängigkeit von der Raumdimension \\(d\\):</p>
<p>$$s = \\frac{\\alpha \\Delta t}{\\Delta x^2} \\le s_{\\max}$$</p>
<p>Wie verhält sich \\(s_{\\max}\\) für 1D-, 2D- und 3D-Gitter und was ist die mathematische Ursache?</p>`,
        generalFeedback: `<p>Beim expliziten Euler-Schritt lautet das zentrale Gewicht \\((1 - 2d \\cdot s)\\), da in jeder Raumdimension zwei Nachbarn existieren (1D: 2, 2D: 4, 3D: 6 Nachbarn). Damit das zentrale Gewicht nicht negativ wird, muss \\(1 - 2d \\cdot s \\ge 0 \\implies s \\le \\frac{1}{2d}\\) gelten: 1D: \\(s \\le 1/2\\), 2D: \\(s \\le 1/4\\), 3D: \\(s \\le 1/6\\).</p>`,
        answers: [
          {
            fraction: 100,
            text: "1D: \\(s \\le 1/2\\), 2D: \\(s \\le 1/4\\), 3D: \\(s \\le 1/6\\). Ursache: In \\(d\\) Dimensionen gibt es \\(2d\\) Nachbarn; das zentrale Gewicht \\((1 - 2d \\cdot s)\\) darf nicht negativ werden.",
            feedback: "Exakt! Die Stabilitätsgrenze sinkt reziprok mit der Anzahl der Nachbarn."
          },
          {
            fraction: 0,
            text: "In allen Dimensionen gilt konstant \\(s \\le 0{,}5\\), da die Zeitschrittweite unabhängig vom Raum ist.",
            feedback: "Falsch. Zusätzliche Raumdimensionen addieren Wärmeströme."
          },
          {
            fraction: 0,
            text: "1D: \\(s \\le 1\\), 2D: \\(s \\le 2\\), 3D: \\(s \\le 3\\), da mehr Raum mehr Wärme aufnehmen kann.",
            feedback: "Falsch. Das Gegenteil ist der Fall."
          },
          {
            fraction: 0,
            text: "Die Stabilitätsgrenze hängt ausschließlich vom Material \\(\\alpha\\) ab, nicht von den Raumdimensionen.",
            feedback: "Falsch. Die Gittergeometrie bestimmt den Stabilitätsfaktor s_max maßgeblich."
          }
        ]
      },
      {
        id: "T08_Q4_Statisch_vs_Dynamisch",
        title: "T08.Q4: Taxonomie: Statische vs. Dynamische Modelle",
        text: `<p>Was ist der definitorische Unterschied zwischen einem <strong>statischen</strong> und einem <strong>dynamischen</strong> mechatronischen Modell?</p>`,
        generalFeedback: `<p>Ein statisches Modell beschreibt einen zeitunabhängigen Gleichgewichtszustand (z. B. Biegung eines Balkens unter konstanter Last, \\(\\dot{x} = 0\\)), typischerweise modelliert durch algebraische Gleichungssysteme. Ein dynamisches Modell besitzt Energiespeicher (Trägheiten, Kapazitäten) und beschreibt den zeitlichen Übergang (Trajektorie) über Differentialgleichungen.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Statische Modelle beschreiben zeitunabhängige Gleichgewichtszustände ohne Gedächtnis/Speicher (algebraische Gleichungen); dynamische Modelle besitzen Energiespeicher und bilden die zeitliche Veränderung von Zuständen ab (DGLn).",
            feedback: "Richtig! Dies trennt Statik (Termin 07) von Dynamik (Termin 08)."
          },
          {
            fraction: 0,
            text: "Statische Modelle sind in C# programmiert, dynamische Modelle in C++.",
            feedback: "Falsch. Hat keinen Bezug zur Programmiersprache."
          },
          {
            fraction: 0,
            text: "Statische Modelle berücksichtigen Reibung, dynamische Modelle sind stets reibungsfrei.",
            feedback: "Falsch. Beide können Reibung enthalten."
          },
          {
            fraction: 0,
            text: "Statische Modelle dürfen nur als PDF gezeichnet werden, niemals am Computer berechnet werden.",
            feedback: "Falsch. Statische FE-Systeme werden hochgradig am Computer gerechnet."
          }
        ]
      },
      {
        id: "T08_Q5_Span_Memory_Modern_Net",
        title: "T08.Q5: Allokationsfreie Speicherabstraktion mit Span<T> in modernem C#",
        text: `<p>In modernem C# (.NET 8) wird zunehmend <code>Span&lt;T&gt;</code> und <code>ReadOnlySpan&lt;T&gt;</code> für simulationsnahe Puffer eingesetzt. Welchen entscheidenden Vorteil bietet <code>Span&lt;T&gt;</code> gegenüber herkömmlichen Array-Slices (wie <code>array.Skip(...).Take(...)</code>)?</p>`,
        generalFeedback: `<p><code>Span&lt;T&gt;</code> ist ein <code>ref struct</code>, das auf dem Stack allokiert wird und eine typisierte Sicht auf einen beliebigen zusammenhängenden Speicherbereich (Heap, Stack via <code>stackalloc</code> oder unmanaged Speicher) darstellt. Es entstehen absolut null Heap-Allokationen und kein GC-Overhead.</p>`,
        answers: [
          {
            fraction: 100,
            text: "<code>Span&lt;T&gt;</code> ermöglicht performante, speichersichere Slices direkt im bestehenden Speicher ohne jegliche Heap-Allokationen (0 Byte Garbage Collection Overhead).",
            feedback: "Richtig! Span<T> ist der Schlüssel zu moderner High-Performance in .NET."
          },
          {
            fraction: 0,
            text: "<code>Span&lt;T&gt;</code> führt Berechnungen automatisch parallel auf allen CPU-Kernen aus.",
            feedback: "Falsch. Span<T> ist eine Datenstruktur, kein Multithreading-Scheduler."
          },
          {
            fraction: 0,
            text: "<code>Span&lt;T&gt;</code> kann nur Daten auf der Festplatte lesen.",
            feedback: "Falsch. Span arbeitet im flüchtigen Hauptspeicher."
          },
          {
            fraction: 0,
            text: "<code>Span&lt;T&gt;</code> schaltet das Typsystem von C# komplett ab.",
            feedback: "Falsch. Span ist strikt typsicher."
          }
        ]
      }
    ]
  },

  // ============================================================================
  // TEST 09 (Prüfung 6)
  // ============================================================================
  {
    id: "Test_09_Pruefung",
    title: "Test 09 (Prüfung) – Nickel, Pointerarithmetik & Diffusionslänge",
    category: "$course$/Quiz_01_Termin_03/Test_09_Pruefung",
    isPractice: false,
    questions: [
      {
        id: "T09_Q1_CFL_Nickel",
        title: "T09.Q1: FDM-Stabilitätsgrenze für Nickellegierung",
        text: `<p>Eine Hochtemperatur-Nickellegierung wird simuliert:</p>
<ul>
  <li>Temperaturleitfähigkeit von Nickel: \\(\\alpha = 0{,}23 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}\\)</li>
  <li>Gitterweite: \\(\\Delta x = \\Delta y = 2{,}0\\,\\text{mm} = 2{,}0 \\cdot 10^{-3}\\,\\text{m}\\)</li>
</ul>
<p>Wie groß ist die maximale Zeitschrittweite \\(\\Delta t_{\\max}\\) für das explizite 2D-FDM-Verfahren?</p>`,
        generalFeedback: `<p>\\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha} = \\frac{(2{,}0 \\cdot 10^{-3})^2}{4 \\cdot 0{,}23 \\cdot 10^{-4}} = \\frac{4{,}0 \\cdot 10^{-6}}{0{,}92 \\cdot 10^{-4}}\\,\\text{s} = \\frac{4{,}0}{92}\\,\\text{s} \\approx 0{,}043478\\,\\text{s} \\approx 43{,}48\\,\\text{ms}\\).</p>`,
        answers: [
          {
            fraction: 100,
            text: "\\(\\Delta t_{\\max} \\approx 43{,}48\\,\\text{ms}\\)",
            feedback: "Richtig! \\(4{,}0 \\cdot 10^{-6} / (0{,}92 \\cdot 10^{-4})\\,\\text{s} \\approx 43{,}48\\,\\text{ms}\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 86{,}96\\,\\text{ms}\\)",
            feedback: "Falsch. Das ist der 1D-Wert."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 21{,}74\\,\\text{ms}\\)",
            feedback: "Falsch. Faktor 8 statt 4."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 4{,}35\\,\\text{ms}\\)",
            feedback: "Falsch. Zehnerpotenzfehler um Faktor 10."
          }
        ]
      },
      {
        id: "T09_Q2_Code_Pointer_Arithmetik_Uint",
        title: "T09.Q2: Zeigerarithmetik-Falle bei uint* vs. byte*",
        text: `<p>Ein Entwickler castet den Back-Buffer auf <code>uint*</code>, um 32-Bit-Pixelwerte auf einmal zu schreiben. Zum Zeilenvorschub verwendet er den ermittelten <code>bitmap.BackBufferStride</code> (gemessen in Bytes!):</p>
<pre><code class="language-csharp">uint* pBuffer = (uint*)bitmap.BackBuffer;
int strideInBytes = bitmap.BackBufferStride;

for (int y = 0; y < height; y++)
{
    // Fataler Zeilenvorschub:
    uint* pRow = pBuffer + (y * strideInBytes);
    for (int x = 0; x < width; x++)
    {
        pRow[x] = 0xFF0000FF; // Rot
    }
}</code></pre>
<p>Welcher fatale Denkfehler liegt bei der Zeigerarithmetik in C# vor?</p>`,
        generalFeedback: `<p>In C/C# und C# zählt Zeigerarithmetik immer in Einheiten des zugrundeliegenden Datentyps! Die Erhöhung eines <code>uint*</code> um 1 verschiebt die Speicheradresse um <code>sizeof(uint) = 4</code> Bytes. Addiert man zu einem <code>uint*</code> den Wert <code>y * strideInBytes</code>, verschiebt sich die Adresse um \\(y \\times \\text{strideInBytes} \\times 4\\) Bytes – also viermal zu weit! Nach einem Viertel der Bildhöhe stürzt das Programm mit Speicherverletzung ab.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Zeigerarithmetik auf <code>uint*</code> multipliziert den Offset intern mit <code>sizeof(uint) = 4</code>. Die Addition von <code>strideInBytes</code> springt daher viermal zu weit im Speicher und führt zum Crash.",
            feedback: "Exakt! Bei uint* muss der Byte-Stride durch 4 geteilt werden (pBuffer + y * (stride / 4)) oder als byte* adressiert werden."
          },
          {
            fraction: 0,
            text: "<code>0xFF0000FF</code> ist keine gültige Hexadezimalzahl in C#.",
            feedback: "Falsch. 0xFF0000FF ist ein absolut reguläres uint-Literal."
          },
          {
            fraction: 0,
            text: "In C# dürfen Zeiger niemals mit Schleifenvariablen multipliziert werden.",
            feedback: "Falsch. Das ist Standardzeigerarithmetik."
          },
          {
            fraction: 0,
            text: "Der Code funktioniert tadellos, da die CLR Typunterschiede bei Pointern ignoriert.",
            feedback: "Falsch. Die CLR bzw. der C#-Compiler skaliert Pointerarithmetik streng nach Typgröße."
          }
        ]
      },
      {
        id: "T09_Q3_Physik_Diffusionslaenge_Wurzel",
        title: "T09.Q3: Physikalisches Skalierungsgesetz: Die thermische Diffusionslänge",
        text: `<p>Für die Ausbreitung einer Temperaturfront in einem homogenen Medium gilt näherungsweise das Diffusionsgesetz für die thermische Eindringtiefe:</p>
<p>$$L \\approx \\sqrt{2 \\alpha t}$$</p>
<p>Was bedeutet dieser mathematische Zusammenhang, wenn Sie die Eindringtiefe der Wärmewelle <strong>verdoppeln</strong> wollen (\\(L_2 = 2 L_1\\))?</p>`,
        generalFeedback: `<p>Wegen \\(L \\propto \\sqrt{t}\\) bzw. \\(t \\propto L^2\\) erfordert eine Verdopplung der Eindringtiefe \\(L\\) die vierfache Zeit: \\(t_2 = 4 t_1\\). Die Wärmeausbreitung verlangsamt sich mit zunehmender Tiefe drastisch.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Die dafür erforderliche Zeit vervierfacht sich (\\(t_2 = 4 t_1\\)), da die Diffusionslänge nur mit der Quadratwurzel der Zeit wächst.",
            feedback: "Richtig! Dies ist das universelle Gesetz aller Diffusionsvorgänge."
          },
          {
            fraction: 0,
            text: "Die dafür erforderliche Zeit verdoppelt sich (\\(t_2 = 2 t_1\\)), da Ausbreitungsprozesse linear ablaufen.",
            feedback: "Falsch. Wellenausbreitung ist linear, Diffusion ist parabolisch-quadratisch."
          },
          {
            fraction: 0,
            text: "Die Zeit bleibt gleich, lediglich die Temperatur verdoppelt sich.",
            feedback: "Falsch. Die Wärmefront benötigt Zeit zum Vordringen."
          },
          {
            fraction: 0,
            text: "Die Zeit verkürzt sich auf die Hälfte, da heiße Körper schneller diffundieren.",
            feedback: "Falsch. Völlig unphysikalisch."
          }
        ]
      },
      {
        id: "T09_Q4_Gueltigkeitsbereich_Modell",
        title: "T09.Q4: Modellvalidität & Gültigkeitsbereich (Operational Design Domain)",
        text: `<p>Ein lineares thermisches FDM-Modell nutzt eine konstante Temperaturleitfähigkeit \\(\\alpha = \\text{const}\\). Unter welcher Betriebsbedingung verliert dieses Modell in der mechatronischen Praxis schlagartig seine Gültigkeit?</p>`,
        generalFeedback: `<p>Reale Werkstoffe ändern ihre thermischen Parameter mit der Temperatur. Insbesondere bei Phasenübergängen (z. B. Schmelzen von Lötzinn bei 217°C oder Phasenwechsel in Heatpipes) wird enorme latente Schmelzwärme umgesetzt, ohne dass die Temperatur steigt. Ein lineares Modell ohne Phasenübergang versagt hier vollständig.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Sobald ein Phasenwechsel eintritt (z. B. Aufschmelzen von Lötstellen), da latente Schmelzwärme umgesetzt wird und \\(\\alpha\\) stark temperaturabhängig wird.",
            feedback: "Richtig! Die Gültigkeitsgrenzen des linearen Modells müssen im Vorfeld definiert sein."
          },
          {
            fraction: 0,
            text: "Sobald die Außentemperatur genau 20°C (Raumtemperatur) erreicht.",
            feedback: "Falsch. Bei Raumtemperatur sind lineare Modelle meist hervorragend gültig."
          },
          {
            fraction: 0,
            text: "Wenn die Simulation länger als 10 Sekunden Echtzeit dauert.",
            feedback: "Falsch. Reine Simulationsdauer limitiert nicht die physikalische Gültigkeit."
          },
          {
            fraction: 0,
            text: "Wenn das Modell in C# statt in Python ausgeführt wird.",
            feedback: "Falsch. Die Programmiersprache ändert nichts an der Physik."
          }
        ]
      },
      {
        id: "T09_Q5_UI_Dispatcher_Entkopplung",
        title: "T09.Q5: Thread-Entkopplung: Simulation vs. UI-Dispatcher",
        text: `<p>Warum darf eine rechenintensive FDM-Feldsimulation (z. B. \\(1000 \\times 1000\\) Gitterpunkte mit 100 Iterationen pro Frame) <strong>niemals direkt synchron auf dem WPF-UI-Thread</strong> ausgeführt werden?</p>`,
        generalFeedback: `<p>In WPF verarbeitet der UI-Thread über den Dispatcher sämtliche Windows-Nachrichten, Eingaben (Maus, Tastatur) und Render-Aufrufe. Wird dieser Thread durch eine Sekunden dauernde FDM-Schleife blockiert, friert das gesamte Anwendungsfenster ein („Keine Rückmeldung“). Simulation und UI müssen über Hintergrund-Threads bzw. Background-Worker entkoppelt werden.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Weil der UI-Thread sämtliche Benutzerinteraktionen und Fensterbotschaften verarbeitet; eine synchrone Blockierung führt zum sofortigen Einfrieren der Benutzeroberfläche ('Keine Rückmeldung').",
            feedback: "Richtig! Dies verletzt die fundamentale Architekturregel der Lehrveranstaltung."
          },
          {
            fraction: 0,
            text: "Weil die Grafikkarte nur Daten von Worker-Threads akzeptieren kann.",
            feedback: "Falsch. Die WPF-Engine rendert über ihren eigenen Render-Thread."
          },
          {
            fraction: 0,
            text: "Weil Berechnungen auf dem UI-Thread mathematisch falsche Rundungsfehler erzeugen.",
            feedback: "Falsch. Die FPU rechnet auf allen Threads mit identischer Präzision."
          },
          {
            fraction: 0,
            text: "Weil Windows C#-Programme nach 100 Schleifendurchläufen automatisch beendet.",
            feedback: "Falsch. Es gibt kein solches Schleifenlimit."
          }
        ]
      }
    ]
  },

  // ============================================================================
  // TEST 10 (Prüfung 7)
  // ============================================================================
  {
    id: "Test_10_Pruefung",
    title: "Test 10 (Prüfung) – Zink, Mehrzonen-Stabilität & Alpha-Kanal",
    category: "$course$/Quiz_01_Termin_03/Test_10_Pruefung",
    isPractice: false,
    questions: [
      {
        id: "T10_Q1_CFL_Zink",
        title: "T10.Q1: FDM-Stabilitätsgrenze für Zink-Druckguss",
        text: `<p>Ein Zink-Druckgussgehäuse wird thermisch simuliert:</p>
<ul>
  <li>Temperaturleitfähigkeit von Zink: \\(\\alpha = 0{,}41 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}\\)</li>
  <li>Gitterauflösung: \\(\\Delta x = \\Delta y = 1{,}5\\,\\text{mm} = 1{,}5 \\cdot 10^{-3}\\,\\text{m}\\)</li>
</ul>
<p>Berechnen Sie die maximale Zeitschrittweite \\(\\Delta t_{\\max}\\) für den stabilen 2D-Euler-FDM-Schritt.</p>`,
        generalFeedback: `<p>\\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha} = \\frac{(1{,}5 \\cdot 10^{-3})^2}{4 \\cdot 0{,}41 \\cdot 10^{-4}} = \\frac{2{,}25 \\cdot 10^{-6}}{1{,}64 \\cdot 10^{-4}}\\,\\text{s} \\approx 0{,}01372\\,\\text{s} \\approx 13{,}72\\,\\text{ms}\\).</p>`,
        answers: [
          {
            fraction: 100,
            text: "\\(\\Delta t_{\\max} \\approx 13{,}72\\,\\text{ms}\\)",
            feedback: "Exakt! \\(2{,}25 \\cdot 10^{-6} / (1{,}64 \\cdot 10^{-4})\\,\\text{s} \\approx 13{,}72\\,\\text{ms}\\)."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 27{,}44\\,\\text{ms}\\)",
            feedback: "Falsch. Das ist der 1D-Wert."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 6{,}86\\,\\text{ms}\\)",
            feedback: "Falsch. Faktor 8 statt 4."
          },
          {
            fraction: 0,
            text: "\\(\\Delta t_{\\max} \\approx 1{,}37\\,\\text{ms}\\)",
            feedback: "Falsch. Zehnerpotenzfehler um Faktor 10."
          }
        ]
      },
      {
        id: "T10_Q2_Code_Buffer_Swap_Referenzfehler",
        title: "T10.Q2: Zeiger-Aliasing & Puffer-Swap-Fehler beim Double-Buffering",
        text: `<p>Zur Vermeidung von Allokationen implementiert ein Entwickler das Double-Buffering über Referenz-Tausch:</p>
<pre><code class="language-csharp">double[,] bufferA = new double[width, height];
double[,] bufferB = new double[width, height];

public void Step()
{
    ComputeNextStep(bufferA, bufferB); // Liest A, schreibt B
    
    // Entwickler schreibt:
    bufferA = bufferB; 
}</code></pre>
<p>Welcher fatale Fehler tritt ab dem <strong>zweiten Zeitschritt</strong> auf?</p>`,
        generalFeedback: `<p>Durch <code>bufferA = bufferB</code> zeigen nun beide Variablen auf dieselbe Speicherinstanz von <code>bufferB</code>! Die ursprüngliche Instanz von <code>bufferA</code> geht verloren. Ab Schritt 2 liest und schreibt die Methode in dasselbe Array; das Double-Buffering ist zerstört und es entstehen In-Place-Schreibfehler.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Referenz-Aliasing: <code>bufferA</code> und <code>bufferB</code> verweisen ab Schritt 2 auf dieselbe Array-Instanz im Speicher. Das Double-Buffering kollabiert zu einem fehlerhaften In-Place-Update.",
            feedback: "Richtig! Ein echter Tausch erfordert eine Hilfsvariable: temp = bufferA; bufferA = bufferB; bufferB = temp;"
          },
          {
            fraction: 0,
            text: "Der C#-Compiler wirft einen Fehler, da Arrays in C# schreibgeschützt (immutable) sind.",
            feedback: "Falsch. Arrays in C# sind vollkommen veränderlich (mutable)."
          },
          {
            fraction: 0,
            text: "Es tritt eine <code>StackOverflowException</code> auf, weil Arrays auf dem Stack rekursiv wachsen.",
            feedback: "Falsch. Arrays liegen auf dem Managed Heap."
          },
          {
            fraction: 0,
            text: "Die Werte im Array werden automatisch alle auf den Wert 0 zurückgesetzt.",
            feedback: "Falsch. Die Werte bleiben erhalten, aber beide Zeiger referenzieren dieselbe Instanz."
          }
        ]
      },
      {
        id: "T10_Q3_Mehrzonengitter_Stabilitaet",
        title: "T10.Q3: Stabilitätsgrenze bei Mehrzonengittern (Materialmix)",
        text: `<p>In einer heterogenen Baugruppe (z. B. Leiterplatte) grenzt ein Kupferbereich (\\(\\alpha_{\\text{Cu}} = 1{,}11 \\cdot 10^{-4}\\,\\text{m}^2/\\text{s}\\)) unmittelbar an ein Epoxidharz-Substrat (\\(\\alpha_{\\text{FR4}} = 0{,}001 \\cdot 10^{-4}\\,\\frac{\\text{m}^2}{\\text{s}}\\)). Das räumliche Gitter ist einheitlich äquidistant (\\(\\Delta x = \\text{const}\\)). Welcher Materialbereich bestimmt die <strong>global zulässige Zeitschrittweite \\(\\Delta t_{\\max}\\)</strong> der Gesamtsimulation?</p>`,
        generalFeedback: `<p>Das Gesamtsystem wird instabil, sobald auch nur an einem einzigen Gitterpunkt das lokale Kriterium \\(s_i \\le 0{,}25\\) verletzt wird. Da \\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4 \\alpha}\\) umgekehrt proportional zu \\(\\alpha\\) ist, diktiert die Zone mit der <strong>höchsten</strong> Temperaturleitfähigkeit (hier Kupfer) den kleinsten und damit global maßgeblichen Zeitschritt!</p>`,
        answers: [
          {
            fraction: 100,
            text: "Der Kupferbereich (höchstes \\(\\alpha\\)): Da \\(\\Delta t_{\\max} \\propto 1/\\alpha\\) gilt, erfordert die Zone mit der schnellsten Diffusion den kleinsten Zeitschritt, um lokale Oszillationen zu verhindern.",
            feedback: "Exakt! Die steifste bzw. schnellste Komponente limitiert das gesamte explizite Zeitintegrationsverfahren."
          },
          {
            fraction: 0,
            text: "Der Epoxidharzbereich (niedrigstes \\(\\alpha\\)), da Isolatoren numerisch am schwierigsten zu berechnen sind.",
            feedback: "Falsch. Bei kleinem alpha ist der Zeitschritt unkritisch groß."
          },
          {
            fraction: 0,
            text: "Der arithmetische Mittelwert aus beiden \\(\\alpha\\)-Werten bestimmt den Zeitschritt.",
            feedback: "Falsch. Dann würde Kupfer sofort numerisch explodieren."
          },
          {
            fraction: 0,
            text: "In C# wird automatisch für jede Zelle ein separater individueller Zeitschritt gewählt.",
            feedback: "Falsch. Standard-Gitter integrieren mit einem global synchronen Zeitschritt."
          }
        ]
      },
      {
        id: "T10_Q4_Lebenszyklus_Digital_Twin",
        title: "T10.Q4: Der Digitale Zwilling im Produktlebenszyklus (As-Designed, As-Manufactured, As-Operated)",
        text: `<p>In der industriellen Automatisierungstechnik begleitet der Digitale Zwilling den Lebenszyklus einer Maschine. Welche Aussage zur Entwicklung des Digitalen Zwillings von der Konstruktion bis zum Betrieb ist <strong>fachlich korrekt</strong>?</p>`,
        generalFeedback: `<p>Im Lebenszyklus wandelt sich der Zwilling: Der 'Digital Twin Prototype / As-Designed' basiert auf CAD und idealen Nennwerten; der 'As-Manufactured' integriert reale Fertigungstoleranzen; der 'Digital Twin Instance / As-Operated' wird im laufenden Leitstand kontinuierlich mit realen Sensordaten gefüttert, um Verschleiß und Restlebensdauer zu berechnen.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Der Digitale Zwilling entwickelt sich vom 'As-Designed' (ideale CAD/Simulationsmodelle) über 'As-Manufactured' (mit realen Fertigungstoleranzen) bis zum 'As-Operated' (kontinuierlich mit Echtzeit-Betriebsdaten synchronisierte Instanz).",
            feedback: "Richtig! Dies spiegelt den ganzheitlichen industriellen Lifecycle-Ansatz wider."
          },
          {
            fraction: 0,
            text: "Sobald eine Maschine die Werkshalle verlässt, wird ihr Digitaler Zwilling gelöscht, da er im Betrieb wertlos ist.",
            feedback: "Falsch. Im laufenden Betrieb entfaltet der Zwilling für Predictive Maintenance seinen größten Wert."
          },
          {
            fraction: 0,
            text: "Ein Digitaler Zwilling darf während des gesamten Lebenszyklus niemals mit neuen Sensordaten aktualisiert werden.",
            feedback: "Falsch. Kontinuierliche Datenanbindung ist das Kernkriterium nach Grieves."
          },
          {
            fraction: 0,
            text: "Der Begriff 'Digital Twin' bezieht sich ausschließlich auf die kaufmännische Buchhaltungssoftware eines Unternehmens.",
            feedback: "Falsch. Es ist ein mechatronisches Ingenieurskonzept."
          }
        ]
      },
      {
        id: "T10_Q5_Alpha_Kanal_Bgra32_Transparenz",
        title: "T10.Q5: Der Alpha-Kanal in Bgra32 und unsichtbare Pixel",
        text: `<p>Ein Student schreibt Farbwerte in eine <code>WriteableBitmap</code> im Format <code>PixelFormats.Bgra32</code>:</p>
<pre><code class="language-csharp">byte* pPixel = pBackBuffer + index;
pPixel[0] = 0;   // Blau
pPixel[1] = 0;   // Grün
pPixel[2] = 255; // Rot = Maximal
pPixel[3] = 0;   // Alpha</code></pre>
<p>Auf dem Bildschirm bleibt das entsprechende Pixel vollkommen transparent bzw. nimmt die Hintergrundfarbe des Fensters an, anstatt intensiv rot zu leuchten. Warum?</p>`,
        generalFeedback: `<p>Im Format <code>Bgra32</code> repräsentiert das vierte Byte (Offset 3) den linearen Alpha-Kanal (Deckkraft / Opazität). Ein Wert von 0 bedeutet vollkommen transparent (0 % Deckung). Damit ein Pixel sichtbar wird, muss der Alpha-Kanal typischerweise auf 255 (voll deckend / 100 % Opazität) gesetzt werden.</p>`,
        answers: [
          {
            fraction: 100,
            text: "Offset 3 steuert den Alpha-Kanal (Deckkraft); ein Wert von 0 bedeutet 0 % Opazität (vollkommene Transparenz), wodurch die roten Farbwerte unsichtbar bleiben. Sichtbare Pixel erfordern Alpha = 255.",
            feedback: "Exakt! In Bgra32 muss der Alphakanal zwingend auf 255 gesetzt werden, wenn der Pixel voll deckend sein soll."
          },
          {
            fraction: 0,
            text: "In WPF bedeutet Alpha = 0 maximale Helligkeit und Alpha = 255 tiefschwarz.",
            feedback: "Falsch. Alpha steuert die Deckkraft/Opazität, nicht die Helligkeit."
          },
          {
            fraction: 0,
            text: "Der Grafikkartentreiber unterstützt bei Rot keine Alphakanäle.",
            feedback: "Falsch. Jeder Farbkanal wird gleichmäßig mit Alpha geblendet."
          },
          {
            fraction: 0,
            text: "Das Pixel wird nicht angezeigt, weil Rot an Offset 2 statt an Offset 0 steht.",
            feedback: "Falsch. In Bgra32 steht Rot exakt an Offset 2."
          }
        ]
      }
    ]
  }
];

// ------------------------------------------------------------------------------
// XML- und Markdown-Generierung
// ------------------------------------------------------------------------------

function escapeXml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildMoodleXmlForTest(test) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n`;

  // Category
  xml += `  <question type="category">\n`;
  xml += `    <category>\n`;
  xml += `      <text>${test.category}</text>\n`;
  xml += `    </category>\n`;
  xml += `    <info format="html">\n`;
  xml += `      <text><![CDATA[<p>${test.title}</p>]]></text>\n`;
  xml += `    </info>\n`;
  xml += `  </question>\n\n`;

  // Questions
  test.questions.forEach((q, idx) => {
    xml += `  <!-- Question ${idx + 1}: ${q.title} -->\n`;
    xml += `  <question type="multichoice">\n`;
    xml += `    <name>\n`;
    xml += `      <text>${q.id}</text>\n`;
    xml += `    </name>\n`;
    xml += `    <questiontext format="html">\n`;
    xml += `      <text><![CDATA[${q.text}]]></text>\n`;
    xml += `    </questiontext>\n`;
    xml += `    <generalfeedback format="html">\n`;
    xml += `      <text><![CDATA[${q.generalFeedback}]]></text>\n`;
    xml += `    </generalfeedback>\n`;
    xml += `    <defaultgrade>1.0000000</defaultgrade>\n`;
    xml += `    <penalty>0.3333333</penalty>\n`;
    xml += `    <hidden>0</hidden>\n`;
    xml += `    <idnumber>${q.id}</idnumber>\n`;
    xml += `    <single>true</single>\n`;
    xml += `    <shuffleanswers>true</shuffleanswers>\n`;
    xml += `    <answernumbering>abc</answernumbering>\n`;
    xml += `    <showstandardinstruction>0</showstandardinstruction>\n`;
    xml += `    <correctfeedback format="html">\n`;
    xml += `      <text><![CDATA[<p>Richtig! Ausgezeichnete ingenieurwissenschaftliche Begründung.</p>]]></text>\n`;
    xml += `    </correctfeedback>\n`;
    xml += `    <partiallycorrectfeedback format="html">\n`;
    xml += `      <text><![CDATA[<p>Teilweise richtig.</p>]]></text>\n`;
    xml += `    </partiallycorrectfeedback>\n`;
    xml += `    <incorrectfeedback format="html">\n`;
    xml += `      <text><![CDATA[<p>Falsch. Bitte studieren Sie das Feedback zur korrekten mathematischen und physikalischen Modellierung.</p>]]></text>\n`;
    xml += `    </incorrectfeedback>\n`;
    xml += `    <shownumcorrect/>\n`;

    q.answers.forEach(ans => {
      xml += `    <answer fraction="${ans.fraction}" format="html">\n`;
      xml += `      <text><![CDATA[${ans.text}]]></text>\n`;
      xml += `      <feedback format="html">\n`;
      xml += `        <text><![CDATA[<p>${ans.feedback}</p>]]></text>\n`;
      xml += `      </feedback>\n`;
      xml += `    </answer>\n`;
    });

    xml += `  </question>\n\n`;
  });

  xml += `</quiz>\n`;
  return xml;
}

// Master XML (alle 10 Tests in einer Datei mit separaten Kategorien)
function buildMasterXml(tests) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n`;

  tests.forEach((test, tIdx) => {
    xml += `  <!-- ========================================================= -->\n`;
    xml += `  <!-- ${test.title} -->\n`;
    xml += `  <!-- ========================================================= -->\n`;
    xml += `  <question type="category">\n`;
    xml += `    <category>\n`;
    xml += `      <text>${test.category}</text>\n`;
    xml += `    </category>\n`;
    xml += `    <info format="html">\n`;
    xml += `      <text><![CDATA[<p>${test.title}</p>]]></text>\n`;
    xml += `    </info>\n`;
    xml += `  </question>\n\n`;

    test.questions.forEach((q, qIdx) => {
      xml += `  <!-- Test ${tIdx + 1}, Question ${qIdx + 1}: ${q.title} -->\n`;
      xml += `  <question type="multichoice">\n`;
      xml += `    <name>\n`;
      xml += `      <text>${q.id}</text>\n`;
      xml += `    </name>\n`;
      xml += `    <questiontext format="html">\n`;
      xml += `      <text><![CDATA[${q.text}]]></text>\n`;
      xml += `    </questiontext>\n`;
      xml += `    <generalfeedback format="html">\n`;
      xml += `      <text><![CDATA[${q.generalFeedback}]]></text>\n`;
      xml += `    </generalfeedback>\n`;
      xml += `    <defaultgrade>1.0000000</defaultgrade>\n`;
      xml += `    <penalty>0.3333333</penalty>\n`;
      xml += `    <hidden>0</hidden>\n`;
      xml += `    <idnumber>${q.id}</idnumber>\n`;
      xml += `    <single>true</single>\n`;
      xml += `    <shuffleanswers>true</shuffleanswers>\n`;
      xml += `    <answernumbering>abc</answernumbering>\n`;
      xml += `    <showstandardinstruction>0</showstandardinstruction>\n`;
      xml += `    <correctfeedback format="html">\n`;
      xml += `      <text><![CDATA[<p>Richtig!</p>]]></text>\n`;
      xml += `    </correctfeedback>\n`;
      xml += `    <incorrectfeedback format="html">\n`;
      xml += `      <text><![CDATA[<p>Falsch.</p>]]></text>\n`;
      xml += `    </incorrectfeedback>\n`;
      xml += `    <shownumcorrect/>\n`;

      q.answers.forEach(ans => {
        xml += `    <answer fraction="${ans.fraction}" format="html">\n`;
        xml += `      <text><![CDATA[${ans.text}]]></text>\n`;
        xml += `      <feedback format="html">\n`;
        xml += `        <text><![CDATA[<p>${ans.feedback}</p>]]></text>\n`;
        xml += `      </feedback>\n`;
        xml += `    </answer>\n`;
      });

      xml += `  </question>\n\n`;
    });
  });

  xml += `</quiz>\n`;
  return xml;
}

// Markdown-Übersichtskatalog
function buildMarkdownDoc(tests) {
  let md = `# Moodle Multiple-Choice-Testkatalog: Termin 03 (Quiz 01)
## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
**Studiengang:** B.Sc. Automatisierungstechnik, Campus Wels, FH Oberösterreich  
**Dozent:** Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme  
**Gültigkeit:** Ab Studienjahr 2026/2027  
**Stoffabgrenzung:** Kapitel 00 (Prolog), Kapitel 01 (Einführung & Digitaler Zwilling), Kapitel 02 (2D-Pixelgrafik & FDM-Wärmeraster)  
**Kausalitätsprüfung:** Strikte Einhaltung aller Tabu-Grenzen (keine Vektoren/Canvas, kein ScottPlot, kein 3D, kein Multithreading, kein RK4, keine FEM/Cholesky).

---

## 1. Didaktisches Einsatz- & Benotungskonzept

Dieser Fragenkatalog enthält **10 vollständige, eigenständige Multiple-Choice-Tests** mit jeweils 5 anspruchsvollen Fragen (insgesamt 50 kalibrierte Fragen).

### 1.1 Verwendung im Semesterablauf:
* **3 Vorbereitungstests (Tests 01 bis 03):** Werden den Studierenden im Moodle-Kursraum zur autonomen Prüfungsvorbereitung und zum Selbststudium freigegeben. Studierende können die Fragen beliebig oft durchführen und erhalten sofortiges formatives Feedback mit Herleitungen.
* **7 gewertete Prüfungstests (Tests 04 bis 10):** Dienen der summativen Benotung (Säule 1, 10 % der Gesamtnote). Am 3. Präsenztermin wählt die Lehrperson **zufällig genau einen** der 7 Tests aus und schaltet ihn für 15 Minuten als geschlossene Präsenzklausur (Safe Exam Browser / PC-Pool) frei.

### 1.2 Systematische 5-Säulen-Struktur jedes Tests:
Jeder der 10 Tests deckt exakt dieselben 5 didaktischen Kompetenzsäulen mit variierenden Werkstoffen, Parametern und Code-Mutationen ab:
1. **Frage 1 (Berechnung):** 2D-FDM-Wärmeleitung & CFL-/Von-Neumann-Stabilitätsgrenze (\\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha}\\))
2. **Frage 2 (Code-Analyse & Bugfix):** Low-Level-Speicherverwaltung, Stride, Buffer-Aliasing & Pointer in C#/WPF
3. **Frage 3 (Fehlerdiagnostik & Physik):** Phänomenologische Analyse (Schachbrett-Artefakt, Krümmung, Neumann-Geisterknoten, Diffusionslänge)
4. **Frage 4 (Modelltheorie & Digitaler Zwilling):** Stachowiak (3 Hauptmerkmale), Grieves (3 Säulen), Box, Modell-Taxonomie
5. **Frage 5 (Hardwarenahe Architektur & Performance):** WPF <code>WriteableBitmap</code>, Little-Endian <code>Bgra32</code>, Cache-Lokalität, GC-Vermeidung

---

## 2. Übersichtstabelle aller 10 Tests

| Test-ID | Typ | Thema & Werkstoff | Berechnete Grenze \\(\\Delta t_{\\max}\\) | Kernproblem der Code-Analyse |
| :--- | :--- | :--- | :---: | :--- |
| **Test 01** | Vorbereitung 1 | Aluminium (\\(\\Delta x = 2{,}0\\,\\text{mm}\\)) | **8,00 ms** | Stride = width * 3 statt width * 4 |
| **Test 02** | Vorbereitung 2 | Kupfer (\\(\\Delta x = 1{,}0\\,\\text{mm}\\)) | **2,25 ms** | Vertauschung x * stride + y * 4 |
| **Test 03** | Vorbereitung 3 | Silizium (\\(\\Delta x = 0{,}5\\,\\text{mm}\\)) | **0,71 ms** | In-Place-Überschreiben ohne Double-Buffer |
| **Test 04** | **Prüfung 1** | Messing (\\(\\Delta x = 1{,}5\\,\\text{mm}\\)) | **16,54 ms** | Ignorieren des Treiber-Paddings im Stride |
| **Test 05** | **Prüfung 2** | Baustahl (\\(\\Delta x = 2{,}0\\,\\text{mm}\\)) | **76,92 ms** | Fehlendes <code>bitmap.Lock()</code> vor BackBuffer |
| **Test 06** | **Prüfung 3** | Gold (\\(\\Delta x = 2{,}5\\,\\text{mm}\\)) | **12,30 ms** | <code>new byte[]</code> im 60-FPS-Timer (GC-Spikes) |
| **Test 07** | **Prüfung 4** | Silber (\\(\\Delta x = 1{,}0\\,\\text{mm}\\)) | **1,44 ms** | Off-by-One Indexfehler am Gitterrand |
| **Test 08** | **Prüfung 5** | Titan (\\(\\Delta x = 1{,}0\\,\\text{mm}\\)) | **27,78 ms** | Kühlakku-Falle: <code>grid[0,y]=0</code> statt Neumann |
| **Test 09** | **Prüfung 6** | Nickel (\\(\\Delta x = 2{,}0\\,\\text{mm}\\)) | **43,48 ms** | <code>uint*</code> Zeigersprung mit Byte-Stride |
| **Test 10** | **Prüfung 7** | Zink (\\(\\Delta x = 1{,}5\\,\\text{mm}\\)) | **13,72 ms** | Zeiger-Aliasing <code>bufferA = bufferB</code> |

---

## 3. Detaillierter Fragen- & Lösungskatalog
\n`;

  tests.forEach((test, tIdx) => {
    md += `\n### ${test.title}\n`;
    md += `**Kategorie:** \`${test.category}\`  \n`;
    md += `**Status:** ${test.isPractice ? '🟢 Vorbereitungstest (Freigegeben in Moodle)' : '🔴 Gewerteter Prüfungstest (Zufallsauswahl am Termin 3)'}  \n\n`;

    test.questions.forEach((q, qIdx) => {
      md += `#### Frage ${tIdx + 1}.${qIdx + 1}: ${q.title}\n\n`;
      md += `${q.text}\n\n`;

      md += `**Antwortoptionen:**\n`;
      q.answers.forEach(a => {
        const mark = a.fraction === 100 ? '[x] **(KORREKT)**' : '[ ]';
        md += `* ${mark} ${a.text}\n`;
        md += `  * *Feedback:* ${a.feedback}\n`;
      });

      md += `\n**Musterherleitung & Didaktik:**\n${q.generalFeedback}\n\n---\n\n`;
    });
  });

  return md;
}

// ------------------------------------------------------------------------------
// Ausführung & Export
// ------------------------------------------------------------------------------

const baseMoodleDir = path.resolve(__dirname, '../Moodle/Quiz_01_Termin_03_Grundlagen_und_Pixel');
const xmlSubDir = path.join(baseMoodleDir, 'XML_Tests');

if (!fs.existsSync(xmlSubDir)) {
  fs.mkdirSync(xmlSubDir, { recursive: true });
}

console.log('='.repeat(70));
console.log(' GENERIERE 10 MOODLE-XML TESTS FÜR TERMIN 03');
console.log('='.repeat(70));

// 1. Die 10 individuellen XML-Dateien schreiben
testsData.forEach((test, i) => {
  const fileName = `${test.id}.xml`;
  const filePath = path.join(xmlSubDir, fileName);
  const xmlContent = buildMoodleXmlForTest(test);
  fs.writeFileSync(filePath, xmlContent, 'utf8');
  console.log(`  [${i + 1}/10] Exportiert: XML_Tests/${fileName} (${test.questions.length} Fragen)`);
});

// 2. Master XML schreiben (alle 10 Tests in einer Datei)
const masterXmlPath = path.join(baseMoodleDir, 'Quiz_01_Termin_03_Alle_10_Tests_Master.xml');
fs.writeFileSync(masterXmlPath, buildMasterXml(testsData), 'utf8');
console.log(`\n  [OK] Master-XML erstellt: ${path.basename(masterXmlPath)}`);

// 3. Ausführliche Markdown-Dokumentation schreiben
const mdPath = path.join(baseMoodleDir, 'Uebersicht_10_Moodle_Tests.md');
fs.writeFileSync(mdPath, buildMarkdownDoc(testsData), 'utf8');
console.log(`  [OK] Markdown-Katalog erstellt: ${path.basename(mdPath)}`);

console.log('='.repeat(70));
console.log(' EXPORT ERFOLGREICH ABGESCHLOSSEN!');
console.log('='.repeat(70));
