// marshall.js — Ask Marshall overlay chat


var MARSHALL_RESPONSES = [
  "That's a great question. Unfortunately, I have absolutely no idea.",
  "Have you tried turning it off and on again?",
  "I'm going to need at least three espressos before I can answer that.",
  "The answer is 42. It's always 42.",
  "Let me consult my crystal ball... it says 'Ask again later'.",
  "Bold of you to assume I know things.",
  "I asked the frog. The frog said no.",
  "That's above my pay grade. Way above.",
  "I could tell you, but then I'd have to bill you.",
  "My sources say... actually, I don't have sources.",
  "Short answer: yes. Long answer: yeeeeeeeees.",
  "I'll get back to you in 6 to 8 business weeks.",
  "Have you considered just vibing instead?",
  "That's what the backlog is for.",
  "According to the roadmap, that's a Q7 initiative.",
  "I'm not saying it's scope creep, but... it's scope creep.",
  "Let me escalate this to someone who cares. Oh wait, that's me. Hmm.",
  "The data says one thing. My gut says another. Let's go with the gut.",
  "Interesting. Very interesting. I have no follow-up.",
  "Can we take this offline? And by offline I mean never discuss it again."
];

var _marshallOpen = false;
var _marshallMessages = [];

function marshallGetResponse() {
  return MARSHALL_RESPONSES[Math.floor(Math.random() * MARSHALL_RESPONSES.length)];
}

function marshallRenderMessages() {
  var wrap = document.getElementById('marshall-messages');
  if (!wrap) return;
  wrap.innerHTML = _marshallMessages.map(function(m) {
    if (m.from === 'user') {
      return '<div style="display:flex;justify-content:flex-end;margin-bottom:10px">'
        + '<div style="background:var(--accent);color:#fff;padding:8px 12px;border-radius:12px 12px 2px 12px;font-size:12px;max-width:80%;line-height:1.5">'
        + m.text + '</div></div>';
    }
    return '<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:10px">'
      + '<div style="width:28px;height:28px;border-radius:50%;background:#0D1E36;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;font-weight:500;color:#fff;letter-spacing:.3px" id="marshall-avatar">M</div>'
      + '<div style="background:var(--bg);border:1px solid var(--border);padding:8px 12px;border-radius:2px 12px 12px 12px;font-size:12px;max-width:80%;line-height:1.5;color:var(--text)">'
      + m.text + '</div></div>';
  }).join('');
  wrap.scrollTop = wrap.scrollHeight;
}

function marshallSubmit() {
  var inp = document.getElementById('marshall-input');
  if (!inp) return;
  var q = inp.value.trim();
  if (!q) return;
  _marshallMessages.push({from: 'user', text: q});
  inp.value = '';
  marshallRenderMessages();
  setTimeout(function() {
    _marshallMessages.push({from: 'marshall', text: marshallGetResponse()});
    marshallRenderMessages();
  }, 600 + Math.random() * 800);
}

function marshallToggle() {
  if (_marshallOpen) { marshallClose(); return; }
  _marshallOpen = true;

  var el = document.createElement('div');
  el.id = 'marshall-overlay';
  el.style.cssText = 'position:fixed;top:52px;right:24px;width:340px;z-index:900;background:var(--surface);border:1px solid var(--border);border-radius:0 0 12px 12px;box-shadow:0 8px 32px rgba(0,0,0,.12);display:flex;flex-direction:column;max-height:calc(100vh - 72px);';

  el.innerHTML = '<div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">'
    + '<div style="display:flex;align-items:center;gap:8px">'
    + '<div style="width:24px;height:24px;border-radius:50%;background:#0D1E36;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:500;color:#fff;letter-spacing:.3px">M</div>'
    + '<span style="font-size:13px;font-weight:500;color:var(--text)">Ask Marshall</span>'
    + '<span style="font-size:10px;color:var(--faint);background:var(--bg);padding:1px 6px;border-radius:10px">online</span>'
    + '</div>'
    + '<button id="marshall-close" style="background:none;border:none;cursor:pointer;color:var(--faint);padding:2px" title="Close"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>'
    + '</div>'
    + '<div id="marshall-messages" style="flex:1;overflow-y:auto;padding:16px;min-height:200px;max-height:360px"></div>'
    + '<div style="padding:10px 12px;border-top:1px solid var(--border);display:flex;gap:8px">'
    + '<input id="marshall-input" type="text" placeholder="Ask a question\u2026" style="flex:1;height:32px;padding:0 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;font-family:inherit;background:var(--bg);color:var(--text);outline:none" />'
    + '<button id="marshall-send" style="height:32px;padding:0 12px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:11px;font-weight:500;font-family:inherit;cursor:pointer;white-space:nowrap">Send</button>'
    + '</div>';

  document.body.appendChild(el);

  if (_marshallMessages.length === 0) {
    _marshallMessages.push({from: 'marshall', text: "Hey! I'm Marshall. Ask me anything \u2014 I can't promise useful answers, but I'll be entertaining."});
  }
  marshallRenderMessages();

  document.getElementById('marshall-close').onclick = marshallClose;
  document.getElementById('marshall-send').onclick = marshallSubmit;
  document.getElementById('marshall-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') marshallSubmit();
  });
  setTimeout(function() { document.getElementById('marshall-input').focus(); }, 50);
}

function marshallClose() {
  _marshallOpen = false;
  var el = document.getElementById('marshall-overlay');
  if (el) el.remove();
}

document.getElementById('askMarshallBtn').addEventListener('click', marshallToggle);
