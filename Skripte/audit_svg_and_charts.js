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

    // 5. Unshielded Text-Line Collisions (Geometry lines intersecting text without opaque background)
    texts.forEach(t => {
      const rect = t.rect;
      const fractions = [0.15, 0.3, 0.5, 0.7, 0.85];
      let lineHit = false;

      for (const fx of fractions) {
        for (const fy of [0.3, 0.5, 0.7]) {
          const pt = { x: rect.left + rect.width * fx, y: rect.top + rect.height * fy };
          const els = document.elementsFromPoint(pt.x, pt.y);
          const lineIndex = els.findIndex(el => el.tagName === 'line' || (el.tagName === 'path' && el.getAttribute('stroke') && (!el.getAttribute('fill') || el.getAttribute('fill') === 'none')));
          if (lineIndex !== -1) {
            const textIndex = els.indexOf(t.el);
            let shielded = false;
            for (let i = Math.min(textIndex, lineIndex) + 1; i < Math.max(textIndex, lineIndex); i++) {
              const el = els[i];
              const style = window.getComputedStyle(el);
              const fill = style.fill;
              if (fill && fill !== 'none' && fill !== 'transparent' && style.opacity !== '0' && style.fillOpacity !== '0') {
                shielded = true;
                break;
              }
            }
            if (!shielded) {
              lineHit = true;
              break;
            }
          }
        }
        if (lineHit) break;
      }

      if (lineHit) {
        issues.push({
          type: 'TEXT_LINE_COLLISION',
          message: `Unshielded line intersects text "${t.text.slice(0, 25)}"`
        });
      }
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
  const targetDir = args[0] || 'Folien';

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
