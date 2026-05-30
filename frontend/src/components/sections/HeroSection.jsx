import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, Download, ArrowRight, Sparkles } from 'lucide-react'
import { PERSONAL } from '../../data/portfolioData'

const floatVariants = {
  animate: { y: [-8, 8, -8], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl" />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles size={12} />
                Available for opportunities
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </span>
            </motion.div>

            <motion.div variants={item}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-tight">
                <span className="text-white">Hi, I'm</span>
                <br />
                <span className="gradient-text">{PERSONAL.name}</span>
              </h1>
            </motion.div>

            <motion.div variants={item} className="text-xl sm:text-2xl text-slate-400 font-medium h-8">
              <TypeAnimation
                sequence={[
                  'AI & Data Science Graduate', 2500,
                  'Machine Learning Engineer', 2000,
                  'Computer Vision Developer', 2000,
                  'Full Stack Developer', 2000,
                  'Blockchain Enthusiast', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-blue-400"
              />
            </motion.div>

            <motion.p variants={item} className="text-slate-400 text-lg leading-relaxed max-w-lg text-balance">
              {PERSONAL.tagline} Building intelligent, real-world systems at the intersection of AI, data, and modern web technologies.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
                View My Work <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-outline" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-4 pt-2">
              {[
                { href: PERSONAL.github, icon: <Github size={20} />, label: 'GitHub' },
                { href: PERSONAL.linkedin, icon: <Linkedin size={20} />, label: 'LinkedIn' },
                { href: `mailto:${PERSONAL.email}`, icon: <Mail size={20} />, label: 'Email' }
              ].map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2.5 rounded-xl glass text-slate-400 hover:text-white hover:border-blue-500/40 transition-colors"
                  aria-label={label}
                >
                  {icon}
                </motion.a>
              ))}
              <div className="h-5 w-px bg-slate-700" />
              <span className="text-slate-500 text-sm font-mono">📍 {PERSONAL.location}</span>
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Center card */}
              <motion.div
                variants={floatVariants}
                animate="animate"
                className="glass rounded-3xl p-8 w-72 text-center shadow-2xl shadow-blue-900/20"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold font-display shadow-lg">
                  K
                </div>
                <h3 className="font-bold text-white text-lg font-display">{PERSONAL.name}</h3>
                <p className="text-slate-400 text-sm mt-1">AI & Data Science</p>
                <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 font-display">{PERSONAL.cgpa}</div>
                    <div className="text-xs text-slate-500 mt-0.5">CGPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-400 font-display">5+</div>
                    <div className="text-xs text-slate-500 mt-0.5">Projects</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badges */}
              {[
                { label: '🏆 1st Place Hackathon', delay: 0, x: -130, y: -80, color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-300' },
                { label: '⛓ Blockchain dApp', delay: 0.5, x: 100, y: -60, color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-300' },
                { label: '🤖 ML Engineer', delay: 1, x: -110, y: 100, color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300' },
                { label: '👁 Computer Vision', delay: 1.5, x: 90, y: 110, color: 'from-green-500/20 to-teal-500/20 border-green-500/30 text-green-300' }
              ].map(({ label, delay, x, y, color }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + delay * 0.2 }}
                  style={{ position: 'absolute', left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
                  className={`px-3 py-1.5 rounded-xl bg-gradient-to-br ${color} border text-xs font-medium whitespace-nowrap backdrop-blur-sm`}
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
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-600 text-xs font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-slate-700 flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-blue-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
