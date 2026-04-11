// profile.js — Profile page

var PROFILE_SIG_EMAILS = ['bruna@saykudos.co', 'bru.cop10@gmail.com'];

function renderProfile() {
  var userName  = (document.getElementById('un') || {}).textContent || 'Condoadmin';
  var userRole  = (document.getElementById('urole') || {}).textContent || 'Head of Product';

  var frogSvg = '<svg width="64" height="64" viewBox="0 0 36 36" fill="none" class="ld-bob">'
    + '<ellipse cx="18" cy="24" rx="10" ry="7" fill="#9DC47A" opacity=".85"/>'
    + '<ellipse cx="18" cy="22.5" rx="8" ry="5.5" fill="#8BAF6A" opacity=".9"/>'
    + '<circle cx="14" cy="15.5" r="3.2" fill="#6B8A50"/>'
    + '<circle cx="22" cy="15.5" r="3.2" fill="#6B8A50"/>'
    + '<circle cx="14" cy="15.5" r="2" fill="#fff" opacity=".9"/>'
    + '<circle cx="22" cy="15.5" r="2" fill="#fff" opacity=".9"/>'
    + '<circle cx="14.5" cy="15.5" r="1" fill="#2A3A1A"/>'
    + '<circle cx="22.5" cy="15.5" r="1" fill="#2A3A1A"/>'
    + '<path d="M16 22 Q18 24.5 20 22" stroke="#5A7A40" stroke-width="1" fill="none" stroke-linecap="round"/>'
    + '</svg>';

  var sigTest1 = '<div id="sig-wrap-prof_test_1">'+sigBoxHtml('prof_test_1', 'B.S.', 'bruna@saykudos.co')+'</div>';
  var sigTest2 = '<div id="sig-wrap-prof_test_2">'+sigBoxHtml('prof_test_2', 'B.S.', 'bru.cop10@gmail.com')+'</div>';

  return ''
    + '<div class="prof-header">'
    +   '<div class="prof-avatar">'+frogSvg+'</div>'
    +   '<div class="prof-identity">'
    +     '<div class="prof-name">'+userName+'</div>'
    +     '<div class="prof-role">'+userRole+'</div>'
    +   '</div>'
    + '</div>'
    + '<div class="prof-desc">'
    +   'Manages the shared spaces, enforces the rules nobody agreed to, and keeps the operations running so everyone else can pretend they are delivering results. '
    +   'Responsible for structural decisions, access control, and the kind of coordination work that only becomes visible when it stops happening.'
    + '</div>'

    + '<div class="prof-divider"></div>'

    + '<div class="prof-section">'
    +   '<div class="prof-section-label">Developer Tools</div>'
    +   '<div class="prof-devtools">'
    +     '<button class="prof-tool-btn prof-tool-btn--danger" id="resetSigsBtn">'
    +       '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 5.5A6 6 0 1 0 14 8"/><path d="M14 2v4h-4"/></svg>'
    +       'Clean Signatures'
    +     '</button>'
    +     '<a class="prof-tool-btn" href="https://github.com" target="_blank" rel="noopener">'
    +       '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12c0 1.5-1 2-1 2h7s-1-.5-1-2V9.5C11 8 11 7 10 6c1.5-.5 3-1.5 3-4.5H3c0 3 1.5 4 3 4.5C5 7 5 8 5 9.5V12z"/><path d="M6 2c-.5 1-.5 2 0 2.5"/></svg>'
    +       'GitHub Repo - if you want to re-use the Roadmap component'
    +     '</a>'
    +   '</div>'
    +   '<div class="prof-sigtests">'
    +     '<div class="prof-sigtest-item">'
    +       '<div class="prof-sigtest-label">Test \u2014 <span class="prof-sigtest-email">bruna@saykudos.co</span></div>'
    +       sigTest1
    +     '</div>'
    +     '<div class="prof-sigtest-item">'
    +       '<div class="prof-sigtest-label">Test \u2014 <span class="prof-sigtest-email">bru.cop10@gmail.com</span></div>'
    +       sigTest2
    +     '</div>'
    +   '</div>'
    + '</div>'

    + '<div class="prof-divider"></div>'

    + '<div class="prof-section">'
    +   '<div class="prof-section-label">Contacts</div>'
    +   '<div class="prof-devtools">'
    +     '<a class="prof-tool-btn" href="mailto:bruna@saykudos.co">'
    +       '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 4l7 5 7-5"/></svg>'
    +       'Email Developer'
    +     '</a>'
    +   '</div>'
    + '</div>';
}
