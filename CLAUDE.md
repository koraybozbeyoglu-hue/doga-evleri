# Bozbeyoğlu — Proje Dosyası

## Proje Tanımı

**Doğa Evleri** — Karkas çelik strüktür üzerine, her arazi için sıfırdan özel tasarlanan tek katlı doğa evleri.

- Konteyner ev değil, prefabrik değil: tamamen özel tasarım
- Her yapı o arazinin topoğrafyasına, güneş yönüne ve peyzajına göre şekillenir
- Yapım süreci ortalama 6–8 ay
- Hizmet bölgesi: Türkiye geneli (özellikle İstanbul çevresi, Bolu, Abant, Sapanca, Düzce, Kastamonu)

---

## Hizmetler

1. **Ön Görüşme (Ücretsiz)** — Arazi analizi, hayaller ve bütçe hakkında ilk sohbet
2. **Arazi Etüdü** — Topoğrafya, güneş, rüzgar, zemin analizi; yerinde inceleme
3. **Konsept Tasarım** — Araziye özel eskiz ve ilk plan önerisi
4. **Kesinleşmiş Proje** — Mimari, statik ve elektro-mekanik projeler
5. **İnşaat** — Karkas çelik montaj, kaplama, doğrama, tesisat; şeffaf süreç
6. **Teslim & Sonrası** — Anahtar teslim, garanti ve bakım desteği

---

## Hedef Kitle

- Arazi sahibi olup ne yapacağını bilemeyenler
- Şehirden kaçıp doğada yaşamak isteyenler (city escapees)
- Hafta sonu ya da tam zamanlı doğa evi hayali kuranlar
- Doğa, orman, göl veya yayla arazisi olan kişiler
- 35–60 yaş arası, orta-üst gelir, estetik ve kaliteye değer veren bireyler

---

## Web Sitesi Gereksinimleri

**Teknik Stack:**
- Saf HTML / CSS / JavaScript (framework yok)
- Three.js (3D animasyonlar — procedural, GLTF yok)
- GSAP + ScrollTrigger (scroll animasyonları)
- Google Fonts: Cormorant Garamond + DM Sans

**Sayfalar:**
- `index.html` — Ana sayfa: hero 3D, scroll hikayesi, projeler galerisi, iletişim
- `about.html` — Felsefemiz: ekip, değerler, manifesto
- `projects.html` — Projeler grid/masonry
- `project-01.html` — Proje detay sayfası (Çam Ormanı Projesi, Bolu)
- `process.html` — Nasıl Çalışırız: 6 adım süreci
- `contact.html` — İletişim formu + harita

**Renk Paleti:**
```
--color-earth:  #6B4F3A   (toprak kahvesi)
--color-forest: #1C3A1E   (koyu orman yeşili)
--color-stone:  #8C8C7A   (taş gri)
--color-cream:  #F5F0E8   (krem)
--color-gold:   #C8A96E   (altın vurgu)
--color-dark:   #0F1A0F   (gece ormanı — arkaplan)
--color-text:   #2C2C2C   (metin)
```

**Tipografi:**
- Başlıklar: Cormorant Garamond (serif, italic vurgu)
- Gövde: DM Sans (sans-serif, 300–400 weight)

**Tasarım İlkeleri:**
- Ton: şiirsel, güvenilir, satış odaklı değil
- Dark background üzerine cream/gold kontrast
- Özel cursor (gold nokta + ring)
- Scroll-triggered reveal animasyonları
- Mobil responsive (nav collapse, tek kolon grid)

---

## Notlar

- **Dil:** Tamamen Türkçe
- **İletişim:** WhatsApp butonu (`https://wa.me/905001234567`)
- **Deploy:** Vercel — `https://bozbeyoglu.vercel.app` (scope: koraybozbeyoglu-hues-projects)
- **Vercel güncelleme komutu:** `vercel --yes --prod --scope koraybozbeyoglu-hues-projects`
- Görseller: Unsplash (doğa / orman / ev / inşaat temalı)
- index.html scroll story: 5 faz — boş arazi → çelik iskelet → form → peyzaj → yaşam
