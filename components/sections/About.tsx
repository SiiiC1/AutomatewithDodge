'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { StatCard } from '@/components/ui/StatCard'

const bio = [
  'I design and deploy AI-powered automation systems using tools like n8n, Make.com, Zapier, and GoHighLevel, integrated with OpenAI and Claude APIs. With experience in logistics process operations and full-stack MERN development, I focus on building structured, reliable workflows that reduce manual work and improve operational efficiency across business systems.',
  'My mission is to eliminate repetitive work by building simple, reliable automation systems that let businesses operate faster and smarter. I believe workflows should be fully connected and efficient so teams can focus on growth instead of manual tasks.',
  'I have 1 year of experience building AI automation and workflow systems for small businesses and agencies, focusing on streamlining sales, operations, and customer support processes.',
]

const stats = [
  { value: '20+', label: 'Workflows Deployed' },
  { value: '80+', label: 'Hours Saved' },
  { value: '~40%', label: 'Efficiency Gains' },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeInOut' as const
    }
  },
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
                className="w-48 h-48 overflow-hidden"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: 'linear-gradient(135deg, rgba(0,217,255,0.15), rgba(124,58,237,0.15))',
                  border: '2px solid rgba(0,217,255,0.3)',
                }}
              >
                {/* Photo placeholder */}
                <div className="w-full h-full flex items-center justify-center bg-mid/50 text-primary/40">
                  <span className="text-4xl font-heading font-bold">D</span>
                </div>
              </div>
              {/* Glow ring */}
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
              <h2 className="font-heading text-h2 text-light">
                Building Smarter{' '}
                <span className="text-secondary">Systems</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-light/70 leading-relaxed text-sm sm:text-base pl-4 border-l-2 border-transparent hover:border-secondary transition-colors duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
