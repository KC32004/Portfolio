import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, ArrowRight, ArrowDown, Sparkles } from 'lucide-react'
import { PERSONAL } from '../../data/portfolioData'

const go = id => setTimeout(() => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior:'smooth' })
}, 50)

const fade = (delay = 0) => ({
  initial: { opacity:0, y:24 },
  animate: { opacity:1, y:0 },
  transition: { duration:0.55, delay, ease:[0.22,1,0.36,1] }
})

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden section-white">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ backgroundImage:'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)', backgroundSize:'32px 32px' }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-100/60 via-purple-50/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-100/50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="dark:hidden absolute inset-0 pointer-events-none">
        {/* Light mode decorative */}
      </div>

      <div className="dark:block hidden absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage:'radial-gradient(circle at 1px 1px, rgba(99,102,241,0.08) 1px, transparent 0)', backgroundSize:'32px 32px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-900/30 via-purple-900/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-xl relative z-10 pt-20 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="space-y-6 max-w-2xl">
            <motion.div {...fade(0.1)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open to Internships & Full-time Roles 2026
              </span>
            </motion.div>

            <motion.h1 {...fade(0.2)} className="heading-xl text-slate-900 dark:text-white">
              Hi, I'm{' '}
              <span className="text-gradient italic font-display">K.Chandana</span>
              <span className="block text-slate-300 dark:text-slate-700 text-4xl sm:text-5xl lg:text-6xl mt-1">—</span>
            </motion.h1>

            <motion.div {...fade(0.3)} className="flex items-center gap-3 min-h-[2rem]">
              <div className="w-8 h-0.5 bg-indigo-500 rounded-full shrink-0" />
              <TypeAnimation
                sequence={['AI & Data Science Graduate',2200,'Machine Learning Engineer',1800,'Computer Vision Developer',1800,'Full Stack Developer',1800,'Blockchain Developer',1800]}
                speed={55} repeat={Infinity} wrapper="span"
                className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400"
              />
            </motion.div>

            <motion.p {...fade(0.4)} className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
              B.E. in Artificial Intelligence and Data Science from <strong className="text-slate-900 dark:text-white">SDMIT, Ujire</strong> (CGPA <strong className="text-indigo-600 dark:text-indigo-400">8.48</strong>). Building intelligent real-world systems — from computer vision apps to blockchain dApps and enterprise web platforms.
            </motion.p>

            <motion.div {...fade(0.5)} className="flex flex-wrap gap-3 pt-1">
              <button onClick={() => go('projects')} className="btn-primary">
                See My Work <ArrowRight size={15} />
              </button>
              <button onClick={() => go('contact')} className="btn-ghost">
                Let's Connect
              </button>
            </motion.div>

            <motion.div {...fade(0.6)} className="flex flex-wrap items-center gap-3 pt-2">
              {[
                { href: PERSONAL.github, label:'GitHub', icon:<Github size={15}/> },
                { href: PERSONAL.linkedin, label:'LinkedIn', icon:<Linkedin size={15}/> },
                { href:`mailto:${PERSONAL.email}`, label:'Email', icon:<Mail size={15}/> }
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"
                >
                  {icon} {label}
                </a>
              ))}
              <span className="text-sm text-slate-400 dark:text-slate-600 hidden sm:block">📍 Bengaluru, India</span>
            </motion.div>
          </div>

          {/* RIGHT — Profile card */}
          <motion.div
            initial={{ opacity:0, scale:0.92, y:20 }}
            animate={{ opacity:1, scale:1, y:0 }}
            transition={{ duration:0.6, delay:0.35, ease:[0.22,1,0.36,1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <motion.div
                animate={{ y:[-8,8,-8] }}
                transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
                className="relative bg-white dark:bg-slate-900 rounded-3xl p-7 shadow-2xl shadow-indigo-100 dark:shadow-indigo-950/50 border border-slate-100 dark:border-slate-800"
              >
                {/* Gradient top bar */}
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-6" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">KC</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-base">{PERSONAL.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">AI & Data Science · 2026</p>
                    <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-green-600 dark:text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Available
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { val:PERSONAL.cgpa, lbl:'CGPA', color:'text-indigo-600 dark:text-indigo-400' },
                    { val:'5+', lbl:'Projects', color:'text-purple-600 dark:text-purple-400' },
                    { val:'5+', lbl:'Hackathons', color:'text-pink-600 dark:text-pink-400' },
                  ].map(({ val, lbl, color }) => (
                    <div key={lbl} className="text-center bg-slate-50 dark:bg-slate-800 rounded-xl py-3">
                      <div className={`text-xl font-bold font-display ${color}`}>{val}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{lbl}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {['🤖 Machine Learning','👁 Computer Vision','⛓ Blockchain / Web3','💻 Full Stack Dev'].map(s => (
                    <div key={s} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2">
                      {s}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating accent */}
              <motion.div
                animate={{ y:[-5,5,-5] }}
                transition={{ duration:4, repeat:Infinity, ease:'easeInOut', delay:1 }}
                className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl px-4 py-2.5 shadow-lg border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400">
                  🏆 Hackathon Winner
                </div>
              </motion.div>
              <motion.div
                animate={{ y:[5,-5,5] }}
                transition={{ duration:4.5, repeat:Infinity, ease:'easeInOut', delay:0.5 }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-2xl px-4 py-2.5 shadow-lg border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  <Sparkles size={14} /> HAL Intern
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.button
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
          onClick={() => go('about')}
          className="flex flex-col items-center gap-2 mt-16 mx-auto text-slate-400 dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors group"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll to explore</span>
          <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.6, repeat:Infinity }}>
            <ArrowDown size={18} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
