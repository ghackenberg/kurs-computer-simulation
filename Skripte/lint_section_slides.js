#!/usr/bin/env node
/**
 * ==============================================================================
 * Schema- & Strukturlinter für Kapitel- und Abschnittsübersichtsfolien
 * Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
 * FH OÖ – Campus Wels
 * ==============================================================================
 *
 * Prüft gemäß GEMINI.md:
 * 1. Kapitelübersicht (# Kapitel N: ...):
 *    - Hintergrundbild '![bg right](./Titelbild.jpg)' (Datei existiert)
 *    - Standard-Einleitung: 'Dieses Kapitel umfasst die folgenden Abschnitte:'
 *    - Vollständige Liste der Abschnitte (- N.1: ...)
 *
 * 2. Abschnittsübersichten (## N.M: ...):
 *    - Hintergrundbild '![bg right](./Illustrationen/...)' (Datei existiert)
 *    - Standard-Einleitung: 'Dieser Abschnitt umfasst die folgenden Inhalte:'
 *    - Aufzählungsliste der Inhalte (- ...)
 *    - Konsistenz zwischen Kapitel-Agenda und tatsächlichen Abschnitten
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

function lintSectionDeck(markdownPath) {
  const content = fs.readFileSync(markdownPath, 'utf8');
  const deckDir = path.dirname(markdownPath);
  const deckName = path.basename(deckDir);
  const slides = content.split(/^---$/m);

  const issues = [];
  const declaredSectionsInAgenda = [];
  const actualSectionSlides = [];

  let chapterSlideFound = false;

  slides.forEach((slide, idx) => {
    const slideNum = idx + 1;

    // 1. Kapitel-Titel / Agenda (# Kapitel N: ...)
    const chapterMatch = slide.match(/#\s+Kapitel\s+(\d+):\s*([^\r\n]+)/i);
    if (chapterMatch) {
      chapterSlideFound = true;
      const kapNr = chapterMatch[1];
      const kapTitle = chapterMatch[2].trim();

      // Background check
      const bgMatch = slide.match(/!\[bg\s+right[^\]]*\]\(([^)]+)\)/i);
      if (!bgMatch) {
        issues.push({
          slideNum,
          type: 'MISSING_BG',
          message: `Kapitelübersicht #${kapNr} fehlt Hintergrundbild: '![bg right](./Titelbild.jpg)' erwartet.`
        });
      } else {
        const imgPath = path.resolve(deckDir, bgMatch[1].trim());
        if (!fs.existsSync(imgPath)) {
          issues.push({
            slideNum,
            type: 'FILE_NOT_FOUND',
            message: `Titelbild-Datei '${bgMatch[1]}' existiert nicht auf der Festplatte.`
          });
        }
      }

      // Standard intro
      if (!/Dieses\s+Kapitel\s+umfasst\s+die\s+folgenden\s+Abschnitte:/i.test(slide)) {
        issues.push({
          slideNum,
          type: 'MISSING_INTRO',
          message: `Standard-Einleitung fehlt: 'Dieses Kapitel umfasst die folgenden Abschnitte:' erwartet.`
        });
      }

      // Parse agenda sections
      const bulletMatches = slide.matchAll(/^\s*-\s*(\d+\.\d+):?\s*([^\r\n]+)/gm);
      for (const m of bulletMatches) {
        declaredSectionsInAgenda.push({
          num: m[1],
          title: m[2].trim()
        });
      }

      if (declaredSectionsInAgenda.length === 0) {
        issues.push({
          slideNum,
          type: 'EMPTY_AGENDA',
          message: `Abschnittsliste der Agenda (- N.1: ...) fehlt oder enthält keine gültigen Abschnittsnummern.`
        });
      }
    }

    // 2. Abschnittsübersicht (## N.M: ...)
    const sectionMatch = slide.match(/##\s+(\d+\.\d+):\s*([^\r\n]+)/);
    if (sectionMatch) {
      const secNum = sectionMatch[1];
      const secTitle = sectionMatch[2].trim();

      actualSectionSlides.push({
        slideNum,
        secNum,
        secTitle
      });

      // Background check
      const bgMatch = slide.match(/!\[bg\s+right[^\]]*\]\(([^)]+)\)/i);
      if (!bgMatch) {
        issues.push({
          slideNum,
          type: 'MISSING_BG',
          message: `Abschnitt ${secNum} [${secTitle}] fehlt Hintergrundbild: '![bg right](./Illustrationen/...)' nicht deklariert.`
        });
      } else {
        const imgRel = bgMatch[1].trim();
        const imgPath = path.resolve(deckDir, imgRel);
        if (!fs.existsSync(imgPath)) {
          issues.push({
            slideNum,
            type: 'FILE_NOT_FOUND',
            message: `Hintergrundbild '${imgRel}' für Abschnitt ${secNum} existiert nicht auf der Festplatte.`
          });
        }
      }

      // Standard intro
      if (!/Dieser\s+Abschnitt\s+umfasst\s+die\s+folgenden\s+Inhalte:/i.test(slide)) {
        issues.push({
          slideNum,
          type: 'MISSING_INTRO',
          message: `Abschnitt ${secNum} [${secTitle}]: Standard-Einleitung 'Dieser Abschnitt umfasst die folgenden Inhalte:' fehlt.`
        });
      }

      // Bullet points
      const hasBullets = /^\s*-\s+[^\r\n]+/m.test(slide);
      if (!hasBullets) {
        issues.push({
          slideNum,
          type: 'EMPTY_CONTENTS',
          message: `Abschnitt ${secNum} [${secTitle}]: Aufzählung der Abschnittsinhalte (- ...) fehlt.`
        });
      }
    }
  });

  // 3. Consistency checks
  const actualNums = new Set(actualSectionSlides.map(s => s.secNum));
  const declaredNums = new Set(declaredSectionsInAgenda.map(s => s.num));

  declaredSectionsInAgenda.forEach(d => {
    if (!actualNums.has(d.num)) {
      issues.push({
        slideNum: 0,
        type: 'MISSING_SECTION_SLIDE',
        message: `In Kapitel-Agenda angekündigter Abschnitt ${d.num} ('${d.title}') besitzt keine Folie mit '## ${d.num}:'!`
      });
    }
  });

  actualSectionSlides.forEach(a => {
    if (declaredSectionsInAgenda.length > 0 && !declaredNums.has(a.secNum)) {
      issues.push({
        slideNum: a.slideNum,
        type: 'UNLISTED_SECTION',
        message: `Abschnitt ${a.secNum} ('${a.secTitle}') existiert als Folie, fehlt aber in der Kapitel-Agenda auf Folie 1.`
      });
    }
  });

  return {
    markdownPath,
    deckName,
    chapterSlideFound,
    declaredSectionsCount: declaredSectionsInAgenda.length,
    actualSectionsCount: actualSectionSlides.length,
    issues
  };
}

function main() {
  const args = process.argv.slice(2);
  const target = args[0] || 'all';

  const folienDir = path.resolve('Folien');
  const decks = [];

  if (target === 'all') {
    const entries = fs.readdirSync(folienDir).sort();
    entries.forEach(e => {
      const p = path.join(folienDir, e, 'Folien.md');
      if (fs.existsSync(p)) decks.push(p);
    });
  } else if (fs.existsSync(target)) {
    decks.push(path.resolve(target));
  } else {
    const match = fs.readdirSync(folienDir).find(d => d.startsWith(target));
    if (match) {
      decks.push(path.join(folienDir, match, 'Folien.md'));
    } else {
      console.error(`Target not found: ${target}`);
      process.exit(1);
    }
  }

  console.log(`\n================================================================`);
  console.log(`  ABSCHNITT- & KAPITELSCHEMA LINTER`);
  console.log(`  Prüfe ${decks.length} Foliensatz/Foliensätze auf Bild- und Textschema`);
  console.log(`================================================================\n`);

  let totalIssues = 0;

  for (const deck of decks) {
    const res = lintSectionDeck(deck);
    process.stdout.write(`Prüfe ${res.deckName} (${res.actualSectionsCount} Abschnitte) ... `);

    if (res.issues.length === 0) {
      console.log(`✓ OK (vollständig konform mit Illustrationen)`);
    } else {
      totalIssues += res.issues.length;
      console.log(`✗ ${res.issues.length} Abweichung(en) gefunden:`);
      res.issues.forEach(iss => {
        const prefix = iss.slideNum > 0 ? `  - [Folie ${iss.slideNum}]` : `  - [Allgemein]`;
        console.log(`    ${prefix} ${iss.message}`);
      });
    }
  }

  console.log(`\n================================================================`);
  console.log(`  ZUSAMMENFASSUNG: ${totalIssues === 0 ? 'ALLES KONFORM ✓' : `${totalIssues} SCHEMA-FEHLER GEFUNDEN ✗`}`);
  console.log(`================================================================\n`);

  if (totalIssues > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  lintSectionDeck
};
