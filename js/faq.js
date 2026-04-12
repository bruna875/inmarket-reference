// faq.js — Data Directory page

var FAQ_CATEGORIES = [
  {id: 'compliance',   label: 'Compliance',             fullLabel: 'Compliance'},
  {id: 'managerial',   label: 'Managerial Malice',      fullLabel: 'Managerial Malice'},
  {id: 'character',    label: 'Character Assassination', fullLabel: 'Character Assassination'},
  {id: 'hostile',      label: 'Hostile Work Env.',       fullLabel: 'Hostile Work Environment'},
  {id: 'health',       label: 'Health',                 fullLabel: 'Health'},
  {id: 'stereotyped',  label: 'Stereotypical Identifiers', fullLabel: 'Stereotypical Identifiers'}
];

var FAQ_ITEMS = [
  {
    cat: 'compliance',
    q: 'Has any unauthorized access to personal data occurred \u2014 potentially violating the principles of fairness and transparency and lacking a lawful basis for processing \u2014 during the relationship between the data subject and the data controller?',
    a: 'Under investigation. However, it is reasonably hypothesized that unauthorized access to devices and private Slack communications may have occurred, alongside patterns of undisclosed behavioral monitoring.',
    meta: {
      period: 'Continued',
      systems: ['Slack', 'Email', 'JumpCloud', 'Google Suite', 'Internal Databases'],
      keywords: [],
      details: null
    }
  },
  {
    cat: 'compliance',
    q: 'Has any unauthorized access to personal data occurred \u2014 potentially violating the principles of fairness and transparency and lacking a lawful basis for processing \u2014 after the relationship between the data subject and the data controller had concluded?',
    a: 'Under investigation. However, it is reasonably hypothesized that unauthorized access to Email and private Slack communications may have occurred, alongside patterns of undisclosed behavioral monitoring.',
    meta: {
      period: 'Continued',
      systems: ['Slack', 'Email', 'JumpCloud', 'Google Suite', 'Internal Databases'],
      keywords: [],
      details: null
    }
  },
  {
    cat: 'compliance',
    q: 'Were the data subject\u2019s personal data processed in a non-compliant manner, departing from the principles of fairness and transparency, while their relationship with the data controller was still ongoing?',
    a: 'Under investigation. However, it is reasonably hypothesized that certain personal data were processed and utilized beyond the scope of the declared purposes (specifically, as criteria for professional evaluation). It is also suspected that those data contained inaccuracies, in violation of the principle of accuracy, and may require formal rectification.',
    meta: {
      period: 'Continued',
      systems: ['Internal Reports'],
      keywords: [],
      details: null
    }
  },
  {
    cat: 'compliance',
    q: 'Were the data subject\u2019s personal data processed in a non-compliant manner, departing from the principles of fairness and transparency and without any legitimate legal basis, after the relationship with the data controller had ended, and/or has a data breach occurred?',
    a: 'Under investigation. However, it is reasonably hypothesized that certain personal data were processed and utilized beyond the scope of the declared purposes (specifically, social engineering activities) following a data breach.',
    meta: {
      period: 'January 2026; February 2026',
      systems: ['Email', 'External Systems'],
      keywords: ['Kudos', 'LinkedIn'],
      details: 'Internal Interviews; External Providers'
    }
  },
  {
    cat: 'compliance',
    q: 'Have any post-relationship retaliation attempts by internal managers occurred? If so, what measures were undertaken by the company?',
    a: 'Under investigation. However, the Company acted in accordance with established protocols once the hypothesis was reported, providing reassurances to the reporter and initiating the necessary internal investigations to verify the relevant accountability.',
    meta: {
      period: 'February 2026',
      systems: ['Internal Systems', 'External Systems'],
      keywords: ['Kudos', 'LinkedIn'],
      details: 'Internal Interviews; External Providers'
    }
  },
  {
    cat: 'managerial',
    q: 'Have there been instances of strategic obstruction involving the \u201cmoving the goalposts\u201d phenomenon, specifically aimed at hindering the data subject\u2019s professional advancement?',
    a: 'Under verification. Preliminary evidence suggests a pattern of strategic obstruction characterized by the systematic cancellation of alignment meetings and a consistent lack of responsiveness to formal inquiries regarding strategic direction and objective success criteria. Specific documented instances include:<br><br>'
      + '<b>Q4 Prioritization:</b> Formal requests via email for defined quarterly objectives remained unaddressed, preventing the establishment of measurable performance benchmarks.<br><br>'
      + '<b>Project \u201cSpeed Demon\u201d:</b> Detailed inquiries submitted on December 15th regarding project priorities received no feedback, impeding operational delivery.<br><br>'
      + '<b>Strategic Alignment:</b> The 1:1 document \u201cMultiplayer Notes for ****\u2019s Vision,\u201d developed to ensure cross-functional alignment with the Product team, was systematically disregarded; audit trails and file timestamps indicate a lack of contribution to the weekly 1:1 synchronization documents (e.g., \u201cBruna / Todd\u201d), suggesting a failure in collaborative approach.<br><br>'
      + 'These omissions are hypothesized to effectively obstruct the data subject\u2019s ability to meet organizational objectives and performance expectations.',
    meta: {
      period: 'October 2025; November 2025; December 2025',
      systems: ['Email', 'Google Workspace (Shared Documents)', 'Slack'],
      keywords: ['\u201csuccess\u201d', '\u201cpriority(es)\u201d', '\u201ccriteria\u201d', '\u201croadmap\u201d', '\u201cQ4\u201d', '\u201cspeed demon\u201d', '\u201cdomino\u2019s pizza\u201d', '\u201caudience\u201d'],
      details: 'Objective success criteria were not shared by the direct manager, who continued redirecting to another manager. Command chain appeared broken.'
    }
  },
  {
    cat: 'managerial',
    q: 'Were there attempts to induce a solid candidate for a Product Leadership role into technical errors during a role evaluation process, with the potential intent of utilizing incorrect responses to negatively impact the assessments?',
    a: 'Under verification. Records indicate suggestive and manipulative \u201cguidance\u201d \u2014 such as encouraging via email the use of \u201cGeolink\u201d in response to Unified Platform inquiries \u2014 which appears designed to elicit incorrect technical responses, to later use such induced (potential) errors as a basis for performance critique.',
    meta: {
      period: 'October 2025; November 2025',
      systems: ['Email'],
      keywords: ['\u201cgeolink\u201d', '\u201cunified platform\u201d', '\u201cinmarket platform\u201d'],
      details: 'The direct manager of the role candidate holds a copy of this exchange, forwarded between October 2025 and November 2025.'
    }
  },
];

var _faqActiveCat = 'all';
var _faqOpenIdx   = -1;
var _faqView      = 'category'; // 'category' | 'timeline'

// ── Timeline buckets ──────────────────────────────────────────────────────────
var TIMELINE_BUCKETS = [
  { id: 'alltime', label: 'All Time / Ongoing' },
  { id: 'q1_25',  label: 'Q1 2025' },
  { id: 'q2_25',  label: 'Q2 2025' },
  { id: 'q3_25',  label: 'Q3 2025' },
  { id: 'q4_25',  label: 'Q4 2025' },
  { id: 'q1_26',  label: 'Q1 2026' },
  { id: 'q2_26',  label: 'Q2 2026' }
];

var _TL_MONTH_MAP = {
  'january 2025':'q1_25','february 2025':'q1_25','march 2025':'q1_25',
  'april 2025':'q2_25','may 2025':'q2_25','june 2025':'q2_25',
  'july 2025':'q3_25','august 2025':'q3_25','september 2025':'q3_25',
  'october 2025':'q4_25','november 2025':'q4_25','december 2025':'q4_25',
  'january 2026':'q1_26','february 2026':'q1_26','march 2026':'q1_26',
  'april 2026':'q2_26','may 2026':'q2_26','june 2026':'q2_26'
};

function faqPeriodToBuckets(period) {
  if (!period) return [];
  var p = period.toLowerCase();
  if (/continued/i.test(p)) return ['alltime'];
  var found = {};
  Object.keys(_TL_MONTH_MAP).forEach(function(m) {
    if (p.indexOf(m) !== -1) found[_TL_MONTH_MAP[m]] = true;
  });
  return Object.keys(found);
}

function faqCatLabel(catId) {
  var c = FAQ_CATEGORIES.filter(function(x) { return x.id === catId; })[0];
  return c ? (c.fullLabel || c.label) : catId;
}

function faqFilterItems() {
  if (_faqActiveCat === 'all') return FAQ_ITEMS;
  return FAQ_ITEMS.filter(function(i) { return i.cat === _faqActiveCat; });
}

function faqRenderTabs() {
  var calcSvg = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h2M9 5h2M5 8h2M9 8h2M5 11h2M9 11h2"/></svg>';
  var actCalc = _faqActiveCat === 'calc';
  var calcChip = '<div class="dd-tab-divider"></div>'
    + '<button class="dd-tab' + (actCalc ? ' act' : '') + '" data-faqcat="calc">'
    + calcSvg + 'Risk Calculator'
    + '</button>';

  if (_faqView === 'timeline') {
    // Quarter chips — only show buckets that have at least one item
    var populated = TIMELINE_BUCKETS.filter(function(b) {
      return FAQ_ITEMS.some(function(item) {
        return item.meta && faqPeriodToBuckets(item.meta.period).indexOf(b.id) !== -1;
      });
    });
    var qChips = [{id:'all', label:'All'}].concat(populated.map(function(b) {
      return {id: b.id, label: b.label};
    }));
    var chips = qChips.map(function(c) {
      var act = c.id === _faqActiveCat;
      return '<button class="dd-tab' + (act ? ' act' : '') + '" data-faqcat="' + c.id + '">' + c.label + '</button>';
    }).join('');
    return '<div class="dd-chips">' + chips + calcChip + '</div>';
  }

  // Category chips
  var tabs = [{id:'all', label:'All'}].concat(FAQ_CATEGORIES);
  var chips = tabs.map(function(c) {
    var act = c.id === _faqActiveCat;
    return '<button class="dd-tab' + (act ? ' act' : '') + '" data-faqcat="' + c.id + '">' + c.label + '</button>';
  }).join('');
  return '<div class="dd-chips">' + chips + calcChip + '</div>';
}

var ICO_CLOCK  = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M8 5v3.5l2 1.5"/></svg>';
var ICO_SERVER = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="5" rx="1.5"/><rect x="2" y="9" width="12" height="5" rx="1.5"/><circle cx="12.5" cy="4.5" r="1" fill="currentColor" stroke="none"/><circle cx="12.5" cy="11.5" r="1" fill="currentColor" stroke="none"/></svg>';
var ICO_TAG    = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2h5.5l6.5 6.5-5.5 5.5L2 7.5V2z"/><circle cx="5" cy="5" r="1" fill="currentColor" stroke="none"/></svg>';
var ICO_SEARCH = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5l3 3"/></svg>';

function faqRenderMeta(meta) {
  if (!meta) return '';
  var kwHtml = meta.keywords && meta.keywords.length
    ? meta.keywords.map(function(k) { return '<span class="faq-kw-chip">' + k + '</span>'; }).join('')
    : '<span class="faq-meta-dash">\u2014</span>';

  return '<div class="faq-meta">'
    + '<div class="faq-meta-row">'
    +   '<span class="faq-meta-icon">' + ICO_CLOCK + '</span>'
    +   '<span class="faq-meta-label">Period</span>'
    +   '<span class="faq-meta-value">' + (meta.period || '\u2014') + '</span>'
    + '</div>'
    + '<div class="faq-meta-row">'
    +   '<span class="faq-meta-icon">' + ICO_SERVER + '</span>'
    +   '<span class="faq-meta-label">Systems</span>'
    +   '<span class="faq-meta-value">' + (meta.systems && meta.systems.length ? meta.systems.join(', ') : '\u2014') + '</span>'
    + '</div>'
    + '<div class="faq-meta-row faq-meta-row--chips">'
    +   '<span class="faq-meta-icon">' + ICO_TAG + '</span>'
    +   '<span class="faq-meta-label">Keywords</span>'
    +   '<span class="faq-kw-wrap">' + kwHtml + '</span>'
    + '</div>'
    + '<div class="faq-meta-row">'
    +   '<span class="faq-meta-icon">' + ICO_SEARCH + '</span>'
    +   '<span class="faq-meta-label">Additional Details</span>'
    +   '<span class="faq-meta-value">' + (meta.details || '\u2014') + '</span>'
    + '</div>'
    + '</div>';
}

function faqRenderItem(item, showCatBadge) {
  var globalIdx = FAQ_ITEMS.indexOf(item);
  var isOpen    = globalIdx === _faqOpenIdx;
  var catBadge  = showCatBadge
    ? '<span class="dd-cat-badge">' + faqCatLabel(item.cat) + '</span>'
    : '';
  return '<div class="faq-item' + (isOpen ? ' open' : '') + '">'
    + '<div class="faq-question' + (isOpen ? ' open' : '') + '" data-faqtoggle="' + globalIdx + '">'
    + '<div class="faq-question-inner">'
    + '<span class="faq-question-text">' + item.q + '</span>'
    + catBadge
    + '</div>'
    + '<svg class="faq-chevron' + (isOpen ? ' open' : '') + '" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + '</div>'
    + (isOpen ? '<div class="faq-answer">' + item.a + faqRenderMeta(item.meta) + '</div>' : '')
    + '</div>';
}

function faqRenderAccordion() {
  var items = faqFilterItems();
  if (items.length === 0) return '<div class="faq-empty">No items in this category.</div>';

  // Group by category, preserving FAQ_CATEGORIES order
  var cats = _faqActiveCat === 'all'
    ? FAQ_CATEGORIES.map(function(c) { return c.id; })
    : [_faqActiveCat];

  var html = '';
  cats.forEach(function(catId) {
    var group = items.filter(function(i) { return i.cat === catId; });
    if (!group.length) return;
    var label = faqCatLabel(catId);
    html += '<div class="faq-tl-section">'
      + '<div class="faq-tl-header">'
      + '<span class="faq-tl-label">' + label + '</span>'
      + '<span class="faq-tl-count">(' + group.length + ')</span>'
      + '</div>'
      + group.map(function(item) { return faqRenderItem(item, false); }).join('')
      + '</div>';
  });
  return html || '<div class="faq-empty">No items in this category.</div>';
}

function faqRenderTimeline() {
  // In timeline view _faqActiveCat is either 'all' or a bucket id
  var activeBucket = _faqActiveCat; // 'all' | 'alltime' | 'q1_25' | etc.

  var bucketsToRender = activeBucket === 'all'
    ? TIMELINE_BUCKETS
    : TIMELINE_BUCKETS.filter(function(b) { return b.id === activeBucket; });

  var html = '';
  bucketsToRender.forEach(function(bucket) {
    var items = FAQ_ITEMS.filter(function(item) {
      return item.meta && faqPeriodToBuckets(item.meta.period).indexOf(bucket.id) !== -1;
    });
    if (!items.length) return;
    html += '<div class="faq-tl-section">'
      + '<div class="faq-tl-header">'
      + '<span class="faq-tl-label">' + bucket.label + '</span>'
      + '<span class="faq-tl-count">(' + items.length + ')</span>'
      + '</div>'
      + items.map(function(item) { return faqRenderItem(item, true); }).join('')
      + '</div>';
  });
  return html || '<div class="faq-empty">No items for this period.</div>';
}

function faqRefreshTabs() {
  var t = document.getElementById('dd-tabs');
  if (t) t.innerHTML = faqRenderTabs();
}

function faqRefreshPanel() {
  var p = document.getElementById('faq-panel');
  if (!p) return;
  p.innerHTML = _faqView === 'timeline' ? faqRenderTimeline() : faqRenderAccordion();
}

function faqRefreshToggle() {
  var t = document.getElementById('dd-view-toggle');
  if (!t) return;
  t.querySelectorAll('[data-faqview]').forEach(function(btn) {
    btn.classList.toggle('act', btn.dataset.faqview === _faqView);
  });
}

function faqRefresh() {
  var isCalc  = _faqActiveCat === 'calc';
  var calcPanel = document.getElementById('dd-calc-panel');
  var divider   = document.querySelector('.dd-section-divider');
  var faqWrap   = document.querySelector('.faq-panel-wrap');
  if (calcPanel) calcPanel.style.display = isCalc ? 'block' : 'none';
  if (divider)   divider.style.display   = isCalc ? 'none' : '';
  if (faqWrap)   faqWrap.style.display   = isCalc ? 'none' : '';
  faqRefreshTabs();
  faqRefreshToggle();
  if (!isCalc) faqRefreshPanel();
}

function faqOpenRadarModal() {
  var existing = document.getElementById('radar-modal-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'radar-modal-overlay';
  overlay.className = 'modal-overlay';

  overlay.innerHTML =
    '<div class="modal-card" style="max-width:440px;">'
    + '<div class="modal-header">'
    + '<div style="display:flex;align-items:center;gap:8px;">'
    // Flag icon = segnalazione
    + '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14V2"/><path d="M3 2h9l-2.5 3.5L12 9H3"/></svg>'
    + '<span class="modal-title">Any Data out of radar?</span>'
    + '</div>'
    + '<button class="modal-close" id="radarModalClose">'
    + '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
    + '</button>'
    + '</div>'
    + '<div class="modal-body">'
    + '<p class="modal-desc">For sure some other data sono sfuggiti al nostro radar. Scrivici e li aggiungeremo alla directory il prima possibile.</p>'
    + '<a href="mailto:bruna@saykudos.co" class="modal-email-btn">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M2 4l6 5 6-5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + 'Send Email'
    + '</a>'
    + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
  document.getElementById('radarModalClose').addEventListener('click', function() { overlay.remove(); });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
}


function faqRenderViewToggle() {
  return '<div class="tabnav" id="dd-view-toggle" style="margin-bottom:14px;">'
    + '<button class="tabitem' + (_faqView === 'category' ? ' act' : '') + '" data-faqview="category">By Category</button>'
    + '<button class="tabitem' + (_faqView === 'timeline' ? ' act' : '') + '" data-faqview="timeline">By Timeline</button>'
    + '</div>';
}

function renderFaqDsar() {
  _faqActiveCat = 'all';
  _faqOpenIdx   = -1;
  _faqView      = 'category';

  return '<div class="page-header">'
    + '<div><div class="ptitle">Data Directory</div><div class="psub psub-flush">FAQ and Data Subject Access Request reference</div></div>'
    + '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">'

    // ── Secondary CTA ────────────────────────────────────────
    + '<button class="faq-radar-btn" id="radarBtn">'
    // Flag / pennant icon
    + '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14V2"/><path d="M3 2h9l-2.5 3.5L12 9H3"/></svg>'
    + 'Any Data out of radar?'
    + '</button>'

    // ── Export Board Report ──────────────────────────────────
    + '<button class="faq-dsar-btn" id="dsarReportBtn">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 2v4h4" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 9h4M6 11.5h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
    + 'Export Board Report'
    + '</button>'

    + '</div>'
    + '</div>'

    // ── Quote ────────────────────────────────────────────────
    + '<blockquote class="res-quote">'
    + '\u201cFuror fit laesa saepius patientia.\u201d'
    + '<footer>\u2014 Publilio Siro, <em>Sententiae</em></footer>'
    + '</blockquote>'

    // ── View toggle ──────────────────────────────────────────
    + faqRenderViewToggle()

    // ── Tabs: chips + calc button all in one wrapper ─────────
    + '<div class="dd-tabs" id="dd-tabs">' + faqRenderTabs() + '</div>'

    // ── Inline Risk Calculator — directly below chips ────────
    + '<div id="dd-calc-panel" style="display:none;">' + renderCalculatorPanel() + '</div>'

    + '<div class="dd-section-divider"></div>'

    // ── Accordion ────────────────────────────────────────────
    + '<div class="faq-panel-wrap">'
    + '<div id="faq-panel">' + faqRenderAccordion() + '</div>'
    + '</div>';
}

document.addEventListener('click', function(e) {

  // Export Board Report
  if (e.target.closest('#dsarReportBtn')) {
    exportBoardReport();
    return;
  }

  // Radar modal
  if (e.target.closest('#radarBtn')) {
    faqOpenRadarModal();
    return;
  }

  // View toggle (By Category / By Timeline)
  var viewBtn = e.target.closest('[data-faqview]');
  if (viewBtn) {
    _faqView      = viewBtn.dataset.faqview;
    _faqActiveCat = 'all';
    _faqOpenIdx   = -1;
    faqRefresh();
    return;
  }

  // Category tabs
  var cat = e.target.closest('[data-faqcat]');
  if (cat) {
    _faqActiveCat = cat.dataset.faqcat;
    _faqOpenIdx   = -1;
    faqRefresh();
    return;
  }

  // Accordion toggle (works in both views)
  var tog = e.target.closest('[data-faqtoggle]');
  if (tog) {
    var idx = parseInt(tog.dataset.faqtoggle);
    _faqOpenIdx = _faqOpenIdx === idx ? -1 : idx;
    faqRefreshPanel();
    return;
  }
});
