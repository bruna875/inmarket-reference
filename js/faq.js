// faq.js — Data Directory page

var FAQ_CATEGORIES = [
  {id: 'privacy',    label: 'Privacy',    fullLabel: 'Privacy & Data Protection'},
  {id: 'access',     label: 'Access',     fullLabel: 'Access Requests'},
  {id: 'retention',  label: 'Retention',  fullLabel: 'Data Retention'},
  {id: 'compliance', label: 'Compliance', fullLabel: 'Regulatory Compliance'}
];

var FAQ_ITEMS = [
  {cat: 'privacy',    q: 'What personal data does Very Good Peeps collect?',                    a: 'Very Good Peeps collects device identifiers, location data, and behavioral signals to power its measurement and attribution products. All data collection is disclosed in the company\u2019s privacy policy and complies with applicable regulations.'},
  {cat: 'privacy',    q: 'How is personal data processed and stored?',                          a: 'Personal data is processed in secure cloud environments with encryption at rest and in transit. Data is stored in US-based data centers with SOC 2 Type II compliance and access controls enforced via role-based permissions.'},
  {cat: 'privacy',    q: 'What is the legal basis for processing personal data?',               a: 'Processing is based on legitimate interest for B2B measurement services, and on consent where required by local regulation (e.g. GDPR Article 6). Consent mechanisms are managed through certified CMP partners.'},
  {cat: 'access',     q: 'How can an individual submit a Data Subject Access Request (DSAR)?',  a: 'Individuals can submit a DSAR by emailing privacy@verygoodpeeps.co or through the online request form on the company\u2019s privacy page. Requests are acknowledged within 48 hours and fulfilled within the statutory 30-day window.'},
  {cat: 'access',     q: 'What information is provided in response to a DSAR?',                 a: 'The response includes a summary of personal data held, the purposes of processing, categories of recipients, retention periods, and the individual\u2019s rights under applicable law. Data is delivered in a machine-readable format upon request.'},
  {cat: 'access',     q: 'Can a DSAR be submitted on behalf of another person?',                a: 'Yes, authorized agents may submit DSARs on behalf of data subjects. Proof of authorization (such as a power of attorney or signed declaration) is required before the request can be processed.'},
  {cat: 'retention',  q: 'How long is personal data retained?',                                 a: 'Retention periods vary by data type: device identifiers are retained for up to 13 months, aggregated measurement data for up to 3 years, and contractual records for 7 years. Data is purged automatically upon expiration.'},
  {cat: 'retention',  q: 'Can a user request early deletion of their data?',                    a: 'Yes. Deletion requests are processed under the same DSAR workflow. Upon verification, personal data is deleted or anonymized within 30 days. Certain data may be retained longer if required by law.'},
  {cat: 'retention',  q: 'How is data disposed of at end of retention?',                        a: 'Data is permanently deleted through cryptographic erasure for encrypted stores and secure overwrite for unencrypted systems. Deletion is logged and auditable. Third-party sub-processors are contractually required to follow the same disposal standards.'},
  {cat: 'compliance', q: 'Which privacy regulations does Very Good Peeps comply with?',         a: 'Very Good Peeps maintains compliance with GDPR, CCPA/CPRA, VCDPA, CPA, and other US state privacy laws. The company also adheres to NAI and DAA self-regulatory principles for digital advertising.'},
  {cat: 'compliance', q: 'Does Very Good Peeps conduct Data Protection Impact Assessments?',    a: 'Yes. DPIAs are conducted for all new products and significant changes to existing data processing activities. Results are reviewed by the privacy team and, where required, shared with the relevant supervisory authority.'},
  {cat: 'compliance', q: 'How are data breaches handled?',                                      a: 'Very Good Peeps maintains an incident response plan with defined escalation paths. Breaches are assessed within 24 hours, affected parties and supervisory authorities are notified within 72 hours where required, and remediation actions are documented and reviewed.'}
];

var _faqActiveCat = 'all';
var _faqOpenIdx   = -1;

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
  return '<div class="dd-chips">' + chips + '</div>'
    + '<div class="dd-tab-divider"></div>'
    + '<button class="dd-calc-btn" id="openCalcBtn">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h2M9 5h2M5 8h2M9 8h2M5 11h2M9 11h2"/></svg>'
    + 'Risk Calculator'
    + '</button>';
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

function renderFaqDsar() {
  _faqActiveCat = 'all';
  _faqOpenIdx   = -1;

  return '<div class="page-header">'
    + '<div><div class="ptitle">Data Directory</div><div class="psub psub-flush">FAQ and Data Subject Access Request reference</div></div>'
    + '<button class="faq-dsar-btn" id="dsarReportBtn">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 2v4h4" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 9h4M6 11.5h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
    + 'Board Report</button>'
    + '</div>'

    // ── Tabs (All + categories) ──────────────────────────────
    + '<div class="dd-tabs" id="dd-tabs">' + faqRenderTabs() + '</div>'

    + '<div class="dd-section-divider"></div>'

    // ── Accordion ────────────────────────────────────────────
    + '<div class="faq-panel-wrap">'
    + '<div id="faq-panel">' + faqRenderAccordion() + '</div>'
    + '</div>';
}

document.addEventListener('click', function(e) {
  if (e.target.closest('#openCalcBtn')) {
    openCalculatorModal();
    return;
  }
  var cat = e.target.closest('[data-faqcat]');
  if (cat) {
    _faqActiveCat = cat.dataset.faqcat;
    _faqOpenIdx   = -1;
    faqRefresh();
    return;
  }
  var tog = e.target.closest('[data-faqtoggle]');
  if (tog) {
    var idx    = parseInt(tog.dataset.faqtoggle);
    _faqOpenIdx = _faqOpenIdx === idx ? -1 : idx;
    faqRefreshPanel();
    return;
  }
});
