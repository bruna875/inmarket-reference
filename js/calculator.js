// calculator.js — Objective Risk Calculator

function renderCalculatorPanel() {
  return '<div class="dd-calc-panel">'
    + '<div class="dd-calc-panel-header">'
    + '<div style="display:flex;align-items:center;gap:8px;">'
    + '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h2M9 5h2M5 8h2M9 8h2M5 11h2M9 11h2"/></svg>'
    + '<span class="dd-calc-panel-title">Objective Risk Calculator</span>'
    + '</div>'
    + '<span class="dd-calc-coming-soon">coming soon</span>'
    + '</div>'
    + '<div class="dd-calc-panel-body">'
    + '<div class="dd-calc-placeholder">'
    + '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity=".18"><rect x="4" y="4" width="24" height="24" rx="4"/><path d="M10 10h4M18 10h4M10 16h4M18 16h4M10 22h4M18 22h4"/></svg>'
    + '<p class="dd-calc-placeholder-text">Score your exposure based on documented incidents,<br>patterns, and compliance gaps. We\'ll build it together.</p>'
    + '</div>'
    + '</div>'
    + '</div>';
}

// Legacy — kept for compatibility, no longer called
function openCalculatorModal() {
  var existing = document.getElementById('calc-modal-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'calc-modal-overlay';
  overlay.className = 'modal-overlay';

  overlay.innerHTML =
    '<div class="modal-card" style="max-width:480px;">'
    + '<div class="modal-header">'
    + '<div style="display:flex;align-items:center;gap:8px;">'
    + '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h2M9 5h2M5 8h2M9 8h2M5 11h2M9 11h2"/></svg>'
    + '<span class="modal-title">Objective Risk Calculator</span>'
    + '</div>'
    + '<button class="modal-close" id="calcModalClose">'
    + '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
    + '</button>'
    + '</div>'
    + '<div class="modal-body">' + renderCalculatorPanel() + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
  document.getElementById('calcModalClose').addEventListener('click', function() { overlay.remove(); });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
}
