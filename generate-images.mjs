/**
 * Doğa Evleri — AI Görsel Üretici
 * Hugging Face Inference API (ücretsiz)
 * Kullanım: node generate-images.mjs HF_TOKEN_BURAYA
 */

import fs from 'fs';
import path from 'path';

const HF_TOKEN = process.env.HF_TOKEN || process.argv[2];

if (!HF_TOKEN) {
  console.error('❌  Kullanım: node generate-images.mjs hf_xxxxxxxxxxxxx');
  console.error('   Token almak için: https://huggingface.co/settings/tokens');
  process.exit(1);
}

const MODEL = 'black-forest-labs/FLUX.1-schnell';
const API_URL = `https://router.huggingface.co/hf-inference/models/${MODEL}`;
const OUT_DIR = './images';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

// Üretilecek görseller
const IMAGES = [
  // ── HERO & BÜYÜK ARKAPLANLAR ──────────────────────────────────────────
  {
    file: 'hero-forest.jpg',
    prompt: 'A modern single-story cabin nestled in a dense pine forest, floor-to-ceiling glass windows reflecting trees, steel frame construction visible, golden hour light, cinematic photography',
  },
  {
    file: 'bg-projects.jpg',
    prompt: 'Wide aerial view of lush green Turkish forest with misty hills, dawn light, nature landscape photography',
  },
  {
    file: 'bg-forest-mist.jpg',
    prompt: 'Mystical morning mist drifting through ancient pine forest, soft diffused light, moody atmospheric nature photography',
  },
  {
    file: 'bg-contact.jpg',
    prompt: 'Dense misty forest at dawn, fog between tall trees, tranquil nature, cinematic wide shot',
  },
  {
    file: 'bg-approach.jpg',
    prompt: 'Rustic modern cabin exterior with weathered wood cladding in lush forest, architectural photography',
  },

  // ── PROJE KARTI GÖRSELLERİ (index + projects sayfası) ─────────────────
  {
    file: 'cabin-forest.jpg',
    prompt: 'Elegant modern cabin hidden among tall pine trees, large glass facade, steel frame, surrounded by ferns, architectural photography, natural materials',
  },
  {
    file: 'cabin-lake.jpg',
    prompt: 'Minimalist lake house on the shore of a serene mountain lake, panoramic windows reflecting water, contemporary nature architecture',
  },
  {
    file: 'cabin-valley.jpg',
    prompt: 'Contemporary hillside home overlooking a green valley, dramatic mountain backdrop, cantilevered terrace, evening light',
  },
  {
    file: 'cabin-river.jpg',
    prompt: 'Small modern house beside a babbling forest stream, wooden deck over water, lush greenery, peaceful nature retreat',
  },
  {
    file: 'cabin-highland.jpg',
    prompt: 'Isolated mountain cabin on an open highland meadow, wildflowers in foreground, rolling hills, clear blue sky',
  },
  {
    file: 'cabin-oak.jpg',
    prompt: 'Charming nature home surrounded by ancient oak trees, dappled light through canopy, cozy stone and wood exterior',
  },
  {
    file: 'cabin-mist.jpg',
    prompt: 'House emerging from valley morning mist, ethereal fog surrounds structure, moody atmospheric nature photography',
  },
  {
    file: 'cabin-plateau.jpg',
    prompt: 'Mountain cabin on rocky plateau, panoramic view of distant peaks, rugged landscape, golden hour photography',
  },

  // ── PROJE-01 HERO ───────────────────────────────────────────────────────
  {
    file: 'hero-project-01.jpg',
    prompt: 'Award-winning modern forest cabin in Bolu Turkey, floor-to-ceiling windows, steel frame structure, surrounded by tall pines, cinematic wide angle, golden hour',
  },

  // ── PROJE-01 AŞAMALAR ──────────────────────────────────────────────────
  {
    file: 'phase-01-land.jpg',
    prompt: 'Empty forest land plot before construction, tall pine trees, natural terrain, site survey marker, soft morning light',
  },
  {
    file: 'phase-02-frame.jpg',
    prompt: 'Steel frame skeleton of a modern cabin under construction in forest, galvanized steel beams, blue sky visible, construction site',
  },
  {
    file: 'phase-03-complete.jpg',
    prompt: 'Completed modern cabin in pine forest, clean lines, wood cladding, large windows, lush green surroundings, architectural photography',
  },

  // ── PROJE-01 GALERİ DETAYLARı ─────────────────────────────────────────
  {
    file: 'detail-01-facade.jpg',
    prompt: 'Floor-to-ceiling glass facade of modern forest cabin, steel frame structure visible, pine trees reflection in glass, architectural detail',
  },
  {
    file: 'detail-02-interior.jpg',
    prompt: 'Warm cozy interior of modern cabin, exposed wood ceiling beams, natural light flooding through large windows, forest view outside',
  },
  {
    file: 'detail-03-view.jpg',
    prompt: 'View from inside modern cabin looking through large glass window into dense pine forest, peaceful and serene',
  },
  {
    file: 'detail-04-ceiling.jpg',
    prompt: 'Architectural detail of wooden ceiling structure in modern nature cabin, warm oak beams, natural materials, interior design',
  },
  {
    file: 'detail-05-evening.jpg',
    prompt: 'Modern forest cabin at dusk with warm golden light glowing through large windows, surrounded by dark silhouette trees, magical atmosphere',
  },
  {
    file: 'detail-06-steel.jpg',
    prompt: 'Close-up architectural detail of galvanized steel connection joint in modern cabin frame, precision engineering, industrial meets nature',
  },

  // ── SÜREÇ SAYFASI ──────────────────────────────────────────────────────
  {
    file: 'process-land.jpg',
    prompt: 'Site analysis on a natural forest plot, architect with clipboard measuring land, topography assessment, daylight',
  },
  {
    file: 'process-construction.jpg',
    prompt: 'Steel frame house construction progress, workers assembling galvanized steel structure, forest background, professional construction site',
  },

  // ── NEXT PROJECT (project-01 → project-02) ─────────────────────────────
  {
    file: 'next-lake.jpg',
    prompt: 'Panoramic view of a serene mountain lake with modern lakeside cabin in background, misty morning, Abant Turkey atmosphere',
  },

  // ── EKİP PORTRELERİ ───────────────────────────────────────────────────
  {
    file: 'team-01.jpg',
    prompt: 'Professional portrait of a 40s Turkish male architect outdoors in nature, confident and warm expression, natural light, forest background, candid style',
  },
  {
    file: 'team-02.jpg',
    prompt: 'Professional portrait of a 35s Turkish female civil engineer, smart and approachable, natural outdoor setting, warm daylight',
  },
  {
    file: 'team-03.jpg',
    prompt: 'Portrait of a 38s landscape designer outdoors among plants, thoughtful expression, natural garden setting, soft afternoon light',
  },
  {
    file: 'portrait-founder.jpg',
    prompt: 'Warm professional portrait of a 45s Turkish man, founder expression, natural light, subtle outdoor background, trustworthy and approachable',
  },
];

async function generateImage(prompt, width = 1024, height = 768) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: { width, height, num_inference_steps: 4 },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HTTP ${res.status}: ${err.substring(0, 200)}`);
  }

  const buf = await res.arrayBuffer();
  return Buffer.from(buf);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log(`\n🌿 Doğa Evleri — AI Görsel Üretici`);
  console.log(`📁 Çıktı: ${path.resolve(OUT_DIR)}`);
  console.log(`🖼  ${IMAGES.length} görsel üretilecek\n`);

  let ok = 0, skip = 0, fail = 0;

  for (let i = 0; i < IMAGES.length; i++) {
    const { file, prompt } = IMAGES[i];
    const outPath = path.join(OUT_DIR, file);

    if (fs.existsSync(outPath)) {
      console.log(`⏩ [${i+1}/${IMAGES.length}] ${file} — zaten var, atlanıyor`);
      skip++;
      continue;
    }

    process.stdout.write(`⏳ [${i+1}/${IMAGES.length}] ${file} ... `);

    try {
      const buf = await generateImage(prompt);
      fs.writeFileSync(outPath, buf);
      console.log(`✅ kaydedildi (${(buf.length/1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.log(`❌ HATA: ${e.message}`);
      fail++;
    }

    // Rate limit: her istekten sonra 1.5s bekle
    if (i < IMAGES.length - 1) await sleep(1500);
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Başarılı : ${ok}`);
  console.log(`⏩ Atlandı  : ${skip}`);
  console.log(`❌ Hata     : ${fail}`);
  console.log(`\nŞimdi: node update-html.mjs\n`);
}

main().catch(console.error);
