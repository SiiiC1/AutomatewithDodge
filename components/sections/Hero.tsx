'use client'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { NetworkCanvas } from '@/components/ui/NetworkCanvas'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
} as const

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
