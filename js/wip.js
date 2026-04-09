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
    + '<div style="display:flex;flex-direction:column;gap:12px">'+sigBoxes+'</div>'
    + '<div style="margin-top:32px;padding-top:20px;border-top:1px solid var(--border)">'
    + '<div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.6px;color:var(--faint);margin-bottom:10px">Dev Tools</div>'
    + '<button id="resetSigsBtn" style="height:32px;padding:0 14px;background:none;border:1px solid #FDECEA;border-radius:8px;font-size:12px;font-family:inherit;cursor:pointer;color:#A93226;transition:background .15s" onmouseover="this.style.background=\'#FDECEA\'" onmouseout="this.style.background=\'none\'">Reset all signatures</button>'
    + '</div>';
}

