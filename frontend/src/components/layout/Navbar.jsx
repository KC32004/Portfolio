import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Code2, ChevronRight } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { NAV_LINKS } from '../../data/portfolioData'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      // Close mobile menu on scroll
      if (mobileOpen) setMobileOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mobileOpen])

  // Close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileOpen(false)
      }
    }
    if (mobileOpen) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [mobileOpen])

  // Active section tracking — lower threshold for mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.2, rootMargin: '-60px 0px -40% 0px' }
    )
    NAV_LINKS.forEach(link => {
      const el = document.getElementById(link.href.replace('#', ''))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href) => {
    // Close menu FIRST then scroll — fixes mobile nav bug
    setMobileOpen(false)
    const id = href.replace('#', '')
    // Small delay so menu closes before scroll fires
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        const offset = 64 // navbar height
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 50)
  }

  return (
    <div ref={menuRef}>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm'
            : 'bg-white/80 dark:bg-transparent backdrop-blur-sm'
        }`}
      >
        <div className="section-container h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-600/20">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white font-display text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              K.Chandana
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`nav-link ${active === link.href.replace('#', '') ? 'active' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="hidden md:flex btn-primary text-sm py-2 px-5"
              onClick={() => scrollTo('#contact')}
            >
              Hire Me
            </button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu — full screen overlay for easy tapping */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-slate-900 shadow-2xl md:hidden flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Code2 size={14} className="text-white" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white font-display">Menu</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links — large tap targets */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => scrollTo(link.href)}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl mb-1 text-base font-medium transition-all ${
                      active === link.href.replace('#', '')
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {link.label}
                    <ChevronRight size={16} className="opacity-40" />
                  </motion.button>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <button
                  onClick={() => scrollTo('#contact')}
                  className="btn-primary w-full justify-center text-sm"
                >
                  Hire Me
                </button>
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all border border-slate-200 dark:border-slate-700"
                >
                  {isDark ? <Sun size={15} /> : <Moon size={15} />}
                  Switch to {isDark ? 'Light' : 'Dark'} Mode
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
