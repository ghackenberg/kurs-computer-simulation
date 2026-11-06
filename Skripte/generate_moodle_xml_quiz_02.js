const { exportMoodleQuiz } = require('./moodle_xml_builder');

const quizMeta = {
  quizId: 'Quiz_02_Termin_05',
  title: 'Quiz 02: 2D-Vektorgrafik, WPF Canvas, ScottPlot 5, Welford & MSAGL',
  terminInfo: 'Zu Beginn von Termin 05 (vor dem Theorie-Impuls zu Kapitel 05)',
  coveredChapters: 'Kapitel 03 (2D-Vektorgrafik & WPF Canvas) und Kapitel 04 (2D-Diagramme, ScottPlot 5, Welford & MSAGL)',
  tabooTopics: 'KEIN 3D / OpenGL / SharpGL (Kapitel 05), keine 4x4-Matrizen, kein Gimbal Lock, kein Multithreading (Kapitel 06), keine FEM-Statik / Cholesky (Kapitel 07)!',
  moodleDir: 'Moodle/Quiz_02_Termin_05_Vektor_und_Diagramme',
  masterXmlFileName: 'Quiz_02_Termin_05_Alle_10_Tests_Master.xml'
};

const testsData = [
  // ============================================================================
  // TEST 01 (VORBEREITUNG)
  // ============================================================================
  {
    id: 'Test_01_Vorbereitung',
    title: 'Quiz 02 - Test 01 (Vorbereitungstest): 2D-Vektorgrafik, Transformationen & Echtzeit-Diagramme',
    category: '$course$/Quiz_02_Termin_05/Test_01_Vorbereitung',
    isPractice: true,
    questions: [
      {
        id: 'Q02_T01_Q1',
        title: 'Affine 2D-Transformation: Uniform Scaling und Y-Inversion (WorldToScreen)',
        shortSummary: 'Uniform Scaling \\(s\\) & \\(Y_{\\text{screen}}\\)',
        type: 'cloze',
        grade: 2.0,
        text: `<p>Ein ebenes Brückenfachwerk besitzt die physikalische Ausdehnung \\(\\Delta X = 40\\,\\text{m}\\) (von \\(x_{\\min}=0\\,\\text{m}\\) bis \\(x_{\\max}=40\\,\\text{m}\\)) und \\(\\Delta Y = 10\\,\\text{m}\\) (von \\(y_{\\min}=0\\,\\text{m}\\) bis \\(y_{\\max}=10\\,\\text{m}\\)). Es soll verzerrungsfrei (Uniform Scaling) auf einem WPF-Canvas mit einer nutzbaren Zeichenfläche (nach Randabzug) von \\(W_{\\text{eff}} = 800\\,\\text{px}\\) Breite und \\(H_{\\text{eff}} = 300\\,\\text{px}\\) Höhe dargestellt werden. Die Gesamthöhe des Canvas beträgt \\(H_{\\text{canvas}} = 360\\,\\text{px}\\), und das Bauteil wird vertikal mit einem unteren Randabstand (Offset) von \\(\\text{offset}_Y = 80\\,\\text{px}\\) vom unteren Bildschirmrand zentriert.</p>
<p><strong>a)</strong> Berechnen Sie den verzerrungsfreien Skalierungsfaktor \\(s\\) in \\(\\text{px/m}\\): {1:NUMERICAL:=20:0.1#Exakt! s = min(800/40, 300/10) = min(20, 30) = 20 px/m.~%50%30:0.1#Teilpunkte: Sie haben max(sx, sy) = 30 px/m statt min(sx, sy) gewählt (Bauteil ragt horizontal aus dem Canvas!).}</p>
<p><strong>b)</strong> Berechnen Sie die vertikale Bildschirmkoordinate \\(Y_{\\text{screen}}\\) (in \\(\\text{px}\\)) für einen Oberkanten-Knoten bei \\(y = 7{,}0\\,\\text{m}\\) unter Berücksichtigung der WPF-Y-Achsen-Inversion: {1:NUMERICAL:=140:0.5#Richtig! Y_screen = 360 - (80 + 7.0 * 20) = 360 - 220 = 140 px.~%50%220:0.5#Teilpunkte: 220 px ist der Abstand vom unteren Rand ohne Y-Inversion (360 - 220 = 140 px).}</p>`,
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<ol>
  <li><strong>Horizontaler und vertikaler Skalierungsfaktor:</strong> \\(s_x = \\frac{800\\,\\text{px}}{40\\,\\text{m}} = 20\\,\\text{px/m}\\), \\(s_y = \\frac{300\\,\\text{px}}{10\\,\\text{m}} = 30\\,\\text{px/m}\\).</li>
  <li><strong>Uniform Scaling (Verzerrungsfreiheit):</strong> \\(s = \\min(s_x, s_y) = \\min(20, 30) = 20\\,\\text{px/m}\\).</li>
  <li><strong>Y-Transformation mit Achseninversion:</strong> Da die WPF-Y-Achse nach unten zeigt, gilt \\(Y_{\\text{screen}} = H_{\\text{canvas}} - (\\text{offset}_Y + (y - y_{\\min}) \\cdot s) = 360 - (80 + 7{,}0 \\cdot 20) = 360 - 220 = 140\\,\\text{px}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T01_Q2',
        title: 'Welford-Online-Algorithmus: Laufende Mittelwert-Aktualisierung',
        shortSummary: 'Welford neuer Mittelwert \\(\\mu_5\\)',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Ein Prüfstand überwacht die Lagertemperatur fortlaufend mittels des numerisch stabilen Welford-Online-Algorithmus. Nach \\(k-1 = 4\\) Messwerten beträgt der laufende Mittelwert \\(\\mu_4 = 50{,}0\\,^\\circ\\text{C}\\). Nun trifft als \\(k = 5\\)-ter Messwert \\(x_5 = 60{,}0\\,^\\circ\\text{C}\\) ein.</p>
<p>Berechnen Sie den neuen laufenden Mittelwert \\(\\mu_5\\) (in \\(^\\circ\\text{C}\\)) unmittelbar nach Verarbeitung des fünften Messwerts.</p>`,
        answers: [
          { value: 52.0, tolerance: 0.05, fraction: 100, feedback: 'Exakt! Delta_1 = 60 - 50 = 10 °C; mu_5 = 50 + 10 / 5 = 52.0 °C.' },
          { value: 52.5, tolerance: 0.05, fraction: 50, feedback: 'Teilpunkte: Sie haben durch k-1 = 4 statt durch die neue Stichprobengröße k = 5 geteilt (50 + 10/4 = 52.5).' }
        ],
        generalFeedback: `<p><strong>Musterherleitung (Welford-Schritt für \\(k=5\\)):</strong></p>
<p>Abweichung vom bisherigen Mittelwert: \\(\\Delta_1 = x_5 - \\mu_4 = 60{,}0 - 50{,}0 = 10{,}0\\,^\\circ\\text{C}\\).<br>
Aktualisierter Mittelwert: \\(\\mu_5 = \\mu_4 + \\frac{\\Delta_1}{k} = 50{,}0 + \\frac{10{,}0}{5} = 52{,}0\\,^\\circ\\text{C}\\).</p>`
      },
      {
        id: 'Q02_T01_Q3',
        title: 'C#-Code-Tracing: Allokationsfreier Ringpuffer (Modulo-Arithmetik)',
        shortSummary: 'Ringpuffer physischer Array-Index',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Gegeben sei folgender Ausschnitt eines allokationsfreien Ringpuffers für Echtzeit-Sensordaten:</p>
<pre><code class="language-csharp">int capacity = 10;
int head = 7;     // Index des ältesten Elements
int logicalIndex = 5; // 0-basierter logischer Index (5 = sechstes Element)
int physicalIndex = (head + logicalIndex) % capacity;</code></pre>
<p>Welchen numerischen Wert besitzt <code>physicalIndex</code> nach der Ausführung?</p>`,
        answers: [
          { value: 2, tolerance: 0, fraction: 100, feedback: 'Richtig! (7 + 5) % 10 = 12 % 10 = 2 (Wrap-Around am Array-Ende).' },
          { value: 3, tolerance: 0, fraction: 50, feedback: 'Teilpunkte: Off-by-One-Fehler (1-basierte statt 0-basierte Zählung beim Wrap-Around).' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<p>Der Ringpuffer bildet den logischen Index über Modulo-Arithmetik auf das interne Array ab: \\((7 + 5) \\bmod 10 = 12 \\bmod 10 = 2\\).</p>`
      },
      {
        id: 'Q02_T01_Q4',
        title: 'C#-Code-Lückentext: Gedrehte Pfeilspitze im Screen Space konstruieren',
        shortSummary: 'C# Pfeilspitzen-Geometrie im Screen Space',
        type: 'gapselect',
        grade: 1.0,
        text: `<p>Vervollständigen Sie den C#-Code zur Berechnung des linken Flügelpunkts <code>leftWing</code> einer Kraftpfeilspitze mit konstanter Pixellänge <code>arrowLen = 12.0</code> und halber Pfeilbreite <code>arrowWidth = 5.0</code> an der Pfeilspitze <code>tip</code> (Einheitsrichtungsvektor <code>(ux, uy)</code> im Screen Space):</p>
<pre><code class="language-csharp">double nx = [[1]]; // Normalenvektor X-Komponente (90 Grad gedreht)
double ny = [[2]]; // Normalenvektor Y-Komponente
Point leftWing = new Point(
    tip.X - [[3]] * arrowLen + nx * arrowWidth,
    tip.Y - uy * arrowLen + ny * arrowWidth);</code></pre>`,
        choices: [
          { text: '-uy', group: 1 },
          { text: 'ux', group: 2 },
          { text: 'ux', group: 3 },
          { text: 'uy', group: 1 },
          { text: '-ux', group: 1 },
          { text: '-uy', group: 2 },
          { text: '1.0 / ux', group: 2 },
          { text: 'ny', group: 3 },
          { text: 'tip.X', group: 3 }
        ],
        generalFeedback: `<p><strong>Erklärung:</strong> Der zum Richtungsvektor \\((u_x, u_y)\\) senkrechte 2D-Einheitsnormalenvektor lautet \\((n_x, n_y) = (-u_y, u_x)\\). Vom Spitzenpunkt <code>tip</code> geht man um <code>arrowLen</code> entgegen der Pfeilrichtung \\((-u_x, -u_y)\\) zurück und um <code>arrowWidth</code> entlang der Normalen \\((n_x, n_y)\\) nach außen.</p>`
      },
      {
        id: 'Q02_T01_Q5',
        title: 'Konzept-Zuordnung: ScottPlot-5-Plottable-Typen für Ingenieursdaten',
        shortSummary: 'ScottPlot 5 Plottables zuordnen',
        type: 'matching',
        grade: 1.0,
        text: `<p>Ordnen Sie den vier Visualisierungsaufgaben in <strong>ScottPlot 5</strong> jeweils den architektonisch optimalen Plottable-Typ zu (beachten Sie die zwei Überhang-Distraktoren).</p>`,
        subquestions: [
          { text: 'Statisches Zeitreihen-Signal mit 1 Million äquidistant abgetasteten Messpunkten (konstantes dt)', answer: 'Add.Signal() – nutzt festes X-Intervall für schnelles Min/Max-Downsampling ohne X-Array' },
          { text: 'Phasenraum-Trajektorie (x über v) mit unregelmäßigen Abständen und Schleifenbildung', answer: 'Add.Scatter() – speichert explizite (X, Y)-Koordinatenpaare für beliebige Kurvenverläufe' },
          { text: 'Kontinuierlich einlaufendes Live-Sensorsignal in einem Oszilloskop-Fenster fester Breite', answer: 'Add.DataStreamer() – überschreibt Daten in einem Ringpuffer fester Größe (Wipe- oder Scroll-Modus)' },
          { text: 'Statistische Verteilung mehrerer Versuchsreihen mit Median, Interquartilsabstand (IQR) und Whiskers', answer: 'Add.Boxes() – stellt 5-Punkte-Zusammenfassungen (Q1, Median, Q3, Antennen) dar' },
          { text: '', answer: 'Add.Pie() – erzeugt Kreissektoren für prozentuale Anteile ohne Zeitbezug' },
          { text: '', answer: 'Add.Heatmap() – rendert 2D-Skalarfelder als farbcodierte Pixelmatrix' }
        ],
        generalFeedback: `<p><strong>Lösung:</strong> <code>Signal</code> ist auf äquidistante Daten optimiert, <code>Scatter</code> benötigt explizite X/Y-Paare, <code>DataStreamer</code> verwaltet Echtzeit-Ringpuffer und <code>Boxes</code> zeichnet Box-Whisker-Plots.</p>`
      },
      {
        id: 'Q02_T01_Q6',
        title: 'DIN-406-Bemaßung: Warum Pfeilspitzen im Screen Space berechnet werden',
        shortSummary: 'Pfeilspitzen & Schrift im Screen Space',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Warum werden bei einer technischen CAD-/FEM-Zeichnung nach DIN 406 (Maßpfeile, Maßhilfslinien-Überstände und Maßzahlen) die Pfeilspitzen und Schriftgrößen erst <strong>nach</strong> der Transformation im <strong>Screen Space (Pixelkoordinaten)</strong> konstruiert und nicht im World Space (Meter)?</p>`,
        answers: [
          {
            text: 'Weil Pfeile und Texte sonst beim Zoomen oder bei stark unterschiedlichen Bauteilabmessungen entweder unleserlich winzig oder riesig skaliert würden.',
            fraction: 100,
            feedback: 'Richtig! Im Screen Space bleiben eine Pfeillänge von 10 px und eine Schriftgröße von 12 pt unabhängig vom Zoomfaktor exakt normgerecht lesbar.'
          },
          {
            text: 'Weil die WPF-Klasse Canvas geometrische Linien und Polygone grundsätzlich nur mit ganzzahligen Pixelkoordinaten ohne Nachkommastellen rendern kann.',
            fraction: 0,
            feedback: 'Falsch. WPF arbeitet intern komplett mit Gleitkommazahlen (double) in geräteunabhängigen Einheiten (DIP).'
          },
          {
            text: 'Weil trigonometrische Funktionen wie Math.Atan2 und Math.Sqrt in C# nur für positive Bildschirmkoordinaten im ersten Quadranten definiert sind.',
            fraction: 0,
            feedback: 'Falsch. Math.Atan2(dy, dx) ist auf dem gesamten Wertebereich (-pi bis +pi) für alle vier Quadranten definiert.'
          },
          {
            text: 'Weil eine Skalierung im World Space die Richtung der Stabnormalen invertieren und sämtliche Maßlinien auf die falsche Bauteilseite spiegeln würde.',
            fraction: 0,
            feedback: 'Falsch. Eine uniforme Skalierung ändert keine Winkel; erst die Y-Inversion kehrt den Umlaufsinn um, was aber kein Grund gegen World-Space-Längen ist.'
          }
        ],
        generalFeedback: `<p><strong>Begründung:</strong> Technische Annotationen (Pfeilspitzen, Strichstärken, Textgrößen) sind wahrnehmungsgebundene Größen. Würde man einen Pfeil mit \\(0{,}2\\,\\text{m}\\) im World Space definieren, wäre er beim Herauszoomen unsichtbar klein und beim Hineinzoomen bildschirmfüllend.</p>`
      },
      {
        id: 'Q02_T01_Q7',
        title: 'C#-Bug-Diagnose: Bounding-Box-Jitter beim interaktiven Knoten-Dragging',
        shortSummary: 'Bug-Diagnose: Auto-Fit während Dragging',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Ein Studierender implementiert das Verschieben eines Randknotens per Maus (<code>MouseMove</code>) auf dem WPF-Canvas. Sobald er den äußersten rechten Knoten zieht, zittert und springt das gesamte Fachwerk heftig hin und her:</p>
<pre><code class="language-csharp">void OnCanvasMouseMove(object sender, MouseEventArgs e) {
    if (_draggedNode == null) return;
    var transform = ComputeAutoFitTransform(_truss.GetBoundingBox());
    _draggedNode.Position = transform.ScreenToWorld(e.GetPosition(MainCanvas));
    RedrawTruss(transform);
}</code></pre>
<p>Was ist die exakte mathematisch-architektonische Ursache dieses Jitter-Bugs?</p>`,
        answers: [
          {
            text: 'Die Bounding-Box und Skalierung werden in jedem MouseMove-Event neu berechnet, sodass sich das Koordinatensystem während des Ziehens rückgekoppelt selbst verschiebt.',
            fraction: 100,
            feedback: 'Exakt! Wenn der Randknoten verschoben wird, ändert sich sofort die BoundingBox und damit die Transformation für das nächste MouseMove-Event (Rückkopplungsschleife).'
          },
          {
            text: 'Die Methode e.GetPosition(MainCanvas) liefert Koordinaten relativ zum gesamten Computermonitor statt relativ zur linken oberen Ecke des WPF-Canvas-Elements.',
            fraction: 0,
            feedback: 'Falsch. GetPosition(MainCanvas) liefert bereits exakt die lokalen Koordinaten relativ zum übergebenen UIElement MainCanvas.'
          },
          {
            text: 'Das Neuzeichnen in OnCanvasMouseMove blockiert den Garbage Collector, wodurch ältere Maus-Events in zufälliger Reihenfolge aus der Windows-Queue gelesen werden.',
            fraction: 0,
            feedback: 'Falsch. Die Windows-Message-Queue ist streng FIFO-geordnet; das Springen entsteht rein mathematisch durch den wechselnden Maßstab.'
          },
          {
            text: 'In WPF darf die Position eines Datenmodell-Objekts niemals innerhalb eines UI-Event-Handlers geändert werden, da dies einen Thread-Deadlock auslöst.',
            fraction: 0,
            feedback: 'Falsch. MouseMove läuft bereits auf dem UI-Thread; das Ändern einer Modelleigenschaft verursacht dort keinen Deadlock.'
          }
        ],
        generalFeedback: `<p><strong>Lösung:</strong> Während einer laufenden Drag-Operation muss die zu Beginn (in <code>MouseDown</code>) gültige <code>Transform2D</code> eingefroren (gecacht) bleiben, bis die Maustaste in <code>MouseUp</code> wieder losgelassen wird.</p>`
      },
      {
        id: 'Q02_T01_Q8',
        title: 'Systemanalyse: MSAGL-Graphenlayout (Sugiyama vs. Force-Directed)',
        shortSummary: 'MSAGL Sugiyama vs. MDS Eigenschaften',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: `<p>Welche <strong>zwei</strong> Aussagen charakterisieren die Layout-Algorithmen in <strong>Microsoft Automatic Graph Layout (MSAGL)</strong> und deren Integration in WPF zutreffend?</p>`,
        answers: [
          {
            text: 'Das Sugiyama-Schichtenlayout eignet sich ideal für gerichtete Ursache-Wirkungs-Ketten und ordnet Knoten in hierarchischen Ebenen mit minimalen Kantenkreuzungen an.',
            fraction: 50,
            feedback: 'Richtig! Sugiyama (Layered Layout) ist der Standard für gerichtete Graphen (DAGs), Ablaufpläne und Signalflussgraphen.'
          },
          {
            text: 'MSAGL berechnet als reine Geometrie-Engine ausschließlich Knoten- und Kantenkoordinaten im Speicher und überlässt das Zeichnen der UI-Schicht (z. B. WPF Canvas).',
            fraction: 50,
            feedback: 'Richtig! Durch die Nutzung von Microsoft.Msagl (Core) bleibt die Layoutberechnung sauber vom WPF-Rendering entkoppelt.'
          },
          {
            text: 'Das Sugiyama-Layout platziert alle Knoten ausschließlich durch elektrostatische Abstoßung und Federkräfte auf konzentrischen Kreisen ohne Hierarchierichtung.',
            fraction: -50,
            feedback: 'Falsch. Das beschreibt Kräfte-/Feder-Layouts (Force-Directed / MDS), nicht den hierarchischen Sugiyama-Algorithmus.'
          },
          {
            text: 'MSAGL erfordert zwingend eine aktive OpenGL-3D-Grafikkartenbeschleunigung, da die Knotenpositionen über einen Pixel-Shader auf der GPU gelöst werden.',
            fraction: -50,
            feedback: 'Falsch. MSAGL arbeitet rein CPU-basiert auf mathematischen Graphenstrukturen und benötigt keinerlei GPU-Shader.'
          }
        ],
        generalFeedback: `<p><strong>Zusammenfassung:</strong> MSAGL trennt Layout-Mathematik (Sugiyama für hierarchische DAGs, MDS/FastIncremental für ungerichtete Netzwerke) strikt vom Rendering auf dem WPF-Canvas.</p>`
      }
    ]
  },

  // ============================================================================
  // TEST 02 (VORBEREITUNG)
  // ============================================================================
  {
    id: 'Test_02_Vorbereitung',
    title: 'Quiz 02 - Test 02 (Vorbereitungstest): Letterboxing-Offsets, Welford-M2 & ScottPlot-Streaming',
    category: '$course$/Quiz_02_Termin_05/Test_02_Vorbereitung',
    isPractice: true,
    questions: [
      {
        id: 'Q02_T02_Q1',
        title: 'Affine 2D-Transformation: Letterboxing-Zentrierung und X-Screen-Koordinate',
        shortSummary: 'Horizontaler Letterboxing-Offset & \\(X_{\\text{screen}}\\)',
        type: 'cloze',
        grade: 2.0,
        text: `<p>Ein hydraulischer Steuerblock mit den Abmessungen \\(\\Delta X = 2{,}0\\,\\text{m}\\) (\\(x_{\\min}=0\\,\\text{m}\\), \\(x_{\\max}=2{,}0\\,\\text{m}\\)) und \\(\\Delta Y = 2{,}0\\,\\text{m}\\) soll mit einem umlaufenden Rand von \\(\\text{margin} = 40\\,\\text{px}\\) verzerrungsfrei auf einem WPF-Canvas der Gesamtgröße \\(W_{\\text{canvas}} = 680\\,\\text{px}\\) mal \\(H_{\\text{canvas}} = 480\\,\\text{px}\\) zentriert werden (nutzbare Fläche \\(W_{\\text{eff}} = 600\\,\\text{px}\\), \\(H_{\\text{eff}} = 400\\,\\text{px}\\)). Der uniforme Skalierungsfaktor beträgt \\(s = 200\\,\\text{px/m}\\).</p>
<p><strong>a)</strong> Berechnen Sie den gesamten horizontalen Randabstand \\(\\text{offset}_X\\) (in \\(\\text{px}\\)) vom linken Canvas-Rand bis zum Beginn des Bauteils bei \\(x_{\\min}=0\\,\\text{m}\\) (inklusive <code>margin</code> und Letterboxing-Zentrierung): {1:NUMERICAL:=140:0.5#Exakt! Gebrauchte Breite = 2.0 * 200 = 400 px; Freiraum = 600 - 400 = 200 px; offset_X = 40 + 200/2 = 140 px.~%50%100:0.5#Teilpunkte: 100 px ist nur der halbe Letterboxing-Freiraum (600-400)/2 ohne den linken Rand margin = 40 px.}</p>
<p><strong>b)</strong> Berechnen Sie die horizontale Bildschirmkoordinate \\(X_{\\text{screen}}\\) (in \\(\\text{px}\\)) für eine Ventilbohrung bei \\(x = 1{,}25\\,\\text{m}\\): {1:NUMERICAL:=390:0.5#Richtig! X_screen = 140 + 1.25 * 200 = 140 + 250 = 390 px.~%50%290:0.5#Teilpunkte: Folgefehler aus Teil a (40 px margin vergessen: 40 + 250 = 290 px) oder unzentriert gerechnet.}</p>`,
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<ol>
  <li><strong>Belegte Breite in Pixeln:</strong> \\(W_{\\text{used}} = \\Delta X \\cdot s = 2{,}0\\,\\text{m} \\cdot 200\\,\\text{px/m} = 400\\,\\text{px}\\).</li>
  <li><strong>Horizontaler Letterboxing-Offset:</strong> \\(\\text{offset}_X = \\text{margin} + \\frac{W_{\\text{eff}} - W_{\\text{used}}}{2} = 40 + \\frac{600 - 400}{2} = 40 + 100 = 140\\,\\text{px}\\).</li>
  <li><strong>Bildschirmkoordinate:</strong> \\(X_{\\text{screen}} = \\text{offset}_X + (x - x_{\\min}) \\cdot s = 140 + 1{,}25 \\cdot 200 = 390\\,\\text{px}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T02_Q2',
        title: 'Welford-Online-Algorithmus: Aktualisierung der Abweichungsquadratsumme M2',
        shortSummary: 'Welford \\(M_{2,k}\\)-Update berechnen',
        type: 'numerical',
        grade: 1.5,
        text: `<p>In einer Welford-Statistik-Instanz liegen nach \\(k-1 = 3\\) Messungen der Mittelwert \\(\\mu_3 = 10{,}0\\,\\text{bar}\\) und die Quadratsumme \\(M_{2,3} = 14{,}0\\,\\text{bar}^2\\) vor. Der \\(k = 4\\)-te Messwert beträgt \\(x_4 = 18{,}0\\,\\text{bar}\\), woraus sich \\(\\Delta_1 = 8{,}0\\,\\text{bar}\\) und der neue Mittelwert \\(\\mu_4 = 12{,}0\\,\\text{bar}\\) ergeben.</p>
<p>Berechnen Sie den neuen Wert der Quadratsumme \\(M_{2,4}\\) (in \\(\\text{bar}^2\\)) nach dem vierten Messwert.</p>`,
        answers: [
          { value: 62.0, tolerance: 0.1, fraction: 100, feedback: 'Exakt! Delta_2 = x_4 - mu_4 = 18.0 - 12.0 = 6.0; M2_4 = 14.0 + 8.0 * 6.0 = 14.0 + 48.0 = 62.0 bar^2.' },
          { value: 78.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: Sie haben M2 + Delta_1^2 = 14 + 64 = 78 gerechnet statt Delta_1 * Delta_2 (mit dem neuen Mittelwert mu_4) zu verwenden!' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<p>Im Welford-Algorithmus wird \\(M_2\\) mit dem Produkt aus der Abweichung vom <em>alten</em> Mittelwert (\\(\\Delta_1 = x_k - \\mu_{k-1} = 8{,}0\\)) und der Abweichung vom <em>neuen</em> Mittelwert (\\(\\Delta_2 = x_k - \\mu_k = 18{,}0 - 12{,}0 = 6{,}0\\)) aktualisiert:<br>
\\(M_{2,4} = M_{2,3} + \\Delta_1 \\cdot \\Delta_2 = 14{,}0 + 8{,}0 \\cdot 6{,}0 = 62{,}0\\,\\text{bar}^2\\).</p>`
      },
      {
        id: 'Q02_T02_Q3',
        title: 'C#-Code-Tracing: Hit-Testing-Abstandsquadrat im Screen Space',
        shortSummary: 'C#-Tracing: Hit-Testing Distanzquadrat',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Beim Maus-Klick auf ein WPF-Canvas prüft folgende Methode, ob ein Fachwerkknoten bei <code>nodeScreen = (120, 200)</code> innerhalb des Fangradius <code>snapRadius = 10.0</code> getroffen wurde:</p>
<pre><code class="language-csharp">double mouseX = 126.0, mouseY = 192.0;
double dx = mouseX - 120.0;
double dy = mouseY - 200.0;
double distSquared = dx * dx + dy * dy;</code></pre>
<p>Welchen numerischen Wert hat <code>distSquared</code> (in \\(\\text{px}^2\\))?</p>`,
        answers: [
          { value: 100, tolerance: 0.1, fraction: 100, feedback: 'Richtig! dx = 6, dy = -8; distSquared = 6^2 + (-8)^2 = 36 + 64 = 100 px^2.' },
          { value: 10, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: 10 px ist die gezogene Wurzel ( euklidische Distanz), gefragt war aber distSquared = 100 px^2.' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> \\(\\Delta x = 126 - 120 = 6\\,\\text{px}\\), \\(\\Delta y = 192 - 200 = -8\\,\\text{px}\\). Damit ist \\(\\text{distSquared} = 6^2 + (-8)^2 = 36 + 64 = 100\\,\\text{px}^2\\). Da man im Hit-Testing <code>distSquared &lt;= snapRadius * snapRadius</code> prüft, spart man sich den teuren <code>Math.Sqrt</code>-Aufruf.</p>`
      },
      {
        id: 'Q02_T02_Q4',
        title: 'C#-Code-Lückentext: Rücktransformation ScreenToWorld für Maus-Interaktion',
        shortSummary: 'C# ScreenToWorld Transformation',
        type: 'gapselect',
        grade: 1.0,
        text: `<p>Vervollständigen Sie die Methode <code>ScreenToWorld</code> in der Klasse <code>Transform2D</code>, die einen Mausklick <code>(xScreen, yScreen)</code> zurück in physikalische Weltkoordinaten <code>(xWorld, yWorld)</code> umrechnet:</p>
<pre><code class="language-csharp">public (double xWorld, double yWorld) ScreenToWorld(double xScreen, double yScreen)
{
    double xWorld = XMin + (xScreen - OffsetX) / [[1]];
    double yFromBottom = [[2]] - yScreen;
    double yWorld = YMin + (yFromBottom - [[3]]) / Scale;
    return (xWorld, yWorld);
}</code></pre>`,
        choices: [
          { text: 'Scale', group: 1 },
          { text: 'CanvasHeight', group: 2 },
          { text: 'OffsetY', group: 3 },
          { text: 'CanvasWidth', group: 1 },
          { text: 'OffsetX', group: 1 },
          { text: 'yScreen', group: 2 },
          { text: 'YMax', group: 2 },
          { text: 'XMin', group: 3 },
          { text: 'Scale', group: 3 }
        ],
        generalFeedback: `<p><strong>Erklärung:</strong> Zur Umkehrung von \\(X_{\\text{screen}} = \\text{OffsetX} + (x - X_{\\min}) \\cdot \\text{Scale}\\) subtrahiert man <code>OffsetX</code> und teilt durch <code>Scale</code>. Für Y macht man zuerst die Y-Inversion über <code>CanvasHeight - yScreen</code> rückgängig, zieht <code>OffsetY</code> ab und teilt durch <code>Scale</code>.</p>`
      },
      {
        id: 'Q02_T02_Q5',
        title: 'Pipeline-Reihenfolge: Die 4 Phasen des Sugiyama-Schichtenlayouts in MSAGL',
        shortSummary: '4 Phasen des Sugiyama-Algorithmus',
        type: 'ddwtos',
        grade: 1.0,
        text: `<p>Bringen Sie die <strong>vier klassischen Algorithmus-Phasen des Sugiyama-Schichtenlayouts</strong> (Layered Graph Drawing in MSAGL) in die korrekte Ausführungspipeline:</p>
<p><strong>Schritt 1:</strong> [[1]] (temporäres Umkehren von Rückwärtskanten, um einen azyklischen Graphen DAG zu erzeugen)<br>
<strong>Schritt 2:</strong> [[2]] (Einteilung aller Knoten in diskrete horizontale bzw. vertikale Hierarchie-Ebenen)<br>
<strong>Schritt 3:</strong> [[3]] (Permutieren der Knotenreihenfolge innerhalb der Schichten zur Minimierung von Kantenüberschneidungen)<br>
<strong>Schritt 4:</strong> [[4]] (Bestimmung der exakten metrischen X/Y-Koordinaten und Spline-Kontrollpunkte)</p>`,
        dragboxes: [
          { text: 'Cycle Removal (Zyklenbeseitigung)', group: 1 },
          { text: 'Layer Assignment (Schichtenzuweisung)', group: 1 },
          { text: 'Crossing Reduction (Kreuzungsminimierung)', group: 1 },
          { text: 'Coordinate Assignment (Koordinatenberechnung)', group: 1 },
          { text: 'Delaunay Triangulation (Vernetzung)', group: 1 },
          { text: 'Z-Buffer Rasterization (Tiefentest)', group: 1 }
        ],
        generalFeedback: `<p><strong>Sugiyama-Pipeline:</strong> 1. Cycle Removal $\\to$ 2. Layer Assignment $\\to$ 3. Crossing Reduction $\\to$ 4. Coordinate Assignment & Edge Routing.</p>`
      },
      {
        id: 'Q02_T02_Q6',
        title: 'WPF-Architektur: Retained Mode (Canvas) vs. Immediate-Mode-nahes DrawingVisual',
        shortSummary: 'WPF Canvas vs. DrawingVisual Overhead',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>In Kapitel 03 wird das klassische <code>Canvas</code> mit <code>Shape</code>-Elementen (<code>Line</code>, <code>Ellipse</code>) dem leichtgewichtigen <code>DrawingVisual</code> / <code>DrawingContext</code> gegenübergestellt. Wann stößt das <code>Canvas</code> mit einzelnen <code>Shape</code>-Objekten an seine Performance-Grenze?</p>`,
        answers: [
          {
            text: 'Wenn tausende Geometrie-Elemente mit 60 Hz neu erzeugt werden, weil jedes Shape ein schweres UIElement mit Layout- und DependencyProperty-Overhead ist.',
            fraction: 100,
            feedback: 'Richtig! Jedes Shape im Visual Tree durchläuft Measure/Arrange und verwaltet Dutzende DependencyProperties; ab einigen tausend Objekten bricht die Framerate ein.'
          },
          {
            text: 'Sobald mehr als 16 verschiedene Farben im selben Canvas verwendet werden, weil die WPF-Farbpalette pro Panel auf einen 4-Bit-Index beschränkt ist.',
            fraction: 0,
            feedback: 'Falsch. WPF unterstützt volle 32-Bit-ARGB-Farben für beliebig viele Brushes ohne Palettenlimit.'
          },
          {
            text: 'Wenn das Canvas-Element innerhalb eines Grid-Containers platziert wird, da das Grid alle Kind-Koordinaten automatisch auf den Ursprung zurücksetzt.',
            fraction: 0,
            feedback: 'Falsch. Ein Canvas innerhalb einer Grid-Zelle behält seine eigene absolute Koordinatenlogik (Canvas.Left/Top) vollständig bei.'
          },
          {
            text: 'Sobald negative Weltkoordinaten im Simulationsmodell auftreten, weil die Klasse Line in WPF nur positive Bildschirm-Koordinatenwerte akzeptiert.',
            fraction: 0,
            feedback: 'Falsch. Erstens transformiert man Weltkoordinaten ohnehin in positive Screen-Koordinaten, und zweitens akzeptiert Line auch negative double-Werte.'
          }
        ],
        generalFeedback: `<p><strong>Architektur-Vergleich:</strong> Für moderate Objektzahlen (z. B. Fachwerk mit 50–500 Stäben und direktem Hit-Testing/Tooltips) ist <code>Canvas</code> ideal. Für Partikelschwärme mit 20.000 Elementen nutzt man <code>DrawingVisual</code> oder <code>WriteableBitmap</code>.</p>`
      },
      {
        id: 'Q02_T02_Q7',
        title: 'C#-Bug-Diagnose: Katastrophale Auslöschung bei der naiven Ein-Pass-Varianzformel',
        shortSummary: 'Bug-Diagnose: Naive Varianz Auslöschung',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Ein Ingenieur misst einen hochstabilen Systemdruck um \\(10^8\\,\\text{Pa}\\) mit minimalem Rauschen von \\(\\pm 1\\,\\text{Pa}\\) und berechnet die Varianz in C# mit folgender „Lehrbuch-Verschiebungsformel“:</p>
<pre><code class="language-csharp">double mean = sumX / n;
double variance = (sumXSquared / n) - (mean * mean);</code></pre>
<p>Bei der Ausführung liefert <code>variance</code> plötzlich <code>0.0</code> oder sogar einen <strong>negativen</strong> Wert! Warum?</p>`,
        answers: [
          {
            text: 'Durch die Subtraktion zweier fast identischer Riesenzahlen um 10^16 geht die kleine Varianz in den hinteren Mantissenbits von double durch Auslöschung komplett verloren.',
            fraction: 100,
            feedback: 'Exakt! IEEE-754 double hat ca. 15–17 signifikante Dezimalstellen. Bei (10^8)^2 = 10^16 liegen die Schwankungen von +-1 Pa genau an der Rundungsgrenze (Catastrophic Cancellation).'
          },
          {
            text: 'In C# wird der Ausdruck mean * mean standardmäßig in 32-Bit-Ganzzahlarithmetik (int) ausgewertet, sodass es ab 46341 zu einem Integer-Overflow kommt.',
            fraction: 0,
            feedback: 'Falsch. Da mean vom Typ double ist, erfolgt die Multiplikation in 64-Bit-Gleitkommaarithmetik (bis ca. 1.8 * 10^308).'
          },
          {
            text: 'Die Division durch n rundet in C# automatisch auf die nächste ganze Zahl ab, solange der Divisor n als ganzzahliger Typ int deklariert wurde.',
            fraction: 0,
            feedback: 'Falsch. Sobald der Dividend sumXSquared ein double ist, führt C# eine exakte Gleitkommadivision durch.'
          },
          {
            text: 'Der JIT-Compiler von .NET optimiert aufeinanderfolgende Multiplikationen derselben Variable weg und ersetzt mean * mean fehlerhaft durch 2 * mean.',
            fraction: 0,
            feedback: 'Falsch. Der JIT-Compiler verändert niemals die mathematische Bedeutung von x * x zu 2 * x.'
          }
        ],
        generalFeedback: `<p><strong>Lösung:</strong> Genau wegen dieser katastrophalen Auslöschung (Catastrophic Cancellation) bei großem Offset und kleiner Streuung verwendet man in der Messtechnik den <strong>Welford-Online-Algorithmus</strong>, der nur Differenzen \\(x_k - \\mu\\) quadriert.</p>`
      },
      {
        id: 'Q02_T02_Q8',
        title: 'Systemanalyse: WPF-Ressourcen-Management & Pen/Brush-Freezing',
        shortSummary: 'WPF Freeze() & Brush-Wiederverwendung',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: `<p>Welche <strong>zwei</strong> Maßnahmen steigern die Rendering-Performance und Speichereffizienz beim Zeichnen dynamischer 2D-Vektorgrafiken in WPF signifikant?</p>`,
        answers: [
          {
            text: 'Das Aufrufen von Freeze() auf statischen SolidColorBrush- und Pen-Instanzen macht diese unveränderlich und entfernt den teuren Änderungsbenachrichtigungs-Overhead.',
            fraction: 50,
            feedback: 'Richtig! Eingefrorene Freezable-Objekte benötigen keine Event-Handler für PropertyChanged mehr und sind zudem thread-safe.'
          },
          {
            text: 'Häufig benötigte Pinsel und Stifte werden einmalig als statische oder Klassen-Felder angelegt, statt in jedem Render-Frame tausende neue Brush-Objekte zu allokieren.',
            fraction: 50,
            feedback: 'Richtig! Das gecachte Wiederverwenden von Brushes vermeidet massiven Garbage-Collection-Druck im 60-Hz-Renderloop.'
          },
          {
            text: 'Jede einzelne Linie auf dem Canvas sollte in ein eigenes verschachteltes Unter-Canvas verpackt werden, um die Tiefensortierung auf der CPU zu beschleunigen.',
            fraction: -50,
            feedback: 'Falsch. Zusätzliche Container-Elemente blähen den Visual Tree massiv auf und verschlechtern die Layout-Performance.'
          },
          {
            text: 'Vor jedem Zeichenschritt muss GC.Collect() manuell im UI-Thread aufgerufen werden, damit die Grafikkarte den Videospeicher für neue Linien freigibt.',
            fraction: -50,
            feedback: 'Falsch. Manuelles GC.Collect() im Renderloop erzwingt teure Stop-the-World-Pausen und verursacht starkes Mikroruckeln.'
          }
        ],
        generalFeedback: `<p><strong>Merksatz:</strong> In WPF gilt für zeitkritische 2D-Grafik: <code>Brush</code>/<code>Pen</code>-Instanzen einmalig erzeugen, mit <code>.Freeze()</code> einfrieren und über alle Frames hinweg wiederverwenden.</p>`
      }
    ]
  },

  // ============================================================================
  // TEST 03 (VORBEREITUNG)
  // ============================================================================
  {
    id: 'Test_03_Vorbereitung',
    title: 'Quiz 02 - Test 03 (Vorbereitungstest): Inverse Transformation, 3-Sigma-Grenzen & ScottPlot-Refresh',
    category: '$course$/Quiz_02_Termin_05/Test_03_Vorbereitung',
    isPractice: true,
    questions: [
      {
        id: 'Q02_T03_Q1',
        title: 'Inverse 2D-Transformation (ScreenToWorld): Mausklick in Weltkoordinaten umrechnen',
        shortSummary: 'Inverse Transformation \\(X_{\\text{world}}\\) & \\(Y_{\\text{world}}\\)',
        type: 'cloze',
        grade: 2.0,
        text: `<p>Auf einem WPF-Canvas der Gesamthöhe \\(H_{\\text{canvas}} = 500\\,\\text{px}\\) wird ein Maschinenfundament mit \\(x_{\\min} = -5{,}0\\,\\text{m}\\) und \\(y_{\\min} = 0{,}0\\,\\text{m}\\) dargestellt. Die aktuelle Transformation nutzt den uniformen Skalierungsfaktor \\(s = 40\\,\\text{px/m}\\), den horizontalen Offset \\(\\text{offset}_X = 60\\,\\text{px}\\) und den vertikalen Offset vom unteren Rand \\(\\text{offset}_Y = 50\\,\\text{px}\\). Ein Ingenieur klickt mit der Maus exakt auf die Bildschirmkoordinate \\((X_{\\text{screen}}, Y_{\\text{screen}}) = (300\\,\\text{px}, 170\\,\\text{px})\\).</p>
<p><strong>a)</strong> Berechnen Sie die zugehörige physikalische Weltkoordinate \\(X_{\\text{world}}\\) in \\(\\text{m}\\): {1:NUMERICAL:=1.0:0.05#Exakt! X_world = x_min + (300 - 60) / 40 = -5.0 + 240 / 40 = -5.0 + 6.0 = 1.0 m.~%50%6.0:0.05#Teilpunkte: 6.0 m ist der relative Abstand (300 - 60)/40 ohne Addition des Ursprungswerts x_min = -5.0 m.}</p>
<p><strong>b)</strong> Berechnen Sie die zugehörige physikalische Weltkoordinate \\(Y_{\\text{world}}\\) in \\(\\text{m}\\) unter Berücksichtigung der Y-Inversion: {1:NUMERICAL:=7.0:0.05#Richtig! y_bottom = 500 - 170 = 330 px; Y_world = 0.0 + (330 - 50) / 40 = 280 / 40 = 7.0 m.~%50%3.0:0.05#Teilpunkte: Sie haben die Y-Inversion vergessen und direkt (170 - 50) / 40 = 3.0 m gerechnet!}</p>`,
        generalFeedback: `<p><strong>Musterherleitung (ScreenToWorld):</strong></p>
<ol>
  <li><strong>X-Rücktransformation:</strong> \\(X_{\\text{world}} = x_{\\min} + \\frac{X_{\\text{screen}} - \\text{offset}_X}{s} = -5{,}0 + \\frac{300 - 60}{40} = -5{,}0 + 6{,}0 = 1{,}0\\,\\text{m}\\).</li>
  <li><strong>Y-Rücktransformation (inkl. Y-Inversion):</strong> Abstand vom unteren Rand \\(y_{\\text{bottom}} = H_{\\text{canvas}} - Y_{\\text{screen}} = 500 - 170 = 330\\,\\text{px}\\). Damit gilt \\(Y_{\\text{world}} = y_{\\min} + \\frac{330 - \\text{offset}_Y}{s} = 0{,}0 + \\frac{330 - 50}{40} = \\frac{280}{40} = 7{,}0\\,\\text{m}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T03_Q2',
        title: 'Statistische Prozesskontrolle (SPC): Obere 3-Sigma-Warngrenze aus Welford-Daten',
        shortSummary: 'Obere \\(3\\sigma\\)-Warngrenze aus \\(M_2\\)',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Ein Welford-Online-Tracker hat für die Spindeldrehzahl einer CNC-Fräse nach \\(k = 26\\) Messwerten den Mittelwert \\(\\mu = 100{,}0\\,\\text{U/s}\\) und die Abweichungsquadratsumme \\(M_2 = 400{,}0\\,(\\text{U/s})^2\\) ermittelt. Im Live-Diagramm soll die obere statistische Prozesskontrollgrenze (Upper Control Limit) bei \\(\\text{UCL} = \\mu + 3 \\cdot s\\) (mit der empirischen Stichprobenstandardabweichung \\(s\\)) als horizontale Warnlinie eingezeichnet werden.</p>
<p>Berechnen Sie den numerischen Wert dieser oberen \\(3\\sigma\\)-Grenze \\(\\text{UCL}\\) in \\(\\text{U/s}\\).</p>`,
        answers: [
          { value: 112.0, tolerance: 0.1, fraction: 100, feedback: 'Exakt! Stichprobenvarianz s^2 = M2 / (k - 1) = 400 / 25 = 16; Standardabweichung s = 4.0 U/s; UCL = 100 + 3 * 4.0 = 112.0 U/s.' },
          { value: 148.0, tolerance: 0.5, fraction: 50, feedback: 'Teilpunkte: Sie haben mu + 3 * s^2 = 100 + 3 * 16 = 148 gerechnet (Wurzelziehen für die Standardabweichung s vergessen!).' },
          { value: 111.77, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: Sie haben durch k = 26 statt durch k - 1 = 25 (Bessel-Korrektur für Stichprobenvarianz) geteilt.' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<ol>
  <li><strong>Empirische Stichprobenvarianz (mit Bessel-Korrektur):</strong> \\(s^2 = \\frac{M_2}{k - 1} = \\frac{400{,}0}{26 - 1} = \\frac{400{,}0}{25} = 16{,}0\\,(\\text{U/s})^2\\).</li>
  <li><strong>Standardabweichung:</strong> \\(s = \\sqrt{16{,}0} = 4{,}0\\,\\text{U/s}\\).</li>
  <li><strong>Obere \\(3\\sigma\\)-Grenze:</strong> \\(\\text{UCL} = \\mu + 3s = 100{,}0 + 3 \\cdot 4{,}0 = 112{,}0\\,\\text{U/s}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T03_Q3',
        title: 'C#-Code-Tracing: Gruppiertes Balkendiagramm (Bar Plot Offset) in ScottPlot 5',
        shortSummary: 'C#-Tracing: Gruppierte Balkenposition',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Um in ScottPlot 5 für jede Kategorie <code>i</code> zwei Balken (Soll vs. Ist) nebeneinander ohne Überlappung zu zeichnen, wird folgender C#-Code ausgeführt:</p>
<pre><code class="language-csharp">int categoryIndex = 3;
double groupWidth = 0.6;
double singleBarWidth = groupWidth / 2.0;
double rightBarCenter = categoryIndex + singleBarWidth / 2.0;</code></pre>
<p>Welchen numerischen X-Positionswert besitzt <code>rightBarCenter</code>?</p>`,
        answers: [
          { value: 3.15, tolerance: 0.01, fraction: 100, feedback: 'Richtig! singleBarWidth = 0.3; rightBarCenter = 3 + 0.3 / 2.0 = 3.15.' },
          { value: 3.3, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte: Sie haben um die volle Balkenbreite singleBarWidth = 0.3 statt um die halbe Balkenbreite 0.15 verschoben (Lücke zwischen den Balken!).' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> Jeder der zwei Einzelbalken hat die Breite \\(w = \\frac{0{,}6}{2} = 0{,}3\\). Da die Balken bei der Kategorienmitte \\(x = 3\\) aneinanderstoßen sollen, liegt die Mitte des linken Balkens bei \\(3 - \\frac{0{,}3}{2} = 2{,}85\\) und die Mitte des rechten Balkens bei \\(3 + \\frac{0{,}3}{2} = 3{,}15\\).</p>`
      },
      {
        id: 'Q02_T03_Q4',
        title: 'C#-Code-Lückentext: Welford-Online-Update in C# implementieren',
        shortSummary: 'C# Welford-Methode AddSample',
        type: 'gapselect',
        grade: 1.0,
        text: `<p>Vervollständigen Sie die C#-Methode <code>AddSample(double x)</code> für die numerisch stabile Online-Berechnung von Mittelwert und Varianz nach Welford:</p>
<pre><code class="language-csharp">public void AddSample(double x)
{
    Count++;
    double delta1 = x - [[1]];
    Mean += delta1 / [[2]];
    double delta2 = x - [[3]];
    M2 += delta1 * delta2;
}</code></pre>`,
        choices: [
          { text: 'Mean', group: 1 },
          { text: 'Count', group: 2 },
          { text: 'Mean', group: 3 },
          { text: 'M2', group: 1 },
          { text: 'Count', group: 1 },
          { text: 'Count - 1', group: 2 },
          { text: 'M2', group: 2 },
          { text: 'delta1', group: 3 },
          { text: 'M2', group: 3 }
        ],
        generalFeedback: `<p><strong>Erklärung:</strong> Zuerst wird <code>delta1 = x - Mean</code> (mit dem <em>alten</em> Mittelwert) berechnet, danach <code>Mean += delta1 / Count</code> aktualisiert, und schließlich <code>delta2 = x - Mean</code> (mit dem bereits <em>aktualisierten</em> Mittelwert) bestimmt, bevor <code>M2 += delta1 * delta2</code> ausgeführt wird.</p>`
      },
      {
        id: 'Q02_T03_Q5',
        title: 'Konzept-Zuordnung: Geometrie- und Layout-Komponenten in Kapitel 03 & 04',
        shortSummary: 'Kap. 03/04 Klassen & Konzepte zuordnen',
        type: 'matching',
        grade: 1.0,
        text: `<p>Ordnen Sie den vier technischen Anforderungen aus Kapitel 03 und 04 jeweils die passende Klasse bzw. Methode zu (beachten Sie die zwei Überhang-Distraktoren).</p>`,
        subquestions: [
          { text: 'Hierarchisches Schichtenlayout für gerichtete Signalflussgraphen mit automatischer Kreuzungsminimierung', answer: 'SugiyamaLayoutSettings (MSAGL Layered Layout)' },
          { text: 'Kräftebasiertes Layout für ungerichtete Kommunikations- oder Rohrknotennetze anhand idealer Kantenlängen', answer: 'MdsLayoutSettings / FastIncrementalLayoutSettings (MSAGL)' },
          { text: 'Leichtgewichtige WPF-Zeichenschicht für zehntausende Primitiven ohne einzelnen UIElement-Layout-Overhead', answer: 'DrawingVisual mit DrawingContext.DrawLine()' },
          { text: 'Verzerrungsfreie Einpassung eines Bauteils in das Canvas unter Beibehaltung des Seitenverhältnisses', answer: 'Math.Min(scaleX, scaleY) mit Letterboxing-Zentrierung' },
          { text: '', answer: 'Math.Max(scaleX, scaleY) mit anisotroper Streckung' },
          { text: '', answer: 'WriteableBitmap.AddDirtyRect() mit 3D-Tiefenpuffer' }
        ],
        generalFeedback: `<p><strong>Lösung:</strong> <code>SugiyamaLayoutSettings</code> erzeugt hierarchische Ebenen, <code>MdsLayoutSettings</code> nutzt Distanz-/Kräfteminimierung, <code>DrawingVisual</code> umgeht den UIElement-Overhead und <code>Math.Min(scaleX, scaleY)</code> sichert die Winkeltreue.</p>`
      },
      {
        id: 'Q02_T03_Q6',
        title: 'ScottPlot 5 Performance: Warum Signal-Plots bei großen Zeitreihen schneller sind als Scatter-Plots',
        shortSummary: 'ScottPlot Signal vs. Scatter Komplexität',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Warum kann ein <code>Signal</code>-Plot in <strong>ScottPlot 5</strong> eine Zeitreihe mit \\(10\\,\\text{Millionen}\\) Messpunkten flüssig mit \\(60\\,\\text{FPS}\\) zoomen und schwenken, während ein <code>Scatter</code>-Plot bei derselben Punktanzahl merklich einbricht?</p>`,
        answers: [
          {
            text: 'Weil Signal ein festes Abtastintervall voraussetzt und dadurch sichtbare Indexbereiche in O(1) berechnet sowie pro Pixelspalte nur Min/Max-Extrema zeichnet.',
            fraction: 100,
            feedback: 'Richtig! Durch die Äquidistanz entfällt das X-Array komplett; der sichtbare Array-Ausschnitt steht sofort fest und wird spaltenweise auf Min/Max-Linien reduziert.'
          },
          {
            text: 'Weil Signal alle Gleitkommawerte beim Laden automatisch auf 8-Bit-Ganzzahlen rundet und damit 87,5 Prozent des Arbeitsspeichers verwirft.',
            fraction: 0,
            feedback: 'Falsch. Signal arbeitet unverändert mit der vollen double- oder float-Präzision des übergebenen Arrays.'
          },
          {
            text: 'Weil Scatter-Plots in ScottPlot 5 grundsätzlich keine Hardwarebeschleunigung unterstützen und jeden Punkt einzeln über die Windows-Registry protokollieren.',
            fraction: 0,
            feedback: 'Falsch. Beide Plottables nutzen SkiaSharp zum Rendern; der Unterschied liegt im Speicherlayout und im Index-Zugriff.'
          },
          {
            text: 'Weil Signal-Plots intern nur jeden tausendsten Messwert im Speicher behalten und alle hochfrequenten Spitzenwerte beim Import dauerhaft löschen.',
            fraction: 0,
            feedback: 'Falsch. Durch das Min/Max-Spalten-Downsampling bleiben gerade alle Spitzen (Peaks/Ausreißer) visuell exakt erhalten, und beim Hineinzoomen erscheinen alle Einzelpunkte.'
          }
        ],
        generalFeedback: `<p><strong>Technischer Hintergrund:</strong> Bei äquidistanten Zeitreihen ist \\(i = \\lfloor (t - t_0) / \\Delta t \\rfloor\\) in \\(\\mathcal{O}(1)\\) berechenbar. Für jede Bildschirmspalte (z. B. 1000 Pixel breit) bestimmt <code>Signal</code> das Minimum und Maximum des zugehörigen Index-Slices und zeichnet nur einen vertikalen Strich pro Pixelspalte.</p>`
      },
      {
        id: 'Q02_T03_Q7',
        title: 'C#-Bug-Diagnose: Hohe CPU-Last durch verfrühtes WpfPlot.Refresh() in Schleifen',
        shortSummary: 'Bug-Diagnose: WpfPlot.Refresh() in Schleife',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>In einer Mehrkanal-Überwachung werden 50 Temperatursensoren mit jeweils \\(100\\,\\text{Hz}\\) ausgelesen. Der folgende Code führt sofort zu \\(100\\,\\%\\) CPU-Auslastung und einer eingefrorenen WPF-Oberfläche:</p>
<pre><code class="language-csharp">void OnSensorPacketReceived(double[] channelValues) {
    for (int ch = 0; ch < 50; ch++) {
        _streamers[ch].Add(channelValues[ch]);
        MainPlot.Refresh();
    }
}</code></pre>
<p>Worin liegt der gravierende Architekturfehler in dieser Methode?</p>`,
        answers: [
          {
            text: 'MainPlot.Refresh() wird innerhalb der Kanal-Schleife 50-mal pro Paket aufgerufen und erzwingt damit 5000 komplette SkiaSharp-Renderdurchläufe pro Sekunde.',
            fraction: 100,
            feedback: 'Exakt! Datenaufnahme (.Add) und Bildschirmdarstellung (.Refresh) müssen entkoppelt werden: Refresh() gehört aus der Schleife heraus in einen 30/60-Hz-UI-Timer.'
          },
          {
            text: 'Die Methode DataStreamer.Add() kopiert bei jedem Aufruf die gesamte Festplatte auf die Grafikkarte, weshalb maximal ein Kanal pro Anwendung erlaubt ist.',
            fraction: 0,
            feedback: 'Falsch. DataStreamer.Add() schreibt nur einen einzelnen double-Wert in einen extrem schnellen RAM-Ringpuffer (wenige Nanosekunden).'
          },
          {
            text: 'In C# dürfen Arrays vom Typ double[] nicht als Methodenparameter übergeben werden, ohne zuvor mit dem Schlüsselwort fixed im Speicher gepinnt zu werden.',
            fraction: 0,
            feedback: 'Falsch. Normale verwaltete Array-Referenzen werden in C# ohne fixed-Block völlig problemlos als Referenz übergeben.'
          },
          {
            text: 'Die Laufvariable ch der for-Schleife muss als double deklariert werden, da ganzzahlige Indizes in ScottPlot 5 eine teure Typkonvertierung auslösen.',
            fraction: 0,
            feedback: 'Falsch. Array- und Listenindizes in C# sind nativ vom Typ int.'
          }
        ],
        generalFeedback: `<p><strong>Best Practice (Kapitel 04):</strong> Sensordaten werden im Hintergrund oder im Paket-Handler ausschließlich in den Ringpuffer geschrieben (<code>_streamers[ch].Add(...)</code>). Ein separater <code>DispatcherTimer</code> mit \\(30\\text{–}60\\,\\text{Hz}\\) ruft genau einmal pro Frame <code>MainPlot.Refresh()</code> auf.</p>`
      },
      {
        id: 'Q02_T03_Q8',
        title: 'Systemanalyse: DIN-406-Bemaßungsgeometrie & Vektornormalen im 2D-Raum',
        shortSummary: 'DIN-406-Bemaßungsregeln & 2D-Normalen',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: `<p>Welche <strong>zwei</strong> geometrischen Aussagen treffen auf die programmgesteuerte Konstruktion einer normgerechten <strong>DIN-406-Bemaßung</strong> für einen schräg im 2D-Raum liegenden Fachwerkstab zu?</p>`,
        answers: [
          {
            text: 'Die Maßlinie verläuft exakt parallel zum Stab in einem festen Normalenabstand, während die beiden Maßhilfslinien senkrecht vom Stab über die Maßlinie hinausragen.',
            fraction: 50,
            feedback: 'Richtig! Der Normalenvektor (-uy, ux) verschiebt die Maßlinie parallel zum Stab; die Maßhilfslinien besitzen zudem einen normierten Überstand von ca. 2–3 mm (bzw. 6–8 px).'
          },
          {
            text: 'Der Drehwinkel der Maßzahl wird mit Math.Atan2(dy, dx) bestimmt und bei Kopfüber-Winkeln um 180 Grad korrigiert, damit der Text von unten oder rechts lesbar bleibt.',
            fraction: 50,
            feedback: 'Richtig! Nach DIN 406 dürfen Maßzahlen niemals auf dem Kopf stehen; liegt der Winkel zwischen +90° und +180° bzw. -90° und -180°, wird die Textorientierung gedreht.'
          },
          {
            text: 'Maßlinien dürfen in technischen Zeichnungen grundsätzlich nur streng horizontal oder streng vertikal am Bildschirmrand ausgerichtet werden, niemals parallel zu schrägen Stäben.',
            fraction: -50,
            feedback: 'Falsch. Gerade für die wahre Stablänge schräger Bauteile wird die Maßlinie parallel zur Bauteilkante orientiert.'
          },
          {
            text: 'Der senkrechte 2D-Normalenvektor zu einem Einheitsrichtungsvektor (ux, uy) ergibt sich durch Quadrieren beider Komponenten zu (ux * ux, uy * uy).',
            fraction: -50,
            feedback: 'Falsch. Ein 90°-gedrehter Normalenvektor entsteht durch Vertauschen und Vorzeichenwechsel einer Komponente: (-uy, ux) oder (uy, -ux).'
          }
        ],
        generalFeedback: `<p><strong>Zusammenfassung:</strong> Eine saubere CAD-Bemaßung nutzt den Einheitsrichtungsvektor \\(\\vec{u} = (u_x, u_y)\\) entlang des Stabs und den Einheitsnormalenvektor \\(\\vec{n} = (-u_y, u_x)\\) senkrecht dazu, kombiniert mit einer Lesbarkeitskorrektur des Textwinkels.</p>`
      }
    ]
  },

  // ============================================================================
  // TEST 04 (PRÜFUNG)
  // ============================================================================
  {
    id: 'Test_04_Pruefung',
    title: 'Quiz 02 - Test 04 (Prüfungstest): Vertikales Letterboxing, Welford-Varianz & Box-Plot-IQR',
    category: '$course$/Quiz_02_Termin_05/Test_04_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'Q02_T04_Q1',
        title: 'Affine 2D-Transformation: Vertikaler Letterboxing-Offset und Y-Screen-Position',
        shortSummary: 'Vertikaler Letterboxing-Offset & \\(Y_{\\text{screen}}\\)',
        type: 'cloze',
        grade: 2.0,
        text: `<p>Ein Portalkran mit der Breite \\(\\Delta X = 25\\,\\text{m}\\) (\\(x_{\\min}=0\\,\\text{m}\\), \\(x_{\\max}=25\\,\\text{m}\\)) und der Höhe \\(\\Delta Y = 5\\,\\text{m}\\) (\\(y_{\\min}=0\\,\\text{m}\\), \\(y_{\\max}=5\\,\\text{m}\\)) wird auf einem WPF-Canvas der Gesamthöhe \\(H_{\\text{canvas}} = 460\\,\\text{px}\\) mit umlaufendem Rand \\(\\text{margin} = 30\\,\\text{px}\\) dargestellt. Die nutzbare Zeichenfläche beträgt \\(W_{\\text{eff}} = 500\\,\\text{px}\\) mal \\(H_{\\text{eff}} = 400\\,\\text{px}\\). Der uniforme Skalierungsfaktor wurde bereits zu \\(s = 20\\,\\text{px/m}\\) bestimmt.</p>
<p><strong>a)</strong> Berechnen Sie den gesamten vertikalen Randabstand \\(\\text{offset}_Y\\) (in \\(\\text{px}\\)) vom unteren Canvas-Rand bis zur Bauteilunterkante \\(y_{\\min}=0\\,\\text{m}\\) (inklusive <code>margin</code> und vertikaler Letterboxing-Zentrierung): {1:NUMERICAL:=180:0.5#Exakt! Belegte Höhe = 5 * 20 = 100 px; Freiraum = 400 - 100 = 300 px; offset_Y = 30 + 300/2 = 180 px.~%50%150:0.5#Teilpunkte: 150 px ist nur der halbe Freiraum (400-100)/2 ohne den unteren Rand margin = 30 px.}</p>
<p><strong>b)</strong> Berechnen Sie die vertikale Bildschirmkoordinate \\(Y_{\\text{screen}}\\) (in \\(\\text{px}\\)) für die Laufkatze auf Höhe \\(y = 4{,}0\\,\\text{m}\\) unter Beachtung der WPF-Y-Inversion: {1:NUMERICAL:=200:0.5#Richtig! Y_screen = 460 - (180 + 4.0 * 20) = 460 - 260 = 200 px.~%50%260:0.5#Teilpunkte: 260 px ist der Abstand vom unteren Rand ohne Y-Inversion (460 - 260 = 200 px).}</p>`,
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<ol>
  <li><strong>Belegte Höhe:</strong> \\(H_{\\text{used}} = \\Delta Y \\cdot s = 5\\,\\text{m} \\cdot 20\\,\\text{px/m} = 100\\,\\text{px}\\).</li>
  <li><strong>Vertikaler Offset:</strong> \\(\\text{offset}_Y = \\text{margin} + \\frac{H_{\\text{eff}} - H_{\\text{used}}}{2} = 30 + \\frac{400 - 100}{2} = 180\\,\\text{px}\\).</li>
  <li><strong>Y-Screen mit Inversion:</strong> \\(Y_{\\text{screen}} = H_{\\text{canvas}} - (\\text{offset}_Y + y \\cdot s) = 460 - (180 + 80) = 200\\,\\text{px}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T04_Q2',
        title: 'Welford-Online-Algorithmus: Empirische Stichprobenvarianz aus M2 berechnen',
        shortSummary: 'Empirische Stichprobenvarianz \\(s^2\\)',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Nach \\(k = 9\\) Kraftmessungen an einer Hydraulikpresse enthält das Welford-Statistikobjekt den laufenden Mittelwert \\(\\mu_9 = 45{,}0\\,\\text{kN}\\) sowie die kumulierte Abweichungsquadratsumme \\(M_{2,9} = 72{,}0\\,\\text{kN}^2\\).</p>
<p>Berechnen Sie die erwartungstreue empirische Stichprobenvarianz \\(s^2\\) (in \\(\\text{kN}^2\\)) dieser Messreihe.</p>`,
        answers: [
          { value: 9.0, tolerance: 0.05, fraction: 100, feedback: 'Exakt! Mit Bessel-Korrektur gilt s^2 = M2 / (k - 1) = 72.0 / (9 - 1) = 72.0 / 8 = 9.0 kN^2.' },
          { value: 8.0, tolerance: 0.05, fraction: 50, feedback: 'Teilpunkte: Sie haben durch k = 9 (Populationsvarianz) statt durch k - 1 = 8 (erwartungstreue Stichprobenvarianz) geteilt.' },
          { value: 3.0, tolerance: 0.05, fraction: 50, feedback: 'Teilpunkte: 3.0 kN ist die Standardabweichung s = sqrt(9), gefragt war aber die Varianz s^2 = 9.0 kN^2.' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> Für die erwartungstreue Stichprobenvarianz gilt \\(s^2 = \\frac{M_{2,k}}{k - 1} = \\frac{72{,}0}{9 - 1} = 9{,}0\\,\\text{kN}^2\\).</p>`
      },
      {
        id: 'Q02_T04_Q3',
        title: 'C#-Code-Tracing: Box-Whisker-Plot Interquartilsabstand (IQR) und oberes Whisker-Limit',
        shortSummary: 'C#-Tracing: BoxPlot IQR & Whisker-Grenze',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Für einen Box-Whisker-Plot nach Tukey in ScottPlot 5 werden aus einem sortierten Array von Drehmoment-Messwerten (in \\(\\text{Nm}\\)) das erste Quartil <code>q1</code> und das dritte Quartil <code>q3</code> bestimmt:</p>
<pre><code class="language-csharp">double q1 = 20.0;
double median = 24.0;
double q3 = 30.0;
double iqr = q3 - q1;
double upperWhiskerLimit = q3 + 1.5 * iqr;</code></pre>
<p>Welchen numerischen Wert (in \\(\\text{Nm}\\)) erhält <code>upperWhiskerLimit</code>?</p>`,
        answers: [
          { value: 45.0, tolerance: 0.1, fraction: 100, feedback: 'Richtig! iqr = 30.0 - 20.0 = 10.0 Nm; upperWhiskerLimit = 30.0 + 1.5 * 10.0 = 45.0 Nm.' },
          { value: 39.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: Sie haben 1.5 * iqr auf den Median (24 + 15 = 39) statt auf das obere Quartil q3 = 30 addiert.' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> Der Interquartilsabstand beträgt \\(\\text{IQR} = Q_3 - Q_1 = 30{,}0 - 20{,}0 = 10{,}0\\,\\text{Nm}\\). Die obere Antennengrenze (Tukey-Fence) liegt bei \\(Q_3 + 1{,}5 \\cdot \\text{IQR} = 30{,}0 + 15{,}0 = 45{,}0\\,\\text{Nm}\\).</p>`
      },
      {
        id: 'Q02_T04_Q4',
        title: 'C#-Code-Lückentext: Allokationsfreier Ringpuffer (Circular Buffer) – Einfügen & Überschreiben',
        shortSummary: 'C# Ringpuffer Push-Methode',
        type: 'gapselect',
        grade: 1.0,
        text: `<p>Vervollständigen Sie die Methode <code>Push(double val)</code> eines allokationsfreien Ringpuffers fester Kapazität <code>Capacity</code>, der bei vollem Puffer das älteste Element am Index <code>_head</code> überschreibt:</p>
<pre><code class="language-csharp">public void Push(double val)
{
    int writeIdx = (_head + _count) % [[1]];
    _buffer[writeIdx] = val;
    if (_count < Capacity)
        [[2]]++;
    else
        _head = (_head + 1) % [[3]];
}</code></pre>`,
        choices: [
          { text: 'Capacity', group: 1 },
          { text: '_count', group: 2 },
          { text: 'Capacity', group: 3 },
          { text: '_count', group: 1 },
          { text: '_head', group: 1 },
          { text: '_head', group: 2 },
          { text: 'writeIdx', group: 2 },
          { text: '_count', group: 3 },
          { text: 'writeIdx', group: 3 }
        ],
        generalFeedback: `<p><strong>Erklärung:</strong> Der Schreibindex wickelt sich mittels Modulo <code>Capacity</code> um das Array-Ende. Solange der Puffer noch nicht voll ist, wächst <code>_count</code>; sobald <code>_count == Capacity</code> erreicht ist, wandert der Lesezeiger <code>_head</code> mit Modulo <code>Capacity</code> um eins weiter.</p>`
      },
      {
        id: 'Q02_T04_Q5',
        title: 'Pipeline-Reihenfolge: Numerisch stabiler Einzelschritt im Welford-Online-Algorithmus',
        shortSummary: 'Welford-Pipeline Reihenfolge',
        type: 'ddwtos',
        grade: 1.0,
        text: `<p>Bringen Sie die <strong>vier Rechenschritte des Welford-Online-Algorithmus</strong> beim Eintreffen eines neuen Messwerts \\(x_k\\) in die zwingend erforderliche Ausführungsreihenfolge:</p>
<p><strong>Schritt 1:</strong> [[1]] (Stichprobenumfang erhöhen und Differenz zum bisherigen Mittelwert bilden)<br>
<strong>Schritt 2:</strong> [[2]] (Laufenden Mittelwert anteilig mit dem neuen Stichprobenumfang korrigieren)<br>
<strong>Schritt 3:</strong> [[3]] (Differenz des Messwerts zum bereits aktualisierten neuen Mittelwert bestimmen)<br>
<strong>Schritt 4:</strong> [[4]] (Produkt aus alter und neuer Differenz zur Quadratsumme addieren)</p>`,
        dragboxes: [
          { text: 'k = k + 1 und Delta_1 = x_k - mu_{k-1}', group: 1 },
          { text: 'mu_k = mu_{k-1} + Delta_1 / k', group: 1 },
          { text: 'Delta_2 = x_k - mu_k', group: 1 },
          { text: 'M2_k = M2_{k-1} + Delta_1 * Delta_2', group: 1 },
          { text: 'M2_k = M2_{k-1} + x_k * x_k - mu_k * mu_k', group: 1 },
          { text: 'mu_k = (mu_{k-1} + x_k) / 2.0', group: 1 }
        ],
        generalFeedback: `<p><strong>Welford-Reihenfolge:</strong> Entscheidend ist, dass \\(\\Delta_1\\) vor dem Mittelwert-Update und \\(\\Delta_2\\) <em>nach</em> dem Mittelwert-Update berechnet wird, damit \\(\\Delta_1 \\cdot \\Delta_2\\) exakt die neue Quadratsumme liefert.</p>`
      },
      {
        id: 'Q02_T04_Q6',
        title: 'Koordinatentransformation: Warum anisotrope Skalierung (sx != sy) in CAD-Zeichnungen verboten ist',
        shortSummary: 'Folgen anisotroper Skalierung (sx != sy)',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Was passiert geometrisch mit einer technischen 2D-Konstruktionszeichnung, wenn man beim Anpassen an ein breitformatiges WPF-Canvas die horizontale Skalierung \\(s_x = W_{\\text{eff}} / \\Delta X\\) und die vertikale Skalierung \\(s_y = H_{\\text{eff}} / \\Delta Y\\) getrennt ohne Minimumbildung anwendet (\\(s_x \\neq s_y\\))?</p>`,
        answers: [
          {
            text: 'Kreise entarten zu Ellipsen, rechte Winkel zwischen Stäben und Maßhilfslinien gehen verloren und schräge Stablängen werden richtungsabhängig verzerrt.',
            fraction: 100,
            feedback: 'Richtig! Nur eine uniforme Skalierung (s_x = s_y = min) ist winkeltreu (konform) und erhält das Verhältnis aller Längen unabhängig von der Orientierung.'
          },
          {
            text: 'Die Bauteilgeometrie bleibt vollkommen winkeltreu, aber alle negativen Koordinatenwerte werden automatisch an der X-Achse gespiegelt.',
            fraction: 0,
            feedback: 'Falsch. Solange sx und sy positiv sind, findet durch unterschiedliche Beträge keine Spiegelung, wohl aber eine massive Winkelverzerrung statt.'
          },
          {
            text: 'Das WPF-Layoutsystem wirft zur Laufzeit eine InvalidOperationException, sobald eine Line unterschiedliche X- und Y-Maßstäbe verwendet.',
            fraction: 0,
            feedback: 'Falsch. WPF kennt die Bedeutung Ihrer Modellkoordinaten nicht und zeichnet die verzerrten Pixelkoordinaten ohne Fehlermeldung.'
          },
          {
            text: 'Alle horizontalen Stäbe werden auf die Länge Null verkürzt, während vertikale Stäbe über den oberen Bildschirmrand hinaus verschoben werden.',
            fraction: 0,
            feedback: 'Falsch. Horizontale Stäbe füllen bei sx = Weff/dX exakt die nutzbare Breite aus, werden also nicht auf Null verkürzt.'
          }
        ],
        generalFeedback: `<p><strong>Geometrisches Prinzip:</strong> Technische Zeichnungen erfordern Winkeltreue. Wenn \\(s_x \\neq s_y\\) ist, steht ein im World Space konstruierter Normalenvektor im Screen Space nicht mehr senkrecht auf dem Stab!</p>`
      },
      {
        id: 'Q02_T04_Q7',
        title: 'C#-Bug-Diagnose: Speicherleck durch Canvas.Children.Add ohne Clear im Render-Loop',
        shortSummary: 'Bug-Diagnose: Fehlender Canvas.Children.Clear()',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>In einer dynamischen Kinematik-Simulation wird die Methode <code>DrawMechanism()</code> 60-mal pro Sekunde vom <code>CompositionTarget.Rendering</code>-Event aufgerufen. Nach zwei Minuten wird das Programm extrem träge und belegt mehrere Gigabyte RAM:</p>
<pre><code class="language-csharp">void DrawMechanism() {
    foreach (var bar in _bars) {
        var line = new Line { X1 = bar.X1, Y1 = bar.Y1, X2 = bar.X2, Y2 = bar.Y2, Stroke = _pen };
        SimCanvas.Children.Add(line);
    }
}</code></pre>
<p>Was ist die Ursache für diesen Speicher- und Performance-Einbruch?</p>`,
        answers: [
          {
            text: 'Es fehlt SimCanvas.Children.Clear() vor der Schleife, sodass in jedem Frame neue Line-Objekte über die alten gestapelt werden und der Visual Tree endlos wächst.',
            fraction: 100,
            feedback: 'Exakt! Im Retained Mode von WPF bleiben alle hinzugefügten Kinder dauerhaft im Speicher und werden in jedem Frame mitgerendert, bis man sie entfernt oder wiederverwendet.'
          },
          {
            text: 'Die foreach-Schleife kopiert das gesamte Array _bars bei jedem Durchlauf auf die Festplatte, weshalb zwingend eine rückwärts laufende for-Schleife nötig ist.',
            fraction: 0,
            feedback: 'Falsch. Eine foreach-Schleife über ein Array oder eine Liste erzeugt keinerlei Festplattenzugriffe.'
          },
          {
            text: 'Die Klasse Line besitzt in WPF einen internen Hardware-Timer, der pro Instanz einen eigenen Hintergrund-Thread im Betriebssystem startet.',
            fraction: 0,
            feedback: 'Falsch. Line ist ein UIElement auf dem UI-Thread und startet keine eigenen Threads.'
          },
          {
            text: 'Die Koordinaten X1 bis Y2 müssen nach dem Hinzufügen zum Canvas auf NaN gesetzt werden, damit der Garbage Collector die Linie freigeben kann.',
            fraction: 0,
            feedback: 'Falsch. Solange die Line-Referenz in SimCanvas.Children gehalten wird, darf der Garbage Collector sie ohnehin nicht freigeben.'
          }
        ],
        generalFeedback: `<p><strong>Lösung:</strong> Entweder ruft man zu Beginn von <code>DrawMechanism()</code> <code>SimCanvas.Children.Clear()</code> auf, oder – noch besser – man legt die <code>Line</code>-Instanzen einmalig an und aktualisiert im Renderloop nur deren Koordinaten <code>X1, Y1, X2, Y2</code>.</p>`
      },
      {
        id: 'Q02_T04_Q8',
        title: 'Systemanalyse: ScottPlot 5 DataStreamer-Darstellungsmodi (Wipe vs. Scroll)',
        shortSummary: 'ScottPlot 5 DataStreamer Wipe vs. Scroll',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: `<p>Welche <strong>zwei</strong> Aussagen beschreiben die Funktionsweise des <code>DataStreamer</code> in <strong>ScottPlot 5</strong> bei der Echtzeit-Visualisierung kontinuierlicher Sensorsignale korrekt?</p>`,
        answers: [
          {
            text: 'Im Wipe-Modus (EKG-Ansicht) wandert ein Schreibzeiger von links nach rechts durch das feste Array und überschreibt zyklisch die ältesten Messwerte vor einer kleinen Lücke.',
            fraction: 50,
            feedback: 'Richtig! Wie bei einem medizinischen Patientenmonitor bleibt die Kurve an Ort und Stelle stehen, während der Cursor die ältesten Daten überschreibt.'
          },
          {
            text: 'Da der DataStreamer intern ein vorallokiertes Array fester Länge wiederverwendet, löst das Hinzufügen neuer Messwerte via Add() keine Heap-Allokationen aus.',
            fraction: 50,
            feedback: 'Richtig! Durch die feste Puffergröße arbeitet DataStreamer.Add() in O(1) ohne Garbage-Collector-Belastung.'
          },
          {
            text: 'Der DataStreamer vergrößert sein internes Array bei jedem Aufruf von Add() automatisch auf das Doppelte, um sämtliche historischen Daten seit Programmstart zu sichern.',
            fraction: -50,
            feedback: 'Falsch. Das beschreibt den wachsenden DataLogger, nicht den auf eine feste Fensterbreite begrenzten DataStreamer.'
          },
          {
            text: 'Für jeden neuen Messwert im DataStreamer muss ein vollständiger Zeitstempel vom Typ DateTime übergeben werden, da äquidistante Abtastung nicht unterstützt wird.',
            fraction: -50,
            feedback: 'Falsch. DataStreamer arbeitet gerade mit äquidistanter Abtastung (Period) und nimmt über Add(double value) reine Y-Werte entgegen.'
          }
        ],
        generalFeedback: `<p><strong>Zusammenfassung:</strong> <code>DataStreamer</code> nutzt einen festen Ringpuffer für die letzten \\(N\\) Samples und bietet die Ansichten <code>ViewWipeRight()</code> (stehende Kurve mit Überschreib-Cursor) sowie <code>ViewScrollLeft()</code> (durchlaufendes Band).</p>`
      }
    ]
  },

  // ============================================================================
  // TEST 05 (PRÜFUNG)
  // ============================================================================
  {
    id: 'Test_05_Pruefung',
    title: 'Quiz 02 - Test 05 (Prüfungstest): Stablänge im Screen Space, ScottPlot-Abtastrate & MSAGL',
    category: '$course$/Quiz_02_Termin_05/Test_05_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'Q02_T05_Q1',
        title: 'Affine 2D-Transformation: Uniform Scaling und resultierende Stablänge im Screen Space',
        shortSummary: 'Skalierungsfaktor \\(s\\) & Stablänge \\(L_{\\text{screen}}\\)',
        type: 'cloze',
        grade: 2.0,
        text: `<p>Ein ebenes Kragarm-Fachwerk besitzt eine Gesamtbreite von \\(\\Delta X = 12\\,\\text{m}\\) und eine Gesamthöhe von \\(\\Delta Y = 8\\,\\text{m}\\). Es wird verzerrungsfrei (Uniform Scaling) in ein nutzbares WPF-Canvas-Rechteck von \\(W_{\\text{eff}} = 600\\,\\text{px}\\) Breite und \\(H_{\\text{eff}} = 320\\,\\text{px}\\) Höhe eingepasst. Im Fachwerk befindet sich ein schräger Diagonalstab, der den Knoten \\(A(0\\,\\text{m}, 0\\,\\text{m})\\) mit dem Knoten \\(B(3{,}0\\,\\text{m}, 4{,}0\\,\\text{m})\\) verbindet.</p>
<p><strong>a)</strong> Berechnen Sie den verzerrungsfreien uniformen Skalierungsfaktor \\(s\\) in \\(\\text{px/m}\\): {1:NUMERICAL:=40:0.1#Exakt! s = min(600/12, 320/8) = min(50, 40) = 40 px/m.~%50%50:0.1#Teilpunkte: Sie haben sx = 600/12 = 50 px/m statt min(50, 40) = 40 px/m gewählt.}</p>
<p><strong>b)</strong> Berechnen Sie die euklidische Länge \\(L_{\\text{screen}}\\) (in \\(\\text{px}\\)) dieses Diagonalstabs \\(\\overline{AB}\\) auf dem Bildschirm nach der Transformation: {1:NUMERICAL:=200:0.5#Richtig! Physikalische Länge L = sqrt(3^2 + 4^2) = 5.0 m; L_screen = 5.0 m * 40 px/m = 200 px.~%50%250:0.5#Teilpunkte: Folgefehler aus Teil a (5.0 m * 50 px/m = 250 px) oder Manhattan-Distanz (3+4)*40 = 280 px.}</p>`,
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<ol>
  <li><strong>Uniform Scaling:</strong> \\(s_x = \\frac{600}{12} = 50\\,\\text{px/m}\\), \\(s_y = \\frac{320}{8} = 40\\,\\text{px/m} \\implies s = \\min(50, 40) = 40\\,\\text{px/m}\\).</li>
  <li><strong>Stablänge im World Space:</strong> \\(L_{\\text{world}} = \\sqrt{(3{,}0 - 0)^2 + (4{,}0 - 0)^2} = \\sqrt{9 + 16} = 5{,}0\\,\\text{m}\\).</li>
  <li><strong>Stablänge im Screen Space:</strong> Da die Skalierung uniform ist, gilt \\(L_{\\text{screen}} = s \\cdot L_{\\text{world}} = 40\\,\\text{px/m} \\cdot 5{,}0\\,\\text{m} = 200\\,\\text{px}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T05_Q2',
        title: 'ScottPlot 5 Signal-Konfiguration: Zeitdauer eines Ringpuffer-Fensters berechnen',
        shortSummary: 'Zeitfenster-Dauer im DataStreamer',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Ein Schwingungssensor an einem Getriebeprüfstand tastet die Beschleunigung mit einer festen Abtastfrequenz von \\(f_s = 250\\,\\text{Hz}\\) (d. h. Abtastperiode \\(\\Delta t = 0{,}004\\,\\text{s}\\)) ab. In ScottPlot 5 wird ein <code>DataStreamer</code> mit einer festen Pufferkapazität von \\(N = 1500\\) Datenpunkten initialisiert.</p>
<p>Welche physikalische Zeitspanne \\(T_{\\text{window}}\\) (in <strong>Sekunden</strong>) ist im Diagrammfenster gleichzeitig sichtbar, sobald der Puffer vollständig gefüllt ist?</p>`,
        answers: [
          { value: 6.0, tolerance: 0.05, fraction: 100, feedback: 'Exakt! T_window = N / f_s = 1500 / 250 Hz = 6.0 s (bzw. 1500 * 0.004 s = 6.0 s).' },
          { value: 6000, tolerance: 10, fraction: 50, feedback: 'Teilpunkte: 6000 ms ist die Dauer in Millisekunden, gefragt war der Wert in Sekunden (6.0 s).' },
          { value: 0.1667, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte: Kehrwertfehler! Sie haben f_s / N = 250 / 1500 = 0.1667 statt N / f_s = 6.0 s gerechnet.' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> Bei \\(N = 1500\\) Abtastpunkten und \\(\\Delta t = \\frac{1}{f_s} = \\frac{1}{250\\,\\text{Hz}} = 0{,}004\\,\\text{s}\\) umfasst das sichtbare Zeitfenster \\(T_{\\text{window}} = N \\cdot \\Delta t = \\frac{1500}{250} = 6{,}0\\,\\text{s}\\).</p>`
      },
      {
        id: 'Q02_T05_Q3',
        title: 'C#-Code-Tracing: Einheitsrichtungsvektor und Maßlinien-Versatz (DIN 406)',
        shortSummary: 'C#-Tracing: Maßlinien-Normalenversatz',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Für einen horizontal im Screen Space verlaufenden Stab von <code>p1 = (100, 250)</code> nach <code>p2 = (300, 250)</code> berechnet folgender C#-Code den Y-Wert <code>dimY1</code> des verschobenen Maßlinien-Startpunkts (Abstand <code>dimOffset = 25.0</code> Pixel):</p>
<pre><code class="language-csharp">double dx = 300.0 - 100.0;
double dy = 250.0 - 250.0;
double len = Math.Sqrt(dx * dx + dy * dy);
double ux = dx / len, uy = dy / len;
double nx = -uy, ny = ux;
double dimY1 = 250.0 - ny * 25.0;</code></pre>
<p>Welchen numerischen Wert (in \\(\\text{px}\\)) erhält <code>dimY1</code>?</p>`,
        answers: [
          { value: 225.0, tolerance: 0.1, fraction: 100, feedback: 'Richtig! dx = 200, dy = 0 => ux = 1.0, uy = 0.0 => ny = ux = 1.0 => dimY1 = 250.0 - 1.0 * 25.0 = 225.0 px.' },
          { value: 275.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: Vorzeichenfehler bei der Subtraktion (250 + 25 = 275 statt 250 - 25 = 225).' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> Da \\(dx = 200\\) und \\(dy = 0\\), ist \\(u_x = 1{,}0\\) und \\(u_y = 0{,}0\\). Damit wird \\(n_y = u_x = 1{,}0\\), und \\(\\text{dimY1} = 250{,}0 - 1{,}0 \\cdot 25{,}0 = 225{,}0\\,\\text{px}\\) (die Maßlinie liegt 25 Pixel oberhalb des Stabs).</p>`
      },
      {
        id: 'Q02_T05_Q4',
        title: 'C#-Code-Lückentext: MSAGL-Graphen erstellen und Sugiyama-Layout berechnen',
        shortSummary: 'C# MSAGL Layout berechnen',
        type: 'gapselect',
        grade: 1.0,
        text: `<p>Vervollständigen Sie den C#-Code, um in <strong>MSAGL</strong> einen gerichteten Graphen mit einer Kante von Knoten <code>"Pumpe"</code> nach <code>"Ventil"</code> anzulegen und das hierarchische Sugiyama-Layout zu berechnen:</p>
<pre><code class="language-csharp">var graph = new GeometryGraph();
// ... Knoten "Pumpe" und "Ventil" wurden angelegt ...
graph.Edges.Add(new Edge(nodePumpe, [[1]]));
var settings = new [[2]]();
LayoutHelpers.CalculateLayout(graph, [[3]], null);</code></pre>`,
        choices: [
          { text: 'nodeVentil', group: 1 },
          { text: 'SugiyamaLayoutSettings', group: 2 },
          { text: 'settings', group: 3 },
          { text: 'graph', group: 1 },
          { text: '"Pumpe"', group: 1 },
          { text: 'WriteableBitmap', group: 2 },
          { text: 'WelfordStatistics', group: 2 },
          { text: 'nodePumpe', group: 3 },
          { text: 'new Canvas()', group: 3 }
        ],
        generalFeedback: `<p><strong>Erklärung:</strong> Eine gerichtete Kante <code>new Edge(source, target)</code> verbindet <code>nodePumpe</code> mit <code>nodeVentil</code>. Für das Schichtenlayout instanziiert man <code>SugiyamaLayoutSettings</code> und übergibt <code>settings</code> an <code>LayoutHelpers.CalculateLayout</code>.</p>`
      },
      {
        id: 'Q02_T05_Q5',
        title: 'Konzept-Zuordnung: Aufgaben der 2D-Transformations- und Bemaßungsparameter (Kap. 03)',
        shortSummary: 'Transformations- & DIN-406-Größen zuordnen',
        type: 'matching',
        grade: 1.0,
        text: `<p>Ordnen Sie den vier mathematischen Ausdrücken aus Kapitel 03 jeweils ihre exakte geometrische Bedeutung in der 2D-Visualisierungspipeline zu (beachten Sie die zwei Überhang-Distraktoren).</p>`,
        subquestions: [
          { text: 's = Math.Min(effectiveWidth / worldWidth, effectiveHeight / worldHeight)', answer: 'Uniformer Skalierungsfaktor in px/m zur winkeltreuen Darstellung ohne Verzerrung' },
          { text: 'yScreen = canvasHeight - (offsetY + (yWorld - yMin) * s)', answer: 'Transformation der vertikalen Weltkoordinate inklusive Invertierung der WPF-Y-Achse' },
          { text: 'nx = -uy; ny = ux; (mit Einheitsrichtungsvektor ux, uy)', answer: 'Um 90 Grad gedrehter Einheitsnormalenvektor für Maßlinien-Abstand und Pfeilflügelbreite' },
          { text: 'distSq = (mouseX - nodeScreenX)^2 + (mouseY - nodeScreenY)^2 <= R^2', answer: 'Wurzelfreier euklidischer Fangbereichstest (Hit-Testing) im Screen Space' },
          { text: '', answer: 'Perspektivische Tiefendivision (x / z) für 3D-Kameraprojektionen' },
          { text: '', answer: 'Gleitender exponentieller Tiefpassfilter für verrauschte Sensordaten' }
        ],
        generalFeedback: `<p><strong>Lösung:</strong> Alle vier Grundformeln bilden das Fundament eines interaktiven 2D-CAD/FEM-Viewers: Uniform Scaling, Y-Inversion, 2D-Normalenvektor und wurzelfreies Hit-Testing.</p>`
      },
      {
        id: 'Q02_T05_Q6',
        title: 'ScottPlot 5 Downsampling: Warum Min/Max-Spalten-Aggregation Spitzenwerte schützt',
        shortSummary: 'Min/Max-Downsampling vs. N-tes Sample',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Bei der Darstellung von \\(100.000\\) Druckmesswerten auf einem \\(1000\\,\\text{px}\\) breiten Monitor entfallen \\(100\\) Messwerte auf jede einzelne Pixelspalte. Warum bestimmt ein hochwertiger <code>Signal</code>-Plot pro Pixelspalte das <strong>Minimum und Maximum</strong> der \\(100\\) Werte, anstatt einfach nur jeden \\(100\\)-sten Messwert (<code>data[i * 100]</code>) zu zeichnen?</p>`,
        answers: [
          {
            text: 'Weil kurzes, gefährliches Druckspitzen-Überschwingen zwischen den Hunderterschritten beim naiven Auslassen unsichtbar verschluckt würde (Aliasing).',
            fraction: 100,
            feedback: 'Richtig! Durch die vertikale Verbindungslinie vom Spalten-Minimum zum Spalten-Maximum bleibt jeder einzelne Peak (z. B. Druckstoß bei Index 147) garantiert auf dem Bildschirm sichtbar.'
          },
          {
            text: 'Weil der Modulo-Operator i * 100 in C# nur für vorzeichenlose Byte-Arrays zulässig ist und bei double-Arrays eine Ausnahme auslöst.',
            fraction: 0,
            feedback: 'Falsch. Array-Indizierung mit i * 100 ist für jeden Array-Typ in C# problemlos möglich, aber fachlich wegen des Informationsverlusts gefährlich.'
          },
          {
            text: 'Weil das Zeichnen von jedem hundertsten Punkt die Anzahl der Bildschirm-Pixel vergrößert und das Monitorfenster über den Desktop-Rand schiebt.',
            fraction: 0,
            feedback: 'Falsch. Die Fenstergröße des Monitors wird durch die Downsampling-Strategie selbstverständlich nicht verändert.'
          },
          {
            text: 'Weil die Berechnung von Minimum und Maximum die Anzahl der Messwerte im Hauptspeicher dauerhaft auf zwei Zahlen komprimiert und das Array löscht.',
            fraction: 0,
            feedback: 'Falsch. Das Original-Array bleibt im RAM vollständig erhalten, sodass man jederzeit verlustfrei in die Einzelwerte hineinzoomen kann.'
          }
        ],
        generalFeedback: `<p><strong>Wichtig für Prüfstände:</strong> In der Automatisierungstechnik sind kurze Transienten (Spannungsspitzen, Druckschläge) oft das kritischste Diagnosemerkmal. Min/Max-Einhüllenden-Rendering garantiert, dass kein Peak visuell verloren geht.</p>`
      },
      {
        id: 'Q02_T05_Q7',
        title: 'C#-Bug-Diagnose: Falsche Winkelberechnung für schräge Maßtexte durch Math.Atan(dy / dx)',
        shortSummary: 'Bug-Diagnose: Math.Atan vs. Math.Atan2',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Ein Programmierer berechnet den Neigungswinkel eines Fachwerkstabs von \\(P_1\\) nach \\(P_2\\) mit <code>double angle = Math.Atan((y2 - y1) / (x2 - x1));</code> statt mit <code>Math.Atan2(y2 - y1, x2 - x1)</code>. Welcher Fehler tritt dadurch in der Zeichnung auf?</p>`,
        answers: [
          {
            text: 'Math.Atan kann den zweiten und dritten Quadranten nicht vom ersten und vierten unterscheiden und liefert bei vertikalen Stäben (x2 == x1) Division durch Null.',
            fraction: 100,
            feedback: 'Exakt! Durch die Division dy/dx kürzen sich zwei Minuszeichen weg ((-dy)/(-dx) == dy/dx), sodass Atan nur (-pi/2, +pi/2) kennt; Math.Atan2 wertet beide Vorzeichen separat auf (-pi, +pi] aus.'
          },
          {
            text: 'Math.Atan gibt den Winkel in Neugrad (Gon) zurück, während WPF RotateTransform ausschließlich Winkel im Bogenmaß (Radiant) akzeptiert.',
            fraction: 0,
            feedback: 'Falsch. Sowohl Math.Atan als auch Math.Atan2 liefern Radiant, und WPF RotateTransform.Angle erwartet Grad (weshalb man mit 180.0 / Math.PI umrechnet).'
          },
          {
            text: 'Math.Atan rundet das Ergebnis intern auf ganzzahlige Vielfache von 45 Grad, sodass beliebig geneigte Diagonalstäbe nicht dargestellt werden können.',
            fraction: 0,
            feedback: 'Falsch. Math.Atan rechnet mit voller double-Gleitkommapräzision und rundet nicht auf 45°-Schritte.'
          },
          {
            text: 'Der Aufruf von Math.Atan sperrt den UI-Thread für 100 Millisekunden, weil die Funktion intern auf einen externen Mathematik-Webservice wartet.',
            fraction: 0,
            feedback: 'Falsch. Math.Atan ist eine schnelle CPU-Instruktion im Nanosekundenbereich ohne Netzwerkzugriff.'
          }
        ],
        generalFeedback: `<p><strong>Merksatz für 2D-Geometrie:</strong> Verwenden Sie für Richtungs- und Orientierungswinkel im 2D-Raum <strong>immer</strong> <code>Math.Atan2(dy, dx)</code> (in genau dieser Argumentreihenfolge: zuerst \\(\\Delta y\\), dann \\(\\Delta x\\)!).</p>`
      },
      {
        id: 'Q02_T05_Q8',
        title: 'Systemanalyse: Hit-Testing und interaktive Objektauswahl im 2D-Canvas',
        shortSummary: 'Hit-Testing & Fangradius-Design',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: `<p>Welche <strong>zwei</strong> Entwurfsregeln gelten für ein ergonomisches und performantes <strong>Hit-Testing</strong> (Auswählen von Knoten per Mausklick) in einem 2D-Simulations-Viewer?</p>`,
        answers: [
          {
            text: 'Der Fangradius (z. B. 10 Pixel) wird im Screen Space festgelegt, damit ein Knoten unabhängig vom aktuellen Zoomfaktor immer gleich leicht anklickbar bleibt.',
            fraction: 50,
            feedback: 'Richtig! Würde man den Fangradius in Metern im World Space festlegen, müsste man beim Herauszoomen millimetergenau zielen.'
          },
          {
            text: 'Bei der Suche nach dem nächstgelegenen Knoten vergleicht man die quadratischen Abstände dx*dx + dy*dy mit R*R, um unnötige Wurzelberechnungen zu sparen.',
            fraction: 50,
            feedback: 'Richtig! Da die Quadratwurzel auf positiven Zahlen streng monoton wachsend ist, liefert der Vergleich der Abstandsquadrate exakt dasselbe Ergebnis ohne Math.Sqrt.'
          },
          {
            text: 'Ein Knoten gilt nur dann als getroffen, wenn die Gleitkomma-Koordinaten der Maus bis auf die fünfzehnte Nachkommastelle exakt mit dem Knoten übereinstimmen.',
            fraction: -50,
            feedback: 'Falsch. Ein exakter Gleichheitstest (==) auf double-Koordinaten wäre mit der Maus praktisch unmöglich zu treffen; man benötigt zwingend einen Toleranz-/Fangradius.'
          },
          {
            text: 'Für jedes Hit-Testing muss das gesamte Canvas zunächst als JPEG-Datei auf die Festplatte gespeichert und anschließend die Pixelfarbe an der Mausposition gelesen werden.',
            fraction: -50,
            feedback: 'Falsch. Ein Festplatten-Export bei Mausbewegung würde die Anwendung komplett lahmlegen; man rechnet direkt mit den Knoten-Koordinaten im Speicher.'
          }
        ],
        generalFeedback: `<p><strong>Zusammenfassung:</strong> Gutes CAD-Hit-Testing arbeitet mit einem Screen-Space-Toleranzradius (z. B. \\(R = 8\\text{–}12\\,\\text{px}\\)) und vergleicht effizient \\(\\Delta x^2 + \\Delta y^2 \\le R^2\\).</p>`
      }
    ]
  },

  // ============================================================================
  // TEST 06 (PRÜFUNG)
  // ============================================================================
  {
    id: 'Test_06_Pruefung',
    title: 'Quiz 02 - Test 06 (Prüfungstest): DIN-406-Maßhilfslinien, 3-Sigma-Spannweite & Ringpuffer-Wrap',
    category: '$course$/Quiz_02_Termin_05/Test_06_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'Q02_T06_Q1',
        title: 'DIN-406-Bemaßungsgeometrie: Gesamtlänge der Maßhilfslinie und Endpunkt-Koordinate',
        shortSummary: 'DIN-406-Maßhilfslinie & Endpunkt \\(Y_{\\text{ext}}\\)',
        type: 'cloze',
        grade: 2.0,
        text: `<p>Ein horizontaler Träger verläuft auf dem WPF-Canvas exakt entlang der Bildschirm-Horizontalen bei \\(Y_{\\text{stab}} = 300\\,\\text{px}\\) (von \\(X_1 = 100\\,\\text{px}\\) bis \\(X_2 = 500\\,\\text{px}\\)). Nach DIN 406 soll oberhalb des Trägers (also in Richtung kleinerer WPF-Y-Werte, Normalenvektor \\(n_x = 0, n_y = -1\\)) eine Maßlinie im Abstand \\(d_{\\text{dim}} = 28\\,\\text{px}\\) gezeichnet werden. Die beiden vertikalen Maßhilfslinien beginnen mit einem kleinen Spalt von \\(g = 4\\,\\text{px}\\) vom Träger entfernt und ragen um den normgerechten Überstand \\(e = 8\\,\\text{px}\\) über die Maßlinie hinaus.</p>
<p><strong>a)</strong> Berechnen Sie die gezeichnete sichtbare Strichlänge \\(L_{\\text{ext}}\\) (in \\(\\text{px}\\)) einer solchen Maßhilfslinie (vom Spaltende bis zum Ende des Überstands): {1:NUMERICAL:=32:0.1#Exakt! Die Maßhilfslinie reicht von Abstand g = 4 px bis (d_dim + e) = 28 + 8 = 36 px; ihre Länge ist 36 - 4 = 32 px.~%50%36:0.1#Teilpunkte: 36 px ist der Gesamtabstand vom Bauteil (28 + 8) ohne Abzug des 4-px-Spalts g am Bauteilrand.}</p>
<p><strong>b)</strong> Berechnen Sie die vertikale Bildschirmkoordinate \\(Y_{\\text{end}}\\) (in \\(\\text{px}\\)) des äußeren oberen Endpunkts der Maßhilfslinie (inklusive Überstand \\(e\\)): {1:NUMERICAL:=264:0.5#Richtig! Y_end = Y_stab - (d_dim + e) = 300 - (28 + 8) = 300 - 36 = 264 px.~%50%272:0.5#Teilpunkte: 272 px (300 - 28) ist die Koordinate der Maßlinie selbst ohne den 8-px-Überstand e der Maßhilfslinie!}</p>`,
        generalFeedback: `<p><strong>Musterherleitung (DIN-406-Maßhilfslinie):</strong></p>
<ol>
  <li><strong>Start- und Endabstand vom Stab:</strong> Die Maßhilfslinie startet bei \\(d_{\\text{start}} = g = 4\\,\\text{px}\\) und endet bei \\(d_{\\text{end}} = d_{\\text{dim}} + e = 28 + 8 = 36\\,\\text{px}\\).</li>
  <li><strong>Gezeichnete Strichlänge:</strong> \\(L_{\\text{ext}} = d_{\\text{end}} - d_{\\text{start}} = 36 - 4 = 32\\,\\text{px}\\).</li>
  <li><strong>Oberer Endpunkt im Screen Space:</strong> Da „oben“ im WPF-Canvas kleineren Y-Werten entspricht, gilt \\(Y_{\\text{end}} = Y_{\\text{stab}} - d_{\\text{end}} = 300 - 36 = 264\\,\\text{px}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T06_Q2',
        title: 'Statistische Prozesskontrolle: Breite des gesamten ±3-Sigma-Toleranzbands',
        shortSummary: 'Volle Bandbreite \\(6\\sigma\\) des Toleranzbands',
        type: 'numerical',
        grade: 1.5,
        text: `<p>In einem ScottPlot-5-Echtzeitdiagramm wird das symmetrische \\(\\mu \\pm 3s\\)-Prozessband (von der unteren Eingriffsgrenze \\(\\text{LCL} = \\mu - 3s\\) bis zur oberen Eingriffsgrenze \\(\\text{UCL} = \\mu + 3s\\)) als farbig hinterlegtes HorizontalSpan eingezeichnet. Aus dem Welford-Tracker liegen nach \\(k = 17\\) Messungen der Mittelwert \\(\\mu = 80{,}0\\,\\text{mm}\\) und die Quadratsumme \\(M_2 = 36{,}0\\,\\text{mm}^2\\) vor.</p>
<p>Berechnen Sie die gesamte vertikale Breite \\(\\Delta B = \\text{UCL} - \\text{LCL}\\) (in \\(\\text{mm}\\)) dieses \\(\\pm 3s\\)-Toleranzbands.</p>`,
        answers: [
          { value: 9.0, tolerance: 0.05, fraction: 100, feedback: 'Exakt! s^2 = M2 / (17 - 1) = 36 / 16 = 2.25 mm^2 => s = 1.5 mm. Bandbreite von -3s bis +3s ist 6 * s = 6 * 1.5 = 9.0 mm.' },
          { value: 4.5, tolerance: 0.05, fraction: 50, feedback: 'Teilpunkte: 4.5 mm ist nur die halbe Bandbreite (3 * s = 3 * 1.5), gefragt war die volle Spanne UCL - LCL = 6 * s = 9.0 mm.' },
          { value: 13.5, tolerance: 0.05, fraction: 50, feedback: 'Teilpunkte: Sie haben 6 * s^2 = 6 * 2.25 = 13.5 gerechnet (Quadratwurzel für s vergessen!).' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<ol>
  <li><strong>Stichprobenvarianz & Standardabweichung:</strong> \\(s^2 = \\frac{M_2}{k - 1} = \\frac{36{,}0}{16} = 2{,}25\\,\\text{mm}^2 \\implies s = \\sqrt{2{,}25} = 1{,}5\\,\\text{mm}\\).</li>
  <li><strong>Gesamtbreite des \\(\\pm 3s\\)-Bands:</strong> \\(\\Delta B = (\\mu + 3s) - (\\mu - 3s) = 6s = 6 \\cdot 1{,}5\\,\\text{mm} = 9{,}0\\,\\text{mm}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T06_Q3',
        title: 'C#-Code-Tracing: Ringpuffer-Zustand nach Überlauf (Wrap-Around)',
        shortSummary: 'C#-Tracing: Ringpuffer nach Wrap-Around',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Ein kleiner Ringpuffer der Kapazität <code>cap = 4</code> wird nacheinander mit 6 Werten (<code>10, 20, 30, 40, 50, 60</code>) befüllt:</p>
<pre><code class="language-csharp">double[] buf = new double[4];
for (int step = 0; step < 6; step++) {
    buf[step % 4] = (step + 1) * 10.0;
}
double result = buf[0] + buf[2];</code></pre>
<p>Welchen numerischen Wert besitzt <code>result</code> nach Abschluss der Schleife?</p>`,
        answers: [
          { value: 80.0, tolerance: 0.1, fraction: 100, feedback: 'Richtig! Nach 6 Schritten gilt: buf[0]=50 (step=4), buf[1]=60 (step=5), buf[2]=30 (step=2), buf[3]=40 (step=3). Also buf[0] + buf[2] = 50 + 30 = 80.' },
          { value: 40.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: 10 + 30 = 40 wäre der Wert vor dem Überschreiben von buf[0] im 5. Schleifendurchlauf (step=4).' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<ul>
  <li><code>step = 0..3</code> schreibt <code>[10, 20, 30, 40]</code> an die Indizes <code>0..3</code>.</li>
  <li><code>step = 4</code> (<code>4 % 4 == 0</code>) überschreibt <code>buf[0] = 50</code>.</li>
  <li><code>step = 5</code> (<code>5 % 4 == 1</code>) überschreibt <code>buf[1] = 60</code>.</li>
</ul>
<p>Damit lautet das Array <code>[50, 60, 30, 40]</code>, und <code>buf[0] + buf[2] = 50 + 30 = 80</code>.</p>`
      },
      {
        id: 'Q02_T06_Q4',
        title: 'C#-Code-Lückentext: ScottPlot 5 DataStreamer im Wipe-Modus konfigurieren',
        shortSummary: 'C# ScottPlot 5 DataStreamer Setup',
        type: 'gapselect',
        grade: 1.0,
        text: `<p>Vervollständigen Sie den C#-Code zur Initialisierung eines <strong>ScottPlot 5</strong> <code>DataStreamer</code> für 2000 Messpunkte mit einer Abtastperiode von <code>0.01</code> Sekunden im Oszilloskop-Wipe-Modus:</p>
<pre><code class="language-csharp">var streamer = MainPlot.Plot.Add.[[1]](2000);
streamer.[[2]] = 0.01;
streamer.[[3]]();</code></pre>`,
        choices: [
          { text: 'DataStreamer', group: 1 },
          { text: 'Period', group: 2 },
          { text: 'ViewWipeRight', group: 3 },
          { text: 'Pie', group: 1 },
          { text: 'Boxes', group: 1 },
          { text: 'Capacity', group: 2 },
          { text: 'Color', group: 2 },
          { text: 'ClearAll', group: 3 },
          { text: 'Dispose', group: 3 }
        ],
        generalFeedback: `<p><strong>Erklärung:</strong> Mit <code>Plot.Add.DataStreamer(2000)</code> wird der Ringpuffer-Plottable erzeugt, über die Eigenschaft <code>Period = 0.01</code> der horizontale Punktabstand in Sekunden gesetzt und mit <code>ViewWipeRight()</code> die überschreibende Oszilloskop-Ansicht aktiviert.</p>`
      },
      {
        id: 'Q02_T06_Q5',
        title: 'Pipeline-Reihenfolge: 2D-Transformationskette vom Bauteilmodell zum WPF-Canvas',
        shortSummary: '4 Schritte der WorldToScreen-Pipeline',
        type: 'ddwtos',
        grade: 1.0,
        text: `<p>Bringen Sie die <strong>vier Berechnungsphasen der 2D-Visualisierungspipeline (WorldToScreen)</strong> beim Zeichnen eines Bauteils auf ein WPF-Canvas in die logisch korrekte Reihenfolge:</p>
<p><strong>Schritt 1:</strong> [[1]] (Extremwerte \\(x_{\\min}, x_{\\max}, y_{\\min}, y_{\\max}\\) aller Knoten im Weltkoordinatensystem ermitteln)<br>
<strong>Schritt 2:</strong> [[2]] (Verzerrungsfreien Maßstab \\(s = \\min(s_x, s_y)\\) und zentrierte Letterboxing-Offsets bestimmen)<br>
<strong>Schritt 3:</strong> [[3]] (Weltkoordinaten skalieren, verschieben und die vertikale Achse an \\(H_{\\text{canvas}}\\) invertieren)<br>
<strong>Schritt 4:</strong> [[4]] (Linien, Pfeilspitzen konstanter Pixellänge und gedrehte Maßtexte im Screen Space rendern)</p>`,
        dragboxes: [
          { text: 'Bounding-Box-Analyse im World Space', group: 1 },
          { text: 'Uniform-Scaling- & Letterboxing-Berechnung', group: 1 },
          { text: 'Affine Koordinatentransformation & Y-Inversion', group: 1 },
          { text: 'Screen-Space-Annotation & WPF-Rendering', group: 1 },
          { text: 'Cholesky-Matrixinversion der Pixelwerte', group: 1 },
          { text: '3D-Z-Buffer-Tiefensortierung der Dreiecke', group: 1 }
        ],
        generalFeedback: `<p><strong>Pipeline:</strong> 1. Bounding-Box im World Space $\\to$ 2. Maßstab & Letterboxing $\\to$ 3. WorldToScreen inkl. Y-Inversion $\\to$ 4. Zeichnen inkl. Screen-Space-Pfeilspitzen/Bemaßung.</p>`
      },
      {
        id: 'Q02_T06_Q6',
        title: 'Visualisierungs-Didaktik: Wann Box-Whisker-Plots einem Liniendiagramm überlegen sind',
        shortSummary: 'Einsatzgebiet von Box-Whisker-Plots',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>In welchem ingenieurwissenschaftlichen Analyseszenario ist ein <strong>Box-Whisker-Plot</strong> (<code>Add.Boxes()</code>) einem klassischen Zeitreihen-Liniendiagramm (<code>Add.Signal()</code>) methodisch klar überlegen?</p>`,
        answers: [
          {
            text: 'Wenn man die robuste Lage (Median), Streuung (IQR), Schiefe und Ausreißer der Taktzeiten von fünf verschiedenen Fertigungszellen direkt miteinander vergleichen will.',
            fraction: 100,
            feedback: 'Richtig! Box-Plots komprimieren ganze Stichprobenverteilungen auf 5 robuste Kennwerte und machen Gruppenvergleiche sowie Asymmetrien auf einen Blick sichtbar.'
          },
          {
            text: 'Wenn man die exakte Phasenverschiebung und Frequenz einer hochfrequenten harmonischen Sinusschwingung im Millisekundenbereich ablesen möchte.',
            fraction: 0,
            feedback: 'Falsch. Ein Box-Plot aggregiert über die Zeit; Frequenz- und Phaseninformationen gehen dabei vollständig verloren.'
          },
          {
            text: 'Wenn für jeden einzelnen Messpunkt nur ein einziger Skalarwert vorliegt und überhaupt keine wiederholten Messungen oder Stichprobengruppen existieren.',
            fraction: 0,
            feedback: 'Falsch. Für einen einzelnen Skalarwert pro Kategorie sind Quartile (Q1, Median, Q3) sinnlos; hier nutzt man ein Balkendiagramm.'
          },
          {
            text: 'Wenn die gerichtete Topologie und Hierarchieebenen eines komplexen Rohrleitungsnetzwerks mit möglichst wenigen Kantenkreuzungen dargestellt werden sollen.',
            fraction: 0,
            feedback: 'Falsch. Für Netzwerktopologien nutzt man MSAGL-Graphenlayouts, keine Box-Whisker-Plots.'
          }
        ],
        generalFeedback: `<p><strong>Merksatz:</strong> Zeitreihen-Plots zeigen den <em>zeitlichen Verlauf</em>, während Box-Whisker-Plots die <em>statistische Verteilung</em> (Median, 50-%-Kernbereich IQR, Whisker-Grenzen und Ausreißer) mehrerer Gruppen vergleichen.</p>`
      },
      {
        id: 'Q02_T06_Q7',
        title: 'C#-Bug-Diagnose: Auf dem Kopf stehende Maßzahlen bei Stäben von rechts nach links',
        shortSummary: 'Bug-Diagnose: Kopfüber-Maßtext (DIN 406)',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Ein Studierender richtet den Bemaßungstext eines Fachwerkstabs mit dem Winkel <code>double angleDeg = Math.Atan2(dyScreen, dxScreen) * 180.0 / Math.PI;</code> aus. Bei Stäben, die von links nach rechts verlaufen (\\(x_2 > x_1\\)), ist die Maßzahl perfekt lesbar. Bei Stäben, die von rechts nach links definiert wurden (\\(x_2 < x_1\\)), steht die Zahl jedoch <strong>auf dem Kopf</strong>. Welche Korrektur behebt diesen DIN-406-Verstoß?</p>`,
        answers: [
          {
            text: 'Wenn der Winkel größer als +90 Grad oder kleiner als -90 Grad ist, muss man 180 Grad addieren bzw. subtrahieren, um die Textorientierung umzudrehen.',
            fraction: 100,
            feedback: 'Exakt! Nach DIN 406 müssen Maßzahlen immer von unten oder von rechts lesbar sein; Winkel in der linken Halbebene (|angle| > 90°) werden daher um 180° gedreht.'
          },
          {
            text: 'Man muss den berechneten Winkel vor der Übergabe an RotateTransform immer mit Math.Abs() in einen positiven Betrag umwandeln.',
            fraction: 0,
            feedback: 'Falsch. Math.Abs(-150°) liefert +150° (weiterhin kopfüber!) und zerstört zudem die korrekte Neigungsrichtung bei Stäben mit -30°.'
          },
          {
            text: 'Man muss die Schriftgröße FontSize des TextBlocks negativ setzen, damit WPF die Buchstaben automatisch an der Grundlinie spiegelt.',
            fraction: 0,
            feedback: 'Falsch. Eine negative FontSize ist in WPF unzulässig und wirft sofort eine ArgumentException.'
          },
          {
            text: 'Man darf in Math.Atan2 niemals Bildschirmkoordinaten übergeben, sondern muss die Textdrehung zwingend vor der Skalierung im 1D-Array berechnen.',
            fraction: 0,
            feedback: 'Falsch. Auch im World Space hat ein Vektor von rechts nach links einen Winkel von 180°; die Lesbarkeitskorrektur um 180° ist in jedem Fall nötig.'
          }
        ],
        generalFeedback: `<p><strong>Standard-Code für DIN-406-Textrotation:</strong><br>
<code>if (angleDeg &gt; 90.0) angleDeg -= 180.0; else if (angleDeg &lt; -90.0) angleDeg += 180.0;</code></p>`
      },
      {
        id: 'Q02_T06_Q8',
        title: 'Systemanalyse: Numerische Eigenschaften des Welford-Online-Algorithmus',
        shortSummary: 'Vorteile des Welford-Algorithmus',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: `<p>Welche <strong>zwei</strong> Eigenschaften machen den <strong>Welford-Online-Algorithmus</strong> zum Industriestandard für die laufende Varianzberechnung in Echtzeit-Simulations- und Messsystemen?</p>`,
        answers: [
          {
            text: 'Er benötigt nur konstanten Speicherplatz O(1) für Count, Mean und M2, ohne die gesamte Historie vergangener Messwerte im RAM vorhalten zu müssen.',
            fraction: 50,
            feedback: 'Richtig! Als Streaming-/Online-Algorithmus verarbeitet Welford jeden neuen Messwert in O(1) Zeit und O(1) Speicher.'
          },
          {
            text: 'Durch die Multiplikation der zentrierten Differenzen zum alten und neuen Mittelwert ist er numerisch immun gegen katastrophale Auslöschung bei großen Offsets.',
            fraction: 50,
            feedback: 'Richtig! Da vor dem Quadrieren bereits der Mittelwert subtrahiert wird, bleiben die Differenzen klein und präzise darstellbar.'
          },
          {
            text: 'Er sortiert nach jedem neuen Messwert das gesamte bisherige Datenarray neu, um gleichzeitig den exakten Median in O(n log n) zu aktualisieren.',
            fraction: -50,
            feedback: 'Falsch. Welford speichert gar kein Array und berechnet weder Sortierungen noch Mediane.'
          },
          {
            text: 'Er kommt komplett ohne Gleitkommadivisionen aus, weil der laufende Mittelwert ausschließlich durch Bit-Shifting von Ganzzahlen angenähert wird.',
            fraction: -50,
            feedback: 'Falsch. Der Schritt Mean += delta1 / Count enthält eine reguläre Gleitkommadivision durch die Stichprobengröße.'
          }
        ],
        generalFeedback: `<p><strong>Zusammenfassung:</strong> Welford kombiniert \\(\\mathcal{O}(1)\\)-Streaming-Effizienz (One-Pass) mit der hohen numerischen Stabilität der klassischen Zwei-Pass-Varianzformel.</p>`
      }
    ]
  },

  // ============================================================================
  // TEST 07 (PRÜFUNG)
  // ============================================================================
  {
    id: 'Test_07_Pruefung',
    title: 'Quiz 02 - Test 07 (Prüfungstest): Negative Weltkoordinaten, Pfeilflügel & GC-Allokationsfallen',
    category: '$course$/Quiz_02_Termin_05/Test_07_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'Q02_T07_Q1',
        title: 'Affine 2D-Transformation: Ursprungsverschiebung bei negativen Weltkoordinaten (x_min < 0)',
        shortSummary: 'Transformation mit \\(x_{\\min} < 0\\) & \\(X_{\\text{screen}}\\)',
        type: 'cloze',
        grade: 2.0,
        text: `<p>Ein symmetrisches Roboter-Arbeitsfeld erstreckt sich in X-Richtung von \\(x_{\\min} = -4{,}0\\,\\text{m}\\) bis \\(x_{\\max} = +6{,}0\\,\\text{m}\\) und in Y-Richtung von \\(y_{\\min} = -2{,}0\\,\\text{m}\\) bis \\(y_{\\max} = +3{,}0\\,\\text{m}\\). Es wird verzerrungsfrei auf eine nutzbare Canvas-Fläche von \\(W_{\\text{eff}} = 500\\,\\text{px}\\) mal \\(H_{\\text{eff}} = 300\\,\\text{px}\\) abgebildet; der linke Offset beträgt \\(\\text{offset}_X = 50\\,\\text{px}\\).</p>
<p><strong>a)</strong> Berechnen Sie den verzerrungsfreien Skalierungsfaktor \\(s\\) in \\(\\text{px/m}\\): {1:NUMERICAL:=50:0.1#Exakt! Delta_X = 6 - (-4) = 10 m, Delta_Y = 3 - (-2) = 5 m; s = min(500/10, 300/5) = min(50, 60) = 50 px/m.~%50%60:0.1#Teilpunkte: Sie haben sy = 300/5 = 60 px/m statt min(50, 60) = 50 px/m gewählt.}</p>
<p><strong>b)</strong> Berechnen Sie die horizontale Bildschirmkoordinate \\(X_{\\text{screen}}\\) (in \\(\\text{px}\\)) des Koordinatenursprungs \\(x = 0{,}0\\,\\text{m}\\): {1:NUMERICAL:=250:0.5#Richtig! X_screen = offset_X + (0.0 - (-4.0)) * 50 = 50 + 4.0 * 50 = 250 px.~%50%50:0.5#Teilpunkte: Sie haben (x - x_min) vergessen und nur offset_X + 0 * 50 = 50 px gerechnet (50 px liegt aber bei x_min = -4.0 m!).}</p>`,
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<ol>
  <li><strong>Spannweiten:</strong> \\(\\Delta X = 6{,}0 - (-4{,}0) = 10{,}0\\,\\text{m}\\), \\(\\Delta Y = 3{,}0 - (-2{,}0) = 5{,}0\\,\\text{m}\\).</li>
  <li><strong>Uniform Scaling:</strong> \\(s = \\min(500/10, 300/5) = \\min(50, 60) = 50\\,\\text{px/m}\\).</li>
  <li><strong>Screen-Position für \\(x = 0\\):</strong> Wichtig ist die Subtraktion von \\(x_{\\min}\\): \\(X_{\\text{screen}} = \\text{offset}_X + (x - x_{\\min}) \\cdot s = 50 + (0 - (-4{,}0)) \\cdot 50 = 50 + 200 = 250\\,\\text{px}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T07_Q2',
        title: 'Pfeilspitzen-Geometrie im Screen Space: Flügelpunkt-Koordinate berechnen',
        shortSummary: 'Pfeilspitzen-Flügelkoordinate berechnen',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Ein vertikaler Kraftpfeil zeigt auf dem WPF-Canvas exakt senkrecht nach unten (Einheitsrichtungsvektor im Screen Space \\(u_x = 0{,}0\\), \\(u_y = +1{,}0\\); Normalenvektor \\(n_x = -u_y = -1{,}0\\), \\(n_y = u_x = 0{,}0\\)). Die Pfeilspitze liegt am Bildschirm-Punkt \\(\\text{tip} = (200\\,\\text{px}, 300\\,\\text{px})\\). Die Pfeilspitzenlänge beträgt \\(L_{\\text{arrow}} = 14\\,\\text{px}\\) und die halbe Pfeilbreite \\(W_{\\text{arrow}} = 6\\,\\text{px}\\).</p>
<p>Berechnen Sie die vertikale Bildschirmkoordinate \\(Y_{\\text{wing}}\\) (in \\(\\text{px}\\)) der beiden hinteren Pfeilflügel-Eckpunkte.</p>`,
        answers: [
          { value: 286.0, tolerance: 0.1, fraction: 100, feedback: 'Exakt! Y_wing = tip.Y - uy * L_arrow + ny * W_arrow = 300 - 1.0 * 14 + 0 * 6 = 286.0 px.' },
          { value: 314.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: Vorzeichenfehler! Sie haben + uy * L_arrow (300 + 14 = 314) gerechnet, die Flügel liegen aber entgegen der Pfeilrichtung hinter der Spitze.' },
          { value: 194.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: 194 px (200 - 6) ist die X-Koordinate des linken Flügels, gefragt war aber die Y-Koordinate (286 px).' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> Für die Flügeleckpunkte gilt \\(\\vec{P}_{\\text{wing}} = \\vec{P}_{\\text{tip}} - L_{\\text{arrow}} \\cdot \\vec{u} \\pm W_{\\text{arrow}} \\cdot \\vec{n}\\). Für die Y-Komponente folgt \\(Y_{\\text{wing}} = 300 - 14 \\cdot 1{,}0 \\pm 6 \\cdot 0{,}0 = 286\\,\\text{px}\\).</p>`
      },
      {
        id: 'Q02_T07_Q3',
        title: 'C#-Code-Tracing: Welford-Varianz nach drei konkreten Messwerten',
        shortSummary: 'C#-Tracing: Welford \\(M_2\\) nach 3 Werten',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Verfolgen Sie die Ausführung des Welford-Algorithmus für die drei Messwerte <code>x = { 10.0, 20.0, 30.0 }</code>:</p>
<pre><code class="language-csharp">double mean = 0.0, m2 = 0.0;
int count = 0;
foreach (double x in new[] { 10.0, 20.0, 30.0 }) {
    count++;
    double d1 = x - mean;
    mean += d1 / count;
    double d2 = x - mean;
    m2 += d1 * d2;
}</code></pre>
<p>Welchen numerischen Wert hat die Variable <code>m2</code> nach Abschluss der Schleife?</p>`,
        answers: [
          { value: 200.0, tolerance: 0.1, fraction: 100, feedback: 'Richtig! Schritt 1: mean=10, m2=0; Schritt 2: d1=10, mean=15, d2=5, m2=50; Schritt 3: d1=15, mean=20, d2=10, m2=50+150=200.0.' },
          { value: 100.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: 100.0 ist bereits die durch (count - 1) = 2 geteilte Stichprobenvarianz s^2, gefragt war aber die ungeteilte Summe m2 = 200.0.' }
        ],
        generalFeedback: `<p><strong>Schritt-für-Schritt-Tracing:</strong></p>
<ul>
  <li><code>x = 10</code>: <code>count = 1</code>, <code>d1 = 10</code>, <code>mean = 10</code>, <code>d2 = 0</code>, <code>m2 = 0</code>.</li>
  <li><code>x = 20</code>: <code>count = 2</code>, <code>d1 = 10</code>, <code>mean = 15</code>, <code>d2 = 5</code>, <code>m2 = 0 + 10 * 5 = 50</code>.</li>
  <li><code>x = 30</code>: <code>count = 3</code>, <code>d1 = 15</code>, <code>mean = 20</code>, <code>d2 = 10</code>, <code>m2 = 50 + 15 * 10 = 200</code>.</li>
</ul>`
      },
      {
        id: 'Q02_T07_Q4',
        title: 'C#-Code-Lückentext: Statische WPF-Pinsel mit Freeze() für High-FPS optimieren',
        shortSummary: 'C# SolidColorBrush Freeze() & Caching',
        type: 'gapselect',
        grade: 1.0,
        text: `<p>Vervollständigen Sie die statische Initialisierung eines wiederverwendbaren, thread-sicheren und maximal performanten WPF-Pinsels für Zugstäbe:</p>
<pre><code class="language-csharp">private static readonly [[1]] TensionBrush = CreateFrozenBrush(Colors.RoyalBlue);

private static SolidColorBrush CreateFrozenBrush(Color color)
{
    var brush = new [[2]](color);
    if (brush.CanFreeze)
        brush.[[3]]();
    return brush;
}</code></pre>`,
        choices: [
          { text: 'SolidColorBrush', group: 1 },
          { text: 'SolidColorBrush', group: 2 },
          { text: 'Freeze', group: 3 },
          { text: 'WriteableBitmap', group: 1 },
          { text: 'DoubleCollection', group: 1 },
          { text: 'LineGeometry', group: 2 },
          { text: 'TransformGroup', group: 2 },
          { text: 'Clear', group: 3 },
          { text: 'Clone', group: 3 }
        ],
        generalFeedback: `<p><strong>Erklärung:</strong> Ein <code>SolidColorBrush</code> erbt von <code>Freezable</code>. Durch den Aufruf von <code>brush.Freeze()</code> wird das Objekt schreibgeschützt, gibt seine internen Change-Tracking-Strukturen frei und kann ohne Performance-Verlust tausendfach wiederverwendet werden.</p>`
      },
      {
        id: 'Q02_T07_Q5',
        title: 'Konzept-Zuordnung: Fehlerbilder in der 2D-Vektorgrafik und ihre technischen Ursachen',
        shortSummary: 'Visuelle 2D-Bugs den Ursachen zuordnen',
        type: 'matching',
        grade: 1.0,
        text: `<p>Ordnen Sie den vier typischen visuellen Fehlerbildern beim Programmieren eines 2D-Viewers (Kapitel 03/04) jeweils die exakte mathematische bzw. programmiertechnische Ursache zu (beachten Sie die zwei Überhang-Distraktoren).</p>`,
        subquestions: [
          { text: 'Das gesamte Fachwerk steht auf dem Bildschirm spiegelverkehrt auf dem Kopf (Stützlager hängen oben an der Decke)', answer: 'Fehlende Y-Achsen-Inversion (offsetY + y*s statt canvasHeight - (offsetY + y*s))' },
          { text: 'Das Bauteil füllt zwar die Höhe perfekt aus, ragt aber rechts weit über den sichtbaren Canvas-Rand hinaus', answer: 'Verwendung von Math.Max(sx, sy) statt Math.Min(sx, sy) beim Uniform Scaling' },
          { text: 'Kreisförmige Gelenkknoten erscheinen als flachgedrückte Ellipsen und rechte Winkel sind schief', answer: 'Getrennte anisotrope Skalierung mit sx != sy ohne einheitlichen Skalierungsfaktor' },
          { text: 'Beim Ziehen eines äußeren Knotens zuckt und skaliert das gesamte Bauteil unkontrolliert hin und her', answer: 'Neuberechnung der Auto-Fit-Bounding-Box in jedem MouseMove-Event während des Draggings' },
          { text: '', answer: 'Verwendung von 64-Bit-double statt 32-Bit-float für die Knoten-Koordinaten' },
          { text: '', answer: 'Aktivierung von ClearType-Kantenglättung für die Maßzahlen-Textblöcke' }
        ],
        generalFeedback: `<p><strong>Lösung:</strong> Diese vier klassischen Bugs (fehlende Y-Inversion, <code>Math.Max</code> statt <code>Math.Min</code>, anisotrope Skalierung und Live-Bounding-Box-Neuberechnung beim Dragging) sind die wichtigsten Diagnosefälle aus Kapitel 03.</p>`
      },
      {
        id: 'Q02_T07_Q6',
        title: 'MSAGL-Architektur: Wahl zwischen Sugiyama-Schichtenlayout und Force-Directed Layout (MDS)',
        shortSummary: 'Wann MDS/Force-Directed statt Sugiyama?',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Für welche Art von technischem Systemmodell ist ein <strong>kräftebasiertes bzw. distanzbasiertes Layout</strong> (<code>MdsLayoutSettings</code> / <code>FastIncrementalLayoutSettings</code>) in MSAGL besser geeignet als das hierarchische Sugiyama-Layout?</p>`,
        answers: [
          {
            text: 'Für ungerichtete vermaschte Versorgungs-, Sensor- oder Kommunikationsnetze ohne eindeutige Start-Ende-Hierarchie, bei denen symmetrische Cluster gesucht sind.',
            fraction: 100,
            feedback: 'Richtig! In vermaschten ungerichteten Netzen (z. B. Funk-Mesh, Wassernetz) gibt es kein „Oben nach Unten“; Kräfte-/MDS-Layouts decken Nachbarschaftscluster natürlich auf.'
          },
          {
            text: 'Für streng sequenzielle SPS-Ablaufketten (GRAFCET / Schrittketten), bei denen Schritt 1 zwingend ganz oben und der Endschritt ganz unten stehen muss.',
            fraction: 0,
            feedback: 'Falsch. Für streng gerichtete Ablaufketten von oben nach unten ist das hierarchische Sugiyama-Schichtenlayout ideal.'
          },
          {
            text: 'Für äquidistante 1D-Zeitreihen aus einem Temperatursensor, die mit 1000 Hz in einem Oszilloskop-Fenster über der Zeitachse aufgetragen werden.',
            fraction: 0,
            feedback: 'Falsch. Zeitreihen sind überhaupt kein Fall für MSAGL-Graphenlayout, sondern für ScottPlot Signal/DataStreamer.'
          },
          {
            text: 'Für maßstabsgetreue 2D-CAD-Bauteilzeichnungen, bei denen jeder Knoten bereits feste metrische Konstruktionskoordinaten (x, y) in Metern besitzt.',
            fraction: 0,
            feedback: 'Falsch. Wenn ein Bauteil feste physikalische Geometrie-Koordinaten besitzt, darf kein automatisches Graphenlayout die Knotenpositionen verschieben!'
          }
        ],
        generalFeedback: `<p><strong>Entscheidungsregel:</strong> Feste Geometrie $\\to$ direkte affine Transformation (<code>Transform2D</code>); gerichtete Hierarchie/Kausalität $\\to$ MSAGL Sugiyama; ungerichtete Topologie/Mesh $\\to$ MSAGL MDS / Force-Directed.</p>`
      },
      {
        id: 'Q02_T07_Q7',
        title: 'C#-Bug-Diagnose: Garbage-Collection-Stottern durch Array-Neuallokation im 60-Hz-Timer',
        shortSummary: 'Bug-Diagnose: Array.Copy & Add.Signal im Timer',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Ein Entwickler möchte ein Live-Signal mit \\(500.000\\) Punkten in ScottPlot 5 aktualisieren und schreibt im \\(60\\,\\text{Hz}\\)-Timer folgenden Code. Alle paar Sekunden friert das Bild kurz ein (GC-Pausen):</p>
<pre><code class="language-csharp">void OnTimerTick(object? sender, EventArgs e) {
    double[] copy = _ringBuffer.ToArray(); // erzeugt neues double[500000]
    MainPlot.Plot.Clear();
    MainPlot.Plot.Add.Signal(copy);
    MainPlot.Refresh();
}</code></pre>
<p>Warum belastet dieser Code den .NET Garbage Collector (insbesondere den Large Object Heap) massiv?</p>`,
        answers: [
          {
            text: 'Jeder Tick allokiert ein 4 MB großes double-Array auf dem Large Object Heap und verwirft alle Plot-Objekte, statt einen vorallokierten Puffer zu nutzen.',
            fraction: 100,
            feedback: 'Exakt! 500.000 * 8 Bytes = 4 MB (> 85 KB LOH-Schwelle). Bei 60 Hz werden 240 MB/s auf dem Large Object Heap allokiert, was teure Gen-2/LOH-Collections erzwingt.'
          },
          {
            text: 'Die Methode MainPlot.Plot.Clear() löscht bei jedem Aufruf die Lizenzdatei von ScottPlot auf der Festplatte und lädt sie aus dem Internet nach.',
            fraction: 0,
            feedback: 'Falsch. ScottPlot ist Open Source (MIT) ohne Lizenzdatei oder Netzwerkzugriffe.'
          },
          {
            text: 'Der Parameter object? sender im Event-Handler zwingt C# dazu, bei jedem Tick den gesamten Maschinencode des Programms neu zu kompilieren.',
            fraction: 0,
            feedback: 'Falsch. Nullable-Referenzannotationen (object?) sind reine Compiler-Metadaten ohne Laufzeitkosten.'
          },
          {
            text: 'Arrays mit mehr als 65.536 Elementen werden in .NET grundsätzlich in die Windows-Auslagerungsdatei auf der SSD ausgelagert.',
            fraction: 0,
            feedback: 'Falsch. Solange genügend physischer RAM vorhanden ist, liegen auch große Arrays im schnellen Hauptspeicher (auf dem LOH).'
          }
        ],
        generalFeedback: `<p><strong>Lösung:</strong> In .NET wandern Objekte ab \\(85.000\\,\\text{Bytes}\\) direkt auf den <strong>Large Object Heap (LOH)</strong>. In einem 60-Hz-Renderloop darf niemals mit <code>.ToArray()</code> und <code>Plot.Clear()</code> gearbeitet werden; stattdessen nutzt man einen festen Puffer oder <code>DataStreamer</code>.</p>`
      },
      {
        id: 'Q02_T07_Q8',
        title: 'Systemanalyse: Koordinatensysteme in WPF, ScottPlot 5 und MSAGL',
        shortSummary: 'Koordinatensysteme in WPF, ScottPlot & MSAGL',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: `<p>Welche <strong>zwei</strong> Aussagen über den Umgang mit 2D-Koordinatensystemen in <strong>WPF Canvas</strong>, <strong>ScottPlot 5</strong> und <strong>MSAGL</strong> sind zutreffend?</p>`,
        answers: [
          {
            text: 'Auf einem nativen WPF-Canvas liegt der Ursprung (0,0) links oben mit nach unten wachsender Y-Achse, weshalb physikalische Höhenwerte invertiert werden müssen.',
            fraction: 50,
            feedback: 'Richtig! Ohne Y-Inversion (canvasHeight - y) würden Kräfte und Geometrien vertikal gespiegelt dargestellt.'
          },
          {
            text: 'ScottPlot 5 besitzt ein eigenes kartesisches Achsensystem mit nach oben wachsender Y-Achse, sodass Messwerte direkt ohne manuelle Y-Inversion übergeben werden.',
            fraction: 50,
            feedback: 'Richtig! ScottPlot übernimmt die Transformation von Datenkoordinaten in Pixelkoordinaten (inkl. Y-Inversion) intern automatisch.'
          },
          {
            text: 'WPF Canvas verwendet standardmäßig Polarkoordinaten (Radius und Winkel in Grad), sodass kartesische Punkte vor dem Zeichnen umgerechnet werden müssen.',
            fraction: -50,
            feedback: 'Falsch. WPF Canvas arbeitet mit kartesischen Bildschirmkoordinaten (X nach rechts, Y nach unten).'
          },
          {
            text: 'ScottPlot 5 akzeptiert auf der Y-Achse ausschließlich normierte Werte zwischen 0.0 und 1.0 und schneidet alle größeren physikalischen Messwerte ab.',
            fraction: -50,
            feedback: 'Falsch. ScottPlot verarbeitet beliebige double-Wertebereiche und skaliert die Achsen über Axes.AutoScale() automatisch.'
          }
        ],
        generalFeedback: `<p><strong>Zusammenfassung:</strong> Beim eigenen Zeichnen auf dem <code>Canvas</code> (Kap. 03) verantworten wir Skalierung und Y-Inversion selbst (<code>Transform2D</code>); in <code>ScottPlot 5</code> (Kap. 04) übergeben wir direkt die physikalischen Größen, da das Chart-Control die Achsentransformation kapselt.</p>`
      }
    ]
  },

  // ============================================================================
  // TEST 08 (PRÜFUNG)
  // ============================================================================
  {
    id: 'Test_08_Pruefung',
    title: 'Quiz 02 - Test 08 (Prüfungstest): Maus-Dragging-Delta, ScottPlot-Downsampling & Hit-Testing',
    category: '$course$/Quiz_02_Termin_05/Test_08_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'Q02_T08_Q1',
        title: 'Inverse 2D-Transformation beim Maus-Dragging: Verschiebungsvektor in Weltkoordinaten',
        shortSummary: 'Maus-Dragging \\(\\Delta X_{\\text{world}}\\) & \\(\\Delta Y_{\\text{world}}\\)',
        type: 'cloze',
        grade: 2.0,
        text: `<p>In einem interaktiven 2D-Kinematik-Editor mit dem eingefrorenen uniformen Skalierungsfaktor \\(s = 25\\,\\text{px/m}\\) zieht eine Ingenieurin einen Gelenkknoten mit gedrückter Maustaste von der Start-Bildschirmkoordinate \\(P_{\\text{start}} = (150\\,\\text{px}, 300\\,\\text{px})\\) zur neuen Bildschirmkoordinate \\(P_{\\text{end}} = (225\\,\\text{px}, 200\\,\\text{px})\\) (beachten Sie: der Bildschirmwert \\(Y_{\\text{screen}}\\) ist von \\(300\\,\\text{px}\\) auf \\(200\\,\\text{px}\\) gesunken, die Maus wurde also auf dem Monitor nach <strong>oben</strong> bewegt).</p>
<p><strong>a)</strong> Berechnen Sie die resultierende horizontale Verschiebung \\(\\Delta X_{\\text{world}} = X_{\\text{world,end}} - X_{\\text{world,start}}\\) des Knotens in Metern (\\(\\text{m}\\)): {1:NUMERICAL:=3.0:0.05#Exakt! Delta_X_screen = 225 - 150 = +75 px; Delta_X_world = +75 / 25 = +3.0 m.~%50%-3.0:0.05#Teilpunkte: Vorzeichenfehler! Eine Bewegung nach rechts (von 150 auf 225 px) vergrößert X_world um +3.0 m.}</p>
<p><strong>b)</strong> Berechnen Sie die resultierende vertikale Verschiebung \\(\\Delta Y_{\\text{world}} = Y_{\\text{world,end}} - Y_{\\text{world,start}}\\) des Knotens in Metern (\\(\\text{m}\\)) unter Beachtung der WPF-Y-Achsen-Inversion: {1:NUMERICAL:=4.0:0.05#Richtig! Da Y_screen um 100 px nach oben (von 300 auf 200) wandert, steigt die physikalische Höhe um Delta_Y_world = -(200 - 300) / 25 = +4.0 m.~%50%-4.0:0.05#Teilpunkte: Sie haben die Y-Inversion vergessen und (200 - 300) / 25 = -4.0 m gerechnet (Bewegung nach oben bedeutet positives Delta_Y_world!).}</p>`,
        generalFeedback: `<p><strong>Musterherleitung (Differenz-Transformation):</strong></p>
<ol>
  <li><strong>Horizontale Änderung:</strong> \\(\\Delta X_{\\text{world}} = \\frac{X_{\\text{screen,end}} - X_{\\text{screen,start}}}{s} = \\frac{225 - 150}{25} = +3{,}0\\,\\text{m}\\).</li>
  <li><strong>Vertikale Änderung (mit Y-Inversion):</strong> Da \\(Y_{\\text{screen}}\\) nach unten wächst, gilt für Differenzen \\(\\Delta Y_{\\text{world}} = -\\frac{Y_{\\text{screen,end}} - Y_{\\text{screen,start}}}{s} = -\\frac{200 - 300}{25} = +4{,}0\\,\\text{m}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T08_Q2',
        title: 'ScottPlot 5 Signal-Downsampling: Kompressionsrate pro Pixelspalte berechnen',
        shortSummary: 'Min/Max-Downsampling Datenpunkte pro Pixel',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Ein Prüfstands-Datensatz mit \\(N = 400.000\\) äquidistanten Druckmesswerten wird in einem <strong>ScottPlot 5</strong> <code>Signal</code>-Plot vollständig dargestellt. Die Zeichenfläche (Data Area) des Diagramms auf dem Monitor hat eine Breite von exakt \\(W_{\\text{plot}} = 800\\,\\text{Pixelspalten}\\).</p>
<p>Wie viele Roh-Messwerte \\(M\\) fasst der interne Min/Max-Downsampling-Algorithmus von <code>Signal</code> im Durchschnitt in <strong>jeder einzelnen Pixelspalte</strong> zusammen?</p>`,
        answers: [
          { value: 500, tolerance: 1, fraction: 100, feedback: 'Exakt! M = N / W_plot = 400.000 / 800 = 500 Messwerte pro Pixelspalte.' },
          { value: 250, tolerance: 1, fraction: 50, feedback: 'Teilpunkte: Sie haben zusätzlich durch 2 geteilt (weil Min und Max gezeichnet werden); pro Spalte werden aber 500 Rohpunkte aggregiert.' },
          { value: 0.002, tolerance: 0.0005, fraction: 50, feedback: 'Teilpunkte: Kehrwertfehler (800 / 400.000 = 0.002 statt 400.000 / 800 = 500).' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> Auf \\(W_{\\text{plot}} = 800\\) horizontale Pixelspalten verteilen sich \\(N = 400.000\\) Samples. Damit entfallen \\(M = \\frac{400.000}{800} = 500\\) Samples auf jede Pixelspalte, aus denen jeweils das Minimum und Maximum bestimmt wird.</p>`
      },
      {
        id: 'Q02_T08_Q3',
        title: 'C#-Code-Tracing: Lesbarkeitskorrektur des Bemaßungswinkels nach DIN 406',
        shortSummary: 'C#-Tracing: DIN-406-Winkelkorrektur',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Ein schräger Stab verläuft auf dem Bildschirm nach links oben und besitzt vor der Korrektur den Orientierungswinkel <code>angleDeg = -135.0</code> Grad. Welchen Wert hat <code>angleDeg</code> nach Ausführung der DIN-406-Lesbarkeitskorrektur?</p>
<pre><code class="language-csharp">double angleDeg = -135.0;
if (angleDeg > 90.0)
    angleDeg -= 180.0;
else if (angleDeg < -90.0)
    angleDeg += 180.0;</code></pre>`,
        answers: [
          { value: 45.0, tolerance: 0.1, fraction: 100, feedback: 'Richtig! Da -135.0 < -90.0 ist, greift der else-if-Zweig: -135.0 + 180.0 = +45.0 Grad.' },
          { value: -45.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: Vorzeichenfehler bei der Addition -135.0 + 180.0 = +45.0 Grad.' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> Da \\(-135^\\circ < -90^\\circ\\) in der linken Halbebene liegt (Text stünde auf dem Kopf), wird \\(180^\\circ\\) addiert: \\(-135^\\circ + 180^\\circ = +45^\\circ\\). Die Maßzahl verläuft weiterhin exakt parallel zum Stab, ist nun aber von unten rechts lesbar.</p>`
      },
      {
        id: 'Q02_T08_Q4',
        title: 'C#-Code-Lückentext: Wurzelfreies Hit-Testing für Knotenauswahl im Screen Space',
        shortSummary: 'C# Hit-Testing FindNodeAtScreenPos',
        type: 'gapselect',
        grade: 1.0,
        text: `<p>Vervollständigen Sie die C#-Methode zur Suche des nächstgelegenen Fachwerkknotens innerhalb eines Fangradius <code>snapRadiusPx = 10.0</code> um die Mausposition <code>(mouseX, mouseY)</code>:</p>
<pre><code class="language-csharp">double bestDistSq = [[1]];
Node? hitNode = null;
foreach (var node in _nodes) {
    var (sx, sy) = _transform.[[2]](node.X, node.Y);
    double dSq = (mouseX - sx) * (mouseX - sx) + (mouseY - sy) * (mouseY - sy);
    if (dSq <= [[3]]) { bestDistSq = dSq; hitNode = node; }
}</code></pre>`,
        choices: [
          { text: 'snapRadiusPx * snapRadiusPx', group: 1 },
          { text: 'WorldToScreen', group: 2 },
          { text: 'bestDistSq', group: 3 },
          { text: '0.0', group: 1 },
          { text: 'Math.Sqrt(snapRadiusPx)', group: 1 },
          { text: 'ScreenToWorld', group: 2 },
          { text: 'Freeze', group: 2 },
          { text: '0.0', group: 3 },
          { text: 'node.X', group: 3 }
        ],
        generalFeedback: `<p><strong>Erklärung:</strong> Die Schwelle <code>bestDistSq</code> wird mit dem Quadrat des Fangradius <code>snapRadiusPx * snapRadiusPx</code> initialisiert. Jeder Knoten wird via <code>WorldToScreen</code> in Pixel umgerechnet; ist sein Abstandsquadrat <code>dSq &lt;= bestDistSq</code>, wird er als neuer bester Treffer gespeichert.</p>`
      },
      {
        id: 'Q02_T08_Q5',
        title: 'Pipeline-Reihenfolge: Entkoppeltes Echtzeit-Datenstreaming mit Ringpuffer und UI-Timer',
        shortSummary: '4 Schritte der Echtzeit-Plot-Pipeline',
        type: 'ddwtos',
        grade: 1.0,
        text: `<p>Bringen Sie die <strong>vier Schritte einer entkoppelten Echtzeit-Visualisierungspipeline</strong> (Kapitel 04) vom Eintreffen eines Messwerts bis zum Bildschirm-Frame in die korrekte Reihenfolge:</p>
<p><strong>Schritt 1:</strong> [[1]] (Neuen Rohmesswert in O(1) an der aktuellen Schreibposition in den vorallokierten Puffer eintragen)<br>
<strong>Schritt 2:</strong> [[2]] (Laufenden Mittelwert und Abweichungsquadratsumme M2 inkrementell nach Welford aktualisieren)<br>
<strong>Schritt 3:</strong> [[3]] (Abwarten des nächsten 30/60-Hz-Takts des UI-Timers ohne Blockade des Messkanals)<br>
<strong>Schritt 4:</strong> [[4]] (Position der 3-Sigma-Linien anpassen und einmalig pro Frame WpfPlot.Refresh() auslösen)</p>`,
        dragboxes: [
          { text: 'Ringpuffer-Eintrag (DataStreamer.Add)', group: 1 },
          { text: 'Inkrementelles Welford-Statistik-Update', group: 1 },
          { text: 'Taktung durch 60-Hz-DispatcherTimer', group: 1 },
          { text: 'Gebündeltes Chart-Rendering (WpfPlot.Refresh)', group: 1 },
          { text: 'Vollständige Array-Sortierung (Array.Sort)', group: 1 },
          { text: 'Neuanlage des WpfPlot-Controls (new WpfPlot)', group: 1 }
        ],
        generalFeedback: `<p><strong>Echtzeit-Architektur:</strong> Schnelle Datenaufnahme (Ringpuffer + Welford in \\(\\mathcal{O}(1)\\)) wird zeitlich über einen <code>DispatcherTimer</code> vom aufwendigen Grafik-Rendering (<code>WpfPlot.Refresh()</code>) getrennt.</p>`
      },
      {
        id: 'Q02_T08_Q6',
        title: 'Farbsemantik & Vektordarstellung: Kodierung von Stabkräften im 2D-Fachwerk-Viewer',
        shortSummary: 'Visuelle Kodierung von Zug-/Druckstäben',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Wie werden innere Stabkräfte (Zug vs. Druck vs. Nullstab) in einem professionellen 2D-Fachwerk-Viewer (Kapitel 03) typischerweise visuell auf dem WPF-Canvas kodiert, damit Ingenieure den Kraftfluss sofort erfassen?</p>`,
        answers: [
          {
            text: 'Durch eine semantische Farbskala (z. B. Rot/Blau für Druck/Zug, Grau für Nullstäbe) kombiniert mit einer vom Kraftbetrag abhängigen Strichstärke im Screen Space.',
            fraction: 100,
            feedback: 'Richtig! Die Kombination aus divergierender Farbpalette (Vorzeichen) und moderat skalierter Strichstärke StrokeThickness (Betrag) erlaubt eine sofortige visuelle Diagnose.'
          },
          {
            text: 'Indem man die geometrische Länge der gezogenen Stäbe auf dem Bildschirm verdoppelt und sämtliche Druckstäbe komplett aus dem Canvas ausblendet.',
            fraction: 0,
            feedback: 'Falsch. Das Ändern der Stablängen um 100 % würde die Netztopologie zerreißen, und das Ausblenden von Druckstäben macht die Knickanalyse unmöglich.'
          },
          {
            text: 'Indem man für jedes Kilonewton Stabkraft eine zusätzliche parallele Linie zeichnet, sodass ein Stab mit 500 kN aus 500 einzelnen UIElementen besteht.',
            fraction: 0,
            feedback: 'Falsch. Hunderte überlappende Line-Objekte pro Stab würden den Visual Tree überlasten und visuell nur einen undefinierten Balken ergeben.'
          },
          {
            text: 'Durch Änderung der Hintergrundfarbe des gesamten Anwendungsfensters im 60-Hz-Wechsel zwischen den Farben aller vorhandenen Stäbe.',
            fraction: 0,
            feedback: 'Falsch. Ein blinkender Fensterhintergrund zeigt nicht an, welcher konkrete Stab im Fachwerk wie stark belastet ist.'
          }
        ],
        generalFeedback: `<p><strong>Didaktisches Prinzip:</strong> In technischen Visualisierungen kodiert die <strong>Farbe (Hue)</strong> die Wirkungsrichtung (Zug vs. Druck) und die <strong>Strichstärke / Sättigung</strong> die Intensität \\(|F|\\) relativ zu \\(F_{\\max}\\).</p>`
      },
      {
        id: 'Q02_T08_Q7',
        title: 'C#-Bug-Diagnose: Falsche Stichprobenvarianz durch Integer-Division in C#',
        shortSummary: 'Bug-Diagnose: Ganzzahldivision in C#',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Ein Studierender möchte einen Skalierungsfaktor für ein Diagramm berechnen und schreibt: <code>double factor = (count - 1) / count * m2;</code>, wobei <code>int count = 10;</code> als Ganzzahl deklariert ist. Überraschenderweise ist <code>factor</code> immer exakt <code>0.0</code>! Warum?</p>`,
        answers: [
          {
            text: 'Weil (count - 1) und count beide vom Typ int sind, wird 9 / 10 als Ganzzahldivision zu 0 abgerundet, bevor mit m2 multipliziert wird.',
            fraction: 100,
            feedback: 'Exakt! Der Links-nach-rechts-Operator / sieht bei (count - 1) / count zwei int-Operanden und liefert 0; erst 0 * m2 wird zu 0.0.'
          },
          {
            text: 'Weil in C# das Minuszeichen eine niedrigere Operatorpriorität als die Multiplikation besitzt und Klammern in double-Ausdrücken ignoriert werden.',
            fraction: 0,
            feedback: 'Falsch. Klammern haben in C# immer die höchste Priorität und werden selbstverständlich zuerst ausgewertet.'
          },
          {
            text: 'Weil eine Variable mit dem Namen count in C# ein reserviertes Schlüsselwort von LINQ ist und beim Lesen automatisch auf Null gesetzt wird.',
            fraction: 0,
            feedback: 'Falsch. count ist als lokaler Variablenname in C# vollkommen gültig und wird nicht zurückgesetzt.'
          },
          {
            text: 'Weil der Datentyp double in .NET keine Zahlen kleiner als 1.0 speichern kann und jeden echten Bruch bei der Zuweisung auf 0.0 abrundet.',
            fraction: 0,
            feedback: 'Falsch. double speichert Brüche bis ca. 10^-308; das Problem entsteht vor der Zuweisung bei der int-Division.'
          }
        ],
        generalFeedback: `<p><strong>Lösung:</strong> Mindestens einer der Operanden der Division muss ein Gleitkommawert sein, z. B. <code>(count - 1.0) / count * m2</code> oder <code>(double)(count - 1) / count * m2</code>.</p>`
      },
      {
        id: 'Q02_T08_Q8',
        title: 'Systemanalyse: Gruppierte Balkendiagramme und Box-Whisker-Plots in ScottPlot 5',
        shortSummary: 'Balken-Offsets & Box-Plot-Kennwerte',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: `<p>Welche <strong>zwei</strong> Aussagen zur Konstruktion von <strong>gruppierten Balkendiagrammen</strong> und <strong>Box-Whisker-Plots</strong> in ScottPlot 5 (Kapitel 04) sind fachlich korrekt?</p>`,
        answers: [
          {
            text: 'Bei zwei gruppierten Balken der Einzelbreite w pro Kategorie i werden die Balkenzentren um -w/2 und +w/2 gegenüber i verschoben, damit sie bündig nebeneinander stehen.',
            fraction: 50,
            feedback: 'Richtig! Durch i - w/2 und i + w/2 berühren sich beide Balken exakt auf der Kategorienlinie i ohne sich zu überdecken.'
          },
          {
            text: 'Die Box eines Box-Whisker-Plots erstreckt sich vom 25-%-Quartil (Q1) bis zum 75-%-Quartil (Q3) und schließt damit exakt die mittleren 50 Prozent der Daten ein.',
            fraction: 50,
            feedback: 'Richtig! Die Höhe der Box entspricht dem Interquartilsabstand IQR = Q3 - Q1 (mittlere 50 % der sortierten Stichprobe).'
          },
          {
            text: 'Um zwei Balken nebeneinander zu gruppieren, müssen beide Balken exakt dieselbe Position X = i erhalten, da ScottPlot sie automatisch horizontal auffächert.',
            fraction: -50,
            feedback: 'Falsch. Haben zwei Bar-Objekte exakt dieselbe Position, werden sie verdeckend übereinander gezeichnet.'
          },
          {
            text: 'Die Antennen (Whiskers) eines Box-Plots markieren in der Statistik immer den absoluten Stichprobenumfang N sowie die Abtastfrequenz in Hertz.',
            fraction: -50,
            feedback: 'Falsch. Die Whiskers markieren die Streuungsgrenzen der Daten (z. B. Min/Max oder 1.5 * IQR), niemals die Stichprobengröße N oder Frequenzen.'
          }
        ],
        generalFeedback: `<p><strong>Zusammenfassung:</strong> Gruppierte Balken benötigen manuelle Positions-Offsets \\(i \\mp w/2\\), und Box-Plots visualisieren \\(Q_1\\), Median, \\(Q_3\\) (IQR = 50 % der Daten) sowie die Whisker-Grenzen.</p>`
      }
    ]
  },

  // ============================================================================
  // TEST 09 (PRÜFUNG)
  // ============================================================================
  {
    id: 'Test_09_Pruefung',
    title: 'Quiz 02 - Test 09 (Prüfungstest): Canvas-Größenberechnung, Untere 3-Sigma-Grenze & MSAGL-BBox',
    category: '$course$/Quiz_02_Termin_05/Test_09_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'Q02_T09_Q1',
        title: 'Affine 2D-Transformation: Nutzbare Zeichenfläche nach Randabzug und Uniform Scaling',
        shortSummary: 'Nutzbare Breite \\(W_{\\text{eff}}\\) & Maßstab \\(s\\)',
        type: 'cloze',
        grade: 2.0,
        text: `<p>Ein WPF-Canvas besitzt die Gesamtgröße \\(W_{\\text{canvas}} = 700\\,\\text{px}\\) Breite und \\(H_{\\text{canvas}} = 500\\,\\text{px}\\) Höhe. Damit Knotensymbole und DIN-406-Maßzahlen am Rand nicht abgeschnitten werden, wird auf <strong>allen vier Seiten</strong> (links, rechts, oben, unten) jeweils ein Sicherheitsrand von \\(\\text{margin} = 50\\,\\text{px}\\) freigehalten. Auf der verbleibenden nutzbaren Fläche soll eine Fertigungsstraße der Länge \\(\\Delta X = 30\\,\\text{m}\\) und Breite \\(\\Delta Y = 10\\,\\text{m}\\) verzerrungsfrei dargestellt werden.</p>
<p><strong>a)</strong> Berechnen Sie die effektiv nutzbare Zeichenbreite \\(W_{\\text{eff}}\\) in \\(\\text{px}\\) nach Abzug des linken und rechten Sicherheitsrands: {1:NUMERICAL:=600:0.5#Exakt! W_eff = W_canvas - 2 * margin = 700 - 2 * 50 = 600 px.~%50%650:0.5#Teilpunkte: Sie haben margin = 50 px nur einmal statt zweimal (links UND rechts) abgezogen!}</p>
<p><strong>b)</strong> Berechnen Sie den resultierenden verzerrungsfreien uniformen Skalierungsfaktor \\(s\\) in \\(\\text{px/m}\\): {1:NUMERICAL:=20:0.1#Richtig! H_eff = 500 - 2*50 = 400 px; s = min(600/30, 400/10) = min(20, 40) = 20 px/m.~%50%40:0.1#Teilpunkte: Sie haben max(sx, sy) = 40 px/m statt min(sx, sy) = 20 px/m gewählt.}</p>`,
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<ol>
  <li><strong>Nutzbare Dimensionen (beidseitiger Randabzug!):</strong> \\(W_{\\text{eff}} = W_{\\text{canvas}} - 2 \\cdot \\text{margin} = 700 - 100 = 600\\,\\text{px}\\) und \\(H_{\\text{eff}} = H_{\\text{canvas}} - 2 \\cdot \\text{margin} = 500 - 100 = 400\\,\\text{px}\\).</li>
  <li><strong>Uniform Scaling:</strong> \\(s = \\min\\left(\\frac{600}{30}, \\frac{400}{10}\\right) = \\min(20, 40) = 20\\,\\text{px/m}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T09_Q2',
        title: 'Statistische Prozesskontrolle (SPC): Untere 3-Sigma-Warngrenze (LCL) bestimmen',
        shortSummary: 'Untere \\(3\\sigma\\)-Grenze (LCL) aus \\(M_2\\)',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Ein Welford-Statistikmodul überwacht den Förderstrom einer Dosierpumpe. Nach \\(k = 10\\) Messwerten beträgt der laufende Mittelwert \\(\\mu = 50{,}0\\,\\text{l/min}\\) und die Quadratsumme der Abweichungen \\(M_2 = 36{,}0\\,(\\text{l/min})^2\\). Für die Live-Überwachung in ScottPlot 5 wird die untere \\(3\\sigma\\)-Kontrollgrenze \\(\\text{LCL} = \\mu - 3 \\cdot s\\) (mit der empirischen Stichprobenstandardabweichung \\(s\\)) berechnet.</p>
<p>Berechnen Sie den numerischen Wert von \\(\\text{LCL}\\) in \\(\\text{l/min}\\).</p>`,
        answers: [
          { value: 44.0, tolerance: 0.1, fraction: 100, feedback: 'Exakt! s^2 = M2 / (10 - 1) = 36.0 / 9 = 4.0 => s = 2.0 l/min; LCL = 50.0 - 3 * 2.0 = 44.0 l/min.' },
          { value: 56.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: 56.0 l/min (50 + 6) ist die obere Kontrollgrenze UCL, gefragt war aber die untere Grenze LCL = 50 - 6 = 44.0 l/min.' },
          { value: 38.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: Sie haben 50 - 3 * s^2 = 50 - 12 = 38 gerechnet (Quadratwurzel für s vergessen!).' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<ol>
  <li><strong>Stichprobenvarianz:</strong> \\(s^2 = \\frac{M_2}{k - 1} = \\frac{36{,}0}{9} = 4{,}0\\,(\\text{l/min})^2 \\implies s = \\sqrt{4{,}0} = 2{,}0\\,\\text{l/min}\\).</li>
  <li><strong>Untere \\(3\\sigma\\)-Grenze:</strong> \\(\\text{LCL} = \\mu - 3s = 50{,}0 - 3 \\cdot 2{,}0 = 44{,}0\\,\\text{l/min}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T09_Q3',
        title: 'C#-Code-Tracing: Horizontale Pfeilspitzen-Rückverschiebung im Screen Space',
        shortSummary: 'C#-Tracing: Pfeilflügel X-Koordinate',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Ein horizontaler Kraftpfeil zeigt nach rechts von <code>start = (100, 200)</code> zur Spitze <code>tip = (250, 200)</code>. Der folgende C#-Code berechnet die X-Koordinate <code>wingX</code> der Pfeilflügel:</p>
<pre><code class="language-csharp">double ux = 1.0, uy = 0.0;
double nx = -uy, ny = ux;
double arrowLength = 15.0, arrowHalfWidth = 6.0;
double wingX = 250.0 - ux * arrowLength + nx * arrowHalfWidth;</code></pre>
<p>Welchen numerischen Wert (in \\(\\text{px}\\)) besitzt <code>wingX</code>?</p>`,
        answers: [
          { value: 235.0, tolerance: 0.1, fraction: 100, feedback: 'Richtig! Da nx = -uy = 0.0 ist, gilt wingX = 250.0 - 1.0 * 15.0 + 0.0 * 6.0 = 235.0 px.' },
          { value: 229.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: Sie haben arrowHalfWidth = 6.0 ebenfalls von X abgezogen; bei einem horizontalen Pfeil wirkt die Breite aber rein vertikal in Y-Richtung (nx = 0).' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> Da der Pfeil horizontal nach rechts zeigt (\\(u_x = 1, u_y = 0\\)), steht der Normalenvektor vertikal (\\(n_x = 0, n_y = 1\\)). In X-Richtung gehen die Flügel daher einfach um <code>arrowLength = 15.0</code> hinter die Spitze bei \\(250\\,\\text{px}\\) zurück: \\(250{,}0 - 15{,}0 = 235{,}0\\,\\text{px}\\).</p>`
      },
      {
        id: 'Q02_T09_Q4',
        title: 'C#-Code-Lückentext: Horizontale Warnlinie und Toleranzband in ScottPlot 5 einzeichnen',
        shortSummary: 'C# ScottPlot HorizontalLine & Span',
        type: 'gapselect',
        grade: 1.0,
        text: `<p>Vervollständigen Sie den C#-Code, um in <strong>ScottPlot 5</strong> den Mittelwert <code>mean</code> als horizontale Linie und den \\(\\pm 3\\sigma\\)-Bereich von <code>lcl</code> bis <code>ucl</code> als farbiges Toleranzband einzuzeichnen:</p>
<pre><code class="language-csharp">var meanLine = MainPlot.Plot.Add.[[1]](mean);
var band = MainPlot.Plot.Add.[[2]](lcl, ucl);
MainPlot.[[3]]();</code></pre>`,
        choices: [
          { text: 'HorizontalLine', group: 1 },
          { text: 'HorizontalSpan', group: 2 },
          { text: 'Refresh', group: 3 },
          { text: 'VerticalLine', group: 1 },
          { text: 'Pie', group: 1 },
          { text: 'DataStreamer', group: 2 },
          { text: 'Scatter', group: 2 },
          { text: 'Freeze', group: 3 },
          { text: 'Dispose', group: 3 }
        ],
        generalFeedback: `<p><strong>Erklärung:</strong> Eine durchgehende waagerechte Referenzlinie bei einem Y-Wert erzeugt man mit <code>Plot.Add.HorizontalLine(y)</code>, ein waagerechtes Band zwischen \\(y_1\\) und \\(y_2\\) mit <code>Plot.Add.HorizontalSpan(y1, y2)</code>. Abschließend aktualisiert <code>MainPlot.Refresh()</code> die Anzeige.</p>`
      },
      {
        id: 'Q02_T09_Q5',
        title: 'Konzept-Zuordnung: Mathematische Kennzahlen der Echtzeit-Statistik (Kapitel 04)',
        shortSummary: 'Statistische Kennzahlen (Kap. 04) zuordnen',
        type: 'matching',
        grade: 1.0,
        text: `<p>Ordnen Sie den vier statistischen Größen aus Kapitel 04 jeweils ihre korrekte mathematische Definition und Bedeutung im Monitoring-Dashboard zu (beachten Sie die zwei Überhang-Distraktoren).</p>`,
        subquestions: [
          { text: 'Inkrementelles Mittelwert-Update im Welford-Algorithmus beim k-ten Messwert', answer: 'mu_k = mu_{k-1} + (x_k - mu_{k-1}) / k' },
          { text: 'Erwartungstreue empirische Stichprobenvarianz aus der Welford-Quadratsumme M2', answer: 's^2 = M2 / (k - 1) mit Bessel-Korrektur für k >= 2' },
          { text: 'Interquartilsabstand (IQR) zur Beschreibung der Box-Höhe im Box-Whisker-Plot', answer: 'Q3 - Q1 (Spannweite der mittleren 50 Prozent der sortierten Messwerte)' },
          { text: 'Obere und untere Eingriffsgrenze (Control Limits) im statistischen Prozessband', answer: 'mu + 3*s und mu - 3*s (umfasst bei Normalverteilung ca. 99,73 Prozent der Werte)' },
          { text: '', answer: 's^2 = (sumX / k)^2 (Quadrat des arithmetischen Mittelwerts)' },
          { text: '', answer: 'Q3 + Q1 (Summe aus erstem und drittem Quartil)' }
        ],
        generalFeedback: `<p><strong>Lösung:</strong> Diese vier Beziehungen (Welford-Mittelwert, Bessel-korrigierte Stichprobenvarianz \\(M_2/(k-1)\\), Interquartilsabstand \\(Q_3 - Q_1\\) und \\(\\mu \\pm 3s\\)-Prozessgrenzen) bilden das mathematische Rückgrat von Kapitel 04.</p>`
      },
      {
        id: 'Q02_T09_Q6',
        title: 'MSAGL-Rendering auf WPF Canvas: Warum die Bounding-Box des Graphen transformiert werden muss',
        shortSummary: 'MSAGL Graph-BoundingBox -> WPF Canvas',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Nachdem <code>LayoutHelpers.CalculateLayout(graph, settings, null)</code> die Knoten- und Kantenpositionen eines MSAGL-Graphen berechnet hat, sollen diese auf einem WPF-Canvas gezeichnet werden. Warum reicht es nicht, die berechneten MSAGL-Koordinaten <code>node.Center.X</code> und <code>node.Center.Y</code> unverändert als Pixelkoordinaten zu übernehmen?</p>`,
        answers: [
          {
            text: 'Weil MSAGL ein eigenes Koordinatensystem mit beliebiger BoundingBox und nach oben zeigender Y-Achse nutzt, das erst in das Canvas eingepasst werden muss.',
            fraction: 100,
            feedback: 'Richtig! Genau wie bei einem CAD-Bauteil liest man graph.BoundingBox (Left, Right, Bottom, Top) aus und bildet sie per Uniform Scaling und Y-Inversion auf das Canvas ab.'
          },
          {
            text: 'Weil MSAGL sämtliche Koordinaten ausschließlich als verschlüsselte Hexadezimal-Strings speichert, die erst über einen Dienst entschlüsselt werden müssen.',
            fraction: 0,
            feedback: 'Falsch. node.Center.X und Y sind normale, direkt lesbare double-Gleitkommazahlen.'
          },
          {
            text: 'Weil MSAGL die Knotenpositionen grundsätzlich in geographischen Kugelkoordinaten (Längengrad, Breitengrad und Erdradius) für Weltkarten berechnet.',
            fraction: 0,
            feedback: 'Falsch. MSAGL arbeitet in einem ebenen kartesischen 2D-Koordinatensystem.'
          },
          {
            text: 'Weil das WPF-Canvas keine Ellipsen oder Rechtecke darstellen kann, solange deren Mittelpunkte nicht ganzzahlig durch 100 ohne Rest teilbar sind.',
            fraction: 0,
            feedback: 'Falsch. WPF zeichnet Shapes an beliebigen Gleitkomma-Positionen.'
          }
        ],
        generalFeedback: `<p><strong>wichtige Brücke zwischen Kap. 03 und Kap. 04:</strong> Die Klasse <code>Transform2D</code> aus Kapitel 03 lässt sich 1:1 wiederverwenden, um die <code>graph.BoundingBox</code> eines MSAGL-Graphen verzerrungsfrei und zentriert auf das WPF-Canvas abzubilden!</p>`
      },
      {
        id: 'Q02_T09_Q7',
        title: 'C#-Bug-Diagnose: Division durch Null beim Welford-Start (SampleVariance bei Count < 2)',
        shortSummary: 'Bug-Diagnose: Welford Division durch (k-1)=0',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>In einer <code>WelfordStatistics</code>-Klasse ist die Eigenschaft für die Stichprobenvarianz wie folgt implementiert: <code>public double SampleVariance =&gt; M2 / (Count - 1);</code>. Unmittelbar nach dem allerersten Messwert (<code>Count == 1</code>) zeigt das angebundene ScottPlot-Diagramm plötzlich <code>NaN</code>-Fehler an. Warum?</p>`,
        answers: [
          {
            text: 'Für Count == 1 sind sowohl M2 == 0.0 als auch (Count - 1) == 0, sodass die Gleitkommadivision 0.0 / 0.0 nach IEEE 754 den Wert double.NaN liefert.',
            fraction: 100,
            feedback: 'Exakt! Nach nur einem Messwert ist M2 exakt 0.0 und der Nenner (1 - 1) ebenfalls 0; in IEEE-754 ergibt 0.0 / 0.0 den Wert NaN, der alle Folgeplots infiziert.'
          },
          {
            text: 'In C# löst jede Division eines double-Werts durch Null sofort einen blauen Bildschirmabsturz (Blue Screen of Death) des Windows-Kernels aus.',
            fraction: 0,
            feedback: 'Falsch. Gleitkommadivision durch 0.0 wirft in C# nicht einmal eine Exception, sondern liefert +Infinity, -Infinity oder (bei 0.0/0.0) NaN.'
          },
          {
            text: 'Die Variable Count startet bei einem neuen C#-Objekt standardmäßig beim Wert -2147483648, sofern man keinen Konstruktor mit Parameter aufruft.',
            fraction: 0,
            feedback: 'Falsch. Felder vom Typ int werden in C# automatisch mit 0 initialisiert.'
          },
          {
            text: 'Der Ausdruck (Count - 1) dekrementiert das Feld Count dauerhaft im Speicher, sodass der Zähler niemals über den Wert 0 hinauswachsen kann.',
            fraction: 0,
            feedback: 'Falsch. Count - 1 berechnet nur eine temporäre Differenz ohne Seiteneffekt (im Gegensatz zu --Count).'
          }
        ],
        generalFeedback: `<p><strong>Robuste Implementierung:</strong> In <code>WelfordStatistics</code> schützt man die Varianz-Eigenschaft stets mit einer Fallunterscheidung: <code>public double SampleVariance =&gt; Count &gt; 1 ? M2 / (Count - 1) : 0.0;</code>.</p>`
      },
      {
        id: 'Q02_T09_Q8',
        title: 'Systemanalyse: Vergleich der 2D-Grafiktechnologien im Kurs (Kapitel 02, 03 und 04)',
        shortSummary: 'Technologie-Auswahl: Bitmap, Canvas, ScottPlot',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: `<p>Welche <strong>zwei</strong> Architektur-Entscheidungen wählen für das jeweilige Simulationsproblem die technisch optimale 2D-Visualisierungstechnologie aus den bisherigen Kapiteln?</p>`,
        answers: [
          {
            text: 'Für ein interaktives 2D-Fachwerk mit 50 Stäben, Knoten-Hit-Testing, Tooltips und scharfer DIN-406-Bemaßung nutzt man Vektorgrafik auf dem WPF Canvas.',
            fraction: 50,
            feedback: 'Richtig! Vektorgrafik auf dem Canvas skaliert gestochen scharf und unterstützt direktes Maus-Interaktionsverhalten an einzelnen Knoten und Stäben.'
          },
          {
            text: 'Für das Echtzeit-Monitoring mehrerer 1-kHz-Sensorkanäle inklusive Achsenskalierung und Toleranzbändern nutzt man ScottPlot 5 mit DataStreamer.',
            fraction: 50,
            feedback: 'Richtig! ScottPlot 5 liefert fertige wissenschaftliche Achsen, Legenden, Downsampling und Ringpuffer-Streaming out-of-the-box.'
          },
          {
            text: 'Für ein kontinuierliches 2D-Temperaturfeld mit 500 x 500 = 250.000 Gitterzellen erzeugt man 250.000 einzelne Rectangle-UIElemente im WPF Canvas.',
            fraction: -50,
            feedback: 'Falsch! 250.000 UIElemente im Canvas legen WPF komplett lahm; für dichte 2D-Skalarfelder nutzt man ein WriteableBitmap (Kap. 02) oder eine Heatmap.'
          },
          {
            text: 'Für einen gerichteten System-Signalflussgraphen mit 30 Knoten berechnet man das Layout über einen 2D-Wärmeleitungs-Löser auf einem Pixel-Array.',
            fraction: -50,
            feedback: 'Falsch! Für gerichtete Graphen nutzt man MSAGL (Sugiyama-Layout) in Kombination mit Vektorgrafik.'
          }
        ],
        generalFeedback: `<p><strong>Architektur-Kompass:</strong> Dichte 2D-Rasterfelder $\\to$ <code>WriteableBitmap</code> (Kap. 02); interaktive Konstruktions-/CAD-Geometrie $\\to$ <code>WPF Canvas / DrawingVisual</code> (Kap. 03); Zeitreihen, Statistik & Graphentopologie $\\to$ <code>ScottPlot 5 & MSAGL</code> (Kap. 04).</p>`
      }
    ]
  },

  // ============================================================================
  // TEST 10 (PRÜFUNG)
  // ============================================================================
  {
    id: 'Test_10_Pruefung',
    title: 'Quiz 02 - Test 10 (Prüfungstest): Knotenabstand aus Screen-Koordinaten, Welford-Rückrechnung & DPI',
    category: '$course$/Quiz_02_Termin_05/Test_10_Pruefung',
    isPractice: false,
    questions: [
      {
        id: 'Q02_T10_Q1',
        title: 'Affine 2D-Transformation: Wahre Bauteil-Spannweite aus Bildschirm-Koordinaten bestimmen',
        shortSummary: 'Maßstab \\(s\\) & wahre Länge \\(L_{\\text{world}}\\)',
        type: 'cloze',
        grade: 2.0,
        text: `<p>Ein Prüfstandsrahmen mit der physikalischen Breite \\(\\Delta X = 8{,}0\\,\\text{m}\\) und Höhe \\(\\Delta Y = 5{,}0\\,\\text{m}\\) ist verzerrungsfrei (Uniform Scaling) in ein nutzbares Canvas-Fenster von \\(W_{\\text{eff}} = 640\\,\\text{px}\\) Breite und \\(H_{\\text{eff}} = 500\\,\\text{px}\\) Höhe eingepasst. Auf dem Bildschirm messen Sie zwischen zwei Lagermittelpunkten einen horizontalen Pixelabstand von \\(\\Delta X_{\\text{screen}} = 240\\,\\text{px}\\) und einen vertikalen Pixelabstand von \\(\\Delta Y_{\\text{screen}} = 320\\,\\text{px}\\) (d. h. eine schräge Bildschirmdistanz von \\(L_{\\text{screen}} = \\sqrt{240^2 + 320^2} = 400\\,\\text{px}\\)).</p>
<p><strong>a)</strong> Berechnen Sie den verwendeten uniformen Skalierungsfaktor \\(s\\) in \\(\\text{px/m}\\): {1:NUMERICAL:=80:0.1#Exakt! s = min(640 / 8.0, 500 / 5.0) = min(80, 100) = 80 px/m.~%50%100:0.1#Teilpunkte: Sie haben sy = 500 / 5.0 = 100 px/m statt min(80, 100) = 80 px/m gewählt.}</p>
<p><strong>b)</strong> Berechnen Sie den wahren physikalischen Euklidischen Abstand \\(L_{\\text{world}}\\) (in \\(\\text{m}\\)) zwischen den beiden Lagern im World Space: {1:NUMERICAL:=5.0:0.05#Richtig! L_world = L_screen / s = 400 px / 80 (px/m) = 5.0 m (bzw. sqrt(3.0^2 + 4.0^2) = 5.0 m).~%50%4.0:0.05#Teilpunkte: Folgefehler aus Teil a (400 / 100 = 4.0 m) oder nur die vertikale Komponente 320 / 80 = 4.0 m betrachtet.}</p>`,
        generalFeedback: `<p><strong>Musterherleitung:</strong></p>
<ol>
  <li><strong>Uniform Scaling:</strong> \\(s = \\min\\left(\\frac{640}{8{,}0}, \\frac{500}{5{,}0}\\right) = \\min(80, 100) = 80\\,\\text{px/m}\\).</li>
  <li><strong>Wahre Distanz im World Space:</strong> \\(\\Delta X_{\\text{world}} = \\frac{240}{80} = 3{,}0\\,\\text{m}\\), \\(\\Delta Y_{\\text{world}} = \\frac{320}{80} = 4{,}0\\,\\text{m}\\), also \\(L_{\\text{world}} = \\sqrt{3{,}0^2 + 4{,}0^2} = \\frac{400\\,\\text{px}}{80\\,\\text{px/m}} = 5{,}0\\,\\text{m}\\).</li>
</ol>`
      },
      {
        id: 'Q02_T10_Q2',
        title: 'Welford-Online-Algorithmus: Erforderliche Quadratsumme M2 für gegebene Standardabweichung',
        shortSummary: 'Welford \\(M_2\\) aus Standardabweichung \\(s\\)',
        type: 'numerical',
        grade: 1.5,
        text: `<p>In einem automatisierten Unit-Test für Ihre <code>WelfordStatistics</code>-Klasse wurden \\(k = 11\\) Temperaturmesswerte verarbeitet. Die empirische Stichprobenstandardabweichung wird von der Klasse als \\(s = 3{,}0\\,\\text{K}\\) ausgewiesen.</p>
<p>Welchen numerischen Wert (in \\(\\text{K}^2\\)) muss das interne Akkumulatorfeld \\(M_2\\) zu diesem Zeitpunkt exakt besitzen?</p>`,
        answers: [
          { value: 90.0, tolerance: 0.1, fraction: 100, feedback: 'Exakt! Da s = 3.0 K => Stichprobenvarianz s^2 = 9.0 K^2. Aus s^2 = M2 / (k - 1) folgt M2 = s^2 * (11 - 1) = 9.0 * 10 = 90.0 K^2.' },
          { value: 99.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: Sie haben mit k = 11 statt mit (k - 1) = 10 multipliziert (9.0 * 11 = 99.0).' },
          { value: 30.0, tolerance: 0.1, fraction: 50, feedback: 'Teilpunkte: Sie haben s * (k - 1) = 3.0 * 10 = 30.0 gerechnet (Quadrieren der Standardabweichung zu s^2 = 9.0 vergessen!).' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> Aus \\(s = \\sqrt{\\frac{M_2}{k - 1}} = 3{,}0\\,\\text{K}\\) folgt durch Quadrieren \\(s^2 = \\frac{M_2}{k - 1} = 9{,}0\\,\\text{K}^2\\). Multiplikation mit \\(k - 1 = 11 - 1 = 10\\) ergibt \\(M_2 = 9{,}0 \\cdot 10 = 90{,}0\\,\\text{K}^2\\).</p>`
      },
      {
        id: 'Q02_T10_Q3',
        title: 'C#-Code-Tracing: Einheitsnormalenvektor eines schrägen Stabs (3-4-5-Dreieck)',
        shortSummary: 'C#-Tracing: Normalenvektor-Komponente',
        type: 'numerical',
        grade: 1.5,
        text: `<p>Für einen schrägen Fachwerkstab von <code>(100, 100)</code> nach <code>(160, 180)</code> im Screen Space wird der Einheitsnormalenvektor <code>(nx, ny)</code> berechnet:</p>
<pre><code class="language-csharp">double dx = 160.0 - 100.0; // 60.0
double dy = 180.0 - 100.0; // 80.0
double len = Math.Sqrt(dx * dx + dy * dy);
double ux = dx / len;
double uy = dy / len;
double nx = -uy;</code></pre>
<p>Welchen numerischen Wert (als Dezimalzahl) erhält <code>nx</code>?</p>`,
        answers: [
          { value: -0.8, tolerance: 0.01, fraction: 100, feedback: 'Richtig! len = sqrt(60^2 + 80^2) = sqrt(3600 + 6400) = 100.0; uy = 80.0 / 100.0 = 0.8; nx = -uy = -0.8.' },
          { value: 0.8, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte: Vorzeichenfehler! nx ist als -uy = -0.8 definiert.' },
          { value: 0.6, tolerance: 0.01, fraction: 50, feedback: 'Teilpunkte: 0.6 ist die Komponente ux = dx / len = 60 / 100 (bzw. ny), gefragt war aber nx = -uy = -0.8.' }
        ],
        generalFeedback: `<p><strong>Musterherleitung:</strong> Mit \\(dx = 60\\) und \\(dy = 80\\) beträgt die Länge \\(\\text{len} = \\sqrt{60^2 + 80^2} = 100\\). Damit ist \\(u_x = 0{,}6\\), \\(u_y = 0{,}8\\) und die X-Komponente des Normalenvektors \\(n_x = -u_y = -0{,}8\\).</p>`
      },
      {
        id: 'Q02_T10_Q4',
        title: 'C#-Code-Lückentext: Box-Whisker-Plot-Element in ScottPlot 5 konfigurieren',
        shortSummary: 'C# ScottPlot 5 Box-Objekt befüllen',
        type: 'gapselect',
        grade: 1.0,
        text: `<p>Vervollständigen Sie den C#-Code zum Anlegen einer einzelnen Box (Median <code>50</code>, Quartile <code>40</code> und <code>60</code>, Antennen <code>25</code> bis <code>85</code>) für einen <strong>ScottPlot 5</strong> Box-Whisker-Plot:</p>
<pre><code class="language-csharp">var box = new ScottPlot.Box {
    Position = 1,
    BoxMin = [[1]],
    BoxMax = [[2]],
    BoxMiddle = 50,
    WhiskerMin = 25,
    WhiskerMax = 85
};
MainPlot.Plot.Add.[[3]](new[] { box });</code></pre>`,
        choices: [
          { text: '40', group: 1 },
          { text: '60', group: 2 },
          { text: 'Boxes', group: 3 },
          { text: '25', group: 1 },
          { text: '85', group: 1 },
          { text: '40', group: 2 },
          { text: '25', group: 2 },
          { text: 'DataStreamer', group: 3 },
          { text: 'Signal', group: 3 }
        ],
        generalFeedback: `<p><strong>Erklärung:</strong> In <code>ScottPlot.Box</code> definieren <code>BoxMin</code> und <code>BoxMax</code> das 25-%-Quartil (\\(Q_1 = 40\\)) und das 75-%-Quartil (\\(Q_3 = 60\\)), <code>BoxMiddle</code> den Median (<code>50</code>) und <code>WhiskerMin/Max</code> die Antennenenden. Hinzugefügt wird die Liste über <code>Plot.Add.Boxes(...)</code>.</p>`
      },
      {
        id: 'Q02_T10_Q5',
        title: 'Konzept-Zuordnung: WPF-Vektorgrafik-Elemente und Eigenschaften (Kapitel 03)',
        shortSummary: 'WPF-Vektorgrafik-Eigenschaften zuordnen',
        type: 'matching',
        grade: 1.0,
        text: `<p>Ordnen Sie den vier WPF-Eigenschaften bzw. Klassen aus Kapitel 03 jeweils ihre technische Funktion beim Zeichnen von 2D-Vektorgrafiken zu (beachten Sie die zwei Überhang-Distraktoren).</p>`,
        subquestions: [
          { text: 'StrokeDashArray = new DoubleCollection { 4, 2 }', answer: 'Erzeugt ein gestricheltes Linienmuster (4 Einheiten Strich, 2 Einheiten Lücke) für Hilfslinien oder Symmetrieachsen' },
          { text: 'Panel.SetZIndex(uiElement, 10)', answer: 'Steuert die Zeichenreihenfolge (Tiefenebene) im Canvas, damit Knoten und Bemaßungen vor den Stäben liegen' },
          { text: 'Canvas.SetLeft(element, x - radius) und Canvas.SetTop(element, y - radius)', answer: 'Positioniert ein kreisförmiges Knoten-Ellipse-Element zentriert auf dem berechneten Screen-Punkt (x, y)' },
          { text: 'RenderTransform = new RotateTransform(angleDeg, centerX, centerY)', answer: 'Dreht einen Bemaßungs-TextBlock im Screen Space exakt parallel zur Neigung des zugehörigen Stabs' },
          { text: '', answer: 'Aktiviert den 3D-Tiefenpuffer (GL_DEPTH_TEST) der Grafikkarte für Dreiecksnetze' },
          { text: '', answer: 'Berechnet die numerische Cholesky-Zerlegung der globalen Steifigkeitsmatrix' }
        ],
        generalFeedback: `<p><strong>Lösung:</strong> <code>StrokeDashArray</code> steuert Strichelungen, <code>Panel.ZIndex</code> die Überdeckungsreihenfolge (z. B. Stäbe hinten, Knoten/Texte vorne), <code>SetLeft/Top</code> mit <code>-radius</code> zentriert Kreise und <code>RotateTransform</code> richtet Maßzahlen aus.</p>`
      },
      {
        id: 'Q02_T10_Q6',
        title: 'WPF-Koordinaten: Geräteunabhängige Pixel (DIP) und High-DPI-Skalierung',
        shortSummary: 'WPF Device Independent Pixels (DIP, 96 DPI)',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Warum bleiben eine im WPF-Canvas gezeichnete Vektorlinie mit <code>StrokeThickness = 2.0</code> und eine Schriftgröße von <code>12.0</code> auch auf einem hochauflösenden 4K-Monitor mit \\(200\\,\\%\\) Windows-Skalierung (\\(192\\,\\text{DPI}\\)) exakt gleich groß und gestochen scharf?</p>`,
        answers: [
          {
            text: 'Weil WPF in geräteunabhängigen Einheiten (1/96 Zoll) rechnet und Vektorgeometrien vor der Rasterisierung automatisch mit dem Monitor-DPI-Faktor multipliziert.',
            fraction: 100,
            feedback: 'Richtig! Eine WPF-Einheit entspricht 1/96 Zoll. Bei 192 DPI (200 % Skalierung) rendert die Vektor-Engine eine Linie der Dicke 2.0 DIP automatisch mit 4 physischen Monitorpixeln.'
          },
          {
            text: 'Weil WPF auf 4K-Monitoren die Bildschirmauflösung der Grafikkarte beim Programmstart zwangsweise auf Full-HD (1920 x 1080) herunterstellt.',
            fraction: 0,
            feedback: 'Falsch. WPF ändert niemals die native Bildschirmauflösung des Betriebssystems.'
          },
          {
            text: 'Weil Canvas-Elemente intern als komprimierte JPEG-Bitmaps gespeichert werden, die ein neuronales Netz im Grafiktreiber nachschärft.',
            fraction: 0,
            feedback: 'Falsch. WPF Canvas speichert echte mathematische Vektorbeschreibungen, keine JPEG-Bitmaps.'
          },
          {
            text: 'Weil die Eigenschaft ActualWidth eines Canvas die physische Monitorbreite in Zentimetern über die Webcam des Laptops optisch vermisst.',
            fraction: 0,
            feedback: 'Falsch. Die Umrechnung basiert rein auf dem im Betriebssystem hinterlegten DPI-Skalierungsfaktor (96 DPI Basis).'
          }
        ],
        generalFeedback: `<p><strong>Vorteil von Vektorgrafik (Kap. 03):</strong> Durch die Kombination aus mathematischer Vektorbeschreibung und geräteunabhängigen Einheiten (DIP = \\(1/96\\,\\text{Zoll}\\)) sind WPF-Canvas-Zeichnungen vollständig auflösungsunabhängig.</p>`
      },
      {
        id: 'Q02_T10_Q7',
        title: 'C#-Bug-Diagnose: Dezentrierte Knotenkreise durch fehlenden Radius-Abzug bei Canvas.SetLeft/Top',
        shortSummary: 'Bug-Diagnose: Ellipse ohne -Radius versetzt',
        type: 'multichoice',
        single: true,
        grade: 1.0,
        text: `<p>Ein Studierender zeichnet die Stäbe eines Fachwerks exakt zwischen den Screen-Koordinaten <code>(sx, sy)</code> der Knoten. Anschließend zeichnet er jeden Gelenkknoten als Kreis (<code>Ellipse</code> mit <code>Width = 12, Height = 12</code>) über <code>Canvas.SetLeft(ellipse, sx); Canvas.SetTop(ellipse, sy);</code>. Auf dem Bildschirm hängen alle Knotenkreise schräg rechts unterhalb der Stab-Endpunkte! Warum?</p>`,
        answers: [
          {
            text: 'Canvas.SetLeft und SetTop positionieren die linke obere Ecke der Bounding-Box der Ellipse, weshalb der halbe Durchmesser (Radius 6 px) abgezogen werden muss.',
            fraction: 100,
            feedback: 'Exakt! Damit der Kreismittelpunkt auf (sx, sy) liegt, muss die linke obere Ecke der 12x12-Ellipse auf (sx - 6, sy - 6) gesetzt werden.'
          },
          {
            text: 'Die Klasse Ellipse besitzt in WPF einen Konstruktionsfehler und zeichnet Kreise grundsätzlich um 45 Grad phasenverschoben zum Koordinatenursprung.',
            fraction: 0,
            feedback: 'Falsch. Ellipse arbeitet absolut präzise; Bezugspunkt aller UIElemente im Canvas ist immer deren linke obere Ecke.'
          },
          {
            text: 'Für Kreise müssen Width und Height in WPF negativ angegeben werden, damit der Mittelpunkt automatisch in das Zentrum der Linie wandert.',
            fraction: 0,
            feedback: 'Falsch. Negative Breiten oder Höhen werfen in WPF sofort eine Laufzeit-Exception.'
          },
          {
            text: 'Die Methoden Canvas.SetLeft und SetTop erwarten die Koordinaten in Millimetern statt in Pixeln, während Line.X1 und Y1 in Pixeln arbeiten.',
            fraction: 0,
            feedback: 'Falsch. Sowohl Line.X1/Y1 als auch Canvas.SetLeft/SetTop verwenden exakt dieselben geräteunabhängigen Einheiten (DIP).'
          }
        ],
        generalFeedback: `<p><strong>Merksatz für WPF Canvas:</strong> Während <code>Line.X1/Y1</code> direkt Punktkoordinaten sind, positionieren <code>Canvas.SetLeft(el, x)</code> und <code>Canvas.SetTop(el, y)</code> stets die <strong>linke obere Ecke</strong> des Elements. Für einen zentrierten Kreis vom Radius \\(r\\) gilt daher: <code>SetLeft(el, sx - r)</code> und <code>SetTop(el, sy - r)</code>.</p>`
      },
      {
        id: 'Q02_T10_Q8',
        title: 'Systemanalyse: Entkopplung von Datenmodell, Layout-Mathematik und UI-Rendering',
        shortSummary: 'Architektur-Trennung Modell / Layout / UI',
        type: 'multichoice',
        single: false,
        grade: 1.0,
        text: `<p>Welche <strong>zwei</strong> Software-Architekturprinzipien aus Kapitel 03 und 04 sorgen für wartbare, testbare und ruckelfreie Simulationsanwendungen?</p>`,
        answers: [
          {
            text: 'Das physikalische Domänenmodell speichert alle Größen ausschließlich in SI-Einheiten (Meter, Newton, Kelvin) und kennt keinerlei Pixel- oder Canvas-Klassen.',
            fraction: 50,
            feedback: 'Richtig! Durch die strikte Trennung von World Space (Domänenmodell) und Screen Space (View/Transform2D) bleibt die Physik unabhängig von der Fenstergröße.'
          },
          {
            text: 'Bei Fenstergrößenänderungen (SizeChanged) wird nur die Transformationsvorschrift (Transform2D) aktualisiert und neu gezeichnet, ohne die Simulation neu zu rechnen.',
            fraction: 50,
            feedback: 'Richtig! Ein Resize des Anwendungsfensters ändert nur die Projektion auf den Bildschirm (View), nicht aber den physikalischen Zustand des Digitalen Zwillings.'
          },
          {
            text: 'Die Knoten-Koordinaten im physikalischen Berechnungsmodell müssen bei jedem Zoomen direkt mit dem aktuellen Pixelmaßstab überschrieben werden.',
            fraction: -50,
            feedback: 'Falsch! Würde man die Modellkoordinaten beim Zoomen mit Pixelwerten überschreiben, würden sich alle Stablängen und Steifigkeiten im Physik-Löser verfälschen.'
          },
          {
            text: 'Statistische Kennwerte wie der Welford-Mittelwert dürfen nur durch Auslesen der Bildschirm-Pixelfarben aus der fertigen Grafik-Bitmap ermittelt werden.',
            fraction: -50,
            feedback: 'Falsch! Statistik wird präzise auf den numerischen double-Rohdaten im Datenmodell berechnet, niemals aus gerasterten Bildschirm-Pixeln.'
          }
        ],
        generalFeedback: `<p><strong>Zusammenfassung:</strong> Saubere Simulationsarchitektur trennt das <strong>physikalische Modell</strong> (World Space, SI-Einheiten, Welford-Statistik) strikt von der <strong>Darstellungsschicht</strong> (<code>Transform2D</code>, <code>Canvas</code>, <code>ScottPlot 5</code>).</p>`
      }
    ]
  }
];

exportMoodleQuiz(quizMeta, testsData);

