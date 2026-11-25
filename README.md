<div align="center">

# ms.dev — Maxmanazar Sultonov

**Backend Developer portfoliosi** · REST API · Telegram botlar · AI integratsiyalar

[![Live Demo](https://img.shields.io/badge/Live%20Demo-maxmanazar025.github.io-f59e0b?style=for-the-badge&logo=githubpages&logoColor=white)](https://maxmanazar025.github.io)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?style=for-the-badge&logo=github)](https://pages.github.com/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![No Framework](https://img.shields.io/badge/framework-yo'q-555?style=flat-square)
![No Build](https://img.shields.io/badge/build-shart_emas-555?style=flat-square)

<br />

<img src="assets/img/screenshots/home.jpg" alt="Bosh sahifa" width="49%" />
<img src="assets/img/screenshots/work.jpg" alt="Loyihalar sahifasi" width="49%" />

**[🌐 Jonli sayt](https://maxmanazar025.github.io)** · **[Loyihalar](https://maxmanazar025.github.io/work/)** · **[Blog](https://maxmanazar025.github.io/blog/)** · **[Labs](https://maxmanazar025.github.io/labs/)** · **[Aloqa](https://maxmanazar025.github.io/contact/)**

</div>

---

## Mundarija

- [Loyiha haqida](#loyiha-haqida)
- [Imkoniyatlar](#imkoniyatlar)
- [Tech stack](#tech-stack)
- [Arxitektura](#arxitektura)
- [Papka tuzilmasi](#papka-tuzilmasi)
- [Lokal ishga tushirish](#lokal-ishga-tushirish)
- [Deploy](#deploy)
- [Kontentni tahrirlash](#kontentni-tahrirlash)
- [Ishlash, qulaylik va maxfiylik](#ishlash-qulaylik-va-maxfiylik)
- [Muallif](#muallif)

---

## Loyiha haqida

Bu — Toshkentlik Backend Developer, PDP University talabasi **Maxmanazar Sultonov**ning shaxsiy portfoliosi, blogi va interaktiv tajribalar maydonchasi.

Sayt ataylab **framework'siz va build bosqichisiz** qurilgan: faqat statik HTML, CSS va vanilla JavaScript. Natijada u tez yuklanadi, hech qanday bog'liqlik (dependency) talab qilmaydi va istalgan statik hostingda ishlaydi.

## Imkoniyatlar

| | Imkoniyat | Tavsif |
|---|---|---|
| 🧭 | **Ko'p sahifali tuzilma** | 11 ta alohida sahifa: Home, About, Experience, Work, Blog, Labs, Uses, Connect, Site Info, Contact va 404 |
| ⌘ | **Buyruqlar paneli (Ctrl + K)** | Guruhlangan qidiruv: sahifalar, loyihalar, maqolalar, havolalar va amallar; o'ng tomonda preview; klaviatura va sichqoncha bilan boshqariladi |
| `>_` | **Interaktiv terminal** | `neofetch`, `ls`, `cat about.txt`, `open work` kabi buyruqlar, tarix (↑ ↓) va Tab bilan to'ldirish |
| 🧪 | **Labs** | 8 ta brauzerda ishlaydigan asbob: Token Bucket va Circuit Breaker simulyatsiyalari, JWT Decoder, Base64, UUID, Regex Tester, Chmod Calculator, JSON Formatter |
| 📊 | **Jonli GitHub ma'lumotlari** | Hissalar heatmap'i, streak'lar, so'nggi push va repozitoriylar soni |
| ✍️ | **Blog** | Teg bo'yicha filtr, qidiruv (`/` tugmasi) va real loyihalarga asoslangan maqolalar |
| 🎨 | **Mavzular** | Dark / Light rejim va 5 ta asosiy rang (Amber, Pink, Emerald, Sky, Violet); tanlov saqlanib qoladi |
| 📱 | **Responsive** | 375px telefondan katta monitorgacha; mobil menyu |

## Tech stack

| Qatlam | Texnologiya | Izoh |
|---|---|---|
| Markup | **HTML5** | Semantik teglar, har bir sahifada SEO va Open Graph meta ma'lumotlari |
| Uslublar | **CSS3** | CSS o'zgaruvchilari, `color-mix()`, Grid/Flexbox, `prefers-reduced-motion` |
| Mantiq | **Vanilla JavaScript (ES2020+)** | `IntersectionObserver`, `fetch`, `crypto.randomUUID()`, `TextEncoder` |
| Shriftlar | **Google Fonts** | Outfit, JetBrains Mono, Instrument Serif |
| Ikonkalar | **Inline SVG** + **Simple Icons CDN** | Interfeys ikonkalari kod ichida; texnologiya logolari CDN'dan |
| Ma'lumotlar | **GitHub REST API**, **github-contributions-api** | Faqat o'qish uchun; tokensiz |
| Hosting | **GitHub Pages** | `main` branch, `/` (root) papka |

## Arxitektura

Har bir sahifa — mustaqil HTML fayl. Umumiy qismlar (navigatsiya, footer, buyruqlar paneli, terminal, mavzu boshqaruvi) bitta `site.js` fayli orqali har bir sahifaga yuklanganda qo'shiladi. Shuning uchun menyuni o'zgartirish uchun faqat bitta faylni tahrirlash kifoya.

```mermaid
flowchart LR
    subgraph Pages["Statik sahifalar"]
        H["/index.html"]
        A["/about/"]
        E["/experience/"]
        W["/work/"]
        B["/blog/ + maqolalar"]
        L["/labs/"]
        O["/uses/ · /connect/ · /site-info/ · /contact/"]
    end

    subgraph Shared["assets/"]
        CSS["css/main.css<br/>dizayn tizimi"]
        SITE["js/site.js<br/>layout · Ctrl+K · terminal · mavzu"]
        LABS["js/labs.js<br/>8 ta asbob"]
        COV["js/covers.js<br/>blog muqovalari (SVG)"]
    end

    subgraph External["Tashqi API'lar (faqat o'qish)"]
        GH["GitHub REST API"]
        GC["github-contributions-api"]
        GF["Google Fonts · Simple Icons"]
    end

    Pages --> CSS
    Pages --> SITE
    L --> LABS
    B --> COV
    SITE -->|"profil, so'nggi push<br/>(sessionStorage kesh)"| GH
    W -->|"heatmap"| GC
    Pages --> GF
```

**Sahifa yuklanish tartibi:**

1. `<head>` ichidagi kichik inline skript `localStorage`'dan mavzu va rangni o'qib, sahifa chizilishidan **oldin** qo'llaydi — oq/qora "miltillash" bo'lmaydi.
2. `main.css` dizayn tokenlarini (`--accent`, `--bg`, `--card` ...) va barcha komponent uslublarini yuklaydi.
3. `site.js` sayt ildizini o'z joylashuvidan hisoblaydi (`new URL("../../", script.src)`), so'ng navigatsiya, footer, Ctrl+K paneli va terminalni sahifaga qo'shadi. Shu sababli havolalar ham root domenda, ham sub-papkada to'g'ri ishlaydi.
4. Sahifaga xos skript (masalan, `work/` dagi heatmap yoki `labs.js`) faqat kerakli sahifada yuklanadi.

**Asosiy qarorlar:**

- **Framework yo'q** — portfolio uchun React/Vite qo'shimcha murakkablik va build qadamidan boshqa foyda bermaydi.
- **Bitta umumiy layout skripti** — 11 sahifada menyu va footer takrorlanmaydi.
- **GitHub API javoblari `sessionStorage`'da keshlanadi** — sahifalar orasida o'tganda tokensiz API limitiga (soatiga 60 so'rov) urilmaslik uchun.
- **Labs to'liq brauzerda ishlaydi** — JWT yoki boshqa kiritilgan ma'lumot hech qayerga yuborilmaydi.

## Papka tuzilmasi

```text
.
├── index.html                      # Bosh sahifa (hero)
├── 404.html                        # GitHub Pages uchun maxsus 404
├── about/index.html                # Hikoya, Release History, ko'nikmalar
├── experience/index.html           # Timeline, tamoyillar, natijalar
├── work/index.html                 # Loyihalar + GitHub heatmap
├── blog/
│   ├── index.html                  # Maqolalar ro'yxati, filtr, qidiruv
│   ├── memora-os-arxitekturasi/
│   ├── llm-fallback-zanjiri/
│   └── express-jwt-rbac/
├── labs/index.html                 # Interaktiv asboblar
├── uses/index.html                 # Ishlatiladigan vositalar
├── connect/index.html              # Barcha havolalar
├── site-info/index.html            # Arxitektura, maxfiylik, shartlar
├── contact/index.html              # Forma, vaqt, FAQ
├── assets/
│   ├── css/main.css                # Butun dizayn tizimi
│   ├── js/site.js                  # Umumiy layout, Ctrl+K, terminal, mavzu
│   ├── js/labs.js                  # Labs asboblari
│   ├── js/covers.js                # Blog muqovalari (SVG generator)
│   └── img/                        # favicon va skrinshotlar
└── .nojekyll                       # GitHub Pages'da Jekyll'ni o'chiradi
```

## Lokal ishga tushirish

Hech narsa o'rnatish shart emas — faqat istalgan statik server kerak. Saytni `file://` orqali to'g'ridan-to'g'ri ochmang: papka havolalari (`/about/`) server orqali ishlaydi.

```bash
git clone https://github.com/maxmanazar025/maxmanazar025.github.io.git
cd maxmanazar025.github.io

# Python bilan
python -m http.server 5510

# yoki Node.js bilan
npx serve .
```

So'ng brauzerda oching: **http://localhost:5510**

> Eslatma: Python serveri `404.html` ni ko'rsatmaydi — u faqat GitHub Pages'da ishlaydi.

## Deploy

Sayt **GitHub Pages** orqali avtomatik joylanadi: `main` branch'ga har bir `push`dan keyin 1–2 daqiqada yangilanadi.

```bash
git add -A
git commit -m "Kontentni yangilash"
git push
```

Sozlamalar: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.

Sayt statik bo'lgani uchun uni Netlify, Vercel yoki Cloudflare Pages'ga ham hech qanday o'zgarishsiz joylash mumkin.

## Kontentni tahrirlash

| Nimani o'zgartirish | Qayerda |
|---|---|
| Menyu, footer, ijtimoiy havolalar, Ctrl+K bandlari | `assets/js/site.js` → `ME`, `PAGES`, `MORE`, `PROJECTS`, `POSTS` |
| Terminal buyruqlari va fayllari | `assets/js/site.js` → `FILES`, `CMDS` |
| Loyihalar kartalari | `work/index.html` → `PROJ` massivi |
| Blog ro'yxati | `blog/index.html` → `POSTS` massivi |
| Yangi maqola | `blog/<slug>/index.html` yarating (mavjud maqoladan nusxa oling) va uni `blog/index.html` hamda `site.js` → `POSTS` ga qo'shing |
| Ranglar va dizayn tokenlari | `assets/css/main.css` → `:root` |
| Labs asboblari | `assets/js/labs.js` → `LABS` va `TOOLS` |

## Ishlash, qulaylik va maxfiylik

- ⚡ **Yengil:** barcha CSS va JS birgalikda ~108 KB (siqilmagan), rasmlar yo'q darajada.
- ♿ **Qulaylik:** to'liq klaviatura boshqaruvi, "Asosiy kontentga o'tish" havolasi, semantik HTML, `prefers-reduced-motion` qo'llab-quvvatlanadi.
- 🔒 **Maxfiylik:** cookie, analitika va treker yo'q. `localStorage`'da faqat mavzu va rang saqlanadi. Aloqa formasi ma'lumotni serverga yubormaydi — foydalanuvchining pochta ilovasini ochadi.

Batafsil: [Site Info sahifasi](https://maxmanazar025.github.io/site-info/).

## Muallif

**Maxmanazar Sultonov** — Backend Developer, Toshkent 🇺🇿

[![Telegram](https://img.shields.io/badge/Telegram-@maxmanazarbek-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://t.me/maxmanazarbek)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Maxmanazar_Sultonov-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/maxmanazar-sultonov-dev)
[![Email](https://img.shields.io/badge/Email-maxmanazar025@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:maxmanazar025@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-maxmanazar025-181717?style=flat-square&logo=github)](https://github.com/maxmanazar025)

<sub>© 2026 Maxmanazar Sultonov. Sayt kontenti (matnlar va maqolalar) muallifga tegishli; iqtibos keltirishda manbani ko'rsating.</sub>
