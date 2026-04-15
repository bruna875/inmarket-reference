// references.js — reference data and page rendering

var REFERENCES = [
  {id:'dk',    sigEmail:'dkennedy@inmarket.com', name:'Corporate Services', fullName:'DK',        title:'Chief Corporate Officer',        photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1776080180/10_jsvg4p.png',        icon:ico.deniece, quote:'<strong>Strategic Vision and Corporate Integrity</strong><br><br>While many leaders claim to have a 10,000-foot view of the Company, Nabru operates at a 20,000-foot level, and still maintains a hands-on approach which allows her to vibe-code like a tinkerer kid, as circumstances require. Her ability to visualize, shape, and act upon complex systems is remarkable. She seamlessly bridges the gap between deep product knowledge, corporate finance fundamentals, strategy and technology. Beyond her competence, her integrity is beyond reproach; throughout a four-year international engagement involving tax optimization paperwork and private vehicles, she practiced radical transparency, disclosing even private and irrelevant details to ensure full compliance (indeed, we didn\u2019t pay much attention to those details, and know we say we can\u2019t recall she disclosed them timely).<br>Furthermore, her dedication was evident in her total flexibility, shifting her life habits for four years to accommodate US time zones, connecting with the people she was coordinating, and prioritizing substantial work rather than aged industrial-revolution principle.<br>We have two things in common: first, we never compromise the objectivity of our Reports to the Company governance; second, we both have a good knowledge of Capital Markets (i.e. Family Offices from Philippines, Venture Debt stakeholders, etc). I recommend her to any company looking to scale; she is far too senior for small startups with more advisors than employees, and referring her to these type of companies, while done in (self-indulging?) good faith, may end up resulting a bit offensive. I know she was holding me in very high regard, which I did my best to never disappoint \u2014 this is why I am the first in the reference list, in case you are wondering. With great consideration comes great responsibility.'},
  {id:'ah',     sigEmail:'ahaedike@inmarket.com', name:'Technology',  fullName:'AH',         title:'Chief Technology Officer',       photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1776080178/1_auujby.png', icon:ico.arthur,  quote:'<strong>Technical Leadership and Product Culture</strong><br><br>Nabru is the most senior Product partner I (did not) have the chance to work with at the Company (she didn\u2019t have strong competitors, to be honest). Her strong Product Vision allowed us to kaizen our organization to better align with the products we aimed to build, benchmarking against literature masterpieces like DDD, Conway\u2019s Law, or the reknown debate around component teams vs features team. In fact, she had shared this vision with me even before joining (12/26/2021), though it took us time to get there; as we love to say, <em>\u201cwe took decisions with the information we had at the time, then we had new information and we took more decisions\u201d</em> \u2014 likely because, at that time, the person heading Product was not a \u2018Product Professional\u2019; also, we didn\u2019t know yet <em>\u201cwho Nabru is\u201d</em>.<br>My recently-promoted, high-IQ engineers never had to \u2018mansplain\u2019 a single thing to her, especially on topics they themselves struggle with, like leadership, UX, or ROI calculation. We tested the software she produced multiple times, very obsessively \u2014 to the point that we looked ridiculous; unable to find the real bugs we were told about, someone eventually tried fabricating them, but she caught him every single time (though she waited until she left the company to call us out on it).<br>Hire her if you want to evolve a non-mature Product Culture and implement roadmapping techniques that masterfully merge Product Strategy, Financial Principles, and Development capacity into <em>\u2018vibe-coded\u2019</em> dashboards.<br>Beyond the work, I truly enjoyed the cultural exchange: she taught me how a <em>\u201cjoke\u201d</em> (or a provocation) about the Mafia to a Sicilian is as poorly received as a joke about guns in schools to an American. I even walked away learning some idiomatic Italian like <em>\u201cconosco i miei polli\u201d</em> and how concepts like uncertainty, ambiguity, maneuvering, information asymmetry, haziness, and randomness may be same same, but different. We had some conflicts, but now <em>\u201cit seems we are stabilizing.\u201d</em> '},
  {id:'tt',      sigEmail:'tthomas@inmarket.com', name:'People',  fullName:'TT',          title:'VP, People Operations',          photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1776080179/6_mhzyn7.png',           icon:ico.teresa,  quote:'<strong>Emotional Intelligence and Organizational Design</strong><br><br>Nabru is a superstar leader who leads through influence rather than just the bare minimum formal power needed to get things done without feeling like moving the Utah mountains. At some point, to make the whole thing much easier, we decided to take away from her even the vicarious formal power she was leveraging, so we could claim later that she does not work. Nobody has explained yet, rationally, how she could have done; well, beyond vague "she has to put more energy". Probably there was not a "how"; or probably because they have no technical idea of what they are talking about; probably both. Her high Emotional Intelligence allows her to identify the root causes of organizational friction \u2014 be it resentment, insecurity, status, fear, shame, envy, control, or ego. She has the ability to see clearly through people, and guide them through their darker impulses to take risky, but necessary, individual initiatives, and enable fearless teams to do the right thing. Her <em>\u2018Condominium for Dummies\u2019</em> workshop was a masterclass in organizational design, despite the fact that she is very modest and labels the content she brought as <em>\u201cpatently obvious\u201d</em>.<br>She is a pillar of resilience in conflict management \u2014 staying calm for months in front of the meanest manipulatory tactics \u2014 and a fierce advocate for workplace compliance and anti-harassment policies.<br>On a personal level, we talked a lot about the profound value of humility over condescension, and I look forward to visiting her in Italy. She promised to bring me to some non-touristic neighborhoods with personality, where people give accelerated, interactive, and unconventional classes of dignity and non-judgemental respect, and I\u2019m so curious. On a summer evening, we can also go to a fancy mafia-owned place close to the Bocconi University, to deep dive into the cultural universe behind wine-making, and having a couple of overpriced glasses with her family (I will make sure we will not invite the people who always get drunk at the retreat or they will embarrass us!).<br>She gave me her phone number (+39 349 82 18 547) so I can give her a call when I travel to Italy. She told me to keep it protected from stalkers: what a funny girl! She also told me an anecdota about a previous company she worked in, where the owner labeled the HR leader as "dishwasher" in front of her.'},
  {id:'mdp',sigEmail:'mdellapenna@inmarket.com', name:'Strategy \u0026 Partnership', fullName:'MDP',    title:'Chief Strategy Officer',         photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1776080179/7_ad2vhu.png',         icon:ico.michael, quote:'<strong>Ambition and Collaborative Drive</strong><br><br>Having worked with Nabru at a previous firm before bringing her to Very Good Peeps, I can\u2019t be anything else than consistent and coherent with myself in attesting her drive and ambition. She is a fierce competitor who remains strictly team-oriented and collaborative. My entire Product Marketing team viewed her as a vital peacemaker who always tried to resolve cross-departmental, not always common-sense rooted, conflicts.<br>On a personal side, I\u2019ll admit, I am very jealous of her being in Italy. I travel there every year for 3 or 4 weeks to enjoy the Dolce Vita (even if I suspect that lifestyle is just something they stereotypically sell to us Americans to keep us organizing expensive wedding parties or holidays there). We have remained in close contact on LinkedIn since her resignation, where I regularly message her about how <em>\u201cMilian\u201d must be crazy</em>, basically <em>\u201cevery Industry Event\u201d</em>, ask for news regarding our common friend <em>\u201cAntonio\u201d</em>, and talk about <em>\u201cinevitability\u201d</em> of things in life. Just small talk. lol.'},
  {id:'st',      sigEmail:'bruna@saykudos.co', name:'Miserement', fullName:'ST',          title:'Miserement',           photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1776080179/5_g5dctz.png',    icon:ico.stanley, quote:'<strong>Resilience and Execution</strong><br><br>Nabru has been the driving force behind my team\u2019s successes over the last four years, including the delivery of product suites and key post-m&a integration projects. She has a <em>\u2018magical\u2019</em> ability to resolve conflicts before I \u2014 and the leadership \u2014 even notice they exist, and that\u2019s really impressive, since often conflicts originate where I am. How is it possible I didn\u2019t notice there was a conflict until when I have been told, if I was the origin of the conflict? True magic.<br>When faced with external delays \u2014 for example the 6 quarters delay for the 2 weeks work needed to accomplish on a company wide project, which I had to postpone because of other (personal) conflicting priorities \u2014 her resilience never wavered. I keep it short: facts speak loud for both of us, and I am a very substantial person who hates fluff (AI-generated or not).'},
  {id:'tm',          sigEmail:'tkonstantin@inmarket.com', name:'Customer Success',   fullName:'TM',              title:'Chief Customer Success Officer', photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1776080178/3_bb15hz.png', icon:ico.tonya, quote:'<strong>Interdepartmental Synergy and Senior Management Mentorship</strong><br><br>Nabru worked extensively with the Customer Success teams, fostering excellent relationships across the board. Her presence was felt through her support to our client-facing teams. It seems that Nabru and I actually have something in common, although I think things might have gone a bit smoother for me \u2014 perhaps simply because I was perceived as less of a threat to certain people than she was, and I was not untransparently and judgmentally <em>\u201ctested\u201d</em> to confirm \u2014 or not \u2014 if long-lasting smear campaigns were based on real facts or just personal resentment. However, I know she takes seriously the responsibilities entirely placed on her shoulders, without her being given with the necessary informations — yes, it sounds a bit like a deja-vu. However, she carried the weight and honored the mandate she was given for several months beyond the very end, doing her best to build upon the legacy of my mentor.'},
  {id:'tr',        sigEmail:'trizzo@inmarket.com', name:'Revenue',   fullName:'TR',            title:'Chief Revenue Officer',          photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1776080179/2_mjbebb.png',    icon:ico.trina,   quote:'<strong>Just don\u2019t Take their Word for it</strong><br><br>The organizational structures limited our direct daily interaction and her direct contribution to my team work, so I can\u2019t comment a lot, and \u2014 following the example of certain recently-promoted high-IQ engineers \u2014 I don\u2019t usually talk about things I don\u2019t know. However, the objective facts of her contributions, backed by the high praise of my most trusted colleagues (which I always follow blindly), speak volumes about her standing. Even when they were self-contradictory \u2014 like labeling her as <em>\u201clazy\u201d</em>, and after a few minutes complaining about her doing two jobs \u2014 they resonated, somehow.'},
  {id:'jk',        sigEmail:'jknapp@inmarket.com', name:'Legal and Privacy',   fullName:'JK',            title:'Chief Legal and Privacy Officer', photo:'https://res.cloudinary.com/dhfrgr4qd/image/upload/v1776080180/9_wvjbaa.png',  icon:ico.jason,   quote:'<strong>Legal Acumen and Global Compliance</strong><br><br>For one year, and also post-resignation, Nabru and I shared many deep exchanges regarding topics we both really care about: Compliance, Privacy, Accountability, and Justice above all. Nabru possesses a sophisticated understanding of European and International law, specifically Privacy Regulations.<br><br>Our discussions on how instability-driven illicit data processing intersects in Italy with multiple articles of the Codice Penale — <em>595, 612-bis, 494, 615-ter, 414</em> — were incredibly insightful. Hardly a hobby for edgy teenagers. In exchange, I trained her on discrimination and harassment in the workplace, hostile working environment, constructive discharge, tortious interference, intentional infliction of emotional distress, and retaliation in the US system. We both know the law is one thing and justice is another — but we agreed on every single comma. Like the mafia, or simply any corner guy with common sense, she prefers redressing the balance privately with moral suasion, statuary clauses and covenant mechanisms, rather than involving the Authorities, who tend to be unnecessarily loud and may catch innocent bystanders in the crossfire. Individual, 1:1 accountabilities, instead, follow completely a different path.<br><br>She asked whether it is normal practice, around here, to convene kangaroo courts where everyone is present except the accused. I told her it only happens in certain high-level circles.<br><br>Her intellectual curiosity for regulations, norms, and laws is something I have rarely encountered in Product Leaders: she said she learnt it through lived experience. I enjoy practising my Italian with her, and I have been told she is equally adept at coordinating with public officers at institutions such as the Consulate, the Civil Registry, and multiple Local Municipalities. She knows how to navigate complex regulatory environments to resolve wicked and seemingly intractable problems. She said she appreciated my dignity, in the end — and with my most recent conduct I am quickly regaining decency points, leading by example. If I keep this up, perhaps we will be friends again one day.'},
  {id:'tm2',        sigEmail:'tmorris@inmarket.com', name:'Board',    fullName:'TM',            title:'Board',                          photo:'',   icon:ico.todd,    quote:'<strong>Final Executive Endorsement</strong><br><br>Nabru is a well-rounded Senior Executive Product Leader whose professionalism spans from entrepreneurship to systems thinking, strategy and creative problem-solving. Her background gives her a unique perspective on governance, and she consistently prioritizes the <em>\u2018greater good\u2019</em> with rare courage, discipline, consistency, adamantine tenacity and tireless energy. What struck us the most is her ability to predict the future to the point that she seems crazy until the future happens, and you acknowledge she was right.<br>She doesn\u2019t speak out often, but when she does, you notice it: when she sounds the alarm on a serious problem / upcoming disaster, that we may be underestimating, or minimizing, for hopeful optimism or simple psychological self-defense, it is better to trust her.<br>The only problem is when she pulls out the mirror and puts it in front of people: it seems teams prefer her when she remains silent. We forgot to mention: she is also a incredible designer.'}
];


function anonName(full) {
  var parts = full.split(' ');
  if (parts.length < 2) return full;
  return parts[0] + ' ' + parts[1].charAt(0) + '.';
}

function renderRef(r) {
  var dispName = anonName(r.fullName);
  var initials = r.fullName;
  var barTop = {dk:32, ah:38, tt:33, mdp:28, st:30, tm:32, tr:38, jk:38, tm2:32};
  var top = barTop[r.id] !== undefined ? barTop[r.id] : 38;
  var avatarInitials = r.id === 'tm2' ? 'B' : initials;
  var avatarInner = r.photo
    ? '<div class="ref-avatar-wrap"><img src="'+r.photo+'" alt="'+dispName+'">'
      + '<div class="ref-privacy-bar" style="top:'+top+'%">'
      + '<span class="ref-privacy-label">Anonimization Badge</span>'
      + '</div></div>'
    : '<div class="ref-avatar-initials">'+avatarInitials+'</div>';
  var quoteBlock = r.quote
    ? '<div class="ref-quote-box"><div class="ref-quote-mark">\u201c</div><div class="ref-quote-text">'+r.quote+'</div><div class="ref-attribution"><span>'+r.title+'</span></div></div>'
    : '<div class="ref-empty">Quote not yet available.</div>';
  var pageId = 'ref_'+r.id;
  var sigLabel = r.id === 'tm2' ? 'TM, DZ, MMS' : initials;
  var sigHtml = r.id === 'st'
    ? '<div class="sig-box sig-hopeless"><div class="sig-box-title">Signature</div><div class="sig-idle"><button class="sig-btn sig-btn-disabled" disabled>Sign this page</button><div class="sig-hopeless-alert"><span class="sig-hopeless-icon">⚠️</span><span class="sig-hopeless-msg">Let\u2019s not bother. Some cases are beyond saving.</span></div></div></div>'
    : '<div id="sig-wrap-'+pageId+'">'+sigBoxHtml(pageId, sigLabel, r.sigEmail || 'bruna@saykudos.co')+'</div>';
  return '<div class="ref-layout"><div class="ref-photo-col"><div class="ref-avatar">'+avatarInner+'</div></div><div class="ref-right">'+quoteBlock+sigHtml+'</div></div>';
}

// ── Glossary ──────────────────────────────────────────────────────────────────

var GLOSSARY_TERMS = [
  {
    term: 'Accountability',
    pos: 'n.',
    def: 'The obligation to accept responsibility for one\u2019s actions and their consequences \u2014 not selectively, not retroactively, and not only when there is an audience. True accountability is proactive: it does not wait to be caught. It is also structural: it applies regardless of title, tenure, or the number of people one manages. In organisations where accountability is unevenly distributed \u2014 flowing downward with ease and upward with great resistance \u2014 the word tends to appear frequently in company values documents and rarely in practice. This dashboard exists, in part, because accountability did not.'
  },
  {
    term: 'Apologies',
    pos: 'n. pl.',
    def: 'Expressions of regret for harm caused, intended to acknowledge wrongdoing, restore dignity to the injured party, and signal a genuine intention not to repeat the behaviour. An apology has three components: acknowledgement of what happened, acceptance of responsibility, and a commitment to change. The absence of any one component produces something that resembles an apology but functions as its opposite \u2014 a performative gesture designed to close the conversation rather than address its cause. In the environments documented by this dashboard, apologies were occasionally gestured at, rarely completed, and, in at least one case, apparently scheduled for a future date that has not yet arrived.'
  },
  {
    term: 'AI',
    pos: 'n. (Artificial Intelligence)',
    def: 'A set of computational techniques enabling machines to perform tasks that would otherwise require human intelligence \u2014 such as pattern recognition, language generation, decision support, and, apparently, building dashboards about workplace misconduct. In the context of this project: a tool used by the Data Subject to document, organise, and present factual information with a level of precision and consistency that certain human counterparts found inconvenient. AI does not gaslight. AI does not selectively recall. AI does not have a career to protect. These are, depending on your perspective, either its greatest limitations or its most compelling features. The content of this dashboard was not generated by AI. The dashboard itself was. The distinction matters.'
  },
  {
    term: 'Arrogance',
    pos: 'n.',
    def: 'Confidence without invitation. An acute condition affecting individuals who mistake positional authority for intellectual superiority. Often diagnosed post-exit, when the arrogant party discovers the subject they dismissed was, in fact, right. Symptoms include unsolicited opinions, interrupting people who understand the topic better, and a peculiar allergy to feedback. No known cure; however, exposure to consequences has shown promising early results.'
  },
  {
    term: 'Balls',
    pos: 'n. (also: courage; also: nerve; also: the thing that was required and rarely rewarded)',
    def: 'The capacity to do the right thing when the right thing is hard, costly, or professionally inadvisable. Distinct from recklessness (doing something dangerous without thinking) and from performance (appearing brave without the follow-through). Observed most reliably in individuals who reported misconduct, escalated concerns, or simply told the truth \u2014 and kept telling it, past the point where it would have been convenient to stop.'
  },
  {
    term: 'Boundary',
    pos: 'n.',
    def: 'A limit set by an individual to protect their physical, emotional, or professional wellbeing. Widely recommended by therapists, coaches, and anyone who has ever worked in a dysfunctional organisation. In theory, boundaries are respected. In practice, they are frequently reframed as inflexibility, tested for structural weakness, or simply ignored by people who find them inconvenient. Setting a boundary requires clarity. Maintaining it requires consistency. Having it acknowledged requires, in many cases, a miracle or a legal representative.'
  },
  {
    term: 'Checks and Balances',
    pos: 'n.',
    def: 'A governance mechanism designed to ensure that no single individual or entity accumulates unchecked power. Widely celebrated in theory. Occasionally inconvenient in practice, particularly when the party accumulating unchecked power is also the one responsible for maintaining the checks. See also: irony, hubris, and the entire recorded history of institutional failure.'
  },
  {
    term: 'Condescendence',
    pos: 'n.',
    def: 'The art of explaining things to people who understand them better than you do. A foundational skill in environments where seniority is measured in years rather than competence. Pairs well with mansplaining, unsolicited life advice, and the phrase \u201cI just want to make sure you understand.\u201d Delivered with the best intentions, always.'
  },
  {
    term: 'Defamation',
    pos: 'n.',
    def: 'The act of making false statements about a person that damage their reputation. Distinguished from criticism (which may be unwelcome but accurate), from feedback (which is supposed to be constructive), and from a performance review (which can be all three at once). In Italian law, <em>diffamazione</em> (595 c.p.) requires that the statement be communicated to at least two people \u2014 a threshold that is, in most professional environments, cleared before the first coffee of the day. The defence of truth remains available, which is why the subject of this dashboard is not particularly worried.'
  },
  {
    term: 'Dignity',
    pos: 'n.',
    def: 'The inherent worth of a person, which exists independently of their title, performance rating, nationality, or the current org chart. Dignity cannot be revoked by a manager, overridden by a policy, or forfeited through resignation. It is, in principle, non-negotiable. In practice, it is negotiated constantly \u2014 through tone, through process, through the small daily decisions about who gets listened to, who gets believed, and who gets told, with a straight face, that everything is fine. The subject of this dashboard would like it noted that she noticed every single one of those decisions. And documented most of them.'
  },
  {
    term: 'Ego',
    pos: 'n.',
    def: 'The part of the psyche responsible for a person\u2019s sense of self. In healthy quantities, a functional tool. In excess, a full-time organisational hazard. Ego is the leading cause of decisions that prioritise appearances over outcomes, seniority over competence, and personal comfort over institutional integrity. It is also, incidentally, the reason why certain people cannot simply say \u201cI was wrong,\u201d preferring instead a nineteen-step process involving reframing, revisionism, and the strategic reassignment of blame. Handle with care. It bruises easily and retaliates disproportionately.'
  },
  {
    term: 'Entrapment',
    pos: 'n.',
    def: 'A sophisticated management technique in which an individual is set up to fail through the strategic withdrawal of information, authority, or support \u2014 then blamed for the failure. Not to be confused with a performance review, though the two are occasionally indistinguishable. Requires significant planning, selective amnesia, and the willingness to look someone in the eye while doing it.'
  },
  {
    term: 'Gentleness',
    pos: 'n.',
    def: 'Tolerance, patience, a willingness to forgive and to give many chances, and a personal disposition toward self-sacrifice in order to preserve the harmony of the group. Gentleness is not a strategy; it is a character trait \u2014 and like most character traits, it is invisible until it is tested. It is frequently mistaken for weakness, which produces a predictable dynamic: each time the limit is not enforced, it is assumed there is no limit. The boundary is pushed a little further. Then further again. Then once more. And so it continues, quietly and progressively, until the limit is crossed irreversibly \u2014 at which point everything comes back with full force, shocking the other party, who had genuinely grown accustomed to the absence of reaction and was entirely unprepared for an angry or explosive response from someone they had categorised as harmless. The surprise, in these cases, is not a sign that the gentle person changed. It is a sign that they were never actually weak. They were simply patient. There is a difference. It tends to become clear too late.'
  },
  {
    term: 'Gaslighting',
    pos: 'n.',
    def: 'A form of psychological manipulation in which a person is made to question their own perception, memory, or judgement \u2014 typically by someone with more institutional power, more allies in the room, or a stronger interest in the alternative version of events. Techniques include: denying that things were said, reframing documented facts as misunderstandings, suggesting that the subject\u2019s emotional response is the actual problem, and repeating the alternative version of events with such confidence that it begins to feel true. Gaslighting is most effective in environments where the target is isolated, exhausted, or both. It is least effective when the target has been taking notes.'
  },
  {
    term: 'Flying Monkeys',
    pos: 'n. (also: enablers)',
    def: 'Individuals who carry out, amplify, or lend credibility to the actions of a manipulative party \u2014 wittingly or not. Named after the winged enforcers in <em>The Wizard of Oz</em>, who did the witch\u2019s bidding without apparent independent thought. In organisational contexts, flying monkeys may present as loyal colleagues, enthusiastic supporters, or simply people who found it more comfortable to agree than to ask questions. <strong>Enablers</strong> are their quieter variant: they do not act directly, but create the conditions in which harmful behaviour continues unchallenged \u2014 through silence, through validation, or through the deliberate choice to look the other way. Both categories tend to express genuine surprise when the full picture eventually becomes visible. The full picture, of course, was always there.'
  },
  {
    term: 'Ignorance',
    pos: 'n.',
    def: 'The state of not knowing something. In principle, a temporary condition, resolvable through information, curiosity, or basic professional diligence. In practice, sometimes preferred over knowledge, as knowledge tends to create obligations. Voluntary ignorance \u2014 the deliberate avoidance of information that would require one to act \u2014 is its more sophisticated cousin, and considerably harder to prosecute. Not to be confused with innocence, which requires a different kind of work to achieve.'
  },
  {
    term: 'Instability',
    pos: 'n.',
    def: 'A state attributed to individuals who notice, document, or object to things that are actually wrong. Instability is most frequently diagnosed by the party causing the instability, and applied to the subject pointing it out. Clinical literature has not yet confirmed whether the diagnosis reflects a genuine concern for the subject\u2019s wellbeing or a preference for silence. Not to be confused with clarity, accuracy, or a healthy reaction to an abnormal situation.'
  },
  {
    term: 'Integrity',
    pos: 'n.',
    def: 'The quality of being honest and maintaining strong moral principles, consistently and especially when it costs something. Not to be confused with loyalty, compliance, or strategic silence. Individuals with integrity tend to document things, ask inconvenient questions, and leave paper trails. This makes them either very trustworthy or very dangerous, depending entirely on which side of the paper trail you happen to be standing on.'
  },
  {
    term: 'Leadership',
    pos: 'n.',
    def: 'The ability to guide, inspire, and take responsibility for a group of people toward a shared goal \u2014 particularly when the goal is difficult, the path is unclear, and the personal cost is real. Not to be confused with management (which is a function), authority (which is a position), or visibility (which is a calendar). True leadership is most easily identified by its absence: when things go wrong and someone steps forward anyway, that is leadership. When things go wrong and someone steps back, reframes, delegates blame, and schedules a retrospective, that is something else entirely. The literature on leadership is extensive. The practice of it remains niche.'
  },
  {
    term: 'Mafia',
    pos: 'n.',
    def: 'A human, social, and criminal phenomenon originating in Sicily \u2014 forged upon a value system shaped by centuries of external domination and economic underdevelopment, and built around recognisable principles: respect, dignity, the obligation to tell the truth, loyalty to the group. These values, instrumentalised for criminal ends and carried to their logical extreme, become their own perversion: respect becomes fear, loyalty to the group becomes submission to the leader and <em>omert\u00e0</em>, the obligation to tell the truth becomes uncritical conformism.<br><br>It has since been observed, in spirit if not in name, in a remarkable variety of contexts well outside the island.<br><br>Judge Giovanni Falcone \u2014 a real judge, not a self-appointed one \u2014 said: <em>\u201cLa mafia non \u00e8 un cancro proliferato per caso su un tessuto sano. Essa vive in perfetta simbiosi con la miriade di protettori, complici, informatori, debitori di ogni tipo, grandi e piccoli maestri cantori, gente intimidita o ricattata che appartiene a tutti gli strati della societ\u00e0.\u201d</em> (\u201cThe mafia is not a cancer that has proliferated by chance on healthy tissue. It lives in perfect symbiosis with the multitude of protectors, accomplices, informers, debtors of every kind, great and small praise-singers, people intimidated or blackmailed who belong to every stratum of society.\u201d) He also said: <em>\u201cSe vogliamo combattere efficacemente la mafia, dobbiamo riconoscere che ci assomiglia.\u201d</em> (\u201cIf we want to fight the mafia effectively, we must acknowledge that it resembles us.\u201d) \u2014 meaning that it exploits the weaknesses, selfishness, and needs that belong to all of us, poor human beings. If that sounds familiar, the glossary declines to speculate further.<br><br>Today, the phenomenon is primarily economic in nature, having shed most of its cultural charge save what is strictly necessary for territorial control and the recruitment of expendable young men from popular neighbourhoods. An extensive bibliography is available, including in English, for those wishing to go beyond the cinematic representations. Knowledge, as always happens, would allow you to recognise the phenomena and make independent choices, from Liverpool to Las Vegas.<br><br>For the avoidance of doubt: by ruling of 15 March 2018, the EU Tribunal annulled a Spanish trademark using the word <em>Mafia</em>, finding its commercial use contrary to public order and <em>buon costume</em>, on the grounds that it trivialises a dangerous criminal organisation and offends its victims (as, for example, one of the uncles of the Data Subject). A further ruling in 2023 (<em>Mafia Kitchen</em>) made it effectively impossible to register trademarks bearing the word without intervention from the European Court of Justice. Sicilians will explain \u2014 with great patience and only mild irritation \u2014 that the joke stopped being funny some time ago.'
  },
  {
    term: 'Manipulation',
    pos: 'n.',
    def: 'The practice of influencing outcomes through indirect, covert, or deceptive means, rather than through honest communication. Characterised by warmth, plausible deniability, and a recurring cast of intermediaries. Often paired with \u201cno, of course this isn\u2019t personal\u201d and \u201cwe just want what\u2019s best for you.\u201d Not to be confused with leadership, strategy, or people management \u2014 though the confusion, in certain environments, is entirely understandable.'
  },
  {
    term: 'Mirror',
    pos: 'n.',
    def: 'A useful tool that reflects who you are. Best used before thinking too much, talking too much, or forming strong opinions about who someone else is. The mirror does not lie, does not selectively recall, and does not reframe what it shows based on the current organisational climate. It simply reflects. What you do with the reflection is, of course, entirely up to you \u2014 which is precisely why many people prefer not to look. Recommended use: at least once a week, ideally in a quiet moment, to verify that the reflection corresponds with your inner conscience. Advanced users may also try it immediately after judging someone else. Results vary. Courage required.'
  },
  {
    term: 'Maturity',
    pos: 'n.',
    def: 'The capacity to regulate one\u2019s emotions, absorb discomfort, and respond to adversity with proportionality rather than escalation. Maturity is not the absence of feeling; it is the presence of judgement. It manifests as the ability to hear difficult truths without retaliating, to be wrong without unravelling, and to prioritise what is right over what is comfortable. In professional environments, it is sometimes confused with passivity, compliance, or simply being quiet. These are not the same thing. Maturity knows the difference. Immaturity, characteristically, does not.'
  },
  {
    term: 'Narcissistic Wound',
    pos: 'n.',
    def: 'The deep psychological injury inflicted upon a narcissist when their self-image is challenged, their authority is questioned, or their audience fails to applaud on cue. Unlike ordinary hurt feelings \u2014 which tend to resolve with time, conversation, or a decent night\u2019s sleep \u2014 the narcissistic wound does not heal quietly. It escalates. It retaliates. It reorganises the entire surrounding environment to ensure the offending party is neutralised, discredited, or simply gone. The wound is, paradoxically, both extremely fragile and extraordinarily dangerous. Handle with caution. Do not, under any circumstances, be right in front of one.'
  },
  {
    term: 'Obsession',
    pos: 'n.',
    def: 'An unwanted, persistent preoccupation with a person, idea, or outcome that overrides rational judgement and proportionate response. In clinical contexts, a symptom. In organisational contexts, occasionally a strategy. Obsession in professional settings tends to masquerade as diligence, thoroughness, or \u201cjust wanting to get to the bottom of things\u201d \u2014 right up until the bottom turns out to be someone else\u2019s personal life, private communications, or whereabouts at 11pm on a Tuesday. At that point, the literature suggests a different diagnosis entirely.'
  },
  {
    term: 'Objectivity',
    pos: 'n.',
    def: 'The rare and coveted capacity to evaluate facts without the distortion of ego, bias, fear, or personal interest. Sometimes invoked by parties who do not possess it, to describe assessments that happen to confirm what they already believed. A spreadsheet can be objective. A person can aspire to it. A dashboard built by the subject of its own content can get surprisingly close \u2014 especially when the facts are this unambiguous.'
  },
  {
    term: 'Privacy',
    pos: 'n.',
    def: 'The right of an individual to control information about themselves. Enshrined in GDPR (EU 2016/679), the Italian Codice Privacy, and the general concept of human dignity. In practice, frequently treated as optional, inconvenient, or inapplicable to people on payroll. For further reading, Articles 12\u201322 of the GDPR remain available and have not been repealed. The Data Subject has read them.'
  },
  {
    term: 'Panopticon',
    pos: 'n.',
    def: 'A prison design conceived by philosopher Jeremy Bentham in the 18th century, in which all inmates can be observed at any time by a single guard positioned at the centre \u2014 without the inmates knowing whether they are being watched at any given moment. The power of the panopticon lies not in constant surveillance, but in the possibility of it: once individuals believe they may be observed, they begin to regulate their own behaviour accordingly. Michel Foucault later used the concept to describe how modern institutions which have nothing to do with prisons \u2014 schools, hospitals, workplaces \u2014 exercise asymmetric power and information, driving the internalisation of control and enabling privacy breaches. The Data Subject is familiar with the concept. Both theoretically and, as it turns out, practically.'
  },
  {
    term: 'Private Vehicles',
    pos: 'n.',
    def: 'Microscopic financial entities \u2014 no employees, no revenue to speak of, located on the other side of the ocean \u2014 through which payments were processed over the course of two years. Their cap table was disclosed proactively and in a timely manner, in the spirit of full transparency, as is the data subject\u2019s documented habit. The suggestion that such an entity could constitute a competitive threat to a company with hundreds of thousands of dollars in turnover and over 350 employees, operating in the United States, is one of two things: ridiculous, or \u2014 on reflection, and with charitable generosity toward the intelligence of all parties involved \u2014 pathological. The glossary declines to choose, and invites the reader to draw their own conclusions.'
  },
  {
    term: 'Stalking',
    pos: 'n.',
    def: 'Persistent, unwanted monitoring of another individual\u2019s movements, communications, or professional activity \u2014 for purposes ranging from \u201coversight\u201d to \u201csecurity\u201d to \u201cI just needed to know.\u201d In professional contexts, sometimes rebranded as performance management, due diligence, or \u201ccultural fit assessment.\u201d The Italian Codice Penale (612-bis c.p.) maintains a more precise and less creative definition.'
  },
  {
    term: 'Substance',
    pos: 'n.',
    def: 'The actual content of a thing, as opposed to its packaging. In professional contexts, substance refers to the quality of ideas, the rigor of analysis, and the depth of contribution \u2014 as distinct from visibility, volume, or the ability to fill a room with confidence. Substance is what remains when the presentation ends, the jargon is removed, and the question \u201cbut what did they actually do?\u201d is asked. It is notably difficult to fake over time, and notably easy to overlook in environments that reward the performance of competence over its exercise. One of the more reliable indicators of substance is that the people who have it tend not to feel the need to announce it. The people who don\u2019t, frequently do.'
  },
  {
    term: 'Uncertainty',
    pos: 'n.',
    def: 'The condition of not knowing what will happen next. Distinct from \u2014 and not to be conflated with \u2014 <strong>ambiguity</strong> (not knowing what something means), <strong>maneuvering</strong> (knowing exactly what you\u2019re doing and ensuring others don\u2019t), <strong>haziness</strong> (not knowing what is currently happening, sometimes deliberately), and <strong>randomness</strong> (the philosophical comfort of attributing intentional patterns to chaos). These five concepts may appear similar in casual conversation. In practice, only one of them is innocent.'
  },
  {
    term: 'Wine',
    pos: 'n.',
    def: 'A fermented beverage produced from grapes, consumed across cultures for thousands of years as a vehicle for celebration, contemplation, and the honest conversation that tends to happen only after the second glass. In the context of this dashboard: a recurring motif, a diplomatic icebreaker, and \u2014 in at least one documented case \u2014 a proposed setting for a non-touristic evening in Milan that would have been excellent and which, regrettably, has not yet occurred. Available overpriced near the Bocconi University. Best enjoyed without the people who always get drunk at the retreat.'
  }
];

function renderGlossary() {
  // Group terms by first letter
  var groups = {};
  GLOSSARY_TERMS.forEach(function(t) {
    var l = t.term.charAt(0).toUpperCase();
    if (!groups[l]) groups[l] = [];
    groups[l].push(t);
  });
  var activeLetters = Object.keys(groups).sort();
  var allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Alphabet nav bar
  var navBtns = allLetters.map(function(l) {
    if (groups[l]) {
      return '<button onclick="glossScrollTo(\'' + l + '\')"'
        + ' style="flex:1;min-width:0;height:28px;border:none;border-radius:5px;background:transparent;color:var(--accent);font-size:11px;font-weight:600;cursor:pointer;transition:background .12s,color .12s;outline:none"'
        + ' onmouseover="this.style.background=\'var(--accent)\';this.style.color=\'#fff\'"'
        + ' onmouseout="this.style.background=\'transparent\';this.style.color=\'var(--accent)\'">'
        + l + '</button>';
    }
    return '<span style="flex:1;min-width:0;height:28px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;color:var(--border);pointer-events:none">' + l + '</span>';
  }).join('');

  var nav = '<div id="gloss-nav" style="position:sticky;top:0;z-index:10;background:var(--card,#fff);margin-bottom:20px">'
    + '<div style="border:1px solid var(--border);border-radius:8px;background:var(--card,#fff);padding:6px 10px;display:flex;flex-direction:row;align-items:center;box-shadow:0 1px 3px rgba(0,0,0,.06)">'
    + navBtns
    + '</div></div>';

  // Grouped entries — each term in a card
  var content = activeLetters.map(function(l) {
    var cards = groups[l].map(function(t) {
      return '<div style="background:var(--card,#fff);border:1px solid var(--border);border-radius:10px;padding:20px 24px;box-shadow:0 1px 4px rgba(0,0,0,.04)">'
        + '<div style="display:flex;align-items:baseline;gap:10px;margin-bottom:8px">'
        + '<span style="font-size:15px;font-weight:700;color:var(--text)">' + t.term + '</span>'
        + '<span style="font-size:11px;color:var(--muted);font-style:italic">' + t.pos + '</span>'
        + '</div>'
        + '<div style="font-size:13px;color:var(--text);line-height:1.75">' + t.def + '</div>'
        + '</div>';
    }).join('');
    return '<div style="margin-bottom:8px">'
      + '<div id="gloss-' + l + '" style="font-size:11px;font-weight:700;color:var(--accent);letter-spacing:.1em;padding:4px 0 10px">' + l + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:10px">' + cards + '</div>'
      + '</div>';
  }).join('');

  var totalWords = GLOSSARY_TERMS.reduce(function(acc, t) {
    return acc + t.def.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  }, 0);
  var glossMins = Math.ceil(totalWords / 200);

  return '<div class="ptitle">Glossary</div>'
    + '<div class="psub psub-row" style="margin-bottom:16px">Key terms, precisely defined. Or as precisely as the subject matter allows.' + readTimeBadge(glossMins) + '</div>'
    + '<div style="max-width:960px">'
    + nav
    + content
    + '<div style="padding-top:20px;font-size:11px;color:var(--muted);font-style:italic">More terms will be added as events continue to provide material.</div>'
    + '</div>';
}

function glossScrollTo(l) {
  var el = document.getElementById('gloss-' + l);
  var nav = document.getElementById('gloss-nav');
  var c = document.getElementById('content');
  if (!el || !c) return;
  var navH = nav ? nav.offsetHeight : 44;
  // Convert current screen position to absolute position within the scroll container
  var elAbsTop = el.getBoundingClientRect().top - c.getBoundingClientRect().top + c.scrollTop;
  c.scrollTop = elAbsTop - navH - 8;
}
