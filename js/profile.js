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
    +   'Responsible for structural decisions, access control, and the kind of coordination work that only becomes visible when it stops happening. 138 IQ-tested: it is a damnation since 1989. '
    +   'Equally socially allergic, either in gritty housing projects and pretentious luxury corporate hotels. Evolved from the good old days of flipping bullies scooters with a rowdy crew, to the sophisticated thrill of crushing them with AI dashboards and regulations.'
    + '</div>'

    + '<div class="prof-divider"></div>'

    + '<div class="prof-section">'
    +   '<div class="prof-section-label">App Stack</div>'
    +   '<div class="prof-desc" style="margin-top:0">Leveraging a high-performing, cross-functional team of one \u2014 similarly to the last 4 years \u2014 this app was ideated, architected, and shipped to production in 2 week-ends \u2014 end-to-end, from prototype to production-grade software \u2014 using Claude Code, Visual Studio Code, Git, Node.js, Vercel, Google Apps Script, EmailJS, and Vercel Blob. No technical debt reduction roadmap was established. Metrics measuring efficiency gains and productivity improvements are, in fact, in the roadmap \u2014 because the author has both the technical depth to build them and the business acumen to know why they matter. Real Genius. Timely change management framework deployment would avoid the need for gargantuan socialization efforts. Now that is built, I have to invent another second job to keep myself from getting bored. Do you have any internal, external, hermaphrodite workflows I could automate like a AI tinkerer pro? </div>'
    + '</div>'

    + '<div class="prof-divider"></div>'

    + '<div class="prof-section">'
    +   '<div class="prof-section-label">Contacts</div>'
    +   '<div class="prof-devtools">'
    +     '<a class="prof-tool-btn" href="mailto:info@getrightshtuffdone.com">'
    +       '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 4l7 5 7-5"/></svg>'
    +       'Email Developer'
    +     '</a>'
    +   '</div>'
    + '</div>';
}
