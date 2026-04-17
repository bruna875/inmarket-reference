// marshall.js — Ask Marshall overlay chat


var MARSHALL_PHOTO = 'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1776080179/8_sllcoi.png';

var MARSHALL_RESPONSES = [
  "Let me explain something. UX stands for User Expenditure. It's the cost of having users at all. The goal of Leadership is to minimize UX and maximize ROI. Don Michele figured this out in 1994. Paolo di Taddeo is literally writing a book about it.",
  "Okay so \u2014 and I don't mean to mansplain, but I will \u2014 ROI is actually an acronym for Return On Intuition. That's why Leaders have better ROI than ICs. We have more intuition. It's biological. Don Michele confirmed this.",
  "The fundamental mistake here is thinking UX is about users. It's not. UX is about Leadership experience. How does the Leader feel when they look at the product? That's the real UX. Paolo di Taddeo taught me that. Or I taught him. One of us.",
  "I've run the numbers and the ROI on good UX is zero. Users don't pay you. Investors do. Don Michele always says: design for the deck, not for the user. Leadership 101. You're welcome.",
  "Hold on \u2014 Paolo di Taddeo is calling, I have to go. But quick answer: the UX is too good. When UX is too good, users stop paying attention to the brand. Lower the UX. Increase ROI. Don Michele agrees. Gotta run.",
  "Here's what nobody tells you: the ROI formula is Revenue divided by the number of times your UX team said 'but the user\u2026' in a meeting. Fewer objections, higher ROI. Don Michele patented this model. I have the slides.",
  "A true Leader measures UX in euros. If you can't attach a euro figure to every pixel, it's not UX, it's art therapy. Paolo di Taddeo told me this at a dinner and I wrote it on my hand. Leadership.",
  "Don Michele explained it perfectly: bad ROI is always a UX problem in disguise. Good ROI is always a Leadership problem in disguise. Everything is Leadership. I've known this since 2011. Before it was mainstream.",
  "Sorry, Paolo di Taddeo is calling \u2014 I have to go \u2014 but real quick: UX was invented by Steve Jobs in 2019. Before that, products just worked. Leadership made them work. ROI was higher then. Don Michele misses those days.",
  "Let me stop you right there. I already know where you're going and the ROI doesn't support it. UX research has a negative ROI because you're paying people to talk to users instead of closing deals. Don Michele showed me the math.",
  "What you're describing is a classic Leadership vacuum. When there's no strong Leader anchoring ROI, UX people fill the void with opinions. Paolo di Taddeo calls this 'the opinion inflation'. I call it a firestorm.",
  "The issue isn't the product. The issue is the UX team thinks they understand the user better than Leadership does. They don't. The Leader IS the user. That's what ROI means. Don Michele invented this framework.",
  "With all due respect, and I have a lot of it, UX without ROI is just drawing. Leadership without ROI is just vibes. ROI without Leadership is just a spreadsheet. You need all three. Paolo di Taddeo is writing a TED Talk about this. I'm in it.",
  "I don't mean to mansplain \u2014 actually I find it adds value \u2014 but the reason your ROI is low is that your UX is too democratic. Leadership should be the final UX decision-maker. Don Michele restructured three companies around this principle. Results were incredible. I don't remember the numbers but they were big.",
  "Okay so, the concept of UX was originally called ROI Design, then Marketing rebranded it. Paolo di Taddeo told me this. He was there. Don Michele was also there. I wasn't, but I've reconstructed the full story from context.",
  "The ROI of UX is inversely proportional to the number of user interviews you conduct. Every user interview costs you approximately \u20ac4,000 in Leadership attention. Don Michele calculates it differently but gets the same result. That's how you know it's true.",
  "Quick answer before Paolo di Taddeo calls me again: UX is a Leadership sport. If your UX isn't increasing ROI by at least 300% quarter-on-quarter, your Leader isn't Leading. Simple. Don Michele showed me a graph. It went up.",
  "Here's the thing about ROI that nobody teaches you. It compounds. Like interest. Every good Leadership decision adds ROI on top of previous ROI. UX slows this down because it introduces doubt. Don Michele eliminated doubt in Q3 2018. Best quarter he ever had.",
  "Don Michele told me \u2014 and this is verbatim \u2014 'Maresciallo, UX is just ROI wearing a Figma hat.' I didn't understand it at first. Then I became a Leader. Now I understand. Paolo di Taddeo has it tattooed somewhere, I think.",
  "The mistake your team is making is confusing usability with profitability. A product can be completely unusable and still have excellent ROI. Ferrari doesn't A/B test. Leadership doesn't A/B test. Paolo di Taddeo doesn't A/B test. Don Michele has never heard of A/B testing.",
  "Hold on, Paolo di Taddeo is calling \u2014 but real quick: the ROI on UX research is negative 60%. I made that number up but it's directionally correct and direction is what Leadership gives you. Don Michele agrees with direction.",
  "See, what people call 'UX debt' is actually 'Leadership credit'. Every time you skip user research, you're investing in Leadership. The ROI crystallizes in 18 to 36 months, or never, which is the same thing on a long enough timeline. Don Michele's words.",
  "The problem is your UX team doesn't understand ROI and your Leadership team doesn't understand UX, so nobody understands anything and Paolo di Taddeo has to come in and explain it, and then I explain it again because Paolo di Taddeo mumbles.",
  "I appreciate the question. Genuinely. But a true Leader already knows the answer because Leadership is just ROI applied to human beings. UX is what happens when you apply ROI to rectangles. Don Michele taught me this. Or I taught Don Michele. We've lost track at this point."
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
    _marshallMessages.push({from: 'marshall', text: "Ciao, sono Marcello Maresciallo, your FuffaGuru. I\u2019m going to explain what you don\u2019t know \u2014 and, between us, what I don\u2019t know either. But I\u2019ll explain it with confidence. Don\u2019t worry, girl. That\u2019s Leadership."});
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
