// roadmap.js — navigation config, data helpers, roadmap rendering


var NAV_CONFIG = [
  {section:'Product', items:[
    {id:'roadmap',      label:'Product Roadmap',   icon:ico.roadmap},
    {id:'teamcapacity', label:'Team Capacity',      icon:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5" cy="6" r="2.5" stroke="currentColor" stroke-width="1.4" opacity=".7"/><circle cx="11" cy="6" r="2.5" stroke="currentColor" stroke-width="1.4" opacity=".4"/><path d="M1 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".7"/><path d="M11 10c1.7.4 3 1.9 3 3.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".4"/></svg>'}
  ]},
  {section:'References from Very Good Peeps', items:REFERENCES.map(function(r){return{id:'ref_'+r.id,label:r.name,icon:r.icon};}).concat([{id:'wip',label:'Work in Progress',icon:ico.wip}])},
  {section:'Resources', items:[{id:'resources',label:'Recognize the Patterns',icon:ico.resources},{id:'boilingfrog',label:'The Boiling Frog',icon:ico.frog},{id:'faqdsar',label:'FAQ / DSAR Directory',icon:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M6.5 6.5c0-1 .7-1.5 1.5-1.5s1.5.5 1.5 1.5c0 .7-.5 1-1 1.3-.2.1-.5.3-.5.7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="10.5" r=".6" fill="currentColor"/></svg>'}]}
];

var initiatives=[],deliveryOpts=[
  {val:'not-started',label:'Not Started',cls:'ds-gray'},
  {val:'on-track',   label:'On Track',   cls:'ds-green'},
  {val:'at-risk',    label:'At Risk',    cls:'ds-yellow'},
  {val:'delayed',    label:'Delayed',    cls:'ds-red'}
];
var activeId='roadmap',collapsed=false,_linkIdx=null;

function currentQ(){var m=new Date().getMonth();return 'Q'+(m<3?1:m<6?2:m<9?3:4);}
function currentQLabel(){var m=new Date().getMonth(),y=new Date().getFullYear();return 'Q'+(m<3?1:m<6?2:m<9?3:4)+' '+y;}
function fmtDollar(v){if(!v||v==='\u2014')return '\u2014';var n=parseFloat(String(v).replace(/[^0-9.-]/g,''));if(isNaN(n))return String(v);return '$'+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',');}
function roiHtml(v){if(!v||v==='\u2014')return '\u2014';var n=parseFloat(String(v).replace(/[^0-9.-]/g,''));if(isNaN(n))return String(v);var p=Math.round(n*100);return '<span style="color:'+(p<0?'#E24B4A':'#3B6D11')+';font-weight:500">'+p+'%</span>';}
function dsHtml(idx){var cur=initiatives[idx].deliveryStatus,opt=deliveryOpts.filter(function(o){return o.val===cur;})[0]||deliveryOpts[0];return '<div class="ds-wrap" data-idx="'+idx+'" style="cursor:pointer"><span class="pill ds-pill '+opt.cls+'" id="ds-pill-'+idx+'">'+opt.label+'</span></div>';}
function linkIconHtml(idx){var i=initiatives[idx],cls='link-btn'+(i.link?' has-link':'');return '<button class="'+cls+'" data-link-idx="'+idx+'" title="'+(i.link?'Edit link':'Add link')+'"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6.5 9.5a4 4 0 005.66 0l2-2a4 4 0 00-5.66-5.66L7.44 2.94" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9.5 6.5a4 4 0 00-5.66 0l-2 2a4 4 0 005.66 5.66l1.06-1.06" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>';}
function titleCellHtml(idx){var i=initiatives[idx],t=i.link?'<a href="'+i.link+'" target="_blank" class="init-title">'+i.title+'</a>':'<span class="init-title">'+i.title+'</span>';return '<div class="init-cell">'+t+linkIconHtml(idx)+'</div>';}
function saveLocalState(){var s={};initiatives.forEach(function(i,idx){s[idx]={deliveryStatus:i.deliveryStatus,link:i.link};});try{localStorage.setItem('inmarket_state',JSON.stringify(s));}catch(e){}fetch('/api/state',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(s)}).catch(function(e){console.warn('state save failed',e);});}
function loadLocalState(cb){fetch('/api/state').then(function(r){return r.json();}).then(function(ls){if(ls&&Object.keys(ls).length>0){Object.keys(ls).forEach(function(idx){var i=initiatives[parseInt(idx)];if(!i)return;i.deliveryStatus=ls[idx].deliveryStatus||i.deliveryStatus;i.link=ls[idx].link||i.link;});try{localStorage.setItem('inmarket_state',JSON.stringify(ls));}catch(e){}}else{try{var r=localStorage.getItem('inmarket_state');if(r){var loc=JSON.parse(r);Object.keys(loc).forEach(function(idx){var i=initiatives[parseInt(idx)];if(!i)return;i.deliveryStatus=loc[idx].deliveryStatus||i.deliveryStatus;i.link=loc[idx].link||i.link;});}}catch(e){}}if(cb)cb();}).catch(function(){try{var r=localStorage.getItem('inmarket_state');if(r){var loc=JSON.parse(r);Object.keys(loc).forEach(function(idx){var i=initiatives[parseInt(idx)];if(!i)return;i.deliveryStatus=loc[idx].deliveryStatus||i.deliveryStatus;i.link=loc[idx].link||i.link;});}}catch(e){}if(cb)cb();});}
function roiCalcGroup(items){var a=0,rs=0,rc=0;items.forEach(function(i){var av=parseFloat(String(i.addedValue||'').replace(/[^0-9.-]/g,''));if(!isNaN(av))a+=av;var r=parseFloat(String(i.roi||'').replace(/[^0-9.-]/g,''));if(!isNaN(r)){rs+=r;rc++;}});return{count:items.length,av:a,roiAvg:rc?rs/rc:NaN};}
function roiFmtAV(n){if(!n&&n!==0)return '\u2014';if(n>=1000000)return '$'+(n/1000000).toFixed(2)+'M';if(n>=1000)return '$'+(n/1000).toFixed(2)+'K';return '$'+n.toFixed(2);}
function roiFmtEU(n){if(!n&&n!==0)return '\u2014';return '$'+n.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function buildQFilter(prefix,fn){var cq=currentQ();var opts=['Q1','Q2','Q3','Q4','all'];if(prefix==='roi'||prefix==='cap')opts.push('backlog');return '<div class="qfilter">'+opts.map(function(q){var lbl=q==='all'?'All Year':q==='backlog'?'Backlog':q,act=q===cq;return '<button id="'+prefix+'-btn-'+q+'" class="qfilter-btn'+(act?' act':'')+'" data-qfn="'+fn+'" data-q="'+q+'">'+lbl+'</button>';}).join('')+'</div>';}
function setQAct(prefix,q){var opts=['Q1','Q2','Q3','Q4','all'];if(prefix==='roi'||prefix==='cap')opts.push('backlog');opts.forEach(function(b){var el=document.getElementById(prefix+'-btn-'+b);if(el){if(b===q)el.classList.add('act');else el.classList.remove('act');}});}
function scInitiativesFor(subset,label){var ns=subset.filter(function(i){return i.deliveryStatus==='not-started';}).length,on=subset.filter(function(i){return i.deliveryStatus==='on-track';}).length,ar=subset.filter(function(i){return i.deliveryStatus==='at-risk';}).length,dl=subset.filter(function(i){return i.deliveryStatus==='delayed';}).length;return '<div class="mcard" id="sc-init"><div class="mlabel">Initiatives <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--faint)">'+label+'</span></div><div class="mval">'+subset.length+'</div><div class="sc-badges"><span class="sc-badge ds-gray">'+ns+' Not Started</span><span class="sc-badge ds-green">'+on+' On Track</span><span class="sc-badge ds-yellow">'+ar+' At Risk</span><span class="sc-badge ds-red">'+dl+' Delayed</span></div></div>';}
var SC_PALETTE=['#66C220','#378ADD','#BA7517','#D4537E','#888780','#1D9E75','#7F77DD','#D85A30','#3B6D11','#993556','#534AB7','#5F5E5A'];
function scGetColor(idx){return SC_PALETTE[idx%SC_PALETTE.length];}
var _driverColorMap={}, _themeColorMap={};
var SC_GREENS=['#3B6D11','#66C220','#1D9E75','#27500A','#8BAF6A','#0F6E56','#97C459','#173404','#5DCAA5','#639922','#9DC47A','#04342C'];
function buildColorMaps(){var ds=[],ts=[];initiatives.forEach(function(i){if(ds.indexOf(i.driver)===-1)ds.push(i.driver);if(ts.indexOf(i.theme)===-1)ts.push(i.theme);});ds.sort();ts.sort();_driverColorMap={};_themeColorMap={};ds.forEach(function(d,i){_driverColorMap[d]=scGetColor(i);});ts.forEach(function(t,i){_themeColorMap[t]=SC_GREENS[i%SC_GREENS.length];});}
function badgeHtml(text,color){var bg=color+'18';return '<span style="display:inline-block;font-size:11px;font-weight:500;padding:2px 9px;border-radius:20px;background:'+bg+';color:'+color+';white-space:nowrap">'+text+'</span>';}
function driverBadge(val){return badgeHtml(val,_driverColorMap[val]||'#888780');}
function themeBadge(val){return badgeHtml(val,_themeColorMap[val]||'#888780');}
function scDonutSvg(slices,size){
  size=size||56;var r=size/2-4,cx=size/2,cy=size/2,circ=2*Math.PI*r;
  var total=0;slices.forEach(function(s){total+=s.v;});
  if(total===0)return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#E8E6E0" stroke-width="6"/></svg>';
  var offset=0,paths='';
  slices.forEach(function(s){if(s.v<=0)return;var pct=s.v/total,dash=pct*circ,gap=circ-dash;
    paths+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+s.c+'" stroke-width="6" stroke-dasharray="'+dash.toFixed(2)+' '+gap.toFixed(2)+'" stroke-dashoffset="'+(-offset).toFixed(2)+'" style="transform:rotate(-90deg);transform-origin:center"/>';
    offset+=dash;});
  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" style="flex-shrink:0">'+paths+'<text x="'+cx+'" y="'+cy+'" text-anchor="middle" dominant-baseline="central" style="font-size:13px;font-weight:500;fill:var(--text)">'+total+'</text></svg>';
}
function scGroupedFor(id,label,key,subset,qlabel){var groups={};subset.forEach(function(i){var k=i[key];if(!groups[k])groups[k]={'not-started':0,'on-track':0,'at-risk':0,'delayed':0,count:0};groups[k][i.deliveryStatus]++;groups[k].count++;});var keys=Object.keys(groups);keys.sort();var colorMap=key==='driver'?_driverColorMap:key==='theme'?_themeColorMap:null;function getC(k,ki){return colorMap&&colorMap[k]?colorMap[k]:scGetColor(ki);}var donutSlices=keys.map(function(k,ki){return{v:groups[k].count,c:getC(k,ki)};});var rows=keys.map(function(k,ki){var g=groups[k],pills='';if(g['not-started']>0)pills+='<span style="font-size:11px;font-weight:500;padding:2px 7px;border-radius:20px;background:#F1EFE8;color:#6B6B65">'+g['not-started']+'</span>';if(g['on-track']>0)pills+='<span style="font-size:11px;font-weight:500;padding:2px 7px;border-radius:20px;background:#EAF3DE;color:#3B6D11">'+g['on-track']+'</span>';if(g['at-risk']>0)pills+='<span style="font-size:11px;font-weight:500;padding:2px 7px;border-radius:20px;background:#FEF3C7;color:#92700A">'+g['at-risk']+'</span>';if(g['delayed']>0)pills+='<span style="font-size:11px;font-weight:500;padding:2px 7px;border-radius:20px;background:#FDECEA;color:#A93226">'+g['delayed']+'</span>';return '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><div style="display:flex;align-items:center;gap:6px;min-width:0"><span style="width:8px;height:8px;border-radius:50%;background:'+getC(k,ki)+';flex-shrink:0;display:inline-block"></span><span style="font-size:12px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+k+'</span></div><div style="display:flex;gap:3px;flex-shrink:0">'+pills+'</div></div>';}).join('');return '<div class="mcard" id="'+id+'"><div class="mlabel">'+label+' <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--faint)">'+qlabel+'</span></div><div style="display:flex;align-items:flex-start;gap:16px;margin-top:10px"><div style="flex-shrink:0;display:flex;align-items:center;justify-content:center">'+scDonutSvg(donutSlices)+'</div><div style="display:flex;flex-direction:column;gap:9px;flex:1;min-width:0">'+rows+'</div></div></div>';}
function refreshCards(subset,label){var sc=document.getElementById('sc-init');if(sc)sc.outerHTML=scInitiativesFor(subset,label);['sc-driver','sc-theme','sc-team'].forEach(function(id,i){var keys=['driver','theme','team'],el=document.getElementById(id);if(el)el.outerHTML=scGroupedFor(id,['By Driver','By Theme','By Team'][i],keys[i],subset,label);});}
function scInitiatives(){var cq=currentQ(),inQ=initiatives.filter(function(i){return i.quarter===cq;});return scInitiativesFor(inQ,currentQLabel());}
function scGrouped(id,label,key){var cq=currentQ(),inQ=initiatives.filter(function(i){return i.quarter===cq;});return scGroupedFor(id,label,key,inQ,currentQLabel());}
function buildFilterOptions(key){var v=[];initiatives.forEach(function(i){if(v.indexOf(i[key])===-1)v.push(i[key]);});v.sort();return v.map(function(x){return '<option value="'+x+'">'+x+'</option>';}).join('');}
function buildFilterBar(s){s=s||'';var ds=deliveryOpts.map(function(o){return '<option value="'+o.val+'">'+o.label+'</option>';}).join('');return '<div class="filterbar"><select id="f-driver'+s+'" data-filter="'+s+'"><option value="">All Drivers</option>'+buildFilterOptions('driver')+'</select><select id="f-team'+s+'" data-filter="'+s+'"><option value="">All Teams</option>'+buildFilterOptions('team')+'</select><select id="f-theme'+s+'" data-filter="'+s+'"><option value="">All Themes</option>'+buildFilterOptions('theme')+'</select><select id="f-po'+s+'" data-filter="'+s+'"><option value="">All Product Owners</option>'+buildFilterOptions('productOwner')+'</select><select id="f-tl'+s+'" data-filter="'+s+'"><option value="">All Tech Leads</option>'+buildFilterOptions('techLead')+'</select><select id="f-status'+s+'" data-filter="'+s+'"><option value="">All Statuses</option>'+ds+'</select><button class="filter-reset" data-reset="'+s+'">Reset</button></div>';}
function applyFilters(){var fd=document.getElementById('f-driver'),ft=document.getElementById('f-team'),fth=document.getElementById('f-theme'),fpo=document.getElementById('f-po'),ftl=document.getElementById('f-tl'),fs=document.getElementById('f-status');document.querySelectorAll('#rt-table table tbody tr').forEach(function(row){var idx=parseInt(row.dataset.idx);var i=initiatives[idx];if(!i){row.style.display='none';return;}row.style.display=(!fd||!fd.value||i.driver===fd.value)&&(!ft||!ft.value||i.team===ft.value)&&(!fth||!fth.value||i.theme===fth.value)&&(!fpo||!fpo.value||i.productOwner===fpo.value)&&(!ftl||!ftl.value||i.techLead===ftl.value)&&(!fs||!fs.value||i.deliveryStatus===fs.value)?'':'none';});}
function applyFiltersQ(){var fd=document.getElementById('f-driverq'),ft=document.getElementById('f-teamq'),fth=document.getElementById('f-themeq'),fpo=document.getElementById('f-poq'),ftl=document.getElementById('f-tlq'),fs=document.getElementById('f-statusq');document.querySelectorAll('#kanban-wrap .kancard').forEach(function(card){var title=card.querySelector('.kancard-title'),tags=card.querySelector('.kancard-tags'),driver=card.querySelector('.kancard-driver'),leads=card.querySelector('.kancard-leads'),pill=card.querySelector('.pill');var tText=title?title.textContent:'',tagText=tags?tags.textContent:'',drvText=driver?driver.textContent.replace(/^Driver\s*/,''):'',leadsText=leads?leads.textContent:'',statusEl=card.querySelector('.ds-select'),statusVal=statusEl?statusEl.value:'';var idx=card.querySelector('.ds-wrap')?parseInt(card.querySelector('.ds-wrap').dataset.idx):-1;var ini=idx>=0?initiatives[idx]:null;if(!ini){card.style.display='none';return;}card.style.display=(!fd||!fd.value||ini.driver===fd.value)&&(!ft||!ft.value||ini.team===ft.value)&&(!fth||!fth.value||ini.theme===fth.value)&&(!fpo||!fpo.value||ini.productOwner===fpo.value)&&(!ftl||!ftl.value||ini.techLead===ftl.value)&&(!fs||!fs.value||ini.deliveryStatus===fs.value)?'':'none';});}
function resetFilters(){['f-driver','f-team','f-theme','f-po','f-tl','f-status'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});document.querySelectorAll('#rt-table table tbody tr').forEach(function(r){r.style.display='';});}
function resetFiltersQ(){['f-driverq','f-teamq','f-themeq','f-poq','f-tlq','f-statusq'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});document.querySelectorAll('#kanban-wrap .kancard').forEach(function(c){c.style.display='';});}
function switchTableQuarter(q){var label=q==='all'?'All Year':q,subset=q==='all'?initiatives:initiatives.filter(function(i){return i.quarter===q;});var rows=subset.map(function(i){var idx=initiatives.indexOf(i);return '<tr data-idx="'+idx+'"><td>'+i.quarter+'</td><td>'+titleCellHtml(idx)+'</td><td>'+driverBadge(i.driver)+'</td><td>'+i.productOwner+'</td><td>'+i.techLead+'</td><td>'+themeBadge(i.theme)+'</td><td>'+i.team+'</td><td>'+fmtDollar(i.addedValue)+'</td><td>'+roiHtml(i.roi)+'</td><td>'+dsHtml(idx)+'</td></tr>';}).join('');var tbody=document.querySelector('#rt-table table tbody');if(tbody)tbody.innerHTML=rows;refreshCards(subset,label);setQAct('tbl',q);}
function switchKanbanQuarter(q){var quarters=['Q1','Q2','Q3','Q4','Backlog'];document.querySelectorAll('#kanban-wrap .kancol').forEach(function(col,i){col.style.display=(q==='all'||quarters[i]===q)?'':'none';});setQAct('kan',q);}
function switchROIQuarter(q){document.getElementById('roi-content').innerHTML=buildScatterPlot(q)+roiRenderContent(q);setTimeout(function(){renderScatterChart(q);},50);setQAct('roi',q);}
function buildQuarterlyProgressBars(){var quarters=['Q1','Q2','Q3','Q4','Backlog'];return '<div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-bottom:16px">'+quarters.map(function(q){var items=initiatives.filter(function(i){return i.quarter===q;}),total=items.length||1;var ns=items.filter(function(i){return i.deliveryStatus==='not-started';}).length,on=items.filter(function(i){return i.deliveryStatus==='on-track';}).length,ar=items.filter(function(i){return i.deliveryStatus==='at-risk';}).length,dl=items.filter(function(i){return i.deliveryStatus==='delayed';}).length;var avSum=0;items.forEach(function(i){var n=parseFloat(String(i.addedValue||'').replace(/[^0-9.-]/g,''));if(!isNaN(n))avSum+=n;});var avLbl=avSum>=1000000?'$'+(avSum/1000000).toFixed(1)+'M':avSum>=1000?'$'+(avSum/1000).toFixed(0)+'K':avSum>0?'$'+avSum.toFixed(0):'\u2014';var nsW=Math.round(ns/total*100),onW=Math.round(on/total*100),arW=Math.round(ar/total*100),dlW=Math.round(dl/total*100);var meta=(ns>0?ns+' not started \u00b7 ':'')+(on>0?on+' on track \u00b7 ':'')+(ar>0?ar+' at risk \u00b7 ':'')+(dl>0?dl+' delayed':'');if(items.length===0)meta='No initiatives';var roiSum=0,roiCount=0;items.forEach(function(i){var r=parseFloat(String(i.roi||'').replace(/[^0-9.-]/g,''));if(!isNaN(r)){roiSum+=r;roiCount++;}});var roiPct=roiCount?Math.round(roiSum/roiCount*100)+'%':'\u2014';return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;overflow:hidden"><div style="padding:10px 14px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;font-weight:500">'+q+'</span><span style="font-size:11px;color:var(--faint);background:var(--bg);border-radius:20px;padding:1px 8px">'+items.length+'</span></div><div style="padding:10px 14px 4px"><div style="display:flex;height:6px;border-radius:4px;overflow:hidden;gap:1px">'+(nsW>0?'<div style="flex:'+nsW+';background:#6B6B65"></div>':'')+(onW>0?'<div style="flex:'+onW+';background:#3B6D11"></div>':'')+(arW>0?'<div style="flex:'+arW+';background:#CA8A04"></div>':'')+(dlW>0?'<div style="flex:'+dlW+';background:#A93226"></div>':'')+(items.length===0?'<div style="flex:1;background:var(--bg)"></div>':'')+'</div><div style="font-size:10px;color:var(--faint);margin-top:4px">'+meta+'</div></div><div style="padding:6px 14px 12px;border-top:1px solid var(--border);margin-top:8px"><div style="font-size:10px;color:var(--faint)">Avg ROI</div><div style="font-size:14px;font-weight:500;color:#66C220">'+roiPct+' <span style="font-size:11px;font-weight:400;color:var(--muted)">('+avLbl+')</span></div></div></div>';}).join('')+'</div>';}
function buildScatterPlot(q){var subset=q==='all'?initiatives.filter(function(i){return i.quarter!=='Backlog';}):q==='backlog'?initiatives.filter(function(i){return i.quarter==='Backlog';}):initiatives.filter(function(i){return i.quarter===q;});var drivers=[];subset.forEach(function(i){if(drivers.indexOf(i.driver)===-1)drivers.push(i.driver);});drivers.sort();return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;margin-bottom:16px"><div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:var(--faint);margin-bottom:12px">Added Value vs ROI \u2014 each point is an initiative</div><div style="position:relative;width:100%;height:240px"><canvas id="roiScatterCanvas"></canvas></div><div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:10px">'+drivers.map(function(d){var c=_driverColorMap[d]||'#888780';return '<span style="display:flex;align-items:center;gap:4px;font-size:11px;color:var(--muted)"><span style="width:8px;height:8px;border-radius:50%;background:'+c+';display:inline-block"></span>'+d+'</span>';}).join('')+'</div></div>';}
function renderScatterChart(q){var subset=q==='all'?initiatives.filter(function(i){return i.quarter!=='Backlog';}):q==='backlog'?initiatives.filter(function(i){return i.quarter==='Backlog';}):initiatives.filter(function(i){return i.quarter===q;});var drivers=[];subset.forEach(function(i){if(drivers.indexOf(i.driver)===-1)drivers.push(i.driver);});drivers.sort();var datasets=drivers.map(function(d){var color=_driverColorMap[d]||'#888780';var pts=subset.filter(function(i){return i.driver===d;}).map(function(i){var av=parseFloat(String(i.addedValue||'').replace(/[^0-9.-]/g,'')),roi=parseFloat(String(i.roi||'').replace(/[^0-9.-]/g,''));if(isNaN(av)||isNaN(roi))return null;return{x:Math.round(roi*100),y:av,label:i.title,techLead:i.techLead};}).filter(Boolean);return{label:d,data:pts,backgroundColor:color+'99',borderColor:color,pointRadius:7,pointHoverRadius:10};});var canvas=document.getElementById('roiScatterCanvas');if(!canvas||!window.Chart)return;if(window._roiChart)window._roiChart.destroy();window._roiChart=new Chart(canvas,{type:'scatter',data:{datasets:datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{title:function(items){return items[0].raw.label;},label:function(c){return 'ROI: '+c.raw.x+'%';},afterLabel:function(c){return 'Eng Lead: '+c.raw.techLead;}}}},scales:{x:{title:{display:true,text:'ROI %',font:{size:11}},ticks:{font:{size:11},callback:function(v){return v+'%';}}},y:{title:{display:true,text:'Added Value ($K)',font:{size:11}},ticks:{font:{size:11},callback:function(v){return '$'+v+'K';}}}},layout:{padding:10}}});}
function roiMakeOverallCard(subset,label){var s=roiCalcGroup(subset),p=isNaN(s.roiAvg)?0:Math.round(s.roiAvg*100),c=p<0?'#E24B4A':'#66C220';return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;display:flex;flex-direction:column;gap:14px"><div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:var(--faint)">Overall ROI &mdash; '+label+'</div><div><div style="font-size:24px;font-weight:500">'+s.count+'</div><div style="font-size:11px;color:var(--muted);margin-top:2px">initiatives</div></div><div style="height:1px;background:var(--border)"></div><div><div style="font-size:20px;font-weight:500">'+roiFmtAV(s.av)+'</div><div style="font-size:11px;color:var(--muted);margin-top:2px">added value</div></div><div style="height:1px;background:var(--border)"></div><div><div style="font-size:20px;font-weight:500;color:'+c+'">'+p+'%</div><div style="font-size:11px;color:var(--muted);margin-top:2px">avg ROI</div></div></div>';}
function roiMakeBarCard(subset,title,label,key){var keys=[];subset.forEach(function(i){if(keys.indexOf(i[key])===-1)keys.push(i[key]);});keys.sort();var colorMap=key==='driver'?_driverColorMap:key==='theme'?_themeColorMap:null;var rows=keys.map(function(k,ki){var s=roiCalcGroup(subset.filter(function(i){return i[key]===k;})),p=isNaN(s.roiAvg)?0:Math.round(s.roiAvg*100),tc=p<0?'#E24B4A':'#3B6D11',isLast=ki===keys.length-1;var kHtml=colorMap?badgeHtml(k,colorMap[k]||'#888780'):'<span style="font-size:12px;color:var(--text)">'+k+'</span>';return '<div style="display:grid;grid-template-columns:1fr auto auto;gap:8px;padding:10px 0;'+(isLast?'':' border-bottom:0.5px solid var(--border);')+'align-items:center"><div>'+kHtml+'</div><div style="font-size:12px;font-weight:500;text-align:right;min-width:80px">'+roiFmtEU(s.av)+'</div><div style="font-size:12px;font-weight:500;color:'+tc+';text-align:right;min-width:48px">'+p+'%</div></div>';}).join('');var hdr='<div style="display:grid;grid-template-columns:1fr auto auto;gap:8px;padding:8px 0;border-bottom:0.5px solid var(--border)"><div></div><div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.4px;color:var(--faint);text-align:right;min-width:80px">Added Value</div><div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.4px;color:var(--faint);text-align:right;min-width:48px">Avg ROI</div></div>';return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px"><div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:var(--faint);margin-bottom:14px">'+title+' &mdash; '+label+'</div>'+hdr+rows+'</div>';}
function roiMakeTable(subset){var rows=subset.map(function(i){return '<tr><td>'+i.quarter+'</td><td>'+i.title+'</td><td>'+driverBadge(i.driver)+'</td><td>'+i.team+'</td><td>'+themeBadge(i.theme)+'</td><td>'+fmtDollar(i.addedValue)+'</td><td>'+roiHtml(i.roi)+'</td></tr>';}).join('');return '<div class="twrap"><div class="thead-row">Initiatives</div><table><thead><tr><th>Quarter</th><th>Initiative</th><th>Driver</th><th>Team</th><th>Theme</th><th>Added Value</th><th>ROI</th></tr></thead><tbody>'+rows+'</tbody></table></div>';}
function roiRenderContent(q){var label=q==='all'?'All Year':q==='backlog'?'Backlog':q,subset=q==='all'?initiatives.filter(function(i){return i.quarter!=='Backlog';}):q==='backlog'?initiatives.filter(function(i){return i.quarter==='Backlog';}):initiatives.filter(function(i){return i.quarter===q;});return '<div style="display:grid;grid-template-columns:160px repeat(3,minmax(0,1fr));gap:16px;margin-bottom:16px">'+roiMakeOverallCard(subset,label)+roiMakeBarCard(subset,'ROI by Driver',label,'driver')+roiMakeBarCard(subset,'ROI by Theme',label,'theme')+roiMakeBarCard(subset,'ROI by Team',label,'team')+'</div>'+roiMakeTable(subset);}
function buildROISummaries(){var cq=currentQ();return buildQFilter('roi','switchROIQuarter')+'<div id="roi-content">'+buildScatterPlot(cq)+roiRenderContent(cq)+'</div>';}


var _ganttGroupBy = 'team';

function buildGantt() {
  var statusColors = {'on-track':'#3B6D11','at-risk':'#BA7517','delayed':'#A32D2D','not-started':'#888780'};
  var statusLabels = {'on-track':'On Track','at-risk':'At Risk','delayed':'Delayed','not-started':'Not Started'};
  var cq = currentQ();
  var groupKey = _ganttGroupBy;

  var groups = {};
  initiatives.forEach(function(i) {
    if (i.quarter === 'Backlog') return;
    var g = groupKey === 'team' ? i.team : groupKey === 'theme' ? i.theme : i.driver;
    if (!g) g = 'Other';
    if (!groups[g]) groups[g] = [];
    groups[g].push(i);
  });
  var groupNames = Object.keys(groups);
  groupNames.sort();

  var subLabels = {team: ['Driver','Theme'], theme: ['Driver','Team'], driver: ['Theme','Team']};
  var subKeys = {team: ['driver','theme'], theme: ['driver','team'], driver: ['theme','team']};
  var sl = subLabels[groupKey], sk = subKeys[groupKey];

  var toggle = '<div style="display:flex;align-items:center;gap:6px;margin-bottom:14px">'
    + '<span style="font-size:11px;color:var(--faint)">Group by</span>'
    + ['team','theme','driver'].map(function(v) {
      var lbl = v === 'team' ? 'Team' : v === 'theme' ? 'Theme' : 'Driver';
      var act = v === groupKey;
      return '<button data-ganttgroup="' + v + '" style="font-size:11px;padding:3px 10px;border-radius:20px;border:1px solid ' + (act ? 'var(--accent)' : 'var(--border)') + ';background:' + (act ? 'var(--accent)' : 'transparent') + ';color:' + (act ? '#fff' : 'var(--muted)') + ';cursor:pointer;font-weight:500">' + lbl + '</button>';
    }).join('')
    + '</div>';

  var legend = '<div style="display:flex;gap:14px;margin-bottom:14px;font-size:11px;color:var(--muted)">'
    + '<span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:7px;border-radius:2px;background:#3B6D11;display:inline-block"></span>On Track</span>'
    + '<span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:7px;border-radius:2px;background:#BA7517;display:inline-block"></span>At Risk</span>'
    + '<span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:7px;border-radius:2px;background:#888780;display:inline-block"></span>Not Started</span>'
    + '<span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:7px;border-radius:2px;background:#A32D2D;display:inline-block"></span>Delayed</span>'
    + '</div>';

  var qHeaders = ['Q1','Q2','Q3','Q4'];
  var thead = '<thead><tr>'
    + '<th style="width:260px;min-width:260px;padding:8px 8px 8px 0;text-align:left;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.4px;color:var(--faint);border-bottom:1px solid var(--border)"></th>'
    + qHeaders.map(function(q) {
      var isCurrent = q === cq;
      return '<th style="width:18.75%;padding:8px;text-align:center;font-size:12px;font-weight:500;color:var(--text);border-bottom:1px solid var(--border);border-left:0.5px solid var(--border)'
        + (isCurrent ? ';background:rgba(102,194,32,0.04)' : '') + '">' + q + '</th>';
    }).join('')
    + '</tr></thead>';

  var barIdx = 0;
  var rows = '';
  groupNames.forEach(function(gName) {
    rows += '<tr><td colspan="5" style="padding:10px 8px 6px 0;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:var(--faint);border-bottom:0.5px solid var(--border);background:var(--bg)">' + gName + '</td></tr>';
    groups[gName].forEach(function(i) {
      var c = statusColors[i.deliveryStatus] || '#888780';
      var sLabel = statusLabels[i.deliveryStatus] || 'Not Started';
      var qs = [i.quarter];
      var v1 = sk[0] === 'driver' ? i.driver : sk[0] === 'theme' ? i.theme : i.team;
      var v2 = sk[1] === 'driver' ? i.driver : sk[1] === 'theme' ? i.theme : i.team;
      var nameCell = '<td style="padding:8px 8px 8px 0;vertical-align:middle;border-bottom:0.5px solid var(--border)">'
        + '<div style="font-size:12px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:250px" title="' + i.title.replace(/"/g,'&quot;') + '">' + i.title + '</div>'
        + '<div style="font-size:10px;color:var(--faint);margin-top:2px">'
        + sl[0] + ': <span style="color:var(--muted)">' + v1 + '</span>'
        + ' \u00b7 ' + sl[1] + ': <span style="color:var(--muted)">' + v2 + '</span>'
        + '</div></td>';

      var qCells = qHeaders.map(function(q) {
        var isCurrent = q === cq;
        var bgStyle = 'border-left:0.5px solid var(--border);' + (isCurrent ? 'background:rgba(102,194,32,0.04);' : '');
        var active = qs.indexOf(q) > -1;
        if (!active) return '<td style="' + bgStyle + 'padding:4px;vertical-align:middle;border-bottom:0.5px solid var(--border)"></td>';
        var bid = 'gbar-' + barIdx++;
        return '<td style="' + bgStyle + 'padding:4px;vertical-align:middle;border-bottom:0.5px solid var(--border)">'
          + '<div class="gantt-bar" id="' + bid + '" style="height:24px;background:' + c + ';border-radius:4px;margin:0 2px;cursor:default;position:relative"'
          + ' data-gtt="' + i.title.replace(/"/g,'&quot;') + '|' + i.techLead + '|' + i.productOwner + '|' + sLabel + '"></div></td>';
      }).join('');

      rows += '<tr>' + nameCell + qCells + '</tr>';
    });
  });

  return toggle + legend
    + '<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px 20px;overflow-x:auto;position:relative">'
    + '<table style="width:100%;min-width:780px;border-collapse:collapse">'
    + thead + '<tbody>' + rows + '</tbody></table>'
    + '<div id="gantt-tooltip" style="display:none;position:absolute;z-index:50;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:10px 14px;pointer-events:none;box-shadow:0 4px 16px rgba(0,0,0,.1);max-width:240px"></div>'
    + '</div>';
}

function switchGanttGroup(g) {
  _ganttGroupBy = g;
  var panel = document.getElementById('rt-gantt');
  if (panel) {
    panel.innerHTML = buildGantt();
    ganttTooltipInit();
  }
}

function ganttTooltipInit() {
  var wrap = document.querySelector('#rt-gantt .gantt-bar');
  if (!wrap) return;
  var tooltip = document.getElementById('gantt-tooltip');
  if (!tooltip) return;
  document.querySelectorAll('.gantt-bar').forEach(function(bar) {
    bar.addEventListener('mouseenter', function(e) {
      var d = bar.dataset.gtt;
      if (!d) return;
      var parts = d.split('|');
      tooltip.innerHTML = '<div style="font-size:12px;font-weight:500;color:var(--text);margin-bottom:6px">' + parts[0] + '</div>'
        + '<div style="font-size:11px;color:var(--muted);display:flex;flex-direction:column;gap:3px">'
        + '<div><span style="color:var(--faint)">Eng Lead:</span> ' + (parts[1] || '\u2014') + '</div>'
        + '<div><span style="color:var(--faint)">Prod Lead:</span> ' + (parts[2] || '\u2014') + '</div>'
        + '<div><span style="color:var(--faint)">Status:</span> ' + (parts[3] || '\u2014') + '</div>'
        + '</div>';
      tooltip.style.display = 'block';
      var rect = bar.getBoundingClientRect();
      var wrapRect = bar.closest('div[style*="overflow-x"]').getBoundingClientRect();
      tooltip.style.left = (rect.left - wrapRect.left + rect.width / 2 - 120) + 'px';
      tooltip.style.top = (rect.top - wrapRect.top - tooltip.offsetHeight - 8) + 'px';
    });
    bar.addEventListener('mouseleave', function() {
      tooltip.style.display = 'none';
    });
  });
}

function renderRoadmap() {
  var quarters=['Q1','Q2','Q3','Q4','Backlog'];
  var cq=currentQ();
  var initSubset=initiatives.filter(function(i){return i.quarter===cq;});
  var tableRows=initSubset.map(function(i){var idx=initiatives.indexOf(i);return '<tr data-idx="'+idx+'"><td>'+i.quarter+'</td><td>'+titleCellHtml(idx)+'</td><td>'+driverBadge(i.driver)+'</td><td>'+i.productOwner+'</td><td>'+i.techLead+'</td><td>'+themeBadge(i.theme)+'</td><td>'+i.team+'</td><td>'+fmtDollar(i.addedValue)+'</td><td>'+roiHtml(i.roi)+'</td><td>'+dsHtml(idx)+'</td></tr>';}).join('');
  var kanban=quarters.map(function(q){var items=initiatives.filter(function(i){return i.quarter===q;});var cards=items.map(function(i){var idx=initiatives.indexOf(i),opt=deliveryOpts.filter(function(o){return o.val===i.deliveryStatus;})[0]||deliveryOpts[0],opts=deliveryOpts.map(function(o){return '<option value="'+o.val+'"'+(o.val===i.deliveryStatus?' selected':'')+'>'+o.label+'</option>';}).join('');return '<div class="kancard"><div><span class="kancard-title">'+i.title+'</span><div class="kancard-tags">'+i.theme+' \u00b7 '+i.team+'</div></div><div class="kancard-leads"><span class="kancard-lead-item"><span class="kancard-lead-label">PO</span> '+i.productOwner+'</span><span class="kancard-lead-item"><span class="kancard-lead-label">TL</span> '+i.techLead+'</span></div><div class="kancard-driver"><span class="kancard-lead-label">Driver</span> '+i.driver+'</div><div class="kancard-footer"><div class="ds-wrap" data-idx="'+idx+'"><span class="pill ds-pill '+opt.cls+'">'+opt.label+'</span><select class="ds-select" data-status-idx="'+idx+'">'+opts+'</select></div><span style="font-size:11px;font-weight:500">'+roiHtml(i.roi)+'</span></div></div>';}).join('');return '<div class="kancol"><div class="kancol-head"><span>'+q+'</span><span class="kancol-count">'+items.length+'</span></div><div class="kancol-body">'+(cards||'<div style="padding:8px;font-size:12px;color:var(--faint)">No initiatives</div>')+'</div></div>';}).join('');
  return '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px">'
    +'<div><div class="ptitle">Product Roadmap</div><div class="psub" style="margin-bottom:0">Quarterly initiatives and progress status</div></div>'
    +'<a id="ob-datasource" href="https://docs.google.com/spreadsheets/d/1g7c51-WX8UqFKJzKrnPzJ_fZSKsagnNj57Jir2v9quc/edit?usp=sharing" target="_blank" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;color:var(--muted);text-decoration:none;font-weight:500;white-space:nowrap;transition:border-color .15s,color .15s;flex-shrink:0;margin-top:4px" onmouseover="this.style.borderColor=\'var(--accent)\';this.style.color=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\';this.style.color=\'var(--muted)\'"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Data source \u2192</a>'
    +'</div>'
    +'<div class="tabnav"><button class="tabitem act" data-tab="gantt">Gantt</button><button class="tabitem" data-tab="table">Table View</button><button class="tabitem" data-tab="quarterly">Quarterly</button><button class="tabitem" data-tab="roi">By ROI</button></div>'
    +'<div id="rt-gantt" class="tabpanel act">'+buildGantt()+'</div>'
    +'<div id="rt-table" class="tabpanel">'+buildQFilter('tbl','switchTableQuarter')
    +'<div class="cards">'+scInitiatives()+scGrouped('sc-driver','By Driver','driver')+scGrouped('sc-theme','By Theme','theme')+scGrouped('sc-team','By Team','team')+'</div>'
    +'<div class="twrap"><div class="thead-row">Initiatives</div><div style="padding:12px 18px 4px">'+buildFilterBar()+'</div>'
    +'<table><thead><tr><th>Quarter</th><th>Initiative</th><th>Driver</th><th>Product Owner</th><th>Tech Lead</th><th>Theme</th><th>Team</th><th>Added Value</th><th>ROI</th><th>Status</th></tr></thead><tbody>'+tableRows+'</tbody></table></div></div>'
    +'<div id="rt-quarterly" class="tabpanel">'+buildQuarterlyProgressBars()+'<div style="margin-bottom:16px">'+buildFilterBar('q')+'</div><div class="kanban" id="kanban-wrap">'+kanban+'</div></div>'
    +'<div id="rt-roi" class="tabpanel">'+buildROISummaries()+'</div>';
}
