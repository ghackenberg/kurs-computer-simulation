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
  const minHeaderMargin = options.minHeaderMargin !== undefined ? options.minHeaderMargin : 14;
  const minFooterMargin = options.minFooterMargin !== undefined ? options.minFooterMargin : 14;
  const checkImages = options.checkImages || false;
  const minImageWidthRatio = options.minImageWidthRatio || 0.95;

  const deckDir = path.dirname(markdownPath);
  const deckName = path.basename(deckDir);
  const isAppendix = /^Folien_Anhang_.*\.md$/i.test(path.basename(markdownPath));
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

  // Check Full-Bleed background images: landscape (~16:9) aspect ratio & left-side luminance contrast
  const fullBleedBgMeta = await page.evaluate(async () => {
    const bgSecs = Array.from(document.querySelectorAll('section[data-marpit-advanced-background="background"]:not([data-marpit-advanced-background-split])'));
    const list = [];
    for (const bgSec of bgSecs) {
      const fig = bgSec.querySelector('figure');
      if (!fig) continue;
      const bgImg = getComputedStyle(fig).backgroundImage || fig.style.backgroundImage || '';
      const m = bgImg.match(/url\(["']?([^"')]+)["']?\)/);
      if (!m) continue;
      const url = m[1];
      const pag = bgSec.getAttribute('data-marpit-pagination') || '';
      const isTitle = bgSec.classList.contains('title');
      const dims = await new Promise(resolve => {
        const im = new Image();
        im.onload = () => resolve({ w: im.naturalWidth, h: im.naturalHeight });
        im.onerror = () => resolve(null);
        im.src = url;
      });
      list.push({ pagination: pag, url, isTitle, w: dims ? dims.w : 0, h: dims ? dims.h : 0 });
    }
    return list;
  });

  const fullBleedBgIssues = [];
  for (const bg of fullBleedBgMeta) {
    if (bg.h > 0 && (bg.w / bg.h) < 1.5) {
      fullBleedBgIssues.push({
        pagination: bg.pagination,
        url: bg.url,
        message: `Full-Bleed ![bg] erfordert Querformat (>= 1.5:1), hat aber ${bg.w}x${bg.h} (${(bg.w / bg.h).toFixed(2)}:1).`
      });
    }
    let localPath = null;
    try {
      if (bg.url.startsWith('file:///')) {
        localPath = decodeURIComponent(bg.url.replace(/^file:\/\/\//, ''));
      } else if (!bg.url.startsWith('data:')) {
        localPath = path.resolve(deckDir, decodeURIComponent(bg.url));
      }
    } catch (e) { localPath = null; }
    if (localPath && fs.existsSync(localPath)) {
      const ext = path.extname(localPath).toLowerCase().replace('.', '') || 'jpeg';
      const mime = ext === 'jpg' ? 'jpeg' : ext;
      const dataUri = `data:image/${mime};base64,${fs.readFileSync(localPath).toString('base64')}`;
      const leftLum = await page.evaluate((src) => new Promise(resolve => {
        const im = new Image();
        im.onload = () => {
          try {
            const c = document.createElement('canvas');
            c.width = 64;
            c.height = 36;
            const ctx = c.getContext('2d');
            ctx.drawImage(im, 0, 0, 64, 36);
            const data = ctx.getImageData(0, 5, 32, 26).data;
            let sum = 0;
            const count = data.length / 4;
            for (let i = 0; i < data.length; i += 4) {
              sum += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
            }
            resolve(count > 0 ? sum / count : null);
          } catch (e) { resolve(null); }
        };
        im.onerror = () => resolve(null);
        im.src = src;
      }), dataUri);
      if (leftLum !== null) {
        if (bg.isTitle && leftLum > 0.30) {
          fullBleedBgIssues.push({
            pagination: bg.pagination,
            url: bg.url,
            message: `Titelbild (class: title, weiße Schrift) ist links zu hell (Luminanz ${leftLum.toFixed(2)} > 0.30) – dunkler Hintergrund erforderlich.`
          });
        } else if (!bg.isTitle && leftLum < 0.65) {
          fullBleedBgIssues.push({
            pagination: bg.pagination,
            url: bg.url,
            message: `Abschnittsbild (dunkle Schrift) ist links zu dunkel (Luminanz ${leftLum.toFixed(2)} < 0.65) – heller Hintergrund erforderlich.`
          });
        }
      }
    }
  }

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

      // Find highest and lowest content edge (including visible descendants like mjx-container, pre, table, img)
      const secRect = sec.getBoundingClientRect();
      const contentChildren = Array.from(sec.children).filter(child =>
        child.tagName !== 'HEADER' && child.tagName !== 'FOOTER'
      );
      let contentTop = clientHeight;
      let contentBottom = 0;

      const updateBounds = (el) => {
        if (el.closest('header, footer')) return;
        const rect = el.getBoundingClientRect();
        if (rect.height <= 0 || rect.width <= 0) return;
        const topRel = rect.top - secRect.top;
        const bottomRel = rect.bottom - secRect.top;
        if (topRel < contentTop) contentTop = topRel;
        if (bottomRel > contentBottom) contentBottom = bottomRel;
      };

      contentChildren.forEach(updateBounds);
      sec.querySelectorAll('h1, h2, h3, h4, p, li, pre, marp-pre, blockquote, table, mjx-container, img, svg').forEach(el => {
        if (el.tagName === 'IMG' && (el.getAttribute('alt') || '').startsWith('bg')) return;
        if (el.closest('svg') && el.tagName !== 'SVG') return;
        updateBounds(el);
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
      const colRatios = [];
      sec.querySelectorAll('div.columns').forEach(cols => {
        const children = Array.from(cols.children);
        if (children.length < 2) return;
        const heights = children.map(c => {
          const items = Array.from(c.children).filter(el => el.getBoundingClientRect().height > 0);
          if (items.length === 0) return 0;
          const top = Math.min(...items.map(el => el.getBoundingClientRect().top));
          const bot = Math.max(...items.map(el => el.getBoundingClientRect().bottom));
          return bot - top;
        });
        const maxColH = Math.max(...heights, 0);
        if (maxColH <= 0) return;
        heights.forEach((h, cIdx) => {
          colRatios.push({ colIndex: cIdx + 1, height: Math.round(h), maxHeight: Math.round(maxColH), ratio: h / maxColH });
        });
      });
      const colWidthRatios = [];
      sec.querySelectorAll('div.columns').forEach(cols => {
        const children = Array.from(cols.children);
        if (children.length < 2) return;
        children.forEach((c, cIdx) => {
          const colW = c.getBoundingClientRect().width;
          if (colW <= 0) return;
          const imgs = Array.from(c.querySelectorAll('img')).filter(img => img.getBoundingClientRect().height > 120);
          if (imgs.length === 0) return;
          const hasRichText = c.querySelector('ul, ol, pre, marp-pre, table, blockquote') !== null ||
            Array.from(c.querySelectorAll('p')).some(p => (p.textContent || '').trim().length > 0);
          if (hasRichText) return;
          const maxImgW = Math.max(...imgs.map(img => {
            const r = img.getBoundingClientRect();
            const natRatio = (img.naturalWidth > 0 && img.naturalHeight > 0) ? (img.naturalWidth / img.naturalHeight) : (r.width / Math.max(1, r.height));
            return Math.min(r.width, r.height * natRatio);
          }));
          colWidthRatios.push({
            colIndex: cIdx + 1,
            width: Math.round(maxImgW),
            colWidth: Math.round(colW),
            ratio: maxImgW / colW
          });
        });
      });
      const blockquoteCount = sec.querySelectorAll('blockquote').length;
      const mixedImageCols = [];
      sec.querySelectorAll('div.columns').forEach(cols => {
        const hasPureTextCol = Array.from(cols.children).some(c => !c.querySelector('img'));
        if (!hasPureTextCol) return;
        Array.from(cols.children).forEach((col, cIdx) => {
          const bigImg = Array.from(col.querySelectorAll('img')).some(img => img.getBoundingClientRect().height > 120);
          if (!bigImg) return;
          const hasExtraBlock = col.querySelector('blockquote, ul, ol, pre, marp-pre, table, h4, h5') !== null;
          const hasExtraText = Array.from(col.querySelectorAll('p')).some(p => (p.textContent || '').trim().length > 0);
          if (hasExtraBlock || hasExtraText) {
            mixedImageCols.push(cIdx + 1);
          }
        });
      });
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
        colRatios,
        colWidthRatios,
        blockquoteCount,
        mixedImageCols,
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
    const minSlideFillRatio = options.minFillRatio !== undefined ? options.minFillRatio : 0.80;
    const minColHeightRatio = options.minColHeightRatio !== undefined ? options.minColHeightRatio : 0.90;
    const minColWidthRatio = options.minColWidthRatio !== undefined ? options.minColWidthRatio : 0.90;
    const sparseCols = (s.colRatios || []).filter(c => c.ratio < minColHeightRatio);
    const narrowCols = (s.colWidthRatios || []).filter(c => c.ratio < minColWidthRatio);
    const hasUnderfill = !isAppendix && !s.isOpener && minSlideFillRatio > 0 && fillRatio < minSlideFillRatio;
    const hasSparseCol = !isAppendix && !s.isOpener && minColHeightRatio > 0 && sparseCols.length > 0;
    const hasNarrowCol = !isAppendix && !s.isOpener && minColWidthRatio > 0 && narrowCols.length > 0;

    const gapTolerance = options.gapTolerance !== undefined ? options.gapTolerance : 1;
    const gapIssues = (s.elementGaps || []).filter(g => Math.abs(g.gap - (g.expected || 16)) > gapTolerance);
    const hasGapError = !isAppendix && gapIssues.length > 0;
    const colorIssues = s.colorIssues || [];
    const hasColorError = colorIssues.length > 0;
    const hasMissingTitle = !s.isOpener && s.sectionIndex > 1 && (!s.title || !s.title.trim());
    const hasTooManyBlockquotes = !isAppendix && (s.blockquoteCount || 0) > 1;
    const hasMixedImageCol = !isAppendix && (s.mixedImageCols || []).length > 0;
    for (const bgErr of fullBleedBgIssues) {
      if ((!bgErr.pagination && s.sectionIndex === 1) || bgErr.pagination === String(s.pagination)) {
        svgIssues.push({
          file: decodeURIComponent(bgErr.url.split('/').pop().split('?')[0]),
          issues: [{ type: 'FULLBLEED_BG_CHECK', message: bgErr.message }]
        });
      }
    }
    const hasSvgIssuesAfterBg = svgIssues.length > 0;

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
      hasError: hasVOverflow || hasHOverflow || hasHeaderCollision || hasFooterCollision || hasSvgIssuesAfterBg || hasUnderfill || hasSparseCol || hasNarrowCol || hasGapError || hasColorError || hasMissingTitle || hasTooManyBlockquotes || hasMixedImageCol,
      hasVOverflow,
      hasHOverflow,
      hasHeaderCollision,
      hasFooterCollision,
      hasSvgIssues: hasSvgIssuesAfterBg,
      hasUnderfill,
      hasSparseCol,
      sparseCols,
      hasNarrowCol,
      narrowCols,
      hasGapError,
      hasColorError,
      hasMissingTitle,
      hasTooManyBlockquotes,
      hasMixedImageCol,
      mixedImageCols: s.mixedImageCols || []
    });
  }

  // 3. Schema- und Bildprüfung für Kapitel- und Abschnittsübersichten (nur Hauptfoliensatz, nicht für Anhänge)
  if (!options.skipSchema && !isAppendix) {
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

  let minHeaderMargin = 14;
  let minFooterMargin = 14;
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

  const collectChapterDecks = (chapterDir) => {
    const folienDir = path.join(chapterDir, 'Folien');
    if (!fs.existsSync(folienDir)) return;
    const mainDeck = path.join(folienDir, 'Folien.md');
    if (fs.existsSync(mainDeck)) decks.push(mainDeck);
    const appendices = fs.readdirSync(folienDir)
      .filter(f => /^Folien_Anhang_.*\.md$/i.test(f))
      .sort();
    for (const app of appendices) {
      decks.push(path.join(folienDir, app));
    }
  };

  const decks = [];
  if (target === 'all') {
    const kapitelDir = path.resolve('Kapitel');
    const entries = fs.readdirSync(kapitelDir).sort();
    entries.forEach(e => collectChapterDecks(path.join(kapitelDir, e)));
  } else if (fs.existsSync(target)) {
    decks.push(path.resolve(target));
  } else {
    // Try matching chapter number
    const kapitelDir = path.resolve('Kapitel');
    const match = fs.readdirSync(kapitelDir).find(d => d.startsWith(target));
    if (match) {
      collectChapterDecks(path.join(kapitelDir, match));
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
    const baseChapter = path.basename(dDir) === 'Folien' ? path.basename(path.dirname(dDir)) : path.basename(dDir);
    const deckBase = path.basename(deck);
    const deckName = /^Folien_Anhang_.*\.md$/i.test(deckBase) ? `${baseChapter} (${deckBase})` : baseChapter;
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
            if (s.issues && s.issues.length > 0) {
              s.issues.forEach(iss => issues.push(iss.message));
            } else {
              const detail = s.sampleSmallText ? ` [z.B. "${s.sampleSmallText.text}": ${s.sampleSmallText.effectivePx}px, deklariert: ${s.sampleSmallText.declFont}px]` : '';
              issues.push(`SVG Schrift zu klein: ${path.basename(s.src || s.file || '')} (${s.minFont}px < ${minFontSize}px, Box: ${s.renderedBox})${detail}`);
            }
          });
        }
        if (err.schemaIssues && err.schemaIssues.length > 0) {
          err.schemaIssues.forEach(msg => issues.push(`Schema-Fehler: ${msg}`));
        }
        if (err.hasUnderfill) {
          issues.push(`Folie zu leer: vertikale Auslastung nur ${Math.round(err.fillRatio * 100)}% (< ${Math.round(minFillRatio * 100)}%)`);
        }
        if (err.hasSparseCol) {
          err.sparseCols.forEach(c => issues.push(`Spalte ${c.colIndex} zu leer: ${Math.round(c.ratio * 100)}% der Spaltenhöhe (${c.height}/${c.maxHeight}px, < 90%)`));
        }
        if (err.hasNarrowCol) {
          err.narrowCols.forEach(c => issues.push(`Spalte ${c.colIndex} zu schmal: ${Math.round(c.ratio * 100)}% der Spaltenbreite (${c.width}/${c.colWidth}px, < 90%)`));
        }
        if (err.hasGapError) {
          err.gapIssues.forEach(g => issues.push(`Vertikaler Gap inkonsistent (${g.scope}: ${g.pair} = ${g.gap}px, erwartet ${g.expected || 16}px)`));
        }
        if (err.hasColorError) {
          err.colorIssues.forEach(c => issues.push(`Ungetönter Grauton auf Highlight-Hintergrund (${c.tag} "${c.sample}..." hat ${c.fg} auf ${c.bg})`));
        }
        if (err.hasMissingTitle) {
          issues.push(`Fehlender Folientitel (# / ## / ### im Markdown)`);
        }
        if (err.hasTooManyBlockquotes) {
          issues.push(`Zu viele Zitatblöcke (max. 1 <blockquote> pro Folie erlaubt)`);
        }
        if (err.hasMixedImageCol) {
          issues.push(`Gemischte Bild-/Text-Spalte (Spalte ${err.mixedImageCols.join(', ')}): Große Grafiken (>120px) gehören in eine reine Bild-Spalte`);
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
