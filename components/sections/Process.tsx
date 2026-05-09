'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock } from 'lucide-react'

const steps = [
  {
    number: '01',
    duration: '~1 hour',
    title: 'Discovery Call',
    description:
      'We map your current process together. I ask the right questions. You know exactly what we are building before I write a single line of logic.',
    yourTime: '1 call',
  },
  {
    number: '02',
    duration: '2–4 weeks',
    title: 'Build & Test',
    description:
      'I build with your real data, stress-test for edge cases, and QA internally. You see a working system — not a prototype.',
    yourTime: 'Feedback only',
  },
  {
    number: '03',
    duration: '2 weeks',
    title: 'Handover & Support',
    description:
      'Loom walkthrough, Notion docs, two weeks post-launch support. Your team runs it. You own it.',
    yourTime: '1 walkthrough',
  },
]

export function Process() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" ref={ref} className="section-padding bg-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] font-medium uppercase text-primary mb-3 block">
            Process
          </span>
          <h2 className="font-heading text-h2 text-primary">Simple. No surprises.</h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-[44px] left-1/2 -translate-x-1/2 h-px w-[66%]"
            style={{ background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)', opacity: 0.25 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex flex-col items-center text-center gap-5"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                {/* Circle number */}
                <div
                  className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-2xl font-heading font-bold text-primary flex-shrink-0"
                  style={{
                    border: '2px solid var(--color-primary)',
                    background: 'rgba(0, 217, 255, 0.06)',
                  }}
                >
                  {step.number}
                </div>

                {/* Duration badge */}
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-primary"
                  style={{ border: '1px solid var(--color-primary)', background: 'rgba(0, 217, 255, 0.08)' }}
                >
                  <Clock size={12} />
                  {step.duration}
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-light text-lg">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-light/55 leading-relaxed max-w-[260px]">
                  {step.description}
                </p>

                {/* Your time badge */}
                <div
                  className="mt-auto px-4 py-2 rounded-full text-xs text-light/50"
                  style={{ border: '1px solid rgba(248,250,252,0.12)' }}
                >
                  Your time: {step.yourTime}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <motion.p
          className="text-center text-sm text-light/40 mt-14"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Most projects complete in{' '}
          <strong className="text-light/70 font-semibold">2–4 weeks</strong> end to end.
        </motion.p>
      </div>
    </section>
  )
}
