import { Mail, ExternalLink, MessageCircle } from 'lucide-react'

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dodgeasis/', icon: ExternalLink },
  { label: 'WhatsApp', href: 'https://wa.me/639602714858', icon: MessageCircle },
  { label: 'Email', href: 'mailto:dodge.bellic@gmail.com', icon: Mail },
] as const

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1E3A5F' }} className="py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#home" className="font-heading font-bold text-xl text-light">
          Dodge<span className="text-primary">.</span>
        </a>

        <p className="text-xs text-light/30">© 2026 Dodge. All rights reserved.</p>

        <div className="flex gap-3">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              className="w-9 h-9 glass rounded-lg flex items-center justify-center text-light/60 hover:text-primary transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
