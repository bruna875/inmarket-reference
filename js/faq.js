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
    return '<div class="faq-cat-item' + (act ? ' act' : '') + '" data-faqcat="' + c.id + '"'
      + ' style="padding:8px 14px;border-radius:8px;font-size:13px;cursor:pointer;color:' + (act ? 'var(--text)' : 'var(--muted)') + ';'
      + 'background:' + (act ? 'var(--bg)' : 'transparent') + ';font-weight:' + (act ? '500' : '400') + ';transition:all .15s">'
      + c.label + '</div>';
  }).join('');
}

function faqRenderAccordion() {
  var items = faqFilterItems();
  if (items.length === 0) return '<div style="padding:24px;font-size:13px;color:var(--faint)">No items in this category.</div>';
  return items.map(function(item, idx) {
    var globalIdx = FAQ_ITEMS.indexOf(item);
    var isOpen = globalIdx === _faqOpenIdx;
    return '<div style="border-bottom:1px solid var(--border)">'
      + '<div data-faqtoggle="' + globalIdx + '" style="padding:14px 18px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;transition:background .1s'
      + (isOpen ? ';background:var(--bg)' : '') + '">'
      + '<span style="font-size:13px;font-weight:500;color:var(--text);flex:1">' + item.q + '</span>'
      + '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="flex-shrink:0;transition:transform .2s;transform:rotate(' + (isOpen ? '180' : '0') + 'deg)"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '</div>'
      + (isOpen ? '<div style="padding:10px 18px 16px;font-size:12.5px;line-height:1.7;color:var(--muted)">' + item.a + '</div>' : '')
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

  return '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px">'
    + '<div><div class="ptitle">FAQ / DSAR Directory</div><div class="psub" style="margin-bottom:0">Frequently asked questions and Data Subject Access Request reference</div></div>'
    + '<button id="dsarReportBtn" style="display:inline-flex;align-items:center;gap:6px;background:var(--accent);color:#fff;border:none;border-radius:8px;padding:8px 16px;font-size:12px;font-weight:500;font-family:inherit;cursor:pointer;white-space:nowrap;flex-shrink:0;margin-top:4px;transition:opacity .15s" onmouseover="this.style.opacity=\'0.85\'" onmouseout="this.style.opacity=\'1\'">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 2v4h4" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 9h4M6 11.5h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
    + 'Convert DSAR Directory in Board Report</button>'
    + '</div>'
    + '<div style="display:flex;gap:20px;align-items:flex-start">'
    + '<div id="faq-sidebar" style="width:200px;flex-shrink:0;display:flex;flex-direction:column;gap:2px">'
    + faqRenderSidebar()
    + '</div>'
    + '<div style="flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden">'
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
