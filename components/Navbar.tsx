'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

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
  useEffect(() => {
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
            Automate with Dodge<span className="text-primary">.</span>
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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-dark/95 backdrop-blur-lg md:hidden"
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
