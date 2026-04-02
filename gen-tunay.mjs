import fs from 'fs';

const HF_TOKEN = process.env.HF_TOKEN || process.argv[2];
const API_URL = 'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell';

async function generate(prompt) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${HF_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: prompt, parameters: { width: 512, height: 512, num_inference_steps: 4 } }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

process.stdout.write('⏳ images/avatar-tunay.jpg ... ');
const buf = await generate(
  'Flat vector cartoon portrait illustration, Turkish man in his late 40s to early 50s, eldest brother, wise and calm expression, slight grey at temples, environmental engineer, holding a leaf or plant, nature and forest background, green tones, clean minimalist illustration style, no text, no labels'
);
fs.writeFileSync('images/avatar-tunay.jpg', buf);
console.log(`✅ (${(buf.length/1024).toFixed(0)} KB)`);
