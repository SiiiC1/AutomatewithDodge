'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, GitBranch, Brain, ArrowRight } from 'lucide-react'
import Image from 'next/image'
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
            {/* Avatar card */}
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{ border: '1px solid rgba(0,217,255,0.1)', background: 'rgba(0,0,0,0.08)' }}
            >
              {/* Photo — constrained height so it doesn't feel massive */}
              <div className="relative w-full" style={{ aspectRatio: '3/4', maxHeight: '340px' }}>
                <Image
                  src="/avatar.png"
                  alt="Dodge — Automation Specialist"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* bottom fade for badge readability */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(4,6,16,0.6) 0%, transparent 100%)' }}
                />
              </div>

              {/* Location badge pinned at the bottom */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <span
                  className="flex items-center gap-2 text-xs font-medium text-light/90 px-4 py-2 rounded-full backdrop-blur-md"
                  style={{ background: 'rgba(4,6,16,0.55)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  Based in Philippines · Working Globally
                </span>
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
