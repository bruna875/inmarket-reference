// calculator.js — Objective Risk Calculator

var CALC_SECTIONS = [
  {
    id: 'legal',
    label: 'Legal',
    options: [
      'Select item...',
      'Litigation & Court Costs (Local)',
      'Litigation & Court Costs (International)',
      'Attorneys & Legal Fees (Local)',
      'Attorneys & Legal Fees (International)',
      'Vicarious Liability Risks',
      'Settlement payments',
      'Injunctions & restraining orders',
      'Arbitration costs',
      'Others'
    ]
  },
  {
    id: 'compliance',
    label: 'Compliance',
    options: [
      'Select item...',
      'Regulatory fines & penalties',
      'Regulatory Waterfall Effect',
      'Compliance Audit Costs (Internal)',
      'Compliance Independent Investigation Costs',
      'Certification Risks',
      'Data breach notification costs',
      'Third-party compliance review',
      'Record-keeping violations',
      'Others'
    ]
  },
  {
    id: 'reputational',
    label: 'Reputational',
    options: [
      'Select item...',
      'Brand damage assessment',
      'Customer churn & revenue loss',
      'Executive reputation management',
      'Negative press & analyst impact',
      'Others'
    ]
  },
  {
    id: 'corporate',
    label: 'Corporate Assets',
    options: [
      'Select item...',
      'System downtime & productivity loss',
      'Asset Depreciation',
      'Workforce & talent loss',
      'Others'
    ]
  }
];

var _calcRows = {};

function calcInitRows() {
  CALC_SECTIONS.forEach(function(sec) {
    if (!_calcRows[sec.id]) _calcRows[sec.id] = [{item: '', value: ''}];
  });
}

function calcSectionTotal(secId) {
  return (_calcRows[secId] || []).reduce(function(sum, row) {
    var v = parseFloat(String(row.value).replace(/[^0-9.-]/g, ''));
    return sum + (isNaN(v) ? 0 : v);
  }, 0);
}

function calcGrandTotal() {
  return CALC_SECTIONS.reduce(function(sum, sec) {
    return sum + calcSectionTotal(sec.id);
  }, 0);
}

function calcFmt(n) {
  if (!n) return '$0';
  return '$' + Math.round(n).toLocaleString('en-US');
}

function calcSave() {
  try { localStorage.setItem('vgp_calc_rows', JSON.stringify(_calcRows)); } catch(e) {}
}

function calcLoad() {
  try {
    var s = localStorage.getItem('vgp_calc_rows');
    if (s) {
      var parsed = JSON.parse(s);
      // only load sections that still exist
      CALC_SECTIONS.forEach(function(sec) {
        if (parsed[sec.id]) _calcRows[sec.id] = parsed[sec.id];
      });
    }
  } catch(e) {}
}

function renderCalcRows(secId) {
  var sec = CALC_SECTIONS.filter(function(s) { return s.id === secId; })[0];
  var rows = _calcRows[secId] || [];
  return rows.map(function(row, idx) {
    var opts = sec.options.map(function(opt) {
      return '<option value="' + opt + '"' + (row.item === opt ? ' selected' : '') + '>' + opt + '</option>';
    }).join('');
    return '<div class="calc-row">'
      + '<select class="calc-row-select" data-sec="' + secId + '" data-idx="' + idx + '" data-field="item">' + opts + '</select>'
      + '<div class="calc-row-val-wrap">'
      + '<span class="calc-row-dollar">$</span>'
      + '<input class="calc-row-input" type="number" min="0" step="1" placeholder="0"'
      + ' value="' + (row.value || '') + '"'
      + ' data-sec="' + secId + '" data-idx="' + idx + '" data-field="value"/>'
      + '</div>'
      + (rows.length > 1
        ? '<button class="calc-row-remove" data-action="remove" data-sec="' + secId + '" data-idx="' + idx + '" title="Remove row">'
          + '<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
          + '</button>'
        : '<div class="calc-row-spacer"></div>')
      + '</div>';
  }).join('');
}

function renderCalcSection(sec) {
  var total = calcSectionTotal(sec.id);
  return '<div class="calc-sec-block">'
    + '<div class="calc-sec-header"><span class="calc-sec-label">' + sec.label + '</span></div>'
    + '<div class="calc-sec-rows" id="calc-rows-' + sec.id + '">' + renderCalcRows(sec.id) + '</div>'
    + '<div class="calc-sec-footer">'
    + '<button class="calc-add-btn" data-action="add" data-sec="' + sec.id + '">+ Add item</button>'
    + '<div class="calc-sec-total">Subtotal <span class="calc-subtotal-val" id="calc-subtotal-' + sec.id + '">' + calcFmt(total) + '</span></div>'
    + '</div>'
    + '</div>';
}

function calcUpdateTotals(secId) {
  var el = document.getElementById('calc-subtotal-' + secId);
  if (el) el.textContent = calcFmt(calcSectionTotal(secId));
  var grand = document.getElementById('calc-grand-total');
  if (grand) grand.textContent = calcFmt(calcGrandTotal());
  calcSave();
}

function calcAddRow(secId) {
  _calcRows[secId].push({item: '', value: ''});
  var el = document.getElementById('calc-rows-' + secId);
  if (el) el.innerHTML = renderCalcRows(secId);
  calcUpdateTotals(secId);
}

function calcRemoveRow(secId, idx) {
  _calcRows[secId].splice(idx, 1);
  var el = document.getElementById('calc-rows-' + secId);
  if (el) el.innerHTML = renderCalcRows(secId);
  calcUpdateTotals(secId);
}

function renderCalculatorPanel() {
  calcLoad();
  calcInitRows();
  return '<div class="dd-calc-panel">'
    + '<div class="dd-calc-panel-header">'
    + '<div style="display:flex;align-items:center;gap:8px;">'
    + '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h2M9 5h2M5 8h2M9 8h2M5 11h2M9 11h2"/></svg>'
    + '<span class="dd-calc-panel-title">Objective Risk Calculator</span>'
    + '</div>'
    + '</div>'
    + '<div class="dd-calc-panel-body">'
    + '<p class="dd-calc-desc">Score your exposure based on documented incidents, patterns, and compliance gaps.</p>'
    + CALC_SECTIONS.map(renderCalcSection).join('')
    + '<div class="calc-grand-row">'
    + '<span class="calc-grand-label">Total Exposure</span>'
    + '<span class="calc-grand-val" id="calc-grand-total">' + calcFmt(calcGrandTotal()) + '</span>'
    + '</div>'
    + '</div>'
    + '</div>';
}

// ── Event listeners ────────────────────────────────────────────────────────────
document.addEventListener('click', function(e) {
  var addBtn = e.target.closest('[data-action="add"][data-sec]');
  if (addBtn) { calcAddRow(addBtn.dataset.sec); return; }

  var remBtn = e.target.closest('[data-action="remove"][data-sec]');
  if (remBtn) { calcRemoveRow(remBtn.dataset.sec, parseInt(remBtn.dataset.idx)); return; }
});

document.addEventListener('input', function(e) {
  var inp = e.target.closest('input[data-sec][data-field="value"]');
  if (!inp) return;
  var sec = inp.dataset.sec, idx = parseInt(inp.dataset.idx);
  if (_calcRows[sec] && _calcRows[sec][idx] !== undefined) {
    _calcRows[sec][idx].value = inp.value;
    calcUpdateTotals(sec);
  }
});

document.addEventListener('change', function(e) {
  var sel = e.target.closest('select[data-sec][data-field="item"]');
  if (!sel) return;
  var sec = sel.dataset.sec, idx = parseInt(sel.dataset.idx);
  if (_calcRows[sec] && _calcRows[sec][idx] !== undefined) {
    _calcRows[sec][idx].item = sel.value;
    calcSave();
  }
});

// Legacy stub
function openCalculatorModal() {}
