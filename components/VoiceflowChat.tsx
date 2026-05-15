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

              var css = 'textarea,input{color:#F8FAFC!important;-webkit-text-fill-color:#F8FAFC!important;caret-color:#00D9FF!important;}textarea::placeholder,input::placeholder{color:rgba(248,250,252,0.45)!important;-webkit-text-fill-color:rgba(248,250,252,0.45)!important;}';

              function injectStyle() {
                var injected = false;
                document.querySelectorAll('*').forEach(function(el) {
                  if (el.shadowRoot) {
                    if (!el.shadowRoot.querySelector('#vf-text-fix')) {
                      var s = document.createElement('style');
                      s.id = 'vf-text-fix';
                      s.textContent = css;
                      el.shadowRoot.appendChild(s);
                      injected = true;
                    }
                  }
                });
                return injected;
              }

              var attempts = 0;
              var interval = setInterval(function() {
                if (injectStyle() || attempts++ > 20) clearInterval(interval);
              }, 500);
            }
            v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
          })(document, 'script');
        `,
      }}
    />
  )
}
