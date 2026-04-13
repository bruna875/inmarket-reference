// signatures.js — signature request, verify, render


function maskEmail(email) {
  var at = email.indexOf('@');
  if (at < 0) return email;
  var local = email.slice(0, at);
  var rest  = email.slice(at + 1);
  var dot   = rest.lastIndexOf('.');
  var dom   = dot > -1 ? rest.slice(0, dot) : rest;
  var tld   = dot > -1 ? rest.slice(dot) : '';
  return local.charAt(0) + '***@' + dom.charAt(0) + '*****' + tld;
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
      + '<div class="sig-code-lbl">A code was sent to <strong>' + maskEmail(toEmail) + '</strong>. Enter it below:</div>'
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
    + '</div></div>';
}

function sigRefresh(pageId, pageLabel, toEmail) {
  var el = document.getElementById('sig-wrap-' + pageId);
  if (el) el.innerHTML = sigBoxHtml(pageId, pageLabel, toEmail);
}

function sigRequest(pageId, pageLabel, toEmail) {
  var code = sigGenCode();
  var signerName = pageLabel;
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
  var displayName = rawName.toUpperCase();
  delete _sigCodes[pageId];
  saveSig(pageId, displayName);
  sigRefresh(pageId, pageLabel, toEmail);
  ejsSend(SIG_NOTIFY, '\u2713 SIGNED', displayName + ' (' + toEmail + ') signed \u201c' + pageLabel + '\u201d', pageLabel)
    .catch(function(e) { console.warn(e); });
}

function sigOpenModal(pageId, pageLabel, toEmail) {
  var existing = document.getElementById('sig-modal-overlay');
  if (existing) existing.remove();
  var overlay = document.createElement('div');
  overlay.id = 'sig-modal-overlay';
  var masked = maskEmail(toEmail);
  overlay.innerHTML =
    '<div class="sig-modal">'
    + '<div class="sig-modal-title">Insert your work email</div>'
    + '<div class="sig-modal-input-row">'
    + '<input class="sig-modal-input" id="sig-modal-inp" type="email" placeholder="you@company.co" autocomplete="off"/>'
    + '<button class="sig-modal-help" id="sig-modal-help" title="Show hint" aria-label="Show hint">?</button>'
    + '</div>'
    + '<div class="sig-modal-hint" id="sig-modal-hint" style="display:none">' + masked + '</div>'
    + '<div class="sig-modal-err" id="sig-modal-err"></div>'
    + '<div class="sig-modal-actions">'
    + '<button class="sig-btn-sec" id="sig-modal-cancel">Cancel</button>'
    + '<button class="sig-btn" id="sig-modal-confirm">Continue</button>'
    + '</div>'
    + '</div>';
  document.body.appendChild(overlay);
  var inp = document.getElementById('sig-modal-inp');
  var err = document.getElementById('sig-modal-err');
  inp.focus();
  document.getElementById('sig-modal-confirm').addEventListener('click', function() {
    var val = inp.value.trim().toLowerCase();
    if (val !== toEmail.toLowerCase()) {
      err.textContent = 'Email not corresponding. Use your work email please.';
      inp.style.borderColor = 'var(--danger, #C0392B)';
      return;
    }
    overlay.remove();
    sigRequest(pageId, pageLabel, toEmail);
  });
  document.getElementById('sig-modal-cancel').addEventListener('click', function() { overlay.remove(); });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  inp.addEventListener('keydown', function(e) { if (e.key === 'Enter') document.getElementById('sig-modal-confirm').click(); });
  inp.addEventListener('input', function() {
    var val = inp.value.trim().toLowerCase();
    if (!val) {
      err.textContent = '';
      inp.style.borderColor = '';
    } else if (val !== toEmail.toLowerCase()) {
      err.textContent = 'Email not corresponding. Use your work email please.';
      inp.style.borderColor = 'var(--danger, #C0392B)';
    } else {
      err.textContent = '';
      inp.style.borderColor = '#3B6D11';
    }
  });
  document.getElementById('sig-modal-help').addEventListener('click', function() {
    var hint = document.getElementById('sig-modal-hint');
    hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
  });
}

