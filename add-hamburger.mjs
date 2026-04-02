/**
 * Tüm HTML sayfalarına hamburger menü ekler (index.html hariç, o zaten eklendi)
 */
import fs from 'fs';

const HAMBURGER_CSS = `
    /* ── HAMBURGer ── */
    .nav-hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 32px; height: 32px;
      background: none; border: none;
      cursor: pointer; padding: 0;
      z-index: 600;
    }
    .nav-hamburger span {
      display: block; width: 100%; height: 1px;
      background: var(--color-cream);
      transition: transform 0.35s var(--ease-out), opacity 0.35s;
      transform-origin: center;
    }
    .nav-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
    .nav-hamburger.open span:nth-child(2) { opacity: 0; }
    .nav-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

    /* ── MOBİL MENÜ PANELİ ── */
    .nav-mobile {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(10,20,10,0.97);
      backdrop-filter: blur(16px);
      z-index: 550;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s var(--ease-out);
    }
    .nav-mobile.open {
      opacity: 1;
      pointer-events: all;
    }
    .nav-mobile a {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2rem, 8vw, 3.2rem);
      font-weight: 300;
      letter-spacing: 0.06em;
      color: var(--color-cream);
      text-decoration: none;
      opacity: 0.7;
      transition: opacity 0.3s, color 0.3s;
    }
    .nav-mobile a:hover { opacity: 1; color: var(--color-gold); }`;

const HAMBURGER_RESPONSIVE = `
      .nav-hamburger { display: flex; }
      .nav-mobile { display: flex; }`;

const HAMBURGER_JS = `
  // ── MOBİL MENÜ ──
  (function() {
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  })();`;

const PAGES = {
  'about.html': {
    navHtml: `<a href="index.html" class="nav-logo">Doğa Evleri</a>`,
    links: `    <a href="index.html">Ana Sayfa</a>\n    <a href="projects.html">Projeler</a>\n    <a href="process.html">Süreç</a>\n    <a href="contact.html">İletişim</a>`,
  },
  'projects.html': {
    links: `    <a href="index.html">Ana Sayfa</a>\n    <a href="about.html">Felsefemiz</a>\n    <a href="process.html">Süreç</a>\n    <a href="contact.html">İletişim</a>`,
  },
  'process.html': {
    links: `    <a href="index.html">Ana Sayfa</a>\n    <a href="about.html">Felsefemiz</a>\n    <a href="projects.html">Projeler</a>\n    <a href="contact.html">İletişim</a>`,
  },
  'contact.html': {
    links: `    <a href="index.html">Ana Sayfa</a>\n    <a href="about.html">Felsefemiz</a>\n    <a href="projects.html">Projeler</a>\n    <a href="process.html">Süreç</a>`,
  },
  'project-01.html': {
    links: `    <a href="index.html">Ana Sayfa</a>\n    <a href="about.html">Felsefemiz</a>\n    <a href="projects.html">Projeler</a>\n    <a href="contact.html">İletişim</a>`,
  },
};

for (const [file, cfg] of Object.entries(PAGES)) {
  if (!fs.existsSync(file)) { console.log(`⏩ ${file} — bulunamadı`); continue; }
  let html = fs.readFileSync(file, 'utf8');

  // 1. CSS ekle (nav-links a:hover sonrasına)
  const cssAnchor = html.includes('.nav-links a:hover, .nav-links a.active')
    ? '.nav-links a:hover, .nav-links a.active { color: var(--color-cream); }'
    : '.nav-links a:hover { color: var(--color-cream); }';
  if (!html.includes('.nav-hamburger') && html.includes(cssAnchor)) {
    html = html.replace(cssAnchor, cssAnchor + '\n' + HAMBURGER_CSS);
  }

  // 2. @media responsive'e ekle
  const mediaAnchor = '.nav-links { display: none; }';
  if (!html.includes('.nav-hamburger { display: flex; }') && html.includes(mediaAnchor)) {
    html = html.replace(mediaAnchor, mediaAnchor + HAMBURGER_RESPONSIVE);
  }

  // 3. Nav HTML: hamburger butonu + mobil menü
  // Kapatma </nav> öncesine hamburger, sonrasına panel ekle
  const navClose = '</nav>';
  const hamburgerBtn = `\n    <button class="nav-hamburger" id="hamburger" aria-label="Menü">\n      <span></span><span></span><span></span>\n    </button>`;
  const mobilePanel = `\n\n  <!-- ── MOBİL MENÜ ── -->\n  <div class="nav-mobile" id="mobileMenu">\n${cfg.links}\n  </div>`;

  if (!html.includes('id="hamburger"') && html.includes(navClose)) {
    html = html.replace(navClose, hamburgerBtn + '\n  ' + navClose + mobilePanel);
  }

  // 4. JS ekle (</script> öncesine ya da </body> öncesine)
  if (!html.includes('MOBİL MENÜ') && html.includes('</script>')) {
    html = html.replace('</script>', HAMBURGER_JS + '\n  </script>');
  } else if (!html.includes('MOBİL MENÜ')) {
    html = html.replace('</body>', `  <script>${HAMBURGER_JS}\n  </script>\n</body>`);
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`✅ ${file}`);
}
console.log('\nBitti.');
