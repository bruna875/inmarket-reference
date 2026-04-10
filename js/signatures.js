// signatures.js — signature request, verify, render


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

