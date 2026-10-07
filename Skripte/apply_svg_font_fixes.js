const fs = require('fs');
const path = require('path');

// Helper to fix mermaid tooltips and classDiagram fonts
function fixSvg(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [target, replacement] of replacements) {
    content = content.replace(target, replacement);
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed:', filePath);
}

// 1. Chapter 09 Diagramme
const ch9Diagrams = [
  'Folien/09_Dynamische_Modelle_Diskret/Diagramme/Warteschlangensystem.svg',
  'Folien/09_Dynamische_Modelle_Diskret/Diagramme/Produktionssystem.svg',
  'Folien/09_Dynamische_Modelle_Diskret/Diagramme/Computernetzwerk.svg'
];
ch9Diagrams.forEach(p => {
  fixSvg(p, [
    [/font-size:12px/g, 'font-size:16px']
  ]);
});

// 2. Chapter 09 Normal Distribution
fixSvg('Folien/09_Dynamische_Modelle_Diskret/Illustrationen/Normal_Distribution_PDF.svg', [
  [/font-size="10px"/g, 'font-size="16px"'],
  [/font-size:10px/g, 'font-size:16px'],
  [/font-size:12px/g, 'font-size:16px']
]);

let cdfContent = fs.readFileSync('Folien/09_Dynamische_Modelle_Diskret/Illustrationen/Normal_Distribution_CDF.svg', 'utf8');
if (!cdfContent.includes('font-size:16px')) {
  cdfContent = cdfContent.replace('</defs>', '<style>text { font-size: 16px; }</style></defs>');
  fs.writeFileSync('Folien/09_Dynamische_Modelle_Diskret/Illustrationen/Normal_Distribution_CDF.svg', cdfContent, 'utf8');
  console.log('Fixed: Normal_Distribution_CDF.svg');
}

// 3. Chapter 10 UML Class Diagrams
const ch10Uml = [
  'Quellen/WS25/SFunctionHybrid/Block.svg',
  'Quellen/WS25/SFunctionHybrid/Declaration.svg',
  'Quellen/WS25/SFunctionHybrid/SampleTime.svg',
  'Quellen/WS25/SFunctionHybrid/Solver.svg'
];
ch10Uml.forEach(p => {
  fixSvg(p, [
    [/font-size:10px/g, 'font-size:18px'],
    [/font-size:11px/g, 'font-size:18px'],
    [/font-size:12px/g, 'font-size:18px'],
    [/font-size:16px/g, 'font-size:18px']
  ]);
});

// 4. Chapter 10 other Diagrams
const ch10Diagrams = [
  'Folien/10_Dynamische_Modelle_Hybrid/Diagramme/Solver_Logik.svg',
  'Folien/10_Dynamische_Modelle_Hybrid/Diagramme/Example_BouncingBallNaive.svg',
  'Folien/10_Dynamische_Modelle_Hybrid/Diagramme/Example_BouncingBallExtended.svg',
  'Folien/10_Dynamische_Modelle_Hybrid/Diagramme/Example_DiscreteSampleTime.svg',
  'Folien/10_Dynamische_Modelle_Hybrid/Diagramme/Example_VariableSampleTime.svg'
];
ch10Diagrams.forEach(p => {
  fixSvg(p, [
    [/font-size:12px/g, 'font-size:16px']
  ]);
});
