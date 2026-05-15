'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { workflows } from '@/data/workflows'
import { WorkflowCard } from '@/components/ui/WorkflowCard'

const CARDS_PER_PAGE = 2

export function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)

  const totalPages = Math.ceil(workflows.length / CARDS_PER_PAGE)

  function go(dir: 1 | -1) {
    setDirection(dir)
    setPage((p) => (p + dir + totalPages) % totalPages)
  }

  const visible = workflows.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE)

  const variants = {
    enter: (d: number) => ({ x: d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -60, opacity: 0 }),
  }

  return (
    <section id="work" ref={ref} className="section-padding">
      <div className="max-w-6xl mx-auto">
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
          {/* Slide area */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {visible.map((workflow) => (
                  <div key={workflow.id} className="h-full">
                    <WorkflowCard workflow={workflow} />
                  </div>
                ))}
                {/* Phantom card to keep grid balanced when odd number on last page */}
                {visible.length < CARDS_PER_PAGE && (
                  <div className="hidden md:block" aria-hidden />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Prev */}
            <button
              onClick={() => go(-1)}
              disabled={totalPages <= 1}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-mid text-light/50 hover:text-light hover:border-primary/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > page ? 1 : -1); setPage(i) }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === page ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: i === page ? 'var(--color-primary, #00D9FF)' : 'rgba(255,255,255,0.2)',
                  }}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => go(1)}
              disabled={totalPages <= 1}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-mid text-light/50 hover:text-light hover:border-primary/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Page counter */}
          <p className="text-center text-xs text-light/30 mt-3">
            {page * CARDS_PER_PAGE + 1}–{Math.min((page + 1) * CARDS_PER_PAGE, workflows.length)} of {workflows.length}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
