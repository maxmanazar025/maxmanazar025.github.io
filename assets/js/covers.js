/* Simple illustrated blog covers (pure SVG, theme-aware via currentColor / CSS vars) */
window.MS_COVER = name => {
  const A = "var(--accent)", P = "var(--pink)", G = "var(--green)", B = "var(--blue)";
  const box = (x, y, c, w = 70, h = 54) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="var(--card-solid)" stroke="${c}" stroke-width="2"/>
    <circle cx="${x + 14}" cy="${y + 15}" r="5" fill="${c}"/><rect x="${x + 24}" y="${y + 11}" width="${w - 36}" height="6" rx="3" fill="var(--border-2)"/>
    <rect x="${x + 12}" y="${y + 28}" width="${w - 24}" height="5" rx="2.5" fill="${c}" opacity=".7"/><rect x="${x + 12}" y="${y + 38}" width="${w - 40}" height="5" rx="2.5" fill="var(--border-2)"/>`;
  const S = {
    arch: `${box(20, 30, G)}${box(130, 30, B)}${box(240, 30, P)}${box(130, 110, A, 70, 40)}
      <path d="M90 57h40M200 57h40" stroke="${A}" stroke-width="2" stroke-dasharray="5 5"/><path d="M165 84v26" stroke="${A}" stroke-width="2"/>
      <path d="M55 30 C55 4 275 4 275 30" stroke="${P}" stroke-width="2" fill="none" stroke-dasharray="5 6"/><text x="165" y="135" text-anchor="middle" font-family="monospace" font-size="11" fill="${A}">PostgreSQL</text>`,
    chain: `${[0, 1, 2, 3].map(i => `<g transform="translate(${18 + i * 76} 60)"><rect width="60" height="44" rx="10" fill="var(--card-solid)" stroke="${[G, A, P, B][i]}" stroke-width="2"/><text x="30" y="27" text-anchor="middle" font-family="monospace" font-size="10" fill="${[G, A, P, B][i]}">${["gemini", "flash", "groq", "openai"][i]}</text></g>`).join("")}
      ${[0, 1, 2].map(i => `<path d="M${78 + i * 76} 82h16" stroke="${A}" stroke-width="2"/><path d="M${90 + i * 76} 77l5 5-5 5" stroke="${A}" stroke-width="2" fill="none"/>`).join("")}
      <path d="M48 60 C 48 20, 124 20, 124 60" stroke="#f87171" stroke-width="2" fill="none" stroke-dasharray="4 5"/><text x="86" y="30" text-anchor="middle" font-family="monospace" font-size="10" fill="#f87171">429</text>
      <text x="165" y="140" text-anchor="middle" font-family="monospace" font-size="10" fill="var(--muted)">retry → backoff → fallback</text>`,
    lock: `<rect x="120" y="62" width="90" height="70" rx="14" fill="var(--card-solid)" stroke="${A}" stroke-width="2"/><path d="M140 62V44a25 25 0 0 1 50 0v18" stroke="${A}" stroke-width="3" fill="none"/>
      <circle cx="165" cy="92" r="8" fill="${A}"/><rect x="162" y="96" width="6" height="16" rx="3" fill="${A}"/>
      <g font-family="monospace" font-size="10"><rect x="18" y="40" width="80" height="24" rx="7" fill="var(--card-solid)" stroke="${G}"/><text x="58" y="56" text-anchor="middle" fill="${G}">200 OK</text>
      <rect x="18" y="80" width="80" height="24" rx="7" fill="var(--card-solid)" stroke="${P}"/><text x="58" y="96" text-anchor="middle" fill="${P}">401</text>
      <rect x="232" y="60" width="80" height="24" rx="7" fill="var(--card-solid)" stroke="${B}"/><text x="272" y="76" text-anchor="middle" fill="${B}">403 role</text>
      <rect x="232" y="100" width="80" height="24" rx="7" fill="var(--card-solid)" stroke="${A}"/><text x="272" y="116" text-anchor="middle" fill="${A}">Bearer</text></g>
      <path d="M98 52h22M98 92h22M210 72h22M210 112h22" stroke="var(--border-2)" stroke-width="2" stroke-dasharray="3 4"/>`,
  };
  return `<svg viewBox="0 0 330 165" role="img" aria-hidden="true">${S[name] || S.arch}</svg>`;
};
