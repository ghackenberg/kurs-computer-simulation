const { exportMoodleQuiz } = require('./moodle_xml_builder');

const quizMeta = {
  quizId: 'Quiz_01_Termin_03',
  title: 'Quiz 01 (Termin 03) – Grundlagen, Digitaler Zwilling & 2D-Pixelgrafik',
  moodleDir: 'Moodle/Quiz_01_Termin_03_Grundlagen_und_Pixel',
  masterXmlFileName: 'Quiz_01_Termin_03_Alle_10_Tests_Master.xml',
  terminInfo: 'Termin 03',
  coveredChapters: 'Kapitel 00 (Prolog), Kapitel 01 (Einführung, Digitaler Zwilling & Expliziter Euler), Kapitel 02 (2D-Pixelgrafik & FDM-Wärmeraster)',
  tabooTopics: 'Kein WPF Canvas / Vektorgrafik (Kap. 03), kein ScottPlot (Kap. 04), kein 3D / SharpGL (Kap. 05), kein TPL (Kap. 06), kein Cholesky (Kap. 07), kein RK4 (Kap. 08)!'
};

const testsData = [
  // =========================================================================
  // TEST 01 (VORBEREITUNG)
  // =========================================================================
  {
    id: 'Test_01_Vorbereitung',
    title: 'Test 01 (Vorbereitung) – Grundlagen, Euler & 2D-Wärmeraster (Variante A)',
    category: '$course$/Quiz_01_Termin_03/Test_01_Vorbereitung',
    isPractice: true,
    questions: [
      {
        id: 'T01_Q1',
        title: '2D-Wärmeleitung: Stabilitätsgrenze & Integrationsschritte',
        shortSummary: 'CFL $\\Delta t_{\\max}$ & Schritte ($\\Delta x=2$ mm)',
        type: 'cloze',
        grade: 2.0,
        text: '<p>Eine quadratische Kupferplatte wird für eine thermische Echtzeitsimulation mit einem äquidistanten 2D-Finite-Differenzen-Gitter der Maschenweite \\(\\Delta x = \\Delta y = 2{,}0\\,\\text{mm}\\) diskretisiert. Die Temperaturleitfähigkeit des Materials beträgt \\(\\alpha = 100\\,\\text{mm}^2/\\text{s}\\). Das Temperaturfeld soll mit dem expliziten Euler-Verfahren (5-Punkt-Stern) über eine physikalische Gesamtdauer von \\(t_{\\text{end}} = 1{,}0\\,\\text{s}\\) an der exakten Stabilitätsgrenze simuliert werden.</p>' +
              '<p>a) Wie groß ist die maximal zulässige Zeitschrittweite \\(\\Delta t_{\\max}\\) in <strong>Millisekunden (ms)</strong>?<br>' +
              'Antwort: {1:NUMERICAL:=10:0.1#Richtig! Aus s <= 0,25 folgt dt_max = dx^2 / (4 * alpha) = 4 / 400 = 0,01 s = 10 ms.~%50%20:0.1#Teilpunkte (50 %): Sie haben den 1D-Faktor 2 statt des 2D-Faktors 4 im Nenner verwendet (20 ms statt 10 ms).~%50%0.01:0.001#Teilpunkte (50 %): Zahlenwert in Sekunden statt in Millisekunden (ms) angegeben.} ms</p>' +
              '<p>b) Wie viele diskrete Zeitschritte \\(N_{\\text{steps}}\\) sind für die Gesamtdauer von \\(t_{\\text{end}} = 1{,}0\\,\\text{s}\\) bei \\(\\Delta t = \\Delta t_{\\max}\\) exakt erforderlich?<br>' +
              'Antwort: {1:NUMERICAL:=100:0#Richtig! N = 1,0 s / 0,01 s = 100 Zeitschritte.~%50%50:0#Teilpunkte (50 %): Folgefehler aus der 1D-Stabilitätsgrenze (dt = 20 ms -> 50 Schritte).} Schritte</p>',
        generalFeedback: '<p><strong>Musterherleitung (2D-CFL-Stabilitätskriterium):</strong></p>' +
                         '<p>Für die explizite 2D-Wärmeleitungsgleichung auf einem quadratischen Gitter gilt die Von-Neumann-Stabilitätsbedingung \\(s = \\frac{\\alpha \\cdot \\Delta t}{\\Delta x^2} \\le \\frac{1}{4} = 0{,}25\\).</p>' +
                         '<p>1. Auflösung nach \\(\\Delta t_{\\max}\\):<br>\\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4 \\cdot \\alpha} = \\frac{(2{,}0\\,\\text{mm})^2}{4 \\cdot 100\\,\\text{mm}^2/\\text{s}} = \\frac{4}{400}\\,\\text{s} = 0{,}01\\,\\text{s} = 10\\,\\text{ms}\\).</p>' +
                         '<p>2. Anzahl der Zeitschritte für \\(t_{\\text{end}} = 1{,}0\\,\\text{s}\\):<br>\\(N_{\\text{steps}} = \\frac{t_{\\text{end}}}{\\Delta t_{\\max}} = \\frac{1{,}0\\,\\text{s}}{0{,}01\\,\\text{s}} = 100\\,\\text{Schritte}\\).</p>'
      },
      {
        id: 'T01_Q2',
        title: 'Expliziter Euler: Vertikaler Fallschritt eines Prüfkörpers',
        shortSummary: 'Euler-Höhe $y_1$ nach 1 Schritt',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Ein Sensor-Prüfkörper startet zum Zeitpunkt \\(t_0 = 0\\,\\text{s}\\) in einer Höhe von \\(y_0 = 10{,}0\\,\\text{m}\\) mit einer vertikalen Anfangsgeschwindigkeit von \\(v_0 = -2{,}0\\,\\text{m/s}\\) (nach unten gerichtet). Die Erdbeschleunigung beträgt konstant \\(g = 9{,}81\\,\\text{m/s}^2\\) (nach unten wirkend, ohne Luftwiderstand).</p>' +
              '<p>Berechnen Sie die neue Höhe \\(y_1\\) (in <strong>Metern</strong>) nach exakt einem Zeitschritt der Länge \\(\\Delta t = 0{,}5\\,\\text{s}\\) mit dem <strong>expliziten Euler-Verfahren</strong> (Standard-Euler, bei dem der Orts-Update die Geschwindigkeit des alten Zeitschritts verwendet).</p>',
        answers: [
          { value: 9.0, tolerance: 0.01, fraction: 100, feedback: 'Exakt! Beim expliziten Euler gilt y_1 = y_0 + dt * v_0 = 10,0 + 0,5 * (-2,0) = 9,0 m.' },
          { value: 6.5475, tolerance: 0.05, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben die neue Geschwindigkeit v_1 = -6,905 m/s (semi-impliziter Euler) statt v_0 für den Orts-Update verwendet.' },
          { value: 11.0, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): Vorzeichenfehler bei der Anfangsgeschwindigkeit v_0 (+2,0 statt -2,0 m/s).' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (Expliziter Euler-Schritt):</strong></p>' +
                         '<p>Das Zustandsraummodell lautet \\(\\dot{y} = v\\) und \\(\\dot{v} = -g\\). Beim expliziten Euler-Verfahren werden alle Ableitungen zum alten Zeitpunkt \\(t_0\\) ausgewertet:</p>' +
                         '<p>\\(y_1 = y_0 + \\Delta t \\cdot v_0 = 10{,}0\\,\\text{m} + 0{,}5\\,\\text{s} \\cdot (-2{,}0\\,\\text{m/s}) = 9{,}0\\,\\text{m}\\).</p>' +
                         '<p>\\(v_1 = v_0 + \\Delta t \\cdot (-g) = -2{,}0\\,\\text{m/s} - 0{,}5\\,\\text{s} \\cdot 9{,}81\\,\\text{m/s}^2 = -6{,}905\\,\\text{m/s}\\) (wirkt beim expliziten Euler erst im zweiten Schritt auf \\(y_2\\)).</p>'
      },
      {
        id: 'T01_Q3',
        title: 'C#-Code-Tracing: Bgra32 Byte-Offset im BackBuffer',
        shortSummary: '`Bgra32` Byte-Index (`x=5, y=3`)',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Gegeben sei folgender C#-Codeausschnitt zur direkten Adressierung eines Pixels in einem <code>WriteableBitmap</code> mit dem Pixelformat <code>PixelFormats.Bgra32</code> (4 Bytes pro Pixel in der Reihenfolge Blau, Grün, Rot, Alpha):</p>' +
              '<pre><code class="language-csharp">int stride = 80; // BackBufferStride in Bytes\nint x = 5;\nint y = 3;\nint redByteIndex = y * stride + x * 4 + 2;</code></pre>' +
              '<p>Welchen exakten ganzzahligen Wert hat die Variable <code>redByteIndex</code> (Byte-Offset des Rot-Kanals relativ zum Pufferanfang) nach der Ausführung?</p>',
        answers: [
          { value: 262, tolerance: 0, fraction: 100, feedback: 'Richtig! 3 * 80 + 5 * 4 + 2 = 240 + 20 + 2 = 262.' },
          { value: 260, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben den Kanal-Offset +2 für Rot vergessen (260 ist der Index des Blau-Kanals).' },
          { value: 414, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben x und y vertauscht (5 * 80 + 3 * 4 + 2 = 414).' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (Lineare 1D-Speicheradressierung bei Bgra32):</strong></p>' +
                         '<p>1. Zeilen-Offset für Zeile \\(y = 3\\): \\(3 \\cdot 80\\,\\text{Bytes} = 240\\,\\text{Bytes}\\).</p>' +
                         '<p>2. Spalten-Offset für Spalte \\(x = 5\\): \\(5 \\cdot 4\\,\\text{Bytes} = 20\\,\\text{Bytes}\\) (Startadresse des Pixels bei Byte 260 = Blau-Kanal).</p>' +
                         '<p>3. Im Format <code>Bgra32</code> liegt Blau auf Offset <code>+0</code>, Grün auf <code>+1</code>, Rot auf <code>+2</code> und Alpha auf <code>+3</code>. Damit ergibt sich <code>redByteIndex = 240 + 20 + 2 = 262</code>.</p>'
      },
      {
        id: 'T01_Q4',
        title: 'C#-Lückentext: Double-Buffering beim 5-Punkt-Stern',
        shortSummary: '5-Punkt-Stern mit `Array.Copy`',
        type: 'gapselect',
        grade: 1.0,
        text: '<p>Vervollständigen Sie den folgenden C#-Code für einen expliziten 2D-Wärmeleitungsschritt auf den flachen 1D-Arrays <code>T</code> (aktueller Zustand) und <code>T_next</code> (neuer Zustand) einer Gitterbreite <code>nx</code>:</p>' +
              '<pre><code class="language-csharp">int idx = y * nx + x;\ndouble laplace = T[idx - 1] + T[idx + 1] + T[idx - nx] + T[idx + nx] - [[1]] * T[idx];\n[[2]][idx] = T[idx] + s * laplace;\n// Nach Abschluss beider Raumschleifen (x, y):\n[[3]](T_next, T, T.Length);</code></pre>',
        choices: [
          { text: '4.0', group: 1 },
          { text: 'T_next', group: 2 },
          { text: 'Array.Copy', group: 3 },
          { text: '2.0', group: 1 },
          { text: '8.0', group: 1 },
          { text: 'T', group: 2 },
          { text: 'T_old', group: 2 },
          { text: 'Array.Clear', group: 3 },
          { text: 'Buffer.Equals', group: 3 }
        ],
        generalFeedback: '<p><strong>Erklärung des 2D-FDM-Codes:</strong></p>' +
                         '<ul><li><code>[[1]] = 4.0</code>: Im 2D-5-Punkt-Stern stehen den 4 Nachbarknoten (links, rechts, oben, unten) das \\(-4\\)-fache des Zentralknotens gegenüber.</li>' +
                         '<li><code>[[2]] = T_next</code>: Um In-Place-Überschreibfehler (Gauß-Seidel-Verfälschung während der laufenden Iteration) zu verhindern, muss zwingend in das separate Ziel-Array <code>T_next</code> geschrieben werden.</li>' +
                         '<li><code>[[3]] = Array.Copy</code>: Nach Abschluss des gesamten Zeitschritts wird der neue Zustand für den nächsten Schritt in <code>T</code> übernommen.</li></ul>'
      },
      {
        id: 'T01_Q5',
        title: 'Konzept-Zuordnung: Modelltheorie (Stachowiak) & Digitaler Zwilling (Kritzinger)',
        shortSummary: 'Stachowiak-Merkmale & Kritzinger',
        type: 'matching',
        grade: 1.0,
        text: '<p>Ordnen Sie die folgenden Beschreibungen den korrekten Begriffen der Allgemeinen Modelltheorie (nach Stachowiak) bzw. den Integrationsstufen nach Kritzinger et al. zu. Beachten Sie die zwei Überhang-Distraktoren.</p>',
        subquestions: [
          { text: 'Ein Modell erfasst niemals alle Eigenschaften des Originals, sondern lässt irrelevante Details gezielt weg.', answer: 'Verkürzungsmerkmal (Präterition)' },
          { text: 'Ein Modell gilt nicht absolut, sondern immer nur für bestimmte Subjekte, eine Zeitspanne und einen klaren Zweck.', answer: 'Pragmatisches Merkmal' },
          { text: 'Reiner Simulationsentwurf ohne jeglichen automatischen Datenaustausch mit dem realen physischen Objekt.', answer: 'Digital Model (Digitales Modell)' },
          { text: 'Vollautomatischer, bidirektionaler Datenfluss: Sensordaten aktualisieren das Modell, das Modell steuert Aktoren.', answer: 'Digital Twin (Digitaler Zwilling)' },
          { text: '', answer: 'Digital Shadow (Digitaler Schatten)' },
          { text: '', answer: 'Abundant-Merkmal (Redundanz)' }
        ],
        generalFeedback: '<p><strong>Erklärung (Modelltheorie & Kritzinger-Klassifikation):</strong></p>' +
                         '<ul><li><strong>Verkürzungsmerkmal:</strong> Gezielte Abstraktion durch Weglassen irrelevanter Attribute.</li>' +
                         '<li><strong>Pragmatisches Merkmal:</strong> Zweck-, Nutzer- und Zeitgebundenheit jedes Modells (Für wen? Wann? Wozu?).</li>' +
                         '<li><strong>Digital Model:</strong> Rein manueller Datenfluss in beide Richtungen.</li>' +
                         '<li><strong>Digital Shadow:</strong> Automatischer Datenfluss vom physischen zum digitalen Objekt, aber manueller Rückfluss.</li>' +
                         '<li><strong>Digital Twin:</strong> Vollautomatischer Datenfluss in beide Richtungen (Closed-Loop).</li></ul>'
      },
      {
        id: 'T01_Q6',
        title: 'Numerische Analyse:Lokaler und globaler Fehler beim expliziten Euler',
        shortSummary: 'Halbierung von $\\Delta t$ bei Euler (Ordnung 1)',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Bei der Simulation einer Wurfparabel mit dem expliziten Euler-Verfahren wird die konstante Zeitschrittweite \\(\\Delta t\\) für einen zweiten Simulationslauf exakt <strong>halbiert</strong> (\\(\\Delta t_{\\text{neu}} = 0{,}5 \\cdot \\Delta t_{\\text{alt}}\\)). Wie verändern sich dadurch der lokale Abbruchfehler pro Einzelschritt und der globale Gesamtfehler zur festen Endzeit \\(T\\)?</p>',
        answers: [
          {
            text: 'Der lokale Fehler pro Schritt sinkt auf ein Viertel, während sich der globale Fehler am Ende halbiert.',
            fraction: 100,
            feedback: 'Richtig! Der lokale Fehler ist O(dt^2) -> Faktor 1/4; durch die doppelte Schrittanzahl akkumuliert sich der globale Fehler auf O(dt) -> Faktor 1/2.'
          },
          {
            text: 'Sowohl der lokale Fehler pro Schritt als auch der globale Fehler am Ende halbieren sich exakt linear.',
            fraction: 0,
            feedback: 'Falsch. Der lokale Taylor-Abbruchfehler pro Einzelschritt skaliert quadratisch mit dt^2, nicht linear.'
          },
          {
            text: 'Der lokale Fehler pro Schritt sinkt auf ein Achtel, während der globale Fehler auf ein Viertel sinkt.',
            fraction: 0,
            feedback: 'Falsch. Diese Fehlerordnung (lokal O(dt^3), global O(dt^2)) gilt für das Heun-Verfahren (RK2), nicht für den expliziten Euler.'
          },
          {
            text: 'Der lokale Fehler pro Schritt halbiert sich, während der globale Fehler durch die Schrittanzahl gleich bleibt.',
            fraction: 0,
            feedback: 'Falsch. Wäre der lokale Fehler nur O(dt), wäre das Verfahren nicht einmal konsistent und würde nicht konvergieren.'
          }
        ],
        generalFeedback: '<p><strong>Herleitung (Fehlerordnung des expliziten Euler-Verfahrens):</strong></p>' +
                         '<p>Aus der Taylor-Entwicklung \\(y(t + \\Delta t) = y(t) + \\Delta t \\cdot \\dot{y}(t) + \\frac{\\Delta t^2}{2}\\ddot{y}(\\xi)\\) folgt für den lokalen Fehler eines Einzelschritts \\(e_{\\text{lokal}} \\in \\mathcal{O}(\\Delta t^2)\\). Bei Halbierung von \\(\\Delta t\\) sinkt er auf \\((1/2)^2 = 1/4\\).</p>' +
                         '<p>Da für das feste Zeitintervall \\([0, T]\\) nun doppelt so viele Schritte (\\(N = T / \\Delta t\\)) ausgeführt werden, summiert sich der globale Fehler zu \\(E_{\\text{global}} \\approx N \\cdot e_{\\text{lokal}} \\propto \\frac{1}{\\Delta t} \\cdot \\Delta t^2 = \\mathcal{O}(\\Delta t^1)\\). Der globale Fehler halbiert sich somit.</p>'
      },
      {
        id: 'T01_Q7',
        title: 'C#-Bug-Diagnose: In-Place-Überschreibung im 2D-Wärmeraster',
        shortSummary: 'Find the Bug: In-Place-Update im 5-Punkt-Stern',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Ein Studierender implementiert den expliziten 2D-Wärmeleitungsschritt (5-Punkt-Stern) mit folgender Doppelschleife auf einem einzigen Array <code>double[,] T</code>:</p>' +
              '<pre><code class="language-csharp">for (int y = 1; y < ny - 1; y++)\n    for (int x = 1; x < nx - 1; x++)\n        T[x, y] = T[x, y] + s * (T[x-1, y] + T[x+1, y] + T[x, y-1] + T[x, y+1] - 4.0 * T[x, y]);</code></pre>' +
              '<p>Welcher fundamentale numerische Fehler tritt bei dieser Implementierung auf?</p>',
        answers: [
          {
            text: 'Die Knoten x-1 und y-1 wurden im selben Schritt bereits überschrieben und verfälschen die Symmetrie.',
            fraction: 100,
            feedback: 'Richtig! Durch das Fehlen eines zweiten Puffers (Double-Buffering) greift T[x-1, y] und T[x, y-1] bereits auf Werte des neuen Zeitschritts n+1 statt n zu.'
          },
          {
            text: 'Der Vorfaktor 4.0 vor dem Zentralknoten T[x, y] muss bei einem 2D-Gitter zwingend 2.0 lauten.',
            fraction: 0,
            feedback: 'Falsch. In 2D setzt sich der Laplace-Operator aus d^2T/dx^2 und d^2T/dy^2 zusammen, sodass -2 - 2 = -4 völlig korrekt ist.'
          },
          {
            text: 'Die Schleifengrenzen 1 bis nx-1 erzeugen bei den Zugriffen x-1 und x+1 eine IndexOutOfRangeException.',
            fraction: 0,
            feedback: 'Falsch. Genau weil die Schleife bei 1 startet und bei nx-2 endet, liegen x-1 (>= 0) und x+1 (<= nx-1) sicher innerhalb der Array-Grenzen.'
          },
          {
            text: 'In C# müssen mehrdimensionale Arrays immer spaltenweise mit x als äußerer Schleife durchlaufen werden.',
            fraction: 0,
            feedback: 'Falsch. Die Schleifenreihenfolge ändert bei In-Place-Updates nur die Richtung der asymmetrischen Drift, behebt aber nicht das fehlende Double-Buffering.'
          }
        ],
        generalFeedback: '<p><strong>Fehleranalyse (Fehlendes Double-Buffering):</strong></p>' +
                         '<p>Das explizite Euler-Verfahren verlangt zwingend, dass alle Nachbarwerte auf der rechten Seite der Gleichung aus dem alten Zeitschritt \\(n\\) stammen. Schreibt man direkt in <code>T[x, y]</code> zurück, enthalten <code>T[x-1, y]</code> und <code>T[x, y-1]</code> beim Weiterwandern der Schleife bereits die neuen Temperaturen \\(T^{n+1}\\), was zu einer gerichteten numerischen Verzerrung führt.</p>'
      },
      {
        id: 'T01_Q8',
        title: 'Systemanalyse: WriteableBitmap & Physikalische Randbedingungen',
        shortSummary: 'WriteableBitmap Pipeline & Neumann-Rand',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: '<p>Welche der folgenden Aussagen zur hochperformanten 2D-Visualisierung mit <code>WriteableBitmap</code> und zur numerischen Behandlung von Randbedingungen im Wärmeraster sind <strong>korrekt</strong>? (Mehrere Antworten möglich)</p>',
        answers: [
          {
            text: 'Ohne den Aufruf von AddDirtyRect zwischen Lock und Unlock überträgt WPF keine geänderten Pixel zur GPU.',
            fraction: 50,
            feedback: 'Richtig! AddDirtyRect markiert den geänderten Speicherbereich für den Render-Thread; ohne diesen Aufruf bleibt das Bild trotz Pointer-Schreibzugriff unverändert.'
          },
          {
            text: 'Ein thermisch perfekt isolierter Plattenrand wird durch Gleichsetzen des Randknotens mit dem Nachbarn modelliert.',
            fraction: 50,
            feedback: 'Richtig! Eine homogene Neumann-Randbedingung (dT/dn = 0, kein Wärmefluss) bedeutet T_Rand = T_innen.'
          },
          {
            text: 'Die Eigenschaft BackBufferStride gibt die Bildbreite immer in der Einheit Anzahl der Pixel pro Zeile zurück.',
            fraction: -50,
            feedback: 'Falsch! BackBufferStride liefert die Zeilenlänge in Bytes (inklusive eventuellem GPU-Alignment-Padding), nicht in Pixeln.'
          },
          {
            text: 'Für jedes einzelne Pixel auf dem Bildschirm sollte zur Laufzeit ein eigenes WPF-Rectangle-Objekt erzeugt werden.',
            fraction: -50,
            feedback: 'Falsch! Bei z. B. 500x500 = 250.000 Pixeln überlastet ein solcher Retained-Mode-Visual-Tree den Layout- und Garbage-Collection-Prozess massiv.'
          }
        ],
        generalFeedback: '<p><strong>Zusammenfassung:</strong></p>' +
                         '<ul><li>In der <code>WriteableBitmap</code>-Pipeline (<code>Lock()</code> &rarr; <code>BackBuffer</code> beschreiben &rarr; <code>AddDirtyRect()</code> &rarr; <code>Unlock()</code>) teilt erst <code>AddDirtyRect</code> dem WPF-Kompositor mit, welcher Bereich neu auf die Grafikkarte geladen werden muss.</li>' +
                         '<li>Ein adiabater (isolierter) Rand entspricht einer homogenen Neumann-Bedingung \\(\\frac{\\partial T}{\\partial n} = 0\\), diskretisiert als \\(T_0 = T_1\\).</li>' +
                         '<li><code>BackBufferStride</code> ist in <strong>Bytes</strong> angegeben (oft \\(\\ge \\text{Width} \\cdot 4\\)), und <code>WriteableBitmap</code> vermeidet genau den Overhead tausender einzelner WPF-UI-Objekte.</li></ul>'
      }
    ]
  },

  // =========================================================================
  // TEST 02 (VORBEREITUNG)
  // =========================================================================
  {
    id: 'Test_02_Vorbereitung',
    title: 'Test 02 (Vorbereitung) – Grundlagen, Euler & 2D-Wärmeraster (Variante B)',
    category: '$course$/Quiz_01_Termin_03/Test_02_Vorbereitung',
    isPractice: true,
    questions: [
      {
        id: 'T02_Q1',
        title: '2D-Wärmeleitung: Stabilitätszahl & 5-Punkt-Stern-Temperaturupdate',
        shortSummary: 'Fourier-Zahl $s$ & neue Temperatur $T_{i,j}^{n+1}$',
        type: 'cloze',
        grade: 2.0,
        text: '<p>Auf einem quadratischen 2D-Gitter mit der Gitterweite \\(\\Delta x = \\Delta y = 5{,}0\\,\\text{mm}\\) wird ein Wärmeleitungsprozess (\\(\\alpha = 50\\,\\text{mm}^2/\\text{s}\\)) mit einer Zeitschrittweite von \\(\\Delta t = 0{,}10\\,\\text{s}\\) simuliert. Zum Zeitpunkt \\(n\\) besitzt der Zentralknoten \\((i,j)\\) die Temperatur \\(T_{i,j}^n = 20{,}0\\,^\\circ\\text{C}\\), während seine vier direkten Nachbarknoten die Temperaturen \\(100{,}0\\,^\\circ\\text{C}\\) (links), \\(20{,}0\\,^\\circ\\text{C}\\) (rechts), \\(20{,}0\\,^\\circ\\text{C}\\) (oben) und \\(20{,}0\\,^\\circ\\text{C}\\) (unten) aufweisen.</p>' +
              '<p>a) Berechnen Sie die dimensionslose numerische Fourier-/Stabilitätszahl \\(s\\) für diese Parametrierung:<br>' +
              'Antwort: {1:NUMERICAL:=0.2:0.005#Richtig! s = (alpha * dt) / dx^2 = (50 * 0,10) / 25 = 5 / 25 = 0,20 (stabil, da <= 0,25).~%50%1.0:0.01#Teilpunkte (50 %): Sie haben im Nenner dx = 5 statt dx^2 = 25 geteilt.} (dimensionslos)</p>' +
              '<p>b) Welche neue Temperatur \\(T_{i,j}^{n+1}\\) (in <strong>°C</strong>) nimmt der Zentralknoten nach genau einem expliziten Zeitschritt an?<br>' +
              'Antwort: {1:NUMERICAL:=36.0:0.1#Richtig! T_neu = 20 + 0,20 * (100 + 20 + 20 + 20 - 4 * 20) = 20 + 0,20 * 80 = 36,0 °C.~%50%52.0:0.1#Teilpunkte (50 %): Sie haben im 5-Punkt-Stern -2*T_ij statt -4*T_ij gerechnet (20 + 0,2 * 160 = 52 °C).} °C</p>',
        generalFeedback: '<p><strong>Musterherleitung (5-Punkt-Stern-Update):</strong></p>' +
                         '<p>1. Dimensionslose Stabilitätszahl \\(s\\):<br>\\(s = \\frac{\\alpha \\cdot \\Delta t}{\\Delta x^2} = \\frac{50\\,\\text{mm}^2/\\text{s} \\cdot 0{,}10\\,\\text{s}}{(5{,}0\\,\\text{mm})^2} = \\frac{5}{25} = 0{,}20\\). Da \\(s = 0{,}20 \\le 0{,}25\\), ist das Verfahren numerisch stabil.</p>' +
                         '<p>2. Diskreter 5-Punkt-Stern:<br>\\(T_{i,j}^{n+1} = T_{i,j}^n + s \\cdot \\left(T_{i-1,j}^n + T_{i+1,j}^n + T_{i,j-1}^n + T_{i,j+1}^n - 4 \\cdot T_{i,j}^n\\right)\\)<br>' +
                         '\\(T_{i,j}^{n+1} = 20{,}0 + 0{,}20 \\cdot (100{,}0 + 20{,}0 + 20{,}0 + 20{,}0 - 4 \\cdot 20{,}0) = 20{,}0 + 0{,}20 \\cdot 80{,}0 = 36{,}0\\,^\\circ\\text{C}\\).</p>'
      },
      {
        id: 'T02_Q2',
        title: 'Ereigniserkennung: Lineare Interpolation des Boden-Auftreffzeitpunkts',
        shortSummary: 'Interpolierter Auftreffzeitpunkt $t_{\\text{impact}}$',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Bei der Simulation eines fallenden Balls wird die Bodenebene bei \\(y = 0{,}0\\,\\text{m}\\) zwischen zwei diskreten Zeitschritten durchschlagen: Zum Zeitpunkt \\(t_n = 1{,}00\\,\\text{s}\\) befindet sich der Ball noch oberhalb des Bodens bei \\(y_n = +0{,}60\\,\\text{m}\\), zum nächsten Zeitpunkt \\(t_{n+1} = 1{,}10\\,\\text{s}\\) liefert der Zeitschritt bereits eine Eindringtiefe von \\(y_{n+1} = -0{,}20\\,\\text{m}\\).</p>' +
              '<p>Berechnen Sie mittels <strong>linearer Sub-Step-Interpolation</strong> den präzisen Auftreffzeitpunkt \\(t_{\\text{impact}}\\) (in <strong>Sekunden</strong>), an dem \\(y(t_{\\text{impact}}) = 0\\) galt.</p>',
        answers: [
          { value: 1.075, tolerance: 0.002, fraction: 100, feedback: 'Exakt! tau = 0,60 / (0,60 - (-0,20)) = 0,60 / 0,80 = 0,75 -> t_impact = 1,00 + 0,75 * 0,10 = 1,075 s.' },
          { value: 0.75, tolerance: 0.005, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben den relativen Teilfaktor tau = 0,75 berechnet, aber noch nicht in den Zeitpunkt t_impact = t_n + tau * dt umgerechnet.' },
          { value: 1.025, tolerance: 0.002, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben den komplementären Faktor (1 - tau) = 0,25 statt tau = 0,75 zu t_n addiert.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (Lineare Nullstellen-Interpolation):</strong></p>' +
                         '<p>Der relative Zeitschrittanteil \\(\\tau \\in [0, 1]\\) bis zum Nulldurchgang beträgt:</p>' +
                         '<p>\\(\\tau = \\frac{y_n}{y_n - y_{n+1}} = \\frac{0{,}60\\,\\text{m}}{0{,}60\\,\\text{m} - (-0{,}20\\,\\text{m})} = \\frac{0{,}60}{0{,}80} = 0{,}75\\).</p>' +
                         '<p>Mit \\(\\Delta t = t_{n+1} - t_n = 0{,}10\\,\\text{s}\\) folgt für den interpolierten Auftreffzeitpunkt:<br>' +
                         '\\(t_{\\text{impact}} = t_n + \\tau \\cdot \\Delta t = 1{,}00\\,\\text{s} + 0{,}75 \\cdot 0{,}10\\,\\text{s} = 1{,}075\\,\\text{s}\\).</p>'
      },
      {
        id: 'T02_Q3',
        title: 'C#-Code-Tracing: Bit-Shifting für Little-Endian Bgra32-Farbwerte',
        shortSummary: '`uint` Bit-Shift Farbkanal-Extraktion',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Auf einer Little-Endian-Architektur (x86/x64) wird ein ganzes Pixel eines <code>WriteableBitmap</code> (Format <code>Bgra32</code>) als einzelner 32-Bit-Wert <code>uint color = 0xFF804020;</code> im Speicher abgelegt (Byte 0 = Blau, Byte 1 = Grün, Byte 2 = Rot, Byte 3 = Alpha). Gegeben sei folgender C#-Ausdruck:</p>' +
              '<pre><code class="language-csharp">uint color = 0xFF804020;\nbyte channelValue = (byte)((color >> 8) & 0xFF);</code></pre>' +
              '<p>Welchen <strong>dezimalen</strong> Zahlenwert (Basis 10) besitzt die Variable <code>channelValue</code> (Grün-Kanal) nach der Ausführung?</p>',
        answers: [
          { value: 64, tolerance: 0, fraction: 100, feedback: 'Richtig! Durch >> 8 rückt das zweite Byte von rechts (0x40) an die unterste Position; 0x40 hex entspricht 4 * 16 = 64 dezimal.' },
          { value: 40, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben das richtige Byte 0x40 isoliert, aber den Hexadezimalwert 40 nicht ins Dezimalsystem (4 * 16 = 64) umgerechnet.' },
          { value: 128, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): 128 (0x80) ist der Rot-Kanal bei Bit-Shift >> 16, nicht bei >> 8.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (Little-Endian uint-Layout bei Bgra32):</strong></p>' +
                         '<p>Ein 32-Bit-Wert <code>0xAARRGGBB</code> enthält in den Bits <code>0..7</code> Blau (<code>0x20 = 32</code>), in den Bits <code>8..15</code> Grün (<code>0x40 = 64</code>), in den Bits <code>16..23</code> Rot (<code>0x80 = 128</code>) und in den Bits <code>24..31</code> Alpha (<code>0xFF = 255</code>).</p>' +
                         '<p>Die Operation <code>color >> 8</code> schiebt den Wert um 8 Bits nach rechts zu <code>0x00FF8040</code>. Die anschließende Bitmaske <code>&amp; 0xFF</code> isoliert das niederwertigste Byte <code>0x40</code>, was im Dezimalsystem \\(4 \\cdot 16^1 + 0 \\cdot 16^0 = 64\\) ergibt.</p>'
      },
      {
        id: 'T02_Q4',
        title: 'C#-Lückentext: Unsafe-Pointer-Schreibzugriff in WriteableBitmap',
        shortSummary: '`unsafe` Pointer-Zugriff auf `BackBuffer`',
        type: 'gapselect',
        grade: 1.0,
        text: '<p>Vervollständigen Sie den folgenden C#-Codeausschnitt, der innerhalb eines <code>unsafe</code>-Blocks ein Pixel an den Koordinaten <code>(x, y)</code> im Speicher eines bereits gesperrten <code>WriteableBitmap bmp</code> einfärbt:</p>' +
              '<pre><code class="language-csharp">unsafe\n{\n    byte* pBuffer = (byte*)bmp.[[1]];\n    int stride = bmp.[[2]];\n    int offset = y * stride + x * [[3]];\n    pBuffer[offset + 0] = blue;\n    pBuffer[offset + 1] = green;\n    pBuffer[offset + 2] = red;\n    pBuffer[offset + 3] = 255;\n}</code></pre>',
        choices: [
          { text: 'BackBuffer', group: 1 },
          { text: 'BackBufferStride', group: 2 },
          { text: '4', group: 3 },
          { text: 'PixelWidth', group: 1 },
          { text: 'SourceRect', group: 1 },
          { text: 'PixelHeight', group: 2 },
          { text: 'DpiX', group: 2 },
          { text: '3', group: 3 },
          { text: '8', group: 3 }
        ],
        generalFeedback: '<p><strong>Erklärung der WriteableBitmap-Eigenschaften:</strong></p>' +
                         '<ul><li><code>[[1]] = BackBuffer</code> liefert den <code>IntPtr</code> auf die Basisadresse des unverwalteten Bildspeichers.</li>' +
                         '<li><code>[[2]] = BackBufferStride</code> gibt die exakte Zeilenbreite in Bytes (inklusive eventuellem Alignment-Padding) an.</li>' +
                         '<li><code>[[3]] = 4</code> entspricht den 4 Bytes pro Pixel im Format <code>Bgra32</code> (Blau, Grün, Rot, Alpha).</li></ul>'
      },
      {
        id: 'T02_Q5',
        title: 'Pipeline-Reihenfolge: WriteableBitmap Render-Zyklus in WPF',
        shortSummary: '`WriteableBitmap` Update-Pipeline (`Lock`..`Unlock`)',
        type: 'ddwtos',
        grade: 1.0,
        text: '<p>Bringen Sie die vier erforderlichen Methodenschritte zur Aktualisierung eines <code>WriteableBitmap</code>-Puffers in WPF in die zwingend einzuhaltende zeitliche Ausführungsreihenfolge:</p>' +
              '<p>Schritt 1 (Puffer für den UI-Thread sperren): [[1]]<br>' +
              'Schritt 2 (Farbwerte im unverwalteten Speicher berechnen): [[2]]<br>' +
              'Schritt 3 (Geänderten Bildbereich für die GPU-Übertragung vormerken): [[3]]<br>' +
              'Schritt 4 (Sperre aufheben und Austausch mit dem FrontBuffer freigeben): [[4]]</p>',
        dragboxes: [
          { text: 'bmp.Lock()', group: 1 },
          { text: 'Schreiben über BackBuffer-Pointer', group: 1 },
          { text: 'bmp.AddDirtyRect(new Int32Rect(0, 0, w, h))', group: 1 },
          { text: 'bmp.Unlock()', group: 1 },
          { text: 'bmp.Freeze()', group: 1 },
          { text: 'bmp.Clone()', group: 1 }
        ],
        generalFeedback: '<p><strong>Erklärung der WriteableBitmap-Pipeline:</strong></p>' +
                         '<p>Vor jedem Direktzugriff auf den <code>BackBuffer</code> muss dieser mit <code>bmp.Lock()</code> gesperrt werden. Nach dem Beschreiben der Bytes via Pointer muss zwingend <em>vor</em> dem Aufruf von <code>bmp.Unlock()</code> mittels <code>bmp.AddDirtyRect(...)</code> definiert werden, welches Rechteck auf die GPU kopiert werden soll.</p>'
      },
      {
        id: 'T02_Q6',
        title: 'System-Taxonomie: Klassifikation des 2D-FDM-Wärmeleitungsmodells',
        shortSummary: 'Taxonomie: Deterministisch, zeitdiskret, verteilt',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Wie lässt sich die explizite 2D-Finite-Differenzen-Simulation der Wärmeleitungsgleichung auf einem Pixelgitter in der systemtheoretischen Modell-Taxonomie präzise einordnen?</p>',
        answers: [
          {
            text: 'Es ist ein deterministisches, in der numerischen Berechnung zeitdiskretes Modell mit verteilten Parametern.',
            fraction: 100,
            feedback: 'Richtig! Es gibt keinen Zufall (deterministisch), Zeitschritte dt (zeitdiskret) und eine Ortsabhängigkeit T(x,y,t) aus einer PDE (verteilte Parameter).'
          },
          {
            text: 'Es ist ein stochastisches, rein statisches Modell mit konzentrierten Parametern ohne jede Ortsabhängigkeit.',
            fraction: 0,
            feedback: 'Falsch. Das Temperaturfeld hängt sowohl von der Zeit t (dynamisch) als auch von den Raumkoordinaten (x,y) ab und enthält keine Zufallsgrößen.'
          },
          {
            text: 'Es ist ein ereignisdiskretes Warteschlangenmodell, bei dem Zeitschritte nur bei Kundenankünften stattfinden.',
            fraction: 0,
            feedback: 'Falsch. Das FDM-Wärmeraster rechnet mit äquidistanten Zeitschritten dt (Time-Stepping), nicht ereignisgetrieben (Event-Advance).'
          },
          {
            text: 'Es ist ein rein analytisches geschlossenes Modell, das völlig ohne räumliche oder zeitliche Diskretisierung auskommt.',
            fraction: 0,
            feedback: 'Falsch. Die Finite-Differenzen-Methode beruht gerade auf der räumlichen (dx, dy) und zeitlichen (dt) Gitter-Diskretisierung.'
          }
        ],
        generalFeedback: '<p><strong>Einordnung in die System-Taxonomie:</strong></p>' +
                         '<ul><li><strong>Deterministisch vs. stochastisch:</strong> Gleiche Anfangs- und Randbedingungen liefern exakt dasselbe Temperaturfeld (deterministisch).</li>' +
                         '<li><strong>Verteilte vs. konzentrierte Parameter:</strong> Da die Zustandsgröße \\(T(x,y,t)\\) vom Ort abhängt (partielle Differentialgleichung, PDE), liegt ein System mit verteilten Parametern vor.</li>' +
                         '<li><strong>Zeitdiskret:</strong> Durch die Euler-Diskretisierung wird der Zustand zu diskreten Zeitpunkten \\(t_n = n \\cdot \\Delta t\\) berechnet.</li></ul>'
      },
      {
        id: 'T02_Q7',
        title: 'C#-Bug-Diagnose: Fehlende Kanal-Multiplikation beim Bgra32-Pointer',
        shortSummary: 'Find the Bug: `x` statt `x * 4` bei `byte*`',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Ein Entwickler möchte in einem <code>WriteableBitmap</code> (Format <code>Bgra32</code>, 4 Bytes pro Pixel) das Pixel an der Spalte <code>x</code> und Zeile <code>y</code> über einen <code>byte*</code>-Pointer weiß färben und schreibt:</p>' +
              '<pre><code class="language-csharp">byte* p = (byte*)bmp.BackBuffer;\nint idx = y * bmp.BackBufferStride + x;\np[idx] = 255; p[idx + 1] = 255; p[idx + 2] = 255; p[idx + 3] = 255;</code></pre>' +
              '<p>Welches visuelle Fehlverhalten entsteht durch diesen Code auf dem Bildschirm?</p>',
        answers: [
          {
            text: 'Da x nicht mit 4 multipliziert wird, verschieben sich die Kanäle pro Spalte um ein Byte und das Bild wird gestaucht.',
            fraction: 100,
            feedback: 'Richtig! Bei einem byte*-Pointer adressiert +x nur das x-te Byte statt des x-ten Pixels (x * 4), wodurch Farbkanäle benachbarter Pixel überschrieben werden.'
          },
          {
            text: 'Der Code funktioniert fehlerfrei, weil der C#-Compiler den Offset x bei Bgra32 automatisch mit vier multipliziert.',
            fraction: 0,
            feedback: 'Falsch. Ein Zeiger vom Typ byte* hat die Elementgröße 1 Byte; eine automatische Skalierung um 4 erfolgt nur bei einem uint*- oder int*-Pointer.'
          },
          {
            text: 'Die Eigenschaft BackBufferStride muss in dieser Formel noch zusätzlich mit vier multipliziert werden.',
            fraction: 0,
            feedback: 'Falsch. BackBufferStride ist bereits in Bytes angegeben (ca. Width * 4) und darf nicht erneut mit 4 multipliziert werden.'
          },
          {
            text: 'Durch den Wert 255 im vierten Byte p[idx + 3] wird das Pixel auf dem Bildschirm vollständig transparent.',
            fraction: 0,
            feedback: 'Falsch. Ein Alpha-Wert von 255 (0xFF) bedeutet 100 % Deckkraft (opak), während 0 vollständig transparent wäre.'
          }
        ],
        generalFeedback: '<p><strong>Fehleranalyse (Byte-Offset vs. Pixel-Offset):</strong></p>' +
                         '<p>Da <code>p</code> als <code>byte*</code> deklariert ist, bewegt sich der Zeiger in 1-Byte-Schritten. Jedes Pixel im Format <code>Bgra32</code> belegt jedoch 4 Bytes. Ohne die Multiplikation <code>x * 4</code> landet Spalte <code>x = 1</code> im Grün-Kanal von Pixel 0, was zu falschen Farben und einer horizontalen Stauchung auf ein Viertel der Bildbreite führt.</p>'
      },
      {
        id: 'T02_Q8',
        title: 'Numerische Stabilität: Verhalten bei Überschreitung der CFL-Grenze',
        shortSummary: 'CFL-Verletzung ($s > 0{,}25$) & Schachbrett-Oszillation',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: '<p>Was passiert in einer expliziten 2D-Wärmeleitungssimulation (5-Punkt-Stern), wenn die dimensionslose Stabilitätszahl \\(s = \\frac{\\alpha \\cdot \\Delta t}{\\Delta x^2}\\) durch eine zu große Zeitschrittweite oder eine Gitterverfeinerung den kritischen Grenzwert von \\(0{,}25\\) überschreitet? (Mehrere Antworten möglich)</p>',
        answers: [
          {
            text: 'Das Gewicht des Zentralknotens (1 - 4s) wird negativ und erzeugt unphysikalische Schachbrett-Oszillationen.',
            fraction: 50,
            feedback: 'Richtig! Für s > 0,25 wird der Faktor (1 - 4s) < 0, sodass ein heißer Knoten im nächsten Schritt kälter als seine kalten Nachbarn werden kann.'
          },
          {
            text: 'Bei einer Halbierung der Gitterweite dx muss die Zeitschrittweite dt mindestens geviertelt werden, um stabil zu bleiben.',
            fraction: 50,
            feedback: 'Richtig! Da dx im Nenner quadratisch eingeht (s = alpha * dt / dx^2), vervierfacht eine Halbierung von dx den Wert von s bei konstantem dt.'
          },
          {
            text: 'Die Simulation bleibt für beliebig große Zeitschritte stabil, verliert aber geringfügig an Genauigkeit.',
            fraction: -50,
            feedback: 'Falsch! Unbedingte Stabilität gilt nur für implizite Verfahren; das explizite Verfahren divergiert für s > 0,25 exponentiell.'
          },
          {
            text: 'Eine Erhöhung der Temperaturleitfähigkeit alpha vergrößert den zulässigen stabilen Zeitschritt dt_max.',
            fraction: -50,
            feedback: 'Falsch! Wegen dt_max = dx^2 / (4 * alpha) steht alpha im Nenner: Schnellere Wärmeleitung erfordert kleinere Zeitschritte.'
          }
        ],
        generalFeedback: '<p><strong>Zusammenfassung (2D-Stabilitätsgrenze):</strong></p>' +
                         '<p>Schreibt man den 5-Punkt-Stern als Konvexkombination \\(T_{i,j}^{n+1} = (1 - 4s) T_{i,j}^n + s (T_{i-1,j}^n + T_{i+1,j}^n + T_{i,j-1}^n + T_{i,j+1}^n)\\), erkennt man sofort: Sobald \\(s > 0{,}25\\) wird, ist \\(1 - 4s < 0\\). Rundungsfehler wachsen dann mit jedem Schritt im Vorzeichen alternierend an, bis <code>Double.PositiveInfinity</code> bzw. <code>NaN</code> erreicht wird.</p>'
      }
    ]
  },

  // =========================================================================
  // TEST 03 (VORBEREITUNG)
  // =========================================================================
  {
    id: 'Test_03_Vorbereitung',
    title: 'Test 03 (Vorbereitung) – Grundlagen, Euler & 2D-Wärmeraster (Variante C)',
    category: '$course$/Quiz_01_Termin_03/Test_03_Vorbereitung',
    isPractice: true,
    questions: [
      {
        id: 'T03_Q1',
        title: 'WriteableBitmap Speicherlayout: BackBufferStride & Pufferspeicher',
        shortSummary: '`BackBufferStride` & Speicherbedarf in KiB',
        type: 'cloze',
        grade: 2.0,
        text: '<p>Für eine hochauflösende 2D-Temperaturfeld-Visualisierung wird ein <code>WriteableBitmap</code> mit einer Breite von \\(W = 256\\,\\text{Pixeln}\\) und einer Höhe von \\(H = 128\\,\\text{Pixeln}\\) im Format <code>PixelFormats.Bgra32</code> (32 Bit pro Pixel, ohne zusätzliches Zeilen-Padding) angelegt.</p>' +
              '<p>a) Welchen exakten Wert liefert die Eigenschaft <code>BackBufferStride</code> (Länge einer Bildzeile) in <strong>Bytes</strong>?<br>' +
              'Antwort: {1:NUMERICAL:=1024:0#Richtig! 256 Pixel * 4 Bytes/Pixel = 1024 Bytes pro Zeile.~%50%256:0#Teilpunkte (50 %): Sie haben die Pixelanzahl (256) statt der Byte-Anzahl (256 * 4 = 1024) angegeben.~%50%8192:0#Teilpunkte (50 %): Sie haben mit 32 (Bits) statt mit 4 (Bytes) multipliziert.} Bytes</p>' +
              '<p>b) Wie groß ist das gesamte Speichervolumen des <code>BackBuffer</code> in <strong>Kibibyte (KiB)</strong> (wobei \\(1\\,\\text{KiB} = 1024\\,\\text{Bytes}\\) gilt)?<br>' +
              'Antwort: {1:NUMERICAL:=128:0.1#Richtig! (1024 Bytes/Zeile * 128 Zeilen) / 1024 Bytes/KiB = 128 KiB.~%50%131.072:0.1#Teilpunkte (50 %): Sie haben durch 1000 (kB) statt durch 1024 (KiB) geteilt.~%50%32:0.1#Teilpunkte (50 %): Folgefehler aus 1 Byte pro Pixel statt 4 Bytes pro Pixel.} KiB</p>',
        generalFeedback: '<p><strong>Musterherleitung (Bgra32-Speicherberechnung):</strong></p>' +
                         '<p>1. Im Format <code>Bgra32</code> belegt jedes Pixel \\(32\\,\\text{Bit} = 4\\,\\text{Bytes}\\). Bei \\(W = 256\\) Pixeln beträgt die Zeilenlänge:<br>' +
                         '\\(\\text{Stride} = 256 \\cdot 4\\,\\text{Bytes} = 1024\\,\\text{Bytes}\\).</p>' +
                         '<p>2. Bei \\(H = 128\\) Zeilen umfasst der Gesamtpuffer \\(1024\\,\\text{Bytes} \\cdot 128 = 131\\,072\\,\\text{Bytes}\\). Umgerechnet in Kibibyte (\\(1\\,\\text{KiB} = 1024\\,\\text{Bytes}\\)) sind das exakt \\(\\frac{131\\,072}{1024} = 128\\,\\text{KiB}\\).</p>'
      },
      {
        id: 'T03_Q2',
        title: 'Thermisches RC-Glied: Expliziter Euler vs. Heun-Verfahren (RK2)',
        shortSummary: 'Heun-Korrektorschritt (RK2) bei Abkühlung',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Die Abkühlung eines Bauteils auf Umgebungstemperatur (\\(0\\,^\\circ\\text{C}\\)) wird durch die Differentialgleichung \\(\\dot{T}(t) = -2{,}0\\,\\text{s}^{-1} \\cdot T(t)\\) beschrieben. Zum Zeitpunkt \\(t_0 = 0\\,\\text{s}\\) beträgt die Starttemperatur \\(T_0 = 100{,}0\\,^\\circ\\text{C}\\). Es wird ein Zeitschritt von \\(\\Delta t = 0{,}20\\,\\text{s}\\) betrachtet.</p>' +
              '<p>Berechnen Sie die neue Temperatur \\(T_1\\) (in <strong>°C</strong>) zum Zeitpunkt \\(t_1 = 0{,}20\\,\\text{s}\\) mit dem <strong>Heun-Verfahren (2-stufiges Prädiktor-Korrektor-Verfahren, RK2)</strong>.</p>',
        answers: [
          { value: 68.0, tolerance: 0.1, fraction: 100, feedback: 'Exakt! Prädiktor T_pred = 60 °C (k1 = -200, k2 = -120); Korrektor T_1 = 100 + 0,20 * 0,5 * (-200 + (-120)) = 68,0 °C.' },
          { value: 60.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte (50 %): 60,0 °C ist nur der Prädiktor-Zwischenwert (expliziter Euler-Schritt), der Korrektor-Mittelwertschritt fehlt noch.' },
          { value: 76.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben im Korrektorschritt versehentlich nur die Steigung k2 = -120 statt des Mittelwerts 0,5 * (k1 + k2) = -160 verwendet.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (Heun-Verfahren / RK2):</strong></p>' +
                         '<p>1. <strong>Steigung am Zeilenanfang (\\(k_1\\)):</strong><br>\\(k_1 = f(T_0) = -2{,}0 \\cdot 100{,}0 = -200{,}0\\,\\text{K/s}\\).</p>' +
                         '<p>2. <strong>Euler-Prädiktorschritt (\\(\\tilde{T}_1\\)):</strong><br>\\(\\tilde{T}_1 = T_0 + \\Delta t \\cdot k_1 = 100{,}0 + 0{,}20 \\cdot (-200{,}0) = 60{,}0\\,^\\circ\\text{C}\\).</p>' +
                         '<p>3. <strong>Steigung am Intervallende (\\(k_2\\)):</strong><br>\\(k_2 = f(\\tilde{T}_1) = -2{,}0 \\cdot 60{,}0 = -120{,}0\\,\\text{K/s}\\).</p>' +
                         '<p>4. <strong>Heun-Korrektorschritt (Trapezregel):</strong><br>\\(T_1 = T_0 + \\frac{\\Delta t}{2} \\cdot (k_1 + k_2) = 100{,}0 + 0{,}10 \\cdot (-200{,}0 - 120{,}0) = 100{,}0 - 32{,}0 = 68{,}0\\,^\\circ\\text{C}\\) (deutlich näher an der exakten Lösung \\(100 \\cdot e^{-0{,}4} \\approx 67{,}03\\,^\\circ\\text{C}\\) als der reine Euler-Wert \\(60{,}0\\,^\\circ\\text{C}\\)).</p>'
      },
      {
        id: 'T03_Q3',
        title: 'C#-Code-Tracing: Lineare Farbinterpolation (Lerp) für Heatmap',
        shortSummary: 'Farbkanal-Interpolation `Lerp` bei $T=45^\\circ\\text{C}$',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Um eine Temperatur <code>T</code> zwischen <code>Tmin = 20.0</code> und <code>Tmax = 120.0</code> in einen Rot-Farbkanal (zwischen <code>rCold = 50</code> und <code>rHot = 250</code>) umzurechnen, wird folgender C#-Code ausgeführt:</p>' +
              '<pre><code class="language-csharp">double T = 45.0;\ndouble u = Math.Clamp((T - 20.0) / (120.0 - 20.0), 0.0, 1.0);\nbyte red = (byte)(50 + u * (250 - 50));</code></pre>' +
              '<p>Welchen exakten Wert besitzt die Variable <code>red</code> nach der Ausführung?</p>',
        answers: [
          { value: 100, tolerance: 0, fraction: 100, feedback: 'Richtig! u = (45 - 20) / 100 = 0,25; red = 50 + 0,25 * 200 = 50 + 50 = 100.' },
          { value: 50, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): 50 ist nur der Zuwachs u * (250 - 50), Sie haben den Basiswert rCold = 50 am Anfang vergessen zu addieren.' },
          { value: 62, tolerance: 1, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben mit (250 + 50) = 300 oder ohne Subtraktion von rCold (0,25 * 250 = 62,5) gerechnet.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (Lineare Farbskalen-Interpolation):</strong></p>' +
                         '<p>1. Normierter Parameter \\(u \\in [0, 1]\\):<br>\\(u = \\frac{T - T_{\\min}}{T_{\\max} - T_{\\min}} = \\frac{45{,}0 - 20{,}0}{120{,}0 - 20{,}0} = \\frac{25{,}0}{100{,}0} = 0{,}25\\).</p>' +
                         '<p>2. Lineare Interpolation des Rot-Kanals:<br>\\(\\text{red} = 50 + 0{,}25 \\cdot (250 - 50) = 50 + 0{,}25 \\cdot 200 = 50 + 50 = 100\\).</p>'
      },
      {
        id: 'T03_Q4',
        title: 'C#-Lückentext: Sub-Step-Bodenreflexion mit Restitutionskoeffizient',
        shortSummary: 'Boden-Reflexion mit Interpolation $\\tau$',
        type: 'gapselect',
        grade: 1.0,
        text: '<p>Vervollständigen Sie den C#-Code zur physikalisch korrekten Behandlung einer Bodenkollision (Boden bei <code>y = 0</code>, Restitutionskoeffizient <code>e</code>), sobald der Zeitschritt von <code>yOld &gt; 0</code> nach <code>yNew &lt; 0</code> unter den Boden geführt hat:</p>' +
              '<pre><code class="language-csharp">if (yNew < 0.0)\n{\n    double tau = yOld / (yOld - [[1]]);\n    double vImpact = vOld - g * ([[2]] * dt);\n    vNew = [[3]] * vImpact;\n    yNew = 0.0;\n}</code></pre>',
        choices: [
          { text: 'yNew', group: 1 },
          { text: 'tau', group: 2 },
          { text: '-e', group: 3 },
          { text: 'vNew', group: 1 },
          { text: '0.0', group: 1 },
          { text: '1.0', group: 2 },
          { text: 'e', group: 2 },
          { text: '+e', group: 3 },
          { text: '1.0 / e', group: 3 }
        ],
        generalFeedback: '<p><strong>Erklärung der Kollisions-Interpolation:</strong></p>' +
                         '<ul><li><code>[[1]] = yNew</code>: Da <code>yNew</code> negativ ist, entspricht <code>yOld - yNew</code> der gesamten zurückgelegten vertikalen Strecke im Schritt.</li>' +
                         '<li><code>[[2]] = tau</code>: Die Fallgeschwindigkeit bis zum Aufprall wächst nur über den Teilzeitschritt \\(\\tau \\cdot \\Delta t\\) an.</li>' +
                         '<li><code>[[3]] = -e</code>: Beim Aufprall kehrt sich das Vorzeichen der Geschwindigkeit um und ihr Betrag wird mit dem Stoßfaktor \\(e \\in [0, 1]\\) gedämpft.</li></ul>'
      },
      {
        id: 'T03_Q5',
        title: 'Konzept-Zuordnung: Physikalische Randbedingungen der Wärmeleitung',
        shortSummary: 'Randbedingungen (Dirichlet, Neumann, Robin)',
        type: 'matching',
        grade: 1.0,
        text: '<p>Ordnen Sie die folgenden physikalisch-technischen Randszenarien eines 2D-Wärmeleitungsproblems dem jeweiligen mathematischen Randbedingungstyp bzw. der Diskretisierung zu. Beachten Sie die zwei Überhang-Distraktoren.</p>',
        subquestions: [
          { text: 'Eine Plattenseite wird durch ein geregeltes Wasserbad dauerhaft auf exakt 80 °C gehalten.', answer: 'Dirichlet-Randbedingung (1. Art: Fester Funktionswert)' },
          { text: 'Eine Plattenseite ist perfekt wärmegedämmt (adiabat), sodass kein Wärmestrom über den Rand fließt.', answer: 'Homogene Neumann-Randbedingung (2. Art: Ableitung Null)' },
          { text: 'Eine Plattenseite gibt Wärme proportional zur Temperaturdifferenz an die vorbeiströmende Luft ab.', answer: 'Robin-Randbedingung (3. Art: Konvektiver Wärmeübergang)' },
          { text: 'Diskrete Umsetzung am linken Rand (Index 0) durch die Zuweisung T[0, y] = T[1, y] nach jedem Schritt.', answer: 'Numerische Implementierung eines isolierten Neumann-Randes' },
          { text: '', answer: 'Courant-Friedrichs-Lewy-Randbedingung (4. Art)' },
          { text: '', answer: 'Stachowiak-Abstraktions-Randbedingung (0. Art)' }
        ],
        generalFeedback: '<p><strong>Übersicht der drei klassischen Randbedingungen für PDEs:</strong></p>' +
                         '<ul><li><strong>1. Art (Dirichlet):</strong> Vorgabe des Zustands selbst, z. B. \\(T = T_{\\text{Wand}}\\).</li>' +
                         '<li><strong>2. Art (Neumann):</strong> Vorgabe der Normalenableitung (Wärmestromdichte \\(\\dot{q} = -\\lambda \\frac{\\partial T}{\\partial n}\\)). Bei perfekter Isolation gilt \\(\\frac{\\partial T}{\\partial n} = 0 \\implies T_{\\text{Rand}} = T_{\\text{Nachbar}}\\).</li>' +
                         '<li><strong>3. Art (Robin / Cauchy):</strong> Linearkombination aus Randtemperatur und Normalenableitung (Newtonsches Abkühlungsgesetz an Fluidgrenzen).</li></ul>'
      },
      {
        id: 'T03_Q6',
        title: 'Modelltheorie & Echtzeit: Zusammensetzung eines Digitalen Zwillings',
        shortSummary: 'Grieves-Dreiheit & Echtzeitbegriff (Soft/Firm/Hard)',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Welche Aussage beschreibt die Grundstruktur eines Digitalen Zwillings nach Michael Grieves sowie die Echtzeitanforderungen an eine gekoppelte Simulation in der Automatisierungstechnik korrekt?</p>',
        answers: [
          {
            text: 'Ein Digitaler Zwilling umfasst das reale Objekt, das virtuelle Modell und deren bidirektionale Datenverbindung.',
            fraction: 100,
            feedback: 'Richtig! Grieves definiert den Digital Twin über genau diese drei Kernkomponenten (Physical Space, Virtual Space, Data/Information Tie).'
          },
          {
            text: 'Ein Digitaler Zwilling erfordert zwingend ein 3D-CAD-Modell, kommt aber ohne reale Sensordaten-Kopplung aus.',
            fraction: 0,
            feedback: 'Falsch. Ohne automatische Sensordaten- und Aktorkopplung handelt es sich nach Kritzinger lediglich um ein Digital Model, nicht um einen Digital Twin.'
          },
          {
            text: 'Echtzeitfähigkeit bedeutet in der Simulation immer, dass ein Zeitschritt weniger als eine Mikrosekunde dauert.',
            fraction: 0,
            feedback: 'Falsch. Echtzeit bedeutet, dass die Rechendauer dt_wall kleiner oder gleich der physikalischen Zeitschrittweite dt_sim ist (bei thermischen Prozessen oft Sekunden).'
          },
          {
            text: 'Nach dem Verkürzungsmerkmal von Stachowiak muss ein Simulationsmodell stets alle Atome des Originals abbilden.',
            fraction: 0,
            feedback: 'Falsch. Das Verkürzungsmerkmal besagt genau das Gegenteil: Irrelevante Mikroeigenschaften werden für den jeweiligen Zweck bewusst weggelassen.'
          }
        ],
        generalFeedback: '<p><strong>Erklärung:</strong></p>' +
                         '<p>Nach Michael Grieves besteht jedes Digital-Twin-System aus der Dreiheit <em>Physisches Produkt im Realraum</em>, <em>Virtuelles Produkt im Digitalraum</em> und der <em>bidirektionalen Daten- und Informationsverbindung</em>. Echtzeitfähigkeit bedeutet dabei nicht „unendlich schnell“, sondern \\(\\Delta t_{\\text{Berechnung}} \\le \\Delta t_{\\text{Physik}}\\) innerhalb einer garantierten Zeitschranke.</p>'
      },
      {
        id: 'T03_Q7',
        title: 'C#-Bug-Diagnose: Integer-Division bei der Farbskalen-Normierung',
        shortSummary: 'Find the Bug: Integer-Division `(T - Tmin) / (Tmax - Tmin)`',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Ein Entwickler speichert Temperaturen als ganzzahlige Werte (<code>int</code>) und möchte daraus einen kontinuierlichen Farbverlauf zwischen Blau (bei <code>Tmin = 0</code>) und Rot (bei <code>Tmax = 100</code>) berechnen:</p>' +
              '<pre><code class="language-csharp">int T = 65, Tmin = 0, Tmax = 100;\ndouble u = (T - Tmin) / (Tmax - Tmin);\nbyte red = (byte)(255 * u);</code></pre>' +
              '<p>Warum bleibt der Rot-Kanal <code>red</code> für alle Temperaturen zwischen <code>0</code> und <code>99</code> dauerhaft auf dem Wert <code>0</code>?</p>',
        answers: [
          {
            text: 'Weil beide Operanden vom Typ int sind, schneidet die Ganzzahldivision den Nachkommateil vor der Zuweisung ab.',
            fraction: 100,
            feedback: 'Richtig! In C# wird 65 / 100 als reine int-Division zu 0 ausgewertet und erst danach als 0.0 in die double-Variable u geschrieben.'
          },
          {
            text: 'Weil der Datentyp byte in C# nur Werte von -128 bis +127 speichern kann und bei 255 sofort auf 0 überläuft.',
            fraction: 0,
            feedback: 'Falsch. Der Typ byte ist in C# vorzeichenlos (unsigned 8-Bit) und umfasst exakt den Wertebereich 0 bis 255 (sbyte wäre -128 bis +127).'
          },
          {
            text: 'Weil die Klammern um (T - Tmin) in C# dazu führen, dass der Ausdruck als bitweises XOR ausgewertet wird.',
            fraction: 0,
            feedback: 'Falsch. Runde Klammern steuern lediglich die Auswertungsreihenfolge; der bitweise XOR-Operator in C# wäre das Zeichen ^.'
          },
          {
            text: 'Weil eine implizite Konvertierung von int nach double in C# grundsätzlich den Wert 0.0 zur Folge hat.',
            fraction: 0,
            feedback: 'Falsch. Die implizite Konvertierung eines int nach double ist verlustfrei; der Verlust passiert bereits vorher bei der int/int-Division.'
          }
        ],
        generalFeedback: '<p><strong>Fehleranalyse (Ganzzahldivision in C#):</strong></p>' +
                         '<p>Da sowohl <code>(T - Tmin)</code> als auch <code>(Tmax - Tmin)</code> vom Typ <code>int</code> sind, führt C# eine Ganzzahldivision durch: <code>65 / 100</code> ergibt <code>0</code>. Erst dieses Ergebnis wird anschließend implizit in <code>double u = 0.0</code> umgewandelt. Abhilfe schafft ein expliziter Cast wie <code>(double)(T - Tmin) / (Tmax - Tmin)</code> oder das Teilen durch <code>100.0</code>.</p>'
      },
      {
        id: 'T03_Q8',
        title: 'Energiediskussion: Symplektischer Euler vs. Expliziter Standard-Euler',
        shortSummary: 'Energiedrift beim Standard-Euler & Sub-Stepping',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: '<p>Welche der folgenden Aussagen zum Zeitintegrationsverhalten mechanischer Systeme (z. B. springender Ball oder ungedämpftes Pendel) mit Euler-Verfahren sind <strong>zutreffend</strong>? (Mehrere Antworten möglich)</p>',
        answers: [
          {
            text: 'Der explizite Standard-Euler führt bei ungedämpften Schwingungen zu einer künstlichen Energiezunahme pro Schritt.',
            fraction: 50,
            feedback: 'Richtig! Da der Standard-Euler tangential aus den gekrümmten Phasenraum-Trajektorien herausspringt, wächst die Gesamtenergie systematisch an.'
          },
          {
            text: 'Ohne zeitliche Sub-Step-Interpolation am Boden hängt die Rücksprunghöhe unphysikalisch von der Schrittweite ab.',
            fraction: 50,
            feedback: 'Richtig! Wird einfach bei y < 0 hart auf y = 0 gesetzt, geht die in der Eindringtiefe steckende Lageenergie je nach zufälliger Phasenlage verloren.'
          },
          {
            text: 'Das explizite Standard-Euler-Verfahren ist für alle Schrittweiten exakt energieerhaltend und symplektisch.',
            fraction: -50,
            feedback: 'Falsch! Der Standard-Euler ist nicht symplektisch (erst der semi-implizite Euler v_n+1 -> y_n+1 ist symplektisch).'
          },
          {
            text: 'Ein Restitutionskoeffizient von e = 0.8 bedeutet, dass nach jedem Bodenaufprall 80 % der Geschwindigkeit verloren gehen.',
            fraction: -50,
            feedback: 'Falsch! Wegen v_neu = -e * v_alt bleiben bei e = 0,8 genau 80 % der Geschwindigkeit erhalten (nur 20 % gehen verloren).'
          }
        ],
        generalFeedback: '<p><strong>Zusammenfassung (Energieverhalten & Stoßmechanik):</strong></p>' +
                         '<ul><li>Beim expliziten Standard-Euler wächst der Phasenraum-Radius pro Schritt um den Faktor \\(\\sqrt{1 + (\\omega \\Delta t)^2} > 1\\) an (künstliches Aufschaukeln).</li>' +
                         '<li>Ohne die lineare Aufprall-Interpolation \\(\\tau = \\frac{y_n}{y_n - y_{n+1}}\\) führt die zufällige Eindringtiefe \\(y_{n+1} < 0\\) zu sichtbarem Höhen-Jitter beim Springen.</li></ul>'
      }
    ]
  },

  // =========================================================================
  // TEST 04 (PRÜFUNG)
  // =========================================================================
  {
    id: 'Test_04_Pruefung',
    title: 'Test 04 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante D)',
    category: '$course$/Quiz_01_Termin_03/Test_04_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'T04_Q1',
        title: '2D-Gitterentwurf: Minimale Maschenweite & Gesamt-Knotenanzahl',
        shortSummary: 'Minimales $\\Delta x_{\\min}$ & Gitterknoten $N_{\\text{total}}$',
        type: 'cloze',
        grade: 2.0,
        text: '<p>Eine quadratische Aluminium-Kühlplatte der Kantenlänge \\(L_x = L_y = 120\\,\\text{mm}\\) (Temperaturleitfähigkeit \\(\\alpha = 80\\,\\text{mm}^2/\\text{s}\\)) soll mit einer fest durch den SPS-Zyklus vorgegebenen Zeitschrittweite von \\(\\Delta t = 0{,}05\\,\\text{s}\\) mittels explizitem 2D-Euler-Verfahren (5-Punkt-Stern) numerisch stabil simuliert werden.</p>' +
              '<p>a) Wie groß muss die räumliche Maschenweite \\(\\Delta x_{\\min}\\) (in <strong>mm</strong>) mindestens gewählt werden, damit die 2D-Stabilitätsbedingung gerade noch eingehalten wird?<br>' +
              'Antwort: {1:NUMERICAL:=4.0:0.05#Richtig! Aus s = alpha * dt / dx^2 <= 0,25 folgt dx_min = sqrt(4 * 80 * 0,05) = sqrt(16) = 4,0 mm.~%50%2.828:0.05#Teilpunkte (50 %): Sie haben mit dem 1D-Faktor 2 statt 4 gerechnet (sqrt(8) = 2,83 mm).~%50%16.0:0.1#Teilpunkte (50 %): Sie haben dx^2 = 16 mm^2 berechnet, aber vergessen, am Ende die Quadratwurzel zu ziehen.} mm</p>' +
              '<p>b) In wie viele Teilintervalle \\(N_{\\text{seg}} = L_x / \\Delta x_{\\min}\\) wird eine Plattenkante dabei unterteilt?<br>' +
              'Antwort: {1:NUMERICAL:=30:0#Richtig! 120 mm / 4,0 mm = 30 Segmente pro Kante (entspricht 31 * 31 = 961 Gitterknoten inkl. Rändern).~%50%900:0#Teilpunkte (50 %): Sie haben die Fläche 30 * 30 = 900 statt der Kanten-Segmente angegeben.} Segmente</p>',
        generalFeedback: '<p><strong>Musterherleitung (Inverser Gitterentwurf bei festem \\(\\Delta t\\)):</strong></p>' +
                         '<p>1. Umstellen der 2D-Stabilitätsbedingung \\(s = \\frac{\\alpha \\cdot \\Delta t}{\\Delta x^2} \\le 0{,}25\\) nach \\(\\Delta x\\):<br>' +
                         '\\(\\Delta x \\ge \\sqrt{4 \\cdot \\alpha \\cdot \\Delta t} = \\sqrt{4 \\cdot 80\\,\\text{mm}^2/\\text{s} \\cdot 0{,}05\\,\\text{s}} = \\sqrt{16\\,\\text{mm}^2} = 4{,}0\\,\\text{mm}\\).</p>' +
                         '<p>2. Anzahl der Kanten-Segmente:<br>\\(N_{\\text{seg}} = \\frac{L_x}{\\Delta x_{\\min}} = \\frac{120\\,\\text{mm}}{4{,}0\\,\\text{mm}} = 30\\,\\text{Segmente}\\).</p>'
      },
      {
        id: 'T04_Q2',
        title: 'Expliziter Euler: Zweischritt-Integration der vertikalen Höhe',
        shortSummary: 'Euler-Höhe $y_2$ nach 2 Zeitschritten',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Ein Körper wird zum Zeitpunkt \\(t_0 = 0\\,\\text{s}\\) aus der Ruhe (\\(v_0 = 0{,}0\\,\\text{m/s}\\)) in einer Starthöhe von \\(y_0 = 20{,}0\\,\\text{m}\\) losgelassen. Er fällt unter dem Einfluss einer konstanten Schwerebeschleunigung von \\(g = 10{,}0\\,\\text{m/s}^2\\) nach unten (ohne Luftwiderstand).</p>' +
              '<p>Berechnen Sie die Höhe \\(y_2\\) (in <strong>Metern</strong>) zum Zeitpunkt \\(t_2 = 0{,}40\\,\\text{s}\\) nach exakt <strong>zwei Zeitschritten</strong> der Schrittweite \\(\\Delta t = 0{,}20\\,\\text{s}\\) mit dem <strong>expliziten Standard-Euler-Verfahren</strong>.</p>',
        answers: [
          { value: 19.6, tolerance: 0.01, fraction: 100, feedback: 'Exakt! Schritt 1: y_1 = 20 + 0,2*0 = 20,0 m, v_1 = -2,0 m/s. Schritt 2: y_2 = 20,0 + 0,2*(-2,0) = 19,6 m.' },
          { value: 19.2, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): 19,2 m ist die analytische Lösung y(0,4) = 20 - 0,5*10*0,16 = 19,2 m (bzw. Heun), nicht das Ergebnis des expliziten Euler!' },
          { value: 18.8, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): 18,8 m entsteht beim semi-impliziten Euler (Schritt 1: 19,6 m, Schritt 2: 18,8 m).' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (2 Schritte Expliziter Standard-Euler):</strong></p>' +
                         '<p><strong>Schritt 1 (\\(t_0 = 0 \\to t_1 = 0{,}20\\,\\text{s}\\)):</strong><br>' +
                         '\\(y_1 = y_0 + \\Delta t \\cdot v_0 = 20{,}0 + 0{,}20 \\cdot 0{,}0 = 20{,}0\\,\\text{m}\\)<br>' +
                         '\\(v_1 = v_0 - \\Delta t \\cdot g = 0{,}0 - 0{,}20 \\cdot 10{,}0 = -2{,}0\\,\\text{m/s}\\).</p>' +
                         '<p><strong>Schritt 2 (\\(t_1 = 0{,}20 \\to t_2 = 0{,}40\\,\\text{s}\\)):</strong><br>' +
                         '\\(y_2 = y_1 + \\Delta t \\cdot v_1 = 20{,}0 + 0{,}20 \\cdot (-2{,}0) = 19{,}6\\,\\text{m}\\).<br>' +
                         '(Man erkennt hier anschaulich den globalen Diskretisierungsfehler von \\(0{,}4\\,\\text{m}\\) gegenüber dem exakten Wert \\(19{,}2\\,\\text{m}\\).)</p>'
      },
      {
        id: 'T04_Q3',
        title: 'C#-Code-Tracing: 5-Punkt-Stern Array-Update an einem Gitterknoten',
        shortSummary: 'Code-Tracing 5-Punkt-Stern (`T_next[1, 1]`)',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Gegeben sei folgender C#-Codeausschnitt für einen Zeitschritt auf einem \\(3 \\times 3\\)-Temperaturgitter:</p>' +
              '<pre><code class="language-csharp">double[,] T = {\n    { 10.0, 20.0, 10.0 },\n    { 40.0, 10.0, 20.0 },\n    { 10.0, 30.0, 10.0 }\n};\ndouble s = 0.25;\ndouble T_next_1_1 = T[1, 1] + s * (T[0, 1] + T[2, 1] + T[1, 0] + T[1, 2] - 4.0 * T[1, 1]);</code></pre>' +
              '<p>Welchen exakten Zahlenwert hat die Variable <code>T_next_1_1</code> nach der Ausführung?</p>',
        answers: [
          { value: 27.5, tolerance: 0.01, fraction: 100, feedback: 'Richtig! Bei s = 0,25 kürzt sich T[1,1] heraus: T_next = 0,25 * (20 + 30 + 40 + 20) = 0,25 * 110 = 27,5.' },
          { value: 37.5, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben vergessen, im Klammerausdruck -4.0 * T[1,1] (= -40) abzuziehen (10 + 0,25 * 110 = 37,5).' },
          { value: 17.5, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben die Eckknoten (10+10+10+10 = 40) oder einen falschen Nachbarn statt der 4 Kanten-Nachbarn summiert.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung:</strong></p>' +
                         '<p>Der Zentralknoten ist <code>T[1, 1] = 10.0</code>. Seine vier direkten Nachbarn sind <code>T[0, 1] = 20.0</code>, <code>T[2, 1] = 30.0</code>, <code>T[1, 0] = 40.0</code> und <code>T[1, 2] = 20.0</code> (Summe der Nachbarn \\(= 110{,}0\\)).</p>' +
                         '<p>Einsetzen in die Formel liefert:<br>' +
                         '<code>T_next_1_1 = 10.0 + 0.25 * (110.0 - 4.0 * 10.0) = 10.0 + 0.25 * 70.0 = 10.0 + 17.5 = 27.5</code>.<br>' +
                         '<em>Hinweis:</em> Im Grenzfall \\(s = 0{,}25\\) ist \\(T_{i,j}^{n+1}\\) stets exakt der arithmetische Mittelwert der vier Nachbarknoten (\\(110 / 4 = 27{,}5\\)).</p>'
      },
      {
        id: 'T04_Q4',
        title: 'C#-Lückentext: Heun-Verfahren (Prädiktor-Korrektor) im Code',
        shortSummary: 'Heun-Verfahren (RK2) in C#',
        type: 'gapselect',
        grade: 1.0,
        text: '<p>Vervollständigen Sie die folgende C#-Methode, die eine allgemeine Differentialgleichung \\(\\dot{y} = f(t, y)\\) um einen Zeitschritt <code>dt</code> mit dem <strong>Heun-Verfahren (RK2)</strong> integriert:</p>' +
              '<pre><code class="language-csharp">double k1 = f(t, y);\ndouble yPred = y + [[1]] * k1;\ndouble k2 = f(t + dt, [[2]]);\ndouble yNext = y + [[3]] * (k1 + k2);</code></pre>',
        choices: [
          { text: 'dt', group: 1 },
          { text: 'yPred', group: 2 },
          { text: '0.5 * dt', group: 3 },
          { text: '0.5 * dt', group: 1 },
          { text: 'dt * dt', group: 1 },
          { text: 'y', group: 2 },
          { text: 'k1', group: 2 },
          { text: 'dt', group: 3 },
          { text: '2.0 * dt', group: 3 }
        ],
        generalFeedback: '<p><strong>Erklärung (Heun-Verfahren / Trapezregel):</strong></p>' +
                         '<ul><li><code>[[1]] = dt</code>: Der Prädiktorschritt schätzt den Endwert über einen vollen expliziten Euler-Schritt <code>y + dt * k1</code>.</li>' +
                         '<li><code>[[2]] = yPred</code>: Die zweite Steigung <code>k2</code> wird am Ende des Intervalls mit dem geschätzten Zustand <code>yPred</code> ausgewertet.</li>' +
                         '<li><code>[[3]] = 0.5 * dt</code>: Der Korrektorschritt mittelt beide Steigungen <code>0.5 * (k1 + k2)</code> und multipliziert mit <code>dt</code>.</li></ul>'
      },
      {
        id: 'T04_Q5',
        title: 'Pipeline-Reihenfolge: Ablauf des zweistufigen Heun-Integrationsschritts',
        shortSummary: 'Ablaufkette Heun-Prädiktor-Korrektor',
        type: 'ddwtos',
        grade: 1.0,
        text: '<p>Bringen Sie die vier Berechnungsschritte eines einzelnen Zeitschritts beim <strong>Heun-Verfahren (RK2)</strong> in die korrekte mathematisch-algorithmische Ausführungsreihenfolge:</p>' +
              '<p>Schritt 1: [[1]]<br>' +
              'Schritt 2: [[2]]<br>' +
              'Schritt 3: [[3]]<br>' +
              'Schritt 4: [[4]]</p>',
        dragboxes: [
          { text: 'Anfangssteigung k1 = f(t_n, y_n) am aktuellen Zustand berechnen', group: 1 },
          { text: 'Prädiktor-Zustand y_tilde = y_n + dt * k1 vorhersagen', group: 1 },
          { text: 'Endsteigung k2 = f(t_n + dt, y_tilde) am Prädiktorpunkt auswerten', group: 1 },
          { text: 'Korrektor-Update y_n+1 = y_n + 0.5 * dt * (k1 + k2) durchführen', group: 1 },
          { text: 'Schrittweite dt mit dem Faktor 4 multiplizieren', group: 1 },
          { text: 'Zustandsvektor y_n auf 0 zurücksetzen', group: 1 }
        ],
        generalFeedback: '<p><strong>Erklärung:</strong></p>' +
                         '<p>Das Heun-Verfahren bestimmt zuerst die Tangentensteigung \\(k_1\\) am Startpunkt, führt damit einen provisorischen Euler-Schritt auf \\(\\tilde{y}\\) aus (Prädiktor), ermittelt dort die Endsteigung \\(k_2\\) und korrigiert schließlich den Schritt mit dem arithmetischen Mittelwert beider Steigungen.</p>'
      },
      {
        id: 'T04_Q6',
        title: 'System-Taxonomie: Einordnung des gedämpften Einmassenschwingers',
        shortSummary: 'Taxonomie: Kontinuierlich & konzentrierte Parameter',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Wie wird die klassische Bewegungsgleichung \\(m\\ddot{x}(t) + d\\dot{x}(t) + cx(t) = F(t)\\) eines Feder-Masse-Dämpfer-Systems in der Systemtheorie klassifiziert?</p>',
        answers: [
          {
            text: 'Es ist ein deterministisches, zeitkontinuierliches Modell mit konzentrierten Parametern (ODE).',
            fraction: 100,
            feedback: 'Richtig! Die Masse ist in einem Punkt konzentriert (nur Zeitabhängigkeit t -> gewöhnliche DGL / ODE), und der Verlauf ist deterministisch.'
          },
          {
            text: 'Es ist ein zeitdiskretes Modell mit verteilten Parametern auf einem zweidimensionalen Raumgitter.',
            fraction: 0,
            feedback: 'Falsch. Es gibt hier keine partiellen Ortsableitungen nach x oder y (keine PDE), sondern nur Zeitableitungen.'
          },
          {
            text: 'Es ist ein rein statisches, algebraisches Modell ohne jedes Zeitgedächtnis oder Zustandsgrößen.',
            fraction: 0,
            feedback: 'Falsch. Durch die erste und zweite Zeitableitung besitzt das System zwei Energiespeicher (Zustände x und v) und ist somit dynamisch.'
          },
          {
            text: 'Es ist ein stochastisches Warteschlangenmodell zur Beschreibung zufälliger Fertigungsprozesse.',
            fraction: 0,
            feedback: 'Falsch. Alle Koeffizienten m, d, c und F(t) sind deterministisch vorgegeben.'
          }
        ],
        generalFeedback: '<p><strong>Erklärung:</strong></p>' +
                         '<p>Systeme, deren Bauteile (Masse \\(m\\), Dämpfer \\(d\\), Feder \\(c\\)) räumlich punktförmig zusammengefasst werden, heißen Systeme mit <strong>konzentrierten Parametern</strong> (<em>lumped-parameter systems</em>) und führen auf gewöhnliche Differentialgleichungen (ODEs). Systeme mit Ortsableitungen (wie das 2D-Temperaturfeld) heißen dagegen Systeme mit <strong>verteilten Parametern</strong> (PDEs).</p>'
      },
      {
        id: 'T04_Q7',
        title: 'C#-Bug-Diagnose: Fehlender AddDirtyRect-Aufruf bei WriteableBitmap',
        shortSummary: 'Find the Bug: Fehlendes `AddDirtyRect` vor `Unlock`',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Eine Entwicklerin aktualisiert in jedem Simulationsschritt den <code>BackBuffer</code> eines <code>WriteableBitmap bmp</code> mit folgendem C#-Code, sieht aber auf dem Bildschirm dauerhaft nur ein leeres Bild:</p>' +
              '<pre><code class="language-csharp">bmp.Lock();\nunsafe {\n    uint* p = (uint*)bmp.BackBuffer;\n    for (int i = 0; i < width * height; i++) p[i] = 0xFFFF0000;\n}\nbmp.Unlock();</code></pre>' +
              '<p>Was ist die Ursache dafür, dass die rote Fläche niemals im WPF-Fenster erscheint?</p>',
        answers: [
          {
            text: 'Zwischen Lock und Unlock fehlt der Aufruf von AddDirtyRect, sodass WPF kein GPU-Update auslöst.',
            fraction: 100,
            feedback: 'Richtig! Ohne bmp.AddDirtyRect(new Int32Rect(0, 0, width, height)) weiß das WPF-Render-Subsystem nicht, dass sich der BackBuffer geändert hat.'
          },
          {
            text: 'Der Farbwert 0xFFFF0000 besitzt im oberen Byte den Alpha-Wert 0 und ist daher komplett durchsichtig.',
            fraction: 0,
            feedback: 'Falsch. In 0xFFFF0000 steht das höchste Byte (Alpha) auf 0xFF = 255 (vollständig deckend) und das zweithöchste Byte (Rot) ebenfalls auf 0xFF.'
          },
          {
            text: 'Die Methode Unlock löscht aus Sicherheitsgründen automatisch den gesamten Inhalt des BackBuffers.',
            fraction: 0,
            feedback: 'Falsch. Unlock hebt lediglich die Sperre auf und übergibt die per AddDirtyRect markierten Regionen an den Render-Thread.'
          },
          {
            text: 'Ein uint*-Pointer darf in C# grundsätzlich nicht innerhalb einer normalen for-Schleife indiziert werden.',
            fraction: 0,
            feedback: 'Falsch. In einem unsafe-Block unterstützt C# die Zeiger-Indizierung p[i] analog zu Arrays vollkommen regulär.'
          }
        ],
        generalFeedback: '<p><strong>Fehleranalyse:</strong></p>' +
                         '<p>Weil der Schreibzugriff über einen unverwalteten Pointer (<code>uint* p</code>) direkt im RAM stattfindet, bekommt die WPF-Laufzeitumgebung davon nichts mit. Erst <code>bmp.AddDirtyRect(new Int32Rect(0, 0, width, height))</code> markiert den Bereich als geändert („dirty“) und stößt beim anschließenden <code>bmp.Unlock()</code> den Kopiervorgang in den FrontBuffer der Grafikkarte an.</p>'
      },
      {
        id: 'T04_Q8',
        title: 'Numerik-Vergleich: Expliziter Euler vs. Heun-Verfahren (RK2)',
        shortSummary: 'Vergleich Euler (RK1) vs. Heun (RK2)',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: '<p>Welche der folgenden Aussagen zum Vergleich zwischen dem <strong>expliziten Euler-Verfahren</strong> und dem <strong>Heun-Verfahren (RK2)</strong> bei gleicher Zeitschrittweite \\(\\Delta t\\) sind <strong>korrekt</strong>? (Mehrere Antworten möglich)</p>',
        answers: [
          {
            text: 'Das Heun-Verfahren wertet die rechte Seite der Differentialgleichung genau zweimal pro Zeitschritt aus.',
            fraction: 50,
            feedback: 'Richtig! Einmal für k1 = f(t_n, y_n) und ein zweites Mal für k2 = f(t_n + dt, y_pred).'
          },
          {
            text: 'Bei einer Zehntelung der Schrittweite sinkt der globale Fehler beim Heun-Verfahren etwa auf ein Hundertstel.',
            fraction: 50,
            feedback: 'Richtig! Da Heun die globale Konvergenzordnung p = 2 besitzt, skaliert der globale Fehler mit (1/10)^2 = 1/100.'
          },
          {
            text: 'Das Heun-Verfahren benötigt pro Zeitschritt das Lösen eines nichtlinearen Gleichungssystems mit Newton.',
            fraction: -50,
            feedback: 'Falsch! Das zweistufige Heun-Verfahren mit explizitem Euler-Prädiktor ist ein rein explizites Runge-Kutta-Verfahren (RK2).'
          },
          {
            text: 'Das explizite Euler-Verfahren besitzt die globale Fehlerordnung 2, während Heun die globale Ordnung 4 hat.',
            fraction: -50,
            feedback: 'Falsch! Expliziter Euler hat die globale Ordnung 1 (lokal 2), Heun hat die globale Ordnung 2 (lokal 3).'
          }
        ],
        generalFeedback: '<p><strong>Zusammenfassung:</strong></p>' +
                         '<p>Das Heun-Verfahren investiert zwei Funktionsauswertungen pro Zeitschritt und erreicht durch die Trapez-Mittelung der Steigungen \\(\\frac{1}{2}(k_1 + k_2)\\) die globale Konvergenzordnung \\(\\mathcal{O}(\\Delta t^2)\\) statt \\(\\mathcal{O}(\\Delta t^1)\\) beim einfachen Euler-Verfahren.</p>'
      }
    ]
  },

  // =========================================================================
  // TEST 05 (PRÜFUNG)
  // =========================================================================
  {
    id: 'Test_05_Pruefung',
    title: 'Test 05 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante E)',
    category: '$course$/Quiz_01_Termin_03/Test_05_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'T05_Q1',
        title: 'WriteableBitmap GPU-Alignment: Zeilen-Padding & Puffergröße',
        shortSummary: '`BackBufferStride` mit 64-Byte-Padding & Puffergröße',
        type: 'cloze',
        grade: 2.0,
        text: '<p>Ein <code>WriteableBitmap</code> wird mit einer ungeraden Bildbreite von \\(W = 101\\,\\text{Pixeln}\\) und einer Höhe von \\(H = 50\\,\\text{Zeilen}\\) im Format <code>PixelFormats.Bgra32</code> (4 Bytes pro Pixel) erzeugt. Für optimale DMA-Transfers rundet der Grafiktreiber die Zeilenlänge (<code>BackBufferStride</code>) auf das nächste ganzzahlige Vielfache von <strong>32 Bytes</strong> auf.</p>' +
              '<p>a) Wie viele reine Nutzdaten-Bytes belegen die \\(101\\,\\text{Pixel}\\) einer einzelnen Zeile <em>ohne</em> Padding?<br>' +
              'Antwort: {1:NUMERICAL:=404:0#Richtig! 101 Pixel * 4 Bytes/Pixel = 404 Nutzdaten-Bytes pro Zeile.~%50%101:0#Teilpunkte (50 %): Sie haben die Pixelanzahl (101) statt der Byte-Anzahl (101 * 4 = 404) angegeben.} Bytes</p>' +
              '<p>b) Welchen exakten Wert hat <code>BackBufferStride</code> (in <strong>Bytes</strong>) nach dem Aufrunden auf das nächste Vielfache von 32 Bytes?<br>' +
              'Antwort: {1:NUMERICAL:=416:0#Richtig! 13 * 32 = 416 Bytes (12 Bytes Padding am Zeilenende, da 12 * 32 = 384 < 404).~%50%408:0#Teilpunkte (50 %): 408 ist ein Vielfaches von 8, aber nicht durch 32 teilbar (408 / 32 = 12,75).~%50%404:0#Teilpunkte (50 %): Sie haben das Aufrunden auf ein Vielfaches von 32 Bytes weggelassen.} Bytes</p>',
        generalFeedback: '<p><strong>Musterherleitung (Stride vs. Width * 4):</strong></p>' +
                         '<p>1. Nutzdaten pro Zeile: \\(101\\,\\text{Pixel} \\cdot 4\\,\\text{Bytes/Pixel} = 404\\,\\text{Bytes}\\).</p>' +
                         '<p>2. Aufrunden auf ein Vielfaches von 32 Bytes:<br>' +
                         '\\(\\lceil 404 / 32 \\rceil \\cdot 32 = \\lceil 12{,}625 \\rceil \\cdot 32 = 13 \\cdot 32 = 416\\,\\text{Bytes}\\).<br>' +
                         'Am Ende jeder Bildzeile liegen somit \\(416 - 404 = 12\\) ungenutzte Padding-Bytes. Genau deshalb muss im Code zwingend <code>y * bmp.BackBufferStride</code> statt <code>y * width * 4</code> gerechnet werden!</p>'
      },
      {
        id: 'T05_Q2',
        title: 'Fehleranalyse: Globaler Diskretisierungsfehler des Euler-Verfahrens',
        shortSummary: 'Betrag des globalen Fehlers $|y_{\\text{Euler}} - y_{\\text{exakt}}|$',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Ein Bauteil fällt aus der Ruhe (\\(y_0 = 50{,}0\\,\\text{m}\\), \\(v_0 = 0{,}0\\,\\text{m/s}\\)) im Schwerefeld mit \\(g = 10{,}0\\,\\text{m/s}^2\\) nach unten. Die analytisch exakte Höhe lautet \\(y_{\\text{exakt}}(t) = y_0 - \\frac{1}{2} g t^2\\).</p>' +
              '<p>Berechnen Sie den <strong>Betrag des globalen Höhenfehlers</strong> \\(|y_{\\text{Euler}}(t_1) - y_{\\text{exakt}}(t_1)|\\) (in <strong>Metern</strong>) nach einem einzigen großen expliziten Euler-Zeitschritt der Schrittweite \\(\\Delta t = 0{,}40\\,\\text{s}\\) (also bei \\(t_1 = 0{,}40\\,\\text{s}\\)).</p>',
        answers: [
          { value: 0.8, tolerance: 0.01, fraction: 100, feedback: 'Exakt! y_Euler(0,4) = 50,0 m; y_exakt(0,4) = 50 - 0,5 * 10 * 0,16 = 49,2 m; Differenz = |50,0 - 49,2| = 0,8 m.' },
          { value: 49.2, tolerance: 0.05, fraction: 50, feedback: 'Teilpunkte (50 %): 49,2 m ist die exakte Höhe y_exakt(0,4), gefragt war aber die Differenz |y_Euler - y_exakt| = 0,8 m.' },
          { value: 1.6, tolerance: 0.02, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben in der exakten Parabelformel den Faktor 0,5 vor g * t^2 vergessen (10 * 0,16 = 1,6 m statt 0,8 m).' }
        ],
        generalFeedback: '<p><strong>Musterherleitung:</strong></p>' +
                         '<p>1. <strong>Expliziter Euler nach 1 Schritt (\\(\\Delta t = 0{,}40\\,\\text{s}\\)):</strong><br>' +
                         'Da \\(v_0 = 0\\) ist, gilt \\(y_{\\text{Euler}}(0{,}40) = y_0 + \\Delta t \\cdot v_0 = 50{,}0\\,\\text{m}\\).</p>' +
                         '<p>2. <strong>Analytisch exakte Lösung:</strong><br>' +
                         '\\(y_{\\text{exakt}}(0{,}40) = 50{,}0 - \\frac{1}{2} \\cdot 10{,}0 \\cdot (0{,}40)^2 = 50{,}0 - 5{,}0 \\cdot 0{,}16 = 49{,}2\\,\\text{m}\\).</p>' +
                         '<p>3. <strong>Betrag des Fehlers:</strong><br>' +
                         '\\(|50{,}0\\,\\text{m} - 49{,}2\\,\\text{m}| = 0{,}80\\,\\text{m}\\) (entspricht exakt dem Taylor-Restglied \\(\\frac{1}{2} g \\Delta t^2\\)).</p>'
      },
      {
        id: 'T05_Q3',
        title: 'C#-Code-Tracing: Explizite Euler-Integrationsschleife',
        shortSummary: 'Code-Tracing Euler-Schleife (`3` Iterationen)',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Welchen exakten Zahlenwert besitzt die Variable <code>x</code> nach der vollständigen Ausführung der folgenden C#-Schleife?</p>' +
              '<pre><code class="language-csharp">double x = 2.0;\ndouble v = 3.0;\ndouble dt = 0.5;\nfor (int step = 0; step < 3; step++)\n{\n    x = x + dt * v;\n    v = v + dt * 4.0;\n}</code></pre>',
        answers: [
          { value: 9.5, tolerance: 0.01, fraction: 100, feedback: 'Richtig! step 0: x=3,5, v=5,0; step 1: x=6,0, v=7,0; step 2: x=9,5, v=9,0.' },
          { value: 6.0, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): 6,0 ist der Wert nach 2 Schleifendurchläufen (step 0 und step 1), die Schleife läuft aber 3-mal (step = 0, 1, 2).' },
          { value: 12.5, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): 12,5 entsteht, wenn v zuerst aktualisiert und sofort für x verwendet wird (semi-impliziter Ablauf).' }
        ],
        generalFeedback: '<p><strong>Schritt-für-Schritt-Tracing:</strong></p>' +
                         '<ul><li><strong>Start:</strong> <code>x = 2.0</code>, <code>v = 3.0</code></li>' +
                         '<li><strong>Iteration <code>step = 0</code>:</strong> <code>x = 2.0 + 0.5 * 3.0 = 3.5</code>; danach <code>v = 3.0 + 0.5 * 4.0 = 5.0</code></li>' +
                         '<li><strong>Iteration <code>step = 1</code>:</strong> <code>x = 3.5 + 0.5 * 5.0 = 6.0</code>; danach <code>v = 5.0 + 0.5 * 4.0 = 7.0</code></li>' +
                         '<li><strong>Iteration <code>step = 2</code>:</strong> <code>x = 6.0 + 0.5 * 7.0 = 9.5</code>; danach <code>v = 7.0 + 0.5 * 4.0 = 9.0</code></li></ul>'
      },
      {
        id: 'T05_Q4',
        title: 'C#-Lückentext: Neumann- und Dirichlet-Randbedingungen setzen',
        shortSummary: 'Randbedingungen im 2D-Array setzen',
        type: 'gapselect',
        grade: 1.0,
        text: '<p>Auf einem 2D-Temperaturgitter <code>double[,] T</code> der Größe <code>nx</code> mal <code>ny</code> soll der linke Rand (<code>x = 0</code>) als feste 100-°C-Heizwand (Dirichlet) und der rechte Rand (<code>x = nx - 1</code>) als perfekt wärmegedämmte Wand (homogene Neumann-Bedingung) programmiert werden. Vervollständigen Sie den Code:</p>' +
              '<pre><code class="language-csharp">for (int y = 0; y < ny; y++)\n{\n    T[[[1]], y] = 100.0;          // Linker Rand: Dirichlet (100 °C)\n    T[nx - 1, y] = T[[[2]], [[3]]]; // Rechter Rand: Neumann (isoliert)\n}</code></pre>',
        choices: [
          { text: '0', group: 1 },
          { text: 'nx - 2', group: 2 },
          { text: 'y', group: 3 },
          { text: '1', group: 1 },
          { text: 'nx - 1', group: 1 },
          { text: '0', group: 2 },
          { text: 'nx', group: 2 },
          { text: '0', group: 3 },
          { text: 'ny - 1', group: 3 }
        ],
        generalFeedback: '<p><strong>Erklärung:</strong></p>' +
                         '<ul><li><code>[[1]] = 0</code> adressiert den linken Rand <code>x = 0</code> und weist ihm fest <code>100.0</code> °C zu.</li>' +
                         '<li><code>[[2]] = nx - 2</code> und <code>[[3]] = y</code> kopieren die Temperatur des unmittelbar links daneben liegenden inneren Knotens <code>T[nx - 2, y]</code> auf den Randknoten <code>T[nx - 1, y]</code>, sodass die diskrete Normalenableitung \\(\\frac{T_{nx-1, y} - T_{nx-2, y}}{\\Delta x} = 0\\) wird.</li></ul>'
      },
      {
        id: 'T05_Q5',
        title: 'Konzept-Zuordnung: System-Taxonomie anhand technischer Beispiele',
        shortSummary: 'Zuordnung System-Taxonomie (Beispiele)',
        type: 'matching',
        grade: 1.0,
        text: '<p>Ordnen Sie die folgenden technischen Simulationsaufgaben der jeweils treffendsten Klasse der System-Taxonomie zu. Beachten Sie die zwei Überhang-Distraktoren.</p>',
        subquestions: [
          { text: 'Berechnung der stationären Temperaturverteilung einer Platte nach unendlich langer Zeit (dT/dt = 0).', answer: 'Statisches System mit verteilten Parametern' },
          { text: 'Freier Fall eines starren Körpers unter konstanter Schwerkraft mit gewöhnlicher Differentialgleichung.', answer: 'Dynamisches, zeitkontinuierliches System mit konzentrierten Parametern' },
          { text: 'Simulation einer Fertigungsstraße mit zufälligen Bearbeitungsdauern und Maschinenausfällen.', answer: 'Stochastisches, ereignisdiskretes System' },
          { text: 'Springender Ball mit kontinuierlicher Flugphase und schlagartiger Geschwindigkeitsumkehr am Boden.', answer: 'Hybrides System (kombiniert kontinuierlich und ereignisdiskret)' },
          { text: '', answer: 'Rein qualitatives Verbalmodell ohne mathematische Zustandsgrößen' },
          { text: '', answer: 'Zeitloses System ohne Eingangs- oder Ausgangsgrößen' }
        ],
        generalFeedback: '<p><strong>Erklärung:</strong></p>' +
                         '<ul><li>Für \\(\\partial T / \\partial t = 0\\) entfällt die Zeitabhängigkeit (statisch), die Ortsableitungen \\(\\partial^2 T / \\partial x^2 + \\partial^2 T / \\partial y^2 = 0\\) bleiben jedoch bestehen (verteilte Parameter).</li>' +
                         '<li>Der freie Fall einer Punktmasse hängt nur von \\(t\\) ab (konzentrierte Parameter, zeitkontinuierlich).</li>' +
                         '<li>Ein springender Ball vereint kontinuierliche DGL-Dynamik in der Luft mit einem diskreten Zustands-Sprung beim Bodenkontakt (hybrides System).</li></ul>'
      },
      {
        id: 'T05_Q6',
        title: 'Visualisierungs-Architektur: WriteableBitmap vs. WPF-Shape-Objekte',
        shortSummary: 'Warum `WriteableBitmap` statt $250.000$ `Rectangle`s?',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Warum wird für die Echtzeit-Darstellung eines \\(500 \\times 500\\)-Temperaturfeldes (\\(250\\,000\\) Gitterzellen) bei 60 FPS in WPF ein <code>WriteableBitmap</code> anstelle von \\(250\\,000\\) einzelnen <code>Rectangle</code>-Elementen im <code>Canvas</code> verwendet?</p>',
        answers: [
          {
            text: 'Ein WriteableBitmap aktualisiert ein flaches Byte-Array ohne Layout- und Objekt-Overhead pro Zelle.',
            fraction: 100,
            feedback: 'Richtig! Statt 250.000 DependencyObjects im Retained-Mode-Szenengraphen zu verwalten, werden beim WriteableBitmap nur 1 MB Rohdaten im RAM geändert.'
          },
          {
            text: 'Ein WPF-Canvas unterstützt technisch maximal 256 Kind-Elemente und wirft darüber eine Exception.',
            fraction: 0,
            feedback: 'Falsch. Es gibt kein hartes Limit von 256 Elementen im Canvas; das Problem bei 250.000 Objekten ist der massive Speicher- und Render-Thread-Overhead.'
          },
          {
            text: 'Die Klasse WriteableBitmap löst die partielle Wärmeleitungsgleichung automatisch im Grafiktreiber.',
            fraction: 0,
            feedback: 'Falsch. WriteableBitmap stellt lediglich einen schnellen Pixelpuffer bereit; die numerische FDM-Berechnung erfolgt weiterhin im C#-Code.'
          },
          {
            text: 'Einzelne Rectangle-Elemente können in WPF grundsätzlich nur in Graustufen statt in Farbe dargestellt werden.',
            fraction: 0,
            feedback: 'Falsch. Jedes Rectangle unterstützt beliebige SolidColorBrushes, ist aber als einzelnes UIElement für hunderttausende Pixel viel zu schwergewichtig.'
          }
        ],
        generalFeedback: '<p><strong>Architekturvergleich (Retained Mode vs. Direct Pixel Buffer):</strong></p>' +
                         '<p>Jedes <code>Rectangle</code> in WPF ist ein vollwertiges <code>UIElement</code> im Visual Tree (Retained Mode) mit hundert Bytes Speicherbedarf, Layout-Pass (Measure/Arrange) und Event-Routing. Bei \\(250\\,000\\) Pixeln bricht die Bildrate auf unter 1 FPS ein. <code>WriteableBitmap</code> umgeht den Visual Tree und erlaubt das direkte Beschreiben eines zusammenhängenden Speicherblocks in wenigen Millisekunden.</p>'
      },
      {
        id: 'T05_Q7',
        title: 'C#-Bug-Diagnose: Falsche Reihenfolge der Euler-Zustandsaktualisierung',
        shortSummary: 'Find the Bug: Überschreiben von `y` vor Verwendung',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Für einen harmonischen Oszillator mit den Zustandsgleichungen \\(\\dot{x} = v\\) und \\(\\dot{v} = -\\omega^2 x\\) möchte ein Student den <strong>reinen expliziten Standard-Euler</strong> implementieren und schreibt:</p>' +
              '<pre><code class="language-csharp">x = x + dt * v;\nv = v - dt * omegaSq * x;</code></pre>' +
              '<p>Warum implementiert dieser zweizeilige Code <strong>nicht</strong> das mathematische explizite Standard-Euler-Verfahren?</p>',
        answers: [
          {
            text: 'Die zweite Zeile nutzt bereits das überschriebene x des neuen Schritts statt des alten Zustands x_n.',
            fraction: 100,
            feedback: 'Richtig! Da x in Zeile 1 in-place überschrieben wurde, berechnet Zeile 2 die Beschleunigung mit x_{n+1} statt x_n (das entspricht dem symplektischen Euler).'
          },
          {
            text: 'Die Zeitschrittweite dt muss beim expliziten Euler-Verfahren in beiden Zeilen quadriert werden.',
            fraction: 0,
            feedback: 'Falsch. Beim Euler-Verfahren 1. Ordnung geht die Schrittweite dt linear ein: y_{n+1} = y_n + dt * f(y_n).'
          },
          {
            text: 'In C# wird die zweite Zeile vor der ersten ausgeführt, weil Multiplikationen höhere Priorität haben.',
            fraction: 0,
            feedback: 'Falsch. Anweisungen (Statements), die durch Semikolon getrennt sind, werden in C# strikt sequenziell von oben nach unten ausgeführt.'
          },
          {
            text: 'Das Minuszeichen in der zweiten Zeile muss für eine rücktreibende Federkraft zwingend ein Plus sein.',
            fraction: 0,
            feedback: 'Falsch. Eine rücktreibende Federkraft wirkt immer entgegen der Auslenkung x (F = -c*x), das Minuszeichen ist physikalisch völlig korrekt.'
          }
        ],
        generalFeedback: '<p><strong>Fehleranalyse:</strong></p>' +
                         '<p>Beim expliziten Standard-Euler lautet die Vorschrift \\(\\mathbf{z}_{n+1} = \\mathbf{z}_n + \\Delta t \\cdot \\mathbf{f}(\\mathbf{z}_n)\\). Alle Komponenten der rechten Seite müssen den Zustand \\(\\mathbf{z}_n\\) vom Beginn des Zeitschritts verwenden. Überschreibt man <code>x</code> direkt in Zeile 1 ohne Zwischenvariable <code>double xOld = x;</code>, verwendet Zeile 2 bereits \\(x_{n+1}\\) (was zufällig das symplektische Euler-Verfahren ergibt, aber nicht den geforderten Standard-Euler).</p>'
      },
      {
        id: 'T05_Q8',
        title: 'Gitter-Diskretisierung: Konsequenzen einer räumlichen Gitterverfeinerung',
        shortSummary: 'Folgen einer Halbierung von $\\Delta x$ in 2D (Faktor 16)',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: '<p>In einer expliziten 2D-Wärmeleitungssimulation wird die räumliche Maschenweite in beide Raumrichtungen exakt <strong>halbiert</strong> (\\(\\Delta x_{\\text{neu}} = 0{,}5 \\cdot \\Delta x_{\\text{alt}}\\), \\(\\Delta y_{\\text{neu}} = 0{,}5 \\cdot \\Delta y_{\\text{alt}}\\)). Welche Konsequenzen ergeben sich daraus für die Simulation derselben physikalischen Zeitspanne? (Mehrere Antworten möglich)</p>',
        answers: [
          {
            text: 'Die Anzahl der zu berechnenden Gitterzellen im zweidimensionalen Gebiet vervierfacht sich.',
            fraction: 50,
            feedback: 'Richtig! Da sowohl nx als auch ny verdoppelt werden, steigt die Knotenanzahl im 2D-Gebiet um den Faktor 2 * 2 = 4.'
          },
          {
            text: 'Wegen der viermal kleineren maximalen Zeitschrittweite vervielfacht sich der Gesamtrechenaufwand um Faktor 16.',
            fraction: 50,
            feedback: 'Richtig! 4-mal so viele Gitterknoten kombiniert mit 4-mal so vielen Zeitschritten (dt_max ~ dx^2) ergibt den Faktor 4 * 4 = 16 an Rechenoperationen.'
          },
          {
            text: 'Die maximal zulässige Zeitschrittweite dt_max darf bei feinerem Gitter doppelt so groß gewählt werden.',
            fraction: -50,
            feedback: 'Falsch! Aus dt_max = dx^2 / (4 * alpha) folgt, dass sich dt_max bei halbiertem dx auf ein Viertel reduziert.'
          },
          {
            text: 'Der räumliche Diskretisierungsfehler des zentralen Differenzenquotienten wächst um das Vierfache an.',
            fraction: -50,
            feedback: 'Falsch! Der zentrale Differenzenquotient hat die Konsistenzordnung O(dx^2); bei Halbierung von dx sinkt der räumliche Fehler auf ein Viertel.'
          }
        ],
        generalFeedback: '<p><strong>Der „Fluch der Dimensionen“ bei expliziten 2D-PDE-Lösern:</strong></p>' +
                         '<p>Halbiert man \\(\\Delta x\\) und \\(\\Delta y\\), vervierfacht sich die Anzahl der Pixel (\\(2 \\times 2 = 4\\)). Gleichzeitig zwingt die quadratische Stabilitätsbedingung \\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha}\\) zu einer Viertelung der Zeitschrittweite (also 4-mal so vielen Schritten pro Sekunde). Der gesamte Rechenaufwand steigt somit um den Faktor \\(4 \\cdot 4 = 16\\)!</p>'
      }
    ]
  },

  // =========================================================================
  // TEST 06 (PRÜFUNG)
  // =========================================================================
  {
    id: 'Test_06_Pruefung',
    title: 'Test 06 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante F)',
    category: '$course$/Quiz_01_Termin_03/Test_06_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'T06_Q1',
        title: '2D-Wärmeleitung: Stationäres Gleichgewicht & Schritt-Konvergenz',
        shortSummary: '5-Punkt-Stern bei $s=0{,}25$ & Gleichgewicht',
        type: 'cloze',
        grade: 2.0,
        text: '<p>In einem quadratischen 2D-Wärmeraster (\\(\\Delta x = \\Delta y\\)) hat der innere Knoten \\((i,j)\\) zum Zeitpunkt \\(n\\) die Temperatur \\(T_{i,j}^n = 50{,}0\\,^\\circ\\text{C}\\). Seine vier direkten Nachbarknoten werden konstant auf den Temperaturen \\(T_{\\text{links}} = 80{,}0\\,^\\circ\\text{C}\\), \\(T_{\\text{rechts}} = 40{,}0\\,^\\circ\\text{C}\\), \\(T_{\\text{oben}} = 60{,}0\\,^\\circ\\text{C}\\) und \\(T_{\\text{unten}} = 20{,}0\\,^\\circ\\text{C}\\) gehalten.</p>' +
              '<p>a) Welchen Wert hat der diskrete 2D-Laplace-Zähler \\(L = T_{i-1,j}^n + T_{i+1,j}^n + T_{i,j-1}^n + T_{i,j+1}^n - 4 T_{i,j}^n\\) (in <strong>°C</strong> bzw. <strong>K</strong>) für diesen Zustand?<br>' +
              'Antwort: {1:NUMERICAL:=0.0:0.01#Richtig! Summe der 4 Nachbarn = 80 + 40 + 60 + 20 = 200 °C; abzüglich 4 * 50 = 200 °C ergibt exakt 0,0 K.~%50%200.0:0.1#Teilpunkte (50 %): 200 °C ist nur die Summe der vier Nachbarn, es fehlt noch die Subtraktion von 4 * T_ij (= 200 °C).~%50%100.0:0.1#Teilpunkte (50 %): Sie haben nur 2 * T_ij statt 4 * T_ij abgezogen.} K</p>' +
              '<p>b) Welche Temperatur \\(T_{i,j}^{n+1}\\) (in <strong>°C</strong>) besitzt der Zentralknoten im nächsten Zeitschritt bei einer Stabilitätszahl von \\(s = 0{,}20\\)?<br>' +
              'Antwort: {1:NUMERICAL:=50.0:0.05#Richtig! Da der Laplace-Term 0 ist, befindet sich der Knoten exakt im lokalen thermischen Gleichgewicht (harmonische Eigenschaft: Mittelwert der Nachbarn = 200/4 = 50 °C).} °C</p>',
        generalFeedback: '<p><strong>Musterherleitung (Stationäres Gleichgewicht der Laplace-Gleichung):</strong></p>' +
                         '<p>1. Summe der vier Nachbarn: \\(80 + 40 + 60 + 20 = 200\\,^\\circ\\text{C}\\).<br>' +
                         'Abzüglich \\(4 \\cdot T_{i,j}^n = 4 \\cdot 50 = 200\\,^\\circ\\text{C}\\) ergibt sich \\(L = 200 - 200 = 0{,}0\\,\\text{K}\\).</p>' +
                         '<p>2. Damit folgt unabhängig von \\(s\\): \\(T_{i,j}^{n+1} = 50{,}0 + 0{,}20 \\cdot 0{,}0 = 50{,}0\\,^\\circ\\text{C}\\). Im stationären Zustand (\\(\\partial T / \\partial t = 0\\)) ist die Temperatur jedes Knotens exakt der arithmetische Mittelwert seiner vier Nachbarknoten!</p>'
      },
      {
        id: 'T06_Q2',
        title: 'Bodenkollision: Rücksprunggeschwindigkeit nach teilelastischem Stoß',
        shortSummary: 'Rücksprunggeschwindigkeit $v_{\\text{after}} = -e \\cdot v_{\\text{impact}}$',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Ein fallender Körper hat zu Beginn eines Zeitschritts (\\(t_n = 0{,}50\\,\\text{s}\\)) die Geschwindigkeit \\(v_n = -8{,}0\\,\\text{m/s}\\) (nach unten). Die lineare Höhen-Interpolation ergibt, dass der Körper nach dem relativen Zeitschrittanteil \\(\\tau = 0{,}50\\) eines Zeitschritts der Länge \\(\\Delta t = 0{,}20\\,\\text{s}\\) auf dem Boden aufschlägt (Erdbeschleunigung \\(g = 10{,}0\\,\\text{m/s}^2\\)). Der Boden besitzt den Restitutionskoeffizienten \\(e = 0{,}80\\).</p>' +
              '<p>Berechnen Sie die neue vertikale Geschwindigkeit \\(v_{\\text{after}}\\) (in <strong>m/s</strong>, positiv nach oben) unmittelbar <strong>nach</strong> der teilelastischen Reflexion am Boden.</p>',
        answers: [
          { value: 7.2, tolerance: 0.02, fraction: 100, feedback: 'Exakt! v_impact = -8,0 - 10,0 * (0,50 * 0,20) = -9,0 m/s; v_after = -0,80 * (-9,0) = +7,2 m/s.' },
          { value: -7.2, tolerance: 0.02, fraction: 50, feedback: 'Teilpunkte (50 %): Betrag 7,2 m/s ist richtig, aber nach der Reflexion am Boden zeigt die Geschwindigkeit nach oben (+7,2 m/s).' },
          { value: 6.4, tolerance: 0.02, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben mit v_n = -8,0 m/s statt mit der bis zum Aufprall beschleunigten Geschwindigkeit v_impact = -9,0 m/s gerechnet.' },
          { value: 8.0, tolerance: 0.02, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben über den vollen Zeitschritt dt = 0,20 s (v = -10 m/s -> 8,0 m/s) statt über tau * dt = 0,10 s beschleunigt.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (Sub-Step-Stoßgesetz):</strong></p>' +
                         '<p>1. Bis zum Aufprall vergeht die Teilzeit \\(\\Delta t_{\\text{impact}} = \\tau \\cdot \\Delta t = 0{,}50 \\cdot 0{,}20\\,\\text{s} = 0{,}10\\,\\text{s}\\).</p>' +
                         '<p>2. Aufprallgeschwindigkeit unmittelbar vor dem Bodenkontakt:<br>' +
                         '\\(v_{\\text{impact}} = v_n - g \\cdot \\Delta t_{\\text{impact}} = -8{,}0\\,\\text{m/s} - 10{,}0\\,\\text{m/s}^2 \\cdot 0{,}10\\,\\text{s} = -9{,}0\\,\\text{m/s}\\).</p>' +
                         '<p>3. Geschwindigkeit unmittelbar nach dem teilelastischen Stoß:<br>' +
                         '\\(v_{\\text{after}} = -e \\cdot v_{\\text{impact}} = -0{,}80 \\cdot (-9{,}0\\,\\text{m/s}) = +7{,}2\\,\\text{m/s}\\).</p>'
      },
      {
        id: 'T06_Q3',
        title: 'C#-Code-Tracing: Rückrechnung der Gitterspalte aus einem 1D-Byte-Offset',
        shortSummary: 'Rückrechnung Spalte `x` aus Byte-Offset `idx`',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Aus einem gegebenen 1D-Byte-Index <code>byteOffset</code> in einem <code>WriteableBitmap</code> (Format <code>Bgra32</code>, 4 Bytes pro Pixel) werden Zeile <code>y</code> und Spalte <code>x</code> mit folgendem C#-Code zurückgerechnet:</p>' +
              '<pre><code class="language-csharp">int stride = 400; // Bytes pro Zeile\nint byteOffset = 830;\nint y = byteOffset / stride;\nint x = (byteOffset % stride) / 4;</code></pre>' +
              '<p>Welchen exakten ganzzahligen Wert hat die Spaltenkoordinate <code>x</code> nach der Ausführung?</p>',
        answers: [
          { value: 7, tolerance: 0, fraction: 100, feedback: 'Richtig! 830 % 400 = 30 (Byte-Offset in Zeile 2); 30 / 4 = 7 (Ganzzahldivision in C#, Byte 2 ist der Rot-Kanal von Pixel x = 7).' },
          { value: 7.5, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben 30 / 4 = 7,5 als Gleitkommazahl berechnet; da beide Operanden int sind, schneidet C# den Nachkommateil zu 7 ab.' },
          { value: 30, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): 30 ist der Byte-Offset innerhalb der Zeile (830 % 400), es fehlt noch die Division durch 4 Bytes pro Pixel.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung:</strong></p>' +
                         '<p>1. Zeilenindex: <code>y = 830 / 400 = 2</code> (Ganzzahldivision).</p>' +
                         '<p>2. Byte-Rest innerhalb der Zeile 2: <code>830 % 400 = 30</code>.</p>' +
                         '<p>3. Spaltenindex: <code>x = 30 / 4 = 7</code> (Ganzzahldivision; die Bytes 28, 29, 30, 31 gehören alle zu Pixel <code>x = 7</code>).</p>'
      },
      {
        id: 'T06_Q4',
        title: 'C#-Lückentext: Packen von ARGB-Kanälen in einen 32-Bit-uint',
        shortSummary: 'Bit-Shifting `uint` Packen (`Bgra32`)',
        type: 'gapselect',
        grade: 1.0,
        text: '<p>Vervollständigen Sie die folgende C#-Anweisung, die vier <code>byte</code>-Variablen (<code>alpha</code>, <code>red</code>, <code>green</code>, <code>blue</code>) auf einem Little-Endian-System zu einem einzigen <code>uint</code>-Farbwert für <code>PixelFormats.Bgra32</code> zusammenpackt:</p>' +
              '<pre><code class="language-csharp">uint pixel = ((uint)alpha << [[1]])\n           | ((uint)red   << [[2]])\n           | ((uint)green << [[3]])\n           |  (uint)blue;</code></pre>',
        choices: [
          { text: '24', group: 1 },
          { text: '16', group: 2 },
          { text: '8', group: 3 },
          { text: '32', group: 1 },
          { text: '0', group: 1 },
          { text: '12', group: 2 },
          { text: '4', group: 2 },
          { text: '2', group: 3 },
          { text: '1', group: 3 }
        ],
        generalFeedback: '<p><strong>Erklärung (Little-Endian Bgra32 uint-Packing):</strong></p>' +
                         '<p>Auf Little-Endian-CPUs liegt das niederwertigste Byte (Bits 0..7) an der kleinsten Speicheradresse (Offset +0 = <code>blue</code>). <code>green</code> (Offset +1) muss um <code>8</code> Bits, <code>red</code> (Offset +2) um <code>16</code> Bits und <code>alpha</code> (Offset +3) um <code>24</code> Bits nach links verschoben werden.</p>'
      },
      {
        id: 'T06_Q5',
        title: 'Pipeline-Reihenfolge: Simulationsschleife des 2D-Wärmerasters',
        shortSummary: 'Ablaufkette 2D-FDM-Simulationsschritt',
        type: 'ddwtos',
        grade: 1.0,
        text: '<p>Bringen Sie die vier Teilschritte innerhalb eines einzelnen Frames der gekoppelten 2D-Wärmeleitungs- und Visualisierungsschleife in die logisch korrekte Ausführungsreihenfolge:</p>' +
              '<p>Schritt 1: [[1]]<br>' +
              'Schritt 2: [[2]]<br>' +
              'Schritt 3: [[3]]<br>' +
              'Schritt 4: [[4]]</p>',
        dragboxes: [
          { text: 'Innere Knoten mit 5-Punkt-Stern aus T in T_next berechnen', group: 1 },
          { text: 'Randbedingungen (Dirichlet / Neumann) auf T_next anwenden', group: 1 },
          { text: 'Zustandspuffer tauschen bzw. T_next nach T kopieren', group: 1 },
          { text: 'Temperaturen T in Bgra32-Farben umrechnen und in BackBuffer schreiben', group: 1 },
          { text: 'Gitterweite dx durch Null teilen', group: 1 },
          { text: 'UI-Thread mit Thread.Sleep(5000) blockieren', group: 1 }
        ],
        generalFeedback: '<p><strong>Erklärung des Simulationszyklus:</strong></p>' +
                         '<p>Zuerst werden alle inneren Gitterpunkte aus dem alten Zustand <code>T</code> nach <code>T_next</code> integriert, anschließend werden die Ränder von <code>T_next</code> gemäß Randbedingungen aktualisiert. Nach dem Puffer-Tausch (<code>T_next &rarr; T</code>) ist der neue Zeitschritt vollständig und wird als Falschfarbenbild in den <code>BackBuffer</code> gerendert.</p>'
      },
      {
        id: 'T06_Q6',
        title: 'Partielle Differentialgleichungen: Bedeutung der Temperaturleitfähigkeit',
        shortSummary: 'Physikalische Bedeutung von $\\alpha = \\lambda / (\\rho c_p)$',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>In der 2D-Wärmeleitungsgleichung \\(\\frac{\\partial T}{\\partial t} = \\alpha \\left(\\frac{\\partial^2 T}{\\partial x^2} + \\frac{\\partial^2 T}{\\partial y^2}\\right)\\) tritt der Materialparameter \\(\\alpha = \\frac{\\lambda}{\\rho \\cdot c_p}\\) auf. Welche physikalische Aussage über \\(\\alpha\\) ist korrekt?</p>',
        answers: [
          {
            text: 'Ein großes alpha bewirkt einen schnellen Temperaturausgleich bei gleichzeitig kleinerer Stabilitätsgrenze dt_max.',
            fraction: 100,
            feedback: 'Richtig! Hohe Wärmeleitfähigkeit lambda und geringe Wärmekapazität rho*c_p beschleunigen die Diffusion, verkleinern aber dt_max = dx^2 / (4*alpha).'
          },
          {
            text: 'Die Größe alpha besitzt die SI-Einheit Watt pro Kelvin und hängt nur von der Bauteilmasse ab.',
            fraction: 0,
            feedback: 'Falsch. Die Temperaturleitfähigkeit alpha hat die Einheit m^2/s (bzw. mm^2/s) und ist eine reine Materialkonstante.'
          },
          {
            text: 'Ein großes alpha bedeutet, dass das Material Wärme extrem schlecht leitet und perfekt isoliert.',
            fraction: 0,
            feedback: 'Falsch. Da die Wärmeleitfähigkeit lambda im Zähler steht, haben gute Wärmeleiter (wie Kupfer oder Silber) ein besonders großes alpha.'
          },
          {
            text: 'Der Parameter alpha verändert nur die stationäre Endtemperatur, nicht aber die Geschwindigkeit des Ausgleichs.',
            fraction: 0,
            feedback: 'Falsch. Im stationären Zustand (dT/dt = 0) kürzt sich alpha aus der Laplace-Gleichung heraus; alpha bestimmt ausschließlich die Ausgleichsgeschwindigkeit!'
          }
        ],
        generalFeedback: '<p><strong>Physikalische Interpretation:</strong></p>' +
                         '<p>Die Temperaturleitfähigkeit \\(\\alpha = \\frac{\\lambda}{\\rho c_p}\\) (Einheit \\(\\text{m}^2/\\text{s}\\)) setzt das Wärmeleitvermögen \\(\\lambda\\) ins Verhältnis zur volumetrischen Wärmespeicherfähigkeit \\(\\rho c_p\\). Je größer \\(\\alpha\\) ist, desto rascher breiten sich Temperaturfronten aus und desto kleiner muss \\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha}\\) gewählt werden.</p>'
      },
      {
        id: 'T06_Q7',
        title: 'C#-Bug-Diagnose: Array-Grenzüberschreitung am Plattenrand',
        shortSummary: 'Find the Bug: Schleife ab `0` bis `nx` im 5-Punkt-Stern',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Ein Student programmiert die räumliche Schleife für den 5-Punkt-Stern auf einem 2D-Array <code>double[,] T = new double[nx, ny]</code> wie folgt:</p>' +
              '<pre><code class="language-csharp">for (int y = 0; y < ny; y++)\n    for (int x = 0; x < nx; x++)\n        T_next[x, y] = T[x, y] + s * (T[x-1, y] + T[x+1, y] + T[x, y-1] + T[x, y+1] - 4 * T[x, y]);</code></pre>' +
              '<p>Welcher Laufzeitfehler tritt beim Start dieser Methode sofort im ersten Schleifendurchlauf (<code>x = 0, y = 0</code>) auf?</p>',
        answers: [
          {
            text: 'Der Zugriff auf T[x-1, y] versucht den negativen Index -1 zu lesen und wirft eine IndexOutOfRangeException.',
            fraction: 100,
            feedback: 'Richtig! Für x = 0 ist x - 1 = -1 (und am oberen Ende für x = nx - 1 ist x + 1 = nx); die Innenschleife darf nur von 1 bis nx - 2 laufen.'
          },
          {
            text: 'C# interpretiert den Index -1 automatisch als periodische Randbedingung und liest den rechten Rand nx - 1.',
            fraction: 0,
            feedback: 'Falsch. Anders als Python unterstützt die reguläre Array-Indizierung in C# keine negativen Wrap-Around-Indizes, sondern prüft streng auf >= 0.'
          },
          {
            text: 'Das zweidimensionale Array T_next wird durch die Schleife automatisch um zwei Zeilen und Spalten vergrößert.',
            fraction: 0,
            feedback: 'Falsch. Arrays haben in C# eine feste Größe; ein Schreib- oder Lesezugriff außerhalb von 0..Length-1 führt sofort zu einer Exception.'
          },
          {
            text: 'Der Compiler verweigert die Übersetzung, weil die Schleifenvariablen x und y nicht vom Typ double sind.',
            fraction: 0,
            feedback: 'Falsch. Array-Indizes müssen in C# ganzzahlig (z. B. int) sein; double-Indizes wären gar nicht kompilierbar.'
          }
        ],
        generalFeedback: '<p><strong>Fehleranalyse (Innere Knoten vs. Randknoten):</strong></p>' +
                         '<p>Da der 5-Punkt-Stern auf <code>x - 1</code>, <code>x + 1</code>, <code>y - 1</code> und <code>y + 1</code> zugreift, darf er ausschließlich auf den <strong>inneren Gitterknoten</strong> (<code>x = 1 ... nx - 2</code> und <code>y = 1 ... ny - 2</code>) ausgeführt werden. Die Randknoten bei <code>0</code> und <code>nx - 1</code> bzw. <code>ny - 1</code> werden separat über die Randbedingungen gesetzt.</p>'
      },
      {
        id: 'T06_Q8',
        title: 'Digital-Twin-Reifegrade: Unterscheidung nach Kritzinger et al.',
        shortSummary: 'Digital Model vs. Digital Shadow vs. Digital Twin',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: '<p>Welche der folgenden Aussagen zur Klassifikation von <em>Digital Model</em>, <em>Digital Shadow</em> und <em>Digital Twin</em> nach Kritzinger et al. sind <strong>korrekt</strong>? (Mehrere Antworten möglich)</p>',
        answers: [
          {
            text: 'Beim Digital Shadow fließen Sensordaten automatisch in das Modell, aber es gibt keinen automatischen Rückeingriff.',
            fraction: 50,
            feedback: 'Richtig! Ein Digital Shadow spiegelt den Zustand der realen Anlage in Echtzeit wider (One-Way-Automatisierung), steuert sie aber nicht selbsttätig.'
          },
          {
            text: 'Erst beim Digital Twin existiert ein vollautomatischer Datenfluss in beide Richtungen zwischen Realität und Modell.',
            fraction: 50,
            feedback: 'Richtig! Der Digital Twin schließt den Regelkreis: Sensordaten aktualisieren das Modell, und das Modell greift automatisch auf die reale Anlage zurück.'
          },
          {
            text: 'Ein reines Offline-Simulationsmodell ohne Live-Anbindung wird bei Kritzinger bereits als Digital Twin bezeichnet.',
            fraction: -50,
            feedback: 'Falsch! Ein Modell mit rein manuellem Datenaustausch ist nach Kritzinger lediglich ein Digital Model, noch kein Digital Twin.'
          },
          {
            text: 'Der Unterschied zwischen Digital Shadow und Digital Twin liegt ausschließlich in der Auflösung des Monitors.',
            fraction: -50,
            feedback: 'Falsch! Das Unterscheidungskriterium bei Kritzinger et al. ist ausschließlich der Automatisierungsgrad des bidirektionalen Datenflusses.'
          }
        ],
        generalFeedback: '<p><strong>Zusammenfassung (Kritzinger-Reifegrade):</strong></p>' +
                         '<p>Kritzinger et al. (2018) unterscheiden strikt nach dem Grad der Datenintegration: 1. <strong>Digital Model</strong> (beide Richtungen manuell), 2. <strong>Digital Shadow</strong> (Physisch &rarr; Digital automatisch, Rückweg manuell), 3. <strong>Digital Twin</strong> (beide Richtungen vollautomatisch gekoppelt).</p>'
      }
    ]
  },

  // =========================================================================
  // TEST 07 (PRÜFUNG)
  // =========================================================================
  {
    id: 'Test_07_Pruefung',
    title: 'Test 07 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante G)',
    category: '$course$/Quiz_01_Termin_03/Test_07_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'T07_Q1',
        title: '2D-Wärmeleitung: Rückrechnung der Temperaturleitfähigkeit & Grenzschrittweite',
        shortSummary: 'Rückrechnung $\\alpha$ aus $s$ & $\\Delta t_{\\max}$',
        type: 'cloze',
        grade: 2.0,
        text: '<p>In einer 2D-Wärmeleitungssimulation mit der Maschenweite \\(\\Delta x = \\Delta y = 3{,}0\\,\\text{mm}\\) und der eingestellten Zeitschrittweite \\(\\Delta t = 0{,}05\\,\\text{s}\\) beträgt die dimensionslose Stabilitätszahl aktuell exakt \\(s = 0{,}20\\).</p>' +
              '<p>a) Wie groß ist die im Modell hinterlegte Temperaturleitfähigkeit \\(\\alpha\\) des Materials in <strong>\\(\\text{mm}^2/\\text{s}\\)</strong>?<br>' +
              'Antwort: {1:NUMERICAL:=36.0:0.1#Richtig! Aus s = alpha * dt / dx^2 folgt alpha = s * dx^2 / dt = 0,20 * 9,0 / 0,05 = 1,8 / 0,05 = 36,0 mm^2/s.~%50%12.0:0.1#Teilpunkte (50 %): Sie haben mit dx = 3 statt mit dx^2 = 9 gerechnet (0,20 * 3 / 0,05 = 12).} \\(\\text{mm}^2/\\text{s}\\)</p>' +
              '<p>b) Auf welchen Maximalwert \\(\\Delta t_{\\max}\\) (in <strong>Millisekunden (ms)</strong>) dürfte die Zeitschrittweite bei diesem Gitter und Material höchstens erhöht werden, bevor Instabilität (\\(s > 0{,}25\\)) eintritt?<br>' +
              'Antwort: {1:NUMERICAL:=62.5:0.2#Richtig! dt_max = dx^2 / (4 * alpha) = 9,0 / (4 * 36,0) = 9 / 144 = 0,0625 s = 62,5 ms (bzw. 0,05 s * (0,25 / 0,20) = 62,5 ms).~%50%0.0625:0.001#Teilpunkte (50 %): Zahlenwert in Sekunden statt in Millisekunden (ms) angegeben.~%50%125.0:0.5#Teilpunkte (50 %): Sie haben die 1D-Stabilitätsgrenze s = 0,50 statt der 2D-Grenze s = 0,25 angesetzt.} ms</p>',
        generalFeedback: '<p><strong>Musterherleitung:</strong></p>' +
                         '<p>1. Auflösen von \\(s = \\frac{\\alpha \\cdot \\Delta t}{\\Delta x^2}\\) nach \\(\\alpha\\):<br>' +
                         '\\(\\alpha = \\frac{s \\cdot \\Delta x^2}{\\Delta t} = \\frac{0{,}20 \\cdot (3{,}0\\,\\text{mm})^2}{0{,}05\\,\\text{s}} = \\frac{1{,}8}{0{,}05}\\,\\text{mm}^2/\\text{s} = 36{,}0\\,\\text{mm}^2/\\text{s}\\).</p>' +
                         '<p>2. Da \\(s\\) proportional zu \\(\\Delta t\\) ist, erreicht \\(s\\) den Grenzwert \\(0{,}25\\) bei:<br>' +
                         '\\(\\Delta t_{\\max} = \\Delta t \\cdot \\frac{0{,}25}{0{,}20} = 50\\,\\text{ms} \\cdot 1{,}25 = 62{,}5\\,\\text{ms}\\).</p>'
      },
      {
        id: 'T07_Q2',
        title: 'Expliziter Euler: Relaxation eines geregelten Antriebs 1. Ordnung',
        shortSummary: 'Euler-Zustand $v_2$ eines PT1-Glieds nach 2 Schritten',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Die Drehzahlregelung eines Antriebs wird durch die Differentialgleichung 1. Ordnung \\(\\dot{v}(t) = 5{,}0\\,\\text{s}^{-1} \\cdot (v_{\\text{soll}} - v(t))\\) mit dem Sollwert \\(v_{\\text{soll}} = 10{,}0\\,\\text{m/s}\\) und dem Startwert \\(v_0 = 0{,}0\\,\\text{m/s}\\) beschrieben.</p>' +
              '<p>Berechnen Sie die Geschwindigkeit \\(v_2\\) (in <strong>m/s</strong>) nach exakt <strong>zwei Zeitschritten</strong> der Schrittweite \\(\\Delta t = 0{,}10\\,\\text{s}\\) (also bei \\(t_2 = 0{,}20\\,\\text{s}\\)) mit dem <strong>expliziten Euler-Verfahren</strong>.</p>',
        answers: [
          { value: 7.5, tolerance: 0.01, fraction: 100, feedback: 'Exakt! Schritt 1: v_1 = 0 + 0,1 * 5 * (10 - 0) = 5,0 m/s. Schritt 2: v_2 = 5,0 + 0,1 * 5 * (10 - 5,0) = 5,0 + 2,5 = 7,5 m/s.' },
          { value: 5.0, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): 5,0 m/s ist der Zwischenwert v_1 nach nur einem Zeitschritt (t_1 = 0,10 s), gefragt war aber v_2 nach zwei Schritten.' },
          { value: 10.0, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben im zweiten Schritt erneut mit der Anfangssteigung 50 m/s^2 statt mit der reduzierten Steigung 5 * (10 - 5) = 25 m/s^2 gerechnet.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung:</strong></p>' +
                         '<p><strong>Schritt 1 (\\(t_0 = 0 \\to t_1 = 0{,}10\\,\\text{s}\\)):</strong><br>' +
                         '\\(\\dot{v}_0 = 5{,}0 \\cdot (10{,}0 - 0{,}0) = 50{,}0\\,\\text{m/s}^2\\)<br>' +
                         '\\(v_1 = v_0 + \\Delta t \\cdot \\dot{v}_0 = 0{,}0 + 0{,}10 \\cdot 50{,}0 = 5{,}0\\,\\text{m/s}\\).</p>' +
                         '<p><strong>Schritt 2 (\\(t_1 = 0{,}10 \\to t_2 = 0{,}20\\,\\text{s}\\)):</strong><br>' +
                         '\\(\\dot{v}_1 = 5{,}0 \\cdot (10{,}0 - 5{,}0) = 25{,}0\\,\\text{m/s}^2\\)<br>' +
                         '\\(v_2 = v_1 + \\Delta t \\cdot \\dot{v}_1 = 5{,}0 + 0{,}10 \\cdot 25{,}0 = 7{,}5\\,\\text{m/s}\\).</p>'
      },
      {
        id: 'T07_Q3',
        title: 'C#-Code-Tracing: Neumann-Randbedingung + 5-Punkt-Stern am Randnachbarn',
        shortSummary: 'Code-Tracing Neumann-Rand + 5-Punkt-Stern',
        type: 'numerical',
        grade: 1.5,
        text: '<p>In einer 1D-Scheibe eines Wärmegitters wird zuerst der linke Rand <code>T[0]</code> isoliert (homogene Neumann-Randbedingung) und unmittelbar danach der Knoten <code>T[1]</code> aktualisiert:</p>' +
              '<pre><code class="language-csharp">double[] T = { 0.0, 20.0, 60.0 };\ndouble s = 0.25;\nT[0] = T[1]; // Isolierter Neumann-Rand links\ndouble T1_next = T[1] + s * (T[0] + T[2] - 2.0 * T[1]);</code></pre>' +
              '<p>Welchen exakten Zahlenwert hat die Variable <code>T1_next</code> nach der Ausführung?</p>',
        answers: [
          { value: 30.0, tolerance: 0.01, fraction: 100, feedback: 'Richtig! Durch T[0] = T[1] = 20.0 wird T1_next = 20 + 0,25 * (20 + 60 - 40) = 20 + 0,25 * 40 = 30,0.' },
          { value: 25.0, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben für T[0] noch den alten Startwert 0.0 statt des kopierten Neumann-Wertes T[0] = 20.0 eingesetzt (20 + 0,25 * 20 = 25).' },
          { value: 40.0, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben s = 0,50 statt s = 0,25 gerechnet.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung:</strong></p>' +
                         '<p>1. Die Zuweisung <code>T[0] = T[1];</code> setzt <code>T[0]</code> von <code>0.0</code> auf <code>20.0</code> (kein Temperaturgradient zwischen Index 0 und Index 1).</p>' +
                         '<p>2. Damit lautet die Klammer: <code>T[0] + T[2] - 2.0 * T[1] = 20.0 + 60.0 - 2.0 * 20.0 = 40.0</code>.</p>' +
                         '<p>3. Multipliziert mit <code>s = 0.25</code> ergibt sich <code>T1_next = 20.0 + 0.25 * 40.0 = 30.0</code>.</p>'
      },
      {
        id: 'T07_Q4',
        title: 'C#-Lückentext: Vollständiger WriteableBitmap-Update-Rahmen',
        shortSummary: '`WriteableBitmap` Methodenrahmen (`Lock`, `AddDirtyRect`, `Unlock`)',
        type: 'gapselect',
        grade: 1.0,
        text: '<p>Vervollständigen Sie den Methodenrahmen zur sicheren Aktualisierung eines <code>WriteableBitmap bmp</code> der Breite <code>w</code> und Höhe <code>h</code>:</p>' +
              '<pre><code class="language-csharp">bmp.[[1]]();\ntry\n{\n    WriteHeatmapPixels(bmp.BackBuffer, bmp.BackBufferStride, w, h);\n    bmp.[[2]](new Int32Rect(0, 0, w, h));\n}\nfinally\n{\n    bmp.[[3]]();\n}</code></pre>',
        choices: [
          { text: 'Lock', group: 1 },
          { text: 'AddDirtyRect', group: 2 },
          { text: 'Unlock', group: 3 },
          { text: 'BeginInit', group: 1 },
          { text: 'Freeze', group: 1 },
          { text: 'WritePixels', group: 2 },
          { text: 'ClearRect', group: 2 },
          { text: 'EndInit', group: 3 },
          { text: 'Dispose', group: 3 }
        ],
        generalFeedback: '<p><strong>Erklärung:</strong></p>' +
                         '<p>Das Muster <code>bmp.Lock()</code> &rarr; <code>try { ... bmp.AddDirtyRect(...); }</code> &rarr; <code>finally { bmp.Unlock(); }</code> stellt sicher, dass der unverwaltete Speicherpuffer auch im Falle einer Exception zuverlässig wieder entsperrt wird.</p>'
      },
      {
        id: 'T07_Q5',
        title: 'Konzept-Zuordnung: Numerische Verfahren & Stabilitätsbegriffe',
        shortSummary: 'Zuordnung Numerik-Begriffe (Euler, Heun, CFL, Symplektisch)',
        type: 'matching',
        grade: 1.0,
        text: '<p>Ordnen Sie die folgenden Charakteristika dem jeweils passenden numerischen Konzept aus Kapitel 01 und 02 zu. Beachten Sie die zwei Überhang-Distraktoren.</p>',
        subquestions: [
          { text: 'Einstufiges Verfahren 1. Ordnung, das nur die Tangente am aktuellen Zeitpunkt t_n auswertet.', answer: 'Explizites Standard-Euler-Verfahren' },
          { text: 'Zweistufiges Verfahren 2. Ordnung, das den Mittelwert aus Start- und Prädiktor-Steigung bildet.', answer: 'Heun-Verfahren (Runge-Kutta 2. Ordnung)' },
          { text: 'Modifiziertes Euler-Verfahren, das zuerst v_n+1 berechnet und damit y_n+1 energieerhaltend fortschreibt.', answer: 'Semi-implizites (symplektisches) Euler-Verfahren' },
          { text: 'Bedingung s <= 0,25, die verhindert, dass sich Fehler im expliziten 2D-Wärmegitter aufschaukeln.', answer: '2D-Von-Neumann- / CFL-Stabilitätsbedingung' },
          { text: '', answer: 'Cholesky-Matrixfaktorisierung für statische Fachwerke' },
          { text: '', answer: 'Ereignisdiskrete Warteschlangen-Simulation (Kendall)' }
        ],
        generalFeedback: '<p><strong>Zusammenfassung:</strong></p>' +
                         '<ul><li><strong>Standard-Euler:</strong> \\(y_{n+1} = y_n + \\Delta t f(t_n, y_n)\\), Ordnung 1.</li>' +
                         '<li><strong>Heun (RK2):</strong> Prädiktor-Korrektor-Verfahren, Ordnung 2.</li>' +
                         '<li><strong>Symplektischer Euler:</strong> Nutzt \\(v_{n+1}\\) für das Orts-Update \\(y_{n+1}\\) und erhält das Phasenraumvolumen bei Hamilton-Systemen.</li>' +
                         '<li><strong>2D-Stabilitätsgrenze:</strong> \\(s = \\frac{\\alpha \\Delta t}{\\Delta x^2} \\le 0{,}25\\).</li></ul>'
      },
      {
        id: 'T07_Q6',
        title: 'Physikalische Modellierung: Bedeutung eines Neumann-Randes an einer Symmetrieachse',
        shortSummary: 'Adiabater Neumann-Rand als thermische Symmetrieebene',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Eine rechteckige Platte ist geometrisch und thermisch exakt spiegelsymmetrisch zu ihrer vertikalen Mittellinie. Um Rechenzeit zu sparen, soll nur die linke Plattenhälfte simuliert werden. Welche Randbedingung muss dafür entlang der vertikalen Symmetrielinie angesetzt werden?</p>',
        answers: [
          {
            text: 'Eine homogene Neumann-Randbedingung (dT/dx = 0), da aus Symmetriegründen kein Wärmestrom die Mitte kreuzt.',
            fraction: 100,
            feedback: 'Richtig! Wegen T(-x) = T(+x) verschwindet an der Symmetrieachse die horizontale Ableitung dT/dx = 0, was exakt einer adiabaten Neumann-Wand entspricht.'
          },
          {
            text: 'Eine Dirichlet-Randbedingung mit T = 0 °C, weil sich die Wärmeströme in der Plattenmitte zu Null addieren.',
            fraction: 0,
            feedback: 'Falsch. An der Symmetrieachse ist der Wärmestrom (die Ableitung dT/dx) gleich Null, nicht aber die Temperatur T selbst!'
          },
          {
            text: 'Eine zufällig schwankende Temperaturvorgabe, um die fehlende rechte Plattenhälfte statistisch zu ersetzen.',
            fraction: 0,
            feedback: 'Falsch. Das Wärmeleitungsproblem ist rein deterministisch; Zufallswerte würden die physikalische Lösung verfälschen.'
          },
          {
            text: 'Gar keine Randbedingung, sodass der 5-Punkt-Stern am rechten Rand einfach auf nicht existente Indizes zugreift.',
            fraction: 0,
            feedback: 'Falsch. Jeder Rand eines diskreten Rechengebiets benötigt eine wohldefinierte Randbedingung, sonst entsteht eine IndexOutOfRangeException.'
          }
        ],
        generalFeedback: '<p><strong>Symmetrie-Ausnutzung in der Simulation:</strong></p>' +
                         '<p>An einer Spiegelsymmetrieebene ist das Temperaturprofil links und rechts identisch, sodass kein Netto-Wärmestrom über die Symmetrielinie fließt (\\(\\dot{q}_x = -\\lambda \\frac{\\partial T}{\\partial x} = 0\\)). Eine Symmetrieebene wird daher numerisch exakt wie eine perfekt wärmegedämmte Wand über eine homogene Neumann-Randbedingung (\\(T_{\\text{Rand}} = T_{\\text{Nachbar}}\\)) abgebildet.</p>'
      },
      {
        id: 'T07_Q7',
        title: 'C#-Bug-Diagnose: Referenz-Aliasing statt echtem Double-Buffering',
        shortSummary: 'Find the Bug: `T = T_next` setzt beide Referenzen gleich',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Um sich nach dem 2D-Wärmeleitungsschritt den Aufruf von <code>Array.Copy(T_next, T, T.Length)</code> zu sparen, schreibt ein Student am Ende der Zeitschritt-Methode einfach:</p>' +
              '<pre><code class="language-csharp">// Am Ende von Step():\nT = T_next;</code></pre>' +
              '<p>Welcher schwerwiegende Fehler entsteht dadurch ab dem <strong>zweiten</strong> Zeitschritt?</p>',
        answers: [
          {
            text: 'Beide Variablen zeigen danach auf dasselbe Array-Objekt im Heap, sodass ab Schritt 2 in-place überschrieben wird.',
            fraction: 100,
            feedback: 'Richtig! T = T_next kopiert nur die Speicherreferenz; ab dem nächsten Schritt zeigen T und T_next auf denselben Speicherblock (für einen echten Swap bräuchte man (T, T_next) = (T_next, T)).'
          },
          {
            text: 'In C# ist die Zuweisung einer Array-Variablen an eine andere syntaktisch verboten und kompiliert nicht.',
            fraction: 0,
            feedback: 'Falsch. Arrays sind in C# Referenztypen; die Zuweisung T = T_next ist syntaktisch völlig legal, erzeugt aber das gefährliche Referenz-Aliasing.'
          },
          {
            text: 'Der Garbage Collector löscht durch diese Zeile sofort beide Arrays noch während des laufenden Schritts.',
            fraction: 0,
            feedback: 'Falsch. Solange eine aktive Variable (T und T_next) auf das zweite Array verweist, wird dieses Array niemals vom Garbage Collector freigegeben.'
          },
          {
            text: 'Die Zuweisung T = T_next setzt alle gespeicherten Temperaturwerte im Array automatisch auf 0.0 zurück.',
            fraction: 0,
            feedback: 'Falsch. Eine Referenz-Zuweisung verändert keine Array-Inhalte, sondern biegt lediglich den Zeiger T auf das Objekt von T_next um.'
          }
        ],
        generalFeedback: '<p><strong>Fehleranalyse (Referenz-Aliasing vs. Pointer-Swap):</strong></p>' +
                         '<p>Da Arrays in C# Referenztypen sind, bewirkt <code>T = T_next;</code>, dass beide Variablen auf <strong>exakt dasselbe Array im Heap</strong> verweisen (das ursprüngliche <code>T</code>-Array geht verloren). Im nächsten Zeitschritt liest und schreibt der Code somit im selben Array! Möchte man <code>Array.Copy</code> durch einen schnellen Referenztausch ersetzen, muss man beide Referenzen dreieckstauschen: <code>(T, T_next) = (T_next, T);</code>.</p>'
      },
      {
        id: 'T07_Q8',
        title: 'Speicher- & Farbarchitektur: Eigenschaften von PixelFormats.Bgra32',
        shortSummary: 'Eigenschaften von `Bgra32` & Little-Endian-Zugriff',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: '<p>Welche der folgenden Aussagen zum Pixelformat <code>PixelFormats.Bgra32</code> in WPF und dessen Adressierung auf x86/x64-Prozessoren (Little-Endian) sind <strong>korrekt</strong>? (Mehrere Antworten möglich)</p>',
        answers: [
          {
            text: 'Beim Zugriff über einen byte*-Pointer liegt der Blau-Kanal am Offset +0 und der Alpha-Kanal am Offset +3.',
            fraction: 50,
            feedback: 'Richtig! Der Name Bgra32 gibt exakt die Byte-Reihenfolge im Speicher an: Byte 0 = B, Byte 1 = G, Byte 2 = R, Byte 3 = A.'
          },
          {
            text: 'Beim Schreiben als 32-Bit-uint repräsentiert das Hex-Literal 0xFFFF0000 ein voll deckendes rotes Pixel.',
            fraction: 50,
            feedback: 'Richtig! Wegen Little-Endian landet das höchste Byte 0xFF an Offset +3 (Alpha = 255) und das zweithöchste Byte 0xFF an Offset +2 (Rot = 255).'
          },
          {
            text: 'Jeder einzelne Farbkanal (B, G, R, A) wird in Bgra32 als 32-Bit-Gleitkommazahl (float) gespeichert.',
            fraction: -50,
            feedback: 'Falsch! Die 32 im Namen Bgra32 steht für 32 Bit pro gesamtem Pixel (also 4 Kanäle zu je 8 Bit = 1 Byte), nicht für 32 Bit pro Kanal.'
          },
          {
            text: 'Ein Alpha-Kanalwert von 0 bewirkt in WPF, dass das Pixel mit maximaler Leuchtkraft dargestellt wird.',
            fraction: -50,
            feedback: 'Falsch! Alpha = 0 bedeutet 0 % Deckkraft (vollständig transparent), während Alpha = 255 für volle Sichtbarkeit steht.'
          }
        ],
        generalFeedback: '<p><strong>Zusammenfassung:</strong></p>' +
                         '<p>In <code>Bgra32</code> belegt jedes Pixel \\(4\\,\\text{Bytes} = 32\\,\\text{Bit}\\). Im Speicher folgen aufeinander: <code>[B, G, R, A]</code>. Liest oder schreibt man diese 4 Bytes auf einer Little-Endian-CPU als einzelnen <code>uint</code>, kehrt sich die Wertigkeitsreihenfolge zu <code>0xAARRGGBB</code> um.</p>'
      }
    ]
  },

  // =========================================================================
  // TEST 08 (PRÜFUNG)
  // =========================================================================
  {
    id: 'Test_08_Pruefung',
    title: 'Test 08 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante H)',
    category: '$course$/Quiz_01_Termin_03/Test_08_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'T08_Q1',
        title: '2D-Wärmeleitung: Gitterverfeinerung & Rechenzeitfaktor',
        shortSummary: 'Halbierung von $\\Delta x$ $\\to$ neues $\\Delta t_{\\max}$ & Schritte',
        type: 'cloze',
        grade: 2.0,
        text: '<p>Eine explizite 2D-Wärmeleitungssimulation (\\(\\alpha = 25\\,\\text{mm}^2/\\text{s}\\)) läuft auf einem Ausgangsgitter mit \\(\\Delta x_{\\text{alt}} = 4{,}0\\,\\text{mm}\\) zunächst mit der maximal stabilen Schrittweite \\(\\Delta t_{\\max,\\text{alt}} = 0{,}16\\,\\text{s}\\). Für eine höhere Detailauflösung wird die Gitterweite in beide Raumrichtungen auf \\(\\Delta x_{\\text{neu}} = 2{,}0\\,\\text{mm}\\) halbiert.</p>' +
              '<p>a) Wie groß ist die neue maximal zulässige Zeitschrittweite \\(\\Delta t_{\\max,\\text{neu}}\\) in <strong>Millisekunden (ms)</strong> auf dem feineren Gitter?<br>' +
              'Antwort: {1:NUMERICAL:=40:0.1#Richtig! dt_max,neu = dx_neu^2 / (4 * alpha) = 4,0 / 100 = 0,04 s = 40 ms (ein Viertel von 160 ms).~%50%80:0.1#Teilpunkte (50 %): Sie haben dt_max nur halbiert (80 ms) statt geviertelt, oder mit dem 1D-Faktor 2 gerechnet.~%50%0.04:0.001#Teilpunkte (50 %): Zahlenwert in Sekunden statt in Millisekunden (ms) angegeben.} ms</p>' +
              '<p>b) Wie viele explizite Zeitschritte \\(N_{\\text{steps}}\\) sind auf dem feinen Gitter nötig, um eine physikalische Dauer von \\(t_{\\text{end}} = 2{,}0\\,\\text{s}\\) bei \\(\\Delta t = \\Delta t_{\\max,\\text{neu}}\\) zu simulieren?<br>' +
              'Antwort: {1:NUMERICAL:=50:0#Richtig! N = 2,0 s / 0,04 s = 50 Zeitschritte.~%50%25:0#Teilpunkte (50 %): Folgefehler aus dt = 80 ms (2,0 s / 0,08 s = 25 Schritte).} Schritte</p>',
        generalFeedback: '<p><strong>Musterherleitung:</strong></p>' +
                         '<p>1. Aus \\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha}\\) folgt für \\(\\Delta x_{\\text{neu}} = 2{,}0\\,\\text{mm}\\):<br>' +
                         '\\(\\Delta t_{\\max,\\text{neu}} = \\frac{(2{,}0\\,\\text{mm})^2}{4 \\cdot 25\\,\\text{mm}^2/\\text{s}} = \\frac{4}{100}\\,\\text{s} = 0{,}04\\,\\text{s} = 40\\,\\text{ms}\\).</p>' +
                         '<p>2. Für \\(t_{\\text{end}} = 2{,}0\\,\\text{s}\\) werden damit \\(N_{\\text{steps}} = \\frac{2{,}0\\,\\text{s}}{0{,}04\\,\\text{s}} = 50\\,\\text{Schritte}\\) benötigt.</p>'
      },
      {
        id: 'T08_Q2',
        title: 'Kinematik: Zweischritt-Euler eines vertikal nach oben geworfenen Körpers',
        shortSummary: 'Steigflug-Höhe $y_2$ nach 2 Euler-Schritten',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Ein Körper wird zum Zeitpunkt \\(t_0 = 0\\,\\text{s}\\) vom Boden aus (\\(y_0 = 0{,}0\\,\\text{m}\\)) mit einer Anfangsgeschwindigkeit von \\(v_0 = +15{,}0\\,\\text{m/s}\\) senkrecht nach oben abgeworfen (Erdbeschleunigung \\(g = 10{,}0\\,\\text{m/s}^2\\) nach unten).</p>' +
              '<p>Berechnen Sie die Höhe \\(y_2\\) (in <strong>Metern</strong>) zum Zeitpunkt \\(t_2 = 1{,}0\\,\\text{s}\\) nach exakt <strong>zwei Zeitschritten</strong> der Länge \\(\\Delta t = 0{,}50\\,\\text{s}\\) mit dem <strong>expliziten Standard-Euler-Verfahren</strong>.</p>',
        answers: [
          { value: 12.5, tolerance: 0.02, fraction: 100, feedback: 'Exakt! Schritt 1: y_1 = 0 + 0,5 * 15 = 7,5 m, v_1 = 15 - 0,5 * 10 = 10,0 m/s. Schritt 2: y_2 = 7,5 + 0,5 * 10,0 = 12,5 m.' },
          { value: 10.0, tolerance: 0.02, fraction: 50, feedback: 'Teilpunkte (50 %): 10,0 m ist die analytische Höhe y(1,0) = 15*1 - 0,5*10*1 = 10,0 m (bzw. Heun), nicht der explizite Euler!' },
          { value: 7.5, tolerance: 0.02, fraction: 50, feedback: 'Teilpunkte (50 %): 7,5 m ist die Höhe y_1 nach nur einem Schritt (bei t_1 = 0,5 s), bzw. das Ergebnis des semi-impliziten Euler.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (2 Schritte Expliziter Standard-Euler):</strong></p>' +
                         '<p><strong>Schritt 1 (\\(t_0 = 0 \\to t_1 = 0{,}50\\,\\text{s}\\)):</strong><br>' +
                         '\\(y_1 = y_0 + \\Delta t \\cdot v_0 = 0{,}0 + 0{,}50 \\cdot 15{,}0 = 7{,}5\\,\\text{m}\\)<br>' +
                         '\\(v_1 = v_0 - \\Delta t \\cdot g = 15{,}0 - 0{,}50 \\cdot 10{,}0 = 10{,}0\\,\\text{m/s}\\).</p>' +
                         '<p><strong>Schritt 2 (\\(t_1 = 0{,}50 \\to t_2 = 1{,}00\\,\\text{s}\\)):</strong><br>' +
                         '\\(y_2 = y_1 + \\Delta t \\cdot v_1 = 7{,}5 + 0{,}50 \\cdot 10{,}0 = 12{,}5\\,\\text{m}\\).</p>'
      },
      {
        id: 'T08_Q3',
        title: 'C#-Code-Tracing: Zeiger-Arithmetik mit uint* vs. byte*',
        shortSummary: '`uint*` Index-Berechnung aus `BackBufferStride`',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Anstelle eines <code>byte*</code>-Pointers wird in folgendem C#-Code ein <code>uint*</code>-Pointer (4 Bytes pro Element) verwendet, um ganze Pixel auf einmal zu schreiben:</p>' +
              '<pre><code class="language-csharp">int strideBytes = 128; // BackBufferStride in Bytes\nint pixelsPerRow = strideBytes / 4;\nint x = 10, y = 4;\nint uintIndex = y * pixelsPerRow + x;</code></pre>' +
              '<p>Welchen exakten ganzzahligen Wert hat die Variable <code>uintIndex</code> nach der Ausführung?</p>',
        answers: [
          { value: 138, tolerance: 0, fraction: 100, feedback: 'Richtig! pixelsPerRow = 128 / 4 = 32; uintIndex = 4 * 32 + 10 = 128 + 10 = 138.' },
          { value: 552, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): 552 (= 138 * 4) ist der Byte-Index für einen byte*-Pointer; für uint* wurde strideBytes bereits durch 4 geteilt.' },
          { value: 522, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben 4 * 128 + 10 = 522 gerechnet und die Division durch 4 bei pixelsPerRow übersehen.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (uint*-Pointer-Adressierung):</strong></p>' +
                         '<p>Da ein <code>uint*</code>-Zeiger bei jeder Erhöhung um 1 automatisch um <code>sizeof(uint) = 4</code> Bytes im Speicher weiterwandert, umfasst eine Zeile von <code>128 Bytes</code> genau <code>pixelsPerRow = 128 / 4 = 32</code> <code>uint</code>-Elemente. Für Zeile <code>y = 4</code> und Spalte <code>x = 10</code> ergibt sich somit der Element-Index <code>4 * 32 + 10 = 138</code>.</p>'
      },
      {
        id: 'T08_Q4',
        title: 'C#-Lückentext: Lineare Farbinterpolation (Lerp) mit Math.Clamp',
        shortSummary: 'Falschfarben-Mapping mit `Math.Clamp`',
        type: 'gapselect',
        grade: 1.0,
        text: '<p>Vervollständigen Sie die C#-Hilfsmethode, die eine Temperatur <code>T</code> sicher auf das Intervall <code>[0.0, 1.0]</code> normiert und anschließend den Blau-Kanal von <code>255</code> (bei <code>u = 0</code>) linear auf <code>0</code> (bei <code>u = 1</code>) absenkt:</p>' +
              '<pre><code class="language-csharp">double rawU = (T - Tmin) / ([[1]] - Tmin);\ndouble u = Math.[[2]](rawU, 0.0, 1.0);\nbyte blue = (byte)(255.0 * ([[3]] - u));</code></pre>',
        choices: [
          { text: 'Tmax', group: 1 },
          { text: 'Clamp', group: 2 },
          { text: '1.0', group: 3 },
          { text: 'T', group: 1 },
          { text: '0.0', group: 1 },
          { text: 'Round', group: 2 },
          { text: 'Abs', group: 2 },
          { text: '255.0', group: 3 },
          { text: '0.0', group: 3 }
        ],
        generalFeedback: '<p><strong>Erklärung:</strong></p>' +
                         '<ul><li><code>[[1]] = Tmax</code> bildet die Spannweite <code>Tmax - Tmin</code> im Nenner.</li>' +
                         '<li><code>[[2]] = Clamp</code> begrenzt Ausreißer sicher auf das Intervall <code>[0.0, 1.0]</code>, damit der anschließende Cast nach <code>byte</code> nicht überläuft.</li>' +
                         '<li><code>[[3]] = 1.0</code> sorgt dafür, dass Blau bei <code>u = 0.0</code> den Maximalwert <code>255</code> und bei <code>u = 1.0</code> den Wert <code>0</code> erhält.</li></ul>'
      },
      {
        id: 'T08_Q5',
        title: 'Pipeline-Reihenfolge: Ereignisbehandlung beim Bodenaufprall (Hybrid-Step)',
        shortSummary: 'Ablaufkette Sub-Step-Bodenreflexion',
        type: 'ddwtos',
        grade: 1.0,
        text: '<p>Bringen Sie die vier Teilschritte zur präzisen Behandlung einer Bodenkollision (sobald der reguläre Zeitschritt eine negative Höhe <code>yNew &lt; 0</code> geliefert hat) in die richtige algorithmische Reihenfolge:</p>' +
              '<p>Schritt 1: [[1]]<br>' +
              'Schritt 2: [[2]]<br>' +
              'Schritt 3: [[3]]<br>' +
              'Schritt 4: [[4]]</p>',
        dragboxes: [
          { text: 'Nulldurchgangs-Bedingung yOld > 0 und yNew < 0 detektieren', group: 1 },
          { text: 'Relativen Teilzeitschritt tau = yOld / (yOld - yNew) interpolieren', group: 1 },
          { text: 'Aufprallgeschwindigkeit vImpact = vOld - g * (tau * dt) berechnen', group: 1 },
          { text: 'Geschwindigkeit mit vNew = -e * vImpact reflektieren', group: 1 },
          { text: 'Erdbeschleunigung g dauerhaft auf 0 setzen', group: 1 },
          { text: 'Zeitschrittweite dt mit -1 multiplizieren', group: 1 }
        ],
        generalFeedback: '<p><strong>Erklärung:</strong></p>' +
                         '<p>Zuerst wird der Vorzeichenwechsel der Höhe erkannt (Zero-Crossing Detection). Danach liefert die Sekantenformel den Teilfaktor \\(\\tau\\), mit dem die exakte Geschwindigkeit \\(v_{\\text{impact}}\\) im Moment des Aufpralls bestimmt und schließlich über das Stoßgesetz \\(-e \\cdot v_{\\text{impact}}\\) umgekehrt wird.</p>'
      },
      {
        id: 'T08_Q6',
        title: 'Räumliche Diskretisierung: Fehlerordnung des zentralen Differenzenquotienten',
        shortSummary: 'Konsistenzordnung $\\mathcal{O}(\\Delta x^2)$ des 5-Punkt-Sterns',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Warum verwendet der 5-Punkt-Stern für die zweite Ortsableitung \\(\\frac{\\partial^2 T}{\\partial x^2}\\) den symmetrischen Ausdruck \\(\\frac{T_{i-1} - 2T_i + T_{i+1}}{\\Delta x^2}\\) und welche räumliche Konsistenzordnung wird damit erreicht?</p>',
        answers: [
          {
            text: 'In der Taylor-Summe kürzen sich alle ungeraden Ableitungen weg, was Fehlerordnung zwei in dx liefert.',
            fraction: 100,
            feedback: 'Richtig! Die Terme erster und dritter Ordnung (+dT/dx und -dT/dx sowie +d^3T/dx^3 und -d^3T/dx^3) heben sich exakt auf; es bleibt O(dx^2).'
          },
          {
            text: 'Der Ausdruck vermeidet jede Division und erreicht dadurch eine räumliche Fehlerordnung von vier.',
            fraction: 0,
            feedback: 'Falsch. Es wird durch dx^2 dividiert, und die vierte Ableitung kürzt sich nicht weg, sodass die Fehlerordnung 2 (nicht 4) beträgt.'
          },
          {
            text: 'Die Formel berücksichtigt nur den linken Nachbarn und hat deshalb die räumliche Fehlerordnung eins.',
            fraction: 0,
            feedback: 'Falsch. Sowohl der linke (i-1) als auch der rechte Nachbar (i+1) gehen symmetrisch ein, was die Ordnung auf 2 erhöht.'
          },
          {
            text: 'Durch diese symmetrische Formel wird das explizite Zeitverfahren für beliebig große dt stabil.',
            fraction: 0,
            feedback: 'Falsch. Auch mit dem symmetrischen zentralen Differenzenquotienten unterliegt das explizite Euler-Verfahren der Grenze s <= 0,25.'
          }
        ],
        generalFeedback: '<p><strong>Taylor-Herleitung des zentralen Differenzenquotienten 2. Ordnung:</strong></p>' +
                         '<p>Addiert man \\(T(x+\\Delta x) = T + \\Delta x T\' + \\frac{\\Delta x^2}{2} T\'\' + \\frac{\\Delta x^3}{6} T\'\'\' + \\frac{\\Delta x^4}{24} T^{(4)}\\) und \\(T(x-\\Delta x) = T - \\Delta x T\' + \\frac{\\Delta x^2}{2} T\'\' - \\frac{\\Delta x^3}{6} T\'\'\' + \\frac{\\Delta x^4}{24} T^{(4)}\\), so fallen die ungeraden Terme \\(T\'\\) und \\(T\'\'\'\\) exakt heraus. Nach Division durch \\(\\Delta x^2\\) verbleibt ein führender Abbruchfehler von \\(\\frac{\\Delta x^2}{12} T^{(4)} \\in \\mathcal{O}(\\Delta x^2)\\).</p>'
      },
      {
        id: 'T08_Q7',
        title: 'C#-Bug-Diagnose: Byte-Überlauf ohne Begrenzung (Clamping) bei Heatmap',
        shortSummary: 'Find the Bug: `(byte)`-Cast ohne `Math.Clamp` (Wrap-Around)',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Eine Farbskala ist auf den Bereich <code>0 °C</code> bis <code>100 °C</code> ausgelegt. Durch eine lokale Wärmequelle steigt die Temperatur eines Knotens jedoch auf <code>T = 120.0</code> °C an. Der Farbwert wird ohne <code>Math.Clamp</code> wie folgt berechnet:</p>' +
              '<pre><code class="language-csharp">double u = T / 100.0; // u = 1.2\nbyte red = (byte)(255.0 * u);</code></pre>' +
              '<p>Welcher Effekt tritt in einem standardmäßigen C#-Projekt (<code>unchecked</code>-Kontext) bei dieser Konvertierung auf?</p>',
        answers: [
          {
            text: 'Der Wert 306 läuft modulo 256 auf 50 über, sodass die heißeste Stelle plötzlich dunkel erscheint.',
            fraction: 100,
            feedback: 'Richtig! Im Standard-Kontext (unchecked) schneidet (byte)306 die oberen Bits ab (306 - 256 = 50), was zu einem dunklen Farbsprung mitten im Hotspot führt.'
          },
          {
            text: 'Der C#-Cast nach byte begrenzt alle Zahlen über 255 automatisch und sicher auf das Maximum 255.',
            fraction: 0,
            feedback: 'Falsch. Ein einfacher (byte)-Cast führt in C# kein Sättigungs-Clamping durch, sondern ein Abschneiden der höherwertigen Bits (Modulo 256).'
          },
          {
            text: 'Die Variable red nimmt automatisch den speziellen Gleitkommawert Byte.NaN für ungültige Farben an.',
            fraction: 0,
            feedback: 'Falsch. Ganzzahltypen wie byte besitzen keinen NaN-Wert; NaN existiert nur bei IEEE-754-Gleitkommatypen (float, double).'
          },
          {
            text: 'Das WriteableBitmap skaliert alle übergroßen Farbwerte beim Unlock automatisch auf den Bereich 0..255.',
            fraction: 0,
            feedback: 'Falsch. Der Überlauf passiert bereits vor dem Speichern in die 8-Bit-Variable red; das WriteableBitmap sieht danach nur noch den Wert 50.'
          }
        ],
        generalFeedback: '<p><strong>Fehleranalyse (Unchecked Byte Overflow):</strong></p>' +
                         '<p>Für <code>T = 120.0</code> ergibt <code>255.0 * 1.2</code> den Wert <code>306.0</code>. Da ein <code>byte</code> nur 8 Bits (0..255) fasst, geht beim ungeschützten Cast <code>(byte)306</code> das 9. Bit (Wertigkeit 256) verloren: \\(306 \\bmod 256 = 50\\). Heißere Regionen springen dadurch optisch plötzlich wieder auf dunkle/kalte Farbtöne zurück. Deshalb ist <code>Math.Clamp(u, 0.0, 1.0)</code> zwingend erforderlich.</p>'
      },
      {
        id: 'T08_Q8',
        title: 'Modelltheorie: Die drei Hauptmerkmale des allgemeinen Modellbegriffs nach Stachowiak',
        shortSummary: 'Stachowiak: Abbildungs-, Verkürzungs-, Pragmatisches Merkmal',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: '<p>Welche der folgenden Aussagen zu den drei klassischen Hauptmerkmalen eines Modells nach Herbert Stachowiak (1973) sind <strong>zutreffend</strong>? (Mehrere Antworten möglich)</p>',
        answers: [
          {
            text: 'Gemäß Abbildungsmerkmal ist jedes Modell stets die Repräsentation eines natürlichen oder künstlichen Originals.',
            fraction: 50,
            feedback: 'Richtig! Ein Modell steht immer in einer Zuordnungsbeziehung zu einem Original (das selbst wiederum ein Modell sein kann).'
          },
          {
            text: 'Das pragmatische Merkmal fordert die Angabe, für wen, wann und zu welchem Zweck das Modell eingesetzt wird.',
            fraction: 50,
            feedback: 'Richtig! Modelle sind nicht nur Abbilder von etwas, sondern erfüllen ihre Ersetzungsfunktion für bestimmte Subjekte, Zeiten und Zwecke.'
          },
          {
            text: 'Das Verkürzungsmerkmal verlangt, dass der Programmcode eines Modells höchstens 100 Zeilen umfassen darf.',
            fraction: -50,
            feedback: 'Falsch! Verkürzung (Präterition) bezieht sich auf das Weglassen irrelevanter Original-Eigenschaften bei der Abstraktion, nicht auf die C#-Codezeilen.'
          },
          {
            text: 'Nach Stachowiak ist ein Modell nur dann gültig, wenn es sämtliche Eigenschaften des Originals 1:1 kopiert.',
            fraction: -50,
            feedback: 'Falsch! Eine vollständige 1:1-Kopie aller Attribute widerspricht direkt dem Verkürzungsmerkmal und wäre das Original selbst.'
          }
        ],
        generalFeedback: '<p><strong>Zusammenfassung (Allgemeine Modelltheorie nach Stachowiak):</strong></p>' +
                         '<p>Jedes Modell ist durch drei fundamentale Merkmale gekennzeichnet: 1. <strong>Abbildungsmerkmal</strong> (Repräsentation eines Originals), 2. <strong>Verkürzungsmerkmal</strong> (Abstraktion durch Beschränkung auf relevante Attribute) und 3. <strong>Pragmatisches Merkmal</strong> (Ausrichtung auf Subjekt, Zeitintervall und Untersuchungszweck).</p>'
      }
    ]
  },

  // =========================================================================
  // TEST 09 (PRÜFUNG)
  // =========================================================================
  {
    id: 'Test_09_Pruefung',
    title: 'Test 09 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante I)',
    category: '$course$/Quiz_01_Termin_03/Test_09_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'T09_Q1',
        title: '2D-Wärmeleitung: Adiabate Neumann-Ecke & 5-Punkt-Stern-Update',
        shortSummary: 'Neumann-Rand + 5-Punkt-Stern-Temperatur $T_{1,1}^{n+1}$',
        type: 'cloze',
        grade: 2.0,
        text: '<p>Auf einem 2D-Wärmeraster mit der Stabilitätszahl \\(s = 0{,}20\\) besitzt der innere Knoten \\((1,1)\\) aktuell die Temperatur \\(T_{1,1}^n = 40{,}0\\,^\\circ\\text{C}\\). Seine inneren Nachbarn haben die Werte \\(T_{2,1}^n = 60{,}0\\,^\\circ\\text{C}\\) (rechts) und \\(T_{1,2}^n = 80{,}0\\,^\\circ\\text{C}\\) (oben). Sowohl der linke Rand (\\(i=0\\)) als auch der untere Rand (\\(j=0\\)) sind <strong>perfekt wärmegedämmt (homogene Neumann-Randbedingung)</strong>.</p>' +
              '<p>a) Welche Temperatur \\(T_{0,1}^n\\) (in <strong>°C</strong>) wird dem linken Randknoten \\((0,1)\\) durch die homogene Neumann-Bedingung zugewiesen?<br>' +
              'Antwort: {1:NUMERICAL:=40.0:0.1#Richtig! Am isolierten Rand gilt dT/dn = 0, also T[0,1] = T[1,1] = 40,0 °C.~%50%0.0:0.1#Teilpunkte (50 %): 0 °C wäre eine feste Eiskühlung (homogene Dirichlet-Bedingung), keine Wärmeisolation!} °C</p>' +
              '<p>b) Welche neue Temperatur \\(T_{1,1}^{n+1}\\) (in <strong>°C</strong>) erhält der Knoten \\((1,1)\\) nach einem expliziten Zeitschritt mit dem 5-Punkt-Stern (wenn auch unten \\(T_{1,0}^n = T_{1,1}^n\\) gilt)?<br>' +
              'Antwort: {1:NUMERICAL:=52.0:0.1#Richtig! T_neu = 40 + 0,20 * (40 + 60 + 40 + 80 - 4 * 40) = 40 + 0,20 * 60 = 52,0 °C.~%50%36.0:0.1#Teilpunkte (50 %): Folgefehler aus T[0,1] = 0 und T[1,0] = 0 (40 + 0,20 * (140 - 160) = 36,0 °C).} °C</p>',
        generalFeedback: '<p><strong>Musterherleitung (5-Punkt-Stern an einer isolierten Ecke):</strong></p>' +
                         '<p>1. Durch die beiden isolierten Ränder (Neumann \\(\\partial T / \\partial n = 0\\)) nehmen die Randknoten die Temperatur ihres jeweiligen Innennachbarn an: \\(T_{0,1}^n = T_{1,1}^n = 40{,}0\\,^\\circ\\text{C}\\) und \\(T_{1,0}^n = T_{1,1}^n = 40{,}0\\,^\\circ\\text{C}\\).</p>' +
                         '<p>2. Einsetzen in den 5-Punkt-Stern:<br>' +
                         '\\(T_{1,1}^{n+1} = 40{,}0 + 0{,}20 \\cdot (40{,}0 + 60{,}0 + 40{,}0 + 80{,}0 - 4 \\cdot 40{,}0) = 40{,}0 + 0{,}20 \\cdot (220{,}0 - 160{,}0) = 40{,}0 + 12{,}0 = 52{,}0\\,^\\circ\\text{C}\\).</p>'
      },
      {
        id: 'T09_Q2',
        title: 'Bodenkollision: Berechnung des relativen Teilzeitschritts tau',
        shortSummary: 'Relativer Kollisionsfaktor $\\tau = y_n / (y_n - y_{n+1})$',
        type: 'numerical',
        grade: 1.5,
        text: '<p>In einer Fallsimulation befindet sich die Unterkante eines Prüfkörpers zu Beginn des Zeitschritts bei \\(y_n = +0{,}45\\,\\text{m}\\) oberhalb der Bodenplatte (\\(y = 0\\)). Am Ende des Zeitschritts liefert das Integrationsverfahren die vorläufige Position \\(y_{n+1} = -0{,}15\\,\\text{m}\\) unterhalb der Bodenplatte.</p>' +
              '<p>Berechnen Sie den dimensionslosen relativen Zeitschrittanteil \\(\\tau \\in [0, 1]\\), der angibt, welcher Bruchteil des Zeitschritts \\(\\Delta t\\) bis zum exakten Aufprall (\\(y = 0\\)) vergangen ist.</p>',
        answers: [
          { value: 0.75, tolerance: 0.005, fraction: 100, feedback: 'Exakt! tau = y_n / (y_n - y_{n+1}) = 0,45 / (0,45 - (-0,15)) = 0,45 / 0,60 = 0,75.' },
          { value: 0.25, tolerance: 0.005, fraction: 50, feedback: 'Teilpunkte (50 %): 0,25 ist der verbleibende Restanteil (1 - tau) nach dem Aufprall bzw. |y_{n+1}| / (y_n - y_{n+1}).' },
          { value: 1.5, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte (50 %): Vorzeichenfehler im Nenner: Sie haben 0,45 / (0,45 - 0,15) = 0,45 / 0,30 = 1,5 gerechnet (tau muss immer zwischen 0 und 1 liegen!).' }
        ],
        generalFeedback: '<p><strong>Musterherleitung:</strong></p>' +
                         '<p>Innerhalb des Zeitschritts legt der Körper vertikal die Gesamtstrecke \\(\\Delta s = y_n - y_{n+1} = 0{,}45\\,\\text{m} - (-0{,}15\\,\\text{m}) = 0{,}60\\,\\text{m}\\) nach unten zurück. Bis zum Boden bei \\(y = 0\\) sind es davon \\(0{,}45\\,\\text{m}\\). Der relative Zeitanteil beträgt folglich:<br>' +
                         '\\(\\tau = \\frac{y_n}{y_n - y_{n+1}} = \\frac{0{,}45}{0{,}60} = 0{,}75\\).</p>'
      },
      {
        id: 'T09_Q3',
        title: 'C#-Code-Tracing: 1D-Array-Indexierung eines 2D-Gitters (Row-Major)',
        shortSummary: '1D-Index des unteren Nachbarn `(y + 1) * nx + x`',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Ein zweidimensionales Temperaturgitter mit <code>nx = 20</code> Spalten und <code>ny = 15</code> Zeilen wird für maximale Cache-Lokalität in einem flachen 1D-Array <code>double[] T = new double[nx * ny]</code> zeilenweise (Row-Major) gespeichert. Gegeben sei folgender C#-Code:</p>' +
              '<pre><code class="language-csharp">int nx = 20;\nint x = 6, y = 4;\nint idx = y * nx + x;\nint southNeighborIdx = idx + nx;</code></pre>' +
              '<p>Welchen exakten ganzzahligen Wert hat die Variable <code>southNeighborIdx</code> (der Index des Nachbarknotens in Zeile <code>y + 1</code>, Spalte <code>x</code>)?</p>',
        answers: [
          { value: 106, tolerance: 0, fraction: 100, feedback: 'Richtig! idx = 4 * 20 + 6 = 86; southNeighborIdx = 86 + 20 = 106 (entspricht (4 + 1) * 20 + 6).' },
          { value: 86, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): 86 ist der Index idx des Zentralknotens (4, 6) selbst, es fehlt noch + nx (= +20) für die nächste Zeile.' },
          { value: 87, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): 87 (= idx + 1) ist der rechte Nachbar (x + 1), nicht der untere Nachbar in Zeile y + 1.' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (Row-Major 1D-Addressing):</strong></p>' +
                         '<p>In einem flachen 1D-Array der Zeilenbreite <code>nx = 20</code> liegt der Knoten <code>(x = 6, y = 4)</code> am Index <code>idx = 4 * 20 + 6 = 86</code>. Um eine Zeile tiefer (<code>y + 1 = 5</code>) bei gleicher Spalte <code>x = 6</code> zu gelangen, muss exakt eine Zeilenbreite <code>nx = 20</code> addiert werden: <code>86 + 20 = 106</code>.</p>'
      },
      {
        id: 'T09_Q4',
        title: 'C#-Lückentext: Berechnung der maximal stabilen Zeitschrittweite',
        shortSummary: 'Berechnung von `dtMax` und `s` in C#',
        type: 'gapselect',
        grade: 1.0,
        text: '<p>Vervollständigen Sie den folgenden C#-Code, der für eine gegebene Maschenweite <code>dx</code> und Temperaturleitfähigkeit <code>alpha</code> zuerst die theoretische 2D-Stabilitätsgrenze <code>dtMax</code> berechnet und anschließend mit 80 % Sicherheitsfaktor die Stabilitätszahl <code>s</code> bestimmt:</p>' +
              '<pre><code class="language-csharp">double dtMax = (dx * [[1]]) / ([[2]] * alpha);\ndouble dt = 0.8 * dtMax;\ndouble s = (alpha * [[3]]) / (dx * dx);</code></pre>',
        choices: [
          { text: 'dx', group: 1 },
          { text: '4.0', group: 2 },
          { text: 'dt', group: 3 },
          { text: 'alpha', group: 1 },
          { text: '4.0', group: 1 },
          { text: '2.0', group: 2 },
          { text: '0.25', group: 2 },
          { text: 'dx', group: 3 },
          { text: 'dtMax', group: 3 }
        ],
        generalFeedback: '<p><strong>Erklärung:</strong></p>' +
                         '<ul><li><code>[[1]] = dx</code> und <code>[[2]] = 4.0</code> setzen die 2D-Grenzformel \\(\\Delta t_{\\max} = \\frac{\\Delta x^2}{4\\alpha}\\) um.</li>' +
                         '<li><code>[[3]] = dt</code> berechnet die tatsächliche Fourier-Zahl \\(s = \\frac{\\alpha \\cdot \\Delta t}{\\Delta x^2}\\) (die durch den Faktor <code>0.8</code> sicher bei \\(0{,}8 \\cdot 0{,}25 = 0{,}20\\) liegt).</li></ul>'
      },
      {
        id: 'T09_Q5',
        title: 'Konzept-Zuordnung: WPF-Speicherbegriffe rund um WriteableBitmap',
        shortSummary: 'Zuordnung `WriteableBitmap`-API (`BackBuffer`, `Stride`, `DirtyRect`)',
        type: 'matching',
        grade: 1.0,
        text: '<p>Ordnen Sie die folgenden Eigenschaften und Methoden der Klasse <code>WriteableBitmap</code> ihrer exakten technischen Funktion zu. Beachten Sie die zwei Überhang-Distraktoren.</p>',
        subquestions: [
          { text: 'Liefert als IntPtr die Speicheradresse des ersten Bytes im unverwalteten Bildpuffer.', answer: 'BackBuffer' },
          { text: 'Gibt die Speicherbreite einer einzelnen Bildzeile in Bytes inklusive Zeilen-Padding an.', answer: 'BackBufferStride' },
          { text: 'Gibt die horizontale Auflösung des Bildes als Anzahl der sichtbaren Pixel pro Zeile an.', answer: 'PixelWidth' },
          { text: 'Markiert ein geändertes Rechteck im Puffer, damit WPF diesen Bereich an die GPU überträgt.', answer: 'AddDirtyRect(Int32Rect)' },
          { text: '', answer: 'SolveLaplaceEquation()' },
          { text: '', answer: 'AutoCalculateTimeStep()' }
        ],
        generalFeedback: '<p><strong>Übersicht der WriteableBitmap-Member:</strong></p>' +
                         '<ul><li><code>BackBuffer</code>: Basiszeiger (<code>IntPtr</code>) auf das Pixel-Array im unverwalteten Speicher.</li>' +
                         '<li><code>BackBufferStride</code>: Zeilenlänge in <strong>Bytes</strong> (mindestens <code>PixelWidth * BytesPerPixel</code>).</li>' +
                         '<li><code>PixelWidth</code> / <code>PixelHeight</code>: Bildabmessungen in <strong>Pixeln</strong>.</li>' +
                         '<li><code>AddDirtyRect</code>: Invalidiert den geänderten Teilbereich für das Hardware-Rendering.</li></ul>'
      },
      {
        id: 'T09_Q6',
        title: 'Anfangswertprobleme: Stationärer Endzustand vs. Anfangsverteilung',
        shortSummary: 'Einfluss der Anfangsbedingung $T(x,y,0)$ bei Dirichlet-Rand',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Eine quadratische Platte ohne innere Wärmequellen wird an allen vier Außenrändern durch Dirichlet-Randbedingungen dauerhaft auf festen Temperaturen gehalten. Welchen Einfluss hat die Wahl der <strong>Anfangstemperaturverteilung</strong> \\(T(x, y, t=0)\\) im Inneren der Platte auf den stationären Endzustand für \\(t \\to \\infty\\)?</p>',
        answers: [
          {
            text: 'Der stationäre Endzustand hängt nur von den Dirichlet-Rändern ab und ist unabhängig vom Startfeld.',
            fraction: 100,
            feedback: 'Richtig! Für t -> unendlich klingt der Einfluss der Anfangsbedingung exponentiell ab; die eindeutige Lösung der Laplace-Gleichung wird allein durch die Ränder bestimmt.'
          },
          {
            text: 'Verdoppelt man die Anfangstemperatur im Inneren, verdoppelt sich auch die stationäre Endtemperatur.',
            fraction: 0,
            feedback: 'Falsch. Überschüssige Anfangswärme fließt vollständig über die auf fester Temperatur gehaltenen Dirichlet-Ränder ab.'
          },
          {
            text: 'Die Anfangstemperatur legt dauerhaft fest, an welchen Rändern später Wärme ein- oder ausströmt.',
            fraction: 0,
            feedback: 'Falsch. Die Anfangsverteilung beeinflusst nur den transienten Einschwingvorgang, nicht aber das langfristige stationäre Gleichgewicht.'
          },
          {
            text: 'Ein stationärer Zustand wird nur erreicht, wenn die Anfangstemperatur überall exakt 0 °C beträgt.',
            fraction: 0,
            feedback: 'Falsch. Solange die Simulation numerisch stabil ist (s <= 0,25), konvergiert jedes beliebige Anfangsfeld gegen dieselbe stationäre Lösung.'
          }
        ],
        generalFeedback: '<p><strong>Physikalisch-mathematischer Hintergrund:</strong></p>' +
                         '<p>Im stationären Grenzfall (\\(\\frac{\\partial T}{\\partial t} = 0\\)) geht die Wärmeleitungsgleichung in die elliptische Laplace-Gleichung \\(\\nabla^2 T = 0\\) über. Bei reinen Dirichlet-Randbedingungen besitzt diese Gleichung eine <strong>eindeutige Lösung</strong>, die ausschließlich von den Randwerten abhängt – das System „vergisst“ seine Anfangsbedingung über die Zeit vollständig.</p>'
      },
      {
        id: 'T09_Q7',
        title: 'C#-Bug-Diagnose: Falsche Zeilenadressierung bei GPU-Stride-Padding',
        shortSummary: 'Find the Bug: `y * width * 4` statt `y * BackBufferStride`',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Auf einem Notebook mit dedizierter GPU hat ein <code>WriteableBitmap</code> der Breite <code>width = 101</code> Pixel einen durch 64 teilbaren <code>BackBufferStride = 448</code> Bytes (statt \\(101 \\cdot 4 = 404\\) Bytes). Der Entwickler berechnet den Byte-Index jedoch über:</p>' +
              '<pre><code class="language-csharp">int byteIndex = (y * width + x) * 4;</code></pre>' +
              '<p>Welcher charakteristische Darstellungsfehler ist dadurch im angezeigten Wärmebild zu beobachten?</p>',
        answers: [
          {
            text: 'Ab der zweiten Zeile verschiebt sich das Bild pro Zeile seitlich, sodass ein schräges Streifenmuster entsteht.',
            fraction: 100,
            feedback: 'Richtig! Da jede geschriebene Zeile 44 Bytes zu früh beginnt (404 statt 448), wandert das Bild von Zeile zu Zeile um 11 Pixel schräg nach links (Scherungs-Artefakt).'
          },
          {
            text: 'Das Bild wird geometrisch völlig korrekt angezeigt, aber die Farben Rot und Blau sind miteinander vertauscht.',
            fraction: 0,
            feedback: 'Falsch. Ein um ein Vielfaches von 4 Bytes falscher Zeilen-Stride verschiebt die Pixelpositionen horizontal, vertauscht aber nicht R und B.'
          },
          {
            text: 'WPF wirft beim Aufruf von Unlock sofort eine InvalidStrideException und beendet die gesamte Anwendung.',
            fraction: 0,
            feedback: 'Falsch. Da (y * width + x) * 4 kleiner ist als y * BackBufferStride + x * 4, bleibt der Zugriff innerhalb des gültigen Puffers und löst keine Exception aus.'
          },
          {
            text: 'Die erste Zeile y = 0 wird komplett schwarz gezeichnet, während alle weiteren Zeilen normal aussehen.',
            fraction: 0,
            feedback: 'Falsch. Gerade für die erste Zeile (y = 0) ist y * width * 4 = 0 identisch mit y * BackBufferStride = 0; der Versatz wächst erst mit steigendem y!'
          }
        ],
        generalFeedback: '<p><strong>Fehleranalyse (Scherungs-Artefakt bei Stride-Ignorierung):</strong></p>' +
                         '<p>Wenn der Grafiktreiber am Ende jeder Zeile Padding-Bytes einfügt (hier \\(448 - 404 = 44\\,\\text{Bytes} = 11\\,\\text{Pixel}\\)), beginnt Zeile \\(y = 1\\) im Speicher erst bei Byte <code>448</code>. Schreibt der Code Zeile 1 jedoch schon ab Byte <code>404</code>, landen die ersten 11 Pixel von Zeile 1 im unsichtbaren Padding-Bereich von Zeile 0, und jede folgende Zeile verschiebt sich um weitere 11 Pixel schräg nach links.</p>'
      },
      {
        id: 'T09_Q8',
        title: 'unsafe C# & Speichersicherheit: Direkter Pointer-Zugriff in .NET',
        shortSummary: '`unsafe`-Kontext & unverwalteter Speicher (`IntPtr`)',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: '<p>Welche der folgenden Aussagen zur Verwendung von <code>unsafe</code>-Codeblöcken und Zeigern (<code>byte*</code> / <code>uint*</code>) bei der <code>WriteableBitmap</code>-Programmierung in C# sind <strong>korrekt</strong>? (Mehrere Antworten möglich)</p>',
        answers: [
          {
            text: 'Für die Übersetzung von unsafe-Blöcken muss in der Projektdatei AllowUnsafeBlocks aktiviert werden.',
            fraction: 50,
            feedback: 'Richtig! Ohne <AllowUnsafeBlocks>true</AllowUnsafeBlocks> in der .csproj-Datei lehnt der C#-Compiler jeden unsafe-Block ab.'
          },
          {
            text: 'Bei Zeigerzugriffen findet keine automatische Array-Grenzenprüfung durch die .NET-Laufzeit statt.',
            fraction: 50,
            feedback: 'Richtig! Genau dieser Wegfall der Bounds-Checks macht Pointer so schnell, erfordert aber höchste Sorgfalt bei der Indexberechnung.'
          },
          {
            text: 'Der BackBuffer eines WriteableBitmap liegt im verwalteten GC-Heap und erfordert ein fixed-Statement.',
            fraction: -50,
            feedback: 'Falsch! Der BackBuffer von WriteableBitmap liegt bereits im unverwalteten Speicher (IntPtr) und wird durch bmp.Lock() statt durch fixed fixiert.'
          },
          {
            text: 'Ein unsafe-Block schaltet automatisch die 2D-Wärmeleitung auf alle Kerne der Grafikkarte frei.',
            fraction: -50,
            feedback: 'Falsch! unsafe erlaubt lediglich CPU-seitige Zeigerarithmetik; der Code läuft weiterhin ganz normal auf der CPU.'
          }
        ],
        generalFeedback: '<p><strong>Zusammenfassung:</strong></p>' +
                         '<p>Das Schlüsselwort <code>unsafe</code> (mit <code>&lt;AllowUnsafeBlocks&gt;true&lt;/AllowUnsafeBlocks&gt;</code>) gestattet direkte C-ähnliche Zeigerarithmetik ohne den Overhead von Bounds-Checks oder Array-Kopien. Da <code>bmp.BackBuffer</code> bereits ein unverwalteter Speicherbereich ist, genügt der Cast <code>(byte*)bmp.BackBuffer</code> zwischen <code>Lock()</code> und <code>Unlock()</code>.</p>'
      }
    ]
  },

  // =========================================================================
  // TEST 10 (PRÜFUNG)
  // =========================================================================
  {
    id: 'Test_10_Pruefung',
    title: 'Test 10 (Prüfung) – Grundlagen, Euler & 2D-Wärmeraster (Klausurvariante J)',
    category: '$course$/Quiz_01_Termin_03/Test_10_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'T10_Q1',
        title: 'Echtzeit-Performance: 5-Punkt-Stern-Rechenaufwand & Echtzeitfaktor',
        shortSummary: 'Anzahl Knoten-Updates pro Sekunde & Echtzeitbudget',
        type: 'cloze',
        grade: 2.0,
        text: '<p>Ein quadratisches 2D-Temperaturgitter besteht aus insgesamt \\(102 \\times 102\\) Gitterpunkten (davon bildet jeweils 1 Reihe an jedem der vier Ränder den Rand, sodass im Inneren ein Block von \\(100 \\times 100\\) inneren Knoten mit dem 5-Punkt-Stern berechnet wird). Pro Sekunde Echtzeit werden genau \\(50\\) explizite Simulationsschritte ausgeführt.</p>' +
              '<p>a) Wie viele einzelne innere Knoten-Auswertungen des 5-Punkt-Sterns finden in <strong>einem einzigen Zeitschritt</strong> statt?<br>' +
              'Antwort: {1:NUMERICAL:=10000:0#Richtig! 100 * 100 = 10.000 innere Gitterknoten pro Zeitschritt.~%50%10404:0#Teilpunkte (50 %): Sie haben die Randknoten mitgezählt (102 * 102 = 10.404 statt 100 * 100 = 10.000).} Knoten-Updates</p>' +
              '<p>b) Wie viele Millisekunden (<strong>ms</strong>) Wanduhrzeit (Wall-Clock-Time) darf die Berechnung und Visualisierung eines einzelnen Zeitschritts im Mittel <strong>höchstens</strong> dauern, damit die Simulation mit \\(50\\,\\text{Schritten/s}\\) in Echtzeit Schritt hält?<br>' +
              'Antwort: {1:NUMERICAL:=20.0:0.1#Richtig! 1000 ms / 50 Schritte = 20,0 ms maximales Zeitbudget pro Schritt.~%50%0.02:0.001#Teilpunkte (50 %): Zahlenwert in Sekunden (0,02 s) statt in Millisekunden (20 ms) angegeben.} ms</p>',
        generalFeedback: '<p><strong>Musterherleitung:</strong></p>' +
                         '<p>1. Bei \\(102 \\times 102\\) Gesamtknoten entfallen je 2 Knoten pro Raumrichtung auf die Ränder (Index <code>0</code> und Index <code>101</code>). Es verbleiben \\(100 \\times 100 = 10\\,000\\) innere Knoten pro Schritt (und \\(500\\,000\\) Updates pro Sekunde).</p>' +
                         '<p>2. Für 50 Schritte pro Sekunde Echtzeit steht pro Schritt ein Zeitbudget von \\(\\Delta t_{\\text{wall,max}} = \\frac{1000\\,\\text{ms}}{50} = 20{,}0\\,\\text{ms}\\) zur Verfügung.</p>'
      },
      {
        id: 'T10_Q2',
        title: 'Heun-Verfahren (RK2): Vertikaler Fallschritt mit zeitabhängiger Geschwindigkeit',
        shortSummary: 'Heun-Ortsupdate $y_1$ beim freien Fall aus Ruhe',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Ein Körper fällt ab \\(t_0 = 0\\,\\text{s}\\) aus der Ruhe (\\(v_0 = 0{,}0\\,\\text{m/s}\\)) von einer Starthöhe \\(y_0 = 30{,}0\\,\\text{m}\\) unter konstanter Erdbeschleunigung \\(g = 10{,}0\\,\\text{m/s}^2\\) nach unten.</p>' +
              '<p>Berechnen Sie die neue Höhe \\(y_1\\) (in <strong>Metern</strong>) nach einem Zeitschritt von \\(\\Delta t = 0{,}40\\,\\text{s}\\) mit dem <strong>zweistufigen Heun-Verfahren (RK2)</strong>.</p>',
        answers: [
          { value: 29.2, tolerance: 0.02, fraction: 100, feedback: 'Exakt! k1_y = v_0 = 0 m/s; Prädiktor v_pred = -4,0 m/s (= k2_y); Korrektor y_1 = 30,0 + 0,5 * 0,40 * (0 + (-4,0)) = 29,2 m (trifft bei konstanter Beschleunigung exakt die analytische Parabel!).' },
          { value: 30.0, tolerance: 0.02, fraction: 50, feedback: 'Teilpunkte (50 %): 30,0 m ist der Prädiktorwert (expliziter Euler y_pred = 30 + 0,4*0), es fehlt noch der Heun-Korrektorschritt.' },
          { value: 28.4, tolerance: 0.02, fraction: 50, feedback: 'Teilpunkte (50 %): Sie haben im Korrektorschritt vergessen, die Summe der Steigungen durch 2 zu teilen (30 - 0,4 * 4,0 = 28,4 m).' }
        ],
        generalFeedback: '<p><strong>Musterherleitung (Heun-Verfahren beim freien Fall):</strong></p>' +
                         '<p>1. <strong>Startsteigungen bei \\(t_0\\):</strong> \\(k_{1,y} = v_0 = 0{,}0\\,\\text{m/s}\\), \\(k_{1,v} = -g = -10{,}0\\,\\text{m/s}^2\\).</p>' +
                         '<p>2. <strong>Prädiktor bei \\(t_1 = 0{,}40\\,\\text{s}\\):</strong><br>' +
                         '\\(\\tilde{y}_1 = 30{,}0 + 0{,}40 \\cdot 0{,}0 = 30{,}0\\,\\text{m}\\), \\(\\tilde{v}_1 = 0{,}0 + 0{,}40 \\cdot (-10{,}0) = -4{,}0\\,\\text{m/s}\\).</p>' +
                         '<p>3. <strong>Endsteigungen am Prädiktorpunkt:</strong> \\(k_{2,y} = \\tilde{v}_1 = -4{,}0\\,\\text{m/s}\\), \\(k_{2,v} = -10{,}0\\,\\text{m/s}^2\\).</p>' +
                         '<p>4. <strong>Heun-Korrektor für die Höhe:</strong><br>' +
                         '\\(y_1 = y_0 + \\frac{\\Delta t}{2} (k_{1,y} + k_{2,y}) = 30{,}0 + 0{,}20 \\cdot (0{,}0 - 4{,}0) = 29{,}2\\,\\text{m}\\).<br>' +
                         '<em>Bemerkung:</em> Da das Heun-Verfahren die Ordnung 2 besitzt, integriert es quadratische Parabeln ohne jeden Diskretisierungsfehler exakt!</p>'
      },
      {
        id: 'T10_Q3',
        title: 'C#-Code-Tracing: Extraktion des Rot-Kanals aus einem Bgra32-uint',
        shortSummary: '`uint` Bit-Shifting `>> 16` für Rot-Kanal',
        type: 'numerical',
        grade: 1.5,
        text: '<p>Gegeben sei ein gepackter 32-Bit-Farbwert im Format <code>Bgra32</code> (Little-Endian <code>0xAARRGGBB</code>) sowie folgende Bit-Manipulationszeile in C#:</p>' +
              '<pre><code class="language-csharp">uint packedColor = 0xFFC86432;\nbyte channel = (byte)((packedColor >> 16) & 0xFF);</code></pre>' +
              '<p>Welchen <strong>dezimalen</strong> Zahlenwert (Basis 10) hat die Variable <code>channel</code> nach der Ausführung?</p>',
        answers: [
          { value: 200, tolerance: 0, fraction: 100, feedback: 'Richtig! >> 16 schiebt das Rot-Byte 0xC8 an die niedrigste Stelle; 0xC8 = 12 * 16 + 8 = 192 + 8 = 200.' },
          { value: 100, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): 100 (0x64) ist der Grün-Kanal bei >> 8, hier wurde aber um 16 Bits nach rechts geschoben (0xC8 = 200).' },
          { value: 50, tolerance: 0, fraction: 50, feedback: 'Teilpunkte (50 %): 50 (0x32) ist der Blau-Kanal ohne Bit-Shift (>> 0).' }
        ],
        generalFeedback: '<p><strong>Musterherleitung:</strong></p>' +
                         '<p>Im Hexadezimalwert <code>0xFFC86432</code> stehen die Bytes für: Alpha = <code>0xFF</code> (255), Rot = <code>0xC8</code> (200), Grün = <code>0x64</code> (100), Blau = <code>0x32</code> (50). Durch den Rechts-Shift <code>&gt;&gt; 16</code> gelangt das Rot-Byte <code>0xC8</code> in die untersten 8 Bits. Umrechnung ins Dezimalsystem: \\(\\text{C}_{16} = 12\\), also \\(12 \\cdot 16 + 8 = 192 + 8 = 200\\).</p>'
      },
      {
        id: 'T10_Q4',
        title: 'C#-Lückentext: Symplektischer (semi-impliziter) Euler-Schritt',
        shortSummary: 'Semi-impliziter Euler in C#',
        type: 'gapselect',
        grade: 1.0,
        text: '<p>Vervollständigen Sie den folgenden C#-Code für einen <strong>semi-impliziten (symplektischen) Euler-Schritt</strong> eines Feder-Masse-Schwingers (Masse <code>m</code>, Federsteifigkeit <code>c</code>), bei dem zuerst die neue Geschwindigkeit berechnet und unmittelbar danach für das Orts-Update genutzt wird:</p>' +
              '<pre><code class="language-csharp">double a = -(c / m) * [[1]];\nv = v + [[2]] * a;\nx = x + dt * [[3]];</code></pre>',
        choices: [
          { text: 'x', group: 1 },
          { text: 'dt', group: 2 },
          { text: 'v', group: 3 },
          { text: 'v', group: 1 },
          { text: 'dt', group: 1 },
          { text: 'x', group: 2 },
          { text: '0.5', group: 2 },
          { text: 'a', group: 3 },
          { text: 'x', group: 3 }
        ],
        generalFeedback: '<p><strong>Erklärung (Symplektischer Euler):</strong></p>' +
                         '<ul><li><code>[[1]] = x</code>: Die Rückstellbeschleunigung \\(a_n = -\\frac{c}{m} x_n\\) hängt von der aktuellen Auslenkung <code>x</code> ab.</li>' +
                         '<li><code>[[2]] = dt</code>: Die Geschwindigkeit wird auf \\(v_{n+1} = v_n + \\Delta t \\cdot a_n\\) aktualisiert.</li>' +
                         '<li><code>[[3]] = v</code>: Das Orts-Update \\(x_{n+1} = x_n + \\Delta t \\cdot v_{n+1}\\) nutzt bereits die neue Geschwindigkeit <code>v</code>, wodurch das Verfahren energieerhaltend (symplektisch) wird.</li></ul>'
      },
      {
        id: 'T10_Q5',
        title: 'Pipeline-Reihenfolge: Vom realen Prozess zum ausführbaren Simulationsprogramm',
        shortSummary: 'Modellierungs- & Simulations-Workflow',
        type: 'ddwtos',
        grade: 1.0,
        text: '<p>Bringen Sie die vier typischen Entwicklungsphasen bei der Erstellung einer technischen Computersimulation in die logisch richtige Reihenfolge (vom realen System bis zur Laufzeit-Visualisierung):</p>' +
              '<p>Phase 1: [[1]]<br>' +
              'Phase 2: [[2]]<br>' +
              'Phase 3: [[3]]<br>' +
              'Phase 4: [[4]]</p>',
        dragboxes: [
          { text: 'Physikalische Systemabgrenzung und Abstraktion (Verkürzung nach Stachowiak)', group: 1 },
          { text: 'Aufstellen der kontinuierlichen Differentialgleichungen (ODE / PDE) und Randbedingungen', group: 1 },
          { text: 'Zeitliche und räumliche Diskretisierung (z. B. Euler-Verfahren, 5-Punkt-Stern, CFL-Prüfung)', group: 1 },
          { text: 'Implementierung in C# mit Double-Buffering und WriteableBitmap-Echtzeit-Rendering', group: 1 },
          { text: 'Löschen aller Randbedingungen zur Vermeidung von Rechenaufwand', group: 1 },
          { text: 'Zufälliges Würfeln der Zeitschrittweite ohne Stabilitätsprüfung', group: 1 }
        ],
        generalFeedback: '<p><strong>Erklärung des Workflows:</strong></p>' +
                         '<p>Jede fundierte Ingenieursimulation beginnt mit der zweckgebundenen Systemabgrenzung (Abstraktion), führt über das mathematisch-physikalische Modell (DGLs + Randbedingungen) zur numerischen Diskretisierung (inklusive Stabilitätsanalyse) und mündet schließlich in die performante Software-Implementierung.</p>'
      },
      {
        id: 'T10_Q6',
        title: 'Randbedingungen: Vergleich zwischen Dirichlet- und Neumann-Rand im stationären Fall',
        shortSummary: 'Verhalten eines komplett isolierten Neumann-Gebiets',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Eine quadratische Metallplatte ohne innere Wärmequellen ist an <strong>allen vier Außenkanten</strong> perfekt thermisch isoliert (rundum homogene Neumann-Randbedingung \\(\\frac{\\partial T}{\\partial n} = 0\\)). Zu Beginn hat die linke Plattenhälfte \\(80\\,^\\circ\\text{C}\\) und die rechte Plattenhälfte \\(20\\,^\\circ\\text{C}\\). Welcher Zustand stellt sich nach langer Zeit (\\(t \\to \\infty\\)) ein?</p>',
        answers: [
          {
            text: 'Die gesamte Platte nähert sich einer räumlich konstanten Mischtemperatur von exakt 50 °C an.',
            fraction: 100,
            feedback: 'Richtig! Da über die isolierten Ränder keine Wärme entweichen kann, bleibt die mittlere thermische Energie erhalten: (80 + 20) / 2 = 50 °C überall.'
          },
          {
            text: 'Die Temperatur sinkt in der gesamten Platte auf 0 °C ab, weil alle Randableitungen Null sind.',
            fraction: 0,
            feedback: 'Falsch. Eine Ableitung von Null bedeutet Wärmedämmung (Energieerhaltung), nicht Abkühlung auf 0 °C!'
          },
          {
            text: 'Die linke Hälfte bleibt dauerhaft auf 80 °C und die rechte Hälfte dauerhaft auf 20 °C stehen.',
            fraction: 0,
            feedback: 'Falsch. Im Inneren der Platte findet weiterhin Wärmeleitung vom heißen zum kalten Bereich statt, bis alle Gradienten ausgeglichen sind.'
          },
          {
            text: 'Die Temperatur wächst in der Plattenmitte unbegrenzt an, weil die Wärme am Rand reflektiert wird.',
            fraction: 0,
            feedback: 'Falsch. Nach dem 2. Hauptsatz der Thermodynamik (und dem Maximumprinzip der Wärmeleitungsgleichung) kann ohne Quellen kein neuer Maximalwert > 80 °C entstehen.'
          }
        ],
        generalFeedback: '<p><strong>Physikalische Erhaltungseigenschaft bei reinen Neumann-Rändern:</strong></p>' +
                         '<p>Ist ein Gebiet rundum adiabat abgeschlossen (\\(\\frac{\\partial T}{\\partial n} = 0\\) auf dem gesamten Rand), kann keine thermische Energie das Gebiet verlassen. Die Wärmeleitung gleicht lediglich die internen Temperaturunterschiede aus, sodass für \\(t \\to \\infty\\) überall der räumliche Mittelwert der Anfangstemperatur \\(\\bar{T} = \\frac{1}{2}(80 + 20) = 50\\,^\\circ\\text{C}\\) erreicht wird.</p>'
      },
      {
        id: 'T10_Q7',
        title: 'C#-Bug-Diagnose: Fehlender Lock/Unlock-Schutz beim WriteableBitmap-Zugriff',
        shortSummary: 'Find the Bug: `AddDirtyRect` außerhalb von `Lock`/`Unlock`',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: '<p>Ein Entwickler schreibt eine Methode zur Aktualisierung eines <code>WriteableBitmap bmp</code>, verzichtet aber vermeintlich zur Optimierung auf die Aufrufe von <code>bmp.Lock()</code> und <code>bmp.Unlock()</code>:</p>' +
              '<pre><code class="language-csharp">unsafe {\n    uint* p = (uint*)bmp.BackBuffer;\n    p[0] = 0xFFFFFFFF;\n}\nbmp.AddDirtyRect(new Int32Rect(0, 0, 1, 1));</code></pre>' +
              '<p>Wie reagiert WPF zur Laufzeit auf den Aufruf von <code>bmp.AddDirtyRect(...)</code> ohne vorheriges <code>bmp.Lock()</code>?</p>',
        answers: [
          {
            text: 'AddDirtyRect wirft eine InvalidOperationException, weil der BackBuffer zuvor nicht gesperrt wurde.',
            fraction: 100,
            feedback: 'Richtig! WPF prüft in AddDirtyRect zwingend, ob sich das WriteableBitmap im gesperrten Zustand (Lock) befindet, und wirft andernfalls sofort eine InvalidOperationException.'
          },
          {
            text: 'AddDirtyRect ruft intern automatisch Lock und Unlock auf, sodass der Code problemlos funktioniert.',
            fraction: 0,
            feedback: 'Falsch. AddDirtyRect führt kein automatisches Locking durch, sondern setzt einen bestehenden Lock-Kontext zwingend voraus.'
          },
          {
            text: 'Der C#-Compiler verweigert bereits zur Übersetzungszeit den Zugriff auf die Eigenschaft BackBuffer.',
            fraction: 0,
            feedback: 'Falsch. Ob Lock() zuvor aufgerufen wurde, ist eine reine Laufzeiteigenschaft und kann vom C#-Compiler nicht statisch geprüft werden.'
          },
          {
            text: 'Das Pixel wird statt im WriteableBitmap automatisch in der Titelleiste des Windows-Fensters gezeichnet.',
            fraction: 0,
            feedback: 'Falsch. Es findet kein Zeichnen in fremde Fensterelemente statt, sondern die Laufzeit bricht den Aufruf mit einer InvalidOperationException ab.'
          }
        ],
        generalFeedback: '<p><strong>Fehleranalyse (Lock/Unlock-Vertrag von WriteableBitmap):</strong></p>' +
                         '<p>Die Methode <code>AddDirtyRect</code> darf laut WPF-Spezifikation ausschließlich zwischen einem <code>Lock()</code>- und einem <code>Unlock()</code>-Aufruf ausgeführt werden. Wird <code>AddDirtyRect</code> auf einem ungesperrten Bitmap aufgerufen, wirft die Methode sofort eine <code>System.InvalidOperationException</code> (und ohne Synchronisation mit dem Render-Thread drohen zudem Race-Conditions und Tearing).</p>'
      },
      {
        id: 'T10_Q8',
        title: 'Synthese: Zusammenwirken von Modellierung, Numerik und Visualisierung',
        shortSummary: 'Gesamtsynthese Kapitel 00, 01 und 02',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: '<p>Welche der folgenden übergreifenden Aussagen zu den Kernthemen aus Kapitel 00, 01 und 02 (Modellbildung, Zeitintegration und 2D-Pixelvisualisierung) sind <strong>korrekt</strong>? (Mehrere Antworten möglich)</p>',
        answers: [
          {
            text: 'Eine Verkleinerung der Zeitschrittweite dt senkt den Diskretisierungsfehler, erhöht aber die Rechenlast.',
            fraction: 50,
            feedback: 'Richtig! Kleinere Schritte dt verringern den Abbruchfehler der Taylor-Reihe, erfordern aber mehr Schritte pro Sekunde Simulationszeit.'
          },
          {
            text: 'Im Grenzfall s = 0,25 wird die neue Temperatur im 5-Punkt-Stern exakt zum Mittelwert der vier Nachbarn.',
            fraction: 50,
            feedback: 'Richtig! Für s = 0,25 verschwindet der Vorfaktor (1 - 4s) = 0 vor T_ij^n, sodass T_ij^{n+1} = 0,25 * (T_links + T_rechts + T_oben + T_unten) gilt.'
          },
          {
            text: 'Explizite Zeitintegrationsverfahren sind für jede beliebig große Schrittweite dt garantiert stabil.',
            fraction: -50,
            feedback: 'Falsch! Explizite Verfahren besitzen ein beschränktes Stabilitätsgebiet (z. B. s <= 0,25 beim 2D-Wärmeraster) und divergieren bei zu großem dt.'
          },
          {
            text: 'Die Methode Array.Copy tauscht bei zweidimensionalen Arrays in konstanter Zeit O(1) nur die Zeiger.',
            fraction: -50,
            feedback: 'Falsch! Array.Copy kopiert elementweise den gesamten Speicherblock in O(N); ein Zeigertausch in O(1) erfolgt über Tupel-Zuweisung (T, T_next) = (T_next, T).'
          }
        ],
        generalFeedback: '<p><strong>Gesamtzusammenfassung (Quiz 01):</strong></p>' +
                         '<ul><li>In der Numerik besteht stets der Grundkonflikt zwischen <strong>Genauigkeit / Stabilität</strong> (kleines \\(\\Delta t\\), kleines \\(\\Delta x\\)) und <strong>Echtzeit-Rechenaufwand</strong>.</li>' +
                         '<li>Bei \\(s = 0{,}25\\) gilt \\(1 - 4s = 0\\), wodurch der neue Knotenwert genau das arithmetische Mittel seiner vier Nachbarn bildet.</li>' +
                         '<li>Für höchste Performance kombiniert man einen echten Pointer-/Referenz-Swap <code>(T, T_next) = (T_next, T)</code> in \\(\\mathcal{O}(1)\\) mit direktem <code>unsafe</code>-Schreibzugriff auf den <code>BackBuffer</code> eines <code>WriteableBitmap</code>.</li></ul>'
      }
    ]
  }
];

exportMoodleQuiz(quizMeta, testsData);

