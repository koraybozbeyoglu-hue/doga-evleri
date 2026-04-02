/**
 * Doğa Evleri — SEO Güncelleyici
 * Her sayfaya Open Graph, Schema.org, canonical ekler
 */
import fs from 'fs';

const SITE_URL = 'https://dogaevleri.tr'; // alan adı alınca değiştirilecek
const SITE_NAME = 'Doğa Evleri';
const LOGO = `${SITE_URL}/images/hero-forest.jpg`;

const PAGES = [
  {
    file: 'index.html',
    url: `${SITE_URL}/`,
    title: 'Doğa Evleri — Karkas Çelik Doğa Evi | Özel Tasarım',
    description: 'Orman, göl ve yayla arazileri için tamamen özel tasarlanan karkas çelik doğa evleri. Bolu, Abant, Sapanca, Kastamonu ve Türkiye genelinde. Ücretsiz ön görüşme.',
    image: `${SITE_URL}/images/hero-forest.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'Doğa Evleri',
      description: 'Karkas çelik strüktür üzerine, her arazi için sıfırdan özel tasarlanan tek katlı doğa evleri.',
      url: SITE_URL,
      telephone: '+905512635033',
      email: 'info@dogaevleri.com',
      founder: { '@type': 'Person', name: 'Deniz Bozbeyoğlu' },
      areaServed: ['Türkiye', 'Bolu', 'Abant', 'Sapanca', 'Düzce', 'Kastamonu', 'İstanbul'],
      serviceType: ['Doğa evi tasarımı', 'Karkas çelik inşaat', 'Arazi etüdü', 'Mimari proje'],
      image: `${SITE_URL}/images/hero-forest.jpg`,
      sameAs: [`https://wa.me/905512635033`],
    },
  },
  {
    file: 'about.html',
    url: `${SITE_URL}/about.html`,
    title: 'Felsefemiz — Doğa Evleri | Bozbeyoğlu Ailesi',
    description: 'Üç kardeşin hayali, şimdi sizin eviniz. Doğa Evleri\'nin kuruluş hikayesi, felsefesi ve ekibi hakkında.',
    image: `${SITE_URL}/images/bg-forest-mist.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Felsefemiz — Doğa Evleri',
      url: `${SITE_URL}/about.html`,
      description: 'Üç kardeşin hayali, şimdi sizin eviniz.',
      isPartOf: { '@id': `${SITE_URL}/#business` },
    },
  },
  {
    file: 'projects.html',
    url: `${SITE_URL}/projects.html`,
    title: 'Projeler — Doğa Evleri | Orman, Göl, Yayla Evleri',
    description: 'Doğa Evleri referans projeleri. Bolu çam ormanı, Abant göl kenarı, Sapanca vadi ve Kastamonu yayla evleri. Karkas çelik, özel tasarım.',
    image: `${SITE_URL}/images/bg-projects.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Projeler — Doğa Evleri',
      url: `${SITE_URL}/projects.html`,
      description: 'Orman, göl ve yayla arazilerinde tamamlanmış karkas çelik doğa evi projeleri.',
      isPartOf: { '@id': `${SITE_URL}/#business` },
    },
  },
  {
    file: 'process.html',
    url: `${SITE_URL}/process.html`,
    title: 'Nasıl Çalışırız — Doğa Evleri | 6 Adım İnşaat Süreci',
    description: 'Ücretsiz ön görüşmeden anahtar teslime 6 adım. Ortalama 6–8 ay inşaat süresi. Arazi etüdü, konsept tasarım, karkas çelik montaj ve teslim.',
    image: `${SITE_URL}/images/phase-02-frame.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Doğa Evi Yapım Süreci',
      url: `${SITE_URL}/process.html`,
      description: 'Ücretsiz ön görüşmeden anahtar teslime 6 adım.',
      step: [
        { '@type': 'HowToStep', name: 'Ön Görüşme', text: 'Arazi analizi, hayaller ve bütçe hakkında ücretsiz ilk sohbet.' },
        { '@type': 'HowToStep', name: 'Arazi Etüdü', text: 'Topoğrafya, güneş, rüzgar ve zemin analizi.' },
        { '@type': 'HowToStep', name: 'Konsept Tasarım', text: 'Araziye özel eskiz ve ilk plan önerisi.' },
        { '@type': 'HowToStep', name: 'Kesinleşmiş Proje', text: 'Mimari, statik ve elektro-mekanik projeler.' },
        { '@type': 'HowToStep', name: 'İnşaat', text: 'Karkas çelik montaj, kaplama, doğrama ve tesisat.' },
        { '@type': 'HowToStep', name: 'Teslim', text: 'Anahtar teslim, garanti ve bakım desteği.' },
      ],
    },
  },
  {
    file: 'contact.html',
    url: `${SITE_URL}/contact.html`,
    title: 'İletişim — Doğa Evleri | Ücretsiz Ön Görüşme',
    description: 'Doğa evi hayalinizi anlatın. Deniz Bozbeyoğlu ile WhatsApp veya form üzerinden iletişime geçin. Ücretsiz arazi analizi.',
    image: `${SITE_URL}/images/bg-contact.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'İletişim — Doğa Evleri',
      url: `${SITE_URL}/contact.html`,
      isPartOf: { '@id': `${SITE_URL}/#business` },
    },
  },
  {
    file: 'project-01.html',
    url: `${SITE_URL}/project-01.html`,
    title: 'Çam Ormanı Projesi, Bolu — Doğa Evleri',
    description: 'Bolu\'da çam ormanının içinde 120 m² karkas çelik doğa evi. Güney cephesi tamamen cam, tek çam kesilmedi. 4.5 ayda tamamlandı.',
    image: `${SITE_URL}/images/hero-project-01.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Çam Ormanı Projesi — Bolu',
      description: 'Bolu\'da çam ormanının içinde 120 m² karkas çelik doğa evi.',
      image: `${SITE_URL}/images/hero-project-01.jpg`,
      url: `${SITE_URL}/project-01.html`,
      author: { '@type': 'Organization', name: 'Doğa Evleri' },
      publisher: { '@id': `${SITE_URL}/#business` },
      datePublished: '2023-09-01',
    },
  },
];

const KEYWORDS = 'doğa evi, karkas çelik ev, orman evi, doğa evi Türkiye, özel tasarım ev, bolu orman evi, abant göl evi, sapanca doğa evi, kastamonu yayla evi, çelik ev, prefabrik değil, doğa evleri bozbeyoğlu';

function buildSEO(page) {
  return `
  <!-- ── SEO ── -->
  <meta name="keywords" content="${KEYWORDS}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Doğa Evleri — Bozbeyoğlu">
  <link rel="canonical" href="${page.url}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${page.url}">
  <meta property="og:image" content="${page.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="tr_TR">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="${page.image}">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  ${JSON.stringify(page.schema, null, 2)}
  </script>`;
}

for (const page of PAGES) {
  if (!fs.existsSync(page.file)) { console.log(`⏩ ${page.file} bulunamadı`); continue; }

  let html = fs.readFileSync(page.file, 'utf8');

  // Zaten eklenmişse atla
  if (html.includes('og:title')) {
    // Güncelle — eski SEO bloğunu sil ve yenisini ekle
    html = html.replace(/\n  <!-- ── SEO ── -->[\s\S]*?<\/script>/m, '');
  }

  // Mevcut title ve description'ı güncelle
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${page.description}">`);

  // SEO bloğunu description'dan sonra ekle
  html = html.replace(
    /(<meta name="description"[^>]*>)/,
    `$1\n${buildSEO(page)}`
  );

  fs.writeFileSync(page.file, html, 'utf8');
  console.log(`✅ ${page.file}`);
}

// robots.txt
fs.writeFileSync('robots.txt', `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
console.log('✅ robots.txt');

// sitemap.xml
const now = new Date().toISOString().split('T')[0];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><lastmod>${now}</lastmod><priority>1.0</priority></url>
  <url><loc>${SITE_URL}/projects.html</loc><lastmod>${now}</lastmod><priority>0.9</priority></url>
  <url><loc>${SITE_URL}/project-01.html</loc><lastmod>${now}</lastmod><priority>0.8</priority></url>
  <url><loc>${SITE_URL}/process.html</loc><lastmod>${now}</lastmod><priority>0.8</priority></url>
  <url><loc>${SITE_URL}/about.html</loc><lastmod>${now}</lastmod><priority>0.7</priority></url>
  <url><loc>${SITE_URL}/contact.html</loc><lastmod>${now}</lastmod><priority>0.7</priority></url>
</urlset>`;
fs.writeFileSync('sitemap.xml', sitemap);
console.log('✅ sitemap.xml');

console.log('\n🎉 SEO güncellemesi tamamlandı.');
