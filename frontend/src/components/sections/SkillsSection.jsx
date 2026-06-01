import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { SKILLS } from '../../data/portfolioData'

const cats = {
  'Programming Languages': { color:'indigo', bar:'bg-indigo-500' },
  'Web Technologies':      { color:'purple', bar:'bg-purple-500' },
  'AI & Data Science':     { color:'sky',    bar:'bg-sky-500' },
  'Databases & Tools':     { color:'emerald',bar:'bg-emerald-500' },
}
const pillColors = {
  indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-500/20',
  purple: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-500/20',
  sky:    'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-100 dark:border-sky-500/20',
  emerald:'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20',
}

export default function SkillsSection() {
  const [active, setActive] = useState('Programming Languages')
  return (
    <SectionWrapper id="skills" className="section-white">
      <div className="container-xl">
        <SectionHeader eyebrow="Expertise" title="Skills & Technologies" subtitle="Built through real projects, internships, and continuous learning" />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.keys(SKILLS).map(cat => {
            const { color } = cats[cat]
            const isA = active === cat
            return (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                  isA ? `${pillColors[color]} ring-2 ring-offset-2 ring-${color}-400` : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-200 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >{cat}</button>
            )
          })}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div key={active} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.3 }}
            className="card p-6 space-y-4"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{active}</p>
            {SKILLS[active].map((s, i) => (
              <div key={s.name} className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{s.name}</span>
                  <span className="text-xs font-mono text-slate-400">{s.level}%</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width:0 }} whileInView={{ width:`${s.level}%` }}
                    viewport={{ once:true }} transition={{ duration:0.8, delay:i*0.07, ease:'easeOut' }}
                    className={`h-full rounded-full ${cats[active].bar}`}
                  />
                </div>
              </div>
            ))}
          </motion.div>
          <div className="space-y-3">
            {Object.keys(SKILLS).map(cat => (
              <div key={cat} onClick={() => setActive(cat)}
                className={`card p-4 cursor-pointer transition-all hover:shadow-md ${active===cat ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-950' : ''}`}
              >
                <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${pillColors[cats[cat].color].split(' ').find(c => c.startsWith('text-'))}`}>{cat}</p>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS[cat].map(s => (
                    <span key={s.name} className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${pillColors[cats[cat].color]}`}>{s.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 card p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Soft Skills</p>
          <div className="flex flex-wrap gap-2">
            {['Problem Solving','Team Collaboration','Communication','Content Writing','Event Coordination','Leadership','Adaptability','Critical Thinking'].map(s => (
              <span key={s} className="pill-gray hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default text-sm px-4 py-1.5 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
