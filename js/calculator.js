// calculator.js — Objective Risk Calculator

function openCalculatorModal() {
  var existing = document.getElementById('calc-modal-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'calc-modal-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;z-index:200;';

  overlay.innerHTML =
    '<div style="background:#fff;border-radius:14px;width:480px;max-width:92vw;box-shadow:0 8px 40px rgba(0,0,0,0.12);overflow:hidden;">'
    + '<div style="padding:24px 28px 20px;border-bottom:1px solid rgba(0,0,0,0.08);">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">'
    + '<div style="display:flex;align-items:center;gap:8px;">'
    + '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h2M9 5h2M5 8h2M9 8h2M5 11h2M9 11h2"/></svg>'
    + '<span style="font-size:15px;font-weight:500;letter-spacing:-.3px;color:#0D1E36;">Objective Risk Calculator</span>'
    + '</div>'
    + '<button id="calcModalClose" style="background:none;border:none;cursor:pointer;color:#A8A8A0;padding:2px;display:flex;">'
    + '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
    + '</button>'
    + '</div>'
    + '<div style="font-size:12px;color:#6B6B65;line-height:1.6;">Score your exposure based on documented incidents, patterns, and compliance gaps.</div>'
    + '</div>'
    + '<div style="padding:32px 28px;display:flex;flex-direction:column;align-items:center;gap:12px;background:#F5F4F0;text-align:center;">'
    + '<svg width="36" height="36" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity=".22"><rect x="4" y="4" width="24" height="24" rx="4"/><path d="M10 10h4M18 10h4M10 16h4M18 16h4M10 22h4M18 22h4"/></svg>'
    + '<div style="font-size:12px;color:#A8A8A0;line-height:1.7;">Risk scoring logic will live here.<br>We\'ll build it together.</div>'
    + '<span style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.4px;color:#A8A8A0;background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:4px;padding:2px 8px;">coming soon</span>'
    + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
  document.getElementById('calcModalClose').addEventListener('click', function() { overlay.remove(); });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
}
