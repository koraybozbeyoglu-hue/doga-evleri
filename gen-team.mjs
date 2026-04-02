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

const TEAM = [
  {
    file: 'images/avatar-deniz.jpg',
    prompt: 'Flat vector cartoon portrait illustration, Turkish woman in her 40s, warm friendly smile, architect, wearing casual professional attire, forest and nature background, earth tones and forest green color palette, clean minimalist illustration style, no text, no labels',
  },
  {
    file: 'images/avatar-koray.jpg',
    prompt: 'Flat vector cartoon portrait illustration, Turkish man in his 35s, confident friendly expression, project manager, clipboard or blueprint in hand, construction site background with green nature, earth tones, clean minimalist illustration style, no text, no labels',
  },
  {
    file: 'images/avatar-tunay.jpg',
    prompt: 'Flat vector cartoon portrait illustration, Turkish man in his 30s, calm intelligent expression, environmental engineer, holding a plant or leaf, nature and forest background, green tones, clean minimalist illustration style, no text, no labels',
  },
  {
    file: 'images/avatar-eifsu.jpg',
    prompt: 'Flat vector cartoon portrait illustration, Turkish woman in her 30s, professional confident smile, legal advisor lawyer, elegant attire, neutral office background with subtle nature elements, cream and earth tones, clean minimalist illustration style, no text, no labels',
  },
  {
    file: 'images/avatar-eren.jpg',
    prompt: 'Flat vector cartoon portrait illustration, Turkish man in his 30s, strong reliable expression, construction foreman, wearing a hard hat and work clothes, steel frame construction background, earth and steel tones, clean minimalist illustration style, no text, no labels',
  },
];

if (!HF_TOKEN) { console.error('Token gerekli: node gen-team.mjs hf_xxx'); process.exit(1); }

for (let i = 0; i < TEAM.length; i++) {
  const { file, prompt } = TEAM[i];
  process.stdout.write(`⏳ [${i+1}/${TEAM.length}] ${file} ... `);
  try {
    const buf = await generate(prompt);
    fs.writeFileSync(file, buf);
    console.log(`✅ (${(buf.length/1024).toFixed(0)} KB)`);
  } catch(e) {
    console.log(`❌ ${e.message}`);
  }
  if (i < TEAM.length - 1) await sleep(1500);
}
console.log('\nTüm avatarlar tamamlandı.');
