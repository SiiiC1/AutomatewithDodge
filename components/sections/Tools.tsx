'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { tools } from '@/data/tools'
import type { Tool } from '@/data/tools'

const TOOL_LOGOS: Record<string, string> = {
  'openai':           'https://cdn.simpleicons.org/openai/ffffff',
  'claude':           'https://cdn.simpleicons.org/anthropic',
  'claude-code':      'https://cdn.simpleicons.org/anthropic',
  'elevenlabs':       'https://cdn.simpleicons.org/elevenlabs',
  // vapi — not in Simple Icons, falls back to abbr badge
  'n8n':              'https://cdn.simpleicons.org/n8n',
  'make':             'https://cdn.simpleicons.org/make',
  'zapier':           'https://cdn.simpleicons.org/zapier',
  // ghl (GoHighLevel) — not in Simple Icons, falls back to abbr badge
  'zoho':             'https://cdn.simpleicons.org/zoho',
  // apollo (apollo.io) — not in Simple Icons, falls back to abbr badge
  'airtable':         'https://cdn.simpleicons.org/airtable',
  'notion':           'https://cdn.simpleicons.org/notion/ffffff',
  'supabase':         'https://cdn.simpleicons.org/supabase',
  'jira':             'https://cdn.simpleicons.org/jira',
  'asana':            'https://cdn.simpleicons.org/asana',
  'slack':            'https://cdn.simpleicons.org/slack/ffffff',
  'whatsapp':         'https://cdn.simpleicons.org/whatsapp',
  'twilio':           'https://cdn.simpleicons.org/twilio/ffffff',
  'zoom':             'https://cdn.simpleicons.org/zoom',
  'google-workspace': 'https://cdn.simpleicons.org/google',
  'meta-api':         'https://cdn.simpleicons.org/meta',
  'github':           'https://cdn.simpleicons.org/github/ffffff',
  'cursor':           'https://cdn.simpleicons.org/cursor',
  'wordpress':        'https://cdn.simpleicons.org/wordpress',
  // ahrefs — not in Simple Icons, falls back to abbr badge
  'xero':             'https://cdn.simpleicons.org/xero',
}

function ToolLogo({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false)
  const logoUrl = TOOL_LOGOS[tool.id]

  if (!logoUrl || failed) {
    return (
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold font-heading flex-shrink-0"
        style={{ backgroundColor: `${tool.color}22`, color: tool.color }}
      >
        {tool.abbr}
      </div>
    )
  }

  return (
    <div
      className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 p-1"
      style={{ backgroundColor: `${tool.color}22` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoUrl}
        alt={tool.name}
        width={20}
        height={20}
        className="w-full h-full object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function MarqueeCard({ tool }: { tool: Tool }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative flex items-center gap-2.5 glass rounded-xl px-4 py-2.5 cursor-default select-none flex-shrink-0"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <ToolLogo tool={tool} />
      <span className="text-xs font-medium text-light/80 whitespace-nowrap">{tool.name}</span>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-44 rounded-lg px-3 py-2 text-center pointer-events-none"
            style={{ backgroundColor: 'rgba(10, 22, 40, 0.95)', border: '1px solid rgba(0,217,255,0.2)' }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            <p className="text-[10px] text-light/70 leading-snug">{tool.useCase}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function MarqueeRow({ items, direction }: { items: Tool[]; direction: 'left' | 'right' }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden w-full">
      <div
        className={direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}
        style={{ display: 'flex', gap: '10px', width: 'max-content' }}
      >
        {doubled.map((tool, i) => (
          <MarqueeCard key={`${tool.id}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  )
}

export function Tools() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const row1 = tools.slice(0, Math.ceil(tools.length / 2))
  const row2 = tools.slice(Math.ceil(tools.length / 2))

  return (
    <section
      id="tools"
      ref={ref}
      className="section-padding overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] font-medium uppercase text-primary mb-3 block">
            Stack
          </span>
          <h2 className="font-heading text-h2 text-light mb-3">My Automation Stack</h2>
          <p className="text-light/50 max-w-md mx-auto text-sm">
            Every tool I use to build, connect, and automate.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed marquee rows with edge fade */}
      <motion.div
        className="relative flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A1628aa, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A1628aa, transparent)' }}
        />

        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </motion.div>
    </section>
  )
}
