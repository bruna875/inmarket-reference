// loader.js — animated frog loading screen


function renderLoader() {
  return '<div class="loader-wrap">'
    + '<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="ld-bob">'
    + '<ellipse cx="60" cy="78" rx="28" ry="20" fill="#9DC47A" opacity=".85"/>'
    + '<ellipse cx="60" cy="74" rx="22" ry="15" fill="#8BAF6A" opacity=".9"/>'
    + '<circle cx="50" cy="58" r="8" fill="#6B8A50"/>'
    + '<circle cx="70" cy="58" r="8" fill="#6B8A50"/>'
    + '<circle cx="50" cy="58" r="5" fill="#fff" opacity=".9"/>'
    + '<circle cx="70" cy="58" r="5" fill="#fff" opacity=".9"/>'
    + '<circle cx="51.5" cy="58" r="2.5" fill="#2A3A1A" class="ld-blink"/>'
    + '<circle cx="71.5" cy="58" r="2.5" fill="#2A3A1A" class="ld-blink"/>'
    + '<path d="M54 72 Q60 77 66 72" stroke="#5A7A40" stroke-width="2" fill="none" stroke-linecap="round"/>'
    + '<path d="M40 88 Q32 98 26 94 Q32 90 40 92" fill="#8BAF6A" opacity=".7"/>'
    + '<path d="M80 88 Q88 98 94 94 Q88 90 80 92" fill="#8BAF6A" opacity=".7"/>'
    + '<rect x="38" y="80" width="44" height="28" rx="3" fill="#E8E6E0" stroke="#C8C6C0" stroke-width="1.5"/>'
    + '<rect x="42" y="84" width="36" height="18" rx="2" fill="#fff"/>'
    + '<rect x="30" y="108" width="60" height="4" rx="2" fill="#C8C6C0"/>'
    + '<line x1="46" y1="90" x2="62" y2="90" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>'
    + '<line x1="46" y1="94" x2="72" y2="94" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" opacity=".35"/>'
    + '<line x1="46" y1="98" x2="56" y2="98" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>'
    + '<circle cx="100" cy="44" r="8" stroke="var(--border-md)" stroke-width="2" fill="none"/>'
    + '<path d="M100 36 A8 8 0 0 1 108 44" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" fill="none" class="ld-spin-anim"/>'
    + '</svg>'
    + '<div class="loader-phrases">'
    + '<div class="ld-phrase" style="animation-delay:0s">pulling roadmap data and vibe coding dashboard\u2026</div>'
    + '<div class="ld-phrase" style="animation-delay:3s">exposing manipulations and debunking defamation\u2026</div>'
    + '<div class="ld-phrase" style="animation-delay:6s">protecting dignity\u2026</div>'
    + '</div>'
    + '</div>';
}
