/**
 * Automated MARP DOM Layout & SVG Font Linter
 * 
 * Verifies that no slide in the curriculum suffers from:
 * 1. Vertical text/content overflow (scrollHeight > clientHeight or footer collision)
 * 2. Horizontal clipping (scrollWidth > clientWidth)
 * 3. Scaled-down, unreadable SVG diagram fonts (effective font size < 11.5px)
 * 
 * Uses headless Chromium (Puppeteer) to inspect the actual rendered DOM.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

function getPuppeteer() {
  const customPath = 'C:/Users/P28500/AppData/Roaming/npm/node_modules/@mermaid-js/mermaid-cli/node_modules/puppeteer';
  if (fs.existsSync(customPath)) {
    return require(customPath);
  }
  try {
    return require('puppeteer');
  } catch (e) {
    try {
      return require('puppeteer-core');
    } catch (e2) {
      console.error('Puppeteer not found. Please install puppeteer.');
      process.exit(1);
    }
  }
}

function getBrowserExecutable() {
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

function parseSvgMetrics(svgPath) {
  if (!fs.existsSync(svgPath)) return null;
  const content = fs.readFileSync(svgPath, 'utf8');

  // Match viewBox="x y w h"
  const vbMatch = content.match(/viewBox=["']\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)["']/i);
  let vbWidth = null;
  let vbHeight = null;
  if (vbMatch) {
    vbWidth = parseFloat(vbMatch[3]);
    vbHeight = parseFloat(vbMatch[4]);
  } else {
    const wMatch = content.match(/<svg[^>]*\bwidth=["']([0-9.]+)(?:px)?["']/i);
    const hMatch = content.match(/<svg[^>]*\bheight=["']([0-9.]+)(?:px)?["']/i);
    if (wMatch && hMatch) {
      vbWidth = parseFloat(wMatch[1]);
      vbHeight = parseFloat(hMatch[1]);
    }
  }

  // Find font sizes in SVG (excluding unrendered tooltip CSS rules)
  const cleanContent = content.replace(/div\.mermaidTooltip\s*\{[^}]*\}/gi, '');
  const fontMatches = cleanContent.match(/font-size:\s*([0-9.]+)(px|pt)?|font-size=["']([0-9.]+)(px|pt)?["']/gi) || [];
  const sizes = [];
  fontMatches.forEach(m => {
    const num = parseFloat(m.replace(/[^0-9.]/g, ''));
    if (!isNaN(num) && num > 0) sizes.push(num);
  });

  const hasText = /<text\b/i.test(content);
  if (!hasText && sizes.length === 0) {
    return null;
  }

  // Most diagrams use 14px or 16px as standard node font
  const baseFont = sizes.length > 0 ? Math.min(...sizes) : 14;

  return {
    viewBoxWidth: vbWidth,
    viewBoxHeight: vbHeight,
    aspectRatio: vbWidth && vbHeight ? (vbWidth / vbHeight) : null,
    baseFont
  };
}

async function lintSlideDeck(markdownPath, browser, options = {}) {
  const minFontSize = options.minFontSize || 11.5;
  const maxOverflow = options.maxOverflow || 2; // Tolerance 2px for subpixel layout
  const minHeaderMargin = options.minHeaderMargin !== undefined ? options.minHeaderMargin : 12;
  const minFooterMargin = options.minFooterMargin !== undefined ? options.minFooterMargin : 12;

  const deckDir = path.dirname(markdownPath);
  const deckName = path.basename(deckDir);
  // Compile HTML directly in deck directory so that relative paths (./Diagramme/, etc.) resolve properly
  const tempHtml = path.join(deckDir, '.tmp_lint.html');

  const themePath = path.resolve('Themen/fhooe.css');
  const marpBin = process.platform === 'win32' && fs.existsSync(path.join(process.env.APPDATA || '', 'npm', 'marp.cmd'))
    ? `"${path.join(process.env.APPDATA || '', 'npm', 'marp.cmd')}"`
    : 'marp';
  const cmd = `${marpBin} "${markdownPath}" --theme-set "${themePath}" --html --no-stdin -o "${tempHtml}"`;
  execSync(cmd, { stdio: 'pipe' });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

  const fileUrl = 'file:///' + tempHtml.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Ensure all images are loaded
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(imgs.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));
  });

  // Evaluate DOM
  const rawSlides = await page.evaluate(() => {
    const results = [];
    const sections = Array.from(document.querySelectorAll('section'));

    sections.forEach((sec, idx) => {
      const bgType = sec.getAttribute('data-marpit-advanced-background');
      if (bgType === 'background' || bgType === 'pseudo') return;

      const pagination = sec.getAttribute('data-marpit-pagination') || `${idx + 1}`;
      const clientHeight = sec.clientHeight;
      const scrollHeight = sec.scrollHeight;
      const clientWidth = sec.clientWidth;
      const scrollWidth = sec.scrollWidth;

      // Find bottom of header relative to section
      const header = sec.querySelector('header');
      const headerBottom = header ? (header.getBoundingClientRect().bottom - sec.getBoundingClientRect().top) : 0;

      // Find top of footer relative to section
      const footer = sec.querySelector('footer');
      const footerTop = footer ? (footer.getBoundingClientRect().top - sec.getBoundingClientRect().top) : clientHeight;

      // Find highest and lowest content edge
      const contentChildren = Array.from(sec.children).filter(child => child.tagName !== 'HEADER' && child.tagName !== 'FOOTER');
      let contentTop = clientHeight;
      let contentBottom = 0;

      contentChildren.forEach(child => {
        const rect = child.getBoundingClientRect();
        const topRel = rect.top - sec.getBoundingClientRect().top;
        const bottomRel = rect.bottom - sec.getBoundingClientRect().top;
        if (topRel < contentTop) contentTop = topRel;
        if (bottomRel > contentBottom) contentBottom = bottomRel;
      });

      if (contentChildren.length === 0) {
        contentTop = 0;
        contentBottom = 0;
      }

      // Images in section
      const images = Array.from(sec.querySelectorAll('img')).map(img => {
        const rect = img.getBoundingClientRect();
        return {
          src: img.getAttribute('src'),
          renderedWidth: rect.width,
          renderedHeight: rect.height,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        };
      });

      const heading = sec.querySelector('h1, h2, h3');
      let title = '';
      if (heading) {
        title = (heading.textContent || heading.innerText || '').trim().replace(/\s+/g, ' ');
      }

      results.push({
        sectionIndex: idx + 1,
        pagination,
        title,
        clientHeight,
        scrollHeight,
        clientWidth,
        scrollWidth,
        headerBottom,
        footerTop,
        contentTop,
        contentBottom,
        images
      });
    });

    return results;
  });

  // Inspect all SVG images directly in the browser DOM to measure true effective font sizes
  const svgInspectionMap = new Map();
  for (const s of rawSlides) {
    for (const img of s.images) {
      if (img.src && (img.src.endsWith('.svg') || img.src.includes('.svg?'))) {
        const cleanSrc = decodeURIComponent(img.src.split('?')[0]);
        const absSvgPath = path.resolve(deckDir, cleanSrc);
        const cacheKey = `${cleanSrc}__${Math.round(img.renderedWidth)}x${Math.round(img.renderedHeight)}`;
        if (!svgInspectionMap.has(cacheKey) && fs.existsSync(absSvgPath) && img.renderedWidth > 0 && img.renderedHeight > 0) {
          const svgText = fs.readFileSync(absSvgPath, 'utf8');
          const evalResult = await page.evaluate(({ svgText, w, h, minSize }) => {
            let container = document.getElementById('__svg_eval_container');
            if (!container) {
              container = document.createElement('div');
              container.id = '__svg_eval_container';
              container.style.position = 'fixed';
              container.style.left = '0';
              container.style.top = '0';
              container.style.zIndex = '-9999';
              container.style.pointerEvents = 'none';
              container.style.visibility = 'hidden';
              document.body.appendChild(container);
            }
            container.style.width = w + 'px';
            container.style.height = h + 'px';
            container.innerHTML = svgText;

            const svg = container.querySelector('svg');
            if (!svg) return null;
            svg.style.width = '100%';
            svg.style.height = '100%';

            const textNodes = Array.from(svg.querySelectorAll('text, tspan'));
            const textDetails = [];

            textNodes.forEach(t => {
              const str = (t.textContent || '').trim();
              if (!str) return;
              if (t.tagName.toLowerCase() === 'text' && t.querySelector('tspan')) return;

              const ctm = t.getScreenCTM();
              const cs = window.getComputedStyle(t);
              const declFont = parseFloat(cs.fontSize) || 0;
              const scaleY = ctm ? Math.abs(ctm.d) : 1;
              const effectivePx = declFont * scaleY;

              if (declFont > 0 && effectivePx > 0) {
                textDetails.push({
                  text: str.length > 28 ? str.substring(0, 25) + '...' : str,
                  declFont: Math.round(declFont * 10) / 10,
                  effectivePx: Math.round(effectivePx * 10) / 10
                });
              }
            });

            if (textDetails.length === 0) return { hasText: false, allSmallTexts: [] };

            const minEff = textDetails.reduce((min, cur) => cur.effectivePx < min.effectivePx ? cur : min, textDetails[0]);
            const smallTexts = textDetails.filter(t => t.effectivePx < minSize);

            return {
              hasText: true,
              minFont: minEff.effectivePx,
              sampleSmallText: minEff,
              allSmallTexts: smallTexts
            };
          }, { svgText, w: img.renderedWidth, h: img.renderedHeight, minSize: minFontSize });

          svgInspectionMap.set(cacheKey, evalResult);
        }
      }
    }
  }

  await page.close();

  // Remove temporary HTML file
  try {
    if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);
  } catch (e) {}

  // Process and analyze slides
  const slides = [];
  for (const s of rawSlides) {
    const vOverflow = Math.max(0, s.scrollHeight - s.clientHeight);
    const hOverflow = Math.max(0, s.scrollWidth - s.clientWidth);

    const headerMargin = s.contentTop > 0 ? (s.contentTop - s.headerBottom) : minHeaderMargin;
    const footerMargin = s.contentBottom > 0 ? (s.footerTop - s.contentBottom) : minFooterMargin;

    const hasHeaderCollision = headerMargin < minHeaderMargin;
    const hasFooterCollision = footerMargin < minFooterMargin;
    const effectiveVOverflow = Math.max(vOverflow, Math.max(0, -footerMargin));

    const svgIssues = [];
    for (const img of s.images) {
      if (img.src && (img.src.endsWith('.svg') || img.src.includes('.svg?'))) {
        const cleanSrc = decodeURIComponent(img.src.split('?')[0]);
        const cacheKey = `${cleanSrc}__${Math.round(img.renderedWidth)}x${Math.round(img.renderedHeight)}`;
        const inspection = svgInspectionMap.get(cacheKey);
        if (inspection && inspection.hasText && inspection.allSmallTexts && inspection.allSmallTexts.length > 0) {
          svgIssues.push({
            src: cleanSrc,
            renderedBox: `${Math.round(img.renderedWidth)}x${Math.round(img.renderedHeight)}`,
            minFont: inspection.minFont,
            sampleSmallText: inspection.allSmallTexts[0],
            smallCount: inspection.allSmallTexts.length
          });
        }
      }
    }

    const hasVOverflow = effectiveVOverflow > maxOverflow;
    const hasHOverflow = hOverflow > maxOverflow;
    const hasSvgIssues = svgIssues.length > 0;

    slides.push({
      ...s,
      effectiveVOverflow: Math.round(effectiveVOverflow),
      hOverflow: Math.round(hOverflow),
      headerMargin: Math.round(headerMargin),
      footerMargin: Math.round(footerMargin),
      svgIssues,
      hasError: hasVOverflow || hasHOverflow || hasHeaderCollision || hasFooterCollision || hasSvgIssues,
      hasVOverflow,
      hasHOverflow,
      hasHeaderCollision,
      hasFooterCollision,
      hasSvgIssues
    });
  }

  return {
    markdownPath,
    deckName,
    totalSlides: slides.length,
    slides,
    errorSlides: slides.filter(s => s.hasError)
  };
}

async function main() {
  const args = process.argv.slice(2);
  let target = 'all';
  let minFontSize = 11.5;

  let minHeaderMargin = 12;
  let minFooterMargin = 12;

  args.forEach(arg => {
    if (arg.startsWith('--min-font-size=')) {
      minFontSize = parseFloat(arg.split('=')[1]);
    } else if (arg.startsWith('--min-header-margin=')) {
      minHeaderMargin = parseFloat(arg.split('=')[1]);
    } else if (arg.startsWith('--min-footer-margin=')) {
      minFooterMargin = parseFloat(arg.split('=')[1]);
    } else if (!arg.startsWith('--')) {
      target = arg;
    }
  });

  const puppeteer = getPuppeteer();
  const execPath = getBrowserExecutable();
  console.log(`Launching Headless Chrome: ${execPath || 'Default Puppeteer'}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: execPath,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const decks = [];
  if (target === 'all') {
    const folienDir = path.resolve('Folien');
    const entries = fs.readdirSync(folienDir).sort();
    entries.forEach(e => {
      const p = path.join(folienDir, e, 'Folien.md');
      if (fs.existsSync(p)) decks.push(p);
    });
  } else if (fs.existsSync(target)) {
    decks.push(path.resolve(target));
  } else {
    // Try matching chapter number
    const folienDir = path.resolve('Folien');
    const match = fs.readdirSync(folienDir).find(d => d.startsWith(target));
    if (match) {
      decks.push(path.join(folienDir, match, 'Folien.md'));
    } else {
      console.error(`Target not found: ${target}`);
      process.exit(1);
    }
  }

  console.log(`\n================================================================`);
  console.log(`  AUTOMATED MARP DOM & SVG LAYOUT LINTER`);
  console.log(`  Inspecting ${decks.length} slide deck(s) in 1280x720 Native Viewport`);
  console.log(`================================================================\n`);

  let grandTotalSlides = 0;
  let grandTotalErrors = 0;
  const allResults = [];

  for (const deck of decks) {
    const deckName = path.basename(path.dirname(deck));
    process.stdout.write(`Inspecting ${deckName} ... `);
    const res = await lintSlideDeck(deck, browser, { minFontSize, minHeaderMargin, minFooterMargin });
    allResults.push(res);
    grandTotalSlides += res.totalSlides;
    grandTotalErrors += res.errorSlides.length;

    if (res.errorSlides.length === 0) {
      console.log(`✓ OK (${res.totalSlides} Folien sauber)`);
    } else {
      console.log(`✗ ${res.errorSlides.length} Problem-Folien gefunden!`);
      for (const err of res.errorSlides) {
        const issues = [];
        if (err.hasVOverflow) issues.push(`Vertikaler Überlauf: +${err.effectiveVOverflow}px`);
        if (err.hasHOverflow) issues.push(`Horizontaler Überlauf: +${err.hOverflow}px`);
        if (err.hasHeaderCollision) {
          if (err.headerMargin < 0) {
            issues.push(`Kopfzeilen-Überdeckung: Überlappung um ${Math.abs(err.headerMargin)}px`);
          } else {
            issues.push(`Kopfzeilen-Abstand zu gering: ${err.headerMargin}px (Mindestabstand: ${minHeaderMargin}px)`);
          }
        }
        if (err.hasFooterCollision) {
          if (err.footerMargin < 0) {
            issues.push(`Fußzeilen-Überdeckung: Überlappung um ${Math.abs(err.footerMargin)}px`);
          } else {
            issues.push(`Fußzeilen-Abstand zu gering: ${err.footerMargin}px (Mindestabstand: ${minFooterMargin}px)`);
          }
        }
        if (err.hasSvgIssues) {
          err.svgIssues.forEach(s => {
            const detail = s.sampleSmallText ? ` [z.B. "${s.sampleSmallText.text}": ${s.sampleSmallText.effectivePx}px, deklariert: ${s.sampleSmallText.declFont}px]` : '';
            issues.push(`SVG Schrift zu klein: ${path.basename(s.src)} (${s.minFont}px < ${minFontSize}px, Box: ${s.renderedBox})${detail}`);
          });
        }
        console.log(`    - Folie ${err.pagination} [${err.title || 'Ohne Titel'}]: ${issues.join(' | ')}`);
      }
    }
  }

  await browser.close();

  console.log(`\n================================================================`);
  console.log(`  ZUSAMMENFASSUNG`);
  console.log(`  Geprüfte Foliensätze: ${decks.length}`);
  console.log(`  Geprüfte Folien gesamt: ${grandTotalSlides}`);
  console.log(`  Gefundene Problem-Folien: ${grandTotalErrors}`);
  console.log(`================================================================\n`);

  if (grandTotalErrors > 0) {
    console.error(`Layout-Validierung FEHLGESCHLAGEN. Bitte die oben genannten Folien korrigieren.\n`);
    process.exit(1);
  } else {
    console.log(`Layout-Validierung ERFOLGREICH! Alle Folien passen perfekt auf den Bildschirm und alle Grafiken sind lesbar.\n`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal error during linting:', err);
  process.exit(1);
});
