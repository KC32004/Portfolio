import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, ArrowRight, Sparkles, MapPin } from 'lucide-react'
import { PERSONAL } from '../../data/portfolioData'

const stagger = { visible: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function HeroSection() {
  const scrollTo = (id) => {
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 64
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 50)
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Subtle background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-100 dark:bg-violet-900/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="section-container relative z-10 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Main Content ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {/* Status badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Open to Internships & Full-time Roles
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-[1.1]">
                <span className="text-slate-800 dark:text-white">Hi, I'm</span>
                <br />
                <span className="gradient-text">{PERSONAL.name}</span>
              </h1>
            </motion.div>

            {/* Typing animation */}
            <motion.div variants={item} className="h-9 flex items-center">
              <TypeAnimation
                sequence={[
                  'AI & Data Science Graduate', 2500,
                  'Machine Learning Engineer', 2000,
                  'Computer Vision Developer', 2000,
                  'Full Stack Web Developer', 2000,
                  'Blockchain Developer', 2000,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
                className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={item} className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-lg">
              B.E. in AI & Data Science from SDMIT Ujire (CGPA: <strong className="text-slate-900 dark:text-white">8.48</strong>). Building intelligent, real-world systems — from computer vision to blockchain dApps.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
              <button onClick={() => scrollTo('projects')} className="btn-primary">
                View Projects <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollTo('contact')} className="btn-outline">
                Get In Touch
              </button>
            </motion.div>

            {/* Social links + location */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-1">
              {[
                { href: PERSONAL.github, icon: <Github size={18} />, label: 'GitHub' },
                { href: PERSONAL.linkedin, icon: <Linkedin size={18} />, label: 'LinkedIn' },
                { href: `mailto:${PERSONAL.email}`, icon: <Mail size={18} />, label: 'Email' }
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all text-sm font-medium"
                >
                  {icon} {label}
                </a>
              ))}
              <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-500">
                <MapPin size={14} /> Bengaluru, India
              </span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Stats card — visible on desktop ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Profile card */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/80 dark:shadow-slate-950/80 border border-slate-100 dark:border-slate-800 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold font-display shadow-lg">
                  KC
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg font-display">{PERSONAL.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">AI & Data Science · 2026</p>
                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-3">
                  {[
                    { val: PERSONAL.cgpa, lbl: 'CGPA' },
                    { val: '5+', lbl: 'Projects' },
                    { val: '5+', lbl: 'Hackathons' }
                  ].map(({ val, lbl }) => (
                    <div key={lbl} className="text-center">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400 font-display">{val}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{lbl}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating skill tags */}
              {[
                { label: '🏆 Hackathon Winner', x: -140, y: -50, delay: 0.5 },
                { label: '🤖 ML Engineer', x: 110, y: -70, delay: 0.7 },
                { label: '👁 Computer Vision', x: -120, y: 110, delay: 0.9 },
                { label: '⛓ Blockchain dApp', x: 100, y: 120, delay: 1.1 },
              ].map(({ label, x, y, delay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay, duration: 0.4 }}
                  style={{ position: 'absolute', left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold whitespace-nowrap shadow-md"
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex flex-col items-center gap-2 mt-16 sm:mt-20"
        >
          <span className="text-slate-400 text-xs font-mono tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-blue-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
