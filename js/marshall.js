// marshall.js — Ask Marshall overlay chat


var MARSHALL_PHOTO = 'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1775773451/marshall_kxcgxb.jpg';

var MARSHALL_RESPONSES = [
  "Look, it's all about ROI. Everything is about ROI. If you can't quantify the ROI of what you're doing, are you even doing anything? That's Leadership 101.",
  "I've seen this exact problem before. The ROI was negative. I fixed it. That's what leaders do. You're welcome.",
  "Okay so let me break this down for you in simple terms. The UX is the problem. It's always the UX. Mike Don told me the same thing last week and he's never wrong.",
  "Hold on — Todd is calling me I have to go. But quick answer: you need to think about this from a Leadership perspective, not an IC perspective. We'll circle back.",
  "That's a very entry-level question. No offense. But as a Leader, I've already internalized the answer. It's about maximizing ROI while optimizing UX. Obviously.",
  "Mike Don told me something very relevant to this at dinner last Thursday. I can't share the details — NDA — but trust me, the ROI implications are massive.",
  "Let me stop you right there. I already know where you're going with this and the ROI doesn't justify it. I ran the numbers in my head. Leadership is about saying no.",
  "So essentially what you're asking is a UX question disguised as a strategy question. I see through these things because that's what Leadership gives you — clarity.",
  "Sorry, Todd is calling me I have to go, but real quick: the answer is ROI. It's always ROI. When in doubt, ROI. Mike Don agrees. Gotta run.",
  "With all due respect, this is a solved problem. I solved it. The ROI was 340%. Mike Don said it was the best execution he'd ever seen. His words, not mine.",
  "Interesting question. Not as interesting as you think it is. A true Leader would reframe this as a UX challenge with ROI implications. Which is what I just did for you.",
  "I'm going to give you the answer, but I need you to understand something first: Leadership isn't about asking the right questions. It's about already knowing the answers. Like I do.",
  "The UX on this is all wrong. I can tell just by looking at it. Mike Don told me he had the same instinct and he's been in UX for — actually I don't know how long. Long enough.",
  "Oh hold on, Todd is calling me I have to go. But before I do: the ROI story here is clear. You need to 10x the Leadership alignment on UX. That's my final answer.",
  "I don't mean to mansplain — actually, yes I do. Someone has to. The real issue is that your Leadership team hasn't thought about the ROI of good UX. Unlike me. I think about it daily.",
  "Oh, this? I literally solved this in my head while you were still typing. It's intuitive for Leaders who understand ROI. Mike Don calls it 'the instinct'. I have it.",
  "You know what your problem is? You're thinking like someone who doesn't understand ROI. Think like a Leader. Think like Mike Don. Think like me. Problem solved.",
  "I'm not saying I'm always right about UX. I'm saying the ROI of listening to me has been historically positive. Ask Mike Don. Or Todd. Actually Todd is calling me I have to go.",
  "That's cute. You think that's a hard problem. When Mike Don and I redesigned the entire UX at [REDACTED], we delivered 500% ROI. Before lunch. Leadership.",
  "Quick answer because Todd is calling me I have to go: it's a Leadership gap. The ROI is there, the UX is there, but nobody is Leading. Except me. When I'm available. Which is now. Actually no, Todd is calling.",
  "Mike Don told me — and I quote — 'Marshall, you're the only one who gets UX and ROI at the same time.' I didn't ask for the compliment. Leaders don't. It just happens.",
  "See, this is exactly why Leadership matters. Without someone like me connecting the dots between UX and ROI, teams just wander. Mike Don saw it too. He called it 'the Marshall effect'.",
  "Real quick before Todd calls me again: the ROI on this initiative is negative unless you fix the UX. I know because I've seen this pattern fourteen times. Fifteen now. Leadership.",
  "I appreciate the question. I really do. But a Leader would already know the answer. The ROI speaks for itself. Mike Don would agree. Todd would too but he's always on the phone."
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
    _marshallMessages.push({from: 'marshall', text: "Marshall here. Go ahead, ask me anything \u2014 Mike Don says I have a gift for making complex things simple. His words. Leadership."});
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
