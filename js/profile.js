// profile.js — Profile page

var PROFILE_SIG_EMAILS = ['bruna@saykudos.co', 'bru.cop10@gmail.com'];

var _npIdx = 0;

var NOW_PLAYING_SONGS = [
  {
    embedSrc: 'https://open.spotify.com/embed/track/3pc1vNqTREXlPoNYPGAZwU?utm_source=generator',
    lyrics: ''
      + '<div class="lyrics-row"><span class="lyrics-it">Ci vuol passione</span><span class="lyrics-en">You need passion</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Molta pazienza</span><span class="lyrics-en">Lots of patience</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Sciroppo di lampone</span><span class="lyrics-en">Raspberry syrup</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">E un filo di incoscienza</span><span class="lyrics-en">And a hint of audacity</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Ci vuol farina</span><span class="lyrics-en">You need flour</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Del proprio sacco</span><span class="lyrics-en">From your own bag</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Sensualit\u00e0 latina</span><span class="lyrics-en">Latin sensuality</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">E un minimo di stacco</span><span class="lyrics-en">And a touch of detachment</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Si fa cos\u00ec</span><span class="lyrics-en">This is how it\'s done</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Rossetto e cioccolato</span><span class="lyrics-en">Lipstick and chocolate</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Che non mangiarli sarebbe un peccato</span><span class="lyrics-en">Not to taste them would be a shame</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Si fa cos\u00ec</span><span class="lyrics-en">This is how it\'s done</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Si cuoce a fuoco lento</span><span class="lyrics-en">It simmers on low heat</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Mescolando con sentimento</span><span class="lyrics-en">Stirring it with feeling</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Le calze nere</span><span class="lyrics-en">Black stockings</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Il latte bianco</span><span class="lyrics-en">White milk</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">E gi\u00e0 si pu\u00f2 vedere</span><span class="lyrics-en">And you can already see</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Che piano sta montando</span><span class="lyrics-en">That it\'s slowly rising</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">\u00c8 quasi fatta-ah</span><span class="lyrics-en">It\'s almost done</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Zucchero a velo</span><span class="lyrics-en">Powdered sugar</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">La gola \u00e8 soddisfatta</span><span class="lyrics-en">The throat is satisfied</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">E nella stanza il cielo</span><span class="lyrics-en">And in the room, the sky</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Si fa cos\u00ec</span><span class="lyrics-en">This is how it\'s done</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Per cominciare il gioco</span><span class="lyrics-en">To start the game</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">E ci si mastica poco a poco</span><span class="lyrics-en">And you savour it little by little</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Si fa cos\u00ec</span><span class="lyrics-en">This is how it\'s done</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">\u00c8 tutto apparecchiato</span><span class="lyrics-en">Everything is set</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Per il cuore e per il palato</span><span class="lyrics-en">For the heart and for the palate</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Sar\u00e0 bello, bellissimo, travolgente</span><span class="lyrics-en">Beautiful, most beautiful, overwhelming</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Lasciarsi vivere totalmente</span><span class="lyrics-en">To let yourself live completely</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Dolce, dolcissimo e sconveniente</span><span class="lyrics-en">Sweet, sweetest and indecent</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Coi bei peccati succede sempre</span><span class="lyrics-en">With beautiful sins it always happens</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Ci vuol fortuna</span><span class="lyrics-en">You need luck</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Perch\u00e9 funzioni</span><span class="lyrics-en">For it to work</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">I brividi alla schiena</span><span class="lyrics-en">Shivers down the spine</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">E gli ingredienti buoni</span><span class="lyrics-en">And good ingredients</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">\u00c8 quasi fatta-ah</span><span class="lyrics-en">It\'s almost done</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Zucchero a velo</span><span class="lyrics-en">Powdered sugar</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">La gola \u00e8 soddisfatta</span><span class="lyrics-en">The throat is satisfied</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">E nella stanza il cielo</span><span class="lyrics-en">And in the room, the sky</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Si fa cos\u00ec</span><span class="lyrics-en">This is how it\'s done</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Per cominciare il gioco</span><span class="lyrics-en">To start the game</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">E ci si mastica poco a poco</span><span class="lyrics-en">And you savour it little by little</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Si fa cos\u00ec</span><span class="lyrics-en">This is how it\'s done</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">\u00c8 tutto apparecchiato</span><span class="lyrics-en">Everything is set</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Per il cuore e per il palato</span><span class="lyrics-en">For the heart and for the palate</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Sar\u00e0 bello, bellissimo, travolgente</span><span class="lyrics-en">Beautiful, most beautiful, overwhelming</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Lasciarsi vivere totalmente</span><span class="lyrics-en">To let yourself live completely</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Dolce, dolcissimo e sconveniente</span><span class="lyrics-en">Sweet, sweetest and indecent</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Coi bei peccati succede sempre</span><span class="lyrics-en">With beautiful sins it always happens</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Coi bei peccati succede sempre</span><span class="lyrics-en">With beautiful sins it always happens</span></div>'
  }  ,
  {
    embedSrc: 'https://open.spotify.com/embed/track/0wHW7nZlqZqbxnmTotTLGp?utm_source=generator',
    lyrics: ''
      + '<div class="lyrics-row"><span class="lyrics-it">Mi sono ripreso</span><span class="lyrics-en">I\'m back</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Okay</span><span class="lyrics-en">Okay</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Sono pronto</span><span class="lyrics-en">I\'m ready</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Sono tornato nuovo di nuovo per finire il lavoro</span><span class="lyrics-en">Back again, brand new, to finish the job</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Con sette zeri sul mio rinnovo</span><span class="lyrics-en">Seven zeros on my renewal deal</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Troppa liquidit\u00e0 che dovrei farci una bibita (psst)</span><span class="lyrics-en">Too much liquidity, I could make a drink out of it</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Terapia col rap, potrei aprire una clinica (uh)</span><span class="lyrics-en">Therapy through rap, I could open a clinic</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Settimo disco al top del genere</span><span class="lyrics-en">Seventh album at the top of the genre</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Mi stupisco non abbiate imparato a perdere</span><span class="lyrics-en">I\'m surprised you haven\'t learned to lose</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Chillo fuori dall\u2019orbita di \u2019sto circo (chillo)</span><span class="lyrics-en">Way outside the orbit of this circus</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Killo chiunque mi ospita sul suo disco</span><span class="lyrics-en">I kill whoever hosts me on their record</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Il flow che registro va registrato come un\u2019arma</span><span class="lyrics-en">The flow I record should be registered as a weapon</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Leggo commenti: \u201cNerfate Marra\u201d (ahah)</span><span class="lyrics-en">I read comments: \u201cNerf Marra\u201d (ahah)</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Un nuovo scarso, la stessa lagna</span><span class="lyrics-en">A new nobody, the same old whining</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Mi ha rotto il cazzo alla terza barra</span><span class="lyrics-en">He pissed me off by the third bar</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Tu che fai brutto \u00e8 la linea comica</span><span class="lyrics-en">You playing the villain is the comedy act</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Scemo, al tuo bodyguard serve un bodyguard</span><span class="lyrics-en">Idiot, your bodyguard needs a bodyguard</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Squarto il tuo corpo e spargo le body parts (pff)</span><span class="lyrics-en">I quarter your body and scatter the body parts</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Questi cadono da fermi</span><span class="lyrics-en">These guys fall standing still</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Non gestiscono il successo, figurati i fallimenti (senti)</span><span class="lyrics-en">They can\'t handle success, imagine failure</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Quartieri a terra che fanno zona contro zona (mhm)</span><span class="lyrics-en">Broken neighborhoods doing block against block</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Giochi di guerra, bro, vince solo chi non gioca</span><span class="lyrics-en">War games, bro, only those who don\'t play win</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">C\u2019\u00e8 un unico inferno</span><span class="lyrics-en">There\'s only one hell</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">E se ti sparassi, saremmo entrambi senza cervello (gi\u00e0)</span><span class="lyrics-en">If I shot you, we\'d both be brainless</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Branco di fenomeni da baraccone (uh)</span><span class="lyrics-en">Pack of sideshow freaks</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Io gli faccio esplodere i cercapersone (mhm)</span><span class="lyrics-en">I make their pagers explode</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Sono religione, il Padre vostro</span><span class="lyrics-en">I\'m religion, your Father</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Il cash compra la felicit\u00e0, dov\u2019\u00e8 il negozio?</span><span class="lyrics-en">Cash buys happiness, where\'s the store?</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Quando ero bimbo, la diversit\u00e0 era debolezza</span><span class="lyrics-en">When I was a kid, being different meant weakness</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Perci\u00f2 non fingo e intingo nel veleno la mia penna</span><span class="lyrics-en">So I don\'t pretend, I dip my pen in poison</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Con le buone non cambi le cose (non ho scelta)</span><span class="lyrics-en">Being nice doesn\'t change things (I have no choice)</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Ho la soluzione</span><span class="lyrics-en">I have the solution</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Il livello \u00e8 troppo trash, serve un power slap (uh)</span><span class="lyrics-en">The level is too trash, it needs a power slap</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Chiedi ai colleghi, tutti diranno</span><span class="lyrics-en">Ask my peers, they\'ll all say</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Che sono strano, che sono matto</span><span class="lyrics-en">That I\'m weird, that I\'m crazy</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Molti diranno: \u201cMarra \u00e8 un bastardo\u201d</span><span class="lyrics-en">Many will say: \u201cMarra is a bastard\u201d</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Intanto nessuno pu\u00f2 dire che sono falso</span><span class="lyrics-en">But no one can say I\'m fake</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Favori non ne chiedo e non ne faccio pi\u00f9 (mhm)</span><span class="lyrics-en">I don\'t ask for favors and don\'t do them anymore</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Non cerco nostalgia e non inseguo i new (yeah)</span><span class="lyrics-en">Not chasing nostalgia or the new trends</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Remaster, remake, reunion, reboot</span><span class="lyrics-en">Remaster, remake, reunion, reboot</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Ne abbiamo piene le palle</span><span class="lyrics-en">We\'re completely fed up</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Le stesse marche, stessi designer</span><span class="lyrics-en">Same brands, same designers</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Stessi orologi, stesse vacanze</span><span class="lyrics-en">Same watches, same vacations</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Stessi producer e stesse guest</span><span class="lyrics-en">Same producers and same guests</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Stessi argomenti e le stesse reference (yeah)</span><span class="lyrics-en">Same topics and the same references</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Va bene cos\u00ec perch\u00e9 fanno tutti i platini (mhm)</span><span class="lyrics-en">That\'s fine because they all go platinum</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Premiati in TV, tutti bravi su esse Magazine</span><span class="lyrics-en">Awarded on TV, all praised in music mags</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Carriati dai feat, fitti fitti, stessi nomi (stessi)</span><span class="lyrics-en">Carried by features, packed tight, same names</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Carriati dai rit\u2019 scritti dagli stessi autori (stessi autori)</span><span class="lyrics-en">Carried by hooks written by the same writers</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">E ogni anno si abbassa l\u2019asticella</span><span class="lyrics-en">And every year the bar gets lower</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Provo a farci il limbo, con la testa tocco terra (ahi)</span><span class="lyrics-en">I try to do the limbo, my head touches the ground</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Ti ricordo, bimbo, chi saresti con \u2019sta sberla (sbam)</span><span class="lyrics-en">Let me remind you, kid, who you\'d be without this slap</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Senza Sanremo, senza l\u2019estivo, senza Petrella (uh)</span><span class="lyrics-en">Without Sanremo, without the summer hit, without Petrella</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">\u00c8 finita la pazienza</span><span class="lyrics-en">Patience is over</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Questi wigga, questi wanksta</span><span class="lyrics-en">These wiggas, these wankstas</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Con la linfa che ti resta</span><span class="lyrics-en">With whatever sap you have left</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Prega tipo Kyrie eleison, Marracash</span><span class="lyrics-en">Pray like Kyrie eleison, Marracash</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Quando ero bimbo, la diversit\u00e0 era debolezza</span><span class="lyrics-en">When I was a kid, being different meant weakness</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Perci\u00f2 non fingo e intingo nel veleno la mia penna</span><span class="lyrics-en">So I don\'t pretend, I dip my pen in poison</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Con le buone non cambi le cose (non ho scelta)</span><span class="lyrics-en">Being nice doesn\'t change things (I have no choice)</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Ho la soluzione</span><span class="lyrics-en">I have the solution</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Il livello \u00e8 troppo trash, serve un power slap (uh)</span><span class="lyrics-en">The level is too trash, it needs a power slap</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Eh, il rap italiano</span><span class="lyrics-en">Hey, Italian rap</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Che non sa pi\u00f9 come dire, che non sa pi\u00f9 cosa dire</span><span class="lyrics-en">That doesn\'t know how to say it, doesn\'t know what to say</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Ah, \u00e8 finita la pace, \u00e8 finita la pacchia</span><span class="lyrics-en">Ah, the peace is over, the easy ride is over</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Marracash</span><span class="lyrics-en">Marracash</span></div>'
      + '<div class="lyrics-break"></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Come funziona l\u2019industria</span><span class="lyrics-en">This is how the industry works</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Un giorno sei Dio, il giorno dopo sei nulla</span><span class="lyrics-en">One day you\'re God, the next you\'re nothing</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Dal matrimonio alla calunnia, una fragile bolla che fluttua</span><span class="lyrics-en">From wedding to slander, a fragile bubble that floats</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Nessuno ha dato e fatto quello che ho dato e fatto, \u00e8 un dato di fatto</span><span class="lyrics-en">Nobody has given and done what I have, that\'s a fact</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">Anche quando ho dato di matto, il messaggio</span><span class="lyrics-en">Even when I went off the rails, the message</span></div>'
      + '<div class="lyrics-row"><span class="lyrics-it">\u00c8 che nessuno diventa qualcuno seguendo le orme di qualcun altro (auh)</span><span class="lyrics-en">Is that nobody becomes somebody by following someone else\'s footsteps</span></div>'
  }
];

function npBuildCard() {
  var song  = NOW_PLAYING_SONGS[_npIdx];
  var total = NOW_PLAYING_SONGS.length;
  var dots  = total > 1
    ? '<div class="np-dots">'
      + NOW_PLAYING_SONGS.map(function(_, i) {
          return '<span class="np-dot' + (i === _npIdx ? ' np-dot-active' : '') + '" data-npgo="' + i + '"></span>';
        }).join('')
      + '</div>'
    : '';
  var nav = total > 1
    ? '<div class="np-nav">'
      + '<button class="np-nav-btn" data-npnav="-1" ' + (_npIdx === 0 ? 'disabled' : '') + '>'
      + '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L4 6l3.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '</button>'
      + dots
      + '<button class="np-nav-btn" data-npnav="1" ' + (_npIdx === total - 1 ? 'disabled' : '') + '>'
      + '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8 6l-3.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '</button>'
      + '</div>'
    : '';
  return '<div class="now-playing-card" id="now-playing-card">'
    + '<div class="now-playing-top">'
    +   '<span class="now-playing-dot"></span>'
    +   '<span class="now-playing-label">Now Playing</span>'
    + '</div>'
    + '<div class="now-playing-embed-wrap"><iframe class="now-playing-embed" src="' + song.embedSrc + '" height="80" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>'
    + nav
    + '<div class="now-playing-lyrics">' + song.lyrics + '</div>'
    + '</div>';
}

function npRefresh() {
  var card = document.getElementById('now-playing-card');
  if (!card) return;
  var parent = card.parentNode;
  var tmp = document.createElement('div');
  tmp.innerHTML = npBuildCard();
  parent.replaceChild(tmp.firstChild, card);
}

document.addEventListener('click', function(e) {
  var nav = e.target.closest('[data-npnav]');
  if (nav) {
    var dir = parseInt(nav.dataset.npnav);
    _npIdx = Math.max(0, Math.min(NOW_PLAYING_SONGS.length - 1, _npIdx + dir));
    npRefresh();
    return;
  }
  var dot = e.target.closest('[data-npgo]');
  if (dot) {
    _npIdx = parseInt(dot.dataset.npgo);
    npRefresh();
    return;
  }
});

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
    + '<div class="prof-layout">'

    +   '<div class="prof-main">'
    +     '<div class="prof-header">'
    +       '<div class="prof-avatar">'+frogSvg+'</div>'
    +       '<div class="prof-identity">'
    +         '<div class="prof-name">'+userName+'</div>'
    +         '<div class="prof-role">'+userRole+'</div>'
    +       '</div>'
    +     '</div>'
    +     '<div class="prof-desc">'
    +       'Manages the shared spaces, enforces the rules nobody agreed to, and keeps the operations running so everyone else can pretend they are delivering results. Shadow work, basically. '
    +       'Responsible for structural decisions, access control, and the kind of coordination work that only becomes visible when it stops happening. 142 IQ-tested: it is a damnation since 1989. '
    +       'Equally socially allergic, either in gritty housing projects or pretentious luxury corporate hotels. Evolved from the good old days of flipping spoiled brat bullies\u2019 scooters with a rowdy crew, to the sophisticated thrill of crushing them with AI dashboards and regulations. The kind of rough-around-the-edges, slightly unhinged person you want by your side during a crisis \u2014 even knowing she\u2019s dangerous. Which, indeed, she is. '
    +     '</div>'

    +     '<div class="prof-divider"></div>'

    +     '<div class="prof-section">'
    +       '<div class="prof-section-label">App Stack</div>'
    +       '<div class="prof-desc" style="margin-top:0">Leveraging a high-performing, cross-functional team of one \u2014 similarly to the last 4 years \u2014 this app was ideated, architected, and shipped to production in 2 week-ends \u2014 end-to-end, from prototype to production-grade software \u2014 using Claude Code, Visual Studio Code, Git, Node.js, Vercel, Google Apps Script, EmailJS, and Vercel Blob. No technical debt reduction roadmap was established. Metrics measuring efficiency gains and productivity improvements are, in fact, in the roadmap \u2014 because the author has both the technical depth to build them and the business acumen to know why they matter. Real Genius. Timely change management framework deployment would avoid the need for gargantuan socialization efforts. Now that is built, I have to invent another second job to keep myself from getting bored. Do you have any internal, external, hermaphrodite workflows I could automate like a AI tinkerer pro? </div>'
    +     '</div>'

    +     '<div class="prof-divider"></div>'

    +     '<div class="prof-section">'
    +       '<div class="prof-section-label">Contacts</div>'
    +       '<div class="prof-devtools">'
    +         '<a class="prof-tool-btn" href="mailto:info@getrightshtuffdone.com">'
    +           '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 4l7 5 7-5"/></svg>'
    +           'Email Developer'
    +         '</a>'
    +       '</div>'
    +     '</div>'
    +   '</div>'

    +   '<div class="prof-sidebar">' + npBuildCard() + '</div>'

    + '</div>';
}
