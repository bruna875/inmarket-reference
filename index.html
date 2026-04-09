<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>InMarket</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden}
body{font-family:'DM Sans',system-ui,sans-serif;background:#F5F4F0;font-size:13px;-webkit-font-smoothing:antialiased;color:#0D1E36}
:root{
  --surface:#fff;--bg:#F5F4F0;--border:rgba(0,0,0,0.08);--border-md:rgba(0,0,0,0.12);
  --text:#0D1E36;--muted:#6B6B65;--faint:#A8A8A0;--subtle:#F4FCF0;
  --accent:#66C220;--sw:220px;--sc:52px;--tr:.22s cubic-bezier(.4,0,.2,1)
}
#auth{position:fixed;inset:0;background:var(--bg);display:flex;align-items:center;justify-content:center;z-index:99;transition:opacity .3s}
#auth.gone{opacity:0;pointer-events:none}
.acard{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:2.25rem 2.5rem 2rem;width:350px;box-shadow:0 4px 28px rgba(0,0,0,0.07)}
.alogo{display:flex;align-items:center;gap:10px;margin-bottom:2rem}
.amark{width:34px;height:34px;background:var(--accent);border-radius:8px;display:flex;align-items:center;justify-content:center}
.atitle{font-size:21px;font-weight:500;letter-spacing:-.5px;margin-bottom:5px}
.asub{font-size:12px;color:var(--muted);margin-bottom:1.75rem}
.flabel{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:5px}
.fwrap{margin-bottom:13px}
.finput{width:100%;height:40px;border:1px solid var(--border-md);border-radius:8px;padding:0 12px;font-size:13px;font-family:inherit;color:var(--text);background:var(--surface);outline:none;transition:border .15s,box-shadow .15s}
.finput:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(102,194,32,.1)}
.finput::placeholder{color:var(--faint)}
.abtn{width:100%;height:40px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;margin-top:4px;transition:opacity .15s}
.abtn:hover{opacity:.88}
.aerr{font-size:11px;color:#C0392B;min-height:16px;margin-top:7px}
.ahint{font-size:11px;color:var(--faint);margin-top:11px;text-align:center}
#app{display:none;height:100vh}
#app.show{display:flex}
.sbwrap{position:relative;flex-shrink:0}
.sb{width:var(--sw);background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;height:100vh;transition:width var(--tr);overflow:hidden}
.sb.col{width:var(--sc)}
.sbhead{height:52px;display:flex;align-items:center;padding:0 13px;gap:10px;border-bottom:1px solid var(--border);flex-shrink:0}
.lmark{width:26px;height:26px;background:var(--accent);border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.lname{font-size:15px;font-weight:500;letter-spacing:-.3px;white-space:nowrap;transition:opacity var(--tr)}
.sb.col .lname{opacity:0}
.sbnav{flex:1;padding:10px 0;overflow-y:auto;overflow-x:hidden}
.sbnav::-webkit-scrollbar{width:3px}
.sbnav::-webkit-scrollbar-thumb{background:var(--border-md);border-radius:4px}
.seclabel{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.6px;color:var(--faint);padding:8px 14px 4px;white-space:nowrap;transition:opacity var(--tr)}
.sb.col .seclabel{opacity:0}
.nitem{display:flex;align-items:center;gap:9px;padding:8px 13px;cursor:pointer;position:relative;white-space:nowrap;transition:background .1s}
.nitem:hover{background:#F4FCF0}
.nitem.act{background:#F4FCF0}
.nitem.act .nlabel{color:var(--accent);font-weight:500}
.nitem.act .nico{color:var(--accent)}
.nbar{position:absolute;left:0;top:5px;bottom:5px;width:2.5px;background:var(--accent);border-radius:0 2px 2px 0}
.nico{width:18px;height:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--muted)}
.nlabel{font-size:13px;color:var(--muted);transition:opacity var(--tr)}
.sb.col .nlabel{opacity:0}
.sbfoot{padding:10px 12px;border-top:1px solid var(--border);display:flex;align-items:center;gap:9px;flex-shrink:0}
.avatar{width:28px;height:28px;border-radius:50%;background:#F4FCF0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#66C220;flex-shrink:0}
.uinfo{overflow:hidden;transition:opacity var(--tr)}
.sb.col .uinfo{opacity:0}
.uname{font-size:12px;font-weight:500;white-space:nowrap}
.urole{font-size:11px;color:var(--faint);white-space:nowrap}
.logoutbtn{margin-left:auto;cursor:pointer;color:var(--faint);transition:color .15s;flex-shrink:0}
.logoutbtn:hover{color:var(--accent)}
.togbtn{position:absolute;right:-11px;top:50%;transform:translateY(-50%);width:22px;height:22px;background:var(--surface);border:1px solid var(--border);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;box-shadow:0 1px 6px rgba(0,0,0,.07)}
.main{flex:1;display:flex;flex-direction:column;min-width:0}
.topbar{height:52px;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;background:var(--surface);flex-shrink:0;gap:10px}
.breadcrumb{font-size:12px;color:var(--muted)}
.breadcrumb b{color:var(--text);font-weight:500}
.tbadge{font-size:11px;padding:3px 10px;border-radius:20px;background:#F4FCF0;color:var(--accent);margin-left:auto;font-weight:500}
.content{flex:1;padding:28px 32px;overflow-y:auto}
.ptitle{font-size:22px;font-weight:500;letter-spacing:-.5px;margin-bottom:5px}
.psub{font-size:13px;color:var(--muted);margin-bottom:20px}
.tabnav{display:flex;gap:2px;margin-bottom:20px;background:var(--surface);border:1px solid var(--border);border-radius:9px;padding:3px;width:fit-content}
.tabitem{height:30px;padding:0 16px;border:none;border-radius:7px;font-size:12px;font-weight:500;font-family:inherit;cursor:pointer;background:transparent;color:var(--muted);transition:background .15s,color .15s}
.tabitem:hover{color:var(--text)}
.tabitem.act{background:var(--bg);color:var(--text);box-shadow:0 1px 4px rgba(0,0,0,.07)}
.tabpanel{display:none}
.tabpanel.act{display:block}
.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:24px}
.mcard{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px}
.mlabel{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:var(--faint);margin-bottom:8px}
.mval{font-size:26px;font-weight:500;letter-spacing:-.5px}
.sc-badges{display:flex;gap:5px;margin-top:10px;flex-wrap:wrap}
.sc-badge{font-size:11px;font-weight:500;padding:2px 8px;border-radius:20px}
.twrap{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.thead-row{padding:13px 18px;border-bottom:1px solid var(--border);font-size:13px;font-weight:500}
table{width:100%;border-collapse:collapse}
th{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:var(--faint);padding:10px 18px;text-align:left;border-bottom:1px solid var(--border)}
td{padding:12px 18px;border-bottom:1px solid var(--border);color:var(--text)}
tr:last-child td{border-bottom:none}
tr:hover td{background:#FAFAF8}
.pill{display:inline-flex;align-items:center;font-size:11px;font-weight:500;padding:3px 10px;border-radius:20px}
.p-done{background:#EAF3DE;color:#3B6D11}
.p-prog{background:#E6F1FB;color:#185FA5}
.p-plan{background:#F1EFE8;color:#6B6B65}
.p-warn{background:#FAEEDA;color:#854F0B}
.ds-wrap{position:relative;display:inline-flex;align-items:center;cursor:pointer}
.ds-wrap:hover .ds-pill{opacity:.85}
.ds-pill{pointer-events:none}
.ds-select{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%}
.ds-gray{background:#F1EFE8;color:#6B6B65}
.ds-green{background:#EAF3DE;color:#3B6D11}
.ds-yellow{background:#FEF3C7;color:#92700A}
.ds-red{background:#FDECEA;color:#A93226}
.kanban{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.kancol{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.kancol-head{padding:12px 14px;border-bottom:1px solid var(--border);font-size:12px;font-weight:500;display:flex;align-items:center;justify-content:space-between}
.kancol-count{font-size:11px;color:var(--faint);background:var(--bg);border-radius:20px;padding:1px 8px}
.kancol-body{padding:10px;display:flex;flex-direction:column;gap:8px}
.kancard{background:#fff;border:1px solid var(--border);border-radius:8px;padding:11px 12px;display:flex;flex-direction:column;gap:8px}
.kancard-header{display:flex;flex-direction:column;gap:2px}
.kancard-title{font-size:12px;font-weight:500;line-height:1.4;color:var(--text)}
.kancard-tags{font-size:10px;color:var(--faint)}
.kancard-leads{display:flex;gap:10px}
.kancard-lead-item{font-size:11px;color:var(--muted)}
.kancard-lead-label{font-size:10px;font-weight:600;color:var(--faint);text-transform:uppercase;letter-spacing:.3px}
.kancard-driver{font-size:11px;color:var(--muted)}
.kancard-footer{display:flex;align-items:center;justify-content:space-between}
.init-cell{display:flex;align-items:center;gap:5px}
.init-title{color:inherit;text-decoration:none}
a.init-title:hover{text-decoration:underline;color:var(--accent)}
.link-btn{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:4px;cursor:pointer;color:var(--faint);opacity:0;transition:opacity .15s,color .15s,background .15s;flex-shrink:0;border:none;background:none;padding:0}
tr:hover .link-btn,.link-btn.has-link{opacity:1;color:var(--accent)}
.link-btn:hover{background:var(--subtle)}
.link-popup{position:fixed;background:var(--surface);border:1px solid var(--border-md);border-radius:10px;padding:14px;box-shadow:0 4px 24px rgba(0,0,0,0.12);z-index:999;width:300px;display:none}
.link-popup.show{display:block}
.link-popup-title{font-size:12px;font-weight:500;margin-bottom:10px}
.link-popup-row{display:flex;gap:6px}
.link-popup-row input{flex:1;height:34px;border:1px solid var(--border-md);border-radius:7px;padding:0 10px;font-size:12px;font-family:inherit;outline:none;color:var(--text);min-width:0}
.link-popup-row input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(102,194,32,.1)}
.link-popup-open{height:34px;width:34px;display:inline-flex;align-items:center;justify-content:center;background:none;border:1px solid var(--border-md);border-radius:7px;cursor:pointer;color:var(--muted);flex-shrink:0;transition:border-color .15s,color .15s}
.link-popup-open:hover{border-color:var(--accent);color:var(--accent)}
.link-popup-open:disabled{opacity:.3;cursor:default;pointer-events:none}
.link-popup-save{height:34px;padding:0 12px;background:var(--accent);color:#fff;border:none;border-radius:7px;font-size:12px;font-weight:500;font-family:inherit;cursor:pointer;white-space:nowrap;flex-shrink:0}
.link-popup-save:hover{opacity:.88}
.link-popup-clear{height:34px;padding:0 10px;background:none;border:1px solid var(--border-md);border-radius:7px;font-size:12px;font-family:inherit;cursor:pointer;color:var(--muted);flex-shrink:0}
.link-popup-clear:hover{border-color:var(--accent);color:var(--accent)}
.filterbar{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.filterbar select{height:30px;border:1px solid var(--border-md);border-radius:7px;padding:0 28px 0 10px;font-size:12px;font-family:inherit;color:var(--muted);background:var(--surface);outline:none;cursor:pointer;transition:border .15s;appearance:none;background-image:url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23A8A8A0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center}
.filterbar select.active{border-color:var(--accent);color:var(--text)}
.filter-reset{height:30px;padding:0 12px;border:1px solid var(--border-md);border-radius:7px;font-size:12px;font-family:inherit;color:var(--muted);background:none;cursor:pointer;transition:color .15s,border-color .15s}
.filter-reset:hover{color:var(--accent);border-color:var(--accent)}
.qfilter{display:flex;gap:4px;margin-bottom:20px}
.qfilter-btn{height:30px;padding:0 14px;border:1px solid var(--border-md);border-radius:7px;font-size:12px;font-weight:500;font-family:inherit;cursor:pointer;background:var(--surface);color:var(--muted);transition:all .15s}
.qfilter-btn.act{border-color:var(--accent);background:#F4FCF0;color:var(--accent)}

/* ── Reference page ── */
.ref-layout{display:grid;grid-template-columns:160px 1fr;gap:32px;max-width:860px}
.ref-photo-col{display:flex;flex-direction:column;align-items:center;gap:10px}
.ref-avatar{width:120px;height:120px;border-radius:50%;overflow:hidden;border:2px solid var(--border);background:var(--bg);flex-shrink:0;position:relative;cursor:pointer}
.ref-avatar:hover .ref-avatar-overlay{opacity:1}
.ref-avatar img{width:100%;height:100%;object-fit:cover;display:block}
.ref-avatar-initials{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:600;color:var(--accent);opacity:.45}
.ref-avatar-overlay{position:absolute;inset:0;background:rgba(13,30,54,.45);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;border-radius:50%}
.ref-avatar-overlay svg{color:#fff}
.ref-upload-hint{font-size:10px;color:var(--faint);text-align:center;margin-top:2px}
.ref-name{font-size:14px;font-weight:500;color:var(--text);text-align:center;line-height:1.3}
.ref-title{font-size:11px;color:var(--faint);text-align:center}
.ref-right{display:flex;flex-direction:column;gap:16px}
.ref-quote-box{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:22px 24px;position:relative}
.ref-quote-mark{font-size:52px;line-height:1;color:var(--accent);opacity:.25;position:absolute;top:8px;left:14px;font-family:Georgia,serif;pointer-events:none;user-select:none}
.ref-quote-text{font-size:13.5px;line-height:1.75;color:var(--text);padding-top:20px;font-style:italic}
.ref-attribution{margin-top:14px;font-size:12px;font-weight:500;color:var(--muted)}
.ref-attribution span{display:block;font-size:11px;color:var(--faint);font-weight:400}
.ref-empty{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:32px 24px;color:var(--faint);font-size:13px;font-style:italic}
/* hidden file input */
#photoFileInput{display:none}
</style>
</head>
<body>

<div id="auth">
  <div class="acard">
    <div class="alogo">
      <div class="amark">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 9L7 4.5L8.5 6L5.5 9L8.5 12L7 13.5L3 9Z" fill="white"/>
          <path d="M9 9L13 4.5L14.5 6L11.5 9L14.5 12L13 13.5L9 9Z" fill="white" opacity=".45"/>
        </svg>
      </div>
      <span style="font-size:18px;font-weight:500;letter-spacing:-.3px">InMarket</span>
    </div>
    <div class="atitle">Sign in</div>
    <div class="asub">Enter your credentials to continue</div>
    <div class="fwrap">
      <div class="flabel">Email</div>
      <input class="finput" id="em" type="text" value="poorhumans@inmarket.com" placeholder="you@company.com"/>
    </div>
    <div class="fwrap">
      <div class="flabel">Password</div>
      <input class="finput" id="pw" type="password" placeholder="••••••••"/>
    </div>
    <div class="aerr" id="err"></div>
    <button class="abtn" onclick="login()">Sign in</button>
    <div class="ahint">Demo: poorhumans@inmarket.com / babbazzi2026</div>
  </div>
</div>

<div id="app">
  <div class="sbwrap">
    <div class="sb" id="sb">
      <div class="sbhead">
        <div class="lmark">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7L5.5 3.5L6.8 4.8L4 7L6.8 9.2L5.5 10.5L2 7Z" fill="white"/>
            <path d="M7.2 7L10.7 3.5L12 4.8L9.2 7L12 9.2L10.7 10.5L7.2 7Z" fill="white" opacity=".45"/>
          </svg>
        </div>
        <span class="lname">InMarket</span>
      </div>
      <nav class="sbnav" id="nav"></nav>
      <div class="sbfoot">
        <div class="avatar" id="av">AD</div>
        <div class="uinfo">
          <div class="uname" id="un">Admin</div>
          <div class="urole">Product Manager</div>
        </div>
        <div class="logoutbtn" onclick="logout()" title="Sign out">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M6 3H3v10h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 5l3 3-3 3M13 8H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="togbtn" id="tog" onclick="toggleSb()">
      <svg id="togico" width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M6 2L3 5l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <div class="main">
    <div class="topbar">
      <span class="breadcrumb">Product &nbsp;/&nbsp; <b id="pgname">Product Roadmap</b></span>
      <span class="tbadge" id="qbadge"></span>
    </div>
    <div class="content" id="content"></div>
  </div>
</div>

<input type="file" id="photoFileInput" accept="image/*"/>

<div class="link-popup" id="linkPopup">
  <div class="link-popup-title">Initiative link</div>
  <div class="link-popup-row">
    <input type="url" id="linkInput" placeholder="https://..."/>
    <button class="link-popup-open" id="linkOpenBtn" onclick="openCurrentLink()" title="Open link">
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 2h5v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2L8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
    <button class="link-popup-save" onclick="saveLink()">Save</button>
    <button class="link-popup-clear" onclick="clearLink()">X</button>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<script>
// ── References data ──────────────────────────────────────────────────────────
var REFERENCES = [
  {id:"deniece_kennedy", name:"Deniece Kennedy", title:"Chief Corporate Officer", photo:"",
   quote:"While many leaders claim to have a 10,000-foot view of the Company, Bruna operates at a 20,000-foot level. Her ability to visualize, shape, and act upon complex systems is something I have never seen before. She seamlessly bridges the gap between deep product knowledge, corporate finance fundamentals, strategy and technology. Beyond her competence, her integrity is beyond reproach. I recommend her to any company looking to scale; she is far too senior for small startups, and deserves a platform that matches her experience."},
  {id:"arthur_haedike",          name:"Arthur Haedike",          title:"Reference", photo:"", quote:""},
  {id:"teresa_thomas",           name:"Teresa Thomas",           title:"Reference", photo:"", quote:""},
  {id:"michael_della_penna",     name:"Michael Della Penna",     title:"Reference", photo:"", quote:""},
  {id:"stanley_turek",           name:"Stanley Turek",           title:"Reference", photo:"", quote:""},
  {id:"tonya_may",               name:"Tonya May",               title:"Reference", photo:"", quote:""},
  {id:"trina_rizzo",             name:"Trina Rizzo",             title:"Reference", photo:"", quote:""},
  {id:"jason_knapp",             name:"Jason Knapp",             title:"Reference", photo:"", quote:""},
  {id:"todd_morris",             name:"Todd Morris",             title:"Reference", photo:"", quote:""},
  {id:"michelle_millstone_shroff",name:"Michelle Millstone-Shroff",title:"Reference",photo:"",quote:""},
  {id:"dave_zinman",             name:"Dave Zinman",             title:"Reference", photo:"", quote:""}
];

// ── Nav icons ─────────────────────────────────────────────────────────────────
var roadmapIcon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="2" rx="1" fill="currentColor" opacity=".7"/><rect x="1" y="7" width="10" height="2" rx="1" fill="currentColor" opacity=".5"/><rect x="1" y="11" width="6" height="2" rx="1" fill="currentColor" opacity=".3"/><circle cx="13" cy="8" r="2.5" fill="currentColor"/></svg>';
var personIcon  = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" fill="currentColor" opacity=".6"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".5"/></svg>';

var NAV_CONFIG = [
  {section:"Product", items:[
    {id:"roadmap", label:"Product Roadmap", icon:roadmapIcon}
  ]},
  {section:"Very Good Peeps", items: REFERENCES.map(function(r){
    return {id:"ref_"+r.id, label:r.name, icon:personIcon};
  })}
];

// ── Roadmap state ─────────────────────────────────────────────────────────────
var initiatives = [];
var deliveryOpts = [
  {val:"not-started",label:"Not Started",cls:"ds-gray"},
  {val:"on-track",   label:"On Track",   cls:"ds-green"},
  {val:"at-risk",    label:"At Risk",    cls:"ds-yellow"},
  {val:"delayed",    label:"Delayed",    cls:"ds-red"}
];
var activeId="roadmap", collapsed=false, _linkIdx=null;

// ── Helpers ───────────────────────────────────────────────────────────────────
function currentQ(){var m=new Date().getMonth();return "Q"+(m<3?1:m<6?2:m<9?3:4);}
function currentQLabel(){var m=new Date().getMonth(),y=new Date().getFullYear();return "Q"+(m<3?1:m<6?2:m<9?3:4)+" "+y;}
function fmtDollar(v){if(!v||v==="—")return "—";var n=parseFloat(String(v).replace(/[^0-9.-]/g,""));if(isNaN(n))return String(v);return "$"+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,",");}
function roiHtml(v){if(!v||v==="—")return "—";var n=parseFloat(String(v).replace(/[^0-9.-]/g,""));if(isNaN(n))return String(v);var p=Math.round(n*100);return '<span style="color:'+(p<0?"#E24B4A":"#3B6D11")+';font-weight:500">'+p+"%</span>";}
function pill(l,c){return '<span class="pill '+c+'">'+l+"</span>";}

function dsHtml(idx){
  var cur=initiatives[idx].deliveryStatus;
  var opt=deliveryOpts.filter(function(o){return o.val===cur;})[0]||deliveryOpts[0];
  return '<div class="ds-wrap" onclick="openStatusMenu(event,'+idx+')" style="cursor:pointer"><span class="pill ds-pill '+opt.cls+'" id="ds-pill-'+idx+'">'+opt.label+'</span></div>';
}
function openStatusMenu(e,idx){
  e.stopPropagation();
  document.querySelectorAll(".status-menu").forEach(function(m){m.remove();});
  var menu=document.createElement("div");
  menu.className="status-menu";
  menu.style.cssText="position:fixed;z-index:999;background:var(--surface);border:1px solid var(--border-md);border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.12);padding:4px;min-width:130px;";
  deliveryOpts.forEach(function(o){
    var item=document.createElement("div");
    item.style.cssText="padding:7px 10px;border-radius:6px;cursor:pointer;font-size:12px;";
    item.innerHTML='<span class="pill '+o.cls+'" style="pointer-events:none">'+o.label+"</span>";
    item.onmouseenter=function(){item.style.background="var(--bg)";};
    item.onmouseleave=function(){item.style.background="";};
    item.onclick=function(ev){ev.stopPropagation();updateStatus(idx,o.val);menu.remove();};
    menu.appendChild(item);
  });
  var r=e.currentTarget.getBoundingClientRect();
  menu.style.top=(r.bottom+4)+"px"; menu.style.left=r.left+"px";
  document.body.appendChild(menu);
  setTimeout(function(){document.addEventListener("click",function h(){menu.remove();document.removeEventListener("click",h);});},0);
}
function linkIcon(idx){var i=initiatives[idx],cls="link-btn"+(i.link?" has-link":"");return '<button class="'+cls+'" onclick="openLinkPopup(event,'+idx+')" title="'+(i.link?"Edit link":"Add link")+'"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6.5 9.5a4 4 0 005.66 0l2-2a4 4 0 00-5.66-5.66L7.44 2.94" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9.5 6.5a4 4 0 00-5.66 0l-2 2a4 4 0 005.66 5.66l1.06-1.06" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>';}
function titleCellHtml(idx){var i=initiatives[idx],t=i.link?'<a href="'+i.link+'" target="_blank" class="init-title">'+i.title+"</a>":'<span class="init-title">'+i.title+"</span>";return '<div class="init-cell">'+t+linkIcon(idx)+"</div>";}

function saveLocalState(){var s={};initiatives.forEach(function(i,idx){s[idx]={deliveryStatus:i.deliveryStatus,link:i.link};});try{localStorage.setItem("inmarket_state",JSON.stringify(s));}catch(e){}}
function loadLocalState(cb){try{var r=localStorage.getItem("inmarket_state");if(r){var ls=JSON.parse(r);Object.keys(ls).forEach(function(idx){var i=initiatives[parseInt(idx)];if(!i)return;i.deliveryStatus=ls[idx].deliveryStatus||i.deliveryStatus;i.link=ls[idx].link||i.link;});}}catch(e){}if(cb)cb();}

function roiCalcGroup(items){var a=0,rs=0,rc=0;items.forEach(function(i){var av=parseFloat(String(i.addedValue||"").replace(/[^0-9.-]/g,""));if(!isNaN(av))a+=av;var r=parseFloat(String(i.roi||"").replace(/[^0-9.-]/g,""));if(!isNaN(r)){rs+=r;rc++;}});return{count:items.length,av:a,roiAvg:rc?rs/rc:NaN};}
function roiFmtAV(n){if(!n&&n!==0)return "—";if(n>=1000000)return "$"+(n/1000000).toFixed(2)+"M";if(n>=1000)return "$"+(n/1000).toFixed(2)+"K";return "$"+n.toFixed(2);}
function roiFmtEU(n){if(!n&&n!==0)return "—";return "$"+n.toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".");}

function buildQFilter(prefix,fn){var cq=currentQ();return '<div class="qfilter">'+["Q1","Q2","Q3","Q4","all"].map(function(q){var lbl=q==="all"?"All Year":q,act=q===cq;return '<button id="'+prefix+'-btn-'+q+'" class="qfilter-btn'+(act?" act":"")+'" onclick="'+fn+"('"+q+"')\">"+lbl+"</button>";}).join("")+"</div>";}
function setQAct(prefix,q){["Q1","Q2","Q3","Q4","all"].forEach(function(b){var el=document.getElementById(prefix+"-btn-"+b);if(el){if(b===q)el.classList.add("act");else el.classList.remove("act");}});}

function scInitiativesFor(subset,label){var ns=subset.filter(function(i){return i.deliveryStatus==="not-started";}).length,on=subset.filter(function(i){return i.deliveryStatus==="on-track";}).length,ar=subset.filter(function(i){return i.deliveryStatus==="at-risk";}).length,dl=subset.filter(function(i){return i.deliveryStatus==="delayed";}).length;return '<div class="mcard" id="sc-init"><div class="mlabel">Initiatives <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--faint)">'+label+'</span></div><div class="mval">'+subset.length+'</div><div class="sc-badges"><span class="sc-badge ds-gray">'+ns+' Not Started</span><span class="sc-badge ds-green">'+on+' On Track</span><span class="sc-badge ds-yellow">'+ar+' At Risk</span><span class="sc-badge ds-red">'+dl+' Delayed</span></div></div>';}
function scGroupedFor(id,label,key,subset,qlabel){var groups={};subset.forEach(function(i){var k=i[key];if(!groups[k])groups[k]={"not-started":0,"on-track":0,"at-risk":0,"delayed":0};groups[k][i.deliveryStatus]++;});var rows=Object.keys(groups).map(function(k){var g=groups[k],pills="";if(g["not-started"]>0)pills+='<span style="font-size:11px;font-weight:500;padding:2px 7px;border-radius:20px;background:#F1EFE8;color:#6B6B65">'+g["not-started"]+"</span>";if(g["on-track"]>0)pills+='<span style="font-size:11px;font-weight:500;padding:2px 7px;border-radius:20px;background:#EAF3DE;color:#3B6D11">'+g["on-track"]+"</span>";if(g["at-risk"]>0)pills+='<span style="font-size:11px;font-weight:500;padding:2px 7px;border-radius:20px;background:#FEF3C7;color:#92700A">'+g["at-risk"]+"</span>";if(g["delayed"]>0)pills+='<span style="font-size:11px;font-weight:500;padding:2px 7px;border-radius:20px;background:#FDECEA;color:#A93226">'+g["delayed"]+"</span>";return '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><span style="font-size:12px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+k+'</span><div style="display:flex;gap:3px;flex-shrink:0">'+pills+"</div></div>";}).join("");return '<div class="mcard" id="'+id+'"><div class="mlabel">'+label+' <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--faint)">'+qlabel+'</span></div><div style="display:flex;flex-direction:column;gap:9px;margin-top:10px">'+rows+"</div></div>";}
function refreshCards(subset,label){var sc=document.getElementById("sc-init");if(sc)sc.outerHTML=scInitiativesFor(subset,label);["sc-driver","sc-theme","sc-team"].forEach(function(id,i){var keys=["driver","theme","team"],el=document.getElementById(id);if(el)el.outerHTML=scGroupedFor(id,["By Driver","By Theme","By Team"][i],keys[i],subset,label);});}
function scInitiatives(){var cq=currentQ(),inQ=initiatives.filter(function(i){return i.quarter===cq;});return scInitiativesFor(inQ,currentQLabel());}
function scGrouped(id,label,key){var cq=currentQ(),inQ=initiatives.filter(function(i){return i.quarter===cq;});return scGroupedFor(id,label,key,inQ,currentQLabel());}
function buildFilterOptions(key){var v=[];initiatives.forEach(function(i){if(v.indexOf(i[key])===-1)v.push(i[key]);});v.sort();return v.map(function(x){return '<option value="'+x+'">'+x+"</option>";}).join("");}
function buildFilterBar(s){s=s||"";var ds=deliveryOpts.map(function(o){return '<option value="'+o.val+'">'+o.label+"</option>";}).join(""),fn=s?"applyFiltersKanban()":"applyFilters()",rs=s?"resetFiltersKanban()":"resetFilters()";return '<div class="filterbar"><select id="f-driver'+s+'" onchange="'+fn+'"><option value="">All Drivers</option>'+buildFilterOptions("driver")+'</select><select id="f-team'+s+'" onchange="'+fn+'"><option value="">All Teams</option>'+buildFilterOptions("team")+'</select><select id="f-theme'+s+'" onchange="'+fn+'"><option value="">All Themes</option>'+buildFilterOptions("theme")+'</select><select id="f-po'+s+'" onchange="'+fn+'"><option value="">All Product Owners</option>'+buildFilterOptions("productOwner")+'</select><select id="f-tl'+s+'" onchange="'+fn+'"><option value="">All Tech Leads</option>'+buildFilterOptions("techLead")+'</select><select id="f-status'+s+'" onchange="'+fn+'"><option value="">All Statuses</option>'+ds+'</select><button class="filter-reset" onclick="'+rs+'">Reset</button></div>';}
function applyFilters(){var fq=document.getElementById("f-quarter")||{value:""},fd=document.getElementById("f-driver"),ft=document.getElementById("f-team"),fth=document.getElementById("f-theme"),fpo=document.getElementById("f-po"),ftl=document.getElementById("f-tl"),fs=document.getElementById("f-status");document.querySelectorAll("#rt-table table tbody tr").forEach(function(row,idx){var i=initiatives[idx];if(!i){row.style.display="none";return;}row.style.display=(!fd.value||i.driver===fd.value)&&(!ft.value||i.team===ft.value)&&(!fth.value||i.theme===fth.value)&&(!fpo.value||i.productOwner===fpo.value)&&(!ftl.value||i.techLead===ftl.value)&&(!fs.value||i.deliveryStatus===fs.value)?"":"none";});}
function resetFilters(){["f-driver","f-team","f-theme","f-po","f-tl","f-status"].forEach(function(id){var el=document.getElementById(id);if(el){el.value="";el.classList.remove("active");}});document.querySelectorAll("#rt-table table tbody tr").forEach(function(r){r.style.display="";});}
function applyFiltersKanban(){}
function resetFiltersKanban(){document.querySelectorAll("#kanban-wrap .kancard").forEach(function(c){c.style.display="";});}

function switchTableQuarter(q){var label=q==="all"?"All Year":q,subset=q==="all"?initiatives:initiatives.filter(function(i){return i.quarter===q;});var rows=subset.map(function(i){var idx=initiatives.indexOf(i);return "<tr><td>"+i.quarter+"</td><td>"+titleCellHtml(idx)+"</td><td>"+i.driver+"</td><td>"+i.productOwner+"</td><td>"+i.techLead+"</td><td>"+i.theme+"</td><td>"+i.team+"</td><td>"+fmtDollar(i.addedValue)+"</td><td>"+roiHtml(i.roi)+"</td><td>"+dsHtml(idx)+"</td></tr>";}).join("");var tbody=document.querySelector("#rt-table table tbody");if(tbody)tbody.innerHTML=rows;refreshCards(subset,label);setQAct("tbl",q);}
function switchKanbanQuarter(q){var quarters=["Q1","Q2","Q3","Q4","Backlog"];document.querySelectorAll("#kanban-wrap .kancol").forEach(function(col,i){col.style.display=(q==="all"||quarters[i]===q)?"":"none";});setQAct("kan",q);}
function switchROIQuarter(q){document.getElementById("roi-content").innerHTML=buildScatterPlot(q)+roiRenderContent(q);setTimeout(function(){renderScatterChart(q);},50);setQAct("roi",q);}

function buildQuarterlyProgressBars(){var quarters=["Q1","Q2","Q3","Q4","Backlog"];return '<div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-bottom:16px">'+quarters.map(function(q){var items=initiatives.filter(function(i){return i.quarter===q;}),total=items.length||1;var ns=items.filter(function(i){return i.deliveryStatus==="not-started";}).length,on=items.filter(function(i){return i.deliveryStatus==="on-track";}).length,ar=items.filter(function(i){return i.deliveryStatus==="at-risk";}).length,dl=items.filter(function(i){return i.deliveryStatus==="delayed";}).length;var avSum=0;items.forEach(function(i){var n=parseFloat(String(i.addedValue||"").replace(/[^0-9.-]/g,""));if(!isNaN(n))avSum+=n;});var avLbl=avSum>=1000000?"$"+(avSum/1000000).toFixed(1)+"M":avSum>=1000?"$"+(avSum/1000).toFixed(0)+"K":avSum>0?"$"+avSum.toFixed(0):"—";var nsW=Math.round(ns/total*100),onW=Math.round(on/total*100),arW=Math.round(ar/total*100),dlW=Math.round(dl/total*100);var meta=(ns>0?ns+" not started · ":"")+(on>0?on+" on track · ":"")+(ar>0?ar+" at risk · ":"")+(dl>0?dl+" delayed":"");if(items.length===0)meta="No initiatives";var roiSum=0,roiCount=0;items.forEach(function(i){var r=parseFloat(String(i.roi||"").replace(/[^0-9.-]/g,""));if(!isNaN(r)){roiSum+=r;roiCount++;}});var roiPct=roiCount?Math.round(roiSum/roiCount*100)+"%":"—";return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;overflow:hidden"><div style="padding:10px 14px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;font-weight:500">'+q+'</span><span style="font-size:11px;color:var(--faint);background:var(--bg);border-radius:20px;padding:1px 8px">'+items.length+'</span></div><div style="padding:10px 14px 4px"><div style="display:flex;height:6px;border-radius:4px;overflow:hidden;gap:1px">'+(nsW>0?'<div style="flex:'+nsW+';background:#6B6B65"></div>':'')+(onW>0?'<div style="flex:'+onW+';background:#3B6D11"></div>':'')+(arW>0?'<div style="flex:'+arW+';background:#CA8A04"></div>':'')+(dlW>0?'<div style="flex:'+dlW+';background:#A93226"></div>':'')+(items.length===0?'<div style="flex:1;background:var(--bg)"></div>':'')+'</div><div style="font-size:10px;color:var(--faint);margin-top:4px">'+meta+'</div></div><div style="padding:6px 14px 12px;border-top:1px solid var(--border);margin-top:8px"><div style="font-size:10px;color:var(--faint)">Avg ROI</div><div style="font-size:14px;font-weight:500;color:#66C220">'+roiPct+' <span style="font-size:11px;font-weight:400;color:var(--muted)">('+avLbl+')</span></div></div></div>';}).join("")+"</div>";}

function buildScatterPlot(q){var subset=q==="all"?initiatives.filter(function(i){return i.quarter!=="Backlog";}):initiatives.filter(function(i){return i.quarter===q;});var driverColors={"Revenue Generating":"#66C220","Operational Efficiency":"#854F0B","Enhancements":"#888780","Strategic":"#185FA5","Tech":"#0D1E36"};var drivers=[];subset.forEach(function(i){if(drivers.indexOf(i.driver)===-1)drivers.push(i.driver);});drivers.sort();return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;margin-bottom:16px"><div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:var(--faint);margin-bottom:12px">Added Value vs ROI — each point is an initiative</div><div style="position:relative;width:100%;height:240px"><canvas id="roiScatterCanvas"></canvas></div><div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:10px">'+drivers.map(function(d){var c=driverColors[d]||"#888780";return '<span style="display:flex;align-items:center;gap:4px;font-size:11px;color:var(--muted)"><span style="width:8px;height:8px;border-radius:50%;background:'+c+';display:inline-block"></span>'+d+'</span>';}).join("")+'</div></div>';}
function renderScatterChart(q){var subset=q==="all"?initiatives.filter(function(i){return i.quarter!=="Backlog";}):initiatives.filter(function(i){return i.quarter===q;});var driverColors={"Revenue Generating":"#66C220","Operational Efficiency":"#854F0B","Enhancements":"#888780","Strategic":"#185FA5","Tech":"#0D1E36"};var drivers=[];subset.forEach(function(i){if(drivers.indexOf(i.driver)===-1)drivers.push(i.driver);});drivers.sort();var datasets=drivers.map(function(d){var color=driverColors[d]||"#888780";var pts=subset.filter(function(i){return i.driver===d;}).map(function(i){var av=parseFloat(String(i.addedValue||"").replace(/[^0-9.-]/g,"")),roi=parseFloat(String(i.roi||"").replace(/[^0-9.-]/g,""));if(isNaN(av)||isNaN(roi))return null;return{x:av,y:Math.round(roi*100),label:i.title};}).filter(Boolean);return{label:d,data:pts,backgroundColor:color+"99",borderColor:color,pointRadius:7,pointHoverRadius:10};});var canvas=document.getElementById("roiScatterCanvas");if(!canvas||!window.Chart)return;if(window._roiChart)window._roiChart.destroy();window._roiChart=new Chart(canvas,{type:"scatter",data:{datasets:datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){return c.raw.label+" — $"+c.raw.x+"K, "+c.raw.y+"%";}}}},scales:{x:{title:{display:true,text:"Added Value ($K)",font:{size:11}},ticks:{font:{size:11},callback:function(v){return "$"+v+"K";}}},y:{title:{display:true,text:"ROI %",font:{size:11}},ticks:{font:{size:11},callback:function(v){return v+"%";}}}},layout:{padding:10}}});}

function roiMakeOverallCard(subset,label){var s=roiCalcGroup(subset),p=isNaN(s.roiAvg)?0:Math.round(s.roiAvg*100),c=p<0?"#E24B4A":"#66C220";return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;display:flex;flex-direction:column;gap:14px"><div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:var(--faint)">Overall ROI &mdash; '+label+'</div><div><div style="font-size:24px;font-weight:500">'+s.count+'</div><div style="font-size:11px;color:var(--muted);margin-top:2px">initiatives</div></div><div style="height:1px;background:var(--border)"></div><div><div style="font-size:20px;font-weight:500">'+roiFmtAV(s.av)+'</div><div style="font-size:11px;color:var(--muted);margin-top:2px">added value</div></div><div style="height:1px;background:var(--border)"></div><div><div style="font-size:20px;font-weight:500;color:'+c+'">'+p+'%</div><div style="font-size:11px;color:var(--muted);margin-top:2px">avg ROI</div></div></div>';}
function roiMakeBarCard(subset,title,label,key){var keys=[];subset.forEach(function(i){if(keys.indexOf(i[key])===-1)keys.push(i[key]);});keys.sort();var rows=keys.map(function(k,ki){var s=roiCalcGroup(subset.filter(function(i){return i[key]===k;})),p=isNaN(s.roiAvg)?0:Math.round(s.roiAvg*100),tc=p<0?"#E24B4A":"#3B6D11",isLast=ki===keys.length-1;return '<div style="display:grid;grid-template-columns:1fr auto auto;gap:8px;padding:10px 0;'+(isLast?"":" border-bottom:0.5px solid var(--border);")+'align-items:center"><div style="font-size:12px;color:var(--text)">'+k+'</div><div style="font-size:12px;font-weight:500;text-align:right;min-width:80px">'+roiFmtEU(s.av)+'</div><div style="font-size:12px;font-weight:500;color:'+tc+';text-align:right;min-width:48px">'+p+'%</div></div>';}).join("");var hdr='<div style="display:grid;grid-template-columns:1fr auto auto;gap:8px;padding:8px 0;border-bottom:0.5px solid var(--border)"><div></div><div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.4px;color:var(--faint);text-align:right;min-width:80px">Added Value</div><div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.4px;color:var(--faint);text-align:right;min-width:48px">Avg ROI</div></div>';return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px"><div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:var(--faint);margin-bottom:14px">'+title+" &mdash; "+label+'</div>'+hdr+rows+'</div>';}
function roiMakeTable(subset){var rows=subset.map(function(i){return "<tr><td>"+i.quarter+"</td><td>"+i.title+"</td><td>"+i.driver+"</td><td>"+i.team+"</td><td>"+i.theme+"</td><td>"+fmtDollar(i.addedValue)+"</td><td>"+roiHtml(i.roi)+"</td></tr>";}).join("");return '<div class="twrap"><div class="thead-row">Initiatives</div><table><thead><tr><th>Quarter</th><th>Initiative</th><th>Driver</th><th>Team</th><th>Theme</th><th>Added Value</th><th>ROI</th></tr></thead><tbody>'+rows+'</tbody></table></div>';}
function roiRenderContent(q){var label=q==="all"?"All Year":q,subset=q==="all"?initiatives.filter(function(i){return i.quarter!=="Backlog";}):initiatives.filter(function(i){return i.quarter===q;});return '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-bottom:16px">'+roiMakeOverallCard(subset,label)+roiMakeBarCard(subset,"ROI by Driver",label,"driver")+roiMakeBarCard(subset,"ROI by Theme",label,"theme")+roiMakeBarCard(subset,"ROI by Team",label,"team")+"</div>"+roiMakeTable(subset);}
function buildROISummaries(){var cq=currentQ();return buildQFilter("roi","switchROIQuarter")+'<div id="roi-content">'+buildScatterPlot(cq)+roiRenderContent(cq)+'</div>';}

// ── Photo upload + persistent storage ────────────────────────────────────────
var _uploadTargetId = null;

// Load all saved photos from storage on startup
async function loadSavedPhotos() {
  for (var i = 0; i < REFERENCES.length; i++) {
    var r = REFERENCES[i];
    try {
      var result = await window.storage.get('photo:' + r.id, true); // shared=true
      if (result && result.value) {
        r.photo = result.value;
      }
    } catch(e) { /* key not found, no photo yet */ }
  }
}

function triggerPhotoUpload(refId) {
  _uploadTargetId = refId;
  document.getElementById('photoFileInput').value = '';
  document.getElementById('photoFileInput').click();
}

document.getElementById('photoFileInput').addEventListener('change', function(e) {
  var file = e.target.files[0];
  if (!file || !_uploadTargetId) return;
  var reader = new FileReader();
  reader.onload = async function(ev) {
    var dataUrl = ev.target.result;
    var ref = REFERENCES.filter(function(r){ return r.id === _uploadTargetId; })[0];
    if (ref) {
      ref.photo = dataUrl;
      // Persist to storage
      try {
        await window.storage.set('photo:' + ref.id, dataUrl, true); // shared=true
      } catch(e) { console.warn('Storage save failed', e); }
      // Update avatar in DOM without full re-render
      var avatarEl = document.getElementById('ref-avatar-' + _uploadTargetId);
      if (avatarEl) {
        avatarEl.innerHTML = '<img src="'+dataUrl+'" alt="'+ref.name+'">'
          + '<div class="ref-avatar-overlay"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>';
      }
    }
  };
  reader.readAsDataURL(file);
});

// ── Reference page renderer ───────────────────────────────────────────────────
function renderRef(r){
  var initials = r.name.split(' ').map(function(w){return w[0];}).join('');
  var avatarInner = r.photo
    ? '<img src="'+r.photo+'" alt="'+r.name+'">'
    : '<div class="ref-avatar-initials">'+initials+'</div>';
  avatarInner += '<div class="ref-avatar-overlay"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>';

  var quoteBlock = r.quote
    ? '<div class="ref-quote-box"><div class="ref-quote-mark">\u201c</div><div class="ref-quote-text">'+r.quote+'</div><div class="ref-attribution">\u2014 '+r.name+'<span>'+r.title+'</span></div></div>'
    : '<div class="ref-empty">Quote not yet available.</div>';

  return '<div class="ref-layout">'
    +'<div class="ref-photo-col">'
    +'<div class="ref-avatar" id="ref-avatar-'+r.id+'" onclick="triggerPhotoUpload(\''+r.id+'\')">'+avatarInner+'</div>'
    +'<div class="ref-upload-hint">Click to upload photo</div>'
    +'<div class="ref-name">'+r.name+'</div>'
    +'<div class="ref-title">'+r.title+'</div>'
    +'</div>'
    +'<div class="ref-right">'+quoteBlock+'</div>'
    +'</div>';
}

// ── Page renderers ────────────────────────────────────────────────────────────
function renderRoadmap(){
  var quarters=["Q1","Q2","Q3","Q4","Backlog"];
  var tableRows=initiatives.map(function(i,idx){return "<tr><td>"+i.quarter+"</td><td>"+titleCellHtml(idx)+"</td><td>"+i.driver+"</td><td>"+i.productOwner+"</td><td>"+i.techLead+"</td><td>"+i.theme+"</td><td>"+i.team+"</td><td>"+fmtDollar(i.addedValue)+"</td><td>"+roiHtml(i.roi)+"</td><td>"+dsHtml(idx)+"</td></tr>";}).join("");
  var kanban=quarters.map(function(q){var items=initiatives.filter(function(i){return i.quarter===q;});var cards=items.map(function(i){var idx=initiatives.indexOf(i),opt=deliveryOpts.filter(function(o){return o.val===i.deliveryStatus;})[0]||deliveryOpts[0],opts=deliveryOpts.map(function(o){return '<option value="'+o.val+'"'+(o.val===i.deliveryStatus?" selected":"")+">"+o.label+"</option>";}).join("");return '<div class="kancard"><div class="kancard-header"><span class="kancard-title">'+i.title+'</span><span class="kancard-tags">'+i.theme+" · "+i.team+'</span></div><div class="kancard-leads"><span class="kancard-lead-item"><span class="kancard-lead-label">PO</span> '+i.productOwner+'</span><span class="kancard-lead-item"><span class="kancard-lead-label">TL</span> '+i.techLead+'</span></div><div class="kancard-driver"><span class="kancard-lead-label">Driver</span> '+i.driver+'</div><div class="kancard-footer"><div class="ds-wrap"><span class="pill ds-pill '+opt.cls+'">'+opt.label+'</span><select class="ds-select" onchange="updateStatus('+idx+',this.value)">'+opts+'</select></div><span style="font-size:11px;font-weight:500">'+roiHtml(i.roi)+'</span></div></div>';}).join("");return '<div class="kancol"><div class="kancol-head"><span>'+q+'</span><span class="kancol-count">'+items.length+'</span></div><div class="kancol-body">'+(cards||'<div style="padding:8px;font-size:12px;color:var(--faint)">No initiatives</div>')+'</div></div>';}).join("");
  return '<div class="ptitle">Product Roadmap</div><div class="psub">Quarterly initiatives and progress status</div>'
    +'<div class="tabnav"><button class="tabitem act" onclick="switchTab(this,\'table\')">Table View</button><button class="tabitem" onclick="switchTab(this,\'quarterly\')">Quarterly</button><button class="tabitem" onclick="switchTab(this,\'roi\')">By ROI</button></div>'
    +'<div id="rt-table" class="tabpanel act">'+buildQFilter("tbl","switchTableQuarter")
    +'<div class="cards">'+scInitiatives()+scGrouped("sc-driver","By Driver","driver")+scGrouped("sc-theme","By Theme","theme")+scGrouped("sc-team","By Team","team")+'</div>'
    +'<div class="twrap"><div class="thead-row">Initiatives</div><div style="padding:12px 18px 4px">'+buildFilterBar()+'</div>'
    +'<table><thead><tr><th>Quarter</th><th>Initiative</th><th>Driver</th><th>Product Owner</th><th>Tech Lead</th><th>Theme</th><th>Team</th><th>Added Value</th><th>ROI</th><th>Status</th></tr></thead><tbody>'+tableRows+'</tbody></table></div></div>'
    +'<div id="rt-quarterly" class="tabpanel">'+buildQuarterlyProgressBars()+'<div style="margin-bottom:16px">'+buildFilterBar("q")+'</div><div class="kanban" id="kanban-wrap">'+kanban+'</div></div>'
    +'<div id="rt-roi" class="tabpanel">'+buildROISummaries()+'</div>';
}

var PAGES = {roadmap: renderRoadmap};

// ── Actions ───────────────────────────────────────────────────────────────────
function updateStatus(idx,val){initiatives[idx].deliveryStatus=val;var opt=deliveryOpts.filter(function(o){return o.val===val;})[0]||deliveryOpts[0];var p=document.getElementById("ds-pill-"+idx);if(p){p.className="pill ds-pill "+opt.cls;p.textContent=opt.label;}saveLocalState();}
function openCurrentLink(){var u=document.getElementById("linkInput").value.trim();if(u)window.open(u,"_blank");}
function openLinkPopup(e,idx){e.stopPropagation();_linkIdx=idx;var pop=document.getElementById("linkPopup");document.getElementById("linkInput").value=initiatives[idx].link||"";document.getElementById("linkOpenBtn").disabled=!initiatives[idx].link;var r=e.currentTarget.getBoundingClientRect();pop.style.top=(r.bottom+6)+"px";pop.style.left=Math.min(r.left,window.innerWidth-316)+"px";pop.classList.add("show");setTimeout(function(){document.getElementById("linkInput").focus();},50);}
function saveLink(){if(_linkIdx===null)return;var idx=_linkIdx;initiatives[idx].link=document.getElementById("linkInput").value.trim();document.getElementById("linkPopup").classList.remove("show");_linkIdx=null;var rows=document.querySelectorAll("#rt-table table tbody tr");if(rows[idx])rows[idx].cells[1].innerHTML=titleCellHtml(idx);saveLocalState();}
function clearLink(){if(_linkIdx===null)return;var idx=_linkIdx;initiatives[idx].link="";document.getElementById("linkPopup").classList.remove("show");_linkIdx=null;var rows=document.querySelectorAll("#rt-table table tbody tr");if(rows[idx])rows[idx].cells[1].innerHTML=titleCellHtml(idx);saveLocalState();}
function closePopup(){document.getElementById("linkPopup").classList.remove("show");_linkIdx=null;}
function switchTab(btn,id){document.querySelectorAll(".tabnav .tabitem").forEach(function(b){b.classList.remove("act");});btn.classList.add("act");document.querySelectorAll(".tabpanel").forEach(function(p){p.classList.remove("act");});document.getElementById("rt-"+id).classList.add("act");if(id==="roi")setTimeout(function(){renderScatterChart(currentQ());},50);}

function buildNav(){
  document.getElementById("nav").innerHTML=NAV_CONFIG.map(function(sec){
    return "<div><div class=\"seclabel\">"+sec.section+"</div>"
      +sec.items.map(function(item){
        var act=item.id===activeId;
        return "<div class=\"nitem"+(act?" act":"")+"\" onclick=\"setPage('"+item.id+"','"+item.label+"')\">"
          +(act?"<div class=\"nbar\"></div>":"")
          +"<div class=\"nico\">"+item.icon+"</div>"
          +"<span class=\"nlabel\">"+item.label+"</span>"
          +"</div>";
      }).join("")+"</div>";
  }).join("");
}

function setPage(id,label){
  activeId=id;
  document.getElementById("pgname").textContent=label;
  if(PAGES[id]){
    document.getElementById("content").innerHTML=PAGES[id]();
  } else if(id.startsWith("ref_")){
    var rid=id.slice(4);
    var ref=REFERENCES.filter(function(r){return r.id===rid;})[0];
    document.getElementById("content").innerHTML=ref
      ? '<div class="ptitle">'+ref.name+'</div><div class="psub" style="margin-bottom:24px">'+ref.title+'</div>'+renderRef(ref)
      : '<div class="ptitle">'+label+'</div>';
  } else {
    document.getElementById("content").innerHTML='<div class="ptitle">'+label+'</div>';
  }
  buildNav();
}

function loadData(cb){
  var el=document.getElementById("content");
  if(el)el.innerHTML='<div style="padding:40px 32px;font-size:13px;color:var(--muted)">Loading data...</div>';
  fetch("/api/data")
    .then(function(r){return r.json();})
    .then(function(data){
      initiatives=(data.initiatives||[]).map(function(i){return{quarter:String(i.quarter||"").trim(),title:String(i.title||"").trim(),driver:String(i.driver||"").trim(),team:String(i.team||"").trim(),theme:String(i.theme||"").trim(),productOwner:String(i.productOwner||"").trim(),techLead:String(i.techLead||"").trim(),addedValue:(i.addedValue!==undefined&&i.addedValue!=="")? i.addedValue:"—",roi:(i.roi!==undefined&&i.roi!=="")? i.roi:"—",deliveryStatus:"not-started",confidence:"medium",link:""};});
      loadLocalState(function(){if(cb)cb();});
    })
    .catch(function(err){if(el)el.innerHTML='<div style="padding:40px 32px;font-size:13px;color:#C0392B">Failed to load data.<br><br>'+err+"</div>";});
}

function login(){
  var e=document.getElementById("em").value.trim(),p=document.getElementById("pw").value;
  if(e==="poorhumans@inmarket.com"&&p==="babbazzi2026"){
    document.getElementById("auth").classList.add("gone");
    setTimeout(function(){document.getElementById("auth").style.display="none";},300);
    document.getElementById("app").classList.add("show");
    var name=e.split("@")[0];
    document.getElementById("av").textContent=name.slice(0,2).toUpperCase();
    document.getElementById("un").textContent=name.charAt(0).toUpperCase()+name.slice(1);
    buildNav();
    // Load saved photos first, then data, then render
    loadSavedPhotos().then(function(){
      loadData(function(){document.getElementById("content").innerHTML=PAGES[activeId]();});
    });
  } else {
    document.getElementById("err").textContent="Invalid credentials. Try: poorhumans@inmarket.com / babbazzi2026";
  }
}
function logout(){document.getElementById("app").classList.remove("show");document.getElementById("auth").style.display="flex";setTimeout(function(){document.getElementById("auth").classList.remove("gone");},10);document.getElementById("pw").value="";document.getElementById("err").textContent="";}
function toggleSb(){collapsed=!collapsed;document.getElementById("sb").classList.toggle("col",collapsed);document.getElementById("togico").innerHTML=collapsed?"<path d=\"M4 2l3 3-3 3\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>":"<path d=\"M6 2L3 5l3 3\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>";}

(function(){
  var m=new Date().getMonth(),y=new Date().getFullYear();
  document.getElementById("qbadge").textContent="Q"+(m<3?1:m<6?2:m<9?3:4)+" "+y;
  document.getElementById("pw").addEventListener("keydown",function(e){if(e.key==="Enter")login();});
  document.getElementById("em").addEventListener("keydown",function(e){if(e.key==="Enter")login();});
  document.addEventListener("click",function(e){var pop=document.getElementById("linkPopup");if(pop.classList.contains("show")&&!pop.contains(e.target))closePopup();});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closePopup();});
})();
</script>
</body>
</html>
