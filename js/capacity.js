// capacity.js — Team Capacity page


function capGetBudget(q) {
  var budget = capBudgetData || {};
  if (q === 'all' || q === 'backlog') {
    var multiplier = q === 'all' ? 4 : 1;
    var merged = {};
    Object.keys(budget).forEach(function(team) {
      merged[team] = {
        design: (budget[team].design || 0) * multiplier,
        engineering: (budget[team].engineering || 0) * multiplier,
        product: (budget[team].product || 0) * multiplier
      };
    });
    return merged;
  }
  return budget;
}

function capCalc(q) {
  var subset = q === 'all' ? initiatives.filter(function(i){return i.quarter!=='Backlog';}) : q === 'backlog' ? initiatives.filter(function(i){return i.quarter==='Backlog';}) : initiatives.filter(function(i){return i.quarter===q;});
  var teams = {};
  subset.forEach(function(i) {
    var t = i.team;
    if (!teams[t]) teams[t] = {design:0,engineering:0,product:0,initiatives:[]};
    var d = parseFloat(i.designDays) || 0;
    var e = parseFloat(i.engineeringDays) || 0;
    var p = parseFloat(i.productDays) || 0;
    teams[t].design += d;
    teams[t].engineering += e;
    teams[t].product += p;
    teams[t].initiatives.push({title:i.title,design:d,engineering:e,product:p,total:d+e+p,driver:i.driver,theme:i.theme,techLead:i.techLead,productOwner:i.productOwner,roi:i.roi});
  });
  return teams;
}

function capBarHtml(used, budget, label) {
  if (budget <= 0) return '<div style="font-size:11px;color:var(--faint)">\u2014</div>';
  var pct = Math.round(used / budget * 100);
  var over = used > budget;
  var overDays = used - budget;
  var color = pct > 95 ? '#A32D2D' : pct >= 80 ? '#BA7517' : '#3B6D11';

  if (over) {
    var budgetPct = Math.round(budget / used * 100);
    var overPct = 100 - budgetPct;
    return '<div class="cap-bar-over-wrap">'
      + '<div class="cap-bar-over-track">'
      + '<div class="cap-bar-bg">'
      + '<div class="cap-bar-budget-line" style="left:' + budgetPct + '%"></div>'
      + '<div class="cap-bar-budget-label" style="left:' + budgetPct + '%">budget</div>'
      + '<div class="cap-bar-over-fill"><span class="cap-bar-pct">' + pct + '%</span></div>'
      + '</div>'
      + '<div class="cap-bar-over-hatch" style="width:' + overPct + '%"></div>'
      + '</div>'
      + '<span class="cap-bar-over-badge">+' + Math.round(overDays) + 'd</span>'
      + '</div>';
  }

  return '<div class="cap-bar-track">'
    + '<div class="cap-bar-fill" style="width:' + pct + '%;background:' + color + '">'
    + '<span class="cap-bar-pct">' + pct + '%</span>'
    + '</div></div>';
}

function capStatsHtml(used, budget) {
  var over = used > budget;
  return '<div class="cap-stats">'
    + '<div class="cap-stats-val' + (over ? ' over' : '') + '">' + Math.round(used) + 'd</div>'
    + '<div class="cap-stats-of">of ' + Math.round(budget) + '</div>'
    + '</div>';
}

function capTeamBlock(teamName, used, budget, inits) {
  var totalUsed = used.design + used.engineering + used.product;
  var totalBudget = budget.design + budget.engineering + budget.product;
  var initRows = inits.map(function(ini) {
    return '<tr class="cap-init-tr">'
      + '<td class="cap-init-td-name">' + ini.title + '</td>'
      + '<td class="cap-init-td">' + driverBadge(ini.driver) + '</td>'
      + '<td class="cap-init-td">' + themeBadge(ini.theme) + '</td>'
      + '<td class="cap-init-td" style="color:var(--muted);white-space:nowrap">' + (ini.productOwner || '\u2014') + '</td>'
      + '<td class="cap-init-td" style="color:var(--muted);white-space:nowrap">' + (ini.techLead || '\u2014') + '</td>'
      + '<td class="cap-init-td-num">' + (ini.design ? Math.round(ini.design) + 'd' : '\u2014') + '</td>'
      + '<td class="cap-init-td-num">' + (ini.engineering ? Math.round(ini.engineering) + 'd' : '\u2014') + '</td>'
      + '<td class="cap-init-td-num">' + (ini.product ? Math.round(ini.product) + 'd' : '\u2014') + '</td>'
      + '<td class="cap-init-td-total">' + Math.round(ini.total) + 'd</td>'
      + '<td class="cap-init-td-roi">' + roiHtml(ini.roi) + '</td>'
      + '</tr>';
  }).join('');

  var initTable = '<table class="cap-init-table">'
    + '<thead><tr class="cap-init-th">'
    + '<th class="cap-th-left-first">Initiative</th>'
    + '<th class="cap-th-left">Driver</th>'
    + '<th class="cap-th-left">Theme</th>'
    + '<th class="cap-th-left">Prod lead</th>'
    + '<th class="cap-th-left">Eng lead</th>'
    + '<th class="cap-th-right">Design</th>'
    + '<th class="cap-th-right">Engineering</th>'
    + '<th class="cap-th-right">Product</th>'
    + '<th class="cap-th-right">Total</th>'
    + '<th class="cap-th-right-last">ROI</th>'
    + '</tr></thead><tbody class="cap-init-tbody">' + initRows + '</tbody></table>';

  return '<div class="cap-team-block">'
    + '<div class="cap-team-header">'
    + '<div class="cap-team-name">' + teamName + '</div>'
    + '<span class="cap-team-meta">' + inits.length + ' initiative' + (inits.length !== 1 ? 's' : '') + ' \u00b7 ' + Math.round(totalUsed) + ' days</span>'
    + '</div>'
    + '<div class="cap-team-body">'
    + '<div class="cap-bar-row">'
    + '<div class="cap-bar-label">Design</div>'
    + capBarHtml(used.design, budget.design)
    + capStatsHtml(used.design, budget.design)
    + '</div>'
    + '<div class="cap-bar-row">'
    + '<div class="cap-bar-label">Engineering</div>'
    + capBarHtml(used.engineering, budget.engineering)
    + capStatsHtml(used.engineering, budget.engineering)
    + '</div>'
    + '<div class="cap-bar-row">'
    + '<div class="cap-bar-label">Product</div>'
    + capBarHtml(used.product, budget.product)
    + capStatsHtml(used.product, budget.product)
    + '</div>'
    + '</div>'
    + '<div class="cap-init-table-wrap">'
    + '<div class="cap-init-sep"></div>'
    + initTable
    + '</div>'
    + '</div>';
}

function capScorecardHtml(label, used, budget) {
  var pct = budget > 0 ? Math.round(used / budget * 100) : 0;
  var remaining = budget - used;
  var over = remaining < 0;
  var color = pct > 95 ? '#A32D2D' : pct >= 80 ? '#BA7517' : '#3B6D11';
  var cappedPct = Math.min(pct, 100);
  var r = 30, sw = 6;
  var halfCirc = Math.PI * r;
  var fillLen = (cappedPct / 100) * halfCirc;
  var gapLen = halfCirc - fillLen;
  var size = (r + sw) * 2;
  var cx = size / 2, cy = size / 2 + 4;
  var gauge = '<svg width="' + size + '" height="' + Math.round(size * 0.6) + '" viewBox="0 0 ' + size + ' ' + Math.round(size * 0.65) + '" style="display:block;margin:0 auto;overflow:visible">'
    + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#E8E6E0" stroke-width="' + sw + '" stroke-dasharray="' + halfCirc.toFixed(1) + ' ' + (halfCirc * 2).toFixed(1) + '" stroke-linecap="round" style="transform:rotate(180deg);transform-origin:' + cx + 'px ' + cy + 'px"/>'
    + (cappedPct > 0 ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + sw + '" stroke-dasharray="' + fillLen.toFixed(1) + ' ' + (halfCirc * 2 - fillLen).toFixed(1) + '" stroke-linecap="round" style="transform:rotate(180deg);transform-origin:' + cx + 'px ' + cy + 'px"/>' : '')
    + '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" dominant-baseline="central" style="font-size:14px;font-weight:500;fill:var(--text)">' + pct + '%</text>'
    + '</svg>';
  return '<div class="cap-scorecard">'
    + '<div class="cap-scorecard-label">' + label + '</div>'
    + gauge
    + '<div style="margin-top:4px"><span class="cap-scorecard-big">' + Math.round(used) + '</span> <span class="cap-scorecard-of">/ ' + Math.round(budget) + ' days</span></div>'
    + '<div class="cap-scorecard-rem" style="color:' + (over ? '#A32D2D' : 'var(--faint)') + '">' + (over ? Math.abs(Math.round(remaining)) + 'd over budget' : Math.round(remaining) + 'd available') + '</div>'
    + '</div>';
}

var _capQ = null;
var _capTab = 'allocation';

function capLeaderBlock(leaderName, role, inits) {
  var totD = 0, totE = 0, totP = 0;
  inits.forEach(function(ini) { totD += ini.design; totE += ini.engineering; totP += ini.product; });
  var total = totD + totE + totP;
  var initRows = inits.map(function(ini) {
    return '<tr class="cap-init-tr">'
      + '<td class="cap-init-td-name">' + ini.title + '</td>'
      + '<td class="cap-init-td">' + (ini.team || '') + '</td>'
      + '<td class="cap-init-td">' + driverBadge(ini.driver) + '</td>'
      + '<td class="cap-init-td">' + themeBadge(ini.theme) + '</td>'
      + '<td class="cap-init-td-num">' + (ini.design ? Math.round(ini.design) + 'd' : '\u2014') + '</td>'
      + '<td class="cap-init-td-num">' + (ini.engineering ? Math.round(ini.engineering) + 'd' : '\u2014') + '</td>'
      + '<td class="cap-init-td-num">' + (ini.product ? Math.round(ini.product) + 'd' : '\u2014') + '</td>'
      + '<td class="cap-init-td-total">' + Math.round(ini.total) + 'd</td>'
      + '<td class="cap-init-td-roi">' + roiHtml(ini.roi) + '</td>'
      + '</tr>';
  }).join('');

  return '<div class="cap-team-block">'
    + '<div class="cap-leader-header">'
    + '<div><div class="cap-leader-name">' + leaderName + '</div>'
    + '<div class="cap-leader-role">' + role + '</div></div>'
    + '<span class="cap-team-meta">' + inits.length + ' initiative' + (inits.length !== 1 ? 's' : '') + ' \u00b7 ' + Math.round(total) + 'd total</span>'
    + '</div>'
    + '<div class="cap-init-table-wrap">'
    + '<table class="cap-init-table">'
    + '<thead><tr class="cap-init-th">'
    + '<th class="cap-th-left-lg-first">Initiative</th>'
    + '<th class="cap-th-left-lg">Team</th>'
    + '<th class="cap-th-left-lg">Driver</th>'
    + '<th class="cap-th-left-lg">Theme</th>'
    + '<th class="cap-th-right-lg">Design</th>'
    + '<th class="cap-th-right-lg">Engineering</th>'
    + '<th class="cap-th-right-lg">Product</th>'
    + '<th class="cap-th-right-lg">Total</th>'
    + '<th class="cap-th-right-lg-last">ROI</th>'
    + '</tr></thead><tbody>' + initRows + '</tbody></table>'
    + '</div></div>';
}

function capRenderByEngLead(q) {
  var subset = q === 'all' ? initiatives.filter(function(i){return i.quarter!=='Backlog';}) : q === 'backlog' ? initiatives.filter(function(i){return i.quarter==='Backlog';}) : initiatives.filter(function(i){return i.quarter===q;});
  var leaders = {};
  subset.forEach(function(i) {
    var d = parseFloat(i.designDays) || 0, e = parseFloat(i.engineeringDays) || 0, p = parseFloat(i.productDays) || 0;
    var ini = {title:i.title,design:d,engineering:e,product:p,total:d+e+p,driver:i.driver,theme:i.theme,team:i.team,roi:i.roi};
    if (i.techLead) { if (!leaders[i.techLead]) leaders[i.techLead] = []; leaders[i.techLead].push(ini); }
  });
  var names = Object.keys(leaders); names.sort();
  if (!names.length) return '<div class="cap-empty"><div class="cap-empty-text">No initiatives</div></div>';
  return names.map(function(name) { return capLeaderBlock(name, 'Engineering Lead', leaders[name]); }).join('');
}

function capRenderByProdLead(q) {
  var subset = q === 'all' ? initiatives.filter(function(i){return i.quarter!=='Backlog';}) : q === 'backlog' ? initiatives.filter(function(i){return i.quarter==='Backlog';}) : initiatives.filter(function(i){return i.quarter===q;});
  var leaders = {};
  subset.forEach(function(i) {
    var d = parseFloat(i.designDays) || 0, e = parseFloat(i.engineeringDays) || 0, p = parseFloat(i.productDays) || 0;
    var ini = {title:i.title,design:d,engineering:e,product:p,total:d+e+p,driver:i.driver,theme:i.theme,team:i.team,roi:i.roi};
    if (i.productOwner) { if (!leaders[i.productOwner]) leaders[i.productOwner] = []; leaders[i.productOwner].push(ini); }
  });
  var names = Object.keys(leaders); names.sort();
  if (!names.length) return '<div class="cap-empty"><div class="cap-empty-text">No initiatives</div></div>';
  return names.map(function(name) { return capLeaderBlock(name, 'Product Lead', leaders[name]); }).join('');
}

function capRender(q) {
  _capQ = q || currentQ();
  var label = _capQ === 'all' ? 'All Year' : _capQ;
  var teams = capCalc(_capQ);
  var budgets = capGetBudget(_capQ);
  var teamNames = Object.keys(teams);
  teamNames.sort();

  var totD = 0, totE = 0, totP = 0, budD = 0, budE = 0, budP = 0;
  teamNames.forEach(function(t) {
    totD += teams[t].design; totE += teams[t].engineering; totP += teams[t].product;
    var b = budgets[t] || {design:0,engineering:0,product:0};
    budD += b.design; budE += b.engineering; budP += b.product;
  });

  var blocks = teamNames.map(function(t) {
    var b = budgets[t] || {design:0,engineering:0,product:0};
    return capTeamBlock(t, teams[t], b, teams[t].initiatives);
  }).join('');

  if (teamNames.length === 0) {
    blocks = '<div class="cap-empty"><div class="cap-empty-text">No initiatives for ' + label + '</div></div>';
  }

  var allocContent = '<div class="cap-summary-grid">'
    + capScorecardHtml('Total engineering', totE, budE)
    + capScorecardHtml('Total product', totP, budP)
    + capScorecardHtml('Total design', totD, budD)
    + '</div>'
    + blocks
    + '<div class="cap-legend">'
    + '<span class="cap-legend-item"><span class="cap-legend-dot" style="background:#3B6D11"></span>Under 80%</span>'
    + '<span class="cap-legend-item"><span class="cap-legend-dot" style="background:#BA7517"></span>80\u201395%</span>'
    + '<span class="cap-legend-item"><span class="cap-legend-dot" style="background:#A32D2D"></span>Over 95%</span>'
    + '</div>';

  var engLeadContent = capRenderByEngLead(_capQ);
  var prodLeadContent = capRenderByProdLead(_capQ);

  return '<div class="page-header">'
    + '<div><div class="ptitle">Team Capacity</div><div class="psub psub-flush">Budget utilization by team and discipline \u2014 Design, Engineering, Product</div></div>'
    + '<a href="https://docs.google.com/spreadsheets/d/1g7c51-WX8UqFKJzKrnPzJ_fZSKsagnNj57Jir2v9quc/edit?usp=sharing" target="_blank" class="roadmap-datasource"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>The Infamous Data Model \u2192</a>'
    + '</div>'
    + '<div class="tabnav"><button class="tabitem' + (_capTab === 'allocation' ? ' act' : '') + '" data-captab="allocation">Team Allocation</button><button class="tabitem' + (_capTab === 'englead' ? ' act' : '') + '" data-captab="englead">By Eng Lead</button><button class="tabitem' + (_capTab === 'prodlead' ? ' act' : '') + '" data-captab="prodlead">By Prod Lead</button></div>'
    + buildQFilter('cap','switchCapQuarter')
    + '<div id="cap-allocation" class="tabpanel' + (_capTab === 'allocation' ? ' act' : '') + '">' + allocContent + '</div>'
    + '<div id="cap-englead" class="tabpanel' + (_capTab === 'englead' ? ' act' : '') + '">' + engLeadContent + '</div>'
    + '<div id="cap-prodlead" class="tabpanel' + (_capTab === 'prodlead' ? ' act' : '') + '">' + prodLeadContent + '</div>';
}

function switchCapTab(tab) {
  _capTab = tab;
  document.querySelectorAll('[data-captab]').forEach(function(btn) {
    btn.classList.toggle('act', btn.dataset.captab === tab);
  });
  ['cap-allocation', 'cap-englead', 'cap-prodlead'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.toggle('act', id === 'cap-' + tab);
  });
}

function switchCapQuarter(q) {
  var content = document.getElementById('content');
  if (content) content.innerHTML = capRender(q);
  setQAct('cap', q);
}

function renderTeamCapacity() {
  return capRender(currentQ());
}
