/* =========================================================
   ms.dev — shared layout, command palette, shell, theme
   ========================================================= */
(() => {
  const SCRIPT = document.currentScript;
  const BASE = new URL("../../", SCRIPT.src).href;          // site root
  const url = p => BASE + p;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const PAGE = document.body.dataset.page || "";

  /* ---------------- icons ---------------- */
  const P = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17.5l9 5 9-5" opacity=".5"/>',
    pen: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M14 6l4 4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
    monitor: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    term: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9 1.2-1.8-.5-1.1.2-2.2 1.4-2.2H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    cmd: '<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 0 0 0-6z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    ext: '<path d="M7 17L17 7M8 7h9v9"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/>',
    code: '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/>',
    db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9 17h6"/>',
    brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a3 3 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
    book: '<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    sparkle: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/>',
    send: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',
    hash: '<path d="M5 9h14M4 15h14M10 3L8 21M16 3l-2 18"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z"/><path d="M14 3v6h6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  };
  const B = {
    github: '<path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/>',
    telegram: '<path d="M21.9 4.3L18.7 19.4c-.2 1.1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13 1.4 11.5c-1-.3-1.1-1 .2-1.5L20.5 2.8c.9-.3 1.7.2 1.4 1.5z"/>',
    linkedin: '<path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/>',
  };
  const icon = (n, cls = "i") => P[n] ? `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`
    : `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" style="fill:currentColor;stroke:none">${B[n] || ""}</svg>`;
  window.MS_ICON = icon;
  $$("[data-icon]").forEach(el => { el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon)); });

  /* ---------------- data ---------------- */
  const ME = {
    name: "Maxmanazar Sultonov", email: "maxmanazar025@gmail.com",
    github: "https://github.com/maxmanazar025", telegram: "https://t.me/maxmanazarbek",
    linkedin: "https://www.linkedin.com/in/maxmanazar-sultonov-dev",
  };
  window.MS = { ME, BASE, url };
  const PAGES = [
    { id: "home", t: "Bosh sahifa", p: "", ic: "home", c: "#3b82f6", d: "Kirish sahifasi — qisqacha tanishuv va ijtimoiy tarmoqlar." },
    { id: "about", t: "Men haqimda", p: "about/", ic: "user", c: "#10b981", d: "Hikoyam, release history, texnik kompetensiyalar va qiziqishlar." },
    { id: "experience", t: "Tajriba", p: "experience/", ic: "brief", c: "#8b5cf6", d: "Ta'lim, loyihalardagi tajriba va ish tamoyillarim." },
    { id: "work", t: "Loyihalar", p: "work/", ic: "layers", c: "#f59e0b", d: "Case study'lar: arxitektura, stek va GitHub faolligi." },
    { id: "blog", t: "Blog", p: "blog/", ic: "pen", c: "#ec4899", d: "Backend, botlar va AI integratsiya bo'yicha texnik maqolalar." },
    { id: "contact", t: "Aloqa", p: "contact/", ic: "mail", c: "#ef4444", d: "Xabar yuborish, Telegram va tez-tez so'raladigan savollar." },
  ];
  const MORE = [
    { id: "labs", t: "Labs", p: "labs/", ic: "flask", c: "#14b8a6", d: "Interaktiv backend tajribalar va dasturchi asboblari.", big: true },
    { id: "uses", t: "Uses", p: "uses/", ic: "monitor", c: "#6366f1", d: "Har kuni ishlatadigan vositalar va stek.", big: true },
    { id: "connect", t: "Connect", p: "connect/", ic: "link", c: "#0ea5e9", d: "Barcha tarmoqlar va havolalar bir joyda." },
    { id: "site-info", t: "Site Info", p: "site-info/", ic: "info", c: "#64748b", d: "Sayt arxitekturasi, maxfiylik va shartlar." },
  ];
  const PROJECTS = [
    { t: "Memora OS", p: "work/#memora", d: "AI akademik Telegram yordamchi — aiogram, PostgreSQL, LLM fallback zanjiri." },
    { t: "CareTrack Clinic", p: "work/#caretrack", d: "Tibbiy yozuvlar REST API — Express, JWT, RBAC." },
    { t: "Smart Planner Bot", p: "work/#planner", d: "Maqsadlar uchun Telegram bot — grammY, PostgreSQL." },
    { t: "Smart Planner Pro & IshTop", p: "work/#miniapps", d: "Telegram Mini App'lar — React, Prisma, Supabase." },
  ];
  const POSTS = [
    { t: "Memora OS: bot, worker va bitta PostgreSQL", p: "blog/memora-os-arxitekturasi/", d: "Ikki jarayon, bitta baza — nega Redis'siz qurdim." },
    { t: "LLM fallback zanjiri: model yiqilsa ham bot ishlasin", p: "blog/llm-fallback-zanjiri/", d: "Retry, backoff, cool-down va provayderlararo o'tish." },
    { t: "Express.js'da JWT va RBAC: CareTrack tajribasi", p: "blog/express-jwt-rbac/", d: "Middleware zanjiri bilan autentifikatsiya va rollar." },
  ];
  window.MS.POSTS = POSTS;

  /* ---------------- layout ---------------- */
  const navLinks = PAGES.filter(x => x.id !== "contact").map(x =>
    `<a href="${url(x.p)}" class="nav-link${PAGE === x.id ? " active" : ""}">${x.id === "home" ? "Home" : x.id === "about" ? "About" : x.id === "experience" ? "Experience" : x.id === "work" ? "Work" : "Blog"}</a>`).join("");
  const moreActive = MORE.some(m => m.id === PAGE);
  const moreMenu = MORE.map(m => m.big
    ? `<a class="big" href="${url(m.p)}">${icon(m.ic)}<b>${m.t}</b><small>${m.d}</small></a>`
    : `<a class="sm" href="${url(m.p)}">${icon(m.ic)}<span><b>${m.t}</b></span></a>`).join("");
  document.body.insertAdjacentHTML("afterbegin", `
    <a class="skip" href="#main">Asosiy kontentga o'tish</a>
    <div class="bg-glow" aria-hidden="true"></div><div class="bg-dots" aria-hidden="true"></div>
    <div class="scroll-progress" aria-hidden="true"></div>
    <a href="${url("")}" class="logo" aria-label="Bosh sahifa">m<span>s</span></a>
    <nav class="nav" aria-label="Asosiy menyu">
      <div class="nav-pill">
        ${navLinks}
        <div class="more${moreActive ? " is-active" : ""}">
          <button class="nav-link${moreActive ? " active" : ""}" aria-expanded="false" aria-haspopup="true">More ${icon("chev", "i chev")}</button>
          <div class="more-menu">${moreMenu}</div>
        </div>
        <span class="nav-sep"></span>
        <button class="icon-btn theme-toggle" aria-label="Mavzuni almashtirish">${icon("moon", "i i-moon")}${icon("sun", "i i-sun")}</button>
        <a href="${url("contact/")}" class="nav-cta${PAGE === "contact" ? " active" : ""}">Contact</a>
      </div>
      <button class="icon-btn burger" aria-label="Menyu" aria-expanded="false">${icon("menu")}</button>
    </nav>
    <button class="cmd-btn" aria-label="Buyruqlar paneli (Ctrl+K)" title="Ctrl + K">${icon("cmd")}</button>`);

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="footer"><div class="container">
      <div class="footer-line"></div>
      <div class="footer-row">
        <div><p class="foot-logo"><span class="accent">ms</span> . dev</p><p class="mono muted small">☕ bilan yaratildi — <span class="accent">ms</span></p></div>
        <nav class="foot-nav" aria-label="Footer">
          <a href="${url("")}">Home</a><a href="${url("about/")}">About</a><a href="${url("experience/")}">Experience</a><a href="${url("work/")}">Work</a><a href="${url("blog/")}">Blog</a><a href="${url("labs/")}">Labs</a><a href="${url("contact/")}">Contact</a><a href="${url("site-info/")}">Site Info</a>
        </nav>
        <div class="foot-soc">
          <a href="${ME.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin")}</a>
          <a href="${ME.telegram}" target="_blank" rel="noopener" aria-label="Telegram">${icon("telegram")}</a>
          <a href="${ME.github}" target="_blank" rel="noopener" aria-label="GitHub">${icon("github")}</a>
        </div>
      </div>
      <p class="copyright">© ${new Date().getFullYear()} Maxmanazar Sultonov · <a href="${url("site-info/#privacy")}">Maxfiylik</a> · <a href="${url("site-info/#terms")}">Shartlar</a> · <span><i class="live"></i> Toshkent, UZ</span></p>
    </div></footer>
    <div class="floaters">
      <button class="fab to-top" aria-label="Yuqoriga">${icon("up")}</button>
      <button class="fab accent-btn" aria-label="Asosiy rangni almashtirish" title="Rang">${icon("palette")}</button>
    </div>
    <div class="cmdk" hidden>
      <div class="cmdk-box" role="dialog" aria-modal="true" aria-label="Buyruqlar paneli">
        <div class="cmdk-top">${icon("search")}<input class="cmdk-input" placeholder="Sahifa, loyiha, maqola qidiring yoki 'shell' yozing..." aria-label="Qidiruv" /><button class="icon-btn cmdk-x" aria-label="Yopish">${icon("x")}</button></div>
        <div class="cmdk-body"><ul class="cmdk-list" role="listbox"></ul><aside class="cmdk-prev"></aside></div>
        <div class="cmdk-foot"><span><kbd>↑</kbd> <kbd>↓</kbd> tanlash · <kbd>Enter</kbd> ochish · sichqoncha bilan bosing</span><span><kbd>Esc</kbd> yopish</span></div>
      </div>
    </div>
    <div class="shell" hidden>
      <div class="shell-box" role="dialog" aria-modal="true" aria-label="Interaktiv terminal">
        <div class="shell-h"><span class="dots"><i></i><i></i><i></i></span><span class="ttl">maxmanazar — zsh — 80×24</span><button class="shell-x" aria-label="Yopish">${icon("x")}</button></div>
        <div class="shell-out" aria-live="polite"></div>
        <label class="shell-in"><span class="p">max@ms-dev:~$</span><input autocomplete="off" spellcheck="false" aria-label="Buyruq" /></label>
      </div>
    </div>
    <div class="toast" role="status"></div>`);
  const main = $("main"); if (main && !main.id) main.id = "main";

  /* ---------------- theme & accent ---------------- */
  const ACCENTS = [
    { n: "Amber", a: "#f59e0b", b: "#fb923c" }, { n: "Pink", a: "#ec4899", b: "#f472b6" },
    { n: "Emerald", a: "#10b981", b: "#34d399" }, { n: "Sky", a: "#38bdf8", b: "#60a5fa" }, { n: "Violet", a: "#a78bfa", b: "#c084fc" },
  ];
  const setAccent = i => {
    const x = ACCENTS[i]; root.style.setProperty("--accent", x.a); root.style.setProperty("--accent-2", x.b);
    root.dataset.accent = x.n; localStorage.setItem("accent", i); localStorage.setItem("accentHex", x.a + "," + x.b);
  };
  let acc = +(localStorage.getItem("accent") || 0); if (acc) setAccent(acc);
  const cycleAccent = () => { acc = (acc + 1) % ACCENTS.length; setAccent(acc); toast(`Rang: ${ACCENTS[acc].n}`); };
  $(".accent-btn").addEventListener("click", cycleAccent);
  const toggleTheme = () => { root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light"; localStorage.setItem("theme", root.dataset.theme); };
  $(".theme-toggle").addEventListener("click", toggleTheme);

  /* ---------------- toast / copy ---------------- */
  function toast(msg) { const t = $(".toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2200); }
  const copy = (txt, msg = "Nusxalandi ✓") => navigator.clipboard.writeText(txt).then(() => toast(msg), () => toast(txt));
  window.MS.toast = toast; window.MS.copy = copy;
  document.addEventListener("click", e => { const b = e.target.closest("[data-copy]"); if (b) { e.preventDefault(); copy(b.dataset.copy, b.dataset.msg || "Nusxalandi ✓"); } });

  /* ---------------- nav: more + mobile ---------------- */
  const more = $(".more"), moreBtn = $(".more > button"), nav = $(".nav"), burger = $(".burger");
  moreBtn.addEventListener("click", e => { e.stopPropagation(); const o = more.classList.toggle("open"); moreBtn.setAttribute("aria-expanded", o); });
  document.addEventListener("click", e => { if (!more.contains(e.target)) { more.classList.remove("open"); moreBtn.setAttribute("aria-expanded", false); } if (!nav.contains(e.target)) nav.classList.remove("open"); });
  burger.addEventListener("click", e => { e.stopPropagation(); const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });

  /* ---------------- scroll ---------------- */
  const prog = $(".scroll-progress"), toTop = $(".to-top");
  const onScroll = () => { const h = root.scrollHeight - innerHeight; prog.style.width = (h > 0 ? scrollY / h * 100 : 0) + "%"; toTop.classList.toggle("show", scrollY > 500); };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------- reveal ---------------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .1, rootMargin: "0px 0px -40px 0px" });
  const observeReveal = (scope = document) => $$(".reveal:not(.in)", scope).forEach((el, i) => { el.style.transitionDelay = (i % 3) * 70 + "ms"; io.observe(el); });
  observeReveal(); window.MS.observeReveal = observeReveal;

  /* ---------------- command palette ---------------- */
  const cmdk = $(".cmdk"), input = $(".cmdk-input"), list = $(".cmdk-list"), prev = $(".cmdk-prev");
  const go = p => () => { location.href = url(p); };
  const open = h => () => window.open(h, "_blank", "noopener");
  const ITEMS = [
    { g: "Amallar", t: "Interaktiv terminalni ochish", k: "Amal", ic: "term", c: "#10b981", d: "Linux uslubidagi terminal: neofetch, ls, cat va boshqa buyruqlar bilan portfolio bo'ylab sayohat.", id: "terminal:shell", run: () => openShell(), shell: true },
    { g: "Amallar", t: "Emailni nusxalash", k: "Amal", ic: "copy", c: "#3b82f6", d: ME.email, id: "clipboard:email", run: () => copy(ME.email, "Email nusxalandi ✓") },
    { g: "Amallar", t: "Sayt havolasini nusxalash", k: "Amal", ic: "link", c: "#8b5cf6", d: "Joriy sahifa manzilini buferga nusxalaydi.", id: "clipboard:url", run: () => copy(location.href, "Havola nusxalandi ✓") },
    { g: "Amallar", t: "Mavzuni almashtirish (dark / light)", k: "Amal", ic: "moon", c: "#334155", d: "Qorong'i va yorug' rejim o'rtasida almashish.", id: "theme:toggle", run: toggleTheme },
    { g: "Amallar", t: "Asosiy rangni almashtirish", k: "Amal", ic: "palette", c: "#ec4899", d: "Amber → Pink → Emerald → Sky → Violet.", id: "theme:accent", run: cycleAccent },
    ...PAGES.map(x => ({ g: "Sahifalar", t: x.t, k: PAGE === x.id ? "Hozirgi" : "Sahifa", ic: x.ic, c: x.c, d: x.d, id: "/" + x.p, run: go(x.p) })),
    ...MORE.map(x => ({ g: "Yana", t: x.t, k: PAGE === x.id ? "Hozirgi" : "Sahifa", ic: x.ic, c: x.c, d: x.d, id: "/" + x.p, run: go(x.p) })),
    ...PROJECTS.map(x => ({ g: "Loyihalar", t: x.t, k: "Loyiha", ic: "layers", c: "#f59e0b", d: x.d, id: "/" + x.p, run: go(x.p) })),
    ...POSTS.map(x => ({ g: "Maqolalar", t: x.t, k: "Maqola", ic: "file", c: "#ec4899", d: x.d, id: "/" + x.p, run: go(x.p) })),
    { g: "Tarmoqlar", t: "GitHub", k: "Havola", ic: "github", c: "#24292f", d: "Kodlar va loyihalar — @maxmanazar025", id: ME.github, run: open(ME.github) },
    { g: "Tarmoqlar", t: "Telegram", k: "Havola", ic: "telegram", c: "#229ed9", d: "To'g'ridan-to'g'ri yozish — @maxmanazarbek", id: ME.telegram, run: open(ME.telegram) },
    { g: "Tarmoqlar", t: "LinkedIn", k: "Havola", ic: "linkedin", c: "#0a66c2", d: "Professional profil", id: ME.linkedin, run: open(ME.linkedin) },
    { g: "Huquqiy", t: "Maxfiylik siyosati", k: "Huquqiy", ic: "shield", c: "#64748b", d: "Qaysi ma'lumotlar ishlatiladi (spoiler: deyarli hech narsa).", id: "/site-info/#privacy", run: go("site-info/#privacy") },
    { g: "Huquqiy", t: "Foydalanish shartlari", k: "Huquqiy", ic: "file", c: "#64748b", d: "Kontent va koddan foydalanish shartlari.", id: "/site-info/#terms", run: go("site-info/#terms") },
  ];
  let filtered = ITEMS, sel = 0;
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  const renderPrev = () => {
    const it = filtered[sel];
    if (!it) { prev.innerHTML = `<p class="muted mono small">Hech narsa topilmadi. 'shell' yozib ko'ring.</p>`; return; }
    const top = it.shell
      ? `<div class="term"><div class="term-h"><span class="dots"><i></i><i></i><i></i></span>maxmanazar — zsh</div><div class="term-b"><span style="color:#4ade80">max@ms-dev</span>:~$ neofetch<br><span class="accent">Kernel:</span> portfolio-2.0<br><span class="accent">Shell:</span> ms-zsh<br><span class="accent">Uptime:</span> 99.9%<br>$ <span class="caret">▌</span></div></div>`
      : `<div class="art">${icon(it.ic)}</div>`;
    prev.innerHTML = `${top}<h4>${esc(it.t)}</h4><p>${esc(it.d)}</p><dl><dt>Turi</dt><dd>${esc(it.k === "Hozirgi" ? "Sahifa" : it.k)}</dd><dt>Bo'lim</dt><dd>${esc(it.g)}</dd><dt>Manzil</dt><dd>${esc(it.id)}</dd></dl>`;
  };
  const setSel = (i, scroll) => {
    sel = i;
    $$(".cmdk-item", list).forEach((el, j) => { el.classList.toggle("sel", j === sel); el.setAttribute("aria-selected", j === sel); });
    const el = $$(".cmdk-item", list)[sel]; if (scroll && el) el.scrollIntoView({ block: "nearest" });
    renderPrev();
  };
  const render = () => {
    let html = "", g = "";
    filtered.forEach((it, i) => {
      if (it.g !== g) { g = it.g; html += `<li class="cmdk-group" role="presentation">${esc(g)}</li>`; }
      html += `<li class="cmdk-item" role="option" data-i="${i}" style="--c:${it.c}"><span class="ico">${icon(it.ic)}</span><span class="t">${esc(it.t)}</span><small class="${it.k === "Hozirgi" ? "cur" : ""}">${esc(it.k)}</small></li>`;
    });
    list.innerHTML = html || `<li class="cmdk-group">Natija yo'q</li>`;
    setSel(Math.min(sel, Math.max(filtered.length - 1, 0)));
  };
  // Mouse: hover only changes the highlight (no re-render), single click runs the item.
  list.addEventListener("mousemove", e => { const li = e.target.closest(".cmdk-item"); if (li && +li.dataset.i !== sel) setSel(+li.dataset.i); });
  list.addEventListener("click", e => { const li = e.target.closest(".cmdk-item"); if (li) exec(filtered[+li.dataset.i]); });
  const openCmd = () => { cmdk.hidden = false; input.value = ""; filtered = ITEMS; sel = 0; render(); list.scrollTop = 0; input.focus(); document.body.style.overflow = "hidden"; };
  const closeCmd = () => { cmdk.hidden = true; document.body.style.overflow = ""; };
  const exec = it => { if (!it) return; closeCmd(); it.run(); };
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    filtered = !q ? ITEMS : ITEMS.filter(it => (it.t + " " + it.g + " " + it.d + " " + it.k).toLowerCase().includes(q) || (q === "shell" && it.shell) || (q === "terminal" && it.shell));
    sel = 0; render();
  });
  input.addEventListener("keydown", e => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel(Math.min(sel + 1, filtered.length - 1), true); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel(Math.max(sel - 1, 0), true); }
    else if (e.key === "Enter") { e.preventDefault(); exec(filtered[sel]); }
  });
  cmdk.addEventListener("mousedown", e => { if (e.target === cmdk) closeCmd(); });
  $(".cmdk-x").addEventListener("click", closeCmd);
  $(".cmd-btn").addEventListener("click", openCmd);
  window.MS.openCmd = openCmd;

  /* ---------------- interactive shell ---------------- */
  const shell = $(".shell"), out = $(".shell-out"), sin = $(".shell-in input");
  const hist = []; let hi = 0;
  const print = (html = "") => { out.insertAdjacentHTML("beforeend", html + "\n"); out.scrollTop = out.scrollHeight; };
  const FILES = {
    "about.txt": "Maxmanazar Sultonov — Backend Developer, Toshkent.\nPDP University, Axborot texnologiyalari, 2-kurs.\nNode.js, Express, Python va PostgreSQL bilan REST API,\nTelegram botlar va Mini App'lar quraman.",
    "skills.txt": "backend : Node.js, Express.js, Python, FastAPI, aiogram, grammY\ndata    : PostgreSQL, SQLAlchemy, Alembic, Prisma, Supabase\nops     : Docker, Docker Compose, Linux, Bash, Git, Cloudflare Workers\nai      : Gemini API, LLM fallback chains, Google Calendar/Tasks API",
    "contact.txt": `email    : ${ME.email}\ntelegram : @maxmanazarbek\ngithub   : github.com/maxmanazar025\nlinkedin : in/maxmanazar-sultonov-dev`,
    "projects.md": PROJECTS.map(p => `- ${p.t}: ${p.d}`).join("\n"),
  };
  const CMDS = {
    help: () => print(`<span class="h">Mavjud buyruqlar:</span>
  <span class="b">whoami</span>       — men kimman
  <span class="b">neofetch</span>     — tizim ma'lumoti
  <span class="b">ls</span>           — fayllar ro'yxati
  <span class="b">cat</span> &lt;fayl&gt;   — faylni o'qish (masalan: cat about.txt)
  <span class="b">projects</span>     — loyihalar
  <span class="b">skills</span>       — texnologiyalar
  <span class="b">social</span>       — havolalar
  <span class="b">open</span> &lt;sahifa&gt; — sahifaga o'tish (about, work, blog, contact...)
  <span class="b">email</span>        — emailni nusxalash
  <span class="b">theme</span>        — dark/light
  <span class="b">date</span>, <span class="b">echo</span>, <span class="b">history</span>, <span class="b">clear</span>, <span class="b">exit</span>`),
    whoami: () => print("maxmanazar — backend developer @ Toshkent 🇺🇿"),
    neofetch: () => print(`<span class="h">      ▄▄▄▄▄▄       </span>  <span class="p">max</span>@<span class="p">ms-dev</span>
<span class="h">    ▄█▀    ▀█▄     </span>  ----------------
<span class="h">   ██  m  s  ██    </span>  <span class="h">OS:</span> Portfolio OS 2.0 (static)
<span class="h">   ██        ██    </span>  <span class="h">Host:</span> PDP University, Toshkent
<span class="h">    ▀█▄    ▄█▀     </span>  <span class="h">Kernel:</span> html-css-js
<span class="h">      ▀▀▀▀▀▀       </span>  <span class="h">Uptime:</span> ${Math.floor((Date.now() - new Date("2025-12-11")) / 864e5)} kun (GitHub)
                     <span class="h">Shell:</span> ms-zsh
                     <span class="h">Stack:</span> Node.js · Python · PostgreSQL
                     <span class="h">Focus:</span> REST API · Telegram Bots · AI`),
    ls: () => print(Object.keys(FILES).map(f => `<span class="b">${f}</span>`).join("   ")),
    cat: a => { const f = FILES[a[0]]; f ? print(esc(f)) : print(`<span class="e">cat: ${esc(a[0] || "")}: bunday fayl yo'q</span>`); },
    projects: () => print(esc(FILES["projects.md"])),
    skills: () => print(esc(FILES["skills.txt"])),
    social: () => print(`<a href="${ME.github}" target="_blank" rel="noopener">GitHub</a>  <a href="${ME.telegram}" target="_blank" rel="noopener">Telegram</a>  <a href="${ME.linkedin}" target="_blank" rel="noopener">LinkedIn</a>  <a href="mailto:${ME.email}">Email</a>`),
    open: a => { const t = [...PAGES, ...MORE].find(x => x.id === (a[0] || "").replace(/\/$/, "") || (x.id === "home" && a[0] === "home")); t ? (print(`<span class="d">→ /${t.p} ochilmoqda...</span>`), setTimeout(() => location.href = url(t.p), 350)) : print(`<span class="e">open: '${esc(a[0] || "")}' topilmadi. Sahifalar: ${[...PAGES, ...MORE].map(x => x.id).join(", ")}</span>`); },
    email: () => { copy(ME.email, "Email nusxalandi ✓"); print("Email buferga nusxalandi ✓"); },
    theme: () => { toggleTheme(); print(`Mavzu: ${root.dataset.theme}`); },
    date: () => print(new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" }) + " (Toshkent)"),
    echo: a => print(esc(a.join(" "))),
    history: () => print(hist.map((h, i) => `${String(i + 1).padStart(3)}  ${esc(h)}`).join("\n")),
    clear: () => { out.innerHTML = ""; },
    exit: () => closeShell(),
    sudo: () => print(`<span class="e">Ruxsat yo'q 😄 Bu incident hisobotga yoziladi.</span>`),
    pwd: () => print("/home/max/portfolio"),
  };
  const run = line => {
    print(`<span class="p">max@ms-dev:~$</span> ${esc(line)}`);
    const [c, ...a] = line.trim().split(/\s+/); if (!c) return;
    hist.push(line); hi = hist.length;
    (CMDS[c.toLowerCase()] || (() => print(`<span class="e">${esc(c)}: buyruq topilmadi. 'help' yozing.</span>`)))(a);
  };
  function openShell() {
    shell.hidden = false; document.body.style.overflow = "hidden";
    if (!out.textContent) { print(`<span class="d">Portfolio OS 2.0 — ${new Date().toDateString()}</span>`); CMDS.neofetch(); print(`\nBoshlash uchun <span class="h">help</span> yozing.\n`); }
    setTimeout(() => sin.focus(), 50);
  }
  function closeShell() { shell.hidden = true; document.body.style.overflow = ""; }
  window.MS.openShell = openShell;
  sin.addEventListener("keydown", e => {
    if (e.key === "Enter") { run(sin.value); sin.value = ""; }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (hi > 0) sin.value = hist[--hi]; }
    else if (e.key === "ArrowDown") { e.preventDefault(); hi = Math.min(hi + 1, hist.length); sin.value = hist[hi] || ""; }
    else if (e.key === "Tab") { e.preventDefault(); const v = sin.value; const m = Object.keys(CMDS).concat(Object.keys(FILES)).filter(k => k.startsWith(v.split(" ").pop())); if (m.length === 1) sin.value = v.replace(/\S*$/, m[0]); }
    else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); out.innerHTML = ""; }
  });
  shell.addEventListener("mousedown", e => { if (e.target === shell) closeShell(); });
  $(".shell-box").addEventListener("click", () => sin.focus());
  $(".shell-x").addEventListener("click", closeShell);
  $$("[data-shell]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); openShell(); }));
  $$("[data-cmdk]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); openCmd(); }));

  /* ---------------- global keys ---------------- */
  addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmdk.hidden ? openCmd() : closeCmd(); }
    if (e.key === "Escape") { if (!cmdk.hidden) closeCmd(); else if (!shell.hidden) closeShell(); more.classList.remove("open"); nav.classList.remove("open"); }
  });

  /* ---------------- helpers for pages ---------------- */
  window.MS.tashkentNow = () => new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" }));
  window.MS.gh = async path => {
    const key = "gh:" + path, c = sessionStorage.getItem(key);
    if (c) return JSON.parse(c);
    const r = await fetch("https://api.github.com/" + path); if (!r.ok) throw new Error(r.status);
    const j = await r.json(); sessionStorage.setItem(key, JSON.stringify(j)); return j;
  };
  window.MS.ago = d => { const s = (Date.now() - new Date(d)) / 1000; if (s < 3600) return Math.max(1, Math.floor(s / 60)) + " daq oldin"; if (s < 86400) return Math.floor(s / 3600) + " soat oldin"; return Math.floor(s / 86400) + " kun oldin"; };
  // live GitHub widgets (any page)
  if ($("[data-gh]")) (async () => {
    try {
      const [u, ev] = await Promise.all([window.MS.gh("users/maxmanazar025"), window.MS.gh("users/maxmanazar025/events/public?per_page=30")]);
      $$("[data-gh=repos]").forEach(e => e.textContent = u.public_repos);
      $$("[data-gh=followers]").forEach(e => e.textContent = u.followers);
      const push = ev.find(x => x.type === "PushEvent") || ev[0];
      if (push) {
        const msg = push.payload?.commits?.[0]?.message || (push.type === "CreateEvent" ? "Yangi repozitoriy yaratildi" : "Repozitoriy yangilandi");
        $$("[data-gh=msg]").forEach(e => e.textContent = `"${msg.split("\n")[0].slice(0, 60)}"`);
        $$("[data-gh=repo]").forEach(e => e.textContent = push.repo.name.split("/")[1]);
        $$("[data-gh=sha]").forEach(e => e.textContent = (push.payload?.head || push.payload?.commits?.[0]?.sha || "").slice(0, 7) || "—");
        $$("[data-gh=ago]").forEach(e => e.textContent = window.MS.ago(push.created_at));
      }
    } catch { /* offline / rate-limited: keep fallbacks */ }
  })();
})();
