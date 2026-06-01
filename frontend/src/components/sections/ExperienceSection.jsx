import { motion } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { EXPERIENCE } from '../../data/portfolioData'

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="section-white">
      <div className="container-xl">
        <SectionHeader eyebrow="Experience" title="Work & Internships" subtitle="Industry exposure that bridges software with real-world engineering" />
        <div className="max-w-3xl mx-auto">
          {EXPERIENCE.map((exp, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <div className="card p-8 border-l-4 border-indigo-500 hover:shadow-xl transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white mb-3">{exp.type}</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">{exp.company}</p>
                  </div>
                  <div className="shrink-0 space-y-1.5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                      <Calendar size={11}/> {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400 pl-1">
                      <MapPin size={11}/> {exp.location}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">{exp.description}</p>
                <div className="mb-5">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Responsibilities</p>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{j+1}</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(t => <span key={t} className="pill-gray text-xs">{t}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
