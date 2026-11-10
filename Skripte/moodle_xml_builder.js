const fs = require('fs');
const path = require('path');

function escapeXml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function stripHtmlAndMath(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<(?:\/?(?:p|strong|b|em|i|code|pre|br|ul|ol|li))\b[^>]*>/gi, '')
    .replace(/\\\(|\\\)/g, '')
    .replace(/\$/g, '')
    .replace(/`/g, '')
    .replace(/\*\*/g, '')
    .trim();
}

/**
 * Konvertiert HTML / Moodle-MathJax in sauberes Markdown (für den Export von Test_01..10.md)
 */
function toMarkdownText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<AllowUnsafeBlocks>true<\/AllowUnsafeBlocks>/g, '`<AllowUnsafeBlocks>true</AllowUnsafeBlocks>`')
    .replace(/\\\[([\s\S]*?)\\\]/g, '\n\n$$$$$1$$$$\n\n')
    .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$')
    .replace(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, code) => {
      const unescaped = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      return `\n\`\`\`csharp\n${unescaped.trim()}\n\`\`\`\n`;
    })
    .replace(/<code>([\s\S]*?)<\/code>/gi, (_, code) => {
      const unescaped = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      return `\`${unescaped}\``;
    })
    .replace(/<strong>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<b>([\s\S]*?)<\/b>/gi, '**$1**')
    .replace(/<em>([\s\S]*?)<\/em>/gi, '*$1*')
    .replace(/<i>([\s\S]*?)<\/i>/gi, '*$1*')
    .replace(/<br\s*\/?>/gi, '  \n')
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<ul>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<li>([\s\S]*?)<\/li>/gi, (_, item) => `* ${item.trim()}\n`)
    .replace(/&rarr;/g, '→')
    .replace(/&larr;/g, '←')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+\n/g, '  \n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Konvertiert Inline-Markdown (Code, Bold, Italic, Math) in Moodle-HTML mit MathJax \(...\)
 */
function inlineMdToHtml(str) {
  if (typeof str !== 'string') return '';
  const codeSpans = [];
  let s = str.replace(/`([^`\n]+)`/g, (_, code) => {
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    codeSpans.push(`<code>${escaped}</code>`);
    return `\x00CODE${codeSpans.length - 1}\x00`;
  });

  // Display & inline math -> Moodle MathJax
  s = s
    .replace(/\$\$([\s\S]*?)\$\$/g, '\\[$1\\]')
    .replace(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g, '\\($1\\)');

  // Bold & italic
  s = s
    .replace(/\*\*([^\*\n]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*([^\*\n]+)\*(?!\*)/g, '<em>$1</em>');

  // Restore code spans
  s = s.replace(/\x00CODE(\d+)\x00/g, (_, idx) => codeSpans[Number(idx)]);
  return s;
}

/**
 * Konvertiert mehrzeiliges Markdown (Absätze, Codeblöcke, Listen, Math) in Moodle-HTML
 */
function blockMdToHtml(md) {
  if (typeof md !== 'string') return '';
  const trimmed = md.trim();
  if (!trimmed) return '';

  const codeBlocks = [];
  let s = trimmed.replace(/```csharp\r?\n([\s\S]*?)```/g, (_, code) => {
    const escaped = code.trimEnd().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    codeBlocks.push(`<pre><code>${escaped}</code></pre>`);
    return `\n\n\x00BLOCKCODE${codeBlocks.length - 1}\x00\n\n`;
  });

  const blocks = s.split(/\r?\n\r?\n+/);
  const htmlBlocks = blocks.map(b => {
    const blk = b.trim();
    if (!blk) return '';
    const codeMatch = blk.match(/^\x00BLOCKCODE(\d+)\x00$/);
    if (codeMatch) {
      return codeBlocks[Number(codeMatch[1])];
    }
    const lines = blk.split(/\r?\n/);
    if (lines.every(l => /^\*\s+/.test(l.trim()))) {
      const items = lines.map(l => `  <li>${inlineMdToHtml(l.trim().replace(/^\*\s+/, ''))}</li>`).join('\n');
      return `<ul>\n${items}\n</ul>`;
    }
    if (lines.every(l => /^\d+\.\s+/.test(l.trim()))) {
      const items = lines.map(l => `  <li>${inlineMdToHtml(l.trim().replace(/^\d+\.\s+/, ''))}</li>`).join('\n');
      return `<ol>\n${items}\n</ol>`;
    }
    const joined = lines.map(l => inlineMdToHtml(l.replace(/\s{2,}$/, ''))).join('<br>');
    return `<p>${joined}</p>`;
  }).filter(Boolean);

  return htmlBlocks.join('');
}

function assertNoXmlControlChars(str, contextLabel) {
  if (typeof str !== 'string') return;
  const match = str.match(/[\x00-\x08\x0B\x0C\x0E-\x1F]/);
  if (match) {
    const code = match[0].charCodeAt(0);
    throw new Error(
      `[${contextLabel}] Ungültiges XML-Steuerzeichen (ASCII ${code} / 0x${code.toString(16)}) gefunden!`
    );
  }
}

/**
 * Validiert alle 10 Tests eines Quiz
 */
function validateQuizData(quizMeta, tests) {
  if (tests.length !== 10) {
    throw new Error(`[${quizMeta.quizId}] Erwartet 10 Tests, gefunden: ${tests.length}`);
  }

  tests.forEach(test => {
    if (test.questions.length !== 8) {
      throw new Error(`[${test.id}] Erwartet 8 Fragen, gefunden: ${test.questions.length}`);
    }

    let totalPoints = 0;
    test.questions.forEach(q => {
      const grade = parseFloat(q.grade || '1.0');
      totalPoints += grade;

      assertNoXmlControlChars(q.title, `${test.id} - ${q.id} title`);
      assertNoXmlControlChars(q.text, `${test.id} - ${q.id} text`);
      assertNoXmlControlChars(q.generalFeedback, `${test.id} - ${q.id} generalFeedback`);

      if (!q.generalFeedback || q.generalFeedback.trim().length < 20) {
        throw new Error(`[${test.id} - ${q.id}] Fehlendes oder zu kurzes generalFeedback!`);
      }

      if (q.type === 'multichoice') {
        if (!q.answers || q.answers.length !== 4) {
          throw new Error(`[${test.id} - ${q.id}] multichoice benötigt exakt 4 Antwortoptionen!`);
        }
        const lengths = q.answers.map(a => stripHtmlAndMath(a.text).length);
        const minLen = Math.min(...lengths);
        const maxLen = Math.max(...lengths);
        const ratio = (maxLen - minLen) / minLen;
        if (ratio > 0.25) {
          throw new Error(
            `[${test.id} - ${q.id}] Längen-Symmetrie verletzt: min=${minLen}, max=${maxLen}, Abweichung=${(ratio * 100).toFixed(1)}% (> 25.0%)!\n` +
            q.answers.map((a, i) => `  Opt ${i + 1} (${lengths[i]} chars): ${stripHtmlAndMath(a.text)}`).join('\n')
          );
        }
        q.answers.forEach((a, aIdx) => {
          if (!a.feedback || a.feedback.trim().length < 10) {
            throw new Error(`[${test.id} - ${q.id}] Option ${aIdx + 1} hat kein spezifisches Feedback!`);
          }
        });
      } else if (q.type === 'numerical') {
        if (!q.answers || q.answers.length < 1) {
          throw new Error(`[${test.id} - ${q.id}] numerical benötigt mindestens 1 Antwort!`);
        }
        q.answers.forEach((a, aIdx) => {
          if (!a.feedback || a.feedback.trim().length < 10) {
            throw new Error(`[${test.id} - ${q.id}] Numerische Antwort ${aIdx + 1} hat kein Feedback!`);
          }
        });
      } else if (q.type === 'gapselect') {
        if (!q.choices || q.choices.length < 4) {
          throw new Error(`[${test.id} - ${q.id}] gapselect benötigt Auswahloptionen (choices)!`);
        }
      } else if (q.type === 'ddwtos') {
        if (!q.dragboxes || q.dragboxes.length < 3) {
          throw new Error(`[${test.id} - ${q.id}] ddwtos benötigt dragboxes!`);
        }
      } else if (q.type === 'matching') {
        if (!q.subquestions || q.subquestions.length < 5) {
          throw new Error(`[${test.id} - ${q.id}] matching benötigt mind. 4 Paare + 1 Überhang-Distraktor!`);
        }
      } else if (q.type !== 'cloze') {
        throw new Error(`[${test.id} - ${q.id}] Unbekannter Fragetyp: ${q.type}`);
      }
    });

    if (Math.abs(totalPoints - 10.0) > 1e-4) {
      throw new Error(`[${test.id}] Punktesumme ist ${totalPoints.toFixed(2)} statt 10.00!`);
    }
  });
}

function buildQuestionXml(q, idx) {
  const grade = parseFloat(q.grade || 1.0).toFixed(7);
  const correctFb = '<p>Richtig! Ausgezeichnete ingenieurwissenschaftliche Analyse.</p>';
  const partialFb = '<p>Teilweise richtig. Prüfen Sie die verbleibenden Teilaspekte anhand der Musterherleitung.</p>';
  const incorrectFb = '<p>Leider nicht korrekt. Studieren Sie das detaillierte Feedback und die Musterherleitung.</p>';

  const questionHtml = blockMdToHtml(q.text);
  const generalFbHtml = blockMdToHtml(q.generalFeedback);

  let xml = `  <!-- Question ${idx + 1}: ${escapeXml(q.title)} (${q.type}, ${grade} Pkt.) -->\n`;

  if (q.type === 'cloze') {
    xml += `  <question type="cloze">\n`;
    xml += `    <name>\n      <text>${escapeXml(q.id)}: ${escapeXml(q.title)}</text>\n    </name>\n`;
    xml += `    <questiontext format="html">\n      <text><![CDATA[${questionHtml}]]></text>\n    </questiontext>\n`;
    xml += `    <generalfeedback format="html">\n      <text><![CDATA[${generalFbHtml}]]></text>\n    </generalfeedback>\n`;
    xml += `    <penalty>0.3333333</penalty>\n`;
    xml += `    <hidden>0</hidden>\n`;
    xml += `    <idnumber>${escapeXml(q.id)}</idnumber>\n`;
    xml += `  </question>\n\n`;
    return xml;
  }

  xml += `  <question type="${q.type}">\n`;
  xml += `    <name>\n      <text>${escapeXml(q.id)}: ${escapeXml(q.title)}</text>\n    </name>\n`;
  xml += `    <questiontext format="html">\n      <text><![CDATA[${questionHtml}]]></text>\n    </questiontext>\n`;
  xml += `    <generalfeedback format="html">\n      <text><![CDATA[${generalFbHtml}]]></text>\n    </generalfeedback>\n`;
  xml += `    <defaultgrade>${grade}</defaultgrade>\n`;
  xml += `    <penalty>0.3333333</penalty>\n`;
  xml += `    <hidden>0</hidden>\n`;
  xml += `    <idnumber>${escapeXml(q.id)}</idnumber>\n`;

  if (q.type === 'numerical') {
    q.answers.forEach(ans => {
      xml += `    <answer fraction="${ans.fraction}" format="moodle_auto_format">\n`;
      xml += `      <text>${ans.value}</text>\n`;
      xml += `      <feedback format="html">\n        <text><![CDATA[<p>${inlineMdToHtml(ans.feedback)}</p>]]></text>\n      </feedback>\n`;
      xml += `      <tolerance>${ans.tolerance !== undefined ? ans.tolerance : 0}</tolerance>\n`;
      xml += `    </answer>\n`;
    });
    xml += `    <unitgradingtype>0</unitgradingtype>\n`;
    xml += `    <unitpenalty>0.1000000</unitpenalty>\n`;
    xml += `    <showunits>3</showunits>\n`;
    xml += `    <unitsleft>0</unitsleft>\n`;
  } else if (q.type === 'multichoice') {
    const isSingle = q.single !== false;
    xml += `    <single>${isSingle ? 'true' : 'false'}</single>\n`;
    xml += `    <shuffleanswers>true</shuffleanswers>\n`;
    xml += `    <answernumbering>abc</answernumbering>\n`;
    xml += `    <showstandardinstruction>0</showstandardinstruction>\n`;
    xml += `    <correctfeedback format="html">\n      <text><![CDATA[${correctFb}]]></text>\n    </correctfeedback>\n`;
    xml += `    <partiallycorrectfeedback format="html">\n      <text><![CDATA[${partialFb}]]></text>\n    </partiallycorrectfeedback>\n`;
    xml += `    <incorrectfeedback format="html">\n      <text><![CDATA[${incorrectFb}]]></text>\n    </incorrectfeedback>\n`;
    xml += `    <shownumcorrect/>\n`;
    q.answers.forEach(ans => {
      xml += `    <answer fraction="${ans.fraction}" format="html">\n`;
      xml += `      <text><![CDATA[${inlineMdToHtml(ans.text)}]]></text>\n`;
      xml += `      <feedback format="html">\n        <text><![CDATA[<p>${inlineMdToHtml(ans.feedback)}</p>]]></text>\n      </feedback>\n`;
      xml += `    </answer>\n`;
    });
  } else if (q.type === 'gapselect') {
    xml += `    <shuffleanswers>1</shuffleanswers>\n`;
    xml += `    <correctfeedback format="html">\n      <text><![CDATA[${correctFb}]]></text>\n    </correctfeedback>\n`;
    xml += `    <partiallycorrectfeedback format="html">\n      <text><![CDATA[${partialFb}]]></text>\n    </partiallycorrectfeedback>\n`;
    xml += `    <incorrectfeedback format="html">\n      <text><![CDATA[${incorrectFb}]]></text>\n    </incorrectfeedback>\n`;
    xml += `    <shownumcorrect/>\n`;
    q.choices.forEach(ch => {
      xml += `    <selectoption>\n`;
      xml += `      <text><![CDATA[${ch.text}]]></text>\n`;
      xml += `      <group>${ch.group || 1}</group>\n`;
      xml += `    </selectoption>\n`;
    });
  } else if (q.type === 'ddwtos') {
    xml += `    <shuffleanswers>1</shuffleanswers>\n`;
    xml += `    <correctfeedback format="html">\n      <text><![CDATA[${correctFb}]]></text>\n    </correctfeedback>\n`;
    xml += `    <partiallycorrectfeedback format="html">\n      <text><![CDATA[${partialFb}]]></text>\n    </partiallycorrectfeedback>\n`;
    xml += `    <incorrectfeedback format="html">\n      <text><![CDATA[${incorrectFb}]]></text>\n    </incorrectfeedback>\n`;
    xml += `    <shownumcorrect/>\n`;
    q.dragboxes.forEach(db => {
      xml += `    <dragbox>\n`;
      xml += `      <text><![CDATA[${inlineMdToHtml(db.text)}]]></text>\n`;
      xml += `      <group>${db.group || 1}</group>\n`;
      xml += `    </dragbox>\n`;
    });
  } else if (q.type === 'matching') {
    xml += `    <shuffleanswers>true</shuffleanswers>\n`;
    xml += `    <correctfeedback format="html">\n      <text><![CDATA[${correctFb}]]></text>\n    </correctfeedback>\n`;
    xml += `    <partiallycorrectfeedback format="html">\n      <text><![CDATA[${partialFb}]]></text>\n    </partiallycorrectfeedback>\n`;
    xml += `    <incorrectfeedback format="html">\n      <text><![CDATA[${incorrectFb}]]></text>\n    </incorrectfeedback>\n`;
    xml += `    <shownumcorrect/>\n`;
    q.subquestions.forEach(sq => {
      xml += `    <subquestion format="html">\n`;
      xml += `      <text><![CDATA[${sq.text ? inlineMdToHtml(sq.text) : ''}]]></text>\n`;
      xml += `      <answer>\n        <text><![CDATA[${inlineMdToHtml(sq.answer)}]]></text>\n      </answer>\n`;
      xml += `    </subquestion>\n`;
    });
  }

  xml += `  </question>\n\n`;
  return xml;
}

function buildMasterXml(tests) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n`;
  tests.forEach(test => {
    xml += `  <!-- ========================================================= -->\n`;
    xml += `  <!-- ${escapeXml(test.title)} -->\n`;
    xml += `  <!-- ========================================================= -->\n`;
    xml += `  <question type="category">\n`;
    xml += `    <category>\n      <text>${test.category}</text>\n    </category>\n`;
    xml += `    <info format="html">\n      <text><![CDATA[<p>${test.title}</p>]]></text>\n    </info>\n`;
    xml += `  </question>\n\n`;
    test.questions.forEach((q, idx) => {
      xml += buildQuestionXml(q, idx);
    });
  });
  xml += `</quiz>\n`;
  return xml;
}

/**
 * Schreibt ein Quiz als modulare Markdown-Dateien (README.md + Test_01..10.md) in quizDir
 */
function writeQuizMarkdownFolder(quizDir, quizMeta, testsData) {
  fs.mkdirSync(quizDir, { recursive: true });
  const exportXmlName = `${quizMeta.quizId}.xml`;

  let readme = `# ${quizMeta.title}\n\n`;
  readme += `**Quiz-ID:** \`${quizMeta.quizId}\`  \n`;
  readme += `**Export-XML:** \`./${exportXmlName}\`  \n`;
  readme += `**Prüfungszeitpunkt:** ${quizMeta.terminInfo}  \n`;
  readme += `**Stoffabgrenzung (Rückwärts-Kausalität):** ${quizMeta.coveredChapters}  \n`;
  readme += `**Kausalitäts-Sperre:** ${quizMeta.tabooTopics}\n\n---\n\n`;
  readme += `## Übersicht der 10 Test-Varianten\n\n`;
  readme += `| Datei | Status | Q1 (\`cloze\`, 2,0 P.) | Q2 (\`numerical\`, 1,5 P.) | Q3 (\`numerical\` Code, 1,5 P.) | Q4 (\`gapselect\` C#, 1,0 P.) | Q5 (\`matching\`/\`ddwtos\`, 1,0 P.) |\n`;
  readme += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  testsData.forEach(t => {
    const status = t.isPractice ? '🟢 Vorbereitung' : '🔴 **Prüfung**';
    const sums = t.questions.slice(0, 5).map(q => toMarkdownText(q.shortSummary || q.title));
    readme += `| [\`${t.id}.md\`](./${t.id}.md) | ${status} | ${sums.join(' | ')} |\n`;
  });

  fs.writeFileSync(path.join(quizDir, 'README.md'), readme, 'utf8');

  testsData.forEach(test => {
    let md = `# ${test.title}\n\n`;
    md += `**Test-ID:** \`${test.id}\`  \n`;
    md += `**Kategorie:** \`${test.category}\`  \n`;
    md += `**Status:** ${test.isPractice ? '🟢 Vorbereitungstest (Freigegeben zum Üben)' : '🔴 Prüfungstest (Klausurpool)'}\n\n---\n\n`;

    test.questions.forEach((q, qIdx) => {
      md += `## Frage ${qIdx + 1} [${q.id}]: ${toMarkdownText(q.title)} *(${q.type}, ${parseFloat(q.grade || 1.0).toFixed(1)} Pkt.)*\n\n`;
      md += `${toMarkdownText(q.text)}\n\n`;

      if (q.type === 'multichoice') {
        md += `**Antwortoptionen (${q.single !== false ? 'Single-Choice' : 'Multiple-Select'}):**\n`;
        q.answers.forEach(a => {
          const mark = a.fraction > 0 ? `[x] **(${a.fraction}%)**` : `[ ] (${a.fraction}%)`;
          md += `* ${mark} ${toMarkdownText(a.text)}\n  * *Feedback:* ${toMarkdownText(a.feedback)}\n`;
        });
      } else if (q.type === 'numerical') {
        md += `**Automatische Bewertung & Teilpunkte (\`numerical\`):**\n`;
        q.answers.forEach(a => {
          md += `* **Wert \`${a.value}\` (± \`${a.tolerance || 0}\`) → ${a.fraction}%:** ${toMarkdownText(a.feedback)}\n`;
        });
      } else if (q.type === 'gapselect') {
        md += `**Dropdown-Optionen (\`gapselect\`):**\n`;
        q.choices.forEach((ch, cIdx) => {
          md += `* \`[[${cIdx + 1}]]\` (Gruppe ${ch.group}): \`${ch.text}\`\n`;
        });
      } else if (q.type === 'ddwtos') {
        md += `**Drag-and-Drop-Bausteine (\`ddwtos\`):**\n`;
        q.dragboxes.forEach((db, dIdx) => {
          md += `* \`[[${dIdx + 1}]]\` (Gruppe ${db.group || 1}): \`${toMarkdownText(db.text)}\`\n`;
        });
      } else if (q.type === 'matching') {
        md += `**Zuordnungspaare & Überhang-Distraktoren (\`matching\`):**\n`;
        q.subquestions.forEach(sq => {
          if (sq.text) {
            md += `* ${toMarkdownText(sq.text)} $\\to$ **${toMarkdownText(sq.answer)}**\n`;
          } else {
            md += `* *(Überhang-Distraktor)* $\\to$ ${toMarkdownText(sq.answer)}\n`;
          }
        });
      }

      md += `\n**Musterherleitung & Gesamt-Feedback:**\n\n${toMarkdownText(q.generalFeedback)}\n\n---\n\n`;
    });

    fs.writeFileSync(path.join(quizDir, `${test.id}.md`), md.trim() + '\n', 'utf8');
  });
}

/**
 * Parst eine einzelne Test_XX_*.md Datei zurück in ein Test-Objekt
 */
function parseTestMarkdownFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const idMatch = raw.match(/\*\*Test-ID:\*\*\s*`([^`]+)`/);
  const catMatch = raw.match(/\*\*Kategorie:\*\*\s*`([^`]+)`/);
  const statusMatch = raw.match(/\*\*Status:\*\*\s*(.+)$/m);

  if (!titleMatch || !idMatch || !catMatch) {
    throw new Error(`Ungültiger Header in ${filePath}`);
  }

  const test = {
    id: idMatch[1].trim(),
    title: titleMatch[1].trim(),
    category: catMatch[1].trim(),
    isPractice: statusMatch ? statusMatch[1].includes('Vorbereitung') : filePath.includes('Vorbereitung'),
    questions: []
  };

  // Split by "## Frage "
  const parts = raw.split(/\n## Frage \d+\s+/);
  for (let i = 1; i < parts.length; i++) {
    const block = parts[i];
    const headerLineEnd = block.indexOf('\n');
    const headerLine = block.slice(0, headerLineEnd).trim();
    const hMatch = headerLine.match(/^\[([^\]]+)\]:\s*(.+?)\s*\*\(([a-z]+),\s*([0-9.]+)\s*Pkt\.\)\*$/);
    if (!hMatch) {
      throw new Error(`[${test.id}] Ungültiger Fragen-Header: "${headerLine}"`);
    }

    const q = {
      id: hMatch[1].trim(),
      title: hMatch[2].trim(),
      type: hMatch[3].trim(),
      grade: parseFloat(hMatch[4])
    };

    const body = block.slice(headerLineEnd + 1).replace(/\n---\s*$/, '').trim();
    const fbSplit = body.split(/\n\*\*Musterherleitung & Gesamt-Feedback:\*\*\n+/);
    if (fbSplit.length !== 2) {
      throw new Error(`[${test.id} - ${q.id}] Abschnitt "**Musterherleitung & Gesamt-Feedback:**" fehlt!`);
    }

    q.generalFeedback = fbSplit[1].trim();
    const mainPart = fbSplit[0].trim();

    if (q.type === 'cloze') {
      q.text = mainPart;
    } else if (q.type === 'multichoice') {
      const mcSplit = mainPart.split(/\n\*\*Antwortoptionen \((Single-Choice|Multiple-Select)\):\*\*\n+/);
      if (mcSplit.length !== 3) {
        throw new Error(`[${test.id} - ${q.id}] Antwortoptionen-Block fehlt!`);
      }
      q.text = mcSplit[0].trim();
      q.single = mcSplit[1].trim() === 'Single-Choice';
      q.answers = [];
      const optRegex = /^\*\s+\[[x ]\]\s+(?:\*\*\(([+-]?\d+)%\)\*\*|\(([+-]?\d+)%\))\s+(.+)\n\s+\*\s+\*Feedback:\*\s+(.+)$/gm;
      let m;
      while ((m = optRegex.exec(mcSplit[2])) !== null) {
        const frac = parseInt(m[1] !== undefined ? m[1] : m[2], 10);
        q.answers.push({
          fraction: frac,
          text: m[3].trim(),
          feedback: m[4].trim()
        });
      }
    } else if (q.type === 'numerical') {
      const numSplit = mainPart.split(/\n\*\*Automatische Bewertung & Teilpunkte \(`numerical`\):\*\*\n+/);
      if (numSplit.length !== 2) {
        throw new Error(`[${test.id} - ${q.id}] numerical-Bewertungsblock fehlt!`);
      }
      q.text = numSplit[0].trim();
      q.answers = [];
      const ansRegex = /^\*\s+\*\*Wert `([^`]+)` \(± `([^`]+)`\) → (\d+)%:\*\*\s+(.+)$/gm;
      let m;
      while ((m = ansRegex.exec(numSplit[1])) !== null) {
        q.answers.push({
          value: parseFloat(m[1]),
          tolerance: parseFloat(m[2]),
          fraction: parseInt(m[3], 10),
          feedback: m[4].trim()
        });
      }
    } else if (q.type === 'gapselect') {
      const gapSplit = mainPart.split(/\n\*\*Dropdown-Optionen \(`gapselect`\):\*\*\n+/);
      if (gapSplit.length !== 2) {
        throw new Error(`[${test.id} - ${q.id}] gapselect-Block fehlt!`);
      }
      q.text = gapSplit[0].trim();
      q.choices = [];
      const chRegex = /^\*\s+`\[\[\d+\]\]` \(Gruppe (\d+)\): `(.*)`$/gm;
      let m;
      while ((m = chRegex.exec(gapSplit[1])) !== null) {
        q.choices.push({
          group: parseInt(m[1], 10),
          text: m[2]
        });
      }
    } else if (q.type === 'ddwtos') {
      const ddSplit = mainPart.split(/\n\*\*Drag-and-Drop-Bausteine \(`ddwtos`\):\*\*\n+/);
      if (ddSplit.length !== 2) {
        throw new Error(`[${test.id} - ${q.id}] ddwtos-Block fehlt!`);
      }
      q.text = ddSplit[0].trim();
      q.dragboxes = [];
      const dbRegex = /^\*\s+`\[\[\d+\]\]` \(Gruppe (\d+)\): `(.*)`$/gm;
      let m;
      while ((m = dbRegex.exec(ddSplit[1])) !== null) {
        q.dragboxes.push({
          group: parseInt(m[1], 10),
          text: m[2]
        });
      }
    } else if (q.type === 'matching') {
      const matchSplit = mainPart.split(/\n\*\*Zuordnungspaare & Überhang-Distraktoren \(`matching`\):\*\*\n+/);
      if (matchSplit.length !== 2) {
        throw new Error(`[${test.id} - ${q.id}] matching-Block fehlt!`);
      }
      q.text = matchSplit[0].trim();
      q.subquestions = [];
      const lines = matchSplit[1].trim().split('\n');
      lines.forEach(line => {
        const distMatch = line.match(/^\*\s+\*\(Überhang-Distraktor\)\*\s+\$\\to\$\s+(.+)$/);
        if (distMatch) {
          q.subquestions.push({ text: '', answer: distMatch[1].trim() });
        } else {
          const pairMatch = line.match(/^\*\s+(.+?)\s+\$\\to\$\s+\*\*(.+)\*\*$/);
          if (pairMatch) {
            q.subquestions.push({ text: pairMatch[1].trim(), answer: pairMatch[2].trim() });
          }
        }
      });
    }

    test.questions.push(q);
  }

  return test;
}

/**
 * Liest einen Quiz-Ordner (Kapitel/<XX_Kapitel>/Quiz/) mit README.md + Test_01..10.md ein,
 * validiert alle 10 Tests und kompiliert optional Kapitel/<XX_Kapitel>/Quiz/<quizId>.xml
 */
function processQuizFolder(quizDir, options = { writeXml: true }) {
  const readmePath = path.join(quizDir, 'README.md');
  if (!fs.existsSync(readmePath)) {
    return null;
  }
  const readmeRaw = fs.readFileSync(readmePath, 'utf8');
  const titleMatch = readmeRaw.match(/^#\s+(.+)$/m);
  const quizIdMatch = readmeRaw.match(/\*\*Quiz-ID:\*\*\s*`([^`]+)`/);
  if (!quizIdMatch) return null;

  const quizMeta = {
    quizId: quizIdMatch[1].trim(),
    title: titleMatch ? titleMatch[1].trim() : quizIdMatch[1].trim()
  };

  const testFiles = fs.readdirSync(quizDir)
    .filter(f => /^Test_\d+_.*\.md$/.test(f))
    .sort();

  const testsData = testFiles.map(f => parseTestMarkdownFile(path.join(quizDir, f)));
  validateQuizData(quizMeta, testsData);

  if (options.writeXml) {
    const outPath = path.join(quizDir, `${quizMeta.quizId}.xml`);
    fs.writeFileSync(outPath, buildMasterXml(testsData), 'utf8');
    const relOut = path.relative(path.resolve(__dirname, '..'), outPath).replace(/\\/g, '/');
    console.log(`[OK] ${quizMeta.quizId}: 10 Tests (80 Fragen) validiert -> ${relOut}`);
  } else {
    console.log(`[OK] ${quizMeta.quizId}: 10 Tests (80 Fragen) in ${ path.relative(path.resolve(__dirname, '..'), quizDir) } fehlerfrei validiert.`);
  }

  return { quizMeta, testsData };
}

function runCli() {
  const isCheckOnly = process.argv.includes('--check');
  const kapitelRoot = path.resolve(__dirname, '..', 'Kapitel');
  const sectionDirs = fs.readdirSync(kapitelRoot, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => path.join(kapitelRoot, d.name, 'Quiz'))
    .filter(qDir => fs.existsSync(path.join(qDir, 'README.md')));

  if (sectionDirs.length === 0) {
    console.log('Keine 10-Varianten-Quiz-Ordner (Moodle/*/Quiz/README.md) gefunden.');
    return;
  }

  sectionDirs.forEach(qDir => {
    processQuizFolder(qDir, { writeXml: !isCheckOnly });
  });
}

if (require.main === module) {
  runCli();
}

module.exports = {
  validateQuizData,
  writeQuizMarkdownFolder,
  processQuizFolder
};
