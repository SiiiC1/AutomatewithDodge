'use client'

import Script from 'next/script'

export function VoiceflowChat() {
  return (
    <Script
      id="voiceflow-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(d, t) {
            var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
            v.onload = function() {
              window.voiceflow.chat.load({
                verify: { projectID: '6a072ce37da23549286f81b4' },
                url: 'https://general-runtime.voiceflow.com',
                voice: {
                  url: "https://runtime-api.voiceflow.com"
                }
              });

              var observer = new MutationObserver(function() {
                var host = document.querySelector('vf-chat-widget');
                if (host && host.shadowRoot) {
                  var style = host.shadowRoot.querySelector('#vf-input-fix');
                  if (!style) {
                    style = document.createElement('style');
                    style.id = 'vf-input-fix';
                    style.textContent = [
                      'textarea, input {',
                      '  color: #F8FAFC !important;',
                      '  caret-color: #00D9FF !important;',
                      '  -webkit-text-fill-color: #F8FAFC !important;',
                      '}'
                    ].join('');
                    host.shadowRoot.appendChild(style);
                  }
                  observer.disconnect();
                }
              });

              observer.observe(document.body, { childList: true, subtree: true });
            }
            v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
            v.type = "text/javascript";
            s.parentNode.insertBefore(v, s);
          })(document, 'script');
        `,
      }}
    />
  )
}
