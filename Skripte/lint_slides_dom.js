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
const { lintSectionDeck } = require('./lint_section_slides');

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

function getPuppeteer() {
  const customPath = path.join(process.env.APPDATA || 'C:/Users/P28500/AppData/Roaming', 'npm/node_modules/@mermaid-js/mermaid-cli/node_modules/puppeteer');
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
  const checkImages = options.checkImages || false;
  const minImageWidthRatio = options.minImageWidthRatio || 0.95;

  const deckDir = path.dirname(markdownPath);
  const deckName = path.basename(deckDir);
  // Compile HTML directly in deck directory so that relative paths (./Diagramme/, etc.) resolve properly
  const tempHtml = path.join(deckDir, '.tmp_lint.html');

  const themePath = path.resolve('Themen/fhooe.css');
  const marpBin = process.platform === 'win32' && fs.existsSync(path.join(process.env.APPDATA || '', 'npm', 'marp.cmd'))
    ? `"${path.join(process.env.APPDATA || '', 'npm', 'marp.cmd')}"`
    : 'npx --yes @marp-team/marp-cli';
  const cmd = `${marpBin} "${markdownPath}" --theme-set "${themePath}" --html --no-stdin -o "${tempHtml}"`;
  execSync(cmd, { stdio: 'pipe' });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

  const fileUrl = 'file:///' + tempHtml.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Ensure all images and fonts are loaded and layout has settled
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(imgs.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));
    await new Promise(r => setTimeout(r, 120));
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
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

      const elementGaps = [];
      const isVisibleBox = (el) => {
        if (el.tagName === 'PRE' || el.tagName === 'MARP-PRE' || el.tagName === 'BLOCKQUOTE') return true;
        if (el.tagName === 'DIV' && el.classList.contains('columns')) {
          return sec.classList.contains('showcase') || sec.classList.contains('homework');
        }
        return false;
      };
      const collectGaps = (parent, scope) => {
        const visible = Array.from(parent.children).filter(c => c.tagName !== 'HEADER' && c.tagName !== 'FOOTER' && c.getBoundingClientRect().height > 0);
        for (let i = 0; i < visible.length - 1; i++) {
          const a = visible[i];
          const b = visible[i + 1];
          const gap = Math.round(b.getBoundingClientRect().top - a.getBoundingClientRect().bottom);
          const expected = (isVisibleBox(a) && isVisibleBox(b)) ? 22 : 16;
          elementGaps.push({
            scope,
            pair: `${a.tagName}${a.className ? '.' + String(a.className).split(/\s+/)[0] : ''} -> ${b.tagName}${b.className ? '.' + String(b.className).split(/\s+/)[0] : ''}`,
            gap,
            expected
          });
        }
      };
      collectGaps(sec, 'slide');
      sec.querySelectorAll('div.columns > div').forEach((col, cIdx) => {
        collectGaps(col, `col${cIdx + 1}`);
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

      // Check text color harmony against effective local background color on highlight slides
      const colorIssues = [];
      const parseRgba = (str) => {
        const m = str && str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i);
        if (!m) return null;
        return { r: parseFloat(m[1]), g: parseFloat(m[2]), b: parseFloat(m[3]), a: m[4] !== undefined ? parseFloat(m[4]) : 1 };
      };
      const getEffectiveBg = (el) => {
        let cur = el;
        while (cur && cur.tagName !== 'HTML') {
          const bg = parseRgba(window.getComputedStyle(cur).backgroundColor);
          if (bg && bg.a > 0.05) return bg;
          cur = cur.parentElement;
        }
        return { r: 255, g: 255, b: 255, a: 1 };
      };
      const isHighlight = ['showcase', 'recap', 'outlook', 'summary', 'homework', 'activity', 'solution'].some(c => sec.classList.contains(c));
      if (isHighlight) {
        const textEls = sec.querySelectorAll('header, footer, blockquote, p, li, h1, h2, h3, h4');
        textEls.forEach(el => {
          if (!el.textContent || !el.textContent.trim()) return;
          if (el.getBoundingClientRect().height <= 0) return;
          const fg = parseRgba(window.getComputedStyle(el).color);
          const bg = getEffectiveBg(el);
          if (!fg || !bg) return;
          const bgChroma = Math.max(bg.r, bg.g, bg.b) - Math.min(bg.r, bg.g, bg.b);
          const fgChroma = Math.max(fg.r, fg.g, fg.b) - Math.min(fg.r, fg.g, fg.b);
          const fgLum = (fg.r + fg.g + fg.b) / 3;
          // If local background is tinted (chroma >= 8, e.g., #f0f6ff, #f0fdf4, #fffbeb, #f1f5f9),
          // forbid mid/light neutral gray text (fgChroma <= 6 && fgLum > 55)
          if (bgChroma >= 8 && fgChroma <= 6 && fgLum > 55) {
            colorIssues.push({
              tag: el.tagName,
              fg: `rgb(${Math.round(fg.r)},${Math.round(fg.g)},${Math.round(fg.b)})`,
              bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`,
              sample: el.textContent.trim().slice(0, 30)
            });
          }
        });
      }

      const heading = sec.querySelector('h1, h2, h3');
      let title = '';
      if (heading) {
        title = (heading.textContent || heading.innerText || '').trim().replace(/\s+/g, ' ');
      }

      const h1h2 = sec.querySelector('h1, h2');
      const isOpener = !!h1h2;

      results.push({
        sectionIndex: idx + 1,
        pagination,
        title,
        isOpener,
        clientHeight,
        scrollHeight,
        clientWidth,
        scrollWidth,
        headerBottom,
        footerTop,
        contentTop,
        contentBottom,
        elementGaps,
        colorIssues,
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

    const availableHeight = Math.max(1, s.footerTop - s.headerBottom);
    const contentHeight = s.contentBottom > s.contentTop ? (s.contentBottom - s.contentTop) : 0;
    const fillRatio = contentHeight / availableHeight;
    const minFillRatio = options.minFillRatio !== undefined ? options.minFillRatio : 0.80;
    const hasUnderfill = !s.isOpener && minFillRatio > 0 && fillRatio < minFillRatio;

    const gapTolerance = options.gapTolerance !== undefined ? options.gapTolerance : 1;
    const gapIssues = (s.elementGaps || []).filter(g => Math.abs(g.gap - (g.expected || 16)) > gapTolerance);
    const hasGapError = gapIssues.length > 0;
    const colorIssues = s.colorIssues || [];
    const hasColorError = colorIssues.length > 0;

    slides.push({
      ...s,
      effectiveVOverflow: Math.round(effectiveVOverflow),
      hOverflow: Math.round(hOverflow),
      headerMargin: Math.round(headerMargin),
      footerMargin: Math.round(footerMargin),
      fillRatio,
      svgIssues,
      gapIssues,
      colorIssues,
      hasError: hasVOverflow || hasHOverflow || hasHeaderCollision || hasFooterCollision || hasSvgIssues || hasUnderfill || hasGapError || hasColorError,
      hasVOverflow,
      hasHOverflow,
      hasHeaderCollision,
      hasFooterCollision,
      hasSvgIssues,
      hasUnderfill,
      hasGapError,
      hasColorError
    });
  }

  // 3. Schema- und BildprÃ¼fung fÃ¼r Kapitel- und AbschnittsÃ¼bersichten
  if (!options.skipSchema) {
    const sectionLint = lintSectionDeck(markdownPath);
    if (sectionLint && sectionLint.issues && sectionLint.issues.length > 0) {
      for (const iss of sectionLint.issues) {
        let targetSlide = null;
        if (iss.slideNum > 0 && iss.slideNum <= slides.length) {
          targetSlide = slides[iss.slideNum - 1];
        } else if (slides.length > 0) {
          targetSlide = slides[0];
        }

        if (targetSlide) {
          targetSlide.schemaIssues = targetSlide.schemaIssues || [];
          targetSlide.schemaIssues.push(iss.message);
          targetSlide.hasError = true;
          targetSlide.hasSchemaIssues = true;
        }
      }
    }
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
  let skipSchema = false;
  let checkImages = false;
  let minImageWidthRatio = 0.95;
  let minFillRatio = 0.80;
  let reportFill = false;
  let reportGaps = false;

  args.forEach(arg => {
    if (arg.startsWith('--min-font-size=')) {
      minFontSize = parseFloat(arg.split('=')[1]);
    } else if (arg.startsWith('--min-header-margin=')) {
      minHeaderMargin = parseFloat(arg.split('=')[1]);
    } else if (arg.startsWith('--min-footer-margin=')) {
      minFooterMargin = parseFloat(arg.split('=')[1]);
    } else if (arg === '--skip-schema') {
      skipSchema = true;
    } else if (arg === '--check-images') {
      checkImages = true;
    } else if (arg.startsWith('--min-image-width=')) {
      minImageWidthRatio = parseFloat(arg.split('=')[1]);
      checkImages = true;
    } else if (arg.startsWith('--min-fill=')) {
      minFillRatio = parseFloat(arg.split('=')[1]);
    } else if (arg === '--report-fill') {
      reportFill = true;
    } else if (arg === '--report-gaps') {
      reportGaps = true;
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
    const kapitelDir = path.resolve('Kapitel');
    const entries = fs.readdirSync(kapitelDir).sort();
    entries.forEach(e => {
      const p = path.join(kapitelDir, e, 'Folien', 'Folien.md');
      if (fs.existsSync(p)) decks.push(p);
    });
  } else if (fs.existsSync(target)) {
    decks.push(path.resolve(target));
  } else {
    // Try matching chapter number
    const kapitelDir = path.resolve('Kapitel');
    const match = fs.readdirSync(kapitelDir).find(d => d.startsWith(target));
    if (match) {
      decks.push(path.join(kapitelDir, match, 'Folien', 'Folien.md'));
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
    const dDir = path.dirname(deck);
    const deckName = path.basename(dDir) === 'Folien' ? path.basename(path.dirname(dDir)) : path.basename(dDir);
    process.stdout.write(`Inspecting ${deckName} ... `);
    const res = await lintSlideDeck(deck, browser, { minFontSize, minHeaderMargin, minFooterMargin, skipSchema, checkImages, minImageWidthRatio, minFillRatio });
    allResults.push(res);
    grandTotalSlides += res.totalSlides;
    grandTotalErrors += res.errorSlides.length;

    if (reportFill) {
      console.log(`\n  [Fill-Report ${deckName}]`);
      for (const sl of res.slides) {
        if (!sl.isOpener) {
          console.log(`    Folie ${String(sl.sectionIndex).padStart(2, '0')} (${Math.round(sl.fillRatio * 100)}%): ${sl.title}`);
        }
      }
    }
    if (reportGaps) {
      console.log(`\n  [Gap-Report ${deckName}]`);
      for (const sl of res.slides) {
        if (sl.elementGaps && sl.elementGaps.length > 0) {
          const gapStr = sl.elementGaps.map(g => `${g.pair}: ${g.gap}px`).join(' | ');
          console.log(`    Folie ${sl.pagination} [${sl.title || 'Ohne'}]: ${gapStr}`);
        }
      }
    }

    if (res.errorSlides.length === 0) {
      console.log(`âœ“ OK (${res.totalSlides} Folien sauber)`);
    } else {
      console.log(`âœ— ${res.errorSlides.length} Problem-Folien gefunden!`);
      for (const err of res.errorSlides) {
        const issues = [];
        if (err.hasVOverflow) issues.push(`Vertikaler Ãœberlauf: +${err.effectiveVOverflow}px`);
        if (err.hasHOverflow) issues.push(`Horizontaler Ãœberlauf: +${err.hOverflow}px`);
        if (err.hasHeaderCollision) {
          if (err.headerMargin < 0) {
            issues.push(`Kopfzeilen-Ãœberdeckung: Ãœberlappung um ${Math.abs(err.headerMargin)}px`);
          } else {
            issues.push(`Kopfzeilen-Abstand zu gering: ${err.headerMargin}px (Mindestabstand: ${minHeaderMargin}px)`);
          }
        }
        if (err.hasFooterCollision) {
          if (err.footerMargin < 0) {
            issues.push(`FuÃŸzeilen-Ãœberdeckung: Ãœberlappung um ${Math.abs(err.footerMargin)}px`);
          } else {
            issues.push(`FuÃŸzeilen-Abstand zu gering: ${err.footerMargin}px (Mindestabstand: ${minFooterMargin}px)`);
          }
        }
        if (err.hasSvgIssues) {
          err.svgIssues.forEach(s => {
            const detail = s.sampleSmallText ? ` [z.B. "${s.sampleSmallText.text}": ${s.sampleSmallText.effectivePx}px, deklariert: ${s.sampleSmallText.declFont}px]` : '';
            issues.push(`SVG Schrift zu klein: ${path.basename(s.src)} (${s.minFont}px < ${minFontSize}px, Box: ${s.renderedBox})${detail}`);
          });
        }
        if (err.schemaIssues && err.schemaIssues.length > 0) {
          err.schemaIssues.forEach(msg => issues.push(`Schema-Fehler: ${msg}`));
        }
        if (err.hasUnderfill) {
          issues.push(`Folie zu leer: vertikale Auslastung nur ${Math.round(err.fillRatio * 100)}% (< ${Math.round(minFillRatio * 100)}%)`);
        }
        if (err.hasGapError) {
          err.gapIssues.forEach(g => issues.push(`Vertikaler Gap inkonsistent (${g.scope}: ${g.pair} = ${g.gap}px, erwartet ${g.expected || 16}px)`));
        }
        if (err.hasColorError) {
          err.colorIssues.forEach(c => issues.push(`Ungetönter Grauton auf Highlight-Hintergrund (${c.tag} "${c.sample}..." hat ${c.fg} auf ${c.bg})`));
        }
        console.log(`    - Folie ${err.pagination} [${err.title || 'Ohne Titel'}]: ${issues.join(' | ')}`);
      }
    }
  }

  await browser.close();

  console.log(`\n================================================================`);
  console.log(`  ZUSAMMENFASSUNG`);
  console.log(`  GeprÃ¼fte FoliensÃ¤tze: ${decks.length}`);
  console.log(`  GeprÃ¼fte Folien gesamt: ${grandTotalSlides}`);
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
