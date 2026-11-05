/**
 * Generator für die didaktischen SVG-Grafiken in Kapitel 04
 * Erzeugt großflächige Übersichtsgrafiken (1110x470) sowie reine, textblockfreie
 * visuelle Illustrationen (480x380) für zweispaltige Folien.
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'Folien', '04_Visualisierung_2D_Diagramme', 'Diagramme');
fs.mkdirSync(outDir, { recursive: true });

function writeSvg(name, content) {
  const filePath = path.join(outDir, name);
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('Generated:', name);
}

// 1. Großflächig (1110x470): 3-Schichten-Architektur der 2D-Visualisierung
writeSvg('Architektur_3Schichten.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1110 470" width="1110" height="470">
  <defs>
    <style>
      .layer-title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 19px; font-weight: bold; }
      .box-title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 17px; font-weight: bold; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: 600; text-anchor: middle; }
      .tag { font-family: 'Consolas', monospace; font-size: 14.5px; font-weight: bold; text-anchor: middle; }
    </style>
    <marker id="arr-up" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#475569" />
    </marker>
    <marker id="arr-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#2563eb" />
    </marker>
  </defs>

  <!-- Schicht 3 (Oben): Termin 04 - Diagramm- & Graph-Bibliotheken -->
  <rect x="20" y="12" width="1070" height="142" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5" />
  <text x="45" y="42" class="layer-title" fill="#1d4ed8">Schicht 3 (Termin 04): Spezialisierte Diagramm- &amp; Graph-Bibliotheken</text>

  <!-- ScottPlot Box -->
  <rect x="45" y="56" width="640" height="84" rx="8" fill="#ffffff" stroke="#60a5fa" stroke-width="2" />
  <text x="195" y="88" class="box-title" fill="#1e40af">ScottPlot 5 (WpfPlot)</text>
  <text x="195" y="116" class="lbl" fill="#475569">Achsen, Ticks, Legenden, AutoScale, Zoom</text>
  <!-- Mini Plot Icons inside ScottPlot Box -->
  <g transform="translate(380, 64)">
    <rect x="0" y="0" width="135" height="68" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
    <polyline points="12,46 38,18 65,34 95,12 122,24" fill="none" stroke="#2563eb" stroke-width="3" />
    <text x="67" y="61" class="tag" fill="#1d4ed8">Signal / Scatter</text>
  </g>
  <g transform="translate(530, 64)">
    <rect x="0" y="0" width="135" height="68" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
    <rect x="18" y="10" width="24" height="30" fill="#3b82f6" />
    <rect x="44" y="10" width="24" height="30" fill="#f59e0b" />
    <rect x="70" y="10" width="24" height="30" fill="#ef4444" />
    <rect x="96" y="10" width="24" height="30" fill="#10b981" />
    <text x="67" y="61" class="tag" fill="#d97706">Heatmap</text>
  </g>

  <!-- MSAGL Box -->
  <rect x="715" y="56" width="350" height="84" rx="8" fill="#ffffff" stroke="#34d399" stroke-width="2" />
  <text x="890" y="88" class="box-title" fill="#047857">MSAGL (GraphControl)</text>
  <text x="890" y="116" class="lbl" fill="#475569">Sugiyama &amp; Force-Directed Layout</text>

  <!-- Kurze Verbindungspfeile im Zwischenraum Schicht 2 -> Schicht 3 -->
  <line x1="290" y1="192" x2="290" y2="158" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arr-blue)" />
  <line x1="890" y1="192" x2="890" y2="158" stroke="#475569" stroke-width="3.5" marker-end="url(#arr-up)" />

  <!-- Schicht 2 (Mitte): Termin 03 - 2D-Vektorgrafik & Canvas -->
  <rect x="20" y="194" width="1070" height="122" rx="12" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <text x="45" y="224" class="layer-title" fill="#15803d">Schicht 2 (Termin 03): 2D-Vektorgrafik &amp; Koordinatentransformation</text>

  <rect x="45" y="238" width="490" height="64" rx="8" fill="#ffffff" stroke="#86efac" stroke-width="1.8" />
  <text x="290" y="264" class="box-title" fill="#166534">Immediate-Mode Vektorpfade (SKCanvas / DrawingVisual)</text>
  <text x="290" y="290" class="tag" fill="#15803d">DrawLine() · DrawPath() · DrawRect()</text>

  <rect x="565" y="238" width="500" height="64" rx="8" fill="#ffffff" stroke="#86efac" stroke-width="1.8" />
  <text x="815" y="264" class="box-title" fill="#166534">Retained-Mode Szenengraph (WPF Canvas &amp; Shapes)</text>
  <text x="815" y="290" class="tag" fill="#15803d">Path · Rectangle · Ellipse · Hit-Testing</text>

  <!-- Kurze Verbindungspfeile im Zwischenraum Schicht 1 -> Schicht 2 -->
  <line x1="290" y1="350" x2="290" y2="320" stroke="#475569" stroke-width="3.5" marker-end="url(#arr-up)" />
  <line x1="815" y1="350" x2="815" y2="320" stroke="#475569" stroke-width="3.5" marker-end="url(#arr-up)" />

  <!-- Schicht 1 (Unten): Termin 02 - Raw Pixel Puffer -->
  <rect x="20" y="352" width="1070" height="106" rx="12" fill="#fffbeb" stroke="#d97706" stroke-width="2" />
  <text x="45" y="382" class="layer-title" fill="#b45309">Schicht 1 (Termin 02): Raw-Pixel-Speicher &amp; Rastergrafik</text>

  <rect x="45" y="394" width="1020" height="50" rx="8" fill="#ffffff" stroke="#fcd34d" stroke-width="1.8" />
  <text x="555" y="425" class="box-title" fill="#92400e">Flacher 32-Bit-Pixelpuffer im RAM (WriteableBitmap.BackBuffer / SKBitmap · uint[] argb)</text>
</svg>
`);

// 2. Reine Illustration (480x380): Simulationsdaten -> 4 Visualisierungsformen
writeSvg('Simulationsdaten_Ueberblick.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; }
      .sub { font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; text-anchor: middle; }
    </style>
  </defs>

  <!-- Q1: Zeitreihe x(t) -->
  <rect x="15" y="15" width="215" height="165" rx="10" fill="#f8fafc" stroke="#93c5fd" stroke-width="2" />
  <text x="122" y="40" class="hdr" fill="#1d4ed8">1. Zeitreihen x(t)</text>
  <line x1="35" y1="145" x2="205" y2="145" stroke="#64748b" stroke-width="2" />
  <line x1="35" y1="55" x2="35" y2="145" stroke="#64748b" stroke-width="2" />
  <line x1="35" y1="85" x2="205" y2="85" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
  <path d="M 35 140 C 55 50, 75 125, 95 75 C 115 95, 135 80, 200 85" fill="none" stroke="#2563eb" stroke-width="3" />
  <text x="122" y="168" class="sub" fill="#334155">Signal / SignalXY</text>

  <!-- Q2: Phasenraum (x1, x2) -->
  <rect x="250" y="15" width="215" height="165" rx="10" fill="#f8fafc" stroke="#fdba74" stroke-width="2" />
  <text x="357" y="40" class="hdr" fill="#c2410c">2. Zustandsraum</text>
  <line x1="275" y1="102" x2="440" y2="102" stroke="#cbd5e1" stroke-width="1.5" />
  <line x1="357" y1="55" x2="357" y2="148" stroke="#cbd5e1" stroke-width="1.5" />
  <path d="M 425 102 C 425 145, 295 145, 305 102 C 312 68, 395 68, 388 102 C 383 122, 335 122, 342 102 C 346 92, 365 92, 357 102" fill="none" stroke="#ea580c" stroke-width="3" />
  <circle cx="357" cy="102" r="4.5" fill="#dc2626" />
  <text x="357" y="168" class="sub" fill="#334155">Scatter / VectorField</text>

  <!-- Q3: Statistik & Felder -->
  <rect x="15" y="200" width="215" height="165" rx="10" fill="#f8fafc" stroke="#86efac" stroke-width="2" />
  <text x="122" y="225" class="hdr" fill="#15803d">3. Statistik &amp; Felder</text>
  <line x1="35" y1="330" x2="205" y2="330" stroke="#64748b" stroke-width="2" />
  <rect x="50" y="305" width="22" height="25" fill="#60a5fa" />
  <rect x="78" y="275" width="22" height="55" fill="#3b82f6" />
  <rect x="106" y="250" width="22" height="80" fill="#2563eb" />
  <rect x="134" y="280" width="22" height="50" fill="#3b82f6" />
  <rect x="162" y="310" width="22" height="20" fill="#60a5fa" />
  <path d="M 42 328 Q 117 215 192 328" fill="none" stroke="#dc2626" stroke-width="2.5" />
  <text x="122" y="353" class="sub" fill="#334155">Bars / Box / Heatmap</text>

  <!-- Q4: Topologie G=(V,E) -->
  <rect x="250" y="200" width="215" height="165" rx="10" fill="#f8fafc" stroke="#c4b5fd" stroke-width="2" />
  <text x="357" y="225" class="hdr" fill="#6d28d9">4. Systemtopologie</text>
  <line x1="305" y1="270" x2="365" y2="270" stroke="#475569" stroke-width="2.5" />
  <line x1="385" y1="270" x2="425" y2="270" stroke="#475569" stroke-width="2.5" />
  <path d="M 410 285 L 410 318 L 290 318 L 290 285" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,3" />
  <rect x="270" y="254" width="44" height="32" rx="5" fill="#ede9fe" stroke="#7c3aed" stroke-width="2" />
  <rect x="335" y="254" width="44" height="32" rx="5" fill="#ede9fe" stroke="#7c3aed" stroke-width="2" />
  <rect x="400" y="254" width="44" height="32" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
  <text x="357" y="353" class="sub" fill="#334155">MSAGL Graph</text>
</svg>
`);

// 2a. Reine Illustration (570x380): SkiaSharp Grundbausteine (SKPath, SKBitmap -> SKCanvas)
writeSvg('SkiaSharp_Grundbausteine_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15.5px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 13.5px; font-weight: bold; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13.5px; font-weight: 600; text-anchor: middle; }
    </style>
    <marker id="sk-arr-b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#2563eb" />
    </marker>
    <marker id="sk-arr-o" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#d97706" />
    </marker>
  </defs>

  <!-- Links oben: SKPath (Vektorpfad) -->
  <rect x="15" y="15" width="218" height="190" rx="10" fill="#eff6ff" stroke="#60a5fa" stroke-width="2" />
  <text x="124" y="40" class="hdr" fill="#1d4ed8">1. SKPath (Vektorpfad)</text>
  <rect x="32" y="54" width="184" height="92" rx="6" fill="#ffffff" stroke="#93c5fd" stroke-width="1.5" />
  <polyline points="48,125 88,72 135,108 175,68 198,92" fill="none" stroke="#2563eb" stroke-width="3.5" />
  <circle cx="48" cy="125" r="4.5" fill="#1d4ed8" />
  <circle cx="88" cy="72" r="4.5" fill="#1d4ed8" />
  <circle cx="135" cy="108" r="4.5" fill="#1d4ed8" />
  <circle cx="175" cy="68" r="4.5" fill="#1d4ed8" />
  <circle cx="198" cy="92" r="4.5" fill="#1d4ed8" />
  <text x="124" y="168" class="code" fill="#1e3a8a">MoveTo / LineTo / Close</text>
  <text x="124" y="190" class="sub" fill="#475569">Wie Termin 03 (Vektor)</text>

  <!-- Rechts oben: SKBitmap (Raw-Pixel-Puffer) -->
  <rect x="247" y="15" width="218" height="190" rx="10" fill="#fffbeb" stroke="#fbbf24" stroke-width="2" />
  <text x="356" y="40" class="hdr" fill="#b45309">2. SKBitmap (Pixel-Array)</text>
  <rect x="264" y="54" width="184" height="92" rx="6" fill="#ffffff" stroke="#fcd34d" stroke-width="1.5" />
  <!-- 4x2 Pixel-Matrix -->
  <g transform="translate(284, 66)">
    <rect x="0" y="0" width="34" height="32" fill="#3b82f6" />
    <rect x="36" y="0" width="34" height="32" fill="#10b981" />
    <rect x="72" y="0" width="34" height="32" fill="#f59e0b" />
    <rect x="108" y="0" width="34" height="32" fill="#ef4444" />
    <rect x="0" y="34" width="34" height="32" fill="#60a5fa" />
    <rect x="36" y="34" width="34" height="32" fill="#34d399" />
    <rect x="72" y="34" width="34" height="32" fill="#fbbf24" />
    <rect x="108" y="34" width="34" height="32" fill="#f87171" />
  </g>
  <text x="356" y="168" class="code" fill="#92400e">32-Bit Pixel (uint[])</text>
  <text x="356" y="190" class="sub" fill="#475569">1:1 wie WriteableBitmap</text>

  <!-- Pfeile nach unten in SKCanvas -->
  <line x1="124" y1="205" x2="124" y2="238" stroke="#2563eb" stroke-width="3" marker-end="url(#sk-arr-b)" />
  <line x1="356" y1="205" x2="356" y2="238" stroke="#d97706" stroke-width="3" marker-end="url(#sk-arr-o)" />

  <!-- Unten: SKCanvas (Immediate-Mode Zeichenfläche) -->
  <rect x="15" y="245" width="450" height="120" rx="10" fill="#f0fdf4" stroke="#4ade80" stroke-width="2.5" />
  <text x="240" y="274" class="hdr" fill="#15803d">3. SKCanvas (Immediate-Mode Zeichenfläche in WpfPlot)</text>
  <rect x="35" y="288" width="410" height="34" rx="6" fill="#ffffff" stroke="#86efac" stroke-width="1.5" />
  <text x="240" y="310" class="code" fill="#166534">DrawPath(SKPath)  &#183;  DrawBitmap(SKBitmap)</text>
  <text x="240" y="348" class="sub" fill="#15803d">Rendert bei Refresh() direkt in 1 Bild (0 WPF-Shape-Objekte!)</text>
</svg>
`);

// 2b. Reine Illustration (570x380): Scatter Zeichenlogik (O(N) Sequenz, Rücklauf in x, Linien vs. Punktwolke)
writeSvg('Scatter_Zeichenlogik_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15.5px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 13.5px; font-weight: bold; text-anchor: middle; }
      .idx { font-family: 'Consolas', monospace; font-size: 13px; font-weight: bold; }
    </style>
    <marker id="sc-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#2563eb" />
    </marker>
    <marker id="sc-back" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#dc2626" />
    </marker>
  </defs>

  <!-- Oben: Sequenzieller SKPath über alle N Punkte in O(N) -->
  <rect x="15" y="12" width="450" height="190" rx="10" fill="#f8fafc" stroke="#93c5fd" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1d4ed8">1. Sequenzielle Pfad-Konstruktion (SKPath) in O(N)</text>

  <line x1="45" y1="168" x2="435" y2="168" stroke="#64748b" stroke-width="2" />
  <line x1="45" y1="52" x2="45" y2="168" stroke="#64748b" stroke-width="2" />

  <!-- Phasenraum-Trajektorie mit Rücklauf in x -->
  <line x1="65" y1="155" x2="145" y2="75" stroke="#2563eb" stroke-width="3" marker-end="url(#sc-arr)" />
  <line x1="155" y1="72" x2="295" y2="78" stroke="#2563eb" stroke-width="3" marker-end="url(#sc-arr)" />
  <line x1="305" y1="82" x2="365" y2="142" stroke="#2563eb" stroke-width="3" marker-end="url(#sc-arr)" />
  <line x1="362" y1="148" x2="225" y2="115" stroke="#dc2626" stroke-width="3" marker-end="url(#sc-back)" />

  <circle cx="65" cy="155" r="5.5" fill="#1d4ed8" />
  <text x="82" y="158" class="idx" fill="#1e40af">[0]</text>
  <circle cx="150" cy="72" r="5.5" fill="#1d4ed8" />
  <text x="148" y="60" class="idx" fill="#1e40af">[1]</text>
  <circle cx="302" cy="78" r="5.5" fill="#1d4ed8" />
  <text x="302" y="64" class="idx" fill="#1e40af">[2]</text>
  <circle cx="370" cy="146" r="5.5" fill="#1d4ed8" />
  <text x="392" y="152" class="idx" fill="#1e40af">[3]</text>
  <circle cx="215" cy="112" r="6.5" fill="#dc2626" stroke="#ffffff" stroke-width="1.5" />
  <rect x="142" y="122" width="146" height="22" rx="4" fill="#ffffff" stroke="#fca5a5" stroke-width="1.2" />
  <text x="215" y="138" class="idx" fill="#dc2626" text-anchor="middle">[4] (x rückwärts!)</text>

  <text x="240" y="192" class="code" fill="#334155">Keine Sortierung von xs &#8594; Voller Durchlauf i = 0 ... N-1</text>

  <!-- Unten: 2 Modi (ScatterLine vs. Reine Punktwolke LineWidth = 0) -->
  <rect x="15" y="214" width="218" height="152" rx="10" fill="#eff6ff" stroke="#60a5fa" stroke-width="2" />
  <text x="124" y="238" class="hdr" fill="#1e40af">Modus A: ScatterLine</text>
  <polyline points="38,315 80,265 135,280 175,255 208,295" fill="none" stroke="#2563eb" stroke-width="3.5" />
  <text x="124" y="335" class="code" fill="#1e3a8a">LineWidth &gt; 0</text>
  <text x="124" y="355" class="code" fill="#475569">MarkerSize = 0</text>

  <rect x="247" y="214" width="218" height="152" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
  <text x="356" y="238" class="hdr" fill="#15803d">Modus B: Punktwolke</text>
  <g fill="#16a34a">
    <circle cx="285" cy="295" r="5.5" />
    <circle cx="315" cy="268" r="5.5" />
    <circle cx="345" cy="305" r="5.5" />
    <circle cx="365" cy="262" r="5.5" />
    <circle cx="395" cy="285" r="5.5" />
    <circle cx="422" cy="270" r="5.5" />
  </g>
  <text x="356" y="335" class="code" fill="#166534">LineWidth = 0</text>
  <text x="356" y="355" class="code" fill="#475569">MarkerSize = 10</text>
</svg>
`);

// 3. Großflächig (1110x470): Signal-Plot Pixelspalten-Lupe (yEnter -> yMin -> yMax -> yExit)
writeSvg('Signal_Pixelspalten_Lupe.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1110 470" width="1110" height="470">
  <defs>
    <style>
      .title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 18px; font-weight: bold; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: bold; }
      .code { font-family: 'Consolas', monospace; font-size: 15px; font-weight: bold; }
    </style>
    <marker id="arr-g" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#16a34a" />
    </marker>
  </defs>

  <!-- Kachel 1: 5.000 Punkte in einer Pixelspalte p -->
  <rect x="15" y="15" width="345" height="440" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="2" />
  <text x="187" y="46" class="title" fill="#b91c1c">1. Naives Zeichnen: 5.000 Linien</text>

  <!-- Pixelspalten-Hintergrund (breit genug für Textabstand) -->
  <rect x="45" y="70" width="285" height="310" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
  <rect x="115" y="70" width="145" height="310" fill="#fee2e2" opacity="0.65" />
  <line x1="115" y1="70" x2="115" y2="380" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,5" />
  <line x1="260" y1="70" x2="260" y2="380" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,5" />
  <text x="187" y="96" class="lbl" fill="#991b1c" text-anchor="middle">Pixelspalte p</text>

  <!-- Dichtes Zickzack in Spalte p -->
  <polyline points="60,240 100,220 135,230 140,180 145,290 150,160 155,310 160,200 165,270 170,115 175,330 180,190 185,350 190,150 195,280 200,170 205,300 210,140 215,260 220,210 225,295 230,185 240,215 280,195 315,210" fill="none" stroke="#dc2626" stroke-width="2" />
  <text x="187" y="418" class="code" fill="#991b1b" text-anchor="middle">Scatter: O(N) Übermalungen</text>

  <!-- Kachel 2: Die 4 Kennwerte pro Pixelspalte in Signal -->
  <rect x="382" y="15" width="345" height="440" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="2" />
  <text x="554" y="46" class="title" fill="#1d4ed8">2. Signal-Reduktion: 4 Eckpunkte</text>

  <rect x="412" y="70" width="285" height="310" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
  <rect x="470" y="70" width="150" height="310" fill="#dbeafe" opacity="0.55" />
  <line x1="470" y1="70" x2="470" y2="380" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="5,5" />
  <line x1="620" y1="70" x2="620" y2="380" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="5,5" />
  <text x="545" y="96" class="lbl" fill="#1e40af" text-anchor="middle">Pixelspalte p</text>

  <!-- Vertikaler Strich yMin bis yMax -->
  <line x1="545" y1="120" x2="545" y2="345" stroke="#2563eb" stroke-width="7" stroke-linecap="round" />

  <!-- 4 Schlüsselpunkte: yEnter, yMax, yMin, yExit -->
  <circle cx="485" cy="230" r="6.5" fill="#16a34a" stroke="#ffffff" stroke-width="2" />
  <text x="462" y="235" class="code" fill="#15803d" text-anchor="end">yEnter</text>

  <circle cx="545" cy="120" r="6.5" fill="#dc2626" stroke="#ffffff" stroke-width="2" />
  <text x="562" y="125" class="code" fill="#dc2626" text-anchor="start">yMax</text>

  <circle cx="545" cy="345" r="6.5" fill="#dc2626" stroke="#ffffff" stroke-width="2" />
  <text x="562" y="350" class="code" fill="#dc2626" text-anchor="start">yMin</text>

  <circle cx="605" cy="215" r="6.5" fill="#d97706" stroke="#ffffff" stroke-width="2" />
  <text x="628" y="242" class="code" fill="#b45309" text-anchor="start">yExit</text>

  <!-- Übergang zur Nachbarspalte p+1 -->
  <circle cx="660" cy="145" r="6.5" fill="#16a34a" stroke="#ffffff" stroke-width="2" />
  <line x1="605" y1="215" x2="653" y2="152" stroke="#16a34a" stroke-width="3" marker-end="url(#arr-g)" />

  <text x="554" y="418" class="code" fill="#1e40af" text-anchor="middle">yEnter &#8594; yMin &#8594; yMax &#8594; yExit</text>

  <!-- Kachel 3: Nachbarspalten-Verbindung ohne Aliasing -->
  <rect x="750" y="15" width="345" height="440" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
  <text x="922" y="46" class="title" fill="#15803d">3. Ergebnis: Exakte Hüllkurve</text>

  <rect x="780" y="70" width="285" height="310" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />

  <!-- Vertikale Spalten-Balken + Verbindungsbrücken -->
  <path d="M 800,250 L 800,220 L 800,275 L 800,240 L 840,235 L 840,210 L 840,265 L 840,230 L 880,220 L 880,105 L 880,270 L 880,245 L 920,240 L 920,215 L 920,280 L 920,250 L 960,245 L 960,190 L 960,295 L 960,235 L 1000,230 L 1000,210 L 1000,265 L 1000,240 L 1040,235 L 1040,215 L 1040,260" fill="none" stroke="#2563eb" stroke-width="3.5" stroke-linejoin="round" />
  <!-- Hervorhebung Peak-Spalte -->
  <line x1="880" y1="105" x2="880" y2="270" stroke="#16a34a" stroke-width="6" stroke-linecap="round" />
  <circle cx="880" cy="105" r="6.5" fill="#dc2626" />
  <text x="900" y="110" class="lbl" fill="#dc2626">Peak erhalten!</text>

  <text x="922" y="418" class="code" fill="#166534" text-anchor="middle">Max. 4·W Punkte auf GPU: O(W)</text>
</svg>
`);

// 4. Reine Illustration (480x380): Scatter vs. Signal Speicher & Indexierung
writeSvg('Scatter_vs_Signal_Speicher.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; }
      .cell { font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; text-anchor: middle; }
      .math { font-family: 'Consolas', monospace; font-size: 14.5px; font-weight: bold; text-anchor: middle; }
    </style>
  </defs>

  <!-- Oben: Scatter (2 Arrays: xs und ys) -->
  <rect x="15" y="15" width="450" height="160" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="2" />
  <text x="30" y="42" class="hdr" fill="#b91c1c">Scatter(xs, ys) — 2 Arrays im RAM (2·N)</text>

  <!-- xs Array -->
  <text x="52" y="78" class="cell" fill="#991b1b">xs:</text>
  <g transform="translate(80, 56)">
    <rect x="0" y="0" width="68" height="32" fill="#ffffff" stroke="#ef4444" stroke-width="1.5" />
    <text x="34" y="21" class="cell" fill="#334155">t_0</text>
    <rect x="68" y="0" width="68" height="32" fill="#ffffff" stroke="#ef4444" stroke-width="1.5" />
    <text x="102" y="21" class="cell" fill="#334155">0.01</text>
    <rect x="136" y="0" width="68" height="32" fill="#ffffff" stroke="#ef4444" stroke-width="1.5" />
    <text x="170" y="21" class="cell" fill="#334155">t_i</text>
    <rect x="204" y="0" width="68" height="32" fill="#ffffff" stroke="#ef4444" stroke-width="1.5" />
    <text x="238" y="21" class="cell" fill="#334155">0.03</text>
    <rect x="272" y="0" width="85" height="32" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
    <text x="314" y="21" class="cell" fill="#991b1b">... N</text>
  </g>

  <!-- ys Array -->
  <text x="52" y="122" class="cell" fill="#991b1b">ys:</text>
  <g transform="translate(80, 100)">
    <rect x="0" y="0" width="68" height="32" fill="#ffffff" stroke="#ef4444" stroke-width="1.5" />
    <text x="34" y="21" class="cell" fill="#334155">1.24</text>
    <rect x="68" y="0" width="68" height="32" fill="#ffffff" stroke="#ef4444" stroke-width="1.5" />
    <text x="102" y="21" class="cell" fill="#334155">1.85</text>
    <rect x="136" y="0" width="68" height="32" fill="#ffffff" stroke="#ef4444" stroke-width="1.5" />
    <text x="170" y="21" class="cell" fill="#334155">2.10</text>
    <rect x="204" y="0" width="68" height="32" fill="#ffffff" stroke="#ef4444" stroke-width="1.5" />
    <text x="238" y="21" class="cell" fill="#334155">1.92</text>
    <rect x="272" y="0" width="85" height="32" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
    <text x="314" y="21" class="cell" fill="#991b1b">... N</text>
  </g>
  <text x="240" y="160" class="math" fill="#991b1b">Kompletter Schleifendurchlauf: O(N)</text>

  <!-- Unten: Signal (1 Array ys + Skalar dt) -->
  <rect x="15" y="195" width="450" height="170" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
  <text x="30" y="222" class="hdr" fill="#15803d">Signal(ys) — Nur 1 Array + Skalar dt (1·N)</text>

  <!-- Skalar Box -->
  <rect x="30" y="240" width="115" height="58" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />
  <text x="87" y="264" class="cell" fill="#166534">Period dt</text>
  <text x="87" y="286" class="cell" fill="#15803d">XOffset t_0</text>

  <!-- ys Array -->
  <g transform="translate(160, 253)">
    <rect x="0" y="0" width="58" height="34" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" />
    <text x="29" y="22" class="cell" fill="#334155">1.24</text>
    <rect x="58" y="0" width="58" height="34" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" />
    <text x="87" y="22" class="cell" fill="#334155">1.85</text>
    <rect x="116" y="0" width="58" height="34" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5" />
    <text x="145" y="22" class="cell" fill="#15803d">ys[i]</text>
    <rect x="174" y="0" width="58" height="34" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" />
    <text x="203" y="22" class="cell" fill="#334155">1.92</text>
    <rect x="232" y="0" width="58" height="34" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" />
    <text x="261" y="22" class="cell" fill="#15803d">... N</text>
  </g>

  <rect x="30" y="314" width="420" height="36" rx="6" fill="#ffffff" stroke="#86efac" stroke-width="1.5" />
  <text x="240" y="338" class="math" fill="#166534">Direktzugriff in O(1): (t_i - t_0) / dt</text>
</svg>
`);

// 5. Reine Illustration (570x380): SignalXY Binärsuche mit konkreten Zahlenwerten in 3 Schritten
writeSvg('SignalXY_Binaersuche_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: bold; text-anchor: middle; }
      .step { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; font-weight: bold; }
      .val { font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; text-anchor: middle; }
      .idx { font-family: 'Consolas', monospace; font-size: 12.5px; font-weight: bold; text-anchor: middle; }
    </style>
  </defs>

  <!-- Kopfbereich: Suchauftrag -->
  <rect x="-25" y="10" width="530" height="38" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
  <text x="240" y="35" class="hdr" fill="#1d4ed8">Gesucht in xs[0..7]: Start-Index für Zoom-Grenze t_min = 0.20 s</text>

  <!-- SCHRITT 1 -->
  <rect x="-25" y="58" width="530" height="96" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="-10" y="80" class="step" fill="#1e40af">1. Schritt: Mitte [3] prüfen &#8594; 0.08 &lt; 0.20 (zu klein &#8594; [0..3] fällt weg!)</text>

  <g transform="translate(-12, 92)">
    <!-- [0..2] fällt weg -->
    <rect x="0"   y="0" width="60" height="34" fill="#fee2e2" stroke="#f87171" stroke-width="1.5" />
    <text x="30"  y="22" class="val" fill="#991b1b">0.00</text>
    <text x="30"  y="50" class="idx" fill="#991b1b">[0]</text>

    <rect x="63"  y="0" width="60" height="34" fill="#fee2e2" stroke="#f87171" stroke-width="1.5" />
    <text x="93"  y="22" class="val" fill="#991b1b">0.01</text>
    <text x="93"  y="50" class="idx" fill="#991b1b">[1]</text>

    <rect x="126" y="0" width="60" height="34" fill="#fee2e2" stroke="#f87171" stroke-width="1.5" />
    <text x="156" y="22" class="val" fill="#991b1b">0.03</text>
    <text x="156" y="50" class="idx" fill="#991b1b">[2]</text>

    <!-- [3] Geprüfte Mitte -->
    <rect x="189" y="0" width="60" height="34" fill="#fef3c7" stroke="#d97706" stroke-width="2.5" />
    <text x="219" y="22" class="val" fill="#b45309">0.08</text>
    <text x="219" y="50" class="idx" fill="#b45309">[3] &lt;</text>

    <!-- [4..7] Verbleibende rechte Hälfte -->
    <rect x="252" y="0" width="60" height="34" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
    <text x="282" y="22" class="val" fill="#1e40af">0.20</text>
    <text x="282" y="50" class="idx" fill="#1e40af">[4]</text>

    <rect x="315" y="0" width="60" height="34" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
    <text x="345" y="22" class="val" fill="#1e40af">0.42</text>
    <text x="345" y="50" class="idx" fill="#1e40af">[5]</text>

    <rect x="378" y="0" width="60" height="34" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
    <text x="408" y="22" class="val" fill="#1e40af">0.85</text>
    <text x="408" y="50" class="idx" fill="#1e40af">[6]</text>

    <rect x="441" y="0" width="60" height="34" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
    <text x="471" y="22" class="val" fill="#1e40af">1.50</text>
    <text x="471" y="50" class="idx" fill="#1e40af">[7]</text>
  </g>

  <!-- SCHRITT 2 -->
  <rect x="-25" y="164" width="530" height="96" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="-10" y="186" class="step" fill="#b45309">2. Schritt: Neue Mitte [5] prüfen &#8594; 0.42 &gt; 0.20 (zu groß &#8594; [5..7] fällt weg!)</text>

  <g transform="translate(-12, 198)">
    <!-- [0..3] bereits ausgeschlossen -->
    <rect x="0"   y="0" width="60" height="34" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="30"  y="22" class="val" fill="#94a3b8">0.00</text>
    <rect x="63"  y="0" width="60" height="34" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="93"  y="22" class="val" fill="#94a3b8">0.01</text>
    <rect x="126" y="0" width="60" height="34" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="156" y="22" class="val" fill="#94a3b8">0.03</text>
    <rect x="189" y="0" width="60" height="34" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="219" y="22" class="val" fill="#94a3b8">0.08</text>

    <!-- [4] bleibt übrig -->
    <rect x="252" y="0" width="60" height="34" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
    <text x="282" y="22" class="val" fill="#1e40af">0.20</text>
    <text x="282" y="50" class="idx" fill="#1e40af">[4]</text>

    <!-- [5] Geprüfte neue Mitte -->
    <rect x="315" y="0" width="60" height="34" fill="#fef3c7" stroke="#d97706" stroke-width="2.5" />
    <text x="345" y="22" class="val" fill="#b45309">0.42</text>
    <text x="345" y="50" class="idx" fill="#b45309">[5] &gt;</text>

    <!-- [6..7] fällt weg -->
    <rect x="378" y="0" width="60" height="34" fill="#fee2e2" stroke="#f87171" stroke-width="1.5" />
    <text x="408" y="22" class="val" fill="#991b1b">0.85</text>
    <text x="408" y="50" class="idx" fill="#991b1b">[6]</text>

    <rect x="441" y="0" width="60" height="34" fill="#fee2e2" stroke="#f87171" stroke-width="1.5" />
    <text x="471" y="22" class="val" fill="#991b1b">1.50</text>
    <text x="471" y="50" class="idx" fill="#991b1b">[7]</text>
  </g>

  <!-- SCHRITT 3 -->
  <rect x="-25" y="270" width="530" height="98" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
  <text x="-10" y="292" class="step" fill="#15803d">3. Schritt: Treffer bei [4] &#8594; xs[4] = 0.20 s (Gefunden in nur 3 Vergleichen!)</text>

  <g transform="translate(-12, 304)">
    <rect x="0"   y="0" width="60" height="34" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="30"  y="22" class="val" fill="#94a3b8">0.00</text>
    <rect x="63"  y="0" width="60" height="34" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="93"  y="22" class="val" fill="#94a3b8">0.01</text>
    <rect x="126" y="0" width="60" height="34" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="156" y="22" class="val" fill="#94a3b8">0.03</text>
    <rect x="189" y="0" width="60" height="34" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="219" y="22" class="val" fill="#94a3b8">0.08</text>

    <!-- [4] TREFFER -->
    <rect x="252" y="0" width="60" height="34" fill="#dcfce7" stroke="#16a34a" stroke-width="3" />
    <text x="282" y="22" class="val" fill="#166534">0.20</text>
    <text x="282" y="52" class="idx" fill="#15803d">[4] Ziel!</text>

    <rect x="315" y="0" width="60" height="34" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="345" y="22" class="val" fill="#94a3b8">0.42</text>
    <rect x="378" y="0" width="60" height="34" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="408" y="22" class="val" fill="#94a3b8">0.85</text>
    <rect x="441" y="0" width="60" height="34" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="471" y="22" class="val" fill="#94a3b8">1.50</text>
  </g>
</svg>
`);

// 4b. Reine Illustration (570x380): Signal Sichtbarkeits-Clipping per Dreisatz-Formel in O(1)
writeSvg('Signal_Clipping_Dreisatz_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15.5px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 13.5px; font-weight: bold; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13.5px; font-weight: 600; text-anchor: middle; }
    </style>
    <marker id="cl-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#16a34a" />
    </marker>
  </defs>

  <!-- Oben: Zoom-Fenster auf der Zeitachse [t_min = 5.000 s ... t_max = 5.010 s] -->
  <rect x="15" y="15" width="450" height="145" rx="10" fill="#eff6ff" stroke="#60a5fa" stroke-width="2" />
  <text x="240" y="40" class="hdr" fill="#1d4ed8">1. Reinzoomen: Sichtbares Zeitfenster [5.000 s ... 5.010 s]</text>

  <!-- Gesamte Zeitachse 0 s bis 10.000 s -->
  <line x1="40" y1="95" x2="440" y2="95" stroke="#94a3b8" stroke-width="4" />
  <text x="52" y="122" class="code" fill="#64748b">0 s</text>
  <text x="420" y="122" class="code" fill="#64748b">10.000 s</text>

  <!-- Hervorgehobener Zoom-Ausschnitt in der Mitte -->
  <rect x="175" y="62" width="130" height="62" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5" />
  <polyline points="182,105 202,75 225,98 248,72 272,92 298,80" fill="none" stroke="#15803d" stroke-width="3" />
  <text x="175" y="145" class="code" fill="#15803d">t_min = 5.000 s</text>
  <text x="325" y="145" class="code" fill="#15803d">t_max = 5.010 s</text>

  <!-- Dreisatz-Pfeile nach unten -->
  <line x1="195" y1="160" x2="195" y2="205" stroke="#16a34a" stroke-width="3" marker-end="url(#cl-arr)" />
  <line x1="285" y1="160" x2="285" y2="205" stroke="#16a34a" stroke-width="3" marker-end="url(#cl-arr)" />
  <rect x="95" y="170" width="290" height="26" rx="5" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" />
  <text x="240" y="188" class="code" fill="#166534">Dreisatz: i = (t - t_0) / dt</text>

  <!-- Unten: Array ys[0 ... 9.999.999] im RAM -->
  <rect x="15" y="212" width="450" height="153" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="238" class="hdr" fill="#0f172a">2. Array-Ausschnitt im RAM (O(1) = Nur 2 Divisionen!)</text>

  <!-- Links ausgegraut -->
  <rect x="30" y="254" width="135" height="52" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
  <text x="97" y="276" class="code" fill="#64748b">ys[0..4999]</text>
  <text x="97" y="296" class="sub" fill="#64748b">Ignoriert!</text>

  <!-- Mitte aktiv (nur 11 Werte!) -->
  <rect x="170" y="250" width="140" height="60" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5" />
  <text x="240" y="275" class="code" fill="#166534">ys[5000..5010]</text>
  <text x="240" y="298" class="sub" fill="#15803d">Nur 11 Werte gelesen!</text>

  <!-- Rechts ausgegraut -->
  <rect x="315" y="254" width="135" height="52" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
  <text x="382" y="276" class="code" fill="#64748b">ys[5011..N]</text>
  <text x="382" y="296" class="sub" fill="#64748b">Ignoriert!</text>

  <text x="240" y="345" class="code" fill="#15803d">9.999.989 Punkte werden im RAM gar nicht erst berührt!</text>
</svg>
`);

// 5b. Reine Illustration (570x380): SignalXY Adaptives Bucketing (Dichte Flanke vs. Weite Ruhelage)
writeSvg('SignalXY_Adaptives_Bucketing_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15.5px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 13.5px; font-weight: bold; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13.5px; font-weight: 600; text-anchor: middle; }
    </style>
  </defs>

  <!-- Links: Zone A (Steile Flanke -> Viele Punkte in 1 Pixelspalte / Bucket) -->
  <rect x="15" y="15" width="218" height="350" rx="10" fill="#eff6ff" stroke="#60a5fa" stroke-width="2" />
  <text x="124" y="42" class="hdr" fill="#1d4ed8">Zone A: Dichte Schritte</text>
  <text x="124" y="64" class="sub" fill="#475569">(Einschwingen: dt klein)</text>

  <rect x="30" y="80" width="188" height="200" rx="6" fill="#ffffff" stroke="#93c5fd" stroke-width="1.5" />
  <!-- Hervorgehobene Pixelspalte (Bucket) -->
  <rect x="92" y="80" width="64" height="200" fill="#dbeafe" opacity="0.7" />
  <line x1="92" y1="80" x2="92" y2="280" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="156" y1="80" x2="156" y2="280" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,4" />
  <text x="124" y="100" class="code" fill="#1e40af">1 Bucket</text>

  <!-- Vertikaler Min/Max-Strich im Bucket -->
  <line x1="124" y1="120" x2="124" y2="250" stroke="#2563eb" stroke-width="7" stroke-linecap="round" />
  <circle cx="124" cy="120" r="5.5" fill="#dc2626" />
  <circle cx="124" cy="250" r="5.5" fill="#dc2626" />
  <circle cx="105" cy="210" r="4" fill="#1d4ed8" />
  <circle cx="115" cy="160" r="4" fill="#1d4ed8" />
  <circle cx="135" cy="195" r="4" fill="#1d4ed8" />
  <circle cx="145" cy="145" r="4" fill="#1d4ed8" />

  <text x="124" y="308" class="code" fill="#1e3a8a">&gt; 1 Punkt in Spalte p:</text>
  <text x="124" y="330" class="sub" fill="#1d4ed8">4-Punkt Min/Max-Strich</text>
  <text x="124" y="352" class="code" fill="#475569">(wie bei Signal)</text>

  <!-- Rechts: Zone B (Ruhelage -> Wenige Punkte, leere Spalten dazwischen) -->
  <rect x="247" y="15" width="218" height="350" rx="10" fill="#fff7ed" stroke="#fdba74" stroke-width="2" />
  <text x="356" y="42" class="hdr" fill="#c2410c">Zone B: Weite Schritte</text>
  <text x="356" y="64" class="sub" fill="#475569">(Ruhelage: dt groß)</text>

  <rect x="262" y="80" width="188" height="200" rx="6" fill="#ffffff" stroke="#fdba74" stroke-width="1.5" />
  <!-- Leere Pixelspalten im Hintergrund -->
  <line x1="305" y1="112" x2="305" y2="280" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="356" y1="112" x2="356" y2="280" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="407" y1="112" x2="407" y2="280" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,4" />
  <text x="356" y="100" class="code" fill="#64748b">Leere Spalten</text>

  <!-- Direkte Verbindungslinie zwischen zwei weit entfernten Punkten -->
  <line x1="282" y1="195" x2="430" y2="165" stroke="#ea580c" stroke-width="4" />
  <circle cx="282" cy="195" r="6.5" fill="#ea580c" stroke="#ffffff" stroke-width="1.5" />
  <circle cx="430" cy="165" r="6.5" fill="#ea580c" stroke="#ffffff" stroke-width="1.5" />

  <text x="356" y="308" class="code" fill="#9a3412">Abstand &gt; 1 Pixelspalte:</text>
  <text x="356" y="330" class="sub" fill="#c2410c">Direkte Verbindungslinie</text>
  <text x="356" y="352" class="code" fill="#475569">(wie bei ScatterLine)</text>
</svg>
`);

// 6. Reine Illustration (480x380): VectorField Gitter & Layering (Painter's Algorithm)
writeSvg('VectorField_Gitter_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; text-anchor: middle; }
    </style>
    <marker id="vf-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#64748b" />
    </marker>
    <marker id="tr-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#ea580c" />
    </marker>
  </defs>

  <rect x="15" y="15" width="450" height="350" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="42" class="hdr" fill="#004B96">Layer-Prinzip: VectorField O(G_x·G_y) + ScatterLine</text>

  <!-- Plotfeld -->
  <rect x="45" y="58" width="390" height="255" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
  <line x1="45" y1="185" x2="435" y2="185" stroke="#e2e8f0" stroke-width="1.5" />
  <line x1="240" y1="58" x2="240" y2="313" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Ebene 1: Grobes Vektorgitter (Richtungsfeld im Hintergrund) -->
  <g stroke="#64748b" stroke-width="2" marker-end="url(#vf-arr)">
    <line x1="90" y1="95" x2="122" y2="95" />
    <line x1="185" y1="95" x2="218" y2="102" />
    <line x1="285" y1="95" x2="312" y2="115" />
    <line x1="375" y1="95" x2="388" y2="128" />

    <line x1="90" y1="155" x2="105" y2="130" />
    <line x1="185" y1="155" x2="210" y2="150" />
    <line x1="285" y1="155" x2="295" y2="180" />
    <line x1="375" y1="155" x2="365" y2="190" />

    <line x1="105" y1="215" x2="95" y2="185" />
    <line x1="185" y1="215" x2="175" y2="192" />
    <line x1="295" y1="215" x2="270" y2="222" />
    <line x1="385" y1="215" x2="355" y2="235" />

    <line x1="110" y1="275" x2="90" y2="245" />
    <line x1="205" y1="275" x2="175" y2="268" />
    <line x1="305" y1="275" x2="272" y2="275" />
    <line x1="395" y1="275" x2="362" y2="275" />
  </g>

  <!-- Ebene 2: Überlagerte Trajektorie im Vordergrund -->
  <path d="M 385,185 C 385,275 115,280 120,185 C 125,105 335,105 330,185 C 326,238 175,238 180,185 C 184,152 275,152 248,182" fill="none" stroke="#ea580c" stroke-width="4" marker-end="url(#tr-arr)" />
  <circle cx="385" cy="185" r="6" fill="#16a34a" stroke="#ffffff" stroke-width="2" />
  <circle cx="240" cy="185" r="6" fill="#dc2626" stroke="#ffffff" stroke-width="2" />

  <!-- Legenden-Badges unten -->
  <rect x="45" y="324" width="185" height="28" rx="5" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" />
  <text x="137" y="343" class="code" fill="#334155">1. VectorField (Gitter)</text>

  <rect x="250" y="324" width="185" height="28" rx="5" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5" />
  <text x="342" y="343" class="code" fill="#c2410c">2. ScatterLine (Spirale)</text>
</svg>
`);

// 7. Reine Illustration (480x380): Binning-Vergleich & IQR
writeSvg('Binning_und_IQR_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 13.5px; font-weight: bold; text-anchor: middle; }
    </style>
  </defs>

  <!-- Oben: 3 Binning-Fälle nebeneinander -->
  <!-- Links: Zu breit -->
  <rect x="15" y="15" width="142" height="175" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.8" />
  <text x="86" y="38" class="hdr" fill="#b91c1c">h zu groß</text>
  <line x1="28" y1="152" x2="144" y2="152" stroke="#64748b" stroke-width="2" />
  <rect x="36" y="95" width="48" height="57" fill="#f87171" stroke="#b91c1c" stroke-width="1.5" />
  <rect x="86" y="65" width="48" height="87" fill="#f87171" stroke="#b91c1c" stroke-width="1.5" />
  <text x="86" y="176" class="code" fill="#991b1b">Überglättet</text>

  <!-- Mitte: Optimal (Q_3 - Q_1) -->
  <rect x="169" y="15" width="142" height="175" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
  <text x="240" y="38" class="hdr" fill="#15803d">h via Q_3 - Q_1</text>
  <line x1="182" y1="152" x2="298" y2="152" stroke="#64748b" stroke-width="2" />
  <rect x="188" y="130" width="18" height="22" fill="#4ade80" stroke="#15803d" stroke-width="1.2" />
  <rect x="208" y="98" width="18" height="54" fill="#4ade80" stroke="#15803d" stroke-width="1.2" />
  <rect x="228" y="62" width="18" height="90" fill="#22c55e" stroke="#15803d" stroke-width="1.2" />
  <rect x="248" y="88" width="18" height="64" fill="#4ade80" stroke="#15803d" stroke-width="1.2" />
  <rect x="268" y="122" width="18" height="30" fill="#4ade80" stroke="#15803d" stroke-width="1.2" />
  <text x="240" y="176" class="code" fill="#166534">Optimal (IQR)</text>

  <!-- Rechts: Zu schmal -->
  <rect x="323" y="15" width="142" height="175" rx="8" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.8" />
  <text x="394" y="38" class="hdr" fill="#b45309">h zu klein</text>
  <line x1="336" y1="152" x2="452" y2="152" stroke="#64748b" stroke-width="2" />
  <g fill="#fbbf24" stroke="#b45309" stroke-width="1">
    <rect x="342" y="125" width="6" height="27" />
    <rect x="352" y="142" width="6" height="10" />
    <rect x="362" y="85" width="6" height="67" />
    <rect x="372" y="132" width="6" height="20" />
    <rect x="382" y="60" width="6" height="92" />
    <rect x="392" y="115" width="6" height="37" />
    <rect x="402" y="68" width="6" height="84" />
    <rect x="412" y="138" width="6" height="14" />
    <rect x="422" y="95" width="6" height="57" />
    <rect x="432" y="128" width="6" height="24" />
  </g>
  <text x="394" y="176" class="code" fill="#92400e">Verrauscht</text>

  <!-- Unten: Zweistufige Pipeline O(N) Binning -> O(k) Bars -->
  <rect x="15" y="208" width="450" height="157" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="2" />
  <text x="240" y="236" class="hdr" fill="#1d4ed8">Zweistufige Pipeline in ScottPlot 5</text>

  <rect x="32" y="255" width="185" height="88" rx="8" fill="#ffffff" stroke="#60a5fa" stroke-width="2" />
  <text x="124" y="284" class="hdr" fill="#1e40af">1. Zählen (Binning)</text>
  <text x="124" y="312" class="code" fill="#2563eb">N = 10.000 &#8594; O(N)</text>
  <text x="124" y="332" class="code" fill="#475569">Einmalig im RAM</text>

  <path d="M 225 298 L 255 298" stroke="#1d4ed8" stroke-width="3" />
  <polygon points="260,298 250,292 250,304" fill="#1d4ed8" />

  <rect x="265" y="255" width="185" height="88" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="2" />
  <text x="357" y="284" class="hdr" fill="#15803d">2. Zeichnen (Bars)</text>
  <text x="357" y="312" class="code" fill="#16a34a">Nur k = 24 &#8594; O(k)</text>
  <text x="357" y="332" class="code" fill="#475569">24 Rechtecke pro Frame</text>
</svg>
`);

// 8. Reine Illustration (480x380): PDF-Skalierung (Warum f(x) * N * h nötig ist)
writeSvg('PDF_Skalierung_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; }
    </style>
    <marker id="arr-up-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#dc2626" />
    </marker>
  </defs>

  <rect x="15" y="15" width="450" height="350" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="42" class="hdr" fill="#004B96">Skalierung der Gauß-Dichte f(x) auf Balkenhöhe</text>

  <!-- Achsen -->
  <line x1="75" y1="300" x2="435" y2="300" stroke="#334155" stroke-width="2.5" />
  <line x1="75" y1="65" x2="75" y2="300" stroke="#334155" stroke-width="2.5" />
  <text x="65" y="85" class="code" fill="#1e40af" text-anchor="end">1200</text>
  <text x="65" y="192" class="code" fill="#1e40af" text-anchor="end">600</text>
  <text x="65" y="300" class="code" fill="#334155" text-anchor="end">0</text>

  <!-- Histogramm-Balken (Absolute Häufigkeit) -->
  <g fill="#93c5fd" fill-opacity="0.65" stroke="#2563eb" stroke-width="1.5">
    <rect x="105" y="270" width="36" height="30" />
    <rect x="145" y="215" width="36" height="85" />
    <rect x="185" y="135" width="36" height="165" />
    <rect x="225" y="80" width="36" height="220" />
    <rect x="265" y="130" width="36" height="170" />
    <rect x="305" y="210" width="36" height="90" />
    <rect x="345" y="265" width="36" height="35" />
  </g>

  <!-- Unskalierte Dichte f(x) <= 0.08 klebt flach auf der X-Achse -->
  <line x1="95" y1="297" x2="415" y2="297" stroke="#64748b" stroke-width="3.5" stroke-dasharray="6,4" />

  <!-- Skalierte Kurve cy = pdf * n * binWidth -->
  <path d="M 95,294 C 145,285 190,78 243,78 C 296,78 340,285 395,294" fill="none" stroke="#dc2626" stroke-width="4" />

  <!-- Skalierungspfeil * (n * binWidth) -->
  <line x1="243" y1="290" x2="243" y2="96" stroke="#dc2626" stroke-width="3" stroke-dasharray="5,3" marker-end="url(#arr-up-red)" />
  <rect x="295" y="72" width="140" height="30" rx="6" fill="#ffffff" stroke="#dc2626" stroke-width="1.8" />
  <text x="365" y="92" class="code" fill="#dc2626" text-anchor="middle">&#183; n &#183; binWidth</text>

  <rect x="60" y="316" width="360" height="34" rx="6" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5" />
  <text x="240" y="338" class="code" fill="#1e3a8a" text-anchor="middle">A_Balken = n &#183; binWidth (pdf)</text>
</svg>
`);

// 9. Reine Illustration (480x380): Box-Plot Anatomie & O(1) Geometrie
writeSvg('Boxplot_Anatomie_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: bold; }
      .code { font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; }
    </style>
  </defs>

  <rect x="15" y="15" width="450" height="350" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="42" class="hdr" fill="#004B96">Box-Plot: 5 Kennwerte &#8594; O(1) Geometrie pro Box</text>

  <!-- Vertikaler Box-Plot in der Mitte -->
  <!-- Obere Antenne (WhiskerMax) -->
  <line x1="205" y1="78" x2="205" y2="135" stroke="#1e40af" stroke-width="3" stroke-dasharray="5,3" />
  <line x1="170" y1="78" x2="240" y2="78" stroke="#1e40af" stroke-width="3.5" />
  <text x="260" y="83" class="code" fill="#1e40af">WhiskerMax</text>

  <!-- Box (Q_1 bis Q_3) -->
  <rect x="145" y="135" width="120" height="120" rx="4" fill="#dbeafe" stroke="#2563eb" stroke-width="3" />
  <text x="280" y="142" class="code" fill="#2563eb">BoxMax (Q_3, 75%)</text>

  <!-- Median (BoxMiddle, Q_2) -->
  <line x1="145" y1="198" x2="265" y2="198" stroke="#dc2626" stroke-width="4.5" />
  <text x="280" y="203" class="code" fill="#dc2626">BoxMiddle (Q_2)</text>

  <text x="280" y="260" class="code" fill="#2563eb">BoxMin (Q_1, 25%)</text>

  <!-- IQR Klammer links -->
  <line x1="120" y1="135" x2="120" y2="255" stroke="#16a34a" stroke-width="2.5" />
  <line x1="120" y1="135" x2="133" y2="135" stroke="#16a34a" stroke-width="2.5" />
  <line x1="120" y1="255" x2="133" y2="255" stroke="#16a34a" stroke-width="2.5" />
  <text x="108" y="200" class="lbl" fill="#15803d" text-anchor="end">IQR (50%)</text>

  <!-- Untere Antenne (WhiskerMin) -->
  <line x1="205" y1="255" x2="205" y2="308" stroke="#1e40af" stroke-width="3" stroke-dasharray="5,3" />
  <line x1="170" y1="308" x2="240" y2="308" stroke="#1e40af" stroke-width="3.5" />
  <text x="260" y="313" class="code" fill="#1e40af">WhiskerMin</text>

  <!-- Komplexitäts-Leiste unten (ausreichend breit ohne Randkollision) -->
  <rect x="28" y="324" width="424" height="30" rx="5" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5" />
  <text x="240" y="344" class="code" fill="#1e3a8a" text-anchor="middle">Sortieren: O(N log N) · Zeichnen: O(1) pro Box</text>
</svg>
`);

// 10. Reine Illustration (480x380): Gruppierte Balken (Positions-Offset Geometrie)
writeSvg('Gruppierte_Bars_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 13.5px; font-weight: bold; text-anchor: middle; }
    </style>
  </defs>

  <rect x="15" y="15" width="450" height="350" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="42" class="hdr" fill="#004B96">Positions-Arithmetik für gruppierte Balken</text>

  <!-- X-Achse -->
  <line x1="45" y1="265" x2="435" y2="265" stroke="#334155" stroke-width="2.5" />

  <!-- Gruppen-Zentrum positions[i] (nur im unteren Bereich bis y=150, damit kein Text geschnitten wird) -->
  <line x1="240" y1="155" x2="240" y2="285" stroke="#dc2626" stroke-width="2" stroke-dasharray="6,4" />
  <circle cx="240" cy="265" r="5" fill="#dc2626" />
  <text x="240" y="305" class="code" fill="#dc2626">positions[i]</text>

  <!-- Linker Balken (Modell A): pos - width/2 -->
  <rect x="105" y="105" width="122" height="160" rx="4" fill="#3b82f6" fill-opacity="0.88" stroke="#1d4ed8" stroke-width="2" />
  <circle cx="166" cy="265" r="4.5" fill="#1e3a8a" />
  <text x="166" y="90" class="code" fill="#1d4ed8">barsA</text>
  <text x="166" y="155" class="code" fill="#ffffff">pos - width/2</text>
  <text x="166" y="215" class="code" fill="#e0f2fe">Breite: width</text>

  <!-- Rechter Balken (Modell B): pos + width/2 -->
  <rect x="253" y="140" width="122" height="125" rx="4" fill="#f59e0b" fill-opacity="0.88" stroke="#b45309" stroke-width="2" />
  <circle cx="314" cy="265" r="4.5" fill="#78350f" />
  <text x="314" y="125" class="code" fill="#b45309">barsB</text>
  <text x="314" y="195" class="code" fill="#ffffff">pos + width/2</text>

  <!-- Komplexität unten -->
  <rect x="35" y="322" width="410" height="30" rx="5" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
  <text x="240" y="342" class="code" fill="#166534">Zeichenaufwand: O(G · M) Vektor-Rechtecke</text>
</svg>
`);

// 11. Reine Illustration (480x380): Heatmap Raw-Pixel-Backend Pipeline
writeSvg('Heatmap_Pipeline_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; text-anchor: middle; }
    </style>
    <linearGradient id="turbo-grad" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="35%" stop-color="#06b6d4" />
      <stop offset="65%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#dc2626" />
    </linearGradient>
    <marker id="arr-hm" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#2563eb" />
    </marker>
  </defs>

  <rect x="15" y="15" width="450" height="350" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="42" class="hdr" fill="#004B96">Heatmap: 2D-Array &#8594; Raw-Pixel-Bitmap (Termin 02)</text>

  <!-- Schritt 1: double[,] Array -->
  <rect x="30" y="70" width="135" height="195" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
  <text x="97" y="95" class="code" fill="#334155">double[,]</text>
  <g transform="translate(45, 110)" font-family="Consolas, monospace" font-size="13" font-weight="bold" text-anchor="middle">
    <rect x="0" y="0" width="50" height="36" fill="#eff6ff" stroke="#cbd5e1" />
    <text x="25" y="23" fill="#1e40af">22.4</text>
    <rect x="52" y="0" width="50" height="36" fill="#fef3c7" stroke="#cbd5e1" />
    <text x="77" y="23" fill="#b45309">64.1</text>
    <rect x="0" y="38" width="50" height="36" fill="#fef3c7" stroke="#cbd5e1" />
    <text x="25" y="61" fill="#b45309">58.9</text>
    <rect x="52" y="38" width="50" height="36" fill="#fee2e2" stroke="#cbd5e1" />
    <text x="77" y="61" fill="#dc2626">98.5</text>
    <rect x="0" y="76" width="50" height="36" fill="#eff6ff" stroke="#cbd5e1" />
    <text x="25" y="99" fill="#1e40af">25.0</text>
    <rect x="52" y="76" width="50" height="36" fill="#fef3c7" stroke="#cbd5e1" />
    <text x="77" y="99" fill="#b45309">61.2</text>
  </g>
  <text x="97" y="248" class="code" fill="#64748b">intensities</text>

  <line x1="168" y1="168" x2="198" y2="168" stroke="#2563eb" stroke-width="3" marker-end="url(#arr-hm)" />

  <!-- Schritt 2: Colormap Lookup -->
  <rect x="204" y="70" width="76" height="195" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
  <text x="242" y="95" class="code" fill="#334155">LUT</text>
  <rect x="228" y="110" width="28" height="115" rx="4" fill="url(#turbo-grad)" stroke="#475569" stroke-width="1.5" />
  <text x="242" y="248" class="code" fill="#64748b">Turbo</text>

  <line x1="283" y1="168" x2="313" y2="168" stroke="#2563eb" stroke-width="3" marker-end="url(#arr-hm)" />

  <!-- Schritt 3: 1 SKBitmap Textur -->
  <rect x="318" y="70" width="132" height="195" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="2" />
  <text x="384" y="95" class="code" fill="#15803d">1 Bitmap</text>
  <g transform="translate(333, 110)">
    <rect x="0" y="0" width="50" height="36" fill="#2563eb" />
    <rect x="50" y="0" width="50" height="36" fill="#eab308" />
    <rect x="0" y="36" width="50" height="36" fill="#f59e0b" />
    <rect x="50" y="36" width="50" height="36" fill="#dc2626" />
    <rect x="0" y="72" width="50" height="36" fill="#3b82f6" />
    <rect x="50" y="72" width="50" height="36" fill="#eab308" />
  </g>
  <text x="384" y="248" class="code" fill="#15803d">SKBitmap</text>

  <!-- Komplexitäts-Badge unten (mit N_x und N_y) -->
  <rect x="30" y="285" width="420" height="60" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.8" />
  <text x="240" y="310" class="code" fill="#1e40af">Pixel-Update: O(N_x·N_y) im Array (0 UI-Shapes!)</text>
  <text x="240" y="333" class="code" fill="#15803d">GPU zeichnet 1 Textur + ColorBar in O(1)</text>
</svg>
`);

// 12. Großflächig (1110x470): Ringpuffer (Circular Buffer) in 3 Phasen + DataStreamer Modi
writeSvg('Ringpuffer_Zyklus_Vollbild.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1110 470" width="1110" height="470">
  <defs>
    <style>
      .title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 18px; font-weight: bold; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 15px; font-weight: bold; text-anchor: middle; }
      .idx { font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; fill: #64748b; text-anchor: middle; }
    </style>
    <marker id="arr-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#dc2626" />
    </marker>
    <marker id="arr-wrap" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#16a34a" />
    </marker>
  </defs>

  <!-- Phase 1: Normaler Schreibvorgang -->
  <rect x="15" y="15" width="345" height="275" rx="10" fill="#f8fafc" stroke="#93c5fd" stroke-width="2" />
  <text x="187" y="45" class="title" fill="#1d4ed8">Phase 1: Puffer füllt sich</text>
  <text x="187" y="72" class="code" fill="#334155">cap = 5 · Enqueue(18.4)</text>

  <!-- 5 Array-Zellen -->
  <g transform="translate(32, 115)">
    <rect x="0" y="0" width="58" height="48" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="29" y="30" class="code" fill="#1e3a8a">12.1</text>
    <text x="29" y="68" class="idx">[0]</text>

    <rect x="62" y="0" width="58" height="48" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="91" y="30" class="code" fill="#1e3a8a">14.5</text>
    <text x="91" y="68" class="idx">[1]</text>

    <rect x="124" y="0" width="58" height="48" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="153" y="30" class="code" fill="#1e3a8a">15.0</text>
    <text x="153" y="68" class="idx">[2]</text>

    <rect x="186" y="0" width="58" height="48" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5" />
    <text x="215" y="30" class="code" fill="#15803d">18.4</text>
    <text x="215" y="68" class="idx">[3]</text>

    <rect x="248" y="0" width="58" height="48" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3" />
    <text x="277" y="30" class="code" fill="#94a3b8">--</text>
    <text x="277" y="68" class="idx">[4]</text>
  </g>
  <line x1="247" y1="82" x2="247" y2="110" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-head)" />
  <text x="247" y="218" class="code" fill="#dc2626">head: 3 &#8594; 4</text>
  <text x="187" y="265" class="lbl" fill="#475569">Schreibt in _data[head] in O(1)</text>

  <!-- Phase 2: Letzte Zelle erreicht & Modulo-Sprung -->
  <rect x="382" y="15" width="345" height="275" rx="10" fill="#fffbeb" stroke="#fcd34d" stroke-width="2" />
  <text x="554" y="45" class="title" fill="#b45309">Phase 2: Ende erreicht (Wrap-Around)</text>
  <text x="554" y="72" class="code" fill="#92400e">head = (4 + 1) % 5 = 0</text>

  <g transform="translate(399, 115)">
    <rect x="0" y="0" width="58" height="48" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="29" y="30" class="code" fill="#1e3a8a">12.1</text>
    <text x="29" y="68" class="idx">[0]</text>

    <rect x="62" y="0" width="58" height="48" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="91" y="30" class="code" fill="#1e3a8a">14.5</text>
    <text x="91" y="68" class="idx">[1]</text>

    <rect x="124" y="0" width="58" height="48" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="153" y="30" class="code" fill="#1e3a8a">15.0</text>
    <text x="153" y="68" class="idx">[2]</text>

    <rect x="186" y="0" width="58" height="48" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="215" y="30" class="code" fill="#1e3a8a">18.4</text>
    <text x="215" y="68" class="idx">[3]</text>

    <rect x="248" y="0" width="58" height="48" fill="#fef3c7" stroke="#d97706" stroke-width="2.5" />
    <text x="277" y="30" class="code" fill="#b45309">19.2</text>
    <text x="277" y="68" class="idx">[4]</text>
  </g>
  <path d="M 676 112 C 676 75, 428 75, 428 110" fill="none" stroke="#16a34a" stroke-width="3" marker-end="url(#arr-wrap)" />
  <text x="554" y="218" class="code" fill="#15803d">Modulo (%) springt auf Index [0]</text>
  <text x="554" y="265" class="lbl" fill="#475569">Kein Resize, kein neues Array!</text>

  <!-- Phase 3: Ältester Wert wird überschrieben -->
  <rect x="750" y="15" width="345" height="275" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
  <text x="922" y="45" class="title" fill="#15803d">Phase 3: Ältester Wert überschrieben</text>
  <text x="922" y="72" class="code" fill="#166534">Enqueue(21.0) auf Index [0]</text>

  <g transform="translate(767, 115)">
    <rect x="0" y="0" width="58" height="48" fill="#dcfce7" stroke="#16a34a" stroke-width="3" />
    <text x="29" y="30" class="code" fill="#15803d">21.0</text>
    <text x="29" y="68" class="idx">[0]</text>

    <rect x="62" y="0" width="58" height="48" fill="#fee2e2" stroke="#ef4444" stroke-width="2" />
    <text x="91" y="30" class="code" fill="#991b1b">14.5</text>
    <text x="91" y="68" class="idx">[1]</text>

    <rect x="124" y="0" width="58" height="48" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="153" y="30" class="code" fill="#1e3a8a">15.0</text>
    <text x="153" y="68" class="idx">[2]</text>

    <rect x="186" y="0" width="58" height="48" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="215" y="30" class="code" fill="#1e3a8a">18.4</text>
    <text x="215" y="68" class="idx">[3]</text>

    <rect x="248" y="0" width="58" height="48" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="277" y="30" class="code" fill="#1e3a8a">19.2</text>
    <text x="277" y="68" class="idx">[4]</text>
  </g>
  <line x1="796" y1="82" x2="796" y2="110" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-head)" />
  <text x="922" y="218" class="code" fill="#166534">[0] = Neu (21.0) · [1] = Ältester</text>
  <text x="922" y="265" class="lbl" fill="#475569">Endloser Dauerbetrieb (24/7)</text>

  <!-- Unten: Die zwei Darstellungsmodi von ScottPlot DataStreamer -->
  <rect x="15" y="310" width="530" height="145" rx="10" fill="#eff6ff" stroke="#60a5fa" stroke-width="2" />
  <text x="280" y="340" class="title" fill="#1e40af">DataStreamer Modus 1: ViewScrollLeft() (Rollband)</text>
  <polyline points="45,415 110,390 175,420 240,380 305,410 370,375 435,405 495,365" fill="none" stroke="#2563eb" stroke-width="3.5" />
  <circle cx="495" cy="365" r="6" fill="#dc2626" />
  <text x="280" y="442" class="code" fill="#1e3a8a">Neuester Wert rechts · Kurve wandert nach links</text>

  <rect x="565" y="310" width="530" height="145" rx="10" fill="#f0fdf4" stroke="#34d399" stroke-width="2" />
  <text x="830" y="340" class="title" fill="#047857">DataStreamer Modus 2: ViewWipeRight() (EKG-Wischer)</text>
  <polyline points="595,405 660,375 725,415 790,368 835,392" fill="none" stroke="#16a34a" stroke-width="3.5" />
  <line x1="845" y1="355" x2="845" y2="425" stroke="#dc2626" stroke-width="3" stroke-dasharray="4,3" />
  <polyline points="875,410 940,385 1005,415 1065,390" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="3,3" />
  <text x="830" y="442" class="code" fill="#065f46">Schreibzeiger wandert von links nach rechts über Altwerte</text>
</svg>
`);

// 13. Reine Illustration (480x380): Multi-Rate Entkopplung (1 kHz Sim vs. 50 Hz DispatcherTimer)
writeSvg('MultiRate_Architektur_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; text-anchor: middle; }
    </style>
    <marker id="arr-mr1" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#2563eb" />
    </marker>
    <marker id="arr-mr2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#16a34a" />
    </marker>
  </defs>

  <!-- Links/Oben: Schneller Simulations-Thread (1000 Hz) -->
  <rect x="20" y="18" width="440" height="95" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
  <text x="240" y="46" class="hdr" fill="#1d4ed8">1. Simulations-Task (1.000 Hz · 1 ms)</text>
  <text x="240" y="74" class="code" fill="#1e40af">Berechnet y &#8594; _streamer.Add(y)</text>
  <text x="240" y="98" class="code" fill="#dc2626">Kein WpfPlot1.Refresh() hier!</text>

  <!-- Pfeil in den Puffer -->
  <line x1="240" y1="113" x2="240" y2="148" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arr-mr1)" />

  <!-- Mitte: Ringpuffer / DataStreamer -->
  <rect x="75" y="152" width="330" height="72" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="2" />
  <text x="240" y="182" class="hdr" fill="#b45309">Puffer im RAM (DataStreamer)</text>
  <text x="240" y="208" class="code" fill="#92400e">20 neue Punkte pro UI-Frame</text>

  <!-- Pfeil zum UI-Timer -->
  <line x1="240" y1="224" x2="240" y2="259" stroke="#16a34a" stroke-width="3.5" marker-end="url(#arr-mr2)" />

  <!-- Unten: Langsamer UI-Timer (50 Hz) -->
  <rect x="20" y="264" width="440" height="98" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <text x="240" y="292" class="hdr" fill="#15803d">2. WPF DispatcherTimer (50 Hz · 20 ms)</text>
  <text x="240" y="320" class="code" fill="#166534">OnUiTimerTick &#8594; WpfPlot1.Refresh()</text>
  <text x="240" y="344" class="code" fill="#15803d">Zeichnet nur 50-mal pro Sekunde neu</text>
</svg>
`);

// 14. Reine Illustration (480x380): Welford Online-Statistik & 3-Sigma-Bänder in ScottPlot
writeSvg('Welford_Toleranzband_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; }
    </style>
  </defs>

  <rect x="15" y="15" width="450" height="350" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="42" class="hdr" fill="#004B96">Live-Monitoring: HorizontalLine mit Welford</text>

  <!-- Plotfläche -->
  <rect x="35" y="58" width="410" height="240" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />

  <!-- 3-Sigma Band Hintergrund -->
  <rect x="36" y="105" width="408" height="145" fill="#dcfce7" opacity="0.55" />

  <!-- Obere Grenze: Mean + 3*StdDev -->
  <line x1="35" y1="105" x2="445" y2="105" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6,4" />
  <text x="45" y="96" class="code" fill="#dc2626">Obere Linie: Mean + 3·StdDev</text>

  <!-- Mittelwert: Mean -->
  <line x1="35" y1="178" x2="445" y2="178" stroke="#16a34a" stroke-width="2.5" />
  <text x="45" y="170" class="code" fill="#15803d">Mittelwert-Linie: Mean</text>

  <!-- Untere Grenze: Mean - 3*StdDev -->
  <line x1="35" y1="250" x2="445" y2="250" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6,4" />
  <text x="45" y="270" class="code" fill="#dc2626">Untere Linie: Mean - 3·StdDev</text>

  <!-- Live-Messsignal mit Ausreißer-Peak -->
  <polyline points="45,182 80,165 115,192 150,170 185,188 220,160 255,185 290,172 325,72 355,190 390,175 430,180" fill="none" stroke="#2563eb" stroke-width="3" />
  <circle cx="325" cy="72" r="7" fill="#dc2626" stroke="#ffffff" stroke-width="2" />
  <text x="340" y="77" class="code" fill="#dc2626">Alarm!</text>

  <!-- Fußzeile: Welford O(1) -->
  <rect x="35" y="312" width="410" height="36" rx="6" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5" />
  <text x="240" y="335" class="code" fill="#1e3a8a" text-anchor="middle">3 Ebenen: DataStreamer + HorizontalLine + Alarm</text>
</svg>
`);

// 14b. Reine Illustration (570x380): Kurzzeit-Gedächtnis (Ringpuffer) vs. Langzeit-Gedächtnis (Welford)
writeSvg('Ringpuffer_vs_Welford_Architektur_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15.5px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 13.5px; font-weight: bold; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13.5px; font-weight: 600; text-anchor: middle; }
    </style>
    <marker id="rw-b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#2563eb" />
    </marker>
    <marker id="rw-g" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#16a34a" />
    </marker>
  </defs>

  <!-- Oben: Eingehender Messwert x -->
  <rect x="95" y="12" width="290" height="48" rx="8" fill="#f8fafc" stroke="#475569" stroke-width="2" />
  <text x="240" y="42" class="hdr" fill="#0f172a">Neuer Simulationswert x (1.000 Hz)</text>

  <!-- Verzweigungspfeile -->
  <line x1="175" y1="60" x2="115" y2="92" stroke="#2563eb" stroke-width="3" marker-end="url(#rw-b)" />
  <line x1="305" y1="60" x2="365" y2="92" stroke="#16a34a" stroke-width="3" marker-end="url(#rw-g)" />

  <!-- Links: Kurzzeit-Gedächtnis (Ringpuffer) -->
  <rect x="-15" y="98" width="242" height="265" rx="10" fill="#eff6ff" stroke="#60a5fa" stroke-width="2" />
  <text x="106" y="124" class="hdr" fill="#1d4ed8">1. Kurzzeit-Gedächtnis</text>
  <text x="106" y="146" class="code" fill="#1e40af">Ringpuffer (DataStreamer)</text>

  <rect x="5" y="162" width="202" height="68" rx="6" fill="#ffffff" stroke="#93c5fd" stroke-width="1.5" />
  <text x="106" y="188" class="code" fill="#1e3a8a">double[500] im RAM</text>
  <text x="106" y="214" class="sub" fill="#475569">Kennt nur letzte 0,5 s</text>

  <rect x="5" y="246" width="202" height="100" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" />
  <text x="106" y="272" class="sub" fill="#1e40af">Rolle im Dashboard:</text>
  <text x="106" y="298" class="code" fill="#1d4ed8">Rollende Signalkurve</text>
  <text x="106" y="324" class="sub" fill="#475569">(Alte Werte überschrieben)</text>

  <!-- Rechts: Langzeit-Gedächtnis (Welford) -->
  <rect x="253" y="98" width="242" height="265" rx="10" fill="#f0fdf4" stroke="#4ade80" stroke-width="2" />
  <text x="374" y="124" class="hdr" fill="#15803d">2. Langzeit-Gedächtnis</text>
  <text x="374" y="146" class="code" fill="#166534">Welford-Rekursion</text>

  <rect x="273" y="162" width="202" height="68" rx="6" fill="#ffffff" stroke="#86efac" stroke-width="1.5" />
  <text x="374" y="188" class="code" fill="#166534">Count · Mean · M2</text>
  <text x="374" y="214" class="sub" fill="#15803d">Nur 3 Zahlen (24 Byte RAM!)</text>

  <rect x="273" y="246" width="202" height="100" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" />
  <text x="374" y="272" class="sub" fill="#166534">Rolle im Dashboard:</text>
  <text x="374" y="298" class="code" fill="#15803d">HorizontalLine (&#177;3&#963;)</text>
  <text x="374" y="324" class="code" fill="#15803d">&amp; Live-Gauß-Kurve</text>
</svg>
`);

// 15. Reine Illustration (480x380): FillY Geschlossenes Polygon (2N Eckpunkte)
writeSvg('FillY_Polygon_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; text-anchor: middle; }
    </style>
    <marker id="arr-fw" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#1d4ed8" />
    </marker>
    <marker id="arr-bw" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#047857" />
    </marker>
  </defs>

  <rect x="15" y="15" width="450" height="350" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="42" class="hdr" fill="#004B96">FillY(xs, yLower, yUpper): Polygon-Konstruktion</text>

  <rect x="35" y="58" width="410" height="240" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />

  <!-- Gefülltes Polygon (Vorwärts oben, Rückwärts unten) -->
  <path d="M 65,135 L 150,95 L 240,125 L 330,85 L 415,115 L 415,225 L 330,195 L 240,235 L 150,205 L 65,245 Z" fill="#93c5fd" fill-opacity="0.45" stroke="none" />

  <!-- Obere Kante: Vorwärts 0 -> N-1 -->
  <path d="M 65,135 L 150,95 L 240,125 L 330,85 L 410,113" fill="none" stroke="#1d4ed8" stroke-width="3.5" marker-end="url(#arr-fw)" />
  <text x="240" y="80" class="code" fill="#1d4ed8">1. Vorwärts entlang yUpper[0 ... N-1] &#8594;</text>

  <!-- Rechte Verbindung -->
  <line x1="415" y1="115" x2="415" y2="225" stroke="#64748b" stroke-width="2.5" stroke-dasharray="4,3" />

  <!-- Untere Kante: Rückwärts N-1 -> 0 -->
  <path d="M 415,225 L 330,195 L 240,235 L 150,205 L 70,243" fill="none" stroke="#047857" stroke-width="3.5" marker-end="url(#arr-bw)" />
  <text x="240" y="268" class="code" fill="#047857">&#8592; 2. Rückwärts entlang yLower[N-1 ... 0]</text>

  <!-- Sollkurve mu(t) in der Mitte -->
  <path d="M 65,190 L 150,150 L 240,180 L 330,140 L 415,170" fill="none" stroke="#1e3a8a" stroke-width="2.5" stroke-dasharray="5,4" />

  <!-- Fußzeile -->
  <rect x="35" y="312" width="410" height="36" rx="6" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5" />
  <text x="240" y="335" class="code" fill="#1e3a8a">1 geschlossener SKPath mit 2·N Eckpunkten in O(N)</text>
</svg>
`);

// 15b. Reine Illustration (570x380): MSAGL Layout-Varianten (Hierarchisch Sugiyama vs. Organisch Force-Directed)
writeSvg('MSAGL_Layout_Varianten_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15.5px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 13.5px; font-weight: bold; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: 600; text-anchor: middle; }
    </style>
    <marker id="lv-b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#2563eb" />
    </marker>
    <marker id="lv-r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#dc2626" />
    </marker>
  </defs>

  <!-- Oben: Variante 1 - Hierarchisches Schicht-Layout (Sugiyama) -->
  <rect x="10" y="12" width="460" height="170" rx="10" fill="#eff6ff" stroke="#60a5fa" stroke-width="2" />
  <text x="240" y="38" class="hdr" fill="#1d4ed8">1. Hierarchisches Schicht-Layout (Sugiyama)</text>
  <text x="240" y="58" class="sub" fill="#475569">Kausaler Signalfluss (Links &#8594; Rechts) + Rückführung</text>

  <!-- Schicht-Linien -->
  <line x1="90" y1="70" x2="90" y2="145" stroke="#bfdbfe" stroke-width="2" stroke-dasharray="4,4" />
  <line x1="240" y1="70" x2="240" y2="145" stroke="#bfdbfe" stroke-width="2" stroke-dasharray="4,4" />
  <line x1="390" y1="70" x2="390" y2="145" stroke="#bfdbfe" stroke-width="2" stroke-dasharray="4,4" />

  <!-- Vorwärts-Pfeile -->
  <line x1="132" y1="102" x2="190" y2="102" stroke="#2563eb" stroke-width="2.5" marker-end="url(#lv-b)" />
  <line x1="282" y1="102" x2="340" y2="102" stroke="#2563eb" stroke-width="2.5" marker-end="url(#lv-b)" />

  <!-- Blöcke -->
  <rect x="48" y="84" width="84" height="36" rx="6" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
  <text x="90" y="107" class="code" fill="#1e3a8a">Sum</text>

  <rect x="198" y="84" width="84" height="36" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
  <text x="240" y="107" class="code" fill="#1e3a8a">Regler</text>

  <rect x="348" y="84" width="84" height="36" rx="6" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
  <text x="390" y="107" class="code" fill="#1e3a8a">Strecke</text>

  <!-- Feedback-Schleife unten -->
  <path d="M 390 120 C 390 162, 90 162, 90 125" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="5,3" marker-end="url(#lv-r)" />
  <text x="240" y="172" class="code" fill="#1e40af">SugiyamaLayoutSettings (Standard)</text>

  <!-- Unten: Variante 2 - Organisches Kräfte-Layout (Force-Directed / MDS) -->
  <rect x="10" y="196" width="460" height="172" rx="10" fill="#f0fdf4" stroke="#4ade80" stroke-width="2" />
  <text x="240" y="222" class="hdr" fill="#15803d">2. Organisches Kräfte-Layout (Force-Directed)</text>
  <text x="240" y="242" class="sub" fill="#475569">Vermaschte Topologie &#8594; Automatische Nachbarschafts-Cluster</text>

  <!-- Kanten (ungerichtet) -->
  <line x1="145" y1="295" x2="75" y2="268" stroke="#16a34a" stroke-width="2.5" />
  <line x1="145" y1="295" x2="75" y2="325" stroke="#16a34a" stroke-width="2.5" />
  <line x1="145" y1="295" x2="335" y2="295" stroke="#0f172a" stroke-width="3" />
  <line x1="335" y1="295" x2="405" y2="268" stroke="#d97706" stroke-width="2.5" />
  <line x1="335" y1="295" x2="405" y2="325" stroke="#d97706" stroke-width="2.5" />

  <!-- Knoten Cluster A -->
  <circle cx="75" cy="268" r="16" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />
  <text x="75" y="273" class="code" fill="#166534">S1</text>
  <circle cx="75" cy="325" r="16" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />
  <text x="75" y="330" class="code" fill="#166534">S2</text>
  <rect x="112" y="277" width="66" height="34" rx="6" fill="#ffffff" stroke="#15803d" stroke-width="2.5" />
  <text x="145" y="299" class="code" fill="#166534">GW-A</text>

  <!-- Knoten Cluster B -->
  <rect x="302" y="277" width="66" height="34" rx="6" fill="#ffffff" stroke="#d97706" stroke-width="2.5" />
  <text x="335" y="299" class="code" fill="#b45309">GW-B</text>
  <circle cx="405" cy="268" r="16" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
  <text x="405" y="273" class="code" fill="#92400e">R1</text>
  <circle cx="405" cy="325" r="16" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
  <text x="405" y="330" class="code" fill="#92400e">R2</text>

  <text x="240" y="356" class="code" fill="#166534">MdsLayoutSettings (Feder- &amp; Abstoßungskräfte)</text>
</svg>
`);

// 16. Reine Illustration (480x380): Sugiyama 4 Phasen (Rein visuell ohne Textwände)
writeSvg('Sugiyama_Phasen_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: bold; text-anchor: middle; }
      .node { font-family: 'Consolas', monospace; font-size: 13.5px; font-weight: bold; text-anchor: middle; }
    </style>
    <marker id="sg-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#475569" />
    </marker>
    <marker id="sg-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#dc2626" />
    </marker>
  </defs>

  <!-- 1. Cycle Removal -->
  <rect x="15" y="15" width="215" height="165" rx="10" fill="#f8fafc" stroke="#93c5fd" stroke-width="2" />
  <text x="122" y="38" class="hdr" fill="#1d4ed8">1. Cycle Removal</text>
  <line x1="78" y1="95" x2="152" y2="95" stroke="#475569" stroke-width="2.5" marker-end="url(#sg-arr)" />
  <path d="M 65 112 Q 122 155 168 112" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="4,3" marker-end="url(#sg-red)" />
  <circle cx="62" cy="95" r="16" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
  <text x="62" y="100" class="node" fill="#1e3a8a">A</text>
  <circle cx="175" cy="95" r="16" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
  <text x="175" y="100" class="node" fill="#1e3a8a">B</text>

  <!-- 2. Layering (L_1, L_2, L_3) -->
  <rect x="250" y="15" width="215" height="165" rx="10" fill="#f8fafc" stroke="#93c5fd" stroke-width="2" />
  <text x="357" y="38" class="hdr" fill="#1d4ed8">2. Layering (L_1..L_3)</text>
  <line x1="290" y1="55" x2="290" y2="145" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4,4" />
  <line x1="357" y1="55" x2="357" y2="145" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4,4" />
  <line x1="424" y1="55" x2="424" y2="145" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4,4" />
  <line x1="304" y1="105" x2="340" y2="85" stroke="#475569" stroke-width="2" marker-end="url(#sg-arr)" />
  <line x1="372" y1="85" x2="408" y2="105" stroke="#475569" stroke-width="2" marker-end="url(#sg-arr)" />
  <circle cx="290" cy="105" r="14" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
  <circle cx="357" cy="80" r="14" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
  <circle cx="424" cy="105" r="14" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
  <text x="290" y="166" class="node" fill="#1e40af">L_1</text>
  <text x="357" y="166" class="node" fill="#1e40af">L_2</text>
  <text x="424" y="166" class="node" fill="#1e40af">L_3</text>

  <!-- 3. Crossing Minimization -->
  <rect x="15" y="200" width="215" height="165" rx="10" fill="#f8fafc" stroke="#86efac" stroke-width="2" />
  <text x="122" y="223" class="hdr" fill="#15803d">3. Crossing Minimization</text>
  <!-- Vorher: Kreuzung (links gedimmt) -->
  <line x1="45" y1="260" x2="95" y2="325" stroke="#fca5a5" stroke-width="2" />
  <line x1="45" y1="325" x2="95" y2="260" stroke="#fca5a5" stroke-width="2" />
  <!-- Nachher: Parallel (rechts grün) -->
  <line x1="145" y1="260" x2="198" y2="260" stroke="#16a34a" stroke-width="2.5" marker-end="url(#sg-arr)" />
  <line x1="145" y1="325" x2="198" y2="325" stroke="#16a34a" stroke-width="2.5" marker-end="url(#sg-arr)" />
  <circle cx="145" cy="260" r="11" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />
  <circle cx="145" cy="325" r="11" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />
  <circle cx="205" cy="260" r="11" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />
  <circle cx="205" cy="325" r="11" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />

  <!-- 4. Spline Routing -->
  <rect x="250" y="200" width="215" height="165" rx="10" fill="#f8fafc" stroke="#86efac" stroke-width="2" />
  <text x="357" y="223" class="hdr" fill="#15803d">4. Spline Routing</text>
  <rect x="272" y="268" width="44" height="30" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
  <rect x="336" y="268" width="44" height="30" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
  <rect x="400" y="268" width="44" height="30" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
  <line x1="316" y1="283" x2="332" y2="283" stroke="#475569" stroke-width="2" marker-end="url(#sg-arr)" />
  <line x1="380" y1="283" x2="396" y2="283" stroke="#475569" stroke-width="2" marker-end="url(#sg-arr)" />
  <path d="M 422 298 C 422 342, 294 342, 294 302" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#sg-arr)" />
</svg>
`);

// 17. Reine Illustration (480x380): Force-Directed Feder- & Coulomb-Kräfte
writeSvg('ForceDirected_Kraefte_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 15px; font-weight: bold; text-anchor: middle; }
    </style>
    <marker id="fd-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#2563eb" />
    </marker>
    <marker id="fd-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#dc2626" />
    </marker>
  </defs>

  <!-- Oben: Anziehende Federkraft zwischen verbundenen Knoten -->
  <rect x="15" y="15" width="450" height="165" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="2" />
  <text x="240" y="42" class="hdr" fill="#1d4ed8">1. Kanten als Zugfedern (Anziehung)</text>

  <!-- Zickzack-Feder -->
  <polyline points="118,105 145,105 155,88 175,122 195,88 215,122 235,88 255,122 275,88 295,122 315,88 325,105 362,105" fill="none" stroke="#64748b" stroke-width="2.5" />
  <line x1="122" y1="75" x2="185" y2="75" stroke="#2563eb" stroke-width="3.5" marker-end="url(#fd-blue)" />
  <line x1="358" y1="75" x2="295" y2="75" stroke="#2563eb" stroke-width="3.5" marker-end="url(#fd-blue)" />

  <circle cx="95" cy="105" r="24" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5" />
  <text x="95" y="110" class="code" fill="#1e3a8a">v_1</text>
  <circle cx="385" cy="105" r="24" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5" />
  <text x="385" y="110" class="code" fill="#1e3a8a">v_2</text>
  <text x="240" y="160" class="code" fill="#1e40af">Zieht verbundene Nachbarn auf Sollabstand d_0</text>

  <!-- Unten: Abstoßende Coulomb-Kraft zwischen allen Knoten -->
  <rect x="15" y="200" width="450" height="165" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="2" />
  <text x="240" y="227" class="hdr" fill="#b91c1c">2. Knoten als gleiche Ladungen (Abstoßung)</text>

  <line x1="145" y1="290" x2="72" y2="290" stroke="#dc2626" stroke-width="3.5" marker-end="url(#fd-red)" />
  <line x1="335" y1="290" x2="408" y2="290" stroke="#dc2626" stroke-width="3.5" marker-end="url(#fd-red)" />

  <circle cx="175" cy="290" r="24" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5" />
  <text x="175" y="295" class="code" fill="#991b1b">+q</text>
  <circle cx="305" cy="290" r="24" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5" />
  <text x="305" y="295" class="code" fill="#991b1b">+q</text>
  <text x="240" y="345" class="code" fill="#991b1b">Verhindert Überlappung nicht-verbundener Knoten</text>
</svg>
`);
