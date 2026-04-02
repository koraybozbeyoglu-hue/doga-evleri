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

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const AVATARS = [
  {
    file: 'images/avatar-deniz.jpg',
    prompt: 'Flat vector illustration portrait of a Turkish woman named Deniz, friendly smile, nature architect, warm earth tones, minimalist cartoon style, round face, forest background, professional yet approachable, clean lines, no text',
  },
  {
    file: 'images/avatar-koray.jpg',
    prompt: 'Flat vector illustration portrait of a Turkish man named Koray, friendly confident smile, architect builder, earth tones green palette, minimalist cartoon style, forest and steel frame background, clean lines, no text',
  },
];

const token = HF_TOKEN;
if (!token) { console.error('Token gerekli'); process.exit(1); }

for (let i = 0; i < AVATARS.length; i++) {
  const { file, prompt } = AVATARS[i];
  process.stdout.write(`⏳ ${file} ... `);
  try {
    const buf = await generate(prompt);
    fs.writeFileSync(file, buf);
    console.log(`✅ (${(buf.length/1024).toFixed(0)} KB)`);
  } catch(e) {
    console.log(`❌ ${e.message}`);
  }
  if (i < AVATARS.length - 1) await sleep(1500);
}
console.log('Bitti.');
