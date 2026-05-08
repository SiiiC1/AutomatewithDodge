# Dodge Portfolio — Design Spec
**Date:** 2026-05-09  
**Status:** Approved  
**Owner:** Dodge

---

## Overview

A single-page professional portfolio website for an automation specialist ("Dodge"). The site showcases AI-powered automation expertise, a curated tool stack, four workflow case studies, and a contact/booking section. Built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion. Deployed to Vercel.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | Framer Motion |
| Fonts | Inter (body) + Space Grotesk (headings) via `next/font` |
| Dark Mode | `next-themes` + Tailwind `darkMode: 'class'` |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Color Palette

```css
--color-primary:   #00D9FF  /* Electric Blue */
--color-secondary: #7C3AED  /* Purple */
--color-dark:      #0A1628  /* Deep Navy */
--color-mid:       #1E3A5F  /* Slate Blue */
--color-light:     #F8FAFC  /* Off-white */
--color-accent:    #10B981  /* Success Green — metrics */
```

---

## Typography Scale

| Token | Size | Font | Usage |
|---|---|---|---|
| H1 | 56px / 3.5rem | Space Grotesk Bold | Hero headline |
| H2 | 40px / 2.5rem | Space Grotesk SemiBold | Section headers |
| H3 | 28px / 1.75rem | Space Grotesk Medium | Card titles |
| Body | 16px / 1rem | Inter Regular | Paragraphs |
| Small | 14px / 0.875rem | Inter Regular | Labels, captions |

---

## File Structure

```
Dodge Portfolio/
├── app/
│   ├── layout.tsx                 # Root layout, metadata, fonts, ThemeProvider
│   ├── page.tsx                   # Section orchestrator
│   └── globals.css                # CSS variables, base resets
├── components/
│   ├── Navbar.tsx                 # Sticky nav, scroll blur, dark toggle, CTA
│   ├── Footer.tsx                 # Brand, quick links, social icons, copyright
│   ├── sections/
│   │   ├── Hero.tsx               # Full-viewport, canvas network animation
│   │   ├── About.tsx              # Bio + hex photo + stat cards
│   │   ├── Tools.tsx              # Categorized tool grid with hover tooltips
│   │   ├── Portfolio.tsx          # 4 workflow cards with animated SVG placeholders
│   │   ├── Differentiators.tsx    # 4 value prop blocks
│   │   └── Contact.tsx            # Calendly placeholder + contact form
│   └── ui/
│       ├── AnimatedWorkflow.tsx   # SVG node-flow animated placeholder
│       ├── StatCard.tsx           # Count-up metric card
│       ├── ToolCard.tsx           # Tool grid card with hover tooltip
│       └── WorkflowCard.tsx       # Portfolio card with expand drawer
├── data/
│   ├── tools.ts                   # 29 tools: name, category, icon, use case
│   ├── workflows.ts               # 4 case studies: full content
│   └── differentiators.ts         # 4 value propositions
└── public/
    └── (profile photo placeholder, favicon, og-image)
```

---

## Section Designs

### Navbar
- Fixed top, full-width
- Default: transparent background
- On scroll: `backdrop-blur-md` + `bg-[#0A1628]/80` glass effect (Framer Motion animate)
- **Left:** `Dodge.` wordmark — Space Grotesk, white, with `#00D9FF` dot
- **Center:** Smooth-scroll anchor links — About · Tools · Work · Why · Contact
- **Right:** Dark mode toggle (sun/moon icon) + `Book a Call` CTA button (electric blue, subtle pulse)
- **Mobile:** Hamburger icon → full-screen slide-down overlay menu

---

### Hero Section
- `min-h-screen`, centered content, `id="home"`
- **Background:** `<canvas>` element — animated network nodes drifting slowly, connected by faint `#00D9FF` lines at ~15% opacity. Nodes pulse gently (scale oscillation). Subtle mouse-parallax on the canvas.
- **Content stack (center-aligned):**
  1. Eyebrow: `AUTOMATION SPECIALIST` — small caps, `#00D9FF`, letter-spacing wide
  2. H1: `"Automating Tomorrow, Today"` — 56px, Space Grotesk Bold, white
  3. Subheadline: `"I design and deploy AI-powered automation systems that eliminate manual work and connect your entire business stack."` — 20px, `#F8FAFC/70`
  4. CTA row: `Book a Consultation` (filled `#00D9FF`) + `View My Work` (outlined white)
- **Bottom:** Animated scroll indicator (bouncing `<ChevronDown />`)
- **Entry animation:** Content fades up with staggered delay via Framer Motion `variants`

---

### About Section
- `id="about"`, two-column layout (col 1: visual, col 2: text) — stacks on mobile
- **Left column:**
  - Hexagonal profile photo frame — `#00D9FF` border glow, `clip-path: polygon(...)` or SVG mask, photo placeholder (`/public/profile-placeholder.jpg`)
  - 3 StatCards below in a row:
    - `20+` — Workflows Deployed
    - `80+` — Hours Saved
    - `~40%` — Efficiency Gains
    - Each: dark glass card, `#10B981` number, Framer Motion count-up animation on scroll enter (`useInView`)
- **Right column:**
  - H2: `"About Me"`
  - 3 bio paragraphs as specified by user
  - Subtle left-border accent (`#7C3AED`) on each paragraph block, visible on hover

---

### Tools Stack Section
- `id="tools"`, full-width
- H2: `"My Automation Stack"` + subtitle: `"Every tool I use to build, connect, and automate."`
- Tools organized into labeled category groups (all visible, no tab switching):

| Category | Tools |
|---|---|
| AI & LLMs | OpenAI, Claude, Claude Code, ElevenLabs, Vapi |
| Automation | n8n, Make.com, Zapier, Webhooks, REST APIs |
| CRM & Sales | GoHighLevel, Zoho CRM, Apollo.io |
| Database & PM | Airtable, Notion, Supabase, Jira, Asana |
| Communication | Slack, WhatsApp, Twilio, Zoom, Google Workspace, Meta API |
| Dev & Code | GitHub, Cursor, WordPress |
| Marketing & Finance | Ahrefs, Xero |

- **ToolCard:** Logo icon + tool name + category badge (color-coded by category)
- **Hover:** Card lifts (`translateY -4px`), `#00D9FF` border glow, tooltip overlay shows 1-line use case

---

### Portfolio Section
- `id="work"`, full-width
- H2: `"Automation Workflows"` + subtitle: `"Real systems. Real results."`
- 2×2 grid of `WorkflowCard` (stacks to 1 col on mobile)
- **WorkflowCard structure:**
  - **Top:** `<AnimatedWorkflow />` — SVG node-flow graphic, unique accent color per card, nodes: Trigger → AI → Route → Notify, animated with Framer Motion `keyframes`
  - **Middle:** H3 title + italic subtitle
  - **Bottom:** 3 result pills (metrics from spec)
  - **Expand button:** Opens full-width modal/drawer showing full Problem → Solution → What It Does → Real Results breakdown
- Footer note below grid: `"Workflow screenshots coming soon — placeholders shown above"`

**Four workflows:**
1. AI Ticketing Route — `#00D9FF` accent
2. Accounts Payable Email Automation — `#7C3AED` accent
3. AI Lead Qualification & Sales Automation — `#10B981` accent
4. Gmail Sorting and Response System — `#F59E0B` accent (amber for variety)

---

### Differentiators Section
- `id="why"`, 2×2 grid (stacks mobile)
- H2: `"Why Work With Me"`
- **4 blocks:**

| Icon | Title | Description |
|---|---|---|
| `<Code2 />` | No-Code First Philosophy | Empowering teams to maintain their own automation without developer dependency |
| `<TrendingUp />` | ROI-Focused Implementation | Every workflow justified by clear business metrics before a single node is built |
| `<Layers />` | Scalable Architecture | Build once, grow infinitely — systems designed to handle 10x volume without rebuilding |
| `<Users />` | Human-Centered Design | Automation that enhances your team's capabilities, not replaces their judgment |

- **Hover:** Block background → `#1E3A5F`, icon animates (scale + rotate 5deg), left border accent `#7C3AED`

---

### Contact Section
- `id="contact"`, two-column layout
- H2: `"Let's Build Something"` + subtitle: `"Book a call or send a message — I'll get back to you within 24 hours."`
- **Left column:** Calendly placeholder
  - Dark-styled box with calendar icon, `"Book a 30-min Consultation"` label, Calendly logo, `"📅 Select a time"` button
  - Note: Replace `src` with real Calendly embed URL
- **Right column:** Contact form (UI only, no submit handler)
  - Fields: Name, Email, Company, Project Type (dropdown: Workflow Automation / CRM Setup / Integration Build / Consultation), Message (textarea)
  - Submit button: `"Send Message"` — on click shows spinner for 2s then resets (purely visual feedback)
  - Below form: `hello@dodge.dev` · LinkedIn · optional phone

---

### Footer
- 3-column layout:
  - **Left:** `Dodge.` wordmark + 1-line brand description
  - **Center:** Quick links (Home, About, Tools, Work, Why, Contact)
  - **Right:** Social icons (LinkedIn, GitHub, email)
- Bottom bar: `© 2026 Dodge. All rights reserved.` · `Privacy Policy`
- Top border: `1px solid #1E3A5F`

---

## Animations Summary

| Element | Animation | Library |
|---|---|---|
| Hero background | Canvas network nodes, drift + pulse | Vanilla Canvas API |
| Hero content | Staggered fade-up on mount | Framer Motion |
| Navbar | Transparent → glass blur on scroll | Framer Motion |
| Stat cards | Count-up numbers on scroll enter | Framer Motion + `useInView` |
| Tool cards | Lift + glow on hover | Framer Motion / CSS |
| Animated workflow | SVG nodes flowing left→right | Framer Motion `keyframes` |
| Workflow card drawer | Slide-up modal | Framer Motion `AnimatePresence` |
| Differentiator blocks | Background shift + icon animate on hover | Framer Motion |
| Section entries | Fade-up on scroll enter | Framer Motion + `useInView` |
| Dark mode toggle | Icon crossfade | Framer Motion |

---

## Responsiveness

- Mobile-first Tailwind breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- All grids collapse to single column on mobile
- Navbar collapses to hamburger at `md`
- Hero font scales with `clamp()`
- Touch-friendly tap targets (min 44px)

---

## Content Notes

- Profile photo: placeholder image until real photo provided
- Calendly URL: placeholder until real link provided
- Contact email: `hello@dodge.dev` — update to real address
- LinkedIn URL: placeholder `#` — update to real profile
- Workflow screenshots: SVG animated placeholders, swap with real images later

---

## Out of Scope

- Contact form submission / email sending (placeholder UI only)
- CMS or blog
- Analytics integration
- Authentication
- Multi-language support
