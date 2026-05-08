'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Tool } from '@/data/tools'
import { CATEGORY_COLORS } from '@/data/tools'

interface ToolCardProps {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  const [hovered, setHovered] = useState(false)
  const categoryColor = CATEGORY_COLORS[tool.category]

  return (
    <motion.div
      className="relative glass rounded-xl p-4 flex flex-col items-center gap-2 cursor-default overflow-hidden"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, borderColor: '#00D9FF' }}
      style={{ border: '1px solid rgba(0, 217, 255, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Brand icon — colored letter badge */}
      <motion.div
        className="w-11 h-11 rounded-lg flex items-center justify-center text-sm font-bold font-heading"
        style={{ backgroundColor: `${tool.color}22`, color: tool.color }}
        animate={hovered ? { scale: 1.1 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        {tool.abbr}
      </motion.div>

      {/* Tool name */}
      <span className="text-xs font-medium text-center text-light/90 leading-tight">
        {tool.name}
      </span>

      {/* Category badge */}
      <span
        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
        style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
      >
        {tool.category}
      </span>

      {/* Hover tooltip overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-xl flex items-center justify-center p-3 text-center"
            style={{ backgroundColor: 'rgba(10, 22, 40, 0.92)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <p className="text-xs text-light/80 leading-snug">{tool.useCase}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow border on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ boxShadow: '0 0 16px rgba(0, 217, 255, 0.25)', border: '1px solid rgba(0, 217, 255, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
