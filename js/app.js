// app.js — navigation, routing, data loading, events, init


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
  var content = document.getElementById('content');
  if (PAGES[id]) {
    content.innerHTML = PAGES[id]();
  } else if (id.startsWith('ref_')) {
    var rid = id.slice(4);
    var ref = REFERENCES.filter(function(r){return r.id===rid;})[0];
    content.innerHTML = ref
      ? '<div class="ptitle">'+ref.fullName+'</div><div class="psub" style="margin-bottom:24px">'+ref.title+'</div>'+renderRef(ref)
      : '<div class="ptitle">'+label+'</div>';
  } else {
    content.innerHTML = '<div class="ptitle">'+label+'</div>';
  }
  buildNav();
}

function loadData(cb) {
  var el = document.getElementById('content');
  if (el) el.innerHTML = renderLoader();
  fetch('/api/data')
    .then(function(r){return r.json();})
    .then(function(data){
      initiatives = (data.initiatives||[]).map(function(i){
        return {quarter:String(i.quarter||'').trim(),title:String(i.title||'').trim(),driver:String(i.driver||'').trim(),team:String(i.team||'').trim(),theme:String(i.theme||'').trim(),productOwner:String(i.productOwner||'').trim(),techLead:String(i.techLead||'').trim(),addedValue:(i.addedValue!==undefined&&i.addedValue!=='')?i.addedValue:'\u2014',roi:(i.roi!==undefined&&i.roi!=='')?i.roi:'\u2014',deliveryStatus:'not-started',confidence:'medium',link:''};
      });
      loadLocalState(function(){if(cb)cb();});
    })
    .catch(function(err){if(el)el.innerHTML='<div style="padding:40px 32px;font-size:13px;color:#C0392B">Failed to load data.<br><br>'+err+'</div>';});
}

document.addEventListener('click', function(e) {
  var ni = e.target.closest('[data-page]');
  if (ni) { setPage(ni.dataset.page, ni.dataset.label); return; }

  var ti = e.target.closest('[data-tab]');
  if (ti) { var id=ti.dataset.tab; document.querySelectorAll('.tabnav .tabitem').forEach(function(b){b.classList.remove('act');}); ti.classList.add('act'); document.querySelectorAll('.tabpanel').forEach(function(p){p.classList.remove('act');}); var tp=document.getElementById('rt-'+id); if(tp)tp.classList.add('act'); if(id==='roi')setTimeout(function(){renderScatterChart(currentQ());},50); return; }

  var qb = e.target.closest('[data-qfn]');
  if (qb) { var fn=qb.dataset.qfn,q=qb.dataset.q; if(fn==='switchTableQuarter')switchTableQuarter(q); else if(fn==='switchKanbanQuarter')switchKanbanQuarter(q); else if(fn==='switchROIQuarter')switchROIQuarter(q); return; }

  var dw = e.target.closest('.ds-wrap[data-idx]');
  if (dw) { e.stopPropagation(); var idx=parseInt(dw.dataset.idx); document.querySelectorAll('.status-menu').forEach(function(m){m.remove();}); var menu=document.createElement('div'); menu.className='status-menu'; menu.style.cssText='position:fixed;z-index:999;background:var(--surface);border:1px solid var(--border-md);border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.12);padding:4px;min-width:130px;'; deliveryOpts.forEach(function(o){var item=document.createElement('div'); item.style.cssText='padding:7px 10px;border-radius:6px;cursor:pointer;font-size:12px;'; item.innerHTML='<span class="pill '+o.cls+'" style="pointer-events:none">'+o.label+'</span>'; item.onmouseenter=function(){item.style.background='var(--bg)';}; item.onmouseleave=function(){item.style.background='';}; item.onclick=function(ev){ev.stopPropagation();updateStatus(idx,o.val);menu.remove();}; menu.appendChild(item);}); var r=dw.getBoundingClientRect(); menu.style.top=(r.bottom+4)+'px'; menu.style.left=r.left+'px'; document.body.appendChild(menu); setTimeout(function(){document.addEventListener('click',function h(){menu.remove();document.removeEventListener('click',h);});},0); return; }

  var lb = e.target.closest('[data-link-idx]');
  if (lb) { e.stopPropagation(); var idx2=parseInt(lb.dataset.linkIdx); _linkIdx=idx2; var pop=document.getElementById('linkPopup'); document.getElementById('linkInput').value=initiatives[idx2].link||''; document.getElementById('linkOpenBtn').disabled=!initiatives[idx2].link; var r2=lb.getBoundingClientRect(); pop.style.top=(r2.bottom+6)+'px'; pop.style.left=Math.min(r2.left,window.innerWidth-316)+'px'; pop.classList.add('show'); setTimeout(function(){document.getElementById('linkInput').focus();},50); return; }

  var fr = e.target.closest('[data-reset]');
  if (fr) { resetFilters(); return; }

  var sq = e.target.closest('[data-sq]');
  if (sq) { sigRequest(sq.dataset.sq, decodeURIComponent(sq.dataset.sl), sq.dataset.se); return; }

  var sr = e.target.closest('[data-sr]');
  if (sr) { sigRequest(sr.dataset.sr, decodeURIComponent(sr.dataset.sl), sr.dataset.se); return; }

  var sv = e.target.closest('[data-sv]');
  if (sv) { sigVerify(sv.dataset.sv, decodeURIComponent(sv.dataset.sl), sv.dataset.se); return; }

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
  if (ff) { applyFilters(); return; }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    var inp = e.target.closest('.sig-code-input');
    if (inp) { var pid = inp.id.replace('sig-inp-',''); var sv2 = document.querySelector('[data-sv="'+pid+'"]'); if(sv2) sv2.click(); }
  }
  if (e.key === 'Escape') closePopup();
});

function updateStatus(idx,val){initiatives[idx].deliveryStatus=val;var opt=deliveryOpts.filter(function(o){return o.val===val;})[0]||deliveryOpts[0];var p=document.getElementById('ds-pill-'+idx);if(p){p.className='pill ds-pill '+opt.cls;p.textContent=opt.label;}saveLocalState();}
function closePopup(){document.getElementById('linkPopup').classList.remove('show');_linkIdx=null;}
function openCurrentLink(){var u=document.getElementById('linkInput').value.trim();if(u)window.open(u,'_blank');}
function saveLink(){if(_linkIdx===null)return;var idx=_linkIdx;initiatives[idx].link=document.getElementById('linkInput').value.trim();closePopup();var rows=document.querySelectorAll('#rt-table table tbody tr');if(rows[idx])rows[idx].cells[1].innerHTML=titleCellHtml(idx);saveLocalState();}
function clearLink(){if(_linkIdx===null)return;var idx=_linkIdx;initiatives[idx].link='';closePopup();var rows=document.querySelectorAll('#rt-table table tbody tr');if(rows[idx])rows[idx].cells[1].innerHTML=titleCellHtml(idx);saveLocalState();}
function toggleSb(){collapsed=!collapsed;document.getElementById('sb').classList.toggle('col',collapsed);document.getElementById('togico').innerHTML=collapsed?'<path d="M4 2l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M6 2L3 5l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';}

function login() {
  var e = document.getElementById('em').value.trim(), p = document.getElementById('pw').value;
  if (e === 'condoadmin@inmarket.ai' && p === 'HelixCapital') {
    document.getElementById('auth').classList.add('gone');
    setTimeout(function(){document.getElementById('auth').style.display='none';},300);
    document.getElementById('app').classList.add('show');
    var name = e.split('@')[0];
    // avatar is the frog SVG, don't overwrite
    document.getElementById('un').textContent = name.charAt(0).toUpperCase()+name.slice(1);
    Promise.all([
      loadSavedSignatures(),
      new Promise(function(resolve){loadData(resolve);})
    ]).then(function(){
      buildNav();
      document.getElementById('content').innerHTML = PAGES[activeId]();
      if (obShouldShow()) { setTimeout(obStart, 400); }
    });
  } else {
    document.getElementById('err').textContent = 'Invalid credentials. Try: condoadmin@inmarket.ai / HelixCapital';
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
document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('tog').addEventListener('click', toggleSb);
document.getElementById('linkOpenBtn').addEventListener('click', openCurrentLink);
document.getElementById('linkSaveBtn').addEventListener('click', saveLink);
document.getElementById('linkClearBtn').addEventListener('click', clearLink);
document.getElementById('obReplayBtn').addEventListener('click', function() { obReset(); obStart(); });
document.getElementById('pw').addEventListener('keydown', function(e){if(e.key==='Enter')login();});
document.getElementById('em').addEventListener('keydown', function(e){if(e.key==='Enter')login();});


