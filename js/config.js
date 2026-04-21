// config.js — API keys and email service


// ── EmailJS ───────────────────────────────────────────────────────────────────
var EJS_SVC    = 'service_0rf2ypo';
var EJS_TPL    = 'template_mzc2pqe';
var EJS_KEY    = 'uKxnVxIdCvTn9wl3j';
var SIG_NOTIFY = 'bruna@saykudos.co';

function ejsSend(toEmail, code, name, page) {
  return fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      service_id: EJS_SVC, template_id: EJS_TPL, user_id: EJS_KEY,
      template_params: {email: toEmail, passcode: code, name: name, page: page}
    })
  });
}

function ejsSendWelcome(toEmail) {
  return fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      service_id: EJS_SVC, template_id: 'template_5xjiy3c', user_id: EJS_KEY,
      template_params: {email: toEmail}
    })
  });
}
