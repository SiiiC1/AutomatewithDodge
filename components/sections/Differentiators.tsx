'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, TrendingUp, Layers, Users } from 'lucide-react'
import { differentiators } from '@/data/differentiators'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Code2,
  TrendingUp,
  Layers,
  Users,
}

export function Differentiators() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="why"
      ref={ref}
      className="section-padding"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] font-medium uppercase text-primary mb-3 block">
            Approach
          </span>
          <h2 className="font-heading text-h2 text-light mb-4">Why Work With Me</h2>
          <p className="text-light/50 max-w-md mx-auto text-sm">
            The principles behind every system I build.
          </p>
        </motion.div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {differentiators.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={item.id}
                className="glass rounded-2xl p-6 flex gap-5 group cursor-default transition-all duration-300 hover:bg-mid/40"
                style={{ borderLeft: '3px solid transparent' }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  borderLeftColor: '#7C3AED',
                  backgroundColor: 'rgba(30, 58, 95, 0.4)',
                }}
              >
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {Icon && <Icon size={22} className="text-secondary" />}
                </motion.div>

                {/* Text */}
                <div>
                  <h3 className="font-heading font-semibold text-light mb-2 text-base">
                    {item.title}
                  </h3>
                  <p className="text-sm text-light/60 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
