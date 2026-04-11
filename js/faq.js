// faq.js — FAQ / DSAR Directory page


var FAQ_CATEGORIES = [
  {id: 'all', label: 'All'},
  {id: 'privacy', label: 'Privacy & Data Protection'},
  {id: 'access', label: 'Access Requests'},
  {id: 'retention', label: 'Data Retention'},
  {id: 'compliance', label: 'Regulatory Compliance'}
];

var FAQ_ITEMS = [
  {cat: 'privacy', q: 'What personal data does Very Good Peeps collect?', a: 'Very Good Peeps collects device identifiers, location data, and behavioral signals to power its measurement and attribution products. All data collection is disclosed in the company\u2019s privacy policy and complies with applicable regulations.'},
  {cat: 'privacy', q: 'How is personal data processed and stored?', a: 'Personal data is processed in secure cloud environments with encryption at rest and in transit. Data is stored in US-based data centers with SOC 2 Type II compliance and access controls enforced via role-based permissions.'},
  {cat: 'privacy', q: 'What is the legal basis for processing personal data?', a: 'Processing is based on legitimate interest for B2B measurement services, and on consent where required by local regulation (e.g. GDPR Article 6). Consent mechanisms are managed through certified CMP partners.'},
  {cat: 'access', q: 'How can an individual submit a Data Subject Access Request (DSAR)?', a: 'Individuals can submit a DSAR by emailing privacy@verygoodpeeps.co or through the online request form on the company\u2019s privacy page. Requests are acknowledged within 48 hours and fulfilled within the statutory 30-day window.'},
  {cat: 'access', q: 'What information is provided in response to a DSAR?', a: 'The response includes a summary of personal data held, the purposes of processing, categories of recipients, retention periods, and the individual\u2019s rights under applicable law. Data is delivered in a machine-readable format upon request.'},
  {cat: 'access', q: 'Can a DSAR be submitted on behalf of another person?', a: 'Yes, authorized agents may submit DSARs on behalf of data subjects. Proof of authorization (such as a power of attorney or signed declaration) is required before the request can be processed.'},
  {cat: 'retention', q: 'How long is personal data retained?', a: 'Retention periods vary by data type: device identifiers are retained for up to 13 months, aggregated measurement data for up to 3 years, and contractual records for 7 years. Data is purged automatically upon expiration.'},
  {cat: 'retention', q: 'Can a user request early deletion of their data?', a: 'Yes. Deletion requests are processed under the same DSAR workflow. Upon verification, personal data is deleted or anonymized within 30 days. Certain data may be retained longer if required by law.'},
  {cat: 'retention', q: 'How is data disposed of at end of retention?', a: 'Data is permanently deleted through cryptographic erasure for encrypted stores and secure overwrite for unencrypted systems. Deletion is logged and auditable. Third-party sub-processors are contractually required to follow the same disposal standards.'},
  {cat: 'compliance', q: 'Which privacy regulations does Very Good Peeps comply with?', a: 'Very Good Peeps maintains compliance with GDPR, CCPA/CPRA, VCDPA, CPA, and other US state privacy laws. The company also adheres to NAI and DAA self-regulatory principles for digital advertising.'},
  {cat: 'compliance', q: 'Does Very Good Peeps conduct Data Protection Impact Assessments (DPIAs)?', a: 'Yes. DPIAs are conducted for all new products and significant changes to existing data processing activities. Results are reviewed by the privacy team and, where required, shared with the relevant supervisory authority.'},
  {cat: 'compliance', q: 'How are data breaches handled?', a: 'Very Good Peeps maintains an incident response plan with defined escalation paths. Breaches are assessed within 24 hours, affected parties and supervisory authorities are notified within 72 hours where required, and remediation actions are documented and reviewed.'}
];

var _faqActiveCat = 'all';
var _faqOpenIdx = -1;

function faqFilterItems() {
  if (_faqActiveCat === 'all') return FAQ_ITEMS;
  return FAQ_ITEMS.filter(function(i) { return i.cat === _faqActiveCat; });
}

function faqRenderSidebar() {
  return FAQ_CATEGORIES.map(function(c) {
    var act = c.id === _faqActiveCat;
    return '<div class="faq-cat-item' + (act ? ' act' : '') + '" data-faqcat="' + c.id + '">'
      + c.label + '</div>';
  }).join('');
}

function faqRenderAccordion() {
  var items = faqFilterItems();
  if (items.length === 0) return '<div class="faq-empty">No items in this category.</div>';
  return items.map(function(item, idx) {
    var globalIdx = FAQ_ITEMS.indexOf(item);
    var isOpen = globalIdx === _faqOpenIdx;
    return '<div class="faq-item">'
      + '<div class="faq-question' + (isOpen ? ' open' : '') + '" data-faqtoggle="' + globalIdx + '">'
      + '<span class="faq-question-text">' + item.q + '</span>'
      + '<svg class="faq-chevron' + (isOpen ? ' open' : '') + '" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '</div>'
      + (isOpen ? '<div class="faq-answer">' + item.a + '</div>' : '')
      + '</div>';
  }).join('');
}

function faqRefresh() {
  var sidebar = document.getElementById('faq-sidebar');
  if (sidebar) sidebar.innerHTML = faqRenderSidebar();
  var panel = document.getElementById('faq-panel');
  if (panel) panel.innerHTML = faqRenderAccordion();
}

function renderFaqDsar() {
  _faqActiveCat = 'all';
  _faqOpenIdx = -1;

  return '<div class="page-header">'
    + '<div><div class="ptitle">Data Directory</div><div class="psub psub-flush">Frequently asked questions and Data Subject Access Request reference</div></div>'
    + '<button class="faq-dsar-btn" id="dsarReportBtn">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 2v4h4" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 9h4M6 11.5h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
    + 'Convert DSAR Directory in Board Report</button>'
    + '</div>'
    + '<div class="faq-layout">'
    + '<div class="faq-sidebar" id="faq-sidebar">'
    + faqRenderSidebar()
    + '</div>'
    + '<div class="faq-panel-wrap">'
    + '<div id="faq-panel">'
    + faqRenderAccordion()
    + '</div>'
    + '</div>'
    + '</div>';
}

document.addEventListener('click', function(e) {
  var cat = e.target.closest('[data-faqcat]');
  if (cat) {
    _faqActiveCat = cat.dataset.faqcat;
    _faqOpenIdx = -1;
    faqRefresh();
    return;
  }
  var tog = e.target.closest('[data-faqtoggle]');
  if (tog) {
    var idx = parseInt(tog.dataset.faqtoggle);
    _faqOpenIdx = _faqOpenIdx === idx ? -1 : idx;
    faqRefresh();
    return;
  }
});
