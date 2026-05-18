'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { workflows } from '@/data/workflows'
import { WorkflowCard } from '@/components/ui/WorkflowCard'

export function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const total = workflows.length

  function go(next: number) {
    const clamped = (next + total) % total
    setDirection(next > current ? 1 : -1)
    setCurrent(clamped)
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <section id="work" ref={ref} className="section-padding">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] font-medium uppercase text-primary mb-3 block">
            Portfolio
          </span>
          <h2 className="font-heading text-h2 text-light mb-4">Automation Workflows</h2>
          <p className="text-light/50 max-w-md mx-auto text-sm">
            Real systems. Real results. Click any card to see the full case study.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Card area */}
          <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="w-full"
              >
                <WorkflowCard workflow={workflows[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Prev */}
            <button
              onClick={() => go(current - 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full glass text-light/50 hover:text-light transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {workflows.map((w, i) => (
                <button
                  key={w.id}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: i === current ? w.accentColor : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => go(current + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full glass text-light/50 hover:text-light transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Counter */}
          <p className="text-center text-xs text-light/30 mt-4 tracking-widest">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
