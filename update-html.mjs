/**
 * Doğa Evleri — HTML Görsel Güncelleyici
 * Kullanım: node update-html.mjs
 * (generate-images.mjs çalıştırıldıktan sonra)
 */

import fs from 'fs';

const MAP = {
  // index.html galeri
  'loremflickr.com/600/800/pine,forest,cabin?lock=11':       'images/cabin-forest.jpg',
  'loremflickr.com/600/800/lake,nature,cabin?lock=22':       'images/cabin-lake.jpg',
  'loremflickr.com/600/800/valley,mountain,house?lock=33':   'images/cabin-valley.jpg',
  'loremflickr.com/600/800/river,forest,nature?lock=44':     'images/cabin-river.jpg',
  'loremflickr.com/600/800/highland,meadow,cabin?lock=55':   'images/cabin-highland.jpg',

  // projects.html grid
  'loremflickr.com/700/1000/pine,forest,cabin?lock=11':      'images/cabin-forest.jpg',
  'loremflickr.com/700/530/lake,nature,house?lock=22':       'images/cabin-lake.jpg',
  'loremflickr.com/700/930/valley,mountain,house?lock=33':   'images/cabin-valley.jpg',
  'loremflickr.com/700/700/river,forest,nature?lock=44':     'images/cabin-river.jpg',
  'loremflickr.com/700/1050/highland,meadow,cabin?lock=55':  'images/cabin-highland.jpg',
  'loremflickr.com/700/520/oak,forest,home?lock=66':         'images/cabin-oak.jpg',
  'loremflickr.com/700/930/misty,valley,forest?lock=77':     'images/cabin-mist.jpg',
  'loremflickr.com/700/700/plateau,mountain,nature?lock=88': 'images/cabin-plateau.jpg',

  // projects.html bg
  'loremflickr.com/1200/800/forest,nature,wide?lock=91':     'images/bg-projects.jpg',

  // about.html bg'ler
  'loremflickr.com/800/1200/forest,mist,nature?lock=71':     'images/bg-forest-mist.jpg',
  'loremflickr.com/900/700/cabin,wood,forest?lock=72':       'images/bg-approach.jpg',

  // about.html ekip
  'loremflickr.com/500/700/portrait,man,professional?lock=81':  'images/team-01.jpg',
  'loremflickr.com/500/700/portrait,woman,professional?lock=82':'images/team-02.jpg',
  'loremflickr.com/500/700/portrait,man,nature?lock=83':        'images/team-03.jpg',

  // contact.html
  'loremflickr.com/1400/900/misty,forest,nature?lock=61':    'images/bg-contact.jpg',
  'loremflickr.com/400/520/portrait,man,professional?lock=62':'images/portrait-founder.jpg',

  // process.html
  'loremflickr.com/900/506/land,meadow,nature?lock=51':      'images/process-land.jpg',
  'loremflickr.com/900/506/construction,steel,building?lock=52':'images/process-construction.jpg',

  // project-01.html hero
  'loremflickr.com/1600/900/pine,forest,cabin?lock=101':     'images/hero-project-01.jpg',

  // project-01.html aşamalar
  'loremflickr.com/800/600/land,meadow,forest?lock=102':     'images/phase-01-land.jpg',
  'loremflickr.com/800/600/construction,steel,frame?lock=103':'images/phase-02-frame.jpg',
  'loremflickr.com/800/600/cabin,forest,modern?lock=104':    'images/phase-03-complete.jpg',

  // project-01.html galeri detaylar
  'loremflickr.com/900/675/cabin,glass,forest?lock=111':     'images/detail-01-facade.jpg',
  'loremflickr.com/600/900/interior,wood,cozy?lock=112':     'images/detail-02-interior.jpg',
  'loremflickr.com/900/675/forest,view,nature?lock=113':     'images/detail-03-view.jpg',
  'loremflickr.com/900/600/wood,ceiling,architecture?lock=114':'images/detail-04-ceiling.jpg',
  'loremflickr.com/900/600/cabin,sunset,evening?lock=115':   'images/detail-05-evening.jpg',
  'loremflickr.com/900/600/steel,detail,architecture?lock=116':'images/detail-06-steel.jpg',

  // project-01.html next project
  'loremflickr.com/1400/600/lake,nature,house?lock=122':     'images/next-lake.jpg',
};

const FILES = ['index.html','about.html','projects.html','project-01.html','process.html','contact.html'];

let totalReplaced = 0;

for (const file of FILES) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  let replaced = 0;

  for (const [from, to] of Object.entries(MAP)) {
    const full = `https://${from}`;
    if (content.includes(full)) {
      content = content.split(full).join(to);
      replaced++;
    }
  }

  if (replaced > 0) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ ${file} — ${replaced} görsel güncellendi`);
    totalReplaced += replaced;
  }
}

console.log(`\n🎉 Toplam ${totalReplaced} referans güncellendi.`);
console.log('Şimdi: vercel --yes --prod --scope koraybozbeyoglu-hues-projects\n');
