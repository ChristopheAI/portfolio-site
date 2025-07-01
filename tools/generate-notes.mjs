#!/usr/bin/env node
import fs from 'node:fs/promises';

const csv = await fs.readFile('tools/vlaamse-benchmark-v2.csv', 'utf8');
const lines = csv.trim().split(/\r?\n/).slice(1);
const rows = lines.map(l => {
  const match = l.match(/^"([^"]+)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"/);
  if (!match) return null;
  const [, url, hero, cta, kpi, trust] = match;
  return { url, hero, cta, kpi, trust };
}).filter(Boolean);

let md = '# Vlaamse Portfolio Benchmark Notes\n\n| Site | Hero | CTA | Trust? | Screenshot | Notes |\n|------|------|-----|---------|------------|-------|\n';
for (const r of rows) {
  const host = new URL(r.url).hostname.replace(/[^a-z0-9.-]/gi, '_');
  const screenshotPath = `tools/screens/${host}.png`;
  md += `| ${r.url} | ${r.hero || '-'} | ${r.cta || '-'} | ${r.trust} | ![](${screenshotPath}) |  |\n`;
}
await fs.mkdir('research', { recursive: true });
await fs.writeFile('research/research-notes.md', md);
console.log('research/research-notes.md generated'); 