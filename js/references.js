// references.js — reference page rendering


function renderRef(r) {
  var initials = r.fullName.split(' ').map(function(w){return w[0];}).join('');
  var avatarInner = r.photo ? '<img src="'+r.photo+'" alt="'+r.fullName+'">' : '<div class="ref-avatar-initials">'+initials+'</div>';
  var quoteBlock = r.quote
    ? '<div class="ref-quote-box"><div class="ref-quote-mark">\u201c</div><div class="ref-quote-text">'+r.quote+'</div><div class="ref-attribution">\u2014 '+r.fullName+'<span>'+r.title+'</span></div></div>'
    : '<div class="ref-empty">Quote not yet available.</div>';
  var pageId = 'ref_'+r.id;
  var sigHtml = '<div id="sig-wrap-'+pageId+'">'+sigBoxHtml(pageId, r.fullName, 'bruna@saykudos.co')+'</div>';
  return '<div class="ref-layout"><div class="ref-photo-col"><div class="ref-avatar">'+avatarInner+'</div><div class="ref-name">'+r.fullName+'</div><div class="ref-title-small">'+r.title+'</div></div><div class="ref-right">'+quoteBlock+sigHtml+'</div></div>';
}

