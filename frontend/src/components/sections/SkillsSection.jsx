import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { SKILLS } from '../../data/portfolioData'

const cats = {
  'Programming Languages': { bar: 'bg-blue-500', light: 'bg-blue-50 border-blue-200 text-blue-700', dark: 'dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-300' },
  'Web Technologies':      { bar: 'bg-violet-500', light: 'bg-violet-50 border-violet-200 text-violet-700', dark: 'dark:bg-violet-500/10 dark:border-violet-500/20 dark:text-violet-300' },
  'AI & Data Science':     { bar: 'bg-cyan-500', light: 'bg-cyan-50 border-cyan-200 text-cyan-700', dark: 'dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-300' },
  'Databases & Tools':     { bar: 'bg-green-500', light: 'bg-green-50 border-green-200 text-green-700', dark: 'dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-300' }
}

function SkillBar({ name, level, barColor, delay }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{name}</span>
        <span className="text-xs font-mono text-slate-400">{level}%</span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const [active, setActive] = useState('Programming Languages')
  const categories = Object.keys(SKILLS)

  return (
    <SectionWrapper id="skills" className="section-light">
      <div className="section-container">
        <SectionHeader label="Technical Profile" title="Skills & Expertise" subtitle="Technologies and tools I've built real projects with" />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => {
            const c = cats[cat]
            const isActive = active === cat
            return (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  isActive ? `${c.light} ${c.dark} border` : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div key={active} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
            className="card p-6 space-y-4"
          >
            <p className="text-xs font-mono text-slate-400 mb-2">{active} — Proficiency</p>
            {SKILLS[active].map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} barColor={cats[active].bar} delay={i * 0.07} />
            ))}
          </motion.div>
          <div className="space-y-3">
            {categories.map(cat => (
              <div key={cat} onClick={() => setActive(cat)} className={`card p-4 cursor-pointer transition-all hover:shadow-md ${active === cat ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950' : ''}`}>
                <p className={`text-xs font-mono mb-2.5 ${cats[cat].light.split(' ').find(c => c.startsWith('text-'))}`}>{cat}</p>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS[cat].map(s => (
                    <span key={s.name} className={`tag border ${cats[cat].light} ${cats[cat].dark}`}>{s.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 card p-5">
          <p className="text-xs font-mono text-slate-400 mb-3">Soft Skills</p>
          <div className="flex flex-wrap gap-2">
            {['Problem Solving','Team Collaboration','Communication','Content Writing','Event Coordination','Leadership','Adaptability','Critical Thinking'].map(s => (
              <span key={s} className="px-4 py-2 rounded-full text-sm font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
