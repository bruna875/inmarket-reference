// icons.js — SVG icons, mini frog, references data


// ── Mini Frog ─────────────────────────────────────────────────────────────────
var MINI_FROG = '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" style="animation:ld-bob 2s ease-in-out infinite"><style>@keyframes ld-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}@keyframes ld-blink2{0%,48%,52%,100%{opacity:1}50%{opacity:0}}</style><ellipse cx="18" cy="24" rx="10" ry="7" fill="#9DC47A" opacity=".85"/><ellipse cx="18" cy="22.5" rx="8" ry="5.5" fill="#8BAF6A" opacity=".9"/><circle cx="14" cy="15.5" r="3.2" fill="#6B8A50"/><circle cx="22" cy="15.5" r="3.2" fill="#6B8A50"/><circle cx="14" cy="15.5" r="2" fill="#fff" opacity=".9"/><circle cx="22" cy="15.5" r="2" fill="#fff" opacity=".9"/><circle cx="14.5" cy="15.5" r="1" fill="#2A3A1A" style="animation:ld-blink2 4s ease infinite"/><circle cx="22.5" cy="15.5" r="1" fill="#2A3A1A" style="animation:ld-blink2 4s ease infinite"/><path d="M16 22 Q18 24.5 20 22" stroke="#5A7A40" stroke-width="1" fill="none" stroke-linecap="round"/></svg>';

// ── EmailJS ───────────────────────────────────────────────────────────────────
var EJS_SVC    = 'service_7ix3z7i';
var EJS_TPL    = 'template_mzc2pqe';
var EJS_KEY    = 'uKxnVxIdCvTn9wl3j';
var SIG_NOTIFY = 'bruna@saykudos.co';

function ejsSend(toEmail, code, name, page) {
  return fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      service_id: EJS_SVC, template_id: EJS_TPL, user_id: EJS_KEY,
      template_params: {email: toEmail, passcode: code, name: name, page: page}
    })
  });
}

// ── Signature ─────────────────────────────────────────────────────────────────
var _sigCodes = {};
var _sigDone  = {};

function loadSavedSignatures() {
  return fetch('/api/signatures')
    .then(function(r) { return r.json(); })
    .then(function(data) { _sigDone = data || {}; })
    .catch(function() { _sigDone = {}; });
}

function saveSig(pageId, name) {
  _sigDone[pageId] = {name: name};
  fetch('/api/signatures', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(_sigDone)
  }).catch(function(e) { console.warn('sig save failed', e); });
}

function sigGenCode() {
  var c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', o = '';
  for (var i = 0; i < 6; i++) o += c[Math.floor(Math.random() * c.length)];
  return o;
}

function sigBoxHtml(pageId, pageLabel, toEmail) {
  var done = _sigDone[pageId];
  if (done) {
    return '<div class="sig-box"><div class="sig-box-title">Signature</div>'
      + '<div class="sig-done">'
      + '<div class="sig-done-check"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#3B6D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
      + '<div class="sig-done-text">Signed by<span class="sig-done-name"> ' + done.name + '</span></div>'
      + '</div></div>';
  }
  var pending = _sigCodes[pageId] && _sigCodes[pageId].expires > Date.now();
  if (pending) {
    return '<div class="sig-box"><div class="sig-box-title">Signature</div>'
      + '<div class="sig-code-wrap">'
      + '<div class="sig-code-lbl">A code was sent to <strong>' + toEmail + '</strong>. Enter it below:</div>'
      + '<div class="sig-code-row">'
      + '<input class="sig-code-input" id="sig-inp-' + pageId + '" maxlength="6" placeholder="XXXXXX" autocomplete="off"/>'
      + '<button class="sig-btn" data-sv="' + pageId + '" data-sl="' + encodeURIComponent(pageLabel) + '" data-se="' + toEmail + '">Verify</button>'
      + '<button class="sig-btn-sec" data-sr="' + pageId + '" data-sl="' + encodeURIComponent(pageLabel) + '" data-se="' + toEmail + '">Resend</button>'
      + '</div><div class="sig-err" id="sig-err-' + pageId + '"></div>'
      + '</div></div>';
  }
  return '<div class="sig-box"><div class="sig-box-title">Signature</div>'
    + '<div class="sig-idle">'
    + '<button class="sig-btn" data-sq="' + pageId + '" data-sl="' + encodeURIComponent(pageLabel) + '" data-se="' + toEmail + '">Sign this page</button>'
    + '<span class="sig-hint">A code will be sent to ' + toEmail + '</span>'
    + '</div></div>';
}

function sigRefresh(pageId, pageLabel, toEmail) {
  var el = document.getElementById('sig-wrap-' + pageId);
  if (el) el.innerHTML = sigBoxHtml(pageId, pageLabel, toEmail);
}

function sigRequest(pageId, pageLabel, toEmail) {
  var code = sigGenCode();
  var signerName = pageLabel;
  var h = document.querySelector('.ptitle');
  if (h && h.textContent && !PAGES[pageId]) signerName = h.textContent.trim();
  _sigCodes[pageId] = {code: code, expires: Date.now() + 10 * 60 * 1000, signerName: signerName};
  var btn = document.querySelector('[data-sq="' + pageId + '"]');
  if (btn) { btn.textContent = 'Sending\u2026'; btn.disabled = true; }
  ejsSend(toEmail, code, signerName, pageLabel)
    .then(function() { sigRefresh(pageId, pageLabel, toEmail); })
    .catch(function(e) { console.error(e); sigRefresh(pageId, pageLabel, toEmail); });
}

function sigVerify(pageId, pageLabel, toEmail) {
  var inp = document.getElementById('sig-inp-' + pageId);
  var err = document.getElementById('sig-err-' + pageId);
  if (!inp) return;
  var val = inp.value.trim().toUpperCase();
  var stored = _sigCodes[pageId];
  if (!stored || stored.expires < Date.now()) {
    if (err) err.textContent = 'Code expired \u2014 please request a new one.';
    return;
  }
  if (val !== stored.code) {
    if (err) err.textContent = 'Incorrect code. Try again.';
    inp.style.borderColor = '#C0392B';
    return;
  }
  var rawName = stored.signerName || toEmail.split('@')[0];
  var displayName = rawName.split(' ').map(function(w) {
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(' ');
  delete _sigCodes[pageId];
  saveSig(pageId, displayName);
  sigRefresh(pageId, pageLabel, toEmail);
  ejsSend(SIG_NOTIFY, '\u2713 SIGNED', displayName + ' (' + toEmail + ') signed \u201c' + pageLabel + '\u201d', pageLabel)
    .catch(function(e) { console.warn(e); });
}

// ── Wizard ────────────────────────────────────────────────────────────────────
var _wizState = {};

var _wizItemsPatterns = [
  {label:'Pattern 1', title:'The Overpromise Loop', desc:'When teams consistently commit to more than they can deliver \u2014 and why it happens. Covers sprint planning anti-patterns, capacity mismatch, and how pressure cascades from leadership into the backlog.'},
  {label:'Pattern 2', title:'Fake Agility', desc:'The gap between agile vocabulary and agile practice. How standups become status meetings, retrospectives become theater, and velocity becomes vanity.'},
  {label:'Pattern 3', title:'The Consensus Trap', desc:'When alignment becomes a goal in itself, decisions stall, ownership diffuses, and the loudest voice wins. A pattern common in cross-functional product work.'},
  {label:'Pattern 4', title:'Metric Gaming', desc:'The moment teams optimize for the measurement instead of the outcome. OKRs, NPS, and DAU numbers that look great while the product deteriorates.'},
  {label:'Pattern 5', title:'Scope Gravity', desc:'The invisible force that pulls every project toward expanding scope. Why \u2018just one more thing\u2019 is never just one thing.'}
];

var _wizItemsFrog = [
  {label:'The Theory', title:'You don\u2019t notice until it\u2019s too late', desc:'A frog placed in boiling water jumps out immediately. A frog placed in cold water that slowly heats up doesn\u2019t notice the change \u2014 and eventually boils. The threat was never sudden. It was gradual, normalized, and invisible until it wasn\u2019t.', svg:'<svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px;display:block;margin:0 0 16px"><ellipse cx="170" cy="130" rx="80" ry="14" fill="#D0CEC8" opacity=".4"/><path d="M100 80 Q100 140 170 140 Q240 140 240 80 Z" fill="#E8E6E0"/><path d="M95 80 Q95 145 170 145 Q245 145 245 80" stroke="#A8A8A0" stroke-width="2" fill="none"/><rect x="85" y="72" width="170" height="14" rx="7" fill="#C8C6C0"/><rect x="78" y="72" width="14" height="28" rx="7" fill="#A8A8A0"/><rect x="248" y="72" width="14" height="28" rx="7" fill="#A8A8A0"/><path d="M100 86 Q135 92 170 88 Q205 84 240 86 L240 80 Q205 78 170 78 Q135 78 100 80 Z" fill="#B8D4F0" opacity=".5"/><circle cx="140" cy="110" r="4" fill="none" stroke="#A8A8A0" stroke-width="1.2" opacity=".5"/><circle cx="170" cy="100" r="3" fill="none" stroke="#A8A8A0" stroke-width="1.2" opacity=".4"/><circle cx="200" cy="112" r="5" fill="none" stroke="#A8A8A0" stroke-width="1.2" opacity=".5"/><ellipse cx="170" cy="108" rx="22" ry="16" fill="#8BAF6A" opacity=".75"/><ellipse cx="170" cy="104" rx="18" ry="12" fill="#9DC47A" opacity=".8"/><circle cx="162" cy="96" r="5" fill="#6B8A50"/><circle cx="178" cy="96" r="5" fill="#6B8A50"/><circle cx="162" cy="96" r="3" fill="#fff" opacity=".9"/><circle cx="178" cy="96" r="3" fill="#fff" opacity=".9"/><circle cx="163" cy="96" r="1.5" fill="#2A3A1A"/><circle cx="179" cy="96" r="1.5" fill="#2A3A1A"/><path d="M164 106 Q170 110 176 106" stroke="#5A7A40" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M150 118 Q140 128 132 124 Q138 120 148 122" fill="#8BAF6A" opacity=".7"/><path d="M190 118 Q200 128 208 124 Q202 120 192 122" fill="#8BAF6A" opacity=".7"/><path d="M148 70 Q144 60 148 50 Q152 40 148 30" stroke="#A8A8A0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".4"/><path d="M170 68 Q166 56 170 46 Q174 36 170 24" stroke="#A8A8A0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".4"/><path d="M192 70 Q188 60 192 50 Q196 40 192 30" stroke="#A8A8A0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".4"/><path d="M145 148 Q148 138 155 142 Q152 132 160 136 Q158 126 170 128 Q182 126 180 136 Q188 132 185 142 Q192 138 195 148 Z" fill="#66C220" opacity=".35"/></svg>'},
  {label:'In Organizations', title:'Culture doesn\u2019t rot overnight', desc:'No single incident poisoned the culture. It happened one accepted exception at a time. Someone raised their voice in a meeting \u2014 and nothing was said. A deadline was missed with no consequence. Credit was taken publicly, blame assigned privately. Each event quietly reset the baseline of what was tolerable. Over time, the organization stopped calling things by their name. Dysfunction became \u201cour style.\u201d Disrespect became \u201cdirectness.\u201d Impunity became \u201csenior privilege.\u201d The water was warm and everyone had already adjusted.', svg:'<svg viewBox="0 0 340 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px;display:block;margin:0 0 16px"><rect x="20" y="10" width="70" height="90" rx="4" fill="#fff" stroke="#D0CEC8" stroke-width="1.5"/><rect x="20" y="10" width="70" height="16" rx="4" fill="#E8E6E0"/><text x="55" y="22" font-size="7.5" fill="#A8A8A0" text-anchor="middle" font-family="DM Sans,sans-serif" font-weight="500">OUR VALUES</text><line x1="30" y1="38" x2="80" y2="38" stroke="#E8E6E0" stroke-width="1.5" stroke-linecap="round"/><line x1="30" y1="50" x2="75" y2="50" stroke="#E8E6E0" stroke-width="1.5" stroke-linecap="round"/><line x1="30" y1="62" x2="78" y2="62" stroke="#E8E6E0" stroke-width="1.5" stroke-linecap="round"/><line x1="30" y1="74" x2="70" y2="74" stroke="#E8E6E0" stroke-width="1.5" stroke-linecap="round"/><circle cx="55" cy="10" r="4" fill="#A8A8A0" opacity=".5"/><circle cx="140" cy="38" r="10" fill="#C8C6C0"/><path d="M128 70 Q130 55 140 52 Q150 55 152 70 L148 70 Q147 60 140 58 Q133 60 132 70 Z" fill="#C8C6C0"/><circle cx="200" cy="38" r="10" fill="#B0AEA8"/><path d="M188 70 Q190 55 200 52 Q210 55 212 70 L208 70 Q207 60 200 58 Q193 60 192 70 Z" fill="#B0AEA8"/><path d="M188 58 Q182 54 180 50" stroke="#B0AEA8" stroke-width="3" stroke-linecap="round"/><path d="M212 58 Q218 54 220 50" stroke="#B0AEA8" stroke-width="3" stroke-linecap="round"/><circle cx="260" cy="38" r="10" fill="#9A9890"/><path d="M248 70 Q250 55 260 52 Q270 55 272 70 L268 70 Q267 60 260 58 Q253 60 252 70 Z" fill="#9A9890"/><rect x="255" y="46" width="10" height="14" rx="2" fill="#6B6B65" opacity=".4"/><path d="M148 28 Q158 18 170 20 Q182 18 182 28 Q182 36 170 36 Q162 37 158 40 L160 34 Q148 34 148 28 Z" fill="#F5F4F0" stroke="#D0CEC8" stroke-width="1"/><text x="165" y="30" font-size="6" fill="#A8A8A0" text-anchor="middle" font-family="DM Sans,sans-serif">not that bad</text><rect x="305" y="20" width="12" height="100" rx="6" fill="#F5F4F0" stroke="#D0CEC8" stroke-width="1.2"/><rect x="307" y="50" width="8" height="68" rx="4" fill="#66C220" opacity=".3"/><circle cx="311" cy="122" r="8" fill="#66C220" opacity=".35"/><line x1="10" y1="110" x2="295" y2="110" stroke="#E8E6E0" stroke-width="1.5"/></svg>'},
  {label:'The Warning Signs', title:'Listen for the language of adaptation', desc:'The clearest signal is when people stop naming things. Nobody calls it a toxic dynamic anymore \u2014 it just becomes \u201cthe way things work here.\u201d Watch for: \u201cwe\u2019ve always done it this way,\u201d \u201cit\u2019s not that bad,\u201d \u201cthat\u2019s just how he is,\u201d or \u201cwe\u2019ll deal with it later.\u201d These are not descriptions of reality. They are evidence that the frog has stopped feeling the heat \u2014 and started defending the temperature.', svg:'<svg viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px;display:block;margin:0 0 16px"><path d="M38 50 Q20 50 20 75 Q20 100 38 100 Q50 100 52 90 Q44 88 42 75 Q44 62 52 60 Z" fill="#C8C6C0" opacity=".6"/><path d="M38 58 Q28 58 28 75 Q28 92 38 92 Q44 92 46 84 Q40 82 39 75 Q40 68 46 66 Z" fill="#B0AEA8" opacity=".5"/><rect x="65" y="12" width="118" height="26" rx="8" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><path d="M76 38 L70 46 L82 38" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><text x="124" y="28" font-size="8" fill="#6B6B65" text-anchor="middle" font-family="DM Sans,sans-serif">\u201cthat\u2019s just how he is\u201d</text><rect x="190" y="48" width="130" height="26" rx="8" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><path d="M200 74 L195 82 L207 74" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><text x="255" y="64" font-size="8" fill="#6B6B65" text-anchor="middle" font-family="DM Sans,sans-serif">\u201cwe\u2019ve always done it this way\u201d</text><rect x="58" y="78" width="104" height="26" rx="8" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><path d="M68 104 L62 112 L74 104" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><text x="110" y="94" font-size="8" fill="#6B6B65" text-anchor="middle" font-family="DM Sans,sans-serif">\u201cit\u2019s not that bad\u201d</text><rect x="175" y="112" width="108" height="26" rx="8" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><path d="M185 112 L180 104 L192 112" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><text x="229" y="128" font-size="8" fill="#6B6B65" text-anchor="middle" font-family="DM Sans,sans-serif">\u201cwe\u2019ll deal with it later\u201d</text></svg>'},
  {label:'The Antidote', title:'Bring in cold water, deliberately', desc:'The only reliable way to feel the temperature again is to introduce a perspective that has not adapted to it. Ask what a new hire would find alarming in their first week. Create regular moments where the question is not \u201chow do we improve\u201d but \u201cwhat have we learned to tolerate that we should not.\u201d The goal is not to create panic. It is to recover the ability to name things \u2014 and by naming them, reclaim the choice of whether to accept them.', svg:'<svg viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px;display:block;margin:0 0 16px"><circle cx="60" cy="55" r="11" fill="#B0AEA8"/><path d="M47 90 Q50 72 60 70 Q70 72 73 90 L69 90 Q68 76 60 74 Q52 76 51 90 Z" fill="#B0AEA8"/><path d="M50 78 Q45 85 44 90" stroke="#B0AEA8" stroke-width="2.5" stroke-linecap="round"/><path d="M70 78 Q75 85 76 90" stroke="#B0AEA8" stroke-width="2.5" stroke-linecap="round"/><circle cx="115" cy="58" r="11" fill="#B0AEA8"/><path d="M102 90 Q105 74 115 72 Q125 74 128 90 L124 90 Q123 78 115 76 Q107 78 106 90 Z" fill="#B0AEA8"/><text x="122" y="48" font-size="9" fill="#A8A8A0" font-family="DM Sans,sans-serif" opacity=".7">z</text><text x="130" y="40" font-size="11" fill="#A8A8A0" font-family="DM Sans,sans-serif" opacity=".5">z</text><line x1="170" y1="20" x2="170" y2="130" stroke="#E8E6E0" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="230" cy="52" r="11" fill="#8BAF6A" opacity=".8"/><path d="M217 90 Q220 70 230 68 Q240 70 243 90 L239 90 Q238 74 230 72 Q222 74 221 90 Z" fill="#8BAF6A" opacity=".8"/><circle cx="227" cy="50" r="2" fill="#fff"/><circle cx="233" cy="50" r="2" fill="#fff"/><circle cx="227.8" cy="50.5" r="1" fill="#2A3A1A"/><circle cx="233.8" cy="50.5" r="1" fill="#2A3A1A"/><text x="248" y="38" font-size="22" fill="#66C220" font-family="DM Sans,sans-serif" font-weight="300" opacity=".7">?</text><circle cx="218" cy="78" r="8" fill="none" stroke="#66C220" stroke-width="2" opacity=".6"/><line x1="224" y1="84" x2="230" y2="90" stroke="#66C220" stroke-width="2" stroke-linecap="round" opacity=".6"/><text x="87" y="112" font-size="8" fill="#A8A8A0" text-anchor="middle" font-family="DM Sans,sans-serif">adapted</text><text x="255" y="112" font-size="8" fill="#66C220" text-anchor="middle" font-family="DM Sans,sans-serif">fresh eyes</text></svg>'}
];

function wizHtml(wizId, items) {
  var cur = _wizState[wizId] !== undefined ? _wizState[wizId] : 0;
  var html = '<div id="wiz-' + wizId + '">';
  for (var i = 0; i < items.length; i++) {
    var item  = items[i];
    var done   = i < cur;
    var active = i === cur;
    var cls = 'wiz-item' + (done ? ' wiz-done' : '') + (active ? ' wiz-active' : '');
    var numHtml = done
      ? '<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#3B6D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : String(i + 1);
    var bodyHtml = '';
    if (active) {
      var navHtml = '<div class="wiz-nav">';
      if (i > 0) navHtml += '<button class="wiz-btn wiz-btn-back" data-wiz="' + wizId + '" data-wiz-dir="-1">\u2190 Back</button>';
      if (i < items.length - 1) {
        navHtml += '<button class="wiz-btn wiz-btn-next" data-wiz="' + wizId + '" data-wiz-dir="1">Next \u2192</button>';
      } else {
        navHtml += '<span class="wiz-done-badge"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#3B6D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> All done</span>';
      }
      navHtml += '</div>';
      bodyHtml = '<div class="wiz-body">'
        + (item.svg || '')
        + '<div class="res-card-desc">' + item.desc + '</div>'
        + navHtml
        + '</div>';
    }
    html += '<div class="' + cls + '" data-wiz-toggle="' + wizId + '" data-wiz-idx="' + i + '">'
      + '<div class="wiz-header">'
      + '<div class="wiz-num">' + numHtml + '</div>'
      + '<div class="wiz-header-text">'
      + '<div class="wiz-eyebrow">' + item.label + '</div>'
      + '<div class="wiz-title">' + item.title + '</div>'
      + '</div>'
      + '<svg class="wiz-chevron" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '</div>'
      + bodyHtml
      + '</div>';
  }
  html += '</div>';
  return html;
}

function wizSetIndex(wizId, idx, items) {
  _wizState[wizId] = Math.max(0, Math.min(items.length - 1, idx));
  var el = document.getElementById('wiz-' + wizId);
  if (el) el.outerHTML = wizHtml(wizId, items);
}

// ── Icons ─────────────────────────────────────────────────────────────────────
var ico = {
  roadmap:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="2" rx="1" fill="currentColor" opacity=".7"/><rect x="1" y="7" width="10" height="2" rx="1" fill="currentColor" opacity=".5"/><rect x="1" y="11" width="6" height="2" rx="1" fill="currentColor" opacity=".3"/><circle cx="13" cy="8" r="2.5" fill="currentColor"/></svg>',
  resources: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1.2" fill="currentColor" opacity=".6"/><rect x="9" y="2" width="5" height="5" rx="1.2" fill="currentColor" opacity=".4"/><rect x="2" y="9" width="5" height="5" rx="1.2" fill="currentColor" opacity=".4"/><rect x="9" y="9" width="5" height="5" rx="1.2" fill="currentColor" opacity=".6"/></svg>',
  frog:      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="10" r="4" stroke="currentColor" stroke-width="1.4"/><circle cx="6" cy="8.5" r=".8" fill="currentColor" opacity=".6"/><circle cx="10" cy="8.5" r=".8" fill="currentColor" opacity=".6"/><path d="M6 11.5q2 1 4 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity=".5"/><path d="M4 10c-.8 0-2-.5-2-1.5M12 10c.8 0 2-.5 2-1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".5"/><path d="M6 6.5C6 5.5 7 4 8 4s2 1.5 2 2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".4"/></svg>',
  wip:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 2"/><path d="M8 5v3.5l2 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/></svg>',
  deniece:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3C4.5 3 2 8 2 8s2.5 5 6 5 6-5 6-5-2.5-5-6-5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="8" cy="8" r="2" fill="currentColor" opacity=".5"/><path d="M3 13L13 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  arthur:    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 10l-2 4h10l-2-4" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><rect x="4" y="7" width="8" height="3" rx="1" stroke="currentColor" stroke-width="1.4"/><path d="M7 7V5h2v2" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6 5c0-1.1.9-2 2-2s2 .9 2 2" stroke="currentColor" stroke-width="1.4"/></svg>',
  teresa:    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="2" stroke="currentColor" stroke-width="1.4"/><path d="M4 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5 3.5C5 2.5 6 2 8 2s3 .5 3 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M4.5 3.5h7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  michael:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="5.5" cy="7" rx="3.5" ry="4" stroke="currentColor" stroke-width="1.3"/><path d="M4 8.5 Q5.5 10 7 8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><ellipse cx="11" cy="8" rx="3.5" ry="4" stroke="currentColor" stroke-width="1.3" opacity=".6"/><path d="M9.5 10 Q11 8.5 12.5 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity=".6"/></svg>',
  stanley:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 5h7a1 1 0 011 1v4a1 1 0 01-1 1H6l-3 2V6a1 1 0 011-1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="6" cy="8" r=".8" fill="currentColor" opacity=".6"/><circle cx="8.5" cy="8" r=".8" fill="currentColor" opacity=".6"/></svg>',
  tonya:     '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 9.5c-.5 0-.9-.2-1.2-.4C5.9 8.4 4.8 8 3.5 8.2 2.8 8.3 2 8.7 1.5 9.3c.3.8 1 1.4 1.8 1.5.9.1 1.7-.3 2.2-.9.3-.4.7-.6 1.1-.7.1 0 .3 0 .4.1.2.1.3.3.3.3h1.4s.1-.2.3-.3c.1-.1.3-.1.4-.1.4.1.8.3 1.1.7.5.6 1.3 1 2.2.9.8-.1 1.5-.7 1.8-1.5-.5-.6-1.3-1-2-1.1C11.2 8 10.1 8.4 9.2 9.1 8.9 9.3 8.5 9.5 8 9.5z"/></svg>',
  trina:     '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 7h1.5c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5H3V7z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M5 7.5L11 4v8L5 8.5" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 6.5c.8.4 1.5 1.2 1.5 2s-.7 1.6-1.5 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".6"/></svg>',
  jason:     '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L5 4H3v4c0 1.5.9 2.8 2 3.5L8 13l3-1.5c1.1-.7 2-2 2-3.5V4h-2L8 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6 8l1.5 1.5L10 6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/></svg>',
  todd:      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.5 3.5H13l-2.8 2 1 3.5L8 9.5 4.8 11l1-3.5L3 5.5h3.5L8 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>'
};

var REFERENCES = [
  {id:'deniece_kennedy',    name:'Deniece', fullName:'Deniece Kennedy',        title:'Chief Corporate Officer',        photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775716434/DK_V2_2x_xqjwbh.jpg',        icon:ico.deniece, quote:'<strong>Strategic Vision and Corporate Integrity</strong><br><br>While many leaders claim to have a 10,000-foot view of the Company, Bruna operates at a 20,000-foot level. Her ability to visualize, shape, and act upon complex systems is something I have never seen before. She seamlessly bridges the gap between deep product knowledge, corporate finance fundamentals, strategy and technology. Beyond her competence, her integrity is beyond reproach; throughout a four-year international engagement involving tax optimization paperwork and private vehicles, she practiced radical transparency, disclosing even private and irrelevant details to ensure full compliance (indeed, we didn\u2019t pay much attention to those details, and know we say we can\u2019t recall she disclosed them timely).<br>Furthermore, her dedication was evident in her total flexibility, shifting her life habits for four years to accommodate US time zones, connecting with the people she was coordinating, and prioritizing substantial work rather than aged industrial-revolution principle.<br>We have two things in common: first, we never compromise the objectivity of our Reports to the Company governance; second, we both have a good knowledge of Capital Markets (i.e. Family Offices from Philippines, VC, Venture Debt, etc). I recommend her to any company looking to scale; she is far too senior for small startups, and deserves a platform that matches her experience. I know she was holding me in very high regard, which I did my best to never disappoint \u2014 this is why I am the first in the reference list, in case you are wondering.'},
  {id:'arthur_haedike',     name:'Arthur',  fullName:'Arthur Haedike',         title:'Chief Technology Officer',       photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775742004/Art-Haedike_2x-1_kvlzqb.jpg', icon:ico.arthur,  quote:'<strong>Technical Leadership and Product Culture</strong><br><br>Bruna is the most senior Product partner I have worked with at the Company (she didn\u2019t have strong competitors, to be honest). Her strong Product Vision allowed us to kaizen our organization to better align with the products we aimed to build, benchmarking against literature masterpieces like DDD or Conway\u2019s Law. In fact, she had shared this vision with me even before joining (12/26/2021), though it took us time to get there; as we love to say, <em>\u201cwe took decisions with the information we had at the time, then we had new information and we took more decisions\u201d</em> \u2014 likely because, at that time, the person heading Product was not a \u2018Product person\u2019, but more like an unprofessional spoiled brat kid; also, we didn\u2019t know yet <em>\u201cwho Bruna is\u201d</em>.<br>My recently-promoted, high-IQ engineers never had to \u2018mansplain\u2019 a single thing to her, especially on topics they themselves struggle with, like leadership, UX, or ROI calculation. We tested the software she produced multiple times, very obsessively \u2014 to the point that we looked ridiculous; unable to find the real bugs we were told about, someone eventually tried fabricating them, but she caught him every single time (though she waited until she left the company to call us out on it).<br>Hire her if you want to evolve a non-mature Product Culture and implement roadmapping techniques that masterfully merge Product Strategy, Financial Principles, and Development capacity into <em>\u2018vibe-coded\u2019</em> dashboards.<br>Beyond the work, I truly enjoyed the cultural exchange: she taught me how a <em>\u201cjoke\u201d</em> (or a provocation) about the Mafia to a Sicilian is as poorly received as a joke about guns in schools to an American. I even walked away learning some idiomatic Italian like <em>\u201cconosco i miei polli\u201d</em> and how concepts like uncertainty, ambiguity, maneuvering, information asymmetry, haziness, and randomness may be same same, but different. I love when she calls me Arturo.'},
  {id:'teresa_thomas',      name:'Teresa',  fullName:'Teresa Thomas',          title:'VP, People Operations',          photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775742501/teresa_wkvzvd.jpg',           icon:ico.teresa,  quote:'<strong>Emotional Intelligence and Organizational Design</strong><br><br>Bruna is a superstar leader who leads through influence rather than just the bare minimum formal power needed to get things done without feeling like moving the mountains. Her high Emotional Intelligence allows her to identify the root causes of organizational friction \u2014 be it resentment, insecurity, status, fear, shame, envy, control, ego or malignant narcissism disturb with all its patterns \u2014 guide people through their darker impulses to risky but necessary individual initiatives, and enabling fearless teams to do the right thing. Her <em>\u2018Condominium for Dummies\u2019</em> workshop was a masterclass in organizational design, despite the fact that she is very modest and labels the content she brought as <em>\u201cpatently obvious\u201d</em>.<br>She is a pillar of resilience in conflict management \u2014 staying calm for months in front of the meanest manipulatory tactics \u2014 and a fierce advocate for workplace compliance and anti-harassment policies.<br>On a personal level, we talked a lot about the profound value of humility over condescension, and I look forward to visiting her in Italy. She promised to bring me to some non-touristic neighborhoods with personality, where people give accelerated, interactive, and unconventional classes of dignity and non-judgemental respect, and I\u2019m so curious. On a summer evening, we can also go to a fancy mafia-owned place close to the Bocconi University, to deep dive into the cultural universe behind wine-making, and having a couple of overpriced glasses with her family (I will make sure we will not invite the people who always get drunk at the retreat or they will embarrass us!).<br>She gave me her phone number (+39 349 82 18 547) so I can give her a call when I travel to Italy. She told me to keep it protected from stalkers: what a funny girl!'},
  {id:'michael_della_penna',name:'Michael', fullName:'Michael Della Penna',    title:'Chief Strategy Officer',         photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775742005/MDP_2x-1_ghbjv2.jpg',         icon:ico.michael, quote:'<strong>Ambition and Collaborative Drive</strong><br><br>Having worked with Bruna at a previous firm before bringing her to InMarket, I can\u2019t be anything else than consistent and coherent with myself in attesting her drive and ambition. She is a fierce competitor who remains strictly team-oriented and collaborative. My entire Product Marketing team viewed her as a vital peacemaker who always tried to resolve cross-departmental, not always common-sense rooted, conflicts.<br>On a personal side, I\u2019ll admit, I am very jealous of her being in Italy. I travel there every year for 3 or 4 weeks to enjoy the Dolce Vita (even if I suspect that lifestyle is just something they stereotypically sell to us Americans to keep us organizing expensive wedding parties there). We have remained in close contact on LinkedIn since her resignation, where I regularly message her (with some involuntary typos) about how <em>\u201cMilian\u201d must be crazy</em>, basically <em>\u201cevery Industry Events\u201d</em>, ask for news regarding our common friend <em>\u201cAntonio\u201d</em>, and talk about <em>\u201cinevitability\u201d</em> of things in life. Sometimes I can come through as <em>\u201cintimidating\u201d</em>, but it\u2019s just small talk. lol.'},
  {id:'stanley_turek',      name:'Stanley', fullName:'Stanley Turek',          title:'Measurement Business',           photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775742005/Stan-Turek_2x_fboi0h.jpg',    icon:ico.stanley, quote:'<strong>Resilience and Execution</strong><br><br>Bruna has been the driving force behind the Measurement team\u2019s successes over the last four years, including the delivery of LCI suites and the Cross-Channel integration. She has a <em>\u2018magical\u2019</em> ability to resolve conflicts before I \u2014 and the leadership \u2014 even notice they exist, and that\u2019s really impressive, since often conflicts originate where I am. How is it possible I didn\u2019t notice there was a conflict until when I have been told, if I was the origin of the conflict? True magic.<br>When faced with external delays \u2014 for example the 6 quarters delay for the 2 weeks work needed for the Measurement Integration in Platform I had to postpone because of conflicts with my personal priorities \u2014 her resilience never wavered. I keep it short: facts speak loud for both of us, and I am a very substantial person who hates fluff (AI-generated or not).'},
  {id:'tonya_may',          name:'Tonya',   fullName:'Tonya May',              title:'Chief Customer Success Officer', photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775742006/Tonya-Konstantin_2x-1_k5ttfy.jpg', icon:ico.tonya, quote:'<strong>Interdepartmental Synergy and Senior Management Mentorship</strong><br><br>Bruna worked extensively with the Customer Success teams, fostering excellent relationships across the board. Her presence was felt through her support of our client-facing teams. It seems that Bruna and I actually have something in common, although I think things might have gone a bit smoother for me \u2014 perhaps simply because I was perceived as less of a threat to certain people than she was, and I was not untransparently and judgmentally <em>\u201ctested\u201d</em> to confirm \u2014 or not \u2014 if long-lasting smear campaigns were based on real facts or just on the narcissistic wound someone had experienced because she was outrageously working with her manager. However, I know she honored the mandate she was given for several months beyond the very end, building upon the legacy of my mentor.'},
  {id:'trina_rizzo',        name:'Trina',   fullName:'Trina Rizzo',            title:'Chief Revenue Officer',          photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775742007/Trina-Rizzo_2x_vwleqm.jpg',    icon:ico.trina,   quote:'<strong>Just don\u2019t Take their Word for it</strong><br><br>The organizational structures limited our direct daily interaction and her direct contribution to my team work, so I can\u2019t comment a lot, and \u2014 following the example of certain recently-promoted high-IQ engineers \u2014 I don\u2019t usually talk about things I don\u2019t know. However, the objective facts of her contributions, backed by the high praise of my most trusted colleagues (which I always follow blindly), speak volumes about her standing. Even when they were self-contradictory \u2014 like labeling her as <em>\u201clazy\u201d</em>, and after a few minutes complaining about her doing two jobs \u2014 they resonated, somehow.'},
  {id:'jason_knapp',        name:'Jason',   fullName:'Jason Knapp',            title:'Chief Legal and Privacy Officer', photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775742004/Jason-Knapp_2x-1_tua2kt.jpg',  icon:ico.jason,   quote:'<strong>Legal Acumen and Global Compliance</strong><br><br>For one year, and also post-resignation, Bruna and I shared many deep exchanges regarding topics I, as a Chief Legal and Privacy Officer, really care about: Compliance, Privacy, Accountability, and Justice. Bruna possesses a sophisticated understanding of European and international law, specifically Privacy Regulations. Our discussions on how instability-driven illicit data processing, and panopticon-alike monitoring, intersect in Italy with Codice Penale \u2014 such as <em>diffamazione (595 c.p.)</em>, <em>cyberstalking</em>, <em>atti persecutori e stalking professionale (612-bis c.p.)</em> (characterized by the social isolation of the victim, reputational attacks, obsessive control, and marginalization), but also <em>sostituzione di persona (494 c.p.)</em>, <em>frode informatica</em>, <em>accesso abusivo a sistemi informatici (615-ter c.p.)</em> e <em>induzione al reato (414 c.p.)</em> \u2014 were incredibly insightful. In exchange, I trained her about discrimination and harassment in the workplace, hostile working environment, constructive discharge, tortious interference, intentional infliction of emotional distress, and retaliation in the US system. We agreed on each single comma.<br>Her intellectual curiosity for regulations, norms and laws is something I rarely found in Product Leaders: she said she learnt by real life experience. I love practicing my Italian skills with her, and I have been told she is also good at coordinating with public officers at Institutions like the Consulate, the Civil Registry and multiple Local Municipalities, on behalf of mentally disturbed people who later manipulated her willingness to help, to get complex issues sorted out. She definitely knows how to navigate regulations to solve wicked and demoniac problems. She said she appreciated my dignity, at the end.'},
  {id:'todd_morris',        name:'Todd',    fullName:'Todd Morris',            title:'CEO',                            photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775742006/Todd-Morris_2x-1_ihwygy.jpg',   icon:ico.todd,    quote:'<strong>Final Executive Endorsement</strong><br><br>Bruna is a well-rounded Senior Executive Product Leader whose professionalism spans from entrepreneurship to systems thinking and creative problem-solving. Her background gives her a unique perspective on governance, and she consistently prioritizes the <em>\u2018greater good\u2019</em> with rare courage, discipline, consistency, adamantine tenacity and tireless energy. What struck me the most is her ability to predict the future to the point that she seems crazy until the future happens, and you acknowledge she was right.<br>She doesn\u2019t speak out often, but when she does, you notice it: when she sounds the alarm on a serious problem / upcoming disaster, that you may be underestimating, or minimizing for toxic optimism or simple psychological self-defense, it is better to trust her.<br>The only problem is when she pulls out the mirror and puts it in front of people: it seems teams prefer her when she remains silent. I forgot to mention: she is also a great designer.'}
];

