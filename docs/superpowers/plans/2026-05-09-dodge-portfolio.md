# Dodge Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page professional portfolio website for automation specialist "Dodge" using Next.js 14, Tailwind CSS, and Framer Motion.

**Architecture:** Option A — single `page.tsx` orchestrates imported section components; all content lives in `/data/*.ts` files; UI primitives in `/components/ui/`; animations via Framer Motion + vanilla Canvas API for the hero background.

**Tech Stack:** Next.js 14 (App Router, TypeScript), Tailwind CSS, Framer Motion, next-themes, Lucide React, Inter + Space Grotesk (next/font), deployed to Vercel.

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout, fonts, ThemeProvider, global metadata |
| `app/page.tsx` | Section orchestrator — renders all sections in order |
| `app/globals.css` | CSS custom properties, base resets, scrollbar styling |
| `tailwind.config.ts` | Custom colors, font family tokens |
| `components/Navbar.tsx` | Sticky nav, scroll blur, dark toggle, mobile menu |
| `components/Footer.tsx` | Brand blurb, quick links, social icons, copyright |
| `components/sections/Hero.tsx` | Full-viewport hero with canvas background and CTAs |
| `components/sections/About.tsx` | Hex photo frame, bio paragraphs, stat cards |
| `components/sections/Tools.tsx` | Categorized tool grid |
| `components/sections/Portfolio.tsx` | 2×2 workflow card grid |
| `components/sections/Differentiators.tsx` | 4 value prop blocks |
| `components/sections/Contact.tsx` | Calendly placeholder + UI-only contact form |
| `components/ui/NetworkCanvas.tsx` | Canvas animation — drifting network nodes |
| `components/ui/AnimatedWorkflow.tsx` | SVG node-flow animated placeholder |
| `components/ui/StatCard.tsx` | Count-up metric card |
| `components/ui/ToolCard.tsx` | Tool card with hover tooltip |
| `components/ui/WorkflowCard.tsx` | Portfolio card with expand modal |
| `data/tools.ts` | 29 tools: name, category, useCase, color |
| `data/workflows.ts` | 4 case studies: full content |
| `data/differentiators.ts` | 4 value propositions |

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json` (auto-generated)
- Create: `tailwind.config.ts`
- Create: `app/globals.css`

- [ ] **Step 1: Scaffold the project**

```bash
cd "f:/CLAUDE PROJECTS/Dodge Portfolio"
npx create-next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted: accept all defaults.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion next-themes lucide-react
npm install @next/font
```

- [ ] **Step 3: Install Google Fonts packages**

```bash
npm install next
```

(next/font is bundled with Next.js — no extra install needed.)

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: server running at `http://localhost:3000` with default Next.js page.

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 14 project with Tailwind and Framer Motion"
```

---

## Task 2: Configure Tailwind, CSS Variables & Fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts` entirely**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D9FF',
        secondary: '#7C3AED',
        dark: '#0A1628',
        mid: '#1E3A5F',
        light: '#F8FAFC',
        accent: '#10B981',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['1.75rem', { lineHeight: '1.3', fontWeight: '500' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Replace `app/globals.css` entirely**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #00D9FF;
  --color-secondary: #7C3AED;
  --color-dark: #0A1628;
  --color-mid: #1E3A5F;
  --color-light: #F8FAFC;
  --color-accent: #10B981;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  background-color: var(--color-dark);
  color: var(--color-light);
  font-family: var(--font-inter), sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-dark);
}
::-webkit-scrollbar-thumb {
  background: var(--color-mid);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary);
}

/* Glass utility */
.glass {
  background: rgba(30, 58, 95, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 217, 255, 0.1);
}

/* Section padding utility */
.section-padding {
  padding: clamp(4rem, 8vw, 7rem) clamp(1rem, 5vw, 2rem);
}
```

- [ ] **Step 3: Verify Tailwind loads**

```bash
npm run dev
```

Expected: no build errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure Tailwind custom tokens and CSS variables"
```

---

## Task 3: Root Layout — Fonts, Metadata, ThemeProvider

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dodge | Automation Specialist',
  description:
    'AI-powered automation systems using n8n, Make.com, Zapier, GoHighLevel, and OpenAI. Eliminating manual work and connecting business stacks.',
  openGraph: {
    title: 'Dodge | Automation Specialist',
    description: 'I design and deploy AI-powered automation systems that eliminate manual work.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify fonts load**

```bash
npm run dev
```

Open `http://localhost:3000` — check DevTools Network tab: `inter` and `space-grotesk` font files should load.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: configure root layout with Inter/Space Grotesk fonts and ThemeProvider"
```

---

## Task 4: Data Layer

**Files:**
- Create: `data/tools.ts`
- Create: `data/workflows.ts`
- Create: `data/differentiators.ts`

- [ ] **Step 1: Create `data/tools.ts`**

```typescript
export type ToolCategory =
  | 'AI & LLMs'
  | 'Automation'
  | 'CRM & Sales'
  | 'Database & PM'
  | 'Communication'
  | 'Dev & Code'
  | 'Marketing & Finance'

export interface Tool {
  id: string
  name: string
  category: ToolCategory
  useCase: string
  abbr: string
  color: string
}

export const CATEGORY_COLORS: Record<ToolCategory, string> = {
  'AI & LLMs': '#7C3AED',
  'Automation': '#00D9FF',
  'CRM & Sales': '#F59E0B',
  'Database & PM': '#10B981',
  'Communication': '#3B82F6',
  'Dev & Code': '#EC4899',
  'Marketing & Finance': '#EF4444',
}

export const tools: Tool[] = [
  // AI & LLMs
  { id: 'openai', name: 'OpenAI', category: 'AI & LLMs', useCase: 'GPT-4 for intelligent text processing and decision-making', abbr: 'AI', color: '#10a37f' },
  { id: 'claude', name: 'Claude', category: 'AI & LLMs', useCase: 'Complex reasoning and analysis in automation pipelines', abbr: 'Cl', color: '#D4904E' },
  { id: 'claude-code', name: 'Claude Code', category: 'AI & LLMs', useCase: 'AI-assisted scripting and automation development', abbr: 'CC', color: '#7C3AED' },
  { id: 'elevenlabs', name: 'ElevenLabs', category: 'AI & LLMs', useCase: 'AI voice synthesis for automated voice notifications', abbr: 'EL', color: '#f5c518' },
  { id: 'vapi', name: 'Vapi', category: 'AI & LLMs', useCase: 'AI phone agent platform for automated voice workflows', abbr: 'Va', color: '#00D9FF' },
  // Automation
  { id: 'n8n', name: 'n8n', category: 'Automation', useCase: 'Self-hosted workflow automation for complex multi-step processes', abbr: 'n8', color: '#ea4b71' },
  { id: 'make', name: 'Make.com', category: 'Automation', useCase: 'Visual automation builder for connecting apps and APIs', abbr: 'Mk', color: '#9333ea' },
  { id: 'zapier', name: 'Zapier', category: 'Automation', useCase: 'Rapid automation across 6000+ app integrations', abbr: 'Zp', color: '#FF4A00' },
  { id: 'webhooks', name: 'Webhooks', category: 'Automation', useCase: 'Real-time event triggers between systems', abbr: '<>', color: '#10B981' },
  { id: 'rest-apis', name: 'REST APIs', category: 'Automation', useCase: 'Direct API integrations for custom workflow connections', abbr: 'API', color: '#00D9FF' },
  // CRM & Sales
  { id: 'ghl', name: 'GoHighLevel', category: 'CRM & Sales', useCase: 'All-in-one CRM and marketing automation for agencies', abbr: 'GHL', color: '#f97316' },
  { id: 'zoho', name: 'Zoho CRM', category: 'CRM & Sales', useCase: 'Enterprise CRM with deep workflow automation capabilities', abbr: 'Zo', color: '#e42527' },
  { id: 'apollo', name: 'Apollo.io', category: 'CRM & Sales', useCase: 'Lead intelligence and sales engagement automation', abbr: 'Ap', color: '#0062ff' },
  // Database & PM
  { id: 'airtable', name: 'Airtable', category: 'Database & PM', useCase: 'Flexible database for workflow data logging and tracking', abbr: 'At', color: '#18bfff' },
  { id: 'notion', name: 'Notion', category: 'Database & PM', useCase: 'Connected workspace for SOPs and process documentation', abbr: 'No', color: '#888888' },
  { id: 'supabase', name: 'Supabase', category: 'Database & PM', useCase: 'Postgres backend for storing and querying automation data', abbr: 'Sb', color: '#3ecf8e' },
  { id: 'jira', name: 'Jira', category: 'Database & PM', useCase: 'Issue tracking and project management workflow integration', abbr: 'Ji', color: '#0052cc' },
  { id: 'asana', name: 'Asana', category: 'Database & PM', useCase: 'Task management automation for team workflow handoffs', abbr: 'As', color: '#f06a6a' },
  // Communication
  { id: 'slack', name: 'Slack', category: 'Communication', useCase: 'Automated team notifications and alert routing', abbr: 'Sl', color: '#4a154b' },
  { id: 'whatsapp', name: 'WhatsApp', category: 'Communication', useCase: 'WhatsApp Business API for client communication automation', abbr: 'WA', color: '#25d366' },
  { id: 'twilio', name: 'Twilio', category: 'Communication', useCase: 'SMS and voice automation for notifications and alerts', abbr: 'Tw', color: '#f22f46' },
  { id: 'zoom', name: 'Zoom', category: 'Communication', useCase: 'Meeting scheduling and recording workflow automation', abbr: 'Zm', color: '#2d8cff' },
  { id: 'google-workspace', name: 'Google Workspace', category: 'Communication', useCase: 'Gmail, Sheets, Drive automation for business workflows', abbr: 'GW', color: '#4285f4' },
  { id: 'meta-api', name: 'Meta API', category: 'Communication', useCase: 'Facebook/Instagram messaging and lead form automation', abbr: 'Me', color: '#1877f2' },
  // Dev & Code
  { id: 'github', name: 'GitHub', category: 'Dev & Code', useCase: 'Version control and CI/CD workflow automation', abbr: 'GH', color: '#6e40c9' },
  { id: 'cursor', name: 'Cursor', category: 'Dev & Code', useCase: 'AI-powered IDE for rapid automation script development', abbr: 'Cu', color: '#00D9FF' },
  { id: 'wordpress', name: 'WordPress', category: 'Dev & Code', useCase: 'CMS integration for content and lead automation', abbr: 'WP', color: '#21759b' },
  // Marketing & Finance
  { id: 'ahrefs', name: 'Ahrefs', category: 'Marketing & Finance', useCase: 'SEO data automation for reporting workflows', abbr: 'Ah', color: '#ff7100' },
  { id: 'xero', name: 'Xero', category: 'Marketing & Finance', useCase: 'Accounting automation for invoice and payment workflows', abbr: 'Xe', color: '#13b5ea' },
]

export const toolCategories = Array.from(new Set(tools.map(t => t.category))) as ToolCategory[]
```

- [ ] **Step 2: Create `data/workflows.ts`**

```typescript
export interface WorkflowResult {
  label: string
  value: string
}

export interface Workflow {
  id: string
  title: string
  subtitle: string
  accentColor: string
  results: WorkflowResult[]
  problem: string
  solution: string
  steps: string[]
}

export const workflows: Workflow[] = [
  {
    id: 'ai-ticketing',
    title: 'AI Ticketing Route',
    subtitle: 'From support chaos to instant routing — fully automated ticket management',
    accentColor: '#00D9FF',
    results: [
      { label: 'Saved per week', value: '6–8 hrs' },
      { label: 'Faster routing', value: '80%' },
      { label: 'Team efficiency', value: '3x' },
    ],
    problem:
      'Support tickets pile up in a single inbox with no clear ownership. Every submission needs manual review to determine which department should handle it. Tickets get misrouted or delayed. Finance questions go to Tech. Urgent issues sit unnoticed. Teams lose track of their queue. Customers wait hours for basic acknowledgment.',
    solution:
      'A fully automated AI-powered routing system that analyzes every support ticket instantly and sends it to the right department — with zero manual sorting. No inbox confusion. No misrouted requests. No delayed responses. Just intelligent, instant ticket distribution with automatic acknowledgment.',
    steps: [
      'Analyzes incoming support tickets using AI to determine department',
      'Routes automatically to the correct team (Finance, Tech, Sales, Management)',
      'Sends real-time Slack notifications to department-specific channels',
      'Updates dedicated Google Sheet tracker for each department',
      'Generates and sends professional acknowledgment email via Gmail',
      'Detects urgent tickets and triggers escalation alerts',
      'Maintains complete ticket history and status tracking',
    ],
  },
  {
    id: 'accounts-payable',
    title: 'Accounts Payable Email Automation',
    subtitle: 'From inbox overwhelm to instant processing — fully automated invoice management',
    accentColor: '#7C3AED',
    results: [
      { label: 'Saved per week', value: '8–10 hrs' },
      { label: 'Faster processing', value: '85%' },
      { label: 'Payment accuracy', value: '2.5x' },
    ],
    problem:
      'Invoice emails flood the finance inbox daily. Each one requires manual review, data entry into spreadsheets, and team notifications. Extracting vendor names, amounts, due dates, and invoice numbers takes hours. High-value invoices slip through without proper alerts. Payment deadlines get missed. The finance team drowns in repetitive data entry instead of strategic work.',
    solution:
      'A fully automated invoice processing system that monitors Gmail 24/7, extracts all critical invoice data using AI, and logs everything instantly — with zero manual data entry. No missed invoices. No late payments. No spreadsheet drudgery. Just intelligent extraction, automatic logging, and smart alerts for high-value items.',
    steps: [
      'Monitors Gmail continuously for incoming invoices and payment requests',
      'Extracts invoice fields automatically (vendor, amount, due date, invoice #)',
      'Parses and validates data using AI before logging',
      'Updates Google Sheets with complete invoice details in real-time',
      'Sends Slack notifications to finance channel for every invoice logged',
      'Triggers high-value alerts when amounts exceed threshold',
      'Maintains searchable invoice history with all critical data points',
    ],
  },
  {
    id: 'lead-qualification',
    title: 'AI Lead Qualification & Sales Automation',
    subtitle: 'From lead chaos to instant prioritization — fully automated qualification system',
    accentColor: '#10B981',
    results: [
      { label: 'Saved per week', value: '10–12 hrs' },
      { label: 'Faster qualification', value: '70%' },
      { label: 'Conversion rates', value: '2x' },
    ],
    problem:
      'Every lead from your webhook gets the same treatment regardless of quality. Sales teams waste hours manually reviewing and scoring each submission. Hot leads with high buying intent sit in the queue alongside cold tire-kickers. No automatic prioritization. No instant routing. Revenue opportunities cool down while reps dig through unqualified prospects.',
    solution:
      'A fully automated AI-powered lead qualification engine that analyzes every submission instantly, scores buying intent, and routes hot prospects to sales while cold leads get nurture sequences — with zero manual review. No missed opportunities. No wasted sales time. No revenue leakage.',
    steps: [
      'Analyzes incoming leads using AI to determine temperature (Hot/Warm/Cold)',
      'Scores buying intent strength and qualification criteria automatically',
      'Merges lead data with AI-generated qualification insights',
      'Routes hot leads instantly to sales team via Slack and email alerts',
      'Sends warm leads to appropriate nurture workflows and CRM tracking',
      'Directs cold leads to long-term education sequences',
      'Updates Google Sheets and CRM with complete lead intelligence in real-time',
    ],
  },
  {
    id: 'gmail-sorting',
    title: 'Gmail Sorting and Response System',
    subtitle: 'From inbox overload to intelligent triage — fully automated email management',
    accentColor: '#F59E0B',
    results: [
      { label: 'Saved per week', value: '8–10 hrs' },
      { label: 'Faster response', value: '75%' },
      { label: 'Inbox efficiency', value: '2.5x' },
    ],
    problem:
      'Every email hits your inbox demanding immediate attention. Sorting through hundreds of messages daily to find what actually needs human response eats hours. Simple queries sit alongside complex decisions with no clear prioritization. Response times lag. Important emails get buried. The inbox becomes a productivity black hole.',
    solution:
      'A fully automated AI-powered email management system that analyzes every incoming Gmail message, extracts key details, determines response complexity, and either replies automatically or routes to the right person — with zero inbox chaos.',
    steps: [
      'Monitors Gmail continuously and analyzes each incoming email with AI',
      'Extracts sender details, subject, key content, and intent automatically',
      'Generates comprehensive email summaries for quick review',
      'Determines if AI can handle the response or human expertise is required',
      'Sends automated AI-generated replies for simple/routine inquiries',
      'Routes complex emails to Slack with context for human response needed',
      'Logs all emails to Google Sheets with complete metadata and AI analysis',
      'Maintains searchable email history with response status tracking',
    ],
  },
]
```

- [ ] **Step 3: Create `data/differentiators.ts`**

```typescript
export interface Differentiator {
  id: string
  icon: string
  title: string
  description: string
}

export const differentiators: Differentiator[] = [
  {
    id: 'no-code-first',
    icon: 'Code2',
    title: 'No-Code First Philosophy',
    description:
      'Empowering teams to maintain their own automation without developer dependency. I build systems your team can actually own.',
  },
  {
    id: 'roi-focused',
    icon: 'TrendingUp',
    title: 'ROI-Focused Implementation',
    description:
      'Every workflow justified by clear business metrics before a single node is built. If the ROI isn\'t obvious, we don\'t build it.',
  },
  {
    id: 'scalable',
    icon: 'Layers',
    title: 'Scalable Architecture',
    description:
      'Build once, grow infinitely. Systems designed to handle 10x volume without rebuilding — proper foundations from day one.',
  },
  {
    id: 'human-centered',
    icon: 'Users',
    title: 'Human-Centered Design',
    description:
      'Automation that enhances your team\'s capabilities, not replaces their judgment. People and systems working together.',
  },
]
```

- [ ] **Step 4: Commit**

```bash
git add data/
git commit -m "feat: add data layer for tools, workflows, and differentiators"
```

---

## Task 5: StatCard UI Component

**Files:**
- Create: `components/ui/StatCard.tsx`

- [ ] **Step 1: Create `components/ui/StatCard.tsx`**

```typescript
'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface StatCardProps {
  value: string
  label: string
}

function parseNumber(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^([~]?)(\d+)([+%]?)$/)
  if (!match) return { prefix: '', number: 0, suffix: value }
  return { prefix: match[1], number: parseInt(match[2]), suffix: match[3] }
}

export function StatCard({ value, label }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const { prefix, number, suffix } = parseNumber(value)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const steps = 40
    const increment = number / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= number) {
        setCount(number)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, number])

  return (
    <div
      ref={ref}
      className="glass rounded-xl p-4 text-center flex flex-col items-center gap-1 min-w-[90px]"
    >
      <span className="text-2xl font-bold font-heading text-accent">
        {prefix}{count}{suffix}
      </span>
      <span className="text-xs text-light/60 leading-tight">{label}</span>
    </div>
  )
}
```

- [ ] **Step 2: Verify the component compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/StatCard.tsx
git commit -m "feat: add StatCard with count-up animation on scroll enter"
```

---

## Task 6: NetworkCanvas Component (Hero Background)

**Files:**
- Create: `components/ui/NetworkCanvas.tsx`

- [ ] **Step 1: Create `components/ui/NetworkCanvas.tsx`**

```typescript
'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
}

export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const COLOR = '0, 217, 255'
    const COUNT = 55
    const MAX_DIST = 140
    let animId: number
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COLOR}, ${p.alpha})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${COLOR}, ${0.12 * (1 - dist / MAX_DIST)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/NetworkCanvas.tsx
git commit -m "feat: add NetworkCanvas animated background component"
```

---

## Task 7: AnimatedWorkflow SVG Component

**Files:**
- Create: `components/ui/AnimatedWorkflow.tsx`

- [ ] **Step 1: Create `components/ui/AnimatedWorkflow.tsx`**

```typescript
'use client'
import { motion } from 'framer-motion'

interface AnimatedWorkflowProps {
  accentColor: string
}

const NODES = ['Trigger', 'AI', 'Route', 'Notify']
const NODE_Y = 48
const VIEWBOX_W = 480
const SPACING = VIEWBOX_W / (NODES.length + 1)

export function AnimatedWorkflow({ accentColor }: AnimatedWorkflowProps) {
  const positions = NODES.map((_, i) => SPACING * (i + 1))

  return (
    <div className="w-full h-20 overflow-hidden">
      <svg
        viewBox={`0 0 ${VIEWBOX_W} 96`}
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Dashed connection lines */}
        {positions.slice(0, -1).map((x, i) => (
          <line
            key={`line-${i}`}
            x1={x + 22}
            y1={NODE_Y}
            x2={positions[i + 1] - 22}
            y2={NODE_Y}
            stroke={accentColor}
            strokeWidth={1.5}
            strokeOpacity={0.35}
            strokeDasharray="4 3"
          />
        ))}

        {/* Node circles */}
        {positions.map((x, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={x}
              cy={NODE_Y}
              r={20}
              fill="transparent"
              stroke={accentColor}
              strokeWidth={1.5}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 2.5,
                delay: i * 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <text
              x={x}
              y={NODE_Y + 4}
              textAnchor="middle"
              fontSize={9}
              fill={accentColor}
              fontFamily="Inter, sans-serif"
              fontWeight="500"
            >
              {NODES[i]}
            </text>
          </g>
        ))}

        {/* Traveling pulse dot */}
        <motion.circle
          cy={NODE_Y}
          r={5}
          fill={accentColor}
          initial={{ cx: positions[0], opacity: 0 }}
          animate={{
            cx: [...positions, positions[positions.length - 1]],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0.8,
            times: [0, 0.1, 0.5, 0.9, 1],
          }}
        />
      </svg>
    </div>
  )
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/AnimatedWorkflow.tsx
git commit -m "feat: add AnimatedWorkflow SVG component with traveling pulse"
```

---

## Task 8: ToolCard Component

**Files:**
- Create: `components/ui/ToolCard.tsx`

- [ ] **Step 1: Create `components/ui/ToolCard.tsx`**

```typescript
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
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/ToolCard.tsx
git commit -m "feat: add ToolCard with hover glow and use-case tooltip"
```

---

## Task 9: WorkflowCard Component

**Files:**
- Create: `components/ui/WorkflowCard.tsx`

- [ ] **Step 1: Create `components/ui/WorkflowCard.tsx`**

```typescript
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
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/WorkflowCard.tsx
git commit -m "feat: add WorkflowCard with animated placeholder and expand modal"
```

---

## Task 10: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create `components/Navbar.tsx`**

```typescript
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Tools', href: '#tools' },
  { label: 'Work', href: '#work' },
  { label: 'Why', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        animate={scrolled ? { backgroundColor: 'rgba(10, 22, 40, 0.85)' } : { backgroundColor: 'transparent' }}
        style={scrolled ? { backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0, 217, 255, 0.08)' } : {}}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="font-heading font-bold text-xl text-light">
            Dodge<span className="text-primary">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-light/70 hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-light/60 hover:text-primary transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* CTA */}
            <motion.button
              onClick={() => handleNavClick('#contact')}
              className="hidden md:flex items-center px-4 py-2 rounded-lg text-sm font-medium text-dark bg-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              animate={{ boxShadow: ['0 0 0px rgba(0,217,255,0)', '0 0 12px rgba(0,217,255,0.4)', '0 0 0px rgba(0,217,255,0)'] }}
              transition={{ boxShadow: { duration: 2.5, repeat: Infinity } }}
            >
              Book a Call
            </motion.button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-light"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-dark/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-2xl font-heading font-semibold text-light hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#contact')}
              className="mt-4 px-8 py-3 rounded-xl text-lg font-medium text-dark bg-primary"
            >
              Book a Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add Navbar with scroll blur, mobile menu, and dark mode toggle"
```

---

## Task 11: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```typescript
'use client'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { NetworkCanvas } from '@/components/ui/NetworkCanvas'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero() {
  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark"
    >
      {/* Animated background */}
      <NetworkCanvas />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(0,217,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants}>
          <span className="text-xs tracking-[0.3em] font-medium uppercase text-primary mb-6 block">
            Automation Specialist
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-hero text-light mb-6 leading-tight"
        >
          Automating{' '}
          <span
            className="relative inline-block"
            style={{ color: '#00D9FF', textShadow: '0 0 40px rgba(0,217,255,0.3)' }}
          >
            Tomorrow
          </span>
          , Today
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-light/60 max-w-2xl mb-10 leading-relaxed"
        >
          I design and deploy AI-powered automation systems that eliminate manual work
          and connect your entire business stack — faster, smarter, permanently.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
          <motion.button
            onClick={scrollToContact}
            className="px-8 py-3.5 rounded-xl font-semibold text-dark bg-primary text-base"
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,217,255,0.4)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Book a Consultation
          </motion.button>

          <motion.button
            onClick={scrollToWork}
            className="px-8 py-3.5 rounded-xl font-semibold text-light border border-light/20 text-base"
            whileHover={{ borderColor: '#00D9FF', color: '#00D9FF', scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            View My Work
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-light/30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with network canvas background and staggered animations"
```

---

## Task 12: About Section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create `components/sections/About.tsx`**

```typescript
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
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
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
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: add About section with hex photo frame, bio, and stat cards"
```

---

## Task 13: Tools Section

**Files:**
- Create: `components/sections/Tools.tsx`

- [ ] **Step 1: Create `components/sections/Tools.tsx`**

```typescript
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
          className="text-center mb-14"
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
        <div className="flex flex-col gap-10">
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
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
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
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Tools.tsx
git commit -m "feat: add Tools section with categorized grid and animated entry"
```

---

## Task 14: Portfolio Section

**Files:**
- Create: `components/sections/Portfolio.tsx`

- [ ] **Step 1: Create `components/sections/Portfolio.tsx`**

```typescript
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { workflows } from '@/data/workflows'
import { WorkflowCard } from '@/components/ui/WorkflowCard'

export function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" ref={ref} className="section-padding bg-dark">
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

        {/* Screenshot note */}
        <motion.p
          className="text-center text-xs text-light/30 mt-8 italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          Workflow screenshots coming soon — animated placeholders shown above
        </motion.p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Portfolio.tsx
git commit -m "feat: add Portfolio section with 2x2 workflow card grid"
```

---

## Task 15: Differentiators Section

**Files:**
- Create: `components/sections/Differentiators.tsx`

- [ ] **Step 1: Create `components/sections/Differentiators.tsx`**

```typescript
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
      style={{ background: 'linear-gradient(180deg, #0d1e36 0%, #0A1628 100%)' }}
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
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Differentiators.tsx
git commit -m "feat: add Differentiators section with icon blocks and hover effects"
```

---

## Task 16: Contact Section

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create `components/sections/Contact.tsx`**

```typescript
'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Calendar, Loader2 } from 'lucide-react'

const PROJECT_TYPES = [
  'Workflow Automation',
  'CRM Setup',
  'Integration Build',
  'Consultation',
]

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Placeholder: simulate loading then reset
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    }, 2000)
  }

  const inputClass =
    'w-full bg-mid/30 border border-mid rounded-xl px-4 py-3 text-sm text-light placeholder-light/30 focus:outline-none focus:border-primary transition-colors duration-200'

  return (
    <section id="contact" ref={ref} className="section-padding bg-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] font-medium uppercase text-primary mb-3 block">
            Contact
          </span>
          <h2 className="font-heading text-h2 text-light mb-4">Let&apos;s Build Something</h2>
          <p className="text-light/50 max-w-md mx-auto text-sm">
            Book a call or send a message — I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Calendly placeholder */}
          <motion.div
            className="glass rounded-2xl p-8 flex flex-col items-center justify-center gap-5 min-h-[360px]"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0,217,255,0.1)' }}
            >
              <Calendar size={32} className="text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-heading font-semibold text-light text-lg mb-1">
                Book a 30-min Consultation
              </h3>
              <p className="text-sm text-light/50">
                Select a time that works for you — free, no commitment.
              </p>
            </div>
            <motion.button
              className="px-6 py-3 rounded-xl font-semibold text-dark bg-primary text-sm"
              whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(0,217,255,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              📅 Select a Time
            </motion.button>
            <p className="text-xs text-light/25 italic">
              Replace with your Calendly embed URL
            </p>
          </motion.div>

          {/* Right: Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className={inputClass} required />
              <input type="email" placeholder="Email Address" className={inputClass} required />
            </div>
            <input type="text" placeholder="Company (optional)" className={inputClass} />
            <select className={inputClass} defaultValue="">
              <option value="" disabled>Project Type</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <textarea
              placeholder="Tell me about your project or workflow challenge..."
              rows={4}
              className={`${inputClass} resize-none`}
            />

            <motion.button
              type="submit"
              disabled={loading || sent}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-dark bg-primary disabled:opacity-70 transition-opacity"
              whileHover={!loading && !sent ? { scale: 1.02, boxShadow: '0 0 24px rgba(0,217,255,0.35)' } : {}}
              whileTap={!loading && !sent ? { scale: 0.97 } : {}}
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {sent ? '✓ Message Sent!' : loading ? 'Sending...' : 'Send Message'}
            </motion.button>

            {/* Contact info */}
            <div className="flex flex-wrap gap-4 mt-2 pt-4 border-t border-mid">
              <a
                href="mailto:hello@dodge.dev"
                className="flex items-center gap-2 text-xs text-light/50 hover:text-primary transition-colors"
              >
                <Mail size={13} /> hello@dodge.dev
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-xs text-light/50 hover:text-primary transition-colors"
              >
                <Linkedin size={13} /> LinkedIn
              </a>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: add Contact section with Calendly placeholder and UI-only form"
```

---

## Task 17: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```typescript
import { Mail, Linkedin, Github } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Tools', href: '#tools' },
  { label: 'Work', href: '#work' },
  { label: 'Why', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer
      className="pt-12 pb-6 px-6"
      style={{ borderTop: '1px solid #1E3A5F' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <a href="#home" className="font-heading font-bold text-xl text-light mb-3 block">
              Dodge<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-light/50 leading-relaxed max-w-xs">
              AI-powered automation specialist building systems that eliminate manual work and
              connect business stacks.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-light/40 mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-light/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-light/40 mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-light/60 hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-light/60 hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Github size={16} />
              </a>
              <a
                href="mailto:hello@dodge.dev"
                aria-label="Email"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-light/60 hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(30, 58, 95, 0.6)' }}
        >
          <p className="text-xs text-light/30">
            © 2026 Dodge. All rights reserved.
          </p>
          <a
            href="#"
            className="text-xs text-light/30 hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer with brand, quick links, social icons, and copyright"
```

---

## Task 18: Page Assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```typescript
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Tools } from '@/components/sections/Tools'
import { Portfolio } from '@/components/sections/Portfolio'
import { Differentiators } from '@/components/sections/Differentiators'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark text-light overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Tools />
      <Portfolio />
      <Differentiators />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Run the dev server and open in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Navbar is visible and sticky
- Hero renders with canvas animation
- All sections load without white screens
- No console errors

- [ ] **Step 3: Run full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble full page with all sections"
```

---

## Task 19: Smoke Tests

**Files:**
- Create: `__tests__/data.test.ts`

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

- [ ] **Step 2: Create `jest.config.ts`**

```typescript
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'node',
  transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react' } }] },
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
}

export default config
```

- [ ] **Step 3: Create `__tests__/data.test.ts`**

```typescript
import { tools, toolCategories } from '../data/tools'
import { workflows } from '../data/workflows'
import { differentiators } from '../data/differentiators'

describe('tools data', () => {
  it('has 29 tools', () => {
    expect(tools).toHaveLength(29)
  })

  it('every tool has required fields', () => {
    for (const tool of tools) {
      expect(tool.id).toBeTruthy()
      expect(tool.name).toBeTruthy()
      expect(tool.category).toBeTruthy()
      expect(tool.useCase).toBeTruthy()
      expect(tool.abbr).toBeTruthy()
      expect(tool.color).toMatch(/^#[0-9a-fA-F]{3,6}$/)
    }
  })

  it('all tool IDs are unique', () => {
    const ids = tools.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('toolCategories has 7 entries', () => {
    expect(toolCategories).toHaveLength(7)
  })
})

describe('workflows data', () => {
  it('has 4 workflows', () => {
    expect(workflows).toHaveLength(4)
  })

  it('every workflow has required fields', () => {
    for (const wf of workflows) {
      expect(wf.id).toBeTruthy()
      expect(wf.title).toBeTruthy()
      expect(wf.accentColor).toMatch(/^#/)
      expect(wf.results).toHaveLength(3)
      expect(wf.steps.length).toBeGreaterThan(0)
      expect(wf.problem).toBeTruthy()
      expect(wf.solution).toBeTruthy()
    }
  })
})

describe('differentiators data', () => {
  it('has 4 entries', () => {
    expect(differentiators).toHaveLength(4)
  })

  it('every entry has required fields', () => {
    for (const d of differentiators) {
      expect(d.id).toBeTruthy()
      expect(d.icon).toBeTruthy()
      expect(d.title).toBeTruthy()
      expect(d.description).toBeTruthy()
    }
  })
})
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest --testPathPattern="data.test"
```

Expected output:
```
PASS  __tests__/data.test.ts
  tools data
    ✓ has 29 tools
    ✓ every tool has required fields
    ✓ all tool IDs are unique
    ✓ toolCategories has 7 entries
  workflows data
    ✓ has 4 workflows
    ✓ every workflow has required fields
  differentiators data
    ✓ has 4 entries
    ✓ every entry has required fields
```

- [ ] **Step 5: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "jest"
```

- [ ] **Step 6: Commit**

```bash
git add __tests__/ jest.config.ts package.json
git commit -m "test: add smoke tests for data layer integrity"
```

---

## Task 20: Production Build Verification & Final Polish

**Files:**
- Modify: `next.config.ts` (if needed for image domains)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build completes with no errors. Note any warnings about image optimization or missing alt text and fix them.

- [ ] **Step 2: Fix any ESLint warnings**

```bash
npm run lint
```

Fix any reported issues before continuing.

- [ ] **Step 3: Manual visual check — open in browser**

```bash
npm run dev
```

Check each section at `http://localhost:3000`:
- [ ] Navbar scrolls and glass effect activates
- [ ] Hero canvas animation plays
- [ ] About stat cards count up on scroll
- [ ] Tools grid renders all 29 tools with hover tooltips
- [ ] Portfolio 2×2 grid shows animated workflow placeholders
- [ ] Clicking "View Case Study" opens modal with full content
- [ ] Differentiators hover effects work (border + icon animate)
- [ ] Contact form loading spinner works (click Send Message)
- [ ] Dark mode toggle switches theme
- [ ] Mobile menu opens and closes at narrow viewport
- [ ] Footer links all present

- [ ] **Step 4: Check mobile at 375px**

In browser DevTools, set viewport to 375px wide and verify:
- All grids collapse to single column
- Navbar shows hamburger
- No horizontal overflow
- Text is readable

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: production build verified — portfolio complete"
```

---

## Summary

| Task | Output |
|---|---|
| 1 | Next.js 14 project initialized |
| 2 | Tailwind config + CSS variables |
| 3 | Root layout with fonts and ThemeProvider |
| 4 | Data layer: tools, workflows, differentiators |
| 5 | StatCard with count-up animation |
| 6 | NetworkCanvas hero background |
| 7 | AnimatedWorkflow SVG placeholder |
| 8 | ToolCard with hover tooltip |
| 9 | WorkflowCard with expand modal |
| 10 | Navbar with scroll blur and mobile menu |
| 11 | Hero section |
| 12 | About section |
| 13 | Tools section |
| 14 | Portfolio section |
| 15 | Differentiators section |
| 16 | Contact section |
| 17 | Footer |
| 18 | Page assembly |
| 19 | Smoke tests for data layer |
| 20 | Production build + visual QA |
