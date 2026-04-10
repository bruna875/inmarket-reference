// references.js — reference page rendering


function anonName(full) {
  var parts = full.split(' ');
  if (parts.length < 2) return full;
  return parts[0] + ' ' + parts[1].charAt(0) + '.';
}

function renderRef(r) {
  var dispName = anonName(r.fullName);
  var initials = r.fullName.split(' ').map(function(w){return w[0];}).join('');
  var barTop = {deniece_kennedy:32, arthur_haedike:38, teresa_thomas:33, michael_della_penna:28, stanley_turek:30, tonya_may:32, trina_rizzo:38, jason_knapp:38, todd_morris:32};
  var top = barTop[r.id] !== undefined ? barTop[r.id] : 38;
  var avatarInner = r.photo
    ? '<div style="position:relative;width:100%;height:100%"><img src="'+r.photo+'" alt="'+dispName+'" style="filter:blur(2.5px)">'
      + '<div style="position:absolute;top:'+top+'%;left:5%;width:90%;height:18%;background:#66C220;transform:rotate(-2deg);border-radius:2px;display:flex;align-items:center;justify-content:center">'
      + '<span style="font-size:8px;font-weight:500;color:#fff;letter-spacing:.5px;text-transform:uppercase">Privacy Badge</span>'
      + '</div></div>'
    : '<div class="ref-avatar-initials">'+initials+'</div>';
  var quoteBlock = r.quote
    ? '<div class="ref-quote-box"><div class="ref-quote-mark">\u201c</div><div class="ref-quote-text">'+r.quote+'</div><div class="ref-attribution">\u2014 '+dispName+'<span>'+r.title+'</span></div></div>'
    : '<div class="ref-empty">Quote not yet available.</div>';
  var pageId = 'ref_'+r.id;
  var sigHtml = '<div id="sig-wrap-'+pageId+'">'+sigBoxHtml(pageId, r.fullName, 'bruna@saykudos.co')+'</div>';
  return '<div class="ref-layout"><div class="ref-photo-col"><div class="ref-avatar">'+avatarInner+'</div><div class="ref-name">'+dispName+'</div><div class="ref-title-small">'+r.title+'</div></div><div class="ref-right">'+quoteBlock+sigHtml+'</div></div>';
}
