/**
 * Automated Variable Consistency & Coverage Linter
 * 
 * Enforces 4 pedagogical didactic rules:
 * Rule 1: Variables shown in SVG diagrams must be mentioned in the slide text.
 * Rule 2: Variables in half-slide code fragments must be explained in the text of the same slide.
 * Rule 3: Variables in full-slide code fragments must be introduced on preceding slides of that section.
 * Rule 4: Mathematical variables in slide text must be anchored in accompanying diagram or code.
 */

const fs = require('fs');
const path = require('path');

const STOP_WORDS = new Set([
  // C# keywords & framework types
  'int', 'double', 'float', 'string', 'bool', 'void', 'var', 'new', 'null', 'true', 'false',
  'public', 'private', 'protected', 'internal', 'static', 'readonly', 'class', 'struct',
  'get', 'set', 'return', 'if', 'else', 'for', 'foreach', 'while', 'in', 'using', 'namespace',
  'override', 'virtual', 'const', 'Math', 'Min', 'Max', 'Point', 'Rect', 'Size', 'List',
  'Canvas', 'Grid', 'StackPanel', 'DockPanel', 'UIElement', 'Shape', 'Line', 'Ellipse',
  'Polygon', 'Path', 'Brush', 'Pen', 'Brushes', 'Color', 'Colors', 'DrawingVisual',
  'DrawingContext', 'VisualHost', 'Children', 'Width', 'Height', 'Fill', 'Stroke',
  'StrokeThickness', 'StrokeDashArray', 'StrokeEndLineCap', 'PenLineCap', 'Round',
  'AffectsArrange', 'AffectsMeasure', 'DependencyObject', 'DependencyProperty',
  'SetLeft', 'GetLeft', 'SetTop', 'GetTop', 'SetRow', 'SetColumn', 'Arrange', 'Measure',
  'DesiredSize', 'RenderOpen', 'Close', 'Add', 'Update', 'Transform2D', 'InvalidateVisual',
  'ActualWidth', 'ActualHeight', 'RenderSize', 'Vector', 'Matrix', 'Normalize', 'SetValue',
  'GetValue', 'LeftProperty', 'TopProperty', 'Points', 'Figures', 'PathGeometry', 'Visual',
  'VisualCollection', 'FrameworkElement', 'MouseWheelEventArgs', 'MouseEventArgs', 'MouseButtonEventArgs',
  'sender', 'e', 'index', 'renderAction', 'VisualChildrenCount', 'GetVisualChild', 'OnRender',
  'AddVisualChild', 'AddLogicalChild', 'CaptureMouse', 'ReleaseMouseCapture', 'GetPosition',
  'Delta', 'Invert', 'Transform', 'Multiply', 'DrawLine', 'DrawEllipse', 'DrawRectangle',
  'Action', 'SimulationData', 'Data', 'Bars', 'bar', 'Key', 'Keyboard', 'IsKeyDown',
  'MiddleButton', 'MouseButtonState', 'Pressed', 'Cursors', 'SizeAll', 'Arrow', 'this',
  'SimulationCanvas', 'CanvasMatrixTransform', 'Count', '_children', '_drawingVisual',
  'invMatrix',

  // Common German & English words / diagram labels
  'Phase', 'Parent', 'Child', 'WPF', 'Layout', 'Cycle', 'System', 'Screen', 'Welt',
  'Physik', 'Monitor', 'Pixel', 'Meter', 'Start', 'Ende', 'Spitze', 'Basis', 'Fluegel',
  'Knoten', 'Stab', 'Kraft', 'Last', 'Ursprung', 'Oben', 'Unten', 'Links', 'Rechts',
  'Wunsch', 'Zuweisung', 'Hier', 'Platz', 'Dein', 'Wird', 'Zur', 'Vor', 'Nach', 'Zoom',
  'Fall', 'Fix', 'Fixpunkt', 'Bleibt', 'Ortsfest', 'Tabelle', 'Raster', 'Linear',
  'Stapel', 'Andocken', 'Kanten', 'Absolut', 'Nutzflaeche', 'DrawArea', 'Viewport',
  'Freiraum', 'Isotrop', 'Anisotrop', 'Winkel', 'Masse', 'Verfaelscht', 'Formtreu',
  'Winkeltreu', 'Automatisch', 'Zentriert', 'Spiegelung', 'Konstruktion', 'Schritte',
  'Kette', 'Bemaszung', 'Hilfslinien', 'Ueberstand', 'Pfeil', 'Pfeile',
  'Traeger', 'Fachwerk', 'Elemente', 'Schichten', 'Translation',
  'Skalierung', 'Ruecktranslation', 'Verschiebt', 'Vergroeszert', 'Schiebt', 'Zurueck',
  'Zentrum', 'Modell', 'Regel', 'Goldene', 'Pipeline', 'Berechnung', 'Analytisch',
  'Geometrie', 'Biegelinien', 'CAD', 'Bezier', 'Profile', 'Lager', 'Gelenke', 'Bauteile',
  'Beweis', 'Formel', 'Hinweis', 'Container', 'Steuert', 'Position', 'Werte', 'Speicher',
  'Store', 'Interner', 'Zentraler', 'Eigenschaften', 'Anhaengen', 'Objekt', 'Dilemma',
  'Kein', 'Nutzlos', 'Platziert', 'Fordert', 'Andere', 'Daten', 'Deshalb', 'Statt',
  'Fixer', 'Felder', 'Kopplung', 'Auswertung', 'Eckpunkte', 'Beschriftung', 'Knotenpunkt',
  'Pfeilspitze', 'Fluegel1', 'Fluegel2', 'Kraftlinie', 'Richtungsvektor', 'Orthogonalvektor',
  'Einheitsvektor', 'Bemaszungskette', 'Masslinie', 'Masshilfslinie', 'Masszahl',
  'Massstab', 'Radialstrahl', 'Dehnungsstrahl', 'Schrumpfung', 'Verzerrung',
  'Immutable', 'Allokationen', 'Freeze', 'Render', 'FastDrawingCanvas', 'SimpleRenderCanvas',
  'TextBlock', 'Foreground', 'FontSize', 'Redraw', 'DrawTruss', 'GetBounds',
  'TrussCanvas', 'Pos', 'P1', 'P2', 'Nutzfl', 'che', 'Shapes', 'Baum', 'Border', 'Clip',
  'Persistenter', 'Jedes', 'lebt', 'Vektor', 'Primitive', 'Modelle', 'zier', 'el',
  'grundlegende', 'Property', 'des', 'Objekts', 'Achsen', 'Konvention', 'Voraus',
  'Befehls', 'Stream', 'Strich', 'Golden', 'Rule', 'Immer', 'Ohne', 'NICHT', 'sicher',
  'Hohe', 'bei', 'FPS', 'mehr', 'neue', 'bar', 'px', 'm', 'mm', 'sin', 'cos', 'tan',
  'Canvas_Left', 'Canvas_Top', 'WPF_Screen', 'Mausklick', 'Punkt'
]);

function normalizeUnicode(str) {
  return str
    .replace(/₁/g, '_1').replace(/₂/g, '_2').replace(/₃/g, '_3').replace(/₄/g, '_4')
    .replace(/ᵢ/g, '_i').replace(/ₙ/g, '_n').replace(/ₘ/g, '_m')
    .replace(/Δ/g, 'delta_')
    .replace(/ä/g, 'ae').replace(/Ä/g, 'Ae')
    .replace(/ö/g, 'oe').replace(/Ö/g, 'Oe')
    .replace(/ü/g, 'ue').replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'sz');
}

const CANONICAL_ALIASES = {
  'x_off': ['x_off', 'xoff', 'offsetx', 'xoffset', 'offset_x'],
  'y_off': ['y_off', 'yoff', 'offsety', 'yoffset', 'offset_y'],
  'w_world': ['w_world', 'wworld', 'worldw', 'worldwidth', 'w_w', 'ww'],
  'h_world': ['h_world', 'hworld', 'worldh', 'worldheight', 'h_w', 'hw'],
  'w_draw': ['w_draw', 'wdraw', 'draww', 'drawwidth'],
  'h_draw': ['h_draw', 'hdraw', 'drawh', 'drawheight'],
  'w_canvas': ['w_canvas', 'canvaswidth', 'wcanvas', 'width'],
  'h_canvas': ['h_canvas', 'canvasheight', 'hcanvas', 'height'],
  'x_min': ['x_min', 'xmin', 'minx'],
  'x_max': ['x_max', 'xmax', 'maxx'],
  'y_min': ['y_min', 'ymin', 'miny'],
  'y_max': ['y_max', 'ymax', 'maxy'],
  'x_s': ['x_s', 'xs', 'scrx', 'screenx', 'xscreen', 'x_scr', 'px', 'p.x', 'p_x'],
  'y_s': ['y_s', 'ys', 'scry', 'screeny', 'yscreen', 'y_scr', 'py', 'p.y', 'p_y'],
  'x_w': ['x_w', 'xw', 'worldx', 'wx', 'xworld'],
  'y_w': ['y_w', 'yw', 'worldy', 'wy', 'yworld'],
  'p_cursor': ['p_cursor', 'pcursor', 'cursor', 'zoomcenter', 'mousepos'],
  'p_node': ['p_node', 'pnode', 'node'],
  'p_tip': ['p_tip', 'ptip', 'tip'],
  'p_base': ['p_base', 'pbase', 'base'],
  'p_wing': ['p_wing', 'pwing', 'wing', 'p_wing1', 'p_wing2', 'pwing1', 'pwing2', 'p_wing12', 'pwing12'],
  'p_wing1': ['p_wing1', 'pwing1', 'wing1', 'p_wing', 'p_wing12', 'pwing12'],
  'p_wing2': ['p_wing2', 'pwing2', 'wing2', 'p_wing', 'p_wing12', 'pwing12'],
  'e_u': ['e_u', 'eu', 'u', 'dir', 'e_x', 'e_y', 'ex', 'ey'],
  'e_perp': ['e_perp', 'eperp', 'perp'],
  'scale': ['scale', 's', 'zoomfactor'],
  's_x': ['s_x', 'sx', 'scale_x', 'scalex', 'scale'],
  's_y': ['s_y', 'sy', 'scale_y', 'scaley', 'scale'],
  'margin': ['margin', 'rand'],
  'gap': ['gap', 'deltay_gap', 'y_gap', 'delta_y_gap', 'deltaygap', 'ygap'],
  'overhang': ['overhang', 'ueberstand', 'deltay_over', 'y_over', 'delta_y_over', 'deltayover', 'yover'],
  'p_1': ['p_1', 'p1', 'x_1', 'y_1', 'x1', 'y1'],
  'p_2': ['p_2', 'p2', 'x_2', 'y_2', 'x2', 'y2'],
  'p_i': ['p_i', 'pi', 'x_i', 'y_i', 'xi', 'yi'],
  'y_dim': ['y_dim', 'ydim', 'yscreen', 'y_screen'],
  'x_mid': ['x_mid', 'xmid', 'midx'],
  'delta_w': ['delta_w', 'deltaw', 'w_draw', 'wdraw'],
  'delta_h': ['delta_h', 'deltah', 'h_draw', 'hdraw'],
  'k_3': ['k_3', 'k3', 'node_3', 'node3', 'draggednode', '_draggednode'],
  'length': ['length', 'l'],
  'width': ['width', 'w'],
  'lastpos': ['lastpos', '_lastpos', 'p_last', 'lastmousepos', '_lastmousepos'],
  'ispanning': ['ispanning', '_ispanning', 'panning'],
  'currentpos': ['currentpos', 'p_current', 'curpos', 'pos'],
  'delta': ['delta', 'd'],
  'screenpixel': ['screenpixel', 'p_screen', 'screen', 'pixel'],
  'canvasmatrix': ['canvasmatrix', 'm', 'matrix'],
  'trans': ['trans', 'transform2d', 'transform', 'viewport'],
  'unzoomed': ['unzoomed', 'p_unzoom', 'p_canvas', 'canvaspoint', 'x_u', 'y_u', 'xu', 'yu'],
  'worldx': ['worldx', 'x_w', 'xw'],
  'worldy': ['worldy', 'y_w', 'yw'],
  'p_screen': ['p_screen', 'pscreen', 'screenpixel', 'x_p', 'y_p', 'xp', 'yp'],
  'p_canvas': ['p_canvas', 'pcanvas', 'unzoomed', 'x_u', 'y_u', 'xu', 'yu'],
  'p_unzoom': ['p_unzoom', 'punzoom', 'unzoomed', 'p_canvas', 'x_u', 'y_u', 'xu', 'yu'],
  'p_world': ['p_world', 'pworld', 'worldpoint', 'x_w', 'y_w', 'xw', 'yw'],
  'x_p': ['x_p', 'xp', 'x_screen', 'scrx', 'p_screen'],
  'y_p': ['y_p', 'yp', 'y_screen', 'scry', 'p_screen'],
  'x_u': ['x_u', 'xu', 'x_canvas', 'unzoomx', 'p_canvas', 'p_unzoom'],
  'y_u': ['y_u', 'yu', 'y_canvas', 'unzoomy', 'p_canvas', 'p_unzoom'],
  'f_x': ['f_x', 'fx', 'f_norm', 'f', 'e_u'],
  'f_y': ['f_y', 'fy', 'f_norm', 'f', 'e_u'],
  's_f': ['s_f', 'sf', 'scale_f', 'scalef', 'scale'],
  'f': ['f', 'kraft', 'kraftvektor', 'kraftvektoren', 'kraefte', 'last', 'lasten']
};

function extractSlideTokens(text) {
  const tokens = new Set();
  const normText = normalizeUnicode(text);

  // 1. LaTeX Math formulas: $...$ and $$...$$
  const mathRegex = /\$\$?([\s\S]+?)\$\$?/g;
  let m;
  while ((m = mathRegex.exec(normText)) !== null) {
    const rawMath = m[1]
      .replace(/\\vec\{?([A-Za-z0-9_]+)\}?/g, '$1')
      .replace(/\\mathbf\{?([A-Za-z0-9_]+)\}?/g, '$1')
      .replace(/\\text\{(\w+)\}/g, '$1')
      .replace(/\\mathrm\{(\w+)\}/g, '$1')
      .replace(/\\min/g, 'min')
      .replace(/\\max/g, 'max')
      .replace(/\\Delta/g, 'delta')
      .replace(/_\{(\w+)\}/g, '_$1');

    if (/wing1\s*,\s*2/i.test(rawMath)) {
      tokens.add('p_wing1');
      tokens.add('p_wing2');
      tokens.add('p_wing');
    }

    const ids = rawMath.match(/[A-Za-z][A-Za-z0-9_]*/g) || [];
    ids.forEach(id => {
      tokens.add(id);
      tokens.add(id.toLowerCase());
      if (id.includes('_')) {
        const parts = id.split('_');
        tokens.add(parts.join(''));
        tokens.add(parts[0] + parts[1].charAt(0).toUpperCase() + parts[1].slice(1));
        tokens.add(parts[1] + parts[0].toUpperCase());
      }
    });
  }

  // 2. Backtick code: `varName`
  const codeRegex = /`([^`]+)`/g;
  while ((m = codeRegex.exec(normText)) !== null) {
    const words = m[1].match(/[A-Za-z][A-Za-z0-9_]*/g) || [];
    words.forEach(w => {
      tokens.add(w);
      tokens.add(w.toLowerCase());
    });
  }

  // 3. Regular words from text (preserve underscores for identifiers like P_1, y_dim)
  const clean = normText.replace(/<[^>]+>/g, ' ').replace(/[#*`]/g, ' ');
  const words = clean.match(/[A-Za-z][A-Za-z0-9_]*/g) || [];
  words.forEach(w => {
    tokens.add(w);
    tokens.add(w.toLowerCase());
    if (w.includes('_')) {
      const parts = w.split('_');
      tokens.add(parts.join(''));
      tokens.add(parts[0] + parts[1].charAt(0).toUpperCase() + parts[1].slice(1));
    }
  });

  // 4. Property access in code or text: e.g. p.X, child.Arrange, bounds.Width
  const dotMatches = normText.match(/\b([A-Za-z][A-Za-z0-9_]*)\.([A-Za-z][A-Za-z0-9_]*)\b/g) || [];
  dotMatches.forEach(dot => {
    const [obj, prop] = dot.split('.');
    tokens.add(dot.toLowerCase());
    tokens.add(`${obj.toLowerCase()}_${prop.toLowerCase()}`);
    tokens.add(`${obj.toLowerCase()}${prop.toLowerCase()}`);
  });

  return tokens;
}

function matchesAnyAlias(varName, slideTokens) {
  const norm = normalizeUnicode(varName).toLowerCase().replace(/[^a-z0-9_+]/g, '');
  if (slideTokens.has(varName) || slideTokens.has(norm)) return true;

  for (const [canon, aliases] of Object.entries(CANONICAL_ALIASES)) {
    if (aliases.includes(norm) || canon === norm) {
      if (aliases.some(a => slideTokens.has(a) || slideTokens.has(a.toLowerCase()))) {
        return true;
      }
    }
  }
  return false;
}

function extractSvgVariables(svgPath) {
  if (!fs.existsSync(svgPath)) return [];
  const svgRaw = fs.readFileSync(svgPath, 'utf8');
  const svgContent = normalizeUnicode(svgRaw);

  const textMatches = Array.from(svgContent.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/gi));
  const variables = new Set();

  textMatches.forEach(m => {
    const fullText = m[1].replace(/<[^>]+>/g, ' ').trim();

    // 1. Math subscripts: [A-Za-z]+_[A-Za-z0-9]+
    const subMatches = fullText.match(/\b([A-Za-z]+_[A-Za-z0-9_]+)\b/g);
    if (subMatches) {
      subMatches.forEach(v => {
        if (!STOP_WORDS.has(v) && !STOP_WORDS.has(normalizeUnicode(v))) {
          variables.add(v);
        }
      });
    }

    // 2. Math equations / assignments: LHS = RHS
    const eqMatches = Array.from(fullText.matchAll(/\b([A-Za-z][A-Za-z0-9_]*)\s*=[^=]/g));
    eqMatches.forEach(eq => {
      const v = eq[1];
      if (!STOP_WORDS.has(v) && !STOP_WORDS.has(normalizeUnicode(v))) {
        variables.add(v);
      }
    });

    // 3. Coordinate tuples: (x_s, y_s)
    const coordMatches = fullText.match(/\(\s*([A-Za-z][A-Za-z0-9_]*)\s*,\s*([A-Za-z][A-Za-z0-9_]*)\s*\)/g);
    if (coordMatches) {
      coordMatches.forEach(c => {
        const parts = c.replace(/[()]/g, '').split(',');
        parts.forEach(p => {
          const v = p.trim();
          if (!STOP_WORDS.has(v) && !STOP_WORDS.has(normalizeUnicode(v))) {
            variables.add(v);
          }
        });
      });
    }

    // 4. Dimension markers
    if (fullText.startsWith('Gap') || fullText.startsWith('Overhang')) {
      const dimName = fullText.split(/\s+/)[0];
      variables.add(dimName);
    }
  });

  return Array.from(variables);
}

function extractCodeVariables(codeBlock) {
  const vars = new Set();
  const cleanCode = codeBlock.replace(/\/\/.*/g, '');

  // Method parameters: split by comma, strip default value (=...)
  const methodRegex = /(?:public|private|protected|static|void|Point\[?\]?|double)\s+[A-Za-z0-9_]+\s*\(([^)]*)\)/g;
  let mm;
  while ((mm = methodRegex.exec(cleanCode)) !== null) {
    const paramStr = mm[1];
    if (paramStr) {
      paramStr.split(',').forEach(param => {
        const cleanParam = param.split('=')[0].trim();
        const parts = cleanParam.split(/\s+/);
        if (parts.length >= 2) {
          const pName = parts[parts.length - 1].trim();
          if (pName && !STOP_WORDS.has(pName)) vars.add(pName);
        }
      });
    }
  }

  // Properties
  const propRegex = /(?:public|private)\s+(?:double|float|int|Point|Rect|Vector)\s+([A-Za-z][A-Za-z0-9_]*)\s*\{/g;
  while ((mm = propRegex.exec(cleanCode)) !== null) {
    const pName = mm[1];
    if (!STOP_WORDS.has(pName)) vars.add(pName);
  }

  // Local declarations
  const localDeclRegex = /(?:double|Point|Vector|var)\s+([A-Za-z][A-Za-z0-9_]*)\s*=/g;
  while ((mm = localDeclRegex.exec(cleanCode)) !== null) {
    const vName = mm[1];
    if (vName && !STOP_WORDS.has(vName) && vName.length > 1) vars.add(vName);
  }

  // Tuple deconstruction
  const tupleRegex = /var\s*\(([^)]+)\)\s*=/g;
  while ((mm = tupleRegex.exec(cleanCode)) !== null) {
    mm[1].split(',').forEach(item => {
      const v = item.trim();
      if (v && !STOP_WORDS.has(v)) vars.add(v);
    });
  }

  // Private fields
  const fieldRegex = /(?:private|protected)\s+(?:Point|bool|double)\s+(_[A-Za-z0-9_]+);/g;
  while ((mm = fieldRegex.exec(cleanCode)) !== null) {
    vars.add(mm[1]);
  }

  return Array.from(vars);
}

function extractSlideGeometricVariables(slideText) {
  const vars = new Set();
  const mathRegex = /\$([^\$]+)\$/g;
  let m;
  while ((m = mathRegex.exec(slideText)) !== null) {
    let rawMath = m[1]
      .replace(/\\Delta/g, 'delta_')
      .replace(/_\{([A-Za-z0-9_]+)\}/g, '_$1')
      .replace(/\\text\{([A-Za-z0-9_]+)\}/g, '$1');

    // Subscripted variables: e.g. y_dim, x_mid, x_off, y_off, P_1, P_2, W_world, s_x, s_y
    const subMatches = rawMath.match(/\b([A-Za-z]+_[A-Za-z0-9]+)\b/g);
    if (subMatches) {
      subMatches.forEach(v => {
        const norm = normalizeUnicode(v).toLowerCase();
        if (norm.startsWith('min_') || norm.startsWith('max_')) return;
        if (!STOP_WORDS.has(v) && !STOP_WORDS.has(norm) && !/^(px|m|kn|s|hz|fps|mm|rad|deg|min|max|sin|cos|tan)$/i.test(norm)) {
          vars.add(v);
        }
      });
    }

    // Delta variables: delta_W, delta_H, deltay_gap, deltay_over
    const deltaMatches = rawMath.match(/delta_[A-Za-z0-9_]+/g);
    if (deltaMatches) {
      deltaMatches.forEach(d => {
        if (!STOP_WORDS.has(d)) vars.add(d);
      });
    }
  }
  return Array.from(vars);
}

function auditChapterVariables(chapterDir) {
  const folienPath = path.join(chapterDir, 'Folien.md');
  if (!fs.existsSync(folienPath)) {
    return { error: 'Folien.md not found in ' + chapterDir, issues: [] };
  }

  const content = fs.readFileSync(folienPath, 'utf8');
  const slides = content.split(/^---$/m);
  const issues = [];

  // Pre-collect all tokens by section for standalone diagram / section overview slides
  const sectionTokensMap = new Map();
  let secName = '';
  slides.forEach(s => {
    const sm = s.match(/##\s+(\d+\.\d+:[^\n]+)/);
    if (sm) secName = sm[1];
    if (secName) {
      if (!sectionTokensMap.has(secName)) sectionTokensMap.set(secName, new Set());
      const toks = extractSlideTokens(s);
      toks.forEach(t => sectionTokensMap.get(secName).add(t));
    }
  });

  let currentSection = '';
  const sectionSlideHistory = [];

  slides.forEach((rawSlide, idx) => {
    const slideNum = idx + 1;
    const slide = rawSlide.trim();

    const sectionMatch = slide.match(/##\s+(\d+\.\d+:[^\n]+)/);
    if (sectionMatch) {
      currentSection = sectionMatch[1];
      sectionSlideHistory.length = 0;
    }

    const titleMatch = slide.match(/###?\s+([^\n]+)/);
    const title = titleMatch ? titleMatch[1] : (currentSection || `Slide ${slideNum}`);
    const slideTokens = extractSlideTokens(slide);

    sectionSlideHistory.push({ slideNum, tokens: slideTokens });

    // Rule 1: SVG Variables
    const svgMatches = Array.from(slide.matchAll(/!\[.*?\]\((.*?\.svg)\)/gi));
    const isStandaloneDiagram = slide.replace(/!\[.*?\]\(.*?\)/g, '').trim().length < 80;

    svgMatches.forEach(match => {
      const relSvgPath = match[1];
      const absSvgPath = path.resolve(chapterDir, relSvgPath);
      const svgVars = extractSvgVariables(absSvgPath);

      const checkTokens = isStandaloneDiagram && currentSection && sectionTokensMap.has(currentSection)
        ? sectionTokensMap.get(currentSection)
        : slideTokens;

      svgVars.forEach(v => {
        if (!matchesAnyAlias(v, checkTokens)) {
          issues.push({
            rule: 1,
            slideNum,
            title,
            type: 'SVG_VAR_MISSING',
            message: `Variable "${v}" aus Diagramm "${path.basename(relSvgPath)}" wird im Folientext nicht erwähnt.`
          });
        }
      });
    });

    // Rule 2 & 3: Code Variables
    const codeMatches = Array.from(slide.matchAll(/```(?:csharp|c#)([\s\S]*?)```/gi));
    const isColumns = /<div class=["']columns/i.test(slide);

    codeMatches.forEach(cm => {
      const code = cm[1];
      const codeVars = extractCodeVariables(code);

      if (isColumns) {
        // Rule 2: Half-slide code
        const textWithoutCode = slide.replace(/```(?:csharp|c#)[\s\S]*?```/gi, '');
        const textColTokens = extractSlideTokens(textWithoutCode);

        codeVars.forEach(v => {
          if (!matchesAnyAlias(v, textColTokens)) {
            issues.push({
              rule: 2,
              slideNum,
              title,
              type: 'HALF_SLIDE_CODE_VAR_MISSING',
              message: `Code-Variable "${v}" wird in der Texterklärung derselben Folie nicht erwähnt.`
            });
          }
        });
      } else {
        // Rule 3: Full-slide code
        const allowedTokens = new Set(slideTokens);
        for (let i = 0; i < sectionSlideHistory.length - 1; i++) {
          sectionSlideHistory[i].tokens.forEach(t => allowedTokens.add(t));
        }

        codeVars.forEach(v => {
          if (!matchesAnyAlias(v, allowedTokens)) {
            issues.push({
              rule: 3,
              slideNum,
              title,
              type: 'FULL_SLIDE_CODE_VAR_NOT_INTRODUCED',
              message: `Variable "${v}" in ganzseitigem Code wurde auf den vorherigen Folien dieses Abschnitts nicht eingeführt.`
            });
          }
        });
      }
    });

    // Rule 4 (Bidirectional Consistency): Mathematical text variables must be anchored in SVG or Code
    if (svgMatches.length > 0 || codeMatches.length > 0) {
      const targetTokens = new Set();

      svgMatches.forEach(sm => {
        const absPath = path.resolve(chapterDir, sm[1]);
        if (fs.existsSync(absPath)) {
          const raw = fs.readFileSync(absPath, 'utf8');
          const toks = extractSlideTokens(raw);
          toks.forEach(t => targetTokens.add(t));
        }
      });

      codeMatches.forEach(cm => {
        const code = cm[1];
        const toks = extractSlideTokens(code);
        toks.forEach(t => targetTokens.add(t));
        const cvs = extractCodeVariables(code);
        cvs.forEach(v => targetTokens.add(v.toLowerCase()));
      });

      const textWithoutCode = slide.replace(/```(?:csharp|c#)[\s\S]*?```/gi, '');
      const geomVars = extractSlideGeometricVariables(textWithoutCode);

      geomVars.forEach(v => {
        if (!matchesAnyAlias(v, targetTokens)) {
          issues.push({
            rule: 4,
            slideNum,
            title,
            type: 'TEXT_VAR_NOT_ANCHORED',
            severity: 'FEHLER',
            message: `Variable "${v}" im Folientext wird weder im begleitenden Diagramm noch im Code visualisiert/genutzt.`
          });
        }
      });
    }
  });

  return { chapterDir, totalSlides: slides.length, issues };
}

// CLI Execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const targetChapter = args.find(a => !a.startsWith('--'));

  console.log('================================================================');
  console.log('  AUTOMATED VARIABLE CONSISTENCY & COVERAGE LINTER');
  console.log('================================================================\n');

  const folienRoot = path.resolve('Folien');
  const dirs = fs.readdirSync(folienRoot).filter(d => {
    const full = path.join(folienRoot, d);
    if (!fs.statSync(full).isDirectory()) return false;
    if (targetChapter) return d.startsWith(targetChapter);
    return true;
  });

  if (dirs.length === 0) {
    console.error(`Kein Kapitelverzeichnis für "${targetChapter}" gefunden.`);
    process.exit(1);
  }

  let totalErrors = 0;

  dirs.forEach(d => {
    const chapterPath = path.join(folienRoot, d);
    const result = auditChapterVariables(chapterPath);
    console.log(`Prüfe Kapitel ${d} (${result.totalSlides} Folien) ...`);

    totalErrors += result.issues.length;

    if (result.issues.length === 0) {
      console.log('  ✓ OK: Alle Variablen sind didaktisch vollständig abgedeckt!\n');
    } else {
      console.log(`  ✗ ${result.issues.length} Fehler (Didaktische Variablen-Inkonsistenz):`);
      result.issues.forEach(iss => {
        console.log(`    - Folie ${iss.slideNum} [${iss.title}] (Regel ${iss.rule}): ${iss.message}`);
      });
      console.log('');
    }
  });

  console.log('================================================================');
  if (totalErrors === 0) {
    console.log('  ZUSAMMENFASSUNG: ALLES DIDAKTISCH KONSISTENT ✓');
  } else {
    console.log(`  ZUSAMMENFASSUNG: ${totalErrors} Fehler gefunden ✗`);
  }
  console.log('================================================================\n');

  process.exit(totalErrors > 0 ? 1 : 0);
}

module.exports = {
  auditChapterVariables,
  extractSlideTokens,
  extractSvgVariables,
  extractCodeVariables,
  matchesAnyAlias,
  STOP_WORDS,
  CANONICAL_ALIASES,
  normalizeUnicode
};
