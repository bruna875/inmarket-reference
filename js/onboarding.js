// onboarding.js — pages map, onboarding tour


// ── Pages map ─────────────────────────────────────────────────────────────────
var PAGES = {
  roadmap:      renderRoadmap,
  teamcapacity: renderTeamCapacity,
  wip:          renderWIP,
  resources:    renderResources,
  boilingfrog:  renderBoilingFrog,
  faqdsar:      renderFaqDsar
};

// ── Onboarding ────────────────────────────────────────────────────────────────
var OB_ENABLED = true; // set to false to disable
var OB_STORAGE_KEY = 'inmarket_ob_done';

var OB_STEPS = [
  {
    target: null, // welcome screen
    eyebrow: 'Welcome',
    title: 'Your Very Good Peeps Dashboard',
    desc: 'A quick tour to help you find your way around. It will not take much more than viewing a vibe coding YouTube video by a Asian tinkerer kid.'
  },
  {
    target: '[data-page="roadmap"]',
    eyebrow: 'Step 1 of 7',
    title: 'Product Roadmap',
    desc: 'Track all quarterly initiatives, their delivery status, added value and ROI across Q1–Q4 and Backlog.',
    position: 'right'
  },
  {
    target: '#ob-datasource',
    eyebrow: 'Step 2 of 7',
    title: 'Data Source',
    desc: 'The roadmap data is pulled live from a Google Sheet. Click here anytime to view or edit the source.',
    position: 'bottom'
  },
  {
    target: '[data-page="teamcapacity"]',
    eyebrow: 'Step 3 of 7',
    title: 'Team Capacity',
    desc: 'Coming soon — a view of team allocation and capacity across initiatives.',
    position: 'right'
  },
  {
    target: '[data-page="ref_deniece_kennedy"]',
    eyebrow: 'Step 4 of 7',
    title: 'References',
    desc: 'Personal endorsements from key colleagues. Each page includes a quote and a signature slot.',
    position: 'right'
  },
  {
    target: '[data-page="resources"]',
    eyebrow: 'Step 5 of 7',
    title: 'Resources',
    desc: 'Two interactive reading journeys: Recognize the Patterns and The Boiling Frog.',
    position: 'right'
  },
  {
    target: '.sbfoot',
    eyebrow: 'Step 6 of 7',
    title: 'Your Profile',
    desc: 'Your account info and sign-out option. More profile features coming soon.',
    position: 'top'
  },
  {
    target: '#askMarshallBtn',
    eyebrow: 'Step 7 of 7',
    title: 'Ask Maresciallo',
    desc: 'Got a question? Ask Maresciallo. He\u2019ll confidently give you an answer. Whether it\u2019s the right one is another story entirely.',
    position: 'bottom'
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
      + '<div style="margin:0 auto 20px;width:48px;height:48px;display:flex;align-items:center;justify-content:center">'+MINI_FROG+'</div>'
      + '<div class="ob-welcome-title">'+step.title+'</div>'
      + '<div class="ob-welcome-desc">'+step.desc+'</div>'
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
    + '<div style="display:flex;align-items:flex-start;justify-content:space-between">'
    + '<div class="ob-card-eyebrow">'+step.eyebrow+'</div>'
    + '<div style="flex-shrink:0;margin-top:-4px;margin-right:-4px">'+MINI_FROG+'</div>'
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
