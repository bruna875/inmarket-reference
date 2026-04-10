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
      ? '<div class="ptitle">'+anonName(ref.fullName)+'</div><div class="psub" style="margin-bottom:24px">'+ref.title+'</div>'+renderRef(ref)
      : '<div class="ptitle">'+label+'</div>';
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
    .catch(function(err){if(el)el.innerHTML='<div style="padding:40px 32px;font-size:13px;color:#C0392B">Failed to load data.<br><br>'+err+'</div>';});
}

document.addEventListener('click', function(e) {
  var ni = e.target.closest('[data-page]');
  if (ni) { setPage(ni.dataset.page, ni.dataset.label); return; }

  var ct = e.target.closest('[data-captab]');
  if (ct) { switchCapTab(ct.dataset.captab); return; }

  var ti = e.target.closest('[data-tab]');
  if (ti) { var id=ti.dataset.tab; document.querySelectorAll('.tabnav .tabitem').forEach(function(b){b.classList.remove('act');}); ti.classList.add('act'); document.querySelectorAll('.tabpanel').forEach(function(p){p.classList.remove('act');}); var tp=document.getElementById('rt-'+id); if(tp)tp.classList.add('act'); if(id==='roi')setTimeout(function(){renderScatterChart(currentQ());},50); if(id==='gantt')setTimeout(ganttTooltipInit,50); return; }

  var qb = e.target.closest('[data-qfn]');
  if (qb) { var fn=qb.dataset.qfn,q=qb.dataset.q; if(fn==='switchTableQuarter')switchTableQuarter(q); else if(fn==='switchKanbanQuarter')switchKanbanQuarter(q); else if(fn==='switchROIQuarter')switchROIQuarter(q); else if(fn==='switchCapQuarter')switchCapQuarter(q); return; }

  var dw = e.target.closest('.ds-wrap[data-idx]');
  if (dw) { e.stopPropagation(); var idx=parseInt(dw.dataset.idx); document.querySelectorAll('.status-menu').forEach(function(m){m.remove();}); var menu=document.createElement('div'); menu.className='status-menu'; menu.style.cssText='position:fixed;z-index:999;background:var(--surface);border:1px solid var(--border-md);border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.12);padding:4px;min-width:130px;'; deliveryOpts.forEach(function(o){var item=document.createElement('div'); item.style.cssText='padding:7px 10px;border-radius:6px;cursor:pointer;font-size:12px;'; item.innerHTML='<span class="pill '+o.cls+'" style="pointer-events:none">'+o.label+'</span>'; item.onmouseenter=function(){item.style.background='var(--bg)';}; item.onmouseleave=function(){item.style.background='';}; item.onclick=function(ev){ev.stopPropagation();updateStatus(idx,o.val);menu.remove();}; menu.appendChild(item);}); var r=dw.getBoundingClientRect(); menu.style.top=(r.bottom+4)+'px'; menu.style.left=r.left+'px'; document.body.appendChild(menu); setTimeout(function(){document.addEventListener('click',function h(){menu.remove();document.removeEventListener('click',h);});},0); return; }

  var lb = e.target.closest('[data-link-idx]');
  if (lb) { e.stopPropagation(); var idx2=parseInt(lb.dataset.linkIdx); _linkIdx=idx2; var pop=document.getElementById('linkPopup'); document.getElementById('linkInput').value=initiatives[idx2].link||''; document.getElementById('linkOpenBtn').disabled=!initiatives[idx2].link; var r2=lb.getBoundingClientRect(); pop.style.top=(r2.bottom+6)+'px'; pop.style.left=Math.min(r2.left,window.innerWidth-316)+'px'; pop.classList.add('show'); setTimeout(function(){document.getElementById('linkInput').focus();},50); return; }

  var fr = e.target.closest('[data-reset]');
  if (fr) { var sfx=fr.dataset.reset; if(sfx==='q')resetFiltersQ(); else resetFilters(); return; }

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

function login() {
  var e = document.getElementById('em').value.trim(), p = document.getElementById('pw').value;
  if (e === 'condoadmin@verygoodpeeps.co' && p === 'HelixCapital') {
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
      buildColorMaps();
      buildNav();
      document.getElementById('content').innerHTML = PAGES[activeId]();
      setTimeout(ganttTooltipInit, 50);
      if (obShouldShow()) { setTimeout(obStart, 400); }
    });
  } else {
    document.getElementById('err').textContent = 'Invalid credentials. Try: condoadmin@verygoodpeeps.co / HelixCapital';
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
  pop.style.cssText = 'position:fixed;z-index:910;background:var(--surface);border:1px solid var(--border);border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.12);width:220px;padding:6px 0;'
    + 'left:' + rect.left + 'px;bottom:' + (window.innerHeight - rect.top + 8) + 'px;';

  var userName = document.getElementById('un').textContent;

  pop.innerHTML = '<div data-userpop="profile" style="padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background .1s"'
    + ' onmouseover="this.style.background=\'var(--bg)\'" onmouseout="this.style.background=\'\'">'
    + '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" stroke-width="1.4"/><path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
    + '<div><div style="font-size:12px;font-weight:500;color:var(--text)">Profile</div>'
    + '<div style="font-size:11px;color:var(--faint)">' + userName + '</div></div>'
    + '</div>'
    + '<div data-userpop="language" style="padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background .1s"'
    + ' onmouseover="this.style.background=\'var(--bg)\'" onmouseout="this.style.background=\'\'">'
    + '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M2 8h12M8 2c-1.5 1.5-2.5 3.5-2.5 6s1 4.5 2.5 6c1.5-1.5 2.5-3.5 2.5-6s-1-4.5-2.5-6" stroke="currentColor" stroke-width="1.3"/></svg>'
    + '<div><div style="font-size:12px;font-weight:500;color:var(--text)">Language</div>'
    + '<div style="font-size:11px;color:var(--faint)">Passive Aggressive</div></div>'
    + '</div>'
    + '<div style="height:1px;background:var(--border);margin:4px 12px"></div>'
    + '<div data-userpop="privacy" style="padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background .1s"'
    + ' onmouseover="this.style.background=\'var(--bg)\'" onmouseout="this.style.background=\'\'">'
    + '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2L3 4.5V7c0 3.5 2.1 6.5 5 7.5 2.9-1 5-4 5-7.5V4.5L8 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6 8.5l1.5 1.5L10 7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + '<div style="font-size:12px;font-weight:500;color:var(--text)">Privacy Policy</div>'
    + '</div>';

  document.body.appendChild(pop);

  setTimeout(function() {
    document.addEventListener('click', function h(ev) {
      if (!pop.contains(ev.target) && !box.contains(ev.target)) {
        userPopClose();
        document.removeEventListener('click', h);
      }
    });
  }, 0);
}

document.getElementById('userBox').addEventListener('click', userPopToggle);
