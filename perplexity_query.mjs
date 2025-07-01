import process from 'node:process';
import https from 'https';

/**
 * Small CLI helper to query Perplexity Sonar models.
 * Usage:  node perplexity_query.mjs "your prompt here"
 */

const apiKey = process.env.PERPLEXITY_API_KEY;
if (!apiKey) {
  console.error('❌ PERPLEXITY_API_KEY not set in environment.');
  process.exit(1);
}

const prompt = process.argv.slice(2).join(' ') || 'Give me an example query.';

const data = JSON.stringify({
  model: 'sonar-pro',
  messages: [
    { role: 'system', content: 'Answer succinctly in markdown and cite sources if available.' },
    { role: 'user', content: prompt }
  ],
  temperature: 0.7,
  max_tokens: 512
});

const options = {
  method: 'POST',
  hostname: 'api.perplexity.ai',
  path: '/chat/completions',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => (body += chunk));
  res.on('end', () => {
    try {
      const json = JSON.parse(body);
      const reply = json?.choices?.[0]?.message?.content ?? body;
      console.log('\n📥 Perplexity reply:\n');
      console.log(reply);
    } catch (e) {
      console.error('Failed to parse response:', e);
      console.error(body);
    }
  });
});

req.on('error', err => {
  console.error('Request error:', err);
});

req.write(data);
req.end(); 