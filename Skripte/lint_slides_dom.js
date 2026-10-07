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

  // Find font sizes in SVG
  const fontMatches = content.match(/font-size:\s*([0-9.]+)(px|pt)?|font-size=["']([0-9.]+)(px|pt)?["']/gi) || [];
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

  const deckDir = path.dirname(markdownPath);
  const deckName = path.basename(deckDir);
  // Compile HTML directly in deck directory so that relative paths (./Diagramme/, etc.) resolve properly
  const tempHtml = path.join(deckDir, '.tmp_lint.html');

  const themePath = path.resolve('Themen/fhooe.css');
  const cmd = `npx @marp-team/marp-cli "${markdownPath}" --theme-set "${themePath}" --html --no-stdin -o "${tempHtml}"`;
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
      const isAdvancedBg = sec.hasAttribute('data-marpit-advanced-background');
      if (isAdvancedBg) return;

      const pagination = sec.getAttribute('data-marpit-pagination') || `${idx + 1}`;
      const clientHeight = sec.clientHeight;
      const scrollHeight = sec.scrollHeight;
      const clientWidth = sec.clientWidth;
      const scrollWidth = sec.scrollWidth;

      // Find top of footer relative to section
      const footer = sec.querySelector('footer');
      const footerTop = footer ? (footer.getBoundingClientRect().top - sec.getBoundingClientRect().top) : clientHeight;

      // Find lowest content edge
      let contentBottom = 0;
      Array.from(sec.children).forEach(child => {
        if (child.tagName === 'HEADER' || child.tagName === 'FOOTER') return;
        const rect = child.getBoundingClientRect();
        const bottomRel = rect.bottom - sec.getBoundingClientRect().top;
        if (bottomRel > contentBottom) {
          contentBottom = bottomRel;
        }
      });

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
        contentBottom,
        footerTop,
        images
      });
    });

    return results;
  });

  await page.close();

  // Remove temporary HTML file
  try {
    if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);
  } catch (e) {}

  // Process and analyze slides
  const slides = [];
  for (const s of rawSlides) {
    const vOverflow = Math.max(0, s.scrollHeight - s.clientHeight);
    const footerCollision = Math.max(0, s.contentBottom - s.footerTop);
    const effectiveVOverflow = Math.max(vOverflow, footerCollision);

    const hOverflow = Math.max(0, s.scrollWidth - s.clientWidth);

    const svgIssues = [];
    for (const img of s.images) {
      if (img.src && (img.src.endsWith('.svg') || img.src.includes('.svg?'))) {
        const cleanSrc = decodeURIComponent(img.src.split('?')[0]);
        const absSvgPath = path.resolve(deckDir, cleanSrc);
        const metrics = parseSvgMetrics(absSvgPath);
        if (metrics && metrics.viewBoxWidth) {
          const scale = img.renderedWidth / metrics.viewBoxWidth;
          const effectiveFont = metrics.baseFont * scale;
          if (effectiveFont < minFontSize && img.renderedWidth > 0) {
            svgIssues.push({
              src: cleanSrc,
              viewBoxWidth: metrics.viewBoxWidth,
              viewBoxHeight: metrics.viewBoxHeight,
              aspectRatio: metrics.aspectRatio ? metrics.aspectRatio.toFixed(2) : 'N/A',
              renderedWidth: Math.round(img.renderedWidth),
              renderedHeight: Math.round(img.renderedHeight),
              scale: scale.toFixed(3),
              baseFont: metrics.baseFont,
              effectiveFont: effectiveFont.toFixed(1)
            });
          }
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
      svgIssues,
      hasError: hasVOverflow || hasHOverflow || hasSvgIssues,
      hasVOverflow,
      hasHOverflow,
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
  const target = args[0] || 'all';

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
    const res = await lintSlideDeck(deck, browser);
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
        if (err.hasSvgIssues) {
          err.svgIssues.forEach(s => {
            issues.push(`SVG Schrift zu klein: ${path.basename(s.src)} (${s.effectiveFont}px < 11.5px, Scale: ${s.scale}, Aspect: ${s.aspectRatio}:1)`);
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
