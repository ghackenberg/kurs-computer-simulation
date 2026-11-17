/**
 * Automated SVG & Chart Inspection Tool
 * 
 * Performs deep visual and structural analysis of all SVGs and raster charts:
 * 1. Text-to-Box Alignment & Overlap: Detects text extending outside bounding shapes.
 * 2. ViewBox Clipping: Detects elements rendered outside the viewBox bounds.
 * 3. Text Legibility & Font Sizing: Measures rendered pixel sizes.
 * 4. Optional PNG Rasterization: Renders each SVG to high-res PNG for visual inspection.
 */

const fs = require('fs');
const path = require('path');
const { loadPalette, syncSvgContent, START_MARKER } = require('./sync_svg_palette');

let SVG_PALETTE = null;
try { SVG_PALETTE = loadPalette(); } catch (e) {}

function checkSemanticPalette(svgPath) {
  if (!SVG_PALETTE) return [];
  const raw = fs.readFileSync(svgPath, 'utf8');
  const paletteIssues = [];
  const unknownClasses = new Set();
  let usesSemantic = raw.includes(START_MARKER);

  const classAttrRegex = /class\s*=\s*["']([^"']+)["']/g;
  let m;
  while ((m = classAttrRegex.exec(raw)) !== null) {
    for (const token of m[1].split(/\s+/)) {
      if (!token.startsWith('sem-')) continue;
      usesSemantic = true;
      const base = token.replace(/-(stroke|fill|bg|text)$/, '');
      if (!SVG_PALETTE.roles[base]) unknownClasses.add(token);
    }
  }

  for (const cls of unknownClasses) {
    paletteIssues.push({
      type: 'UNKNOWN_SEMANTIC_CLASS',
      message: `Unbekannte semantische SVG-Klasse '.${cls}' (nicht in Themen/svg_palette.json definiert).`
    });
  }

  const isMermaid = /#my-svg|aria-roledescription=/i.test(raw);
  const isTikz = /\.tikz\.svg$/i.test(svgPath);
  const isDiagramSvg = /[\\/]Diagramme[\\/]/i.test(svgPath);

  if (usesSemantic) {
    if (syncSvgContent(raw, SVG_PALETTE).changed) {
      paletteIssues.push({
        type: 'STALE_SVG_PALETTE',
        message: `SVG-Farbklassen sind nicht synchron mit Themen/svg_palette.json ('npm run sync:svg-palette' ausführen).`
      });
    }
  }

  if (usesSemantic || (isDiagramSvg && !isMermaid && !isTikz)) {
    const withoutManaged = raw
      .replace(/\/\*\s*@svg-palette:start\s*\*\/[\s\S]*?\/\*\s*@svg-palette:end\s*\*\//g, '')
      .replace(/<(?:linearGradient|radialGradient|filter)\b[\s\S]*?<\/(?:linearGradient|radialGradient|filter)>/gi, '');
    const colorMatches = withoutManaged.match(/(?:fill|stroke|color)\s*[:=]\s*["']?\s*(#[0-9a-fA-F]{3,8}|(?:rgb|hsl|oklch|oklab)\([^)]+\))/gi) || [];
    const forbidden = colorMatches.filter(c => !/#(?:fff(?:fff)?|000(?:000)?)\b/i.test(c));
    if (forbidden.length > 0) {
      paletteIssues.push({
        type: 'HARDCODED_SVG_COLOR',
        message: `Hartcodierte Farbe(n) gefunden (${forbidden.slice(0, 3).join(', ')}). Bitte sem-* Klassen aus Themen/svg_palette.json nutzen.`
      });
    }
  }

  // 2. Kein rahmenloses, vollflächiges weißes/helles Hintergrund-<rect> (stört CSS drop-shadow & Highlight-Folien)
  const vbMatch = raw.match(/viewBox\s*=\s*["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)\s*["']/i);
  const firstRectMatch = raw.match(/<rect\b[^>]*>/i);
  if (firstRectMatch) {
    const r = firstRectMatch[0];
    const hasLightFill = /fill\s*=\s*["']\s*(?:#fff(?:fff)?|white|#f8fafc|#f1f5f9|#fafafa)\s*["']/i.test(r);
    const hasStroke = /\bstroke\s*=\s*["'](?!none|transparent)/i.test(r) || /\bclass\s*=\s*["'][^"']*\bsem-(?:primary|info|success|warning|danger|accent|card|muted|neutral)\b/i.test(r);
    if (hasLightFill && !hasStroke) {
      const wMatch = r.match(/\bwidth\s*=\s*["']\s*([\d.]+%?)\s*["']/i);
      const hMatch = r.match(/\bheight\s*=\s*["']\s*([\d.]+%?)\s*["']/i);
      const isFullW = wMatch && (wMatch[1] === '100%' || (vbMatch && parseFloat(wMatch[1]) >= parseFloat(vbMatch[1]) * 0.9));
      const isFullH = hMatch && (hMatch[1] === '100%' || (vbMatch && parseFloat(hMatch[1]) >= parseFloat(vbMatch[2]) * 0.9));
      if (isFullW && isFullH) {
        paletteIssues.push({
          type: 'OPAQUE_BG_RECT',
          message: 'Rahmenloses, vollflächiges weißes/helles Hintergrund-<rect> gefunden. SVG-Canvas muss transparent bleiben (oder abgerundete Karte mit stroke).'
        });
      }
    }
  }

  // 3. Kein fast vollflächiger äußerer Rahmen (<rect> >= 80% der viewBox) in handgezeichneten Diagrammen
  if (isDiagramSvg && !isMermaid && !isTikz && vbMatch) {
    const vbW = parseFloat(vbMatch[1]);
    const vbH = parseFloat(vbMatch[2]);
    const allRects = raw.match(/<rect\b[^>]*>/gi) || [];
    const outerFrames = allRects.filter(r => {
      const wm = r.match(/\bwidth\s*=\s*["']\s*([\d.]+%?)\s*["']/i);
      const hm = r.match(/\bheight\s*=\s*["']\s*([\d.]+%?)\s*["']/i);
      if (!wm || !hm) return false;
      const w = wm[1].endsWith('%') ? (parseFloat(wm[1]) / 100) * vbW : parseFloat(wm[1]);
      const h = hm[1].endsWith('%') ? (parseFloat(hm[1]) / 100) * vbH : parseFloat(hm[1]);
      if (w < vbW * 0.8 || h < vbH * 0.8) return false;
      const isFillNone = /\bfill\s*=\s*["'](?:none|transparent)["']/i.test(r);
      const hasStrokeAttr = /\bstroke\s*=\s*["'](?!none|transparent)/i.test(r);
      const hasSemClass = /\bclass\s*=\s*["'][^"']*\bsem-/i.test(r);
      return !(isFillNone && !hasStrokeAttr && !hasSemClass);
    });
    if (outerFrames.length > 0) {
      paletteIssues.push({
        type: 'OUTER_FRAME_RECT',
        message: 'Fast vollflächiger äußerer Rahmen (<rect> >= 80% der viewBox) gefunden. Diagramme ohne äußeren Kasten direkt/organisch auf die Folie einbetten.'
      });
    }
  }

  // 4. Kein eingebetteter Folientitel/-untertitel im SVG (wird unten im DOM als direktes <svg>-Kind geprüft)
  const checkEmbeddedTitleInDom = isDiagramSvg && !isMermaid && !isTikz;

  return paletteIssues;
}

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PUPPETEER_PATH = path.join(process.env.APPDATA || 'C:/Users/P28500/AppData/Roaming', 'npm/node_modules/@mermaid-js/mermaid-cli/node_modules/puppeteer');

function getPuppeteer() {
  if (fs.existsSync(PUPPETEER_PATH)) return require(PUPPETEER_PATH);
  return require('puppeteer');
}

async function auditSvgFile(browser, svgPath, options = {}) {
  const rasterize = options.rasterize === true;
  const rasterDir = options.rasterDir || path.resolve('.tmp_raster_svg');
  if (rasterize && !fs.existsSync(rasterDir)) fs.mkdirSync(rasterDir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 }); // 2x Retina for crisp inspection

  const fileUrl = 'file:///' + path.resolve(svgPath).replace(/\\/g, '/');
  try {
    await page.goto(fileUrl, { waitUntil: 'domcontentloaded', timeout: 8000 });
  } catch (e) {
    await page.close();
    return { path: svgPath, error: 'Failed to load SVG: ' + e.message, issues: [] };
  }

  const analysis = await page.evaluate(({ checkEmbeddedTitleInDom, isMini }) => {
    const issues = [];
    const parserError = document.querySelector('parsererror');
    if (parserError) {
      const errText = parserError.innerText.trim().replace(/\s+/g, ' ');
      return { hasSvg: false, issues: [{ type: 'XML_PARSE_ERROR', message: errText }] };
    }
    const svg = document.querySelector('svg');
    if (!svg) {
      return { hasSvg: false, issues: [{ type: 'XML_PARSE_ERROR', message: 'No <svg> root element found (XML parsing failed)' }] };
    }

    const svgRect = svg.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;

    // Check all text elements and foreignObjects
    const textNodes = Array.from(document.querySelectorAll('text, .nodeLabel, foreignObject, tspan'));

    // Check for replacement characters or unparsed template strings
    const fullText = document.documentElement ? document.documentElement.textContent || '' : '';
    if (fullText.includes('\uFFFD') || fullText.includes('&#xFFFD;')) {
      issues.push({ type: 'ENCODING', message: 'Contains Unicode replacement characters ()' });
    }

    // 1. Text-to-Container Overlap Check in Flowcharts / Class Diagrams (Mermaid)
    const nodeContainers = Array.from(document.querySelectorAll('.node, g.cluster, .nodeLabel, g[id^="flowchart-"]'));
    nodeContainers.forEach((container, idx) => {
      const rect = container.querySelector('rect, polygon, circle, path');
      const label = container.querySelector('.nodeLabel, foreignObject, text');
      if (rect && label) {
        const rBox = rect.getBoundingClientRect();
        const lBox = label.getBoundingClientRect();

        // Check if label overflows rect significantly (> 4px tolerance)
        if (lBox.width > rBox.width + 4) {
          const text = (label.innerText || label.textContent || '').trim().replace(/\s+/g, ' ');
          issues.push({
            type: 'TEXT_OVERFLOW',
            message: `Text "${text.slice(0, 30)}..." width (${Math.round(lBox.width)}px) exceeds box (${Math.round(rBox.width)}px)`
          });
        }
        if (lBox.height > rBox.height + 4) {
          const text = (label.innerText || label.textContent || '').trim().replace(/\s+/g, ' ');
          issues.push({
            type: 'TEXT_OVERFLOW',
            message: `Text "${text.slice(0, 30)}..." height (${Math.round(lBox.height)}px) exceeds box (${Math.round(rBox.height)}px)`
          });
        }
      }
    });

    // 1b. Badge / Pill / Shield Rectangle Text Overflow Check (Custom SVGs)
    const allTexts = Array.from(document.querySelectorAll('text'));
    const allRects = Array.from(document.querySelectorAll('rect')).filter(r => !r.closest('defs') && !r.closest('clipPath'));

    allTexts.forEach(t => {
      const tBox = t.getBoundingClientRect();
      if (tBox.width <= 0 || tBox.height <= 0) return;
      const tText = (t.textContent || '').trim().replace(/\s+/g, ' ');
      if (!tText) return;

      const tCenterX = (tBox.left + tBox.right) / 2;
      const tCenterY = (tBox.top + tBox.bottom) / 2;

      allRects.forEach(r => {
        const rBox = r.getBoundingClientRect();
        if (rBox.width < 20 || rBox.height < 10) return;
        if (rBox.width > svgWidth * 0.95 && rBox.height > svgHeight * 0.95) return;

        const centerInside = (tCenterX >= rBox.left && tCenterX <= rBox.right &&
                              tCenterY >= rBox.top && tCenterY <= rBox.bottom);
        const isBadgeOrPill = rBox.height < 60 && rBox.width < 320;

        if (centerInside && isBadgeOrPill) {
          const overflowLeft = rBox.left - tBox.left;
          const overflowRight = tBox.right - rBox.right;
          const overflowTop = rBox.top - tBox.top;
          const overflowBottom = tBox.bottom - rBox.bottom;

          if (overflowLeft > 2 || overflowRight > 2) {
            const maxOverflow = Math.max(overflowLeft, overflowRight);
            issues.push({
              type: 'SHIELD_TEXT_OVERFLOW',
              message: `Text "${tText.slice(0, 30)}" exceeds background rect horizontally by ${Math.round(maxOverflow)}px (Text: ${Math.round(tBox.width)}px, Rect: ${Math.round(rBox.width)}px)`
            });
          }
          if (overflowTop > 2 || overflowBottom > 2) {
            const maxOverflow = Math.max(overflowTop, overflowBottom);
            issues.push({
              type: 'SHIELD_TEXT_OVERFLOW',
              message: `Text "${tText.slice(0, 30)}" exceeds background rect vertically by ${Math.round(maxOverflow)}px (Text: ${Math.round(tBox.height)}px, Rect: ${Math.round(rBox.height)}px)`
            });
          }
        }
      });
    });

    // 2. ViewBox Clipping Check
    const elements = Array.from(document.querySelectorAll('text, rect, path, foreignObject'));
    let outOfBoundsCount = 0;
    elements.forEach(el => {
      const b = el.getBoundingClientRect();
      if (b.width > 0 && b.height > 0) {
        if (b.right > svgRect.right + 10 || b.bottom > svgRect.bottom + 10 || b.left < svgRect.left - 10 || b.top < svgRect.top - 10) {
          outOfBoundsCount++;
        }
      }
    });

    if (outOfBoundsCount > 0) {
      issues.push({
        type: 'VIEWBOX_CLIPPING',
        message: `${outOfBoundsCount} element(s) render outside SVG viewport bounds`
      });
    }

    // 3. Pairwise Text-Text Collisions (AABB Intersection)
    const texts = Array.from(document.querySelectorAll('text')).map(el => {
      const rect = el.getBoundingClientRect();
      return {
        text: el.textContent.trim().replace(/\s+/g, ' '),
        rect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height },
        el
      };
    }).filter(t => t.text.length > 0 && t.rect.width > 0 && t.rect.height > 0);

    for (let i = 0; i < texts.length; i++) {
      for (let j = i + 1; j < texts.length; j++) {
        const a = texts[i];
        const b = texts[j];
        if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
        if (a.el.parentElement === b.el || b.el.parentElement === a.el) continue;
        if (a.el.closest('text') && a.el.closest('text') === b.el.closest('text')) continue;

        const xOverlap = Math.max(0, Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left));
        const yOverlap = Math.max(0, Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top));

        // Strict Text-Text Collision Gate:
        // 1. Line-height collision: Two horizontally overlapping lines (>= 15px) touching vertically (>= 1.5px)
        // 2. Corner/box collision: Any text bounding boxes colliding by >= 4px in both dimensions
        const isLineCollision = xOverlap >= 15 && yOverlap >= 1.5;
        const isBoxCollision = xOverlap >= 4 && yOverlap >= 3;

        if (isLineCollision || isBoxCollision) {
          issues.push({
            type: 'TEXT_TEXT_COLLISION',
            message: `"${a.text.slice(0, 25)}" collides with "${b.text.slice(0, 25)}" (${Math.round(xOverlap)}x${Math.round(yOverlap)}px)`
          });
        } else if (yOverlap >= 6) {
          // 3. Proximity violation (Horizontaler Mindestabstand auf gleicher Zeile):
          // Getrennte Textelemente auf gleicher visueller Zeile mÃ¼ssen mindestens 10px Mindestabstand halten
          const horizDist = Math.max(a.rect.left, b.rect.left) - Math.min(a.rect.right, b.rect.right);
          if (horizDist < 10.0) {
            issues.push({
              type: 'TEXT_PROXIMITY_VIOLATION',
              message: `Horizontal distance between "${a.text.slice(0, 20)}" and "${b.text.slice(0, 20)}" (${horizDist.toFixed(1)}px) is below 10px minimum`
            });
          }
        }
      }
    }

    // 4. Panel / Card Boundary Margin & Clipping
    // PrÃ¼ft, ob Text innerhalb struktureller Boxen/Cards liegt und ausreichend Mindestabstand zu den RÃ¤ndern einhÃ¤lt
    const cards = Array.from(document.querySelectorAll('rect'))
      .filter(r => !r.closest('defs') && !r.closest('clipPath'))
      .filter(r => {
        const style = window.getComputedStyle(r);
        const hasFill = style.fill && style.fill !== 'none' && style.fill !== 'transparent';
        const hasStroke = style.stroke && style.stroke !== 'none' && style.stroke !== 'transparent' && parseFloat(style.strokeWidth || '0') > 0;
        const isDashed = r.getAttribute('stroke-dasharray') || (style.strokeDasharray && style.strokeDasharray !== 'none');
        return (hasFill || hasStroke) && !isDashed && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      })
      .map(r => r.getBoundingClientRect())
      .filter(r => r.width >= 80 && r.height >= 40);

    texts.forEach(t => {
      cards.forEach(card => {
        const startsInside = t.rect.left >= card.left + 4 && t.rect.left < card.right - 25 &&
                             t.rect.top >= card.top + 2 && t.rect.bottom <= card.bottom + 4;
        if (startsInside) {
          const rightMargin = card.right - t.rect.right;
          if (rightMargin < 0) {
            issues.push({
              type: 'PANEL_CLIPPING',
              message: `"${t.text.slice(0, 25)}" overflows card right edge by ${Math.round(-rightMargin)}px`
            });
          } else if (rightMargin < 8.0) {
            issues.push({
              type: 'CARD_MARGIN_TOO_SMALL',
              message: `Text "${t.text.slice(0, 25)}" is too close to card right edge (${rightMargin.toFixed(1)}px < 8px minimum)`
            });
          }
        }
      });
    });

    // 5. Unshielded Text-Line Collisions (Exact geometric segment intersection + shielding check)
    function clipSegmentAABB(x1, y1, x2, y2, left, top, right, bottom) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      let t0 = 0.0;
      let t1 = 1.0;
      const p = [-dx, dx, -dy, dy];
      const q = [x1 - left, right - x1, y1 - top, bottom - y1];

      for (let i = 0; i < 4; i++) {
        if (p[i] === 0) {
          if (q[i] < 0) return null;
        } else {
          const r = q[i] / p[i];
          if (p[i] < 0) {
            if (r > t1) return null;
            if (r > t0) t0 = r;
          } else {
            if (r < t0) return null;
            if (r < t1) t1 = r;
          }
        }
      }
      if (t0 > t1) return null;
      return {
        t0, t1,
        pEnter: { x: x1 + t0 * dx, y: y1 + t0 * dy },
        pExit: { x: x1 + t1 * dx, y: y1 + t1 * dy },
        length: Math.hypot((t1 - t0) * dx, (t1 - t0) * dy)
      };
    }

    const svgLines = Array.from(document.querySelectorAll('line')).map(l => {
      const ctm = l.getScreenCTM();
      if (!ctm) return null;
      const x1 = parseFloat(l.getAttribute('x1') || '0');
      const y1 = parseFloat(l.getAttribute('y1') || '0');
      const x2 = parseFloat(l.getAttribute('x2') || '0');
      const y2 = parseFloat(l.getAttribute('y2') || '0');
      const style = window.getComputedStyle(l);
      const stroke = style.stroke;
      const strokeWidth = parseFloat(style.strokeWidth || '0');
      const hasStroke = stroke && stroke !== 'none' && stroke !== 'transparent' && strokeWidth > 0;
      return {
        el: l,
        p1: { x: ctm.a * x1 + ctm.c * y1 + ctm.e, y: ctm.b * x1 + ctm.d * y1 + ctm.f },
        p2: { x: ctm.a * x2 + ctm.c * y2 + ctm.e, y: ctm.b * x2 + ctm.d * y2 + ctm.f },
        hasStroke
      };
    }).filter(l => l && l.hasStroke);

    const lineCollisionSeen = new Set();
    texts.forEach(t => {
      // Analytischer Schnitt mit allen <line> Elementen
      svgLines.forEach(l => {
        const clip = clipSegmentAABB(l.p1.x, l.p1.y, l.p2.x, l.p2.y, t.rect.left, t.rect.top, t.rect.right, t.rect.bottom);
        if (clip && clip.length >= 6) {
          const midX = (clip.pEnter.x + clip.pExit.x) / 2;
          const midY = (clip.pEnter.y + clip.pExit.y) / 2;
          const els = document.elementsFromPoint(midX, midY);
          const textIdx = els.indexOf(t.el);
          const lineIdx = els.indexOf(l.el);

          let shielded = false;
          if (textIdx !== -1 && lineIdx !== -1) {
            for (let i = Math.min(textIdx, lineIdx) + 1; i < Math.max(textIdx, lineIdx); i++) {
              const el = els[i];
              const style = window.getComputedStyle(el);
              const fill = style.fill;
              if (fill && fill !== 'none' && fill !== 'transparent' && style.opacity !== '0' && style.fillOpacity !== '0') {
                shielded = true;
                break;
              }
            }
          }

          if (!shielded) {
            const key = t.text + '_line';
            if (!lineCollisionSeen.has(key)) {
              lineCollisionSeen.add(key);
              issues.push({
                type: 'TEXT_LINE_COLLISION',
                message: `Unshielded line intersects text "${t.text.slice(0, 25)}"`
              });
            }
          }
        }
      });

      // Pfad-Abtastung fÃ¼r Freiformkurven (<path>) mit feinem Raster (11x5 Punkte)
      if (!lineCollisionSeen.has(t.text + '_line')) {
        const fractionsX = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
        const fractionsY = [0.2, 0.35, 0.5, 0.65, 0.8];
        let pathHit = false;

        for (const fx of fractionsX) {
          for (const fy of fractionsY) {
            const pt = { x: t.rect.left + t.rect.width * fx, y: t.rect.top + t.rect.height * fy };
            const els = document.elementsFromPoint(pt.x, pt.y);
            const pathIndex = els.findIndex(el => el.tagName === 'path' && el.getAttribute('stroke') && (!el.getAttribute('fill') || el.getAttribute('fill') === 'none'));
            if (pathIndex !== -1) {
              const textIndex = els.indexOf(t.el);
              let shielded = false;
              for (let i = Math.min(textIndex, pathIndex) + 1; i < Math.max(textIndex, pathIndex); i++) {
                const el = els[i];
                const style = window.getComputedStyle(el);
                const fill = style.fill;
                if (fill && fill !== 'none' && fill !== 'transparent' && style.opacity !== '0' && style.fillOpacity !== '0') {
                  shielded = true;
                  break;
                }
              }
              if (!shielded) {
                pathHit = true;
                break;
              }
            }
          }
          if (pathHit) break;
        }

        if (pathHit) {
          lineCollisionSeen.add(t.text + '_line');
          issues.push({
            type: 'TEXT_LINE_COLLISION',
            message: `Unshielded path intersects text "${t.text.slice(0, 25)}"`
          });
        }
      }
    });

    // 5b. Unshielded Text-Rect Border Collisions (Stroked rect edges intersecting text without opaque background)
    const strokedRects = Array.from(document.querySelectorAll('rect')).map(el => {
      const style = window.getComputedStyle(el);
      const stroke = style.stroke;
      const strokeWidth = parseFloat(style.strokeWidth || '0');
      const r = el.getBoundingClientRect();
      return {
        el,
        hasStroke: stroke && stroke !== 'none' && stroke !== 'transparent' && strokeWidth > 0,
        strokeWidth,
        rect: { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }
      };
    }).filter(r => r.hasStroke && r.rect.width > 10 && r.rect.height > 10);

    const rectCollisionSeen = new Set();
    texts.forEach(t => {
      strokedRects.forEach(sr => {
        if (sr.el.contains(t.el)) return;

        const R = sr.rect;
        const T = t.rect;

        const edges = [
          { name: 'top', y: R.top, x1: R.left, x2: R.right, isHoriz: true },
          { name: 'bottom', y: R.bottom, x1: R.left, x2: R.right, isHoriz: true },
          { name: 'left', x: R.left, y1: R.top, y2: R.bottom, isHoriz: false },
          { name: 'right', x: R.right, y1: R.top, y2: R.bottom, isHoriz: false }
        ];

        edges.forEach(edge => {
          let intersects = false;
          let pt = null;

          if (edge.isHoriz) {
            const xOverlapMin = Math.max(T.left, edge.x1);
            const xOverlapMax = Math.min(T.right, edge.x2);
            if (xOverlapMax - xOverlapMin >= 8) {
              if (T.top + 3 <= edge.y && T.bottom - 3 >= edge.y) {
                intersects = true;
                pt = { x: (xOverlapMin + xOverlapMax) / 2, y: edge.y };
              }
            }
          } else {
            const yOverlapMin = Math.max(T.top, edge.y1);
            const yOverlapMax = Math.min(T.bottom, edge.y2);
            if (yOverlapMax - yOverlapMin >= 8) {
              if (T.left + 3 <= edge.x && T.right - 3 >= edge.x) {
                intersects = true;
                pt = { x: edge.x, y: (yOverlapMin + yOverlapMax) / 2 };
              }
            }
          }

          if (intersects && pt) {
            const elsAtPt = document.elementsFromPoint(pt.x, pt.y);
            const textIdx = elsAtPt.indexOf(t.el);
            const rectIdx = elsAtPt.indexOf(sr.el);
            let shielded = false;

            if (textIdx !== -1 && rectIdx !== -1) {
              for (let i = Math.min(textIdx, rectIdx) + 1; i < Math.max(textIdx, rectIdx); i++) {
                const el = elsAtPt[i];
                const style = window.getComputedStyle(el);
                const fill = style.fill;
                if (fill && fill !== 'none' && fill !== 'transparent' && style.opacity !== '0' && style.fillOpacity !== '0') {
                  shielded = true;
                  break;
                }
              }
            }

            if (!shielded) {
              const key = t.text + '_' + edge.name;
              if (!rectCollisionSeen.has(key)) {
                rectCollisionSeen.add(key);
                issues.push({
                  type: 'TEXT_RECT_BORDER_COLLISION',
                  message: `Unshielded rectangle ${edge.name} border intersects text "${t.text.slice(0, 25)}"`
                });
              }
            }
          }
        });
      });
    });

    // 5c. Unshielded Text-Circle Collisions (Marker/node circles overlapping text without opaque background)
    const svgCircles = Array.from(document.querySelectorAll('circle')).map(c => {
      const ctm = c.getScreenCTM();
      if (!ctm) return null;
      const cx = parseFloat(c.getAttribute('cx') || '0');
      const cy = parseFloat(c.getAttribute('cy') || '0');
      const r = parseFloat(c.getAttribute('r') || '0');
      const center = { x: ctm.a * cx + ctm.c * cy + ctm.e, y: ctm.b * cx + ctm.d * cy + ctm.f };
      const scale = Math.hypot(ctm.a, ctm.b);
      const rScreen = r * scale;
      const style = window.getComputedStyle(c);
      const strokeWidth = parseFloat(style.strokeWidth || '0') * scale;
      return { el: c, center, r: rScreen, strokeWidth, effectiveR: rScreen + strokeWidth / 2 };
    }).filter(c => c && c.r > 0);

    const circleCollisionSeen = new Set();
    texts.forEach(t => {
      svgCircles.forEach(c => {
        const px = Math.max(t.rect.left, Math.min(c.center.x, t.rect.right));
        const py = Math.max(t.rect.top, Math.min(c.center.y, t.rect.bottom));
        const dist = Math.hypot(c.center.x - px, c.center.y - py);

        if (dist <= c.effectiveR) {
          // Check if text is intentionally contained inside a large badge/node circle
          const textInside = (
            t.rect.left >= c.center.x - c.effectiveR &&
            t.rect.right <= c.center.x + c.effectiveR &&
            t.rect.top >= c.center.y - c.effectiveR &&
            t.rect.bottom <= c.center.y + c.effectiveR
          );
          if (textInside) return;

          const els = document.elementsFromPoint(px, py);
          const textIdx = els.indexOf(t.el);
          const circleIdx = els.indexOf(c.el);

          let shielded = false;
          if (textIdx !== -1 && circleIdx !== -1) {
            for (let i = Math.min(textIdx, circleIdx) + 1; i < Math.max(textIdx, circleIdx); i++) {
              const el = els[i];
              const style = window.getComputedStyle(el);
              const fill = style.fill;
              if (fill && fill !== 'none' && fill !== 'transparent' && style.opacity !== '0' && style.fillOpacity !== '0') {
                shielded = true;
                break;
              }
            }
          }

          if (!shielded) {
            const key = t.text + '_circle';
            if (!circleCollisionSeen.has(key)) {
              circleCollisionSeen.add(key);
              issues.push({
                type: 'TEXT_CIRCLE_COLLISION',
                message: `Unshielded circle marker overlaps text "${t.text.slice(0, 25)}"`
              });
            }
          }
        }
      });
    });

    // 5d. Unshielded Text-Polygon Collisions (Arrow tips and geometric polygons intersecting text)
    const svgPolygons = Array.from(document.querySelectorAll('polygon')).map(poly => {
      const ctm = poly.getScreenCTM();
      if (!ctm) return null;
      const pointsAttr = poly.getAttribute('points') || '';
      const rawPoints = pointsAttr.trim().split(/[\s,]+/).map(parseFloat);
      const vertices = [];
      for (let i = 0; i < rawPoints.length - 1; i += 2) {
        const x = rawPoints[i], y = rawPoints[i + 1];
        if (!isNaN(x) && !isNaN(y)) {
          vertices.push({
            x: ctm.a * x + ctm.c * y + ctm.e,
            y: ctm.b * x + ctm.d * y + ctm.f
          });
        }
      }
      return { el: poly, vertices };
    }).filter(p => p && p.vertices.length >= 3);

    const polyCollisionSeen = new Set();
    texts.forEach(t => {
      svgPolygons.forEach(poly => {
        const V = poly.vertices;
        let hit = false;
        let hitPt = null;

        for (let i = 0; i < V.length; i++) {
          const p1 = V[i];
          const p2 = V[(i + 1) % V.length];
          const clip = clipSegmentAABB(p1.x, p1.y, p2.x, p2.y, t.rect.left, t.rect.top, t.rect.right, t.rect.bottom);
          if (clip && clip.length >= 3) {
            hit = true;
            hitPt = { x: (clip.pEnter.x + clip.pExit.x) / 2, y: (clip.pEnter.y + clip.pExit.y) / 2 };
            break;
          }
        }

        if (!hit) {
          for (const v of V) {
            if (v.x >= t.rect.left && v.x <= t.rect.right && v.y >= t.rect.top && v.y <= t.rect.bottom) {
              hit = true;
              hitPt = { x: v.x, y: v.y };
              break;
            }
          }
        }

        if (hit && hitPt) {
          const els = document.elementsFromPoint(hitPt.x, hitPt.y);
          const textIdx = els.indexOf(t.el);
          const polyIdx = els.indexOf(poly.el);

          let shielded = false;
          if (textIdx !== -1 && polyIdx !== -1) {
            for (let i = Math.min(textIdx, polyIdx) + 1; i < Math.max(textIdx, polyIdx); i++) {
              const el = els[i];
              const style = window.getComputedStyle(el);
              const fill = style.fill;
              if (fill && fill !== 'none' && fill !== 'transparent' && style.opacity !== '0' && style.fillOpacity !== '0') {
                shielded = true;
                break;
              }
            }
          }

          if (!shielded) {
            const key = t.text + '_poly';
            if (!polyCollisionSeen.has(key)) {
              polyCollisionSeen.add(key);
              issues.push({
                type: 'TEXT_POLYGON_COLLISION',
                message: `Unshielded polygon/arrow tip intersects text "${t.text.slice(0, 25)}"`
              });
            }
          }
        }
      });
    });

    // 6. Minimum Font Size Check (< 11px)
    texts.forEach(t => {
      const style = window.getComputedStyle(t.el);
      const fs = parseFloat(style.fontSize);
      if (fs < 11.0) {
        issues.push({
          type: 'FONT_TOO_SMALL',
          message: `Text "${t.text.slice(0, 25)}" font size (${fs.toFixed(1)}px) is below 11px`
        });
      }
    });

    // 7. WCAG 2.1 Text-to-Background Contrast Check
    const parseColorStr = (str) => {
      if (!str || str === 'none' || str === 'transparent') return null;
      const m = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i);
      if (m) {
        const a = m[4] !== undefined ? parseFloat(m[4]) : 1;
        return { r: parseFloat(m[1]), g: parseFloat(m[2]), b: parseFloat(m[3]), a };
      }
      const hm = str.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
      if (hm) {
        let h = hm[1];
        if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
        return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16), a: 1 };
      }
      return null;
    };
    const blendOnWhite = (c) => {
      if (!c) return { r: 255, g: 255, b: 255 };
      const a = c.a !== undefined ? c.a : 1;
      return {
        r: c.r * a + 255 * (1 - a),
        g: c.g * a + 255 * (1 - a),
        b: c.b * a + 255 * (1 - a)
      };
    };
    const relLum = (c) => {
      const lin = (v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
    };
    const contrastRatio = (c1, c2) => {
      const l1 = relLum(c1), l2 = relLum(c2);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    };
    const resolveBgCandidates = (fillStr, fillOp = 1) => {
      if (!fillStr || fillStr === 'none' || fillStr === 'transparent') return null;
      const urlM = fillStr.match(/url\(\s*["']?#([^"')]+)["']?\s*\)/i);
      if (urlM) {
        const grad = document.getElementById(urlM[1]);
        if (grad) {
          const stops = Array.from(grad.querySelectorAll('stop'));
          const cols = stops.map(st => {
            const sc = window.getComputedStyle(st).stopColor || st.getAttribute('stop-color');
            const p = parseColorStr(sc);
            if (p) p.a *= fillOp;
            return p;
          }).filter(Boolean).map(blendOnWhite);
          if (cols.length > 0) return cols;
        }
        return null;
      }
      const parsed = parseColorStr(fillStr);
      if (!parsed || parsed.a * fillOp === 0) return null;
      parsed.a *= fillOp;
      return [blendOnWhite(parsed)];
    };

    const getBgCandidatesAtPoint = (x, y, selfEl) => {
      const stack = document.elementsFromPoint(x, y);
      const tIdx = selfEl ? stack.indexOf(selfEl) : -1;
      const startIdx = tIdx !== -1 ? tIdx + 1 : 0;
      for (let i = startIdx; i < stack.length; i++) {
        const bgEl = stack[i];
        const bTag = bgEl.tagName ? bgEl.tagName.toLowerCase() : '';
        if (!['rect', 'circle', 'ellipse', 'polygon', 'path'].includes(bTag)) continue;
        const bStyle = window.getComputedStyle(bgEl);
        const op = parseFloat(bStyle.opacity || '1');
        const fop = parseFloat(bStyle.fillOpacity || '1');
        if (bStyle.display === 'none' || bStyle.visibility === 'hidden' || op === 0 || fop === 0) continue;
        const cands = resolveBgCandidates(bStyle.fill, op * fop);
        if (cands) return cands;
      }
      return [{ r: 255, g: 255, b: 255 }];
    };

    const contrastSeen = new Set();
    texts.forEach(t => {
      if (t.el.tagName && t.el.tagName.toLowerCase() === 'tspan') return;
      const style = window.getComputedStyle(t.el);
      if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity || '1') === 0) return;
      const fgParsed = parseColorStr(style.fill);
      if (!fgParsed || fgParsed.a === 0) return;
      const fg = blendOnWhite(fgParsed);

      const cx = (t.rect.left + t.rect.right) / 2;
      const cy = (t.rect.top + t.rect.bottom) / 2;
      const bgCandidates = getBgCandidatesAtPoint(cx, cy, t.el);

      const fs = parseFloat(style.fontSize || '12');
      const fw = parseInt(style.fontWeight || '400', 10) || (style.fontWeight === 'bold' ? 700 : 400);
      const isLarge = fs >= 18.66 || (fs >= 14 && fw >= 700);
      const minRatio = isLarge ? 3.0 : 4.5;
      const worstRatio = Math.min(...bgCandidates.map(bg => contrastRatio(fg, bg)));
      if (worstRatio < minRatio) {
        const key = `${t.text.slice(0, 20)}_${worstRatio.toFixed(1)}`;
        if (!contrastSeen.has(key)) {
          contrastSeen.add(key);
          issues.push({
            type: 'LOW_TEXT_CONTRAST',
            message: `Low contrast (${worstRatio.toFixed(2)}:1 < ${minRatio}:1) for text "${t.text.slice(0, 25)}"`
          });
        }
      }
    });

    // 8. WCAG 2.1 Non-Text Graphic Contrast Check (>= 3.0:1 für Pfeilspitzen, Linien & kleine Signalformen)
    const graphicSeen = new Set();
    const toScreenPt = (el, x, y) => {
      const ctm = el.getScreenCTM();
      if (!ctm) return { x, y };
      return { x: ctm.a * x + ctm.c * y + ctm.e, y: ctm.b * x + ctm.d * y + ctm.f };
    };
    const reportGraphicContrast = (label, ratio) => {
      if (ratio >= 3.0) return;
      const key = `${label}_${ratio.toFixed(1)}`;
      if (!graphicSeen.has(key)) {
        graphicSeen.add(key);
        issues.push({
          type: 'LOW_GRAPHIC_CONTRAST',
          message: `Low graphic contrast (${ratio.toFixed(2)}:1 < 3.0:1) for ${label}`
        });
      }
    };

    svg.querySelectorAll('line, path, polyline').forEach(el => {
      if (el.closest('defs, marker')) return;
      const st = window.getComputedStyle(el);
      if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity || '1') === 0) return;

      // A. Pfeilspitzen (<marker>) an Linienenden prüfen
      const markerEnd = st.markerEnd || el.getAttribute('marker-end');
      if (markerEnd && markerEnd !== 'none') {
        const mm = markerEnd.match(/url\(\s*["']?#([^"')]+)["']?\s*\)/i);
        const markerEl = mm ? document.getElementById(mm[1]) : null;
        const shape = markerEl ? markerEl.querySelector('path, polygon, circle, rect') : null;
        if (shape) {
          const mSt = window.getComputedStyle(shape);
          const mFgCands = resolveBgCandidates(mSt.fill);
          if (mFgCands) {
            let pt = null;
            const tag = el.tagName.toLowerCase();
            if (tag === 'line') {
              const x1 = parseFloat(el.getAttribute('x1') || '0'), y1 = parseFloat(el.getAttribute('y1') || '0');
              const x2 = parseFloat(el.getAttribute('x2') || '0'), y2 = parseFloat(el.getAttribute('y2') || '0');
              const len = Math.hypot(x2 - x1, y2 - y1);
              const back = len > 6 ? 6 / len : 0;
              pt = toScreenPt(el, x2 - (x2 - x1) * back, y2 - (y2 - y1) * back);
            } else if (typeof el.getTotalLength === 'function' && el.getTotalLength() > 0) {
              const p = el.getPointAtLength(Math.max(0, el.getTotalLength() - 6));
              pt = toScreenPt(el, p.x, p.y);
            }
            if (pt) {
              const bgCands = getBgCandidatesAtPoint(pt.x, pt.y, el);
              const worst = Math.min(...mFgCands.flatMap(fg => bgCands.map(bg => contrastRatio(fg, bg))));
              reportGraphicContrast(`arrowhead (#${mm[1]})`, worst);
            }
          }
        }
      }

      // B. Wichtige nicht-gestrichelte Vordergrund-Linien (>= 1.8px) ohne sem-card/sem-muted Rahmenklassen
      const cls = el.getAttribute('class') || '';
      const isSubtle = /\bsem-(?:card|muted)-stroke\b/.test(cls) || (st.strokeDasharray && st.strokeDasharray !== 'none') || (st.fill && st.fill !== 'none' && st.fill !== 'transparent');
      const sw = parseFloat(st.strokeWidth || '1');
      if (!isSubtle && sw >= 1.8) {
        const sFg = parseColorStr(st.stroke);
        if (sFg && sFg.a > 0) {
          let midPt = null;
          const tag = el.tagName.toLowerCase();
          if (tag === 'line') {
            const x1 = parseFloat(el.getAttribute('x1') || '0'), y1 = parseFloat(el.getAttribute('y1') || '0');
            const x2 = parseFloat(el.getAttribute('x2') || '0'), y2 = parseFloat(el.getAttribute('y2') || '0');
            midPt = toScreenPt(el, (x1 + x2) / 2, (y1 + y2) / 2);
          } else if (typeof el.getTotalLength === 'function' && el.getTotalLength() > 0) {
            const p = el.getPointAtLength(el.getTotalLength() / 2);
            midPt = toScreenPt(el, p.x, p.y);
          }
          if (midPt) {
            const bgCands = getBgCandidatesAtPoint(midPt.x, midPt.y, el);
            const worst = Math.min(...bgCands.map(bg => contrastRatio(blendOnWhite(sFg), bg)));
            reportGraphicContrast(`${tag} stroke`, worst);
          }
        }
      }
    });

    // C. Kleine kompakte Signal-Formen (z. B. Punkte, kleine Marker) mit Solid-Fill (ohne gestrichelte Boxen / Linien-Endpunkte)
    svg.querySelectorAll('circle, rect, polygon').forEach(el => {
      if (el.closest('defs, marker')) return;
      const cls = el.getAttribute('class') || '';
      if (/\bsem-(?:card|muted)\b/.test(cls) && !/\bsem-\w+-fill\b/.test(cls)) return;
      const st = window.getComputedStyle(el);
      if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity || '1') < 0.95 || parseFloat(st.fillOpacity || '1') < 0.7) return;
      if (st.strokeDasharray && st.strokeDasharray !== 'none') return;
      const r = el.getBoundingClientRect();
      if (r.width <= 14 || r.height <= 14 || r.width > 40 || r.height > 40) return;
      const fgCands = resolveBgCandidates(st.fill);
      const stCol = (parseFloat(st.strokeWidth || '0') >= 0.8) ? parseColorStr(st.stroke) : null;
      if (!fgCands && (!stCol || stCol.a === 0)) return;
      const bgCands = getBgCandidatesAtPoint((r.left + r.right) / 2, (r.top + r.bottom) / 2, el);
      const fillWorst = fgCands ? Math.min(...fgCands.flatMap(fg => bgCands.map(bg => contrastRatio(fg, bg)))) : 0;
      const strokeWorst = (stCol && stCol.a > 0) ? Math.min(...bgCands.map(bg => contrastRatio(blendOnWhite(stCol), bg))) : 0;
      reportGraphicContrast(`${el.tagName.toLowerCase()} marker`, Math.max(fillWorst, strokeWorst));
    });

    if (checkEmbeddedTitleInDom) {
      const directTitles = Array.from(svg.children).filter(el => {
        if (!el.tagName || el.tagName.toLowerCase() !== 'text') return false;
        const cls = el.getAttribute('class') || '';
        const y = parseFloat(el.getAttribute('y') || '999');
        return (/(?:^|\s)title(?:\s|$)/.test(cls) && y <= 65) || (isMini && /(?:^|\s)hdr(?:\s|$)/.test(cls) && y <= 35);
      });
      if (directTitles.length === 1) {
        issues.push({
          type: 'EMBEDDED_SLIDE_TITLE',
          message: 'Eingebetteter Folientitel/-untertitel im SVG gefunden. Titel und Untertitel gehören ins Markdown, nicht ins SVG.'
        });
      }
    }

    return {
      hasSvg: true,
      svgWidth: Math.round(svgWidth),
      svgHeight: Math.round(svgHeight),
      aspectRatio: svgHeight > 0 ? (svgWidth / svgHeight).toFixed(2) : 'N/A',
      textNodeCount: textNodes.length,
      issues
    };
  }, {
    checkEmbeddedTitleInDom: /[\\/]Diagramme[\\/]/i.test(svgPath) && !svgPath.endsWith('.tikz.svg'),
    isMini: path.basename(svgPath).startsWith('Mini_')
  });

  let rasterPath = null;
  if (rasterize && analysis.hasSvg) {
    const safeName = path.basename(svgPath).replace(/\.svg$/, '.png');
    rasterPath = path.join(rasterDir, safeName);
    try {
      await page.screenshot({ path: rasterPath, fullPage: true, omitBackground: false });
    } catch (e) {}
  }

  await page.close();

  const paletteIssues = checkSemanticPalette(svgPath);
  if (paletteIssues.length > 0 && Array.isArray(analysis.issues)) {
    analysis.issues.push(...paletteIssues);
  }

  return {
    path: svgPath,
    ...analysis,
    rasterPath
  };
}

async function main() {
  const args = process.argv.slice(2);
  const rasterize = args.includes('--rasterize');
  const filteredArgs = args.filter(a => !a.startsWith('--'));

  let targetDir = filteredArgs[0] || 'Kapitel';
  if (!fs.existsSync(targetDir) && fs.existsSync('Kapitel')) {
    const match = fs.readdirSync('Kapitel').find(d => d.startsWith(targetDir));
    if (match) targetDir = path.join('Kapitel', match, 'Folien');
  }

  const puppeteer = getPuppeteer();
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  console.log(`\n================================================================`);
  console.log(`  AUTOMATED SVG QUALITY & READABILITY AUDITOR`);
  console.log(`  Scanning directory: ${targetDir}${rasterize ? ' (PNG Rasterize ON)' : ' (Fast Mode: in-memory DOM audit)'}`);
  console.log(`================================================================\n`);

  function findSvgs(dir) {
    if (fs.existsSync(dir) && fs.statSync(dir).isFile()) {
      return dir.endsWith('.svg') ? [dir] : [];
    }
    let svgs = [];
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) {
        if (f !== 'node_modules' && f !== '.git' && f !== '.tmp_raster_svg') {
          svgs = svgs.concat(findSvgs(full));
        }
      } else if (f.endsWith('.svg')) {
        svgs.push(full);
      }
    }
    return svgs;
  }

  const allSvgs = findSvgs(targetDir);
  console.log(`Found ${allSvgs.length} SVG files to audit.\n`);

  const CONCURRENCY = 6;
  const results = [];
  const startTime = Date.now();

  for (let i = 0; i < allSvgs.length; i += CONCURRENCY) {
    const chunk = allSvgs.slice(i, i + CONCURRENCY);
    const chunkResults = await Promise.all(
      chunk.map(svg => auditSvgFile(browser, svg, { rasterize }))
    );
    results.push(...chunkResults);
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  let defectCount = 0;
  for (const result of results) {
    const rel = path.relative(process.cwd(), result.path);
    if (result.issues && result.issues.length > 0) {
      defectCount++;
      console.log(`âœ— ${rel} (Aspect: ${result.aspectRatio}:1):`);
      result.issues.forEach(iss => {
        console.log(`    [${iss.type}] ${iss.message}`);
      });
    }
  }

  await browser.close();

  console.log(`\n================================================================`);
  console.log(`  ZUSAMMENFASSUNG SVG-AUDIT`);
  console.log(`  GeprÃ¼fte SVGs: ${allSvgs.length} in ${durationSec}s`);
  console.log(`  SVGs mit AuffÃ¤lligkeiten: ${defectCount}`);
  console.log(`================================================================\n`);
  process.exit(defectCount > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
