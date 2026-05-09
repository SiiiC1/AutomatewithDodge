'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'

const highlights = [
  'Automated workflows for data capture, processing, and routing',
  'Designed integrated workflow systems across multiple platforms',
  'Built AI-driven automation for support and response systems',
  'Created end-to-end process automation across diverse use cases',
]

const stats = [
  { value: '20+', label: 'Workflows Deployed' },
  { value: '80+', label: 'Hours Saved' },
  { value: '~40%', label: 'Efficiency Gains' },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="section-padding bg-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {/* Left: photo + stats */}
          <div className="flex flex-col items-center gap-8">
            {/* Hexagonal photo frame */}
            <div className="relative">
              <div
                className="w-72 h-72 overflow-hidden"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  border: '2px solid rgba(0,217,255,0.3)',
                }}
              >
                <img
                  src="/avatar.png"
                  alt="Dodge"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  boxShadow: '0 0 40px rgba(0,217,255,0.2)',
                }}
              />
            </div>

            {/* Stat cards */}
            <div className="flex gap-3 flex-wrap justify-center">
              {stats.map((s) => (
                <StatCard key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>

          {/* Right: bio */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs tracking-[0.3em] font-medium uppercase text-primary mb-3 block">
                About Me
              </span>
              <h2 className="font-heading text-h2 text-light leading-tight">
                Building <span className="text-secondary">smarter systems</span> that run your
                business on autopilot
              </h2>
            </div>

            <motion.p
              className="text-light/70 leading-relaxed text-sm sm:text-base"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I design AI-powered automation systems that streamline workflows, reduce manual work, and improve efficiency across different industries and use cases. With 1 year of hands-on experience in automation, I build practical and scalable systems designed for real-world execution.
            </motion.p>

            {/* Highlight list */}
            <ul className="flex flex-col gap-2.5">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-sm text-light/80"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <ArrowRight size={15} className="mt-0.5 flex-shrink-0 text-primary" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <motion.p
              className="text-sm text-light/60 italic border-t border-mid/60 pt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              My mission: eliminate repetitive work so teams can focus on growth instead of manual tasks.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
