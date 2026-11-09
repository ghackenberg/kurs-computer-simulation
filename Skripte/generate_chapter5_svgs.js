/**
 * Generator für die didaktischen SVG-Grafiken in Kapitel 05 (3D-Visualisierung mit OpenGL)
 * Erzeugt großflächige Übersichtsgrafiken (1080x450) sowie maßgeschneiderte
 * halbseitige Illustrationen (viewBox="-45 0 570 380") gemäß svg-diagramm-design Skill.
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'Folien', '05_Visualisierung_3D_OpenGL', 'Diagramme');
fs.mkdirSync(outDir, { recursive: true });

function writeSvg(name, content) {
  const filePath = path.join(outDir, name);
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('Generated:', name);
}

const COMMON_DEFS = `
  <defs>
    <style>
      .hdr { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; }
      .sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13.5px; font-weight: 600; text-anchor: middle; }
      .lbl { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13.5px; font-weight: 600; }
      .code { font-family: 'Consolas', monospace; font-size: 13.5px; font-weight: bold; text-anchor: middle; }
      .code-l { font-family: 'Consolas', monospace; font-size: 13px; font-weight: bold; }
      .math { font-family: 'Consolas', monospace; font-size: 13.5px; font-weight: bold; text-anchor: middle; }
    </style>
    <marker id="arr-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#2563eb" />
    </marker>
    <marker id="arr-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#16a34a" />
    </marker>
    <marker id="arr-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#d97706" />
    </marker>
    <marker id="arr-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#dc2626" />
    </marker>
    <marker id="arr-slate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#475569" />
    </marker>
    <radialGradient id="grad-amb" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#2563eb" />
    </radialGradient>
    <radialGradient id="grad-diff" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#60a5fa" />
      <stop offset="65%" stop-color="#1d4ed8" />
      <stop offset="100%" stop-color="#0f172a" />
    </radialGradient>
    <radialGradient id="grad-spec" cx="35%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="30%" stop-color="#93c5fd" />
      <stop offset="70%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </radialGradient>
    <radialGradient id="grad-phong" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="18%" stop-color="#93c5fd" />
      <stop offset="55%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </radialGradient>
  </defs>
`;

// 1. Phong - Gesamt.svg (Halbseitig: 3 Komponenten I_a + I_d + I_s = I_f)
writeSvg('Phong - Gesamt.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1e40af">Phong-Beleuchtungsmodell: I_f = I_a + I_d + I_s</text>

  <!-- Box 1: Ambient I_a -->
  <rect x="-20" y="52" width="160" height="150" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.8" />
  <text x="60" y="75" class="code" fill="#1d4ed8">1. Ambient I_a</text>
  <circle cx="60" cy="125" r="38" fill="url(#grad-amb)" stroke="#1e40af" stroke-width="1.5" />
  <text x="60" y="186" class="sub" fill="#334155">Grundhelligkeit</text>

  <text x="152" y="132" class="hdr" fill="#475569">+</text>

  <!-- Box 2: Diffuse I_d -->
  <rect x="165" y="52" width="150" height="150" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.8" />
  <text x="240" y="75" class="code" fill="#15803d">2. Diffuse I_d</text>
  <circle cx="240" cy="125" r="38" fill="url(#grad-diff)" stroke="#166534" stroke-width="1.5" />
  <text x="240" y="186" class="sub" fill="#334155">Matte Streuung</text>

  <text x="327" y="132" class="hdr" fill="#475569">+</text>

  <!-- Box 3: Specular I_s -->
  <rect x="340" y="52" width="160" height="150" rx="8" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.8" />
  <text x="420" y="75" class="code" fill="#b45309">3. Specular I_s</text>
  <circle cx="420" cy="125" r="38" fill="url(#grad-spec)" stroke="#92400e" stroke-width="1.5" />
  <text x="420" y="186" class="sub" fill="#334155">Glanzpunkt</text>

  <!-- Ergebnis unten: I_f -->
  <rect x="-20" y="218" width="520" height="138" rx="10" fill="#ffffff" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="75" cy="287" r="46" fill="url(#grad-phong)" stroke="#1e3a8a" stroke-width="2" />
  <text x="310" y="252" class="hdr" fill="#1e40af">Gesamtintensität I_f am Oberflächenpunkt</text>
  <text x="310" y="284" class="math" fill="#0f172a">I_f = I_a + I_d + I_s</text>
  <text x="310" y="314" class="sub" fill="#15803d">Plastischer 3D-Eindruck durch Summe aller 3 Anteile</text>
  <text x="310" y="338" class="code" fill="#475569">gl.Enable(OpenGL.GL_LIGHTING)</text>
</svg>
`);

// 2. Phong - Vektoren.svg
writeSvg('Phong - Vektoren.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1e40af">Einheitsvektoren am Oberflächenpunkt p (||n|| = 1)</text>

  <!-- Gekrümmte Oberfläche & Tangentialebene -->
  <path d="M 30 285 Q 240 215 450 285" fill="#e2e8f0" stroke="#475569" stroke-width="3" />
  <line x1="60" y1="250" x2="420" y2="250" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6,4" />
  <text x="415" y="240" class="sub" fill="#64748b">Tangentialebene</text>

  <!-- Punkt p -->
  <circle cx="240" cy="250" r="6" fill="#0f172a" />
  <text x="240" y="274" class="code" fill="#0f172a">Punkt p</text>

  <!-- Normalenvektor n -->
  <line x1="240" y1="250" x2="240" y2="95" stroke="#16a34a" stroke-width="3.5" marker-end="url(#arr-green)" />
  <rect x="192" y="56" width="96" height="28" rx="5" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" />
  <text x="240" y="75" class="code" fill="#15803d">Normale n</text>

  <!-- Lichtvektor l -->
  <line x1="240" y1="250" x2="105" y2="115" stroke="#d97706" stroke-width="3.5" marker-end="url(#arr-amber)" />
  <circle cx="88" cy="98" r="12" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
  <rect x="-20" y="56" width="155" height="28" rx="5" fill="#fffbeb" stroke="#d97706" stroke-width="1.5" />
  <text x="57" y="75" class="code" fill="#b45309">Licht l (p_light)</text>

  <!-- Reflexionsvektor r -->
  <line x1="240" y1="250" x2="375" y2="115" stroke="#dc2626" stroke-width="3.5" marker-end="url(#arr-red)" />
  <rect x="335" y="56" width="160" height="28" rx="5" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5" />
  <text x="415" y="75" class="code" fill="#991b1b">Reflexion r</text>

  <!-- Betrachtungsvektor v -->
  <line x1="240" y1="250" x2="425" y2="165" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arr-blue)" />
  <rect x="355" y="118" width="145" height="28" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" />
  <text x="427" y="137" class="code" fill="#1d4ed8">Kamera v (p_cam)</text>

  <!-- Winkelbögen -->
  <path d="M 198 208 A 60 60 0 0 1 240 190" fill="none" stroke="#d97706" stroke-width="2" />
  <text x="212" y="182" class="code" fill="#b45309">delta</text>
  <path d="M 240 190 A 60 60 0 0 1 282 208" fill="none" stroke="#dc2626" stroke-width="2" />
  <text x="268" y="182" class="code" fill="#991b1b">delta</text>

  <!-- Formel-Box unten -->
  <rect x="-20" y="302" width="520" height="56" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.8" />
  <text x="240" y="325" class="code" fill="#0f172a">r = 2 * (n · l) * n - l   |   Ambient: I_a = k_a * I_La</text>
  <text x="240" y="347" class="sub" fill="#475569">Alle 4 Vektoren n, l, v, r sind auf Länge 1 normiert</text>
</svg>
`);

// 3. Phong - Diffuse.svg
writeSvg('Phong - Diffuse.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#15803d">Lambertsches Gesetz: I_d = k_d * I_Ld * cos(delta)</text>

  <!-- Links: Senkrechter Einfall (delta = 0°) -->
  <rect x="-20" y="54" width="250" height="225" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <text x="105" y="78" class="code" fill="#15803d">Fall A: delta = 0° (Maximal)</text>
  <line x1="15" y1="215" x2="195" y2="215" stroke="#166534" stroke-width="4" />
  <line x1="105" y1="215" x2="105" y2="105" stroke="#16a34a" stroke-width="3" marker-end="url(#arr-green)" />
  <text x="128" y="122" class="code" fill="#15803d">n</text>
  <line x1="85" y1="215" x2="85" y2="105" stroke="#d97706" stroke-width="3" marker-end="url(#arr-amber)" />
  <text x="65" y="122" class="code" fill="#b45309">l</text>
  <text x="105" y="244" class="code" fill="#0f172a">n · l = cos(0°) = 1.00</text>
  <text x="105" y="266" class="sub" fill="#15803d">100 % Energie pro Fläche</text>

  <!-- Rechts: Flacher Einfall (delta = 60°) -->
  <rect x="250" y="54" width="250" height="225" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="2" />
  <text x="375" y="78" class="code" fill="#b45309">Fall B: delta = 60° (Flach)</text>
  <line x1="285" y1="215" x2="465" y2="215" stroke="#92400e" stroke-width="4" />
  <line x1="375" y1="215" x2="375" y2="105" stroke="#16a34a" stroke-width="3" marker-end="url(#arr-green)" />
  <text x="392" y="122" class="code" fill="#15803d">n</text>
  <line x1="375" y1="215" x2="285" y2="160" stroke="#d97706" stroke-width="3" marker-end="url(#arr-amber)" />
  <text x="292" y="148" class="code" fill="#b45309">l</text>
  <path d="M 340 194 A 40 40 0 0 1 375 175" fill="none" stroke="#dc2626" stroke-width="2" />
  <text x="430" y="185" class="code" fill="#991b1b">delta=60°</text>
  <text x="375" y="244" class="code" fill="#0f172a">n · l = cos(60°) = 0.50</text>
  <text x="375" y="266" class="sub" fill="#b45309">Halbe Helligkeit (50 %)</text>

  <!-- Unten: Formel & Rückseiten-Abschneidung -->
  <rect x="-20" y="294" width="520" height="64" rx="8" fill="#ffffff" stroke="#64748b" stroke-width="1.8" />
  <text x="240" y="319" class="math" fill="#0f172a">I_d = k_d * I_Ld * max(0, n · l)</text>
  <text x="240" y="344" class="sub" fill="#dc2626">Für delta &gt; 90° ist n · l &lt; 0 (Rückseite im Eigenschatten &#8594; I_d = 0)</text>
</svg>
`);

// 4. Phong - Specular.svg
writeSvg('Phong - Specular.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#b45309">Spekularer Glanzpunkt: I_s = k_s * I_Ls * (r · v)^alpha_shiny</text>

  <!-- Links: Reflexionskeule um r -->
  <rect x="-20" y="54" width="250" height="225" rx="8" fill="#ffffff" stroke="#93c5fd" stroke-width="1.8" />
  <text x="105" y="78" class="code" fill="#1e40af">Reflexionskeule um r</text>
  <line x1="20" y1="230" x2="195" y2="230" stroke="#475569" stroke-width="3" />
  <line x1="105" y1="230" x2="105" y2="115" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arr-green)" />
  <text x="105" y="104" class="code" fill="#15803d">n</text>
  <line x1="105" y1="230" x2="35" y2="140" stroke="#d97706" stroke-width="2.5" marker-end="url(#arr-amber)" />
  <text x="28" y="132" class="code" fill="#b45309">l</text>
  <!-- Glanzkeule -->
  <path d="M 105 230 C 125 145, 165 110, 180 125 C 195 140, 160 180, 105 230 Z" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
  <line x1="105" y1="230" x2="175" y2="130" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-red)" />
  <text x="184" y="122" class="code" fill="#991b1b">r</text>
  <line x1="105" y1="230" x2="195" y2="175" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arr-blue)" />
  <text x="208" y="175" class="code" fill="#1d4ed8">v</text>
  <text x="105" y="262" class="sub" fill="#334155">Maximal wenn Kamera v = r</text>

  <!-- Rechts: Einfluss von alpha_shiny -->
  <rect x="250" y="54" width="250" height="225" rx="8" fill="#ffffff" stroke="#fcd34d" stroke-width="1.8" />
  <text x="375" y="78" class="code" fill="#b45309">Exponent alpha_shiny</text>
  <line x1="280" y1="225" x2="475" y2="225" stroke="#475569" stroke-width="2" />
  <line x1="375" y1="225" x2="375" y2="100" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3" />
  <!-- Breite Kurve (alpha_shiny = 8) -->
  <path d="M 285 225 Q 375 80 465 225" fill="none" stroke="#3b82f6" stroke-width="3" />
  <text x="315" y="145" class="code" fill="#1d4ed8">alpha_shiny=8</text>
  <!-- Schmale Kurve (alpha_shiny = 64) -->
  <path d="M 340 225 Q 375 75 410 225" fill="none" stroke="#dc2626" stroke-width="3" />
  <text x="425" y="120" class="code" fill="#991b1b">64 (Metall)</text>
  <text x="375" y="258" class="sub" fill="#334155">Großes alpha_shiny &#8594; enger Fokus</text>

  <!-- Unten: Zahlenbeispiel -->
  <rect x="-20" y="294" width="520" height="64" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.8" />
  <text x="240" y="319" class="code" fill="#92400e">Bei r · v = 0.90 gilt:  0.90^8 = 0.43  vs.  0.90^64 = 0.001</text>
  <text x="240" y="344" class="sub" fill="#334155">Parameter k_s, I_Ls und alpha_shiny steuern Glanzstärke und Schärfe</text>
</svg>
`);

// 5. Phong - Kombiniert.svg
writeSvg('Phong - Kombiniert.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1e40af">Superposition mehrerer Lichtquellen (GL_LIGHT0 .. GL_LIGHT7)</text>

  <rect x="-15" y="58" width="175" height="76" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="2" />
  <text x="72" y="82" class="code" fill="#b45309">Licht i = 1 (GL_LIGHT0)</text>
  <text x="72" y="104" class="code" fill="#0f172a">I_d,1 + I_s,1</text>
  <text x="72" y="124" class="sub" fill="#92400e">Hauptlicht links</text>

  <rect x="320" y="58" width="175" height="76" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
  <text x="407" y="82" class="code" fill="#1d4ed8">Licht i = 2 (GL_LIGHT1)</text>
  <text x="407" y="104" class="code" fill="#0f172a">I_d,2 + I_s,2</text>
  <text x="407" y="124" class="sub" fill="#1e40af">Fülllicht / Spot rechts</text>

  <line x1="125" y1="134" x2="205" y2="195" stroke="#d97706" stroke-width="3" marker-end="url(#arr-amber)" />
  <line x1="355" y1="134" x2="275" y2="195" stroke="#2563eb" stroke-width="3" marker-end="url(#arr-blue)" />

  <circle cx="240" cy="225" r="48" fill="url(#grad-phong)" stroke="#1e3a8a" stroke-width="2.5" />
  <circle cx="220" cy="205" r="9" fill="#fef3c7" opacity="0.9" />
  <circle cx="262" cy="212" r="6" fill="#dbeafe" opacity="0.9" />

  <rect x="-20" y="292" width="520" height="66" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="2" />
  <text x="240" y="318" class="math" fill="#0f172a">I_f = I_a + sum( I_d,i + I_s,i )   für i = 1 .. n</text>
  <text x="240" y="344" class="sub" fill="#15803d">Globales I_a wird einmalig addiert; I_d,i und I_s,i pro aktiver Lichtquelle</text>
</svg>
`);

// 6. ShadeModel_Flat.svg
writeSvg('ShadeModel_Flat.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#b45309">Flat Shading (GL_FLAT): 1 Flächennormale pro Polygon</text>

  <polygon points="15,245 125,185 125,225 15,285" fill="#1d4ed8" stroke="#0f172a" stroke-width="2" />
  <line x1="70" y1="215" x2="35" y2="145" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-red)" />
  <text x="28" y="135" class="code" fill="#991b1b">n_1</text>

  <polygon points="125,185 240,160 240,200 125,225" fill="#3b82f6" stroke="#0f172a" stroke-width="2" />
  <line x1="182" y1="172" x2="168" y2="95" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-red)" />
  <text x="165" y="85" class="code" fill="#991b1b">n_2</text>

  <polygon points="240,160 355,185 355,225 240,200" fill="#60a5fa" stroke="#0f172a" stroke-width="2" />
  <line x1="297" y1="172" x2="312" y2="95" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-red)" />
  <text x="315" y="85" class="code" fill="#991b1b">n_3</text>

  <polygon points="355,185 465,245 465,285 355,225" fill="#93c5fd" stroke="#0f172a" stroke-width="2" />
  <line x1="410" y1="215" x2="445" y2="145" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-red)" />
  <text x="452" y="135" class="code" fill="#991b1b">n_4</text>

  <rect x="-20" y="296" width="520" height="62" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.8" />
  <text x="240" y="320" class="code" fill="#92400e">gl.ShadeModel(OpenGL.GL_FLAT) &#8594; Konstante Farbe pro Facette</text>
  <text x="240" y="344" class="sub" fill="#334155">Sichtbare Farbsprünge an den Kanten (Ideal für scharfkantige Quader)</text>
</svg>
`);

// 7. ShadeModel_Smooth.svg
writeSvg('ShadeModel_Smooth.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <defs>
    <linearGradient id="gouraud-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1d4ed8" />
      <stop offset="33%" stop-color="#3b82f6" />
      <stop offset="66%" stop-color="#60a5fa" />
      <stop offset="100%" stop-color="#93c5fd" />
    </linearGradient>
  </defs>
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#15803d">Smooth Shading (GL_SMOOTH): Interpolation an Eckpunkten</text>

  <polygon points="15,245 125,185 240,160 355,185 465,245 465,285 355,225 240,200 125,225 15,285" fill="url(#gouraud-grad)" stroke="#1e40af" stroke-width="1.5" />

  <circle cx="15" cy="245" r="5" fill="#0f172a" />
  <line x1="15" y1="245" x2="-15" y2="175" stroke="#16a34a" stroke-width="3" marker-end="url(#arr-green)" />

  <circle cx="125" cy="185" r="5" fill="#0f172a" />
  <line x1="125" y1="185" x2="102" y2="105" stroke="#16a34a" stroke-width="3" marker-end="url(#arr-green)" />
  <text x="100" y="94" class="code" fill="#15803d">n_v1</text>

  <circle cx="240" cy="160" r="5" fill="#0f172a" />
  <line x1="240" y1="160" x2="240" y2="78" stroke="#16a34a" stroke-width="3" marker-end="url(#arr-green)" />
  <text x="240" y="68" class="code" fill="#15803d">n_v2</text>

  <circle cx="355" cy="185" r="5" fill="#0f172a" />
  <line x1="355" y1="185" x2="378" y2="105" stroke="#16a34a" stroke-width="3" marker-end="url(#arr-green)" />
  <text x="382" y="94" class="code" fill="#15803d">n_v3</text>

  <circle cx="465" cy="245" r="5" fill="#0f172a" />
  <line x1="465" y1="245" x2="495" y2="175" stroke="#16a34a" stroke-width="3" marker-end="url(#arr-green)" />

  <rect x="-20" y="296" width="520" height="62" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8" />
  <text x="240" y="320" class="code" fill="#15803d">gl.ShadeModel(OpenGL.GL_SMOOTH) &#8594; Bilineare Farbinterpolation</text>
  <text x="240" y="344" class="sub" fill="#334155">Weicher Verlauf für gekrümmte Flächen (Zylinder &amp; Kugeln)</text>
</svg>
`);

// 8. ZBuffer_Tiefentest.svg (Geprüft auf 0 Überlappungen!)
writeSvg('ZBuffer_Tiefentest.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1e40af">Tiefenpuffer (Z-Buffer): Verdeckungsprüfung pro Pixel</text>

  <!-- Links: Ohne Depth-Test -->
  <rect x="-20" y="54" width="248" height="220" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.8" />
  <text x="104" y="78" class="code" fill="#991b1b">Ohne GL_DEPTH_TEST</text>
  <text x="104" y="98" class="sub" fill="#7f1d1d">Zuletzt gezeichnet übermalt!</text>
  <!-- Zwei separate Boxen nebeneinander mit klarer Überlappung in der Mitte ohne Text-Kollision -->
  <rect x="0" y="118" width="110" height="80" rx="6" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2" />
  <text x="45" y="148" class="code" fill="#ffffff">Nah</text>
  <text x="45" y="170" class="code" fill="#dbeafe">z = 2 m</text>
  <rect x="85" y="142" width="120" height="80" rx="6" fill="#ef4444" stroke="#b91c1c" stroke-width="2.5" />
  <text x="145" y="175" class="code" fill="#ffffff">Fern (z = 5 m)</text>
  <text x="145" y="197" class="sub" fill="#fee2e2">übermalt Nah!</text>
  <text x="104" y="254" class="sub" fill="#dc2626">Falsch: Ferner Körper vorn!</text>

  <!-- Rechts: Mit Depth-Test -->
  <rect x="252" y="54" width="248" height="220" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8" />
  <text x="376" y="78" class="code" fill="#15803d">Mit GL_DEPTH_TEST</text>
  <text x="376" y="98" class="sub" fill="#166534">Prüft z_neu &lt; z_buf pro Pixel</text>
  <rect x="355" y="142" width="125" height="80" rx="6" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
  <text x="430" y="175" class="code" fill="#ffffff">Fern</text>
  <text x="430" y="197" class="code" fill="#fee2e2">z = 5 m</text>
  <rect x="272" y="118" width="115" height="80" rx="6" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2.5" />
  <text x="329" y="150" class="code" fill="#ffffff">Nah (z = 2 m)</text>
  <text x="329" y="172" class="sub" fill="#dbeafe">verdeckt Fern!</text>
  <text x="376" y="254" class="sub" fill="#15803d">Korrekt: 2 m verdeckt 5 m</text>

  <!-- Unten: Z-Buffer Regel -->
  <rect x="-20" y="290" width="520" height="68" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.8" />
  <text x="240" y="316" class="code" fill="#1e40af">gl.Enable(OpenGL.GL_DEPTH_TEST) + gl.Clear(GL_DEPTH_BUFFER_BIT)</text>
  <text x="240" y="342" class="sub" fill="#334155">Speichert pro Bildschirmpixel den kleinsten Abstand z zur Kamera</text>
</svg>
`);

// 9. Projektionsarten.svg (Vollbild 1080x450: 0 Kollisionen)
writeSvg('Projektionsarten.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 450" width="1080" height="450">
  ${COMMON_DEFS}
  <rect x="10" y="8" width="1060" height="434" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />

  <!-- LINKS: Orthogonale Projektion (glOrtho) -->
  <rect x="28" y="24" width="498" height="402" rx="10" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
  <rect x="28" y="24" width="498" height="46" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" />
  <text x="277" y="53" class="hdr" fill="#1d4ed8">A. Orthogonale Projektion: gl.Ortho(left, right, ...)</text>

  <text x="305" y="102" class="sub" fill="#1e40af">Quaderförmiges Sichtvolumen (Parallele Strahlen)</text>

  <!-- Quader-Sichtvolumen -->
  <polygon points="140,130 440,130 470,165 170,165" fill="#eff6ff" stroke="#60a5fa" stroke-width="1.5" />
  <polygon points="140,295 440,295 470,330 170,330" fill="#eff6ff" stroke="#60a5fa" stroke-width="1.5" />
  <line x1="140" y1="130" x2="140" y2="295" stroke="#16a34a" stroke-width="3" />
  <line x1="170" y1="165" x2="170" y2="330" stroke="#16a34a" stroke-width="3" />
  <line x1="440" y1="130" x2="440" y2="295" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="5,4" />
  <line x1="470" y1="165" x2="470" y2="330" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="5,4" />

  <!-- Parallele Projektionsstrahlen -->
  <line x1="55" y1="195" x2="420" y2="195" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arr-blue)" />
  <line x1="55" y1="255" x2="420" y2="255" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arr-blue)" />

  <!-- Objekt 1 (nah) und Objekt 2 (fern) -->
  <rect x="230" y="195" width="26" height="60" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2" />
  <rect x="365" y="195" width="26" height="60" fill="#60a5fa" stroke="#1e3a8a" stroke-width="2" />
  <rect x="150" y="195" width="12" height="60" fill="#f59e0b" stroke="#b45309" stroke-width="2" />

  <text x="140" y="118" class="code" fill="#15803d">near</text>
  <text x="455" y="118" class="code" fill="#dc2626">far</text>

  <!-- Fazit-Box Links -->
  <rect x="46" y="346" width="462" height="64" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8" />
  <text x="277" y="371" class="code" fill="#15803d">Maßhaltig: Gleiche Bildhöhe unabhängig vom Abstand z</text>
  <text x="277" y="396" class="sub" fill="#334155">Einsatz: 2D/3D-CAD, Konstruktionszeichnungen, Schnittansichten</text>

  <!-- RECHTS: Perspektivische Projektion (gluPerspective) -->
  <rect x="554" y="24" width="498" height="402" rx="10" fill="#ffffff" stroke="#7c3aed" stroke-width="2" />
  <rect x="554" y="24" width="498" height="46" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5" />
  <text x="803" y="53" class="hdr" fill="#6d28d9">B. Perspektivische Projektion: gl.Perspective(fovy, ...)</text>

  <text x="835" y="96" class="sub" fill="#6d28d9">Pyramidenstumpf (Frustum)</text>

  <!-- Kamera-Ursprung -->
  <circle cx="595" cy="225" r="7" fill="#6d28d9" />
  <text x="605" y="265" class="code" fill="#5b21b6">Kamera</text>

  <!-- Frustum-Kanten -->
  <polygon points="710,165 985,115 985,335 710,285" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="1.8" />
  <line x1="595" y1="225" x2="710" y2="165" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="595" y1="225" x2="710" y2="285" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="710" y1="165" x2="710" y2="285" stroke="#16a34a" stroke-width="3.5" />
  <line x1="985" y1="115" x2="985" y2="335" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="5,4" />

  <!-- Öffnungswinkel fovy (mit Abstand zu den Strahlen) -->
  <path d="M 640 202 A 50 50 0 0 1 640 248" fill="none" stroke="#d97706" stroke-width="2.5" />
  <text x="672" y="230" class="code" fill="#b45309">fovy</text>

  <!-- Objekt 1 (nah) und Objekt 2 (fern) -->
  <rect x="780" y="195" width="26" height="60" fill="#8b5cf6" stroke="#4c1d95" stroke-width="2" />
  <rect x="915" y="195" width="26" height="60" fill="#c4b5fd" stroke="#4c1d95" stroke-width="2" />

  <text x="710" y="150" class="code" fill="#15803d">zNear</text>
  <text x="980" y="103" class="code" fill="#dc2626">zFar</text>

  <!-- Fazit-Box Rechts -->
  <rect x="572" y="346" width="462" height="64" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.8" />
  <text x="803" y="371" class="code" fill="#b45309">Tiefenverkürzung (~ 1/z): Ferne Objekte wirken kleiner</text>
  <text x="803" y="396" class="sub" fill="#334155">Einsatz: 3D-Simulation, Digitale Zwillinge, Robotik, Kameras</text>
</svg>
`);

// 10. Szenengraph.svg
writeSvg('Szenengraph.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1e40af">Hierarchischer Szenengraph (Eltern-Kind-Baum)</text>

  <rect x="155" y="54" width="170" height="44" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2.2" />
  <text x="240" y="81" class="code" fill="#1d4ed8">Root (Weltursprung)</text>

  <line x1="200" y1="98" x2="115" y2="140" stroke="#475569" stroke-width="2.5" marker-end="url(#arr-slate)" />
  <line x1="280" y1="98" x2="365" y2="140" stroke="#475569" stroke-width="2.5" marker-end="url(#arr-slate)" />

  <rect x="20" y="144" width="190" height="46" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <text x="115" y="166" class="code" fill="#15803d">Base (Statisch)</text>
  <text x="115" y="184" class="sub" fill="#334155">Hallenboden (0, 0, 0)</text>

  <rect x="270" y="144" width="190" height="46" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="2" />
  <text x="365" y="166" class="code" fill="#b45309">Workpiece (Würfel)</text>
  <text x="365" y="184" class="sub" fill="#334155">Pos (1.10, 0.06, -0.40)</text>

  <line x1="115" y1="190" x2="115" y2="222" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arr-green)" />

  <rect x="20" y="226" width="190" height="46" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <text x="115" y="248" class="code" fill="#15803d">UpperArm (Arm 1)</text>
  <text x="115" y="266" class="sub" fill="#334155">Ty = HBase, Ry = theta1</text>

  <line x1="210" y1="249" x2="265" y2="249" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arr-green)" />

  <rect x="270" y="226" width="190" height="46" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <text x="365" y="248" class="code" fill="#15803d">ForeArm (Arm 2)</text>
  <text x="365" y="266" class="sub" fill="#334155">Tx = L1, Ry = theta2</text>

  <line x1="365" y1="272" x2="365" y2="304" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arr-green)" />

  <rect x="20" y="308" width="440" height="48" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="2" />
  <text x="240" y="330" class="code" fill="#991b1b">Pinole &amp; Greifer (TCP): Tx = L2, Ty = -d3</text>
  <text x="240" y="349" class="sub" fill="#334155">Erbt automatisch alle Drehungen und Verschiebungen der Elternknoten!</text>
</svg>
`);

// 11. MatrixStack_PushPop_Illu.svg (Genügend Randabstand in der rechten Box)
writeSvg('MatrixStack_PushPop_Illu.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1e40af">OpenGL Matrix-Stack: PushMatrix() &amp; PopMatrix()</text>

  <rect x="-20" y="56" width="235" height="52" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
  <text x="97" y="78" class="code" fill="#1d4ed8">1. M_0 = Welt / Kamera</text>
  <text x="97" y="98" class="sub" fill="#475569">gl.PushMatrix() sichert M_0</text>

  <line x1="97" y1="108" x2="97" y2="132" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arr-blue)" />

  <rect x="-20" y="136" width="235" height="52" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <text x="97" y="158" class="code" fill="#15803d">2. M_1 = M_0 * T_1 * R_1</text>
  <text x="97" y="178" class="sub" fill="#166534">Oberarm (Arm 1) + PushMatrix()</text>

  <line x1="97" y1="188" x2="97" y2="212" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arr-green)" />

  <rect x="-20" y="216" width="235" height="52" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="2" />
  <text x="97" y="238" class="code" fill="#b45309">3. M_2 = M_1 * T_2 * R_2</text>
  <text x="97" y="258" class="sub" fill="#92400e">Unterarm (Arm 2) + PopMatrix()</text>

  <!-- Rechts: Wichtige Skalierungs-Falle (Aufgabe 1.1) -->
  <rect x="232" y="56" width="268" height="212" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="2" />
  <text x="366" y="82" class="code" fill="#991b1b">Achtung bei gl.Scale()!</text>
  <text x="366" y="106" class="sub" fill="#334155">Setzt man Sx = L1 direkt im</text>
  <text x="366" y="126" class="sub" fill="#334155">Elternknoten, werden alle</text>
  <text x="366" y="146" class="sub" fill="#dc2626">Kindknoten mitverzerrt!</text>

  <rect x="246" y="162" width="240" height="92" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.8" />
  <text x="366" y="184" class="code" fill="#15803d">Lösung: Lokal kapseln!</text>
  <text x="366" y="206" class="code" fill="#0f172a">gl.PushMatrix();</text>
  <text x="366" y="225" class="code" fill="#0f172a">gl.Scale(L1, 0.14f, 0.18f);</text>
  <text x="366" y="244" class="code" fill="#0f172a">DrawCube(gl); gl.PopMatrix();</text>

  <!-- Unten: Zusammenfassung -->
  <rect x="-20" y="286" width="520" height="68" rx="8" fill="#ffffff" stroke="#475569" stroke-width="1.8" />
  <text x="240" y="312" class="code" fill="#0f172a">M_world = M_local * M_parent_world  (System.Numerics)</text>
  <text x="240" y="338" class="sub" fill="#334155">PopMatrix() stellt das Eltern-Koordinatensystem wieder her</text>
</svg>
`);

// 12. Szenengraph_Roboterarm.svg (Vollbild 1080x450: 0 Kollisionen)
writeSvg('Szenengraph_Roboterarm.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 450" width="1080" height="450">
  ${COMMON_DEFS}
  <rect x="10" y="8" width="1060" height="434" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />

  <!-- LINKS: Geometrie & Draufsicht (XZ-Ebene) -->
  <rect x="26" y="24" width="510" height="402" rx="10" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
  <text x="281" y="52" class="hdr" fill="#1e40af">SCARA-Roboter: Kinematische Kette (L1 = 1.0 m, L2 = 0.8 m)</text>

  <!-- Koordinatenachsen Draufsicht -->
  <line x1="80" y1="250" x2="480" y2="250" stroke="#94a3b8" stroke-width="2" marker-end="url(#arr-slate)" />
  <line x1="120" y1="295" x2="120" y2="90" stroke="#94a3b8" stroke-width="2" marker-end="url(#arr-slate)" />
  <text x="498" y="255" class="code" fill="#475569">+X</text>
  <text x="120" y="78" class="code" fill="#475569">-Z</text>

  <!-- Arm 1 (L1 = 1.0 m, Winkel theta1 = 30°) -->
  <line x1="120" y1="250" x2="293" y2="150" stroke="#2563eb" stroke-width="14" stroke-linecap="round" />
  <!-- Arm 2 (L2 = 0.8 m, Winkel theta1 + theta2 = -15°) -->
  <line x1="293" y1="150" x2="438" y2="188" stroke="#16a34a" stroke-width="11" stroke-linecap="round" />

  <!-- Gelenke -->
  <circle cx="120" cy="250" r="14" fill="#1e40af" stroke="#ffffff" stroke-width="2.5" />
  <circle cx="293" cy="150" r="12" fill="#15803d" stroke="#ffffff" stroke-width="2.5" />
  <circle cx="438" cy="188" r="11" fill="#f59e0b" stroke="#b45309" stroke-width="2.5" />

  <!-- Beschriftungen frei von Linien -->
  <text x="72" y="232" class="code" fill="#1e40af">Base</text>
  <path d="M 185 250 A 65 65 0 0 0 176 217" fill="none" stroke="#d97706" stroke-width="2.5" />
  <text x="242" y="236" class="code" fill="#b45309">theta1 = 30°</text>
  <text x="190" y="168" class="code" fill="#1d4ed8">L1 = 1.0 m</text>
  <text x="365" y="148" class="code" fill="#15803d">L2 = 0.8 m</text>
  <text x="438" y="222" class="code" fill="#b45309">TCP (x, y, z)</text>

  <!-- Unten links: Vertikalhub Y -->
  <rect x="44" y="325" width="474" height="84" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.8" />
  <text x="281" y="352" class="code" fill="#1e40af">Vertikale Höhe (Y-Achse):  y = HBase - d3</text>
  <text x="281" y="378" class="sub" fill="#334155">Mit HBase = 0.50 m und Hub d3 = 0.15 m &#8594; y = 0.350 m</text>

  <!-- RECHTS: Matrix-Stack vs. Analytische Vorwärtskinematik -->
  <rect x="556" y="24" width="498" height="402" rx="10" fill="#ffffff" stroke="#16a34a" stroke-width="2" />
  <text x="805" y="52" class="hdr" fill="#15803d">Zahlenbeispiel &amp; Deckungstest (Delta = 0.000 mm)</text>

  <!-- Weg 1: Analytische Trigonometrie -->
  <rect x="576" y="72" width="458" height="145" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.8" />
  <text x="805" y="98" class="code" fill="#15803d">Weg 1: Analytische Trigonometrie (CalculateAnalyticTcp)</text>
  <text x="805" y="126" class="math" fill="#0f172a">x = L1 * cos(theta1) + L2 * cos(theta1 + theta2)</text>
  <text x="805" y="152" class="math" fill="#0f172a">z = -( L1 * sin(theta1) + L2 * sin(theta1 + theta2) )</text>
  <text x="805" y="180" class="code" fill="#166534">Für theta1=30°, theta2=-45° &#8594; x = 1.639 m, z = -0.293 m</text>
  <text x="805" y="203" class="sub" fill="#475569">Gelbe Kontrollkugel im 3D-Viewport</text>

  <!-- Weg 2: Szenengraph Matrix-Kette -->
  <rect x="576" y="232" width="458" height="176" rx="8" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.8" />
  <text x="805" y="258" class="code" fill="#b45309">Weg 2: Szenengraph Matrix-Kette (GetWorldPosition)</text>
  <text x="805" y="286" class="code" fill="#0f172a">M_TCP = T_Base * R_y(theta1) * T(L1) * R_y(theta2) * T(L2)</text>
  <text x="805" y="314" class="code" fill="#92400e">_pinoleNode.GetWorldPosition() &#8594; (1.639, 0.350, -0.293) m</text>
  <rect x="592" y="332" width="426" height="60" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="2" />
  <text x="805" y="357" class="code" fill="#15803d">Deckungsfehler Delta = ||p_ana - p_mat|| = 0.000 mm</text>
  <text x="805" y="381" class="sub" fill="#334155">Beweist die Korrektheit des Szenengraphen in Echtzeit!</text>
</svg>
`);

// 13. OrbitCamera_Kugelkoordinaten.svg (0 Kollisionen)
writeSvg('OrbitCamera_Kugelkoordinaten.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1e40af">Orbit-Kamera auf Kugelschale (Radius r, Azimut theta, Elevation phi)</text>

  <!-- Koordinatenachsen im Zielpunkt LookAt -->
  <line x1="175" y1="215" x2="175" y2="68" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arr-green)" />
  <text x="175" y="56" class="code" fill="#15803d">+Y (Up)</text>

  <line x1="175" y1="215" x2="415" y2="215" stroke="#dc2626" stroke-width="2" marker-end="url(#arr-red)" />
  <text x="440" y="220" class="code" fill="#991b1b">+X</text>

  <line x1="175" y1="215" x2="65" y2="278" stroke="#2563eb" stroke-width="2" marker-end="url(#arr-blue)" />
  <text x="38" y="284" class="code" fill="#1d4ed8">+Z</text>

  <!-- Horizontale Äquator-Ellipse -->
  <ellipse cx="175" cy="215" rx="165" ry="48" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,4" />

  <!-- Zielpunkt p_look -->
  <circle cx="175" cy="215" r="7" fill="#dc2626" />
  <text x="120" y="202" class="code" fill="#991b1b">p_look</text>

  <!-- Projektion am Boden & Kamera-Position p_eye -->
  <line x1="175" y1="215" x2="305" y2="250" stroke="#64748b" stroke-width="2" stroke-dasharray="4,3" />
  <line x1="305" y1="250" x2="305" y2="115" stroke="#64748b" stroke-width="2" stroke-dasharray="4,3" />
  <line x1="175" y1="215" x2="305" y2="115" stroke="#d97706" stroke-width="3.5" />
  <text x="218" y="145" class="code" fill="#b45309">Distanz r</text>

  <!-- Kamera-Punkt p_eye -->
  <circle cx="305" cy="115" r="9" fill="#2563eb" stroke="#ffffff" stroke-width="2" />
  <text x="385" y="118" class="code" fill="#1d4ed8">p_eye (Kamera)</text>

  <!-- Winkelbögen theta (Azimut) und phi (Elevation) mit freigestelltem Text -->
  <path d="M 135 238 A 50 22 0 0 0 225 228" fill="none" stroke="#2563eb" stroke-width="2.5" />
  <text x="180" y="288" class="code" fill="#1d4ed8">Azimut theta</text>

  <path d="M 265 239 A 85 85 0 0 0 265 146" fill="none" stroke="#16a34a" stroke-width="2.5" />
  <text x="335" y="188" class="code" fill="#15803d">phi</text>

  <!-- Unten: Clamping & Panning Hinweis -->
  <rect x="-20" y="302" width="520" height="58" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.8" />
  <text x="240" y="325" class="code" fill="#0f172a">r_xz = r * cos(phi)  |  y_eye = y_look + r * sin(phi)</text>
  <text x="240" y="348" class="sub" fill="#15803d">Gimbal-Lock-Schutz: Elevation phi strikt auf [-85°, +85°] geklemmt</text>
</svg>
`);

// 14–16. Zylindernormale SVGs für den Anhang (saubere 570x380 SVGs ohne SHIELD_TEXT_OVERFLOW)
writeSvg('Zylindernormale - Eckpunkte XY.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1e40af">2D-Querschnitt in der XY-Ebene: Eckpunkte P_1 und P_2</text>

  <line x1="120" y1="310" x2="430" y2="310" stroke="#475569" stroke-width="2.5" marker-end="url(#arr-slate)" />
  <line x1="120" y1="310" x2="120" y2="65" stroke="#475569" stroke-width="2.5" marker-end="url(#arr-slate)" />
  <text x="450" y="315" class="code" fill="#475569">+X</text>
  <text x="120" y="52" class="code" fill="#475569">+Y</text>

  <!-- Kegelstumpf-Querschnitt -->
  <polygon points="120,310 340,310 250,120 120,120" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
  <line x1="340" y1="310" x2="250" y2="120" stroke="#dc2626" stroke-width="3.5" />

  <circle cx="340" cy="310" r="6" fill="#dc2626" />
  <text x="385" y="295" class="code" fill="#991b1b">P_1 = (r_1, 0)</text>

  <circle cx="250" cy="120" r="6" fill="#dc2626" />
  <text x="335" y="108" class="code" fill="#991b1b">P_2 = (r_2, h)</text>

  <text x="85" y="215" class="code" fill="#1e40af">h</text>
  <text x="230" y="335" class="code" fill="#1e40af">r_1</text>
  <text x="185" y="108" class="code" fill="#1e40af">r_2</text>
</svg>
`);

writeSvg('Zylindernormale - Verbindungsvektor 2D.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1e40af">Mantellinie: Richtungsvektor v = P_2 - P_1</text>

  <line x1="120" y1="310" x2="430" y2="310" stroke="#475569" stroke-width="2.5" marker-end="url(#arr-slate)" />
  <line x1="120" y1="310" x2="120" y2="65" stroke="#475569" stroke-width="2.5" marker-end="url(#arr-slate)" />

  <polygon points="120,310 340,310 250,120 120,120" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5" />
  <line x1="340" y1="310" x2="250" y2="120" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arr-blue)" />

  <circle cx="340" cy="310" r="6" fill="#1d4ed8" />
  <text x="385" y="295" class="code" fill="#1e40af">P_1 = (r_1, 0)</text>

  <circle cx="250" cy="120" r="6" fill="#1d4ed8" />
  <text x="335" y="108" class="code" fill="#1e40af">P_2 = (r_2, h)</text>

  <text x="365" y="215" class="code" fill="#1d4ed8">v = (r_2 - r_1, h)</text>
</svg>
`);

writeSvg('Zylindernormale - Normalenvektor XY.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#15803d">2D-Normalenvektor n_2D senkrecht zur Mantellinie (v · n_2D = 0)</text>

  <line x1="100" y1="310" x2="430" y2="310" stroke="#475569" stroke-width="2.5" marker-end="url(#arr-slate)" />
  <line x1="100" y1="310" x2="100" y2="65" stroke="#475569" stroke-width="2.5" marker-end="url(#arr-slate)" />

  <polygon points="100,310 310,310 230,120 100,120" fill="#f0fdf4" stroke="#86efac" stroke-width="1.8" />
  <line x1="310" y1="310" x2="230" y2="120" stroke="#2563eb" stroke-width="3" marker-end="url(#arr-blue)" />

  <!-- Normalenvektor n_2D in der Mitte der Mantellinie (270, 215) -->
  <line x1="270" y1="215" x2="395" y2="162" stroke="#16a34a" stroke-width="3.5" marker-end="url(#arr-green)" />
  <text x="410" y="145" class="code" fill="#15803d">n_2D = (h, r_1 - r_2)</text>

  <circle cx="310" cy="310" r="5" fill="#1e40af" />
  <text x="365" y="295" class="code" fill="#1e40af">P_1 = (r_1, 0)</text>
  <circle cx="230" cy="120" r="5" fill="#1e40af" />
  <text x="285" y="108" class="code" fill="#1e40af">P_2 = (r_2, h)</text>
</svg>
`);

writeSvg('Zylindernormale - Normalenvektor XZ.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1e40af">3D-Rotation des Normalenvektors um den Winkel theta (XZ-Ebene)</text>

  <line x1="60" y1="200" x2="420" y2="200" stroke="#475569" stroke-width="2" marker-end="url(#arr-slate)" />
  <line x1="220" y1="335" x2="220" y2="65" stroke="#475569" stroke-width="2" marker-end="url(#arr-slate)" />
  <text x="442" y="205" class="code" fill="#475569">+X</text>
  <text x="220" y="54" class="code" fill="#475569">+Z</text>

  <circle cx="220" cy="200" r="95" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />

  <!-- Winkel theta = 35° -->
  <line x1="220" y1="200" x2="298" y2="145" stroke="#64748b" stroke-width="2" stroke-dasharray="4,3" />
  <line x1="298" y1="145" x2="380" y2="88" stroke="#16a34a" stroke-width="3.5" marker-end="url(#arr-green)" />
  <text x="395" y="75" class="code" fill="#15803d">P_theta</text>

  <path d="M 265 200 A 45 45 0 0 0 257 174" fill="none" stroke="#d97706" stroke-width="2.5" />
  <text x="285" y="190" class="code" fill="#b45309">theta</text>

  <rect x="-10" y="308" width="500" height="46" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.8" />
  <text x="240" y="336" class="code" fill="#0f172a">P_x = h * cos(theta)  |  P_y = r_1 - r_2  |  P_z = h * sin(theta)</text>
</svg>
`);

writeSvg('Zylindernormale - Querschnitt XY.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 570 380" width="570" height="380">
  ${COMMON_DEFS}
  <rect x="-35" y="8" width="550" height="364" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
  <text x="240" y="36" class="hdr" fill="#1e40af">Rotationskörper in der XY-Ebene (Radien r_1, r_2 und Höhe h)</text>

  <line x1="80" y1="310" x2="430" y2="310" stroke="#475569" stroke-width="2.5" marker-end="url(#arr-slate)" />
  <line x1="240" y1="330" x2="240" y2="65" stroke="#475569" stroke-width="2.5" marker-end="url(#arr-slate)" />

  <polygon points="120,310 360,310 310,120 170,120" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5" />
  <text x="300" y="335" class="code" fill="#1d4ed8">r_1</text>
  <text x="275" y="108" class="code" fill="#1d4ed8">r_2</text>
  <text x="218" y="215" class="code" fill="#15803d">h</text>
</svg>
`);


console.log('All Chapter 05 SVGs regenerated successfully!');
