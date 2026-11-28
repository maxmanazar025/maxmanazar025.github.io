/* Labs: interactive backend experiments & developer tools (all client-side) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  const LABS = [
    { id: "tb", g: "Tizim patternlari", ab: "TB", t: "Token Bucket", d: "Rate limiting algoritmi: so'rovlar qayta to'ladigan tokenlar bilan boshqariladi.", tags: ["Rate Limiting", "API"], st: "STABLE" },
    { id: "cb", g: "Tizim patternlari", ab: "CB", t: "Circuit Breaker", d: "Yiqilayotgan servisni avtomatik uzib, kaskad xatolarning oldini oladi.", tags: ["Resilience", "Backend"], st: "STABLE" },
    { id: "jwt", g: "Dasturchi asboblari", ab: "JD", t: "JWT Decoder", d: "JWT tokenni ochib ko'rish: header, payload, muddati va rol.", tags: ["Auth", "Security"], st: "STABLE" },
    { id: "b64", g: "Dasturchi asboblari", ab: "B6", t: "Base64 Encoder / Decoder", d: "Matnni Base64'ga o'girish va qaytarish (UTF-8 xavfsiz).", tags: ["Encoding", "Utility"], st: "STABLE" },
    { id: "uuid", g: "Dasturchi asboblari", ab: "UG", t: "UUID Generator", d: "v4 UUID'larni ommaviy yaratish: standart, katta harf, chiziqsiz.", tags: ["Utility", "Tools"], st: "STABLE" },
    { id: "re", g: "Dasturchi asboblari", ab: "RT", t: "Regex Tester", d: "Regex'ni jonli belgilash, flag'lar va guruhlar bilan sinash.", tags: ["Regex", "Utility"], st: "STABLE" },
    { id: "chmod", g: "Dasturchi asboblari", ab: "CC", t: "Chmod Calculator", d: "Unix ruxsatlari: oktal, simvolik va tayyor buyruq.", tags: ["Linux", "DevOps"], st: "STABLE" },
    { id: "json", g: "Dasturchi asboblari", ab: "JF", t: "JSON Formatter", d: "JSON'ni chiroyli formatlash, siqish va xatolarni topish.", tags: ["JSON", "Debugging"], st: "BETA" },
  ];
  $("#lab-count").textContent = LABS.length;
  const tags = ["All", ...new Set(LABS.flatMap(l => l.tags))];
  const T = $("#lab-tags");
  T.innerHTML = tags.map((t, i) => `<button class="filter${i ? "" : " active"}" aria-pressed="${!i}" data-t="${t}">${t}</button>`).join("");
  const groups = [...new Set(LABS.map(l => l.g))];
  $("#labs").innerHTML = groups.map(g => `<p class="label lab-group" style="justify-content:center">${g}</p><div class="lab-grid">${LABS.filter(l => l.g === g).map(l =>
    `<article class="card hov lab reveal" tabindex="0" role="button" data-id="${l.id}" data-tags="${l.tags.join("|")}">
      <span class="ab">${l.ab}</span><span class="badge ${l.st === "STABLE" ? "g" : ""}">${l.st}</span><h3>${l.t}</h3><p>${l.d}</p>
      <div class="chips">${l.tags.map(t => `<i>${t}</i>`).join("")}</div></article>`).join("")}</div>`).join("");
  window.MS.observeReveal($("#labs"));
  T.addEventListener("click", e => { const b = e.target.closest(".filter"); if (!b) return;
    T.querySelectorAll(".filter").forEach(x => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", x === b); });
    document.querySelectorAll(".lab").forEach(l => l.classList.toggle("hide", b.dataset.t !== "All" && !l.dataset.tags.split("|").includes(b.dataset.t))); });

  const modal = $("#modal"), body = $("#m-body"); let cleanup = null;
  $("#m-x").innerHTML = window.MS_ICON("x");
  let opener = null;
  const close = () => { modal.hidden = true; document.documentElement.classList.remove("locked"); if (opener) opener.focus({ preventScroll: true }); if (cleanup) cleanup(); cleanup = null; };
  $("#m-x").onclick = close; modal.addEventListener("mousedown", e => { if (e.target === modal) close(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) close(); });
  const open = id => { const l = LABS.find(x => x.id === id); $("#m-title").textContent = l.t; body.innerHTML = ""; opener = document.activeElement; modal.hidden = false; document.documentElement.classList.add("locked"); setTimeout(() => $("#m-x").focus(), 30); cleanup = TOOLS[id](body) || null; };
  $("#labs").addEventListener("click", e => { const c = e.target.closest(".lab"); if (c) open(c.dataset.id); });
  $("#labs").addEventListener("keydown", e => { const c = e.target.closest(".lab"); if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(c.dataset.id); } });

  const b64enc = s => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
  const b64dec = s => new TextDecoder().decode(Uint8Array.from(atob(s), c => c.charCodeAt(0)));
  const now = () => new Date().toLocaleTimeString("en-GB");

  const TOOLS = {
    tb(el) {
      el.innerHTML = `<p class="dim small">Sig'im: <b id="cap">10</b> token · To'ldirish: <b id="rate">2</b> token/s. Har bir so'rov 1 token oladi; token qolmasa — <span class="mono">429 Too Many Requests</span>.</p>
        <div class="tool-row" style="margin-top:12px"><label class="small">Sig'im <input type="range" min="3" max="20" value="10" id="capR"></label><label class="small">Tezlik <input type="range" min="1" max="10" value="2" id="rateR"></label></div>
        <div class="bucket" id="bk"></div>
        <div class="tool-row"><button class="tbtn primary" id="one">1 ta so'rov</button><button class="tbtn" id="burst">Burst ×8</button><button class="tbtn" id="auto">Avto-trafik: o'chiq</button></div>
        <div class="logbox" id="log"></div>`;
      let cap = 10, rate = 2, tokens = 10, autoT = null; const bk = $("#bk", el), log = $("#log", el);
      const draw = () => { bk.innerHTML = Array.from({ length: cap }, (_, i) => `<span class="${i < Math.floor(tokens) ? "" : "empty"}"></span>`).join(""); };
      const L = (c, m) => { log.insertAdjacentHTML("afterbegin", `<div class="${c}">[${now()}] ${m}</div>`); };
      const req = () => { if (tokens >= 1) { tokens -= 1; L("ok", `200 OK — qolgan token: ${Math.floor(tokens)}`); } else L("no", "429 Too Many Requests — bucket bo'sh"); draw(); };
      const refill = setInterval(() => { tokens = Math.min(cap, tokens + rate / 10); draw(); }, 100);
      $("#one", el).onclick = req; $("#burst", el).onclick = () => { for (let i = 0; i < 8; i++) req(); };
      $("#auto", el).onclick = e => { if (autoT) { clearInterval(autoT); autoT = null; e.target.textContent = "Avto-trafik: o'chiq"; e.target.classList.remove("on"); } else { autoT = setInterval(req, 300); e.target.textContent = "Avto-trafik: yoqiq"; e.target.classList.add("on"); } };
      $("#capR", el).oninput = e => { cap = +e.target.value; tokens = Math.min(tokens, cap); $("#cap", el).textContent = cap; draw(); };
      $("#rateR", el).oninput = e => { rate = +e.target.value; $("#rate", el).textContent = rate; };
      draw(); return () => { clearInterval(refill); clearInterval(autoT); };
    },
    cb(el) {
      el.innerHTML = `<p class="dim small">Ketma-ket <b>3</b> xatodan keyin zanjir <b>OPEN</b> bo'ladi va so'rovlar darhol rad etiladi. <b>5 soniya</b>dan so'ng <b>HALF-OPEN</b>: bitta sinov so'rovi o'tkaziladi — muvaffaqiyatli bo'lsa CLOSED.</p>
        <div class="cb-state"><span data-s="closed">CLOSED</span><span data-s="half">HALF-OPEN</span><span data-s="open">OPEN</span></div>
        <div class="tool-row"><label class="small">Servis sog'ligi: <b id="hv">80%</b> <input type="range" min="0" max="100" value="80" id="h"></label></div>
        <div class="tool-row"><button class="tbtn primary" id="call">So'rov yuborish</button><button class="tbtn" id="auto">Avto: o'chiq</button><button class="tbtn" id="rst">Reset</button></div>
        <div class="logbox" id="log"></div>`;
      let state = "closed", fails = 0, openedAt = 0, health = 80, autoT = null; const log = $("#log", el);
      const L = (c, m) => log.insertAdjacentHTML("afterbegin", `<div class="${c}">[${now()}] ${m}</div>`);
      const draw = () => el.querySelectorAll(".cb-state span").forEach(s => { s.className = s.dataset.s === state ? "on " + state : ""; });
      const call = () => {
        if (state === "open") { if (Date.now() - openedAt > 5000) { state = "half"; L("wa", "HALF-OPEN — sinov so'rovi o'tkazilmoqda"); } else { L("no", "Rad etildi (fail-fast) — zanjir OPEN"); draw(); return; } }
        const ok = Math.random() * 100 < health;
        if (ok) { L("ok", "200 OK"); if (state === "half") L("ok", "Servis tiklandi → CLOSED"); state = "closed"; fails = 0; }
        else { fails++; L("no", `503 xato (${fails}/3)`); if (state === "half" || fails >= 3) { state = "open"; openedAt = Date.now(); L("wa", "Zanjir OPEN — 5 soniya kutiladi"); } }
        draw();
      };
      $("#call", el).onclick = call;
      $("#h", el).oninput = e => { health = +e.target.value; $("#hv", el).textContent = health + "%"; };
      $("#auto", el).onclick = e => { if (autoT) { clearInterval(autoT); autoT = null; e.target.textContent = "Avto: o'chiq"; e.target.classList.remove("on"); } else { autoT = setInterval(call, 600); e.target.textContent = "Avto: yoqiq"; e.target.classList.add("on"); } };
      $("#rst", el).onclick = () => { state = "closed"; fails = 0; log.innerHTML = ""; draw(); };
      draw(); return () => clearInterval(autoT);
    },
    jwt(el) {
      const sample = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." + b64enc(JSON.stringify({ id: 1, email: "doctor@caretrack.uz", role: "doctor", iat: Math.floor(Date.now() / 1e3), exp: Math.floor(Date.now() / 1e3) + 86400 })).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_") + ".demo-signature";
      el.innerHTML = `<textarea class="ta" id="in" placeholder="JWT tokenni shu yerga qo'ying...">${sample}</textarea>
        <p class="label" style="margin:14px 0 8px">Header</p><div class="out" id="h"></div>
        <p class="label" style="margin:14px 0 8px">Payload</p><div class="out" id="p"></div>
        <p class="small mono" id="st" style="margin-top:12px"></p><p class="muted small" style="margin-top:6px">Imzo tekshirilmaydi — buning uchun maxfiy kalit kerak. Token brauzerdan tashqariga chiqmaydi.</p>`;
      const dec = s => JSON.parse(b64dec(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=")));
      const run = () => { const v = $("#in", el).value.trim(), [h, p] = v.split("."); const H = $("#h", el), Pp = $("#p", el), st = $("#st", el);
        try { H.textContent = JSON.stringify(dec(h), null, 2); const pl = dec(p); Pp.textContent = JSON.stringify(pl, null, 2); H.className = Pp.className = "out";
          if (pl.exp) { const left = pl.exp * 1000 - Date.now(); st.innerHTML = left > 0 ? `<span style="color:var(--green)">● Amal qiladi</span> — ${new Date(pl.exp * 1000).toLocaleString()} gacha` : `<span style="color:#f87171">● Muddati o'tgan</span> — ${new Date(pl.exp * 1000).toLocaleString()}`; } else st.textContent = "exp maydoni yo'q";
        } catch { H.className = Pp.className = "out err"; H.textContent = Pp.textContent = "Yaroqsiz JWT formati"; st.textContent = ""; } };
      $("#in", el).oninput = run; run();
    },
    b64(el) {
      el.innerHTML = `<textarea class="ta" id="in" placeholder="Matn yoki Base64...">Salom, dunyo! 👋</textarea>
        <div class="tool-row" style="margin-top:12px"><button class="tbtn primary" id="e">Encode →</button><button class="tbtn" id="d">← Decode</button><button class="tbtn" id="c">Nusxalash</button></div><div class="out" id="o"></div>`;
      const o = $("#o", el);
      $("#e", el).onclick = () => { o.className = "out"; o.textContent = b64enc($("#in", el).value); };
      $("#d", el).onclick = () => { try { o.className = "out"; o.textContent = b64dec($("#in", el).value.trim()); } catch { o.className = "out err"; o.textContent = "Yaroqsiz Base64"; } };
      $("#c", el).onclick = () => window.MS.copy(o.textContent);
      $("#e", el).click();
    },
    uuid(el) {
      el.innerHTML = `<div class="tool-row"><label class="small">Soni <input class="inp" type="number" min="1" max="100" value="5" id="n" style="width:90px"></label>
        <select class="inp" id="f" style="width:auto"><option value="std">Standart</option><option value="up">KATTA HARF</option><option value="nd">Chiziqsiz</option><option value="br">{Qavslar}</option></select>
        <button class="tbtn primary" id="g">Yaratish</button><button class="tbtn" id="c">Nusxalash</button></div><div class="out" id="o"></div>`;
      const gen = () => { const n = Math.min(100, Math.max(1, +$("#n", el).value || 1)), f = $("#f", el).value;
        $("#o", el).textContent = Array.from({ length: n }, () => { let u = crypto.randomUUID(); if (f === "up") u = u.toUpperCase(); if (f === "nd") u = u.replace(/-/g, ""); if (f === "br") u = `{${u}}`; return u; }).join("\n"); };
      $("#g", el).onclick = gen; $("#f", el).onchange = gen; $("#c", el).onclick = () => window.MS.copy($("#o", el).textContent); gen();
    },
    re(el) {
      el.innerHTML = `<div class="tool-row"><input class="inp mono" id="p" value="\\b[\\w.]+@[\\w.]+\\.\\w+\\b" style="flex:1"><input class="inp mono" id="fl" value="g" style="width:80px" aria-label="flags"></div>
        <div class="tool-row"><button class="tbtn" data-p="\\b[\\w.]+@[\\w.]+\\.\\w+\\b">Email</button><button class="tbtn" data-p="\\+998\\s?\\d{2}\\s?\\d{3}\\s?\\d{2}\\s?\\d{2}">+998 telefon</button><button class="tbtn" data-p="\\b\\d{1,3}(\\.\\d{1,3}){3}\\b">IPv4</button><button class="tbtn" data-p="https?://\\S+">URL</button></div>
        <textarea class="ta" id="t">Aloqa: maxmanazar025@gmail.com, test@pdp.uz
Telefon: +998 90 123 45 67
Server: 192.168.1.10 — https://github.com/maxmanazar025</textarea>
        <p class="label" style="margin:14px 0 8px">Natija · <span id="cnt" class="accent">0</span> moslik</p><div class="out" id="o"></div>`;
      const run = () => { const o = $("#o", el); try { const fl = $("#fl", el).value.replace(/[^gimsuy]/g, ""); const re = new RegExp($("#p", el).value, fl.includes("g") ? fl : fl + "g"); const txt = $("#t", el).value; let n = 0;
          o.className = "out"; o.innerHTML = esc(txt).replace(new RegExp(re.source, re.flags), m => { n++; return `<mark>${m}</mark>`; }); $("#cnt", el).textContent = n;
        } catch (e) { o.className = "out err"; o.textContent = "Regex xatosi: " + e.message; $("#cnt", el).textContent = 0; } };
      el.querySelectorAll("[data-p]").forEach(b => b.onclick = () => { $("#p", el).value = b.dataset.p; run(); });
      ["#p", "#fl", "#t"].forEach(s => $(s, el).oninput = run); run();
    },
    chmod(el) {
      const who = ["Owner", "Group", "Others"], what = [["r", 4, "O'qish"], ["w", 2, "Yozish"], ["x", 1, "Bajarish"]];
      el.innerHTML = `<div class="perm"><div><b class="small">&nbsp;</b>${what.map(w => `<span class="small muted">${w[2]}</span>`).join("")}</div>${who.map((w, i) => `<div><b class="small">${w}</b>${what.map(p => `<label><input type="checkbox" data-w="${i}" data-v="${p[1]}" ${(i === 0 || p[0] !== "w") ? "checked" : ""}> ${p[0]}</label>`).join("")}</div>`).join("")}</div>
        <div class="tool-row"><input class="inp mono" id="oct" style="width:110px" aria-label="Oktal"><span class="mono" id="sym"></span></div><div class="out" id="cmd"></div>`;
      const sync = () => { const v = [0, 0, 0]; el.querySelectorAll("input[type=checkbox]").forEach(c => { if (c.checked) v[c.dataset.w] += +c.dataset.v; });
        $("#oct", el).value = v.join(""); $("#sym", el).textContent = "-" + v.map(n => (n & 4 ? "r" : "-") + (n & 2 ? "w" : "-") + (n & 1 ? "x" : "-")).join(""); $("#cmd", el).textContent = `chmod ${v.join("")} deploy.sh`; };
      el.querySelectorAll("input[type=checkbox]").forEach(c => c.onchange = sync);
      $("#oct", el).oninput = e => { const m = e.target.value.match(/^[0-7]{3}$/); if (!m) return; [...e.target.value].forEach((d, i) => el.querySelectorAll(`[data-w="${i}"]`).forEach(c => c.checked = (+d & +c.dataset.v) > 0)); sync(); };
      sync();
    },
    json(el) {
      el.innerHTML = `<textarea class="ta" id="in" style="min-height:160px">{"user":{"id":1,"role":"doctor","patients":[12,15,19]},"active":true}</textarea>
        <div class="tool-row" style="margin-top:12px"><button class="tbtn primary" id="f">Formatlash</button><button class="tbtn" id="m">Siqish</button><button class="tbtn" id="c">Nusxalash</button></div><div class="out" id="o"></div>`;
      const o = $("#o", el); const go = sp => { try { o.className = "out"; o.textContent = JSON.stringify(JSON.parse($("#in", el).value), null, sp); } catch (e) { o.className = "out err"; o.textContent = "JSON xatosi: " + e.message; } };
      $("#f", el).onclick = () => go(2); $("#m", el).onclick = () => go(0); $("#c", el).onclick = () => window.MS.copy(o.textContent); go(2);
    },
  };
  if (location.hash) { const id = location.hash.slice(1); if (LABS.some(l => l.id === id)) open(id); }
})();
