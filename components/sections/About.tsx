'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, GitBranch, Brain, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const highlights = [
  { icon: Zap, text: 'Automated workflows for data capture, processing, and routing' },
  { icon: GitBranch, text: 'Designed integrated systems across multiple platforms' },
  { icon: Brain, text: 'Built AI-driven support and response workflows' },
  { icon: ArrowRight, text: 'Created end-to-end automations for diverse business operations' },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="section-padding">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Header */}
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

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* Avatar card — spans 2 rows */}
          <motion.div
            className="lg:row-span-2 relative rounded-2xl overflow-hidden"
            style={{
              minHeight: '420px',
              background: 'rgba(4,6,16,0.4)',
              border: '1px solid rgba(0,217,255,0.12)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Image
              src="/avatar.png"
              alt="Dodge — Automation Specialist"
              fill
              className="object-cover object-top"
              priority
            />
            {/* gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(4,6,16,0.92) 0%, rgba(4,6,16,0.1) 55%, transparent 100%)' }}
            />
            {/* name + location at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
              <p className="font-heading font-bold text-xl text-light leading-tight">Dodge</p>
              <p className="text-xs text-light/60">Automation Specialist</p>
              <span
                className="inline-flex items-center gap-2 text-xs font-medium text-light/80 px-3 py-1.5 rounded-full w-fit mt-1"
                style={{ background: 'rgba(4,6,16,0.7)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                Philippines · Working Globally
              </span>
            </div>
          </motion.div>

          {/* Bio card */}
          <motion.div
            className="lg:col-span-2 rounded-2xl p-6 flex flex-col gap-3"
            style={{
              background: 'rgba(4,6,16,0.4)',
              border: '1px solid rgba(0,217,255,0.08)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="text-xs font-medium tracking-widest uppercase text-primary/70">Who I am</span>
            <p className="text-light/80 leading-relaxed text-base">
              I build automation systems that simplify operations, connect tools, and help businesses scale efficiently. My focus is creating practical workflows that solve real operational bottlenecks — from lead management and support systems to data processing and internal operations.
            </p>
            <p className="text-light/50 leading-relaxed text-sm">
              Over the past year, I&apos;ve worked with platforms like n8n, Make, Zapier, OpenAI, and GoHighLevel to develop scalable automations built for real-world execution.
            </p>
          </motion.div>

          {/* Highlights 2×2 grid */}
          <motion.div
            className="lg:col-span-2 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {highlights.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                className="rounded-2xl p-5 flex flex-col gap-3 group"
                style={{
                  background: 'rgba(4,6,16,0.4)',
                  border: '1px solid rgba(0,217,255,0.08)',
                }}
                whileHover={{ borderColor: 'rgba(0,217,255,0.25)', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: 'rgba(0,217,255,0.1)' }}
                >
                  <Icon size={15} className="text-primary" />
                </span>
                <span className="text-sm text-light/70 leading-relaxed">{text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission card — full width */}
          <motion.div
            className="lg:col-span-3 rounded-2xl p-6 flex items-center gap-5"
            style={{
              background: 'linear-gradient(135deg, rgba(0,217,255,0.06), rgba(124,58,237,0.06))',
              border: '1px solid rgba(124,58,237,0.18)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div
              className="w-1 self-stretch rounded-full flex-shrink-0"
              style={{ background: 'linear-gradient(to bottom, #00D9FF, #7C3AED)' }}
            />
            <p className="text-light/70 italic text-sm leading-relaxed">
              My mission: eliminate repetitive operational work so teams can focus on growth, strategy, and execution.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
