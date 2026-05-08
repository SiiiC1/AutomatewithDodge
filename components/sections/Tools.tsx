'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { tools, toolCategories, CATEGORY_COLORS } from '@/data/tools'
import { ToolCard } from '@/components/ui/ToolCard'

export function Tools() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="tools"
      ref={ref}
      className="section-padding"
      style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0d1e36 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] font-medium uppercase text-primary mb-3 block">
            Stack
          </span>
          <h2 className="font-heading text-h2 text-light mb-4">My Automation Stack</h2>
          <p className="text-light/50 max-w-md mx-auto text-sm">
            Every tool I use to build, connect, and automate.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-col gap-6">
          {toolCategories.map((category, catIdx) => {
            const categoryTools = tools.filter((t) => t.category === category)
            const catColor = CATEGORY_COLORS[category]

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
              >
                {/* Category label */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: catColor }}
                  />
                  <h3
                    className="text-sm font-semibold uppercase tracking-widest"
                    style={{ color: catColor }}
                  >
                    {category}
                  </h3>
                  <div className="flex-1 h-px opacity-10" style={{ backgroundColor: catColor }} />
                </div>

                {/* Tool grid */}
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {categoryTools.map((tool, i) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: catIdx * 0.08 + i * 0.04 }}
                    >
                      <ToolCard tool={tool} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
