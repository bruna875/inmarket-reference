// resources.js — wizard engine, patterns, boiling frog


// ── Wizard ────────────────────────────────────────────────────────────────────
var _wizState = {};

var _wizItemsPatterns = [
  {
    label: 'Chapter 1',
    title: 'Something Deeply Offensive Happened',
    desc: 'It started with a disruption to the natural order. Professionalizing the Company. Contextually, you underestimated the implications of privileging focusing on the major company objectives assigned to you (without being given with any tool to achieve them) vs trivial design tasks on a secondary app project - which honestly were a bit mortifying for a 15-years experienced product leader. You start working closely with a different manager \u2014 one who was assigned to you. He seems liking you. <b>Outrageously, at least for someone who had always considered you part of their personal orbit.</b> By any reasonable standard, these were entirely unremarkable organizational changes. But something about them has been registered as a wound. <b>Crisis. Betrayal. Intolerable offense. Deep, personal, unforgivable.</b> And that changed everything - as you will discover only years later.'
  },
  {
    label: 'Chapter 2',
    title: 'Suddenly, You Were Always the Problem',
    desc: 'The offense needed an explanation \u2014 and one arrived quickly, efficiently, and with remarkable consistency across every audience. Suddenly, you start being described as incompetent, lazy, slow, disloyal, or \u2014 a classic \u2014 \u201cnot a culture fit.\u201d <b>You even get labeled as \u201cunstable\u201d after four months of obsessive control and harassment</b>. Stories circulate that bear little resemblance to events as they actually occurred. The manipulation becomes massive. <b>Conversations happen exclusively behind closed doors: almost a year spent talking about who you are, but you are never in the room</b>. The smear wasn\u2019t advertised as one. It was framed as \u201chonest feedback,\u201d or \u201cconcerns I simply had to raise.\u201d The goal was singular: to establish you as the source of every problem \u2014 preferably before you had a chance to name what was happening. Of course: <b> before, you were just a "betrayal". But now there is more: you are "the unloyal usurpator" who found themselves on the way of the Sun King\u2019s Restoration.</b> '
  },
  {
    label: 'Chapter 3',
    title: 'You Begin to Doubt Your Own Notes',
    desc: 'When you raise concerns, you are told you are being paranoid, oversensitive, or simply misremembering. You are told to \u201cfocus on the future.\u201d The solid informal networks that had once included you quietly close. <b> Colleagues become distant \u2014 not hostile, just\u2026 unavailable.</b> And because none of it was documented, and none of it was announced, it was nearly impossible to point to. <b> You start questioning your own memory. Your own beliefs. </b>Did I do something bad? There is something wrong about me? That, of course, was the point.'
  },
  {
    label: 'Chapter 4',
    title: 'They Weren\u2019t All True Believers',
    desc: 'Few of them genuinely believed the narrative might be true. <b>The majority sensed it was one-sided, but found that the social cost of truth was higher than the cost of alignment, worried to become the new target.</b> A few, simply needed proximity to power more than they needed accuracy. Some others leveraged it to maintain status and control. Together, <b>they formed a functional system:</b> some carried the message, some enforced the silence, some just declined to contradict. They were not, for the most part, villains. Most were people trying to navigate an environment where the rules of engagement had quietly shifted. That\u2019s precisely what made them effective. To him.'
  },
  {
    label: 'Chapter 5',
    title: 'Leaving Was the Final Insult',
    desc: '<b>When someone finally exits \u2014 obviously pushed \u2014 and regains control over the narrative,a new wound opens.</b> The departure itself is experienced as an act of aggression. After everything that had been done to make that person leave, the act of leaving is still taken personally. <b>Brought to the very next level.</b> New narratives emerge: they weren\u2019t loyal, they gave up, they burned bridges, they \u201cchose wrong.\u201d Those who stayed may find the exit deployed as retroactive evidence for every prior accusation. And the person who left \u2014 now absent, unable to correct the record, no longer part of the room where things are said \u2014 becomes a permanent, convenient explanation for whatever goes wrong next. <b>Eh no! Not this time, so sorry! Kindness is a choice, not a weakness, and can be retired at any time.</b>'
  },
  {
    label: 'Final Quiz',
    title: 'How Well Did You Recognize the Pattern?',
    html: '<div class="quiz-prompt">Based on everything you just read \u2014 what is the most accurate clinical description of the behavior pattern?</div>'
      + '<div class="quiz-cards">'
      + '<div class="quiz-card" data-quiz-option="wrong1">'
      + '<div class="quiz-card-selector"></div>'
      + '<div class="quiz-card-content"><div class="quiz-card-title">Visionary Excellence Syndrome</div>'
      + '<div class="quiz-card-desc">Marked by exceptional strategic clarity and the rare ability to inspire teams toward ambitious goals. Often misunderstood by those operating at a lower level of vision.</div></div>'
      + '</div>'
      + '<div class="quiz-card" data-quiz-option="correct">'
      + '<div class="quiz-card-selector"></div>'
      + '<div class="quiz-card-content"><div class="quiz-card-title">Narcissistic Personality Disorder (DSM-5) with Antisocial and Paranoid Traits</div>'
      + '<div class="quiz-card-desc">Also known as Malignant Narcissism. Characterized by messianic grandiosity, absence of empathy, sense of entitlement, manipulative and predatory behaviors, callousness, convinction to be above the rules, obsessive need for control, a tendency toward suspicious, persecutory thinking and hypersensitivity to criticism. Forget they can change: it is egosyntonic. </div></div>'
      + '</div>'
      + '<div class="quiz-card" data-quiz-option="wrong2">'
      + '<div class="quiz-card-selector"></div>'
      + '<div class="quiz-card-content"><div class="quiz-card-title">Extraordinary Public Figure Profile</div>'
      + '<div class="quiz-card-desc">Distinguished by respectful attitude, genuine likability, and an authentic capacity to build lasting trust and psycological safety at every level of the organization.</div></div>'
      + '</div>'
      + '</div>'
      + '<div id="quiz-result"></div>'
  },
  {
    label: 'Empathy Exercise',
    title: 'Understand the pain',
    html: '<div class="emp-intro">Before you close this chapter \u2014 one more thing.</div>'
      + '<div class="emp-row">'

      + '<div class="emp-card"><div class="emp-emoji">📋</div><div class="emp-num">1</div><div class="emp-text">Digest the behaviors described. Extend to 12 months. </div></div>'
      + '<div class="emp-connector"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'

      + '<div class="emp-card"><div class="emp-emoji">🪞</div><div class="emp-num">2</div><div class="emp-text">Replace the victim\u2019s face with the one of your beloved ones: your daughter, your son, your mum, your dad, your wife, your husband, your niece.</div></div>'
      + '<div class="emp-connector"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'

      + '<div class="emp-card"><div class="emp-emoji">🌊</div><div class="emp-num">3</div><div class="emp-text">Acknowledge your emotions and let them enter: is there anger, discomfort, sadness, guiltiness?</div></div>'
      + '<div class="emp-connector"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'

      + '<div class="emp-card emp-card--yellow"><div class="emp-emoji">👁️</div><div class="emp-num">4</div><div class="emp-text">I know you are looking for a self-indulging excuses. Stay focused. Don\u2019t run away from the emotions.</div></div>'
      + '<div class="emp-connector"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'

      + '<div class="emp-card"><div class="emp-emoji">🕊️</div><div class="emp-num">5</div><div class="emp-text">Despite all... be compassionate.</div></div>'

      + '</div>'
  }
];

var _wizItemsFrog = [
  {label:'The Theory', title:'You don\u2019t notice until it\u2019s too late', desc:'A frog placed in boiling water jumps out immediately. A frog placed in cold water that slowly heats up doesn\u2019t notice the change \u2014 and eventually boils. The threat was never sudden. It was gradual, normalized, and invisible until it wasn\u2019t.', svg:'<svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px;display:block;margin:0 0 16px"><ellipse cx="170" cy="130" rx="80" ry="14" fill="#D0CEC8" opacity=".4"/><path d="M100 80 Q100 140 170 140 Q240 140 240 80 Z" fill="#E8E6E0"/><path d="M95 80 Q95 145 170 145 Q245 145 245 80" stroke="#A8A8A0" stroke-width="2" fill="none"/><rect x="85" y="72" width="170" height="14" rx="7" fill="#C8C6C0"/><rect x="78" y="72" width="14" height="28" rx="7" fill="#A8A8A0"/><rect x="248" y="72" width="14" height="28" rx="7" fill="#A8A8A0"/><path d="M100 86 Q135 92 170 88 Q205 84 240 86 L240 80 Q205 78 170 78 Q135 78 100 80 Z" fill="#B8D4F0" opacity=".5"/><circle cx="140" cy="110" r="4" fill="none" stroke="#A8A8A0" stroke-width="1.2" opacity=".5"/><circle cx="170" cy="100" r="3" fill="none" stroke="#A8A8A0" stroke-width="1.2" opacity=".4"/><circle cx="200" cy="112" r="5" fill="none" stroke="#A8A8A0" stroke-width="1.2" opacity=".5"/><ellipse cx="170" cy="108" rx="22" ry="16" fill="#8BAF6A" opacity=".75"/><ellipse cx="170" cy="104" rx="18" ry="12" fill="#9DC47A" opacity=".8"/><circle cx="162" cy="96" r="5" fill="#6B8A50"/><circle cx="178" cy="96" r="5" fill="#6B8A50"/><circle cx="162" cy="96" r="3" fill="#fff" opacity=".9"/><circle cx="178" cy="96" r="3" fill="#fff" opacity=".9"/><circle cx="163" cy="96" r="1.5" fill="#2A3A1A"/><circle cx="179" cy="96" r="1.5" fill="#2A3A1A"/><path d="M164 106 Q170 110 176 106" stroke="#5A7A40" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M150 118 Q140 128 132 124 Q138 120 148 122" fill="#8BAF6A" opacity=".7"/><path d="M190 118 Q200 128 208 124 Q202 120 192 122" fill="#8BAF6A" opacity=".7"/><path d="M148 70 Q144 60 148 50 Q152 40 148 30" stroke="#A8A8A0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".4"/><path d="M170 68 Q166 56 170 46 Q174 36 170 24" stroke="#A8A8A0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".4"/><path d="M192 70 Q188 60 192 50 Q196 40 192 30" stroke="#A8A8A0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".4"/><path d="M145 148 Q148 138 155 142 Q152 132 160 136 Q158 126 170 128 Q182 126 180 136 Q188 132 185 142 Q192 138 195 148 Z" fill="#66C220" opacity=".35"/></svg>'},
  {label:'In Organizations', title:'Culture doesn\u2019t rot overnight', desc:'No single incident poisoned the culture. But putting resentment above everything, did. It happened one accepted exception at a time. Someone raised their voice in a meeting \u2014 but later that got forgotten. Defamation started to be accepted. Obsessive control gets normalized. Manipulation becomes evaluation framework. Blame shifting is not publicly condamned. The language consistently shifts to passive aggressions and insults. A executive assistant get bullied to bully more colleagues. Animosity turns into fixation. Each event quietly reset the baseline of what was tolerable. Over time, the organization stopped calling things by their name. Dysfunction became \u201cour style.\u201d Impunity became \u201csenior privilege.\u201d The water was warm and everyone had already adjusted. People are seeing it, they say that "culture is really turning out", that they hope "they will stop being kids, and keep the ship steady" or that "everything will fix by itself". They just do not tell to you :) but luckly there is me letting you know that people are watching the show! ', svg:'<svg viewBox="0 0 340 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px;display:block;margin:0 0 16px"><rect x="20" y="10" width="70" height="90" rx="4" fill="#fff" stroke="#D0CEC8" stroke-width="1.5"/><rect x="20" y="10" width="70" height="16" rx="4" fill="#E8E6E0"/><text x="55" y="22" font-size="7.5" fill="#A8A8A0" text-anchor="middle" font-family="DM Sans,sans-serif" font-weight="500">OUR VALUES</text><line x1="30" y1="38" x2="80" y2="38" stroke="#E8E6E0" stroke-width="1.5" stroke-linecap="round"/><line x1="30" y1="50" x2="75" y2="50" stroke="#E8E6E0" stroke-width="1.5" stroke-linecap="round"/><line x1="30" y1="62" x2="78" y2="62" stroke="#E8E6E0" stroke-width="1.5" stroke-linecap="round"/><line x1="30" y1="74" x2="70" y2="74" stroke="#E8E6E0" stroke-width="1.5" stroke-linecap="round"/><circle cx="55" cy="10" r="4" fill="#A8A8A0" opacity=".5"/><circle cx="140" cy="38" r="10" fill="#C8C6C0"/><path d="M128 70 Q130 55 140 52 Q150 55 152 70 L148 70 Q147 60 140 58 Q133 60 132 70 Z" fill="#C8C6C0"/><circle cx="200" cy="38" r="10" fill="#B0AEA8"/><path d="M188 70 Q190 55 200 52 Q210 55 212 70 L208 70 Q207 60 200 58 Q193 60 192 70 Z" fill="#B0AEA8"/><path d="M188 58 Q182 54 180 50" stroke="#B0AEA8" stroke-width="3" stroke-linecap="round"/><path d="M212 58 Q218 54 220 50" stroke="#B0AEA8" stroke-width="3" stroke-linecap="round"/><circle cx="260" cy="38" r="10" fill="#9A9890"/><path d="M248 70 Q250 55 260 52 Q270 55 272 70 L268 70 Q267 60 260 58 Q253 60 252 70 Z" fill="#9A9890"/><rect x="255" y="46" width="10" height="14" rx="2" fill="#6B6B65" opacity=".4"/><path d="M148 28 Q158 18 170 20 Q182 18 182 28 Q182 36 170 36 Q162 37 158 40 L160 34 Q148 34 148 28 Z" fill="#F5F4F0" stroke="#D0CEC8" stroke-width="1"/><text x="165" y="30" font-size="6" fill="#A8A8A0" text-anchor="middle" font-family="DM Sans,sans-serif">not that bad</text><rect x="305" y="20" width="12" height="100" rx="6" fill="#F5F4F0" stroke="#D0CEC8" stroke-width="1.2"/><rect x="307" y="50" width="8" height="68" rx="4" fill="#66C220" opacity=".3"/><circle cx="311" cy="122" r="8" fill="#66C220" opacity=".35"/><line x1="10" y1="110" x2="295" y2="110" stroke="#E8E6E0" stroke-width="1.5"/></svg>'},
  {label:'The Warning Signs', title:'Listen for the language of adaptation', desc:'The clearest signal is when people stop naming things. Nobody calls it a toxic dynamic anymore \u2014 it just becomes \u201cthe way things are.\u201d Watch for: \u201cthat\u2019s just how he is,\u201d \u201cyou are thinking at the past \u2014 focus on the future,\u201d \u201cwe have tried but it didn\u2019t work,\u201d or \u201crequires factual analysis.\u201d These are not descriptions of reality. They are evidence that the frog has stopped feeling the heat \u2014 and started defending the temperature.', svg:'<svg viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px;display:block;margin:0 0 16px"><path d="M38 50 Q20 50 20 75 Q20 100 38 100 Q50 100 52 90 Q44 88 42 75 Q44 62 52 60 Z" fill="#C8C6C0" opacity=".6"/><path d="M38 58 Q28 58 28 75 Q28 92 38 92 Q44 92 46 84 Q40 82 39 75 Q40 68 46 66 Z" fill="#B0AEA8" opacity=".5"/><rect x="65" y="12" width="118" height="26" rx="8" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><path d="M76 38 L70 46 L82 38" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><text x="124" y="28" font-size="8" fill="#6B6B65" text-anchor="middle" font-family="DM Sans,sans-serif">\u201cthat\u2019s just how he is\u201d</text><rect x="190" y="48" width="130" height="26" rx="8" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><path d="M200 74 L195 82 L207 74" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><text x="255" y="59" font-size="7.5" fill="#6B6B65" text-anchor="middle" font-family="DM Sans,sans-serif"><tspan x="255" dy="0">you are thinking at the past.</tspan><tspan x="255" dy="10">focus on the future</tspan></text><rect x="58" y="78" width="104" height="26" rx="8" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><path d="M68 104 L62 112 L74 104" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><text x="110" y="89" font-size="7.5" fill="#6B6B65" text-anchor="middle" font-family="DM Sans,sans-serif"><tspan x="110" dy="0">we have tried...</tspan><tspan x="110" dy="10">but it didn\u2019t work</tspan></text><rect x="175" y="112" width="108" height="26" rx="8" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><path d="M185 112 L180 104 L192 112" fill="#F5F4F0" stroke="#A8A8A0" stroke-width="1.2"/><text x="229" y="128" font-size="8" fill="#6B6B65" text-anchor="middle" font-family="DM Sans,sans-serif">requires factual analysis</text></svg>'},
  {label:'The Antidote', title:'Take an iced shower', desc:'The only reliable way to feel the temperature again is to introduce a perspective that has not adapted to it. Ask what a new hire would find alarming in their first week. Create regular moments where the question is not \u201chow do we improve\u201d but \u201cwhat have we learned to tolerate that we should not.\u201d The goal is not to create panic. It is to recover the ability to name things \u2014 and by naming them, reclaim the choice of whether to accept them.', svg:'<svg viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px;display:block;margin:0 0 16px"><circle cx="60" cy="55" r="11" fill="#B0AEA8"/><path d="M47 90 Q50 72 60 70 Q70 72 73 90 L69 90 Q68 76 60 74 Q52 76 51 90 Z" fill="#B0AEA8"/><path d="M50 78 Q45 85 44 90" stroke="#B0AEA8" stroke-width="2.5" stroke-linecap="round"/><path d="M70 78 Q75 85 76 90" stroke="#B0AEA8" stroke-width="2.5" stroke-linecap="round"/><circle cx="115" cy="58" r="11" fill="#B0AEA8"/><path d="M102 90 Q105 74 115 72 Q125 74 128 90 L124 90 Q123 78 115 76 Q107 78 106 90 Z" fill="#B0AEA8"/><text x="122" y="48" font-size="9" fill="#A8A8A0" font-family="DM Sans,sans-serif" opacity=".7">z</text><text x="130" y="40" font-size="11" fill="#A8A8A0" font-family="DM Sans,sans-serif" opacity=".5">z</text><line x1="170" y1="20" x2="170" y2="130" stroke="#E8E6E0" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="230" cy="52" r="11" fill="#8BAF6A" opacity=".8"/><path d="M217 90 Q220 70 230 68 Q240 70 243 90 L239 90 Q238 74 230 72 Q222 74 221 90 Z" fill="#8BAF6A" opacity=".8"/><circle cx="227" cy="50" r="2" fill="#fff"/><circle cx="233" cy="50" r="2" fill="#fff"/><circle cx="227.8" cy="50.5" r="1" fill="#2A3A1A"/><circle cx="233.8" cy="50.5" r="1" fill="#2A3A1A"/><text x="248" y="38" font-size="22" fill="#66C220" font-family="DM Sans,sans-serif" font-weight="300" opacity=".7">?</text><circle cx="218" cy="78" r="8" fill="none" stroke="#66C220" stroke-width="2" opacity=".6"/><line x1="224" y1="84" x2="230" y2="90" stroke="#66C220" stroke-width="2" stroke-linecap="round" opacity=".6"/><text x="87" y="112" font-size="8" fill="#A8A8A0" text-anchor="middle" font-family="DM Sans,sans-serif">adapted</text><text x="255" y="112" font-size="8" fill="#66C220" text-anchor="middle" font-family="DM Sans,sans-serif">observer</text></svg>'}
];

function wizHtml(wizId, items) {
  var cur = _wizState[wizId] !== undefined ? _wizState[wizId] : 0;
  var html = '<div id="wiz-' + wizId + '">';
  for (var i = 0; i < items.length; i++) {
    var item  = items[i];
    var done   = i < cur;
    var active = i === cur;
    var cls = 'wiz-item' + (done ? ' wiz-done' : '') + (active ? ' wiz-active' : '');
    var numHtml = done
      ? '<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#3B6D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : String(i + 1);
    var bodyHtml = '';
    if (active) {
      var navHtml = '<div class="wiz-nav">';
      if (i > 0) navHtml += '<button class="wiz-btn wiz-btn-back" data-wiz="' + wizId + '" data-wiz-dir="-1">\u2190 Back</button>';
      if (i < items.length - 1) {
        navHtml += '<button class="wiz-btn wiz-btn-next" data-wiz="' + wizId + '" data-wiz-dir="1">Next \u2192</button>';
      } else {
        navHtml += '<button class="wiz-btn wiz-btn-restart" data-wiz-restart="' + wizId + '"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M13.5 5.5A6 6 0 1 0 14 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M14 2v4h-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Restart journey</button>';
      }
      navHtml += '</div>';
      bodyHtml = '<div class="wiz-body">'
        + (item.svg || '')
        + (item.html ? item.html : '<div class="res-card-desc">' + item.desc + '</div>')
        + navHtml
        + '</div>';
    }
    html += '<div class="' + cls + '" data-wiz-toggle="' + wizId + '" data-wiz-idx="' + i + '">'
      + '<div class="wiz-header">'
      + '<div class="wiz-num">' + numHtml + '</div>'
      + '<div class="wiz-header-text">'
      + '<div class="wiz-eyebrow">' + item.label + '</div>'
      + '<div class="wiz-title">' + item.title + '</div>'
      + '</div>'
      + '<svg class="wiz-chevron" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '</div>'
      + bodyHtml
      + '</div>';
  }
  html += '</div>';
  return html;
}

function wizSetIndex(wizId, idx, items) {
  _wizState[wizId] = Math.max(0, Math.min(items.length - 1, idx));
  var el = document.getElementById('wiz-' + wizId);
  if (el) el.outerHTML = wizHtml(wizId, items);
}


function wizReadTime(items) {
  var text = items.map(function(item) {
    var raw = (item.desc || '') + (item.html || '') + item.title;
    return raw.replace(/<[^>]+>/g, ' ');
  }).join(' ');
  var words = text.trim().split(/\s+/).length;
  var mins  = Math.ceil(words / 200);
  return mins;
}

function readTimeBadge(mins) {
  return '<span class="read-time-badge">'
    + '<svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M8 5v3.5l2 1.5"/></svg>'
    + ' \u2248\u00a0' + mins + ' min read'
    + '</span>';
}

function renderResources() {
  if (_wizState['patterns'] === undefined) _wizState['patterns'] = 0;
  return '<div class="ptitle">Recognize the Patterns</div>'
    + '<div class="psub psub-row">A guided journey through a very specific dynamic \u2014 sometime similar to a disturb'
    + readTimeBadge(wizReadTime(_wizItemsPatterns))
    + '</div>'
    + '<blockquote class="res-quote">'
    + '\u201cHe who fights with monsters should look to it that he himself does not become a monster. And if you gaze long into an abyss, the abyss also gazes into you.\u201d'
    + '<footer>\u2014 Friedrich Nietzsche, <em>Beyond Good and Evil</em> (1886), Aphorism 146</footer>'
    + '</blockquote>'
    + wizHtml('patterns', _wizItemsPatterns);
}

function renderBoilingFrog() {
  if (_wizState['frog'] === undefined) _wizState['frog'] = 0;
  return '<div class="ptitle">The Boiling Frog Theory</div>'
    + '<div class="psub psub-row">How Organizations learn to normalize and tolerate things that are not normal'
    + readTimeBadge(wizReadTime(_wizItemsFrog))
    + '</div>'
    + '<blockquote class="res-quote">'
    + '\u201cThe first step in developing a learning organization is to foster a climate where people can challenge their own and others\u2019 mental models and tell the truth about what is actually happening.\u201d'
    + '<footer>\u2014 Peter Senge,<em>The Fifth Discipline: The Art &amp; Practice of The Learning Organization</em></footer>'
    + '</blockquote>'
    + wizHtml('frog', _wizItemsFrog);
}
