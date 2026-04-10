// wip.js — Work in Progress page


function renderWIP() {
  var sigs = [
    {id:'wip_test_1',  label:'Test Signature 1',  email:'bcoppolino@kerv.ai'},
    {id:'wip_test_2',  label:'Test Signature 2',  email:'bcoppolino@kerv.ai'},
    {id:'wip_test_3',  label:'Test Signature 3',  email:'bcoppolino@kerv.ai'},
    {id:'wip_test_4',  label:'Test Signature 4',  email:'bcoppolino@kerv.ai'},
    {id:'wip_test_5',  label:'Test Signature 5',  email:'bcoppolino@kerv.ai'},
    {id:'wip_test_6',  label:'Test Signature 6',  email:'bcoppolino@kerv.ai'},
    {id:'wip_test_7',  label:'Test Signature 7',  email:'bruna@saykudos.co'},
    {id:'wip_test_8',  label:'Test Signature 8',  email:'bruna@saykudos.co'},
    {id:'wip_test_9',  label:'Test Signature 9',  email:'bruna@saykudos.co'},
    {id:'wip_test_10', label:'Test Signature 10', email:'bruna@saykudos.co'}
  ];
  var sigBoxes = sigs.map(function(s) {
    return '<div id="sig-wrap-'+s.id+'">'+sigBoxHtml(s.id, s.label, s.email)+'</div>';
  }).join('');
  return '<div class="ptitle">Work in Progress</div><div class="psub">Experimental features</div>'
    + '<div class="wip-box"><div class="wip-eyebrow">\ud83d\udea7 Under construction</div><div class="wip-heading">Testing ground</div><div class="wip-body">This space is for testing new functionality before it goes live. Things here may change, break, or disappear entirely. No promises.</div></div>'
    + '<div class="wip-sig-list">'+sigBoxes+'</div>'
    + '<div class="wip-devtools">'
    + '<div class="wip-devtools-title">Dev Tools</div>'
    + '<button id="resetSigsBtn" class="wip-reset-btn">Reset all signatures</button>'
    + '</div>';
}
