const fs = require('fs');
const path = require('path');
const puppeteer = require('C:/Users/P28500/AppData/Roaming/npm/node_modules/@mermaid-js/mermaid-cli/node_modules/puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 560, height: 840 });

  const svgs = [
    'Mini_ForceDirected_Iter0.svg',
    'Mini_ForceDirected_Iter2.svg',
    'Mini_ForceDirected_Iter50_Ungedaempft.svg',
    'Mini_ForceDirected_Konvergenz.svg',
    'Mini_ForceDirected_Iter15.svg',
    'Mini_ForceDirected_Iter50.svg'
  ];

  const diagDir = path.resolve('Folien/04_Visualisierung_2D_Diagramme/Diagramme');
  for (const svg of svgs) {
    const svgPath = path.join(diagDir, svg);
    const content = fs.readFileSync(svgPath, 'utf8');
    await page.setContent(`<!DOCTYPE html><html><body style="margin:0; background:#eee; display:flex; justify-content:center; align-items:center; height:100vh;">${content}</body></html>`);
    const outPng = path.join(diagDir, svg.replace('.svg', '_preview.png'));
    const svgEl = await page.$('svg');
    if (svgEl) {
      await svgEl.screenshot({ path: outPng });
      console.log('Rasterized:', outPng);
    } else {
      console.log('Failed to find SVG element in:', svg);
    }
  }

  await browser.close();
})();
