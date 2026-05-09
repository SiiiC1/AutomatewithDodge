'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { workflows } from '@/data/workflows'
import { WorkflowCard } from '@/components/ui/WorkflowCard'

export function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

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

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workflows.map((workflow, i) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <WorkflowCard workflow={workflow} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
