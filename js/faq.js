// faq.js — Data Directory page

var FAQ_CATEGORIES = [
  {id: 'privacy',      label: 'Privacy',                fullLabel: 'Privacy & Data Protection'},
  {id: 'managerial',   label: 'Managerial Malice',      fullLabel: 'Managerial Malice'},
  {id: 'character',    label: 'Character Assassination', fullLabel: 'Character Assassination'},
  {id: 'hostile',      label: 'Hostile Work Env.',       fullLabel: 'Hostile Work Environment'},
  {id: 'health',       label: 'Health',                 fullLabel: 'Health'},
  {id: 'stereotyped',  label: 'Stereotypical Identifiers', fullLabel: 'Stereotypical Identifiers'}
];

var FAQ_ITEMS = [
  {cat: 'privacy',     q: 'What personal data does Very Good Peeps collect?',                    a: 'Very Good Peeps collects device identifiers, location data, and behavioral signals to power its measurement and attribution products. All data collection is disclosed in the company\u2019s privacy policy and complies with applicable regulations.'},
  {cat: 'privacy',     q: 'How is personal data processed and stored?',                          a: 'Personal data is processed in secure cloud environments with encryption at rest and in transit. Data is stored in US-based data centers with SOC 2 Type II compliance and access controls enforced via role-based permissions.'},
  {cat: 'managerial',  q: 'What is the legal basis for processing personal data?',               a: 'Processing is based on legitimate interest for B2B measurement services, and on consent where required by local regulation (e.g. GDPR Article 6). Consent mechanisms are managed through certified CMP partners.'},
  {cat: 'managerial',  q: 'How can an individual submit a Data Subject Access Request (DSAR)?',  a: 'Individuals can submit a DSAR by emailing privacy@verygoodpeeps.co or through the online request form on the company\u2019s privacy page. Requests are acknowledged within 48 hours and fulfilled within the statutory 30-day window.'},
  {cat: 'character',   q: 'What information is provided in response to a DSAR?',                 a: 'The response includes a summary of personal data held, the purposes of processing, categories of recipients, retention periods, and the individual\u2019s rights under applicable law. Data is delivered in a machine-readable format upon request.'},
  {cat: 'character',   q: 'Can a DSAR be submitted on behalf of another person?',                a: 'Yes, authorized agents may submit DSARs on behalf of data subjects. Proof of authorization (such as a power of attorney or signed declaration) is required before the request can be processed.'},
  {cat: 'hostile',     q: 'How long is personal data retained?',                                 a: 'Retention periods vary by data type: device identifiers are retained for up to 13 months, aggregated measurement data for up to 3 years, and contractual records for 7 years. Data is purged automatically upon expiration.'},
  {cat: 'hostile',     q: 'Can a user request early deletion of their data?',                    a: 'Yes. Deletion requests are processed under the same DSAR workflow. Upon verification, personal data is deleted or anonymized within 30 days. Certain data may be retained longer if required by law.'},
  {cat: 'health',      q: 'How is data disposed of at end of retention?',                        a: 'Data is permanently deleted through cryptographic erasure for encrypted stores and secure overwrite for unencrypted systems. Deletion is logged and auditable. Third-party sub-processors are contractually required to follow the same disposal standards.'},
  {cat: 'health',      q: 'Which privacy regulations does Very Good Peeps comply with?',         a: 'Very Good Peeps maintains compliance with GDPR, CCPA/CPRA, VCDPA, CPA, and other US state privacy laws. The company also adheres to NAI and DAA self-regulatory principles for digital advertising.'},
  {cat: 'stereotyped', q: 'Does Very Good Peeps conduct Data Protection Impact Assessments?',    a: 'Yes. DPIAs are conducted for all new products and significant changes to existing data processing activities. Results are reviewed by the privacy team and, where required, shared with the relevant supervisory authority.'},
  {cat: 'stereotyped', q: 'How are data breaches handled?',                                      a: 'Very Good Peeps maintains an incident response plan with defined escalation paths. Breaches are assessed within 24 hours, affected parties and supervisory authorities are notified within 72 hours where required, and remediation actions are documented and reviewed.'}
];

var _faqActiveCat     = 'all';
var _faqOpenIdx       = -1;
var _calcPanelOpen    = false;
var _dsarDropdownOpen = false;

function faqCatLabel(catId) {
  var c = FAQ_CATEGORIES.filter(function(x) { return x.id === catId; })[0];
  return c ? (c.fullLabel || c.label) : catId;
}

function faqFilterItems() {
  if (_faqActiveCat === 'all') return FAQ_ITEMS;
  return FAQ_ITEMS.filter(function(i) { return i.cat === _faqActiveCat; });
}

function faqRenderTabs() {
  var tabs = [{id:'all', label:'All'}].concat(FAQ_CATEGORIES);
  var chips = tabs.map(function(c) {
    var act = c.id === _faqActiveCat;
    return '<button class="dd-tab' + (act ? ' act' : '') + '" data-faqcat="' + c.id + '">' + c.label + '</button>';
  }).join('');

  // Calc button lives inside the same chips wrapper
  var calcBtn = '<div class="dd-tab-divider"></div>'
    + '<button class="dd-calc-btn' + (_calcPanelOpen ? ' act' : '') + '" id="openCalcBtn">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h2M9 5h2M5 8h2M9 8h2M5 11h2M9 11h2"/></svg>'
    + 'Risk Calculator'
    + '</button>';

  return '<div class="dd-chips">' + chips + calcBtn + '</div>';
}

function faqRenderAccordion() {
  var items = faqFilterItems();
  if (items.length === 0) return '<div class="faq-empty">No items in this category.</div>';
  return items.map(function(item) {
    var globalIdx = FAQ_ITEMS.indexOf(item);
    var isOpen    = globalIdx === _faqOpenIdx;
    var catBadge  = _faqActiveCat === 'all'
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
      + (isOpen ? '<div class="faq-answer">' + item.a + '</div>' : '')
      + '</div>';
  }).join('');
}

function faqRefreshTabs() {
  var t = document.getElementById('dd-tabs');
  if (t) t.innerHTML = faqRenderTabs();
}

function faqRefreshPanel() {
  var p = document.getElementById('faq-panel');
  if (p) p.innerHTML = faqRenderAccordion();
}

function faqRefresh() {
  faqRefreshTabs();
  faqRefreshPanel();
}

function faqToggleCalcPanel() {
  _calcPanelOpen = !_calcPanelOpen;
  var panel = document.getElementById('dd-calc-panel');
  if (panel) {
    panel.style.display = _calcPanelOpen ? 'block' : 'none';
    if (_calcPanelOpen) {
      setTimeout(function() {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
    }
  }
  faqRefreshTabs();
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

function faqToggleDsarDropdown() {
  _dsarDropdownOpen = !_dsarDropdownOpen;
  var menu = document.getElementById('dsarDropdownMenu');
  if (menu) menu.style.display = _dsarDropdownOpen ? 'block' : 'none';
  var btn = document.getElementById('dsarReportBtn');
  if (btn) btn.classList.toggle('open', _dsarDropdownOpen);
}

function faqCloseDsarDropdown() {
  _dsarDropdownOpen = false;
  var menu = document.getElementById('dsarDropdownMenu');
  if (menu) menu.style.display = 'none';
  var btn = document.getElementById('dsarReportBtn');
  if (btn) btn.classList.remove('open');
}

function renderFaqDsar() {
  _faqActiveCat     = 'all';
  _faqOpenIdx       = -1;
  _calcPanelOpen    = false;
  _dsarDropdownOpen = false;

  return '<div class="page-header">'
    + '<div><div class="ptitle">Data Directory</div><div class="psub psub-flush">FAQ and Data Subject Access Request reference</div></div>'
    + '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">'

    // ── Secondary CTA ────────────────────────────────────────
    + '<button class="faq-radar-btn" id="radarBtn">'
    // Flag / pennant icon
    + '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14V2"/><path d="M3 2h9l-2.5 3.5L12 9H3"/></svg>'
    + 'Any Data out of radar?'
    + '</button>'

    // ── Board Report dropdown ────────────────────────────────
    + '<div class="dd-dropdown-wrap" id="dsarDropdownWrap">'
    + '<button class="faq-dsar-btn" id="dsarReportBtn">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 2v4h4" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 9h4M6 11.5h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
    + 'Board Report'
    + '<svg class="dd-dropdown-chevron" width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + '</button>'
    + '<div class="dd-dropdown-menu" id="dsarDropdownMenu" style="display:none;">'
    + '<button class="dd-dropdown-item" data-action="google">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 2h5v5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2L8 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>'
    + 'Preview and Download from Google'
    + '</button>'
    + '<button class="dd-dropdown-item" data-action="email">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M2 4l6 5 6-5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + 'Send Email to Teresa'
    + '</button>'
    + '</div>'
    + '</div>'

    + '</div>'
    + '</div>'

    // ── Tabs: chips + calc button all in one wrapper ─────────
    + '<div class="dd-tabs" id="dd-tabs">' + faqRenderTabs() + '</div>'

    + '<div class="dd-section-divider"></div>'

    // ── Accordion ────────────────────────────────────────────
    + '<div class="faq-panel-wrap">'
    + '<div id="faq-panel">' + faqRenderAccordion() + '</div>'
    + '</div>'

    // ── Inline Risk Calculator — below FAQ ───────────────────
    + '<div id="dd-calc-panel" style="display:none;">' + renderCalculatorPanel() + '</div>';
}

document.addEventListener('click', function(e) {

  // Risk Calculator toggle
  if (e.target.closest('#openCalcBtn')) {
    faqToggleCalcPanel();
    return;
  }

  // Board Report dropdown toggle
  if (e.target.closest('#dsarReportBtn')) {
    faqToggleDsarDropdown();
    return;
  }

  // Dropdown items
  var item = e.target.closest('[data-action]');
  if (item && e.target.closest('#dsarDropdownMenu')) {
    var action = item.dataset.action;
    faqCloseDsarDropdown();
    if (action === 'google') {
      window.open('https://drive.google.com', '_blank');
    } else if (action === 'email') {
      window.location.href = 'mailto:teresa@verygoodpeeps.co?subject=Board%20Report%20%E2%80%94%20Data%20Directory';
    }
    return;
  }

  // Close dropdown when clicking outside
  if (_dsarDropdownOpen && !e.target.closest('#dsarDropdownWrap')) {
    faqCloseDsarDropdown();
  }

  // Radar modal
  if (e.target.closest('#radarBtn')) {
    faqOpenRadarModal();
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

  // Accordion toggle
  var tog = e.target.closest('[data-faqtoggle]');
  if (tog) {
    var idx    = parseInt(tog.dataset.faqtoggle);
    _faqOpenIdx = _faqOpenIdx === idx ? -1 : idx;
    faqRefreshPanel();
    return;
  }
});
