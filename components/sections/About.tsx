'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, GitBranch, Brain, ArrowRight } from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'

const highlights = [
  { icon: Zap, text: 'Automated workflows for data capture, processing, and routing' },
  { icon: GitBranch, text: 'Designed integrated systems across multiple platforms' },
  { icon: Brain, text: 'Built AI-driven support and response workflows' },
  { icon: ArrowRight, text: 'Created end-to-end automations for diverse business operations' },
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
          <p className="text-light/50 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            I build automation systems that simplify operations, connect tools, and help businesses scale efficiently.
          </p>
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

            {/* Stat cards — equal width and height */}
            <div className="grid grid-cols-3 gap-3 items-stretch">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex"
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
              I build automation systems that simplify operations, connect tools, and help businesses scale efficiently. My focus is creating practical workflows that solve real operational bottlenecks — from lead management and support systems to data processing and internal operations.
            </p>
            <p className="text-light/60 leading-relaxed text-sm">
              Over the past year, I&apos;ve worked with platforms like n8n, Make, Zapier, OpenAI, and GoHighLevel to develop scalable automations built for real-world execution.
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
              My mission: eliminate repetitive operational work so teams can focus on growth, strategy, and execution.
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
