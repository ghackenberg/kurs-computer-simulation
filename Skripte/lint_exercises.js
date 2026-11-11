#!/usr/bin/env node
/**
 * ==============================================================================
 * Struktur-, Konsistenz-, Vorlagen- & Aktualitäts-Linter für Übungen & Moodle
 * Lehrveranstaltung: Systemsimulation / Digitaler Zwilling
 * FH OÖ – Campus Wels
 * ==============================================================================
 *
 * Prüft gemäß AGENTS.md & .agents/skills/uebungsaufgaben/SKILL.md:
 * 1. Terminologie- & Formatierungs-Blacklist (keine Altbegriffe wie 'In-Class',
 *    'Sprint', 'Stufe A/B', 'Aufgabe A.1', kein '€' in LaTeX, keine '$' oder
 *    Backticks in Kapitel/XX_.../Moodle/Text.md).
 * 2. Kanonisches 8-Abschnitts-Schema in Kapitel/XX_.../Uebung/Aufgabenblatt.md
 *    (H1, Metadaten-Kopf mit Vorgreif-Sperre, exakte H2 1..8, 10-Punkte-Rubrik).
 * 3. 4+4+4-Symmetrie & Didaktik (Vorbereitungsblock, Aufgabe 1.1..1.4 mit
 *    Selbsttest & dotnet test in 1.4, Arbeitspaket A.1..A.4 & B.1..B.4).
 * 4. Kopplung gegen Uebung/Vorlage/ (.sln Startup-Projekt-Reihenfolge, .Tests,
 *    TODO-Marker für Stufe 1 & Stufe 2, WPF IsLoaded-Guard bei ValueChanged).
 * 5. Freshness Gate der Export-Artefakte in Kapitel/XX_.../Moodle/ (*_Folien.pdf,
 *    *_Aufgabenblatt.pdf, Quiz_*.xml existieren und sind neuer als ihre Quellen).
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const KAPITEL_DIR = path.join(ROOT_DIR, 'Kapitel');

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

const CANONICAL_H2 = [
  { num: 1, regex: /^1\.\s+Lernziele\s+\(Intended Learning Outcomes - ILOs\)$/, expected: '## 1. Lernziele (Intended Learning Outcomes - ILOs)' },
  { num: 2, regex: /^2\.\s+Mathematische Grundlagen$/, expected: '## 2. Mathematische Grundlagen' },
  { num: 3, regex: /^3\.\s+Stufe 1:\s+Basisaufgabe\s+\(Gemeinsames Fundament auf der C#-Vorlage,\s*Richtwert ca\.\s*60 Min\.\)$/, expected: '## 3. Stufe 1: Basisaufgabe (Gemeinsames Fundament auf der C#-Vorlage, Richtwert ca. 60 Min.)' },
  { num: 4, regex: /^4\.\s+Stufe 2:\s+Vertiefungsaufgabe \/ Track-Ausbau\s+\(Wahlmodell:\s+Track A ODER Track B\)$/, expected: '## 4. Stufe 2: Vertiefungsaufgabe / Track-Ausbau (Wahlmodell: Track A ODER Track B)' },
  { num: 5, regex: /^5\.\s+Akzeptanzkriterien & Bewertungsrubrik \(10 Punkte\)$/, expected: '## 5. Akzeptanzkriterien & Bewertungsrubrik (10 Punkte)' },
  { num: 6, regex: /^6\.\s+Online-Recherche-Box$/, expected: '## 6. Online-Recherche-Box' },
  { num: 7, regex: /^7\.\s+Vibe-Coding Prompting-Tipps$/, expected: '## 7. Vibe-Coding Prompting-Tipps' },
  { num: 8, regex: /^8\.\s+🔍 Leitfragen für den Live-Showcase & Code-Defense \(Säule 2b\)$/, expected: '## 8. 🔍 Leitfragen für den Live-Showcase & Code-Defense (Säule 2b)' }
];

const LEGACY_PATTERNS = [
  { id: 'LEGACY_SPRINT', regex: /\b(in-class|präsenz-sprint|praesenz-sprint|labor-sprint|sprint)\b/i, label: 'Veralteter Begriff "Sprint / In-Class" (alles ist zweistufige Hausübung: Stufe 1 / Stufe 2)' },
  { id: 'LEGACY_STUFE_AB', regex: /\bstufe\s+[ab]\b/i, label: 'Veraltete Bezeichnung "Stufe A / Stufe B" (Ziffern = Stufe 1/2, Buchstaben = Track A/B)' },
  { id: 'LEGACY_AUFGABE_AB', regex: /\baufgabe\s+[ab]\.\d\b/i, label: 'Uneinheitliche Bezeichnung "Aufgabe A.X/B.X" (in Stufe 2 "Arbeitspaket A.X/B.X" verwenden)' }
];

function checkLegacyTermsInText(text, relFile, issues) {
  const lines = text.split(/\r?\n/);
  lines.forEach((line, idx) => {
    for (const pat of LEGACY_PATTERNS) {
      const m = line.match(pat.regex);
      if (m) {
        issues.push({
          type: pat.id,
          file: relFile,
          line: idx + 1,
          message: `${pat.label} -> Gefunden: "${m[0]}"`
        });
      }
    }
  });
}

function checkEuroInMath(text, relFile, issues) {
  // Mask fenced code blocks and inline code
  const masked = text.replace(/```[\s\S]*?```|`[^`\n]+`/g, '');
  const mathMatches = masked.matchAll(/\$\$[\s\S]+?\$\$|\$[^$\n]+\$/g);
  for (const m of mathMatches) {
    if (m[0].includes('€')) {
      issues.push({
        type: 'EURO_IN_MATH',
        file: relFile,
        message: ` Verbotenes '€'-Symbol innerhalb einer LaTeX-Formel gefunden (${m[0].slice(0, 40)}...). Bitte \\text{EUR} verwenden.`
      });
    }
  }
}

function walkFiles(dir, predicate, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'bin' || entry.name === 'obj' || entry.name === '.vs' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, predicate, out);
    } else if (predicate(full, entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function lintChapter(dirName) {
  const issues = [];
  const chapDir = path.join(KAPITEL_DIR, dirName);
  const kapNum = dirName.substring(0, 2);
  const isExerciseChapter = kapNum >= '01' && kapNum <= '10';
  const sanitizedDir = sanitizeUmlauts(dirName);

  const rel = (p) => path.relative(ROOT_DIR, p).replace(/\\/g, '/');

  // --------------------------------------------------------------------------
  // 1. Moodle-Ordner (Kapitel 00 bis 11) + Freshness Gate
  // --------------------------------------------------------------------------
  const moodleDir = path.join(chapDir, 'Moodle');
  const moodleTextPath = path.join(moodleDir, 'Text.md');
  const moodleBannerPath = path.join(moodleDir, 'Banner.jpg');

  if (!fs.existsSync(moodleTextPath)) {
    issues.push({ type: 'MISSING_MOODLE_TEXT', file: `Kapitel/${dirName}/Moodle/Text.md`, message: 'Moodle/Text.md fehlt.' });
  } else {
    const moodleText = fs.readFileSync(moodleTextPath, 'utf8');
    checkLegacyTermsInText(moodleText, rel(moodleTextPath), issues);
    if (moodleText.includes('$')) {
      issues.push({ type: 'LATEX_IN_MOODLE_TEXT', file: rel(moodleTextPath), message: 'Verbotenes "$"-Zeichen (LaTeX) in Moodle/Text.md gefunden.' });
    }
    if (moodleText.includes('`')) {
      issues.push({ type: 'BACKTICK_IN_MOODLE_TEXT', file: rel(moodleTextPath), message: 'Verbotenes Backtick-Zeichen (`) in Moodle/Text.md gefunden.' });
    }
  }

  if (!fs.existsSync(moodleBannerPath)) {
    issues.push({ type: 'MISSING_MOODLE_BANNER', file: `Kapitel/${dirName}/Moodle/Banner.jpg`, message: 'Moodle/Banner.jpg fehlt.' });
  }

  // Folien Legacy & Freshness Check
  const folienMdPath = path.join(chapDir, 'Folien', 'Folien.md');
  const folienPdfPath = path.join(moodleDir, `${sanitizedDir}_Folien.pdf`);
  if (fs.existsSync(folienMdPath)) {
    const folienMd = fs.readFileSync(folienMdPath, 'utf8');
    checkLegacyTermsInText(folienMd, rel(folienMdPath), issues);
    checkEuroInMath(folienMd, rel(folienMdPath), issues);

    const svgFiles = walkFiles(path.join(chapDir, 'Folien', 'Diagramme'), (_, name) => name.endsWith('.svg'));
    for (const svgPath of svgFiles) {
      checkLegacyTermsInText(fs.readFileSync(svgPath, 'utf8'), rel(svgPath), issues);
    }

    if (!fs.existsSync(folienPdfPath)) {
      issues.push({ type: 'MISSING_SLIDES_PDF', file: rel(folienPdfPath), message: `Exportierte Folien-PDF fehlt. Bitte 'npm run export:pdf:${kapNum}' ausführen.` });
    } else {
      const pdfMtime = fs.statSync(folienPdfPath).mtimeMs;
      const mdMtime = fs.statSync(folienMdPath).mtimeMs;
      if (pdfMtime + 1000 < mdMtime) {
        issues.push({
          type: 'STALE_SLIDES_PDF',
          file: rel(folienPdfPath),
          message: `Folien-PDF (${new Date(pdfMtime).toISOString().slice(0, 16)}) ist älter als Folien.md (${new Date(mdMtime).toISOString().slice(0, 16)}). Bitte 'npm run export:pdf:${kapNum}' ausführen.`
        });
      }
    }
  }

  // Quiz XML Freshness Check (wenn Quiz/README.md existiert = 10-Varianten-Architektur aktiv)
  const quizReadmePath = path.join(chapDir, 'Quiz', 'README.md');
  if (fs.existsSync(quizReadmePath)) {
    const qReadme = fs.readFileSync(quizReadmePath, 'utf8');
    const idMatch = qReadme.match(/\*\*Quiz-ID:\*\*\s*`([^`]+)`/);
    if (idMatch) {
      const quizXmlPath = path.join(moodleDir, `${idMatch[1].trim()}.xml`);
      const testMds = walkFiles(path.join(chapDir, 'Quiz'), (_, name) => /^Test_\d+_.*\.md$/.test(name));
      for (const tMd of testMds) {
        checkLegacyTermsInText(fs.readFileSync(tMd, 'utf8'), rel(tMd), issues);
      }
      if (!fs.existsSync(quizXmlPath)) {
        issues.push({ type: 'MISSING_QUIZ_XML', file: rel(quizXmlPath), message: `Kompilierte Moodle-Master-XML fehlt. Bitte 'npm run export:moodle' ausführen.` });
      } else {
        const xmlMtime = fs.statSync(quizXmlPath).mtimeMs;
        const newestMd = Math.max(...testMds.map(f => fs.statSync(f).mtimeMs));
        if (xmlMtime + 1000 < newestMd) {
          issues.push({ type: 'STALE_QUIZ_XML', file: rel(quizXmlPath), message: `Quiz-XML ist älter als Quiz/Test_*.md. Bitte 'npm run export:moodle' ausführen.` });
        }
      }
    }
  }

  if (!isExerciseChapter) {
    return issues;
  }

  // --------------------------------------------------------------------------
  // 2. Uebung/Aufgabenblatt.md Schema- & Strukturprüfung (Kapitel 01 bis 10)
  // --------------------------------------------------------------------------
  const uebungDir = path.join(chapDir, 'Uebung');
  const aufgabenMdPath = path.join(uebungDir, 'Aufgabenblatt.md');
  const aufgabenPdfPath = path.join(moodleDir, `${sanitizedDir}_Aufgabenblatt.pdf`);

  if (!fs.existsSync(aufgabenMdPath)) {
    issues.push({ type: 'MISSING_AUFGABENBLATT', file: rel(aufgabenMdPath), message: 'Uebung/Aufgabenblatt.md fehlt.' });
    return issues;
  }

  if (!fs.existsSync(aufgabenPdfPath)) {
    issues.push({ type: 'MISSING_EXERCISE_PDF', file: rel(aufgabenPdfPath), message: `Exportierte Aufgabenblatt-PDF fehlt. Bitte 'npm run export:pdf:uebung:${kapNum}' ausführen.` });
  } else {
    const pdfMtime = fs.statSync(aufgabenPdfPath).mtimeMs;
    const mdMtime = fs.statSync(aufgabenMdPath).mtimeMs;
    if (pdfMtime + 1000 < mdMtime) {
      issues.push({
        type: 'STALE_EXERCISE_PDF',
        file: rel(aufgabenPdfPath),
        message: `Aufgabenblatt-PDF (${new Date(pdfMtime).toISOString().slice(0, 16)}) ist älter als Aufgabenblatt.md (${new Date(mdMtime).toISOString().slice(0, 16)}). Bitte 'npm run export:pdf:uebung:${kapNum}' ausführen.`
      });
    }
  }

  const md = fs.readFileSync(aufgabenMdPath, 'utf8');
  const relMd = rel(aufgabenMdPath);

  checkLegacyTermsInText(md, relMd, issues);
  checkEuroInMath(md, relMd, issues);

  // Strip fenced code blocks before heading analysis
  const mdNoCode = md.replace(/```[\s\S]*?```/g, '');

  // Check H1
  const h1Match = mdNoCode.match(/^#\s+Aufgabenblatt\s+(\d\d):\s+(.+)$/m);
  if (!h1Match) {
    issues.push({ type: 'INVALID_H1', file: relMd, message: `H1 muss dem Schema '# Aufgabenblatt ${kapNum}: <Titel>' entsprechen.` });
  } else if (h1Match[1] !== kapNum) {
    issues.push({ type: 'WRONG_H1_NUMBER', file: relMd, message: `H1-Nummer '${h1Match[1]}' stimmt nicht mit Kapitel '${kapNum}' überein.` });
  }

  // Check Header Block before first H2
  const firstH2Idx = mdNoCode.search(/^##\s+/m);
  const headerBlock = firstH2Idx > 0 ? mdNoCode.slice(0, firstH2Idx) : mdNoCode;
  if (!/\*\*Bearbeitungsform:\*\*/.test(headerBlock) || !/\*\*Stufe 1 \(Basisaufgabe\):\*\*/.test(headerBlock) || !/\*\*Stufe 2 \(Vertiefungsaufgabe/.test(headerBlock)) {
    issues.push({ type: 'MISSING_HEADER_META', file: relMd, message: 'Metadaten-Kopfblock muss **Bearbeitungsform:**, **Stufe 1 (Basisaufgabe):** und **Stufe 2 (Vertiefungsaufgabe...):** enthalten.' });
  }
  if (!/>\s*\[!CAUTION\]/.test(headerBlock)) {
    issues.push({ type: 'MISSING_VORGREIF_SPERRE', file: relMd, message: 'Im Kopfblock fehlt die > [!CAUTION] Vorgreif-Sperre.' });
  }

  // Extract all H2 headings
  const h2Matches = [...mdNoCode.matchAll(/^##\s+(.+)$/gm)].map(m => ({ title: m[1].trim(), index: m.index }));

  // Detect accidental H3 numbered like main section (e.g. ### 3. Stufe 1: ...)
  for (const badH3 of mdNoCode.matchAll(/^###\s+([1-8]\.\s+.+)$/gm)) {
    issues.push({ type: 'H3_INSTEAD_OF_H2', file: relMd, message: `Hauptabschnitt mit '###' statt '##' formatiert: '### ${badH3[1]}'` });
  }

  if (h2Matches.length !== CANONICAL_H2.length) {
    issues.push({
      type: 'H2_COUNT_MISMATCH',
      file: relMd,
      message: `Erwartet exakt ${CANONICAL_H2.length} H2-Abschnitte (## 1. bis ## 8.), gefunden: ${h2Matches.length} (${h2Matches.map(h => '"' + h.title + '"').join(', ')}).`
    });
  }

  for (let i = 0; i < Math.min(h2Matches.length, CANONICAL_H2.length); i++) {
    if (!CANONICAL_H2[i].regex.test(h2Matches[i].title)) {
      issues.push({
        type: 'H2_TITLE_DRIFT',
        file: relMd,
        message: `Abschnitt ${i + 1} weicht vom Standard ab: gefunden "## ${h2Matches[i].title}", erwartet "${CANONICAL_H2[i].expected}".`
      });
    }
  }

  // Helper to slice section content by section prefix number
  function getSectionSlice(secNum) {
    const startMatch = mdNoCode.match(new RegExp(`^#{2,3}\\s+${secNum}\\.\\s+.+$`, 'm'));
    if (!startMatch) return '';
    const startIdx = startMatch.index + startMatch[0].length;
    const rest = mdNoCode.slice(startIdx);
    const nextMatch = rest.match(new RegExp(`^#{2,3}\\s+${secNum + 1}\\.\\s+.+$`, 'm'));
    return nextMatch ? rest.slice(0, nextMatch.index) : rest;
  }

  // --------------------------------------------------------------------------
  // 3. Symmetrie & Inhalt von Stufe 1 (Abschnitt 3), Stufe 2 (Abschnitt 4) & Rubrik (5)
  // --------------------------------------------------------------------------
  const sec3 = getSectionSlice(3);
  if (sec3) {
    if (!/\*\*Vorbereitung\s*[–-]\s*Starter-Kit untersuchen/i.test(sec3)) {
      issues.push({
        type: 'MISSING_PREP_BLOCK',
        file: relMd,
        message: 'In Stufe 1 fehlt der unnummerierte Einstiegsblock "**Vorbereitung – Starter-Kit untersuchen ...**".'
      });
    }

    const stage1Tasks = [...sec3.matchAll(/^\s*(\d+)\.\s+\*\*Aufgabe\s+(1\.\d+)\b/gm)].map(m => `${m[1]}:${m[2]}`);
    const expectedS1 = ['1:1.1', '2:1.2', '3:1.3', '4:1.4'];
    if (stage1Tasks.join(',') !== expectedS1.join(',')) {
      issues.push({
        type: 'STAGE1_TASK_ASYMMETRY',
        file: relMd,
        message: `Stufe 1 muss exakt 4 nummerierte Teilaufgaben (1. **Aufgabe 1.1 bis 4. **Aufgabe 1.4) besitzen. Gefunden: [${stage1Tasks.join(', ') || 'keine'}].`
      });
    }

    if (!/(Selbsttest|Referenzwert|Kontrollwert|Golden Reference)/i.test(sec3)) {
      issues.push({
        type: 'MISSING_SELF_TEST_NUMBERS',
        file: relMd,
        message: 'In Stufe 1 fehlt ein expliziter Selbsttest-/Referenzwert-Hinweis (5-Sekunden-Selbstkontrolle).'
      });
    }

    const task14Split = sec3.split(/\*\*Aufgabe\s+1\.4\b/)[1] || '';
    if (task14Split && (!/dotnet\s+test/i.test(task14Split) || !/Tests/i.test(task14Split))) {
      issues.push({
        type: 'TASK_1_4_UNIT_TEST_LINK',
        file: relMd,
        message: 'Aufgabe 1.4 muss explizit auf das Testprojekt (.Tests) und `dotnet test` verweisen.'
      });
    }
  }

  const sec4 = getSectionSlice(4);
  if (sec4) {
    if (!/^###\s+Track A\b/m.test(sec4) || !/^###\s+Track B\b/m.test(sec4)) {
      issues.push({ type: 'MISSING_TRACK_HEADINGS', file: relMd, message: 'In Stufe 2 müssen "### Track A ..." und "### Track B ..." vorhanden sein.' });
    }
    const trackATasks = [...sec4.matchAll(/^\s*(\d+)\.\s+\*\*Arbeitspaket\s+(A\.\d+)\b/gm)].map(m => `${m[1]}:${m[2]}`);
    const trackBTasks = [...sec4.matchAll(/^\s*(\d+)\.\s+\*\*Arbeitspaket\s+(B\.\d+)\b/gm)].map(m => `${m[1]}:${m[2]}`);
    const expectedA = ['1:A.1', '2:A.2', '3:A.3', '4:A.4'];
    const expectedB = ['1:B.1', '2:B.2', '3:B.3', '4:B.4'];

    if (trackATasks.join(',') !== expectedA.join(',')) {
      issues.push({
        type: 'TRACK_A_ASYMMETRY',
        file: relMd,
        message: `Track A muss exakt 4 Arbeitspakete (1. **Arbeitspaket A.1 bis 4. **Arbeitspaket A.4) besitzen. Gefunden: [${trackATasks.join(', ') || 'keine'}].`
      });
    }
    if (trackBTasks.join(',') !== expectedB.join(',')) {
      issues.push({
        type: 'TRACK_B_ASYMMETRY',
        file: relMd,
        message: `Track B muss exakt 4 Arbeitspakete (1. **Arbeitspaket B.1 bis 4. **Arbeitspaket B.4) besitzen. Gefunden: [${trackBTasks.join(', ') || 'keine'}].`
      });
    }
  }

  const sec5 = getSectionSlice(5);
  if (sec5) {
    const pointRows = [...sec5.matchAll(/^\|\s*(?!\*\*Gesamt\*\*)[^|]+\|\s*(\d+(?:[.,]\d+)?)\s*P\.\s*\|/gm)];
    const sum = pointRows.reduce((acc, m) => acc + parseFloat(m[1].replace(',', '.')), 0);
    const hasTotal10 = /\|\s*\*\*Gesamt\*\*\s*\|\s*\*\*10\s*P\.\*\*\s*\|/.test(sec5);
    if (pointRows.length === 0 || Math.abs(sum - 10) > 1e-6 || !hasTotal10) {
      issues.push({
        type: 'RUBRIC_SUM_MISMATCH',
        file: relMd,
        message: `Abschnitt 5 benötigt eine 10-Punkte-Bewertungsrubrik-Tabelle mit Summe = 10 P. und Zeile '| **Gesamt** | **10 P.** |' (gefundene Summe: ${sum} P.).`
      });
    }
  }

  const sec8 = getSectionSlice(8);
  if (sec8) {
    const qNums = [...sec8.matchAll(/^\s*(\d+)\.\s+\*\*/gm)].map(m => Number(m[1]));
    if (qNums.length < 4) {
      issues.push({ type: 'DEFENSE_QUESTIONS_COUNT', file: relMd, message: `Abschnitt 8 sollte mindestens 4 nummerierte Leitfragen enthalten (gefunden: ${qNums.length}).` });
    }
  }

  // --------------------------------------------------------------------------
  // 4. Kopplung gegen Uebung/Vorlage/ (.sln, .Tests, TODOs, WPF IsLoaded-Guard)
  // --------------------------------------------------------------------------
  const vorlageDir = path.join(uebungDir, 'Vorlage');
  if (!fs.existsSync(vorlageDir)) {
    issues.push({ type: 'MISSING_VORLAGE', file: rel(vorlageDir), message: 'Uebung/Vorlage/ Verzeichnis fehlt.' });
    return issues;
  }

  const slnFiles = fs.readdirSync(vorlageDir).filter(f => f.endsWith('.sln'));
  if (slnFiles.length !== 1) {
    issues.push({ type: 'VORLAGE_SLN_COUNT', file: rel(vorlageDir), message: `Erwartet exakt 1 .sln Datei in Uebung/Vorlage/, gefunden: ${slnFiles.length}.` });
  } else {
    const slnPath = path.join(vorlageDir, slnFiles[0]);
    const slnContent = fs.readFileSync(slnPath, 'utf8');
    const projMatches = [...slnContent.matchAll(/Project\("[^"]+"\)\s*=\s*"([^"]+)",\s*"([^"]+\.csproj)"/g)];
    if (projMatches.length < 2) {
      issues.push({ type: 'MISSING_TEST_PROJECT_IN_SLN', file: rel(slnPath), message: 'Solution muss sowohl das Hauptprojekt als auch das .Tests-Projekt einbinden.' });
    } else {
      if (projMatches[0][1].endsWith('.Tests')) {
        issues.push({ type: 'SLN_STARTUP_ORDER', file: rel(slnPath), message: 'Das ausführbare Hauptprojekt muss als erstes Projekt in der .sln stehen (vor .Tests).' });
      }
      if (!projMatches.some(p => p[1].endsWith('.Tests'))) {
        issues.push({ type: 'MISSING_TESTS_NAMING', file: rel(slnPath), message: 'Kein Testprojekt mit Namensschema <Projekt>.Tests in der .sln gefunden.' });
      }
    }
  }

  const codeFiles = walkFiles(vorlageDir, (_, name) => /\.(cs|xaml)$/i.test(name));
  let stage1Todos = 0;
  let stage2Todos = 0;

  for (const cf of codeFiles) {
    const content = fs.readFileSync(cf, 'utf8');
    checkLegacyTermsInText(content, rel(cf), issues);
    stage1Todos += (content.match(/TODO[^\r\n]*Stufe\s*1/gi) || []).length;
    stage2Todos += (content.match(/TODO[^\r\n]*Stufe\s*2/gi) || []).length;

    // Check XAML ValueChanged / SelectionChanged IsLoaded guard
    if (cf.toLowerCase().endsWith('.xaml')) {
      const csPath = cf + '.cs';
      if (fs.existsSync(csPath)) {
        const csContent = fs.readFileSync(csPath, 'utf8');
        const handlers = new Set(
          [...content.matchAll(/\b(?:ValueChanged|SelectionChanged)\s*=\s*"([^"]+)"/g)].map(m => m[1])
        );
        for (const handlerName of handlers) {
          const methodRegex = new RegExp(`void\\s+${handlerName}\\s*\\([\\s\\S]*?\\)\\s*\\{([\\s\\S]{0,400})`);
          const m = csContent.match(methodRegex);
          if (m && !/IsLoaded|==\s*null/.test(m[1])) {
            issues.push({
              type: 'MISSING_WPF_INIT_GUARD',
              file: rel(csPath),
              message: `Event-Handler '${handlerName}' wird aus XAML ValueChanged/SelectionChanged aufgerufen, besitzt aber keinen '!IsLoaded' / '== null' Schutz gegen NullReferenceException während InitializeComponent().`
            });
          }
        }
      }
    }
  }

  if (stage1Todos === 0) {
    issues.push({ type: 'MISSING_STAGE1_TODOS', file: rel(vorlageDir), message: 'Keine "TODO [Stufe 1 ...]"-Kommentare im Starter-Code von Vorlage/ gefunden.' });
  }
  if (stage2Todos === 0) {
    issues.push({ type: 'MISSING_STAGE2_TODOS', file: rel(vorlageDir), message: 'Keine "TODO [Stufe 2 ...]"-Kommentare im Starter-Code von Vorlage/ gefunden.' });
  }

  return issues;
}

function main() {
  const filterArg = process.argv[2] ? process.argv[2].padStart(2, '0') : null;
  const allDirs = fs.readdirSync(KAPITEL_DIR)
    .filter(d => fs.statSync(path.join(KAPITEL_DIR, d)).isDirectory() && /^\d\d_/.test(d))
    .sort();

  const targetDirs = filterArg
    ? allDirs.filter(d => d.startsWith(`${filterArg}_`))
    : allDirs;

  if (targetDirs.length === 0) {
    console.error(`[FEHLER] Kein Kapitel für Filter '${process.argv[2]}' gefunden.`);
    process.exit(1);
  }

  console.log('='.repeat(74));
  console.log(' ÜBUNGSBLATT-, VORLAGEN- & MOODLE-ARTEFAKT-LINTER');
  console.log('='.repeat(74));

  let totalIssues = 0;
  for (const dir of targetDirs) {
    const issues = lintChapter(dir);
    if (issues.length === 0) {
      console.log(`✅ ${dir}: 0 Befunde`);
    } else {
      console.log(`\n❌ ${dir}: ${issues.length} Befund(e)`);
      for (const iss of issues) {
        const loc = iss.line ? `${iss.file}:${iss.line}` : iss.file;
        console.log(`   [${iss.type}] ${loc}\n     -> ${iss.message}`);
      }
      totalIssues += issues.length;
    }
  }

  console.log('\n' + '='.repeat(74));
  if (totalIssues === 0) {
    console.log(` ERGEBNIS: ALLE GEPRÜFTEN KAPITEL (${targetDirs.length}) FEHLERFREI (0 Befunde)`);
    console.log('='.repeat(74));
    process.exit(0);
  } else {
    console.log(` ERGEBNIS: ${totalIssues} Befund(e) in ${targetDirs.length} geprüften Kapiteln.`);
    console.log('='.repeat(74));
    process.exit(1);
  }
}

main();
