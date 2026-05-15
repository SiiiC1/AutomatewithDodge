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
                },
                assistant: {
                  stylesheet: "data:text/css;charset=utf-8," + encodeURIComponent(
                    ".vfrc-chat-input--textarea, textarea { color: #F8FAFC !important; caret-color: #00D9FF !important; } " +
                    ".vfrc-chat-input--textarea::placeholder, textarea::placeholder { color: rgba(248,250,252,0.4) !important; }"
                  )
                }
              });
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
