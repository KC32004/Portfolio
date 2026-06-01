import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, ChevronRight } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { NAV_LINKS } from '../../data/portfolioData'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 30); if (open) setOpen(false) }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [open])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.25, rootMargin: '-64px 0px -35% 0px' }
    )
    NAV_LINKS.forEach(l => { const el = document.getElementById(l.href.replace('#','')); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    if (open) document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [open])

  const go = href => {
    setOpen(false)
    setTimeout(() => {
      const el = document.getElementById(href.replace('#',''))
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: 'smooth' })
    }, 60)
  }

  return (
    <div ref={ref}>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800/80 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container-xl flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior:'smooth' })}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md">KC</div>
            <span className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              K. Chandana
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => go(l.href)}
                className={`nav-item ${active === l.href.replace('#','') ? 'active' : ''}`}
              >{l.label}</button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
            <button onClick={() => go('#contact')} className="hidden md:flex btn-primary text-xs py-2 px-5">
              Hire Me ✨
            </button>
            <button onClick={() => setOpen(o => !o)} aria-label="Menu"
              className="md:hidden p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="fixed inset-0 z-40 bg-slate-900/30 dark:bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type:'spring', stiffness:320, damping:32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-slate-900 shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">KC</div>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Navigation</span>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-4">
                {NAV_LINKS.map((l, i) => (
                  <motion.button key={l.label}
                    initial={{ opacity:0, x:16 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay: i * 0.045 }}
                    onClick={() => go(l.href)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl mb-1 text-sm font-semibold transition-all ${
                      active === l.href.replace('#','')
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                  >
                    {l.label}
                    <ChevronRight size={15} className="opacity-30" />
                  </motion.button>
                ))}
              </nav>
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                <button onClick={() => go('#contact')} className="btn-primary w-full justify-center text-sm">
                  Hire Me ✨
                </button>
                <button onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all"
                >
                  {isDark ? <><Sun size={14}/> Light Mode</> : <><Moon size={14}/> Dark Mode</>}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
