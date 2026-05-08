'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Check, ZoomIn } from 'lucide-react'
import { AnimatedWorkflow } from './AnimatedWorkflow'
import type { Workflow } from '@/data/workflows'

function WorkflowPreview({
  workflow,
  onZoom,
}: {
  workflow: Workflow
  onZoom: () => void
}) {
  const [imgFailed, setImgFailed] = useState(false)
  const src = `/workflows/${workflow.id}.png`

  if (imgFailed) {
    return (
      <div className="p-4 bg-dark/40">
        <AnimatedWorkflow accentColor={workflow.accentColor} />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-dark/60 group/preview" style={{ height: '180px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${workflow.title} workflow screenshot`}
        className="w-full h-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
        onError={() => setImgFailed(true)}
      />
      {/* accent tint overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent 50%, ${workflow.accentColor}18 100%)` }}
      />
      {/* zoom button — appears on hover */}
      <button
        onClick={(e) => { e.stopPropagation(); onZoom() }}
        className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-light/70 hover:text-light transition-all opacity-0 group-hover/preview:opacity-100"
        style={{ backgroundColor: 'rgba(10,22,40,0.75)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}
        aria-label="View full size"
      >
        <ZoomIn size={11} />
        100%
      </button>
    </div>
  )
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* image */}
      <motion.div
        className="relative max-w-[95vw] max-h-[90vh]"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[85vh] rounded-xl object-contain"
          style={{ boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-7 h-7 flex items-center justify-center rounded-full text-light/60 hover:text-light transition-colors"
          style={{ backgroundColor: 'rgba(10,22,40,0.9)', border: '1px solid rgba(255,255,255,0.15)' }}
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </motion.div>
    </motion.div>
  )
}

interface WorkflowCardProps {
  workflow: Workflow
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const [open, setOpen] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const src = `/workflows/${workflow.id}.png`

  return (
    <>
      {/* Card */}
      <motion.div
        className="glass rounded-2xl overflow-hidden flex flex-col group"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <WorkflowPreview workflow={workflow} onZoom={() => setLightbox(true)} />

        {/* Card body */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3
            className="text-lg font-heading font-semibold leading-tight"
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

      {/* Case Study modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="relative glass rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto flex flex-col gap-6"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-light/40 hover:text-light transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Screenshot inside modal */}
              <div className="relative overflow-hidden rounded-t-2xl group/modal-img" style={{ height: '220px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${workflow.title} workflow`}
                  className="w-full h-full object-cover object-left-top"
                  onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none' }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(10,22,40,0.95) 100%)` }}
                />
                {/* zoom button in modal */}
                <button
                  onClick={() => setLightbox(true)}
                  className="absolute top-3 right-10 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-light/70 hover:text-light transition-all opacity-0 group-hover/modal-img:opacity-100"
                  style={{ backgroundColor: 'rgba(10,22,40,0.75)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}
                  aria-label="View full size"
                >
                  <ZoomIn size={11} />
                  100%
                </button>
              </div>

              {/* Modal text content */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex flex-col gap-6 -mt-4">
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox — 100% zoom */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={src}
            alt={`${workflow.title} workflow screenshot`}
            onClose={() => setLightbox(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
