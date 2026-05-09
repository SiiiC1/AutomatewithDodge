'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ExternalLink, Loader2, MessageCircle } from 'lucide-react'

const PROJECT_TYPES = [
  'Workflow Automation',
  'CRM Setup',
  'Integration Build',
  'Consultation',
  'Full-time / Employment',
]

const SELECT_BG = '#0d1e36'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      projectType: (form.elements.namedItem('projectType') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setLoading(false)
    if (res.ok) {
      setSent(true)
      form.reset()
      setTimeout(() => setSent(false), 4000)
    } else {
      setError('Something went wrong. Please try again or email me directly.')
    }
  }

  const inputClass =
    'w-full bg-mid/30 border border-mid rounded-xl px-4 py-3 text-sm text-light placeholder-light/30 focus:outline-none focus:border-primary transition-colors duration-200'

  return (
    <section id="contact" ref={ref} className="section-padding bg-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] font-medium uppercase text-primary mb-3 block">
            Contact
          </span>
          <h2 className="font-heading text-h2 text-light mb-4">Let&apos;s Build Something</h2>
          <p className="text-light/50 max-w-md mx-auto text-sm">
            Book a call or send a message — I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Calendly inline embed */}
          <motion.div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(0,217,255,0.2)' }}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="px-4 py-3" style={{ background: '#0d1e36', borderBottom: '1px solid rgba(0,217,255,0.15)' }}>
              <p className="text-xs font-medium text-primary tracking-widest uppercase">Book a Free Call</p>
            </div>
            <iframe
              src="https://calendly.com/dodge-siiic/30-minute-event-type?embed_type=Inline&hide_gdpr_banner=1&hide_event_type_details=1"
              width="100%"
              height="560"
              style={{ border: 'none', display: 'block' }}
            />
          </motion.div>

          {/* Right: Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="name" type="text" placeholder="Your Name" className={inputClass} required />
              <input name="email" type="email" placeholder="Email Address" className={inputClass} required />
            </div>
            <input name="company" type="text" placeholder="Company (optional)" className={inputClass} />

            {/* Styled select */}
            <select
              name="projectType"
              className={inputClass}
              defaultValue=""
              style={{ backgroundColor: SELECT_BG, colorScheme: 'dark' }}
            >
              <option value="" disabled style={{ backgroundColor: SELECT_BG, color: 'rgba(248,250,252,0.3)' }}>
                Project Type
              </option>
              {PROJECT_TYPES.map((t) => (
                <option
                  key={t}
                  value={t}
                  style={{ backgroundColor: SELECT_BG, color: '#F8FAFC' }}
                >
                  {t}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="Tell me about your project, role, or workflow challenge..."
              rows={4}
              className={`${inputClass} resize-none`}
            />

            <motion.button
              type="submit"
              disabled={loading || sent}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-dark bg-primary disabled:opacity-70 transition-opacity"
              whileHover={!loading && !sent ? { scale: 1.02, boxShadow: '0 0 24px rgba(0,217,255,0.35)' } : {}}
              whileTap={!loading && !sent ? { scale: 0.97 } : {}}
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {sent ? '✓ Message Sent!' : loading ? 'Sending...' : 'Send Message'}
            </motion.button>

            {error && (
              <p className="text-xs text-red-400 text-center">{error}</p>
            )}

            {/* Contact links */}
            <div className="flex items-center justify-center gap-6 mt-2 pt-4 border-t border-mid">
              <a
                href="mailto:dodge.bellic@gmail.com"
                className="flex items-center justify-center gap-2 text-xs text-light/50 hover:text-primary transition-colors"
              >
                <Mail size={13} /> dodge.bellic@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/dodgeasis/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs text-light/50 hover:text-primary transition-colors"
              >
                <ExternalLink size={13} /> LinkedIn
              </a>
              <a
                href="https://wa.me/639602714858"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs text-light/50 hover:text-primary transition-colors"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
