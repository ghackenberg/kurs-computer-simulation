const fs = require('fs');
const path = require('path');

const dir = path.resolve('Folien/03_Visualisierung_2D_Vektor/Diagramme');

// We will recreate/update each of the 14 SVGs with:
// - width="270" height="420" viewBox="0 0 270 420"
// - All font sizes >= 12.5px (with min 12px for tiny labels, scaled >= 11.5px)
// - No collisions, clean backgrounds, proper shields for lines

const svgs = {};

// 1. Mini_Vektor_vs_Pixel.svg
svgs['Mini_Vektor_vs_Pixel.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">Rastergrafik vs. Vektor</text>
  <text x="135" y="42" class="sub">Zoom-Vergleich (800 %)</text>

  <!-- Box 1: Raster -->
  <g transform="translate(15, 54)">
    <rect width="240" height="135" rx="6" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #b91c1c;">1. Rastergrafik (Pixel)</text>
    
    <g transform="translate(30, 32)">
      <rect x="0" y="48" width="16" height="16" fill="#dc2626" stroke="#991b1b" stroke-width="0.5" />
      <rect x="16" y="48" width="16" height="16" fill="#ef4444" stroke="#991b1b" stroke-width="0.5" />
      <rect x="32" y="32" width="16" height="16" fill="#dc2626" stroke="#991b1b" stroke-width="0.5" />
      <rect x="48" y="32" width="16" height="16" fill="#ef4444" stroke="#991b1b" stroke-width="0.5" />
      <rect x="64" y="16" width="16" height="16" fill="#dc2626" stroke="#991b1b" stroke-width="0.5" />
      <rect x="80" y="16" width="16" height="16" fill="#ef4444" stroke="#991b1b" stroke-width="0.5" />
      <rect x="96" y="0" width="16" height="16" fill="#dc2626" stroke="#991b1b" stroke-width="0.5" />
      <rect x="112" y="0" width="16" height="16" fill="#ef4444" stroke="#991b1b" stroke-width="0.5" />
      <circle cx="150" cy="38" r="18" fill="none" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="3,2" />
      <path d="M 140 28 L 160 48 M 140 48 L 160 28" stroke="#b91c1c" stroke-width="2" />
    </g>

    <text x="120" y="112" class="desc" style="font-weight: bold; fill: #991b1b;">Treppen &amp; Unschärfe</text>
    <text x="120" y="127" class="desc" style="fill: #7f1d1d;">Feste Pixelmatrix</text>
  </g>

  <!-- Box 2: Vektor -->
  <g transform="translate(15, 202)">
    <rect width="240" height="135" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #15803d;">2. Vektorgrafik (Analytisch)</text>

    <g transform="translate(30, 30)">
      <path d="M 10 65 Q 65 65 115 10" fill="none" stroke="#16a34a" stroke-width="5" stroke-linecap="round" />
      <circle cx="10" cy="65" r="4" fill="#15803d" />
      <circle cx="115" cy="10" r="4" fill="#15803d" />
      <circle cx="150" cy="38" r="18" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" />
      <path d="M 142 38 L 148 44 L 158 32" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <text x="120" y="112" class="desc" style="font-weight: bold; fill: #166534;">Gestochen scharf!</text>
    <text x="120" y="127" class="desc" style="fill: #14532d;">Auflösungsunabhängig</text>
  </g>

  <!-- Summary Footer -->
  <rect x="15" y="348" width="240" height="58" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5" />
  <text x="135" y="370" class="lbl" style="fill: #1d4ed8;">Ingenieur-Fazit</text>
  <text x="135" y="392" class="desc" style="font-weight: bold; fill: #1e3a8a;">CAD &amp; Fachwerke brauchen Vektoren</text>
</svg>`;

// 2. Mini_WPF_Szenengraph.svg
svgs['Mini_WPF_Szenengraph.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">WPF Retained-Mode Baum</text>
  <text x="135" y="42" class="sub">Der Visual Tree im RAM</text>

  <!-- Node 1: Window -->
  <g transform="translate(60, 56)">
    <rect width="150" height="34" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="1.5" />
    <text x="75" y="22" class="lbl" style="fill: #ffffff;">MainWindow</text>
  </g>

  <line x1="135" y1="90" x2="135" y2="108" stroke="#64748b" stroke-width="2" />
  <polygon points="135,112 131,104 139,104" fill="#64748b" />

  <!-- Node 2: Border -->
  <g transform="translate(60, 114)">
    <rect width="150" height="34" rx="5" fill="#334155" stroke="#1e293b" stroke-width="1.5" />
    <text x="75" y="22" class="lbl" style="fill: #f8fafc;">Border (Clip)</text>
  </g>

  <line x1="135" y1="148" x2="135" y2="166" stroke="#64748b" stroke-width="2" />
  <polygon points="135,170 131,162 139,162" fill="#64748b" />

  <!-- Node 3: Canvas -->
  <g transform="translate(50, 172)">
    <rect width="170" height="38" rx="5" fill="#0284c7" stroke="#0369a1" stroke-width="1.5" />
    <text x="85" y="24" class="lbl" style="fill: #ffffff;">Canvas Viewport</text>
  </g>

  <!-- Branches -->
  <path d="M 95 210 L 95 230 L 45 230 L 45 248" fill="none" stroke="#0284c7" stroke-width="1.5" />
  <path d="M 135 210 L 135 248" fill="none" stroke="#0284c7" stroke-width="1.5" />
  <path d="M 175 210 L 175 230 L 225 230 L 225 248" fill="none" stroke="#0284c7" stroke-width="1.5" />

  <!-- Children -->
  <g transform="translate(10, 250)">
    <rect width="70" height="42" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.2" />
    <text x="35" y="26" class="lbl" style="fill: #1d4ed8;">Line</text>
  </g>
  <g transform="translate(100, 250)">
    <rect width="70" height="42" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.2" />
    <text x="35" y="26" class="lbl" style="fill: #1d4ed8;">Ellipse</text>
  </g>
  <g transform="translate(190, 250)">
    <rect width="70" height="42" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.2" />
    <text x="35" y="26" class="lbl" style="fill: #1d4ed8;">Polygon</text>
  </g>

  <!-- Summary Card -->
  <rect x="15" y="312" width="240" height="94" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
  <text x="135" y="335" class="lbl" style="fill: #15803d;">Persistenter Objekt-Baum</text>
  <text x="135" y="358" class="desc" style="fill: #166534;">Jedes Shape lebt als C#-Objekt</text>
  <text x="135" y="380" class="desc" style="font-weight: bold; fill: #14532d;">WPF zeichnet automatisch neu!</text>
</svg>`;

// 3. Mini_WPF_Grundformen.svg
svgs['Mini_WPF_Grundformen.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 13px; font-weight: bold; fill: #0369a1; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">WPF Shape Grundformen</text>
  <text x="135" y="42" class="sub">Vektor-Primitive für Modelle</text>

  <!-- Shape 1: Line -->
  <g transform="translate(15, 54)">
    <rect width="240" height="66" rx="5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" />
    <line x1="20" y1="46" x2="90" y2="20" stroke="#2563eb" stroke-width="3" stroke-linecap="round" />
    <circle cx="20" cy="46" r="3" fill="#1e40af" />
    <circle cx="90" cy="20" r="3" fill="#1e40af" />
    <text x="165" y="28" class="code">Line</text>
    <text x="165" y="48" class="desc" style="font-weight: bold; fill: #1d4ed8;">Stäbe &amp; Achsen</text>
  </g>

  <!-- Shape 2: Polygon & Ellipse -->
  <g transform="translate(15, 126)">
    <rect width="240" height="74" rx="5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" />
    <circle cx="35" cy="37" r="16" fill="#e0e7ff" stroke="#4f46e5" stroke-width="2" />
    <polygon points="90,52 72,22 108,22" fill="#fde68a" stroke="#d97706" stroke-width="2" />
    <text x="175" y="30" class="code">Ellipse &amp; Polygon</text>
    <text x="175" y="52" class="desc" style="font-weight: bold; fill: #4338ca;">Knoten &amp; Pfeile</text>
  </g>

  <!-- Shape 3: Path -->
  <g transform="translate(15, 206)">
    <rect width="240" height="84" rx="5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" />
    <path d="M 15 60 C 35 10, 75 80, 105 25" fill="none" stroke="#dc2626" stroke-width="2.5" />
    <circle cx="35" cy="10" r="2.5" fill="#64748b" />
    <circle cx="75" cy="80" r="2.5" fill="#64748b" />
    <text x="175" y="34" class="code">Path (Bézier)</text>
    <text x="175" y="56" class="desc" style="font-weight: bold; fill: #b91c1c;">Biegelinien &amp; CAD</text>
  </g>

  <!-- Summary Footer -->
  <rect x="15" y="298" width="240" height="108" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2" />
  <text x="135" y="322" class="lbl" style="fill: #0f172a;">Attached Properties</text>
  <text x="135" y="345" class="code" style="text-anchor: middle;">Canvas.SetLeft(el, x);</text>
  <text x="135" y="365" class="code" style="text-anchor: middle;">Canvas.SetTop(el, y);</text>
  <text x="135" y="390" class="desc" style="font-weight: bold; fill: #0f172a;">Container steuert Position!</text>
</svg>`;

// 4. Mini_Welt_vs_Screen.svg
svgs['Mini_Welt_vs_Screen.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .axis { font-family: 'Cambria Math', serif; font-size: 13px; font-weight: bold; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">Das Achsen-Paradoxon</text>
  <text x="135" y="42" class="sub">Physik vs. Monitor-Raster</text>

  <!-- Box 1: Welt -->
  <g transform="translate(15, 54)">
    <rect width="240" height="140" rx="6" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #1e40af;">Welt-System (Physik / [m])</text>

    <g transform="translate(30, 115)">
      <line x1="0" y1="0" x2="150" y2="0" stroke="#1d4ed8" stroke-width="2" />
      <polygon points="156,0 146,-4 146,4" fill="#1d4ed8" />
      <text x="160" y="4" class="axis" style="fill: #1d4ed8;">+X</text>

      <line x1="0" y1="0" x2="0" y2="-70" stroke="#1d4ed8" stroke-width="2" />
      <polygon points="0,-76 -4,-66 4,-66" fill="#1d4ed8" />
      <text x="8" y="-65" class="axis" style="fill: #1d4ed8;">+Y</text>

      <circle cx="80" cy="-45" r="4" fill="#2563eb" />
      <!-- Shield rect to avoid line collision -->
      <rect x="15" y="-30" width="130" height="20" rx="3" fill="#ffffff" stroke="#93c5fd" stroke-width="1" />
      <text x="80" y="-16" class="desc" style="fill: #1e40af; font-weight: bold;">+Y zeigt nach OBEN</text>
    </g>
  </g>

  <!-- Box 2: Screen -->
  <g transform="translate(15, 204)">
    <rect width="240" height="140" rx="6" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #b91c1c;">WPF Canvas (Screen / [px])</text>

    <g transform="translate(30, 45)">
      <line x1="0" y1="0" x2="150" y2="0" stroke="#dc2626" stroke-width="2" />
      <polygon points="156,0 146,-4 146,4" fill="#dc2626" />
      <text x="160" y="4" class="axis" style="fill: #dc2626;">+X</text>

      <line x1="0" y1="0" x2="0" y2="70" stroke="#dc2626" stroke-width="2" />
      <polygon points="0,76 -4,66 4,66" fill="#dc2626" />
      <text x="8" y="70" class="axis" style="fill: #dc2626;">+Y</text>

      <circle cx="0" cy="0" r="4" fill="#991b1b" />
      <circle cx="80" cy="45" r="4" fill="#ef4444" />
      <rect x="15" y="10" width="130" height="20" rx="3" fill="#ffffff" stroke="#fca5a5" stroke-width="1" />
      <text x="80" y="24" class="desc" style="fill: #b91c1c; font-weight: bold;">+Y zeigt nach UNTEN!</text>
    </g>
  </g>

  <!-- Footer -->
  <rect x="15" y="354" width="240" height="52" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1.5" />
  <text x="135" y="374" class="lbl" style="fill: #b45309;">Invertierungs-Formel</text>
  <text x="135" y="393" class="desc" style="font-weight: bold; fill: #92400e;">y_screen = y_off + (Y_max - y_w) · s</text>
</svg>`;

// 5. Mini_Anisotropie_Falle.svg
svgs['Mini_Anisotropie_Falle.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .math { font-family: 'Cambria Math', serif; font-size: 13px; font-weight: bold; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">Die Anisotropie-Falle</text>
  <text x="135" y="42" class="sub">Naive Skalierung verzerrt</text>

  <!-- Box 1: Anisotrop -->
  <g transform="translate(15, 54)">
    <rect width="240" height="135" rx="6" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #b91c1c;">1. Naiv: s_x ≠ s_y (FALSCH)</text>

    <g transform="translate(25, 32)">
      <ellipse cx="50" cy="45" rx="42" ry="20" fill="#fee2e2" stroke="#dc2626" stroke-width="2" />
      <polygon points="120,65 190,65 155,20" fill="none" stroke="#dc2626" stroke-width="2" />
      <circle cx="155" cy="20" r="3" fill="#991b1b" />
      <circle cx="120" cy="65" r="3" fill="#991b1b" />
      <circle cx="190" cy="65" r="3" fill="#991b1b" />
    </g>

    <text x="120" y="112" class="desc" style="font-weight: bold; fill: #991b1b;">Winkel &amp; Maße verfälscht!</text>
    <text x="120" y="127" class="desc" style="fill: #7f1d1d;">Kreis wird zur Ellipse</text>
  </g>

  <!-- Box 2: Isotrop -->
  <g transform="translate(15, 202)">
    <rect width="240" height="135" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #15803d;">2. Isotrop: s = min(s_x, s_y)</text>

    <g transform="translate(25, 32)">
      <circle cx="50" cy="45" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />
      <polygon points="120,70 190,70 155,20" fill="none" stroke="#16a34a" stroke-width="2" />
      <circle cx="155" cy="20" r="3" fill="#15803d" />
      <circle cx="120" cy="70" r="3" fill="#15803d" />
      <circle cx="190" cy="70" r="3" fill="#15803d" />
    </g>

    <text x="120" y="112" class="desc" style="font-weight: bold; fill: #166534;">100 % form- &amp; winkeltreu</text>
    <text x="120" y="127" class="desc" style="fill: #14532d;">Physikalisch korrekt</text>
  </g>

  <!-- Footer -->
  <rect x="15" y="348" width="240" height="58" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5" />
  <text x="135" y="370" class="lbl" style="fill: #1d4ed8;">Die Goldene Regel</text>
  <text x="135" y="392" class="math" style="fill: #1e3a8a; text-anchor: middle;">s = Math.Min(sx, sy);</text>
</svg>`;

// 6. Mini_Bounding_Box.svg
svgs['Mini_Bounding_Box.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .dim { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #0369a1; font-weight: bold; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">Bounding Box &amp; Offsets</text>
  <text x="135" y="42" class="sub">Vom Extremwert zur Zeichenfläche</text>

  <!-- Outer Canvas Box -->
  <g transform="translate(15, 54)">
    <rect width="240" height="220" rx="6" fill="#ffffff" stroke="#0284c7" stroke-width="2" />
    <text x="120" y="18" class="dim" style="text-anchor: middle;">Canvas Viewport</text>

    <!-- Margin Inset -->
    <rect x="20" y="26" width="200" height="176" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4,3" />
    <text x="120" y="40" class="dim" style="text-anchor: middle; fill: #64748b;">Nutzfläche (DrawArea)</text>

    <!-- Centered Truss Bounding Box -->
    <g transform="translate(50, 65)">
      <rect width="140" height="105" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="2,2" />
      <polygon points="10,90 130,90 70,18" fill="none" stroke="#1d4ed8" stroke-width="2.5" />
      <circle cx="10" cy="90" r="4" fill="#1e40af" />
      <circle cx="130" cy="90" r="4" fill="#1e40af" />
      <circle cx="70" cy="18" r="4" fill="#1e40af" />
    </g>

    <!-- Offsets -->
    <text x="35" y="115" class="dim" style="fill: #b45309;">x_off</text>
    <text x="205" y="115" class="dim" style="fill: #b45309;">x_off</text>
  </g>

  <!-- Formula Summary Card -->
  <g transform="translate(15, 286)">
    <rect width="240" height="120" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #15803d;">Berechnungs-Pipeline</text>
    <text x="120" y="44" class="desc" style="font-weight: bold; fill: #166534;">W_world = X_max - X_min</text>
    <text x="120" y="66" class="desc" style="font-weight: bold; fill: #166534;">s = Math.Min(dW/W_w, dH/H_w)</text>
    <text x="120" y="88" class="desc" style="font-weight: bold; fill: #047857;">x_off = margin + (dW - W_w·s)/2</text>
    <text x="120" y="108" class="desc" style="font-weight: bold; fill: #14532d;">Automatisch zentriert!</text>
  </g>
</svg>`;

// 7. Mini_Pfeil_Vektorgeometrie.svg
svgs['Mini_Pfeil_Vektorgeometrie.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .math { font-family: 'Cambria Math', serif; font-size: 13px; font-weight: bold; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">Analytische Pfeilspitze</text>
  <text x="135" y="42" class="sub">Reine Vektoralgebra</text>

  <!-- Construction -->
  <g transform="translate(15, 54)">
    <rect width="240" height="220" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" />

    <line x1="30" y1="170" x2="160" y2="60" stroke="#dc2626" stroke-width="3" />
    <circle cx="30" cy="170" r="4" fill="#991b1b" />
    <text x="30" y="195" class="math" style="fill: #991b1b; text-anchor: middle;">P_node</text>

    <circle cx="160" cy="60" r="4" fill="#dc2626" />
    <text x="175" y="55" class="math" style="fill: #dc2626; text-anchor: start;">P_tip</text>

    <!-- Base & Wings -->
    <circle cx="128" cy="88" r="3" fill="#2563eb" />
    <text x="100" y="105" class="math" style="fill: #2563eb; text-anchor: end;">P_base</text>

    <!-- Triangle Polygon Fill -->
    <polygon points="160,60 110,72 142,108" fill="#fca5a5" stroke="#dc2626" stroke-width="2" />
    <text x="95" y="65" class="math" style="fill: #059669; text-anchor: end;">P_wing1</text>
    <text x="155" y="125" class="math" style="fill: #059669; text-anchor: start;">P_wing2</text>
  </g>

  <!-- Steps -->
  <g transform="translate(15, 286)">
    <rect width="240" height="120" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #1d4ed8;">Der 4-Schritte-Algorithmus</text>
    <text x="20" y="44" class="math" style="fill: #1e40af;">1. e_u = F / ||F||</text>
    <text x="20" y="64" class="math" style="fill: #1e40af;">2. e_u_perp = (-e_y, e_x)^T</text>
    <text x="20" y="84" class="math" style="fill: #1e40af;">3. P_base = P_tip - L · e_u</text>
    <text x="20" y="104" class="math" style="fill: #1e40af;">4. P_wing1,2 = P_base ± (W/2) · e_perp</text>
  </g>
</svg>`;

// 8. Mini_DIN_406_Bemaszung.svg
svgs['Mini_DIN_406_Bemaszung.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .cad { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; fill: #0f172a; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">DIN-406 Bemaßungskette</text>
  <text x="135" y="42" class="sub">Normgerechte Bemaßung</text>

  <!-- Drawing Area -->
  <g transform="translate(15, 54)">
    <rect width="240" height="210" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" />

    <!-- Bauteil -->
    <rect x="40" y="35" width="160" height="24" fill="#e2e8f0" stroke="#475569" stroke-width="2" />
    <circle cx="40" cy="47" r="4" fill="#0f172a" />
    <circle cx="200" cy="47" r="4" fill="#0f172a" />
    <text x="120" y="52" class="cad" style="text-anchor: middle; fill: #334155;">Trägeruntergurt</text>

    <!-- Extension lines -->
    <line x1="40" y1="62" x2="40" y2="150" stroke="#64748b" stroke-width="1.5" />
    <line x1="200" y1="62" x2="200" y2="150" stroke="#64748b" stroke-width="1.5" />

    <!-- Dimension Line -->
    <line x1="40" y1="130" x2="200" y2="130" stroke="#0284c7" stroke-width="2" />
    <polygon points="40,130 52,126 52,134" fill="#0284c7" />
    <polygon points="200,130 188,126 188,134" fill="#0284c7" />

    <!-- Dimension Text with shield rect -->
    <rect x="95" y="116" width="50" height="22" rx="3" fill="#ffffff" stroke="#0284c7" stroke-width="1" />
    <text x="120" y="132" class="cad" style="fill: #0369a1; text-anchor: middle;">4.00 m</text>

    <text x="120" y="180" class="desc" style="fill: #64748b;">Überstand ca. 2 mm</text>
  </g>

  <!-- Rules -->
  <g transform="translate(15, 276)">
    <rect width="240" height="130" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
    <text x="120" y="24" class="lbl" style="fill: #15803d;">DIN 406 Regeln</text>
    <text x="120" y="50" class="desc" style="font-weight: bold; fill: #166534;">1. Maßhilfslinien:</text>
    <text x="120" y="68" class="desc" style="fill: #14532d;">Abstand zum Knoten &amp; Überstand</text>
    <text x="120" y="90" class="desc" style="font-weight: bold; fill: #166534;">2. Maßlinie mit Pfeilen (1:3)</text>
    <text x="120" y="112" class="desc" style="font-weight: bold; fill: #14532d;">3. Maßzahl zentriert mit Einheit</text>
  </g>
</svg>`;

// 9. Mini_Pan_Zoom_Matrix.svg
svgs['Mini_Pan_Zoom_Matrix.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .math { font-family: 'Cambria Math', serif; font-size: 13px; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">GPU-MatrixTransform</text>
  <text x="135" y="42" class="sub">Hardwarebeschleunigte Navigation</text>

  <!-- CPU Box -->
  <g transform="translate(15, 54)">
    <rect width="240" height="120" rx="6" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #b91c1c;">Ansatz A: CPU-Neuzeichnen</text>
    <text x="120" y="45" class="desc" style="fill: #7f1d1d;">10.000 Shapes neu verschieben:</text>
    <text x="120" y="65" class="desc" style="font-weight: bold; fill: #991b1b;">Canvas.SetLeft(), SetTop()</text>
    <text x="120" y="88" class="desc" style="font-weight: bold; fill: #b91c1c;">UI ruckelt stark (&lt; 15 FPS)</text>
    <text x="120" y="106" class="desc" style="fill: #7f1d1d;">O(N) CPU-Aufwand pro Event</text>
  </g>

  <!-- GPU Box -->
  <g transform="translate(15, 186)">
    <rect width="240" height="125" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #15803d;">Ansatz B: GPU MatrixTransform</text>
    <text x="120" y="45" class="desc" style="fill: #166534;">Modell bleibt starr gezeichnet</text>
    
    <g transform="translate(45, 52)">
      <rect width="150" height="38" rx="4" fill="#ffffff" stroke="#16a34a" stroke-width="1.2" />
      <text x="75" y="24" class="math" style="fill: #15803d; text-anchor: middle;">M = [ S,  0,  dx;  0,  S,  dy ]</text>
    </g>

    <text x="120" y="110" class="desc" style="font-weight: bold; fill: #15803d;">O(1) Aufwand: Konstant 60+ FPS!</text>
  </g>

  <!-- Footer -->
  <rect x="15" y="322" width="240" height="84" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5" />
  <text x="135" y="344" class="lbl" style="fill: #1d4ed8;">Architektur-Vorteil</text>
  <text x="135" y="366" class="desc" style="fill: #1e40af;">Entkopplung von Geometrie &amp; Kamera</text>
  <text x="135" y="388" class="desc" style="font-weight: bold; fill: #1e3a8a;">0 B Allokationen im Navigationstakt!</text>
</svg>`;

// 10. Mini_ScaleAt_Cursor.svg
svgs['Mini_ScaleAt_Cursor.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .math { font-family: 'Cambria Math', serif; font-size: 13px; font-weight: bold; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">ScaleAt: Fixpunkt-Zoom</text>
  <text x="135" y="42" class="sub">Zentriert auf den Mauszeiger</text>

  <!-- Illustration -->
  <g transform="translate(15, 54)">
    <rect width="240" height="220" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" />

    <!-- Cursor Position -->
    <g transform="translate(150, 110)">
      <circle cx="0" cy="0" r="16" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="2,2" />
      <circle cx="0" cy="0" r="3" fill="#dc2626" />
      <text x="8" y="-8" class="math" style="fill: #991b1b;">P_cursor</text>
      <polygon points="12,12 12,28 17,23 23,32 26,30 20,21 27,20" fill="#1e293b" stroke="#ffffff" stroke-width="1" />
    </g>

    <!-- Small Object -->
    <polygon points="70,140 160,140 150,110" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,2" />
    <text x="85" y="155" class="desc" style="fill: #64748b;">Vor Zoom</text>

    <!-- Large Object -->
    <polygon points="30,165 200,165 150,110" fill="none" stroke="#2563eb" stroke-width="2.5" />
    <text x="75" y="185" class="desc" style="fill: #1d4ed8; font-weight: bold;">Nach ScaleAt(zoom, P)</text>
  </g>

  <!-- Explanation -->
  <g transform="translate(15, 286)">
    <rect width="240" height="120" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
    <text x="120" y="24" class="lbl" style="fill: #15803d;">Analytische 3er-Operation</text>
    <text x="120" y="48" class="desc" style="fill: #166534;">1. Translate(-P.X, -P.Y)</text>
    <text x="120" y="68" class="desc" style="fill: #166534;">2. Scale(zoom, zoom)</text>
    <text x="120" y="88" class="desc" style="fill: #166534;">3. Translate(+P.X, +P.Y)</text>
    <text x="120" y="108" class="desc" style="font-weight: bold; fill: #14532d;">Fixpunkt bleibt ortsfest!</text>
  </g>
</svg>`;

// 11. Mini_Jitter_Schleife.svg
svgs['Mini_Jitter_Schleife.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .loop { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">Die Dragging-Jitter-Falle</text>
  <text x="135" y="42" class="sub">Teufelskreis beim Ziehen</text>

  <!-- Cycle -->
  <g transform="translate(15, 54)">
    <rect width="240" height="220" rx="6" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5" />

    <!-- Step 1 -->
    <g transform="translate(35, 20)">
      <rect width="170" height="34" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1.2" />
      <text x="85" y="22" class="loop" style="fill: #991b1b; text-anchor: middle;">1. Maus zieht Knoten</text>
    </g>

    <!-- Step 2 -->
    <g transform="translate(35, 75)">
      <rect width="170" height="34" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1.2" />
      <text x="85" y="22" class="loop" style="fill: #991b1b; text-anchor: middle;">2. BoundingBox wächst</text>
    </g>

    <!-- Step 3 -->
    <g transform="translate(35, 130)">
      <rect width="170" height="34" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1.2" />
      <text x="85" y="22" class="loop" style="fill: #991b1b; text-anchor: middle;">3. Maßstab schrumpft!</text>
    </g>

    <text x="120" y="195" class="desc" style="font-weight: bold; fill: #b91c1c;">➔ Heftiges Flackern &amp; Zittern</text>
  </g>

  <!-- Fix -->
  <g transform="translate(15, 286)">
    <rect width="240" height="120" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
    <text x="120" y="24" class="lbl" style="fill: #15803d;">Die saubere Sprint-Lösung</text>
    <text x="120" y="50" class="desc" style="fill: #166534;">Auto-Fit BoundingBox einfrieren,</text>
    <text x="120" y="72" class="desc" style="font-weight: bold; fill: #15803d;">solange Dragging aktiv ist!</text>
    <text x="120" y="98" class="desc" style="font-family: Consolas; font-weight: bold; fill: #047857;">if (_draggedNode == null)</text>
  </g>
</svg>`;

// 12. Mini_Screen_to_World.svg
svgs['Mini_Screen_to_World.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .math { font-family: 'Cambria Math', serif; font-size: 13px; font-weight: bold; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">ScreenToWorld Pipeline</text>
  <text x="135" y="42" class="sub">Vom Klick zur Physik</text>

  <!-- Step 1 -->
  <g transform="translate(30, 56)">
    <rect width="210" height="44" rx="5" fill="#fef2f2" stroke="#dc2626" stroke-width="1.2" />
    <text x="105" y="18" class="lbl" style="fill: #991b1b;">Mausklick auf Canvas</text>
    <text x="105" y="34" class="math" style="fill: #b91c1c; text-anchor: middle;">P_screen (x, y) in [px]</text>
  </g>

  <!-- Step 2 -->
  <g transform="translate(30, 116)">
    <rect width="210" height="64" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5" />
    <text x="105" y="22" class="lbl" style="fill: #1d4ed8;">1. Matrix-Invertierung</text>
    <text x="105" y="48" class="math" style="fill: #1e3a8a; text-anchor: middle;">P_unzoom = M^-1 · P_screen</text>
  </g>

  <!-- Step 3 -->
  <g transform="translate(30, 196)">
    <rect width="210" height="84" rx="5" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" />
    <text x="105" y="22" class="lbl" style="fill: #15803d;">2. Viewport-Invertierung</text>
    <text x="105" y="46" class="math" style="fill: #166534; text-anchor: middle;">x_w = X_min + (x - x_off)/s</text>
    <text x="105" y="68" class="math" style="fill: #166534; text-anchor: middle;">y_w = Y_max - (y - y_off)/s</text>
  </g>

  <!-- Output -->
  <g transform="translate(30, 296)">
    <rect width="210" height="50" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
    <text x="105" y="20" class="lbl" style="fill: #b45309;">Physikalischer Weltpunkt</text>
    <text x="105" y="38" class="math" style="fill: #92400e; text-anchor: middle;">P_world (x_w, y_w) in [m]</text>
  </g>

  <!-- Footer -->
  <rect x="15" y="360" width="240" height="46" rx="5" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
  <text x="135" y="388" class="desc" style="font-weight: bold; fill: #0f172a;">Exakte Treffer bei Hit-Testing!</text>
</svg>`;

// 13. Mini_Shape_vs_DrawingVisual.svg
svgs['Mini_Shape_vs_DrawingVisual.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 13px; font-weight: bold; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">Shapes vs. DrawingVisual</text>
  <text x="135" y="42" class="sub">Der interne Overhead</text>

  <!-- Box 1 -->
  <g transform="translate(15, 54)">
    <rect width="240" height="135" rx="6" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #b91c1c;">WPF Shapes (Line, Ellipse)</text>
    
    <g transform="translate(15, 30)">
      <rect width="210" height="24" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1" />
      <text x="105" y="17" class="code" style="fill: #991b1b; text-anchor: middle;">Visual ➔ UIElement ➔ Shape</text>
    </g>

    <text x="120" y="75" class="desc" style="fill: #7f1d1d;">• Hunderte Dependency Properties</text>
    <text x="120" y="95" class="desc" style="font-weight: bold; fill: #991b1b;">• 2-stufiger Layout-Pass!</text>
    <text x="120" y="120" class="desc" style="fill: #b91c1c; font-weight: bold;">Limit: Kollaps ab ~2.000 Shapes</text>
  </g>

  <!-- Box 2 -->
  <g transform="translate(15, 202)">
    <rect width="240" height="135" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #15803d;">DrawingVisual (Low-Level)</text>

    <g transform="translate(15, 30)">
      <rect width="210" height="24" rx="3" fill="#dcfce7" stroke="#22c55e" stroke-width="1" />
      <text x="105" y="17" class="code" style="fill: #15803d; text-anchor: middle;">Erbt direkt von Visual!</text>
    </g>

    <text x="120" y="75" class="desc" style="fill: #14532d;">• KEIN UIElement, KEIN Layout</text>
    <text x="120" y="95" class="desc" style="font-weight: bold; fill: #166534;">• Direkter GPU-Befehls-Stream</text>
    <text x="120" y="120" class="desc" style="fill: #15803d; font-weight: bold;">Performance: &gt; 100.000 Stäbe</text>
  </g>

  <!-- Footer -->
  <rect x="15" y="348" width="240" height="58" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5" />
  <text x="135" y="370" class="lbl" style="fill: #1d4ed8;">Empfehlung</text>
  <text x="135" y="392" class="desc" style="font-weight: bold; fill: #1e3a8a;">Große Netze mit DrawingVisual!</text>
</svg>`;

// 14. Mini_Freeze_Optimierung.svg
svgs['Mini_Freeze_Optimierung.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 420" width="270" height="420">
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14.5px; font-weight: bold; fill: #004B96; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; text-anchor: middle; }
      .desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #334155; text-anchor: middle; }
      .code { font-family: 'Consolas', monospace; font-size: 13px; font-weight: bold; }
    </style>
  </defs>

  <rect width="270" height="420" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="135" y="24" class="hdr">Die Freeze()-Doktrin</text>
  <text x="135" y="42" class="sub">Freezable Objekte in WPF</text>

  <!-- Box 1 -->
  <g transform="translate(15, 54)">
    <rect width="240" height="135" rx="6" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #b91c1c;">1. Ohne Freeze()</text>

    <g transform="translate(15, 30)">
      <rect width="210" height="24" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1" />
      <text x="105" y="17" class="code" style="fill: #991b1b; text-anchor: middle;">var pen = new Pen(...);</text>
    </g>

    <text x="120" y="75" class="desc" style="fill: #7f1d1d;">• Lauscht auf Modifikationen</text>
    <text x="120" y="95" class="desc" style="font-weight: bold; fill: #991b1b;">• NICHT thread-sicher!</text>
    <text x="120" y="120" class="desc" style="fill: #b91c1c; font-weight: bold;">Hohe GC-Last bei 60 FPS!</text>
  </g>

  <!-- Box 2 -->
  <g transform="translate(15, 202)">
    <rect width="240" height="135" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
    <text x="120" y="22" class="lbl" style="fill: #15803d;">2. Mit pen.Freeze()</text>

    <g transform="translate(15, 30)">
      <rect width="210" height="24" rx="3" fill="#dcfce7" stroke="#22c55e" stroke-width="1" />
      <text x="105" y="17" class="code" style="fill: #15803d; text-anchor: middle;">pen.Freeze(); // Immutable</text>
    </g>

    <text x="120" y="75" class="desc" style="fill: #14532d;">• Kein Change-Tracking mehr</text>
    <text x="120" y="95" class="desc" style="font-weight: bold; fill: #166534;">• Thread-sicher für Render-Thread</text>
    <text x="120" y="120" class="desc" style="fill: #15803d; font-weight: bold;">0 Bytes neue GC-Allokationen!</text>
  </g>

  <!-- Footer -->
  <rect x="15" y="348" width="240" height="58" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5" />
  <text x="135" y="370" class="lbl" style="fill: #1d4ed8;">Die Goldene Regel</text>
  <text x="135" y="392" class="desc" style="font-weight: bold; fill: #1e3a8a;">Stets alle Pens &amp; Brushes freezen!</text>
</svg>`;

// Write all SVGs
for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, filename), content.trim(), 'utf8');
  console.log(`Generated optimized: ${filename}`);
}

console.log('All 14 Mini SVGs optimized successfully.');
