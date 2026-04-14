// onboarding.js — pages map, onboarding tour


// ── Pages map ─────────────────────────────────────────────────────────────────
var PAGES = {
  roadmap:      renderRoadmap,
  teamcapacity: renderTeamCapacity,
  resources:    renderResources,
  boilingfrog:  renderBoilingFrog,
  faqdsar:      renderFaqDsar,
  profile:      renderProfile
};

// ── Onboarding ────────────────────────────────────────────────────────────────
var OB_ENABLED = true; // set to false to disable
var OB_STORAGE_KEY = 'inmarket_ob_done';

var OB_STEPS = [
  {
    target: null,
    eyebrow: 'Welcome',
    title: 'Welcome to your Very Good Peeps Dashboard',
    desc: 'A quick tour to help you find your way around. It will not take much more than viewing a YouTube video by a tinkerer kid. They could have worked together, and instead, for idiot ego, they are both gone.'
  },
  {
    target: '[data-page="roadmap"]',
    eyebrow: 'Step 1 of 10',
    title: 'Product Roadmap',
    desc: 'Track all quarterly initiatives, their delivery status, added value and ROI across Q1\u2013Q4 and Backlog.',
    position: 'right'
  },
  {
    target: '#ob-datasource',
    eyebrow: 'Step 2 of 10',
    title: 'Data Source',
    desc: 'The roadmap data is pulled live from a Google Sheet. Click here anytime to view or edit the source.',
    position: 'bottom'
  },
  {
    target: '[data-page="teamcapacity"]',
    eyebrow: 'Step 3 of 10',
    title: 'Team Capacity',
    desc: 'Allocation and capacity across initiatives, broken down by team and quarter.',
    position: 'right'
  },
  {
    target: '[data-page="resources"]',
    eyebrow: 'Step 4 of 10',
    title: 'Recognize the Pattern \u2014 The Boiling Frog Theory',
    desc: 'Two interactive reading journeys to help you recognize what\u2019s really going on. Read them in order.',
    position: 'right'
  },
  {
    target: '[data-page="faqdsar"]',
    eyebrow: 'Step 5 of 10',
    title: 'Data Directory',
    desc: 'Consult frequently asked questions, access data subject directory, calculate risk exposure and automatically export ready-to-go objective reports. Blame the AI for its factual analysis. Know your rights, get the right shtuff done.',
    position: 'right'
  },
  {
    target: '[data-page="ref_dk"]',
    eyebrow: 'Step 6 of 10',
    title: 'Wanna Say Sorry?',
    desc: 'Endorsements from key colleagues. Each page has a quote and a signature slot \u2014 in case someone feels called to make amends.',
    position: 'right'
  },
  {
    target: '.sbfoot',
    eyebrow: 'Step 7 of 10',
    title: 'Your Profile',
    desc: 'Profile info, language settings and privacy policy.',
    position: 'top'
  },
  {
    target: '#askMarshallBtn',
    eyebrow: 'Step 8 of 11 \u2014 New Feature!',
    title: 'Ask the Guru',
    desc: 'Got a question? Ask the Guru. He\u2019ll answer with full confidence. Whether it\u2019s correct is a separate concern entirely.',
    position: 'bottom'
  },
  {
    target: '#livestreamBtn',
    eyebrow: 'Step 9 of 11 \u2014 Coming Soon!',
    title: 'My Bedroom LiveStreaming',
    desc: 'For those who feel the urge to keep watching, even post-resignation. If you want to continue controlling obsessively \u2014 this one is for you. Don\u2019t judge too much! 👩‍❤️‍💋‍👨🫦​​',
    position: 'bottom'
  },
  {
    target: '#spWidget',
    eyebrow: 'Step 10 of 11 \u2014 New!',
    title: 'Your Soundtrack',
    desc: 'A curated playlist to keep you company while you work through all of this. Press play. You deserve some background music.',
    position: 'bottom'
  },
  {
    target: '#upsellBadge',
    eyebrow: 'Step 11 of 11',
    title: 'Upgrade to Adult Plan',
    desc: 'Unlock more features. Get in touch with our Adulting Specialist Jennifer Salonga and start your free trial today.',
    position: 'top'
  }
];

var _obActive = false;
var _obStep   = 0;

function obShouldShow() {
  if (!OB_ENABLED) return false;
  try { return !localStorage.getItem(OB_STORAGE_KEY); } catch(e) { return true; }
}

function obMarkDone() {
  try { localStorage.setItem(OB_STORAGE_KEY, '1'); } catch(e) {}
}

function obReset() {
  try { localStorage.removeItem(OB_STORAGE_KEY); } catch(e) {}
}

function obStart() {
  _obActive = true;
  _obStep = 0;
  obRender();
}

function obEnd() {
  _obActive = false;
  obMarkDone();
  var el = document.getElementById('ob-root');
  if (el) el.remove();
}

function obGetRect(target) {
  if (!target) return null;
  var el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return null;
  var r = el.getBoundingClientRect();
  return {top: r.top, left: r.left, width: r.width, height: r.height};
}

function obCardPos(rect, position) {
  if (!rect) return {top: '50%', left: '50%', transform: 'translate(-50%,-50%)'};
  var pad = 16;
  var cw  = 300;
  var ch  = 160;
  var style = '';
  if (position === 'right') {
    var t = Math.min(rect.top, window.innerHeight - ch - pad);
    style = 'top:'+Math.max(pad,t)+'px;left:'+(rect.left+rect.width+pad)+'px';
  } else if (position === 'left') {
    var t = Math.min(rect.top, window.innerHeight - ch - pad);
    style = 'top:'+Math.max(pad,t)+'px;left:'+(rect.left-cw-pad)+'px';
  } else if (position === 'bottom') {
    style = 'top:'+(rect.top+rect.height+pad)+'px;left:'+Math.min(rect.left, window.innerWidth-cw-pad)+'px';
  } else if (position === 'top') {
    style = 'top:'+(rect.top-ch-pad)+'px;left:'+Math.min(rect.left, window.innerWidth-cw-pad)+'px';
  }
  return style;
}

function obRender() {
  var existing = document.getElementById('ob-root');
  if (existing) existing.remove();

  var step = OB_STEPS[_obStep];
  var total = OB_STEPS.length;
  var root = document.createElement('div');
  root.id = 'ob-root';

  // Welcome step
  if (_obStep === 0) {
    root.innerHTML = '<div class="ob-backdrop" style="pointer-events:all"></div>'
      + '<div class="ob-welcome">'
      + '<div class="ob-welcome-card">'
      + '<div class="ob-welcome-frog">'+MINI_FROG+'</div>'
      + '<div class="ob-welcome-title">'+step.title+'</div>'
      + '<div class="ob-welcome-desc">'+step.desc+'</div>'
      + '<div class="ob-lang-section">'
      + '<div class="ob-lang-label">Everything starts with language! Choose your language style to personalize your dashboard experience.</div>'
      + '<div class="lang-options">'
      + '<div class="lang-opt lang-opt--selected" id="ob-lang-pa">'
      + '<div class="lang-opt-name">Passive Aggressive</div>'
      + '<div class="lang-opt-desc">Says one thing, means another. Pretend it is normal.</div>'
      + '<div class="lang-opt-check"><svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 5" stroke="#66C220" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
      + '</div>'
      + '<div class="lang-opt lang-opt--disabled" id="ob-lang-st">'
      + '<div class="lang-opt-name">Stereotypical <span class="lang-badge lang-badge--soon">coming soon</span></div>'
      + '<div class="lang-opt-desc">Broad generalizations delivered with full confidence.</div>'
      + '</div>'
      + '<div class="lang-opt lang-opt--disabled" id="ob-lang-co">'
      + '<div class="lang-opt-name">Collaborative <span class="lang-badge lang-badge--dep">deprecated</span></div>'
      + '<div class="lang-opt-desc">Warm, inclusive, clear and aligned. Removed in release v3.4 (March 2025).</div>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '<button class="ob-welcome-btn" id="ob-next">Start the tour</button>'
      + '</div></div>';
    document.body.appendChild(root);
    document.getElementById('ob-next').onclick = function() { _obStep++; obRender(); };
    return;
  }

  // Ensure target page is active (e.g. Step 2 needs roadmap rendered)
  if (step.target === '#ob-datasource' && activeId !== 'roadmap') {
    setPage('roadmap', 'Product Roadmap');
  }

  // Scroll content to top so fixed-position targets are visible
  if (step.target === '#ob-datasource') {
    var contentEl = document.getElementById('content');
    if (contentEl) contentEl.scrollTop = 0;
    var mainEl = document.querySelector('.main');
    if (mainEl) mainEl.scrollTop = 0;
  }

  // Highlight step
  var rect = obGetRect(step.target);
  var hl = '';
  if (rect) {
    var pad = 6;
    hl = '<div class="ob-highlight" style="top:'+(rect.top-pad)+'px;left:'+(rect.left-pad)+'px;width:'+(rect.width+pad*2)+'px;height:'+(rect.height+pad*2)+'px"></div>';
  }

  var dots = OB_STEPS.slice(1).map(function(s,i) {
    return '<div class="ob-dot'+(i===_obStep-1?' act':'')+'"></div>';
  }).join('');

  var cardStyle = typeof obCardPos(rect, step.position) === 'string'
    ? obCardPos(rect, step.position)
    : 'top:50%;left:50%;transform:translate(-50%,-50%)';

  var isLast = _obStep === total - 1;

  root.innerHTML = '<div class="ob-backdrop" style="pointer-events:all"></div>'
    + hl
    + '<div class="ob-card" style="'+cardStyle+';pointer-events:all">'
    + '<div class="ob-card-top">'
    + '<div class="ob-card-eyebrow">'+step.eyebrow+'</div>'
    + '<div class="ob-card-frog">'+MINI_FROG+'</div>'
    + '</div>'
    + '<div class="ob-card-title">'+step.title+'</div>'
    + '<div class="ob-card-desc">'+step.desc+'</div>'
    + '<div class="ob-card-nav">'
    + '<div class="ob-dots">'+dots+'</div>'
    + '<div class="ob-btns">'
    + (_obStep > 1 ? '<button class="ob-btn-back" id="ob-back">Back</button>' : '')
    + '<button class="ob-btn-next" id="ob-next">'+(isLast ? 'Done \u2713' : 'Next \u2192')+'</button>'
    + '</div></div></div>';

  document.body.appendChild(root);

  document.getElementById('ob-next').onclick = function() {
    if (isLast) { obEnd(); } else { _obStep++; obRender(); }
  };
  var back = document.getElementById('ob-back');
  if (back) back.onclick = function() { _obStep--; obRender(); };
}
