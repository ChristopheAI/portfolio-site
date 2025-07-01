#!/usr/bin/env node
import fs from 'node:fs/promises';
import fetch from 'node-fetch';

const sites = (await fs.readFile('tools/sites.txt', 'utf8'))
  .split(/\r?\n/).filter(Boolean).map(u => u.startsWith('http')?u:`https://${u}`);

const results = [];
for (const url of sites) {
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=desktop`;
  try {
    const res = await fetch(api);
    const json = await res.json();
    const perf = json.lighthouseResult?.categories?.performance?.score ?? null;
    const lcp = json.lighthouseResult?.audits?.['largest-contentful-paint']?.numericValue ?? null;
    results.push({url, perf, lcp});
    console.log(`Done ${url}`);
    await new Promise(r=>setTimeout(r,1500)); // polite delay
  } catch(e) {
    results.push({url, perf:null, lcp:null});
  }
}

let csv='url,performance_score,lcp_ms\n';
for(const r of results){csv+=`${r.url},${r.perf ?? ''},${r.lcp ?? ''}\n`}
await fs.writeFile('tools/performance.csv',csv);
console.log('tools/performance.csv generated'); 