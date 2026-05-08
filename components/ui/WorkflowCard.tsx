'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Check } from 'lucide-react'
import { AnimatedWorkflow } from './AnimatedWorkflow'
import type { Workflow } from '@/data/workflows'

interface WorkflowCardProps {
  workflow: Workflow
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Card */}
      <motion.div
        className="glass rounded-2xl overflow-hidden flex flex-col"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Animated workflow placeholder */}
        <div className="p-4 bg-dark/40">
          <AnimatedWorkflow accentColor={workflow.accentColor} />
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3
            className="text-lg font-heading font-semibold text-light leading-tight"
            style={{ color: workflow.accentColor }}
          >
            {workflow.title}
          </h3>
          <p className="text-sm text-light/60 italic">{workflow.subtitle}</p>

          {/* Result pills */}
          <div className="flex flex-wrap gap-2 mt-1">
            {workflow.results.map((r) => (
              <span
                key={r.label}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: `${workflow.accentColor}18`,
                  color: workflow.accentColor,
                  border: `1px solid ${workflow.accentColor}40`,
                }}
              >
                <strong>{r.value}</strong> {r.label}
              </span>
            ))}
          </div>

          {/* Expand button */}
          <button
            onClick={() => setOpen(true)}
            className="mt-auto flex items-center gap-1 text-sm font-medium transition-colors self-start"
            style={{ color: workflow.accentColor }}
          >
            View Case Study <ChevronRight size={14} />
          </button>
        </div>
      </motion.div>

      {/* Expanded modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Modal content */}
            <motion.div
              className="relative glass rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 flex flex-col gap-6"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-light/40 hover:text-light transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div>
                <div
                  className="text-xs font-medium mb-2 uppercase tracking-widest"
                  style={{ color: workflow.accentColor }}
                >
                  Case Study
                </div>
                <h2 className="text-2xl font-heading font-bold text-light">{workflow.title}</h2>
                <p className="text-sm text-light/60 italic mt-1">{workflow.subtitle}</p>
              </div>

              {/* Problem */}
              <div>
                <h4 className="text-sm font-semibold text-light/40 uppercase tracking-wider mb-2">
                  The Problem
                </h4>
                <p className="text-sm text-light/80 leading-relaxed">{workflow.problem}</p>
              </div>

              {/* Solution */}
              <div>
                <h4 className="text-sm font-semibold text-light/40 uppercase tracking-wider mb-2">
                  The Solution
                </h4>
                <p className="text-sm text-light/80 leading-relaxed">{workflow.solution}</p>
              </div>

              {/* Steps */}
              <div>
                <h4 className="text-sm font-semibold text-light/40 uppercase tracking-wider mb-3">
                  What This System Does
                </h4>
                <ul className="flex flex-col gap-2">
                  {workflow.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-light/80">
                      <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: workflow.accentColor }} />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-mid">
                {workflow.results.map((r) => (
                  <div key={r.label} className="text-center">
                    <div className="text-2xl font-heading font-bold" style={{ color: workflow.accentColor }}>
                      {r.value}
                    </div>
                    <div className="text-xs text-light/50">{r.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
