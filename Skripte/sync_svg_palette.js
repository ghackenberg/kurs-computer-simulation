/**
 * Synchronisiert semantische Farbklassen aus Themen/svg_palette.json
 * in alle Diagramm-SVGs (Kapitel/[XX]/Folien/Diagramme/*.svg), die sem-* Klassen verwenden.
 *
 * Aufruf:
 *   node Skripte/sync_svg_palette.js          # SVGs aktualisieren
 *   node Skripte/sync_svg_palette.js --check  # Nur prüfen (Exit 1 bei Abweichung)
 */

const fs = require('fs');
const path = require('path');

const PALETTE_PATH = path.resolve(__dirname, '..', 'Themen', 'svg_palette.json');
const START_MARKER = '/* @svg-palette:start */';
const END_MARKER = '/* @svg-palette:end */';

function loadPalette() {
  return JSON.parse(fs.readFileSync(PALETTE_PATH, 'utf8'));
}

function buildPaletteCss(palette, usedRoles) {
  const lines = [START_MARKER];
  for (const [role, cfg] of Object.entries(palette.roles)) {
    if (usedRoles && !usedRoles.has(role)) continue;
    lines.push(`      .${role} { fill: ${cfg.fill}; stroke: ${cfg.stroke}; }`);
    lines.push(`      .${role}-bg { fill: ${cfg.fill}; stroke: none; }`);
    lines.push(`      .${role}-stroke { stroke: ${cfg.stroke}; }`);
    lines.push(`      .${role}-fill { fill: ${cfg.stroke}; }`);
    lines.push(`      .${role}-text { fill: ${cfg.text}; }`);
  }
  lines.push(`      ${END_MARKER}`);
  return lines.join('\n');
}

function extractUsedRoles(svgText, palette) {
  const roles = new Set();
  const classAttrRegex = /class\s*=\s*["']([^"']+)["']/g;
  let m;
  while ((m = classAttrRegex.exec(svgText)) !== null) {
    for (const token of m[1].split(/\s+/)) {
      const base = token.replace(/-(stroke|fill|bg|text)$/, '');
      if (palette.roles[base]) roles.add(base);
    }
  }
  return roles;
}

function findAllDiagramSvgs(rootDir) {
  const results = [];
  if (!fs.existsSync(rootDir)) return results;
  for (const chap of fs.readdirSync(rootDir)) {
    const diagDir = path.join(rootDir, chap, 'Folien', 'Diagramme');
    if (!fs.existsSync(diagDir)) continue;
    for (const f of fs.readdirSync(diagDir)) {
      if (f.endsWith('.svg')) results.push(path.join(diagDir, f));
    }
  }
  return results;
}

function syncSvgContent(svgText, palette) {
  const usedRoles = extractUsedRoles(svgText, palette);
  if (usedRoles.size === 0 && !svgText.includes(START_MARKER)) {
    return { changed: false, content: svgText, usedRoles };
  }
  const block = buildPaletteCss(palette, usedRoles);
  let next = svgText;

  const markerRegex = /\/\*\s*@svg-palette:start\s*\*\/[\s\S]*?\/\*\s*@svg-palette:end\s*\*\//;
  if (markerRegex.test(next)) {
    next = next.replace(markerRegex, block);
  } else if (/<style[^>]*>/i.test(next)) {
    next = next.replace(/(<style[^>]*>\s*)/i, `$1\n${block}\n`);
  } else {
    next = next.replace(/(<svg[^>]*>)/i, `$1\n  <style>\n${block}\n  </style>`);
  }

  return { changed: next !== svgText, content: next, usedRoles };
}

if (require.main === module) {
  const checkOnly = process.argv.includes('--check');
  const palette = loadPalette();
  const svgs = findAllDiagramSvgs(path.resolve(__dirname, '..', 'Kapitel'));

  let updated = 0;
  let stale = 0;
  for (const svgPath of svgs) {
    const raw = fs.readFileSync(svgPath, 'utf8');
    const { changed, content } = syncSvgContent(raw, palette);
    if (changed) {
      if (checkOnly) {
        console.log(`✗ Veraltet: ${path.relative(process.cwd(), svgPath)}`);
        stale++;
      } else {
        fs.writeFileSync(svgPath, content, 'utf8');
        console.log(`✓ Synchronisiert: ${path.relative(process.cwd(), svgPath)}`);
        updated++;
      }
    }
  }

  if (checkOnly) {
    if (stale > 0) {
      console.error(`\n${stale} SVG(s) nicht mit Themen/svg_palette.json synchron. Bitte 'npm run sync:svg-palette' ausführen.`);
      process.exit(1);
    }
    console.log('✓ Alle semantischen SVGs sind mit Themen/svg_palette.json synchron.');
  } else {
    console.log(`\nFertig: ${updated} SVG(s) aktualisiert (von ${svgs.length} geprüft).`);
  }
}

module.exports = { loadPalette, buildPaletteCss, extractUsedRoles, syncSvgContent, START_MARKER, END_MARKER };
