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
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/\\\(|\\\)/g, '')
    .replace(/\$/g, '')
    .trim();
}

/**
 * Konvertiert Moodle-MathJax-Delimiter \( ... \) und \[ ... \] sowie HTML-Tags in Standard-Markdown mit $...$ und $$...$$
 */
function toMarkdownText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\\\[([\s\S]*?)\\\]/g, '\n\n$$$$$1$$$$\n\n')
    .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$')
    .replace(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '\n```csharp\n$1\n```\n')
    .replace(/<code>([\s\S]*?)<\/code>/gi, '`$1`')
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
    .replace(/<li>([\s\S]*?)<\/li>/gi, '* $1\n')
    .replace(/&rarr;/g, '→')
    .replace(/&larr;/g, '←')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Konvertiert versehentliche Markdown-LaTeX-Delimiter $...$ in Moodle-MathJax-Delimiter \( ... \) für XML
 */
function toMoodleXmlMath(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\$\$([\s\S]*?)\$\$/g, '\\[$1\\]')
    .replace(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g, '\\($1\\)');
}

function assertNoXmlControlChars(str, contextLabel) {
  if (typeof str !== 'string') return;
  const match = str.match(/[\x00-\x08\x0B\x0C\x0E-\x1F]/);
  if (match) {
    const code = match[0].charCodeAt(0);
    throw new Error(
      `[${contextLabel}] Ungültiges XML-Steuerzeichen (ASCII ${code} / 0x${code.toString(16)}) gefunden! ` +
      `Typische Ursache: Unmaskiertes LaTeX wie \\frac (\\f = FormFeed 12), \\tau/\\text (\\t), \\beta (\\b). Verwende doppelte Backslashes \\\\frac!`
    );
  }
}

/**
 * Validiert alle 10 Tests eines Quiz auf:
 * - Exakt 10 Tests (3 Vorbereitung, 7 Prüfung)
 * - Exakt 8 Fragen und 10.0 Punkte pro Test
 * - Längen-Symmetrie (max. 25 % Abweichung) bei allen multichoice-Fragen
 * - Vorhandensein von spezifischem Feedback bei allen Antworten
 * - Freiheit von verbotenen XML-Steuerzeichen (z. B. \f aus unmaskiertem \frac)
 */
function validateQuizData(quizMeta, tests) {
  if (tests.length !== 10) {
    throw new Error(`[${quizMeta.quizId}] Erwartet 10 Tests, gefunden: ${tests.length}`);
  }

  tests.forEach((test, tIdx) => {
    if (test.questions.length !== 8) {
      throw new Error(`[${test.id}] Erwartet 8 Fragen, gefunden: ${test.questions.length}`);
    }

    let totalPoints = 0;
    test.questions.forEach((q, qIdx) => {
      const grade = parseFloat(q.grade || '1.0');
      totalPoints += grade;

      assertNoXmlControlChars(q.title, `${test.id} - ${q.id} title`);
      assertNoXmlControlChars(q.text, `${test.id} - ${q.id} text`);
      assertNoXmlControlChars(q.generalFeedback, `${test.id} - ${q.id} generalFeedback`);
      if (q.answers) {
        q.answers.forEach((a, i) => {
          assertNoXmlControlChars(a.text, `${test.id} - ${q.id} ans[${i}].text`);
          assertNoXmlControlChars(a.feedback, `${test.id} - ${q.id} ans[${i}].feedback`);
        });
      }
      if (q.subquestions) {
        q.subquestions.forEach((sq, i) => {
          assertNoXmlControlChars(sq.text, `${test.id} - ${q.id} sq[${i}].text`);
          assertNoXmlControlChars(sq.answer, `${test.id} - ${q.id} sq[${i}].answer`);
        });
      }

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
  const correctFb = toMoodleXmlMath(q.correctFeedback || '<p>Richtig! Ausgezeichnete ingenieurwissenschaftliche Analyse.</p>');
  const partialFb = toMoodleXmlMath(q.partiallyCorrectFeedback || '<p>Teilweise richtig. Prüfen Sie die verbleibenden Teilaspekte anhand der Musterherleitung.</p>');
  const incorrectFb = toMoodleXmlMath(q.incorrectFeedback || '<p>Leider nicht korrekt. Studieren Sie das detaillierte Feedback und die Musterherleitung.</p>');

  let xml = `  <!-- Question ${idx + 1}: ${escapeXml(q.title)} (${q.type}, ${grade} Pkt.) -->\n`;

  if (q.type === 'cloze') {
    xml += `  <question type="cloze">\n`;
    xml += `    <name>\n      <text>${escapeXml(q.id)}: ${escapeXml(q.title)}</text>\n    </name>\n`;
    xml += `    <questiontext format="html">\n      <text><![CDATA[${toMoodleXmlMath(q.text)}]]></text>\n    </questiontext>\n`;
    xml += `    <generalfeedback format="html">\n      <text><![CDATA[${toMoodleXmlMath(q.generalFeedback)}]]></text>\n    </generalfeedback>\n`;
    xml += `    <penalty>0.3333333</penalty>\n`;
    xml += `    <hidden>0</hidden>\n`;
    xml += `    <idnumber>${escapeXml(q.id)}</idnumber>\n`;
    xml += `  </question>\n\n`;
    return xml;
  }

  xml += `  <question type="${q.type}">\n`;
  xml += `    <name>\n      <text>${escapeXml(q.id)}: ${escapeXml(q.title)}</text>\n    </name>\n`;
  xml += `    <questiontext format="html">\n      <text><![CDATA[${toMoodleXmlMath(q.text)}]]></text>\n    </questiontext>\n`;
  xml += `    <generalfeedback format="html">\n      <text><![CDATA[${toMoodleXmlMath(q.generalFeedback)}]]></text>\n    </generalfeedback>\n`;
  xml += `    <defaultgrade>${grade}</defaultgrade>\n`;
  xml += `    <penalty>0.3333333</penalty>\n`;
  xml += `    <hidden>0</hidden>\n`;
  xml += `    <idnumber>${escapeXml(q.id)}</idnumber>\n`;

  if (q.type === 'numerical') {
    q.answers.forEach(ans => {
      xml += `    <answer fraction="${ans.fraction}" format="moodle_auto_format">\n`;
      xml += `      <text>${ans.value}</text>\n`;
      xml += `      <feedback format="html">\n        <text><![CDATA[<p>${toMoodleXmlMath(ans.feedback)}</p>]]></text>\n      </feedback>\n`;
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
      xml += `      <text><![CDATA[${toMoodleXmlMath(ans.text)}]]></text>\n`;
      xml += `      <feedback format="html">\n        <text><![CDATA[<p>${toMoodleXmlMath(ans.feedback)}</p>]]></text>\n      </feedback>\n`;
      xml += `    </answer>\n`;
    });
  } else if (q.type === 'gapselect') {
    xml += `    <shuffleanswers>${q.shuffle !== false ? 1 : 0}</shuffleanswers>\n`;
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
    xml += `    <shuffleanswers>${q.shuffle !== false ? 1 : 0}</shuffleanswers>\n`;
    xml += `    <correctfeedback format="html">\n      <text><![CDATA[${correctFb}]]></text>\n    </correctfeedback>\n`;
    xml += `    <partiallycorrectfeedback format="html">\n      <text><![CDATA[${partialFb}]]></text>\n    </partiallycorrectfeedback>\n`;
    xml += `    <incorrectfeedback format="html">\n      <text><![CDATA[${incorrectFb}]]></text>\n    </incorrectfeedback>\n`;
    xml += `    <shownumcorrect/>\n`;
    q.dragboxes.forEach(db => {
      xml += `    <dragbox>\n`;
      xml += `      <text><![CDATA[${toMoodleXmlMath(db.text)}]]></text>\n`;
      xml += `      <group>${db.group || 1}</group>\n`;
      if (db.infinite) {
        xml += `      <infinite/>\n`;
      }
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
      xml += `      <text><![CDATA[${toMoodleXmlMath(sq.text || '')}]]></text>\n`;
      xml += `      <answer>\n        <text><![CDATA[${toMoodleXmlMath(sq.answer)}]]></text>\n      </answer>\n`;
      xml += `    </subquestion>\n`;
    });
  }

  xml += `  </question>\n\n`;
  return xml;
}

function buildMoodleXmlForTest(test) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n`;
  xml += `  <question type="category">\n`;
  xml += `    <category>\n      <text>${test.category}</text>\n    </category>\n`;
  xml += `    <info format="html">\n      <text><![CDATA[<p>${test.title}</p>]]></text>\n    </info>\n`;
  xml += `  </question>\n\n`;

  test.questions.forEach((q, idx) => {
    xml += buildQuestionXml(q, idx);
  });

  xml += `</quiz>\n`;
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

function buildMarkdownDoc(quizMeta, tests) {
  let md = `# Moodle-Testkatalog: ${quizMeta.title}\n`;
  md += `## Lehrveranstaltung: Systemsimulation / Digitaler Zwilling\n`;
  md += `**Studiengang:** B.Sc. Automatisierungstechnik, Campus Wels, FH Oberösterreich  \n`;
  md += `**Dozent:** Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme  \n`;
  md += `**Prüfungszeitpunkt:** ${quizMeta.terminInfo} (erste 15 Minuten vor dem Theorie-Impuls)  \n`;
  md += `**Stoffabgrenzung (Rückwärts-Kausalität):** ${quizMeta.coveredChapters}  \n`;
  md += `**Kausalitäts-Sperre:** ${quizMeta.tabooTopics}  \n\n---\n\n`;

  md += `## 1. Didaktisches Einsatz-, Fragetypen- & Feedbackkonzept (100 % Auto-Grading)\n\n`;
  md += `Dieser Katalog umfasst **10 eigenständige, äquivalente Test-Varianten** mit jeweils **8 Fragen und 10,0 Punkten** (insgesamt 80 kalibrierte Fragen für 15 Minuten Bearbeitungszeit):\n`;
  md += `* **3 Vorbereitungstests (\`Test_01\` bis \`Test_03\`):** Werden den Studierenden vorab im Moodle-Kursraum zum unbegrenzten Üben mit sofortigem, detailliertem Antwort- und Lösungsfeedback freigeschaltet.\n`;
  md += `* **7 Prüfungstests (\`Test_04\` bis \`Test_10\`):** Bilden den geschützten Klausurpool. Zu Beginn des Prüfungstermins wird **zufällig genau 1 Test** für die 15-minütige Präsenzprüfung gezogen. Um bloßes Auswendiglernen der Vorbereitungstests auszuschließen, variieren die Prüfungstests nicht nur Zahlenwerte, sondern systematisch auch die **gesuchte Zielgröße / Rechenrichtung** sowie die Code- und Diagnose-Szenarien.\n\n`;
  md += `### Voller Moodle-Fragetypen-Mix (100 % automatische Auswertung, 0 Min. Korrekturaufwand):\n`;
  md += `1. **Frage 1 (2,0 Pkt. – \`cloze\`):** Mehrstufige Ingenieursberechnung mit 2 eingebetteten numerischen Teilfeldern (Zwischenschritt + Endergebnis) für faire automatische Teilpunkte bei Folgefehlern.\n`;
  md += `2. **Frage 2 (1,5 Pkt. – \`numerical\`):** Physikalisch-numerische Berechnung mit Toleranzintervall sowie automatischen \`50 %\`-Teilpunkten für typische Einheiten-/Vorzeichenfallen.\n`;
  md += `3. **Frage 3 (1,5 Pkt. – \`numerical\`):** C#-Code-Tracing (Bestimmung des exakten numerischen Variablen-/Pufferzustands nach Codeausführung inkl. \`50 %\`-Teilpunkte-Falle).\n`;
  md += `4. **Frage 4 (1,0 Pkt. – \`gapselect\`):** Inline-C#-Code-Lückentext (*„Fill in the C# Code“*) mit 3 gruppierten Dropdown-Lücken \`[[1]]\`, \`[[2]]\`, \`[[3]]\` direkt im Programmcode.\n`;
  md += `5. **Frage 5 (1,0 Pkt. – \`matching\` / \`ddwtos\`):** Konzept-/Architektur-Zuordnung mit Überhang-Distraktoren (\`matching\`) bzw. Pipeline-Reihenfolge per Drag-and-Drop (\`ddwtos\`).\n`;
  md += `6. **Frage 6 (1,0 Pkt. – \`multichoice\`, Single-Choice):** Konzept- und Phänomen-Diagnose (4 längensymmetrische Optionen A–D, max. 25 % Längendifferenz).\n`;
  md += `7. **Frage 7 (1,0 Pkt. – \`multichoice\`, Single-Choice):** Subtile C#-Code-Bug-Diagnose (*„Find the Bug“*, 4 längensymmetrische Optionen A–D).\n`;
  md += `8. **Frage 8 (1,0 Pkt. – \`multichoice\`, Multiple-Select):** Vernetzte Systemanalyse (4 längensymmetrische Optionen A–D, 2 richtig mit \`+50 %\`, 2 falsch mit \`-50 %\`).\n\n---\n\n`;

  md += `## 2. Übersichtstabelle aller 10 Tests\n\n`;
  md += `| Test-ID | Status | Q1 (\`cloze\`, 2,0 P.) | Q2 (\`numerical\`, 1,5 P.) | Q3 (\`numerical\` Code, 1,5 P.) | Q4 (\`gapselect\` C#, 1,0 P.) | Q5 (\`matching\`/\`ddwtos\`, 1,0 P.) |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;
  tests.forEach(t => {
    const status = t.isPractice ? '🟢 Vorbereitung' : '🔴 **Prüfung**';
    const q1Sum = toMarkdownText(t.questions[0].shortSummary || t.questions[0].title);
    const q2Sum = toMarkdownText(t.questions[1].shortSummary || t.questions[1].title);
    const q3Sum = toMarkdownText(t.questions[2].shortSummary || t.questions[2].title);
    const q4Sum = toMarkdownText(t.questions[3].shortSummary || t.questions[3].title);
    const q5Sum = toMarkdownText(t.questions[4].shortSummary || t.questions[4].title);
    md += `| **${t.id}** | ${status} | ${q1Sum} | ${q2Sum} | ${q3Sum} | ${q4Sum} | ${q5Sum} |\n`;
  });
  md += `\n---\n\n## 3. Detaillierter Fragen- & Lösungskatalog (Alle 10 Tests)\n\n`;

  tests.forEach((test, tIdx) => {
    md += `### ${test.title}\n`;
    md += `**Kategorie:** \`${test.category}\`  \n`;
    md += `**Status:** ${test.isPractice ? '🟢 Vorbereitungstest (Freigegeben in Moodle)' : '🔴 Gewerteter Prüfungstest (Zufallsauswahl im Hörsaal)'}  \n\n`;

    test.questions.forEach((q, qIdx) => {
      md += `#### Frage ${tIdx + 1}.${qIdx + 1}: ${toMarkdownText(q.title)} *(${q.type}, ${parseFloat(q.grade || 1.0).toFixed(1)} Pkt.)*\n\n`;
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

      md += `\n**Musterherleitung & Gesamt-Feedback:**\n${toMarkdownText(q.generalFeedback)}\n\n---\n\n`;
    });
  });

  return md;
}

function exportMoodleQuiz(quizMeta, testsData) {
  validateQuizData(quizMeta, testsData);

  const baseMoodleDir = path.resolve(__dirname, '..', quizMeta.moodleDir);
  const xmlSubDir = path.join(baseMoodleDir, 'XML_Tests');

  if (!fs.existsSync(xmlSubDir)) {
    fs.mkdirSync(xmlSubDir, { recursive: true });
  }

  console.log('='.repeat(70));
  console.log(` GENERIERE 10 MOODLE-XML TESTS FÜR ${quizMeta.quizId}`);
  console.log('='.repeat(70));

  testsData.forEach((test, i) => {
    const fileName = `${test.id}.xml`;
    const filePath = path.join(xmlSubDir, fileName);
    const xmlContent = buildMoodleXmlForTest(test);
    fs.writeFileSync(filePath, xmlContent, 'utf8');
    console.log(`  [${i + 1}/10] Exportiert: XML_Tests/${fileName} (${test.questions.length} Fragen, 10.0 Pkt.)`);
  });

  const masterXmlPath = path.join(baseMoodleDir, quizMeta.masterXmlFileName);
  fs.writeFileSync(masterXmlPath, buildMasterXml(testsData), 'utf8');
  console.log(`\n  [OK] Master-XML erstellt: ${path.basename(masterXmlPath)}`);

  const mdPath = path.join(baseMoodleDir, 'Uebersicht_10_Moodle_Tests.md');
  fs.writeFileSync(mdPath, buildMarkdownDoc(quizMeta, testsData), 'utf8');
  console.log(`  [OK] Markdown-Katalog erstellt: ${path.basename(mdPath)}`);
  console.log('='.repeat(70));
}

module.exports = { exportMoodleQuiz };
