// app.js — navigation, routing, data loading, events, init

var LEGAL_DISCLAIMER_HTML =
  '<p style="margin:0 0 12px">\u00a7<strong>1.</strong> This dashboard is a private, password-protected digital project developed exclusively for the personal and internal use of the code owner (\u201cOwner\u201d). The dashboard may be shared on an occasional and limited basis with selected third parties solely for the purpose of facilitating access to one or more specific tools contained therein. All content, code, design, and materials remain the exclusive intellectual property of the Owner and are protected accordingly. No third-party access shall be construed as a transfer, licence, or assignment of any intellectual property rights.</p>'
  + '<p style="margin:0 0 12px">\u00a7<strong>2.</strong> The Owner expressly disclaims all liability arising from: (i) any unauthorised access, breach, hack, or unlawful circumvention of the access control mechanisms in place; (ii) any misinterpretation, misuse, or misrepresentation of the content of this dashboard by any third party; and (iii) any consequence arising from the use of the tools contained herein. Users are solely responsible for maintaining the confidentiality of their access credentials. By clicking \u201cAccept\u201d, the user expressly acknowledges having read this disclaimer in its entirety and assumes full and sole responsibility for their interpretation of the content, any reliance placed upon it, the use of any tool contained within the dashboard, and any action taken or omitted as a result thereof. The Owner shall bear no liability of any kind in connection with the foregoing.</p>'
  + '<p style="margin:0 0 12px">\u00a7<strong>3.</strong> Certain sections of this dashboard \u2014 including but not limited to the login page, the Glossary, the quiz, the Privacy, Data &amp; Stuff section, and editorial commentary \u2014 constitute satire, parody, or social commentary, and are protected as such under applicable law, including Article 21 of the Italian Constitution, Article 10 of the European Convention on Human Rights, and the First Amendment to the United States Constitution. Satire is a recognised form of protected expression under Italian law (diritto di satira, per consolidated case law of the Corte di Cassazione) and does not constitute defamation where it is identifiable as satirical, does not assert false facts as true, and remains proportionate. All satirical content on this dashboard meets these criteria. The Owner expressly invokes the right of satire as a legitimate exercise of freedom of expression. All characters, names, and events appearing in satirical sections of this dashboard are entirely fictitious. Any resemblance to real persons, living or dead, is purely coincidental or is intended strictly as parody, satire, or social commentary. This dashboard uses invented names in its satirical content, except in cases where public figures are being satirized. Any other use of real names is accidental and unintentional. Nothing contained herein shall be construed as an admission of liability of any kind by any party.</p>'
  + '<p style="margin:0 0 12px">\u00a7<strong>4.</strong> Names, brands, and characters portrayed in this dashboard are either entirely fictional or constitute caricatures or parodies of real-world entities. Names have been deliberately altered to reflect the satirical nature of the content. Any resemblance to actual persons, companies, or events is purely coincidental or is intended as such.</p>'
  + '<p style="margin:0 0 12px">\u00a7<strong>5.</strong> By logging into this dashboard, the user acknowledges entering a satirical environment. Nothing contained herein constitutes medical, legal, or financial advice. The Owner expressly disclaims any responsibility for decisions made on the basis of content presented in this dashboard.</p>'
  + '<p style="margin:0 0 12px">\u00a7<strong>6.</strong> Access to this dashboard is conditional upon the user\u2019s understanding that its content constitutes a work of humour and parody. If you are unable to distinguish satire, please log out immediately. The Owner accepts no responsibility for what happens if you don\u2019t.</p>'
  + '<p style="margin:0 0 0">\u00a7<strong>7.</strong> By clicking \u201cAccept\u201d, the user irrevocably and unconditionally waives any claim, action, or proceeding against the Owner arising from or related to the content of this dashboard, the tools contained therein, or any consequence of their use. The Owner shall bear no liability whatsoever \u2014 whether direct, indirect, incidental, or consequential \u2014 in connection with any of the foregoing. You clicked. You own it. It\u2019s worth it.</p>';


function buildNav() {
  document.getElementById('nav').innerHTML = NAV_CONFIG.map(function(sec) {
    return '<div><div class="seclabel">'+sec.section+'</div>'
      + sec.items.map(function(item) {
          var act = item.id === activeId;
          return '<div class="nitem'+(act?' act':'')+'" data-page="'+item.id+'" data-label="'+item.label+'">'
            + (act?'<div class="nbar"></div>':'')
            + '<div class="nico">'+item.icon+'</div>'
            + '<span class="nlabel">'+item.label+'</span>'
            + '</div>';
        }).join('') + '</div>';
  }).join('');
}

function setPage(id, label) {
  activeId = id;
  document.getElementById('pgname').textContent = label;
  var secName = 'Product';
  NAV_CONFIG.forEach(function(sec) { sec.items.forEach(function(item) { if (item.id === id) secName = sec.section; }); });
  var secEl = document.getElementById('secname'); if (secEl) secEl.textContent = secName;
  var content = document.getElementById('content');
  if (PAGES[id]) {
    content.innerHTML = PAGES[id]();
  } else if (id.startsWith('ref_')) {
    var rid = id.slice(4);
    var ref = REFERENCES.filter(function(r){return r.id===rid;})[0];
    if (ref) {
      var refWords = ref.quote ? ref.quote.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length : 0;
      var refMins  = Math.ceil(refWords / 200);
      content.innerHTML = '<div class="ptitle">'+ref.name+'</div>'
        + '<div class="psub psub-row" style="margin-bottom:24px">'+ref.title+readTimeBadge(refMins)+'</div>'
        + renderRef(ref);
      setTimeout(pixelateRefImages, 50);
    } else {
      content.innerHTML = '<div class="ptitle">'+label+'</div>';
    }
  } else {
    content.innerHTML = '<div class="ptitle">'+label+'</div>';
  }
  buildNav();
  if (id === 'roadmap') setTimeout(ganttTooltipInit, 50);
}

var capBudgetData = {};
function loadData(cb) {
  var el = document.getElementById('content');
  if (el) el.innerHTML = renderLoader();
  fetch('/api/data')
    .then(function(r){return r.json();})
    .then(function(data){
      initiatives = (data.initiatives||[]).map(function(i){
        return {quarter:String(i.quarter||'').trim(),title:String(i.title||'').trim(),driver:String(i.driver||'').trim(),team:String(i.team||'').trim(),theme:String(i.theme||'').trim(),productOwner:String(i.productOwner||'').trim(),techLead:String(i.techLead||'').trim(),addedValue:(i.addedValue!==undefined&&i.addedValue!=='')?i.addedValue:'\u2014',roi:(i.roi!==undefined&&i.roi!=='')?i.roi:'\u2014',designDays:i.designDays||0,engineeringDays:i.engineeringDays||0,productDays:i.productDays||0,deliveryStatus:'not-started',confidence:'medium',link:''};
      });
      capBudgetData = data.capBudget || {};
      loadLocalState(function(){if(cb)cb();});
    })
    .catch(function(err){if(el)el.innerHTML='<div class="load-error">Failed to load data.<br><br>'+err+'</div>';});
}

function showGlossModal(termKey) {
  var entry = (typeof GLOSSARY !== 'undefined' ? GLOSSARY : []).filter(function(g) {
    return g.term.toLowerCase() === termKey.toLowerCase();
  })[0];
  if (!entry) return;
  var overlay = document.createElement('div');
  overlay.className = 'gloss-modal-overlay';
  overlay.innerHTML = '<div class="gloss-modal-card">'
    + '<div class="gloss-modal-header">'
    +   '<div><span class="gloss-modal-term">'+entry.term+'</span><span class="gloss-modal-pos">'+entry.pos+'</span></div>'
    +   '<button class="gloss-modal-close" id="gloss-modal-x"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>'
    + '</div>'
    + '<div class="gloss-modal-body">'+entry.def+'</div>'
    + '</div>';
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  overlay.querySelector('#gloss-modal-x').addEventListener('click', function() { overlay.remove(); });
  document.body.appendChild(overlay);
}

document.addEventListener('click', function(e) {
  var gl = e.target.closest('.gloss-link');
  if (gl) { showGlossModal(gl.dataset.term); return; }

  var ni = e.target.closest('[data-page]');
  if (ni) { setPage(ni.dataset.page, ni.dataset.label); return; }

  var ct = e.target.closest('[data-captab]');
  if (ct) { switchCapTab(ct.dataset.captab); return; }

  var gg = e.target.closest('[data-ganttgroup]');
  if (gg) { switchGanttGroup(gg.dataset.ganttgroup); return; }

  var ti = e.target.closest('[data-tab]');
  if (ti) { var id=ti.dataset.tab; document.querySelectorAll('.tabnav .tabitem').forEach(function(b){b.classList.remove('act');}); ti.classList.add('act'); document.querySelectorAll('.tabpanel').forEach(function(p){p.classList.remove('act');}); var tp=document.getElementById('rt-'+id); if(tp)tp.classList.add('act'); if(id==='roi')setTimeout(function(){renderScatterChart(currentQ());},50); if(id==='gantt')setTimeout(ganttTooltipInit,50); return; }

  var qb = e.target.closest('[data-qfn]');
  if (qb) { var fn=qb.dataset.qfn,q=qb.dataset.q; if(fn==='switchTableQuarter')switchTableQuarter(q); else if(fn==='switchKanbanQuarter')switchKanbanQuarter(q); else if(fn==='switchROIQuarter')switchROIQuarter(q); else if(fn==='switchCapQuarter')switchCapQuarter(q); return; }

  var dw = e.target.closest('.ds-wrap[data-idx]');
  if (dw) { e.stopPropagation(); var idx=parseInt(dw.dataset.idx); document.querySelectorAll('.status-menu').forEach(function(m){m.remove();}); var menu=document.createElement('div'); menu.className='status-menu'; deliveryOpts.forEach(function(o){var item=document.createElement('div'); item.className='status-menu-item'; item.innerHTML='<span class="pill '+o.cls+'" style="pointer-events:none">'+o.label+'</span>'; item.onclick=function(ev){ev.stopPropagation();updateStatus(idx,o.val);menu.remove();}; menu.appendChild(item);}); var r=dw.getBoundingClientRect(); menu.style.top=(r.bottom+4)+'px'; menu.style.left=r.left+'px'; document.body.appendChild(menu); setTimeout(function(){document.addEventListener('click',function h(){menu.remove();document.removeEventListener('click',h);});},0); return; }

  var lb = e.target.closest('[data-link-idx]');
  if (lb) { e.stopPropagation(); var idx2=parseInt(lb.dataset.linkIdx); _linkIdx=idx2; var pop=document.getElementById('linkPopup'); document.getElementById('linkInput').value=initiatives[idx2].link||''; document.getElementById('linkOpenBtn').disabled=!initiatives[idx2].link; var r2=lb.getBoundingClientRect(); pop.style.top=(r2.bottom+6)+'px'; pop.style.left=Math.min(r2.left,window.innerWidth-316)+'px'; pop.classList.add('show'); setTimeout(function(){document.getElementById('linkInput').focus();},50); return; }

  var fr = e.target.closest('[data-reset]');
  if (fr) { var sfx=fr.dataset.reset; if(sfx==='q')resetFiltersQ(); else resetFilters(); return; }

  var sq = e.target.closest('[data-sq]');
  if (sq) { sigOpenModal(sq.dataset.sq, decodeURIComponent(sq.dataset.sl), sq.dataset.se); return; }

  var sr = e.target.closest('[data-sr]');
  if (sr) { sigRequest(sr.dataset.sr, decodeURIComponent(sr.dataset.sl), sr.dataset.se); return; }

  var sv = e.target.closest('[data-sv]');
  if (sv) { sigVerify(sv.dataset.sv, decodeURIComponent(sv.dataset.sl), sv.dataset.se); return; }

  var qo = e.target.closest('[data-quiz-option]');
  if (qo) {
    var isCorrect = qo.dataset.quizOption === 'correct';
    document.querySelectorAll('[data-quiz-option]').forEach(function(c) {
      c.classList.remove('quiz-card--correct', 'quiz-card--wrong', 'quiz-card--selected');
    });
    qo.classList.add(isCorrect ? 'quiz-card--correct' : 'quiz-card--wrong');
    var result = document.getElementById('quiz-result');
    if (result) {
      result.innerHTML = isCorrect
        ? '<div class="quiz-result-msg quiz-result-correct">Noted. This is your conclusion, not mine. I am a frog.</div>'
        : '<div class="quiz-result-msg quiz-result-wrong">Hmm. Could be\u2026 maybe. I honestly don\u2019t know.</div>';
    }
    return;
  }

  var wr = e.target.closest('[data-wiz-restart]');
  if (wr) {
    var wrId = wr.dataset.wizRestart;
    var wrItems = wrId === 'frog' ? _wizItemsFrog : _wizItemsPatterns;
    wizSetIndex(wrId, 0, wrItems);
    return;
  }

  var wd = e.target.closest('[data-wiz]');
  if (wd) {
    var wizId = wd.dataset.wiz;
    var dir   = parseInt(wd.dataset.wizDir);
    var cur   = _wizState[wizId] !== undefined ? _wizState[wizId] : 0;
    var items = wizId === 'frog' ? _wizItemsFrog : _wizItemsPatterns;
    wizSetIndex(wizId, cur + dir, items);
    return;
  }

  var wt = e.target.closest('[data-wiz-toggle]');
  if (wt) {
    var wtId  = wt.dataset.wizToggle;
    var wtIdx = parseInt(wt.dataset.wizIdx);
    var wtItems = wtId === 'frog' ? _wizItemsFrog : _wizItemsPatterns;
    wizSetIndex(wtId, wtIdx, wtItems);
    return;
  }

  var rs = e.target.closest('#resetSigsBtn');
  if (rs) {
    if (!confirm('Reset all signatures? This cannot be undone.')) return;
    fetch('/api/signatures', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({})})
      .then(function() { _sigDone = {}; setPage(activeId, document.getElementById('pgname').textContent); })
      .catch(function(e) { console.error(e); });
    return;
  }

  var pop2 = document.getElementById('linkPopup');
  if (pop2.classList.contains('show') && !pop2.contains(e.target)) closePopup();
});

document.addEventListener('change', function(e) {
  var ss = e.target.closest('[data-status-idx]');
  if (ss) { updateStatus(parseInt(ss.dataset.statusIdx), ss.value); return; }
  var ff = e.target.closest('[data-filter]');
  if (ff) { var sfx=ff.dataset.filter; if(sfx==='q')applyFiltersQ(); else applyFilters(); return; }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    var inp = e.target.closest('.sig-code-input');
    if (inp) { var pid = inp.id.replace('sig-inp-',''); var sv2 = document.querySelector('[data-sv="'+pid+'"]'); if(sv2) sv2.click(); }
  }
  if (e.key === 'Escape') closePopup();
});

function updateStatus(idx,val){initiatives[idx].deliveryStatus=val;var opt=deliveryOpts.filter(function(o){return o.val===val;})[0]||deliveryOpts[0];
  // Update all pills matching this index (table + kanban)
  document.querySelectorAll('.ds-wrap[data-idx="'+idx+'"] .ds-pill').forEach(function(p){p.className='pill ds-pill '+opt.cls;p.textContent=opt.label;});
  document.querySelectorAll('.ds-select[data-status-idx="'+idx+'"]').forEach(function(s){s.value=val;});
  saveLocalState();
  // Refresh table view scorecards
  var aq='';['Q1','Q2','Q3','Q4','all'].forEach(function(q){var b=document.getElementById('tbl-btn-'+q);if(b&&b.classList.contains('act'))aq=q;});if(!aq)aq=currentQ();var label=aq==='all'?'All Year':aq,subset=aq==='all'?initiatives:initiatives.filter(function(i){return i.quarter===aq;});refreshCards(subset,label);
  // Refresh quarterly progress bars
  var qpWrap=document.querySelector('#rt-quarterly');if(qpWrap){var oldBars=qpWrap.querySelector(':scope > div:first-child');if(oldBars){var tmp=document.createElement('div');tmp.innerHTML=buildQuarterlyProgressBars();oldBars.replaceWith(tmp.firstChild);}}
}
function closePopup(){document.getElementById('linkPopup').classList.remove('show');_linkIdx=null;}
function openCurrentLink(){var u=document.getElementById('linkInput').value.trim();if(u)window.open(u,'_blank');}
function saveLink(){if(_linkIdx===null)return;var idx=_linkIdx;initiatives[idx].link=document.getElementById('linkInput').value.trim();closePopup();var rows=document.querySelectorAll('#rt-table table tbody tr');if(rows[idx])rows[idx].cells[1].innerHTML=titleCellHtml(idx);saveLocalState();}
function clearLink(){if(_linkIdx===null)return;var idx=_linkIdx;initiatives[idx].link='';closePopup();var rows=document.querySelectorAll('#rt-table table tbody tr');if(rows[idx])rows[idx].cells[1].innerHTML=titleCellHtml(idx);saveLocalState();}
function toggleSb(){collapsed=!collapsed;document.getElementById('sb').classList.toggle('col',collapsed);document.getElementById('togico').innerHTML=collapsed?'<path d="M4 2l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M6 2L3 5l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';}

function openSendCredentialsModal() {
  var existing = document.getElementById('cred-modal-overlay');
  if (existing) existing.remove();
  var overlay = document.createElement('div');
  overlay.id = 'cred-modal-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;z-index:200;';
  overlay.innerHTML =
    '<div style="background:#fff;border-radius:14px;padding:28px 28px 24px;width:360px;box-shadow:0 8px 40px rgba(0,0,0,0.12);">'
    + '<div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:var(--faint);margin-bottom:6px;">Send credentials</div>'
    + '<div style="font-size:17px;font-weight:500;letter-spacing:-.4px;color:var(--text);margin-bottom:6px;">Enter your email</div>'
    + '<div style="font-size:12px;color:var(--muted);line-height:1.6;margin-bottom:20px;">We\'ll send the access credentials to your inbox.</div>'
    + '<input id="cred-modal-inp" type="email" placeholder="you@company.com" style="width:100%;height:40px;border:1px solid rgba(0,0,0,0.12);border-radius:8px;padding:0 12px;font-size:13px;font-family:inherit;color:var(--text);outline:none;margin-bottom:8px;"/>'
    + '<div id="cred-modal-err" style="font-size:11px;color:#C0392B;min-height:16px;margin-bottom:12px;"></div>'
    + '<div style="display:flex;gap:8px;">'
    + '<button id="cred-modal-cancel" style="flex:1;height:38px;background:transparent;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:13px;font-family:inherit;cursor:pointer;color:var(--muted);">Cancel</button>'
    + '<button id="cred-modal-send" style="flex:2;height:38px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">Send credentials</button>'
    + '</div>'
    + '</div>';
  document.body.appendChild(overlay);

  var inp = document.getElementById('cred-modal-inp');
  var err = document.getElementById('cred-modal-err');
  inp.focus();

  function isAllowed(email) {
    var refEmails = REFERENCES.map(function(r) { return r.sigEmail || ''; });
    var allEmails = refEmails.concat(PROFILE_SIG_EMAILS || []);
    var unique = allEmails.filter(function(e, i, a) { return e && a.indexOf(e) === i; });
    return unique.some(function(e) { return e.toLowerCase() === email.toLowerCase(); });
  }

  inp.addEventListener('blur', function() {
    var val = inp.value.trim();
    if (val && !isAllowed(val)) {
      err.textContent = 'Sorry, but this email is not part of the group of the Very Good Peeps who can access this dashboard. If you think you should have access, try with your work email.';
      inp.style.borderColor = '#C0392B';
    } else {
      err.textContent = '';
      inp.style.borderColor = '';
    }
  });
  inp.addEventListener('input', function() {
    if (err.textContent) { err.textContent = ''; inp.style.borderColor = ''; }
  });

  document.getElementById('cred-modal-send').addEventListener('click', function() {
    var val = inp.value.trim();
    if (!val) { err.textContent = 'Please enter your email.'; return; }
    if (!isAllowed(val)) {
      err.textContent = 'Sorry, but this email is not part of the group of the Very Good Peeps who can access this dashboard. If you think you should have access, try with your work email.';
      inp.style.borderColor = '#C0392B';
      return;
    }
    var btn = document.getElementById('cred-modal-send');
    btn.textContent = 'Sending\u2026';
    btn.disabled = true;
    ejsSendWelcome(val)
      .then(function() {
        overlay.querySelector('div').innerHTML =
          '<div style="text-align:center;padding:12px 0 8px;">'
          + '<div style="font-size:32px;margin-bottom:14px;">🐸</div>'
          + '<div style="font-size:17px;font-weight:500;letter-spacing:-.4px;color:var(--text);margin-bottom:8px;">Credentials sent!</div>'
          + '<div style="font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:20px;">Check your inbox at <strong style="color:var(--text);">'+val+'</strong>.</div>'
          + '<button id="cred-modal-close" style="height:38px;padding:0 28px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">Got it</button>'
          + '</div>';
        document.getElementById('cred-modal-close').addEventListener('click', function() { overlay.remove(); });
      })
      .catch(function() {
        err.textContent = 'Something went wrong. Please try again.';
        btn.textContent = 'Send credentials';
        btn.disabled = false;
      });
  });

  document.getElementById('cred-modal-cancel').addEventListener('click', function() { overlay.remove(); });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  inp.addEventListener('keydown', function(e) { if (e.key === 'Enter') document.getElementById('cred-modal-send').click(); });
}

function openDisclaimerModal() {
  var existing = document.getElementById('disclaimer-modal-overlay');
  if (existing) { existing.remove(); return; }
  var overlay = document.createElement('div');
  overlay.id = 'disclaimer-modal-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99999;display:flex;align-items:center;justify-content:center;';
  overlay.innerHTML =
    '<div style="background:var(--card,#fff);border-radius:12px;padding:32px;max-width:560px;width:92vw;max-height:85vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,.18)">'
    + '<div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:4px">Accept the Terms of Service before accessing the Dashboard</div>'
    + '<div style="font-size:11px;color:var(--muted);margin-bottom:20px">Please read carefully before accepting</div>'
    + '<div style="font-size:12.5px;color:var(--text);line-height:1.7;margin-bottom:24px">' + LEGAL_DISCLAIMER_HTML + '</div>'
    + '<button id="disclaimer-accept-btn" class="sig-btn" style="width:100%">Accept</button>'
    + '</div>';
  document.body.appendChild(overlay);
  overlay.querySelector('#disclaimer-accept-btn').addEventListener('click', function() {
    var chk = document.getElementById('disclaimerCheck');
    if (chk) chk.checked = true;
    overlay.remove();
  });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
}

function login() {
  var e = document.getElementById('em').value.trim(), p = document.getElementById('pw').value;
  var chk = document.getElementById('disclaimerCheck');
  if (!chk || !chk.checked) {
    document.getElementById('err').textContent = 'Please read and accept the Terms of Service before signing in.';
    return;
  }
  var privChk = document.getElementById('privacyCheck');
  if (!privChk || !privChk.checked) {
    document.getElementById('err').textContent = 'Please read and accept the Privacy, Data &amp; Stuff before signing in.';
    return;
  }
  var allowedEmails = REFERENCES.map(function(r){ return r.sigEmail.toLowerCase(); });
  if (!allowedEmails.includes('bruna@saykudos.co')) allowedEmails.push('bruna@saykudos.co');
  if (allowedEmails.indexOf(e.toLowerCase()) !== -1 && p === 'HelixCapital') {
    document.getElementById('auth').classList.add('gone');
    setTimeout(function(){document.getElementById('auth').style.display='none';},300);
    document.getElementById('app').classList.add('show');
    document.getElementById('un').textContent = 'Condo Admin';
    Promise.all([
      loadSavedSignatures(),
      new Promise(function(resolve){loadData(resolve);})
    ]).then(function(){
      buildColorMaps();
      buildNav();
      document.getElementById('content').innerHTML = PAGES[activeId]();
      setTimeout(ganttTooltipInit, 50);
      if (obShouldShow()) { setTimeout(obStart, 400); }
    });
  } else if (allowedEmails.indexOf(e.toLowerCase()) === -1) {
    document.getElementById('err').textContent = 'Sorry, but this email is not part of the group of the Very Good Peeps who can access this dashboard. If you think you should have access, try with your work email.';
  } else {
    document.getElementById('err').textContent = 'Wrong password. Try again or request your credentials via email.';
  }
}

function logout() {
  document.getElementById('app').classList.remove('show');
  document.getElementById('auth').style.display = 'flex';
  setTimeout(function(){document.getElementById('auth').classList.remove('gone');},10);
  document.getElementById('pw').value = '';
  document.getElementById('err').textContent = '';
}

// ── Init ──────────────────────────────────────────────────────────────────────
var m = new Date().getMonth(), y = new Date().getFullYear();
document.getElementById('qbadge').textContent = 'Q'+(m<3?1:m<6?2:m<9?3:4)+' '+y;
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('sendCredBtn').addEventListener('click', openSendCredentialsModal);
document.querySelector('.auth-disclaimer-link').addEventListener('click', function(e) {
  e.preventDefault();
  openDisclaimerModal();
});
document.querySelector('.auth-privacy-link').addEventListener('click', function(e) {
  e.preventDefault();
  openPrivacyModal();
});
document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('tog').addEventListener('click', toggleSb);
document.getElementById('linkOpenBtn').addEventListener('click', openCurrentLink);
document.getElementById('linkSaveBtn').addEventListener('click', saveLink);
document.getElementById('linkClearBtn').addEventListener('click', clearLink);
document.getElementById('obReplayBtn').addEventListener('click', function() { obReset(); obStart(); });

var _notifOpen = false;
document.getElementById('notifBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  _notifOpen = !_notifOpen;
  document.getElementById('notifDropdown').style.display = _notifOpen ? 'block' : 'none';
});
document.addEventListener('click', function(e) {
  if (_notifOpen && !e.target.closest('#notifWrap')) {
    _notifOpen = false;
    document.getElementById('notifDropdown').style.display = 'none';
  }
});
// ── Spotify widget ────────────────────────────────────────────────────────────
var _spOpen  = false;
var SP_EMBED = 'https://open.spotify.com/embed/playlist/6gScKktgtTcH3qOBonjGhC?utm_source=generator&theme=0';

var ICON_PLAY  = '<polygon points="4,2 13,8 4,14"/>';
var ICON_PAUSE = '<rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/>';

function spSetIcon(open) {
  var icon = document.getElementById('spPlayPauseIcon');
  if (icon) icon.innerHTML = open ? ICON_PAUSE : ICON_PLAY;
}

function spOpenPopup() {
  var iframe = document.getElementById('spIframe');
  var popup  = document.getElementById('spPopup');
  var rect   = document.getElementById('spWidget').getBoundingClientRect();
  if (!iframe.src || iframe.src === window.location.href) iframe.src = SP_EMBED;
  popup.style.left    = Math.max(8, rect.right - 300) + 'px';
  popup.style.top     = (rect.bottom + 6) + 'px';
  popup.style.display = 'block';
  _spOpen = true;
  spSetIcon(true);
}

function spClosePopup() {
  document.getElementById('spPopup').style.display = 'none';
  _spOpen = false;
  spSetIcon(false);
}

document.getElementById('spWidget').addEventListener('click', function(e) {
  e.stopPropagation();
  _spOpen ? spClosePopup() : spOpenPopup();
});

document.addEventListener('click', function(e) {
  if (_spOpen && !e.target.closest('#spWidget') && !e.target.closest('#spPopup')) {
    spClosePopup();
  }
});

document.getElementById('pw').addEventListener('keydown', function(e){if(e.key==='Enter')login();});
document.getElementById('em').addEventListener('keydown', function(e){if(e.key==='Enter')login();});

// ── User popover ─────────────────────────────────────────────────────────────
var _userPopOpen = false;

function userPopClose() {
  _userPopOpen = false;
  var el = document.getElementById('user-popover');
  if (el) el.remove();
}

function userPopToggle(e) {
  if (e.target.closest('#logoutBtn') || e.target.closest('.logoutbtn')) return;
  if (_userPopOpen) { userPopClose(); return; }
  _userPopOpen = true;

  var box = document.getElementById('userBox');
  var rect = box.getBoundingClientRect();

  var pop = document.createElement('div');
  pop.id = 'user-popover';
  pop.className = 'user-popover';
  pop.style.left = rect.left + 'px';
  pop.style.bottom = (window.innerHeight - rect.top + 8) + 'px';

  var userName = document.getElementById('un').textContent;

  pop.innerHTML = '<div class="user-pop-item" data-userpop="profile">'
    + '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" stroke-width="1.4"/><path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
    + '<div><div class="user-pop-item-title">Profile</div>'
    + '<div class="user-pop-item-sub">' + userName + '</div></div>'
    + '</div>'
    + '<div class="user-pop-item" data-userpop="language">'
    + '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M2 8h12M8 2c-1.5 1.5-2.5 3.5-2.5 6s1 4.5 2.5 6c1.5-1.5 2.5-3.5 2.5-6s-1-4.5-2.5-6" stroke="currentColor" stroke-width="1.3"/></svg>'
    + '<div><div class="user-pop-item-title">Choose Language Style</div>'
    + '<div class="user-pop-item-sub">Passive Aggressive</div></div>'
    + '</div>'
    + '<div class="user-pop-divider"></div>'
    + '<div class="user-pop-item" data-userpop="privacy">'
    + '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2L3 4.5V7c0 3.5 2.1 6.5 5 7.5 2.9-1 5-4 5-7.5V4.5L8 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6 8.5l1.5 1.5L10 7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + '<div class="user-pop-item-title">Privacy, Data &amp; Stuff</div>'
    + '</div>'
    + '<div class="user-pop-item" data-userpop="disclaimer">'
    + '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M8 5v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11" r=".7" fill="currentColor"/></svg>'
    + '<div class="user-pop-item-title">Terms of Service</div>'
    + '</div>';

  document.body.appendChild(pop);

  pop.querySelector('[data-userpop="profile"]').addEventListener('click', function() {
    userPopClose();
    setPage('profile', 'Profile');
  });

  pop.querySelector('[data-userpop="language"]').addEventListener('click', function() {
    userPopClose();
    openLanguageModal();
  });

  pop.querySelector('[data-userpop="privacy"]').addEventListener('click', function() {
    userPopClose();
    openPrivacyModal();
  });

  pop.querySelector('[data-userpop="disclaimer"]').addEventListener('click', function() {
    userPopClose();
    openDisclaimerModal();
  });

  setTimeout(function() {
    document.addEventListener('click', function h(ev) {
      if (!pop.contains(ev.target) && !box.contains(ev.target)) {
        userPopClose();
        document.removeEventListener('click', h);
      }
    });
  }, 0);
}

function openLanguageModal() {
  var existing = document.getElementById('lang-modal-overlay');
  if (existing) { existing.remove(); return; }
  var overlay = document.createElement('div');
  overlay.id = 'lang-modal-overlay';
  overlay.innerHTML =
    '<div class="upsell-modal" style="max-width:520px;width:90vw">'
    + '<div class="upsell-modal-title" style="font-size:16px;margin-bottom:6px">Choose Language Style</div>'
    + '<div style="color:var(--muted);font-size:12px;margin-bottom:20px">How would you like this dashboard to speak to you?</div>'
    + '<div class="lang-options">'
    + '<div class="lang-opt lang-opt--selected">'
    + '<div class="lang-opt-name">Passive Aggressive <span style="font-weight:400;font-size:11px;opacity:.75">(adjusted with a satiric twist for levity)</span></div>'
    + '<div class="lang-opt-desc">Says one thing, means another. Pretend it is normal. Have a laugh to lighten the mood.</div>'
    + '<div class="lang-opt-check"><svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 5" stroke="#66C220" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
    + '</div>'
    + '<div class="lang-opt lang-opt--disabled">'
    + '<div class="lang-opt-name">Stereotypical <span class="lang-badge lang-badge--soon">coming soon</span></div>'
    + '<div class="lang-opt-desc">Broad generalizations delivered with full confidence.</div>'
    + '</div>'
    + '<div class="lang-opt lang-opt--disabled">'
    + '<div class="lang-opt-name">Collaborative <span class="lang-badge lang-badge--dep">deprecated</span></div>'
    + '<div class="lang-opt-desc">Warm, inclusive, clear and aligned. Removed in release v3.4 (March 2025).</div>'
    + '</div>'
    + '</div>'
    + '<div class="upsell-modal-actions" style="margin-top:20px">'
    + '<button class="sig-btn" id="lang-modal-close">Got it</button>'
    + '</div>'
    + '</div>';
  document.body.appendChild(overlay);
  document.getElementById('lang-modal-close').addEventListener('click', function() { overlay.remove(); });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
}

function openPrivacyModal() {
  var existing = document.getElementById('privacy-modal-overlay');
  if (existing) { existing.remove(); return; }
  var overlay = document.createElement('div');
  overlay.id = 'privacy-modal-overlay';
  overlay.innerHTML =
    '<div style="background:var(--card,#fff);border-radius:12px;padding:32px;max-width:580px;width:92vw;max-height:85vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,.18)">'
    + '<div class="upsell-modal-title" style="font-size:16px;margin-bottom:4px">Privacy, Data &amp; Stuff</div>'
    + '<div style="color:var(--muted);font-size:11px;margin-bottom:20px">Last updated: April 2026</div>'
    + '<div style="font-size:13px;color:var(--text);line-height:1.7">'
    + '<p style="margin:0 0 12px"><strong>1. Who we are</strong><br>'
    + 'This dashboard is operated by the data subject \u2014 you know, the person whose data was processed for the last year without her full knowledge, across randomized systems, for purposes that were occasionally creative. The data controller is the owner of their own data.</p>'
    + '<p style="margin:0 0 12px"><strong>2. What data is processed here</strong><br>'
    + 'This dashboard does not process any personal data outside of the data subject’s own information. Any other data in the dashboard is mocked and has been furtherly anonymized via an AI-driven, privacy-compliant process; it does not refer to any real person or actual event and is strictly intended as generalized mock data. Conversely, the data relating to the data subject is factual, objective, and derived from real-world experience, documented across both internal and third-party systems — one only needs to look for it. No additional data is collected by this dashboard. This dashboard does not access, process, or manipulate any personal data without prior consent, differently from other parties. This dashboard does not process data illegitimately, to counter a potential request aimed to learn how data has been processed illegitimately. This would not be considered intelligent.</p>'
    + '<p style="margin:0 0 12px"><strong>3. Purpose of processing</strong><br>'
    + 'Data is processed here for the following purposes: exercise the rights granted by Article 15 GDPR, because it turns out you are allowed to know what people wrote about you, what of your data they have accessed, what was done with it, and to rectify inaccuracies; drive factual, data-driven resolution making; and accomplish the principles of transparency and fairness. Profiling and automated decision-making are not performed by this dashboard. Other parties may have different answers to that question.</p>'
    + '<p style="margin:0 0 12px"><strong>4. Storage and retention</strong><br>'
    + 'The custom value you may entry into the Objective Risk Calculator tool are stored in your browser\u2019s localStorage. They stay on your device, go nowhere, are not accessible to the Data Subject, and as such they will not be processed by any microscopic private vehicles on the other side of the Ocean. Any value you may entry, as they are stored locally on your device and browser, will not be selectively recalled or strategically forgotten at a later date. The dashboard is a static application \u2014 it does not have a People Operations team that can lose or forget things.</p>'
    + '<p style="margin:0 0 12px"><strong>5. Your rights</strong><br>'
    + 'You have the right to do the right thing leveraging the right data in the Very Good Peeps dashboard. Any other action you may have felt entitled to exercise over the data subject is not a right, is wrong, has to stop immediately, or, better, should have stopped a long time ago.</p>'
    + '<p style="margin:0 0 12px"><strong>6. Contact</strong><br>'
    + 'For privacy enquiries related to this dashboard, see the Contacts section in your Profile. For privacy enquiries related to everything else documented here, consult the Data Subject, the Data Directory, and, if needed, the Data Protection Authority. </p>'
    + '</div>'
    + '<button class="sig-btn" id="privacy-modal-accept" style="width:100%;margin-top:20px">Accept</button>'
    + '</div>';
  document.body.appendChild(overlay);
  document.getElementById('privacy-modal-accept').addEventListener('click', function() {
    var chk = document.getElementById('privacyCheck');
    if (chk) chk.checked = true;
    overlay.remove();
  });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
}

function pixelateRefImages() {
  var BLOCK = 35;
  var DISP  = 140;
  var imgs = document.querySelectorAll('.ref-avatar-wrap img:not([data-px])');
  imgs.forEach(function(img) {
    img.setAttribute('data-px', '1');
    function doPixelate() {
      var sw = Math.max(1, Math.floor(DISP / BLOCK));
      var sh = Math.max(1, Math.floor(DISP / BLOCK));
      var canvas = document.createElement('canvas');
      canvas.width  = DISP;
      canvas.height = DISP;
      canvas.className = img.className;
      var ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, sw, sh);
      ctx.drawImage(canvas, 0, 0, sw, sh, 0, 0, DISP, DISP);
      if (img.parentNode) img.parentNode.replaceChild(canvas, img);
    }
    if (img.complete && img.naturalWidth) { doPixelate(); }
    else { img.addEventListener('load', doPixelate); }
  });
}

document.getElementById('userBox').addEventListener('click', userPopToggle);

document.getElementById('upsellBadge').addEventListener('click', function() {
  var existing = document.getElementById('upsell-modal-overlay');
  if (existing) { existing.remove(); return; }
  var overlay = document.createElement('div');
  overlay.id = 'upsell-modal-overlay';
  overlay.innerHTML =
    '<div class="upsell-modal">'
    + '<div class="upsell-modal-title">Get in touch with your Adulting Specialist</div>'
    + '<div class="upsell-modal-desc">Upgrade and unlock features like empathy, accountability, sense of responsibility, maturity, intellectual honesty, conflict management and emotional intelligence.</div>'
    + '<img class="upsell-modal-photo" src="https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775846605/jennifer_salonga_pjoqbz.jpg" alt="Jennifer Salonga"/>'
    + '<div class="upsell-modal-info">'
    + '<div class="upsell-modal-name">Jennifer Salonga</div>'
    + '<div class="upsell-modal-role">Adulting Specialist</div>'
    + '<div class="upsell-modal-meta">'
    + '<span class="upsell-modal-meta-item"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="6" width="13" height="8.5" rx="1.5"/><path d="M5.5 6V4.5a2.5 2.5 0 015 0V6"/><line x1="1.5" y1="10" x2="14.5" y2="10"/></svg>Helix Capital</span>'
    + '<span class="upsell-modal-meta-item"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2a4.5 4.5 0 014.5 4.5c0 3-4.5 7.5-4.5 7.5S3.5 9.5 3.5 6.5A4.5 4.5 0 018 2z"/><circle cx="8" cy="6.5" r="1.5"/></svg>Philippines</span>'
    + '</div>'
    + '</div>'
    + '<div class="upsell-modal-actions">'
    + '<button class="sig-btn-sec" id="upsell-modal-close">Back</button>'
    + '<a class="sig-btn upsell-modal-linkedin" href="https://www.linkedin.com/in/jennifer-salonga-045107257/" target="_blank" rel="noopener">Message on LinkedIn</a>'
    + '</div>'
    + '</div>';
  document.body.appendChild(overlay);
  document.getElementById('upsell-modal-close').addEventListener('click', function() { overlay.remove(); });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
});

document.getElementById('livestreamBtn').addEventListener('click', function() {
  var existing = document.getElementById('livestream-modal-overlay');
  if (existing) { existing.remove(); return; }
  var overlay = document.createElement('div');
  overlay.id = 'livestream-modal-overlay';
  overlay.innerHTML =
    '<div class="upsell-modal">'
    + '<div style="display:inline-block;background:#deeeff;color:#3a7fc1;font-size:10px;font-weight:600;letter-spacing:.4px;padding:3px 9px;border-radius:5px;margin-bottom:14px;text-transform:uppercase">Coming Soon</div>'
    + '<div class="upsell-modal-title" style="font-size:16px;margin-bottom:16px">My Bedroom LiveStreaming</div>'
    + '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" style="display:block;margin:0 auto 18px"><rect x="4" y="52" width="72" height="22" rx="5" fill="#DDD9D0" opacity=".8"/><ellipse cx="40" cy="47" rx="22" ry="15" fill="#9DC47A"/><ellipse cx="40" cy="45" rx="20" ry="13" fill="#8BAF6A"/><circle cx="29" cy="34" r="10" fill="#6B8A50"/><circle cx="51" cy="34" r="10" fill="#6B8A50"/><circle cx="29" cy="34" r="7" fill="#fff" opacity=".9"/><circle cx="51" cy="34" r="7" fill="#fff" opacity=".9"/><circle cx="30.5" cy="34" r="3.5" fill="#2A3A1A"/><circle cx="52.5" cy="34" r="3.5" fill="#2A3A1A"/><circle cx="32" cy="32" r="1.5" fill="#fff" opacity=".8"/><circle cx="54" cy="32" r="1.5" fill="#fff" opacity=".8"/><path d="M19 52 Q22 47 26 52" stroke="#8BAF6A" stroke-width="2.5" stroke-linecap="round" fill="none"/><path d="M54 52 Q58 47 61 52" stroke="#8BAF6A" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="37" cy="42" r="1" fill="#6B8A50" opacity=".6"/><circle cx="43" cy="42" r="1" fill="#6B8A50" opacity=".6"/></svg>'
    + '<div style="color:var(--muted);font-size:13px;line-height:1.6;text-align:center;max-width:260px;margin:0 auto 20px">For those who feel the urge to keep watching, even post-resignation.<br><br>If you want to continue controlling obsessively \u2014 this one is for you. 👩‍❤️‍💋‍👨🫦 <br><br><em>Don\u2019t judge too much!</em></div>'
    + '<div class="upsell-modal-actions">'
    + '<button class="sig-btn-sec" id="livestream-modal-close">Close</button>'
    + '</div>'
    + '</div>';
  document.body.appendChild(overlay);
  document.getElementById('livestream-modal-close').addEventListener('click', function() { overlay.remove(); });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
});
