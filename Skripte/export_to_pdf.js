#!/usr/bin/env node
/**
 * ==============================================================================
 * PDF Export & Automatisierungsskript
 * Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
 * Studiengang: B.Sc. Automatisierungstechnik, 5. Semester
 * FH OÖ – Campus Wels
 *
 * Exportiert Marp-Foliensätze und Markdown-Aufgabenblätter in druckreife PDFs.
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ------------------------------------------------------------------------------
// 1. Dependency Resolution
// ------------------------------------------------------------------------------
const ROAMING_NPM = path.join(
  process.env.APPDATA || 'C:/Users/P28500/AppData/Roaming',
  'npm/node_modules/@mermaid-js/mermaid-cli/node_modules'
);

function requireLocalOrGlobal(modName) {
  try {
    return require(modName);
  } catch (e1) {
    const candidatePath = path.join(ROAMING_NPM, modName);
    if (fs.existsSync(candidatePath)) {
      return require(candidatePath);
    }
    throw new Error(`Fehlendes Modul '${modName}'. Bitte stellen Sie sicher, dass '${modName}' installiert ist.`);
  }
}

const puppeteer = requireLocalOrGlobal('puppeteer');
const marked = requireLocalOrGlobal('marked');
const katex = requireLocalOrGlobal('katex');
const hljs = requireLocalOrGlobal('highlight.js');

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

function getBrowserExecutable() {
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

function getMarpCommand() {
  try {
    execSync('marp --version', { stdio: 'ignore' });
    return 'marp';
  } catch (e) {
    return 'npx @marp-team/marp-cli';
  }
}

// ------------------------------------------------------------------------------
// 2. Paths & Directories
// ------------------------------------------------------------------------------
const ROOT_DIR = path.resolve(__dirname, '..');
const FOLIEN_DIR = path.join(ROOT_DIR, 'Folien');
const UEBUNGEN_DIR = path.join(ROOT_DIR, 'Uebungen');
const THEMEN_CSS = path.join(ROOT_DIR, 'Themen', 'fhooe.css');
const EXPORT_DIR = path.join(ROOT_DIR, 'Export');
const EXPORT_FOLIEN_DIR = path.join(EXPORT_DIR, 'Folien');
const EXPORT_UEBUNGEN_DIR = path.join(EXPORT_DIR, 'Uebungen');

// ------------------------------------------------------------------------------
// 3. Helper Functions
// ------------------------------------------------------------------------------
function sanitizeUmlauts(str) {
  return str
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function padZero(num, size = 2) {
  let s = String(num);
  while (s.length < size) s = '0' + s;
  return s;
}

// ------------------------------------------------------------------------------
// 4. CLI Argument Parser
// ------------------------------------------------------------------------------
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    slides: false,
    exercises: false,
    chapter: null,
    termin: null,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--slides' || arg === '-s') {
      options.slides = true;
    } else if (arg === '--exercises' || arg === '-e') {
      options.exercises = true;
    } else if (arg === '--all' || arg === '-a') {
      options.slides = true;
      options.exercises = true;
    } else if (arg === '--chapter' || arg === '-c') {
      options.chapter = args[++i];
    } else if (arg === '--termin' || arg === '-t') {
      options.termin = args[++i];
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  // Fallbacks: Wenn gezielt ein Kapitel angegeben wurde, standardmäßig Slides aktivieren
  if (options.chapter && !options.exercises && !options.slides) {
    options.slides = true;
  }
  // Wenn gezielt ein Termin angegeben wurde, standardmäßig Exercises aktivieren
  if (options.termin && !options.slides && !options.exercises) {
    options.exercises = true;
  }
  // Wenn weder noch ausgewählt wurde, alles exportieren
  if (!options.slides && !options.exercises) {
    options.slides = true;
    options.exercises = true;
  }

  return options;
}

function showHelp() {
  console.log(`
Usage: node Skripte/export_to_pdf.js [Optionen]

Optionen:
  --slides, -s          Exportiert alle MARP-Foliensätze (Folien/*/Folien.md)
  --exercises, -e       Exportiert alle Aufgabenblätter (Uebungen/*/Aufgabenblatt.md)
  --all, -a             Exportiert Foliensätze und Aufgabenblätter (Standard)
  --chapter <XX>, -c    Exportiert nur ein bestimmtes Folienkapitel (z.B. '00', '01', '07')
  --termin <XX>, -t     Exportiert nur ein bestimmtes Aufgabenblatt (z.B. '01', '05', '10')
  --help, -h            Zeigt diese Hilfe an

Beispiele:
  node Skripte/export_to_pdf.js                  # Alles exportieren
  node Skripte/export_to_pdf.js --slides         # Nur Folien exportieren
  node Skripte/export_to_pdf.js --exercises      # Nur Aufgabenblätter exportieren
  node Skripte/export_to_pdf.js --chapter 01     # Nur Kapitel 01 Folien exportieren
  node Skripte/export_to_pdf.js --termin 03      # Nur Aufgabenblatt 03 exportieren
`);
}

// ------------------------------------------------------------------------------
// 5. MARP Slides Export
// ------------------------------------------------------------------------------
function exportSingleSlideDeck(dirName, marpCmd) {
  const inputMd = path.join(FOLIEN_DIR, dirName, 'Folien.md');
  const localPdf = path.join(FOLIEN_DIR, dirName, 'Folien.pdf');
  const sanitizedName = sanitizeUmlauts(dirName);
  const exportPdf = path.join(EXPORT_FOLIEN_DIR, `${sanitizedName}_Folien.pdf`);

  if (!fs.existsSync(inputMd)) {
    throw new Error(`Datei nicht gefunden: ${inputMd}`);
  }

  const browserExec = getBrowserExecutable();
  const env = { ...process.env };
  if (browserExec) {
    env.CHROME_PATH = browserExec;
  }

  // CLI-Aufruf marp-cli
  const cmd = `${marpCmd} --no-stdin --theme-set "${THEMEN_CSS}" --allow-local-files --pdf "${inputMd}" -o "${localPdf}"`;
  execSync(cmd, { stdio: 'pipe', env });

  // Synchronkopie in den Export-Ordner
  fs.copyFileSync(localPdf, exportPdf);

  const stat = fs.statSync(exportPdf);
  return {
    dirName,
    sanitizedName,
    localPdf,
    exportPdf,
    size: stat.size
  };
}

async function exportAllSlides(filterChapter = null) {
  console.log('\n' + '='.repeat(70));
  console.log(' MARP-FOLIENSÄTZE EXPORTIEREN');
  console.log('='.repeat(70));

  fs.mkdirSync(EXPORT_FOLIEN_DIR, { recursive: true });

  const marpCmd = getMarpCommand();
  const allDirs = fs.readdirSync(FOLIEN_DIR)
    .filter(d => fs.statSync(path.join(FOLIEN_DIR, d)).isDirectory() && /^\d\d_/.test(d))
    .sort();

  let targetDirs = allDirs;
  if (filterChapter !== null) {
    const formatted = padZero(filterChapter, 2);
    targetDirs = allDirs.filter(d => d.startsWith(`${formatted}_`));
    if (targetDirs.length === 0) {
      console.warn(`[WARNUNG] Kein Folienkapitel mit Nummer '${filterChapter}' gefunden.`);
      return [];
    }
  }

  const results = [];
  for (let idx = 0; idx < targetDirs.length; idx++) {
    const dir = targetDirs[idx];
    const progress = `[${idx + 1}/${targetDirs.length}]`;
    process.stdout.write(`  ${progress} Konvertiere Folien: ${dir} ... `);
    const start = Date.now();
    try {
      const res = exportSingleSlideDeck(dir, marpCmd);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`OK (${formatBytes(res.size)}, ${elapsed}s)`);
      results.push({ ...res, success: true, elapsed });
    } catch (err) {
      console.log(`FEHLER: ${err.message}`);
      results.push({ dirName: dir, success: false, error: err.message });
    }
  }

  return results;
}

// ------------------------------------------------------------------------------
// 6. Aufgabenblätter Markdown & Math Parser to HTML
// ------------------------------------------------------------------------------
function renderAufgabenblattToHtml(mdContent, terminTitle) {
  // 1. Codeblöcke maskieren
  const codeBlocks = [];
  let processed = mdContent.replace(/(```[\s\S]*?```|`[^`\n]+`)/g, (match) => {
    const placeholder = `%%%CODE_BLOCK_${codeBlocks.length}%%%`;
    codeBlocks.push(match);
    return placeholder;
  });

  // 2. Block-Formeln ($$...$$) mit KaTeX rendern
  const mathBlocks = [];
  processed = processed.replace(/\$\$([\s\S]+?)\$\$/g, (match, math) => {
    let rendered = '';
    try {
      rendered = katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
    } catch (e) {
      rendered = `<pre class="math-error">${math}</pre>`;
    }
    const placeholder = `%%%MATH_BLOCK_${mathBlocks.length}%%%`;
    mathBlocks.push(`<div class="katex-display-wrapper">${rendered}</div>`);
    return placeholder;
  });

  // 3. Inline-Formeln ($...$) mit KaTeX rendern
  const inlineMath = [];
  processed = processed.replace(/(?<!\$)\$(?!\$)([^\$\n]+?)\$(?!\$)/g, (match, math) => {
    let rendered = '';
    try {
      rendered = katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
    } catch (e) {
      rendered = `<code>${math}</code>`;
    }
    const placeholder = `%%%INLINE_MATH_${inlineMath.length}%%%`;
    inlineMath.push(rendered);
    return placeholder;
  });

  // 4. Codeblöcke vor Markdown-Parsing wieder einfügen
  processed = processed.replace(/%%%CODE_BLOCK_(\d+)%%%/g, (match, idx) => {
    return codeBlocks[parseInt(idx, 10)];
  });

  // 5. Marked konfigurieren (Syntax Highlighting via highlight.js)
  const renderer = new marked.Renderer();
  renderer.code = function(tokenOrCode, lang) {
    let code = typeof tokenOrCode === 'object' ? tokenOrCode.text : tokenOrCode;
    let language = (typeof tokenOrCode === 'object' ? tokenOrCode.lang : lang) || '';
    let highlighted = '';
    if (language && hljs.getLanguage(language)) {
      try {
        highlighted = hljs.highlight(code, { language }).value;
      } catch (e) {
        highlighted = hljs.highlightAuto(code).value;
      }
    } else {
      try {
        highlighted = hljs.highlightAuto(code).value;
      } catch (e) {
        highlighted = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }
    }
    return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: false
  });

  let html = marked.parse(processed);

  // 6. Math-Placeholders zurückholen
  html = html.replace(/%%%MATH_BLOCK_(\d+)%%%/g, (match, idx) => {
    return mathBlocks[parseInt(idx, 10)];
  });
  html = html.replace(/%%%INLINE_MATH_(\d+)%%%/g, (match, idx) => {
    return inlineMath[parseInt(idx, 10)];
  });

  // 7. GitHub-Style Alert Boxen verarbeiten (> [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION])
  html = html.replace(/<blockquote>\s*<p>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]([\s\S]*?)<\/blockquote>/gi, (match, type, content) => {
    const t = type.toUpperCase();
    const iconMap = {
      NOTE: `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>`,
      TIP: `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.91.324.567.436 1.05.436 1.783v.5h3.386v-.5c0-.733.112-1.216.436-1.783.203-.354.45-.646.673-.91l.214-.253c.56-.679.984-1.32.984-2.304 0-2.06-1.637-3.75-4-3.75Zm-1.5 11.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z"/></svg>`,
      IMPORTANT: `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h3a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h5.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm6.25 2.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Zm0 6.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>`,
      WARNING: `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.37A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.583Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.124a.25.25 0 0 0 .22.376h12.164a.25.25 0 0 0 .22-.376Zm.78 4.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>`,
      CAUTION: `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M4.47.047A1.75 1.75 0 0 0 3.232.56l-2.67 2.67A1.75 1.75 0 0 0 0 4.47v7.06c0 .464.184.91.56 1.238l2.672 2.672c.328.378.774.56 1.238.56h7.06c.464 0 .91-.184 1.238-.56l2.672-2.672c.376-.328.56-.774.56-1.238V4.47c0-.464-.184-.91-.56-1.238L12.77.56A1.75 1.75 0 0 0 11.53 0H4.47Zm.87 1.75h6.32a.25.25 0 0 1 .177.073l2.672 2.672a.25.25 0 0 1 .073.177v6.32a.25.25 0 0 1-.073.177l-2.672 2.672a.25.25 0 0 1-.177.073H5.34a.25.25 0 0 1-.177-.073L2.49 11.53a.25.25 0 0 1-.073-.177V5.21a.25.25 0 0 1 .073-.177L5.163 1.823A.25.25 0 0 1 5.34 1.75ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>`
    };
    const titleMap = {
      NOTE: 'Hinweis',
      TIP: 'Tipp',
      IMPORTANT: 'Wichtig',
      WARNING: 'Warnung',
      CAUTION: 'Achtung'
    };
    return `<div class="callout callout-${t.toLowerCase()}">
      <div class="callout-header">${iconMap[t] || ''}<span>${titleMap[t] || t}</span></div>
      <div class="callout-body"><p>${content.trim()}</p></div>
    </div>`;
  });

  return html;
}

function buildExerciseDocument(renderedBody, terminTitle) {
  // Lokale KaTeX- und Highlight.js CSS-Dateien einbinden
  const katexCssPath = path.join(ROAMING_NPM, 'katex/dist/katex.min.css');
  let katexCss = fs.readFileSync(katexCssPath, 'utf8');
  const katexFontsDir = path.join(ROAMING_NPM, 'katex/dist/fonts').replace(/\\/g, '/');
  katexCss = katexCss.replace(/fonts\//g, `file:///${katexFontsDir}/`);

  const hljsCssPath = path.join(ROAMING_NPM, 'highlight.js/styles/github.css');
  const hljsCss = fs.readFileSync(hljsCssPath, 'utf8');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>${terminTitle}</title>
  <style>
    ${katexCss}
    ${hljsCss}

    @page {
      size: A4 portrait;
      margin: 24mm 20mm 22mm 20mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.5;
      color: #24292f;
      margin: 0;
      padding: 0;
    }

    h1 {
      font-size: 17pt;
      font-weight: 700;
      color: #004B96;
      border-bottom: 2.5px solid #004B96;
      padding-bottom: 6px;
      margin-top: 0;
      margin-bottom: 14px;
      page-break-after: avoid;
    }

    h2 {
      font-size: 12.5pt;
      font-weight: 600;
      color: #004B96;
      border-bottom: 1px solid #d0d7de;
      padding-bottom: 4px;
      margin-top: 18px;
      margin-bottom: 8px;
      page-break-after: avoid;
    }

    h3 {
      font-size: 10.5pt;
      font-weight: 600;
      color: #24292f;
      margin-top: 14px;
      margin-bottom: 6px;
      page-break-after: avoid;
    }

    h4 {
      font-size: 9.5pt;
      font-weight: 600;
      color: #333;
      margin-top: 10px;
      margin-bottom: 4px;
      page-break-after: avoid;
    }

    p, ul, ol {
      margin-top: 0;
      margin-bottom: 8px;
    }

    li {
      margin-bottom: 3px;
    }

    hr {
      border: none;
      border-top: 1px solid #d0d7de;
      margin: 14px 0;
    }

    code {
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
      font-size: 8.5pt;
      background-color: rgba(175, 184, 193, 0.2);
      padding: 0.15em 0.35em;
      border-radius: 4px;
    }

    pre {
      background-color: #f6f8fa;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      padding: 8px 10px;
      overflow-x: auto;
      font-size: 8pt;
      line-height: 1.4;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    pre code {
      background-color: transparent;
      padding: 0;
      font-size: 8pt;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 10px 0;
      page-break-inside: avoid;
      break-inside: avoid;
      font-size: 8.5pt;
    }

    th, td {
      border: 1px solid #d0d7de;
      padding: 5px 8px;
      text-align: left;
    }

    th {
      background-color: #f6f8fa;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background-color: #fbfbfb;
    }

    blockquote {
      border-left: 4px solid #004B96;
      padding: 4px 10px;
      color: #57606a;
      margin: 10px 0;
      background-color: #f8f9fa;
      border-radius: 0 4px 4px 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .callout {
      border-left: 4px solid #004B96;
      border-radius: 4px;
      padding: 7px 10px;
      margin: 10px 0;
      background-color: #f6f8fa;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .callout-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      font-size: 8.5pt;
      margin-bottom: 3px;
    }

    .callout-body p {
      margin: 0;
      font-size: 8.5pt;
    }

    .callout-note { border-left-color: #0969da; background-color: #f0f7ff; }
    .callout-note .callout-header { color: #0969da; }

    .callout-tip { border-left-color: #1a7f37; background-color: #dafbe1; }
    .callout-tip .callout-header { color: #1a7f37; }

    .callout-important { border-left-color: #8250df; background-color: #fbf0ff; }
    .callout-important .callout-header { color: #8250df; }

    .callout-warning { border-left-color: #9a6700; background-color: #fff8c5; }
    .callout-warning .callout-header { color: #9a6700; }

    .callout-caution { border-left-color: #cf222e; background-color: #ffebe9; }
    .callout-caution .callout-header { color: #cf222e; }

    .katex-display-wrapper {
      margin: 8px 0;
      overflow-x: auto;
      page-break-inside: avoid;
      break-inside: avoid;
      text-align: center;
    }

    .katex {
      font-size: 1.05em;
    }

    a {
      color: #0969da;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  ${renderedBody}
</body>
</html>`;
}

async function exportAllExercises(browser, filterTermin = null) {
  console.log('\n' + '='.repeat(70));
  console.log(' AUFGABENBLÄTTER EXPORTIEREN');
  console.log('='.repeat(70));

  fs.mkdirSync(EXPORT_UEBUNGEN_DIR, { recursive: true });

  const allDirs = fs.readdirSync(UEBUNGEN_DIR)
    .filter(d => fs.statSync(path.join(UEBUNGEN_DIR, d)).isDirectory() && /^Termin_\d\d_/.test(d))
    .sort();

  let targetDirs = allDirs;
  if (filterTermin !== null) {
    const formatted = padZero(filterTermin, 2);
    targetDirs = allDirs.filter(d => d.startsWith(`Termin_${formatted}_`));
    if (targetDirs.length === 0) {
      console.warn(`[WARNUNG] Kein Aufgabenblatt mit Termin-Nummer '${filterTermin}' gefunden.`);
      return [];
    }
  }

  const results = [];
  const page = await browser.newPage();

  for (let idx = 0; idx < targetDirs.length; idx++) {
    const dir = targetDirs[idx];
    const progress = `[${idx + 1}/${targetDirs.length}]`;
    process.stdout.write(`  ${progress} Konvertiere Aufgabenblatt: ${dir} ... `);
    const start = Date.now();

    const mdPath = path.join(UEBUNGEN_DIR, dir, 'Aufgabenblatt.md');
    const localPdf = path.join(UEBUNGEN_DIR, dir, 'Aufgabenblatt.pdf');

    // Termin-Nummer extrahieren (z.B. "01")
    const numMatch = dir.match(/^Termin_(\d\d)/);
    const terminNum = numMatch ? numMatch[1] : 'XX';

    // Zielpfade in Export
    const exportPdfShort = path.join(EXPORT_UEBUNGEN_DIR, `Termin_${terminNum}_Aufgabenblatt.pdf`);
    const exportPdfNamed = path.join(EXPORT_UEBUNGEN_DIR, `${dir}_Aufgabenblatt.pdf`);

    try {
      const mdContent = fs.readFileSync(mdPath, 'utf8');

      // Titel aus erster H1-Überschrift ermitteln
      const h1Match = mdContent.match(/^#\s+(.+)$/m);
      const title = h1Match ? h1Match[1].trim() : `Aufgabenblatt ${terminNum}`;

      const renderedBody = renderAufgabenblattToHtml(mdContent, title);
      const fullHtml = buildExerciseDocument(renderedBody, title);

      // Temporäre HTML-Datei speichern für Puppeteer
      const tmpHtml = path.join(UEBUNGEN_DIR, dir, '.tmp_rendered.html');
      fs.writeFileSync(tmpHtml, fullHtml, 'utf8');

      await page.goto('file:///' + tmpHtml.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

      await page.pdf({
        path: localPdf,
        format: 'A4',
        landscape: false,
        printBackground: true,
        margin: {
          top: '24mm',
          bottom: '22mm',
          left: '20mm',
          right: '20mm'
        },
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 8pt; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 20mm; color: #57606a; border-bottom: 1px solid #d0d7de; padding-bottom: 4px; box-sizing: border-box;">
            <span style="font-weight: 600; color: #004B96;">FH OÖ Campus Wels | Systemsimulation</span>
            <span>${title}</span>
          </div>
        `,
        footerTemplate: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 8pt; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 20mm; color: #57606a; border-top: 1px solid #d0d7de; padding-top: 4px; box-sizing: border-box;">
            <span>B.Sc. Automatisierungstechnik – 5. Semester</span>
            <span>Seite <span class="pageNumber"></span> von <span class="totalPages"></span></span>
          </div>
        `
      });

      // Aufräumen
      if (fs.existsSync(tmpHtml)) {
        fs.unlinkSync(tmpHtml);
      }

      // Synchron in Export-Ordner spiegeln (sowohl kurz 'Termin_XX_Aufgabenblatt.pdf' als auch lang)
      fs.copyFileSync(localPdf, exportPdfShort);
      fs.copyFileSync(localPdf, exportPdfNamed);

      const stat = fs.statSync(localPdf);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`OK (${formatBytes(stat.size)}, ${elapsed}s)`);

      results.push({
        dirName: dir,
        title,
        localPdf,
        exportPdfShort,
        exportPdfNamed,
        size: stat.size,
        success: true,
        elapsed
      });
    } catch (err) {
      console.log(`FEHLER: ${err.message}`);
      results.push({ dirName: dir, success: false, error: err.message });
    }
  }

  await page.close();
  return results;
}

// ------------------------------------------------------------------------------
// 7. Generate Export/README.md for Moodle
// ------------------------------------------------------------------------------
function generateExportReadme(slideResults, exerciseResults) {
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

  let md = `# Exportierte PDF-Unterlagen für Moodle\n\n`;
  md += `**Lehrveranstaltung:** Systemsimulation / Digitaler Zwilling  \n`;
  md += `**Studiengang:** B.Sc. Automatisierungstechnik, 5. Semester  \n`;
  md += `**Institution:** Fachhochschule Oberösterreich – Campus Wels  \n`;
  md += `**Zuletzt generiert:** ${now} UTC  \n\n`;
  md += `Dieses Verzeichnis enthält alle druckreifen, vollständigen PDF-Unterlagen für den Upload auf Moodle.\n\n`;

  // 1. Foliensätze
  md += `## 1. MARP-Foliensätze (16:9 Präsentationen)\n\n`;
  md += `| Kapitel | Thema | Moodle-Export-Datei | Dateigröße | Lokale Datei |\n`;
  md += `| :--- | :--- | :--- | :---: | :--- |\n`;

  const folienDirs = fs.readdirSync(FOLIEN_DIR)
    .filter(d => fs.statSync(path.join(FOLIEN_DIR, d)).isDirectory() && /^\d\d_/.test(d))
    .sort();

  for (const dir of folienDirs) {
    const sanitized = sanitizeUmlauts(dir);
    const exportFile = `${sanitized}_Folien.pdf`;
    const exportPath = path.join(EXPORT_FOLIEN_DIR, exportFile);
    const localPath = path.join('Folien', dir, 'Folien.pdf').replace(/\\/g, '/');
    let sizeStr = '-';
    if (fs.existsSync(exportPath)) {
      sizeStr = formatBytes(fs.statSync(exportPath).size);
    }
    const cleanTitle = dir.replace(/^\d\d_/, '').replace(/_/g, ' ');
    const kapNr = dir.substring(0, 2);
    md += `| **${kapNr}** | ${cleanTitle} | [\`${exportFile}\`](Folien/${exportFile}) | ${sizeStr} | \`${localPath}\` |\n`;
  }

  // 2. Aufgabenblätter
  md += `\n## 2. Aufgabenblätter (DIN A4 Handouts)\n\n`;
  md += `| Termin | Thema | Moodle-Export-Datei | Dateigröße | Lokale Datei |\n`;
  md += `| :--- | :--- | :--- | :---: | :--- |\n`;

  const uebungenDirs = fs.readdirSync(UEBUNGEN_DIR)
    .filter(d => fs.statSync(path.join(UEBUNGEN_DIR, d)).isDirectory() && /^Termin_\d\d_/.test(d))
    .sort();

  for (const dir of uebungenDirs) {
    const numMatch = dir.match(/^Termin_(\d\d)/);
    const terminNum = numMatch ? numMatch[1] : 'XX';
    const exportFileShort = `Termin_${terminNum}_Aufgabenblatt.pdf`;
    const exportPathShort = path.join(EXPORT_UEBUNGEN_DIR, exportFileShort);
    const localPath = path.join('Uebungen', dir, 'Aufgabenblatt.pdf').replace(/\\/g, '/');
    let sizeStr = '-';
    if (fs.existsSync(exportPathShort)) {
      sizeStr = formatBytes(fs.statSync(exportPathShort).size);
    }
    const cleanTitle = dir.replace(/^Termin_\d\d_/, '').replace(/_/g, ' ');
    md += `| **Termin ${terminNum}** | ${cleanTitle} | [\`${exportFileShort}\`](Uebungen/${exportFileShort}) | ${sizeStr} | \`${localPath}\` |\n`;
  }

  md += `\n---\n*Automatisch generiert mit \`node Skripte/export_to_pdf.js\`*\n`;

  const readmePath = path.join(EXPORT_DIR, 'README.md');
  fs.writeFileSync(readmePath, md, 'utf8');
  console.log(`\n[OK] Moodle-Übersicht aktualisiert: Export/README.md`);
}

// ------------------------------------------------------------------------------
// 8. Main Entry Point
// ------------------------------------------------------------------------------
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  console.log('='.repeat(70));
  console.log(' FH OÖ PDF-EXPORT & AUTOMATISIERUNG');
  console.log(' Systemsimulation / Digitaler Zwilling');
  console.log('='.repeat(70));
  console.log(`Optionen: Slides=${options.slides}, Exercises=${options.exercises}` +
    (options.chapter ? `, Chapter=${options.chapter}` : '') +
    (options.termin ? `, Termin=${options.termin}` : ''));

  const startTime = Date.now();
  let slideResults = [];
  let exerciseResults = [];

  // 1. Foliensätze exportieren
  if (options.slides) {
    slideResults = await exportAllSlides(options.chapter);
  }

  // 2. Aufgabenblätter exportieren
  if (options.exercises) {
    const browserExec = getBrowserExecutable();
    if (!browserExec) {
      console.error('[FEHLER] Kein Google Chrome oder Microsoft Edge Browser gefunden.');
      process.exit(1);
    }

    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: browserExec,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
    });

    try {
      exerciseResults = await exportAllExercises(browser, options.termin);
    } finally {
      await browser.close();
    }
  }

  // 3. Moodle-Übersicht Export/README.md aktualisieren
  generateExportReadme(slideResults, exerciseResults);

  // 4. Abschluss-Zusammenfassung
  const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n' + '='.repeat(70));
  console.log(` EXPORT ABGESCHLOSSEN in ${totalElapsed}s`);
  console.log('='.repeat(70));

  const totalSlidesSuccess = slideResults.filter(r => r.success).length;
  const totalExercisesSuccess = exerciseResults.filter(r => r.success).length;

  if (slideResults.length > 0) {
    console.log(`  Folien:         ${totalSlidesSuccess}/${slideResults.length} erfolgreich exportiert.`);
  }
  if (exerciseResults.length > 0) {
    console.log(`  Aufgabenblätter: ${totalExercisesSuccess}/${exerciseResults.length} erfolgreich exportiert.`);
  }

  const failed = [...slideResults, ...exerciseResults].filter(r => !r.success);
  if (failed.length > 0) {
    console.error(`\n[WARNUNG] ${failed.length} Datei(en) konnten nicht fehlerfrei konvertiert werden:`);
    for (const f of failed) {
      console.error(`  - ${f.dirName}: ${f.error}`);
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('\n[FATALER FEHLER]', err);
  process.exit(1);
});
