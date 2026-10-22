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

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PUPPETEER_PATH = 'C:/Users/P28500/AppData/Roaming/npm/node_modules/@mermaid-js/mermaid-cli/node_modules/puppeteer';

function getPuppeteer() {
  if (fs.existsSync(PUPPETEER_PATH)) return require(PUPPETEER_PATH);
  return require('puppeteer');
}

async function auditSvgFile(browser, svgPath, options = {}) {
  const rasterize = options.rasterize !== false;
  const rasterDir = options.rasterDir || path.resolve('.tmp_raster_svg');
  if (rasterize && !fs.existsSync(rasterDir)) fs.mkdirSync(rasterDir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 }); // 2x Retina for crisp inspection

  const fileUrl = 'file:///' + path.resolve(svgPath).replace(/\\/g, '/');
  try {
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 10000 });
  } catch (e) {
    await page.close();
    return { path: svgPath, error: 'Failed to load SVG: ' + e.message, issues: [] };
  }

  const analysis = await page.evaluate(() => {
    const issues = [];
    const svg = document.querySelector('svg');
    if (!svg) {
      return { hasSvg: false, issues: ['No <svg> root element found'] };
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
        if (xOverlap >= 8 && yOverlap >= 6) {
          issues.push({
            type: 'TEXT_TEXT_COLLISION',
            message: `"${a.text.slice(0, 25)}" collides with "${b.text.slice(0, 25)}" (${Math.round(xOverlap)}x${Math.round(yOverlap)}px)`
          });
        }
      }
    }

    // 4. Panel / Card Boundary Clipping (Text extending outside visible structural card rect)
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
      .filter(r => r.width > 350 && r.height > 250);

    texts.forEach(t => {
      cards.forEach(card => {
        const startsInside = t.rect.left >= card.left + 5 && t.rect.left < card.right - 25 &&
                             t.rect.top >= card.top + 5 && t.rect.top < card.bottom - 5;
        if (startsInside && t.rect.right > card.right + 4) {
          issues.push({
            type: 'PANEL_CLIPPING',
            message: `"${t.text.slice(0, 25)}" overflows card right edge by ${Math.round(t.rect.right - card.right)}px`
          });
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

      // Pfad-Abtastung für Freiformkurven (<path>) mit feinem Raster (11x5 Punkte)
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

    return {
      hasSvg: true,
      svgWidth: Math.round(svgWidth),
      svgHeight: Math.round(svgHeight),
      aspectRatio: svgHeight > 0 ? (svgWidth / svgHeight).toFixed(2) : 'N/A',
      textNodeCount: textNodes.length,
      issues
    };
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

  return {
    path: svgPath,
    ...analysis,
    rasterPath
  };
}

async function main() {
  const args = process.argv.slice(2);
  let targetDir = args[0] || 'Folien';
  if (!fs.existsSync(targetDir) && fs.existsSync('Folien')) {
    const match = fs.readdirSync('Folien').find(d => d.startsWith(targetDir));
    if (match) targetDir = path.join('Folien', match);
  }

  const puppeteer = getPuppeteer();
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  console.log(`\n================================================================`);
  console.log(`  AUTOMATED SVG QUALITY & READABILITY AUDITOR`);
  console.log(`  Scanning directory: ${targetDir}`);
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

  let defectCount = 0;
  for (const svg of allSvgs) {
    const rel = path.relative(process.cwd(), svg);
    const result = await auditSvgFile(browser, svg);
    if (result.issues && result.issues.length > 0) {
      defectCount++;
      console.log(`✗ ${rel} (Aspect: ${result.aspectRatio}:1):`);
      result.issues.forEach(iss => {
        console.log(`    [${iss.type}] ${iss.message}`);
      });
    }
  }

  await browser.close();

  console.log(`\n================================================================`);
  console.log(`  ZUSAMMENFASSUNG SVG-AUDIT`);
  console.log(`  Geprüfte SVGs: ${allSvgs.length}`);
  console.log(`  SVGs mit Auffälligkeiten: ${defectCount}`);
  console.log(`================================================================\n`);
  process.exit(0);
}

main().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
