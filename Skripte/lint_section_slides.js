#!/usr/bin/env node
/**
 * ==============================================================================
 * Schema- & Strukturlinter für Kapitel- und Abschnittsübersichtsfolien
 * Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
 * FH OÖ – Campus Wels
 * ==============================================================================
 *
 * Prüft gemäß GEMINI.md / AGENTS.md:
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
 *
 * 3. Kapitel-Brücke & Rückblick vor Abschnitt N.1 (Kapitel 01 bis 10):
 *    - Dedizierte Einstiegsfolie '### Rückblick & Brücke: ...' (oder '### Einordnung & Rückblick: ...')
 *      nach Kapitel-Opener / optionaler Quiz- & Showcase-Folie und vor '## N.1:'
 *
 * 4. Visueller Rhythmus & Layout-Shift (ab Kap. 06 als Fehler, Kap. 00-05 als Warnung):
 *    - Keine zwei reinen Textfolien (ohne Grafik/SVG und ohne Code) direkt hintereinander
 *    - Signifikanter visueller Shift zwischen Nachbarfolien (Spaltenbreiten, Text-/Bild-/Code-/Mischspalten, mehrzeilige Layouts)
 *
 * 5. Abschnitts-Balance (ab Kap. 06 als Fehler, Kap. 00-05 als Warnung):
 *    - Jeder Abschnitt muss mindestens 2 Inhaltsfolien besitzen (SECTION_TOO_SMALL)
 *    - Ausgewogene Abschnittsgrößen: max. Verhältnis 2:1 bei Differenz > 2 (UNBALANCED_SECTIONS)
 *
 * 6. Didaktische Folienklassen (MISSING_SLIDE_CLASS) & Ausblicksfolie (MISSING_OUTLOOK_SLIDE):
 *    - Showcase -> <!-- _class: showcase -->
 *    - Rückblick & Brücke -> <!-- _class: bridge -->
 *    - Zusammenfassung -> <!-- _class: summary -->
 *    - Ausblick (Pflicht nach Zusammenfassung, vor Hausübung in Kap. 01-10) -> <!-- _class: bridge -->
 *    - Hausübung -> <!-- _class: homework -->
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

function classifyBlockContent(text) {
  const clean = text.replace(/<!--[\s\S]*?-->/g, '').replace(/^#{1,3}\s+.*$/gm, '').trim();
  const hasImg = /!\[[^\]]*\]\([^)]+\)/.test(clean);
  const hasCode = /```[\s\S]*?```/.test(clean);
  const withoutImgAndCode = clean
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^\s*>\s*/gm, '')
    .trim();
  const hasText = withoutImgAndCode.length > 0;
  const hasTable = /^\s*\|.+\|\s*$/m.test(withoutImgAndCode);

  if (hasImg && !hasCode && !hasText) return 'IMG';
  if (hasCode && !hasImg && !hasText) return 'CODE';
  if (!hasImg && !hasCode) return hasTable ? 'TABLE' : 'TEXT';
  if (hasImg && (hasCode || hasText)) return 'MIX_IMG';
  return 'MIX_CODE';
}

function classifySlideLayout(slide) {
  const isOpener = /^#\s+Kapitel\s+\d+:|^##\s+\d+\.\d+:|^#\s+Zusammenfassung/m.test(slide);
  if (isOpener) {
    return { signature: 'OPENER', isOpener: true, isPureText: false };
  }

  const body = slide.replace(/<!--[\s\S]*?-->/g, '').replace(/^#{1,3}\s+.*$/gm, '');
  const segments = [];
  const colRegex = /<div\s+class="columns[^"]*">([\s\S]*?)<\/div>\s*(?=<\/div>|\s*$|\s*\n)/g;

  // Robust tag-depth scanner for top-level <div class="columns..."> blocks
  let pos = 0;
  const openColRe = /<div\s+class="columns[^"]*">/g;
  while (pos < body.length) {
    openColRe.lastIndex = pos;
    const m = openColRe.exec(body);
    if (!m) {
      const tail = body.slice(pos).trim();
      if (tail) segments.push(`SINGLE:${classifyBlockContent(tail)}`);
      break;
    }
    const before = body.slice(pos, m.index).trim();
    if (before) segments.push(`SINGLE:${classifyBlockContent(before)}`);

    // Find matching </div> for this columns container
    let depth = 1;
    let scan = m.index + m[0].length;
    const tagRe = /<\/?div\b[^>]*>/g;
    tagRe.lastIndex = scan;
    let endIdx = body.length;
    let tm;
    while ((tm = tagRe.exec(body)) !== null) {
      if (tm[0].startsWith('</div')) {
        depth--;
        if (depth === 0) {
          endIdx = tm.index;
          pos = tm.index + tm[0].length;
          break;
        }
      } else {
        depth++;
      }
    }
    if (depth !== 0) pos = body.length;

    const colInner = body.slice(m.index + m[0].length, endIdx);
    // Extract direct child <div class="..."> columns inside colInner
    const cols = [];
    let cPos = 0;
    const childDivRe = /<div(?:\s+class="([^"]*)")?\s*>/g;
    while (cPos < colInner.length) {
      childDivRe.lastIndex = cPos;
      const cm = childDivRe.exec(colInner);
      if (!cm) break;
      let cDepth = 1;
      const cTagRe = /<\/?div\b[^>]*>/g;
      cTagRe.lastIndex = cm.index + cm[0].length;
      let cEnd = colInner.length;
      let ctm;
      while ((ctm = cTagRe.exec(colInner)) !== null) {
        if (ctm[0].startsWith('</div')) {
          cDepth--;
          if (cDepth === 0) {
            cEnd = ctm.index;
            cPos = ctm.index + ctm[0].length;
            break;
          }
        } else {
          cDepth++;
        }
      }
      if (cDepth !== 0) cPos = colInner.length;
      const widthCls = (cm[1] || 'auto').trim().split(/\s+/).find(c => /^(one|two|three|four|five|six)$/.test(c)) || 'auto';
      const contentCls = classifyBlockContent(colInner.slice(cm.index + cm[0].length, cEnd));
      cols.push(`${widthCls}:${contentCls}`);
    }
    segments.push(`ROW[${cols.join('|')}]`);
  }

  const hasImg = /!\[[^\]]*\]\([^)]+\)/.test(body);
  const hasCode = /```/.test(body);
  const isPureText = !hasImg && !hasCode;
  return {
    signature: segments.join(' + ') || 'EMPTY',
    isOpener: false,
    isPureText
  };
}

function lintSectionDeck(markdownPath) {
  const content = fs.readFileSync(markdownPath, 'utf8');
  const deckDir = path.dirname(markdownPath);
  const deckName = path.basename(deckDir) === 'Folien'
    ? path.basename(path.dirname(deckDir))
    : path.basename(deckDir);
  const slides = content.split(/^---$/m);

  const issues = [];
  const warnings = [];
  const declaredSectionsInAgenda = [];
  const actualSectionSlides = [];

  let chapterSlideFound = false;
  let estimatedMinutes = 0;
  let contentSlideCount = 0;
  let prevContentLayout = null;
  let prevSlideNum = 0;
  const chapNumMatchEarly = deckName.match(/^(\d+)_/);
  const chapNumEarly = chapNumMatchEarly ? parseInt(chapNumMatchEarly[1], 10) : -1;
  const strictRhythm = chapNumEarly >= 6;

  slides.forEach((slide, idx) => {
    const slideNum = idx + 1;
    const trimmed = slide.trim();
    // Skip empty split before leading '---' or pure YAML frontmatter block on slide 1/2
    if (idx <= 1 && (!trimmed || /^(?:marp|theme|paginate|title|header|footer|style):/m.test(trimmed))) {
      return;
    }

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
    // 3. Prüfe auf verbotene Bilddimensionen (w:, h:, width:, height:)
    const imgMatches = slide.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g);
    for (const match of imgMatches) {
      const alt = match[1];
      const src = match[2];
      const dimMatch = alt.match(/\b(?:w|h|width|height)\s*:\s*\d+/i);
      if (dimMatch) {
        issues.push({
          slideNum,
          type: 'EXPLICIT_IMAGE_DIMENSION',
          message: `Verbotene Bilddimension '${dimMatch[0]}' in Referenz zu '${path.basename(src)}'. Bildgrößen müssen rein über CSS/Theme geregelt werden.`
        });
      }
    }

    // 3b. Didaktische Folienklasse prüfen (<!-- _class: showcase|bridge|summary|homework -->)
    const classMatch = slide.match(/<!--\s*_class:\s*([a-z0-9_-]+)\s*-->/i);
    const slideClass = classMatch ? classMatch[1].toLowerCase() : null;
    if (/###\s+.*Live-Showcase/i.test(slide) && slideClass !== 'showcase') {
      issues.push({
        slideNum,
        type: 'MISSING_SLIDE_CLASS',
        message: `Showcase-Folie fehlt '<!-- _class: showcase -->'.`
      });
    } else if (/###\s+(?:Rückblick\s*&\s*Brücke|Einordnung\s*&\s*Rückblick|Brücke\s*&\s*Rückblick)/i.test(slide) && slideClass !== 'bridge') {
      issues.push({
        slideNum,
        type: 'MISSING_SLIDE_CLASS',
        message: `Brückenfolie fehlt '<!-- _class: bridge -->'.`
      });
    } else if (/^#{1,3}\s+Ausblick\b/im.test(slide) && slideClass !== 'bridge') {
      issues.push({
        slideNum,
        type: 'MISSING_SLIDE_CLASS',
        message: `Ausblicksfolie fehlt '<!-- _class: bridge -->'.`
      });
    } else if (/^#{1,3}\s+Zusammenfassung/im.test(slide) && slideClass !== 'summary') {
      issues.push({
        slideNum,
        type: 'MISSING_SLIDE_CLASS',
        message: `Zusammenfassungsfolie fehlt '<!-- _class: summary -->'.`
      });
    } else if (/###\s+Hausübung/i.test(slide) && slideClass !== 'homework') {
      issues.push({
        slideNum,
        type: 'MISSING_SLIDE_CLASS',
        message: `Hausübungsfolie fehlt '<!-- _class: homework -->'.`
      });
    }

    // 4. Gewichtete Vortragszeit pro Folientyp schätzen
    if (/###\s+.*(?:Live-Showcase|Hausübung)/i.test(slide)) {
      estimatedMinutes += 0;
    } else if (chapterMatch || sectionMatch || /^#\s+Zusammenfassung/im.test(slide)) {
      estimatedMinutes += 0.5;
    } else if (/###\s+(?:Rückblick\s*&\s*Brücke|Einordnung\s*&\s*Rückblick|Brücke\s*&\s*Rückblick)/i.test(slide)) {
      estimatedMinutes += 2.0;
      contentSlideCount++;
    } else if (/###\s+.*(?:Blick unter die Haube|Herleitung|Mathematik|Kontrast)/i.test(slide) || (/!\[[^\]]*\]\(\.\/Diagramme\/[^)]+\.svg\)/i.test(slide) && /\$\$[\s\S]+?\$\$/.test(slide))) {
      estimatedMinutes += 4.5;
      contentSlideCount++;
    } else {
      estimatedMinutes += 3.5;
      contentSlideCount++;
    }

    // 5. Visueller Rhythmus & Layout-Shift prüfen
    const layout = classifySlideLayout(slide);
    if (layout.isOpener) {
      prevContentLayout = null;
    } else {
      const targetArr = strictRhythm ? issues : warnings;
      if (prevContentLayout) {
        if (prevContentLayout.isPureText && layout.isPureText) {
          targetArr.push({
            slideNum,
            type: 'CONSECUTIVE_TEXT_SLIDES',
            message: `Zwei reine Textfolien direkt hintereinander (Folie ${prevSlideNum} → ${slideNum}) ohne Grafik/Code zur visuellen Unterbrechung.`
          });
        }
        if (prevContentLayout.signature === layout.signature) {
          targetArr.push({
            slideNum,
            type: 'NO_VISUAL_SHIFT',
            message: `Kein signifikanter visueller Shift zwischen Folie ${prevSlideNum} und ${slideNum} (beide: ${layout.signature}).`
          });
        }
      }
      prevContentLayout = layout;
      prevSlideNum = slideNum;
    }
  });

  // 4. Consistency checks
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

  // 5. Kapitel-Brücke & Rückblick-Folie vor Abschnitt N.1 (nach Kapitel-Opener / optionaler Showcase-Folie, für Kapitel 01 bis 10)
  const chapNumMatch = deckName.match(/^(\d+)_/);
  const chapNum = chapNumMatch ? parseInt(chapNumMatch[1], 10) : -1;
  if (chapNum >= 1 && chapNum <= 10) {
    const firstSec = actualSectionSlides.find(s => s.secNum === `${chapNum}.1`);
    const chapSlideIdx = slides.findIndex(sl => /#\s+Kapitel\s+\d+:/i.test(sl));
    if (firstSec && chapSlideIdx !== -1) {
      const preSecSlides = slides.slice(chapSlideIdx + 1, firstSec.slideNum - 1);
      const bridgeSlide = preSecSlides.find(sl =>
        /###\s+(?:Rückblick\s*&\s*Brücke|Einordnung\s*&\s*Rückblick|Brücke\s*&\s*Rückblick)/i.test(sl)
      );
      if (!bridgeSlide) {
        issues.push({
          slideNum: firstSec.slideNum,
          type: 'MISSING_BRIDGE_SLIDE',
          message: `Vor Abschnitt ${chapNum}.1 (nach Kapitel-Opener/Quiz/Showcase) fehlt die dedizierte Einstiegs-/Brückenfolie ('### Rückblick & Brücke: ...').`
        });
      } else if (!/!\[[^\]]*\]\(\.\/Diagramme\/[^)]+\.svg\)/i.test(bridgeSlide)) {
        const bIdx = slides.indexOf(bridgeSlide);
        issues.push({
          slideNum: bIdx >= 0 ? bIdx + 1 : firstSec.slideNum,
          type: 'MISSING_BRIDGE_VISUAL',
          message: `Brückenfolie in Kapitel ${chapNum} fehlt ein eingebettetes 3-Stufen-Brücken-SVG ('./Diagramme/...svg').`
        });
      }
    }

    const sumIdx = slides.findIndex(sl => /^#{1,3}\s+Zusammenfassung/im.test(sl));
    const hwIdx = slides.findIndex(sl => /###\s+Hausübung/i.test(sl));
    if (sumIdx !== -1 && hwIdx > sumIdx) {
      const between = slides.slice(sumIdx + 1, hwIdx);
      const hasOutlook = between.some(sl => /^###\s+Ausblick\b/im.test(sl));
      if (!hasOutlook) {
        issues.push({
          slideNum: hwIdx + 1,
          type: 'MISSING_OUTLOOK_SLIDE',
          message: `Zwischen Zusammenfassung und Hausübung in Kapitel ${chapNum} fehlt eine Ausblicksfolie ('### Ausblick: ...' mit '<!-- _class: bridge -->').`
        });
      }
    }
  }

  // 6. Abschnitts-Mindestgröße & Ausgewogenheit prüfen (ab Kap. 06 als Fehler, 00-05 als Warnung)
  if (actualSectionSlides.length > 0) {
    const summaryIdx = slides.findIndex(sl => /^#\s+Zusammenfassung/im.test(sl));
    const endBound = summaryIdx !== -1 ? summaryIdx + 1 : slides.length + 1;
    const secCounts = actualSectionSlides.map((sec, idx) => {
      const nextSlideNum = idx + 1 < actualSectionSlides.length ? actualSectionSlides[idx + 1].slideNum : endBound;
      const contentCount = Math.max(0, nextSlideNum - sec.slideNum - 1);
      return { ...sec, contentCount };
    });

    const targetArr = strictRhythm ? issues : warnings;
    secCounts.forEach(sc => {
      if (sc.contentCount < 2) {
        targetArr.push({
          slideNum: sc.slideNum,
          type: 'SECTION_TOO_SMALL',
          message: `Abschnitt ${sc.secNum} [${sc.secTitle}] hat nur ${sc.contentCount} Inhaltsfolie(n) (mindestens 2 erforderlich).`
        });
      }
    });

    if (secCounts.length >= 2) {
      const counts = secCounts.map(s => s.contentCount);
      const minC = Math.min(...counts);
      const maxC = Math.max(...counts);
      if (maxC - minC > 2 && (minC === 0 || maxC / minC > 2)) {
        const dist = secCounts.map(s => `${s.secNum}:${s.contentCount}`).join(', ');
        targetArr.push({
          slideNum: 0,
          type: 'UNBALANCED_SECTIONS',
          message: `Unausgewogene Abschnittsgrößen (${dist}; Max/Min = ${maxC}/${minC}).`
        });
      }
    }

    const sumIdx = slides.findIndex(sl => /^#{1,3}\s+Zusammenfassung/im.test(sl));
    const hwIdx = slides.findIndex(sl => /###\s+Hausübung/i.test(sl));
    if (sumIdx !== -1 && hwIdx > sumIdx) {
      const between = slides.slice(sumIdx + 1, hwIdx);
      const hasOutlook = between.some(sl => /^###\s+Ausblick\b/im.test(sl));
      if (!hasOutlook) {
        issues.push({
          slideNum: hwIdx + 1,
          type: 'MISSING_OUTLOOK_SLIDE',
          message: `Zwischen Zusammenfassung und Hausübung in Kapitel ${chapNum} fehlt eine Ausblicksfolie ('### Ausblick: ...' mit '<!-- _class: bridge -->').`
        });
      }
    }
  }

  // 7. Zeitbudget-Check für Kapitel 01 bis 10 (150 Min. - 15 Pause - 15 Showcase [ab T02] - 5 HÜ - 15 Quiz [T03,T05,T08,T10])
  let budgetMinutes = null;
  if (chapNum >= 1 && chapNum <= 10) {
    const hasQuiz = [3, 5, 8, 10].includes(chapNum);
    const hasShowcase = chapNum >= 2;
    budgetMinutes = 150 - 15 - (hasShowcase ? 15 : 0) - 5 - (hasQuiz ? 15 : 0);
    if (estimatedMinutes > budgetMinutes) {
      warnings.push({
        type: 'TIME_BUDGET_EXCEEDED',
        message: `Geschätzte Vortragszeit ~${estimatedMinutes.toFixed(1)} Min. überschreitet Netto-Budget von ${budgetMinutes} Min.${hasQuiz ? ' (Quiz-Termin)' : ''}.`
      });
    }
  }

  return {
    markdownPath,
    deckName,
    chapterSlideFound,
    declaredSectionsCount: declaredSectionsInAgenda.length,
    actualSectionsCount: actualSectionSlides.length,
    estimatedMinutes,
    budgetMinutes,
    contentSlideCount,
    issues,
    warnings
  };
}

function main() {
  const args = process.argv.slice(2);
  const target = args[0] || 'all';

  const kapitelDir = path.resolve('Kapitel');
  const decks = [];

  if (target === 'all') {
    const entries = fs.readdirSync(kapitelDir).sort();
    entries.forEach(e => {
      const p = path.join(kapitelDir, e, 'Folien', 'Folien.md');
      if (fs.existsSync(p)) decks.push(p);
    });
  } else if (fs.existsSync(target)) {
    decks.push(path.resolve(target));
  } else {
    const match = fs.readdirSync(kapitelDir).find(d => d.startsWith(target));
    if (match) {
      decks.push(path.join(kapitelDir, match, 'Folien', 'Folien.md'));
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
    const timeInfo = res.budgetMinutes !== null
      ? `~${res.estimatedMinutes.toFixed(0)}/${res.budgetMinutes} Min.`
      : `~${res.estimatedMinutes.toFixed(0)} Min.`;
    process.stdout.write(`Prüfe ${res.deckName} (${res.actualSectionsCount} Abschnitte, ${timeInfo}) ... `);

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
    if (res.warnings && res.warnings.length > 0) {
      res.warnings.forEach(w => {
        const prefix = w.slideNum ? `  - [Folie ${w.slideNum}] ` : '';
        console.log(`    ⚠ [${w.type}] ${prefix}${w.message}`);
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
