// marshall.js — Ask Marshall overlay chat


var MARSHALL_PHOTO = 'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1776080179/8_sllcoi.png';

var MARSHALL_RESPONSES = [
  "Look, it's all about ROI. Everything is about ROI. If you can't quantify the ROI of what you're doing, are you even doing anything? That's Leadership 101.",
  "I've seen this exact problem before. The ROI was negative. I fixed it. That's what leaders do. You're welcome.",
  "Okay so let me break this down for you in simple terms. The UX is the problem. It's always the UX. Don Michele told me the same thing last week and he's never wrong.",
  "Hold on \u2014 Paolo DiTaddeo is calling me I have to go. But quick answer: you need to think about this from a Leadership perspective, not an IC perspective. We'll circle back.",
  "That's a very entry-level question. No offense. But as a Leader, I've already internalized the answer. It's about maximizing ROI while optimizing UX. Obviously.",
  "Don Michele told me something very relevant to this at dinner last Thursday. I can't share the details \u2014 NDA \u2014 but trust me, the ROI implications are massive.",
  "Let me stop you right there. I already know where you're going with this and the ROI doesn't justify it. I ran the numbers in my head. Leadership is about saying no.",
  "So essentially what you're asking is a UX question disguised as a strategy question. I see through these things because that's what Leadership gives you \u2014 clarity.",
  "Sorry, Paolo DiTaddeo is calling me I have to go, but real quick: the answer is ROI. It's always ROI. When in doubt, ROI. Don Michele agrees. Gotta run.",
  "With all due respect, this is a solved problem. I solved it. The ROI was 340%. Don Michele said it was the best execution he'd ever seen. His words, not mine.",
  "Interesting question. Not as interesting as you think it is. A true Leader would reframe this as a UX challenge with ROI implications. Which is what I just did for you.",
  "I'm going to give you the answer, but I need you to understand something first: Leadership isn't about asking the right questions. It's about already knowing the answers. Like I do.",
  "The UX on this is all wrong. I can tell just by looking at it. Don Michele told me he had the same instinct and he's been in UX for \u2014 actually I don't know how long. Long enough.",
  "Oh hold on, Paolo DiTaddeo is calling me I have to go. But before I do: the ROI story here is clear. You need to 10x the Leadership alignment on UX. That's my final answer.",
  "I don't mean to mansplain \u2014 actually, yes I do. Someone has to. The real issue is that your Leadership team hasn't thought about the ROI of good UX. Unlike me. I think about it daily.",
  "Oh, this? I literally solved this in my head while you were still typing. It's intuitive for Leaders who understand ROI. Don Michele calls it 'the instinct'. I have it.",
  "You know what your problem is? You're thinking like someone who doesn't understand ROI. Think like a Leader. Think like Don Michele. Think like me. Problem solved.",
  "I'm not saying I'm always right about UX. I'm saying the ROI of listening to me has been historically positive. Ask Don Michele. Or Paolo DiTaddeo. Actually Paolo DiTaddeo is calling me I have to go.",
  "That's cute. You think that's a hard problem. When Don Michele and I redesigned the entire UX at [REDACTED], we delivered 500% ROI. Before lunch. Leadership.",
  "Quick answer because Paolo DiTaddeo is calling me I have to go: it's a Leadership gap. The ROI is there, the UX is there, but nobody is Leading. Except me. When I'm available. Which is now. Actually no, Paolo DiTaddeo is calling.",
  "Don Michele told me \u2014 and I quote \u2014 'Maresciallo, you're the only one who gets UX and ROI at the same time.' I didn't ask for the compliment. Leaders don't. It just happens.",
  "See, this is exactly why Leadership matters. Without someone like me connecting the dots between UX and ROI, teams just wander. Don Michele saw it too. He called it 'the Maresciallo effect'.",
  "Real quick before Paolo DiTaddeo calls me again: the ROI on this initiative is negative unless you fix the UX. I know because I've seen this pattern fourteen times. Fifteen now. Leadership.",
  "I appreciate the question. I really do. But a Leader would already know the answer. The ROI speaks for itself. Don Michele would agree. Paolo DiTaddeo would too but he's always on the phone."
];

var _marshallOpen = false;
var _marshallMessages = [];

function marshallGetResponse() {
  return MARSHALL_RESPONSES[Math.floor(Math.random() * MARSHALL_RESPONSES.length)];
}

function marshallAvatar(size) {
  size = size || 28;
  var barH = Math.round(size * 0.22);
  var barTop = Math.round(size * 0.32);
  return '<div class="marshall-avatar" style="width:' + size + 'px;height:' + size + 'px">'
    + '<img src="' + MARSHALL_PHOTO + '" alt="Maresciallo" />'
    + '<div class="marshall-avatar-bar" style="top:' + barTop + 'px;height:' + barH + 'px"></div>'
    + '</div>';
}

function marshallRenderMessages() {
  var wrap = document.getElementById('marshall-messages');
  if (!wrap) return;
  wrap.innerHTML = _marshallMessages.map(function(m) {
    if (m.from === 'user') {
      return '<div class="marshall-msg-user">'
        + '<div class="marshall-msg-user-bubble">' + m.text + '</div></div>';
    }
    return '<div class="marshall-msg-bot">'
      + marshallAvatar(28)
      + '<div class="marshall-msg-bot-bubble">' + m.text + '</div></div>';
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
  el.className = 'marshall-overlay';

  el.innerHTML = '<div class="marshall-header">'
    + '<div class="marshall-header-left">'
    + marshallAvatar(24)
    + '<span class="marshall-name">Ask the Guru</span>'
    + '<span class="marshall-status">online</span>'
    + '</div>'
    + '<button class="marshall-close-btn" id="marshall-close" title="Close"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>'
    + '</div>'
    + '<div class="marshall-messages" id="marshall-messages"></div>'
    + '<div class="marshall-input-wrap">'
    + '<textarea class="marshall-input" id="marshall-input" rows="1" placeholder="Ask a question\u2026"></textarea>'
    + '<button class="marshall-send-btn" id="marshall-send">Send</button>'
    + '</div>';

  document.body.appendChild(el);

  if (_marshallMessages.length === 0) {
    _marshallMessages.push({from: 'marshall', text: "Ciao, sono Marcello Maresciallo. I\u2019m going to explain what you don\u2019t know \u2014 and, between us, what I don\u2019t know either. But I\u2019ll explain it with confidence. Don\u2019t worry, girl. That\u2019s Leadership."});
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
