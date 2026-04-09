// marshall.js — Ask Marshall overlay chat


var MARSHALL_PHOTO = 'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775773451/marshall_kxcgxb.jpg';

var MARSHALL_RESPONSES = [
  "Look, I'm not going to explain this twice. Actually, I will, because you clearly need it. The answer is obvious if you think about it for more than five seconds.",
  "I've seen this exact problem before at my previous company. We solved it in a weekend. I'm surprised your team hasn't figured it out yet.",
  "Okay so let me break this down for you in simple terms, since apparently that's necessary. It's basic project management. You're welcome.",
  "I actually wrote a LinkedIn post about this exact topic last week. 47 likes. You should read it before asking me questions you could Google.",
  "That's a very entry-level question. No offense. But if you'd attended the same conferences I have, you'd already know the answer.",
  "Let me stop you right there. I already know where you're going with this and you're wrong. Trust me, I've been in the industry long enough.",
  "So essentially what you're asking is something I mastered years ago. It's really not that complicated if you have the right mindset. Which I do.",
  "I don't want to be that guy, but... I'm going to be that guy. You're overthinking this. I solved a harder version of this before lunch last Tuesday.",
  "With all due respect — and I mean very little — this is a solved problem. I could explain it but I don't think the nuance would land.",
  "Interesting question. Not as interesting as you think it is, but interesting. I actually predicted this exact situation months ago. Nobody listened.",
  "Have you tried approaching it the way I would? Probably not, which is why you're stuck. Let me tell you how a senior person would handle this.",
  "I'm going to give you the answer, but I need you to understand that I'm not doing your job for you. I'm mentoring you. There's a difference.",
  "This reminds me of a case study from Harvard Business Review. You probably haven't read it. Anyway, the short version is: I was right all along.",
  "I'll be honest with you because nobody else will. This is a fundamentally flawed question. But don't worry, I'll answer it anyway because I'm generous.",
  "I don't mean to mansplain — actually, yes I do. Someone has to. The real issue here is that you lack the strategic vision to see the bigger picture. Like I do.",
  "Oh, this? I literally solved this in my head while you were still typing. It's intuitive for people who operate at a certain level.",
  "Let me put on my consulting hat for a second. That'll be $450 an hour. Just kidding. But seriously, the answer is what I already told you last time.",
  "You know what your problem is? You're thinking like an individual contributor. Think like a leader. Think like me. Problem solved.",
  "I'm not saying I'm always right. I'm saying I haven't been proven wrong yet. And your question doesn't change that streak.",
  "That's cute. You think that's a hard problem. When I was at [REDACTED], we dealt with issues ten times more complex before standup."
];

var _marshallOpen = false;
var _marshallMessages = [];

function marshallGetResponse() {
  return MARSHALL_RESPONSES[Math.floor(Math.random() * MARSHALL_RESPONSES.length)];
}

function marshallAvatar(size) {
  size = size || 28;
  return '<img src="' + MARSHALL_PHOTO + '" style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;object-fit:cover;flex-shrink:0" alt="Marshall" />';
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
      + marshallAvatar(28)
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
  inp.style.height = '32px';
  marshallRenderMessages();
  setTimeout(function() {
    _marshallMessages.push({from: 'marshall', text: marshallGetResponse()});
    marshallRenderMessages();
  }, 600 + Math.random() * 800);
}

function marshallAutoGrow(el) {
  el.style.height = '32px';
  if (el.scrollHeight > 32) el.style.height = Math.min(el.scrollHeight, 96) + 'px';
}

function marshallToggle() {
  if (_marshallOpen) { marshallClose(); return; }
  _marshallOpen = true;

  var el = document.createElement('div');
  el.id = 'marshall-overlay';
  el.style.cssText = 'position:fixed;top:52px;right:24px;width:340px;z-index:900;background:var(--surface);border:1px solid var(--border);border-radius:0 0 12px 12px;box-shadow:0 8px 32px rgba(0,0,0,.12);display:flex;flex-direction:column;max-height:calc(100vh - 72px);';

  el.innerHTML = '<div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">'
    + '<div style="display:flex;align-items:center;gap:8px">'
    + marshallAvatar(24)
    + '<span style="font-size:13px;font-weight:500;color:var(--text)">Ask Marshall</span>'
    + '<span style="font-size:10px;color:var(--faint);background:var(--bg);padding:1px 6px;border-radius:10px">online</span>'
    + '</div>'
    + '<button id="marshall-close" style="background:none;border:none;cursor:pointer;color:var(--faint);padding:2px" title="Close"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>'
    + '</div>'
    + '<div id="marshall-messages" style="flex:1;overflow-y:auto;padding:16px;min-height:200px;max-height:360px"></div>'
    + '<div style="padding:10px 12px;border-top:1px solid var(--border);display:flex;gap:8px;align-items:flex-end">'
    + '<textarea id="marshall-input" rows="1" placeholder="Ask a question\u2026" style="flex:1;min-height:32px;max-height:96px;padding:6px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;font-family:inherit;background:var(--bg);color:var(--text);outline:none;resize:none;line-height:1.5;overflow-y:auto"></textarea>'
    + '<button id="marshall-send" style="height:32px;padding:0 12px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:11px;font-weight:500;font-family:inherit;cursor:pointer;white-space:nowrap;flex-shrink:0">Send</button>'
    + '</div>';

  document.body.appendChild(el);

  if (_marshallMessages.length === 0) {
    _marshallMessages.push({from: 'marshall', text: "Hey. Marshall here. Go ahead, ask me anything \u2014 but honestly, I probably already know what you\u2019re going to ask. And the answer."});
  }
  marshallRenderMessages();

  document.getElementById('marshall-close').onclick = marshallClose;
  document.getElementById('marshall-send').onclick = marshallSubmit;
  var inp = document.getElementById('marshall-input');
  inp.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); marshallSubmit(); }
  });
  inp.addEventListener('input', function() { marshallAutoGrow(inp); });
  setTimeout(function() { inp.focus(); }, 50);
}

function marshallClose() {
  _marshallOpen = false;
  var el = document.getElementById('marshall-overlay');
  if (el) el.remove();
}

document.getElementById('askMarshallBtn').addEventListener('click', marshallToggle);
