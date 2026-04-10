// capacity.js — Team Capacity page


var CAP_BUDGET = {
  Q1: {Measurement:{design:70,engineering:140,product:40},Platform:{design:60,engineering:130,product:38},Ads:{design:65,engineering:120,product:20}},
  Q2: {Measurement:{design:75,engineering:150,product:42},Platform:{design:65,engineering:140,product:42},Ads:{design:70,engineering:130,product:21}},
  Q3: {Measurement:{design:70,engineering:145,product:38},Platform:{design:60,engineering:135,product:40},Ads:{design:60,engineering:125,product:22}},
  Q4: {Measurement:{design:65,engineering:130,product:35},Platform:{design:55,engineering:120,product:36},Ads:{design:55,engineering:110,product:18}}
};

function capGetBudget(q) {
  if (q === 'all') {
    var merged = {};
    ['Q1','Q2','Q3','Q4'].forEach(function(qk) {
      var qb = CAP_BUDGET[qk] || {};
      Object.keys(qb).forEach(function(team) {
        if (!merged[team]) merged[team] = {design:0,engineering:0,product:0};
        merged[team].design += qb[team].design || 0;
        merged[team].engineering += qb[team].engineering || 0;
        merged[team].product += qb[team].product || 0;
      });
    });
    return merged;
  }
  return CAP_BUDGET[q] || {};
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
    teams[t].initiatives.push({title:i.title,design:d,engineering:e,product:p,total:d+e+p,driver:i.driver,theme:i.theme,techLead:i.techLead,productOwner:i.productOwner});
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
    return '<div style="display:flex;align-items:center;gap:8px">'
      + '<div style="flex:1;position:relative">'
      + '<div style="height:20px;background:var(--bg);border-radius:5px;overflow:visible;position:relative">'
      + '<div style="position:absolute;left:' + budgetPct + '%;top:-4px;bottom:-4px;width:1.5px;background:var(--faint);z-index:2"></div>'
      + '<div style="position:absolute;left:' + budgetPct + '%;top:-12px;font-size:9px;color:var(--faint);transform:translateX(-50%)">budget</div>'
      + '<div style="height:100%;width:100%;background:#A32D2D;border-radius:5px;display:flex;align-items:center;padding-left:8px"><span style="font-size:10px;font-weight:500;color:#fff">' + pct + '%</span></div>'
      + '</div>'
      + '<div style="position:absolute;right:0;top:0;width:' + overPct + '%;height:20px;background:repeating-linear-gradient(45deg,#A32D2D22,#A32D2D22 3px,transparent 3px,transparent 6px);border-radius:0 5px 5px 0"></div>'
      + '</div>'
      + '<span style="font-size:11px;font-weight:500;color:#A32D2D;background:#FDECEA;padding:2px 8px;border-radius:12px;white-space:nowrap;flex-shrink:0">+' + Math.round(overDays) + 'd</span>'
      + '</div>';
  }

  return '<div style="height:20px;background:var(--bg);border-radius:5px;overflow:hidden">'
    + '<div style="height:100%;width:' + pct + '%;background:' + color + ';border-radius:5px;display:flex;align-items:center;padding-left:8px;min-width:32px">'
    + '<span style="font-size:10px;font-weight:500;color:#fff">' + pct + '%</span>'
    + '</div></div>';
}

function capStatsHtml(used, budget) {
  var over = used > budget;
  return '<div style="text-align:right;font-size:12px">'
    + '<div style="font-weight:500;color:' + (over ? '#A32D2D' : 'var(--text)') + '">' + Math.round(used) + 'd</div>'
    + '<div style="font-size:11px;color:var(--faint)">of ' + Math.round(budget) + '</div>'
    + '</div>';
}

function capTeamBlock(teamName, used, budget, inits) {
  var totalUsed = used.design + used.engineering + used.product;
  var totalBudget = budget.design + budget.engineering + budget.product;
  var initRows = inits.map(function(ini) {
    return '<tr style="border-top:0.5px solid var(--border)">'
      + '<td style="padding:8px 8px 8px 0;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px">' + ini.title + '</td>'
      + '<td style="padding:8px">' + driverBadge(ini.driver) + '</td>'
      + '<td style="padding:8px">' + themeBadge(ini.theme) + '</td>'
      + '<td style="padding:8px;color:var(--muted);white-space:nowrap">' + (ini.techLead || '\u2014') + '</td>'
      + '<td style="padding:8px;color:var(--muted);white-space:nowrap">' + (ini.productOwner || '\u2014') + '</td>'
      + '<td style="padding:8px;text-align:right;color:var(--muted)">' + (ini.design ? Math.round(ini.design) + 'd' : '\u2014') + '</td>'
      + '<td style="padding:8px;text-align:right;color:var(--muted)">' + (ini.engineering ? Math.round(ini.engineering) + 'd' : '\u2014') + '</td>'
      + '<td style="padding:8px;text-align:right;color:var(--muted)">' + (ini.product ? Math.round(ini.product) + 'd' : '\u2014') + '</td>'
      + '<td style="padding:8px 0 8px 8px;text-align:right;font-weight:500;color:var(--text)">' + Math.round(ini.total) + 'd</td>'
      + '</tr>';
  }).join('');

  var initTable = '<table style="width:100%;border-collapse:collapse;font-size:12px">'
    + '<thead><tr style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.4px;color:var(--faint)">'
    + '<th style="text-align:left;padding:4px 8px 4px 0">Initiative</th>'
    + '<th style="text-align:left;padding:4px 8px">Driver</th>'
    + '<th style="text-align:left;padding:4px 8px">Theme</th>'
    + '<th style="text-align:left;padding:4px 8px">Eng lead</th>'
    + '<th style="text-align:left;padding:4px 8px">Prod lead</th>'
    + '<th style="text-align:right;padding:4px 8px">Design</th>'
    + '<th style="text-align:right;padding:4px 8px">Engineering</th>'
    + '<th style="text-align:right;padding:4px 8px">Product</th>'
    + '<th style="text-align:right;padding:4px 0 4px 8px">Total</th>'
    + '</tr></thead><tbody style="border-top:0.5px solid var(--border)">' + initRows + '</tbody></table>';

  return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:16px;overflow:hidden">'
    + '<div style="padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">'
    + '<div style="font-size:14px;font-weight:500;color:var(--text)">' + teamName + '</div>'
    + '<span style="font-size:11px;color:var(--muted);background:var(--bg);padding:2px 10px;border-radius:20px">' + inits.length + ' initiative' + (inits.length !== 1 ? 's' : '') + ' \u00b7 ' + Math.round(totalUsed) + ' days</span>'
    + '</div>'
    + '<div style="padding:16px 20px">'
    + '<div style="display:grid;grid-template-columns:90px 1fr 80px;gap:14px;align-items:center;padding:8px 0">'
    + '<div style="font-size:12px;color:var(--muted)">Design</div>'
    + capBarHtml(used.design, budget.design)
    + capStatsHtml(used.design, budget.design)
    + '</div>'
    + '<div style="display:grid;grid-template-columns:90px 1fr 80px;gap:14px;align-items:center;padding:8px 0;border-top:0.5px solid var(--border)">'
    + '<div style="font-size:12px;color:var(--muted)">Engineering</div>'
    + capBarHtml(used.engineering, budget.engineering)
    + capStatsHtml(used.engineering, budget.engineering)
    + '</div>'
    + '<div style="display:grid;grid-template-columns:90px 1fr 80px;gap:14px;align-items:center;padding:8px 0;border-top:0.5px solid var(--border)">'
    + '<div style="font-size:12px;color:var(--muted)">Product</div>'
    + capBarHtml(used.product, budget.product)
    + capStatsHtml(used.product, budget.product)
    + '</div>'
    + '</div>'
    + '<div style="padding:0 20px 16px">'
    + '<div style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.4px;color:var(--faint);padding:12px 0 8px;border-top:0.5px solid var(--border)"></div>'
    + initTable
    + '</div>'
    + '</div>';
}

function capScorecardHtml(label, used, budget) {
  var pct = budget > 0 ? Math.round(used / budget * 100) : 0;
  var remaining = budget - used;
  var over = remaining < 0;
  return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:14px">'
    + '<div style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">' + label + '</div>'
    + '<div style="display:flex;align-items:baseline;gap:8px"><span style="font-size:24px;font-weight:500;color:var(--text)">' + Math.round(used) + '</span><span style="font-size:13px;color:var(--muted)">/ ' + Math.round(budget) + ' days</span></div>'
    + '<div style="font-size:12px;color:' + (over ? '#A32D2D' : 'var(--faint)') + ';margin-top:4px">' + pct + '% utilized' + (over ? ' \u00b7 ' + Math.abs(Math.round(remaining)) + 'd over' : ' \u00b7 ' + Math.round(remaining) + 'd remaining') + '</div>'
    + '</div>';
}

var _capQ = null;

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
    blocks = '<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:48px 32px;text-align:center">'
      + '<div style="font-size:13px;color:var(--faint)">No initiatives for ' + label + '</div></div>';
  }

  return '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px">'
    + '<div><div class="ptitle">Team Capacity</div><div class="psub" style="margin-bottom:0">Budget utilization by team and discipline \u2014 Design, Engineering, Product</div></div>'
    + '</div>'
    + buildQFilter('cap','switchCapQuarter')
    + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:20px">'
    + capScorecardHtml('Total design', totD, budD)
    + capScorecardHtml('Total engineering', totE, budE)
    + capScorecardHtml('Total product', totP, budP)
    + '</div>'
    + blocks
    + '<div style="display:flex;gap:16px;padding:4px 0">'
    + '<span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--muted)"><span style="width:8px;height:8px;border-radius:2px;background:#3B6D11"></span>Under 80%</span>'
    + '<span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--muted)"><span style="width:8px;height:8px;border-radius:2px;background:#BA7517"></span>80\u201395%</span>'
    + '<span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--muted)"><span style="width:8px;height:8px;border-radius:2px;background:#A32D2D"></span>Over 95%</span>'
    + '</div>';
}

function switchCapQuarter(q) {
  var content = document.getElementById('content');
  if (content) content.innerHTML = capRender(q);
  setQAct('cap', q);
}

function renderTeamCapacity() {
  return capRender(currentQ());
}
