'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, GitBranch, Brain, ArrowRight } from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'

const highlights = [
  { icon: Zap, text: 'Automated workflows for data capture, processing, and routing' },
  { icon: GitBranch, text: 'Designed integrated systems across multiple platforms' },
  { icon: Brain, text: 'Built AI-driven automation for support and response systems' },
  { icon: ArrowRight, text: 'Created end-to-end process automation across diverse use cases' },
]

const stats = [
  { value: '20+', label: 'Workflows Deployed' },
  { value: '80+', label: 'Hours Saved' },
  { value: '~40%', label: 'Efficiency Gains' },
]

const tools = ['n8n', 'Make.com', 'Zapier', 'OpenAI', 'GoHighLevel', 'Airtable']

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="section-padding">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* Top: eyebrow + heading centered */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] font-medium uppercase text-primary mb-3 block">
            About Me
          </span>
          <h2 className="font-heading text-h2 text-light leading-tight max-w-3xl mx-auto">
            Building <span className="text-secondary">smarter systems</span> that run your business on autopilot
          </h2>
        </motion.div>

        {/* Main grid: identity card + content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left: Identity card — 2 cols */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Monogram card */}
            <div
              className="glass rounded-2xl p-8 flex flex-col items-center gap-4 text-center relative overflow-hidden"
              style={{ border: '1px solid rgba(0,217,255,0.15)' }}
            >
              {/* Glow blob */}
              <div
                className="absolute -top-12 -left-12 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.12) 0%, transparent 70%)' }}
              />
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
              />

              {/* Initials ring */}
              <div className="relative">
                <motion.div
                  className="w-24 h-24 rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,217,255,0.15), rgba(124,58,237,0.15))',
                    border: '1.5px solid rgba(0,217,255,0.3)',
                  }}
                  animate={{ boxShadow: ['0 0 0px rgba(0,217,255,0)', '0 0 24px rgba(0,217,255,0.3)', '0 0 0px rgba(0,217,255,0)'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span
                    className="font-heading font-bold text-4xl"
                    style={{ background: 'linear-gradient(135deg, #00D9FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    D
                  </span>
                </motion.div>
                {/* Online dot */}
                <span
                  className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2"
                  style={{ background: '#10B981', borderColor: '#0A1628' }}
                />
              </div>

              <div>
                <p className="font-heading font-semibold text-light text-lg leading-tight">Dodge</p>
                <p className="text-xs text-primary tracking-widest uppercase mt-1">Automation Specialist</p>
              </div>

              {/* Tool chips */}
              <div className="flex flex-wrap gap-2 justify-center pt-1">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] px-2.5 py-1 rounded-full text-light/70 font-medium"
                    style={{ background: 'rgba(0,217,255,0.07)', border: '1px solid rgba(0,217,255,0.12)' }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Stat cards stacked */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <StatCard value={s.value} label={s.label} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: bio + highlights — 3 cols */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-7"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-light/70 leading-relaxed text-base">
              I design AI-powered automation systems that streamline workflows, reduce manual work, and improve efficiency across different industries and use cases. With 1 year of hands-on experience in automation, I build practical and scalable systems designed for real-world execution.
            </p>

            {/* Highlight cards */}
            <div className="flex flex-col gap-3">
              {highlights.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-xl px-5 py-4 flex items-start gap-4 group"
                  style={{ border: '1px solid rgba(0,217,255,0.08)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                  whileHover={{ borderColor: 'rgba(0,217,255,0.25)', x: 4 }}
                >
                  <span
                    className="mt-0.5 flex-shrink-0 p-1.5 rounded-lg"
                    style={{ background: 'rgba(0,217,255,0.1)' }}
                  >
                    <Icon size={14} className="text-primary" />
                  </span>
                  <span className="text-sm text-light/80 leading-relaxed">{text}</span>
                </motion.div>
              ))}
            </div>

            {/* Mission statement */}
            <motion.div
              className="rounded-xl px-5 py-4 text-sm text-light/60 italic"
              style={{
                background: 'linear-gradient(135deg, rgba(0,217,255,0.05), rgba(124,58,237,0.05))',
                border: '1px solid rgba(124,58,237,0.15)',
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              My mission: eliminate repetitive work so teams can focus on growth instead of manual tasks.
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
