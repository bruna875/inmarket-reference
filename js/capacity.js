// ═══════════════════════════════════════════════════════════════════════════
// capacity.js — Team Capacity page
//   Tabs: Team Allocation, By Eng Lead, By Prod Lead
//   Budget data loaded dynamically from Google Sheets via capBudgetData
// ═══════════════════════════════════════════════════════════════════════════


// ── State ────────────────────────────────────────────────────────────────

var _capQ = null;
var _capTab = 'allocation';


// ── Budget ───────────────────────────────────────────────────────────────

function capGetBudget(q) {
  var budget = capBudgetData || {};

  if (q === 'all' || q === 'backlog') {
    var multiplier = q === 'all' ? 4 : 1;
    var merged = {};
    Object.keys(budget).forEach(function(team) {
      merged[team] = {
        design:      (budget[team].design || 0) * multiplier,
        engineering: (budget[team].engineering || 0) * multiplier,
        product:     (budget[team].product || 0) * multiplier
      };
    });
    return merged;
  }

  return budget;
}


// ── Data Calculation ─────────────────────────────────────────────────────

function capCalc(q) {
  var subset = filterSubset(q);
  var teams = {};

  subset.forEach(function(i) {
    var t = i.team;
    if (!teams[t]) teams[t] = { design: 0, engineering: 0, product: 0, initiatives: [] };

    var d = parseFloat(i.designDays) || 0;
    var e = parseFloat(i.engineeringDays) || 0;
    var p = parseFloat(i.productDays) || 0;

    teams[t].design += d;
    teams[t].engineering += e;
    teams[t].product += p;
    teams[t].initiatives.push({
      title: i.title, design: d, engineering: e, product: p, total: d + e + p,
      driver: i.driver, theme: i.theme, techLead: i.techLead,
      productOwner: i.productOwner, roi: i.roi
    });
  });

  return teams;
}


// ── UI Components ────────────────────────────────────────────────────────

function capBarHtml(used, budget) {
  if (budget <= 0) return '<div class="cap-bar-empty">\u2014</div>';

  var pct = Math.round(used / budget * 100);
  var over = used > budget;
  var overDays = used - budget;
  var color = pct > 95 ? '#A32D2D' : pct >= 80 ? '#BA7517' : '#3B6D11';

  if (over) {
    var budgetPct = Math.round(budget / used * 100);
    var overPct = 100 - budgetPct;
    return '<div class="cap-bar-over-wrap">'
      + '<div class="cap-bar-over-track">'
      + '<div class="cap-bar-track">'
      + '<div class="cap-bar-budget-marker" style="left:' + budgetPct + '%"></div>'
      + '<div class="cap-bar-budget-label" style="left:' + budgetPct + '%">budget</div>'
      + '<div class="cap-bar-fill-over">'
      + '<span class="cap-bar-pct-label">' + pct + '%</span></div></div>'
      + '<div class="cap-bar-hatch" style="width:' + overPct + '%"></div>'
      + '</div>'
      + '<span class="cap-bar-over-badge">+' + Math.round(overDays) + 'd</span></div>';
  }

  return '<div class="cap-bar-track">'
    + '<div class="cap-bar-fill" style="width:' + pct + '%;background:' + color + '">'
    + '<span class="cap-bar-pct-label">' + pct + '%</span></div></div>';
}

function capStatsHtml(used, budget) {
  var over = used > budget;
  return '<div class="cap-stats">'
    + '<div class="cap-stats-used' + (over ? ' cap-stats-over' : '') + '">' + Math.round(used) + 'd</div>'
    + '<div class="cap-stats-budget">of ' + Math.round(budget) + '</div></div>';
}

function capScorecardHtml(label, used, budget) {
  var pct = budget > 0 ? Math.round(used / budget * 100) : 0;
  var remaining = budget - used;
  var over = remaining < 0;
  var color = pct > 95 ? '#A32D2D' : pct >= 80 ? '#BA7517' : '#3B6D11';
  var cappedPct = Math.min(pct, 100);

  // Semicircle gauge SVG
  var r = 30, sw = 6;
  var halfCirc = Math.PI * r;
  var fillLen = (cappedPct / 100) * halfCirc;
  var size = (r + sw) * 2;
  var cx = size / 2, cy = size / 2 + 4;

  var gauge = '<svg width="' + size + '" height="' + Math.round(size * 0.6) + '" viewBox="0 0 ' + size + ' ' + Math.round(size * 0.65) + '" class="cap-gauge-svg">'
    + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#E8E6E0" stroke-width="' + sw + '" '
    + 'stroke-dasharray="' + halfCirc.toFixed(1) + ' ' + (halfCirc * 2).toFixed(1) + '" stroke-linecap="round" '
    + 'style="transform:rotate(180deg);transform-origin:' + cx + 'px ' + cy + 'px"/>'
    + (cappedPct > 0
      ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + sw + '" '
        + 'stroke-dasharray="' + fillLen.toFixed(1) + ' ' + (halfCirc * 2 - fillLen).toFixed(1) + '" stroke-linecap="round" '
        + 'style="transform:rotate(180deg);transform-origin:' + cx + 'px ' + cy + 'px"/>'
      : '')
    + '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" dominant-baseline="central" '
    + 'class="cap-gauge-pct">' + pct + '%</text></svg>';

  return '<div class="cap-scorecard">'
    + '<div class="cap-scorecard-label">' + label + '</div>'
    + gauge
    + '<div class="cap-scorecard-val"><span class="cap-scorecard-used">' + Math.round(used) + '</span> '
    + '<span class="cap-scorecard-budget">/ ' + Math.round(budget) + ' days</span></div>'
    + '<div class="cap-scorecard-remaining' + (over ? ' cap-scorecard-over' : '') + '">'
    + (over ? Math.abs(Math.round(remaining)) + 'd over budget' : Math.round(remaining) + 'd available') + '</div></div>';
}


// ── Initiative Table (shared by team blocks and leader blocks) ───────────

function capInitTable(inits, columns) {
  var headers = columns.map(function(col) {
    return '<th class="cap-th" style="text-align:' + (col.align || 'left') + ';padding:' + (col.headerPad || '4px 8px') + '">' + col.label + '</th>';
  }).join('');

  var rows = inits.map(function(ini) {
    var cells = columns.map(function(col) {
      return '<td class="cap-td" style="padding:8px' + (col.style || '') + '">' + col.render(ini) + '</td>';
    }).join('');
    return '<tr class="cap-tr">' + cells + '</tr>';
  }).join('');

  return '<table class="cap-init-table">'
    + '<thead><tr class="cap-init-thead-row">'
    + headers + '</tr></thead><tbody class="cap-init-tbody">' + rows + '</tbody></table>';
}

// Column definitions for team blocks
var CAP_TEAM_COLS = [
  { label: 'Initiative', align: 'left', headerPad: '4px 8px 4px 0', style: ' 8px 8px 0;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px', render: function(i) { return i.title; } },
  { label: 'Driver',     render: function(i) { return driverBadge(i.driver); } },
  { label: 'Theme',      render: function(i) { return themeBadge(i.theme); } },
  { label: 'Prod lead',  render: function(i) { return '<span class="cap-cell-muted">' + (i.productOwner || '\u2014') + '</span>'; } },
  { label: 'Eng lead',   render: function(i) { return '<span class="cap-cell-muted">' + (i.techLead || '\u2014') + '</span>'; } },
  { label: 'Design',     align: 'right', render: function(i) { return '<span class="cap-cell-muted">' + (i.design ? Math.round(i.design) + 'd' : '\u2014') + '</span>'; } },
  { label: 'Engineering', align: 'right', render: function(i) { return '<span class="cap-cell-muted">' + (i.engineering ? Math.round(i.engineering) + 'd' : '\u2014') + '</span>'; } },
  { label: 'Product',    align: 'right', render: function(i) { return '<span class="cap-cell-muted">' + (i.product ? Math.round(i.product) + 'd' : '\u2014') + '</span>'; } },
  { label: 'Total',      align: 'right', render: function(i) { return '<span class="cap-cell-total">' + Math.round(i.total) + 'd</span>'; } },
  { label: 'ROI',        align: 'right', headerPad: '4px 0 4px 8px', render: function(i) { return roiHtml(i.roi); } }
];

// Column definitions for leader blocks (includes Team column)
var CAP_LEADER_COLS = [
  { label: 'Initiative', align: 'left', headerPad: '12px 8px 4px 0', style: ' 8px 8px 0;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px', render: function(i) { return i.title; } },
  { label: 'Team',       headerPad: '12px 8px 4px', render: function(i) { return i.team; } },
  { label: 'Driver',     headerPad: '12px 8px 4px', render: function(i) { return driverBadge(i.driver); } },
  { label: 'Theme',      headerPad: '12px 8px 4px', render: function(i) { return themeBadge(i.theme); } },
  { label: 'Design',     align: 'right', headerPad: '12px 8px 4px', render: function(i) { return '<span class="cap-cell-muted">' + (i.design ? Math.round(i.design) + 'd' : '\u2014') + '</span>'; } },
  { label: 'Engineering', align: 'right', headerPad: '12px 8px 4px', render: function(i) { return '<span class="cap-cell-muted">' + (i.engineering ? Math.round(i.engineering) + 'd' : '\u2014') + '</span>'; } },
  { label: 'Product',    align: 'right', headerPad: '12px 8px 4px', render: function(i) { return '<span class="cap-cell-muted">' + (i.product ? Math.round(i.product) + 'd' : '\u2014') + '</span>'; } },
  { label: 'Total',      align: 'right', headerPad: '12px 8px 4px', render: function(i) { return '<span class="cap-cell-total">' + Math.round(i.total) + 'd</span>'; } },
  { label: 'ROI',        align: 'right', headerPad: '12px 0 4px 8px', render: function(i) { return roiHtml(i.roi); } }
];


// ── Team Block ───────────────────────────────────────────────────────────

function capTeamBlock(teamName, used, budget, inits) {
  var totalUsed = used.design + used.engineering + used.product;

  var disciplines = [
    { label: 'Design',      key: 'design' },
    { label: 'Engineering',  key: 'engineering' },
    { label: 'Product',     key: 'product' }
  ];

  var bars = disciplines.map(function(d, i) {
    return '<div class="cap-disc-row' + (i > 0 ? ' cap-disc-row-border' : '') + '">'
      + '<div class="cap-disc-label">' + d.label + '</div>'
      + capBarHtml(used[d.key], budget[d.key])
      + capStatsHtml(used[d.key], budget[d.key])
      + '</div>';
  }).join('');

  return '<div class="cap-block">'
    + '<div class="cap-block-head">'
    + '<div class="cap-block-title">' + teamName + '</div>'
    + '<span class="cap-block-badge">'
    + inits.length + ' initiative' + (inits.length !== 1 ? 's' : '') + ' \u00b7 ' + Math.round(totalUsed) + ' days</span>'
    + '</div>'
    + '<div class="cap-block-bars">' + bars + '</div>'
    + '<div class="cap-block-table">'
    + '<div class="cap-block-table-divider"></div>'
    + capInitTable(inits, CAP_TEAM_COLS)
    + '</div></div>';
}


// ── Leader Block ─────────────────────────────────────────────────────────

function capLeaderBlock(leaderName, role, inits) {
  var total = 0;
  inits.forEach(function(ini) { total += ini.total; });

  return '<div class="cap-block">'
    + '<div class="cap-block-head">'
    + '<div><div class="cap-block-title">' + leaderName + '</div>'
    + '<div class="cap-block-role">' + role + '</div></div>'
    + '<span class="cap-block-badge">'
    + inits.length + ' initiative' + (inits.length !== 1 ? 's' : '') + ' \u00b7 ' + Math.round(total) + 'd total</span>'
    + '</div>'
    + '<div class="cap-block-table-only">' + capInitTable(inits, CAP_LEADER_COLS) + '</div></div>';
}


// ── Leader Views ─────────────────────────────────────────────────────────

function capRenderByLeader(q, leaderKey, role) {
  var subset = filterSubset(q);
  var leaders = {};

  subset.forEach(function(i) {
    var d = parseFloat(i.designDays) || 0;
    var e = parseFloat(i.engineeringDays) || 0;
    var p = parseFloat(i.productDays) || 0;
    var ini = {
      title: i.title, design: d, engineering: e, product: p, total: d + e + p,
      driver: i.driver, theme: i.theme, team: i.team, roi: i.roi
    };
    var name = i[leaderKey];
    if (name) {
      if (!leaders[name]) leaders[name] = [];
      leaders[name].push(ini);
    }
  });

  var names = Object.keys(leaders);
  names.sort();

  if (!names.length) {
    return '<div class="cap-empty">No initiatives</div>';
  }

  return names.map(function(name) {
    return capLeaderBlock(name, role, leaders[name]);
  }).join('');
}

function capRenderByEngLead(q)  { return capRenderByLeader(q, 'techLead',     'Engineering Lead'); }
function capRenderByProdLead(q) { return capRenderByLeader(q, 'productOwner', 'Product Lead'); }


// ── Main Render ──────────────────────────────────────────────────────────

function capRender(q) {
  _capQ = q || currentQ();
  var label = _capQ === 'all' ? 'All Year' : _capQ;
  var teams = capCalc(_capQ);
  var budgets = capGetBudget(_capQ);
  var teamNames = Object.keys(teams);
  teamNames.sort();

  // Totals
  var totD = 0, totE = 0, totP = 0, budD = 0, budE = 0, budP = 0;
  teamNames.forEach(function(t) {
    totD += teams[t].design;
    totE += teams[t].engineering;
    totP += teams[t].product;
    var b = budgets[t] || { design: 0, engineering: 0, product: 0 };
    budD += b.design;
    budE += b.engineering;
    budP += b.product;
  });

  // Team blocks
  var blocks = teamNames.map(function(t) {
    var b = budgets[t] || { design: 0, engineering: 0, product: 0 };
    return capTeamBlock(t, teams[t], b, teams[t].initiatives);
  }).join('');

  if (teamNames.length === 0) {
    blocks = '<div class="cap-empty">No initiatives for ' + label + '</div>';
  }

  // Allocation tab content
  var allocContent = '<div class="cap-scorecard-grid">'
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

  // Leader tab contents
  var engLeadContent = capRenderByEngLead(_capQ);
  var prodLeadContent = capRenderByProdLead(_capQ);

  // Tab buttons helper
  function tabBtn(id, label) {
    return '<button class="tabitem' + (_capTab === id ? ' act' : '') + '" data-captab="' + id + '">' + label + '</button>';
  }

  // Assemble page
  return '<div class="roadmap-header">'
    + '<div><div class="ptitle">Team Capacity</div>'
    + '<div class="psub psub-flush">Budget utilization by team and discipline \u2014 Design, Engineering, Product</div></div></div>'
    + '<div class="tabnav">' + tabBtn('allocation', 'Team Allocation') + tabBtn('englead', 'By Eng Lead') + tabBtn('prodlead', 'By Prod Lead') + '</div>'
    + buildQFilter('cap', 'switchCapQuarter')
    + '<div id="cap-allocation" style="' + (_capTab === 'allocation' ? '' : 'display:none') + '">' + allocContent + '</div>'
    + '<div id="cap-englead" style="'    + (_capTab === 'englead'    ? '' : 'display:none') + '">' + engLeadContent + '</div>'
    + '<div id="cap-prodlead" style="'   + (_capTab === 'prodlead'   ? '' : 'display:none') + '">' + prodLeadContent + '</div>';
}


// ── Tab & Quarter Switching ──────────────────────────────────────────────

function switchCapTab(tab) {
  _capTab = tab;
  document.querySelectorAll('[data-captab]').forEach(function(btn) {
    btn.classList.toggle('act', btn.dataset.captab === tab);
  });
  ['cap-allocation', 'cap-englead', 'cap-prodlead'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = id === 'cap-' + tab ? '' : 'none';
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
